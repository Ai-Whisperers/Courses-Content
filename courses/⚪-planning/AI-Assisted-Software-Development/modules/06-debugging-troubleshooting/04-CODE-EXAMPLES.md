# Module 6: Code Examples
## AI for Architecture

---

## Overview

This document contains code examples demonstrating AI-assisted architecture patterns, design implementations, and technical decision frameworks.

---

## Example 1: Strategy Pattern Implementation

### Problem
Payment processing with multiple payment methods.

### AI Prompt Used
```
Refactor this payment code using the Strategy pattern:

function processPayment(type, amount, details) {
  if (type === 'credit') { /* credit logic */ }
  else if (type === 'paypal') { /* paypal logic */ }
  else if (type === 'crypto') { /* crypto logic */ }
}
```

### Solution

```typescript
// payment-strategies.ts

// Strategy Interface
interface PaymentStrategy {
  processPayment(amount: number, details: PaymentDetails): Promise<PaymentResult>;
  validateDetails(details: PaymentDetails): boolean;
  getProviderName(): string;
}

// Payment Details Types
interface PaymentDetails {
  currency: string;
  metadata?: Record<string, unknown>;
}

interface CreditCardDetails extends PaymentDetails {
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  cardholderName: string;
}

interface PayPalDetails extends PaymentDetails {
  email: string;
  returnUrl: string;
  cancelUrl: string;
}

interface CryptoDetails extends PaymentDetails {
  walletAddress: string;
  cryptoCurrency: 'BTC' | 'ETH' | 'USDC';
}

// Payment Result
interface PaymentResult {
  success: boolean;
  transactionId: string;
  provider: string;
  amount: number;
  timestamp: Date;
  error?: string;
}

// Concrete Strategies
class CreditCardStrategy implements PaymentStrategy {
  private stripeClient: StripeClient;

  constructor(stripeClient: StripeClient) {
    this.stripeClient = stripeClient;
  }

  async processPayment(amount: number, details: CreditCardDetails): Promise<PaymentResult> {
    const charge = await this.stripeClient.charges.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: details.currency,
      source: await this.createToken(details),
      description: `Payment for ${details.cardholderName}`,
    });

    return {
      success: charge.status === 'succeeded',
      transactionId: charge.id,
      provider: this.getProviderName(),
      amount,
      timestamp: new Date(),
    };
  }

  validateDetails(details: CreditCardDetails): boolean {
    return !!(
      details.cardNumber &&
      details.expiryMonth &&
      details.expiryYear &&
      details.cvv &&
      this.isValidCardNumber(details.cardNumber)
    );
  }

  getProviderName(): string {
    return 'stripe';
  }

  private isValidCardNumber(cardNumber: string): boolean {
    // Luhn algorithm validation
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  private async createToken(details: CreditCardDetails): Promise<string> {
    // Token creation logic
    return 'tok_' + Date.now();
  }
}

class PayPalStrategy implements PaymentStrategy {
  private paypalClient: PayPalClient;

  constructor(paypalClient: PayPalClient) {
    this.paypalClient = paypalClient;
  }

  async processPayment(amount: number, details: PayPalDetails): Promise<PaymentResult> {
    const order = await this.paypalClient.orders.create({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: details.currency,
          value: amount.toFixed(2),
        },
      }],
      application_context: {
        return_url: details.returnUrl,
        cancel_url: details.cancelUrl,
      },
    });

    const capture = await this.paypalClient.orders.capture(order.id);

    return {
      success: capture.status === 'COMPLETED',
      transactionId: capture.id,
      provider: this.getProviderName(),
      amount,
      timestamp: new Date(),
    };
  }

  validateDetails(details: PayPalDetails): boolean {
    return !!(
      details.email &&
      this.isValidEmail(details.email) &&
      details.returnUrl &&
      details.cancelUrl
    );
  }

  getProviderName(): string {
    return 'paypal';
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

class CryptoStrategy implements PaymentStrategy {
  private cryptoGateway: CryptoGateway;

  constructor(cryptoGateway: CryptoGateway) {
    this.cryptoGateway = cryptoGateway;
  }

  async processPayment(amount: number, details: CryptoDetails): Promise<PaymentResult> {
    const cryptoAmount = await this.convertToCrypto(amount, details.currency, details.cryptoCurrency);

    const transaction = await this.cryptoGateway.createPayment({
      amount: cryptoAmount,
      currency: details.cryptoCurrency,
      destinationWallet: details.walletAddress,
    });

    return {
      success: transaction.confirmed,
      transactionId: transaction.txHash,
      provider: this.getProviderName(),
      amount,
      timestamp: new Date(),
    };
  }

  validateDetails(details: CryptoDetails): boolean {
    return !!(
      details.walletAddress &&
      this.isValidWalletAddress(details.walletAddress, details.cryptoCurrency)
    );
  }

  getProviderName(): string {
    return 'crypto';
  }

  private async convertToCrypto(
    amount: number,
    fromCurrency: string,
    toCrypto: string
  ): Promise<number> {
    const rate = await this.cryptoGateway.getExchangeRate(fromCurrency, toCrypto);
    return amount / rate;
  }

  private isValidWalletAddress(address: string, crypto: string): boolean {
    const patterns: Record<string, RegExp> = {
      BTC: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
      ETH: /^0x[a-fA-F0-9]{40}$/,
      USDC: /^0x[a-fA-F0-9]{40}$/,
    };
    return patterns[crypto]?.test(address) ?? false;
  }
}

// Context Class
class PaymentProcessor {
  private strategies: Map<string, PaymentStrategy> = new Map();
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  registerStrategy(name: string, strategy: PaymentStrategy): void {
    this.strategies.set(name, strategy);
    this.logger.info(`Registered payment strategy: ${name}`);
  }

  async processPayment(
    strategyName: string,
    amount: number,
    details: PaymentDetails
  ): Promise<PaymentResult> {
    const strategy = this.strategies.get(strategyName);

    if (!strategy) {
      throw new Error(`Unknown payment strategy: ${strategyName}`);
    }

    if (!strategy.validateDetails(details)) {
      throw new Error(`Invalid payment details for ${strategyName}`);
    }

    this.logger.info(`Processing ${strategyName} payment for $${amount}`);

    try {
      const result = await strategy.processPayment(amount, details);
      this.logger.info(`Payment ${result.success ? 'succeeded' : 'failed'}: ${result.transactionId}`);
      return result;
    } catch (error) {
      this.logger.error(`Payment failed: ${error.message}`);
      throw error;
    }
  }

  getAvailableStrategies(): string[] {
    return Array.from(this.strategies.keys());
  }
}

// Usage
const processor = new PaymentProcessor(logger);
processor.registerStrategy('credit', new CreditCardStrategy(stripeClient));
processor.registerStrategy('paypal', new PayPalStrategy(paypalClient));
processor.registerStrategy('crypto', new CryptoStrategy(cryptoGateway));

// Process a credit card payment
const result = await processor.processPayment('credit', 99.99, {
  cardNumber: '4242424242424242',
  expiryMonth: 12,
  expiryYear: 2025,
  cvv: '123',
  cardholderName: 'John Doe',
  currency: 'USD',
});
```

---

## Example 2: Repository Pattern with Unit of Work

### AI Prompt Used
```
Implement Repository pattern with Unit of Work for a Node.js application
with PostgreSQL. Include transaction support and type safety.
```

### Solution

```typescript
// repository-pattern.ts

// Entity Base
interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Entity
interface User extends Entity {
  email: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'user' | 'guest';
}

// Order Entity
interface Order extends Entity {
  userId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
}

interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

// Generic Repository Interface
interface IRepository<T extends Entity> {
  findById(id: string): Promise<T | null>;
  findAll(options?: FindOptions): Promise<T[]>;
  findOne(criteria: Partial<T>): Promise<T | null>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  count(criteria?: Partial<T>): Promise<number>;
}

interface FindOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

// Unit of Work Interface
interface IUnitOfWork {
  users: IRepository<User>;
  orders: IRepository<Order>;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

// Base Repository Implementation
class PostgresRepository<T extends Entity> implements IRepository<T> {
  protected tableName: string;
  protected client: PoolClient;

  constructor(tableName: string, client: PoolClient) {
    this.tableName = tableName;
    this.client = client;
  }

  async findById(id: string): Promise<T | null> {
    const result = await this.client.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findAll(options: FindOptions = {}): Promise<T[]> {
    const {
      limit = 100,
      offset = 0,
      orderBy = 'created_at',
      orderDirection = 'DESC',
    } = options;

    const result = await this.client.query(
      `SELECT * FROM ${this.tableName}
       ORDER BY ${orderBy} ${orderDirection}
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.rows;
  }

  async findOne(criteria: Partial<T>): Promise<T | null> {
    const keys = Object.keys(criteria);
    const values = Object.values(criteria);
    const conditions = keys.map((key, i) => `${this.toSnakeCase(key)} = $${i + 1}`).join(' AND ');

    const result = await this.client.query(
      `SELECT * FROM ${this.tableName} WHERE ${conditions} LIMIT 1`,
      values
    );
    return result.rows[0] || null;
  }

  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const id = crypto.randomUUID();
    const now = new Date();
    const fullEntity = { ...entity, id, createdAt: now, updatedAt: now };

    const keys = Object.keys(fullEntity);
    const values = Object.values(fullEntity);
    const columns = keys.map(k => this.toSnakeCase(k)).join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const result = await this.client.query(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const updatesWithTimestamp = { ...updates, updatedAt: new Date() };
    const keys = Object.keys(updatesWithTimestamp);
    const values = Object.values(updatesWithTimestamp);
    const setClause = keys.map((key, i) => `${this.toSnakeCase(key)} = $${i + 1}`).join(', ');

    const result = await this.client.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.client.query(
      `DELETE FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result.rowCount > 0;
  }

  async count(criteria?: Partial<T>): Promise<number> {
    if (!criteria || Object.keys(criteria).length === 0) {
      const result = await this.client.query(
        `SELECT COUNT(*) FROM ${this.tableName}`
      );
      return parseInt(result.rows[0].count, 10);
    }

    const keys = Object.keys(criteria);
    const values = Object.values(criteria);
    const conditions = keys.map((key, i) => `${this.toSnakeCase(key)} = $${i + 1}`).join(' AND ');

    const result = await this.client.query(
      `SELECT COUNT(*) FROM ${this.tableName} WHERE ${conditions}`,
      values
    );
    return parseInt(result.rows[0].count, 10);
  }

  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}

// Specialized User Repository
class UserRepository extends PostgresRepository<User> {
  constructor(client: PoolClient) {
    super('users', client);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email.toLowerCase()]
    );
    return result.rows[0] || null;
  }

  async findByRole(role: User['role']): Promise<User[]> {
    const result = await this.client.query(
      `SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC`,
      [role]
    );
    return result.rows;
  }
}

// Specialized Order Repository
class OrderRepository extends PostgresRepository<Order> {
  constructor(client: PoolClient) {
    super('orders', client);
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const result = await this.client.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  async findByStatus(status: Order['status']): Promise<Order[]> {
    const result = await this.client.query(
      `SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC`,
      [status]
    );
    return result.rows;
  }

  async getTotalRevenue(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.client.query(
      `SELECT SUM(total_amount) as revenue FROM orders
       WHERE status IN ('confirmed', 'shipped', 'delivered')
       AND created_at BETWEEN $1 AND $2`,
      [startDate, endDate]
    );
    return parseFloat(result.rows[0].revenue) || 0;
  }
}

// Unit of Work Implementation
class UnitOfWork implements IUnitOfWork {
  private pool: Pool;
  private client: PoolClient | null = null;

  private _users: UserRepository | null = null;
  private _orders: OrderRepository | null = null;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  get users(): UserRepository {
    if (!this._users) {
      throw new Error('Unit of Work not started. Call begin() first.');
    }
    return this._users;
  }

  get orders(): OrderRepository {
    if (!this._orders) {
      throw new Error('Unit of Work not started. Call begin() first.');
    }
    return this._orders;
  }

  async begin(): Promise<void> {
    this.client = await this.pool.connect();
    await this.client.query('BEGIN');

    this._users = new UserRepository(this.client);
    this._orders = new OrderRepository(this.client);
  }

  async commit(): Promise<void> {
    if (!this.client) {
      throw new Error('No active transaction');
    }

    try {
      await this.client.query('COMMIT');
    } finally {
      this.client.release();
      this.client = null;
      this._users = null;
      this._orders = null;
    }
  }

  async rollback(): Promise<void> {
    if (!this.client) {
      throw new Error('No active transaction');
    }

    try {
      await this.client.query('ROLLBACK');
    } finally {
      this.client.release();
      this.client = null;
      this._users = null;
      this._orders = null;
    }
  }
}

// Usage Example - Order Service
class OrderService {
  constructor(private unitOfWorkFactory: () => UnitOfWork) {}

  async createOrder(userId: string, items: OrderItem[]): Promise<Order> {
    const uow = this.unitOfWorkFactory();

    try {
      await uow.begin();

      // Verify user exists
      const user = await uow.users.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Calculate total
      const totalAmount = items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );

      // Create order
      const order = await uow.orders.create({
        userId,
        status: 'pending',
        totalAmount,
        items,
      });

      await uow.commit();
      return order;
    } catch (error) {
      await uow.rollback();
      throw error;
    }
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const uow = this.unitOfWorkFactory();

    try {
      await uow.begin();

      const order = await uow.orders.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      if (!['pending', 'confirmed'].includes(order.status)) {
        throw new Error('Cannot cancel order in current status');
      }

      const updatedOrder = await uow.orders.update(orderId, {
        status: 'cancelled',
      });

      await uow.commit();
      return updatedOrder;
    } catch (error) {
      await uow.rollback();
      throw error;
    }
  }
}
```

---

## Example 3: Event-Driven Architecture

### AI Prompt Used
```
Design an event-driven system for order processing with
TypeScript. Include event bus, event handlers, and retry logic.
```

### Solution

```typescript
// event-driven-architecture.ts

// Event Types
interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  timestamp: Date;
  version: number;
  payload: unknown;
  metadata: EventMetadata;
}

interface EventMetadata {
  correlationId: string;
  causationId?: string;
  userId?: string;
  source: string;
}

// Specific Events
interface OrderCreatedEvent extends DomainEvent {
  eventType: 'OrderCreated';
  payload: {
    orderId: string;
    userId: string;
    items: Array<{ productId: string; quantity: number; price: number }>;
    totalAmount: number;
  };
}

interface PaymentReceivedEvent extends DomainEvent {
  eventType: 'PaymentReceived';
  payload: {
    orderId: string;
    paymentId: string;
    amount: number;
    method: string;
  };
}

interface InventoryReservedEvent extends DomainEvent {
  eventType: 'InventoryReserved';
  payload: {
    orderId: string;
    reservations: Array<{ productId: string; quantity: number }>;
  };
}

interface OrderShippedEvent extends DomainEvent {
  eventType: 'OrderShipped';
  payload: {
    orderId: string;
    trackingNumber: string;
    carrier: string;
    estimatedDelivery: Date;
  };
}

// Event Handler Interface
interface EventHandler<T extends DomainEvent = DomainEvent> {
  eventType: string;
  handle(event: T): Promise<void>;
}

// Event Bus Interface
interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(handler: EventHandler): void;
  unsubscribe(handler: EventHandler): void;
}

// In-Memory Event Bus (for development/testing)
class InMemoryEventBus implements EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async publish(event: DomainEvent): Promise<void> {
    this.logger.info(`Publishing event: ${event.eventType}`, {
      eventId: event.eventId,
      aggregateId: event.aggregateId,
    });

    const handlers = this.handlers.get(event.eventType);
    if (!handlers || handlers.size === 0) {
      this.logger.warn(`No handlers for event: ${event.eventType}`);
      return;
    }

    const promises = Array.from(handlers).map(handler =>
      this.executeHandler(handler, event)
    );

    await Promise.allSettled(promises);
  }

  private async executeHandler(handler: EventHandler, event: DomainEvent): Promise<void> {
    try {
      await handler.handle(event);
      this.logger.info(`Handler completed for: ${event.eventType}`);
    } catch (error) {
      this.logger.error(`Handler failed for: ${event.eventType}`, { error });
      throw error;
    }
  }

  subscribe(handler: EventHandler): void {
    if (!this.handlers.has(handler.eventType)) {
      this.handlers.set(handler.eventType, new Set());
    }
    this.handlers.get(handler.eventType)!.add(handler);
    this.logger.info(`Subscribed handler for: ${handler.eventType}`);
  }

  unsubscribe(handler: EventHandler): void {
    const handlers = this.handlers.get(handler.eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

// Kafka Event Bus (for production)
class KafkaEventBus implements EventBus {
  private producer: KafkaProducer;
  private consumer: KafkaConsumer;
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private logger: Logger;
  private topicPrefix: string;

  constructor(
    kafkaConfig: KafkaConfig,
    logger: Logger,
    topicPrefix: string = 'ecommerce'
  ) {
    this.producer = new KafkaProducer(kafkaConfig);
    this.consumer = new KafkaConsumer(kafkaConfig);
    this.logger = logger;
    this.topicPrefix = topicPrefix;
  }

  async publish(event: DomainEvent): Promise<void> {
    const topic = `${this.topicPrefix}.${event.eventType}`;

    await this.producer.send({
      topic,
      messages: [{
        key: event.aggregateId,
        value: JSON.stringify(event),
        headers: {
          eventId: event.eventId,
          eventType: event.eventType,
          correlationId: event.metadata.correlationId,
        },
      }],
    });

    this.logger.info(`Published event to Kafka: ${topic}`, {
      eventId: event.eventId,
    });
  }

  subscribe(handler: EventHandler): void {
    const topic = `${this.topicPrefix}.${handler.eventType}`;

    if (!this.handlers.has(handler.eventType)) {
      this.handlers.set(handler.eventType, new Set());
      this.setupConsumer(topic, handler.eventType);
    }

    this.handlers.get(handler.eventType)!.add(handler);
  }

  private async setupConsumer(topic: string, eventType: string): Promise<void> {
    await this.consumer.subscribe({ topic });

    this.consumer.on('message', async (message) => {
      const event: DomainEvent = JSON.parse(message.value.toString());
      const handlers = this.handlers.get(eventType);

      if (handlers) {
        for (const handler of handlers) {
          await this.executeWithRetry(handler, event);
        }
      }
    });
  }

  private async executeWithRetry(
    handler: EventHandler,
    event: DomainEvent,
    maxRetries: number = 3
  ): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await handler.handle(event);
        return;
      } catch (error) {
        lastError = error as Error;
        this.logger.warn(`Handler attempt ${attempt} failed`, {
          eventType: event.eventType,
          eventId: event.eventId,
          error: lastError.message,
        });

        if (attempt < maxRetries) {
          await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      }
    }

    this.logger.error(`Handler failed after ${maxRetries} attempts`, {
      eventType: event.eventType,
      eventId: event.eventId,
    });

    // Send to dead letter queue
    await this.sendToDeadLetter(event, lastError!);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async sendToDeadLetter(event: DomainEvent, error: Error): Promise<void> {
    await this.producer.send({
      topic: `${this.topicPrefix}.dead-letter`,
      messages: [{
        key: event.aggregateId,
        value: JSON.stringify({
          originalEvent: event,
          error: error.message,
          failedAt: new Date().toISOString(),
        }),
      }],
    });
  }

  unsubscribe(handler: EventHandler): void {
    const handlers = this.handlers.get(handler.eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

// Event Handlers
class InventoryReservationHandler implements EventHandler<OrderCreatedEvent> {
  eventType = 'OrderCreated';

  constructor(
    private inventoryService: InventoryService,
    private eventBus: EventBus
  ) {}

  async handle(event: OrderCreatedEvent): Promise<void> {
    const { orderId, items } = event.payload;

    // Reserve inventory for each item
    const reservations = await Promise.all(
      items.map(item =>
        this.inventoryService.reserve(item.productId, item.quantity)
      )
    );

    // Publish success event
    await this.eventBus.publish({
      eventId: crypto.randomUUID(),
      eventType: 'InventoryReserved',
      aggregateId: orderId,
      timestamp: new Date(),
      version: 1,
      payload: {
        orderId,
        reservations: reservations.map((r, i) => ({
          productId: items[i].productId,
          quantity: items[i].quantity,
          reservationId: r.id,
        })),
      },
      metadata: {
        correlationId: event.metadata.correlationId,
        causationId: event.eventId,
        source: 'inventory-service',
      },
    });
  }
}

class NotificationHandler implements EventHandler<OrderShippedEvent> {
  eventType = 'OrderShipped';

  constructor(
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  async handle(event: OrderShippedEvent): Promise<void> {
    const { orderId, trackingNumber, carrier, estimatedDelivery } = event.payload;

    // Get user info for the order
    const order = await this.orderService.findById(orderId);
    const user = await this.userService.findById(order.userId);

    // Send notification
    await this.notificationService.send({
      userId: user.id,
      channel: 'email',
      template: 'order-shipped',
      data: {
        orderNumber: orderId,
        trackingNumber,
        carrier,
        estimatedDelivery: estimatedDelivery.toLocaleDateString(),
        trackingUrl: this.getTrackingUrl(carrier, trackingNumber),
      },
    });
  }

  private getTrackingUrl(carrier: string, trackingNumber: string): string {
    const urls: Record<string, string> = {
      ups: `https://www.ups.com/track?tracknum=${trackingNumber}`,
      fedex: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
      usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
    };
    return urls[carrier.toLowerCase()] || '#';
  }
}

// Event Factory
class EventFactory {
  static createOrderCreated(
    orderId: string,
    userId: string,
    items: Array<{ productId: string; quantity: number; price: number }>,
    correlationId: string
  ): OrderCreatedEvent {
    return {
      eventId: crypto.randomUUID(),
      eventType: 'OrderCreated',
      aggregateId: orderId,
      timestamp: new Date(),
      version: 1,
      payload: {
        orderId,
        userId,
        items,
        totalAmount: items.reduce((sum, i) => sum + i.quantity * i.price, 0),
      },
      metadata: {
        correlationId,
        source: 'order-service',
      },
    };
  }
}

// Application Setup
async function setupEventHandlers(eventBus: EventBus): Promise<void> {
  // Register handlers
  eventBus.subscribe(new InventoryReservationHandler(inventoryService, eventBus));
  eventBus.subscribe(new NotificationHandler(notificationService, userService));
  eventBus.subscribe(new AnalyticsHandler(analyticsService));
  eventBus.subscribe(new AuditLogHandler(auditService));
}
```

---

## Example 4: API Gateway Pattern

### AI Prompt Used
```
Implement an API Gateway pattern in Node.js with rate limiting,
authentication, and request routing.
```

### Solution

```typescript
// api-gateway.ts

import express, { Request, Response, NextFunction } from 'express';
import httpProxy from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

// Configuration
interface ServiceConfig {
  name: string;
  target: string;
  pathPrefix: string;
  rateLimit?: RateLimitConfig;
  requireAuth: boolean;
  allowedRoles?: string[];
}

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

interface GatewayConfig {
  port: number;
  jwtSecret: string;
  services: ServiceConfig[];
  defaultRateLimit: RateLimitConfig;
}

// JWT Payload
interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
}

// Extended Request
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// API Gateway Class
class APIGateway {
  private app: express.Application;
  private config: GatewayConfig;
  private logger: Logger;

  constructor(config: GatewayConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    // Request logging
    this.app.use(this.requestLogger.bind(this));

    // Parse JSON
    this.app.use(express.json({ limit: '10mb' }));

    // CORS
    this.app.use(this.corsMiddleware.bind(this));

    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'healthy', timestamp: new Date().toISOString() });
    });

    // Global rate limiting
    this.app.use(this.createRateLimiter(this.config.defaultRateLimit));
  }

  private setupRoutes(): void {
    for (const service of this.config.services) {
      this.registerService(service);
    }

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({ error: 'Not Found', path: req.path });
    });

    // Error handler
    this.app.use(this.errorHandler.bind(this));
  }

  private registerService(service: ServiceConfig): void {
    const middlewares: express.RequestHandler[] = [];

    // Service-specific rate limiting
    if (service.rateLimit) {
      middlewares.push(this.createRateLimiter(service.rateLimit));
    }

    // Authentication
    if (service.requireAuth) {
      middlewares.push(this.authMiddleware.bind(this));
    }

    // Role-based access control
    if (service.allowedRoles && service.allowedRoles.length > 0) {
      middlewares.push(this.roleMiddleware(service.allowedRoles));
    }

    // Proxy
    const proxy = httpProxy.createProxyMiddleware({
      target: service.target,
      changeOrigin: true,
      pathRewrite: {
        [`^${service.pathPrefix}`]: '',
      },
      onProxyReq: (proxyReq, req: AuthenticatedRequest) => {
        // Forward user info to downstream service
        if (req.user) {
          proxyReq.setHeader('X-User-Id', req.user.userId);
          proxyReq.setHeader('X-User-Role', req.user.role);
          proxyReq.setHeader('X-User-Email', req.user.email);
        }
        proxyReq.setHeader('X-Request-Id', req.headers['x-request-id'] || crypto.randomUUID());
      },
      onError: (err, req, res) => {
        this.logger.error(`Proxy error for ${service.name}:`, err);
        (res as Response).status(502).json({
          error: 'Bad Gateway',
          service: service.name,
        });
      },
    });

    this.app.use(service.pathPrefix, ...middlewares, proxy);
    this.logger.info(`Registered service: ${service.name} at ${service.pathPrefix} -> ${service.target}`);
  }

  private createRateLimiter(config: RateLimitConfig): express.RequestHandler {
    return rateLimit({
      windowMs: config.windowMs,
      max: config.max,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        error: 'Too many requests',
        retryAfter: Math.ceil(config.windowMs / 1000),
      },
      keyGenerator: (req: AuthenticatedRequest) => {
        return req.user?.userId || req.ip || 'anonymous';
      },
    });
  }

  private authMiddleware(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid authorization header' });
      return;
    }

    const token = authHeader.substring(7);

    try {
      const payload = jwt.verify(token, this.config.jwtSecret) as JwtPayload;
      req.user = payload;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ error: 'Token expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    }
  }

  private roleMiddleware(allowedRoles: string[]): express.RequestHandler {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        res.status(403).json({
          error: 'Forbidden',
          message: `Role '${req.user.role}' not authorized for this resource`,
        });
        return;
      }

      next();
    };
  }

  private requestLogger(req: Request, res: Response, next: NextFunction): void {
    const requestId = req.headers['x-request-id'] || crypto.randomUUID();
    req.headers['x-request-id'] = requestId as string;

    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.info({
        requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.headers['user-agent'],
        ip: req.ip,
      });
    });

    next();
  }

  private corsMiddleware(req: Request, res: Response, next: NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }

    next();
  }

  private errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    this.logger.error('Unhandled error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  start(): void {
    this.app.listen(this.config.port, () => {
      this.logger.info(`API Gateway running on port ${this.config.port}`);
    });
  }
}

// Configuration Example
const gatewayConfig: GatewayConfig = {
  port: 3000,
  jwtSecret: process.env.JWT_SECRET!,
  defaultRateLimit: {
    windowMs: 60 * 1000, // 1 minute
    max: 100,
  },
  services: [
    {
      name: 'user-service',
      target: 'http://localhost:3001',
      pathPrefix: '/api/users',
      requireAuth: true,
      rateLimit: { windowMs: 60000, max: 50 },
    },
    {
      name: 'product-service',
      target: 'http://localhost:3002',
      pathPrefix: '/api/products',
      requireAuth: false,
      rateLimit: { windowMs: 60000, max: 200 },
    },
    {
      name: 'order-service',
      target: 'http://localhost:3003',
      pathPrefix: '/api/orders',
      requireAuth: true,
      allowedRoles: ['user', 'admin'],
    },
    {
      name: 'admin-service',
      target: 'http://localhost:3004',
      pathPrefix: '/api/admin',
      requireAuth: true,
      allowedRoles: ['admin'],
      rateLimit: { windowMs: 60000, max: 30 },
    },
  ],
};

// Start Gateway
const gateway = new APIGateway(gatewayConfig, logger);
gateway.start();
```

---

## Example 5: Circuit Breaker Pattern

### AI Prompt Used
```
Implement Circuit Breaker pattern for resilient service calls
in TypeScript with configurable thresholds and monitoring.
```

### Solution

```typescript
// circuit-breaker.ts

enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

interface CircuitBreakerConfig {
  failureThreshold: number;      // Failures before opening
  successThreshold: number;      // Successes in half-open to close
  timeout: number;               // Time in open state before half-open (ms)
  monitoringWindow: number;      // Window to count failures (ms)
  volumeThreshold: number;       // Minimum calls before tripping
}

interface CircuitBreakerStats {
  state: CircuitState;
  failures: number;
  successes: number;
  totalCalls: number;
  lastFailure?: Date;
  lastSuccess?: Date;
  lastStateChange: Date;
}

class CircuitBreaker<T> {
  private state: CircuitState = CircuitState.CLOSED;
  private failures: number = 0;
  private successes: number = 0;
  private totalCalls: number = 0;
  private lastFailureTime?: Date;
  private lastSuccessTime?: Date;
  private lastStateChangeTime: Date = new Date();
  private nextAttemptTime?: Date;

  private readonly config: CircuitBreakerConfig;
  private readonly name: string;
  private readonly logger: Logger;
  private readonly metrics: MetricsCollector;

  constructor(
    name: string,
    config: Partial<CircuitBreakerConfig> = {},
    logger: Logger,
    metrics: MetricsCollector
  ) {
    this.name = name;
    this.logger = logger;
    this.metrics = metrics;

    this.config = {
      failureThreshold: config.failureThreshold ?? 5,
      successThreshold: config.successThreshold ?? 3,
      timeout: config.timeout ?? 30000,
      monitoringWindow: config.monitoringWindow ?? 60000,
      volumeThreshold: config.volumeThreshold ?? 10,
    };
  }

  async execute(operation: () => Promise<T>, fallback?: () => Promise<T>): Promise<T> {
    if (!this.canExecute()) {
      this.metrics.increment(`circuit_breaker.${this.name}.rejected`);

      if (fallback) {
        this.logger.info(`Circuit ${this.name} is OPEN, using fallback`);
        return fallback();
      }

      throw new CircuitBreakerError(
        `Circuit breaker ${this.name} is OPEN`,
        this.getStats()
      );
    }

    this.totalCalls++;
    const startTime = Date.now();

    try {
      const result = await operation();
      this.onSuccess();
      this.metrics.timing(`circuit_breaker.${this.name}.latency`, Date.now() - startTime);
      return result;
    } catch (error) {
      this.onFailure(error as Error);
      this.metrics.timing(`circuit_breaker.${this.name}.latency`, Date.now() - startTime);

      if (fallback && this.state === CircuitState.OPEN) {
        this.logger.info(`Circuit ${this.name} opened, using fallback`);
        return fallback();
      }

      throw error;
    }
  }

  private canExecute(): boolean {
    if (this.state === CircuitState.CLOSED) {
      return true;
    }

    if (this.state === CircuitState.OPEN) {
      if (this.nextAttemptTime && new Date() >= this.nextAttemptTime) {
        this.transitionTo(CircuitState.HALF_OPEN);
        return true;
      }
      return false;
    }

    // HALF_OPEN: allow limited requests
    return true;
  }

  private onSuccess(): void {
    this.lastSuccessTime = new Date();
    this.successes++;
    this.metrics.increment(`circuit_breaker.${this.name}.success`);

    if (this.state === CircuitState.HALF_OPEN) {
      if (this.successes >= this.config.successThreshold) {
        this.transitionTo(CircuitState.CLOSED);
      }
    } else if (this.state === CircuitState.CLOSED) {
      // Reset failure count on success in closed state
      this.failures = 0;
    }
  }

  private onFailure(error: Error): void {
    this.lastFailureTime = new Date();
    this.failures++;
    this.metrics.increment(`circuit_breaker.${this.name}.failure`);

    this.logger.warn(`Circuit ${this.name} failure:`, {
      error: error.message,
      failures: this.failures,
      state: this.state,
    });

    if (this.state === CircuitState.HALF_OPEN) {
      // Any failure in half-open immediately opens
      this.transitionTo(CircuitState.OPEN);
    } else if (this.state === CircuitState.CLOSED) {
      if (this.shouldTrip()) {
        this.transitionTo(CircuitState.OPEN);
      }
    }
  }

  private shouldTrip(): boolean {
    // Need minimum volume before tripping
    if (this.totalCalls < this.config.volumeThreshold) {
      return false;
    }

    // Check failure rate in monitoring window
    return this.failures >= this.config.failureThreshold;
  }

  private transitionTo(newState: CircuitState): void {
    const oldState = this.state;
    this.state = newState;
    this.lastStateChangeTime = new Date();

    this.logger.info(`Circuit ${this.name} state change: ${oldState} -> ${newState}`);
    this.metrics.gauge(`circuit_breaker.${this.name}.state`, this.stateToNumber(newState));

    if (newState === CircuitState.OPEN) {
      this.nextAttemptTime = new Date(Date.now() + this.config.timeout);
      this.logger.warn(`Circuit ${this.name} will attempt recovery at ${this.nextAttemptTime}`);
    } else if (newState === CircuitState.CLOSED) {
      this.reset();
    } else if (newState === CircuitState.HALF_OPEN) {
      this.successes = 0;
      this.failures = 0;
    }
  }

  private reset(): void {
    this.failures = 0;
    this.successes = 0;
    this.totalCalls = 0;
    this.nextAttemptTime = undefined;
  }

  private stateToNumber(state: CircuitState): number {
    switch (state) {
      case CircuitState.CLOSED: return 0;
      case CircuitState.HALF_OPEN: return 1;
      case CircuitState.OPEN: return 2;
    }
  }

  getStats(): CircuitBreakerStats {
    return {
      state: this.state,
      failures: this.failures,
      successes: this.successes,
      totalCalls: this.totalCalls,
      lastFailure: this.lastFailureTime,
      lastSuccess: this.lastSuccessTime,
      lastStateChange: this.lastStateChangeTime,
    };
  }

  forceOpen(): void {
    this.transitionTo(CircuitState.OPEN);
  }

  forceClose(): void {
    this.transitionTo(CircuitState.CLOSED);
  }
}

class CircuitBreakerError extends Error {
  constructor(message: string, public readonly stats: CircuitBreakerStats) {
    super(message);
    this.name = 'CircuitBreakerError';
  }
}

// Circuit Breaker Registry
class CircuitBreakerRegistry {
  private breakers: Map<string, CircuitBreaker<unknown>> = new Map();
  private logger: Logger;
  private metrics: MetricsCollector;

  constructor(logger: Logger, metrics: MetricsCollector) {
    this.logger = logger;
    this.metrics = metrics;
  }

  getOrCreate<T>(
    name: string,
    config?: Partial<CircuitBreakerConfig>
  ): CircuitBreaker<T> {
    if (!this.breakers.has(name)) {
      const breaker = new CircuitBreaker<T>(name, config, this.logger, this.metrics);
      this.breakers.set(name, breaker as CircuitBreaker<unknown>);
    }
    return this.breakers.get(name) as CircuitBreaker<T>;
  }

  getAllStats(): Record<string, CircuitBreakerStats> {
    const stats: Record<string, CircuitBreakerStats> = {};
    for (const [name, breaker] of this.breakers) {
      stats[name] = breaker.getStats();
    }
    return stats;
  }
}

// Usage Example
const registry = new CircuitBreakerRegistry(logger, metrics);

// Create circuit breaker for external API
const paymentCircuit = registry.getOrCreate<PaymentResult>('payment-service', {
  failureThreshold: 3,
  successThreshold: 2,
  timeout: 60000,
});

// Use with fallback
async function processPayment(payment: Payment): Promise<PaymentResult> {
  return paymentCircuit.execute(
    // Primary operation
    async () => {
      const response = await fetch('https://api.payment.com/charge', {
        method: 'POST',
        body: JSON.stringify(payment),
      });
      if (!response.ok) throw new Error('Payment failed');
      return response.json();
    },
    // Fallback operation
    async () => {
      // Queue for later processing
      await paymentQueue.add(payment);
      return {
        status: 'queued',
        message: 'Payment queued for processing',
      };
    }
  );
}
```

---

## Quick Reference

### Pattern Selection Guide

| Pattern | Use When | AI Can Help With |
|---------|----------|------------------|
| Strategy | Multiple algorithms/behaviors | Implementation, refactoring |
| Repository | Data access abstraction | CRUD operations, queries |
| Event-Driven | Async communication | Event schemas, handlers |
| API Gateway | Microservices entry point | Routing, middleware |
| Circuit Breaker | External service resilience | Config, monitoring |

### Architecture Prompt Tips

```
For best AI architecture suggestions:

1. Describe the problem clearly
2. List constraints (team, time, budget)
3. Specify scale requirements
4. Mention existing infrastructure
5. Ask for trade-offs and alternatives
```

---

*Module 6 Code Examples - AI for Architecture*
*AI-Assisted Software Development Course*
