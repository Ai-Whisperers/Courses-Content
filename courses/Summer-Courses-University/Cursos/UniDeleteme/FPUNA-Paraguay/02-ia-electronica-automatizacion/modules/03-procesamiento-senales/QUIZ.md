# Quiz - Módulo 03
## Procesamiento de Señales con IA

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

Según el teorema de Nyquist, si una señal tiene componentes de frecuencia hasta 100 Hz, ¿cuál es la frecuencia de muestreo mínima requerida?

- A) 100 Hz
- B) 150 Hz
- C) 200 Hz
- D) 50 Hz

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) 200 Hz**

El teorema de Nyquist establece que la frecuencia de muestreo debe ser al menos el doble de la frecuencia máxima de la señal (fs ≥ 2×fmax). Para una señal con componentes hasta 100 Hz, se necesita fs ≥ 200 Hz. En la práctica, se usa un margen mayor (2.5× a 10×) para mejor fidelidad.
</details>

---

### Pregunta 2

¿Cuál es la ventaja de usar `filtfilt` en lugar de `lfilter` de scipy.signal?

- A) Es más rápido
- B) Produce filtrado de fase cero (sin distorsión de fase)
- C) Usa menos memoria
- D) Solo funciona con filtros Butterworth

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Produce filtrado de fase cero (sin distorsión de fase)**

`filtfilt` aplica el filtro dos veces: una hacia adelante y otra hacia atrás. Esto cancela la distorsión de fase que introducen los filtros IIR, preservando la posición temporal de los eventos en la señal. Es ideal para análisis offline donde no se requiere procesamiento en tiempo real.
</details>

---

### Pregunta 3

¿Qué indica un valor alto de Kurtosis (>3) en una señal de vibración?

- A) La señal es muy suave
- B) Hay presencia de impactos o picos transitorios
- C) La frecuencia es baja
- D) El sensor está mal calibrado

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Hay presencia de impactos o picos transitorios**

La Kurtosis mide la "puntudez" de la distribución de la señal. Un valor de 3 corresponde a una distribución normal. Valores mayores a 3 indican colas pesadas con picos más pronunciados, típicos de defectos en rodamientos que causan impactos repetitivos. Es un indicador temprano de daño en máquinas rotativas.
</details>

---

### Pregunta 4

En Isolation Forest, ¿qué representa el parámetro `contamination`?

- A) El nivel de ruido en los datos
- B) La proporción esperada de anomalías en los datos
- C) El número de árboles del modelo
- D) El tamaño del conjunto de entrenamiento

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) La proporción esperada de anomalías en los datos**

El parámetro `contamination` (0.01 a 0.5) indica al modelo qué fracción de los datos se espera que sean anomalías. Esto ajusta el umbral de decisión para clasificar puntos como anómalos. Por ejemplo, `contamination=0.05` significa que esperamos que el 5% de los datos sean outliers.
</details>

---

### Pregunta 5

¿Por qué RMS (Root Mean Square) es preferido sobre el valor pico para monitoreo de vibración continua?

- A) Es más fácil de calcular
- B) Es más estable y representa la energía total de la señal
- C) Solo funciona para señales de alta frecuencia
- D) Es el único valor que se puede medir

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Es más estable y representa la energía total de la señal**

RMS representa la energía efectiva de la señal y es menos sensible a picos individuales que pueden ser ruido. Es proporcional a la potencia de la vibración. El valor pico es útil para detectar impactos, pero para tendencia de condición de máquina, RMS es más confiable y comparable entre mediciones.
</details>

---

### Pregunta 6

Al analizar vibración de un motor a 3000 RPM, ¿cuál es la frecuencia fundamental de rotación?

- A) 3000 Hz
- B) 150 Hz
- C) 50 Hz
- D) 30 Hz

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) 50 Hz**

La frecuencia de rotación se calcula como RPM/60. Para 3000 RPM: 3000/60 = 50 Hz. Esta es la frecuencia fundamental (1×) y es donde se esperan componentes de desbalance. Múltiplos de esta frecuencia (100 Hz, 150 Hz, etc.) indican otros tipos de defectos como desalineación.
</details>

---

### Pregunta 7

¿Qué tipo de filtro se usa para eliminar específicamente la interferencia de 60 Hz de la red eléctrica?

- A) Filtro paso bajo
- B) Filtro paso alto
- C) Filtro paso banda
- D) Filtro notch (rechaza banda)

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: D) Filtro notch (rechaza banda)**

El filtro notch (o rechaza banda) atenúa una frecuencia específica mientras deja pasar las demás. Es ideal para eliminar interferencia de línea (50/60 Hz) sin afectar el resto del espectro. El parámetro Q define el ancho de la banda rechazada; Q mayor significa rechazo más angosto y selectivo.
</details>

---

### Pregunta 8

En el contexto de detección de anomalías, ¿qué significa que Isolation Forest sea un método "no supervisado"?

- A) Que no requiere supervisión humana para correr
- B) Que no necesita datos etiquetados para entrenamiento
- C) Que solo funciona en modo automático
- D) Que no puede detectar todas las anomalías

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Que no necesita datos etiquetados para entrenamiento**

Los métodos no supervisados como Isolation Forest no requieren etiquetas previas de qué es "normal" o "anómalo". Detectan anomalías basándose en que son puntos fáciles de aislar del resto de los datos. Esto es valioso en industria donde rara vez tenemos datos etiquetados de fallas.
</details>

---

### Pregunta 9

¿Cuál es la función de la Transformada de Fourier (FFT) en análisis de vibración?

- A) Amplificar la señal
- B) Convertir la señal del dominio del tiempo al dominio de frecuencia
- C) Filtrar ruido
- D) Comprimir los datos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Convertir la señal del dominio del tiempo al dominio de frecuencia**

La FFT descompone una señal temporal en sus componentes de frecuencia, revelando qué frecuencias están presentes y con qué magnitud. En máquinas rotativas, esto permite identificar la fuente de vibración: desbalance aparece a 1×RPM, desalineación a 2×RPM, defectos de rodamiento a frecuencias características calculadas.
</details>

---

### Pregunta 10

Al usar Z-score para detección de anomalías con umbral 3, ¿qué porcentaje de datos normales se clasificaría erróneamente como anomalía (falsos positivos)?

- A) 50%
- B) 10%
- C) 0.3% (aproximadamente)
- D) 0%

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) 0.3% (aproximadamente)**

En una distribución normal, el 99.7% de los datos cae dentro de ±3 desviaciones estándar. Por lo tanto, usar un umbral de |Z| > 3 clasificará erróneamente aproximadamente 0.3% de los datos normales como anomalías. Este es el trade-off entre sensibilidad y falsos positivos que debe ajustarse según la aplicación.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas procesamiento de señales |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 03 - Procesamiento de Señales*
*10 preguntas - 10 minutos*
