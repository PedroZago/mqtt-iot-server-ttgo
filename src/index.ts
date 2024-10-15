import dotenv from "dotenv";
import express, { json, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/database";
import authRouter from "./routes/authRoutes";
import iotRoutes from "./routes/iotRoutes";
import { logger } from "./config/logger";
import { createServer } from "http";
import { initMqttService } from "./services/mqttService";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/requestLogger";
import helmet from "helmet";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(json());
app.use(requestLogger);

app.use("/api/auth", authRouter);
app.use("/api/iot", iotRoutes);

app.get("/api/health", (_: Request, res: Response) => {
  res.status(200).send("Server is running.");
});

initMqttService(io);

connectDB();

io.on("connection", (socket) => {
  logger.info("New client connected");

  socket.on("disconnect", () => {
    logger.info("Client disconnected");
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  logger.warn("Shutting down gracefully...");
  server.close(() => {
    logger.warn("Server closed.");
    process.exit(0);
  });
});