import { logger } from "../config/logger";
import { Server } from "socket.io";
import { mqttClient } from "../config/mqtt";
import Telemetry from "../models/telemetry.model";

export const initMqttService = (io: Server): void => {
  mqttClient.on("connect", () => {
    logger.info("Connected to MQTT Broker");
    logger.info(
      `Broker: ${process.env.MQTT_BROKER}, Port: ${process.env.MQTT_PORT}, Client ID: ${process.env.CLIENT_ID}`
    );

    mqttClient.subscribe("node/messages", (err) => {
      if (err) {
        logger.error(`Error subscribing to topic: ${err.message}`);
      } else {
        logger.info('Subscribed to topic "node/messages"');
      }
    });
  });

  mqttClient.on("error", (err) => {
    logger.error(`MQTT Client Error: ${err.message}`);
    mqttClient.end();
  });

  mqttClient.on("message", async (topic, message: any) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      const deviceId: number = parsedMessage.deviceId;
      delete parsedMessage.deviceId;

      const finalMessage = {
        ...parsedMessage,
        clientId: process.env.CLIENT_ID ?? "",
      };

      // await Telemetry.create({
      //   topic,
      //   message: parsedMessage,
      //   deviceId,
      // });

      logger.info(`Mensagem publicada no tópico ${topic}:`, finalMessage);
    } catch (error) {
      logger.error(
        `Erro ao armazenar mensagem no banco de dados: ${
          error instanceof Error
            ? error.message
            : "Um erro desconhecido ocorreu"
        }`
      );
    }
  });
};
