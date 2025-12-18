# Cheatsheet: Playwright con TypeScript
## Referencia Rápida

---

## Comandos CLI

```bash
# Inicializar proyecto
npm init playwright@latest

# Ejecutar tests
npx playwright test                    # Todos los tests
npx playwright test login.spec.ts      # Archivo específico
npx playwright test --grep @smoke      # Por tag
npx playwright test --grep-invert @slow # Excluir tag
npx playwright test --project=chromium # Navegador específico

# Modos de ejecución
npx playwright test --headed           # Con navegador visible
npx playwright test --debug            # Modo debug
npx playwright test --ui               # Interfaz visual

# Herramientas
npx playwright codegen                 # Grabar tests
npx playwright show-report             # Ver reporte HTML
npx playwright show-trace trace.zip    # Ver trace

# Sharding
npx playwright test --shard=1/4        # Shard 1 de 4
```

---

## Locators

```typescript
// Recomendados (en orden de preferencia)
page.getByRole('button', { name: 'Submit' })
page.getByTestId('login-btn')
page.getByText('Welcome')
page.getByLabel('Email')
page.getByPlaceholder('Enter email')

// CSS/XPath (cuando necesario)
page.locator('#id')
page.locator('.class')
page.locator('input[name="email"]')
page.locator('form >> input')

// Encadenamiento
page.locator('.card').getByRole('button')
page.locator('.item').filter({ hasText: 'Oferta' })

// Índices
page.locator('.item').first()
page.locator('.item').last()
page.locator('.item').nth(2)
```

---

## Acciones

```typescript
// Navegación
await page.goto('/path')
await page.goBack()
await page.goForward()
await page.reload()

// Clicks
await locator.click()
await locator.dblclick()
await locator.click({ button: 'right' })
await locator.click({ force: true })

// Texto
await locator.fill('texto')
await locator.clear()
await locator.press('Enter')
await locator.type('texto', { delay: 100 })

// Formularios
await locator.selectOption('value')
await locator.selectOption({ label: 'Opción' })
await locator.check()
await locator.uncheck()
await locator.setChecked(true)

// Otros
await locator.hover()
await locator.focus()
await locator.blur()
await locator.setInputFiles('file.pdf')
```

---

## Assertions

```typescript
// Página
await expect(page).toHaveTitle('Título')
await expect(page).toHaveTitle(/regex/)
await expect(page).toHaveURL('/path')
await expect(page).toHaveURL(/regex/)

// Visibilidad
await expect(locator).toBeVisible()
await expect(locator).toBeHidden()
await expect(locator).not.toBeVisible()

// Texto
await expect(locator).toHaveText('exacto')
await expect(locator).toContainText('parcial')
await expect(locator).toHaveText(/regex/)

// Atributos
await expect(locator).toHaveAttribute('href', '/home')
await expect(locator).toHaveClass('active')
await expect(locator).toHaveClass(/active/)

// Estado
await expect(locator).toBeEnabled()
await expect(locator).toBeDisabled()
await expect(locator).toBeChecked()
await expect(locator).toBeFocused()
await expect(locator).toBeEmpty()

// Valores
await expect(locator).toHaveValue('valor')
await expect(locator).toHaveCount(5)

// Screenshots
await expect(page).toHaveScreenshot('name.png')
await expect(locator).toHaveScreenshot('component.png')

// Soft assertions (no detienen test)
await expect.soft(locator).toHaveText('texto')
```

---

## Waits

```typescript
// Auto-wait (built-in)
// Playwright espera automáticamente antes de acciones

// Waits explícitos (cuando necesario)
await page.waitForSelector('.loaded')
await page.waitForSelector('.loading', { state: 'hidden' })
await page.waitForURL('/dashboard')
await page.waitForLoadState('networkidle')
await page.waitForResponse('**/api/users')
await page.waitForTimeout(1000)  // Evitar si posible

// Expect con timeout
await expect(locator).toBeVisible({ timeout: 10000 })
```

---

## API Testing

```typescript
// Métodos HTTP
const response = await request.get('/api/users')
const response = await request.post('/api/users', { data: { name: 'Test' } })
const response = await request.put('/api/users/1', { data: { name: 'Updated' } })
const response = await request.patch('/api/users/1', { data: { name: 'Patched' } })
const response = await request.delete('/api/users/1')

// Con opciones
await request.get('/api/users', {
  params: { page: 1, limit: 10 },
  headers: { 'Authorization': 'Bearer token' },
})

// Validar respuesta
expect(response.status()).toBe(200)
expect(response.ok()).toBeTruthy()
const json = await response.json()
expect(json).toHaveProperty('id')
```

---

## Mocking

```typescript
// Interceptar API
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Mock' }]),
  })
})

// Modificar respuesta real
await page.route('**/api/users', async route => {
  const response = await route.fetch()
  const json = await response.json()
  json.modified = true
  route.fulfill({ response, body: JSON.stringify(json) })
})

// Fallar request
await page.route('**/api/users', route => {
  route.fulfill({ status: 500 })
})

// Abortar request
await page.route('**/ads/**', route => route.abort())
```

---

## Page Object Pattern

```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(this.page).toHaveURL('/dashboard');
  }
}
```

---

## Fixtures

```typescript
// fixtures/index.ts
import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#email', 'user@test.com');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await use(page);
    await page.goto('/logout');
  },
});

export { expect } from '@playwright/test';
```

---

## Data Factory

```typescript
// data/factories/userFactory.ts
import { faker } from '@faker-js/faker';

interface User {
  email: string;
  password: string;
  name: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    name: faker.person.fullName(),
    ...overrides,
  };
}

export function createUsers(count: number): User[] {
  return Array.from({ length: count }, () => createUser());
}
```

---

## Hooks

```typescript
test.describe('Suite', () => {
  // Una vez antes de todos
  test.beforeAll(async () => { });

  // Una vez después de todos
  test.afterAll(async () => { });

  // Antes de cada test
  test.beforeEach(async ({ page }) => { });

  // Después de cada test
  test.afterEach(async ({ page }) => { });

  test('test', async ({ page }) => { });
});
```

---

## Configuración Clave

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

---

## Tags y Filtros

```typescript
// En tests
test('critical flow @smoke', async ({ page }) => { });
test('slow operation @slow', async ({ page }) => { });

// Ejecutar
// npx playwright test --grep @smoke
// npx playwright test --grep-invert @slow
```

---

*Imprimir y tener a mano durante el desarrollo*
