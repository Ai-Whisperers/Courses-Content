# Módulo 2: Revisión Bibliográfica con IA
## Búsqueda Sistemática y Síntesis de Literatura

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Teórico-Práctico |
| **Prerrequisitos** | Módulo 1 completado |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Realizar búsquedas bibliográficas sistemáticas con herramientas de IA
2. Analizar y sintetizar papers usando LLMs
3. Identificar gaps de investigación con asistencia de IA
4. Crear mapas conceptuales de literatura
5. Gestionar referencias eficientemente

---

## Contenido

### 2.1 Búsqueda Sistemática con IA (30 min)

#### Herramientas de Búsqueda Especializada

| Herramienta | URL | Especialidad |
|-------------|-----|--------------|
| Semantic Scholar | semanticscholar.org | Búsqueda semántica, IA |
| Elicit | elicit.org | Extracción de información |
| Consensus | consensus.app | Síntesis de evidencia |
| Connected Papers | connectedpapers.com | Visualización de citas |
| Research Rabbit | researchrabbit.ai | Descubrimiento |

#### Estrategia de Búsqueda con IA

**Paso 1: Definir pregunta de investigación**
```
Prompt para refinar pregunta:

"Tengo una idea de investigación sobre [TEMA].
Ayúdame a formular una pregunta de investigación siguiendo
el formato PICO (Población, Intervención, Comparación, Outcome)
o PEO (Población, Exposición, Outcome) según corresponda."
```

**Paso 2: Generar términos de búsqueda**
```
Prompt para keywords:

"Para mi pregunta de investigación: [PREGUNTA]

Genera:
1. 5 términos de búsqueda principales en inglés
2. Sinónimos para cada término
3. Términos MeSH relacionados (si aplica)
4. Operadores booleanos sugeridos"
```

**Paso 3: Ejecutar búsqueda en múltiples fuentes**

```
┌─────────────────────────────────────────────────────────────┐
│  Semantic Scholar  →  Búsqueda inicial amplia               │
│         ↓                                                    │
│  Connected Papers  →  Expandir desde papers clave           │
│         ↓                                                    │
│  Consensus         →  Verificar consenso científico         │
│         ↓                                                    │
│  Elicit           →  Extracción estructurada                │
└─────────────────────────────────────────────────────────────┘
```

#### Filtrado Inteligente

Criterios para filtrar resultados:
- Relevancia por título y abstract
- Año de publicación (últimos 5-10 años)
- Factor de impacto de la revista
- Número de citas
- Tipo de estudio (empírico, revisión, meta-análisis)

---

### 2.2 Análisis de Papers con LLMs (35 min)

#### Extracción de Información Clave

**Prompt para análisis de paper:**
```
Analiza el siguiente paper científico:

[PEGAR TEXTO O SECCIONES CLAVE]

Extrae:
1. **Objetivo/Hipótesis:**
2. **Metodología:**
   - Diseño del estudio
   - Muestra/Datos
   - Variables principales
   - Análisis estadístico
3. **Resultados principales:**
4. **Conclusiones:**
5. **Limitaciones mencionadas:**
6. **Futuras líneas de investigación sugeridas:**
```

#### Comparación de Papers

**Prompt para síntesis comparativa:**
```
Compara los siguientes [N] papers sobre [TEMA]:

Paper 1: [Título, autores, año, hallazgos principales]
Paper 2: [Título, autores, año, hallazgos principales]
...

Genera una tabla comparativa con:
- Metodología
- Tamaño de muestra
- Hallazgos principales
- Fortalezas
- Debilidades
- Consistencia/contradicción con otros estudios
```

#### Evaluación Crítica Asistida

**Checklist de calidad:**
```
Para evaluar la calidad metodológica, considera:

□ ¿El diseño es apropiado para la pregunta?
□ ¿La muestra es adecuada y representativa?
□ ¿Hay grupo control (si aplica)?
□ ¿Se controlan variables confusoras?
□ ¿El análisis estadístico es apropiado?
□ ¿Las conclusiones se derivan de los datos?
□ ¿Se reportan limitaciones?
□ ¿Hay conflictos de interés declarados?
```

---

### 2.3 Síntesis de Literatura (30 min)

#### Creación de Matrices de Síntesis

**Estructura recomendada:**

| Autor (Año) | Objetivo | Método | Muestra | Hallazgos | Limitaciones |
|-------------|----------|--------|---------|-----------|--------------|
| Paper 1 | ... | ... | ... | ... | ... |
| Paper 2 | ... | ... | ... | ... | ... |

**Prompt para generar síntesis narrativa:**
```
Basándote en los siguientes estudios sobre [TEMA]:

[LISTA DE ESTUDIOS CON HALLAZGOS]

Escribe una síntesis narrativa de 500 palabras que:
1. Identifique temas comunes
2. Señale contradicciones entre estudios
3. Destaque evolución del conocimiento en el tiempo
4. Identifique gaps en la literatura
5. Sugiera direcciones futuras
```

#### Identificación de Gaps

**Prompt para encontrar gaps:**
```
Analiza la siguiente revisión de literatura sobre [TEMA]:

[RESUMEN DE LITERATURA]

Identifica:
1. Preguntas sin responder en la literatura
2. Poblaciones no estudiadas
3. Metodologías no aplicadas
4. Contextos geográficos/culturales no explorados
5. Contradicciones que requieren investigación adicional
```

---

### 2.4 Mapas Conceptuales y Visualización (15 min)

#### Herramientas de Visualización

| Herramienta | Uso | URL |
|-------------|-----|-----|
| Connected Papers | Mapa de citas | connectedpapers.com |
| VOSviewer | Redes bibliométricas | vosviewer.com |
| Litmaps | Timeline de literatura | litmaps.com |
| Obsidian | Notas conectadas | obsidian.md |

#### Creación de Mapa Conceptual con IA

**Prompt para estructura conceptual:**
```
Basándote en mi revisión sobre [TEMA], crea un mapa conceptual
en formato texto/markdown con:

1. Concepto central
2. Ramas principales (3-5 temas)
3. Sub-ramas (2-3 por rama principal)
4. Conexiones entre conceptos
5. Referencias clave para cada rama
```

---

### 2.5 Gestión de Referencias (10 min)

#### Integración con Zotero

**Flujo de trabajo recomendado:**

```
Encontrar paper → Guardar en Zotero → Leer y anotar →
Extraer info con IA → Organizar por temas → Citar en documento
```

#### Plugins útiles para Zotero

- **Zotero Connector:** Guardar desde navegador
- **ZotFile:** Gestión de PDFs
- **Better BibTeX:** Exportación para LaTeX
- **Zotero PDF Translate:** Traducción

#### Organización Sugerida

```
📁 Mi Investigación
├── 📁 Revisión Bibliográfica
│   ├── 📁 Tema Principal A
│   │   ├── 📁 Estudios Empíricos
│   │   ├── 📁 Revisiones
│   │   └── 📁 Meta-análisis
│   ├── 📁 Tema Principal B
│   └── 📁 Metodología
├── 📁 Papers Clave
└── 📁 Por Leer
```

---

## Actividad Práctica (30 min)

### Revisión Sistemática Mini

**Instrucciones:**

1. **Definir tema (5 min)**
   - Elegir un tema de su área de investigación
   - Formular pregunta de investigación con ayuda de IA

2. **Búsqueda (10 min)**
   - Realizar búsqueda en Semantic Scholar
   - Identificar 5 papers relevantes
   - Guardar en Zotero

3. **Análisis (10 min)**
   - Usar Claude/ChatGPT para analizar 2 papers
   - Crear tabla comparativa

4. **Síntesis (5 min)**
   - Escribir párrafo de síntesis
   - Identificar un gap potencial

---

## Recursos Adicionales

### Templates

- [Template de matriz de síntesis](../templates/synthesis-matrix.md)
- [Template de extracción de datos](../templates/data-extraction.md)

### Prompts Recomendados

Ver carpeta `prompts/literature-review.md` para biblioteca completa de prompts.

### Lecturas Sugeridas

- "How to read a paper" - S. Keshav
- "Writing a Literature Review" - University of Queensland Guide

---

## Puntos Clave

1. **Sistemático > Aleatorio:** Usar metodología estructurada
2. **Múltiples fuentes:** No depender de una sola herramienta
3. **Verificar siempre:** La IA puede cometer errores en resúmenes
4. **Documentar proceso:** Mantener registro de búsquedas y decisiones
5. **Organizar temprano:** Usar gestor de referencias desde el inicio

---

*Próximo módulo: Análisis de Datos Científicos con IA*
