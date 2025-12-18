# Módulo 07: IA para Mantenimiento Predictivo
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Comprender los fundamentos del mantenimiento predictivo
- Implementar modelos ML para predicción de fallos
- Analizar datos de equipos industriales con Python
- Calcular ROI de implementación de mantenimiento predictivo
- Integrar sensores y modelos en sistemas industriales

---

## 1. Introducción a Mantenimiento Predictivo

### 1.1 Evolución del Mantenimiento

```
┌─────────────────────────────────────────────────────────────┐
│              Evolución de Estrategias de Mantenimiento      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   REACTIVO          PREVENTIVO         PREDICTIVO          │
│   (Correctivo)      (Basado en tiempo)  (Basado en condición)│
│                                                             │
│   ┌─────────┐       ┌─────────┐        ┌─────────┐         │
│   │  Fallo  │       │ Cambio  │        │ Predice │         │
│   │imprevisto│       │programado│        │el fallo │         │
│   └─────────┘       └─────────┘        └─────────┘         │
│        │                 │                   │             │
│        ▼                 ▼                   ▼             │
│   Alto costo        Costo medio         Bajo costo         │
│   Parada no         Posible sobre-      Intervención       │
│   planificada       mantenimiento       optimizada         │
│                                                             │
│   Costo relativo:   Costo relativo:    Costo relativo:     │
│      100%              60%                 25%              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Indicadores Clave

| Indicador | Definición | Fórmula |
|-----------|------------|---------|
| MTBF | Tiempo medio entre fallos | Tiempo operación / Nº fallos |
| MTTR | Tiempo medio de reparación | Tiempo reparación / Nº reparaciones |
| OEE | Eficiencia general de equipos | Disponibilidad × Rendimiento × Calidad |
| RUL | Vida útil remanente | Predicción de cuánto durará el equipo |

---

## 2. Datos para Mantenimiento Predictivo

### 2.1 Fuentes de Datos

**Prompt para identificar datos:**

```
Para implementar mantenimiento predictivo en una bomba centrífuga industrial:

EQUIPO: Bomba centrífuga 50 HP, 3600 RPM

IDENTIFICAR:
1. Variables de proceso a monitorear
2. Sensores requeridos (tipo, ubicación)
3. Frecuencia de muestreo recomendada
4. Rangos normales y anormales
5. Indicadores precursores de fallo típicos

FORMATO: Tabla detallada con justificación
```

### 2.2 Variables Típicas de Monitoreo

| Variable | Sensor | Ubicación | Frecuencia | Normal | Alarma |
|----------|--------|-----------|------------|--------|--------|
| Vibración | Acelerómetro | Rodamiento DE | 1 kHz | < 4 mm/s | > 7 mm/s |
| Temperatura | Termopar | Rodamiento | 1/min | < 70°C | > 85°C |
| Corriente | CT | Alimentación | 1/s | 45±5 A | > 55 A |
| Presión descarga | Transductor | Descarga | 1/s | 4-6 bar | < 3 bar |
| Caudal | Flujómetro | Descarga | 1/s | 80-100 m³/h | < 50 m³/h |

### 2.3 Patrones de Degradación

```
Curva P-F (Potential Failure to Functional Failure)

Condición
  ▲
  │     ┌───────────── Condición Normal
  │     │
  │  ───┴─────────────────────────────────────────────
  │              \
  │               \  ← Punto P (Falla potencial detectable)
  │                \    Vibración aumenta
  │                 \
  │                  \  ← Intervalo P-F (tiempo para actuar)
  │                   \   Típico: días a semanas
  │                    \
  │                     \
  │                      ● ← Punto F (Falla funcional)
  │                          Bomba deja de operar
  └──────────────────────────────────────────────► Tiempo

  │←──────── Mantenimiento Predictivo ─────────→│
           Detecta aquí, interviene antes de F
```

---

## 3. Modelos de Machine Learning

### 3.1 Clasificación de Estado

**Prompt para modelo de clasificación:**

```
Genera un modelo de clasificación para estado de bomba:

DATOS DE ENTRADA:
- Vibración RMS (mm/s)
- Temperatura rodamiento (°C)
- Corriente motor (A)
- Presión diferencial (bar)
- Horas de operación

CLASES:
1. NORMAL (verde)
2. ATENCIÓN (amarillo) - mantenimiento en 2 semanas
3. ALERTA (naranja) - mantenimiento en 1 semana
4. CRÍTICO (rojo) - mantenimiento inmediato

INCLUIR:
1. Preprocesamiento de datos
2. Ingeniería de características
3. Modelo Random Forest
4. Validación cruzada
5. Matriz de confusión
6. Exportar modelo (joblib/pickle)
```

### 3.2 Código de Clasificación

```python
"""
Modelo de Clasificación para Mantenimiento Predictivo
Predicción de estado de bomba industrial
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix
import joblib

class PumpHealthClassifier:
    """Clasificador de estado de salud de bomba industrial."""

    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            class_weight='balanced'
        )
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.feature_names = None

    def prepare_features(self, df):
        """
        Prepara características para el modelo.

        Args:
            df: DataFrame con datos crudos

        Returns:
            DataFrame con características procesadas
        """
        features = pd.DataFrame()

        # Características directas
        features['vibration_rms'] = df['vibration']
        features['temperature'] = df['temperature']
        features['current'] = df['current']
        features['pressure_diff'] = df['pressure']
        features['hours'] = df['operating_hours']

        # Características derivadas
        features['vibration_temp_ratio'] = df['vibration'] / (df['temperature'] + 1)
        features['current_normalized'] = df['current'] / df['current'].mean()
        features['pressure_deviation'] = abs(df['pressure'] - df['pressure'].median())

        # Características estadísticas (si hay historial)
        if 'vibration_std' in df.columns:
            features['vibration_std'] = df['vibration_std']
            features['temp_trend'] = df['temp_trend']

        self.feature_names = features.columns.tolist()
        return features

    def train(self, X, y):
        """
        Entrena el modelo de clasificación.

        Args:
            X: Features de entrenamiento
            y: Etiquetas de clase

        Returns:
            Diccionario con métricas de entrenamiento
        """
        # Codificar etiquetas
        y_encoded = self.label_encoder.fit_transform(y)

        # Escalar características
        X_scaled = self.scaler.fit_transform(X)

        # Dividir datos
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
        )

        # Entrenar modelo
        self.model.fit(X_train, y_train)

        # Evaluar
        y_pred = self.model.predict(X_test)

        # Métricas
        cv_scores = cross_val_score(self.model, X_scaled, y_encoded, cv=5)

        metrics = {
            'accuracy': self.model.score(X_test, y_test),
            'cv_mean': cv_scores.mean(),
            'cv_std': cv_scores.std(),
            'classification_report': classification_report(
                y_test, y_pred,
                target_names=self.label_encoder.classes_
            ),
            'confusion_matrix': confusion_matrix(y_test, y_pred),
            'feature_importance': dict(zip(
                self.feature_names,
                self.model.feature_importances_
            ))
        }

        return metrics

    def predict(self, X):
        """
        Predice el estado de la bomba.

        Args:
            X: Features para predicción

        Returns:
            Etiqueta de clase y probabilidades
        """
        X_scaled = self.scaler.transform(X)
        prediction = self.model.predict(X_scaled)
        probabilities = self.model.predict_proba(X_scaled)

        return {
            'class': self.label_encoder.inverse_transform(prediction),
            'probabilities': dict(zip(
                self.label_encoder.classes_,
                probabilities[0]
            ))
        }

    def save_model(self, path='pump_classifier.joblib'):
        """Guarda el modelo entrenado."""
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'label_encoder': self.label_encoder,
            'feature_names': self.feature_names
        }
        joblib.dump(model_data, path)
        print(f"Modelo guardado en: {path}")

    def load_model(self, path='pump_classifier.joblib'):
        """Carga un modelo previamente entrenado."""
        model_data = joblib.load(path)
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.label_encoder = model_data['label_encoder']
        self.feature_names = model_data['feature_names']
        print(f"Modelo cargado desde: {path}")


# Ejemplo de uso
if __name__ == "__main__":
    # Generar datos sintéticos
    np.random.seed(42)
    n_samples = 1000

    # Datos normales
    data = pd.DataFrame({
        'vibration': np.random.normal(3, 0.5, n_samples),
        'temperature': np.random.normal(55, 5, n_samples),
        'current': np.random.normal(45, 3, n_samples),
        'pressure': np.random.normal(5, 0.5, n_samples),
        'operating_hours': np.random.uniform(0, 10000, n_samples)
    })

    # Generar etiquetas basadas en condiciones
    conditions = [
        (data['vibration'] < 4) & (data['temperature'] < 70),
        (data['vibration'] >= 4) & (data['vibration'] < 6),
        (data['vibration'] >= 6) & (data['vibration'] < 8),
        (data['vibration'] >= 8)
    ]
    choices = ['NORMAL', 'ATENCION', 'ALERTA', 'CRITICO']
    data['estado'] = np.select(conditions, choices, default='NORMAL')

    # Entrenar clasificador
    classifier = PumpHealthClassifier()
    X = classifier.prepare_features(data)
    y = data['estado']

    metrics = classifier.train(X, y)

    print("=== Métricas de Entrenamiento ===")
    print(f"Accuracy: {metrics['accuracy']:.3f}")
    print(f"Cross-validation: {metrics['cv_mean']:.3f} ± {metrics['cv_std']:.3f}")
    print("\nReporte de clasificación:")
    print(metrics['classification_report'])
    print("\nImportancia de características:")
    for feat, imp in sorted(metrics['feature_importance'].items(),
                           key=lambda x: x[1], reverse=True):
        print(f"  {feat}: {imp:.3f}")

    # Guardar modelo
    classifier.save_model()
```

---

## 4. Predicción de Vida Útil Remanente (RUL)

### 4.1 Modelo de Regresión

**Prompt para modelo RUL:**

```
Genera un modelo de regresión para predecir vida útil remanente:

DATOS:
- Historial de fallos de 50 bombas similares
- Variables: vibración, temperatura, corriente, horas operación
- Objetivo: días hasta próximo fallo

MODELO:
- Gradient Boosting Regressor
- Métricas: MAE, RMSE, R²
- Intervalos de confianza (80%, 95%)

SALIDA:
- RUL estimado en días
- Intervalo de confianza
- Factores principales que afectan predicción
```

### 4.2 Visualización de RUL

```
Días hasta fallo estimado
        ▲
        │
   120 ─┼────────────────────────────────────────
        │                    ╲
   100 ─┼                     ╲  ← Intervalo 95%
        │                      ╲
    80 ─┼           ●───────────╲─────────────
        │          ╱             ╲  ← RUL actual: 65 días
    60 ─┼─────────╱               ╲
        │                          ╲
    40 ─┼                           ╲  ← Umbral mantenimiento
        │                            ╲
    20 ─┼                             ╲
        │                              ╲
     0 ─┼──────────────────────────────────────►
        t-30   t-20   t-10    t     t+10   Tiempo

    RECOMENDACIÓN: Programar mantenimiento en 3-4 semanas
```

---

## 5. Cálculo de ROI

### 5.1 Modelo de ROI

**Prompt:**

```
Calcula el ROI de implementar mantenimiento predictivo:

ESCENARIO ACTUAL (REACTIVO):
- Fallos por año: 12
- Costo promedio por fallo: $15,000
- Tiempo de parada por fallo: 24 horas
- Costo de oportunidad: $5,000/hora

ESCENARIO PROPUESTO (PREDICTIVO):
- Reducción de fallos: 75%
- Reducción tiempo parada: 60%
- Costo sistema predictivo: $50,000/año
- Implementación inicial: $100,000

CALCULAR:
1. Ahorro anual
2. ROI primer año
3. ROI años 2-5
4. Payback period
5. Análisis de sensibilidad
```

### 5.2 Tabla de ROI

| Concepto | Año 0 | Año 1 | Año 2 | Año 3 | Año 4 | Año 5 |
|----------|-------|-------|-------|-------|-------|-------|
| **Costos Reactivo** | | | | | | |
| Reparaciones ($15K × 12) | | $180,000 | $180,000 | $180,000 | $180,000 | $180,000 |
| Parada (24h × 12 × $5K) | | $1,440,000 | $1,440,000 | $1,440,000 | $1,440,000 | $1,440,000 |
| **Total Reactivo** | | **$1,620,000** | **$1,620,000** | **$1,620,000** | **$1,620,000** | **$1,620,000** |
| | | | | | | |
| **Costos Predictivo** | | | | | | |
| Implementación | $100,000 | | | | | |
| Operación anual | | $50,000 | $50,000 | $50,000 | $50,000 | $50,000 |
| Reparaciones (25%) | | $45,000 | $45,000 | $45,000 | $45,000 | $45,000 |
| Parada (40%) | | $576,000 | $576,000 | $576,000 | $576,000 | $576,000 |
| **Total Predictivo** | $100,000 | **$671,000** | **$671,000** | **$671,000** | **$671,000** | **$671,000** |
| | | | | | | |
| **Ahorro Anual** | -$100,000 | $949,000 | $949,000 | $949,000 | $949,000 | $949,000 |
| **ROI** | | **849%** | **949%** | **949%** | **949%** | **949%** |

**Payback Period:** ~1.3 meses

---

## 6. Integración en Producción

### 6.1 Arquitectura de Implementación

```
┌─────────────────────────────────────────────────────────────┐
│              Sistema de Mantenimiento Predictivo            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   CAPA DE SENSORES                   │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │   │
│  │  │Vibración│  │  Temp   │  │Corriente│  │ Presión │ │   │
│  │  │  IEPE   │  │ PT100   │  │   CT    │  │ 4-20mA  │ │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘ │   │
│  └───────┼────────────┼────────────┼────────────┼──────┘   │
│          │            │            │            │           │
│          ▼            ▼            ▼            ▼           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               GATEWAY / EDGE DEVICE                  │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │  Muestreo → Preprocesamiento → Buffer → MQTT  │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   CAPA DE DATOS                      │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐       │   │
│  │  │ InfluxDB  │  │PostgreSQL │  │   SCADA   │       │   │
│  │  │ (series)  │  │ (relac.)  │  │ Historian │       │   │
│  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘       │   │
│  └────────┼──────────────┼──────────────┼──────────────┘   │
│           │              │              │                   │
│           ▼              ▼              ▼                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  CAPA DE ML                          │   │
│  │  ┌───────────────────────────────────────────┐      │   │
│  │  │  Feature    →  Modelo   →  Predicción     │      │   │
│  │  │  Engineering   (joblib)    (API REST)     │      │   │
│  │  └───────────────────────────────────────────┘      │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               CAPA DE PRESENTACIÓN                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │Dashboard │  │ Alarmas  │  │ Reportes │          │   │
│  │  │ Grafana  │  │  Email   │  │   PDF    │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Resumen

| Tema | Aplicación de IA |
|------|------------------|
| Análisis de datos | Extracción de características, detección de patrones |
| Clasificación | Estado de salud (Normal/Atención/Alerta/Crítico) |
| Regresión | Predicción de vida útil remanente (RUL) |
| ROI | Cálculo de beneficios económicos |
| Integración | Arquitectura de sistema completo |

---

## Recursos

- [NASA Prognostics Data Repository](https://www.nasa.gov/intelligent-systems-division)
- [scikit-learn Documentation](https://scikit-learn.org/)
- [ISO 13381-1 Condition Monitoring](https://www.iso.org/standard/37096.html)
- [Predictive Maintenance Best Practices](https://www.reliabilitycentered.com/)

---

*Siguiente: Módulo 08 - Proyecto Integrador*
