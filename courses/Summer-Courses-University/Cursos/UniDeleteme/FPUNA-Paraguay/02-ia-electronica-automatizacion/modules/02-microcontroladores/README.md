# Módulo 02: Microcontroladores con IA
## Programación de ESP32 y Arduino con Asistencia de IA

---

## Objetivos del Módulo

Al finalizar este módulo, serás capaz de:
- Generar código funcional para ESP32/Arduino usando prompts efectivos
- Implementar lectura de sensores y control de actuadores
- Configurar comunicación WiFi y protocolo MQTT
- Aplicar técnicas de optimización energética

---

## 1. Generación de Código para ESP32

### 1.1 Prompt Base para Firmware

```
Genera código para ESP32 con las siguientes especificaciones:

FUNCIONALIDAD: [Describir comportamiento]

HARDWARE:
- Microcontrolador: ESP32 DevKit v1
- Sensores: [Lista con pines]
- Actuadores: [Lista con pines]
- Comunicación: [WiFi/BLE/etc]

REQUISITOS:
- Inicialización robusta con verificación
- Manejo de errores
- Comentarios en español
- Código modular (funciones separadas)

PLATAFORMA: PlatformIO con framework Arduino

GENERAR: Código completo y compilable
```

### 1.2 Estructura de Proyecto Profesional

```
proyecto_iot/
├── src/
│   └── main.cpp              # Loop principal
├── include/
│   ├── config.h              # Configuración y credenciales
│   ├── sensors.h             # Clases de sensores
│   └── communication.h       # WiFi/MQTT handlers
├── lib/
│   └── README                # Librerías privadas
├── test/
│   └── test_sensors.cpp      # Unit tests
└── platformio.ini            # Configuración PlatformIO
```

### 1.3 Archivo de Configuración Típico

```cpp
// config.h - Configuración centralizada

#ifndef CONFIG_H
#define CONFIG_H

// ===== CREDENCIALES WIFI =====
const char* WIFI_SSID = "MiRed";
const char* WIFI_PASS = "MiPassword";

// ===== CONFIGURACIÓN MQTT =====
const char* MQTT_SERVER = "192.168.1.100";
const int MQTT_PORT = 1883;
const char* MQTT_USER = "";
const char* MQTT_PASS = "";
const char* DEVICE_ID = "ESP32_001";

// ===== PINES DE HARDWARE =====
const int PIN_LED = 2;
const int PIN_SENSOR_TEMP = 4;
const int PIN_SENSOR_CURRENT = 34;

// ===== INTERVALOS (ms) =====
const unsigned long SENSOR_READ_INTERVAL = 1000;
const unsigned long MQTT_PUBLISH_INTERVAL = 5000;
const unsigned long WIFI_RECONNECT_INTERVAL = 5000;

// ===== CALIBRACIÓN =====
const float CURRENT_SENSITIVITY = 0.066; // ACS712 30A
const float CURRENT_OFFSET = 2.5;

#endif
```

---

## 2. Integración de Sensores

### 2.1 Sensor de Temperatura DS18B20

**Prompt para generar driver:**

```
Genera código para leer sensor DS18B20 en ESP32:

CONEXIÓN:
- Pin de datos: GPIO4
- Resistor pull-up: 4.7kΩ externo

FUNCIONALIDADES:
- Clase TemperatureSensor
- Inicialización con verificación de sensor
- Lectura en grados Celsius
- Manejo de errores (sensor desconectado)
- Múltiples sensores en el mismo bus

BIBLIOTECAS: OneWire, DallasTemperature

GENERAR: Archivo sensors.h con clase completa
```

**Código resultante típico:**

```cpp
// sensors.h - Sensor de temperatura

#ifndef SENSORS_H
#define SENSORS_H

#include <OneWire.h>
#include <DallasTemperature.h>

class TemperatureSensor {
private:
    OneWire* oneWire;
    DallasTemperature* sensors;
    int pin;
    bool initialized;
    float lastReading;

public:
    TemperatureSensor(int dataPin) : pin(dataPin), initialized(false) {
        oneWire = new OneWire(pin);
        sensors = new DallasTemperature(oneWire);
    }

    bool begin() {
        sensors->begin();
        int deviceCount = sensors->getDeviceCount();
        initialized = (deviceCount > 0);

        if (initialized) {
            Serial.printf("DS18B20: %d sensor(es) encontrado(s)\n", deviceCount);
        } else {
            Serial.println("ERROR: No se encontró sensor DS18B20");
        }
        return initialized;
    }

    float read() {
        if (!initialized) return -999.0;

        sensors->requestTemperatures();
        float temp = sensors->getTempCByIndex(0);

        // Verificar lectura válida
        if (temp == DEVICE_DISCONNECTED_C) {
            Serial.println("ERROR: Sensor desconectado");
            return lastReading; // Retornar última lectura válida
        }

        lastReading = temp;
        return temp;
    }

    bool isValid() {
        return initialized;
    }
};

#endif
```

### 2.2 Sensor de Corriente ACS712

```cpp
class CurrentSensor {
private:
    int pin;
    float sensitivity;  // mV/A
    float offset;       // Voltaje a 0A
    int samples;

public:
    CurrentSensor(int adcPin, float sens = 0.066, float off = 1.65)
        : pin(adcPin), sensitivity(sens), offset(off), samples(100) {}

    float read() {
        long sum = 0;

        // Promedio de múltiples lecturas para reducir ruido
        for (int i = 0; i < samples; i++) {
            sum += analogRead(pin);
            delayMicroseconds(100);
        }

        float voltage = (sum / samples) * 3.3 / 4095.0;
        float current = (voltage - offset) / sensitivity;

        return current;
    }

    // Calibrar offset con corriente cero
    void calibrate() {
        Serial.println("Calibrando... asegurar corriente = 0");
        delay(2000);

        long sum = 0;
        for (int i = 0; i < 1000; i++) {
            sum += analogRead(pin);
            delay(1);
        }

        offset = (sum / 1000.0) * 3.3 / 4095.0;
        Serial.printf("Nuevo offset: %.3f V\n", offset);
    }
};
```

### 2.3 Acelerómetro MPU6050 (Vibración)

```cpp
#include <Wire.h>
#include <MPU6050.h>

class VibrationSensor {
private:
    MPU6050 mpu;
    bool initialized;

public:
    bool begin() {
        Wire.begin();
        mpu.initialize();
        initialized = mpu.testConnection();

        if (initialized) {
            mpu.setFullScaleAccelRange(MPU6050_ACCEL_FS_2); // ±2g
            Serial.println("MPU6050 inicializado");
        } else {
            Serial.println("ERROR: MPU6050 no responde");
        }
        return initialized;
    }

    float readRMS() {
        if (!initialized) return -1.0;

        const int samples = 100;
        float sumSquares = 0;

        for (int i = 0; i < samples; i++) {
            int16_t ax, ay, az;
            mpu.getAcceleration(&ax, &ay, &az);

            // Convertir a g (±2g range, 16-bit)
            float gx = ax / 16384.0;
            float gy = ay / 16384.0;
            float gz = az / 16384.0;

            // Magnitud menos gravedad
            float mag = sqrt(gx*gx + gy*gy + gz*gz) - 1.0;
            sumSquares += mag * mag;

            delayMicroseconds(500);
        }

        // RMS en g, convertir a mm/s² si se desea
        return sqrt(sumSquares / samples) * 9.81 * 1000;
    }
};
```

---

## 3. Comunicación WiFi y MQTT

### 3.1 Conexión WiFi Robusta

```cpp
#include <WiFi.h>

class WiFiManager {
private:
    const char* ssid;
    const char* password;
    unsigned long lastAttempt;
    const unsigned long retryInterval = 5000;

public:
    WiFiManager(const char* s, const char* p) : ssid(s), password(p) {}

    void begin() {
        WiFi.mode(WIFI_STA);
        WiFi.begin(ssid, password);

        Serial.print("Conectando a WiFi");
        int attempts = 0;
        while (WiFi.status() != WL_CONNECTED && attempts < 20) {
            delay(500);
            Serial.print(".");
            attempts++;
        }

        if (WiFi.status() == WL_CONNECTED) {
            Serial.println("\nWiFi conectado");
            Serial.print("IP: ");
            Serial.println(WiFi.localIP());
        } else {
            Serial.println("\nERROR: No se pudo conectar a WiFi");
        }
    }

    void checkConnection() {
        if (WiFi.status() != WL_CONNECTED) {
            unsigned long now = millis();
            if (now - lastAttempt > retryInterval) {
                Serial.println("Reconectando WiFi...");
                WiFi.disconnect();
                WiFi.begin(ssid, password);
                lastAttempt = now;
            }
        }
    }

    bool isConnected() {
        return WiFi.status() == WL_CONNECTED;
    }
};
```

### 3.2 Cliente MQTT con Reconexión

```cpp
#include <PubSubClient.h>
#include <ArduinoJson.h>

WiFiClient espClient;
PubSubClient mqtt(espClient);

class MQTTClient {
private:
    const char* server;
    int port;
    const char* clientId;
    unsigned long lastAttempt;

    static void callback(char* topic, byte* payload, unsigned int length) {
        Serial.printf("Mensaje recibido [%s]: ", topic);
        for (int i = 0; i < length; i++) {
            Serial.print((char)payload[i]);
        }
        Serial.println();

        // Procesar comandos
        StaticJsonDocument<200> doc;
        deserializeJson(doc, payload, length);

        if (doc.containsKey("command")) {
            String cmd = doc["command"].as<String>();
            // Manejar comando...
        }
    }

public:
    MQTTClient(const char* srv, int p, const char* id)
        : server(srv), port(p), clientId(id) {}

    void begin() {
        mqtt.setServer(server, port);
        mqtt.setCallback(callback);
        connect();
    }

    void connect() {
        while (!mqtt.connected()) {
            Serial.print("Conectando a MQTT...");

            if (mqtt.connect(clientId)) {
                Serial.println("conectado");
                mqtt.subscribe("commands/#");
            } else {
                Serial.printf("falló, rc=%d\n", mqtt.state());
                delay(5000);
            }
        }
    }

    void loop() {
        if (!mqtt.connected()) {
            connect();
        }
        mqtt.loop();
    }

    void publishSensorData(float temp, float current, float vibration) {
        StaticJsonDocument<256> doc;
        doc["device_id"] = clientId;
        doc["timestamp"] = millis();
        doc["temperature"] = temp;
        doc["current"] = current;
        doc["vibration"] = vibration;

        char buffer[256];
        serializeJson(doc, buffer);

        mqtt.publish("sensors/data", buffer);
    }
};
```

### 3.3 Ejemplo de main.cpp Completo

```cpp
#include <Arduino.h>
#include "config.h"
#include "sensors.h"
#include "communication.h"

// Instanciar objetos
WiFiManager wifi(WIFI_SSID, WIFI_PASS);
MQTTClient mqttClient(MQTT_SERVER, MQTT_PORT, DEVICE_ID);
TemperatureSensor tempSensor(PIN_SENSOR_TEMP);
CurrentSensor currentSensor(PIN_SENSOR_CURRENT);

// Control de tiempo
unsigned long lastSensorRead = 0;
unsigned long lastMqttPublish = 0;

// Datos de sensores
float temperature = 0;
float current = 0;

void setup() {
    Serial.begin(115200);
    Serial.println("\n=== Iniciando Sistema IoT ===");

    // Inicializar sensores
    tempSensor.begin();

    // Conectar WiFi
    wifi.begin();

    // Conectar MQTT
    if (wifi.isConnected()) {
        mqttClient.begin();
    }

    Serial.println("=== Sistema Listo ===\n");
}

void loop() {
    // Mantener conexiones
    wifi.checkConnection();
    mqttClient.loop();

    unsigned long now = millis();

    // Leer sensores periódicamente
    if (now - lastSensorRead >= SENSOR_READ_INTERVAL) {
        temperature = tempSensor.read();
        current = currentSensor.read();

        Serial.printf("Temp: %.1f°C, Corriente: %.2fA\n",
                      temperature, current);

        lastSensorRead = now;
    }

    // Publicar a MQTT menos frecuentemente
    if (now - lastMqttPublish >= MQTT_PUBLISH_INTERVAL) {
        mqttClient.publishSensorData(temperature, current, 0);
        lastMqttPublish = now;
    }
}
```

---

## 4. Optimización Energética

### 4.1 Deep Sleep

```cpp
#define uS_TO_S 1000000  // Conversión microsegundos a segundos
#define SLEEP_TIME 300   // Dormir 5 minutos

void goToDeepSleep() {
    Serial.println("Entrando en Deep Sleep...");
    Serial.flush();

    // Configurar despertar por timer
    esp_sleep_enable_timer_wakeup(SLEEP_TIME * uS_TO_S);

    // Entrar en deep sleep
    esp_deep_sleep_start();
}

void setup() {
    // Verificar razón de despertar
    esp_sleep_wakeup_cause_t wakeup_reason = esp_sleep_get_wakeup_cause();

    switch(wakeup_reason) {
        case ESP_SLEEP_WAKEUP_TIMER:
            Serial.println("Desperté por timer");
            break;
        case ESP_SLEEP_WAKEUP_EXT0:
            Serial.println("Desperté por interrupción externa");
            break;
        default:
            Serial.println("Desperté por reset o primera ejecución");
    }

    // Leer sensores y enviar datos
    // ...

    // Volver a dormir
    goToDeepSleep();
}
```

### 4.2 Cálculo de Autonomía

```
Consumo ESP32:
- Activo con WiFi: ~150-200 mA
- Light Sleep: ~0.8 mA
- Deep Sleep: ~10 µA

Ejemplo:
- Batería: 2000 mAh
- Ciclo: 10 segundos activo, 5 minutos dormido

Consumo promedio:
= (10s × 160mA + 290s × 0.01mA) / 300s
= (1600 + 2.9) / 300
= 5.3 mA promedio

Autonomía = 2000 mAh / 5.3 mA = 377 horas ≈ 15 días
```

---

## 5. Prompts para Escenarios Comunes

### 5.1 Sistema de Monitoreo Ambiental

```
Genera sistema de monitoreo ambiental para ESP32:

SENSORES:
- DHT22 en GPIO4 (temperatura y humedad)
- BMP280 en I2C (presión atmosférica)
- Sensor de luz BH1750 en I2C

COMUNICACIÓN:
- WiFi con MQTT
- Publicar cada 30 segundos
- Formato JSON

FUNCIONALIDADES:
- Alarma si temp > 40°C (LED rojo)
- Display OLED opcional
- Deep sleep nocturno (22:00 - 06:00)

GENERAR: Proyecto completo de PlatformIO
```

### 5.2 Control de Motor con PWM

```
Genera control de motor DC con ESP32:

HARDWARE:
- Motor DC 12V con driver L298N
- EN en GPIO25 (PWM)
- IN1 en GPIO26
- IN2 en GPIO27
- Encoder en GPIO34 (pulsos)

FUNCIONALIDADES:
- Control de velocidad 0-100%
- Dirección adelante/atrás
- Lectura de RPM por encoder
- Rampa de aceleración suave
- Comando por MQTT

GENERAR: Clase MotorController completa
```

---

## Resumen

En este módulo aprendimos:

1. **Estructura de proyectos** profesionales para ESP32
2. **Drivers de sensores** con manejo de errores
3. **Comunicación WiFi/MQTT** robusta con reconexión
4. **Optimización energética** con deep sleep

### Próximo Módulo

En el Módulo 03 aplicaremos Python para procesamiento de señales y detección de anomalías.

---

*Módulo 02 - Microcontroladores con IA*
*Duración: 2 horas*
