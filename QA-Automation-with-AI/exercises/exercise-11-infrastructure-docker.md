# Exercise 11: Infrastructure & Docker for QA

## Objective

Learn to containerize your test environment using Docker to ensure consistency across local and CI environments.

## Duration: 2 hours

---

## Setup

### Prerequisites
- Docker Desktop installed and running
- VS Code with Docker extension

---

## Part 1: Docker Basics (30 min)

### Task

Create a Dockerfile to run your Playwright tests.

### Concept

Tests often fail in CI because the environment (OS, dependencies, browser versions) differs from your local machine. Docker solves this by packaging everything into a container.

### Implementation

Create a `Dockerfile` in your project root:

```dockerfile
# Get the official Playwright image
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Command to run tests
CMD ["npx", "playwright", "test"]
```

### Exercise

1. Build the image:
   ```bash
   docker build -t my-tests .
   ```

2. Run the tests in the container:
   ```bash
   docker run --rm my-tests
   ```

3. Analyze the output. Did it pass? Why might it fail (e.g., localhost access)?

### Deliverable

- Working `Dockerfile`
- Screenshot of successful test run inside Docker

---

## Part 2: Docker Compose (45 min)

### Task

Use Docker Compose to spin up the Application Under Test (AUT) and the Test Runner together.

### Concept

In a real scenario, you need to test against a running application. Docker Compose allows you to define both the app and the tests in one file.

### Implementation

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # The Application Under Test
  web-app:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./app:/app
    command: npm start
    ports:
      - "3000:3000"

  # The Test Runner
  tests:
    build: .
    depends_on:
      - web-app
    environment:
      - BASE_URL=http://web-app:3000
    # Mount report directory to see results locally
    volumes:
      - ./playwright-report:/app/playwright-report
```

### Exercise

1. Create a simple Express app in `./app` folder (or use a previous exercise).
2. Update your Playwright config to use `process.env.BASE_URL`.
3. Run the full suite:
   ```bash
   docker-compose up --exit-code-from tests
   ```

### Deliverable

- `docker-compose.yml`
- Log output showing tests connecting to the web-app service

---

## Part 3: Debugging Containers (30 min)

### Task

Learn to debug when things go wrong inside a container.

### Techniques

1. **Interactive Mode**:
   ```bash
   docker run -it --entrypoint /bin/bash my-tests
   ```
   This drops you into the container shell to explore files and run commands manually.

2. **Volume Mounting**:
   Mount your local code into the container so you don't have to rebuild on every change.
   ```yaml
   tests:
     volumes:
       - .:/app
   ```

3. **Visual Debugging**:
   Running browsers in headful mode inside Docker is hard. Instead, use **Traces**.
   Ensure `playwright.config.ts` has `trace: 'on-first-retry'` or `'on'`.
   View the trace from the mounted report folder.

### Exercise

1. Introduce a bug in your test.
2. Run with Docker Compose.
3. Open the generated Trace Viewer from your local folder to diagnose the failure.

### Deliverable

- Description of how you debugged the failure using Traces from Docker.

---

## Part 4: CI Optimization (15 min)

### Task

Optimize the Dockerfile for CI/CD speed.

### Optimization Steps

1. **Layer Caching**: Ensure `COPY package*.json` and `npm ci` are before `COPY . .`. This prevents re-installing node_modules when only test files change.
2. **Base Image**: Use specific tags (e.g., `v1.40.0-jammy`) instead of `latest` to prevent breaking changes.
3. **.dockerignore**: Add `node_modules`, `playwright-report`, `test-results` to `.dockerignore` to speed up build context.

### Exercise

1. Create `.dockerignore`.
2. Rebuild the image and note the speed.
3. Change a test file and rebuild. Notice how `npm ci` is cached (skipped).

### Deliverable

- Optimized `Dockerfile`
- `.dockerignore` file

---

## Submission

### Files
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `debug-notes.md`

### Grading
| Criterion | Points |
|-----------|--------|
| Dockerfile correctness | 30 |
| Docker Compose setup | 30 |
| Debugging explanation | 20 |
| Optimization | 20 |

---

*Good luck! Containerization is a superpower for QA stability.*
