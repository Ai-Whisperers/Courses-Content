# Errores Comunes con IA - Fundamentos

## Guía para Evitar los Errores Más Frecuentes

Este documento recopila los errores más comunes que cometen los estudiantes al usar IA generativa, con ejemplos específicos y cómo evitarlos.

---

## Error #1: Confiar sin Verificar

### El Problema
Aceptar la respuesta de la IA como verdad absoluta sin verificar con fuentes confiables.

### Ejemplo Real
```
Estudiante: "¿Cuál es la población de Paraguay?"
IA: "Paraguay tiene aproximadamente 7.5 millones de habitantes (2023)"
Estudiante: *Usa este dato en su trabajo*

Problema: El dato real (DGEEC 2023) es 6.8 millones
```

### Por Qué Ocurre
- La IA genera texto probabilísticamente, no consulta bases de datos en tiempo real
- Los datos de entrenamiento pueden estar desactualizados
- La IA prefiere dar una respuesta a decir "no sé"

### Cómo Evitarlo
1. **Siempre verificar datos numéricos** con fuentes oficiales
2. **Preguntar las fuentes**: "¿De dónde obtienes este dato?"
3. **Usar la IA para buscar**, no como fuente final
4. **Marcar datos para verificar** antes de usarlos

---

## Error #2: Prompts Vagos o Genéricos

### El Problema
Hacer preguntas demasiado amplias que generan respuestas genéricas e inútiles.

### Ejemplo Real
```
❌ Prompt vago:
"Dame información sobre marketing"

✅ Prompt específico:
"Soy estudiante de Marketing en la UNA. Necesito 5 estrategias de
marketing digital de bajo presupuesto (menos de ₲500,000/mes) para
una cafetería nueva en Fernando de la Mora. El público objetivo son
jóvenes universitarios de 18-25 años."
```

### Por Qué Ocurre
- No pensar qué necesitamos realmente antes de preguntar
- Esperar que la IA "adivine" nuestras necesidades
- No entender que más contexto = mejor respuesta

### Cómo Evitarlo
Usar el marco CERO:
- **C**ontexto: ¿Quién soy? ¿Para qué es esto?
- **E**specífico: ¿Qué exactamente necesito?
- **R**ol: ¿Cómo quiero que actúe la IA?
- **O**utput: ¿En qué formato lo quiero?

---

## Error #3: Copiar y Pegar Sin Adaptar

### El Problema
Usar el texto generado tal cual sin adaptarlo al contexto real.

### Ejemplo Real
```
La IA genera: "En el contexto latinoamericano, es común observar..."

Problema: El estudiante está escribiendo sobre Paraguay específicamente,
pero usa frases genéricas de "Latinoamérica"
```

### Por Qué Ocurre
- Pereza para editar y personalizar
- No reconocer que la IA genera contenido genérico
- Presión de tiempo

### Cómo Evitarlo
1. **Leer todo** antes de usar cualquier parte
2. **Reemplazar generalidades** con datos locales específicos
3. **Agregar tu perspectiva** y ejemplos propios
4. **Verificar que suena como tú** escribirías

---

## Error #4: No Iterar en los Prompts

### El Problema
Aceptar la primera respuesta sin refinar o pedir mejoras.

### Ejemplo Real
```
Estudiante: "Explícame la teoría de juegos"
IA: *Da explicación muy técnica*
Estudiante: *Se frustra y abandona*

Lo que debió hacer:
"Esa explicación es muy técnica. Explícamelo como si tuviera 15 años,
usando ejemplos de videojuegos o deportes"
```

### Por Qué Ocurre
- No saber que se puede pedir ajustes
- Pensar que la primera respuesta es "la respuesta"
- No entender que la IA aprende del contexto de la conversación

### Cómo Evitarlo
Usar comandos de refinamiento:
- "Simplifica esto"
- "Dame un ejemplo concreto"
- "Hazlo más corto/largo"
- "Usa lenguaje más técnico/simple"
- "Enfócate solo en [aspecto específico]"

---

## Error #5: Ignorar las Limitaciones de la IA

### El Problema
Pedir cosas que la IA no puede hacer bien o no debería hacer.

### Ejemplo Real
```
❌ "Dame los resultados de las elecciones de ayer"
   → La IA no tiene acceso a información en tiempo real

❌ "Calcula exactamente cuánto debo de impuestos"
   → La IA puede cometer errores en cálculos complejos

❌ "Diagnostica mi enfermedad con estos síntomas"
   → La IA no es profesional médico
```

### Por Qué Ocurre
- No entender cómo funciona la IA
- Sobreestimar las capacidades de la IA
- No conocer las limitaciones técnicas

### Cómo Evitarlo
La IA NO es buena para:
- ❌ Información en tiempo real
- ❌ Cálculos matemáticos complejos
- ❌ Consejos médicos, legales o financieros específicos
- ❌ Datos muy recientes (después de su fecha de corte)
- ❌ Información local muy específica

La IA SÍ es buena para:
- ✅ Explicar conceptos
- ✅ Estructurar ideas
- ✅ Generar borradores
- ✅ Revisar gramática y estilo
- ✅ Brainstorming y creatividad

---

## Error #6: No Verificar Citas y Referencias

### El Problema
Usar citas bibliográficas generadas por IA sin verificar que existen.

### Ejemplo Real
```
IA genera: "Según González y Martínez (2021) en su estudio publicado
en la Revista de Psicología Paraguaya..."

Problema: Este paper NO EXISTE. La IA lo inventó.
Esto es PLAGIO y puede causar reprobación o expulsión.
```

### Por Qué Ocurre
- La IA "alucina" referencias que suenan plausibles
- Mezcla autores, años y títulos de papers reales
- Genera DOIs y URLs que no funcionan

### Cómo Evitarlo
1. **NUNCA** usar una cita sin verificarla en Google Scholar
2. **Buscar el título exacto** del paper
3. **Verificar que el autor** publicó ese paper ese año
4. **Probar los DOIs** antes de entregar

---

## Error #7: Compartir Información Sensible

### El Problema
Pegar datos personales, de trabajo o confidenciales en los prompts.

### Ejemplo Real
```
❌ "Aquí está el balance de la empresa [con datos reales]"
❌ "Revisa este contrato de mi cliente [nombre real]"
❌ "Mi número de cédula es X y necesito..."
```

### Por Qué Ocurre
- No pensar que los datos pueden ser almacenados
- Olvidar que la IA no es un espacio privado
- Comodidad sobre seguridad

### Cómo Evitarlo
1. **Anonimizar** siempre (Empresa X, Cliente A)
2. **Usar datos ficticios** que ilustren el problema
3. **Nunca incluir**: cédulas, contraseñas, datos financieros reales
4. **Preguntar**: "¿Compartiría esto en público?"

---

## Error #8: Esperar Creatividad Original

### El Problema
Creer que la IA genera ideas verdaderamente originales o creativas.

### Ejemplo Real
```
Estudiante: "Dame una idea de startup que nadie haya pensado"
IA: *Da idea que parece original*
Problema: Es probablemente una combinación de ideas existentes,
o alguien ya lo está haciendo
```

### Por Qué Ocurre
- La IA combina patrones de su entrenamiento
- No puede crear algo verdaderamente nuevo
- Confundir "nuevo para mí" con "nuevo en el mundo"

### Cómo Evitarlo
Usar la IA para:
- ✅ **Ampliar** tus propias ideas
- ✅ **Combinar** conceptos de formas diferentes
- ✅ **Explorar** variaciones de una idea base
- ✅ **Encontrar** huecos en ideas existentes

NO para:
- ❌ Reemplazar tu creatividad propia
- ❌ Generar ideas "originales" desde cero

---

## Error #9: Usar la IA para Tareas Triviales

### El Problema
Usar IA para cosas que harías más rápido tú mismo.

### Ejemplo Real
```
Estudiante: "Convierte 100 dólares a guaraníes"
Tiempo: 30 segundos escribiendo + 10 segundos leyendo respuesta

Alternativa: Google "100 usd to pyg" = 3 segundos
```

### Por Qué Ocurre
- "Ya que tengo la IA abierta..."
- No pensar en eficiencia
- Convertir la IA en muleta para todo

### Cómo Evitarlo
Preguntarse:
1. ¿Esto es más rápido con Google/calculadora?
2. ¿Estoy aprendiendo algo o solo delegando?
3. ¿Realmente necesito IA para esto?

---

## Error #10: No Mantener el Contexto en Conversaciones Largas

### El Problema
Perder contexto en conversaciones largas o empezar de cero cada vez.

### Ejemplo Real
```
Mensaje 1: "Ayúdame con mi tesis sobre X"
*La IA entiende el contexto*

Mensaje 15: "Ahora ayúdame con la metodología"
*La IA olvidó detalles importantes del inicio*
```

### Por Qué Ocurre
- La IA tiene memoria limitada en contexto
- Conversaciones muy largas pierden información inicial
- No resumir o recordar puntos clave

### Cómo Evitarlo
1. **Resumir periódicamente**: "Para recordar: mi tesis es sobre X, usando metodología Y"
2. **Usar un documento base** que pegas al inicio de cada sesión
3. **Guardar prompts efectivos** para reutilizar
4. **Dividir tareas grandes** en conversaciones separadas

---

## Checklist Anti-Errores

Antes de usar una respuesta de IA, verificar:

### Precisión
- [ ] ¿Verifiqué los datos numéricos?
- [ ] ¿Las citas existen realmente?
- [ ] ¿La información está actualizada?

### Relevancia
- [ ] ¿Aplica a Paraguay/mi contexto?
- [ ] ¿Responde lo que pregunté?
- [ ] ¿Es el nivel técnico apropiado?

### Ética
- [ ] ¿Lo presentaré como ayuda de IA?
- [ ] ¿No compartí datos sensibles?
- [ ] ¿Agregué mi propia perspectiva?

### Calidad
- [ ] ¿Suena como yo escribiría?
- [ ] ¿Refiné con iteraciones?
- [ ] ¿Es útil, no solo correcto?

---

## Recursos Adicionales

### Para verificar información
- [BCP - Banco Central](https://www.bcp.gov.py) - Datos económicos
- [DGEEC](https://www.ine.gov.py) - Estadísticas poblacionales
- [Google Scholar](https://scholar.google.com) - Papers académicos

### Para reportar errores de IA
- Documentar el error
- Buscar la información correcta
- Compartir con compañeros para que aprendan

---

*Guía de errores comunes - Fundamentos IA - FPUNA 2026*
