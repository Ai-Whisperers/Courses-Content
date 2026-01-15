# 🔐 Módulo 03: Authentication & Authorization

## Seguridad Web Profesional con NextAuth.js v5

> **Para Desarrolladores Web**: Este módulo te enseña a implementar autenticación y autorización seguras usando NextAuth.js v5 (Auth.js), múltiples providers OAuth, JWT vs Sessions, y Role-Based Access Control (RBAC). Aprenderás seguridad real aplicable a fintech y banking en Paraguay, acelerado con opencode.

**⏱️ Duración**: 4 horas  
**👤 Nivel**: Intermedio  
**🎯 Objetivo**: Dominar auth/authorization profesional en Next.js con estándares de seguridad paraguayos

---

## 🎓 ¿Qué Vas a Lograr?

1. ✅ **Configurar NextAuth.js v5** - Setup completo y funcionando
2. ✅ **Implementar múltiples providers** - Google, GitHub, credentials
3. ✅ **Manejar sesiones** - JWT vs Database strategies
4. ✅ **Proteger rutas** - Middleware y authorization
5. ✅ **Implementar RBAC** - Roles y permisos granulares
6. ✅ **Seguridad bancaria** - Estándares fintech Paraguay
7. ✅ **Acelerar con opencode** - Auth setup automático

---

## 📋 Prerrequisitos

### Conocimientos Requeridos

**Desde Módulo 02 (Full-Stack Development)**:
- ✅ **Prisma ORM**: Entiendes cómo crear modelos, migrations, y queries básicas
  - Verificación: ¿Puedes crear un modelo `User` con campos `id`, `email`, `name`?
- ✅ **API Routes en Next.js**: Sabes crear rutas GET/POST en `app/api/`
  - Verificación: ¿Has creado al menos una API route que devuelve JSON?
- ✅ **Server Actions**: Comprendes cómo funcionan y cuándo usarlas
  - Verificación: ¿Sabes agregar `"use server"` y crear una async function?
- ✅ **TypeScript básico**: Interfaces, types, async/await
  - Verificación: ¿Entiendes qué es `Promise<User>` y cómo usar `await`?

**Desde Módulo 01 (Next.js Foundations)**:
- ✅ **App Router**: File-based routing, Server vs Client Components
  - Verificación: ¿Sabes cuándo usar `"use client"` vs componente por defecto?
- ✅ **Environment variables**: Cómo configurar y usar `.env`
  - Verificación: ¿Has usado `process.env.VARIABLE_NAME` antes?

**Conceptos Generales**:
- ✅ **HTTP basics**: GET, POST, headers, cookies
  - Verificación: ¿Entiendes qué son headers HTTP y para qué sirven?
- ✅ **JSON**: Manipulación de objetos JavaScript
  - Verificación: ¿Puedes parsear y stringify JSON?
- ✅ **Async JavaScript**: Promises, async/await, try/catch
  - Verificación: ¿Entiendes por qué usamos `await` con fetch()?

### Software Necesario

Verifica que tienes instalado (desde módulos previos):

```bash
# 1. Node.js v18+
node --version  
# ✅ Debe mostrar v18.0.0 o superior
# ❌ Si no: Descarga desde nodejs.org

# 2. Next.js project existente
# (Deberías tener un proyecto de módulos 01-02)
ls app/  
# ✅ Debe mostrar: page.tsx, layout.tsx, etc.
# ❌ Si no: npx create-next-app@latest

# 3. Prisma instalado
npx prisma --version
# ✅ Debe mostrar versión 5.x
# ❌ Si no: npm install prisma @prisma/client

# 4. PostgreSQL disponible
# Opción A: Docker local
docker ps | grep postgres
# ✅ Debe mostrar container corriendo

# Opción B: Neon/Supabase cloud
# Verifica que DATABASE_URL está en tu .env
cat .env | grep DATABASE_URL
# ✅ Debe mostrar: DATABASE_URL="postgresql://..."
```

### Cuentas Necesarias (100% Gratis)

Para este módulo necesitarás crear las siguientes cuentas si aún no las tienes:

#### 1. Google Cloud Console (Para OAuth Google)
- [ ] **Ir a**: https://console.cloud.google.com
- [ ] **Crear proyecto**: "FPUNA Auth" (o nombre de tu proyecto)
- [ ] **Habilitar API**: Google+ API o "Google OAuth 2.0"
- [ ] **Crear credenciales**: OAuth 2.0 Client ID
  - Application type: Web application
  - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
- [ ] **Copiar**: Client ID y Client Secret a tu `.env`

**Tiempo estimado**: 5 minutos

#### 2. GitHub Developer Settings (Para OAuth GitHub)
- [ ] **Ir a**: https://github.com/settings/developers
- [ ] **New OAuth App**
- [ ] **Configurar**:
  - Application name: "FPUNA Portal"
  - Homepage URL: `http://localhost:3000`
  - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
- [ ] **Copiar**: Client ID y generar Client Secret
- [ ] **Agregar** a tu `.env`

**Tiempo estimado**: 3 minutos

#### 3. Upstash Redis (Opcional - Para Rate Limiting)
- [ ] **Ir a**: https://upstash.com
- [ ] **Crear cuenta** (GitHub login disponible)
- [ ] **Create Database**: Redis (free tier 10,000 commands/day)
- [ ] **Copiar**: REST URL y REST TOKEN
- [ ] **Agregar** a `.env` (si implementas rate limiting)

**Tiempo estimado**: 5 minutos  
**Nota**: Opcional. Rate limiting se puede implementar después.

### Auto-Evaluación

**Responde honestamente**. Necesitas **SÍ** en las primeras 5 para continuar:

1. **¿Puedes crear un nuevo modelo Prisma y correr migrations?**  
   SÍ / NO  
   *Si NO*: Revisa [Módulo 02, Parte 2](./02-fullstack-development.md#parte-2-prisma-orm)

2. **¿Entiendes la diferencia entre Server Component y Client Component en Next.js?**  
   SÍ / NO  
   *Si NO*: Revisa [Módulo 01, Parte 3](./01-nextjs-foundations.md#parte-3-server-vs-client-components)

3. **¿Sabes qué es una API Route en Next.js y cómo crearla?**  
   SÍ / NO  
   *Si NO*: Revisa [Módulo 02, Parte 3](./02-fullstack-development.md#parte-3-api-routes)

4. **¿Comprendes qué es authentication vs authorization?**  
   SÍ / NO  
   *Si NO*: Lee la sección "¿Por Qué Auth/Authorization es Crítico?" más abajo primero

5. **¿Tienes un proyecto Next.js funcionando con Prisma configurado?**  
   SÍ / NO  
   *Si NO*: Completa ejercicios de Módulos 01-02 primero

6. **¿Ya creaste las cuentas necesarias (Google Cloud, GitHub Developer)?**  
   SÍ / NO  
   *Si NO*: Hazlo ahora (10 minutos totales), las necesitarás en Parte 2

### Si Respondiste NO a Alguna de las Primeras 5

**🛑 No continúes aún**. Este módulo asume conocimientos sólidos de los módulos previos.

**Acción recomendada**:
1. Identifica qué concepto necesitas reforzar
2. Vuelve al módulo correspondiente (usa los links arriba)
3. Completa el ejercicio práctico de ese módulo
4. Regresa cuando tengas 5 SÍes

**💡 ¿Por qué es importante?** Authentication es un tema complejo con implicaciones de seguridad. Sin bases sólidas en Next.js y Prisma, te frustrarás y cometerás errores críticos.

### Tiempo Estimado

- **Si tienes todos los prerrequisitos**: 3.5-4 horas
- **Si necesitas repasar conceptos**: +2 horas
- **Ejercicio práctico (Sistema Auth FPUNA)**: +4 horas extra-clase

**Total recomendado**: Dedica **1-2 días** a este módulo para absorber bien los conceptos de seguridad. No lo apresures.

### Checklist Final Antes de Empezar

- [ ] Tengo Next.js 14 proyecto funcionando
- [ ] Prisma instalado y `DATABASE_URL` configurado
- [ ] Cuenta Google Cloud creada (Client ID/Secret obtenidos)
- [ ] Cuenta GitHub Developer creada (Client ID/Secret obtenidos)
- [ ] Entiendo Server vs Client Components
- [ ] Sé crear API Routes
- [ ] Sé usar Prisma para queries básicas
- [ ] Tengo 2-4 horas disponibles sin interrupciones

**Si marcaste todos ✅**: ¡Perfecto! Estás listo para comenzar. 🚀

**Si falta alguno**: Completa los pendientes primero. Este módulo requiere bases sólidas.

---

## 🤔 ¿Por Qué Auth/Authorization es Crítico?

### Analogía: Sistema de Seguridad Bancaria

```mermaid
mindmap
  root((Security))
    Banco Físico
      Identificación en entrada
      Niveles de acceso
      Registro de movimientos
      Alerta de actividad sospechosa
    Aplicación Web
      Authentication - Verificar identidad
      Authorization - Controlar acceso
      Audit logs - Registro actividad
      Rate limiting - Detectar ataques
```

**Authentication** = ¿Quién eres? (Login con email/password, Google, etc.)  
**Authorization** = ¿Qué puedes hacer? (Admin puede eliminar, user solo leer)

### ¿Por Qué en Paraguay?

**Realidad del sector financiero local**:
- ✅ **Banco Atlas** - Requiere 2FA obligatorio para apps
- ✅ **Tigo Money** - OAuth + biometría para transacciones
- ✅ **Aruma** - Auth robusta por compliance bancaria
- ✅ **Personal Pay** - JWT + refresh tokens por seguridad

**Sin auth profesional** = No pasas auditorías de seguridad 🚫

### Estadísticas de Seguridad Web

```mermaid
graph TD
    subgraph "Common Security Breaches"
        A[🔓 Weak Authentication<br/>40% de ataques]
        B[🔑 Leaked Credentials<br/>25% de brechas]
        C[⚠️ Poor Authorization<br/>20% de vulnerabilidades]
        D[🕵️ Session Hijacking<br/>15% de incidentes]
    end
    
    style A fill:#FFE1E1
    style B fill:#FFF4E1
    style C fill:#FFE1F5
    style D fill:#E1F5FF
```

---

## 📊 Conceptos Fundamentales de Seguridad

### Authentication Flow Completo

```mermaid
sequenceDiagram
    participant U as 👤 Usuario
    participant F as 🌐 Frontend
    participant A as 🔐 Auth Server
    participant D as 🗄️ Database
    
    U->>F: 1. Click "Login con Google"
    F->>A: 2. Redirect a Google OAuth
    A->>U: 3. Pedir autorización
    U->>A: 4. Aprobar (email, perfil)
    A->>D: 5. Verificar/crear usuario
    D->>A: 6. Usuario data
    A->>F: 7. Redirect con session token
    F->>U: 8. Dashboard autenticado
    
    Note over U,D: OAuth 2.0 Flow
```

### Authorization Levels

```mermaid
graph TD
    subgraph "RBAC Hierarchy"
        A[👑 Super Admin<br/>Full access]
        B[🔧 Admin<br/>Manage users + content]
        C[✏️ Editor<br/>Create + edit content]
        D[👁️ Viewer<br/>Read-only]
        E[🚫 Guest<br/>Public pages only]
        
        A --> B
        B --> C
        C --> D
        D --> E
    end
    
    style A fill:#FFE1E1
    style B fill:#FFF4E1
    style C fill:#E1FFE1
    style D fill:#E1F5FF
    style E fill:#E1E1E1
```

### JWT vs Session Strategy

```mermaid
graph LR
    subgraph "JWT Strategy"
        A1[🔐 Login] --> B1[📝 Generate JWT]
        B1 --> C1[💾 Store client-side]
        C1 --> D1[📤 Send with requests]
        D1 --> E1[✅ Validate signature]
    end
    
    subgraph "Session Strategy"
        A2[🔐 Login] --> B2[🆔 Generate session ID]
        B2 --> C2[🗄️ Store server-side]
        C2 --> D2[🍪 Cookie to client]
        D2 --> E2[🔍 Lookup in DB]
    end
    
    style A1 fill:#E1FFE1
    style A2 fill:#E1F5FF
```

**Comparación**:

| Aspecto | JWT | Session |
|---------|-----|---------|
| **Storage** | Client-side | Server-side |
| **Scalability** | ✅ Excelente (stateless) | ⚠️ Requiere shared storage |
| **Security** | ⚠️ No se puede revocar fácil | ✅ Revocable inmediato |
| **Performance** | ✅ No DB lookup | ⚠️ DB query por request |
| **Use Case** | APIs, microservicios | Apps tradicionales |

**Recomendación FPUNA**: JWT para APIs, Session para web apps con DB.

---

## 🏢 Parte 1: NextAuth.js v5 Basics (60 min)

### ¿Qué es NextAuth.js v5?

**NextAuth.js** (ahora **Auth.js**) es la solución #1 para autenticación en Next.js. Versión 5 trae mejoras importantes:

- ✅ App Router nativo (Next.js 14+)
- ✅ Server Actions integration
- ✅ TypeScript-first
- ✅ Edge-compatible
- ✅ Mejor DX (Developer Experience)

### Instalación y Setup Inicial

**Step 1: Instalar dependencias**

```bash
npm install next-auth@beta
npm install @auth/prisma-adapter # Si usas Prisma
```

**Step 2: Estructura de archivos**

```
app/
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts         # Auth API route
├── (auth)/
│   ├── login/
│   │   └── page.tsx            # Custom login page
│   └── register/
│       └── page.tsx            # Custom register page
├── dashboard/
│   └── page.tsx                # Protected route
└── middleware.ts               # Route protection
```

### Configuración Base de NextAuth

**auth.ts (configuración central)**:

```typescript
// lib/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  
  // Configurar providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y password requeridos");
        }

        // Buscar usuario en DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Credenciales inválidas");
        }

        // Verificar password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isValid) {
          throw new Error("Credenciales inválidas");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  // Session strategy
  session: {
    strategy: "jwt", // O "database" para session en DB
  },

  // Páginas custom
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },

  // Callbacks para personalizar
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  // Opciones de seguridad
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
```

**Route Handler (API endpoint)**:

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

### Environment Variables

```bash
# .env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-super-seguro-generado-con-openssl

# Google OAuth
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-secret

# GitHub OAuth
GITHUB_CLIENT_ID=tu-github-client-id
GITHUB_CLIENT_SECRET=tu-github-secret

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/fpuna_db"
```

**Generar NEXTAUTH_SECRET**:

```bash
openssl rand -base64 32
```

### Prisma Schema para Auth

```prisma
// prisma/schema.prisma
model User {
  id              String    @id @default(cuid())
  name            String?
  email           String    @unique
  emailVerified   DateTime?
  image           String?
  hashedPassword  String?   // Para credentials provider
  role            String    @default("user") // RBAC
  
  accounts        Account[]
  sessions        Session[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
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

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Login Page Component

```typescript
// app/(auth)/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas");
        return;
      }

      // Redirect on success
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGitHubLogin = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center">
            Iniciar Sesión - FPUNA
          </h2>
        </div>

        {/* OAuth Providers */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continuar con Google
          </button>

          <button
            onClick={handleGitHubLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
            Continuar con GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              O continuar con email
            </span>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="tu-email@fpuna.edu.py"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

**🎯 Transición**: Ahora que tienes NextAuth.js configurado con las bases y entiendes cómo funciona internamente, es momento de expandir las opciones de autenticación de tus usuarios. En la siguiente sección, implementaremos múltiples OAuth providers (Google y GitHub) para dar flexibilidad, además de un sistema tradicional de email/password con seguridad robusta.

## 🌐 Parte 2: OAuth Providers (50 min)

### OAuth 2.0 Flow Explicado

```mermaid
sequenceDiagram
    participant U as 👤 Usuario
    participant C as 🌐 Tu App
    participant O as 🔐 OAuth Provider<br/>(Google/GitHub)
    participant A as 🔒 Auth Server
    participant D as 🗄️ Database
    
    U->>C: 1. Click "Login con Google"
    C->>O: 2. Redirect + client_id + scope
    O->>U: 3. Pantalla autorización Google
    U->>O: 4. Aprobar permisos (email, perfil)
    O->>C: 5. Redirect con authorization code
    C->>A: 6. Exchange code por access_token
    A->>O: 7. Validate code
    O->>A: 8. Return access_token + user info
    A->>D: 9. Create/update user + account
    D->>A: 10. User data
    A->>C: 11. Set session cookie
    C->>U: 12. Redirect to dashboard
    
    Note over U,D: OAuth 2.0 Authorization Code Flow
```

### Configurar Google OAuth

**Paso 1: Crear OAuth App en Google Cloud**

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear proyecto nuevo: "FPUNA Auth"
3. Habilitar **Google+ API**
4. **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configurar:
   - Application type: **Web application**
   - Name: "FPUNA Next.js App"
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (dev)
     - `https://fpuna.edu.py/api/auth/callback/google` (prod)
6. Copiar **Client ID** y **Client Secret**

**Paso 2: Agregar a .env**

```bash
GOOGLE_CLIENT_ID=1234567890-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-tu_secret_aqui
```

**Paso 3: Configurar provider en auth.ts**

```typescript
// lib/auth.ts
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  
  // Scopes adicionales (opcional)
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
      scope: "openid email profile", // Permisos básicos
    },
  },
  
  // Mapear profile de Google
  profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      role: "user", // Default role
    };
  },
}),
```

### Configurar GitHub OAuth

**Paso 1: Crear OAuth App en GitHub**

1. Ir a [GitHub Settings](https://github.com/settings/developers)
2. **OAuth Apps** → **New OAuth App**
3. Configurar:
   - Application name: "FPUNA Auth"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copiar **Client ID** y generar **Client Secret**

**Paso 2: Agregar a .env**

```bash
GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
GITHUB_CLIENT_SECRET=abc123def456ghi789jkl012mno345pqr678stu
```

**Paso 3: Configurar provider**

```typescript
// lib/auth.ts
GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  
  // Mapear profile de GitHub
  profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
      role: "user",
    };
  },
}),
```

### Credentials Provider (Email/Password)

**Paso 1: Hash passwords con bcrypt**

```typescript
// lib/password.ts
import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  // Salt rounds: 10 es balance seguridad/performance
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

**Paso 2: Register endpoint (Server Action)**

```typescript
// app/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Password debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener mayúscula")
    .regex(/[a-z]/, "Debe contener minúscula")
    .regex(/[0-9]/, "Debe contener número")
    .regex(/[^A-Za-z0-9]/, "Debe contener carácter especial"),
});

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // Validar input
    const validated = RegisterSchema.parse(data);

    // Verificar email único
    const exists = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (exists) {
      return { error: "Email ya registrado" };
    }

    // Hash password
    const hashedPassword = await hashPassword(validated.password);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        hashedPassword,
        role: "user",
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Error al registrar usuario" };
  }
}
```

**Paso 3: Register page**

```typescript
// app/(auth)/register/page.tsx
"use client";

import { registerUser } from "@/app/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validar passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const result = await registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Redirect to login
    router.push("/login?registered=true");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">
          Registrarse - FPUNA
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Nombre Completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 8 caracteres, incluir mayúscula, número y símbolo
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
```

### Password Security Best Practices

```mermaid
graph TD
    subgraph "Password Requirements - FPUNA Standard"
        A[📏 Longitud mínima: 8 caracteres]
        B[🔤 Al menos 1 mayúscula]
        C[🔡 Al menos 1 minúscula]
        D[🔢 Al menos 1 número]
        E[🎯 Al menos 1 símbolo especial]
        F[🚫 No usar passwords comunes]
        G[⏱️ Expiración: 90 días opcional]
    end
    
    style A fill:#E1FFE1
    style B fill:#E1FFE1
    style C fill:#E1FFE1
    style D fill:#FFF4E1
    style E fill:#FFF4E1
    style F fill:#FFE1E1
    style G fill:#E1F5FF
```

---

**🎯 Transición**: Con la autenticación funcionando correctamente—los usuarios pueden registrarse e iniciar sesión—ahora necesitamos controlar **qué pueden hacer** una vez autenticados. Aquí entra la **autorización** (authorization). Implementaremos un sistema de roles (RBAC) que diferencia entre estudiantes, profesores, y administradores, cada uno con permisos específicos.

## 🔒 Parte 3: RBAC Implementation (60 min)

### Role-Based Access Control Architecture

```mermaid
graph TD
    subgraph "RBAC System"
        U[👤 User] --> R[🎭 Role]
        R --> P[🔑 Permissions]
        
        R1[👑 admin] --> P1[users:read]
        R1 --> P2[users:write]
        R1 --> P3[users:delete]
        R1 --> P4[content:manage]
        
        R2[✏️ editor] --> P5[content:read]
        R2 --> P6[content:write]
        
        R3[👁️ viewer] --> P7[content:read]
    end
    
    style R1 fill:#FFE1E1
    style R2 fill:#FFF4E1
    style R3 fill:#E1F5FF
```

### Implementar Roles en Schema

```prisma
// prisma/schema.prisma
enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
  USER
  GUEST
}

model User {
  id              String    @id @default(cuid())
  name            String?
  email           String    @unique
  role            Role      @default(USER) // Enum
  permissions     String[]  // Array de permisos específicos
  
  // ... resto de campos
}
```

### Extender NextAuth Types

```typescript
// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      permissions?: string[];
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    permissions?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    permissions?: string[];
  }
}
```

### Authorization Middleware

```typescript
// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Rutas públicas (sin auth)
const publicRoutes = ["/", "/login", "/register", "/about"];

// Rutas protegidas por rol
const roleRoutes = {
  admin: ["/admin", "/users/manage"],
  editor: ["/dashboard/editor", "/content/create"],
  user: ["/dashboard", "/profile"],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Permitir rutas públicas
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirigir no autenticados
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verificar permisos por rol
  for (const [role, routes] of Object.entries(roleRoutes)) {
    if (routes.some((route) => pathname.startsWith(route))) {
      if (userRole !== role && userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### Server-Side Authorization

```typescript
// lib/authorization.ts
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }
  
  return session;
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();
  
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/unauthorized");
  }
  
  return session;
}

export async function requirePermission(permission: string) {
  const session = await requireAuth();
  
  const permissions = session.user.permissions || [];
  
  if (!permissions.includes(permission) && session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }
  
  return session;
}
```

**Uso en Server Components**:

```typescript
// app/admin/users/page.tsx
import { requireRole } from "@/lib/authorization";

export default async function AdminUsersPage() {
  // Solo admins pueden acceder
  await requireRole(["ADMIN", "SUPER_ADMIN"]);

  // Fetch users...
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      {/* ... */}
    </div>
  );
}
```

### Client-Side Role Checking

```typescript
// components/RoleGuard.tsx
"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallback = <p>No tienes permisos para ver este contenido.</p>,
}: RoleGuardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

**Uso**:

```typescript
// app/dashboard/page.tsx
import { RoleGuard } from "@/components/RoleGuard";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Solo admins ven esto */}
      <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
        <AdminPanel />
      </RoleGuard>

      {/* Editores y admins */}
      <RoleGuard allowedRoles={["EDITOR", "ADMIN", "SUPER_ADMIN"]}>
        <ContentEditor />
      </RoleGuard>

      {/* Todos los usuarios autenticados */}
      <UserContent />
    </div>
  );
}
```

### Protected API Routes

```typescript
// app/api/admin/users/route.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  // Verificar autenticación
  if (!session || !session.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Verificar rol
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Permisos insuficientes" }, { status: 403 });
  }

  // Proceder con la operación
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json(users);
}
```

---

**🎯 Transición**: Tienes autenticación funcionando, autorización basada en roles implementada, y tu app distingue correctamente entre usuarios. Pero en contextos críticos como **fintech en Paraguay** (donde regulaciones del Banco Central aplican), la seguridad básica no es suficiente. Esta sección cubre prácticas de seguridad avanzadas que son **obligatorias** en aplicaciones de producción que manejan datos sensibles.

## 🛡️ Parte 4: Security Best Practices (40 min)

### Seguridad para Fintech en Paraguay

```mermaid
mindmap
  root((Security))
    Compliance
      Banco Central regulaciones
      GDPR data protection
      Audit logs obligatorios
    Authentication
      2FA para transacciones
      Rate limiting login
      Session timeout 15 min
    Authorization
      Least privilege principle
      Role-based access
      Permission auditing
    Data Protection
      Password hashing bcrypt
      Sensitive data encryption
      HTTPS only en producción
```

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Configurar Redis para rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 5 intentos por 15 minutos
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
});

// Uso en login
export async function checkRateLimit(identifier: string) {
  const { success, remaining, reset } = await loginRateLimit.limit(identifier);
  
  return {
    success,
    remaining,
    resetAt: new Date(reset),
  };
}
```

**Aplicar en login route**:

```typescript
// app/api/auth/login/route.ts
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const { email } = await req.json();

  // Rate limit por IP
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const rateLimitResult = await checkRateLimit(`login:${ip}`);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: `Demasiados intentos. Intenta de nuevo en ${Math.ceil(
          (rateLimitResult.resetAt.getTime() - Date.now()) / 60000
        )} minutos.`,
      },
      { status: 429 }
    );
  }

  // Continuar con login...
}
```

### Session Management

```typescript
// lib/session-config.ts
export const sessionConfig = {
  // JWT expira en 1 hora
  maxAge: 60 * 60, // 1 hour
  
  // Refresh token si quedan menos de 15 min
  updateAge: 60 * 45, // 45 minutes
  
  // Session timeout inactivity (15 min)
  idle: 60 * 15, // 15 minutes
};
```

### Audit Logging

```prisma
// prisma/schema.prisma
model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String   // LOGIN, LOGOUT, CREATE_USER, DELETE_USER, etc.
  resource  String?  // Recurso afectado
  details   Json?    // Detalles adicionales
  ip        String?
  userAgent String?
  createdAt DateTime @default(now())

  user User? @relation(fields: [userId], references: [id])
}
```

**Logging function**:

```typescript
// lib/audit.ts
import { prisma } from "@/lib/prisma";

export async function logAudit({
  userId,
  action,
  resource,
  details,
  ip,
  userAgent,
}: {
  userId?: string;
  action: string;
  resource?: string;
  details?: any;
  ip?: string;
  userAgent?: string;
}) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      resource,
      details,
      ip,
      userAgent,
    },
  });
}
```

**Uso**:

```typescript
// En login callback
await logAudit({
  userId: user.id,
  action: "LOGIN",
  ip: request.headers.get("x-forwarded-for") || "unknown",
  userAgent: request.headers.get("user-agent") || "unknown",
});
```

### Two-Factor Authentication (2FA)

**Modelo para 2FA**:

```prisma
model TwoFactorToken {
  id     String   @id @default(cuid())
  userId String
  token  String   @unique
  type   String   // SMS, EMAIL, TOTP
  expires DateTime
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

**Generar token**:

```typescript
// lib/two-factor.ts
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function generate2FAToken(userId: string, type: "EMAIL" | "SMS") {
  // Generar código 6 dígitos
  const token = crypto.randomInt(100000, 999999).toString();
  
  // Expira en 5 minutos
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  
  // Eliminar tokens previos
  await prisma.twoFactorToken.deleteMany({
    where: { userId, type },
  });
  
  // Crear nuevo token
  await prisma.twoFactorToken.create({
    data: {
      userId,
      token,
      type,
      expires,
    },
  });
  
  return token;
}

export async function verify2FAToken(
  userId: string,
  token: string,
  type: "EMAIL" | "SMS"
): Promise<boolean> {
  const record = await prisma.twoFactorToken.findFirst({
    where: {
      userId,
      token,
      type,
      expires: { gt: new Date() },
    },
  });
  
  if (record) {
    // Eliminar token usado
    await prisma.twoFactorToken.delete({ where: { id: record.id } });
    return true;
  }
  
  return false;
}
```

---

## 🎯 Ejercicio Práctico: Sistema de Auth FPUNA

### Objetivo

Implementar sistema completo de autenticación para "Portal Académico FPUNA" con:
- Login con Google, GitHub, y credentials
- Registro de estudiantes
- Roles: STUDENT, PROFESSOR, ADMIN
- Rutas protegidas por rol
- 2FA por email
- Audit logging

### Requisitos

1. **Authentication**:
   - OAuth con Google y GitHub
   - Email/password con bcrypt
   - Session JWT con 1 hora expiración

2. **Authorization**:
   - STUDENT: Ver notas, inscribirse a materias
   - PROFESSOR: Ver alumnos, cargar notas
   - ADMIN: Gestionar usuarios, ver audit logs

3. **Security**:
   - Rate limiting: 5 intentos login por 15 min
   - Password requirements: 8+ chars, mayúscula, número, símbolo
   - 2FA opcional por email
   - Audit log de acciones críticas

4. **UI Requirements**:
   - Login page con OAuth buttons
   - Register page con validación
   - Dashboard diferente por rol
   - Unauthorized page

### Implementación con opencode

```bash
opencode "Implementa sistema de auth completo para Portal FPUNA:

STACK:
- Next.js 14 App Router
- NextAuth.js v5
- Prisma + PostgreSQL
- TypeScript

FEATURES:
1. AUTH:
   - Google OAuth
   - GitHub OAuth
   - Email/password con bcrypt
   - JWT sessions (1 hora)

2. RBAC:
   - Roles: STUDENT, PROFESSOR, ADMIN
   - Middleware protection
   - Server-side checks
   - Client RoleGuard component

3. SECURITY:
   - Rate limiting (5 intentos/15 min)
   - Password validation estricta
   - 2FA por email
   - Audit logging

4. PAGES:
   - /login - OAuth + credentials form
   - /register - Student registration
   - /dashboard - Role-based content
   - /admin/users - User management (admin only)
   - /unauthorized - 403 page

ESTRUCTURA:
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── unauthorized/page.tsx
├── dashboard/
│   ├── page.tsx
│   ├── student/page.tsx
│   ├── professor/page.tsx
│   └── admin/
│       └── users/page.tsx
├── api/
│   └── auth/
│       └── [...nextauth]/route.ts
├── actions/
│   └── auth.ts
└── middleware.ts

lib/
├── auth.ts
├── authorization.ts
├── password.ts
├── rate-limit.ts
├── two-factor.ts
└── audit.ts

TODO:
- Prisma schema completo
- NextAuth config con 3 providers
- Middleware con role checking
- Server actions para register
- Protected routes
- Audit logging
- 2FA flow completo
- UI components con Tailwind

TODO comentado en español, código production-ready."
```

---

## 🎓 Integración con opencode

### Patrones de Automatización

#### Setup Completo de Auth

```bash
opencode "Setup NextAuth.js v5 completo en mi proyecto Next.js:

INCLUIR:
1. Instalación de dependencias
2. Prisma schema (User, Account, Session)
3. auth.ts config con Google, GitHub, Credentials
4. API route handler
5. .env.example con todas las variables
6. Login page component
7. Middleware básico
8. TypeScript types

Generar todos los archivos necesarios."
```

#### Agregar RBAC a Proyecto Existente

```bash
opencode "Agrega Role-Based Access Control a mi auth existente:

PROYECTO ACTUAL:
- NextAuth.js ya configurado
- Prisma User model existente

AGREGAR:
1. Role enum al User model
2. Extend NextAuth types para incluir role
3. Authorization middleware con role checking
4. requireRole() helper
5. RoleGuard component
6. Ejemplo de protected route
7. Admin panel route

TODO TypeScript + comentarios español."
```

#### Implementar 2FA

```bash
opencode "Implementa 2FA por email en mi sistema NextAuth:

REQUISITOS:
1. Prisma model TwoFactorToken
2. Función generar código 6 dígitos
3. Función verificar código
4. Email service integration (Resend)
5. 2FA UI flow:
   - Login normal
   - Solicitar código
   - Validar código
   - Completar login
6. Opción enable/disable 2FA en perfil

Stack: Next.js 14, NextAuth v5, Prisma, Resend.

Todo funcional y production-ready."
```

---

## 🔧 Troubleshooting

### Problemas Comunes

#### Error: "Invalid Provider Configuration"

```bash
# ❌ Problema
GOOGLE_CLIENT_ID not found

# ✅ Solución
# Verificar .env existe y está en root
# Reiniciar dev server después de cambiar .env
npm run dev
```

#### Session No Persiste Después de Login

```typescript
// ❌ Problema - Falta agregar role a JWT
callbacks: {
  async jwt({ token, user }) {
    return token; // No incluye role
  },
}

// ✅ Solución
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = user.role; // ✅ Agregar role
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as string; // ✅ Pasar a session
    }
    return session;
  },
}
```

#### OAuth Redirect Error

```bash
# ❌ Error
redirect_uri_mismatch

# ✅ Solución
# Verificar en Google/GitHub Console:
# Authorized redirect URIs incluye:
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github

# NO olvidar /api/auth/callback/{provider}
```

---

## ✅ Checklist de Seguridad

Antes de deploy a producción:

### Authentication
- [ ] NEXTAUTH_SECRET configurado (generado con openssl)
- [ ] OAuth redirect URIs incluyen dominio producción
- [ ] Passwords hasheados con bcrypt (salt rounds >= 10)
- [ ] Rate limiting implementado en login
- [ ] Session timeout configurado (max 1 hora para fintech)
- [ ] HTTPS obligatorio en producción

### Authorization
- [ ] Middleware protege rutas sensibles
- [ ] Server-side checks en todas las páginas protegidas
- [ ] API routes verifican auth + role
- [ ] Principle of least privilege aplicado
- [ ] Admin routes tienen doble verificación

### Data Protection
- [ ] Passwords nunca en logs
- [ ] Sensitive data encriptada en DB
- [ ] User data sanitizada en responses
- [ ] CORS configurado correctamente
- [ ] SQL injection prevention (Prisma hace esto)

### Compliance (Paraguay)
- [ ] Audit logging de acciones críticas
- [ ] Data retention policy definida
- [ ] GDPR compliance (derecho a eliminar datos)
- [ ] Terms of Service y Privacy Policy visibles

---

## 🎓 Mejores Prácticas

### ✅ HACER

1. **Usar NextAuth.js v5** - Estándar de la industria
2. **JWT para scalability** - Stateless, no requiere DB lookup
3. **bcrypt para passwords** - Nunca plain text
4. **Rate limiting agresivo** - Proteger contra brute force
5. **Audit logging completo** - Compliance y debugging
6. **HTTPS en producción** - No negociable
7. **Session timeout corto** - 15-60 min para fintech
8. **2FA para admins** - Obligatorio para roles críticos

### ❌ NO HACER

1. **JWT en localStorage** - XSS vulnerable, usar httpOnly cookies
2. **Passwords débiles** - Enforcar requisitos estrictos
3. **Confiar solo en client-side** - Siempre verificar server-side
4. **Exponer role en URL** - /admin?role=admin ❌
5. **Ignorar audit logs** - Crítico para compliance
6. **Session infinita** - Siempre expirar
7. **OAuth sin state parameter** - CSRF vulnerable
8. **Hardcodear secrets** - Usar .env siempre

---

## 🎉 Resumen del Módulo

### Lo Que Dominaste

✅ **NextAuth.js v5** - Setup y configuración completa  
✅ **OAuth Providers** - Google, GitHub, y credentials  
✅ **JWT vs Sessions** - Cuándo usar cada uno  
✅ **RBAC Implementation** - Roles y permisos granulares  
✅ **Protected Routes** - Middleware y server-side checks  
✅ **Security Best Practices** - Fintech-grade security  
✅ **opencode Automation** - Setup auth en minutos

### Próximo Paso

**Continúa con**: [Módulo 04 - UI/UX & Styling](./04-ui-ux-styling.md)

---

## 💭 Reflexión

1. **¿Por qué JWT es mejor para APIs que sessions?**
2. **¿Cómo implementarías auth en una app de banking?**
3. **¿Qué nivel de security necesita tu proyecto?**

**Comparte en Slack** (#web-dev-auth)

---

## 📝 Quiz de Evaluación

### Instrucciones
- **10 preguntas** para validar tu comprensión del módulo
- **Tiempo sugerido**: 20 minutos
- **Respuestas** con explicaciones al final de esta sección
- **Aprobación**: 6+ respuestas correctas (60%)

---

### Preguntas

#### 1. NextAuth.js Fundamentals (Opción Múltiple)

¿Cuál es la función principal del archivo `lib/auth.ts` en NextAuth.js v5?

a) Almacenar passwords de usuarios en memoria  
b) Configurar providers, callbacks, y opciones de sesión  
c) Manejar el routing de autenticación automáticamente  
d) Crear la base de datos de usuarios

---

#### 2. OAuth 2.0 Flow (Opción Múltiple)

En el flujo OAuth con Google, ¿cuál es el orden correcto de pasos?

a) User clicks login → Google auth → Callback → Create session  
b) Create session → User clicks login → Google auth → Callback  
c) Google auth → User clicks login → Create session → Callback  
d) Callback → Google auth → User clicks login → Create session

---

#### 3. JWT vs Sessions (Opción Múltiple)

¿Cuándo es preferible usar JWT en lugar de Database Sessions?

a) Cuando necesitas revocar sesiones inmediatamente  
b) Cuando tienes múltiples servidores sin estado compartido  
c) Cuando la seguridad es la máxima prioridad absoluta  
d) Cuando tienes muy pocos usuarios concurrentes

---

#### 4. RBAC Concepts (Verdadero/Falso)

**Afirmación**: En un sistema RBAC, el rol del usuario debe verificarse tanto en el middleware como en los componentes del servidor.

**VERDADERO / FALSO**

*Explica brevemente por qué elegiste esa respuesta.*

---

#### 5. Security Best Practices (Opción Múltiple)

Para fintech en Paraguay, ¿cuál es el session timeout recomendado por razones de seguridad según el módulo?

a) 24 horas  
b) 8 horas  
c) 1 hora o menos  
d) Sin timeout (session permanente)

---

#### 6. Code Analysis (Respuesta Corta)

Observa el siguiente código:

```typescript
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }
    return token;
  },
}
```

**Problema**: El código arriba NO incluye el `role` del usuario en el token JWT, lo que causará que `session.user.role` sea `undefined`.

**Pregunta**: Escribe el código correcto que incluya el role en el token JWT.

---

#### 7. Rate Limiting (Opción Múltiple)

¿Cuántos intentos de login fallidos se permiten antes de bloquear temporalmente a un usuario en el sistema de rate limiting mostrado en el módulo?

a) 3 intentos por 5 minutos  
b) 5 intentos por 15 minutos  
c) 10 intentos por 30 minutos  
d) Sin límite de intentos

---

#### 8. 2FA Implementation (Verdadero/Falso)

**Afirmación**: El token de 2FA debe almacenarse con una fecha de expiración corta (aproximadamente 5 minutos) por razones de seguridad.

**VERDADERO / FALSO**

---

#### 9. Troubleshooting (Opción Múltiple)

Recibes el error: `redirect_uri_mismatch` al intentar usar Google OAuth.

¿Cuál es la causa más probable de este error?

a) El `GOOGLE_CLIENT_ID` está incorrecto en `.env`  
b) La URL de callback no está registrada en Google Cloud Console  
c) NextAuth.js no está instalado correctamente  
d) El Prisma schema tiene un error en el modelo Account

---

#### 10. Security Scenario (Respuesta Corta)

Estás construyendo una aplicación de **banking** para Paraguay que maneja transacciones financieras de clientes.

**Pregunta**: Menciona **3 medidas de seguridad críticas** que DEBES implementar basándote en este módulo. Justifica cada una brevemente.

---

### 📋 Respuestas y Explicaciones

#### 1. Correcta: **b) Configurar providers, callbacks, y opciones de sesión**

**Explicación**: `lib/auth.ts` es el archivo de configuración central de NextAuth.js donde defines:
- **Providers**: Google, GitHub, Credentials, etc.
- **Callbacks**: `jwt()` y `session()` para customizar tokens y sesiones
- **Opciones**: `session.strategy`, `pages`, `secret`, etc.

No almacena passwords (eso es Prisma) ni maneja routing automáticamente (eso es el API route handler).

---

#### 2. Correcta: **a) User clicks login → Google auth → Callback → Create session**

**Explicación**: El flujo OAuth correcto es:
1. Usuario hace clic en "Login con Google"
2. NextAuth redirige a Google para autenticación
3. Usuario se autentica en Google
4. Google redirige de vuelta al callback URL (`/api/auth/callback/google`)
5. NextAuth valida el token y crea la sesión del usuario

Este es el "Authorization Code Flow" estándar de OAuth 2.0.

---

#### 3. Correcta: **b) Cuando tienes múltiples servidores sin estado compartido**

**Explicación**: JWT es **stateless** (sin estado), lo que significa:
- No requiere lookup en base de datos para cada request
- Funciona perfectamente en arquitecturas distribuidas (múltiples servidores)
- Ideal para serverless (Vercel, AWS Lambda)
- Escala horizontalmente sin problemas

**Nota**: Para revocar sesiones inmediatamente, Database Sessions es mejor porque puedes eliminar el registro. Con JWT, debes esperar a que expire.

---

#### 4. Correcta: **VERDADERO**

**Explicación**: Es **crítico** verificar el rol en ambos lugares:

1. **Middleware** (`middleware.ts`): Primera línea de defensa, redirige usuarios no autorizados
2. **Server Components**: Segunda verificación, porque:
   - Middleware puede bypasearse (errores de configuración)
   - Defense in depth (múltiples capas de seguridad)
   - Server Components son donde se accede a datos sensibles

Nunca confíes solo en client-side o en una sola capa de autorización.

---

#### 5. Correcta: **c) 1 hora o menos**

**Explicación**: El módulo especifica que para **fintech**:
- **Máximo 1 hora** de session timeout
- **Ideal 15 minutos** para apps de alta seguridad (banking)
- Después de inactividad, forzar re-login

Esto previene que sesiones abandonadas (usuario se fue sin logout) permanezcan activas indefinidamente, exponiendo la cuenta si alguien más usa la computadora.

---

#### 6. Respuesta Correcta:

```typescript
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = user.role; // ✅ Agregar esta línea
    }
    return token;
  },
}
```

**Explicación**: El callback `jwt()` se ejecuta cuando se crea el token. Debes incluir cualquier dato customizado (como `role`) en el token aquí. Luego, en el callback `session()`, pasas `token.role` a `session.user.role` para que esté disponible en el cliente.

---

#### 7. Correcta: **b) 5 intentos por 15 minutos**

**Explicación**: El código del módulo muestra:
```typescript
limiter: Ratelimit.slidingWindow(5, "15 m")
```

Esto significa:
- **5 intentos** de login permitidos
- En una ventana de **15 minutos**
- Si se excede, usuario bloqueado hasta que expire la ventana

Esto previene **brute force attacks** donde un atacante intenta adivinar passwords.

---

#### 8. Correcta: **VERDADERO**

**Explicación**: Códigos 2FA deben expirar **rápido** (5 minutos recomendado) porque:
- Si un código es interceptado (man-in-the-middle), el atacante tiene poco tiempo para usarlo
- Reduce la ventana de ataque
- Fuerza al usuario a completar el proceso rápidamente

En el módulo, el código muestra:
```typescript
const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos
```

---

#### 9. Correcta: **b) La URL de callback no está registrada en Google Cloud Console**

**Explicación**: El error `redirect_uri_mismatch` ocurre cuando:
- Google intenta redirigir a `http://localhost:3000/api/auth/callback/google`
- Pero esa URL **no está** en la lista de "Authorized redirect URIs" en tu OAuth app en Google Cloud Console

**Solución**: Agregar la URL exacta (incluyendo `/api/auth/callback/google`) en Google Cloud Console → Credentials → Tu OAuth Client ID → Authorized redirect URIs.

---

#### 10. Ejemplo de Respuesta Completa (3 medidas):

**1. Two-Factor Authentication (2FA) Obligatorio**
- **Qué**: Código de 6 dígitos por email/SMS para transacciones > ₲5,000,000
- **Por qué**: Aunque alguien robe password, no puede completar transacciones sin el código 2FA
- **Cómo**: Implementar `TwoFactorToken` model y `verify2FAToken()` function del módulo

**2. Rate Limiting Agresivo**
- **Qué**: Máximo 3 intentos de login fallidos por 10 minutos
- **Por qué**: Previene ataques de fuerza bruta donde bots intentan miles de passwords
- **Cómo**: Usar Upstash Redis con `Ratelimit.slidingWindow(3, "10 m")`

**3. Audit Logging Completo**
- **Qué**: Registrar TODAS las transacciones y accesos a datos sensibles (quién, cuándo, qué, IP)
- **Por qué**: Compliance con Banco Central de Paraguay, detectar actividad sospechosa, evidencia forense
- **Cómo**: Implementar `AuditLog` model y `logAudit()` function en cada operación crítica

**Otras medidas válidas**:
- Session timeout corto (15 minutos)
- HTTPS obligatorio en producción
- Password requirements estrictos (12+ chars, mayúscula, número, símbolo)
- Encriptación de datos sensibles en DB

---

### Criterios de Aprobación

| Puntaje | Nivel | Acción Recomendada |
|---------|-------|-------------------|
| **9-10 correctas** | ✅ Excelente | Continúa con Módulo 04 |
| **7-8 correctas** | ✅ Bueno | Continúa, refuerza áreas débiles |
| **6 correctas** | ⚠️ Aprobado | Revisa preguntas falladas antes de continuar |
| **< 6 correctas** | ❌ No aprobado | Debes revisar el módulo completo |

---

### Próximos Pasos

✅ **Si aprobaste (6+)**: ¡Felicitaciones! Continúa con [Módulo 04 - UI/UX & Styling](./04-ui-ux-styling.md)

⚠️ **Si no aprobaste**: No te desanimes. Identifica los temas donde fallaste:
- **Preguntas 1-3 falladas**: Revisa Parte 1 y 2 (NextAuth setup, OAuth)
- **Preguntas 4-6 falladas**: Revisa Parte 3 (RBAC implementation)
- **Preguntas 7-10 falladas**: Revisa Parte 4 (Security best practices)

Luego, intenta el quiz nuevamente. La seguridad es crítica y vale la pena dominarla.

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [NextAuth.js v5 Docs](https://authjs.dev/)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [JWT.io](https://jwt.io/) - Debug JWTs
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

### Libros Recomendados
- **"OAuth 2 in Action"** - Justin Richer
- **"Web Application Security"** - Andrew Hoffman
- **"Authentication and Authorization"** - Mike Jones

### Security Resources
- **OWASP Top 10** - Vulnerabilidades web
- **CWE/SANS Top 25** - Software security errors
- **Paraguay Cyber Laws** - Compliance local

### Tools
- **NextAuth.js** - Authentication for Next.js
- **Prisma** - Type-safe ORM
- **Upstash** - Redis for rate limiting
- **Resend** - Email service (2FA)

---

*Módulo creado para FPUNA Verano 2026*  
*Actualizado: Enero 2026*  
*Track: Web Development*
