# CLAUDE.md - Proyecto de Electrónica e IoT

## Copia este archivo a la raíz de tu proyecto Arduino/ESP32

---

# Proyecto: [NOMBRE DEL PROYECTO IoT]

## Descripción
[Sistema de automatización/monitoreo que hace X]

## Hardware

### Microcontrolador
- **Placa:** [Arduino UNO/Mega/ESP32/ESP8266]
- **Frecuencia:** [16MHz/240MHz]
- **Memoria:** [SRAM, Flash]

### Sensores
| Sensor | Modelo | Pines | Función |
|--------|--------|-------|---------|
| Temperatura | DHT22 | D4 | Medir temp/humedad |
| [Sensor 2] | [Modelo] | [Pines] | [Función] |

### Actuadores
| Actuador | Modelo | Pines | Función |
|----------|--------|-------|---------|
| Relay | 5V 4-Channel | D5-D8 | Control de cargas |
| [Actuador 2] | [Modelo] | [Pines] | [Función] |

### Otros Componentes
- Resistencias: [valores]
- LEDs: [colores, pines]
- Display: [tipo, interfaz]

## Diagrama de Conexiones

```
                    +---------------------+
                    |    [PLACA MCU]      |
                    |                     |
    [VCC] ─────────▶│ 3.3V/5V        GND │◀───── [GND]
                    │                     │
    [Sensor1] ─────▶│ GPIO4         GPIO5│◀───── [Actuator1]
    [Sensor2] ─────▶│ GPIO2         GPIO6│◀───── [Actuator2]
                    │                     │
                    +---------------------+
```

## Estructura del Proyecto

```
proyecto/
├── src/
│   └── main.cpp           # Código principal
├── lib/
│   └── [librerías locales]
├── include/
│   └── config.h           # Configuración (pines, constantes)
├── test/
├── data/                  # Archivos SPIFFS (si usa)
├── platformio.ini         # Configuración PlatformIO
└── README.md
```

## Configuración de Pines

```cpp
// config.h
#define PIN_DHT        4
#define PIN_RELAY_1    5
#define PIN_RELAY_2    6
#define PIN_LED_STATUS 13
#define PIN_BUTTON     2

// WiFi (si aplica)
#define WIFI_SSID     "tu_red"
#define WIFI_PASS     "tu_password"
```

## Librerías Utilizadas

| Librería | Versión | Uso |
|----------|---------|-----|
| DHT sensor library | 1.4.4 | Sensor DHT |
| Adafruit Unified Sensor | 1.1.9 | Base para sensores |
| PubSubClient | 2.8 | MQTT |
| ArduinoJson | 6.21 | JSON parsing |
| WiFi | Built-in | Conectividad |

## Reglas para la IA

### HACER:
- Usar constantes para pines (no hardcodear números)
- Agregar debounce a botones (50ms mínimo)
- Usar millis() en lugar de delay() para no bloquear
- Validar lecturas de sensores antes de usar
- Documentar rangos de valores esperados
- Usar interrupciones para eventos críticos
- Implementar watchdog en proyectos de producción

### NO HACER:
- No usar delay() en loops principales
- No asumir que los sensores siempre funcionan
- No dejar pines flotantes
- No olvidar pull-up/pull-down en inputs
- No exceder corriente máxima de pines (40mA)
- No conectar 5V a pines de ESP32 (3.3V max)

## Protocolo de Comunicación

### Serial (Debug)
```
Baudrate: 115200
Formato: [TIMESTAMP] [LEVEL] mensaje
Ejemplo: [12345] [INFO] Temperatura: 25.5°C
```

### MQTT (si aplica)
```
Broker: [dirección]
Topics:
- proyecto/sensor/temperatura
- proyecto/sensor/humedad
- proyecto/actuador/relay1
```

## Estados del Sistema

```
┌─────────────────────────────────────────┐
│              ESTADOS                     │
├─────────────────────────────────────────┤
│                                          │
│  INIT ──▶ WIFI_CONNECTING ──▶ RUNNING   │
│              │                    │      │
│              ▼                    ▼      │
│         WIFI_ERROR          SENSOR_ERROR │
│              │                    │      │
│              └──────▶ RETRY ◀────┘      │
│                                          │
└─────────────────────────────────────────┘
```

## Calibración de Sensores

| Sensor | Offset | Factor | Notas |
|--------|--------|--------|-------|
| DHT22 Temp | -0.5°C | 1.0 | Calibrado con termómetro referencia |
| [Sensor 2] | [offset] | [factor] | [notas] |

## Consumo Energético

| Estado | Consumo | Duración típica |
|--------|---------|-----------------|
| Activo | [X mA] | Continuo |
| Deep Sleep | [X µA] | [tiempo] |
| WiFi TX | [X mA] | [tiempo] |

## Troubleshooting Común

### Sensor no responde
1. Verificar conexiones
2. Verificar voltaje de alimentación
3. Probar con código de ejemplo de la librería

### WiFi no conecta
1. Verificar credenciales
2. Verificar alcance de señal
3. Reiniciar router/placa

---

*CLAUDE.md para Electrónica - FPUNA 2026*
