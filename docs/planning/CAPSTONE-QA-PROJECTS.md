# QA Track Capstone Projects
## FPUNA Summer 2026 - Test Automation Capstone Options

**Duration**: 20 hours across Weeks 9-10  
**Track**: QA Automation Specialization  
**Prerequisites**: QA Track Modules 1-5 completed

---

## Project Overview

QA track students will build a comprehensive test automation framework for a real-world application. Your project must demonstrate mastery of Playwright, API testing, test generation with OpenCode, CI/CD integration, and professional QA practices.

---

## Option 1: E-Commerce Platform Test Automation ⭐ **Recommended**

### Description
Build complete test automation for a functioning e-commerce website (you can use demo sites like DemoQA Store or build a simple one).

### Required Features

#### UI Automation (60+ tests)
- **User Authentication**
  - Login/logout flows
  - Registration with validation
  - Password reset
  - Session management

- **Product Catalog**
  - Product search and filtering
  - Product details page
  - Category navigation
  - Sorting functionality

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Calculate totals
  - Persist across sessions

- **Checkout Process**
  - Shipping information
  - Payment methods
  - Order confirmation
  - Email notifications (mock)

#### API Testing (40+ tests)
- **Products API**
  - CRUD operations
  - Search and filtering
  - Inventory management
  - Price updates

- **Orders API**
  - Create orders
  - Update order status
  - Cancel orders
  - Order history

- **User API**
  - User management
  - Address management
  - Preferences

#### Performance Testing
- **Load Tests**
  - 100+ concurrent users
  - Response time < 2 seconds
  - Error rate < 1%

### Technical Requirements

**Framework Components**:
```
tests/
├── e2e/                    # End-to-end tests
│   ├── auth/
│   ├── products/
│   ├── cart/
│   └── checkout/
├── api/                    # API tests
│   ├── products/
│   ├── orders/
│   └── users/
├── performance/            # Load tests
├── fixtures/               # Test data and fixtures
├── pages/                  # Page Object Models
├── utils/                  # Test utilities
└── config/                 # Test configuration
```

**Must Include**:
- Custom Playwright fixtures
- Page Object Model architecture
- Data factories with Faker
- API mocking for external services
- Visual regression tests
- Accessibility tests
- Mobile responsive tests
- CI/CD pipeline (GitHub Actions)
- HTML test reports
- Test retry logic for flaky tests

### Sample Test Scenarios

```typescript
// tests/e2e/checkout/complete-purchase.spec.ts
test('complete purchase flow - Paraguayan user', async ({ page, testData }) => {
  // Login
  await loginPage.goto();
  await loginPage.loginAs(testData.paraguayanUser);

  // Search product
  await page.goto('/products');
  await searchBar.search('Chipa');
  
  // Add to cart
  await productCard.clickAddToCart('Chipa Tradicional');
  await expect(cartBadge).toHaveText('1');

  // Checkout
  await cartPage.goto();
  await checkoutPage.fillShipping({
    address: 'Av. España 1234',
    city: 'Asunción',
    zipCode: '1428'
  });

  await checkoutPage.selectPayment('card');
  await checkoutPage.placeOrder();

  // Verify
  await expect(confirmationPage.orderNumber).toBeVisible();
  await expect(confirmationPage.total).toContain('5.000 ₲');
});
```

### Deliverables
1. Complete test suite (100+ tests)
2. Test automation framework
3. CI/CD pipeline
4. Test reports dashboard
5. Documentation (README, architecture, test plan)
6. OpenCode usage report
7. Performance test results
8. Presentation demonstrating tests

---

## Option 2: Banking Application QA Framework

### Description
Comprehensive test automation for a banking/fintech demo application with focus on security and accuracy.

### Required Features

#### UI Testing (70+ tests)
- **Account Management**
  - Account creation
  - Account types (savings, checking)
  - Account details viewing
  - Account closure

- **Transactions**
  - Deposits
  - Withdrawals
  - Transfers between accounts
  - Transaction history
  - Statement downloads

- **Security**
  - Multi-factor authentication
  - Session timeout
  - Failed login attempts
  - Password strength validation

#### API Testing (50+ tests)
- **Account Operations**
  - Balance inquiries
  - Transaction processing
  - Account statements

- **Security Testing**
  - Authentication endpoints
  - Authorization checks
  - Rate limiting
  - Input validation
  - SQL injection prevention

#### Additional Testing
- **Data Accuracy**
  - Balance calculations
  - Interest calculations
  - Fee calculations
  - Currency conversions (Guaraníes)

- **Compliance Testing**
  - Data privacy
  - Audit trails
  - Regulatory requirements

### Deliverables
1. Security-focused test suite
2. Compliance test documentation
3. Data integrity tests
4. Penetration test reports
5. CI/CD with security scans

---

## Option 3: Social Media Platform Test Automation

### Description
Test automation for a social networking demo application.

### Required Features

#### UI Testing (80+ tests)
- **User Profiles**
  - Profile creation/editing
  - Avatar upload
  - Bio and information
  - Privacy settings

- **Content Creation**
  - Post creation (text, images)
  - Comments
  - Likes/reactions
  - Sharing

- **Social Interactions**
  - Friend requests
  - Following/unfollowing
  - Notifications
  - Messaging

- **Feed & Discovery**
  - News feed
  - Search users/posts
  - Trending topics
  - Recommendations

#### API Testing (40+ tests)
- **Posts API**
  - CRUD operations
  - Feed generation
  - Content moderation

- **Users API**
  - Profile management
  - Relationships (friends, followers)

- **Real-time Features**
  - Live notifications
  - Online status
  - Typing indicators

#### Performance Testing
- Load test for:
  - Feed loading with 1000+ posts
  - Image uploads
  - Concurrent users

### Deliverables
1. Complete test suite
2. Real-time feature tests
3. Media upload tests
4. Performance benchmarks

---

## Option 4: Healthcare Portal Test Automation

### Description
Test automation for a patient portal demo with focus on accessibility and compliance.

### Required Features

#### UI Testing (60+ tests)
- **Patient Portal**
  - Appointment scheduling
  - Medical records access
  - Prescription refills
  - Lab results viewing
  - Provider messaging

- **Accessibility Testing**
  - WCAG 2.1 AA compliance
  - Screen reader compatibility
  - Keyboard navigation
  - Color contrast

#### API Testing (40+ tests)
- **Patient Data API**
  - FHIR compliance
  - Medical records
  - Appointments
  - Prescriptions

- **Security & Privacy**
  - HIPAA compliance tests
  - Data encryption
  - Access controls
  - Audit logging

### Deliverables
1. Accessibility test suite
2. Compliance documentation
3. Security test results
4. Privacy assessment

---

## Option 5: Educational Platform Test Automation

### Description
Test automation for a learning management system (LMS) demo.

### Required Features

#### UI Testing (70+ tests)
- **Course Management**
  - Course catalog
  - Enrollment
  - Progress tracking
  - Certificates

- **Learning Features**
  - Video player
  - Quizzes/assessments
  - Assignments submission
  - Discussion forums

- **Instructor Features**
  - Course creation
  - Student management
  - Grading
  - Analytics

#### API Testing (40+ tests)
- **Courses API**
  - CRUD operations
  - Enrollment management
  - Progress tracking

- **Assessment API**
  - Quiz creation
  - Grading
  - Results

### Deliverables
1. Complete test suite
2. Video player tests
3. Quiz automation
4. Analytics verification

---

## Common Requirements (All Projects)

### Test Coverage Goals
- **Overall**: 90%+ code paths tested
- **Critical Paths**: 100% coverage
- **UI**: All major user flows
- **API**: All endpoints (CRUD + edge cases)
- **Error Handling**: All error scenarios

### CI/CD Integration
```yaml
# .github/workflows/tests.yml
name: Automated Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test
      - run: npm run test:api
      - run: npm run test:performance
      
      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: test-results/
```

### Required Documentation

**README.md**:
```markdown
# [Project Name] Test Automation

## Overview
Brief description of the application under test

## Test Coverage
- UI Tests: X
- API Tests: Y
- Performance Tests: Z
- Total: XYZ tests

## Quick Start
npm install
npx playwright install
npm run test

## CI/CD
Tests run automatically on every push

## Reports
View latest: [link to GitHub Pages]
```

**TEST-PLAN.md**: Comprehensive test strategy
**ARCHITECTURE.md**: Framework design
**API.md**: API test documentation
**JOURNAL.md**: Development process

### OpenCode Usage Requirements

Document OpenCode usage for:
1. **Test Generation**:
   - Prompt used to generate test suites
   - Number of tests generated
   - Time saved vs manual writing

2. **Page Object Creation**:
   - Prompt for POM generation
   - Efficiency gains

3. **Test Data Generation**:
   - Faker integration prompts
   - Data factory creation

4. **Bug Analysis**:
   - Debugging assistance
   - Root cause analysis

### Presentation Requirements

**10-Minute Presentation**:
1. **Introduction** (1 min)
   - Project overview
   - Why this application?

2. **Test Architecture** (2 min)
   - Framework design
   - Technology choices
   - OpenCode integration

3. **Live Demo** (4 min)
   - Run test suite
   - Show passing tests
   - Show HTML reports
   - Demonstrate CI/CD

4. **Technical Highlights** (2 min)
   - Interesting challenges solved
   - OpenCode effectiveness
   - Performance results

5. **Q&A** (1 min)

---

## Evaluation Rubric

See [CAPSTONE-EVALUATION-RUBRIC.md](./CAPSTONE-EVALUATION-RUBRIC.md) for detailed grading criteria.

**QA Track Specific Criteria**:
- Test coverage and quality (30%)
- Framework architecture (20%)
- CI/CD integration (15%)
- Test reports and documentation (15%)
- OpenCode effectiveness (10%)
- Performance testing (5%)
- Presentation (5%)

---

## Getting Started

### Week 9, Day 1-2: Planning

1. **Choose Your Project**
   - Review options above
   - Consider your interests
   - Check application availability

2. **Set Up Environment**
   ```bash
   # Create project
   mkdir capstone-qa-project
   cd capstone-qa-project
   
   # Initialize
   npm init -y
   npm install -D @playwright/test typescript
   npm install -D @faker-js/faker
   
   # Initialize Playwright
   npx playwright install
   
   # Set up TypeScript
   npx tsc --init
   
   # Create folder structure
   mkdir -p tests/{e2e,api,performance,fixtures,pages,utils}
   ```

3. **Create Test Plan**
   - List all features to test
   - Prioritize critical paths
   - Estimate test counts
   - Define success criteria

4. **Set Up CI/CD**
   - Create GitHub repository
   - Add GitHub Actions workflow
   - Configure test reports

### Resources

**Demo Applications**:
- E-Commerce: https://demo.opencart.com/
- Banking: https://demo.testfire.net/
- Social: (Build simple one or use existing)
- LMS: https://demo.moodle.org/

**OpenCode Prompts**:
- See course module examples
- Use prompt library
- Document effective prompts

**Support**:
- Office hours: Mon-Fri 2-4 PM
- Slack: #capstone-qa
- Peer reviews: Wednesday Week 9

---

## Success Tips

1. **Start with Critical Paths**: Test login, checkout, core features first
2. **Use OpenCode Extensively**: Generate test skeletons, then refine
3. **Test Early and Often**: Run tests continuously as you build
4. **Focus on Stability**: Flaky tests hurt credibility
5. **Document Everything**: Good documentation impresses
6. **Practice Your Demo**: A smooth demo is crucial

---

**Ready to build exceptional test automation?** Choose your project and start planning!
