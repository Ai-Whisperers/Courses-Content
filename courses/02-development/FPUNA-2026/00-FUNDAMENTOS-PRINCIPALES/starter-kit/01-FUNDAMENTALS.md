# Fundamentos - Cómo Funcionan los LLMs

## Entendiendo la Tecnología que Usas

---

## ¿Qué es un LLM?

**LLM = Large Language Model** (Modelo de Lenguaje Grande)

Es un programa de computadora que:
1. Fue entrenado con enormes cantidades de texto (libros, código, web)
2. Aprendió patrones estadísticos del lenguaje
3. Predice la siguiente palabra más probable dada una entrada

**Analogía simple:** Es como el autocomplete del celular, pero extremadamente más sofisticado.

---

## Cómo Funciona (Simplificado)

```
┌─────────────────────────────────────────────────────────────┐
│                    PROCESO DEL LLM                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   TU PROMPT                    PROCESAMIENTO                 │
│   ──────────                   ─────────────                 │
│   "Escribe una     ───────▶    El modelo calcula             │
│    función que                  probabilidades de            │
│    sume dos                     cada posible palabra         │
│    números"                     siguiente                    │
│                                                              │
│                                       │                      │
│                                       ▼                      │
│                                                              │
│                               GENERACIÓN                     │
│                               ──────────                     │
│                               "def suma(a, b):" ← más probable
│                               "    return a + b"             │
│                                                              │
│   RESPUESTA                                                  │
│   ─────────                                                  │
│   El modelo genera                                           │
│   token por token    ◀────────────────────────────────────   │
│   hasta completar                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Conceptos Clave

### 1. Tokens

El LLM no lee palabras completas. Lee "tokens" (fragmentos de texto).

```
"Programación" → ["Program", "ación"]  (2 tokens)
"def suma():"  → ["def", " suma", "()", ":"]  (4 tokens)
```

**¿Por qué importa?**
- Los modelos tienen límite de tokens (contexto)
- Más tokens = más costo = más tiempo
- Código eficiente usa menos tokens

### 2. Contexto (Context Window)

Es la "memoria" del modelo durante una conversación.

| Modelo | Contexto Aproximado |
|--------|---------------------|
| GPT-3.5 | ~4,000 tokens |
| GPT-4 | ~8,000-128,000 tokens |
| Claude 3 | ~200,000 tokens |

**¿Por qué importa?**
- Si tu conversación excede el contexto, el modelo "olvida" el inicio
- Proyectos grandes pueden no caber en una sola conversación
- Claude Code maneja esto con "compaction" automático

### 3. Temperatura

Controla qué tan "creativo" o "predecible" es el modelo.

```
Temperatura BAJA (0.0-0.3):
- Respuestas más consistentes
- Mejor para código y datos
- Menos variación

Temperatura ALTA (0.7-1.0):
- Respuestas más creativas
- Mejor para texto, ideas
- Más variación
```

### 4. Prompts y Prompting

**Prompt** = La instrucción que le das al modelo

La calidad de tu prompt determina la calidad de la respuesta:

```
❌ Prompt malo:
"haz una función"

✅ Prompt bueno:
"Escribe una función en Python que:
- Reciba una lista de números
- Devuelva el promedio
- Maneje el caso de lista vacía
- Incluya docstring"
```

---

## Qué Pueden y No Pueden Hacer los LLMs

### ✅ Pueden:

| Capacidad | Ejemplo |
|-----------|---------|
| Generar código | Funciones, clases, scripts |
| Explicar código | "¿Qué hace esta línea?" |
| Traducir entre lenguajes | Python → JavaScript |
| Refactorizar | Mejorar código existente |
| Documentar | Generar docstrings, README |
| Debuggear | Identificar errores lógicos |
| Responder preguntas | Conceptos, sintaxis |

### ❌ No Pueden:

| Limitación | Por qué |
|------------|---------|
| Ejecutar código | Solo generan texto, no ejecutan |
| Acceder a internet en tiempo real | Conocimiento tiene fecha de corte |
| Recordar conversaciones pasadas | Cada sesión empieza de cero* |
| Garantizar código correcto | Pueden generar bugs |
| Conocer tu proyecto | Debes darles contexto |
| Pensar realmente | Predicen texto, no "entienden" |

*Claude Code mantiene contexto durante la sesión.

---

## Por Qué los LLMs Cometen Errores

### 1. Alucinaciones

El modelo genera información que suena correcta pero es falsa.

```
Tú: "¿Qué librería uso para X en Python?"
IA: "Usa la librería 'superutil' con pip install superutil"

Problema: La librería "superutil" no existe. El modelo la inventó
porque suena plausible.
```

**Cómo evitarlo:** Siempre verificar que librerías/funciones existan.

### 2. Código Desactualizado

El modelo fue entrenado hasta cierta fecha.

```
Tú: "Usa la última versión de React"
IA: [genera código de React 17]

Problema: React 19 ya existe pero el modelo no lo conoce.
```

**Cómo evitarlo:** Especificar versiones, verificar documentación actual.

### 3. Soluciones Genéricas

El modelo tiende a soluciones "promedio" de su entrenamiento.

```
Tú: "Ordena esta lista"
IA: [genera bubble sort]

Problema: Bubble sort es O(n²), ineficiente para listas grandes.
```

**Cómo evitarlo:** Especificar requisitos de performance si importan.

### 4. Falta de Contexto

El modelo no sabe nada de tu proyecto específico.

```
Tú: "Agrega autenticación"
IA: [genera sistema JWT completo]

Problema: Tu proyecto ya usa OAuth y esto duplica código.
```

**Cómo evitarlo:** Proporcionar contexto en CLAUDE.md.

---

## El Modelo Mental Correcto

### ❌ No pienses así:
> "La IA sabe programar mejor que yo, le pido todo"

### ✅ Piensa así:
> "La IA es un asistente muy rápido pero imperfecto. Yo soy el programador, ella es la herramienta."

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   TÚ (Programador)              IA (Asistente)              │
│   ────────────────              ──────────────              │
│   • Defines el problema         • Genera opciones           │
│   • Verificas soluciones        • Escribe código rápido     │
│   • Tomas decisiones            • Explica conceptos         │
│   • Entiendes el contexto       • Ofrece alternativas       │
│   • Asumes responsabilidad      • Ejecuta instrucciones     │
│                                                              │
│   TÚ LIDERAS                    IA ASISTE                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Cómo Aprenden los LLMs (Para Curiosos)

### Entrenamiento (simplificado):

1. **Recolección de datos**: Billones de palabras de internet, libros, código
2. **Tokenización**: Convertir texto a números que la máquina entiende
3. **Entrenamiento**: El modelo ajusta millones de parámetros para predecir la siguiente palabra
4. **Fine-tuning**: Ajuste adicional para seguir instrucciones
5. **RLHF**: Humanos califican respuestas para mejorar calidad

**Implicación:** El modelo "sabe" lo que estaba en sus datos de entrenamiento. No puede aprender cosas nuevas después (sin re-entrenar).

---

## Términos que Escucharás

| Término | Significado |
|---------|-------------|
| **Prompt** | Tu instrucción al modelo |
| **Completion** | La respuesta del modelo |
| **Token** | Unidad de texto (fragmento de palabra) |
| **Context window** | Cuánto texto puede "recordar" |
| **Fine-tuning** | Entrenar modelo para tarea específica |
| **RAG** | Retrieval Augmented Generation - agregar información externa |
| **Hallucination** | Cuando inventa información falsa |
| **Zero-shot** | Pedir algo sin dar ejemplos |
| **Few-shot** | Dar ejemplos antes de pedir |

---

## Lectura Adicional (Opcional)

Si quieres profundizar:

1. **"Attention Is All You Need"** - Paper original de Transformers
2. **"The Illustrated Transformer"** - Explicación visual (Jay Alammar)
3. **"What are LLMs"** - Anthropic's explanation
4. **Andrej Karpathy's YouTube** - Videos técnicos accesibles

---

*01-FUNDAMENTALS.md - FPUNA 2026*
