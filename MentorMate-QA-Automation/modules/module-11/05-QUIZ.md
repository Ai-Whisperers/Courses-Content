# Module 11: Advanced Testing Strategies
## Assessment Quiz

---

## Quiz Information

**Total Questions:** 25
**Passing Score:** 70% (18 correct answers)
**Time Limit:** 30 minutes
**Format:** Multiple choice and true/false

---

## Section 1: Visual Regression Testing (5 questions)

### Question 1
What is the primary purpose of visual regression testing?

A) To test application performance
B) To detect unintended visual changes between releases
C) To validate API responses
D) To check database integrity

---

### Question 2
Which Playwright method is used for screenshot comparison?

A) `page.screenshot()`
B) `expect(page).toHaveScreenshot()`
C) `page.compareVisual()`
D) `expect(page).toMatchImage()`

---

### Question 3
How should you handle dynamic content (like timestamps) in visual tests?

A) Ignore it completely
B) Use the `mask` option to hide dynamic elements
C) Take screenshots only at midnight
D) Delete the dynamic content before testing

---

### Question 4
What is a "baseline" in visual regression testing?

A) The first line of test code
B) The approved reference screenshot to compare against
C) The minimum acceptable test coverage
D) The database seed data

---

### Question 5
True or False: Visual regression tests can replace all other forms of testing.

A) True
B) False

---

## Section 2: Accessibility Testing (5 questions)

### Question 6
What does WCAG stand for?

A) Web Content Accessibility Guidelines
B) Website Compliance And Governance
C) Web Code Analysis Guidelines
D) Worldwide Content Access Group

---

### Question 7
Which tool is commonly used for automated accessibility testing in Playwright?

A) Jest
B) axe-core
C) Lighthouse
D) WebDriver

---

### Question 8
What is the minimum color contrast ratio recommended by WCAG 2.1 AA for normal text?

A) 2:1
B) 3:1
C) 4.5:1
D) 7:1

---

### Question 9
Why is accessibility testing important?

A) Legal compliance requirements
B) Better user experience for all users
C) SEO benefits
D) All of the above

---

### Question 10
Which of these is NOT a common accessibility issue?

A) Missing alt text on images
B) Low color contrast
C) Slow page load time
D) Missing form labels

---

## Section 3: Cross-Browser Testing (5 questions)

### Question 11
Which browsers does Playwright natively support?

A) Chrome only
B) Chrome and Firefox only
C) Chromium, Firefox, and WebKit
D) All browsers including Internet Explorer

---

### Question 12
What is the purpose of device emulation in Playwright?

A) To test on actual physical devices
B) To simulate device characteristics like viewport and user agent
C) To replace cloud testing platforms
D) To speed up test execution

---

### Question 13
How do you run Playwright tests on a specific browser project?

A) `npx playwright test --browser=chrome`
B) `npx playwright test --project=chromium`
C) `npx playwright run chromium`
D) `npm test -- --chrome`

---

### Question 14
True or False: Cross-browser testing is unnecessary if your application works in Chrome.

A) True
B) False

---

### Question 15
What command installs all Playwright browsers?

A) `npm install browsers`
B) `npx playwright install`
C) `npx playwright browsers --all`
D) `npm run install-browsers`

---

## Section 4: Security & Test Stability (5 questions)

### Question 16
Which of these is a security testing best practice?

A) Hardcoding passwords in test files
B) Using environment variables for sensitive data
C) Committing .env files to git
D) Sharing test credentials publicly

---

### Question 17
What is a "flaky test"?

A) A test that always fails
B) A test that passes or fails inconsistently without code changes
C) A test with poor code coverage
D) A deprecated test

---

### Question 18
Which approach helps reduce test flakiness?

A) Using arbitrary `waitForTimeout()` calls
B) Using Playwright's auto-waiting and explicit conditions
C) Running tests only once
D) Ignoring intermittent failures

---

### Question 19
What is test isolation?

A) Running tests in separate buildings
B) Ensuring each test is independent and doesn't affect others
C) Testing in isolation from the internet
D) Running only one test at a time

---

### Question 20
True or False: It's acceptable for tests to share state and depend on execution order.

A) True
B) False

---

## Section 5: Reporting & Optimization (5 questions)

### Question 21
What is Allure used for in test automation?

A) Writing test code
B) Generating test reports and dashboards
C) Running tests in parallel
D) Managing test data

---

### Question 22
Which configuration enables parallel test execution in Playwright?

A) `parallel: true`
B) `workers: 4`
C) `concurrent: true`
D) `multithread: enabled`

---

### Question 23
What is test sharding?

A) Deleting old tests
B) Dividing tests across multiple machines for faster execution
C) Encrypting test data
D) Sharing tests between teams

---

### Question 24
Which metric measures time from request to first byte of response?

A) FCP (First Contentful Paint)
B) TTFB (Time To First Byte)
C) LCP (Largest Contentful Paint)
D) CLS (Cumulative Layout Shift)

---

### Question 25
What should you do when you find a flaky test?

A) Delete it immediately
B) Ignore it and move on
C) Investigate and fix the root cause
D) Increase the timeout to 5 minutes

---

## Bonus Questions (3 questions)

### Bonus 1
Describe three strategies for handling dynamic content in visual regression tests.

---

### Bonus 2
Explain the difference between WCAG Level A, AA, and AAA compliance.

---

### Bonus 3
List five common causes of test flakiness and their solutions.

---

## Submission Instructions

1. Complete all 25 required questions
2. Bonus questions are optional but recommended
3. Submit via course LMS or provided form
4. Results will be available within 24 hours

---

**Passing this quiz is required before starting the Final Project.**

---

*Module 11 Quiz*
*MentorMate QA Automation Course*
*Last Updated: November 2024*
