# Ejercicio Práctico - Módulo 07
## Sistema de Mantenimiento Predictivo para Bomba Industrial

---

## Objetivo

Desarrollar un sistema completo de mantenimiento predictivo utilizando IA para clasificar el estado de salud de una bomba centrífuga basándose en datos de sensores.

**Duración:** 20 minutos
**Tipo:** Práctico guiado con código
**Herramientas:** Claude/ChatGPT, Python, Jupyter Notebook

---

## Descripción del Sistema

### Bomba Centrífuga Monitorizada

```
    ┌─────────────────────────────────────────────────────────┐
    │                    BOMBA CENTRÍFUGA                      │
    │                                                          │
    │   ┌──────┐    ┌─────────────┐    ┌──────┐              │
    │   │MOTOR ├────┤  ACOPLE     ├────┤BOMBA │──► Descarga   │
    │   │ 50HP │    │             │    │      │              │
    │   └──┬───┘    └──────┬──────┘    └──┬───┘              │
    │      │               │              │                   │
    │   [T1,V1]         [V2]           [P,Q,T2]              │
    │   Temp,Vib      Vibración       Presión                │
    │   Motor         Acople          Caudal,Temp            │
    │                                                          │
    └─────────────────────────────────────────────────────────┘

    SENSORES:
    - T1: Temperatura motor (PT100)
    - V1: Vibración motor (acelerómetro)
    - V2: Vibración acople (acelerómetro)
    - P:  Presión descarga (transmisor 4-20mA)
    - Q:  Caudal (flujómetro electromagnético)
    - T2: Temperatura fluido (termocupla)
```

### Datos de Sensores

| Sensor | Variable | Unidad | Rango Normal | Alarma |
|--------|----------|--------|--------------|--------|
| T1 | Temp Motor | °C | 40-75 | >85 |
| V1 | Vib Motor | mm/s RMS | 0-4.5 | >7.1 |
| V2 | Vib Acople | mm/s RMS | 0-3.5 | >5.6 |
| P | Presión | bar | 4-6 | <3.5, >7 |
| Q | Caudal | m³/h | 80-120 | <60 |
| T2 | Temp Fluido | °C | 20-45 | >55 |

---

## Parte 1: Generación de Dataset (5 minutos)

### Paso 1.1: Solicitar Generador de Datos

Envía este prompt a la IA:

```
Genera código Python para crear un dataset sintético de bomba:

VARIABLES:
- temp_motor: 40-75°C normal, >85°C falla
- vib_motor: 0-4.5 mm/s normal, >7.1 falla
- vib_acople: 0-3.5 mm/s normal, >5.6 falla
- presion: 4-6 bar normal
- caudal: 80-120 m³/h normal
- temp_fluido: 20-45°C normal

CLASES (4):
1. "normal" (60% datos)
2. "desgaste_rodamiento" (15%): vib alta, temp sube gradual
3. "desalineacion" (15%): vib_acople muy alta
4. "cavitacion" (10%): presión baja, ruido alto

REQUISITOS:
- 10000 muestras totales
- Agregar ruido realista
- Incluir timestamp
- Correlaciones físicas correctas
- Exportar a CSV

GENERAR: Código completo con función main()
```

### Paso 1.2: Completar Código

```python
# Generador de datos sintéticos para mantenimiento predictivo
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

class PumpDataGenerator:
    def __init__(self, n_samples=10000, seed=42):
        np.random.seed(seed)
        self.n_samples = n_samples

        # Distribución de clases
        self.class_distribution = {
            'normal': 0.60,
            'desgaste_rodamiento': 0.15,
            'desalineacion': 0.15,
            'cavitacion': 0.10
        }

    def generate_normal(self, n):
        """Genera datos de operación normal"""
        return {
            'temp_motor': np.random.normal(55, 8, n),
            'vib_motor': np.random.exponential(1.5, n),
            'vib_acople': np.random.exponential(1.2, n),
            'presion': np.random.normal(5.0, 0.3, n),
            'caudal': np.random.normal(100, 8, n),
            'temp_fluido': np.random.normal(32, 5, n)
        }

    def generate_bearing_wear(self, n):
        """Genera datos de desgaste de rodamiento"""
        # COMPLETAR: Vibración alta, temperatura elevándose
        pass

    def generate_misalignment(self, n):
        """Genera datos de desalineación"""
        # COMPLETAR: Vibración de acople muy alta
        pass

    def generate_cavitation(self, n):
        """Genera datos de cavitación"""
        # COMPLETAR: Presión baja, caudal reducido
        pass

    def generate_dataset(self):
        """Genera dataset completo"""
        # COMPLETAR: Combinar todas las clases
        pass

# Uso
generator = PumpDataGenerator(n_samples=10000)
df = generator.generate_dataset()
df.to_csv('pump_data.csv', index=False)
```

### Paso 1.3: Verificar Dataset

Solicita a la IA:

```
Genera código para verificar la calidad del dataset:

VERIFICACIONES:
1. Distribución de clases (gráfico de barras)
2. Estadísticas descriptivas por clase
3. Matriz de correlación
4. Boxplots de cada variable por clase
5. Detección de outliers extremos

GENERAR: Notebook de validación con visualizaciones
```

---

## Parte 2: Modelo de Clasificación (10 minutos)

### Paso 2.1: Preprocesamiento

Solicita a la IA:

```
Genera pipeline de preprocesamiento para el dataset de bomba:

PASOS:
1. Cargar CSV
2. Separar features (X) y target (y)
3. Dividir train/test (80/20, estratificado)
4. Escalar features (StandardScaler)
5. Codificar labels (LabelEncoder)

INCLUIR:
- Manejo de valores faltantes
- Detección de outliers (IQR)
- Guardado de scalers para producción

GENERAR: Clase PumpPreprocessor reutilizable
```

### Paso 2.2: Entrenar Modelo

```python
# Clasificador de salud de bomba
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix
import joblib

class PumpHealthClassifier:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            class_weight='balanced'
        )
        self.scaler = None
        self.encoder = None

    def train(self, X_train, y_train):
        """Entrenar modelo con validación cruzada"""
        # COMPLETAR: Entrenar y reportar métricas CV
        pass

    def optimize_hyperparameters(self, X_train, y_train):
        """Búsqueda de hiperparámetros"""
        param_grid = {
            'n_estimators': [50, 100, 200],
            'max_depth': [5, 10, 15, None],
            'min_samples_split': [2, 5, 10],
            'min_samples_leaf': [1, 2, 4]
        }
        # COMPLETAR: GridSearchCV
        pass

    def evaluate(self, X_test, y_test):
        """Evaluar en conjunto de prueba"""
        # COMPLETAR: Métricas y matriz de confusión
        pass

    def save_model(self, filepath):
        """Guardar modelo para producción"""
        joblib.dump({
            'model': self.model,
            'scaler': self.scaler,
            'encoder': self.encoder
        }, filepath)

    def predict_proba(self, X):
        """Predicción con probabilidades"""
        return self.model.predict_proba(X)
```

### Paso 2.3: Optimizar Modelo

Solicita a la IA:

```
Optimiza el clasificador de bomba:

MODELO ACTUAL: RandomForest con class_weight='balanced'

MEJORAS SOLICITADAS:
1. Comparar con GradientBoosting y XGBoost
2. Feature importance analysis
3. Curvas ROC por clase
4. Umbral óptimo para cada falla

MÉTRICAS OBJETIVO:
- Recall para fallas >= 95% (no perder fallas reales)
- Precision >= 85% (evitar falsas alarmas)
- F1-score macro >= 90%

GENERAR: Código de comparación y selección de mejor modelo
```

---

## Parte 3: Sistema de Alertas (5 minutos)

### Paso 3.1: Motor de Alertas

Solicita a la IA:

```
Crea sistema de alertas predictivas:

NIVELES DE ALERTA:
1. INFO: Probabilidad anomalía 50-70%
2. WARNING: Probabilidad 70-85%
3. CRITICAL: Probabilidad >85%

FUNCIONALIDADES:
- Evaluar cada lectura de sensor
- Calcular tendencia (últimas 100 lecturas)
- Estimar días hasta falla (RUL simplificado)
- Generar recomendación de mantenimiento
- Enviar notificación (mock)

FORMATO ALERTA:
{
  "timestamp": "2024-01-15 10:30:00",
  "pump_id": "PUMP-001",
  "alert_level": "WARNING",
  "predicted_condition": "desgaste_rodamiento",
  "probability": 0.78,
  "rul_days": 15,
  "recommendation": "Programar inspección de rodamientos",
  "sensor_values": {...}
}

GENERAR: Clase AlertEngine completa
```

### Paso 3.2: Completar Sistema

```python
class AlertEngine:
    def __init__(self, model_path, thresholds=None):
        self.model_data = joblib.load(model_path)
        self.thresholds = thresholds or {
            'INFO': 0.50,
            'WARNING': 0.70,
            'CRITICAL': 0.85
        }
        self.history = []

    def evaluate(self, sensor_data):
        """Evaluar lectura de sensores"""
        # COMPLETAR: Preprocesar y predecir
        pass

    def calculate_trend(self):
        """Calcular tendencia de degradación"""
        # COMPLETAR: Usar últimas N lecturas
        pass

    def estimate_rul(self, condition, probability):
        """Estimar vida útil remanente"""
        # Modelo simplificado basado en experiencia
        rul_base = {
            'desgaste_rodamiento': 30,  # días típicos
            'desalineacion': 45,
            'cavitacion': 20
        }
        # COMPLETAR: Ajustar por probabilidad
        pass

    def generate_recommendation(self, condition, rul_days):
        """Generar recomendación de mantenimiento"""
        recommendations = {
            'desgaste_rodamiento': {
                'action': 'Inspeccionar rodamientos',
                'spare_parts': ['Rodamiento 6310-2RS', 'Grasa SKF LGMT2'],
                'estimated_downtime': '4 horas'
            },
            # COMPLETAR: Otras condiciones
        }
        pass

    def send_notification(self, alert):
        """Enviar notificación (mock)"""
        print(f"[{alert['alert_level']}] {alert['pump_id']}: "
              f"{alert['predicted_condition']} - "
              f"RUL: {alert['rul_days']} días")
```

### Paso 3.3: Dashboard de Monitoreo

Solicita a la IA:

```
Genera código para dashboard de monitoreo:

PLATAFORMA: Streamlit

COMPONENTES:
1. Estado actual de bomba (gauge con color)
2. Probabilidades por tipo de falla (barras)
3. Tendencia de variables (líneas últimas 24h)
4. Historial de alertas (tabla)
5. RUL estimado (indicador numérico)
6. Próximo mantenimiento recomendado

INCLUIR:
- Actualización automática cada 30s
- Selector de bomba (si hay múltiples)
- Exportar reporte PDF

GENERAR: app.py completo para Streamlit
```

---

## Entregables

### Archivos a Entregar

1. **pump_data_generator.py** - Generador de datos sintéticos
2. **pump_classifier.py** - Modelo de clasificación
3. **alert_engine.py** - Sistema de alertas
4. **dashboard.py** - Interfaz de monitoreo (opcional)
5. **model_evaluation.ipynb** - Notebook con análisis

### Estructura de Entrega

```
M07_Ejercicio_[TuApellido]/
├── data/
│   └── pump_data.csv
├── models/
│   └── pump_classifier.joblib
├── src/
│   ├── pump_data_generator.py
│   ├── pump_classifier.py
│   └── alert_engine.py
├── notebooks/
│   └── model_evaluation.ipynb
└── README.md
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Dataset realista | 20 | Correlaciones físicas correctas |
| Modelo entrenado | 25 | F1 >= 85%, recall fallas >= 90% |
| Sistema alertas | 25 | Niveles correctos, RUL estimado |
| Código limpio | 15 | Documentado, modular |
| Visualizaciones | 15 | Gráficos informativos |
| **Total** | **100** | |

---

## Extensión: Modelo en Producción

### Despliegue con FastAPI

Solicita a la IA:

```
Genera API REST para servir el modelo de mantenimiento:

ENDPOINTS:
- POST /predict: Recibir datos de sensores, retornar predicción
- GET /health: Estado del modelo
- GET /history: Últimas N predicciones

INCLUIR:
- Validación de entrada (Pydantic)
- Logging de predicciones
- Dockerfile para contenedor

GENERAR: Código completo de API
```

---

*Módulo 07 - IA para Mantenimiento Predictivo*
*Tiempo estimado: 20 minutos*
