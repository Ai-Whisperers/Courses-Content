# Módulo 6: Fixtures y Data Management
## Gestión Avanzada de Datos y Estado en Tests

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Módulos 1-5 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Entender y usar fixtures nativos de Playwright
2. Crear custom fixtures para autenticación y datos
3. Implementar factory pattern para datos de prueba
4. Manejar cleanup y teardown correctamente
5. Aislar tests para evitar dependencias

---

## Contenido

### 6.1 Fixtures en Playwright (20 min)

#### ¿Qué es un Fixture?

```
FIXTURES EN PLAYWRIGHT
══════════════════════

Un fixture es un mecanismo para:
✅ Configurar estado antes de un test
✅ Limpiar estado después de un test
✅ Compartir configuración entre tests
✅ Aislar tests entre sí
✅ Manejar recursos (browser, page, etc.)

┌─────────────────────────────────────┐
│         TEST                        │
│  ┌─────────────────────────┐        │
│  │  Fixture: authenticatedPage      │
│  │  - Login automático     │        │
│  │  - Page ya autenticado  │        │
│  └─────────────────────────┘        │
│              ↓                      │
│  Test usa página autenticada        │
│              ↓                      │
│  Fixture hace cleanup automático    │
└─────────────────────────────────────┘
```

#### Fixtures Built-in de Playwright

```typescript
import { test, expect } from '@playwright/test';

test('ejemplo de fixtures built-in', async ({
  // Fixtures más comunes
  page,      // Página del navegador
  context,   // Contexto del navegador
  browser,   // Instancia del navegador
  request,   // Para API requests
}) => {
  // Cada test tiene su propia página aislada
  await page.goto('/');
});

// Otros fixtures disponibles:
// browserName - 'chromium' | 'firefox' | 'webkit'
// baseURL - URL base de config
// viewport - tamaño de ventana
// locale - idioma
// timezoneId - zona horaria
```

#### Cómo Funcionan

```typescript
// Los fixtures se inicializan antes del test
// y se limpian después automáticamente

test('test 1', async ({ page }) => {
  // page es una NUEVA instancia
  await page.goto('/');
  // ...acciones del test
}); // page se cierra automáticamente

test('test 2', async ({ page }) => {
  // page es OTRA instancia nueva
  // completamente aislada del test anterior
  await page.goto('/');
});
```

---

### 6.2 Custom Fixtures (25 min)

#### Crear Fixtures Personalizados

```typescript
// fixtures/index.ts
import { test as base, Page } from '@playwright/test';

// Definir tipos de fixtures
type MyFixtures = {
  homePage: Page;
  loginAsUser: Page;
  testData: { username: string; email: string };
};

// Extender test con fixtures personalizados
export const test = base.extend<MyFixtures>({
  // Fixture simple: navegar a home
  homePage: async ({ page }, use) => {
    await page.goto('/');
    await use(page);  // <- aquí se ejecuta el test
    // cleanup después del test (opcional)
  },

  // Fixture con login
  loginAsUser: async ({ page }, use) => {
    // Setup: login
    await page.goto('/login');
    await page.fill('#email', 'user@test.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');

    await use(page);  // test se ejecuta con página autenticada

    // Teardown: logout (opcional)
    await page.goto('/logout');
  },

  // Fixture de datos
  testData: async ({}, use) => {
    const data = {
      username: `user_${Date.now()}`,
      email: `test_${Date.now()}@test.com`,
    };
    await use(data);
  },
});

export { expect } from '@playwright/test';
```

#### Usar Custom Fixtures

```typescript
// tests/dashboard.spec.ts
import { test, expect } from '../fixtures';

test('dashboard muestra nombre de usuario', async ({ loginAsUser }) => {
  // loginAsUser ya es una página autenticada
  await expect(loginAsUser.getByText('Welcome')).toBeVisible();
});

test('puede ver perfil', async ({ loginAsUser }) => {
  await loginAsUser.click('text=Profile');
  await expect(loginAsUser).toHaveURL('/profile');
});

test('genera datos únicos', async ({ testData }) => {
  console.log(testData.username); // user_1699123456789
  console.log(testData.email);    // test_1699123456789@test.com
});
```

---

### 6.3 Fixture de Autenticación Completo (20 min)

#### Patrón Recomendado

```typescript
// fixtures/auth.ts
import { test as base, Page, BrowserContext } from '@playwright/test';

// Interfaz para usuario de prueba
interface TestUser {
  email: string;
  password: string;
  name: string;
}

// Tipos de fixtures
type AuthFixtures = {
  authenticatedPage: Page;
  authenticatedContext: BrowserContext;
  testUser: TestUser;
};

export const test = base.extend<AuthFixtures>({
  // Fixture: Usuario de prueba
  testUser: async ({}, use) => {
    const user: TestUser = {
      email: 'testuser@example.com',
      password: 'TestPassword123!',
      name: 'Test User',
    };
    await use(user);
  },

  // Fixture: Contexto autenticado (reutiliza sesión)
  authenticatedContext: async ({ browser, testUser }, use) => {
    // Crear nuevo contexto
    const context = await browser.newContext();
    const page = await context.newPage();

    // Hacer login
    await page.goto('/login');
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');

    // Guardar estado de autenticación
    await context.storageState({ path: '.auth/user.json' });

    await use(context);

    // Cleanup
    await context.close();
  },

  // Fixture: Página autenticada
  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    await use(page);
    await page.close();
  },
});

export { expect } from '@playwright/test';
```

#### Reutilizar Estado de Autenticación

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    // Proyecto para generar estado de auth
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Proyectos que usan el estado
    {
      name: 'chromium',
      use: {
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

```typescript
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@test.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');

  // Guardar estado
  await page.context().storageState({ path: '.auth/user.json' });
});
```

---

### 6.4 Factory Pattern para Datos (20 min)

#### Estructura de Factories

```typescript
// data/factories/index.ts
import { faker } from '@faker-js/faker';

// Interface de Usuario
interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
}

// Factory de Usuario
export function createUser(overrides: Partial<User> = {}): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password({ length: 12, memorable: true }),
    firstName,
    lastName,
    phone: faker.phone.number(),
    createdAt: faker.date.past(),
    ...overrides,
  };
}

// Factory para múltiples usuarios
export function createUsers(count: number, overrides: Partial<User> = {}): User[] {
  return Array.from({ length: count }, () => createUser(overrides));
}

// Presets útiles
export function createAdminUser(): User {
  return createUser({
    email: 'admin@test.com',
    firstName: 'Admin',
    lastName: 'User',
  });
}

export function createInactiveUser(): User {
  return createUser({
    createdAt: faker.date.past({ years: 2 }),
  });
}
```

#### Factory de Productos

```typescript
// data/factories/products.ts
import { faker } from '@faker-js/faker';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 1000, max: 500000 })), // Guaraníes
    stock: faker.number.int({ min: 0, max: 100 }),
    category: faker.commerce.department(),
    imageUrl: faker.image.url(),
    ...overrides,
  };
}

// Presets
export function createOutOfStockProduct(): Product {
  return createProduct({ stock: 0 });
}

export function createExpensiveProduct(): Product {
  return createProduct({ price: 1000000 });
}

export function createProducts(count: number): Product[] {
  return Array.from({ length: count }, () => createProduct());
}
```

#### Usar Factories en Tests

```typescript
// tests/products.spec.ts
import { test, expect } from '@playwright/test';
import { createUser, createProduct, createOutOfStockProduct } from '../data/factories';

test('usuario puede agregar producto al carrito', async ({ page }) => {
  const user = createUser();
  const product = createProduct({ price: 50000 });

  // Usar datos generados
  await page.goto('/login');
  await page.fill('#email', user.email);
  // ...
});

test('muestra mensaje cuando producto sin stock', async ({ page }) => {
  const product = createOutOfStockProduct();
  // Mock API con producto sin stock
  await page.route('**/api/products/*', route => {
    route.fulfill({ json: product });
  });

  await page.goto(`/products/${product.id}`);
  await expect(page.getByText('Sin stock')).toBeVisible();
});
```

---

### 6.5 Cleanup y Teardown (15 min)

#### Patrones de Cleanup

```typescript
// fixtures/cleanup.ts
import { test as base, Page } from '@playwright/test';

interface CleanupFixtures {
  productPage: Page;
  userWithCleanup: { id: string; email: string };
}

export const test = base.extend<CleanupFixtures>({
  // Cleanup automático después del test
  productPage: async ({ page }, use) => {
    // Setup
    await page.goto('/products');

    await use(page);

    // Teardown - limpiar carrito si quedó algo
    await page.goto('/cart');
    const cartItems = page.locator('.cart-item');
    const count = await cartItems.count();
    if (count > 0) {
      await page.click('text=Clear Cart');
    }
  },

  // Crear usuario en API y limpiarlo después
  userWithCleanup: async ({ request }, use) => {
    // Setup: crear usuario vía API
    const response = await request.post('/api/users', {
      data: {
        email: `test_${Date.now()}@test.com`,
        password: 'password123',
      },
    });
    const user = await response.json();

    await use(user);

    // Teardown: eliminar usuario
    await request.delete(`/api/users/${user.id}`);
  },
});
```

#### beforeEach y afterEach

```typescript
import { test, expect } from '@playwright/test';

test.describe('Carrito de compras', () => {

  test.beforeEach(async ({ page }) => {
    // Ejecuta antes de CADA test
    await page.goto('/cart');
    // Limpiar carrito
    await page.evaluate(() => localStorage.clear());
  });

  test.afterEach(async ({ page }) => {
    // Ejecuta después de CADA test
    // Tomar screenshot si falló
    const testInfo = test.info();
    if (testInfo.status !== 'passed') {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });

  test('carrito inicia vacío', async ({ page }) => {
    await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
  });
});
```

#### beforeAll y afterAll

```typescript
import { test, expect } from '@playwright/test';

test.describe('Tests con setup global', () => {
  let testUserId: string;

  test.beforeAll(async ({ request }) => {
    // Ejecuta UNA VEZ antes de todos los tests del describe
    const response = await request.post('/api/users', {
      data: { email: 'shared@test.com', password: 'pass' },
    });
    const user = await response.json();
    testUserId = user.id;
  });

  test.afterAll(async ({ request }) => {
    // Ejecuta UNA VEZ después de todos los tests
    await request.delete(`/api/users/${testUserId}`);
  });

  test('test 1 usa el usuario', async ({ page }) => {
    console.log('User ID:', testUserId);
  });

  test('test 2 también usa el usuario', async ({ page }) => {
    console.log('Same User ID:', testUserId);
  });
});
```

---

### 6.6 Aislamiento de Tests (20 min)

#### Por qué Aislar Tests

```
TESTS AISLADOS vs DEPENDIENTES
══════════════════════════════

❌ TESTS DEPENDIENTES:
Test 1: Crea usuario
Test 2: Usa usuario de Test 1  ← Falla si Test 1 falla
Test 3: Elimina usuario

✅ TESTS AISLADOS:
Test 1: Crea usuario → Usa → Elimina
Test 2: Crea usuario → Usa → Elimina
Test 3: Crea usuario → Usa → Elimina

Beneficios:
• Pueden ejecutar en paralelo
• Pueden ejecutar en cualquier orden
• Un fallo no afecta a otros
• Más fáciles de debuggear
```

#### Estrategias de Aislamiento

```typescript
// Estrategia 1: Cada test crea sus propios datos
test('usuario puede actualizar perfil', async ({ page, request }) => {
  // Crear usuario único para este test
  const userResponse = await request.post('/api/users', {
    data: {
      email: `unique_${Date.now()}@test.com`,
      password: 'password123',
    },
  });
  const user = await userResponse.json();

  // Hacer test
  await page.goto('/login');
  // ...

  // Cleanup
  await request.delete(`/api/users/${user.id}`);
});

// Estrategia 2: Usar fixtures que manejan aislamiento
test('test con fixture aislado', async ({ userWithCleanup, page }) => {
  // userWithCleanup es único y se limpia automáticamente
  await page.goto('/login');
  await page.fill('#email', userWithCleanup.email);
});

// Estrategia 3: Usar IDs únicos
test('crear producto con nombre único', async ({ page }) => {
  const uniqueName = `Product_${Date.now()}_${Math.random()}`;
  await page.fill('#name', uniqueName);
  // El nombre único garantiza que no haya conflictos
});
```

#### Parallel Execution

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Ejecutar tests en paralelo
  fullyParallel: true,

  // Número de workers
  workers: process.env.CI ? 1 : undefined, // 1 en CI, auto en local

  // Reintentos
  retries: process.env.CI ? 2 : 0,
});
```

```typescript
// Configurar aislamiento por archivo
// tests/users.spec.ts
import { test } from '@playwright/test';

// Estos tests se ejecutan en paralelo entre sí
test.describe.configure({ mode: 'parallel' });

test.describe('User tests', () => {
  test('test 1', async ({ page }) => { /* ... */ });
  test('test 2', async ({ page }) => { /* ... */ });
});

// Para tests que DEBEN ser secuenciales
test.describe.configure({ mode: 'serial' });

test.describe('Sequential tests', () => {
  test('step 1', async ({ page }) => { /* ... */ });
  test('step 2', async ({ page }) => { /* depends on step 1 */ });
});
```

---

## Resumen de Fixtures

### Built-in Fixtures

| Fixture | Descripción |
|---------|-------------|
| `page` | Página del navegador |
| `context` | Contexto del navegador |
| `browser` | Instancia del navegador |
| `request` | Para API requests |
| `browserName` | Nombre del navegador |
| `baseURL` | URL base configurada |

### Custom Fixtures Pattern

```typescript
import { test as base } from '@playwright/test';

type MyFixtures = {
  myFixture: TypeOfFixture;
};

export const test = base.extend<MyFixtures>({
  myFixture: async ({ dependencies }, use) => {
    // Setup
    const resource = await createResource();

    await use(resource);

    // Teardown
    await cleanupResource(resource);
  },
});
```

### Hooks

| Hook | Cuándo Ejecuta |
|------|----------------|
| `beforeAll` | Una vez antes de todos los tests |
| `beforeEach` | Antes de cada test |
| `afterEach` | Después de cada test |
| `afterAll` | Una vez después de todos los tests |

---

## Puntos Clave

1. **Fixtures = Setup + Teardown:** Automatizan preparación y limpieza
2. **Aislamiento:** Cada test debe ser independiente
3. **Factories:** Generan datos únicos y realistas
4. **Storage State:** Reutiliza autenticación entre tests
5. **Cleanup:** Siempre limpiar recursos creados

---

*Siguiente módulo: CI/CD y Reporting*
