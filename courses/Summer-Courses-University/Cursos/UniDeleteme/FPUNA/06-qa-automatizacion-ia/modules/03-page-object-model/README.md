# Módulo 3: Page Object Model (POM)
## Diseño de Tests Mantenibles y Escalables

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Teórico-Práctico |
| **Prerrequisitos** | Módulos 1-2 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Entender el propósito y beneficios del Page Object Model
2. Diseñar Page Objects con buenas prácticas
3. Implementar BasePage para funcionalidad compartida
4. Refactorizar tests existentes a POM
5. Organizar proyectos de testing escalables

---

## Contenido

### 3.1 ¿Por qué Page Object Model? (15 min)

#### El Problema: Tests Sin Estructura

```typescript
// ❌ ANTES: Tests difíciles de mantener
test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#email').fill('test@test.com');
  await page.locator('#password').fill('password123');
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('.welcome-message')).toBeVisible();
});

test('user can add to cart', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#email').fill('test@test.com');      // Duplicado
  await page.locator('#password').fill('password123');     // Duplicado
  await page.locator('button[type="submit"]').click();     // Duplicado
  await page.locator('.product').first().click();
  await page.locator('#add-to-cart').click();
});

// Si cambia el selector de email → modificar TODOS los tests
```

#### La Solución: Page Object Model

```
PAGE OBJECT MODEL (POM)
═══════════════════════

┌─────────────────────────────────────────────┐
│                  TESTS                       │
│  ┌─────────────┐  ┌─────────────┐           │
│  │ login.spec  │  │ cart.spec   │  ...      │
│  └──────┬──────┘  └──────┬──────┘           │
│         │                │                   │
│         ▼                ▼                   │
│  ┌─────────────────────────────────────┐    │
│  │          PAGE OBJECTS               │    │
│  │  ┌──────────┐  ┌──────────┐        │    │
│  │  │LoginPage │  │ CartPage │  ...   │    │
│  │  └──────────┘  └──────────┘        │    │
│  └─────────────────────────────────────┘    │
│                    │                         │
│                    ▼                         │
│  ┌─────────────────────────────────────┐    │
│  │           BASE PAGE                 │    │
│  │  (funcionalidad común)              │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

#### Beneficios de POM

| Sin POM | Con POM |
|---------|---------|
| Selectores duplicados | Selectores en un solo lugar |
| Cambio = modificar muchos tests | Cambio = modificar una clase |
| Tests largos y confusos | Tests legibles y concisos |
| No reutilizable | Altamente reutilizable |
| Difícil de escalar | Fácil de escalar |

---

### 3.2 Anatomía de un Page Object (25 min)

#### Estructura Básica

```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // 1. Referencia a Page
  readonly page: Page;

  // 2. Locators como propiedades
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly welcomeMessage: Locator;

  // 3. Constructor
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.error-message');
    this.welcomeMessage = page.locator('.welcome');
  }

  // 4. Métodos de navegación
  async goto() {
    await this.page.goto('/login');
  }

  // 5. Métodos de acción
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  // 6. Métodos de verificación
  async expectLoginSuccess() {
    await expect(this.welcomeMessage).toBeVisible();
  }

  async expectLoginError(message?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (message) {
      await expect(this.errorMessage).toContainText(message);
    }
  }

  // 7. Métodos de obtención de datos
  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }
}
```

#### Usar el Page Object en Tests

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login exitoso', async () => {
    await loginPage.login('valid@email.com', 'password123');
    await loginPage.expectLoginSuccess();
  });

  test('error con credenciales inválidas', async () => {
    await loginPage.login('wrong@email.com', 'wrongpass');
    await loginPage.expectLoginError('Invalid credentials');
  });

  test('error con email vacío', async () => {
    await loginPage.fillPassword('password');
    await loginPage.submit();
    await loginPage.expectLoginError('Email is required');
  });
});
```

---

### 3.3 Mejores Prácticas de Page Objects (15 min)

#### ✅ Buenas Prácticas

```typescript
// ✅ 1. Un Page Object por página/componente
class LoginPage { }
class DashboardPage { }
class NavigationComponent { }

// ✅ 2. Locators como readonly
readonly emailInput: Locator;  // No puede reasignarse

// ✅ 3. Métodos que representan acciones del usuario
async login(email: string, password: string) { }
async searchProduct(query: string) { }
async addToCart() { }

// ✅ 4. Métodos que retornan Page Objects para navegación
async submitAndGoToDashboard(): Promise<DashboardPage> {
  await this.loginButton.click();
  return new DashboardPage(this.page);
}

// ✅ 5. Assertions encapsuladas
async expectProductInCart(name: string) {
  await expect(this.cartItems).toContainText(name);
}

// ✅ 6. Nombres descriptivos
async clickAddToCartButton() { }  // Claro
async selectPaymentMethod(method: string) { }  // Claro
```

#### ❌ Malas Prácticas

```typescript
// ❌ 1. Selectores hardcodeados en tests
test('login', async ({ page }) => {
  await page.locator('#email').fill('...');  // Debería estar en Page Object
});

// ❌ 2. Locators no readonly
emailInput: Locator;  // Puede reasignarse accidentalmente

// ❌ 3. Lógica de test en Page Object
async loginAndVerifyDashboard() {
  await this.login('user', 'pass');
  await expect(this.dashboard).toBeVisible();  // Assertion en PO
  expect(items.length).toBeGreaterThan(5);     // Lógica de test
}

// ❌ 4. Page Objects muy grandes
class EntireApplicationPage { }  // Demasiado amplio

// ❌ 5. Exponer Locators sin razón
getEmailLocator() { return this.emailInput; }  // Innecesario
```

---

### 3.4 BasePage y Herencia (20 min)

#### BasePage para Funcionalidad Común

```typescript
// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.loadingSpinner = page.locator('.spinner');
  }

  // Navegación común
  async goto(path: string) {
    await this.page.goto(path);
  }

  // Esperar carga
  async waitForLoad() {
    await this.loadingSpinner.waitFor({ state: 'hidden' });
  }

  // Screenshot
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  // Scroll
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  // Obtener título
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
```

#### Extender BasePage

```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);  // Llamar constructor padre
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await super.goto('/login');  // Usar método del padre
  }

  async login(email: string, password: string) {
    await this.waitForLoad();  // Método heredado
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

```typescript
// pages/DashboardPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.locator('.welcome');
    this.userMenu = page.getByRole('button', { name: 'User Menu' });
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async goto() {
    await super.goto('/dashboard');
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }

  async expectWelcome(username: string) {
    await expect(this.welcomeMessage).toContainText(username);
  }
}
```

---

### 3.5 Componentes Reutilizables (10 min)

#### Components Pattern

```typescript
// components/NavigationComponent.ts
import { Page, Locator } from '@playwright/test';

export class NavigationComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.cartCount = page.locator('.cart-count');
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartItemCount(): Promise<number> {
    const text = await this.cartCount.textContent();
    return parseInt(text || '0');
  }
}
```

#### Usar Componentes en Page Objects

```typescript
// pages/ProductPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationComponent } from '../components/NavigationComponent';

export class ProductPage extends BasePage {
  readonly navigation: NavigationComponent;  // Composición
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly price: Locator;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
    this.productTitle = page.locator('h1.product-title');
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.price = page.locator('.product-price');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async getPrice(): Promise<string> {
    return await this.price.textContent() || '';
  }
}
```

---

### 3.6 Estructura de Proyecto (10 min)

#### Estructura Recomendada

```
my-tests/
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   ├── products/
│   │   ├── catalog.spec.ts
│   │   └── product-detail.spec.ts
│   ├── checkout/
│   │   ├── cart.spec.ts
│   │   └── payment.spec.ts
│   └── api/
│       └── users.spec.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── components/
│   ├── NavigationComponent.ts
│   ├── SearchComponent.ts
│   └── ModalComponent.ts
├── fixtures/
│   └── auth.fixture.ts
├── data/
│   ├── users.ts
│   └── products.ts
├── utils/
│   └── helpers.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

#### Index de Exportación

```typescript
// pages/index.ts
export { BasePage } from './BasePage';
export { LoginPage } from './LoginPage';
export { DashboardPage } from './DashboardPage';
export { ProductPage } from './ProductPage';
export { CartPage } from './CartPage';

// Uso en tests
import { LoginPage, DashboardPage } from '../pages';
```

---

### 3.7 Ejemplo Completo (20 min)

#### Caso: E-commerce Completo

```typescript
// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
```

```typescript
// pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly featuredProducts: Locator;
  readonly categoryLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder('Search products...');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.featuredProducts = page.locator('.featured-product');
    this.categoryLinks = page.locator('.category-link');
  }

  async goto() {
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async clickFeaturedProduct(index: number) {
    await this.featuredProducts.nth(index).click();
  }

  async getFeaturedProductCount(): Promise<number> {
    return await this.featuredProducts.count();
  }
}
```

```typescript
// pages/ProductPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1.product-title');
    this.price = page.locator('.product-price');
    this.description = page.locator('.product-description');
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.quantityInput = page.getByLabel('Quantity');
    this.successMessage = page.locator('.success-message');
  }

  async addToCart(quantity: number = 1) {
    await this.quantityInput.fill(quantity.toString());
    await this.addToCartButton.click();
    await expect(this.successMessage).toBeVisible();
  }

  async getProductInfo() {
    return {
      title: await this.title.textContent(),
      price: await this.price.textContent(),
      description: await this.description.textContent(),
    };
  }
}
```

```typescript
// pages/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly subtotal: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart-item');
    this.emptyCartMessage = page.getByText('Your cart is empty');
    this.subtotal = page.locator('.subtotal');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.removeButtons = page.locator('.remove-item');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItem(index: number) {
    await this.removeButtons.nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async expectEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }
}
```

#### Tests Usando Page Objects

```typescript
// tests/ecommerce.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('E-commerce Flow', () => {

  test('buscar y agregar producto al carrito', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Act - Navegar y buscar
    await homePage.goto();
    await homePage.search('laptop');

    // Act - Seleccionar primer producto
    await homePage.clickFeaturedProduct(0);

    // Act - Agregar al carrito
    await productPage.addToCart(2);

    // Assert - Verificar carrito
    await cartPage.goto();
    await cartPage.expectItemCount(1);
  });

  test('carrito vacío muestra mensaje', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.expectEmpty();
  });

  test('puede remover items del carrito', async ({ page }) => {
    // Setup: agregar producto primero
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();
    await homePage.clickFeaturedProduct(0);
    await productPage.addToCart(1);

    // Verificar que hay 1 item
    await cartPage.goto();
    await cartPage.expectItemCount(1);

    // Remover y verificar vacío
    await cartPage.removeItem(0);
    await cartPage.expectEmpty();
  });
});
```

---

## Puntos Clave

1. **POM separa selectores de tests:** Mantenibilidad mejorada
2. **BasePage evita duplicación:** Funcionalidad común heredada
3. **Componentes para partes reutilizables:** Navigation, Modal, etc.
4. **Métodos descriptivos:** login(), addToCart(), no click()
5. **Assertions en Page Objects:** expectLoginError(), expectEmpty()

---

*Siguiente módulo: IA para Generación de Tests*
