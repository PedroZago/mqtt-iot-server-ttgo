# Servidor MQTT Local para Dispositivos IoT (TTGO T-Beam ESP32) no Windows

Este projeto descreve como configurar um servidor MQTT local no Windows para gerenciar a comunicação entre dispositivos IoT, especificamente a placa TTGO T-Beam (ESP32). O servidor utiliza Python, Flask, MongoDB e Mosquitto para fornecer uma solução completa que inclui autenticação, armazenamento de dados e uma API para interação.

## Índice

1. [Requisitos](#requisitos)
2. [Instalação das Dependências](#instalação-das-dependências)
   - [1. Instalar Python e pip](#1-instalar-python-e-pip)
   - [2. Instalar e Configurar o MongoDB](#2-instalar-e-configurar-o-mongodb)
   - [3. Instalar o Mosquitto MQTT Broker](#3-instalar-o-mosquitto-mqtt-broker)
   - [4. Instalar Bibliotecas Python Necessárias](#4-instalar-bibliotecas-python-necessárias)
3. [Configuração do Broker MQTT (Mosquitto)](#configuração-do-broker-mosquitto)
4. [Código do Servidor Python](#código-do-servidor-python)
5. [Exemplo de Código para TTGO T-Beam (ESP32)](#exemplo-de-código-para-ttgo-t-beam-esp32)
6. [Execução do Servidor](#execução-do-servidor)
7. [Configuração do Firewall no Windows](#configuração-do-firewall-no-windows)
8. [Considerações Finais](#considerações-finais)

---

## Requisitos

- **Sistema Operacional:** Windows 10 ou superior
- **Privilégios Administrativos:** Necessários para instalar software e configurar serviços
- **Conexão com a Internet:** Para baixar pacotes e bibliotecas

## Instalação das Dependências

### 1. Instalar Python e pip

1. **Baixar Python:**

   - Acesse [python.org](https://www.python.org/downloads/windows/) e baixe a versão mais recente do Python (recomendo Python 3.9 ou superior).

2. **Instalar Python:**

   - Execute o instalador baixado.
   - **Importante:** Marque a opção **"Add Python to PATH"** antes de clicar em "Install Now".

3. **Verificar Instalação:**
   - Abra o **Prompt de Comando** (`cmd`) e execute:
     ```bash
     python --version
     pip --version
     ```
   - Ambos os comandos devem retornar as versões instaladas do Python e pip.

### 2. Instalar e Configurar o MongoDB

1. **Baixar MongoDB:**

   - Acesse [MongoDB Download Center](https://www.mongodb.com/try/download/community) e baixe o instalador MSI para Windows.

2. **Instalar MongoDB:**

   - Execute o instalador MSI.
   - Durante a instalação, selecione **"Complete"** para uma instalação padrão.
   - Marque a opção **"Install MongoDB as a Service"** para que o MongoDB inicie automaticamente com o Windows.

3. **Verificar Instalação:**

   - Abra o **Prompt de Comando** e execute:
     ```bash
     mongod --version
     ```
   - Deve exibir a versão do MongoDB instalada.

4. **Criar Diretórios de Dados (Opcional):**
   - Por padrão, o MongoDB usa `C:\Program Files\MongoDB\Server\<versão>\data` como diretório de dados. Você pode personalizar isso no arquivo de configuração se desejar.

### 3. Instalar o Mosquitto MQTT Broker

1. **Baixar Mosquitto:**

   - Acesse [Mosquitto Downloads](https://mosquitto.org/download/) e baixe o instalador para Windows.

2. **Instalar Mosquitto:**

   - Execute o instalador MSI.
   - Durante a instalação, certifique-se de selecionar a opção **"Install service as default"** para instalar o Mosquitto como um serviço do Windows.
   - Opcionalmente, você pode instalar os clientes Mosquitto (`mosquitto_pub` e `mosquitto_sub`) para testes.

3. **Verificar Instalação:**
   - Abra o **Prompt de Comando** e execute:
     ```bash
     mosquitto -v
     ```
   - Deve exibir a versão do Mosquitto instalada.

### 4. Instalar Bibliotecas Python Necessárias

1. **Criar um Ambiente Virtual (Recomendado):**

   - Navegue até a pasta onde deseja armazenar o projeto.
   - Abra o **Prompt de Comando** e execute:
     ```bash
     python -m venv venv
     ```
   - Ative o ambiente virtual:
     ```bash
     venv\Scripts\activate
     ```
   - O prompt deve mudar para indicar que o ambiente virtual está ativo.

2. **Instalar as Bibliotecas:**
   - Com o ambiente virtual ativo, execute:
     ```bash
     pip install paho-mqtt flask pymongo flask-httpauth werkzeug
     ```

## Configuração do Broker MQTT (Mosquitto)

Para garantir que apenas dispositivos autorizados possam se conectar ao broker MQTT, configuraremos autenticação básica.

1. **Criar Arquivo de Senhas:**

   - Abra o **Prompt de Comando** e execute:
     ```bash
     mosquitto_passwd -c "C:\Program Files\mosquitto\config\passwd.txt" usuario1
     ```
   - Será solicitado que você defina uma senha para `usuario1`. Você pode repetir esse processo para adicionar mais usuários, omitindo a opção `-c` para não sobrescrever o arquivo:
     ```bash
     mosquitto_passwd "C:\Program Files\mosquitto\config\passwd.txt" usuario2
     ```

2. **Configurar o Mosquitto para Usar Autenticação:**

   - Navegue até o diretório de configuração do Mosquitto, geralmente localizado em `C:\Program Files\mosquitto\config\`.
   - Abra ou crie o arquivo `mosquitto.conf` com um editor de texto (por exemplo, Notepad).
   - Adicione as seguintes linhas para habilitar a autenticação:
     ```
     allow_anonymous false
     password_file C:\Program Files\mosquitto\config\passwd.txt
     ```
   - **Opcional:** Para configurar TLS/SSL, siga a [documentação oficial do Mosquitto](https://mosquitto.org/man/mosquitto-conf-5.html) para adicionar certificados.

3. **Reiniciar o Serviço Mosquitto:**
   - Abra o **Prompt de Comando** como **Administrador** e execute:
     ```bash
     net stop mosquitto
     net start mosquitto
     ```
   - Alternativamente, você pode reiniciar o serviço via **Serviços do Windows**:
     - Pressione `Win + R`, digite `services.msc` e pressione Enter.
     - Encontre **Mosquitto Broker**, clique com o botão direito e selecione **Reiniciar**.

## Código do Servidor Python

Criaremos um servidor Python que se conecta ao broker MQTT, armazena dados no MongoDB e expõe uma API Flask para interação.

1. **Criar o Arquivo `server.py`:**

   - Na pasta do seu projeto, crie um arquivo chamado `server.py` e adicione o seguinte código:

   ```python
   # server.py

   import paho.mqtt.client as mqtt
   from flask import Flask, jsonify, request
   from flask_httpauth import HTTPBasicAuth
   from werkzeug.security import generate_password_hash, check_password_hash
   from pymongo import MongoClient
   import logging
   import threading

   # Configurações
   MQTT_BROKER = 'localhost'  # Se o broker estiver no mesmo PC
   MQTT_PORT = 1883
   MQTT_KEEPALIVE = 60

   # Usuários para autenticação na API Flask
   users = {
       "admin": generate_password_hash("admin_password"),
       "device1": generate_password_hash("device1_password")
   }

   # Configuração do MongoDB
   client = MongoClient('mongodb://localhost:27017/')
   db = client['iot_database']
   collection = db['iot_data']

   # Configuração do Flask
   app = Flask(__name__)
   auth = HTTPBasicAuth()

   # Configuração do Logging
   logging.basicConfig(level=logging.INFO,
                       format='%(asctime)s - %(levelname)s - %(message)s',
                       handlers=[
                           logging.FileHandler("server.log"),
                           logging.StreamHandler()
                       ])

   # Autenticação para a API Flask
   @auth.verify_password
   def verify_password(username, password):
       if username in users and check_password_hash(users.get(username), password):
           return username

   # Rota de exemplo para verificar se o servidor está ativo
   @app.route('/status', methods=['GET'])
   @auth.login_required
   def status():
       return jsonify({"status": "Server is running"}), 200

   # Rota para obter dados armazenados
   @app.route('/data', methods=['GET'])
   @auth.login_required
   def get_data():
       topic = request.args.get('topic')
       if topic:
           data = list(collection.find({"topic": topic}, {"_id": 0}))
       else:
           data = list(collection.find({}, {"_id": 0}))
       return jsonify(data), 200

   # Função chamada quando o cliente MQTT se conecta
   def on_connect(client, userdata, flags, rc):
       if rc == 0:
           logging.info("Conectado ao broker MQTT")
           # Subscreve em todos os tópicos necessários
           client.subscribe("ttgo/+/data")
       else:
           logging.error(f"Falha na conexão MQTT, código de retorno {rc}")

   # Função chamada quando uma mensagem é recebida
   def on_message(client, userdata, msg):
       try:
           payload = msg.payload.decode()
           topic = msg.topic
           logging.info(f"Mensagem recebida no tópico {topic}: {payload}")

           # Armazena a mensagem no MongoDB
           document = {
               "topic": topic,
               "payload": payload,
               "message_count": 1,  # Pode ser expandido conforme necessário
               "timestamp": msg.timestamp if hasattr(msg, 'timestamp') else None
           }
           collection.insert_one(document)
       except Exception as e:
           logging.error(f"Erro ao processar mensagem: {e}")

   def start_mqtt():
       mqtt_client = mqtt.Client()
       mqtt_client.username_pw_set("usuario1", "senha_usuario1")  # Configure conforme os usuários do Mosquitto
       mqtt_client.on_connect = on_connect
       mqtt_client.on_message = on_message

       mqtt_client.connect(MQTT_BROKER, MQTT_PORT, MQTT_KEEPALIVE)
       mqtt_client.loop_start()

   if __name__ == '__main__':
       # Iniciar o cliente MQTT em uma thread separada
       mqtt_thread = threading.Thread(target=start_mqtt)
       mqtt_thread.start()

       # Iniciar a aplicação Flask
       app.run(host='0.0.0.0', port=5000)
   ```

### Explicação do Código

1. **Importações e Configurações:**

   - Importa bibliotecas necessárias para MQTT (`paho-mqtt`), Flask, autenticação (`flask_httpauth`), MongoDB (`pymongo`) e logging.
   - Define as configurações do broker MQTT e MongoDB.

2. **Autenticação:**

   - Utiliza `flask_httpauth` para implementar autenticação básica na API Flask.
   - Define usuários e senhas (é recomendado usar variáveis de ambiente ou um banco de dados seguro para produção).

3. **Conexão com MongoDB:**

   - Conecta-se ao MongoDB e seleciona o banco de dados e coleção para armazenar os dados IoT.

4. **Configuração do Flask:**

   - Define rotas para verificar o status do servidor e obter dados armazenados.

5. **Funções MQTT:**

   - `on_connect`: Subscreve em tópicos específicos após conectar-se com sucesso.
   - `on_message`: Processa mensagens recebidas e armazena no MongoDB.

6. **Início do MQTT e Flask:**
   - Inicia o cliente MQTT em uma thread separada para que o Flask possa rodar simultaneamente.

## Exemplo de Código para TTGO T-Beam (ESP32)

A seguir, um exemplo de código Arduino para a placa TTGO T-Beam (ESP32) que publica dados em um tópico MQTT e se inscreve para receber atualizações.

### Pré-requisitos

- **Arduino IDE** instalado.
- **Bibliotecas necessárias** instaladas no Arduino IDE:
  - `PubSubClient`
  - `WiFi`
  - `ArduinoJson` (opcional, para formatação de mensagens JSON)

### Código Arduino

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

// Configurações WiFi
const char* ssid = "SEU_SSID";
const char* password = "SUA_SENHA_WIFI";

// Configurações MQTT
const char* mqtt_server = "192.168.X.X"; // IP do seu PC local onde o Mosquitto está rodando
const int mqtt_port = 1883;
const char* mqtt_user = "usuario1";
const char* mqtt_password = "senha_usuario1";

// Tópicos MQTT
const char* publish_topic = "ttgo/device1/data";
const char* subscribe_topic = "ttgo/device1/commands";

WiFiClient espClient;
PubSubClient client(espClient);

// Função para reconectar ao MQTT
void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conectar ao MQTT...");
    if (client.connect("TTGO_TBeam_1", mqtt_user, mqtt_password)) {
      Serial.println("Conectado");
      client.subscribe(subscribe_topic);
    } else {
      Serial.print("Falha, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

// Callback quando uma mensagem é recebida
void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Mensagem recebida no tópico: ");
  Serial.println(topic);
  String msg;
  for (unsigned int i = 0; i < length; i++) {
    msg += (char)message[i];
  }
  Serial.println("Conteúdo: " + msg);
  // Aqui você pode adicionar lógica para processar comandos recebidos
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Conectando-se ao WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado ao WiFi");

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Exemplo de publicação de dados
  static unsigned long lastMsg = 0;
  unsigned long now = millis();
  if (now - lastMsg > 10000) { // Publica a cada 10 segundos
    lastMsg = now;
    String payload = "Dados do TTGO T-Beam: " + String(now / 1000);
    Serial.print("Publicando mensagem: ");
    Serial.println(payload);
    client.publish(publish_topic, payload.c_str());
  }
}
```

### Explicação do Código

1. **Configurações WiFi e MQTT:**

   - Define as credenciais WiFi e MQTT.
   - Define os tópicos para publicar e se inscrever.

2. **Função `reconnect()`:**

   - Tenta reconectar ao broker MQTT caso a conexão seja perdida.
   - Subscreve-se ao tópico de comandos após a conexão bem-sucedida.

3. **Função `callback()`:**

   - Processa mensagens recebidas nos tópicos aos quais o dispositivo está inscrito.

4. **Função `setup()`:**

   - Inicializa a conexão WiFi e configura o cliente MQTT.

5. **Função `loop()`:**
   - Mantém a conexão MQTT ativa.
   - Publica uma mensagem no tópico especificado a cada 10 segundos.

## Execução do Servidor

### 1. Executar o Servidor Python

1. **Ativar o Ambiente Virtual (se aplicável):**

   - Abra o **Prompt de Comando**, navegue até a pasta do projeto e execute:
     ```bash
     venv\Scripts\activate
     ```

2. **Executar o Servidor:**
   - Com o ambiente virtual ativo, execute:
     ```bash
     python server.py
     ```
   - O servidor iniciará tanto o cliente MQTT quanto a aplicação Flask.
   - A API Flask estará acessível na porta `5000`.

### 2. Testar a API Flask

Você pode testar a API utilizando `curl`, Postman ou qualquer outra ferramenta similar.

**Verificar Status:**

```bash
curl -u admin:admin_password http://localhost:5000/status
```

**Obter Dados:**

```bash
curl -u admin:admin_password "http://localhost:5000/data?topic=ttgo/device1/data"
```

### 3. Configurar e Carregar o Código no TTGO T-Beam

1. **Abrir o Arduino IDE:**

   - Abra o Arduino IDE e cole o código fornecido para o TTGO T-Beam.

2. **Configurar Credenciais:**

   - Substitua `SEU_SSID` e `SUA_SENHA_WIFI` pelas credenciais da sua rede WiFi.
   - Substitua `192.168.X.X` pelo endereço IP do seu PC local onde o Mosquitto está rodando.
   - Substitua `usuario1` e `senha_usuario1` pelas credenciais configuradas no Mosquitto.

3. **Selecionar a Placa e Porta:**

   - No Arduino IDE, selecione a placa correta (**TTGO T-Beam**) e a porta serial correspondente.

4. **Carregar o Código:**
   - Clique em **Upload** para carregar o código na placa TTGO T-Beam.

### 4. Verificar as Conexões e Logs

- **Logs do Servidor Python:**

  - O servidor Python gera logs em `server.log` e também exibe no console. Verifique para ver as conexões e mensagens recebidas.

- **Logs do Mosquitto:**

  - Os logs do Mosquitto no Windows geralmente são exibidos no console ou podem ser configurados para arquivos de log no arquivo `mosquitto.conf`.

- **Serial Monitor do Arduino:**
  - Utilize o **Monitor Serial** do Arduino IDE para ver as mensagens publicadas e recebidas pelo TTGO T-Beam.

## Configuração do Firewall no Windows

Para garantir que seu servidor MQTT e API Flask sejam acessíveis, você precisará configurar o Firewall do Windows para permitir o tráfego nas portas utilizadas (1883 para MQTT e 5000 para Flask).

1. **Abrir o Painel de Controle do Firewall:**

   - Pressione `Win + R`, digite `wf.msc` e pressione Enter.

2. **Criar Regras de Entrada:**

   - **Para Mosquitto MQTT (Porta 1883):**

     - No painel esquerdo, clique em **Regras de Entrada**.
     - No painel direito, clique em **Nova Regra...**.
     - Selecione **Porta** e clique em **Avançar**.
     - Selecione **TCP** e especifique a porta **1883**.
     - Selecione **Permitir a conexão** e clique em **Avançar**.
     - Marque os perfis apropriados (Domínio, Privado, Público) e clique em **Avançar**.
     - Dê um nome para a regra, por exemplo, **Mosquitto MQTT**, e clique em **Concluir**.

   - **Para Flask API (Porta 5000):**
     - Repita os mesmos passos acima, mas especifique a porta **5000** e nomeie a regra como **Flask API**.

3. **Salvar e Aplicar as Regras:**
   - Após criar as regras, elas estarão ativas imediatamente. Não é necessário reiniciar o computador.

**Nota:** Certifique-se de que o seu PC esteja em uma rede segura, especialmente se você estiver abrindo portas no Firewall. Para ambientes de produção, é altamente recomendável implementar medidas de segurança adicionais, como TLS/SSL.

## Considerações Finais

### Melhorias e Boas Práticas

1. **Segurança:**

   - **TLS/SSL:** Implemente comunicação segura usando TLS/SSL para o broker MQTT e a API Flask.
   - **Senhas Seguras:** Nunca armazene senhas em texto puro no código. Utilize variáveis de ambiente ou serviços de gerenciamento de segredos.
   - **Autorização Avançada:** Considere implementar níveis de permissão para diferentes usuários.

2. **Escalabilidade:**

   - **Banco de Dados:** MongoDB é adequado para muitos casos, mas para grandes volumes de dados, considere otimizações como índices ou mesmo bancos de dados alternativos.
   - **Broker MQTT:** Para um grande número de dispositivos, brokers como EMQX ou HiveMQ podem oferecer melhor desempenho e escalabilidade.

3. **Monitoramento e Logs:**

   - Utilize ferramentas de monitoramento para acompanhar a performance do servidor, uso de recursos e possíveis falhas.
   - Armazene logs de forma centralizada e implemente rotação de logs para evitar o consumo excessivo de espaço em disco.

4. **Automatização:**

   - Automatize o processo de inicialização do servidor Python usando ferramentas como **Task Scheduler** ou criando um script de inicialização.
   - Considere usar contêineres (como Docker) para facilitar a implantação e isolamento do ambiente.

5. **Atualizações e Manutenção:**
   - Mantenha todas as dependências atualizadas para garantir segurança e desempenho.
   - Realize backups regulares do banco de dados MongoDB para evitar perda de dados.

### Recursos Adicionais

- **Documentação do Mosquitto:** [https://mosquitto.org/documentation/](https://mosquitto.org/documentation/)
- **Documentação do Paho-MQTT:** [https://www.eclipse.org/paho/index.php?page=clients/python/docs/index.php](https://www.eclipse.org/paho/index.php?page=clients/python/docs/index.php)
- **Documentação do Flask:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
- **Documentação do MongoDB:** [https://docs.mongodb.com/](https://docs.mongodb.com/)
- **Arduino Libraries:**
  - [PubSubClient](https://pubsubclient.knolleary.net/)
  - [ArduinoJson](https://arduinojson.org/)
