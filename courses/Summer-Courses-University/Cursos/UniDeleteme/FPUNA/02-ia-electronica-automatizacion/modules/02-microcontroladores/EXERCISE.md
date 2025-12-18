# Ejercicio Práctico - Módulo 02
## Sistema de Monitoreo IoT con ESP32

---

## Objetivo

Desarrollar un sistema completo de monitoreo IoT utilizando ESP32, sensores y comunicación WiFi/MQTT, con asistencia de IA en cada etapa del desarrollo.

**Duración:** 20 minutos
**Tipo:** Práctico guiado
**Hardware requerido:** ESP32 DevKit, DHT22, LED, resistencias

---

## Descripción del Proyecto

Crear un sistema que:
1. Lea temperatura y humedad cada 30 segundos
2. Muestre valores por Serial Monitor
3. Active LED de alarma si temperatura > 30°C
4. Publique datos a broker MQTT
5. Entre en deep sleep entre lecturas (opcional)

---

## Parte 1: Generación de Código Base (7 minutos)

### Paso 1.1: Crear Proyecto en PlatformIO

1. Abre PlatformIO → New Project
2. Configura:
   - **Name:** `sistema-monitoreo-iot`
   - **Board:** `Espressif ESP32 Dev Module`
   - **Framework:** `Arduino`

### Paso 1.2: Configurar platformio.ini

Abre `platformio.ini` y usa Copilot para completar:

```ini
; Escribe este comentario y deja que Copilot complete:
; ESP32 project with DHT22 sensor and MQTT publishing
; Libraries: DHT, PubSubClient, WiFi

[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
; Copilot debería sugerir lib_deps aquí
```

**Resultado esperado:**
```ini
lib_deps =
    adafruit/DHT sensor library@^1.4.4
    knolleary/PubSubClient@^2.8
```

### Paso 1.3: Generar Código Principal con IA

En `src/main.cpp`, escribe este prompt como comentario:

```cpp
/*
 * Sistema de Monitoreo IoT con ESP32
 *
 * Hardware:
 * - ESP32 DevKit v1
 * - DHT22 en GPIO 4
 * - LED rojo en GPIO 2 (alarma)
 *
 * Funcionalidad:
 * - Conectar a WiFi (SSID: "MiRed", Password: "12345678")
 * - Leer DHT22 cada 30 segundos
 * - Publicar a MQTT broker 192.168.1.100:1883
 *   - Topic: sensors/esp32/temperature
 *   - Topic: sensors/esp32/humidity
 * - LED encendido si temperatura > 30°C
 * - Mostrar valores en Serial (115200 baud)
 *
 * Incluir:
 * - Manejo de errores de conexión
 * - Reconexión automática WiFi y MQTT
 * - Retención de mensajes MQTT
 */
```

Espera a que Copilot sugiera el código y analiza la sugerencia.

---

## Parte 2: Análisis y Mejora del Código (7 minutos)

### Paso 2.1: Evaluar Código Generado

Completa esta tabla de evaluación:

| Aspecto | ¿Presente? | Calidad (1-5) | Observaciones |
|---------|------------|---------------|---------------|
| Includes necesarios | | | |
| Definición de pines correctos | | | |
| Variables para WiFi | | | |
| Configuración MQTT | | | |
| Función setup() completa | | | |
| Lectura de sensor | | | |
| Publicación MQTT | | | |
| Control de LED | | | |
| Manejo de errores | | | |
| Reconexión automática | | | |

### Paso 2.2: Solicitar Mejoras

Abre Copilot Chat y solicita mejoras específicas:

**Prompt 1 - Modularización:**
```
Refactoriza este código para separar en funciones:
1. connectWiFi() - conexión con reintentos
2. connectMQTT() - conexión al broker
3. readSensor() - lectura y validación DHT22
4. publishData() - publicación MQTT con JSON
5. checkAlarm() - control del LED de alarma
```

**Prompt 2 - Configuración:**
```
Mueve las credenciales y configuración a un archivo
config.h separado con #defines para:
- WIFI_SSID, WIFI_PASSWORD
- MQTT_SERVER, MQTT_PORT
- SENSOR_PIN, LED_PIN
- TEMP_THRESHOLD, READ_INTERVAL
```

### Paso 2.3: Implementar JSON para MQTT

Solicita a la IA:

```
Modifica publishData() para enviar datos en formato JSON:
{
  "device": "esp32-01",
  "temperature": 25.5,
  "humidity": 60.2,
  "alarm": false,
  "timestamp": 1234567890
}

Usar ArduinoJson biblioteca.
```

---

## Parte 3: Testing y Documentación (6 minutos)

### Paso 3.1: Generar Código de Prueba

Usa IA para crear funciones de auto-diagnóstico:

```
Genera una función selfTest() que verifique:
1. Conexión WiFi (ping al gateway)
2. Respuesta del sensor DHT22
3. Conexión MQTT (publicar mensaje de test)
4. Funcionamiento del LED

Debe retornar true si todo OK, false si hay error.
Imprimir resultados detallados por Serial.
```

### Paso 3.2: Documentación Automática

Solicita a la IA que genere documentación:

```
Genera documentación del código incluyendo:
1. Header con descripción del proyecto
2. Comentarios Doxygen para cada función
3. Diagrama de conexiones en ASCII
4. Lista de componentes necesarios
```

### Paso 3.3: Verificación Final

Antes de compilar, verifica con IA:

```
Revisa este código de ESP32 e identifica:
1. Posibles memory leaks
2. Problemas de timing
3. Errores de manejo de strings
4. Mejoras de eficiencia energética
5. Vulnerabilidades de seguridad
```

---

## Código de Referencia

### config.h

```cpp
#ifndef CONFIG_H
#define CONFIG_H

// WiFi Configuration
#define WIFI_SSID     "MiRed"
#define WIFI_PASSWORD "12345678"

// MQTT Configuration
#define MQTT_SERVER   "192.168.1.100"
#define MQTT_PORT     1883
#define MQTT_CLIENT   "esp32-monitor-01"

// Hardware Pins
#define DHT_PIN       4
#define DHT_TYPE      DHT22
#define LED_ALARM_PIN 2

// Thresholds
#define TEMP_THRESHOLD    30.0
#define READ_INTERVAL_MS  30000

// MQTT Topics
#define TOPIC_TEMPERATURE "sensors/esp32/temperature"
#define TOPIC_HUMIDITY    "sensors/esp32/humidity"
#define TOPIC_STATUS      "sensors/esp32/status"

#endif
```

### Estructura main.cpp esperada

```cpp
#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include "config.h"

// Objetos globales
WiFiClient espClient;
PubSubClient mqtt(espClient);
DHT dht(DHT_PIN, DHT_TYPE);

// Prototipos
bool connectWiFi();
bool connectMQTT();
bool readSensor(float &temp, float &hum);
void publishData(float temp, float hum);
void checkAlarm(float temp);
bool selfTest();

void setup() {
    Serial.begin(115200);
    pinMode(LED_ALARM_PIN, OUTPUT);

    dht.begin();

    if (selfTest()) {
        Serial.println("✓ Auto-diagnóstico: OK");
    } else {
        Serial.println("✗ Auto-diagnóstico: FALLO");
    }
}

void loop() {
    // Asegurar conexiones
    if (!WiFi.isConnected()) connectWiFi();
    if (!mqtt.connected()) connectMQTT();

    mqtt.loop();

    // Leer y publicar
    float temperature, humidity;
    if (readSensor(temperature, humidity)) {
        publishData(temperature, humidity);
        checkAlarm(temperature);
    }

    delay(READ_INTERVAL_MS);
}

// Implementar funciones según código generado por IA
```

---

## Entregables

### Archivos a Entregar

1. **Proyecto PlatformIO completo** (carpeta comprimida)
2. **Tabla de evaluación** del código generado (Paso 2.1)
3. **Capturas de pantalla** del Serial Monitor funcionando
4. **Documentación generada** por IA

### Estructura de Entrega

```
M02_Ejercicio_[TuApellido]/
├── sistema-monitoreo-iot/
│   ├── src/
│   │   └── main.cpp
│   ├── include/
│   │   └── config.h
│   └── platformio.ini
├── evaluacion.md
├── capturas/
│   ├── serial_output.png
│   └── mqtt_messages.png
└── documentacion.md
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Código compila sin errores | 20 | Build exitoso en PlatformIO |
| Lectura de sensor funcional | 20 | Valores correctos de DHT22 |
| Conexión WiFi/MQTT | 20 | Conecta y publica mensajes |
| Modularización del código | 15 | Funciones separadas y claras |
| Documentación generada | 15 | Comentarios y README |
| Manejo de errores | 10 | Reconexión y validación |
| **Total** | **100** | |

---

## Extensión Opcional

### Agregar Deep Sleep

Solicita a la IA:

```
Modifica el código para usar deep sleep del ESP32:
1. Despertar cada 30 segundos con timer
2. Leer sensor y publicar datos
3. Volver a dormir inmediatamente
4. Mantener contador de lecturas en RTC memory
5. Calcular consumo promedio de energía
```

### Dashboard Web

```
Agrega un pequeño servidor web en el ESP32 que muestre:
1. Últimos valores de temperatura/humedad
2. Estado de conexión WiFi/MQTT
3. Uptime del dispositivo
4. Botón para forzar lectura
```

---

*Módulo 02 - IA para Microcontroladores*
*Tiempo estimado: 20 minutos*
