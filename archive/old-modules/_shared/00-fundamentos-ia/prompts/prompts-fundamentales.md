# Biblioteca de Prompts Fundamentales
## Tier 0 - Fundamentos de IA Generativa

---

## Prompts de Aprendizaje

### Explicar un Concepto

```
Actúa como profesor experto en [ÁREA].

Explica [CONCEPTO] para un estudiante de [NIVEL/CARRERA].

Requisitos:
- Lenguaje accesible sin jerga innecesaria
- Incluir 1-2 analogías cotidianas
- Máximo [X] palabras/párrafos

Formato: [párrafos/lista/tabla]
```

### Comparar Conceptos

```
Compara [CONCEPTO A] vs [CONCEPTO B].

Contexto: Soy estudiante de [CARRERA] en Paraguay.

Incluir:
- Definición breve de cada uno
- 5 diferencias clave
- Cuándo usar cada uno
- Ejemplo práctico de cada uno

Formato: Tabla comparativa + párrafo de recomendación
```

### Resumir Material de Estudio

```
Resume el siguiente texto para estudio:

"""
[PEGAR TEXTO]
"""

Generar:
1. Resumen en 3-5 puntos clave
2. Definiciones importantes
3. 3 preguntas de autoevaluación
4. Conexión con [TEMA RELACIONADO]
```

---

## Prompts de Configuración de Herramientas

### Primer Test de IA

```
Estoy probando esta herramienta por primera vez.

Por favor:
1. Confirma que puedes recibir mis mensajes
2. Dime tu nombre y versión (si la conoces)
3. Dame 3 ejemplos de cosas que puedes hacer bien
4. Dame 2 ejemplos de cosas donde debo tener cuidado

Responde en español de Latinoamérica.
```

### Verificar Capacidades

```
Necesito verificar tus capacidades para mi trabajo.

¿Puedes hacer lo siguiente? Responde Sí, No, o Parcialmente para cada uno:

1. Analizar documentos PDF
2. Escribir código en [LENGUAJE]
3. Traducir entre español e inglés
4. Generar imágenes
5. Acceder a información de internet actualizada
6. Recordar conversaciones anteriores

Para cada "Parcialmente", explica la limitación.
```

---

## Prompts de Prompting Efectivo

### Mejorar un Prompt Vago

```
Tengo este prompt básico:
"[PROMPT ORIGINAL]"

Ayúdame a mejorarlo siguiendo el framework CREA:
- C: Contexto relevante
- R: Rol para la IA
- E: Especificaciones claras
- A: Acción concreta

Dame el prompt mejorado y explica cada mejora.
```

### Crear Prompt para Tarea Específica

```
Necesito un prompt para la siguiente tarea:

TAREA: [Describir la tarea]
AUDIENCIA: [Quién usará el resultado]
FORMATO DESEADO: [Cómo quiero la salida]
RESTRICCIONES: [Límites o requisitos especiales]

Genera un prompt completo que pueda copiar y usar.
Incluye placeholders [ENTRE CORCHETES] donde deba personalizar.
```

---

## Prompts de Verificación

### Verificar Información

```
Me diste esta información:
"[INFORMACIÓN A VERIFICAR]"

Por favor:
1. ¿Qué tan seguro estás de esta información? (Alto/Medio/Bajo)
2. ¿De qué fuentes podría provenir?
3. ¿Hay algo que debería verificar externamente?
4. Si no estás seguro de algo, dímelo claramente.
```

### Detectar Posibles Errores

```
Revisa el siguiente contenido generado:

"""
[CONTENIDO]
"""

Identifica:
1. Afirmaciones que podrían ser incorrectas
2. Datos que debería verificar
3. Generalizaciones problemáticas
4. Información que podría estar desactualizada

Sé crítico y honesto sobre posibles errores.
```

---

## Prompts de Ética

### Evaluar Uso Ético

```
Quiero usar IA para [DESCRIBIR USO].

Ayúdame a evaluar si es ético:

1. ¿Hay riesgos de privacidad?
2. ¿Podría considerarse plagio o deshonesto?
3. ¿Debería declarar el uso de IA?
4. ¿Qué precauciones debo tomar?
5. ¿Hay una alternativa más ética?

Dame recomendaciones específicas.
```

### Anonimizar Datos

```
Necesito anonimizar estos datos antes de analizarlos:

"""
[DATOS EJEMPLO]
"""

Sugiere cómo reemplazar:
- Nombres de personas
- Emails y teléfonos
- Ubicaciones específicas
- Cualquier dato identificable

Dame ejemplos de reemplazos apropiados.
```

---

## Prompts de Resolución de Problemas

### Analizar Problema Paso a Paso

```
Tengo este problema:
[DESCRIBIR PROBLEMA]

Ayúdame a resolverlo paso a paso:

1. Primero, identifica qué información tenemos
2. Luego, determina qué necesitamos encontrar
3. Propón un método de solución
4. Ejecuta el método mostrando cada paso
5. Verifica la respuesta
6. Explica el resultado en contexto

Muestra tu razonamiento completo.
```

### Lluvia de Ideas

```
Necesito ideas para [OBJETIVO].

Contexto:
- [Información relevante 1]
- [Información relevante 2]
- [Restricciones]

Genera:
1. 10 ideas iniciales (cantidad sobre calidad)
2. Las 3 mejores ideas con justificación
3. Pasos iniciales para la idea top

Sé creativo pero realista para el contexto de Paraguay.
```

---

## Prompts por Área de Estudio

### Desarrollo de Software

```
Actúa como desarrollador senior en [LENGUAJE/TECNOLOGÍA].

[DESCRIPCIÓN DE LA TAREA]

Requisitos:
- Código limpio y comentado
- Manejo de errores
- Seguir mejores prácticas

Explica las decisiones de diseño importantes.
```

### Ingeniería/Técnico

```
Actúa como ingeniero especialista en [ÁREA].

[PROBLEMA TÉCNICO]

Proporciona:
- Análisis del problema
- Posibles soluciones con pros/contras
- Cálculos necesarios (si aplica)
- Recomendación final

Nivel técnico: [principiante/intermedio/avanzado]
```

### Negocios/Administración

```
Actúa como consultor de [ÁREA: marketing/finanzas/RRHH/etc].

Contexto empresarial:
[DESCRIBIR SITUACIÓN]

Necesito:
- Análisis de la situación
- Opciones estratégicas
- Recomendación con justificación
- Métricas para medir éxito

Enfocado en contexto PyME paraguaya.
```

### Salud (uso educativo)

```
Actúa como educador en ciencias de la salud.

Tema: [CONCEPTO MÉDICO/CLÍNICO]

Para fines de ESTUDIO (no diagnóstico), explica:
- Definición y fisiopatología básica
- Signos y síntomas principales
- Abordaje general
- Puntos clave para examen

IMPORTANTE: Esto es solo para aprendizaje académico.
```

---

## Plantilla de Prompt Universal

```
# PROMPT PARA: [Nombre de la tarea]

## CONTEXTO
[Situación o antecedentes relevantes]
[Tu nivel de conocimiento: principiante/intermedio/avanzado]

## ROL
Actúa como [tipo de experto] con experiencia en [área específica].

## TAREA
[Qué necesitas que haga, en términos claros]

## ESPECIFICACIONES
- Longitud: [corto/medio/largo o # palabras]
- Formato: [párrafos/lista/tabla/código/otro]
- Tono: [formal/casual/técnico/accesible]
- Incluir: [elementos obligatorios]
- Evitar: [elementos a excluir]

## CONTEXTO ADICIONAL (si aplica)
- Audiencia: [quién leerá esto]
- Uso: [para qué se usará]
- Restricciones: [limitaciones especiales]

## EJEMPLO DE SALIDA DESEADA (opcional)
[Mostrar cómo quieres que se vea el resultado]
```

---

## Consejos de Uso

1. **Copia y adapta**: Usa estos prompts como base, personaliza lo que está [ENTRE CORCHETES]

2. **Itera**: Si la primera respuesta no es perfecta, pide ajustes específicos

3. **Combina técnicas**: Agrega "piensa paso a paso" para problemas complejos

4. **Especifica contexto local**: Menciona Paraguay/Latinoamérica cuando sea relevante

5. **Verifica siempre**: Ningún prompt garantiza respuestas 100% correctas

---

*Biblioteca de Prompts Fundamentales*
*Tier 0 - Fundamentos de IA Generativa*
