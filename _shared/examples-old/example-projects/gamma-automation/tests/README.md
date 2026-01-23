# Tests Directory

Complete test suite for the Gamma Course Automation System.

---

## Quick Start

```bash
# Install dependencies
npm install
npx playwright install chromium

# Run all unit tests (fast)
npm run test:unit

# Run with coverage
npm run test:coverage

# View coverage report
open coverage/index.html  # macOS
start coverage/index.html # Windows
```

---

## Directory Structure

```
tests/
├── unit/                      # Unit tests (fast, isolated)
│   ├── core/                  # Core module tests
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
│   ├── content/               # Content tests
│   │   ├── ContentBrainstormer.test.js ✅
│   │   ├── ContentParser.test.js
│   │   └── SlideBuilder.test.js
│   └── utils/                 # Utility tests
│       ├── Config.test.js
│       ├── Logger.test.js
│       ├── ErrorHandler.test.js
│       ├── RateLimiter.test.js
│       └── Helpers.test.js
│
├── integration/               # Integration tests
│   ├── content-automation.test.js ✅
│   ├── browser-session.test.js
│   ├── navigation-waiting.test.js
│   ├── full-workflow.test.js
│   └── api-integration.test.js
│
├── e2e/                       # End-to-end tests
│   ├── course-creation.test.js ✅
│   ├── lecture-creation.test.js
│   ├── assessment-generation.test.js
│   └── export-workflow.test.js
│
├── helpers/                   # Test utilities
│   ├── mockFactories.js ✅    # Mock object creators
│   ├── fixtures.js ✅          # Test data
│   ├── assertions.js ✅        # Custom assertions
│   └── testHelpers.js ✅       # Helper functions
│
├── setup.js ✅                 # Test environment setup
├── globalSetup.js ✅           # Global initialization
└── globalTeardown.js ✅        # Global cleanup
```

---

## Running Tests

### All Tests
```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
npm run test:ci            # CI mode
```

### By Category
```bash
npm run test:unit          # Unit tests only (fast)
npm run test:integration   # Integration tests
npm run test:e2e           # End-to-end tests (requires credentials)
```

### Specific Tests
```bash
# Run specific file
npm test tests/unit/core/BrowserManager.test.js

# Run tests matching pattern
npm test -- --testNamePattern="BrowserManager"

# Run tests in directory
npm test -- tests/unit/core
```

---

## Test Files Status

### ✅ Complete Examples

| File | Lines | Tests | Status |
|------|-------|-------|--------|
| BrowserManager.test.js | 200+ | 40+ | ✅ Complete |
| ContentBrainstormer.test.js | 350+ | 60+ | ✅ Complete |
| content-automation.test.js | 500+ | 40+ | ✅ Complete |
| course-creation.test.js | 600+ | 20+ | ✅ Complete |

### ⏳ To Be Implemented

| Category | Files | Planned Tests |
|----------|-------|---------------|
| Core (remaining) | 4 | 125+ |
| Automation | 4 | 115+ |
| Content (remaining) | 2 | 70+ |
| Utilities | 5 | 115+ |
| Integration (remaining) | 4 | 60+ |
| E2E (remaining) | 3 | 14+ |

---

## Test Helpers

### Mock Factories (mockFactories.js)

Create mock objects for testing:

```javascript
import {
  mockBrowser,
  mockPage,
  mockLogger,
  mockConfig,
  mockCourseOutline,
  mockPresentation
} from './helpers/mockFactories.js';

// Use in tests
const page = mockPage();
const outline = mockCourseOutline();
```

### Fixtures (fixtures.js)

Predefined test data:

```javascript
import {
  courseSpecs,
  lectureSpecs,
  themeOptions,
  exportFormats
} from './helpers/fixtures.js';

// Use in tests
const result = await creator.createCourse(courseSpecs.beginner);
```

### Custom Assertions (assertions.js)

Domain-specific assertions:

```javascript
import {
  assertValidCourseOutline,
  assertValidPresentation,
  assertValidSlide,
  assertValidLearningObjectives
} from './helpers/assertions.js';

// Use in tests
const outline = await brainstormer.generateCourseOutline(...);
assertValidCourseOutline(outline);
```

### Test Helpers (testHelpers.js)

Utility functions:

```javascript
import {
  waitForCondition,
  measureTime,
  createTempDir,
  mockEnv,
  retry
} from './helpers/testHelpers.js';

// Use in tests
await waitForCondition(() => element.isVisible());
const { result, duration } = await measureTime(async () => operation());
```

---

## Writing Tests

### Unit Test Template

```javascript
import { describe, test, expect, beforeEach } from '@jest/globals';
import { mockLogger } from '../helpers/mockFactories.js';

jest.unstable_mockModule('../../src/utils/Logger.js', () => ({
  default: mockLogger()
}));

describe('ModuleName', () => {
  let ModuleClass;
  let instance;

  beforeEach(async () => {
    const Module = await import('../../src/path/ModuleName.js');
    ModuleClass = Module.default;
    instance = new ModuleClass();
  });

  describe('methodName', () => {
    test('should do X when Y', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = instance.methodName(input);

      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Integration Test Template

```javascript
import { describe, test, expect } from '@jest/globals';

describe('Feature Integration', () => {
  test('should complete full workflow', async () => {
    // Setup
    const component1 = new Component1();
    const component2 = new Component2();

    // Execute workflow
    const result1 = await component1.process();
    const result2 = await component2.process(result1);

    // Verify
    expect(result2).toBeDefined();
  });
});
```

### E2E Test Template

```javascript
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import GammaCourseCreator from '../../src/index.js';

describe('Feature E2E', () => {
  let creator;

  beforeAll(async () => {
    creator = new GammaCourseCreator({
      credentials: {
        email: process.env.GAMMA_EMAIL,
        password: process.env.GAMMA_PASSWORD
      }
    });
    await creator.initialize();
  }, 60000);

  afterAll(async () => {
    await creator.cleanup();
  });

  test('should complete user workflow', async () => {
    const result = await creator.createCourse({
      topic: 'Test',
      level: 'beginner',
      duration: '8 weeks'
    });

    expect(result.success).toBe(true);
  }, 120000);
});
```

---

## Coverage Reports

### Generate Coverage

```bash
# Generate coverage report
npm run test:coverage

# View in browser
open coverage/index.html
```

### Coverage Thresholds

| Category | Target |
|----------|--------|
| Overall | >90% |
| Core | >95% |
| Automation | >90% |
| Content | >85% |
| Utilities | >95% |

### Coverage Files

- `coverage/index.html` - Interactive HTML report
- `coverage/lcov.info` - LCOV format (for CI tools)
- `coverage/coverage-final.json` - JSON format
- `coverage/` - Text summary

---

## Custom Matchers

Available custom matchers (defined in `setup.js`):

```javascript
// Value in range
expect(duration).toBeWithinRange(1000, 5000);

// Valid URL
expect(presentation.url).toBeValidUrl();

// Presentation has specific slide count
expect(presentation).toHaveSlides(10);
```

---

## Test Configuration

### Jest Config (jest.config.js)

- ES Module support
- Coverage thresholds enforced
- 30-second default timeout
- Custom matchers loaded
- Module path aliases

### Environment Variables (.env.test)

```bash
NODE_ENV=test
LOG_LEVEL=error
GAMMA_EMAIL=test@example.com
GAMMA_PASSWORD=testpassword123
HEADLESS=true
```

---

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Use `beforeEach` for setup
- Use `afterEach` for cleanup
- No shared state between tests

### 2. Clear Naming
```javascript
// ✅ Good
test('should throw error when input is empty');

// ❌ Bad
test('test1');
```

### 3. AAA Pattern
```javascript
test('should calculate correctly', () => {
  // Arrange
  const input = 5;

  // Act
  const result = calculate(input);

  // Assert
  expect(result).toBe(10);
});
```

### 4. Mock External Dependencies
```javascript
// ✅ Mock browser in unit tests
const page = mockPage();

// ❌ Don't use real browser in unit tests
const browser = await chromium.launch();
```

---

## Troubleshooting

### Tests Fail Locally

```bash
# Clear Jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose

# Enable debug logging
LOG_LEVEL=debug npm test
```

### Flaky Tests

```javascript
// Use proper waits
await page.waitForLoadState('networkidle');

// Increase timeout
test('slow test', async () => {
  // ...
}, 60000); // 60 seconds
```

### Low Coverage

```bash
# View coverage report
npm run test:coverage
open coverage/index.html

# Look for untested lines (red)
# Add tests for error paths and edge cases
```

---

## Documentation

### Primary Docs
- [TEST_PLAN.md](../TEST_PLAN.md) - Complete test specification
- [TESTING_GUIDE.md](../TESTING_GUIDE.md) - Practical testing guide
- [TEST_IMPLEMENTATION_SUMMARY.md](../TEST_IMPLEMENTATION_SUMMARY.md) - Implementation summary

### Quick Reference
```bash
npm test                    # Run all tests
npm run test:unit          # Unit tests
npm run test:integration   # Integration tests
npm run test:e2e           # E2E tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
```

---

## CI/CD Integration

Tests run automatically on:
- Every push to repository
- Every pull request
- Scheduled daily runs

### GitHub Actions Workflow

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install chromium
      - run: npm run test:ci
```

---

## Getting Help

### Resources
1. Read [TESTING_GUIDE.md](../TESTING_GUIDE.md)
2. Check [TEST_PLAN.md](../TEST_PLAN.md)
3. Review example tests in this directory
4. Check helper utilities in `helpers/`

### Commands
```bash
# Debug test
npm test -- --verbose tests/unit/core/BrowserManager.test.js

# Run with Node debugger
node --inspect-brk node_modules/.bin/jest <test-file>

# Clear cache and retry
npm test -- --clearCache && npm test
```

---

## Stats

| Metric | Value |
|--------|-------|
| Total Test Files | 26 planned |
| Complete Examples | 4 |
| Helper Files | 4 |
| Documentation | 3 major docs |
| Planned Tests | 650+ |
| Coverage Target | >90% |

---

**Happy Testing!** 🧪✅

For detailed information, see:
- [TEST_PLAN.md](../TEST_PLAN.md)
- [TESTING_GUIDE.md](../TESTING_GUIDE.md)
- [TEST_IMPLEMENTATION_SUMMARY.md](../TEST_IMPLEMENTATION_SUMMARY.md)
