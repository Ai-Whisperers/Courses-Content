# Módulo 03: IA para Procesamiento de Señales
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Analizar señales de sensores con Python e IA
- Implementar filtros digitales con asistencia de IA
- Detectar anomalías en señales usando ML
- Clasificar patrones en datos de sensores
- Visualizar datos de manera efectiva

---

## 1. Análisis de Señales con Python + IA

### 1.1 Entorno de Trabajo

```bash
# Instalación de bibliotecas
pip install numpy pandas matplotlib scipy
pip install scikit-learn seaborn
pip install pyserial  # Para leer datos de Arduino
```

### 1.2 Lectura de Datos desde Arduino

```python
"""
Prompt: Genera script Python para leer datos de Arduino
por Serial, almacenar en DataFrame y graficar en tiempo real.
Sensor: acelerómetro 3 ejes, datos formato "x,y,z"
"""

import serial
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from collections import deque
import numpy as np

# Configuración
PUERTO = 'COM3'  # Cambiar según sistema
BAUDRATE = 115200
MAX_POINTS = 500

# Buffers para datos
data_x = deque(maxlen=MAX_POINTS)
data_y = deque(maxlen=MAX_POINTS)
data_z = deque(maxlen=MAX_POINTS)
tiempo = deque(maxlen=MAX_POINTS)

# Conexión Serial
ser = serial.Serial(PUERTO, BAUDRATE, timeout=1)

# Configurar gráfico
fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(12, 8))
fig.suptitle('Datos de Acelerómetro en Tiempo Real')

line_x, = ax1.plot([], [], 'r-', label='X')
line_y, = ax2.plot([], [], 'g-', label='Y')
line_z, = ax3.plot([], [], 'b-', label='Z')

for ax, label in zip([ax1, ax2, ax3], ['X', 'Y', 'Z']):
    ax.set_ylabel(f'Aceleración {label} (g)')
    ax.set_xlim(0, MAX_POINTS)
    ax.set_ylim(-2, 2)
    ax.grid(True)
    ax.legend(loc='upper right')

ax3.set_xlabel('Muestras')

t = 0

def init():
    return line_x, line_y, line_z

def update(frame):
    global t

    try:
        # Leer línea del Serial
        line = ser.readline().decode('utf-8').strip()
        if line:
            values = line.split(',')
            if len(values) == 3:
                x, y, z = map(float, values)

                data_x.append(x)
                data_y.append(y)
                data_z.append(z)
                tiempo.append(t)
                t += 1

                # Actualizar gráficos
                line_x.set_data(range(len(data_x)), list(data_x))
                line_y.set_data(range(len(data_y)), list(data_y))
                line_z.set_data(range(len(data_z)), list(data_z))

    except Exception as e:
        print(f"Error: {e}")

    return line_x, line_y, line_z

# Animación
ani = FuncAnimation(fig, update, init_func=init, blit=True, interval=10)
plt.tight_layout()
plt.show()

# Guardar datos al cerrar
df = pd.DataFrame({
    'x': list(data_x),
    'y': list(data_y),
    'z': list(data_z)
})
df.to_csv('acelerometro_data.csv', index=False)
ser.close()
```

### 1.3 Análisis de Señal con IA

```python
"""
Prompt: Analiza esta señal de vibración y detecta:
- Frecuencia fundamental
- Armónicos principales
- Nivel de ruido
- Posibles anomalías
"""

import numpy as np
import pandas as pd
from scipy import signal
from scipy.fft import fft, fftfreq
import matplotlib.pyplot as plt

def analizar_senal(datos, fs=1000):
    """
    Analiza una señal de vibración.

    Args:
        datos: Array con la señal
        fs: Frecuencia de muestreo (Hz)

    Returns:
        dict con resultados del análisis
    """
    n = len(datos)

    # Análisis en dominio del tiempo
    media = np.mean(datos)
    std = np.std(datos)
    rms = np.sqrt(np.mean(datos**2))
    pico = np.max(np.abs(datos))
    factor_cresta = pico / rms

    # FFT
    yf = fft(datos)
    xf = fftfreq(n, 1/fs)[:n//2]
    magnitud = 2.0/n * np.abs(yf[0:n//2])

    # Encontrar frecuencia fundamental
    idx_fundamental = np.argmax(magnitud[1:]) + 1
    freq_fundamental = xf[idx_fundamental]

    # Encontrar armónicos (picos significativos)
    picos, propiedades = signal.find_peaks(magnitud, height=np.max(magnitud)*0.1)
    armonicos = [(xf[p], magnitud[p]) for p in picos[:5]]

    # Estimación de ruido (fuera de picos)
    ruido = np.median(magnitud)
    snr = 20 * np.log10(magnitud[idx_fundamental] / ruido)

    resultados = {
        'media': media,
        'std': std,
        'rms': rms,
        'pico': pico,
        'factor_cresta': factor_cresta,
        'freq_fundamental': freq_fundamental,
        'armonicos': armonicos,
        'snr_db': snr
    }

    return resultados, xf, magnitud

# Ejemplo de uso
# Generar señal de prueba con vibración + ruido
fs = 1000  # 1 kHz
t = np.linspace(0, 1, fs)
senal = (np.sin(2*np.pi*50*t) +  # 50 Hz fundamental
         0.5*np.sin(2*np.pi*100*t) +  # 1er armónico
         0.25*np.sin(2*np.pi*150*t) +  # 2do armónico
         0.1*np.random.randn(len(t)))  # Ruido

resultados, freqs, magnitud = analizar_senal(senal, fs)

# Visualización
fig, axes = plt.subplots(2, 1, figsize=(12, 8))

# Dominio del tiempo
axes[0].plot(t[:200], senal[:200])
axes[0].set_xlabel('Tiempo (s)')
axes[0].set_ylabel('Amplitud')
axes[0].set_title('Señal en Dominio del Tiempo')
axes[0].grid(True)

# Dominio de frecuencia
axes[1].semilogy(freqs, magnitud)
axes[1].set_xlabel('Frecuencia (Hz)')
axes[1].set_ylabel('Magnitud')
axes[1].set_title('Espectro de Frecuencias')
axes[1].grid(True)
axes[1].set_xlim(0, 200)

plt.tight_layout()
plt.show()

# Mostrar resultados
print("=== Análisis de Señal ===")
print(f"RMS: {resultados['rms']:.4f}")
print(f"Factor de cresta: {resultados['factor_cresta']:.2f}")
print(f"Frecuencia fundamental: {resultados['freq_fundamental']:.1f} Hz")
print(f"SNR: {resultados['snr_db']:.1f} dB")
print("\nArmónicos principales:")
for freq, mag in resultados['armonicos']:
    print(f"  {freq:.1f} Hz: {mag:.4f}")
```

---

## 2. Filtrado Digital Asistido

### 2.1 Diseño de Filtros con IA

```python
"""
Prompt: Diseña filtros digitales para estas aplicaciones:
1. Filtro paso bajo para eliminar ruido de 60Hz en ECG (fc=40Hz, fs=500Hz)
2. Filtro paso banda para vibración (20-200Hz, fs=1kHz)
3. Filtro notch para eliminar 50Hz de red eléctrica
"""

from scipy.signal import butter, iirnotch, filtfilt, freqz
import numpy as np
import matplotlib.pyplot as plt

class FiltrosDigitales:
    """Colección de filtros digitales para procesamiento de señales."""

    @staticmethod
    def filtro_paso_bajo(senal, fc, fs, orden=4):
        """
        Filtro Butterworth paso bajo.

        Args:
            senal: Señal de entrada
            fc: Frecuencia de corte (Hz)
            fs: Frecuencia de muestreo (Hz)
            orden: Orden del filtro

        Returns:
            Señal filtrada
        """
        nyq = 0.5 * fs
        wn = fc / nyq
        b, a = butter(orden, wn, btype='low')
        return filtfilt(b, a, senal)

    @staticmethod
    def filtro_paso_banda(senal, fc_low, fc_high, fs, orden=4):
        """
        Filtro Butterworth paso banda.

        Args:
            senal: Señal de entrada
            fc_low: Frecuencia de corte inferior (Hz)
            fc_high: Frecuencia de corte superior (Hz)
            fs: Frecuencia de muestreo (Hz)
            orden: Orden del filtro

        Returns:
            Señal filtrada
        """
        nyq = 0.5 * fs
        low = fc_low / nyq
        high = fc_high / nyq
        b, a = butter(orden, [low, high], btype='band')
        return filtfilt(b, a, senal)

    @staticmethod
    def filtro_notch(senal, f0, fs, Q=30):
        """
        Filtro notch para eliminar frecuencia específica.

        Args:
            senal: Señal de entrada
            f0: Frecuencia a eliminar (Hz)
            fs: Frecuencia de muestreo (Hz)
            Q: Factor de calidad (ancho de banda)

        Returns:
            Señal filtrada
        """
        w0 = f0 / (fs/2)
        b, a = iirnotch(w0, Q)
        return filtfilt(b, a, senal)

    @staticmethod
    def visualizar_respuesta(b, a, fs, titulo="Respuesta en Frecuencia"):
        """Visualiza la respuesta en frecuencia del filtro."""
        w, h = freqz(b, a, worN=8000)
        freq = w * fs / (2 * np.pi)

        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))

        # Magnitud
        ax1.plot(freq, 20 * np.log10(abs(h)))
        ax1.set_xlabel('Frecuencia (Hz)')
        ax1.set_ylabel('Magnitud (dB)')
        ax1.set_title(titulo)
        ax1.grid(True)
        ax1.set_ylim(-60, 5)

        # Fase
        ax2.plot(freq, np.unwrap(np.angle(h)) * 180 / np.pi)
        ax2.set_xlabel('Frecuencia (Hz)')
        ax2.set_ylabel('Fase (grados)')
        ax2.grid(True)

        plt.tight_layout()
        plt.show()

# Ejemplo: Filtrar señal ECG con ruido de 60Hz
fs = 500  # Hz
t = np.linspace(0, 2, fs * 2)

# Simular ECG con ruido
ecg_limpio = np.sin(2*np.pi*1.2*t)  # ~72 BPM
ruido_60hz = 0.3 * np.sin(2*np.pi*60*t)
ruido_aleatorio = 0.1 * np.random.randn(len(t))
ecg_ruidoso = ecg_limpio + ruido_60hz + ruido_aleatorio

# Aplicar filtros
filtros = FiltrosDigitales()

# 1. Eliminar 60Hz con notch
ecg_sin_60hz = filtros.filtro_notch(ecg_ruidoso, 60, fs)

# 2. Paso bajo para suavizar
ecg_filtrado = filtros.filtro_paso_bajo(ecg_sin_60hz, 40, fs)

# Visualizar
fig, axes = plt.subplots(3, 1, figsize=(12, 8))

axes[0].plot(t, ecg_ruidoso)
axes[0].set_title('ECG con Ruido')
axes[0].set_ylabel('Amplitud')
axes[0].grid(True)

axes[1].plot(t, ecg_sin_60hz)
axes[1].set_title('Después de Filtro Notch 60Hz')
axes[1].set_ylabel('Amplitud')
axes[1].grid(True)

axes[2].plot(t, ecg_filtrado, label='Filtrado')
axes[2].plot(t, ecg_limpio, 'r--', alpha=0.5, label='Original')
axes[2].set_title('Después de Filtro Paso Bajo')
axes[2].set_xlabel('Tiempo (s)')
axes[2].set_ylabel('Amplitud')
axes[2].legend()
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

---

## 3. Detección de Anomalías en Señales

### 3.1 Métodos de Detección

```python
"""
Prompt: Implementa detección de anomalías en señales de vibración
industrial usando:
1. Método estadístico (Z-score)
2. Isolation Forest
3. Detección de cambio de nivel (CUSUM)
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

class DetectorAnomalias:
    """Detector de anomalías en señales de sensores."""

    def __init__(self, ventana=100):
        self.ventana = ventana
        self.scaler = StandardScaler()
        self.isolation_forest = None

    def detectar_zscore(self, senal, umbral=3):
        """
        Detecta anomalías usando Z-score.

        Args:
            senal: Array con la señal
            umbral: Número de desviaciones estándar

        Returns:
            Array booleano con anomalías
        """
        media = np.mean(senal)
        std = np.std(senal)
        z_scores = np.abs((senal - media) / std)
        return z_scores > umbral

    def detectar_zscore_movil(self, senal, umbral=3):
        """
        Z-score con ventana móvil para señales no estacionarias.
        """
        anomalias = np.zeros(len(senal), dtype=bool)

        for i in range(self.ventana, len(senal)):
            ventana_datos = senal[i-self.ventana:i]
            media = np.mean(ventana_datos)
            std = np.std(ventana_datos)

            if std > 0:
                z = abs((senal[i] - media) / std)
                anomalias[i] = z > umbral

        return anomalias

    def entrenar_isolation_forest(self, datos_normales, contamination=0.01):
        """
        Entrena modelo Isolation Forest con datos normales.

        Args:
            datos_normales: Array 2D con features normales
            contamination: Proporción esperada de anomalías
        """
        self.isolation_forest = IsolationForest(
            contamination=contamination,
            random_state=42,
            n_estimators=100
        )
        datos_scaled = self.scaler.fit_transform(datos_normales)
        self.isolation_forest.fit(datos_scaled)

    def predecir_isolation_forest(self, datos):
        """
        Predice anomalías con modelo entrenado.

        Returns:
            1 = normal, -1 = anomalía
        """
        datos_scaled = self.scaler.transform(datos)
        return self.isolation_forest.predict(datos_scaled)

    def detectar_cusum(self, senal, umbral=5, drift=0):
        """
        Detecta cambios de nivel usando CUSUM.

        Args:
            senal: Array con la señal
            umbral: Umbral de detección
            drift: Deriva permitida

        Returns:
            Índices de cambios detectados
        """
        n = len(senal)
        cusum_pos = np.zeros(n)
        cusum_neg = np.zeros(n)
        cambios = []

        media = np.mean(senal[:self.ventana])

        for i in range(1, n):
            cusum_pos[i] = max(0, cusum_pos[i-1] + senal[i] - media - drift)
            cusum_neg[i] = min(0, cusum_neg[i-1] + senal[i] - media + drift)

            if cusum_pos[i] > umbral or cusum_neg[i] < -umbral:
                cambios.append(i)
                cusum_pos[i] = 0
                cusum_neg[i] = 0
                media = np.mean(senal[max(0, i-self.ventana):i])

        return np.array(cambios), cusum_pos, cusum_neg

# Ejemplo: Detectar anomalías en vibración de motor
np.random.seed(42)
fs = 1000
t = np.linspace(0, 10, fs * 10)

# Señal normal de vibración
vibracion_normal = 0.5 * np.sin(2*np.pi*60*t) + 0.1*np.random.randn(len(t))

# Añadir anomalías
vibracion = vibracion_normal.copy()
# Anomalía 1: Pico (golpe)
vibracion[2000:2010] += 3
# Anomalía 2: Cambio de nivel (desbalance)
vibracion[5000:6000] += 1
# Anomalía 3: Aumento de ruido (rodamiento dañado)
vibracion[8000:8500] += 0.5*np.random.randn(500)

# Detectar anomalías
detector = DetectorAnomalias(ventana=100)

# Método Z-score móvil
anomalias_zscore = detector.detectar_zscore_movil(vibracion, umbral=3)

# CUSUM para cambios de nivel
cambios, cusum_pos, cusum_neg = detector.detectar_cusum(vibracion, umbral=10)

# Visualizar
fig, axes = plt.subplots(3, 1, figsize=(14, 10))

# Señal con anomalías marcadas
axes[0].plot(t, vibracion, 'b-', alpha=0.7, label='Señal')
axes[0].scatter(t[anomalias_zscore], vibracion[anomalias_zscore],
                c='red', s=5, label='Anomalía Z-score')
axes[0].set_title('Detección de Anomalías - Z-score Móvil')
axes[0].set_ylabel('Amplitud')
axes[0].legend()
axes[0].grid(True)

# CUSUM
axes[1].plot(t, cusum_pos, 'g-', label='CUSUM+')
axes[1].plot(t, cusum_neg, 'r-', label='CUSUM-')
for cambio in cambios:
    axes[1].axvline(x=t[cambio], color='purple', linestyle='--', alpha=0.5)
axes[1].set_title('Detección CUSUM - Cambios de Nivel')
axes[1].set_ylabel('CUSUM')
axes[1].legend()
axes[1].grid(True)

# Comparación con señal original
axes[2].plot(t, vibracion_normal, 'g-', alpha=0.5, label='Normal')
axes[2].plot(t, vibracion, 'b-', alpha=0.7, label='Con anomalías')
axes[2].set_title('Comparación: Normal vs Anómalo')
axes[2].set_xlabel('Tiempo (s)')
axes[2].set_ylabel('Amplitud')
axes[2].legend()
axes[2].grid(True)

plt.tight_layout()
plt.show()

print(f"\nAnomalías detectadas (Z-score): {np.sum(anomalias_zscore)}")
print(f"Cambios de nivel detectados (CUSUM): {len(cambios)}")
```

---

## 4. Clasificación de Patrones con ML

### 4.1 Clasificador de Estados de Máquina

```python
"""
Prompt: Crea un clasificador de estados de motor eléctrico
basado en datos de vibración:
- Normal
- Desbalance
- Rodamiento dañado
- Eje desalineado

Usar: extracción de features + Random Forest
"""

import numpy as np
from scipy import stats, signal
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

class ClasificadorVibracion:
    """Clasificador de estados de máquinas basado en vibración."""

    def __init__(self):
        self.modelo = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            max_depth=10
        )
        self.estados = ['Normal', 'Desbalance', 'Rodamiento', 'Desalineado']

    def extraer_features(self, senal, fs):
        """
        Extrae características de una señal de vibración.

        Args:
            senal: Array con la señal
            fs: Frecuencia de muestreo

        Returns:
            Array con features
        """
        features = []

        # === Features en dominio del tiempo ===
        # Estadísticas básicas
        features.append(np.mean(senal))
        features.append(np.std(senal))
        features.append(np.max(senal) - np.min(senal))  # Peak-to-peak
        features.append(stats.skew(senal))
        features.append(stats.kurtosis(senal))

        # RMS y factor de cresta
        rms = np.sqrt(np.mean(senal**2))
        features.append(rms)
        features.append(np.max(np.abs(senal)) / rms)  # Crest factor

        # === Features en dominio de frecuencia ===
        # FFT
        n = len(senal)
        yf = np.abs(np.fft.fft(senal))[:n//2]
        xf = np.fft.fftfreq(n, 1/fs)[:n//2]

        # Frecuencia dominante
        idx_max = np.argmax(yf)
        features.append(xf[idx_max])
        features.append(yf[idx_max])

        # Energía en bandas de frecuencia
        for f_low, f_high in [(0, 50), (50, 100), (100, 200), (200, 500)]:
            mask = (xf >= f_low) & (xf < f_high)
            features.append(np.sum(yf[mask]**2))

        # Centroide espectral
        features.append(np.sum(xf * yf) / np.sum(yf))

        return np.array(features)

    def generar_datos_sinteticos(self, n_muestras=500, fs=1000, duracion=1):
        """Genera datos sintéticos para entrenamiento."""
        X = []
        y = []
        t = np.linspace(0, duracion, fs * duracion)

        for _ in range(n_muestras):
            estado = np.random.randint(0, 4)

            if estado == 0:  # Normal
                senal = 0.5 * np.sin(2*np.pi*60*t) + 0.05*np.random.randn(len(t))

            elif estado == 1:  # Desbalance
                senal = (0.5 * np.sin(2*np.pi*60*t) +
                        0.3 * np.sin(2*np.pi*30*t) +  # 1x RPM
                        0.1*np.random.randn(len(t)))

            elif estado == 2:  # Rodamiento dañado
                senal = (0.5 * np.sin(2*np.pi*60*t) +
                        0.2 * np.random.randn(len(t)) +  # Más ruido
                        0.15 * np.sin(2*np.pi*150*t))  # Alta frecuencia

            else:  # Desalineado
                senal = (0.5 * np.sin(2*np.pi*60*t) +
                        0.25 * np.sin(2*np.pi*120*t) +  # 2x RPM
                        0.15 * np.sin(2*np.pi*180*t) +  # 3x RPM
                        0.05*np.random.randn(len(t)))

            features = self.extraer_features(senal, fs)
            X.append(features)
            y.append(estado)

        return np.array(X), np.array(y)

    def entrenar(self, X, y):
        """Entrena el clasificador."""
        self.modelo.fit(X, y)

    def predecir(self, X):
        """Predice el estado."""
        return self.modelo.predict(X)

    def evaluar(self, X_test, y_test):
        """Evalúa el modelo y muestra resultados."""
        y_pred = self.predecir(X_test)

        print("=== Reporte de Clasificación ===")
        print(classification_report(y_test, y_pred, target_names=self.estados))

        # Matriz de confusión
        cm = confusion_matrix(y_test, y_pred)
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                    xticklabels=self.estados, yticklabels=self.estados)
        plt.xlabel('Predicho')
        plt.ylabel('Real')
        plt.title('Matriz de Confusión')
        plt.tight_layout()
        plt.show()

        return y_pred

# Ejemplo de uso
clasificador = ClasificadorVibracion()

# Generar datos sintéticos
print("Generando datos de entrenamiento...")
X, y = clasificador.generar_datos_sinteticos(n_muestras=1000)

# Dividir datos
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Entrenar
print("Entrenando modelo...")
clasificador.entrenar(X_train, y_train)

# Evaluar
print("\nEvaluando modelo...")
clasificador.evaluar(X_test, y_test)

# Importancia de features
feature_names = [
    'Media', 'Std', 'Peak-Peak', 'Skew', 'Kurtosis',
    'RMS', 'Crest Factor', 'Freq Dom', 'Mag Dom',
    'E 0-50Hz', 'E 50-100Hz', 'E 100-200Hz', 'E 200-500Hz',
    'Centroide'
]

importancia = clasificador.modelo.feature_importances_
indices = np.argsort(importancia)[::-1]

plt.figure(figsize=(10, 6))
plt.bar(range(len(importancia)), importancia[indices])
plt.xticks(range(len(importancia)), [feature_names[i] for i in indices],
           rotation=45, ha='right')
plt.title('Importancia de Features')
plt.tight_layout()
plt.show()
```

---

## 5. Visualización de Datos de Sensores

### 5.1 Dashboard de Monitoreo

```python
"""
Prompt: Crea dashboard de visualización para:
- 4 señales de sensores en tiempo real
- Histogramas de distribución
- Indicadores de estado (OK/Warning/Alarm)
- Trending de últimas 24 horas
"""

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Button
from datetime import datetime, timedelta
import matplotlib.patches as mpatches

def crear_dashboard(datos_historicos):
    """
    Crea un dashboard de monitoreo de sensores.

    Args:
        datos_historicos: dict con datos de cada sensor
    """
    fig = plt.figure(figsize=(16, 10))
    fig.suptitle('Dashboard de Monitoreo - Sistema Industrial', fontsize=14)

    # Layout: 3 filas, 4 columnas
    # Fila 1: Señales en tiempo real
    # Fila 2: Histogramas
    # Fila 3: Trending 24h

    sensores = ['Temperatura', 'Presión', 'Vibración', 'Flujo']
    colores = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12']
    unidades = ['°C', 'bar', 'mm/s', 'L/min']
    limites = {
        'Temperatura': (20, 80, 60, 70),  # min, max, warning, alarm
        'Presión': (0, 10, 7, 9),
        'Vibración': (0, 5, 3, 4),
        'Flujo': (0, 100, 80, 90)
    }

    for i, sensor in enumerate(sensores):
        datos = datos_historicos[sensor]
        lim = limites[sensor]

        # === Fila 1: Señal reciente ===
        ax1 = fig.add_subplot(3, 4, i+1)
        ax1.plot(datos[-100:], color=colores[i], linewidth=1)
        ax1.axhline(y=lim[2], color='orange', linestyle='--', alpha=0.5)
        ax1.axhline(y=lim[3], color='red', linestyle='--', alpha=0.5)
        ax1.set_title(f'{sensor}', fontsize=10)
        ax1.set_ylabel(unidades[i])
        ax1.grid(True, alpha=0.3)
        ax1.set_ylim(lim[0], lim[1])

        # Indicador de estado
        valor_actual = datos[-1]
        if valor_actual >= lim[3]:
            estado = 'ALARM'
            color_estado = 'red'
        elif valor_actual >= lim[2]:
            estado = 'WARNING'
            color_estado = 'orange'
        else:
            estado = 'OK'
            color_estado = 'green'

        ax1.text(0.95, 0.95, f'{valor_actual:.1f}\n{estado}',
                transform=ax1.transAxes, fontsize=9,
                verticalalignment='top', horizontalalignment='right',
                bbox=dict(boxstyle='round', facecolor=color_estado, alpha=0.5))

        # === Fila 2: Histograma ===
        ax2 = fig.add_subplot(3, 4, i+5)
        ax2.hist(datos, bins=30, color=colores[i], alpha=0.7, edgecolor='white')
        ax2.axvline(x=lim[2], color='orange', linestyle='--')
        ax2.axvline(x=lim[3], color='red', linestyle='--')
        ax2.set_xlabel(unidades[i])
        ax2.set_ylabel('Frecuencia')
        ax2.grid(True, alpha=0.3)

        # Estadísticas
        ax2.text(0.95, 0.95, f'μ={np.mean(datos):.1f}\nσ={np.std(datos):.2f}',
                transform=ax2.transAxes, fontsize=8,
                verticalalignment='top', horizontalalignment='right',
                bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

        # === Fila 3: Trending 24h ===
        ax3 = fig.add_subplot(3, 4, i+9)
        horas = np.linspace(0, 24, len(datos))
        ax3.plot(horas, datos, color=colores[i], linewidth=0.5, alpha=0.7)

        # Media móvil
        ventana = max(1, len(datos)//24)
        media_movil = np.convolve(datos, np.ones(ventana)/ventana, mode='valid')
        ax3.plot(horas[:len(media_movil)], media_movil,
                color=colores[i], linewidth=2, label='Media 1h')

        ax3.fill_between(horas, lim[2], lim[3], alpha=0.2, color='orange')
        ax3.fill_between(horas, lim[3], lim[1], alpha=0.2, color='red')
        ax3.set_xlabel('Horas')
        ax3.set_ylabel(unidades[i])
        ax3.set_xlim(0, 24)
        ax3.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.subplots_adjust(top=0.93)
    plt.show()

# Generar datos de ejemplo (24 horas, 1 muestra/segundo = 86400)
np.random.seed(42)
n_puntos = 86400

datos_historicos = {
    'Temperatura': 45 + 10*np.sin(np.linspace(0, 4*np.pi, n_puntos)) +
                   2*np.random.randn(n_puntos),
    'Presión': 5 + 1.5*np.sin(np.linspace(0, 6*np.pi, n_puntos)) +
               0.3*np.random.randn(n_puntos),
    'Vibración': 1.5 + 0.5*np.abs(np.sin(np.linspace(0, 8*np.pi, n_puntos))) +
                 0.2*np.random.randn(n_puntos),
    'Flujo': 60 + 15*np.sin(np.linspace(0, 3*np.pi, n_puntos)) +
             3*np.random.randn(n_puntos)
}

# Añadir algunas anomalías
datos_historicos['Vibración'][50000:51000] += 2
datos_historicos['Temperatura'][70000:72000] += 15

crear_dashboard(datos_historicos)
```

---

## Resumen

- **Python + SciPy** para análisis de señales
- **Filtros digitales**: paso bajo, paso banda, notch
- **Detección de anomalías**: Z-score, Isolation Forest, CUSUM
- **ML para clasificación**: Random Forest con features extraídas
- **Visualización**: dashboards interactivos

---

## Recursos

- [SciPy Signal Processing](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Matplotlib Gallery](https://matplotlib.org/gallery/)

---

*Siguiente: Módulo 04 - IA para Diseño de Circuitos*
