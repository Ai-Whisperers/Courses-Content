# Exercise 6: Unit Test Generation

## Objective

Generate comprehensive unit tests using AI with proper mocking and isolation.

## Duration: 2 hours

---

## Setup

```bash
mkdir unit-testing-lab
cd unit-testing-lab
npm init -y
npm install jest --save-dev
```

### Code Under Test

Create `src/orderProcessor.js`:

```javascript
const { v4: uuidv4 } = require('uuid');

class OrderProcessor {
  constructor(inventoryService, pricingService, notificationService, logger) {
    this.inventoryService = inventoryService;
    this.pricingService = pricingService;
    this.notificationService = notificationService;
    this.logger = logger;
  }

  async createOrder(customerId, items) {
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (!items || items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // Validate all items have required fields
    for (const item of items) {
      if (!item.productId || !item.quantity) {
        throw new Error('Each item must have productId and quantity');
      }
      if (item.quantity <= 0) {
        throw new Error('Quantity must be positive');
      }
    }

    // Check inventory for all items
    const inventoryChecks = await Promise.all(
      items.map(item =>
        this.inventoryService.checkAvailability(item.productId, item.quantity)
      )
    );

    const unavailable = items.filter((item, index) => !inventoryChecks[index]);
    if (unavailable.length > 0) {
      const ids = unavailable.map(i => i.productId).join(', ');
      throw new Error(`Insufficient inventory for: ${ids}`);
    }

    // Calculate pricing
    const lineItems = await Promise.all(
      items.map(async item => {
        const price = await this.pricingService.getPrice(item.productId);
        const discount = await this.pricingService.getDiscount(
          customerId,
          item.productId
        );
        const finalPrice = price * (1 - discount);
        return {
          ...item,
          unitPrice: price,
          discount,
          finalPrice,
          total: finalPrice * item.quantity
        };
      })
    );

    // Calculate totals
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const tax = this.calculateTax(subtotal);
    const total = subtotal + tax;

    // Create order
    const order = {
      id: uuidv4(),
      customerId,
      items: lineItems,
      subtotal,
      tax,
      total,
      status: 'pending',
      createdAt: new Date()
    };

    this.logger.info(`Order created: ${order.id}`, { customerId, total });

    // Reserve inventory
    await Promise.all(
      items.map(item =>
        this.inventoryService.reserve(item.productId, item.quantity)
      )
    );

    // Send notification
    try {
      await this.notificationService.sendOrderConfirmation(customerId, order);
    } catch (error) {
      // Log but don't fail order
      this.logger.warn(`Failed to send confirmation: ${error.message}`);
    }

    return order;
  }

  calculateTax(subtotal) {
    const TAX_RATE = 0.08;
    return Math.round(subtotal * TAX_RATE * 100) / 100;
  }

  async cancelOrder(orderId, reason) {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    this.logger.info(`Cancelling order: ${orderId}`, { reason });

    // Would typically fetch order and release inventory
    return {
      orderId,
      status: 'cancelled',
      reason,
      cancelledAt: new Date()
    };
  }
}

module.exports = OrderProcessor;
```

---

## Part 1: Basic Unit Tests (30 min)

### Task

Generate unit tests for the happy path and basic validation.

### Prompt

```
Generate Jest unit tests for this OrderProcessor class.

[Paste code]

Requirements:
1. Mock all dependencies (inventoryService, pricingService, notificationService, logger)
2. Test createOrder happy path
3. Test all validation errors:
   - Missing customerId
   - Empty items array
   - Invalid item (missing productId)
   - Invalid item (missing quantity)
   - Zero/negative quantity
4. Test calculateTax method

For each test:
- Use descriptive test names
- Setup mocks in beforeEach
- Reset mocks in afterEach
- Use AAA pattern
- Make specific assertions
```

### Deliverable

- `orderProcessor.test.js` with basic tests

---

## Part 2: Advanced Mocking (30 min)

### Task

Add tests for complex scenarios requiring advanced mocking.

### Prompt

```
Add tests for these complex scenarios:

1. Inventory check failures
   - Single item unavailable
   - Multiple items unavailable
   - Inventory service throws error

2. Pricing scenarios
   - Different prices per product
   - Customer-specific discounts
   - No discount available
   - Pricing service error

3. Async behavior
   - All inventory checks run in parallel
   - All pricing calls run in parallel
   - All reservations run in parallel

4. Notification handling
   - Successful notification
   - Failed notification (order still succeeds)
   - Notification error is logged

5. Logging verification
   - Info logged on success
   - Warn logged on notification failure

Use these Jest mocking features:
- mockResolvedValue / mockRejectedValue
- mockImplementation for complex logic
- toHaveBeenCalledWith for verification
- toHaveBeenCalledTimes for parallel checks
```

### Deliverable

- Extended test file with advanced scenarios

---

## Part 3: Edge Cases (30 min)

### Task

Add tests for edge cases and boundary conditions.

### Prompt

```
Add edge case tests:

1. Boundary Values
   - Single item order
   - Maximum items (100)
   - Minimum quantity (1)
   - Large quantity (10000)
   - Zero subtotal (100% discount)
   - Very small amounts (rounding)
   - Very large amounts

2. Data Type Edge Cases
   - String customer ID
   - Numeric customer ID
   - Product ID as number
   - Quantity as string
   - null vs undefined

3. Calculation Accuracy
   - Tax rounding (8.88 * 0.08)
   - Multiple decimal prices
   - Large totals

4. Order Properties
   - UUID format validation
   - Date type verification
   - Status value
   - Line item structure

Include tests that verify exact values.
```

### Deliverable

- Complete edge case coverage

---

## Part 4: Test Quality Review (30 min)

### Task

Review and improve test quality.

### Quality Checklist

- [ ] Each test has one clear purpose
- [ ] Test names describe behavior not implementation
- [ ] Mocks are properly reset between tests
- [ ] Assertions are specific (not just toBeDefined)
- [ ] Edge cases are covered
- [ ] Error messages are verified
- [ ] Async behavior is properly awaited
- [ ] No test interdependencies

### Improvement Prompt

```
Review these tests for quality issues:

[Paste tests]

Identify and fix:
1. Weak assertions (make them specific)
2. Missing error message checks
3. Incomplete mock verification
4. Test isolation issues
5. Missing edge cases
6. Unclear test names

Provide the improved version with comments explaining each fix.
```

### Deliverable

- Reviewed and improved tests

---

## Submission

### Files

- `src/orderProcessor.js`
- `src/orderProcessor.test.js`

### Test Requirements

- Minimum 25 test cases
- All tests passing
- 100% line coverage
- 100% branch coverage

### Grading

| Criterion | Points |
|-----------|--------|
| Basic tests (validation) | 20 |
| Advanced mocking | 25 |
| Edge cases | 25 |
| Test quality | 20 |
| Coverage | 10 |

---

## Bonus Challenge

1. Add tests for `cancelOrder` method
2. Implement snapshot testing for order structure
3. Add performance test (order with 100 items < 100ms)
4. Use `jest.spyOn` instead of mock injection

---

*Good luck!*
