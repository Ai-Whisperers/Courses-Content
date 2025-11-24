# Module 5: Test Planning with AI - Exercises

**Total Time**: 3.5 hours
**Exercises**: 5

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Exercise Overview

| Exercise | Topic | Duration | Difficulty |
|----------|-------|----------|------------|
| 5.1 | Create Comprehensive Test Plan | 60 min | Medium |
| 5.2 | Build Coverage Matrix | 45 min | Medium |
| 5.3 | Apply Test Design Techniques | 45 min | Medium |
| 5.4 | Risk-Based Prioritization | 45 min | Medium |
| 5.5 | Test Data Planning | 45 min | Easy-Medium |

---

## Exercise 5.1: Create Comprehensive Test Plan

**Objective**: Generate a complete test plan using AI assistance

**Duration**: 60 minutes

**Difficulty**: Medium

---

### Scenario

You're the QA lead for a social media application. A new "Story" feature is being developed that allows users to:
- Create stories with images/videos (max 15 seconds)
- Add text overlays and filters
- Set story visibility (public, friends, private)
- View stories from other users
- Stories expire after 24 hours
- View story analytics (views, reactions)

### Feature Code Structure

```
src/
├── services/
│   ├── storyService.js       # Story CRUD operations
│   ├── mediaService.js        # Media upload/processing
│   └── analyticsService.js    # View tracking
├── models/
│   └── Story.js               # Story data model
└── routes/
    └── stories.js             # API endpoints
```

### Task

Create a comprehensive test plan that includes all 8 components.

### AI Prompt Template

```
Create a comprehensive test plan for a Story feature in a social media app.

**Context**:
- Feature: Stories with media upload, filters, visibility settings, 24h expiration
- Tech Stack: Node.js + Express + MongoDB + AWS S3
- Dependencies: Sharp (image processing), FFmpeg (video processing)
- User Stories:
  1. As a user, I want to create stories with photos/videos
  2. As a user, I want to control who sees my stories
  3. As a user, I want my stories to expire after 24 hours
  4. As a user, I want to see who viewed my stories

**Generate**:

## 1. Test Objectives
- Primary goals
- Quality attributes to verify
- Compliance requirements (if any)

## 2. Scope
### In Scope
- Features to test
- Platforms (web/mobile)
- User roles

### Out of Scope
- What won't be tested
- Why excluded

## 3. Test Strategy
- Test levels (unit/integration/E2E)
- Test types (functional/performance/security)
- Automation approach

## 4. Test Cases
### Unit Tests
| ID | Description | Function | Input | Expected | Priority |

### Integration Tests
| ID | Description | Components | Scenario | Expected | Priority |

### E2E Tests
| ID | User Story | Steps | Expected | Priority |

### Edge Cases
| ID | Description | Condition | Expected | Priority |

### Error Cases
| ID | Description | Error Type | Expected | Priority |

## 5. Test Data Requirements
- Valid data sets
- Invalid data sets
- Boundary values
- Special cases

## 6. Environment Requirements
- Hardware needs
- Software dependencies
- Configuration requirements

## 7. Risks and Mitigations
| Risk | Impact | Probability | Mitigation | Priority |

## 8. Schedule
- Test phases
- Dependencies
- Milestones

Prioritize: P0 (critical), P1 (high), P2 (medium), P3 (low)
```

### Deliverable

Create a file: `story-feature-TEST-PLAN.md`

Include:
- All 8 components of a test plan
- At least 20 test cases across different levels
- Clear priorities (P0-P3)
- Risk assessment with mitigation strategies
- Realistic schedule

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Test Objectives | 10 | Clear, measurable objectives linked to business goals |
| Scope Definition | 10 | Specific in-scope and out-of-scope items with rationale |
| Test Strategy | 15 | Comprehensive strategy covering levels, types, and automation |
| Test Cases | 25 | Minimum 20 test cases with clear descriptions and priorities |
| Test Data | 10 | Detailed data requirements for valid/invalid/special cases |
| Environment | 5 | Complete environment specifications |
| Risk Assessment | 15 | Risk matrix with impact, probability, and mitigations |
| Schedule | 10 | Realistic timeline with dependencies and milestones |

**Total**: 100 points

**Time Estimates:**
- AI generation: 10-15 minutes
- Review and refinement: 20-25 minutes
- Adding domain knowledge: 15-20 minutes
- Final polish: 10 minutes

---

## Exercise 5.2: Build Coverage Matrix

**Objective**: Create a test coverage matrix and identify gaps

**Duration**: 45 minutes

**Difficulty**: Medium

---

### Scenario

You've inherited a project with existing tests, but coverage is unclear. You need to:
1. Map existing tests to features
2. Identify coverage gaps
3. Prioritize missing tests
4. Estimate effort to fill gaps

### Existing Features

```
Authentication Module:
├── User Registration
├── Email Login
├── Social Login (Google, Facebook)
├── Password Reset
├── Two-Factor Authentication
└── Session Management

Profile Module:
├── View Profile
├── Edit Profile
├── Upload Profile Picture
├── Privacy Settings
└── Account Deletion

Content Module:
├── Create Post
├── Edit Post
├── Delete Post
├── Like Post
├── Comment on Post
└── Share Post
```

### Existing Test Files

```
tests/
├── unit/
│   ├── auth.test.js         (50 tests)
│   ├── profile.test.js      (25 tests)
│   └── posts.test.js        (30 tests)
├── integration/
│   ├── auth-flow.test.js    (15 tests)
│   └── posts-api.test.js    (10 tests)
└── e2e/
    └── smoke.test.js        (8 tests)
```

### Task

1. **Create Coverage Matrix**
   - Map each feature to test types
   - Mark coverage status (✅ ⚠️ ❌ N/A)

2. **Identify Gaps**
   - List missing/partial tests
   - Explain why each is needed

3. **Prioritize**
   - Assign priority (P0-P3)
   - Estimate effort (S/M/L)

4. **Create Action Plan**
   - What to test next
   - In what order
   - Time estimates

### AI Prompt Template

```
Create a test coverage matrix for a social media application.

**Features**:
[List all features from Authentication, Profile, and Content modules]

**Existing Tests**:
- Unit: 105 tests (auth, profile, posts)
- Integration: 25 tests (auth flow, posts API)
- E2E: 8 tests (smoke tests only)

**Generate**:

## 1. Coverage Matrix
| Feature | Unit | Integration | E2E | Security | Performance |
|---------|------|-------------|-----|----------|-------------|

Status:
- ✅ Covered (comprehensive tests exist)
- ⚠️ Partial (some tests, not complete)
- ❌ Missing (no tests)
- N/A (not applicable)

## 2. Gap Analysis
For each missing/partial area:
- Feature + Test Type
- Why it's needed
- Risk if not tested
- Suggested test scenarios
- Effort estimate (S: 1-2h, M: 2-4h, L: 4-8h)
- Priority (P0/P1/P2/P3)

## 3. Prioritized Action Plan
Order: P0 → P1 → P2 → P3
For each:
- What to test
- Estimated time
- Dependencies

## 4. Coverage Metrics
- Current coverage percentage by type
- Target coverage percentage
- Gap to close
```

### Deliverable

Create a file: `COVERAGE-MATRIX.md`

Include:
- Complete coverage matrix (all features × all test types)
- Gap analysis with at least 10 identified gaps
- Prioritized action plan
- Coverage metrics and goals

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Matrix Completeness | 20 | All features and test types mapped |
| Accuracy | 20 | Correct assessment of coverage status |
| Gap Identification | 25 | At least 10 gaps identified with rationale |
| Prioritization | 20 | Logical prioritization based on risk |
| Action Plan | 15 | Clear, sequenced plan with time estimates |

**Total**: 100 points

**Time Estimates:**
- Matrix creation: 15 minutes
- Gap analysis: 15 minutes
- Prioritization: 10 minutes
- Documentation: 5 minutes

---

## Exercise 5.3: Apply Test Design Techniques

**Objective**: Use multiple test design techniques systematically

**Duration**: 45 minutes

**Difficulty**: Medium

---

### Scenario

You need to test a flight booking search function with multiple inputs. Apply systematic test design techniques to ensure comprehensive coverage.

### Function Specification

```javascript
function searchFlights(params) {
  /*
   * Searches for available flights
   *
   * @param {Object} params
   * @param {string} params.origin - 3-letter airport code
   * @param {string} params.destination - 3-letter airport code
   * @param {string} params.departureDate - YYYY-MM-DD format
   * @param {string} params.returnDate - YYYY-MM-DD format (optional)
   * @param {number} params.passengers - 1-9 passengers
   * @param {string} params.class - 'economy', 'business', 'first'
   * @param {boolean} params.directOnly - filter for direct flights
   *
   * @returns {Array} matching flights
   *
   * Validations:
   * - Origin and destination must be different
   * - Dates must be future dates
   * - Return date must be after departure date
   * - Passengers between 1-9
   * - Valid airport codes (3 uppercase letters)
   */
}
```

### Task

Apply these test design techniques:

1. **Equivalence Partitioning**
   - Identify partitions for each input
   - Select test values

2. **Boundary Value Analysis**
   - Focus on passengers (1-9)
   - Focus on dates (today, future, past)

3. **Decision Table**
   - Conditions: directOnly, returnDate, class
   - Map all combinations

4. **State Transition** (optional)
   - Search states: idle → searching → results/error
   - Test valid and invalid transitions

### AI Prompt Templates

**For Equivalence Partitioning:**
```
Apply equivalence partitioning to the searchFlights function.

For each parameter:
- origin (3-letter airport code)
- destination (3-letter airport code)
- departureDate (YYYY-MM-DD)
- returnDate (YYYY-MM-DD, optional)
- passengers (1-9)
- class (economy/business/first)
- directOnly (boolean)

Generate:
1. Valid partitions
2. Invalid partitions
3. Test value for each partition
4. Expected result

Format:
| Parameter | Partition Type | Partition Description | Test Value | Expected |
```

**For Boundary Value Analysis:**
```
Apply boundary value analysis for numeric and date inputs.

Analyze:
1. passengers (1-9)
2. departureDate (relative to today)
3. returnDate (relative to departureDate)

For each, generate test values:
- Below minimum (invalid)
- At minimum (valid)
- Just above minimum (valid)
- Normal value (valid)
- Just below maximum (valid)
- At maximum (valid)
- Above maximum (invalid)
```

**For Decision Table:**
```
Create a decision table for the searchFlights function.

Conditions:
- directOnly (Y/N)
- returnDate provided (Y/N)
- class type (economy/business/first)

Generate:
1. All combinations (2 × 2 × 3 = 12 cases)
2. For each combination:
   - Test case ID
   - Input values
   - Expected filter behavior
   - Priority
```

### Deliverable

Create a file: `flight-search-TEST-CASES.md`

Include:
- Equivalence partitioning table (all parameters)
- Boundary value analysis (passengers, dates)
- Decision table (all combinations)
- Summary: total test cases, coverage by technique

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Equivalence Partitioning | 30 | All parameters analyzed, valid/invalid partitions identified |
| Boundary Value Analysis | 25 | Complete boundary tests for numeric and date inputs |
| Decision Table | 30 | All combinations mapped with expected results |
| Test Case Quality | 10 | Clear descriptions, realistic test values |
| Documentation | 5 | Well-organized, easy to follow |

**Total**: 100 points

**Time Estimates:**
- Equivalence partitioning: 15 minutes
- Boundary value analysis: 10 minutes
- Decision table: 15 minutes
- Documentation: 5 minutes

---

## Exercise 5.4: Risk-Based Prioritization

**Objective**: Prioritize tests using risk assessment

**Duration**: 45 minutes

**Difficulty**: Medium

---

### Scenario

Your team has 120 test cases for an e-commerce platform, but CI/CD time limits require different test suites. You need to:
1. Assess risk for each area
2. Assign priorities
3. Create test suites by priority
4. Define when each suite runs

### Feature Areas

```
1. User Authentication (15 tests)
   - Login, registration, password reset, 2FA

2. Product Catalog (20 tests)
   - Browse, search, filters, sorting, pagination

3. Shopping Cart (18 tests)
   - Add/remove items, quantity updates, cart persistence

4. Checkout Process (25 tests)
   - Address entry, payment processing, order confirmation

5. Order Management (15 tests)
   - Order history, tracking, cancellation, returns

6. User Profile (12 tests)
   - View/edit profile, preferences, saved addresses

7. Reviews & Ratings (10 tests)
   - Submit review, rating, helpful votes, moderation

8. Admin Dashboard (15 tests)
   - Product management, order management, analytics
```

### Task

1. **Risk Assessment**
   - Score each feature area (Impact × Likelihood × Complexity)
   - Justify scores

2. **Priority Assignment**
   - Assign P0/P1/P2/P3 to each area
   - Justify priorities

3. **Create Test Suites**
   - Smoke suite (P0, 5-10 min)
   - Regression suite (P0+P1, 30-45 min)
   - Full suite (all, 2-3 hours)

4. **Execution Schedule**
   - Define when each suite runs
   - Specify triggers (commit, PR, nightly, release)

### AI Prompt Template

```
Analyze risk and prioritize tests for an e-commerce platform.

**Feature Areas**:
[List all 8 areas with test counts]

**Consider**:
1. Business Impact (1-10)
   - Revenue loss potential
   - Customer trust impact
   - Legal/compliance risk

2. Defect Likelihood (1-10)
   - Code complexity
   - Recent changes
   - Historical bug rate
   - Integration points

3. Usage Frequency (1-10)
   - Daily active users
   - Critical user journeys
   - Peak load scenarios

**Generate**:

## 1. Risk Assessment Matrix
| Feature Area | Impact | Likelihood | Complexity | Risk Score | Justification |

Risk Score = Impact × Likelihood × Complexity

## 2. Priority Assignment
For each feature area:
- Priority (P0/P1/P2/P3)
- Number of tests
- Why this priority?

## 3. Test Suite Composition

### Smoke Suite (P0 only)
- Target time: 5-10 minutes
- Tests included: [list specific areas and test counts]
- Purpose: Critical path validation

### Regression Suite (P0 + P1)
- Target time: 30-45 minutes
- Tests included: [list areas and counts]
- Purpose: Core functionality validation

### Full Suite (All priorities)
- Target time: 2-3 hours
- Tests included: All 120 tests
- Purpose: Comprehensive validation

## 4. Execution Schedule
| Suite | When | Trigger | Must Pass |
|-------|------|---------|-----------|
| Smoke | ? | ? | Yes/No |
| Regression | ? | ? | Yes/No |
| Full | ? | ? | Yes/No |
```

### Deliverable

Create a file: `RISK-PRIORITIZATION.md`

Include:
- Risk assessment matrix with scores and justification
- Priority assignments for all feature areas
- Three test suites with composition
- Execution schedule with triggers
- Rationale for decisions

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Risk Assessment | 30 | Accurate risk scores with clear justification |
| Priority Assignment | 25 | Logical priorities aligned with risk |
| Suite Composition | 25 | Balanced suites meeting time constraints |
| Execution Schedule | 15 | Practical schedule with clear triggers |
| Documentation | 5 | Clear rationale and professional presentation |

**Total**: 100 points

**Time Estimates:**
- Risk assessment: 15 minutes
- Priority assignment: 10 minutes
- Suite creation: 15 minutes
- Documentation: 5 minutes

---

## Exercise 5.5: Test Data Planning

**Objective**: Define comprehensive test data requirements

**Duration**: 45 minutes

**Difficulty**: Easy-Medium

---

### Scenario

You're testing a user registration feature. You need to plan test data that covers all scenarios, including valid inputs, invalid inputs, boundary cases, and security tests.

### Registration Form Fields

```javascript
{
  username: {
    type: 'string',
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
    required: true,
    unique: true
  },
  email: {
    type: 'string',
    format: 'email',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    minLength: 8,
    maxLength: 128,
    required: true,
    mustContain: ['uppercase', 'lowercase', 'number', 'special']
  },
  age: {
    type: 'number',
    min: 13,
    max: 120,
    required: true
  },
  country: {
    type: 'string',
    enum: ['US', 'CA', 'UK', 'DE', 'FR', /* ... more */],
    required: true
  },
  terms: {
    type: 'boolean',
    mustBe: true,
    required: true
  }
}
```

### Task

Create a comprehensive test data plan that includes:

1. **Valid Data Sets** (normal scenarios)
2. **Invalid Data Sets** (error scenarios)
3. **Boundary Data** (edge cases)
4. **Special Cases** (security, unicode, etc.)
5. **Data Generation Strategy**

### AI Prompt Template

```
Define test data requirements for user registration.

**Fields**:
- username: 3-20 chars, alphanumeric + _ -, unique
- email: valid email format, unique
- password: 8-128 chars, must have upper/lower/number/special
- age: 13-120
- country: predefined list
- terms: must be true

**Generate**:

## 1. Valid Data Sets
| Scenario | Username | Email | Password | Age | Country | Terms | Purpose |
|----------|----------|-------|----------|-----|---------|-------|---------|

Include:
- Typical user
- Minimum valid values
- Maximum valid values
- Different country codes

## 2. Invalid Data Sets
| Scenario | Invalid Field | Value | Expected Error |
|----------|---------------|-------|----------------|

Include:
- Missing required fields
- Format violations
- Uniqueness violations
- Business rule violations

## 3. Boundary Data
| Field | Boundary Type | Test Value | Expected Result |
|-------|---------------|------------|-----------------|

For each field with min/max:
- Below minimum
- At minimum
- At maximum
- Above maximum

## 4. Special Cases

### Empty/Null Values
- Test each field with null, undefined, empty string

### Special Characters
- Unicode characters
- Emoji
- SQL injection attempts
- XSS payloads
- Script tags

### Edge Cases
- Very long strings
- Whitespace handling
- Case sensitivity
- Leading/trailing spaces

## 5. Performance Data
- Minimum dataset: 10 users
- Typical dataset: 1,000 users
- Load test dataset: 100,000 users

## 6. Data Generation Strategy

### Factories
```javascript
// Example factory structure
createValidUser()
createInvalidUser(invalidField)
createBoundaryUser(boundaryType)
```

### Fixtures
- Pre-seeded users for specific scenarios
- Known usernames for uniqueness tests

### Cleanup
- Delete test users after each test
- Reset auto-increment IDs
- Clear email verification tokens
```

### Deliverable

Create a file: `registration-TEST-DATA.md`

Include:
- At least 10 valid data sets
- At least 15 invalid data sets
- Complete boundary analysis for all fields
- Special cases section with security tests
- Data generation strategy with code examples

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Valid Data Sets | 15 | Comprehensive coverage of normal scenarios |
| Invalid Data Sets | 20 | Thorough error scenario coverage |
| Boundary Analysis | 20 | Complete boundary tests for all constrained fields |
| Special Cases | 25 | Security, unicode, edge cases identified |
| Generation Strategy | 15 | Practical approach with factories/fixtures |
| Documentation | 5 | Clear, organized, easy to implement |

**Total**: 100 points

**Time Estimates:**
- Valid data sets: 10 minutes
- Invalid data sets: 10 minutes
- Boundary analysis: 10 minutes
- Special cases: 10 minutes
- Generation strategy: 5 minutes

---

## Submission Guidelines

### File Naming Convention
```
exercise-5.1-story-TEST-PLAN.md
exercise-5.2-COVERAGE-MATRIX.md
exercise-5.3-flight-search-TEST-CASES.md
exercise-5.4-RISK-PRIORITIZATION.md
exercise-5.5-registration-TEST-DATA.md
```

### Submission Checklist

For each exercise, ensure:
- [ ] All sections completed
- [ ] AI prompts documented
- [ ] AI outputs included (or referenced)
- [ ] Personal refinements highlighted
- [ ] Professional formatting
- [ ] Clear and specific
- [ ] Ready for implementation

### Where to Submit
- Upload to: [Learning Management System]
- Or: Create PR to course repository
- Include: All 5 exercise files + README.md with reflections

---

## Evaluation Summary

| Exercise | Points | Weight |
|----------|--------|--------|
| 5.1 - Test Plan | 100 | 25% |
| 5.2 - Coverage Matrix | 100 | 20% |
| 5.3 - Design Techniques | 100 | 25% |
| 5.4 - Prioritization | 100 | 20% |
| 5.5 - Test Data | 100 | 10% |
| **Total** | **500** | **100%** |

**Passing Score**: 350/500 (70%)

---

## Tips for Success

1. **Use AI, Don't Copy AI**
   - Start with AI generation
   - Review critically
   - Add domain knowledge
   - Refine for your context

2. **Be Specific**
   - Vague prompts = vague plans
   - Include code, constraints, context
   - Specify exact formats

3. **Think Systematically**
   - Use design techniques methodically
   - Don't guess scenarios
   - Document your reasoning

4. **Prioritize Ruthlessly**
   - Not everything is P0
   - Consider real risks
   - Be honest about trade-offs

5. **Make It Actionable**
   - Test plans should be implementable
   - Data specs should be codeable
   - Priorities should drive decisions

---

**Ready to start? Begin with Exercise 5.1!**

[Back to Module Overview](./MODULE-OVERVIEW.md)
