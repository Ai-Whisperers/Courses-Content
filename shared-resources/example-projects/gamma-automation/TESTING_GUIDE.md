# Testing Guide
## Gamma Course Automation System

Complete guide for running and writing tests for the Gamma automation system.

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [Running Tests](#running-tests)
3. [Writing Tests](#writing-tests)
4. [Test Structure](#test-structure)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run tests
npm test
```

### First Test Run

```bash
# Run all unit tests (fast, no browser required)
npm run test:unit

# Run with coverage
npm run test:coverage

# View coverage report
open coverage/index.html  # macOS
start coverage/index.html # Windows
```

---

## Running Tests

### All Test Types

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run E2E tests only (requires credentials)
npm run test:e2e

# Run with coverage
npm run test:coverage

# Run in watch mode (re-run on changes)
npm run test:watch
```

### Specific Tests

```bash
# Run specific test file
npm test tests/unit/core/BrowserManager.test.js

# Run tests matching pattern
npm test -- --testNamePattern="BrowserManager"

# Run tests in specific directory
npm test -- tests/unit/core

# Run a single test
npm test -- --testNamePattern="should launch browser"
```

### Coverage Options

```bash
# Generate coverage report
npm run test:coverage

# Coverage with specific tests
npm test -- --coverage tests/unit

# Coverage for specific file
npm test -- --coverage --collectCoverageFrom="src/core/BrowserManager.js"
```

### CI Mode

```bash
# Run tests in CI environment
npm run test:ci

# This runs:
# - All tests with coverage
# - Max 2 workers
# - No watch mode
# - Fail on coverage threshold
```

---

## Writing Tests

### Test File Template

```javascript
/**
 * Unit tests for ModuleName
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { mockLogger, mockConfig } from '../../helpers/mockFactories.js';

// Mock dependencies
jest.unstable_mockModule('../../../src/utils/Logger.js', () => ({
  default: mockLogger()
}));

describe('ModuleName', () => {
  let ModuleClass;
  let instance;

  beforeEach(async () => {
    // Import module under test
    const ModuleModule = await import('../../../src/path/ModuleName.js');
    ModuleClass = ModuleModule.default;

    // Create instance
    instance = new ModuleClass();
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    test('should handle errors', async () => {
      await expect(instance.methodName()).rejects.toThrow('Error message');
    });
  });
});
```

### Unit Test Example

```javascript
// tests/unit/utils/RateLimiter.test.js
import { describe, test, expect } from '@jest/globals';
import RateLimiter from '../../../src/utils/RateLimiter.js';

describe('RateLimiter', () => {
  test('should enforce per-minute limit', async () => {
    const limiter = new RateLimiter({ perMinute: 5 });

    // Acquire 5 times (should succeed)
    for (let i = 0; i < 5; i++) {
      await limiter.acquire();
      expect(true).toBe(true);
    }

    // 6th request should queue
    const status = limiter.getStatus();
    expect(status.requestsInCurrentMinute).toBe(5);
  });
});
```

### Integration Test Example

```javascript
// tests/integration/content-automation.test.js
import { describe, test, expect } from '@jest/globals';
import ContentBrainstormer from '../../src/brainstorming/ContentBrainstormer.js';
import SlideBuilder from '../../src/content/SlideBuilder.js';

describe('Content to Slides Pipeline', () => {
  test('should flow from brainstorming to slides', async () => {
    // Generate content
    const brainstormer = new ContentBrainstormer();
    const outline = await brainstormer.generateCourseOutline(
      'Test Topic',
      'beginner',
      '8 weeks'
    );

    // Build slides
    const builder = new SlideBuilder();
    const slides = builder.buildFromOutline(outline);

    // Verify
    expect(slides.length).toBeGreaterThan(0);
    expect(slides[0].type).toBe('title');
  });
});
```

### E2E Test Example

```javascript
// tests/e2e/course-creation.test.js
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import GammaCourseCreator from '../../src/index.js';

describe('Course Creation E2E', () => {
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

  test('should create complete course', async () => {
    const result = await creator.createCourse({
      topic: 'Python Basics',
      level: 'beginner',
      duration: '8 weeks'
    });

    expect(result.success).toBe(true);
    expect(result.presentation.url).toMatch(/gamma\.app/);
  }, 120000);
});
```

---

## Test Structure

### Directory Organization

```
tests/
├── unit/                   # Fast, isolated tests
│   ├── core/              # Core functionality
│   ├── automation/        # Automation modules
│   ├── content/           # Content processing
│   └── utils/             # Utilities
├── integration/           # Component interaction tests
├── e2e/                   # Full workflow tests
└── helpers/               # Shared test utilities
    ├── mockFactories.js   # Mock object creators
    ├── fixtures.js        # Test data
    ├── assertions.js      # Custom assertions
    └── testHelpers.js     # Utility functions
```

### Naming Conventions

- **Test files**: `ModuleName.test.js`
- **Test suites**: `describe('ModuleName', () => {})`
- **Test cases**: `test('should do X when Y', () => {})`
- **Setup**: `beforeEach`, `beforeAll`
- **Teardown**: `afterEach`, `afterAll`

---

## Best Practices

### 1. Test Isolation

```javascript
// ✅ Good: Each test is independent
describe('Counter', () => {
  let counter;

  beforeEach(() => {
    counter = new Counter();
  });

  test('should increment', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });

  test('should decrement', () => {
    counter.decrement();
    expect(counter.value).toBe(-1);
  });
});

// ❌ Bad: Tests depend on each other
describe('Counter', () => {
  const counter = new Counter();

  test('should increment', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });

  test('should increment again', () => {
    // Depends on previous test!
    counter.increment();
    expect(counter.value).toBe(2);
  });
});
```

### 2. Clear Test Names

```javascript
// ✅ Good: Describes behavior and condition
test('should throw error when input is empty');
test('should return cached value when available');
test('should retry 3 times on network failure');

// ❌ Bad: Vague or implementation-focused
test('test1');
test('calls API');
test('works');
```

### 3. AAA Pattern

```javascript
test('should calculate total price with tax', () => {
  // Arrange: Setup test data
  const items = [{ price: 10 }, { price: 20 }];
  const taxRate = 0.1;
  const calculator = new PriceCalculator();

  // Act: Execute the behavior
  const total = calculator.calculateTotal(items, taxRate);

  // Assert: Verify the result
  expect(total).toBe(33); // (10 + 20) * 1.1
});
```

### 4. Mock External Dependencies

```javascript
// ✅ Good: Mock external dependencies
jest.unstable_mockModule('playwright', () => ({
  chromium: {
    launch: jest.fn().mockResolvedValue(mockBrowser())
  }
}));

// ❌ Bad: Use real browser in unit tests
const browser = await chromium.launch(); // Slow and brittle
```

### 5. Test Edge Cases

```javascript
describe('divide', () => {
  test('should divide positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('should divide negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('should handle zero dividend', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('should throw on zero divisor', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  test('should handle decimal results', () => {
    expect(divide(10, 3)).toBeCloseTo(3.33, 2);
  });
});
```

### 6. Use Helper Functions

```javascript
// helpers/assertions.js
export function assertValidCourseOutline(outline) {
  expect(outline).toBeDefined();
  expect(outline).toHaveProperty('title');
  expect(outline).toHaveProperty('modules');
  expect(outline.modules.length).toBeGreaterThan(0);
}

// In tests
import { assertValidCourseOutline } from '../helpers/assertions.js';

test('should generate valid outline', async () => {
  const outline = await brainstormer.generateCourseOutline(...);
  assertValidCourseOutline(outline); // Clean and reusable
});
```

---

## Troubleshooting

### Common Issues

#### Tests Fail Locally But Pass in CI

**Problem**: Tests work on your machine but fail in CI

**Solutions**:
```bash
# Check Node version matches CI
node --version

# Run in CI mode locally
npm run test:ci

# Check for timing issues
# - Increase timeouts
# - Add proper waits
# - Mock time-dependent operations
```

#### Flaky Tests

**Problem**: Tests sometimes pass, sometimes fail

**Solutions**:
```javascript
// Use proper waits
await page.waitForLoadState('networkidle');
await page.waitForSelector('.element');

// Increase timeouts for slow operations
test('slow operation', async () => {
  // ...
}, 30000); // 30 second timeout

// Use retry logic
await retry(async () => {
  const result = await operation();
  expect(result).toBe(expected);
}, 3);
```

#### Low Coverage

**Problem**: Coverage below 90% threshold

**Solutions**:
```bash
# Find untested code
npm run test:coverage
open coverage/index.html

# Look for:
# - Red lines (untested)
# - Yellow lines (partially tested)
# - Uncovered branches

# Add tests for:
# - Error paths
# - Edge cases
# - Conditional logic
```

#### Memory Leaks

**Problem**: Tests slow down or fail with out-of-memory

**Solutions**:
```javascript
// Clean up after tests
afterEach(async () => {
  await browser?.close();
  jest.clearAllMocks();
});

// Limit concurrent tests
// jest.config.js
export default {
  maxWorkers: 2
};

// Run tests in isolation
npm test -- --maxWorkers=1
```

#### ES Module Issues

**Problem**: Import errors or module not found

**Solutions**:
```javascript
// Use .js extensions
import Module from './Module.js'; // ✅
import Module from './Module';    // ❌

// Use jest.unstable_mockModule for ESM
jest.unstable_mockModule('./Module.js', () => ({
  default: mockModule()
}));

// Ensure package.json has "type": "module"
```

---

## Custom Matchers

### Available Custom Matchers

```javascript
// tests/setup.js defines these matchers:

expect(value).toBeWithinRange(min, max);
expect(url).toBeValidUrl();
expect(presentation).toHaveSlides(count);

// Usage examples:
test('should be in range', () => {
  expect(duration).toBeWithinRange(1000, 5000);
});

test('should be valid URL', () => {
  expect(presentation.url).toBeValidUrl();
});

test('should have correct slide count', () => {
  expect(presentation).toHaveSlides(10);
});
```

---

## Continuous Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
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

      - name: Run tests
        run: npm run test:ci
        env:
          CI: true

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## Test Data

### Using Fixtures

```javascript
import { courseSpecs, lectureSpecs } from '../helpers/fixtures.js';

test('should create beginner course', async () => {
  const result = await creator.createCourse(courseSpecs.beginner);
  expect(result.success).toBe(true);
});
```

### Using Mock Factories

```javascript
import { mockPage, mockBrowser } from '../helpers/mockFactories.js';

test('should navigate page', async () => {
  const page = mockPage();
  await navigator.goToHome(page);
  expect(page.goto).toHaveBeenCalledWith('https://gamma.app');
});
```

---

## Coverage Goals

| Category | Target | Priority |
|----------|--------|----------|
| Overall | >90% | High |
| Core | >95% | Critical |
| Automation | >90% | High |
| Content | >85% | Medium |
| Utils | >95% | Critical |

### Checking Coverage

```bash
# Generate coverage report
npm run test:coverage

# View in browser
open coverage/index.html

# Check specific file
npm test -- --coverage --collectCoverageFrom="src/core/BrowserManager.js"
```

---

## Performance Testing

### Measuring Test Execution Time

```javascript
import { measureTime } from '../helpers/testHelpers.js';

test('should complete within time limit', async () => {
  const { result, duration } = await measureTime(async () => {
    return await slowOperation();
  });

  expect(duration).toBeLessThan(5000); // 5 seconds
  expect(result).toBeDefined();
});
```

### Test Performance Tips

1. **Keep unit tests fast** (<100ms each)
2. **Use mocks** instead of real services
3. **Run expensive tests separately** (E2E category)
4. **Parallelize** independent tests
5. **Cache** setup operations

---

## Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Test Plan](./TEST_PLAN.md)

### Test Files
- [Test Setup](./tests/setup.js)
- [Mock Factories](./tests/helpers/mockFactories.js)
- [Fixtures](./tests/helpers/fixtures.js)
- [Assertions](./tests/helpers/assertions.js)

### Commands Reference
```bash
npm test                    # Run all tests
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests
npm run test:e2e           # End-to-end tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
npm run test:ci            # CI mode
```

---

## Getting Help

### Debug Tests

```bash
# Run specific test with full output
npm test -- --verbose tests/unit/core/BrowserManager.test.js

# Run with Node debugger
node --inspect-brk node_modules/.bin/jest tests/unit/core/BrowserManager.test.js

# Enable debug logging
LOG_LEVEL=debug npm test
```

### Common Commands

```bash
# Clear Jest cache
npm test -- --clearCache

# Update snapshots
npm test -- --updateSnapshot

# Run tests with specific Node options
NODE_OPTIONS='--max-old-space-size=4096' npm test

# Run single test
npm test -- --testNamePattern="should do X"
```

---

**Happy Testing!** 🧪✅

For questions or issues, please check the [TEST_PLAN.md](./TEST_PLAN.md) or create an issue.
