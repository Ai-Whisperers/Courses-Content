# Ejercicio Práctico - Módulo 08
## Implementación del Proyecto Final

---

## Objetivo

Implementar un sistema IoT industrial completo integrando todos los módulos del curso, utilizando IA como asistente de desarrollo durante todo el proceso.

**Duración:** 90 minutos (ejercicio guiado)
**Tipo:** Proyecto integrador práctico
**Herramientas:** Claude/ChatGPT, VS Code, PlatformIO, Python

---

## Selección del Proyecto

Antes de comenzar, selecciona UNA opción:

| Opción | Proyecto | Complejidad |
|--------|----------|-------------|
| A | Monitor de Motor Eléctrico | ⭐⭐⭐ |
| B | Control de Nivel de Tanques | ⭐⭐ |
| C | Estación Meteorológica | ⭐⭐ |

**Nota:** Esta guía usa la Opción A como ejemplo. Adapta los prompts para tu opción seleccionada.

---

## Parte 1: Configuración Inicial (10 minutos)

### Paso 1.1: Crear Estructura del Proyecto

```bash
# Crear estructura de directorios
mkdir -p proyecto_final/{firmware/src,backend,dashboard,docs,ml_models}
cd proyecto_final
```

### Paso 1.2: Solicitar Arquitectura a la IA

Envía este prompt:

```
Diseña la arquitectura para un sistema de monitoreo de motor eléctrico trifásico:

COMPONENTES DE HARDWARE:
- ESP32 DevKit
- 3x Sensor corriente ACS712-30A
- 1x Sensor temperatura DS18B20
- 1x Acelerómetro MPU6050 (vibración)
- 1x Sensor Hall para RPM

COMUNICACIÓN:
- WiFi a broker MQTT local (Mosquitto)
- Formato JSON para mensajes

SOFTWARE:
- Firmware: PlatformIO/Arduino
- Backend: Python 3.10+
- Dashboard: Streamlit
- ML: scikit-learn

GENERAR:
1. Diagrama ASCII de conexiones
2. Diagrama de flujo de datos
3. Lista de tópicos MQTT
4. Estructura de archivos
```

### Paso 1.3: Documentar Arquitectura

Crear archivo `docs/arquitectura.md` con la respuesta de la IA.

---

## Parte 2: Firmware ESP32 (25 minutos)

### Paso 2.1: Archivo de Configuración

Solicita a la IA:

```
Genera config.h para ESP32 con monitoreo de motor:

INCLUIR:
- Credenciales WiFi (placeholders)
- Configuración MQTT (broker, puerto, tópicos)
- Pines de sensores:
  * ACS712 en GPIO 34, 35, 32 (ADC)
  * DS18B20 en GPIO 4 (OneWire)
  * MPU6050 en GPIO 21 (SDA), 22 (SCL)
  * Hall sensor en GPIO 27 (interrupt)
- Constantes de calibración
- Intervalos de muestreo

FORMATO: Constexpr y defines organizados por sección
```

Guardar en `firmware/src/config.h`

### Paso 2.2: Clase de Sensores

Solicita a la IA:

```
Genera sensors.h y sensors.cpp para ESP32:

CLASES REQUERIDAS:

1. CurrentSensor (ACS712):
   - Constructor con pin y sensibilidad
   - Método readCurrent() con filtrado
   - Calibración de offset

2. TemperatureSensor (DS18B20):
   - Inicialización OneWire
   - Lectura en °C
   - Verificación CRC

3. VibrationSensor (MPU6050):
   - Configuración I2C
   - Lectura aceleración XYZ
   - Cálculo RMS de vibración

4. RPMSensor:
   - Interrupt para pulsos
   - Cálculo RPM con debounce
   - Media móvil

CADA CLASE INCLUIR:
- Constructor
- begin() para inicialización
- read() para lectura
- isValid() para verificación

GENERAR: Código completo con comentarios
```

Guardar en `firmware/src/sensors.h` y `firmware/src/sensors.cpp`

### Paso 2.3: Handler MQTT

Solicita a la IA:

```
Genera mqtt_handler.h para ESP32:

FUNCIONALIDADES:
- Conexión a broker con reconexión automática
- Publicación de datos JSON
- Suscripción a comandos
- Callbacks para mensajes entrantes
- QoS 1 para datos importantes

TÓPICOS:
- motor/sensors (publicar cada 1 segundo)
- motor/status (publicar cada 10 segundos)
- motor/alerts (publicar cuando hay alarma)
- motor/commands (suscribir para recibir comandos)

FORMATO JSON EJEMPLO:
{
  "timestamp": 1704067200,
  "device_id": "MOTOR-001",
  "current": {"L1": 12.5, "L2": 12.3, "L3": 12.4},
  "temperature": 58.3,
  "vibration": 3.2,
  "rpm": 1748
}

GENERAR: Header con clase MQTTHandler
```

### Paso 2.4: Main Loop

Solicita a la IA:

```
Genera main.cpp integrando todos los componentes:

SECUENCIA:
1. Setup:
   - Inicializar Serial
   - Conectar WiFi
   - Inicializar sensores
   - Conectar MQTT

2. Loop:
   - Leer sensores cada 100ms
   - Filtrar y promediar
   - Publicar cada 1 segundo
   - Verificar umbrales
   - Publicar alerta si excede
   - Manejar reconexiones

3. Detección local de anomalías:
   - Desbalance de corriente > 10%
   - Temperatura > 80°C
   - Vibración > 7 mm/s
   - RPM < 1650

INCLUIR:
- Watchdog timer
- LED de estado
- Manejo de errores
```

Guardar en `firmware/src/main.cpp`

### Paso 2.5: Configuración PlatformIO

```ini
; platformio.ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino

lib_deps =
    knolleary/PubSubClient@^2.8
    bblanchon/ArduinoJson@^6.21
    paulstoffregen/OneWire@^2.3
    milesburton/DallasTemperature@^3.11
    electroniccats/MPU6050@^1.3

monitor_speed = 115200
upload_speed = 921600
```

---

## Parte 3: Backend Python (25 minutos)

### Paso 3.1: Suscriptor MQTT

Solicita a la IA:

```
Genera mqtt_subscriber.py para recibir datos del motor:

FUNCIONALIDADES:
- Conectar a broker MQTT
- Suscribirse a tópicos motor/#
- Parsear JSON de sensores
- Almacenar en base de datos SQLite
- Llamar a procesador de datos
- Logging estructurado

INCLUIR:
- Reconexión automática
- Manejo de mensajes malformados
- Cola de procesamiento (thread-safe)
- Graceful shutdown

GENERAR: Código completo con clase MQTTSubscriber
```

Guardar en `backend/mqtt_subscriber.py`

### Paso 3.2: Procesador de Datos

Solicita a la IA:

```
Genera data_processor.py para análisis de datos:

FUNCIONALIDADES:
1. Preprocesamiento:
   - Validación de rangos
   - Detección de valores faltantes
   - Cálculo de features derivados:
     * Desbalance de corriente (%)
     * Potencia aparente
     * Factor de carga

2. Detección de anomalías:
   - Método estadístico (Z-score)
   - Isolation Forest (si hay suficientes datos)
   - Umbrales dinámicos

3. Clasificación de estado:
   - Normal
   - Advertencia
   - Crítico

INCLUIR:
- Ventana deslizante de datos
- Cálculo de estadísticas móviles
- Almacenamiento de resultados

GENERAR: Clase DataProcessor completa
```

Guardar en `backend/data_processor.py`

### Paso 3.3: Motor de ML

Solicita a la IA:

```
Genera ml_engine.py para predicción de fallas:

MODELO: Random Forest para clasificación multiclase

CLASES:
- normal
- sobrecarga
- desbalance_fases
- rodamiento_desgastado
- desalineacion

FEATURES:
- current_L1, current_L2, current_L3
- temperature
- vibration
- rpm
- current_imbalance (calculado)
- power_factor (calculado)

FUNCIONALIDADES:
1. Entrenar modelo con datos históricos
2. Cargar modelo pre-entrenado
3. Predecir estado actual
4. Retornar probabilidades por clase
5. Calcular feature importance

INCLUIR:
- Cross-validation durante entrenamiento
- Guardado/carga con joblib
- Métricas de evaluación
- Logging de predicciones

GENERAR: Clase MLEngine con todos los métodos
```

Guardar en `backend/ml_engine.py`

### Paso 3.4: API REST

Solicita a la IA:

```
Genera api.py con FastAPI para el sistema de monitoreo:

ENDPOINTS:

GET /health
- Estado del servidor

GET /motor/{motor_id}/current
- Datos actuales de sensores

GET /motor/{motor_id}/history?hours=24
- Histórico de las últimas N horas

GET /motor/{motor_id}/prediction
- Predicción actual del modelo ML

GET /motor/{motor_id}/alerts
- Alertas activas

POST /motor/{motor_id}/acknowledge
- Reconocer alerta

GET /motor/{motor_id}/stats
- Estadísticas agregadas

INCLUIR:
- Validación con Pydantic
- Manejo de errores
- Documentación OpenAPI
- CORS habilitado

GENERAR: Código completo de API
```

Guardar en `backend/api.py`

### Paso 3.5: Archivo de Requisitos

```
# requirements.txt
paho-mqtt>=1.6.1
fastapi>=0.104.0
uvicorn>=0.24.0
scikit-learn>=1.3.0
pandas>=2.0.0
numpy>=1.24.0
joblib>=1.3.0
python-dotenv>=1.0.0
sqlite3
```

---

## Parte 4: Dashboard (20 minutos)

### Paso 4.1: Aplicación Principal

Solicita a la IA:

```
Genera app.py con Streamlit para dashboard de motor:

LAYOUT:
1. Header: Título, selector de motor, última actualización
2. Fila 1: 4 métricas principales (corriente, temp, vibración, RPM)
3. Fila 2: Gráfico de tendencias (últimos 30 minutos)
4. Fila 3: Izquierda: Estado del modelo ML | Derecha: Alertas activas
5. Fila 4: Configuración de umbrales

ESTILO:
- Tema oscuro
- Colores ISA-101 (gris fondo, colores para estados)
- Métricas con indicadores de tendencia

DATOS:
- Obtener de API REST
- Actualización cada 5 segundos
- Caché de 30 segundos

GENERAR: Código completo con CSS personalizado
```

Guardar en `dashboard/app.py`

### Paso 4.2: Componentes Visuales

Solicita a la IA:

```
Genera componentes adicionales para el dashboard:

1. GaugeChart: Indicador circular para temperatura
   - Verde: 40-65°C
   - Amarillo: 65-75°C
   - Rojo: >75°C

2. BarChart: Corrientes de las 3 fases
   - Mostrar desbalance como % sobre las barras

3. TimeSeriesChart: Múltiples variables
   - Selector de variables a mostrar
   - Zoom y pan
   - Exportar datos

4. AlertTable: Tabla de alarmas
   - Timestamp, tipo, severidad, mensaje
   - Botón reconocer
   - Filtro por severidad

USAR: Plotly para gráficos interactivos

GENERAR: Funciones componente reutilizables
```

Guardar en `dashboard/components.py`

### Paso 4.3: Estilos CSS

```css
/* dashboard/styles.css */
.main {
    background-color: #1e1e1e;
    color: #ffffff;
}

.stMetric {
    background-color: #2d2d2d;
    padding: 10px;
    border-radius: 5px;
}

.status-normal {
    color: #4caf50;
}

.status-warning {
    color: #ff9800;
}

.status-critical {
    color: #f44336;
    animation: blink 1s infinite;
}

@keyframes blink {
    50% { opacity: 0.5; }
}
```

---

## Parte 5: Integración y Pruebas (10 minutos)

### Paso 5.1: Script de Inicio

```bash
#!/bin/bash
# start_system.sh

# Iniciar broker MQTT (si no está corriendo)
mosquitto -d

# Iniciar backend
cd backend
python mqtt_subscriber.py &
python -m uvicorn api:app --host 0.0.0.0 --port 8000 &

# Esperar a que API esté lista
sleep 3

# Iniciar dashboard
cd ../dashboard
streamlit run app.py --server.port 8501
```

### Paso 5.2: Datos de Prueba

Solicita a la IA:

```
Genera script para simular datos de motor:

SIMULAR:
- Operación normal por 5 minutos
- Evento de sobrecarga (corrientes +20%)
- Retorno a normal
- Evento de vibración alta
- Retorno a normal

PUBLICAR:
- A broker MQTT local
- Tópico: motor/sensors
- Formato JSON igual al firmware

INCLUIR:
- Ruido realista en señales
- Transiciones graduales
- Timestamps correctos

GENERAR: Script simulator.py completo
```

### Paso 5.3: Lista de Verificación

| Componente | Verificación | ✓ |
|------------|--------------|---|
| Firmware | Compila sin errores | |
| Firmware | Publica a MQTT | |
| Backend | Recibe mensajes MQTT | |
| Backend | Almacena en BD | |
| Backend | API responde | |
| ML | Modelo cargado | |
| ML | Predicciones correctas | |
| Dashboard | Muestra métricas | |
| Dashboard | Gráficos actualizan | |
| Dashboard | Alertas funcionan | |

---

## Entregables Finales

### Checklist de Entrega

- [ ] Código fuente completo
- [ ] README.md con instrucciones
- [ ] Diagrama de arquitectura
- [ ] Capturas de pantalla del dashboard
- [ ] Video demo (2-3 minutos) - opcional
- [ ] requirements.txt / platformio.ini

### Formato de Entrega

```
ProyectoFinal_[Apellido]/
├── README.md
├── docs/
│   ├── arquitectura.md
│   └── screenshots/
├── firmware/
│   ├── src/
│   └── platformio.ini
├── backend/
│   ├── *.py
│   └── requirements.txt
├── dashboard/
│   ├── app.py
│   └── components.py
└── ml_models/
    └── motor_classifier.joblib
```

---

## Rúbrica Detallada

| Criterio | Puntos | Detalle |
|----------|--------|---------|
| **Firmware (20)** | | |
| - Compila correctamente | 5 | |
| - Lee sensores | 5 | |
| - Publica MQTT | 5 | |
| - Detección local | 5 | |
| **Backend (20)** | | |
| - Suscriptor MQTT | 5 | |
| - Almacenamiento | 5 | |
| - API funcional | 5 | |
| - Procesamiento | 5 | |
| **ML (20)** | | |
| - Modelo entrenado | 8 | |
| - Predicciones | 7 | |
| - Métricas > 80% | 5 | |
| **Dashboard (15)** | | |
| - Métricas visibles | 5 | |
| - Gráficos | 5 | |
| - Alertas | 5 | |
| **Integración (10)** | | |
| - Funciona end-to-end | 10 | |
| **Documentación (10)** | | |
| - README completo | 5 | |
| - Comentarios código | 5 | |
| **Bonus (5)** | | |
| - Innovación | 5 | |
| **Total** | **100** | |

---

*Módulo 08 - Proyecto Final*
*Tiempo: 90 minutos*
*Integración completa del curso*
