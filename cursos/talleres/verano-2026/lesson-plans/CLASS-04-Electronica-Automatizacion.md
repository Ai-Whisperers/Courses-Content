# CLASE 4: Electrónica & Automatización con IA
## Productividad Académica con IA - TALLERES VERANO 2026

**Fecha**: Jueves, Febrero 5, 2026  
**Horario**: 18:00 - 20:00 (2 horas)  
**Modalidad**: Virtual

---

## 🎯 Objetivos de Aprendizaje

Al finalizar esta clase, los estudiantes podrán:

1. ✅ Usar IA para diseño y debugging de circuitos
2. ✅ Generar código para Arduino/ESP32 con OpenCode
3. ✅ Simular circuitos y analizar resultados con IA
4. ✅ Aplicar IA en proyectos IoT
5. ✅ Troubleshoot problemas hardware con asistencia de IA
6. ✅ Entender limitaciones de IA en hardware

---

## ⏱️ PLAN DE CLASE MINUTO A MINUTO

---

### 🔷 PARTE 1: Intro + IA en Electrónica (20 minutos)

#### **18:00 - 18:05 (5 min) - Bienvenida**

**QUÉ MOSTRAR**: 
- 📊 **SLIDES**: "IA en Electrónica y Automatización"

**QUÉ DECIR**:
```
"Bienvenidos a la Clase 4!

Pregunta rápida: ¿Cuántos trabajan con:
- Arduino?
- ESP32/ESP8266?
- Raspberry Pi?
- PLC?
- Otro microcontrolador?

[Leer respuestas]

Hoy vamos a ver cómo IA puede ayudarlos con hardware y automatización.

PERO primero, una advertencia importante..."
```

---

#### **18:05 - 18:20 (15 min) - Scope de IA en Hardware**

**QUÉ MOSTRAR**:
- 📊 **SLIDES**: "Qué Puede y NO Puede Hacer IA en Hardware"

**SLIDE: IA en Hardware - Realidades**
```
✅ LO QUE IA SÍ HACE BIEN:

1. Código de Microcontroladores
   - Generar sketches de Arduino
   - ESP32/ESP8266 code
   - Explicar funciones de librerías

2. Troubleshooting Software
   - Debugging de código embebido
   - Optimización de memoria
   - Timing issues

3. Diseño Conceptual
   - Sugerir componentes
   - Diagramas de bloques
   - Cálculos básicos (resistencias, capacitores, etc.)

4. Documentación
   - Datasheets summary
   - Comentar código
   - Explicar protocolos (I2C, SPI, UART)
```

**SLIDE: Limitaciones Importantes**
```
❌ LO QUE IA NO PUEDE HACER (O HACE MAL):

1. Diseño de Circuitos Complejos
   - No reemplaza simulación real (LTSpice, Proteus)
   - Puede sugerir diseños inseguros
   - No entiende constraints físicos

2. Debugging de Hardware
   - No puede "ver" tu circuito físico
   - No detecta conexiones físicas mal hechas
   - No mide voltajes reales

3. Validación de Seguridad
   - ⚠️ NUNCA confíes ciegamente en circuitos de potencia
   - ⚠️ Siempre valida con ingeniero para circuitos AC
   - ⚠️ Verifica cálculos críticos de seguridad

REGLA DE ORO:
"IA para prototipos y aprendizaje. 
 Ingeniero humano para producción y seguridad."
```

**QUÉ DECIR**:
```
"Esto es MUY importante:

IA es excelente para:
- Aprender
- Prototipar rápido
- Generar código base

Pero NO reemplaza:
- Entender fundamentos de electrónica
- Validación con herramientas profesionales
- Análisis de seguridad

Si van a conectar algo a AC power o trabajar con alta corriente,
SIEMPRE consulten con un ingeniero experimentado.

Con eso claro, vamos a ejemplos prácticos."
```

---

### 🔷 PARTE 2: Arduino con IA (40 minutos)

#### **18:20 - 19:00 (40 min) - Proyecto Arduino con OpenCode**

💻 **LIVE DEMO**: Crear proyecto Arduino completo

**Proyecto: Sistema de Monitoreo Ambiental**
```
"Vamos a crear un sistema que:
- Lee temperatura y humedad (DHT22)
- Muestra en LCD
- Enciende ventilador si temp > umbral
- Envía datos por Serial para logging

Hardware imaginario:
- Arduino UNO
- Sensor DHT22
- LCD 16x2 (I2C)
- Relé para controlar ventilador
```

**Paso 1: Diagrama y Lista de Componentes (5 min)**

💻 OpenCode:
```
Prompt:
"Voy a crear sistema de monitoreo ambiental con Arduino UNO.

Hardware:
- Sensor DHT22 (temp & humedad)
- LCD 16x2 con I2C
- Relé para controlar ventilador 12V
- LEDs indicadores

Genera:
1. Lista completa de componentes con especificaciones
2. Diagrama de conexiones en formato texto (ASCII art o description)
3. Cálculo de consumo de corriente total
4. Notas de seguridad importantes"

[OpenCode genera]

[Mostrar respuesta]:

```
COMPONENTES NECESARIOS:
=======================
1. Arduino UNO R3
2. DHT22 (AM2302) Temperature & Humidity Sensor
3. LCD 16x2 con módulo I2C (PCF8574)
4. Módulo Relé 5V (1 canal, optoacoplado)
5. 3x LEDs (rojo, amarillo, verde)
6. 3x Resistencias 220Ω (para LEDs)
7. 1x Resistencia pull-up 10kΩ (para DHT22)
8. Fuente 12V para ventilador
9. Cables jumper M-M, M-F
10. Breadboard

CONEXIONES:
===========
DHT22:
  - VCC → 5V
  - GND → GND
  - DATA → Pin 2 (con pull-up 10kΩ a 5V)

LCD I2C:
  - VCC → 5V
  - GND → GND
  - SDA → A4
  - SCL → A5

Relé:
  - VCC → 5V
  - GND → GND
  - IN → Pin 7

LEDs:
  - Verde (normal): Pin 3 con resistor 220Ω
  - Amarillo (warning): Pin 4 con resistor 220Ω
  - Rojo (alarm): Pin 5 con resistor 220Ω

CONSUMO ESTIMADO:
=================
- Arduino UNO: ~50mA
- DHT22: ~1mA
- LCD con backlight: ~150mA
- Relé (coil): ~70mA
- LEDs: ~60mA (3x20mA)
TOTAL: ~331mA

Puerto USB (500mA) es suficiente.

⚠️ SEGURIDAD:
=============
- Relé maneja ventilador 12V (aislado de Arduino)
- NO conectar carga AC directamente al Arduino
- Usar fuente externa para ventilador, NO USB
```

"Perfecto. Ya sabemos qué necesitamos y cómo conectarlo."
```

**Paso 2: Código Arduino (15 min)**

💻 Continuar en OpenCode:
```
Prompt:
"Genera código Arduino completo para este sistema.

Funcionalidad:
1. Lee DHT22 cada 2 segundos
2. Muestra temp/humedad en LCD
3. Control de ventilador:
   - OFF si temp < 25°C (LED verde)
   - ON si temp >= 25°C y < 30°C (LED amarillo)
   - ON max si temp >= 30°C (LED rojo)
4. Serial output para logging (9600 baud)
5. Manejo de errores (sensor failure)

Requisitos código:
- Comentarios en español
- Funciones modulares
- Constantes para pins y thresholds
- Error handling robusto

Librerías a usar:
- DHT sensor library (Adafruit)
- LiquidCrystal I2C"

[OpenCode genera código]

[Revisar código generado - key parts]:

```cpp
// Archivo: environmental_monitor.ino
#include <DHT.h>
#include <LiquidCrystal_I2C.h>

// ===== CONFIGURACIÓN =====
// Pins
#define DHT_PIN 2
#define RELAY_PIN 7
#define LED_GREEN 3
#define LED_YELLOW 4
#define LED_RED 5

// Sensores
#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

// LCD (dirección I2C: 0x27, 16 chars x 2 lines)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Thresholds
const float TEMP_WARNING = 25.0;
const float TEMP_CRITICAL = 30.0;

// Timing
const unsigned long INTERVAL = 2000; // 2 segundos
unsigned long previousMillis = 0;

// ===== SETUP =====
void setup() {
  // Serial para debugging
  Serial.begin(9600);
  Serial.println("Sistema de Monitoreo Iniciando...");
  
  // Inicializar DHT
  dht.begin();
  
  // Inicializar LCD
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Monitoreo Amb.");
  delay(2000);
  
  // Configurar pins
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  
  // Estado inicial
  digitalWrite(RELAY_PIN, LOW); // Ventilador OFF
  updateLEDs(0); // Verde
}

// ===== LOOP PRINCIPAL =====
void loop() {
  unsigned long currentMillis = millis();
  
  // Leer sensor cada INTERVAL
  if (currentMillis - previousMillis >= INTERVAL) {
    previousMillis = currentMillis;
    
    // Leer datos
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
    
    // Verificar si lectura falló
    if (isnan(humidity) || isnan(temperature)) {
      Serial.println("❌ Error leyendo DHT22!");
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("ERROR SENSOR");
      return;
    }
    
    // Actualizar display
    updateDisplay(temperature, humidity);
    
    // Control de ventilador
    controlFan(temperature);
    
    // Log a Serial
    logData(temperature, humidity);
  }
}

// ===== FUNCIONES =====

void updateDisplay(float temp, float hum) {
  lcd.clear();
  
  // Línea 1: Temperatura
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(temp, 1);
  lcd.print(" C");
  
  // Línea 2: Humedad
  lcd.setCursor(0, 1);
  lcd.print("Hum:  ");
  lcd.print(hum, 1);
  lcd.print(" %");
}

void controlFan(float temp) {
  if (temp < TEMP_WARNING) {
    // Normal - Verde
    digitalWrite(RELAY_PIN, LOW); // Fan OFF
    updateLEDs(0);
  } 
  else if (temp >= TEMP_WARNING && temp < TEMP_CRITICAL) {
    // Warning - Amarillo
    digitalWrite(RELAY_PIN, HIGH); // Fan ON
    updateLEDs(1);
  } 
  else {
    // Critical - Rojo
    digitalWrite(RELAY_PIN, HIGH); // Fan ON
    updateLEDs(2);
  }
}

void updateLEDs(int state) {
  // Apagar todos
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_YELLOW, LOW);
  digitalWrite(LED_RED, LOW);
  
  // Encender según estado
  switch(state) {
    case 0: digitalWrite(LED_GREEN, HIGH); break;
    case 1: digitalWrite(LED_YELLOW, HIGH); break;
    case 2: digitalWrite(LED_RED, HIGH); break;
  }
}

void logData(float temp, float hum) {
  Serial.print("📊 T: ");
  Serial.print(temp);
  Serial.print(" °C | H: ");
  Serial.print(hum);
  Serial.println(" %");
}
```

[Explicar estructura]:

"Código bien organizado:
✅ Constantes para pins (fácil de cambiar)
✅ Funciones modulares (cada una hace una cosa)
✅ Error handling (verifica sensor)
✅ No usa delay() - usa millis() (non-blocking)
✅ Comentarios claros

Esto es código production-ready."
```

**Paso 3: Troubleshooting con IA (10 min)**

💻 Simular problemas comunes:
```
Escenario 1: LCD no muestra nada

Prompt:
"Mi LCD I2C no muestra nada. Checklist de troubleshooting?"

[OpenCode da lista]:
1. Verificar dirección I2C (usar I2C scanner)
2. Verificar conexiones SDA/SCL
3. Ajustar contraste del LCD (potenciómetro en módulo I2C)
4. Verificar alimentación 5V
5. Testear con sketch simple de prueba

[Generar I2C scanner code]

---

Escenario 2: DHT22 siempre retorna NaN

Prompt:
"Mi DHT22 siempre retorna NaN. ¿Qué verifico?"

[OpenCode explica]:
- Resistor pull-up 10kΩ en data pin
- Delay en setup antes de primera lectura
- Pin correcto en código vs hardware
- Sensor puede estar defectuoso (probar con otro)
- Timing entre lecturas (mínimo 2 segundos)

[Código mejorado con más delay]
```

**Paso 4: Optimización y Features Adicionales (10 min)**

💻 Mejorar el proyecto:
```
Prompt:
"Mejora el código agregando:
1. Calibración automática al inicio
2. Promedios móviles para suavizar lecturas
3. Almacenamiento de máximos/mínimos diarios
4. Modo bajo consumo cuando no hay actividad

Mantén código modular y comentado."

[OpenCode genera versión mejorada]

[Mostrar diferencias clave]

"Con IA pueden iterar y mejorar proyectos rápidamente."
```

---

### 🔷 PARTE 3: IoT y ESP32 (25 minutos)

#### **19:00 - 19:25 (25 min) - Proyecto IoT con ESP32**

💻 **LIVE DEMO**: ESP32 con WiFi

**Proyecto: Monitor Remoto vía WiFi**

```
"Ahora subimos de nivel: ESP32 con conectividad WiFi.

Mismo sensor, pero ahora:
- Envía datos a cloud (ThingSpeak o similar)
- Control remoto via web interface
- OTA updates (update over-the-air)"
```

**Demo Rápida (condensada - 15 min)**

💻 OpenCode:
```
Prompt:
"Convierte el proyecto Arduino anterior para ESP32 con estas mejoras:

1. Conectividad WiFi (credentials via WiFiManager)
2. Envía datos a ThingSpeak cada 60 segundos
3. Web server simple para:
   - Ver datos en tiempo real
   - Ajustar thresholds remotamente
   - Control manual de ventilador (override)
4. MQTT para control IoT (opcional)

Genera:
- Código ESP32 completo
- HTML para web interface
- Instrucciones de setup

Usa:
- WiFiManager library
- ESP32 WebServer
- ThingSpeak API"

[OpenCode genera proyecto completo]

[Revisar partes clave]:

```cpp
// Key additions para ESP32:

#include <WiFi.h>
#include <WiFiManager.h>
#include <WebServer.h>
#include <HTTPClient.h>

// Web server en puerto 80
WebServer server(80);

// ThingSpeak config
const char* thingSpeakAPI = "YOUR_API_KEY";

void setup() {
  // ... código anterior ...
  
  // WiFi setup
  WiFiManager wm;
  wm.autoConnect("EnvMonitor_AP");
  
  Serial.print("Connected! IP: ");
  Serial.println(WiFi.localIP());
  
  // Setup web server routes
  server.on("/", handleRoot);
  server.on("/data", handleData);
  server.on("/control", handleControl);
  server.begin();
}

void loop() {
  server.handleClient(); // Handle web requests
  
  // ... resto del código ...
  
  // Send to ThingSpeak
  if (shouldSendToCloud()) {
    sendToThingSpeak(temperature, humidity);
  }
}

// Web interface HTML
const char* html = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <title>Monitor Ambiental</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: Arial; text-align: center; }
    .card { background: #f0f0f0; padding: 20px; margin: 10px; }
    .temp { color: #ff6b6b; font-size: 48px; }
    .hum { color: #4ecdc4; font-size: 48px; }
  </style>
</head>
<body>
  <h1>🌡️ Monitor Ambiental</h1>
  <div class="card">
    <h2>Temperatura</h2>
    <p class="temp" id="temp">--</p>
  </div>
  <div class="card">
    <h2>Humedad</h2>
    <p class="hum" id="hum">--</p>
  </div>
  <script>
    // Auto-refresh cada 5 segundos
    setInterval(()=>{
      fetch('/data')
        .then(r=>r.json())
        .then(d=>{
          document.getElementById('temp').innerText = d.temp + ' °C';
          document.getElementById('hum').innerText = d.hum + ' %';
        });
    }, 5000);
  </script>
</body>
</html>
)rawliteral";

void handleRoot() {
  server.send(200, "text/html", html);
}

void handleData() {
  String json = "{\"temp\":" + String(temperature) + 
                ",\"hum\":" + String(humidity) + "}";
  server.send(200, "application/json", json);
}
```

"¡Ahora tienen un dispositivo IoT completo!

Pueden:
- Ver datos desde celular
- Control remoto
- Integrar con home automation

Todo generado con IA en minutos."
```

**Simulación y Análisis (10 min)**

```
Prompt:
"Genera código Python para simular este sistema y graficar comportamiento.

Simula:
- Temperatura variando sinusoidalmente (18-32°C)
- Humedad random walk (40-80%)
- Comportamiento del relé según thresholds
- Graficar 24 horas de operación

Usa matplotlib."

[OpenCode genera script Python]

[Mostrar gráfico simulado si es posible]

"Así pueden testear lógica antes de armar hardware."
```

---

### 🔷 PARTE 4: Ejercicio + Q&A (15 minutos)

#### **19:25 - 19:37 (12 min) - Ejercicio Práctico**

**EJERCICIO**:
```
Elige según tu nivel:

Nivel 1 - Básico:
Pide a IA que te explique un protocolo (I2C, SPI, UART, etc.) que no 
entiendas bien. Comparte algo nuevo que aprendiste.

Nivel 2 - Intermedio:
Diseña un sistema simple (ej: sistema de riego automático) con IA.
Pide: lista de componentes, diagrama, y código básico.

Nivel 3 - Avanzado:
Toma un proyecto que estés haciendo y pide a IA que te ayude a 
optimizarlo (consumo de energía, memoria, o velocidad).

Tiempo: 12 minutos
```

---

#### **19:37 - 19:55 (18 min) - Compartir Resultados + Discusión**

```
[Leer ejemplos del chat]

[Discutir casos interesantes]

[Responder preguntas técnicas]
```

---

#### **19:55 - 20:00 (5 min) - Cierre**

**RESUMEN**:
```
Lo aprendimos:
✅ Generar código Arduino/ESP32
✅ Troubleshooting con IA
✅ Diseño de sistemas IoT
✅ Simulación y análisis
✅ Limitaciones de IA en hardware

⚠️ RECORDAR:
- IA para prototipado y aprendizaje
- Siempre validar seguridad
- No reemplaza fundamentos de ingeniería
```

**PRÓXIMA CLASE**:
```
📅 Clase 5 - Viernes
Ingeniería Aeronáutica

- Análisis de vuelo con IA
- Simulación aerodinámica
- Diseño asistido
- Optimización de estructuras

¡Nos vemos mañana!
```

---

_Creado para: Talleres de Verano FP-UNA 2026_
