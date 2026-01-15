# Módulo 03: Prompting Efectivo
## Fundamentos Comunes - Tier 0

---

## Descripción

Este módulo enseña técnicas prácticas para escribir prompts que generen mejores respuestas. Un buen prompt es la diferencia entre una respuesta mediocre y una excelente.

**Duración:** 45 minutos
**Tipo:** Teórico-Práctico

---

## Objetivos de Aprendizaje

Al completar este módulo, los participantes podrán:

1. **Aplicar** el framework CREA para estructurar prompts
2. **Utilizar** técnicas como few-shot y chain-of-thought
3. **Mejorar** prompts básicos a prompts efectivos
4. **Evitar** errores comunes de prompting

---

## ¿Por qué Importa el Prompting?

```
┌─────────────────────────────────────────────────────────────────┐
│                    MISMO MODELO, DIFERENTES RESULTADOS           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Prompt vago:        "Escribe sobre marketing"                   │
│  Resultado:          Texto genérico de 500 palabras              │
│                                                                  │
│  Prompt efectivo:    "Actúa como experto en marketing digital.   │
│                       Lista 5 estrategias de bajo costo para     │
│                       una PyME paraguaya que vende artesanías.   │
│                       Incluye ejemplo real para cada estrategia. │
│                       Formato: lista numerada con sub-puntos."   │
│                                                                  │
│  Resultado:          5 estrategias específicas, accionables,     │
│                       con ejemplos locales relevantes            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## El Framework CREA

### Estructura de un Prompt Efectivo

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRAMEWORK CREA                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  C  CONTEXTO        ¿Cuál es la situación o antecedente?        │
│     ─────────                                                    │
│                                                                  │
│  R  ROL             ¿Qué papel debe asumir la IA?               │
│     ───                                                          │
│                                                                  │
│  E  ESPECIFICACIONES ¿Qué requisitos exactos debe cumplir?      │
│     ───────────────                                              │
│                                                                  │
│  A  ACCIÓN          ¿Qué debe hacer concretamente?              │
│     ──────                                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Ejemplo Aplicado

```
┌─ CONTEXTO ─────────────────────────────────────────────────────┐
│ Soy estudiante de ingeniería electrónica en Paraguay.          │
│ Estoy aprendiendo a programar microcontroladores ESP32.        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─ ROL ──────────────────────────────────────────────────────────┐
│ Actúa como profesor experto en sistemas embebidos con          │
│ experiencia enseñando a principiantes.                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─ ESPECIFICACIONES ─────────────────────────────────────────────┐
│ - Usa lenguaje simple sin jerga técnica innecesaria            │
│ - Incluye código comentado línea por línea                     │
│ - Explica el "por qué" de cada decisión                        │
│ - Formato: código con comentarios + explicación separada       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─ ACCIÓN ───────────────────────────────────────────────────────┐
│ Escribe un programa para ESP32 que lea temperatura             │
│ de un sensor DHT22 y encienda un LED si supera 30°C.           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Técnicas de Prompting

### 1. Zero-Shot (Pregunta Directa)

Preguntar directamente sin ejemplos. Funciona para tareas simples.

```
PROMPT:
¿Cuál es la capital de Paraguay?

RESPUESTA:
La capital de Paraguay es Asunción.
```

**Cuándo usar:** Preguntas factuales simples, tareas claras.

---

### 2. Few-Shot (Con Ejemplos)

Proporcionar ejemplos del formato o estilo deseado.

```
PROMPT:
Clasifica estos comentarios de clientes como POSITIVO, NEGATIVO o NEUTRO.

Ejemplos:
- "¡Excelente producto, llegó antes de tiempo!" → POSITIVO
- "No funciona, quiero devolución" → NEGATIVO
- "El producto es como se describe" → NEUTRO

Ahora clasifica estos:
1. "Muy buena atención, recomendado"
2. "Tardó 3 semanas en llegar"
3. "Cumple su función básica"

RESPUESTA:
1. "Muy buena atención, recomendado" → POSITIVO
2. "Tardó 3 semanas en llegar" → NEGATIVO
3. "Cumple su función básica" → NEUTRO
```

**Cuándo usar:** Tareas de clasificación, formato específico, estilo particular.

---

### 3. Chain-of-Thought (Razonamiento Paso a Paso)

Pedir que razone explícitamente antes de dar la respuesta final.

```
PROMPT:
Un tanque tiene capacidad de 1000 litros. Se llena a razón de
50 litros/minuto pero tiene una fuga de 10 litros/minuto.
¿Cuánto tiempo tarda en llenarse desde vacío?

Piensa paso a paso antes de dar la respuesta final.

RESPUESTA:
Paso 1: Calcular flujo neto
- Entrada: 50 L/min
- Salida (fuga): 10 L/min
- Flujo neto: 50 - 10 = 40 L/min

Paso 2: Calcular tiempo
- Capacidad: 1000 L
- Flujo neto: 40 L/min
- Tiempo = 1000 ÷ 40 = 25 minutos

Respuesta: El tanque tardará 25 minutos en llenarse.
```

**Cuándo usar:** Problemas matemáticos, lógica compleja, decisiones.

---

### 4. Role-Playing (Asignar Rol)

Definir un personaje o experto que la IA debe interpretar.

```
PROMPT:
Actúa como un médico especialista en cardiología explicando
a un paciente de 70 años qué es la hipertensión.
Usa lenguaje simple y analogías cotidianas.
Evita términos médicos complejos.

RESPUESTA:
Don [Paciente], imagine que sus arterias son como mangueras
de jardín. Cuando la presión del agua es muy fuerte,
la manguera se desgasta más rápido...
```

**Cuándo usar:** Explicaciones adaptadas, comunicación específica.

---

### 5. Formato Específico

Definir exactamente cómo debe estructurarse la respuesta.

```
PROMPT:
Compara Python y JavaScript para desarrollo web.

FORMATO REQUERIDO:
| Criterio | Python | JavaScript |
|----------|--------|------------|
| [criterio] | [evaluación] | [evaluación] |

Incluye al menos 5 criterios de comparación.

RESPUESTA:
| Criterio | Python | JavaScript |
|----------|--------|------------|
| Backend | Excelente (Django, Flask) | Bueno (Node.js) |
| Frontend | Limitado | Excelente (nativo) |
| Curva aprendizaje | Fácil | Moderada |
| Ecosistema | Amplio | Muy amplio |
| Velocidad | Moderada | Rápida (V8) |
```

**Cuándo usar:** Reportes, comparaciones, datos estructurados.

---

## Errores Comunes y Soluciones

### Error 1: Prompts Vagos

```
❌ MALO:
"Escribe algo sobre programación"

✅ MEJOR:
"Escribe una guía de 5 pasos para principiantes que quieren
aprender Python. Enfócate en los primeros conceptos esenciales.
Incluye un ejemplo de código simple para cada paso."
```

### Error 2: Demasiados Requisitos a la Vez

```
❌ MALO:
"Escribe un ensayo sobre IA que sea divertido, técnico,
corto pero detallado, para expertos y principiantes,
con ejemplos pero sin código, formal pero casual..."

✅ MEJOR:
"Escribe una introducción a IA (300 palabras) para
estudiantes universitarios. Tono: informativo pero accesible.
Incluye 1 ejemplo cotidiano de IA."
```

### Error 3: No Especificar Formato

```
❌ MALO:
"Dame información sobre células solares"

✅ MEJOR:
"Explica cómo funcionan las células solares.
Formato:
1. Principio básico (2-3 oraciones)
2. Componentes principales (lista)
3. Eficiencia típica (dato numérico)
4. Aplicación común (1 ejemplo)"
```

### Error 4: Asumir Contexto

```
❌ MALO:
"¿Cómo mejoro el código?"
(¿Qué código? ¿Mejorar qué aspecto?)

✅ MEJOR:
"Tengo este código Python que lee un CSV:
[pegar código]
Quiero mejorar:
1. Velocidad de ejecución
2. Manejo de errores
Sugiere cambios específicos."
```

---

## Plantillas Útiles

### Plantilla: Explicación de Concepto

```
Explica [CONCEPTO] para [AUDIENCIA].

Requisitos:
- Nivel de complejidad: [básico/intermedio/avanzado]
- Longitud: [corto/medio/largo]
- Incluir: [ejemplos/analogías/datos]
- Evitar: [jerga técnica/suposiciones]

Formato: [párrafos/lista/tabla]
```

### Plantilla: Revisión de Código

```
Revisa el siguiente código [LENGUAJE]:

```[código]```

Analiza:
1. Errores potenciales
2. Mejoras de rendimiento
3. Buenas prácticas faltantes
4. Seguridad

Formato: Lista cada problema con solución sugerida.
```

### Plantilla: Resolución de Problemas

```
Problema: [descripción del problema]

Contexto:
- [información relevante]
- [restricciones]

Necesito:
1. Análisis de causas posibles
2. Soluciones ordenadas por viabilidad
3. Pasos para implementar la mejor solución

Piensa paso a paso antes de responder.
```

### Plantilla: Comparación

```
Compara [OPCIÓN A] vs [OPCIÓN B] para [PROPÓSITO].

Contexto: [situación específica]

Evalúa:
- [criterio 1]
- [criterio 2]
- [criterio 3]

Formato: Tabla comparativa + recomendación final con justificación.
```

---

## Iteración: Mejorando Respuestas

La primera respuesta no siempre es la mejor. Itera:

```
PASO 1: Prompt inicial
"Explica machine learning"
→ Respuesta genérica

PASO 2: Agregar contexto
"Explica machine learning para un estudiante de negocios
que nunca ha programado"
→ Mejor, pero muy largo

PASO 3: Agregar restricciones
"Explica machine learning para un estudiante de negocios.
Máximo 100 palabras. Usa analogía de negocios."
→ Conciso y relevante

PASO 4: Refinar si es necesario
"Buena explicación. Ahora agrega un ejemplo específico
de cómo Amazon usa machine learning para recomendaciones."
→ Perfecto
```

---

## Resumen de Técnicas

| Técnica | Cuándo Usar | Ejemplo Rápido |
|---------|-------------|----------------|
| **Zero-shot** | Preguntas simples | "¿Qué es TCP/IP?" |
| **Few-shot** | Clasificación, formato | "Ejemplos: A→X, B→Y. ¿C→?" |
| **Chain-of-thought** | Problemas complejos | "Piensa paso a paso..." |
| **Role-playing** | Audiencia específica | "Actúa como profesor..." |
| **Formato específico** | Datos estructurados | "Responde en tabla..." |
| **Iteración** | Refinar respuestas | "Ahora hazlo más corto" |

---

## Siguiente Módulo

→ [04-etica-limitaciones](../04-etica-limitaciones/) - Uso responsable de IA

---

*Módulo 03 - Prompting Efectivo*
*Tier 0 - Fundamentos Comunes*
