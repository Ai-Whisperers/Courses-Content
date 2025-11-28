/**
 * GitHub Copilot Basics - Code Examples
 * Module 2: AI-Assisted Software Development Course
 *
 * These examples demonstrate effective patterns for working with GitHub Copilot.
 */

// =============================================================================
// EXAMPLE 1: Writing Effective Comments for Better Suggestions
// =============================================================================

/**
 * Calculate the factorial of a positive integer.
 * Uses recursion with base case handling.
 * @param {number} n - A positive integer
 * @returns {number} The factorial of n
 * @throws {Error} If n is negative
 */
function factorial(n) {
    if (n < 0) throw new Error('Factorial is not defined for negative numbers');
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Check if a string is a valid palindrome.
 * Ignores case and non-alphanumeric characters.
 * @param {string} str - The string to check
 * @returns {boolean} True if palindrome, false otherwise
 */
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// =============================================================================
// EXAMPLE 2: Multi-line Code Generation
// =============================================================================

/**
 * User management class with CRUD operations.
 * Manages user data with validation and error handling.
 */
class UserManager {
    constructor() {
        this.users = new Map();
    }

    /**
     * Create a new user with validation.
     * @param {Object} userData - The user data
     * @param {string} userData.email - User email (required, must be valid)
     * @param {string} userData.name - User name (required, min 2 chars)
     * @param {number} userData.age - User age (optional, must be positive)
     * @returns {Object} The created user with generated ID
     * @throws {Error} If validation fails
     */
    createUser({ email, name, age }) {
        // Validate email
        if (!email || !this.isValidEmail(email)) {
            throw new Error('Valid email is required');
        }

        // Validate name
        if (!name || name.length < 2) {
            throw new Error('Name must be at least 2 characters');
        }

        // Validate age if provided
        if (age !== undefined && (typeof age !== 'number' || age < 0)) {
            throw new Error('Age must be a positive number');
        }

        // Check for duplicate email
        for (const user of this.users.values()) {
            if (user.email === email) {
                throw new Error('Email already exists');
            }
        }

        const user = {
            id: this.generateId(),
            email,
            name,
            age: age || null,
            createdAt: new Date().toISOString()
        };

        this.users.set(user.id, user);
        return user;
    }

    /**
     * Get user by ID.
     * @param {string} id - The user ID
     * @returns {Object|null} The user or null if not found
     */
    getUser(id) {
        return this.users.get(id) || null;
    }

    /**
     * Update user by ID.
     * @param {string} id - The user ID
     * @param {Object} updates - Fields to update
     * @returns {Object} The updated user
     * @throws {Error} If user not found
     */
    updateUser(id, updates) {
        const user = this.users.get(id);
        if (!user) {
            throw new Error('User not found');
        }

        // Prevent updating ID and createdAt
        const { id: _, createdAt: __, ...allowedUpdates } = updates;

        const updatedUser = {
            ...user,
            ...allowedUpdates,
            updatedAt: new Date().toISOString()
        };

        this.users.set(id, updatedUser);
        return updatedUser;
    }

    /**
     * Delete user by ID.
     * @param {string} id - The user ID
     * @returns {boolean} True if deleted, false if not found
     */
    deleteUser(id) {
        return this.users.delete(id);
    }

    /**
     * List all users with optional filtering.
     * @param {Object} options - Filter options
     * @param {number} options.minAge - Minimum age filter
     * @param {number} options.maxAge - Maximum age filter
     * @returns {Array} Array of matching users
     */
    listUsers({ minAge, maxAge } = {}) {
        let users = Array.from(this.users.values());

        if (minAge !== undefined) {
            users = users.filter(u => u.age >= minAge);
        }
        if (maxAge !== undefined) {
            users = users.filter(u => u.age <= maxAge);
        }

        return users;
    }

    // Helper methods
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    generateId() {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// =============================================================================
// EXAMPLE 3: Working with Different Patterns
// =============================================================================

/**
 * Debounce function that delays execution until after wait milliseconds
 * have elapsed since the last time it was invoked.
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
    let timeoutId = null;

    return function debounced(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Throttle function that ensures func is called at most once per limit milliseconds.
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} The throttled function
 */
function throttle(func, limit) {
    let inThrottle = false;

    return function throttled(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Retry a function with exponential backoff.
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Result of the function
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            const delay = baseDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

// =============================================================================
// EXAMPLE 4: REST API with Express (Copilot-Assisted)
// =============================================================================

/**
 * Express router for user API endpoints.
 * Demonstrates RESTful patterns with proper error handling.
 */
const express = require('express');

function createUserRouter(userManager) {
    const router = express.Router();

    // GET /users - List all users
    router.get('/', (req, res) => {
        try {
            const { minAge, maxAge } = req.query;
            const users = userManager.listUsers({
                minAge: minAge ? parseInt(minAge) : undefined,
                maxAge: maxAge ? parseInt(maxAge) : undefined
            });
            res.json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // GET /users/:id - Get user by ID
    router.get('/:id', (req, res) => {
        try {
            const user = userManager.getUser(req.params.id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            res.json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // POST /users - Create user
    router.post('/', (req, res) => {
        try {
            const user = userManager.createUser(req.body);
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    });

    // PUT /users/:id - Update user
    router.put('/:id', (req, res) => {
        try {
            const user = userManager.updateUser(req.params.id, req.body);
            res.json({ success: true, data: user });
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ success: false, error: error.message });
            }
            res.status(400).json({ success: false, error: error.message });
        }
    });

    // DELETE /users/:id - Delete user
    router.delete('/:id', (req, res) => {
        try {
            const deleted = userManager.deleteUser(req.params.id);
            if (!deleted) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            res.json({ success: true, message: 'User deleted' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    return router;
}

// =============================================================================
// EXAMPLE 5: Data Processing Functions
// =============================================================================

/**
 * Group array items by a key.
 * @param {Array} array - The array to group
 * @param {string|Function} key - The key or function to group by
 * @returns {Object} Grouped object
 */
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        (result[groupKey] = result[groupKey] || []).push(item);
        return result;
    }, {});
}

/**
 * Deep clone an object.
 * @param {*} obj - The object to clone
 * @returns {*} The cloned object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

/**
 * Flatten a nested array to specified depth.
 * @param {Array} array - The array to flatten
 * @param {number} depth - The depth to flatten (default: 1)
 * @returns {Array} Flattened array
 */
function flatten(array, depth = 1) {
    return depth > 0
        ? array.reduce((acc, val) =>
            acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), [])
        : array.slice();
}

// =============================================================================
// Exports
// =============================================================================

module.exports = {
    factorial,
    isPalindrome,
    UserManager,
    debounce,
    throttle,
    retryWithBackoff,
    createUserRouter,
    groupBy,
    deepClone,
    flatten
};
