# Módulo 02: Desarrollo Backend con IA
## Tier 1 - Desarrollo de Software

---

## Descripción

Este módulo enseña a usar IA para diseñar y desarrollar APIs REST robustas, modelar bases de datos, e implementar lógica de negocio eficientemente.

**Duración:** 2.5 horas
**Tipo:** Práctico intensivo

---

## Objetivos de Aprendizaje

1. **Diseñar** APIs REST con IA
2. **Generar** modelos y esquemas de base de datos
3. **Implementar** endpoints CRUD completos
4. **Documentar** APIs automáticamente

---

## Contenido

### 1. Diseño de API con IA

**Prompt para Diseño Inicial:**
```
Diseña una API REST para un sistema de gestión de tareas (todo app).

REQUISITOS:
- Usuarios con autenticación JWT
- Tareas con título, descripción, estado, fecha límite
- Categorías/etiquetas
- Prioridades (alta, media, baja)

GENERAR:
1. Lista de endpoints con métodos HTTP
2. Estructura de respuestas JSON
3. Códigos de estado HTTP apropiados
4. Consideraciones de paginación
```

**Estructura de Endpoints Típica:**
```
GET    /api/tasks          → Lista tareas (con paginación)
POST   /api/tasks          → Crear tarea
GET    /api/tasks/:id      → Obtener tarea específica
PUT    /api/tasks/:id      → Actualizar tarea
DELETE /api/tasks/:id      → Eliminar tarea
PATCH  /api/tasks/:id/status → Cambiar solo estado
```

---

### 2. Modelado de Base de Datos

**Prompt para Esquema:**
```
CONTEXTO: PostgreSQL 15, usando Prisma ORM

Genera el esquema de base de datos para:
- Usuarios (auth)
- Tareas (todo items)
- Categorías
- Relaciones usuario-tarea (1:N)
- Relaciones tarea-categoría (N:N)

INCLUIR:
- Campos de auditoría (createdAt, updatedAt)
- Índices apropiados
- Tipos correctos de PostgreSQL
- Comentarios explicativos

FORMATO: Prisma schema
```

**Ejemplo de Output:**
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

model Task {
  id          String     @id @default(uuid())
  title       String
  description String?
  status      TaskStatus @default(PENDING)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  categories  Category[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([userId, status])
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

---

### 3. Generación de Endpoints

**Prompt para CRUD Completo:**
```
CONTEXTO: Express.js, TypeScript, Prisma, PostgreSQL

Genera el controlador completo para Tasks:
- CRUD básico
- Validación con Zod
- Manejo de errores
- Respuestas consistentes
- Filtros y paginación en listado

INCLUIR:
- Tipos TypeScript
- Comentarios JSDoc
- Logging
- Try-catch apropiado
```

**Patrón de Controlador:**
```typescript
// controllers/taskController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueDate: z.string().datetime().optional()
});

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createTaskSchema.parse(req.body);
    const userId = req.user!.id;

    const task = await prisma.task.create({
      data: { ...data, userId }
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
```

---

### 4. Lógica de Negocio Compleja

**Prompt para Lógica Específica:**
```
Implementa la lógica para "completar tarea" que:

1. Actualiza estado a COMPLETED
2. Registra fecha de completado
3. Envía notificación si tenía fecha límite
4. Actualiza estadísticas del usuario
5. Dispara evento para integraciones

CONTEXTO: El código existente usa:
- Prisma para BD
- Bull para colas
- EventEmitter para eventos
- nodemailer para emails

Mantén consistencia con patrones del proyecto.
```

---

### 5. Documentación Automática

**Generar OpenAPI/Swagger:**
```
Genera la especificación OpenAPI 3.0 para el endpoint:

POST /api/tasks
- Body: { title, description?, priority?, dueDate? }
- Response 201: { success: true, data: Task }
- Response 400: Validation error
- Response 401: No autenticado
- Response 500: Server error

Incluir schemas, ejemplos, y descripciones detalladas.
```

---

## Patrones Importantes

### Estructura de Respuestas

```typescript
// Respuesta exitosa
{
  success: true,
  data: { ... },
  meta?: { page, limit, total }
}

// Respuesta de error
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Descripción del error',
    details?: [ ... ]
  }
}
```

### Middleware de Errores

```typescript
// middleware/errorHandler.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        details: err.errors
      }
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Error del servidor' }
  });
};
```

---

## Resumen

| Tarea | Herramienta Recomendada |
|-------|------------------------|
| Diseño inicial de API | Claude/ChatGPT |
| Esquema de BD | Claude + Copilot |
| Endpoints CRUD | Copilot + Cursor |
| Lógica compleja | Claude (con contexto) |
| Documentación | Claude → Copilot refina |

---

*Módulo 02 - Backend con IA*
*Tier 1 - Desarrollo de Software*
