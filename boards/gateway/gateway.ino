#include <WiFi.h>
#include <WiFiUdp.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>  // Biblioteca para o display OLED

#define SCREEN_WIDTH 128  // Largura do display OLED
#define SCREEN_HEIGHT 64  // Altura do display OLED
#define OLED_RESET    -1  // Reset do OLED (não é necessário para algumas placas)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const char *ssid = "Desktop_F5364807";     // Nome da rede WiFi
const char *password = "5071032903032618"; // Senha da rede WiFi

WiFiUDP udp;
const int gatewayPort = 1234;  // Porta onde vai escutar as mensagens

void setup() {
  Serial.begin(115200);

  // Inicializa o display OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {  // Endereço I2C do OLED (0x3C)
    Serial.println(F("Falha ao inicializar o display OLED"));
    while (true);  // Fica em loop infinito se não inicializar
  }
  
  display.clearDisplay();
  display.setTextSize(1);      // Tamanho do texto (1 é o padrão)
  display.setTextColor(SSD1306_WHITE); // Cor do texto

  // Conectando ao Wi-Fi
  WiFi.begin(ssid, password);
  display.setCursor(0, 0);  // Define posição do cursor no OLED
  display.print("Conectando ao Wi-Fi...");
  display.display();  // Atualiza o display

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }
  Serial.println("Conectado ao Wi-Fi");

  // Mostra o IP no Serial e no OLED
  String ipAddress = WiFi.localIP().toString();
  Serial.println("IP do ESP32: " + ipAddress);

  // Exibe o IP no OLED
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Conectado ao Wi-Fi");
  display.setCursor(0, 20);
  display.print("IP: ");
  display.print(ipAddress);
  display.display();  // Atualiza o display

  udp.begin(gatewayPort);
}

void loop() {
  int packetSize = udp.parsePacket();
  if (packetSize) {
    char incomingPacket[255];
    int len = udp.read(incomingPacket, 255);
    if (len > 0) {
      incomingPacket[len] = 0;
    }
    Serial.printf("Recebido do Node: %s\n", incomingPacket);
  }
}
