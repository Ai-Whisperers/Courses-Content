# 📚 Module 1: Literature Review with AI

**Duration**: 4 hours  
**Level**: Beginner-Intermediate  
**Format**: 100% AI-Driven

## 🎯 Learning Objectives

By completing this module, you will be able to:

- [ ] Conduct systematic literature searches using AI prompts
- [ ] Analyze and synthesize academic papers with OpenCode MCPs
- [ ] Identify research gaps using AI-powered analysis
- [ ] Create literature reviews in Markdown format
- [ ] Generate citation networks automatically

## 🛠️ Required Tools (100% Free)

- **OpenCode** with Oh My OpenCode MCPs
- **Claude/GPT-4** for analysis
- **Markdown reader** for visualization

## ❌ Tools NOT Needed

- ❌ Zotero, Mendeley, EndNote
- ❌ Connected Papers, Research Rabbit
- ❌ Reference managers
- ❌ Manual literature organization

---

## 📖 Core Content

### Part 1: AI-Powered Literature Discovery

#### Systematic Search with AI

```bash
opencode "Realiza búsqueda sistemática de literatura académica sobre:

TÉRMINOS DE BÚSQUEDA:
- 'artificial intelligence in education'
- 'machine learning educational outcomes'
- 'chatgpt programming learning'
- 'educational technology latin america'

CRITERIOS DE INCLUSIÓN:
- Últimos 5 años (2019-2024)
- Revisión sistemática优先
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

#### Citation Network Analysis with AI

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

### Part 2: AI-Powered Paper Analysis

#### Paper Synthesis with AI

```bash
opencode "Sintetiza estos 20 papers académicos:

COLECCIÓN:
@attach papers_selected.md

SÍNTESIS REQUERIDA:
1. Tendencias metodológicas principales
2. Frameworks teóricos dominantes
3. Contexto geográfico (foco Paraguay/LatAm)
4. Limitaciones comunes en estudios
5. Áreas争议 o desacuerdo

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

#### Research Gap Identification with AI

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

### Part 3: AI-Powered Literature Organization

#### Markdown-Based Reference System

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
- Consistente academic formatting
- DOI incluido cuando disponible
- Autores completos
- Año, journal, volumen, páginas
- Keywords para búsqueda

OUTPUT:
- Archivo .md organizado
- Índice temático
- Referencias completas
- Sistema de búsqueda por keywords"
```

---

## 🛠️ Practical Exercises

### Exercise 1: Complete Literature Review (90 minutes)

**Task**: Create a complete literature review using only AI tools.

**Steps**:
1. Use OpenCode to search for 20+ papers on your topic
2. Ask AI to analyze and synthesize findings
3. Identify 3 research gaps
4. Create structured Markdown bibliography
5. Generate 1500-word literature review

**Expected Output**:
- `literature_search_results.md`
- `paper_synthesis.md` 
- `research_gaps.md`
- `final_literature_review.md`

### Exercise 2: Citation Network Analysis (60 minutes)

**Task**: Map citation relationships using AI.

**Steps**:
1. Input your paper collection to AI
2. Request citation network analysis
3. Generate Markdown visualization
4. Identify influential papers and gaps
5. Create research timeline

**Expected Output**:
- `citation_network.md`
- `influential_papers.md`
- `research_timeline.md`

---

## ✅ Module Assessment

### Literature Review Project (100 points)

**Deliverables**:
1. **Systematic Search Results** (20 points)
   - 25+ relevant papers
   - Proper Markdown formatting
   - Complete citations

2. **Synthesis Analysis** (30 points)
   - Thematic classification
   - Trend identification
   - Methodological patterns

3. **Gap Analysis** (25 points)
   - 3-5 justified gaps
   - Feasibility assessment
   - Contribution potential

4. **Final Review Document** (25 points)
   - 1500-2000 words
   - Academic structure
   - Markdown formatting

**Passing Grade**: 70/100 points

---

## 🔄 Cross-References

**Prerequisite for**: Module 2: Research Methodology  
**Related Skills**: AI prompt engineering, academic synthesis  
**Next Step**: Use identified gaps to formulate research questions

---

## 💡 AI Tips for Success

### Effective Prompt Structure
```
opencode "Analyze [content] for [purpose]:
CONTEXT: [background info]
TASK: [specific analysis needed]
OUTPUT FORMAT: [desired structure]
REQUIREMENTS: [specific constraints]"
```

### Iterative Refinement
1. Start broad search terms
2. Refine based on results
3. Use AI to identify additional keywords
4. Cross-reference findings
5. Validate gaps with multiple AI queries

### Quality Assurance
- Ask AI to verify paper quality
- Request methodology assessment
- Check for recent developments
- Validate gap feasibility

---

## ⚠️ Common Pitfalls to Avoid

- **Overly broad search terms** → Be specific in your prompts
- **Not enough papers** → Request additional searches with different keywords
- **Poor organization** → Use AI to structure your bibliography
- **Missing DOI information** → Ask AI to locate missing DOIs
- **Inconsistent formatting** → Use AI for standardization

---

## 🤝 Getting Help

- **Slack**: #research-ai-literature
- **Office Hours**: Tuesday 18:00-20:00
- **Email**: literature-support@fpuna.edu.py

---

## 📁 Resources

### Essential AI Prompts
```bash
# Literature search
opencode "Find systematic reviews on [topic] published [year range] with [methodology]"

# Paper analysis  
opencode "Analyze methodology and findings of this paper: @attach paper.pdf"

# Gap identification
opencode "Identify research gaps in this literature review: @attach review.md"
```

### Quick Reference Commands
```bash
# Search arXiv
opencode "Search arXiv for recent papers on [topic]"

# Generate citations
opencode "Format these references in academic style: @attach refs.md"

# Create bibliography
opencode "Organize these papers by theme and year: @attach papers.md"
```

---

## 🎯 Module Completion Checklist

- [ ] Literature search completed with 25+ papers
- [ ] Paper synthesis analysis generated
- [ ] Research gaps identified and justified
- [ ] Bibliography organized in Markdown
- [ ] Final literature review written (1500+ words)
- [ ] All outputs properly formatted
- [ ] Assessment submitted (70+ points)

**🚀 Ready for Module 2: Research Methodology with AI!**

---

*Module 1 - Literature Review with AI - FPUNA 2026*
