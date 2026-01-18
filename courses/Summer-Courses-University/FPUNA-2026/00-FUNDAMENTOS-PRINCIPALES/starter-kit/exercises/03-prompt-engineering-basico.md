# Ejercicio 3: Prompt Engineering Básico

## Objetivo
Aprender a escribir prompts efectivos que obtienen mejores respuestas.

## Duración
45-60 minutos

## Materiales Necesarios
- Acceso a Claude u otro modelo de lenguaje
- Este documento
- Algo para tomar notas

---

## Concepto Clave

Un "prompt" es la instrucción que le das a la IA.
Mejor prompt = Mejor respuesta.

---

## Parte 1: El Problema del Prompt Vago (10 minutos)

### Instrucciones
Envía este prompt a la IA:

```
Escribí sobre economía
```

### Observa el resultado
- ¿Sobre qué país habló?
- ¿Qué aspecto de la economía?
- ¿Para qué nivel de lector?
- ¿Es útil para ti?

### El problema
Sin contexto, la IA tiene que adivinar TODO.

---

## Parte 2: Los 5 Elementos de un Buen Prompt (20 minutos)

### El Framework CERO (Contexto, Específico, Rol, Output)

Ahora usa este formato mejorado:

```
CONTEXTO: Soy estudiante de Economía en la UNA, cursando el 3er año.

TAREA ESPECÍFICA: Necesito entender la inflación en Paraguay
durante los últimos 5 años.

ROL: Explícamelo como un profesor de macroeconomía que
quiere que entienda bien para un examen.

OUTPUT DESEADO:
- Resumen de 200 palabras máximo
- 3 factores principales que causaron inflación
- 1 gráfico conceptual en texto (ASCII)
- Vocabulario que debería saber para el examen
```

### Compara las respuestas

| Aspecto | Prompt vago | Prompt CERO |
|---------|-------------|-------------|
| Relevancia | | |
| Utilidad práctica | | |
| Nivel adecuado | | |
| Formato útil | | |

---

## Parte 3: Practica con Tu Carrera (15 minutos)

### Instrucciones
Ahora crea TU propio prompt usando el framework CERO.

Tema: Algo que necesites entender de tu carrera actual.

```
CONTEXTO: [Tu situación - carrera, año, universidad]

TAREA ESPECÍFICA: [Qué necesitas exactamente]

ROL: [Cómo quieres que la IA te hable]

OUTPUT DESEADO:
- [Formato 1]
- [Formato 2]
- [Largo aproximado]
```

### Envíalo y evalúa

| Criterio | 1-5 |
|----------|-----|
| ¿Entendió lo que necesitaba? | |
| ¿El formato fue el que pedí? | |
| ¿El nivel fue apropiado? | |
| ¿Puedo usarlo directamente? | |

---

## Parte 4: Técnicas Avanzadas (15 minutos)

### Técnica 1: Cadena de Pensamiento
Cuando necesites que la IA razone, pídele que muestre su proceso:

```
Necesito resolver este problema de matemática financiera:
[tu problema]

Por favor:
1. Explica qué tipo de problema es
2. Muestra la fórmula que usarás
3. Resuelve paso a paso mostrando cada cálculo
4. Verifica el resultado
```

### Técnica 2: Ejemplos (Few-shot)
Dale ejemplos de lo que quieres:

```
Quiero que me ayudes a escribir objetivos SMART.

Ejemplo de objetivo mal escrito:
"Quiero mejorar mis notas"

Ejemplo de objetivo SMART:
"Aumentar mi promedio de 3.5 a 4.0 al final del semestre
estudiando 2 horas diarias de lunes a viernes"

Ahora ayúdame a convertir este objetivo vago en SMART:
"Quiero aprender inglés"
```

### Técnica 3: Restricciones Claras
```
Explica el concepto de [tema] con estas restricciones:
- Máximo 100 palabras
- Sin jerga técnica
- Un ejemplo de la vida cotidiana en Paraguay
- Como si hablaras con un estudiante de secundaria
```

---

## Parte 5: Tu Template Personal (10 minutos)

### Instrucciones
Basándote en lo aprendido, crea TU template de prompt
que usarás frecuentemente:

```
[Tu template personalizado aquí]

CONTEXTO: ________________________________

TAREA: ________________________________

FORMATO DESEADO:
- ________________________________
- ________________________________

RESTRICCIONES:
- ________________________________
- ________________________________
```

---

## Errores Comunes a Evitar

Marca los que has cometido antes:

- [ ] Prompt de una sola línea sin contexto
- [ ] No especificar el formato de respuesta
- [ ] Asumir que la IA sabe tu situación
- [ ] Pedir cosas imposibles (información en tiempo real)
- [ ] No revisar/iterar el prompt si la respuesta no es buena

---

## Entregable

### Tu Colección de Prompts

Crea 3 prompts útiles para tu carrera usando lo aprendido:

**Prompt 1: Para estudiar**
```
[Escribe aquí]
```

**Prompt 2: Para hacer trabajos**
```
[Escribe aquí]
```

**Prompt 3: Para resolver problemas**
```
[Escribe aquí]
```

---

## Criterios de Éxito

- [ ] Comparaste prompts vagos vs específicos
- [ ] Usaste el framework CERO al menos una vez
- [ ] Probaste al menos 2 técnicas avanzadas
- [ ] Creaste tu template personal
- [ ] Guardaste 3 prompts útiles para tu carrera

---

## Siguiente Paso

Después de dominar esto, practica con los prompts del archivo
`20-IDEAS.md` de tu carrera específica.

---

*Ejercicio 3 - Fundamentos de IA - FPUNA 2026*
