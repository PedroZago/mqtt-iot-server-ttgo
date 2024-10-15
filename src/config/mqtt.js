const mqtt = require("mqtt");

const connectMQTT = (url) => {
  const client = mqtt.connect(url);

  client.on("connect", () => {
    console.log("MQTT connected");
  });

  client.on("error", (error) => {
    console.error("MQTT connection error:", error);
  });

  return client;
};

module.exports = connectMQTT;
