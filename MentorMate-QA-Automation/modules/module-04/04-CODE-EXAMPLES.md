# Module 04: Code Examples
## AI-Powered Documentation Generation

---

## Overview

This file contains practical examples, templates, and prompts for generating various types of documentation. Use these as references and starting points for your own documentation projects.

---

## Table of Contents

1. [Documentation Prompts](#documentation-prompts)
2. [Architecture Documentation Examples](#architecture-documentation-examples)
3. [API Reference Examples](#api-reference-examples)
4. [Setup Guide Examples](#setup-guide-examples)
5. [Test Documentation Examples](#test-documentation-examples)
6. [Mermaid Diagram Examples](#mermaid-diagram-examples)
7. [OpenAPI Specification Examples](#openapi-specification-examples)
8. [Review and Improvement Workflows](#review-and-improvement-workflows)

---

## Documentation Prompts

### 1. Architecture Documentation Prompt Template

```
Generate comprehensive architecture documentation for [PROJECT NAME].

Project Context:
- [Brief description]
- [Technology stack]
- [Key features]

Code to analyze:
[Paste relevant code files]

Create ARCHITECTURE.md with:

## 1. System Overview
- Purpose and business goals
- Key features
- Target users
- High-level description

## 2. Architecture Diagram
- Use Mermaid syntax (graph TB or flowchart)
- Show all major components
- Show data flow
- Include external services/integrations

## 3. Component Details
For each component:
- Purpose and responsibilities
- Technologies used
- Key files and directories
- Dependencies (internal and external)
- API surface (if applicable)

## 4. Data Models
- Main entities with field details
- Relationships between entities
- Mermaid ERD diagram
- Database schema notes

## 5. Data Flow
Describe the flow for key operations:
- [Operation 1]
- [Operation 2]
- [Operation 3]

## 6. Security Architecture
- Authentication method
- Authorization model
- Data protection measures
- Security best practices

## 7. Deployment Architecture (if applicable)
- Infrastructure overview
- Environments (dev, staging, prod)
- CI/CD pipeline
- Scaling considerations

## 8. External Dependencies
- Third-party services
- APIs integrated
- Required environment variables

Format as professional technical documentation with proper Markdown formatting and Mermaid diagrams.
```

---

### 2. API Reference Documentation Prompt Template

```
Generate comprehensive API reference documentation.

[Paste relevant service/controller code]

For each endpoint, document:

## [METHOD] [Path]

**Description:** Clear description of what this endpoint does

**Authentication:** Required (specify type) / Optional / None

**Request:**

Headers:
- Header1: Description
- Header2: Description

Path Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|

Query Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|

Body Schema:
```json
{
  "field1": "type (required/optional) - description",
  "field2": "type (required/optional) - description"
}
```

**Response:**

Success (200/201):
```json
{
  "example": "response"
}
```

Errors:
- 400: Bad Request - [when]
- 401: Unauthorized - [when]
- 403: Forbidden - [when]
- 404: Not Found - [when]
- 409: Conflict - [when]
- 500: Internal Server Error - [when]

**Example:**
```bash
curl -X METHOD http://localhost:PORT/endpoint \
  -H "Header: value" \
  -d '{"key": "value"}'
```

**Notes:**
- Rate limiting information
- Pagination details (for list endpoints)
- Special behaviors
- Caching considerations

Generate for these endpoints:
- [List all endpoints]

Make examples copy-paste ready with realistic data.
```

---

### 3. Setup Guide Prompt Template

```
Create a comprehensive setup guide for [PROJECT NAME].

Technology stack:
- [Language and version]
- [Framework and version]
- [Database and version]
- [Other key technologies]

Generate SETUP.md with:

## Prerequisites
- Required software with specific versions
- Accounts needed (list services)
- Hardware/OS requirements

## Quick Start (5-10 minutes)
- Fastest path to running the application
- Use Docker Compose if available
- Single command if possible

## Development Setup

Step-by-step instructions with exact commands:

### 1. Clone Repository
```bash
[command]
```

### 2. Install Dependencies
```bash
[command]
```

### 3. Configure Environment
```bash
[commands to create .env]
```
[Explain what values to add]

### 4. Set Up Database
```bash
[database creation commands]
[migration commands]
[seeding commands (optional)]
```

### 5. [Additional Setup Steps]
[Any other required setup]

### 6. Start Development Server
```bash
[command to start]
```

### 7. Verify It Works
[How to check everything is working]
[Health check URLs]
[Test commands]

## Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| VAR1 | Description | example-value | Yes/No |

## Common Tasks

### Development
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
```

### Testing
```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
```

### Database
```bash
npm run migrate     # Run migrations
npm run seed        # Seed database
```

## Troubleshooting

### [Common Issue 1]
**Symptoms:** [How it appears]
**Solution:**
```bash
[Commands to fix]
```

### [Common Issue 2]
**Symptoms:** [How it appears]
**Solution:**
```bash
[Commands to fix]
```

[Continue for 5-8 common issues]

Make all commands copy-paste friendly and test them.
```

---

### 4. Test Documentation Prompt Template

```
Generate test documentation for [PROJECT NAME].

Create TEST-DOCUMENTATION.md with:

## Test Strategy
- Testing philosophy
- Test pyramid approach (% unit, integration, e2e)
- Coverage goals (overall and by component)
- Quality gates

## Test Structure
```
tests/
├── unit/
├── integration/
└── e2e/
```
[Describe organization]

## Running Tests

### All Tests
```bash
[command]
```

### By Type
```bash
[unit test command]
[integration test command]
[e2e test command]
```

### With Coverage
```bash
[coverage command]
```

### Watch Mode
```bash
[watch mode command]
```

## Writing Tests

### Test Patterns
[Describe patterns used: AAA, BDD, etc.]

### Unit Test Example
```javascript
[Example unit test]
```

### Integration Test Example
```javascript
[Example integration test]
```

### E2E Test Example
```javascript
[Example e2e test]
```

### Testing Utilities
- Available helpers
- Mock/stub patterns
- Test data factories
- Fixtures

## Test Coverage Goals
- Overall: [X]%
- [Component 1]: [X]%
- [Component 2]: [X]%
- Critical paths: [X]%

## CI Integration
- When tests run (on PR, on commit, etc.)
- Required checks
- Coverage thresholds
- Failure notifications

## Best Practices

**DO:**
- [Practice 1]
- [Practice 2]
- [Practice 3]

**DON'T:**
- [Anti-pattern 1]
- [Anti-pattern 2]
- [Anti-pattern 3]

## Troubleshooting Tests
Common test issues and solutions
```

---

### 5. README.md Prompt Template

```
Create a professional README.md for [PROJECT NAME].

Include:

# [Project Name]

[Brief description - 2-3 sentences]

[Optional: Badges for build status, coverage, version, etc.]

## Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Tech Stack
- [Technology 1]
- [Technology 2]
- [Technology 3]

## Quick Start

```bash
# Quick commands to get started
git clone [repo]
cd [project]
docker-compose up
```

## Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Reference](./API-REFERENCE.md)
- [Setup Guide](./SETUP.md)
- [Test Documentation](./TEST-DOCUMENTATION.md)

## Installation

Brief installation steps (link to SETUP.md for details)

## Usage

Basic usage examples

## API Endpoints

Quick reference of main endpoints (link to API-REFERENCE.md for details)

## Testing

```bash
npm test
```

## Contributing

How to contribute (or link to CONTRIBUTING.md)

## License

[License type]

## Contact

- [Contact information]
- [Support channels]

Format professionally with clear sections and working links.
```

---

## Architecture Documentation Examples

### Example 1: E-commerce Microservices Architecture

```markdown
# E-commerce Platform Architecture

## System Overview

The E-commerce Platform is a cloud-native microservices application designed to handle high-volume online retail operations. It supports product catalog management, user authentication, shopping cart functionality, order processing, and payment integration.

**Key Features:**
- Product catalog with search and filtering
- User authentication and authorization
- Shopping cart and wishlist
- Order management and tracking
- Payment processing (Stripe integration)
- Real-time inventory management
- Email notifications

**Target Users:**
- End customers (web and mobile)
- Store administrators
- Customer support staff
- System administrators

## Architecture Diagram

```mermaid
graph TB
    Web[Web Client] --> Gateway[API Gateway]
    Mobile[Mobile App] --> Gateway
    Admin[Admin Panel] --> Gateway

    Gateway --> Auth[Auth Service]
    Gateway --> Product[Product Service]
    Gateway --> Cart[Cart Service]
    Gateway --> Order[Order Service]
    Gateway --> Payment[Payment Service]

    Auth --> UserDB[(User Database)]
    Product --> ProductDB[(Product Database)]
    Product --> Search[Elasticsearch]
    Cart --> Redis[(Redis Cache)]
    Order --> OrderDB[(Order Database)]
    Order --> Queue[Message Queue]
    Payment --> Stripe[Stripe API]

    Queue --> Email[Email Service]
    Queue --> Inventory[Inventory Service]
    Email --> SendGrid[SendGrid]
    Inventory --> ProductDB
```

## Component Details

### API Gateway
**Purpose:** Single entry point for all client requests, handles routing, authentication, rate limiting.

**Technologies:**
- Node.js 18
- Express.js 4.18
- express-rate-limit
- helmet (security)

**Key Files:**
- `src/gateway/index.js` - Main gateway
- `src/gateway/routes/` - Route definitions
- `src/gateway/middleware/auth.js` - Authentication

**Dependencies:**
- Auth Service (token validation)
- All microservices (routing)

### Auth Service
**Purpose:** User authentication, registration, JWT token management.

**Technologies:**
- Node.js 18
- bcrypt (password hashing)
- jsonwebtoken (JWT)
- PostgreSQL 14

**Responsibilities:**
- User registration and login
- Password reset
- Token generation and validation
- Role-based access control

**API:**
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/reset-password

### Product Service
**Purpose:** Manage product catalog, search, and filtering.

**Technologies:**
- Node.js 18
- PostgreSQL 14 (product data)
- Elasticsearch 7 (search)
- Redis (caching)

**Responsibilities:**
- CRUD operations on products
- Product search and filtering
- Category management
- Inventory tracking

### Cart Service
**Purpose:** Shopping cart and wishlist management.

**Technologies:**
- Node.js 18
- Redis 6 (session storage)

**Responsibilities:**
- Add/remove items from cart
- Cart persistence across sessions
- Price calculation
- Promo code validation

### Order Service
**Purpose:** Order creation, management, and tracking.

**Technologies:**
- Node.js 18
- PostgreSQL 14
- RabbitMQ (message queue)

**Responsibilities:**
- Create orders from cart
- Order status tracking
- Order history
- Emit events for inventory and email

### Payment Service
**Purpose:** Handle payment processing securely.

**Technologies:**
- Node.js 18
- Stripe API
- PostgreSQL 14 (transaction records)

**Responsibilities:**
- Process payments via Stripe
- Handle refunds
- Store transaction records
- Webhook handling from Stripe

## Data Models

### User Entity
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| name | VARCHAR(255) | NOT NULL | Full name |
| role | ENUM | NOT NULL | admin, customer, support |
| verified | BOOLEAN | DEFAULT false | Email verification status |
| createdAt | TIMESTAMP | NOT NULL | Account creation time |
| updatedAt | TIMESTAMP | NOT NULL | Last update time |

**Indexes:**
- Unique index on email
- Index on createdAt

### Product Entity
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique product identifier |
| name | VARCHAR(255) | NOT NULL | Product name |
| description | TEXT | NULL | Detailed description |
| price | DECIMAL(10,2) | NOT NULL | Price in USD |
| stock | INTEGER | NOT NULL | Available quantity |
| category | VARCHAR(100) | NOT NULL | Product category |
| imageUrl | VARCHAR(500) | NULL | Product image URL |
| createdAt | TIMESTAMP | NOT NULL | Creation time |
| updatedAt | TIMESTAMP | NOT NULL | Last update time |

**Indexes:**
- Index on category
- Full-text index on name, description (Elasticsearch)

### Order Entity
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique order identifier |
| userId | UUID | FOREIGN KEY | User who placed order |
| status | ENUM | NOT NULL | pending, paid, shipped, delivered |
| total | DECIMAL(10,2) | NOT NULL | Total order amount |
| shippingAddress | JSONB | NOT NULL | Shipping address object |
| paymentId | VARCHAR(255) | NULL | Stripe payment ID |
| createdAt | TIMESTAMP | NOT NULL | Order creation time |
| updatedAt | TIMESTAMP | NOT NULL | Last status update |

### OrderItem Entity
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique order item identifier |
| orderId | UUID | FOREIGN KEY | Associated order |
| productId | UUID | FOREIGN KEY | Product ordered |
| quantity | INTEGER | NOT NULL | Quantity ordered |
| price | DECIMAL(10,2) | NOT NULL | Price at time of order |

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"

    USER {
        uuid id PK
        string email UK
        string password
        string name
        enum role
        boolean verified
    }

    PRODUCT {
        uuid id PK
        string name
        text description
        decimal price
        int stock
        string category
    }

    ORDER {
        uuid id PK
        uuid userId FK
        enum status
        decimal total
        jsonb shippingAddress
        string paymentId
    }

    ORDER_ITEM {
        uuid id PK
        uuid orderId FK
        uuid productId FK
        int quantity
        decimal price
    }
```

## Data Flow

### User Registration and Login Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant G as API Gateway
    participant A as Auth Service
    participant DB as User Database
    participant E as Email Service

    C->>G: POST /auth/register
    G->>A: Forward registration request
    A->>DB: Check if email exists
    alt Email exists
        DB-->>A: User found
        A-->>G: 409 Conflict
        G-->>C: Email already registered
    else Email available
        DB-->>A: No user found
        A->>A: Hash password with bcrypt
        A->>DB: Create user record
        DB-->>A: User created
        A->>A: Generate JWT token
        A->>E: Send verification email
        A-->>G: Return user + token
        G-->>C: 201 Created
    end
```

### Order Placement Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant O as Order Service
    participant P as Payment Service
    participant Q as Message Queue
    participant I as Inventory Service
    participant E as Email Service

    C->>O: POST /orders (cart items)
    O->>O: Validate cart items
    O->>P: Process payment
    P->>P: Call Stripe API
    P-->>O: Payment successful
    O->>O: Create order record
    O->>Q: Publish order_created event
    O-->>C: 201 Order created

    Q->>I: Consume order_created
    I->>I: Decrease inventory

    Q->>E: Consume order_created
    E->>E: Send confirmation email
```

## Security Architecture

### Authentication
- **Method:** JWT (JSON Web Tokens)
- **Token Lifetime:** 24 hours (access token), 30 days (refresh token)
- **Storage:** HTTP-only cookies for web, secure storage for mobile
- **Validation:** Every request via API Gateway middleware

### Authorization
- **Model:** Role-Based Access Control (RBAC)
- **Roles:** admin, customer, support
- **Enforcement:** Route-level and resource-level checks

### Password Security
- **Hashing:** bcrypt with 10 salt rounds
- **Reset:** Time-limited tokens (1 hour expiration)
- **Complexity:** Minimum 8 characters required

### Data Protection
- **In Transit:** TLS 1.3 for all communications
- **At Rest:** Database encryption (PostgreSQL native encryption)
- **PII:** User data encrypted, masked in logs

### API Security
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **CORS:** Configured for specific origins
- **Headers:** helmet.js security headers
- **Input Validation:** Joi schemas for all inputs

## Deployment Architecture

### Infrastructure
- **Cloud Provider:** AWS
- **Compute:** ECS (Elastic Container Service) with Fargate
- **Database:** RDS PostgreSQL (Multi-AZ)
- **Cache:** ElastiCache Redis
- **Search:** AWS Elasticsearch Service
- **Queue:** Amazon MQ (RabbitMQ)

### Environments
- **Development:** Local Docker Compose
- **Staging:** AWS ECS (single region)
- **Production:** AWS ECS (multi-region, auto-scaling)

### CI/CD Pipeline
1. Code push to GitHub
2. GitHub Actions runs tests and linting
3. Build Docker images
4. Push to Amazon ECR
5. Deploy to staging (automatic)
6. Manual approval
7. Deploy to production (blue-green deployment)

## External Dependencies

### Third-Party Services
- **Stripe:** Payment processing
- **SendGrid:** Email delivery
- **AWS S3:** Image storage
- **Cloudflare:** CDN and DDoS protection

### npm Packages
- express: Web framework
- bcrypt: Password hashing
- jsonwebtoken: JWT generation
- pg: PostgreSQL client
- ioredis: Redis client
- amqplib: RabbitMQ client
- stripe: Stripe SDK
- @sendgrid/mail: SendGrid SDK
- elasticsearch: ES client

### Required Environment Variables
- DATABASE_URL
- REDIS_URL
- RABBITMQ_URL
- JWT_SECRET
- STRIPE_SECRET_KEY
- SENDGRID_API_KEY
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET_NAME

---

*Generated: November 2025*
*Version: 1.0*
```

---

## API Reference Examples

### Example 1: Complete Endpoint Documentation

```markdown
# API Reference

## Base URL
```
Development: http://localhost:3000/api
Staging: https://staging-api.example.com/api
Production: https://api.example.com/api
```

## Authentication

Most endpoints require authentication via JWT bearer token.

**Header Format:**
```
Authorization: Bearer <your-jwt-token>
```

**Obtaining a Token:**
Use the `/auth/login` endpoint (see below).

---

## User Endpoints

### POST /auth/register

**Description:** Register a new user account. Creates user record, hashes password with bcrypt, and sends verification email.

**Authentication:** None (public endpoint)

**Request:**

Headers:
```
Content-Type: application/json
```

Body Schema:
```json
{
  "email": "string (required, valid email format)",
  "password": "string (required, min 8 characters)",
  "name": "string (required, 2-100 characters)"
}
```

**Response:**

Success (201 Created):
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "verified": false,
    "createdAt": "2025-11-24T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Errors:
- **400 Bad Request:** Invalid input (missing fields, invalid email, weak password)
  ```json
  {
    "error": "Validation failed",
    "details": [
      { "field": "password", "message": "Password must be at least 8 characters" }
    ]
  }
  ```
- **409 Conflict:** Email already registered
  ```json
  {
    "error": "Email already registered"
  }
  ```
- **500 Internal Server Error:** Server-side error
  ```json
  {
    "error": "Internal server error"
  }
  ```

**Example:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "name": "John Doe"
  }'
```

**Notes:**
- Password is hashed using bcrypt (10 rounds) before storage
- Verification email is sent to the provided email address
- User account starts as unverified (`verified: false`)
- JWT token is returned immediately but some features may require email verification
- Rate limited to 5 registration attempts per hour per IP address

---

### POST /auth/login

**Description:** Authenticate user and return JWT access token.

**Authentication:** None (public endpoint)

**Request:**

Headers:
```
Content-Type: application/json
```

Body Schema:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response:**

Success (200 OK):
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "verified": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h"
}
```

Errors:
- **400 Bad Request:** Missing email or password
- **401 Unauthorized:** Invalid credentials or email not verified
  ```json
  {
    "error": "Invalid email or password"
  }
  ```
  or
  ```json
  {
    "error": "Email not verified. Please check your inbox."
  }
  ```
- **429 Too Many Requests:** Rate limit exceeded
  ```json
  {
    "error": "Too many login attempts. Please try again later.",
    "retryAfter": 900
  }
  ```

**Example:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

**Notes:**
- Token expires after 24 hours
- Failed login attempts are logged for security monitoring
- After 5 failed attempts, account is temporarily locked (15 minutes)
- Rate limited to 10 attempts per 15 minutes per IP

---

### GET /api/users/me

**Description:** Get current user profile information.

**Authentication:** Required (Bearer token)

**Request:**

Headers:
```
Authorization: Bearer <token>
```

**Response:**

Success (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "verified": true,
  "role": "customer",
  "createdAt": "2025-11-20T10:30:00Z",
  "updatedAt": "2025-11-24T08:15:00Z"
}
```

Errors:
- **401 Unauthorized:** Missing or invalid token
  ```json
  {
    "error": "Unauthorized. Please provide a valid token."
  }
  ```
- **404 Not Found:** User not found (token valid but user deleted)
  ```json
  {
    "error": "User not found"
  }
  ```

**Example:**

```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Notes:**
- Password field is never returned in response
- Cached for 5 minutes to improve performance

---

## Product Endpoints

### GET /api/products

**Description:** Get paginated list of products with optional filtering and search.

**Authentication:** Optional (public endpoint, some features require auth)

**Request:**

Headers:
```
Authorization: Bearer <token> (optional)
```

Query Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |
| category | string | No | Filter by category |
| minPrice | number | No | Minimum price filter |
| maxPrice | number | No | Maximum price filter |
| search | string | No | Search in name and description |
| sort | string | No | Sort field: `price`, `name`, `createdAt` (prefix with `-` for descending) |

**Response:**

Success (200 OK):
```json
{
  "products": [
    {
      "id": "prod-001",
      "name": "Wireless Headphones",
      "description": "High-quality bluetooth headphones",
      "price": 79.99,
      "stock": 45,
      "category": "Electronics",
      "imageUrl": "https://example.com/images/headphones.jpg",
      "createdAt": "2025-11-20T10:30:00Z"
    },
    {
      "id": "prod-002",
      "name": "Smart Watch",
      "description": "Fitness tracking smartwatch",
      "price": 199.99,
      "stock": 23,
      "category": "Electronics",
      "imageUrl": "https://example.com/images/watch.jpg",
      "createdAt": "2025-11-19T14:20:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "pages": 8
  }
}
```

Errors:
- **400 Bad Request:** Invalid query parameters
  ```json
  {
    "error": "Invalid pagination parameters",
    "details": "limit must be between 1 and 100"
  }
  ```

**Example:**

```bash
# Get all products (first page)
curl -X GET http://localhost:3000/api/products

# Get electronics, sorted by price (low to high)
curl -X GET "http://localhost:3000/api/products?category=Electronics&sort=price"

# Search for "headphones" under $100
curl -X GET "http://localhost:3000/api/products?search=headphones&maxPrice=100"

# Get page 2 with 50 items per page
curl -X GET "http://localhost:3000/api/products?page=2&limit=50"
```

**Notes:**
- Results are cached for 5 minutes
- Full-text search uses Elasticsearch for fast results
- Authenticated users see personalized pricing (if applicable)
- Rate limited to 100 requests per minute per IP

---

### POST /api/products

**Description:** Create a new product (admin only).

**Authentication:** Required (Bearer token, admin role)

**Request:**

Headers:
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

Body Schema:
```json
{
  "name": "string (required, 3-255 characters)",
  "description": "string (optional, max 5000 characters)",
  "price": "number (required, positive)",
  "stock": "integer (required, non-negative)",
  "category": "string (required)",
  "imageUrl": "string (optional, valid URL)"
}
```

**Response:**

Success (201 Created):
```json
{
  "id": "prod-123",
  "name": "New Product",
  "description": "Product description",
  "price": 29.99,
  "stock": 100,
  "category": "Books",
  "imageUrl": null,
  "createdAt": "2025-11-24T12:00:00Z",
  "updatedAt": "2025-11-24T12:00:00Z"
}
```

Errors:
- **400 Bad Request:** Validation error
- **401 Unauthorized:** Missing or invalid token
- **403 Forbidden:** User is not admin
  ```json
  {
    "error": "Forbidden. Admin access required."
  }
  ```

**Example:**

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Programming Book",
    "description": "Learn advanced programming concepts",
    "price": 49.99,
    "stock": 200,
    "category": "Books"
  }'
```

**Notes:**
- Only users with `admin` role can create products
- Product is immediately searchable after creation
- Image upload handled separately via `/api/products/:id/image` endpoint

---
```

---

## Setup Guide Examples

### Example 1: Node.js + PostgreSQL Setup Guide

```markdown
# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** 18.x or higher ([Download](https://nodejs.org/))
  ```bash
  node --version  # Should show v18.x or higher
  ```

- **PostgreSQL:** 14.x or higher ([Download](https://www.postgresql.org/download/))
  ```bash
  psql --version  # Should show 14.x or higher
  ```

- **npm or yarn:** Comes with Node.js
  ```bash
  npm --version
  ```

- **Git:** Latest version
  ```bash
  git --version
  ```

**Optional:**
- **Redis:** 6.x or higher (for caching) - [Download](https://redis.io/download)
- **Docker & Docker Compose:** For containerized setup

**Accounts Needed:**
- SendGrid account (for email functionality) - [Sign up](https://sendgrid.com/)

**Operating System:**
- macOS, Linux, or Windows (with WSL recommended)

---

## Quick Start (Docker)

If you have Docker installed, this is the fastest way to get started:

```bash
# Clone repository
git clone https://github.com/yourcompany/project.git
cd project

# Start all services with Docker Compose
docker-compose up

# Application will be available at http://localhost:3000
```

That's it! Skip to [Verify Setup](#verify-setup) to confirm everything works.

---

## Development Setup (Manual)

### 1. Clone Repository

```bash
git clone https://github.com/yourcompany/project.git
cd project
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Configure Environment Variables

```bash
# Copy example environment file
cp .env.example .env
```

Now edit `.env` and add your configuration:

```bash
# Open in your favorite editor
nano .env  # or vim, code, etc.
```

Required variables (see [Environment Variables](#environment-variables) section for details):
```
DATABASE_URL=postgresql://localhost:5432/myapp_dev
JWT_SECRET=your-secret-key-here
SENDGRID_API_KEY=SG.your-sendgrid-key
PORT=3000
NODE_ENV=development
```

### 4. Set Up Database

**Create Database:**
```bash
# Using psql
createdb myapp_dev

# Or connect to PostgreSQL and run:
psql
CREATE DATABASE myapp_dev;
\q
```

**Run Migrations:**
```bash
npm run migrate
```

This creates all necessary tables and schema.

**Seed Database (Optional):**
```bash
npm run seed
```

This adds sample data for development.

### 5. Set Up Redis (Optional)

If using caching features:

```bash
# macOS (with Homebrew)
brew install redis
brew services start redis

# Linux (Ubuntu/Debian)
sudo apt-get install redis-server
sudo systemctl start redis

# Verify Redis is running
redis-cli ping  # Should return "PONG"
```

If you skip Redis, the app will work but without caching.

### 6. Start Development Server

```bash
npm run dev
```

You should see:
```
Server running on http://localhost:3000
Database connected
✓ Ready
```

### 7. Verify Setup

**Check Health Endpoint:**
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected",
  "timestamp": "2025-11-24T12:00:00Z"
}
```

**Open in Browser:**
Navigate to http://localhost:3000 - you should see the application homepage.

**Run Tests:**
```bash
npm test
```

All tests should pass (green).

---

## Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| DATABASE_URL | PostgreSQL connection string | `postgresql://user:password@localhost:5432/myapp_dev` | Yes |
| JWT_SECRET | Secret key for signing JWT tokens | `your-super-secret-key-12345` | Yes |
| SENDGRID_API_KEY | SendGrid API key for sending emails | `SG.xxxxxxxxx` | Yes |
| PORT | Server port | `3000` | No (default: 3000) |
| NODE_ENV | Environment mode | `development`, `production`, `test` | No (default: development) |
| REDIS_URL | Redis connection string | `redis://localhost:6379` | No (caching disabled if omitted) |
| LOG_LEVEL | Logging verbosity | `debug`, `info`, `warn`, `error` | No (default: info) |

**Security Notes:**
- Never commit `.env` file to Git
- Use strong, random JWT_SECRET in production
- Rotate secrets regularly

---

## Common Tasks

### Development

```bash
# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- path/to/test.js

# Run with coverage report
npm run test:coverage

# View coverage report in browser
open coverage/lcov-report/index.html
```

### Database

```bash
# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Seed database with sample data
npm run seed

# Reset database (drops all tables and re-migrates)
npm run db:reset

# Open database console
npm run db:console
```

### Debugging

```bash
# Start server in debug mode
npm run debug

# Then attach debugger on port 9229
# In VS Code: Use "Attach to Node" configuration
```

---

## Troubleshooting

### Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

Option 1 - Kill process using port 3000:
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Option 2 - Use different port:
```bash
# In .env file
PORT=3001
```

---

### Database Connection Failed

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**

1. **Check PostgreSQL is running:**
   ```bash
   # macOS
   brew services list | grep postgresql

   # Linux
   sudo systemctl status postgresql

   # Start if not running
   brew services start postgresql  # macOS
   sudo systemctl start postgresql  # Linux
   ```

2. **Verify DATABASE_URL in .env:**
   ```bash
   # Should be:
   DATABASE_URL=postgresql://localhost:5432/myapp_dev

   # Not:
   DATABASE_URL=postgresql://localhost/myapp_dev  # Missing port
   ```

3. **Check database exists:**
   ```bash
   psql -l  # List all databases
   # If myapp_dev is missing:
   createdb myapp_dev
   ```

4. **Test connection manually:**
   ```bash
   psql -d myapp_dev
   # If this fails, check username/password in DATABASE_URL
   ```

---

### Email Not Sending

**Symptoms:**
- No emails received
- Error: "SendGrid API key invalid"

**Solutions:**

1. **Verify SendGrid API key:**
   - Log in to SendGrid dashboard
   - Go to Settings → API Keys
   - Create new key if needed
   - Copy full key including `SG.` prefix

2. **Check .env file:**
   ```bash
   # Should be:
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxx

   # Not:
   SENDGRID_API_KEY=xxxxxxxxxxxxxxxxxxx  # Missing SG. prefix
   ```

3. **Check spam folder:**
   - SendGrid emails may be filtered as spam initially

4. **Test SendGrid connection:**
   ```bash
   npm run test:email
   ```

---

### Redis Connection Failed

**Symptoms:**
```
Warning: Redis connection failed. Caching disabled.
```

**Solutions:**

1. **Check Redis is running:**
   ```bash
   redis-cli ping  # Should return "PONG"
   ```

2. **Start Redis:**
   ```bash
   # macOS
   brew services start redis

   # Linux
   sudo systemctl start redis

   # Or run manually
   redis-server
   ```

3. **If you don't need caching:**
   - Remove `REDIS_URL` from `.env`
   - App will work without Redis

---

### Migration Errors

**Symptoms:**
```
Error: relation "users" already exists
```

**Solutions:**

1. **Reset database:**
   ```bash
   npm run db:reset
   ```

2. **Or manually drop and recreate:**
   ```bash
   dropdb myapp_dev
   createdb myapp_dev
   npm run migrate
   ```

---

### Tests Failing

**Symptoms:**
```
Test suite failed to run
Database connection error
```

**Solutions:**

1. **Set up test database:**
   ```bash
   createdb myapp_test
   NODE_ENV=test npm run migrate
   ```

2. **Run tests with correct NODE_ENV:**
   ```bash
   NODE_ENV=test npm test
   ```

3. **Clear test database:**
   ```bash
   NODE_ENV=test npm run db:reset
   ```

---

## Additional Resources

- **Documentation:** [./ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Reference:** [./API-REFERENCE.md](./API-REFERENCE.md)
- **Contributing:** [./CONTRIBUTING.md](./CONTRIBUTING.md)
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Node.js Docs:** https://nodejs.org/docs/

---

## Getting Help

If you're still stuck:

1. **Check existing issues:** https://github.com/yourcompany/project/issues
2. **Ask in Slack:** #project-support channel
3. **Email support:** dev-support@yourcompany.com

---

*Last Updated: November 2025*
```

---

## Mermaid Diagram Examples

### 1. Flowchart - User Registration Flow

```mermaid
flowchart TD
    Start([User Submits Registration]) --> Validate{Valid Input?}
    Validate -->|No| ValidationError[Return 400 Validation Error]
    Validate -->|Yes| CheckEmail{Email Exists?}
    CheckEmail -->|Yes| EmailError[Return 409 Email Exists]
    CheckEmail -->|No| HashPassword[Hash Password with bcrypt]
    HashPassword --> CreateUser[Create User Record in DB]
    CreateUser --> GenerateToken[Generate JWT Verification Token]
    GenerateToken --> SendEmail[Send Verification Email]
    SendEmail --> ReturnSuccess[Return 201 with User + Token]
    ValidationError --> End([End])
    EmailError --> End
    ReturnSuccess --> End
```

### 2. Sequence Diagram - API Request Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant G as API Gateway
    participant A as Auth Middleware
    participant S as Service
    participant D as Database

    C->>G: HTTP Request + JWT Token
    G->>A: Validate Token
    A->>A: Verify JWT Signature
    alt Invalid Token
        A-->>G: 401 Unauthorized
        G-->>C: 401 Response
    else Valid Token
        A->>A: Extract User Info
        A-->>G: User Authenticated
        G->>S: Forward Request + User
        S->>D: Query Database
        D-->>S: Return Data
        S->>S: Process Data
        S-->>G: Return Result
        G-->>C: 200 OK + Data
    end
```

### 3. Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ REVIEW : writes
    USER ||--|| USER_PROFILE : has
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER ||--|| PAYMENT : has
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT ||--o{ REVIEW : "reviewed in"
    CATEGORY ||--o{ PRODUCT : categorizes

    USER {
        uuid id PK
        string email UK
        string password
        string name
        enum role
        boolean verified
        timestamp createdAt
        timestamp updatedAt
    }

    ORDER {
        uuid id PK
        uuid userId FK
        decimal total
        enum status
        jsonb shippingAddress
        string paymentId
        timestamp createdAt
    }

    PRODUCT {
        uuid id PK
        uuid categoryId FK
        string name
        text description
        decimal price
        int stock
        string imageUrl
    }

    ORDER_ITEM {
        uuid id PK
        uuid orderId FK
        uuid productId FK
        int quantity
        decimal priceAtPurchase
    }

    REVIEW {
        uuid id PK
        uuid userId FK
        uuid productId FK
        int rating
        text comment
        timestamp createdAt
    }

    USER_PROFILE {
        uuid userId PK_FK
        string phone
        jsonb address
        date dateOfBirth
    }

    PAYMENT {
        uuid id PK
        uuid orderId FK
        string stripePaymentId
        decimal amount
        enum status
        timestamp createdAt
    }

    CATEGORY {
        uuid id PK
        string name
        string slug
    }
```

### 4. State Diagram - Order Status

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Paid : Payment Successful
    Pending --> Cancelled : Payment Failed/Cancelled
    Paid --> Processing : Order Confirmed
    Processing --> Shipped : Items Shipped
    Shipped --> Delivered : Delivery Confirmed
    Processing --> Cancelled : Stock Unavailable
    Shipped --> Returned : Customer Return
    Delivered --> [*]
    Cancelled --> [*]
    Returned --> Refunded
    Refunded --> [*]
```

### 5. Class Diagram - Service Architecture

```mermaid
classDiagram
    class UserService {
        -db: Database
        -emailService: EmailService
        +register(userData) Promise~User~
        +login(email, password) Promise~Token~
        +verifyEmail(token) Promise~boolean~
        +requestPasswordReset(email) Promise~void~
        +resetPassword(token, newPassword) Promise~void~
        -generateToken(userId) string
        -hashPassword(password) string
    }

    class TaskService {
        -db: Database
        +createTask(userId, taskData) Promise~Task~
        +getTasks(userId, filters) Promise~Task[]~
        +updateTask(taskId, userId, updates) Promise~Task~
        +deleteTask(taskId, userId) Promise~void~
        +getTaskStats(userId) Promise~Stats~
    }

    class EmailService {
        -sendgridClient: SendGrid
        +sendVerificationEmail(email, token) Promise~void~
        +sendPasswordResetEmail(email, token) Promise~void~
        +sendWelcomeEmail(email, name) Promise~void~
        -sendEmail(to, template, data) Promise~void~
    }

    class Database {
        -connection: PostgreSQLClient
        +users: UserRepository
        +tasks: TaskRepository
        +connect() Promise~void~
        +disconnect() Promise~void~
    }

    UserService --> Database
    UserService --> EmailService
    TaskService --> Database
    EmailService --> SendGrid
```

---

## OpenAPI Specification Examples

### Example OpenAPI 3.0 Specification

```yaml
openapi: 3.0.0
info:
  title: Task Management API
  description: REST API for managing tasks and user authentication
  version: 1.0.0
  contact:
    name: API Support
    email: api-support@example.com

servers:
  - url: http://localhost:3000/api
    description: Development server
  - url: https://staging-api.example.com/api
    description: Staging server
  - url: https://api.example.com/api
    description: Production server

tags:
  - name: Authentication
    description: User authentication and registration
  - name: Tasks
    description: Task management operations
  - name: Users
    description: User profile operations

paths:
  /auth/register:
    post:
      summary: Register new user
      description: Create a new user account with email and password
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
                - name
              properties:
                email:
                  type: string
                  format: email
                  example: john.doe@example.com
                password:
                  type: string
                  format: password
                  minLength: 8
                  example: SecurePass123!
                name:
                  type: string
                  minLength: 2
                  maxLength: 100
                  example: John Doe
      responses:
        '201':
          description: User successfully registered
          content:
            application/json:
              schema:
                type: object
                properties:
                  user:
                    $ref: '#/components/schemas/User'
                  token:
                    type: string
                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: Email already registered
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/login:
    post:
      summary: Login user
      description: Authenticate user and receive JWT token
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
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
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  user:
                    $ref: '#/components/schemas/User'
                  token:
                    type: string
                  expiresIn:
                    type: string
                    example: 24h
        '401':
          $ref: '#/components/responses/Unauthorized'

  /tasks:
    get:
      summary: Get all tasks
      description: Retrieve all tasks for the authenticated user with optional filtering
      tags:
        - Tasks
      security:
        - bearerAuth: []
      parameters:
        - in: query
          name: status
          schema:
            type: string
            enum: [todo, in-progress, done]
          description: Filter by task status
        - in: query
          name: priority
          schema:
            type: string
            enum: [low, medium, high]
          description: Filter by priority
      responses:
        '200':
          description: List of tasks
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Task'
        '401':
          $ref: '#/components/responses/Unauthorized'

    post:
      summary: Create new task
      description: Create a new task for the authenticated user
      tags:
        - Tasks
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - title
              properties:
                title:
                  type: string
                  minLength: 3
                  maxLength: 255
                  example: Complete project documentation
                description:
                  type: string
                  maxLength: 5000
                  example: Write comprehensive API documentation
                priority:
                  type: string
                  enum: [low, medium, high]
                  default: medium
                dueDate:
                  type: string
                  format: date-time
                  example: 2025-12-31T23:59:59Z
      responses:
        '201':
          description: Task created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /tasks/{taskId}:
    get:
      summary: Get single task
      description: Retrieve a specific task by ID
      tags:
        - Tasks
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: taskId
          required: true
          schema:
            type: string
            format: uuid
          description: Task ID
      responses:
        '200':
          description: Task details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        '404':
          $ref: '#/components/responses/NotFound'

    put:
      summary: Update task
      description: Update an existing task
      tags:
        - Tasks
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: taskId
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                description:
                  type: string
                status:
                  type: string
                  enum: [todo, in-progress, done]
                priority:
                  type: string
                  enum: [low, medium, high]
                dueDate:
                  type: string
                  format: date-time
      responses:
        '200':
          description: Task updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
        '404':
          $ref: '#/components/responses/NotFound'

    delete:
      summary: Delete task
      description: Delete a task permanently
      tags:
        - Tasks
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: taskId
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Task deleted
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Task deleted successfully
        '404':
          $ref: '#/components/responses/NotFound'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
          example: 550e8400-e29b-41d4-a716-446655440000
        email:
          type: string
          format: email
          example: john.doe@example.com
        name:
          type: string
          example: John Doe
        verified:
          type: boolean
          example: true
        createdAt:
          type: string
          format: date-time
          example: 2025-11-20T10:30:00Z

    Task:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        title:
          type: string
          example: Complete project documentation
        description:
          type: string
          example: Write comprehensive API documentation
        status:
          type: string
          enum: [todo, in-progress, done]
          default: todo
        priority:
          type: string
          enum: [low, medium, high]
          default: medium
        dueDate:
          type: string
          format: date-time
          nullable: true
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    Error:
      type: object
      properties:
        error:
          type: string
          example: Validation failed
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
      description: Bad request - validation error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    Unauthorized:
      description: Unauthorized - invalid or missing authentication
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: Unauthorized. Please provide a valid token.

    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: Resource not found

security:
  - bearerAuth: []
```

---

## Review and Improvement Workflows

### Review Workflow Example

```markdown
# Documentation Review Process

## Phase 1: Initial Generation (AI)

1. **Create targeted prompt** with:
   - Specific structure requirements
   - Code to analyze
   - Output format specifications

2. **Generate documentation**
   - Use Claude or AI tool
   - Get first draft

## Phase 2: Accuracy Review

### Checklist:
- [ ] All code references are correct
- [ ] API endpoints match actual routes
- [ ] Parameters match function signatures
- [ ] Return types are accurate
- [ ] Error codes are correct
- [ ] Technology versions are current

### Common Issues Found:
- Hallucinated endpoints
- Incorrect parameter types
- Missing error scenarios
- Outdated technology references

### Fix Strategy:
```
Review this section for accuracy:

[Paste section]

Compare against actual code:
[Paste actual code]

Fix any discrepancies. The code is the source of truth.
```

## Phase 3: Completeness Review

### Checklist:
- [ ] All components documented
- [ ] All endpoints included
- [ ] All environment variables listed
- [ ] No placeholder text (TODO, TBD, etc.)
- [ ] Examples provided for key features

### Fix Strategy:
```
This documentation is missing [specific items].

Add sections for:
- [Item 1]
- [Item 2]
- [Item 3]

Follow the same format as existing sections.
```

## Phase 4: Example Validation

### For Code Examples:
1. Copy example code
2. Paste into editor
3. Run it
4. Verify output matches documentation

### For API Examples:
1. Copy curl command
2. Run in terminal
3. Verify response matches documentation
4. Test error scenarios

### Fix Strategy:
If example doesn't work:
```
This example has an error:
[Paste example]

Error encountered:
[Paste error]

Fix the example to work correctly.
```

## Phase 5: Diagram Validation

### For Mermaid Diagrams:
1. Copy diagram code
2. Paste into https://mermaid.live/
3. Verify it renders
4. Check accuracy against code

### Common Diagram Issues:
- Syntax errors (missing semicolons)
- Incorrect relationships
- Missing components
- Too complex/cluttered

### Fix Strategy:
```
This Mermaid diagram has a syntax error:
[Paste diagram]

Fix the syntax and ensure it renders correctly.
Simplify if it's too complex.
```

## Phase 6: Formatting Review

### Checklist:
- [ ] Markdown syntax valid
- [ ] Tables formatted correctly
- [ ] Code blocks have language specified
- [ ] Headings hierarchy is logical
- [ ] Links work (internal and external)

### Fix Strategy:
Use markdownlint or manual review to fix formatting issues.

## Phase 7: Polish

### Improvements:
- Enhance descriptions to be clearer
- Add helpful notes and warnings
- Improve examples with comments
- Add cross-references between documents
- Ensure consistent terminology

### Final Check:
Read documentation as if you're a newcomer. Does everything make sense?
```

---

## Additional Resources

- **Mermaid Live Editor:** https://mermaid.live/
- **Swagger Editor:** https://editor.swagger.io/
- **Markdown Guide:** https://www.markdownguide.org/
- **API Documentation Best Practices:** https://swagger.io/resources/articles/best-practices-in-api-documentation/

---

*Module 04 Code Examples*
*Reference materials for documentation generation*
