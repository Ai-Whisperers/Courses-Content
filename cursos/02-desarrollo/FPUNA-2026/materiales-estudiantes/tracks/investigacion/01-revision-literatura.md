# 📚 Módulo 1: Revisión de Literatura con IA

**Duración**: 4 horas
**Nivel**: Principiante-Intermedio
**Formato**: 100% Impulsado por IA

## 🎯 Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

- [ ] Realizar búsquedas sistemáticas de literatura usando prompts de IA
- [ ] Analizar y sintetizar artículos académicos con OpenCode MCPs
- [ ] Identificar brechas de investigación usando análisis impulsado por IA
- [ ] Crear revisiones de literatura en formato Markdown
- [ ] Generar redes de citas automáticamente

## 🛠️ Herramientas Requeridas (100% Gratuitas)

- **OpenCode** con Oh My OpenCode MCPs
- **Claude/GPT-4** para análisis
- **Lector de Markdown** para visualización

---

## 📖 Contenido Principal

### Parte 1: Descubrimiento de Literatura Impulsado por IA

#### Búsqueda Sistemática con IA

```bash
opencode "Realiza búsqueda sistemática de literatura académica sobre:

TÉRMINOS DE BÚSQUEDA:
- 'artificial intelligence in education'
- 'machine learning educational outcomes'
- 'chatgpt programming learning'
- 'educational technology latin america'

CRITERIOS DE INCLUSIÓN:
- Últimos 5 años (2019-2024)
- Revisión sistemática (prioridad)
- Estudios experimentales
- Contexto América Latina
- Acceso abierto

OUTPUT REQUERIDO:
- Lista de 30+ papers relevantes
- Exportar en formato Markdown
- Incluir DOI, año, journal, autores
- Resumen de 100 palabras por paper
- Clasificación por tema/metodología"

BUSCAR EN:
- arXiv
- PubMed
- IEEE Xplore
- Google Scholar
- SciELO
```

#### Análisis de Red de Citas con IA

```bash
opencode "Analiza red de citas de estos papers:

PAPERS BASE:
@attach literature_list.md

ANÁLISIS REQUERIDO:
1. Identificar papers más citados
2. Encontrar clusters temáticos
3. Detectar autores influyentes
4. Mapear evolución temporal
5. Identificar gaps de investigación

VISUALIZACIÓN:
- Generar diagrama de red en Markdown
- Muestra conexiones principales
- Destaca papers seminales
- Identifica áreas sin explorar

OUTPUT:
- Tabla de análisis de citas
- Identificación de 3-5 gaps principales
- Sugerencias para futura investigación"
```

### Parte 2: Análisis de Papers Impulsado por IA

#### Síntesis de Papers con IA

```bash
opencode "Sintetiza estos 20 papers académicos:

COLECCIÓN:
@attach papers_selected.md

SÍNTESIS REQUERIDA:
1. Tendencias metodológicas principales
2. Frameworks teóricos dominantes
3. Contexto geográfico (foco Paraguay/LatAm)
4. Limitaciones comunes en estudios
5. Áreas de controversia o desacuerdo

CLASIFICACIÓN:
- Por enfoque metodológico
- Por contexto educativo
- Por tecnología utilizada
- Por nivel educativo

OUTPUT:
- Tabla comparativa de estudios
- Identificación de 3-5 tendencias
- Lista de limitaciones recurrentes
- Sugerencias de investigación futura"
```

#### Identificación de Brechas de Investigación con IA

```bash
opencode "Identifica gaps de investigación específicos:

CONTEXTO:
- Educación superior en Paraguay
- Uso de IA en aprendizaje de programación
- Estudios previos analizados en @attach synthesis_results.md

GAPS A IDENTIFICAR:
1. Metodológicos (diseños no utilizados)
2. Contextuales (poblaciones no estudiadas)
3. Tecnológicos (herramientas no evaluadas)
4. Geográficos (regiones sin investigación)
5. Temporales (tendencias emergentes)

CRITERIOS DE GAP VÁLIDO:
- Factible de investigar
- Relevante académicamente
- Con impacto potencial
- No abundantemente cubierto

OUTPUT:
- 3-5 gaps específicos y justificados
- Viabilidad de cada gap
- Potencial contribución
- Sugerencia de diseño metodológico"
```

### Parte 3: Organización de Literatura Impulsada por IA

#### Sistema de Referencias Basado en Markdown

```bash
opencode "Organiza bibliografía en Markdown académico:

REFERENCIAS:
@attach raw_papers.md

ESTRUCTURA REQUERIDA:
```markdown
# Bibliografía Temática

## AI en Educación Superior
[Paper 1 - Formato completo]
[Paper 2 - Formato completo]

## Aprendizaje de Programación
[Paper 3 - Formato completo]
[Paper 4 - Formato completo]

## Contexto Paraguayo
[Paper 5 - Formato completo]
[Paper 6 - Formato completo]

## Metodologías Experimentales
[Paper 7 - Formato completo]
[Paper 8 - Formato completo]

# Referencias Completas
[Todas las referencias en formato académico estándar]

REQUISITOS:
- Formato académico consistente
- DOI incluido cuando disponible
- Autores completos
- Año, journal, volumen, páginas
- Palabras clave para búsqueda

OUTPUT:
- Archivo .md organizado
- Índice temático
- Referencias completas
- Sistema de búsqueda por palabras clave"
```

---

## 🛠️ Ejercicios Prácticos

### Ejercicio 1: Revisión de Literatura Completa (90 minutos)

**Tarea**: Crear una revisión de literatura completa usando solo herramientas de IA.

**Pasos**:
1. Usa OpenCode para buscar 20+ papers sobre tu tema
2. Pide a la IA que analice y sintetice los hallazgos
3. Identifica 3 brechas de investigación
4. Crea una bibliografía estructurada en Markdown
5. Genera una revisión de literatura de 1500 palabras

**Output Esperado**:
- `literature_search_results.md`
- `paper_synthesis.md`
- `research_gaps.md`
- `final_literature_review.md`

### Ejercicio 2: Análisis de Red de Citas (60 minutos)

**Tarea**: Mapear relaciones de citas usando IA.

**Pasos**:
1. Ingresa tu colección de papers a la IA
2. Solicita análisis de red de citas
3. Genera visualización en Markdown
4. Identifica papers influyentes y brechas
5. Crea línea de tiempo de investigación

**Output Esperado**:
- `citation_network.md`
- `influential_papers.md`
- `research_timeline.md`

---

## ✅ Evaluación del Módulo

### Proyecto de Revisión de Literatura (100 puntos)

**Entregables**:
1. **Resultados de Búsqueda Sistemática** (20 puntos)
   - 25+ papers relevantes
   - Formato Markdown adecuado
   - Citas completas

2. **Análisis de Síntesis** (30 puntos)
   - Clasificación temática
   - Identificación de tendencias
   - Patrones metodológicos

3. **Análisis de Brechas** (25 puntos)
   - 3-5 brechas justificadas
   - Evaluación de viabilidad
   - Potencial de contribución

4. **Documento de Revisión Final** (25 puntos)
   - 1500-2000 palabras
   - Estructura académica
   - Formato Markdown

**Nota de Aprobación**: 70/100 puntos

---

## 🔄 Referencias Cruzadas

**Prerrequisito para**: Módulo 2: Metodología de Investigación
**Habilidades Relacionadas**: Ingeniería de prompts IA, síntesis académica
**Siguiente Paso**: Usar brechas identificadas para formular preguntas de investigación

---

## 💡 Consejos de IA para el Éxito

### Estructura de Prompt Efectiva
```
opencode "Analiza [contenido] para [propósito]:
CONTEXTO: [info de fondo]
TAREA: [análisis específico necesario]
FORMATO OUTPUT: [estructura deseada]
REQUISITOS: [restricciones específicas]"
```

### Refinamiento Iterativo
1. Comienza con términos de búsqueda amplios
2. Refina basado en resultados
3. Usa IA para identificar palabras clave adicionales
4. Cruza hallazgos
5. Valida brechas con múltiples consultas de IA

### Aseguramiento de Calidad
- Pide a la IA verificar la calidad del paper
- Solicita evaluación de metodología
- Verifica desarrollos recientes
- Valida viabilidad de la brecha

---

## ⚠️ Errores Comunes a Evitar

- **Términos de búsqueda demasiado amplios** → Sé específico en tus prompts
- **No suficientes papers** → Solicita búsquedas adicionales con diferentes palabras clave
- **Mala organización** → Usa IA para estructurar tu bibliografía
- **Información de DOI faltante** → Pide a la IA localizar DOIs faltantes
- **Formato inconsistente** → Usa IA para estandarización

---

## 🤝 Obteniendo Ayuda

- **Slack**: #research-ai-literature
- **Horas de Oficina**: Martes 18:00-20:00
- **Email**: literature-support@fpuna.edu.py

---

## 📁 Recursos

### Prompts Esenciales de IA
```bash
# Búsqueda de literatura
opencode "Encuentra revisiones sistemáticas sobre [tema] publicadas [rango de años] con [metodología]"

# Análisis de paper
opencode "Analiza metodología y hallazgos de este paper: @attach paper.pdf"

# Identificación de brechas
opencode "Identifica brechas de investigación en esta revisión de literatura: @attach review.md"
```

### Comandos de Referencia Rápida
```bash
# Buscar en arXiv
opencode "Busca en arXiv papers recientes sobre [tema]"

# Generar citas
opencode "Formatea estas referencias en estilo académico: @attach refs.md"

# Crear bibliografía
opencode "Organiza estos papers por tema y año: @attach papers.md"
```

---

## 🎯 Lista de Verificación del Módulo

- [ ] Búsqueda de literatura completada con 25+ papers
- [ ] Análisis de síntesis de papers generado
- [ ] Brechas de investigación identificadas y justificadas
- [ ] Bibliografía organizada en Markdown
- [ ] Revisión de literatura final escrita (1500+ palabras)
- [ ] Todos los outputs formateados adecuadamente
- [ ] Evaluación enviada (70+ puntos)

**🚀 ¡Listo para el Módulo 2: Metodología de Investigación con IA!**

---

*Módulo 1 - Revisión de Literatura con IA - FPUNA 2026*
