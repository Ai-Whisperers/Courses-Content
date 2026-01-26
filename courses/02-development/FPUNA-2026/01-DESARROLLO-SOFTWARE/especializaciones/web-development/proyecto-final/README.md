# Capstone Project: Mercado FPUNA

## E-Commerce Platform for FPUNA Community

Build a complete, production-ready e-commerce platform where FPUNA students and faculty can buy and sell products.

**Time**: 20 hours (extra-class)  
**Team**: Individual project  
**Weight**: 50% of final grade

---

## Project Overview

**Mercado FPUNA** is a full-stack e-commerce application that demonstrates mastery of all concepts from Modules 01-05.

### Key Features

#### Public Features
- Product catalog with search and filters
- Product detail pages
- Shopping cart
- Checkout process
- User registration and login
- Responsive design

#### Seller Features
- Seller dashboard
- Product management (CRUD)
- Order management
- Sales analytics

#### Admin Features
- Admin panel
- User management
- Category management
- Platform statistics

---

## Technical Requirements

### Stack (Mandatory)

- **Next.js 14** (App Router)
- **TypeScript**
- **Prisma + PostgreSQL**
- **NextAuth.js v5**
- **Tailwind CSS + shadcn/ui**
- **Zod validation**
- **Deployed on Vercel**

---

## Database Schema

```prisma
model User {
  id      Int       @id @default(autoincrement())
  email   String    @unique
  name    String
  role    Role      @default(USER)
  products Product[]
  orders   Order[]
}

enum Role {
  USER
  SELLER
  ADMIN
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  description String
  price       Int       // In guaraníes
  stock       Int
  categoryId  Int
  category    Category  @relation(fields: [categoryId], references: [id])
  sellerId    Int
  seller      User      @relation(fields: [sellerId], references: [id])
}

model Category {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  products Product[]
}

model Order {
  id      Int         @id @default(autoincrement())
  userId  Int
  user    User        @relation(fields: [userId], references: [id])
  items   OrderItem[]
  total   Int
  status  OrderStatus @default(PENDING)
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  order     Order   @relation(fields: [orderId], references: [id])
  productId Int
  quantity  Int
  price     Int
}
```

---

## Grading Rubric

| Category | Points | Details |
|----------|--------|---------|
| **Functionality** | 50 | All features work |
| **Code Quality** | 15 | Clean, typed code |
| **Database** | 10 | Proper schema |
| **Auth** | 10 | Secure, role-based |
| **UI/UX** | 10 | Professional, responsive |
| **Deployment** | 5 | Live on Vercel |
| **Total** | **100** | |

### Scale

- **90-100**: Excelente
- **80-89**: Muy Bueno  
- **70-79**: Bueno
- **60-69**: Suficiente
- **<60**: Insuficiente

---

## Deliverables

1. **GitHub Repository** (public)
2. **Live URL** (Vercel)
3. **README** with setup instructions
4. **Video Demo** (5 min)
5. **Screenshots**

---

## Milestones

**Week 1**: Database + Auth  
**Week 2**: Core Features  
**Week 3**: Polish + Deploy

---

## Bonus Features (+20 points)

- [ ] Image Upload (+5)
- [ ] Email Notifications (+5)
- [ ] Analytics Dashboard (+5)
- [ ] Product Reviews (+5)
- [ ] Dark Mode (+3)
- [ ] PWA (+5)

---

## Support

- **Office Hours**: Tue/Thu 6-7 PM
- **Slack**: #capstone-projects
- **Check-ins**: Every Friday

---

## Submission

**Due**: End of Week 3  
**Submit**: GitHub + Vercel URLs via course form

---

## Navigation

- [← Module 05](../modules/05-deployment-ai/README.md)
- [← Track README](../README.md)
- [📋 Rubric Details](./rubrica.md)
