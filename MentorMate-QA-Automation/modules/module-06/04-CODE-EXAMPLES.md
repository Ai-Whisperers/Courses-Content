# Module 6: Test Implementation - Code Examples

**Purpose**: Reference collection of all code examples and patterns from Module 6

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Table of Contents

1. [Unit Test Examples](#unit-test-examples)
2. [Integration Test Examples](#integration-test-examples)
3. [E2E Test Examples](#e2e-test-examples)
4. [Mocking Patterns](#mocking-patterns)
5. [Test Utilities and Helpers](#test-utilities-and-helpers)
6. [Debugging Examples](#debugging-examples)
7. [AI Prompts Collection](#ai-prompts-collection)

---

## Unit Test Examples

### Example 1: Basic Unit Test with Jest (JavaScript)

```javascript
// src/userService.js
class UserService {
  constructor(database, emailService) {
    this.database = database;
    this.emailService = emailService;
  }

  async createUser(userData) {
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }

    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    const existingUser = await this.database.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = await this.database.create({
      email: userData.email,
      password: this.hashPassword(userData.password),
      createdAt: new Date()
    });

    await this.emailService.sendWelcomeEmail(user.email);

    return user;
  }

  hashPassword(password) {
    // Simplified for example
    return `hashed_${password}`;
  }
}

module.exports = UserService;
```

```javascript
// __tests__/userService.test.js
const UserService = require('../src/userService');

describe('UserService', () => {
  let userService;
  let mockDatabase;
  let mockEmailService;

  beforeEach(() => {
    // ARRANGE: Set up mocks
    mockDatabase = {
      findByEmail: jest.fn(),
      create: jest.fn()
    };

    mockEmailService = {
      sendWelcomeEmail: jest.fn().mockResolvedValue(true)
    };

    userService = new UserService(mockDatabase, mockEmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const validUserData = {
      email: 'test@example.com',
      password: 'SecurePass123'
    };

    it('should create user with valid data', async () => {
      // ARRANGE
      mockDatabase.findByEmail.mockResolvedValue(null);
      mockDatabase.create.mockResolvedValue({
        id: '123',
        email: validUserData.email,
        createdAt: new Date()
      });

      // ACT
      const result = await userService.createUser(validUserData);

      // ASSERT
      expect(result).toMatchObject({
        id: '123',
        email: validUserData.email
      });
      expect(mockDatabase.create).toHaveBeenCalledWith({
        email: validUserData.email,
        password: expect.stringContaining('hashed_'),
        createdAt: expect.any(Date)
      });
      expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
        validUserData.email
      );
    });

    it('should throw error when email is missing', async () => {
      // ACT & ASSERT
      await expect(
        userService.createUser({ password: 'password123' })
      ).rejects.toThrow('Email and password are required');
    });

    it('should throw error when password is too short', async () => {
      await expect(
        userService.createUser({ email: 'test@test.com', password: 'short' })
      ).rejects.toThrow('Password must be at least 8 characters');
    });

    it('should throw error when email already exists', async () => {
      mockDatabase.findByEmail.mockResolvedValue({ id: '456' });

      await expect(
        userService.createUser(validUserData)
      ).rejects.toThrow('Email already exists');
    });
  });
});
```

**Key Points:**
- AAA pattern clearly separated
- Mocks set up in `beforeEach`
- Specific assertions using `toMatchObject`
- Error cases tested with `rejects.toThrow`
- Mock call verification

---

### Example 2: Unit Test with Vitest (TypeScript)

```typescript
// src/calculator.ts
export class Calculator {
  add(a: number, b: number): number {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new Error('Invalid input: numbers must be finite');
    }
    return a + b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }

  average(numbers: number[]): number {
    if (numbers.length === 0) {
      throw new Error('Cannot calculate average of empty array');
    }
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return sum / numbers.length;
  }
}
```

```typescript
// __tests__/calculator.test.ts
import { describe, it, expect } from 'vitest';
import { Calculator } from '../src/calculator';

describe('Calculator', () => {
  const calculator = new Calculator();

  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(calculator.add(-5, -3)).toBe(-8);
    });

    it('should add decimal numbers', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('should throw error for infinite input', () => {
      expect(() => calculator.add(Infinity, 5)).toThrow('Invalid input');
    });
  });

  describe('divide', () => {
    it('should divide numbers correctly', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(5, 2)).toBe(2.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });
  });

  describe('average', () => {
    it('should calculate average of numbers', () => {
      expect(calculator.average([1, 2, 3, 4, 5])).toBe(3);
    });

    it('should handle single number', () => {
      expect(calculator.average([42])).toBe(42);
    });

    it('should throw error for empty array', () => {
      expect(() => calculator.average([])).toThrow(
        'Cannot calculate average of empty array'
      );
    });
  });
});
```

---

### Example 3: Pytest Unit Test (Python)

```python
# src/order_processor.py
from typing import List, Dict
from datetime import datetime

class OrderProcessor:
    def __init__(self, inventory_service, pricing_service):
        self.inventory_service = inventory_service
        self.pricing_service = pricing_service

    def process_order(self, customer_id: str, items: List[Dict]) -> Dict:
        if not customer_id:
            raise ValueError("Customer ID is required")

        if not items:
            raise ValueError("Order must contain at least one item")

        # Check inventory
        for item in items:
            available = self.inventory_service.check_stock(
                item['product_id'], item['quantity']
            )
            if not available:
                raise ValueError(f"Insufficient stock for {item['product_id']}")

        # Calculate prices
        total = 0
        for item in items:
            price = self.pricing_service.get_price(item['product_id'])
            total += price * item['quantity']

        return {
            'order_id': f"ORD-{datetime.now().timestamp()}",
            'customer_id': customer_id,
            'items': items,
            'total': total,
            'status': 'pending',
            'created_at': datetime.now()
        }
```

```python
# tests/test_order_processor.py
import pytest
from unittest.mock import Mock, MagicMock
from src.order_processor import OrderProcessor

@pytest.fixture
def mock_inventory():
    return Mock()

@pytest.fixture
def mock_pricing():
    return Mock()

@pytest.fixture
def order_processor(mock_inventory, mock_pricing):
    return OrderProcessor(mock_inventory, mock_pricing)

class TestOrderProcessor:
    def test_process_order_with_valid_data(self, order_processor, mock_inventory, mock_pricing):
        # Arrange
        mock_inventory.check_stock.return_value = True
        mock_pricing.get_price.return_value = 29.99
        items = [{'product_id': 'PROD-1', 'quantity': 2}]

        # Act
        result = order_processor.process_order('CUST-123', items)

        # Assert
        assert result['customer_id'] == 'CUST-123'
        assert result['total'] == 59.98
        assert result['status'] == 'pending'
        assert 'order_id' in result
        mock_inventory.check_stock.assert_called_once_with('PROD-1', 2)
        mock_pricing.get_price.assert_called_once_with('PROD-1')

    def test_process_order_without_customer_id(self, order_processor):
        # Act & Assert
        with pytest.raises(ValueError, match="Customer ID is required"):
            order_processor.process_order(None, [{'product_id': 'PROD-1', 'quantity': 1}])

    def test_process_order_with_empty_items(self, order_processor):
        with pytest.raises(ValueError, match="Order must contain at least one item"):
            order_processor.process_order('CUST-123', [])

    def test_process_order_with_insufficient_stock(self, order_processor, mock_inventory):
        # Arrange
        mock_inventory.check_stock.return_value = False

        # Act & Assert
        with pytest.raises(ValueError, match="Insufficient stock"):
            order_processor.process_order(
                'CUST-123',
                [{'product_id': 'PROD-1', 'quantity': 100}]
            )
```

---

## Integration Test Examples

### Example 1: Express API Integration Test

```javascript
// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

let users = [];
let nextId = 1;

app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  if (age && (age < 0 || age > 150)) {
    return res.status(400).json({ error: 'Invalid age' });
  }

  const user = { id: nextId++, name, email, age, createdAt: new Date() };
  users.push(user);

  res.status(201).json(user);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

module.exports = app;
```

```javascript
// __tests__/integration/users.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/users', () => {
  beforeEach(() => {
    // Reset state before each test
    // In real app, would reset database
  });

  it('should create user with valid data', async () => {
    // ACT
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      })
      .expect(201);

    // ASSERT
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      createdAt: expect.any(String)
    });

    // Verify database state
    const getResponse = await request(app)
      .get(`/api/users/${response.body.id}`)
      .expect(200);

    expect(getResponse.body.email).toBe('john@example.com');
  });

  it('should return 400 when name is missing', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com' })
      .expect(400);

    expect(response.body.error).toContain('Name and email required');
  });

  it('should return 400 for invalid age', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'test@test.com', age: -5 })
      .expect(400);

    expect(response.body.error).toContain('Invalid age');
  });

  it('should handle concurrent requests', async () => {
    // Create multiple users simultaneously
    const requests = [
      request(app).post('/api/users').send({ name: 'User1', email: 'user1@test.com' }),
      request(app).post('/api/users').send({ name: 'User2', email: 'user2@test.com' }),
      request(app).post('/api/users').send({ name: 'User3', email: 'user3@test.com' })
    ];

    const responses = await Promise.all(requests);

    responses.forEach((response, index) => {
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(`User${index + 1}`);
    });
  });
});

describe('GET /api/users/:id', () => {
  it('should return 404 for non-existent user', async () => {
    const response = await request(app)
      .get('/api/users/999999')
      .expect(404);

    expect(response.body.error).toBe('User not found');
  });
});
```

---

### Example 2: Database Integration Test (Knex.js)

```javascript
// __tests__/integration/database.test.js
const knex = require('knex');
const config = require('../../knexfile');

describe('Database Integration Tests', () => {
  let db;

  beforeAll(async () => {
    // Use test database
    db = knex(config.test);
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  beforeEach(async () => {
    // Clean tables before each test
    await db('orders').del();
    await db('customers').del();
  });

  it('should create customer and order with foreign key', async () => {
    // ARRANGE: Create customer
    const [customerId] = await db('customers').insert({
      name: 'John Doe',
      email: 'john@example.com'
    }).returning('id');

    // ACT: Create order
    const [orderId] = await db('orders').insert({
      customer_id: customerId,
      total: 100.50,
      status: 'pending'
    }).returning('id');

    // ASSERT: Verify order was created
    const order = await db('orders').where({ id: orderId }).first();
    expect(order).toBeDefined();
    expect(order.customer_id).toBe(customerId);
    expect(order.total).toBe('100.50'); // Decimal as string
  });

  it('should enforce foreign key constraint', async () => {
    // Try to create order with non-existent customer
    await expect(
      db('orders').insert({
        customer_id: 99999,
        total: 50.00,
        status: 'pending'
      })
    ).rejects.toThrow(); // Foreign key constraint violation
  });

  it('should handle transactions correctly', async () => {
    // Start transaction
    await db.transaction(async (trx) => {
      const [customerId] = await trx('customers').insert({
        name: 'Jane Doe',
        email: 'jane@example.com'
      }).returning('id');

      await trx('orders').insert({
        customer_id: customerId,
        total: 75.00,
        status: 'pending'
      });

      // Rollback transaction
      throw new Error('Rollback test');
    }).catch(() => {
      // Expected error
    });

    // Verify nothing was committed
    const customers = await db('customers').select();
    expect(customers.length).toBe(0);
  });
});
```

---

## E2E Test Examples

### Example 1: Playwright E2E Test with Page Object

```typescript
// tests/e2e/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton = page.locator('[data-testid="login-btn"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectError(message: string) {
    await this.errorMessage.waitFor({ state: 'visible' });
    await expect(this.errorMessage).toHaveText(message);
  }

  async isLoggedIn(): Promise<boolean> {
    // Check if redirected to dashboard
    await this.page.waitForURL('/dashboard', { timeout: 5000 });
    return this.page.url().includes('/dashboard');
  }
}
```

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with valid credentials', async ({ page }) => {
    // ACT
    await loginPage.login('user@example.com', 'password123');

    // ASSERT
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toHaveText('Dashboard');
  });

  test('should show error with invalid credentials', async () => {
    // ACT
    await loginPage.login('wrong@example.com', 'wrongpassword');

    // ASSERT
    await loginPage.expectError('Invalid email or password');
  });

  test('should require email', async () => {
    await loginPage.login('', 'password123');
    await loginPage.expectError('Email is required');
  });

  test('should remember me option persist session', async ({ context }) => {
    // Login with remember me
    await loginPage.login('user@example.com', 'password123');

    // Close and reopen browser
    const newPage = await context.newPage();
    await newPage.goto('/dashboard');

    // Should still be logged in
    await expect(newPage).toHaveURL('/dashboard');
  });
});
```

---

### Example 2: Cypress E2E Test

```javascript
// cypress/e2e/checkout.cy.js
describe('Checkout Flow', () => {
  beforeEach(() => {
    // Reset database and login
    cy.task('db:seed');
    cy.login('user@example.com', 'password');
  });

  it('should complete checkout process', () => {
    // Add items to cart
    cy.visit('/products');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();

    // Go to cart
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');

    // Verify cart contents
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
    cy.get('[data-testid="cart-total"]').should('contain', '$29.99');

    // Proceed to checkout
    cy.get('[data-testid="checkout-btn"]').click();

    // Fill shipping info
    cy.get('[data-testid="shipping-name"]').type('John Doe');
    cy.get('[data-testid="shipping-address"]').type('123 Main St');
    cy.get('[data-testid="shipping-city"]').type('New York');
    cy.get('[data-testid="shipping-zip"]').type('10001');

    // Fill payment info
    cy.get('[data-testid="card-number"]').type('4242424242424242');
    cy.get('[data-testid="card-expiry"]').type('12/25');
    cy.get('[data-testid="card-cvc"]').type('123');

    // Submit order
    cy.get('[data-testid="place-order"]').click();

    // Verify success
    cy.url().should('include', '/order-confirmation');
    cy.get('[data-testid="order-number"]').should('exist');
    cy.get('[data-testid="success-message"]').should(
      'contain',
      'Your order has been placed'
    );
  });

  it('should handle payment failure gracefully', () => {
    // ... add items to cart ...

    // Use card that will be declined
    cy.get('[data-testid="card-number"]').type('4000000000000002');

    cy.get('[data-testid="place-order"]').click();

    // Verify error handling
    cy.get('[data-testid="error-message"]').should(
      'contain',
      'Payment declined'
    );
    cy.url().should('include', '/checkout'); // Still on checkout page
  });
});
```

---

## Mocking Patterns

### Pattern 1: Jest Mock Functions

```javascript
// Basic mock
const mockFunction = jest.fn();
mockFunction.mockReturnValue('mocked value');

// Mock resolved promise
const asyncMock = jest.fn();
asyncMock.mockResolvedValue({ id: 1, name: 'Test' });

// Mock rejected promise
asyncMock.mockRejectedValue(new Error('Failed'));

// Mock implementation
const complexMock = jest.fn((x) => x * 2);

// Mock different return values per call
mockFunction
  .mockReturnValueOnce('first')
  .mockReturnValueOnce('second')
  .mockReturnValue('default');

// Verify calls
expect(mockFunction).toHaveBeenCalled();
expect(mockFunction).toHaveBeenCalledTimes(3);
expect(mockFunction).toHaveBeenCalledWith('specific', 'args');
expect(mockFunction).toHaveBeenLastCalledWith('last', 'call');
```

### Pattern 2: Module Mocking

```javascript
// Mock entire module
jest.mock('../src/database');
const database = require('../src/database');

// Configure mocked methods
database.connect.mockResolvedValue(true);
database.query.mockResolvedValue([{ id: 1, name: 'Test' }]);

// Partial module mock
jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'), // Keep real implementations
  randomId: jest.fn(() => 'fixed-id'), // Mock specific function
}));
```

### Pattern 3: Spy on Methods

```javascript
const calculator = new Calculator();

// Spy on method
const addSpy = jest.spyOn(calculator, 'add');

// Use object normally
calculator.add(2, 3);

// Verify spy
expect(addSpy).toHaveBeenCalledWith(2, 3);

// Restore original implementation
addSpy.mockRestore();
```

### Pattern 4: Mock Time

```javascript
// Fake timers
jest.useFakeTimers();

// Set specific time
jest.setSystemTime(new Date('2025-01-01'));

// Fast-forward time
setTimeout(() => console.log('callback'), 1000);
jest.advanceTimersByTime(1000);

// Run all timers
jest.runAllTimers();

// Restore real timers
jest.useRealTimers();
```

---

## Test Utilities and Helpers

### Factory Pattern for Test Data

```javascript
// tests/factories/userFactory.js
const { faker } = require('@faker-js/faker');

function createUser(overrides = {}) {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 18, max: 80 }),
    createdAt: new Date(),
    ...overrides
  };
}

function createUsers(count = 5, overrides = {}) {
  return Array.from({ length: count }, () => createUser(overrides));
}

module.exports = { createUser, createUsers };

// Usage in tests
const { createUser } = require('../factories/userFactory');

test('should create user', () => {
  const user = createUser({ email: 'specific@example.com' });
  expect(user.email).toBe('specific@example.com');
  expect(user.name).toBeDefined();
});
```

### Test Helpers

```javascript
// tests/helpers/authHelper.js
const request = require('supertest');

async function loginUser(app, credentials) {
  const response = await request(app)
    .post('/api/auth/login')
    .send(credentials);

  return response.body.token;
}

async function createAuthenticatedRequest(app, method, url, token, data) {
  const req = request(app)[method](url)
    .set('Authorization', `Bearer ${token}`);

  if (data) {
    req.send(data);
  }

  return req;
}

module.exports = { loginUser, createAuthenticatedRequest };

// Usage
const { loginUser } = require('../helpers/authHelper');

test('should access protected route', async () => {
  const token = await loginUser(app, { email: 'user@test.com', password: 'pass' });

  const response = await request(app)
    .get('/api/protected')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
});
```

### Custom Matchers

```javascript
// tests/matchers/customMatchers.js
expect.extend({
  toBeValidEmail(received) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);

    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid email`
          : `expected ${received} to be a valid email`,
    };
  },

  toBeWithinRange(received, min, max) {
    const pass = received >= min && received <= max;

    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be within ${min}-${max}`
          : `expected ${received} to be within ${min}-${max}`,
    };
  },
});

// Usage
expect('test@example.com').toBeValidEmail();
expect(25).toBeWithinRange(18, 65);
```

---

## Debugging Examples

### Debugging Async Issues

**Problem:**

```javascript
// ❌ FAILING TEST
test('creates user', async () => {
  const user = userService.createUser(userData); // Missing await!
  expect(user.id).toBeDefined(); // user is a Promise
});

// Error: Cannot read property 'id' of undefined
```

**Solution:**

```javascript
// ✅ FIXED TEST
test('creates user', async () => {
  const user = await userService.createUser(userData);
  expect(user.id).toBeDefined();
});
```

### Debugging Mock Issues

**Problem:**

```javascript
// ❌ FAILING TEST
test('fetches data', async () => {
  const data = await service.getData();
  expect(data).toBeDefined();
});

// Error: Cannot read property of undefined (mock not configured)
```

**Solution:**

```javascript
// ✅ FIXED TEST
test('fetches data', async () => {
  // Configure mock before calling
  mockDatabase.query.mockResolvedValue([{ id: 1, name: 'Test' }]);

  const data = await service.getData();
  expect(data).toBeDefined();
  expect(data[0].name).toBe('Test');
});
```

### Debugging Flaky E2E Tests

**Problem:**

```typescript
// ❌ FLAKY TEST
test('should show results', async ({ page }) => {
  await page.click('[data-testid="search-btn"]');
  const results = await page.locator('[data-testid="result"]').count();
  expect(results).toBeGreaterThan(0); // Sometimes fails
});
```

**Solution:**

```typescript
// ✅ FIXED TEST
test('should show results', async ({ page }) => {
  await page.click('[data-testid="search-btn"]');

  // Wait for results to appear
  await page.waitForSelector('[data-testid="result"]', { state: 'visible' });

  const results = await page.locator('[data-testid="result"]').count();
  expect(results).toBeGreaterThan(0);
});
```

---

## AI Prompts Collection

### Prompt 1: Generate Unit Tests

```
Generate comprehensive Jest unit tests for this class:

```javascript
[paste class code]
```

Requirements:
- Test all public methods
- Include happy path, error cases, and edge cases
- Mock all dependencies
- Use AAA pattern (Arrange-Act-Assert)
- Test naming: "should [expected behavior] when [condition]"
- Achieve 100% coverage
- Verify mock calls

Organize with describe blocks and include beforeEach/afterEach for setup/cleanup.
```

### Prompt 2: Generate Integration Tests

```
Generate supertest integration tests for this API:

```javascript
[paste API code]
```

Requirements:
- Test all endpoints
- Test success (2xx) and error (4xx, 5xx) cases
- Verify response status codes and body structure
- Test database state changes (use GET to verify)
- Reset state before each test
- Use descriptive test names
- Group by endpoint

Achieve 90%+ coverage of API routes.
```

### Prompt 3: Generate E2E Tests with Page Object

```
Create Playwright E2E tests with Page Object Model.

Application:
[paste HTML or describe UI]

Requirements:
1. Create Page Object in pages/[Name]Page.ts with:
   - Locators using data-testid
   - Methods for all user actions
   - Helper methods for assertions

2. Create test file tests/[name].spec.ts with:
   - Test scenarios: [list scenarios]
   - Use Page Object methods
   - Test happy path and error cases
   - Verify UI changes and navigation
   - Use beforeEach for setup

Use TypeScript and Playwright best practices.
```

### Prompt 4: Debug Failing Test

```
This test is failing:

**Test code:**
```javascript
[paste test]
```

**Error:**
```
[paste error message and stack trace]
```

**Source code:**
```javascript
[paste relevant source code]
```

Please:
1. Explain why the test is failing
2. Is it a test bug or a code bug?
3. Provide the fix
4. Explain how to prevent similar issues
```

### Prompt 5: Improve Test Quality

```
Review these tests for quality issues:

```javascript
[paste tests]
```

Identify and fix:
1. Weak assertions (make them specific)
2. Missing edge cases
3. Test interdependencies
4. Unclear test names
5. Missing error message checks
6. Incomplete mock verification

Provide improved version with comments explaining each change.
```

---

## Best Practices Summary

### Unit Tests
✅ Fast (<100ms each)
✅ Isolated (mock external dependencies)
✅ Specific assertions
✅ Test one thing per test
✅ Descriptive names
✅ AAA pattern

### Integration Tests
✅ Test real interactions
✅ Use real database (test DB)
✅ Verify side effects
✅ Clean up after each test
✅ Test API contracts
✅ Check status codes and response structure

### E2E Tests
✅ Use Page Object Model
✅ Test critical user journeys
✅ Use data-testid selectors
✅ Let Playwright auto-wait
✅ Test on multiple browsers
✅ Keep tests independent

---

**Reference these examples as you implement your tests!**

[Continue to Quiz →](./05-QUIZ.md)
