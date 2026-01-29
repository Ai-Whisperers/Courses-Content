# Prompt Engineering Cheatsheet
## Talleres de Verano FP-UNA 2026 - Clase 1

**🎯 Objetivo**: Escribir prompts efectivos que generen respuestas útiles de la IA

**📄 Imprimir y tener al lado mientras trabajas**

---

## 🎨 Framework CRAFT

Usa este framework para estructurar prompts complejos:

| Letra | Componente | Ejemplo |
|-------|------------|---------|
| **C** | **Contexto** | "Soy estudiante de Ingeniería Civil trabajando en mi tesis..." |
| **R** | **Rol de IA** | "Actúa como un asesor de investigación académica..." |
| **A** | **Acción** | "Ayúdame a estructurar mi revisión de literatura..." |
| **F** | **Formato** | "Dame una lista numerada con 5 puntos principales..." |
| **T** | **Tono** | "Usa lenguaje técnico pero accesible..." |

---

## ✅ Anatomía de un Buen Prompt

```
[CONTEXTO]
Soy estudiante de [carrera] trabajando en [proyecto].
Necesito [objetivo general].

[ROL]
Actúa como [experto/tutor/asistente] en [área].

[TAREA]
Ayúdame a:
1. [Acción específica 1]
2. [Acción específica 2]
3. [Acción específica 3]

[FORMATO]
Dame la respuesta en formato: [lista/tabla/párrafo/código/etc.]

[RESTRICCIONES]
- Debe ser en español
- Máximo [X] palabras/líneas
- Enfocarse en [aspecto específico]
- Usar fuentes [académicas/prácticas/etc.]

[TONO]
Tono: [formal/casual/técnico/educativo/etc.]
```

---

## 🎯 Prompts por Caso de Uso

### 📚 INVESTIGACIÓN Y ESTUDIO

**Explicar concepto complejo**:
```
Soy estudiante de [nivel] en [materia]. No entiendo bien [concepto].

Explícamelo:
1. Con analogía simple
2. Paso a paso
3. Con ejemplo práctico

Evita jerga técnica excesiva.
```

**Preparar para examen**:
```
Tengo examen de [materia] en [tiempo]. El examen cubre:
- [Tema 1]
- [Tema 2]
- [Tema 3]

Genera:
1. Resumen de cada tema (bullet points)
2. 5 preguntas de práctica
3. Conceptos que suelen confundirse
4. Tips para recordar fórmulas/definiciones
```

**Analizar paper académico**:
```
Tengo que leer este paper: [título]

Resúmeme:
1. Pregunta de investigación principal
2. Metodología usada
3. Hallazgos clave (3-5 puntos)
4. Limitaciones del estudio
5. Por qué es relevante para mi investigación sobre [tema]

Formato: Tabla comparativa si es posible.
```

---

### 💻 PROGRAMACIÓN

**Generar código**:
```
Necesito código en [lenguaje] que haga:
[Descripción clara de la funcionalidad]

Requisitos:
- Debe manejar [casos especiales]
- Usar [librería específica] si es posible
- Incluir manejo de errores
- Comentarios en español

Formato: Código completo listo para ejecutar.
```

**Debuggear código**:
```
Tengo este código en [lenguaje]:

```[lenguaje]
[pegar código]
```

Está dando este error:
```
[pegar error completo]
```

Diagnóstico:
1. ¿Cuál es el problema?
2. ¿Por qué ocurre?
3. ¿Cómo lo arreglo?
4. Muestra el código corregido

Explica en términos simples.
```

**Optimizar código**:
```
Este código funciona pero es lento:

```[lenguaje]
[código]
```

Optimízalo para:
- Mejor performance
- Menor uso de memoria
- Más legibilidad

Explica cada cambio que hagas y por qué mejora.
```

---

### ✍️ ESCRITURA Y DOCUMENTACIÓN

**Mejorar texto académico**:
```
Tengo este párrafo para mi [tesis/paper/ensayo]:

"[pegar texto]"

Mejóralo para que sea:
- Más claro y conciso
- Académicamente apropiado
- Sin cambiar el significado
- Mejor estructurado

Explica los cambios principales que hiciste.
```

**Generar outline de documento**:
```
Debo escribir [tipo de documento] sobre [tema].

Audiencia: [quién lo va a leer]
Longitud: [páginas/palabras]
Objetivo: [qué quiero lograr]

Genera outline con:
- Secciones principales
- Subsecciones
- Qué cubrir en cada parte
- Longitud estimada por sección
```

---

### 🎨 CREATIVIDAD Y DISEÑO

**Brainstorming de ideas**:
```
Necesito ideas para [proyecto/campaña/solución].

Contexto: [situación actual]
Restricciones: [presupuesto/tiempo/recursos]
Objetivo: [qué quiero lograr]

Dame:
- 10 ideas variadas (desde conservadoras hasta innovadoras)
- Para cada idea: pros y contras breves
- Tu recomendación de top 3

Formato: Tabla comparativa.
```

**Generar contenido de marketing**:
```
Producto/Servicio: [nombre y descripción]
Target: [audiencia específica]
Canal: [Instagram/email/blog/etc.]
Objetivo: [awareness/conversión/engagement]

Genera [tipo de contenido]:
- Tono: [casual/profesional/inspirador/etc.]
- Longitud: [caracteres/palabras]
- Incluir: [elementos específicos]
- Call-to-action: [qué acción quieres que tomen]
```

---

## ❌ Errores Comunes y Cómo Evitarlos

### ❌ Prompt Muy Vago
```
Mal: "Ayúdame con mi tarea"
```
**Problema**: IA no sabe qué tarea, qué nivel, qué necesitas

✅ **Mejor**:
```
"Soy estudiante de 3er año de Ingeniería. Tengo que diseñar un puente 
para mi clase de Estructuras. Ayúdame a calcular las cargas que debe 
soportar, dado que: [especificaciones]."
```

---

### ❌ Prompt Demasiado Complejo
```
Mal: "Necesito que me ayudes a crear una app web full-stack con 
React, Node, MongoDB, autenticación JWT, pagos con Stripe, 
sistema de notificaciones real-time con websockets, y dashboard 
de analytics con D3.js, todo en una sola respuesta"
```
**Problema**: Demasiado scope, respuesta será superficial

✅ **Mejor**: Divide en pasos
```
Paso 1: "Ayúdame a estructurar el proyecto y decidir arquitectura"
Paso 2: "Ahora genera el backend básico con autenticación"
Paso 3: "Ahora el frontend para login/register"
[etc...]
```

---

### ❌ Sin Contexto
```
Mal: "¿Cómo hago esto?"
```
**Problema**: IA no sabe qué es "esto"

✅ **Mejor**:
```
"Estoy usando Python con pandas. Tengo un DataFrame con columnas 
[A, B, C]. Quiero crear nueva columna D que sea suma de A y B. 
¿Cómo lo hago?"
```

---

### ❌ Sin Especificar Formato
```
Mal: "Dame información sobre fotosíntesis"
```
**Resultado**: Párrafo largo y denso

✅ **Mejor**:
```
"Explícame fotosíntesis en formato de:
1. Definición (1 oración)
2. Fases principales (bullet points)
3. Moléculas clave (tabla: nombre, función)
4. Por qué importa (1 párrafo)

Nivel: Universidad, biología básica."
```

---

## 💡 Tips Pro

### 🎯 Tip 1: Sé Específico con Números
```
❌ "Dame algunos ejemplos"
✅ "Dame 5 ejemplos diferentes"

❌ "Escribe algo corto"
✅ "Escribe máximo 200 palabras"
```

### 🎯 Tip 2: Pide Ejemplos
```
"Explica [concepto] y dame 2 ejemplos:
1. Uno simple/cotidiano
2. Uno técnico/avanzado"
```

### 🎯 Tip 3: Itera
```
Conversación ideal:
Tú: [Prompt inicial]
IA: [Respuesta]
Tú: "Bueno, pero hazlo más [X]"
IA: [Respuesta mejorada]
Tú: "Perfecto, ahora agrega [Y]"
```

### 🎯 Tip 4: Usa Delimitadores
```
"Analiza este código:

```python
def ejemplo():
    return "hola"
```

Y luego mejóralo."
```

### 🎯 Tip 5: Pide Explicaciones
```
"No solo dame la respuesta, explica:
1. Por qué esta es la mejor solución
2. Qué alternativas existen
3. Cuándo NO usar esto"
```

---

## 🎓 Prompt Templates Listos para Usar

### Template 1: Tutor Personal
```
Soy estudiante de [carrera/nivel]. Estoy estudiando [materia/tema].

Actúa como mi tutor personal. Explícame [concepto] usando:
1. Lenguaje simple primero
2. Luego términos técnicos
3. Analogía memorable
4. Pregunta de comprensión al final

Si mi respuesta está mal, explica por qué y dame otra oportunidad.
```

### Template 2: Code Reviewer
```
Revisa este código como un senior developer:

```[lenguaje]
[código]
```

Dame feedback sobre:
1. ✅ Qué está bien hecho
2. ⚠️ Qué mejorar (con razones)
3. 🔴 Errores o bugs potenciales
4. 💡 Sugerencias de optimización

Formato: Checklist con prioridades.
```

### Template 3: Research Assistant
```
Tema de investigación: [tema]

Ayúdame a:
1. Definir 5 subtemas clave a investigar
2. Generar 10 keywords para búsqueda académica
3. Sugerir estructura de revisión de literatura
4. Identificar autores/journals importantes en el área

Enfoque: [cualitativo/cuantitativo/mixto]
Disciplina: [área]
```

### Template 4: Writing Coach
```
Texto original:
"[tu texto]"

Como writing coach profesional:
1. Identifica issues principales (claridad, estructura, tono)
2. Reescribe mejorando esos issues
3. Explica los 3 cambios más importantes
4. Dame tips para próxima vez

Tipo de documento: [ensayo/email/reporte/etc.]
Audiencia: [quién lo lee]
```

---

## 🚨 Límites de la IA - Qué NO Hacer

### ❌ NO confíes ciegamente
- Siempre verifica información crítica
- Especialmente: fechas, statistics, citaciones

### ❌ NO uses para exámenes sin entender
- IA te ayuda a APRENDER
- No es para hacer trampa

### ❌ NO compartas información sensible
- No pongas passwords, datos personales
- No pongas código propietario de tu empresa

### ❌ NO esperes perfección
- Primera respuesta rara vez es la final
- Siempre itera y mejora

---

## ✅ Checklist de Prompt Efectivo

Antes de enviar tu prompt, verifica:

- [ ] ¿Incluí contexto de quién soy y qué hago?
- [ ] ¿Especifiqué qué quiero lograr?
- [ ] ¿Mencioné formato deseado?
- [ ] ¿Agregué restricciones importantes?
- [ ] ¿Está claro el nivel de detalle que necesito?
- [ ] ¿Puedo ser MÁS específico?

Si todas son ✅ → ¡Envía!

---

## 🎯 Ejercicio Práctico

**Tarea**: Mejora este prompt

❌ **Prompt malo**:
```
"ayudame con fisica"
```

**Tu turno**: Reescríbelo usando CRAFT

✍️ **Escribe aquí tu versión**:
```
C - Contexto: 
R - Rol:
A - Acción:
F - Formato:
T - Tono:
```

**Ejemplo de solución** (no mires hasta intentar):
```
C - Contexto: Soy estudiante de 2do año de Ingeniería Eléctrica. 
    Tengo examen de Física II (electromagnetismo) en 3 días.

R - Rol: Actúa como tutor de física con experiencia enseñando 
    a universitarios.

A - Acción: Ayúdame a entender la Ley de Faraday:
    1. Explicación conceptual simple
    2. Fórmula y significado de cada variable
    3. 3 ejemplos de aplicación práctica
    4. 2 problemas de práctica con soluciones paso a paso

F - Formato: Explicación estructurada con secciones claras. 
    Usa ecuaciones en formato LaTeX cuando sea necesario.

T - Tono: Educativo pero accesible, sin condescender. 
    Como si fueras un TA (teaching assistant) paciente.
```

---

**¡Practica estos patrones y se volverán naturales!** 🚀

---

_Creado para: Talleres de Verano FP-UNA 2026 - Clase 1_  
_Imprimir y usar como referencia durante el taller_
