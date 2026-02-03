# 20 Ideas para Usar IA en Investigación Académica

## Progresión: Principiante → Intermedio → Avanzado

---

# ADVERTENCIA CRÍTICA

**LA IA PUEDE INVENTAR CITAS Y REFERENCIAS FALSAS**

Antes de usar cualquiera de estas ideas, lee el archivo SAFETY-WARNINGS.md.
NUNCA incluyas en tu trabajo una referencia que no hayas verificado personalmente.

---

# NIVEL PRINCIPIANTE (Ideas 1-7)
*Comprensión de textos, organización básica, primeros pasos*

---

## 1. Resumir un Artículo Científico
**Qué:** Entender las ideas principales de un paper.

```bash
claude "Resume este abstract de artículo científico:

[Pegar el abstract aquí - máximo 300 palabras]

Necesito:
1. Objetivo del estudio en 1 oración
2. Metodología utilizada (en términos simples)
3. Hallazgo principal
4. Limitación mencionada (si hay)
5. ¿Es relevante para mi tema de [tu tema]?"
```

**Importante:** NUNCA pidas que la IA "busque" artículos. Solo analiza texto que TÚ le proporcionas de fuentes verificadas.

**Aprenderás:** Lectura crítica, identificación de componentes.

---

## 2. Explicar un Concepto Difícil
**Qué:** Entender terminología o teorías complejas.

```bash
claude "Explícame este concepto de mi área de estudio:

Concepto: [ej: 'Validez de constructo']
Área: [ej: Psicometría/Metodología]
Mi nivel: Estudiante de grado

Necesito:
1. Definición simple (como si explicaras a un compañero)
2. Un ejemplo concreto
3. Por qué es importante en investigación
4. Cómo se relaciona con [otro concepto que sí entiendo]
5. Errores comunes al entender este concepto"
```

**Aprenderás:** Comprensión de teoría, conexiones conceptuales.

---

## 3. Mejorar la Redacción de un Párrafo
**Qué:** Hacer más académico un texto informal.

```bash
claude "Mejora la redacción académica de este párrafo:

Texto original:
'Los estudiantes no estudian mucho y por eso les va mal.
Creo que si estudiaran más les iría mejor en los exámenes.
Esto es un problema grande en las universidades.'

Requisitos:
1. Tono académico formal
2. Evitar primera persona
3. Evitar afirmaciones sin respaldo
4. Usar conectores académicos
5. Dejar [cita] donde debería haber referencias

Dame 2 versiones: una conservadora y otra más elaborada."
```

**Aprenderás:** Redacción académica, formalidad, citación.

---

## 4. Convertir Bullets en Párrafo
**Qué:** Desarrollar ideas sueltas en texto fluido.

```bash
claude "Convierte estas notas en un párrafo académico:

Notas:
- Educación a distancia creció durante pandemia
- Muchos profesores sin capacitación
- Estudiantes con problemas de conexión
- Resultados mixtos en aprendizaje

Contexto: Marco teórico sobre educación virtual en Paraguay

Genera un párrafo de 100-150 palabras que:
- Integre todas las ideas
- Use conectores apropiados
- Fluya naturalmente
- Deje [cita] donde corresponda"
```

**Aprenderás:** Desarrollo de ideas, coherencia textual.

---

## 5. Crear Preguntas de Comprensión
**Qué:** Estudiar un texto mediante preguntas.

```bash
claude "Genera preguntas de estudio sobre este texto:

[Pegar sección del libro o artículo - máximo 500 palabras]

Genera:
1. 5 preguntas de comprensión básica (qué, quién, cuándo)
2. 3 preguntas de análisis (por qué, cómo)
3. 2 preguntas de aplicación (qué pasaría si...)
4. 1 pregunta de evaluación (qué opinas sobre...)

Incluye respuestas breves para autoevaluación."
```

**Aprenderás:** Técnicas de estudio, comprensión profunda.

---

## 6. Explicar Diferencias entre Conceptos
**Qué:** Distinguir términos que se confunden.

```bash
claude "Explica la diferencia entre estos conceptos:

Concepto 1: Validez
Concepto 2: Confiabilidad

Contexto: Metodología de investigación

Necesito:
1. Definición de cada uno (simple)
2. Tabla comparativa de diferencias
3. Un ejemplo donde algo sea válido pero no confiable
4. Un ejemplo donde algo sea confiable pero no válido
5. Por qué necesitamos ambos en investigación"
```

**Aprenderás:** Precisión conceptual, ejemplificación.

---

## 7. Organizar Fuentes Leídas
**Qué:** Crear matriz de literatura revisada.

```bash
claude "Ayúdame a organizar estas fuentes que leí:

Fuente 1: [Autor, año] - [idea principal que encontré]
Fuente 2: [Autor, año] - [idea principal que encontré]
Fuente 3: [Autor, año] - [idea principal que encontré]
Fuente 4: [Autor, año] - [idea principal que encontré]
Fuente 5: [Autor, año] - [idea principal que encontré]

Mi tema de investigación: [tu tema]

Crea una tabla con:
- Columnas: Autor/Año, Objetivo, Metodología, Hallazgo, Relevancia para mí
- Identificar patrones comunes
- Identificar contradicciones
- Gaps que podría investigar

NOTA: Uso solo las fuentes que yo proporcioné, no inventes otras."
```

**Aprenderás:** Organización de literatura, síntesis.

---

# NIVEL INTERMEDIO (Ideas 8-14)
*Diseño metodológico, análisis, redacción de secciones*

---

## 8. Diseñar Instrumento de Recolección
**Qué:** Crear cuestionario o guía de entrevista.

```bash
claude "Diseña un cuestionario para mi investigación:

Tema: Satisfacción laboral de docentes universitarios
Variable a medir: Satisfacción laboral
Dimensiones (de mi marco teórico):
- Relación con colegas
- Condiciones físicas
- Reconocimiento
- Salario

Población: Docentes de universidad pública en Paraguay

Genera:
1. 4 ítems por dimensión (16 total)
2. Escala Likert de 5 puntos
3. 2 ítems inversos (para control)
4. Instrucciones para el participante
5. Datos sociodemográficos a incluir

NOTA: Esto es un borrador. Debo validarlo con expertos."
```

**Aprenderás:** Diseño de instrumentos, operacionalización.

---

## 9. Planificar Análisis Estadístico
**Qué:** Determinar qué pruebas usar y por qué.

```bash
claude "Ayúdame a planificar el análisis estadístico:

Diseño: Correlacional
Variables:
- Autoeficacia académica (escala ordinal, 1-5)
- Rendimiento académico (promedio, continua)
- Género (categórica, 2 niveles)
Muestra: n = 150 estudiantes universitarios

Necesito saber:
1. Qué estadísticos descriptivos reportar para cada variable
2. Qué prueba usar para correlación (Pearson o Spearman y por qué)
3. Qué prueba usar para comparar por género
4. Supuestos a verificar para cada prueba
5. Cómo reportar resultados en APA

Dame ejemplos de cómo se vería el resultado redactado."
```

**Aprenderás:** Selección de pruebas, supuestos estadísticos.

---

## 10. Interpretar Output Estadístico
**Qué:** Entender los resultados de SPSS/JASP.

```bash
claude "Interpreta estos resultados de SPSS:

Prueba: t de Student para muestras independientes

Grupo 1 (Hombres): M = 3.45, SD = 0.78, n = 45
Grupo 2 (Mujeres): M = 3.89, SD = 0.65, n = 55

t(98) = -2.87, p = .005
d de Cohen = 0.60

Necesito:
1. ¿Es estadísticamente significativo? ¿Por qué?
2. ¿Qué significa prácticamente la d de Cohen de 0.60?
3. ¿Cuál grupo tiene mayor puntaje?
4. Redacta el resultado en formato APA
5. ¿Qué puedo concluir (y qué NO puedo concluir)?"
```

**Aprenderás:** Interpretación estadística, tamaño de efecto.

---

## 11. Estructurar el Marco Teórico
**Qué:** Organizar los capítulos teóricos.

```bash
claude "Ayúdame a estructurar mi marco teórico:

Tema: Impacto del uso de redes sociales en el rendimiento académico
de estudiantes universitarios

Variables:
- Uso de redes sociales (VI)
- Rendimiento académico (VD)
- Autorregulación del aprendizaje (mediadora)

Propón:
1. Estructura de capítulos y subcapítulos
2. Qué debería incluir cada sección (párrafo 1-2 líneas)
3. Orden lógico de presentación
4. Cómo conectar los capítulos entre sí
5. Extensión sugerida por sección

Basado en estructura típica de tesis de grado en Paraguay."
```

**Aprenderás:** Organización de tesis, estructura argumentativa.

---

## 12. Parafrasear Sin Plagiar
**Qué:** Reescribir ideas de autores correctamente.

```bash
claude "Ayúdame a parafrasear este texto académico:

Texto original (de [Autor, 2020]):
'El aprendizaje autorregulado implica que los estudiantes
establezcan metas, monitoreen su progreso hacia esas metas,
y ajusten sus estrategias de aprendizaje según sea necesario.'

Necesito:
1. Paráfrasis versión 1 (conservadora, misma estructura)
2. Paráfrasis versión 2 (más libre, diferente estructura)
3. Cuándo usar cita directa vs paráfrasis
4. Cómo citar correctamente en APA 7 para cada versión

IMPORTANTE: Mantener el significado original sin copiar frases."
```

**Aprenderás:** Parafraseo ético, evitar plagio.

---

## 13. Calcular Tamaño de Muestra
**Qué:** Determinar cuántos participantes necesitas.

```bash
claude "Calcula el tamaño de muestra para mi estudio:

Diseño: Cuasi-experimental (pre-post con grupo control)
Población: Estudiantes de 3er año de Ingeniería (N = 400)
Prueba estadística: t de Student para muestras relacionadas
Nivel de confianza: 95%
Potencia estadística: 80%
Tamaño de efecto esperado: mediano (d = 0.5)

Calcula:
1. n mínimo necesario por grupo
2. n considerando 15% de mortalidad experimental
3. Fórmula utilizada
4. Cómo justificar esto en la tesis
5. Qué pasa si solo consigo menos participantes"
```

**Aprenderás:** Cálculo muestral, potencia estadística.

---

## 14. Generar Código Python/R para Análisis
**Qué:** Crear scripts para análisis estadístico.

```bash
claude "Genera código Python para mi análisis:

Archivo: datos.csv
Columnas: id, genero, edad, puntaje_pre, puntaje_post, grupo

Análisis necesario:
1. Estadísticos descriptivos por grupo
2. Prueba t pareada (pre-post) para cada grupo
3. ANOVA mixto (grupo × tiempo)
4. Tamaño del efecto
5. Gráfico de medias con barras de error

Usa: pandas, scipy, statsmodels, matplotlib
Incluye comentarios explicando cada paso.
El código debe ser ejecutable y bien documentado."
```

**Aprenderás:** Análisis con Python, reproducibilidad.

---

# NIVEL AVANZADO (Ideas 15-20)
*Revisión sistemática, escritura avanzada, defensa*

---

## 15. Diseñar Protocolo de Revisión Sistemática
**Qué:** Planificar revisión de literatura rigurosa.

```bash
claude "Diseña protocolo de revisión sistemática:

Tema: Efectividad de gamificación en educación superior

Sigue el modelo PRISMA:

1. PREGUNTA PICO:
- P: Estudiantes universitarios
- I: Gamificación en clase
- C: Enseñanza tradicional
- O: Rendimiento académico

2. Estrategia de búsqueda:
- Términos y sinónimos
- Queries para Scopus, Web of Science, Eric
- Operadores booleanos

3. Criterios de selección:
- Inclusión
- Exclusión

4. Extracción de datos:
- Qué variables extraer de cada estudio

5. Evaluación de calidad:
- Instrumento a usar

6. Síntesis:
- Cómo organizar los resultados"
```

**Aprenderás:** Revisión sistemática, metodología rigurosa.

---

## 16. Escribir la Sección de Resultados
**Qué:** Redactar hallazgos de manera académica.

```bash
claude "Ayúdame a redactar la sección de resultados:

Datos que obtuve:
- Participantes: 120 estudiantes (60 hombres, 60 mujeres)
- Variable X: M = 3.75, SD = 0.82
- Variable Y: M = 4.12, SD = 0.65
- Correlación entre X e Y: r = .45, p < .001
- Diferencia por género en X: t(118) = 2.34, p = .021, d = 0.43

Necesito:
1. Párrafo de características de la muestra
2. Párrafo de estadísticos descriptivos
3. Párrafo de resultados inferenciales
4. Cómo introducir las tablas/figuras
5. Formato APA para todos los estadísticos

NO interpretar, solo describir objetivamente."
```

**Aprenderás:** Redacción de resultados, objetividad.

---

## 17. Escribir Discusión de Resultados
**Qué:** Interpretar y contextualizar hallazgos.

```bash
claude "Ayúdame a redactar la discusión:

Mi hallazgo principal:
- Correlación positiva (r = .45) entre autoeficacia y rendimiento

Estudios previos:
- García (2019): encontró r = .52 en muestra similar
- López (2020): encontró r = .38 en otra población
- Martínez (2021): no encontró relación significativa

Limitaciones de mi estudio:
- Muestra no probabilística
- Solo una universidad
- Diseño correlacional (no causal)

Escribe sección de discusión que:
1. Compare mis resultados con literatura previa
2. Explique coincidencias y discrepancias
3. Discuta las limitaciones honestamente
4. Sugiera implicaciones prácticas
5. Proponga futuras investigaciones"
```

**Aprenderás:** Discusión crítica, contextualización.

---

## 18. Preparar Defensa de Tesis
**Qué:** Anticipar preguntas del tribunal.

```bash
claude "Prepárame para la defensa de tesis:

Mi investigación:
- Tema: [tema]
- Objetivo: [objetivo general]
- Metodología: [diseño, muestra, instrumentos]
- Hallazgo principal: [resultado más importante]
- Limitación principal: [limitación más relevante]

Genera:
1. 10 preguntas probables del tribunal
2. Respuestas modelo (concisas, seguras)
3. 5 preguntas difíciles sobre metodología
4. Cómo responder si no sé la respuesta
5. Cómo defender mis decisiones metodológicas
6. Errores comunes en defensas (y cómo evitarlos)"
```

**Aprenderás:** Defensa oral, manejo de críticas.

---

## 19. Validación de Contenido de Instrumento
**Qué:** Preparar evaluación por expertos.

```bash
claude "Prepara validación de contenido por expertos:

Instrumento: Escala de satisfacción estudiantil (20 ítems)
Dimensiones: 4 (5 ítems cada una)

Genera:
1. Carta de invitación a expertos
2. Instrucciones para los evaluadores
3. Matriz de evaluación por ítem:
   - Claridad (1-4)
   - Coherencia (1-4)
   - Relevancia (1-4)
   - Suficiencia (1-4)
4. Espacio para comentarios
5. Cómo calcular V de Aiken
6. Criterio de aceptación/rechazo de ítems"
```

**Aprenderás:** Validación de instrumentos, juicio de expertos.

---

## 20. Escribir Artículo para Publicación
**Qué:** Adaptar tesis a formato de revista.

```bash
claude "Ayúdame a adaptar mi tesis a artículo científico:

Mi tesis tiene:
- 80 páginas de marco teórico
- Metodología detallada
- Resultados extensos
- Múltiples tablas y figuras

La revista requiere:
- Máximo 6000 palabras
- Máximo 5 tablas/figuras
- Abstract de 250 palabras
- Formato IMRaD

Necesito:
1. Qué mantener y qué eliminar
2. Cómo condensar el marco teórico
3. Qué resultados son publicables
4. Estructura sugerida con palabras por sección
5. Cómo escribir un título atractivo para revista
6. Checklist antes de enviar"
```

**Aprenderás:** Publicación científica, síntesis.

---

## Recordatorios Éticos OBLIGATORIOS

### NUNCA hagas esto:
- ❌ Pedir a la IA que "busque" referencias (inventa)
- ❌ Incluir citas sin verificar en Google Scholar/base de datos
- ❌ Copiar texto de IA sin reescribir y citar
- ❌ Usar datos inventados por la IA
- ❌ Omitir declarar el uso de IA si tu universidad lo requiere

### SIEMPRE haz esto:
- ✅ Proporcionar TÚ los textos a analizar
- ✅ Verificar CADA referencia en la fuente original
- ✅ Usar IA como asistente, no como autor
- ✅ Revisar y reescribir todo el contenido generado
- ✅ Mantener tu voz y estilo propio

### Para cada referencia, verifica:
1. ¿El autor existe?
2. ¿El artículo existe con ese título exacto?
3. ¿El año es correcto?
4. ¿La revista/editorial es real?
5. ¿El contenido citado está en el documento?

---

## Herramientas Complementarias Reales

- **Google Scholar:** Buscar artículos (no la IA)
- **Zotero/Mendeley:** Gestionar referencias
- **JASP (gratuito):** Análisis estadístico
- **Sci-Hub:** Acceder a artículos (verificar legalidad local)
- **Connected Papers:** Encontrar literatura relacionada

---

*20-IDEAS.md para Investigación Académica - FPUNA 2026*
