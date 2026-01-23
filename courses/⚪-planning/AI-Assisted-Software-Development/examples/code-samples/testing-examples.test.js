/**
 * AI-Generated Testing Examples
 * Module 5: AI-Assisted Software Development Course
 *
 * Demonstrates patterns for generating comprehensive tests with AI assistance.
 */

const {
    factorial,
    isPalindrome,
    UserManager,
    debounce,
    throttle,
    groupBy,
    deepClone,
    flatten
} = require('./copilot-basics');

// =============================================================================
// EXAMPLE 1: Unit Tests for Pure Functions
// AI Prompt: "Generate comprehensive unit tests for the factorial function
// including edge cases, error handling, and boundary values"
// =============================================================================

describe('factorial', () => {
    // Happy path tests
    describe('valid inputs', () => {
        test('returns 1 for factorial(0)', () => {
            expect(factorial(0)).toBe(1);
        });

        test('returns 1 for factorial(1)', () => {
            expect(factorial(1)).toBe(1);
        });

        test('returns 120 for factorial(5)', () => {
            expect(factorial(5)).toBe(120);
        });

        test('returns 3628800 for factorial(10)', () => {
            expect(factorial(10)).toBe(3628800);
        });
    });

    // Edge cases
    describe('edge cases', () => {
        test('handles large numbers', () => {
            expect(factorial(12)).toBe(479001600);
        });
    });

    // Error cases
    describe('error handling', () => {
        test('throws error for negative numbers', () => {
            expect(() => factorial(-1)).toThrow('Factorial is not defined for negative numbers');
        });

        test('throws error for -5', () => {
            expect(() => factorial(-5)).toThrow();
        });
    });
});

// =============================================================================
// EXAMPLE 2: Testing String Functions with Multiple Scenarios
// AI Prompt: "Create tests for isPalindrome function covering various inputs
// including special characters, mixed case, and unicode"
// =============================================================================

describe('isPalindrome', () => {
    describe('simple palindromes', () => {
        test('returns true for "racecar"', () => {
            expect(isPalindrome('racecar')).toBe(true);
        });

        test('returns true for "level"', () => {
            expect(isPalindrome('level')).toBe(true);
        });

        test('returns true for single character', () => {
            expect(isPalindrome('a')).toBe(true);
        });

        test('returns true for empty string', () => {
            expect(isPalindrome('')).toBe(true);
        });
    });

    describe('non-palindromes', () => {
        test('returns false for "hello"', () => {
            expect(isPalindrome('hello')).toBe(false);
        });

        test('returns false for "world"', () => {
            expect(isPalindrome('world')).toBe(false);
        });
    });

    describe('case insensitivity', () => {
        test('handles mixed case "RaceCar"', () => {
            expect(isPalindrome('RaceCar')).toBe(true);
        });

        test('handles "Madam"', () => {
            expect(isPalindrome('Madam')).toBe(true);
        });
    });

    describe('special characters', () => {
        test('ignores spaces in "A man a plan a canal Panama"', () => {
            expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
        });

        test('ignores punctuation in "Was it a car or a cat I saw?"', () => {
            expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true);
        });

        test('handles numbers in "12321"', () => {
            expect(isPalindrome('12321')).toBe(true);
        });
    });
});

// =============================================================================
// EXAMPLE 3: Testing Classes with Setup and Teardown
// AI Prompt: "Generate tests for UserManager class with proper setup/teardown,
// testing all CRUD operations and validation"
// =============================================================================

describe('UserManager', () => {
    let userManager;

    beforeEach(() => {
        userManager = new UserManager();
    });

    describe('createUser', () => {
        test('creates user with valid data', () => {
            const user = userManager.createUser({
                email: 'test@example.com',
                name: 'John Doe',
                age: 30
            });

            expect(user).toHaveProperty('id');
            expect(user.email).toBe('test@example.com');
            expect(user.name).toBe('John Doe');
            expect(user.age).toBe(30);
            expect(user).toHaveProperty('createdAt');
        });

        test('creates user without optional age', () => {
            const user = userManager.createUser({
                email: 'test@example.com',
                name: 'Jane Doe'
            });

            expect(user.age).toBeNull();
        });

        describe('validation errors', () => {
            test('throws error for missing email', () => {
                expect(() => userManager.createUser({
                    name: 'John Doe'
                })).toThrow('Valid email is required');
            });

            test('throws error for invalid email format', () => {
                expect(() => userManager.createUser({
                    email: 'invalid-email',
                    name: 'John Doe'
                })).toThrow('Valid email is required');
            });

            test('throws error for short name', () => {
                expect(() => userManager.createUser({
                    email: 'test@example.com',
                    name: 'J'
                })).toThrow('Name must be at least 2 characters');
            });

            test('throws error for negative age', () => {
                expect(() => userManager.createUser({
                    email: 'test@example.com',
                    name: 'John Doe',
                    age: -5
                })).toThrow('Age must be a positive number');
            });

            test('throws error for duplicate email', () => {
                userManager.createUser({
                    email: 'test@example.com',
                    name: 'John Doe'
                });

                expect(() => userManager.createUser({
                    email: 'test@example.com',
                    name: 'Jane Doe'
                })).toThrow('Email already exists');
            });
        });
    });

    describe('getUser', () => {
        test('returns user by ID', () => {
            const created = userManager.createUser({
                email: 'test@example.com',
                name: 'John Doe'
            });

            const user = userManager.getUser(created.id);
            expect(user).toEqual(created);
        });

        test('returns null for non-existent ID', () => {
            const user = userManager.getUser('non-existent-id');
            expect(user).toBeNull();
        });
    });

    describe('updateUser', () => {
        let existingUser;

        beforeEach(() => {
            existingUser = userManager.createUser({
                email: 'test@example.com',
                name: 'John Doe',
                age: 30
            });
        });

        test('updates user name', () => {
            const updated = userManager.updateUser(existingUser.id, {
                name: 'Jane Doe'
            });

            expect(updated.name).toBe('Jane Doe');
            expect(updated.email).toBe('test@example.com');
            expect(updated).toHaveProperty('updatedAt');
        });

        test('updates multiple fields', () => {
            const updated = userManager.updateUser(existingUser.id, {
                name: 'Jane Doe',
                age: 25
            });

            expect(updated.name).toBe('Jane Doe');
            expect(updated.age).toBe(25);
        });

        test('prevents updating ID', () => {
            const updated = userManager.updateUser(existingUser.id, {
                id: 'new-id',
                name: 'Jane Doe'
            });

            expect(updated.id).toBe(existingUser.id);
        });

        test('throws error for non-existent user', () => {
            expect(() => userManager.updateUser('non-existent', {
                name: 'Jane Doe'
            })).toThrow('User not found');
        });
    });

    describe('deleteUser', () => {
        test('deletes existing user', () => {
            const user = userManager.createUser({
                email: 'test@example.com',
                name: 'John Doe'
            });

            const result = userManager.deleteUser(user.id);
            expect(result).toBe(true);
            expect(userManager.getUser(user.id)).toBeNull();
        });

        test('returns false for non-existent user', () => {
            const result = userManager.deleteUser('non-existent');
            expect(result).toBe(false);
        });
    });

    describe('listUsers', () => {
        beforeEach(() => {
            userManager.createUser({ email: 'user1@test.com', name: 'User 1', age: 20 });
            userManager.createUser({ email: 'user2@test.com', name: 'User 2', age: 30 });
            userManager.createUser({ email: 'user3@test.com', name: 'User 3', age: 40 });
        });

        test('returns all users without filters', () => {
            const users = userManager.listUsers();
            expect(users).toHaveLength(3);
        });

        test('filters by minimum age', () => {
            const users = userManager.listUsers({ minAge: 25 });
            expect(users).toHaveLength(2);
            expect(users.every(u => u.age >= 25)).toBe(true);
        });

        test('filters by maximum age', () => {
            const users = userManager.listUsers({ maxAge: 35 });
            expect(users).toHaveLength(2);
            expect(users.every(u => u.age <= 35)).toBe(true);
        });

        test('filters by age range', () => {
            const users = userManager.listUsers({ minAge: 25, maxAge: 35 });
            expect(users).toHaveLength(1);
            expect(users[0].age).toBe(30);
        });
    });
});

// =============================================================================
// EXAMPLE 4: Testing Utility Functions
// AI Prompt: "Create tests for groupBy, deepClone, and flatten utility functions"
// =============================================================================

describe('Utility Functions', () => {
    describe('groupBy', () => {
        const items = [
            { name: 'Apple', type: 'fruit' },
            { name: 'Carrot', type: 'vegetable' },
            { name: 'Banana', type: 'fruit' },
            { name: 'Broccoli', type: 'vegetable' }
        ];

        test('groups by string key', () => {
            const grouped = groupBy(items, 'type');
            expect(grouped.fruit).toHaveLength(2);
            expect(grouped.vegetable).toHaveLength(2);
        });

        test('groups by function', () => {
            const numbers = [1, 2, 3, 4, 5, 6];
            const grouped = groupBy(numbers, n => n % 2 === 0 ? 'even' : 'odd');
            expect(grouped.even).toEqual([2, 4, 6]);
            expect(grouped.odd).toEqual([1, 3, 5]);
        });

        test('handles empty array', () => {
            const grouped = groupBy([], 'key');
            expect(grouped).toEqual({});
        });
    });

    describe('deepClone', () => {
        test('clones primitive values', () => {
            expect(deepClone(42)).toBe(42);
            expect(deepClone('hello')).toBe('hello');
            expect(deepClone(null)).toBeNull();
        });

        test('clones arrays', () => {
            const original = [1, 2, [3, 4]];
            const cloned = deepClone(original);
            expect(cloned).toEqual(original);
            expect(cloned).not.toBe(original);
            expect(cloned[2]).not.toBe(original[2]);
        });

        test('clones objects', () => {
            const original = { a: 1, b: { c: 2 } };
            const cloned = deepClone(original);
            expect(cloned).toEqual(original);
            expect(cloned).not.toBe(original);
            expect(cloned.b).not.toBe(original.b);
        });

        test('clones Date objects', () => {
            const original = new Date('2024-01-01');
            const cloned = deepClone(original);
            expect(cloned.getTime()).toBe(original.getTime());
            expect(cloned).not.toBe(original);
        });

        test('maintains independence of cloned object', () => {
            const original = { a: { b: 1 } };
            const cloned = deepClone(original);
            cloned.a.b = 2;
            expect(original.a.b).toBe(1);
        });
    });

    describe('flatten', () => {
        test('flattens one level by default', () => {
            const arr = [1, [2, 3], [4, [5]]];
            expect(flatten(arr)).toEqual([1, 2, 3, 4, [5]]);
        });

        test('flattens to specified depth', () => {
            const arr = [1, [2, [3, [4]]]];
            expect(flatten(arr, 2)).toEqual([1, 2, 3, [4]]);
        });

        test('handles already flat array', () => {
            const arr = [1, 2, 3];
            expect(flatten(arr)).toEqual([1, 2, 3]);
        });

        test('handles empty array', () => {
            expect(flatten([])).toEqual([]);
        });

        test('depth 0 returns shallow copy', () => {
            const arr = [1, [2, 3]];
            const flattened = flatten(arr, 0);
            expect(flattened).toEqual(arr);
            expect(flattened).not.toBe(arr);
        });
    });
});

// =============================================================================
// EXAMPLE 5: Testing Async Functions with Timers
// AI Prompt: "Generate tests for debounce and throttle functions using Jest timers"
// =============================================================================

describe('Timing Functions', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('debounce', () => {
        test('delays function execution', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100);

            debounced();
            expect(fn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(100);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        test('resets delay on subsequent calls', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100);

            debounced();
            jest.advanceTimersByTime(50);
            debounced();
            jest.advanceTimersByTime(50);
            expect(fn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(50);
            expect(fn).toHaveBeenCalledTimes(1);
        });

        test('passes arguments to debounced function', () => {
            const fn = jest.fn();
            const debounced = debounce(fn, 100);

            debounced('arg1', 'arg2');
            jest.advanceTimersByTime(100);

            expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
        });
    });

    describe('throttle', () => {
        test('executes immediately on first call', () => {
            const fn = jest.fn();
            const throttled = throttle(fn, 100);

            throttled();
            expect(fn).toHaveBeenCalledTimes(1);
        });

        test('ignores calls within throttle period', () => {
            const fn = jest.fn();
            const throttled = throttle(fn, 100);

            throttled();
            throttled();
            throttled();
            expect(fn).toHaveBeenCalledTimes(1);
        });

        test('allows calls after throttle period', () => {
            const fn = jest.fn();
            const throttled = throttle(fn, 100);

            throttled();
            jest.advanceTimersByTime(100);
            throttled();
            expect(fn).toHaveBeenCalledTimes(2);
        });
    });
});

// =============================================================================
// EXAMPLE 6: Integration Test Pattern
// AI Prompt: "Create an integration test for the user API endpoints"
// =============================================================================

describe('Integration: User API Flow', () => {
    let userManager;

    beforeEach(() => {
        userManager = new UserManager();
    });

    test('complete user lifecycle', () => {
        // Create
        const created = userManager.createUser({
            email: 'lifecycle@test.com',
            name: 'Lifecycle User',
            age: 25
        });
        expect(created.id).toBeDefined();

        // Read
        const read = userManager.getUser(created.id);
        expect(read).toEqual(created);

        // Update
        const updated = userManager.updateUser(created.id, { age: 26 });
        expect(updated.age).toBe(26);
        expect(updated.updatedAt).toBeDefined();

        // List
        const list = userManager.listUsers();
        expect(list).toContainEqual(expect.objectContaining({ id: created.id }));

        // Delete
        const deleted = userManager.deleteUser(created.id);
        expect(deleted).toBe(true);

        // Verify deletion
        expect(userManager.getUser(created.id)).toBeNull();
    });
});
