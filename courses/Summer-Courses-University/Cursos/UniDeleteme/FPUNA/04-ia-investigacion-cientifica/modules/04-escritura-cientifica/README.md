# Módulo 4: Escritura Científica con IA
## Redacción, Estilo y Preparación de Manuscritos

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Teórico-Práctico |
| **Prerrequisitos** | Módulos 1-3 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Estructurar papers científicos con asistencia de IA
2. Mejorar la redacción y estilo académico
3. Preparar abstracts efectivos
4. Responder a revisores con estrategias asistidas por IA
5. Usar LaTeX con herramientas de IA

---

## Contenido

### 4.1 Estructura de Papers Científicos (25 min)

#### Formato IMRaD (Introduction, Methods, Results, and Discussion)

```
┌─────────────────────────────────────────────────────────────┐
│                         TÍTULO                               │
├─────────────────────────────────────────────────────────────┤
│                       ABSTRACT                               │
│  (Resumen completo del estudio: 150-300 palabras)           │
├─────────────────────────────────────────────────────────────┤
│  INTRODUCTION           │  ¿Por qué? - Contexto y gap       │
├─────────────────────────────────────────────────────────────┤
│  METHODS                │  ¿Cómo? - Procedimiento           │
├─────────────────────────────────────────────────────────────┤
│  RESULTS                │  ¿Qué encontraste? - Datos        │
├─────────────────────────────────────────────────────────────┤
│  DISCUSSION             │  ¿Qué significa? - Interpretación │
├─────────────────────────────────────────────────────────────┤
│  CONCLUSIONS            │  Principales hallazgos y futuro   │
├─────────────────────────────────────────────────────────────┤
│  REFERENCES             │  Citas completas                   │
└─────────────────────────────────────────────────────────────┘
```

#### Propósito de Cada Sección

| Sección | Propósito | Tiempo Verbal |
|---------|-----------|---------------|
| Abstract | Resumen autónomo del estudio | Pasado |
| Introduction | Establecer contexto, gap, objetivos | Presente/Pasado |
| Methods | Describir procedimientos | Pasado |
| Results | Presentar hallazgos | Pasado |
| Discussion | Interpretar y contextualizar | Presente |

#### Prompt para Estructuración

```
Tengo un estudio sobre [TEMA] con los siguientes elementos:

- Pregunta de investigación: [X]
- Metodología: [Y]
- Principales hallazgos: [Z]

Ayúdame a crear un outline detallado para cada sección
del paper (IMRaD), incluyendo:
1. Puntos clave a cubrir en cada sección
2. Orden lógico de presentación
3. Conexiones entre secciones
4. Extensión sugerida por sección
```

---

### 4.2 Redacción Asistida por IA (35 min)

#### Mejora de Estilo Académico

**Prompt para mejora de redacción:**
```
Revisa el siguiente párrafo de mi paper científico:

[PEGAR PÁRRAFO]

Por favor:
1. Mejora la claridad y fluidez
2. Corrige errores gramaticales
3. Usa lenguaje académico apropiado
4. Mantén el significado original
5. Sugiere alternativas para palabras repetidas
6. Indica qué cambios hiciste y por qué
```

#### Principios de Escritura Científica

| Principio | Descripción | Ejemplo |
|-----------|-------------|---------|
| Claridad | Una idea por oración | Evitar oraciones de >30 palabras |
| Precisión | Términos específicos | "aumentó 25%" vs "aumentó mucho" |
| Concisión | Sin palabras innecesarias | "utilizar" → "usar" |
| Objetividad | Evitar valoraciones | "excelentes" → "altos" |
| Consistencia | Mismo término siempre | No alternar "pacientes/sujetos" |

#### Errores Comunes a Evitar

```
❌ EVITAR:
- "Es bien sabido que..." (vago)
- "Obviamente..." (asume conocimiento)
- "Muy significativo" (redundante)
- "Se realizó un estudio" (pasivo innecesario)
- "etc." (impreciso)

✅ PREFERIR:
- "Estudios previos demuestran (cita)"
- "Los datos muestran que..."
- "Estadísticamente significativo (p<0.05)"
- "Realizamos un estudio"
- Listar elementos específicos
```

#### Transiciones Efectivas

```
Para agregar: además, asimismo, de igual manera
Para contrastar: sin embargo, no obstante, por el contrario
Para causa: debido a, como resultado, por consiguiente
Para ejemplificar: por ejemplo, específicamente, en particular
Para concluir: en conclusión, en resumen, finalmente
```

---

### 4.3 Preparación de Abstracts (20 min)

#### Estructura del Abstract Estructurado

```
┌─────────────────────────────────────────────────────────────┐
│ BACKGROUND/OBJETIVO (1-2 oraciones)                         │
│ ¿Por qué se hizo el estudio?                                │
├─────────────────────────────────────────────────────────────┤
│ MÉTODOS (2-3 oraciones)                                     │
│ ¿Cómo se realizó?                                           │
├─────────────────────────────────────────────────────────────┤
│ RESULTADOS (2-3 oraciones)                                  │
│ ¿Qué se encontró? (con datos específicos)                   │
├─────────────────────────────────────────────────────────────┤
│ CONCLUSIONES (1-2 oraciones)                                │
│ ¿Qué significa? ¿Implicaciones?                             │
└─────────────────────────────────────────────────────────────┘
```

#### Prompt para Generar Abstract

```
Basándote en la siguiente información de mi paper:

TÍTULO: [X]
OBJETIVO: [Y]
METODOLOGÍA: [describir brevemente]
RESULTADOS PRINCIPALES: [listar con datos]
CONCLUSIÓN: [implicación principal]

Genera un abstract de 250 palabras máximo que:
1. Siga estructura estándar (Background, Methods, Results, Conclusions)
2. Incluya datos cuantitativos clave
3. Sea auto-contenido (comprensible sin leer el paper)
4. Use palabras clave relevantes para indexación
5. Evite abreviaturas no estándar
```

#### Checklist de Abstract

- [ ] ¿Establece el contexto/problema?
- [ ] ¿Indica el objetivo claramente?
- [ ] ¿Describe la metodología esencial?
- [ ] ¿Incluye resultados cuantitativos?
- [ ] ¿Presenta la conclusión principal?
- [ ] ¿Está dentro del límite de palabras?
- [ ] ¿Es auto-contenido?

---

### 4.4 Respuesta a Revisores (25 min)

#### Estructura de Respuesta

```
RESPONSE TO REVIEWERS

Reviewer 1, Comment 1:
[Copiar comentario textual]

RESPONSE:
[Agradecer el comentario]
[Responder específicamente]
[Indicar cambios realizados con ubicación]
[Si no se acepta la sugerencia, justificar]

Changes in manuscript:
- Page X, Line Y: [Describir cambio]
```

#### Prompt para Respuesta a Revisores

```
Recibí el siguiente comentario de un revisor:

"[PEGAR COMENTARIO]"

Contexto de mi paper:
- El estudio trata sobre: [X]
- Metodología usada: [Y]
- El revisor parece preocupado por: [Z]

Ayúdame a:
1. Analizar qué está pidiendo el revisor
2. Redactar una respuesta profesional y diplomática
3. Sugerir cambios al manuscrito que aborden la preocupación
4. Si el comentario no es válido, argumentar respetuosamente
```

#### Tipos de Comentarios y Estrategias

| Tipo | Estrategia | Ejemplo de Respuesta |
|------|------------|---------------------|
| Clarificación | Explicar y mejorar texto | "Agradecemos la observación. Hemos clarificado..." |
| Metodológico | Justificar o agregar análisis | "El revisor tiene razón. Hemos añadido..." |
| Análisis adicional | Realizar y reportar | "Hemos realizado el análisis sugerido..." |
| Desacuerdo | Argumentar respetuosamente | "Apreciamos esta perspectiva. Sin embargo..." |
| Literatura | Agregar citas | "Hemos incluido las referencias sugeridas..." |

#### Respuestas Difíciles

**Cuando no estás de acuerdo:**
```
"Agradecemos al revisor por esta sugerencia.
Hemos considerado cuidadosamente este punto.
Sin embargo, [justificación basada en evidencia].
No obstante, hemos añadido una aclaración en la
sección de Discusión para abordar esta perspectiva."
```

**Cuando no puedes hacer lo pedido:**
```
"Esta es una excelente sugerencia para investigación futura.
Lamentablemente, debido a [limitación específica], no es
posible incluir este análisis en el presente estudio.
Hemos añadido esto como limitación y dirección futura."
```

---

### 4.5 LaTeX con Asistencia de IA (15 min)

#### Ventajas de LaTeX para Papers

- Formato profesional automático
- Manejo excelente de ecuaciones
- Gestión de referencias integrada
- Muchas revistas proporcionan templates

#### Herramientas Recomendadas

| Herramienta | Uso | URL |
|-------------|-----|-----|
| Overleaf | Editor online colaborativo | overleaf.com |
| TeX Studio | Editor local | texstudio.org |
| BibTeX | Gestión de referencias | - |

#### Prompts para LaTeX

**Generar tabla:**
```
Genera código LaTeX para una tabla con:
- 3 columnas: Variable, Control, Tratamiento
- 5 filas de datos
- Caption y label
- Formato profesional para paper científico
```

**Generar ecuación:**
```
Escribe en LaTeX la ecuación para:
[Describir ecuación]

Incluye numeración y alineación apropiada.
```

#### Ejemplo de Código LaTeX

```latex
\begin{table}[htbp]
\centering
\caption{Comparación de medidas entre grupos}
\label{tab:resultados}
\begin{tabular}{lcc}
\hline
Variable & Control (n=50) & Tratamiento (n=50) \\
\hline
Edad (años) & 35.2 ± 8.4 & 34.8 ± 7.9 \\
Medida pre & 50.3 ± 12.1 & 49.8 ± 11.5 \\
Medida post & 52.1 ± 11.8 & 58.4 ± 10.2* \\
\hline
\multicolumn{3}{l}{\footnotesize *p < 0.05 vs Control}
\end{tabular}
\end{table}
```

---

## Actividad Práctica (30 min)

### Mejorar una Sección de Paper

**Instrucciones:**

1. **Seleccionar texto (5 min)**
   - Use un párrafo de su propia investigación
   - O use el texto de ejemplo proporcionado

2. **Mejorar con IA (10 min)**
   - Aplicar prompts de mejora de estilo
   - Revisar y editar sugerencias de IA

3. **Escribir abstract (10 min)**
   - Crear abstract de 200 palabras
   - Usar prompt de generación

4. **Peer review (5 min)**
   - Intercambiar con compañero
   - Dar feedback constructivo

---

## Recursos Adicionales

### Templates

- [Template de estructura IMRaD](../templates/paper-structure.md)
- [Template de respuesta a revisores](../templates/reviewer-response.md)

### Herramientas de Escritura

- Grammarly: Corrección gramatical
- Writefull: Escritura académica
- Paperpal: Edición de papers

### Lecturas Recomendadas

- "How to Write a Great Research Paper" - Simon Peyton Jones
- "Writing Science" - Joshua Schimel

---

## Puntos Clave

1. **Estructura primero:** Planificar antes de escribir
2. **IA como editor:** Usar para mejorar, no para generar desde cero
3. **Verificar siempre:** La IA puede introducir errores sutiles
4. **Mantener voz:** El paper debe sonar como usted, no como IA
5. **Transparencia:** Declarar uso de IA según políticas de revista

---

*Próximo módulo: Código de Investigación con IA*
