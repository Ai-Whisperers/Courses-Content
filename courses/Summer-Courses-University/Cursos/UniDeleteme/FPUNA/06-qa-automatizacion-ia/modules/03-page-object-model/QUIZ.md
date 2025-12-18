# Quiz: Módulo 3
## Page Object Model

---

**Instrucciones:** Seleccione la respuesta correcta para cada pregunta.

---

### Pregunta 1

¿Cuál es el principal beneficio del Page Object Model?

- A) Hace que los tests se ejecuten más rápido
- B) Centraliza selectores y acciones para facilitar mantenimiento
- C) Permite ejecutar tests en paralelo
- D) Genera reportes automáticamente

**Respuesta correcta:** B

---

### Pregunta 2

En un Page Object, ¿cómo se deben declarar los locators?

- A) `public emailInput: Locator`
- B) `private emailInput: Locator`
- C) `readonly emailInput: Locator`
- D) `static emailInput: Locator`

**Respuesta correcta:** C

---

### Pregunta 3

¿Qué se hereda de una clase BasePage?

- A) Solo los locators
- B) Solo los métodos de navegación
- C) Funcionalidad común como goto(), waitForLoad(), screenshot()
- D) Las credenciales de usuario

**Respuesta correcta:** C

---

### Pregunta 4

Si un selector cambia en la aplicación, ¿qué se debe modificar con POM?

- A) Todos los tests que usan ese selector
- B) Solo el Page Object correspondiente
- C) El archivo de configuración
- D) Todos los Page Objects

**Respuesta correcta:** B

---

### Pregunta 5

¿Cuál es una mala práctica en Page Objects?

- A) Usar métodos descriptivos como login()
- B) Incluir lógica de test y assertions complejas dentro del Page Object
- C) Usar readonly para locators
- D) Tener un Page Object por página

**Respuesta correcta:** B

---

### Pregunta 6

En TypeScript, ¿cómo se llama al constructor de la clase padre?

- A) `parent(page)`
- B) `base(page)`
- C) `super(page)`
- D) `this.parent(page)`

**Respuesta correcta:** C

---

### Pregunta 7

¿Cuál es la estructura correcta de carpetas para un proyecto con POM?

- A) Todo en una carpeta tests/
- B) tests/, pages/, components/, fixtures/
- C) src/, dist/, build/
- D) No importa la estructura

**Respuesta correcta:** B

---

### Pregunta 8

¿Qué tipo de retorno es apropiado para un método que navega a otra página?

- A) `async goto(): void`
- B) `async goto(): Promise<void>`
- C) `async submitAndGoToDashboard(): Promise<DashboardPage>`
- D) A y B son correctas, C es opcional

**Respuesta correcta:** D

---

### Pregunta 9

Los componentes reutilizables (como NavigationComponent) se usan para:

- A) Elementos que aparecen en múltiples páginas
- B) Acelerar la ejecución de tests
- C) Generar reportes
- D) Conectar con la base de datos

**Respuesta correcta:** A

---

### Pregunta 10

En el constructor de un Page Object, ¿qué debe hacerse primero?

- A) Definir los locators
- B) Navegar a la página
- C) Llamar a super(page) si extiende de BasePage
- D) Verificar que la página cargó

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
| 8 | D |
| 9 | A |
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
