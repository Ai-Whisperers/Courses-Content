# Prompts para Tests de API
## Templates para Claude, ChatGPT y Copilot

---

## Prompt 1: CRUD Completo

```markdown
Genera tests de API REST para CRUD de [RECURSO].

**Base URL:** [URL]

**Endpoints:**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/[recurso] | Listar todos |
| GET | /api/[recurso]/:id | Obtener uno |
| POST | /api/[recurso] | Crear |
| PUT | /api/[recurso]/:id | Actualizar |
| DELETE | /api/[recurso]/:id | Eliminar |

**Schema del recurso:**
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "createdAt": "datetime"
}
```

**Tests necesarios:**
1. GET lista - retorna array
2. GET por ID - retorna recurso
3. GET ID inexistente - retorna 404
4. POST crear - retorna 201 + recurso creado
5. POST datos inválidos - retorna 400
6. PUT actualizar - retorna 200 + recurso actualizado
7. PUT ID inexistente - retorna 404
8. DELETE - retorna 204
9. DELETE ID inexistente - retorna 404

**Formato:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('API: [Recurso]', () => {
  const baseUrl = '[URL]';

  test('GET /recurso retorna lista', async ({ request }) => {
    const response = await request.get(`${baseUrl}/recurso`);
    expect(response.status()).toBe(200);
    // ...
  });
});
```
```

---

## Prompt 2: Tests con Autenticación

```markdown
Genera tests de API que requieren autenticación.

**Tipo de autenticación:** [Bearer Token / Basic Auth / API Key]

**Endpoint de login:**
- POST /api/auth/login
- Body: { email, password }
- Response: { token, user }

**Endpoints protegidos:**
- GET /api/admin/users (solo admin)
- PUT /api/users/profile (usuario autenticado)
- POST /api/orders (usuario autenticado)

**Tests necesarios:**
1. Login exitoso obtiene token
2. Login fallido retorna 401
3. Request sin token retorna 401
4. Request con token inválido retorna 401
5. Request con token válido funciona
6. Admin puede acceder a /admin/*
7. Usuario normal no puede acceder a /admin/*
8. Token expirado retorna 401

**Patrón esperado:**
```typescript
test.describe('API con Auth', () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: 'test@test.com', password: 'password' }
    });
    const { token } = await response.json();
    authToken = token;
  });

  test('accede a ruta protegida con token', async ({ request }) => {
    const response = await request.get('/api/protected', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    expect(response.status()).toBe(200);
  });
});
```
```

---

## Prompt 3: Validación de Schema

```markdown
Genera tests que validen el schema de respuestas de API.

**Endpoint:** [método] [url]

**Schema esperado:**
```json
{
  "data": {
    "id": "number (required)",
    "name": "string (required, min 1 char)",
    "email": "string (email format)",
    "status": "enum: active|inactive|pending",
    "metadata": {
      "createdAt": "ISO datetime",
      "updatedAt": "ISO datetime"
    },
    "tags": "array of strings"
  },
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

**Validaciones:**
1. Campos requeridos están presentes
2. Tipos de datos correctos
3. Formatos válidos (email, datetime)
4. Enums contienen valores válidos
5. Arrays tienen estructura correcta

**Usar Zod para validación:**
```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  status: z.enum(['active', 'inactive', 'pending']),
  // ...
});

test('response matches schema', async ({ request }) => {
  const response = await request.get('/api/users/1');
  const data = await response.json();

  expect(() => UserSchema.parse(data)).not.toThrow();
});
```
```

---

## Prompt 4: Tests de Paginación

```markdown
Genera tests para endpoint paginado.

**Endpoint:** GET /api/items

**Parámetros de paginación:**
- page: número de página (default: 1)
- limit: items por página (default: 10, max: 100)
- sort: campo a ordenar
- order: asc | desc

**Response:**
```json
{
  "data": [...items],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

**Tests necesarios:**
1. Primera página retorna correctamente
2. Página intermedia tiene hasNext y hasPrev
3. Última página tiene hasNext: false
4. Limit customizado funciona
5. Limit > max usa max
6. Sort por diferentes campos
7. Order asc y desc
8. Página fuera de rango retorna vacío o error
```

---

## Prompt 5: Tests de Error Handling

```markdown
Genera tests para manejo de errores de API.

**Endpoint:** [método] [url]

**Errores a testear:**

| Status | Causa | Response esperado |
|--------|-------|-------------------|
| 400 | Datos inválidos | { error: 'Validation failed', details: [...] } |
| 401 | Sin autenticación | { error: 'Unauthorized' } |
| 403 | Sin permisos | { error: 'Forbidden' } |
| 404 | No encontrado | { error: 'Not found' } |
| 409 | Conflicto (duplicado) | { error: 'Already exists' } |
| 422 | Entidad no procesable | { error: 'Unprocessable entity' } |
| 429 | Rate limit | { error: 'Too many requests' } |
| 500 | Error interno | { error: 'Internal server error' } |

**Patrón:**
```typescript
test('retorna 400 con datos inválidos', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { email: 'invalid-email' }
  });

  expect(response.status()).toBe(400);

  const error = await response.json();
  expect(error.error).toBe('Validation failed');
  expect(error.details).toContainEqual(
    expect.objectContaining({ field: 'email' })
  );
});
```
```

---

## Prompt 6: Tests de Performance

```markdown
Genera tests que validen tiempos de respuesta de API.

**Endpoints a medir:**
| Endpoint | SLA (ms) |
|----------|----------|
| GET /api/health | < 100 |
| GET /api/users | < 500 |
| POST /api/login | < 1000 |
| GET /api/reports | < 3000 |

**Tests:**
```typescript
test('health check responde en < 100ms', async ({ request }) => {
  const start = Date.now();
  const response = await request.get('/api/health');
  const duration = Date.now() - start;

  expect(response.status()).toBe(200);
  expect(duration).toBeLessThan(100);
});
```

**Incluir:**
- Medición de tiempo de respuesta
- Test con carga (múltiples requests)
- Test de concurrencia
```

---

## Prompt 7: API Client Helper

```markdown
Genera un API Client helper para reutilizar en tests.

**Requisitos:**
- Wrapper sobre APIRequestContext de Playwright
- Métodos tipados para cada endpoint
- Manejo automático de autenticación
- Logging de requests/responses

**Endpoints:**
- Users: GET/POST/PUT/DELETE
- Products: GET/POST
- Orders: GET/POST

**Interface esperada:**
```typescript
class ApiClient {
  constructor(request: APIRequestContext) {}

  // Auth
  async login(email: string, password: string): Promise<LoginResponse>
  async logout(): Promise<void>

  // Users
  async getUsers(): Promise<User[]>
  async getUser(id: number): Promise<User>
  async createUser(data: CreateUserDto): Promise<User>
  async updateUser(id: number, data: UpdateUserDto): Promise<User>
  async deleteUser(id: number): Promise<void>

  // Products
  async getProducts(filters?: ProductFilters): Promise<Product[]>
  async createProduct(data: CreateProductDto): Promise<Product>
}
```

**Uso:**
```typescript
test('crear y obtener usuario', async ({ request }) => {
  const api = new ApiClient(request);

  const created = await api.createUser({
    name: 'Test',
    email: 'test@test.com'
  });

  const fetched = await api.getUser(created.id);
  expect(fetched.email).toBe('test@test.com');
});
```
```

---

## Prompt 8: Contract Testing

```markdown
Genera tests de contrato para API.

**Productor:** Backend API
**Consumidor:** Frontend App

**Contratos a verificar:**

1. **GET /api/users**
   - Response debe tener estructura específica
   - Campos requeridos siempre presentes
   - Tipos de datos correctos

2. **POST /api/users**
   - Acepta campos específicos
   - Retorna recurso creado con ID
   - Validaciones funcionan

**Formato de contrato (Pact-like):**
```typescript
const userContract = {
  request: {
    method: 'GET',
    path: '/api/users/1',
  },
  response: {
    status: 200,
    body: {
      id: Matchers.integer(),
      name: Matchers.string(),
      email: Matchers.email(),
      createdAt: Matchers.iso8601DateTime(),
    },
  },
};
```
```

---

## Consejos

### Estructura Recomendada

```typescript
test.describe('API: ResourceName', () => {
  const BASE_URL = '/api/resource';

  test.describe('GET operations', () => { });
  test.describe('POST operations', () => { });
  test.describe('PUT operations', () => { });
  test.describe('DELETE operations', () => { });
  test.describe('Error handling', () => { });
});
```

### Assertions Comunes

```typescript
// Status
expect(response.status()).toBe(200);
expect(response.ok()).toBeTruthy();

// Headers
expect(response.headers()['content-type']).toContain('application/json');

// Body
const json = await response.json();
expect(json).toHaveProperty('id');
expect(json.items).toHaveLength(10);
expect(json.email).toMatch(/.*@.*/);
```

---

*Ver también: prompts/data-factories.md*
