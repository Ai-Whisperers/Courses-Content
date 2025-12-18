# Quiz: Módulo 5
## Testing de APIs

---

**Instrucciones:** Seleccione la respuesta correcta para cada pregunta.

---

### Pregunta 1

En Playwright, ¿qué fixture se usa para hacer requests HTTP en tests de API?

- A) `page`
- B) `request`
- C) `http`
- D) `api`

**Respuesta correcta:** B

---

### Pregunta 2

¿Cuál es el status code esperado al crear un recurso exitosamente con POST?

- A) 200 OK
- B) 201 Created
- C) 204 No Content
- D) 202 Accepted

**Respuesta correcta:** B

---

### Pregunta 3

¿Cómo se envían datos en el body de una request POST en Playwright?

- A) `request.post('/api', { body: data })`
- B) `request.post('/api', { json: data })`
- C) `request.post('/api', { data: data })`
- D) `request.post('/api', data)`

**Respuesta correcta:** C

---

### Pregunta 4

¿Qué status code indica que el recurso solicitado no fue encontrado?

- A) 400
- B) 401
- C) 403
- D) 404

**Respuesta correcta:** D

---

### Pregunta 5

¿Cuál es la forma correcta de obtener el JSON de una respuesta?

- A) `response.body()`
- B) `response.json()`
- C) `response.data()`
- D) `JSON.parse(response)`

**Respuesta correcta:** B

---

### Pregunta 6

Para interceptar y mockear una API en un test E2E, ¿qué método se usa?

- A) `page.intercept()`
- B) `page.mock()`
- C) `page.route()`
- D) `page.stub()`

**Respuesta correcta:** C

---

### Pregunta 7

¿Cómo se verifican los headers en una respuesta de API?

- A) `response.headers()`
- B) `response.getHeaders()`
- C) `response.header('name')` o `response.headers()`
- D) `response.head()`

**Respuesta correcta:** C

---

### Pregunta 8

¿Qué diferencia hay entre PUT y PATCH?

- A) PUT es más rápido que PATCH
- B) PUT reemplaza todo el recurso, PATCH actualiza parcialmente
- C) PATCH crea recursos, PUT los actualiza
- D) No hay diferencia

**Respuesta correcta:** B

---

### Pregunta 9

¿Dónde se configura el baseURL para tests de API en Playwright?

- A) En cada test individualmente
- B) En playwright.config.ts bajo `use.baseURL`
- C) En una variable de entorno
- D) No se puede configurar globalmente

**Respuesta correcta:** B

---

### Pregunta 10

¿Cuál es el status code típico para una operación DELETE exitosa?

- A) 200 OK o 204 No Content
- B) 201 Created
- C) 202 Accepted
- D) 301 Moved Permanently

**Respuesta correcta:** A

---

## Clave de Respuestas

| Pregunta | Respuesta |
|----------|-----------|
| 1 | B |
| 2 | B |
| 3 | C |
| 4 | D |
| 5 | B |
| 6 | C |
| 7 | C |
| 8 | B |
| 9 | B |
| 10 | A |

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
