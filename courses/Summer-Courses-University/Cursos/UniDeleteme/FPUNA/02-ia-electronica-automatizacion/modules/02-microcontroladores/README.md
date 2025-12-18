# Módulo 02: IA para Microcontroladores
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Generar código Arduino con asistencia de IA
- Programar ESP32/ESP8266 con prompts efectivos
- Crear drivers para sensores comunes
- Optimizar código embebido para recursos limitados
- Aplicar debugging asistido por IA

---

## 1. Generación de Código Arduino con IA

### 1.1 Anatomía de un Buen Prompt para Arduino

```
[HARDWARE]
Plataforma: Arduino Uno/Mega/Nano
Sensores: [lista con modelo y conexión]
Actuadores: [lista con modelo y conexión]
Comunicación: [Serial, I2C, SPI, WiFi]

[FUNCIONALIDAD]
Objetivo principal: [descripción]
Comportamiento esperado: [paso a paso]

[RESTRICCIONES]
Memoria: [si hay limitaciones]
Timing: [requisitos de tiempo real]
Consumo: [si es crítico]

[FORMATO]
Lenguaje: Arduino C++
Bibliotecas: [preferencias]
Comentarios: [idioma, nivel de detalle]
```

### 1.2 Ejemplo: Sistema de Control de Iluminación

**Prompt:**
```
Hardware: Arduino Uno
- Sensor LDR en pin A0
- LED RGB en pines 9 (R), 10 (G), 11 (B) con PWM
- Potenciómetro en A1 para ajuste de sensibilidad

Funcionalidad:
- Leer nivel de luz ambiente
- Ajustar brillo del LED inversamente proporcional a la luz
- El potenciómetro ajusta el umbral de activación
- Mostrar valores en Serial cada 500ms

Formato: Arduino con comentarios en español, bien estructurado
```

**Código generado:**
```cpp
/*
 * Sistema de Control de Iluminación Automática
 * Arduino Uno
 *
 * Componentes:
 * - LDR en A0 (divisor de voltaje con 10K)
 * - LED RGB en pines 9, 10, 11 (PWM)
 * - Potenciómetro en A1
 */

// Definición de pines
const int LDR_PIN = A0;
const int POT_PIN = A1;
const int LED_R = 9;
const int LED_G = 10;
const int LED_B = 11;

// Variables de configuración
const int INTERVALO_LECTURA = 500;  // ms
unsigned long ultimaLectura = 0;

// Variables de estado
int nivelLuz = 0;
int umbral = 0;
int brilloLED = 0;

void setup() {
    // Inicializar comunicación serial
    Serial.begin(9600);

    // Configurar pines de salida
    pinMode(LED_R, OUTPUT);
    pinMode(LED_G, OUTPUT);
    pinMode(LED_B, OUTPUT);

    Serial.println("Sistema de iluminación iniciado");
    Serial.println("----------------------------");
}

void loop() {
    unsigned long tiempoActual = millis();

    // Leer sensores cada INTERVALO_LECTURA ms
    if (tiempoActual - ultimaLectura >= INTERVALO_LECTURA) {
        ultimaLectura = tiempoActual;

        // Leer nivel de luz (0-1023)
        nivelLuz = analogRead(LDR_PIN);

        // Leer umbral del potenciómetro (0-1023)
        umbral = analogRead(POT_PIN);

        // Calcular brillo del LED (inverso a la luz ambiente)
        // Solo si la luz está por debajo del umbral
        if (nivelLuz < umbral) {
            // Mapear: menos luz ambiente = más brillo LED
            brilloLED = map(nivelLuz, 0, umbral, 255, 0);
        } else {
            brilloLED = 0;  // Suficiente luz ambiente
        }

        // Aplicar brillo al LED (blanco cálido)
        analogWrite(LED_R, brilloLED);
        analogWrite(LED_G, brilloLED * 0.8);  // Un poco menos verde
        analogWrite(LED_B, brilloLED * 0.5);  // Menos azul para tono cálido

        // Mostrar información en Serial
        imprimirEstado();
    }
}

void imprimirEstado() {
    Serial.print("Luz: ");
    Serial.print(nivelLuz);
    Serial.print(" | Umbral: ");
    Serial.print(umbral);
    Serial.print(" | LED: ");
    Serial.print(brilloLED);
    Serial.println();
}
```

### 1.3 Patrones Comunes en Arduino

**Máquina de Estados:**
```cpp
// Prompt: "Genera máquina de estados para semáforo con
//          3 LEDs, botón de peatón, tiempos configurables"

enum Estado {
    VERDE,
    AMARILLO,
    ROJO,
    PEATON
};

Estado estadoActual = VERDE;
unsigned long tiempoEstado = 0;

// Tiempos en milisegundos
const unsigned long TIEMPO_VERDE = 5000;
const unsigned long TIEMPO_AMARILLO = 2000;
const unsigned long TIEMPO_ROJO = 5000;
const unsigned long TIEMPO_PEATON = 3000;

void loop() {
    switch (estadoActual) {
        case VERDE:
            digitalWrite(LED_VERDE, HIGH);
            digitalWrite(LED_AMARILLO, LOW);
            digitalWrite(LED_ROJO, LOW);

            if (millis() - tiempoEstado >= TIEMPO_VERDE) {
                estadoActual = AMARILLO;
                tiempoEstado = millis();
            }
            break;

        case AMARILLO:
            // ... similar
            break;

        case ROJO:
            // ... similar
            break;

        case PEATON:
            // Activado por botón
            break;
    }
}
```

---

## 2. Programación ESP32/ESP8266 Asistida

### 2.1 ESP32: Capacidades Únicas

```cpp
// Prompt para ESP32:
// "ESP32, usar ambos cores, WiFi, Bluetooth BLE,
//  deep sleep, sensor Hall integrado"

// El ESP32 tiene características que Copilot conoce bien:

// Core 0: WiFi y comunicaciones
// Core 1: Aplicación principal (por defecto)

// Crear tarea en Core 0
TaskHandle_t Task1;

void setup() {
    xTaskCreatePinnedToCore(
        tareaWiFi,    // Función
        "WiFiTask",   // Nombre
        10000,        // Stack size
        NULL,         // Parámetros
        1,            // Prioridad
        &Task1,       // Handle
        0             // Core 0
    );
}

void tareaWiFi(void * parameter) {
    for(;;) {
        // Código que corre en Core 0
        enviarDatosWiFi();
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}
```

### 2.2 Sistema IoT Completo con ESP32

**Prompt:**
```
ESP32-WROOM, crear sistema IoT que:
- Conecte a WiFi con reconexión automática
- Publique datos a MQTT broker
- Lea temperatura de DS18B20
- Entre en deep sleep 5 minutos entre lecturas
- Wake up también por botón GPIO0

Incluir manejo de errores robusto.
```

**Código generado:**
```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Configuración WiFi
const char* ssid = "TU_SSID";
const char* password = "TU_PASSWORD";

// Configuración MQTT
const char* mqtt_server = "192.168.1.100";
const int mqtt_port = 1883;
const char* mqtt_topic = "sensores/temperatura";

// Pines
#define ONE_WIRE_BUS 4
#define BUTTON_PIN GPIO_NUM_0

// Deep sleep
#define uS_TO_S_FACTOR 1000000ULL
#define TIME_TO_SLEEP 300  // 5 minutos

// Objetos
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
WiFiClient espClient;
PubSubClient client(espClient);

// Variables en RTC memory (sobreviven deep sleep)
RTC_DATA_ATTR int bootCount = 0;

void setup() {
    Serial.begin(115200);
    delay(1000);

    ++bootCount;
    Serial.println("Boot #" + String(bootCount));

    // Determinar razón del wake up
    print_wakeup_reason();

    // Configurar wake up por timer y botón
    esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
    esp_sleep_enable_ext0_wakeup(BUTTON_PIN, 0);

    // Inicializar sensores
    sensors.begin();

    // Conectar WiFi
    if (!conectarWiFi()) {
        Serial.println("Error WiFi, entrando en deep sleep");
        esp_deep_sleep_start();
    }

    // Conectar MQTT
    client.setServer(mqtt_server, mqtt_port);
    if (!conectarMQTT()) {
        Serial.println("Error MQTT, entrando en deep sleep");
        esp_deep_sleep_start();
    }

    // Leer y publicar temperatura
    float temperatura = leerTemperatura();
    if (!isnan(temperatura)) {
        publicarTemperatura(temperatura);
    }

    // Desconectar ordenadamente
    client.disconnect();
    WiFi.disconnect(true);

    Serial.println("Entrando en deep sleep...");
    esp_deep_sleep_start();
}

void loop() {
    // No se usa con deep sleep
}

bool conectarWiFi() {
    Serial.print("Conectando a WiFi");
    WiFi.begin(ssid, password);

    int intentos = 0;
    while (WiFi.status() != WL_CONNECTED && intentos < 20) {
        delay(500);
        Serial.print(".");
        intentos++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println(" Conectado!");
        Serial.println("IP: " + WiFi.localIP().toString());
        return true;
    }
    return false;
}

bool conectarMQTT() {
    Serial.print("Conectando a MQTT...");

    for (int i = 0; i < 3; i++) {
        if (client.connect("ESP32Client")) {
            Serial.println(" Conectado!");
            return true;
        }
        delay(1000);
    }
    return false;
}

float leerTemperatura() {
    sensors.requestTemperatures();
    float temp = sensors.getTempCByIndex(0);

    if (temp == DEVICE_DISCONNECTED_C) {
        Serial.println("Error: Sensor desconectado");
        return NAN;
    }

    Serial.println("Temperatura: " + String(temp) + "°C");
    return temp;
}

void publicarTemperatura(float temp) {
    String payload = "{\"temperatura\":" + String(temp, 2) +
                     ",\"boot\":" + String(bootCount) + "}";

    if (client.publish(mqtt_topic, payload.c_str(), true)) {
        Serial.println("Publicado: " + payload);
    } else {
        Serial.println("Error publicando");
    }
}

void print_wakeup_reason() {
    esp_sleep_wakeup_cause_t wakeup_reason;
    wakeup_reason = esp_sleep_get_wakeup_cause();

    switch (wakeup_reason) {
        case ESP_SLEEP_WAKEUP_EXT0:
            Serial.println("Wakeup por botón");
            break;
        case ESP_SLEEP_WAKEUP_TIMER:
            Serial.println("Wakeup por timer");
            break;
        default:
            Serial.println("Wakeup no fue por deep sleep");
            break;
    }
}
```

---

## 3. Drivers para Sensores y Actuadores

### 3.1 Prompt para Generar Driver

```
Genera driver Arduino para sensor [MODELO]:
- Protocolo: [I2C/SPI/OneWire/Analog]
- Dirección/Pin: [especificar]
- Funciones requeridas:
  * init() - inicializar
  * read() - leer valor
  * calibrate() - si aplica
- Incluir manejo de errores
- Documentar con Doxygen
```

### 3.2 Ejemplo: Driver para Sensor de Distancia HC-SR04

```cpp
/**
 * @file HC_SR04.h
 * @brief Driver para sensor ultrasónico HC-SR04
 * @author Generado con IA
 */

#ifndef HC_SR04_H
#define HC_SR04_H

#include <Arduino.h>

class HC_SR04 {
public:
    /**
     * @brief Constructor
     * @param trigPin Pin de trigger
     * @param echoPin Pin de echo
     */
    HC_SR04(uint8_t trigPin, uint8_t echoPin);

    /**
     * @brief Inicializa el sensor
     */
    void begin();

    /**
     * @brief Lee la distancia
     * @return Distancia en centímetros, -1 si error
     */
    float readDistance();

    /**
     * @brief Lee la distancia promediando n mediciones
     * @param samples Número de muestras
     * @return Distancia promedio en cm
     */
    float readDistanceAvg(uint8_t samples = 5);

    /**
     * @brief Verifica si hay obstáculo dentro del rango
     * @param maxDistance Distancia máxima en cm
     * @return true si hay obstáculo
     */
    bool hasObstacle(float maxDistance);

private:
    uint8_t _trigPin;
    uint8_t _echoPin;

    static const unsigned long TIMEOUT_US = 30000;  // 30ms timeout
    static constexpr float SOUND_SPEED = 0.0343;    // cm/us
};

#endif
```

```cpp
/**
 * @file HC_SR04.cpp
 */

#include "HC_SR04.h"

HC_SR04::HC_SR04(uint8_t trigPin, uint8_t echoPin)
    : _trigPin(trigPin), _echoPin(echoPin) {}

void HC_SR04::begin() {
    pinMode(_trigPin, OUTPUT);
    pinMode(_echoPin, INPUT);
    digitalWrite(_trigPin, LOW);
}

float HC_SR04::readDistance() {
    // Pulso de trigger
    digitalWrite(_trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(_trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(_trigPin, LOW);

    // Medir tiempo de echo
    unsigned long duration = pulseIn(_echoPin, HIGH, TIMEOUT_US);

    if (duration == 0) {
        return -1.0;  // Timeout - sin eco
    }

    // Calcular distancia
    // Distancia = (tiempo * velocidad) / 2 (ida y vuelta)
    float distance = (duration * SOUND_SPEED) / 2.0;

    // Rango válido: 2cm - 400cm
    if (distance < 2.0 || distance > 400.0) {
        return -1.0;
    }

    return distance;
}

float HC_SR04::readDistanceAvg(uint8_t samples) {
    float sum = 0;
    uint8_t validSamples = 0;

    for (uint8_t i = 0; i < samples; i++) {
        float d = readDistance();
        if (d > 0) {
            sum += d;
            validSamples++;
        }
        delay(50);  // Esperar entre mediciones
    }

    if (validSamples == 0) return -1.0;
    return sum / validSamples;
}

bool HC_SR04::hasObstacle(float maxDistance) {
    float d = readDistance();
    return (d > 0 && d <= maxDistance);
}
```

---

## 4. Optimización de Código Embebido

### 4.1 Prompt para Optimización

```
Optimiza este código Arduino para:
- Reducir uso de RAM
- Mejorar velocidad de ejecución
- Reducir consumo de energía

Código actual:
[pegar código]

Restricciones:
- Arduino Uno (2KB RAM, 32KB Flash)
- Mantener funcionalidad exacta
```

### 4.2 Técnicas de Optimización

```cpp
// ANTES: Desperdicio de RAM
String mensaje = "Temperatura: " + String(temp) + "°C";
Serial.println(mensaje);

// DESPUÉS: Uso eficiente
Serial.print(F("Temperatura: "));  // F() guarda en Flash
Serial.print(temp);
Serial.println(F("°C"));

// ANTES: Variables globales innecesarias
int sensorValue;
float voltage;
float temperature;

// DESPUÉS: Variables locales
void loop() {
    int sensorValue = analogRead(A0);
    float voltage = sensorValue * (5.0 / 1023.0);
    float temperature = (voltage - 0.5) * 100;
}

// ANTES: Delay bloqueante
delay(1000);

// DESPUÉS: Non-blocking
static unsigned long lastTime = 0;
if (millis() - lastTime >= 1000) {
    lastTime = millis();
    // Ejecutar cada segundo
}

// ANTES: División (lento)
int result = value / 4;

// DESPUÉS: Shift (rápido)
int result = value >> 2;
```

---

## 5. Debugging con Asistencia de IA

### 5.1 Template de Debug para Electrónica

```
## Bug Report para IA

### Hardware
- MCU: [modelo]
- Alimentación: [voltaje, fuente]
- Conexiones: [diagrama o lista]

### Código
```cpp
[código relevante]
```

### Comportamiento Esperado
[qué debería hacer]

### Comportamiento Actual
[qué hace realmente]

### Mediciones
- Voltajes en pines: [valores]
- Señales en osciloscopio: [descripción]
- Mensajes Serial: [output]

### Ya Intenté
[lista de soluciones probadas]
```

### 5.2 Ejemplo de Debugging

```
Bug: Motor DC no responde, código compila correctamente

Hardware:
- Arduino Uno
- Motor DC 6V con driver L298N
- IN1: pin 8, IN2: pin 9, ENA: pin 10

Código:
```cpp
void setup() {
    pinMode(8, OUTPUT);
    pinMode(9, OUTPUT);
    pinMode(10, OUTPUT);
}

void loop() {
    // Adelante
    digitalWrite(8, HIGH);
    digitalWrite(9, LOW);
    analogWrite(10, 200);
    delay(2000);
}
```

Comportamiento esperado: Motor gira 2 segundos
Comportamiento actual: Motor no se mueve

Mediciones:
- Pin 8: 5V ✓
- Pin 9: 0V ✓
- Pin 10: PWM visible en osciloscopio ✓
- Salidas L298N: 0V ❌

Ya intenté:
- Cambiar motor (funciona con fuente directa)
- Verificar conexiones
```

**Respuesta de IA:**
```
El problema probablemente es la alimentación del L298N:

1. Verificar que el jumper 12V está conectado si Vm < 12V
2. Verificar que hay 5V en el pin VCC del L298N
3. El ENA debe estar habilitado (jumper o señal)
4. Verificar GND común entre Arduino y L298N

Código de diagnóstico:
```cpp
void setup() {
    Serial.begin(9600);
    pinMode(8, OUTPUT);
    pinMode(9, OUTPUT);
    pinMode(10, OUTPUT);

    Serial.println("Test L298N");
}

void loop() {
    Serial.println("Activando motor...");
    digitalWrite(8, HIGH);
    digitalWrite(9, LOW);

    for (int pwm = 0; pwm <= 255; pwm += 50) {
        Serial.print("PWM: ");
        Serial.println(pwm);
        analogWrite(10, pwm);
        delay(1000);
    }

    Serial.println("Deteniendo...");
    analogWrite(10, 0);
    delay(2000);
}
```

---

## Resumen

- Usar **prompts estructurados** para Arduino/ESP32
- **Patrones comunes**: máquina de estados, non-blocking
- **ESP32**: aprovechar dual core, deep sleep, WiFi
- **Drivers**: documentar con Doxygen, manejar errores
- **Optimizar**: RAM (F()), velocidad (shift), energía (sleep)
- **Debug**: template completo con mediciones

---

## Recursos

- [Arduino Language Reference](https://www.arduino.cc/reference/)
- [ESP32 API Reference](https://docs.espressif.com/projects/esp-idf/)
- [PlatformIO Documentation](https://docs.platformio.org/)

---

*Siguiente: Módulo 03 - IA para Procesamiento de Señales*
