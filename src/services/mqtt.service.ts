import { logger } from "../config/logger";
import { Server } from "socket.io";
import { mqttClient } from "../config/mqtt";
import { TelemetryService } from "../services/implementations/telemetry.service";
import { TelemetryRepository } from "../repositories/implementations/telemetry.repository";
import { TelemetryData } from "../models/telemetry.model";

// Instanciando os serviços
const telemetryRepository = new TelemetryRepository();
const telemetryService = new TelemetryService(telemetryRepository);

// Buffer para armazenar mensagens temporariamente
let messageBuffer: TelemetryData[] = [];
const BATCH_SIZE = 10; // Número de mensagens para processar em lote
const BATCH_INTERVAL = 5000; // Intervalo para processar o lote (5 segundos)

const processBatch = async () => {
  if (messageBuffer.length > 0) {
    const batch = [...messageBuffer];
    messageBuffer = []; // Limpa o buffer após processar

    try {
      // Usando Promise.all para processar todas as mensagens do lote
      await Promise.all(
        batch.map(async (data) => {
          try {
            // Salva as mensagens de telemetria no banco de dados
            await telemetryService.createTelemetry(data);
            logger.info("Telemetry data saved: ", data);
          } catch (error) {
            logger.error("Error saving telemetry data: ", error);
          }
        })
      );
    } catch (error) {
      logger.error("Error processing batch :", error);
    }
  }
};

// Chama o processBatch em intervalos regulares
setInterval(processBatch, BATCH_INTERVAL);

export const initMqttService = (io: Server): void => {
  mqttClient.on("connect", () => {
    logger.info("Connected to MQTT Broker");
    logger.info(
      `Broker: ${process.env.MQTT_BROKER}, Port: ${process.env.MQTT_PORT}, Client ID: ${process.env.CLIENT_ID}`
    );

    mqttClient.subscribe("gateway/nodes/messages", (err) => {
      if (err) {
        logger.error("Failed to subscribe to topic");
      } else {
        logger.info("Successfully subscribed to topic");
      }
    });
  });

  mqttClient.on("error", (err) => {
    logger.error(`MQTT Client Error: ${err.message}`);
    mqttClient.end();
  });

  mqttClient.on("message", async (topic, message) => {
    try {
      const telemetryData: TelemetryData = JSON.parse(message.toString());

      // Adiciona a nova mensagem ao buffer
      messageBuffer.push(telemetryData);

      // Se o buffer atingir o tamanho do lote, processa imediatamente
      if (messageBuffer.length >= BATCH_SIZE) {
        await processBatch();
      }
    } catch (error) {
      logger.error("Error processing MQTT message: ", error);
    }
  });
};
