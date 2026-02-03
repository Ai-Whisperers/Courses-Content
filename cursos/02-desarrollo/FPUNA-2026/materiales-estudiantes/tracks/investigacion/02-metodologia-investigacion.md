# 🔬 Module 2: Research Methodology with AI

**Duration**: 4 hours  
**Level**: Intermediate  
**Format**: 100% AI-Driven

## 🎯 Learning Objectives

By completing this module, you will be able to:

- [ ] Formulate research questions using AI assistance
- [ ] Design experimental studies with AI guidance
- [ ] Conduct power analysis using AI calculations
- [ ] Validate research instruments with AI
- [ ] Create ethical protocols via AI

## 🛠️ Required Tools (100% Free)

- **OpenCode** with Oh My OpenCode MCPs
- **Claude/GPT-4** for methodology design
- **Markdown reader** for protocol documentation

## ❌ Tools NOT Needed

- ❌ G*Power, SampleSize calculators
- ❌ SPSS, Stata, statistical software
- ❌ Template libraries
- ❌ Manual methodology guides

---

## 📖 Core Content

### Part 1: AI-Powered Research Question Formulation

#### FINER Framework with AI

```bash
opencode "Aplica framework FINER para formular preguntas de investigación:

CONTEXT INICIAL:
- Área: Educación superior en FPUNA
- Tema: Uso de IA en aprendizaje de programación
- Interés: Efectos en comprensión conceptual

ANÁLISIS FINER:
F - Feasible (factible): ¿Es realizable?
I - Interesting (interesante): ¿Es relevante?
N - Novel (novedoso): ¿Es original?
E - Ethical (ético): ¿Es ético?
R - Relevant (relevante): ¿Tiene impacto?

OUTPUT:
- 3-5 preguntas de investigación iniciales
- Evaluación FINER para cada una
- Pregunta seleccionada con justificación
- Sub-preguntas secundarias si aplica"
```

#### Research Gap Connection

```bash
opencode "Conecta gaps de literatura con preguntas de investigación:

GAPS IDENTIFICADOS:
@attach literature_gaps.md

TRANSFORMAR EN PREGUNTAS:
Para cada gap, genera:
1. Pregunta principal clara y específica
2. Hipótesis tentativa
3. Variables identificadas (IV, DV, covariables)
4. Diseño metodológico sugerido
5. Contribución esperada

CRITERIOS DE BUENA PREGUNTA:
- Específica y medible
- Basada en gap real
- Abordable con recursos disponibles
- Relevante académicamente

OUTPUT:
- Tabla con Gap → Pregunta → Hipótesis → Diseño
- Justificación de cada elección
- Viabilidad assessment"
```

### Part 2: AI-Powered Experimental Design

#### Design Selection with AI

```bash
opencode "Diseña estudio experimental apropiado:

PREGUNTA DE INVESTIGACIÓN:
[Pregunta seleccionada del análisis anterior]

CONTEXT DE ESTUDIO:
- Población: Estudiantes universitarios FPUNA
- Ambiente: Educación presencial con tecnología
- Recursos: Limitados (contexto paraguayo)
- Duración: 4-6 semanas máximo

DISEÑOS POSIBLES:
- Experimental verdadero (randomized controlled trial)
- Cuasi-experimental (grupos intactos)
- Pre-post single group
- Cross-over design
- Longitudinal

ANÁLISIS REQUERIDO:
1. Comparación de diseños según viabilidad
2. Fortalezas y debilidades en contexto FPUNA
3. Requisitos de implementación
4. Análisis estadístico apropiado para cada diseño
5. Amenazas a validez interna y externa

OUTPUT:
- Diseño recomendado con justificación completa
- Diagrama de procedimiento en Markdown
- Plan de implementación detallado
- Consideraciones éticas y prácticas"
```

#### Sampling Strategy with AI

```bash
opencode "Diseña estrategia de muestreo para estudio:

TIPO DE ESTUDIO:
[Diseño seleccionado anteriormente]

POBLACIÓN OBJETIVO:
- Estudiantes de primer año FPUNA
- Carreras: Ingeniería Informática, Electrónica, Civil
- Edad: 17-25 años
- Total población: ~300 estudiantes

REQUERIMIENTOS DE MUESTREO:
1. Técnica de muestreo apropiada
2. Tamaño muestral justificado
3. Estrategia de asignación a grupos
4. Procedimiento de reclutamiento
5. Tasa de deserción esperada

CÁLCULOS REQUERIDOS:
- Tamaño muestral por grupo
- Power analysis (effect size esperado)
- Nivel de confianza
- Margen de error
- Ajuste por deserción

OUTPUT:
- Plan de muestreo completo
- Justificación estadística
- Procedimiento paso a paso
- Formularios de reclutamiento
- Timeline de implementación"
```

### Part 3: AI-Powered Power Analysis

#### Sample Size Calculation with AI

```bash
opencode "Calcula tamaño muestral usando power analysis:

PARÁMETROS DEL ESTUDIO:
- Diseño: Comparación de 2 grupos independientes
- Test: t-test (two-tailed)
- Alpha: 0.05
- Power: 0.80 (80%)
- Effect size esperado: d = 0.5 (mediano)

MÉTODOS DE CÁLCULO:
1. Fórmulas matemáticas manuales
2. Simulación Monte Carlo
3. Referencias a Cohen (1988)
4. Consideraciones de contexto paraguayo

ANÁLISIS ADICIONAL:
- Diferentes escenarios de effect size
- Impacto de reducir power a 0.70
- Costo-beneficio de tamaños muestrales
- Ajuste por deserción esperada (20%)

OUTPUT:
- Cálculo detallado paso a paso
- Tabla con diferentes escenarios
- Recomendación final justificada
- Fórmulas para replicación"
```

#### Effect Size Estimation with AI

```bash
opencode "Estima effect size esperado para cálculo de muestra:

CONTEXTO DE ESTUDIO:
- Intervención: Uso de ChatGPT en programación
- Comparación: vs método tradicional
- Medición: Comprensión conceptual (test 0-100)

FUENTES PARA ESTIMACIÓN:
1. Meta-análisis similares en literatura
2. Estudios pilotos en contextos similares
3. Efecto reportado en revisiones sistemáticas
4. Conservador vs optimista

CÁLCULOS:
- Basado en literatura previa
- Ajuste por contexto paraguayo
- Rango plausible (pequeño, mediano, grande)
- Recomendación para power analysis

OUTPUT:
- Effect size estimado con justificación
- Referencias a estudios comparables
- Rango de valores esperados
- Impacto en tamaño muestral requerido"
```

### Part 4: AI-Powered Instrument Development

#### Instrument Design with AI

```bash
opencode "Diseña instrumento de medición válido:

CONSTRUCTO A MEDIR:
Comprensión conceptual de programación

CARACTERÍSTICAS REQUERIDAS:
- 15-20 preguntas
- Mix de formatos (multiple choice, corto, coding)
- Validez de contenido
- Confiabilidad interna > 0.8
- Tiempo de aplicación: 45 minutos

DIMENSIONES:
1. Conceptos básicos (variables, tipos)
2. Estructuras de control (loops, condicionales)
3. Funciones y modularidad
4. Estructuras de datos
5. Resolución de problemas

ANÁLISIS DE ÍTEMS:
- Redacción clara y sin ambigüedad
- Dificultad apropiada
- Discriminación entre niveles
- Relevancia para constructo

OUTPUT:
- Instrumento completo en Markdown
- Justificación de cada ítem
- Guía de calificación
- Protocolo de aplicación"
```

#### Validation with AI

```bash
opencode "Valida instrumento de medición:

INSTRUMENTO:
@attach measurement_instrument.md

ANÁLISIS DE VALIDEZ:
1. Validez de contenido (expertos)
2. Validez de constructo
3. Validez de criterio
4. Análisis de ítems
5. Confiabilidad (Cronbach's alpha)

PROCEDIMIENTO DE VALIDACIÓN:
- Revisión por 3 expertos
- Prueba piloto con 20 estudiantes
- Análisis estadístico inicial
- Ajustes necesarios

CÁLCULOS ESTADÍSTICOS:
- Alpha de Cronbach por dimensión
- Correlación ítem-total
- Análisis factorial exploratorio
- Dificultad y discriminación

OUTPUT:
- Informe de validación completo
- Versión final del instrumento
- Protocolo de calificación
- Guía de interpretación"
```

### Part 5: AI-Powered Ethics Protocol

#### Ethics Assessment with AI

```bash
opencode "Evalúa consideraciones éticas del estudio:

DISEÑO DE ESTUDIO:
@attach research_protocol.md

ANÁLISIS ÉTICO REQUERIDO:
1. Riesgos y beneficios
2. Consentimiento informado
3. Confidencialidad y privacidad
4. Uso de datos
5. Equidad en selección

CONTEXTO PARAGUAYO:
- Regulaciones locales
- Estándares universitarios
- Consideraciones culturales
- Protección de datos

DOCUMENTACIÓN NECESARIA:
- Formulario de consentimiento
- Protocolo de confidencialidad
- Plan de manejo de datos
- Procedimiento de retirada

OUTPUT:
- Evaluación ética completa
- Documentos de consentimiento
- Protocolo de privacidad
- Justificación de ética
- Plan de manejo de riesgos"
```

---

## 🛠️ Practical Exercises

### Exercise 1: Complete Research Design (120 minutes)

**Task**: Design a complete experimental study using AI assistance.

**Steps**:
1. Use AI to formulate research questions based on literature gaps
2. Apply FINER framework for validation
3. Design experimental methodology with AI guidance
4. Calculate sample size using AI power analysis
5. Design measurement instruments
6. Create ethics protocol

**Expected Output**:
- `research_questions.md`
- `experimental_design.md`
- `power_analysis.md`
- `measurement_instrument.md`
- `ethics_protocol.md`

### Exercise 2: Instrument Validation (90 minutes)

**Task**: Validate a measurement instrument using AI.

**Steps**:
1. Design initial instrument with AI
2. Conduct content validity assessment via AI
3. Pilot test simulation
4. Analyze reliability using AI calculations
5. Create final validated instrument

**Expected Output**:
- `initial_instrument.md`
- `validation_report.md`
- `final_instrument.md`
- `scoring_guide.md`

---

## ✅ Module Assessment

### Research Protocol Project (100 points)

**Deliverables**:
1. **Research Questions & Design** (25 points)
   - FINER framework applied
   - Gap connection clear
   - Design justified

2. **Sample Size & Power Analysis** (25 points)
   - Calculations shown
   - Justification provided
   - Multiple scenarios considered

3. **Measurement Instrument** (25 points)
   - Validity evidence
   - Reliability assessment
   - Clear scoring guide

4. **Ethics Protocol** (25 points)
   - Comprehensive risk assessment
   - Consent forms included
   - Privacy protection plan

**Passing Grade**: 70/100 points

---

## 🔄 Cross-References

**Prerequisite for**: Module 3: Data Analysis with AI  
**Uses outputs from**: Module 1: Literature Review gaps  
**Next Step**: Collect and analyze data using your designed protocol

---

## 💡 AI Tips for Success

### Research Design Prompts
```
opencode "Design [study type] to investigate [research question]:
CONTEXT: [background information]
CONSTRAINTS: [limitations/resources]
OUTPUT: [specific format needed]
REQUIREMENTS: [ethical/practical considerations]"
```

### Instrument Validation
```
opencode "Validate this measurement instrument:
@attach instrument.md
CRITERIA: [validity, reliability standards]
CONTEXT: [population, administration]
OUTPUT: [validation report format]"
```

### Power Analysis
```
opencode "Calculate sample size for [test type]:
EFFECT SIZE: [expected magnitude]
POWER: [desired statistical power]
ALPHA: [significance level]
CONTEXT: [population characteristics]"
```

---

## ⚠️ Common Pitfalls to Avoid

- **Overly broad research questions** → Use AI to refine specificity
- **Insufficient sample size** → Always conduct power analysis
- **Unvalidated instruments** → Use AI for validity assessment
- **Ethics considerations ignored** → AI can identify ethical issues
- **Context ignored** → Ask AI to adapt to Paraguayan context

---

## 🤝 Getting Help

- **Slack**: #research-ai-methodology
- **Office Hours**: Wednesday 18:00-20:00
- **Email**: methodology-support@fpuna.edu.py

---

## 📁 Resources

### Essential AI Prompts
```bash
# Research questions
opencode "Apply FINER framework to these research ideas: @attach ideas.md"

# Experimental design
opencode "Design experimental study for: [research question] with constraints: [limitations]"

# Power analysis
opencode "Calculate sample size for effect size [d] with power [0.8] and alpha [0.05]"

# Instrument validation
opencode "Assess validity and reliability of: @attach instrument.md"
```

### Quick Reference Commands
```bash
# FINER framework
opencode "Evaluate research question using FINER: [question]"

# Sampling strategy
opencode "Design sampling strategy for population: [description] size: [N]"

# Ethics assessment
opencode "Evaluate ethical considerations for study: @attach protocol.md"
```

---

## 🎯 Module Completion Checklist

- [ ] Research questions formulated and validated with FINER
- [ ] Experimental design completed and justified
- [ ] Sample size calculated with power analysis
- [ ] Measurement instrument designed and validated
- [ ] Ethics protocol created and approved
- [ ] All documentation in Markdown format
- [ ] Assessment submitted (70+ points)

**🚀 Ready for Module 3: Data Analysis with AI!**

---

*Module 2 - Research Methodology with AI - FPUNA 2026*