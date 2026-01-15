# QA Track Module 5: Test Framework Development
## FPUNA Summer 2026 - Week 8 (QA Automation Specialization)

**Duration**: 10 hours (Week 8 of program)  
**Tool Focus**: Playwright + TypeScript + OpenCode  
**Prerequisites**: Core Modules 1-6, QA Modules 1-4 completed

---

## Module Overview

You've mastered testing techniques and automation. Now it's time to think like a framework architect! This week, you'll learn how to build robust, reusable test frameworks that scale from dozens to thousands of tests. You'll create custom fixtures, utilities, and abstractions that make test writing faster, more maintainable, and more enjoyable for your entire team.

### Learning Objectives

By the end of this week, you will be able to:

1. **Design** scalable test framework architectures
2. **Create** custom Playwright fixtures and hooks
3. **Implement** advanced Page Object Model patterns
4. **Build** reusable test utilities and helpers
5. **Manage** test data systematically
6. **Document** framework usage for team adoption
7. **Maintain** and evolve frameworks over time

---

## Why Framework Development Matters

### The Scaling Problem

```
Without Framework:
10 tests → Easy to maintain
100 tests → Starting to repeat code
1,000 tests → Maintenance nightmare
- Copy-paste everywhere
- Inconsistent patterns
- Hard to update
- Slow to write new tests

With Framework:
10 tests → Slight overhead
100 tests → Productivity boost
1,000 tests → Massive time savings
- Reusable components
- Consistent patterns
- Easy updates
- Fast test authoring
```

**Industry Reality**:
- Well-designed frameworks reduce test authoring time by 60%
- Frameworks improve test maintainability by 80%
- Companies with strong frameworks ship features 3x faster

---

## 5.1 Framework Architecture Design

### The Three-Layer Architecture

```
┌────────────────────────────────────────┐
│         TEST LAYER                     │
│  (Business logic, test scenarios)      │
│  - login.spec.ts                       │
│  - checkout.spec.ts                    │
└────────────┬───────────────────────────┘
             │ Uses
┌────────────▼───────────────────────────┐
│         PAGE OBJECT LAYER              │
│  (UI interactions abstraction)         │
│  - LoginPage.ts                        │
│  - CheckoutPage.ts                     │
└────────────┬───────────────────────────┘
             │ Uses
┌────────────▼───────────────────────────┐
│         FRAMEWORK LAYER                │
│  (Core utilities, fixtures, helpers)   │
│  - fixtures.ts                         │
│  - test-helpers.ts                     │
│  - data-factory.ts                     │
└────────────────────────────────────────┘
```

**Benefits**:
- **Separation of Concerns**: Each layer has clear responsibility
- **Reusability**: Lower layers used by multiple upper layers
- **Maintainability**: Changes isolated to appropriate layer
- **Testability**: Each layer testable independently

---

### Framework Design Principles

1. **DRY (Don't Repeat Yourself)**: Extract common code
2. **Single Responsibility**: Each component does one thing well
3. **Open/Closed**: Open for extension, closed for modification
4. **Dependency Injection**: Pass dependencies, don't hardcode
5. **Convention over Configuration**: Smart defaults
6. **Progressive Enhancement**: Start simple, add complexity as needed

---

## 5.2 Custom Playwright Fixtures

### What are Fixtures?

Fixtures provide test setup, teardown, and dependencies. They're Playwright's dependency injection system.

**Built-in Fixtures**: `page`, `context`, `browser`, `request`

**Custom Fixtures**: You create them!

---

### Creating Your First Custom Fixture

```typescript
// tests/fixtures/base-fixtures.ts
import { test as base, expect } from '@playwright/test';

// Define fixture types
type TestFixtures = {
  authenticatedPage: Page;
  testUser: User;
};

// Extend base test with custom fixtures
export const test = base.extend<TestFixtures>({
  // Fixture: Authenticated page
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login before test
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@fpuna.edu.py');
    await page.fill('[name="password"]', 'TestPass123!');
    await page.click('[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Provide page to test
    await use(page);
    
    // Teardown: Logout after test
    await page.click('[data-testid="logout"]');
  },

  // Fixture: Test user data
  testUser: async ({}, use) => {
    const user = {
      name: 'María González',
      email: 'maria.test@fpuna.edu.py',
      password: 'TestPass123!',
      role: 'user'
    };
    
    await use(user);
    
    // Cleanup if needed
  }
});

export { expect };
```

**Usage**:
```typescript
// tests/dashboard.spec.ts
import { test, expect } from './fixtures/base-fixtures';

test('user can view dashboard', async ({ authenticatedPage, testUser }) => {
  // Page is already authenticated!
  await expect(authenticatedPage.getByText(`Welcome ${testUser.name}`)).toBeVisible();
});
```

---

### Advanced Fixture: API Client

```typescript
// tests/fixtures/api-fixtures.ts
import { test as base } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';

type ApiFixtures = {
  apiClient: APIClient;
  authenticatedApi: APIRequestContext;
};

class APIClient {
  constructor(private request: APIRequestContext, private baseURL: string) {}

  async createUser(userData: any) {
    const response = await this.request.post(`${this.baseURL}/api/users`, {
      data: userData
    });
    return response.json();
  }

  async getUser(userId: string) {
    const response = await this.request.get(`${this.baseURL}/api/users/${userId}`);
    return response.json();
  }

  async deleteUser(userId: string) {
    return this.request.delete(`${this.baseURL}/api/users/${userId}`);
  }

  async createProduct(productData: any) {
    const response = await this.request.post(`${this.baseURL}/api/products`, {
      data: productData
    });
    return response.json();
  }
}

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';
    const client = new APIClient(request, baseURL);
    await use(client);
  },

  authenticatedApi: async ({ request }, use) => {
    // Login and get token
    const response = await request.post('http://localhost:3000/api/login', {
      data: {
        email: 'admin@fpuna.edu.py',
        password: 'AdminPass123!'
      }
    });
    const { token } = await response.json();

    // Create authenticated context
    const context = await request.newContext({
      extraHTTPHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    await use(context);
    await context.dispose();
  }
});
```

**Usage**:
```typescript
test('can create and delete user via API', async ({ apiClient }) => {
  // Create user
  const user = await apiClient.createUser({
    name: 'Test User',
    email: 'test@example.com',
    password: 'Pass123!'
  });

  expect(user.id).toBeDefined();

  // Delete user
  await apiClient.deleteUser(user.id);
});
```

---

### Fixture: Database Management

```typescript
// tests/fixtures/database-fixtures.ts
import { test as base } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

type DatabaseFixtures = {
  db: PrismaClient;
  cleanDatabase: void;
};

export const test = base.extend<DatabaseFixtures>({
  db: async ({}, use) => {
    const prisma = new PrismaClient();
    await use(prisma);
    await prisma.$disconnect();
  },

  cleanDatabase: [async ({ db }, use) => {
    // Setup: Clean database before test
    await db.order.deleteMany();
    await db.product.deleteMany();
    await db.user.deleteMany();

    await use();

    // Teardown: Clean after test
    await db.order.deleteMany();
    await db.product.deleteMany();
    await db.user.deleteMany();
  }, { auto: true }]  // Auto-use in every test
});
```

---

### Composing Multiple Fixtures

```typescript
// tests/fixtures/index.ts
import { test as base } from '@playwright/test';
import { test as apiTest } from './api-fixtures';
import { test as dbTest } from './database-fixtures';
import { test as authTest } from './auth-fixtures';

// Merge all fixtures
export const test = base.extend({
  ...apiTest,
  ...dbTest,
  ...authTest
});

export { expect } from '@playwright/test';
```

**Usage**:
```typescript
import { test, expect } from './fixtures';

test('complete user journey', async ({ 
  authenticatedPage, 
  apiClient, 
  db, 
  testUser 
}) => {
  // All fixtures available!
});
```

---

## 5.3 Advanced Page Object Model

### Traditional vs. Advanced POM

**Traditional POM** (Basic):
```typescript
class LoginPage {
  constructor(private page: Page) {}
  
  async login(email: string, password: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('#submit');
  }
}
```

**Advanced POM** (Better):
```typescript
class LoginPage extends BasePage {
  // Locators as getters (evaluated lazily)
  get emailInput() { return this.page.getByLabel('Email'); }
  get passwordInput() { return this.page.getByLabel('Password'); }
  get submitButton() { return this.page.getByRole('button', { name: 'Sign in' }); }
  get errorMessage() { return this.page.getByRole('alert'); }

  // Actions return next page
  async loginAs(user: User): Promise<DashboardPage> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
    await this.page.waitForURL('/dashboard');
    return new DashboardPage(this.page);
  }

  async loginExpectingError(email: string, password: string): Promise<string> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    return this.errorMessage.textContent();
  }

  // Assertions
  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }
}
```

---

### Base Page Class

```typescript
// tests/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  // Common navigation
  async goto(path: string = '') {
    const baseURL = process.env.BASE_URL || 'http://localhost:3000';
    await this.page.goto(`${baseURL}${path}`);
  }

  async reload() {
    await this.page.reload();
  }

  // Common interactions
  async clickAndWaitForNavigation(locator: Locator) {
    await Promise.all([
      this.page.waitForNavigation(),
      locator.click()
    ]);
  }

  async fillForm(data: Record<string, string>) {
    for (const [label, value] of Object.entries(data)) {
      await this.page.getByLabel(label).fill(value);
    }
  }

  // Common waits
  async waitForLoading() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  // Common assertions
  async expectURL(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async expectTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  // Screenshot helper
  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `screenshots/${name}.png`,
      fullPage: true 
    });
  }
}
```

---

### Component-Based POM

```typescript
// tests/components/Header.component.ts
export class HeaderComponent {
  constructor(private page: Page) {}

  get logo() { return this.page.getByRole('img', { name: 'Logo' }); }
  get searchInput() { return this.page.getByPlaceholder('Search...'); }
  get cartIcon() { return this.page.getByTestId('cart-icon'); }
  get cartBadge() { return this.page.getByTestId('cart-badge'); }
  get userMenu() { return this.page.getByTestId('user-menu'); }
  get loginLink() { return this.page.getByRole('link', { name: 'Login' }); }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async getCartItemCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return parseInt(text || '0');
  }

  async logout() {
    await this.userMenu.click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
  }
}

// tests/pages/ProductsPage.ts
export class ProductsPage extends BasePage {
  // Compose with components
  readonly header = new HeaderComponent(this.page);

  get productCards() { return this.page.locator('.product-card'); }
  get filterButton() { return this.page.getByRole('button', { name: 'Filters' }); }

  async searchProducts(query: string) {
    await this.header.search(query);
    await this.waitForLoading();
  }

  async addToCart(productName: string) {
    const productCard = this.page.locator('.product-card')
      .filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Add to Cart' }).click();
  }

  async expectCartCount(count: number) {
    await expect(this.header.cartBadge).toHaveText(count.toString());
  }
}
```

---

### Page Object with Fluent Interface

```typescript
// tests/pages/CheckoutPage.ts
export class CheckoutPage extends BasePage {
  async fillShippingInfo(info: ShippingInfo) {
    await this.page.getByLabel('Full Name').fill(info.name);
    await this.page.getByLabel('Address').fill(info.address);
    await this.page.getByLabel('City').fill(info.city);
    await this.page.getByLabel('ZIP Code').fill(info.zipCode);
    return this; // Return this for chaining
  }

  async selectShippingMethod(method: 'standard' | 'express' | 'overnight') {
    await this.page.getByLabel(method).check();
    return this;
  }

  async fillPaymentInfo(payment: PaymentInfo) {
    await this.page.getByLabel('Card Number').fill(payment.cardNumber);
    await this.page.getByLabel('Expiry Date').fill(payment.expiryDate);
    await this.page.getByLabel('CVV').fill(payment.cvv);
    return this;
  }

  async placeOrder(): Promise<OrderConfirmationPage> {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await this.page.waitForURL('/order-confirmation');
    return new OrderConfirmationPage(this.page);
  }
}

// Usage with fluent interface
test('complete checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  
  const confirmationPage = await checkoutPage
    .fillShippingInfo({
      name: 'María González',
      address: 'Av. España 123',
      city: 'Asunción',
      zipCode: '1234'
    })
    .selectShippingMethod('express')
    .fillPaymentInfo({
      cardNumber: '4242424242424242',
      expiryDate: '12/25',
      cvv: '123'
    })
    .placeOrder();

  await confirmationPage.expectOrderSuccess();
});
```

---

## 5.4 Test Utilities & Helpers

### Test Data Factory

```typescript
// tests/utils/data-factory.ts
import { faker } from '@faker-js/faker';

export class DataFactory {
  static user(overrides?: Partial<User>): User {
    return {
      id: faker.string.uuid(),
      name: faker.helpers.arrayElement([
        'María González',
        'Carlos Ramírez',
        'Ana Martínez',
        'José López',
        'Laura Silva'
      ]),
      email: faker.internet.email(),
      password: 'TestPass123!',
      role: 'user',
      createdAt: faker.date.past(),
      ...overrides
    };
  }

  static adminUser(overrides?: Partial<User>): User {
    return this.user({ role: 'admin', ...overrides });
  }

  static product(overrides?: Partial<Product>): Product {
    return {
      id: faker.string.uuid(),
      name: faker.helpers.arrayElement([
        'Chipa',
        'Sopa Paraguaya',
        'Tereré',
        'Empanada',
        'Mbeju'
      ]),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 1000, max: 50000 }),
      category: faker.helpers.arrayElement([
        'Comida Típica',
        'Bebidas',
        'Postres'
      ]),
      inStock: faker.datatype.boolean(0.9),
      ...overrides
    };
  }

  static order(overrides?: Partial<Order>): Order {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const items = Array.from({ length: itemCount }, () => this.orderItem());
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      id: faker.string.uuid(),
      user: this.user(),
      items,
      total,
      status: 'pending',
      createdAt: faker.date.recent(),
      ...overrides
    };
  }

  static orderItem(overrides?: Partial<OrderItem>): OrderItem {
    return {
      id: faker.string.uuid(),
      product: this.product(),
      quantity: faker.number.int({ min: 1, max: 5 }),
      price: faker.number.int({ min: 1000, max: 50000 }),
      ...overrides
    };
  }

  static address(overrides?: Partial<Address>): Address {
    return {
      street: 'Av. España ' + faker.number.int({ min: 100, max: 9999 }),
      city: faker.helpers.arrayElement(['Asunción', 'Ciudad del Este', 'Encarnación']),
      zipCode: faker.string.numeric(4),
      country: 'Paraguay',
      ...overrides
    };
  }
}
```

---

### Wait Utilities

```typescript
// tests/utils/wait-utils.ts
import { Page, Locator } from '@playwright/test';

export class WaitUtils {
  static async waitForText(
    locator: Locator, 
    text: string, 
    timeout: number = 10000
  ) {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toHaveText(text, { timeout });
  }

  static async waitForCount(
    locator: Locator, 
    count: number, 
    timeout: number = 10000
  ) {
    await expect(locator).toHaveCount(count, { timeout });
  }

  static async waitForURL(
    page: Page, 
    url: string | RegExp, 
    timeout: number = 10000
  ) {
    await page.waitForURL(url, { timeout });
  }

  static async waitForAPIResponse(
    page: Page, 
    urlPattern: string | RegExp,
    timeout: number = 10000
  ) {
    const responsePromise = page.waitForResponse(
      response => {
        const url = response.url();
        if (typeof urlPattern === 'string') {
          return url.includes(urlPattern);
        }
        return urlPattern.test(url);
      },
      { timeout }
    );
    return responsePromise;
  }

  static async waitForNetworkIdle(page: Page) {
    await page.waitForLoadState('networkidle');
  }

  static async retry<T>(
    fn: () => Promise<T>,
    options: { retries?: number; delay?: number } = {}
  ): Promise<T> {
    const { retries = 3, delay = 1000 } = options;
    
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Retry failed');
  }
}
```

---

### Assertion Helpers

```typescript
// tests/utils/assertion-utils.ts
import { expect, Page, Locator } from '@playwright/test';

export class AssertionUtils {
  static async assertURLContains(page: Page, substring: string) {
    const url = page.url();
    expect(url).toContain(substring);
  }

  static async assertElementCount(locator: Locator, count: number) {
    await expect(locator).toHaveCount(count);
  }

  static async assertTextMatches(locator: Locator, pattern: RegExp) {
    await expect(locator).toHaveText(pattern);
  }

  static async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  static async assertNotVisible(locator: Locator) {
    await expect(locator).not.toBeVisible();
  }

  static async assertDisabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }

  static async assertEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  static async assertHasClass(locator: Locator, className: string) {
    await expect(locator).toHaveClass(new RegExp(className));
  }

  static async assertAPIResponse(
    response: any,
    expectedStatus: number,
    expectedBody?: any
  ) {
    expect(response.status()).toBe(expectedStatus);
    
    if (expectedBody) {
      const body = await response.json();
      expect(body).toMatchObject(expectedBody);
    }
  }

  static async assertArrayContains<T>(
    actual: T[],
    expected: Partial<T>
  ) {
    const match = actual.some(item =>
      Object.entries(expected).every(([key, value]) =>
        item[key as keyof T] === value
      )
    );
    expect(match).toBeTruthy();
  }
}
```

---

### Screenshot & Video Utilities

```typescript
// tests/utils/media-utils.ts
import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class MediaUtils {
  private static screenshotDir = 'test-results/screenshots';
  private static videoDir = 'test-results/videos';

  static async captureScreenshot(
    page: Page,
    name: string,
    options: { fullPage?: boolean; clip?: any } = {}
  ) {
    const dir = this.screenshotDir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    const filepath = path.join(dir, filename);

    await page.screenshot({
      path: filepath,
      fullPage: options.fullPage ?? true,
      clip: options.clip
    });

    return filepath;
  }

  static async captureElementScreenshot(
    locator: Locator,
    name: string
  ) {
    const dir = this.screenshotDir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    const filepath = path.join(dir, filename);

    await locator.screenshot({ path: filepath });

    return filepath;
  }

  static async startVideoRecording(page: Page) {
    // Video recording configured in playwright.config.ts
    // This is just a reference implementation
    console.log('Video recording started for:', page.url());
  }

  static async stopVideoRecording(page: Page) {
    const video = page.video();
    if (video) {
      const path = await video.path();
      console.log('Video saved to:', path);
      return path;
    }
  }
}
```

---

## 5.5 Test Data Management

### Database Seeding

```typescript
// tests/utils/db-seeder.ts
import { PrismaClient } from '@prisma/client';
import { DataFactory } from './data-factory';

export class DatabaseSeeder {
  constructor(private db: PrismaClient) {}

  async seedUsers(count: number = 10) {
    const users = Array.from({ length: count }, () => 
      DataFactory.user()
    );

    return Promise.all(
      users.map(user => this.db.user.create({ data: user }))
    );
  }

  async seedProducts(count: number = 20) {
    const products = Array.from({ length: count }, () =>
      DataFactory.product()
    );

    return Promise.all(
      products.map(product => this.db.product.create({ data: product }))
    );
  }

  async seedOrders(userId: string, count: number = 5) {
    const products = await this.db.product.findMany({ take: 10 });
    const orders = Array.from({ length: count }, () =>
      DataFactory.order({
        user: { connect: { id: userId } }
      })
    );

    return Promise.all(
      orders.map(order => this.db.order.create({ 
        data: {
          ...order,
          items: {
            create: order.items.map(item => ({
              productId: products[Math.floor(Math.random() * products.length)].id,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      }))
    );
  }

  async seedAll() {
    console.log('🌱 Seeding database...');
    
    const users = await this.seedUsers(10);
    console.log(`✅ Created ${users.length} users`);
    
    const products = await this.seedProducts(20);
    console.log(`✅ Created ${products.length} products`);
    
    for (const user of users.slice(0, 5)) {
      await this.seedOrders(user.id, 3);
    }
    console.log(`✅ Created orders for 5 users`);
    
    console.log('🎉 Database seeded successfully!');
  }

  async cleanAll() {
    await this.db.orderItem.deleteMany();
    await this.db.order.deleteMany();
    await this.db.product.deleteMany();
    await this.db.user.deleteMany();
  }
}
```

---

### Test Data Files

```typescript
// tests/data/test-users.json
{
  "admin": {
    "email": "admin@fpuna.edu.py",
    "password": "AdminPass123!",
    "role": "admin"
  },
  "regularUser": {
    "email": "user@fpuna.edu.py",
    "password": "UserPass123!",
    "role": "user"
  },
  "guest": {
    "email": "guest@fpuna.edu.py",
    "password": "GuestPass123!",
    "role": "guest"
  }
}
```

```typescript
// tests/utils/test-data-loader.ts
import fs from 'fs';
import path from 'path';

export class TestDataLoader {
  static loadJSON<T>(filename: string): T {
    const filepath = path.join(__dirname, '../data', filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(content);
  }

  static getUser(type: 'admin' | 'regularUser' | 'guest') {
    const users = this.loadJSON<any>('test-users.json');
    return users[type];
  }

  static getProducts() {
    return this.loadJSON<Product[]>('test-products.json');
  }
}
```

---

## 5.6 Framework Documentation

### README Template

```markdown
# Test Framework Documentation

## Overview

This test framework provides a robust, scalable foundation for automated testing.

## Architecture

```
tests/
├── fixtures/           # Custom Playwright fixtures
├── pages/              # Page Object Models
├── components/         # Reusable UI components
├── utils/              # Helper utilities
├── data/               # Test data files
└── specs/              # Test specifications
```

## Quick Start

### Installation

```bash
npm install
npx playwright install
```

### Running Tests

```bash
# All tests
npm test

# Specific file
npm test login.spec.ts

# With UI mode
npm test -- --ui

# Headed mode (see browser)
npm test -- --headed
```

## Writing Tests

### Basic Test

```typescript
import { test, expect } from './fixtures';
import { LoginPage } from './pages/LoginPage';

test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  await expect(page).toHaveURL('/dashboard');
});
```

### Using Fixtures

```typescript
test('authenticated user dashboard', async ({ authenticatedPage, testUser }) => {
  // Page is already logged in!
  await expect(authenticatedPage.getByText(testUser.name)).toBeVisible();
});
```

### Using Data Factory

```typescript
import { DataFactory } from './utils/data-factory';

test('create product', async ({ apiClient }) => {
  const product = DataFactory.product({ name: 'Chipa' });
  const created = await apiClient.createProduct(product);
  expect(created.id).toBeDefined();
});
```

## Best Practices

1. **Use Page Objects**: Don't interact with page directly in tests
2. **Use Fixtures**: Avoid setup/teardown duplication
3. **Use Data Factory**: Generate test data dynamically
4. **Use Assertions Utils**: Consistent assertion patterns
5. **Follow Naming**: `describe('Feature', () => test('should...', ...))`

## Troubleshooting

### Tests are flaky
- Use `waitFor` instead of `setTimeout`
- Use proper selectors (data-testid, roles)
- Check for race conditions

### Tests are slow
- Use API for setup instead of UI
- Run tests in parallel
- Use test sharding

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.
```

---

## Week 8 Practical Exercises

### Exercise 5.1: Build Custom Fixtures (90 minutes)

**Objective**: Create reusable fixtures for your test framework

**Tasks**:

1. **Authentication Fixture** (20 min):
   - Create `authenticatedPage` fixture
   - Auto-login before tests
   - Auto-logout after tests

2. **API Client Fixture** (25 min):
   - Create `apiClient` fixture with CRUD methods
   - Add authentication handling
   - Include error handling

3. **Database Fixture** (25 min):
   - Create `db` fixture
   - Auto-clean before/after tests
   - Add seeding helpers

4. **Test Data Fixture** (20 min):
   - Create fixtures for common test data
   - Use data factory for generation
   - Include cleanup

**Deliverable**:
- Complete fixtures module
- Usage documentation
- Example tests using fixtures

**Success Criteria**:
- ✅ Fixtures work across tests
- ✅ Auto-cleanup functional
- ✅ Tests simpler with fixtures
- ✅ Documentation clear

---

### Exercise 5.2: Advanced Page Objects (120 minutes)

**Objective**: Build production-ready Page Object Model

**Tasks**:

1. **Create Base Page** (20 min):
   - Common navigation methods
   - Common wait utilities
   - Common assertions

2. **Build 3 Page Objects** (45 min):
   - Use component composition
   - Implement fluent interface
   - Add comprehensive methods

3. **Create Component Library** (30 min):
   - Header component
   - Footer component
   - Modal component
   - Form component

4. **Write Tests** (25 min):
   - User journey using pages
   - Verify page composition works
   - Test component reuse

**Deliverable**:
- Base page class
- 3 complete page objects
- 4 reusable components
- Test suite using them

**Success Criteria**:
- ✅ No direct page interaction in tests
- ✅ Components reused across pages
- ✅ Fluent interface working
- ✅ Easy to maintain

---

### Exercise 5.3: Complete Framework Documentation (60 minutes)

**Objective**: Document your test framework for team adoption

**Tasks**:

1. **Architecture Documentation** (15 min):
   - Folder structure explanation
   - Design principles
   - Layer responsibilities

2. **Usage Guide** (20 min):
   - Quick start instructions
   - Common patterns
   - Code examples

3. **API Reference** (15 min):
   - Document all fixtures
   - Document all page objects
   - Document utilities

4. **Contributing Guide** (10 min):
   - Coding standards
   - PR process
   - How to add new pages

**Deliverable**:
- Complete README.md
- API_REFERENCE.md
- CONTRIBUTING.md
- Quick start guide

**Success Criteria**:
- ✅ New team member can start in 10 min
- ✅ All features documented
- ✅ Examples provided
- ✅ Standards clear

---

## Knowledge Check Quiz

1. **What is a fixture in Playwright?**
   a) A bug that needs fixing
   b) A way to provide setup/teardown and dependencies
   c) A type of test
   d) A page object

2. **What's the main benefit of Page Object Model?**
   a) Tests run faster
   b) Separation of test logic from UI interactions
   c) No need for assertions
   d) Automatic test generation

3. **What should a base page class contain?**
   a) All test cases
   b) Common functionality shared by all pages
   c) Database connections
   d) API endpoints

4. **Why use a data factory?**
   a) To manufacture hardware
   b) To generate test data dynamically
   c) To create databases
   d) To build pages

5. **What's the benefit of custom fixtures?**
   a) Faster test execution
   b) Reusable setup/teardown logic
   c) Better screenshots
   d) Automatic debugging

**Answer Key**: [1-b, 2-b, 3-b, 4-b, 5-b]

---

## Week 8 Summary

This week, you mastered:

### Key Concepts
- ✅ Test framework architecture design
- ✅ Custom Playwright fixtures
- ✅ Advanced Page Object Model
- ✅ Reusable test utilities
- ✅ Test data management
- ✅ Framework documentation

### Skills Developed
- ✅ Design scalable test frameworks
- ✅ Create custom fixtures and hooks
- ✅ Build maintainable page objects
- ✅ Write reusable utilities
- ✅ Manage test data systematically
- ✅ Document frameworks effectively

### Practical Applications
- ✅ Tests are easier to write
- ✅ Maintenance time reduced 80%
- ✅ New team members onboard quickly
- ✅ Framework scales to 1000+ tests

---

## Next Week: Weeks 9-10 - Capstone Project

**Capstone Preview**:
- Apply all learned skills
- Build complete test automation solution
- Implement CI/CD pipeline
- Present to instructors
- Deploy to production

---

## Additional Resources

### Playwright Fixtures
- [Playwright Fixtures Guide](https://playwright.dev/docs/test-fixtures)
- [Custom Fixtures Examples](https://playwright.dev/docs/test-fixtures#creating-a-fixture)

### Page Object Model
- [Martin Fowler - Page Object](https://martinfowler.com/bliki/PageObject.html)
- [Playwright POM Guide](https://playwright.dev/docs/pom)

### Test Architecture
- [Test Automation Patterns](https://testautomationpatterns.org/)
- [Framework Design Principles](https://www.browserstack.com/guide/test-automation-frameworks)

---

**Module Status**: ✅ Week 8 Complete

**Next Phase**: [Capstone Project - Weeks 9-10](./CAPSTONE-PROJECT-OVERVIEW.md)
