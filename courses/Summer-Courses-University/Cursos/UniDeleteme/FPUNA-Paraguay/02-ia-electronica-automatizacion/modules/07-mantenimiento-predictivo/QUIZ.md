# Quiz - Módulo 07
## IA para Mantenimiento Predictivo

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

¿Qué representa la curva P-F en mantenimiento predictivo?

- A) Precio vs Frecuencia de mantenimiento
- B) El intervalo desde que una falla es detectable (P) hasta la falla funcional (F)
- C) Potencia vs Fuerza del motor
- D) Probabilidad de Falla acumulada

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) El intervalo desde que una falla es detectable (P) hasta la falla funcional (F)**

La curva P-F (Potential failure to Functional failure) muestra la degradación de un equipo desde el punto donde la falla es detectable con monitoreo de condición (punto P) hasta la falla funcional (punto F). El intervalo P-F determina con cuánta anticipación podemos detectar y actuar antes de la falla. Es el fundamento del mantenimiento predictivo.
</details>

---

### Pregunta 2

¿Por qué se usa `class_weight='balanced'` en RandomForestClassifier para mantenimiento predictivo?

- A) Para que el modelo corra más rápido
- B) Para compensar el desbalance de clases donde las fallas son minoritarias
- C) Para reducir el tamaño del modelo
- D) Para mejorar la visualización

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para compensar el desbalance de clases donde las fallas son minoritarias**

En datos industriales reales, la mayoría de las lecturas corresponden a operación normal (90%+), mientras que las fallas son eventos raros (<10%). Sin balanceo, el modelo aprende a predecir siempre "normal" obteniendo alta precisión pero fallando en detectar las fallas (que es precisamente lo que queremos detectar). `class_weight='balanced'` asigna pesos inversamente proporcionales a la frecuencia de cada clase.
</details>

---

### Pregunta 3

¿Qué métrica es más crítica para un sistema de mantenimiento predictivo y por qué?

- A) Accuracy - porque indica el porcentaje total de aciertos
- B) Precision - porque evita falsas alarmas
- C) Recall (sensibilidad) - porque no queremos perder ninguna falla real
- D) F1-score - porque balancea todas las métricas

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Recall (sensibilidad) - porque no queremos perder ninguna falla real**

En mantenimiento predictivo, un falso negativo (no detectar una falla que existe) puede resultar en parada no programada, daños mayores, o accidentes. Un falso positivo (alarma cuando no hay falla) solo genera una inspección innecesaria. El costo de perder una falla es mucho mayor que el costo de una falsa alarma, por lo que priorizamos alto Recall. Típicamente buscamos Recall >= 95% para fallas críticas.
</details>

---

### Pregunta 4

¿Qué es RUL (Remaining Useful Life) y cómo se estima?

- A) Es el tiempo de garantía del fabricante
- B) Es el tiempo estimado hasta que el equipo falle, calculado con modelos de degradación
- C) Es el tiempo desde la última reparación
- D) Es la vida útil total del equipo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Es el tiempo estimado hasta que el equipo falle, calculado con modelos de degradación**

RUL (Vida Útil Remanente) es la predicción de cuánto tiempo operativo resta antes de que un equipo falle. Se estima usando modelos de regresión entrenados con datos históricos de degradación, o mediante modelos físicos que relacionan variables monitoreadas con la degradación. Conocer el RUL permite programar mantenimiento justo antes de la falla, maximizando utilización sin riesgo de parada imprevista.
</details>

---

### Pregunta 5

¿Por qué Isolation Forest es popular para detección de anomalías en equipos industriales?

- A) Es el algoritmo más preciso disponible
- B) No requiere datos etiquetados (no supervisado) y es eficiente con alta dimensionalidad
- C) Funciona solo con datos de temperatura
- D) Es el más fácil de implementar

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) No requiere datos etiquetados (no supervisado) y es eficiente con alta dimensionalidad**

En la industria, raramente tenemos datos etiquetados de fallas (son eventos raros y costosos de documentar). Isolation Forest funciona sin etiquetas, identificando puntos que son "fáciles de aislar" como anomalías. Además, es computacionalmente eficiente (O(n log n)) y escala bien con muchas variables de sensores. Su parámetro `contamination` permite ajustar la sensibilidad según el porcentaje esperado de anomalías.
</details>

---

### Pregunta 6

Al solicitar código a la IA para entrenar un modelo de mantenimiento, ¿qué información del dominio es crítica incluir?

- A) Solo el nombre de las variables
- B) Rangos normales, umbrales de alarma, y relaciones físicas entre variables
- C) La marca del equipo
- D) El color del equipo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Rangos normales, umbrales de alarma, y relaciones físicas entre variables**

La IA genera mejor código cuando entiende el contexto físico: que vibración y temperatura están correlacionadas (fricción genera calor), que cavitación causa baja presión y alto ruido, que desalineación afecta principalmente vibración en acople. Sin este conocimiento de dominio, el modelo puede aprender patrones espurios. También necesita saber rangos típicos para seleccionar escaladores y umbrales apropiados.
</details>

---

### Pregunta 7

¿Qué estrategia de división de datos es apropiada para validar un modelo de series temporales de sensores?

- A) Random split 80/20
- B) K-fold cross validation aleatorio
- C) División temporal: entrenar con datos pasados, validar con datos futuros
- D) Usar todos los datos para entrenar

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) División temporal: entrenar con datos pasados, validar con datos futuros**

En datos temporales de sensores, usar random split causa "data leakage" porque el modelo puede ver datos futuros durante el entrenamiento (las series temporales tienen autocorrelación). La validación correcta es temporal: entrenar con datos históricos y validar con datos cronológicamente posteriores. Esto simula el escenario real donde el modelo se despliega y debe predecir el futuro basándose solo en el pasado.
</details>

---

### Pregunta 8

¿Cuál es la arquitectura típica para desplegar un modelo de mantenimiento predictivo en producción?

- A) Modelo entrenado directamente en el PLC
- B) Edge device → API REST → Base de datos → Dashboard
- C) Solo Excel con fórmulas
- D) Modelo en la nube sin conexión local

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Edge device → API REST → Base de datos → Dashboard**

La arquitectura típica incluye: 1) Edge device (Raspberry Pi, industrial PC) que recolecta datos de sensores, 2) API REST (FastAPI, Flask) que sirve el modelo de predicción, 3) Base de datos (InfluxDB, PostgreSQL) que almacena predicciones e histórico, 4) Dashboard (Grafana, Streamlit) para visualización. El modelo puede correr en el edge para baja latencia o en servidor para mayor capacidad de cómputo.
</details>

---

### Pregunta 9

¿Cómo se calcula el ROI de un proyecto de mantenimiento predictivo?

- A) Solo contando el costo del software
- B) (Costos evitados por paradas + ahorro en repuestos) / Inversión en el sistema
- C) Dividiendo las horas de trabajo entre el número de sensores
- D) No es posible calcular ROI en mantenimiento

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) (Costos evitados por paradas + ahorro en repuestos) / Inversión en el sistema**

El ROI considera: Beneficios = (Costo parada × Paradas evitadas) + (Ahorro en repuestos por intervención temprana) + (Ahorro mano de obra por planificación) - (Costo inspecciones adicionales). Inversión = Hardware + Software + Integración + Capacitación. ROI típico en industria es 300-1000% en primer año, con payback en 3-6 meses. El costo de una parada no programada suele ser 3-10× mayor que el mantenimiento planificado.
</details>

---

### Pregunta 10

Al generar un dataset sintético para entrenamiento, ¿por qué es importante incluir "ruido" en los datos?

- A) Para hacer el archivo más grande
- B) Para que el modelo sea robusto a las variaciones normales de sensores reales
- C) Porque los sensores industriales siempre fallan
- D) Para confundir al modelo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para que el modelo sea robusto a las variaciones normales de sensores reales**

Los sensores reales tienen ruido por: resolución del ADC, interferencia electromagnética, vibración mecánica, variaciones de temperatura ambiente, etc. Un modelo entrenado con datos "perfectos" sin ruido fallará en producción al ver estas variaciones. El ruido sintético (típicamente Gaussiano) simula estas condiciones y fuerza al modelo a aprender patrones significativos en lugar de memorizar valores exactos. Usualmente se agrega ruido con desviación estándar del 1-5% del rango del sensor.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas mantenimiento predictivo con IA |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 07 - IA para Mantenimiento Predictivo*
*10 preguntas - 10 minutos*
