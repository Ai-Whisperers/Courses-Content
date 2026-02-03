# 📊 Module 3: Data Analysis with AI

**Duration**: 4 hours  
**Level**: Intermediate-Advanced  
**Format**: 100% AI-Driven

## 🎯 Learning Objectives

By completing this module, you will be able to:

- [ ] Analyze data using AI statistical interpretation
- [ ] Generate publication-quality visualizations via AI
- [ ] Verify statistical assumptions with AI assistance
- [ ] Create reproducible analysis in Markdown
- [ ] Report results in academic formats

## 🛠️ Required Tools (100% Free)

- **OpenCode** with Oh My OpenCode MCPs
- **Claude/GPT-4** for statistical analysis
- **Markdown reader** for data visualization
- **CSV/Excel files** for data storage

## ❌ Tools NOT Needed

- ❌ SPSS, Stata, SAS
- ❌ Python/R programming
- ❌ Jupyter Notebooks
- ❌ Statistical software licenses

---

## 📖 Core Content

### Part 1: AI-Powered Statistical Analysis

#### Descriptive Statistics with AI

```bash
opencode "Realiza análisis estadístico descriptivo completo:

DATOS:
@attach dataset.csv

VARIABLES DE INTERÉS:
- Grupo: experimental/control
- Edad: años completos
- Género: masculino/femenino/otro
- Pre-test: comprensión inicial (0-100)
- Post-test: comprensión final (0-100)
- Horas_uso_IA: horas semanales
- Motivación: escala 1-10

ANÁLISIS DESCRIPTIVO REQUERIDO:
1. Estadística por separado para cada grupo
2. Medidas de tendencia central (media, mediana, moda)
3. Medidas de dispersión (SD, rango, IQR)
4. Distribución de frecuencias
5. Detección de outliers

OUTPUT FORMATO:
- Tabla de estadística descriptiva
- Interpretación de cada métrica
- Identificación de valores atípicos
- Comparación inicial entre grupos"
```

#### Inferential Statistics with AI

```bash
opencode "Realiza análisis inferencial apropiado:

DATOS:
@attach dataset.csv

PREGUNTA DE INVESTIGACIÓN:
¿Hay diferencia significativa en comprensión post-test entre grupo experimental y control?

ANÁLISIS REQUERIDO:
1. Verificación de supuestos:
   - Normalidad (Shapiro-Wilk)
   - Homogeneidad de varianzas (Levene)
   - Independencia de observaciones

2. Selección de test apropiado:
   - Si supuestos cumplidos: t-test independiente
   - Si violados: Mann-Whitney U test
   - Si covariables: ANCOVA

3. Cálculo de effect size:
   - Cohen's d para t-test
   - r para Mann-Whitney
   - η² para ANCOVA

4. Intervalos de confianza 95%

OUTPUT:
- Resultado de verificación de supuestos
- Test estadístico ejecutado con justificación
- Estadístico, p-value, effect size
- Interpretación en términos prácticos
- Tabla APA-style de resultados"
```

### Part 2: AI-Powered Data Visualization

#### Publication-Ready Graphs with AI

```bash
opencode "Crea visualizaciones profesionales para resultados:

DATOS Y RESULTADOS:
@attach dataset.csv
@attach statistical_results.md

GRÁFICOS REQUERIDOS:
1. Box plot comparativo (post-test por grupo)
2. Histogramas de distribución por grupo
3. Scatter plot (pre-test vs post-test)
4. Bar chart con intervalos de confianza
5. Violin plot con puntos individuales

REQUISITOS DE DISEÑO:
- Alto contraste (WCAG AAA compliant)
- Accesibilidad para daltonismo
- Tamaño publication-ready (300 DPI)
- Leyendas claras y completas
- Títulos informativos
- Formato academic standard

OUTPUT:
- Código para cada gráfico (Markdown + descripción)
- Interpretación de cada visualización
- Consideraciones de diseño
- Sugerencias para publicación"
```

#### Statistical Significance Visualization with AI

```bash
opencode "Visualiza significancia estadística y effect sizes:

RESULTADOS:
@attach statistical_analysis.md

ELEMENTOS A VISUALIZAR:
1. Forest plot de effect sizes
2. P-valueheatmap
3. Confidence intervals comparativos
4. Power analysis visualization
5. Sample size impact on significance

REQUISITOS:
- Claridad en significancia estadística
- Destaque de efectos prácticos
- Comparación con criterios publicados
- Escala apropiada para interpretación

OUTPUT:
- Figuras con anotaciones estadísticas
- Tablas resumen de criterios
- Guía de interpretación visual
- Recomendaciones para presentación"
```

### Part 3: AI-Powered Reproducible Analysis

#### Markdown Analysis Workflow with AI

```bash
opencode "Crea workflow de análisis reproducible en Markdown:

DATOS:
@attach raw_data.csv

ESTRUCTURA REQUIRIDA:
```markdown
# Análisis de Datos - Estudio IA en Educación

## 1. Setup y Descripción de Datos
[Descripción del dataset y variables]

## 2. Limpieza de Datos
[Procedimiento de limpieza con IA]

## 3. Análisis Descriptivo
[Todas las tablas y gráficos descriptivos]

## 4. Verificación de Supuestos
[Tests de normalidad y homocedasticidad]

## 5. Análisis Inferencial
[Test estadístico principal con justificación]

## 6. Visualizaciones Finales
[Gráficos publication-ready]

## 7. Resultados Principales
[Resumen en formato APA]

## 8. Archivos Generados
[Lista de outputs y reproducción]
```

REQUISITOS:
- Todo explicado paso a paso
- Comandos AI usados documentados
- Resultados interpretables
- Código replicable
- Referencias a métodos estadísticos

OUTPUT:
- Archivo .md completo del análisis
- Explicación de cada paso
- Reproducibilidad garantizada"
```

#### Data Quality Assessment with AI

```bash
opencode "Evalúa calidad de datos para análisis:

DATOS CRUDOS:
@attach raw_dataset.csv

EVALUACIÓN REQUERIDA:
1. Completitud: Porcentaje de datos faltantes por variable
2. Consistencia: Valores fuera de rango esperado
3. Duplicados: Registros duplicados exactos
4. Outliers: Valores atípicos estadísticos
5. Formato: Tipos de datos correctos

ACCIONES CORRECTIVAS:
- Estrategia para valores faltantes
- Tratamiento de outliers
- Corrección de inconsistencias
- Normalización de formatos

REPORT REQUERIDO:
- Diagnóstico de calidad detallado
- Recomendaciones específicas
- Código para corrección
- Dataset limpio resultante

OUTPUT:
- Informe de calidad de datos
- Dataset procesado
- Documentación de cambios
- Justificación de decisiones"
```

### Part 4: AI-Powered Advanced Analysis

#### Multiple Comparisons with AI

```bash
opencode "Realiza análisis de comparaciones múltiples:

DATOS:
@attach dataset.csv

DISEÑO EXPERIMENTAL:
- 3 grupos: Control, ChatGPT, Claude
- Variable dependiente: Comprensión post-test
- Covariable: Comprensión pre-test

ANÁLISIS REQUERIDO:
1. ANOVA unidireccional
2. Prueba post-hoc (Tukey HSD)
3. ANCOVA controlando por pre-test
4. Comparaciones pareadas específicas
5. Effect sizes para todas las comparaciones

CORRECCIONES:
- Bonferroni para comparaciones múltiples
- Ajuste de alfa por familia de tests
- Control de tasa de error Tipo I

OUTPUT:
- Tabla ANOVA completa
- Resultados post-hoc
- Comparaciones ajustadas
- Interpretación de patrones"
```

#### Regression Analysis with AI

```bash
opencode "Realiza análisis de regresión múltiple:

DATOS:
@attach dataset.csv

MODELO PROPUESTO:
Comprensión_postest ~ Uso_IA + Edad + Género + Pre_test + Motivación

ANÁLISIS REQUERIDO:
1. Diagnóstico de supuestos de regresión:
   - Linealidad
   - Normalidad de residuos
   - Homocedasticidad
   - No multicolinealidad (VIF)

2. Estimación del modelo:
   - Coeficientes con errores estándar
   - Significancia estadística
   - R² ajustado
   - Diagnóstico de influencia (Cook's distance)

3. Validación cruzada:
   - Train-test split
   - Performance en datos nuevos
   - Overfitting assessment

OUTPUT:
- Tabla de coeficientes con interpretación
- Diagnóstico de supuestos
- Métricas de ajuste
- Visualizaciones diagnósticas"
```

### Part 5: AI-Powered Reporting

#### APA-Style Results with AI

```bash
opencode "Formatea resultados en estilo APA 7:

RESULTADOS ESTADÍSTICOS:
@attach statistical_output.md

SECCIONES A FORMATEAR:
1. Descriptive Statistics
2. Assumption Testing
3. Main Inferential Analysis
4. Effect Sizes
5. Supplementary Analyses

REQUISITOS APA 7:
- Formato de estadísticas (M, SD, t, p, d, η²)
- Nivel de significancia reportado
- Intervalos de confianza incluidos
- Redacción en tercera persona
- Tablas formateadas correctamente

OUTPUT:
- Texto completo ready para paper
- Tablas APA-style
- Figuras con captions apropiados
- Consistency checks completos"
```

#### Statistical Interpretation with AI

```bash
opencode "Interpreta resultados estadísticos en contexto:

RESULTADOS:
@attach statistical_results.md
@attach effect_sizes.md

CONTEXTO DE ESTUDIO:
- Investigación educativa en FPUNA
- Comparación de métodos de enseñanza
- Implicaciones prácticas para políticas

INTERPRETACIÓN REQUERIDA:
1. Significado práctico de effect sizes
2. Implicaciones para el aprendizaje
3. Relevancia para políticas educativas
4. Comparación con literatura existente
5. Limitaciones de interpretación

OUTPUT:
- Interpretación en lenguaje claro
- Conexión con teoría educativa
- Recomendaciones prácticas
- Futuras investigaciones sugeridas"
```

---

## 🛠️ Practical Exercises

### Exercise 1: Complete Data Analysis (120 minutes)

**Task**: Analyze experimental data using only AI tools.

**Steps**:
1. Assess data quality with AI
2. Conduct descriptive analysis
3. Verify statistical assumptions
4. Perform appropriate inferential tests
5. Create publication-ready visualizations
6. Generate APA-style results

**Expected Output**:
- `data_quality_report.md`
- `descriptive_analysis.md`
- `inferential_analysis.md`
- `visualizations.md`
- `apa_results.md`

### Exercise 2: Advanced Statistical Modeling (90 minutes)

**Task**: Conduct advanced analysis with AI assistance.

**Steps**:
1. Perform multiple comparisons analysis
2. Build regression model
3. Diagnose model assumptions
4. Validate model performance
5. Interpret results in context

**Expected Output**:
- `advanced_analysis.md`
- `model_diagnostics.md`
- `interpretation_report.md`
- `recommendations.md`

---

## ✅ Module Assessment

### Data Analysis Project (100 points)

**Deliverables**:
1. **Data Quality Report** (20 points)
   - Completeness assessment
   - Cleaning procedures
   - Documentation

2. **Statistical Analysis** (30 points)
   - Appropriate tests selected
   - Assumptions verified
   - Results correctly interpreted

3. **Visualizations** (25 points)
   - Publication-ready quality
   - Accessibility compliant
   - Properly labeled

4. **APA Reporting** (25 points)
   - Proper formatting
   - Complete reporting
   - Contextual interpretation

**Passing Grade**: 70/100 points

---

## 🔄 Cross-References

**Uses outputs from**: Module 2: Research Methodology  
**Prerequisite for**: Module 4: Academic Writing with AI  
**Next Step**: Write results section using your analysis

---

## 💡 AI Tips for Success

### Data Analysis Prompts
```
opencode "Analyze dataset @attach data.csv for:
VARIABLES: [list variables]
ANALYSIS TYPE: [descriptive/inferential/advanced]
OUTPUT FORMAT: [tables/visualizations/APA]
CONTEXT: [research background]"
```

### Statistical Testing
```
opencode "Test hypothesis using [statistical test]:
DATA: @attach dataset.csv
HYPOTHESIS: [H0 and Ha]
ASSUMPTIONS: [check requirements]
SIGNIFICANCE: [alpha level]"
```

### Visualization
```
opencode "Create [graph type] for data:
DATA: @attach results.md
STYLE: [publication-ready/accessible]
FORMAT: [Markdown description]
REQUIREMENTS: [size/contrast/labels]"
```

---

## ⚠️ Common Pitfalls to Avoid

- **Ignoring assumptions** → Always use AI to verify statistical assumptions
- **Wrong test selection** → Let AI recommend appropriate tests
- **Poor visualization** → Request accessibility-compliant graphics
- **Incomplete reporting** → Use AI for APA-style formatting
- **Over-interpreting** → Ask AI for practical significance assessment

---

## 🤝 Getting Help

- **Slack**: #research-ai-analysis
- **Office Hours**: Thursday 18:00-20:00
- **Email**: analysis-support@fpuna.edu.py

---

## 📁 Resources

### Essential AI Prompts
```bash
# Descriptive analysis
opencode "Generate descriptive statistics for @attach data.csv with proper interpretation"

# Assumption testing
opencode "Check statistical assumptions for [test] on dataset @attach data.csv"

# APA formatting
opencode "Convert statistical results to APA 7 format: @attach results.md"
```

### Quick Reference Commands
```bash
# Data quality
opencode "Assess data quality of @attach dataset.csv"

# Visualization
opencode "Create publication-ready graphs for @attach analysis_results.md"

# Interpretation
opencode "Interpret statistical significance for educational context: @attach results.md"
```

---

## 🎯 Module Completion Checklist

- [ ] Data quality assessment completed
- [ ] Descriptive statistics generated
- [ ] Statistical assumptions verified
- [ ] Inferential analysis performed
- [ ] Visualizations created and accessible
- [ ] APA-style results formatted
- [ ] Interpretation provided in context
- [ ] Assessment submitted (70+ points)

**🚀 Ready for Module 4: Academic Writing with AI!**

---

*Module 3 - Data Analysis with AI - FPUNA 2026*