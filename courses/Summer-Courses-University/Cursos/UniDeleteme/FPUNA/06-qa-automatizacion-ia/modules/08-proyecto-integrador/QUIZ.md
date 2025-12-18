# Quiz Final: Automatización QA con IA
## Evaluación Integral del Curso

---

**Instrucciones:** Seleccione la respuesta correcta para cada pregunta. Este quiz cubre todos los módulos del curso.

---

### Pregunta 1: Fundamentos

¿Cuál es la principal ventaja de Playwright sobre Selenium?

- A) Playwright es gratuito y Selenium es de pago
- B) Playwright tiene auto-wait inteligente y soporte nativo multi-browser
- C) Playwright solo funciona en Windows
- D) Selenium tiene mejor documentación

**Respuesta correcta:** B

---

### Pregunta 2: Selectores

¿Cuál es el locator más recomendado en Playwright por ser accesible y resiliente?

- A) `page.locator('#id')`
- B) `page.getByRole()`
- C) `page.locator('.class')`
- D) `page.querySelector()`

**Respuesta correcta:** B

---

### Pregunta 3: Page Object Model

¿Cuál es el principal beneficio del patrón Page Object Model?

- A) Ejecutar tests más rápido
- B) Centralizar selectores y acciones para facilitar mantenimiento
- C) Generar reportes automáticamente
- D) Conectar con bases de datos

**Respuesta correcta:** B

---

### Pregunta 4: IA para Testing

Al usar IA para generar código de tests, ¿qué es esencial hacer después?

- A) Usar el código directamente sin revisar
- B) Revisar y validar selectores, tipos y lógica del código generado
- C) Regenerar el código varias veces
- D) Ignorar los errores de compilación

**Respuesta correcta:** B

---

### Pregunta 5: API Testing

¿Qué fixture se usa en Playwright para hacer requests HTTP en tests de API?

- A) `page`
- B) `browser`
- C) `request`
- D) `context`

**Respuesta correcta:** C

---

### Pregunta 6: API Testing

¿Cuál es el status code esperado al crear un recurso exitosamente con POST?

- A) 200 OK
- B) 201 Created
- C) 204 No Content
- D) 301 Redirect

**Respuesta correcta:** B

---

### Pregunta 7: Fixtures

¿Qué función se usa en un custom fixture para "entregar" el valor al test?

- A) `return`
- B) `yield`
- C) `use`
- D) `provide`

**Respuesta correcta:** C

---

### Pregunta 8: Data Management

¿Qué librería se recomienda para generar datos de prueba realistas?

- A) lodash
- B) axios
- C) faker.js (@faker-js/faker)
- D) moment

**Respuesta correcta:** C

---

### Pregunta 9: CI/CD

¿Qué hace la opción `forbidOnly: !!process.env.CI` en la configuración?

- A) Permite solo tests marcados con .only
- B) Falla el build si hay tests con .only en ambiente CI
- C) Ejecuta todos los tests en paralelo
- D) Deshabilita los tests en CI

**Respuesta correcta:** B

---

### Pregunta 10: CI/CD

¿Cuál condición asegura que los artifacts se suban aunque el test falle?

- A) `if: success()`
- B) `if: failure()`
- C) `if: always()`
- D) `if: completed`

**Respuesta correcta:** C

---

### Pregunta 11: TypeScript

¿Cómo se declara una variable de tipo string en TypeScript?

- A) `var name = string;`
- B) `const name: string = 'valor';`
- C) `string name = 'valor';`
- D) `let name = new String('valor');`

**Respuesta correcta:** B

---

### Pregunta 12: Assertions

¿Cuál es la forma correcta de verificar que un elemento está visible?

- A) `expect(locator).isVisible()`
- B) `expect(locator).toBeVisible()`
- C) `expect(locator).visible()`
- D) `locator.toBeVisible()`

**Respuesta correcta:** B

---

### Pregunta 13: Debugging

¿Qué comando ejecuta tests en modo debug con el Inspector?

- A) `npx playwright debug`
- B) `npx playwright test --debug`
- C) `npx playwright inspect`
- D) `npx playwright test --inspector`

**Respuesta correcta:** B

---

### Pregunta 14: Mocking

Para interceptar y mockear una API en un test E2E, ¿qué método se usa?

- A) `page.intercept()`
- B) `page.mock()`
- C) `page.route()`
- D) `page.stub()`

**Respuesta correcta:** C

---

### Pregunta 15: Parallel Testing

¿Qué es "sharding" en Playwright?

- A) Ejecutar tests en modo seguro
- B) Dividir tests en múltiples workers paralelos
- C) Comprimir los reportes
- D) Cifrar datos de prueba

**Respuesta correcta:** B

---

### Pregunta 16: Hooks

¿Cuál es la diferencia entre `beforeAll` y `beforeEach`?

- A) No hay diferencia
- B) `beforeAll` se ejecuta una vez, `beforeEach` antes de cada test
- C) `beforeEach` es más rápido
- D) `beforeAll` solo funciona con fixtures

**Respuesta correcta:** B

---

### Pregunta 17: Videos y Traces

¿Qué configuración guarda videos solo cuando el test falla?

- A) `video: 'on-failure'`
- B) `video: 'retain-on-failure'`
- C) `video: 'save-failure'`
- D) `video: 'failure-only'`

**Respuesta correcta:** B

---

### Pregunta 18: Prompts para IA

¿Qué debe incluir un buen prompt para generar código de QA?

- A) Solo el nombre de la funcionalidad
- B) Contexto, tarea específica, input y output esperado
- C) Solo ejemplos de código
- D) Solo el HTML de la página

**Respuesta correcta:** B

---

### Pregunta 19: Factory Pattern

¿Qué permite el parámetro `overrides` en una factory?

- A) Eliminar propiedades
- B) Validar datos
- C) Sobrescribir valores específicos manteniendo los demás por defecto
- D) Duplicar objetos

**Respuesta correcta:** C

---

### Pregunta 20: Best Practices

¿Por qué es importante que los tests estén aislados?

- A) Para que se ejecuten más rápido
- B) Para que puedan ejecutarse en paralelo sin afectarse entre sí
- C) Para usar menos memoria
- D) Para generar mejores reportes

**Respuesta correcta:** B

---

## Clave de Respuestas

| Pregunta | Respuesta |
|----------|-----------|
| 1 | B |
| 2 | B |
| 3 | B |
| 4 | B |
| 5 | C |
| 6 | B |
| 7 | C |
| 8 | C |
| 9 | B |
| 10 | C |
| 11 | B |
| 12 | B |
| 13 | B |
| 14 | C |
| 15 | B |
| 16 | B |
| 17 | B |
| 18 | B |
| 19 | C |
| 20 | B |

---

## Escala de Evaluación

| Puntaje | Calificación | Descripción |
|---------|--------------|-------------|
| 18-20 | Excelente | Dominio completo del curso |
| 15-17 | Muy Bueno | Buen entendimiento general |
| 12-14 | Bueno | Conocimientos sólidos |
| 10-11 | Aprobado | Conocimientos básicos adquiridos |
| < 10 | Requiere repaso | Revisar módulos del curso |

---

## Áreas de Evaluación

| Área | Preguntas | Peso |
|------|-----------|------|
| Fundamentos Playwright | 1, 2, 12, 13 | 20% |
| Page Object Model | 3 | 5% |
| IA para Testing | 4, 18 | 10% |
| API Testing | 5, 6 | 10% |
| Fixtures y Data | 7, 8, 19 | 15% |
| CI/CD | 9, 10, 15 | 15% |
| TypeScript | 11 | 5% |
| Avanzado | 14, 16, 17, 20 | 20% |

---

*Duración sugerida: 20 minutos*

*¡Éxito en tu evaluación!*
