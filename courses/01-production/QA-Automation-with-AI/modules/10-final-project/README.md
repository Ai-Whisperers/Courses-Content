# Module 10: Final Project

## Duration: 8+ hours

## Overview

Apply everything you've learned by implementing a complete AI-assisted testing workflow for a real codebase.

---

## Project Requirements

### Choose Your Project

Select ONE of these options:

**Option A: Organization Project**
- Use a private repo from your organization
- Must have at least 5 API endpoints or features
- Must not have complete test coverage

**Option B: Open Source Project**
- Fork a popular open source project
- Choose one with <60% test coverage
- Examples: Express middleware, React component library

**Option C: Provided Sample**
- Use the course sample project (if provided)
- E-commerce API with users, products, orders

---

## Deliverables

### 1. Project Setup (10%)

- [ ] Clone/fork repository
- [ ] Create CLAUDE.md with complete context
- [ ] Configure local environment
- [ ] Verify you can run existing tests

**Deliverable**: Working project with CLAUDE.md

---

### 2. Documentation (15%)

Generate with AI:
- [ ] Architecture documentation (ARCHITECTURE.md)
- [ ] API reference (API.md)
- [ ] Test documentation (TESTING.md)

**Deliverable**: Three documentation files

---

### 3. Test Plan (15%)

Create comprehensive test plan:
- [ ] Test objectives and scope
- [ ] Coverage matrix
- [ ] Risk-based prioritization
- [ ] Test data requirements
- [ ] At least 30 test cases

**Deliverable**: TEST-PLAN.md

---

### 4. Test Implementation (30%)

Implement tests using AI assistance:

**Unit Tests**
- [ ] Minimum 15 unit tests
- [ ] Cover at least 3 modules
- [ ] Include mocks and fixtures

**Integration Tests**
- [ ] Minimum 8 integration tests
- [ ] Cover at least 4 API endpoints
- [ ] Test database interactions

**E2E Tests**
- [ ] Minimum 5 E2E tests
- [ ] Use Page Object Model
- [ ] Cover critical user flows

**Deliverable**: All test files passing

---

### 5. Quality Validation (15%)

- [ ] Review all tests against quality checklist
- [ ] Achieve minimum 75% code coverage
- [ ] Run mutation testing (at least 5 mutations)
- [ ] Fix all identified issues

**Deliverable**: Quality report + coverage report

---

### 6. CI/CD Integration (10%)

- [ ] Create GitHub Actions workflow
- [ ] Run all test types
- [ ] Generate coverage report
- [ ] Add quality gates

**Deliverable**: Working .github/workflows/test.yml

---

### 7. Presentation (5%)

Create demo showing:
- [ ] Your AI-assisted workflow
- [ ] Key prompts used
- [ ] Results achieved
- [ ] Lessons learned

**Deliverable**: 5-minute video or live demo

---

## Evaluation Rubric

| Criterion | Points | Requirements |
|-----------|--------|--------------|
| **AI Usage** | 25 | Effective prompts, good iteration |
| **Test Quality** | 25 | Strong assertions, edge cases |
| **Coverage** | 15 | 75%+ line coverage |
| **Documentation** | 15 | Complete, accurate, well-structured |
| **CI/CD** | 10 | Working pipeline, quality gates |
| **Presentation** | 10 | Clear demo, good reflections |

### Grading Scale

- **A (90-100)**: Exceptional work, exceeds requirements
- **B (80-89)**: Good work, meets all requirements
- **C (70-79)**: Satisfactory, meets most requirements
- **F (<70)**: Incomplete, needs improvement

---

## Timeline

### Week 1: Setup & Documentation
- Day 1-2: Project setup, CLAUDE.md
- Day 3-4: Generate documentation
- Day 5: Review and refine

### Week 2: Planning & Implementation
- Day 1: Create test plan
- Day 2-3: Implement unit tests
- Day 4: Implement integration tests
- Day 5: Implement E2E tests

### Week 3: Validation & Polish
- Day 1-2: Quality validation
- Day 3: CI/CD setup
- Day 4: Final improvements
- Day 5: Presentation

---

## Submission

### Files to Submit

```
final-project/
├── CLAUDE.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── TESTING.md
├── TEST-PLAN.md
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/workflows/test.yml
├── coverage-report.png
├── quality-report.md
└── presentation.[mp4|link]
```

### Submission Checklist

- [ ] All deliverables complete
- [ ] Tests passing
- [ ] Coverage >= 75%
- [ ] CI pipeline green
- [ ] Documentation reviewed
- [ ] Presentation recorded

---

## Tips for Success

### AI Usage

1. **Start with good context** - CLAUDE.md saves time
2. **Iterate prompts** - First attempt rarely perfect
3. **Chain prompts** - Complex tasks need steps
4. **Review everything** - AI makes mistakes

### Test Quality

1. **Focus on behavior** - Not implementation
2. **Test the risks** - Prioritize what matters
3. **Include edge cases** - Where bugs hide
4. **Make assertions specific** - Catch real issues

### Time Management

1. **Start with P0 tests** - Critical path first
2. **Don't over-document** - Good enough is fine
3. **Ask for help** - When stuck too long
4. **Leave buffer time** - Things take longer

---

## Getting Help

- **Technical issues**: Post in course forum
- **AI not working**: Check CLAUDE.md context
- **Tests failing**: Use debug prompts
- **Coverage stuck**: Ask for gap analysis

---

## Reflection Questions

After completing, reflect on:

1. What worked well with AI assistance?
2. What still required manual work?
3. What prompting techniques were most effective?
4. How would you improve your workflow?
5. What will you apply in your real work?

---

## Sample Project Structure

If using the sample project:

```
ecommerce-api/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── products.controller.js
│   │   └── orders.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── products.service.js
│   │   └── orders.service.js
│   ├── models/
│   │   ├── user.js
│   │   ├── product.js
│   │   └── order.js
│   └── app.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── package.json
```

API Endpoints:
- POST /auth/register
- POST /auth/login
- GET /products
- GET /products/:id
- POST /orders
- GET /orders/:id

---

## Congratulations!

Completing this project demonstrates you can:

- Configure AI tools for your projects
- Generate comprehensive documentation
- Create thorough test plans
- Implement quality automated tests
- Validate and improve test quality
- Integrate testing into CI/CD

You are now an **AI-Augmented QA Automation Engineer**!

---

*Good luck with your final project!*

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes
