# Módulo 01: Introducción a IA para Electrónica
## Herramientas y Configuración del Entorno

---

## Objetivos del Módulo

Al finalizar este módulo, serás capaz de:
- Identificar las principales herramientas de IA disponibles para ingeniería electrónica
- Configurar un entorno de desarrollo con asistentes de IA
- Formular prompts efectivos para tareas de electrónica
- Reconocer limitaciones y aspectos de seguridad

---

## 1. Panorama de Herramientas de IA

### 1.1 Herramientas de Generación de Código

| Herramienta | Descripción | Ideal para |
|-------------|-------------|------------|
| **GitHub Copilot** | Autocompletado en IDE | Código continuo |
| **Claude** | Generación y análisis | Explicaciones, debugging |
| **ChatGPT** | Generación general | Diseño, documentación |
| **Cursor** | IDE con IA integrada | Desarrollo completo |
| **Tabnine** | Autocompletado local | Privacidad, offline |

### 1.2 Aplicaciones en Electrónica

```
┌────────────────────────────────────────────────────────────┐
│                    APLICACIONES DE IA                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   DISEÑO     │  │ PROGRAMACIÓN │  │   ANÁLISIS   │     │
│  │              │  │              │  │              │     │
│  │ • Cálculos   │  │ • Firmware   │  │ • Señales    │     │
│  │ • Esquemas   │  │ • PLCs       │  │ • Datos      │     │
│  │ • PCB        │  │ • HMI        │  │ • Fallas     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ DOCUMENTACIÓN│  │   TESTING    │  │  APRENDIZAJE │     │
│  │              │  │              │  │              │     │
│  │ • BOM        │  │ • Test cases │  │ • Tutoriales │     │
│  │ • Manuales   │  │ • Debugging  │  │ • Conceptos  │     │
│  │ • Reportes   │  │ • Revisión   │  │ • Ejemplos   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 1.3 Casos de Uso Específicos

**Desarrollo Embebido:**
- Generación de drivers para sensores
- Código de comunicación (UART, I2C, SPI)
- Configuración de periféricos
- Manejo de interrupciones

**Automatización Industrial:**
- Lógica Ladder para PLCs
- Structured Text (IEC 61131-3)
- Configuración de HMI
- Scripts SCADA

**Procesamiento de Datos:**
- Análisis de señales
- Detección de anomalías
- Predicción de fallas
- Visualización

---

## 2. Configuración del Entorno

### 2.1 Instalación de VS Code + PlatformIO

```bash
# 1. Descargar VS Code desde code.visualstudio.com

# 2. Instalar extensión PlatformIO:
#    - Abrir VS Code
#    - Ctrl+Shift+X (Extensiones)
#    - Buscar "PlatformIO IDE"
#    - Instalar y reiniciar

# 3. Verificar instalación:
#    - Click en icono de hormiga (PlatformIO)
#    - Debería aparecer el Home de PlatformIO
```

### 2.2 Estructura de Proyecto PlatformIO

```
mi_proyecto/
├── .pio/                 # Build artifacts
├── include/              # Headers (.h)
├── lib/                  # Librerías privadas
├── src/                  # Código fuente
│   └── main.cpp          # Punto de entrada
├── test/                 # Unit tests
└── platformio.ini        # Configuración
```

### 2.3 Configuración Básica ESP32

```ini
; platformio.ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino

; Configuración de monitor
monitor_speed = 115200

; Librerías comunes
lib_deps =
    knolleary/PubSubClient@^2.8
    bblanchon/ArduinoJson@^6.21
```

### 2.4 GitHub Copilot (opcional)

```
1. Requisitos:
   - Cuenta GitHub
   - VS Code instalado

2. Instalación:
   - Extensiones → "GitHub Copilot"
   - Autenticar con GitHub

3. Uso básico:
   - Escribir comentario describiendo función
   - Tab para aceptar sugerencia
   - Ctrl+Enter para ver alternativas
```

---

## 3. Estructura de Prompts Efectivos

### 3.1 Anatomía de un Buen Prompt

```
┌─────────────────────────────────────────────────────────┐
│                    ESTRUCTURA DE PROMPT                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. CONTEXTO                                            │
│     ├── ¿Qué sistema/proceso?                           │
│     ├── ¿Qué plataforma/herramientas?                   │
│     └── ¿Qué conocimiento previo asumir?                │
│                                                          │
│  2. OBJETIVO                                            │
│     ├── ¿Qué quieres lograr?                            │
│     └── ¿Qué problema resuelve?                         │
│                                                          │
│  3. ESPECIFICACIONES                                    │
│     ├── Requisitos técnicos                             │
│     ├── Parámetros específicos                          │
│     └── Formato de entrada/salida                       │
│                                                          │
│  4. RESTRICCIONES                                       │
│     ├── ¿Qué NO debe hacer?                             │
│     ├── Limitaciones de recursos                        │
│     └── Compatibilidades requeridas                     │
│                                                          │
│  5. FORMATO DE SALIDA                                   │
│     ├── ¿Código completo o fragmento?                   │
│     ├── ¿Con comentarios?                               │
│     └── ¿Documentación adicional?                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Ejemplo: Prompt Malo vs Bueno

**Prompt Malo:**
```
Hazme código para ESP32 con sensor de temperatura
```

**Prompt Bueno:**
```
Genera código para ESP32 que lea temperatura con DS18B20:

HARDWARE:
- ESP32 DevKit v1
- Sensor DS18B20 conectado a GPIO4
- Resistor pull-up de 4.7kΩ

REQUISITOS:
- Leer temperatura cada 5 segundos
- Mostrar por Serial Monitor
- Manejar errores de lectura
- Comentarios en español

PLATAFORMA: PlatformIO con framework Arduino

GENERAR: Código completo de main.cpp y platformio.ini
```

### 3.3 Plantillas de Prompts para Electrónica

**Para generar código de sensor:**
```
Genera código [PLATAFORMA] para leer sensor [MODELO]:

CONEXIÓN:
- Pin de datos: GPIO[X]
- Protocolo: [I2C/SPI/OneWire/Analog]
- Alimentación: [Voltaje]V

REQUISITOS:
- [Frecuencia de lectura]
- [Formato de salida]
- [Manejo de errores]
- [Calibración si aplica]

INCLUIR:
- Código completo y funcional
- Comentarios explicativos
- Ejemplo de uso en loop()
```

**Para diseñar circuito:**
```
Calcula componentes para circuito [TIPO]:

ESPECIFICACIONES:
- Entrada: [Voltaje/Corriente]
- Salida: [Voltaje/Corriente]
- Precisión: [Tolerancia]

RESTRICCIONES:
- Componentes serie E24
- Temperatura: [Rango]
- Costo: [Limitación]

GENERAR:
- Esquemático ASCII
- Lista de componentes
- Cálculos justificados
```

---

## 4. Limitaciones y Seguridad

### 4.1 Qué la IA Hace Bien

- Generar código boilerplate
- Explicar conceptos
- Sugerir soluciones estándar
- Documentar código existente
- Debugging de errores comunes
- Traducir entre lenguajes

### 4.2 Qué la IA NO Hace Bien

- Garantizar código sin errores
- Conocer tu hardware específico
- Optimizar para tu caso particular
- Diseño de seguridad crítica (SIL/PL)
- Cálculos de potencia precisos
- Información posterior a su entrenamiento

### 4.3 Validación de Código Generado

```
┌──────────────────────────────────────────────────────────┐
│              CHECKLIST DE VALIDACIÓN                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  □ ¿Compila sin errores?                                │
│  □ ¿Ejecuta sin excepciones?                            │
│  □ ¿Los pines corresponden a tu hardware?               │
│  □ ¿Las bibliotecas están instaladas?                   │
│  □ ¿Los cálculos son correctos?                         │
│  □ ¿Maneja casos de error?                              │
│  □ ¿Los valores están en rangos seguros?                │
│  □ ¿Entiendes cada línea de código?                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 4.4 Consideraciones de Seguridad Industrial

**Nunca usar IA sin revisión para:**
- Sistemas de seguridad (E-stops, interlocks)
- Control de procesos críticos
- Código de protección de equipos
- Sistemas con riesgo para personas

**Siempre verificar:**
- Límites de variables
- Timeouts de comunicación
- Valores por defecto seguros
- Comportamiento ante fallos

---

## 5. Primer Proyecto: "Hola Mundo" con IA

### 5.1 Ejercicio Guiado

Vamos a generar nuestro primer código usando IA:

**Paso 1: Formular el prompt**
```
Genera código para ESP32 que haga parpadear un LED:

HARDWARE:
- ESP32 DevKit v1
- LED integrado en GPIO2

SECUENCIA:
- Encender 500ms
- Apagar 500ms
- Repetir indefinidamente

REQUISITOS:
- Usar framework Arduino
- Comentarios en español
- Sin bibliotecas externas

GENERAR: Código completo para PlatformIO
```

**Paso 2: Revisar respuesta de IA**

La IA debería generar algo como:

```cpp
// main.cpp - Parpadeo de LED en ESP32
// Demuestra control básico de GPIO

// Pin del LED integrado
const int LED_PIN = 2;

// Tiempos de encendido/apagado en milisegundos
const int TIEMPO_ON = 500;
const int TIEMPO_OFF = 500;

void setup() {
    // Configurar pin como salida
    pinMode(LED_PIN, OUTPUT);

    // Inicializar Serial para debug
    Serial.begin(115200);
    Serial.println("Iniciando parpadeo de LED...");
}

void loop() {
    // Encender LED
    digitalWrite(LED_PIN, HIGH);
    Serial.println("LED: ON");
    delay(TIEMPO_ON);

    // Apagar LED
    digitalWrite(LED_PIN, LOW);
    Serial.println("LED: OFF");
    delay(TIEMPO_OFF);
}
```

**Paso 3: Validar y probar**
1. Crear proyecto PlatformIO
2. Copiar código a `src/main.cpp`
3. Compilar (checkmark en PlatformIO)
4. Subir a ESP32 (flecha derecha)
5. Verificar funcionamiento

---

## 6. Mejores Prácticas

### 6.1 Iteración de Prompts

```
PRIMER INTENTO:
  ↓
EVALUAR RESULTADO
  ↓
┌─────────────────┐
│ ¿Es correcto?   │
│                 │
│  SÍ → Terminar  │
│                 │
│  NO → Refinar   │
│        prompt   │
└─────────────────┘
  ↓
AGREGAR DETALLES:
- "Falta manejo de X"
- "Cambiar formato a Y"
- "El error es Z"
  ↓
NUEVO INTENTO
```

### 6.2 Documentar Prompts Exitosos

Mantener un archivo con prompts que funcionaron bien:

```markdown
# Mi Biblioteca de Prompts

## Sensor de Temperatura
**Fecha:** 2024-01-15
**Prompt:** [Pegar prompt]
**Resultado:** Código funcional
**Notas:** Funciona mejor con contexto de alimentación

## Comunicación MQTT
**Fecha:** 2024-01-16
**Prompt:** [Pegar prompt]
...
```

### 6.3 Combinar Herramientas

```
┌──────────────────────────────────────────────────────┐
│                FLUJO DE TRABAJO ÓPTIMO               │
│                                                      │
│   CLAUDE/CHATGPT          GITHUB COPILOT            │
│   ┌────────────┐          ┌────────────┐            │
│   │ Diseño     │          │ Completar  │            │
│   │ inicial    │ ───────► │ código     │            │
│   │ y análisis │          │ en IDE     │            │
│   └────────────┘          └────────────┘            │
│         │                       │                   │
│         ▼                       ▼                   │
│   ┌────────────────────────────────────┐           │
│   │     CÓDIGO FUNCIONAL VALIDADO      │           │
│   └────────────────────────────────────┘           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Resumen

En este módulo aprendimos:

1. **Herramientas disponibles**: Copilot, Claude, ChatGPT, Cursor
2. **Configuración**: VS Code + PlatformIO + extensiones
3. **Prompts efectivos**: Contexto + Objetivo + Especificaciones + Restricciones + Formato
4. **Limitaciones**: La IA es asistente, no reemplazo del ingeniero
5. **Validación**: Siempre revisar y probar código generado

### Próximo Módulo

En el Módulo 02 aplicaremos estos conceptos para desarrollar código de microcontroladores con comunicación IoT.

---

*Módulo 01 - IA para Electrónica y Automatización*
*Duración: 2 horas*
