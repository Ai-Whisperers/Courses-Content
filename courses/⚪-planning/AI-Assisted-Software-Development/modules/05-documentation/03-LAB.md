# Module 5: Lab
## AI for Testing & Debugging - Hands-On Project

---

## Lab Overview

| Attribute | Details |
|-----------|---------|
| **Duration** | 45 minutes |
| **Difficulty** | Intermediate |
| **Prerequisites** | Modules 1-4 completed |
| **Tools** | GitHub Copilot, Claude, Jest, Node.js |

---

## Objective

Build a comprehensive test suite for a user authentication module using AI assistance, then debug intentionally broken code.

---

## Part 1: Setup (5 minutes)

### Create Project Structure

```bash
mkdir auth-testing-lab
cd auth-testing-lab
npm init -y
npm install jest @types/jest typescript ts-jest bcrypt jsonwebtoken
npm install -D @types/bcrypt @types/jsonwebtoken
```

### Configure Jest

Create `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Create Source Files

Create `src/auth.ts`:

```typescript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin?: Date;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  private users: Map<string, User> = new Map();
  private readonly jwtSecret: string;
  private readonly saltRounds: number = 10;
  private readonly tokenExpiry: string = '1h';

  constructor(jwtSecret: string) {
    if (!jwtSecret || jwtSecret.length < 32) {
      throw new Error('JWT secret must be at least 32 characters');
    }
    this.jwtSecret = jwtSecret;
  }

  async register(email: string, password: string, role: 'admin' | 'user' = 'user'): Promise<User> {
    // Validate email
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Check if user exists
    const existingUser = this.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Validate password
    if (!this.isValidPassword(password)) {
      throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, this.saltRounds);

    // Create user
    const user: User = {
      id: this.generateId(),
      email: email.toLowerCase(),
      passwordHash,
      role,
      createdAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'passwordHash'> }> {
    const user = this.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();

    // Generate token
    const token = this.generateToken(user);

    // Return user without password
    const { passwordHash, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidOldPassword = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isValidOldPassword) {
      throw new Error('Current password is incorrect');
    }

    if (!this.isValidPassword(newPassword)) {
      throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
    }

    user.passwordHash = await bcrypt.hash(newPassword, this.saltRounds);
  }

  deleteUser(userId: string): boolean {
    return this.users.delete(userId);
  }

  private findByEmail(email: string): User | undefined {
    const normalizedEmail = email.toLowerCase();
    for (const user of this.users.values()) {
      if (user.email === normalizedEmail) {
        return user;
      }
    }
    return undefined;
  }

  private generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: this.tokenExpiry });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
}
```

---

## Part 2: AI-Generated Test Suite (20 minutes)

### Task 2.1: Generate Unit Tests

Use GitHub Copilot or Claude with this prompt:

```
Generate comprehensive Jest unit tests for the AuthService class in src/auth.ts.

Include tests for:
1. Constructor validation
2. User registration (valid and invalid cases)
3. Login functionality
4. Token verification
5. Password change
6. User deletion

Follow AAA pattern (Arrange, Act, Assert).
Include edge cases and error scenarios.
Target 90%+ code coverage.
```

### Create Test File

Create `src/auth.test.ts` with AI-generated tests. Expected structure:

```typescript
import { AuthService, User } from './auth';

describe('AuthService', () => {
  let authService: AuthService;
  const validSecret = 'this-is-a-very-long-secret-key-for-testing-12345';

  beforeEach(() => {
    authService = new AuthService(validSecret);
  });

  describe('constructor', () => {
    it('should create instance with valid secret', () => {
      // AI generates test
    });

    it('should throw error with short secret', () => {
      // AI generates test
    });

    it('should throw error with empty secret', () => {
      // AI generates test
    });
  });

  describe('register', () => {
    it('should register user with valid data', async () => {
      // AI generates test
    });

    it('should reject invalid email format', async () => {
      // AI generates test
    });

    it('should reject weak password', async () => {
      // AI generates test
    });

    it('should reject duplicate email', async () => {
      // AI generates test
    });

    it('should normalize email to lowercase', async () => {
      // AI generates test
    });

    it('should hash password correctly', async () => {
      // AI generates test
    });
  });

  describe('login', () => {
    // AI generates login tests
  });

  describe('verifyToken', () => {
    // AI generates token tests
  });

  describe('changePassword', () => {
    // AI generates password change tests
  });

  describe('deleteUser', () => {
    // AI generates deletion tests
  });
});
```

### Deliverable 2.1
Complete test file with 20+ test cases.

### Task 2.2: Run Tests and Analyze Coverage

```bash
npm test -- --coverage
```

Document:
- Which tests pass/fail
- Coverage percentages
- Any gaps in test coverage

---

## Part 3: Debug Broken Code (15 minutes)

### The Buggy Code

Create `src/user-service.ts` (contains 5 intentional bugs):

```typescript
// This code has 5 bugs - use AI to find and fix them

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

export class UserService {
  private users: UserProfile[] = [];

  // Bug 1: Array mutation issue
  addUser(user: UserProfile): void {
    this.users.push(user);
  }

  // Bug 2: Incorrect comparison
  findByAge(minAge: number, maxAge: number): UserProfile[] {
    return this.users.filter(u => u.age > minAge && u.age < maxAge);
  }

  // Bug 3: Missing null check
  getUserPreference(userId: string, index: number): string {
    const user = this.users.find(u => u.id === viserId);
    return user.preferences[index];
  }

  // Bug 4: Async issue
  async fetchAndUpdate(userId: string, apiUrl: string): Promise<UserProfile> {
    const user = this.users.find(u => u.id === userId);

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        user.name = data.name;
        user.email = data.email;
      });

    return user;
  }

  // Bug 5: Off-by-one error
  getLastNUsers(n: number): UserProfile[] {
    const startIndex = this.users.length - n - 1;
    return this.users.slice(startIndex);
  }

  // Additional method for testing
  updatePreferences(userId: string, newPrefs: string[]): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.preferences = newPrefs;
    }
  }
}
```

### Task 3.1: Use AI to Find Bugs

Prompt for AI:

```
Analyze this TypeScript code for bugs:

[paste the UserService code]

Find all bugs and explain:
1. What the bug is
2. Why it's a problem
3. How to fix it
```

### Task 3.2: Document Each Bug

Create a bug report table:

| Bug # | Location | Issue | Impact | Fix |
|-------|----------|-------|--------|-----|
| 1 | addUser | | | |
| 2 | findByAge | | | |
| 3 | getUserPreference | | | |
| 4 | fetchAndUpdate | | | |
| 5 | getLastNUsers | | | |

### Task 3.3: Create Fixed Version

Create `src/user-service-fixed.ts` with all bugs corrected.

### Task 3.4: Write Tests for Bug Prevention

Create tests that would catch each bug:

```typescript
describe('UserService - Bug Prevention Tests', () => {
  describe('findByAge', () => {
    it('should include users at boundary ages', () => {
      // Test that catches Bug 2
    });
  });

  describe('getUserPreference', () => {
    it('should handle non-existent user gracefully', () => {
      // Test that catches Bug 3
    });
  });

  // Continue for all bugs...
});
```

---

## Part 4: Advanced Debugging (5 minutes)

### Task 4.1: Complex Async Bug

Debug this code using AI:

```typescript
class OrderProcessor {
  private orders: Order[] = [];
  private inventory: Map<string, number> = new Map();

  async processOrder(order: Order): Promise<OrderResult> {
    // Check inventory
    for (const item of order.items) {
      const available = this.inventory.get(item.productId) || 0;
      if (available < item.quantity) {
        return { success: false, reason: 'Insufficient inventory' };
      }
    }

    // Reserve inventory
    for (const item of order.items) {
      const current = this.inventory.get(item.productId);
      this.inventory.set(item.productId, current - item.quantity);
    }

    // Process payment (simulated)
    const paymentResult = await this.processPayment(order);

    if (!paymentResult.success) {
      // Bug: Inventory not restored on payment failure
      return { success: false, reason: 'Payment failed' };
    }

    this.orders.push(order);
    return { success: true, orderId: order.id };
  }

  // What happens with concurrent orders for same product?
}
```

### AI Debugging Prompt

```
Analyze this order processing code for:
1. Race conditions
2. Inventory management bugs
3. Error handling issues
4. Transaction safety problems

Explain each issue and provide a corrected version.
```

---

## Lab Deliverables

Submit the following:

- [ ] Complete test file (`auth.test.ts`) with 20+ tests
- [ ] Coverage report screenshot (target 90%+)
- [ ] Bug report table for UserService
- [ ] Fixed UserService code
- [ ] Bug prevention tests
- [ ] Advanced debugging analysis

---

## Evaluation Criteria

| Criteria | Points |
|----------|--------|
| Test coverage (90%+) | 25 |
| Test quality (edge cases) | 20 |
| Bug identification accuracy | 20 |
| Bug fixes correctness | 15 |
| Prevention tests | 10 |
| Documentation quality | 10 |
| **Total** | **100** |

---

## Sample Solutions

### Sample Test Cases

```typescript
describe('AuthService', () => {
  const validSecret = 'this-is-a-very-secure-secret-key-12345678';
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(validSecret);
  });

  describe('register', () => {
    const validEmail = 'test@example.com';
    const validPassword = 'SecurePass123';

    it('should register a new user successfully', async () => {
      const user = await authService.register(validEmail, validPassword);

      expect(user).toBeDefined();
      expect(user.email).toBe(validEmail.toLowerCase());
      expect(user.role).toBe('user');
      expect(user.id).toBeDefined();
      expect(user.passwordHash).not.toBe(validPassword);
    });

    it('should reject registration with invalid email', async () => {
      const invalidEmails = ['notanemail', '@nodomain', 'no@', 'spaces in@email.com'];

      for (const email of invalidEmails) {
        await expect(authService.register(email, validPassword))
          .rejects.toThrow('Invalid email format');
      }
    });

    it('should reject weak passwords', async () => {
      const weakPasswords = [
        'short1A',          // Too short
        'nouppercase123',   // No uppercase
        'NOLOWERCASE123',   // No lowercase
        'NoNumbers!',       // No numbers
      ];

      for (const password of weakPasswords) {
        await expect(authService.register(validEmail, password))
          .rejects.toThrow(/Password must be at least 8 characters/);
      }
    });

    it('should prevent duplicate email registration', async () => {
      await authService.register(validEmail, validPassword);

      await expect(authService.register(validEmail, 'AnotherPass123'))
        .rejects.toThrow('User already exists');
    });

    it('should treat emails case-insensitively', async () => {
      await authService.register('Test@Example.COM', validPassword);

      await expect(authService.register('test@example.com', 'AnotherPass123'))
        .rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    const email = 'user@test.com';
    const password = 'ValidPass123';

    beforeEach(async () => {
      await authService.register(email, password);
    });

    it('should login with valid credentials', async () => {
      const result = await authService.login(email, password);

      expect(result.token).toBeDefined();
      expect(result.user.email).toBe(email);
      expect(result.user).not.toHaveProperty('passwordHash');
    });

    it('should reject login with wrong password', async () => {
      await expect(authService.login(email, 'WrongPass123'))
        .rejects.toThrow('Invalid credentials');
    });

    it('should reject login with non-existent email', async () => {
      await expect(authService.login('nonexistent@test.com', password))
        .rejects.toThrow('Invalid credentials');
    });

    it('should update lastLogin on successful login', async () => {
      const result = await authService.login(email, password);
      expect(result.user.lastLogin).toBeDefined();
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', async () => {
      await authService.register('token@test.com', 'TokenPass123');
      const { token } = await authService.login('token@test.com', 'TokenPass123');

      const payload = authService.verifyToken(token);

      expect(payload.email).toBe('token@test.com');
      expect(payload.userId).toBeDefined();
    });

    it('should reject invalid token', () => {
      expect(() => authService.verifyToken('invalid-token'))
        .toThrow('Invalid or expired token');
    });

    it('should reject tampered token', async () => {
      await authService.register('tamper@test.com', 'TamperPass123');
      const { token } = await authService.login('tamper@test.com', 'TamperPass123');

      const tamperedToken = token.slice(0, -5) + 'xxxxx';

      expect(() => authService.verifyToken(tamperedToken))
        .toThrow('Invalid or expired token');
    });
  });
});
```

### Bug Fixes

```typescript
// Fixed UserService

export class UserService {
  private users: UserProfile[] = [];

  // Bug 1 Fix: Create copy to prevent external mutation
  addUser(user: UserProfile): void {
    this.users.push({ ...user, preferences: [...user.preferences] });
  }

  // Bug 2 Fix: Use >= and <= for inclusive range
  findByAge(minAge: number, maxAge: number): UserProfile[] {
    return this.users.filter(u => u.age >= minAge && u.age <= maxAge);
  }

  // Bug 3 Fix: Add null checks and fix typo
  getUserPreference(userId: string, index: number): string | null {
    const user = this.users.find(u => u.id === userId); // Fixed typo: viserId -> userId
    if (!user || !user.preferences || index < 0 || index >= user.preferences.length) {
      return null;
    }
    return user.preferences[index];
  }

  // Bug 4 Fix: Properly await async operation
  async fetchAndUpdate(userId: string, apiUrl: string): Promise<UserProfile | null> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      return null;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    user.name = data.name;
    user.email = data.email;

    return user;
  }

  // Bug 5 Fix: Correct slice calculation
  getLastNUsers(n: number): UserProfile[] {
    if (n <= 0) return [];
    const startIndex = Math.max(0, this.users.length - n);
    return this.users.slice(startIndex);
  }
}
```

---

## Reflection Questions

1. How accurate was AI at generating edge case tests?
2. Did AI miss any important test scenarios?
3. How effective was AI at identifying the bugs?
4. What debugging strategies worked best with AI?
5. How would you improve the AI-generated tests?

---

## Extension Challenges

### Challenge 1: Integration Tests
Create integration tests that test the full authentication flow (register -> login -> verify -> change password).

### Challenge 2: Performance Tests
Add performance tests to ensure authentication operations complete within acceptable time limits.

### Challenge 3: Security Tests
Add security-focused tests for:
- SQL injection attempts in email
- XSS in user data
- Timing attacks on password comparison

---

*Module 5 Lab - AI for Testing & Debugging*
*AI-Assisted Software Development Course*
