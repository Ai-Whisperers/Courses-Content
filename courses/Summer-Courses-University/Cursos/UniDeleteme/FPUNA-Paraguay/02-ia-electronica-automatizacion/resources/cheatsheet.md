# Cheatsheet - IA para Electrónica y Automatización
## Guía de Referencia Rápida

---

## 1. Herramientas de IA Recomendadas

| Herramienta | Uso Principal | Gratuito |
|-------------|---------------|----------|
| **GitHub Copilot** | Autocompletado de código | No (gratis estudiantes) |
| **Claude** | Generación de código, análisis | Sí (límites) |
| **ChatGPT** | Generación de código, explicaciones | Sí (límites) |
| **Cursor** | IDE con IA integrada | Sí (límites) |
| **Tabnine** | Autocompletado local | Sí (básico) |

---

## 2. Estructura de Prompts Efectivos

```
CONTEXTO: [Qué sistema/proceso]
OBJETIVO: [Qué quieres lograr]
ESPECIFICACIONES: [Requisitos técnicos]
RESTRICCIONES: [Limitaciones]
FORMATO: [Cómo quieres la respuesta]
```

### Ejemplo Rápido

```
Genera código ESP32 para leer temperatura DS18B20:
- Pin: GPIO4
- Publicar por MQTT cada 10 segundos
- Incluir reconexión automática
- Formato: Código completo con comentarios
```

---

## 3. ESP32/Arduino - Código Común

### Configuración WiFi con Reconexión

```cpp
#include <WiFi.h>

void setupWiFi() {
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi conectado");
}

void checkWiFi() {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("Reconectando WiFi...");
        WiFi.reconnect();
    }
}
```

### MQTT Básico

```cpp
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient mqtt(espClient);

void setupMQTT() {
    mqtt.setServer(MQTT_SERVER, 1883);
    mqtt.setCallback(callback);
}

void reconnectMQTT() {
    while (!mqtt.connected()) {
        if (mqtt.connect("ESP32Client")) {
            mqtt.subscribe("commands/#");
        } else {
            delay(5000);
        }
    }
}

void publishJSON(const char* topic, float value) {
    char msg[50];
    snprintf(msg, 50, "{\"value\":%.2f}", value);
    mqtt.publish(topic, msg);
}
```

### Lectura de Sensores Comunes

```cpp
// DS18B20 (Temperatura)
#include <OneWire.h>
#include <DallasTemperature.h>
OneWire oneWire(4);
DallasTemperature sensors(&oneWire);
float temp = sensors.getTempCByIndex(0);

// DHT22 (Temp + Humedad)
#include <DHT.h>
DHT dht(5, DHT22);
float temp = dht.readTemperature();
float hum = dht.readHumidity();

// ACS712 (Corriente)
float current = (analogRead(34) - 2048) * 3.3 / 4096 / 0.066;

// Ultrasónico HC-SR04 (Distancia)
long duration = pulseIn(echoPin, HIGH);
float distance = duration * 0.034 / 2;
```

### Deep Sleep

```cpp
#define uS_TO_S 1000000
#define SLEEP_TIME 300  // 5 minutos

void goToSleep() {
    esp_sleep_enable_timer_wakeup(SLEEP_TIME * uS_TO_S);
    esp_deep_sleep_start();
}
```

---

## 4. Python - Código Común

### MQTT Subscriber

```python
import paho.mqtt.client as mqtt
import json

def on_message(client, userdata, msg):
    data = json.loads(msg.payload)
    print(f"{msg.topic}: {data}")

client = mqtt.Client()
client.on_message = on_message
client.connect("localhost", 1883)
client.subscribe("sensors/#")
client.loop_forever()
```

### Procesamiento de Señales

```python
import numpy as np
from scipy import signal

# Filtro Butterworth paso bajo
def lowpass_filter(data, cutoff=10, fs=1000, order=4):
    nyq = 0.5 * fs
    b, a = signal.butter(order, cutoff/nyq, btype='low')
    return signal.filtfilt(b, a, data)

# FFT
def compute_fft(data, fs):
    n = len(data)
    freqs = np.fft.fftfreq(n, 1/fs)[:n//2]
    fft_vals = np.abs(np.fft.fft(data))[:n//2]
    return freqs, fft_vals

# RMS
def rms(data):
    return np.sqrt(np.mean(data**2))
```

### Detección de Anomalías

```python
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

def detect_anomalies(data, contamination=0.05):
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(data)

    model = IsolationForest(contamination=contamination)
    predictions = model.fit_predict(X_scaled)

    # -1 = anomalía, 1 = normal
    return predictions == -1
```

### Clasificador de Fallas

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Entrenar
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y
)

model = RandomForestClassifier(
    n_estimators=100,
    class_weight='balanced'
)
model.fit(X_train, y_train)

# Evaluar
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
```

### API REST con FastAPI

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class SensorData(BaseModel):
    temperature: float
    vibration: float
    current: float

@app.post("/predict")
def predict(data: SensorData):
    features = [[data.temperature, data.vibration, data.current]]
    prediction = model.predict(features)[0]
    return {"status": prediction}

# Ejecutar: uvicorn main:app --reload
```

---

## 5. PLC - Referencia Rápida

### Ladder Logic ASCII

```
Arranque/Parada con Enclavamiento:
--| START |--+--| RUN |--+--( RUN )--
             |           |
--| STOP  |--+           |
             |           |
--| FAULT |--+-----------+

Secuencia con Timer:
--| STEP1 |--[TON T1, 5s]--| T1.DN |--( STEP2 )--
```

### Structured Text Común

```pascal
// PID básico
Error := Setpoint - ProcessValue;
Integral := Integral + Error * Ts;
Derivative := (Error - PrevError) / Ts;
Output := Kp*Error + Ki*Integral + Kd*Derivative;
PrevError := Error;

// Limitador
IF Output > OutMax THEN Output := OutMax; END_IF;
IF Output < OutMin THEN Output := OutMin; END_IF;

// Secuenciador
CASE Step OF
    0: IF StartButton THEN Step := 1; END_IF;
    1: Valve1 := TRUE;
       IF Level > 80 THEN Step := 2; END_IF;
    2: Valve1 := FALSE; Pump := TRUE;
       IF Level < 20 THEN Step := 0; END_IF;
END_CASE;
```

### Direcciones Siemens S7-1200

```
Entradas:  %I0.0 - %I7.7
Salidas:   %Q0.0 - %Q7.7
Marcas:    %M0.0 - %M999.7
Datos:     %DB1.DBX0.0 (bit)
           %DB1.DBW0 (word)
           %DB1.DBD0 (dword)
           %DB1.DBB0 (byte)
Timers:    %T0 - %T255
Counters:  %C0 - %C255
```

---

## 6. SCADA/HMI - Referencia

### Colores ISA-101

| Estado | Color | Hex |
|--------|-------|-----|
| Fondo | Gris medio | #808080 |
| Normal/Run | Verde | #4CAF50 |
| Parado | Gris oscuro | #424242 |
| Alarma | Rojo | #F44336 |
| Advertencia | Amarillo | #FFC107 |
| Manual | Naranja | #FF9800 |

### Prioridades de Alarmas

| Prioridad | Respuesta | Color | Sonido |
|-----------|-----------|-------|--------|
| 1-Crítica | < 1 min | Rojo parpadeo | Sirena |
| 2-Alta | < 5 min | Rojo sólido | Beep continuo |
| 3-Media | < 30 min | Amarillo | Beep |
| 4-Baja | Próximo turno | Azul | Sin sonido |

### Configuración de Alarma

```
Variable: Nivel_Tanque (0-100%)
LL: 10% (Prioridad 2, Delay 5s)
L:  20% (Prioridad 3, Delay 10s)
H:  80% (Prioridad 3, Delay 10s)
HH: 90% (Prioridad 2, Delay 5s)
Deadband: 2%
```

---

## 7. Mantenimiento Predictivo

### Curva P-F

```
Rendimiento
    |
100%|---.
    |    '.
    |      '.  ← Punto P (detectable)
    |        '.
    |          '.
    |            '. ← Punto F (falla)
    +---------------→ Tiempo
         [Intervalo P-F]
```

### Umbrales de Vibración (ISO 10816)

| Clase | Bueno | Aceptable | Insatisfactorio |
|-------|-------|-----------|-----------------|
| I (Pequeñas) | < 0.71 | 0.71-1.8 | > 1.8 mm/s |
| II (Medianas) | < 1.12 | 1.12-2.8 | > 2.8 mm/s |
| III (Grandes) | < 1.8 | 1.8-4.5 | > 4.5 mm/s |
| IV (Turbinas) | < 2.8 | 2.8-7.1 | > 7.1 mm/s |

### Frecuencias de Rodamientos

```
BPFO = (n/2) × (1 - d/D×cos(θ)) × RPM/60
BPFI = (n/2) × (1 + d/D×cos(θ)) × RPM/60
BSF = (D/2d) × (1 - (d/D×cos(θ))²) × RPM/60
FTF = (1/2) × (1 - d/D×cos(θ)) × RPM/60

n = número de elementos rodantes
d = diámetro elemento rodante
D = diámetro primitivo
θ = ángulo de contacto
```

### Métricas de ML

```python
# Matriz de confusión
              Predicho
              Pos    Neg
Real  Pos     TP     FN
      Neg     FP     TN

Precision = TP / (TP + FP)  # De los que dije positivo, cuántos son
Recall = TP / (TP + FN)     # De los positivos reales, cuántos detecté
F1 = 2 * (P * R) / (P + R)  # Media armónica
```

---

## 8. IoT Industrial

### Formato JSON para Sensores

```json
{
    "device_id": "MOTOR-001",
    "timestamp": "2024-01-15T10:30:00Z",
    "sensors": {
        "temperature": 58.3,
        "vibration": 3.2,
        "current": [12.5, 12.3, 12.4]
    },
    "status": "normal",
    "alerts": []
}
```

### Tópicos MQTT Recomendados

```
plant/
├── area1/
│   ├── motor001/
│   │   ├── sensors     (datos cada segundo)
│   │   ├── status      (estado cada minuto)
│   │   ├── alerts      (cuando ocurren)
│   │   └── commands    (suscripción)
│   └── motor002/
│       └── ...
└── area2/
    └── ...
```

### QoS MQTT

| QoS | Entrega | Uso |
|-----|---------|-----|
| 0 | A lo más una vez | Datos frecuentes, pérdida tolerable |
| 1 | Al menos una vez | Datos importantes |
| 2 | Exactamente una vez | Comandos críticos |

---

## 9. Fórmulas Útiles

### Electricidad

```
P = V × I × cos(φ)           # Potencia activa (W)
Q = V × I × sin(φ)           # Potencia reactiva (VAR)
S = V × I                    # Potencia aparente (VA)
FP = cos(φ) = P/S            # Factor de potencia

I_desbalance = (I_max - I_avg) / I_avg × 100%
```

### Térmicas

```
P_disipada = (V_in - V_out) × I    # Potencia en regulador
T_juntura = T_amb + P × θja        # Temperatura de juntura
θja = (T_max - T_amb) / P_max      # Resistencia térmica
```

### Procesamiento de Señales

```
RMS = √(Σx²/n)               # Valor eficaz
dB = 20 × log₁₀(V2/V1)       # Decibeles (voltaje)
f_Nyquist = fs / 2           # Frecuencia máxima representable
τ = 1 / (2πfc)              # Constante de tiempo del filtro
```

### Control PID

```
u(t) = Kp×e(t) + Ki×∫e(t)dt + Kd×de(t)/dt

Ziegler-Nichols (lazo cerrado):
Kp = 0.6 × Ku
Ki = Kp / (0.5 × Tu)
Kd = Kp × 0.125 × Tu
```

---

## 10. Checklist de Proyecto IoT

### Hardware
- [ ] Microcontrolador seleccionado y probado
- [ ] Sensores calibrados
- [ ] Fuente de alimentación dimensionada
- [ ] Protecciones (ESD, sobretensión)
- [ ] Cableado industrial

### Firmware
- [ ] Reconexión automática WiFi/MQTT
- [ ] Watchdog habilitado
- [ ] Manejo de errores
- [ ] Deep sleep (si aplica)
- [ ] OTA updates

### Backend
- [ ] Base de datos configurada
- [ ] API REST funcionando
- [ ] Modelo ML entrenado
- [ ] Sistema de alertas

### Dashboard
- [ ] Métricas en tiempo real
- [ ] Tendencias históricas
- [ ] Alarmas visibles
- [ ] Permisos de usuario

### Documentación
- [ ] Diagrama de arquitectura
- [ ] Manual de usuario
- [ ] Procedimiento de calibración
- [ ] Plan de mantenimiento

---

## 11. Recursos Online

### Documentación
- [ESP32 Docs](https://docs.espressif.com/)
- [Arduino Reference](https://www.arduino.cc/reference/)
- [scikit-learn](https://scikit-learn.org/stable/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Streamlit](https://docs.streamlit.io/)

### Simuladores
- [Wokwi](https://wokwi.com/) - ESP32/Arduino online
- [Falstad](https://falstad.com/circuit/) - Circuitos
- [EveryCircuit](https://everycircuit.com/) - Simulación

### Datasets
- [NASA Turbofan](https://www.kaggle.com/datasets/behrad3d/nasa-cmaps) - RUL
- [CWRU Bearing](https://engineering.case.edu/bearingdatacenter) - Vibración
- [PHM Data Challenge](https://phmsociety.org/data-challenges/) - Varios

---

*Cheatsheet - IA para Electrónica y Automatización*
*FPUNA Paraguay - Curso de Verano*
*Versión 1.0*
