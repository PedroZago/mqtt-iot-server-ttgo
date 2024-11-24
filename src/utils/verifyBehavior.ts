import { MqttMessageData } from "../services/mqtt.service";

export const verifyBehavior = (message: MqttMessageData) => {
  let behavior = "";

  if (
    message.temperature <= 37 &&
    message.heartRate <= 80 &&
    message.speed === 0
  ) {
    behavior = "Repouso ou Inatividade";
  } else if (
    message.temperature > 37 &&
    message.heartRate > 100 &&
    message.speed > 0
  ) {
    behavior = "Atividade Física ou Movimento";
  } else if (
    message.temperature > 39 &&
    message.heartRate > 120 &&
    (message.speed < 5 || message.speed === 0)
  ) {
    behavior = "Desidratação ou Estresse";
  } else if (
    message.temperature < 35 ||
    message.temperature > 40 ||
    message.heartRate > 140 ||
    message.speed === 0
  ) {
    behavior = "Emergência ou Doença";
  } else if (
    message.temperature <= 37.5 &&
    message.heartRate > 80 &&
    message.speed >= 2
  ) {
    behavior = "Atividade Noturna";
  } else {
    behavior = "Comportamento Desconhecido";
  }

  return behavior;
};
