# QA Track Module 2: AI-Powered Test Generation at Scale
## FPUNA Summer 2026 - Week 5 (QA Automation Specialization)

**Duration**: 10 hours (Week 5 of program)  
**Tool Focus**: OpenCode + Playwright  
**Prerequisites**: Core Modules 1-6, QA Module 1 completed

---

## Module Overview

Last week you mastered advanced Playwright techniques. This week, you'll learn how to leverage OpenCode's full power to generate comprehensive test suites at scale. You'll move from writing tests one at a time to generating dozens or hundreds of tests systematically, maintaining quality while dramatically increasing speed.

### Learning Objectives

By the end of this week, you will be able to:

1. **Generate** complete test suites (50+ tests) with OpenCode
2. **Design** data-driven testing strategies
3. **Implement** parameterized tests efficiently
4. **Create** test factories and fixtures with AI
5. **Maintain** large test suites systematically
6. **Debug** and fix flaky tests
7. **Refactor** existing tests for better maintainability

---

## Why Test Generation at Scale Matters

### The QA Engineer's Scaling Challenge

```
Manual Test Writing:
- 1 test = 10-15 minutes
- 100 tests = 1,000-1,500 minutes (25-40 hours)
- Repetitive, error-prone, boring

AI-Powered Test Generation:
- 1 test = 2-3 minutes (with OpenCode)
- 100 tests = 200-300 minutes (3-5 hours)
- Systematic, consistent, fast
```

**Real-world scenario**: Your team needs comprehensive test coverage for a new feature before next Friday. Without AI, impossible. With AI, achievable.

---

## 2.1 The Test Generation Workflow

### From Requirements to Running Tests

```
1. Analyze Requirements
   ↓
2. Design Test Strategy (what to test, how many tests)
   ↓
3. Generate Test Structure (describe blocks, test names)
   ↓
4. Generate Test Implementation (OpenCode does the heavy lifting)
   ↓
5. Review & Refine (human validates quality)
   ↓
6. Run & Debug (fix any issues)
   ↓
7. Commit & Document
```

---

### Step 1: Analyze Requirements with OpenCode

**Scenario**: You need to test a new `ShoppingCart` class.

**Source Code**:
```typescript
// src/cart/ShoppingCart.ts
export class ShoppingCart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number): void {
    // Implementation
  }

  removeItem(productId: string): void {
    // Implementation
  }

  updateQuantity(productId: string, quantity: number): void {
    // Implementation
  }

  getTotal(): number {
    // Implementation
  }

  applyCoupon(code: string): void {
    // Implementation
  }

  clear(): void {
    // Implementation
  }
}
```

**OpenCode Prompt**:
```
Analyze this ShoppingCart class and create a comprehensive test plan.

Source code:
[paste ShoppingCart class]

For each method, identify:
1. Happy path scenarios
2. Error scenarios
3. Edge cases
4. Boundary conditions

Format as structured list for test generation.
```

**OpenCode Output**:
```markdown
# ShoppingCart Test Plan

## addItem(product, quantity)
### Happy Path:
- Add single item with quantity 1
- Add item with quantity > 1
- Add multiple different items

### Error Cases:
- Add item with quantity 0
- Add item with negative quantity
- Add item without product
- Add item with null product

### Edge Cases:
- Add same item multiple times (should aggregate quantity)
- Add item when cart is empty
- Add 1000+ items (stress test)

## removeItem(productId)
### Happy Path:
- Remove existing item
- Remove last remaining item

### Error Cases:
- Remove non-existent item
- Remove with null productId
- Remove with empty string productId

### Edge Cases:
- Remove from empty cart

## updateQuantity(productId, quantity)
### Happy Path:
- Increase quantity
- Decrease quantity
- Set quantity to 1

### Error Cases:
- Update to 0 (should remove item?)
- Update to negative number
- Update non-existent item

### Edge Cases:
- Update to same quantity (no-op)

## getTotal()
### Happy Path:
- Calculate total for single item
- Calculate total for multiple items
- Calculate total after coupon applied

### Edge Cases:
- Calculate total for empty cart (should be 0)
- Calculate total with items of varying prices
- Calculate total after item removed

## applyCoupon(code)
### Happy Path:
- Apply valid percentage discount coupon
- Apply valid fixed amount discount coupon

### Error Cases:
- Apply invalid coupon code
- Apply expired coupon
- Apply coupon twice

### Edge Cases:
- Apply coupon to empty cart
- Apply coupon that makes total negative

## clear()
### Happy Path:
- Clear cart with items
- Clear already empty cart
```

---

### Step 2: Generate Test Structure

**OpenCode Prompt**:
```
Generate Jest test structure (describe blocks and test names only, no implementation yet) based on this test plan:

[paste test plan from Step 1]

Requirements:
- Use nested describe blocks for organization
- Descriptive test names following pattern: "should [expected behavior] when [condition]"
- Group related tests together
- Include TODO comments for complex tests
```

**OpenCode Output**:
```typescript
// tests/cart/ShoppingCart.test.ts
import { ShoppingCart } from '../../src/cart/ShoppingCart';
import { Product } from '../../src/types';

describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('addItem', () => {
    describe('Happy Path', () => {
      test('should add single item with quantity 1', () => {
        // TODO: Implement
      });

      test('should add item with quantity greater than 1', () => {
        // TODO: Implement
      });

      test('should add multiple different items', () => {
        // TODO: Implement
      });

      test('should aggregate quantity when adding same item multiple times', () => {
        // TODO: Implement
      });
    });

    describe('Error Cases', () => {
      test('should throw error when quantity is 0', () => {
        // TODO: Implement
      });

      test('should throw error when quantity is negative', () => {
        // TODO: Implement
      });

      test('should throw error when product is null', () => {
        // TODO: Implement
      });
    });

    describe('Edge Cases', () => {
      test('should handle adding item to empty cart', () => {
        // TODO: Implement
      });

      test('should handle adding 1000+ items', () => {
        // TODO: Implement
      });
    });
  });

  describe('removeItem', () => {
    describe('Happy Path', () => {
      test('should remove existing item from cart', () => {
        // TODO: Implement
      });

      test('should handle removing last remaining item', () => {
        // TODO: Implement
      });
    });

    describe('Error Cases', () => {
      test('should throw error when removing non-existent item', () => {
        // TODO: Implement
      });

      test('should throw error when productId is null', () => {
        // TODO: Implement
      });
    });

    describe('Edge Cases', () => {
      test('should handle removing from empty cart', () => {
        // TODO: Implement
      });
    });
  });

  describe('updateQuantity', () => {
    describe('Happy Path', () => {
      test('should increase item quantity', () => {
        // TODO: Implement
      });

      test('should decrease item quantity', () => {
        // TODO: Implement
      });
    });

    describe('Error Cases', () => {
      test('should throw error when updating to 0', () => {
        // TODO: Implement
      });

      test('should throw error when updating to negative number', () => {
        // TODO: Implement
      });
    });
  });

  describe('getTotal', () => {
    test('should calculate total for single item', () => {
      // TODO: Implement
    });

    test('should calculate total for multiple items', () => {
      // TODO: Implement
    });

    test('should return 0 for empty cart', () => {
      // TODO: Implement
    });

    test('should calculate correct total after coupon applied', () => {
      // TODO: Implement
    });
  });

  describe('applyCoupon', () => {
    describe('Happy Path', () => {
      test('should apply valid percentage discount coupon', () => {
        // TODO: Implement
      });

      test('should apply valid fixed amount discount coupon', () => {
        // TODO: Implement
      });
    });

    describe('Error Cases', () => {
      test('should throw error for invalid coupon code', () => {
        // TODO: Implement
      });

      test('should throw error when applying coupon twice', () => {
        // TODO: Implement
      });
    });
  });

  describe('clear', () => {
    test('should clear cart with items', () => {
      // TODO: Implement
    });

    test('should handle clearing already empty cart', () => {
      // TODO: Implement
    });
  });
});
```

---

### Step 3: Generate Test Implementation

Now the magic happens - implement all tests at once!

**OpenCode Prompt**:
```
Implement all the tests in this test file:

Test structure:
[paste test structure from Step 2]

Source code being tested:
[paste ShoppingCart implementation]

Requirements:
- Complete AAA pattern (Arrange, Act, Assert)
- Use meaningful test data (Paraguayan products: "Chipa", "Tereré", etc.)
- Create helper functions for common setup
- Use proper TypeScript types
- Follow Jest best practices
- Add helpful comments

Generate complete, runnable test code.
```

**OpenCode Output** (excerpt):
```typescript
import { ShoppingCart } from '../../src/cart/ShoppingCart';
import { Product, CartItem } from '../../src/types';

describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  // Helper function to create test products
  const createProduct = (overrides?: Partial<Product>): Product => ({
    id: 'prod-' + Math.random().toString(36).substr(2, 9),
    name: 'Chipa',
    price: 5000, // 5,000 Guaraníes
    inStock: true,
    ...overrides
  });

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('addItem', () => {
    describe('Happy Path', () => {
      test('should add single item with quantity 1', () => {
        // Arrange
        const product = createProduct({ name: 'Chipa' });

        // Act
        cart.addItem(product, 1);

        // Assert
        const items = cart.getItems();
        expect(items).toHaveLength(1);
        expect(items[0].product.name).toBe('Chipa');
        expect(items[0].quantity).toBe(1);
      });

      test('should add item with quantity greater than 1', () => {
        // Arrange
        const product = createProduct({ name: 'Tereré', price: 3000 });

        // Act
        cart.addItem(product, 5);

        // Assert
        const items = cart.getItems();
        expect(items[0].quantity).toBe(5);
      });

      test('should add multiple different items', () => {
        // Arrange
        const chipa = createProduct({ name: 'Chipa', price: 5000 });
        const terere = createProduct({ name: 'Tereré', price: 3000 });
        const sopa = createProduct({ name: 'Sopa Paraguaya', price: 15000 });

        // Act
        cart.addItem(chipa, 2);
        cart.addItem(terere, 1);
        cart.addItem(sopa, 3);

        // Assert
        const items = cart.getItems();
        expect(items).toHaveLength(3);
        expect(cart.getTotal()).toBe(2 * 5000 + 3000 + 3 * 15000); // 58,000
      });

      test('should aggregate quantity when adding same item multiple times', () => {
        // Arrange
        const product = createProduct({ name: 'Chipa', price: 5000 });

        // Act
        cart.addItem(product, 2);
        cart.addItem(product, 3);

        // Assert
        const items = cart.getItems();
        expect(items).toHaveLength(1); // Only one item entry
        expect(items[0].quantity).toBe(5); // Quantities aggregated
      });
    });

    describe('Error Cases', () => {
      test('should throw error when quantity is 0', () => {
        // Arrange
        const product = createProduct();

        // Act & Assert
        expect(() => cart.addItem(product, 0)).toThrow('Quantity must be greater than 0');
      });

      test('should throw error when quantity is negative', () => {
        // Arrange
        const product = createProduct();

        // Act & Assert
        expect(() => cart.addItem(product, -5)).toThrow('Quantity must be greater than 0');
      });

      test('should throw error when product is null', () => {
        // Act & Assert
        expect(() => cart.addItem(null as any, 1)).toThrow('Product cannot be null');
      });
    });

    describe('Edge Cases', () => {
      test('should handle adding item to empty cart', () => {
        // Arrange
        const product = createProduct();
        expect(cart.getItems()).toHaveLength(0); // Verify empty

        // Act
        cart.addItem(product, 1);

        // Assert
        expect(cart.getItems()).toHaveLength(1);
      });

      test('should handle adding 1000+ items', () => {
        // Arrange
        const product = createProduct({ price: 100 });

        // Act
        cart.addItem(product, 1000);

        // Assert
        const items = cart.getItems();
        expect(items[0].quantity).toBe(1000);
        expect(cart.getTotal()).toBe(100000);
      });
    });
  });

  describe('removeItem', () => {
    describe('Happy Path', () => {
      test('should remove existing item from cart', () => {
        // Arrange
        const chipa = createProduct({ name: 'Chipa' });
        const terere = createProduct({ name: 'Tereré' });
        cart.addItem(chipa, 2);
        cart.addItem(terere, 1);

        // Act
        cart.removeItem(chipa.id);

        // Assert
        const items = cart.getItems();
        expect(items).toHaveLength(1);
        expect(items[0].product.name).toBe('Tereré');
      });

      test('should handle removing last remaining item', () => {
        // Arrange
        const product = createProduct();
        cart.addItem(product, 1);

        // Act
        cart.removeItem(product.id);

        // Assert
        expect(cart.getItems()).toHaveLength(0);
        expect(cart.getTotal()).toBe(0);
      });
    });

    describe('Error Cases', () => {
      test('should throw error when removing non-existent item', () => {
        // Arrange
        cart.addItem(createProduct(), 1);

        // Act & Assert
        expect(() => cart.removeItem('non-existent-id')).toThrow('Item not found');
      });

      test('should throw error when productId is null', () => {
        // Act & Assert
        expect(() => cart.removeItem(null as any)).toThrow('Product ID is required');
      });
    });

    describe('Edge Cases', () => {
      test('should handle removing from empty cart', () => {
        // Act & Assert
        expect(() => cart.removeItem('any-id')).toThrow('Cart is empty');
      });
    });
  });

  // ... Continue with remaining methods
});
```

**Result**: From 0 to 30+ comprehensive tests in minutes!

---

## 2.2 Data-Driven Testing

### What is Data-Driven Testing?

**Definition**: Running the same test logic with multiple sets of input data.

**Benefits**:
- Test many scenarios with one test
- Easy to add new test cases
- Clear separation of logic and data
- Comprehensive coverage

---

### Implementing with `test.each()`

```typescript
describe('Price Calculation', () => {
  test.each([
    // [quantity, price, expected]
    [1, 5000, 5000],
    [2, 5000, 10000],
    [10, 5000, 50000],
    [100, 5000, 500000],
  ])('should calculate %i × %i Gs = %i Gs', (quantity, price, expected) => {
    // Arrange
    const product = createProduct({ price });
    cart.addItem(product, quantity);

    // Act
    const total = cart.getTotal();

    // Assert
    expect(total).toBe(expected);
  });
});
```

---

### OpenCode Generating Data-Driven Tests

**Prompt**:
```
Generate data-driven tests for the ShoppingCart.getTotal() method.

Test scenarios:
1. Various quantities and prices
2. Multiple items combinations
3. Edge cases (empty cart, max values)
4. Discount scenarios

Use test.each() with clear test cases.
Include Paraguayan currency (Guaraníes).
```

**OpenCode Output**:
```typescript
describe('getTotal - Data-Driven Tests', () => {
  describe('Single Item Scenarios', () => {
    test.each([
      // [productName, price, quantity, expected]
      ['Chipa', 5000, 1, 5000],
      ['Chipa', 5000, 5, 25000],
      ['Tereré', 3000, 2, 6000],
      ['Sopa Paraguaya', 15000, 3, 45000],
      ['Empanada', 2500, 10, 25000],
    ])('should calculate total for %s: %i Gs × %i = %i Gs', 
      (name, price, quantity, expected) => {
        // Arrange
        const product = createProduct({ name, price });
        cart.addItem(product, quantity);

        // Act
        const total = cart.getTotal();

        // Assert
        expect(total).toBe(expected);
      }
    );
  });

  describe('Multiple Items Scenarios', () => {
    test.each([
      // [items array, expectedTotal]
      [
        [{ name: 'Chipa', price: 5000, qty: 2 }],
        10000
      ],
      [
        [
          { name: 'Chipa', price: 5000, qty: 2 },
          { name: 'Tereré', price: 3000, qty: 1 }
        ],
        13000
      ],
      [
        [
          { name: 'Chipa', price: 5000, qty: 1 },
          { name: 'Tereré', price: 3000, qty: 2 },
          { name: 'Empanada', price: 2500, qty: 3 }
        ],
        18500
      ],
    ])('should calculate total for %j = %i Gs', (items, expected) => {
      // Arrange
      items.forEach(item => {
        const product = createProduct({ 
          name: item.name, 
          price: item.price 
        });
        cart.addItem(product, item.qty);
      });

      // Act
      const total = cart.getTotal();

      // Assert
      expect(total).toBe(expected);
    });
  });

  describe('Edge Cases', () => {
    test.each([
      [[], 0, 'empty cart'],
      [[{ name: 'Free Item', price: 0, qty: 5 }], 0, 'free items'],
      [[{ name: 'Expensive', price: 1000000, qty: 1 }], 1000000, 'high price'],
    ])('should handle %s', (items, expected, description) => {
      // Arrange
      items.forEach(item => {
        const product = createProduct({ 
          name: item.name, 
          price: item.price 
        });
        cart.addItem(product, item.qty);
      });

      // Act
      const total = cart.getTotal();

      // Assert
      expect(total).toBe(expected);
    });
  });
});
```

---

## 2.3 Test Factories & Fixtures

### The Problem: Repetitive Test Data Setup

```typescript
// ❌ BAD: Repetitive, hard to maintain
test('test 1', () => {
  const user = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    createdAt: new Date()
  };
  // ...
});

test('test 2', () => {
  const user = {
    id: '2',
    name: 'Test User',
    email: 'test2@example.com',
    role: 'user',
    createdAt: new Date()
  };
  // ...
});
```

### The Solution: Factories

```typescript
// ✅ GOOD: Reusable, maintainable
const UserFactory = {
  build: (overrides?: Partial<User>): User => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'user',
    createdAt: new Date(),
    ...overrides
  })
};

test('test 1', () => {
  const user = UserFactory.build();
  // ...
});

test('test 2', () => {
  const admin = UserFactory.build({ role: 'admin' });
  // ...
});
```

---

### Generating Factories with OpenCode

**Prompt**:
```
Create test factories for these TypeScript types:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  profile?: UserProfile;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  seller: User;
}

interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}
```

Requirements:
- Use @faker-js/faker for random data
- Support overrides
- Create realistic Paraguayan data (names, products)
- Include relationship helpers (e.g., createOrderWithItems)
- Export as typed factory objects
```

**OpenCode Output**:
```typescript
// tests/factories/index.ts
import { faker } from '@faker-js/faker';
import { User, Product, Order, OrderItem, UserProfile } from '../src/types';

// Configure faker for Paraguayan locale
faker.locale = 'es';

export const UserFactory = {
  build: (overrides?: Partial<User>): User => ({
    id: `usr_${faker.string.alphanumeric(10)}`,
    name: faker.helpers.arrayElement([
      'María González',
      'Carlos Ramírez',
      'Ana Martínez',
      'José López',
      'Laura Silva',
      'Diego Fernández'
    ]),
    email: faker.internet.email(),
    role: 'user',
    createdAt: faker.date.past(),
    ...overrides
  }),

  buildAdmin: (overrides?: Partial<User>): User => ({
    ...UserFactory.build(overrides),
    role: 'admin'
  }),

  buildMany: (count: number, overrides?: Partial<User>): User[] => {
    return Array.from({ length: count }, () => UserFactory.build(overrides));
  }
};

export const ProductFactory = {
  build: (overrides?: Partial<Product>): Product => ({
    id: `prod_${faker.string.alphanumeric(10)}`,
    name: faker.helpers.arrayElement([
      'Chipa',
      'Sopa Paraguaya',
      'Tereré',
      'Empanada',
      'Mbeju',
      'Kivevé',
      'Locro',
      'Pastel Mandi\'o'
    ]),
    price: faker.number.int({ min: 1000, max: 50000 }), // 1,000 - 50,000 Gs
    category: faker.helpers.arrayElement([
      'Comida Típica',
      'Bebidas',
      'Postres',
      'Snacks'
    ]),
    inStock: faker.datatype.boolean(0.9), // 90% in stock
    seller: UserFactory.build(),
    ...overrides
  }),

  buildMany: (count: number, overrides?: Partial<Product>): Product[] => {
    return Array.from({ length: count }, () => ProductFactory.build(overrides));
  }
};

export const OrderItemFactory = {
  build: (overrides?: Partial<OrderItem>): OrderItem => ({
    id: `item_${faker.string.alphanumeric(10)}`,
    product: ProductFactory.build(),
    quantity: faker.number.int({ min: 1, max: 10 }),
    priceAtTime: faker.number.int({ min: 1000, max: 50000 }),
    ...overrides
  })
};

export const OrderFactory = {
  build: (overrides?: Partial<Order>): Order => {
    const items = OrderItemFactory.buildMany(
      faker.number.int({ min: 1, max: 5 })
    );
    const total = items.reduce(
      (sum, item) => sum + item.priceAtTime * item.quantity,
      0
    );

    return {
      id: `ord_${faker.string.alphanumeric(10)}`,
      user: UserFactory.build(),
      items,
      total,
      status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
      createdAt: faker.date.recent(),
      ...overrides
    };
  },

  buildWithSpecificItems: (user: User, products: Product[]): Order => {
    const items = products.map(product => ({
      id: `item_${faker.string.alphanumeric(10)}`,
      product,
      quantity: faker.number.int({ min: 1, max: 3 }),
      priceAtTime: product.price
    }));

    const total = items.reduce(
      (sum, item) => sum + item.priceAtTime * item.quantity,
      0
    );

    return {
      id: `ord_${faker.string.alphanumeric(10)}`,
      user,
      items,
      total,
      status: 'pending',
      createdAt: new Date()
    };
  },

  buildCompleted: (overrides?: Partial<Order>): Order => ({
    ...OrderFactory.build(overrides),
    status: 'completed'
  })
};
```

---

### Using Factories in Tests

```typescript
import { UserFactory, ProductFactory, OrderFactory } from '../factories';

describe('Order Processing', () => {
  test('should process order for registered user', () => {
    // Arrange
    const user = UserFactory.build({ 
      email: 'customer@fpuna.edu.py' 
    });
    const products = ProductFactory.buildMany(3);
    const order = OrderFactory.buildWithSpecificItems(user, products);

    // Act
    const result = processOrder(order);

    // Assert
    expect(result.success).toBe(true);
  });

  test('should reject order for guest user', () => {
    // Arrange
    const guest = UserFactory.build({ role: 'guest' });
    const order = OrderFactory.build({ user: guest });

    // Act & Assert
    expect(() => processOrder(order)).toThrow('Guests cannot place orders');
  });
});
```

---

## 2.4 Dealing with Flaky Tests

### What Are Flaky Tests?

**Definition**: Tests that sometimes pass and sometimes fail without code changes.

**Common Causes**:
1. Timing issues (race conditions)
2. Async operations not awaited
3. Shared state between tests
4. External dependencies (network, database)
5. Test order dependencies

---

### Identifying Flaky Tests

```bash
# Run tests multiple times to detect flakiness
npx playwright test --repeat-each=10

# Run in parallel to expose race conditions
npx playwright test --workers=4
```

---

### Fixing Common Flaky Test Patterns

#### Problem 1: Fixed Timeouts

```typescript
// ❌ FLAKY: Fixed wait
test('loads data', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForTimeout(2000); // Sometimes not enough!
  await expect(page.getByText('Data loaded')).toBeVisible();
});

// ✅ STABLE: Wait for condition
test('loads data', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Data loaded')).toBeVisible({
    timeout: 10000 // Max wait, but proceeds as soon as visible
  });
});
```

---

#### Problem 2: Shared State

```typescript
// ❌ FLAKY: Tests share state
let sharedCart;

test('add item', () => {
  sharedCart.addItem(product, 1);
  expect(sharedCart.getItems()).toHaveLength(1);
});

test('remove item', () => {
  // Depends on previous test!
  sharedCart.removeItem(product.id);
  expect(sharedCart.getItems()).toHaveLength(0);
});

// ✅ STABLE: Independent tests
test('add item', () => {
  const cart = new ShoppingCart();
  cart.addItem(product, 1);
  expect(cart.getItems()).toHaveLength(1);
});

test('remove item', () => {
  const cart = new ShoppingCart();
  const product = ProductFactory.build();
  cart.addItem(product, 1);
  cart.removeItem(product.id);
  expect(cart.getItems()).toHaveLength(0);
});
```

---

#### Problem 3: Network Timing

```typescript
// ❌ FLAKY: Real API calls
test('fetches users', async () => {
  const users = await api.getUsers(); // Network dependent
  expect(users.length).toBeGreaterThan(0);
});

// ✅ STABLE: Mocked responses
test('fetches users', async ({ page }) => {
  await page.route('**/api/users', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 1, name: 'Test' }])
    });
  });

  const users = await api.getUsers();
  expect(users).toHaveLength(1);
});
```

---

### OpenCode Prompt for Debugging Flaky Tests

```
This test is flaky (passes sometimes, fails sometimes):

```typescript
[paste flaky test code]
```

Failure output:
```
[paste error when it fails]
```

Please:
1. Identify the likely cause of flakiness
2. Explain why it's non-deterministic
3. Provide a stable version of the test
4. Add comments explaining the fix
```

---

## 2.5 Test Maintenance & Refactoring

### When Tests Become Technical Debt

**Signs your test suite needs refactoring**:
- Tests take > 10 minutes to run
- Same setup code repeated everywhere
- Tests break when implementation details change (not behavior)
- Hard to understand what's being tested
- Flaky tests ignored/disabled

---

### Refactoring Strategy

```
1. Identify duplication → Extract to helpers
2. Find brittle tests → Use better selectors
3. Slow tests → Optimize or split
4. Unclear tests → Improve names and structure
5. Validate → Ensure all tests still pass
```

---

### OpenCode-Assisted Refactoring

**Prompt**:
```
Refactor this test file to improve maintainability:

```typescript
[paste messy test file with duplication]
```

Issues to fix:
1. Repeated setup code
2. Magic numbers and strings
3. Unclear test names
4. No helper functions
5. Inconsistent patterns

Provide refactored version with:
- Extracted helper functions
- Named constants
- Improved test names
- Consistent patterns
- Comments explaining complex logic
```

---

## Week 5 Practical Exercises

### Exercise 2.1: Generate Complete Test Suite (120 minutes)

**Objective**: Generate 50+ tests for a complete class using OpenCode

**Scenario**: Test the `UserAuthenticationService` class

**Tasks**:

1. **Analyze Requirements** (15 min):
   - Use OpenCode to analyze the class
   - Create comprehensive test plan

2. **Generate Structure** (15 min):
   - Generate describe blocks and test names
   - Organize into logical groups

3. **Implement Tests** (60 min):
   - Use OpenCode to implement all tests
   - Review and refine generated code
   - Run tests and fix any issues

4. **Add Data-Driven Tests** (20 min):
   - Convert repetitive tests to data-driven
   - Add test.each() for validation scenarios

5. **Measure Coverage** (10 min):
   - Run coverage report
   - Identify gaps
   - Add missing tests

**Deliverable**:
- 50+ passing tests
- 90%+ code coverage
- Well-organized test file
- Documentation of OpenCode prompts used

---

### Exercise 2.2: Build Test Factory Library (90 minutes)

**Objective**: Create reusable test factories for your capstone project

**Tasks**:

1. **Identify Data Types** (10 min):
   - List all main types/models in your project
   - Prioritize the 5 most commonly used

2. **Generate Factories** (40 min):
   - Use OpenCode to generate factory for each type
   - Include realistic data (Paraguayan context)
   - Add relationship helpers

3. **Create Test Utilities** (25 min):
   - Database seeding functions
   - Authentication helpers
   - Common assertion helpers

4. **Document Usage** (15 min):
   - Create examples for each factory
   - Document helper functions
   - Add to project README

**Deliverable**:
- Complete factory library file
- Test utilities module
- Usage documentation with examples

---

### Exercise 2.3: Fix Flaky Tests (60 minutes)

**Objective**: Identify and fix flaky tests in a provided codebase

**Scenario**: You're given a test suite with 5 flaky tests

**Tasks**:

1. **Identify Flaky Tests** (15 min):
   - Run tests 10 times each
   - Document which ones fail intermittently
   - Note failure patterns

2. **Diagnose Root Causes** (20 min):
   - Analyze flaky test code
   - Use OpenCode to identify issues
   - Categorize by type (timing, state, etc.)

3. **Fix Tests** (20 min):
   - Implement fixes for each
   - Test fixes by running 20x
   - Verify 100% pass rate

4. **Document Learnings** (5 min):
   - What caused flakiness?
   - What patterns to avoid?
   - Best practices learned

**Deliverable**:
- All tests passing reliably
- Report on fixes made
- Prevention guidelines document

---

## Knowledge Check Quiz

1. **What's the main benefit of test generation at scale?**
   a) Tests are always perfect
   b) No human review needed
   c) Dramatically faster test creation
   d) Tests never need maintenance

2. **What is data-driven testing?**
   a) Testing database operations
   b) Running same logic with multiple inputs
   c) Testing data validation
   d) Generating random test data

3. **What's the purpose of test factories?**
   a) Manufacturing tests
   b) Creating reusable test data builders
   c) Running tests in factories
   d) Automated test generation

4. **What causes flaky tests?**
   a) Bad code
   b) Timing issues and race conditions
   c) Too many tests
   d) OpenCode errors

5. **When should you refactor tests?**
   a) Never, tests are sacred
   b) Every Friday
   c) When they become hard to maintain
   d) Only when they fail

**Answer Key**: [1-c, 2-b, 3-b, 4-b, 5-c]

---

## Week 5 Summary

This week, you mastered:

### Key Concepts
- ✅ Test generation workflow (analyze → design → generate → refine)
- ✅ Data-driven testing with test.each()
- ✅ Test factories and fixtures
- ✅ Flaky test identification and fixing
- ✅ Test suite maintenance and refactoring

### Skills Developed
- ✅ Generate 50+ tests in hours, not days
- ✅ Create reusable test data factories
- ✅ Write parameterized tests efficiently
- ✅ Debug and fix flaky tests systematically
- ✅ Maintain large test suites

### Practical Applications
- ✅ Can test any feature comprehensively
- ✅ Can build test infrastructure quickly
- ✅ Can ensure test reliability
- ✅ Ready for enterprise-scale testing

---

## Next Week: Module 3 - API Testing Mastery

**Week 6 Preview**:
- REST API testing in depth
- GraphQL API testing
- Contract testing
- API performance testing
- Security testing for APIs

---

## Additional Resources

### Faker.js
- [Faker Documentation](https://fakerjs.dev/)
- [Localization Guide](https://fakerjs.dev/guide/localization.html)

### Test Patterns
- [Test Data Builders](https://wiki.c2.com/?TestDataBuilder)
- [Object Mother Pattern](https://martinfowler.com/bliki/ObjectMother.html)

### Flaky Tests
- [Google Testing Blog - Flakiness](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)
- [Playwright Test Retry](https://playwright.dev/docs/test-retries)

---

**Module Status**: ✅ Week 5 Complete

**Next Module**: [QA Track Module 3 - API Testing Mastery](./QA-TRACK-MODULE-03.md)
