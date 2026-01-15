# Web Dev Track Module 5: Deployment & Production
## FPUNA Summer 2026 - Week 8 (Web Development Specialization)

**Duration**: 10 hours (Week 8 of program)  
**Tool Focus**: Vercel + Docker + OpenCode  
**Prerequisites**: Core Modules 1-6, Web Modules 1-4 completed

---

## Module Overview

Your application works locally—now make it production-ready! Learn deployment strategies, environment configuration, monitoring, error tracking, performance optimization, CI/CD pipelines, and Docker containerization. Deploy confidently to Vercel and other platforms.

### Learning Objectives

1. **Deploy** Next.js applications to Vercel
2. **Configure** environment variables and secrets
3. **Implement** monitoring and error tracking
4. **Optimize** for production performance
5. **Set up** CI/CD pipelines
6. **Containerize** with Docker
7. **Handle** production issues

---

## 5.1 Deploying to Vercel

### Why Vercel?

- ✅ Built by Next.js creators
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Generous free tier

---

### Preparing for Deployment

```bash
# 1. Build locally to check for errors
npm run build

# 2. Test production build
npm start

# 3. Check for TypeScript errors
npm run type-check

# 4. Check for linting issues
npm run lint
```

---

### Environment Variables

```bash
# .env.local (development)
DATABASE_URL="postgresql://localhost:5432/fpuna_dev"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
UPLOADTHING_SECRET="ut_secret"
UPLOADTHING_APP_ID="ut_app_id"

# .env.production (production - never commit!)
DATABASE_URL="postgresql://prod-db.com:5432/fpuna_prod"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="production-secret-key"
```

```typescript
// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export const env = envSchema.parse(process.env);
```

---

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
```

---

### GitHub Integration

1. **Push to GitHub**:
```bash
git remote add origin https://github.com/username/fpuna-ecommerce
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to vercel.com
   - Click "New Project"
   - Import from GitHub
   - Configure environment variables
   - Deploy!

**Result**: Automatic deployments on every push!

---

## 5.2 Database in Production

### PostgreSQL on Railway

```bash
# 1. Create Railway account at railway.app
# 2. Create new project
# 3. Add PostgreSQL service
# 4. Copy DATABASE_URL

# 5. Add to Vercel environment variables
# DATABASE_URL=postgresql://user:pass@region.railway.app:5432/railway
```

---

### Running Migrations in Production

```bash
# Add to package.json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

This ensures migrations run before each deployment.

---

### Database Connection Pooling

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

---

## 5.3 Monitoring & Error Tracking

### Sentry Integration

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

---

### Usage in Code

```typescript
// Automatic error capture
try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}

// Custom events
Sentry.captureMessage('Order placed successfully', 'info');

// User context
Sentry.setUser({
  id: user.id,
  email: user.email,
});
```

---

### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 5.4 Performance Optimization

### Production Checklist

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Optimize images
  images: {
    domains: ['uploadthing.com', 'your-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Compress responses
  compress: true,

  // Enable SWC minification
  swcMinify: true,

  // Production source maps (for debugging)
  productionBrowserSourceMaps: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

### Caching Headers

```typescript
// src/app/api/products/route.ts
export async function GET() {
  const products = await prisma.product.findMany();

  return new Response(JSON.stringify(products), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

---

## 5.5 Docker Containerization

### Dockerfile

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/fpuna
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret-key
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=fpuna
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

```bash
# Build and run
docker-compose up --build

# Run migrations
docker-compose exec app npx prisma migrate deploy

# Seed database
docker-compose exec app npm run db:seed
```

---

## 5.6 CI/CD with GitHub Actions

### Automated Testing & Deployment

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Run type check
        run: npm run type-check

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Build
        run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Week 8 Exercises

### Exercise 5.1: Deploy to Vercel (60 min)

**Objective**: Deploy application to production

**Tasks**:
1. Prepare environment variables (10 min)
2. Connect GitHub repository (10 min)
3. Configure Vercel project (15 min)
4. Deploy and verify (15 min)
5. Test production site (10 min)

**Deliverable**: Live production URL

---

### Exercise 5.2: Set Up Monitoring (90 min)

**Objective**: Implement error tracking and analytics

**Tasks**:
1. Configure Sentry (25 min)
2. Add Vercel Analytics (15 min)
3. Test error capture (20 min)
4. Set up alerts (20 min)
5. Create dashboard (10 min)

**Deliverable**: Monitoring system

---

### Exercise 5.3: Docker Deployment (120 min)

**Objective**: Containerize application

**Tasks**:
1. Create Dockerfile (30 min)
2. Create docker-compose.yml (25 min)
3. Build and test locally (30 min)
4. Optimize image size (20 min)
5. Document deployment (15 min)

**Deliverable**: Docker setup

---

## Knowledge Check Quiz

1. **What does Vercel provide?**
   a) Free databases
   b) Hosting and deployment platform
   c) Code editor
   d) Email service

2. **Why use environment variables?**
   a) To hide code
   b) To configure apps without changing code
   c) To make code slower
   d) To delete files

3. **What's Docker used for?**
   a) Container shipping
   b) Application containerization
   c) Image editing
   d) Database design

4. **What does Sentry do?**
   a) Guards buildings
   b) Error tracking and monitoring
   c) Deploys code
   d) Writes tests

5. **What's CI/CD?**
   a) A programming language
   b) Continuous Integration/Continuous Deployment
   c) A database
   d) A CSS framework

**Answer Key**: [1-b, 2-b, 3-b, 4-b, 5-b]

---

## Week 8 Summary

### Key Concepts
- ✅ Vercel deployment
- ✅ Environment configuration
- ✅ Error tracking
- ✅ Performance optimization
- ✅ Docker containerization
- ✅ CI/CD pipelines

### Skills Developed
- ✅ Deploy production apps
- ✅ Configure environments
- ✅ Monitor applications
- ✅ Optimize performance
- ✅ Use Docker
- ✅ Automate deployments

---

**Next Phase**: [Capstone Project - Weeks 9-10](./CAPSTONE-PROJECT-OVERVIEW.md)
