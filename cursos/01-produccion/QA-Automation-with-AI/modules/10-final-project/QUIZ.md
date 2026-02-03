# Module 10 Quiz: Final Project Assessment

**Time Limit**: 30 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What is the minimum coverage target for the final project?

a) 50%
b) 60%
c) 75%
d) 90%

---

### Question 2
Which is NOT a required deliverable for the final project?

a) CLAUDE.md
b) Test plan
c) Mobile app
d) CI/CD pipeline

---

### Question 3
How many unit tests are required minimum?

a) 5
b) 10
c) 15
d) 20

---

### Question 4
What pattern should E2E tests follow?

a) MVC
b) Page Object Model
c) Singleton
d) Factory

---

### Question 5
What should the final presentation include?

a) Only test results
b) AI workflow, prompts used, results, and lessons learned
c) Only code walkthrough
d) Only coverage report

---

## True/False (1 point each)

### Question 6
The project must use an organization's private repository.

- [ ] True
- [ ] False

---

### Question 7
Documentation should be generated with AI assistance.

- [ ] True
- [ ] False

---

### Question 8
Mutation testing must be performed on all tests.

- [ ] True
- [ ] False

---

### Question 9
The CI/CD pipeline should include quality gates.

- [ ] True
- [ ] False

---

### Question 10
The test plan should include at least 30 test cases.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List the key deliverables for the final project and their point percentages.

1. _____________ : ____%
2. _____________ : ____%
3. _____________ : ____%
4. _____________ : ____%
5. _____________ : ____%

---

### Question 12
Describe what makes an effective CLAUDE.md for a project.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

### Question 13
What are four tips for success in AI-assisted testing?

1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
4. _____________________________________________

---

## Practical (15 points)

### Question 14
Create a project plan for testing an API with these endpoints:
- POST /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id
- POST /auth/login

**Part A: CLAUDE.md outline (5 points)**

```markdown
# Project Context

## Tech Stack


## Testing


## Commands

```

**Part B: Test plan summary (5 points)**

Unit tests to write:
_________________________________________________________________
_________________________________________________________________

Integration tests to write:
_________________________________________________________________
_________________________________________________________________

E2E tests to write:
_________________________________________________________________
_________________________________________________________________

**Part C: CI/CD quality gates (5 points)**

List 5 quality gates for the pipeline:
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
4. _____________________________________________
5. _____________________________________________

---

## Answer Key

*(For instructor use)*

1. c
2. c
3. c
4. b
5. b
6. False (can use open source or provided sample)
7. True
8. False (at least 5 mutations)
9. True
10. True

### Question 11 (5 points)
Deliverables:
- Project Setup: 10%
- Documentation: 15%
- Test Plan: 15%
- Test Implementation: 30%
- Quality Validation: 15%
- CI/CD: 10%
- Presentation: 5%
(0.7 points each)

### Question 12 (5 points)
Should include:
- Project overview and purpose (1 point)
- Tech stack details (1 point)
- Testing conventions and targets (1 point)
- Commands to run tests/build (1 point)
- Code patterns to follow (1 point)

### Question 13 (5 points)
Tips for success:
- Start with good context (CLAUDE.md)
- Iterate prompts (first attempt rarely perfect)
- Chain prompts for complex tasks
- Review everything AI generates
- Focus on behavior not implementation
- Test the risks
- Include edge cases
- Make assertions specific
(1.25 points each for any 4)

### Question 14 (15 points)

**Part A: CLAUDE.md (5 points)**
```markdown
# Project Context

## Tech Stack
- Node.js/Express
- Jest for testing
- Supertest for API testing

## Testing
- Framework: Jest
- Coverage target: 80%
- Pattern: AAA
- Run: npm test

## Commands
- npm install
- npm test
- npm run lint
```

**Part B: Test plan (5 points)**

Unit tests:
- User validation logic
- Auth token generation
- Password hashing

Integration tests:
- CRUD operations for /users
- Login with valid/invalid credentials
- Authorization checks

E2E tests:
- User registration flow
- Login and access protected route
- User management journey

**Part C: Quality gates (5 points)**
1. All tests pass
2. Coverage >= 80%
3. No lint errors
4. No skipped tests
5. Tests complete < 5 minutes

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 15 points
- **Total: 45 points**

**Passing: 32+ points (70%)**
