# Biblioteca de Prompts: Generación de Código

Esta biblioteca contiene prompts probados y optimizados para generar código de alta calidad con IA.

---

## 1. Generación de Funciones

### 1.1 Función Básica

```
Escribe una función en [lenguaje] que [descripción].

Requisitos:
- Nombre: [nombre_funcion]
- Parámetros: [lista de parámetros con tipos]
- Retorno: [tipo de retorno]
- Manejo de errores: [especificar]

Ejemplo de uso:
[input] -> [output esperado]
```

**Ejemplo concreto:**
```
Escribe una función en Python que calcule el factorial de un número.

Requisitos:
- Nombre: factorial
- Parámetros: n (int)
- Retorno: int
- Manejo de errores: ValueError si n es negativo

Ejemplo de uso:
factorial(5) -> 120
factorial(0) -> 1
```

### 1.2 Función con Validación

```
Crea una función [nombre] en [lenguaje] que:

Propósito: [descripción detallada]

Parámetros:
- [param1]: [tipo] - [descripción] - [restricciones]
- [param2]: [tipo] - [descripción] - [restricciones]

Validaciones requeridas:
- [validación 1]
- [validación 2]

Retorna: [descripción del retorno]

Errores a manejar:
- [caso de error 1]: [excepción/mensaje]
- [caso de error 2]: [excepción/mensaje]
```

---

## 2. Generación de Clases

### 2.1 Clase Básica

```
Diseña una clase [NombreClase] en [lenguaje] que represente [concepto].

Atributos:
- [atributo1]: [tipo] - [descripción]
- [atributo2]: [tipo] - [descripción]

Métodos:
- [metodo1]: [descripción]
- [metodo2]: [descripción]

Incluye:
- [ ] Constructor
- [ ] Validación de datos
- [ ] Métodos getter/setter (si aplica)
- [ ] Representación string
```

### 2.2 Clase con Patrón de Diseño

```
Implementa la clase [NombreClase] usando el patrón [Singleton/Factory/Observer/etc.].

Contexto: [descripción del problema]

Requisitos del patrón:
- [requisito específico del patrón]

Funcionalidad principal:
- [funcionalidad 1]
- [funcionalidad 2]

Incluye ejemplo de uso.
```

---

## 3. APIs y Endpoints

### 3.1 Endpoint REST

```
Crea un endpoint [METHOD] /api/[recurso] en [framework].

Funcionalidad: [descripción]

Request:
- Headers: [headers requeridos]
- Query params: [parámetros de consulta]
- Body: [estructura del body si aplica]

Response:
- 200: [estructura de respuesta exitosa]
- 400: [estructura de error de validación]
- 500: [estructura de error del servidor]

Incluye:
- Validación de entrada
- Manejo de errores
- Documentación con docstrings
```

### 3.2 API CRUD Completa

```
Genera los endpoints CRUD para el recurso [Recurso] en [framework].

Modelo:
```json
{
  "campo1": "tipo",
  "campo2": "tipo"
}
```

Endpoints requeridos:
- GET /[recursos] - listar con paginación
- GET /[recursos]/:id - obtener uno
- POST /[recursos] - crear
- PUT /[recursos]/:id - actualizar
- DELETE /[recursos]/:id - eliminar

Incluye:
- Validación con [librería si aplica]
- Manejo de errores estandarizado
- Responses siguiendo RFC 7807 (Problem Details)
```

---

## 4. Estructuras de Datos

### 4.1 Implementación de Estructura

```
Implementa una estructura de datos [nombre] en [lenguaje].

Operaciones requeridas:
- [operación1]: [complejidad esperada]
- [operación2]: [complejidad esperada]

Restricciones:
- [restricción de memoria/tiempo]

Incluye:
- Documentación de complejidad
- Tests para cada operación
```

### 4.2 Algoritmo Específico

```
Implementa el algoritmo [nombre del algoritmo] en [lenguaje].

Propósito: [descripción]

Entrada: [formato de entrada]
Salida: [formato de salida]

Complejidad esperada:
- Tiempo: O([complejidad])
- Espacio: O([complejidad])

Incluye comentarios explicando cada paso del algoritmo.
```

---

## 5. Refactorización

### 5.1 Mejorar Código Existente

```
Refactoriza este código para mejorar [legibilidad/rendimiento/mantenibilidad]:

```[lenguaje]
[código a refactorizar]
```

Mantén:
- La funcionalidad exacta
- Los nombres de funciones públicas
- La interfaz externa

Mejora:
- [aspecto específico a mejorar]
- [otro aspecto]

Explica los cambios realizados.
```

### 5.2 Aplicar Principios SOLID

```
Refactoriza este código aplicando los principios SOLID:

```[lenguaje]
[código]
```

Enfócate especialmente en:
- [S/O/L/I/D - principio específico]

Explica qué principio viola el código original y cómo lo corrige tu refactorización.
```

---

## 6. Conversión entre Lenguajes

### 6.1 Traducción Directa

```
Convierte este código de [lenguaje origen] a [lenguaje destino]:

```[lenguaje origen]
[código]
```

Requisitos:
- Usa convenciones idiomáticas de [lenguaje destino]
- Mantén la funcionalidad exacta
- Adapta el manejo de errores al estilo del lenguaje destino
- Usa los tipos de datos equivalentes más apropiados
```

### 6.2 Migración con Mejoras

```
Migra este código de [lenguaje/framework origen] a [lenguaje/framework destino]:

```[código]
```

Además de la conversión:
- Aplica mejores prácticas de [destino]
- Usa características modernas del lenguaje (versión [X])
- Optimiza donde sea posible sin cambiar la lógica
```

---

## 7. Testing

### 7.1 Tests Unitarios

```
Genera tests unitarios para esta función usando [framework de testing]:

```[lenguaje]
[código de la función]
```

Incluye tests para:
- Casos normales (happy path)
- Casos límite (edge cases)
- Manejo de errores
- [casos específicos adicionales]

Usa el patrón AAA (Arrange-Act-Assert).
```

### 7.2 Tests de Integración

```
Escribe tests de integración para [componente/endpoint] usando [framework].

Componente a testear:
```[código o descripción]
```

Escenarios a cubrir:
- [escenario 1]
- [escenario 2]
- [escenario de error]

Incluye setup y teardown apropiados.
```

---

## 8. Base de Datos

### 8.1 Esquema de Base de Datos

```
Diseña el esquema de base de datos para [descripción del sistema].

Entidades principales:
- [entidad1]: [descripción]
- [entidad2]: [descripción]

Relaciones:
- [entidad1] -> [entidad2]: [tipo de relación]

Genera:
- DDL para [PostgreSQL/MySQL/SQLite]
- Índices recomendados
- Constraints de integridad
```

### 8.2 Queries Optimizadas

```
Escribe una query SQL para [descripción del requerimiento].

Tablas disponibles:
```sql
[estructura de tablas]
```

Requisitos:
- [requisito de filtrado]
- [requisito de ordenamiento]
- [requisito de agregación]

La query debe ser eficiente para [volumen de datos esperado].
```

---

## 9. Scripts de Automatización

### 9.1 Script de CLI

```
Crea un script CLI en [lenguaje] que [descripción].

Comandos/Flags:
- [comando/flag 1]: [descripción]
- [comando/flag 2]: [descripción]

Ejemplo de uso:
```bash
[ejemplo de comando]
```

Incluye:
- Ayuda (--help)
- Validación de argumentos
- Mensajes de error claros
- Códigos de salida apropiados
```

### 9.2 Script de Automatización

```
Escribe un script en [lenguaje] para automatizar [tarea].

El script debe:
1. [paso 1]
2. [paso 2]
3. [paso 3]

Manejo de errores:
- [qué hacer si falla X]
- [logging requerido]

Debe poder ejecutarse:
- [ ] Manualmente
- [ ] Como cron job
- [ ] En CI/CD
```

---

## 10. Prompts Avanzados

### 10.1 Chain of Thought

```
Necesito implementar [funcionalidad compleja].

Antes de escribir código:
1. Analiza los requisitos
2. Identifica los componentes necesarios
3. Diseña la arquitectura
4. Lista los edge cases
5. Propón la implementación

Requisitos:
[lista de requisitos]

Restricciones:
[lista de restricciones]
```

### 10.2 Few-Shot con Ejemplos

```
Genera código siguiendo este patrón:

Ejemplo 1:
Input: [input ejemplo 1]
Output:
```[lenguaje]
[código ejemplo 1]
```

Ejemplo 2:
Input: [input ejemplo 2]
Output:
```[lenguaje]
[código ejemplo 2]
```

Ahora genera para:
Input: [mi input]
```

---

## Consejos de Uso

1. **Sé específico**: Mientras más detalles, mejor resultado
2. **Incluye ejemplos**: Los ejemplos de entrada/salida ayudan mucho
3. **Especifica restricciones**: Versiones, librerías permitidas, etc.
4. **Pide explicaciones**: Añade "Explica las decisiones de diseño"
5. **Itera**: Si el resultado no es perfecto, refina el prompt

---

## Template Universal

```
[TAREA]: [Qué necesitas que la IA haga]

[CONTEXTO]: [Información de fondo necesaria]

[ESPECIFICACIONES]:
- Lenguaje: [lenguaje de programación]
- Framework: [si aplica]
- Versión: [versión específica]

[REQUISITOS]:
- [Requisito 1]
- [Requisito 2]

[RESTRICCIONES]:
- [Restricción 1]
- [Restricción 2]

[EJEMPLOS]:
Input: [ejemplo de entrada]
Output esperado: [ejemplo de salida]

[FORMATO DE RESPUESTA]:
- Código con comentarios
- Explicación de decisiones
- Tests si es necesario
```
