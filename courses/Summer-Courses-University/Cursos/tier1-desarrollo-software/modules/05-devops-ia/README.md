# Módulo 05: DevOps con IA
## Tier 1 - Desarrollo de Software

---

## Descripción

Este módulo enseña a usar IA para containerización, CI/CD pipelines, y automatización de deployment.

**Duración:** 2 horas
**Stack:** Docker, GitHub Actions, Vercel/Railway

---

## Objetivos de Aprendizaje

1. **Generar** Dockerfiles y docker-compose
2. **Configurar** pipelines CI/CD
3. **Automatizar** deployments
4. **Troubleshoot** problemas con IA

---

## Contenido

### 1. Docker con IA

**Prompt para Dockerfile:**
```
Genera Dockerfile optimizado para aplicación Node.js:

REQUISITOS:
- Multi-stage build (build + production)
- Node 20 Alpine
- Copiar solo archivos necesarios
- Usuario no-root
- Healthcheck
- Optimización de capas para cache

App usa: npm, TypeScript, Prisma
```

**Ejemplo:**
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]
```

---

### 2. Docker Compose

**Prompt:**
```
Genera docker-compose.yml para desarrollo local:

SERVICIOS:
- app: Node.js (build desde Dockerfile)
- db: PostgreSQL 15
- redis: Para cache/sessions

INCLUIR:
- Volúmenes para datos persistentes
- Variables de entorno
- Healthchecks
- Dependencias entre servicios
- Network personalizada
```

---

### 3. GitHub Actions CI/CD

**Prompt:**
```
Genera workflow de GitHub Actions para:

ON: push a main, pull requests

JOBS:
1. Lint y format check
2. Tests con coverage
3. Build Docker image
4. Deploy a Railway (solo main)

INCLUIR:
- Cache de node_modules
- Secrets para tokens
- Notificación de fallo
- Badge de status
```

**Ejemplo:**
```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: my-app
```

---

### 4. Troubleshooting con IA

**Prompt de Debug:**
```
Mi container falla con este error:

[PEGAR ERROR LOG]

CONTEXTO:
- Dockerfile: [describir]
- Funciona local pero no en container
- Base de datos externa

NECESITO:
1. Diagnóstico del problema
2. Posibles causas
3. Soluciones ordenadas por probabilidad
4. Comandos para debugging
```

---

### 5. Scripts de Automatización

**Prompt:**
```
Crea script bash para deployment:

PASOS:
1. Verificar rama es main
2. Correr tests
3. Build Docker image
4. Push a registry
5. Trigger deploy en servidor
6. Verificar health endpoint
7. Rollback si falla

INCLUIR: Logging, manejo de errores, confirmación
```

---

## Mejores Prácticas

1. **Secrets:** Nunca en código, siempre en variables de entorno
2. **Imágenes:** Usar Alpine, multi-stage, non-root
3. **Cache:** Optimizar capas Docker, cachear dependencias en CI
4. **Rollback:** Siempre tener plan de rollback
5. **Monitoreo:** Health checks, logs, alertas

---

*Módulo 05 - DevOps con IA*
*Tier 1 - Desarrollo de Software*
