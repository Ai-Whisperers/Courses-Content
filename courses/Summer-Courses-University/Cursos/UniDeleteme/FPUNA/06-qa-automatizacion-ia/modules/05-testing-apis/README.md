# Módulo 5: Testing de APIs
## Automatización de Pruebas de APIs REST con Playwright

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Módulos 1-4 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Usar Playwright para testing de APIs REST
2. Ejecutar requests GET, POST, PUT, DELETE
3. Validar responses y status codes
4. Manejar autenticación con tokens
5. Mockear APIs en tests E2E

---

## Contenido

### 5.1 Playwright para API Testing (15 min)

#### ¿Por qué Playwright para APIs?

```
PLAYWRIGHT PARA API TESTING
═══════════════════════════

VENTAJAS:
✅ Mismo framework para E2E y API
✅ Sintaxis limpia y moderna
✅ Request/Response interceptors
✅ Manejo automático de JSON
✅ Integración con fixtures
✅ Reportes unificados

vs HERRAMIENTAS DEDICADAS:
📊 Postman: Mejor para exploración manual
📊 REST Assured: Java-focused
📊 Supertest: Node.js pero no tiene UI testing
```

#### APIRequestContext

```typescript
import { test, expect, APIRequestContext } from '@playwright/test';

test('API request básico', async ({ request }) => {
  // 'request' es un APIRequestContext
  // Viene pre-configurado con baseURL del config

  const response = await request.get('/api/users');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log(data);
});
```

#### Configuración en playwright.config.ts

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://api.example.com',  // Base para todas las requests

    // Headers globales
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
});
```

---

### 5.2 Métodos HTTP en Playwright (25 min)

#### GET - Obtener Datos

```typescript
test.describe('GET Requests', () => {

  test('GET lista de usuarios', async ({ request }) => {
    const response = await request.get('/api/users');

    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
  });

  test('GET usuario por ID', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`/api/users/${userId}`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(userId);
    expect(user.email).toBeDefined();
  });

  test('GET con query parameters', async ({ request }) => {
    const response = await request.get('/api/users', {
      params: {
        page: 1,
        limit: 10,
        sort: 'name',
      },
    });

    expect(response.status()).toBe(200);
  });

  test('GET recurso inexistente', async ({ request }) => {
    const response = await request.get('/api/users/99999');

    expect(response.status()).toBe(404);
  });
});
```

#### POST - Crear Datos

```typescript
test.describe('POST Requests', () => {

  test('POST crear usuario', async ({ request }) => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'SecurePassword123',
    };

    const response = await request.post('/api/users', {
      data: newUser,
    });

    expect(response.status()).toBe(201);

    const createdUser = await response.json();
    expect(createdUser.id).toBeDefined();
    expect(createdUser.email).toBe(newUser.email);
  });

  test('POST con datos inválidos', async ({ request }) => {
    const invalidUser = {
      name: '',  // nombre vacío
      email: 'not-an-email',  // email inválido
    };

    const response = await request.post('/api/users', {
      data: invalidUser,
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.message).toBeDefined();
  });

  test('POST con headers custom', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: { name: 'Test', email: 'test@test.com' },
      headers: {
        'X-Custom-Header': 'custom-value',
      },
    });

    expect(response.status()).toBe(201);
  });
});
```

#### PUT - Actualizar Datos

```typescript
test.describe('PUT Requests', () => {

  test('PUT actualizar usuario completo', async ({ request }) => {
    const userId = 1;
    const updatedData = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    const response = await request.put(`/api/users/${userId}`, {
      data: updatedData,
    });

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.name).toBe(updatedData.name);
  });

  test('PUT recurso inexistente', async ({ request }) => {
    const response = await request.put('/api/users/99999', {
      data: { name: 'Test' },
    });

    expect(response.status()).toBe(404);
  });
});
```

#### PATCH - Actualizar Parcial

```typescript
test.describe('PATCH Requests', () => {

  test('PATCH actualizar campo específico', async ({ request }) => {
    const userId = 1;

    const response = await request.patch(`/api/users/${userId}`, {
      data: {
        name: 'Only Name Changed',
      },
    });

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.name).toBe('Only Name Changed');
    // email no cambió
  });
});
```

#### DELETE - Eliminar Datos

```typescript
test.describe('DELETE Requests', () => {

  test('DELETE usuario existente', async ({ request }) => {
    // Primero crear usuario
    const createResponse = await request.post('/api/users', {
      data: { name: 'To Delete', email: 'delete@test.com' },
    });
    const createdUser = await createResponse.json();

    // Luego eliminar
    const deleteResponse = await request.delete(`/api/users/${createdUser.id}`);

    expect(deleteResponse.status()).toBe(204); // No Content

    // Verificar que ya no existe
    const getResponse = await request.get(`/api/users/${createdUser.id}`);
    expect(getResponse.status()).toBe(404);
  });

  test('DELETE recurso inexistente', async ({ request }) => {
    const response = await request.delete('/api/users/99999');
    expect(response.status()).toBe(404);
  });
});
```

---

### 5.3 Validación de Responses (20 min)

#### Validar Status Codes

```typescript
test.describe('Status Code Validation', () => {

  test('validar diferentes status codes', async ({ request }) => {
    // 200 OK
    const okResponse = await request.get('/api/users');
    expect(okResponse.status()).toBe(200);
    expect(okResponse.ok()).toBeTruthy();

    // 201 Created
    const createResponse = await request.post('/api/users', {
      data: { name: 'Test', email: 'test@test.com' }
    });
    expect(createResponse.status()).toBe(201);

    // 204 No Content
    const deleteResponse = await request.delete('/api/users/1');
    expect(deleteResponse.status()).toBe(204);

    // 4xx Client Error
    const notFoundResponse = await request.get('/api/users/99999');
    expect(notFoundResponse.status()).toBe(404);
    expect(notFoundResponse.ok()).toBeFalsy();

    // 400 Bad Request
    const badRequestResponse = await request.post('/api/users', {
      data: { invalidField: true }
    });
    expect(badRequestResponse.status()).toBe(400);
  });
});
```

#### Validar Estructura de Response

```typescript
test.describe('Response Structure Validation', () => {

  test('validar estructura de usuario', async ({ request }) => {
    const response = await request.get('/api/users/1');
    const user = await response.json();

    // Campos requeridos existen
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');

    // Tipos correctos
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
  });

  test('validar estructura de lista paginada', async ({ request }) => {
    const response = await request.get('/api/users?page=1&limit=10');
    const result = await response.json();

    // Estructura de paginación
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('meta');
    expect(Array.isArray(result.data)).toBeTruthy();

    // Meta información
    expect(result.meta).toHaveProperty('total');
    expect(result.meta).toHaveProperty('page');
    expect(result.meta).toHaveProperty('limit');
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
  });

  test('validar estructura de error', async ({ request }) => {
    const response = await request.get('/api/users/99999');
    const error = await response.json();

    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('statusCode');
    expect(error.statusCode).toBe(404);
  });
});
```

#### Validar con Schema (Usando Zod)

```typescript
import { z } from 'zod';

// Definir schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.string().datetime().optional(),
});

const UsersListSchema = z.object({
  data: z.array(UserSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
});

test('validar con Zod schema', async ({ request }) => {
  const response = await request.get('/api/users');
  const result = await response.json();

  // Validar contra schema
  const parsed = UsersListSchema.parse(result);

  // Si llega aquí, el schema es válido
  expect(parsed.data.length).toBeGreaterThan(0);
});
```

---

### 5.4 Autenticación y Tokens (20 min)

#### Login y Obtener Token

```typescript
test.describe('Authentication', () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    // Login para obtener token
    const response = await request.post('/api/auth/login', {
      data: {
        email: 'admin@example.com',
        password: 'AdminPassword123!',
      },
    });

    expect(response.status()).toBe(200);

    const { token } = await response.json();
    authToken = token;
  });

  test('acceder a recurso protegido con token', async ({ request }) => {
    const response = await request.get('/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    expect(response.status()).toBe(200);
  });

  test('rechaza acceso sin token', async ({ request }) => {
    const response = await request.get('/api/admin/users');
    expect(response.status()).toBe(401);
  });

  test('rechaza token inválido', async ({ request }) => {
    const response = await request.get('/api/admin/users', {
      headers: {
        'Authorization': 'Bearer invalid-token-here',
      },
    });

    expect(response.status()).toBe(401);
  });
});
```

#### Fixture para Autenticación

```typescript
// fixtures/auth.ts
import { test as base, APIRequestContext } from '@playwright/test';

type AuthFixtures = {
  authenticatedRequest: APIRequestContext;
};

export const test = base.extend<AuthFixtures>({
  authenticatedRequest: async ({ playwright }, use) => {
    // Crear contexto con token
    const context = await playwright.request.newContext({
      baseURL: 'https://api.example.com',
      extraHTTPHeaders: {
        'Authorization': 'Bearer your-token-here',
        'Accept': 'application/json',
      },
    });

    await use(context);

    // Cleanup
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
```

```typescript
// tests/admin.spec.ts
import { test, expect } from '../fixtures/auth';

test('admin puede ver todos los usuarios', async ({ authenticatedRequest }) => {
  const response = await authenticatedRequest.get('/api/admin/users');
  expect(response.status()).toBe(200);
});
```

#### Obtener Token Dinámicamente

```typescript
// fixtures/auth.ts
import { test as base, APIRequestContext } from '@playwright/test';

async function getAuthToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('/api/auth/login', {
    data: {
      email: process.env.TEST_USER_EMAIL || 'test@test.com',
      password: process.env.TEST_USER_PASSWORD || 'password123',
    },
  });

  const { token } = await response.json();
  return token;
}

export const test = base.extend<{ authToken: string }>({
  authToken: async ({ request }, use) => {
    const token = await getAuthToken(request);
    await use(token);
  },
});
```

---

### 5.5 Mocking de APIs (20 min)

#### Interceptar Requests en Tests E2E

```typescript
import { test, expect } from '@playwright/test';

test('mockear respuesta de API', async ({ page }) => {
  // Interceptar antes de navegar
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Mock User 1', email: 'mock1@test.com' },
        { id: 2, name: 'Mock User 2', email: 'mock2@test.com' },
      ]),
    });
  });

  await page.goto('/users');

  // La página recibe datos mockeados
  await expect(page.getByText('Mock User 1')).toBeVisible();
  await expect(page.getByText('Mock User 2')).toBeVisible();
});
```

#### Mockear Errores

```typescript
test('UI maneja error de API gracefully', async ({ page }) => {
  // Simular error 500
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    });
  });

  await page.goto('/users');

  // Verificar mensaje de error en UI
  await expect(page.getByText(/error|something went wrong/i)).toBeVisible();
});

test('UI maneja timeout', async ({ page }) => {
  // Simular respuesta lenta
  await page.route('**/api/users', async (route) => {
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 segundos
    await route.continue();
  });

  await page.goto('/users');

  // Verificar loading state o timeout message
  await expect(page.getByText(/loading|timeout/i)).toBeVisible();
});
```

#### Modificar Response Real

```typescript
test('modificar respuesta de API', async ({ page }) => {
  await page.route('**/api/user/profile', async (route) => {
    // Obtener respuesta real
    const response = await route.fetch();
    const json = await response.json();

    // Modificar
    json.name = 'Modified Name';
    json.isPremium = true;

    // Responder con datos modificados
    await route.fulfill({
      response,
      body: JSON.stringify(json),
    });
  });

  await page.goto('/profile');

  await expect(page.getByText('Modified Name')).toBeVisible();
  await expect(page.getByText('Premium')).toBeVisible();
});
```

#### Grabar y Reproducir Requests

```typescript
// Grabar responses reales
test('grabar responses', async ({ page }) => {
  const responses: any[] = [];

  page.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      const body = await response.json().catch(() => null);
      responses.push({
        url: response.url(),
        status: response.status(),
        body,
      });
    }
  });

  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');

  // Guardar para uso posterior
  console.log(JSON.stringify(responses, null, 2));
});
```

---

### 5.6 Patrones Avanzados (20 min)

#### CRUD Completo

```typescript
test.describe('CRUD Operations', () => {
  let createdUserId: number;

  test('CREATE - crear nuevo usuario', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'CRUD Test User',
        email: 'crud@test.com',
      },
    });

    expect(response.status()).toBe(201);
    const user = await response.json();
    createdUserId = user.id;
    expect(createdUserId).toBeDefined();
  });

  test('READ - obtener usuario creado', async ({ request }) => {
    const response = await request.get(`/api/users/${createdUserId}`);

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe('CRUD Test User');
  });

  test('UPDATE - actualizar usuario', async ({ request }) => {
    const response = await request.put(`/api/users/${createdUserId}`, {
      data: {
        name: 'Updated CRUD User',
      },
    });

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe('Updated CRUD User');
  });

  test('DELETE - eliminar usuario', async ({ request }) => {
    const response = await request.delete(`/api/users/${createdUserId}`);
    expect(response.status()).toBe(204);

    // Verificar que no existe
    const getResponse = await request.get(`/api/users/${createdUserId}`);
    expect(getResponse.status()).toBe(404);
  });
});
```

#### API Client Class

```typescript
// api/ApiClient.ts
import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  // Users
  async getUsers() {
    const response = await this.request.get('/api/users');
    return response.json();
  }

  async getUser(id: number) {
    const response = await this.request.get(`/api/users/${id}`);
    return response.json();
  }

  async createUser(data: { name: string; email: string }) {
    const response = await this.request.post('/api/users', { data });
    return response.json();
  }

  async updateUser(id: number, data: Partial<{ name: string; email: string }>) {
    const response = await this.request.put(`/api/users/${id}`, { data });
    return response.json();
  }

  async deleteUser(id: number) {
    return this.request.delete(`/api/users/${id}`);
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.request.post('/api/auth/login', {
      data: { email, password },
    });
    return response.json();
  }
}
```

```typescript
// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';

test('usar API Client', async ({ request }) => {
  const api = new ApiClient(request);

  const users = await api.getUsers();
  expect(users.length).toBeGreaterThan(0);

  const newUser = await api.createUser({
    name: 'API Client Test',
    email: 'apiclient@test.com',
  });
  expect(newUser.id).toBeDefined();
});
```

---

## Cheatsheet de API Testing

### Métodos HTTP

| Método | Uso | Status Esperado |
|--------|-----|-----------------|
| GET | Obtener recursos | 200 OK |
| POST | Crear recurso | 201 Created |
| PUT | Reemplazar recurso | 200 OK |
| PATCH | Actualizar parcial | 200 OK |
| DELETE | Eliminar recurso | 204 No Content |

### Status Codes Comunes

| Código | Significado |
|--------|-------------|
| 200 | OK - Éxito |
| 201 | Created - Recurso creado |
| 204 | No Content - Éxito sin body |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Sin autenticación |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - No existe |
| 500 | Server Error - Error interno |

### Sintaxis Rápida

```typescript
// GET
await request.get('/api/users');
await request.get('/api/users', { params: { page: 1 } });

// POST
await request.post('/api/users', { data: { name: 'Test' } });

// PUT/PATCH
await request.put('/api/users/1', { data: { name: 'Updated' } });

// DELETE
await request.delete('/api/users/1');

// Headers
await request.get('/api/users', {
  headers: { 'Authorization': 'Bearer token' }
});

// Validar response
expect(response.status()).toBe(200);
expect(response.ok()).toBeTruthy();
const json = await response.json();
```

---

## Puntos Clave

1. **Mismo framework:** Playwright para E2E y API
2. **request fixture:** Viene pre-configurado con baseURL
3. **Validar siempre:** Status codes + estructura de response
4. **Autenticación:** Usar fixtures para tokens
5. **Mocking:** page.route() para interceptar en tests E2E

---

*Siguiente módulo: Fixtures y Data Management*
