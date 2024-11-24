#include <Wire.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const char *ssid = "Desktop_F5364807";
const char *password = "5071032903032618";
const char *mqtt_server = "192.168.1.11";
const int mqtt_port = 1883;
const char *mqtt_topic = "gateway/nodes/messages";

WiFiUDP udp;
const int gatewayPort = 1234;
WiFiClient espClient;
PubSubClient client(espClient);

void setup()
{
  // Inicializa a comunicação serial
  Serial.begin(115200);

  // Inicializa o display OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C))
  {
    Serial.println("Falha ao inicializar o display OLED");
    while (true)
      ;
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  // Conectar-se ao Wi-Fi
  WiFi.begin(ssid, password);
  display.setCursor(0, 0);
  display.print("Conectando ao Wi-Fi...");
  display.display();

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }

  udp.begin(gatewayPort);

  Serial.println("Conectado ao Wi-Fi");
  String ipAddress = WiFi.localIP().toString();
  Serial.println("IP do ESP32: " + ipAddress);

  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Wi-Fi Conectado");
  display.setCursor(0, 20);
  display.print("IP: ");
  display.print(ipAddress);
  display.display();

  // Configuração do MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback([](char *topic, byte *payload, unsigned int length)
                     {
    Serial.print("Mensagem recebida no tópico: ");
    for (unsigned int i = 0; i < length; i++) {
      Serial.print((char)payload[i]);
    }
    Serial.println(); });
}

void loop()
{
  // Reconectar ao MQTT se desconectado
  if (!client.connected())
  {
    while (!client.connected())
    {
      Serial.print("Tentando conexão MQTT...");
      String clientId = "Gateway_" + String(WiFi.macAddress());
      if (client.connect(clientId.c_str()))
      {
        Serial.println("Conectado ao MQTT");
        client.subscribe(mqtt_topic);
      }
      else
      {
        Serial.print("Falha na conexão. Código de erro: ");
        Serial.println(client.state());
        delay(5000);
      }
    }
  }

  // Processar pacotes UDP
  int packetSize = udp.parsePacket();
  if (packetSize)
  {
    Serial.printf("Pacote recebido com tamanho: %d bytes\n", packetSize);

    char packetBuffer[512];
    udp.read(packetBuffer, packetSize);
    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, packetBuffer);

    if (!error)
    {
      String deviceId = doc["deviceId"].as<String>();
      String timestamp = doc["timestamp"].as<String>();
      Serial.printf("Recebido de %s no timestamp %s\n", deviceId.c_str(), timestamp.c_str());

      // Enviar dados via MQTT
      String payload;
      serializeJson(doc, payload);
      bool mqttStatus = client.publish(mqtt_topic, payload.c_str());

      if (mqttStatus)
      {
        Serial.println("Mensagem enviada com sucesso via MQTT");
      }
      else
      {
        Serial.print("Falha ao enviar mensagem via MQTT. Código de erro: ");
        Serial.println(client.state());

        // Tente reconectar ao MQTT se houver falha
        if (!client.connected())
        {
          Serial.println("Reconectando ao MQTT...");
          String clientId = "Gateway_Recovery_" + String(WiFi.macAddress());
          client.connect(clientId.c_str());
        }
      }
    }
    else
    {
      Serial.println("Falha ao processar JSON");
    }
  }

  // Loop do MQTT
  client.loop();
}
