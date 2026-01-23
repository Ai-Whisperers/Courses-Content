# Slides - Clase 4: Electrónica + Automatización
## Talleres de Verano FP-UNA 2026

**Total Slides**: 20  
**Critical**: Safety warnings prominent

---

## SLIDE 1: Title

```
CLASE 4
Electrónica & Automatización con IA

Jueves, Febrero 5, 2026
```

---

## SLIDE 2: Agenda

```
📋 AGENDA

1. ⚡ Scope de IA en Hardware (15 min)
2. 🔌 Arduino con IA (40 min)
3. 📡 ESP32 & IoT (25 min)
4. 🔧 Troubleshooting (10 min)
5. 🎯 Ejercicio (15 min)
6. ❓ Q&A (15 min)
```

---

## SLIDE 3: ⚠️ ADVERTENCIA IMPORTANTE

```
⚠️ SEGURIDAD PRIMERO ⚠️

IA es EXCELENTE para:
✅ Aprender
✅ Prototipos
✅ Código de microcontroladores

IA NO REEMPLAZA:
❌ Validación con ingeniero
❌ Análisis de seguridad
❌ Testing con hardware real

🔴 REGLA DE ORO:
"IA para prototipos y aprendizaje.
 Ingeniero humano para producción."

⚡ NUNCA confiar ciegamente en circuitos
   de potencia o AC sin validación
```

**Design**: Red/orange warning colors, large text

---

## SLIDE 4: Qué Puede y NO Puede IA

```
✅ IA SÍ HACE BIEN:

💻 Código Arduino/ESP32
📊 Cálculos (resistencias, etc)
🗺️ Diagramas conceptuales
📚 Explicar datasheets
🐛 Debugging de código

❌ IA NO HACE BIEN:

🔌 Diseño de circuitos complejos
⚡ Validación de seguridad
📐 Constraints físicos reales
🔥 Detectar conexiones físicas malas
```

---

## SLIDE 5: IA en el Workflow de Hardware

```
🔄 PROCESO CON IA

1. CONCEPTO
   → IA sugiere componentes

2. DISEÑO
   → IA genera diagrama básico
   → TÚ validas con simulador real

3. CÓDIGO
   → IA genera sketch
   → TÚ revisas y adaptas

4. TESTING
   → IA ayuda a debuggear
   → TÚ verificas con multímetro

5. PRODUCCIÓN
   → Ingeniero valida todo
```

---

## SLIDE 6: Herramientas para Hardware

```
🛠️ STACK COMPLETO

DISEÑO:
• Fritzing (visual)
• KiCad (PCBs)
• EasyEDA

SIMULACIÓN:
• TinkerCAD (Arduino online)
• Wokwi (ESP32 simulator)
• Proteus

CÓDIGO:
• Arduino IDE
• PlatformIO
• OpenCode (genera código)

IA AYUDA: Código y conceptos
NO REEMPLAZA: Simulación real
```

---

## SLIDE 7: Arduino - Proyecto de Hoy

```
🎯 PROYECTO: MONITOR AMBIENTAL

HARDWARE:
• Arduino UNO
• Sensor DHT22 (temp & humedad)
• LCD 16x2 con I2C
• Relé para ventilador
• LEDs indicadores

FUNCIONALIDAD:
• Lee sensor cada 2s
• Muestra en LCD
• Controla ventilador por temp
• Serial logging

⏱️ SIN IA: 3-4 horas
⏱️ CON IA: 20 minutos
```

**Visual**: Fritzing diagram of components

---

## SLIDE 8: Template: Arduino Code

```
📝 PROMPT PARA ARDUINO

"Proyecto Arduino: [descripción]

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

Genera sketch completo."
```

---

## SLIDE 9: Cálculos con IA

```
🧮 IA PARA CÁLCULOS

USA IA PARA:

⚡ Calcular resistencias
   → Divisor de voltaje
   → Pull-up/pull-down

🔋 Consumo de corriente
   → Total del sistema
   → Duración de batería

📏 Dimensionar componentes
   → Capacitores de filtrado
   → Disipadores de calor

📊 Análisis de señales
   → Frecuencias
   → Duty cycles

⚠️ SIEMPRE verifica manualmente cálculos críticos
```

---

## SLIDE 10: ESP32 - IoT Power

```
📡 ESP32 vs ARDUINO

ARDUINO UNO:
• Más simple
• USB programming
• 5V logic
• No WiFi built-in

ESP32:
• Más poderoso
• WiFi + Bluetooth
• 3.3V logic
• Dual core
• Más memoria

HOY: ESP32 para proyecto IoT
```

---

## SLIDE 11: Proyecto IoT con ESP32

```
🌐 MONITOR REMOTO IoT

CARACTERÍSTICAS:
• Lee sensor DHT22
• Conecta a WiFi
• Web server (dashboard)
• Envía datos a cloud
• Control remoto de ventilador

TECNOLOGÍAS:
• WiFi Manager
• WebServer
• ThingSpeak API
• JSON

🚀 Sistema completo en 30 minutos con IA
```

---

## SLIDE 12: Arquitectura IoT

```
☁️ ARQUITECTURA IoT

[ESP32] → WiFi → [Router] → Internet
              ↓
          [Dashboard]
              ↓
         [Smartphone]

COMPONENTES:
• Device (ESP32) - Sensors
• Network - WiFi
• Cloud - Data storage
• Interface - Web/App

IA AYUDA: Código para cada layer
```

---

## SLIDE 13: Troubleshooting Hardware con IA

```
🔧 DEBUGGING HARDWARE

PROBLEMA: Sensor no lee

CHECKLIST IA:
1. ✅ Verificar conexiones físicas
2. ✅ Verificar voltaje (multímetro)
3. ✅ I2C scanner (si aplica)
4. ✅ Resistor pull-up correcto
5. ✅ Pin correcto en código
6. ✅ Sensor puede estar dañado

IA genera checklist →
TÚ verificas físicamente
```

---

## SLIDE 14: Errores Comunes

```
❌ ERRORES FRECUENTES

1. Voltajes incorrectos
   5V en pin 3.3V → 💥

2. Olvidar ground común
   Sin GND → No funciona

3. Resistencias incorrectas
   LED sin resistor → 💀

4. Pines mal asignados
   Código vs hardware diferente

5. Librerías desactualizadas
   Incompatibilidades

💡 IA puede identificar #4 y #5
🔍 TÚ debes verificar #1, #2, #3
```

---

## SLIDE 15: Safety en Circuitos

```
⚠️ SEGURIDAD CRÍTICA

🔴 NUNCA conectar sin verificar:
• Polaridad correcta
• Voltajes apropiados
• Corrientes dentro de spec

🔴 NUNCA trabajar con AC
sin consultar ingeniero experimentado

🔴 SIEMPRE usar:
• Multímetro para verificar
• Datasheets de componentes
• Calculadora para confirmar

✅ IA sugiere →
✅ TÚ calculas →
✅ INGENIERO valida →
✅ ENTONCES implementas
```

---

## SLIDE 16: MCPs para Hardware

```
🔌 MCPs ESPECIALIZADOS

(Model Context Protocol)

ÚTILES PARA HARDWARE:
• Serial Monitor MCP
• Arduino Library Search
• Datasheet Lookup
• Pin Diagram Generator

PRÓXIMAMENTE:
• KiCad integration
• Wokwi simulator
• Component database

🚀 Extienden capacidades de OpenCode
```

---

## SLIDE 17: Recursos para Aprender

```
📚 APRENDE MÁS

TUTORIALES:
• Arduino Project Hub
• Random Nerd Tutorials
• DroneBot Workshop (YouTube)

SIMULADORES:
• TinkerCAD (gratis)
• Wokwi (ESP32 online)

COMUNIDADES:
• Arduino Forum
• ESP32 subreddit
• Discord servers

💡 USA IA como tutor mientras aprendes
```

---

## SLIDE 18: Ejercicio

```
🎯 EJERCICIO

Elige según nivel:

BÁSICO:
Pide a IA que explique un protocolo 
(I2C, SPI, UART) que no entiendas

INTERMEDIO:
Diseña sistema simple (ej: riego automático)
Pide: componentes, diagrama, código

AVANZADO:
Optimiza proyecto que tengas
(consumo, memoria, velocidad)

⏰ 12 minutos
```

---

## SLIDE 19: Resumen

```
✅ RESUMEN - CLASE 4

HOY APRENDIMOS:

✅ Scope de IA en hardware
✅ Generar código Arduino/ESP32
✅ Proyectos IoT con WiFi
✅ Troubleshooting con IA
✅ Safety considerations

🔑 KEY TAKEAWAY:
"IA para prototipado rápido,
ingeniería humana para seguridad."
```

---

## SLIDE 20: Próxima Clase

```
🔜 MAÑANA - CLASE 5

📅 VIERNES, Febrero 6
✈️ TEMA: Ingeniería Aeronáutica

LO QUE VEREMOS:
• Análisis de parámetros de vuelo
• Diseño aeronáutico conceptual
• Flight data analysis
• Performance optimization

Para aero engineers y entusiastas!

📝 TAREA: Si tienes data de vuelo, tráela
```

---

**Safety notes**: Emphasize warnings throughout presentation

**Visuals needed**:
- Fritzing diagrams (2-3)
- ESP32 pinout
- Warning icons prominent

**Time**: 2.5 hours (extra time for safety content)
