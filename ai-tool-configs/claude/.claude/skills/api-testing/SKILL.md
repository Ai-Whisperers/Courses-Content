---
name: api-testing
description: Generate comprehensive API tests from OpenAPI/Swagger specs, validate contracts, and create mock servers. Use when working with REST APIs, GraphQL, or API testing.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# API Testing Skill

## Capabilities

- Generate tests from OpenAPI/Swagger specifications
- Validate API contracts and detect breaking changes
- Create mock servers for testing
- Generate parameterized request builders
- Test authentication flows (OAuth, JWT, API keys)

## Test Generation from OpenAPI

When given an OpenAPI spec, generate tests for:
1. All endpoints (GET, POST, PUT, DELETE, PATCH)
2. Request validation (required fields, types, formats)
3. Response validation (status codes, schemas)
4. Error handling (4xx, 5xx responses)
5. Authentication/Authorization
6. Rate limiting
7. Pagination

## Test Structure

### REST API Tests
```typescript
import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  const baseURL = process.env.API_URL;
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    // Get auth token
    const response = await request.post(`${baseURL}/auth/login`, {
      data: { email: 'test@test.com', password: 'password' }
    });
    const json = await response.json();
    authToken = json.token;
  });

  test('GET /users - returns list of users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users.data)).toBeTruthy();
    expect(users.data[0]).toHaveProperty('id');
    expect(users.data[0]).toHaveProperty('email');
  });

  test('POST /users - creates new user', async ({ request }) => {
    const userData = {
      name: 'Test User',
      email: `test-${Date.now()}@test.com`,
      role: 'user'
    };

    const response = await request.post(`${baseURL}/users`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: userData
    });

    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.data.email).toBe(userData.email);
  });

  test('POST /users - validates required fields', async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { name: 'Missing Email' }
    });

    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error.code).toBe('VALIDATION_ERROR');
  });

  test('GET /users/:id - returns 404 for non-existent user', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/999999`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    expect(response.status()).toBe(404);
  });

  test('GET /users - returns 401 without auth', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);
    expect(response.status()).toBe(401);
  });
});
```

### Contract Validation
```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

test('Response matches OpenAPI schema', async ({ request }) => {
  const response = await request.get(`${baseURL}/users`);
  const data = await response.json();

  const schema = {
    type: 'object',
    required: ['data', 'meta'],
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'email', 'name'],
          properties: {
            id: { type: 'number' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' }
          }
        }
      },
      meta: {
        type: 'object',
        properties: {
          total: { type: 'number' },
          page: { type: 'number' }
        }
      }
    }
  };

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error(validate.errors);
  }
  expect(valid).toBeTruthy();
});
```

## GraphQL Testing

```typescript
test.describe('GraphQL API', () => {
  test('Query users', async ({ request }) => {
    const query = `
      query GetUsers($limit: Int) {
        users(limit: $limit) {
          id
          name
          email
        }
      }
    `;

    const response = await request.post(`${baseURL}/graphql`, {
      data: {
        query,
        variables: { limit: 10 }
      }
    });

    expect(response.ok()).toBeTruthy();
    const { data, errors } = await response.json();
    expect(errors).toBeUndefined();
    expect(data.users).toHaveLength(10);
  });

  test('Mutation creates user', async ({ request }) => {
    const mutation = `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          email
        }
      }
    `;

    const response = await request.post(`${baseURL}/graphql`, {
      data: {
        query: mutation,
        variables: {
          input: {
            name: 'New User',
            email: `new-${Date.now()}@test.com`
          }
        }
      }
    });

    const { data, errors } = await response.json();
    expect(errors).toBeUndefined();
    expect(data.createUser.id).toBeDefined();
  });
});
```

## Mock Server Generation

When asked to create a mock server:
```typescript
// mock-server.ts
import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: 1, name: 'User 1', email: 'user1@test.com' },
          { id: 2, name: 'User 2', email: 'user2@test.com' }
        ],
        meta: { total: 2, page: 1 }
      })
    );
  }),

  rest.post('/api/users', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(201),
      ctx.json({
        data: { id: Date.now(), ...body }
      })
    );
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === '999999') {
      return res(ctx.status(404), ctx.json({ error: 'Not found' }));
    }
    return res(
      ctx.status(200),
      ctx.json({ data: { id: Number(id), name: 'User', email: 'user@test.com' } })
    );
  })
];

export const server = setupServer(...handlers);
```

## Best Practices

1. **Environment Variables** - Use env vars for URLs, credentials
2. **Test Isolation** - Each test should be independent
3. **Data Cleanup** - Clean up created resources after tests
4. **Error Messages** - Validate error response structure
5. **Rate Limiting** - Add delays or handle 429 responses
6. **Timeouts** - Set appropriate timeouts for slow endpoints
