# Quiz 12: Advanced Playwright Techniques

## Instructions

- Answer all questions
- Each question is worth 10 points
- Passing score: 70%

---

## Multiple Choice

### Question 1

What is the PRIMARY benefit of mocking network requests in tests?

A) Tests run without an internet connection
B) Tests are faster and more reliable
C) Tests can modify the real database
D) Tests don't need assertions

---

### Question 2

Which method is used to intercept network requests in Playwright?

A) `page.intercept()`
B) `page.route()`
C) `page.mock()`
D) `page.catch()`

---

### Question 3

What does `storageState` contain after saving authentication?

A) Only cookies
B) Only localStorage
C) Cookies and localStorage
D) Username and password

---

### Question 4

When running visual regression tests for the first time, what happens?

A) Test fails because no baseline exists
B) Baseline screenshots are created
C) Test is skipped automatically
D) An error is thrown

---

### Question 5

How does Playwright handle Shadow DOM elements by default?

A) Throws an error
B) Requires special selectors
C) Pierces through automatically
D) Ignores them completely

---

## Code Analysis

### Question 6

What is wrong with this network mock?

```typescript
test('test user data', async ({ page }) => {
  await page.goto('/users');

  await page.route('**/api/users', route =>
    route.fulfill({ status: 200, body: '[{"id": 1}]' })
  );

  await expect(page.getByText('User 1')).toBeVisible();
});
```

**Your Answer:**

_______________________________________________

---

### Question 7

What does this locator chain select?

```typescript
page.getByRole('row')
  .filter({ hasText: 'Active' })
  .getByRole('button', { name: 'Edit' })
```

**Your Answer:**

_______________________________________________

---

## Short Answer

### Question 8

List TWO scenarios where you would use `mask` option in visual tests.

**Your Answer:**

1. _______________
2. _______________

---

### Question 9

Why should you avoid `page.waitForTimeout(3000)` in tests? What should you use instead?

**Your Answer:**

_______________________________________________

---

## Practical

### Question 10

Write a test that:
1. Mocks a 404 error response for `/api/product/123`
2. Navigates to `/product/123`
3. Verifies "Product not found" message is displayed

```typescript
// Write your test here



```

---

## Answer Key

### Question 1
**Answer: B** - Tests are faster and more reliable

Mocking eliminates network latency and backend dependencies, making tests faster and less flaky.

---

### Question 2
**Answer: B** - `page.route()`

`page.route()` is the Playwright method for intercepting and modifying network requests.

---

### Question 3
**Answer: C** - Cookies and localStorage

`storageState` saves both cookies and localStorage, preserving the full authentication state.

---

### Question 4
**Answer: B** - Baseline screenshots are created

First run creates baseline images. Subsequent runs compare against these baselines.

---

### Question 5
**Answer: C** - Pierces through automatically

Playwright automatically handles Shadow DOM without requiring special selectors.

---

### Question 6
**Sample Answer:**

The `page.route()` is set up AFTER `page.goto()`. The route handler must be registered before the navigation that triggers the request. The route should be set up first, then navigate.

---

### Question 7
**Sample Answer:**

It selects the "Edit" button within table rows that contain the text "Active". First finds all rows, filters to those with "Active" text, then finds the Edit button within those filtered rows.

---

### Question 8
**Sample Answers (any 2):**
1. Dynamic timestamps/dates
2. User avatars or profile pictures
3. Advertisements
4. Random generated content
5. Animations or videos
6. User-specific data (names, IDs)

---

### Question 9
**Sample Answer:**

`waitForTimeout` creates flaky tests - it might wait too long (slow) or not long enough (fails). Use condition-based waits like `expect(locator).toBeVisible()` or `page.waitForSelector()` instead. These wait only as long as needed and fail fast if the condition isn't met.

---

### Question 10
**Sample Answer:**

```typescript
test('shows not found for missing product', async ({ page }) => {
  await page.route('**/api/product/123', route =>
    route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Not found' })
    })
  );

  await page.goto('/product/123');
  await expect(page.getByText('Product not found')).toBeVisible();
});
```

---

## Scoring

| Score | Grade |
|-------|-------|
| 90-100 | A - Excellent |
| 80-89 | B - Good |
| 70-79 | C - Passing |
| Below 70 | Needs Review |
