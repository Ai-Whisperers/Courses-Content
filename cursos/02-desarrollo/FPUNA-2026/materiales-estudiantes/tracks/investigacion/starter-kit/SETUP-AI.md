# SETUP-AI.md - Configuración de Proyectos de Investigación con IA

## Prompts para que la IA Configure tu Proyecto Académico

---

## 1. Inicialización del Proyecto de Investigación

```bash
claude "Inicializa mi proyecto de investigación:

Tipo: [Tesis de grado/Tesina/Artículo/Proyecto]
Institución: [universidad/facultad]
Área: [ciencias sociales/salud/ingeniería/etc.]
Tema tentativo: [descripción breve]

Crea:
1. Estructura de carpetas para documentos y datos
2. README.md con información del proyecto
3. Template de cronograma de investigación
4. Checklist de etapas (propuesta → defensa)
5. Guía de formato APA 7ma edición
6. .gitignore para proyectos académicos"
```

---

## 2. Definición del Problema de Investigación

```bash
claude "Ayúdame a definir mi problema de investigación:

Tema general: [área de interés]
Contexto: [situación observada]
Población: [a quiénes afecta]
Mi disciplina: [carrera/campo]

Genera:
1. Descripción del problema (1 párrafo)
2. 3 preguntas de investigación potenciales
3. Justificación preliminar:
   - Relevancia teórica
   - Relevancia práctica
   - Relevancia social (si aplica)
4. Delimitación sugerida (temporal, espacial, temática)
5. Viabilidad inicial (recursos necesarios)"
```

---

## 3. Objetivos de Investigación

```bash
claude "Formula los objetivos de mi investigación:

Pregunta principal: [pregunta de investigación]
Enfoque: [cuantitativo/cualitativo/mixto]
Alcance: [exploratorio/descriptivo/correlacional/explicativo]

Genera:
1. Objetivo general (verbo + qué + cómo + para qué)
2. 3-4 objetivos específicos alineados
3. Verificación de coherencia entre objetivos
4. Verbos alternativos si los míos no son adecuados
5. Cómo cada objetivo específico contribuye al general"
```

---

## 4. Diseño Metodológico

```bash
claude "Diseña la metodología de mi investigación:

Pregunta: [pregunta de investigación]
Objetivos: [lista de objetivos]
Recursos disponibles: [tiempo, acceso a datos, presupuesto]
Limitaciones conocidas: [lista]

Genera:
1. Enfoque recomendado con justificación
2. Tipo de estudio más apropiado
3. Diseño de investigación
4. Población y muestra sugerida
5. Técnicas de recolección de datos
6. Técnicas de análisis de datos
7. Consideraciones éticas"
```

---

## 5. Configuración de Búsqueda Bibliográfica

```bash
claude "Configura mi estrategia de búsqueda:

Tema: [tema de investigación]
Idiomas: [español/inglés/portugués]
Período: últimos [X] años
Tipo de fuentes: [artículos/tesis/libros]

Genera:
1. Palabras clave principales (español e inglés)
2. Sinónimos y términos relacionados
3. Operadores booleanos para cada base:
   - Google Scholar
   - Scopus
   - Web of Science
   - Scielo
   - Redalyc
4. Criterios de inclusión/exclusión
5. Cómo organizar las referencias encontradas"
```

---

## 6. Setup de Gestión de Referencias

```bash
claude "Configura mi sistema de gestión de referencias:

Gestor elegido: [Zotero/Mendeley/otro]
Estilo de citas: APA 7ma edición
Cantidad estimada de fuentes: [X]

Genera:
1. Estructura de carpetas/colecciones recomendada
2. Tags/etiquetas útiles para clasificar
3. Campos importantes a completar por tipo de fuente
4. Workflow para agregar nuevas referencias
5. Cómo hacer backup
6. Cómo exportar bibliografía"
```

---

## 7. Diseño de Instrumentos

### Cuestionario/Encuesta
```bash
claude "Diseña un cuestionario para mi investigación:

Variable a medir: [constructo]
Población: [características]
Formato preferido: [Likert/opción múltiple/mixto]
Modo de aplicación: [presencial/online]

Genera:
1. Definición operacional de la variable
2. Dimensiones del constructo
3. 5-7 ítems por dimensión
4. 2 ítems de control/verificación
5. Instrucciones para el participante
6. Escala de respuestas
7. Sugerencias para validación (juicio de expertos)"
```

### Entrevista
```bash
claude "Diseña guía de entrevista:

Objetivo: [qué quiero comprender]
Participantes: [perfil]
Tipo: [estructurada/semiestructurada]
Duración estimada: [X minutos]

Genera:
1. Preguntas de rapport (inicio)
2. Preguntas principales por tema
3. Preguntas de profundización (probes)
4. Preguntas de cierre
5. Técnicas para mantener neutralidad
6. Cómo registrar las respuestas"
```

---

## 8. Plan de Análisis de Datos

### Análisis Cuantitativo
```bash
claude "Planifica mi análisis estadístico:

Diseño: [tipo de estudio]
Variables:
- Independiente: [nombre, tipo, niveles]
- Dependiente: [nombre, tipo, escala]
- Control: [si hay]
Tamaño de muestra: n = [X]

Genera:
1. Análisis descriptivo necesario
2. Pruebas de supuestos (normalidad, etc.)
3. Prueba estadística principal con justificación
4. Tamaño del efecto a calcular
5. Nivel de significancia y justificación
6. Software recomendado (SPSS/JASP/R)
7. Cómo reportar resultados en APA"
```

### Análisis Cualitativo
```bash
claude "Planifica mi análisis cualitativo:

Datos: [entrevistas/grupos focales/documentos]
Cantidad: [X participantes/documentos]
Enfoque: [fenomenología/teoría fundamentada/análisis temático]

Genera:
1. Proceso de transcripción
2. Estrategia de codificación
3. Categorías iniciales (a priori)
4. Proceso de saturación teórica
5. Herramienta de análisis (Atlas.ti/NVivo/manual)
6. Criterios de rigor (credibilidad, transferibilidad)
7. Cómo presentar hallazgos"
```

---

## 9. Setup de Ambiente de Análisis

### Python para Análisis
```bash
claude "Configura ambiente Python para análisis:

Tipo de datos: [cuantitativos/texto]
Análisis necesarios: [lista]

Genera requirements.txt con:
1. pandas, numpy (manipulación de datos)
2. scipy, statsmodels (estadística)
3. matplotlib, seaborn (visualización)
4. Si texto: nltk, spacy

Más:
- Script base para cargar datos
- Funciones comunes de análisis
- Template de notebook para análisis exploratorio"
```

### SPSS/JASP
```bash
claude "Guía de configuración SPSS/JASP:

Mis datos: [descripción de variables]
Análisis: [lista de análisis necesarios]

Genera:
1. Cómo estructurar el archivo de datos
2. Codificación de variables recomendada
3. Pasos para cada análisis en el menú
4. Cómo interpretar cada output
5. Tablas/gráficos a exportar
6. Errores comunes a evitar"
```

---

## 10. Template de Documento

```bash
claude "Genera template de mi documento:

Tipo: [tesis/artículo/informe]
Formato institucional: [si hay guía específica]
Estilo de citas: APA 7

Genera estructura en Markdown:
1. Portada (campos a completar)
2. Resumen / Abstract
3. Índice
4. Introducción
   - Planteamiento del problema
   - Justificación
   - Objetivos
5. Marco teórico
   - Antecedentes
   - Bases teóricas
   - Marco conceptual
6. Metodología
7. Resultados
8. Discusión
9. Conclusiones
10. Referencias
11. Anexos"
```

---

## 11. Configuración Ética

```bash
claude "Prepara documentos éticos:

Tipo de estudio: [descripción]
Participantes: [características]
Datos a recolectar: [lista]
Institución: [universidad]

Genera:
1. Consentimiento informado (template)
   - Propósito del estudio
   - Procedimientos
   - Riesgos y beneficios
   - Confidencialidad
   - Voluntariedad
   - Contacto del investigador
2. Asentimiento informado (si menores)
3. Compromiso de confidencialidad
4. Checklist ético de verificación"
```

---

## 12. Cronograma de Trabajo

```bash
claude "Genera cronograma de investigación:

Fecha de inicio: [fecha]
Fecha límite de entrega: [fecha]
Horas semanales disponibles: [X]
Etapa actual: [propuesta/marco teórico/etc.]

Genera:
1. Diagrama de Gantt en formato texto
2. Hitos principales con fechas
3. Entregables por etapa
4. Buffer para imprevistos
5. Fechas de reunión con tutor sugeridas
6. Alertas de riesgo de retraso"
```

---

## Checklist de Setup Completo

### Fundamentos
- [ ] Problema de investigación definido
- [ ] Pregunta de investigación formulada
- [ ] Objetivos redactados (general y específicos)
- [ ] Justificación desarrollada

### Metodología
- [ ] Enfoque y diseño definidos
- [ ] Población y muestra determinadas
- [ ] Instrumentos diseñados o seleccionados
- [ ] Plan de análisis establecido

### Herramientas
- [ ] Gestor de referencias configurado (Zotero/Mendeley)
- [ ] Software de análisis instalado (SPSS/JASP/Python)
- [ ] Sistema de backup configurado
- [ ] Template de documento listo

### Ética
- [ ] Consentimiento informado preparado
- [ ] Protocolo de confidencialidad definido
- [ ] Aprobación ética solicitada (si necesaria)

### Organización
- [ ] Estructura de carpetas creada
- [ ] Cronograma establecido
- [ ] CLAUDE.md actualizado con contexto del proyecto

---

## Quick Start - Primera Semana

```bash
# Día 1-2: Definición
claude "Tengo interés en investigar [tema].
Ayúdame a:
1. Definir el problema
2. Formular pregunta de investigación
3. Redactar objetivo general"

# Día 3-4: Búsqueda inicial
claude "Busco artículos sobre [tema].
Genera query para Google Scholar
y lista 10 términos clave en español e inglés"

# Día 5-6: Estructura
claude "Crea estructura de carpetas
y template de documento para tesis de grado
en [área] sobre [tema]"

# Día 7: Cronograma
claude "Tengo [X] meses hasta la entrega.
Genera cronograma realista considerando
que también trabajo/estudio"
```

---

*SETUP-AI.md para Investigación Académica - FPUNA 2026*
