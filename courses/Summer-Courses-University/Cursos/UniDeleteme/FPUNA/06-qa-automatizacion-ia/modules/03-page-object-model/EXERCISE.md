# Ejercicio: Módulo 3
## Refactorizar Tests a Page Object Model

---

## Objetivo

Tomar los tests del Módulo 2 y refactorizarlos usando el patrón Page Object Model.

**Duración:** 30 minutos

---

## Parte 1: Crear Estructura de Carpetas (5 minutos)

### Crear directorios

```bash
mkdir -p pages
mkdir -p components
```

### Estructura final esperada

```
qa-automation-fpuna/
├── pages/
│   ├── BasePage.ts
│   └── LoginPage.ts
├── components/
│   └── AlertComponent.ts
├── tests/
│   └── login.spec.ts
└── playwright.config.ts
```

---

## Parte 2: Crear BasePage (5 minutos)

### Crear `pages/BasePage.ts`

```typescript
// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // COMPLETAR: Método para navegar
  async goto(path: string) {
    await this.page._______(path);
  }

  // COMPLETAR: Método para obtener título
  async getTitle(): Promise<string> {
    return await this.page._______();
  }

  // COMPLETAR: Método para esperar
  async waitForURL(urlPattern: RegExp) {
    await this.page._______________(urlPattern);
  }

  // Método para tomar screenshot
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
```

---

## Parte 3: Crear LoginPage (10 minutos)

### Crear `pages/LoginPage.ts`

```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // COMPLETAR: Definir locators como readonly
  readonly usernameInput: _______;
  readonly passwordInput: _______;
  readonly loginButton: _______;
  readonly flashMessage: _______;

  constructor(page: Page) {
    super(page);

    // COMPLETAR: Inicializar locators
    this.usernameInput = page.locator('#_______');
    this.passwordInput = page.locator('#_______');
    this.loginButton = page.getByRole('_______', { name: /login/i });
    this.flashMessage = page.locator('.flash');
  }

  // Navegación específica
  async goto() {
    await super.goto('https://the-internet.herokuapp.com/login');
  }

  // COMPLETAR: Método para login completo
  async login(username: string, password: string) {
    await this.usernameInput._______(username);
    await this.passwordInput._______(password);
    await this.loginButton._______();
  }

  // Métodos de verificación
  async expectLoginSuccess() {
    await expect(this.flashMessage).toContainText('You logged into');
  }

  async expectLoginError(errorType: 'username' | 'password') {
    await expect(this.flashMessage).toBeVisible();
    await expect(this.flashMessage).toContainText(errorType);
  }

  // COMPLETAR: Método para verificar que estamos en página de login
  async expectToBeOnLoginPage() {
    await expect(this.page).toHaveURL(/_______/);
  }

  // Obtener mensaje de error
  async getFlashMessageText(): Promise<string> {
    return await this.flashMessage.textContent() || '';
  }
}
```

---

## Parte 4: Crear SecureAreaPage (5 minutos)

### Crear `pages/SecureAreaPage.ts`

```typescript
// pages/SecureAreaPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SecureAreaPage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);
    // COMPLETAR: Inicializar locators
    this.welcomeMessage = page.locator('h2');
    this.logoutButton = page.getByRole('_______', { name: /logout/i });
    this.flashMessage = page.locator('.flash');
  }

  // COMPLETAR: Método para logout
  async logout() {
    await this.logoutButton._______();
  }

  async expectToBeLoggedIn() {
    await expect(this.page).toHaveURL(/secure/);
    await expect(this.welcomeMessage).toBeVisible();
  }
}
```

---

## Parte 5: Refactorizar Tests (10 minutos)

### Antes (sin POM):

```typescript
// tests/login-old.spec.ts
test('login exitoso', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page).toHaveURL(/secure/);
});
```

### Después (con POM):

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecureAreaPage } from '../pages/SecureAreaPage';

test.describe('Login Tests - Page Object Model', () => {

  test('login exitoso con credenciales válidas', async ({ page }) => {
    // COMPLETAR: Crear instancias de page objects
    const loginPage = new _______(page);
    const secureArea = new _______(page);

    // Navegar
    await loginPage._______();

    // Login
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Verificar
    await secureArea._____________();
  });

  test('muestra error con usuario incorrecto', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'SuperSecretPassword!');

    // COMPLETAR: Verificar error
    await loginPage.expectLoginError('_______');
  });

  test('muestra error con contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'wrongpassword');

    await loginPage.expectLoginError('password');
  });

  test('puede hacer logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const secureArea = new SecureAreaPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // COMPLETAR: Logout
    await secureArea._______();

    // Verificar vuelta a login
    await loginPage.expectToBeOnLoginPage();
  });
});
```

---

## Soluciones

### BasePage Completo:

```typescript
// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForURL(urlPattern: RegExp) {
    await this.page.waitForURL(urlPattern);
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
```

### LoginPage Completo:

```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.flashMessage = page.locator('.flash');
  }

  async goto() {
    await super.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.flashMessage).toContainText('You logged into');
  }

  async expectLoginError(errorType: 'username' | 'password') {
    await expect(this.flashMessage).toBeVisible();
    await expect(this.flashMessage).toContainText(errorType);
  }

  async expectToBeOnLoginPage() {
    await expect(this.page).toHaveURL(/login/);
  }

  async getFlashMessageText(): Promise<string> {
    return await this.flashMessage.textContent() || '';
  }
}
```

### Tests Completos:

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecureAreaPage } from '../pages/SecureAreaPage';

test.describe('Login Tests - Page Object Model', () => {

  test('login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const secureArea = new SecureAreaPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await secureArea.expectToBeLoggedIn();
  });

  test('muestra error con usuario incorrecto', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'SuperSecretPassword!');
    await loginPage.expectLoginError('username');
  });

  test('muestra error con contraseña incorrecta', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'wrongpassword');
    await loginPage.expectLoginError('password');
  });

  test('puede hacer logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const secureArea = new SecureAreaPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await secureArea.logout();
    await loginPage.expectToBeOnLoginPage();
  });
});
```

---

## Ejecutar Tests

```bash
# Ejecutar todos los tests
npx playwright test

# Solo tests de login
npx playwright test login.spec.ts

# Modo headed
npx playwright test --headed

# Ver reporte
npx playwright show-report
```

---

## Checklist de Entrega

- [ ] `pages/BasePage.ts` creado
- [ ] `pages/LoginPage.ts` creado con extends BasePage
- [ ] `pages/SecureAreaPage.ts` creado
- [ ] Tests refactorizados usando Page Objects
- [ ] Todos los tests pasan
- [ ] No hay selectores hardcodeados en tests

---

## Comparación: Antes vs Después

| Aspecto | Sin POM | Con POM |
|---------|---------|---------|
| Líneas de test | 6-8 por test | 3-4 por test |
| Cambio de selector | Modificar todos los tests | Modificar solo Page Object |
| Legibilidad | Selectores técnicos | Métodos descriptivos |
| Reutilización | Copy/paste | Instanciar y usar |

---

## Reflexión

1. ¿Cuánto más fácil fue escribir el 4to test usando POM?

   _______________________________________________

2. Si el selector de username cambia, ¿cuántos archivos modificas ahora?

   _______________________________________________

3. ¿Qué métodos agregarías al LoginPage para hacerlo más completo?

   _______________________________________________

---

*Tiempo total: 30 minutos*
