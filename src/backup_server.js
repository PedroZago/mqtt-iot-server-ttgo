require("dotenv").config(); // dotenv: Carrega variáveis de ambiente do arquivo .env.
const express = require("express"); // express: Framework web para criar APIs REST.
const mqtt = require("mqtt"); // mqtt: Cliente MQTT para conectar-se ao broker Mosquitto.
const mongoose = require("mongoose"); // mongoose: ORM para interagir com o MongoDB.
const http = require("http"); // http: Para comunicação em tempo real.
const socketIo = require("socket.io"); // socket.io: Para comunicação em tempo real.
const morgan = require("morgan"); // morgan: Middleware para logging de requisições HTTP.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const winston = require("winston"); // winston: Para gerenciamento de logs

// Defina um clientId único para o servidor
const CLIENT_ID = "serverClient123"; // Altere conforme necessário

// Configurações: Extrai as variáveis de configuração do arquivo .env.
const {
  MQTT_BROKER,
  MQTT_PORT,
  MQTT_KEEPALIVE,
  MONGODB_URI,
  API_PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

// Configuração do Express: Inicializa o Express e configura o servidor HTTP com Socket.io.
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuração do Logger do Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Armazena logs de erro
    new winston.transports.File({ filename: "combined.log" }), // Armazena todos os logs
    new winston.transports.Console(), // Exibe logs no console
  ],
});

// Middleware: Usa middlewares para parsear JSON e logar requisições.
app.use(express.json());
app.use(morgan("combined")); // Registra logs de requisições HTTP

// Conexão com o MongoDB: Conecta-se ao MongoDB usando Mongoose e encerra o processo em caso de falha.
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");

    // Criação de índices para melhorar a escalabilidade
    IotData.init(); // Inicializa o modelo IotData
    return IotData.createIndexes(); // Cria índices para o modelo
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// Definição do Schema e Modelo do Usuário
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

// Definição do Schema e Modelo do MongoDB para Dados IoT
const iotDataSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  payload: { type: Object, required: true },
  message_count: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now },
});

// Criação de índices para melhorar a escalabilidade
iotDataSchema.index({ topic: 1 }); // Índice no campo 'topic'
iotDataSchema.index({ timestamp: -1 }); // Índice no campo 'timestamp'

const IotData = mongoose.model("IotData", iotDataSchema);

// Conexão com o Broker MQTT: Conecta-se ao broker MQTT com as credenciais fornecidas.
const mqttOptions = {
  clientId: CLIENT_ID,
  keepalive: parseInt(MQTT_KEEPALIVE),
  reconnectPeriod: 1000, // Reconectar após 1 segundo
  username: "pedro", // Substitua conforme sua configuração
  password:
    "$7$101$3LZUJjc5ILa0XgCg$pWPz0L+n1vgqKTtGAX4iEhuIPyOdijYpTALDWjUwLKMHu5cs/YNkJOq9/xv40uA2y/Mg6pX5HK/dzKZHciECiw==", // Substitua conforme sua configuração
};

// Conexão: Após conectar, subscreve-se ao tópico ttgo/+/data.
const mqttClient = mqtt.connect(
  `mqtt://${MQTT_BROKER}:${MQTT_PORT}`,
  mqttOptions
);

// Eventos MQTT
mqttClient.on("connect", () => {
  console.log("Conectado ao Broker MQTT");
  mqttClient.subscribe("ttgo/+/data", (err) => {
    if (err) {
      console.error("Erro ao subscrever ao tópico:", err);
      logger.error(`Erro ao subscrever ao tópico: ${err.message}`);
    } else {
      console.log('Subscreveu-se ao tópico "ttgo/+/data"');
    }
  });
});

// Erro: Loga erros e encerra a conexão.
mqttClient.on("error", (err) => {
  console.error("Erro no cliente MQTT:", err);
  logger.error(`Erro no cliente MQTT: ${err.message}`);
  mqttClient.end();
});

// Mensagem: Ao receber uma mensagem, decodifica o payload, armazena no MongoDB e emite um evento via Socket.io para notificações em tempo real.
mqttClient.on("message", async (topic, message) => {
  let payload;

  try {
    // Tenta analisar a mensagem como JSON
    payload = JSON.parse(message.toString());

    // Verifica se a mensagem é um objeto
    if (typeof payload !== "object" || payload === null) {
      throw new Error("Formato de mensagem inválido. Deve ser um objeto JSON.");
    }
  } catch (e) {
    console.error("Erro ao parsear o payload JSON:", e);
    logger.error(`Erro ao parsear o payload JSON: ${e.message}`);
    return; // Retorna para evitar processamento adicional
  }

  // Validação dos campos necessários
  const { temperatura, frequencia, latitude, longitude } = payload;
  if (
    typeof temperatura !== "number" ||
    typeof frequencia !== "number" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    console.error("Dados inválidos recebidos:", payload);
    logger.warn(`Dados inválidos recebidos: ${JSON.stringify(payload)}`);
    return;
  }

  console.log(`Mensagem recebida no tópico ${topic}:`, payload);

  const document = {
    topic,
    payload,
    message_count: 1, // Pode ser incrementado conforme necessário
    timestamp: new Date(),
  };

  try {
    const result = await IotData.create(document);
    console.log(`Mensagem armazenada com ID: ${result._id}`);

    // Emitir evento via Socket.io
    io.emit("nova_dado", JSON.stringify(document));
  } catch (err) {
    console.error("Erro ao armazenar mensagem no MongoDB:", err);
    logger.error(`Erro ao armazenar mensagem no MongoDB: ${err.message}`);
  }
});

// Middleware para verificar JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Rotas da API

// Rota de Registro
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    logger.error(`Erro ao registrar usuário: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Rota de Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({ accessToken });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    logger.error(`Erro ao fazer login: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Rota de status protegida por JWT
app.get("/status", authenticateJWT, (req, res) => {
  res.json({ status: "Server is running", user: req.user.username });
});

// Rota para publicar um dado IoT
app.post("/dados-iot", authenticateJWT, async (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message || typeof message !== "object") {
    return res.status(400).json({
      status: "error",
      message:
        "Dados inválidos. O tópico e a mensagem devem ser fornecidos, e a mensagem deve ser um objeto JSON.",
    });
  }

  const finalMessage = { ...message, clientId: CLIENT_ID };

  const payload = JSON.stringify(finalMessage);

  try {
    mqttClient.publish(topic, payload, async (err) => {
      if (err) {
        console.error("Erro ao publicar mensagem:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Falha ao publicar mensagem" });
      }

      console.log(`Mensagem publicada no tópico ${topic}:`, finalMessage);

      res.status(201).json({
        message: "Dado IoT publicado com sucesso.",
        topic,
        message,
      });
    });
  } catch (err) {
    console.error("Erro ao publicar dado IoT:", err);
    logger.error(`Erro ao publicar dado IoT: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Rota para obter dados IoT
app.get("/dados-iot", authenticateJWT, async (req, res) => {
  try {
    const { topic } = req.query;

    let query = {};
    if (topic) {
      query.topic = topic;
    }

    const dados = await IotData.find(query, { _id: 0 })
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(dados);
  } catch (err) {
    console.error("Erro ao obter dados IoT:", err);
    logger.error(`Erro ao obter dados IoT: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Rota para obter um único dado IoT por ID
app.get("/dados-iot/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const dado = await IotData.findById(id);
    if (!dado) {
      return res.status(404).json({ message: "Dado não encontrado." });
    }
    res.json(dado);
  } catch (err) {
    console.error("Erro ao obter dado IoT:", err);
    logger.error(`Erro ao obter dado IoT: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Rota para obter dados IoT em tempo real
app.get("/dados-iot/tempo-real", authenticateJWT, (req, res) => {
  res.json({ message: "Conectado ao stream de dados em tempo real." });
});

// Rota para deletar dado IoT por ID
app.delete("/dados-iot/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await IotData.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Dado não encontrado." });
    }
    res.json({ message: "Dado deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar dado IoT:", err);
    logger.error(`Erro ao deletar dado IoT: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Rota para atualizar dado IoT por ID
app.put("/dados-iot/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { payload } = req.body;

  try {
    const result = await IotData.findByIdAndUpdate(
      id,
      { payload },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Dado não encontrado." });
    }
    res.json(result);
  } catch (err) {
    console.error("Erro ao atualizar dado IoT:", err);
    logger.error(`Erro ao atualizar dado IoT: ${err.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Evento de conexão do Socket.io
io.on("connection", (socket) => {
  console.log("Novo cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Inicialização do servidor na porta especificada
server.listen(API_PORT, () => {
  console.log(`Servidor API rodando na porta ${API_PORT}`);
});
