# Mejores Prácticas de QA Automation
## Guía para Tests Robustos y Mantenibles

---

## 1. Organización de Tests

### Estructura de Archivos

```
tests/
├── e2e/
│   ├── auth/           # Por feature
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   └── checkout/
│       ├── cart.spec.ts
│       └── payment.spec.ts
├── api/
│   └── users.spec.ts
└── smoke.spec.ts       # Tests críticos
```

### Naming Conventions

```typescript
// Archivos: feature.spec.ts
login.spec.ts
product-catalog.spec.ts
user-profile.spec.ts

// describe: Feature bajo test
test.describe('User Authentication', () => {

  // test: Acción + Resultado esperado
  test('shows error when password is incorrect', async () => {});
  test('redirects to dashboard after successful login', async () => {});
  test('remembers user when "remember me" is checked', async () => {});
});
```

---

## 2. Selectores Robustos

### Jerarquía de Preferencia

```typescript
// 1. Roles (más accesibles y estables)
page.getByRole('button', { name: 'Submit' })

// 2. Test IDs (control explícito)
page.getByTestId('login-button')

// 3. Labels (semántico)
page.getByLabel('Email address')

// 4. Placeholder (cuando no hay label)
page.getByPlaceholder('Enter your email')

// 5. Text (visible al usuario)
page.getByText('Welcome back')

// 6. CSS (último recurso)
page.locator('button.submit-btn')
```

### Evitar

```typescript
// Selectores frágiles
page.locator('#react-root > div > form > button:nth-child(3)')
page.locator('.css-1234abcd')  // Clases generadas
page.locator('[class*="Button"]')  // Clases parciales

// IDs dinámicos
page.locator('#user-123')  // ID puede cambiar
```

### Mejores Prácticas

```typescript
// Agregar data-testid en el código
<button data-testid="submit-order">Place Order</button>

// Usar en test
await page.getByTestId('submit-order').click();
```

---

## 3. Page Object Model

### Estructura Correcta

```typescript
// pages/LoginPage.ts
export class LoginPage {
  // Locators como readonly
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(readonly page: Page) {
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // Métodos de acción (verbos)
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Métodos de navegación
  async goto() {
    await this.page.goto('/login');
  }

  // Métodos de verificación (expect...)
  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async expectError(message: string) {
    await expect(this.page.getByRole('alert')).toContainText(message);
  }
}
```

### No Hacer

```typescript
// Lógica de test en Page Object
async loginAndVerifyAndLogout() {
  await this.login('user', 'pass');
  expect(this.page.url()).toContain('dashboard'); // Assertion aquí
  await this.logout();
  expect(this.page.url()).toContain('login'); // Otra assertion
}

// Page Objects muy grandes
class EntireAppPage { /* 500 líneas */ }

// Exponer locators innecesariamente
getEmailLocator() { return this.emailInput; }
```

---

## 4. Independencia de Tests

### Cada Test Debe

```typescript
test.describe('User Profile', () => {

  test.beforeEach(async ({ page }) => {
    // Setup: cada test empieza con estado conocido
    await page.goto('/login');
    await loginAs('testuser@test.com', 'password');
  });

  test('can update name', async ({ page }) => {
    // Este test no depende de otros
    await page.goto('/profile');
    await page.fill('#name', 'New Name');
    await page.click('button[type="submit"]');
    await expect(page.getByText('New Name')).toBeVisible();
  });

  test('can update email', async ({ page }) => {
    // Completamente independiente del anterior
    await page.goto('/profile');
    await page.fill('#email', 'newemail@test.com');
    await page.click('button[type="submit"]');
    await expect(page.getByText('newemail@test.com')).toBeVisible();
  });
});
```

### Evitar Dependencias

```typescript
// NO: Tests dependientes
let userId: string;

test('create user', async () => {
  const response = await request.post('/users', { data: {...} });
  userId = response.id;  // Guardado para siguiente test
});

test('update user', async () => {
  await request.put(`/users/${userId}`, { data: {...} });  // Falla si anterior falla
});

// Mejor: Cada test crea su propio usuario
test('can update user', async ({ request }) => {
  const createResponse = await request.post('/users', { data: {...} });
  const userId = createResponse.id;

  await request.put(`/users/${userId}`, { data: {...} });
  // cleanup
  await request.delete(`/users/${userId}`);
});
```

---

## 5. Datos de Prueba

### Usar Factories

```typescript
// data/factories/userFactory.ts
import { faker } from '@faker-js/faker';

export function createUser(overrides = {}) {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
    ...overrides,
  };
}

// En test
test('register new user', async ({ page }) => {
  const user = createUser();  // Datos únicos

  await page.fill('#email', user.email);
  await page.fill('#password', user.password);
  await page.click('button[type="submit"]');

  await expect(page.getByText(`Welcome, ${user.name}`)).toBeVisible();
});
```

### Cleanup

```typescript
test('user CRUD', async ({ request }) => {
  // Crear
  const user = createUser();
  const response = await request.post('/users', { data: user });
  const userId = (await response.json()).id;

  try {
    // Test...
    await request.put(`/users/${userId}`, { data: { name: 'Updated' } });
  } finally {
    // Cleanup siempre
    await request.delete(`/users/${userId}`);
  }
});
```

---

## 6. Assertions Efectivas

### Ser Específico

```typescript
// Mal: muy genérico
await expect(page).toHaveURL('/dashboard');

// Mejor: específico
await expect(page).toHaveURL('/dashboard');
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
await expect(page.getByText(`Welcome, ${user.name}`)).toBeVisible();
```

### Usar Assertions Apropiadas

```typescript
// Visibilidad
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();

// Texto
await expect(locator).toHaveText('Exacto');
await expect(locator).toContainText('parcial');

// Estado
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();
await expect(locator).toBeChecked();

// Valores
await expect(input).toHaveValue('valor');
await expect(input).toBeEmpty();

// Conteo
await expect(items).toHaveCount(5);

// URL/Título
await expect(page).toHaveURL(/pattern/);
await expect(page).toHaveTitle('Title');
```

---

## 7. Evitar Flaky Tests

### Causas Comunes

```typescript
// Problema: timing issues
await page.click('button');
await expect(page.getByText('Done')).toBeVisible();  // Puede fallar

// Solución: Playwright auto-wait
// El expect ya espera automáticamente

// Problema: datos compartidos
test('test 1', () => { globalData = 'test1'; });
test('test 2', () => { expect(globalData).toBe('test1'); });  // Orden no garantizado

// Solución: datos independientes
test('test 1', () => { const data = createData(); });
test('test 2', () => { const data = createData(); });

// Problema: estado del servidor
test('shows 5 items', async ({ page }) => {
  await page.goto('/items');
  await expect(page.locator('.item')).toHaveCount(5);  // Depende del DB
});

// Solución: mockear o crear datos
test('shows items', async ({ page }) => {
  await page.route('**/api/items', route =>
    route.fulfill({ body: JSON.stringify(mockItems) })
  );
  await page.goto('/items');
  await expect(page.locator('.item')).toHaveCount(mockItems.length);
});
```

### Configuración Anti-Flaky

```typescript
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,  // Reintentos en CI
  use: {
    actionTimeout: 10000,  // Timeout para acciones
    navigationTimeout: 30000,  // Timeout para navegación
  },
  expect: {
    timeout: 5000,  // Timeout para assertions
  },
});
```

---

## 8. Documentación

### Comentarios Útiles

```typescript
// Explicar el "por qué", no el "qué"
test('shows error when submitting empty form', async ({ page }) => {
  // Skip filling form intentionally to test validation
  await page.click('button[type="submit"]');

  // Error should appear without page reload (client-side validation)
  await expect(page.getByRole('alert')).toBeVisible();
});
```

### README del Proyecto

```markdown
# QA Automation

## Quick Start
```bash
npm install
npx playwright install
npm test
```

## Running Tests
- `npm test` - All tests
- `npm run test:smoke` - Critical tests only
- `npm run test:ui` - Interactive mode

## Project Structure
- `tests/` - Test files
- `pages/` - Page Objects
- `fixtures/` - Custom fixtures
```

---

## 9. CI/CD

### Pipeline Recomendado

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: report
          path: playwright-report/
```

### Configuración para CI

```typescript
// playwright.config.ts
export default defineConfig({
  forbidOnly: !!process.env.CI,  // Falla si hay .only
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,  // Estabilidad en CI
  reporter: [
    ['html', { open: 'never' }],
    ['github'],  // Anotaciones en PRs
  ],
});
```

---

## 10. Code Review Checklist

### Para Tests

- [ ] Test es independiente
- [ ] Nombre describe comportamiento
- [ ] Usa Page Objects
- [ ] Selectores robustos (getByRole preferido)
- [ ] Assertions específicas
- [ ] No hay waits hardcodeados
- [ ] Datos de prueba únicos
- [ ] Cleanup si crea recursos

### Para Page Objects

- [ ] Locators son readonly
- [ ] Métodos tienen nombres descriptivos
- [ ] No contiene lógica de test
- [ ] Extiende de BasePage si aplica
- [ ] Documentación de métodos públicos

---

*Referencia rápida para revisiones de código y desarrollo*
