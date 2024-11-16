#include <Wire.h>
#include <TinyGPS++.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <MPU9250.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <ArduinoJson.h>
#include <NTPClient.h>

#define GPS_RX_PIN 16
#define GPS_TX_PIN 17
#define WIFI_SSID "Desktop_F5364807"
#define WIFI_PASSWORD "5071032903032618"

const char *gatewayIp = "192.168.1.100";
const int gatewayPort = 1234;

WiFiUDP udp;
TinyGPSPlus gps;
MAX30105 max;
MPU9250 mpu;

byte rates[4];
byte rateSpot = 0;
long lastBeat = 0;
float beatsPerMinute;
int beatAvg;
String nodeId = "node_01";

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000); // Sincronização com NTP a cada 60 segundos

void conectarWiFi()
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }

  Serial.println("Conectado ao Wi-Fi");
  String ipAddress = WiFi.localIP().toString();
  Serial.println("IP do ESP32: " + ipAddress);
}

void setup()
{
  Serial.begin(115200);

  conectarWiFi();

  if (!max.begin(Wire, I2C_SPEED_FAST))
    while (1)
      ;
  max.setup();
  max.setPulseAmplitudeRed(0x0A);

  Serial2.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
  timeClient.begin(); // Inicializando NTPClient
}

void loop()
{
  long irValue = max.getIR();
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

  float temperature = max.readTemperature();
  Serial.printf("IR=%ld, BPM=%.2f, Média BPM=%d, Temp=%.2f\n", irValue, beatsPerMinute, beatAvg, temperature);

  while (Serial2.available() > 0)
  {
    gps.encode(Serial2.read());
    if (gps.location.isUpdated())
    {
      String gpsData = "Lat: " + String(gps.location.lat(), 6) + " Lon: " + String(gps.location.lng(), 6);
      Serial.println(gpsData);
    }
  }

  mpu.update();
  float ax = mpu.getAccX(), ay = mpu.getAccY(), az = mpu.getAccZ();
  float gx = mpu.getGyroX(), gy = mpu.getGyroY(), gz = mpu.getGyroZ();
  Serial.printf("Aceleração: (%.2f, %.2f, %.2f), Giroscópio: (%.2f, %.2f, %.2f)\n", ax, ay, az, gx, gy, gz);

  // Sincronização com o servidor NTP para pegar o timestamp
  timeClient.update();
  String timestamp = timeClient.getFormattedTime();

  StaticJsonDocument<512> doc;
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

  udp.beginPacket(gatewayIp, gatewayPort);
  udp.write((const uint8_t *)jsonData.c_str(), jsonData.length());
  udp.endPacket();

  delay(10000);
}
