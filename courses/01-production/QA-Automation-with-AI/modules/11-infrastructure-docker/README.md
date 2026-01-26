# Module 11: Infrastructure & Docker for QA

## Duration: 3 hours

## Learning Objectives

By the end of this module, you will be able to:
- Containerize test environments using Docker
- Create consistent test execution across local and CI environments
- Configure Docker Compose for multi-service testing
- Optimize Docker images for faster test execution
- Integrate containerized tests with CI/CD pipelines

---

## 11.1 Why Docker for QA?

### The Environment Problem

Tests often fail in CI but pass locally because of:
- Different OS versions
- Different browser versions
- Missing dependencies
- Configuration differences

### Docker Solution

Docker packages your test environment into a container:

```
┌─────────────────────────────────────┐
│         Docker Container            │
├─────────────────────────────────────┤
│  - Operating System (Linux)         │
│  - Node.js (specific version)       │
│  - Browsers (Chromium, Firefox)     │
│  - Dependencies (package.json)      │
│  - Your Test Code                   │
└─────────────────────────────────────┘
```

### Benefits

| Benefit | Description |
|---------|-------------|
| Consistency | Same environment everywhere |
| Isolation | Tests don't affect host system |
| Reproducibility | Anyone can run the same setup |
| Portability | Works on any system with Docker |

---

## 11.2 Docker Basics for QA

### Key Concepts

- **Image**: A template containing OS, dependencies, and your code
- **Container**: A running instance of an image
- **Dockerfile**: Instructions to build an image
- **Docker Compose**: Tool to run multiple containers together

### Basic Dockerfile for Playwright

```dockerfile
# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test code
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]
```

### Essential Commands

```bash
# Build image
docker build -t my-tests .

# Run container
docker run my-tests

# Run with specific test file
docker run my-tests npx playwright test login.spec.ts

# Run interactively
docker run -it my-tests /bin/bash
```

---

## 11.3 Docker Compose for Multi-Service Testing

### When You Need Multiple Services

Testing often requires:
- Your application (frontend)
- Backend API
- Database
- Mock services

### docker-compose.yml Example

```yaml
version: '3.8'

services:
  # Application under test
  app:
    build: ./app
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/testdb
    depends_on:
      - db

  # Database
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=testdb
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  # Test runner
  tests:
    build: ./tests
    depends_on:
      - app
    environment:
      - BASE_URL=http://app:3000
    volumes:
      - ./test-results:/app/test-results
```

### Running Tests

```bash
# Start all services and run tests
docker-compose up --abort-on-container-exit

# Run only tests (if services are already up)
docker-compose run tests

# View logs
docker-compose logs -f

# Clean up
docker-compose down -v
```

---

## 11.4 Optimizing Docker for Tests

### Layer Caching

Order Dockerfile instructions from least to most frequently changed:

```dockerfile
# Rarely changes - cached
FROM mcr.microsoft.com/playwright:v1.56.0-jammy
WORKDIR /app

# Changes when dependencies update - semi-cached
COPY package*.json ./
RUN npm ci

# Changes frequently - not cached
COPY . .
```

### Multi-Stage Builds

Reduce final image size:

```dockerfile
# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Test stage - only what's needed
FROM mcr.microsoft.com/playwright:v1.56.0-jammy
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/tests ./tests
COPY --from=builder /app/playwright.config.ts .
CMD ["npx", "playwright", "test"]
```

### Parallel Test Execution

```yaml
# docker-compose.yml with multiple test runners
services:
  tests-chrome:
    build: ./tests
    command: npx playwright test --project=chromium

  tests-firefox:
    build: ./tests
    command: npx playwright test --project=firefox

  tests-webkit:
    build: ./tests
    command: npx playwright test --project=webkit
```

---

## 11.5 CI/CD Integration

### GitHub Actions with Docker

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Build and run tests
        run: docker-compose up --abort-on-container-exit

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: test-results/
```

### Handling Test Artifacts

```yaml
# docker-compose.yml
services:
  tests:
    build: ./tests
    volumes:
      - ./test-results:/app/test-results
      - ./playwright-report:/app/playwright-report
```

---

## 11.6 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout, check network connectivity |
| Browser not found | Use Playwright's official Docker image |
| Permission denied | Check volume mount permissions |
| Out of memory | Limit parallel workers, increase Docker memory |

### Debugging in Docker

```bash
# Run container interactively
docker run -it my-tests /bin/bash

# Check browser installation
npx playwright install --dry-run

# Run single test with debug
DEBUG=pw:api npx playwright test login.spec.ts
```

---

## Key Takeaways

1. **Docker ensures consistency** across all environments
2. **Dockerfile caching** speeds up builds significantly
3. **Docker Compose** manages multi-service test environments
4. **Volume mounts** preserve test artifacts
5. **Official Playwright images** include all browser dependencies

---

## Next Steps

- Complete the [Exercise](EXERCISE.md) to containerize your tests
- Take the [Quiz](QUIZ.md) to verify your understanding
- Continue to [Module 12: Advanced Playwright](../12-advanced-playwright/)

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes
