#include <Wire.h>
#include <TinyGPS++.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <MPU9250.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <SPI.h>
#include <SD.h> // Biblioteca para trabalhar com cartão SD

#define GPS_RX_PIN 16
#define GPS_TX_PIN 17
#define WIFI_SSID "Desktop_F5364807"
#define WIFI_PASSWORD "5071032903032618"

const char *gatewayIp = "192.168.1.32";
const int gatewayPort = 1234;

const char *mqtt_topic = "gateway/nodes/messages";

WiFiUDP udp;
TinyGPSPlus gps;
MAX30105 max30105; // Alteração do nome para evitar conflito
MPU9250 mpu;

byte rates[4];
byte rateSpot = 0;
long lastBeat = 0;
float beatsPerMinute;
int beatAvg;
String nodeId = "a1d7f7bc-3c64-4421-9b43-6eab123f3901";

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000); // Sincronização com NTP a cada 60 segundos

File dataFile; // Variável para armazenar o arquivo no cartão SD

void conectarWiFi()
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Tentando conectar ao Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }

  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Conectado ao Wi-Fi");
    String ipAddress = WiFi.localIP().toString();
    Serial.println("IP do ESP32: " + ipAddress);
  }
  else
  {
    Serial.println("Falha ao conectar ao Wi-Fi");
  }
}

void inicializarCartaoSD()
{
  if (!SD.begin(5)) // Pino 5 para o CS do cartão SD (ajuste se necessário)
  {
    Serial.println("Falha ao inicializar o cartão SD!");
    while (1)
      ;
  }
  else
  {
    Serial.println("Cartão SD inicializado com sucesso");
  }
}

void setup()
{
  Serial.begin(115200);

  conectarWiFi();

  // Inicialização do MAX30105
  if (!max30105.begin(Wire, I2C_SPEED_FAST))
  {
    Serial.println("Falha ao inicializar o sensor MAX30105");
    while (1)
      ; // Travar o código caso o sensor falhe
  }
  else
  {
    Serial.println("Sensor MAX30105 inicializado com sucesso");
  }
  max30105.setup();                    // Configuração do MAX30105
  max30105.setPulseAmplitudeRed(0x0A); // Definição da amplitude do pulso

  if (!mpu.setup(0x68))
  { // change to your own address
    while (1)
    {
      Serial.println("MPU connection failed. Please check your connection with `connection_check` example.");
      delay(5000);
    }
  }

  // Inicialização do GPS
  Serial2.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
  Serial.println("Esperando dados do GPS...");

  // Inicialização do NTPClient
  timeClient.begin();
  if (!timeClient.update())
  {
    Serial.println("Falha na sincronização NTP");
  }
  else
  {
    Serial.println("Sincronização NTP bem-sucedida");
  }

  // Inicializar o cartão SD para backup
  inicializarCartaoSD();
}

void loop()
{
  long irValue = max30105.getIR(); // Leitura do valor IR do MAX30105
  if (checkForBeat(irValue))
  {
    long delta = millis() - lastBeat;
    lastBeat = millis();
    beatsPerMinute = 60 / (delta / 1000.0);
    if (beatsPerMinute > 20 && beatsPerMinute < 255)
    {
      rates[rateSpot++] = (byte)beatsPerMinute;
      rateSpot %= 4;
      beatAvg = 0;
      for (byte x = 0; x < 4; x++)
        beatAvg += rates[x];
      beatAvg /= 4;
    }
  }

  float temperature = max30105.readTemperature(); // Leitura da temperatura do MAX30105
  Serial.printf("IR=%ld, BPM=%.2f, Média BPM=%d, Temp=%.2f\n", irValue, beatsPerMinute, beatAvg, temperature);

  // Leitura e verificação de dados GPS
  while (Serial2.available() > 0)
  {
    gps.encode(Serial2.read());
  }

  // Mesmo que o GPS não tenha sido atualizado, sempre loga a posição
  String gpsData = "Lat: " + String(gps.location.lat(), 6) + " Lon: " + String(gps.location.lng(), 6);
  Serial.println(gpsData);

  // Atualização do MPU9250
  if (mpu.update())
  {
    float ax = mpu.getAccX(), ay = mpu.getAccY(), az = mpu.getAccZ();
    float gx = mpu.getGyroX(), gy = mpu.getGyroY(), gz = mpu.getGyroZ();
    Serial.printf("Aceleração: (%.2f, %.2f, %.2f), Giroscópio: (%.2f, %.2f, %.2f)\n", ax, ay, az, gx, gy, gz);
  }
  else
  {
    Serial.println("Erro ao atualizar os dados do MPU9250");
  }

  // Sincronização com o servidor NTP para pegar o timestamp
  timeClient.update();
  String timestamp = timeClient.getFormattedTime();
  Serial.println("Timestamp NTP: " + timestamp);

  // Criação do JSON
  StaticJsonDocument<512> doc;
  doc["topic"] = mqtt_topic;
  doc["nodeId"] = nodeId;
  doc["temperature"] = temperature;
  doc["heartRate"] = beatAvg;
  doc["latitude"] = gps.location.lat();
  doc["longitude"] = gps.location.lng();
  doc["altitude"] = gps.altitude.meters();
  doc["speed"] = gps.speed.kmph();
  doc["timestamp"] = timestamp;

  String jsonData;
  serializeJson(doc, jsonData);

  Serial.println("JSON " + jsonData);

  int result = udp.beginPacket(gatewayIp, gatewayPort);
  if (result)
  {
    udp.write((const uint8_t *)jsonData.c_str(), jsonData.length());
    udp.endPacket();
    Serial.println("Pacote enviado com sucesso");
  }
  else
  {
    Serial.println("Falha ao iniciar envio do pacote UDP");
  }

  // Salvar os dados no cartão SD como backup
  dataFile = SD.open("/data_backup.txt", FILE_APPEND);
  if (dataFile)
  {
    dataFile.println(jsonData); // Salva os dados JSON no arquivo
    dataFile.close();           // Fecha o arquivo
    Serial.println("Dados salvos no cartão SD");
  }
  else
  {
    Serial.println("Erro ao abrir o arquivo para escrita no cartão SD");
  }

  Serial.println("---------------");

  delay(2000);
}
