# 🚀 Módulo 05: Deployment & DevOps con IA

## Del Código Local a Producción en Minutos

> **Para Desarrolladores Web**: Este módulo te enseña a llevar tu aplicación Next.js desde tu máquina local a producción en Vercel, configurar CI/CD pipelines, optimizar performance, y usar OpenCode para automatizar deployment workflows. Aprenderás DevOps práctico sin ser DevOps engineer.

**⏱️ Duración**: 4 horas  
**👤 Nivel**: Intermedio-Avanzado  
**🎯 Objetivo**: Deployar aplicaciones Next.js a producción con confianza

---

## 🎓 ¿Qué Vas a Lograr?

1. ✅ **Deployar a Vercel** - Zero-config deployment desde GitHub
2. ✅ **Configurar CI/CD** - Pipelines automáticos con GitHub Actions
3. ✅ **Optimizar performance** - 90+ Lighthouse score
4. ✅ **Gestionar ambientes** - Dev, staging, producción
5. ✅ **Monitoring & analytics** - Vercel Analytics + error tracking
6. ✅ **Deployment con IA** - OpenCode para automatizar workflows

---

## 🤔 ¿Qué es Deployment?

### Analogía: De la Cocina al Restaurante

```mermaid
mindmap
  root((Deployment))
    Cocina tu casa
      Cocinas para ti
      Ingredientes en heladera
      Errores no importan
      Ambiente controlado
    Restaurante
      Cocinas para 100+ personas
      Ingredientes optimizados
      Cero errores permitidos
      Ambiente productivo
```

**Deployment** = El proceso de tomar tu código de desarrollo y ponerlo en un servidor donde usuarios reales pueden acceder 24/7.

### ¿Por Qué Deployment en Paraguay?

**Realidad del mercado local**:
- ✅ **Toda empresa** necesita deployar aplicaciones web
- ✅ **Vercel es gratis** para proyectos personales y startups
- ✅ **Skill requerido** en 95% de posiciones web dev
- ✅ **Portfolio online** = diferenciador en entrevistas

**Sin deployment** = Solo tienes código local que nadie puede ver 🚫

---

## 📊 Arquitectura de Deployment Moderno

```mermaid
graph LR
    subgraph "Developer Machine"
        A[💻 Local Dev<br/>localhost:3000]
    end
    
    subgraph "GitHub"
        B[📦 Git Push<br/>Code Repository]
        C[🔀 Pull Request<br/>Code Review]
    end
    
    subgraph "Vercel"
        D[🔨 Build<br/>next build]
        E[🧪 Preview Deploy<br/>preview-xyz.vercel.app]
        F[🚀 Production<br/>tuapp.com]
    end
    
    A -->|git push| B
    B -->|create PR| C
    C -->|trigger| D
    D -->|deploy preview| E
    C -->|merge to main| D
    D -->|deploy prod| F
    
    style A fill:#E1F5FF
    style B fill:#FFE1F5
    style D fill:#FFF4E1
    style E fill:#E1FFE1
    style F fill:#FFE1E1
```

### Los 3 Ambientes Esenciales

```mermaid
graph TD
    subgraph "Development"
        A[👨‍💻 Local<br/>Tu máquina]
        A1[localhost:3000<br/>Hot reload<br/>Debug mode]
    end
    
    subgraph "Staging"
        B[🧪 Preview<br/>Cada PR]
        B1[preview-abc123.vercel.app<br/>Test en ambiente real<br/>QA testing]
    end
    
    subgraph "Production"
        C[🌐 Live<br/>Usuarios reales]
        C1[tuapp.com<br/>Optimizado<br/>Monitoreado]
    end
    
    A --> B
    B --> C
    
    style A fill:#E1FFE1
    style B fill:#FFF4E1
    style C fill:#FFE1E1
```

---

## 🏢 Parte 1: Vercel Deployment Zero-Config (50 min)

### Concepto: Deployment Serverless

**Analogía**: Como AirBnB vs hotel propio - alguien más maneja la infraestructura.

```mermaid
sequenceDiagram
    participant D as 👨‍💻 Developer
    participant G as 📦 GitHub
    participant V as ☁️ Vercel
    participant U as 👥 Users
    
    D->>G: git push origin main
    G->>V: Webhook trigger
    V->>V: npm install
    V->>V: next build
    V->>V: Deploy to CDN
    V->>G: ✅ Deployment success
    U->>V: Visit tuapp.com
    V->>U: Serve from edge
    
    Note over V: Todo automático
```

### Paso 1: Conectar Repositorio GitHub

**Prerequisitos**:
- Proyecto Next.js en GitHub (público o privado)
- Cuenta Vercel (gratis en vercel.com)

**Configuración inicial**:

```bash
# 1. Asegurar que tu proyecto tiene package.json correcto
# package.json
{
  "name": "fpuna-ecommerce",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}
```

**Proceso de deployment**:

```mermaid
graph LR
    subgraph "Setup en Vercel Dashboard"
        A[🔐 Login con GitHub]
        B[➕ New Project]
        C[🔍 Import Repository]
        D[⚙️ Configure Build]
        E[🚀 Deploy]
        
        A --> B
        B --> C
        C --> D
        D --> E
    end
    
    style A fill:#E1F5FF
    style E fill:#E1FFE1
```

**Configuración build en Vercel**:

| Setting | Value | Descripción |
|---------|-------|-------------|
| **Framework Preset** | Next.js | Auto-detectado |
| **Build Command** | `next build` | Default correcto |
| **Output Directory** | `.next` | Next.js output |
| **Install Command** | `npm install` | Default correcto |
| **Node Version** | 18.x | LTS recomendado |

### Paso 2: Environment Variables en Producción

**Concepto**: Secretos NO van en el código.

```typescript
// ❌ NUNCA hacer esto
const apiKey = "sk_live_abc123xyz"; // Hardcoded

// ✅ SIEMPRE usar env variables
const apiKey = process.env.STRIPE_SECRET_KEY;
```

**Estructura de archivos .env**:

```bash
# .env.local (Git ignored - solo local)
DATABASE_URL="postgresql://user:pass@localhost:5432/fpuna_dev"
STRIPE_SECRET_KEY="sk_test_..."
NEXTAUTH_SECRET="dev-secret-change-in-prod"

# .env.production (Template - valores reales en Vercel)
DATABASE_URL=""
STRIPE_SECRET_KEY=""
NEXTAUTH_SECRET=""
```

**Configurar en Vercel**:

```mermaid
graph TD
    A[Vercel Dashboard] --> B[Project Settings]
    B --> C[Environment Variables]
    C --> D{Seleccionar ambiente}
    D --> E[Production]
    D --> F[Preview]
    D --> G[Development]
    
    E --> H[Agregar variables:<br/>DATABASE_URL<br/>STRIPE_SECRET_KEY<br/>NEXTAUTH_SECRET]
    
    style C fill:#FFF4E1
    style H fill:#E1FFE1
```

**Tipos de variables por ambiente**:

```typescript
// next.config.js
module.exports = {
  env: {
    // Variables públicas (accesibles en browser)
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  // Variables privadas (solo server-side)
  serverRuntimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    databaseUrl: process.env.DATABASE_URL,
  },
};
```

### Paso 3: Preview Deployments (Feature Branches)

**Concepto**: Cada Pull Request tiene su propio deployment.

```mermaid
graph LR
    subgraph "Feature Branch Workflow"
        A[🌿 git checkout -b feature/login]
        B[💻 Develop feature]
        C[📤 git push origin feature/login]
        D[🔀 Create PR]
        E[🧪 Vercel auto-deploy preview]
        F[👀 Review preview URL]
        G[✅ Merge to main]
        H[🚀 Auto-deploy production]
        
        A --> B --> C --> D
        D --> E --> F
        F --> G --> H
    end
    
    style E fill:#FFF4E1
    style H fill:#FFE1E1
```

**Ventajas de Preview Deployments**:

1. **Test en ambiente real** - No solo localhost
2. **Share con stakeholders** - URL única por feature
3. **QA testing** - Antes de merger a producción
4. **Zero downtime** - Producción no afectada

**Ejemplo de PR con preview**:

```markdown
## Pull Request: Implementar login con NextAuth

### Changes
- ✅ NextAuth.js configurado
- ✅ Google OAuth provider
- ✅ Protected routes con middleware
- ✅ Session management

### Preview Deployment
🔗 https://fpuna-ecommerce-git-feature-login-tuusuario.vercel.app

### Testing
1. Navegar a preview URL
2. Click en "Login with Google"
3. Verificar redirección después de auth
4. Verificar protected routes requieren login
```

### Paso 4: Production Deployment

**Trigger**: Merge a branch principal (main/master)

```bash
# Proceso local
git checkout main
git pull origin main
git merge feature/login
git push origin main

# Vercel automáticamente:
# 1. Detecta push a main
# 2. Ejecuta build
# 3. Corre tests (si configurados)
# 4. Deploy a producción
# 5. Notifica en Slack/Discord (si configurado)
```

**Build output esperado**:

```bash
▲ Vercel
Running build command: npm run build

> fpuna-ecommerce@1.0.0 build
> next build

✓ Linting and checking validity of types
✓ Creating an optimized production build
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (8/8)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.3 kB
├ ○ /about                               142 B          87.3 kB
├ ƒ /api/products                        0 B                0 B
├ ○ /products                            2.1 kB         89.4 kB
└ ○ /products/[id]                       1.8 kB         89.1 kB

○  (Static)  automatically rendered as static HTML
ƒ  (Dynamic) server-rendered on demand

Build completed in 45s
Deployment completed in 67s
✓ Production: https://fpuna-ecommerce.vercel.app
```

### Paso 5: Custom Domains

**Configuración de dominio propio**:

```mermaid
graph LR
    subgraph "Domain Setup"
        A[🛒 Comprar dominio<br/>fpuna-store.com]
        B[⚙️ Vercel: Add domain]
        C[🔧 DNS Configuration]
        D[✅ SSL Certificate]
        E[🌐 Live!]
        
        A --> B --> C --> D --> E
    end
    
    style E fill:#E1FFE1
```

**DNS Records requeridos**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | @ | 76.76.21.21 | 3600 |
| **CNAME** | www | cname.vercel-dns.com | 3600 |

**Verificación**:

```bash
# Verificar DNS propagation
nslookup fpuna-store.com

# Resultado esperado:
# Non-authoritative answer:
# Name:    fpuna-store.com
# Address: 76.76.21.21
```

### Implementación con OpenCode

```bash
opencode "Crea checklist y automation para deployment Next.js a Vercel:

PROYECTO: E-commerce FPUNA
STACK: Next.js 14, Prisma, PostgreSQL, NextAuth

TAREAS:
1. Verificar pre-deployment checklist:
   - Build local exitoso
   - Tests passing
   - Environment variables documentadas
   - .gitignore actualizado
   - package.json optimizado

2. Configurar Vercel:
   - Conectar repositorio GitHub
   - Configurar build settings
   - Agregar environment variables
   - Setup custom domain

3. Verificar post-deployment:
   - Health check endpoints
   - Database connections
   - Authentication flows
   - API routes funcionando

OUTPUT:
- deploy-checklist.md (checklist completa)
- vercel.json (configuración)
- .github/workflows/pre-deploy.yml (checks automáticos)
- deployment-guide.md (documentación)

Todo en español con ejemplos específicos de FPUNA"
```

---

## 🐳 Parte 2: Docker & Self-Hosting (60 min)

### Concepto: Containerización

**Analogía**: Como un container de shipping - tu app + todas sus dependencies en un paquete.

```mermaid
graph TD
    subgraph "Sin Docker"
        A[😓 Funciona en mi máquina<br/>Node 18, PostgreSQL 15]
        B[💥 No funciona en servidor<br/>Node 16, PostgreSQL 14]
    end
    
    subgraph "Con Docker"
        C[📦 Container<br/>Node 18 + PostgreSQL 15<br/>Todo incluido]
        D[✅ Funciona igual<br/>En cualquier servidor]
    end
    
    A -.->|Problema| B
    C --> D
    
    style A fill:#FFE1E1
    style C fill:#E1FFE1
```

### Dockerfile para Next.js

**Multi-stage build optimizado**:

```dockerfile
# Dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copiar package files
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar dependencies del stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Configurar Next.js para standalone output**:

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};
```

### Docker Compose para Development

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Next.js App
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://fpuna:password@db:5432/fpuna_dev
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db
      - redis
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev

  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: fpuna
      POSTGRES_PASSWORD: password
      POSTGRES_DB: fpuna_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Comandos Docker útiles**:

```bash
# Build image
docker build -t fpuna-ecommerce:latest .

# Run container
docker run -p 3000:3000 fpuna-ecommerce:latest

# Run con Docker Compose
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Stop servicios
docker-compose down

# Rebuild después de cambios
docker-compose up --build
```

### Self-Hosting en VPS

**Opciones en Paraguay**:

| Provider | Costo/mes | CPU | RAM | Storage | Recomendado |
|----------|-----------|-----|-----|---------|-------------|
| **DigitalOcean** | $6 USD | 1 vCPU | 1 GB | 25 GB | ✅ Starter |
| **Vultr** | $5 USD | 1 vCPU | 1 GB | 25 GB | ✅ Budget |
| **AWS Lightsail** | $5 USD | 1 vCPU | 512 MB | 20 GB | ⚠️ Tight |
| **Linode** | $5 USD | 1 vCPU | 1 GB | 25 GB | ✅ Good |

**Setup en VPS**:

```bash
# 1. SSH al servidor
ssh root@tu-servidor-ip

# 2. Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Instalar Docker Compose
apt-get install docker-compose-plugin

# 4. Clonar repositorio
git clone https://github.com/tuusuario/fpuna-ecommerce.git
cd fpuna-ecommerce

# 5. Configurar environment variables
cp .env.example .env.production
nano .env.production  # Editar con valores reales

# 6. Deployar
docker-compose -f docker-compose.prod.yml up -d

# 7. Verificar
docker ps
curl http://localhost:3000/api/health
```

**Docker Compose para producción**:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    depends_on:
      - db
      - redis
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - app-network

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

### Implementación con OpenCode

```bash
opencode "Genera configuración Docker completa para Next.js app:

PROYECTO: E-commerce FPUNA
STACK: Next.js 14, Prisma, PostgreSQL, Redis

REQUISITOS:
1. Dockerfile multi-stage optimizado
2. Docker Compose para desarrollo
3. Docker Compose para producción con Nginx
4. Scripts de deployment automatizados
5. Health check endpoints
6. Logging configuration

INCLUIR:
- Optimización de image size
- Security best practices (non-root user)
- Environment variables management
- Database migrations en startup
- Backup scripts

OUTPUT:
- Dockerfile
- docker-compose.yml (dev)
- docker-compose.prod.yml (prod)
- nginx.conf (reverse proxy)
- deploy.sh (automation script)
- README-DOCKER.md (documentation)

Todo con comentarios en español"
```

---

## 🔄 Parte 3: CI/CD Pipelines con GitHub Actions (50 min)

### Concepto: Continuous Integration/Deployment

**Analogía**: Como línea de producción automatizada - cada cambio pasa por checks automáticos.

```mermaid
graph LR
    subgraph "CI/CD Pipeline"
        A[📝 Code Push] --> B[🧪 Run Tests]
        B --> C[🔍 Lint Code]
        C --> D[🏗️ Build App]
        D --> E[🐳 Build Docker Image]
        E --> F[🚀 Deploy]
        F --> G[✅ Health Check]
        
        B -.->|❌ Fail| H[🚫 Block Deployment]
        C -.->|❌ Fail| H
        D -.->|❌ Fail| H
    end
    
    style A fill:#E1F5FF
    style G fill:#E1FFE1
    style H fill:#FFE1E1
```

### GitHub Actions Workflow para Next.js

**Estructura básica**:

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18.x'

jobs:
  # Job 1: Tests y Linting
  test:
    name: 🧪 Test & Lint
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
      
      - name: 📦 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: 📚 Install dependencies
        run: npm ci
      
      - name: 🔍 Lint code
        run: npm run lint
      
      - name: 🧪 Run tests
        run: npm test
      
      - name: 📊 Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  # Job 2: Build verificación
  build:
    name: 🏗️ Build
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
      
      - name: 📦 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: 📚 Install dependencies
        run: npm ci
      
      - name: 🏗️ Build application
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
      
      - name: 📤 Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next/

  # Job 3: Deploy a Vercel
  deploy-vercel:
    name: 🚀 Deploy to Vercel
    runs-on: ubuntu-latest
    needs: [test, build]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
      
      - name: 🚀 Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  # Job 4: Deploy Docker (self-hosted)
  deploy-docker:
    name: 🐳 Deploy Docker
    runs-on: ubuntu-latest
    needs: [test, build]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
      
      - name: 🐳 Build Docker image
        run: |
          docker build -t fpuna-ecommerce:${{ github.sha }} .
          docker tag fpuna-ecommerce:${{ github.sha }} fpuna-ecommerce:latest
      
      - name: 🔐 Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: 📤 Push to Docker Hub
        run: |
          docker push fpuna-ecommerce:${{ github.sha }}
          docker push fpuna-ecommerce:latest
      
      - name: 🚀 Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /app/fpuna-ecommerce
            docker-compose pull
            docker-compose up -d
            docker system prune -f
```

### Advanced: Multi-Environment Pipeline

```yaml
# .github/workflows/multi-env-deploy.yml
name: Multi-Environment Deployment

on:
  push:
    branches: [main, staging, develop]

jobs:
  determine-environment:
    name: 🎯 Determine Environment
    runs-on: ubuntu-latest
    outputs:
      environment: ${{ steps.set-env.outputs.environment }}
    
    steps:
      - name: Set environment
        id: set-env
        run: |
          if [[ ${{ github.ref }} == 'refs/heads/main' ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
          elif [[ ${{ github.ref }} == 'refs/heads/staging' ]]; then
            echo "environment=staging" >> $GITHUB_OUTPUT
          else
            echo "environment=development" >> $GITHUB_OUTPUT
          fi

  deploy:
    name: 🚀 Deploy to ${{ needs.determine-environment.outputs.environment }}
    runs-on: ubuntu-latest
    needs: determine-environment
    environment: ${{ needs.determine-environment.outputs.environment }}
    
    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4
      
      - name: 🚀 Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: ${{ needs.determine-environment.outputs.environment == 'production' && '--prod' || '' }}
          alias-domains: |
            ${{ needs.determine-environment.outputs.environment == 'production' && 'fpuna-store.com' || format('{0}.fpuna-store.com', needs.determine-environment.outputs.environment) }}
```

### Secrets Management en GitHub

```mermaid
graph TD
    A[GitHub Repository] --> B[Settings]
    B --> C[Secrets and variables]
    C --> D[Actions]
    D --> E{Type of Secret}
    E --> F[Repository Secrets<br/>Available to all workflows]
    E --> G[Environment Secrets<br/>Specific per environment]
    
    F --> H[VERCEL_TOKEN<br/>DOCKERHUB_TOKEN<br/>DATABASE_URL]
    G --> I[Production<br/>Staging<br/>Development]
    
    style C fill:#FFF4E1
    style H fill:#E1FFE1
```

### Implementación con OpenCode

```bash
opencode "Genera CI/CD pipeline completo para Next.js con GitHub Actions:

PROYECTO: E-commerce FPUNA
ENVIRONMENTS: Development, Staging, Production

PIPELINE STAGES:
1. Lint & Type Check
2. Unit Tests
3. Integration Tests
4. Build Verification
5. Security Scan (dependencias)
6. Deploy to Vercel (staging)
7. E2E Tests (Playwright)
8. Deploy to Production (manual approval)
9. Health Check
10. Rollback automático si falla

FEATURES:
- Multi-environment support
- Branch-based deployments
- Slack notifications
- Coverage reports
- Performance budgets
- Lighthouse CI

OUTPUT:
- .github/workflows/ci-cd.yml
- .github/workflows/e2e.yml
- .github/workflows/security.yml
- scripts/health-check.sh
- scripts/rollback.sh
- README-CICD.md

Todo comentado en español con ejemplos específicos"
```

---

## 📊 Parte 4: Monitoring & Optimization (40 min)

### Vercel Analytics

**Setup (built-in para proyectos Next.js en Vercel)**:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Performance Optimization

**Core Web Vitals targets**:

```mermaid
graph LR
    subgraph "Core Web Vitals"
        A[⚡ LCP<br/>Largest Contentful Paint<br/>Target: < 2.5s]
        B[🎯 FID<br/>First Input Delay<br/>Target: < 100ms]
        C[📏 CLS<br/>Cumulative Layout Shift<br/>Target: < 0.1]
    end
    
    style A fill:#E1FFE1
    style B fill:#E1FFE1
    style C fill:#E1FFE1
```

**Optimizaciones Next.js**:

```typescript
// Image optimization
import Image from 'next/image';

<Image
  src="/products/notebook.jpg"
  alt="Notebook FPUNA"
  width={800}
  height={600}
  priority // Above fold images
  placeholder="blur"
  blurDataURL="data:image/..." // Low quality placeholder
/>

// Font optimization
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Dynamic imports (code splitting)
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Cargando...</p>,
  ssr: false, // Disable SSR if not needed
});
```

### Error Tracking con Sentry

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% de transacciones
  
  beforeSend(event, hint) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
```

### Implementación con OpenCode

```bash
opencode "Setup completo de monitoring y optimization para Next.js production:

HERRAMIENTAS:
- Vercel Analytics (built-in)
- Sentry (error tracking)
- Lighthouse CI (performance)
- LogRocket (session replay) - opcional

CONFIGURAR:
1. Vercel Analytics + Speed Insights
2. Sentry error tracking
3. Performance budgets
4. Lighthouse CI en GitHub Actions
5. Custom dashboards

OPTIMIZACIONES:
- Image optimization
- Font optimization
- Code splitting
- Caching strategies
- Bundle analysis

OUTPUT:
- sentry.config.ts
- next.config.js (optimized)
- .github/workflows/lighthouse.yml
- performance-budget.json
- monitoring-dashboard.md (guía)

Todo con configuración específica para Paraguay (timezone, currency, etc.)"
```

---

## 🎯 Ejercicio Práctico: Deploy E-Commerce FPUNA

### Objetivo

Deployar aplicación completa de e-commerce a producción con CI/CD pipeline.

### Requisitos

**Technical Stack**:
- ✅ Next.js 14 App Router
- ✅ Prisma + PostgreSQL (Neon)
- ✅ NextAuth.js authentication
- ✅ Stripe payments (test mode)
- ✅ Vercel deployment
- ✅ GitHub Actions CI/CD

**Features a deployar**:
1. Catálogo de productos
2. Carrito de compras
3. Checkout con Stripe
4. Panel de usuario
5. Admin dashboard

### Paso 1: Pre-Deployment Checklist

```markdown
## Pre-Deployment Checklist

### Code Quality
- [ ] Build local exitoso sin errores
- [ ] Tests passing (unit + integration)
- [ ] Linting sin warnings
- [ ] TypeScript sin errores
- [ ] No console.logs en producción

### Configuration
- [ ] Environment variables documentadas
- [ ] .env.example actualizado
- [ ] .gitignore completo
- [ ] Database schema migrated
- [ ] Seed data preparado

### Security
- [ ] API keys en environment variables
- [ ] CORS configurado correctamente
- [ ] Rate limiting implementado
- [ ] Input validation en todas las rutas
- [ ] SQL injection prevention (Prisma)

### Performance
- [ ] Images optimizadas (Next/Image)
- [ ] Fonts optimizados
- [ ] Bundle size < 200KB (first load)
- [ ] No unnecessary dependencies
- [ ] Code splitting implementado
```

### Paso 2: Deploy to Vercel

```bash
# 1. Push a GitHub
git add .
git commit -m "chore: prepare for production deployment"
git push origin main

# 2. En Vercel Dashboard:
# - Import repository
# - Configure environment variables
# - Deploy

# 3. Verificar deployment
curl https://fpuna-ecommerce.vercel.app/api/health

# Expected response:
# { "status": "ok", "timestamp": "2026-01-15T10:30:00Z" }
```

### Paso 3: Setup CI/CD

```yaml
# .github/workflows/production-deploy.yml
name: Production Deployment

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-args: '--prod'
```

### Paso 4: Post-Deployment Verification

```bash
# Health check
curl https://fpuna-ecommerce.vercel.app/api/health

# Test authentication
curl -X POST https://fpuna-ecommerce.vercel.app/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@fpuna.edu.py","password":"test123"}'

# Test product API
curl https://fpuna-ecommerce.vercel.app/api/products

# Run Lighthouse
npx lighthouse https://fpuna-ecommerce.vercel.app --view
```

---

## 🔧 Troubleshooting Deployment Issues

### Build Failures

```bash
# ❌ Error: Module not found
Error: Cannot find module 'bcrypt'

# ✅ Solution:
npm install bcrypt
git add package.json package-lock.json
git commit -m "fix: add missing bcrypt dependency"
git push
```

### Environment Variables

```typescript
// ❌ Error: undefined is not a valid Prisma Database URL
// Causa: DATABASE_URL no configurada en Vercel

// ✅ Solution:
// 1. Vercel Dashboard → Project Settings → Environment Variables
// 2. Add: DATABASE_URL = postgresql://...
// 3. Redeploy
```

### Database Connection Issues

```typescript
// ❌ Error: P1001: Can't reach database server
// Causa: Database no accesible desde Vercel

// ✅ Solution (Neon):
// 1. Neon Dashboard → Connection pooling
// 2. Copy pooled connection string
// 3. Use connection string with ?pgbouncer=true
```

---

## ✅ Checklist Final de Deployment

### Pre-Deployment
- [ ] Build local exitoso
- [ ] Tests passing
- [ ] Environment variables configuradas
- [ ] Database migrations corridas
- [ ] Secrets no en código

### Deployment
- [ ] Deployed a Vercel
- [ ] Custom domain configurado (opcional)
- [ ] SSL certificate activo
- [ ] Health checks passing

### Post-Deployment
- [ ] Monitoring configurado
- [ ] Error tracking activo
- [ ] Analytics funcionando
- [ ] Performance > 90 Lighthouse
- [ ] SEO optimizado

### CI/CD
- [ ] GitHub Actions configurado
- [ ] Tests automáticos
- [ ] Deployment automático
- [ ] Rollback strategy definida

---

## 🎉 Resumen del Módulo

### Lo Que Dominaste

✅ **Vercel Deployment** - Zero-config desde GitHub  
✅ **Docker** - Containerización para self-hosting  
✅ **CI/CD** - Pipelines automáticos con GitHub Actions  
✅ **Monitoring** - Analytics, error tracking, performance  
✅ **Optimization** - 90+ Lighthouse score  
✅ **OpenCode** - Automatización de deployment workflows

### Próximo Paso

**¡Felicidades!** Has completado los 5 módulos de Web Development.  
**Ahora**: [Proyecto Capstone](./capstone/README.md) - Deploy tu e-commerce completo

---

## 💭 Reflexión

1. **¿Qué diferencia hay entre deployment manual vs CI/CD?**
2. **¿Cuándo usarías Vercel vs self-hosting?**
3. **¿Cómo OpenCode acelera deployment workflows?**

**Comparte en Slack** (#web-dev-deployment)

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/actions)
- [Docker Documentation](https://docs.docker.com/)

### Herramientas
- **Vercel** - Deployment platform
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Sentry** - Error tracking
- **Lighthouse** - Performance auditing

### Paraguay DevOps Community
- **Slack**: #devops-paraguay
- **Meetups**: DevOps Paraguay (mensual)
- **Empresas**: Softtek, Global Logic, Roshka

---

*Módulo creado para FPUNA Verano 2026*  
*Actualizado: Enero 2026*  
*Track: Web Development*
