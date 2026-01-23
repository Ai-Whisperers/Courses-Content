# Week 1 Quiz: QA Fundamentals & Environment Setup

**Course:** MentorMate QA Automation
**Duration:** 30 minutes
**Points:** 20 questions × 1 point = 20 points (3.75% of total grade)
**Passing Score:** 14/20 (70%)
**Attempts:** 2 (best score counts)
**Format:** Open book/notes
**Due:** 48 hours after Sunday Session 1

---

## Instructions

1. Answer all 20 questions
2. Multiple choice questions have only ONE correct answer
3. Short answer questions require 1-3 sentences
4. You may use course materials and official documentation
5. DO NOT collaborate with other students
6. DO NOT use AI tools for answers
7. Submit via [Google Form link]

---

## Section 1: QA Fundamentals (8 questions)

### Question 1 (1 point)
What is the primary goal of Quality Assurance (QA)?

A) To find as many bugs as possible
B) To prevent defects and ensure quality throughout development
C) To test the application after development is complete
D) To automate all testing processes

**Correct Answer:** B

---

### Question 2 (1 point)
Which testing type focuses on testing individual components in isolation?

A) Integration testing
B) System testing
C) Unit testing
D) Acceptance testing

**Correct Answer:** C

---

### Question 3 (1 point)
According to the Testing Pyramid, which type of tests should you have the MOST of?

A) End-to-End (E2E) tests
B) Integration tests
C) Unit tests
D) Manual tests

**Correct Answer:** C

---

### Question 4 (1 point)
What is the main advantage of automated testing over manual testing?

A) Automated tests find more bugs
B) Automated tests can be run repeatedly without human intervention
C) Automated tests are easier to create
D) Automated tests don't require maintenance

**Correct Answer:** B

---

### Question 5 (1 point)
In Agile development, when should testing occur?

A) Only at the end of each sprint
B) After all development is complete
C) Continuously throughout the development process
D) Only before release

**Correct Answer:** C

---

### Question 6 (1 point)
Which of the following is NOT a good candidate for test automation?

A) Repetitive test cases
B) Tests that need to run on multiple browsers
C) Exploratory testing requiring human judgment
D) Regression tests

**Correct Answer:** C

---

### Question 7 (1 point)
What does ROI stand for in the context of test automation?

A) Rate of Implementation
B) Return on Investment
C) Requirement of Integration
D) Regression of Issues

**Correct Answer:** B

---

### Question 8 (Short Answer - 2-3 sentences)
Explain the difference between verification and validation in software testing.

**Sample Answer:**
Verification checks if the product is being built correctly according to specifications ("Are we building the product right?"). Validation checks if the right product is being built to meet user needs ("Are we building the right product?"). Verification focuses on processes and documents, while validation focuses on the actual product.

---

## Section 2: Testing Tools & Concepts (6 questions)

### Question 9 (1 point)
Why is Playwright a good choice for UI test automation?

A) It only works with Chrome
B) It supports multiple browsers and has built-in waiting mechanisms
C) It's the oldest automation tool
D) It doesn't require programming knowledge

**Correct Answer:** B

---

### Question 10 (1 point)
What type of testing does Postman specialize in?

A) UI testing
B) API testing
C) Database testing
D) Performance testing

**Correct Answer:** B

---

### Question 11 (1 point)
What is the purpose of CI/CD in testing?

A) To manually test applications
B) To automate the build, test, and deployment process
C) To replace all QA engineers
D) To only run tests once

**Correct Answer:** B

---

### Question 12 (1 point)
Which IDE (Integrated Development Environment) is recommended for this course?

A) Notepad
B) Microsoft Word
C) Visual Studio Code
D) Excel

**Correct Answer:** C

---

### Question 13 (1 point)
What is Node.js?

A) A programming language
B) A database system
C) A JavaScript runtime environment
D) A testing framework

**Correct Answer:** C

---

### Question 14 (1 point)
Why do we use Git in test automation projects?

A) To write tests
B) To run tests
C) To version control code and collaborate
D) To report bugs

**Correct Answer:** C

---

## Section 3: Environment Setup & Git (6 questions)

### Question 15 (1 point)
What command installs all dependencies listed in package.json?

A) `npm start`
B) `npm install`
C) `npm run`
D) `npm create`

**Correct Answer:** B

---

### Question 16 (1 point)
Which command runs Playwright tests?

A) `npx playwright test`
B) `npm start playwright`
C) `playwright go`
D) `node playwright`

**Correct Answer:** A

---

### Question 17 (1 point)
What Git command saves your changes to the local repository?

A) `git push`
B) `git save`
C) `git commit`
D) `git add`

**Correct Answer:** C

---

### Question 18 (1 point)
Before committing changes in Git, you must first:

A) Push to remote
B) Stage the changes with `git add`
C) Create a new branch
D) Run the tests

**Correct Answer:** B

---

### Question 19 (1 point)
What does `.gitignore` file do?

A) Ignores all files in the repository
B) Specifies files Git should track
C) Specifies files Git should NOT track
D) Deletes files from the repository

**Correct Answer:** C

---

### Question 20 (Short Answer - 2-3 sentences)
You've just written a new test file `login.spec.js` and want to push it to GitHub. List the Git commands you would use in order.

**Sample Answer:**
```bash
git add login.spec.js
git commit -m "Add login test"
git push
```
Or:
```bash
git add .
git commit -m "Add login test"
git push origin main
```

---

## Scoring

- **18-20 points (90-100%):** Excellent understanding
- **16-17 points (80-89%):** Good understanding
- **14-15 points (70-79%):** Satisfactory understanding (Pass)
- **Below 14 (Below 70%):** Needs improvement (Retake recommended)

---

## After the Quiz

### If You Passed (70%+):
✅ Great job! Move on to Week 2 materials
✅ Review any questions you missed
✅ Prepare for Week 2 concepts

### If You Need to Retake:
1. Review Week 1 slides and materials
2. Re-watch recordings if available
3. Study the concepts you missed
4. Wait 24 hours
5. Take the retake (different questions)
6. Higher score will count

---

## Study Resources

**For Section 1 (QA Fundamentals):**
- Week 1 Slides: "QA Fundamentals"
- Reading: [ISTQB Foundation Level Syllabus](https://www.istqb.org/)
- Article: "Testing Pyramid Explained"

**For Section 2 (Tools):**
- [Playwright Official Documentation](https://playwright.dev/docs/intro)
- [Postman Learning Center](https://learning.postman.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

**For Section 3 (Git & Setup):**
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [NPM Documentation](https://docs.npmjs.com/)
- Week 1 Lab: "Environment Setup Guide"

---

## Common Mistakes to Avoid

1. **Confusing verification and validation**
   - Remember: Verification = "Are we building it right?"
   - Validation = "Are we building the right thing?"

2. **Thinking all tests should be automated**
   - Exploratory and usability testing still need humans!

3. **Forgetting `git add` before `git commit`**
   - Changes must be staged first

4. **Confusing Node.js with JavaScript**
   - JavaScript is the language
   - Node.js is the runtime environment

5. **Thinking more E2E tests is better**
   - Testing Pyramid: Unit tests (most) → Integration → E2E (least)

---

## Feedback

Help us improve this quiz:
- Were questions clear?
- Was difficulty appropriate?
- Did it cover Week 1 material well?
- Time adequate?

[Feedback form link]

---

**Good luck! Remember: The goal is learning, not just passing. Use this quiz to identify knowledge gaps and strengthen your understanding.**

---

*Quiz Version 1.0 - Created November 24, 2025*
*Retake version will have similar questions with different examples*
