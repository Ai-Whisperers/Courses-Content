# CLASE 4: Electrónica & Automatización con IA
## Talleres de Verano FP-UNA 2026

**Jueves, Febrero 5, 2026**  
**18:00 - 20:00**

---

# 📋 AGENDA

**1.** ⚡ Scope de IA en Hardware (15 min)  
**2.** 🔌 Arduino con IA (40 min)  
**3.** 📡 ESP32 & IoT (25 min)  
**4.** 🔧 Troubleshooting (10 min)  
**5.** 🎯 Ejercicio (15 min)  
**6.** ❓ Q&A (15 min)

---

# ⚠️ SEGURIDAD PRIMERO ⚠️

## IA es EXCELENTE para:
- ✅ Aprender
- ✅ Prototipos
- ✅ Código de microcontroladores

## IA NO REEMPLAZA:
- ❌ Validación con ingeniero
- ❌ Análisis de seguridad
- ❌ Testing con hardware real

## 🔴 REGLA DE ORO:
**"IA para prototipos y aprendizaje. Ingeniero humano para producción."**

### ⚡ NUNCA confiar ciegamente en circuitos de potencia o AC sin validación

---

# ✅ IA SÍ HACE BIEN

## 💻 Código Arduino/ESP32
## 📊 Cálculos (resistencias, etc)
## 🗺️ Diagramas conceptuales
## 📚 Explicar datasheets
## 🐛 Debugging de código

# ❌ IA NO HACE BIEN

## 🔌 Diseño de circuitos complejos
## ⚡ Validación de seguridad
## 📐 Constraints físicos reales
## 🔥 Detectar conexiones físicas malas

---

# 🔄 PROCESO CON IA

## 1. CONCEPTO
→ IA sugiere componentes

## 2. DISEÑO
→ IA genera diagrama básico  
→ TÚ validas con simulador real

## 3. CÓDIGO
→ IA genera sketch  
→ TÚ revisas y adaptas

## 4. TESTING
→ IA ayuda a debuggear  
→ TÚ verificas con multímetro

## 5. PRODUCCIÓN
→ Ingeniero valida todo

---

# 🛠️ STACK COMPLETO

## DISEÑO:
- Fritzing (visual)
- KiCad (PCBs)
- EasyEDA

## SIMULACIÓN:
- TinkerCAD (Arduino online)
- Wokwi (ESP32 simulator)
- Proteus

## CÓDIGO:
- Arduino IDE
- PlatformIO
- OpenCode (genera código)

**IA AYUDA:** Código y conceptos  
**NO REEMPLAZA:** Simulación real

---

# 🎯 PROYECTO: MONITOR AMBIENTAL

## HARDWARE:
- Arduino UNO
- Sensor DHT22 (temp & humedad)
- LCD 16x2 con I2C
- Relé para ventilador
- LEDs indicadores

## FUNCIONALIDAD:
- Lee sensor cada 2s
- Muestra en LCD
- Controla ventilador por temp
- Serial logging

### ⏱️ TIEMPO:
- **Sin IA:** 3-4 horas
- **Con IA:** 20 minutos

---

# 📝 PROMPT TEMPLATE: ARDUINO

```
Proyecto Arduino: [descripción]

Hardware:
• [Lista de componentes con pins]

Funcionalidad:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

Requisitos código:
• Comentarios en español
• Error handling
• Funciones modulares
• Constantes para pins/thresholds

Librerías: [listar si conoces]

Genera sketch completo.
```

---

# 🧮 IA PARA CÁLCULOS

## USA IA PARA:

### ⚡ Calcular resistencias
→ Divisor de voltaje  
→ Pull-up/pull-down

### 🔋 Consumo de corriente
→ Total del sistema  
→ Duración de batería

### 📏 Dimensionar componentes
→ Capacitores de filtrado  
→ Disipadores de calor

### 📊 Análisis de señales
→ Frecuencias  
→ Duty cycles

### ⚠️ SIEMPRE verifica manualmente cálculos críticos

---

# 📡 ESP32 vs ARDUINO

## ARDUINO UNO:
- Más simple
- USB programming
- 5V logic
- No WiFi built-in

## ESP32:
- Más poderoso
- WiFi + Bluetooth
- 3.3V logic
- Dual core
- Más memoria

**HOY:** ESP32 para proyecto IoT

---

# 🌐 MONITOR REMOTO IoT

## CARACTERÍSTICAS:
- Lee sensor DHT22
- Conecta a WiFi
- Web server (dashboard)
- Envía datos a cloud
- Control remoto de ventilador

## TECNOLOGÍAS:
- WiFi Manager
- WebServer
- ThingSpeak API
- JSON

### 🚀 **Sistema completo en 30 minutos con IA**

---

# ☁️ ARQUITECTURA IoT

```
[ESP32] → WiFi → [Router] → Internet
              ↓
          [Dashboard]
              ↓
         [Smartphone]
```

## COMPONENTES:
- **Device** (ESP32) - Sensors
- **Network** - WiFi
- **Cloud** - Data storage
- **Interface** - Web/App

**IA AYUDA:** Código para cada layer

---

# 🔧 DEBUGGING HARDWARE

## PROBLEMA: Sensor no lee

### CHECKLIST IA:
1. ✅ Verificar conexiones físicas
2. ✅ Verificar voltaje (multímetro)
3. ✅ I2C scanner (si aplica)
4. ✅ Resistor pull-up correcto
5. ✅ Pin correcto en código
6. ✅ Sensor puede estar dañado

**IA genera checklist → TÚ verificas físicamente**

---

# ❌ ERRORES FRECUENTES

## 1. Voltajes incorrectos
5V en pin 3.3V → 💥

## 2. Olvidar ground común
Sin GND → No funciona

## 3. Resistencias incorrectas
LED sin resistor → 💀

## 4. Pines mal asignados
Código vs hardware diferente

## 5. Librerías desactualizadas
Incompatibilidades

### 💡 IA puede identificar #4 y #5
### 🔍 TÚ debes verificar #1, #2, #3

---

# ⚠️ SEGURIDAD CRÍTICA

## 🔴 NUNCA conectar sin verificar:
- Polaridad correcta
- Voltajes apropiados
- Corrientes dentro de spec

## 🔴 NUNCA trabajar con AC
sin consultar ingeniero experimentado

## 🔴 SIEMPRE usar:
- Multímetro para verificar
- Datasheets de componentes
- Calculadora para confirmar

### PROCESO SEGURO:
**✅ IA sugiere → ✅ TÚ calculas → ✅ INGENIERO valida → ✅ ENTONCES implementas**

---

# 🔌 MCPs ESPECIALIZADOS

## (Model Context Protocol)

### ÚTILES PARA HARDWARE:
- Serial Monitor MCP
- Arduino Library Search
- Datasheet Lookup
- Pin Diagram Generator

### PRÓXIMAMENTE:
- KiCad integration
- Wokwi simulator
- Component database

### 🚀 Extienden capacidades de OpenCode

---

# 📚 APRENDE MÁS

## TUTORIALES:
- Arduino Project Hub
- Random Nerd Tutorials
- DroneBot Workshop (YouTube)

## SIMULADORES:
- TinkerCAD (gratis)
- Wokwi (ESP32 online)

## COMUNIDADES:
- Arduino Forum
- ESP32 subreddit
- Discord servers

### 💡 USA IA como tutor mientras aprendes

---

# 🎯 EJERCICIO

## Elige según nivel:

### BÁSICO:
Pide a IA que explique un protocolo (I2C, SPI, UART) que no entiendas

### INTERMEDIO:
Diseña sistema simple (ej: riego automático)  
Pide: componentes, diagrama, código

### AVANZADO:
Optimiza proyecto que tengas (consumo, memoria, velocidad)

**⏰ 12 minutos**

---

# ✅ RESUMEN - CLASE 4

## HOY APRENDIMOS:

- ✅ Scope de IA en hardware
- ✅ Generar código Arduino/ESP32
- ✅ Proyectos IoT con WiFi
- ✅ Troubleshooting con IA
- ✅ Safety considerations

## 🔑 KEY TAKEAWAY:

**"IA para prototipado rápido, ingeniería humana para seguridad."**

---

# 🔜 MAÑANA - CLASE 5

**📅 VIERNES, Febrero 6**  
**✈️ TEMA:** Ingeniería Aeronáutica

## LO QUE VEREMOS:
- Análisis de parámetros de vuelo
- Diseño aeronáutico conceptual
- Flight data analysis
- Performance optimization

**Para aero engineers y entusiastas!**

**📝 TAREA:** Si tienes data de vuelo, tráela

---

# ¡GRACIAS!

**¿Preguntas?**

---

**Total Slides:** 20  
**Target Audience:** Ingenieros electrónicos, mecatrónicos  
**Duration:** 2 horas  
**Critical:** Safety warnings prominent  
**Hands-on:** Live demo de Monitor Ambiental (Arduino) y sistema IoT (ESP32)
