# Module 2 Quiz: Context Engineering

**Time Limit**: 20 minutes
**Passing Score**: 70% (28+ points out of 40)
**Total Points**: 40

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Instructions

- Answer all questions to the best of your ability
- Multiple choice questions have only ONE correct answer unless otherwise stated
- For short answer and practical questions, write clear, complete responses
- You may not use AI tools during the quiz
- You may reference the course materials

---

## Section A: Multiple Choice (2 points each)

### Question 1
What is the purpose of a CLAUDE.md file?

a) To store API keys and secrets
b) To provide project-level context to Claude
c) To configure your IDE
d) To document code changes

**Answer**: _______

---

### Question 2
Which is the correct context hierarchy from most persistent to most immediate?

a) Prompt → Session → Project
b) Session → Project → Prompt
c) Project → Session → Prompt
d) Prompt → Project → Session

**Answer**: _______

---

### Question 3
What should NOT be included in a CLAUDE.md file?

a) Tech stack description
b) Testing conventions
c) API keys and passwords
d) Code patterns to follow

**Answer**: _______

---

### Question 4
Which is an example of a GOOD prompt for test generation?

a) "Write tests"
b) "Generate tests for the user service"
c) "Generate Jest tests for createUser() with happy path, error cases, and mocks for database"
d) "Test everything"

**Answer**: _______

---

### Question 5
What is iterative refinement?

a) Running tests multiple times
b) Improving AI output through conversation
c) Refactoring code
d) Writing documentation

**Answer**: _______

---

## Section B: True/False (1 point each)

### Question 6
Session-level context is automatically maintained by Claude during a conversation.

**Answer**: [ ] True  [ ] False

---

### Question 7
You should always include examples of expected output in your prompts.

**Answer**: [ ] True  [ ] False

---

### Question 8
A good CLAUDE.md file should be at least 1000 words long.

**Answer**: [ ] True  [ ] False

---

### Question 9
The AAA pattern stands for Arrange, Act, Assert.

**Answer**: [ ] True  [ ] False

---

### Question 10
If AI output is 50% correct, you should start fresh rather than refine.

**Answer**: [ ] True  [ ] False

---

## Section C: Short Answer (5 points each)

### Question 11
List the four components of a good prompt according to the module materials.

1. _____________________________________________

2. _____________________________________________

3. _____________________________________________

4. _____________________________________________

---

### Question 12
Write a CLAUDE.md "Testing Requirements" section for a Python project using pytest with 80% coverage target.

```markdown
## Testing Requirements

[Write your answer here - should include testing framework, coverage target,
naming conventions, patterns to follow, and any other relevant requirements]








```

---

### Question 13
Transform this bad prompt into a good one:

**Bad**: "Write integration tests for the API"

**Good**:

```
[Write your improved prompt here - include context, task, requirements, and format]














```

---

## Section D: Practical Application (10 points)

### Question 14

You have this function:

```javascript
async function processOrder(orderId, userId) {
  const order = await db.orders.findById(orderId);
  if (!order) throw new Error('Order not found');
  if (order.userId !== userId) throw new Error('Unauthorized');
  if (order.status !== 'pending') throw new Error('Order already processed');

  order.status = 'processing';
  await order.save();
  await emailService.sendConfirmation(order);

  return order;
}
```

Write a complete prompt to generate Jest tests for this function. Your prompt should include:
- Context about the function
- Specific test scenarios to cover
- Requirements for mocking
- Expected output format and conventions

**Your prompt**:

```
[Write your complete prompt here]


























```

---

## Answer Key

*(For instructor use only)*

---

### Section A: Multiple Choice (10 points total)

1. **b** - To provide project-level context to Claude
   *(2 points)*

2. **c** - Project → Session → Prompt
   *(2 points)*

3. **c** - API keys and passwords
   *(2 points)*

4. **c** - "Generate Jest tests for createUser() with happy path, error cases, and mocks for database"
   *(2 points)*

5. **b** - Improving AI output through conversation
   *(2 points)*

---

### Section B: True/False (5 points total)

6. **True** - Session context is automatically maintained
   *(1 point)*

7. **True** - Examples help ensure correct format
   *(1 point)*

8. **False** - Length doesn't matter, quality and completeness do
   *(1 point)*

9. **True** - AAA stands for Arrange, Act, Assert
   *(1 point)*

10. **False** - Should refine if 70%+ correct, start fresh if <70%
    *(1 point)*

---

### Section C: Short Answer (15 points total)

### Question 11 (5 points)

**Correct Answer**:
1. Context
2. Task
3. Requirements
4. Format

**Grading**:
- 1.25 points for each correct component
- All four must be present for full credit
- Accept minor variations in wording (e.g., "Constraints" for "Requirements")

---

### Question 12 (5 points)

**Sample Answer**:
```markdown
## Testing Requirements
- Framework: pytest 7.x
- Minimum coverage: 80%
- Test location: tests/ directory mirrors source structure
- Test naming: test_<function>_<scenario>.py
- Use fixtures from conftest.py for shared setup
- Follow AAA pattern (Arrange, Act, Assert)
- Parametrize tests for multiple input scenarios using @pytest.mark.parametrize
- Mock external dependencies (database, APIs, file system)
- Integration tests should be marked with @pytest.mark.integration
```

**Grading Rubric**:
- Framework specified (pytest): **1 point**
- Coverage target specified (80%): **1 point**
- Naming convention included: **1 point**
- Testing pattern mentioned (AAA or similar): **1 point**
- Additional relevant requirements (mocking, fixtures, etc.): **1 point**

**Partial Credit**:
- 0.5 points if framework or coverage is vague
- Accept alternative valid testing patterns (Given-When-Then, etc.)

---

### Question 13 (5 points)

**Sample Answer**:
```
Generate Jest integration tests for the REST API endpoints in src/routes/api/

Endpoints to test:
- POST /api/users (user registration)
- POST /api/auth/login (user authentication)
- GET /api/products (list products)
- POST /api/orders (create order)

Requirements:
- Use supertest for HTTP testing
- Test both success and error responses
- Verify response status codes and body structure
- Mock database operations using jest.mock
- Mock external services (payment gateway, email service)
- Test authentication/authorization (include valid and invalid tokens)
- Test input validation (missing fields, invalid formats)

Output format:
- Group tests by endpoint using describe blocks
- Use beforeEach for common setup (test database, mocks)
- Use afterEach for cleanup
- Follow AAA pattern
- Include comments explaining each test's purpose
```

**Grading Rubric**:
- Specifies test framework (Jest/supertest): **1 point**
- Lists specific endpoints or areas to test: **1 point**
- Includes test scenarios (success, error, edge cases): **1 point**
- Mentions mocking strategy: **1 point**
- Specifies output format/structure: **1 point**

**Partial Credit**:
- 0.5 points if sections are present but vague
- Must have all four components (Context, Task, Requirements, Format) for full credit

---

### Section D: Practical Application (10 points)

### Question 14 (10 points)

**Sample Answer**:
```
Generate Jest unit tests for the processOrder function in src/services/orderService.js

Function context:
- Async function that processes pending orders
- Validates order exists and user authorization
- Checks order status is 'pending'
- Updates order status to 'processing'
- Saves to database and sends confirmation email
- Returns the updated order

Test scenarios to cover:

Success case:
1. Should process order successfully when all conditions are met
   - Verify order status is updated to 'processing'
   - Verify order.save() is called
   - Verify emailService.sendConfirmation is called with correct order
   - Verify the updated order is returned

Error cases:
2. Should throw 'Order not found' when orderId doesn't exist
3. Should throw 'Unauthorized' when userId doesn't match order.userId
4. Should throw 'Order already processed' when status is not 'pending'

Edge cases:
5. Should handle database save failures
6. Should handle email service failures (decide if order should still be processed)

Mocking requirements:
- Mock db.orders.findById to return mock order or null
- Mock order.save() method
- Mock emailService.sendConfirmation
- Use jest.fn() for order.save to verify it's called

Output format:
- Group tests using describe('processOrder', ...)
- Use nested describe blocks for success/error/edge cases
- Include beforeEach to reset all mocks
- Follow AAA pattern with comments
- Use meaningful test names: "should [expected] when [condition]"
- Add assertions to verify exact error messages
```

**Grading Rubric**:

| Criteria | Points | Description |
|----------|--------|-------------|
| **Context provided** | 1 | Explains what the function does |
| **Framework specified** | 1 | Mentions Jest as testing framework |
| **Mocks identified** | 2 | Lists what needs to be mocked (db, emailService) |
| **Test scenarios** | 3 | Includes success, error cases, and edge cases |
| **Expected format** | 2 | Specifies structure, naming, and patterns |
| **Completeness** | 1 | Comprehensive and well-organized |

**Detailed Scoring**:

**Context (1 point)**:
- Full credit: Describes function purpose and behavior
- 0.5 points: Mentions function but lacks detail
- 0 points: No context provided

**Framework (1 point)**:
- Full credit: Specifies Jest
- 0 points: Doesn't specify framework

**Mocks (2 points)**:
- Full credit: Lists all dependencies (db, emailService, order.save)
- 1 point: Lists some but not all
- 0.5 points: Mentions mocking but not specific
- 0 points: No mocking mentioned

**Test Scenarios (3 points)**:
- Full credit: Covers success, all error cases, and edge cases
- 2 points: Covers success and most error cases
- 1 point: Covers success and some errors
- 0.5 points: Only success case
- 0 points: No specific scenarios

**Format (2 points)**:
- Full credit: Specifies structure, naming conventions, patterns
- 1 point: Mentions some format requirements
- 0.5 points: Vague format requirements
- 0 points: No format specified

**Completeness (1 point)**:
- Full credit: Comprehensive, well-organized, nothing major missing
- 0.5 points: Missing minor elements
- 0 points: Incomplete or poorly organized

---

## Scoring Summary

### Total Points: 40

- **Multiple Choice** (Section A): 10 points
- **True/False** (Section B): 5 points
- **Short Answer** (Section C): 15 points
- **Practical** (Section D): 10 points

### Grade Scale

| Score | Grade | Result |
|-------|-------|--------|
| 36-40 | A (90-100%) | Excellent |
| 32-35 | B (80-89%) | Good |
| 28-31 | C (70-79%) | Pass |
| 0-27 | F (<70%) | Fail |

**Passing Score**: 28 points (70%)

---

## Time Management Suggestions

- **Section A** (Multiple Choice): 5 minutes
- **Section B** (True/False): 2 minutes
- **Section C** (Short Answer): 8 minutes
- **Section D** (Practical): 5 minutes

---

## Common Mistakes to Avoid

### On Multiple Choice:
- Don't confuse context levels (Project, Session, Prompt)
- Remember security: never put credentials in CLAUDE.md
- Good prompts are specific, not vague

### On True/False:
- Read carefully: "always" and "never" are usually wrong
- Remember the 70% threshold for refining vs starting fresh
- Quality matters more than length

### On Short Answer:
- For Question 11: List exactly four components
- For Question 12: Include specific, actionable requirements
- For Question 13: Must include all four components (Context, Task, Requirements, Format)

### On Practical:
- Don't just say "write tests" - be specific about scenarios
- Remember to mention mocking
- Include format requirements
- Cover success, error, and edge cases

---

## Study Tips

1. **Review the context hierarchy**: Make sure you understand Project → Session → Prompt
2. **Study the CLAUDE.md examples**: Know what goes in each section
3. **Practice writing prompts**: Take bad prompts and make them better
4. **Understand iterative refinement**: Know when to refine vs start fresh
5. **Review the four components**: Context, Task, Requirements, Format

---

## After the Quiz

### If You Passed (70%+):
Congratulations! You understand the fundamentals of context engineering. Practice these skills as you work through the remaining modules.

### If You Need to Retake (<70%):
- Review the sections where you lost points
- Re-read the corresponding module content
- Practice writing prompts and CLAUDE.md files
- Ask your instructor for additional guidance
- Schedule a retake when you're ready

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
