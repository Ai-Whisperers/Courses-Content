# Web Track Capstone Projects
## FPUNA Summer 2026 - Full-Stack Development Capstone Options

**Duration**: 20 hours across Weeks 9-10  
**Track**: Web Development Specialization  
**Prerequisites**: Web Track Modules 1-5 completed

---

## Project Overview

Web track students will build a complete, production-ready full-stack application using Next.js 14, TypeScript, Prisma, and modern web technologies. Your project must demonstrate mastery of frontend and backend development, database design, authentication, deployment, and AI-augmented development with OpenCode.

---

## Option 1: E-Commerce Platform "Mercado Paraguay" ⭐ **Recommended**

### Description
Build a full-featured e-commerce platform selling Paraguayan products with complete shopping cart, checkout, and admin functionality.

### Required Features

#### User Features
- **Authentication & Authorization**
  - Email/password registration and login
  - Social login (Google/Facebook optional)
  - Email verification
  - Password reset
  - User roles (customer, admin)

- **Product Catalog**
  - Product listing with pagination
  - Category filtering
  - Search functionality
  - Product details page
  - Product reviews and ratings
  - Related products suggestions

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Cart persistence (localStorage + database)
  - Cart summary with totals
  - Coupon code application

- **Checkout Process**
  - Multi-step checkout form
  - Shipping address management
  - Payment method selection
  - Order summary
  - Order confirmation

- **User Dashboard**
  - Order history
  - Order tracking
  - Profile management
  - Address book
  - Favorite products

#### Admin Features
- **Product Management**
  - CRUD operations
  - Image upload
  - Inventory management
  - Category management
  - Bulk operations

- **Order Management**
  - View all orders
  - Update order status
  - Process refunds
  - Generate invoices

- **Analytics Dashboard**
  - Sales overview
  - Top products
  - Revenue charts
  - Customer insights

### Technical Requirements

**Frontend**:
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- React Hook Form + Zod validation
- Zustand for state management
- Server and Client Components
- Image optimization
- Responsive design

**Backend**:
- Next.js API Routes
- Prisma ORM
- PostgreSQL database
- File upload (Uploadthing)
- Email notifications (Resend)
- Payment integration (Stripe test mode)

**Database Schema**:
```prisma
model User {
  id       String    @id @default(cuid())
  email    String    @unique
  password String
  name     String
  role     Role      @default(CUSTOMER)
  orders   Order[]
  cart     Cart?
  reviews  Review[]
  addresses Address[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Int
  stock       Int
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  images      ProductImage[]
  reviews     Review[]
  orderItems  OrderItem[]
}

model Order {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  items     OrderItem[]
  total     Int
  status    OrderStatus
  createdAt DateTime @default(now())
}

// ... more models
```

### Deliverables
1. Deployed full-stack application
2. Complete source code on GitHub
3. Comprehensive documentation
4. Admin demo account
5. Test customer accounts
6. OpenCode usage report
7. 10-minute presentation

---

## Option 2: Task Management System "Tarea PY"

### Description
Build a collaborative task management platform for teams (similar to Trello/Asana) with real-time updates.

### Required Features

#### Core Features
- **Project Management**
  - Create/edit/delete projects
  - Project dashboard
  - Team member management
  - Project settings

- **Task Management**
  - Create tasks with rich descriptions
  - Assign to team members
  - Set due dates and priorities
  - Task status (To Do, In Progress, Done)
  - Subtasks and checklists
  - File attachments
  - Comments and mentions

- **Board Views**
  - Kanban board (drag-and-drop)
  - List view
  - Calendar view
  - Timeline/Gantt view

- **Collaboration**
  - Real-time updates (Server-Sent Events)
  - Activity feed
  - @mentions and notifications
  - Team chat

- **User Features**
  - Personal dashboard
  - My tasks view
  - Notifications center
  - Profile settings

#### Admin Features
- Workspace management
- Team analytics
- Usage statistics
- User management

### Technical Highlights
- Real-time updates with SSE
- Drag-and-drop with dnd-kit
- Rich text editor (Tiptap)
- Calendar integration
- File upload handling
- Notification system

### Deliverables
Same as Option 1, plus:
- Real-time feature demonstration
- Collaboration workflow video

---

## Option 3: Social Learning Platform "Ñandutí Learn"

### Description
Educational platform where users can create and take courses, with video lessons, quizzes, and progress tracking.

### Required Features

#### Student Features
- **Course Discovery**
  - Browse courses
  - Search and filtering
  - Course details and preview
  - Enrollment

- **Learning Experience**
  - Video player with progress tracking
  - Lesson notes
  - Downloadable resources
  - Quizzes and assessments
  - Discussion forums

- **Progress Tracking**
  - Course completion percentage
  - Certificates of completion
  - Learning path recommendations

#### Instructor Features
- **Course Creation**
  - Course builder interface
  - Video upload
  - Lesson organization
  - Quiz creation
  - Resource uploads

- **Student Management**
  - Enrolled students list
  - Progress monitoring
  - Q&A management
  - Grading

- **Analytics**
  - Course performance
  - Student engagement
  - Revenue tracking

### Technical Highlights
- Video streaming (Cloudinary/Mux)
- Quiz engine
- Certificate generation (PDF)
- Analytics dashboard
- Payment integration for courses

---

## Option 4: Property Rental Platform "Alquila PY"

### Description
Airbnb-style platform for renting properties in Paraguay with booking system and host management.

### Required Features

#### Guest Features
- **Property Search**
  - Advanced filters (location, price, amenities)
  - Map view integration
  - Property details with photo gallery
  - Availability calendar

- **Booking System**
  - Date selection
  - Guest count
  - Price calculation
  - Booking confirmation
  - Payment processing

- **User Dashboard**
  - My trips
  - Booking management
  - Reviews and ratings

#### Host Features
- **Listing Management**
  - Create/edit listings
  - Photo management
  - Pricing and availability
  - House rules

- **Booking Management**
  - Incoming requests
  - Approve/decline
  - Calendar management

- **Host Analytics**
  - Earnings
  - Booking statistics
  - Guest reviews

### Technical Highlights
- Interactive maps (Mapbox/Google Maps)
- Date range picker
- Payment integration
- Image gallery
- Review system

---

## Option 5: Inventory Management System "Stock Master PY"

### Description
Complete inventory management system for small businesses with stock tracking, orders, and reporting.

### Required Features

#### Inventory Management
- **Products**
  - CRUD with categories
  - Stock levels
  - Low stock alerts
  - Batch operations
  - Barcode integration

- **Suppliers**
  - Supplier management
  - Purchase orders
  - Supplier performance

- **Stock Movements**
  - Stock in/out
  - Stock adjustments
  - Transfer between locations
  - Movement history

#### Orders & Sales
- **Sales Orders**
  - Create orders
  - Invoice generation
  - Payment tracking
  - Order fulfillment

- **Purchase Orders**
  - Create POs
  - Receive goods
  - Supplier invoices

#### Reporting
- **Reports**
  - Stock valuation
  - Sales reports
  - Purchase reports
  - Profit/loss
  - Export to Excel

### Technical Highlights
- PDF generation
- Excel export
- Charts and visualizations
- Barcode scanning
- Multi-location support

---

## Common Requirements (All Projects)

### Technical Stack

**Required**:
- Next.js 14 (App Router)
- TypeScript
- Prisma + PostgreSQL
- Tailwind CSS
- NextAuth.js
- React Hook Form + Zod

**Recommended**:
- Zustand (state management)
- Uploadthing (file uploads)
- Resend (emails)
- Vercel (deployment)
- Sentry (error tracking)

### Project Structure
```
src/
├── app/                   # Next.js App Router
│   ├── (auth)/           # Auth routes
│   ├── (dashboard)/      # Protected routes
│   ├── api/              # API routes
│   └── layout.tsx
├── components/           # React components
│   ├── ui/              # Reusable UI
│   └── features/        # Feature components
├── lib/                 # Utilities
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
├── store/               # Zustand stores
├── types/               # TypeScript types
└── hooks/               # Custom hooks

prisma/
├── schema.prisma
├── seed.ts
└── migrations/
```

### Required Documentation

**README.md**:
```markdown
# [Project Name]

## Overview
Brief description

## Features
- Feature 1
- Feature 2
- ...

## Tech Stack
- Next.js 14
- PostgreSQL
- ...

## Quick Start
1. Clone repository
2. npm install
3. Set up .env
4. npx prisma migrate dev
5. npm run dev

## Deployment
Live at: [URL]

## Demo Accounts
- Admin: admin@example.com / password
- User: user@example.com / password
```

**ARCHITECTURE.md**: System design and decisions  
**API.md**: API endpoints documentation  
**DEPLOYMENT.md**: Deployment guide  
**JOURNAL.md**: Development process log

### OpenCode Usage Requirements

Document use of OpenCode for:
1. **Component Generation**
2. **API Route Creation**
3. **Database Schema Design**
4. **Form Implementation**
5. **Bug Debugging**

Track time saved vs manual development.

### Deployment Requirements

- **Production URL**: Live on Vercel
- **Database**: PostgreSQL on Railway/Supabase
- **File Storage**: Uploadthing/Cloudinary
- **Monitoring**: Vercel Analytics + Sentry
- **CI/CD**: GitHub Actions
- **Performance**: Lighthouse score > 90

### Testing Requirements

While not primary focus, include:
- Basic E2E tests for critical paths
- API endpoint tests
- Component tests (optional)

---

## Evaluation Criteria

**Web Track Specific**:
- **Full-Stack Implementation** (30%)
  - Frontend quality
  - Backend API design
  - Database schema
  
- **Feature Completeness** (20%)
  - All required features working
  - No critical bugs

- **Code Quality** (15%)
  - TypeScript usage
  - Code organization
  - Best practices

- **Deployment** (10%)
  - Live and accessible
  - Proper configuration
  - Performance

- **UI/UX** (10%)
  - Professional design
  - Responsive
  - User-friendly

- **Documentation** (10%)
  - Clear and complete
  - Easy to follow

- **Presentation** (5%)
  - Clear communication
  - Live demo

---

## Getting Started

### Week 9, Day 1: Project Setup

```bash
# Create Next.js project
npx create-next-app@latest my-capstone \
  --typescript \
  --tailwind \
  --app \
  --src-dir

cd my-capstone

# Install dependencies
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install react-hook-form zod @hookform/resolvers
npm install zustand
npm install uploadthing @uploadthing/react

# Set up Prisma
npx prisma init

# Set up Git
git init
git add .
git commit -m "Initial commit"
```

### Week 9, Day 2-4: Core Development

Focus on:
1. Database schema and migrations
2. Authentication system
3. Core features (products, orders, etc.)
4. API endpoints
5. Basic UI

### Week 9, Day 5: Polish & Deploy

1. Bug fixes
2. UI improvements
3. Deploy to Vercel
4. Test in production

### Week 10: Documentation & Presentation

1. Complete all documentation
2. Create presentation
3. Record demo video
4. Practice presentation

---

## Resources

**OpenCode Prompts**:
- Component generation examples
- API route templates
- Database schema help
- Bug debugging assistance

**Deployment Guides**:
- Vercel deployment docs
- Railway PostgreSQL setup
- Environment variables guide

**UI Libraries**:
- shadcn/ui components
- Tailwind UI
- Headless UI

---

## Success Tips

1. **Start Simple**: Build core features first, add polish later
2. **Deploy Early**: Deploy on Day 1, iterate from there
3. **Use OpenCode**: Generate boilerplate, refine manually
4. **Test Continuously**: Don't wait until the end
5. **Document as You Build**: Don't leave it for last
6. **Ask for Help**: Use office hours and Slack
7. **Make It Beautiful**: Design matters for web projects
8. **Demo Well**: Practice your live demo multiple times

---

**Ready to build your full-stack masterpiece?** Choose your project and start coding!
