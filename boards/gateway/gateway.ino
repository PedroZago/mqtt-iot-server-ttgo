#include <SPI.h>
#include <LoRa.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <queue>

// Configurações de rede
const char *ssid = "Desktop_F5364807";
const char *password = "5071032903032618";

// Configurações do broker MQTT
const char *mqtt_server = "192.168.1.11"; // IP do broker MQTT
const int mqtt_port = 1883;               // Porta do broker MQTT

// Parâmetros do LoRa
#define LORA_BAND 915E6

WiFiClient espClient;
PubSubClient client(espClient);

// Fila de mensagens com limite
std::queue<String> messageQueue;
const int MAX_QUEUE_SIZE = 50; // Limite da fila de mensagens

// Função para conectar ao Wi-Fi
void setup_wifi()
{
  Serial.print("Conectando à rede: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.println();
  Serial.println("Conectado à rede WiFi!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

// Função para reconectar ao broker MQTT
void reconnect_mqtt_server()
{
  while (!client.connected())
  {
    Serial.println("Conectando ao broker MQTT...");
    if (client.connect("gatewayNode"))
    {
      Serial.println("Conectado ao MQTT.");
    }
    else
    {
      Serial.print("Falha ao conectar. Código: ");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

// Função para processar mensagens
void processMessages()
{
  if (!messageQueue.empty())
  {
    String messageToSend = messageQueue.front();
    messageQueue.pop(); // Remover a mensagem da fila

    // Enviar mensagem via MQTT
    if (client.connected())
    {
      if (client.publish("node/messages", messageToSend.c_str()))
      {
        Serial.println("Mensagem enviada via MQTT: " + messageToSend);
      }
      else
      {
        Serial.println("Falha ao enviar a mensagem via MQTT.");
        // Caso falhe, podemos adicionar a mensagem novamente à fila
        messageQueue.push(messageToSend);
      }
    }
    else
    {
      Serial.println("Conexão MQTT perdida. Tentando reconectar...");
      reconnect_mqtt_server();
    }
  }
}

void setup()
{
  Serial.begin(115200);

  setup_wifi();

  client.setServer(mqtt_server, mqtt_port); // Define o broker MQTT
  reconnect_mqtt_server();

  // Iniciar LoRa
  if (!LoRa.begin(LORA_BAND))
  {
    Serial.println("Falha ao iniciar o LoRa!");
    while (1)
      ;
  }

  Serial.println("Gateway iniciado e pronto.");
}

void loop()
{
  // Verificar se há pacotes LoRa disponíveis
  int packetSize = LoRa.parsePacket();
  if (packetSize)
  {
    String incomingMessage = "";
    while (LoRa.available())
    {
      incomingMessage += (char)LoRa.read();
    }

    // Adicionar mensagem à fila com limite
    if (messageQueue.size() < MAX_QUEUE_SIZE)
    {
      messageQueue.push(incomingMessage);
      Serial.println("Mensagem recebida via LoRa: " + incomingMessage);
    }
    else
    {
      Serial.println("Fila de mensagens cheia, descartando mensagem.");
    }
  }

  // Processar mensagens na fila
  processMessages();

  client.loop(); // Manter a conexão MQTT ativa
}
