# Module 2: Hands-On Lab
## Build a REST API with GitHub Copilot

---

## Lab Overview

| Attribute | Details |
|-----------|---------|
| **Duration** | 60-90 minutes |
| **Difficulty** | Intermediate |
| **Goal** | Build complete REST API with 70%+ AI-generated code |
| **Outcome** | Working Task Management API |

---

## Project: Task Management API

You'll build a complete REST API for task management using GitHub Copilot as your primary coding assistant. Track how much code is AI-generated vs. manually written.

### Features
- CRUD operations for tasks
- User authentication with JWT
- Input validation
- Error handling
- In-memory data store

---

## Part 1: Project Setup (10 minutes)

### Step 1.1: Create Project Directory

```bash
mkdir task-api-copilot
cd task-api-copilot
npm init -y
```

### Step 1.2: Install Dependencies

Use Copilot Chat:
```
What npm packages do I need for an Express.js REST API with JWT authentication?
```

Expected answer and install:
```bash
npm install express jsonwebtoken bcryptjs uuid
npm install -D nodemon
```

### Step 1.3: Create Folder Structure

```bash
mkdir routes models middleware utils
touch index.js
touch routes/tasks.js routes/auth.js
touch models/Task.js models/User.js
touch middleware/auth.js middleware/error.js
touch utils/response.js
```

### Step 1.4: Configure package.json

Open `package.json` and add scripts:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

---

## Part 2: Server Setup (10 minutes)

### Step 2.1: Create Express Server

Open `index.js` and write this comment:

```javascript
// Express.js server setup
// Features:
// - JSON body parsing
// - CORS enabled
// - Routes for /api/tasks and /api/auth
// - Global error handler
// - Server runs on PORT from env or 3000
// - Log "Server running on port X" on startup

const express = require('express');

// Let Copilot generate the rest...
```

**Wait for Copilot suggestions and accept them.**

### Expected Result (approximately):

```javascript
const express = require('express');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  next();
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Track Your Progress
- [ ] Server file created
- [ ] How much did Copilot generate? ___%

---

## Part 3: Response Utility (5 minutes)

### Step 3.1: Create Response Helper

Open `utils/response.js`:

```javascript
// Response utility functions for consistent API responses
//
// Functions:
// - success(res, data, message, statusCode): Send success response
// - error(res, message, statusCode, errors): Send error response
// - paginated(res, data, page, limit, total): Send paginated response
//
// Response format:
// Success: { success: true, message, data }
// Error: { success: false, message, errors }
// Paginated: { success: true, data, pagination: { page, limit, total, pages } }

// Let Copilot generate...
```

### Verification
Test by reviewing the generated code structure.

---

## Part 4: Task Model (10 minutes)

### Step 4.1: Create Task Model

Open `models/Task.js`:

```javascript
// Task Model for in-memory storage
//
// Properties:
// - id: string (UUID)
// - title: string (required, 1-200 chars)
// - description: string (optional, max 1000 chars)
// - status: enum ['pending', 'in_progress', 'completed'] (default: 'pending')
// - priority: enum ['low', 'medium', 'high'] (default: 'medium')
// - dueDate: Date (optional)
// - userId: string (required, owner of task)
// - createdAt: Date
// - updatedAt: Date
//
// Static methods:
// - findAll(userId): Get all tasks for user
// - findById(id): Get task by id
// - create(data): Create new task
// - update(id, data): Update task
// - delete(id): Delete task
// - findByStatus(userId, status): Filter by status
//
// In-memory store: Array of tasks

const { v4: uuidv4 } = require('uuid');

// In-memory store
let tasks = [];

class Task {
  // Let Copilot generate...
}

module.exports = Task;
```

### Verification
- [ ] All static methods created
- [ ] Validation logic included
- [ ] UUID generation working

---

## Part 5: User Model (10 minutes)

### Step 5.1: Create User Model

Open `models/User.js`:

```javascript
// User Model for authentication
//
// Properties:
// - id: string (UUID)
// - email: string (required, unique, valid email format)
// - password: string (hashed, min 8 chars)
// - name: string (required)
// - createdAt: Date
//
// Static methods:
// - findByEmail(email): Find user by email
// - findById(id): Find user by id
// - create(data): Create new user (hash password with bcrypt)
// - validatePassword(plainPassword, hashedPassword): Compare passwords
//
// In-memory store: Array of users
//
// Security:
// - Never return password in responses
// - Use bcrypt with salt rounds of 10

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

let users = [];

class User {
  // Let Copilot generate...
}

module.exports = User;
```

---

## Part 6: Authentication Middleware (10 minutes)

### Step 6.1: Create Auth Middleware

Open `middleware/auth.js`:

```javascript
// Authentication middleware using JWT
//
// Features:
// - Extract Bearer token from Authorization header
// - Verify JWT token with secret from process.env.JWT_SECRET or 'your-secret-key'
// - Attach decoded user to req.user
// - Return 401 if no token provided
// - Return 401 if token is invalid or expired
//
// Usage: router.get('/protected', authMiddleware, handler)

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authMiddleware = (req, res, next) => {
  // Let Copilot generate...
};

module.exports = authMiddleware;
```

### Step 6.2: Create Error Handler

Open `middleware/error.js`:

```javascript
// Global error handling middleware
//
// Features:
// - Log errors to console with timestamp
// - Determine status code from error or default to 500
// - Return consistent error response
// - Hide stack trace in production
// - Handle specific error types:
//   - ValidationError: 400
//   - UnauthorizedError: 401
//   - NotFoundError: 404
//   - Default: 500

const errorHandler = (err, req, res, next) => {
  // Let Copilot generate...
};

// Custom error classes
class ValidationError extends Error {
  // Let Copilot generate...
}

class UnauthorizedError extends Error {
  // Let Copilot generate...
}

class NotFoundError extends Error {
  // Let Copilot generate...
}

module.exports = errorHandler;
module.exports.ValidationError = ValidationError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.NotFoundError = NotFoundError;
```

---

## Part 7: Auth Routes (10 minutes)

### Step 7.1: Create Auth Routes

Open `routes/auth.js`:

```javascript
// Authentication routes
//
// POST /register
// - Body: { email, password, name }
// - Validate: email format, password min 8 chars, name required
// - Check email not already registered
// - Create user with hashed password
// - Return user data (without password) and JWT token
//
// POST /login
// - Body: { email, password }
// - Find user by email
// - Validate password
// - Return user data (without password) and JWT token
//
// GET /me (protected)
// - Requires valid JWT token
// - Return current user data
//
// Use User model from models/User.js
// Use authMiddleware for protected routes

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST /register
router.post('/register', async (req, res) => {
  // Let Copilot generate...
});

// POST /login
router.post('/login', async (req, res) => {
  // Let Copilot generate...
});

// GET /me
router.get('/me', authMiddleware, (req, res) => {
  // Let Copilot generate...
});

module.exports = router;
```

---

## Part 8: Task Routes (15 minutes)

### Step 8.1: Create Task Routes

Open `routes/tasks.js`:

```javascript
// Task CRUD routes (all protected)
//
// GET /tasks
// - Query params: status, priority, search (title/description)
// - Return all tasks for authenticated user
// - Filter by query params if provided
//
// GET /tasks/:id
// - Return single task by id
// - Verify task belongs to user
// - Return 404 if not found
//
// POST /tasks
// - Body: { title, description?, priority?, dueDate? }
// - Validate title required
// - Create task for authenticated user
// - Return created task
//
// PUT /tasks/:id
// - Body: { title?, description?, status?, priority?, dueDate? }
// - Update task by id
// - Verify task belongs to user
// - Return updated task or 404
//
// DELETE /tasks/:id
// - Delete task by id
// - Verify task belongs to user
// - Return success message or 404
//
// PATCH /tasks/:id/status
// - Body: { status }
// - Update only the status field
// - Return updated task
//
// Use Task model from models/Task.js
// Use authMiddleware for all routes

const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Apply auth to all routes
router.use(authMiddleware);

// GET /tasks
router.get('/', async (req, res) => {
  // Let Copilot generate...
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
  // Let Copilot generate...
});

// POST /tasks
router.post('/', async (req, res) => {
  // Let Copilot generate...
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  // Let Copilot generate...
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  // Let Copilot generate...
});

// PATCH /tasks/:id/status
router.patch('/:id/status', async (req, res) => {
  // Let Copilot generate...
});

module.exports = router;
```

---

## Part 9: Testing the API (10 minutes)

### Step 9.1: Start the Server

```bash
npm run dev
```

### Step 9.2: Test with cURL or Postman

#### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "Test User"}'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

Save the returned token!

#### Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title": "Complete Module 2", "description": "Finish the lab", "priority": "high"}'
```

#### Get All Tasks
```bash
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Update Task Status
```bash
curl -X PATCH http://localhost:3000/api/tasks/TASK_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"status": "completed"}'
```

### Verification Checklist
- [ ] Server starts without errors
- [ ] Registration works
- [ ] Login returns JWT token
- [ ] Protected routes require token
- [ ] CRUD operations work
- [ ] Validation errors return properly

---

## Part 10: Code Review & Metrics (5 minutes)

### Step 10.1: Calculate AI Assistance

Go through each file and estimate AI-generated percentage:

| File | Total Lines | AI-Generated | Manual | AI % |
|------|-------------|--------------|--------|------|
| index.js | | | | |
| utils/response.js | | | | |
| models/Task.js | | | | |
| models/User.js | | | | |
| middleware/auth.js | | | | |
| middleware/error.js | | | | |
| routes/auth.js | | | | |
| routes/tasks.js | | | | |
| **TOTAL** | | | | |

**Target:** 70%+ AI-generated

### Step 10.2: Code Quality Check

Use Copilot Chat to review your code:

```
@workspace Review this project for:
1. Security issues
2. Missing error handling
3. Code quality improvements
```

### Step 10.3: Document Issues Found

List any bugs or issues Copilot introduced:

1. ___________________
2. ___________________
3. ___________________

---

## Bonus Challenges

If you finish early:

### Challenge 1: Add Input Validation Middleware
Create a validation middleware using Copilot.

### Challenge 2: Add Task Statistics Endpoint
```
GET /tasks/stats - Return counts by status and priority
```

### Challenge 3: Add Due Date Filtering
```
GET /tasks?overdue=true - Return overdue tasks
GET /tasks?dueToday=true - Return tasks due today
```

---

## Lab Completion

### Required Deliverables
- [ ] Working Express server
- [ ] User registration and login
- [ ] JWT authentication
- [ ] All task CRUD endpoints
- [ ] Error handling
- [ ] API tested successfully

### Metrics to Submit
- Total lines of code: ___
- AI-generated percentage: ___%
- Time to complete: ___ minutes
- Bugs/issues encountered: ___

---

## Troubleshooting

### Server Won't Start
- Check all imports are correct
- Verify package.json scripts
- Look for syntax errors

### JWT Errors
- Check secret key matches
- Verify token format in header
- Check token expiration

### Route Not Found
- Verify route file is imported in index.js
- Check route path matches
- Verify router.use() middleware order

---

## Next Steps

After completing this lab:

1. **Review generated code** - Understand every line
2. **Identify patterns** - Note what comment styles worked
3. **Practice more** - Repeat with different API
4. **Move to Module 3** - AI for Code Review

---

*Module 2 Lab - REST API with GitHub Copilot*
*AI-Assisted Software Development Course*
