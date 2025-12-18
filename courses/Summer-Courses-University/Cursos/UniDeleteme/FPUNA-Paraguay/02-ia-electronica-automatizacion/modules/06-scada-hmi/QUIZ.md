# Quiz - Módulo 06
## IA para SCADA y HMI

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

Según el estándar ISA-101 para HMI de alto rendimiento, ¿cuál debe ser el color de fondo predominante?

- A) Negro
- B) Blanco
- C) Gris medio (#808080)
- D) Azul

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Gris medio (#808080)**

ISA-101 recomienda fondo gris neutro para: reducir fatiga visual en turnos de 12 horas, permitir que los colores de estado (rojo, verde) resalten claramente, y minimizar distracciones. Los colores brillantes se reservan solo para indicar estados que requieren atención.
</details>

---

### Pregunta 2

Al diseñar un sistema de alarmas con IA, ¿qué parámetro es crítico para evitar alarmas falsas?

- A) El color de la alarma
- B) Deadband (histéresis) y delay time
- C) El nombre del tag
- D) La posición en pantalla

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Deadband (histéresis) y delay time**

El deadband evita oscilación de alarma cuando una variable fluctúa cerca del setpoint. El delay time requiere que la condición persista antes de alarmar, filtrando transitorios. Juntos reducen significativamente las alarmas falsas (chattering) que causan fatiga al operador.
</details>

---

### Pregunta 3

En una matriz de prioridades de alarmas, ¿cuál acción corresponde a Prioridad 1 (Crítica)?

- A) Revisar en próximo turno
- B) Solo registro, sin acción
- C) Respuesta inmediata (< 1 minuto), posible parada automática
- D) Respuesta en 30 minutos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Respuesta inmediata (< 1 minuto), posible parada automática**

Las alarmas de Prioridad 1 indican riesgo inminente para seguridad, medio ambiente o equipo crítico. Requieren: respuesta inmediata del operador, pueden activar interlocks automáticos, y típicamente incluyen notificaciones adicionales (SMS, sirena). El tiempo de respuesta debe ser menor a 1 minuto.
</details>

---

### Pregunta 4

Al solicitar código Python para análisis de datos SCADA, ¿qué biblioteca es estándar para detección de anomalías?

- A) matplotlib
- B) pandas
- C) scikit-learn (Isolation Forest)
- D) numpy

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) scikit-learn (Isolation Forest)**

Isolation Forest de scikit-learn es el algoritmo estándar para detección de anomalías en datos industriales. Funciona sin etiquetas (no supervisado), detecta outliers eficientemente, y es robusto con datos de alta dimensionalidad típicos de SCADA.
</details>

---

### Pregunta 5

En diseño HMI, ¿qué significa el principio "máximo 3 clics"?

- A) Hacer clic 3 veces en cada botón
- B) El operador debe poder acceder a cualquier información crítica en 3 clics o menos
- C) Tener máximo 3 botones por pantalla
- D) Actualizar cada 3 segundos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) El operador debe poder acceder a cualquier información crítica en 3 clics o menos**

La regla de 3 clics mejora la usabilidad y reduce el tiempo de respuesta en emergencias. Estructura típica: pantalla principal (1 clic) → pantalla de área (2 clics) → detalle de equipo (3 clics). Navegación más profunda indica diseño deficiente.
</details>

---

### Pregunta 6

¿Cuál es la ventaja de usar IA para generar configuración de tendencias (trends)?

- A) Los gráficos son más coloridos
- B) Puede sugerir variables correlacionadas, escalas apropiadas, y períodos de visualización óptimos
- C) Funciona más rápido
- D) No requiere base de datos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Puede sugerir variables correlacionadas, escalas apropiadas, y períodos de visualización óptimos**

La IA puede analizar relaciones entre variables (presión vs caudal), recomendar escalas que eviten distorsión visual, y sugerir períodos típicos para análisis (8h turno, 24h día, 7d semana). Esto produce tendencias más útiles para diagnóstico.
</details>

---

### Pregunta 7

Al configurar animaciones para símbolo de bomba, ¿qué estado debe usar color parpadeante?

- A) Bomba en marcha (RUN)
- B) Bomba parada (OFF)
- C) Bomba en falla (FAULT)
- D) Bomba en manual

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Bomba en falla (FAULT)**

El parpadeo es el indicador visual más fuerte y debe reservarse para condiciones anormales que requieren atención inmediata. Una falla de bomba es crítica y debe destacar sobre estados normales. El parpadeo continuo en estados normales causa fatiga visual.
</details>

---

### Pregunta 8

¿Para qué se usa el parámetro "contamination" al configurar Isolation Forest para datos SCADA?

- A) Para limpiar la pantalla
- B) Para especificar la proporción esperada de datos anómalos
- C) Para colorear las anomalías
- D) Para eliminar todos los datos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para especificar la proporción esperada de datos anómalos**

Si se sabe que aproximadamente el 5% de los datos históricos corresponden a condiciones anormales, se configura contamination=0.05. Esto ajusta el umbral de decisión del modelo para clasificar correctamente esa fracción como anomalías.
</details>

---

### Pregunta 9

Al integrar análisis ML con SCADA, ¿cuál es la arquitectura típica para predicción de fallos?

- A) ML directamente en el PLC
- B) PLC → SCADA → Historian → ETL Python → ML Engine → Alarmas predictivas
- C) Solo Excel con gráficos
- D) Análisis manual diario

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) PLC → SCADA → Historian → ETL Python → ML Engine → Alarmas predictivas**

La arquitectura típica separa capas: PLC (control en tiempo real), SCADA (supervisión y alarmas), Historian (almacenamiento SQL), ETL (extracción y limpieza con Python), ML Engine (modelos predictivos), y finalmente generación de alarmas predictivas que regresan al SCADA.
</details>

---

### Pregunta 10

¿Por qué es importante solicitar confirmación de acciones en scripts HMI?

- A) Para hacer la interfaz más lenta
- B) Para prevenir acciones accidentales que puedan afectar seguridad o producción
- C) Para registrar el nombre del operador
- D) Por requisitos estéticos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para prevenir acciones accidentales que puedan afectar seguridad o producción**

Un clic accidental en "Arrancar bomba" o "Abrir válvula" puede tener consecuencias graves. La confirmación ("¿Está seguro de arrancar P-101?") añade una barrera de seguridad que previene errores humanos. ISA-101 y normas de seguridad funcional lo requieren para comandos críticos.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas diseño SCADA/HMI con IA |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 06 - IA para SCADA y HMI*
*10 preguntas - 10 minutos*
