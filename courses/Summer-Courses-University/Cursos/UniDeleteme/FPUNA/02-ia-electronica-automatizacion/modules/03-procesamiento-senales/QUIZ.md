# Quiz - Módulo 03
## IA para Procesamiento de Señales

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

¿Cuál biblioteca de Python es más apropiada para implementar filtros digitales Butterworth?

- A) numpy
- B) pandas
- C) scipy.signal
- D) matplotlib

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) scipy.signal**

scipy.signal proporciona funciones específicas para diseño de filtros digitales: butter() para coeficientes Butterworth, filtfilt() para filtrado sin desfase, y freqz() para respuesta en frecuencia. numpy no tiene estas funciones especializadas.
</details>

---

### Pregunta 2

Al pedir a la IA que genere código para análisis FFT, ¿qué parámetro es crítico especificar?

- A) El color del gráfico
- B) La frecuencia de muestreo (fs) de los datos
- C) El nombre del archivo
- D) El sistema operativo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) La frecuencia de muestreo (fs) de los datos**

La frecuencia de muestreo determina la escala del eje de frecuencias en el FFT y el límite de Nyquist (fs/2). Sin especificar fs, la IA generará código con frecuencia arbitraria que producirá resultados incorrectos al interpretar las frecuencias reales de la señal.
</details>

---

### Pregunta 3

¿Cuál algoritmo de scikit-learn es más apropiado para detección de anomalías sin etiquetas de entrenamiento?

- A) Regresión Lineal
- B) Random Forest Classifier
- C) Isolation Forest
- D) K-Nearest Neighbors Classifier

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Isolation Forest**

Isolation Forest es un algoritmo no supervisado diseñado específicamente para detección de anomalías. No requiere etiquetas, funciona aislando puntos anómalos que son más fáciles de separar del resto de los datos. Los clasificadores supervisados necesitan etiquetas para entrenarse.
</details>

---

### Pregunta 4

En detección de anomalías por Z-score, ¿qué valor de umbral se considera típicamente para identificar una anomalía?

- A) Z > 0.5
- B) Z > 1
- C) Z > 3
- D) Z > 10

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Z > 3**

Un Z-score mayor a 3 indica que el valor está a más de 3 desviaciones estándar de la media, lo cual ocurre con probabilidad menor al 0.3% en distribución normal. Este umbral es estándar en control de calidad y detección de outliers, balanceando sensibilidad con tasa de falsos positivos.
</details>

---

### Pregunta 5

¿Para qué sirve el filtro notch (rechazo de banda) en procesamiento de señales de sensores?

- A) Para amplificar todas las frecuencias
- B) Para eliminar interferencia de línea eléctrica (50/60 Hz)
- C) Para convertir señal analógica a digital
- D) Para comprimir datos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para eliminar interferencia de línea eléctrica (50/60 Hz)**

El filtro notch elimina una frecuencia específica (50 Hz en Europa/Sudamérica, 60 Hz en USA) causada por acoplamiento electromagnético de la red eléctrica. Es esencial en señales de sensores, ECG, EEG, y cualquier medición susceptible a interferencia de línea.
</details>

---

### Pregunta 6

Al usar IA para generar código de extracción de características, ¿cuál característica es más útil para detectar vibraciones anómalas?

- A) Promedio de la señal
- B) RMS (Root Mean Square) y kurtosis
- C) Color del gráfico
- D) Número de muestras

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) RMS (Root Mean Square) y kurtosis**

RMS mide la energía de la señal (aumenta con vibraciones intensas), y kurtosis mide la "puntiagudez" de la distribución (detecta picos/impactos). Juntos son excelentes para detectar cambios en patrones de vibración. El promedio y número de muestras no capturan estas características.
</details>

---

### Pregunta 7

¿Qué ventaja tiene usar filtfilt() sobre lfilter() en scipy.signal?

- A) Es más rápido
- B) Aplica filtrado sin desfase de fase
- C) Usa menos memoria
- D) Funciona sin frecuencia de muestreo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Aplica filtrado sin desfase de fase**

filtfilt() aplica el filtro hacia adelante y hacia atrás, cancelando el desfase de fase. Esto es crucial para análisis donde la posición temporal de eventos es importante (detección de picos, correlación). lfilter() introduce desfase que puede afectar el análisis.
</details>

---

### Pregunta 8

Al pedir a la IA código para clasificación de patrones de vibración, ¿qué estructura de datos es más apropiada para las características?

- A) Lista de Python simple
- B) String con valores separados por comas
- C) DataFrame de pandas o array 2D numpy (muestras x características)
- D) Diccionario anidado

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) DataFrame de pandas o array 2D numpy (muestras x características)**

scikit-learn espera datos en formato (n_samples, n_features). DataFrame de pandas o array 2D numpy son compatibles directamente con fit() y predict(). Listas simples y diccionarios requieren conversión adicional y son propensas a errores de dimensionalidad.
</details>

---

### Pregunta 9

¿Cuál es el propósito del parámetro "contamination" en Isolation Forest?

- A) Limpiar los datos de entrada
- B) Especificar la proporción esperada de anomalías en los datos
- C) Definir el color de visualización
- D) Establecer el número de árboles

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Especificar la proporción esperada de anomalías en los datos**

El parámetro contamination (típicamente 0.01-0.1) indica qué fracción de los datos se espera que sean anómalos. Esto ajusta el umbral de decisión del modelo. Si se sabe que ~5% de las lecturas son anómalas, contamination=0.05 optimiza la detección.
</details>

---

### Pregunta 10

Al generar código con IA para visualización de señales, ¿qué elemento es esencial para análisis técnico?

- A) Fondo de color
- B) Ejes con unidades correctas (tiempo en segundos, frecuencia en Hz, amplitud en unidades físicas)
- C) Bordes decorativos
- D) Múltiples colores aleatorios

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Ejes con unidades correctas (tiempo en segundos, frecuencia en Hz, amplitud en unidades físicas)**

La visualización técnica requiere ejes correctamente etiquetados con unidades físicas para interpretar resultados. Sin unidades, es imposible determinar si una frecuencia de 50 Hz corresponde a interferencia eléctrica o si una amplitud excede límites operativos. Siempre especificar unidades en prompts a la IA.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas procesamiento de señales con IA |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 03 - IA para Procesamiento de Señales*
*10 preguntas - 10 minutos*
