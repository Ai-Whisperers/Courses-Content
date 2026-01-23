# 🔧 Módulo 02: Desarrollo Full-Stack con Prisma, tRPC y React Query

## Construye Backends Type-Safe y Escalables

> **Para Desarrolladores Web**: Este módulo te enseña a crear backends completos con Prisma ORM, API Routes type-safe con tRPC, y gestión de estado servidor con React Query. Aprenderás a construir aplicaciones full-stack profesionales aceleradas con OpenCode.

**⏱️ Duración**: 4 horas  
**👤 Nivel**: Intermedio (con Next.js básico)  
**🎯 Objetivo**: Dominar desarrollo full-stack moderno con type-safety end-to-end

---

## 🎓 ¿Qué Vas a Lograr?

1. ✅ **Configurar Prisma ORM** - Database type-safe con PostgreSQL
2. ✅ **Diseñar schemas relacionales** - Modelos, relaciones, migraciones
3. ✅ **Crear API Routes con tRPC** - Type-safety full-stack sin código duplicado
4. ✅ **Implementar React Query** - Data fetching, caching, mutations
5. ✅ **Manejar formularios profesionalmente** - React Hook Form + validaciones
6. ✅ **Generar backends con IA** - OpenCode para CRUD completos

---

## 🤔 ¿Qué es Full-Stack Development?

### Analogía: Restaurant Completo

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
mindmap
  root((Full-Stack))
    Restaurant Frontend
      Menú que el cliente ve
      Interfaz bonita
      Experiencia del usuario
    Restaurant Backend
      Cocina que prepara
      Base de datos (despensa)
      Lógica de negocio
    Full-Stack Dev
      Frontend: UI en React
      Backend: API + Database
      Conecta ambos mundos
```

**Full-Stack** = Desarrollador que maneja tanto el frontend (UI) como el backend (API + Database), creando aplicaciones completas funcionales.

### ¿Por Qué Full-Stack en Paraguay?

**Realidad del mercado local**:
- ✅ **Global Logic** - Full-stack developers: ₲18M-28M/mes
- ✅ **Aruma** (fintech) - Stack: Next.js + Prisma + tRPC
- ✅ **Softtek** - Proyectos multinacionales con stacks modernos
- ✅ **Startups** - Prefieren devs full-stack (más versátiles)

**Full-stack = 40% más demanda** que frontend/backend solo 🚀

---

## 📋 Prerrequisitos

### Conocimientos Requeridos

✅ **Next.js 14 Foundations** (Fundamental - OBLIGATORIO):
- App Router y Server Components
- Routing y navegación
- Data fetching básico
- **Verificación**: ¿Completaste Módulo 01 de este track?
- **Si NO**: Completa Módulo 01 primero - este módulo asume esos conocimientos

✅ **TypeScript Intermedio** (Fundamental):
- Tipos básicos (string, number, boolean, arrays)
- Interfaces y tipos personalizados
- Generics básicos: `Array<T>`, `Promise<T>`
- Type inference (TypeScript infiere tipos)
- **Verificación**: ¿Entiendes `interface User { name: string; age: number }`?

✅ **Bases de Datos Básicas** (Recomendado):
- Conceptos SQL: tablas, filas, columnas
- Relaciones: one-to-many, many-to-many
- Primary keys y foreign keys
- **Verificación**: ¿Sabes qué es una foreign key?
- **Si NO**: Está bien, se explica en el módulo, pero avanza despacio

✅ **JavaScript Async** (Fundamental):
- Promises y async/await
- Try/catch para errores
- **Verificación**: ¿Puedes explicar `await fetch()`?

❌ **NO Se Requiere**:
- Experiencia previa con ORMs (Prisma se enseña desde cero)
- Conocimiento de tRPC (se explica completamente)
- Experiencia con React Query (se cubre en detalle)
- Conocimiento profundo de SQL (Prisma abstrae SQL)

### Software Necesario (OBLIGATORIO - Instalar ANTES)

**Desde Módulo 01 ya tienes**:
- ✅ Node.js v18+
- ✅ VS Code
- ✅ Git

**NUEVO para este módulo** (instalar ahora):

1. **PostgreSQL (Database)**
   
   **Opción A: Docker** (Recomendado - más fácil):
   ```bash
   # Si tienes Docker instalado:
   docker run --name postgres-fpuna -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
   ```
   - **Ventaja**: No ensucia tu sistema, fácil de eliminar
   - **Desventaja**: Requiere Docker instalado
   
   **Opción B: PostgreSQL Cloud** (Alternativa - GRATIS):
   - **Neon.tech**: [neon.tech](https://neon.tech/) - Database PostgreSQL gratis en la nube
   - **Supabase**: [supabase.com](https://supabase.com/) - Alternativa con UI
   - **Ventaja**: No requiere instalación local, siempre disponible
   - **Desventaja**: Requiere internet
   
   **Opción C: PostgreSQL Local** (Última opción):
   - [postgresql.org/download](https://www.postgresql.org/download/)
   - **Advertencia**: Instalación más compleja, configuración manual

   **Recomendación**: Usa Neon.tech (cloud) - es lo más simple para empezar.

2. **Prisma CLI** (Instalaremos en el módulo vía npm)
   - NO instales globalmente, lo haremos en el proyecto

3. **VS Code Extensions** (Recomendadas):
   - Prisma (oficial) - Syntax highlighting para schema
   - Thunder Client o REST Client - Testar API Routes

### Módulos Previos Necesarios

**Obligatorios**:
- ✅ **00-CORE-FOUNDATION (Semana 1)** - OpenCode configurado
- ✅ **Módulo 01: Next.js Foundations** - CRÍTICO, este módulo asume que dominas Next.js básico

**Si NO completaste Módulo 01**: ⚠️ DETENTE - completa primero (4 horas). Este módulo construye directamente sobre conceptos de Módulo 01.

### Auto-Evaluación

Responde estas preguntas para verificar si estás listo:

1. **¿Completaste Módulo 01 (Next.js Foundations) de este track?**  
   SÍ / NO (si NO, completa primero)

2. **¿Puedes crear un Server Component en Next.js 14?**  
   SÍ / NO

3. **¿Entiendes TypeScript interfaces básicas?**  
   Ejemplo: `interface Post { title: string; views: number }`  
   SÍ / NO

4. **¿Sabes qué es una base de datos relacional?**  
   SÍ / NO (si NO, Google "SQL basics" por 30 min)

5. **¿Tienes acceso a PostgreSQL (local, Docker, o cloud)?**  
   SÍ / NO (si NO, crea cuenta en Neon.tech - 5 min)

**Interpretación**:
- **5 SÍes**: ✅ Listo para comenzar
- **4 SÍes**: ⚠️ Verifica que hayas completado Módulo 01 (#1)
- **< 4 SÍes**: ❌ Completa Módulo 01 primero y repasa TypeScript básico

**Recursos de Repaso** (si necesitas):
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Gratis, oficial
- [SQL Basics in 30 min](https://www.khanacademy.org/computing/computer-programming/sql) - Khan Academy
- [Async JavaScript](https://javascript.info/async-await) - Guía gratuita

### Tiempo Estimado Total

- **Setup inicial** (PostgreSQL, Prisma): 20-30 min (ANTES del módulo)
- **Contenido teórico**: 1.5-2 horas
- **Código y práctica**: 2-3 horas
- **Proyecto del módulo**: 3-4 horas adicionales

**Total**: 4-9 horas (depende de experiencia con databases)

### Checklist Final

Antes de comenzar, verifica:

- [ ] He completado Módulo 01 (Next.js Foundations)
- [ ] Tengo Node.js v18+ funcionando
- [ ] Tengo acceso a PostgreSQL (Docker, Neon.tech, o local)
- [ ] Entiendo TypeScript interfaces básicas
- [ ] Entiendo async/await en JavaScript
- [ ] Tengo 4+ horas disponibles para el módulo
- [ ] (Opcional) Tengo Thunder Client o similar para testar APIs

**Si marcaste los primeros 5**: ¡Adelante! 🚀

**Si NO completaste Módulo 01**: ⚠️ **CRÍTICO** - Este módulo asume que sabes Next.js. Completa Módulo 01 primero (no es opcional).

**Si NO tienes PostgreSQL**: ⚠️ DETENTE - Crea cuenta en Neon.tech (5 min, gratis). El módulo requiere una database funcional.

---

## 📊 El Stack Moderno (2026)

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
graph TD
    subgraph "Frontend Layer"
        A[⚛️ React Components<br/>Next.js 14]
        B[🎨 Tailwind CSS<br/>Styling]
        C[📝 React Hook Form<br/>Forms]
    end
    
    subgraph "Data Layer"
        D[🔄 React Query<br/>Client state]
        E[tRPC Client<br/>Type-safe calls]
    end
    
    subgraph "Backend Layer"
        F[tRPC Router<br/>API endpoints]
        G[💼 Business Logic<br/>Services]
        H[🗃️ Prisma Client<br/>ORM]
    end
    
    subgraph "Database Layer"
        I[🐘 PostgreSQL<br/>Neon hosted]
    end
    
    A --> D
    B --> A
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    
    style A fill:#61DAFB
    style D fill:#FF4154
    style F fill:#398CCB
    style H fill:#2D3748
    style I fill:#336791
```

**Ventajas de este stack**:
- ✅ **Type-safety completo**: TypeScript desde UI hasta DB
- ✅ **Sin código duplicado**: Tipos compartidos frontend/backend
- ✅ **Developer experience**: Autocompletado en toda la app
- ✅ **Performance**: React Query cachea automáticamente
- ✅ **Escalabilidad**: Arquitectura profesional desde día 1

---

## 🏢 Parte 1: Prisma ORM & Database Design (70 min)

### Concepto: Object-Relational Mapping (ORM)

**Analogía**: Como un traductor entre tu código TypeScript y la base de datos SQL.

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
sequenceDiagram
    participant D as Developer
    participant P as 🔧 Prisma
    participant DB as 🗄️ PostgreSQL
    
    D->>P: const user = await prisma.user.findUnique()
    P->>DB: SELECT * FROM users WHERE id = ?
    DB->>P: { id: 1, email: "..." }
    P->>D: User { id: 1, email: "..." } (TypeScript type)
    
    Note over D,DB: Prisma convierte objetos ↔️ SQL
```

### ¿Por Qué Prisma?

**Comparación con SQL tradicional**:

```typescript
// ❌ SQL tradicional (sin type-safety)
const users = await db.query('SELECT * FROM users WHERE email = ?', [email]);
const user = users[0]; // Tipo: any
console.log(user.emal); // Typo! No error en compile time

// ✅ Prisma (type-safe)
const user = await prisma.user.findUnique({
  where: { email }
});
console.log(user.emal); // ❌ TypeScript error!
//              ~~~~
//              Property 'emal' does not exist
```

### Configuración Inicial de Prisma

**Paso 1: Instalación**

```bash
# En tu proyecto Next.js
npm install prisma @prisma/client
npx prisma init
```

**Resultado**: Crea `prisma/schema.prisma` y `.env`

**Paso 2: Configurar conexión a PostgreSQL**

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/fpuna_ecommerce?schema=public"

# Para Neon (gratis):
DATABASE_URL="postgresql://username:password@ep-cool-name.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

**Crear cuenta en Neon**:
1. Ir a https://neon.tech
2. Sign up gratis (GitHub OAuth)
3. Crear proyecto "FPUNA E-commerce"
4. Copiar connection string
5. Pegar en `.env`

### Diseño de Schema: E-Commerce FPUNA

**Caso de uso**: Tienda online para productos universitarios (libros, notebooks, merchandising).

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
erDiagram
    User ||--o{ Order : "places"
    User {
        int id PK
        string email UK
        string nombre
        string password
        string role
        datetime createdAt
    }
    
    Product ||--o{ OrderItem : "contains"
    Product }o--|| Category : "belongs to"
    Product {
        int id PK
        string nombre
        string descripcion
        decimal precio
        int stock
        int categoryId FK
        datetime createdAt
    }
    
    Category ||--o{ Product : "has many"
    Category {
        int id PK
        string nombre
        string slug UK
    }
    
    Order ||--|{ OrderItem : "contains"
    Order {
        int id PK
        int userId FK
        decimal total
        string status
        datetime createdAt
    }
    
    OrderItem {
        int id PK
        int orderId FK
        int productId FK
        int quantity
        decimal price
    }
```

**Schema Prisma completo**:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 1. Modelo de Usuario
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  nombre    String
  password  String   // Hasheado con bcrypt
  role      Role     @default(USER)
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

enum Role {
  USER
  ADMIN
  VENDEDOR
}

// 2. Modelo de Categoría
model Category {
  id       Int       @id @default(autoincrement())
  nombre   String
  slug     String    @unique
  products Product[]

  @@index([slug])
}

// 3. Modelo de Producto
model Product {
  id          Int         @id @default(autoincrement())
  nombre      String
  descripcion String?
  precio      Decimal     @db.Decimal(10, 2)
  stock       Int         @default(0)
  imagen      String?
  categoryId  Int
  category    Category    @relation(fields: [categoryId], references: [id])
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([categoryId])
  @@index([nombre])
}

// 4. Modelo de Orden
model Order {
  id        Int         @id @default(autoincrement())
  userId    Int
  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
  total     Decimal     @db.Decimal(10, 2)
  status    OrderStatus @default(PENDIENTE)
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  @@index([userId])
  @@index([status])
}

enum OrderStatus {
  PENDIENTE
  PAGADO
  ENVIADO
  ENTREGADO
  CANCELADO
}

// 5. Modelo de Item de Orden (relación many-to-many)
model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId Int
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Decimal @db.Decimal(10, 2) // Precio al momento de compra

  @@index([orderId])
  @@index([productId])
}
```

**Paso 3: Crear y aplicar migración**

```bash
# Generar migración inicial
npx prisma migrate dev --name init

# Output:
# ✔ Generated Prisma Client
# ✔ Database schema updated
```

**Paso 4: Seed inicial con datos de prueba**

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Crear categorías
  const categorias = await Promise.all([
    prisma.category.create({
      data: { nombre: 'Electrónica', slug: 'electronica' },
    }),
    prisma.category.create({
      data: { nombre: 'Libros', slug: 'libros' },
    }),
    prisma.category.create({
      data: { nombre: 'Ropa', slug: 'ropa' },
    }),
  ]);

  console.log('✅ Categorías creadas');

  // 2. Crear usuario admin
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@fpuna.edu.py',
      nombre: 'Administrador FPUNA',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuario admin creado');

  // 3. Crear productos de ejemplo
  const productos = await Promise.all([
    prisma.product.create({
      data: {
        nombre: 'Notebook HP 15.6"',
        descripcion: 'Intel Core i5, 8GB RAM, 256GB SSD',
        precio: 3500000, // Gs. 3,500,000
        stock: 10,
        categoryId: categorias[0].id,
        imagen: '/products/notebook-hp.jpg',
      },
    }),
    prisma.product.create({
      data: {
        nombre: 'Cálculo I - James Stewart',
        descripcion: 'Libro de Cálculo para Ingeniería',
        precio: 280000, // Gs. 280,000
        stock: 25,
        categoryId: categorias[1].id,
        imagen: '/products/calculo-stewart.jpg',
      },
    }),
    prisma.product.create({
      data: {
        nombre: 'Polera FPUNA',
        descripcion: 'Polera oficial de la Facultad Politécnica',
        precio: 95000, // Gs. 95,000
        stock: 50,
        categoryId: categorias[2].id,
        imagen: '/products/polera-fpuna.jpg',
      },
    }),
  ]);

  console.log('✅ Productos creados');

  // 4. Crear orden de ejemplo
  const orden = await prisma.order.create({
    data: {
      userId: admin.id,
      total: 3500000,
      status: 'PENDIENTE',
      items: {
        create: [
          {
            productId: productos[0].id,
            quantity: 1,
            price: 3500000,
          },
        ],
      },
    },
  });

  console.log('✅ Orden de ejemplo creada');
  console.log('🎉 Seeding completado!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Ejecutar seed**:

```bash
npx prisma db seed
```

**Paso 5: Explorar database con Prisma Studio**

```bash
npx prisma studio

# Abre en http://localhost:5555
# Interfaz gráfica para ver/editar datos
```

### Implementación con OpenCode

```bash
opencode "Genera schema Prisma para sistema de biblioteca FPUNA:

REQUISITOS:
1. Modelos:
   - Book (libro): título, autor, ISBN, copias disponibles
   - Member (socio): nombre, email, carnet universitario
   - Loan (préstamo): fecha préstamo, fecha devolución, estado
   - Reservation (reserva): fecha reserva, estado

2. Relaciones:
   - Member tiene muchos Loans y Reservations
   - Book tiene muchos Loans y Reservations
   - Loan pertenece a Member y Book
   - Reservation pertenece a Member y Book

3. Validaciones:
   - Email único en Member
   - ISBN único en Book
   - Índices en campos frecuentes

4. Seed data:
   - 3 libros de ingeniería
   - 2 socios de ejemplo
   - 1 préstamo activo

OUTPUT:
- schema.prisma completo
- seed.ts con datos de ejemplo
- TypeScript types bien definidos
- Comentarios en español
- Enums para estados (ACTIVO, VENCIDO, DEVUELTO)"
```

---

**🎯 Transición**: Ya tienes una database funcional con Prisma y sabes diseñar schemas relacionales. Pero tu frontend necesita **acceder** a esos datos de forma segura y eficiente. En aplicaciones tradicionales, crearías REST APIs manualmente, escribiendo tipos duplicados en frontend y backend, lo cual causa errores. Con **tRPC**, obtienes type-safety automática end-to-end—si cambias el backend, TypeScript te alerta inmediatamente en el frontend. En esta parte, aprenderás a crear APIs type-safe que eliminan toda una categoría de bugs.

## 🌐 Parte 2: API Routes & tRPC (70 min)

### Concepto: Type-Safe APIs con tRPC

**Problema tradicional con REST APIs**:

```typescript
// ❌ API REST tradicional
// Backend (api/products/route.ts)
export async function GET(request: Request) {
  const products = await prisma.product.findMany();
  return Response.json(products);
}

// Frontend (página)
const res = await fetch('/api/products');
const products = await res.json(); // ⚠️ Tipo: any
console.log(products[0].nombe); // Typo! No error
```

**Solución con tRPC**:

```typescript
// ✅ tRPC (type-safe end-to-end)
// Backend (server/routers/product.ts)
export const productRouter = router({
  getAll: publicProcedure
    .query(async () => {
      return await prisma.product.findMany();
    }),
});

// Frontend (página)
const { data: products } = trpc.product.getAll.useQuery();
console.log(products[0].nombe); // ❌ TypeScript error!
//                    ~~~~~
//                    Property 'nombe' does not exist
```

### Arquitectura tRPC + Next.js

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
graph TD
    subgraph "Client (Browser)"
        A[🖥️ React Component]
        B[🔄 React Query]
        C[📡 tRPC Client]
    end
    
    subgraph "Server (Next.js)"
        D[API Route Handler<br/>/api/trpc/[trpc]]
        E[tRPC Router]
        F[🔒 Middlewares<br/>Auth, logging]
        G[💼 Procedures<br/>Query/Mutation]
        H[🗃️ Prisma Client]
    end
    
    subgraph "Database"
        I[🐘 PostgreSQL]
    end
    
    A --> B
    B --> C
    C -->|HTTP POST| D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    
    style C fill:#398CCB
    style E fill:#398CCB
    style H fill:#2D3748
```

### Configuración de tRPC en Next.js 14

**Paso 1: Instalación**

```bash
npm install @trpc/server@next @trpc/client@next @trpc/react-query@next @trpc/next@next
npm install @tanstack/react-query@latest
npm install zod
npm install superjson
```

**Paso 2: Crear estructura base**

```typescript
// server/trpc.ts
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

export const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Exportar helpers
export const router = t.router;
export const publicProcedure = t.procedure;
```

**Paso 3: Crear router de productos**

```typescript
// server/routers/product.ts
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validación con Zod
const createProductSchema = z.object({
  nombre: z.string().min(3, 'Nombre debe tener al menos 3 caracteres'),
  descripcion: z.string().optional(),
  precio: z.number().positive('Precio debe ser positivo'),
  stock: z.number().int().min(0, 'Stock no puede ser negativo'),
  categoryId: z.number().int(),
});

export const productRouter = router({
  // Query: Obtener todos los productos
  getAll: publicProcedure
    .input(
      z.object({
        categoryId: z.number().optional(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: input?.categoryId
          ? { categoryId: input.categoryId }
          : undefined,
        take: input?.limit ?? 10,
        skip: input?.cursor ? 1 : 0,
        cursor: input?.cursor
          ? { id: input.cursor }
          : undefined,
        include: {
          category: true, // Include relación
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        products,
        nextCursor: products.length === (input?.limit ?? 10)
          ? products[products.length - 1].id
          : undefined,
      };
    }),

  // Query: Obtener producto por ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
        include: {
          category: true,
        },
      });

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return product;
    }),

  // Mutation: Crear producto
  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ input }) => {
      // Verificar que categoría existe
      const category = await prisma.category.findUnique({
        where: { id: input.categoryId },
      });

      if (!category) {
        throw new Error('Categoría no existe');
      }

      // Crear producto
      const product = await prisma.product.create({
        data: {
          nombre: input.nombre,
          descripcion: input.descripcion,
          precio: input.precio,
          stock: input.stock,
          categoryId: input.categoryId,
        },
        include: {
          category: true,
        },
      });

      return product;
    }),

  // Mutation: Actualizar producto
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: createProductSchema.partial(),
      })
    )
    .mutation(async ({ input }) => {
      const product = await prisma.product.update({
        where: { id: input.id },
        data: input.data,
        include: {
          category: true,
        },
      });

      return product;
    }),

  // Mutation: Eliminar producto
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // Verificar que no tiene órdenes asociadas
      const orderItems = await prisma.orderItem.count({
        where: { productId: input.id },
      });

      if (orderItems > 0) {
        throw new Error(
          'No se puede eliminar producto con órdenes asociadas'
        );
      }

      await prisma.product.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
```

**Paso 4: Router principal (app router)**

```typescript
// server/routers/_app.ts
import { router } from '../trpc';
import { productRouter } from './product';
import { categoryRouter } from './category';
import { orderRouter } from './order';

export const appRouter = router({
  product: productRouter,
  category: categoryRouter,
  order: orderRouter,
});

// Exportar tipo del router
export type AppRouter = typeof appRouter;
```

**Paso 5: API Route Handler**

```typescript
// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers/_app';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
```

**Paso 6: tRPC Client setup**

```typescript
// lib/trpc/client.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();
```

```typescript
// lib/trpc/Provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './client';
import superjson from 'superjson';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

**Paso 7: Wrapper en layout raíz**

```typescript
// app/layout.tsx
import { TRPCProvider } from '@/lib/trpc/Provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
```

### Usando tRPC en Componentes

```typescript
// app/products/page.tsx
'use client';

import { trpc } from '@/lib/trpc/client';

export default function ProductsPage() {
  // Query con React Query hooks
  const { data, isLoading, error } = trpc.product.getAll.useQuery({
    limit: 20,
  });

  if (isLoading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Componente de producto con mutation
function ProductCard({ product }: { product: any }) {
  const utils = trpc.useContext();

  // Mutation para eliminar
  const deleteMutation = trpc.product.delete.useMutation({
    onSuccess: () => {
      // Invalidar query para refetch
      utils.product.getAll.invalidate();
    },
  });

  const handleDelete = () => {
    if (confirm('¿Eliminar producto?')) {
      deleteMutation.mutate({ id: product.id });
    },
  };

  return (
    <div className="border p-4 rounded">
      <h3>{product.nombre}</h3>
      <p>Gs. {product.precio.toLocaleString()}</p>
      <p className="text-sm text-gray-600">{product.category.nombre}</p>
      <button
        onClick={handleDelete}
        disabled={deleteMutation.isLoading}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
      >
        {deleteMutation.isLoading ? 'Eliminando...' : 'Eliminar'}
      </button>
    </div>
  );
}
```

### Implementación con OpenCode

```bash
opencode "Genera tRPC router completo para 'OrderRouter':

REQUISITOS:
1. Queries:
   - getAll (con paginación y filtro por status)
   - getById (con items, productos y usuario)
   - getByUserId (órdenes de un usuario)

2. Mutations:
   - create (recibe userId y array de items)
     * Validar stock disponible
     * Calcular total automáticamente
     * Reducir stock de productos
     * Crear orden con items
   - updateStatus (cambiar estado de orden)
   - cancel (cancelar orden, devolver stock)

3. Validaciones Zod:
   - CreateOrderInput (userId, items[])
   - UpdateStatusInput (id, status)
   - Validar que quantity > 0
   - Validar que productos existen

4. Error handling:
   - Producto no existe
   - Stock insuficiente
   - Orden no encontrada
   - Usuario no encontrado

TECNOLOGÍAS:
- tRPC v11
- Prisma
- Zod
- TypeScript

OUTPUT:
- order.router.ts completo
- Tipos bien definidos
- Comentarios en español
- Include relations apropiadas"
```

---

## 🔄 Parte 3: React Query & State Management (50 min)

### Concepto: Server State vs Client State

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
mindmap
  root((State Types))
    Client State
      UI local data
      Form values
      Modal open/closed
      useState, useReducer
    Server State
      Database data
      API responses
      Cache on client
      React Query maneja
```

**Server State** es diferente porque:
- ❌ No controlamos cuándo cambia (otros usuarios pueden modificar)
- ✅ Necesita sincronización constante
- ✅ Requiere caching inteligente
- ✅ Loading/error states complejos

### React Query: The Missing Piece

```typescript
// ❌ Manejo manual (mucho código)
function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // Sin caching, refetch automático, mutations, etc.
  // ...
}

// ✅ Con React Query + tRPC (simple y potente)
function ProductList() {
  const { data: products, isLoading, error } = trpc.product.getAll.useQuery();

  // Auto caching, refetch automático, error retry, etc.
  // ...
}
```

### Patrones Avanzados de React Query

#### 1. Optimistic Updates

```typescript
// Actualizar UI antes de que el servidor responda
function ProductCard({ product }: { product: Product }) {
  const utils = trpc.useContext();

  const updateMutation = trpc.product.update.useMutation({
    // Optimistic update
    onMutate: async (newData) => {
      // Cancelar queries en vuelo
      await utils.product.getAll.cancel();

      // Snapshot del estado anterior
      const previousProducts = utils.product.getAll.getData();

      // Actualizar cache optimistically
      utils.product.getAll.setData(undefined, (old) => ({
        ...old!,
        products: old!.products.map((p) =>
          p.id === newData.id
            ? { ...p, ...newData.data }
            : p
        ),
      }));

      return { previousProducts };
    },
    // Si falla, rollback
    onError: (err, newData, context) => {
      utils.product.getAll.setData(undefined, context?.previousProducts);
    },
    // Siempre refetch después
    onSettled: () => {
      utils.product.getAll.invalidate();
    },
  });

  return (
    <div>
      <input
        type="number"
        value={product.stock}
        onChange={(e) => {
          updateMutation.mutate({
            id: product.id,
            data: { stock: parseInt(e.target.value) },
          });
        }}
      />
    </div>
  );
}
```

#### 2. Infinite Queries (Scroll Infinito)

```typescript
function InfiniteProductList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.product.getAll.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
        </button>
      )}
    </div>
  );
}
```

#### 3. Dependent Queries

```typescript
// Query que depende de otro
function OrderDetails({ orderId }: { orderId: number }) {
  // 1. Obtener orden
  const { data: order } = trpc.order.getById.useQuery({ id: orderId });

  // 2. Obtener usuario (solo si orden existe)
  const { data: user } = trpc.user.getById.useQuery(
    { id: order?.userId! },
    {
      enabled: !!order?.userId, // Solo ejecuta si tenemos userId
    }
  );

  return (
    <div>
      <h2>Orden #{order?.id}</h2>
      <p>Cliente: {user?.nombre}</p>
    </div>
  );
}
```

### Configuración Global de React Query

```typescript
// lib/trpc/Provider.tsx
const [queryClient] = useState(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minuto
          cacheTime: 10 * 60 * 1000, // 10 minutos
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    })
);
```

---

## 📝 Parte 4: Forms & Validation (40 min)

### React Hook Form + Zod

**Flujo de validación completo**:

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
sequenceDiagram
    participant U as Usuario
    participant F as 📝 Form (RHF)
    participant Z as Zod Schema
    participant T as tRPC
    participant P as 🗃️ Prisma
    
    U->>F: Llena formulario
    F->>Z: Valida con schema
    
    alt Validación falla
        Z->>F: Retorna errores
        F->>U: Muestra errores inline
    else Validación OK
        Z->>F: Data válida
        F->>T: mutation.mutate(data)
        T->>Z: Re-valida server-side
        
        alt Server validation falla
            Z->>T: Throw error
            T->>F: Retorna error
            F->>U: Muestra error mensaje
        else Todo OK
            Z->>P: Guarda en DB
            P->>T: Retorna datos
            T->>F: onSuccess callback
            F->>U: Éxito + reset form
        end
    end
    
    Note over U,P: Doble validación: Cliente + Servidor
```

**El problema de formularios tradicionales**:

```typescript
// ❌ Forma tradicional (mucho código boilerplate)
function ProductForm() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validación manual
    const newErrors: any = {};
    if (!nombre) newErrors.nombre = 'Nombre requerido';
    if (!precio || Number(precio) <= 0) newErrors.precio = 'Precio inválido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      {errors.nombre && <span>{errors.nombre}</span>}
      {/* Repetir para cada campo... */}
    </form>
  );
}
```

**✅ Solución moderna**:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Schema de validación
const productSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  descripcion: z.string().optional(),
  precio: z.number().positive('Precio debe ser positivo'),
  stock: z.number().int().min(0, 'Stock no puede ser negativo'),
  categoryId: z.number(),
});

type ProductFormData = z.infer<typeof productSchema>;

function ProductForm() {
  const utils = trpc.useContext();

  // 2. Hook form con Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      stock: 0,
    },
  });

  // 3. tRPC mutation
  const createMutation = trpc.product.create.useMutation({
    onSuccess: () => {
      utils.product.getAll.invalidate();
      reset();
    },
  });

  // 4. Submit handler
  const onSubmit = (data: ProductFormData) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo nombre */}
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          {...register('nombre')}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm">{errors.nombre.message}</p>
        )}
      </div>

      {/* Campo descripción */}
      <div>
        <label className="block font-medium">Descripción</label>
        <textarea
          {...register('descripcion')}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Campo precio */}
      <div>
        <label className="block font-medium">Precio (Gs.)</label>
        <input
          {...register('precio', { valueAsNumber: true })}
          type="number"
          step="1000"
          className="border rounded px-3 py-2 w-full"
        />
        {errors.precio && (
          <p className="text-red-500 text-sm">{errors.precio.message}</p>
        )}
      </div>

      {/* Campo stock */}
      <div>
        <label className="block font-medium">Stock</label>
        <input
          {...register('stock', { valueAsNumber: true })}
          type="number"
          className="border rounded px-3 py-2 w-full"
        />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || createMutation.isLoading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {createMutation.isLoading ? 'Creando...' : 'Crear Producto'}
      </button>

      {/* Error de mutation */}
      {createMutation.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {createMutation.error.message}
        </div>
      )}
    </form>
  );
}
```

### Form completo con Categorías (Select)

```typescript
function ProductFormComplete() {
  const { data: categories } = trpc.category.getAll.useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const createMutation = trpc.product.create.useMutation();

  const onSubmit = (data: ProductFormData) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... otros campos ... */}

      {/* Select de categoría */}
      <div>
        <label>Categoría</label>
        <select
          {...register('categoryId', { valueAsNumber: true })}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Seleccione categoría</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500">{errors.categoryId.message}</p>
        )}
      </div>

      <button type="submit">Crear</button>
    </form>
  );
}
```

### Error Handling Estrategias

**Flow de manejo de errores**:

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
graph TD
    subgraph "Error Handling Pipeline"
        A[Error Ocurre]
        B{Dónde?}
        
        B -->|Validación Zod| C[🔴 ZodError]
        B -->|Prisma| D[🔴 PrismaError]
        B -->|Business Logic| E[🔴 TRPCError]
        
        C --> F[Error Formatter]
        D --> F
        E --> F
        
        F --> G[📤 Respuesta HTTP]
        G --> H[tRPC Client]
        H --> I[🎨 UI Component]
        
        I --> J{Tipo Error}
        J -->|Validation| K[Mostrar inline]
        J -->|Not Found| L[404 page]
        J -->|Server| M[Toast message]
        J -->|Network| N[Retry button]
    end
    
    style C fill:#b71c1c
    style D fill:#b71c1c
    style E fill:#b71c1c
    style K fill:#1b5e20
```

**Ejemplo completo de error handling**:

```typescript
// En tRPC router
import { TRPCError } from '@trpc/server';

export const productRouter = router({
  create: publicProcedure
    .input(productSchema)
    .mutation(async ({ input }) => {
      try {
        // Validación de negocio
        const existing = await prisma.product.findFirst({
          where: { nombre: input.nombre },
        });

        if (existing) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Ya existe un producto con ese nombre',
          });
        }

        // Crear producto
        const product = await prisma.product.create({
          data: input,
        });

        return product;
      } catch (error) {
        // Manejar errores de Prisma
        if (error.code === 'P2002') {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Violación de constraint único',
          });
        }

        // Re-throw si ya es TRPCError
        if (error instanceof TRPCError) {
          throw error;
        }

        // Error genérico
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al crear producto',
          cause: error,
        });
      }
    }),
});

// En el componente
function ProductForm() {
  const createMutation = trpc.product.create.useMutation({
    onError: (error) => {
      // Toast notification
      toast.error(error.message);
      
      // Log para debugging
      console.error('Error creando producto:', error);
      
      // Analytics
      trackError('product_create_failed', {
        code: error.data?.code,
        message: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success(`Producto "${data.nombre}" creado exitosamente`);
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => createMutation.mutate(data))}>
      {/* ... campos ... */}
      
      {/* Mostrar error global */}
      {createMutation.error && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-800 font-medium">
            {createMutation.error.message}
          </p>
          {createMutation.error.data?.zodError && (
            <ul className="mt-2 text-sm text-red-600">
              {Object.entries(createMutation.error.data.zodError.fieldErrors).map(
                ([field, errors]) => (
                  <li key={field}>
                    {field}: {errors?.join(', ')}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
```

### Implementación con OpenCode

```bash
opencode "Genera formulario completo con React Hook Form + Zod para crear orden:

REQUISITOS:
1. Schema Zod:
   - userId (número, requerido)
   - items (array de { productId, quantity })
   - Validar quantity > 0
   - Validar al menos 1 item

2. Formulario con campos:
   - Select de usuario (fetch con tRPC)
   - Selector de productos (multiple)
   - Input quantity para cada producto
   - Botón agregar/remover productos
   - Total calculado en tiempo real

3. Funcionalidad:
   - Calcular total sumando precio * quantity
   - Validar stock disponible (mostrar warning)
   - Submit con tRPC mutation
   - Success: limpiar form + mensaje
   - Error: mostrar error del servidor

4. UX:
   - Loading states
   - Disabled states apropiados
   - Errores inline por campo
   - Confirmación antes de submit

TECNOLOGÍAS:
- React Hook Form v7
- Zod
- tRPC
- Tailwind CSS

OUTPUT:
- CreateOrderForm.tsx completo
- Comentarios explicativos
- Todo en TypeScript
- Componente reutilizable"
```

---

## 🎯 Ejercicio Práctico Integrador

### Objetivo

Crear **Sistema de Reserva de Salas FPUNA** completo con Prisma + tRPC + React Query.

### Requisitos

**Database Schema**:
- `Room` (sala): nombre, capacidad, piso, equipamiento
- `Reservation` (reserva): fecha, hora inicio, hora fin, propósito
- `User` (usuario): nombre, email, carrera

**Funcionalidades**:
1. Listar salas disponibles con filtros (piso, capacidad mínima)
2. Ver calendario de reservas de una sala
3. Crear reserva (validar disponibilidad)
4. Cancelar reserva (solo el creador)
5. Dashboard admin con todas las reservas

### Paso a Paso con OpenCode

```bash
# 1. Generar schema Prisma
opencode "Genera schema Prisma para sistema de reservas de salas FPUNA con:
- Room (nombre, capacidad, piso, equipamiento[])
- Reservation (roomId, userId, fecha, horaInicio, horaFin, proposito, status)
- User (nombre, email, carrera, role)
- Relaciones apropiadas
- Validaciones e índices
- Seed con 5 salas y 10 reservas de ejemplo"

# 2. Generar tRPC routers
opencode "Genera tRPC router 'roomRouter' con:
- getAll (con filtros: piso, capacidadMin)
- getById (con reservas futuras)
- getAvailability (dado fecha y rango horario)
- Todos type-safe con Zod"

opencode "Genera tRPC router 'reservationRouter' con:
- create (validar sala disponible, sin overlapping)
- cancel (solo creador o admin)
- getByUserId
- Validaciones Zod completas"

# 3. Generar componentes
opencode "Genera componente RoomList con:
- Filtros de piso y capacidad
- Grid de salas con info
- Click abre modal de reservas
- React Query para data fetching"

opencode "Genera componente CreateReservationForm con:
- Select de sala
- DatePicker para fecha
- Time range para horas
- Validación de disponibilidad en tiempo real
- React Hook Form + Zod"

# 4. Generar dashboard admin
opencode "Genera AdminDashboard con:
- Tabla de todas las reservas
- Filtros por fecha, sala, usuario
- Acciones: aprobar, rechazar, cancelar
- Infinite scroll con React Query"
```

---

## 🚀 Deployment Architecture

**Stack completo desplegado en producción**:

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%
graph TD
    subgraph "Production Environment"
        subgraph "Vercel (Frontend + API)"
            A[Next.js App<br/>Vercel Edge Network]
            B[API Routes<br/>Serverless Functions]
            C[tRPC Handlers<br/>Lambda Functions]
        end
        
        subgraph "Neon (Database)"
            D[🐘 PostgreSQL<br/>Managed DB]
            E[🔄 Connection Pooling<br/>PgBouncer]
        end
        
        subgraph "External Services"
            F[Email Service<br/>Resend/SendGrid]
            G[Analytics<br/>Vercel Analytics]
            H[🔐 Auth Provider<br/>NextAuth]
        end
        
        A -->|SSR/SSG| Users
        A -->|API Calls| B
        B --> C
        C --> E
        E --> D
        C --> F
        A --> G
        A --> H
    end
    
    subgraph "Development"
        I[Local Dev<br/>localhost:3000]
        J[🗄️ Local PostgreSQL<br/>Docker]
        I --> J
    end
    
    style A fill:#61DAFB
    style D fill:#336791
    style E fill:#336791
    style I fill:#e65100
```

**Deployment checklist**:
- ✅ Environment variables configuradas en Vercel
- ✅ Database connection string apunta a Neon
- ✅ Migrations aplicadas en producción
- ✅ CORS configurado apropiadamente
- ✅ Rate limiting en API routes
- ✅ Error tracking (Sentry)
- ✅ Analytics configurado
- ✅ Domain personalizado conectado

---

## ✅ Checklist de Full-Stack Professional

Antes de considerar tu app "production-ready":

### Database & Prisma
- [ ] Schema con relaciones bien definidas
- [ ] Índices en campos frecuentemente buscados
- [ ] Migrations aplicadas y versionadas
- [ ] Seed script con datos de prueba
- [ ] Cascades y constraints apropiados

### tRPC & APIs
- [ ] Todos los endpoints type-safe
- [ ] Validaciones Zod en todos los inputs
- [ ] Error handling consistente
- [ ] Procedures protegidos con auth (si aplica)
- [ ] Testing de routers con vitest

### React Query
- [ ] Configuración global de caching
- [ ] Optimistic updates en mutations críticas
- [ ] Invalidation correcta de queries
- [ ] Loading y error states manejados
- [ ] Infinite queries para listas largas

### Forms
- [ ] React Hook Form + Zod en todos los forms
- [ ] Validaciones client-side y server-side
- [ ] Error messages claros en español
- [ ] Success feedback al usuario
- [ ] Disabled states durante submit

### Performance
- [ ] Queries con paginación (no fetch all)
- [ ] Select solo campos necesarios en Prisma
- [ ] Indices en campos filtrados/ordenados
- [ ] Caching apropiado en React Query
- [ ] Lazy loading de componentes pesados

---

## 🎓 Mejores Prácticas

### ✅ HACER

1. **Compartir schemas Zod** entre frontend/backend
2. **Type-safety end-to-end** - Nunca usar `any`
3. **Validar en ambos lados** - Cliente Y servidor
4. **Usar transacciones** para operaciones multi-step
5. **Manejar errores** de forma consistente
6. **Cachear apropiadamente** con React Query
7. **Optimistic updates** para mejor UX
8. **Indices en Prisma** para performance

### ❌ NO HACER

1. **Confiar solo en validación cliente** - Siempre validar servidor
2. **Fetch sin límites** - Siempre paginar
3. **Obviar loading states** - Frustración del usuario
4. **Ignorar errores** - Siempre manejar y mostrar
5. **Mutations sin invalidation** - Data stale
6. **Overfetching** - Select solo lo necesario
7. **Relaciones N+1** - Usar `include` apropiadamente
8. **Credentials en código** - Usar variables de entorno

---

## 🎉 Resumen del Módulo

### Lo Que Dominaste

✅ **Prisma ORM** - Database type-safe con PostgreSQL  
✅ **tRPC** - APIs type-safe sin código duplicado  
✅ **React Query** - Server state management profesional  
✅ **React Hook Form + Zod** - Formularios validados  
✅ **Full-Stack Type-Safety** - De UI a Database  
✅ **OpenCode Integration** - Generar backends completos

### Próximo Paso

**Continúa con**: [Módulo 03 - Authentication & Authorization](./03-autenticacion-autorizacion.md)

---

## 📝 Quiz de Evaluación

### Instrucciones
- **Total**: 10 preguntas | **Tiempo**: 25 min | **Aprobación**: 7+

### Preguntas

**1. Prisma Schema (Múltiple Opción)**  
¿Cuál es la sintaxis correcta para definir una relación one-to-many en Prisma?

a) `posts Post[]` (en User) y `author User @relation(fields: [authorId])`  
b) `user User` (en Post) solamente  
c) `@relation(type: "oneToMany")`  
d) No se pueden definir relaciones en Prisma

**2. Prisma Migrations (Verdadero/Falso)**  
"Al cambiar el schema de Prisma, debes correr `npx prisma migrate dev` para aplicar cambios a la database."  
a) Verdadero | b) Falso

**3. tRPC Type Safety (Múltiple Opción)**  
¿Cuál es la PRINCIPAL ventaja de tRPC vs REST API tradicional?

a) Más rápido en ejecución  
b) Type-safety end-to-end sin code generation  
c) Soporta más databases  
d) Mejor SEO

**4. React Query (Múltiple Opción)**  
¿Para qué sirve `useQuery` de React Query?

a) Crear queries SQL  
b) Fetch y cachear datos del servidor  
c) Validar formularios  
d) Crear routes en Next.js

**5. Prisma CRUD (Respuesta Corta)**  
¿Qué método de Prisma usarías para obtener un usuario por ID?

Opciones: `findUnique`, `findMany`, `create`, `update`

**6. tRPC Mutations (Verdadero/Falso)**  
"En tRPC, las mutations se usan para operaciones que MODIFICAN datos (create, update, delete)."  
a) Verdadero | b) Falso

**7. Zod Validation (Múltiple Opción)**  
¿Para qué sirve Zod en el stack?

a) Manejo de estado global  
b) Validación de schemas y tipos runtime  
c) Optimización de imágenes  
d) Routing dinámico

**8. React Hook Form (Múltiple Opción)**  
¿Cuál hook usas para registrar un input en React Hook Form?

a) `useForm()`  
b) `register()`  
c) `handleSubmit()`  
d) `watch()`

**9. Database Seeding (Múltiple Opción)**  
¿Qué comando de Prisma usas para poblar la database con datos iniciales?

a) `npx prisma seed`  
b) `npx prisma db seed`  
c) `npx prisma migrate seed`  
d) El comando definido en package.json `prisma.seed`

**10. OpenCode Full-Stack (Respuesta Corta)**  
Menciona 2 formas en que OpenCode acelera desarrollo full-stack.

---

## 📋 Respuestas

**1. b)** - Relación one-to-many usa `posts Post[]` en User y `author User @relation(fields: [authorId], references: [id])` en Post.

**2. a) Verdadero** - `prisma migrate dev` crea y aplica migraciones.

**3. b)** - tRPC provee type-safety automática sin generación de código.

**4. b)** - `useQuery` fetch y cachea datos automáticamente.

**5. findUnique** - `prisma.user.findUnique({ where: { id } })`

**6. a) Verdadero** - Mutations para create/update/delete, queries para reads.

**7. b)** - Zod valida y define schemas con type inference.

**8. b)** - `register('fieldName')` registra inputs.

**9. b)** - `npx prisma db seed` ejecuta script de seed.

**10. Ejemplos válidos**:
- "Generar schemas Prisma completos con relaciones"
- "Crear tRPC routers con procedures automáticamente"
- "Automatizar generación de forms con validación Zod"

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Prisma Docs](https://www.prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

### Cursos Paraguay
- **Aruma Tech Talks** - Arquitectura full-stack moderna
- **FPUNA - Taller de Bases de Datos** - PostgreSQL avanzado
- **Global Logic Workshop** - React Query patterns

### Tools
- **Prisma Studio** - GUI para tu database
- **tRPC Panel** - Testing de endpoints
- **React Query Devtools** - Debug de queries
- **Neon** - PostgreSQL hosting gratuito

---

*Módulo creado para FPUNA Verano 2026*  
*Actualizado: Enero 2026*  
*Track: Web Development Full-Stack*
