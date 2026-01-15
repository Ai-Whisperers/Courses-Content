# Web Dev Track Module 3: Backend & API Development
## FPUNA Summer 2026 - Week 6 (Web Development Specialization)

**Duration**: 10 hours (Week 6 of program)  
**Tool Focus**: Next.js API Routes + Prisma + OpenCode  
**Prerequisites**: Core Modules 1-6, Web Modules 1-2 completed

---

## Module Overview

You've built frontends and basic APIs. This week, you'll master professional backend development: designing RESTful APIs, implementing authentication, handling file uploads, managing background jobs, caching strategies, and securing your applications. You'll use OpenCode to rapidly build production-grade backend systems.

### Learning Objectives

1. **Design** RESTful API architectures
2. **Implement** authentication with NextAuth.js
3. **Handle** file uploads and cloud storage
4. **Build** middleware for validation and error handling
5. **Implement** caching strategies
6. **Secure** APIs against common vulnerabilities
7. **Create** background job processing

---

## 3.1 RESTful API Design

### API Design Principles

**Good API Design**:
- Predictable endpoints
- Proper HTTP methods
- Meaningful status codes
- Consistent response format
- Clear error messages

---

### Standard Response Format

```typescript
// src/lib/api-response.ts
export class APIResponse {
  static success<T>(data: T, message?: string) {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    };
  }

  static error(message: string, errors?: any, statusCode: number = 500) {
    return {
      success: false,
      error: message,
      errors,
      statusCode,
      timestamp: new Date().toISOString()
    };
  }

  static paginated<T>(data: T[], page: number, limit: number, total: number) {
    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total
      },
      timestamp: new Date().toISOString()
    };
  }
}
```

---

### Complete CRUD Implementation

```typescript
// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { APIResponse } from '@/lib/api-response';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string(),
  imageUrl: z.string().url().optional(),
});

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json(
      APIResponse.paginated(products, page, limit, total)
    );
  } catch (error) {
    return NextResponse.json(
      APIResponse.error('Failed to fetch products', error),
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = productSchema.parse(body);

    const product = await prisma.product.create({
      data: validatedData
    });

    return NextResponse.json(
      APIResponse.success(product, 'Product created successfully'),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        APIResponse.error('Validation failed', error.errors),
        { status: 400 }
      );
    }

    return NextResponse.json(
      APIResponse.error('Failed to create product', error),
      { status: 500 }
    );
  }
}

// src/app/api/products/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!product) {
      return NextResponse.json(
        APIResponse.error('Product not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(APIResponse.success(product));
  } catch (error) {
    return NextResponse.json(
      APIResponse.error('Failed to fetch product', error),
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = productSchema.partial().parse(body);

    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: validatedData
    });

    return NextResponse.json(
      APIResponse.success(product, 'Product updated successfully')
    );
  } catch (error) {
    return NextResponse.json(
      APIResponse.error('Failed to update product', error),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: parseInt(params.id) }
    });

    return NextResponse.json(
      APIResponse.success(null, 'Product deleted successfully'),
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json(
      APIResponse.error('Failed to delete product', error),
      { status: 500 }
    );
  }
}
```

---

## 3.2 Authentication with NextAuth.js

### Installation

```bash
npm install next-auth @prisma/client bcryptjs
npm install -D @types/bcryptjs
```

---

### Prisma Schema for Auth

```prisma
// prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String
  image         String?
  role          String    @default("user")
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

### NextAuth Configuration

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
});

export { handler as GET, handler as POST };
```

---

### Protected API Routes

```typescript
// src/lib/auth.ts
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function requireAuth(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return session;
}

export async function requireAdmin(request: NextRequest) {
  const session = await getServerSession();

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  return session;
}

// Usage in route
// src/app/api/admin/products/route.ts
export async function POST(request: NextRequest) {
  const session = await requireAdmin(request);
  if (session instanceof NextResponse) return session;

  // Admin-only logic here
}
```

---

## 3.3 File Upload Handling

### Using Uploadthing (Recommended)

```bash
npm install uploadthing @uploadthing/react
```

```typescript
// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Auth check
      const session = await getServerSession();
      if (!session) throw new Error('Unauthorized');

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('File URL:', file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// src/app/api/uploadthing/route.ts
import { createNextRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from './core';

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
```

```typescript
// src/components/ImageUpload.tsx
'use client';

import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

export function ImageUpload({ onUploadComplete }) {
  return (
    <UploadButton<OurFileRouter>
      endpoint="productImage"
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
```

---

## 3.4 Caching Strategies

### In-Memory Caching

```typescript
// src/lib/cache.ts
class SimpleCache {
  private cache = new Map<string, { data: any; expiry: number }>();

  set(key: string, data: any, ttlSeconds: number = 300) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlSeconds * 1000
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export const cache = new SimpleCache();

// Usage
export async function GET() {
  const cacheKey = 'products:all';
  
  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  // Fetch from database
  const products = await prisma.product.findMany();

  // Cache for 5 minutes
  cache.set(cacheKey, products, 300);

  return NextResponse.json(products);
}
```

---

## Week 6 Exercises

### Exercise 3.1: Complete Auth System (120 min)

**Objective**: Implement full authentication

**Tasks**:
1. Set up NextAuth with Prisma (30 min)
2. Create registration endpoint (25 min)
3. Build login/logout pages (35 min)
4. Add protected routes (20 min)
5. Implement role-based access (10 min)

**Deliverable**: Working auth system

---

### Exercise 3.2: File Upload API (90 min)

**Objective**: Build image upload system

**Tasks**:
1. Set up Uploadthing (20 min)
2. Create upload component (25 min)
3. Connect to product form (25 min)
4. Add image preview (20 min)

**Deliverable**: Working file uploads

---

### Exercise 3.3: API with Caching (90 min)

**Objective**: Implement caching layer

**Tasks**:
1. Create cache utility (20 min)
2. Add caching to products API (25 min)
3. Implement cache invalidation (25 min)
4. Add cache headers (20 min)

**Deliverable**: Cached API endpoints

---

## Knowledge Check Quiz

1. **What's a RESTful API?**
   a) An API that uses REST commands
   b) An API following REST architectural constraints
   c) An API for resting computers
   d) A sleeping API

2. **What does NextAuth.js provide?**
   a) Next.js themes
   b) Authentication and session management
   c) Database connections
   d) CSS styling

3. **Why use caching?**
   a) To save disk space
   b) To reduce database queries and improve performance
   c) To hide data
   d) To make code slower

4. **What HTTP status code indicates success for resource creation?**
   a) 200
   b) 201
   c) 204
   d) 301

5. **What's middleware used for?**
   a) Medium-sized software
   b) Request/response processing and validation
   c) Database queries
   d) CSS styling

**Answer Key**: [1-b, 2-b, 3-b, 4-b, 5-b]

---

## Week 6 Summary

### Key Concepts
- ✅ RESTful API design
- ✅ Authentication with NextAuth
- ✅ File upload handling
- ✅ Caching strategies
- ✅ API security
- ✅ Error handling

### Skills Developed
- ✅ Design robust APIs
- ✅ Implement authentication
- ✅ Handle file uploads
- ✅ Optimize with caching
- ✅ Secure endpoints
- ✅ Build production APIs

---

**Next Module**: [Web Track Module 4 - Database & Data Management](./WEB-TRACK-MODULE-04.md)
