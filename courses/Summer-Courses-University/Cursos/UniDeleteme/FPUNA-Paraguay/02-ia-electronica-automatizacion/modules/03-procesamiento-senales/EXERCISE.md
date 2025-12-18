# Ejercicio Práctico - Módulo 03
## Análisis de Vibración para Detección de Fallas

---

## Objetivo

Desarrollar un sistema de análisis de vibración que detecte anomalías en datos de sensores industriales utilizando técnicas de procesamiento de señales y Machine Learning.

**Duración:** 25 minutos
**Tipo:** Práctico guiado con código
**Herramientas:** Python, Jupyter Notebook, Claude/ChatGPT

---

## Descripción del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                 ANÁLISIS DE VIBRACIÓN                        │
│                                                              │
│   DATOS CSV                    PROCESAMIENTO                │
│   ┌─────────┐                  ┌─────────────┐              │
│   │ tiempo  │                  │  FILTRADO   │              │
│   │ vib_x   │ ──────────────►  │  (Lowpass)  │              │
│   │ vib_y   │                  └──────┬──────┘              │
│   │ vib_z   │                         │                     │
│   └─────────┘                         ▼                     │
│                                ┌─────────────┐              │
│                                │    FFT      │              │
│                                │ (Espectro)  │              │
│                                └──────┬──────┘              │
│                                       │                     │
│                                       ▼                     │
│                                ┌─────────────┐              │
│   REPORTE                      │  ANOMALÍA   │              │
│   ┌─────────┐                  │ (Isolation  │              │
│   │ RMS     │ ◄─────────────── │  Forest)    │              │
│   │ Picos   │                  └─────────────┘              │
│   │ Alertas │                                               │
│   └─────────┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Parte 1: Preparación del Entorno (5 minutos)

### Paso 1.1: Crear Notebook

1. Abrir Jupyter Notebook o VS Code con extensión Jupyter
2. Crear nuevo notebook: `vibracion_analisis.ipynb`

### Paso 1.2: Instalar Dependencias

```python
# Celda 1: Instalación (ejecutar una vez)
!pip install numpy pandas scipy scikit-learn matplotlib
```

### Paso 1.3: Imports

```python
# Celda 2: Imports
import numpy as np
import pandas as pd
from scipy import signal
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Configuración de gráficos
plt.rcParams['figure.figsize'] = [12, 4]
plt.rcParams['figure.dpi'] = 100

print("Librerías cargadas correctamente")
```

---

## Parte 2: Generación de Datos Sintéticos (5 minutos)

### Paso 2.1: Solicitar Generador a la IA

Envía este prompt:

```
Genera código Python para crear datos sintéticos de vibración:

PARÁMETROS:
- Duración: 10 segundos
- Frecuencia muestreo: 1000 Hz
- 3 ejes (x, y, z)

CONTENIDO:
1. Vibración normal: componente de 50 Hz + ruido
2. Eventos anómalos (5% de los datos):
   - Picos de impacto
   - Incremento gradual de amplitud

SALIDA:
- DataFrame con columnas: tiempo, vib_x, vib_y, vib_z, is_anomaly
- Función que retorne el DataFrame

Incluir visualización de los datos generados.
```

### Paso 2.2: Código del Generador

```python
# Celda 3: Generador de datos
def generate_vibration_data(duration=10, fs=1000, anomaly_ratio=0.05):
    """
    Genera datos sintéticos de vibración.

    Parámetros:
    -----------
    duration : float
        Duración en segundos
    fs : int
        Frecuencia de muestreo en Hz
    anomaly_ratio : float
        Proporción de datos anómalos

    Retorna:
    --------
    pd.DataFrame
        Datos de vibración con etiquetas
    """
    np.random.seed(42)
    n_samples = int(duration * fs)
    t = np.linspace(0, duration, n_samples)

    # Señal base: vibración normal (rotación a 3000 RPM = 50 Hz)
    freq_rotation = 50
    vib_base_x = 2.0 * np.sin(2 * np.pi * freq_rotation * t)
    vib_base_y = 1.5 * np.sin(2 * np.pi * freq_rotation * t + np.pi/4)
    vib_base_z = 1.0 * np.sin(2 * np.pi * freq_rotation * t + np.pi/2)

    # Agregar ruido
    noise_level = 0.5
    vib_x = vib_base_x + noise_level * np.random.randn(n_samples)
    vib_y = vib_base_y + noise_level * np.random.randn(n_samples)
    vib_z = vib_base_z + noise_level * np.random.randn(n_samples)

    # Inicializar etiquetas
    is_anomaly = np.zeros(n_samples, dtype=bool)

    # Agregar anomalías
    n_anomalies = int(n_samples * anomaly_ratio)

    # Tipo 1: Picos de impacto
    impact_indices = np.random.choice(n_samples, size=n_anomalies//2, replace=False)
    vib_x[impact_indices] += np.random.uniform(5, 10, len(impact_indices))
    vib_y[impact_indices] += np.random.uniform(4, 8, len(impact_indices))
    is_anomaly[impact_indices] = True

    # Tipo 2: Segmento con alta vibración (desbalance)
    start_idx = int(0.6 * n_samples)
    end_idx = start_idx + int(0.1 * n_samples)
    vib_x[start_idx:end_idx] *= 2.5
    vib_y[start_idx:end_idx] *= 2.5
    is_anomaly[start_idx:end_idx] = True

    # Crear DataFrame
    df = pd.DataFrame({
        'tiempo': t,
        'vib_x': vib_x,
        'vib_y': vib_y,
        'vib_z': vib_z,
        'is_anomaly': is_anomaly
    })

    return df

# Generar datos
df = generate_vibration_data()
print(f"Datos generados: {len(df)} muestras")
print(f"Anomalías reales: {df['is_anomaly'].sum()} ({100*df['is_anomaly'].mean():.1f}%)")
```

### Paso 2.3: Visualizar Datos

```python
# Celda 4: Visualización
fig, axes = plt.subplots(3, 1, figsize=(14, 8), sharex=True)

for i, col in enumerate(['vib_x', 'vib_y', 'vib_z']):
    ax = axes[i]
    ax.plot(df['tiempo'], df[col], 'b-', alpha=0.7, linewidth=0.5)

    # Marcar anomalías
    anomaly_mask = df['is_anomaly']
    ax.scatter(df.loc[anomaly_mask, 'tiempo'],
               df.loc[anomaly_mask, col],
               c='red', s=5, alpha=0.5, label='Anomalía')

    ax.set_ylabel(f'{col} (mm/s)')
    ax.legend(loc='upper right')
    ax.grid(True, alpha=0.3)

axes[-1].set_xlabel('Tiempo (s)')
plt.suptitle('Datos de Vibración con Anomalías Marcadas')
plt.tight_layout()
plt.show()
```

---

## Parte 3: Procesamiento de Señales (8 minutos)

### Paso 3.1: Implementar Filtro

Solicita a la IA:

```
Genera función para filtrar señal de vibración:
- Filtro Butterworth paso bajo
- Frecuencia de corte: 200 Hz
- Frecuencia de muestreo: 1000 Hz
- Orden: 4
- Usar filtfilt para fase cero
```

```python
# Celda 5: Filtrado
def apply_lowpass_filter(data, cutoff=200, fs=1000, order=4):
    """Aplica filtro paso bajo a los datos."""
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    b, a = signal.butter(order, normal_cutoff, btype='low')
    return signal.filtfilt(b, a, data)

# Aplicar filtro
df['vib_x_filt'] = apply_lowpass_filter(df['vib_x'].values)
df['vib_y_filt'] = apply_lowpass_filter(df['vib_y'].values)
df['vib_z_filt'] = apply_lowpass_filter(df['vib_z'].values)

print("Filtrado aplicado")
```

### Paso 3.2: Análisis FFT

```python
# Celda 6: FFT
def compute_fft(data, fs):
    """Calcula FFT de la señal."""
    n = len(data)
    freqs = np.fft.fftfreq(n, 1/fs)[:n//2]
    fft_vals = np.fft.fft(data)
    magnitudes = 2.0/n * np.abs(fft_vals[:n//2])
    return freqs, magnitudes

# Calcular FFT de cada eje
fs = 1000
freqs, fft_x = compute_fft(df['vib_x_filt'].values, fs)
_, fft_y = compute_fft(df['vib_y_filt'].values, fs)
_, fft_z = compute_fft(df['vib_z_filt'].values, fs)

# Graficar espectro
fig, ax = plt.subplots(figsize=(12, 4))
ax.plot(freqs, fft_x, label='X', alpha=0.7)
ax.plot(freqs, fft_y, label='Y', alpha=0.7)
ax.plot(freqs, fft_z, label='Z', alpha=0.7)
ax.set_xlabel('Frecuencia (Hz)')
ax.set_ylabel('Magnitud')
ax.set_title('Espectro de Frecuencia')
ax.set_xlim(0, 200)
ax.legend()
ax.grid(True, alpha=0.3)
plt.show()

# Encontrar frecuencia dominante
peak_idx = np.argmax(fft_x)
print(f"Frecuencia dominante: {freqs[peak_idx]:.1f} Hz")
```

### Paso 3.3: Calcular Features

```python
# Celda 7: Extracción de características
def extract_features(df, window_size=100):
    """
    Extrae características en ventanas.

    Features:
    - RMS de cada eje
    - Valor pico
    - Factor de cresta
    """
    features = []

    for start in range(0, len(df) - window_size, window_size):
        end = start + window_size
        window = df.iloc[start:end]

        # RMS
        rms_x = np.sqrt(np.mean(window['vib_x_filt']**2))
        rms_y = np.sqrt(np.mean(window['vib_y_filt']**2))
        rms_z = np.sqrt(np.mean(window['vib_z_filt']**2))

        # Pico
        peak_x = np.max(np.abs(window['vib_x_filt']))
        peak_y = np.max(np.abs(window['vib_y_filt']))

        # Factor de cresta
        crest_x = peak_x / rms_x if rms_x > 0 else 0

        # Etiqueta (si hay alguna anomalía en la ventana)
        has_anomaly = window['is_anomaly'].any()

        features.append({
            'window_start': start,
            'rms_x': rms_x,
            'rms_y': rms_y,
            'rms_z': rms_z,
            'peak_x': peak_x,
            'peak_y': peak_y,
            'crest_factor': crest_x,
            'is_anomaly': has_anomaly
        })

    return pd.DataFrame(features)

# Extraer features
df_features = extract_features(df)
print(f"Features extraídos: {len(df_features)} ventanas")
print(f"Ventanas con anomalía: {df_features['is_anomaly'].sum()}")
df_features.head()
```

---

## Parte 4: Detección de Anomalías (7 minutos)

### Paso 4.1: Entrenar Isolation Forest

```python
# Celda 8: Entrenamiento
# Preparar datos para el modelo
feature_cols = ['rms_x', 'rms_y', 'rms_z', 'peak_x', 'peak_y', 'crest_factor']
X = df_features[feature_cols].values

# Normalizar
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Entrenar Isolation Forest
model = IsolationForest(
    contamination=0.1,  # Esperamos ~10% anomalías
    random_state=42,
    n_estimators=100
)
model.fit(X_scaled)

# Predecir
predictions = model.predict(X_scaled)  # 1 = normal, -1 = anomalía
df_features['predicted_anomaly'] = predictions == -1

print("Modelo entrenado")
```

### Paso 4.2: Evaluar Resultados

```python
# Celda 9: Evaluación
from sklearn.metrics import classification_report, confusion_matrix

# Comparar predicciones con etiquetas reales
y_true = df_features['is_anomaly'].values
y_pred = df_features['predicted_anomaly'].values

print("=== MATRIZ DE CONFUSIÓN ===")
print(confusion_matrix(y_true, y_pred))
print()
print("=== REPORTE DE CLASIFICACIÓN ===")
print(classification_report(y_true, y_pred,
                           target_names=['Normal', 'Anomalía']))
```

### Paso 4.3: Visualizar Detección

```python
# Celda 10: Visualización de resultados
fig, axes = plt.subplots(2, 1, figsize=(14, 8))

# Gráfico 1: RMS con detecciones
ax1 = axes[0]
time_windows = df_features['window_start'] / 1000  # Convertir a segundos

ax1.plot(time_windows, df_features['rms_x'], 'b-', label='RMS X')
ax1.plot(time_windows, df_features['rms_y'], 'g-', label='RMS Y')

# Marcar anomalías detectadas
detected = df_features['predicted_anomaly']
ax1.scatter(time_windows[detected], df_features.loc[detected, 'rms_x'],
           c='red', s=100, marker='x', label='Anomalía detectada', zorder=5)

ax1.set_ylabel('RMS (mm/s)')
ax1.set_title('Detección de Anomalías en Vibración')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Gráfico 2: Comparación predicción vs real
ax2 = axes[1]
ax2.fill_between(time_windows, df_features['is_anomaly'].astype(int),
                alpha=0.3, color='red', label='Anomalía real')
ax2.fill_between(time_windows, df_features['predicted_anomaly'].astype(int) * 0.5,
                alpha=0.5, color='blue', label='Anomalía predicha')
ax2.set_xlabel('Tiempo (s)')
ax2.set_ylabel('Indicador')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

---

## Entregables

### Archivos a Entregar

```
M03_Ejercicio_[TuApellido]/
├── vibracion_analisis.ipynb
├── prompts.txt
└── resultados/
    ├── espectro_fft.png
    ├── deteccion_anomalias.png
    └── metricas.txt
```

### Contenido de metricas.txt

```
=== RESULTADOS DEL ANÁLISIS ===

Datos:
- Total muestras: XXX
- Frecuencia muestreo: 1000 Hz
- Duración: 10 segundos

Procesamiento:
- Filtro: Butterworth orden 4, fc=200 Hz
- Frecuencia dominante: XX Hz

Detección de Anomalías:
- Método: Isolation Forest
- Precisión: XX%
- Recall: XX%
- F1-Score: XX%
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Datos generados | 15 | Sintéticos con anomalías |
| Filtrado | 20 | Butterworth aplicado correctamente |
| FFT | 20 | Espectro calculado y visualizado |
| Features | 15 | RMS, pico, factor de cresta |
| Isolation Forest | 20 | Entrenado y evaluado |
| Documentación | 10 | Prompts y métricas |
| **Total** | **100** | |

---

*Módulo 03 - Ejercicio Práctico*
*Tiempo estimado: 25 minutos*
