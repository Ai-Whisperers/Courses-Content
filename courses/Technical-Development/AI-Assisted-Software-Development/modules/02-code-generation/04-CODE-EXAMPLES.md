# Module 2: Code Examples
## GitHub Copilot Mastery

---

## Overview

Reference implementations and patterns for effective Copilot usage.

---

## Example 1: Effective Comment Patterns

### Pattern A: Function with Full Context

```javascript
/**
 * Validate and sanitize user registration data
 *
 * @param {Object} data - Raw user input
 * @param {string} data.email - User's email address
 * @param {string} data.password - User's password
 * @param {string} data.name - User's display name
 *
 * @returns {Object} { valid: boolean, data?: sanitized data, errors?: string[] }
 *
 * Validation rules:
 * - Email must be valid format and lowercase
 * - Password must be 8+ chars, 1 uppercase, 1 number
 * - Name must be 2-50 chars, letters and spaces only
 *
 * @example
 * validateUserData({ email: 'Test@Email.COM', password: 'Pass123!', name: 'John Doe' })
 * // { valid: true, data: { email: 'test@email.com', password: 'Pass123!', name: 'John Doe' } }
 */
function validateUserData(data) {
  const errors = [];
  const sanitized = {};

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  } else {
    sanitized.email = data.email.toLowerCase().trim();
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.push('Password must be 8+ characters with 1 uppercase and 1 number');
  } else {
    sanitized.password = data.password;
  }

  // Name validation
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  if (!data.name || !nameRegex.test(data.name)) {
    errors.push('Name must be 2-50 characters, letters and spaces only');
  } else {
    sanitized.name = data.name.trim();
  }

  return errors.length > 0
    ? { valid: false, errors }
    : { valid: true, data: sanitized };
}
```

### Pattern B: Class with Detailed Structure

```javascript
/**
 * Cache manager with TTL support and LRU eviction
 *
 * Features:
 * - Set items with optional TTL (time to live)
 * - Automatic expiration of old items
 * - LRU eviction when max size reached
 * - Statistics tracking (hits, misses, evictions)
 *
 * @example
 * const cache = new CacheManager({ maxSize: 100, defaultTTL: 3600 });
 * cache.set('user:123', userData);
 * cache.get('user:123'); // returns userData
 * cache.getStats(); // { hits: 1, misses: 0, size: 1 }
 */
class CacheManager {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 1000;
    this.defaultTTL = options.defaultTTL || 3600; // seconds
    this.cache = new Map();
    this.stats = { hits: 0, misses: 0, evictions: 0 };
  }

  set(key, value, ttl = this.defaultTTL) {
    // Evict if at max size
    if (this.cache.size >= this.maxSize) {
      this._evictOldest();
    }

    const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, {
      value,
      expiresAt,
      accessedAt: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      this.stats.misses++;
      return null;
    }

    // Check expiration
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    // Update access time for LRU
    item.accessedAt = Date.now();
    this.stats.hits++;
    return item.value;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0
    };
  }

  _evictOldest() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.cache) {
      if (item.accessedAt < oldestTime) {
        oldestTime = item.accessedAt;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
    }
  }
}

module.exports = CacheManager;
```

---

## Example 2: Express.js Patterns

### Complete CRUD Controller

```javascript
// Task Controller with comprehensive error handling
// Follows RESTful conventions
// All methods are async and handle errors properly

const Task = require('../models/Task');
const { ValidationError, NotFoundError } = require('../middleware/error');

class TaskController {
  /**
   * Get all tasks for authenticated user
   * Supports filtering by status, priority, and search
   */
  static async getAll(req, res, next) {
    try {
      const { status, priority, search, page = 1, limit = 10 } = req.query;
      const userId = req.user.id;

      let tasks = await Task.findAll(userId);

      // Apply filters
      if (status) {
        tasks = tasks.filter(t => t.status === status);
      }
      if (priority) {
        tasks = tasks.filter(t => t.priority === priority);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        tasks = tasks.filter(t =>
          t.title.toLowerCase().includes(searchLower) ||
          (t.description && t.description.toLowerCase().includes(searchLower))
        );
      }

      // Pagination
      const total = tasks.length;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      tasks = tasks.slice(startIndex, endIndex);

      res.json({
        success: true,
        data: tasks,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single task by ID
   * Verifies ownership before returning
   */
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const task = await Task.findById(id);

      if (!task) {
        throw new NotFoundError('Task not found');
      }

      if (task.userId !== userId) {
        throw new NotFoundError('Task not found'); // Don't reveal existence
      }

      res.json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new task
   * Validates input and sets defaults
   */
  static async create(req, res, next) {
    try {
      const { title, description, priority, dueDate } = req.body;
      const userId = req.user.id;

      // Validation
      if (!title || title.trim().length === 0) {
        throw new ValidationError('Title is required');
      }
      if (title.length > 200) {
        throw new ValidationError('Title must be 200 characters or less');
      }
      if (description && description.length > 1000) {
        throw new ValidationError('Description must be 1000 characters or less');
      }

      const task = await Task.create({
        title: title.trim(),
        description: description?.trim(),
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        userId
      });

      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing task
   * Only updates provided fields
   */
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const updates = req.body;

      const task = await Task.findById(id);

      if (!task || task.userId !== userId) {
        throw new NotFoundError('Task not found');
      }

      // Validate updates
      if (updates.title !== undefined) {
        if (!updates.title || updates.title.trim().length === 0) {
          throw new ValidationError('Title cannot be empty');
        }
        if (updates.title.length > 200) {
          throw new ValidationError('Title must be 200 characters or less');
        }
      }

      const updatedTask = await Task.update(id, {
        ...updates,
        updatedAt: new Date()
      });

      res.json({ success: true, data: updatedTask });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete task by ID
   */
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const task = await Task.findById(id);

      if (!task || task.userId !== userId) {
        throw new NotFoundError('Task not found');
      }

      await Task.delete(id);

      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update task status only
   * Convenient endpoint for status changes
   */
  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;

      const validStatuses = ['pending', 'in_progress', 'completed'];
      if (!validStatuses.includes(status)) {
        throw new ValidationError(`Status must be one of: ${validStatuses.join(', ')}`);
      }

      const task = await Task.findById(id);

      if (!task || task.userId !== userId) {
        throw new NotFoundError('Task not found');
      }

      const updatedTask = await Task.update(id, {
        status,
        updatedAt: new Date()
      });

      res.json({ success: true, data: updatedTask });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
```

---

## Example 3: Authentication Implementation

### JWT Auth Service

```javascript
// Authentication service with JWT token management
// Handles registration, login, and token operations

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// In-memory user store (replace with database in production)
let users = [];

class AuthService {
  /**
   * Register a new user
   * @param {Object} data - { email, password, name }
   * @returns {Object} - { user, token }
   */
  static async register(data) {
    const { email, password, name } = data;

    // Check if user exists
    const existingUser = users.find(u => u.email === email.toLowerCase());
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: uuidv4(),
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      createdAt: new Date()
    };

    users.push(user);

    // Generate token
    const token = this.generateToken(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  /**
   * Login user
   * @param {Object} data - { email, password }
   * @returns {Object} - { user, token }
   */
  static async login(data) {
    const { email, password } = data;

    // Find user
    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  /**
   * Generate JWT token
   * @param {Object} user - User object
   * @returns {string} - JWT token
   */
  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Object} - Decoded token payload
   */
  static verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }

  /**
   * Get user by ID
   * @param {string} id - User ID
   * @returns {Object|null} - User without password
   */
  static getUserById(id) {
    const user = users.find(u => u.id === id);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = AuthService;
```

---

## Example 4: Middleware Patterns

### Rate Limiter

```javascript
// Rate limiting middleware
// Limits requests per IP address within a time window

/**
 * Create rate limiter middleware
 * @param {Object} options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.maxRequests - Max requests per window
 * @param {string} options.message - Error message when limit exceeded
 */
function createRateLimiter(options = {}) {
  const {
    windowMs = 60000, // 1 minute
    maxRequests = 100,
    message = 'Too many requests, please try again later'
  } = options;

  const requests = new Map();

  // Cleanup old entries periodically
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requests) {
      if (now - data.windowStart > windowMs) {
        requests.delete(ip);
      }
    }
  }, windowMs);

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, windowStart: now });
      return next();
    }

    const data = requests.get(ip);

    // Reset window if expired
    if (now - data.windowStart > windowMs) {
      data.count = 1;
      data.windowStart = now;
      return next();
    }

    // Check limit
    if (data.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((data.windowStart + windowMs - now) / 1000)
      });
    }

    data.count++;
    next();
  };
}

module.exports = createRateLimiter;
```

### Request Logger

```javascript
// Request logging middleware
// Logs all incoming requests with timing

function requestLogger(options = {}) {
  const {
    logBody = false,
    logHeaders = false,
    excludePaths = ['/health', '/favicon.ico']
  } = options;

  return (req, res, next) => {
    // Skip excluded paths
    if (excludePaths.includes(req.path)) {
      return next();
    }

    const startTime = Date.now();
    const requestId = Math.random().toString(36).substring(7);

    // Log request
    const logData = {
      requestId,
      method: req.method,
      path: req.path,
      query: req.query,
      ip: req.ip
    };

    if (logBody && req.body) {
      logData.body = req.body;
    }

    if (logHeaders) {
      logData.headers = req.headers;
    }

    console.log(`[${new Date().toISOString()}] REQUEST`, JSON.stringify(logData));

    // Capture response
    const originalSend = res.send;
    res.send = function(body) {
      const duration = Date.now() - startTime;

      console.log(`[${new Date().toISOString()}] RESPONSE`, JSON.stringify({
        requestId,
        statusCode: res.statusCode,
        duration: `${duration}ms`
      }));

      return originalSend.call(this, body);
    };

    next();
  };
}

module.exports = requestLogger;
```

---

## Example 5: Utility Functions

### Date Utilities

```javascript
// Date utility functions for task management

const DateUtils = {
  /**
   * Check if a date is in the past
   */
  isPast(date) {
    return new Date(date) < new Date();
  },

  /**
   * Check if a date is today
   */
  isToday(date) {
    const today = new Date();
    const checkDate = new Date(date);
    return (
      checkDate.getFullYear() === today.getFullYear() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getDate() === today.getDate()
    );
  },

  /**
   * Get relative time string (e.g., "2 days ago", "in 3 hours")
   */
  getRelativeTime(date) {
    const now = new Date();
    const diff = new Date(date) - now;
    const absDiff = Math.abs(diff);

    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let unit, value;

    if (days > 0) {
      unit = days === 1 ? 'day' : 'days';
      value = days;
    } else if (hours > 0) {
      unit = hours === 1 ? 'hour' : 'hours';
      value = hours;
    } else if (minutes > 0) {
      unit = minutes === 1 ? 'minute' : 'minutes';
      value = minutes;
    } else {
      unit = 'seconds';
      value = seconds;
    }

    return diff < 0 ? `${value} ${unit} ago` : `in ${value} ${unit}`;
  },

  /**
   * Format date as ISO string without time
   */
  toDateString(date) {
    return new Date(date).toISOString().split('T')[0];
  },

  /**
   * Add days to a date
   */
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
};

module.exports = DateUtils;
```

### String Utilities

```javascript
// String utility functions

const StringUtils = {
  /**
   * Truncate string to max length with ellipsis
   */
  truncate(str, maxLength = 100) {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  },

  /**
   * Convert string to slug (URL-friendly)
   */
  slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Capitalize first letter of each word
   */
  titleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Generate random string
   */
  random(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * Mask sensitive data (e.g., email)
   */
  maskEmail(email) {
    const [local, domain] = email.split('@');
    const maskedLocal = local.charAt(0) + '***' + local.charAt(local.length - 1);
    return `${maskedLocal}@${domain}`;
  }
};

module.exports = StringUtils;
```

---

## Example 6: Copilot Prompt Templates

### API Endpoint Template

```javascript
// TEMPLATE: Use this pattern for consistent API endpoints

// [HTTP_METHOD] /[path]
// [Brief description of what this endpoint does]
//
// Request:
// - Headers: [Required headers like Authorization]
// - Params: [URL parameters]
// - Query: [Query string parameters]
// - Body: [Request body structure]
//
// Response:
// - Success (200/201): [Success response structure]
// - Error (4xx/5xx): [Error response structure]
//
// Validation:
// - [List validation rules]
//
// Business Logic:
// - [List business rules]
```

### Database Query Template

```javascript
// TEMPLATE: Use for database query functions

// [Function name]: [Brief description]
//
// Purpose: [What this query accomplishes]
//
// Parameters:
// - [param1]: [type] - [description]
// - [param2]: [type] - [description]
//
// Returns: [Return type and structure]
//
// Query behavior:
// - [Filtering rules]
// - [Sorting rules]
// - [Pagination rules]
//
// Performance notes:
// - [Indexes used]
// - [Expected complexity]
```

---

*Module 2 Code Examples - GitHub Copilot Mastery*
*AI-Assisted Software Development Course*
