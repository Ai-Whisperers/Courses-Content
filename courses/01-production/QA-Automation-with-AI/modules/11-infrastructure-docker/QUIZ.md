# Quiz 11: Infrastructure & Docker for QA

## Instructions

- Answer all questions
- Each question is worth 10 points
- Passing score: 70%

---

## Multiple Choice

### Question 1

What is the PRIMARY benefit of using Docker for test automation?

A) Tests run faster in Docker
B) Docker provides better test assertions
C) Consistent environment across local and CI
D) Docker automatically writes tests

---

### Question 2

In a Dockerfile, what does this command do?

```dockerfile
COPY package*.json ./
```

A) Copies all JavaScript files
B) Copies package.json and package-lock.json
C) Creates a new package.json
D) Installs npm packages

---

### Question 3

Why should `COPY package*.json ./` and `RUN npm ci` come BEFORE `COPY . .` in a Dockerfile?

A) It's required by Docker syntax
B) To enable layer caching for dependencies
C) To make tests run faster
D) To reduce security vulnerabilities

---

### Question 4

What does `docker-compose up --abort-on-container-exit` do?

A) Stops all containers if any container exits
B) Aborts the build process
C) Exits immediately without starting
D) Removes all containers after completion

---

### Question 5

Which service definition ensures the database starts before the application?

A) `links: [db]`
B) `depends_on: [db]`
C) `requires: [db]`
D) `after: [db]`

---

## Short Answer

### Question 6

List THREE advantages of using Docker for QA automation.

**Your Answer:**

1. _______________
2. _______________
3. _______________

---

### Question 7

What is the difference between a Docker IMAGE and a CONTAINER?

**Your Answer:**

_______________________________________________

---

### Question 8

You have a Dockerfile that takes 5 minutes to build every time, even when only test code changes. How would you optimize it?

**Your Answer:**

_______________________________________________

---

## Practical

### Question 9

Write a basic Dockerfile for running Playwright tests. Include:
- Base image (Playwright)
- Working directory
- Installing dependencies
- Copying test code
- Command to run tests

**Your Answer:**

```dockerfile
# Write your Dockerfile here




```

---

### Question 10

Your tests pass locally but fail in Docker with "Browser not found" error. List TWO possible causes and solutions.

**Your Answer:**

Cause 1: _______________
Solution 1: _______________

Cause 2: _______________
Solution 2: _______________

---

## Answer Key

### Question 1
**Answer: C** - Consistent environment across local and CI

Docker's main value for QA is ensuring the same environment (OS, browsers, dependencies) runs everywhere.

---

### Question 2
**Answer: B** - Copies package.json and package-lock.json

The `*` wildcard matches both files, which are needed for npm install.

---

### Question 3
**Answer: B** - To enable layer caching for dependencies

When dependencies don't change, Docker reuses the cached layer, making builds much faster.

---

### Question 4
**Answer: A** - Stops all containers if any container exits

This is useful in CI to ensure the pipeline stops when tests complete (pass or fail).

---

### Question 5
**Answer: B** - `depends_on: [db]`

`depends_on` controls startup order in Docker Compose.

---

### Question 6
**Sample Answers (any 3):**
1. Consistent environment across all machines
2. Isolation from host system
3. Easy to reproduce issues
4. Portable across different systems
5. Simplified CI/CD setup
6. Version control for environment configuration

---

### Question 7
**Sample Answer:**
- IMAGE: A template/blueprint containing the OS, dependencies, and code. It's read-only and stored.
- CONTAINER: A running instance of an image. It's isolated and can be started/stopped.

---

### Question 8
**Sample Answer:**
Order the Dockerfile so frequently-changing files are copied last. Copy package*.json and run npm install first (these rarely change), then copy test code (changes often). This uses Docker layer caching effectively.

---

### Question 9
**Sample Answer:**
```dockerfile
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
```

---

### Question 10
**Sample Answers:**

Cause 1: Using Node.js base image instead of Playwright image
Solution 1: Use `mcr.microsoft.com/playwright:v1.56.0-jammy` as base

Cause 2: Browsers not installed in custom image
Solution 2: Run `npx playwright install --with-deps` in Dockerfile

---

## Scoring

| Score | Grade |
|-------|-------|
| 90-100 | A - Excellent |
| 80-89 | B - Good |
| 70-79 | C - Passing |
| Below 70 | Needs Review |
