# QA Track Module 3: API Testing Mastery
## FPUNA Summer 2026 - Week 6 (QA Automation Specialization)

**Duration**: 10 hours (Week 6 of program)  
**Tool Focus**: OpenCode + Playwright + Supertest  
**Prerequisites**: Core Modules 1-6, QA Modules 1-2 completed

---

## Module Overview

You've mastered advanced Playwright and test generation at scale. This week, you'll become an expert in API testing—the backbone of modern application testing. APIs are everywhere: connecting frontend to backend, microservices to each other, mobile apps to servers. As a professional QA engineer, you must validate that these critical interfaces work correctly, perform well, and remain secure.

### Learning Objectives

By the end of this week, you will be able to:

1. **Test** REST APIs comprehensively with Playwright and Supertest
2. **Validate** GraphQL APIs and handle complex queries
3. **Implement** contract testing with Pact for microservices
4. **Perform** basic API performance and load testing
5. **Identify** and test for common API security vulnerabilities
6. **Generate** comprehensive API test suites with OpenCode
7. **Automate** API testing in CI/CD pipelines

---

## Why API Testing Matters

### The API Testing Reality

```
Modern Applications:
Frontend ← REST/GraphQL APIs → Backend
             ↓
     Microservices ← APIs → Databases
             ↓
     Third-party APIs (payments, auth, etc.)
```

**Industry Statistics**:
- 83% of web traffic is API-based
- API failures cost companies $2.5B+ annually
- 40% of security breaches involve API vulnerabilities
- Companies with robust API testing deploy 10x faster

**Professional Expectation**: QA engineers who can thoroughly test APIs are in high demand and command premium salaries.

---

## 3.1 REST API Testing Fundamentals

### What is REST API Testing?

**REST** (Representational State Transfer) APIs communicate using HTTP methods:

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Retrieve data | Get user profile |
| POST | Create new resource | Register new user |
| PUT | Update entire resource | Update user profile |
| PATCH | Partially update resource | Change user email |
| DELETE | Remove resource | Delete user account |

**What to Test**:
1. **Correctness**: Right data returned
2. **Status Codes**: Appropriate HTTP response codes
3. **Response Schema**: Matches expected structure
4. **Headers**: Correct content-type, authentication, etc.
5. **Performance**: Response times within limits
6. **Error Handling**: Proper error messages

---

### Setting Up API Testing Environment

```typescript
// tests/api/setup.ts
import { test as base, expect } from '@playwright/test';

// Extend Playwright with API testing helpers
export const test = base.extend<{
  apiContext: any;
  apiRequest: any;
}>({
  apiContext: async ({ request }, use) => {
    // Create API context with base URL and headers
    const context = await request.newContext({
      baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    
    await use(context);
    await context.dispose();
  },

  apiRequest: async ({ apiContext }, use) => {
    // Helper function for authenticated requests
    const makeRequest = async (method: string, endpoint: string, options = {}) => {
      const token = process.env.API_TOKEN || '';
      
      return apiContext[method.toLowerCase()](endpoint, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          ...options.headers
        }
      });
    };
    
    await use(makeRequest);
  }
});

export { expect };
```

---

### Basic REST API Tests with Playwright

```typescript
// tests/api/users.spec.ts
import { test, expect } from './setup';

test.describe('User API', () => {
  test.describe('GET /users', () => {
    test('should return list of users', async ({ request }) => {
      // Act
      const response = await request.get('http://localhost:3000/api/users');
      
      // Assert status code
      expect(response.status()).toBe(200);
      
      // Assert response body
      const users = await response.json();
      expect(Array.isArray(users)).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      
      // Assert structure of first user
      expect(users[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.stringMatching(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        role: expect.stringMatching(/^(admin|user|guest)$/),
      });
    });

    test('should return 401 without authentication', async ({ request }) => {
      // Act - request without auth header
      const response = await request.get('http://localhost:3000/api/users', {
        headers: {} // No Authorization header
      });
      
      // Assert
      expect(response.status()).toBe(401);
      
      const error = await response.json();
      expect(error).toMatchObject({
        error: 'Unauthorized',
        message: expect.stringContaining('authentication')
      });
    });

    test('should filter users by role', async ({ request }) => {
      // Act
      const response = await request.get('http://localhost:3000/api/users?role=admin');
      
      // Assert
      expect(response.status()).toBe(200);
      
      const users = await response.json();
      users.forEach(user => {
        expect(user.role).toBe('admin');
      });
    });
  });

  test.describe('POST /users', () => {
    test('should create new user with valid data', async ({ request }) => {
      // Arrange
      const newUser = {
        name: 'María González',
        email: 'maria.gonzalez@fpuna.edu.py',
        password: 'SecurePass123!',
        role: 'user'
      };
      
      // Act
      const response = await request.post('http://localhost:3000/api/users', {
        data: newUser
      });
      
      // Assert response
      expect(response.status()).toBe(201);
      
      const createdUser = await response.json();
      expect(createdUser).toMatchObject({
        id: expect.any(String),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
      
      // Password should NOT be returned
      expect(createdUser.password).toBeUndefined();
      
      // Verify user can be fetched
      const getResponse = await request.get(`http://localhost:3000/api/users/${createdUser.id}`);
      expect(getResponse.status()).toBe(200);
    });

    test('should return 400 for invalid email', async ({ request }) => {
      // Arrange
      const invalidUser = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'SecurePass123!',
        role: 'user'
      };
      
      // Act
      const response = await request.post('http://localhost:3000/api/users', {
        data: invalidUser
      });
      
      // Assert
      expect(response.status()).toBe(400);
      
      const error = await response.json();
      expect(error.message).toContain('email');
      expect(error.field).toBe('email');
    });

    test('should return 400 for weak password', async ({ request }) => {
      // Arrange
      const weakPasswordUser = {
        name: 'Test User',
        email: 'test@fpuna.edu.py',
        password: '123', // Too weak
        role: 'user'
      };
      
      // Act
      const response = await request.post('http://localhost:3000/api/users', {
        data: weakPasswordUser
      });
      
      // Assert
      expect(response.status()).toBe(400);
      
      const error = await response.json();
      expect(error.message).toMatch(/password.*at least 8 characters/i);
    });

    test('should return 409 for duplicate email', async ({ request }) => {
      // Arrange - Create first user
      const user = {
        name: 'Carlos Ramírez',
        email: 'carlos@fpuna.edu.py',
        password: 'SecurePass123!',
        role: 'user'
      };
      
      await request.post('http://localhost:3000/api/users', { data: user });
      
      // Act - Try to create duplicate
      const response = await request.post('http://localhost:3000/api/users', {
        data: user
      });
      
      // Assert
      expect(response.status()).toBe(409);
      
      const error = await response.json();
      expect(error.message).toContain('already exists');
    });
  });

  test.describe('PUT /users/:id', () => {
    test('should update user completely', async ({ request }) => {
      // Arrange - Create user
      const createResponse = await request.post('http://localhost:3000/api/users', {
        data: {
          name: 'Original Name',
          email: 'original@fpuna.edu.py',
          password: 'SecurePass123!',
          role: 'user'
        }
      });
      const user = await createResponse.json();
      
      // Act - Update all fields
      const updatedData = {
        name: 'Updated Name',
        email: 'updated@fpuna.edu.py',
        role: 'admin'
      };
      
      const response = await request.put(`http://localhost:3000/api/users/${user.id}`, {
        data: updatedData
      });
      
      // Assert
      expect(response.status()).toBe(200);
      
      const updatedUser = await response.json();
      expect(updatedUser).toMatchObject(updatedData);
    });

    test('should return 404 for non-existent user', async ({ request }) => {
      // Act
      const response = await request.put('http://localhost:3000/api/users/non-existent-id', {
        data: { name: 'Test' }
      });
      
      // Assert
      expect(response.status()).toBe(404);
    });
  });

  test.describe('DELETE /users/:id', () => {
    test('should delete existing user', async ({ request }) => {
      // Arrange - Create user
      const createResponse = await request.post('http://localhost:3000/api/users', {
        data: {
          name: 'To Delete',
          email: 'delete@fpuna.edu.py',
          password: 'SecurePass123!',
          role: 'user'
        }
      });
      const user = await createResponse.json();
      
      // Act
      const response = await request.delete(`http://localhost:3000/api/users/${user.id}`);
      
      // Assert deletion succeeded
      expect(response.status()).toBe(204);
      
      // Verify user no longer exists
      const getResponse = await request.get(`http://localhost:3000/api/users/${user.id}`);
      expect(getResponse.status()).toBe(404);
    });

    test('should return 404 when deleting non-existent user', async ({ request }) => {
      // Act
      const response = await request.delete('http://localhost:3000/api/users/non-existent-id');
      
      // Assert
      expect(response.status()).toBe(404);
    });
  });
});
```

---

### Using Supertest for Node.js APIs

Supertest is another popular library specifically for testing Node.js/Express APIs:

```typescript
// tests/api/products.supertest.ts
import request from 'supertest';
import app from '../../src/app';
import db from '../../src/database';

describe('Products API', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  beforeEach(async () => {
    await db('products').truncate();
  });

  describe('GET /api/products', () => {
    it('should return empty array when no products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toEqual([]);
    });

    it('should return all products', async () => {
      // Arrange - Seed database
      await db('products').insert([
        { name: 'Chipa', price: 5000, category: 'Comida Típica' },
        { name: 'Tereré', price: 3000, category: 'Bebidas' },
        { name: 'Sopa Paraguaya', price: 15000, category: 'Comida Típica' }
      ]);

      // Act
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      // Assert
      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toMatchObject({
        name: expect.any(String),
        price: expect.any(Number),
        category: expect.any(String)
      });
    });

    it('should filter products by category', async () => {
      // Arrange
      await db('products').insert([
        { name: 'Chipa', price: 5000, category: 'Comida Típica' },
        { name: 'Tereré', price: 3000, category: 'Bebidas' }
      ]);

      // Act
      const response = await request(app)
        .get('/api/products?category=Bebidas')
        .expect(200);

      // Assert
      expect(response.body).toHaveLength(1);
      expect(response.body[0].category).toBe('Bebidas');
    });
  });

  describe('POST /api/products', () => {
    it('should create product and return 201', async () => {
      // Arrange
      const newProduct = {
        name: 'Empanada',
        price: 2500,
        category: 'Comida Típica',
        description: 'Deliciosa empanada casera',
        inStock: true
      };

      // Act
      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201)
        .expect('Content-Type', /json/);

      // Assert
      expect(response.body).toMatchObject({
        id: expect.any(Number),
        ...newProduct,
        createdAt: expect.any(String)
      });

      // Verify in database
      const product = await db('products').where('id', response.body.id).first();
      expect(product).toBeDefined();
      expect(product.name).toBe(newProduct.name);
    });

    it('should return 400 for missing required fields', async () => {
      // Arrange - Missing price
      const invalidProduct = {
        name: 'Test Product',
        category: 'Test'
        // price is missing!
      };

      // Act
      const response = await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);

      // Assert
      expect(response.body.error).toContain('price');
    });

    it('should return 400 for negative price', async () => {
      // Arrange
      const invalidProduct = {
        name: 'Test',
        price: -1000,
        category: 'Test'
      };

      // Act
      const response = await request(app)
        .post('/api/products')
        .send(invalidProduct)
        .expect(400);

      // Assert
      expect(response.body.error).toMatch(/price.*positive/i);
    });
  });
});
```

---

### OpenCode Prompt for API Test Generation

**Prompt**:
```
Generate comprehensive REST API tests for these endpoints:

API Specification:
- Base URL: http://localhost:3000/api
- Authentication: Bearer token in Authorization header

Endpoints:
1. GET /products - List all products
   - Query params: category (optional), search (optional), page, limit
   - Response: Array of products
   
2. GET /products/:id - Get single product
   - Response: Product object or 404
   
3. POST /products - Create product
   - Body: { name, price, category, description?, inStock }
   - Response: 201 with created product
   - Validation: name (required, 3-100 chars), price (required, positive number)
   
4. PUT /products/:id - Update product
   - Body: Complete product object
   - Response: 200 with updated product or 404
   
5. DELETE /products/:id - Delete product
   - Response: 204 or 404

Requirements:
- Use Playwright request context
- Test all HTTP methods
- Test success cases (200, 201, 204)
- Test validation errors (400)
- Test authentication errors (401)
- Test not found errors (404)
- Test query parameters
- Validate response schemas
- Include Paraguayan product names (Chipa, Tereré, etc.)
- Use TypeScript
- Follow AAA pattern
- Include setup/teardown for test data
```

---

## 3.2 GraphQL API Testing

### What is GraphQL?

**GraphQL** is a query language for APIs that allows clients to request exactly the data they need:

```graphql
# Traditional REST: Multiple requests
GET /users/123
GET /users/123/orders
GET /orders/456/items

# GraphQL: Single request
query {
  user(id: "123") {
    name
    email
    orders {
      id
      total
      items {
        name
        price
      }
    }
  }
}
```

---

### Testing GraphQL Queries

```typescript
// tests/api/graphql.spec.ts
import { test, expect } from '@playwright/test';

const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';

test.describe('GraphQL API', () => {
  const makeGraphQLRequest = async (request, query: string, variables = {}) => {
    return request.post(GRAPHQL_ENDPOINT, {
      data: {
        query,
        variables
      }
    });
  };

  test.describe('Queries', () => {
    test('should fetch user by ID', async ({ request }) => {
      // Arrange
      const query = `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
            email
            role
          }
        }
      `;
      
      const variables = { id: 'user-123' };
      
      // Act
      const response = await makeGraphQLRequest(request, query, variables);
      
      // Assert
      expect(response.status()).toBe(200);
      
      const body = await response.json();
      expect(body.errors).toBeUndefined();
      expect(body.data.user).toMatchObject({
        id: 'user-123',
        name: expect.any(String),
        email: expect.stringMatching(/@/),
        role: expect.stringMatching(/^(admin|user|guest)$/)
      });
    });

    test('should fetch user with nested orders', async ({ request }) => {
      // Arrange
      const query = `
        query GetUserWithOrders($id: ID!) {
          user(id: $id) {
            name
            orders {
              id
              total
              status
              items {
                productName
                quantity
                price
              }
            }
          }
        }
      `;
      
      // Act
      const response = await makeGraphQLRequest(request, query, { id: 'user-123' });
      
      // Assert
      const body = await response.json();
      expect(body.data.user.orders).toBeDefined();
      expect(Array.isArray(body.data.user.orders)).toBeTruthy();
      
      if (body.data.user.orders.length > 0) {
        expect(body.data.user.orders[0]).toMatchObject({
          id: expect.any(String),
          total: expect.any(Number),
          status: expect.any(String),
          items: expect.any(Array)
        });
      }
    });

    test('should return error for non-existent user', async ({ request }) => {
      // Arrange
      const query = `
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            name
          }
        }
      `;
      
      // Act
      const response = await makeGraphQLRequest(request, query, { id: 'non-existent' });
      
      // Assert
      const body = await response.json();
      expect(body.errors).toBeDefined();
      expect(body.errors[0].message).toContain('not found');
    });
  });

  test.describe('Mutations', () => {
    test('should create new user', async ({ request }) => {
      // Arrange
      const mutation = `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            name
            email
            role
          }
        }
      `;
      
      const variables = {
        input: {
          name: 'Laura Silva',
          email: 'laura.silva@fpuna.edu.py',
          password: 'SecurePass123!',
          role: 'user'
        }
      };
      
      // Act
      const response = await makeGraphQLRequest(request, mutation, variables);
      
      // Assert
      const body = await response.json();
      expect(body.errors).toBeUndefined();
      expect(body.data.createUser).toMatchObject({
        id: expect.any(String),
        name: variables.input.name,
        email: variables.input.email,
        role: variables.input.role
      });
    });

    test('should return validation error for invalid email', async ({ request }) => {
      // Arrange
      const mutation = `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
          }
        }
      `;
      
      const variables = {
        input: {
          name: 'Test',
          email: 'invalid-email',
          password: 'SecurePass123!',
          role: 'user'
        }
      };
      
      // Act
      const response = await makeGraphQLRequest(request, mutation, variables);
      
      // Assert
      const body = await response.json();
      expect(body.errors).toBeDefined();
      expect(body.errors[0].message).toMatch(/email/i);
    });
  });

  test.describe('Field-Level Testing', () => {
    test('should only return requested fields', async ({ request }) => {
      // Arrange - Request only name and email, NOT role
      const query = `
        query GetUser($id: ID!) {
          user(id: $id) {
            name
            email
          }
        }
      `;
      
      // Act
      const response = await makeGraphQLRequest(request, query, { id: 'user-123' });
      
      // Assert
      const body = await response.json();
      const user = body.data.user;
      
      expect(user.name).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.role).toBeUndefined(); // Should not be included
    });
  });
});
```

---

### OpenCode Prompt for GraphQL Tests

**Prompt**:
```
Generate comprehensive GraphQL API tests for this schema:

Schema:
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  role: Role!
  orders: [Order!]!
}

type Order {
  id: ID!
  user: User!
  items: [OrderItem!]!
  total: Float!
  status: OrderStatus!
  createdAt: DateTime!
}

type OrderItem {
  id: ID!
  productName: String!
  quantity: Int!
  price: Float!
}

enum Role {
  ADMIN
  USER
  GUEST
}

enum OrderStatus {
  PENDING
  COMPLETED
  CANCELLED
}

type Query {
  user(id: ID!): User
  users(role: Role, limit: Int): [User!]!
  order(id: ID!): Order
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
  role: Role!
}
```

Test Requirements:
- Test all queries with various parameters
- Test all mutations (create, update, delete)
- Test nested field resolution
- Test field-level permissions
- Test validation errors
- Test not found scenarios
- Use Playwright request context
- Include Paraguayan names and emails
- TypeScript with proper types
```

---

## 3.3 Contract Testing with Pact

### What is Contract Testing?

**Contract Testing** ensures that services communicate correctly by testing the "contract" (agreement) between them:

```
Frontend ↔ [Contract] ↔ Backend API
         Tests that       Tests that
         expected data    data matches
         structure        what frontend
         is provided      expects
```

**Why Contract Testing?**
- Catch integration issues early
- Test services independently
- Prevent breaking changes
- Enable parallel development

---

### Setting Up Pact

```bash
npm install --save-dev @pact-foundation/pact
```

```typescript
// tests/contract/products-consumer.pact.spec.ts
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import axios from 'axios';

const { eachLike, like } = MatchersV3;

const provider = new PactV3({
  consumer: 'ProductsFrontend',
  provider: 'ProductsAPI',
  dir: './pacts'
});

describe('Products API Contract', () => {
  describe('GET /products', () => {
    it('should return list of products', async () => {
      // Arrange - Define expected interaction
      await provider
        .given('products exist')
        .uponReceiving('a request for all products')
        .withRequest({
          method: 'GET',
          path: '/api/products',
          headers: {
            'Accept': 'application/json'
          }
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: eachLike({
            id: like('prod-123'),
            name: like('Chipa'),
            price: like(5000),
            category: like('Comida Típica'),
            inStock: like(true)
          })
        });

      // Act - Make actual request
      await provider.executeTest(async (mockServer) => {
        const response = await axios.get(`${mockServer.url}/api/products`);
        
        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBeTruthy();
        expect(response.data[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
          category: expect.any(String),
          inStock: expect.any(Boolean)
        });
      });
    });
  });

  describe('POST /products', () => {
    it('should create product', async () => {
      // Arrange
      await provider
        .given('user is authenticated')
        .uponReceiving('a request to create product')
        .withRequest({
          method: 'POST',
          path: '/api/products',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': like('Bearer token-123')
          },
          body: {
            name: 'Empanada',
            price: 2500,
            category: 'Comida Típica'
          }
        })
        .willRespondWith({
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            id: like('prod-456'),
            name: 'Empanada',
            price: 2500,
            category: 'Comida Típica',
            inStock: true,
            createdAt: like('2026-01-14T10:00:00Z')
          }
        });

      // Act
      await provider.executeTest(async (mockServer) => {
        const response = await axios.post(
          `${mockServer.url}/api/products`,
          {
            name: 'Empanada',
            price: 2500,
            category: 'Comida Típica'
          },
          {
            headers: {
              'Authorization': 'Bearer token-123'
            }
          }
        );
        
        // Assert
        expect(response.status).toBe(201);
        expect(response.data.id).toBeDefined();
      });
    });
  });
});
```

---

### Provider-Side Verification

```typescript
// tests/contract/products-provider.pact.spec.ts
import { Verifier } from '@pact-foundation/pact';
import path from 'path';
import app from '../../src/app';

describe('Products API Provider Verification', () => {
  let server;

  beforeAll(async () => {
    // Start the actual API server
    server = app.listen(3001);
  });

  afterAll(() => {
    server.close();
  });

  it('should validate the contract', async () => {
    const opts = {
      provider: 'ProductsAPI',
      providerBaseUrl: 'http://localhost:3001',
      pactUrls: [
        path.resolve(__dirname, '../../pacts/productsfrontend-productsapi.json')
      ],
      publishVerificationResult: true,
      providerVersion: '1.0.0'
    };

    await new Verifier(opts).verifyProvider();
  });
});
```

---

## 3.4 API Performance Testing

### Why Performance Testing Matters

**Real-World Impact**:
- 1 second delay = 7% conversion loss
- 100ms delay = 1% revenue drop
- Users abandon after 3 seconds

### Basic Performance Tests

```typescript
// tests/performance/api-load.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Performance', () => {
  test('should respond to GET /products within 200ms', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get('http://localhost:3000/api/products');
    
    const duration = Date.now() - startTime;
    
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(200); // Under 200ms
  });

  test('should handle 100 concurrent requests', async ({ request }) => {
    const requests = Array.from({ length: 100 }, () =>
      request.get('http://localhost:3000/api/products')
    );

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const duration = Date.now() - startTime;

    // All requests succeeded
    responses.forEach(response => {
      expect(response.status()).toBe(200);
    });

    // Average response time under 500ms
    const avgTime = duration / 100;
    expect(avgTime).toBeLessThan(500);
  });

  test('should paginate large result sets efficiently', async ({ request }) => {
    const page1Start = Date.now();
    const page1Response = await request.get('http://localhost:3000/api/products?page=1&limit=20');
    const page1Duration = Date.now() - page1Start;

    const page5Start = Date.now();
    const page5Response = await request.get('http://localhost:3000/api/products?page=5&limit=20');
    const page5Duration = Date.now() - page5Start;

    // Both should be reasonably fast
    expect(page1Duration).toBeLessThan(300);
    expect(page5Duration).toBeLessThan(300);
    
    // Pagination shouldn't significantly degrade performance
    expect(page5Duration).toBeLessThan(page1Duration * 2);
  });
});
```

---

## 3.5 API Security Testing

### Common API Security Vulnerabilities

| Vulnerability | Description | Test For |
|---------------|-------------|----------|
| **Broken Authentication** | Weak auth mechanisms | Test auth bypass, weak tokens |
| **Broken Authorization** | Users accessing unauthorized resources | Test role-based access |
| **Injection** | SQL/NoSQL injection attacks | Test malicious input |
| **Mass Assignment** | Modifying restricted fields | Test updating admin-only fields |
| **Rate Limiting** | No protection against abuse | Test excessive requests |
| **Sensitive Data Exposure** | Leaking sensitive info | Test response data |

---

### Security Testing Examples

```typescript
// tests/security/api-security.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API Security', () => {
  test.describe('Authentication', () => {
    test('should reject requests without auth token', async ({ request }) => {
      const response = await request.get('http://localhost:3000/api/users', {
        headers: {} // No Authorization header
      });

      expect(response.status()).toBe(401);
    });

    test('should reject requests with invalid token', async ({ request }) => {
      const response = await request.get('http://localhost:3000/api/users', {
        headers: {
          'Authorization': 'Bearer invalid-token-123'
        }
      });

      expect(response.status()).toBe(401);
    });

    test('should reject expired tokens', async ({ request }) => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Expired JWT
      
      const response = await request.get('http://localhost:3000/api/users', {
        headers: {
          'Authorization': `Bearer ${expiredToken}`
        }
      });

      expect(response.status()).toBe(401);
      const body = await response.json();
      expect(body.error).toMatch(/expired/i);
    });
  });

  test.describe('Authorization', () => {
    test('regular user cannot access admin endpoints', async ({ request }) => {
      const userToken = 'user-token-123'; // Regular user token
      
      const response = await request.get('http://localhost:3000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      expect(response.status()).toBe(403);
    });

    test('user cannot update other users data', async ({ request }) => {
      const userToken = 'user-123-token';
      
      const response = await request.put('http://localhost:3000/api/users/other-user-id', {
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
        data: {
          name: 'Hacked Name'
        }
      });

      expect(response.status()).toBe(403);
    });
  });

  test.describe('Injection Prevention', () => {
    test('should prevent SQL injection in query params', async ({ request }) => {
      const maliciousQuery = "'; DROP TABLE users; --";
      
      const response = await request.get(
        `http://localhost:3000/api/products?search=${encodeURIComponent(maliciousQuery)}`
      );

      // Should either sanitize or reject, not crash
      expect([200, 400]).toContain(response.status());
      
      // Verify database still intact by querying users
      const usersResponse = await request.get('http://localhost:3000/api/users');
      expect(usersResponse.status()).toBe(200);
    });

    test('should prevent NoSQL injection', async ({ request }) => {
      const maliciousPayload = {
        email: { $ne: null },
        password: { $ne: null }
      };
      
      const response = await request.post('http://localhost:3000/api/login', {
        data: maliciousPayload
      });

      expect(response.status()).toBe(400); // Should reject malformed input
    });
  });

  test.describe('Mass Assignment Prevention', () => {
    test('should not allow setting admin role via update', async ({ request }) => {
      // Create regular user
      const createResponse = await request.post('http://localhost:3000/api/users', {
        data: {
          name: 'Regular User',
          email: 'regular@fpuna.edu.py',
          password: 'SecurePass123!',
          role: 'user'
        }
      });
      const user = await createResponse.json();
      
      // Try to elevate to admin
      const updateResponse = await request.put(`http://localhost:3000/api/users/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        data: {
          role: 'admin' // Should be rejected
        }
      });

      // Should either ignore the field or reject
      expect([200, 403]).toContain(updateResponse.status());
      
      // Verify role didn't change
      const getResponse = await request.get(`http://localhost:3000/api/users/${user.id}`);
      const updatedUser = await getResponse.json();
      expect(updatedUser.role).toBe('user');
    });
  });

  test.describe('Rate Limiting', () => {
    test('should enforce rate limits on login endpoint', async ({ request }) => {
      const requests = Array.from({ length: 20 }, () =>
        request.post('http://localhost:3000/api/login', {
          data: {
            email: 'test@fpuna.edu.py',
            password: 'wrong-password'
          }
        })
      );

      const responses = await Promise.all(requests);
      
      // Some requests should be rate limited (429)
      const rateLimited = responses.filter(r => r.status() === 429);
      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });

  test.describe('Sensitive Data Exposure', () => {
    test('should not expose passwords in responses', async ({ request }) => {
      const response = await request.get('http://localhost:3000/api/users/user-123');
      
      const user = await response.json();
      
      expect(user.password).toBeUndefined();
      expect(user.passwordHash).toBeUndefined();
      expect(JSON.stringify(user)).not.toMatch(/password/i);
    });

    test('should not expose internal system details in errors', async ({ request }) => {
      const response = await request.get('http://localhost:3000/api/users/invalid-id');
      
      const error = await response.json();
      
      // Should not expose stack traces or database info
      expect(JSON.stringify(error)).not.toMatch(/stack|trace|sql|database/i);
    });
  });
});
```

---

## Week 6 Practical Exercises

### Exercise 3.1: Comprehensive REST API Test Suite (120 minutes)

**Objective**: Create complete REST API tests for an e-commerce API

**Scenario**: You're testing a products API with full CRUD operations.

**Tasks**:

1. **Setup** (15 min):
   - Create test file structure
   - Set up API test helpers
   - Configure base URL and authentication

2. **Generate Tests with OpenCode** (45 min):
   - Use OpenCode to generate tests for all endpoints
   - Cover GET, POST, PUT, DELETE methods
   - Include query parameter testing
   - Add pagination tests

3. **Add Validation Tests** (30 min):
   - Test input validation (400 errors)
   - Test required fields
   - Test data type validation
   - Test boundary values

4. **Add Error Scenarios** (20 min):
   - Test 401 (unauthorized)
   - Test 403 (forbidden)
   - Test 404 (not found)
   - Test 409 (conflict)

5. **Run and Refine** (10 min):
   - Execute all tests
   - Fix any failures
   - Verify coverage

**Deliverable**:
- 40+ passing API tests
- Tests covering all CRUD operations
- Validation and error handling tests
- Documentation of test approach

**Success Criteria**:
- ✅ All HTTP methods tested
- ✅ All status codes validated
- ✅ Response schemas verified
- ✅ Edge cases covered
- ✅ Tests run reliably

---

### Exercise 3.2: GraphQL API Testing (75 minutes)

**Objective**: Build comprehensive GraphQL API tests

**Scenario**: Testing a GraphQL API for a social media platform.

**Tasks**:

1. **Analyze Schema** (10 min):
   - Review GraphQL schema
   - Identify queries and mutations
   - Note relationships and nested fields

2. **Generate Query Tests** (30 min):
   - Test simple queries
   - Test queries with parameters
   - Test nested field resolution
   - Test field-level permissions

3. **Generate Mutation Tests** (25 min):
   - Test create operations
   - Test update operations
   - Test delete operations
   - Test validation errors

4. **Test Error Handling** (10 min):
   - Test invalid queries
   - Test missing required fields
   - Test unauthorized access

**Deliverable**:
- Complete GraphQL test suite
- Tests for all queries and mutations
- Nested field resolution tests
- Error handling tests

**Success Criteria**:
- ✅ All queries tested
- ✅ All mutations tested
- ✅ Nested fields verified
- ✅ Errors handled correctly

---

### Exercise 3.3: API Security Audit (60 minutes)

**Objective**: Conduct security testing on an API

**Scenario**: You're tasked with finding security vulnerabilities in an API before production deployment.

**Tasks**:

1. **Authentication Testing** (15 min):
   - Test without credentials
   - Test with invalid credentials
   - Test with expired tokens
   - Test token refresh mechanism

2. **Authorization Testing** (15 min):
   - Test role-based access
   - Test horizontal privilege escalation
   - Test vertical privilege escalation

3. **Injection Testing** (15 min):
   - Test SQL injection attempts
   - Test NoSQL injection
   - Test command injection

4. **Other Security Tests** (15 min):
   - Test rate limiting
   - Test sensitive data exposure
   - Test mass assignment vulnerabilities

**Deliverable**:
- Security test suite
- Report of vulnerabilities found
- Recommendations for fixes

**Success Criteria**:
- ✅ Authentication properly enforced
- ✅ Authorization working correctly
- ✅ No injection vulnerabilities
- ✅ Rate limiting in place
- ✅ No sensitive data exposed

---

## Knowledge Check Quiz

1. **What HTTP method is used to partially update a resource?**
   a) POST
   b) PUT
   c) PATCH
   d) UPDATE

2. **What status code indicates successful resource creation?**
   a) 200
   b) 201
   c) 204
   d) 301

3. **In GraphQL, what's the benefit over REST APIs?**
   a) Faster execution
   b) Client specifies exact data needed
   c) No need for authentication
   d) Automatic caching

4. **What does contract testing verify?**
   a) Legal agreements
   b) Service interface compatibility
   c) Code quality
   d) Database schemas

5. **What status code indicates rate limiting?**
   a) 400
   b) 403
   c) 429
   d) 503

**Answer Key**: [1-c, 2-b, 3-b, 4-b, 5-c]

---

## Week 6 Summary

This week, you mastered:

### Key Concepts
- ✅ REST API testing (GET, POST, PUT, DELETE)
- ✅ Response validation and schema testing
- ✅ GraphQL queries and mutations
- ✅ Contract testing with Pact
- ✅ API performance testing basics
- ✅ API security testing

### Skills Developed
- ✅ Test any REST API comprehensively
- ✅ Validate GraphQL APIs
- ✅ Implement contract tests for microservices
- ✅ Identify API security vulnerabilities
- ✅ Measure API performance
- ✅ Generate API tests with OpenCode

### Practical Applications
- ✅ Can test backend APIs independently
- ✅ Can catch breaking changes early
- ✅ Can verify API security
- ✅ Ready for full-stack testing

---

## Next Week: Module 4 - CI/CD Integration & Test Automation

**Week 7 Preview**:
- GitHub Actions for test automation
- CI/CD pipeline design
- Test reporting and dashboards
- Parallel test execution
- Environment management
- Deployment gates

---

## Additional Resources

### REST API Testing
- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [HTTP Status Codes](https://httpstatuses.com/)

### GraphQL
- [GraphQL Specification](https://spec.graphql.org/)
- [Testing GraphQL APIs](https://graphql.org/learn/testing/)

### Contract Testing
- [Pact Documentation](https://docs.pact.io/)
- [Contract Testing Guide](https://martinfowler.com/articles/consumerDrivenContracts.html)

### API Security
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [API Security Best Practices](https://github.com/shieldfy/API-Security-Checklist)

### Practice APIs
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free fake API for testing
- [ReqRes](https://reqres.in/) - Hosted REST API for testing

---

**Module Status**: ✅ Week 6 Complete

**Next Module**: [QA Track Module 4 - CI/CD Integration](./QA-TRACK-MODULE-04.md)
