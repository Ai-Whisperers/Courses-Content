# 🛠️ Herramientas - Electrónica y Automatización

## FPUNA Verano 2026

---

## Software de Diseño de Circuitos

### KiCAD (Recomendado - Gratuito)
- **Web:** https://www.kicad.org/
- **Uso:** Esquemáticos + PCB profesional
- **Ventajas:** Open source, industria estándar, bibliotecas extensas
- **Instalación:** Descargar desde web oficial

### EasyEDA
- **Web:** https://easyeda.com/
- **Uso:** Diseño online + fabricación integrada
- **Ventajas:** Sin instalación, integrado con JLCPCB
- **Nivel:** Principiante a intermedio

### LTspice
- **Web:** https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html
- **Uso:** Simulación SPICE
- **Ventajas:** Gratuito, potente, modelos extensos

### Fritzing
- **Web:** https://fritzing.org/
- **Uso:** Diagramas de breadboard
- **Ventajas:** Visual, ideal para documentación

---

## Simuladores

### Tinkercad Circuits
- **Web:** https://www.tinkercad.com/circuits
- **Uso:** Simulación Arduino online
- **Nivel:** Principiante
- **Costo:** Gratuito

### Wokwi
- **Web:** https://wokwi.com/
- **Uso:** Simulador ESP32/Arduino avanzado
- **Ventajas:** Simulación WiFi, sensores
- **Costo:** Gratuito

### Proteus
- **Uso:** Simulación profesional + PCB
- **Nivel:** Avanzado
- **Costo:** Licencia comercial

---

## IDEs de Firmware

### Arduino IDE 2.0
- **Web:** https://www.arduino.cc/en/software
- **Uso:** Arduino, ESP32, STM32
- **Ventajas:** Fácil, bibliotecas extensas

### PlatformIO
- **Web:** https://platformio.org/
- **Uso:** IDE profesional multi-plataforma
- **Ventajas:** Gestión de bibliotecas, debugging
- **Integración:** VS Code

### ESP-IDF
- **Web:** https://docs.espressif.com/projects/esp-idf/
- **Uso:** Desarrollo nativo ESP32
- **Nivel:** Avanzado

---

## Herramientas de Laboratorio

### Multímetro Digital
**Funciones esenciales:**
- Voltaje DC/AC (V)
- Corriente (A)
- Resistencia (Ω)
- Continuidad
- Prueba de diodos

**Recomendados:**
- Económico: UNI-T UT61E
- Profesional: Fluke 87V

### Osciloscopio
**Características clave:**
- Ancho de banda: 50-100MHz para hobby
- Canales: 2-4
- Tasa de muestreo: 1GSa/s+

**Opciones:**
- Económico: Hantek DSO5102P
- USB: Analog Discovery 2
- Profesional: Rigol DS1054Z

### Fuente de Alimentación
**Especificaciones:**
- Voltaje: 0-30V ajustable
- Corriente: 0-5A
- Canales: 2 independientes

---

## Fabricantes de PCB

### JLCPCB (Recomendado)
- **Web:** https://jlcpcb.com/
- **Precio:** ~$2 por 5 PCBs
- **Envío:** 7-15 días a Paraguay
- **Ensamblaje:** SMT disponible

### PCBWay
- **Web:** https://www.pcbway.com/
- **Calidad:** Alta, más opciones
- **Precio:** Competitivo

### OSH Park
- **Web:** https://oshpark.com/
- **Característica:** PCBs color púrpura
- **Precio:** Premium

---

## Proveedores de Componentes

### Internacionales
| Proveedor | Especialidad | Envío |
|-----------|--------------|-------|
| DigiKey | Todo, stock grande | Rápido, caro |
| Mouser | Todo, precios buenos | Medio |
| LCSC | China, barato | Lento |
| AliExpress | Módulos, kits | Muy lento |

### Paraguay/Regional
- **Electrónica Master** (Asunción)
- **Electrocomponentes** (CDE)
- **MercadoLibre** (con cuidado)

---

## Herramientas de Soldadura

### Kit Básico
- Cautín 60W con control de temperatura
- Soporte y esponja
- Estaño 60/40 o sin plomo
- Flux en pasta
- Bomba desoldadora
- Malla desoldadora

### Avanzado
- Estación de soldadura (Hakko FX-888D)
- Pistola de aire caliente
- Microscopio USB
- Pasta de soldadura

---

## Software de Automatización

### Node-RED
- **Web:** https://nodered.org/
- **Uso:** Flujos IoT visuales
- **Ventajas:** Sin código, integración MQTT

### Home Assistant
- **Web:** https://www.home-assistant.io/
- **Uso:** Domótica central
- **Integración:** ESP32, sensores, actuadores

### Grafana + InfluxDB
- **Uso:** Visualización de datos IoT
- **Ventajas:** Dashboards profesionales

---

## Bibliotecas Arduino Esenciales

```cpp
// Comunicación
#include <Wire.h>      // I2C
#include <SPI.h>       // SPI
#include <SoftwareSerial.h>

// WiFi/Bluetooth (ESP32)
#include <WiFi.h>
#include <BluetoothSerial.h>

// Sensores comunes
#include <DHT.h>           // Temperatura/humedad
#include <Adafruit_BMP280.h> // Presión
#include <MPU6050.h>       // Acelerómetro

// Displays
#include <LiquidCrystal_I2C.h>
#include <Adafruit_SSD1306.h>

// Motores
#include <Servo.h>
#include <AccelStepper.h>
```

---

## Recursos de Aprendizaje

### Tutoriales
- **Random Nerd Tutorials** - ESP32/Arduino
- **Adafruit Learning System** - Proyectos guiados
- **SparkFun Learn** - Conceptos básicos

### YouTube (Español)
- Electronoobs
- El Profe García
- Bitwise Ar

### Documentación
- Arduino Reference
- ESP32 Technical Reference Manual
- Datasheets de fabricantes

---

*Herramientas - Track 02 - FPUNA 2026*
