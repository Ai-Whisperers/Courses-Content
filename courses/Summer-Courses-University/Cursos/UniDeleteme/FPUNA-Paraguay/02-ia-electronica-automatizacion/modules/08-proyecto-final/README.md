# Módulo 08: Proyecto Final Integrador
## Sistema IoT Industrial con IA

---

## Descripción del Proyecto

En este módulo final, integrarás todos los conocimientos adquiridos durante el curso para desarrollar un sistema IoT industrial completo que monitorea, analiza y predice el comportamiento de un proceso industrial.

**Duración:** 2 horas
**Tipo:** Proyecto integrador
**Modalidad:** Individual o equipos de 2-3 personas

---

## Objetivo General

Diseñar e implementar un sistema de monitoreo industrial inteligente que:
1. Adquiera datos de sensores (real o simulado)
2. Transmita datos vía protocolo industrial
3. Visualice en dashboard tipo SCADA
4. Aplique algoritmos de ML para detección de anomalías
5. Genere alertas predictivas

---

## Opciones de Proyecto

### Opción A: Sistema de Monitoreo de Motor Eléctrico

```
┌─────────────────────────────────────────────────────────────────┐
│                    MOTOR TRIFÁSICO 10 HP                        │
│                                                                  │
│   ┌────────────┐    ┌────────────┐    ┌────────────┐           │
│   │    L1      │    │    L2      │    │    L3      │           │
│   │   ▼I1      │    │   ▼I2      │    │   ▼I3      │           │
│   └─────┬──────┘    └─────┬──────┘    └─────┬──────┘           │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           ▼                                     │
│                    ┌──────────────┐                             │
│                    │              │                             │
│                    │    MOTOR     │──► [RPM] Velocidad         │
│                    │              │──► [T] Temperatura         │
│                    │   ○ ○ ○ ○    │──► [V] Vibración           │
│                    │              │                             │
│                    └──────────────┘                             │
│                           │                                     │
│                    ┌──────┴──────┐                             │
│                    │    CARGA    │                             │
│                    │ (Compresor) │                             │
│                    └─────────────┘                             │
└─────────────────────────────────────────────────────────────────┘

SENSORES REQUERIDOS:
- 3x Corriente (transformador de corriente o ACS712)
- 1x Temperatura (PT100 o termistor)
- 1x Vibración (ADXL345 o MPU6050)
- 1x RPM (sensor inductivo o encoder)
```

**Variables a monitorear:**
| Variable | Sensor | Rango Normal | Alarma |
|----------|--------|--------------|--------|
| I_L1, I_L2, I_L3 | CT/ACS712 | 10-15 A | >18 A |
| Temperatura | PT100 | 40-65°C | >80°C |
| Vibración RMS | ADXL345 | 0-4 mm/s | >7 mm/s |
| RPM | Encoder | 1750±50 | <1650 |
| Desbalance corriente | Calculado | <5% | >10% |

---

### Opción B: Sistema de Control de Nivel de Tanques

```
        ┌─────────────────────────────────────────────┐
        │              TANQUE SUPERIOR                 │
        │         ┌───────────────────┐               │
        │         │   ████████████    │ ←── [L1] Nivel│
        │         │   ████████████    │               │
        │         │   ████████████    │ ←── [T1] Temp │
        │         └────────┬──────────┘               │
        │                  │                          │
        │            ╔═════╧═════╗                    │
        │            ║  VÁLVULA  ║ ←── [V1] Posición  │
        │            ╚═════╤═════╝                    │
        │                  │                          │
        │                  ▼                          │
        │         ┌───────────────────┐               │
        │         │                   │               │
        │         │   ░░░░░░░░░░░░    │ ←── [L2] Nivel│
        │         │   ░░░░░░░░░░░░    │               │
        │         │                   │ ←── [T2] Temp │
        │         └────────┬──────────┘               │
        │              TANQUE INFERIOR                │
        │                  │                          │
        │            ╔═════╧═════╗                    │
        │            ║  BOMBA    ║ ←── [P1] Estado    │
        │            ╚═════╤═════╝    [Q] Caudal      │
        │                  │                          │
        │                  ▼                          │
        │              RECIRCULACIÓN                  │
        └─────────────────────────────────────────────┘
```

**Variables a monitorear:**
| Variable | Sensor | Rango Normal | Alarma |
|----------|--------|--------------|--------|
| L1 (Superior) | Ultrasónico | 20-80% | <10%, >90% |
| L2 (Inferior) | Ultrasónico | 20-80% | <10%, >90% |
| T1, T2 | DS18B20 | 20-40°C | >50°C |
| V1 Posición | Potenciómetro | 0-100% | - |
| Q Caudal | YF-S201 | 0-30 L/min | <5 L/min |

---

### Opción C: Estación Meteorológica Industrial

```
        ┌─────────────────────────────────────────────┐
        │          ESTACIÓN METEOROLÓGICA             │
        │                                             │
        │         ☀️ [SOLAR] Radiación                │
        │              │                              │
        │         ┌────┴────┐                         │
        │         │  Panel  │ ←── [V] Voltaje Panel  │
        │         └────┬────┘     [I] Corriente      │
        │              │                              │
        │    💨 ←── [VIENTO] Velocidad/Dirección     │
        │              │                              │
        │    🌡️ ←── [TEMP] Temperatura Ambiente      │
        │              │                              │
        │    💧 ←── [HUM] Humedad Relativa           │
        │              │                              │
        │    🌧️ ←── [LLUVIA] Precipitación          │
        │              │                              │
        │    📊 ←── [PRES] Presión Atmosférica       │
        │                                             │
        └─────────────────────────────────────────────┘
```

**Variables a monitorear:**
| Variable | Sensor | Rango Típico | Uso |
|----------|--------|--------------|-----|
| Temperatura | BME280 | -10 a 45°C | Predicción |
| Humedad | BME280 | 20-95% RH | Confort |
| Presión | BME280 | 990-1030 hPa | Pronóstico |
| Viento | Anemómetro | 0-120 km/h | Seguridad |
| Radiación | BH1750 | 0-65535 lux | Solar |
| Lluvia | Pluviómetro | 0-50 mm/h | Riego |

---

## Arquitectura del Sistema

### Diagrama de Bloques

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ARQUITECTURA IoT INDUSTRIAL                   │
│                                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│  │   SENSORES  │    │    EDGE     │    │   GATEWAY   │             │
│  │             │    │   DEVICE    │    │             │             │
│  │ • Temp      │    │             │    │ • MQTT      │             │
│  │ • Vibración │───►│  ESP32/     │───►│   Broker    │             │
│  │ • Corriente │    │  Arduino    │    │ • Protocol  │             │
│  │ • Nivel     │    │             │    │   Bridge    │             │
│  └─────────────┘    └─────────────┘    └──────┬──────┘             │
│                                               │                     │
│                                               │ MQTT/HTTP           │
│                                               ▼                     │
│                     ┌─────────────────────────────────────┐        │
│                     │           SERVIDOR/CLOUD             │        │
│                     │                                      │        │
│                     │  ┌──────────┐    ┌──────────┐       │        │
│                     │  │ InfluxDB │    │  Python  │       │        │
│                     │  │ TimeSeries│◄──►│   ML     │       │        │
│                     │  │    DB    │    │  Engine  │       │        │
│                     │  └──────────┘    └──────────┘       │        │
│                     │        │              │              │        │
│                     │        ▼              ▼              │        │
│                     │  ┌─────────────────────────┐        │        │
│                     │  │      DASHBOARD          │        │        │
│                     │  │  (Grafana/Streamlit)    │        │        │
│                     │  │  • Visualización        │        │        │
│                     │  │  • Alertas             │        │        │
│                     │  │  • Reportes            │        │        │
│                     │  └─────────────────────────┘        │        │
│                     └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Componentes del Proyecto

### 1. Firmware ESP32/Arduino (Módulo 02)

Solicita a la IA:

```
Genera firmware ESP32 para monitoreo industrial:

PROYECTO: [Opción A/B/C seleccionada]

SENSORES:
[Lista de sensores según opción]

COMUNICACIÓN:
- WiFi con reconexión automática
- MQTT con QoS 1
- JSON estructurado

FUNCIONALIDADES:
- Lectura periódica (1 segundo)
- Filtrado de señales (media móvil)
- Detección de anomalías local (umbral)
- Deep sleep si aplica
- OTA updates

ESTRUCTURA:
- config.h (credenciales, pines)
- sensors.h/cpp (clases de sensores)
- mqtt_handler.h/cpp (comunicación)
- main.cpp (loop principal)

GENERAR: Código completo y documentado
```

### 2. Backend de Procesamiento (Módulo 03, 07)

Solicita a la IA:

```
Genera backend Python para procesamiento de datos IoT:

FUNCIONALIDADES:
1. Suscriptor MQTT que recibe datos de sensores
2. Almacenamiento en base de datos time-series
3. Pipeline de preprocesamiento
4. Modelo de detección de anomalías (Isolation Forest)
5. Clasificador de estado (si aplica)
6. API REST para consultas
7. Sistema de alertas

TECNOLOGÍAS:
- paho-mqtt para MQTT
- InfluxDB o SQLite para almacenamiento
- scikit-learn para ML
- FastAPI para API REST

ESTRUCTURA:
backend/
├── mqtt_subscriber.py
├── data_processor.py
├── ml_engine.py
├── api.py
├── alert_service.py
└── config.yaml

GENERAR: Código modular y documentado
```

### 3. Dashboard de Visualización (Módulo 06)

Solicita a la IA:

```
Genera dashboard para monitoreo IoT industrial:

PLATAFORMA: Streamlit (más simple) o Grafana (más profesional)

COMPONENTES:
1. Vista general con estado de todos los sensores
2. Gráficos en tiempo real (últimos 5 minutos)
3. Tendencias históricas (24h, 7d, 30d)
4. Panel de alarmas activas
5. Indicadores de salud del sistema
6. Predicciones del modelo ML
7. Configuración de umbrales

ESTILO: ISA-101 (fondo gris, colores para estados)

GENERAR: Código completo con estilos CSS
```

### 4. Diseño HMI Profesional (Módulo 06)

Solicita a la IA:

```
Diseña interfaz HMI profesional para el proyecto:

SISTEMA: [Opción A/B/C seleccionada]

PANTALLAS REQUERIDAS:
1. Pantalla principal (sinóptico del proceso)
2. Pantalla de tendencias
3. Pantalla de alarmas
4. Pantalla de configuración

PARA CADA PANTALLA GENERAR:
- Layout ASCII con dimensiones
- Lista de elementos y posiciones
- Estados y colores
- Animaciones
- Scripts de navegación

ESTÁNDAR: ISA-101 High Performance HMI
```

---

## Cronograma del Proyecto

### Distribución de Tiempo (2 horas)

| Fase | Tiempo | Actividades |
|------|--------|-------------|
| Planificación | 15 min | Seleccionar opción, definir alcance |
| Firmware | 30 min | Código ESP32, sensores, MQTT |
| Backend | 35 min | Procesamiento, ML, API |
| Dashboard | 25 min | Visualización, alertas |
| Integración | 10 min | Pruebas end-to-end |
| Documentación | 5 min | README, diagramas |

---

## Prompts Guía para el Proyecto

### Prompt 1: Inicio del Proyecto

```
Voy a desarrollar un sistema IoT industrial para
[descripción del proceso seleccionado].

Necesito que me ayudes a:
1. Definir la arquitectura completa
2. Listar componentes de hardware necesarios
3. Estructurar el código (firmware y backend)
4. Diseñar el dashboard

RESTRICCIONES:
- Microcontrolador: ESP32
- Protocolo: MQTT
- Backend: Python
- Dashboard: Streamlit
- ML: scikit-learn

¿Por dónde empezamos?
```

### Prompt 2: Generación de Código Incremental

```
Tengo esta estructura base:
[Pegar código actual]

Necesito agregar:
[Funcionalidad específica]

REQUISITOS:
- Mantener compatibilidad con código existente
- Seguir el mismo estilo
- Agregar comentarios explicativos
- Incluir manejo de errores

GENERAR: Solo el código nuevo/modificado
```

### Prompt 3: Debugging con IA

```
Tengo este error:
[Pegar mensaje de error]

En este código:
[Pegar código relevante]

CONTEXTO:
- Plataforma: [ESP32/Python/etc]
- Versiones: [bibliotecas y versiones]
- Lo que intenté: [pasos de debugging]

AYÚDAME A:
1. Identificar la causa del error
2. Proponer solución
3. Evitar errores similares
```

### Prompt 4: Optimización Final

```
Este es mi código funcionando:
[Pegar código]

OPTIMIZAR PARA:
- Reducir consumo de memoria
- Mejorar tiempo de respuesta
- Aumentar robustez
- Agregar logging apropiado
- Documentar funciones principales

MANTENER: Funcionalidad actual sin cambios
```

---

## Entregables del Proyecto

### Estructura de Entrega

```
ProyectoFinal_[Apellido]_[OpciónABC]/
│
├── README.md                   # Descripción del proyecto
│
├── docs/
│   ├── arquitectura.md         # Diagrama de arquitectura
│   ├── hardware.md             # Lista de componentes
│   └── manual_usuario.md       # Instrucciones de uso
│
├── firmware/
│   ├── src/
│   │   ├── main.cpp
│   │   ├── config.h
│   │   ├── sensors.h
│   │   └── mqtt_handler.h
│   └── platformio.ini
│
├── backend/
│   ├── mqtt_subscriber.py
│   ├── data_processor.py
│   ├── ml_engine.py
│   ├── api.py
│   ├── config.yaml
│   └── requirements.txt
│
├── dashboard/
│   ├── app.py
│   ├── components/
│   └── styles.css
│
├── ml_models/
│   ├── anomaly_detector.joblib
│   └── training_notebook.ipynb
│
└── tests/
    ├── test_sensors.py
    └── test_ml_engine.py
```

### Documentación Mínima

1. **README.md** principal con:
   - Descripción del proyecto
   - Diagrama de arquitectura
   - Instrucciones de instalación
   - Guía de uso rápido

2. **Capturas de pantalla** del dashboard funcionando

3. **Notebook** con entrenamiento del modelo ML

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| **Firmware ESP32** | 20 | Lectura sensores, MQTT funcional |
| **Backend Python** | 20 | Procesamiento, almacenamiento, API |
| **Modelo ML** | 20 | Detección anomalías, métricas documentadas |
| **Dashboard** | 15 | Visualización clara, alertas |
| **Integración** | 10 | Sistema completo funcionando |
| **Documentación** | 10 | README, diagramas, comentarios |
| **Innovación** | 5 | Funcionalidades adicionales |
| **Total** | **100** | |

### Criterios de Aprobación

- Mínimo 60 puntos para aprobar
- Firmware debe compilar sin errores
- Backend debe ejecutar sin excepciones
- Dashboard debe mostrar datos (simulados o reales)

---

## Extensiones Opcionales

Para puntaje adicional, implementar:

### 1. Notificaciones Externas

```
Genera código para enviar alertas:
- Email (SMTP)
- Telegram (Bot API)
- WhatsApp (Twilio)

TRIGGER: Cuando ML detecte anomalía con probabilidad > 80%
```

### 2. Modelo Predictivo Avanzado

```
Entrena modelo LSTM para predicción de series temporales:
- Predecir valores de sensores 1 hora adelante
- Calcular RUL (vida útil remanente)
- Visualizar predicciones vs realidad
```

### 3. Interfaz Móvil

```
Crea app móvil con React Native o Flutter:
- Dashboard simplificado
- Notificaciones push
- Control remoto de actuadores
```

### 4. Gemelo Digital

```
Implementa simulación del proceso:
- Modelo físico simplificado
- Respuesta a cambios de setpoint
- Visualización 3D (Three.js)
```

---

## Recursos de Apoyo

### Bibliotecas Recomendadas

**ESP32/Arduino:**
- PubSubClient (MQTT)
- ArduinoJson
- Adafruit Sensor libraries

**Python:**
- paho-mqtt
- influxdb-client
- scikit-learn
- fastapi
- streamlit
- pandas, numpy

### Servicios Cloud Gratuitos

- **MQTT Broker:** HiveMQ Cloud, EMQX Cloud
- **Base de datos:** InfluxDB Cloud (free tier)
- **Dashboard:** Grafana Cloud (free tier)
- **Hosting:** Railway, Render, Heroku

---

## Preguntas Frecuentes

### ¿Puedo usar hardware simulado?

Sí, puedes simular sensores generando datos aleatorios con distribuciones realistas. Indica claramente en la documentación que es simulación.

### ¿Puedo trabajar en equipo?

Sí, equipos de 2-3 personas. Cada miembro debe documentar su contribución específica.

### ¿Qué pasa si no tengo ESP32?

Puedes:
1. Simular en Wokwi (simulador online)
2. Usar Raspberry Pi Pico
3. Generar datos desde Python

### ¿Cuánto código debo escribir yo vs generar con IA?

El objetivo es usar IA efectivamente. Debes:
- Entender cada línea generada
- Poder explicar decisiones de diseño
- Modificar código para requisitos específicos

---

*Módulo 08 - Proyecto Final Integrador*
*Duración: 2 horas*
*Integración de todos los módulos del curso*
