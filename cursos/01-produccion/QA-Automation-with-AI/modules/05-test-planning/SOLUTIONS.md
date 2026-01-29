# Module 5 Solutions: Creating Test Plans with AI

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Test Strategy

**Sample Test Strategy Document:**

```markdown
# Checkout Feature - Test Strategy

## 1. Testing Objectives

**Primary Goals:**
- Ensure checkout process completes successfully for valid scenarios
- Prevent financial loss from payment failures
- Verify order accuracy and inventory management
- Ensure customer communication (emails) works
- Maintain data integrity throughout transaction

**Quality Attributes:**
- Reliability: Process must complete without data loss
- Security: Payment data handled securely
- Performance: Checkout completes in < 5 seconds
- Usability: Clear error messages for failures
- Compliance: PCI DSS compliance for payment handling

## 2. Test Scope

### In Scope
- Cart validation (empty, unauthorized, valid)
- Inventory checking and reservation
- Payment processing (success and failure)
- Shipping calculation (standard and express)
- Tax calculation by state
- Order creation and confirmation
- Email notifications
- Cart clearing after successful checkout

### Out of Scope
- Payment gateway implementation (mocked)
- Email service implementation (mocked)
- Inventory system (mocked)
- UI/UX testing (separate module)
- Performance under load (separate module)

## 3. Test Strategy

### Unit Tests
- **Coverage**: 80%+ of functions
- **Mocking**: All external services (payment, email, inventory)
- **Focus**: Individual function logic
- **Examples**:
  - calculateTax() with various states
  - calculateShipping() with different weights
  - Input validation

### Integration Tests
- **Coverage**: Service interactions
- **Mocking**: External APIs only
- **Focus**: Data flow between services
- **Examples**:
  - Cart validation + inventory check
  - Payment processing + order creation
  - Order creation + email sending

### E2E Tests
- **Coverage**: Critical user journeys
- **Mocking**: Minimal (use test payment gateway)
- **Focus**: Complete checkout flow
- **Examples**:
  - Successful checkout with credit card
  - Checkout with PayPal
  - Checkout failure and retry

## 4. Test Environment

### Required Services
- Test database (PostgreSQL)
- Mock payment service
- Mock email service
- Mock inventory service

### Test Data
- Valid test credit cards
- Test user accounts
- Sample products with inventory
- Test shipping addresses

## 5. Success Criteria

- **Code Coverage**: 80%+ for services
- **Test Count**: Minimum 50 test cases
- **Pass Rate**: 100% of tests passing
- **Performance**: All tests complete in < 2 minutes
- **Defect Escape**: < 5% of bugs found in production
```

**Grading Notes:**
- Should address all 5 sections
- Objectives should be specific and measurable
- Scope should clearly define boundaries
- Strategy should specify test types and mocking approach
- Success criteria should be quantifiable

---

### Part 2: Test Case Design

**Sample Test Cases (30+ cases):**

```markdown
# Checkout Feature - Test Cases

## Unit Tests

### TC-001: Calculate Tax - California
- **Function**: calculateTax()
- **Input**: subtotal=100, state='CA'
- **Expected**: 7.25 (100 * 0.0725)
- **Priority**: P1

### TC-002: Calculate Tax - New York
- **Function**: calculateTax()
- **Input**: subtotal=100, state='NY'
- **Expected**: 8.00 (100 * 0.08)
- **Priority**: P1

### TC-003: Calculate Tax - Unknown State
- **Function**: calculateTax()
- **Input**: subtotal=100, state='XX'
- **Expected**: 0 (no tax)
- **Priority**: P2

### TC-004: Calculate Shipping - Standard
- **Function**: calculateShipping()
- **Input**: weight=5, express=false
- **Expected**: 7.50 (5 + 5*0.5)
- **Priority**: P1

### TC-005: Calculate Shipping - Express
- **Function**: calculateShipping()
- **Input**: weight=5, express=true
- **Expected**: 17.50 (15 + 5*0.5)
- **Priority**: P1

### TC-006: Calculate Shipping - Zero Weight
- **Function**: calculateShipping()
- **Input**: weight=0, express=false
- **Expected**: 5.00 (base rate only)
- **Priority**: P2

## Integration Tests

### TC-010: Successful Checkout
- **Precondition**: User logged in, cart has 2 items, inventory available
- **Steps**:
  1. Call processCheckout() with valid data
  2. Verify payment processed
  3. Verify order created
  4. Verify inventory reserved
  5. Verify cart cleared
- **Expected**: Order returned with status='confirmed'
- **Priority**: P0

### TC-011: Checkout - Empty Cart
- **Precondition**: User logged in, cart is empty
- **Steps**: Call processCheckout()
- **Expected**: Error 'Cart is empty'
- **Priority**: P0

### TC-012: Checkout - Unauthorized User
- **Precondition**: Cart belongs to different user
- **Steps**: Call processCheckout() with wrong userId
- **Expected**: Error 'Unauthorized'
- **Priority**: P0

### TC-013: Checkout - Insufficient Stock
- **Precondition**: Cart has item with quantity > available stock
- **Steps**: Call processCheckout()
- **Expected**: Error 'Insufficient stock for [productId]'
- **Priority**: P0

### TC-014: Checkout - Payment Declined
- **Precondition**: Valid cart, payment will be declined
- **Steps**: Call processCheckout() with declined card
- **Expected**: Error 'Payment failed: [reason]'
- **Priority**: P0

### TC-015: Checkout - Payment Success, Order Creation Fails
- **Precondition**: Payment succeeds but order creation fails
- **Steps**: Call processCheckout()
- **Expected**: Refund issued, error returned
- **Priority**: P0

### TC-016: Checkout - Multiple Items
- **Precondition**: Cart has 5 items
- **Steps**: Call processCheckout()
- **Expected**: All items included in order
- **Priority**: P1

### TC-017: Checkout - Tax Calculation
- **Precondition**: Cart subtotal=$100, shipping to CA
- **Steps**: Call processCheckout()
- **Expected**: Tax=$7.25, total=$107.25+shipping
- **Priority**: P1

### TC-018: Checkout - Shipping Calculation
- **Precondition**: Items total 10 lbs, standard shipping
- **Steps**: Call processCheckout()
- **Expected**: Shipping=$10 (5 + 10*0.5)
- **Priority**: P1

## E2E Tests

### TC-020: Complete Checkout Flow
- **User Story**: As a customer, I want to checkout and receive confirmation
- **Steps**:
  1. Add items to cart
  2. Go to checkout
  3. Enter shipping address
  4. Select standard shipping
  5. Enter payment info
  6. Submit checkout
  7. Receive confirmation email
- **Expected**: Order created, email sent, cart cleared
- **Priority**: P0

### TC-021: Checkout with Express Shipping
- **User Story**: As a customer, I want fast shipping
- **Steps**: Same as TC-020 but select express shipping
- **Expected**: Higher shipping cost, same order flow
- **Priority**: P1

## Boundary Value Tests

### TC-030: Minimum Cart Items
- **Input**: 1 item in cart
- **Expected**: Checkout succeeds
- **Priority**: P2

### TC-031: Maximum Cart Items
- **Input**: 100 items in cart
- **Expected**: Checkout succeeds
- **Priority**: P2

### TC-032: Minimum Payment Amount
- **Input**: Total = $0.01
- **Expected**: Payment succeeds
- **Priority**: P2

### TC-033: Maximum Payment Amount
- **Input**: Total = $999,999.99
- **Expected**: Payment succeeds
- **Priority**: P2

### TC-034: Zero Weight Items
- **Input**: Items with weight=0
- **Expected**: Shipping calculated correctly
- **Priority**: P2

### TC-035: Very Heavy Items
- **Input**: Items totaling 1000 lbs
- **Expected**: Shipping calculated correctly
- **Priority**: P2

## Error Handling Tests

### TC-040: Network Failure During Payment
- **Scenario**: Payment service times out
- **Expected**: Error returned, cart not cleared
- **Priority**: P1

### TC-041: Inventory Check Fails
- **Scenario**: Inventory service unavailable
- **Expected**: Checkout fails, cart unchanged
- **Priority**: P1

### TC-042: Email Service Fails
- **Scenario**: Email service unavailable
- **Expected**: Order created, email retry scheduled
- **Priority**: P1

### TC-043: Concurrent Checkout Attempts
- **Scenario**: Same user checks out twice simultaneously
- **Expected**: One succeeds, one fails
- **Priority**: P1

## State Transition Tests

### TC-050: Order Status Flow
- **Precondition**: Successful checkout
- **Expected**: Order status = 'confirmed'
- **Priority**: P1

### TC-051: Payment Retry After Failure
- **Precondition**: Payment failed
- **Steps**: Retry checkout with different card
- **Expected**: Succeeds, new order created
- **Priority**: P1
```

**Grading Notes:**
- Should have 30+ test cases
- Should cover unit, integration, and E2E
- Should include boundary and error cases
- Each case should have clear preconditions and expected results
- Priority should be assigned based on risk

---

### Part 3: Coverage Matrix

**Sample Coverage Matrix:**

```markdown
# Checkout Feature - Coverage Matrix

| Feature/Function | Unit | Integration | E2E | Security | Performance |
|------------------|------|-------------|-----|----------|-------------|
| processCheckout() | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| calculateTax() | ✅ | ✅ | N/A | N/A | N/A |
| calculateShipping() | ✅ | ✅ | N/A | N/A | N/A |
| Cart validation | ✅ | ✅ | ✅ | ✅ | N/A |
| Inventory check | ✅ | ✅ | ✅ | N/A | N/A |
| Payment processing | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Order creation | ✅ | ✅ | ✅ | N/A | N/A |
| Email notification | ✅ | ✅ | ✅ | N/A | N/A |
| Error handling | ✅ | ✅ | ✅ | N/A | N/A |
| Concurrent requests | ❌ | ⚠️ | ❌ | N/A | ⚠️ |

## Gap Analysis

### Performance Testing (⚠️)
- **Gap**: No load testing for concurrent checkouts
- **Impact**: Unknown behavior under high load
- **Effort**: 8 hours
- **Priority**: P1

### Concurrent Request Handling (❌)
- **Gap**: No tests for simultaneous checkouts
- **Impact**: Potential race conditions
- **Effort**: 4 hours
- **Priority**: P0

## Coverage Summary
- **Unit Tests**: 9/9 functions (100%)
- **Integration Tests**: 8/9 features (89%)
- **E2E Tests**: 7/9 features (78%)
- **Overall**: 24/27 (89%)
```

**Grading Notes:**
- Matrix should map features to test types
- Should identify gaps clearly
- Should prioritize gap filling
- Should estimate effort for missing tests

---

## Quiz Answer Key

### Multiple Choice Answers

1. **d** - All are valid priority schemes
2. **b** - Equivalence Partitioning divides inputs into groups
3. **b** - Boundary Value Analysis focuses on edge values
4. **b** - Coverage matrix maps tests to requirements, code, and risks
5. **c** - Critical business paths should be tested first

### True/False Answers

6. **True** - Test data requirements are essential
7. **True** - Risk-based testing prioritizes by business impact
8. **False** - Complex functions need more tests than simple ones
9. **False** - Test strategy is broader; test plan is more detailed
10. **False** - AI output needs human review and refinement

### Short Answer Rubrics

**Question 11 (5 points)** - Four Test Design Techniques

Valid answers (1.25 points each):
1. **Equivalence Partitioning** - Divides inputs into groups that should behave the same
2. **Boundary Value Analysis** - Tests values at edges of valid ranges
3. **State Transition Testing** - Tests transitions between states
4. **Decision Table Testing** - Tests all combinations of conditions
5. **Error Guessing** - Tests likely error scenarios
6. **Pairwise Testing** - Tests combinations of parameters

**Question 12 (5 points)** - Boundary Values for Login

Username (5-20 chars):
- 4 characters (below minimum)
- 5 characters (at minimum)
- 12 characters (normal)
- 20 characters (at maximum)
- 21 characters (above maximum)

Password (8-30 chars):
- 7 characters (below minimum)
- 8 characters (at minimum)
- 19 characters (normal)
- 30 characters (at maximum)
- 31 characters (above maximum)

**Question 13 (5 points)** - Risk-Based Prioritization

Should explain:
- Identify risk factors (business impact, likelihood, complexity) (2 points)
- Score each test area by risk (1.5 points)
- Assign priorities based on scores (1.5 points)

**Question 14 (10 points)** - Test Plan for transferMoney()

Should include:

**P0 Test Cases** (3 points):
1. Successful transfer between valid accounts
2. Insufficient balance in source account
3. Invalid source or destination account

**P1 Test Cases** (3 points):
1. Transfer with zero amount
2. Transfer with negative amount
3. Concurrent transfers from same account

**Coverage** (2 points):
- Unit tests for validation
- Integration tests for transaction
- E2E test for complete flow

**Test Data** (2 points):
- Valid accounts with sufficient balance
- Accounts with insufficient balance
- Invalid account IDs

---

## Common Student Mistakes

1. **Incomplete Test Strategy**
   - **Mistake**: Missing sections or vague descriptions
   - **Why it's wrong**: Doesn't provide clear testing direction
   - **Fix**: Include all 5 sections with specific details

2. **Insufficient Test Cases**
   - **Mistake**: Only happy path tests
   - **Why it's wrong**: Misses edge cases and errors
   - **Fix**: Include boundary, error, and state transition tests

3. **Poor Test Case Documentation**
   - **Mistake**: Vague steps or expected results
   - **Why it's wrong**: Hard to execute and verify
   - **Fix**: Use clear, step-by-step format with specific assertions

4. **Missing Priorities**
   - **Mistake**: Not assigning P0/P1/P2 to test cases
   - **Why it's wrong**: Can't prioritize testing effort
   - **Fix**: Assign priority based on business impact

5. **Incomplete Coverage Matrix**
   - **Mistake**: Only marking ✅ or ❌
   - **Why it's wrong**: Doesn't identify partial coverage
   - **Fix**: Use ✅, ⚠️, ❌, N/A appropriately

6. **No Gap Analysis**
   - **Mistake**: Coverage matrix without identifying gaps
   - **Why it's wrong**: Doesn't drive improvement
   - **Fix**: Analyze gaps and prioritize filling them

7. **Unrealistic Test Data**
   - **Mistake**: Not considering actual data constraints
   - **Why it's wrong**: Tests might not be executable
   - **Fix**: Use realistic, valid test data

8. **Missing Error Cases**
   - **Mistake**: Only testing success scenarios
   - **Why it's wrong**: Doesn't verify error handling
   - **Fix**: Include tests for all error paths

9. **No Boundary Testing**
   - **Mistake**: Only testing normal values
   - **Why it's wrong**: Misses off-by-one errors
   - **Fix**: Include boundary value tests

10. **Ignoring Concurrency**
    - **Mistake**: Not testing concurrent operations
    - **Why it's wrong**: Race conditions go undetected
    - **Fix**: Include concurrent scenario tests

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Test Strategy | 25 | Complete, clear, measurable objectives |
| Test Cases | 35 | 30+ cases, good coverage, clear documentation |
| Coverage Matrix | 25 | Accurate mapping, gap analysis, prioritization |
| Documentation Quality | 15 | Clear, organized, professional |
| **Total** | **100** | |

**Passing**: 70+ points

---

## Teaching Notes

- **Emphasize completeness**: Good test plans catch more bugs
- **Show risk analysis**: Demonstrate how to prioritize effectively
- **Use real examples**: Show test plans from actual projects
- **Practice iteration**: Have students refine plans multiple times
- **Connect to implementation**: Show how plans drive test code
