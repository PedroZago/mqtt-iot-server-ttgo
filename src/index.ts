import dotenv from "dotenv";
import express, { json, Request, Response } from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import deviceRoutes from "./routes/device.routes";
import specieRoutes from "./routes/specie.routes";
import telemetryRoutes from "./routes/telemetry.routes";
import { logger } from "./config/logger";
import { createServer } from "http";
import { initMqttService } from "./services/mqtt.service";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import helmet from "helmet";
import sequelize from "./config/database";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(json());
app.use(requestLogger);

app.use("/api/animal", animalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/specie", specieRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/api/health", (_: Request, res: Response) => {
  res.status(200).send("Server is running.");
});

// initMqttService(io);

io.on("connection", (socket) => {
  logger.info("New client connected");

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
});

app.use(errorHandler);

async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await testDbConnection();
  logger.info(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  logger.warn("Shutting down gracefully...");
  server.close(() => {
    logger.warn("Server closed.");
    process.exit(0);
  });
});
