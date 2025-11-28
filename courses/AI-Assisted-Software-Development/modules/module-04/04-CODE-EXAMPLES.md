# Module 4: Code Examples
## AI for Documentation

---

## Overview

This document contains practical examples of AI-assisted documentation generation, including JSDoc, API documentation, README templates, and architecture documentation.

---

## Example 1: JSDoc Generation

### Original Code (Undocumented)

```typescript
// src/validation.ts
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password: string, options?: {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecial?: boolean;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const opts = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: false,
    ...options,
  };

  if (password.length < opts.minLength) {
    errors.push(`Password must be at least ${opts.minLength} characters`);
  }
  if (opts.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }
  if (opts.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter');
  }
  if (opts.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain a number');
  }
  if (opts.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain a special character');
  }

  return { valid: errors.length === 0, errors };
}

export function sanitizeInput(input: string, options?: {
  trimWhitespace?: boolean;
  removeHtml?: boolean;
  maxLength?: number;
}): string {
  let result = input;
  const opts = {
    trimWhitespace: true,
    removeHtml: true,
    maxLength: undefined,
    ...options,
  };

  if (opts.trimWhitespace) {
    result = result.trim();
  }
  if (opts.removeHtml) {
    result = result.replace(/<[^>]*>/g, '');
  }
  if (opts.maxLength && result.length > opts.maxLength) {
    result = result.substring(0, opts.maxLength);
  }

  return result;
}
```

### AI Prompt Used
```
Generate comprehensive JSDoc documentation for these TypeScript functions.
Include @param, @returns, @example, and @throws where applicable.
```

### AI-Generated Documentation

```typescript
// src/validation.ts

/**
 * Validation utilities for user input handling.
 * Provides email validation, password strength checking, and input sanitization.
 * @module validation
 */

/**
 * Validates an email address format using RFC 5322 simplified regex.
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} True if the email format is valid, false otherwise
 *
 * @example
 * // Valid email
 * validateEmail('user@example.com'); // true
 *
 * @example
 * // Invalid emails
 * validateEmail('invalid'); // false
 * validateEmail('no@domain'); // false
 * validateEmail('@nodomain.com'); // false
 *
 * @remarks
 * This validates format only, not whether the email actually exists.
 * For production use, consider email verification via confirmation link.
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Options for password validation rules.
 */
export interface PasswordValidationOptions {
  /**
   * Minimum password length
   * @default 8
   */
  minLength?: number;

  /**
   * Require at least one uppercase letter (A-Z)
   * @default true
   */
  requireUppercase?: boolean;

  /**
   * Require at least one lowercase letter (a-z)
   * @default true
   */
  requireLowercase?: boolean;

  /**
   * Require at least one numeric digit (0-9)
   * @default true
   */
  requireNumbers?: boolean;

  /**
   * Require at least one special character (!@#$%^&*(),.?":{}|<>)
   * @default false
   */
  requireSpecial?: boolean;
}

/**
 * Result of password validation.
 */
export interface PasswordValidationResult {
  /** Whether the password meets all requirements */
  valid: boolean;
  /** Array of validation error messages */
  errors: string[];
}

/**
 * Validates a password against configurable strength requirements.
 *
 * Checks the password against multiple criteria including length,
 * character type requirements (uppercase, lowercase, numbers, special chars).
 *
 * @param {string} password - The password to validate
 * @param {PasswordValidationOptions} [options] - Validation configuration
 * @returns {PasswordValidationResult} Object containing validation status and any errors
 *
 * @example
 * // Basic validation with defaults
 * validatePassword('MyPass123');
 * // Returns: { valid: true, errors: [] }
 *
 * @example
 * // Weak password
 * validatePassword('weak');
 * // Returns: {
 * //   valid: false,
 * //   errors: [
 * //     'Password must be at least 8 characters',
 * //     'Password must contain an uppercase letter',
 * //     'Password must contain a number'
 * //   ]
 * // }
 *
 * @example
 * // Custom requirements
 * validatePassword('MyPassword123!', {
 *   minLength: 12,
 *   requireSpecial: true
 * });
 * // Returns: { valid: true, errors: [] }
 *
 * @see {@link PasswordValidationOptions} for available configuration options
 */
export function validatePassword(
  password: string,
  options?: PasswordValidationOptions
): PasswordValidationResult {
  const errors: string[] = [];
  const opts = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: false,
    ...options,
  };

  if (password.length < opts.minLength) {
    errors.push(`Password must be at least ${opts.minLength} characters`);
  }
  if (opts.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }
  if (opts.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter');
  }
  if (opts.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain a number');
  }
  if (opts.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain a special character');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Options for input sanitization.
 */
export interface SanitizeOptions {
  /**
   * Remove leading and trailing whitespace
   * @default true
   */
  trimWhitespace?: boolean;

  /**
   * Strip HTML tags from the input
   * @default true
   */
  removeHtml?: boolean;

  /**
   * Maximum length to truncate input to (undefined = no limit)
   * @default undefined
   */
  maxLength?: number;
}

/**
 * Sanitizes user input by removing potentially dangerous content.
 *
 * Performs multiple sanitization steps including whitespace trimming,
 * HTML tag removal, and length limiting to prevent XSS and buffer overflow attacks.
 *
 * @param {string} input - The raw user input to sanitize
 * @param {SanitizeOptions} [options] - Sanitization configuration
 * @returns {string} The sanitized input string
 *
 * @example
 * // Basic sanitization
 * sanitizeInput('  <script>alert("xss")</script>Hello  ');
 * // Returns: 'Hello'
 *
 * @example
 * // With length limit
 * sanitizeInput('This is a very long string', { maxLength: 10 });
 * // Returns: 'This is a '
 *
 * @example
 * // Preserve HTML (not recommended for user input)
 * sanitizeInput('<b>Bold</b>', { removeHtml: false });
 * // Returns: '<b>Bold</b>'
 *
 * @security
 * This function provides basic XSS protection by removing HTML tags.
 * For production applications, consider using a dedicated sanitization
 * library like DOMPurify for more robust protection.
 *
 * @see {@link SanitizeOptions} for available configuration options
 */
export function sanitizeInput(
  input: string,
  options?: SanitizeOptions
): string {
  let result = input;
  const opts = {
    trimWhitespace: true,
    removeHtml: true,
    maxLength: undefined,
    ...options,
  };

  if (opts.trimWhitespace) {
    result = result.trim();
  }
  if (opts.removeHtml) {
    result = result.replace(/<[^>]*>/g, '');
  }
  if (opts.maxLength && result.length > opts.maxLength) {
    result = result.substring(0, opts.maxLength);
  }

  return result;
}
```

---

## Example 2: API Documentation (OpenAPI/Swagger)

### AI Prompt Used
```
Generate OpenAPI 3.0 documentation for a user authentication API
with endpoints for register, login, verify token, and refresh token.
Include request/response schemas, error responses, and examples.
```

### AI-Generated OpenAPI Spec

```yaml
# api-docs/auth-api.yaml
openapi: 3.0.3
info:
  title: User Authentication API
  description: |
    RESTful API for user authentication and session management.

    ## Authentication
    Most endpoints require a Bearer token in the Authorization header:
    ```
    Authorization: Bearer <token>
    ```

    ## Rate Limiting
    - Login: 5 requests per minute per IP
    - Registration: 3 requests per minute per IP
    - Other endpoints: 100 requests per minute per user

    ## Error Handling
    All errors follow the standard error response format with
    appropriate HTTP status codes.
  version: 1.0.0
  contact:
    name: API Support
    email: api-support@example.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server
  - url: http://localhost:3000/v1
    description: Development server

tags:
  - name: Authentication
    description: User authentication operations
  - name: Users
    description: User management operations

paths:
  /auth/register:
    post:
      summary: Register a new user
      description: |
        Creates a new user account with the provided credentials.
        A verification email will be sent to the provided email address.
      tags:
        - Authentication
      operationId: registerUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterRequest'
            example:
              email: user@example.com
              password: SecurePass123!
              name: John Doe
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RegisterResponse'
              example:
                success: true
                message: User created. Please verify your email.
                user:
                  id: usr_abc123
                  email: user@example.com
                  name: John Doe
                  verified: false
                  createdAt: '2024-01-15T10:30:00Z'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: User already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: Conflict
                message: A user with this email already exists
                code: USER_EXISTS
        '429':
          $ref: '#/components/responses/TooManyRequests'

  /auth/login:
    post:
      summary: Authenticate user
      description: |
        Authenticates a user with email and password.
        Returns access and refresh tokens on success.
      tags:
        - Authentication
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
            example:
              email: user@example.com
              password: SecurePass123!
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LoginResponse'
              example:
                accessToken: eyJhbGciOiJIUzI1NiIs...
                refreshToken: eyJhbGciOiJIUzI1NiIs...
                expiresIn: 3600
                tokenType: Bearer
                user:
                  id: usr_abc123
                  email: user@example.com
                  name: John Doe
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/TooManyRequests'

  /auth/verify:
    get:
      summary: Verify access token
      description: Validates the provided access token and returns user info
      tags:
        - Authentication
      operationId: verifyToken
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Token is valid
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenVerifyResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /auth/refresh:
    post:
      summary: Refresh access token
      description: |
        Exchange a valid refresh token for a new access token.
        The refresh token is rotated on each use for security.
      tags:
        - Authentication
      operationId: refreshToken
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RefreshRequest'
      responses:
        '200':
          description: Token refreshed successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RefreshResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /auth/logout:
    post:
      summary: Logout user
      description: Invalidates the current session and refresh token
      tags:
        - Authentication
      operationId: logoutUser
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Logout successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: Successfully logged out

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT token obtained from login endpoint

  schemas:
    RegisterRequest:
      type: object
      required:
        - email
        - password
        - name
      properties:
        email:
          type: string
          format: email
          description: User's email address
          example: user@example.com
        password:
          type: string
          format: password
          minLength: 8
          description: |
            Password must be at least 8 characters and contain:
            - At least one uppercase letter
            - At least one lowercase letter
            - At least one number
          example: SecurePass123!
        name:
          type: string
          minLength: 2
          maxLength: 100
          description: User's full name
          example: John Doe

    RegisterResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
        user:
          $ref: '#/components/schemas/User'

    LoginRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          format: password

    LoginResponse:
      type: object
      properties:
        accessToken:
          type: string
          description: JWT access token (expires in 1 hour)
        refreshToken:
          type: string
          description: JWT refresh token (expires in 7 days)
        expiresIn:
          type: integer
          description: Access token expiry time in seconds
        tokenType:
          type: string
          enum: [Bearer]
        user:
          $ref: '#/components/schemas/User'

    RefreshRequest:
      type: object
      required:
        - refreshToken
      properties:
        refreshToken:
          type: string
          description: Valid refresh token

    RefreshResponse:
      type: object
      properties:
        accessToken:
          type: string
        refreshToken:
          type: string
        expiresIn:
          type: integer

    TokenVerifyResponse:
      type: object
      properties:
        valid:
          type: boolean
        user:
          $ref: '#/components/schemas/User'
        expiresAt:
          type: string
          format: date-time

    User:
      type: object
      properties:
        id:
          type: string
          description: Unique user identifier
          example: usr_abc123
        email:
          type: string
          format: email
        name:
          type: string
        verified:
          type: boolean
          description: Whether email has been verified
        createdAt:
          type: string
          format: date-time

    Error:
      type: object
      properties:
        error:
          type: string
          description: Error type
        message:
          type: string
          description: Human-readable error message
        code:
          type: string
          description: Machine-readable error code
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
              message:
                type: string

  responses:
    BadRequest:
      description: Invalid request parameters
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: Bad Request
            message: Validation failed
            code: VALIDATION_ERROR
            details:
              - field: email
                message: Invalid email format
              - field: password
                message: Password too short

    Unauthorized:
      description: Authentication required or failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: Unauthorized
            message: Invalid or expired token
            code: INVALID_TOKEN

    TooManyRequests:
      description: Rate limit exceeded
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: Too Many Requests
            message: Rate limit exceeded. Try again in 60 seconds.
            code: RATE_LIMIT_EXCEEDED
      headers:
        Retry-After:
          schema:
            type: integer
          description: Seconds until rate limit resets
```

---

## Example 3: README Generation

### AI Prompt Used
```
Generate a professional README.md for a Node.js REST API project
that handles user authentication with JWT. Include sections for
installation, configuration, API endpoints, and deployment.
```

### AI-Generated README

```markdown
# Auth API

A secure, production-ready REST API for user authentication built with Node.js, Express, and TypeScript.

[![Build Status](https://img.shields.io/github/actions/workflow/status/org/auth-api/ci.yml)](https://github.com/org/auth-api/actions)
[![Coverage](https://img.shields.io/codecov/c/github/org/auth-api)](https://codecov.io/gh/org/auth-api)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

- **JWT Authentication** - Secure token-based authentication with refresh token rotation
- **Password Security** - bcrypt hashing with configurable work factor
- **Rate Limiting** - Protection against brute force attacks
- **Input Validation** - Request validation using Joi schemas
- **TypeScript** - Full type safety throughout the codebase
- **Testing** - Comprehensive test suite with 95%+ coverage
- **Docker Support** - Ready for containerized deployment

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- Redis 7.x (for rate limiting)

### Installation

```bash
# Clone the repository
git clone https://github.com/org/auth-api.git
cd auth-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/auth_db

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100
```

## API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Authenticate user |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Invalidate session |
| GET | `/api/v1/auth/verify` | Verify token |

### Register User

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "name": "John Doe"
  }'
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600
}
```

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Express middleware
├── models/           # Database models
├── routes/           # API routes
├── services/         # Business logic
├── utils/            # Utility functions
├── validators/       # Request validators
├── app.ts            # Express app setup
└── server.ts         # Server entry point
```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Deployment

### Docker

```bash
# Build image
docker build -t auth-api .

# Run container
docker run -p 3000:3000 --env-file .env auth-api
```

### Docker Compose

```bash
docker-compose up -d
```

## Security

- Passwords hashed with bcrypt (12 rounds default)
- JWT tokens with short expiry (1 hour)
- Refresh token rotation on use
- Rate limiting on authentication endpoints
- Input sanitization and validation
- CORS configuration
- Helmet.js security headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

---

## Example 4: Architecture Decision Record (ADR)

### AI Prompt Used
```
Generate an Architecture Decision Record (ADR) for choosing
PostgreSQL over MongoDB for a multi-tenant SaaS application.
```

### AI-Generated ADR

```markdown
# ADR-003: PostgreSQL for Primary Database

## Status
Accepted

## Date
2024-01-15

## Context

We need to select a primary database for our multi-tenant SaaS application that will handle:

- User data and authentication
- Tenant configuration and settings
- Business data with complex relationships
- Audit logs and activity tracking
- Reporting and analytics queries

The application is expected to scale to:
- 1,000+ tenants
- 100,000+ users
- 10M+ records in core tables
- Complex queries for reporting

### Requirements

1. **ACID Compliance** - Financial transactions require strong consistency
2. **Multi-tenancy** - Row-level security for tenant data isolation
3. **Complex Queries** - JOIN-heavy reporting requirements
4. **Schema Evolution** - Regular schema changes expected
5. **Team Expertise** - Team has 5 years SQL experience, limited NoSQL

### Options Considered

1. **PostgreSQL** - Relational database with advanced features
2. **MongoDB** - Document database with flexible schema
3. **MySQL** - Traditional relational database
4. **CockroachDB** - Distributed SQL database

## Decision

We will use **PostgreSQL 15** as our primary database.

## Rationale

### Why PostgreSQL

1. **Row-Level Security (RLS)**
   - Native support for multi-tenant data isolation
   - Policies applied automatically to all queries
   - Reduces risk of data leakage between tenants

   ```sql
   CREATE POLICY tenant_isolation ON orders
     USING (tenant_id = current_setting('app.tenant_id')::uuid);
   ```

2. **ACID Transactions**
   - Strong consistency for financial operations
   - Complex transactions spanning multiple tables
   - Reliable rollback on failures

3. **Advanced Query Capabilities**
   - Window functions for analytics
   - CTEs for complex reporting queries
   - Full-text search with ts_vector
   - JSONB for semi-structured data when needed

4. **Schema Management**
   - Mature migration tools (prisma, knex, flyway)
   - Transactional DDL for safe schema changes
   - Strong typing prevents data issues

5. **Performance**
   - Efficient indexing (B-tree, GIN, GiST)
   - Query planner optimization
   - Partitioning for large tables
   - Connection pooling with PgBouncer

6. **Ecosystem**
   - Extensive ORM support (Prisma, TypeORM, Sequelize)
   - Managed offerings (AWS RDS, Supabase, Neon)
   - Active community and long-term support

### Why Not MongoDB

- **Schema flexibility** not needed - our data model is well-defined
- **Transactions** across collections added complexity
- **JOINs** would require application-level data aggregation
- **Multi-tenancy** requires manual implementation
- **Learning curve** for team with SQL background

### Why Not MySQL

- **Row-Level Security** not native (requires views/triggers)
- **JSON support** less mature than PostgreSQL
- **Window functions** historically limited (improved in 8.0)

### Why Not CockroachDB

- **Operational complexity** for current scale
- **Cost** higher for managed service
- **Overkill** - don't need global distribution yet

## Consequences

### Positive

- Familiar technology for the team (SQL)
- Strong data integrity guarantees
- Built-in multi-tenancy support
- Excellent tooling and monitoring
- Easy to find PostgreSQL expertise

### Negative

- Vertical scaling limits (mitigated by read replicas)
- Schema changes require migrations
- Connection management overhead (mitigated by PgBouncer)

### Neutral

- Need to implement caching layer for performance
- Regular vacuum maintenance required
- Backup strategy needs planning

## Implementation Notes

### Multi-Tenancy Strategy

Using row-level security with tenant_id column:

```sql
-- All tenant tables include tenant_id
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  -- other columns
);

-- Set tenant context per request
SET app.tenant_id = 'tenant-uuid';

-- RLS policy automatically filters
SELECT * FROM orders; -- Only returns current tenant's orders
```

### Connection Pooling

Using PgBouncer in transaction mode:
- Pool size: 20 connections per node
- Max client connections: 1000
- Statement timeout: 30 seconds

### Backup Strategy

- Continuous WAL archiving to S3
- Daily full backups
- Point-in-time recovery capability
- 30-day retention

## Related Decisions

- ADR-001: Multi-tenant Architecture Pattern
- ADR-002: Caching Strategy with Redis
- ADR-004: Database Migration Tooling

## References

- [PostgreSQL Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Multi-tenant SaaS Patterns](https://docs.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/tenancy-models)
- [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
```

---

## Example 5: Inline Code Comments

### AI Prompt Used
```
Add explanatory inline comments to this complex algorithm that
implements a Least Recently Used (LRU) cache.
```

### AI-Commented Code

```typescript
/**
 * LRU (Least Recently Used) Cache implementation using a doubly linked list
 * and hash map for O(1) get and put operations.
 *
 * The cache evicts the least recently used item when capacity is exceeded.
 *
 * @example
 * const cache = new LRUCache<string, number>(3);
 * cache.put('a', 1);
 * cache.put('b', 2);
 * cache.put('c', 3);
 * cache.get('a');     // Returns 1, 'a' becomes most recent
 * cache.put('d', 4);  // Evicts 'b' (least recently used)
 */
class LRUCache<K, V> {
  // Maximum number of items the cache can hold
  private capacity: number;

  // Hash map for O(1) key lookup - maps keys to their node in the linked list
  private cache: Map<K, DoublyLinkedNode<K, V>>;

  // Sentinel nodes that mark the boundaries of the doubly linked list
  // Using sentinels eliminates null checks and edge cases
  private head: DoublyLinkedNode<K, V>;  // Most recently used items are near head
  private tail: DoublyLinkedNode<K, V>;  // Least recently used items are near tail

  constructor(capacity: number) {
    // Validate capacity to prevent runtime errors
    if (capacity <= 0) {
      throw new Error('Capacity must be positive');
    }

    this.capacity = capacity;
    this.cache = new Map();

    // Initialize sentinel nodes with dummy values
    // These nodes are never removed and simplify insertion/deletion logic
    this.head = new DoublyLinkedNode<K, V>(null as K, null as V);
    this.tail = new DoublyLinkedNode<K, V>(null as K, null as V);

    // Connect sentinels to form an empty list: head <-> tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Retrieves a value from the cache.
   * Time complexity: O(1)
   *
   * @param key - The key to look up
   * @returns The value if found, undefined otherwise
   */
  get(key: K): V | undefined {
    const node = this.cache.get(key);

    // Key not in cache - cache miss
    if (!node) {
      return undefined;
    }

    // Key found - cache hit
    // Move to front to mark as most recently used
    // This maintains the LRU ordering property
    this.moveToFront(node);

    return node.value;
  }

  /**
   * Adds or updates a key-value pair in the cache.
   * Time complexity: O(1)
   *
   * If the key exists, updates the value and marks it as recently used.
   * If the key is new and cache is full, evicts the least recently used item.
   *
   * @param key - The key to store
   * @param value - The value to associate with the key
   */
  put(key: K, value: V): void {
    const existingNode = this.cache.get(key);

    if (existingNode) {
      // Update existing entry
      // Update the value and move to front (most recently used)
      existingNode.value = value;
      this.moveToFront(existingNode);
    } else {
      // Insert new entry
      // Check if we need to evict before adding
      if (this.cache.size >= this.capacity) {
        // Cache is full - evict the least recently used item
        // The LRU item is always right before the tail sentinel
        this.evictLRU();
      }

      // Create new node and add to front (most recently used position)
      const newNode = new DoublyLinkedNode(key, value);
      this.cache.set(key, newNode);
      this.addToFront(newNode);
    }
  }

  /**
   * Moves an existing node to the front of the list.
   * This operation marks the item as "most recently used".
   *
   * Steps:
   * 1. Remove from current position (relink neighbors)
   * 2. Add to front (right after head sentinel)
   */
  private moveToFront(node: DoublyLinkedNode<K, V>): void {
    // First, remove the node from its current position
    this.removeNode(node);
    // Then, add it to the front
    this.addToFront(node);
  }

  /**
   * Removes a node from the doubly linked list.
   * Does not remove from hash map - caller is responsible if needed.
   *
   * Before: ... <-> prevNode <-> node <-> nextNode <-> ...
   * After:  ... <-> prevNode <-> nextNode <-> ...
   */
  private removeNode(node: DoublyLinkedNode<K, V>): void {
    // Get references to neighboring nodes
    const prevNode = node.prev!;
    const nextNode = node.next!;

    // Bypass the current node by linking neighbors directly
    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    // Clear node's links (helps garbage collection, prevents accidental use)
    node.prev = null;
    node.next = null;
  }

  /**
   * Adds a node right after the head sentinel.
   * This makes the item the "most recently used".
   *
   * Before: head <-> firstNode <-> ...
   * After:  head <-> newNode <-> firstNode <-> ...
   */
  private addToFront(node: DoublyLinkedNode<K, V>): void {
    // Get reference to the current first real node
    const firstNode = this.head.next!;

    // Insert new node between head and first node
    node.prev = this.head;
    node.next = firstNode;

    // Update neighboring nodes to point to new node
    this.head.next = node;
    firstNode.prev = node;
  }

  /**
   * Evicts the least recently used item from the cache.
   * The LRU item is always right before the tail sentinel.
   *
   * Before: ... <-> lruNode <-> tail
   * After:  ... <-> tail
   */
  private evictLRU(): void {
    // The LRU node is right before the tail sentinel
    const lruNode = this.tail.prev!;

    // Safety check - don't try to remove the head sentinel
    if (lruNode === this.head) {
      return; // Cache is empty, nothing to evict
    }

    // Remove from linked list
    this.removeNode(lruNode);

    // Remove from hash map (important for cache.size accuracy)
    this.cache.delete(lruNode.key);
  }

  /**
   * Returns the current number of items in the cache.
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Clears all items from the cache.
   */
  clear(): void {
    this.cache.clear();
    // Reset linked list to empty state
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
}

/**
 * Node for doubly linked list used in LRU cache.
 * Each node stores a key-value pair and links to adjacent nodes.
 */
class DoublyLinkedNode<K, V> {
  key: K;
  value: V;
  prev: DoublyLinkedNode<K, V> | null = null;
  next: DoublyLinkedNode<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}
```

---

## Quick Reference

### Documentation Types and When to Use

| Type | Purpose | AI Prompt Tips |
|------|---------|----------------|
| JSDoc | Function/class documentation | Include parameter types, return values, examples |
| README | Project overview | Specify sections, target audience, technical level |
| API Docs | Endpoint reference | Include request/response formats, error codes |
| ADR | Decision documentation | State context, options considered, consequences |
| Inline Comments | Code explanation | Focus on "why" not "what", explain complex logic |

### AI Documentation Prompt Template

```
Generate [documentation type] for [code/project description].

Include:
- [List specific sections needed]
- [Examples or use cases]
- [Error handling information]
- [Security considerations if applicable]

Format: [Markdown/YAML/JSDoc/etc.]
Target audience: [developers/end-users/ops team]
Technical level: [beginner/intermediate/advanced]
```

---

*Module 4 Code Examples - AI for Documentation*
*AI-Assisted Software Development Course*
