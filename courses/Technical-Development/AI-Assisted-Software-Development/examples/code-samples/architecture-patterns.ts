/**
 * Architecture Patterns Examples
 * Module 6: AI-Assisted Software Development Course
 *
 * Demonstrates common architectural patterns for enterprise applications.
 */

// =============================================================================
// EXAMPLE 1: Repository Pattern
// =============================================================================

/**
 * Generic repository interface for data access abstraction.
 */
interface Entity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Repository<T extends Entity> {
    findById(id: string): Promise<T | null>;
    findAll(options?: QueryOptions): Promise<T[]>;
    create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
    update(id: string, entity: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
}

interface QueryOptions {
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    filters?: Record<string, unknown>;
}

/**
 * User entity definition.
 */
interface User extends Entity {
    email: string;
    name: string;
    role: 'admin' | 'user' | 'guest';
    active: boolean;
}

/**
 * In-memory user repository implementation.
 * In production, this would connect to a database.
 */
class UserRepository implements Repository<User> {
    private users: Map<string, User> = new Map();

    async findById(id: string): Promise<User | null> {
        return this.users.get(id) || null;
    }

    async findAll(options: QueryOptions = {}): Promise<User[]> {
        let users = Array.from(this.users.values());

        // Apply filters
        if (options.filters) {
            users = users.filter(user => {
                return Object.entries(options.filters!).every(([key, value]) => {
                    return (user as any)[key] === value;
                });
            });
        }

        // Apply sorting
        if (options.orderBy) {
            const direction = options.orderDirection === 'desc' ? -1 : 1;
            users.sort((a, b) => {
                const aVal = (a as any)[options.orderBy!];
                const bVal = (b as any)[options.orderBy!];
                return aVal < bVal ? -direction : direction;
            });
        }

        // Apply pagination
        const start = options.offset || 0;
        const end = options.limit ? start + options.limit : undefined;
        return users.slice(start, end);
    }

    async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const user: User = {
            ...userData,
            id: this.generateId(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.set(user.id, user);
        return user;
    }

    async update(id: string, updates: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new Error(`User ${id} not found`);
        }

        const updated: User = {
            ...user,
            ...updates,
            id: user.id, // Prevent ID change
            createdAt: user.createdAt, // Preserve creation date
            updatedAt: new Date()
        };

        this.users.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        return this.users.delete(id);
    }

    // Custom query methods specific to users
    async findByEmail(email: string): Promise<User | null> {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }

    async findActiveUsers(): Promise<User[]> {
        return this.findAll({ filters: { active: true } });
    }

    private generateId(): string {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// =============================================================================
// EXAMPLE 2: Service Layer Pattern
// =============================================================================

/**
 * User service encapsulating business logic.
 */
interface CreateUserDTO {
    email: string;
    name: string;
    password: string;
}

interface UpdateUserDTO {
    email?: string;
    name?: string;
    role?: 'admin' | 'user' | 'guest';
}

class UserService {
    constructor(
        private userRepository: Repository<User>,
        private emailService: EmailService,
        private auditLogger: AuditLogger
    ) {}

    async createUser(dto: CreateUserDTO): Promise<User> {
        // Validate email uniqueness
        const existingUser = await (this.userRepository as UserRepository).findByEmail(dto.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Create user with default role
        const user = await this.userRepository.create({
            email: dto.email,
            name: dto.name,
            role: 'user',
            active: true
        });

        // Send welcome email
        await this.emailService.sendWelcomeEmail(user.email, user.name);

        // Log audit trail
        await this.auditLogger.log('USER_CREATED', { userId: user.id });

        return user;
    }

    async updateUser(id: string, dto: UpdateUserDTO): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        const updated = await this.userRepository.update(id, dto);

        await this.auditLogger.log('USER_UPDATED', {
            userId: id,
            changes: dto
        });

        return updated;
    }

    async deactivateUser(id: string): Promise<User> {
        const user = await this.userRepository.update(id, { active: false });

        await this.emailService.sendDeactivationNotice(user.email);
        await this.auditLogger.log('USER_DEACTIVATED', { userId: id });

        return user;
    }

    async getUserWithPagination(page: number, pageSize: number): Promise<{
        users: User[];
        total: number;
        page: number;
        pageSize: number;
    }> {
        const users = await this.userRepository.findAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
            orderBy: 'createdAt',
            orderDirection: 'desc'
        });

        const allUsers = await this.userRepository.findAll();

        return {
            users,
            total: allUsers.length,
            page,
            pageSize
        };
    }
}

// =============================================================================
// EXAMPLE 3: Event-Driven Architecture
// =============================================================================

/**
 * Domain event interface.
 */
interface DomainEvent {
    type: string;
    timestamp: Date;
    payload: unknown;
}

/**
 * Event handler type.
 */
type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<void>;

/**
 * Event bus for publish/subscribe pattern.
 */
class EventBus {
    private handlers: Map<string, EventHandler[]> = new Map();

    subscribe<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
        const existing = this.handlers.get(eventType) || [];
        existing.push(handler as EventHandler);
        this.handlers.set(eventType, existing);
    }

    async publish(event: DomainEvent): Promise<void> {
        const handlers = this.handlers.get(event.type) || [];

        // Execute all handlers in parallel
        await Promise.all(
            handlers.map(handler => handler(event).catch(err => {
                console.error(`Handler error for ${event.type}:`, err);
            }))
        );
    }

    unsubscribe(eventType: string, handler: EventHandler): void {
        const existing = this.handlers.get(eventType) || [];
        const index = existing.indexOf(handler);
        if (index > -1) {
            existing.splice(index, 1);
        }
    }
}

// Domain events
interface UserCreatedEvent extends DomainEvent {
    type: 'USER_CREATED';
    payload: {
        userId: string;
        email: string;
        name: string;
    };
}

interface OrderPlacedEvent extends DomainEvent {
    type: 'ORDER_PLACED';
    payload: {
        orderId: string;
        userId: string;
        total: number;
    };
}

// Event handlers
class NotificationHandler {
    constructor(private eventBus: EventBus) {
        this.registerHandlers();
    }

    private registerHandlers(): void {
        this.eventBus.subscribe<UserCreatedEvent>('USER_CREATED', async (event) => {
            console.log(`Sending welcome notification to ${event.payload.email}`);
        });

        this.eventBus.subscribe<OrderPlacedEvent>('ORDER_PLACED', async (event) => {
            console.log(`Sending order confirmation for order ${event.payload.orderId}`);
        });
    }
}

// =============================================================================
// EXAMPLE 4: Strategy Pattern for Payment Processing
// =============================================================================

/**
 * Payment strategy interface.
 */
interface PaymentStrategy {
    name: string;
    processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult>;
    validateDetails(details: PaymentDetails): boolean;
}

interface PaymentDetails {
    type: 'credit_card' | 'paypal' | 'bank_transfer';
    [key: string]: unknown;
}

interface PaymentResult {
    success: boolean;
    transactionId?: string;
    error?: string;
}

/**
 * Credit card payment strategy.
 */
class CreditCardStrategy implements PaymentStrategy {
    name = 'Credit Card';

    validateDetails(details: PaymentDetails): boolean {
        return !!(
            details.cardNumber &&
            details.expiryMonth &&
            details.expiryYear &&
            details.cvv
        );
    }

    async processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult> {
        // Simulate payment processing
        console.log(`Processing credit card payment of $${amount}`);

        return {
            success: true,
            transactionId: `CC_${Date.now()}`
        };
    }
}

/**
 * PayPal payment strategy.
 */
class PayPalStrategy implements PaymentStrategy {
    name = 'PayPal';

    validateDetails(details: PaymentDetails): boolean {
        return !!details.paypalEmail;
    }

    async processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult> {
        console.log(`Processing PayPal payment of $${amount} for ${details.paypalEmail}`);

        return {
            success: true,
            transactionId: `PP_${Date.now()}`
        };
    }
}

/**
 * Payment processor using strategy pattern.
 */
class PaymentProcessor {
    private strategies: Map<string, PaymentStrategy> = new Map();

    registerStrategy(type: string, strategy: PaymentStrategy): void {
        this.strategies.set(type, strategy);
    }

    async processPayment(
        type: string,
        amount: number,
        details: PaymentDetails
    ): Promise<PaymentResult> {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            return { success: false, error: `Unknown payment type: ${type}` };
        }

        if (!strategy.validateDetails(details)) {
            return { success: false, error: 'Invalid payment details' };
        }

        return strategy.processPayment(amount, details);
    }
}

// =============================================================================
// EXAMPLE 5: Circuit Breaker Pattern
// =============================================================================

enum CircuitState {
    CLOSED = 'CLOSED',
    OPEN = 'OPEN',
    HALF_OPEN = 'HALF_OPEN'
}

interface CircuitBreakerOptions {
    failureThreshold: number;
    resetTimeout: number;
    halfOpenRequests: number;
}

class CircuitBreaker {
    private state: CircuitState = CircuitState.CLOSED;
    private failureCount: number = 0;
    private successCount: number = 0;
    private lastFailureTime: number = 0;
    private halfOpenRequests: number = 0;

    constructor(
        private name: string,
        private options: CircuitBreakerOptions
    ) {}

    async execute<T>(fn: () => Promise<T>): Promise<T> {
        if (this.state === CircuitState.OPEN) {
            if (Date.now() - this.lastFailureTime >= this.options.resetTimeout) {
                this.state = CircuitState.HALF_OPEN;
                this.halfOpenRequests = 0;
            } else {
                throw new Error(`Circuit breaker ${this.name} is OPEN`);
            }
        }

        if (this.state === CircuitState.HALF_OPEN) {
            if (this.halfOpenRequests >= this.options.halfOpenRequests) {
                throw new Error(`Circuit breaker ${this.name} is HALF_OPEN (limit reached)`);
            }
            this.halfOpenRequests++;
        }

        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    private onSuccess(): void {
        this.failureCount = 0;
        if (this.state === CircuitState.HALF_OPEN) {
            this.successCount++;
            if (this.successCount >= this.options.halfOpenRequests) {
                this.state = CircuitState.CLOSED;
                this.successCount = 0;
            }
        }
    }

    private onFailure(): void {
        this.failureCount++;
        this.lastFailureTime = Date.now();

        if (this.failureCount >= this.options.failureThreshold) {
            this.state = CircuitState.OPEN;
        }

        if (this.state === CircuitState.HALF_OPEN) {
            this.state = CircuitState.OPEN;
        }
    }

    getState(): CircuitState {
        return this.state;
    }
}

// =============================================================================
// EXAMPLE 6: API Gateway Pattern
// =============================================================================

interface ServiceConfig {
    name: string;
    baseUrl: string;
    timeout: number;
    retries: number;
}

interface GatewayRequest {
    service: string;
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
}

interface GatewayResponse {
    status: number;
    data: unknown;
    headers: Record<string, string>;
}

class ApiGateway {
    private services: Map<string, ServiceConfig> = new Map();
    private circuitBreakers: Map<string, CircuitBreaker> = new Map();

    registerService(config: ServiceConfig): void {
        this.services.set(config.name, config);
        this.circuitBreakers.set(config.name, new CircuitBreaker(config.name, {
            failureThreshold: 5,
            resetTimeout: 30000,
            halfOpenRequests: 3
        }));
    }

    async request(req: GatewayRequest): Promise<GatewayResponse> {
        const service = this.services.get(req.service);
        if (!service) {
            throw new Error(`Unknown service: ${req.service}`);
        }

        const circuitBreaker = this.circuitBreakers.get(req.service)!;

        return circuitBreaker.execute(async () => {
            const url = `${service.baseUrl}${req.path}`;

            // Add common headers
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'X-Request-ID': this.generateRequestId(),
                ...req.headers
            };

            // Simulate HTTP request
            console.log(`Gateway: ${req.method} ${url}`);

            return {
                status: 200,
                data: { message: 'Success' },
                headers: { 'X-Response-Time': '50ms' }
            };
        });
    }

    private generateRequestId(): string {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// =============================================================================
// Supporting Interfaces
// =============================================================================

interface EmailService {
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendDeactivationNotice(email: string): Promise<void>;
}

interface AuditLogger {
    log(action: string, data: Record<string, unknown>): Promise<void>;
}

// =============================================================================
// Exports
// =============================================================================

export {
    Repository,
    UserRepository,
    UserService,
    EventBus,
    PaymentProcessor,
    CreditCardStrategy,
    PayPalStrategy,
    CircuitBreaker,
    ApiGateway
};
