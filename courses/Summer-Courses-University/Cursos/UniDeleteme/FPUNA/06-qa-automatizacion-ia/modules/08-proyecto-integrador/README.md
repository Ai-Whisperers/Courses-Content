# Módulo 8: Proyecto Integrador
## Framework de Testing Completo

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Proyecto Práctico |
| **Prerrequisitos** | Módulos 1-7 completados |

---

## Objetivo del Proyecto

Construir un framework de testing automatizado completo que integre todos los conceptos aprendidos durante el curso.

---

## Requisitos del Proyecto

### Mínimos para Aprobar

| Componente | Cantidad | Puntos |
|------------|----------|--------|
| Tests E2E con Page Objects | 5+ | 20 |
| Tests de API | 3+ | 15 |
| Custom Fixtures | 2+ | 10 |
| Data Factories | 2+ | 10 |
| CI/CD configurado | 1 workflow | 15 |
| Reportes funcionando | HTML | 10 |
| Documentación | README | 5 |
| **Total** | | **85** |

### Bonus (15 puntos extra)

| Componente | Puntos |
|------------|--------|
| Multi-browser (Chrome + Firefox) | 5 |
| Tests de accesibilidad | 5 |
| Visual regression tests | 5 |

---

## Aplicación de Práctica

Usaremos **The Internet** (https://the-internet.herokuapp.com) como aplicación de prueba.

### Páginas Disponibles

| Página | URL | Funcionalidades |
|--------|-----|-----------------|
| Login | /login | Autenticación |
| Checkboxes | /checkboxes | Elementos de formulario |
| Dropdown | /dropdown | Selects |
| Dynamic Loading | /dynamic_loading | Esperas |
| File Upload | /upload | Subir archivos |
| Form Authentication | /login | Login/Logout |
| Forgot Password | /forgot_password | Recuperar contraseña |

---

## Estructura del Proyecto

```
qa-automation-project/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   ├── checkboxes.spec.ts
│   │   ├── dropdown.spec.ts
│   │   └── dynamic-loading.spec.ts
│   └── api/
│       └── reqres-api.spec.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── CheckboxPage.ts
│   ├── DropdownPage.ts
│   └── DynamicLoadingPage.ts
├── fixtures/
│   └── index.ts
├── data/
│   └── factories/
│       └── userFactory.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Paso 1: Configuración Inicial (10 min)

### Crear proyecto

```bash
mkdir qa-automation-project
cd qa-automation-project
npm init playwright@latest
```

### Configurar playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    process.env.CI ? ['github'] : ['line'],
  ],

  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Bonus: Firefox
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
```

---

## Paso 2: Crear Page Objects (20 min)

### BasePage.ts

```typescript
// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }
}
```

### LoginPage.ts

```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.flashMessage = page.locator('#flash');
    this.logoutButton = page.getByRole('link', { name: /logout/i });
  }

  async goto() {
    await super.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.flashMessage).toContainText('You logged into');
    await expect(this.page).toHaveURL(/secure/);
  }

  async expectLoginError() {
    await expect(this.flashMessage).toContainText('invalid');
  }
}
```

### CheckboxPage.ts

```typescript
// pages/CheckboxPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckboxPage extends BasePage {
  readonly checkboxes: Locator;

  constructor(page: Page) {
    super(page);
    this.checkboxes = page.locator('input[type="checkbox"]');
  }

  async goto() {
    await super.goto('/checkboxes');
  }

  async checkAll() {
    const count = await this.checkboxes.count();
    for (let i = 0; i < count; i++) {
      await this.checkboxes.nth(i).check();
    }
  }

  async uncheckAll() {
    const count = await this.checkboxes.count();
    for (let i = 0; i < count; i++) {
      await this.checkboxes.nth(i).uncheck();
    }
  }

  async toggleCheckbox(index: number) {
    const checkbox = this.checkboxes.nth(index);
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    } else {
      await checkbox.check();
    }
  }

  async expectChecked(index: number) {
    await expect(this.checkboxes.nth(index)).toBeChecked();
  }

  async expectUnchecked(index: number) {
    await expect(this.checkboxes.nth(index)).not.toBeChecked();
  }
}
```

### DropdownPage.ts

```typescript
// pages/DropdownPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  readonly dropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.dropdown = page.locator('#dropdown');
  }

  async goto() {
    await super.goto('/dropdown');
  }

  async selectOption(value: string) {
    await this.dropdown.selectOption(value);
  }

  async selectByLabel(label: string) {
    await this.dropdown.selectOption({ label });
  }

  async expectSelectedValue(value: string) {
    await expect(this.dropdown).toHaveValue(value);
  }
}
```

---

## Paso 3: Crear Fixtures (10 min)

### fixtures/index.ts

```typescript
// fixtures/index.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckboxPage } from '../pages/CheckboxPage';
import { DropdownPage } from '../pages/DropdownPage';

type MyFixtures = {
  loginPage: LoginPage;
  checkboxPage: CheckboxPage;
  dropdownPage: DropdownPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  checkboxPage: async ({ page }, use) => {
    const checkboxPage = new CheckboxPage(page);
    await checkboxPage.goto();
    await use(checkboxPage);
  },

  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.goto();
    await use(dropdownPage);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.expectLoginSuccess();
    await use(page);
    // Cleanup
    await loginPage.logout();
  },
});

export { expect } from '@playwright/test';
```

---

## Paso 4: Crear Data Factories (5 min)

### data/factories/userFactory.ts

```typescript
// data/factories/userFactory.ts
import { faker } from '@faker-js/faker';

interface User {
  username: string;
  password: string;
  email: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password({ length: 12 }),
    email: faker.internet.email(),
    ...overrides,
  };
}

export function createValidUser(): User {
  return {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
    email: 'tomsmith@example.com',
  };
}

export function createInvalidUser(): User {
  return createUser({
    username: 'wronguser',
    password: 'wrongpassword',
  });
}
```

---

## Paso 5: Escribir Tests E2E (20 min)

### tests/e2e/login.spec.ts

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from '../../fixtures';
import { createValidUser, createInvalidUser } from '../../data/factories/userFactory';

test.describe('Login Tests', () => {

  test('login exitoso con credenciales válidas @smoke', async ({ loginPage }) => {
    const user = createValidUser();
    await loginPage.login(user.username, user.password);
    await loginPage.expectLoginSuccess();
  });

  test('login fallido con credenciales inválidas', async ({ loginPage }) => {
    const user = createInvalidUser();
    await loginPage.login(user.username, user.password);
    await loginPage.expectLoginError();
  });

  test('logout después de login', async ({ authenticatedPage }) => {
    // authenticatedPage ya está logueado
    await expect(authenticatedPage).toHaveURL(/secure/);
  });

  test('campos vacíos muestran error', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.expectLoginError();
  });

  test('usuario correcto, password incorrecto', async ({ loginPage }) => {
    await loginPage.login('tomsmith', 'wrongpassword');
    await loginPage.expectLoginError();
  });
});
```

### tests/e2e/checkboxes.spec.ts

```typescript
// tests/e2e/checkboxes.spec.ts
import { test, expect } from '../../fixtures';

test.describe('Checkbox Tests', () => {

  test('puede marcar checkbox @smoke', async ({ checkboxPage }) => {
    await checkboxPage.checkboxes.nth(0).check();
    await checkboxPage.expectChecked(0);
  });

  test('puede desmarcar checkbox', async ({ checkboxPage }) => {
    await checkboxPage.checkboxes.nth(1).uncheck();
    await checkboxPage.expectUnchecked(1);
  });

  test('puede marcar todos los checkboxes', async ({ checkboxPage }) => {
    await checkboxPage.checkAll();
    await checkboxPage.expectChecked(0);
    await checkboxPage.expectChecked(1);
  });

  test('puede desmarcar todos los checkboxes', async ({ checkboxPage }) => {
    await checkboxPage.uncheckAll();
    await checkboxPage.expectUnchecked(0);
    await checkboxPage.expectUnchecked(1);
  });
});
```

### tests/e2e/dropdown.spec.ts

```typescript
// tests/e2e/dropdown.spec.ts
import { test, expect } from '../../fixtures';

test.describe('Dropdown Tests', () => {

  test('puede seleccionar Option 1 @smoke', async ({ dropdownPage }) => {
    await dropdownPage.selectOption('1');
    await dropdownPage.expectSelectedValue('1');
  });

  test('puede seleccionar Option 2', async ({ dropdownPage }) => {
    await dropdownPage.selectOption('2');
    await dropdownPage.expectSelectedValue('2');
  });

  test('puede seleccionar por label', async ({ dropdownPage }) => {
    await dropdownPage.selectByLabel('Option 1');
    await dropdownPage.expectSelectedValue('1');
  });
});
```

---

## Paso 6: Tests de API (10 min)

### tests/api/reqres-api.spec.ts

```typescript
// tests/api/reqres-api.spec.ts
import { test, expect } from '@playwright/test';

const API_BASE = 'https://reqres.in/api';

test.describe('ReqRes API Tests', () => {

  test('GET /users - lista usuarios @smoke', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /users/:id - usuario específico', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/2`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeDefined();
  });

  test('POST /users - crear usuario', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      job: 'QA Engineer',
    };

    const response = await request.post(`${API_BASE}/users`, {
      data: newUser,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(newUser.name);
    expect(body.id).toBeDefined();
  });

  test('PUT /users/:id - actualizar usuario', async ({ request }) => {
    const response = await request.put(`${API_BASE}/users/2`, {
      data: { name: 'Updated Name', job: 'Updated Job' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe('Updated Name');
  });

  test('DELETE /users/:id - eliminar usuario', async ({ request }) => {
    const response = await request.delete(`${API_BASE}/users/2`);
    expect(response.status()).toBe(204);
  });
});
```

---

## Paso 7: Configurar CI/CD (5 min)

### .github/workflows/playwright.yml

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Paso 8: Documentación (5 min)

### README.md

```markdown
# QA Automation Project

Framework de testing automatizado con Playwright y TypeScript.

## Tecnologías

- Playwright
- TypeScript
- GitHub Actions

## Instalación

```bash
npm install
npx playwright install
```

## Ejecutar Tests

```bash
# Todos los tests
npx playwright test

# Solo smoke tests
npx playwright test --grep @smoke

# Con UI
npx playwright test --ui

# Ver reporte
npx playwright show-report
```

## Estructura

- `tests/` - Tests E2E y API
- `pages/` - Page Objects
- `fixtures/` - Custom fixtures
- `data/` - Factories de datos

## CI/CD

Los tests se ejecutan automáticamente en cada PR.
```

---

## Criterios de Evaluación

| Criterio | Excelente (100%) | Bueno (80%) | Aceptable (60%) |
|----------|-----------------|-------------|-----------------|
| **Page Objects** | 5+ POs bien estructurados | 3-4 POs | 1-2 POs básicos |
| **Tests E2E** | 10+ tests variados | 5-9 tests | 3-4 tests |
| **Tests API** | CRUD completo | 3 operaciones | 1-2 operaciones |
| **Fixtures** | 3+ custom fixtures | 2 fixtures | 1 fixture |
| **CI/CD** | Workflow con artifacts | Workflow básico | Solo local |
| **Código** | Limpio, documentado | Funcional | Con errores menores |

---

## Presentación Final (25 min)

Cada equipo/participante presentará su proyecto (5 min):

1. **Demo rápida** - Ejecutar tests
2. **Arquitectura** - Explicar estructura
3. **Desafíos** - Qué problemas encontraron
4. **Mejoras futuras** - Qué agregarían

---

## Puntos Clave del Curso

1. **Playwright es moderno:** Auto-wait, multi-browser, rápido
2. **TypeScript previene errores:** Tipos = menos bugs
3. **POM organiza:** Selectores centralizados, mantenible
4. **IA acelera:** Genera código, valida después
5. **CI/CD es esencial:** Feedback automático, calidad constante
6. **Fixtures aíslan:** Tests independientes y paralelos
7. **Práctica continua:** El aprendizaje no termina aquí

---

*¡Felicitaciones por completar el curso!*
