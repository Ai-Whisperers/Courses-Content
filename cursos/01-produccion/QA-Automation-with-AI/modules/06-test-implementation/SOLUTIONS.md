# Module 6 Solutions: Implementing Tests with AI

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Unit Tests for OrderProcessor

**Sample Solution:**

```javascript
const OrderProcessor = require('./orderProcessor');

describe('OrderProcessor', () => {
  let processor;
  let mockInventoryService;
  let mockPricingService;
  let mockNotificationService;
  let mockLogger;

  beforeEach(() => {
    mockInventoryService = {
      checkAvailability: jest.fn(),
      reserve: jest.fn()
    };
    mockPricingService = {
      getPrice: jest.fn(),
      getDiscount: jest.fn()
    };
    mockNotificationService = {
      sendOrderConfirmation: jest.fn()
    };
    mockLogger = {
      info: jest.fn(),
      error: jest.fn()
    };

    processor = new OrderProcessor(
      mockInventoryService,
      mockPricingService,
      mockNotificationService,
      mockLogger
    );
  });

  describe('createOrder', () => {
    const validCustomerId = 'cust-123';
    const validItems = [
      { productId: 'prod-1', quantity: 2 },
      { productId: 'prod-2', quantity: 1 }
    ];

    describe('happy path', () => {
      beforeEach(() => {
        mockInventoryService.checkAvailability.mockResolvedValue(true);
        mockPricingService.getPrice.mockResolvedValue(100);
        mockPricingService.getDiscount.mockResolvedValue(0.1);
      });

      it('should create order with valid data', async () => {
        const order = await processor.createOrder(validCustomerId, validItems);

        expect(order).toMatchObject({
          customerId: validCustomerId,
          status: 'pending',
          items: expect.arrayContaining([
            expect.objectContaining({
              productId: 'prod-1',
              quantity: 2,
              unitPrice: 100,
              discount: 0.1,
              finalPrice: 90,
              total: 180
            })
          ])
        });
      });

      it('should calculate correct totals', async () => {
        const order = await processor.createOrder(validCustomerId, validItems);

        // 2 items: (100*0.9*2) + (100*0.9*1) = 180 + 90 = 270
        expect(order.subtotal).toBe(270);
        expect(order.tax).toBeGreaterThan(0);
        expect(order.total).toBe(order.subtotal + order.tax);
      });

      it('should check inventory for all items', async () => {
        await processor.createOrder(validCustomerId, validItems);

        expect(mockInventoryService.checkAvailability).toHaveBeenCalledTimes(2);
        expect(mockInventoryService.checkAvailability).toHaveBeenCalledWith('prod-1', 2);
        expect(mockInventoryService.checkAvailability).toHaveBeenCalledWith('prod-2', 1);
      });

      it('should reserve inventory after order creation', async () => {
        await processor.createOrder(validCustomerId, validItems);

        expect(mockInventoryService.reserve).toHaveBeenCalledTimes(2);
        expect(mockInventoryService.reserve).toHaveBeenCalledWith('prod-1', 2);
        expect(mockInventoryService.reserve).toHaveBeenCalledWith('prod-2', 1);
      });

      it('should send confirmation notification', async () => {
        const order = await processor.createOrder(validCustomerId, validItems);

        expect(mockNotificationService.sendOrderConfirmation).toHaveBeenCalledWith(
          validCustomerId,
          expect.objectContaining({ id: order.id })
        );
      });
    });

    describe('validation errors', () => {
      it('should throw for missing customer ID', async () => {
        await expect(
          processor.createOrder(null, validItems)
        ).rejects.toThrow('Customer ID is required');
      });

      it('should throw for empty items array', async () => {
        await expect(
          processor.createOrder(validCustomerId, [])
        ).rejects.toThrow('Order must contain at least one item');
      });

      it('should throw for missing productId', async () => {
        const invalidItems = [{ quantity: 2 }];
        await expect(
          processor.createOrder(validCustomerId, invalidItems)
        ).rejects.toThrow('Each item must have productId and quantity');
      });

      it('should throw for zero quantity', async () => {
        const invalidItems = [{ productId: 'prod-1', quantity: 0 }];
        await expect(
          processor.createOrder(validCustomerId, invalidItems)
        ).rejects.toThrow('Quantity must be positive');
      });

      it('should throw for negative quantity', async () => {
        const invalidItems = [{ productId: 'prod-1', quantity: -5 }];
        await expect(
          processor.createOrder(validCustomerId, invalidItems)
        ).rejects.toThrow('Quantity must be positive');
      });
    });

    describe('inventory errors', () => {
      it('should throw when inventory unavailable', async () => {
        mockInventoryService.checkAvailability.mockResolvedValueOnce(false);
        mockInventoryService.checkAvailability.mockResolvedValueOnce(true);

        await expect(
          processor.createOrder(validCustomerId, validItems)
        ).rejects.toThrow('Insufficient inventory for: prod-1');
      });

      it('should list all unavailable products', async () => {
        mockInventoryService.checkAvailability.mockResolvedValue(false);

        await expect(
          processor.createOrder(validCustomerId, validItems)
        ).rejects.toThrow('Insufficient inventory for: prod-1, prod-2');
      });
    });

    describe('edge cases', () => {
      beforeEach(() => {
        mockInventoryService.checkAvailability.mockResolvedValue(true);
        mockPricingService.getPrice.mockResolvedValue(100);
        mockPricingService.getDiscount.mockResolvedValue(0);
      });

      it('should handle single item order', async () => {
        const singleItem = [{ productId: 'prod-1', quantity: 1 }];
        const order = await processor.createOrder(validCustomerId, singleItem);

        expect(order.items).toHaveLength(1);
      });

      it('should handle large quantities', async () => {
        const largeQty = [{ productId: 'prod-1', quantity: 1000 }];
        const order = await processor.createOrder(validCustomerId, largeQty);

        expect(order.items[0].quantity).toBe(1000);
      });

      it('should handle zero discount', async () => {
        mockPricingService.getDiscount.mockResolvedValue(0);
        const order = await processor.createOrder(validCustomerId, validItems);

        expect(order.items[0].finalPrice).toBe(100);
      });

      it('should handle 100% discount', async () => {
        mockPricingService.getDiscount.mockResolvedValue(1);
        const order = await processor.createOrder(validCustomerId, validItems);

        expect(order.items[0].finalPrice).toBe(0);
      });
    });
  });

  describe('calculateTax', () => {
    it('should calculate tax correctly', () => {
      const tax = processor.calculateTax(100);
      expect(tax).toBeGreaterThan(0);
    });

    it('should handle zero subtotal', () => {
      const tax = processor.calculateTax(0);
      expect(tax).toBe(0);
    });

    it('should handle large amounts', () => {
      const tax = processor.calculateTax(10000);
      expect(tax).toBeGreaterThan(0);
    });
  });
});
```

**Grading Notes:**
- Should test happy path, validation, inventory, and edge cases
- Should use proper mocking setup
- Should verify both return values and side effects
- Should have clear, descriptive test names
- Should follow AAA pattern

---

### Part 2: Integration Tests

**Sample Solution:**

```javascript
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const OrderProcessor = require('../services/orderProcessor');

describe('POST /api/orders', () => {
  let orderId;

  beforeEach(async () => {
    await db.migrate.latest();
    // Seed test data
    await db('products').insert([
      { id: 'prod-1', name: 'Product 1', price: 100 },
      { id: 'prod-2', name: 'Product 2', price: 50 }
    ]);
    await db('inventory').insert([
      { productId: 'prod-1', quantity: 10 },
      { productId: 'prod-2', quantity: 5 }
    ]);
    await db('customers').insert({
      id: 'cust-123',
      email: 'test@example.com'
    });
  });

  afterEach(async () => {
    await db('orders').truncate();
    await db('inventory').truncate();
    await db('products').truncate();
    await db('customers').truncate();
  });

  describe('successful order creation', () => {
    it('should create order and return 201', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: [
            { productId: 'prod-1', quantity: 2 },
            { productId: 'prod-2', quantity: 1 }
          ]
        })
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        customerId: 'cust-123',
        status: 'pending',
        subtotal: expect.any(Number),
        tax: expect.any(Number),
        total: expect.any(Number)
      });

      orderId = response.body.id;
    });

    it('should create order in database', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: [{ productId: 'prod-1', quantity: 2 }]
        })
        .expect(201);

      const order = await db('orders').where('id', response.body.id).first();
      expect(order).toBeDefined();
      expect(order.customerId).toBe('cust-123');
    });

    it('should reserve inventory', async () => {
      await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: [{ productId: 'prod-1', quantity: 2 }]
        })
        .expect(201);

      const inventory = await db('inventory')
        .where('productId', 'prod-1')
        .first();
      expect(inventory.quantity).toBe(8); // 10 - 2
    });
  });

  describe('validation errors', () => {
    it('should return 400 for missing customerId', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          items: [{ productId: 'prod-1', quantity: 1 }]
        })
        .expect(400);

      expect(response.body.error).toContain('Customer ID');
    });

    it('should return 400 for empty items', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: []
        })
        .expect(400);

      expect(response.body.error).toContain('at least one item');
    });

    it('should return 400 for invalid quantity', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: [{ productId: 'prod-1', quantity: 0 }]
        })
        .expect(400);

      expect(response.body.error).toContain('positive');
    });
  });

  describe('inventory errors', () => {
    it('should return 400 for insufficient inventory', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: [{ productId: 'prod-1', quantity: 100 }]
        })
        .expect(400);

      expect(response.body.error).toContain('Insufficient inventory');
    });

    it('should not create order if inventory check fails', async () => {
      await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: [{ productId: 'prod-1', quantity: 100 }]
        })
        .expect(400);

      const orders = await db('orders').where('customerId', 'cust-123');
      expect(orders).toHaveLength(0);
    });
  });

  describe('not found errors', () => {
    it('should return 404 for non-existent customer', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          customerId: 'non-existent',
          items: [{ productId: 'prod-1', quantity: 1 }]
        })
        .expect(404);

      expect(response.body.error).toContain('Customer');
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({
          customerId: 'cust-123',
          items: [{ productId: 'non-existent', quantity: 1 }]
        })
        .expect(404);

      expect(response.body.error).toContain('Product');
    });
  });
});
```

**Grading Notes:**
- Should test success and error paths
- Should verify database changes
- Should use real database (test DB)
- Should clean up after each test
- Should test response structure and status codes

---

## Quiz Answer Key

### Multiple Choice Answers

1. **b** - AAA stands for Arrange, Act, Assert
2. **c** - Mock external services and slow operations
3. **b** - Mocks verify behavior, stubs provide canned responses
4. **c** - Descriptive names explain what's being tested
5. **c** - Use iterative refinement to improve weak assertions

### True/False Answers

6. **True** - Unit tests should be fast
7. **False** - Integration tests should use real dependencies
8. **False** - Each test should focus on one thing
9. **False** - `toBeDefined()` is weak; use specific assertions
10. **True** - Tests should be independent

### Short Answer Rubrics

**Question 11 (5 points)** - Test Utilities

Should include:
- Factories for creating test objects (1.25 points)
- Fixtures for common test data (1.25 points)
- Helpers for setup/assertions (1.25 points)
- Mocks for external services (1.25 points)

**Question 12 (5 points)** - Mock vs Stub

Should explain:
- Mock: Verifies behavior, checks if called (2.5 points)
- Stub: Provides canned responses, doesn't verify (2.5 points)

**Question 13 (5 points)** - Weak Assertion Fix

Should improve:
- `expect(user).toBeDefined()` → `expect(user.id).toBe('123')`
- `expect(result).toBeTruthy()` → `expect(result.success).toBe(true)`
- `expect(array).toHaveLength(1)` → `expect(array[0].name).toBe('expected')`

**Question 14 (10 points)** - Test Implementation

Should include:
- Setup with mocks (2 points)
- Happy path test (3 points)
- Error case test (3 points)
- Assertion verification (2 points)

---

## Common Student Mistakes

1. **Weak Assertions**
   - **Mistake**: `expect(result).toBeDefined()`
   - **Fix**: `expect(result.id).toBe('123')`

2. **Not Mocking Dependencies**
   - **Mistake**: Calling real external services
   - **Fix**: Mock all external dependencies

3. **Shared State Between Tests**
   - **Mistake**: Not using beforeEach/afterEach
   - **Fix**: Reset mocks and data before each test

4. **Testing Implementation Details**
   - **Mistake**: Testing private methods
   - **Fix**: Test public interface only

5. **Multiple Assertions Per Test**
   - **Mistake**: Testing multiple scenarios in one test
   - **Fix**: One scenario per test

6. **Not Verifying Side Effects**
   - **Mistake**: Only checking return value
   - **Fix**: Verify mocks were called correctly

7. **Ignoring Error Cases**
   - **Mistake**: Only testing happy path
   - **Fix**: Test all error scenarios

8. **Slow Tests**
   - **Mistake**: Not mocking slow operations
   - **Fix**: Mock external services

9. **Flaky Tests**
   - **Mistake**: Race conditions, timing issues
   - **Fix**: Use proper async/await, avoid timeouts

10. **Poor Test Names**
    - **Mistake**: `test1`, `testFunction`
    - **Fix**: `should_createOrder_withValidData_returnsOrderWithId`

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Unit Tests | 30 | Comprehensive, good mocking, clear assertions |
| Integration Tests | 30 | Real DB, proper cleanup, error cases |
| Test Quality | 25 | Fast, isolated, descriptive names |
| Code Coverage | 15 | 80%+ coverage, all paths tested |
| **Total** | **100** | |

**Passing**: 70+ points

---

## Teaching Notes

- **Emphasize mocking**: Show why external services must be mocked
- **Show iteration**: Demonstrate improving weak assertions
- **Use real examples**: Show tests from actual projects
- **Practice debugging**: Have students fix failing tests
- **Connect to planning**: Show how test plans drive implementation
