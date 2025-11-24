# Module 5: Test Planning with AI - Code Examples

**Reference Material**

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Table of Contents

1. [Complete Test Plan Templates](#1-complete-test-plan-templates)
2. [Test Coverage Matrix Examples](#2-test-coverage-matrix-examples)
3. [Equivalence Partitioning Examples](#3-equivalence-partitioning-examples)
4. [Boundary Value Analysis Examples](#4-boundary-value-analysis-examples)
5. [Decision Table Examples](#5-decision-table-examples)
6. [Risk Assessment Matrices](#6-risk-assessment-matrices)
7. [Test Data Specifications](#7-test-data-specifications)
8. [AI Prompts Library](#8-ai-prompts-library)

---

## 1. Complete Test Plan Templates

### Template 1: Feature Test Plan

```markdown
# Test Plan: [Feature Name]

**Version**: 1.0
**Date**: [YYYY-MM-DD]
**Author**: [Your Name]
**Status**: Draft | Review | Approved

---

## 1. Test Objectives

### Primary Goals
- [ ] Verify [feature] works correctly for all user scenarios
- [ ] Ensure [feature] integrates properly with [system]
- [ ] Validate [feature] meets performance requirements (<Xms response time)
- [ ] Confirm [feature] handles errors gracefully

### Quality Attributes
- **Functionality**: All user stories satisfied
- **Reliability**: 99.9% uptime, graceful degradation
- **Performance**: < Xms response time, handles Y concurrent users
- **Security**: Authentication, authorization, data encryption
- **Usability**: Intuitive UI, clear error messages

### Compliance Requirements
- [ ] WCAG 2.1 AA accessibility standards
- [ ] GDPR data privacy requirements
- [ ] PCI DSS for payment data (if applicable)

---

## 2. Scope

### In Scope

**Features to Test**:
- Feature A: [description]
- Feature B: [description]
- Feature C: [description]

**Test Types**:
- Functional testing (unit, integration, E2E)
- Error handling and validation
- Security testing (authentication, authorization, input validation)
- Performance testing (load, stress)
- Usability testing (if applicable)

**Platforms/Browsers**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest version)
- Mobile: iOS Safari, Chrome Android

**User Roles**:
- Guest user
- Authenticated user
- Admin user

### Out of Scope

**Not Tested**:
- Third-party service internals (will be mocked)
- Legacy browser support (IE11)
- Features not yet implemented ([list])
- [Other exclusions]

**Rationale**:
- Third-party services: Tested by vendors, we test integration only
- IE11: < 1% user base, not supported per business decision
- Legacy features: Covered by existing test suite

---

## 3. Test Strategy

### Test Levels

#### Unit Tests
**Purpose**: Test individual functions in isolation

**Approach**:
- Test each function with valid inputs
- Test each function with invalid inputs
- Test edge cases and boundary conditions
- Mock all external dependencies

**Coverage Target**: 80% line coverage, 70% branch coverage

**Framework**: Jest (JavaScript) | pytest (Python) | JUnit (Java)

#### Integration Tests
**Purpose**: Test components working together

**Approach**:
- Test API endpoints with real database
- Test service interactions
- Test data flow between layers
- Mock external APIs only

**Coverage Target**: Critical paths covered

**Framework**: Supertest (API) | pytest (Python) | Spring Boot Test (Java)

#### E2E Tests
**Purpose**: Test complete user journeys

**Approach**:
- Test happy path scenarios
- Test critical error scenarios
- Use realistic test data
- Run against staging environment

**Coverage Target**: All P0/P1 user journeys

**Framework**: Playwright | Cypress | Selenium

### Test Types

#### Functional Testing
- Verify all requirements are met
- Test positive and negative scenarios
- Validate business rules

#### Error Handling Testing
- Invalid input handling
- System error handling (DB, network failures)
- User-friendly error messages

#### Security Testing
- Authentication bypass attempts
- Authorization checks
- Input validation (SQL injection, XSS)
- Data encryption verification

#### Performance Testing
- Load testing (expected traffic)
- Stress testing (peak traffic)
- Endurance testing (sustained load)
- Response time verification

---

## 4. Test Cases

### Unit Tests

| ID | Description | Function | Input | Expected Output | Priority |
|----|-------------|----------|-------|-----------------|----------|
| UT-001 | Validate successful [operation] | `functionName()` | Valid data | Expected result | P0 |
| UT-002 | Handle invalid input | `functionName()` | Invalid data | Error thrown | P0 |
| UT-003 | Handle edge case | `functionName()` | Edge case | Expected behavior | P1 |

### Integration Tests

| ID | Description | Components | Scenario | Expected Result | Priority |
|----|-------------|------------|----------|-----------------|----------|
| IT-001 | [Feature] end-to-end flow | Service A + Service B | User performs [action] | Success response | P0 |
| IT-002 | Error propagation | Service A + Service B | Service B fails | Error handled gracefully | P1 |

### E2E Tests

| ID | User Story | Steps | Expected Result | Priority |
|----|------------|-------|-----------------|----------|
| E2E-001 | As a user, I want to [action] | 1. Navigate<br>2. Click<br>3. Fill form | [Outcome] | P0 |
| E2E-002 | As a user, I want to [action] | 1. ...<br>2. ... | [Outcome] | P1 |

### Edge Cases

| ID | Description | Condition | Expected Result | Priority |
|----|-------------|-----------|-----------------|----------|
| EC-001 | Empty input | User submits empty form | Validation error shown | P1 |
| EC-002 | Maximum length input | Input at max length | Accepted | P2 |
| EC-003 | Special characters | Input with special chars | Handled correctly | P2 |

### Error Cases

| ID | Description | Error Type | Expected Result | Priority |
|----|-------------|------------|-----------------|----------|
| ERR-001 | Database failure | Connection timeout | User-friendly error, retry option | P0 |
| ERR-002 | API timeout | External API timeout | Fallback behavior or error message | P1 |

---

## 5. Test Data Requirements

### Valid Data Sets

| Scenario | Data Description | Purpose |
|----------|------------------|---------|
| Happy path | Standard user, valid inputs | Verify normal operation |
| Multiple variations | Different user types, configs | Verify flexibility |
| Boundary values | Min/max valid values | Verify limits |

### Invalid Data Sets

| Scenario | Invalid Data | Expected Error |
|----------|--------------|----------------|
| Missing required field | Field left empty | "Field X is required" |
| Invalid format | Incorrect data format | "Invalid format for X" |
| Out of range | Value too high/low | "Value must be between X and Y" |

### Special Cases

- **Empty/Null**: Test with null, undefined, empty string
- **Special Characters**: Test with `<>'"&;()`, SQL keywords, script tags
- **Unicode**: Test with emoji, international characters
- **Large Data**: Test with very long strings, large datasets
- **Security**: Test with SQL injection, XSS payloads

---

## 6. Environment Requirements

### Hardware
- Web Server: 2 vCPU, 4GB RAM
- Database: 2 vCPU, 8GB RAM
- Load Balancer: (if applicable)

### Software
- OS: Ubuntu 20.04 LTS
- Node.js: v18.x
- PostgreSQL: v14.x
- Redis: v7.x (if applicable)

### Configuration
- Environment variables: [list key vars]
- Feature flags: [list flags]
- Test accounts: [list test user credentials]

### External Dependencies
- Payment Gateway: Stripe Test Mode
- Email Service: SendGrid Test Mode
- Third-party APIs: Mock servers or test environments

---

## 7. Risks and Mitigations

| Risk | Impact | Probability | Mitigation | Priority |
|------|--------|-------------|------------|----------|
| Payment processing failure | High | Medium | Comprehensive payment tests, error handling | P0 |
| Database performance | Medium | High | Performance tests, query optimization | P1 |
| Third-party API downtime | Medium | Medium | Mock services, retry logic | P1 |
| Security vulnerability | High | Low | Security testing, code review | P0 |

**Risk Scoring**: Impact × Probability (High=3, Medium=2, Low=1)

---

## 8. Schedule

### Test Phases

| Phase | Duration | Start Date | End Date | Deliverables |
|-------|----------|------------|----------|--------------|
| Test Planning | 2 days | [Date] | [Date] | This test plan |
| Test Case Design | 3 days | [Date] | [Date] | Detailed test cases |
| Test Implementation | 5 days | [Date] | [Date] | Automated tests |
| Test Execution | 3 days | [Date] | [Date] | Test results |
| Bug Fixing | 3 days | [Date] | [Date] | Bug fixes |
| Regression Testing | 2 days | [Date] | [Date] | Final sign-off |

### Dependencies
- [ ] Feature development complete
- [ ] Test environment available
- [ ] Test data prepared
- [ ] Test tools configured

### Milestones
- [ ] Test plan approved
- [ ] Unit tests complete (80% coverage)
- [ ] Integration tests complete
- [ ] E2E tests complete
- [ ] All P0/P1 bugs fixed
- [ ] Feature ready for production

---

## 9. Entry and Exit Criteria

### Entry Criteria (Start Testing)
- [ ] Feature development complete
- [ ] Code reviewed and merged
- [ ] Deployed to test environment
- [ ] Test data available

### Exit Criteria (Stop Testing)
- [ ] All P0 test cases pass
- [ ] 95%+ of P1 test cases pass
- [ ] No open P0 bugs
- [ ] P1 bugs documented and prioritized
- [ ] Performance meets requirements
- [ ] Security tests pass
- [ ] Stakeholder approval

---

## 10. Test Deliverables

- [ ] Test plan (this document)
- [ ] Test cases (detailed specifications)
- [ ] Test scripts (automated tests)
- [ ] Test data (fixtures, factories)
- [ ] Test results (pass/fail reports)
- [ ] Bug reports (if any)
- [ ] Test coverage report
- [ ] Test summary report

---

## Appendix

### A. Glossary
- **P0**: Critical priority, must fix
- **P1**: High priority, should fix
- **P2**: Medium priority, nice to fix
- **P3**: Low priority, can defer

### B. References
- Requirements document: [link]
- API documentation: [link]
- Architecture diagram: [link]

### C. Approvals

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | | | |
| Dev Lead | | | |
| Product Owner | | | |

---

**Document History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Name] | Initial version |
```

---

## 2. Test Coverage Matrix Examples

### Example 1: E-Commerce Features

```markdown
# Test Coverage Matrix: E-Commerce Platform

## Feature Coverage

| Feature | Unit | Integration | E2E | Security | Performance | Status |
|---------|------|-------------|-----|----------|-------------|--------|
| User Registration | ✅ | ✅ | ✅ | ⚠️ | N/A | 85% |
| User Login | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| Password Reset | ✅ | ❌ | ❌ | ⚠️ | N/A | 40% |
| Product Catalog | ✅ | ✅ | ⚠️ | N/A | ⚠️ | 70% |
| Product Search | ✅ | ⚠️ | ✅ | N/A | ❌ | 65% |
| Shopping Cart | ✅ | ✅ | ✅ | ⚠️ | N/A | 85% |
| Checkout | ✅ | ⚠️ | ❌ | ❌ | N/A | 55% |
| Payment Processing | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | 80% |
| Order Management | ✅ | ⚠️ | ❌ | ⚠️ | N/A | 60% |
| Admin Dashboard | ⚠️ | ❌ | ❌ | ❌ | N/A | 25% |

**Legend:**
- ✅ Covered (comprehensive tests)
- ⚠️ Partial (some coverage, needs more)
- ❌ Missing (no tests)
- N/A (not applicable)

## Gap Analysis

### High Priority Gaps (P0/P1)

#### 1. Checkout - E2E Tests (Missing)
- **Why**: Critical revenue path
- **Risk**: High - checkout failures = lost sales
- **Suggested Tests**:
  - Complete checkout flow (guest user)
  - Complete checkout flow (authenticated user)
  - Checkout with different payment methods
  - Checkout error handling
- **Effort**: Large (6-8 hours)
- **Priority**: P0

#### 2. Checkout - Security Tests (Missing)
- **Why**: Handles sensitive payment data
- **Risk**: High - security breach, compliance violation
- **Suggested Tests**:
  - Authorization checks (can't checkout other user's cart)
  - Payment data encryption
  - SQL injection prevention
  - XSS prevention
- **Effort**: Medium (4 hours)
- **Priority**: P0

#### 3. Password Reset - Integration Tests (Missing)
- **Why**: Critical security feature
- **Risk**: Medium - account takeover if broken
- **Suggested Tests**:
  - Token generation and expiration
  - Email sending integration
  - Password update integration
- **Effort**: Medium (3-4 hours)
- **Priority**: P1

#### 4. Admin Dashboard - All Tests (Mostly Missing)
- **Why**: Sensitive operations, multiple features
- **Risk**: Medium - incorrect data management
- **Suggested Tests**:
  - Unit tests for data transformations
  - Integration tests for CRUD operations
  - E2E tests for critical workflows
  - Security tests for authorization
- **Effort**: Large (8-10 hours)
- **Priority**: P1

### Medium Priority Gaps (P2)

#### 5. Product Search - Performance Tests (Missing)
- **Why**: User experience degradation with slow search
- **Risk**: Medium - poor UX, user frustration
- **Suggested Tests**:
  - Search with large catalog (10k+ products)
  - Concurrent user search
  - Complex filter combinations
- **Effort**: Small (2 hours)
- **Priority**: P2

## Coverage Summary

| Test Type | Covered | Partial | Missing | Total | Coverage % |
|-----------|---------|---------|---------|-------|------------|
| Unit | 10 | 1 | 0 | 10 | 95% |
| Integration | 6 | 4 | 2 | 10 | 70% |
| E2E | 5 | 2 | 3 | 10 | 60% |
| Security | 2 | 5 | 3 | 10 | 45% |
| Performance | 2 | 3 | 2 | 7 | 50% |

**Overall Coverage**: 64%
**Target Coverage**: 80%
**Gap**: 16 percentage points

## Action Plan

### Sprint 1 (Week 1-2)
- [ ] Checkout E2E tests (P0)
- [ ] Checkout security tests (P0)
- **Estimated Effort**: 10-12 hours

### Sprint 2 (Week 3-4)
- [ ] Password reset integration tests (P1)
- [ ] Admin dashboard unit tests (P1)
- **Estimated Effort**: 7-8 hours

### Sprint 3 (Week 5-6)
- [ ] Admin dashboard integration & E2E tests (P1)
- [ ] Product search performance tests (P2)
- **Estimated Effort**: 10-12 hours

**Total Effort**: 27-32 hours over 6 weeks
```

### Example 2: Traceability Matrix

```markdown
# Traceability Matrix: User Authentication

| Test ID | Requirement | User Story | Code Path | Test Type | Priority | Status |
|---------|-------------|------------|-----------|-----------|----------|--------|
| UT-001 | REQ-123 | US-45 | auth/login.js:34 | Unit | P0 | ✅ Pass |
| UT-002 | REQ-123 | US-45 | auth/login.js:56 | Unit | P0 | ✅ Pass |
| UT-003 | REQ-124 | US-46 | auth/register.js:23 | Unit | P0 | ✅ Pass |
| IT-001 | REQ-123 | US-45 | auth/* + db/* | Integration | P0 | ✅ Pass |
| IT-002 | REQ-125 | US-47 | auth/password.js:89 | Integration | P1 | ❌ Missing |
| E2E-001 | REQ-123 | US-45 | Full login flow | E2E | P0 | ✅ Pass |
| E2E-002 | REQ-124 | US-46 | Full registration | E2E | P0 | ⚠️ Partial |
| SEC-001 | REQ-126 | - | auth/* | Security | P0 | ✅ Pass |
| SEC-002 | REQ-127 | - | auth/password.js | Security | P1 | ❌ Missing |

**Coverage by Requirement:**
- REQ-123 (Login): 4/4 tests (100%)
- REQ-124 (Registration): 2/3 tests (67%)
- REQ-125 (Password Reset): 0/2 tests (0%)
- REQ-126 (Authentication Security): 1/1 tests (100%)
- REQ-127 (Password Security): 0/2 tests (0%)
```

---

## 3. Equivalence Partitioning Examples

### Example 1: Age Input Field

```markdown
## Equivalence Partitioning: Age Input

**Field**: User Age
**Type**: Integer
**Constraints**: 13-120 (users must be 13+, max realistic age 120)

### Partitions

| Partition ID | Type | Description | Range | Test Value | Expected Result |
|--------------|------|-------------|-------|------------|-----------------|
| EP-001 | Invalid | Below minimum | < 13 | 5 | Error: "Must be 13 or older" |
| EP-002 | Invalid | Below minimum | < 13 | 0 | Error: "Must be 13 or older" |
| EP-003 | Invalid | Negative | < 0 | -5 | Error: "Invalid age" |
| EP-004 | Valid | Minor | 13-17 | 15 | Accept, flag as minor |
| EP-005 | Valid | Adult | 18-65 | 30 | Accept, standard user |
| EP-006 | Valid | Senior | 66-120 | 70 | Accept, flag as senior |
| EP-007 | Invalid | Above maximum | > 120 | 150 | Error: "Invalid age" |
| EP-008 | Invalid | Non-numeric | N/A | "twenty" | Error: "Age must be a number" |
| EP-009 | Invalid | Decimal | N/A | 25.5 | Error: "Age must be a whole number" |

### Test Cases

```javascript
describe('Age validation', () => {
  // Invalid partitions
  test('EP-001: Rejects age below minimum (5)', () => {
    expect(() => validateAge(5)).toThrow('Must be 13 or older');
  });

  test('EP-003: Rejects negative age (-5)', () => {
    expect(() => validateAge(-5)).toThrow('Invalid age');
  });

  // Valid partitions
  test('EP-004: Accepts minor (15)', () => {
    const result = validateAge(15);
    expect(result.valid).toBe(true);
    expect(result.category).toBe('minor');
  });

  test('EP-005: Accepts adult (30)', () => {
    const result = validateAge(30);
    expect(result.valid).toBe(true);
    expect(result.category).toBe('adult');
  });

  test('EP-006: Accepts senior (70)', () => {
    const result = validateAge(70);
    expect(result.valid).toBe(true);
    expect(result.category).toBe('senior');
  });

  // Invalid partitions
  test('EP-007: Rejects age above maximum (150)', () => {
    expect(() => validateAge(150)).toThrow('Invalid age');
  });

  test('EP-008: Rejects non-numeric input', () => {
    expect(() => validateAge('twenty')).toThrow('Age must be a number');
  });
});
```
```

### Example 2: Email Input Field

```markdown
## Equivalence Partitioning: Email Input

**Field**: Email Address
**Type**: String
**Constraints**: Valid email format (RFC 5322)

### Partitions

| Partition ID | Type | Description | Test Value | Expected Result |
|--------------|------|-------------|------------|-----------------|
| EP-010 | Valid | Standard email | user@example.com | Accept |
| EP-011 | Valid | With subdomain | user@mail.example.com | Accept |
| EP-012 | Valid | With numbers | user123@example.com | Accept |
| EP-013 | Valid | With dots | first.last@example.com | Accept |
| EP-014 | Valid | With plus | user+tag@example.com | Accept |
| EP-015 | Valid | With hyphen | user@my-domain.com | Accept |
| EP-016 | Invalid | Missing @ | userexample.com | Error: "Invalid email format" |
| EP-017 | Invalid | Missing domain | user@ | Error: "Invalid email format" |
| EP-018 | Invalid | Missing local | @example.com | Error: "Invalid email format" |
| EP-019 | Invalid | Double @ | user@@example.com | Error: "Invalid email format" |
| EP-020 | Invalid | Spaces | user @example.com | Error: "Invalid email format" |
| EP-021 | Invalid | Special chars | user#$%@example.com | Error: "Invalid email format" |
| EP-022 | Invalid | No TLD | user@example | Error: "Invalid email format" |
```

---

## 4. Boundary Value Analysis Examples

### Example 1: Password Length

```markdown
## Boundary Value Analysis: Password Length

**Field**: Password
**Type**: String
**Constraints**: 8-30 characters

### Boundary Values

| Boundary Type | Test Value | Length | Expected Result | Test ID |
|---------------|------------|--------|-----------------|---------|
| Below minimum | "Pass123" | 7 | Error: "Password must be at least 8 characters" | BVA-001 |
| At minimum | "Pass1234" | 8 | Accept | BVA-002 |
| Just above minimum | "Pass12345" | 9 | Accept | BVA-003 |
| Normal value | "MySecurePassword123" | 19 | Accept | BVA-004 |
| Just below maximum | "MyVeryLongSecurePassword1234" | 29 | Accept | BVA-005 |
| At maximum | "MyVeryLongSecurePassword12345" | 30 | Accept | BVA-006 |
| Above maximum | "MyVeryLongSecurePassword123456" | 31 | Error: "Password must be 30 characters or less" | BVA-007 |

### Test Implementation

```javascript
describe('Password length boundary tests', () => {
  test('BVA-001: Rejects password below minimum (7 chars)', () => {
    expect(() => validatePassword('Pass123'))
      .toThrow('Password must be at least 8 characters');
  });

  test('BVA-002: Accepts password at minimum (8 chars)', () => {
    expect(validatePassword('Pass1234')).toBeTruthy();
  });

  test('BVA-003: Accepts password just above minimum (9 chars)', () => {
    expect(validatePassword('Pass12345')).toBeTruthy();
  });

  test('BVA-004: Accepts normal length password (19 chars)', () => {
    expect(validatePassword('MySecurePassword123')).toBeTruthy();
  });

  test('BVA-005: Accepts password just below maximum (29 chars)', () => {
    expect(validatePassword('MyVeryLongSecurePassword1234')).toBeTruthy();
  });

  test('BVA-006: Accepts password at maximum (30 chars)', () => {
    expect(validatePassword('MyVeryLongSecurePassword12345')).toBeTruthy();
  });

  test('BVA-007: Rejects password above maximum (31 chars)', () => {
    expect(() => validatePassword('MyVeryLongSecurePassword123456'))
      .toThrow('Password must be 30 characters or less');
  });
});
```
```

### Example 2: Quantity Input

```markdown
## Boundary Value Analysis: Order Quantity

**Field**: Item Quantity
**Type**: Integer
**Constraints**: 1-999 per item

### Boundary Values

| Boundary Type | Test Value | Expected Result | Test ID |
|---------------|------------|-----------------|---------|
| Below minimum | 0 | Error: "Quantity must be at least 1" | BVA-010 |
| At minimum | 1 | Accept | BVA-011 |
| Just above minimum | 2 | Accept | BVA-012 |
| Normal value | 50 | Accept | BVA-013 |
| Just below maximum | 998 | Accept | BVA-014 |
| At maximum | 999 | Accept | BVA-015 |
| Above maximum | 1000 | Error: "Quantity cannot exceed 999" | BVA-016 |
| Negative | -1 | Error: "Quantity must be positive" | BVA-017 |
| Decimal | 5.5 | Error: "Quantity must be a whole number" | BVA-018 |
```

---

## 5. Decision Table Examples

### Example 1: Login Scenarios

```markdown
## Decision Table: Login Feature

### Conditions
1. Username exists (Y/N)
2. Password correct (Y/N)
3. Account active (Y/N)
4. 2FA enabled (Y/N)

### Actions
- Grant access
- Show 2FA prompt
- Show error message
- Lock account
- Log attempt

### Decision Table

| TC ID | User Exists | Password OK | Account Active | 2FA Enabled | Grant Access | Show 2FA | Show Error | Lock Account | Priority |
|-------|-------------|-------------|----------------|-------------|--------------|----------|------------|--------------|----------|
| DT-001 | Y | Y | Y | Y | | ✓ | | | P0 |
| DT-002 | Y | Y | Y | N | ✓ | | | | P0 |
| DT-003 | Y | Y | N | - | | | Inactive | | P0 |
| DT-004 | Y | N | Y | - | | | Wrong password | Maybe* | P0 |
| DT-005 | Y | N | N | - | | | Inactive | | P1 |
| DT-006 | N | - | - | - | | | User not found | | P0 |

*After 3 failed attempts

### Test Implementation

```javascript
describe('Login decision table tests', () => {
  test('DT-001: Existing user, correct password, active, 2FA enabled → Show 2FA', async () => {
    const user = createUser({ has2FA: true, active: true });
    const result = await login(user.email, 'correctPassword');
    expect(result.requiresTwoFactor).toBe(true);
    expect(result.accessGranted).toBe(false);
  });

  test('DT-002: Existing user, correct password, active, no 2FA → Grant access', async () => {
    const user = createUser({ has2FA: false, active: true });
    const result = await login(user.email, 'correctPassword');
    expect(result.accessGranted).toBe(true);
    expect(result.token).toBeDefined();
  });

  test('DT-003: Existing user, correct password, inactive → Show error', async () => {
    const user = createUser({ active: false });
    await expect(login(user.email, 'correctPassword'))
      .rejects.toThrow('Account is inactive');
  });

  test('DT-004: Existing user, wrong password → Show error, maybe lock', async () => {
    const user = createUser({ active: true, failedAttempts: 0 });
    await expect(login(user.email, 'wrongPassword'))
      .rejects.toThrow('Invalid credentials');
    // After 3 attempts, account should lock
  });

  test('DT-006: Non-existing user → Show error', async () => {
    await expect(login('nonexistent@example.com', 'anyPassword'))
      .rejects.toThrow('Invalid credentials');
  });
});
```
```

### Example 2: Discount Calculation

```markdown
## Decision Table: Discount Application

### Conditions
1. Customer type (Regular/VIP/Employee)
2. Order value (< $50 / $50-$200 / > $200)
3. Coupon valid (Y/N)
4. First purchase (Y/N)

### Actions
- Apply standard discount
- Apply VIP discount
- Apply employee discount
- Apply coupon
- Apply first purchase bonus
- Combine discounts

### Simplified Table (Key scenarios)

| TC ID | Customer | Order Value | Valid Coupon | First Purchase | Standard % | VIP % | Employee % | Coupon | First Purchase Bonus | Priority |
|-------|----------|-------------|--------------|----------------|------------|-------|------------|--------|----------------------|----------|
| DT-010 | Regular | < $50 | N | N | 0% | - | - | - | - | P1 |
| DT-011 | Regular | $50-$200 | N | N | 5% | - | - | - | - | P1 |
| DT-012 | Regular | > $200 | N | N | 10% | - | - | - | - | P1 |
| DT-013 | VIP | $50-$200 | N | N | - | 15% | - | - | - | P0 |
| DT-014 | Employee | Any | N | N | - | - | 30% | - | - | P1 |
| DT-015 | Regular | > $200 | Y | N | 10% | - | - | $20 | - | P0 |
| DT-016 | Regular | > $200 | N | Y | 10% | - | - | - | $10 | P0 |
| DT-017 | VIP | > $200 | Y | Y | - | 15% | - | $20 | $10 | P0 |

Note: Discounts combine in order: Base → Coupon → First Purchase Bonus
```

---

## 6. Risk Assessment Matrices

### Example 1: Feature Risk Matrix

```markdown
# Risk Assessment Matrix: E-Commerce Features

| Feature | Business Impact (1-10) | Technical Risk (1-10) | Usage Frequency (1-10) | Risk Score | Priority | Justification |
|---------|------------------------|----------------------|------------------------|------------|----------|---------------|
| Payment Processing | 10 | 8 | 9 | 720 | P0 | Critical revenue path, external API, used by all purchasing customers |
| User Authentication | 9 | 6 | 10 | 540 | P0 | Security critical, moderate complexity, every user logs in |
| Checkout Flow | 9 | 7 | 9 | 567 | P0 | Direct revenue impact, complex logic, high usage |
| Shopping Cart | 7 | 5 | 9 | 315 | P1 | Important for sales, moderate complexity, high usage |
| Product Search | 6 | 6 | 8 | 288 | P1 | Affects UX and sales, moderate complexity, high usage |
| Order History | 5 | 4 | 7 | 140 | P2 | Supports customer service, low complexity, regular usage |
| Wish List | 3 | 3 | 4 | 36 | P2 | Nice-to-have feature, simple, low usage |
| Product Reviews | 4 | 4 | 5 | 80 | P2 | Helps conversions, moderate complexity, occasional usage |
| Email Notifications | 6 | 5 | 8 | 240 | P1 | Important for customer communication, external service |
| Admin Dashboard | 7 | 6 | 3 | 126 | P2 | Important for operations, complex, low frequency (admin only) |

**Risk Score Formula**: Business Impact × Technical Risk × Usage Frequency

**Priority Assignment**:
- P0: Risk Score > 500 (Critical features)
- P1: Risk Score 200-500 (Important features)
- P2: Risk Score 100-199 (Secondary features)
- P3: Risk Score < 100 (Nice-to-have features)

### Risk Scoring Criteria

#### Business Impact (1-10)
- 10: Critical revenue/security
- 7-9: Major impact on business
- 4-6: Moderate impact
- 1-3: Minor impact

#### Technical Risk (1-10)
- 10: Very complex, many dependencies, new tech
- 7-9: Complex, multiple integrations
- 4-6: Moderate complexity
- 1-3: Simple, well-understood

#### Usage Frequency (1-10)
- 10: Every user, every session
- 7-9: Most users, frequent
- 4-6: Some users, occasional
- 1-3: Few users, rare
```

### Example 2: Test Prioritization Matrix

```markdown
# Test Prioritization Matrix

## Smoke Test Suite (P0 Only - 5-10 min)

| Feature | Test Count | Time (min) | Must Pass |
|---------|------------|------------|-----------|
| Payment Processing | 3 | 2 | Yes |
| User Authentication | 2 | 1 | Yes |
| Checkout Flow | 4 | 3 | Yes |
| **Total** | **9** | **6** | **100%** |

### Test IDs
- PAY-001: Process credit card payment (success)
- PAY-002: Handle declined payment
- PAY-003: Verify payment confirmation
- AUTH-001: Login with valid credentials
- AUTH-002: Reject invalid credentials
- CHK-001: Complete checkout (happy path)
- CHK-002: Validate cart before checkout
- CHK-003: Calculate totals correctly
- CHK-004: Create order record

---

## Regression Suite (P0 + P1 - 30-45 min)

| Feature | P0 Tests | P1 Tests | Total | Time (min) |
|---------|----------|----------|-------|------------|
| Payment Processing | 3 | 5 | 8 | 5 |
| User Authentication | 2 | 6 | 8 | 4 |
| Checkout Flow | 4 | 8 | 12 | 7 |
| Shopping Cart | 0 | 10 | 10 | 6 |
| Product Search | 0 | 8 | 8 | 5 |
| Email Notifications | 0 | 5 | 5 | 3 |
| **Total** | **9** | **42** | **51** | **30** |

---

## Full Suite (All Priorities - 2-3 hours)

| Priority | Test Count | Time (min) |
|----------|------------|------------|
| P0 | 9 | 6 |
| P1 | 42 | 24 |
| P2 | 65 | 60 |
| P3 | 24 | 30 |
| **Total** | **140** | **120** |

---

## Execution Schedule

| Suite | When | Trigger | Blocking | Time Limit | On Failure |
|-------|------|---------|----------|------------|------------|
| Smoke | Every commit | Pre-commit hook | Yes | 10 min | Block commit |
| Smoke | Every push | CI pipeline | Yes | 10 min | Block merge |
| Regression | Every PR | CI pipeline | Yes | 45 min | Block merge |
| Full | Nightly | Cron job | No | 3 hours | Alert team |
| Full | Pre-release | Manual trigger | Yes | 3 hours | Block release |
```

---

## 7. Test Data Specifications

### Example 1: User Test Data

```markdown
# Test Data: Users

## Valid User Profiles

| User ID | Type | Username | Email | Age | Status | Payment Methods | Purpose |
|---------|------|----------|-------|-----|--------|----------------|---------|
| USR-001 | New | newuser123 | new@test.com | 25 | Active | None | First-time user flows |
| USR-002 | Regular | johndoe | john@test.com | 35 | Active | Credit Card | Standard user scenarios |
| USR-003 | VIP | vipcustomer | vip@test.com | 45 | Active | Credit Card, PayPal | VIP discount testing |
| USR-004 | Employee | employee001 | emp@company.com | 30 | Active | Credit Card | Employee discount testing |
| USR-005 | Inactive | inactiveuser | inactive@test.com | 28 | Inactive | Credit Card | Inactive account handling |
| USR-006 | Suspended | suspended001 | suspended@test.com | 32 | Suspended | None | Suspended account handling |

## Invalid User Data

| Test Case | Field | Invalid Value | Expected Error |
|-----------|-------|---------------|----------------|
| INV-001 | username | "ab" (too short) | "Username must be 3-20 characters" |
| INV-002 | username | "a".repeat(25) (too long) | "Username must be 3-20 characters" |
| INV-003 | username | "user@name" (invalid chars) | "Username can only contain letters, numbers, _, -" |
| INV-004 | email | "notanemail" | "Invalid email format" |
| INV-005 | email | "user@@test.com" | "Invalid email format" |
| INV-006 | age | 10 | "Must be 13 or older" |
| INV-007 | age | 150 | "Invalid age" |

## User Factory (JavaScript)

```javascript
// userFactory.js
const { faker } = require('@faker-js/faker');

class UserFactory {
  static create(overrides = {}) {
    return {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Test1234!', // All test users use same password
      age: faker.number.int({ min: 18, max: 65 }),
      status: 'active',
      type: 'regular',
      createdAt: faker.date.past(),
      ...overrides
    };
  }

  static createNew() {
    return this.create({
      type: 'new',
      createdAt: new Date(),
      paymentMethods: []
    });
  }

  static createVIP() {
    return this.create({
      type: 'vip',
      createdAt: faker.date.past({ years: 2 })
    });
  }

  static createEmployee() {
    return this.create({
      type: 'employee',
      email: faker.internet.email({ provider: 'company.com' })
    });
  }

  static createInactive() {
    return this.create({ status: 'inactive' });
  }

  static createWithInvalidAge(age) {
    return this.create({ age });
  }
}

module.exports = UserFactory;
```

## Usage in Tests

```javascript
const UserFactory = require('./factories/userFactory');

describe('User registration', () => {
  test('Accepts valid new user', async () => {
    const userData = UserFactory.createNew();
    const user = await registerUser(userData);
    expect(user.id).toBeDefined();
  });

  test('Rejects user below minimum age', async () => {
    const userData = UserFactory.createWithInvalidAge(10);
    await expect(registerUser(userData))
      .rejects.toThrow('Must be 13 or older');
  });
});
```
```

### Example 2: Product Test Data

```markdown
# Test Data: Products

## Product Variations

| Product ID | Name | Price | Weight (lb) | Stock | Category | Purpose |
|------------|------|-------|-------------|-------|----------|---------|
| PRD-001 | Low Price Item | $5.00 | 0.5 | 100 | Electronics | Minimum order tests |
| PRD-002 | Medium Price Item | $50.00 | 2.0 | 50 | Clothing | Standard scenarios |
| PRD-003 | High Price Item | $500.00 | 10.0 | 10 | Electronics | High-value order tests |
| PRD-004 | Very High Price | $2,000.00 | 15.0 | 5 | Appliances | Order maximum tests |
| PRD-005 | Lightweight | $20.00 | 0.1 | 200 | Books | Shipping calc tests |
| PRD-006 | Heavyweight | $100.00 | 50.0 | 20 | Furniture | Shipping calc tests |
| PRD-007 | Out of Stock | $30.00 | 1.0 | 0 | Sports | Inventory error tests |
| PRD-008 | Low Stock | $25.00 | 1.5 | 2 | Toys | Low inventory tests |

## Product Factory (JavaScript)

```javascript
// productFactory.js
const { faker } = require('@faker-js/faker');

class ProductFactory {
  static create(overrides = {}) {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      weight: faker.number.float({ min: 0.1, max: 20, precision: 0.1 }),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      image: faker.image.url(),
      ...overrides
    };
  }

  static createLowPrice() {
    return this.create({
      price: faker.number.float({ min: 1, max: 10, precision: 0.01 }),
      name: 'Low Price Item'
    });
  }

  static createHighPrice() {
    return this.create({
      price: faker.number.float({ min: 500, max: 2000, precision: 0.01 }),
      name: 'High Price Item'
    });
  }

  static createHeavyweight() {
    return this.create({
      weight: faker.number.float({ min: 30, max: 50, precision: 0.1 }),
      name: 'Heavyweight Item'
    });
  }

  static createOutOfStock() {
    return this.create({
      stock: 0,
      name: 'Out of Stock Item'
    });
  }

  static createLowStock(quantity = 2) {
    return this.create({
      stock: quantity,
      name: 'Low Stock Item'
    });
  }
}

module.exports = ProductFactory;
```
```

---

## 8. AI Prompts Library

### Prompt 1: Generate Complete Test Plan

```
Create a comprehensive test plan for [FEATURE_NAME].

**Context**:
- Feature description: [DETAILED_DESCRIPTION]
- Files involved: [LIST_FILES]
- Dependencies: [LIST_DEPENDENCIES]
- User stories: [LIST_USER_STORIES]
- Tech stack: [LANGUAGES_FRAMEWORKS]

**Generate all 8 components**:

## 1. Test Objectives
- Primary goals (3-5 objectives)
- Quality attributes to verify
- Compliance requirements (if any)

## 2. Scope
### In Scope
- Features to test
- Platforms/browsers
- User roles
- Test types

### Out of Scope
- What won't be tested
- Rationale for each exclusion

## 3. Test Strategy
- Test levels (unit/integration/E2E)
  - What to test at each level
  - What to mock
  - Coverage targets
- Test types (functional/security/performance)
  - Approach for each
- Automation strategy

## 4. Test Cases
Generate at least 20 test cases across:
- Unit tests
- Integration tests
- E2E tests
- Edge cases
- Error cases

Format:
| ID | Description | Type | Steps/Input | Expected | Priority |

## 5. Test Data Requirements
- Valid data sets (with examples)
- Invalid data sets (with expected errors)
- Boundary values
- Special cases (security, unicode, etc.)

## 6. Environment Requirements
- Hardware specs
- Software dependencies
- Configuration
- External services

## 7. Risks and Mitigations
| Risk | Impact | Probability | Mitigation | Priority |

## 8. Schedule
- Test phases with durations
- Dependencies
- Milestones
- Entry/exit criteria

**Prioritize all test cases**: P0 (critical), P1 (high), P2 (medium), P3 (low)
```

### Prompt 2: Generate Test Coverage Matrix

```
Create a test coverage matrix for [MODULE/FEATURE].

**Features to analyze**:
[LIST ALL FEATURES/FUNCTIONS]

**Existing tests** (if any):
- Unit tests: [COUNT/DESCRIPTION]
- Integration tests: [COUNT/DESCRIPTION]
- E2E tests: [COUNT/DESCRIPTION]

**Generate**:

## 1. Coverage Matrix
| Feature/Function | Unit | Integration | E2E | Security | Performance |
|------------------|------|-------------|-----|----------|-------------|

For each cell, indicate:
- ✅ Covered (comprehensive tests exist)
- ⚠️ Partial (some tests, needs more)
- ❌ Missing (no tests)
- N/A (not applicable)

## 2. Gap Analysis

For EACH missing or partial area, provide:
- Feature + Test Type combination
- Why coverage is needed (business/technical justification)
- Risk if not tested (High/Medium/Low)
- Suggested test scenarios (2-3 specific tests)
- Effort estimate (Small: 1-2h, Medium: 2-4h, Large: 4-8h)
- Priority (P0/P1/P2/P3)

## 3. Coverage Summary
- Total features: [COUNT]
- Coverage by type:
  - Unit: X% (Y covered, Z partial, W missing)
  - Integration: X% (Y covered, Z partial, W missing)
  - E2E: X% (Y covered, Z partial, W missing)
  - Security: X% (Y covered, Z partial, W missing)
  - Performance: X% (Y covered, Z partial, W missing)
- Overall coverage: X%
- High priority gaps: [COUNT]

## 4. Prioritized Action Plan
List gaps in priority order (P0 → P1 → P2 → P3)
For each:
- What to test
- Estimated time
- Dependencies (if any)
- Sprint/week to address
```

### Prompt 3: Apply Test Design Techniques

```
Apply systematic test design techniques to [FEATURE/FUNCTION].

**Function specification**:
```[LANGUAGE]
[PASTE FUNCTION SIGNATURE AND DOCUMENTATION]
```

**Business rules**:
- [RULE 1]
- [RULE 2]
- [RULE 3]

**Apply these techniques**:

## 1. Equivalence Partitioning

For EACH input parameter:
- List valid partitions (groups that should work)
- List invalid partitions (groups that should fail)
- Select representative test value for each partition
- Specify expected result

Format:
| Parameter | Partition Type | Description | Test Value | Expected Result |

## 2. Boundary Value Analysis

For inputs with ranges/limits:
- Below minimum (invalid)
- At minimum (valid)
- Just above minimum (valid)
- Normal value (valid)
- Just below maximum (valid)
- At maximum (valid)
- Above maximum (invalid)

Format:
| Parameter | Boundary Type | Test Value | Expected Result |

## 3. Decision Table (if applicable)

If function has multiple conditions:
- List all conditions
- List all actions
- Generate all combinations
- Map expected behavior

Format:
| TC ID | Condition 1 | Condition 2 | Condition 3 | Expected Action | Priority |

## 4. Error Scenarios

Generate error test cases for:
- Validation errors
- Business rule violations
- System errors (if applicable)
- Edge cases

Format:
| TC ID | Error Category | Scenario | How to Trigger | Expected Error | Priority |

**Summary**:
- Total test cases generated: [COUNT]
- Equivalence partitioning: [COUNT]
- Boundary value analysis: [COUNT]
- Decision table: [COUNT]
- Error scenarios: [COUNT]
```

### Prompt 4: Risk-Based Prioritization

```
Analyze risks and prioritize tests for [SYSTEM/MODULE].

**Features to analyze**:
[LIST ALL FEATURES WITH BRIEF DESCRIPTIONS]

**Consider these risk factors**:

1. Business Impact (score 1-10)
   - Revenue loss potential
   - Customer trust impact
   - Legal/compliance risk
   - Brand reputation damage

2. Technical Risk (score 1-10)
   - Code complexity
   - Number of dependencies
   - Integration points
   - Historical bug density
   - Recent changes

3. Usage Frequency (score 1-10)
   - How often feature is used
   - Number of users affected
   - Part of critical user journey?
   - Peak load considerations

**Generate**:

## 1. Risk Assessment Matrix
| Feature | Business Impact | Technical Risk | Usage Frequency | Risk Score | Justification |
|---------|----------------|----------------|----------------|------------|---------------|

Risk Score = Business Impact × Technical Risk × Usage Frequency

Provide justification for each score.

## 2. Priority Assignment
Based on risk scores, assign priorities:
- P0 (Critical): Risk Score > [THRESHOLD]
- P1 (High): Risk Score [THRESHOLD_RANGE]
- P2 (Medium): Risk Score [THRESHOLD_RANGE]
- P3 (Low): Risk Score < [THRESHOLD]

For each feature:
- Feature name
- Priority assigned
- Number of test cases
- Rationale for priority

## 3. Test Suite Composition

### Smoke Suite (P0 only)
- Target time: 5-10 minutes
- Features included: [LIST]
- Test cases: [COUNT]
- Must pass for: Deployment

### Regression Suite (P0 + P1)
- Target time: 30-45 minutes
- Features included: [LIST]
- Test cases: [COUNT]
- Must pass for: PR merge

### Full Suite (All priorities)
- Target time: 2-3 hours
- All test cases
- Run: Nightly/pre-release

## 4. Execution Schedule
| Suite | When | Trigger | Blocking | Time Limit | On Failure Action |
|-------|------|---------|----------|------------|-------------------|
```

### Prompt 5: Test Data Planning

```
Define comprehensive test data requirements for [FEATURE].

**Data entities involved**:
- [ENTITY 1]: [DESCRIPTION, FIELDS, CONSTRAINTS]
- [ENTITY 2]: [DESCRIPTION, FIELDS, CONSTRAINTS]
- [ENTITY 3]: [DESCRIPTION, FIELDS, CONSTRAINTS]

**Generate**:

## 1. Valid Data Sets
For each entity, define 3-5 valid variations:
| Entity | Scenario | Field Values | Purpose |
|--------|----------|--------------|---------|

Include:
- Normal/typical data
- Minimum valid values
- Maximum valid values
- Different variations (types, statuses, categories)

## 2. Invalid Data Sets
For each field with validation:
| Entity | Invalid Field | Invalid Value | Expected Error Message |
|--------|---------------|---------------|------------------------|

Include:
- Missing required fields
- Format violations
- Constraint violations
- Type mismatches

## 3. Boundary Data
For fields with min/max constraints:
| Entity | Field | Boundary Type | Test Value | Expected Result |
|--------|-------|---------------|------------|-----------------|

Test: below min, at min, at max, above max

## 4. Special Cases

### Empty/Null Values
- Test each field with null, undefined, empty string
- Expected behavior for each

### Special Characters
- Unicode characters
- Emoji
- SQL injection attempts (e.g., `' OR '1'='1`)
- XSS payloads (e.g., `<script>alert('XSS')</script>`)
- Script tags

### Edge Cases
- Very long strings (e.g., 10,000 characters)
- Whitespace handling (leading/trailing)
- Case sensitivity tests
- Special formatting (dates, numbers, currency)

## 5. Performance Data
- Minimum dataset size for tests: [NUMBER]
- Typical dataset size: [NUMBER]
- Load test dataset size: [NUMBER]
- Rationale for each size

## 6. Data Generation Strategy

### Factories
Provide code template for data factories:
```[LANGUAGE]
// Factory pattern for generating test data
```

### Fixtures
- Pre-seeded data for specific scenarios
- Known values for predictable tests

### Cleanup Strategy
- How to clean up after tests
- When to reset data
- Isolation approach

### Data Management
- Where test data is stored
- How to version control test data
- Data privacy considerations

## 7. Data Dependencies
- Order of data creation
- Relationships between entities
- Foreign key constraints
```

---

## Additional Resources

### Online Tools
- [Test Design Technique Calculator](https://www.guru99.com/test-case-design-techniques.html)
- [ISTQB Test Design Techniques](https://www.istqb.org/)
- [Risk Assessment Templates](https://www.softwaretestinghelp.com/risk-based-testing/)

### Books
- "Lessons Learned in Software Testing" by Cem Kaner
- "Agile Testing" by Lisa Crispin and Janet Gregory
- "Software Testing Techniques" by Boris Beizer

### Course Materials
- Module 02: Context Engineering (prompt patterns)
- Module 04: Documentation Generation (test documentation)
- Module 06: Test Implementation (turning plans into code)

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
