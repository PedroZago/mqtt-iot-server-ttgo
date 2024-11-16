#include <Wire.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <NTPClient.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const char *ssid = "Desktop_F5364807";
const char *password = "5071032903032618";
const char *mqtt_server = "192.168.1.11";
const int mqtt_port = 8883;
const char *mqtt_topic = "gateway/nodes/messages";

WiFiUDP udp;
const int gatewayPort = 1234;
WiFiClientSecure espClient;
PubSubClient client(espClient);
NTPClient timeClient(udp, "pool.ntp.org", 0, 60000); // NTPClient para timestamp

unsigned long lastMessageTime = 0;
const unsigned long messageInterval = 5000;

void inicializarDisplay()
{
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C))
  {
    Serial.println("Falha ao inicializar o display OLED");
    while (true)
      ;
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
}

void conectarWiFi()
{
  IPAddress local_IP(192, 168, 1, 100);
  IPAddress gateway(192, 168, 1, 1);
  IPAddress subnet(255, 255, 255, 0);
  IPAddress primaryDNS(8, 8, 8, 8);
  IPAddress secondaryDNS(8, 8, 4, 4);

  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS))
  {
    Serial.println("Falha ao configurar o IP fixo");
  }

  WiFi.begin(ssid, password);
  display.setCursor(0, 0);
  display.print("Conectando ao Wi-Fi...");
  display.display();

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }

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
}

void configurarMQTT()
{
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(mqttCallback);
}

void mqttCallback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Mensagem recebida no tópico: ");
  for (unsigned int i = 0; i < length; i++)
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconectarMQTT()
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

void processarPacoteUDP()
{
  int packetSize = udp.parsePacket();
  if (packetSize)
  {
    char packetBuffer[512];
    udp.read(packetBuffer, packetSize);
    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, packetBuffer);

    if (!error)
    {
      String nodeId = doc["nodeId"].as<String>();
      String timestamp = doc["timestamp"].as<String>();
      Serial.printf("Recebido de %s no timestamp %s\n", nodeId.c_str(), timestamp.c_str());

      exibirDadosNoOLED(doc);
      enviarDadosMQTT(doc);
    }
    else
    {
      Serial.println("Falha ao processar JSON");
    }
  }
}

void exibirDadosNoOLED(StaticJsonDocument<512> &doc)
{
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Node ID: ");
  display.println(doc["nodeId"].as<String>());
  display.print("Temperatura: ");
  display.println(doc["temperature"].as<float>());
  display.print("Batimento: ");
  display.println(doc["heartRate"].as<int>());
  display.print("Latitude: ");
  display.println(doc["latitude"].as<float>(), 6);
  display.print("Longitude: ");
  display.println(doc["longitude"].as<float>(), 6);
  display.display();
}

void enviarDadosMQTT(StaticJsonDocument<512> &doc)
{
  String payload;
  serializeJson(doc, payload);
  if (client.publish(mqtt_topic, payload.c_str()))
  {
    Serial.println("Mensagem enviada com sucesso via MQTT");
  }
  else
  {
    Serial.println("Falha ao enviar mensagem via MQTT");
  }
}

void setup()
{
  Serial.begin(115200);
  inicializarDisplay();
  conectarWiFi();
  configurarMQTT();
  udp.begin(gatewayPort);
  timeClient.begin(); // Iniciar o NTPClient
}

void loop()
{
  if (!client.connected())
  {
    reconectarMQTT();
  }
  client.loop();
  timeClient.update();
  processarPacoteUDP();
}
