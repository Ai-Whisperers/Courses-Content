# Quiz: Módulo 7
## CI/CD y Reporting

---

**Instrucciones:** Seleccione la respuesta correcta para cada pregunta.

---

### Pregunta 1

¿Cuál es el principal beneficio de ejecutar tests en CI/CD?

- A) Los tests se ejecutan más rápido
- B) Se detectan regresiones automáticamente en cada cambio de código
- C) Se genera mejor documentación
- D) Se reducen los costos de servidor

**Respuesta correcta:** B

---

### Pregunta 2

¿Qué hace la opción `forbidOnly: !!process.env.CI` en la configuración?

- A) Ejecuta solo tests marcados con .only
- B) Falla el build si hay tests con .only en ambiente CI
- C) Ignora todos los tests .only
- D) Ejecuta tests en modo solo-lectura

**Respuesta correcta:** B

---

### Pregunta 3

¿Qué es "sharding" en Playwright?

- A) Ejecutar tests en modo seguro
- B) Dividir tests en múltiples workers paralelos
- C) Comprimir los reportes
- D) Guardar screenshots

**Respuesta correcta:** B

---

### Pregunta 4

¿Cuál es la sintaxis correcta para ejecutar shard 2 de 4?

- A) `npx playwright test --shard 2/4`
- B) `npx playwright test --shard=2/4`
- C) `npx playwright test --split=2/4`
- D) `npx playwright test 2/4`

**Respuesta correcta:** B

---

### Pregunta 5

¿Qué acción de GitHub se usa para subir artifacts?

- A) `actions/save-artifact@v4`
- B) `actions/upload-artifact@v4`
- C) `actions/store-artifact@v4`
- D) `actions/artifact@v4`

**Respuesta correcta:** B

---

### Pregunta 6

¿Qué configuración de video guarda grabaciones solo cuando el test falla?

- A) `video: 'on-failure'`
- B) `video: 'retain-on-failure'`
- C) `video: 'save-on-failure'`
- D) `video: 'failure-only'`

**Respuesta correcta:** B

---

### Pregunta 7

¿Cómo se ejecutan solo los tests marcados con @smoke?

- A) `npx playwright test @smoke`
- B) `npx playwright test --tag smoke`
- C) `npx playwright test --grep @smoke`
- D) `npx playwright test --filter smoke`

**Respuesta correcta:** C

---

### Pregunta 8

¿Qué reporter genera anotaciones directamente en los PRs de GitHub?

- A) `['html']`
- B) `['github']`
- C) `['pr']`
- D) `['annotations']`

**Respuesta correcta:** B

---

### Pregunta 9

¿Cuál condición asegura que el artifact se suba aunque el test falle?

- A) `if: success()`
- B) `if: failure()`
- C) `if: always()`
- D) `if: true`

**Respuesta correcta:** C

---

### Pregunta 10

¿Qué comando combina reportes de múltiples shards?

- A) `npx playwright combine-reports`
- B) `npx playwright merge-reports`
- C) `npx playwright join-reports`
- D) `npx playwright unite-reports`

**Respuesta correcta:** B

---

## Clave de Respuestas

| Pregunta | Respuesta |
|----------|-----------|
| 1 | B |
| 2 | B |
| 3 | B |
| 4 | B |
| 5 | B |
| 6 | B |
| 7 | C |
| 8 | B |
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
