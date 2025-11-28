# Module 8: Sample Projects
## Reference Implementations

---

## Overview

This document provides example implementations and reference architectures for each capstone project option.

---

## Sample A: Task Management API

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                                │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway                               │
│              (Rate Limiting, CORS)                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    Auth     │  │    Tasks    │  │    Users    │
│  Middleware │  │   Routes    │  │   Routes    │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        ▼
              ┌─────────────────┐
              │    Services     │
              │  (Business      │
              │   Logic)        │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              ▼                 ▼
       ┌───────────┐    ┌───────────┐
       │PostgreSQL │    │   Redis   │
       │ (Data)    │    │ (Cache)   │
       └───────────┘    └───────────┘
```

### Sample Code Structure

```
task-api/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── rateLimit.ts
│   │   └── errorHandler.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── tasks.routes.ts
│   │   ├── users.routes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── task.service.ts
│   │   └── user.service.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── task.model.ts
│   │   └── category.model.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── validators.ts
│   └── app.ts
├── tests/
│   ├── unit/
│   │   ├── auth.test.ts
│   │   └── task.test.ts
│   └── integration/
│       └── api.test.ts
├── docs/
│   ├── api.md
│   └── architecture.md
├── package.json
├── tsconfig.json
└── README.md
```

### Sample API Endpoints

```typescript
// routes/tasks.routes.ts

/**
 * @api {get} /tasks Get all tasks
 * @api {post} /tasks Create task
 * @api {get} /tasks/:id Get task by ID
 * @api {put} /tasks/:id Update task
 * @api {delete} /tasks/:id Delete task
 * @api {post} /tasks/:id/complete Mark complete
 * @api {get} /tasks/search Search tasks
 * @api {get} /tasks/category/:categoryId Get by category
 */

import { Router } from 'express';
import { TaskService } from '../services/task.service';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';

const router = Router();
const taskService = new TaskService();

// All routes require authentication
router.use(authenticate);

// Get all tasks for authenticated user
router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.findByUser(req.user.id, {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
      status: req.query.status as string,
      sortBy: req.query.sortBy as string,
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// Create new task
router.post('/', validate(createTaskSchema), async (req, res, next) => {
  try {
    const task = await taskService.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// Get task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const task = await taskService.findById(req.params.id, req.user.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Update task
router.put('/:id', validate(updateTaskSchema), async (req, res, next) => {
  try {
    const task = await taskService.update(req.params.id, req.user.id, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Delete task
router.delete('/:id', async (req, res, next) => {
  try {
    await taskService.delete(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Search tasks
router.get('/search', async (req, res, next) => {
  try {
    const results = await taskService.search(req.user.id, {
      query: req.query.q as string,
      category: req.query.category as string,
      dueDate: req.query.dueDate as string,
    });
    res.json(results);
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Sample Test File

```typescript
// tests/unit/task.service.test.ts

import { TaskService } from '../../src/services/task.service';
import { prismaMock } from '../mocks/prisma';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService(prismaMock);
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test description',
        userId: 'user-123',
        dueDate: new Date('2024-12-31'),
      };

      prismaMock.task.create.mockResolvedValue({
        id: 'task-123',
        ...taskData,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await taskService.create(taskData);

      expect(result.title).toBe(taskData.title);
      expect(result.status).toBe('PENDING');
      expect(prismaMock.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining(taskData),
      });
    });

    it('should validate required fields', async () => {
      await expect(taskService.create({ userId: 'user-123' }))
        .rejects.toThrow('Title is required');
    });
  });

  describe('findByUser', () => {
    it('should return paginated tasks', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', status: 'PENDING' },
        { id: '2', title: 'Task 2', status: 'COMPLETED' },
      ];

      prismaMock.task.findMany.mockResolvedValue(mockTasks);
      prismaMock.task.count.mockResolvedValue(2);

      const result = await taskService.findByUser('user-123', { page: 1, limit: 10 });

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
    });

    it('should filter by status', async () => {
      await taskService.findByUser('user-123', { status: 'COMPLETED' });

      expect(prismaMock.task.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'COMPLETED',
          }),
        })
      );
    });
  });

  describe('update', () => {
    it('should update task fields', async () => {
      prismaMock.task.findFirst.mockResolvedValue({
        id: 'task-123',
        userId: 'user-123',
        title: 'Original',
      });

      prismaMock.task.update.mockResolvedValue({
        id: 'task-123',
        title: 'Updated',
        status: 'IN_PROGRESS',
      });

      const result = await taskService.update('task-123', 'user-123', {
        title: 'Updated',
        status: 'IN_PROGRESS',
      });

      expect(result.title).toBe('Updated');
    });

    it('should prevent updating other users tasks', async () => {
      prismaMock.task.findFirst.mockResolvedValue(null);

      await expect(
        taskService.update('task-123', 'wrong-user', { title: 'Hack' })
      ).rejects.toThrow('Task not found');
    });
  });
});
```

---

## Sample B: Code Review Bot

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLI Interface                             │
│              (Commander.js)                                  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Core Engine                               │
└─────────────────────────┬───────────────────────────────────┘
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    File     │  │   Rule      │  │   Report    │
│   Parser    │  │   Engine    │  │   Generator │
└─────────────┘  └─────────────┘  └─────────────┘
         │                │                │
         │       ┌────────┴────────┐       │
         │       ▼                 ▼       │
         │ ┌───────────┐   ┌───────────┐   │
         │ │ Built-in  │   │  Custom   │   │
         │ │  Rules    │   │   Rules   │   │
         │ └───────────┘   └───────────┘   │
         │                                 │
         └─────────────┬───────────────────┘
                       ▼
               ┌───────────────┐
               │    Output     │
               │ (Console/JSON │
               │  /Markdown)   │
               └───────────────┘
```

### Sample Code Structure

```
code-review-bot/
├── src/
│   ├── cli/
│   │   ├── index.ts
│   │   └── commands/
│   │       ├── analyze.ts
│   │       ├── config.ts
│   │       └── init.ts
│   ├── core/
│   │   ├── analyzer.ts
│   │   ├── parser.ts
│   │   └── reporter.ts
│   ├── rules/
│   │   ├── index.ts
│   │   ├── security/
│   │   │   ├── no-eval.ts
│   │   │   ├── sql-injection.ts
│   │   │   └── xss.ts
│   │   ├── quality/
│   │   │   ├── complexity.ts
│   │   │   ├── naming.ts
│   │   │   └── comments.ts
│   │   └── style/
│   │       ├── formatting.ts
│   │       └── imports.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── ast.ts
│       └── config.ts
├── tests/
│   ├── rules/
│   │   └── security.test.ts
│   └── analyzer.test.ts
├── examples/
│   └── sample-code/
├── package.json
└── README.md
```

### Sample Rule Implementation

```typescript
// src/rules/security/sql-injection.ts

import { Rule, RuleResult, ASTNode } from '../../types';
import { findNodes, getLineNumber } from '../../utils/ast';

export const sqlInjectionRule: Rule = {
  id: 'security/sql-injection',
  name: 'SQL Injection Prevention',
  description: 'Detects potential SQL injection vulnerabilities',
  severity: 'error',
  category: 'security',

  check(ast: ASTNode, sourceCode: string): RuleResult[] {
    const results: RuleResult[] = [];

    // Find template literals that might contain SQL
    const templateLiterals = findNodes(ast, 'TemplateLiteral');

    for (const node of templateLiterals) {
      const content = sourceCode.slice(node.start, node.end);

      // Check if it looks like SQL
      if (this.looksLikeSQL(content)) {
        // Check if it has interpolations
        if (node.expressions && node.expressions.length > 0) {
          results.push({
            ruleId: this.id,
            message: 'Potential SQL injection: Use parameterized queries instead of string interpolation',
            severity: this.severity,
            line: getLineNumber(sourceCode, node.start),
            column: node.loc?.start?.column || 0,
            suggestion: this.getSuggestion(content),
          });
        }
      }
    }

    // Find string concatenation with SQL keywords
    const binaryExpressions = findNodes(ast, 'BinaryExpression');

    for (const node of binaryExpressions) {
      if (node.operator === '+') {
        const content = sourceCode.slice(node.start, node.end);
        if (this.looksLikeSQL(content)) {
          results.push({
            ruleId: this.id,
            message: 'Potential SQL injection: Avoid string concatenation in SQL queries',
            severity: this.severity,
            line: getLineNumber(sourceCode, node.start),
            column: node.loc?.start?.column || 0,
          });
        }
      }
    }

    return results;
  },

  looksLikeSQL(content: string): boolean {
    const sqlKeywords = [
      'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'FROM', 'WHERE',
      'JOIN', 'DROP', 'CREATE', 'ALTER', 'TRUNCATE'
    ];
    const upperContent = content.toUpperCase();
    return sqlKeywords.some(keyword => upperContent.includes(keyword));
  },

  getSuggestion(original: string): string {
    return `Consider using parameterized queries:

// Instead of:
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// Use:
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);`;
  },
};
```

### Sample CLI Command

```typescript
// src/cli/commands/analyze.ts

import { Command } from 'commander';
import { Analyzer } from '../../core/analyzer';
import { Reporter } from '../../core/reporter';
import { loadConfig } from '../../utils/config';
import chalk from 'chalk';
import ora from 'ora';

export const analyzeCommand = new Command('analyze')
  .description('Analyze code files for issues')
  .argument('<path>', 'Path to file or directory')
  .option('-c, --config <path>', 'Path to config file')
  .option('-f, --format <type>', 'Output format (console|json|markdown)', 'console')
  .option('--fix', 'Automatically fix issues where possible')
  .option('--severity <level>', 'Minimum severity to report (error|warning|info)', 'warning')
  .action(async (path, options) => {
    const spinner = ora('Analyzing code...').start();

    try {
      // Load configuration
      const config = await loadConfig(options.config);

      // Initialize analyzer
      const analyzer = new Analyzer({
        rules: config.rules,
        exclude: config.exclude,
        severity: options.severity,
      });

      // Run analysis
      const results = await analyzer.analyze(path);

      spinner.stop();

      // Generate report
      const reporter = new Reporter(options.format);
      const report = reporter.generate(results);

      // Output results
      if (options.format === 'console') {
        console.log(report);

        // Summary
        const errors = results.filter(r => r.severity === 'error').length;
        const warnings = results.filter(r => r.severity === 'warning').length;

        console.log('\n' + chalk.bold('Summary:'));
        console.log(chalk.red(`  ${errors} errors`));
        console.log(chalk.yellow(`  ${warnings} warnings`));

        if (errors > 0) {
          process.exit(1);
        }
      } else {
        console.log(report);
      }

      // Auto-fix if requested
      if (options.fix) {
        const fixed = await analyzer.fix(results);
        console.log(chalk.green(`\nFixed ${fixed} issues automatically.`));
      }

    } catch (error) {
      spinner.fail('Analysis failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });
```

---

## Sample C: Documentation Generator

### Sample Output

```typescript
// Input: Undocumented function
function calculateCompoundInterest(principal, rate, time, n) {
  return principal * Math.pow((1 + rate / n), n * time);
}

// Output: AI-enhanced documented function
/**
 * Calculates compound interest on a principal amount.
 *
 * Uses the compound interest formula: A = P(1 + r/n)^(nt)
 *
 * @param {number} principal - The initial principal amount (P)
 * @param {number} rate - The annual interest rate as a decimal (r)
 * @param {number} time - The time the money is invested in years (t)
 * @param {number} n - The number of times interest is compounded per year
 * @returns {number} The final amount after compound interest
 *
 * @example
 * // Calculate compound interest on $1000 at 5% for 3 years, compounded monthly
 * const result = calculateCompoundInterest(1000, 0.05, 3, 12);
 * console.log(result); // 1161.62
 *
 * @throws {Error} If principal is negative
 * @throws {Error} If rate is not between 0 and 1
 */
function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  n: number
): number {
  if (principal < 0) {
    throw new Error('Principal cannot be negative');
  }
  if (rate < 0 || rate > 1) {
    throw new Error('Rate must be between 0 and 1');
  }
  return principal * Math.pow((1 + rate / n), n * time);
}
```

---

## Sample D: Legacy Code Refactoring

### Before Refactoring

```javascript
// Legacy code with multiple issues
var users = [];

function addUser(name, email, pass, role) {
  var user = {
    id: Math.random(),
    name: name,
    email: email,
    password: pass,
    role: role || 'user',
    created: new Date()
  };
  users.push(user);
  return user;
}

function findUser(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return users[i];
    }
  }
  return null;
}

function updateUser(id, data) {
  var user = findUser(id);
  if (user) {
    user.name = data.name || user.name;
    user.email = data.email || user.email;
    if (data.password) {
      user.password = data.password;
    }
  }
  return user;
}

function deleteUser(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users.splice(i, 1);
      return true;
    }
  }
  return false;
}

function loginUser(email, password) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      return users[i];
    }
  }
  return null;
}
```

### After Refactoring

```typescript
// Refactored with modern patterns, types, and security

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

type UserRole = 'admin' | 'user' | 'guest';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

// Repository Pattern
interface UserRepository {
  create(dto: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, dto: UpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<User[]>;
}

// In-Memory Implementation (can be swapped for DB)
class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();
  private readonly saltRounds = 12;

  async create(dto: CreateUserDTO): Promise<User> {
    // Validate email uniqueness
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already exists');
    }

    // Validate email format
    if (!this.isValidEmail(dto.email)) {
      throw new Error('Invalid email format');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, this.saltRounds);

    const user: User = {
      id: uuidv4(),
      name: dto.name.trim(),
      email: dto.email.toLowerCase().trim(),
      passwordHash,
      role: dto.role ?? 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(user.id, user);
    return this.sanitizeUser(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    return user ? this.sanitizeUser(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    for (const user of this.users.values()) {
      if (user.email === normalizedEmail) {
        return this.sanitizeUser(user);
      }
    }
    return null;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) {
      return null;
    }

    if (dto.email) {
      const normalizedEmail = dto.email.toLowerCase().trim();
      const existing = await this.findByEmail(normalizedEmail);
      if (existing && existing.id !== id) {
        throw new Error('Email already exists');
      }
      user.email = normalizedEmail;
    }

    if (dto.name) {
      user.name = dto.name.trim();
    }

    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, this.saltRounds);
    }

    user.updatedAt = new Date();
    return this.sanitizeUser(user);
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values()).map(u => this.sanitizeUser(u));
  }

  private sanitizeUser(user: User): User {
    const { passwordHash, ...safeUser } = user;
    return { ...safeUser, passwordHash: '[REDACTED]' } as User;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// Authentication Service (Separation of Concerns)
class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(email: string, password: string): Promise<User | null> {
    // Get user with password hash (internal method needed)
    const user = await (this.userRepo as InMemoryUserRepository)
      ['users'].get(email); // This would be a proper internal method

    if (!user) {
      // Prevent timing attacks
      await bcrypt.compare(password, '$2b$12$invalid');
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    return user;
  }
}

// Usage Example
async function main() {
  const userRepo = new InMemoryUserRepository();
  const authService = new AuthService(userRepo);

  // Create user
  const user = await userRepo.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123!',
    role: 'user',
  });

  console.log('Created user:', user);

  // Update user
  const updated = await userRepo.update(user.id, {
    name: 'John D.',
  });

  console.log('Updated user:', updated);
}

export { UserRepository, InMemoryUserRepository, AuthService, User };
```

---

## Success Metrics

### All Projects Should Achieve:

| Metric | Target |
|--------|--------|
| Test Coverage | 70%+ |
| Security Scan | 0 high/critical |
| Documentation | Complete |
| Code Quality | No linting errors |
| AI Usage Logged | Complete |

---

*Module 8 Sample Projects*
*AI-Assisted Software Development Course*
