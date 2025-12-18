# Módulo 03: Procesamiento de Señales con IA
## Análisis de Datos Industriales con Python

---

## Objetivos del Módulo

Al finalizar este módulo, serás capaz de:
- Aplicar técnicas de filtrado digital a señales industriales
- Implementar análisis de frecuencia con FFT
- Detectar anomalías usando algoritmos de Machine Learning
- Generar código de procesamiento con asistencia de IA

---

## 1. Fundamentos de Procesamiento Digital

### 1.1 Muestreo y Teorema de Nyquist

```
Señal Analógica              Señal Digital
      │                           │
      │    /\    /\              │ ■ ■   ■ ■
      │   /  \  /  \             │■   ■ ■   ■
      │──/────\/────\────► t     │──■─────────■──► n
      │                           │
      fs ≥ 2 × fmax              fs = frecuencia muestreo
                                  fmax = frecuencia máxima
```

**Regla de Nyquist:** Para capturar correctamente una señal, la frecuencia de muestreo debe ser al menos el doble de la frecuencia máxima de la señal.

### 1.2 Prompt para Explicar Conceptos

```
Explica el teorema de Nyquist para un ingeniero electrónico:

INCLUIR:
- Definición formal
- Por qué es importante en sistemas industriales
- Qué pasa si no se cumple (aliasing)
- Ejemplo numérico con vibración de motor

NIVEL: Intermedio, enfocado en aplicación práctica
```

---

## 2. Filtrado Digital con scipy

### 2.1 Tipos de Filtros

| Tipo | Aplicación Industrial | Característica |
|------|----------------------|----------------|
| Paso bajo | Suavizar ruido de sensores | Atenúa alta frecuencia |
| Paso alto | Eliminar offset/drift | Atenúa baja frecuencia |
| Paso banda | Aislar frecuencia específica | Permite rango |
| Notch | Eliminar 50/60 Hz | Rechaza frecuencia |

### 2.2 Filtro Butterworth

**Prompt para generar código:**

```
Genera función Python para filtro Butterworth paso bajo:

PARÁMETROS:
- data: array de datos a filtrar
- cutoff: frecuencia de corte en Hz
- fs: frecuencia de muestreo en Hz
- order: orden del filtro (default 4)

REQUISITOS:
- Usar scipy.signal
- Filtro de fase cero (filtfilt)
- Manejar errores (cutoff > nyquist)
- Documentación con docstring

INCLUIR:
- Función principal
- Ejemplo de uso
- Gráfico comparativo antes/después
```

**Código resultante:**

```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

def butter_lowpass(data, cutoff, fs, order=4):
    """
    Aplica filtro Butterworth paso bajo.

    Parámetros:
    -----------
    data : array-like
        Señal a filtrar
    cutoff : float
        Frecuencia de corte en Hz
    fs : float
        Frecuencia de muestreo en Hz
    order : int
        Orden del filtro (default 4)

    Retorna:
    --------
    np.array
        Señal filtrada
    """
    nyq = 0.5 * fs
    if cutoff >= nyq:
        raise ValueError(f"Cutoff ({cutoff} Hz) debe ser menor que Nyquist ({nyq} Hz)")

    normal_cutoff = cutoff / nyq
    b, a = signal.butter(order, normal_cutoff, btype='low', analog=False)

    # filtfilt aplica filtro hacia adelante y atrás (fase cero)
    filtered = signal.filtfilt(b, a, data)

    return filtered


# Ejemplo de uso
if __name__ == "__main__":
    # Generar señal de prueba
    fs = 1000  # 1 kHz
    t = np.linspace(0, 1, fs)

    # Señal: 10 Hz + ruido de alta frecuencia
    clean_signal = np.sin(2 * np.pi * 10 * t)
    noise = 0.5 * np.random.randn(len(t))
    noisy_signal = clean_signal + noise

    # Filtrar
    filtered = butter_lowpass(noisy_signal, cutoff=20, fs=fs)

    # Graficar
    plt.figure(figsize=(12, 6))

    plt.subplot(2, 1, 1)
    plt.plot(t, noisy_signal, 'b', alpha=0.5, label='Señal ruidosa')
    plt.plot(t, clean_signal, 'r', linewidth=2, label='Señal original')
    plt.legend()
    plt.xlabel('Tiempo (s)')
    plt.ylabel('Amplitud')
    plt.title('Señal Original')

    plt.subplot(2, 1, 2)
    plt.plot(t, filtered, 'g', linewidth=2, label='Señal filtrada')
    plt.plot(t, clean_signal, 'r--', alpha=0.7, label='Señal original')
    plt.legend()
    plt.xlabel('Tiempo (s)')
    plt.ylabel('Amplitud')
    plt.title('Después de Filtro Paso Bajo (20 Hz)')

    plt.tight_layout()
    plt.show()
```

### 2.3 Filtro Notch para Eliminar 50/60 Hz

```python
def notch_filter(data, freq, fs, Q=30):
    """
    Filtro notch para eliminar frecuencia específica (ej: 50/60 Hz).

    Parámetros:
    -----------
    data : array-like
        Señal a filtrar
    freq : float
        Frecuencia a eliminar en Hz
    fs : float
        Frecuencia de muestreo en Hz
    Q : float
        Factor de calidad (ancho de banda = freq/Q)
    """
    nyq = 0.5 * fs
    w0 = freq / nyq

    b, a = signal.iirnotch(w0, Q)
    filtered = signal.filtfilt(b, a, data)

    return filtered
```

---

## 3. Análisis de Frecuencia (FFT)

### 3.1 Transformada de Fourier

```
Dominio del Tiempo              Dominio de Frecuencia
      │                              │
      │   ╱╲   ╱╲                   │       ■
      │  ╱  ╲ ╱  ╲                  │       │
      │─╱────╳────╲──► t           │───────┼──────► f
      │                              │
  Señal oscilante               Pico en frecuencia
```

### 3.2 Código para FFT

```python
def compute_fft(data, fs):
    """
    Calcula FFT de una señal.

    Retorna:
    --------
    tuple (freqs, magnitudes)
        freqs: array de frecuencias
        magnitudes: magnitudes normalizadas
    """
    n = len(data)
    freqs = np.fft.fftfreq(n, 1/fs)[:n//2]
    fft_vals = np.fft.fft(data)
    magnitudes = 2.0/n * np.abs(fft_vals[:n//2])

    return freqs, magnitudes


def plot_spectrum(data, fs, title="Espectro de Frecuencia"):
    """Grafica el espectro de frecuencia."""
    freqs, mags = compute_fft(data, fs)

    plt.figure(figsize=(10, 4))
    plt.plot(freqs, mags)
    plt.xlabel('Frecuencia (Hz)')
    plt.ylabel('Magnitud')
    plt.title(title)
    plt.grid(True)
    plt.show()

    # Encontrar picos
    peaks_idx = signal.find_peaks(mags, height=0.1)[0]
    print("Frecuencias dominantes:")
    for idx in peaks_idx[:5]:
        print(f"  {freqs[idx]:.1f} Hz (magnitud: {mags[idx]:.3f})")
```

### 3.3 Espectrograma (Análisis Tiempo-Frecuencia)

```python
def plot_spectrogram(data, fs, nperseg=256):
    """
    Genera espectrograma de la señal.

    Útil para ver cómo cambian las frecuencias en el tiempo.
    """
    f, t, Sxx = signal.spectrogram(data, fs, nperseg=nperseg)

    plt.figure(figsize=(12, 4))
    plt.pcolormesh(t, f, 10*np.log10(Sxx), shading='gouraud')
    plt.ylabel('Frecuencia (Hz)')
    plt.xlabel('Tiempo (s)')
    plt.title('Espectrograma')
    plt.colorbar(label='Potencia (dB)')
    plt.show()
```

---

## 4. Detección de Anomalías

### 4.1 Métodos Estadísticos

```python
def detect_anomalies_zscore(data, threshold=3):
    """
    Detecta anomalías usando Z-score.

    Puntos con |z| > threshold se consideran anomalías.
    """
    mean = np.mean(data)
    std = np.std(data)
    z_scores = np.abs((data - mean) / std)

    anomalies = z_scores > threshold
    return anomalies, z_scores


def detect_anomalies_iqr(data, k=1.5):
    """
    Detecta anomalías usando IQR (Interquartile Range).

    Más robusto que Z-score para datos con outliers.
    """
    Q1 = np.percentile(data, 25)
    Q3 = np.percentile(data, 75)
    IQR = Q3 - Q1

    lower = Q1 - k * IQR
    upper = Q3 + k * IQR

    anomalies = (data < lower) | (data > upper)
    return anomalies, (lower, upper)
```

### 4.2 Isolation Forest

**Prompt para generar detector:**

```
Genera clase Python para detección de anomalías con Isolation Forest:

APLICACIÓN: Datos de sensores industriales (temperatura, vibración, corriente)

FUNCIONALIDADES:
1. Entrenar con datos normales
2. Detectar anomalías en datos nuevos
3. Visualizar resultados
4. Reportar estadísticas

INCLUIR:
- Normalización de datos (StandardScaler)
- Manejo de múltiples variables
- Umbral configurable (contamination)
- Ejemplo con datos sintéticos
```

**Código resultante:**

```python
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import pandas as pd

class AnomalyDetector:
    """
    Detector de anomalías para datos industriales.

    Usa Isolation Forest, ideal para:
    - Datos sin etiquetas (no supervisado)
    - Alta dimensionalidad
    - Anomalías son minoría
    """

    def __init__(self, contamination=0.05, random_state=42):
        """
        Parámetros:
        -----------
        contamination : float
            Proporción esperada de anomalías (0.01 a 0.5)
        """
        self.contamination = contamination
        self.scaler = StandardScaler()
        self.model = IsolationForest(
            contamination=contamination,
            random_state=random_state,
            n_estimators=100
        )
        self.is_fitted = False

    def fit(self, data):
        """
        Entrenar con datos (idealmente normales).

        data: DataFrame o array con features
        """
        if isinstance(data, pd.DataFrame):
            data = data.values

        X_scaled = self.scaler.fit_transform(data)
        self.model.fit(X_scaled)
        self.is_fitted = True

        return self

    def predict(self, data):
        """
        Detectar anomalías.

        Retorna:
        --------
        array de booleanos (True = anomalía)
        """
        if not self.is_fitted:
            raise RuntimeError("Modelo no entrenado. Llamar fit() primero.")

        if isinstance(data, pd.DataFrame):
            data = data.values

        X_scaled = self.scaler.transform(data)
        predictions = self.model.predict(X_scaled)

        # Isolation Forest: -1 = anomalía, 1 = normal
        return predictions == -1

    def decision_scores(self, data):
        """
        Obtener scores de anomalía (más negativo = más anómalo).
        """
        if isinstance(data, pd.DataFrame):
            data = data.values

        X_scaled = self.scaler.transform(data)
        return self.model.decision_function(X_scaled)

    def report(self, data, labels=None):
        """Generar reporte de detección."""
        anomalies = self.predict(data)
        scores = self.decision_scores(data)

        print("=== REPORTE DE ANOMALÍAS ===")
        print(f"Total muestras: {len(data)}")
        print(f"Anomalías detectadas: {anomalies.sum()}")
        print(f"Porcentaje: {100*anomalies.mean():.2f}%")
        print(f"Score mínimo: {scores.min():.3f}")
        print(f"Score máximo: {scores.max():.3f}")

        return {
            'anomalies': anomalies,
            'scores': scores,
            'count': anomalies.sum()
        }


# Ejemplo de uso
if __name__ == "__main__":
    # Generar datos sintéticos
    np.random.seed(42)
    n_samples = 1000

    # Datos normales
    normal_data = np.column_stack([
        np.random.normal(50, 5, n_samples),      # Temperatura
        np.random.normal(2.5, 0.5, n_samples),   # Vibración
        np.random.normal(10, 1, n_samples)       # Corriente
    ])

    # Agregar algunas anomalías
    n_anomalies = 50
    anomaly_data = np.column_stack([
        np.random.normal(80, 5, n_anomalies),    # Temp alta
        np.random.normal(8, 1, n_anomalies),     # Vib alta
        np.random.normal(20, 2, n_anomalies)     # Corriente alta
    ])

    # Combinar
    all_data = np.vstack([normal_data, anomaly_data])
    np.random.shuffle(all_data)

    # Crear detector
    detector = AnomalyDetector(contamination=0.05)
    detector.fit(all_data)

    # Detectar
    result = detector.report(all_data)
```

---

## 5. Aplicación: Análisis de Vibración

### 5.1 Prompt para Sistema Completo

```
Genera sistema completo de análisis de vibración:

DATOS:
- Frecuencia muestreo: 10 kHz
- Duración: 10 segundos
- Acelerómetro 3 ejes (X, Y, Z)

ANÁLISIS REQUERIDO:
1. Cargar datos de CSV
2. Filtrar ruido (paso bajo 1 kHz)
3. Calcular RMS de cada eje
4. FFT para identificar frecuencias
5. Detectar anomalías

FRECUENCIAS DE INTERÉS (rodamientos):
- BPFO: 89 Hz
- BPFI: 147 Hz
- BSF: 58 Hz

SALIDA:
- Reporte con diagnóstico
- Gráficos de tendencia y espectro
- Alertas si hay picos en frecuencias críticas
```

### 5.2 Código de Análisis Integrado

```python
class VibrationAnalyzer:
    """Analizador de vibraciones para mantenimiento predictivo."""

    def __init__(self, fs=10000):
        self.fs = fs
        self.bearing_freqs = {}

    def set_bearing_frequencies(self, rpm, n_balls, d_ball, d_pitch, angle=0):
        """
        Calcular frecuencias de defectos de rodamiento.

        rpm: velocidad de rotación
        n_balls: número de elementos rodantes
        d_ball: diámetro de bola
        d_pitch: diámetro primitivo
        angle: ángulo de contacto (grados)
        """
        fr = rpm / 60  # Frecuencia de rotación
        cos_a = np.cos(np.radians(angle))
        ratio = d_ball / d_pitch

        self.bearing_freqs = {
            'BPFO': (n_balls / 2) * fr * (1 - ratio * cos_a),
            'BPFI': (n_balls / 2) * fr * (1 + ratio * cos_a),
            'BSF': (d_pitch / (2 * d_ball)) * fr * (1 - (ratio * cos_a)**2),
            'FTF': (fr / 2) * (1 - ratio * cos_a)
        }

        print("Frecuencias de defecto calculadas:")
        for name, freq in self.bearing_freqs.items():
            print(f"  {name}: {freq:.1f} Hz")

    def analyze(self, data, channel='magnitude'):
        """
        Análisis completo de vibración.
        """
        if len(data.shape) == 1:
            signal = data
        else:
            # Calcular magnitud
            signal = np.sqrt(np.sum(data**2, axis=1))

        # 1. Estadísticas temporales
        stats = {
            'rms': np.sqrt(np.mean(signal**2)),
            'peak': np.max(np.abs(signal)),
            'crest_factor': np.max(np.abs(signal)) / np.sqrt(np.mean(signal**2)),
            'kurtosis': self._kurtosis(signal)
        }

        # 2. Análisis de frecuencia
        freqs, mags = compute_fft(signal, self.fs)
        dominant_freqs = self._find_peaks(freqs, mags)

        # 3. Verificar frecuencias de rodamiento
        bearing_alerts = self._check_bearing_freqs(freqs, mags)

        return {
            'stats': stats,
            'spectrum': (freqs, mags),
            'dominant_frequencies': dominant_freqs,
            'bearing_alerts': bearing_alerts
        }

    def _kurtosis(self, x):
        """Calcular kurtosis (indicador de impactos)."""
        mean = np.mean(x)
        std = np.std(x)
        return np.mean(((x - mean) / std) ** 4)

    def _find_peaks(self, freqs, mags, n=5):
        """Encontrar frecuencias dominantes."""
        peaks_idx = signal.find_peaks(mags, height=np.max(mags)*0.1)[0]
        sorted_idx = peaks_idx[np.argsort(mags[peaks_idx])[::-1]]

        result = []
        for idx in sorted_idx[:n]:
            result.append({
                'frequency': freqs[idx],
                'magnitude': mags[idx]
            })
        return result

    def _check_bearing_freqs(self, freqs, mags, tolerance=5):
        """Verificar si hay energía en frecuencias de defecto."""
        alerts = []

        for name, freq in self.bearing_freqs.items():
            # Buscar en rango ±tolerance Hz
            mask = (freqs >= freq - tolerance) & (freqs <= freq + tolerance)
            if mask.any():
                max_mag = mags[mask].max()
                avg_mag = mags.mean()

                if max_mag > 3 * avg_mag:  # 3x promedio
                    alerts.append({
                        'defect': name,
                        'frequency': freq,
                        'magnitude': max_mag,
                        'severity': 'HIGH' if max_mag > 5 * avg_mag else 'MEDIUM'
                    })

        return alerts
```

---

## 6. Prompts Útiles para Procesamiento

### 6.1 Filtrado

```
Diseña filtro para eliminar ruido de sensor industrial:
- Señal: presión de proceso (0-10 bar)
- Muestreo: 100 Hz
- Ruido: componentes de 50 Hz (EMI) y alta frecuencia
- Dinámica de proceso: cambios lentos (máx 0.5 Hz)
```

### 6.2 Detección de Patrones

```
Implementa detector de patrones en datos de corriente de motor:
- Detectar arranques (pico de corriente)
- Detectar paradas
- Detectar sobrecarga sostenida (>120% por >5 segundos)
- Generar eventos con timestamp
```

---

## Resumen

En este módulo aprendimos:

1. **Filtrado digital** con scipy (Butterworth, notch)
2. **Análisis de frecuencia** con FFT
3. **Detección de anomalías** con Z-score e Isolation Forest
4. **Análisis de vibración** para mantenimiento predictivo

### Próximo Módulo

En el Módulo 04 aplicaremos IA para diseño de circuitos electrónicos.

---

*Módulo 03 - Procesamiento de Señales*
*Duración: 2 horas*
