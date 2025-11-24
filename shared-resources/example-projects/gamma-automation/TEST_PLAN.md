# Comprehensive QA Automation Test Plan
## Gamma Course Automation System

**Version:** 1.0
**Date:** 2025-10-16
**Target Coverage:** >90%

---

## Table of Contents
1. [Overview](#overview)
2. [Test Strategy](#test-strategy)
3. [Test Structure](#test-structure)
4. [Unit Tests](#unit-tests)
5. [Integration Tests](#integration-tests)
6. [End-to-End Tests](#end-to-end-tests)
7. [Test Execution](#test-execution)
8. [Coverage Goals](#coverage-goals)
9. [CI/CD Integration](#cicd-integration)

---

## Overview

### Purpose
This test plan provides comprehensive QA automation coverage for the Gamma Course Automation System, ensuring reliability, maintainability, and quality across all components.

### Scope
- **Unit Tests**: All source modules (17 files)
- **Integration Tests**: Component interactions
- **End-to-End Tests**: Complete user workflows
- **Performance Tests**: Scalability and timing
- **Regression Tests**: UI selector validation

### Test Framework
- **Framework**: Jest 29.7.0
- **Test Runner**: Node.js with ES Modules
- **Coverage Tool**: Istanbul (via Jest)
- **Assertion Library**: Jest expect + custom matchers
- **Mocking**: Jest mocks + custom factories

---

## Test Strategy

### Testing Pyramid
```
           E2E Tests (10%)
         ┌─────────────┐
        │   Critical   │
       │    Workflows  │
      └───────────────┘

    Integration Tests (30%)
   ┌───────────────────┐
  │  Component Inter-  │
 │    actions &        │
│    Workflows         │
└─────────────────────┘

      Unit Tests (60%)
 ┌──────────────────────┐
│   Individual Module   │
│      Testing          │
│   (High Coverage)     │
└──────────────────────┘
```

### Principles
1. **Fast Feedback**: Unit tests run in <5 seconds
2. **Isolated**: Each test is independent
3. **Repeatable**: Consistent results across runs
4. **Comprehensive**: >90% code coverage
5. **Maintainable**: Clear structure and naming

---

## Test Structure

### Directory Layout
```
tests/
├── unit/                      # Unit tests (60% of tests)
│   ├── core/                  # Core functionality tests
│   │   ├── BrowserManager.test.js ✅
│   │   ├── SessionManager.test.js
│   │   ├── ElementWaiter.test.js
│   │   ├── GammaNavigator.test.js
│   │   └── ElementSelectors.test.js
│   ├── automation/            # Automation tests
│   │   ├── PresentationCreator.test.js
│   │   ├── SlideAutomator.test.js
│   │   ├── ThemeManager.test.js
│   │   └── ExportManager.test.js
│   ├── content/               # Content processing tests
│   │   ├── ContentBrainstormer.test.js
│   │   ├── ContentParser.test.js
│   │   └── SlideBuilder.test.js
│   └── utils/                 # Utility tests
│       ├── Config.test.js
│       ├── Logger.test.js
│       ├── ErrorHandler.test.js
│       ├── RateLimiter.test.js
│       └── Helpers.test.js
├── integration/               # Integration tests (30%)
│   ├── browser-session.test.js
│   ├── navigation-waiting.test.js
│   ├── content-automation.test.js
│   ├── full-workflow.test.js
│   └── api-integration.test.js
├── e2e/                       # End-to-end tests (10%)
│   ├── course-creation.test.js
│   ├── lecture-creation.test.js
│   ├── assessment-generation.test.js
│   └── export-workflow.test.js
├── helpers/                   # Test utilities
│   ├── mockFactories.js ✅
│   ├── fixtures.js ✅
│   ├── assertions.js ✅
│   └── testHelpers.js ✅
├── setup.js ✅                # Jest setup
├── globalSetup.js ✅          # Global setup
└── globalTeardown.js ✅       # Global teardown
```

---

## Unit Tests

### 1. Core Module Tests

#### 1.1 BrowserManager.test.js ✅
**Status:** Complete
**Coverage Target:** 95%
**Test Count:** 40+

**Test Suites:**
- ✅ Constructor initialization
- ✅ Browser launching (default & custom options)
- ✅ Context creation (with/without session data)
- ✅ Page creation and tracking
- ✅ Health checking
- ✅ Screenshot capture
- ✅ Cleanup and resource management
- ✅ Edge cases and error handling

**Key Scenarios:**
- Launch browser with various configurations
- Create multiple contexts and pages
- Handle launch failures
- Verify health status
- Clean up resources properly
- Handle rapid sequential operations

---

#### 1.2 SessionManager.test.js
**Coverage Target:** 95%
**Test Count:** 35+

**Test Suites:**
- Constructor and initialization
- Login methods (email, OAuth)
- Session saving and loading
- Session validation
- Session refresh
- Cookie management
- Storage state handling
- Authentication flows
- Error recovery

**Key Test Cases:**
```javascript
describe('SessionManager', () => {
  test('should login with email credentials');
  test('should save session state to file');
  test('should load existing session');
  test('should validate active session');
  test('should refresh expired session');
  test('should handle invalid credentials');
  test('should handle Google OAuth');
  test('should handle GitHub OAuth');
  test('should cleanup old sessions');
  test('should handle concurrent logins');
});
```

---

#### 1.3 ElementWaiter.test.js
**Coverage Target:** 95%
**Test Count:** 40+

**Test Suites:**
- Element waiting strategies
- Fallback selector handling
- Click operations
- Fill operations
- Type operations
- Select operations
- Text retrieval
- Visibility checks
- Loading indicators
- Timeout handling

**Key Test Cases:**
```javascript
describe('ElementWaiter', () => {
  test('should wait for element with primary selector');
  test('should fallback to secondary selectors');
  test('should click element when visible');
  test('should fill input fields');
  test('should type with delays');
  test('should select dropdown options');
  test('should wait for loading to complete');
  test('should handle timeout gracefully');
  test('should check element existence');
  test('should get element text');
});
```

---

#### 1.4 GammaNavigator.test.js
**Coverage Target:** 90%
**Test Count:** 30+

**Test Suites:**
- Home navigation
- Workspace navigation
- Create page navigation
- Editor navigation
- Theme panel opening
- Export dialog opening
- Page state verification
- URL handling
- Error message detection
- Dialog management

**Key Test Cases:**
```javascript
describe('GammaNavigator', () => {
  test('should navigate to home page');
  test('should navigate to workspace');
  test('should navigate to create page with AI method');
  test('should navigate to create page with template');
  test('should navigate to editor');
  test('should open theme panel');
  test('should open export dialog');
  test('should verify workspace state');
  test('should verify editor state');
  test('should detect error messages');
  test('should close dialogs');
});
```

---

#### 1.5 ElementSelectors.test.js
**Coverage Target:** 90%
**Test Count:** 20+

**Test Suites:**
- Selector structure validation
- Fallback mechanism
- Selector groups (auth, dashboard, editor)
- Selector retrieval
- Selector validation

---

### 2. Automation Module Tests

#### 2.1 PresentationCreator.test.js
**Coverage Target:** 90%
**Test Count:** 35+

**Test Suites:**
- Presentation creation workflow
- Content parsing and building
- AI content input
- Slide creation orchestration
- Theme application
- Settings application
- Export handling
- Error handling with screenshots
- Course outline creation
- Lecture creation
- Presentation updates

**Key Test Cases:**
```javascript
describe('PresentationCreator', () => {
  test('should create presentation from content');
  test('should create from course outline');
  test('should create from lecture data');
  test('should input AI generation prompts');
  test('should create all slides in sequence');
  test('should apply theme after creation');
  test('should export presentation');
  test('should handle creation errors');
  test('should capture screenshots on failure');
  test('should update existing presentation');
});
```

---

#### 2.2 SlideAutomator.test.js
**Coverage Target:** 90%
**Test Count:** 30+

**Test Suites:**
- Slide addition
- Slide deletion
- Slide duplication
- Title setting
- Content setting
- Slide navigation
- Slide type handling
- Slide count retrieval
- Error handling

**Key Test Cases:**
```javascript
describe('SlideAutomator', () => {
  test('should add new slide');
  test('should delete slide');
  test('should duplicate slide');
  test('should set slide title');
  test('should set slide content');
  test('should navigate to specific slide');
  test('should get total slide count');
  test('should create slide from data');
  test('should handle title slides');
  test('should handle content slides');
  test('should handle code slides');
});
```

---

#### 2.3 ThemeManager.test.js
**Coverage Target:** 85%
**Test Count:** 25+

**Test Suites:**
- Theme application
- Theme selection
- Color scheme setting
- Font size adjustment
- Preset themes
- Theme list retrieval
- Error handling

**Key Test Cases:**
```javascript
describe('ThemeManager', () => {
  test('should apply theme by name');
  test('should set color scheme');
  test('should adjust font size');
  test('should apply educational theme preset');
  test('should apply modern theme preset');
  test('should list available themes');
  test('should handle invalid theme names');
  test('should wait for theme application');
});
```

---

#### 2.4 ExportManager.test.js
**Coverage Target:** 85%
**Test Count:** 25+

**Test Suites:**
- PDF export
- PowerPoint export
- HTML export
- Share functionality
- Link copying
- Download handling
- Format detection
- Export options
- Error handling

---

### 3. Content Module Tests

#### 3.1 ContentBrainstormer.test.js
**Coverage Target:** 85%
**Test Count:** 35+

**Test Suites:**
- Course outline generation
- Learning objectives generation (Bloom's taxonomy)
- Content expansion
- Assessment generation
- Activity generation
- Difficulty adjustment
- Real-world examples
- Error handling

**Key Test Cases:**
```javascript
describe('ContentBrainstormer', () => {
  test('should generate course outline');
  test('should create learning objectives');
  test('should expand topic content');
  test('should generate multiple-choice questions');
  test('should generate coding assessments');
  test('should generate interactive activities');
  test('should align with Bloom\'s taxonomy');
  test('should adjust for difficulty level');
  test('should include real-world examples');
});
```

---

#### 3.2 ContentParser.test.js
**Coverage Target:** 90%
**Test Count:** 30+

**Test Suites:**
- JSON parsing
- Markdown parsing
- YAML parsing
- Plain text parsing
- Format auto-detection
- Validation
- Error handling
- Edge cases

**Key Test Cases:**
```javascript
describe('ContentParser', () => {
  test('should parse JSON content');
  test('should parse Markdown content');
  test('should parse YAML content');
  test('should parse plain text');
  test('should auto-detect format');
  test('should validate content structure');
  test('should handle malformed JSON');
  test('should handle invalid Markdown');
  test('should convert to Gamma format');
});
```

---

#### 3.3 SlideBuilder.test.js
**Coverage Target:** 90%
**Test Count:** 40+

**Test Suites:**
- Presentation building
- Slide type creation (all 12 types)
- Layout handling
- Content formatting
- Bullet point extraction
- Code formatting
- Image handling
- Course outline conversion
- Lecture data conversion

---

### 4. Utility Module Tests

#### 4.1 Config.test.js
**Coverage Target:** 95%
**Test Count:** 25+

**Test Suites:**
- Config loading
- Get/Set operations
- Dot-notation paths
- Environment variables
- Config merging
- Validation
- Default values

---

#### 4.2 Logger.test.js
**Coverage Target:** 95%
**Test Count:** 20+

**Test Suites:**
- Log level filtering
- File logging
- Console logging
- Child logger creation
- Log formatting
- Metadata handling
- Error logging

---

#### 4.3 ErrorHandler.test.js
**Coverage Target:** 95%
**Test Count:** 30+

**Test Suites:**
- Retry mechanism
- Exponential backoff
- Retryable error detection
- Screenshot capture
- Fallback execution
- Error wrapping
- Context tracking

**Key Test Cases:**
```javascript
describe('ErrorHandler', () => {
  test('should retry failed operations');
  test('should use exponential backoff');
  test('should stop after max attempts');
  test('should detect retryable errors');
  test('should capture screenshots on error');
  test('should execute fallback functions');
  test('should preserve error context');
  test('should handle timeout errors');
});
```

---

#### 4.4 RateLimiter.test.js
**Coverage Target:** 95%
**Test Count:** 25+

**Test Suites:**
- Request limiting
- Concurrent request control
- Queue management
- Request release
- Status monitoring
- Window reset
- Error handling

**Key Test Cases:**
```javascript
describe('RateLimiter', () => {
  test('should enforce per-minute limit');
  test('should queue excess requests');
  test('should process queue');
  test('should limit concurrent requests');
  test('should release requests');
  test('should reset window');
  test('should provide status');
  test('should handle rapid requests');
});
```

---

#### 4.5 Helpers.test.js
**Coverage Target:** 90%
**Test Count:** 15+

**Test Suites:**
- Utility functions
- Helper methods
- Data transformation
- String manipulation
- Array operations

---

## Integration Tests

### 1. Browser-Session Integration (browser-session.test.js)
**Test Count:** 20+

**Scenarios:**
- Launch browser → Create session → Login → Save state
- Load session → Validate → Use in automation
- Multi-session management
- Session expiration handling
- Context isolation

---

### 2. Navigation-Waiting Integration (navigation-waiting.test.js)
**Test Count:** 25+

**Scenarios:**
- Navigate → Wait for elements → Interact
- Fallback selector chains
- Loading indicators → Page ready
- Error recovery → Retry navigation

---

### 3. Content-Automation Integration (content-automation.test.js)
**Test Count:** 30+

**Scenarios:**
- Brainstorm content → Parse → Build slides → Create presentation
- Course outline → Multiple presentations
- Lecture data → Full lecture presentation
- Assessment generation → Quiz slides

---

### 4. Full Workflow Integration (full-workflow.test.js)
**Test Count:** 15+

**Scenarios:**
- Complete course creation end-to-end
- Single lecture creation
- Workshop material generation
- Assessment creation

---

### 5. API Integration (api-integration.test.js)
**Test Count:** 20+

**Scenarios:**
- Main API methods
- GammaCourseCreator initialization
- createCourse workflow
- createLecture workflow
- Cleanup and resource management

---

## End-to-End Tests

### 1. Course Creation E2E (course-creation.test.js)
**Test Count:** 10+

**Full Workflow:**
1. Initialize system
2. Login to Gamma
3. Brainstorm course outline
4. Create presentation
5. Apply theme
6. Export to PDF
7. Verify results
8. Cleanup

**Requirements:**
- Real browser (headless or visible)
- Valid Gamma credentials
- Network access
- Longer timeout (60s+)

---

### 2. Lecture Creation E2E (lecture-creation.test.js)
**Test Count:** 8+

**Full Workflow:**
1. Initialize system
2. Generate learning objectives
3. Expand content
4. Create lecture slides
5. Apply educational theme
6. Verify slide count
7. Cleanup

---

### 3. Assessment Generation E2E (assessment-generation.test.js)
**Test Count:** 8+

**Full Workflow:**
1. Generate various assessment types
2. Create quiz presentation
3. Verify question quality
4. Export assessment
5. Cleanup

---

### 4. Export Workflow E2E (export-workflow.test.js)
**Test Count:** 8+

**Full Workflow:**
1. Create presentation
2. Export as PDF
3. Export as PowerPoint
4. Generate share link
5. Verify exports
6. Cleanup

---

## Test Execution

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test tests/unit/core/BrowserManager.test.js

# Run tests in watch mode
npm run test:watch

# Run only unit tests
npm test -- tests/unit

# Run only integration tests
npm test -- tests/integration

# Run only E2E tests
npm test -- tests/e2e

# Run tests matching pattern
npm test -- --testNamePattern="BrowserManager"
```

### Test Scripts (package.json)

```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:e2e": "jest tests/e2e",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

---

## Coverage Goals

### Overall Coverage: >90%

| Module Category | Target | Priority |
|----------------|--------|----------|
| Core | 95% | Critical |
| Automation | 90% | High |
| Content | 85% | High |
| Utilities | 95% | Critical |
| Brainstorming | 85% | Medium |
| Selectors | 90% | High |

### Coverage Reports

- **Text Summary**: Console output
- **HTML Report**: `coverage/index.html`
- **LCOV**: `coverage/lcov.info` (for CI tools)
- **JSON**: `coverage/coverage-final.json`

### Coverage Thresholds

```javascript
// jest.config.js
coverageThresholds: {
  global: {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90
  }
}
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install chromium

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

npm run test:unit
if [ $? -ne 0 ]; then
  echo "Unit tests failed. Commit aborted."
  exit 1
fi
```

---

## Test Maintenance

### Regular Activities

1. **Weekly**: Review and update test coverage
2. **Bi-weekly**: Update selectors if Gamma UI changes
3. **Monthly**: Performance test review
4. **Per Release**: Full regression test suite

### Selector Validation

```javascript
// tests/integration/selector-validation.test.js
describe('Selector Validation', () => {
  test('should validate all selectors against live Gamma', async () => {
    // Test each selector against actual Gamma UI
    // Report any broken selectors
  });
});
```

---

## Best Practices

### Test Writing Guidelines

1. **AAA Pattern**: Arrange, Act, Assert
2. **One Assertion Per Test**: When logical
3. **Clear Naming**: `should [expected behavior] when [condition]`
4. **Independent Tests**: No shared state
5. **Fast Execution**: Unit tests <100ms each
6. **Meaningful Assertions**: Test behavior, not implementation

### Example Test Structure

```javascript
describe('FeatureName', () => {
  // Setup
  beforeEach(() => {
    // Arrange: Setup test environment
  });

  // Teardown
  afterEach(() => {
    // Cleanup
  });

  describe('methodName', () => {
    test('should do X when Y', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = methodName(input);

      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

---

## Troubleshooting

### Common Issues

#### Tests Fail in CI but Pass Locally
- Check environment variables
- Verify Node version
- Check timing/race conditions
- Review CI logs for specific errors

#### Flaky Tests
- Add proper waits
- Use retry logic
- Increase timeouts
- Mock time-dependent operations

#### Low Coverage
- Identify untested branches
- Add edge case tests
- Test error paths
- Review coverage report

---

## Success Metrics

### Test Suite Health

- ✅ All tests passing
- ✅ Coverage >90%
- ✅ No flaky tests
- ✅ Execution time <5 min (unit + integration)
- ✅ Clear test reports
- ✅ CI integration working

### Quality Metrics

- **Test Count**: 400+ tests
- **Coverage**: >90% overall
- **Execution Time**: <5 minutes
- **Flakiness**: <1% flaky tests
- **Maintainability**: Tests updated within 1 week of code changes

---

## Conclusion

This comprehensive test plan ensures the Gamma Course Automation System is thoroughly tested at all levels. With >400 tests covering unit, integration, and E2E scenarios, we achieve:

1. ✅ **High Confidence**: >90% code coverage
2. ✅ **Fast Feedback**: Unit tests in seconds
3. ✅ **Quality Assurance**: All critical paths tested
4. ✅ **Maintainability**: Clear structure and documentation
5. ✅ **CI/CD Ready**: Automated testing pipeline

The test suite is designed to catch bugs early, ensure code quality, and support confident refactoring and feature development.

---

**Document Maintained By**: QA Team
**Last Updated**: 2025-10-16
**Next Review**: 2025-11-16
