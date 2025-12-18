# Quiz: Módulo 2
## Playwright Fundamentals

---

**Instrucciones:** Seleccione la respuesta correcta para cada pregunta.

---

### Pregunta 1

¿Cuál es el locator más recomendado en Playwright por ser accesible y resiliente?

- A) `page.locator('#id')`
- B) `page.getByRole()`
- C) `page.locator('.class')`
- D) `page.getByTestId()`

**Respuesta correcta:** B

---

### Pregunta 2

¿Qué método se usa para escribir texto en un input reemplazando el contenido existente?

- A) `type()`
- B) `write()`
- C) `fill()`
- D) `input()`

**Respuesta correcta:** C

---

### Pregunta 3

Para verificar que un elemento está visible en la página, ¿qué assertion se usa?

- A) `await expect(locator).toBeDisplayed()`
- B) `await expect(locator).isVisible()`
- C) `await expect(locator).toBeVisible()`
- D) `await expect(locator).visible()`

**Respuesta correcta:** C

---

### Pregunta 4

¿Cómo se ejecuta un test en modo debug con el Inspector de Playwright?

- A) `npx playwright test --inspect`
- B) `npx playwright test --debug`
- C) `npx playwright debug test`
- D) `npx playwright test --debugger`

**Respuesta correcta:** B

---

### Pregunta 5

¿Qué hace el sistema de "auto-wait" de Playwright?

- A) Pausa los tests por 5 segundos automáticamente
- B) Espera automáticamente a que los elementos estén listos antes de interactuar
- C) Genera reportes automáticamente
- D) Ejecuta tests en paralelo

**Respuesta correcta:** B

---

### Pregunta 6

Para simular presionar la tecla Enter en un input, ¿qué método se usa?

- A) `await input.enter()`
- B) `await input.key('Enter')`
- C) `await input.press('Enter')`
- D) `await input.submit()`

**Respuesta correcta:** C

---

### Pregunta 7

¿Cuál es la forma correcta de verificar que una página tiene cierta URL?

- A) `await expect(page.url()).toBe('/dashboard')`
- B) `await expect(page).toHaveURL('/dashboard')`
- C) `await expect(page).urlEquals('/dashboard')`
- D) `await page.assertURL('/dashboard')`

**Respuesta correcta:** B

---

### Pregunta 8

Para obtener el primer elemento de varios que coinciden con un selector, se usa:

- A) `page.locator('.item')[0]`
- B) `page.locator('.item').get(0)`
- C) `page.locator('.item').first()`
- D) `page.firstLocator('.item')`

**Respuesta correcta:** C

---

### Pregunta 9

¿Qué comando abre el grabador de tests de Playwright?

- A) `npx playwright record`
- B) `npx playwright codegen`
- C) `npx playwright generate`
- D) `npx playwright create`

**Respuesta correcta:** B

---

### Pregunta 10

Para verificar que un checkbox está marcado, ¿qué assertion se usa?

- A) `await expect(checkbox).toBeSelected()`
- B) `await expect(checkbox).isChecked()`
- C) `await expect(checkbox).toBeChecked()`
- D) `await expect(checkbox).checked()`

**Respuesta correcta:** C

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
| 9 | B |
| 10 | C |

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
