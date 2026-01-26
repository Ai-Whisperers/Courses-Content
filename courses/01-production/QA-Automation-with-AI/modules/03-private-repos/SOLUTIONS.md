# Module 3 Solutions: Accessing Private Repositories with AI

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Repository Discovery

**Sample Solution:**

Repository analysis should categorize repos by:

1. **By Language**
   - JavaScript/TypeScript repos
   - Python repos
   - Go repos
   - Other languages

2. **By Purpose**
   - APIs and backend services
   - Frontend applications
   - Libraries and utilities
   - Infrastructure and DevOps
   - Data processing

3. **By Testing Priority**
   - **High Priority**: Core APIs, payment systems, authentication, data processing
   - **Medium Priority**: Frontend apps, utilities, internal tools
   - **Low Priority**: Documentation, examples, archived projects

**Sample Top 3 Recommendations:**

```markdown
## Top 3 Repositories for Improved Test Coverage

### 1. api-service (High Priority)
- **Language**: TypeScript/Node.js
- **Purpose**: Core REST API for platform
- **Why**: Critical path, handles payments and user data
- **Estimated Impact**: High - affects all dependent services
- **Recommended Tests**: Integration tests for payment flow, auth endpoints, data validation

### 2. data-processor (High Priority)
- **Language**: Python
- **Purpose**: ETL pipeline for customer data
- **Why**: Data integrity is critical, complex business logic
- **Estimated Impact**: High - data quality affects reporting
- **Recommended Tests**: Unit tests for transformations, integration tests with database

### 3. web-app (Medium Priority)
- **Language**: React/TypeScript
- **Purpose**: Customer-facing dashboard
- **Why**: User-facing, complex interactions
- **Estimated Impact**: Medium - affects user experience
- **Recommended Tests**: E2E tests for critical flows, component tests for complex UI
```

**Grading Notes:**
- Should categorize at least 5+ repos
- Recommendations should have clear justification
- Should consider business impact, not just code complexity
- Partial credit if analysis is incomplete but shows understanding

---

### Part 2: Repository Deep Dive

**Sample Analysis Document:**

```markdown
# Repository Analysis: api-service

## Overall Architecture

Monolithic REST API built with Express.js and TypeScript. Follows MVC pattern with:
- Controllers for request handling
- Services for business logic
- Models for data access
- Middleware for cross-cutting concerns

## Entry Points

- **Main**: `src/index.ts` - Server initialization
- **API Routes**: `src/routes/` - All endpoint definitions
- **Configuration**: `src/config/` - Environment and app config

## Key Modules

1. **Authentication** (`src/services/auth.ts`)
   - JWT token generation and validation
   - User login/logout
   - Permission checking

2. **User Management** (`src/services/users.ts`)
   - User CRUD operations
   - Profile management
   - Role assignment

3. **Payment Processing** (`src/services/payments.ts`)
   - Stripe integration
   - Transaction recording
   - Invoice generation

4. **Database** (`src/models/`)
   - User, Order, Payment models
   - Prisma ORM for queries

## Current Test Coverage

- **Unit Tests**: ~40% coverage
- **Integration Tests**: ~20% coverage
- **E2E Tests**: None
- **Test Framework**: Jest
- **Test Location**: `tests/` directory

## Testing Gaps

1. **Authentication Service**
   - Missing: Token expiration tests
   - Missing: Invalid token handling
   - Missing: Permission validation

2. **Payment Processing**
   - Missing: Stripe error handling
   - Missing: Transaction rollback scenarios
   - Missing: Concurrent payment handling

3. **User Management**
   - Missing: Duplicate email handling
   - Missing: Password validation
   - Missing: Role-based access control

4. **API Endpoints**
   - Missing: E2E tests for critical flows
   - Missing: Error response validation
   - Missing: Rate limiting tests
```

**Grading Notes:**
- Should identify 5+ key modules
- Should list existing tests accurately
- Should identify 5+ testing gaps
- Should show understanding of architecture

---

### Part 3: CLAUDE.md Creation

**Sample CLAUDE.md:**

```markdown
# Project: API Service

## Overview

REST API for the customer platform. Handles user authentication, profile management, payment processing, and order management. Serves both web and mobile clients.

## Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Payment**: Stripe API
- **Testing**: Jest for unit/integration tests
- **CI/CD**: GitHub Actions

## Architecture

```
src/
├── index.ts              # Server entry point
├── config/               # Configuration (env, constants)
├── middleware/           # Express middleware (auth, logging, error handling)
├── routes/               # API route definitions
├── controllers/          # Request handlers
├── services/             # Business logic
│   ├── auth.ts          # Authentication logic
│   ├── users.ts         # User management
│   ├── payments.ts      # Payment processing
│   └── orders.ts        # Order management
├── models/              # Database models (Prisma)
├── utils/               # Shared utilities
└── types/               # TypeScript interfaces

tests/
├── unit/                # Unit tests
├── integration/         # Integration tests
└── fixtures/            # Test data
```

## Code Conventions

- **Language**: TypeScript with strict mode
- **Formatting**: Prettier (line length 100)
- **Linting**: ESLint with airbnb config
- **Naming**: camelCase for functions/variables, PascalCase for classes
- **Imports**: Absolute imports from `src/`
- **Error Handling**: Custom error classes with proper logging
- **Async**: Always use async/await, never callbacks

## Testing Requirements

- **Framework**: Jest
- **Pattern**: AAA (Arrange, Act, Assert)
- **Mocking**: Mock external APIs (Stripe, email), use test database for integration
- **Coverage**: Minimum 80% for services, 60% overall
- **Naming**: `test_<function>_<scenario>_<expected>`
- **Isolation**: Each test should be independent
- **Cleanup**: Use beforeEach/afterEach for setup/teardown

## Important Files

- `src/services/auth.ts` - Authentication logic (critical)
- `src/services/payments.ts` - Payment processing (critical)
- `src/routes/` - API endpoint definitions
- `prisma/schema.prisma` - Database schema
- `.env.example` - Environment variables template
- `jest.config.js` - Test configuration

## Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

## Current Focus

Building comprehensive test coverage for:
1. Authentication flows (login, token refresh, logout)
2. Payment processing (success, failure, edge cases)
3. User management (CRUD, validation, permissions)
4. Error handling and edge cases

When generating tests, focus on:
- Error scenarios and edge cases
- Security implications
- Database transaction handling
- External API failures
```

**Grading Notes:**
- Should include all 5 sections
- Tech stack should be accurate
- Architecture should match actual repo structure
- Commands should be correct and tested
- Testing requirements should be specific and measurable

---

### Part 4: Test Plan Draft

**Sample Test Plan:**

```markdown
# Test Plan: API Service

## Priority Levels

### P0 - Critical (Must Test)
These are core functionality that affects business operations.

1. **Authentication Flow**
   - User login with valid credentials
   - User login with invalid credentials
   - Token refresh
   - Token expiration
   - Logout
   - **Effort**: 8 hours
   - **Test Type**: Integration tests

2. **Payment Processing**
   - Successful payment
   - Payment with invalid card
   - Payment with insufficient funds
   - Payment with expired card
   - Refund processing
   - **Effort**: 12 hours
   - **Test Type**: Integration tests (with Stripe mock)

3. **User Management**
   - Create user with valid data
   - Create user with duplicate email
   - Update user profile
   - Delete user
   - **Effort**: 6 hours
   - **Test Type**: Unit + Integration tests

### P1 - Important (Should Test)
These are important features that affect user experience.

1. **Order Management**
   - Create order
   - Update order status
   - Cancel order
   - **Effort**: 8 hours
   - **Test Type**: Integration tests

2. **Error Handling**
   - 400 Bad Request responses
   - 401 Unauthorized responses
   - 403 Forbidden responses
   - 500 Server Error handling
   - **Effort**: 6 hours
   - **Test Type**: Integration tests

3. **Data Validation**
   - Email format validation
   - Password strength validation
   - Required field validation
   - **Effort**: 4 hours
   - **Test Type**: Unit tests

### P2 - Nice-to-Have (Could Test)
These are nice-to-have tests that improve coverage.

1. **Performance**
   - Response time under load
   - Database query optimization
   - **Effort**: 10 hours
   - **Test Type**: Load tests

2. **Security**
   - SQL injection prevention
   - XSS prevention
   - CSRF protection
   - **Effort**: 8 hours
   - **Test Type**: Security tests

3. **Edge Cases**
   - Very large payloads
   - Concurrent requests
   - Rate limiting
   - **Effort**: 6 hours
   - **Test Type**: Integration tests

## Recommended Test Types by Area

| Area | Unit | Integration | E2E | Load |
|------|------|-------------|-----|------|
| Authentication | ✓ | ✓ | ✓ | - |
| Payments | ✓ | ✓ | - | - |
| Users | ✓ | ✓ | ✓ | - |
| Orders | ✓ | ✓ | ✓ | - |
| Validation | ✓ | - | - | - |
| Error Handling | - | ✓ | ✓ | - |
| Performance | - | - | - | ✓ |

## Estimated Total Effort

- **P0 (Critical)**: 26 hours
- **P1 (Important)**: 18 hours
- **P2 (Nice-to-Have)**: 24 hours
- **Total**: 68 hours (~2 weeks for one developer)

## Recommended Approach

1. **Week 1**: Focus on P0 tests (authentication, payments, users)
2. **Week 2**: Add P1 tests (orders, error handling, validation)
3. **Future**: Add P2 tests (performance, security, edge cases)

## Success Criteria

- [ ] 80%+ code coverage for services
- [ ] All P0 tests passing
- [ ] All P1 tests passing
- [ ] Tests run in < 30 seconds
- [ ] No flaky tests
```

**Grading Notes:**
- Should prioritize based on business impact
- Should estimate effort realistically
- Should recommend specific test types
- Should provide clear success criteria

---

## Quiz Answer Key

### Multiple Choice Answers

1. **d** - Both Windows (winget) and Linux (apt) commands are correct
2. **b** - `gh auth login` is the correct command
3. **a** - `gh repo list org-name` lists organization repos
4. **b** - `--limit` limits the number of repositories returned
5. **b** - `gh repo clone org/repo` clones a private repo

### True/False Answers

6. **False** - GitHub CLI can access both public and private repos
7. **True** - `gh auth status` shows authentication status
8. **False** - GitHub CLI uses system credential store, not plain text
9. **True** - You can view contents without cloning using `gh api`
10. **True** - `gh repo view` shows README by default

### Short Answer Rubrics

**Question 11 (5 points)** - Three Things with GitHub CLI

Valid answers (1.67 points each):
- Create and view issues
- Create and view pull requests
- View repository details and metadata
- Create releases
- View workflow runs and logs
- Manage gists
- Create branches
- View commit history

**Question 12 (5 points)** - List 20 Recently Updated Repos

```bash
gh repo list my-org --limit 20 --sort updated
```

Scoring:
- Correct base command `gh repo list` (2 points)
- Correct org name `my-org` (1.5 points)
- Correct limit flag `--limit 20` (1.5 points)

Alternative acceptable: `gh repo list my-org --limit 20 --sort updated --order desc`

**Question 13 (5 points)** - Before Analyzing with AI

Should mention:
- Create CLAUDE.md with project context (2 points)
- Review the codebase structure and architecture (1.5 points)
- Understand tech stack and coding conventions (1.5 points)

Acceptable answers also include:
- Read the README
- Check for existing tests
- Review package.json/requirements.txt
- Look at recent commits

**Question 14 (10 points)** - Sequence of Commands

```bash
gh repo clone your-org/api-service
cd api-service
ls -la
cat README.md
find . -name "*.test.*" -o -name "*.spec.*"
```

Scoring:
- Clone command (2 points)
- Navigate into directory (2 points)
- List files command (2 points)
- View README (2 points)
- Find tests command (2 points)

Acceptable alternatives:
- `dir` instead of `ls -la` on Windows
- `gh repo view` instead of `cat README.md`
- `find . -type f -name "*test*"` for finding tests

---

## Common Student Mistakes

1. **Authentication Issues**
   - **Mistake**: Not running `gh auth login` before accessing private repos
   - **Why it's wrong**: GitHub CLI needs authentication to access private repos
   - **Fix**: Run `gh auth login` and follow the prompts

2. **Organization Access Not Granted**
   - **Mistake**: Authenticating but not granting organization access
   - **Why it's wrong**: Token might not have org access scope
   - **Fix**: Run `gh auth refresh -s read:org` to grant org access

3. **Wrong Clone Command**
   - **Mistake**: Using `git clone` instead of `gh repo clone`
   - **Why it's wrong**: `git clone` requires SSH key setup
   - **Fix**: Use `gh repo clone org/repo` for HTTPS cloning

4. **Not Creating CLAUDE.md**
   - **Mistake**: Jumping straight to analysis without context file
   - **Why it's wrong**: AI works better with project context
   - **Fix**: Create CLAUDE.md before asking AI to analyze

5. **Incomplete Repository Analysis**
   - **Mistake**: Only listing files without understanding architecture
   - **Why it's wrong**: Doesn't identify testing opportunities
   - **Fix**: Ask Claude to explain architecture, entry points, and data flow

6. **Vague Test Plan**
   - **Mistake**: "Test everything" without prioritization
   - **Why it's wrong**: Unrealistic and doesn't focus on high-impact areas
   - **Fix**: Prioritize by business impact (P0, P1, P2)

7. **Not Verifying Commands**
   - **Mistake**: Writing commands without testing them
   - **Why it's wrong**: Commands might have syntax errors
   - **Fix**: Test each command before submitting

8. **Ignoring Security**
   - **Mistake**: Sharing authentication tokens or credentials
   - **Why it's wrong**: Security risk for the organization
   - **Fix**: Never share tokens, use environment variables

9. **Not Checking Existing Tests**
   - **Mistake**: Recommending tests that already exist
   - **Why it's wrong**: Wastes effort and shows lack of analysis
   - **Fix**: Always check for existing tests before recommending new ones

10. **Incomplete CLAUDE.md**
    - **Mistake**: Missing sections or vague descriptions
    - **Why it's wrong**: AI won't have enough context for good analysis
    - **Fix**: Include all sections with specific, detailed information

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Repository Analysis | 25 | Clear categorization, good recommendations, justified priorities |
| CLAUDE.md Completeness | 35 | All sections present, accurate tech stack, clear conventions |
| Test Plan Quality | 25 | Realistic prioritization, effort estimates, clear success criteria |
| Use of AI Prompts | 15 | Effective prompts, good use of Claude for analysis |
| **Total** | **100** | |

**Passing**: 70+ points

---

## Teaching Notes

- **Emphasize security**: Remind students never to share credentials
- **Show real examples**: Use actual organization repos if possible
- **Practice iteration**: Have students refine their analysis multiple times
- **Connect to next module**: This sets up documentation generation in Module 4
- **Highlight efficiency**: Show how good CLAUDE.md saves time in analysis
