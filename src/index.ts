import dotenv from "dotenv";
import express, { json, Request, Response } from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import deviceRoutes from "./routes/device.routes";
import breedRoutes from "./routes/breed.routes";
import specieRoutes from "./routes/specie.routes";
import telemetryRoutes from "./routes/telemetry.routes";
import notificationRoutes from "./routes/notification.routes";
import { logger } from "./config/logger";
import { createServer } from "http";
import { initMqttService } from "./services/mqtt.service";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import helmet from "helmet";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";
import { authMiddleware } from "./middlewares/authMiddleware";
import { testDbConnection } from "./utils/testDbConnection";
import { runMigrationsAndSeeds } from "./utils/runMigrationsAndSeeds";
import sequelize from "./config/database";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(json());
app.use(requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/animals", authMiddleware, animalRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/devices", authMiddleware, deviceRoutes);
app.use("/api/species", authMiddleware, specieRoutes);
app.use("/api/breeds", authMiddleware, breedRoutes);
app.use("/api/telemetries", authMiddleware, telemetryRoutes);
app.use("/api/notifications", authMiddleware, notificationRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/api/health", (_: Request, res: Response) => {
  res.status(200).send("Servidor em execução.");
});

io.on("connection", (socket) => {
  logger.info("Novo cliente conectado.");

  socket.on("disconnect", () => {
    logger.info("Cliente desconectado.");
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  // await sequelize.sync({ force: false });
  await testDbConnection();
  // await resetDatabase();
  // await runMigrationsAndSeeds();
  logger.info(`Servidor rodando na porta ${PORT}`);
});

process.on("SIGINT", () => {
  logger.warn("Encerrando servidor de forma graciosa...");
  server.close(() => {
    logger.warn("Servidor fechado.");
    process.exit(0);
  });
});
