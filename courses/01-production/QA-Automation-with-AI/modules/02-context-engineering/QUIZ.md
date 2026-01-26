# Module 2 Quiz: Context Engineering

**Time Limit**: 20 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What is the purpose of a CLAUDE.md file?

a) To store API keys and secrets
b) To provide project-level context to Claude
c) To configure your IDE
d) To document code changes

---

### Question 2
Which is the correct context hierarchy from most persistent to most immediate?

a) Prompt → Session → Project
b) Session → Project → Prompt
c) Project → Session → Prompt
d) Prompt → Project → Session

---

### Question 3
What should NOT be included in a CLAUDE.md file?

a) Tech stack description
b) Testing conventions
c) API keys and passwords
d) Code patterns to follow

---

### Question 4
Which is an example of a GOOD prompt for test generation?

a) "Write tests"
b) "Generate tests for the user service"
c) "Generate Jest tests for createUser() with happy path, error cases, and mocks for database"
d) "Test everything"

---

### Question 5
What is iterative refinement?

a) Running tests multiple times
b) Improving AI output through conversation
c) Refactoring code
d) Writing documentation

---

## True/False (1 point each)

### Question 6
Session-level context is automatically maintained by Claude during a conversation.

- [ ] True
- [ ] False

---

### Question 7
You should always include examples of expected output in your prompts.

- [ ] True
- [ ] False

---

### Question 8
A good CLAUDE.md file should be at least 1000 words long.

- [ ] True
- [ ] False

---

### Question 9
The AAA pattern stands for Arrange, Act, Assert.

- [ ] True
- [ ] False

---

### Question 10
If AI output is 50% correct, you should start fresh rather than refine.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List the four components of a good prompt.

1. _____________
2. _____________
3. _____________
4. _____________

---

### Question 12
Write a CLAUDE.md "Testing Requirements" section for a Python project using pytest with 80% coverage target.

```markdown
## Testing Requirements



```

---

### Question 13
Transform this bad prompt into a good one:

**Bad**: "Write integration tests for the API"

**Good**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Practical (10 points)

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

Write a complete prompt to generate Jest tests for this function. Include context, requirements, and specific test scenarios.

**Your prompt**:

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Answer Key

*(For instructor use)*

1. b
2. c
3. c
4. c
5. b
6. True
7. True
8. False
9. True
10. False (refine if 70%+ correct)

### Question 11 (5 points)
1. Context
2. Task
3. Requirements
4. Format
(1.25 points each)

### Question 12 (5 points)
Should include:
- Framework: pytest (1 point)
- Coverage target: 80% (1 point)
- Naming convention (1 point)
- Pattern (AAA or similar) (1 point)
- Any other relevant requirements (1 point)

### Question 13 (5 points)
Should include:
- Specify framework (1 point)
- List endpoints to test (1 point)
- Include scenarios (success, error) (1 point)
- Mention requirements (mocking, etc) (1 point)
- Overall structure (1 point)

### Question 14 (10 points)
Should include:
- Context about the function (1 point)
- Framework specification (1 point)
- List of mocks needed (db, emailService) (2 points)
- Test scenarios:
  - Success case (1 point)
  - Order not found (1 point)
  - Unauthorized (1 point)
  - Already processed (1 point)
- Expected format/conventions (1 point)
- Clear structure (1 point)

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
