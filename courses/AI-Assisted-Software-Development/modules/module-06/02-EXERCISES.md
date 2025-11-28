# Module 6: Exercises
## AI for Architecture

---

## Exercise 1: System Design (20 minutes)

### Objective
Design a system architecture with AI.

### Scenario
Design a video streaming platform like YouTube for:
- 1 million daily active users
- Video upload and processing
- Real-time comments
- Recommendation system

### Task
Use Claude to generate:
1. High-level architecture diagram (ASCII)
2. Component descriptions
3. Technology stack
4. Data flow

### Deliverable
Complete architecture document.

---

## Exercise 2: Technology Evaluation (15 minutes)

### Objective
Use AI to compare technologies.

### Scenario
Choose a frontend framework for a new SaaS dashboard:
- Complex data visualizations
- Real-time updates
- Team of 4 developers
- 6-month timeline

### Options
React vs Vue vs Angular vs Svelte

### Prompt
```
Compare React, Vue, Angular, and Svelte for:
- Complex SaaS dashboard
- Charts and data viz
- Real-time data
- 4-person team
- 6-month timeline

Provide comparison table and recommendation.
```

### Deliverable
Comparison table + reasoned recommendation.

---

## Exercise 3: Refactoring Plan (15 minutes)

### Objective
Create AI-assisted refactoring plan.

### Scenario
Legacy e-commerce application:
- 5-year-old codebase
- jQuery frontend
- PHP monolith backend
- MySQL database
- 100K lines of code

### Task
Create migration plan to:
- React frontend
- Node.js microservices
- PostgreSQL

### Prompt
```
Create a 12-month migration plan from:
- jQuery/PHP/MySQL monolith
To:
- React/Node.js/PostgreSQL microservices

Include:
- Phased approach
- Risk mitigation
- Parallel running strategy
- Testing approach
- Team allocation
```

### Deliverable
Phased migration plan document.

---

## Exercise 4: Design Pattern Application (10 minutes)

### Objective
Apply design patterns with AI guidance.

### Code to Improve
```javascript
function processPayment(type, amount, details) {
  if (type === 'credit') {
    // 30 lines of credit card processing
  } else if (type === 'paypal') {
    // 25 lines of PayPal processing
  } else if (type === 'crypto') {
    // 20 lines of crypto processing
  }
}
```

### Task
Ask AI which pattern to apply and implement it.

### Deliverable
Refactored code using Strategy pattern.

---

## Exercise 5: Technical Debt Assessment (15 minutes)

### Objective
Assess and prioritize technical debt.

### Task
Use AI to analyze a codebase description:

```
Our backend has:
- No tests (0% coverage)
- Mixed async/callback patterns
- Hardcoded configuration
- No logging
- 5 known security vulnerabilities
- Deprecated dependencies (Express 3.x)
- No API documentation
- Monolithic 10K line file
```

### Prompt
```
Prioritize technical debt remediation for this codebase.

Consider:
- Business impact
- Security risk
- Development velocity
- Effort required

Create prioritized backlog with effort estimates.
```

### Deliverable
Prioritized debt backlog with rationale.

---

## Submission Checklist

- [ ] Exercise 1: System architecture
- [ ] Exercise 2: Technology comparison
- [ ] Exercise 3: Migration plan
- [ ] Exercise 4: Design pattern
- [ ] Exercise 5: Debt backlog

---

*Module 6 Exercises - AI for Architecture*
