# Módulo 04: Ética y Limitaciones de la IA
## Fundamentos Comunes - Tier 0

---

## Descripción

Este módulo aborda las limitaciones técnicas de la IA generativa y las consideraciones éticas esenciales para su uso responsable. Comprender estos aspectos es fundamental para usar la IA de manera efectiva y ética.

**Duración:** 30 minutos
**Tipo:** Teórico con discusión

---

## Objetivos de Aprendizaje

Al completar este módulo, los participantes podrán:

1. **Identificar** las principales limitaciones técnicas de los LLMs
2. **Reconocer** situaciones donde la IA puede fallar
3. **Aplicar** principios éticos en el uso de IA
4. **Desarrollar** prácticas de verificación y uso responsable

---

## Limitaciones Técnicas

### 1. Alucinaciones (Información Inventada)

```
┌─────────────────────────────────────────────────────────────────┐
│                       ALUCINACIONES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  DEFINICIÓN:                                                     │
│  La IA genera información que parece correcta pero es falsa,     │
│  inventada, o mezclada incorrectamente.                         │
│                                                                  │
│  EJEMPLOS:                                                       │
│  • Citar papers académicos que no existen                       │
│  • Inventar estadísticas con fuentes falsas                     │
│  • Mezclar información de personas diferentes                   │
│  • Crear URLs que parecen reales pero no funcionan              │
│                                                                  │
│  POR QUÉ OCURRE:                                                │
│  Los LLMs predicen la "siguiente palabra más probable",          │
│  no verifican si la información es verdadera.                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Ejemplo Real:**
```
PREGUNTA: ¿Quién fue el primer presidente de Paraguay nacido en Asunción?

POSIBLE ALUCINACIÓN:
"El primer presidente nacido en Asunción fue [nombre inventado],
quien gobernó de [fechas inventadas] y es conocido por [logros inventados]."

REALIDAD:
La IA puede inventar nombres y fechas que suenan plausibles pero
son completamente ficticios. SIEMPRE verificar datos históricos.
```

**Cómo Mitigar:**
- Verificar datos importantes con fuentes confiables
- Pedir citas y luego verificarlas manualmente
- Usar IA como punto de partida, no como verdad absoluta

---

### 2. Fecha de Corte de Conocimiento

```
┌─────────────────────────────────────────────────────────────────┐
│                    FECHA DE CORTE                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Cada modelo tiene una "fecha de corte" después de la cual      │
│  no tiene información.                                          │
│                                                                  │
│  Modelo            │ Fecha de Corte (aprox)                     │
│  ──────────────────┼────────────────────────                    │
│  GPT-4             │ Abril 2023 / Diciembre 2023               │
│  Claude 3          │ Agosto 2023                                │
│  Gemini            │ Variable (tiene búsqueda)                  │
│                                                                  │
│  CONSECUENCIA:                                                   │
│  • No conoce eventos recientes                                  │
│  • Versiones de software pueden estar desactualizadas           │
│  • Leyes y regulaciones pueden haber cambiado                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Cómo Mitigar:**
- Usar herramientas con búsqueda web (Gemini, Copilot)
- Verificar fechas de información importante
- Consultar documentación oficial para software actual

---

### 3. Sesgos del Entrenamiento

```
┌─────────────────────────────────────────────────────────────────┐
│                         SESGOS                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ORIGEN:                                                         │
│  Los modelos reflejan sesgos presentes en los datos de          │
│  entrenamiento (mayormente texto de internet en inglés).        │
│                                                                  │
│  TIPOS DE SESGO:                                                │
│                                                                  │
│  • Cultural: Perspectiva centrada en países anglófonos          │
│  • Temporal: Más datos recientes vs históricos                  │
│  • Representación: Grupos sub-representados en datos            │
│  • De género: Estereotipos en descripciones de profesiones      │
│                                                                  │
│  EJEMPLO:                                                        │
│  "Describe un enfermero" → Puede asumir género femenino         │
│  "Ejemplos de comida típica" → Puede ignorar cocina paraguaya   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Cómo Mitigar:**
- Ser explícito sobre contexto local (Paraguay, Latinoamérica)
- Pedir perspectivas diversas explícitamente
- Cuestionar suposiciones en las respuestas

---

### 4. Límites de Razonamiento

```
┌─────────────────────────────────────────────────────────────────┐
│                 LÍMITES DE RAZONAMIENTO                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LO QUE PARECE QUE HACEN:                                       │
│  Razonar, entender, pensar                                      │
│                                                                  │
│  LO QUE REALMENTE HACEN:                                        │
│  Predecir patrones de texto basados en entrenamiento            │
│                                                                  │
│  CONSECUENCIAS:                                                  │
│  • Pueden fallar en lógica simple si es "inusual"               │
│  • Pueden inventar pasos intermedios incorrectos                │
│  • Mayor confianza ≠ mayor precisión                            │
│                                                                  │
│  EJEMPLO DE FALLO:                                               │
│  "Si tengo 3 manzanas y me dan 2 plátanos,                      │
│   ¿cuántas naranjas tengo?"                                     │
│  → Algunos modelos responden "5" en lugar de "ninguna"          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5. Limitaciones de Contexto

```
┌─────────────────────────────────────────────────────────────────┐
│                 LÍMITES DE CONTEXTO                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  VENTANA DE CONTEXTO:                                           │
│  Cantidad máxima de texto que el modelo puede "recordar"        │
│  en una conversación.                                           │
│                                                                  │
│  • GPT-4 estándar: ~8K tokens (~6,000 palabras)                │
│  • GPT-4 Turbo: ~128K tokens                                    │
│  • Claude 3: ~200K tokens                                       │
│                                                                  │
│  PROBLEMAS:                                                      │
│  • Conversaciones largas "olvidan" el inicio                    │
│  • Documentos muy largos pueden truncarse                       │
│  • Detalles del medio pueden perderse                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Consideraciones Éticas

### 1. Propiedad Intelectual

```
┌─────────────────────────────────────────────────────────────────┐
│                 PROPIEDAD INTELECTUAL                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PREGUNTAS CLAVE:                                               │
│                                                                  │
│  ¿Quién es el autor del contenido generado por IA?             │
│  → Legalmente ambiguo en muchos países                          │
│                                                                  │
│  ¿Es plagio usar contenido de IA?                               │
│  → Depende del contexto y políticas institucionales             │
│                                                                  │
│  ¿Puedo usar IA para trabajos académicos?                       │
│  → Consultar políticas de tu universidad                        │
│                                                                  │
│  BUENAS PRÁCTICAS:                                              │
│  • Declarar cuando se usó IA como asistencia                   │
│  • No presentar output de IA como trabajo propio               │
│  • Usar IA para aprender, no para evitar aprender              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. Privacidad y Datos Sensibles

```
┌─────────────────────────────────────────────────────────────────┐
│                 PRIVACIDAD                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ⚠️ NUNCA COMPARTIR:                                            │
│                                                                  │
│  • Contraseñas o credenciales                                   │
│  • Números de tarjeta de crédito                                │
│  • Datos médicos personales identificables                      │
│  • Información confidencial empresarial                         │
│  • Datos personales de terceros sin consentimiento              │
│                                                                  │
│  ¿POR QUÉ?                                                      │
│  • Los datos pueden usarse para entrenamiento                   │
│  • No hay garantía de eliminación completa                      │
│  • Pueden ocurrir filtraciones de datos                         │
│                                                                  │
│  ALTERNATIVA:                                                    │
│  Usar datos anonimizados o sintéticos para ejemplos            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3. Dependencia Excesiva

```
┌─────────────────────────────────────────────────────────────────┐
│                 RIESGO DE DEPENDENCIA                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SEÑALES DE ALERTA:                                             │
│                                                                  │
│  ❌ "No puedo trabajar sin IA"                                  │
│  ❌ No verifico nada de lo que genera                           │
│  ❌ He dejado de aprender conceptos básicos                     │
│  ❌ Copio sin entender                                          │
│                                                                  │
│  USO SALUDABLE:                                                 │
│                                                                  │
│  ✓ IA como herramienta, no como reemplazo de pensamiento       │
│  ✓ Verifico información importante                              │
│  ✓ Entiendo lo que la IA me genera                             │
│  ✓ Puedo hacer la tarea sin IA (aunque tome más tiempo)        │
│  ✓ Uso IA para aprender más, no para aprender menos            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4. Transparencia

```
┌─────────────────────────────────────────────────────────────────┐
│                 TRANSPARENCIA EN USO DE IA                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CONTEXTOS DONDE DECLARAR USO DE IA:                            │
│                                                                  │
│  ACADÉMICO:                                                      │
│  • Trabajos de investigación                                    │
│  • Tesis y proyectos finales                                    │
│  • Ensayos y tareas evaluadas                                   │
│                                                                  │
│  PROFESIONAL:                                                    │
│  • Contenido publicado (artículos, posts)                       │
│  • Documentos legales                                           │
│  • Comunicaciones oficiales                                      │
│                                                                  │
│  CÓMO DECLARAR:                                                  │
│  "Este documento fue elaborado con asistencia de herramientas   │
│   de IA generativa para [investigación/redacción/revisión].     │
│   Todo el contenido fue verificado y editado por el autor."     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Guía de Buenas Prácticas

### Antes de Usar IA

```
✓ ¿Entiendo la tarea lo suficiente para evaluar la respuesta?
✓ ¿Tengo tiempo para verificar información crítica?
✓ ¿Es apropiado usar IA para esta tarea? (políticas, ética)
```

### Durante el Uso

```
✓ No comparto información sensible
✓ Especifico contexto local cuando es relevante
✓ Pido explicaciones, no solo respuestas
✓ Cuestiono información que parece demasiado conveniente
```

### Después de Usar IA

```
✓ Verifico datos, citas y fuentes importantes
✓ Entiendo el contenido antes de usarlo
✓ Declaro uso de IA cuando corresponde
✓ Reflexiono: ¿Aprendí algo o solo copié?
```

---

## Casos de Estudio para Discusión

### Caso 1: El Estudiante y el Ensayo

> María debe entregar un ensayo de 2000 palabras sobre ética empresarial.
> Usa ChatGPT para generar el ensayo completo y lo entrega sin cambios.
> Obtiene buena nota. ¿Es esto ético?

**Preguntas para reflexión:**
- ¿Aprendió María algo sobre ética empresarial?
- ¿Qué dice la política de su universidad sobre uso de IA?
- ¿Cómo podría haber usado IA de manera ética?

---

### Caso 2: El Médico y el Diagnóstico

> Un médico usa IA para ayudar a diagnosticar a un paciente.
> La IA sugiere una enfermedad rara. El médico confía y prescribe tratamiento.
> El diagnóstico era incorrecto.

**Preguntas para reflexión:**
- ¿Debió el médico verificar con otras fuentes?
- ¿Cuál es el rol apropiado de IA en medicina?
- ¿Quién es responsable del error?

---

### Caso 3: El Programador y el Código

> Carlos usa Copilot para escribir código de seguridad.
> El código generado tiene una vulnerabilidad sutil.
> Un atacante explota la vulnerabilidad meses después.

**Preguntas para reflexión:**
- ¿Debió Carlos revisar el código más cuidadosamente?
- ¿Cuánta confianza debemos tener en código generado por IA?
- ¿Cómo se deben usar herramientas de IA para código crítico?

---

## Resumen

```
┌─────────────────────────────────────────────────────────────────┐
│                    PUNTOS CLAVE                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LIMITACIONES TÉCNICAS:                                         │
│  1. Puede inventar información (alucinaciones)                  │
│  2. No tiene información actualizada                            │
│  3. Tiene sesgos del entrenamiento                              │
│  4. No "entiende" realmente, predice patrones                   │
│                                                                  │
│  PRINCIPIOS ÉTICOS:                                             │
│  1. Verificar información importante                            │
│  2. Proteger datos sensibles                                    │
│  3. Declarar uso de IA cuando corresponda                       │
│  4. Usar como herramienta, no como reemplazo                    │
│                                                                  │
│  REGLA DE ORO:                                                  │
│  La IA amplifica tu capacidad, no reemplaza tu responsabilidad │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fin del Tier 0

¡Has completado los fundamentos de IA Generativa! Ahora estás listo para el Tier 1 especializado en tu área.

→ Continúa con el curso especializado de tu dominio

---

*Módulo 04 - Ética y Limitaciones*
*Tier 0 - Fundamentos Comunes*
