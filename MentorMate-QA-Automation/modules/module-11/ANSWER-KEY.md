# Module 11: Advanced Testing Strategies
## Quiz Answer Key

---

## For Instructors Only

This document contains answers and grading guidelines for the Module 11 quiz.

---

## Answer Key

### Section 1: Visual Regression Testing

**Question 1: B**
Visual regression testing detects unintended visual changes between releases by comparing screenshots.

**Question 2: B**
`expect(page).toHaveScreenshot()` is Playwright's built-in method for visual comparison.

**Question 3: B**
Use the `mask` option to hide dynamic elements like timestamps or ads that change between test runs.

**Question 4: B**
A baseline is the approved reference screenshot that subsequent screenshots are compared against.

**Question 5: B (False)**
Visual regression tests complement but cannot replace functional, accessibility, performance, and security testing.

---

### Section 2: Accessibility Testing

**Question 6: A**
WCAG = Web Content Accessibility Guidelines, the international standard for web accessibility.

**Question 7: B**
axe-core is the most popular accessibility testing engine, available for Playwright via @axe-core/playwright.

**Question 8: C**
WCAG 2.1 AA requires a minimum contrast ratio of 4.5:1 for normal text (3:1 for large text).

**Question 9: D**
Accessibility testing is important for legal compliance, better UX, and SEO benefits - all of the above.

**Question 10: C**
Slow page load time is a performance issue, not an accessibility issue (though it can affect usability).

---

### Section 3: Cross-Browser Testing

**Question 11: C**
Playwright supports Chromium (Chrome/Edge), Firefox, and WebKit (Safari) natively.

**Question 12: B**
Device emulation simulates device characteristics like viewport size, user agent, and touch capabilities.

**Question 13: B**
Use `npx playwright test --project=chromium` to run tests on a specific browser project.

**Question 14: B (False)**
Different browsers have different rendering engines and can display content differently.

**Question 15: B**
`npx playwright install` installs all supported browsers.

---

### Section 4: Security & Test Stability

**Question 16: B**
Use environment variables for sensitive data to keep credentials out of source code.

**Question 17: B**
A flaky test passes or fails inconsistently without any changes to the code.

**Question 18: B**
Playwright's auto-waiting and explicit wait conditions are better than arbitrary timeouts.

**Question 19: B**
Test isolation means each test is independent and doesn't rely on or affect other tests.

**Question 20: B (False)**
Tests should never share state or depend on execution order - this causes flakiness.

---

### Section 5: Reporting & Optimization

**Question 21: B**
Allure is a test reporting framework that generates detailed reports and dashboards.

**Question 22: B**
`workers: 4` in playwright.config.js enables parallel execution with 4 workers.

**Question 23: B**
Test sharding divides tests across multiple machines for faster parallel execution.

**Question 24: B**
TTFB (Time To First Byte) measures the time from request to first byte of response.

**Question 25: C**
Always investigate and fix the root cause of flaky tests - don't ignore or delete them.

---

## Bonus Answers

### Bonus 1: Strategies for Dynamic Content

**Expected answer should include 3 of these:**

1. **Masking** - Use `mask` option to hide dynamic elements during screenshot
2. **Disabling animations** - Add CSS to disable all animations
3. **Mocking data** - Mock APIs to return consistent data
4. **Waiting for stability** - Wait for network idle and animations to complete
5. **Using thresholds** - Set pixel difference thresholds to allow minor variations
6. **Element-specific screenshots** - Screenshot only static components

**Grading:** 2 points per valid strategy (max 6 points)

---

### Bonus 2: WCAG Compliance Levels

**Expected answer:**

- **Level A (Minimum):** Basic accessibility requirements. Without these, some users cannot use the site at all. Example: All images have alt text.

- **Level AA (Standard):** Most common compliance target. Addresses major barriers. Example: 4.5:1 color contrast ratio for text.

- **Level AAA (Enhanced):** Highest level, not always achievable. Example: 7:1 contrast ratio, sign language for video.

**Grading:**
- Level A explained: 2 points
- Level AA explained: 2 points
- Level AAA explained: 2 points
- Max 6 points

---

### Bonus 3: Test Flakiness Causes and Solutions

**Expected answer should include 5 of these:**

| Cause | Solution |
|-------|----------|
| Race conditions | Use explicit waits for specific conditions |
| Network variability | Mock APIs or wait for network idle |
| Timing issues | Use Playwright's auto-waiting |
| Test interdependence | Isolate tests, reset state |
| Animated elements | Disable animations or wait for completion |
| Dynamic data | Use factories or mock consistent data |
| Element not ready | Check element is enabled/visible before action |
| Stale element references | Re-locate elements when needed |

**Grading:** 2 points per valid cause-solution pair (max 10 points)

---

## Grading Summary

| Section | Questions | Points per Question | Total |
|---------|-----------|---------------------|-------|
| Visual Regression | 5 | 4 | 20 |
| Accessibility | 5 | 4 | 20 |
| Cross-Browser | 5 | 4 | 20 |
| Security & Stability | 5 | 4 | 20 |
| Reporting & Optimization | 5 | 4 | 20 |
| **Main Quiz Total** | **25** | - | **100** |
| Bonus 1 | 1 | up to 6 | 6 |
| Bonus 2 | 1 | up to 6 | 6 |
| Bonus 3 | 1 | up to 10 | 10 |
| **Total with Bonus** | **28** | - | **122** |

**Passing Score:** 70 points (70%)

---

## Common Mistakes to Watch For

1. **Question 3:** Students may choose A (ignore) - emphasize that ignoring causes false failures
2. **Question 8:** Common confusion with 3:1 (that's for large text only)
3. **Question 17:** Students may confuse with always-failing tests
4. **Question 18:** Many students think waitForTimeout is acceptable
5. **Question 20:** Important concept - tests must be independent

---

## Feedback Templates

### Passing (70-84%):
"Good understanding of advanced testing concepts. Review the sections you missed and ensure you can apply these in your final project."

### Excellent (85-100%):
"Excellent mastery of advanced testing strategies! You're ready to implement these in your final project."

### Needs Improvement (<70%):
"Please review the module materials and retake the quiz. Focus on: [list missed sections]. Schedule office hours if needed."

---

*Module 11 Answer Key*
*For Instructor Use Only*
*MentorMate QA Automation Course*
