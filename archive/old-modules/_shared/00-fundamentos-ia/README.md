# Tier 0: Fundamentos de IA Generativa
## Módulo Común para Todos los Cursos

---

## Descripción

Este módulo proporciona las bases fundamentales de Inteligencia Artificial Generativa que todo profesional necesita, independientemente de su área de especialización. Es el punto de partida obligatorio para todos los cursos del programa.

**Duración:** 2-4 horas (ajustable según curso)
**Modalidad:** Teórico-Práctico
**Prerrequisitos:** Ninguno

---

## Objetivos de Aprendizaje

Al completar este módulo, los participantes podrán:

1. **Comprender** qué es la IA generativa y cómo difiere de la IA tradicional
2. **Configurar** las herramientas principales (ChatGPT, Claude, Gemini)
3. **Aplicar** técnicas efectivas de prompting para obtener mejores resultados
4. **Evaluar** las limitaciones éticas y prácticas del uso de IA

---

## Estructura de Módulos

```
00-fundamentos-ia/
├── README.md                      # Este archivo
├── modules/
│   ├── 01-introduccion-ia-generativa/
│   │   ├── README.md              # Qué es IA, tipos, evolución
│   │   ├── EXERCISE.md            # Práctica: Primera interacción
│   │   └── QUIZ.md                # Evaluación conceptual
│   │
│   ├── 02-herramientas-configuracion/
│   │   ├── README.md              # ChatGPT, Claude, Gemini, Copilot
│   │   ├── EXERCISE.md            # Práctica: Configurar cuentas
│   │   └── QUIZ.md                # Evaluación de herramientas
│   │
│   ├── 03-prompting-efectivo/
│   │   ├── README.md              # Técnicas de prompting
│   │   ├── EXERCISE.md            # Práctica: Mejorando prompts
│   │   └── QUIZ.md                # Evaluación de prompting
│   │
│   └── 04-etica-limitaciones/
│       ├── README.md              # Ética, sesgos, límites
│       ├── EXERCISE.md            # Práctica: Casos éticos
│       └── QUIZ.md                # Evaluación ética
│
├── prompts/
│   └── prompts-fundamentales.md   # Biblioteca de prompts básicos
│
└── resources/
    └── guia-rapida.md             # Quick reference card
```

---

## Contenido por Módulo

### Módulo 01: Introducción a IA Generativa (30 min)

| Tema | Descripción | Tiempo |
|------|-------------|--------|
| ¿Qué es IA? | Definición, historia breve, tipos de IA | 10 min |
| IA Generativa vs Tradicional | Diferencias clave, ejemplos | 10 min |
| Modelos de Lenguaje (LLMs) | Cómo funcionan, capacidades | 10 min |

**Conceptos Clave:**
- Machine Learning vs Deep Learning
- Transformers y atención
- Entrenamiento y fine-tuning
- Tokens y contexto

---

### Módulo 02: Herramientas y Configuración (30 min)

| Herramienta | Características | Uso Ideal |
|-------------|-----------------|-----------|
| **ChatGPT** | Más popular, plugins, GPTs | General, creativo |
| **Claude** | Contexto largo, razonamiento | Análisis, documentos |
| **Gemini** | Integración Google, multimodal | Búsqueda, imágenes |
| **Copilot** | Integrado en Microsoft | Productividad Office |

**Práctica:** Crear cuenta en al menos 2 herramientas

---

### Módulo 03: Prompting Efectivo (45 min)

**Framework CREA:**
```
C - Contexto: ¿Cuál es la situación?
R - Rol: ¿Qué papel debe asumir la IA?
E - Especificaciones: ¿Qué requisitos exactos?
A - Acción: ¿Qué debe hacer concretamente?
```

**Técnicas Clave:**
1. **Zero-shot**: Pregunta directa sin ejemplos
2. **Few-shot**: Proporcionar ejemplos del resultado deseado
3. **Chain-of-thought**: Pedir razonamiento paso a paso
4. **Iteración**: Refinar respuestas progresivamente

**Ejemplo Comparativo:**

❌ Prompt básico:
```
Explica fotosíntesis
```

✅ Prompt efectivo:
```
Actúa como profesor de biología para estudiantes de secundaria.
Explica el proceso de fotosíntesis en 3 pasos simples.
Incluye una analogía cotidiana y evita términos técnicos complejos.
Formato: lista numerada con máximo 2 oraciones por paso.
```

---

### Módulo 04: Ética y Limitaciones (30 min)

**Limitaciones Técnicas:**
- Alucinaciones (información inventada)
- Conocimiento con fecha de corte
- No acceso a internet en tiempo real (excepto herramientas específicas)
- Sesgos del entrenamiento

**Consideraciones Éticas:**
- Propiedad intelectual y plagio
- Privacidad de datos
- Dependencia excesiva
- Transparencia en uso de IA

**Buenas Prácticas:**
1. Siempre verificar información crítica
2. No compartir datos sensibles
3. Citar uso de IA cuando corresponda
4. Usar como herramienta, no como reemplazo

---

## Evaluación

| Componente | Peso | Descripción |
|------------|------|-------------|
| Quiz Conceptual | 30% | 10 preguntas sobre IA y herramientas |
| Práctica Prompting | 40% | Mejorar 3 prompts dados |
| Caso Ético | 30% | Análisis de situación ética |

---

## Recursos Adicionales

### Videos Recomendados
- [3Blue1Brown - But what is a GPT?](https://www.youtube.com/watch?v=wjZofJX0v4M)
- [Andrej Karpathy - Intro to LLMs](https://www.youtube.com/watch?v=zjkBMFhNj_g)

### Lecturas
- Anthropic's Claude Documentation
- OpenAI Prompt Engineering Guide

### Herramientas de Práctica
- [Prompt Engineering Playground](https://platform.openai.com/playground)
- [Claude Console](https://console.anthropic.com)

---

## Adaptaciones por Dominio

Este módulo base se adapta ligeramente según el curso destino:

| Curso Destino | Adaptación |
|---------------|------------|
| Desarrollo Software | Ejemplos con código |
| Electrónica | Ejemplos con datasheets |
| Salud | Ejemplos con casos clínicos |
| Negocios | Ejemplos con análisis empresarial |
| Agronegocios | Ejemplos con datos agrícolas |

---

## Siguiente Paso

Después de completar este módulo, continúa con el **Tier 1** correspondiente a tu área de especialización:

- [tier1-desarrollo-software](../tier1-desarrollo-software/)
- [tier1-electronica-automatizacion](../tier1-electronica-automatizacion/)
- [tier1-salud-medicina](../tier1-salud-medicina/)
- [tier1-negocios-administracion](../tier1-negocios-administracion/)
- [tier1-agronegocios](../tier1-agronegocios/)

---

*Tier 0 - Fundamentos de IA Generativa v1.0*
*Actualizado: Diciembre 2025*
