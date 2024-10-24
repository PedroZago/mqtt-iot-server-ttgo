#include <TinyGPSPlus.h>
#include <HardwareSerial.h>

// Configuração do pino UART para o módulo GPS
#define RX_PIN 34  // Defina o pino RX conectado ao TX do módulo GPS
#define TX_PIN 12  // Defina o pino TX conectado ao RX do módulo GPS

// Instanciação do objeto TinyGPSPlus
TinyGPSPlus gps;

// Criação de uma instância de HardwareSerial para a comunicação serial com o GPS
HardwareSerial serialGPS(1);  // Usamos o UART1 para o GPS

unsigned long previousMillis = 0;
const long interval = 1000;  // Intervalo de 1 segundo (1000 ms)

void setup() {
  Serial.begin(115200);                               // Inicializa o monitor serial
  serialGPS.begin(9600, SERIAL_8N1, RX_PIN, TX_PIN);  // Inicializa a comunicação UART com o GPS

  Serial.println(F("ESP32 GPS Example"));
  Serial.println(F("Reading data from GPS module using TinyGPSPlus"));
}

void loop() {
  unsigned long currentMillis = millis();

  // Verifica se o intervalo de 1 segundo passou
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    // Processa os dados recebidos do módulo GPS
    while (serialGPS.available() > 0) {
      char c = serialGPS.read();  // Lê um caractere da serial
      Serial.write(c);            // Imprime o caractere recebido diretamente no monitor serial
      if (gps.encode(c)) {        // Passa o caractere para a biblioteca TinyGPSPlus
        displayInfo();            // Exibe as informações do GPS
      }
    }
    Serial.println();
  }
}

void displayInfo() {
  // Exibe as coordenadas de localização (latitude e longitude)
  Serial.print(F("Location: "));
  if (gps.location.isValid()) {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  } else {
    Serial.print(F("INVALID"));
  }

  // Exibe a data
  Serial.print(F("  Date: "));
  if (gps.date.isValid()) {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  } else {
    Serial.print(F("INVALID"));
  }

  // Exibe o horário
  Serial.print(F("  Time: "));
  if (gps.time.isValid()) {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  } else {
    Serial.print(F("INVALID"));
  }

  Serial.println();
}
