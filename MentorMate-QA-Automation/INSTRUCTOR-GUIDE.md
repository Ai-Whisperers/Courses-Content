# MentorMate QA Automation Course
## Instructor Guide - Detailed Teaching Schedule

> **Note:** This document contains detailed minute-by-minute lesson plans for instructors. Students should refer to [CURRICULUM.md](CURRICULUM.md) for course content overview.

---

## 📅 Course Format

**Duration:** 4 consecutive Sundays + 1 week for final project
**Class Location:** [To be announced]
**Online Platform:** [Zoom/Teams link to be shared]
**Class Time:** 9:00 AM - 2:00 PM (with breaks)
**Total Hours per Sunday:** 4-5 hours

---

# 🔵 SUNDAY 1: QA Fundamentals & Environment Setup

**Date:** [Week 1 Sunday Date]
**Time:** 9:00 AM - 2:00 PM

## 📋 Agenda

### 9:00 AM - 9:15 AM | Welcome & Introductions (15 min)
- Course overview and expectations
- Introductions (name, background, goals)
- Tools and logistics
- Q&A expectations
- Slack channel setup

### 9:15 AM - 10:15 AM | QA Fundamentals (60 min)
**Topics:**
- What is Quality Assurance?
- QA vs QC vs Testing
- Software Development Lifecycle (SDLC)
- Agile & DevOps methodologies
- Types of testing (Unit, Integration, E2E, Regression)
- The Testing Pyramid
- Manual vs Automated Testing
- When to automate and when not to

**Activities:**
- Interactive discussion
- Real-world QA scenarios
- Group exercise: Identify testing types
- Case study: Famous software bugs

**Materials:** Module 1 Slides (1-15)

### 10:15 AM - 10:30 AM | ☕ BREAK (15 min)

### 10:30 AM - 11:30 AM | Test Automation Tools (60 min)
**Topics:**
- Why Playwright for UI automation
- Why Postman for API testing
- GitHub Actions for CI/CD
- VS Code as your IDE
- Node.js and npm
- Git and GitHub
- All tools are 100% FREE!
- Tool comparison and selection

**Activities:**
- Live tool demonstrations
- Tool comparison exercise
- ROI calculation exercise
- Q&A session

**Materials:** Module 1 Slides (16-30)

### 11:30 AM - 12:00 PM | Environment Setup Prep (30 min)
**Topics:**
- Setup overview and requirements
- Common installation issues and solutions
- System requirements check
- Installation order and dependencies

**Activities:**
- Pre-installation checklist
- Verify system requirements
- Download installers if needed

### 12:00 PM - 12:30 PM | 🍽️ LUNCH BREAK (30 min)

### 12:30 PM - 2:00 PM | Hands-On Environment Setup Lab (90 min)

#### Part 1: Core Tools (45 min)
**Install and Configure:**
1. VS Code (15 min)
   - Download and install
   - Initial configuration
   - Verify installation

2. Node.js and npm (15 min)
   - Download LTS version
   - Install Node.js
   - Verify node and npm
   - Restart if needed

3. Git (15 min)
   - Download and install
   - Configure user settings
   - Verify installation

**Instructor Support:** Walking around to help with issues

#### Part 2: GitHub & Automation Tools (45 min)
4. GitHub Account & SSH (20 min)
   - Create GitHub account
   - Generate SSH key
   - Add key to GitHub
   - Test connection

5. Playwright (15 min)
   - Create project directory
   - Initialize npm project
   - Install Playwright
   - Run example tests

6. Postman & VS Code Extensions (10 min)
   - Install Postman
   - Install VS Code extensions
   - Verify complete setup

### 2:00 PM | Class Ends
- Quick recap of what was accomplished
- Preview of homework
- Reminder to ask questions in Slack

## 📝 Homework (Due before Sunday 2)

**Time Required:** 6-8 hours spread over the week

### Required Tasks:
- [ ] Run environment verification script
- [ ] Complete Module 1 Exercises (10 exercises)
- [ ] Take Module 1 Quiz (must score 70%+)
- [ ] Study JavaScript basics (video resources provided)
- [ ] Practice basic Git commands
- [ ] Create your first Git commits
- [ ] Explore practice automation sites

### Study Resources Provided:
- JavaScript crash course videos (2 hours)
- Git cheat sheet and tutorial
- Module 1 exercises document
- Module 1 quiz
- Practice site links

### Support:
- **Slack:** #qa-course-2025 (ask questions anytime)
- **Office Hours:** Wednesday 6-7 PM (optional)

---

# 🔵 SUNDAY 2: JavaScript & Web Automation Basics

**Date:** [Week 2 Sunday Date]
**Time:** 9:00 AM - 2:00 PM

## 📋 Agenda

### 9:00 AM - 9:15 AM | Welcome Back & Homework Review (15 min)
- Check-in: How did homework go?
- Quick quiz on Week 1 concepts
- Address common questions
- Today's agenda overview

### 9:15 AM - 10:00 AM | JavaScript Essentials for QA (45 min)
**Topics:**
- Variables and data types
- Functions and arrow functions
- Arrays and objects
- Conditionals and loops
- Async/await for automation
- JSON data handling

**Activities:**
- Live coding demonstrations
- Code-along exercises
- Practice in VS Code
- Build helper functions together

**Materials:** Module 2 content

### 10:00 AM - 10:45 AM | Web Fundamentals (45 min)
**Topics:**
- HTML structure and elements
- CSS selectors and specificity
- DOM (Document Object Model)
- Browser DevTools for QA
- XPath vs CSS selectors
- Identifying stable selectors

**Activities:**
- Live element inspection
- Practice finding selectors
- DevTools exploration
- Selector strategy exercise

**Materials:** Module 3 content

### 10:45 AM - 11:00 AM | ☕ BREAK (15 min)

### 11:00 AM - 11:30 AM | Playwright Fundamentals (30 min)
**Topics:**
- Playwright test structure (Arrange-Act-Assert)
- Locator strategies in Playwright
- Basic interactions (click, type, select)
- Assertions and expectations
- Running tests (headed/headless)
- Reading test results
- Debugging with Playwright Inspector

**Activities:**
- Write first test together
- Run and interpret results
- Debug a failing test

**Materials:** Module 4 content

### 11:30 AM - 12:00 PM | Code-Along: Build Your First Tests (30 min)
**Build Together:**
1. Login test
2. Form submission test
3. Navigation test

**Application:** Sauce Demo (https://www.saucedemo.com)

### 12:00 PM - 12:30 PM | 🍽️ LUNCH BREAK (30 min)

### 12:30 PM - 2:00 PM | Hands-On Playwright Lab (90 min)

**Individual/Pair Programming:**

Build the following tests:
1. **Authentication Tests** (20 min)
   - Valid login
   - Invalid login
   - Logout

2. **Product Browsing Tests** (20 min)
   - View products
   - Filter products
   - Sort products

3. **Shopping Cart Tests** (25 min)
   - Add items to cart
   - Remove items
   - Update quantities

4. **Checkout Flow Test** (25 min)
   - Complete checkout process
   - End-to-end user journey

**Instructor Support:** Available for questions and debugging

### 2:00 PM | Class Ends
- Celebrate what you built today!
- Homework overview
- Tips for the week ahead

## 📝 Homework (Due before Sunday 3)

**Time Required:** 6-8 hours

### Required Tasks:
- [ ] Build 10 additional Playwright tests
- [ ] Practice advanced locator strategies
- [ ] Complete Modules 2-4 Exercises
- [ ] Pass Modules 2-4 Quizzes (70%+)
- [ ] Study Page Object Model pattern
- [ ] Read API testing introduction
- [ ] Start thinking about test organization

### Study Resources:
- Advanced Playwright documentation
- Page Object Model tutorial
- Selector best practices guide
- API testing primer

---

# 🔵 SUNDAY 3: Advanced Automation & API Testing

**Date:** [Week 3 Sunday Date]
**Time:** 9:00 AM - 2:00 PM

## 📋 Agenda

### 9:00 AM - 9:15 AM | Week 2 Review & Check-In (15 min)
- Share test accomplishments
- Common challenges discussion
- Quick debugging session
- Today's roadmap

### 9:15 AM - 10:15 AM | Advanced Playwright Techniques (60 min)
**Topics:**
- Advanced locator strategies
- Handling dynamic content
- Auto-waiting vs explicit waits
- Working with iframes and shadow DOM
- Multi-tab and multi-window testing
- File uploads and downloads
- Network interception and mocking
- Test hooks and fixtures
- Data-driven testing

**Activities:**
- Solve complex automation challenges
- Handle dynamic elements exercise
- Mock API responses
- Create test fixtures

**Materials:** Module 5 content

### 10:15 AM - 10:30 AM | ☕ BREAK (15 min)

### 10:30 AM - 11:30 AM | Page Object Model (POM) (60 min)
**Topics:**
- What is Page Object Model?
- Benefits and best practices
- Creating page objects
- Base page class pattern
- Component-based testing
- Test data management
- Project structure

**Activities:**
- Design page object structure
- Create BasePage class
- Build LoginPage object
- Refactor existing test to use POM

**Materials:** Module 6 content

### 11:30 AM - 12:00 PM | Refactoring Lab (30 min)
**Task:** Refactor your previous tests to use POM
- Instructor demonstrates first
- Students refactor their tests
- Pair programming encouraged

### 12:00 PM - 12:30 PM | 🍽️ LUNCH BREAK (30 min)

### 12:30 PM - 1:15 PM | API Testing Fundamentals (45 min)
**Topics:**
- Introduction to REST APIs
- HTTP methods (GET, POST, PUT, DELETE)
- Request/response structure
- Status codes
- Headers and authentication
- Postman collections and environments
- Writing API tests
- Automating API tests with Playwright

**Activities:**
- Create Postman collection
- Test JSONPlaceholder API
- Write automated API tests
- Validate response schemas

**Materials:** Modules 7-8 content

### 1:15 PM - 2:00 PM | Hands-On API Testing Lab (45 min)

**Build API Test Suite:**
1. **GET requests** - Retrieve data
2. **POST requests** - Create resources
3. **PUT requests** - Update resources
4. **DELETE requests** - Delete resources
5. **Authentication** - Token-based auth
6. **Error handling** - Validate error responses
7. **Combine UI + API** - Integrated test

**APIs to Use:**
- JSONPlaceholder (practice)
- ReqRes (authentication)
- Your e-commerce app API (if available)

### 2:00 PM | Class Ends
- Show off your API tests!
- Final project preview
- Homework and preparation for Sunday 4

## 📝 Homework (Due before Sunday 4)

**Time Required:** 6-8 hours

### Required Tasks:
- [ ] Complete POM refactoring for all UI tests
- [ ] Build comprehensive API test suite (10+ tests)
- [ ] Complete Modules 5-8 Exercises
- [ ] Pass Modules 5-8 Quizzes (70%+)
- [ ] Learn Git branching and pull requests
- [ ] Study CI/CD concepts (GitHub Actions)
- [ ] **Choose your final project application**
- [ ] Create final project plan

### Study Resources:
- POM best practices guide
- API testing patterns
- Git branching tutorial
- GitHub Actions introduction
- Final project requirements

---

# 🔵 SUNDAY 4: CI/CD, Best Practices & Final Project

**Date:** [Week 4 Sunday Date]
**Time:** 9:00 AM - 3:00 PM (Extra hour for project workshop)

## 📋 Agenda

### 9:00 AM - 9:15 AM | Final Sunday Check-In (15 min)
- Week 3 accomplishments
- POM and API tests review
- Final project preparations
- Today's extended agenda

### 9:15 AM - 10:00 AM | Git & GitHub Mastery (45 min)
**Topics:**
- Git branching strategies
- Creating and managing branches
- Pull requests and code reviews
- Resolving merge conflicts
- Git best practices for QA
- Collaborative workflows
- .gitignore and repository hygiene

**Activities:**
- Create feature branches
- Practice pull requests
- Simulate code review
- Resolve conflicts exercise

**Materials:** Module 9 content

### 10:00 AM - 10:15 AM | ☕ BREAK (15 min)

### 10:15 AM - 11:30 AM | CI/CD with GitHub Actions (75 min)
**Topics:**
- Introduction to CI/CD
- Why continuous testing matters
- GitHub Actions fundamentals
- Writing workflow files (.yml)
- Triggering workflows (push, PR, schedule)
- Running Playwright tests in CI
- Parallel test execution
- Test artifacts and reports
- Notifications and deployment gates

**Activities:**
- Create .github/workflows directory
- Write Playwright workflow
- Commit and push to trigger workflow
- View results in GitHub Actions
- Generate and view test reports
- Set up scheduled runs

**Materials:** Module 10 content

### 11:30 AM - 12:00 PM | Advanced Testing Strategies (30 min)
**Topics:**
- Visual regression testing
- Accessibility testing (a11y)
- Cross-browser testing
- Performance testing basics
- Test flakiness and stability
- Test optimization techniques
- Best practices summary
- AI-assisted testing with ChatGPT

**Activities:**
- Run visual regression test
- Run accessibility test
- Optimize slow tests
- Use ChatGPT for test generation

**Materials:** Modules 11-12 content

### 12:00 PM - 12:30 PM | 🍽️ LUNCH BREAK (30 min)

### 12:30 PM - 1:00 PM | Final Project Overview (30 min)
**Review:**
- Final project requirements
- Grading rubric (detailed explanation)
- Application options (choose one):
  1. E-commerce platform (Sauce Demo)
  2. Social media app (DemoQA)
  3. MentorMate internal tool (with approval)
- Timeline and deliverables
- Submission process
- Presentation guidelines

**Discussion:**
- Q&A about requirements
- Clarify expectations
- Time management tips

### 1:00 PM - 2:30 PM | Final Project Workshop (90 min)

**Guided Project Setup:**

#### Hour 1: Planning & Architecture (30 min)
- Choose your application
- Plan test scenarios (15+ UI, 10+ API)
- Design project structure
- Create test plan document
- Set up GitHub repository
- Initialize project with best practices

#### Hour 2: Begin Implementation (60 min)
**Build Together:**
1. Set up project structure
2. Create BasePage class
3. Build first page object
4. Write first test with POM
5. Create API test base class
6. Write first API test
7. Set up GitHub Actions workflow
8. Commit and verify CI/CD works

**Instructor Support:**
- One-on-one consultations
- Architecture review
- Code review
- Answer questions

### 2:30 PM - 3:00 PM | Wrap-Up & Next Steps (30 min)
- Celebrate the 4-week journey!
- Review what you've learned
- Final project timeline
- Support during project week
- Presentation expectations
- Certification process
- Stay connected (alumni network)
- Q&A

## 📝 Final Project (Due in 1 week)

**Submission Deadline:** [1 week from Sunday 4]
**Presentation Date:** [2 weeks from Sunday 4]

### Required Deliverables:
- [ ] Complete test automation framework
- [ ] 15+ UI tests with Page Object Model
- [ ] 10+ API tests
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Comprehensive README documentation
- [ ] Test plan document
- [ ] All tests passing in CI
- [ ] 10-15 minute presentation video (or live)

### Grading Criteria (100 points):
- **Test Coverage** (25 pts): 15+ UI tests, 10+ API tests
- **Code Quality** (20 pts): Clean, readable, well-structured
- **CI/CD Implementation** (15 pts): Working pipeline, artifacts
- **Documentation** (15 pts): README, test plan, comments
- **Best Practices** (15 pts): POM, naming, assertions
- **Presentation** (10 pts): Clear demo and explanation

**Minimum Passing:** 70 points

### Support During Project Week:
- **Slack:** Available 24/7 for questions
- **Office Hours:** Tuesday & Thursday 6-7 PM
- **Mentor 1-on-1:** Schedule as needed
- **Peer Support:** Study group channel

---

# 📊 Course Completion Timeline

```
Week 1: Sunday 1 → Homework → Ready for Sunday 2
Week 2: Sunday 2 → Homework → Ready for Sunday 3
Week 3: Sunday 3 → Homework → Ready for Sunday 4
Week 4: Sunday 4 → Final Project Week → Submission
Week 5: Presentations → Feedback → Certification
```

---

## 🎓 Certification & Recognition

### Upon Successful Completion:
- **MentorMate Certified QA Automation Engineer** certificate
- LinkedIn skill badge
- Portfolio project for resume
- Internal MentorMate recognition
- Access to alumni network
- Reference from course instructors
- Job placement support (if needed)

---

## 📞 Contact Information

### Course Instructors:
- **Lead Instructor:** [Name]
  - Email: [email]
  - Slack: @instructor
  - Office Hours: Wednesday 6-7 PM

- **Teaching Assistant:** [Name]
  - Email: [email]
  - Slack: @ta
  - Office Hours: Thursday 6-7 PM

### Technical Support:
- **Slack Channel:** #qa-course-2025
- **IT Support:** [contact for technical issues]

### Course Coordinator:
- **Name:** [Name]
- **Email:** [email]
- **For:** Scheduling, absences, certificates

---

## 💡 Tips for Success

### Before Each Sunday:
- [ ] Complete all homework from previous week
- [ ] Pass required quizzes (70%+)
- [ ] Review slides for the day
- [ ] Prepare questions
- [ ] Get good sleep!

### During Each Sunday:
- [ ] Arrive on time (9:00 AM sharp)
- [ ] Bring laptop fully charged
- [ ] Have backup power/charger
- [ ] Take notes
- [ ] Participate actively
- [ ] Ask questions
- [ ] Help classmates
- [ ] Take breaks seriously

### Between Sundays:
- [ ] Study 1-2 hours daily (not all at once)
- [ ] Complete homework in chunks
- [ ] Ask questions early in Slack
- [ ] Attend office hours if stuck
- [ ] Form study groups
- [ ] Practice, practice, practice!

---

## 🚨 What If I Miss a Sunday?

### If You Must Miss:
1. **Notify immediately:** Contact course coordinator
2. **Get materials:** All slides and recordings provided
3. **Catch up:** Must complete homework before next Sunday
4. **Get help:** Schedule 1-on-1 with instructor
5. **Max absences:** Can miss 1 Sunday and still complete

### Can't Attend a Sunday?
- Recording will be available within 24 hours
- Slides and materials provided immediately
- Must still complete homework
- Strongly encouraged to attend office hours
- May need extra time for final project

---

## 📚 Materials & Resources

### Provided by Course:
- Complete course repository
- All slides and materials
- Code examples and templates
- Video resources
- Practice exercises
- Quizzes and assessments
- Final project specifications

### You Need to Have:
- Laptop (Windows/Mac/Linux)
- Admin rights for installations
- Stable internet connection
- Webcam for sessions (optional but encouraged)
- Microphone for participation

### Optional but Helpful:
- Second monitor
- External keyboard/mouse
- Headphones
- Quiet study space

---

## 🎯 Learning Outcomes

**By the end of 4 weeks, you will be able to:**

✅ Explain QA principles and best practices
✅ Write automated UI tests with Playwright
✅ Implement Page Object Model pattern
✅ Create and automate API tests
✅ Use Git and GitHub effectively
✅ Build CI/CD pipelines with GitHub Actions
✅ Apply testing best practices
✅ Build a complete test automation framework
✅ Present your work professionally
✅ Think and work like a QA Automation Engineer

**Career Impact:**
- Add "QA Automation Engineer" to resume
- Portfolio project to showcase
- MentorMate certification
- Industry-standard skills
- Ready for QA automation roles

---

## 🎉 Ready to Start Your Journey!

**Commitment:** 4 Sundays (9 AM - 2/3 PM each)
**Homework:** 6-8 hours per week
**Final Project:** 10-15 hours
**Total Investment:** 45-60 hours
**Return:** Career-changing skills + certification

**See you on Sunday 1 at 9:00 AM!** 🚀

---

*4-Week Schedule Version 1.0*
*MentorMate QA Automation Course*
*Last Updated: [Date]*

