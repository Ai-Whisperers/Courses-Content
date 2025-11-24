# Module 10: Example Projects
## Reference Implementations and Samples

---

## Overview

This document provides example projects, code samples, and reference implementations to guide your final project. Use these as inspiration and reference, but ensure your work is original.

**Note:** These are examples to learn from, not to copy. Your project should demonstrate your own understanding and implementation.

---

## Sample Project: E-Commerce API

### Project Overview

A Node.js/Express e-commerce API with user authentication, product management, and order processing.

**Technologies:**
- Node.js 18+
- Express 4.x
- PostgreSQL
- Jest for testing
- Supertest for API testing
- Playwright for E2E

**Features:**
- User registration and authentication
- Product catalog management
- Shopping cart functionality
- Order creation and tracking
- Admin management panel

---

## Example 1: CLAUDE.md

### Comprehensive Project Context

```markdown
# E-Commerce API - Project Context

## Project Overview

This is a RESTful API for an e-commerce platform built with Node.js and Express. It provides user authentication, product management, shopping cart functionality, and order processing.

**Purpose:** Backend API for online retail platform
**Status:** Active development, 45% test coverage
**Team Size:** 3 developers

## Tech Stack

### Backend
- **Runtime:** Node.js 18.x
- **Framework:** Express 4.18
- **Database:** PostgreSQL 14
- **ORM:** Sequelize 6.x
- **Authentication:** JWT (jsonwebtoken)

### Testing
- **Framework:** Jest 29.x
- **API Testing:** Supertest
- **E2E Testing:** Playwright
- **Coverage:** Istanbul/nyc
- **Mocking:** jest.mock()

### DevOps
- **Version Control:** Git/GitHub
- **CI/CD:** GitHub Actions
- **Linting:** ESLint
- **Formatting:** Prettier

## Architecture

### Project Structure
```
ecommerce-api/
├── src/
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── models/         # Database models
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   └── app.js          # Express app setup
├── tests/
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/            # E2E tests
└── config/             # Configuration files
```

### Key Components

**Controllers:** Handle HTTP requests/responses
- Validate input
- Call service layer
- Format responses
- Handle errors

**Services:** Business logic layer
- Database operations
- Business rules
- Third-party integrations
- Transaction management

**Models:** Sequelize ORM models
- User, Product, Order, OrderItem
- Relationships and associations
- Validations and hooks

**Middleware:**
- authenticate: JWT verification
- authorize: Role-based access
- validate: Request validation
- errorHandler: Error handling

### Database Schema

```
Users
- id (PK)
- email (unique)
- password (hashed)
- firstName, lastName
- role (user/admin)
- createdAt, updatedAt

Products
- id (PK)
- name
- description
- price
- stock
- category
- imageUrl
- createdAt, updatedAt

Orders
- id (PK)
- userId (FK)
- status (pending/completed/cancelled)
- totalAmount
- createdAt, updatedAt

OrderItems
- id (PK)
- orderId (FK)
- productId (FK)
- quantity
- price
- createdAt, updatedAt
```

### API Design

**Base URL:** `/api/v1`

**Authentication:** Bearer token in Authorization header

**Response Format:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "errors": null
}
```

## Testing Strategy

### Test Organization

**Unit Tests** (`tests/unit/`)
- Test individual functions/methods
- Mock all external dependencies
- Focus on business logic
- Target: 80%+ coverage

**Integration Tests** (`tests/integration/`)
- Test API endpoints
- Use test database
- Test database operations
- Target: 70%+ coverage

**E2E Tests** (`tests/e2e/`)
- Test complete user flows
- Use Playwright
- Test critical paths
- Target: Major flows covered

### Testing Conventions

**Test Naming:**
```javascript
// Unit tests
describe('AuthService', () => {
  describe('register', () => {
    it('should create user with hashed password', async () => {
      // test
    });

    it('should throw error for duplicate email', async () => {
      // test
    });
  });
});

// Integration tests
describe('POST /api/v1/auth/register', () => {
  it('should register user and return token', async () => {
    // test
  });
});
```

**AAA Pattern:**
```javascript
it('should create order with items', async () => {
  // Arrange
  const userId = 1;
  const orderData = { items: [...] };

  // Act
  const order = await OrderService.create(userId, orderData);

  // Assert
  expect(order.totalAmount).toBe(100);
  expect(order.items).toHaveLength(2);
});
```

**Test Data:**
- Use factories for test data
- Clean database before each test
- Use meaningful test values
- Avoid magic numbers

**Mocking:**
```javascript
// Mock external services
jest.mock('../services/emailService');

// Mock specific functions
jest.spyOn(ProductService, 'findById').mockResolvedValue(mockProduct);
```

### Coverage Targets

- Overall: 75%+
- Services: 85%+
- Controllers: 70%+
- Utils: 90%+

## Code Conventions

### Naming Patterns

**Files:**
- Controllers: `user.controller.js`
- Services: `user.service.js`
- Models: `User.js` (PascalCase)
- Tests: `user.service.test.js`

**Functions:**
- camelCase for functions
- Descriptive names (e.g., `createUserWithProfile`)
- Async functions clearly named

**Variables:**
- camelCase for variables
- Descriptive names
- Constants in UPPER_SNAKE_CASE

### Code Style

**Async/Await:**
```javascript
// Good
async function createUser(userData) {
  const user = await User.create(userData);
  await EmailService.sendWelcome(user.email);
  return user;
}

// Avoid callbacks
```

**Error Handling:**
```javascript
// Services throw errors
async function findById(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
}

// Controllers catch and respond
async function getUser(req, res, next) {
  try {
    const user = await UserService.findById(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}
```

**Validation:**
- Use express-validator for input validation
- Validate in routes before controllers
- Return 400 for validation errors

### Common Patterns

**Service Pattern:**
```javascript
class UserService {
  static async create(userData) {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });

    return user;
  }
}
```

**Repository Pattern (in services):**
```javascript
static async findAll(filters = {}) {
  const where = {};

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.minPrice) {
    where.price = { [Op.gte]: filters.minPrice };
  }

  return Product.findAll({ where });
}
```

## Commands

### Setup
```bash
# Install dependencies
npm install

# Setup database
npm run db:setup

# Run migrations
npm run migrate

# Seed data
npm run seed
```

### Development
```bash
# Start dev server
npm run dev

# Run linter
npm run lint

# Format code
npm run format
```

### Testing
```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Database
```bash
# Create migration
npm run migration:create -- --name add-users-table

# Run migrations
npm run migrate

# Rollback migration
npm run migrate:undo

# Reset database
npm run db:reset
```

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_dev
DB_USER=postgres
DB_PASSWORD=password

# Testing Database
TEST_DB_NAME=ecommerce_test

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Email (optional)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=user@example.com
EMAIL_PASSWORD=password
```

## Common Issues & Solutions

**Database Connection:**
- Ensure PostgreSQL is running
- Check credentials in .env
- Verify database exists

**Test Database:**
- Tests use separate test database
- Database reset before each test suite
- Use `NODE_ENV=test` for tests

**JWT Errors:**
- Ensure JWT_SECRET is set
- Check token expiration
- Verify Authorization header format

## AI Testing Tips

When asking AI to generate tests:

1. **Provide context:** Share this CLAUDE.md
2. **Be specific:** "Generate unit tests for AuthService.register with mocks"
3. **Request patterns:** "Follow AAA pattern and existing naming conventions"
4. **Ask for coverage:** "Include edge cases and error scenarios"
5. **Iterative refinement:** Review and ask for improvements

**Good prompt example:**
```
Generate unit tests for ProductService.findAll method. The method accepts
filters (category, minPrice, maxPrice) and returns filtered products from
database. Mock the database using jest.mock(). Include tests for:
- No filters (returns all)
- Category filter
- Price range filter
- Combined filters
- Empty results

Follow AAA pattern and existing test conventions in tests/unit/products/.
```

---

*This CLAUDE.md should be updated as the project evolves.*
```

---

## Example 2: TEST-PLAN.md (Excerpt)

### Sample Test Plan Structure

```markdown
# Test Plan: E-Commerce API

## 1. Test Objectives

**Primary Goals:**
- Verify all API endpoints function correctly
- Ensure data integrity and security
- Validate business logic
- Achieve 75%+ code coverage

**Quality Goals:**
- All tests pass consistently
- No security vulnerabilities
- Performance within acceptable limits
- Error handling works correctly

## 2. Scope

### In Scope
- User authentication (register, login, logout)
- Product management (CRUD operations)
- Order creation and tracking
- Shopping cart functionality
- Authorization and permissions

### Out of Scope
- Payment processing (mocked)
- Email delivery (mocked)
- File uploads
- Admin panel UI

## 3. Test Environment

**Local Development:**
- Node.js 18+
- PostgreSQL 14
- Test database: `ecommerce_test`

**CI/CD:**
- GitHub Actions
- Ubuntu latest
- PostgreSQL service container

## 4. Test Strategy

### Test Pyramid
```
       /\        E2E (5 tests)
      /  \       Critical user flows
     /    \
    /------\     Integration (10 tests)
   /        \    API endpoints, database
  /          \
 /------------\  Unit (20 tests)
/              \ Services, utilities, validators
```

## 5. Coverage Matrix

| Module | Unit | Integration | E2E | Priority |
|--------|------|-------------|-----|----------|
| Authentication | 6 | 3 | 1 | P0 |
| Products | 5 | 3 | 1 | P0 |
| Orders | 6 | 3 | 2 | P0 |
| Cart | 3 | 1 | 1 | P1 |

## 6. Test Cases

### Authentication Module

#### TC-001: User Registration (Unit) - P0
**Description:** Verify user can register with valid data
**Preconditions:** Database empty
**Steps:**
1. Call `AuthService.register()` with valid user data
2. Verify password is hashed
3. Verify user created in database
4. Verify JWT token returned

**Expected Result:**
- User created with hashed password
- JWT token returned
- User data excludes password

**Test Data:**
```javascript
{
  email: "test@example.com",
  password: "SecurePass123!",
  firstName: "John",
  lastName: "Doe"
}
```

#### TC-002: Duplicate Email Registration (Unit) - P0
**Description:** Verify error thrown for duplicate email
**Preconditions:** User with email exists
**Steps:**
1. Create user with email "test@example.com"
2. Attempt to register with same email
3. Verify error thrown

**Expected Result:**
- ConflictError thrown
- Error message: "Email already registered"
- No user created

#### TC-003: Registration API Endpoint (Integration) - P0
**Description:** Verify POST /api/v1/auth/register endpoint
**Preconditions:** Clean database
**Steps:**
1. Send POST request to /api/v1/auth/register
2. Include valid user data in body
3. Verify response status and data

**Expected Result:**
- Status: 201 Created
- Response includes user data (no password)
- Response includes JWT token
- User saved in database

#### [Continue with 27+ more detailed test cases...]

## 7. Test Data Requirements

### Users
```javascript
const testUsers = {
  admin: {
    email: "admin@example.com",
    password: "AdminPass123!",
    role: "admin"
  },
  regularUser: {
    email: "user@example.com",
    password: "UserPass123!",
    role: "user"
  }
};
```

### Products
```javascript
const testProducts = [
  {
    name: "Laptop",
    price: 999.99,
    stock: 10,
    category: "electronics"
  },
  // More products...
];
```

## 8. Risk Assessment

| Risk | Likelihood | Impact | Priority | Mitigation |
|------|------------|--------|----------|------------|
| Authentication bypass | Low | High | P0 | Thorough auth testing |
| Data corruption | Medium | High | P0 | Transaction testing |
| Race conditions | Medium | Medium | P1 | Concurrent tests |
| Performance degradation | Low | Medium | P2 | Load testing |

## 9. Success Criteria

**Required:**
- All P0 tests passing
- Code coverage >= 75%
- No security vulnerabilities
- All API endpoints tested

**Desired:**
- All P1 tests passing
- Code coverage >= 85%
- Mutation testing score >= 70%
- Performance within targets

## 10. Test Schedule

**Week 1:**
- Setup and planning
- Unit tests for Auth and Products

**Week 2:**
- Unit tests for Orders and Cart
- Integration tests for all modules

**Week 3:**
- E2E tests
- Quality validation
- CI/CD setup
```

---

## Example 3: Unit Test Implementation

### AuthService Tests

```javascript
// tests/unit/services/auth.service.test.js

const AuthService = require('../../../src/services/auth.service');
const User = require('../../../src/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ConflictError, UnauthorizedError } = require('../../../src/utils/errors');

// Mock dependencies
jest.mock('../../../src/models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'John',
      lastName: 'Doe'
    };

    it('should create user with hashed password', async () => {
      // Arrange
      const hashedPassword = 'hashedPassword123';
      User.findOne.mockResolvedValue(null); // Email not exists
      bcrypt.hash.mockResolvedValue(hashedPassword);
      User.create.mockResolvedValue({
        id: 1,
        ...userData,
        password: hashedPassword,
        role: 'user'
      });
      jwt.sign.mockReturnValue('fake-jwt-token');

      // Act
      const result = await AuthService.register(userData);

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword,
        role: 'user'
      });
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.password).toBeUndefined(); // Password should be excluded
    });

    it('should throw ConflictError for duplicate email', async () => {
      // Arrange
      User.findOne.mockResolvedValue({ id: 1, email: userData.email });

      // Act & Assert
      await expect(AuthService.register(userData)).rejects.toThrow(ConflictError);
      await expect(AuthService.register(userData)).rejects.toThrow('Email already registered');
      expect(User.create).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      // Arrange
      const invalidData = { ...userData, email: 'invalid-email' };

      // Act & Assert
      await expect(AuthService.register(invalidData)).rejects.toThrow('Invalid email format');
    });

    it('should require strong password', async () => {
      // Arrange
      const weakPasswordData = { ...userData, password: 'weak' };

      // Act & Assert
      await expect(AuthService.register(weakPasswordData)).rejects.toThrow(
        'Password must be at least 8 characters'
      );
    });

    it('should set default role to user', async () => {
      // Arrange
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed');
      const createdUser = { id: 1, ...userData, role: 'user' };
      User.create.mockResolvedValue(createdUser);
      jwt.sign.mockReturnValue('token');

      // Act
      await AuthService.register(userData);

      // Assert
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({ role: 'user' })
      );
    });
  });

  describe('login', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'SecurePass123!'
    };

    const mockUser = {
      id: 1,
      email: loginData.email,
      password: 'hashedPassword',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user'
    };

    it('should login with valid credentials', async () => {
      // Arrange
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake-jwt-token');

      // Act
      const result = await AuthService.login(loginData);

      // Assert
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: loginData.email }
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginData.password,
        mockUser.password
      );
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.password).toBeUndefined();
    });

    it('should throw UnauthorizedError for non-existent user', async () => {
      // Arrange
      User.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(AuthService.login(loginData)).rejects.toThrow(UnauthorizedError);
      await expect(AuthService.login(loginData)).rejects.toThrow('Invalid credentials');
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedError for wrong password', async () => {
      // Arrange
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      // Act & Assert
      await expect(AuthService.login(loginData)).rejects.toThrow(UnauthorizedError);
      await expect(AuthService.login(loginData)).rejects.toThrow('Invalid credentials');
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should include user role in JWT token', async () => {
      // Arrange
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');

      // Act
      await AuthService.login(loginData);

      // Assert
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role
        }),
        expect.any(String),
        expect.any(Object)
      );
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', () => {
      // Arrange
      const token = 'valid-token';
      const decoded = { id: 1, email: 'test@example.com', role: 'user' };
      jwt.verify.mockReturnValue(decoded);

      // Act
      const result = AuthService.verifyToken(token);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
      expect(result).toEqual(decoded);
    });

    it('should throw error for invalid token', () => {
      // Arrange
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act & Assert
      expect(() => AuthService.verifyToken('invalid')).toThrow('Invalid token');
    });

    it('should throw error for expired token', () => {
      // Arrange
      jwt.verify.mockImplementation(() => {
        throw new Error('Token expired');
      });

      // Act & Assert
      expect(() => AuthService.verifyToken('expired')).toThrow('Token expired');
    });
  });
});
```

---

## Example 4: Integration Test Implementation

### Auth API Tests

```javascript
// tests/integration/api/auth.api.test.js

const request = require('supertest');
const app = require('../../../src/app');
const { sequelize, User } = require('../../../src/models');

describe('POST /api/v1/auth/register', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  const validUserData = {
    email: 'test@example.com',
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe'
  };

  it('should register user with valid data', async () => {
    // Act
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(validUserData)
      .expect(201);

    // Assert
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.user.email).toBe(validUserData.email);
    expect(response.body.data.user.password).toBeUndefined();

    // Verify user saved in database
    const user = await User.findOne({ where: { email: validUserData.email } });
    expect(user).toBeTruthy();
    expect(user.firstName).toBe(validUserData.firstName);
    expect(user.password).not.toBe(validUserData.password); // Should be hashed
  });

  it('should return 409 for duplicate email', async () => {
    // Arrange - Create user first
    await request(app).post('/api/v1/auth/register').send(validUserData);

    // Act - Try to register again
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(validUserData)
      .expect(409);

    // Assert
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('already registered');
  });

  it('should return 400 for invalid email', async () => {
    // Arrange
    const invalidData = { ...validUserData, email: 'invalid-email' };

    // Act
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(invalidData)
      .expect(400);

    // Assert
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toContainEqual(
      expect.objectContaining({ field: 'email' })
    );
  });

  it('should return 400 for weak password', async () => {
    // Arrange
    const weakPasswordData = { ...validUserData, password: 'weak' };

    // Act
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(weakPasswordData)
      .expect(400);

    // Assert
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toContainEqual(
      expect.objectContaining({ field: 'password' })
    );
  });

  it('should return 400 for missing required fields', async () => {
    // Arrange
    const incompleteData = { email: 'test@example.com' };

    // Act
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(incompleteData)
      .expect(400);

    // Assert
    expect(response.body.errors).toContainEqual(
      expect.objectContaining({ field: 'password' })
    );
  });
});

describe('POST /api/v1/auth/login', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  const userData = {
    email: 'test@example.com',
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe'
  };

  it('should login with valid credentials', async () => {
    // Arrange - Register user first
    await request(app).post('/api/v1/auth/register').send(userData);

    // Act - Login
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    // Assert
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.user.email).toBe(userData.email);
  });

  it('should return 401 for non-existent user', async () => {
    // Act
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'password' })
      .expect(401);

    // Assert
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid credentials');
  });

  it('should return 401 for wrong password', async () => {
    // Arrange - Register user
    await request(app).post('/api/v1/auth/register').send(userData);

    // Act - Login with wrong password
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userData.email, password: 'WrongPassword!' })
      .expect(401);

    // Assert
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid credentials');
  });

  it('should include JWT token that can access protected routes', async () => {
    // Arrange - Register user
    await request(app).post('/api/v1/auth/register').send(userData);

    // Act - Login
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: userData.email, password: userData.password });

    const token = loginResponse.body.data.token;

    // Assert - Use token to access protected route
    const protectedResponse = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(protectedResponse.body.data.email).toBe(userData.email);
  });
});
```

---

## Example 5: E2E Test with Page Object Model

### Page Objects

```javascript
// tests/e2e/pages/LoginPage.js

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async navigate() {
    await this.page.goto('http://localhost:3000/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isLoggedIn() {
    // Wait for navigation to home page
    await this.page.waitForURL('**/home');
    return this.page.url().includes('/home');
  }
}

module.exports = LoginPage;
```

```javascript
// tests/e2e/pages/ProductsPage.js

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('[data-testid="product-card"]');
    this.addToCartButtons = page.locator('[data-testid="add-to-cart"]');
    this.cartBadge = page.locator('[data-testid="cart-badge"]');
  }

  async navigate() {
    await this.page.goto('http://localhost:3000/products');
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async addProductToCart(productIndex) {
    await this.addToCartButtons.nth(productIndex).click();
    // Wait for cart update
    await this.page.waitForTimeout(500);
  }

  async getCartItemCount() {
    const text = await this.cartBadge.textContent();
    return parseInt(text);
  }

  async searchProduct(query) {
    await this.page.fill('[data-testid="search-input"]', query);
    await this.page.click('[data-testid="search-button"]');
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = ProductsPage;
```

### E2E Tests

```javascript
// tests/e2e/tests/user-journey.test.js

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CheckoutPage = require('../pages/CheckoutPage');

test.describe('Complete User Journey', () => {
  test('user can register, browse products, and complete order', async ({ page }) => {
    // Setup
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Register new user
    await page.goto('http://localhost:3000/register');
    await page.fill('[data-testid="email-input"]', 'newuser@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.fill('[data-testid="first-name-input"]', 'John');
    await page.fill('[data-testid="last-name-input"]', 'Doe');
    await page.click('[data-testid="register-button"]');

    // Verify registration success and auto-login
    await expect(page).toHaveURL(/.*home/);

    // 2. Browse products
    await productsPage.navigate();
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    // 3. Add products to cart
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);

    // Verify cart updated
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(2);

    // 4. Proceed to checkout
    await page.click('[data-testid="cart-icon"]');
    await expect(page).toHaveURL(/.*cart/);
    await page.click('[data-testid="checkout-button"]');

    // 5. Complete order
    await checkoutPage.fillShippingAddress({
      address: '123 Main St',
      city: 'Springfield',
      zipCode: '12345'
    });
    await checkoutPage.submitOrder();

    // 6. Verify order success
    await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
    const orderNumber = await page.locator('[data-testid="order-number"]').textContent();
    expect(orderNumber).toMatch(/^ORD-\d+$/);
  });

  test('user cannot checkout with empty cart', async ({ page }) => {
    // Setup - Login as existing user
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('existing@example.com', 'Password123!');

    // Navigate to cart (empty)
    await page.click('[data-testid="cart-icon"]');

    // Verify checkout button is disabled
    const checkoutButton = page.locator('[data-testid="checkout-button"]');
    await expect(checkoutButton).toBeDisabled();

    // Verify message shown
    await expect(page.locator('text=Your cart is empty')).toBeVisible();
  });

  test('user can search and filter products', async ({ page }) => {
    // Setup
    const productsPage = new ProductsPage(page);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('existing@example.com', 'Password123!');

    // Navigate to products
    await productsPage.navigate();

    // Search for product
    await productsPage.searchProduct('laptop');
    const searchResults = await productsPage.getProductCount();
    expect(searchResults).toBeGreaterThan(0);

    // Verify all results match search
    const productTitles = await page.locator('[data-testid="product-title"]').allTextContents();
    productTitles.forEach(title => {
      expect(title.toLowerCase()).toContain('laptop');
    });

    // Apply category filter
    await page.selectOption('[data-testid="category-filter"]', 'electronics');
    await page.waitForLoadState('networkidle');

    // Verify filter applied
    const filteredCount = await productsPage.getProductCount();
    expect(filteredCount).toBeLessThanOrEqual(searchResults);
  });
});
```

---

## Example 6: Effective Prompts Used

### Context Prompt for Test Generation

```
I'm working on an e-commerce API built with Node.js, Express, and PostgreSQL.

Project context:
- Testing framework: Jest
- Following AAA pattern (Arrange-Act-Assert)
- Using mocks for external dependencies
- Test files: tests/unit/services/[service-name].service.test.js

I need to generate unit tests for the OrderService.create method.

OrderService.create:
- Parameters: userId (number), orderData ({ items: [{ productId, quantity }] })
- Returns: Order object with calculated totalAmount
- Validates: user exists, products exist, sufficient stock
- Updates: product stock, creates order and orderItems
- Throws: NotFoundError (user/product not found), BadRequestError (insufficient stock)

Dependencies to mock:
- User model
- Product model
- Order model
- OrderItem model

Please generate comprehensive unit tests including:
1. Happy path - order created successfully
2. User not found
3. Product not found
4. Insufficient stock
5. Empty items array
6. Multiple items with stock updates
7. Total amount calculation

Follow existing test patterns and AAA structure.
```

### Iterative Refinement Prompt

```
The tests you generated for OrderService.create are good, but I need some improvements:

1. Add more specific assertions for the happy path test:
   - Verify each product's stock was reduced by the correct quantity
   - Verify orderItems were created with correct prices
   - Verify totalAmount calculation is correct

2. Add a test case for:
   - Partial stock (one product has enough, another doesn't)
   - Should roll back the entire transaction

3. Improve mock setup:
   - Use beforeEach to reset mocks
   - Create reusable mock data objects

4. Add comments explaining complex assertions

Please update the test file with these improvements.
```

### E2E Test Generation Prompt

```
I need to create E2E tests for the complete user purchase flow using Playwright.

Context:
- Frontend: React app on localhost:3000
- Using data-testid attributes for locators
- Page Object Model pattern
- Existing pages: LoginPage, ProductsPage, CartPage, CheckoutPage

User flow to test:
1. User logs in
2. Searches for "laptop"
3. Adds first search result to cart
4. Proceeds to cart
5. Proceeds to checkout
6. Fills shipping address
7. Submits order
8. Verifies order confirmation

Please generate:
1. The E2E test following Playwright best practices
2. Any missing page object methods
3. Proper async/await handling
4. Good assertions at each step

Also include negative test cases:
- Invalid login credentials
- Empty cart checkout attempt
- Invalid shipping address
```

---

## Example 7: QUALITY-REPORT.md

```markdown
# Quality Validation Report
E-Commerce API Final Project

## Executive Summary

**Overall Assessment:** PASS
- Code Coverage: 82% (Target: 75%)
- Mutation Score: 75% (Target: 70%)
- All Tests: 35/35 PASSING
- Quality Issues: 12 found, 10 fixed

## 1. Code Coverage Summary

### Overall Metrics
- **Line Coverage:** 82% (Target: 75%) ✓
- **Branch Coverage:** 78% (Target: 70%) ✓
- **Function Coverage:** 85% (Target: 75%) ✓
- **Statement Coverage:** 82% (Target: 75%) ✓

### Coverage by Module

| Module | Lines | Branches | Functions | Status |
|--------|-------|----------|-----------|--------|
| Authentication | 90% | 85% | 95% | ✓ Excellent |
| Products | 85% | 80% | 88% | ✓ Good |
| Orders | 78% | 72% | 80% | ✓ Meets Target |
| Cart | 75% | 70% | 78% | ✓ Meets Target |
| Middleware | 88% | 82% | 90% | ✓ Good |
| Utils | 92% | 88% | 95% | ✓ Excellent |

### Uncovered Code Analysis

**Why certain code is uncovered:**

1. **Error Handling Paths** (3% of uncovered code)
   - Database connection failures
   - Extreme edge cases unlikely in normal operation
   - Rationale: Would require complex mocking of infrastructure

2. **Admin-Only Features** (2% of uncovered code)
   - Admin product management
   - User role management
   - Rationale: Out of scope for this phase

3. **Payment Integration** (5% of uncovered code)
   - External payment service calls (mocked)
   - Rationale: Third-party integration, mocked in tests

4. **Logging and Monitoring** (2% of uncovered code)
   - Logger utility calls
   - Performance monitoring hooks
   - Rationale: Non-functional, tested separately

**Decision:** Remaining 12% uncovered is acceptable given rationale above.

## 2. Mutation Testing Results

### Summary
- **Total Mutants:** 120
- **Killed:** 90 (75%)
- **Survived:** 25 (21%)
- **Timeout:** 3 (3%)
- **No Coverage:** 2 (1%)

### Files Tested
1. src/services/auth.service.js - 80% mutation score
2. src/services/product.service.js - 75% mutation score
3. src/services/order.service.js - 72% mutation score
4. src/middleware/authenticate.js - 78% mutation score
5. src/utils/validators.js - 85% mutation score

### Surviving Mutants Analysis

**Category 1: Equivalent Mutants (10 mutants)**
- Changes that don't affect behavior
- Example: `i++` vs `i = i + 1`
- Action: None required

**Category 2: Boundary Conditions (8 mutants)**
- Changes like `>` to `>=`
- Survived in edge cases
- Action: Added specific boundary tests

**Category 3: Return Values (5 mutants)**
- Boolean return mutations
- Action: Enhanced assertions in 3 tests

**Category 4: Error Messages (2 mutants)**
- Changed error message strings
- Action: Added specific message assertions

### Improvements Made
- Added 5 new test cases for boundary conditions
- Enhanced 8 existing tests with stronger assertions
- Improved mutation score from 68% to 75%

## 3. Quality Issues Found & Fixed

### Issue 1: Weak Assertions ✓ FIXED
**Severity:** Medium
**Location:** tests/unit/products/product.service.test.js

**Problem:**
```javascript
// Before
expect(product).toBeTruthy();
```

**Solution:**
```javascript
// After
expect(product).toEqual({
  id: expect.any(Number),
  name: 'Laptop',
  price: 999.99,
  stock: 10
});
```

**Impact:** 5 tests improved

### Issue 2: Missing Edge Cases ✓ FIXED
**Severity:** High
**Location:** Order creation tests

**Problem:** No tests for boundary conditions (quantity = 0, negative prices)

**Solution:** Added test cases:
- TC-018: Order with zero quantity
- TC-019: Order with negative quantity (should reject)
- TC-020: Product with price = 0

**Impact:** Coverage increased by 3%

### Issue 3: Flaky E2E Test ✓ FIXED
**Severity:** High
**Location:** tests/e2e/checkout.test.js

**Problem:** Test occasionally failed due to race condition with cart update

**Solution:**
```javascript
// Before
await page.click('[data-testid="add-to-cart"]');

// After
await page.click('[data-testid="add-to-cart"]');
await page.waitForResponse(res => res.url().includes('/cart') && res.status() === 200);
```

**Impact:** Test now passes reliably

### Issue 4: Incomplete Mock Cleanup ✓ FIXED
**Severity:** Medium
**Location:** Multiple unit test files

**Problem:** Mocks not cleared between tests, causing test pollution

**Solution:** Added proper cleanup:
```javascript
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

**Impact:** Eliminated 3 intermittent test failures

### Issue 5: Poor Test Independence ✓ FIXED
**Severity:** Medium
**Location:** Integration tests

**Problem:** Tests depended on execution order

**Solution:** Each test now:
- Clears database before running
- Creates own test data
- Cleans up after itself

**Impact:** Tests can now run in any order

### Remaining Issues (Not Fixed)

**Issue 6: External API Mocking**
**Severity:** Low
**Location:** Payment service tests

**Problem:** Payment service integration only basic mocks

**Reason Not Fixed:**
- Out of scope for this project
- Would require test doubles/stubs for external service
- Documented for future enhancement

**Impact:** Low - critical paths still tested with mocks

**Issue 7: Performance Tests Missing**
**Severity:** Low

**Reason Not Fixed:**
- Not required for this project
- Would need load testing tools
- Documented for future enhancement

## 4. Test Quality Checklist

### Test Structure
- [x] All tests follow AAA pattern
- [x] Clear, descriptive test names
- [x] Tests are independent
- [x] Proper setup/teardown
- [x] No hardcoded values (use constants)

### Assertions
- [x] Specific assertions (not just truthy)
- [x] Expected values explicit
- [x] Error messages tested
- [x] Edge cases covered
- [x] Negative cases tested

### Mocking
- [x] External dependencies mocked
- [x] Database mocked in unit tests
- [x] Mocks cleared between tests
- [x] Mock implementations realistic

### Coverage
- [x] >= 75% line coverage
- [x] >= 70% branch coverage
- [x] Critical paths covered
- [x] Error handling covered

### Code Quality
- [x] No skipped tests
- [x] No commented-out tests
- [x] Tests are readable
- [x] Tests are maintainable
- [x] DRY principle followed

## 5. Performance Metrics

### Test Execution Times

| Test Suite | Tests | Time | Status |
|------------|-------|------|--------|
| Unit Tests | 20 | 2.5s | ✓ Fast |
| Integration Tests | 10 | 8.2s | ✓ Acceptable |
| E2E Tests | 5 | 45s | ✓ Within Limits |
| **Total** | **35** | **55.7s** | ✓ Good |

**Target:** <60 seconds total - **MET**

### Optimization Notes
- Unit tests parallelized
- Integration tests use in-memory database
- E2E tests share browser context where possible

## 6. CI/CD Quality Gates

All gates passing in GitHub Actions:

- [x] All tests pass
- [x] Coverage >= 75%
- [x] No lint errors
- [x] No skipped tests
- [x] Build succeeds
- [x] Execution time < 10 minutes

## 7. Recommendations

### Immediate (Must Do)
✓ All completed

### Short Term (Next Sprint)
1. Add load/performance tests
2. Enhance payment service test coverage
3. Add contract tests for API
4. Implement visual regression tests

### Long Term (Future Enhancement)
1. Increase mutation score target to 80%
2. Add accessibility testing
3. Implement security testing (OWASP)
4. Add chaos engineering tests

## 8. Lessons Learned

### What Worked Well
1. **Strong Foundation:** CLAUDE.md upfront saved time
2. **Incremental Approach:** Unit -> Integration -> E2E
3. **AI Assistance:** Effective prompts generated good starting points
4. **Quality Focus:** Early quality validation caught issues

### Challenges Faced
1. **Flaky E2E Tests:** Required careful async handling
2. **Test Data Management:** Needed standardized fixtures
3. **Mock Complexity:** Some mocks were complex to set up

### For Next Time
1. Set up test fixtures earlier
2. Use test data builders pattern
3. Implement page object model from start
4. Run mutation testing throughout (not just at end)

## 9. Conclusion

**Project Quality: HIGH**

- All quality targets met or exceeded
- 82% code coverage (target: 75%)
- 75% mutation score (target: 70%)
- All 35 tests passing reliably
- CI/CD pipeline fully automated
- 12 quality issues identified, 10 fixed

**Ready for Submission:** YES

---

*Quality Report Generated: [Date]*
*Project: E-Commerce API Final Project*
*Student: [Your Name]*
```

---

## Additional Resources

### Helpful Links

- **Jest Documentation:** https://jestjs.io/docs/getting-started
- **Supertest Guide:** https://github.com/visionmedia/supertest
- **Playwright Docs:** https://playwright.dev/docs/intro
- **Test Doubles:** https://martinfowler.com/bliki/TestDouble.html
- **AAA Pattern:** https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/

### Templates Available

- CLAUDE.md templates for different tech stacks
- Test plan templates
- Page object model templates
- Quality report template
- CI/CD workflow templates

---

## Note on Using These Examples

**Remember:**

1. **Don't Copy Directly**
   - These are examples to learn from
   - Your project should be original
   - Adapt patterns to your needs

2. **Understand the Code**
   - Make sure you can explain all test code
   - Understand why tests are written this way
   - Be able to modify and extend

3. **Context Matters**
   - Examples are for Node.js/Express
   - Adapt for your tech stack
   - Follow your project's conventions

4. **Quality Over Quantity**
   - Better to have fewer, excellent tests
   - Than many mediocre tests
   - Focus on meaningful coverage

---

**Use these examples as inspiration and reference. Make your project uniquely yours!**

---

*Example Projects - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
