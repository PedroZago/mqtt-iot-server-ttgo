#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h> // Biblioteca para manipulação de JSON

// Configurações de rede
const char *ssid = "";     // Nome da rede WiFi
const char *password = ""; // Senha da rede WiFi

// Configurações do broker MQTT
const char *mqtt_server = ""; // IP do broker MQTT (seu computador)
const int mqtt_port = 1883;   // Porta do broker MQTT

WiFiClient espClient;
PubSubClient client(espClient);

// Função de conexão ao Wi-Fi
void setup_wifi()
{
  delay(10);
  Serial.println();
  Serial.print("Conectando à rede: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Conectado à rede WiFi!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

// Função de reconexão ao broker MQTT
void reconnect()
{
  // Loop até que o ESP32 se conecte ao broker MQTT
  while (!client.connected())
  {
    Serial.print("Tentando conectar ao MQTT... ");
    if (client.connect("ESP32Client"))
    { // Nome do cliente MQTT
      Serial.println("conectado");
    }
    else
    {
      Serial.print("Falha, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

void setup()
{
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port); // Define o broker MQTT
}

void loop()
{
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  // Publica uma mensagem a cada 10 segundos
  static unsigned long lastPublishTime = 0; // Armazena o tempo da última publicação
  unsigned long currentMillis = millis();   // Obtém o tempo atual

  if (currentMillis - lastPublishTime >= 10000)
  {                                  // Verifica se 10 segundos se passaram
    lastPublishTime = currentMillis; // Atualiza o tempo da última publicação

    // Cria um JSON para a mensagem
    StaticJsonDocument<200> doc; // Aloca um documento JSON
    doc["temperature"] = 25.0;   // Exemplo de temperatura
    doc["heartRate"] = 72;       // Exemplo de frequência cardíaca
    doc["latitude"] = -23.5505;  // Exemplo de latitude
    doc["longitude"] = -46.6333; // Exemplo de longitude

    // Serializa o JSON para uma String
    String message;
    serializeJson(doc, message);

    // Publica o JSON no tópico desejado
    client.publish("seu/topico", message.c_str());

    Serial.print("Publicando: ");
    Serial.println(message);
  }
}
