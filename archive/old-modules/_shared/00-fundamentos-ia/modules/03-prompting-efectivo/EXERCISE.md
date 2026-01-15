# Ejercicio Práctico - Módulo 03
## Mejorando Prompts

---

## Objetivo

Practicar la transformación de prompts básicos en prompts efectivos utilizando el framework CREA y técnicas de prompting.

**Duración:** 20 minutos
**Tipo:** Práctico comparativo
**Herramientas:** ChatGPT, Claude o Gemini

---

## Parte 1: Transformación de Prompts (10 min)

### Ejercicio 1.1: Prompt Vago → Prompt CREA

**Prompt original (vago):**
```
Explica bases de datos
```

**Tu tarea:** Transforma usando el framework CREA

```
CONTEXTO:
_________________________________________________
_________________________________________________

ROL:
_________________________________________________

ESPECIFICACIONES:
- _________________________________________________
- _________________________________________________
- _________________________________________________

ACCIÓN:
_________________________________________________
_________________________________________________
```

**Prueba ambos prompts** en tu herramienta de IA y compara:

| Aspecto | Prompt Vago | Prompt CREA |
|---------|-------------|-------------|
| Longitud de respuesta | | |
| Relevancia para ti | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Claridad | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| ¿Cuál preferiste? | | |

---

### Ejercicio 1.2: Agregar Few-Shot

**Prompt original:**
```
Clasifica estos emails como spam o no spam
```

**Tu tarea:** Agrega 3 ejemplos para guiar la clasificación

```
Clasifica emails como SPAM o NO SPAM.

Ejemplos:
1. "_________________________________________________"
   → _______

2. "_________________________________________________"
   → _______

3. "_________________________________________________"
   → _______

Ahora clasifica:
- "Ganaste $1,000,000! Haz clic aquí para reclamar"
- "Recordatorio: reunión de equipo mañana a las 10am"
- "Tu pedido #12345 ha sido enviado"
```

**Prueba el prompt** y verifica si la clasificación es correcta.

---

### Ejercicio 1.3: Agregar Chain-of-Thought

**Problema:**
```
Una tienda vende productos a Gs. 50,000 cada uno.
Tiene costos fijos de Gs. 2,000,000 mensuales.
El costo variable por producto es Gs. 30,000.
¿Cuántos productos debe vender para no perder dinero?
```

**Versión A (sin CoT):**
```
[Copia el problema tal cual y envíalo]
```

**Versión B (con CoT):**
```
[Problema]

Resuelve paso a paso:
1. Identifica las variables
2. Plantea la ecuación de punto de equilibrio
3. Resuelve mostrando cada cálculo
4. Verifica el resultado
5. Da la respuesta final
```

**Compara las respuestas:**

| Aspecto | Sin CoT | Con CoT |
|---------|---------|---------|
| ¿Mostró el proceso? | | |
| ¿Es verificable? | | |
| ¿Puedes aprender del proceso? | | |

---

## Parte 2: Mejora Iterativa (5 min)

### Ejercicio 2.1: Iterar Hasta Obtener lo Deseado

**Objetivo:** Obtener un email profesional para solicitar una pasantía.

**Iteración 1 - Prompt básico:**
```
Escribe un email para pedir pasantía
```

Envíalo y anota qué falta:
```
Problemas de la respuesta:
- _________________________________________________
- _________________________________________________
```

**Iteración 2 - Agregar contexto:**
```
Escribe un email para solicitar pasantía en [EMPRESA].
Soy estudiante de [TU CARRERA] en [TU UNIVERSIDAD].
Estoy en [AÑO] año.
```

Anota mejoras y problemas restantes:
```
Mejoras: _________________________________________________
Aún falta: _________________________________________________
```

**Iteración 3 - Especificaciones completas:**
```
Escribe un email profesional para solicitar pasantía.

CONTEXTO:
- Empresa: [nombre real o inventado]
- Mi carrera: [tu carrera]
- Mi universidad: [tu universidad]
- Período deseado: [ej: enero-febrero 2025]

REQUISITOS:
- Tono: Formal pero no rígido
- Longitud: Máximo 150 palabras
- Incluir: Mi motivación específica por esa empresa
- Incluir: 2 habilidades relevantes que tengo
- NO incluir: Frases genéricas como "soy trabajador"

FORMATO:
- Asunto del email
- Cuerpo
- Despedida profesional
```

**Resultado final satisfactorio:** Sí / No

---

## Parte 3: Aplicación a Tu Área (5 min)

### Ejercicio 3.1: Crea Tu Propio Prompt Profesional

Piensa en una tarea real de tu carrera donde la IA podría ayudarte.

**Área de estudio:** _______________________

**Tarea específica:** _______________________

**Escribe un prompt completo usando CREA:**

```
CONTEXTO:
_________________________________________________
_________________________________________________
_________________________________________________

ROL:
_________________________________________________
_________________________________________________

ESPECIFICACIONES:
- _________________________________________________
- _________________________________________________
- _________________________________________________
- _________________________________________________

FORMATO:
_________________________________________________
_________________________________________________

ACCIÓN:
_________________________________________________
_________________________________________________
```

**Pruébalo** y evalúa:

| Criterio | Puntuación (1-5) |
|----------|------------------|
| ¿La respuesta es útil? | |
| ¿El formato es el pedido? | |
| ¿El nivel es apropiado? | |
| ¿Lo usarías en la vida real? | |

---

## Entregables

1. **Prompt CREA transformado** (Ejercicio 1.1)
2. **Prompt Few-Shot** con 3 ejemplos (Ejercicio 1.2)
3. **Comparación CoT** - Capturas de ambas respuestas (Ejercicio 1.3)
4. **Email final** después de 3 iteraciones (Ejercicio 2.1)
5. **Prompt profesional propio** de tu área (Ejercicio 3.1)

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Transformación CREA correcta | 25 |
| Few-shot con ejemplos relevantes | 20 |
| Comparación CoT documentada | 15 |
| Iteración efectiva (email) | 20 |
| Prompt profesional propio | 20 |
| **Total** | **100** |

---

## Reflexión Final

¿Qué técnica te resultó más útil?
```
_________________________________________________
```

¿Qué error de prompting cometías antes?
```
_________________________________________________
```

¿Cómo aplicarás esto en tus estudios/trabajo?
```
_________________________________________________
```

---

*Ejercicio Módulo 03 - Mejorando Prompts*
*Tier 0 - Fundamentos Comunes*
