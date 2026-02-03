# 📊 Módulo 3: Análisis de Datos con IA

**Duración**: 4 horas
**Nivel**: Intermedio-Avanzado
**Formato**: 100% Impulsado por IA

## 🎯 Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

- [ ] Analizar datos usando interpretación estadística de IA
- [ ] Generar visualizaciones de calidad de publicación vía IA
- [ ] Verificar supuestos estadísticos con asistencia de IA
- [ ] Crear análisis reproducible en Markdown
- [ ] Reportar resultados en formatos académicos

## 🛠️ Herramientas Requeridas (100% Gratuitas)

- **OpenCode** con Oh My OpenCode MCPs
- **Claude/GPT-4** para análisis estadístico
- **Lector de Markdown** para visualización de datos
- **Archivos CSV/Excel** para almacenamiento de datos

---

## 📖 Contenido Principal

### Parte 1: Análisis Estadístico Impulsado por IA

#### Estadística Descriptiva con IA

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

#### Estadística Inferencial con IA

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

### Parte 2: Visualización de Datos Impulsada por IA

#### Gráficos Listos para Publicación con IA

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
- Alto contraste (conforme a WCAG AAA)
- Accesibilidad para daltonismo
- Tamaño listo para publicación (300 DPI)
- Leyendas claras y completas
- Títulos informativos
- Estándar académico

OUTPUT:
- Código para cada gráfico (Markdown + descripción)
- Interpretación de cada visualización
- Consideraciones de diseño
- Sugerencias para publicación"
```

#### Visualización de Significancia Estadística con IA

```bash
opencode "Visualiza significancia estadística y effect sizes:

RESULTADOS:
@attach statistical_analysis.md

ELEMENTOS A VISUALIZAR:
1. Forest plot de tamaños del efecto
2. Mapa de calor (Heatmap) de valores P
3. Intervalos de confianza comparativos
4. Visualización de análisis de potencia
5. Impacto del tamaño de muestra en la significancia

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

### Parte 3: Análisis Reproducible Impulsado por IA

#### Flujo de Trabajo de Análisis en Markdown con IA

```bash
opencode "Crea workflow de análisis reproducible en Markdown:

DATOS:
@attach raw_data.csv

ESTRUCTURA REQUERIDA:
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
[Gráficos listos para publicación]

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

#### Evaluación de Calidad de Datos con IA

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

REPORTE REQUERIDO:
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

### Parte 4: Análisis Avanzado Impulsado por IA

#### Comparaciones Múltiples con IA

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

#### Análisis de Regresión con IA

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
   - División entrenamiento-prueba
   - Desempeño en datos nuevos
   - Evaluación de sobreajuste (overfitting)

OUTPUT:
- Tabla de coeficientes con interpretación
- Diagnóstico de supuestos
- Métricas de ajuste
- Visualizaciones diagnósticas"
```

### Parte 5: Reporte Impulsado por IA

#### Resultados Estilo APA con IA

```bash
opencode "Formatea resultados en estilo APA 7:

RESULTADOS ESTADÍSTICOS:
@attach statistical_output.md

SECCIONES A FORMATEAR:
1. Estadísticas Descriptivas
2. Verificación de Supuestos
3. Análisis Inferencial Principal
4. Tamaños del Efecto
5. Análisis Suplementarios

REQUISITOS APA 7:
- Formato de estadísticas (M, SD, t, p, d, η²)
- Nivel de significancia reportado
- Intervalos de confianza incluidos
- Redacción en tercera persona
- Tablas formateadas correctamente

OUTPUT:
- Texto completo listo para paper
- Tablas estilo APA
- Figuras con leyendas apropiadas
- Verificaciones de consistencia completas"
```

#### Interpretación Estadística con IA

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
1. Significado práctico de tamaños del efecto
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

## 🛠️ Ejercicios Prácticos

### Ejercicio 1: Análisis de Datos Completo (120 minutos)

**Tarea**: Analizar datos experimentales usando solo herramientas de IA.

**Pasos**:
1. Evalúa calidad de datos con IA
2. Realiza análisis descriptivo
3. Verifica supuestos estadísticos
4. Realiza pruebas inferenciales apropiadas
5. Crea visualizaciones listas para publicación
6. Genera resultados estilo APA

**Output Esperado**:
- `data_quality_report.md`
- `descriptive_analysis.md`
- `inferential_analysis.md`
- `visualizations.md`
- `apa_results.md`

### Ejercicio 2: Modelado Estadístico Avanzado (90 minutos)

**Tarea**: Realizar análisis avanzado con asistencia de IA.

**Pasos**:
1. Realiza análisis de comparaciones múltiples
2. Construye modelo de regresión
3. Diagnostica supuestos del modelo
4. Valida desempeño del modelo
5. Interpreta resultados en contexto

**Output Esperado**:
- `advanced_analysis.md`
- `model_diagnostics.md`
- `interpretation_report.md`
- `recommendations.md`

---

## ✅ Evaluación del Módulo

### Proyecto de Análisis de Datos (100 puntos)

**Entregables**:
1. **Reporte de Calidad de Datos** (20 puntos)
   - Evaluación de completitud
   - Procedimientos de limpieza
   - Documentación

2. **Análisis Estadístico** (30 puntos)
   - Tests apropiados seleccionados
   - Supuestos verificados
   - Resultados correctamente interpretados

3. **Visualizaciones** (25 puntos)
   - Calidad lista para publicación
   - Cumplimiento de accesibilidad
   - Etiquetado adecuado

4. **Reporte APA** (25 puntos)
   - Formato adecuado
   - Reporte completo
   - Interpretación contextual

**Nota de Aprobación**: 70/100 puntos

---

## 🔄 Referencias Cruzadas

**Usa outputs de**: Módulo 2: Metodología de Investigación
**Prerrequisito para**: Módulo 4: Escritura Académica con IA
**Siguiente Paso**: Escribir sección de resultados usando tu análisis

---

## 💡 Consejos de IA para el Éxito

### Prompts de Análisis de Datos
```
opencode "Analiza dataset @attach data.csv para:
VARIABLES: [lista de variables]
TIPO DE ANÁLISIS: [descriptivo/inferencial/avanzado]
FORMATO OUTPUT: [tablas/visualizaciones/APA]
CONTEXTO: [fondo de investigación]"
```

### Pruebas Estadísticas
```
opencode "Prueba hipótesis usando [test estadístico]:
DATOS: @attach dataset.csv
HIPÓTESIS: [H0 y Ha]
SUPUESTOS: [verificar requisitos]
SIGNIFICANCIA: [nivel alfa]"
```

### Visualización
```
opencode "Crea [tipo de gráfico] para datos:
DATOS: @attach results.md
ESTILO: [listo para publicación/accesible]
FORMATO: [descripción Markdown]
REQUISITOS: [tamaño/contraste/etiquetas]"
```

---

## ⚠️ Errores Comunes a Evitar

- **Ignorar supuestos** → Siempre usa IA para verificar supuestos estadísticos
- **Selección de test incorrecta** → Deja que la IA recomiende tests apropiados
- **Mala visualización** → Solicita gráficos que cumplan con accesibilidad
- **Reporte incompleto** → Usa IA para formato estilo APA
- **Sobreinterpretar** → Pide a la IA evaluación de significancia práctica

---

## 🤝 Obteniendo Ayuda

- **Slack**: #research-ai-analysis
- **Horas de Oficina**: Jueves 18:00-20:00
- **Email**: analysis-support@fpuna.edu.py

---

## 📁 Recursos

### Prompts Esenciales de IA
```bash
# Análisis descriptivo
opencode "Genera estadísticas descriptivas para @attach data.csv con interpretación adecuada"

# Verificación de supuestos
opencode "Verifica supuestos estadísticos para [test] en dataset @attach data.csv"

# Formato APA
opencode "Convierte resultados estadísticos a formato APA 7: @attach results.md"
```

### Comandos de Referencia Rápida
```bash
# Calidad de datos
opencode "Evalúa calidad de datos de @attach dataset.csv"

# Visualización
opencode "Crea gráficos listos para publicación para @attach analysis_results.md"

# Interpretación
opencode "Interpreta significancia estadística para contexto educativo: @attach results.md"
```

---

## 🎯 Lista de Verificación del Módulo

- [ ] Evaluación de calidad de datos completada
- [ ] Estadísticas descriptivas generadas
- [ ] Supuestos estadísticos verificados
- [ ] Análisis inferencial realizado
- [ ] Visualizaciones creadas y accesibles
- [ ] Resultados estilo APA formateados
- [ ] Interpretación provista en contexto
- [ ] Evaluación enviada (70+ puntos)

**🚀 ¡Listo para el Módulo 4: Escritura Académica con IA!**

---

*Módulo 3 - Análisis de Datos con IA - FPUNA 2026*