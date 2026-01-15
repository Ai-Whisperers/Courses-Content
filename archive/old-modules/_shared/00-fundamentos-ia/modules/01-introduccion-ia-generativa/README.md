# Módulo 01: Introducción a IA Generativa
## Fundamentos Comunes - Tier 0

---

## Descripción

Este módulo introduce los conceptos fundamentales de la Inteligencia Artificial Generativa, explicando qué es, cómo funciona, y por qué está transformando todas las industrias.

**Duración:** 30 minutos
**Tipo:** Teórico con demos

---

## Objetivos de Aprendizaje

Al completar este módulo, los participantes podrán:

1. **Definir** qué es la Inteligencia Artificial y sus tipos principales
2. **Diferenciar** entre IA tradicional e IA generativa
3. **Explicar** cómo funcionan los modelos de lenguaje (LLMs)
4. **Identificar** las capacidades y aplicaciones actuales de la IA generativa

---

## Contenido

### 1. ¿Qué es la Inteligencia Artificial?

**Definición Simple:**
> La IA es la capacidad de las máquinas para realizar tareas que normalmente requieren inteligencia humana.

**Línea de Tiempo:**

```
1950        1980        1997        2012        2022        2024
  │           │           │           │           │           │
  ▼           ▼           ▼           ▼           ▼           ▼
Turing     Sistemas    Deep Blue   AlexNet    ChatGPT    GPT-4o
Test       Expertos    (ajedrez)   (imágenes) (texto)    Claude 3
```

**Tipos de IA:**

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **IA Estrecha (ANI)** | Especializada en una tarea | Reconocimiento facial |
| **IA General (AGI)** | Capacidad humana general | No existe aún |
| **Superinteligencia** | Superior a humanos | Teórica/ficción |

> **Nota:** Los LLMs actuales (ChatGPT, Claude) son IA Estrecha muy avanzada, no AGI.

---

### 2. IA Tradicional vs IA Generativa

```
┌────────────────────────────────────────────────────────────────┐
│                    COMPARACIÓN                                  │
├────────────────────────────┬───────────────────────────────────┤
│      IA TRADICIONAL        │        IA GENERATIVA              │
├────────────────────────────┼───────────────────────────────────┤
│ Clasifica datos existentes │ Crea contenido nuevo              │
│ Respuestas predefinidas    │ Respuestas originales             │
│ "¿Es esto un gato?"        │ "Genera imagen de un gato"        │
│ Análisis y predicción      │ Creación y síntesis               │
│ Reglas programadas         │ Patrones aprendidos               │
└────────────────────────────┴───────────────────────────────────┘
```

**Ejemplos Concretos:**

| Tarea | IA Tradicional | IA Generativa |
|-------|----------------|---------------|
| Email spam | Detecta si es spam ✓/✗ | Escribe un email completo |
| Imágenes | Reconoce objetos | Crea imágenes nuevas |
| Código | Detecta errores | Escribe código funcional |
| Documentos | Clasifica por tema | Redacta documentos completos |

---

### 3. ¿Cómo Funcionan los LLMs?

**Concepto Clave: Predicción de la Siguiente Palabra**

```
Entrada: "El cielo es..."
                ↓
        ┌──────────────┐
        │     LLM      │
        │  (modelo de  │
        │   lenguaje)  │
        └──────┬───────┘
               ↓
Predicción: "azul" (95%), "hermoso" (3%), "infinito" (2%)
```

**Componentes Principales:**

1. **Tokenización:** Dividir texto en unidades (tokens)
   ```
   "Hola mundo" → ["Hola", " mundo"]
   "Universidad" → ["Univer", "sidad"]  (puede dividirse)
   ```

2. **Embeddings:** Convertir palabras en números (vectores)
   ```
   "rey" - "hombre" + "mujer" ≈ "reina"
   ```

3. **Transformers:** Arquitectura que entiende contexto
   - Mecanismo de "atención" para relacionar palabras
   - Procesa texto en paralelo (muy rápido)

4. **Entrenamiento:** Aprender de billones de textos
   - Libros, artículos, código, conversaciones
   - Meses de entrenamiento en supercomputadoras

**Analogía Simple:**

> Imagina que leíste TODOS los libros del mundo. Ahora alguien te pregunta algo y tu cerebro automáticamente conecta información de miles de fuentes para generar una respuesta coherente. Así funciona un LLM, pero con matemáticas.

---

### 4. Capacidades Actuales

**Lo que PUEDEN hacer los LLMs:**

✅ Escribir y editar texto en múltiples estilos
✅ Traducir entre idiomas
✅ Resumir documentos largos
✅ Responder preguntas sobre conocimiento general
✅ Escribir y explicar código
✅ Analizar datos y crear visualizaciones
✅ Mantener conversaciones coherentes
✅ Seguir instrucciones complejas
✅ Razonar sobre problemas paso a paso

**Lo que NO pueden hacer (limitaciones):**

❌ Acceder a información en tiempo real (sin herramientas)
❌ Garantizar precisión factual (pueden "alucinar")
❌ Recordar conversaciones anteriores (sin memoria persistente)
❌ Ejecutar acciones en el mundo real directamente
❌ Tener consciencia o emociones reales
❌ Aprender de la conversación actual permanentemente

---

### 5. Modelos Principales (2024-2025)

| Modelo | Empresa | Fortalezas | Acceso |
|--------|---------|------------|--------|
| **GPT-4o** | OpenAI | Multimodal, popular | ChatGPT Plus |
| **Claude 3.5** | Anthropic | Razonamiento, contexto largo | claude.ai |
| **Gemini Ultra** | Google | Integración Google, multimodal | Gemini Advanced |
| **Llama 3** | Meta | Open source, personalizable | Hugging Face |
| **Mistral** | Mistral AI | Europeo, eficiente | mistral.ai |

---

### 6. Impacto por Industria

```
┌─────────────────────────────────────────────────────────────────┐
│                    IMPACTO DE IA GENERATIVA                      │
├───────────────────┬────────────────────────────────────────────┤
│ INDUSTRIA         │ APLICACIONES                               │
├───────────────────┼────────────────────────────────────────────┤
│ Desarrollo SW     │ Asistentes de código, testing, docs        │
│ Electrónica       │ Diseño circuitos, análisis señales, PLCs   │
│ Salud             │ Apoyo diagnóstico, documentación clínica   │
│ Negocios          │ Análisis datos, marketing, atención cliente│
│ Educación         │ Tutores personalizados, contenido adaptado │
│ Legal             │ Análisis contratos, investigación jurídica │
│ Agricultura       │ Predicción cosechas, optimización recursos │
└───────────────────┴────────────────────────────────────────────┘
```

---

## Demo en Vivo

### Demostración 1: Capacidades Básicas

```
PROMPT: Explica en 3 oraciones qué es machine learning
        para alguien de 10 años.

RESPUESTA ESPERADA:
Machine learning es cuando las computadoras aprenden a hacer
cosas viendo muchos ejemplos, como tú aprendes a reconocer
perros viendo muchos perros diferentes. En lugar de
programarlas con reglas exactas, les mostramos miles de
ejemplos y ellas encuentran los patrones solas. Es como
enseñarle a un robot a jugar videojuegos dejándolo practicar
millones de veces.
```

### Demostración 2: Diferentes Estilos

```
PROMPT: Explica la fotosíntesis en estilo de:
        a) Científico formal
        b) Rap para adolescentes
        c) Receta de cocina

[El instructor muestra las 3 respuestas diferentes]
```

### Demostración 3: Razonamiento

```
PROMPT: Un tren sale de A a B a 60 km/h. Otro sale de B a A
        a 40 km/h. La distancia es 200 km. ¿Dónde se cruzan?
        Razona paso a paso.

[Mostrar el razonamiento detallado del modelo]
```

---

## Puntos Clave para Recordar

```
┌─────────────────────────────────────────────────────────────────┐
│                    RESUMEN DEL MÓDULO                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. IA Generativa CREA contenido nuevo, no solo analiza         │
│                                                                  │
│  2. Los LLMs predicen la siguiente palabra más probable         │
│                                                                  │
│  3. Entrenados con billones de textos → conocimiento amplio     │
│                                                                  │
│  4. Son herramientas potentes pero tienen limitaciones          │
│                                                                  │
│  5. La calidad del resultado depende de cómo preguntas          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Siguiente Módulo

→ [02-herramientas-configuracion](../02-herramientas-configuracion/) - Configurar ChatGPT, Claude y otras herramientas

---

*Módulo 01 - Introducción a IA Generativa*
*Tier 0 - Fundamentos Comunes*
