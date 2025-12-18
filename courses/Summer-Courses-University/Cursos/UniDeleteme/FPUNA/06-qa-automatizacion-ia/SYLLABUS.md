# SYLLABUS: Automatización QA con IA
## Programa Detallado del Curso

---

## Información General

| Campo | Detalle |
|-------|---------|
| **Código** | FPUNA-QA-2025 |
| **Duración** | 16 horas (2 días intensivos) |
| **Créditos** | 1 (extensión) |
| **Modalidad** | Presencial con laboratorio |
| **Idioma** | Español |
| **Cupo** | 15-20 estudiantes |

---

## Descripción del Curso

Este curso intensivo enseña las técnicas más modernas de automatización de pruebas de software utilizando Playwright con TypeScript y herramientas de IA. Los estudiantes aprenderán a crear frameworks de testing robustos, generar tests automáticamente con asistencia de IA, implementar patrones de diseño profesionales y configurar pipelines de CI/CD.

El enfoque combina teoría con práctica intensiva, preparando a los estudiantes para roles de QA Automation en empresas locales e internacionales.

---

## Objetivos de Aprendizaje

### Al finalizar el curso, el estudiante será capaz de:

1. **Configurar y utilizar** Playwright con TypeScript para testing automatizado
2. **Implementar** el patrón Page Object Model profesionalmente
3. **Generar tests** automáticamente utilizando GitHub Copilot y LLMs
4. **Escribir** tests E2E robustos con mejores prácticas
5. **Crear** tests de API REST completos
6. **Configurar** pipelines de CI/CD con GitHub Actions
7. **Aplicar** patrones de diseño de testing (AAA, Fixtures, Factories)
8. **Depurar** y mantener suites de tests eficientemente

---

## Contenido Detallado

### DÍA 1: FUNDAMENTOS DE AUTOMATIZACIÓN (8 horas)

---

#### Módulo 1: Introducción a QA Automation
**Duración:** 2 horas (9:00 - 11:00)

| Tema | Tiempo | Tipo |
|------|--------|------|
| Bienvenida y objetivos del curso | 10 min | Exposición |
| Estado actual del testing automatizado | 20 min | Exposición |
| Comparativa: Playwright vs Cypress vs Selenium | 20 min | Exposición |
| TypeScript para testing: ventajas y sintaxis | 20 min | Demo |
| Configuración del entorno de desarrollo | 20 min | Práctica |
| Primer test con Playwright | 30 min | Práctica |

**Herramientas configuradas:**
- Node.js 18+
- VS Code con extensiones
- Playwright Test
- Git

**Práctica del módulo:**
> Configurar proyecto desde cero y ejecutar primer test que navegue a una página y verifique el título.

---

#### Módulo 2: Playwright Fundamentals
**Duración:** 2 horas (11:00 - 13:00)

| Tema | Tiempo | Tipo |
|------|--------|------|
| Locators y selectores en Playwright | 25 min | Demo |
| Acciones: click, fill, navigate, select | 20 min | Demo |
| Assertions efectivas con expect | 20 min | Demo |
| Waits: automáticos y explícitos | 15 min | Demo |
| Screenshots y videos de tests | 10 min | Demo |
| Debug con Playwright Inspector | 20 min | Práctica |
| Tests para formulario de login | 30 min | Práctica |

**Conceptos clave:**
```typescript
// Locators
page.locator('button')
page.getByRole('button', { name: 'Submit' })
page.getByTestId('login-button')

// Acciones
await page.click('button')
await page.fill('input[name="email"]', 'test@test.com')
await page.goto('https://example.com')

// Assertions
await expect(page).toHaveTitle('Home')
await expect(locator).toBeVisible()
await expect(locator).toHaveText('Welcome')
```

**Práctica del módulo:**
> Crear suite de tests para un formulario de login: casos de éxito y error.

*ALMUERZO: 13:00 - 14:00 (1 hora)*

---

#### Módulo 3: Page Object Model (POM)
**Duración:** 2 horas (14:00 - 16:00)

| Tema | Tiempo | Tipo |
|------|--------|------|
| ¿Por qué usar Page Object Model? | 15 min | Exposición |
| Estructura de un Page Object | 25 min | Demo |
| Locators como propiedades de clase | 15 min | Demo |
| Métodos de acción en Page Objects | 20 min | Demo |
| BasePage y herencia | 15 min | Demo |
| Mejores prácticas de POM | 10 min | Exposición |
| Refactorizar tests a POM | 30 min | Práctica |

**Estructura de Page Object:**
```typescript
// pages/LoginPage.ts
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

**Práctica del módulo:**
> Refactorizar los tests del módulo anterior utilizando Page Object Model.

---

#### Módulo 4: IA para Generación de Tests
**Duración:** 2 horas (16:00 - 18:00)

| Tema | Tiempo | Tipo |
|------|--------|------|
| GitHub Copilot para testing | 20 min | Demo |
| Generación de tests con Claude/ChatGPT | 25 min | Demo |
| Prompts efectivos para QA | 20 min | Práctica |
| Generación de Page Objects con IA | 20 min | Práctica |
| Datos de prueba con factories | 15 min | Demo |
| Generar suite completa con IA | 30 min | Práctica |

**Prompts clave para QA:**
```
1. "Genera un Page Object en TypeScript para Playwright
    para esta página: [pegar HTML]"

2. "Escribe tests E2E para un flujo de checkout
    incluyendo: agregar producto, llenar datos,
    confirmar pago"

3. "Crea una factory de datos para usuarios
    con faker.js en TypeScript"
```

**Práctica del módulo:**
> Usar IA para generar una suite completa de tests para una página dada.

---

### DÍA 2: TESTING AVANZADO (8 horas)

---

#### Módulo 5: Testing de APIs
**Duración:** 2 horas (9:00 - 11:00)

| Tema | Tiempo | Tipo |
|------|--------|------|
| Playwright para API testing | 15 min | Exposición |
| Requests: GET, POST, PUT, DELETE | 25 min | Demo |
| Validación de respuestas y status codes | 20 min | Demo |
| Autenticación y tokens | 20 min | Demo |
| Mocking de APIs en tests E2E | 20 min | Demo |
| Tests de API REST | 30 min | Práctica |

**Código de ejemplo:**
```typescript
test('GET /users returns list', async ({ request }) => {
  const response = await request.get('/api/users');

  expect(response.status()).toBe(200);
  const users = await response.json();
  expect(users).toHaveLength(greaterThan(0));
});

test('POST /users creates user', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: {
      name: 'Test User',
      email: 'test@example.com'
    }
  });

  expect(response.status()).toBe(201);
  const user = await response.json();
  expect(user.id).toBeDefined();
});
```

**Práctica del módulo:**
> Crear tests para una API REST: CRUD completo de un recurso.

---

#### Módulo 6: Fixtures y Data Management
**Duración:** 2 horas (11:00 - 13:00)

| Tema | Tiempo | Tipo |
|------|--------|------|
| Playwright fixtures explicados | 20 min | Demo |
| Custom fixtures para autenticación | 20 min | Demo |
| Factory pattern para datos de prueba | 20 min | Demo |
| Cleanup y teardown | 15 min | Demo |
| Bases de datos de testing | 15 min | Exposición |
| Aislamiento de tests | 10 min | Exposición |
| Implementar fixtures | 30 min | Práctica |

**Fixture de ejemplo:**
```typescript
// fixtures.ts
import { test as base } from '@playwright/test';

type MyFixtures = {
  authenticatedPage: Page;
  testUser: User;
};

export const test = base.extend<MyFixtures>({
  testUser: async ({}, use) => {
    const user = await createTestUser();
    await use(user);
    await deleteTestUser(user.id);
  },

  authenticatedPage: async ({ page, testUser }, use) => {
    await page.goto('/login');
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await use(page);
  },
});
```

**Práctica del módulo:**
> Crear fixtures para autenticación y datos de prueba.

*ALMUERZO: 13:00 - 14:00 (1 hora)*

---

#### Módulo 7: CI/CD y Reporting
**Duración:** 2 horas (14:00 - 16:00)

| Tema | Tiempo | Tipo |
|------|--------|------|
| GitHub Actions para tests | 25 min | Demo |
| Ejecución paralela con sharding | 20 min | Demo |
| Reportes HTML y traces | 20 min | Demo |
| Subir artifacts (videos, screenshots) | 15 min | Demo |
| Integración con Slack/Teams | 10 min | Demo |
| Mejores prácticas de CI | 10 min | Exposición |
| Configurar pipeline | 30 min | Práctica |

**GitHub Actions workflow:**
```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

**Práctica del módulo:**
> Configurar pipeline de CI/CD completo en GitHub Actions.

---

#### Módulo 8: Proyecto Integrador
**Duración:** 2 horas (16:00 - 18:00)

| Actividad | Tiempo |
|-----------|--------|
| Instrucciones del proyecto | 10 min |
| Desarrollo del framework | 60 min |
| Testing y debugging | 20 min |
| Presentaciones (5 min c/u) | 25 min |
| Feedback y cierre | 5 min |

**Requisitos del proyecto:**
- 5+ tests E2E con Page Objects
- 3+ tests de API
- Fixtures implementados
- CI/CD configurado
- Reportes funcionando

---

## Cronograma Resumen

### Día 1

| Hora | Actividad | Módulo |
|------|-----------|--------|
| 09:00 - 11:00 | Introducción a QA Automation | 1 |
| 11:00 - 13:00 | Playwright Fundamentals | 2 |
| 13:00 - 14:00 | *Almuerzo* | - |
| 14:00 - 16:00 | Page Object Model | 3 |
| 16:00 - 18:00 | IA para Generación de Tests | 4 |

### Día 2

| Hora | Actividad | Módulo |
|------|-----------|--------|
| 09:00 - 11:00 | Testing de APIs | 5 |
| 11:00 - 13:00 | Fixtures y Data Management | 6 |
| 13:00 - 14:00 | *Almuerzo* | - |
| 14:00 - 16:00 | CI/CD y Reporting | 7 |
| 16:00 - 18:00 | Proyecto Integrador | 8 |

---

## Metodología

### Enfoque Pedagógico

- **Hands-on:** 70% práctico, 30% teórico
- **Proyecto real:** Tests para aplicación funcional
- **Pair programming:** Ejercicios en parejas
- **Code review:** Revisión de código entre participantes

### Dinámica de Sesiones

1. **Exposición breve** (10-15 min): Concepto teórico
2. **Demo en vivo** (15-20 min): Instructor muestra código
3. **Práctica guiada** (20-30 min): Estudiantes implementan

---

## Evaluación

| Componente | Peso | Descripción |
|------------|------|-------------|
| Ejercicios de módulos | 30% | Entregas de cada módulo |
| Quizzes | 15% | Preguntas de conceptos |
| Proyecto final | 45% | Framework completo |
| Participación | 10% | Engagement y preguntas |

### Criterios de Aprobación

- **Asistencia:** 90% mínimo
- **Puntaje mínimo:** 70%
- **Proyecto:** Debe ejecutar exitosamente

---

## Materiales

### Proporcionados

- Manual de Playwright (PDF)
- Repositorio template de proyecto
- Biblioteca de prompts para QA
- Configuraciones de CI/CD listas
- Acceso a aplicación de práctica
- Certificado de completación

### Requeridos del Estudiante

- Laptop con Node.js 18+ instalado
- VS Code con extensiones
- Cuenta de GitHub
- Conocimientos básicos de JavaScript/TypeScript

---

## Recursos Online

### Documentación Oficial
- Playwright: https://playwright.dev
- TypeScript: https://www.typescriptlang.org
- GitHub Actions: https://docs.github.com/actions

### Repositorios de Práctica
- Aplicación demo del curso
- Template de proyecto

---

## Certificación

Los participantes que completen el curso y aprueben recibirán:

**Certificado de Completación**
> "Automatización QA con IA"
> Facultad Politécnica - Universidad Nacional de Asunción
> 16 horas de formación teórico-práctica

---

*Syllabus versión 1.0*
*Curso propuesto: 2025*
*FPUNA - Ingeniería en Informática*
