# Module 5: Test Planning with AI - Presentation Slides

**Duration**: 5 hours (including exercises)
**Total Slides**: 50

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Slide 1 of 50: Title Slide

# Module 5: Test Planning with AI

**Creating Comprehensive Test Strategies**

Instructor: [Your Name]
Duration: 5 hours

---

## Slide 2 of 50: Learning Objectives

By the end of this module, you will be able to:

- Create comprehensive test plans with AI assistance
- Generate test coverage matrices
- Apply test case design techniques
- Prioritize tests by risk
- Define test data requirements

---

## Slide 3 of 50: Module Agenda

1. **Test Planning Fundamentals** (45 min)
2. **Generating Test Plans with AI** (60 min)
3. **Test Coverage Matrices** (45 min)
4. **Test Case Design Techniques** (60 min)
5. **Risk-Based Prioritization** (45 min)
6. **Test Data Planning** (30 min)
7. **Hands-On Exercises** (90 min)

---

## Slide 4 of 50: Section 1 - Test Planning Fundamentals

# Part 1: What is Test Planning?

**The foundation of effective testing**

---

## Slide 5 of 50: What is a Test Plan?

A test plan is a document that defines:

- **What** to test
- **How** to test it
- **When** to test
- **Who** tests what
- **What** success looks like

**Think of it as**: A roadmap for quality assurance

---

## Slide 6 of 50: Why Test Planning Matters

**Without a Test Plan:**
- Ad-hoc testing with gaps
- Missed critical scenarios
- Unclear priorities
- Wasted effort
- Unknown coverage

**With a Test Plan:**
- Systematic coverage
- Clear priorities
- Efficient resource use
- Measurable progress
- Confident releases

---

## Slide 7 of 50: The 8 Components of a Test Plan

```
1. Test Objectives       → What are we trying to achieve?
2. Scope (In/Out)       → What will/won't be tested?
3. Test Strategy        → How will we test?
4. Test Cases           → Specific tests to execute
5. Test Data            → Data required for testing
6. Environment          → Infrastructure needed
7. Schedule             → When tests will run
8. Risk Assessment      → Priorities and mitigations
```

---

## Slide 8 of 50: Component 1 - Test Objectives

**Purpose**: Define what you're trying to achieve

Examples:
- Verify checkout flow works correctly
- Ensure payment processing is secure
- Validate error handling is user-friendly
- Confirm performance meets SLA (< 2s response)

**Best Practice**: Link objectives to business goals

---

## Slide 9 of 50: Component 2 - Scope

### In Scope
What will be tested:
- Features to test
- Platforms/browsers
- User roles
- Test types (functional, security, performance)

### Out of Scope
What won't be tested:
- Third-party services (mocked)
- Legacy features (tested separately)
- Features not yet implemented

**Always specify both!**

---

## Slide 10 of 50: Component 3 - Test Strategy

Defines the approach:

**Test Levels:**
- Unit tests (individual functions)
- Integration tests (components together)
- E2E tests (user journeys)

**Test Types:**
- Functional (does it work?)
- Security (is it safe?)
- Performance (is it fast?)
- Usability (is it user-friendly?)

**Automation Strategy:**
- What to automate
- What to test manually
- Tools to use

---

## Slide 11 of 50: Component 4 - Test Cases

Specific tests organized by:

**By Level:**
- Unit test cases
- Integration test cases
- E2E test cases

**By Priority:**
- P0: Critical (must pass)
- P1: Important (should pass)
- P2: Nice-to-have (can defer)
- P3: Optional (low priority)

**By Type:**
- Happy path cases
- Edge cases
- Error cases

---

## Slide 12 of 50: Component 5 - Test Data

Define data requirements:

**Valid Data:**
- Normal scenarios
- Multiple user types
- Various configurations

**Invalid Data:**
- Boundary violations
- Format errors
- Missing required fields

**Special Cases:**
- Empty/null values
- Special characters
- Very large datasets
- Security attack payloads

---

## Slide 13 of 50: Component 6 - Environment Requirements

**Hardware:**
- Servers, databases
- Network configuration
- Load balancers

**Software:**
- OS versions
- Browser versions
- Dependencies

**Configuration:**
- Environment variables
- Feature flags
- Test accounts

---

## Slide 14 of 50: Component 7 - Schedule

**When tests run:**

```
Every Commit:
└─ P0 tests (critical path)
   Time: 5-10 minutes

Every PR:
└─ P0 + P1 tests (smoke + important)
   Time: 15-30 minutes

Daily/Nightly:
└─ P0 + P1 + P2 tests (full regression)
   Time: 1-2 hours

Weekly/Release:
└─ All tests + exploratory
   Time: 4+ hours
```

---

## Slide 15 of 50: Component 8 - Risk Assessment

Identify and prioritize risks:

| Risk | Impact | Probability | Mitigation | Priority |
|------|--------|-------------|------------|----------|
| Payment failure | High | Medium | Comprehensive testing | P0 |
| Slow checkout | Medium | High | Performance tests | P1 |
| Poor UX | Low | Medium | Usability testing | P2 |

**Risk Score** = Impact × Probability

---

## Slide 16 of 50: Section 2 - Generating Test Plans with AI

# Part 2: AI-Assisted Test Planning

**Let AI do the heavy lifting**

---

## Slide 17 of 50: Why Use AI for Test Planning?

**Manual Test Planning:**
- Time-consuming (2-4 hours per feature)
- Easy to miss scenarios
- Inconsistent structure
- Boring and repetitive

**AI-Assisted Test Planning:**
- Fast (10-20 minutes per feature)
- Comprehensive coverage
- Consistent format
- Focus on review and refinement

**AI doesn't replace thinking, it amplifies it**

---

## Slide 18 of 50: Comprehensive Test Plan Prompt

```
Create a comprehensive test plan for [feature/module].

**Context**:
- Feature: [description]
- Files: [list key files]
- Dependencies: [list dependencies]
- User stories: [list if available]

**Generate**:

## 1. Test Objectives
- Primary goals
- Quality attributes to verify
- Compliance requirements

## 2. Scope
### In Scope
- Features to test
- Platforms/browsers
- User roles

### Out of Scope
- What won't be tested
- Why excluded

[... continues with all 8 components ...]

Prioritize: P0 (critical), P1 (high), P2 (medium), P3 (low)
```

---

## Slide 19 of 50: Example - E-Commerce Checkout

**Prompt:**
```
Create a comprehensive test plan for the checkout feature.

**Context**:
- Feature: E-commerce checkout with cart validation,
  payment processing, shipping calculation, and email notifications
- Files: checkoutService.js, paymentService.js, cartService.js
- Dependencies: Stripe API, SendGrid email
- User story: As a customer, I want to complete my purchase
  securely and receive confirmation

Generate all 8 components with specific test cases.
```

---

## Slide 20 of 50: AI-Generated Output Example

```markdown
## 1. Test Objectives
- Verify customers can complete purchases successfully
- Ensure payment processing is secure and PCI-compliant
- Validate cart and inventory management
- Confirm accurate shipping calculations
- Test email notification delivery

## 2. Scope

### In Scope
- Cart validation (empty, invalid items, quantity limits)
- Payment processing (credit card, PayPal)
- Shipping calculation (standard, express, international)
- Order creation and confirmation
- Email notifications
- Error handling and user feedback

### Out of Scope
- Product catalog management (separate feature)
- User authentication (tested separately)
- Third-party payment gateway internals
...
```

---

## Slide 21 of 50: Refining AI Output

**AI gives you 80%, you add 20%:**

1. **Review for accuracy**
   - Does it match your architecture?
   - Are priorities correct?

2. **Add domain knowledge**
   - Business-specific rules
   - Known edge cases
   - Regulatory requirements

3. **Adjust priorities**
   - Align with business goals
   - Consider recent issues
   - Resource constraints

4. **Add specifics**
   - Actual file paths
   - Specific test data
   - Exact tools/frameworks

---

## Slide 22 of 50: Section 3 - Test Coverage Matrices

# Part 3: Visualizing Test Coverage

**Know what's tested and what's not**

---

## Slide 23 of 50: What is a Coverage Matrix?

A table that maps:
- **Features/Functions** (rows)
- **Test Types** (columns)
- **Coverage Status** (cells)

**Purpose:**
- Visualize test coverage
- Identify gaps
- Track progress
- Communicate status

---

## Slide 24 of 50: Coverage Matrix Structure

| Feature/Function | Unit | Integration | E2E | Security | Performance |
|------------------|------|-------------|-----|----------|-------------|
| User Registration | ✅ | ✅ | ✅ | ⚠️ | N/A |
| Login | ✅ | ✅ | ✅ | ✅ | ✅ |
| Password Reset | ✅ | ❌ | ❌ | ⚠️ | N/A |
| Profile Update | ✅ | ⚠️ | ❌ | ❌ | N/A |

**Legend:**
- ✅ Covered
- ⚠️ Partial
- ❌ Missing
- N/A Not applicable

---

## Slide 25 of 50: Generating Coverage Matrix with AI

**Prompt:**
```
Create a test coverage matrix for [module/service].

Format:
| Feature/Function | Unit | Integration | E2E | Security | Performance |
|------------------|------|-------------|-----|----------|-------------|

For each feature, indicate:
- ✅ Covered (tests exist and pass)
- ⚠️ Partial (some tests, not comprehensive)
- ❌ Missing (no tests)
- N/A (not applicable)

Then provide gap analysis:
For each missing/partial:
- Why it's needed
- Suggested test approach
- Effort estimate (S/M/L)
- Priority (P0/P1/P2/P3)
```

---

## Slide 26 of 50: Coverage Gap Analysis

After generating matrix, AI can identify gaps:

```markdown
## Gap Analysis

### High Priority Gaps (P0/P1)

1. **Password Reset - Integration Tests** (Missing)
   - Why: Critical security feature
   - Test: Verify token expiration, email sending
   - Effort: Medium (4 hours)
   - Priority: P0

2. **Profile Update - Security Tests** (Missing)
   - Why: Handles sensitive user data
   - Test: Authorization, data validation, XSS prevention
   - Effort: Small (2 hours)
   - Priority: P1
...
```

---

## Slide 27 of 50: Traceability Matrix

Enhanced coverage that maps tests to requirements:

| Test ID | Requirement | Code Path | Risk Area | Priority | Status |
|---------|-------------|-----------|-----------|----------|--------|
| TC-001 | REQ-123 | auth/login.js:45 | Authentication | P0 | ✅ Pass |
| TC-002 | REQ-123 | auth/login.js:67 | Session mgmt | P0 | ✅ Pass |
| TC-003 | REQ-124 | auth/password.js:89 | Password reset | P1 | ❌ Missing |

**Benefits:**
- Link tests to requirements
- Track implementation coverage
- Audit compliance
- Impact analysis for changes

---

## Slide 28 of 50: Section 4 - Test Case Design Techniques

# Part 4: Systematic Test Design

**Science, not guesswork**

---

## Slide 29 of 50: Why Test Design Techniques?

**Ad-hoc Testing:**
- Inconsistent coverage
- Missed scenarios
- Overlapping tests
- Hard to justify

**Systematic Design:**
- Comprehensive coverage
- Fewer redundant tests
- Documented rationale
- Repeatable process

---

## Slide 30 of 50: Technique 1 - Equivalence Partitioning

**Concept**: Divide inputs into groups that should behave the same

**Steps:**
1. Identify input domains
2. Partition into valid/invalid groups
3. Test one value from each partition

**Example - Age Input:**
- Invalid: < 0
- Valid: 0-17 (minor)
- Valid: 18-65 (adult)
- Valid: 66+ (senior)
- Invalid: > 150

Test: -1, 10, 30, 70, 200

---

## Slide 31 of 50: Equivalence Partitioning with AI

**Prompt:**
```
Apply equivalence partitioning for [input field].

Field: [name]
Type: [string/number/date/etc]
Constraints: [min, max, format, etc]

Generate:
1. Valid partitions (groups that should work)
2. Invalid partitions (groups that should fail)
3. Representative test value for each partition
4. Expected result for each

Format as table:
| Partition | Type | Test Value | Expected Result |
```

---

## Slide 32 of 50: Technique 2 - Boundary Value Analysis

**Concept**: Bugs often occur at the edges of valid ranges

**Test values:**
- Minimum - 1 (invalid)
- Minimum (valid)
- Minimum + 1 (valid)
- Typical value (valid)
- Maximum - 1 (valid)
- Maximum (valid)
- Maximum + 1 (invalid)

**Example - Password Length (8-30):**
Test: 7, 8, 9, 20, 29, 30, 31

---

## Slide 33 of 50: Boundary Value Analysis with AI

**Prompt:**
```
Apply boundary value analysis for [input].

Range: [min] to [max]
Type: [number/string/date/etc]

Generate test values:
- Below minimum (invalid)
- At minimum (valid)
- Just above minimum (valid)
- Normal value (valid)
- Just below maximum (valid)
- At maximum (valid)
- Above maximum (invalid)

For each, specify:
- Test value
- Expected result
- Rationale
```

---

## Slide 34 of 50: Technique 3 - Decision Tables

**Concept**: Test all combinations of conditions and actions

**Use when**: Complex business rules with multiple conditions

**Structure:**
```
Conditions:
- User is logged in? (Y/N)
- Has items in cart? (Y/N)
- Payment method valid? (Y/N)

Actions:
- Allow checkout
- Show login prompt
- Show error message
```

**Result**: 2³ = 8 test cases

---

## Slide 35 of 50: Decision Table Example

| Logged In | Has Items | Valid Payment | Allow Checkout | Show Login | Show Error |
|-----------|-----------|---------------|----------------|------------|------------|
| Y | Y | Y | ✓ | | |
| Y | Y | N | | | ✓ Payment |
| Y | N | Y | | | ✓ Empty Cart |
| Y | N | N | | | ✓ Empty Cart |
| N | Y | Y | | ✓ | |
| N | Y | N | | ✓ | |
| N | N | Y | | ✓ | |
| N | N | N | | ✓ | |

---

## Slide 36 of 50: Decision Tables with AI

**Prompt:**
```
Create a decision table for [business rule].

Conditions:
- [Condition 1] (possible values)
- [Condition 2] (possible values)
- [Condition 3] (possible values)

Actions:
- [Action 1]
- [Action 2]
- [Action 3]

Generate:
1. All combinations of conditions
2. Expected actions for each combination
3. Test case ID for each row
4. Priority for each test case
```

---

## Slide 37 of 50: Technique 4 - State Transition Testing

**Concept**: Test all valid state changes and invalid transitions

**Example - Order States:**
```
Created → Paid → Shipped → Delivered
    ↓       ↓        ↓
 Cancelled Cancelled Cancelled
```

**Test cases:**
- Valid transitions (Created→Paid, Paid→Shipped, etc.)
- Invalid transitions (Created→Shipped, Delivered→Paid)
- Edge cases (Cancel at each state)

---

## Slide 38 of 50: Technique 5 - Error Guessing

**Concept**: Use experience to predict likely errors

**Common error scenarios:**
- Null/undefined values
- Empty strings/arrays
- Division by zero
- Network failures
- Timeout conditions
- Concurrent access
- Race conditions
- Memory leaks

**Best combined with other techniques**

---

## Slide 39 of 50: Section 5 - Risk-Based Prioritization

# Part 5: Test Smarter, Not Harder

**Focus effort where it matters most**

---

## Slide 40 of 50: What is Risk-Based Testing?

**Principle**: Prioritize testing based on risk

**Risk = Impact × Likelihood**

**Impact**: What happens if it fails?
- Critical: Data loss, security breach, revenue loss
- High: Major feature broken, poor UX
- Medium: Minor feature issues
- Low: Cosmetic issues

**Likelihood**: How likely is it to fail?
- High: Complex code, many changes, known issues
- Medium: Moderate complexity, some changes
- Low: Simple code, well-tested, stable

---

## Slide 41 of 50: Risk Factors to Consider

```
Business Impact:
├─ Revenue loss
├─ Security breach
├─ Data loss/corruption
├─ Legal/compliance issues
└─ Brand reputation damage

Technical Risk:
├─ Code complexity
├─ Number of dependencies
├─ Recent changes
├─ Historical bug density
└─ Test coverage gaps

Usage Patterns:
├─ Frequency of use
├─ Number of users affected
├─ Critical user journeys
└─ Peak load scenarios
```

---

## Slide 42 of 50: Priority Levels

| Priority | Criteria | When to Run | Example |
|----------|----------|-------------|---------|
| P0 | Critical path, security, data loss | Every commit | Login, payment, data save |
| P1 | Important features, common flows | Every PR | Search, filters, navigation |
| P2 | Secondary features, edge cases | Daily/nightly | Settings, preferences, exports |
| P3 | Nice-to-have, rare scenarios | Weekly/release | Easter eggs, tooltips, help text |

---

## Slide 43 of 50: Risk Assessment with AI

**Prompt:**
```
Analyze [feature] and prioritize tests by risk.

Consider:
1. Business impact if it fails (1-10)
2. Likelihood of defects (1-10)
3. Complexity of code (1-10)
4. Frequency of use (daily/weekly/monthly/rarely)
5. Recent changes (yes/no)
6. Integration points (list)

For each test area:
- Risk score (Impact × Likelihood × Complexity)
- Justification
- Recommended test depth
- Priority (P0/P1/P2/P3)

Output as prioritized test list.
```

---

## Slide 44 of 50: Risk Matrix Example

| Feature | Impact | Likelihood | Complexity | Risk Score | Priority |
|---------|--------|------------|------------|------------|----------|
| Payment Processing | 10 | 7 | 8 | 560 | P0 |
| User Registration | 8 | 5 | 4 | 160 | P1 |
| Search Function | 6 | 6 | 5 | 180 | P1 |
| Profile Picture Upload | 4 | 4 | 3 | 48 | P2 |
| Theme Selector | 2 | 2 | 2 | 8 | P3 |

**Risk Score** = Impact × Likelihood × Complexity

---

## Slide 45 of 50: Creating Test Suites by Priority

**Smoke Test Suite** (P0 only - 5-10 min)
- Critical path tests
- Must pass before any deployment

**Regression Suite** (P0 + P1 - 30-60 min)
- Core functionality
- Common user flows
- Run on every PR

**Full Suite** (All priorities - 2-4 hours)
- Complete coverage
- Run nightly or before release

---

## Slide 46 of 50: Section 6 - Test Data Planning

# Part 6: Data is King

**Good test data = good tests**

---

## Slide 47 of 50: Types of Test Data

```
Valid Data:
├─ Normal scenarios
├─ Multiple user types
├─ Various configurations
└─ Different data volumes

Invalid Data:
├─ Boundary violations
├─ Format errors
├─ Missing required fields
└─ Type mismatches

Special Cases:
├─ Empty/null values
├─ Special characters
├─ Unicode/emoji
├─ Very long strings
├─ SQL injection attempts
└─ XSS payloads
```

---

## Slide 48 of 50: Test Data Planning with AI

**Prompt:**
```
Define test data requirements for [feature].

Generate:

## 1. Valid Data Sets
| Scenario | Field Values | Purpose |

## 2. Invalid Data Sets
| Scenario | Invalid Field | Value | Expected Error |

## 3. Boundary Data
| Field | Boundary | Test Value | Expected |

## 4. Special Cases
- Empty/null values
- Special characters
- Unicode/emoji
- Very long strings
- Security payloads

## 5. Performance Data
- Minimum dataset size
- Typical dataset size
- Stress test size

## 6. Data Generation
- How to create test data
- Factories/fixtures needed
- Cleanup approach
```

---

## Slide 49 of 50: Test Data Best Practices

**Do:**
- Use factories/fixtures for consistent data
- Separate test data from production data
- Clean up after tests
- Use realistic but anonymized data
- Version control test data

**Don't:**
- Use production data in tests
- Hardcode sensitive data
- Share test data across tests (causes coupling)
- Forget about data privacy regulations
- Leave test data in production

---

## Slide 50 of 50: Summary and Next Steps

**What We Learned**:
- The 8 components of a test plan
- How to generate test plans with AI
- Creating test coverage matrices
- Test case design techniques (equivalence, boundary, decision tables)
- Risk-based prioritization
- Test data planning

**Key Takeaway**: AI accelerates test planning, but human judgment is essential for:
- Domain knowledge
- Risk assessment
- Priority decisions
- Edge case identification

**Next Steps**:
- Complete hands-on exercises
- Practice with real features
- Build your test plan library

**Next Module**: Module 6 - Implementing Tests with AI

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
