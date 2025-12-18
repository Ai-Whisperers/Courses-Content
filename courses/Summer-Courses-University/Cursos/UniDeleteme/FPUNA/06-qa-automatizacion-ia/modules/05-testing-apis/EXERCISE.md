# Ejercicio: Módulo 5
## Tests de API REST Completos

---

## Objetivo

Crear tests de API para un servicio REST de gestión de tareas (TODO API).

**Duración:** 30 minutos

---

## API de Práctica

Usaremos JSONPlaceholder como API de práctica:

- **Base URL:** `https://jsonplaceholder.typicode.com`
- **Recurso:** `/todos`

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /todos | Lista todas las tareas |
| GET | /todos/:id | Obtener tarea por ID |
| POST | /todos | Crear nueva tarea |
| PUT | /todos/:id | Actualizar tarea |
| DELETE | /todos/:id | Eliminar tarea |

### Estructura de una Tarea

```json
{
  "id": 1,
  "userId": 1,
  "title": "Completar ejercicio de API",
  "completed": false
}
```

---

## Parte 1: Configuración (5 minutos)

### Actualizar playwright.config.ts

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    // COMPLETAR: Configurar baseURL para la API
    baseURL: '________________________',

    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
```

### Crear archivo de tests

Crea `tests/todos-api.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('TODO API Tests', () => {
  // Tests aquí...
});
```

---

## Parte 2: Tests GET (10 minutos)

### Test 1: Obtener lista de tareas

```typescript
test('GET /todos - obtiene lista de tareas', async ({ request }) => {
  // COMPLETAR: Hacer request GET
  const response = await request._____('/todos');

  // COMPLETAR: Verificar status 200
  expect(response._______()).toBe(200);

  // COMPLETAR: Obtener JSON
  const todos = await response._______();

  // Verificar que es un array
  expect(Array.isArray(todos)).toBeTruthy();

  // COMPLETAR: Verificar que hay elementos
  expect(todos.length).toBeGreaterThan(___);
});
```

### Test 2: Obtener tarea por ID

```typescript
test('GET /todos/:id - obtiene tarea específica', async ({ request }) => {
  const todoId = 1;

  // COMPLETAR: Hacer request con ID
  const response = await request.get(`/todos/${_______}`);

  expect(response.status()).toBe(200);

  const todo = await response.json();

  // COMPLETAR: Verificar estructura
  expect(todo).toHaveProperty('___');
  expect(todo).toHaveProperty('_____');
  expect(todo).toHaveProperty('_________');
  expect(todo.id).toBe(todoId);
});
```

### Test 3: Tarea inexistente retorna 404

```typescript
test('GET /todos/:id - retorna 404 para ID inexistente', async ({ request }) => {
  // COMPLETAR: ID que no existe
  const response = await request.get('/todos/_______');

  // COMPLETAR: Verificar 404
  expect(response.status()).toBe(___);
});
```

---

## Parte 3: Tests POST (10 minutos)

### Test 4: Crear nueva tarea

```typescript
test('POST /todos - crea nueva tarea', async ({ request }) => {
  const newTodo = {
    userId: 1,
    title: 'Tarea creada en test',
    completed: false,
  };

  // COMPLETAR: Hacer POST con data
  const response = await request.post('/todos', {
    ____: newTodo,
  });

  // COMPLETAR: Verificar 201 Created
  expect(response.status()).toBe(___);

  const created = await response.json();

  // COMPLETAR: Verificar que tiene ID
  expect(created.___).toBeDefined();
  expect(created.title).toBe(newTodo.title);
});
```

### Test 5: Crear tarea con datos mínimos

```typescript
test('POST /todos - crea tarea con datos mínimos', async ({ request }) => {
  const minimalTodo = {
    title: 'Solo título',
  };

  const response = await request.post('/todos', {
    data: minimalTodo,
  });

  // JSONPlaceholder acepta datos parciales
  expect(response.status()).toBe(201);

  const created = await response.json();
  expect(created.title).toBe('Solo título');
});
```

---

## Parte 4: Tests PUT (5 minutos)

### Test 6: Actualizar tarea existente

```typescript
test('PUT /todos/:id - actualiza tarea', async ({ request }) => {
  const todoId = 1;
  const updatedData = {
    userId: 1,
    id: todoId,
    title: 'Tarea actualizada',
    completed: true,
  };

  // COMPLETAR: Hacer PUT
  const response = await request.___(`/todos/${todoId}`, {
    data: updatedData,
  });

  expect(response.status()).toBe(200);

  const updated = await response.json();

  // COMPLETAR: Verificar cambios
  expect(updated._____).toBe('Tarea actualizada');
  expect(updated._________).toBe(true);
});
```

---

## Parte 5: Tests DELETE (5 minutos)

### Test 7: Eliminar tarea

```typescript
test('DELETE /todos/:id - elimina tarea', async ({ request }) => {
  const todoId = 1;

  // COMPLETAR: Hacer DELETE
  const response = await request.______(`/todos/${todoId}`);

  // JSONPlaceholder retorna 200 para DELETE
  expect(response.status()).toBe(200);
});
```

---

## Soluciones

### Configuración:
```typescript
baseURL: 'https://jsonplaceholder.typicode.com',
```

### Test 1:
```typescript
test('GET /todos - obtiene lista de tareas', async ({ request }) => {
  const response = await request.get('/todos');
  expect(response.status()).toBe(200);
  const todos = await response.json();
  expect(Array.isArray(todos)).toBeTruthy();
  expect(todos.length).toBeGreaterThan(0);
});
```

### Test 2:
```typescript
test('GET /todos/:id - obtiene tarea específica', async ({ request }) => {
  const todoId = 1;
  const response = await request.get(`/todos/${todoId}`);
  expect(response.status()).toBe(200);
  const todo = await response.json();
  expect(todo).toHaveProperty('id');
  expect(todo).toHaveProperty('title');
  expect(todo).toHaveProperty('completed');
  expect(todo.id).toBe(todoId);
});
```

### Test 3:
```typescript
test('GET /todos/:id - retorna 404 para ID inexistente', async ({ request }) => {
  const response = await request.get('/todos/999999');
  expect(response.status()).toBe(404);
});
```

### Test 4:
```typescript
test('POST /todos - crea nueva tarea', async ({ request }) => {
  const newTodo = {
    userId: 1,
    title: 'Tarea creada en test',
    completed: false,
  };

  const response = await request.post('/todos', {
    data: newTodo,
  });

  expect(response.status()).toBe(201);

  const created = await response.json();
  expect(created.id).toBeDefined();
  expect(created.title).toBe(newTodo.title);
});
```

### Test 6:
```typescript
test('PUT /todos/:id - actualiza tarea', async ({ request }) => {
  const todoId = 1;
  const updatedData = {
    userId: 1,
    id: todoId,
    title: 'Tarea actualizada',
    completed: true,
  };

  const response = await request.put(`/todos/${todoId}`, {
    data: updatedData,
  });

  expect(response.status()).toBe(200);

  const updated = await response.json();
  expect(updated.title).toBe('Tarea actualizada');
  expect(updated.completed).toBe(true);
});
```

### Test 7:
```typescript
test('DELETE /todos/:id - elimina tarea', async ({ request }) => {
  const todoId = 1;
  const response = await request.delete(`/todos/${todoId}`);
  expect(response.status()).toBe(200);
});
```

---

## Suite Completa

```typescript
// tests/todos-api.spec.ts
import { test, expect } from '@playwright/test';

test.describe('TODO API Tests', () => {

  test('GET /todos - obtiene lista de tareas', async ({ request }) => {
    const response = await request.get('/todos');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const todos = await response.json();
    expect(Array.isArray(todos)).toBeTruthy();
    expect(todos.length).toBeGreaterThan(0);

    // Verificar estructura del primer elemento
    const firstTodo = todos[0];
    expect(firstTodo).toHaveProperty('id');
    expect(firstTodo).toHaveProperty('userId');
    expect(firstTodo).toHaveProperty('title');
    expect(firstTodo).toHaveProperty('completed');
  });

  test('GET /todos/:id - obtiene tarea específica', async ({ request }) => {
    const todoId = 1;
    const response = await request.get(`/todos/${todoId}`);

    expect(response.status()).toBe(200);

    const todo = await response.json();
    expect(todo.id).toBe(todoId);
    expect(typeof todo.title).toBe('string');
    expect(typeof todo.completed).toBe('boolean');
  });

  test('GET /todos/:id - retorna 404 para ID inexistente', async ({ request }) => {
    const response = await request.get('/todos/999999');
    expect(response.status()).toBe(404);
  });

  test('GET /todos con filtro - filtra por userId', async ({ request }) => {
    const response = await request.get('/todos', {
      params: { userId: 1 },
    });

    expect(response.status()).toBe(200);

    const todos = await response.json();
    todos.forEach((todo: any) => {
      expect(todo.userId).toBe(1);
    });
  });

  test('POST /todos - crea nueva tarea', async ({ request }) => {
    const newTodo = {
      userId: 1,
      title: 'Tarea creada en test',
      completed: false,
    };

    const response = await request.post('/todos', {
      data: newTodo,
    });

    expect(response.status()).toBe(201);

    const created = await response.json();
    expect(created.id).toBeDefined();
    expect(created.title).toBe(newTodo.title);
    expect(created.completed).toBe(false);
  });

  test('PUT /todos/:id - actualiza tarea completa', async ({ request }) => {
    const todoId = 1;
    const updatedData = {
      userId: 1,
      id: todoId,
      title: 'Tarea actualizada completamente',
      completed: true,
    };

    const response = await request.put(`/todos/${todoId}`, {
      data: updatedData,
    });

    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.title).toBe(updatedData.title);
    expect(updated.completed).toBe(true);
  });

  test('PATCH /todos/:id - actualiza campo específico', async ({ request }) => {
    const todoId = 1;

    const response = await request.patch(`/todos/${todoId}`, {
      data: { completed: true },
    });

    expect(response.status()).toBe(200);

    const patched = await response.json();
    expect(patched.completed).toBe(true);
  });

  test('DELETE /todos/:id - elimina tarea', async ({ request }) => {
    const todoId = 1;
    const response = await request.delete(`/todos/${todoId}`);
    expect(response.status()).toBe(200);
  });
});
```

---

## Ejecutar Tests

```bash
# Ejecutar tests de API
npx playwright test todos-api.spec.ts

# Con detalles
npx playwright test todos-api.spec.ts --reporter=list

# Ver reporte
npx playwright show-report
```

---

## Checklist de Entrega

- [ ] Configuración de baseURL correcta
- [ ] Test GET lista funciona
- [ ] Test GET por ID funciona
- [ ] Test GET 404 funciona
- [ ] Test POST crear funciona
- [ ] Test PUT actualizar funciona
- [ ] Test DELETE funciona
- [ ] Todos los tests pasan

---

## Reflexión

1. ¿Qué diferencia notaste entre testing de API y testing E2E?

   _______________________________________________

2. ¿Qué status codes encontraste en cada operación?

   _______________________________________________

3. ¿Cómo verificarías la autenticación si la API la requiriera?

   _______________________________________________

---

*Tiempo total: 30 minutos*
