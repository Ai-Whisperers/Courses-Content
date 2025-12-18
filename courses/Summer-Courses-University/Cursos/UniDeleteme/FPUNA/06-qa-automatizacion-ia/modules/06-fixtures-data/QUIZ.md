# Quiz: Módulo 6
## Fixtures y Data Management

---

**Instrucciones:** Seleccione la respuesta correcta para cada pregunta.

---

### Pregunta 1

¿Cuál es el propósito principal de un fixture en Playwright?

- A) Generar reportes de tests
- B) Configurar estado antes del test y limpiarlo después
- C) Ejecutar tests en paralelo
- D) Conectar con bases de datos

**Respuesta correcta:** B

---

### Pregunta 2

En un custom fixture, ¿qué función se usa para "entregar" el valor al test?

- A) `return`
- B) `yield`
- C) `use`
- D) `give`

**Respuesta correcta:** C

---

### Pregunta 3

¿Cuál fixture built-in se usa para hacer requests HTTP?

- A) `http`
- B) `api`
- C) `request`
- D) `fetch`

**Respuesta correcta:** C

---

### Pregunta 4

¿Qué hook se ejecuta UNA VEZ antes de todos los tests de un describe?

- A) `beforeEach`
- B) `beforeAll`
- C) `setup`
- D) `init`

**Respuesta correcta:** B

---

### Pregunta 5

¿Por qué es importante que los tests estén aislados?

- A) Para que se ejecuten más rápido
- B) Para que puedan ejecutarse en paralelo sin afectarse entre sí
- C) Para generar mejores reportes
- D) Para usar menos memoria

**Respuesta correcta:** B

---

### Pregunta 6

En el factory pattern, ¿qué permite el parámetro `overrides`?

- A) Eliminar propiedades del objeto
- B) Agregar validación
- C) Sobrescribir valores específicos manteniendo los demás por defecto
- D) Duplicar el objeto

**Respuesta correcta:** C

---

### Pregunta 7

¿Cómo se reutiliza el estado de autenticación entre tests en Playwright?

- A) Usando variables globales
- B) Con `storageState` que guarda cookies y localStorage
- C) Compartiendo la misma página
- D) Con `sharedAuth: true` en config

**Respuesta correcta:** B

---

### Pregunta 8

¿Qué librería se recomienda para generar datos de prueba realistas?

- A) lodash
- B) moment
- C) faker.js (@faker-js/faker)
- D) uuid

**Respuesta correcta:** C

---

### Pregunta 9

¿Dónde se define el código de "teardown" en un custom fixture?

- A) En una función separada
- B) Antes de `await use()`
- C) Después de `await use()`
- D) En `afterEach`

**Respuesta correcta:** C

---

### Pregunta 10

¿Cuál es la diferencia entre `beforeAll` y `beforeEach`?

- A) No hay diferencia
- B) `beforeAll` se ejecuta una vez, `beforeEach` antes de cada test
- C) `beforeEach` se ejecuta una vez, `beforeAll` antes de cada test
- D) `beforeAll` es para fixtures, `beforeEach` para tests

**Respuesta correcta:** B

---

## Clave de Respuestas

| Pregunta | Respuesta |
|----------|-----------|
| 1 | B |
| 2 | C |
| 3 | C |
| 4 | B |
| 5 | B |
| 6 | C |
| 7 | B |
| 8 | C |
| 9 | C |
| 10 | B |

---

## Escala de Evaluación

| Puntaje | Calificación |
|---------|--------------|
| 9-10 | Excelente |
| 7-8 | Muy Bueno |
| 5-6 | Aprobado |
| < 5 | Requiere repaso |

---

*Duración sugerida: 10 minutos*
