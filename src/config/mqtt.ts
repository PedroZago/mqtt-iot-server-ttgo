import dotenv from "dotenv";
import mqtt from "mqtt";

dotenv.config();

const mqttOptions = {
  clientId: process.env.CLIENT_ID,
  keepalive: parseInt(process.env.MQTT_KEEPALIVE || "60"),
  reconnectPeriod: 1000,
  username: process.env.MQTT_USERNAME || "",
  password: process.env.MQTT_PASSWORD || "",
};

export const mqttClient = mqtt.connect(
  `mqtt://${process.env.MQTT_BROKER}:${process.env.MQTT_PORT}`,
  mqttOptions
);
