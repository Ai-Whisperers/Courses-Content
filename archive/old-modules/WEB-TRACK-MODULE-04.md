# Web Dev Track Module 4: Database & Data Management
## FPUNA Summer 2026 - Week 7 (Web Development Specialization)

**Duration**: 10 hours (Week 7 of program)  
**Tool Focus**: Prisma Advanced + OpenCode  
**Prerequisites**: Core Modules 1-6, Web Modules 1-3 completed

---

## Module Overview

Master advanced database operations: complex queries, relationships, transactions, migrations, seeding, optimization, and data modeling. Learn to design efficient database schemas and write performant queries using Prisma ORM.

### Learning Objectives

1. **Design** efficient database schemas
2. **Implement** complex relationships (one-to-many, many-to-many)
3. **Write** advanced Prisma queries with filters and aggregations
4. **Use** transactions for data consistency
5. **Optimize** database performance
6. **Create** database migrations and seeders
7. **Handle** soft deletes and audit trails

---

## 4.1 Advanced Schema Design

### E-Commerce Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  password      String
  role          Role      @default(CUSTOMER)
  addresses     Address[]
  orders        Order[]
  reviews       Review[]
  cart          Cart?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime? // Soft delete

  @@index([email])
  @@map("users")
}

model Product {
  id          String         @id @default(cuid())
  name        String
  slug        String         @unique
  description String
  price       Int
  stock       Int
  categoryId  String
  category    Category       @relation(fields: [categoryId], references: [id])
  images      ProductImage[]
  orderItems  OrderItem[]
  cartItems   CartItem[]
  reviews     Review[]
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  deletedAt   DateTime?

  @@index([slug, categoryId])
  @@map("products")
}

model Category {
  id        String    @id @default(cuid())
  name      String    @unique
  slug      String    @unique
  products  Product[]
  createdAt DateTime  @default(now())

  @@map("categories")
}

model ProductImage {
  id        String   @id @default(cuid())
  url       String
  alt       String?
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  order     Int      @default(0)

  @@map("product_images")
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  items       OrderItem[]
  total       Int
  status      OrderStatus @default(PENDING)
  shippingId  String
  shipping    Address     @relation(fields: [shippingId], references: [id])
  paymentId   String?
  payment     Payment?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([userId, status])
  @@map("orders")
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Int
  subtotal  Int

  @@map("order_items")
}

model Cart {
  id        String     @id @default(cuid())
  userId    String     @unique
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@map("carts")
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  createdAt DateTime @default(now())

  @@unique([cartId, productId])
  @@map("cart_items")
}

model Address {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  street    String
  city      String
  state     String
  zipCode   String
  country   String   @default("Paraguay")
  isDefault Boolean  @default(false)
  orders    Order[]
  createdAt DateTime @default(now())

  @@map("addresses")
}

model Payment {
  id        String        @id @default(cuid())
  orderId   String        @unique
  order     Order         @relation(fields: [orderId], references: [id])
  method    PaymentMethod
  status    PaymentStatus
  amount    Int
  createdAt DateTime      @default(now())

  @@map("payments")
}

model Review {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  rating    Int
  comment   String?
  createdAt DateTime @default(now())

  @@unique([userId, productId])
  @@map("reviews")
}

enum Role {
  CUSTOMER
  ADMIN
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  CASH
  BANK_TRANSFER
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

---

## 4.2 Complex Queries

### Include Relationships

```typescript
// Fetch product with category and images
const product = await prisma.product.findUnique({
  where: { id: productId },
  include: {
    category: true,
    images: {
      orderBy: { order: 'asc' }
    },
    reviews: {
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    }
  }
});
```

---

### Advanced Filtering

```typescript
// Complex product search
const products = await prisma.product.findMany({
  where: {
    AND: [
      {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      {
        price: {
          gte: minPrice,
          lte: maxPrice
        }
      },
      {
        stock: { gt: 0 }
      },
      {
        categoryId: { in: categoryIds }
      },
      {
        deletedAt: null // Only active products
      }
    ]
  },
  include: {
    category: true,
    images: { take: 1 }
  },
  orderBy: [
    { createdAt: 'desc' }
  ],
  skip: (page - 1) * limit,
  take: limit
});
```

---

### Aggregations

```typescript
// Get category statistics
const categoryStats = await prisma.product.groupBy({
  by: ['categoryId'],
  where: {
    deletedAt: null
  },
  _count: {
    id: true
  },
  _avg: {
    price: true
  },
  _min: {
    price: true
  },
  _max: {
    price: true
  }
});

// Count total orders by status
const orderCounts = await prisma.order.groupBy({
  by: ['status'],
  _count: {
    id: true
  }
});
```

---

## 4.3 Transactions

### Basic Transaction

```typescript
// Create order with items (atomic operation)
const order = await prisma.$transaction(async (tx) => {
  // Create order
  const newOrder = await tx.order.create({
    data: {
      userId,
      total: cartTotal,
      shippingId: addressId,
      status: 'PENDING'
    }
  });

  // Create order items
  const orderItems = await tx.orderItem.createMany({
    data: cartItems.map(item => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
      subtotal: item.product.price * item.quantity
    }))
  });

  // Update product stock
  for (const item of cartItems) {
    await tx.product.update({
      where: { id: item.productId },
      data: {
        stock: { decrement: item.quantity }
      }
    });
  }

  // Clear cart
  await tx.cartItem.deleteMany({
    where: { cartId: cart.id }
  });

  return newOrder;
});
```

---

### Transaction with Rollback

```typescript
try {
  const result = await prisma.$transaction(async (tx) => {
    // Create payment
    const payment = await tx.payment.create({
      data: {
        orderId,
        method: 'CREDIT_CARD',
        status: 'PENDING',
        amount: orderTotal
      }
    });

    // Process payment (external API)
    const paymentResult = await processPayment(payment.id, orderTotal);

    if (!paymentResult.success) {
      throw new Error('Payment failed');
    }

    // Update payment status
    await tx.payment.update({
      where: { id: payment.id },
      data: { status: 'COMPLETED' }
    });

    // Update order status
    await tx.order.update({
      where: { id: orderId },
      data: { status: 'CONFIRMED' }
    });

    return payment;
  });
} catch (error) {
  // Transaction automatically rolls back
  console.error('Transaction failed:', error);
}
```

---

## 4.4 Database Seeding

### Seed Script

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@fpuna.edu.py',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  const customer = await prisma.user.create({
    data: {
      email: 'maria@fpuna.edu.py',
      name: 'María González',
      password: hashedPassword,
      role: 'CUSTOMER'
    }
  });

  console.log('✅ Created users');

  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Comida Típica', slug: 'comida-tipica' },
      { name: 'Bebidas', slug: 'bebidas' },
      { name: 'Postres', slug: 'postres' },
      { name: 'Artesanías', slug: 'artesanias' }
    ]
  });

  const categoryList = await prisma.category.findMany();
  console.log('✅ Created categories');

  // Create products
  const products = [
    {
      name: 'Chipa',
      slug: 'chipa',
      description: 'Tradicional pan de queso paraguayo',
      price: 5000,
      stock: 100,
      categoryId: categoryList[0].id
    },
    {
      name: 'Sopa Paraguaya',
      slug: 'sopa-paraguaya',
      description: 'Deliciosa torta de maíz',
      price: 15000,
      stock: 50,
      categoryId: categoryList[0].id
    },
    {
      name: 'Tereré Set Completo',
      slug: 'terere-set',
      description: 'Guampa, bombilla y yerbera',
      price: 125000,
      stock: 25,
      categoryId: categoryList[1].id
    }
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: [
            {
              url: `/images/${productData.slug}.jpg`,
              alt: productData.name,
              order: 0
            }
          ]
        }
      }
    });
  }

  console.log('✅ Created products');

  // Create address
  await prisma.address.create({
    data: {
      userId: customer.id,
      street: 'Av. España 123',
      city: 'Asunción',
      state: 'Central',
      zipCode: '1234',
      country: 'Paraguay',
      isDefault: true
    }
  });

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```json
// package.json
{
  "scripts": {
    "db:seed": "ts-node prisma/seed.ts"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

---

## 4.5 Performance Optimization

### Indexing

```prisma
model Product {
  id   String @id
  name String
  slug String @unique

  @@index([name]) // Speed up name searches
  @@index([slug]) // Speed up slug lookups
  @@index([categoryId, price]) // Composite index
}
```

---

### Query Optimization

```typescript
// ❌ BAD: N+1 Query Problem
const orders = await prisma.order.findMany();
for (const order of orders) {
  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id }
  });
}

// ✅ GOOD: Single Query with Include
const orders = await prisma.order.findMany({
  include: {
    items: {
      include: {
        product: true
      }
    }
  }
});
```

---

### Pagination

```typescript
// Cursor-based pagination (better for large datasets)
const products = await prisma.product.findMany({
  take: 20,
  skip: 1, // Skip cursor
  cursor: {
    id: lastProductId
  },
  orderBy: {
    id: 'asc'
  }
});
```

---

## Week 7 Exercises

### Exercise 4.1: E-Commerce Schema (90 min)

**Objective**: Design complete e-commerce database

**Tasks**:
1. Create full Prisma schema (30 min)
2. Run migrations (10 min)
3. Create seed script (30 min)
4. Test relationships (20 min)

**Deliverable**: Complete database schema

---

### Exercise 4.2: Complex Queries (120 min)

**Objective**: Implement advanced queries

**Tasks**:
1. Product search with filters (35 min)
2. Order aggregations (25 min)
3. User purchase history (30 min)
4. Category statistics (30 min)

**Deliverable**: Query library

---

### Exercise 4.3: Order Processing (90 min)

**Objective**: Build transactional order system

**Tasks**:
1. Create order transaction (40 min)
2. Update stock levels (20 min)
3. Handle payment (20 min)
4. Test rollback scenarios (10 min)

**Deliverable**: Working order system

---

## Knowledge Check Quiz

1. **What's a database transaction?**
   a) A sale
   b) A group of operations that succeed or fail together
   c) A table
   d) A query

2. **Why use indexes?**
   a) To make tables prettier
   b) To speed up queries
   c) To save space
   d) To delete data

3. **What's the N+1 query problem?**
   a) N queries followed by 1 query
   b) Making multiple separate queries instead of one with joins
   c) Having N+1 tables
   d) A math error

4. **What does seed.ts do?**
   a) Plants seeds
   b) Populates database with initial data
   c) Deletes data
   d) Creates schemas

5. **What's soft delete?**
   a) Gentle deletion
   b) Marking records as deleted without removing them
   c) Slow deletion
   d) Easy deletion

**Answer Key**: [1-b, 2-b, 3-b, 4-b, 5-b]

---

## Week 7 Summary

### Key Concepts
- ✅ Advanced schema design
- ✅ Complex queries and filtering
- ✅ Database transactions
- ✅ Seeding and migrations
- ✅ Performance optimization
- ✅ Soft deletes

### Skills Developed
- ✅ Design efficient schemas
- ✅ Write complex queries
- ✅ Use transactions
- ✅ Optimize performance
- ✅ Seed databases
- ✅ Handle relationships

---

**Next Module**: [Web Track Module 5 - Deployment & DevOps](./WEB-TRACK-MODULE-05.md)
