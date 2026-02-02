# Proyecto Universal: Plataforma de Desarrollo y Testing para Sistemas Embebidos

## El Proyecto Que Todo Ingeniero Electrónico Necesita

---

## Filosofía

> Este proyecto no es "un ejercicio más". Es **tu herramienta de trabajo** que usarás en cada proyecto futuro.

A diferencia de proyectos específicos (domótica, riego, etc.), esta plataforma es:
- **Reutilizable**: La usarás para testear sensores, prototipar circuitos, debuggear sistemas
- **Profesional**: Diseñada con prácticas de ingeniería real
- **Modular**: Crece contigo según tus necesidades
- **Documentada**: Template para todos tus proyectos futuros

---

## ¿Qué Construirás?

### Sistema de 3 Componentes

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PLATAFORMA DE DESARROLLO EMBEBIDO                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐     │
│  │  1. HARDWARE     │   │  2. FIRMWARE     │   │  3. SOFTWARE     │     │
│  │  Base Board      │   │  Framework       │   │  Dashboard       │     │
│  │                  │   │                  │   │                  │     │
│  │  • Power supply  │   │  • HAL layer     │   │  • Serial monitor│     │
│  │  • MCU socket    │   │  • Driver layer  │   │  • Data logger   │     │
│  │  • I/O headers   │   │  • App layer     │   │  • Real-time plot│     │
│  │  • Protection    │   │  • Test modes    │   │  • IoT bridge    │     │
│  └──────────────────┘   └──────────────────┘   └──────────────────┘     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Parte 1: Hardware - Base Board Universal

### 1.1 Especificaciones del Diseño

**Objetivo**: Una PCB que sirva como base para cualquier proyecto embebido.

#### Diagrama de Bloques

```
                            ┌─────────────────────────────────────┐
                            │         POWER MANAGEMENT            │
    DC Input ──────────────▶│  7-15V → 5V → 3.3V                 │
    (barrel jack)           │  Protección: reverse, overcurrent   │
                            │  LED indicators per rail            │
                            └──────────────┬──────────────────────┘
                                           │
                            ┌──────────────▼──────────────────────┐
                            │         MCU SOCKET AREA             │
                            │  Compatible: ESP32-WROOM / Arduino  │
                            │  Jumpers para selección 3.3V/5V     │
                            │  Reset button + Boot button         │
                            │  USB-Serial integrado (CH340/CP2102)│
                            └──────────────┬──────────────────────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              │                            │                            │
              ▼                            ▼                            ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   ANALOG INPUT      │    │   DIGITAL I/O       │    │   COMMUNICATION     │
│                     │    │                     │    │                     │
│ • 4x ADC channels   │    │ • 8x GPIO headers   │    │ • I2C header (4-pin)│
│ • 0-3.3V / 0-10V    │    │ • LED per channel   │    │ • SPI header (6-pin)│
│ • ESD protection    │    │ • Button per input  │    │ • UART header       │
│ • Divider select    │    │ • Pull-up/down jumper│   │ • 1-Wire header     │
│ • Filtering RC      │    │ • PWM capable       │    │ • CAN (opcional)    │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
              │                            │                            │
              └────────────────────────────┼────────────────────────────┘
                                           │
                            ┌──────────────▼──────────────────────┐
                            │         OUTPUT STAGE                │
                            │                                     │
                            │ • 4x Relay drivers (optoisolated)   │
                            │ • 2x MOSFET outputs (PWM capable)   │
                            │ • 1x Buzzer                         │
                            │ • 4x Status LEDs (user programmable)│
                            └─────────────────────────────────────┘
```

### 1.2 Circuito de Alimentación (Diseño Detallado)

**Por qué esto importa**: El 50% de los problemas en proyectos embebidos son de alimentación.

```
                              POWER SUPPLY SECTION
    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │   DC Input        Reverse      Fuse         5V Reg        3.3V Reg │
    │   7-15V          Protection   500mA        LM7805        AMS1117   │
    │     │               │           │            │              │      │
    │     │    ┌──────┐   │   ┌───┐   │   ┌────┐   │    ┌────┐    │      │
    │   ──┴────┤ D1   ├───┴───┤F1 ├───┴───┤U1  ├───┴────┤U2  ├────┴──    │
    │          │SS34  │       │   │       │    │        │    │           │
    │          └──────┘       └───┘       └────┘        └────┘           │
    │              │                         │            │              │
    │              │      C1      C2         │   C3  C4   │   C5  C6     │
    │              └──────┤├──────┤├─────────┴───┤├──┤├───┴───┤├──┤├──   │
    │                   100µF   100nF          100µF 100nF  10µF 100nF   │
    │                                                                     │
    │   LEDs: D2 (VIN OK)  D3 (5V OK)  D4 (3.3V OK)                      │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

**Especificaciones**:
| Parámetro | Valor | Justificación |
|-----------|-------|---------------|
| Vin range | 7-15V DC | Compatible con adaptadores comunes |
| 5V output | 5V @ 1A | Suficiente para relays + Arduino |
| 3.3V output | 3.3V @ 800mA | ESP32 + sensores |
| Protección reversa | SS34 Schottky | Baja caída, alta corriente |
| Fusible | 500mA reseteable | PTC para protección |

### 1.3 Interfaces de Entrada Analógica

**Problema real**: Necesitas medir señales de diferentes rangos (0-3.3V, 0-5V, 0-10V, 4-20mA).

```
                    ANALOG INPUT CHANNEL (x4)
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │   Input     ESD        Divider Selection      Filter    To ADC│
    │   Signal    Clamp      (Jumper J1)            RC              │
    │     │         │             │                  │          │   │
    │     │    ┌────┴────┐   ┌────┴────┐        ┌───┴───┐      │   │
    │   ──┴────┤TVS D1   ├───┤ Divider ├────────┤R+C    ├──────┴── │
    │          │SMBJ3.3A │   │ Select  │        │10K+100n│         │
    │          └─────────┘   └─────────┘        └───────┘          │
    │                                                                │
    │   Divider Options:                                             │
    │   • J1-A: 1:1 (0-3.3V direct)                                 │
    │   • J1-B: 3:1 (0-10V → 0-3.3V)                                │
    │   • J1-C: Current shunt (4-20mA con 165Ω)                     │
    │                                                                │
    └────────────────────────────────────────────────────────────────┘
```

**Cálculos del Divisor**:
```
Para 0-10V → 0-3.3V:
R1 = 20K, R2 = 10K
Vout = Vin × R2/(R1+R2) = 10V × 10K/30K = 3.33V ✓

Para 4-20mA → 0-3.3V:
R_shunt = 165Ω
V = I × R = 20mA × 165Ω = 3.3V ✓
```

### 1.4 Salidas de Potencia

**Problema real**: Controlar cargas de diferentes tipos (AC, DC, PWM).

```
                    RELAY OUTPUT (x4)
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │   GPIO ──────┬───[R 1K]───┬───│< Optocoupler │───┬─── Relay   │
    │              │            │   │  PC817       │   │   Coil     │
    │              │    LED     │   └──────────────┘   │            │
    │              └────[>|]────┘                      │   ┌─[D]─┐  │
    │                                                  └───┤     ├──│
    │                                                      │Relay│  │
    │   MOSFET OUTPUT (x2)                                 └─────┘  │
    │                                                                │
    │   GPIO ──[R 10K]──┬──────│Gate                                │
    │                   │      │     IRLZ44N           Load         │
    │              [R 10K]     │Drain ─────────────────[████]──VCC  │
    │                   │      │Source ───────────────────────GND   │
    │                  GND                                          │
    │                                                                │
    │   * Flyback diode incluido para cargas inductivas             │
    │   * Gate resistor para limitar corriente de switching         │
    │   * Pull-down para estado definido durante boot               │
    │                                                                │
    └────────────────────────────────────────────────────────────────┘
```

### 1.5 Bill of Materials (BOM) Completo

| Ref | Componente | Valor | Cantidad | Precio Unit (USD) | Subtotal |
|-----|------------|-------|----------|-------------------|----------|
| U1 | LM7805 TO-220 | 5V 1A | 1 | $0.30 | $0.30 |
| U2 | AMS1117-3.3 | 3.3V 1A | 1 | $0.15 | $0.15 |
| U3 | CH340G | USB-Serial | 1 | $0.50 | $0.50 |
| U4-U7 | PC817 | Optocoupler | 4 | $0.10 | $0.40 |
| Q1-Q2 | IRLZ44N | MOSFET | 2 | $0.60 | $1.20 |
| D1 | SS34 | Schottky | 1 | $0.15 | $0.15 |
| D2-D4 | 1N4148 | Signal diode | 3 | $0.02 | $0.06 |
| D5-D8 | 1N4007 | Rectifier | 4 | $0.03 | $0.12 |
| LED1-8 | 3mm LED | Various | 8 | $0.05 | $0.40 |
| R various | Resistors 1/4W | Various | 30 | $0.01 | $0.30 |
| C various | Capacitors | Various | 15 | $0.05 | $0.75 |
| K1-K4 | Relay 5V | SRD-05VDC | 4 | $0.50 | $2.00 |
| J1 | Barrel jack | 5.5x2.1mm | 1 | $0.20 | $0.20 |
| J2-J10 | Pin headers | Various | 50 pins | $0.02 | $1.00 |
| TVS1-4 | SMBJ3.3A | ESD protection | 4 | $0.10 | $0.40 |
| F1 | PTC Fuse | 500mA | 1 | $0.30 | $0.30 |
| PCB | 2-layer | 100x80mm | 1 | $2.00 | $2.00 |
| **TOTAL** | | | | | **$10.23** |

**Costo con ESP32**: ~$10 + $8 (ESP32) = **$18-20 USD**

---

## Parte 2: Firmware Framework Reutilizable

### 2.1 Arquitectura de Software

**Objetivo**: Código que puedes copiar/adaptar para cualquier proyecto futuro.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FIRMWARE ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      APPLICATION LAYER                           │    │
│  │  main.cpp  │  app_modes.cpp  │  user_config.cpp                 │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│  ┌─────────────────────────────────▼───────────────────────────────┐    │
│  │                      SERVICE LAYER                               │    │
│  │  state_machine.cpp  │  scheduler.cpp  │  data_logger.cpp        │    │
│  │  error_handler.cpp  │  watchdog.cpp   │  ota_update.cpp         │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│  ┌─────────────────────────────────▼───────────────────────────────┐    │
│  │                      DRIVER LAYER                                │    │
│  │  analog_input.cpp  │  digital_io.cpp  │  relay_driver.cpp       │    │
│  │  pwm_output.cpp    │  serial_comm.cpp │  mqtt_client.cpp        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│  ┌─────────────────────────────────▼───────────────────────────────┐    │
│  │                      HAL LAYER (Hardware Abstraction)            │    │
│  │  hal_gpio.h  │  hal_adc.h  │  hal_timer.h  │  hal_uart.h        │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Estructura del Proyecto PlatformIO

```
universal-dev-platform/
├── platformio.ini
├── include/
│   ├── config.h              # Configuración de pines y constantes
│   ├── hal/
│   │   ├── hal_gpio.h
│   │   ├── hal_adc.h
│   │   └── hal_pwm.h
│   └── version.h             # Versión del firmware
├── src/
│   ├── main.cpp              # Entry point
│   ├── drivers/
│   │   ├── analog_input.cpp
│   │   ├── digital_io.cpp
│   │   ├── relay_driver.cpp
│   │   └── pwm_output.cpp
│   ├── services/
│   │   ├── state_machine.cpp
│   │   ├── scheduler.cpp
│   │   ├── data_logger.cpp
│   │   └── error_handler.cpp
│   ├── comm/
│   │   ├── serial_protocol.cpp
│   │   ├── mqtt_client.cpp
│   │   └── web_server.cpp
│   └── app/
│       ├── test_mode.cpp     # Modo de testing de hardware
│       ├── monitor_mode.cpp  # Modo de monitoreo
│       └── control_mode.cpp  # Modo de control
├── lib/
│   └── README.md
├── test/
│   ├── test_analog.cpp
│   ├── test_digital.cpp
│   └── test_comm.cpp
└── docs/
    └── API.md
```

### 2.3 Código Base: config.h

```cpp
/**
 * @file config.h
 * @brief Hardware configuration for Universal Dev Platform
 * @version 1.0.0
 *
 * REGLA: Todos los pines y constantes de hardware aquí.
 *        Nunca hardcodear números en el código.
 */

#ifndef CONFIG_H
#define CONFIG_H

// ============================================================================
// PLATFORM SELECTION
// ============================================================================
#define PLATFORM_ESP32      1
#define PLATFORM_ARDUINO    2

#ifndef PLATFORM
    #define PLATFORM PLATFORM_ESP32
#endif

// ============================================================================
// PIN DEFINITIONS - ANALOG INPUTS
// ============================================================================
#if PLATFORM == PLATFORM_ESP32
    #define PIN_AIN_0       34    // ADC1_CH6 - Solo entrada
    #define PIN_AIN_1       35    // ADC1_CH7 - Solo entrada
    #define PIN_AIN_2       32    // ADC1_CH4
    #define PIN_AIN_3       33    // ADC1_CH5
    #define ADC_RESOLUTION  12    // 12-bit ADC (0-4095)
    #define ADC_VREF        3.3f  // Voltaje de referencia
#else
    #define PIN_AIN_0       A0
    #define PIN_AIN_1       A1
    #define PIN_AIN_2       A2
    #define PIN_AIN_3       A3
    #define ADC_RESOLUTION  10    // 10-bit ADC (0-1023)
    #define ADC_VREF        5.0f
#endif

#define NUM_ANALOG_INPUTS   4

// ============================================================================
// PIN DEFINITIONS - DIGITAL I/O
// ============================================================================
#if PLATFORM == PLATFORM_ESP32
    #define PIN_DIO_0       16
    #define PIN_DIO_1       17
    #define PIN_DIO_2       18
    #define PIN_DIO_3       19
    #define PIN_DIO_4       21
    #define PIN_DIO_5       22
    #define PIN_DIO_6       23
    #define PIN_DIO_7       25
#else
    #define PIN_DIO_0       2
    #define PIN_DIO_1       3
    #define PIN_DIO_2       4
    #define PIN_DIO_3       5
    #define PIN_DIO_4       6
    #define PIN_DIO_5       7
    #define PIN_DIO_6       8
    #define PIN_DIO_7       9
#endif

#define NUM_DIGITAL_IO      8

// ============================================================================
// PIN DEFINITIONS - OUTPUTS
// ============================================================================
#if PLATFORM == PLATFORM_ESP32
    #define PIN_RELAY_0     26
    #define PIN_RELAY_1     27
    #define PIN_RELAY_2     14
    #define PIN_RELAY_3     12
    #define PIN_PWM_0       13
    #define PIN_PWM_1       15
    #define PIN_BUZZER      4
    #define PIN_LED_STATUS  2     // LED integrado
#else
    #define PIN_RELAY_0     10
    #define PIN_RELAY_1     11
    #define PIN_RELAY_2     12
    #define PIN_RELAY_3     13
    #define PIN_PWM_0       9
    #define PIN_PWM_1       6
    #define PIN_BUZZER      5
    #define PIN_LED_STATUS  LED_BUILTIN
#endif

#define NUM_RELAYS          4
#define NUM_PWM_OUTPUTS     2

// ============================================================================
// TIMING CONSTANTS
// ============================================================================
#define LOOP_INTERVAL_MS        10      // Main loop cada 10ms (100Hz)
#define ANALOG_SAMPLE_MS        100     // Muestreo analógico cada 100ms
#define DIGITAL_DEBOUNCE_MS     50      // Debounce de 50ms
#define MQTT_PUBLISH_MS         1000    // Publicar cada 1 segundo
#define WATCHDOG_TIMEOUT_MS     5000    // Watchdog 5 segundos

// ============================================================================
// COMMUNICATION
// ============================================================================
#define SERIAL_BAUD             115200
#define MQTT_BROKER             "broker.hivemq.com"
#define MQTT_PORT               1883
#define MQTT_CLIENT_ID          "udp-001"   // Cambiar por dispositivo
#define MQTT_TOPIC_BASE         "fpuna/udp"

// ============================================================================
// CALIBRATION (editar según tu hardware)
// ============================================================================
typedef struct {
    float offset;       // Offset de calibración
    float scale;        // Factor de escala
    float divider;      // Ratio del divisor de voltaje
} AnalogCalibration_t;

// Calibración por defecto (ajustar después de medir)
static const AnalogCalibration_t ANALOG_CAL[NUM_ANALOG_INPUTS] = {
    {0.0f, 1.0f, 1.0f},     // CH0: 0-3.3V directo
    {0.0f, 1.0f, 3.0f},     // CH1: 0-10V (divisor 3:1)
    {0.0f, 1.0f, 1.0f},     // CH2: 0-3.3V directo
    {0.0f, 1.0f, 1.0f},     // CH3: 0-3.3V directo
};

#endif // CONFIG_H
```

### 2.4 Código Base: Driver de Entradas Analógicas

```cpp
/**
 * @file analog_input.cpp
 * @brief Driver para entradas analógicas con filtrado y calibración
 */

#include "config.h"
#include "drivers/analog_input.h"

// ============================================================================
// PRIVATE DATA
// ============================================================================
static const uint8_t analogPins[NUM_ANALOG_INPUTS] = {
    PIN_AIN_0, PIN_AIN_1, PIN_AIN_2, PIN_AIN_3
};

// Filtro de media móvil
#define FILTER_SAMPLES 8
static uint16_t filterBuffer[NUM_ANALOG_INPUTS][FILTER_SAMPLES];
static uint8_t filterIndex[NUM_ANALOG_INPUTS] = {0};

// Últimas lecturas procesadas
static float lastReading[NUM_ANALOG_INPUTS] = {0};
static bool channelError[NUM_ANALOG_INPUTS] = {false};

// ============================================================================
// PUBLIC FUNCTIONS
// ============================================================================

/**
 * @brief Inicializa el módulo de entradas analógicas
 */
void AnalogInput_Init(void) {
    #if PLATFORM == PLATFORM_ESP32
    // ESP32: configurar resolución ADC
    analogReadResolution(ADC_RESOLUTION);
    analogSetAttenuation(ADC_11db);  // Rango completo 0-3.3V
    #endif

    // Inicializar buffers de filtro
    for (int ch = 0; ch < NUM_ANALOG_INPUTS; ch++) {
        for (int i = 0; i < FILTER_SAMPLES; i++) {
            filterBuffer[ch][i] = 0;
        }
        filterIndex[ch] = 0;
        lastReading[ch] = 0;
        channelError[ch] = false;
    }

    // Pre-cargar filtros con lecturas iniciales
    for (int i = 0; i < FILTER_SAMPLES; i++) {
        AnalogInput_Update();
    }
}

/**
 * @brief Actualiza todas las lecturas analógicas (llamar periódicamente)
 */
void AnalogInput_Update(void) {
    for (int ch = 0; ch < NUM_ANALOG_INPUTS; ch++) {
        // Leer ADC
        uint16_t rawValue = analogRead(analogPins[ch]);

        // Validar lectura (detectar canal desconectado)
        if (rawValue < 5 || rawValue > ((1 << ADC_RESOLUTION) - 5)) {
            // Posible error: rail alto o bajo
            channelError[ch] = true;
        } else {
            channelError[ch] = false;
        }

        // Agregar al filtro de media móvil
        filterBuffer[ch][filterIndex[ch]] = rawValue;
        filterIndex[ch] = (filterIndex[ch] + 1) % FILTER_SAMPLES;

        // Calcular promedio
        uint32_t sum = 0;
        for (int i = 0; i < FILTER_SAMPLES; i++) {
            sum += filterBuffer[ch][i];
        }
        uint16_t filtered = sum / FILTER_SAMPLES;

        // Convertir a voltaje con calibración
        float voltage = (filtered * ADC_VREF) / ((1 << ADC_RESOLUTION) - 1);
        voltage = (voltage * ANALOG_CAL[ch].divider) - ANALOG_CAL[ch].offset;
        voltage *= ANALOG_CAL[ch].scale;

        lastReading[ch] = voltage;
    }
}

/**
 * @brief Obtiene la última lectura de un canal
 * @param channel Número de canal (0-3)
 * @return Voltaje en V, o -1.0 si error
 */
float AnalogInput_GetVoltage(uint8_t channel) {
    if (channel >= NUM_ANALOG_INPUTS) return -1.0f;
    if (channelError[channel]) return -1.0f;
    return lastReading[channel];
}

/**
 * @brief Obtiene el valor raw de un canal (para debugging)
 * @param channel Número de canal (0-3)
 * @return Valor ADC raw (0-4095 para ESP32, 0-1023 para Arduino)
 */
uint16_t AnalogInput_GetRaw(uint8_t channel) {
    if (channel >= NUM_ANALOG_INPUTS) return 0;
    return analogRead(analogPins[channel]);
}

/**
 * @brief Verifica si un canal tiene error
 * @param channel Número de canal (0-3)
 * @return true si hay error
 */
bool AnalogInput_HasError(uint8_t channel) {
    if (channel >= NUM_ANALOG_INPUTS) return true;
    return channelError[channel];
}

/**
 * @brief Obtiene todas las lecturas en formato JSON
 * @param buffer Buffer para escribir el JSON
 * @param bufferSize Tamaño del buffer
 * @return Número de caracteres escritos
 */
int AnalogInput_ToJSON(char* buffer, size_t bufferSize) {
    return snprintf(buffer, bufferSize,
        "{\"analog\":[%.3f,%.3f,%.3f,%.3f],\"errors\":[%d,%d,%d,%d]}",
        lastReading[0], lastReading[1], lastReading[2], lastReading[3],
        channelError[0], channelError[1], channelError[2], channelError[3]
    );
}
```

### 2.5 Modo de Testing de Hardware

```cpp
/**
 * @file test_mode.cpp
 * @brief Modo de testing interactivo para verificar hardware
 *
 * USO: Enviar comandos por Serial para testear cada componente
 */

#include "config.h"
#include "app/test_mode.h"
#include "drivers/analog_input.h"
#include "drivers/digital_io.h"
#include "drivers/relay_driver.h"

// ============================================================================
// COMANDOS DISPONIBLES
// ============================================================================
/*
 * Comandos Serial (115200 baud):
 *
 * AIN?          - Leer todas las entradas analógicas
 * AIN0?         - Leer canal analógico 0
 * DIN?          - Leer todas las entradas digitales
 * RELAY0=1     - Activar relay 0
 * RELAY0=0     - Desactivar relay 0
 * RELAYS?       - Estado de todos los relays
 * PWM0=128      - Setear PWM 0 al 50% (0-255)
 * LED=BLINK     - Parpadear LED de status
 * BUZZ=100      - Beep de 100ms
 * INFO?         - Información del sistema
 * HELP          - Lista de comandos
 * SELFTEST      - Ejecutar autotest completo
 */

static char cmdBuffer[64];
static uint8_t cmdIndex = 0;

void TestMode_Init(void) {
    Serial.begin(SERIAL_BAUD);
    while (!Serial && millis() < 3000); // Esperar Serial (max 3s)

    Serial.println(F("========================================"));
    Serial.println(F("  Universal Dev Platform - Test Mode"));
    Serial.println(F("  Version: 1.0.0"));
    Serial.println(F("  Type 'HELP' for commands"));
    Serial.println(F("========================================"));
}

void TestMode_Update(void) {
    // Leer comandos del Serial
    while (Serial.available()) {
        char c = Serial.read();

        if (c == '\n' || c == '\r') {
            if (cmdIndex > 0) {
                cmdBuffer[cmdIndex] = '\0';
                TestMode_ProcessCommand(cmdBuffer);
                cmdIndex = 0;
            }
        } else if (cmdIndex < sizeof(cmdBuffer) - 1) {
            cmdBuffer[cmdIndex++] = toupper(c);
        }
    }
}

void TestMode_ProcessCommand(const char* cmd) {
    Serial.print(F("> "));
    Serial.println(cmd);

    // ---- ANALOG INPUTS ----
    if (strcmp(cmd, "AIN?") == 0) {
        Serial.println(F("Analog Inputs:"));
        for (int i = 0; i < NUM_ANALOG_INPUTS; i++) {
            Serial.printf("  AIN%d: %.3f V (raw: %d) %s\n",
                i,
                AnalogInput_GetVoltage(i),
                AnalogInput_GetRaw(i),
                AnalogInput_HasError(i) ? "[ERROR]" : "[OK]"
            );
        }
    }

    // ---- DIGITAL INPUTS ----
    else if (strcmp(cmd, "DIN?") == 0) {
        Serial.println(F("Digital Inputs:"));
        for (int i = 0; i < NUM_DIGITAL_IO; i++) {
            Serial.printf("  DIN%d: %d\n", i, DigitalIO_Read(i));
        }
    }

    // ---- RELAYS ----
    else if (strncmp(cmd, "RELAY", 5) == 0) {
        int relay = cmd[5] - '0';
        if (relay >= 0 && relay < NUM_RELAYS) {
            if (cmd[6] == '=') {
                bool state = (cmd[7] == '1');
                Relay_Set(relay, state);
                Serial.printf("Relay %d set to %s\n", relay, state ? "ON" : "OFF");
            } else if (cmd[6] == '?') {
                Serial.printf("Relay %d is %s\n", relay, Relay_Get(relay) ? "ON" : "OFF");
            }
        }
    }
    else if (strcmp(cmd, "RELAYS?") == 0) {
        Serial.println(F("Relay States:"));
        for (int i = 0; i < NUM_RELAYS; i++) {
            Serial.printf("  RELAY%d: %s\n", i, Relay_Get(i) ? "ON" : "OFF");
        }
    }

    // ---- PWM ----
    else if (strncmp(cmd, "PWM", 3) == 0) {
        int pwm = cmd[3] - '0';
        if (pwm >= 0 && pwm < NUM_PWM_OUTPUTS && cmd[4] == '=') {
            int value = atoi(&cmd[5]);
            PWM_Set(pwm, value);
            Serial.printf("PWM %d set to %d (%.1f%%)\n", pwm, value, value * 100.0 / 255.0);
        }
    }

    // ---- SELFTEST ----
    else if (strcmp(cmd, "SELFTEST") == 0) {
        TestMode_SelfTest();
    }

    // ---- HELP ----
    else if (strcmp(cmd, "HELP") == 0) {
        Serial.println(F("\nAvailable Commands:"));
        Serial.println(F("  AIN?        - Read all analog inputs"));
        Serial.println(F("  AIN0?       - Read analog input 0"));
        Serial.println(F("  DIN?        - Read all digital inputs"));
        Serial.println(F("  RELAY0=1    - Set relay 0 ON"));
        Serial.println(F("  RELAY0=0    - Set relay 0 OFF"));
        Serial.println(F("  RELAYS?     - Read all relay states"));
        Serial.println(F("  PWM0=128    - Set PWM 0 to 50%"));
        Serial.println(F("  BUZZ=100    - Beep for 100ms"));
        Serial.println(F("  SELFTEST    - Run hardware self-test"));
        Serial.println(F("  INFO?       - System information"));
        Serial.println(F("  HELP        - This message\n"));
    }

    else {
        Serial.println(F("Unknown command. Type HELP for list."));
    }
}

void TestMode_SelfTest(void) {
    Serial.println(F("\n=== SELF-TEST STARTING ===\n"));
    int passed = 0;
    int failed = 0;

    // Test 1: Analog inputs responden
    Serial.print(F("[TEST] Analog inputs... "));
    bool analogOK = true;
    for (int i = 0; i < NUM_ANALOG_INPUTS; i++) {
        uint16_t raw = AnalogInput_GetRaw(i);
        // Verificar que no está pegado a rail
        if (raw < 10 || raw > ((1 << ADC_RESOLUTION) - 10)) {
            analogOK = false;
        }
    }
    if (analogOK) { Serial.println(F("PASS")); passed++; }
    else { Serial.println(F("FAIL - Check connections")); failed++; }

    // Test 2: Relays toggle
    Serial.print(F("[TEST] Relay toggle... "));
    for (int i = 0; i < NUM_RELAYS; i++) {
        Relay_Set(i, true);
        delay(50);
        Relay_Set(i, false);
    }
    Serial.println(F("PASS (verify click sound)"));
    passed++;

    // Test 3: PWM output
    Serial.print(F("[TEST] PWM outputs... "));
    for (int i = 0; i < NUM_PWM_OUTPUTS; i++) {
        PWM_Set(i, 128);
        delay(100);
        PWM_Set(i, 0);
    }
    Serial.println(F("PASS (verify LED dim)"));
    passed++;

    // Test 4: Buzzer
    Serial.print(F("[TEST] Buzzer... "));
    Buzzer_Beep(100);
    Serial.println(F("PASS (verify sound)"));
    passed++;

    // Resumen
    Serial.println(F("\n=== SELF-TEST COMPLETE ==="));
    Serial.printf("Passed: %d, Failed: %d\n\n", passed, failed);
}
```

---

## Parte 3: Dashboard de Monitoreo

### 3.1 Web Interface Embebida (ESP32)

```html
<!-- Archivo: data/index.html (para SPIFFS) -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UDP Monitor</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #1a1a2e;
            color: #eee;
            padding: 20px;
        }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { text-align: center; margin-bottom: 20px; color: #00d4ff; }

        .card {
            background: #16213e;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
        }
        .card h2 {
            font-size: 14px;
            color: #888;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .readings {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
        }
        .reading {
            background: #0f3460;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .reading .value {
            font-size: 28px;
            font-weight: bold;
            color: #00d4ff;
        }
        .reading .label { font-size: 12px; color: #888; }
        .reading.error .value { color: #ff4444; }

        .relay-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        .relay-btn {
            padding: 15px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
        }
        .relay-btn.off { background: #333; color: #888; }
        .relay-btn.on { background: #00d4ff; color: #000; }

        .status { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
        .status.connected { color: #00ff88; }
        .status.disconnected { color: #ff4444; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Universal Dev Platform</h1>

        <div class="card">
            <h2>Analog Inputs</h2>
            <div class="readings" id="analog-readings">
                <div class="reading"><div class="value">--</div><div class="label">AIN 0</div></div>
                <div class="reading"><div class="value">--</div><div class="label">AIN 1</div></div>
                <div class="reading"><div class="value">--</div><div class="label">AIN 2</div></div>
                <div class="reading"><div class="value">--</div><div class="label">AIN 3</div></div>
            </div>
        </div>

        <div class="card">
            <h2>Digital Inputs</h2>
            <div class="readings" id="digital-readings">
                <div class="reading"><div class="value">--</div><div class="label">DIN 0</div></div>
                <div class="reading"><div class="value">--</div><div class="label">DIN 1</div></div>
                <div class="reading"><div class="value">--</div><div class="label">DIN 2</div></div>
                <div class="reading"><div class="value">--</div><div class="label">DIN 3</div></div>
            </div>
        </div>

        <div class="card">
            <h2>Relay Control</h2>
            <div class="relay-grid">
                <button class="relay-btn off" onclick="toggleRelay(0)">Relay 0</button>
                <button class="relay-btn off" onclick="toggleRelay(1)">Relay 1</button>
                <button class="relay-btn off" onclick="toggleRelay(2)">Relay 2</button>
                <button class="relay-btn off" onclick="toggleRelay(3)">Relay 3</button>
            </div>
        </div>

        <div class="status disconnected" id="status">Connecting...</div>
    </div>

    <script>
        const ws = new WebSocket(`ws://${window.location.host}/ws`);

        ws.onopen = () => {
            document.getElementById('status').textContent = 'Connected';
            document.getElementById('status').className = 'status connected';
        };

        ws.onclose = () => {
            document.getElementById('status').textContent = 'Disconnected';
            document.getElementById('status').className = 'status disconnected';
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            updateAnalog(data.analog, data.errors);
            updateDigital(data.digital);
            updateRelays(data.relays);
        };

        function updateAnalog(values, errors) {
            const container = document.getElementById('analog-readings');
            values.forEach((v, i) => {
                const el = container.children[i];
                el.querySelector('.value').textContent = errors[i] ? 'ERR' : v.toFixed(2) + 'V';
                el.className = errors[i] ? 'reading error' : 'reading';
            });
        }

        function updateDigital(values) {
            const container = document.getElementById('digital-readings');
            values.forEach((v, i) => {
                container.children[i].querySelector('.value').textContent = v ? 'HIGH' : 'LOW';
            });
        }

        function updateRelays(values) {
            const btns = document.querySelectorAll('.relay-btn');
            values.forEach((v, i) => {
                btns[i].className = v ? 'relay-btn on' : 'relay-btn off';
            });
        }

        function toggleRelay(n) {
            ws.send(JSON.stringify({cmd: 'relay', n: n, toggle: true}));
        }
    </script>
</body>
</html>
```

### 3.2 Integración con Grafana (Opcional Avanzado)

Para proyectos IoT más complejos, el firmware puede enviar datos a InfluxDB y visualizar en Grafana.

**Docker Compose para stack local**:
```yaml
# docker-compose.yml
version: '3'
services:
  mosquitto:
    image: eclipse-mosquitto:2
    ports:
      - "1883:1883"
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf

  telegraf:
    image: telegraf:latest
    volumes:
      - ./telegraf.conf:/etc/telegraf/telegraf.conf
    depends_on:
      - mosquitto
      - influxdb

  influxdb:
    image: influxdb:2.7
    ports:
      - "8086:8086"
    environment:
      - INFLUXDB_DB=udp_data

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    depends_on:
      - influxdb
```

---

## Parte 4: Entregables y Evaluación

### 4.1 Entregables Requeridos

| # | Entregable | Descripción | Peso |
|---|------------|-------------|------|
| 1 | **Esquemático KiCAD** | Completo, con símbolos correctos | 15% |
| 2 | **PCB Layout** | 2 capas, DRC sin errores | 15% |
| 3 | **Gerber Files** | Listos para fabricar | 5% |
| 4 | **BOM con precios** | Incluir proveedores PY | 5% |
| 5 | **Firmware completo** | Compilable, comentado | 20% |
| 6 | **Test Mode funcional** | Todos los comandos operativos | 10% |
| 7 | **Web interface** | Monitoreo en tiempo real | 10% |
| 8 | **Documentación** | Manual de uso, API | 10% |
| 9 | **Video demo** | 5-8 minutos | 5% |
| 10 | **Hardware funcional** | Placa armada y probada | 5% |

### 4.2 Niveles de Implementación

**Nivel Básico** (60-75 puntos):
- Esquemático y PCB completos
- Firmware con Test Mode
- Breadboard funcional
- Documentación básica

**Nivel Intermedio** (76-90 puntos):
- Todo lo anterior +
- Web interface funcional
- MQTT publishing
- PCB fabricado o perfboard ordenado
- Calibración documentada

**Nivel Avanzado** (91-100+ puntos):
- Todo lo anterior +
- Grafana dashboard
- OTA updates
- PCB fabricado y soldado
- Enclosure/carcasa
- Modo de bajo consumo

### 4.3 Preguntas de Comprensión

Durante la evaluación, deberás explicar:

1. **Hardware**: "¿Por qué usas un optoacoplador para los relays en lugar de conectar directo?"

2. **Firmware**: "Explica el flujo de datos desde el ADC hasta el valor en voltios. ¿Qué hace cada paso de la función `AnalogInput_GetVoltage()`?"

3. **Calibración**: "Si tu canal 0 lee 2.95V cuando aplicas exactamente 3.00V, ¿cómo ajustas la calibración?"

4. **Arquitectura**: "¿Por qué separaste el código en HAL, Drivers y App layers? ¿Qué ventaja tiene?"

5. **Testing**: "Si el selftest de relays pasa pero el relay no activa la carga, ¿dónde está el problema?"

---

## Parte 5: Por Qué Este Proyecto Importa

### Para Tu Carrera

```
Este proyecto te da:

✅ Una herramienta real de trabajo
   → La usarás para prototipar todos tus proyectos futuros

✅ Un portfolio tangible
   → PCB profesional + firmware limpio impresiona empleadores

✅ Skills transferibles
   → El 90% del código aplica a cualquier proyecto embebido

✅ Entendimiento profundo
   → No es copiar código, es entender por qué cada línea existe

✅ Práctica de documentación
   → Aprenderás a documentar como un profesional
```

### Comparación con Proyectos "Típicos"

| Aspecto | Proyecto Típico (ej: Domótica) | Este Proyecto |
|---------|-------------------------------|---------------|
| Reutilización | Baja (muy específico) | Alta (base universal) |
| Aprendizaje | Superficial de muchas cosas | Profundo de fundamentos |
| Portfolio | "Hice una cosa" | "Tengo una herramienta profesional" |
| Después del curso | Guardado en cajón | Usado en cada proyecto |

---

## Recursos y Referencias

### Datasheets Esenciales
- LM7805: Regulador lineal (entender dropout, disipación)
- AMS1117: LDO 3.3V (comparar con 7805)
- PC817: Optoacoplador (CTR, tiempos)
- IRLZ44N: MOSFET logic-level (Rds_on, Vgs_th)

### Lecturas Recomendadas
- "Making Embedded Systems" - Elecia White
- "The Art of Electronics" - Horowitz & Hill (capítulos de reguladores y interfaces)

### Videos de Referencia
- EEVblog: "PCB Design Tutorial" series
- Phil's Lab: "STM32 From Scratch" (arquitectura de firmware)

---

## Licencia del Proyecto

Este proyecto y su documentación se liberan bajo licencia MIT.
Puedes usarlo, modificarlo, y compartirlo libremente.

**Crédito**: Basado en el Track 02 de FPUNA Verano 2026.

---

*Proyecto Universal de Sistemas Embebidos - FPUNA 2026*
