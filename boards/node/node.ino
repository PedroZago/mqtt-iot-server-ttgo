#include <LoRa.h>
#include <ArduinoJson.h>

// Configurações do LoRa
#define LORA_BAND 915E6

// Limites
const unsigned long SEND_INTERVAL = 20000;  // Aumentado para 20 segundos

unsigned long lastSendTime = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial)
    ;  // Aguarda a conexão serial (opcional)

  if (!LoRa.begin(LORA_BAND)) {
    Serial.println("Erro ao inicializar LoRa. Verifique a conexão.");
    // Não trava o programa aqui, apenas tenta reinicializar
    while (true) {
      delay(1000);  // Aguarda 1 segundo antes de tentar novamente
      Serial.println("Tentando reinicializar LoRa...");
      if (LoRa.begin(LORA_BAND)) {
        Serial.println("LoRa inicializado com sucesso.");
        break;  // Sai do loop se a inicialização for bem-sucedida
      }
    }
  }

  Serial.println("Node iniciado e pronto.");
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - lastSendTime >= SEND_INTERVAL) {
    lastSendTime = currentMillis;

    // Criar um JSON com dados simulados
    StaticJsonDocument<200> doc;
    doc["temperature"] = random(20, 30);   // Simulando temperatura entre 20 a 30 graus
    doc["heartRate"] = random(60, 100);    // Simulando frequência cardíaca entre 60 a 100 bpm
    doc["latitude"] = random(-90, 90);     // Simulando latitude
    doc["longitude"] = random(-180, 180);  // Simulando longitude
    String jsonMessage;
    serializeJson(doc, jsonMessage);

    // Enviar mensagem via LoRa
    LoRa.beginPacket();
    LoRa.print(jsonMessage);    // Enviar JSON diretamente
    if (LoRa.endPacket() == 1)  // Verifica se o pacote foi enviado com sucesso
    {
      Serial.println("Mensagem enviada: " + jsonMessage);
    } else {
      Serial.println("Falha ao enviar mensagem.");
    }
  }
  yield();  // Libera o watchdog timer
}
