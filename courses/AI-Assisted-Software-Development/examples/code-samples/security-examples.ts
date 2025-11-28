/**
 * Security Best Practices Examples
 * Module 7: AI-Assisted Software Development Course
 *
 * Demonstrates secure coding patterns for AI-assisted development.
 */

// =============================================================================
// EXAMPLE 1: Input Validation and Sanitization
// =============================================================================

/**
 * Secure input validation for user data.
 * Always validate and sanitize user input before processing.
 */

interface UserInput {
    email: string;
    username: string;
    password: string;
    age?: number;
}

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * Validate user registration input.
 * @param input - Raw user input
 * @returns Validation result with any errors
 */
function validateUserInput(input: UserInput): ValidationResult {
    const errors: string[] = [];

    // Email validation - use established pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!input.email || !emailRegex.test(input.email)) {
        errors.push('Invalid email format');
    }

    // Username validation - alphanumeric, 3-20 chars
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!input.username || !usernameRegex.test(input.username)) {
        errors.push('Username must be 3-20 alphanumeric characters');
    }

    // Password strength validation
    if (!input.password || input.password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(input.password || '')) {
        errors.push('Password must contain uppercase letter');
    }
    if (!/[a-z]/.test(input.password || '')) {
        errors.push('Password must contain lowercase letter');
    }
    if (!/[0-9]/.test(input.password || '')) {
        errors.push('Password must contain a number');
    }

    // Age validation (if provided)
    if (input.age !== undefined && (input.age < 0 || input.age > 150)) {
        errors.push('Age must be between 0 and 150');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Sanitize HTML to prevent XSS attacks.
 * IMPORTANT: In production, use a library like DOMPurify.
 */
function sanitizeHtml(input: string): string {
    const htmlEntities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };

    return input.replace(/[&<>"'/]/g, char => htmlEntities[char] || char);
}

// =============================================================================
// EXAMPLE 2: SQL Injection Prevention
// =============================================================================

/**
 * UNSAFE: Never concatenate user input into SQL queries.
 * This is shown for educational purposes only.
 */
function unsafeQuery(userId: string): string {
    // DON'T DO THIS - SQL Injection vulnerable!
    return `SELECT * FROM users WHERE id = '${userId}'`;
}

/**
 * SAFE: Use parameterized queries.
 * This example shows the pattern - actual implementation depends on your DB library.
 */
interface QueryParams {
    text: string;
    values: (string | number | boolean | null)[];
}

function safeUserQuery(userId: string): QueryParams {
    return {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [userId]
    };
}

function safeSearchQuery(
    searchTerm: string,
    minAge: number,
    maxAge: number
): QueryParams {
    return {
        text: `
            SELECT id, username, email, age
            FROM users
            WHERE username ILIKE $1
            AND age BETWEEN $2 AND $3
            ORDER BY username
            LIMIT 100
        `,
        values: [`%${searchTerm}%`, minAge, maxAge]
    };
}

// =============================================================================
// EXAMPLE 3: Authentication Best Practices
// =============================================================================

import * as crypto from 'crypto';

/**
 * Secure password hashing using PBKDF2.
 * In production, consider using bcrypt or argon2.
 */
async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');
    const iterations = 100000;
    const keyLength = 64;
    const digest = 'sha512';

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
            if (err) reject(err);
            resolve(`${salt}:${iterations}:${derivedKey.toString('hex')}`);
        });
    });
}

/**
 * Verify password against stored hash.
 */
async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const [salt, iterations, hash] = storedHash.split(':');
    const keyLength = 64;
    const digest = 'sha512';

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, parseInt(iterations), keyLength, digest, (err, derivedKey) => {
            if (err) reject(err);
            // Use timing-safe comparison to prevent timing attacks
            resolve(crypto.timingSafeEqual(
                Buffer.from(hash, 'hex'),
                derivedKey
            ));
        });
    });
}

/**
 * Generate secure random token for sessions or password reset.
 */
function generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
}

/**
 * Create JWT-like token structure (simplified example).
 * In production, use a proper JWT library with RS256.
 */
interface TokenPayload {
    userId: string;
    email: string;
    role: string;
    exp: number;
}

function createSecureToken(payload: Omit<TokenPayload, 'exp'>, expiresInSeconds: number): string {
    const fullPayload: TokenPayload = {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + expiresInSeconds
    };

    // In production, sign with private key using RS256
    const data = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
    const signature = crypto
        .createHmac('sha256', process.env.JWT_SECRET || 'change-me-in-production')
        .update(data)
        .digest('base64url');

    return `${data}.${signature}`;
}

// =============================================================================
// EXAMPLE 4: Rate Limiting
// =============================================================================

interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
}

class RateLimiter {
    private requests: Map<string, number[]> = new Map();
    private config: RateLimitConfig;

    constructor(config: RateLimitConfig) {
        this.config = config;
    }

    /**
     * Check if request should be allowed.
     * @param identifier - IP address or user ID
     * @returns true if allowed, false if rate limited
     */
    isAllowed(identifier: string): boolean {
        const now = Date.now();
        const windowStart = now - this.config.windowMs;

        // Get existing requests for this identifier
        let timestamps = this.requests.get(identifier) || [];

        // Filter out old requests
        timestamps = timestamps.filter(ts => ts > windowStart);

        // Check if under limit
        if (timestamps.length >= this.config.maxRequests) {
            return false;
        }

        // Add current request
        timestamps.push(now);
        this.requests.set(identifier, timestamps);

        return true;
    }

    /**
     * Get remaining requests for identifier.
     */
    getRemainingRequests(identifier: string): number {
        const now = Date.now();
        const windowStart = now - this.config.windowMs;
        const timestamps = this.requests.get(identifier) || [];
        const validRequests = timestamps.filter(ts => ts > windowStart);
        return Math.max(0, this.config.maxRequests - validRequests.length);
    }
}

// Usage example
const loginRateLimiter = new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5 // 5 login attempts per window
});

// =============================================================================
// EXAMPLE 5: Secure API Error Handling
// =============================================================================

/**
 * Custom error class that hides internal details.
 */
class SecureApiError extends Error {
    public readonly statusCode: number;
    public readonly publicMessage: string;
    private readonly internalDetails?: string;

    constructor(
        statusCode: number,
        publicMessage: string,
        internalDetails?: string
    ) {
        super(publicMessage);
        this.statusCode = statusCode;
        this.publicMessage = publicMessage;
        this.internalDetails = internalDetails;
    }

    /**
     * Get safe response for client.
     * Never expose internal details to client.
     */
    toPublicResponse(): { error: string; statusCode: number } {
        return {
            error: this.publicMessage,
            statusCode: this.statusCode
        };
    }

    /**
     * Get full details for logging.
     */
    toLogEntry(): object {
        return {
            statusCode: this.statusCode,
            publicMessage: this.publicMessage,
            internalDetails: this.internalDetails,
            stack: this.stack
        };
    }
}

/**
 * Error handler middleware pattern.
 */
function secureErrorHandler(err: Error): { status: number; body: object } {
    // Log full error details internally
    console.error('Error:', err instanceof SecureApiError ? err.toLogEntry() : err);

    if (err instanceof SecureApiError) {
        return {
            status: err.statusCode,
            body: err.toPublicResponse()
        };
    }

    // Generic error - don't expose details
    return {
        status: 500,
        body: {
            error: 'An unexpected error occurred',
            statusCode: 500
        }
    };
}

// =============================================================================
// EXAMPLE 6: Secrets Management
// =============================================================================

/**
 * Configuration loader that validates required secrets.
 */
interface AppConfig {
    databaseUrl: string;
    jwtSecret: string;
    apiKey: string;
    encryptionKey: string;
}

function loadSecureConfig(): AppConfig {
    const required = [
        'DATABASE_URL',
        'JWT_SECRET',
        'API_KEY',
        'ENCRYPTION_KEY'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Validate secret strength
    const jwtSecret = process.env.JWT_SECRET!;
    if (jwtSecret.length < 32) {
        throw new Error('JWT_SECRET must be at least 32 characters');
    }

    return {
        databaseUrl: process.env.DATABASE_URL!,
        jwtSecret: process.env.JWT_SECRET!,
        apiKey: process.env.API_KEY!,
        encryptionKey: process.env.ENCRYPTION_KEY!
    };
}

/**
 * Mask sensitive values for logging.
 */
function maskSecret(value: string): string {
    if (value.length <= 8) {
        return '****';
    }
    return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
}

// =============================================================================
// EXAMPLE 7: CSRF Protection
// =============================================================================

/**
 * Generate CSRF token for form protection.
 */
function generateCsrfToken(): string {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate CSRF token with timing-safe comparison.
 */
function validateCsrfToken(token: string, expectedToken: string): boolean {
    if (!token || !expectedToken) {
        return false;
    }

    // Ensure same length for timing-safe comparison
    if (token.length !== expectedToken.length) {
        return false;
    }

    try {
        return crypto.timingSafeEqual(
            Buffer.from(token),
            Buffer.from(expectedToken)
        );
    } catch {
        return false;
    }
}

// =============================================================================
// EXAMPLE 8: Secure Headers Configuration
// =============================================================================

interface SecurityHeaders {
    [key: string]: string;
}

function getSecurityHeaders(): SecurityHeaders {
    return {
        // Prevent XSS attacks
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'",

        // Prevent clickjacking
        'X-Frame-Options': 'DENY',

        // Prevent MIME type sniffing
        'X-Content-Type-Options': 'nosniff',

        // Enable browser XSS filter
        'X-XSS-Protection': '1; mode=block',

        // Force HTTPS
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

        // Control referrer information
        'Referrer-Policy': 'strict-origin-when-cross-origin',

        // Restrict browser features
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    };
}

// =============================================================================
// Exports
// =============================================================================

export {
    validateUserInput,
    sanitizeHtml,
    safeUserQuery,
    safeSearchQuery,
    hashPassword,
    verifyPassword,
    generateSecureToken,
    createSecureToken,
    RateLimiter,
    SecureApiError,
    secureErrorHandler,
    loadSecureConfig,
    maskSecret,
    generateCsrfToken,
    validateCsrfToken,
    getSecurityHeaders
};
