# Biblioteca de Prompts: Debugging con IA

Esta biblioteca contiene prompts optimizados para diagnosticar y resolver errores con asistencia de IA.

---

## 1. Análisis de Errores

### 1.1 Error Genérico

```
Tengo este error en mi código [lenguaje]:

## Código
```[lenguaje]
[código relevante]
```

## Error
```
[mensaje de error / stack trace completo]
```

## Contexto
- Versión: [versión del lenguaje/framework]
- Sistema operativo: [OS]
- Cuándo ocurre: [descripción]

Explica:
1. Qué significa el error
2. Por qué ocurre
3. Cómo solucionarlo
4. Cómo prevenir errores similares
```

### 1.2 Error con Comportamiento Esperado

```
Mi código no funciona como espero.

## Código
```[lenguaje]
[código]
```

## Comportamiento esperado
[qué debería hacer]

## Comportamiento actual
[qué hace realmente]

## Datos de prueba
Input: [input usado]
Output esperado: [resultado correcto]
Output actual: [resultado incorrecto]

Identifica el bug y proporciona la corrección.
```

---

## 2. Stack Traces

### 2.1 Stack Trace de Python

```
Explica este stack trace de Python y sugiere la solución:

```
[stack trace completo]
```

Código relacionado:
```python
[código de los archivos mencionados en el trace]
```

Proporciona:
1. Explicación línea por línea del trace
2. La causa raíz del error
3. Código corregido
4. Cómo prevenir este tipo de error
```

### 2.2 Stack Trace de JavaScript/Node

```
Ayúdame a entender este error de JavaScript:

```
[stack trace]
```

Código:
```javascript
[código]
```

Especifica:
1. Dónde exactamente ocurre el error
2. Qué valor es undefined/null
3. Por qué ese valor es undefined/null
4. Cómo corregirlo
```

### 2.3 Error de React

```
Este componente React lanza un error:

Error:
```
[mensaje de error]
```

Componente:
```jsx
[código del componente]
```

Contexto:
- Props recibidas: [descripción]
- Estado: [descripción]
- Hooks usados: [lista]

Identifica si es:
- Violación de reglas de hooks
- Problema de renderizado
- Error de props/estado
- Error de efectos secundarios

Y proporciona la solución.
```

---

## 3. Errores de Lógica

### 3.1 Bug de Lógica General

```
Este código tiene un bug de lógica que no puedo encontrar:

```[lenguaje]
[código]
```

Tests que fallan:
- Input: [input1] → Esperado: [expected1], Actual: [actual1]
- Input: [input2] → Esperado: [expected2], Actual: [actual2]

Tests que pasan:
- Input: [input3] → Esperado: [expected3], Actual: [expected3] ✓

Analiza el código paso a paso para encontrar el error.
```

### 3.2 Off-by-One Error

```
Sospecho que este código tiene un error off-by-one:

```[lenguaje]
[código con loops/índices]
```

Comportamiento observado:
[descripción del problema]

Analiza:
1. Los límites de los loops
2. Los índices de acceso a arrays
3. Las comparaciones (< vs <=, > vs >=)

Proporciona la corrección si hay error.
```

### 3.3 Error de Condiciones

```
Las condiciones de este código no funcionan correctamente:

```[lenguaje]
[código con if/else, switch, etc.]
```

Casos problemáticos:
[descripción de cuándo falla]

Revisa:
1. Orden de las condiciones
2. Operadores lógicos (AND, OR)
3. Casos edge no cubiertos
4. Condiciones mutuamente excluyentes
```

---

## 4. Errores de Runtime

### 4.1 NullPointerException / TypeError

```
Este código lanza [NullPointerException/TypeError]:

```[lenguaje]
[código]
```

Error:
```
[mensaje de error]
```

Datos de entrada que causan el error:
[descripción de los datos]

Identifica:
1. Qué variable es null/undefined
2. Por qué es null/undefined
3. Dónde debería validarse
4. Cómo manejarlo apropiadamente
```

### 4.2 Error de Concurrencia

```
Este código tiene problemas de concurrencia:

```[lenguaje]
[código con threads/async]
```

Síntomas:
- [síntoma 1: resultados inconsistentes, deadlock, etc.]
- [síntoma 2]

Analiza:
1. Posibles race conditions
2. Acceso a recursos compartidos
3. Orden de operaciones
4. Necesidad de sincronización

Proporciona código corregido con las medidas de sincronización apropiadas.
```

### 4.3 Memory Leak

```
Sospecho que este código tiene un memory leak:

```[lenguaje]
[código]
```

Síntomas observados:
- [uso creciente de memoria, lentitud, etc.]

Contexto:
- Frecuencia de ejecución: [cada cuánto se ejecuta]
- Volumen de datos: [tamaño de datos procesados]

Identifica:
1. Recursos no liberados
2. Referencias circulares
3. Event listeners no removidos
4. Caches sin límite

Sugiere correcciones.
```

---

## 5. Debugging Guiado

### 5.1 Rubber Duck Debugging

```
Voy a explicarte mi código paso a paso. Interrumpe si ves algo sospechoso.

Propósito del código: [descripción de qué debería hacer]

Línea 1-X: [explicación de qué hace esta sección]
```[lenguaje]
[código sección 1]
```

Línea Y-Z: [explicación]
```[lenguaje]
[código sección 2]
```

[continuar con cada sección]

El problema es: [descripción del bug]

¿Ves algo incorrecto en mi lógica?
```

### 5.2 Análisis de Flujo

```
Analiza el flujo de ejecución de este código:

```[lenguaje]
[código]
```

Input de ejemplo: [input]

Traza la ejecución mostrando:
1. El valor de cada variable en cada paso
2. Qué condiciones se evalúan y su resultado
3. El flujo a través de loops
4. El output final

Identifica dónde el flujo difiere de lo esperado.
```

---

## 6. Errores Específicos

### 6.1 SQL/Base de Datos

```
Esta query SQL no retorna los resultados esperados:

Query:
```sql
[query]
```

Esquema de tablas:
```sql
[CREATE TABLE statements]
```

Datos de ejemplo:
```sql
[INSERT statements con datos de prueba]
```

Esperado: [resultado esperado]
Actual: [resultado actual]

Identifica el error y corrige la query.
```

### 6.2 API/HTTP

```
Esta llamada a API falla:

Código:
```[lenguaje]
[código que hace la llamada]
```

Request:
- URL: [url]
- Method: [GET/POST/etc]
- Headers: [headers]
- Body: [body si aplica]

Response:
- Status: [código HTTP]
- Body: [response body]

Error/Problema:
[descripción]

Identifica si el problema es:
- En la construcción del request
- En el manejo de la response
- En la autenticación
- En la serialización de datos
```

### 6.3 Regex

```
Esta expresión regular no coincide como espero:

Regex: [patrón]
Flags: [flags usadas]

Debería coincidir:
- "[texto1]" ✓
- "[texto2]" ✓

No debería coincidir:
- "[texto3]" ✗

Problema actual:
[descripción de qué coincide mal]

Corrige la expresión y explica cada parte.
```

---

## 7. Debugging de Performance

### 7.1 Código Lento

```
Este código es muy lento:

```[lenguaje]
[código]
```

Contexto:
- Tamaño de datos: [n elementos]
- Tiempo actual: [X segundos]
- Tiempo esperado: [Y segundos]

Analiza:
1. Complejidad algorítmica actual
2. Operaciones redundantes
3. Posibles optimizaciones
4. Estructuras de datos más eficientes

Proporciona versión optimizada.
```

### 7.2 Análisis de Complejidad

```
Analiza la complejidad de este algoritmo:

```[lenguaje]
[código]
```

Proporciona:
1. Complejidad temporal (Big O)
2. Complejidad espacial
3. Mejor/peor/caso promedio si difieren
4. Sugerencias de optimización si es posible mejorar
```

---

## 8. Plantillas de Reporte

### 8.1 Reporte de Bug Completo

```
# Bug Report

## Resumen
[descripción breve]

## Pasos para reproducir
1. [paso 1]
2. [paso 2]
3. [paso 3]

## Comportamiento esperado
[qué debería pasar]

## Comportamiento actual
[qué pasa realmente]

## Código afectado
```[lenguaje]
[código]
```

## Stack trace
```
[trace si aplica]
```

## Entorno
- OS: [sistema operativo]
- Versión: [versión del lenguaje/framework]
- Dependencias relevantes: [lista]

## Análisis inicial
[tus observaciones]

---

Ayúdame a diagnosticar y resolver este bug.
```

---

## Consejos de Uso

1. **Incluye el stack trace completo** - No lo resumas
2. **Muestra código relevante** - No todo el archivo
3. **Describe el contexto** - Cuándo ocurre, con qué datos
4. **Indica qué ya intentaste** - Ahorra tiempo
5. **Sé específico** - "No funciona" no es suficiente

---

## Anti-patrones a Evitar

❌ "Mi código no funciona, arréglalo" (sin detalles)
❌ Pegar cientos de líneas de código
❌ Omitir el mensaje de error
❌ No mencionar el lenguaje/versión
❌ Asumir que la IA conoce tu proyecto

---

*Biblioteca de Prompts - Curso IA para Desarrollo de Software*
