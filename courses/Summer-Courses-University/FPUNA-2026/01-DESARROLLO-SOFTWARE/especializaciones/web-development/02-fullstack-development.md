# Module 02: Full-Stack Development with Prisma

## Overview

Build complete backend functionality using Prisma ORM, PostgreSQL, and Next.js API Routes. Learn database schema design, CRUD operations, and Server Actions.

**Duration**: 4 hours  
**Level**: Intermediate  
**Prerequisites**: Module 01 completed

---

## Learning Objectives

1. Set up Prisma with PostgreSQL database
2. Design relational database schemas
3. Create API Routes in Next.js
4. Implement CRUD operations
5. Use Server Actions for forms
6. Handle data validation with Zod

---

## Why Prisma?

**Prisma** is a modern ORM that provides:
- Type-safe database access
- Auto-generated TypeScript types
- Intuitive schema definition
- Built-in migrations
- Excellent developer experience

**Companies using Prisma**: Vercel, Swell, Typefully, thousands of startups

---

## Module Structure

### [01 - Prisma Setup](./content/01-prisma-setup.md) (45 min)
- Install Prisma
- Connect to PostgreSQL (Neon)
- Prisma schema basics
- Generate client

### [02 - Database Schema Design](./content/02-database-schema.md) (50 min)
- Models and fields
- Relations (one-to-many, many-to-many)
- Migrations
- Seeding data

### [03 - API Routes](./content/03-api-routes.md) (50 min)
- Creating API endpoints
- GET, POST, PUT, DELETE
- Request/Response handling
- Error handling

### [04 - Server Actions](./content/04-server-actions.md) (50 min)
- What are Server Actions
- Form handling without API routes
- Progressive enhancement
- Revalidation

### [05 - CRUD Operations](./content/05-crud-operations.md) (45 min)
- Create, Read, Update, Delete
- Full implementation
- Data validation with Zod
- Best practices

---

## What You'll Build

**E-Commerce Backend** with:
- Product management (CRUD)
- Category system
- Database with relationships
- API endpoints
- Admin forms with Server Actions
- Data validation

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Prisma** | ORM | 5.x |
| **PostgreSQL** | Database | 15+ |
| **Neon** | DB Hosting | Free tier |
| **Zod** | Validation | 3.x |
| **Next.js API Routes** | Backend endpoints | 14.x |
| **Server Actions** | Form handling | 14.x |

---

## Getting Started

**👉 [Start Section 01: Prisma Setup](./content/01-prisma-setup.md)**

---

## Navigation

- [← Back to Track](../../README.md)
- [← Previous Module](../01-nextjs-foundations/README.md)
- [→ Section 01](./content/01-prisma-setup.md)
- [📝 Exercise](./EXERCISE.md)
