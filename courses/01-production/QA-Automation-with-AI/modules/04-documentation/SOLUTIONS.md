# Module 4 Solutions: Generating Complete Code Documentation

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Generate Architecture Docs

**Sample ARCHITECTURE.md:**

```markdown
# Architecture Documentation

## System Overview

User authentication and management service for web applications. Provides user registration, login, email verification, and password reset functionality. Designed to be integrated into larger applications as a microservice or library.

**Key Features:**
- User registration with email verification
- Secure login with JWT tokens
- Password reset with email confirmation
- Email notifications
- Secure password hashing with bcrypt

**Target Users:**
- Web application developers
- Backend engineers
- QA engineers testing authentication flows

## Architecture Diagram

```mermaid
graph TB
    Client[Client Application]
    API[User Service API]
    Auth[Authentication Module]
    Email[Email Service]
    DB[(Database)]
    Cache[(Session Cache)]
    
    Client -->|HTTP Requests| API
    API -->|Verify Credentials| Auth
    API -->|Send Emails| Email
    API -->|Read/Write| DB
    Auth -->|Cache Tokens| Cache
    Email -->|External SMTP| SMTP[SMTP Server]
```

## Component Details

### 1. User Service (Core)
**Purpose**: Main business logic for user operations
**Location**: `src/services/userService.js`
**Technologies**: Node.js, bcrypt, jsonwebtoken
**Key Methods**:
- `register(userData)` - Create new user
- `login(email, password)` - Authenticate user
- `verifyEmail(token)` - Confirm email
- `requestPasswordReset(email)` - Initiate reset
- `resetPassword(token, newPassword)` - Complete reset

**Dependencies**:
- bcrypt for password hashing
- jsonwebtoken for JWT generation
- Database module for persistence
- Email service for notifications

### 2. Email Service
**Purpose**: Handle all email communications
**Location**: `src/services/emailService.js`
**Technologies**: Nodemailer, SMTP
**Key Methods**:
- `sendEmail(to, template, data)` - Send templated email

**Supported Templates**:
- `verify` - Email verification
- `reset` - Password reset
- `welcome` - Welcome email

### 3. Database Module
**Purpose**: Data persistence and queries
**Location**: `src/database/`
**Technologies**: PostgreSQL, ORM (Sequelize/Prisma)
**Key Tables**:
- `users` - User accounts
- `verification_tokens` - Email verification tokens
- `reset_tokens` - Password reset tokens

### 4. Authentication Module
**Purpose**: JWT token generation and validation
**Location**: `src/auth/`
**Key Functions**:
- `generateToken(payload, expiresIn)` - Create JWT
- `verifyToken(token)` - Validate JWT
- `generateVerificationToken(userId)` - Create email token

## Data Models

### User Entity
```
User {
  id: UUID (primary key)
  email: string (unique)
  password: string (hashed)
  name: string
  verified: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Verification Token
```
VerificationToken {
  id: UUID
  userId: UUID (foreign key)
  token: string (JWT)
  expiresAt: timestamp
  createdAt: timestamp
}
```

### Entity Relationship Diagram
```mermaid
erDiagram
    USERS ||--o{ VERIFICATION_TOKENS : has
    USERS ||--o{ RESET_TOKENS : has
    
    USERS {
        uuid id PK
        string email UK
        string password
        string name
        boolean verified
        timestamp createdAt
        timestamp updatedAt
    }
    
    VERIFICATION_TOKENS {
        uuid id PK
        uuid userId FK
        string token
        timestamp expiresAt
    }
    
    RESET_TOKENS {
        uuid id PK
        uuid userId FK
        string token
        timestamp expiresAt
    }
```

## Data Flow

### Registration Flow
```mermaid
sequenceDiagram
    Client->>API: POST /register {email, password, name}
    API->>UserService: register(userData)
    UserService->>DB: Check if email exists
    DB-->>UserService: Email not found
    UserService->>UserService: Hash password with bcrypt
    UserService->>DB: Create user record
    DB-->>UserService: User created
    UserService->>Auth: Generate verification token
    Auth-->>UserService: Token created
    UserService->>Email: Send verification email
    Email-->>UserService: Email sent
    UserService-->>API: Return user (without password)
    API-->>Client: 201 Created
```

### Login Flow
```mermaid
sequenceDiagram
    Client->>API: POST /login {email, password}
    API->>UserService: login(email, password)
    UserService->>DB: Find user by email
    DB-->>UserService: User found
    UserService->>UserService: Compare password with hash
    alt Password matches
        UserService->>Auth: Generate JWT token
        Auth-->>UserService: Token created
        UserService-->>API: Return token + user
        API-->>Client: 200 OK {token, user}
    else Password invalid
        UserService-->>API: Error: Invalid credentials
        API-->>Client: 401 Unauthorized
    end
```

## Security Architecture

### Authentication
- **Method**: JWT (JSON Web Tokens)
- **Token Lifetime**: 24 hours
- **Refresh**: Clients must re-login after expiration
- **Storage**: Client-side (localStorage/sessionStorage)

### Authorization
- **Model**: Role-based (future enhancement)
- **Current**: Authenticated users have full access to their own data

### Password Security
- **Hashing**: bcrypt with 10 salt rounds
- **Never Stored**: Plain text passwords never stored
- **Comparison**: Constant-time comparison to prevent timing attacks

### Email Verification
- **Purpose**: Confirm user owns email address
- **Token**: JWT with 24-hour expiration
- **Verification**: User clicks link with token
- **Security**: Token includes userId and type

### Password Reset
- **Token**: JWT with 1-hour expiration
- **Type**: Separate token type from verification
- **Security**: Token includes userId and type field
- **Validation**: Prevents using verification token for reset

## Deployment Architecture

### Development Environment
- Local Node.js server
- SQLite or local PostgreSQL
- Console logging
- No email sending (mock)

### Staging Environment
- Docker container
- PostgreSQL database
- Staging SMTP server
- Full email sending

### Production Environment
- Kubernetes cluster
- Managed PostgreSQL (RDS/Cloud SQL)
- Production SMTP service
- Monitoring and logging
- Rate limiting enabled

### CI/CD Pipeline
```mermaid
graph LR
    Code[Code Push] --> Test[Run Tests]
    Test --> Build[Build Docker Image]
    Build --> Staging[Deploy to Staging]
    Staging --> Approve{Manual Approval}
    Approve -->|Approved| Prod[Deploy to Production]
    Approve -->|Rejected| Notify[Notify Team]
```

## Dependencies

### Production
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT handling
- `nodemailer` - Email sending
- `express` - Web framework
- `pg` - PostgreSQL driver

### Development
- `jest` - Testing framework
- `supertest` - HTTP testing
- `dotenv` - Environment variables

## Configuration

### Environment Variables
```
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NODE_ENV=development
```

## Performance Considerations

- **Password Hashing**: Bcrypt is intentionally slow (10 rounds = ~100ms)
- **Database Indexes**: Email field should be indexed for login queries
- **Token Caching**: Consider caching valid tokens in Redis
- **Rate Limiting**: Implement on registration and password reset endpoints

## Future Enhancements

1. **OAuth Integration** - Google, GitHub login
2. **Two-Factor Authentication** - SMS or authenticator app
3. **Role-Based Access Control** - Admin, user, moderator roles
4. **Audit Logging** - Track all authentication events
5. **Session Management** - Multiple device support
```

**Grading Notes:**
- Should include all 8 sections
- Diagrams should be valid Mermaid syntax
- Data models should match actual code
- Security section should be detailed
- Should show understanding of architecture

---

### Part 2: Create API Reference

**Sample API-REFERENCE.md:**

```markdown
# API Reference

## Authentication

All endpoints except `/register` and `/login` require a valid JWT token in the Authorization header.

```bash
Authorization: Bearer <token>
```

---

## POST /register

Register a new user account.

**Authentication**: None

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address (must be unique) |
| password | string | Yes | Minimum 8 characters |
| name | string | Yes | User's full name |

**Response** (201 Created):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Error Responses**:
- `400 Bad Request` - Missing required fields or invalid format
- `409 Conflict` - Email already registered

**Example**:
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "name": "John Doe"
  }'
```

**Notes**:
- Password must contain uppercase, lowercase, and numbers
- Verification email sent automatically
- User cannot login until email is verified

---

## POST /login

Authenticate user and receive JWT token.

**Authentication**: None

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses**:
- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials
- `403 Forbidden` - Email not verified

**Example**:
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

**Notes**:
- Token expires in 24 hours
- User must verify email before login
- Rate limited to 5 attempts per 15 minutes

---

## POST /verify-email

Verify user's email address.

**Authentication**: None

**Request Body**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response** (200 OK):
```json
{
  "message": "Email verified successfully"
}
```

**Error Responses**:
- `400 Bad Request` - Missing token
- `401 Unauthorized` - Invalid or expired token

**Example**:
```bash
curl -X POST http://localhost:3000/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
```

**Notes**:
- Token sent in verification email
- Token expires in 24 hours
- Can only be used once

---

## POST /request-password-reset

Request password reset email.

**Authentication**: None

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "If email exists, reset link sent"
}
```

**Error Responses**:
- `400 Bad Request` - Missing email

**Example**:
```bash
curl -X POST http://localhost:3000/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

**Notes**:
- Always returns success message (doesn't reveal if email exists)
- Reset link sent to email if account exists
- Rate limited to 3 requests per hour per email

---

## POST /reset-password

Reset password with token.

**Authentication**: None

**Request Body**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "NewSecurePass456!"
}
```

**Response** (200 OK):
```json
{
  "message": "Password reset successful"
}
```

**Error Responses**:
- `400 Bad Request` - Missing token or password
- `401 Unauthorized` - Invalid or expired token

**Example**:
```bash
curl -X POST http://localhost:3000/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "newPassword": "NewSecurePass456!"
  }'
```

**Notes**:
- Token expires in 1 hour
- Password must meet strength requirements
- User can login immediately after reset

---

## GET /profile

Get current user's profile.

**Authentication**: Required

**Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "John Doe",
  "verified": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses**:
- `401 Unauthorized` - Missing or invalid token

**Example**:
```bash
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

**Common Error Codes**:
- `INVALID_CREDENTIALS` - Email or password incorrect
- `EMAIL_ALREADY_REGISTERED` - Email already in use
- `INVALID_TOKEN` - Token is invalid or expired
- `EMAIL_NOT_VERIFIED` - User hasn't verified email
- `VALIDATION_ERROR` - Request data invalid
- `INTERNAL_ERROR` - Server error
```

**Grading Notes:**
- Should document all endpoints
- Each endpoint should have request/response examples
- Error responses should be specific
- Examples should be copy-paste ready
- Should include authentication requirements

---

### Part 3: Write Setup Guide

**Sample SETUP.md:**

```markdown
# Setup Guide

## Prerequisites

Before starting, ensure you have:

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** 8+ (comes with Node.js)
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- **Text Editor** (VS Code recommended)

### Verify Installation

```bash
node --version    # Should be v16.0.0 or higher
npm --version     # Should be 8.0.0 or higher
psql --version    # Should be 12.0 or higher
git --version     # Should be 2.0.0 or higher
```

---

## Quick Start (5 minutes)

For experienced developers who want to get running fast:

```bash
# 1. Clone repository
git clone https://github.com/yourorg/user-service.git
cd user-service

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env

# 4. Create database
createdb user_service_dev

# 5. Run migrations
npm run migrate

# 6. Start server
npm run dev

# 7. Verify it works
curl http://localhost:3000/health
```

Server should be running at `http://localhost:3000`

---

## Full Development Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/yourorg/user-service.git
cd user-service
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`.

### Step 3: Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/user_service_dev

# JWT
JWT_SECRET=your-secret-key-change-this-in-production

# Email (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Environment
NODE_ENV=development
PORT=3000
```

**Getting Gmail App Password**:
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to App Passwords
4. Select Mail and Windows Computer
5. Copy the generated password

### Step 4: Create Database

```bash
# Create database
createdb user_service_dev

# Verify it was created
psql -l | grep user_service_dev
```

### Step 5: Run Database Migrations

```bash
npm run migrate
```

This creates all necessary tables.

### Step 6: Start Development Server

```bash
npm run dev
```

You should see:
```
Server running on http://localhost:3000
Database connected
```

### Step 7: Verify Setup

Test the API:

```bash
# Health check
curl http://localhost:3000/health

# Should return:
# {"status":"ok"}
```

---

## Running Tests

### All Tests

```bash
npm test
```

### Specific Test File

```bash
npm test -- src/services/userService.test.js
```

### With Coverage

```bash
npm run test:coverage
```

Opens coverage report in browser.

### Watch Mode (auto-run on file changes)

```bash
npm test -- --watch
```

---

## Common Tasks

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` directory.

### Run Production Build

```bash
npm run start
```

### Check Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format
```

### Database Commands

```bash
# Create new migration
npm run migrate:create -- migration_name

# Rollback last migration
npm run migrate:rollback

# Reset database (WARNING: deletes all data)
npm run migrate:reset
```

---

## Troubleshooting

### "Cannot find module" Error

**Problem**: `Error: Cannot find module 'express'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Error

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check if PostgreSQL is running
# macOS
brew services list | grep postgres

# Linux
sudo systemctl status postgresql

# Windows
# Check Services app for PostgreSQL

# Start PostgreSQL if not running
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::3000`

**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Email Not Sending

**Problem**: Emails not received during registration

**Solution**:
1. Check SMTP credentials in `.env`
2. For Gmail: Use App Password, not regular password
3. Check spam folder
4. Verify email service is running: `npm run dev`

### Tests Failing

**Problem**: `npm test` shows failures

**Solution**:
```bash
# Clear test cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose

# Run single test file
npm test -- src/services/userService.test.js
```

---

## IDE Setup (VS Code)

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - ID: dsznajder.es7-react-js-snippets

2. **Prettier - Code formatter**
   - ID: esbenp.prettier-vscode

3. **ESLint**
   - ID: dbaeumer.vscode-eslint

4. **Thunder Client** (for API testing)
   - ID: rangav.vscode-thunder-client

### Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Next Steps

1. **Read Architecture**: See `ARCHITECTURE.md`
2. **API Reference**: See `API-REFERENCE.md`
3. **Write Tests**: See `TEST-DOCUMENTATION.md`
4. **Deploy**: See `DEPLOYMENT.md`

---

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/yourorg/user-service/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourorg/user-service/discussions)
- **Slack**: #user-service channel
- **Email**: dev-team@yourorg.com
```

**Grading Notes:**
- Should be copy-paste ready
- All commands should be tested
- Should include troubleshooting
- Should cover all major tasks
- Should be beginner-friendly

---

## Quiz Answer Key

### Multiple Choice Answers

1. **b** - System overview, components, data flow, and dependencies
2. **b** - URL, method, parameters, response, and examples
3. **b** - Use iterative refinement to fix specific issues
4. **b** - ASCII art or Mermaid diagrams
5. **b** - Step-by-step commands that beginners can follow

### True/False Answers

6. **False** - AI-generated docs need review and refinement
7. **True** - Environment variables are essential for setup
8. **True** - Error responses help developers debug
9. **True** - Output format specifications improve quality
10. **False** - Break documentation into focused prompts

### Short Answer Rubrics

**Question 11 (5 points)** - Four Types of Documentation

Valid answers (1.25 points each):
- Architecture documentation
- API reference documentation
- Setup/installation guide
- Test documentation
- Deployment guide
- Troubleshooting guide
- Code style guide
- Database schema documentation

**Question 12 (5 points)** - API Endpoint Sections

Should include:
- Description of what endpoint does (1 point)
- Request parameters/body (1 point)
- Response format with examples (1 point)
- Error responses (1 point)
- Example curl command (1 point)

**Question 13 (5 points)** - Setup Guide Prompt

Good prompt should include:
- Clear task description (1 point)
- Specific technologies (Node.js, PostgreSQL) (1 point)
- Output format (Markdown) (1 point)
- Key sections (prerequisites, quick start, full setup) (1 point)
- Copy-paste friendly requirement (1 point)

**Question 14 (10 points)** - Review AI Documentation

Issues to identify:
1. **Too vague** - "Creates user" doesn't explain what it does (3 points)
2. **Missing parameter details** - No types, required fields, validation (3 points)
3. **No examples** - Should include curl command and JSON examples (2 points)
4. **Missing error cases** - No error responses documented (2 points)

---

## Common Student Mistakes

1. **Vague Descriptions**
   - **Mistake**: "Endpoint for user operations"
   - **Why it's wrong**: Doesn't explain what it actually does
   - **Fix**: "Creates a new user account with email verification"

2. **Missing Parameter Details**
   - **Mistake**: "Parameters: data"
   - **Why it's wrong**: Doesn't specify what fields are needed
   - **Fix**: Include table with field names, types, and descriptions

3. **No Error Documentation**
   - **Mistake**: Only documenting success responses
   - **Why it's wrong**: Developers don't know how to handle errors
   - **Fix**: Document all error codes and messages

4. **Inaccurate Documentation**
   - **Mistake**: Documenting what code should do, not what it does
   - **Why it's wrong**: Misleads developers
   - **Fix**: Always verify against actual code

5. **Missing Examples**
   - **Mistake**: Describing endpoint without curl examples
   - **Why it's wrong**: Hard to understand actual usage
   - **Fix**: Include working curl commands

6. **Incomplete Setup Guide**
   - **Mistake**: Missing environment variable setup
   - **Why it's wrong**: New developers can't get running
   - **Fix**: Include all required configuration steps

7. **Not Testing Documentation**
   - **Mistake**: Submitting setup guide without following it
   - **Why it's wrong**: Might have missing or incorrect steps
   - **Fix**: Actually follow the guide yourself

8. **Broken Mermaid Diagrams**
   - **Mistake**: Invalid Mermaid syntax
   - **Why it's wrong**: Diagrams don't render
   - **Fix**: Test diagrams in Mermaid Live Editor

9. **Outdated Information**
   - **Mistake**: Documenting old API endpoints
   - **Why it's wrong**: Developers follow wrong information
   - **Fix**: Always verify against current code

10. **Poor Organization**
    - **Mistake**: All documentation in one file
    - **Why it's wrong**: Hard to find information
    - **Fix**: Split into focused files (ARCHITECTURE.md, API-REFERENCE.md, etc.)

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Architecture Docs | 30 | Complete, accurate, includes diagrams |
| API Reference | 30 | All endpoints documented with examples |
| Setup Guide | 25 | Copy-paste ready, tested, troubleshooting |
| Documentation Quality | 15 | Clear, accurate, well-organized |
| **Total** | **100** | |

**Passing**: 70+ points

---

## Teaching Notes

- **Emphasize accuracy**: Documentation must match actual code
- **Show iteration**: Demonstrate refining AI output
- **Test everything**: Have students follow their own setup guides
- **Use real examples**: Show documentation from actual projects
- **Connect to QA**: Explain how good docs help with testing
