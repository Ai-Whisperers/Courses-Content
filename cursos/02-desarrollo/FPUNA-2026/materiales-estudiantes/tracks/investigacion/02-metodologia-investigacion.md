# 🔬 Módulo 2: Metodología de Investigación con IA

**Duración**: 4 horas
**Nivel**: Intermedio
**Formato**: 100% Impulsado por IA

## 🎯 Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

- [ ] Formular preguntas de investigación usando asistencia de IA
- [ ] Diseñar estudios experimentales con guía de IA
- [ ] Realizar análisis de potencia (power analysis) usando cálculos de IA
- [ ] Validar instrumentos de investigación con IA
- [ ] Crear protocolos éticos vía IA

## 🛠️ Herramientas Requeridas (100% Gratuitas)

- **OpenCode** con Oh My OpenCode MCPs
- **Claude/GPT-4** para diseño de metodología
- **Lector de Markdown** para documentación de protocolo

---

## 📖 Contenido Principal

### Parte 1: Formulación de Preguntas de Investigación Impulsada por IA

#### Framework FINER con IA

```bash
opencode "Aplica framework FINER para formular preguntas de investigación:

CONTEXTO INICIAL:
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

#### Conexión con Brechas de Investigación

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
- Evaluación de viabilidad"
```

### Parte 2: Diseño Experimental Impulsado por IA

#### Selección de Diseño con IA

```bash
opencode "Diseña estudio experimental apropiado:

PREGUNTA DE INVESTIGACIÓN:
[Pregunta seleccionada del análisis anterior]

CONTEXTO DE ESTUDIO:
- Población: Estudiantes universitarios FPUNA
- Ambiente: Educación presencial con tecnología
- Recursos: Limitados (contexto paraguayo)
- Duración: 4-6 semanas máximo

DISEÑOS POSIBLES:
- Experimental verdadero (randomized controlled trial)
- Cuasi-experimental (grupos intactos)
- Pre-post un solo grupo
- Diseño cross-over
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

#### Estrategia de Muestreo con IA

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
- Power analysis (tamaño del efecto esperado)
- Nivel de confianza
- Margen de error
- Ajuste por deserción

OUTPUT:
- Plan de muestreo completo
- Justificación estadística
- Procedimiento paso a paso
- Formularios de reclutamiento
- Cronograma de implementación"
```

### Parte 3: Análisis de Potencia Impulsado por IA

#### Cálculo de Tamaño Muestral con IA

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
- Diferentes escenarios de tamaño del efecto
- Impacto de reducir power a 0.70
- Costo-beneficio de tamaños muestrales
- Ajuste por deserción esperada (20%)

OUTPUT:
- Cálculo detallado paso a paso
- Tabla con diferentes escenarios
- Recomendación final justificada
- Fórmulas para replicación"
```

#### Estimación de Tamaño del Efecto con IA

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

### Parte 4: Desarrollo de Instrumentos Impulsado por IA

#### Diseño de Instrumentos con IA

```bash
opencode "Diseña instrumento de medición válido:

CONSTRUCTO A MEDIR:
Comprensión conceptual de programación

CARACTERÍSTICAS REQUERIDAS:
- 15-20 preguntas
- Mezcla de formatos (opción múltiple, corto, código)
- Validez de contenido
- Confiabilidad interna > 0.8
- Tiempo de aplicación: 45 minutos

DIMENSIONES:
1. Conceptos básicos (variables, tipos)
2. Estructuras de control (bucles, condicionales)
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

#### Validación con IA

```bash
opencode "Valida instrumento de medición:

INSTRUMENTO:
@attach measurement_instrument.md

ANÁLISIS DE VALIDEZ:
1. Validez de contenido (expertos)
2. Validez de constructo
3. Validez de criterio
4. Análisis de ítems
5. Confiabilidad (Alfa de Cronbach)

PROCEDIMIENTO DE VALIDACIÓN:
- Revisión por 3 expertos
- Prueba piloto con 20 estudiantes
- Análisis estadístico inicial
- Ajustes necesarios

CÁLCULOS ESTADÍSTICOS:
- Alfa de Cronbach por dimensión
- Correlación ítem-total
- Análisis factorial exploratorio
- Dificultad y discriminación

OUTPUT:
- Informe de validación completo
- Versión final del instrumento
- Protocolo de calificación
- Guía de interpretación"
```

### Parte 5: Protocolo Ético Impulsado por IA

#### Evaluación Ética con IA

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

## 🛠️ Ejercicios Prácticos

### Ejercicio 1: Diseño de Investigación Completo (120 minutos)

**Tarea**: Diseñar un estudio experimental completo usando asistencia de IA.

**Pasos**:
1. Usa IA para formular preguntas de investigación basadas en brechas de literatura
2. Aplica el framework FINER para validación
3. Diseña metodología experimental con guía de IA
4. Calcula tamaño de muestra usando análisis de potencia con IA
5. Diseña instrumentos de medición
6. Crea protocolo ético

**Output Esperado**:
- `research_questions.md`
- `experimental_design.md`
- `power_analysis.md`
- `measurement_instrument.md`
- `ethics_protocol.md`

### Ejercicio 2: Validación de Instrumentos (90 minutos)

**Tarea**: Validar un instrumento de medición usando IA.

**Pasos**:
1. Diseña instrumento inicial con IA
2. Realiza evaluación de validez de contenido vía IA
3. Simulación de prueba piloto
4. Analiza confiabilidad usando cálculos de IA
5. Crea instrumento validado final

**Output Esperado**:
- `initial_instrument.md`
- `validation_report.md`
- `final_instrument.md`
- `scoring_guide.md`

---

## ✅ Evaluación del Módulo

### Proyecto de Protocolo de Investigación (100 puntos)

**Entregables**:
1. **Preguntas de Investigación y Diseño** (25 puntos)
   - Framework FINER aplicado
   - Conexión con brechas clara
   - Diseño justificado

2. **Tamaño de Muestra y Análisis de Potencia** (25 puntos)
   - Cálculos mostrados
   - Justificación provista
   - Múltiples escenarios considerados

3. **Instrumento de Medición** (25 puntos)
   - Evidencia de validez
   - Evaluación de confiabilidad
   - Guía de calificación clara

4. **Protocolo Ético** (25 puntos)
   - Evaluación de riesgos completa
   - Formularios de consentimiento incluidos
   - Plan de protección de privacidad

**Nota de Aprobación**: 70/100 puntos

---

## 🔄 Referencias Cruzadas

**Prerrequisito para**: Módulo 3: Análisis de Datos con IA
**Usa outputs de**: Módulo 1: Brechas de Revisión de Literatura
**Siguiente Paso**: Recolectar y analizar datos usando tu protocolo diseñado

---

## 💡 Consejos de IA para el Éxito

### Prompts de Diseño de Investigación
```
opencode "Diseña [tipo de estudio] para investigar [pregunta de investigación]:
CONTEXTO: [info de fondo]
RESTRICCIONES: [limitaciones/recursos]
OUTPUT: [formato específico necesario]
REQUISITOS: [consideraciones éticas/prácticas]"
```

### Validación de Instrumentos
```
opencode "Valida este instrumento de medición:
@attach instrument.md
CRITERIOS: [estándares de validez, confiabilidad]
CONTEXTO: [población, administración]
OUTPUT: [formato de reporte de validación]"
```

### Análisis de Potencia
```
opencode "Calcula tamaño de muestra para [tipo de test]:
TAMAÑO DEL EFECTO: [magnitud esperada]
POTENCIA: [poder estadístico deseado]
ALFA: [nivel de significancia]
CONTEXTO: [características de la población]"
```

---

## ⚠️ Errores Comunes a Evitar

- **Preguntas de investigación demasiado amplias** → Usa IA para refinar especificidad
- **Tamaño de muestra insuficiente** → Siempre realiza análisis de potencia
- **Instrumentos no validados** → Usa IA para evaluación de validez
- **Consideraciones éticas ignoradas** → IA puede identificar problemas éticos
- **Contexto ignorado** → Pide a la IA adaptar al contexto paraguayo

---

## 🤝 Obteniendo Ayuda

- **Slack**: #research-ai-methodology
- **Horas de Oficina**: Miércoles 18:00-20:00
- **Email**: methodology-support@fpuna.edu.py

---

## 📁 Recursos

### Prompts Esenciales de IA
```bash
# Preguntas de investigación
opencode "Aplica framework FINER a estas ideas de investigación: @attach ideas.md"

# Diseño experimental
opencode "Diseña estudio experimental para: [pregunta de investigación] con restricciones: [limitaciones]"

# Análisis de potencia
opencode "Calcula tamaño de muestra para tamaño del efecto [d] con potencia [0.8] y alfa [0.05]"

# Validación de instrumentos
opencode "Evalúa validez y confiabilidad de: @attach instrument.md"
```

### Comandos de Referencia Rápida
```bash
# Framework FINER
opencode "Evalúa pregunta de investigación usando FINER: [pregunta]"

# Estrategia de muestreo
opencode "Diseña estrategia de muestreo para población: [descripción] tamaño: [N]"

# Evaluación ética
opencode "Evalúa consideraciones éticas para estudio: @attach protocol.md"
```

---

## 🎯 Lista de Verificación del Módulo

- [ ] Preguntas de investigación formuladas y validadas con FINER
- [ ] Diseño experimental completado y justificado
- [ ] Tamaño de muestra calculado con análisis de potencia
- [ ] Instrumento de medición diseñado y validado
- [ ] Protocolo ético creado y aprobado
- [ ] Toda la documentación en formato Markdown
- [ ] Evaluación enviada (70+ puntos)

**🚀 ¡Listo para el Módulo 3: Análisis de Datos con IA!**

---

*Módulo 2 - Metodología de Investigación con IA - FPUNA 2026*