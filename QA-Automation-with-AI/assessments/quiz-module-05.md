# Module 5 Quiz: Test Planning with AI

**Time Limit**: 20 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What are the priority levels typically used in test planning?

a) High, Medium, Low
b) P0, P1, P2, P3
c) Critical, Major, Minor
d) All of the above are valid

---

### Question 2
Which test design technique divides input into groups that should behave the same?

a) Boundary Value Analysis
b) Equivalence Partitioning
c) State Transition Testing
d) Decision Table Testing

---

### Question 3
What does Boundary Value Analysis focus on?

a) Random values
b) Values at the edges of valid ranges
c) Only invalid inputs
d) Middle values of ranges

---

### Question 4
What should a coverage matrix map?

a) Only test cases
b) Test cases to requirements, code paths, and risks
c) Only requirements
d) Only defects

---

### Question 5
Which tests should be prioritized first?

a) Edge cases
b) Performance tests
c) Critical business paths
d) UI tests

---

## True/False (1 point each)

### Question 6
A test plan should include test data requirements.

- [ ] True
- [ ] False

---

### Question 7
Risk-based testing prioritizes tests by business impact.

- [ ] True
- [ ] False

---

### Question 8
Every function should have the same number of test cases.

- [ ] True
- [ ] False

---

### Question 9
Test strategy and test plan are the same thing.

- [ ] True
- [ ] False

---

### Question 10
AI can create complete test plans without human review.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
Name four test design techniques and briefly describe each.

1. _____________ : _________________________________
2. _____________ : _________________________________
3. _____________ : _________________________________
4. _____________ : _________________________________

---

### Question 12
For a login function that takes username (5-20 chars) and password (8-30 chars), list boundary values to test.

Username boundaries:
_________________________________________________________________

Password boundaries:
_________________________________________________________________

---

### Question 13
Explain how to prioritize test cases using risk-based testing.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Practical (10 points)

### Question 14
Create a test plan outline for this function:

```javascript
async function transferMoney(fromAccount, toAccount, amount) {
  // Validates accounts, checks balance, transfers money
  // Sends notification to both parties
  // Returns transaction record
}
```

Include:
- 3 P0 test cases
- 3 P1 test cases
- 3 P2 test cases

**Test Cases:**

P0 (Critical):
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________

P1 (Important):
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________

P2 (Nice to have):
1. _____________________________________________
2. _____________________________________________
3. _____________________________________________

---

## Answer Key

*(For instructor use)*

1. d
2. b
3. b
4. b
5. c
6. True
7. True
8. False
9. False (strategy is high-level, plan is detailed)
10. False

### Question 11 (5 points)
Any four of:
- Equivalence Partitioning: Divides inputs into equivalent groups
- Boundary Value Analysis: Tests edges of valid ranges
- State Transition: Tests state changes and transitions
- Decision Table: Tests combinations of conditions
- Error Guessing: Tests likely error scenarios
- Pairwise Testing: Tests combinations of parameters
(1.25 points each)

### Question 12 (5 points)
Username (2.5 points):
- 4 chars (below min)
- 5 chars (min)
- 20 chars (max)
- 21 chars (above max)

Password (2.5 points):
- 7 chars (below min)
- 8 chars (min)
- 30 chars (max)
- 31 chars (above max)

### Question 13 (5 points)
Should mention:
- Assess business impact of failure (1.5 points)
- Consider usage frequency (1 point)
- Evaluate technical complexity (1 point)
- Prioritize high-risk areas first (1.5 points)

### Question 14 (10 points)

P0 (3 points):
- Successful transfer with valid accounts
- Transfer with insufficient balance
- Invalid account number

P1 (3 points):
- Zero amount transfer
- Negative amount transfer
- Same account transfer

P2 (4 points):
- Notification failure handling
- Very large amount transfer
- Special characters in account numbers
- Concurrent transfers

Each test case: appropriate severity, clear description

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
