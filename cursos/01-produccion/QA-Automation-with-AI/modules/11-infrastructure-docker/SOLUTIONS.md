# Module 11 Solutions: Infrastructure & Docker for QA

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Dockerfile Creation

**Sample Dockerfile:**

```dockerfile
# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test code
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]
```

**Grading Notes:**
- Should use official Playwright image
- Should have proper layer ordering
- Should copy files efficiently
- Should have correct CMD

---

### Part 2: Docker Compose Setup

**Sample docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/testdb
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=testdb
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  tests:
    build: ./tests
    depends_on:
      - app
    environment:
      - BASE_URL=http://app:3000
    volumes:
      - ./test-results:/app/test-results
```

**Grading Notes:**
- Should define all services
- Should set proper dependencies
- Should mount volumes for artifacts
- Should configure environment variables

---

### Part 3: Multi-Stage Build

**Sample Multi-Stage Dockerfile:**

```dockerfile
# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Test stage
FROM mcr.microsoft.com/playwright:v1.56.0-jammy
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/tests ./tests
COPY --from=builder /app/playwright.config.ts .
CMD ["npx", "playwright", "test"]
```

---

## Quiz Answer Key

### Multiple Choice Answers

1. **b** - Docker ensures consistent test environments
2. **c** - Dockerfile defines how to build an image
3. **b** - Docker Compose manages multiple containers
4. **a** - Layer caching speeds up builds
5. **c** - Volume mounts preserve test artifacts

### True/False Answers

6. **True** - Docker isolates test environments
7. **True** - Multi-stage builds reduce image size
8. **False** - Should use official Playwright image
9. **True** - Volumes preserve test results
10. **False** - Should use specific versions

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Dockerfile | 30 | Proper structure, efficient layers |
| Docker Compose | 30 | All services, proper config |
| Multi-Stage Build | 20 | Optimized, reduced size |
| Documentation | 15 | Clear explanation |
| Testing | 5 | Verified working |
| **Total** | **100** | |

**Passing**: 70+ points
