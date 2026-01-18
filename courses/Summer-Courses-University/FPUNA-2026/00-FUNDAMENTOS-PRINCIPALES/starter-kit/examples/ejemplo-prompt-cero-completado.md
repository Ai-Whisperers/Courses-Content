# Ejemplo Completado: Prompt con Framework CERO

## Contexto
Este es un ejemplo de cómo se ve un prompt bien estructurado usando el framework CERO, completado por un estudiante de Ingeniería Civil de la FPUNA.

---

## El Problema Original

El estudiante necesitaba entender el cálculo de estructuras de hormigón armado para un examen.

### Primer intento (prompt vago)
```
Explicame estructuras de hormigon
```

### Respuesta de la IA
La IA dio una respuesta muy general sobre:
- Qué es el hormigón armado
- Historia del hormigón
- Tipos de estructuras
- Nada específico para el examen

**Calificación del estudiante:** 2/10 - No servía para estudiar

---

## Segundo Intento: Usando Framework CERO

### Prompt Mejorado
```
CONTEXTO:
Soy estudiante de 4to año de Ingeniería Civil en la FPUNA.
Tengo examen de Hormigón Armado II la próxima semana.
El examen cubre diseño de vigas a flexión según norma paraguaya.

TAREA ESPECÍFICA:
Necesito entender el método de diseño de vigas simplemente
apoyadas a flexión, específicamente:
1. Cómo calcular el momento flector último (Mu)
2. Cómo determinar el área de acero requerida (As)
3. Cómo verificar si la viga falla por tracción (diseño dúctil)

ROL:
Explícamelo como un profesor de estructuras que quiere
que entienda el concepto para resolver problemas, no solo
para memorizar fórmulas.

OUTPUT DESEADO:
- Resumen de máximo 300 palabras
- Las 3 fórmulas principales con explicación de cada variable
- 1 ejemplo numérico simple con f'c = 21 MPa y fy = 420 MPa
- 3 errores comunes que debo evitar en el examen
- Vocabulario técnico en español (términos en guaraní si aplica)
```

---

## Respuesta Obtenida (Resumen)

La IA respondió con:

### 1. Resumen Conceptual
> El diseño de vigas a flexión busca que el acero de refuerzo resista la tensión mientras el hormigón resiste la compresión. El objetivo es lograr una "falla dúctil" donde el acero fluye antes de que el hormigón se aplaste, dando aviso antes del colapso...

### 2. Fórmulas Principales

| Fórmula | Variables | Uso |
|---------|-----------|-----|
| Mu = φ × As × fy × (d - a/2) | φ=0.9, d=altura útil, a=profundidad bloque | Momento resistente |
| As = Mu / (φ × fy × (d - a/2)) | Despeje para encontrar acero | Área de acero necesaria |
| ρmax = 0.75 × ρb | ρb = cuantía balanceada | Verificar falla dúctil |

### 3. Ejemplo Numérico
- Viga: 30×50 cm, L = 5m
- Carga: q = 20 kN/m
- Mu = qL²/8 = 62.5 kN·m
- As = 4.2 cm² → usar 3Ø16mm

### 4. Errores Comunes
1. Olvidar restar el recubrimiento para obtener d
2. Confundir f'c (resistencia del hormigón) con fy (fluencia del acero)
3. No verificar cuantía mínima además de máxima

---

## Evaluación del Estudiante

| Criterio | Puntuación (1-5) | Comentario |
|----------|------------------|------------|
| ¿Entendió lo que necesitaba? | 5 | Perfecto para el examen |
| ¿El formato fue el que pedí? | 5 | Resumen, fórmulas, ejemplo, errores |
| ¿El nivel fue apropiado? | 4 | Podría ser un poco más detallado |
| ¿Puedo usarlo directamente? | 4 | Debo verificar fórmulas en mi libro |

**Puntuación total: 18/20**

---

## Verificación Realizada

El estudiante verificó las fórmulas en su libro de texto (Nilson - Diseño de Estructuras de Hormigón):

| Fórmula | IA dijo | Libro dice | ¿Correcto? |
|---------|---------|------------|------------|
| Mu = φ × As × fy × (d - a/2) | ✓ | ✓ | Sí |
| φ = 0.9 para flexión | ✓ | ✓ | Sí |
| ρmax = 0.75 × ρb | ✓ | ✓ | Sí |

**Resultado:** La información era correcta, pero el estudiante igual verificó.

---

## Lecciones Aprendidas

### Lo que funcionó:
1. Dar contexto específico (año, carrera, tema exacto del examen)
2. Pedir formato específico (resumen, fórmulas, ejemplo)
3. Especificar valores de materiales (f'c, fy)
4. Pedir errores comunes (muy útil para exámenes)

### Lo que mejoraría la próxima vez:
1. Agregar: "Si no estás seguro de alguna fórmula, dímelo"
2. Pedir: "Indica qué página del libro de Nilson puedo consultar"
3. Especificar: "Usa la norma NP XX:2020 si existe"

---

## Template Personalizado del Estudiante

Basándose en esta experiencia, el estudiante creó su template:

```
CONTEXTO:
Soy estudiante de [año] de Ingeniería Civil en la FPUNA.
Tengo [examen/proyecto/tarea] de [materia] sobre [tema específico].

TAREA ESPECÍFICA:
Necesito entender/resolver/calcular:
1. [Punto específico 1]
2. [Punto específico 2]
3. [Punto específico 3]

ROL:
Explícamelo como un profesor de [especialidad] que quiere
que entienda el concepto, no solo memorice.

OUTPUT DESEADO:
- Resumen de máximo [X] palabras
- Fórmulas principales con explicación de variables
- [Cantidad] ejemplos numéricos con valores típicos de Paraguay
- Errores comunes a evitar
- Términos técnicos en español

RESTRICCIONES:
- Si alguna fórmula puede variar según norma, indicar cuál usas
- Si no estás seguro de algo, dímelo
- No inventes valores de normas paraguayas
```

---

## Reflexión Final

> "Antes perdía 30 minutos buscando en Google y YouTube sin encontrar exactamente lo que necesitaba. Con un buen prompt, obtuve en 5 minutos un resumen perfecto para mi examen. Pero aprendí que SIEMPRE debo verificar las fórmulas en el libro oficial."
>
> — Estudiante de Ingeniería Civil, FPUNA

---

*Ejemplo completado - Fundamentos de IA - FPUNA 2026*
