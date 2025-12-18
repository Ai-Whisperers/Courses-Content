# Ejercicio: Módulo 6
## Implementar Fixtures y Factories

---

## Objetivo

Crear fixtures personalizados y factories de datos para un flujo de e-commerce.

**Duración:** 30 minutos

---

## Parte 1: Crear Estructura (5 minutos)

### Crear directorios

```bash
mkdir -p fixtures
mkdir -p data/factories
```

### Estructura esperada

```
qa-automation-fpuna/
├── fixtures/
│   └── index.ts
├── data/
│   └── factories/
│       ├── userFactory.ts
│       └── productFactory.ts
├── tests/
│   └── ecommerce.spec.ts
└── playwright.config.ts
```

---

## Parte 2: Crear User Factory (10 minutos)

### Crear `data/factories/userFactory.ts`

```typescript
// data/factories/userFactory.ts
import { faker } from '@faker-js/faker';

// COMPLETAR: Definir interface User
interface User {
  id: string;
  email: _______;
  password: _______;
  firstName: _______;
  lastName: _______;
  phone: string;
}

// COMPLETAR: Implementar factory
export function createUser(overrides: Partial<User> = {}): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    email: faker.internet.______({ firstName, lastName }),
    password: faker.internet.______({ length: 12 }),
    firstName,
    lastName,
    phone: faker.phone.number(),
    ..._______,  // COMPLETAR: aplicar overrides
  };
}

// COMPLETAR: Factory para múltiples usuarios
export function createUsers(count: number): User[] {
  return Array.from({ length: _____ }, () => createUser());
}

// Presets
export function createPremiumUser(): User {
  return createUser({
    email: 'premium@test.com',
    firstName: 'Premium',
    lastName: 'User',
  });
}
```

### Verificar factory

```typescript
// Test rápido en consola
import { createUser, createUsers } from './data/factories/userFactory';

console.log(createUser());
console.log(createUser({ email: 'custom@test.com' }));
console.log(createUsers(3));
```

---

## Parte 3: Crear Product Factory (5 minutos)

### Crear `data/factories/productFactory.ts`

```typescript
// data/factories/productFactory.ts
import { faker } from '@faker-js/faker';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;  // En guaraníes
  stock: number;
  category: string;
}

export function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    // COMPLETAR: Precio entre 10,000 y 500,000 guaraníes
    price: faker.number.int({ min: _____, max: _____ }),
    stock: faker.number.int({ min: 1, max: 100 }),
    category: faker.commerce.department(),
    ...overrides,
  };
}

// COMPLETAR: Producto sin stock
export function createOutOfStockProduct(): Product {
  return createProduct({ stock: ___ });
}

// COMPLETAR: Producto caro
export function createExpensiveProduct(): Product {
  return createProduct({ price: 1000000 });
}
```

---

## Parte 4: Crear Custom Fixtures (10 minutos)

### Crear `fixtures/index.ts`

```typescript
// fixtures/index.ts
import { test as base, Page } from '@playwright/test';
import { createUser, User } from '../data/factories/userFactory';
import { createProduct, Product } from '../data/factories/productFactory';

// Definir tipos de fixtures
type EcommerceFixtures = {
  // Página en home
  homePage: Page;
  // Usuario de prueba generado
  testUser: User;
  // Producto de prueba generado
  testProduct: Product;
  // Página autenticada
  authenticatedPage: Page;
};

export const test = base.extend<EcommerceFixtures>({
  // Fixture: Home Page
  homePage: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },

  // COMPLETAR: Fixture de usuario
  testUser: async ({}, use) => {
    const user = _________();
    await use(user);
  },

  // COMPLETAR: Fixture de producto
  testProduct: async ({}, use) => {
    const product = _________();
    await use(product);
  },

  // COMPLETAR: Fixture de página autenticada
  authenticatedPage: async ({ page, testUser }, use) => {
    // Navegar a login
    await page.goto('/login');

    // COMPLETAR: Llenar formulario
    await page.fill('[name="email"]', testUser._____);
    await page.fill('[name="password"]', testUser._______);
    await page.click('button[type="submit"]');

    // Esperar dashboard
    await page.waitForURL('/dashboard');

    await use(page);

    // Cleanup: logout
    await page.goto('/logout');
  },
});

export { expect } from '@playwright/test';
```

---

## Parte 5: Usar Fixtures en Tests (5 minutos)

### Crear `tests/ecommerce.spec.ts`

```typescript
// tests/ecommerce.spec.ts
import { test, expect } from '../fixtures';

test.describe('E-commerce con Fixtures', () => {

  test('home page carga correctamente', async ({ homePage }) => {
    // homePage ya está en /
    await expect(homePage.getByRole('heading')).toBeVisible();
  });

  test('genera datos de usuario únicos', async ({ testUser }) => {
    console.log('Usuario generado:', testUser.email);

    // COMPLETAR: Verificar que tiene email
    expect(testUser._____).toBeDefined();
    expect(testUser._____.includes('@')).toBeTruthy();
  });

  test('genera datos de producto', async ({ testProduct }) => {
    console.log('Producto:', testProduct.name, testProduct.price);

    // COMPLETAR: Verificar precio válido
    expect(testProduct._____).toBeGreaterThan(0);
    expect(testProduct._____).toBeLessThanOrEqual(100);
  });

  test('página autenticada muestra dashboard', async ({ authenticatedPage }) => {
    // authenticatedPage ya pasó por login
    await expect(authenticatedPage).toHaveURL(/dashboard/);
  });

  test('puede agregar producto al carrito', async ({
    authenticatedPage,
    testProduct,
  }) => {
    // Mock del producto
    await authenticatedPage.route('**/api/products/*', route => {
      route.fulfill({ json: testProduct });
    });

    await authenticatedPage.goto(`/products/${testProduct.id}`);
    await authenticatedPage.click('text=Add to Cart');

    await expect(authenticatedPage.getByText('Added to cart')).toBeVisible();
  });
});
```

---

## Soluciones

### User Factory Completa

```typescript
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password({ length: 12 }),
    firstName,
    lastName,
    phone: faker.phone.number(),
    ...overrides,
  };
}

export function createUsers(count: number): User[] {
  return Array.from({ length: count }, () => createUser());
}

export function createPremiumUser(): User {
  return createUser({
    email: 'premium@test.com',
    firstName: 'Premium',
    lastName: 'User',
  });
}

export type { User };
```

### Product Factory Completa

```typescript
import { faker } from '@faker-js/faker';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 10000, max: 500000 }),
    stock: faker.number.int({ min: 1, max: 100 }),
    category: faker.commerce.department(),
    ...overrides,
  };
}

export function createOutOfStockProduct(): Product {
  return createProduct({ stock: 0 });
}

export function createExpensiveProduct(): Product {
  return createProduct({ price: 1000000 });
}

export type { Product };
```

### Fixtures Completos

```typescript
import { test as base, Page } from '@playwright/test';
import { createUser, User } from '../data/factories/userFactory';
import { createProduct, Product } from '../data/factories/productFactory';

type EcommerceFixtures = {
  homePage: Page;
  testUser: User;
  testProduct: Product;
  authenticatedPage: Page;
};

export const test = base.extend<EcommerceFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },

  testUser: async ({}, use) => {
    const user = createUser();
    await use(user);
  },

  testProduct: async ({}, use) => {
    const product = createProduct();
    await use(product);
  },

  authenticatedPage: async ({ page, testUser }, use) => {
    await page.goto('/login');
    await page.fill('[name="email"]', testUser.email);
    await page.fill('[name="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');

    await use(page);

    await page.goto('/logout');
  },
});

export { expect } from '@playwright/test';
```

### Tests Completos

```typescript
import { test, expect } from '../fixtures';

test.describe('E-commerce con Fixtures', () => {

  test('home page carga correctamente', async ({ homePage }) => {
    await expect(homePage.getByRole('heading')).toBeVisible();
  });

  test('genera datos de usuario únicos', async ({ testUser }) => {
    console.log('Usuario generado:', testUser.email);
    expect(testUser.email).toBeDefined();
    expect(testUser.email.includes('@')).toBeTruthy();
  });

  test('genera datos de producto', async ({ testProduct }) => {
    console.log('Producto:', testProduct.name, testProduct.price);
    expect(testProduct.price).toBeGreaterThan(0);
    expect(testProduct.stock).toBeLessThanOrEqual(100);
  });

  test('página autenticada muestra dashboard', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/dashboard/);
  });

  test('puede agregar producto al carrito', async ({
    authenticatedPage,
    testProduct,
  }) => {
    await authenticatedPage.route('**/api/products/*', route => {
      route.fulfill({ json: testProduct });
    });

    await authenticatedPage.goto(`/products/${testProduct.id}`);
    await authenticatedPage.click('text=Add to Cart');

    await expect(authenticatedPage.getByText('Added to cart')).toBeVisible();
  });
});
```

---

## Ejecutar Tests

```bash
# Instalar faker si no está
npm install @faker-js/faker

# Ejecutar tests
npx playwright test ecommerce.spec.ts

# Con detalles
npx playwright test ecommerce.spec.ts --reporter=list
```

---

## Checklist de Entrega

- [ ] User Factory creada con createUser()
- [ ] Product Factory creada con createProduct()
- [ ] Custom fixtures definidos
- [ ] Tests usan los fixtures
- [ ] Cada test es independiente
- [ ] Datos son únicos en cada ejecución

---

## Reflexión

1. ¿Cómo ayudan las factories a aislar tests?

   _______________________________________________

2. ¿Qué pasa si ejecutas el mismo test dos veces?

   _______________________________________________

3. ¿Cómo modificarías el fixture para soportar diferentes roles?

   _______________________________________________

---

*Tiempo total: 30 minutos*
