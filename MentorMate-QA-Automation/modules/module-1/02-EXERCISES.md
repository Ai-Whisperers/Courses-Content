# Module 1: Exercises
## Introduction to QA & Testing Fundamentals

---

## Exercise 1: QA Concepts Quiz (Written)

**Objective:** Test your understanding of QA fundamentals

**Instructions:** Answer the following questions in your own words. Save your answers in a file called `exercise-1-answers.md`

### Questions:

1. **What is the difference between QA, QC, and Testing?**
   - Write a 2-3 sentence explanation for each
   - Provide a real-world example for each

2. **Explain the Testing Pyramid**
   - Why do we have more unit tests than E2E tests?
   - What are the trade-offs?

3. **When would you choose manual testing over automated testing?**
   - List 3 scenarios
   - Explain your reasoning

4. **What is regression testing and why is it important?**
   - Define it
   - Give an example from a real application

5. **Describe the role of QA in Agile development**
   - How does QA fit into sprints?
   - What activities does QA perform throughout the sprint?

**Time:** 20-30 minutes

**Deliverable:** `exercise-1-answers.md` file

---

## Exercise 2: Testing Type Identification

**Objective:** Classify different testing scenarios

**Instructions:** For each scenario below, identify:
- The type of testing (unit, integration, E2E, performance, security, etc.)
- Whether it should be manual or automated
- Your reasoning

Save your answers in `exercise-2-testing-types.md`

### Scenarios:

1. **Scenario A:**
   "Check if the login button changes color when you hover over it"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

2. **Scenario B:**
   "Verify that the shopping cart calculates the total price correctly when adding multiple items"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

3. **Scenario C:**
   "Test if 1000 users can simultaneously log in to the application"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

4. **Scenario D:**
   "Check if the payment processing API correctly communicates with the inventory database"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

5. **Scenario E:**
   "Verify that sensitive user data is encrypted in the database"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

6. **Scenario F:**
   "Test the complete user journey from registration to checkout in an e-commerce site"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

7. **Scenario G:**
   "Verify that the website is usable for people using screen readers"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

8. **Scenario H:**
   "Check if all existing features still work after a new release"
   - Type: _______________
   - Manual or Automated: _______________
   - Reasoning: _______________

**Time:** 30 minutes

**Deliverable:** `exercise-2-testing-types.md`

---

## Exercise 3: SDLC & Testing Activities

**Objective:** Map QA activities to SDLC phases

**Instructions:** Create a table showing what QA activities happen in each phase of the SDLC.

Use the template below and fill in at least 3 activities per phase.

```markdown
# SDLC & QA Activities Mapping

## Phase 1: Planning
- [ ] Activity 1: _______________
- [ ] Activity 2: _______________
- [ ] Activity 3: _______________

## Phase 2: Requirements Analysis
- [ ] Activity 1: _______________
- [ ] Activity 2: _______________
- [ ] Activity 3: _______________

## Phase 3: Design
- [ ] Activity 1: _______________
- [ ] Activity 2: _______________
- [ ] Activity 3: _______________

## Phase 4: Development
- [ ] Activity 1: _______________
- [ ] Activity 2: _______________
- [ ] Activity 3: _______________

## Phase 5: Testing
- [ ] Activity 1: _______________
- [ ] Activity 2: _______________
- [ ] Activity 3: _______________

## Phase 6: Deployment
- [ ] Activity 1: _______________
- [ ] Activity 2: _______________
- [ ] Activity 3: _______________

## Phase 7: Maintenance
- [ ] Activity 1: _______________
- [ ] Activity 2: _______________
- [ ] Activity 3: _______________
```

**Time:** 20 minutes

**Deliverable:** `exercise-3-sdlc-qa.md`

---

## Exercise 4: Test Case Writing Practice

**Objective:** Write your first manual test cases

**Instructions:** Write detailed test cases for the following scenarios using the template provided.

### Template:
```
Test Case ID: TC-XXX
Test Case Title: [Descriptive title]
Priority: High/Medium/Low
Preconditions: [What needs to be set up before]
Test Steps:
  1. [Action]
  2. [Action]
  3. [Action]
Expected Result: [What should happen]
Test Data: [Any data needed]
```

### Scenarios to Test:

1. **Login Functionality** - User logs in with valid credentials
2. **Login Functionality** - User tries to login with invalid password
3. **Registration** - New user registers with all required fields
4. **Shopping Cart** - User adds item to cart
5. **Search** - User searches for a product

**Example:**
```
Test Case ID: TC-001
Test Case Title: User successfully logs in with valid credentials
Priority: High
Preconditions: 
  - User account exists in system
  - User is on the login page
Test Steps:
  1. Enter valid email: "test@example.com"
  2. Enter valid password: "ValidPass123!"
  3. Click "Login" button
Expected Result: 
  - User is redirected to dashboard
  - Welcome message displays user's name
  - Session token is created
Test Data: 
  - Email: test@example.com
  - Password: ValidPass123!
```

**Time:** 45 minutes

**Deliverable:** `exercise-4-test-cases.md` with 5 complete test cases

---

## Exercise 5: Automation ROI Calculator

**Objective:** Understand the business value of test automation

**Instructions:** Calculate the ROI for automating a regression test suite.

### Scenario:
- Manual regression testing takes: 40 hours per release
- There are: 12 releases per year
- QA hourly rate: $30/hour
- Time to build automation framework: 80 hours
- Time to maintain automation per year: 20 hours
- Automated test suite runs in: 2 hours

### Calculate:

1. **Manual testing cost per year:**
   - Calculation: _______________
   - Result: $_____________

2. **Automation development cost:**
   - Initial build: $_____________
   - Annual maintenance: $_____________
   - Total year 1: $_____________

3. **Time saved per year:**
   - Hours saved: _______________
   - Money saved: $_____________

4. **ROI for Year 1:**
   - Formula: (Savings - Investment) / Investment × 100%
   - Calculation: _______________
   - Result: _______________%

5. **Break-even point:**
   - After how many releases: _______________

6. **3-Year ROI:**
   - Year 1: $_____________
   - Year 2: $_____________
   - Year 3: $_____________
   - Total 3-year ROI: _______________%

**Time:** 30 minutes

**Deliverable:** `exercise-5-roi-calculator.md`

---

## Exercise 6: Tool Research & Comparison

**Objective:** Understand the automation tool landscape

**Instructions:** Research and compare test automation tools.

Create a comparison table with the following tools:
- Playwright
- Selenium
- Cypress
- Puppeteer

### Comparison Criteria:
1. Programming languages supported
2. Browser support
3. Cost (free/paid)
4. Learning curve
5. Speed
6. Community size
7. Auto-waiting
8. Mobile testing support
9. API testing capabilities
10. Pros (at least 3)
11. Cons (at least 3)

### Template:
```markdown
# Test Automation Tools Comparison

## Playwright
- **Languages:** _______________
- **Browsers:** _______________
- **Cost:** _______________
- **Learning Curve:** _______________
- **Speed:** _______________
...
```

**Bonus:** Add Postman and 2 API testing alternatives to your comparison.

**Time:** 45 minutes

**Deliverable:** `exercise-6-tool-comparison.md`

---

## Exercise 7: Create Your QA Learning Plan

**Objective:** Plan your learning journey

**Instructions:** Create a personalized learning plan for this course.

### Your Learning Plan Should Include:

1. **Time Commitment**
   - Hours per week: _______________
   - Best study times: _______________
   - Study location: _______________

2. **Goals**
   - By end of Month 1: _______________
   - By end of Month 2: _______________
   - By end of Month 3: _______________
   - Final project idea: _______________

3. **Learning Style**
   - Preferred method (reading/video/doing): _______________
   - How you learn best: _______________
   - Potential challenges: _______________
   - Solutions for challenges: _______________

4. **Resources**
   - Additional learning resources you'll use: _______________
   - Study buddy or accountability partner: _______________
   - When you'll ask for help: _______________

5. **Weekly Schedule**
   ```
   Monday: _______________
   Tuesday: _______________
   Wednesday: _______________
   Thursday: _______________
   Friday: _______________
   Weekend: _______________
   ```

6. **Motivation**
   - Why you're taking this course: _______________
   - What success looks like: _______________
   - How you'll celebrate milestones: _______________

**Time:** 30 minutes

**Deliverable:** `exercise-7-learning-plan.md`

---

## Exercise 8: Bug Report Writing

**Objective:** Learn to write clear, actionable bug reports

**Instructions:** Write bug reports for the following scenarios using the template.

### Bug Report Template:
```markdown
## Bug Report: [Short Title]

**Bug ID:** BUG-XXX
**Reported By:** [Your Name]
**Date:** [Date]
**Severity:** Critical/High/Medium/Low
**Priority:** P1/P2/P3/P4
**Status:** New
**Environment:** 
  - Browser: _______________
  - OS: _______________
  - URL: _______________

**Summary:** 
[One-line description]

**Preconditions:**
- [What was set up before]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshots/Videos:**
[Attach or describe]

**Additional Information:**
- Console errors: _______________
- Network errors: _______________
- Workaround: _______________

**Impact:**
[Who is affected and how]
```

### Scenarios to Report:

1. **Login Bug:** User can login with empty password field
2. **Cart Bug:** Adding 10 items to cart only shows 9 items
3. **Performance Bug:** Homepage takes 30 seconds to load
4. **UI Bug:** Submit button is cut off on mobile devices
5. **Data Bug:** User profile shows wrong email after update

**Time:** 45 minutes

**Deliverable:** `exercise-8-bug-reports.md` with 5 complete bug reports

---

## Exercise 9: Test Strategy Document (Mini)

**Objective:** Create a high-level test strategy

**Instructions:** You're assigned to test a new e-commerce feature: "Wishlist". Create a mini test strategy.

### Your Strategy Should Include:

1. **Scope**
   - What will be tested: _______________
   - What won't be tested: _______________

2. **Test Approach**
   - Manual testing: _______________
   - Automated testing: _______________

3. **Test Types**
   - Functional tests: _______________
   - Non-functional tests: _______________

4. **Entry Criteria**
   - When can testing start: _______________

5. **Exit Criteria**
   - When is testing complete: _______________

6. **Test Environment**
   - Where will testing happen: _______________

7. **Risks**
   - Risk 1: _______________
   - Risk 2: _______________
   - Mitigation: _______________

8. **Schedule**
   - Duration: _______________
   - Milestones: _______________

9. **Deliverables**
   - What will you produce: _______________

10. **Success Metrics**
    - How will you measure success: _______________

**Time:** 40 minutes

**Deliverable:** `exercise-9-test-strategy.md`

---

## Exercise 10: ChatGPT for QA (Practical)

**Objective:** Learn to use AI to assist your QA work

**Instructions:** Use ChatGPT (free version) to help with various QA tasks.

### Tasks:

1. **Generate Test Cases**
   - Prompt: "Generate 5 test cases for a login form with email and password fields"
   - Document the response
   - Rate the quality (1-5): _______________
   - What would you improve: _______________

2. **Create Test Data**
   - Prompt: "Generate 10 realistic user profiles with name, email, age, and address"
   - Document the response
   - How useful is this (1-5): _______________

3. **Explain a Testing Concept**
   - Prompt: "Explain boundary value analysis with examples"
   - Document the response
   - Did you learn something new: _______________

4. **Review a Test Case**
   - Write a basic test case
   - Prompt: "Review this test case and suggest improvements: [paste your test case]"
   - Document the suggestions
   - Will you implement them: _______________

5. **Generate Bug Report Template**
   - Prompt: "Create a bug report template for a QA team"
   - Compare with the template provided in Exercise 8
   - What's different: _______________

### Deliverable Format:
```markdown
# ChatGPT for QA - Exercise Results

## Task 1: Generate Test Cases
**My Prompt:**
[exact prompt]

**ChatGPT Response:**
[copy the response]

**My Assessment:**
- Quality: X/5
- Improvements needed: _______________
- Would I use this: Yes/No
- Why: _______________

[Repeat for each task]

## Reflection:
- How can AI help me in this course: _______________
- Limitations I noticed: _______________
- Best use cases: _______________
```

**Time:** 45 minutes

**Deliverable:** `exercise-10-chatgpt-qa.md`

---

## Bonus Exercise: QA Case Study Analysis

**Objective:** Learn from real-world QA scenarios

**Instructions:** Read about famous software bugs and analyze them.

### Bugs to Research:

1. **Therac-25 Radiation Therapy Bug** (1985-1987)
2. **Ariane 5 Rocket Explosion** (1996)
3. **Knight Capital Trading Glitch** (2012)
4. **Healthcare.gov Launch Issues** (2013)
5. **Tesla Autopilot Issues** (various)

### For Each Bug, Document:

1. **What happened:**
   - Brief description: _______________

2. **Root cause:**
   - Technical cause: _______________
   - Process failure: _______________

3. **Impact:**
   - Financial: _______________
   - Safety: _______________
   - Reputation: _______________

4. **Could it have been prevented:**
   - Testing approach that could have caught it: _______________

5. **Lessons learned:**
   - Key takeaway: _______________

6. **Relevance to your work:**
   - How does this apply to MentorMate: _______________

**Time:** 60 minutes

**Deliverable:** `bonus-case-study-analysis.md`

---

## Exercise Submission Instructions

### How to Submit:

1. **Create a folder:** `module-1-exercises/`
2. **Add all exercise files** to this folder
3. **Commit to your GitHub repo:**
   ```bash
   git add module-1-exercises/
   git commit -m "Complete Module 1 exercises"
   git push origin main
   ```
4. **Verify** files are visible on GitHub
5. **Share your repository link** with your mentor

### Grading Criteria:

| Exercise | Points | Criteria |
|----------|--------|----------|
| Exercise 1-3 | 5 each | Completeness & understanding |
| Exercise 4 | 10 | Test case quality |
| Exercise 5 | 5 | Correct calculations |
| Exercise 6 | 5 | Research thoroughness |
| Exercise 7 | 5 | Realistic planning |
| Exercise 8 | 10 | Bug report clarity |
| Exercise 9 | 10 | Strategy completeness |
| Exercise 10 | 10 | AI usage understanding |
| Bonus | 5 | Extra credit |

**Total: 65 points (60 required + 5 bonus)**
**Passing: 42 points (70%)**

---

## Self-Assessment Checklist

Before submitting, check:

- [ ] All required exercises completed
- [ ] Answers are in your own words
- [ ] Examples are specific and relevant
- [ ] Files are properly named
- [ ] Markdown formatting is correct
- [ ] All calculations are shown (Exercise 5)
- [ ] Committed to GitHub repository
- [ ] Repository is public or shared with mentor
- [ ] README.md exists in your repo

---

## Tips for Success:

1. **Don't rush** - Quality over speed
2. **Be specific** - Avoid generic answers
3. **Use examples** - Real-world scenarios
4. **Show your work** - Explain your thinking
5. **Format nicely** - Use markdown properly
6. **Ask questions** - If something is unclear
7. **Learn from mistakes** - Iterate and improve
8. **Collaborate** - Discuss with peers (but write your own answers)

---

## Time Management:

- **Exercise 1:** 30 min
- **Exercise 2:** 30 min
- **Exercise 3:** 20 min
- **Exercise 4:** 45 min
- **Exercise 5:** 30 min
- **Exercise 6:** 45 min
- **Exercise 7:** 30 min
- **Exercise 8:** 45 min
- **Exercise 9:** 40 min
- **Exercise 10:** 45 min
- **Bonus:** 60 min (optional)

**Total: 5-6 hours** (without bonus)

---

**Ready to start? Begin with Exercise 1 and work your way through!**

*Next: Module 1 - Lab Instructions*

