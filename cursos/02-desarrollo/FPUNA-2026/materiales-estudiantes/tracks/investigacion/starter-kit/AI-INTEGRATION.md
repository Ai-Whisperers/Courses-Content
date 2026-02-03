# AI-INTEGRATION.md - Integración de IA en Investigación Académica

## Cómo la IA Apoya (sin Reemplazar) tu Trabajo Intelectual

---

## Niveles de Integración

### Nivel 1: Asistente de Información
La IA responde preguntas y clarifica conceptos.

**Casos de uso:**
- Explicar conceptos metodológicos
- Clarificar términos estadísticos
- Resumir artículos
- Responder dudas de formato APA

### Nivel 2: Co-redactor Académico
La IA ayuda a estructurar y mejorar la escritura.

**Casos de uso:**
- Mejorar redacción académica
- Sintetizar literatura
- Parafrasear manteniendo rigor
- Estructurar argumentos

### Nivel 3: Analista de Datos
La IA ayuda con análisis e interpretación.

**Casos de uso:**
- Generar código para análisis
- Interpretar resultados estadísticos
- Sugerir visualizaciones
- Verificar consistencia de datos

---

## Principios Éticos Fundamentales

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    USO ÉTICO DE IA EN INVESTIGACIÓN                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ✓ LA IA PUEDE:                    ✗ LA IA NO DEBE:                    │
│   ─────────────                     ──────────────────                   │
│   • Explicar conceptos              • Escribir tu tesis por ti          │
│   • Mejorar tu redacción            • Generar datos falsos              │
│   • Sugerir estructura              • Inventar citas o referencias      │
│   • Generar código de análisis      • Reemplazar tu pensamiento crítico │
│   • Ayudar con formato APA          • Hacer tu análisis sin supervisión │
│   • Interpretar estadísticos        • Copiar texto sin atribución       │
│                                                                          │
│   REGLA DE ORO: La IA asiste, TÚ investigas y decides                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Flujo de Investigación con IA

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PROCESO DE INVESTIGACIÓN CON IA                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                  │
│  │  PROBLEMA   │───▶│   REVISIÓN  │───▶│ METODOLOGÍA │                  │
│  │             │    │  LITERATURA │    │             │                  │
│  │ IA ayuda a  │    │             │    │ IA sugiere  │                  │
│  │ delimitar y │    │ IA busca,   │    │ diseño y    │                  │
│  │ formular    │    │ resume,     │    │ ayuda con   │                  │
│  │ preguntas   │    │ sintetiza   │    │ instrumentos│                  │
│  └─────────────┘    └─────────────┘    └─────────────┘                  │
│         │                 │                  │                           │
│         ▼                 ▼                  ▼                           │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                  │
│  │ RECOLECCIÓN │───▶│  ANÁLISIS   │───▶│  REDACCIÓN  │                  │
│  │   DATOS     │    │   DATOS     │    │             │                  │
│  │             │    │             │    │ IA mejora   │                  │
│  │ TÚ haces    │    │ IA genera   │    │ estilo,     │                  │
│  │ esto        │    │ código,     │    │ verifica    │                  │
│  │ (sin IA)    │    │ interpreta  │    │ formato     │                  │
│  └─────────────┘    └─────────────┘    └─────────────┘                  │
│                                                │                         │
│                                                ▼                         │
│                                         ┌─────────────┐                  │
│                                         │  REVISIÓN   │                  │
│                                         │   FINAL     │                  │
│                                         │             │                  │
│                                         │ IA verifica │                  │
│                                         │ consistencia│                  │
│                                         └─────────────┘                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Integración por Etapa de Investigación

### Planteamiento del Problema

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Delimitar tema | Días de reflexión | Exploración guiada |
| Formular pregunta | Múltiples borradores | Refinamiento iterativo |
| Revisar viabilidad | Consulta a tutor | Análisis preliminar + tutor |

**Prompts típicos:**
```bash
# Delimitar tema
claude "Me interesa investigar [tema amplio].
Ayúdame a delimitarlo considerando:
- Soy estudiante de [carrera]
- Tengo [X] meses
- Acceso a [población/datos]
Sugiere 3 delimitaciones posibles"

# Formular pregunta
claude "Mi tema delimitado es [X].
Genera 5 preguntas de investigación:
- 2 exploratorias
- 2 descriptivas
- 1 correlacional/causal
Explica qué implica cada una"
```

### Revisión de Literatura

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Búsqueda de artículos | 4-6 horas | 1-2 horas |
| Lectura de abstract | 5 min/artículo | 1 min/abstract |
| Síntesis de hallazgos | Horas | 30-60 min |
| Redacción de marco | Días | Horas + edición |

**Prompts típicos:**
```bash
# Analizar abstracts
claude "Analiza estos 5 abstracts y extrae:
1. Objetivo de cada estudio
2. Metodología usada
3. Hallazgo principal
4. Cómo se relaciona con mi tema: [tema]

[pegar abstracts]"

# Sintetizar literatura
claude "Sintetiza estos hallazgos en 2 párrafos:
1. [Autor, año]: [hallazgo]
2. [Autor, año]: [hallazgo]
3. [Autor, año]: [hallazgo]

Muestra consensos, disensos y evolución del conocimiento.
Deja [Autor, año] como placeholder para citas"
```

**ADVERTENCIA:**
> Nunca pidas a la IA que "busque artículos" sin verificar. La IA puede inventar referencias. SIEMPRE verifica que los artículos existan en Google Scholar o bases de datos.

### Metodología

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Diseñar cuestionario | 4-8 horas | 1-2 horas + revisión |
| Calcular muestra | 30-60 min | 5 min |
| Planificar análisis | 1-2 horas | 15-30 min |

**Prompts típicos:**
```bash
# Diseño de instrumento
claude "Diseña ítems para medir [constructo]:
- Definición conceptual: [definición]
- Dimensiones: [lista]
- Escala: Likert 5 puntos
- 4 ítems por dimensión
- Incluye 2 ítems inversos"

# Tamaño de muestra
claude "Calcula tamaño de muestra:
- Prueba: correlación de Pearson
- Correlación esperada: r = 0.30
- Alfa: 0.05
- Poder: 0.80
Muestra la fórmula usada"
```

### Análisis de Datos

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Escribir código | 2-4 horas | 15-30 min |
| Interpretar output | 30-60 min | 5-10 min |
| Crear visualizaciones | 1-2 horas | 15-30 min |

**Prompts típicos:**
```bash
# Generar código
claude "Genera código Python/R para:
Datos: archivo 'datos.csv' con columnas [lista]
Análisis:
1. Descriptivos (media, DE, frecuencias)
2. Prueba de normalidad
3. Correlación de Pearson entre X e Y
4. Gráfico de dispersión

Incluye comentarios explicativos"

# Interpretar resultados
claude "Interpreta este output de SPSS:
[pegar resultado]

Responde:
1. ¿Es significativo? ¿Por qué?
2. ¿Cuál es el tamaño del efecto?
3. ¿Cómo reportar en APA?
4. ¿Qué significa para mi hipótesis: [hipótesis]?"
```

### Redacción Académica

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Mejorar párrafo | 15-30 min | 2-5 min |
| Parafrasear cita | 10-15 min | 2 min |
| Formatear APA | 5 min/referencia | 1 min/referencia |

**Prompts típicos:**
```bash
# Mejorar redacción
claude "Mejora este párrafo para redacción académica:
[párrafo original]

Mantén el significado pero:
- Usa tono formal
- Agrega conectores académicos
- Mejora precisión terminológica
- Sugiere dónde agregar citas"

# Parafrasear
claude "Parafrasea manteniendo el significado académico:
Original: '[texto]'
Fuente: [Autor, año]

Da 2 versiones de paráfrasis y
explica cuándo usar cita directa vs paráfrasis"
```

---

## Configuración del Proyecto con IA

### CLAUDE.md para Investigación

```markdown
# Proyecto: [Título de la investigación]

## Información del Investigador
- Nombre: [X]
- Carrera: [X]
- Tutor: [X]
- Institución: [X]

## Tema de Investigación
- Área: [X]
- Problema: [descripción breve]
- Pregunta: [pregunta de investigación]

## Metodología
- Enfoque: [cuantitativo/cualitativo/mixto]
- Diseño: [X]
- Muestra: [descripción]

## Estado Actual
- Etapa: [propuesta/marco teórico/recolección/etc.]
- Próximo entregable: [X]
- Fecha límite: [X]

## Reglas para la IA
- Seguir APA 7ma edición
- Nunca inventar citas
- Mantener lenguaje académico formal
- Verificar datos estadísticos
- No escribir secciones completas sin mi input
```

---

## Patrones de Uso Ético

### Patrón 1: Explica-Luego-Aplica
```
1. "Explica qué es [concepto/prueba]"
2. Comprender la explicación
3. "Ayúdame a aplicarlo a mi caso: [datos]"
4. Verificar que la aplicación es correcta
```

### Patrón 2: Borrador-Revisión-Edición
```
1. Escribir tu versión primero
2. "Mejora este párrafo manteniendo mis ideas"
3. Comparar cambios
4. Decidir qué mantener
5. Nunca usar output de IA sin leer
```

### Patrón 3: Verificación Cruzada
```
1. IA genera interpretación de resultado
2. Verificar en libro de estadística o tutor
3. Si coincide, usar; si no, investigar diferencia
```

### Patrón 4: Código-Supervisado
```
1. IA genera código de análisis
2. Ejecutar línea por línea entendiendo
3. Verificar resultados manualmente (muestra pequeña)
4. Usar código completo solo si verificado
```

---

## Métricas de Productividad

### Sin IA (Investigación Tradicional)
| Tarea | Tiempo típico |
|-------|---------------|
| Búsqueda bibliográfica (30 fuentes) | 15-20 horas |
| Marco teórico (20 páginas) | 40-60 horas |
| Diseño metodológico | 10-15 horas |
| Análisis de datos | 15-25 horas |
| Redacción de resultados | 20-30 horas |

### Con IA (Asistida)
| Tarea | Tiempo con IA | Reducción |
|-------|---------------|-----------|
| Búsqueda bibliográfica | 5-8 horas | 60% |
| Marco teórico | 20-30 horas | 50% |
| Diseño metodológico | 5-8 horas | 50% |
| Análisis de datos | 5-10 horas | 60% |
| Redacción de resultados | 10-15 horas | 50% |

**Nota:** El tiempo ahorrado DEBE usarse para mayor profundidad y calidad, no para hacer menos trabajo.

---

## Limitaciones Críticas

### La IA NO puede:
- Garantizar que las referencias existan (SIEMPRE verificar)
- Recolectar datos por ti
- Reemplazar el juicio del investigador
- Conocer la literatura más reciente (tiene fecha de corte)
- Acceder a bases de datos de pago
- Garantizar originalidad (usar anti-plagio)

### Verificar SIEMPRE:
- Que las citas y referencias sean reales
- Que los cálculos estadísticos sean correctos
- Que el código generado funcione con tus datos
- Que la interpretación sea apropiada para tu contexto
- Que no haya plagio (usar Turnitin u otra herramienta)

### Declaración de Uso
Muchas instituciones requieren declarar el uso de IA. Consulta con tu tutor y comité sobre las políticas de tu universidad.

---

## Herramientas Complementarias

### Gestión de Referencias
| Herramienta | Uso con IA |
|-------------|------------|
| Zotero | Almacenar referencias, IA ayuda a formatear |
| Mendeley | Similar a Zotero |
| Connected Papers | Encontrar artículos relacionados |

### Análisis de Datos
| Herramienta | Uso con IA |
|-------------|------------|
| SPSS | IA interpreta output |
| JASP | IA genera guías de uso |
| R/Python | IA genera código |
| ATLAS.ti | IA ayuda con categorías |

### Escritura
| Herramienta | Uso con IA |
|-------------|------------|
| Word | Redacción principal |
| Overleaf/LaTeX | IA genera código LaTeX |
| Grammarly | Complemento para inglés |

---

## Declaración Ética Sugerida

Si tu institución lo requiere, aquí hay un modelo de declaración de uso de IA:

```
"En la elaboración de este trabajo se utilizó inteligencia artificial
(Claude/ChatGPT/otro) como herramienta de asistencia para:
- [Mejora de redacción académica]
- [Generación de código de análisis estadístico]
- [Síntesis de literatura]
- [Formato de referencias APA]

El autor declara que todo contenido generado por IA fue revisado,
verificado y editado. Las ideas, argumentos, interpretaciones y
conclusiones son producto del trabajo intelectual del autor.
Todas las referencias bibliográficas fueron verificadas individualmente."
```

---

*AI-INTEGRATION.md para Investigación Académica - FPUNA 2026*
