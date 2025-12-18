# Ejercicio Práctico - Módulo 03
## Detección de Vibraciones Anómalas con ML

---

## Objetivo

Desarrollar un sistema de detección de anomalías en señales de vibración utilizando Python, bibliotecas de ML, y asistencia de IA para análisis y clasificación.

**Duración:** 15 minutos
**Tipo:** Práctico guiado
**Requisitos:** Python 3.x, Jupyter Notebook o VS Code

---

## Descripción del Proyecto

Crear un sistema que:
1. Capture datos de vibración de un acelerómetro
2. Aplique filtrado digital para limpiar la señal
3. Extraiga características relevantes (RMS, frecuencia dominante)
4. Detecte anomalías usando algoritmos de ML
5. Visualice resultados en tiempo real

---

## Parte 1: Preparación del Entorno (3 minutos)

### Paso 1.1: Crear Entorno Virtual

```bash
# Crear entorno virtual
python -m venv vibraciones_env

# Activar (Windows)
vibraciones_env\Scripts\activate

# Activar (Linux/Mac)
source vibraciones_env/bin/activate
```

### Paso 1.2: Instalar Dependencias

```bash
pip install numpy pandas scipy scikit-learn matplotlib
pip install pyserial  # Si usas Arduino real
```

### Paso 1.3: Crear Estructura del Proyecto

```
detector_vibraciones/
├── main.py
├── signal_processing.py
├── anomaly_detector.py
├── visualizer.py
└── data/
    └── sample_vibration.csv
```

---

## Parte 2: Generación de Datos de Prueba (3 minutos)

### Paso 2.1: Generar Datos Sintéticos con IA

Usa el siguiente prompt en Copilot o Claude:

```
Genera una función Python que cree datos sintéticos de vibración:
- Frecuencia de muestreo: 1000 Hz
- Duración: 10 segundos
- Componente normal: senoidal 50 Hz + ruido gaussiano
- Componente anómalo: pulsos de alta frecuencia (500 Hz)
  en intervalos aleatorios (simular golpes)
- Retornar: array de tiempo, array de amplitud, array de etiquetas (0=normal, 1=anomalía)
```

### Paso 2.2: Implementar Generador

```python
# data_generator.py
import numpy as np

def generate_vibration_data(duration=10, fs=1000, anomaly_probability=0.05):
    """
    Genera datos sintéticos de vibración con anomalías.

    Args:
        duration: Duración en segundos
        fs: Frecuencia de muestreo en Hz
        anomaly_probability: Probabilidad de anomalía por muestra

    Returns:
        t: Array de tiempo
        signal: Array de señal de vibración
        labels: Array de etiquetas (0=normal, 1=anomalía)
    """
    # Solicita a IA que complete esta función
    pass
```

Evalúa el código generado:

| Aspecto | ¿Correcto? | Observaciones |
|---------|------------|---------------|
| Usa numpy correctamente | | |
| Genera señal base realista | | |
| Añade ruido apropiado | | |
| Introduce anomalías | | |
| Retorna etiquetas correctas | | |

---

## Parte 3: Procesamiento de Señales (4 minutos)

### Paso 3.1: Implementar Filtros con IA

Solicita a la IA:

```
Implementa una clase SignalProcessor en Python con:
1. Filtro Butterworth pasa-bajos (corte: 200 Hz)
2. Filtro notch para eliminar 50/60 Hz
3. Cálculo de FFT con picos de frecuencia
4. Cálculo de RMS en ventanas deslizantes (100 muestras)
5. Extracción de características: [rms, freq_dominante, amplitud_pico, kurtosis]

Usar scipy.signal y scipy.fft
```

### Paso 3.2: Verificar Implementación

```python
# signal_processing.py
from scipy import signal
from scipy.fft import fft, fftfreq
import numpy as np

class SignalProcessor:
    def __init__(self, fs=1000):
        self.fs = fs

    def apply_lowpass(self, data, cutoff=200, order=5):
        """Aplica filtro pasa-bajos Butterworth."""
        # Código generado por IA
        pass

    def apply_notch(self, data, freq=50, q=30):
        """Elimina interferencia de línea eléctrica."""
        pass

    def compute_fft(self, data):
        """Calcula FFT y retorna frecuencias dominantes."""
        pass

    def extract_features(self, data, window_size=100):
        """Extrae características para ML."""
        pass
```

### Paso 3.3: Validar Filtros

Crea un script de prueba:

```python
# test_filters.py
import matplotlib.pyplot as plt
from data_generator import generate_vibration_data
from signal_processing import SignalProcessor

# Generar datos
t, signal_raw, labels = generate_vibration_data()

# Procesar
processor = SignalProcessor(fs=1000)
signal_filtered = processor.apply_lowpass(signal_raw)

# Visualizar
fig, axes = plt.subplots(2, 1, figsize=(12, 6))
axes[0].plot(t[:1000], signal_raw[:1000], label='Original')
axes[0].set_title('Señal Original')
axes[1].plot(t[:1000], signal_filtered[:1000], label='Filtrada')
axes[1].set_title('Señal Filtrada')
plt.tight_layout()
plt.savefig('filtros_test.png')
```

---

## Parte 4: Detector de Anomalías (3 minutos)

### Paso 4.1: Implementar Detector con ML

Solicita a la IA:

```
Implementa una clase AnomalyDetector con:
1. Detección por umbral de Z-score (threshold=3)
2. Isolation Forest de scikit-learn
3. Detección CUSUM para cambios graduales
4. Método ensemble que combine los tres
5. Método fit() para entrenamiento
6. Método predict() que retorne etiquetas y scores

Incluir: validación cruzada, métricas (precision, recall, F1)
```

### Paso 4.2: Código Base

```python
# anomaly_detector.py
from sklearn.ensemble import IsolationForest
from sklearn.metrics import precision_score, recall_score, f1_score
import numpy as np

class AnomalyDetector:
    def __init__(self, method='ensemble'):
        self.method = method
        self.zscore_threshold = 3
        self.iso_forest = IsolationForest(contamination=0.05, random_state=42)

    def fit(self, X_train):
        """Entrena el detector con datos normales."""
        pass

    def predict(self, X):
        """Predice anomalías."""
        pass

    def _zscore_detect(self, X):
        """Detección por Z-score."""
        pass

    def _isolation_forest_detect(self, X):
        """Detección con Isolation Forest."""
        pass

    def _cusum_detect(self, X, threshold=5, drift=0.1):
        """Detección CUSUM."""
        pass

    def evaluate(self, y_true, y_pred):
        """Calcula métricas de evaluación."""
        pass
```

### Paso 4.3: Entrenar y Evaluar

```python
# main.py
from data_generator import generate_vibration_data
from signal_processing import SignalProcessor
from anomaly_detector import AnomalyDetector

# Generar datos
t, raw_signal, true_labels = generate_vibration_data(duration=60)

# Procesar
processor = SignalProcessor()
features = processor.extract_features(raw_signal)

# Dividir datos
train_size = int(len(features) * 0.7)
X_train = features[:train_size]
X_test = features[train_size:]
y_test = true_labels[train_size:]

# Entrenar y evaluar
detector = AnomalyDetector(method='ensemble')
detector.fit(X_train)
predictions = detector.predict(X_test)

# Métricas
metrics = detector.evaluate(y_test, predictions)
print(f"Precision: {metrics['precision']:.3f}")
print(f"Recall: {metrics['recall']:.3f}")
print(f"F1-Score: {metrics['f1']:.3f}")
```

---

## Parte 5: Visualización (2 minutos)

### Paso 5.1: Dashboard con IA

Solicita a la IA:

```
Crea una función create_dashboard() que genere una figura matplotlib con:
1. Panel superior: Señal de vibración con anomalías marcadas en rojo
2. Panel medio: FFT mostrando espectro de frecuencias
3. Panel inferior: Score de anomalía vs tiempo con umbral
4. Usar estilo profesional, guardar como PNG y PDF

Agregar: título, leyendas, ejes etiquetados en español
```

### Paso 5.2: Generar Reporte

```python
# visualizer.py
import matplotlib.pyplot as plt
import numpy as np

def create_dashboard(t, signal, predictions, scores, fft_freq, fft_amp,
                     output_path='dashboard.png'):
    """
    Genera dashboard de análisis de vibraciones.
    """
    fig, axes = plt.subplots(3, 1, figsize=(14, 10))

    # Panel 1: Señal con anomalías
    # ...código generado por IA...

    # Panel 2: FFT
    # ...código generado por IA...

    # Panel 3: Scores
    # ...código generado por IA...

    plt.tight_layout()
    plt.savefig(output_path, dpi=150)
    plt.savefig(output_path.replace('.png', '.pdf'))

    return fig
```

---

## Entregables

### Archivos a Entregar

1. **Código Python completo** (4 archivos .py)
2. **Dashboard generado** (PNG y PDF)
3. **Tabla de métricas** (precision, recall, F1)
4. **Análisis escrito** respondiendo:
   - ¿Qué método detectó mejor las anomalías?
   - ¿Qué mejorarías del código generado por IA?
   - ¿Cómo adaptarías esto para datos reales?

### Estructura de Entrega

```
M03_Ejercicio_[TuApellido]/
├── src/
│   ├── main.py
│   ├── data_generator.py
│   ├── signal_processing.py
│   ├── anomaly_detector.py
│   └── visualizer.py
├── output/
│   ├── dashboard.png
│   └── dashboard.pdf
├── metricas.md
└── analisis.md
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Generación de datos funcional | 15 | Datos sintéticos correctos |
| Filtros implementados | 20 | Pasa-bajos y notch funcionando |
| Extracción de características | 20 | 4+ características extraídas |
| Detector de anomalías | 25 | Al menos 2 métodos funcionando |
| Visualización profesional | 10 | Dashboard legible y completo |
| Métricas reportadas | 10 | Precision, recall, F1 calculados |
| **Total** | **100** | |

---

## Extensión: Datos Reales

Si tienes un Arduino con acelerómetro (MPU6050, ADXL345):

```
Prompt para IA:
"Genera código Python que:
1. Lea datos del puerto serial desde Arduino
2. Parse formato: timestamp,ax,ay,az
3. Calcule magnitud de aceleración
4. Alimente al detector de anomalías en tiempo real
5. Actualice el dashboard cada segundo
Usar threading para no bloquear la lectura."
```

---

*Módulo 03 - IA para Procesamiento de Señales*
*Tiempo estimado: 15 minutos*
