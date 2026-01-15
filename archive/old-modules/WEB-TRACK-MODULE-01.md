# Web Dev Track Module 1: Full-Stack Foundations with AI
## FPUNA Summer 2026 - Week 4 (Web Development Specialization)

**Duration**: 10 hours (Week 4 of program)  
**Tool Focus**: Next.js 14 + TypeScript + OpenCode  
**Prerequisites**: Core Modules 1-6 completed

---

## Module Overview

Welcome to the Web Development specialization track! You've mastered OpenCode fundamentals—now you'll apply them to build modern, production-ready web applications. This week, you'll learn the complete

 stack: Next.js for frontend and backend, TypeScript for type safety, Prisma for database access, and how OpenCode accelerates every step of development.

### Learning Objectives

By the end of this week, you will be able to:

1. **Set up** a modern Next.js 14 project with App Router
2. **Build** server and client components with React
3. **Create** API routes for backend functionality
4. **Integrate** databases with Prisma ORM
5. **Implement** authentication with NextAuth.js
6. **Style** applications with Tailwind CSS
7. **Leverage** OpenCode for rapid full-stack development

---

## Why This Tech Stack?

### The Modern Web Development Reality

```
Traditional Stack (2020):
Frontend: React (separate app)
Backend: Express/Node (separate server)
Database: Manual SQL queries
Deployment: Multiple services

Modern Stack (2026):
Frontend + Backend: Next.js (unified)
Database: Prisma ORM (type-safe)
Styling: Tailwind CSS (utility-first)
Deployment: Vercel (one-click)
```

**Industry Adoption**:
- Next.js powers: Netflix, TikTok, Hulu, Twitch, Nike
- 71% of React developers use or want to use Next.js
- Average salary for Next.js developers: $110,000+ USD
- Fastest-growing web framework 3 years running

---

## 1.1 Setting Up Your Development Environment

### Prerequisites Check

Before starting, ensure you have:

- [ ] **Node.js 20+**: `node --version` should show v20 or higher
- [ ] **Git**: `git --version` should work
- [ ] **VS Code**: Recommended editor
- [ ] **OpenCode**: Installed and configured
- [ ] **PostgreSQL** (optional): For local database

---

### Creating Your First Next.js Project

**With OpenCode:**

```
Prompt to OpenCode:

Create a new Next.js 14 project with the following specifications:

Project Name: fpuna-ecommerce
Features:
- App Router (not Pages Router)
- TypeScript
- ESLint
- Tailwind CSS
- src/ directory structure
- App directory for routing

After creation:
- Initialize git repository
- Create initial commit
- Show me the folder structure
```

**Manual Alternative:**

```bash
# Create Next.js project with App Router
npx create-next-app@latest fpuna-ecommerce \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Navigate to project
cd fpuna-ecommerce

# Initialize git
git init
git add .
git commit -m "Initial commit: Next.js 14 setup"

# Start development server
npm run dev
```

**Verify Installation:**
- Open http://localhost:3000
- You should see the Next.js welcome page
- Hot reload should work (edit `app/page.tsx` and see changes)

---

### Understanding the Project Structure

```
fpuna-ecommerce/
├── src/
│   ├── app/                    # App Router (routing + pages)
│   │   ├── layout.tsx          # Root layout (wraps all pages)
│   │   ├── page.tsx            # Homepage (/)
│   │   ├── globals.css         # Global styles
│   │   └── api/                # API routes
│   │       └── hello/
│   │           └── route.ts    # /api/hello endpoint
│   ├── components/             # Reusable React components
│   └── lib/                    # Utility functions, configs
├── public/                     # Static assets (images, fonts)
├── .env                        # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

**Key Concepts**:
- **App Router**: File-system based routing (`app/about/page.tsx` → `/about`)
- **Server Components**: React components that render on the server (default)
- **Client Components**: Interactive components that run in browser (use `'use client'`)
- **API Routes**: Backend endpoints (`app/api/*/route.ts`)

---

## 1.2 React Server Components

### What are Server Components?

**Server Components** (default in Next.js 14) render on the server and send HTML to the browser.

**Benefits**:
- ⚡ Faster initial load (no JS needed for rendering)
- 📦 Smaller bundle size (server code doesn't ship to client)
- 🔒 Secure (can directly query databases, use API keys)
- 🎯 SEO-friendly (search engines see content immediately)

**When to Use**:
- Fetching data from databases or APIs
- Displaying static content
- Large dependencies that don't need client interactivity

---

### Creating a Server Component

```typescript
// src/app/products/page.tsx
import { Suspense } from 'react';

// This is a SERVER component (default)
export default async function ProductsPage() {
  // Server-side data fetching (no useEffect needed!)
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
      
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}

// Server-side fetch (can access database directly)
async function fetchProducts() {
  // In real app, this would be Prisma query:
  // return await prisma.product.findMany();
  
  return [
    { id: 1, name: 'Chipa', price: 5000, image: '/chipa.jpg' },
    { id: 2, name: 'Sopa Paraguaya', price: 15000, image: '/sopa.jpg' },
    { id: 3, name: 'Tereré Set', price: 25000, image: '/terere.jpg' }
  ];
}

// Loading state while data fetches
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-lg"></div>
          <div className="h-4 bg-gray-300 rounded mt-4"></div>
          <div className="h-4 bg-gray-300 rounded mt-2 w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
```

---

### Using OpenCode to Generate Components

**Prompt**:
```
Create a server component for displaying a list of products:

Component: ProductGrid
Location: src/components/ProductGrid.tsx

Requirements:
- TypeScript with proper types
- Display products in responsive grid (1 col mobile, 3 cols desktop)
- Each product card shows: image, name, price (in Guaraníes ₲), description
- Use Tailwind CSS for styling
- Include hover effects
- Products prop is array of {id, name, price, description, imageUrl}
- Price should be formatted with thousand separators

Make it look modern and professional.
```

---

## 1.3 Client Components

### When You Need Client Components

Use `'use client'` directive when you need:
- Event handlers (`onClick`, `onChange`, etc.)
- React hooks (`useState`, `useEffect`, etc.)
- Browser APIs (`localStorage`, `window`, etc.)
- Third-party libraries that use browser features

---

### Creating a Client Component

```typescript
// src/components/AddToCartButton.tsx
'use client';  // This directive makes it a client component

import { useState } from 'react';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
}

export function AddToCartButton({ productId, productName }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    setIsAdding(true);
    
    try {
      // Call API to add to cart
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 })
      });

      if (response.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdding}
      className={`
        px-6 py-3 rounded-lg font-semibold transition-all
        ${added 
          ? 'bg-green-500 text-white' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
        }
        ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {added ? '✓ Agregado' : isAdding ? 'Agregando...' : 'Agregar al Carrito'}
    </button>
  );
}
```

---

### Composing Server + Client Components

```typescript
// src/app/products/[id]/page.tsx (SERVER component)
import { AddToCartButton } from '@/components/AddToCartButton';

export default async function ProductDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Server-side data fetch
  const product = await fetchProductById(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Server-rendered content */}
        <div>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-700 mb-4">
            ₲ {product.price.toLocaleString('es-PY')}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Client component for interactivity */}
          <AddToCartButton 
            productId={product.id} 
            productName={product.name}
          />
        </div>
      </div>
    </div>
  );
}
```

---

## 1.4 API Routes (Backend)

### Creating API Endpoints

Next.js allows you to create backend APIs using **Route Handlers**.

```typescript
// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    // In real app, fetch from database
    const products = [
      { id: 1, name: 'Chipa', price: 5000, category: 'Comida Típica' },
      { id: 2, name: 'Tereré', price: 3000, category: 'Bebidas' },
      { id: 3, name: 'Sopa Paraguaya', price: 15000, category: 'Comida Típica' }
    ];

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // In real app, save to database
    const newProduct = {
      id: Date.now(),
      name: body.name,
      price: body.price,
      category: body.category || 'General'
    };

    return NextResponse.json(
      { product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

---

### Dynamic API Routes

```typescript
// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/products/123
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // In real app: const product = await prisma.product.findUnique({ where: { id } });
  const product = {
    id: parseInt(id),
    name: 'Chipa',
    price: 5000,
    description: 'Delicioso chipa paraguayo',
    category: 'Comida Típica'
  };

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ product });
}

// PUT /api/products/123
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  // Update product in database
  const updatedProduct = {
    id: parseInt(id),
    ...body
  };

  return NextResponse.json({ product: updatedProduct });
}

// DELETE /api/products/123
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Delete from database
  
  return NextResponse.json({ message: 'Product deleted successfully' });
}
```

---

### OpenCode Prompt for API Generation

**Prompt**:
```
Generate a complete CRUD API for products:

Location: src/app/api/products/

Endpoints:
- GET /api/products - List all products
- POST /api/products - Create product
- GET /api/products/[id] - Get single product
- PUT /api/products/[id] - Update product
- DELETE /api/products/[id] - Delete product

Requirements:
- TypeScript with proper types
- Input validation
- Error handling (400, 404, 500)
- Response status codes
- Use NextResponse
- Include comments explaining each endpoint

Product Type:
{
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl: string;
  createdAt: Date;
}

For now, use in-memory array instead of database.
Include Paraguayan product examples.
```

---

## 1.5 Database Integration with Prisma

### What is Prisma?

**Prisma** is a modern ORM (Object-Relational Mapping) that makes database access type-safe and easy.

**Benefits**:
- 🎯 Type-safe database queries
- 🚀 Auto-completion in IDE
- 📝 Database schema as code
- 🔄 Easy migrations
- 🗄️ Supports PostgreSQL, MySQL, SQLite, MongoDB

---

### Setting Up Prisma

```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma (creates prisma/ folder)
npx prisma init --datasource-provider sqlite

# This creates:
# - prisma/schema.prisma (database schema)
# - .env (environment variables)
```

---

### Defining Your Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  role      String   @default("user")
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  price       Int
  category    String
  imageUrl    String
  inStock     Boolean  @default(true)
  orderItems  OrderItem[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id        Int         @id @default(autoincrement())
  userId    Int
  user      User        @relation(fields: [userId], references: [id])
  total     Int
  status    String      @default("pending")
  items     OrderItem[]
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  order     Order   @relation(fields: [orderId], references: [id])
  productId Int
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Int
}
```

---

### Running Migrations

```bash
# Create migration and apply to database
npx prisma migrate dev --name init

# This:
# 1. Creates SQL migration file
# 2. Applies migration to database
# 3. Generates Prisma Client
```

---

### Using Prisma in API Routes

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

```typescript
// src/app/api/products/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        imageUrl: body.imageUrl || '/placeholder.jpg'
      }
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

---

## 1.6 Styling with Tailwind CSS

### Tailwind Basics

Tailwind is a **utility-first CSS framework**. Instead of writing custom CSS, you compose classes:

```html
<!-- Traditional CSS -->
<button class="primary-button">Click me</button>

<style>
.primary-button {
  background-color: blue;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
</style>

<!-- Tailwind CSS -->
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
  Click me
</button>
```

---

### Common Tailwind Classes

| Category | Examples |
|----------|----------|
| **Layout** | `flex`, `grid`, `block`, `hidden` |
| **Spacing** | `p-4` (padding), `m-2` (margin), `gap-4` |
| **Sizing** | `w-full`, `h-screen`, `max-w-lg` |
| **Typography** | `text-xl`, `font-bold`, `text-center` |
| **Colors** | `bg-blue-500`, `text-gray-700` |
| **Borders** | `border`, `rounded-lg`, `shadow-md` |
| **Responsive** | `md:flex` (flex on medium screens+) |
| **Hover/Focus** | `hover:bg-blue-700`, `focus:ring-2` |

---

### Example: Product Card

```typescript
// src/components/ProductCard.tsx
interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export function ProductCard({ name, price, imageUrl, description }: ProductCardProps) {
  return (
    <div className="
      bg-white rounded-lg shadow-md overflow-hidden
      transition-transform hover:scale-105
    ">
      {/* Image */}
      <img 
        src={imageUrl} 
        alt={name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ₲ {price.toLocaleString('es-PY')}
          </span>

          <button className="
            bg-blue-600 text-white px-4 py-2 rounded-lg
            hover:bg-blue-700 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500
          ">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Week 4 Practical Exercises

### Exercise 1.1: Build Product Listing Page (120 minutes)

**Objective**: Create a complete product listing feature

**Tasks**:

1. **Create Database Schema** (20 min):
   - Define Product model in Prisma
   - Run migration
   - Seed with 10 Paraguayan products

2. **Build API Endpoint** (30 min):
   - GET /api/products (list all)
   - Add filtering by category
   - Add sorting options

3. **Create Server Component** (35 min):
   - Products page at /products
   - Fetch from API
   - Display in responsive grid
   - Add loading state

4. **Style with Tailwind** (25 min):
   - Professional product cards
   - Responsive layout
   - Hover effects

5. **Test with OpenCode** (10 min):
   - Generate test data
   - Verify responsiveness
   - Check accessibility

**Deliverable**:
- Working /products page
- API returning products
- Styled product grid
- Database seeded

**Success Criteria**:
- ✅ Products display correctly
- ✅ Responsive on mobile/desktop
- ✅ Fast loading (< 1 second)
- ✅ Professional appearance

---

### Exercise 1.2: Add Interactive Features (90 minutes)

**Objective**: Implement client-side interactivity

**Tasks**:

1. **Shopping Cart Button** (30 min):
   - Create AddToCartButton client component
   - Handle click events
   - Show loading and success states
   - Use optimistic UI updates

2. **Search Functionality** (30 min):
   - Create SearchBar client component
   - Implement debounced search
   - Filter products client-side
   - Show search results count

3. **Category Filter** (30 min):
   - Create CategoryFilter component
   - Radio buttons for categories
   - Update product display on selection
   - URL state management

**Deliverable**:
- Interactive shopping cart
- Working search
- Category filtering

**Success Criteria**:
- ✅ Cart updates immediately
- ✅ Search debounces properly
- ✅ Filters work correctly
- ✅ Smooth user experience

---

### Exercise 1.3: Complete CRUD Operations (90 minutes)

**Objective**: Build admin panel for product management

**Tasks**:

1. **Create API Routes** (30 min):
   - POST /api/products (create)
   - PUT /api/products/[id] (update)
   - DELETE /api/products/[id] (delete)
   - Add validation

2. **Build Admin UI** (40 min):
   - /admin/products page
   - Product creation form
   - Edit modal
   - Delete confirmation

3. **Connect to API** (20 min):
   - Form submission handling
   - Success/error notifications
   - Refresh data after mutations

**Deliverable**:
- Complete CRUD API
- Admin interface
- Form validation

**Success Criteria**:
- ✅ Can create products
- ✅ Can edit products
- ✅ Can delete products
- ✅ Proper error handling

---

## Knowledge Check Quiz

1. **What's the main benefit of Server Components?**
   a) They're faster to write
   b) They reduce JavaScript sent to the browser
   c) They don't need React
   d) They work without Node.js

2. **When should you use 'use client'?**
   a) For all components
   b) When you need event handlers or hooks
   c) For server-side rendering
   d) For API routes

3. **Where do API routes go in Next.js 14 App Router?**
   a) pages/api/
   b) app/api/
   c) src/api/
   d) api/

4. **What does Prisma provide?**
   a) CSS framework
   b) Type-safe database access
   c) Authentication
   d) Server hosting

5. **What's the Tailwind approach?**
   a) Write custom CSS files
   b) Use utility classes
   c) Inline styles only
   d) No styling needed

**Answer Key**: [1-b, 2-b, 3-b, 4-b, 5-b]

---

## Week 4 Summary

This week, you mastered:

### Key Concepts
- ✅ Next.js 14 App Router
- ✅ Server vs Client Components
- ✅ API Routes for backend
- ✅ Database integration with Prisma
- ✅ Styling with Tailwind CSS
- ✅ Full-stack development workflow

### Skills Developed
- ✅ Build React server components
- ✅ Create interactive client components
- ✅ Design RESTful APIs
- ✅ Work with databases type-safely
- ✅ Style modern UIs quickly
- ✅ Use OpenCode for full-stack tasks

### Practical Applications
- ✅ Complete product listing
- ✅ Interactive shopping features
- ✅ Admin CRUD operations
- ✅ Production-ready architecture

---

## Next Week: Module 2 - Advanced Frontend Development

**Week 5 Preview**:
- Advanced React patterns
- Form handling with React Hook Form
- State management with Zustand
- Real-time features with Server-Sent Events
- Image optimization
- Performance tuning

---

## Additional Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### Prisma
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with Next.js](https://www.prisma.io/nextjs)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

---

**Module Status**: ✅ Week 4 Complete

**Next Module**: [Web Track Module 2 - Advanced Frontend](./WEB-TRACK-MODULE-02.md)
