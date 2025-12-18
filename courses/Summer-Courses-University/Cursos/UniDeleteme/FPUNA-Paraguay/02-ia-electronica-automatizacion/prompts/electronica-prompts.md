# Biblioteca de Prompts
## IA para Electrónica y Automatización Industrial

Esta biblioteca contiene prompts probados y optimizados para usar con Claude, ChatGPT u otros LLMs durante el trabajo en electrónica y automatización.

---

## Índice

1. [Microcontroladores y Firmware](#1-microcontroladores-y-firmware)
2. [Procesamiento de Señales](#2-procesamiento-de-señales)
3. [Diseño de Circuitos](#3-diseño-de-circuitos)
4. [Programación de PLCs](#4-programación-de-plcs)
5. [SCADA y HMI](#5-scada-y-hmi)
6. [Mantenimiento Predictivo](#6-mantenimiento-predictivo)
7. [IoT Industrial](#7-iot-industrial)
8. [Debugging y Solución de Problemas](#8-debugging-y-solución-de-problemas)

---

## 1. Microcontroladores y Firmware

### 1.1 Generación de Código ESP32/Arduino

```
Genera código para ESP32 con las siguientes especificaciones:

FUNCIONALIDAD: [Describir qué debe hacer]

HARDWARE:
- Microcontrolador: ESP32 DevKit v1
- Sensores: [Lista de sensores con pines]
- Actuadores: [Lista de actuadores con pines]
- Comunicación: [WiFi/BLE/MQTT/etc]

REQUISITOS:
- [ ] Inicialización robusta con verificación de errores
- [ ] Reconexión automática WiFi/MQTT
- [ ] Watchdog timer habilitado
- [ ] Deep sleep si aplica (intervalo: X segundos)
- [ ] OTA updates habilitados
- [ ] Logging por Serial

ESTRUCTURA DE CÓDIGO:
- config.h para credenciales y pines
- Clases separadas para cada sensor
- Loop no bloqueante (millis)

FORMATO DE SALIDA:
- Código completo y compilable
- Comentarios en español
- platformio.ini incluido
```

### 1.2 Optimización de Consumo Energético

```
Optimiza el siguiente código ESP32 para bajo consumo:

CÓDIGO ACTUAL:
[Pegar código]

OBJETIVO:
- Reducir consumo en modo activo
- Implementar deep sleep entre lecturas
- Despertar por timer cada X minutos
- Despertar por interrupción si [condición]

RESTRICCIONES:
- Mantener funcionalidad actual
- No perder datos de sensores
- Mantener comunicación MQTT

GENERAR:
- Código optimizado
- Estimación de consumo antes/después
- Cálculo de duración de batería (3.7V, 2000mAh)
```

### 1.3 Driver para Sensor Específico

```
Genera driver/biblioteca para sensor [NOMBRE]:

DATASHEET: [URL o especificaciones clave]

INTERFAZ: [I2C/SPI/OneWire/Analog]

FUNCIONES REQUERIDAS:
- begin(): Inicializar sensor
- read(): Leer valor principal
- readRaw(): Leer valor sin procesar
- calibrate(): Calibración de offset/ganancia
- selfTest(): Verificar funcionamiento

INCLUIR:
- Manejo de errores con códigos de retorno
- Timeout para comunicación
- Valores por defecto seguros
- Ejemplo de uso

PLATAFORMA: [Arduino/ESP-IDF/MicroPython]
```

---

## 2. Procesamiento de Señales

### 2.1 Análisis FFT de Vibración

```
Genera código Python para análisis de vibración:

SEÑAL DE ENTRADA:
- Tipo: Aceleración de vibración
- Frecuencia muestreo: [X] Hz
- Duración captura: [X] segundos
- Formato: CSV con columnas [timestamp, x, y, z]

ANÁLISIS REQUERIDO:
1. FFT de cada eje
2. Frecuencias dominantes (top 5)
3. RMS de vibración
4. Detección de picos (bandas de rodamientos)
5. Tendencia temporal

BANDAS DE FRECUENCIA:
- BPFO (defecto pista externa): [X] Hz
- BPFI (defecto pista interna): [X] Hz
- BSF (defecto elemento rodante): [X] Hz
- FTF (defecto jaula): [X] Hz

SALIDA:
- Gráficos: Señal temporal, espectro FFT, espectrograma
- Reporte: Valores RMS, picos detectados, diagnóstico
- Formato exportable (PDF/HTML)
```

### 2.2 Filtrado de Señales

```
Diseña filtro digital para señal industrial:

SEÑAL:
- Tipo: [Temperatura/Presión/Corriente/etc]
- Frecuencia muestreo: [X] Hz
- Ruido presente: [60Hz, spikes, ruido blanco, etc]

OBJETIVO:
- Eliminar ruido de [X] Hz
- Mantener dinámica de proceso (constante tiempo ~X segundos)
- Minimizar retardo de fase

GENERAR:
1. Tipo de filtro recomendado (Butterworth, Chebyshev, etc)
2. Parámetros (orden, frecuencia corte)
3. Código Python con scipy.signal
4. Comparación señal original vs filtrada
5. Respuesta en frecuencia del filtro
```

### 2.3 Detección de Anomalías en Series Temporales

```
Implementa detector de anomalías para datos de sensores:

DATOS:
- Variables: [Lista de variables]
- Frecuencia: [X muestras/segundo]
- Histórico disponible: [X días]

TIPOS DE ANOMALÍAS A DETECTAR:
- [ ] Outliers puntuales (picos)
- [ ] Drift gradual
- [ ] Cambio de nivel (level shift)
- [ ] Cambio de varianza
- [ ] Patrones inusuales

MÉTODOS A COMPARAR:
1. Estadístico (Z-score, IQR)
2. Isolation Forest
3. One-Class SVM
4. LSTM Autoencoder (si hay suficientes datos)

SALIDA:
- Código de detección
- Umbral óptimo para cada método
- Comparación de rendimiento (precision, recall)
- Visualización de anomalías detectadas
```

---

## 3. Diseño de Circuitos

### 3.1 Cálculo de Componentes

```
Calcula componentes para circuito [TIPO]:

ESPECIFICACIONES:
- Voltaje entrada: [X] V (DC/AC)
- Voltaje salida: [X] V
- Corriente máxima: [X] mA
- Ripple máximo: [X] mV
- Regulación de carga: [X] %

RESTRICCIONES:
- Componentes serie E24 estándar
- Temperatura ambiente: [X] °C
- Eficiencia mínima: [X] %

GENERAR:
1. Esquemático ASCII del circuito
2. Lista de componentes con valores
3. Cálculos paso a paso
4. Análisis térmico (disipadores necesarios)
5. BOM con part numbers sugeridos
```

### 3.2 Interfaz de Sensores

```
Diseña circuito de interfaz para sensor:

SENSOR: [Nombre/modelo]
SALIDA SENSOR: [4-20mA / 0-10V / resistivo / etc]

MICROCONTROLADOR: [ESP32 / STM32 / Arduino]
ADC: [Resolución bits, voltaje referencia]

REQUISITOS:
- Protección contra sobretensión
- Aislamiento galvánico: [Sí/No]
- Filtrado antialiasing
- Precisión requerida: [X] %

GENERAR:
1. Esquemático del circuito de interfaz
2. Cálculo de resistencias/componentes
3. Código de lectura y conversión a unidades físicas
4. Procedimiento de calibración
```

### 3.3 Análisis de PCB

```
Revisa el diseño de PCB para sistema industrial:

DESCRIPCIÓN: [Qué hace el circuito]
AMBIENTE: [Industrial, humedad X%, temp X°C]

CHECKLIST A VERIFICAR:
- [ ] Separación de tierras (analog/digital/potencia)
- [ ] Ancho de pistas para corriente
- [ ] Disipación térmica
- [ ] Inmunidad a EMI
- [ ] Protección ESD
- [ ] Clearance para voltajes presentes
- [ ] Ubicación de conectores

ARCHIVOS:
[Descripción o imagen del layout]

GENERAR:
- Lista de problemas detectados
- Sugerencias de mejora
- Verificación de normas (IPC-2221)
```

---

## 4. Programación de PLCs

### 4.1 Generación de Ladder Logic

```
Genera lógica Ladder para secuencia industrial:

PLATAFORMA: [Siemens S7-1200 / Allen-Bradley / etc]

SECUENCIA:
1. [Paso 1 - condiciones y acciones]
2. [Paso 2 - condiciones y acciones]
...

ENTRADAS:
- [I0.0] [Nombre] [Descripción]
- [I0.1] ...

SALIDAS:
- [Q0.0] [Nombre] [Descripción]
- [Q0.1] ...

REQUISITOS:
- Modo AUTO/MANUAL
- Botón de emergencia
- Indicadores de estado
- Timeout por paso

GENERAR:
- Diagrama Ladder en formato ASCII
- Lista de variables/tags
- Descripción de cada rung
- Pruebas FAT sugeridas
```

### 4.2 Código Structured Text para Control

```
Genera código Structured Text (IEC 61131-3):

FUNCIÓN: [Control PID / Secuenciador / Cálculo / etc]

ESPECIFICACIONES:
[Describir comportamiento esperado]

VARIABLES DE ENTRADA:
- [Nombre]: [Tipo] - [Descripción]

VARIABLES DE SALIDA:
- [Nombre]: [Tipo] - [Descripción]

ESTÁNDARES:
- Nombrado según [estándar de la empresa/ISA]
- Comentarios en [español/inglés]
- Estructura modular (funciones/bloques)

GENERAR:
- Código ST completo
- Declaración de variables
- Comentarios explicativos
- Casos de prueba
```

### 4.3 Diagnóstico de Fallos PLC

```
Analiza el siguiente problema de PLC:

SÍNTOMAS:
[Describir comportamiento observado]

PROGRAMA:
[Pegar código o descripción de lógica]

HARDWARE:
- PLC: [Modelo]
- Módulos: [Lista]
- Sensores/Actuadores: [Lista]

DIAGNÓSTICOS REALIZADOS:
[Qué ya verificaste]

AYÚDAME A:
1. Identificar posibles causas (orden de probabilidad)
2. Pasos de diagnóstico adicionales
3. Soluciones para cada causa
4. Prevención futura
```

---

## 5. SCADA y HMI

### 5.1 Diseño de Pantalla HMI

```
Diseña pantalla HMI para [proceso]:

PLATAFORMA: [WinCC / FactoryTalk / Ignition / etc]
RESOLUCIÓN: [1920x1080 / 1280x800 / etc]

ELEMENTOS DEL PROCESO:
[Describir equipos, instrumentos, variables]

REQUISITOS:
- Estándar ISA-101 (High Performance)
- Navegación máximo 3 clics
- Alarmas visibles
- Tendencias accesibles

GENERAR:
1. Layout ASCII con zonas
2. Lista de elementos por zona
3. Tabla de colores por estado
4. Configuración de alarmas
5. Scripts de navegación
```

### 5.2 Configuración de Alarmas

```
Configura sistema de alarmas para planta:

VARIABLES A MONITOREAR:
| Variable | Rango Normal | Unidad |
|----------|--------------|--------|
| [Var1]   | [X - Y]      | [U]    |
...

PRIORIDADES:
- P1 (Crítica): Riesgo de seguridad
- P2 (Alta): Puede causar daño a equipos
- P3 (Media): Afecta producción
- P4 (Baja): Informativa

GENERAR PARA CADA VARIABLE:
- Setpoints: LL, L, H, HH
- Deadband (histéresis)
- Delay (evitar chattering)
- Prioridad asignada
- Mensaje de alarma
- Acción recomendada
```

### 5.3 Scripts SCADA

```
Genera script para SCADA [plataforma]:

FUNCIONALIDAD:
[Describir qué debe hacer el script]

TRIGGERS:
- [Evento que dispara el script]

VARIABLES DISPONIBLES:
[Lista de tags accesibles]

ACCIONES REQUERIDAS:
1. [Acción 1]
2. [Acción 2]
...

INCLUIR:
- Validación de permisos
- Confirmación de acciones críticas
- Logging de eventos
- Manejo de errores

LENGUAJE: [VBA / C# / Python / JavaScript]
```

---

## 6. Mantenimiento Predictivo

### 6.1 Modelo de Clasificación de Fallas

```
Desarrolla modelo ML para clasificación de fallas:

EQUIPO: [Tipo de equipo]

CLASES A DETECTAR:
1. Normal
2. [Falla tipo 1]
3. [Falla tipo 2]
...

FEATURES DISPONIBLES:
[Lista de variables de sensores]

DATOS:
- Muestras totales: [X]
- Distribución de clases: [%]
- Frecuencia de muestreo: [X Hz]

REQUISITOS:
- Recall para fallas >= 95%
- Precision >= 85%
- Tiempo de inferencia < 100ms

GENERAR:
1. Pipeline de preprocesamiento
2. Selección/ingeniería de features
3. Comparación de modelos (RF, XGBoost, SVM)
4. Código de entrenamiento
5. Código de inferencia para producción
6. Métricas de evaluación
```

### 6.2 Estimación de Vida Útil (RUL)

```
Implementa modelo de predicción de RUL:

EQUIPO: [Tipo]
MODO DE FALLA: [Describir degradación]

DATOS HISTÓRICOS:
- Unidades con falla registrada: [X]
- Variables monitoreadas: [Lista]
- Frecuencia de datos: [X por día/hora]

ENFOQUE SUGERIDO:
1. Modelo de degradación física (si conocido)
2. Regresión con features de degradación
3. LSTM para series temporales

SALIDA REQUERIDA:
- RUL en días/horas
- Intervalo de confianza
- Probabilidad de falla en próximos N días

GENERAR:
- Código de entrenamiento
- Código de predicción
- Visualización de degradación
- Integración con sistema de alertas
```

### 6.3 ROI de Mantenimiento Predictivo

```
Calcula ROI para implementar mantenimiento predictivo:

SITUACIÓN ACTUAL:
- Paradas no programadas/año: [X]
- Costo promedio por parada: $[X]
- Costo mantenimiento preventivo/año: $[X]

SOLUCIÓN PROPUESTA:
- Sensores: [Cantidad y tipo]
- Software: [Licencias/desarrollo]
- Integración: [Horas estimadas]
- Capacitación: [Horas]

BENEFICIOS ESPERADOS:
- Reducción paradas: [X]%
- Extensión vida útil: [X]%
- Optimización inventario: [X]%

GENERAR:
1. Tabla de costos de inversión
2. Tabla de beneficios anuales
3. Flujo de caja a 5 años
4. ROI, VAN, TIR, Payback
5. Análisis de sensibilidad
```

---

## 7. IoT Industrial

### 7.1 Arquitectura de Sistema IoT

```
Diseña arquitectura IoT para [aplicación]:

DISPOSITIVOS EDGE:
- Cantidad: [X]
- Ubicación: [Descripción]
- Conectividad: [WiFi/LoRa/Cellular/Ethernet]

DATOS:
- Variables por dispositivo: [X]
- Frecuencia de envío: [X por segundo/minuto]
- Volumen diario: [X MB/GB]

REQUISITOS:
- Latencia máxima: [X ms]
- Disponibilidad: [99.X%]
- Retención de datos: [X días/meses]
- Seguridad: [Encriptación, autenticación]

GENERAR:
1. Diagrama de arquitectura
2. Selección de protocolos (MQTT, HTTP, etc)
3. Diseño de base de datos
4. Stack tecnológico recomendado
5. Estimación de costos cloud
```

### 7.2 Protocolo MQTT para Industria

```
Diseña estructura MQTT para sistema industrial:

DISPOSITIVOS:
[Lista de dispositivos y sus datos]

REQUISITOS:
- Estructura jerárquica de tópicos
- QoS apropiado por tipo de dato
- Mensajes de estado (LWT)
- Retención de últimos valores

GENERAR:
1. Árbol de tópicos
2. Formato JSON de cada mensaje
3. Tabla de QoS por tópico
4. Configuración de broker
5. Código cliente (Python o C)
```

### 7.3 Dashboard Industrial

```
Genera dashboard para monitoreo industrial:

PLATAFORMA: [Grafana / Streamlit / Node-RED / etc]

MÉTRICAS A MOSTRAR:
[Lista de KPIs y variables]

VISUALIZACIONES:
- Tiempo real: [Qué mostrar]
- Histórico: [Qué tendencias]
- Alertas: [Qué notificar]

USUARIOS:
- Operadores: [Qué ven/hacen]
- Supervisores: [Qué ven/hacen]
- Gerencia: [Qué ven/hacen]

GENERAR:
1. Layout de pantallas
2. Código/configuración del dashboard
3. Queries para base de datos
4. Configuración de alertas
5. Roles y permisos
```

---

## 8. Debugging y Solución de Problemas

### 8.1 Diagnóstico de Firmware

```
Ayúdame a debuggear este problema:

PLATAFORMA: [ESP32 / Arduino / STM32]

SÍNTOMA:
[Describir comportamiento inesperado]

CÓDIGO RELEVANTE:
[Pegar sección de código]

HARDWARE:
[Describir conexiones]

LO QUE YA PROBÉ:
1. [Intento 1]
2. [Intento 2]

LOGS/OUTPUT:
[Pegar mensajes de Serial Monitor]

AYÚDAME A:
1. Identificar la causa probable
2. Sugerir pruebas de diagnóstico
3. Proponer solución
```

### 8.2 Análisis de Datos Anómalos

```
Analiza estos datos que parecen incorrectos:

CONTEXTO:
- Variable: [Qué se mide]
- Sensor: [Tipo]
- Proceso: [Descripción]

DATOS:
[Pegar datos o describir patrón]

COMPORTAMIENTO ESPERADO:
[Qué debería verse]

COMPORTAMIENTO OBSERVADO:
[Qué se ve]

POSIBLES CAUSAS A CONSIDERAR:
- Hardware: [Sensor, cableado, ADC]
- Software: [Código, configuración]
- Proceso: [Condiciones operativas]
- Ambiente: [Temperatura, EMI, etc]

AYÚDAME A:
1. Determinar si es problema de sensor o proceso
2. Identificar causa raíz
3. Proponer solución
```

### 8.3 Optimización de Rendimiento

```
Optimiza el rendimiento de este código:

PLATAFORMA: [ESP32 / Python / etc]

CÓDIGO ACTUAL:
[Pegar código]

PROBLEMA:
- Tiempo de ejecución actual: [X ms]
- Objetivo: [Y ms]
- Uso de memoria: [X KB]
- Objetivo memoria: [Y KB]

RESTRICCIONES:
- No cambiar funcionalidad
- Mantener legibilidad
- Compatibilidad con [versión/hardware]

GENERAR:
1. Código optimizado
2. Explicación de cambios
3. Métricas antes/después
4. Trade-offs (si hay)
```

---

## Consejos de Uso

### Mejores Prácticas

1. **Sé específico**: Incluye modelos exactos, versiones, y restricciones
2. **Proporciona contexto**: El dominio industrial tiene requisitos únicos
3. **Itera**: Usa las respuestas como punto de partida y refina
4. **Verifica**: Siempre valida código generado antes de usar en producción
5. **Documenta**: Guarda prompts exitosos para reutilizar

### Estructura Recomendada

```
1. CONTEXTO: Qué sistema/proceso
2. OBJETIVO: Qué quieres lograr
3. ESPECIFICACIONES: Requisitos técnicos
4. RESTRICCIONES: Limitaciones a respetar
5. FORMATO: Cómo quieres la respuesta
```

### Iteración Efectiva

```
PROMPT INICIAL: [Tu primer intento]

RESPUESTA RECIBIDA: [Resumen de lo que obtuviste]

AJUSTE NECESARIO:
- Lo que falta: [X]
- Lo que sobra: [Y]
- Lo que debe cambiar: [Z]

NUEVA SOLICITUD: [Prompt refinado]
```

---

*Biblioteca de Prompts - IA para Electrónica y Automatización*
*FPUNA Paraguay - Curso de Verano*
