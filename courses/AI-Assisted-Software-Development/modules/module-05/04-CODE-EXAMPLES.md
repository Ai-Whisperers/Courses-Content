# Module 5: Code Examples
## AI for Testing & Debugging

---

## Overview

This document contains practical code examples demonstrating AI-assisted testing patterns, debugging techniques, and quality assurance practices.

---

## Example 1: AI-Generated Unit Tests with Jest

### Original Code to Test

```typescript
// src/calculator.ts
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }

  power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  factorial(n: number): number {
    if (n < 0) {
      throw new Error('Factorial not defined for negative numbers');
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * this.factorial(n - 1);
  }
}
```

### AI Prompt Used
```
Generate comprehensive Jest tests for this Calculator class.
Include edge cases, boundary conditions, and error scenarios.
Follow AAA pattern. Target 100% coverage.
```

### AI-Generated Tests

```typescript
// src/calculator.test.ts
import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it('should add mixed positive and negative', () => {
      expect(calculator.add(-2, 5)).toBe(3);
    });

    it('should handle zero', () => {
      expect(calculator.add(5, 0)).toBe(5);
      expect(calculator.add(0, 5)).toBe(5);
      expect(calculator.add(0, 0)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('should handle large numbers', () => {
      expect(calculator.add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it('should handle result becoming negative', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });

    it('should subtract negative from positive', () => {
      expect(calculator.subtract(5, -3)).toBe(8);
    });

    it('should handle zero', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
      expect(calculator.subtract(0, 5)).toBe(-5);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(calculator.multiply(4, 3)).toBe(12);
    });

    it('should handle multiplication by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
      expect(calculator.multiply(0, 5)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(calculator.multiply(-4, 3)).toBe(-12);
      expect(calculator.multiply(-4, -3)).toBe(12);
    });

    it('should handle decimal multiplication', () => {
      expect(calculator.multiply(0.5, 4)).toBe(2);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should throw error on division by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(5, 2)).toBe(2.5);
    });

    it('should handle negative numbers', () => {
      expect(calculator.divide(-10, 2)).toBe(-5);
      expect(calculator.divide(10, -2)).toBe(-5);
      expect(calculator.divide(-10, -2)).toBe(5);
    });

    it('should handle zero dividend', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });
  });

  describe('power', () => {
    it('should calculate positive integer powers', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    it('should handle power of zero', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    it('should handle base of zero', () => {
      expect(calculator.power(0, 5)).toBe(0);
    });

    it('should handle negative exponents', () => {
      expect(calculator.power(2, -2)).toBe(0.25);
    });

    it('should handle fractional exponents', () => {
      expect(calculator.power(4, 0.5)).toBe(2);
    });
  });

  describe('factorial', () => {
    it('should calculate factorial of positive integers', () => {
      expect(calculator.factorial(5)).toBe(120);
      expect(calculator.factorial(6)).toBe(720);
    });

    it('should return 1 for factorial of 0', () => {
      expect(calculator.factorial(0)).toBe(1);
    });

    it('should return 1 for factorial of 1', () => {
      expect(calculator.factorial(1)).toBe(1);
    });

    it('should throw error for negative numbers', () => {
      expect(() => calculator.factorial(-1)).toThrow('Factorial not defined for negative numbers');
    });

    it('should handle larger factorials', () => {
      expect(calculator.factorial(10)).toBe(3628800);
    });
  });
});
```

---

## Example 2: Mocking External Dependencies

### Code with Dependencies

```typescript
// src/user-service.ts
import { EmailClient } from './email-client';
import { Database } from './database';
import { Logger } from './logger';

export interface User {
  id: string;
  email: string;
  name: string;
  verified: boolean;
}

export class UserService {
  constructor(
    private db: Database,
    private emailClient: EmailClient,
    private logger: Logger
  ) {}

  async createUser(email: string, name: string): Promise<User> {
    this.logger.info(`Creating user: ${email}`);

    // Check if user exists
    const existing = await this.db.findOne('users', { email });
    if (existing) {
      this.logger.warn(`User already exists: ${email}`);
      throw new Error('User already exists');
    }

    // Create user
    const user: User = {
      id: this.generateId(),
      email,
      name,
      verified: false,
    };

    await this.db.insert('users', user);
    this.logger.info(`User created: ${user.id}`);

    // Send verification email
    await this.emailClient.send({
      to: email,
      subject: 'Verify your email',
      template: 'verification',
      data: { name, verificationLink: `https://app.com/verify/${user.id}` },
    });

    return user;
  }

  async verifyUser(userId: string): Promise<User> {
    const user = await this.db.findById('users', userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.verified = true;
    await this.db.update('users', userId, { verified: true });

    return user;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
```

### AI-Generated Mocked Tests

```typescript
// src/user-service.test.ts
import { UserService, User } from './user-service';
import { Database } from './database';
import { EmailClient } from './email-client';
import { Logger } from './logger';

// Mock implementations
const mockDb: jest.Mocked<Database> = {
  findOne: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockEmailClient: jest.Mocked<EmailClient> = {
  send: jest.fn(),
};

const mockLogger: jest.Mocked<Logger> = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(mockDb, mockEmailClient, mockLogger);
  });

  describe('createUser', () => {
    const testEmail = 'test@example.com';
    const testName = 'Test User';

    it('should create a new user successfully', async () => {
      // Arrange
      mockDb.findOne.mockResolvedValue(null);
      mockDb.insert.mockResolvedValue(undefined);
      mockEmailClient.send.mockResolvedValue(undefined);

      // Act
      const user = await userService.createUser(testEmail, testName);

      // Assert
      expect(user.email).toBe(testEmail);
      expect(user.name).toBe(testName);
      expect(user.verified).toBe(false);
      expect(user.id).toBeDefined();

      expect(mockDb.findOne).toHaveBeenCalledWith('users', { email: testEmail });
      expect(mockDb.insert).toHaveBeenCalledWith('users', expect.objectContaining({
        email: testEmail,
        name: testName,
      }));
      expect(mockEmailClient.send).toHaveBeenCalledWith(expect.objectContaining({
        to: testEmail,
        subject: 'Verify your email',
        template: 'verification',
      }));
      expect(mockLogger.info).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      // Arrange
      mockDb.findOne.mockResolvedValue({ id: '123', email: testEmail });

      // Act & Assert
      await expect(userService.createUser(testEmail, testName))
        .rejects.toThrow('User already exists');

      expect(mockDb.insert).not.toHaveBeenCalled();
      expect(mockEmailClient.send).not.toHaveBeenCalled();
      expect(mockLogger.warn).toHaveBeenCalled();
    });

    it('should handle database insert failure', async () => {
      // Arrange
      mockDb.findOne.mockResolvedValue(null);
      mockDb.insert.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(userService.createUser(testEmail, testName))
        .rejects.toThrow('Database error');

      expect(mockEmailClient.send).not.toHaveBeenCalled();
    });

    it('should handle email sending failure gracefully', async () => {
      // Arrange
      mockDb.findOne.mockResolvedValue(null);
      mockDb.insert.mockResolvedValue(undefined);
      mockEmailClient.send.mockRejectedValue(new Error('Email service unavailable'));

      // Act & Assert
      await expect(userService.createUser(testEmail, testName))
        .rejects.toThrow('Email service unavailable');
    });
  });

  describe('verifyUser', () => {
    it('should verify existing user', async () => {
      // Arrange
      const mockUser: User = {
        id: '123',
        email: 'test@example.com',
        name: 'Test',
        verified: false,
      };
      mockDb.findById.mockResolvedValue(mockUser);
      mockDb.update.mockResolvedValue(undefined);

      // Act
      const result = await userService.verifyUser('123');

      // Assert
      expect(result.verified).toBe(true);
      expect(mockDb.update).toHaveBeenCalledWith('users', '123', { verified: true });
    });

    it('should throw error for non-existent user', async () => {
      // Arrange
      mockDb.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.verifyUser('nonexistent'))
        .rejects.toThrow('User not found');
    });
  });
});
```

---

## Example 3: Debugging with AI - Error Analysis

### Buggy Code

```typescript
// Original buggy implementation
class ShoppingCart {
  private items: CartItem[] = [];
  private discounts: Discount[] = [];

  addItem(product: Product, quantity: number): void {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  // Bug: Doesn't handle negative quantities
  removeItem(productId: string, quantity: number): void {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity -= quantity;
      // Bug: Doesn't remove item when quantity reaches 0
    }
  }

  // Bug: Discount calculation is wrong
  calculateTotal(): number {
    let total = 0;
    for (const item in this.items) {  // Bug: 'in' instead of 'of'
      total += item.product.price * item.quantity;
    }

    // Apply discounts
    for (const discount of this.discounts) {
      if (discount.type === 'percentage') {
        total -= total * discount.value;  // Bug: Should be value/100
      } else {
        total -= discount.value;
      }
    }

    return total;
  }

  // Bug: Race condition in async operation
  async checkout(): Promise<Order> {
    const total = this.calculateTotal();

    // Bug: Items cleared before order confirmed
    this.items = [];

    const order = await this.processPayment(total);
    return order;
  }
}
```

### AI Debugging Prompt
```
Analyze this ShoppingCart class for bugs. For each bug:
1. Identify the bug location
2. Explain the problem
3. Show the impact
4. Provide the fix
```

### Fixed Code with AI Guidance

```typescript
// Fixed implementation with AI-identified corrections

interface CartItem {
  product: Product;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
  code: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'failed';
}

class ShoppingCart {
  private items: CartItem[] = [];
  private discounts: Discount[] = [];

  addItem(product: Product, quantity: number): void {
    // Fix: Validate quantity
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId: string, quantity: number): void {
    // Fix: Validate quantity
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const itemIndex = this.items.findIndex(i => i.product.id === productId);
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    const item = this.items[itemIndex];

    // Fix: Prevent negative quantities
    if (quantity > item.quantity) {
      throw new Error('Cannot remove more than cart contains');
    }

    item.quantity -= quantity;

    // Fix: Remove item when quantity reaches 0
    if (item.quantity === 0) {
      this.items.splice(itemIndex, 1);
    }
  }

  calculateTotal(): number {
    let total = 0;

    // Fix: Use 'of' instead of 'in' for array iteration
    for (const item of this.items) {
      total += item.product.price * item.quantity;
    }

    // Apply discounts
    for (const discount of this.discounts) {
      if (discount.type === 'percentage') {
        // Fix: Divide percentage by 100
        total -= total * (discount.value / 100);
      } else {
        total -= discount.value;
      }
    }

    // Ensure total doesn't go negative
    return Math.max(0, Math.round(total * 100) / 100);
  }

  applyDiscount(discount: Discount): void {
    // Validate discount
    if (discount.type === 'percentage' && (discount.value < 0 || discount.value > 100)) {
      throw new Error('Percentage discount must be between 0 and 100');
    }
    if (discount.type === 'fixed' && discount.value < 0) {
      throw new Error('Fixed discount must be non-negative');
    }

    this.discounts.push(discount);
  }

  async checkout(): Promise<Order> {
    if (this.items.length === 0) {
      throw new Error('Cannot checkout empty cart');
    }

    const total = this.calculateTotal();

    // Fix: Store items before clearing
    const orderItems = [...this.items.map(item => ({
      product: { ...item.product },
      quantity: item.quantity,
    }))];

    try {
      const order = await this.processPayment(total, orderItems);

      // Fix: Only clear cart after successful payment
      if (order.status === 'confirmed') {
        this.items = [];
        this.discounts = [];
      }

      return order;
    } catch (error) {
      // Cart remains intact on failure
      throw error;
    }
  }

  private async processPayment(total: number, items: CartItem[]): Promise<Order> {
    // Simulated payment processing
    return {
      id: Date.now().toString(),
      items,
      total,
      status: 'confirmed',
    };
  }

  getItems(): ReadonlyArray<CartItem> {
    return this.items;
  }

  getTotal(): number {
    return this.calculateTotal();
  }

  clear(): void {
    this.items = [];
    this.discounts = [];
  }
}
```

### Tests to Prevent Regression

```typescript
describe('ShoppingCart - Bug Prevention', () => {
  let cart: ShoppingCart;
  const product: Product = { id: '1', name: 'Test', price: 10.00 };

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('removeItem', () => {
    it('should not allow negative quantities', () => {
      cart.addItem(product, 2);

      expect(() => cart.removeItem(product.id, 3))
        .toThrow('Cannot remove more than cart contains');
    });

    it('should remove item when quantity reaches zero', () => {
      cart.addItem(product, 2);
      cart.removeItem(product.id, 2);

      expect(cart.getItems()).toHaveLength(0);
    });
  });

  describe('calculateTotal', () => {
    it('should correctly apply percentage discount', () => {
      cart.addItem(product, 1); // $10
      cart.applyDiscount({ type: 'percentage', value: 10, code: 'SAVE10' });

      expect(cart.calculateTotal()).toBe(9.00);
    });

    it('should iterate all items correctly', () => {
      const product2: Product = { id: '2', name: 'Test 2', price: 20.00 };
      cart.addItem(product, 2);  // $20
      cart.addItem(product2, 1); // $20

      expect(cart.calculateTotal()).toBe(40.00);
    });
  });

  describe('checkout', () => {
    it('should preserve cart on payment failure', async () => {
      cart.addItem(product, 1);

      // Mock payment failure
      jest.spyOn(cart as any, 'processPayment')
        .mockRejectedValue(new Error('Payment failed'));

      await expect(cart.checkout()).rejects.toThrow('Payment failed');
      expect(cart.getItems()).toHaveLength(1);
    });

    it('should clear cart only after successful payment', async () => {
      cart.addItem(product, 1);

      const order = await cart.checkout();

      expect(order.status).toBe('confirmed');
      expect(cart.getItems()).toHaveLength(0);
    });
  });
});
```

---

## Example 4: Integration Test with AI

### API Integration Test

```typescript
// src/api.integration.test.ts
import request from 'supertest';
import { app } from './app';
import { db } from './database';

describe('User API Integration', () => {
  beforeAll(async () => {
    await db.connect();
    await db.migrate();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    await db.truncate('users');
  });

  describe('POST /api/users', () => {
    it('should create a user and return 201', async () => {
      const userData = {
        email: 'newuser@test.com',
        name: 'New User',
        password: 'SecurePass123!',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        email: userData.email,
        name: userData.name,
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'invalid-email',
          name: 'Test',
          password: 'SecurePass123!',
        })
        .expect(400);

      expect(response.body.error).toContain('email');
    });

    it('should return 409 for duplicate email', async () => {
      const userData = {
        email: 'duplicate@test.com',
        name: 'First User',
        password: 'SecurePass123!',
      };

      // Create first user
      await request(app).post('/api/users').send(userData);

      // Try to create duplicate
      const response = await request(app)
        .post('/api/users')
        .send({ ...userData, name: 'Second User' })
        .expect(409);

      expect(response.body.error).toContain('already exists');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      // Create user first
      const createResponse = await request(app)
        .post('/api/users')
        .send({
          email: 'getuser@test.com',
          name: 'Get User',
          password: 'SecurePass123!',
        });

      const userId = createResponse.body.id;

      // Get user
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body.id).toBe(userId);
      expect(response.body.email).toBe('getuser@test.com');
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/nonexistent-id')
        .expect(404);
    });
  });

  describe('Authentication Flow', () => {
    const testUser = {
      email: 'auth@test.com',
      name: 'Auth User',
      password: 'SecurePass123!',
    };

    beforeEach(async () => {
      await request(app).post('/api/users').send(testUser);
    });

    it('should complete full authentication flow', async () => {
      // Login
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(loginResponse.body).toHaveProperty('token');
      const token = loginResponse.body.token;

      // Access protected resource
      const protectedResponse = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(protectedResponse.body.email).toBe(testUser.email);
    });

    it('should reject invalid credentials', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('should reject expired token', async () => {
      // Use a known expired token for testing
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJleHAiOjB9.xxx';

      await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
  });
});
```

---

## Example 5: Async Testing Patterns

```typescript
// src/async-operations.test.ts

describe('Async Testing Patterns', () => {
  // Pattern 1: Testing Promises
  describe('Promise-based tests', () => {
    it('should resolve with correct value', async () => {
      const result = await fetchUserData('123');
      expect(result.id).toBe('123');
    });

    it('should reject with error', async () => {
      await expect(fetchUserData('invalid'))
        .rejects.toThrow('User not found');
    });
  });

  // Pattern 2: Testing Callbacks
  describe('Callback-based tests', () => {
    it('should call callback with result', (done) => {
      processDataWithCallback({ id: '1' }, (err, result) => {
        expect(err).toBeNull();
        expect(result.processed).toBe(true);
        done();
      });
    });

    it('should call callback with error', (done) => {
      processDataWithCallback(null, (err) => {
        expect(err).toBeDefined();
        expect(err.message).toContain('Invalid data');
        done();
      });
    });
  });

  // Pattern 3: Testing Timers
  describe('Timer-based tests', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should execute after delay', () => {
      const callback = jest.fn();

      scheduleTask(callback, 5000);

      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(5000);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should debounce rapid calls', () => {
      const callback = jest.fn();
      const debouncedFn = debounce(callback, 1000);

      // Rapid calls
      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  // Pattern 4: Testing Event Emitters
  describe('Event emitter tests', () => {
    it('should emit events in order', async () => {
      const emitter = new DataProcessor();
      const events: string[] = [];

      emitter.on('start', () => events.push('start'));
      emitter.on('progress', () => events.push('progress'));
      emitter.on('complete', () => events.push('complete'));

      await emitter.process({ data: 'test' });

      expect(events).toEqual(['start', 'progress', 'complete']);
    });

    it('should handle error events', async () => {
      const emitter = new DataProcessor();
      const errorHandler = jest.fn();

      emitter.on('error', errorHandler);

      await emitter.process({ invalid: true });

      expect(errorHandler).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.stringContaining('Invalid') })
      );
    });
  });

  // Pattern 5: Testing Retry Logic
  describe('Retry logic tests', () => {
    it('should retry failed operations', async () => {
      const operation = jest.fn()
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockResolvedValueOnce({ success: true });

      const result = await retryOperation(operation, { maxRetries: 3 });

      expect(operation).toHaveBeenCalledTimes(3);
      expect(result.success).toBe(true);
    });

    it('should throw after max retries', async () => {
      const operation = jest.fn()
        .mockRejectedValue(new Error('Always fails'));

      await expect(retryOperation(operation, { maxRetries: 3 }))
        .rejects.toThrow('Always fails');

      expect(operation).toHaveBeenCalledTimes(3);
    });
  });
});

// Helper functions for examples
async function fetchUserData(id: string): Promise<{ id: string }> {
  if (id === 'invalid') throw new Error('User not found');
  return { id };
}

function processDataWithCallback(
  data: any,
  callback: (err: Error | null, result?: any) => void
): void {
  if (!data) {
    callback(new Error('Invalid data'));
    return;
  }
  callback(null, { ...data, processed: true });
}

function scheduleTask(callback: () => void, delay: number): void {
  setTimeout(callback, delay);
}

function debounce(fn: Function, delay: number): () => void {
  let timeoutId: NodeJS.Timeout;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
}

async function retryOperation<T>(
  operation: () => Promise<T>,
  options: { maxRetries: number }
): Promise<T> {
  let lastError: Error;
  for (let i = 0; i < options.maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
    }
  }
  throw lastError!;
}
```

---

## Quick Reference

### Jest Matchers Cheat Sheet

```typescript
// Equality
expect(value).toBe(expected);           // Strict equality
expect(value).toEqual(expected);        // Deep equality
expect(value).toBeCloseTo(0.3, 5);      // Floating point

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(5);

// Strings
expect(str).toMatch(/regex/);
expect(str).toContain('substring');

// Arrays
expect(arr).toContain(item);
expect(arr).toHaveLength(3);
expect(arr).toEqual(expect.arrayContaining([1, 2]));

// Objects
expect(obj).toHaveProperty('key');
expect(obj).toMatchObject({ key: value });

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('message');
expect(() => fn()).toThrow(ErrorClass);

// Async
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();

// Mocks
expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledTimes(2);
expect(mock).toHaveBeenCalledWith(arg1, arg2);
```

---

*Module 5 Code Examples - AI for Testing & Debugging*
*AI-Assisted Software Development Course*
