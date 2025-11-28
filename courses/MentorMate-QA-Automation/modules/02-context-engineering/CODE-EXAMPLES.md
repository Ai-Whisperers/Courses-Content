# Module 2: Context Engineering - Code Examples

**Purpose**: Reference collection of all code examples from Module 2

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Table of Contents

1. [CLAUDE.md Templates](#claudemd-templates)
2. [Prompt Examples](#prompt-examples)
3. [Conversation Examples](#conversation-examples)
4. [Test Code Examples](#test-code-examples)

---

## CLAUDE.md Templates

### Template 1: Basic CLAUDE.md Template

```markdown
# Project: [Project Name]

## Overview
[Brief description of what this project does]

## Tech Stack
- [Language/Framework]
- [Testing Framework]
- [Other key technologies]

## Architecture
[Brief description of architecture]
[Key directories and their purposes]

## Code Conventions
- [Naming conventions]
- [File organization]
- [Coding patterns to follow]

## Testing Requirements
- [Test framework and patterns]
- [Coverage expectations]
- [Naming conventions for tests]

## Important Files
- [Key file 1] - [purpose]
- [Key file 2] - [purpose]

## Current Focus
[What you're currently working on]
[Any specific instructions for this session]
```

**Usage**: Use this as a starting point for any new project. Customize each section based on your actual project structure and requirements.

---

### Template 2: E-Commerce Project (Full Example)

```markdown
# Project: ShopEasy E-Commerce Platform

## Overview
Full-stack e-commerce platform with product catalog, shopping cart, checkout, and admin dashboard.

## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL with Prisma ORM
- Testing: Jest + React Testing Library + Playwright
- CI/CD: GitHub Actions

## Architecture
Monorepo with:
- `packages/web` - React frontend
  - `src/components/` - React components
  - `src/pages/` - Page components
  - `src/hooks/` - Custom hooks
  - `src/utils/` - Utility functions
- `packages/api` - Express backend
  - `src/routes/` - API endpoints
  - `src/services/` - Business logic
  - `src/middleware/` - Express middleware
  - `src/models/` - Database models
- `packages/shared` - Shared types and utilities
  - `src/types/` - TypeScript interfaces
  - `src/validators/` - Shared validation logic

## Code Conventions
- Use functional components with hooks (no class components)
- Prefer named exports over default exports
- Use absolute imports from `@/` for cleaner paths
- Follow Prettier and ESLint configs (run before committing)
- Commit messages: conventional commits format (feat:, fix:, etc.)
- File naming: kebab-case for files, PascalCase for components
- Functions: camelCase for function names
- Constants: UPPER_SNAKE_CASE for true constants

## Testing Requirements
- Jest for unit and integration tests
- React Testing Library for component tests
- Playwright for E2E tests
- Follow AAA pattern (Arrange, Act, Assert)
- Test file naming: `[filename].test.ts` or `[filename].spec.ts`
- Test naming convention: `should [expected behavior] when [condition]`
- Minimum 80% code coverage
- Mock external APIs using msw (Mock Service Worker)
- Don't mock the database in integration tests (use test database)
- Use factories for generating test data (see `tests/factories/`)
- Each test should be independent and not rely on other tests

## Important Files
- `packages/api/src/services/cart.service.ts` - Shopping cart business logic
- `packages/api/src/services/payment.service.ts` - Payment processing
- `packages/api/src/routes/orders.ts` - Order management endpoints
- `packages/web/src/components/checkout/CheckoutFlow.tsx` - Main checkout component
- `packages/shared/src/types/order.ts` - Order type definitions
- `tests/factories/` - Test data factories

## Current Focus
Working on the checkout flow:
- Cart management (add, remove, update quantities)
- Payment processing integration with Stripe
- Order creation and inventory management
- Email notifications for order confirmation

Generate tests that:
- Cover edge cases (empty cart, out of stock items, etc.)
- Handle error scenarios gracefully
- Verify security (authorization, input validation)
- Test the complete checkout flow end-to-end
```

**Key Features**:
- Detailed tech stack with versions
- Clear directory structure
- Specific conventions (naming, imports, etc.)
- Comprehensive testing requirements
- Current focus area clearly defined

---

### Template 3: Python Data Pipeline (Full Example)

```markdown
# Project: Customer Feedback Analyzer

## Overview
Data pipeline that processes customer feedback files from multiple sources (CSV, Excel, JSON),
performs NLP sentiment analysis, and generates aggregated reports with visualizations.

## Tech Stack
- Python 3.11
- Pandas 2.0+ for data processing
- Transformers (Hugging Face) for sentiment analysis
- FastAPI for REST API
- PostgreSQL for data storage
- pytest for testing
- Docker for containerization

## Architecture
Microservices architecture:

1. **Normalizer Service** (`normalizer/`)
   - Converts various file formats to standard schema
   - Handles encoding issues and data cleaning
   - Entry point: `normalizer/main.py`

2. **Processor Service** (`processor/`)
   - NLP text preprocessing
   - Sentiment analysis using transformers
   - Entry point: `processor/main.py`

3. **Aggregator Service** (`aggregator/`)
   - Stores processed results in PostgreSQL
   - Provides query interface
   - Entry point: `aggregator/main.py`

4. **API Service** (`api/`)
   - REST API for external access
   - Authentication and rate limiting
   - Entry point: `api/main.py`

Data flow: File Upload → Normalizer → Processor → Aggregator → API

## Code Conventions
- Type hints on all functions (use `typing` module)
- Docstrings for all public functions (Google style)
- Black for formatting (line length: 100)
- isort for imports (profile: black)
- Flake8 for linting (max line length: 100)
- snake_case for functions and variables
- PascalCase for classes
- UPPER_SNAKE_CASE for constants
- Private methods: prefix with underscore `_private_method`
- Use dataclasses for data structures when appropriate
- Exception handling: use custom exceptions (see `common/exceptions.py`)

## Testing Requirements
- pytest with fixtures (see `conftest.py`)
- Test location: `tests/` directory mirrors source structure
- Test naming: `test_<function_name>_<scenario>.py`
- Fixture naming: descriptive names (e.g., `valid_csv_data`, `mock_sentiment_model`)
- Parametrize tests when testing multiple inputs (use `@pytest.mark.parametrize`)
- Mock external services (database, ML models, file system)
- Use factories for test data (see `tests/factories/`)
- Coverage target: 75% minimum
- Integration tests: use `@pytest.mark.integration`
- Slow tests: mark with `@pytest.mark.slow`

Test structure:
```python
def test_function_name_scenario():
    # Arrange - Set up test data and mocks

    # Act - Call the function under test

    # Assert - Verify the results
```

## Important Files
- `processor/main.py` - Main processing orchestration
- `processor/sentiment_analyzer.py` - Core sentiment analysis
- `normalizer/schemas.py` - Data schema definitions (Pydantic models)
- `aggregator/queries.py` - Database query functions
- `common/exceptions.py` - Custom exception classes
- `conftest.py` - Shared pytest fixtures
- `tests/factories/feedback_factory.py` - Test data factories

## Current Focus
Improving test coverage for processor service:
- Sentiment analysis accuracy verification
- Edge cases in text processing (emojis, URLs, special characters)
- Error handling for malformed input
- Memory efficiency for large files
- Performance benchmarks

Generate tests that:
- Use realistic test data from `tests/fixtures/sample_feedback.csv`
- Mock the transformer model (loading is slow)
- Verify sentiment scores are in expected range
- Test batch processing with various batch sizes
- Handle Unicode and encoding edge cases
```

**Key Features**:
- Detailed architecture with data flow
- Python-specific conventions (type hints, docstrings)
- Testing patterns specific to data processing
- Performance and memory considerations
- Clear mocking strategy

---

### Template 4: Minimal CLAUDE.md (Quick Start)

```markdown
# Project: Todo API

## Overview
RESTful API for managing todo lists with user authentication.

## Tech Stack
- Node.js 18 + Express
- MongoDB with Mongoose
- JWT authentication
- Jest for testing

## Architecture
Standard Express MVC:
- `routes/` - API endpoints
- `controllers/` - Request handlers
- `models/` - Mongoose models
- `middleware/` - Auth, validation, error handling

## Testing Requirements
- Jest + Supertest
- Mock database with jest.mock
- AAA pattern
- 70% coverage minimum
- Test file: `[name].test.js`

## Current Focus
Testing the authentication endpoints (login, register, JWT validation).
```

**Usage**: For smaller projects or quick prototyping. Expand sections as the project grows.

---

## Prompt Examples

### Example 1: Test Generation (Bad vs Good)

#### Bad Prompt ❌

```
Write tests for the user service
```

**Problems**:
- No context (which file? which function?)
- No requirements (what scenarios?)
- No format (what style? what patterns?)
- Too vague to produce useful results

---

#### Good Prompt ✅

```
Generate Jest unit tests for the createUser function in src/services/user.ts

Function signature:
async function createUser(data: CreateUserDto): Promise<User>

The function:
1. Validates the email format
2. Checks if user already exists (throws ConflictError)
3. Hashes the password using bcrypt
4. Creates user in database
5. Sends welcome email

Requirements:
- Test successful user creation
- Test duplicate email handling (should throw ConflictError)
- Test invalid email format (should throw ValidationError)
- Test missing required fields (name, email, password)
- Test password hashing (verify bcrypt.hash is called)
- Test welcome email is sent (verify emailService.sendWelcomeEmail called)
- Mock the database calls using jest.mock
- Mock bcrypt and emailService
- Use factories for test data

Output format:
- Group tests with describe blocks (success cases, validation errors, business rules)
- Use beforeEach for common setup
- Use afterEach for cleanup
- Include comments explaining each test
- Follow AAA pattern (Arrange, Act, Assert)
```

**Why it's better**:
- Provides context (function name, file location)
- Describes what the function does
- Lists specific test scenarios
- Specifies mocking strategy
- Defines output structure

---

### Example 2: Code Review (Bad vs Good)

#### Bad Prompt ❌

```
Review this code

[paste code]
```

**Problems**:
- No focus areas
- No criteria for review
- Unclear what kind of feedback you want

---

#### Good Prompt ✅

```
Review the following authentication middleware for:

Focus Areas:
1. Security vulnerabilities
   - SQL injection risks
   - XSS vulnerabilities
   - JWT token validation
   - OWASP top 10 issues

2. Error handling
   - Are all errors caught?
   - Are error messages safe (no sensitive info leaked)?
   - Is logging appropriate?

3. Performance
   - Unnecessary database calls
   - Missing caching opportunities
   - N+1 query issues

4. Code style
   - Consistency with our conventions (see CLAUDE.md)
   - Readability and maintainability
   - Naming conventions

For each issue found, provide:
- Severity: Critical/High/Medium/Low
- Line number(s)
- Description of the issue
- Suggested fix with code example
- Why it matters (impact)

```typescript
[paste code here]
```
```

**Why it's better**:
- Specific review criteria
- Organized by category
- Clear output format
- Severity levels defined

---

### Example 3: Refactoring (Bad vs Good)

#### Bad Prompt ❌

```
Make this code better
```

---

#### Good Prompt ✅

```
Refactor the processOrder function to improve maintainability and testability.

Current issues:
1. Function is 150+ lines (too long)
2. Multiple responsibilities mixed together
3. Hard to test due to tight coupling
4. Database calls mixed with business logic

Refactoring goals:
1. Extract separate functions for:
   - Order validation
   - Inventory checking
   - Payment processing
   - Email notification

2. Apply these patterns:
   - Single Responsibility Principle
   - Dependency Injection for services
   - Pure functions where possible

3. Maintain existing behavior (this is a refactor, not a rewrite)

4. Make it easier to test:
   - Each function should be independently testable
   - Services should be injectable/mockable
   - Reduce side effects

Provide:
- Refactored code with clear separation of concerns
- Brief explanation of changes
- Example of how one of the new functions would be tested

Current code:
```javascript
[paste code here]
```
```

**Why it's better**:
- Identifies specific problems
- States clear goals
- Provides refactoring principles to follow
- Ensures behavior is maintained
- Asks for testing guidance

---

### Example 4: Documentation (Bad vs Good)

#### Bad Prompt ❌

```
Document this code
```

---

#### Good Prompt ✅

```
Add comprehensive JSDoc comments to the following payment processing function.

Include:
1. Function description (what it does, why it exists)
2. @param tags for each parameter:
   - Type
   - Description
   - Valid values or constraints
3. @returns tag:
   - Type
   - Description of return value
4. @throws tags for exceptions:
   - What exceptions can be thrown
   - Under what conditions
5. @example tag with usage example

Style requirements:
- Use complete sentences
- Be specific about edge cases
- Mention any side effects (database writes, API calls, etc.)
- Include business context where relevant

```typescript
async function processPayment(orderId: string, paymentMethod: PaymentMethod): Promise<Payment> {
  const order = await db.orders.findById(orderId);
  if (!order) throw new NotFoundError('Order not found');

  const amount = order.total;
  const charge = await stripeClient.charges.create({
    amount: amount * 100,
    currency: 'usd',
    source: paymentMethod.token,
  });

  const payment = await db.payments.create({
    orderId,
    amount,
    stripeChargeId: charge.id,
    status: 'completed',
  });

  await emailService.sendPaymentConfirmation(order.customerEmail, payment);

  return payment;
}
```
```

**Why it's better**:
- Specifies JSDoc format
- Lists all required tags
- Defines style requirements
- Provides context (the code to document)

---

## Conversation Examples

### Conversation 1: Iterative Test Refinement

**Turn 1 - Initial Request**:
```
Generate tests for the user registration function.
```

**Claude's Response**:
```javascript
describe('registerUser', () => {
  it('should create a new user', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    const result = await registerUser(userData);
    expect(result).toBeDefined();
  });
});
```

---

**Turn 2 - First Refinement**:
```
Good start, but please add:
1. Test for duplicate email (should throw ConflictError)
2. Test for invalid email format
3. Test for weak password (less than 8 characters)
4. Mock the database operations
```

**Claude's Response**:
```javascript
// Mocks
jest.mock('../db');

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    };

    db.users.findByEmail.mockResolvedValue(null);
    db.users.create.mockResolvedValue({ id: 1, ...userData });

    const result = await registerUser(userData);

    expect(result).toBeDefined();
    expect(result.email).toBe('test@example.com');
  });

  it('should throw ConflictError when email already exists', async () => {
    const userData = { email: 'existing@example.com', password: 'password123' };

    db.users.findByEmail.mockResolvedValue({ id: 1, email: 'existing@example.com' });

    await expect(registerUser(userData)).rejects.toThrow(ConflictError);
  });

  it('should throw ValidationError for invalid email', async () => {
    const userData = { email: 'invalid-email', password: 'password123' };

    await expect(registerUser(userData)).rejects.toThrow(ValidationError);
  });

  it('should throw ValidationError for weak password', async () => {
    const userData = { email: 'test@example.com', password: 'weak' };

    await expect(registerUser(userData)).rejects.toThrow(ValidationError);
  });
});
```

---

**Turn 3 - Second Refinement**:
```
Better! Now please:
1. Verify that the password is hashed (bcrypt.hash is called)
2. Verify that welcome email is sent
3. Add edge cases: empty strings, null values
4. Split into describe blocks: "success cases", "validation errors", "business rules"
```

**Claude's Response**:
```javascript
// Mocks
jest.mock('../db');
jest.mock('bcrypt');
jest.mock('../services/emailService');

const db = require('../db');
const bcrypt = require('bcrypt');
const emailService = require('../services/emailService');

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('success cases', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      };

      db.users.findByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed_password');
      db.users.create.mockResolvedValue({
        id: 1,
        ...userData,
        password: 'hashed_password'
      });
      emailService.sendWelcomeEmail.mockResolvedValue(true);

      const result = await registerUser(userData);

      expect(result).toBeDefined();
      expect(result.email).toBe('test@example.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(emailService.sendWelcomeEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('validation errors', () => {
    it('should throw ValidationError for invalid email format', async () => {
      const userData = { email: 'invalid-email', password: 'password123' };

      await expect(registerUser(userData)).rejects.toThrow(ValidationError);
      await expect(registerUser(userData)).rejects.toThrow('Invalid email format');
    });

    it('should throw ValidationError for weak password', async () => {
      const userData = { email: 'test@example.com', password: 'weak' };

      await expect(registerUser(userData)).rejects.toThrow(ValidationError);
      await expect(registerUser(userData)).rejects.toThrow('Password must be at least 8 characters');
    });

    it('should throw ValidationError for empty email', async () => {
      const userData = { email: '', password: 'password123' };

      await expect(registerUser(userData)).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for null email', async () => {
      const userData = { email: null, password: 'password123' };

      await expect(registerUser(userData)).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for empty password', async () => {
      const userData = { email: 'test@example.com', password: '' };

      await expect(registerUser(userData)).rejects.toThrow(ValidationError);
    });
  });

  describe('business rules', () => {
    it('should throw ConflictError when email already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        username: 'testuser'
      };

      db.users.findByEmail.mockResolvedValue({
        id: 1,
        email: 'existing@example.com'
      });

      await expect(registerUser(userData)).rejects.toThrow(ConflictError);
      await expect(registerUser(userData)).rejects.toThrow('User already exists');
    });
  });
});
```

---

**Turn 4 - Final Polish**:
```
Excellent! Final touches:
1. Add comments explaining what each test verifies
2. Create a test factory for user data
3. Add test for case sensitivity in email (test@example.com vs TEST@example.com should be same user)
```

**Claude's Final Response**: *(Full polished code with all improvements)*

---

### Conversation 2: Narrowing Scope

**Turn 1**:
```
Generate integration tests for the entire checkout flow.
```

**Claude**: *Generates 20+ tests covering cart, payment, inventory, shipping, etc.*

---

**Turn 2 - Scope Reduction**:
```
This is too comprehensive. Let's narrow the scope to just:
1. Adding items to cart
2. Updating cart quantities
3. Removing items from cart

Exclude payment, shipping, and order creation for now.
```

**Claude**: *Generates focused tests for cart management only*

---

**Turn 3 - Further Refinement**:
```
Good! Now add tests for these edge cases:
- Adding item with quantity 0
- Adding item with negative quantity
- Adding item that doesn't exist
- Updating quantity to exceed available stock
```

**Claude**: *Adds edge case tests*

---

## Test Code Examples

### Example 1: Basic Unit Test (AAA Pattern)

```javascript
describe('calculateTax', () => {
  it('should calculate 10% tax on $100', () => {
    // Arrange - Set up test data
    const price = 100;
    const taxRate = 0.10;

    // Act - Call the function under test
    const result = calculateTax(price, taxRate);

    // Assert - Verify the result
    expect(result).toBe(10);
  });

  it('should return 0 for 0% tax rate', () => {
    // Arrange
    const price = 100;
    const taxRate = 0;

    // Act
    const result = calculateTax(price, taxRate);

    // Assert
    expect(result).toBe(0);
  });

  it('should handle decimal results correctly', () => {
    // Arrange
    const price = 99.99;
    const taxRate = 0.0825; // 8.25%

    // Act
    const result = calculateTax(price, taxRate);

    // Assert
    expect(result).toBeCloseTo(8.25, 2);
  });
});
```

---

### Example 2: Testing Async Functions

```javascript
describe('fetchUser', () => {
  // Test successful API call
  it('should return user data for valid ID', async () => {
    // Arrange
    const userId = '123';
    const expectedUser = { id: '123', name: 'John Doe' };

    // Act
    const result = await fetchUser(userId);

    // Assert
    expect(result).toEqual(expectedUser);
  });

  // Test error handling
  it('should throw NotFoundError for invalid ID', async () => {
    // Arrange
    const userId = 'invalid';

    // Act & Assert
    await expect(fetchUser(userId)).rejects.toThrow(NotFoundError);
    await expect(fetchUser(userId)).rejects.toThrow('User not found');
  });

  // Test timeout handling
  it('should timeout after 5 seconds', async () => {
    // Arrange
    const userId = 'slow';

    // Act & Assert
    await expect(fetchUser(userId)).rejects.toThrow('Timeout');
  }, 6000); // Test timeout set to 6 seconds
});
```

---

### Example 3: Using Mocks

```javascript
// Mock external dependencies
jest.mock('../db');
jest.mock('../services/emailService');

const db = require('../db');
const emailService = require('../services/emailService');
const { createUser } = require('../userService');

describe('createUser', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user and send welcome email', async () => {
    // Arrange
    const userData = { email: 'test@example.com', name: 'Test User' };
    const createdUser = { id: 1, ...userData };

    // Set up mocks
    db.users.create.mockResolvedValue(createdUser);
    emailService.sendWelcome.mockResolvedValue(true);

    // Act
    const result = await createUser(userData);

    // Assert
    expect(db.users.create).toHaveBeenCalledWith(userData);
    expect(emailService.sendWelcome).toHaveBeenCalledWith('test@example.com');
    expect(result).toEqual(createdUser);
  });

  it('should rollback if email fails', async () => {
    // Arrange
    const userData = { email: 'test@example.com', name: 'Test User' };
    const createdUser = { id: 1, ...userData };

    db.users.create.mockResolvedValue(createdUser);
    emailService.sendWelcome.mockRejectedValue(new Error('Email failed'));
    db.users.delete.mockResolvedValue(true);

    // Act & Assert
    await expect(createUser(userData)).rejects.toThrow('Email failed');
    expect(db.users.delete).toHaveBeenCalledWith(1);
  });
});
```

---

### Example 4: Test Factories

```javascript
// tests/factories/userFactory.js

/**
 * Factory for generating test user data
 */
class UserFactory {
  /**
   * Generate a valid user object
   */
  static create(overrides = {}) {
    return {
      email: 'test@example.com',
      password: 'SecurePass123!',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      ...overrides
    };
  }

  /**
   * Generate a user with invalid email
   */
  static withInvalidEmail() {
    return this.create({ email: 'not-an-email' });
  }

  /**
   * Generate a user with weak password
   */
  static withWeakPassword() {
    return this.create({ password: 'weak' });
  }

  /**
   * Generate multiple users
   */
  static createMany(count, overrides = {}) {
    return Array.from({ length: count }, (_, i) =>
      this.create({
        email: `test${i}@example.com`,
        username: `testuser${i}`,
        ...overrides
      })
    );
  }
}

module.exports = UserFactory;
```

**Usage in tests**:

```javascript
const UserFactory = require('./factories/userFactory');

describe('registerUser', () => {
  it('should register user with valid data', async () => {
    // Using factory for clean test data
    const userData = UserFactory.create();

    const result = await registerUser(userData);

    expect(result).toBeDefined();
  });

  it('should reject invalid email', async () => {
    // Using factory method for specific test case
    const userData = UserFactory.withInvalidEmail();

    await expect(registerUser(userData)).rejects.toThrow(ValidationError);
  });

  it('should handle multiple users', async () => {
    // Using factory to generate multiple test cases
    const users = UserFactory.createMany(5);

    for (const user of users) {
      const result = await registerUser(user);
      expect(result.email).toBe(user.email);
    }
  });
});
```

---

### Example 5: Integration Test with Real Database

```javascript
describe('User Integration Tests', () => {
  // Set up test database before all tests
  beforeAll(async () => {
    await db.connect(process.env.TEST_DATABASE_URL);
    await db.migrate();
  });

  // Clean up after all tests
  afterAll(async () => {
    await db.disconnect();
  });

  // Clean up between tests
  afterEach(async () => {
    await db.users.deleteAll();
  });

  it('should create user in database', async () => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    };

    // Act
    const createdUser = await userService.create(userData);

    // Assert - Verify in database
    const userInDb = await db.users.findById(createdUser.id);
    expect(userInDb).toBeDefined();
    expect(userInDb.email).toBe('test@example.com');
    expect(userInDb.password).not.toBe('password123'); // Should be hashed
  });

  it('should enforce unique email constraint', async () => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    };

    // Act - Create first user
    await userService.create(userData);

    // Act & Assert - Try to create duplicate
    await expect(
      userService.create({ ...userData, username: 'different' })
    ).rejects.toThrow(ConflictError);
  });
});
```

---

### Example 6: Parametrized Tests

```javascript
describe('email validation', () => {
  // Test multiple invalid emails with one test
  const invalidEmails = [
    'not-an-email',
    '@example.com',
    'test@',
    'test @example.com',
    'test@example',
    '',
    null,
    undefined
  ];

  invalidEmails.forEach(email => {
    it(`should reject invalid email: "${email}"`, () => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  // Test multiple valid emails
  const validEmails = [
    'test@example.com',
    'user.name@example.com',
    'user+tag@example.co.uk',
    'test123@test-domain.com'
  ];

  validEmails.forEach(email => {
    it(`should accept valid email: "${email}"`, () => {
      expect(isValidEmail(email)).toBe(true);
    });
  });
});
```

**Using Jest's test.each**:

```javascript
describe('calculateDiscount', () => {
  test.each([
    // [price, discountPercent, expected]
    [100, 10, 90],
    [50, 20, 40],
    [200, 0, 200],
    [99.99, 15, 84.99],
  ])('calculateDiscount(%d, %d) should return %d', (price, discount, expected) => {
    expect(calculateDiscount(price, discount)).toBeCloseTo(expected, 2);
  });
});
```

---

## Additional Tips

### Tip 1: Keep CLAUDE.md Updated

Update your CLAUDE.md when:
- Tech stack changes
- New conventions are adopted
- Focus area shifts
- New patterns are established

### Tip 2: Use Descriptive Test Names

Good test names:
- `should create user when data is valid`
- `should throw ConflictError when email already exists`
- `should hash password before storing`

Bad test names:
- `test1`
- `user test`
- `it works`

### Tip 3: One Assertion Per Concept

```javascript
// Good - Each test verifies one concept
it('should set correct status code', () => {
  expect(response.status).toBe(200);
});

it('should return user data', () => {
  expect(response.body.email).toBe('test@example.com');
});

// Acceptable - Related assertions
it('should create user with hashed password', () => {
  expect(user).toBeDefined();
  expect(user.password).not.toBe(plainPassword);
  expect(user.password).toMatch(/^\$2[aby]\$/); // bcrypt format
});
```

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
