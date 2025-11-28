# Module 6: Lab
## AI for Architecture - Hands-On Project

---

## Lab Overview

| Attribute | Details |
|-----------|---------|
| **Duration** | 45 minutes |
| **Difficulty** | Advanced |
| **Prerequisites** | Modules 1-5 completed |
| **Tools** | Claude, ChatGPT, or Copilot Chat |

---

## Objective

Design a complete microservices architecture for an e-commerce platform using AI assistance.

---

## Scenario

You're the lead architect for **ShopStream**, a new e-commerce startup. The founders need:

- Support for 500K daily active users (scaling to 2M)
- Product catalog with 1M+ SKUs
- Real-time inventory management
- Order processing and fulfillment
- Customer accounts and authentication
- Payment processing
- Recommendation engine
- Search functionality
- Admin dashboard

### Constraints
- Team: 8 backend developers, 4 frontend developers
- Timeline: MVP in 6 months
- Budget: Cloud-first, cost-conscious
- Existing: Nothing (greenfield project)

---

## Part 1: High-Level Architecture (15 minutes)

### Task 1.1: Generate System Architecture

Use this prompt with your AI tool:

```
Design a microservices architecture for an e-commerce platform.

Requirements:
- 500K daily active users, scaling to 2M
- 1M+ product SKUs
- Real-time inventory
- Order processing
- User authentication
- Payment processing
- Product recommendations
- Full-text search

Constraints:
- 12 developers (8 backend, 4 frontend)
- 6-month MVP timeline
- Cloud-native (AWS preferred)
- Cost-conscious startup

Provide:
1. ASCII architecture diagram
2. List of microservices with responsibilities
3. Communication patterns (sync vs async)
4. Data storage recommendations per service
5. Key technology choices with rationale
```

### Deliverable 1.1
Document the AI-generated architecture. Note any concerns or questions.

### Task 1.2: Challenge the Design

Ask follow-up questions:

```
For the architecture you proposed:

1. What are the main failure points?
2. How would you handle a Black Friday traffic spike (10x normal)?
3. What's the deployment order for these services?
4. Which services are most critical for MVP vs later phases?
```

### Deliverable 1.2
Document the refined architecture with risk mitigations.

---

## Part 2: Service Deep Dive (15 minutes)

### Task 2.1: Design Order Service

```
Design the Order Service for our e-commerce platform.

Context:
- Part of microservices architecture
- Handles order creation, updates, cancellation
- Must integrate with: Inventory, Payment, Notification services
- Expected: 10K orders/day initially, 100K at scale

Provide:
1. API endpoints (RESTful)
2. Database schema
3. Event publishing (what events, when)
4. Error handling strategy
5. Idempotency approach for payments
```

### Deliverable 2.1
Complete Order Service design document.

### Task 2.2: Design Data Flow

```
Create a sequence diagram (ASCII or Mermaid) for:
"Customer places an order for 2 items"

Include interactions between:
- Frontend
- API Gateway
- Order Service
- Inventory Service
- Payment Service
- Notification Service

Show both happy path and inventory shortage scenario.
```

### Deliverable 2.2
Sequence diagrams for order flow.

---

## Part 3: Technology Selection (10 minutes)

### Task 3.1: Database Selection

```
Compare database options for our e-commerce services:

Service needs:
1. Product Catalog: 1M products, complex queries, full-text search
2. Order Service: Transactional, high write volume
3. User Service: User profiles, authentication data
4. Analytics: Time-series data, aggregations

Options to compare:
- PostgreSQL
- MongoDB
- DynamoDB
- Elasticsearch
- Redis

For each service, recommend primary and cache databases.
Provide comparison table with rationale.
```

### Deliverable 3.1
Database selection matrix with justifications.

### Task 3.2: Message Queue Selection

```
We need async communication between services.

Requirements:
- Order events (high reliability needed)
- Inventory updates (real-time)
- Notification triggers
- Analytics events (high volume, some loss acceptable)

Compare:
- RabbitMQ
- Apache Kafka
- AWS SQS/SNS
- Redis Streams

Recommend with rationale for our startup context.
```

### Deliverable 3.2
Message queue recommendation document.

---

## Part 4: Architecture Decision Record (5 minutes)

### Task 4.1: Create ADR

Use AI to generate an ADR:

```
Create an Architecture Decision Record (ADR) for:
"Using Event-Driven Architecture for Order Processing"

Context: E-commerce platform with microservices
Follow the standard ADR format:
- Title
- Status
- Context
- Decision
- Consequences (positive and negative)
- Alternatives considered
```

### Deliverable 4.1
Complete ADR document.

---

## Lab Deliverables Checklist

Submit the following:

- [ ] **Part 1**: High-level architecture diagram and service list
- [ ] **Part 1**: Risk analysis and mitigations
- [ ] **Part 2**: Order Service API and schema design
- [ ] **Part 2**: Order flow sequence diagrams
- [ ] **Part 3**: Database selection matrix
- [ ] **Part 3**: Message queue recommendation
- [ ] **Part 4**: ADR for event-driven architecture

---

## Evaluation Criteria

| Criteria | Points |
|----------|--------|
| Architecture completeness | 20 |
| Service design quality | 20 |
| Technology justifications | 20 |
| Risk identification | 15 |
| ADR quality | 15 |
| AI prompt effectiveness | 10 |
| **Total** | **100** |

### Grading Scale
- 90-100: Excellent
- 80-89: Good
- 70-79: Satisfactory
- Below 70: Needs improvement

---

## Sample Solutions

### Sample Architecture (Simplified)

```
                                    ┌─────────────┐
                                    │   CDN       │
                                    │ (CloudFront)│
                                    └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │   Frontend  │
                                    │   (React)   │
                                    └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │ API Gateway │
                                    │   (Kong)    │
                                    └──────┬──────┘
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
             ┌──────▼──────┐       ┌──────▼──────┐       ┌──────▼──────┐
             │    User     │       │   Product   │       │    Order    │
             │   Service   │       │   Service   │       │   Service   │
             └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
                    │                     │                      │
             ┌──────▼──────┐       ┌──────▼──────┐       ┌──────▼──────┐
             │  PostgreSQL │       │    Mongo    │       │  PostgreSQL │
             │  (Users)    │       │ (Products)  │       │  (Orders)   │
             └─────────────┘       └─────────────┘       └─────────────┘
                                          │
                                   ┌──────▼──────┐
                                   │Elasticsearch│
                                   │  (Search)   │
                                   └─────────────┘

                    ┌─────────────────────────────────────────────┐
                    │              Message Bus (Kafka)            │
                    └─────────────────────────────────────────────┘
                           │              │              │
                    ┌──────▼──────┐ ┌─────▼──────┐ ┌────▼───────┐
                    │  Inventory  │ │  Payment   │ │Notification│
                    │   Service   │ │  Service   │ │  Service   │
                    └─────────────┘ └────────────┘ └────────────┘
```

### Sample Order Service API

```yaml
# Order Service API
openapi: 3.0.0
info:
  title: Order Service
  version: 1.0.0

paths:
  /orders:
    post:
      summary: Create new order
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrder'
      responses:
        201:
          description: Order created
        400:
          description: Invalid request
        409:
          description: Inventory conflict

  /orders/{orderId}:
    get:
      summary: Get order by ID
      responses:
        200:
          description: Order details
        404:
          description: Order not found

    patch:
      summary: Update order status
      responses:
        200:
          description: Order updated

  /orders/{orderId}/cancel:
    post:
      summary: Cancel order
      responses:
        200:
          description: Order cancelled
        400:
          description: Cannot cancel
```

### Sample ADR

```markdown
# ADR-001: Event-Driven Architecture for Order Processing

## Status
Accepted

## Context
We are building an e-commerce platform with multiple microservices
that need to communicate during order processing. Orders involve
multiple services: inventory reservation, payment processing,
and customer notification.

## Decision
We will use event-driven architecture with Apache Kafka as our
message broker for order-related workflows.

Order events published:
- OrderCreated
- OrderPaymentReceived
- OrderShipped
- OrderDelivered
- OrderCancelled

## Consequences

### Positive
- Services are loosely coupled
- Easy to add new consumers (analytics, recommendations)
- Natural audit trail via event log
- Better failure isolation
- Supports high throughput

### Negative
- Added complexity (eventual consistency)
- Debugging distributed flows is harder
- Need to handle duplicate events (idempotency)
- Team needs Kafka expertise

## Alternatives Considered
1. **Synchronous REST calls**: Rejected due to tight coupling
2. **RabbitMQ**: Considered but Kafka better for our event sourcing needs
3. **AWS SQS**: Considered but prefer vendor-neutral option
```

---

## Reflection Questions

After completing the lab, consider:

1. How much time did AI save compared to designing from scratch?
2. What architectural insights did AI provide that you hadn't considered?
3. Where did you need to override or correct AI suggestions?
4. How would you validate these designs with your team?
5. What additional context would have improved AI responses?

---

## Extension Challenges

For advanced learners:

### Challenge 1: Add Recommendation Service
Design a recommendation engine service that suggests products based on user behavior and purchase history.

### Challenge 2: Multi-Region Architecture
Extend the architecture to support users in US, EU, and Asia with appropriate data residency.

### Challenge 3: Cost Optimization
Ask AI to analyze the architecture for cost optimization opportunities and propose alternatives.

---

*Module 6 Lab - AI for Architecture*
*AI-Assisted Software Development Course*
