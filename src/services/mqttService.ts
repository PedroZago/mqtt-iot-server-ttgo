import { IotData, IMessage } from "../models/IotData";
import { logger } from "../config/logger";
import { Server } from "socket.io";
import { mqttClient } from "../config/mqtt";

export const initMqttService = (io: Server): void => {
  mqttClient.on("connect", () => {
    logger.info("Connected to MQTT Broker");
    logger.info(
      `Broker: ${process.env.MQTT_BROKER}, Port: ${process.env.MQTT_PORT}, Client ID: ${process.env.CLIENT_ID}`
    );

    mqttClient.subscribe("ttgo/+/data", (err) => {
      if (err) {
        logger.error(`Error subscribing to topic: ${err.message}`);
      } else {
        logger.info('Subscribed to topic "ttgo/+/data"');
      }
    });
  });

  mqttClient.on("error", (err) => {
    logger.error(`MQTT Client Error: ${err.message}`);
    mqttClient.end();
  });

  mqttClient.on("message", async (topic, message) => {
    try {
      const payload: IMessage = JSON.parse(message.toString());

      if (typeof payload !== "object" || payload === null) {
        throw new Error("Invalid message format. Must be a JSON object.");
      }

      logger.info(`Message received on topic ${topic}:`, payload);

      const iotMessage = { topic, message: payload };

      const result = await IotData.create(iotMessage);

      logger.info(`Message stored with ID: ${result._id}`);

      io.emit("new_data", JSON.stringify(iotMessage));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      logger.error(`Error storing message in MongoDB: ${errorMessage}`);
    }
  });
};
