# Ejercicio Práctico - Módulo 02
## Sistema de Monitoreo IoT con ESP32

---

## Objetivo

Desarrollar un sistema completo de monitoreo IoT que lea sensores, transmita datos por MQTT, y muestre información por Serial Monitor.

**Duración:** 30 minutos
**Tipo:** Práctico guiado
**Herramientas:** VS Code, PlatformIO, Claude/ChatGPT, MQTT broker

---

## Descripción del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    SISTEMA IoT                          │
│                                                          │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│   │  DHT22   │     │   LED    │     │  MQTT    │       │
│   │ Temp+Hum │     │ Alarma   │     │ Broker   │       │
│   └────┬─────┘     └────┬─────┘     └────┬─────┘       │
│        │                │                │              │
│        ▼                ▼                ▼              │
│   ┌────────────────────────────────────────────┐       │
│   │               ESP32 DevKit                  │       │
│   │                                             │       │
│   │  GPIO4 ←── DHT22 (datos)                   │       │
│   │  GPIO2 ──► LED (alarma)                    │       │
│   │  WiFi  ◄──► MQTT Server                    │       │
│   └────────────────────────────────────────────┘       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Parte 1: Estructura del Proyecto (5 minutos)

### Paso 1.1: Crear Proyecto

1. Abrir PlatformIO
2. New Project:
   - Name: `iot_monitor`
   - Board: `Espressif ESP32 Dev Module`
   - Framework: `Arduino`

### Paso 1.2: Configurar platformio.ini

Solicita a la IA:

```
Genera platformio.ini para ESP32 con:
- Board: esp32dev
- Framework: Arduino
- Monitor speed: 115200
- Librerías:
  * PubSubClient (MQTT)
  * ArduinoJson
  * DHT sensor library de Adafruit

Incluir comentarios explicando cada sección.
```

Debería generar algo como:

```ini
; platformio.ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino

; Configuración del monitor serial
monitor_speed = 115200
monitor_filters = esp32_exception_decoder

; Dependencias de librerías
lib_deps =
    knolleary/PubSubClient@^2.8
    bblanchon/ArduinoJson@^6.21.3
    adafruit/DHT sensor library@^1.4.4
    adafruit/Adafruit Unified Sensor@^1.1.9

; Opciones de compilación
build_flags =
    -D DEBUG=1
```

### Paso 1.3: Crear config.h

Crea `include/config.h`:

```cpp
// config.h - Configuración del sistema

#ifndef CONFIG_H
#define CONFIG_H

// ===== CREDENCIALES WIFI =====
// IMPORTANTE: Cambiar por tus valores
const char* WIFI_SSID = "TU_RED_WIFI";
const char* WIFI_PASS = "TU_PASSWORD";

// ===== MQTT =====
const char* MQTT_SERVER = "test.mosquitto.org"; // Broker público para pruebas
const int MQTT_PORT = 1883;
const char* MQTT_CLIENT_ID = "ESP32_FPUNA_001";

// ===== TÓPICOS MQTT =====
const char* TOPIC_SENSORS = "fpuna/iot/sensors";
const char* TOPIC_ALERTS = "fpuna/iot/alerts";
const char* TOPIC_COMMANDS = "fpuna/iot/commands";

// ===== PINES =====
const int PIN_DHT = 4;
const int PIN_LED_ALARM = 2;

// ===== UMBRALES =====
const float TEMP_ALARM_HIGH = 35.0;  // °C
const float TEMP_ALARM_LOW = 10.0;   // °C
const float HUM_ALARM_LOW = 30.0;    // %

// ===== INTERVALOS (ms) =====
const unsigned long READ_INTERVAL = 2000;
const unsigned long PUBLISH_INTERVAL = 5000;

#endif
```

---

## Parte 2: Código Principal (15 minutos)

### Paso 2.1: Solicitar Código Base

Envía este prompt:

```
Genera main.cpp para ESP32 sistema IoT:

INCLUIR:
- config.h con configuración
- Sensor DHT22 en GPIO4
- LED de alarma en GPIO2
- WiFi con reconexión automática
- MQTT con PubSubClient

FUNCIONALIDADES:
1. Leer temperatura y humedad cada 2 segundos
2. Publicar JSON a MQTT cada 5 segundos
3. Encender LED si temp > 35°C
4. Suscribirse a comandos

FORMATO JSON:
{
  "device": "ESP32_001",
  "timestamp": millis,
  "temperature": 25.5,
  "humidity": 60.2,
  "alarm": false
}

REQUISITOS:
- Loop no bloqueante (millis)
- Manejo de errores de sensores
- Reconexión automática WiFi/MQTT
- Comentarios en español

GENERAR: Código completo y funcional
```

### Paso 2.2: Revisar y Completar

Verifica que el código incluya:

| Componente | Verificación |
|------------|--------------|
| Includes correctos | WiFi, PubSubClient, ArduinoJson, DHT |
| Variables de tiempo | lastRead, lastPublish |
| setup() completo | Serial, WiFi, MQTT, DHT, LED |
| loop() no bloqueante | Usa millis(), no delay() |
| Reconexión WiFi | Verifica y reconecta |
| Reconexión MQTT | Verifica y reconecta |
| Lectura de sensor | Maneja NaN |
| Publicación JSON | Formato correcto |
| Alarma LED | Según umbral |

### Paso 2.3: Código de Referencia

Si la IA no genera código completo, usa esta estructura:

```cpp
#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include "config.h"

// Objetos
DHT dht(PIN_DHT, DHT22);
WiFiClient espClient;
PubSubClient mqtt(espClient);

// Variables de tiempo
unsigned long lastRead = 0;
unsigned long lastPublish = 0;

// Datos de sensores
float temperature = 0;
float humidity = 0;
bool alarmActive = false;

// ===== FUNCIONES WIFI =====
void setupWiFi() {
    // COMPLETAR: Conectar a WiFi
}

void checkWiFi() {
    // COMPLETAR: Verificar y reconectar
}

// ===== FUNCIONES MQTT =====
void mqttCallback(char* topic, byte* payload, unsigned int length) {
    // COMPLETAR: Procesar comandos
}

void setupMQTT() {
    // COMPLETAR: Configurar MQTT
}

void reconnectMQTT() {
    // COMPLETAR: Reconectar MQTT
}

void publishData() {
    // COMPLETAR: Publicar JSON
}

// ===== FUNCIONES SENSORES =====
void readSensors() {
    // COMPLETAR: Leer DHT22
}

void checkAlarms() {
    // COMPLETAR: Verificar umbrales
}

// ===== SETUP Y LOOP =====
void setup() {
    Serial.begin(115200);
    Serial.println("\n=== Sistema IoT FPUNA ===");

    pinMode(PIN_LED_ALARM, OUTPUT);
    dht.begin();

    setupWiFi();
    setupMQTT();
}

void loop() {
    checkWiFi();

    if (mqtt.connected()) {
        mqtt.loop();
    } else {
        reconnectMQTT();
    }

    unsigned long now = millis();

    if (now - lastRead >= READ_INTERVAL) {
        readSensors();
        checkAlarms();
        lastRead = now;
    }

    if (now - lastPublish >= PUBLISH_INTERVAL) {
        publishData();
        lastPublish = now;
    }
}
```

---

## Parte 3: Pruebas (10 minutos)

### Paso 3.1: Compilar

1. Click en checkmark (✓) para compilar
2. Verificar que no hay errores
3. Si hay errores, solicitar corrección a la IA

### Paso 3.2: Subir a ESP32

1. Conectar ESP32 por USB
2. Click en flecha (→) para upload
3. Esperar a que termine

### Paso 3.3: Verificar con Serial Monitor

1. Abrir Serial Monitor (icono de enchufe)
2. Verificar baud rate: 115200
3. Deberías ver:

```
=== Sistema IoT FPUNA ===
Conectando a WiFi...
WiFi conectado! IP: 192.168.1.xxx
Conectando a MQTT...
MQTT conectado!
Temp: 25.3°C, Hum: 58.2%
Publicado a MQTT
Temp: 25.4°C, Hum: 57.8%
...
```

### Paso 3.4: Verificar MQTT

Opciones para verificar MQTT:

**Opción A: MQTT Explorer (aplicación)**
- Descargar MQTT Explorer
- Conectar a `test.mosquitto.org:1883`
- Navegar a `fpuna/iot/sensors`

**Opción B: Cliente web**
- Ir a http://www.hivemq.com/demos/websocket-client/
- Conectar a `test.mosquitto.org`
- Suscribirse a `fpuna/iot/#`

**Opción C: Línea de comandos**
```bash
mosquitto_sub -h test.mosquitto.org -t "fpuna/iot/#" -v
```

### Paso 3.5: Probar Alarma

1. Calentar el sensor (acercar a fuente de calor)
2. Verificar que LED se enciende cuando temp > 35°C
3. Verificar que se publica alerta a MQTT

---

## Entregables

### Archivos a Entregar

```
M02_Ejercicio_[TuApellido]/
├── src/
│   └── main.cpp
├── include/
│   └── config.h
├── platformio.ini
├── prompts.txt
└── capturas/
    ├── serial_output.png
    └── mqtt_messages.png
```

### Contenido de prompts.txt

```
=== PROMPT 1: Configuración platformio.ini ===
[Pegar prompt usado]

=== PROMPT 2: Código main.cpp ===
[Pegar prompt usado]

=== CORRECCIONES REALIZADAS ===
[Describir qué ajustes manuales fueron necesarios]

=== RESULTADO ===
[Describir si funciona correctamente]
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Estructura proyecto | 15 | config.h, platformio.ini correctos |
| Compila sin errores | 15 | Build exitoso |
| Conexión WiFi | 15 | Conecta y reconecta |
| Conexión MQTT | 15 | Publica y suscribe |
| Lectura sensores | 15 | Datos correctos por Serial |
| Sistema de alarma | 10 | LED responde a umbral |
| Documentación | 15 | Prompts y capturas |
| **Total** | **100** | |

---

## Extensiones Opcionales

### Extensión 1: Múltiples Sensores

```
Modifica el código para agregar:
- Sensor de luz (LDR en GPIO34)
- Incluir valor en JSON publicado
```

### Extensión 2: Comandos MQTT

```
Implementa comandos recibidos por MQTT:
- "led_on": Encender LED
- "led_off": Apagar LED
- "status": Responder con estado actual
```

### Extensión 3: Display OLED

```
Agrega display OLED SSD1306:
- Mostrar temperatura y humedad
- Mostrar estado de conexión
- Mostrar si hay alarma activa
```

---

## Solución de Problemas

### WiFi no conecta

```
Verificar:
1. SSID y password correctos
2. Red 2.4 GHz (ESP32 no soporta 5 GHz)
3. Router permite nuevos dispositivos
```

### DHT22 retorna NaN

```
Verificar:
1. Conexión del sensor (VCC, GND, DATA)
2. Resistor pull-up de 10kΩ
3. Pin correcto en config.h
```

### MQTT no conecta

```
Verificar:
1. WiFi está conectado primero
2. Broker accesible (test.mosquitto.org)
3. Puerto correcto (1883)
4. Sin firewall bloqueando
```

---

*Módulo 02 - Ejercicio Práctico*
*Tiempo estimado: 30 minutos*
