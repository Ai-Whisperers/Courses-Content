# Module 04: Hands-On Lab
## Complete Documentation Suite Generation

---

## Lab Overview

**Duration:** 90 minutes (1.5 hours)
**Difficulty:** Intermediate
**Points:** 30% of module grade

---

## Learning Objectives

In this lab, you will:
- Apply all documentation generation techniques in a real-world scenario
- Generate a complete documentation suite for a project
- Create multiple types of documentation (architecture, API, setup, test)
- Use Mermaid diagrams to visualize system architecture
- Review and refine AI-generated documentation
- Package documentation for professional delivery

---

## Scenario

You are a QA Engineer joining a new project team. The project has code but **no documentation**. Your first task is to create comprehensive documentation to help:
- New team members onboard quickly
- Developers understand the system architecture
- QA team know what to test
- DevOps set up environments

You'll use AI to generate the documentation suite efficiently.

---

## The Project: Task Management API

### Overview
A REST API for task management with user authentication, task CRUD operations, and team collaboration features.

### Technology Stack
- **Backend:** Node.js 18, Express.js 4.18
- **Database:** PostgreSQL 14
- **Auth:** JWT tokens
- **Email:** SendGrid
- **Cache:** Redis 6.x (optional)

---

## Lab Setup

### Step 1: Get the Sample Project (15 minutes)

**Option A: Use Provided Code**

Create the following project structure:

```
task-api/
├── src/
│   ├── services/
│   │   ├── userService.js
│   │   ├── taskService.js
│   │   └── emailService.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   └── database/
│       └── db.js
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── package.json
└── README.md (empty - you'll create this)
```

**Key Files Provided:**

`src/services/userService.js` (from exercises)
`src/services/taskService.js`:

```javascript
const { db } = require('../database/db');

class TaskService {
  async createTask(userId, taskData) {
    const { title, description, priority, dueDate } = taskData;

    const task = await db.tasks.create({
      userId,
      title,
      description,
      priority: priority || 'medium',
      status: 'todo',
      dueDate: dueDate ? new Date(dueDate) : null,
      createdAt: new Date()
    });

    return task;
  }

  async getTasks(userId, filters = {}) {
    const query = { userId };

    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;

    const tasks = await db.tasks.find(query).sort({ createdAt: -1 });
    return tasks;
  }

  async updateTask(taskId, userId, updates) {
    const task = await db.tasks.findOne({ id: taskId, userId });

    if (!task) {
      throw new Error('Task not found');
    }

    const allowed = ['title', 'description', 'status', 'priority', 'dueDate'];
    const filtered = {};

    Object.keys(updates).forEach(key => {
      if (allowed.includes(key)) {
        filtered[key] = updates[key];
      }
    });

    await db.tasks.update({ id: taskId }, filtered);

    return { ...task, ...filtered };
  }

  async deleteTask(taskId, userId) {
    const task = await db.tasks.findOne({ id: taskId, userId });

    if (!task) {
      throw new Error('Task not found');
    }

    await db.tasks.delete({ id: taskId });
    return { message: 'Task deleted successfully' };
  }

  async getTaskStats(userId) {
    const tasks = await db.tasks.find({ userId });

    return {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      done: tasks.filter(t => t.status === 'done').length,
      byPriority: {
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
      }
    };
  }
}

module.exports = new TaskService();
```

`src/models/Task.js`:

```javascript
const TaskModel = {
  id: 'uuid (primary key)',
  userId: 'uuid (foreign key to users)',
  title: 'string (required)',
  description: 'text (optional)',
  status: 'enum: todo, in-progress, done (default: todo)',
  priority: 'enum: low, medium, high (default: medium)',
  dueDate: 'datetime (optional)',
  createdAt: 'datetime (required)',
  updatedAt: 'datetime (required)'
};

module.exports = TaskModel;
```

`src/models/User.js`:

```javascript
const UserModel = {
  id: 'uuid (primary key)',
  email: 'string (unique, required)',
  password: 'string (hashed, required)',
  name: 'string (required)',
  verified: 'boolean (default: false)',
  createdAt: 'datetime (required)',
  updatedAt: 'datetime (required)'
};

module.exports = UserModel;
```

**Option B: Use Your Own Project**

If you have a project (personal or work) that needs documentation, you can use it instead. Ensure it has:
- At least 3 services/modules
- At least 2 data models
- API endpoints
- Authentication

---

## Lab Tasks

### Task 1: Generate Architecture Documentation (25 minutes)

**Objective:** Create comprehensive ARCHITECTURE.md

**Steps:**

1. **Analyze the codebase** (5 min)
   - Review all services
   - Identify components
   - Note dependencies
   - Understand data flow

2. **Create architecture documentation prompt** (5 min)

```
Generate comprehensive architecture documentation for this Task Management API.

Project Context:
- Node.js REST API for task management
- User authentication with JWT
- PostgreSQL database
- Email notifications via SendGrid
- Optional Redis caching

Components:
[Paste userService.js]
[Paste taskService.js]
[Paste User and Task models]

Generate ARCHITECTURE.md with:

## 1. System Overview
- Purpose: Task management system with collaboration
- Key features: User auth, task CRUD, filtering, statistics
- Target users: Teams managing projects

## 2. Architecture Diagram
Create Mermaid graph showing:
- Client (Web/Mobile)
- API Gateway / Routes
- Services (User Service, Task Service, Email Service)
- Database (PostgreSQL)
- External services (SendGrid, Redis)
- Data flow between components

## 3. Component Details

### User Service
- Purpose
- Responsibilities (registration, login, verification, password reset)
- Technologies (bcrypt, JWT)
- Dependencies

### Task Service
- Purpose
- Responsibilities (CRUD, filtering, stats)
- Technologies
- Dependencies

### Email Service
- Purpose
- Integration (SendGrid)

### Database
- Technology (PostgreSQL)
- Connection management

## 4. Data Models

### User Entity
Table with all fields, types, constraints

### Task Entity
Table with all fields, types, constraints, foreign keys

Include Mermaid ERD showing relationship:
User (1) --> (*) Task

## 5. Data Flow

Describe flows for:
- User registration and login
- Creating a task
- Updating task status
- Fetching tasks with filters

## 6. Security Architecture
- Password hashing (bcrypt)
- JWT token generation and validation
- Token expiration
- Route protection

## 7. API Structure
- RESTful design
- Endpoint organization
- Authentication requirements

## 8. External Dependencies
- npm packages
- External services
- Required environment variables

Format as professional technical documentation with Mermaid diagrams.
```

3. **Generate documentation with AI** (5 min)
   - Use Claude or your AI tool
   - Provide the prompt and code

4. **Review and enhance** (10 min)
   - Verify Mermaid diagrams in https://mermaid.live/
   - Add specific versions for technologies
   - Enhance component descriptions
   - Add any missing details

**Deliverable:** `ARCHITECTURE.md` with all sections and working diagrams

---

### Task 2: Create API Reference Documentation (25 minutes)

**Objective:** Document all API endpoints

**Steps:**

1. **Identify all endpoints** (5 min)

User endpoints:
- POST /api/users/register
- POST /api/users/login
- POST /api/users/verify-email
- POST /api/users/reset-password-request
- POST /api/users/reset-password

Task endpoints:
- POST /api/tasks
- GET /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/tasks/stats

2. **Create API documentation prompt** (5 min)

```
Generate comprehensive API reference documentation for the Task Management API.

[Paste userService.js and taskService.js]

Document these endpoints:

## User Endpoints

### POST /api/users/register
### POST /api/users/login
### POST /api/users/verify-email
### POST /api/users/reset-password-request
### POST /api/users/reset-password

## Task Endpoints

### POST /api/tasks
### GET /api/tasks
### GET /api/tasks/:id
### PUT /api/tasks/:id
### DELETE /api/tasks/:id
### GET /api/tasks/stats

For each endpoint:

**Description:** What it does

**Authentication:** Required (Bearer token) / Not required

**Request:**
- Method: POST/GET/PUT/DELETE
- Headers: Content-Type, Authorization
- Path Parameters: (if applicable)
- Query Parameters: (if applicable)
- Body Schema:
```json
{
  "field": "type (required/optional) - description"
}
```

**Response:**

Success (200/201):
```json
{
  "example": "response"
}
```

Errors:
- 400: Bad request (missing fields)
- 401: Unauthorized (invalid/missing token)
- 404: Not found
- 409: Conflict (e.g., email exists)
- 500: Server error

**Example:**
```bash
curl -X METHOD http://localhost:3000/endpoint \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"key": "value"}'
```

**Notes:**
- Rate limits
- Pagination (for list endpoints)
- Filtering options

Generate complete, accurate documentation for all endpoints.
```

3. **Generate API documentation** (5 min)

4. **Add realistic examples** (10 min)
   - Create working curl examples
   - Add realistic request/response data
   - Document error scenarios
   - Add notes about filtering, pagination

**Deliverable:** `API-REFERENCE.md` with all 11 endpoints documented

---

### Task 3: Write Setup Guide (20 minutes)

**Objective:** Create step-by-step setup instructions

**Steps:**

1. **Create setup guide prompt** (5 min)

```
Create a comprehensive setup guide for the Task Management API.

Tech stack:
- Node.js 18
- Express.js 4.18
- PostgreSQL 14
- SendGrid (email)
- Redis 6 (optional caching)

Generate SETUP.md with:

## Prerequisites
- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- npm or yarn
- SendGrid account (for email)
- Redis 6.x (optional)

## Quick Start (Docker)
If using Docker Compose

## Development Setup

### 1. Clone Repository
```bash
git clone [repo-url]
cd task-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
```

Explain what to add to .env

### 4. Set Up Database
```bash
createdb task_api_dev
npm run migrate
npm run seed (optional)
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Verify Setup
How to check everything works

## Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| DATABASE_URL | PostgreSQL connection string | postgresql://localhost/task_api | Yes |
| JWT_SECRET | Secret for JWT tokens | your-secret-key | Yes |
| SENDGRID_API_KEY | SendGrid API key | SG.xxx | Yes |
| REDIS_URL | Redis connection string | redis://localhost:6379 | No |
| PORT | Server port | 3000 | No |
| NODE_ENV | Environment | development | No |

## Common Tasks

### Run Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

### Database Management
```bash
npm run migrate
npm run migrate:rollback
npm run seed
```

### Build and Deploy
```bash
npm run build
npm start
```

## Troubleshooting

### Port Already in Use
Problem and solution

### Database Connection Failed
Problem and solution

### Email Not Sending
Problem and solution

### Redis Connection Failed
Problem and solution (if using Redis)

Make all commands copy-paste ready.
```

2. **Generate setup guide** (5 min)

3. **Test the guide** (5 min)
   - Read through as if you're new
   - Check all commands
   - Verify environment variables are complete

4. **Add troubleshooting** (5 min)
   - Add common issues you can think of
   - Provide solutions
   - Include helpful commands

**Deliverable:** `SETUP.md` with complete setup instructions

---

### Task 4: Create Test Documentation (15 minutes)

**Objective:** Document testing strategy and practices

**Steps:**

1. **Create test documentation prompt** (5 min)

```
Generate test documentation for the Task Management API.

Create TEST-DOCUMENTATION.md with:

## Test Strategy
- Testing philosophy (test pyramid)
- Coverage goals
- Test types (unit, integration, e2e)

## Test Structure
```
tests/
├── unit/
│   ├── services/
│   └── utils/
├── integration/
│   └── api/
└── e2e/
    └── scenarios/
```

## Running Tests

All tests:
```bash
npm test
```

By type:
```bash
npm run test:unit
npm run test:integration
npm run test:e2e
```

With coverage:
```bash
npm run test:coverage
```

Watch mode:
```bash
npm run test:watch
```

## Writing Tests

### Unit Test Example
```javascript
describe('TaskService', () => {
  describe('createTask', () => {
    it('should create a task with valid data', async () => {
      // example
    });
  });
});
```

### Integration Test Example
```javascript
describe('POST /api/tasks', () => {
  it('should create task when authenticated', async () => {
    // example
  });
});
```

### Testing Patterns
- AAA pattern (Arrange, Act, Assert)
- Mocking external dependencies
- Test data management
- Cleanup between tests

## Test Coverage Goals
- Overall: 80%
- Services: 90%
- Routes: 85%
- Critical paths: 95%

## CI Integration
- Tests run on every PR
- Coverage reports
- Failure notifications

## Best Practices
Do's and Don'ts for writing tests
```

2. **Generate test documentation** (5 min)

3. **Review and enhance** (5 min)
   - Add specific test examples
   - Ensure commands are correct
   - Add any project-specific patterns

**Deliverable:** `TEST-DOCUMENTATION.md`

---

### Task 5: Quality Review and Polish (10 minutes)

**Objective:** Review all documentation for quality

**Steps:**

1. **Review each document** (5 min)
   - Check accuracy
   - Verify completeness
   - Test Mermaid diagrams
   - Check formatting

2. **Fix issues** (5 min)
   - Correct inaccuracies
   - Fill in missing details
   - Fix diagram syntax
   - Improve clarity

**Use the quality checklist from exercises**

---

### Task 6: Create README.md (10 minutes)

**Objective:** Create main project README

**Steps:**

1. **Create README prompt**

```
Create a professional README.md for the Task Management API.

Include:

# Task Management API

Brief description (2-3 sentences)

## Features
- User authentication
- Task CRUD operations
- Task filtering and search
- Task statistics
- Email notifications

## Tech Stack
- Node.js 18
- Express.js 4.18
- PostgreSQL 14
- JWT authentication
- SendGrid

## Quick Start

```bash
# Quick commands to get started
```

## Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Reference](./API-REFERENCE.md)
- [Setup Guide](./SETUP.md)
- [Test Documentation](./TEST-DOCUMENTATION.md)

## API Endpoints

Quick list of main endpoints

## Environment Variables

Brief list, link to SETUP.md for details

## Testing

How to run tests

## Contributing

Basic contribution guidelines

## License

MIT

## Contact

Support information
```

2. **Generate README** (5 min)

3. **Review and finalize** (5 min)

**Deliverable:** `README.md`

---

## Final Deliverables

### Documentation Suite

Your completed lab should include:

```
task-api-documentation/
├── README.md (main project readme)
├── ARCHITECTURE.md (system architecture)
├── API-REFERENCE.md (all endpoints)
├── SETUP.md (installation guide)
├── TEST-DOCUMENTATION.md (testing guide)
└── lab-reflection.md (your reflection)
```

### Lab Reflection

Create `lab-reflection.md` answering:

1. **Time Breakdown**
   - How long did each task take?
   - Where did you spend most time?
   - Did you finish in 90 minutes?

2. **Challenges**
   - What was most difficult?
   - What issues did you encounter?
   - How did you solve them?

3. **AI Effectiveness**
   - How accurate was AI-generated content?
   - What needed most refinement?
   - What worked really well?

4. **Learning**
   - What did you learn?
   - What would you do differently next time?
   - How will you apply this at work?

5. **Quality Assessment**
   - Rate your documentation (1-5)
   - Is it production-ready?
   - What would you improve with more time?

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| **ARCHITECTURE.md** | 8 | Complete, accurate, with working Mermaid diagrams |
| **API-REFERENCE.md** | 7 | All endpoints documented with examples |
| **SETUP.md** | 5 | Step-by-step guide, copy-paste ready |
| **TEST-DOCUMENTATION.md** | 4 | Test strategy and examples clear |
| **README.md** | 3 | Professional, links to other docs |
| **Quality & Polish** | 5 | Professional formatting, no errors |
| **Mermaid Diagrams** | 4 | At least 2 diagrams, render correctly |
| **Lab Reflection** | 4 | Thoughtful answers, honest assessment |
| **Total** | **40** | |

**Passing Score:** 28/40 (70%)

---

## Success Criteria

✅ All 5 documentation files created
✅ ARCHITECTURE.md has at least 2 working Mermaid diagrams
✅ API-REFERENCE.md documents all 11 endpoints
✅ SETUP.md can be followed successfully
✅ All documentation is accurate
✅ Professional formatting throughout
✅ Lab reflection completed
✅ Completed within 90 minutes (or documented time taken)

---

## Time Management Tips

**If you're running short on time:**

1. **Prioritize:** Architecture > API > Setup > Test > README
2. **Use AI efficiently:** Clear prompts save time
3. **Don't over-polish:** Production-ready doesn't mean perfect
4. **Focus on accuracy:** Better to have less that's correct than more that's wrong

**Time Checkpoints:**
- 15 min: Project setup complete
- 40 min: Architecture docs done
- 65 min: API reference done
- 85 min: Setup guide done
- 95 min: Test docs done
- 105 min: README done
- 115 min: Quality review complete

---

## Bonus Challenges (+10 points)

**If you finish early**, try these:

1. **OpenAPI Specification** (+3 points)
   - Generate openapi.yaml
   - Validate with Swagger Editor
   - Test with Swagger UI

2. **Contributing Guidelines** (+2 points)
   - Create CONTRIBUTING.md
   - Code style guidelines
   - PR process
   - Commit conventions

3. **Deployment Guide** (+3 points)
   - Create DEPLOYMENT.md
   - Production setup
   - Environment configuration
   - Monitoring and logging

4. **Troubleshooting Guide** (+2 points)
   - Create TROUBLESHOOTING.md
   - Common issues (10+)
   - Solutions and debugging steps
   - FAQ section

---

## Resources

### During the Lab

**Mermaid:**
- [Mermaid Live Editor](https://mermaid.live/) - Test diagrams
- [Mermaid Documentation](https://mermaid.js.org/) - Syntax reference

**OpenAPI (Bonus):**
- [Swagger Editor](https://editor.swagger.io/) - Validate specs
- [OpenAPI Spec](https://swagger.io/specification/) - Reference

**Markdown:**
- [Markdown Guide](https://www.markdownguide.org/) - Syntax help

---

## Troubleshooting

### Issue: AI generates incomplete documentation
**Solution:**
- Break prompt into smaller parts
- Generate section by section
- Provide more context
- Use iterative refinement

### Issue: Mermaid diagrams won't render
**Solution:**
- Test in Mermaid Live Editor
- Check for syntax errors
- Simplify complex diagrams
- Verify code block formatting (```mermaid)

### Issue: Running out of time
**Solution:**
- Focus on required deliverables only
- Skip bonus challenges
- Use more AI, less manual writing
- Polish can come after submission

### Issue: Documentation is too generic
**Solution:**
- Include specific code in prompts
- Add project-specific details
- Provide examples from codebase
- Review and personalize AI output

---

## Post-Lab Activities

### After Completing the Lab:

1. **Share with Classmates**
   - Post your documentation suite
   - Review others' work
   - Share effective prompts

2. **Apply to Real Projects**
   - Use these techniques on your projects
   - Build your prompt library
   - Improve your team's documentation

3. **Get Feedback**
   - Ask instructor to review
   - Request peer reviews
   - Identify improvement areas

---

## Submission Instructions

### What to Submit

1. **Documentation Suite Folder**
   - All 5 documentation files
   - Lab reflection

2. **Format**
   - Create folder: `module04-lab-[yourname]`
   - Include all files
   - Compress as ZIP
   - Submit via course portal

3. **Deadline**
   - Check course schedule
   - Late submissions: -10% per day

---

## Lab Checklist

Before submitting, verify:

- [ ] README.md created and complete
- [ ] ARCHITECTURE.md with 2+ Mermaid diagrams
- [ ] API-REFERENCE.md with all 11 endpoints
- [ ] SETUP.md with step-by-step instructions
- [ ] TEST-DOCUMENTATION.md with strategy and examples
- [ ] All Mermaid diagrams render correctly
- [ ] All code examples are accurate
- [ ] Professional formatting throughout
- [ ] Lab reflection completed
- [ ] Files in correct folder structure
- [ ] Compressed as ZIP

---

**Ready to create a professional documentation suite? Let's go!** 🚀

---

*Module 04 Lab - Complete Documentation Suite Generation*
*Duration: 90 minutes | Points: 40 | Passing: 28/40 (70%)*
