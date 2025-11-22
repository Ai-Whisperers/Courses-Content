# Configuration Files

Comprehensive, production-ready configuration files extracted and enhanced from 50+ analyzed repositories.

## Quick Start

### TypeScript/JavaScript Project

```bash
# Copy all TypeScript configs
cp configs/typescript/tsconfig.json ./
cp configs/eslint/.eslintrc.json ./
cp configs/eslint/.prettierrc ./
cp configs/playwright/playwright.config.ts ./
cp configs/npm/package.json ./

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run tests
npm test
```

### Python Project

```bash
# Copy all Python configs
cp configs/python/pyproject.toml ./
cp configs/pytest/pytest.ini ./
cp configs/pytest/conftest.py ./tests/

# Install dependencies
pip install -r configs/python/requirements-dev.txt

# Install Playwright browsers
playwright install --with-deps

# Run tests
pytest
```

### CI/CD Setup

```bash
# Create GitHub Actions directory
mkdir -p .github/workflows

# Copy workflow files
cp configs/github-actions/playwright.yml .github/workflows/
cp configs/github-actions/jest.yml .github/workflows/
cp configs/github-actions/pytest.yml .github/workflows/
```

---

## Configuration Files

### TypeScript

**[tsconfig.json](typescript/tsconfig.json)**
- ES2022 target with strict mode
- All strict type checking enabled
- Path aliases (@/, @tests/, @pages/, @fixtures/)
- Decorators support for frameworks

### ESLint & Prettier

**[.eslintrc.json](eslint/.eslintrc.json)**
- TypeScript-eslint with strict rules
- Import ordering and organization
- Playwright-specific rules
- Prettier integration

**[.prettierrc](eslint/.prettierrc)**
- Consistent code formatting
- 100 character line width
- Single quotes for JS/TS
- Override rules for JSON, MD, YAML

### Playwright

**[playwright.config.ts](playwright/playwright.config.ts)**
- Multi-environment support (dev, qa, staging, prod)
- All major browsers (Chrome, Firefox, WebKit, Edge)
- Mobile device emulation
- Comprehensive reporting (HTML, JSON, JUnit)
- Video, screenshot, and trace on failure
- Sharding support for CI

### Jest

**[jest.config.js](jest/jest.config.js)**
- TypeScript support with ts-jest
- 80% coverage thresholds
- Path aliases matching tsconfig
- JUnit reporter for CI
- Parallel test execution

### Pytest

**[pytest.ini](pytest/pytest.ini)**
- Comprehensive markers (smoke, sanity, regression, api, ui)
- Coverage configuration
- Logging setup
- Timeout handling

**[conftest.py](pytest/conftest.py)**
- Full Playwright integration
- Multi-environment support
- Authentication fixtures
- API testing fixtures
- Page Object Model fixtures
- Screenshot on failure
- Test data factories

### Python Project Setup

**[pyproject.toml](python/pyproject.toml)**
- Modern Python packaging
- pytest configuration
- Coverage settings
- Black, Ruff, and mypy configuration
- All dev dependencies

**[requirements.txt](python/requirements.txt)** / **[requirements-dev.txt](python/requirements-dev.txt)**
- Core and development dependencies

### npm/Node.js

**[package.json](npm/package.json)**
- Comprehensive test scripts
- Multi-environment support
- Lint-staged configuration
- All common dependencies
- Husky for git hooks

### GitHub Actions

**[playwright.yml](github-actions/playwright.yml)**
- Sharded test execution (4 shards)
- Artifact upload
- Report merging
- Daily scheduled runs

**[jest.yml](github-actions/jest.yml)**
- Multi-Node version matrix
- Coverage upload to Codecov
- Lint and type checking

**[pytest.yml](github-actions/pytest.yml)**
- Multi-Python version matrix
- Separate API test job
- Ruff and mypy checks
- Coverage reporting

---

## Customization

### Environment Variables

Create environment-specific files:

```bash
# environments/dev.env
BASE_URL=http://localhost:3000
API_URL=http://localhost:3000/api

# environments/qa.env
BASE_URL=https://qa.example.com
API_URL=https://qa.example.com/api
```

### Test Markers

Use markers to categorize tests:

```python
# Python
@pytest.mark.smoke
def test_login():
    pass

@pytest.mark.api
def test_api_endpoint():
    pass
```

```typescript
// TypeScript (use tags in test names)
test('login @smoke', async ({ page }) => {
  // ...
});

test('API endpoint @api', async ({ request }) => {
  // ...
});
```

Run specific markers:
```bash
# Python
pytest -m smoke
pytest -m "smoke and not slow"

# Playwright/TypeScript
npx playwright test --grep @smoke
npx playwright test --grep-invert @slow
```

### Browser Selection

```bash
# Playwright
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=mobile-chrome

# Pytest with Playwright
pytest --browser chromium
pytest --browser firefox
```

---

## Best Practices

### Code Quality

1. **Type Safety**: Use strict TypeScript and Python type hints
2. **Linting**: Run linters before committing
3. **Formatting**: Use Prettier/Black for consistent style
4. **Pre-commit Hooks**: Automate quality checks

### Testing

1. **Page Object Model**: Organize selectors and actions
2. **AAA Pattern**: Arrange, Act, Assert
3. **Test Isolation**: Each test should be independent
4. **Data Management**: Use fixtures and factories

### CI/CD

1. **Parallel Execution**: Use sharding for faster runs
2. **Artifact Collection**: Save reports and screenshots
3. **Coverage Tracking**: Monitor test coverage trends
4. **Fail Fast**: Catch issues early in the pipeline

---

## File Structure

```
configs/
├── README.md                    # This file
├── eslint/
│   ├── .eslintrc.json          # ESLint configuration
│   └── .prettierrc             # Prettier configuration
├── github-actions/
│   ├── jest.yml                # Jest CI workflow
│   ├── playwright.yml          # Playwright CI workflow
│   └── pytest.yml              # Pytest CI workflow
├── jest/
│   └── jest.config.js          # Jest configuration
├── npm/
│   └── package.json            # npm package template
├── playwright/
│   └── playwright.config.ts    # Playwright configuration
├── pytest/
│   ├── conftest.py             # Pytest fixtures
│   └── pytest.ini              # Pytest configuration
├── python/
│   ├── pyproject.toml          # Python project config
│   ├── requirements.txt        # Core dependencies
│   └── requirements-dev.txt    # Dev dependencies
└── typescript/
    └── tsconfig.json           # TypeScript configuration
```

---

## Integration with AI Tools

These configs work seamlessly with the AI tool configurations in the parent directory:

- **Claude Code**: Uses configs for consistent code generation
- **Cursor**: References configs in rules
- **GitHub Copilot**: Understands project structure
- **Gemini**: Uses patterns for suggestions

See the [AI Tool Configs README](../README.md) for integration details.
