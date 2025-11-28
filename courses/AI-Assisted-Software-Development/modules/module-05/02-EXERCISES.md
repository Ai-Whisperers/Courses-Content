# Module 5: Exercises
## AI for Testing & Debugging

---

## Exercise 1: Unit Test Generation (15 minutes)

### Objective
Generate comprehensive unit tests.

### Instructions
Use Copilot's `/tests` command to generate tests for:

```javascript
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
  }
  power(base, exponent) { return Math.pow(base, exponent); }
  factorial(n) {
    if (n < 0) throw new Error('Negative factorial');
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}
```

### Deliverable
Complete test file covering all methods and edge cases.

---

## Exercise 2: Edge Case Identification (10 minutes)

### Objective
Use AI to identify edge cases.

### Prompt
```
Identify all edge cases for this function and generate tests:

function parseDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}
```

### Deliverable
List of edge cases and corresponding tests.

---

## Exercise 3: Debug Challenge (15 minutes)

### Objective
Use AI to debug code.

### The Bug
```javascript
function findDuplicates(arr) {
  const seen = {};
  const duplicates = [];

  for (let i = 0; i <= arr.length; i++) {
    if (seen[arr[i]]) {
      duplicates.push(arr[i]);
    } else {
      seen[arr[i]] = true;
    }
  }

  return duplicates;
}

// Expected: findDuplicates([1, 2, 2, 3, 3, 3]) => [2, 3]
// Actual: Sometimes returns undefined in array
```

### Task
1. Share the code and error with Claude
2. Get root cause analysis
3. Apply the fix
4. Write tests to prevent regression

### Deliverable
Fixed code + explanation + tests.

---

## Exercise 4: Coverage Gap Filling (10 minutes)

### Objective
Fill gaps in test coverage.

### The Code
```javascript
function validateUser(user) {
  const errors = [];

  if (!user.email || !user.email.includes('@')) {
    errors.push('Invalid email');
  }

  if (!user.password || user.password.length < 8) {
    errors.push('Password too short');
  }

  if (user.age && (user.age < 0 || user.age > 150)) {
    errors.push('Invalid age');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
```

### Task
Coverage shows lines 8-10 and 12-14 uncovered.

Generate tests to achieve 100% coverage.

### Deliverable
Complete test suite with 100% coverage.

---

## Exercise 5: Integration Test (10 minutes)

### Objective
Generate API integration tests.

### Prompt
```
Generate Jest + Supertest integration tests for this Express route:

router.post('/users', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const user = await User.create({ email, password, name });
  res.status(201).json(user);
});

Include tests for:
- Successful creation
- Missing email
- Missing password
- Database error handling
```

### Deliverable
Integration test file with mocked database.

---

## Submission Checklist

- [ ] Exercise 1: Calculator tests
- [ ] Exercise 2: Edge cases identified
- [ ] Exercise 3: Bug fixed with tests
- [ ] Exercise 4: Coverage at 100%
- [ ] Exercise 5: Integration tests

---

*Module 5 Exercises - AI for Testing & Debugging*
