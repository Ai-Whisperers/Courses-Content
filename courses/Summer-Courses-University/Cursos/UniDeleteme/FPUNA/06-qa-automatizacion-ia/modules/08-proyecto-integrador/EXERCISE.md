# Ejercicio: Proyecto Integrador
## Framework de Testing Completo

---

## Objetivo

Construir un framework de testing desde cero integrando todos los conceptos del curso.

**Duración:** 90 minutos (durante la sesión) + tiempo adicional opcional

---

## Entregables Requeridos

### Mínimos (85 puntos)

- [ ] 5+ Tests E2E con Page Objects
- [ ] 3+ Tests de API
- [ ] 2+ Custom Fixtures
- [ ] 2+ Data Factories
- [ ] CI/CD con GitHub Actions
- [ ] Reportes HTML funcionando
- [ ] README documentado

### Bonus (15 puntos extra)

- [ ] Multi-browser (Chrome + Firefox)
- [ ] Tests de accesibilidad
- [ ] Visual regression tests

---

## Paso 1: Inicializar Proyecto (10 min)

```bash
# Crear proyecto
mkdir qa-project-fpuna
cd qa-project-fpuna

# Inicializar Playwright
npm init playwright@latest

# Seleccionar:
# - TypeScript
# - tests folder
# - GitHub Actions: YES
# - Install browsers: YES

# Instalar faker
npm install @faker-js/faker --save-dev

# Verificar instalación
npx playwright test
```

### Estructura inicial

```
qa-project-fpuna/
├── tests/
├── playwright.config.ts
├── package.json
└── .github/workflows/playwright.yml
```

---

## Paso 2: Crear Estructura de Carpetas (5 min)

```bash
# Crear carpetas
mkdir pages
mkdir fixtures
mkdir data
mkdir data/factories
mkdir tests/e2e
mkdir tests/api

# Mover tests de ejemplo
mv tests/*.spec.ts tests/e2e/ 2>/dev/null || true
```

### Estructura objetivo

```
qa-project-fpuna/
├── .github/workflows/
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── ...
├── fixtures/
│   └── index.ts
├── data/
│   └── factories/
│       └── userFactory.ts
├── tests/
│   ├── e2e/
│   │   └── login.spec.ts
│   └── api/
│       └── users.spec.ts
└── playwright.config.ts
```

---

## Paso 3: Crear BasePage (5 min)

Crea `pages/BasePage.ts`:

```typescript
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
}
```

---

## Paso 4: Crear Page Objects (15 min)

### LoginPage.ts

```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // TODO: Definir locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);
    // TODO: Inicializar locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    await super.goto('/login');
  }

  async login(username: string, password: string) {
    // TODO: Implementar
  }

  async expectLoginSuccess() {
    // TODO: Implementar
  }

  async expectLoginError() {
    // TODO: Implementar
  }
}
```

### Crear al menos 2 Page Objects más

Elige de la lista:
- `CheckboxPage.ts` para /checkboxes
- `DropdownPage.ts` para /dropdown
- `DynamicLoadingPage.ts` para /dynamic_loading
- `FileUploadPage.ts` para /upload

---

## Paso 5: Crear Fixtures (10 min)

Crea `fixtures/index.ts`:

```typescript
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
// TODO: Importar otros page objects

type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
  // TODO: Agregar más fixtures
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    // TODO: Implementar login y usar página autenticada
    await use(page);
  },

  // TODO: Agregar más fixtures
});

export { expect } from '@playwright/test';
```

---

## Paso 6: Crear Data Factory (5 min)

Crea `data/factories/userFactory.ts`:

```typescript
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

// TODO: Agregar más factories
```

---

## Paso 7: Escribir Tests E2E (20 min)

### tests/e2e/login.spec.ts

```typescript
import { test, expect } from '../../fixtures';
import { createValidUser, createUser } from '../../data/factories/userFactory';

test.describe('Login Tests', () => {

  test('login exitoso @smoke', async ({ loginPage }) => {
    const user = createValidUser();
    await loginPage.login(user.username, user.password);
    await loginPage.expectLoginSuccess();
  });

  test('login fallido con credenciales inválidas', async ({ loginPage }) => {
    // TODO: Implementar
  });

  // TODO: Agregar más tests (mínimo 5 total)
});
```

### Crear más archivos de test

- `tests/e2e/checkboxes.spec.ts`
- `tests/e2e/dropdown.spec.ts`
- etc.

---

## Paso 8: Escribir Tests de API (10 min)

### tests/api/users.spec.ts

```typescript
import { test, expect } from '@playwright/test';

const API_BASE = 'https://reqres.in/api';

test.describe('API Tests', () => {

  test('GET usuarios @smoke', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('POST crear usuario', async ({ request }) => {
    // TODO: Implementar
  });

  test('DELETE usuario', async ({ request }) => {
    // TODO: Implementar
  });
});
```

---

## Paso 9: Configurar CI/CD (5 min)

Verifica `.github/workflows/playwright.yml`:

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
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Paso 10: Documentar (5 min)

Crea `README.md`:

```markdown
# QA Automation Project - FPUNA

## Descripción
Framework de testing automatizado para [nombre del proyecto].

## Instalación
```bash
npm install
npx playwright install
```

## Ejecutar Tests
```bash
npx playwright test        # Todos los tests
npx playwright test --grep @smoke  # Solo smoke
npx playwright show-report # Ver reporte
```

## Estructura
- `pages/` - Page Objects
- `fixtures/` - Custom fixtures
- `data/` - Factories de datos
- `tests/` - Tests E2E y API

## Autor
[Tu nombre]
```

---

## Verificación Final

Antes de entregar, verifica:

```bash
# Ejecutar todos los tests
npx playwright test

# Verificar que pasan
# Verificar reporte
npx playwright show-report

# Verificar CI (hacer push)
git add .
git commit -m "feat: complete QA automation framework"
git push
```

---

## Checklist de Entrega

### Page Objects
- [ ] BasePage.ts creado
- [ ] LoginPage.ts creado
- [ ] 2+ Page Objects adicionales

### Fixtures
- [ ] fixtures/index.ts creado
- [ ] loginPage fixture
- [ ] authenticatedPage fixture

### Factories
- [ ] userFactory.ts creado
- [ ] createValidUser() implementado
- [ ] createUser() con overrides

### Tests E2E
- [ ] 5+ tests funcionando
- [ ] Uso de Page Objects
- [ ] Uso de fixtures
- [ ] Tags @smoke

### Tests API
- [ ] 3+ tests de API
- [ ] GET, POST, DELETE

### CI/CD
- [ ] Workflow configurado
- [ ] Tests ejecutan en CI
- [ ] Artifacts se suben

### Documentación
- [ ] README.md completo

---

## Presentación

Prepara una presentación de 5 minutos que incluya:

1. **Demo** (2 min): Ejecutar tests y mostrar reporte
2. **Arquitectura** (1 min): Explicar estructura del proyecto
3. **Desafíos** (1 min): Qué problemas encontraste
4. **Mejoras** (1 min): Qué agregarías con más tiempo

---

## Criterios de Evaluación

| Componente | Puntos |
|------------|--------|
| Page Objects (5+) | 20 |
| Tests E2E (5+) | 15 |
| Tests API (3+) | 15 |
| Fixtures (2+) | 10 |
| Factories (2+) | 10 |
| CI/CD | 15 |
| Documentación | 5 |
| Código limpio | 10 |
| **Total** | **100** |

---

*¡Éxito con tu proyecto!*
