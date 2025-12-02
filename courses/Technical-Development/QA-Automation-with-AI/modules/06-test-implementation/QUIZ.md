# Module 6 Quiz: Test Implementation

**Time Limit**: 20 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What does AAA stand for in testing?

a) Assert, Act, Arrange
b) Arrange, Act, Assert
c) Act, Assert, Arrange
d) Arrange, Assert, Act

---

### Question 2
When should you use mocks?

a) Never
b) For all dependencies
c) For external services and slow operations
d) Only for databases

---

### Question 3
What is the difference between a mock and a stub?

a) They are the same thing
b) Mocks verify behavior, stubs provide canned responses
c) Stubs are for databases only
d) Mocks are slower than stubs

---

### Question 4
Which is a good test name?

a) test1
b) testCreateUser
c) createUser_withValidData_returnsUserWithId
d) test_function

---

### Question 5
What should you do if AI generates tests with weak assertions?

a) Accept them as-is
b) Delete and rewrite manually
c) Use iterative refinement to strengthen them
d) Skip those tests

---

## True/False (1 point each)

### Question 6
Unit tests should be fast (under 100ms each).

- [ ] True
- [ ] False

---

### Question 7
Integration tests should mock all external dependencies.

- [ ] True
- [ ] False

---

### Question 8
Each test should have multiple assertions testing different things.

- [ ] True
- [ ] False

---

### Question 9
`expect(user).toBeDefined()` is a strong assertion.

- [ ] True
- [ ] False

---

### Question 10
Tests should be independent and runnable in any order.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List four things that should be mocked in unit tests.

1. _____________
2. _____________
3. _____________
4. _____________

---

### Question 12
Transform this weak test into a strong one:

```javascript
test('creates user', async () => {
  const user = await createUser({ name: 'Test', email: 'test@test.com' });
  expect(user).toBeDefined();
});
```

Write improved test:

```javascript



```

---

### Question 13
Write a prompt to generate Jest tests for a `calculateDiscount(price, customerType)` function that returns discounted price.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Practical (10 points)

### Question 14
You receive this AI-generated test. Identify 4 issues and fix them:

```javascript
let db;

test('create and get user', async () => {
  const user = await userService.create({ name: 'Test' });
  userId = user.id;

  const fetched = await userService.get(userId);
  expect(fetched).toBeTruthy();

  await userService.delete(userId);
});

test('update user', async () => {
  await userService.update(userId, { name: 'Updated' });
  const user = await userService.get(userId);
  expect(user.name).toBe('Updated');
});
```

**Issues:**

1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
4. _____________________________________________

**Fixed tests:**

```javascript




```

---

## Answer Key

*(For instructor use)*

1. b
2. c
3. b
4. c
5. c
6. True
7. False (integration tests test real integrations)
8. False (one concept per test)
9. False
10. True

### Question 11 (5 points)
Any four of:
- Database calls
- API/HTTP requests
- File system operations
- Email services
- Payment gateways
- Time/Date (use fake timers)
- Random generators
(1.25 points each)

### Question 12 (5 points)
```javascript
test('creates user with valid data and returns user object', async () => {
  const userData = { name: 'Test', email: 'test@test.com' };

  const user = await createUser(userData);

  expect(user).toMatchObject({
    id: expect.any(Number),
    name: 'Test',
    email: 'test@test.com',
    createdAt: expect.any(Date)
  });
});
```
- Descriptive name (1 point)
- Arrange section (1 point)
- Specific assertions (2 points)
- Checks multiple properties (1 point)

### Question 13 (5 points)
Should include:
- Function description (1 point)
- Framework (Jest) (1 point)
- Test scenarios (regular, VIP, etc.) (1.5 points)
- Edge cases (0 price, negative) (1.5 points)

### Question 14 (10 points)

Issues (4 points, 1 each):
1. Tests share state (userId)
2. Second test depends on first
3. First test does multiple things
4. Weak assertion (toBeTruthy)

Fixed tests (6 points):
```javascript
describe('UserService', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await userService.create({ name: 'Test' });
  });

  afterEach(async () => {
    if (testUser) await userService.delete(testUser.id);
  });

  test('creates user with id and name', async () => {
    const user = await userService.create({ name: 'New' });

    expect(user).toMatchObject({
      id: expect.any(Number),
      name: 'New'
    });

    await userService.delete(user.id);
  });

  test('updates user name', async () => {
    await userService.update(testUser.id, { name: 'Updated' });

    const user = await userService.get(testUser.id);

    expect(user.name).toBe('Updated');
  });
});
```

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
