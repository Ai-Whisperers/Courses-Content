# MentorMate QA Automation Course
## Final Capstone Project

---

## 🎯 Project Overview

**Duration:** 12-16 hours (spread over 1-2 weeks)

**Objective:** Build a comprehensive, production-ready test automation framework that demonstrates all skills learned throughout the course.

**Weight:** 40% of total course grade

---

## 📋 Project Requirements

### Core Requirements (Must Have)

Your final project must include:

1. ✅ **Complete Test Automation Framework**
   - Well-structured project architecture
   - Page Object Model implementation
   - Reusable utility functions
   - Configuration management

2. ✅ **UI Test Suite (Playwright)**
   - Minimum 15 automated UI tests
   - Cover critical user journeys
   - Multiple test scenarios per feature
   - Cross-browser testing

3. ✅ **API Test Suite**
   - Minimum 10 API tests
   - Cover CRUD operations
   - Request/response validation
   - Authentication testing

4. ✅ **CI/CD Pipeline (GitHub Actions)**
   - Automated test execution on push/PR
   - Test reports generation
   - Artifacts storage
   - Scheduled runs

5. ✅ **Documentation**
   - Comprehensive README
   - Test plan document
   - Setup instructions
   - Architecture diagram

6. ✅ **Code Quality**
   - Clean, readable code
   - Meaningful naming conventions
   - Comments where needed
   - Follows best practices

---

## 🎨 Application Under Test (Choose One)

### Option 1: E-Commerce Platform
**Demo Site:** https://www.saucedemo.com/
**Alternative:** https://demo.opencart.com/

**Features to Test:**
- User authentication (login/logout)
- Product browsing and filtering
- Shopping cart operations
- Checkout process
- Order confirmation
- User profile management

**API Endpoints (if available):**
- Product catalog API
- Cart management API
- User authentication API
- Order processing API

---

### Option 2: Social Media Application
**Demo Site:** https://demoqa.com/
**Alternative:** https://the-internet.herokuapp.com/

**Features to Test:**
- User registration and login
- Profile creation and editing
- Post creation and deletion
- Image uploads
- Form submissions
- Dynamic elements handling
- Alerts and popups

**API Endpoints:**
- Use JSONPlaceholder (https://jsonplaceholder.typicode.com/)
- Posts, Comments, Users APIs

---

### Option 3: MentorMate Internal Tool (If Permitted)
**Application:** [Contact mentor for access]

**Benefits:**
- Real-world application
- Relevant to company work
- Potential for actual use

**Requirements:**
- Must have mentor approval
- Must not test production environment
- Must use test data only

---

## 📁 Required Project Structure

```
mentormate-qa-final-project/
│
├── .github/
│   └── workflows/
│       ├── playwright.yml          # UI tests CI/CD
│       └── api-tests.yml           # API tests CI/CD
│
├── tests/
│   ├── ui/
│   │   ├── auth/
│   │   │   ├── login.spec.js
│   │   │   └── logout.spec.js
│   │   ├── products/
│   │   │   ├── browse.spec.js
│   │   │   └── search.spec.js
│   │   └── checkout/
│   │       └── checkout.spec.js
│   │
│   └── api/
│       ├── auth/
│       │   └── auth-api.spec.js
│       ├── products/
│       │   └── products-api.spec.js
│       └── orders/
│           └── orders-api.spec.js
│
├── pages/
│   ├── base.page.js                # Base page class
│   ├── login.page.js
│   ├── products.page.js
│   ├── cart.page.js
│   └── checkout.page.js
│
├── api/
│   ├── base-api.js                 # API base class
│   ├── auth-api.js
│   ├── products-api.js
│   └── orders-api.js
│
├── utils/
│   ├── test-data-generator.js     # Test data utilities
│   ├── helpers.js                  # Helper functions
│   └── constants.js                # Constants and configs
│
├── test-data/
│   ├── users.json                  # Test user data
│   ├── products.json               # Product test data
│   └── test-scenarios.json         # Scenario data
│
├── docs/
│   ├── test-plan.md               # Test planning document
│   ├── architecture.md            # Framework architecture
│   ├── test-cases.md              # Manual test cases
│   └── api-documentation.md       # API test documentation
│
├── reports/
│   └── .gitkeep                   # Reports generated here
│
├── .gitignore
├── package.json
├── playwright.config.js
├── README.md
└── PRESENTATION.md                # Final presentation
```

---

## 📝 Detailed Requirements

### 1. UI Test Suite Requirements

#### Test Coverage
Must include tests for:
- ✅ **Authentication**
  - Login with valid credentials
  - Login with invalid credentials
  - Logout functionality
  - Session persistence
  - Error message validation

- ✅ **Core Functionality**
  - Main user workflows (end-to-end)
  - Feature-specific scenarios
  - Positive and negative test cases
  - Edge cases and boundary conditions

- ✅ **Cross-Browser Testing**
  - Chromium
  - Firefox
  - WebKit (Safari)

#### Technical Requirements
- ✅ Use Page Object Model pattern
- ✅ Implement proper waits (no hard-coded sleeps)
- ✅ Use meaningful assertions
- ✅ Independent test cases (no dependencies)
- ✅ Proper test data management
- ✅ Screenshots on failure
- ✅ Video recording for failed tests

#### Example Test:
```javascript
// tests/ui/auth/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/login.page');
const { ProductsPage } = require('../../../pages/products.page');
const testData = require('../../../test-data/users.json');

test.describe('User Authentication', () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async () => {
    // Arrange
    const user = testData.validUsers[0];

    // Act
    await loginPage.login(user.username, user.password);

    // Assert
    await expect(productsPage.getTitle()).toBeVisible();
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Act
    await loginPage.login('invalid@user.com', 'wrongpass');

    // Assert
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });
});
```

---

### 2. API Test Suite Requirements

#### Test Coverage
Must include:
- ✅ **CRUD Operations**
  - Create (POST)
  - Read (GET)
  - Update (PUT/PATCH)
  - Delete (DELETE)

- ✅ **Validation Tests**
  - Status code validation
  - Response schema validation
  - Response time validation
  - Header validation
  - Error handling

- ✅ **Authentication Tests**
  - Token-based auth
  - Request with/without auth
  - Invalid token handling

#### Example API Test:
```javascript
// tests/api/products/products-api.spec.js
const { test, expect } = require('@playwright/test');
const { ProductsAPI } = require('../../../api/products-api');

test.describe('Products API', () => {
  let productsApi;

  test.beforeAll(async ({ request }) => {
    productsApi = new ProductsAPI(request);
  });

  test('GET /products - should return all products', async () => {
    // Act
    const response = await productsApi.getAllProducts();

    // Assert
    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
    
    // Validate schema
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toHaveProperty('price');
  });

  test('POST /products - should create new product', async () => {
    // Arrange
    const newProduct = {
      name: 'Test Product',
      price: 29.99,
      description: 'Test Description'
    };

    // Act
    const response = await productsApi.createProduct(newProduct);

    // Assert
    expect(response.status()).toBe(201);
    const product = await response.json();
    expect(product.name).toBe(newProduct.name);
    expect(product.price).toBe(newProduct.price);
  });

  test('GET /products/{id} - should return 404 for non-existent product', async () => {
    // Act
    const response = await productsApi.getProduct(99999);

    // Assert
    expect(response.status()).toBe(404);
  });
});
```

---

### 3. Page Object Model Requirements

#### Base Page Implementation
```javascript
// pages/base.page.js
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector);
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}

module.exports = { BasePage };
```

#### Specific Page Implementation
```javascript
// pages/login.page.js
const { BasePage } = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await super.navigate('https://www.saucedemo.com');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
```

---

### 4. CI/CD Pipeline Requirements

#### GitHub Actions Workflow
```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:      # Manual trigger

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 20
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps ${{ matrix.browser }}
    
    - name: Run Playwright tests
      run: npx playwright test --project=${{ matrix.browser }}
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report-${{ matrix.browser }}
        path: playwright-report/
        retention-days: 30
    
    - name: Upload test failures
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: test-results-${{ matrix.browser }}
        path: test-results/
        retention-days: 7

  api-tests:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 20
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run API tests
      run: npx playwright test tests/api
    
    - name: Upload API test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: api-test-results
        path: playwright-report/
```

---

### 5. Documentation Requirements

#### README.md Structure
Must include:
- Project overview
- Technologies used
- Setup instructions
- Running tests
- Project structure
- Test reports
- CI/CD information
- Contributing guidelines
- Contact information

#### Test Plan Document
Must include:
- Test objectives
- Scope (in scope / out of scope)
- Test approach
- Test environment
- Test schedule
- Entry/exit criteria
- Risk analysis
- Test deliverables

#### Architecture Document
Must include:
- Framework architecture diagram
- Design patterns used
- Technology stack
- Key components
- Data flow
- Decision rationale

---

## 📊 Grading Rubric

### Total: 100 points

| Category | Points | Criteria |
|----------|--------|----------|
| **UI Tests** | 25 | Quality, coverage, Page Object Model |
| **API Tests** | 15 | Coverage, assertions, error handling |
| **Code Quality** | 20 | Clean code, naming, structure, comments |
| **CI/CD** | 15 | Working pipeline, artifacts, scheduling |
| **Documentation** | 15 | README, test plan, architecture docs |
| **Presentation** | 10 | Demo video/live demo, explanation |

### Detailed Scoring

#### UI Tests (25 points)
- 10 pts: 15+ well-structured tests
- 5 pts: Page Object Model implementation
- 5 pts: Proper assertions and waits
- 3 pts: Cross-browser testing
- 2 pts: Test independence

#### API Tests (15 points)
- 8 pts: 10+ comprehensive API tests
- 4 pts: Request/response validation
- 3 pts: Error handling and edge cases

#### Code Quality (20 points)
- 8 pts: Clean, readable code
- 6 pts: Proper project structure
- 4 pts: Meaningful naming conventions
- 2 pts: Appropriate comments

#### CI/CD Pipeline (15 points)
- 8 pts: Working GitHub Actions workflow
- 4 pts: Test reports and artifacts
- 3 pts: Scheduled runs configured

#### Documentation (15 points)
- 6 pts: Comprehensive README
- 5 pts: Test plan document
- 4 pts: Architecture documentation

#### Presentation (10 points)
- 5 pts: Clear demonstration
- 3 pts: Explanation of technical decisions
- 2 pts: Q&A responses

---

## 🎥 Final Presentation Requirements

### Format Options:
1. **Live Demo** (15 minutes)
2. **Recorded Video** (10-15 minutes)

### Presentation Must Include:

1. **Introduction** (2 min)
   - Your name
   - Application under test
   - Project goals

2. **Framework Architecture** (3 min)
   - Project structure
   - Design patterns used
   - Key technical decisions

3. **Test Demonstration** (5 min)
   - Run UI tests (live or recorded)
   - Run API tests
   - Show test reports
   - Show CI/CD pipeline

4. **Code Walkthrough** (3 min)
   - Show Page Object Model
   - Explain a complex test
   - Highlight reusable utilities

5. **Challenges & Solutions** (2 min)
   - What challenges did you face?
   - How did you solve them?
   - What would you do differently?

6. **Q&A** (Optional, live only)

### Presentation Tips:
- Practice beforehand
- Keep it concise
- Focus on interesting technical aspects
- Show, don't just tell
- Be prepared to explain decisions

---

## 📅 Project Timeline

### Week 1: Planning & Setup (20% of time)
- [ ] Choose application to test
- [ ] Set up project structure
- [ ] Create test plan document
- [ ] Set up GitHub repository
- [ ] Configure Playwright
- [ ] Create base page objects

### Week 2: Implementation (60% of time)
- [ ] Implement UI tests
- [ ] Create page objects
- [ ] Implement API tests
- [ ] Write utility functions
- [ ] Set up CI/CD pipeline
- [ ] Handle test data
- [ ] Fix failing tests

### Week 3: Documentation & Presentation (20% of time)
- [ ] Write comprehensive README
- [ ] Create architecture document
- [ ] Record/prepare presentation
- [ ] Final testing and bug fixes
- [ ] Code review and refactoring
- [ ] Submit project

---

## ✅ Submission Checklist

Before submitting, ensure:

### Code
- [ ] All tests pass locally
- [ ] All tests pass in CI/CD
- [ ] Code follows best practices
- [ ] No hardcoded credentials
- [ ] No console.log() left in code
- [ ] .gitignore is complete
- [ ] No unnecessary files committed

### Documentation
- [ ] README is comprehensive
- [ ] Test plan is complete
- [ ] Architecture is documented
- [ ] Setup instructions are clear
- [ ] All links work

### Tests
- [ ] Minimum 15 UI tests
- [ ] Minimum 10 API tests
- [ ] Tests are independent
- [ ] Tests have meaningful names
- [ ] Tests use proper assertions
- [ ] Page Object Model implemented

### CI/CD
- [ ] GitHub Actions workflow runs
- [ ] Tests run on push/PR
- [ ] Test reports are generated
- [ ] Artifacts are stored
- [ ] Scheduled runs configured

### Presentation
- [ ] Video recorded or demo prepared
- [ ] Covers all required topics
- [ ] 10-15 minutes long
- [ ] Clear audio/video quality

---

## 📤 Submission Instructions

### 1. GitHub Repository
```
Repository name: mentormate-qa-final-project-[yourname]
Visibility: Public (or private with mentor access)
```

### 2. Required Files
- Complete source code
- All documentation
- Presentation video (if recorded)
- Presentation slides (if used)

### 3. Submission Form
Fill out: [Google Form Link]
- Your name
- GitHub repository URL
- YouTube/Drive link to presentation (if recorded)
- Brief project description
- Time spent on project
- Challenges faced
- Any special notes for reviewer

### 4. Deadline
**Submit by:** [Date]
**Late submissions:** Accepted with 5% penalty per day

---

## 🏆 Excellence Criteria (Bonus Points)

Go above and beyond? Earn bonus points:

### +5 points: Advanced Features
- Visual regression testing
- Accessibility testing
- Performance testing
- Mobile/responsive testing
- Database verification

### +5 points: Code Excellence
- TypeScript instead of JavaScript
- Custom Playwright fixtures
- Advanced error handling
- Sophisticated test data management
- Reusable test libraries

### +5 points: Outstanding Documentation
- Video tutorials for setup
- Contributing guidelines
- Code of conduct
- Change log
- API documentation with examples

### +5 points: Innovation
- AI-assisted test generation
- Custom test reporting
- Integration with external tools
- Unique testing approach
- Novel problem solving

**Maximum Bonus:** +10 points (total: 110/100)

---

## 💡 Tips for Success

1. **Start Early**
   - Don't wait until the last week
   - Build incrementally
   - Test as you go

2. **Keep It Simple**
   - Don't over-engineer
   - Focus on quality over quantity
   - Make it work, then make it better

3. **Test Your Tests**
   - Run tests multiple times
   - Ensure consistency
   - Fix flaky tests

4. **Ask for Help**
   - Use mentor office hours
   - Ask questions early
   - Collaborate with peers

5. **Document As You Go**
   - Don't leave documentation for last
   - Keep notes of decisions
   - Update README regularly

6. **Use What You Learned**
   - Apply concepts from all modules
   - Demonstrate your skills
   - Show your growth

7. **Make It Portfolio-Worthy**
   - This goes on your resume
   - Make it professional
   - Show your best work

---

## 🆘 Getting Help

### Resources:
- **Mentor Office Hours:** [Schedule]
- **Slack Channel:** #qa-course-final-project
- **Documentation:** All course modules
- **Peer Support:** Study groups

### Common Issues:
- **Tests are flaky:** Review waits and synchronization
- **CI/CD not working:** Check workflow syntax
- **Page objects complex:** Start simple, refactor later
- **Stuck on API tests:** Review Module 7 & 8

---

## 📚 Reference Projects

### Example Projects (For Inspiration Only):
- [Playwright Best Practices Repo](https://github.com/playwright-community/playwright-best-practices)
- Previous student projects (ask mentor)
- Open source test frameworks

**Note:** Use for inspiration, but don't copy code!

---

## 🎓 After Submission

1. **Peer Review** (Optional)
   - Review a classmate's project
   - Provide constructive feedback
   - Learn from others

2. **Mentor Review**
   - Mentor will review within 5 business days
   - Detailed feedback provided
   - May request revisions

3. **Presentation**
   - Present to class (if live)
   - Receive feedback

4. **Certificate**
   - Upon passing (70%+)
   - MentorMate QA Automation Engineer certification
   - LinkedIn badge

5. **Portfolio**
   - Add to your portfolio
   - Share on LinkedIn
   - Include in resume

---

## ❓ FAQ

**Q: Can I work with a partner?**
A: No, this is an individual project. Collaboration on ideas is okay, but code must be your own.

**Q: Can I use a different application?**
A: Yes, with mentor approval. Must have similar complexity.

**Q: What if I can't complete everything?**
A: Submit what you have. Partial credit is awarded. Explain what's missing in your presentation.

**Q: Can I use TypeScript?**
A: Yes! Bonus points for TypeScript.

**Q: How much code is enough?**
A: Quality > quantity. Meet minimum requirements, but focus on doing it well.

**Q: Can I submit early?**
A: Absolutely! Submit when ready.

**Q: What if I fail?**
A: You can revise and resubmit once within 2 weeks.

---

## 🌟 Success Stories

### Previous Student Projects:

**Testimonial 1:**
> "The final project tied everything together. It's now the centerpiece of my portfolio and helped me land my first QA automation role!" - *Previous Student*

**Testimonial 2:**
> "Building this project gave me real confidence. I went from zero coding to a full automation framework in 12 weeks!" - *Previous Student*

**Testimonial 3:**
> "The skills from this project directly transferred to my work at MentorMate. I'm now maintaining our actual test automation!" - *Previous Student*

---

## 🎯 Final Words

This is your chance to showcase everything you've learned. Take pride in your work, demonstrate your skills, and build something you're proud to share.

**Remember:**
- This is a learning experience
- Perfection isn't required
- Effort and understanding matter most
- This represents your growth from Module 1 to Module 12

**You've got this!** 🚀

---

**Questions?** Contact your mentor or post in #qa-course-final-project

**Good luck and happy automating!** 🎉

---

*Final Project Specification v1.0*
*MentorMate QA Automation Course*
*Last Updated: [Date]*

