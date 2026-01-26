# Module 5: Creating Test Plans with AI

## Duration: 5 hours

## Learning Objectives

By the end of this module, you will be able to:
- Create comprehensive test plans with AI assistance
- Generate test coverage matrices
- Prioritize test cases by risk
- Define test data requirements

---

## 5.1 Test Planning Fundamentals

### What is a Test Plan?

A test plan defines:
- **What** to test
- **How** to test it
- **When** to test
- **Who** tests what
- **What** success looks like

### Test Plan Components

1. Test objectives
2. Scope (in/out)
3. Test strategy
4. Test cases
5. Test data
6. Environment requirements
7. Schedule
8. Risk assessment

---

## 5.2 Generating Test Plans with AI

### Comprehensive Test Plan Prompt

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

## 3. Test Strategy
- Test levels (unit/integration/E2E)
- Test types (functional/performance/security)
- Automation approach

## 4. Test Cases

### Unit Tests
| ID | Description | Function | Input | Expected | Priority |
|----|-------------|----------|-------|----------|----------|

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
- Special characters
- Large datasets

## 6. Environment Requirements
- Hardware
- Software
- Configuration
- Test accounts

## 7. Risks and Mitigations
| Risk | Impact | Probability | Mitigation |

## 8. Schedule
- Test phases
- Dependencies
- Milestones

Prioritize: P0 (critical), P1 (high), P2 (medium), P3 (low)
```

---

## 5.3 Test Coverage Matrix

### Generating Coverage Matrix

```
Create a test coverage matrix for [module/service].

Format:
| Feature/Function | Unit | Integration | E2E | Security | Performance |
|------------------|------|-------------|-----|----------|-------------|
| [Feature 1]      | [status] | [status] | [status] | [status] | [status] |

Status:
- ✅ Covered
- ⚠️ Partial
- ❌ Missing
- N/A

For each missing/partial:
- Why it's needed
- Suggested test
- Effort estimate
- Priority
```

### Example Matrix

| Feature | Unit | Integration | E2E | Security |
|---------|------|-------------|-----|----------|
| User Registration | ✅ | ✅ | ✅ | ⚠️ |
| Login | ✅ | ✅ | ✅ | ✅ |
| Password Reset | ✅ | ❌ | ❌ | ⚠️ |
| Profile Update | ✅ | ⚠️ | ❌ | ❌ |

---

## 5.4 Test Case Design Techniques

### Equivalence Partitioning

```
Apply equivalence partitioning for [input field].

Field: [name]
Type: [string/number/date/etc]
Constraints: [min, max, format, etc]

Generate partitions:
1. Valid partitions
2. Invalid partitions
3. Representative test values for each
```

### Boundary Value Analysis

```
Apply boundary value analysis for [input].

Range: [min] to [max]

Generate test values:
- Below minimum
- At minimum
- Just above minimum
- Normal value
- Just below maximum
- At maximum
- Above maximum
```

### Decision Tables

```
Create a decision table for [business rule].

Conditions:
- [Condition 1]
- [Condition 2]
- [Condition 3]

Actions:
- [Action 1]
- [Action 2]

Generate all combinations and expected outcomes.
```

---

## 5.5 Risk-Based Test Prioritization

### Prompt for Risk Analysis

```
Analyze [feature] and prioritize tests by risk.

Consider:
1. Business impact if it fails
2. Likelihood of defects
3. Complexity of code
4. Frequency of use
5. Recent changes
6. Integration points

For each test area:
- Risk score (1-10)
- Justification
- Recommended test depth
- Priority (P0-P3)

Output as prioritized test list.
```

### Priority Definitions

| Priority | Criteria | When to Run |
|----------|----------|-------------|
| P0 | Critical path, security, data loss | Every commit |
| P1 | Important features, common flows | Every PR |
| P2 | Secondary features, edge cases | Daily/nightly |
| P3 | Nice-to-have, rare scenarios | Weekly/release |

---

## 5.6 Test Data Planning

### Prompt for Test Data

```
Define test data requirements for [feature].

Generate:

## 1. Valid Data Sets
| Scenario | Field Values | Purpose |
|----------|--------------|---------|

## 2. Invalid Data Sets
| Scenario | Invalid Field | Value | Expected Error |
|----------|---------------|-------|----------------|

## 3. Boundary Data
| Field | Boundary | Test Value | Expected |
|-------|----------|------------|----------|

## 4. Special Cases
- Empty/null values
- Special characters
- Unicode/emoji
- Very long strings
- SQL injection attempts
- XSS payloads

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

## 5.7 Hands-On Exercises

### Exercise 5.1: Create Test Plan

**Objective**: Generate a comprehensive test plan

**Steps**:
1. Choose a feature from your project
2. Gather context (files, dependencies, user stories)
3. Use the comprehensive test plan prompt
4. Review and refine the output
5. Add any missing scenarios

**Deliverable**: Complete TEST-PLAN.md

**Time**: 60 minutes

---

### Exercise 5.2: Coverage Matrix

**Objective**: Create and analyze coverage matrix

**Steps**:
1. List all features/functions in a module
2. Generate coverage matrix
3. Identify gaps
4. Prioritize missing tests
5. Estimate effort to fill gaps

**Deliverable**: Coverage matrix with gap analysis

**Time**: 45 minutes

---

### Exercise 5.3: Risk-Based Prioritization

**Objective**: Prioritize tests by risk

**Steps**:
1. List all test areas
2. Score each by risk factors
3. Assign priorities
4. Create testing schedule
5. Define what runs when

**Deliverable**: Prioritized test schedule

**Time**: 45 minutes

---

## Knowledge Check

1. What are the main components of a test plan?
2. How do you create a coverage matrix?
3. What is equivalence partitioning?
4. How do you prioritize tests by risk?
5. What test data types should you plan for?

---

## Summary

In this module, you learned:
- How to create comprehensive test plans
- How to build coverage matrices
- Test case design techniques
- Risk-based prioritization
- Test data planning

---

## Next Steps

Proceed to **Module 6: Implementing Tests with AI** to turn your test plan into code.

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes
