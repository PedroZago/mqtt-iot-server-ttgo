const mqtt = require("mqtt");
const connectMQTT = require("../config/mqtt");

const mqttClient = connectMQTT(process.env.MQTT_URL);

const publishData = (topic, message) => {
  mqttClient.publish(topic, JSON.stringify(message), (error) => {
    if (error) {
      console.error("Publish error:", error);
    }
  });
};

const subscribeToTopic = (topic, callback) => {
  mqttClient.subscribe(topic, (error) => {
    if (error) {
      console.error("Subscription error:", error);
    }
  });

  mqttClient.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
      callback(JSON.parse(message.toString()));
    }
  });
};

module.exports = {
  publishData,
  subscribeToTopic,
};
