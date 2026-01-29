# Tutorial: Fundamentos de REST API Testing
## Módulo 02: API Testing

**Duración**: 40 minutos  
**Nivel**: Principiante-Intermedio

---

## ¿Qué es una API REST?

API REST es la forma estándar de comunicación entre servicios en la web.

### Conceptos Clave

| Concepto | Explicación | Ejemplo |
|----------|-------------|---------|
| **Endpoint** | Ruta de la API | `/api/products` |
| **Method** | Verbo HTTP (acción) | GET, POST, PUT, DELETE |
| **Request** | Lo que envías | Headers, Body, Params |
| **Response** | Lo que recibes | Status Code, Body |
| **Status Code** | Código de éxito/error | 200, 404, 500 |

### HTTP Methods (CRUD)

```
GET    → Leer (Read)
POST   → Crear (Create)
PUT    → Actualizar completo (Update)
DELETE → Eliminar (Delete)
PATCH  → Actualizar parcial (Modify)
```

---

## Ejemplo 1: GET Request Simple

```typescript
import { test, expect } from '@playwright/test';

test('obtener lista de productos', async ({ request }) => {
  // Hacer GET request
  const response = await request.get('https://api.ejemplo.com/products');

  // Validar status
  expect(response.status()).toBe(200);

  // Obtener datos
  const products = await response.json();
  expect(Array.isArray(products)).toBe(true);
});
```

---

## Ejemplo 2: POST Request (Crear)

```typescript
test('crear producto', async ({ request }) => {
  const response = await request.post('https://api.ejemplo.com/products', {
    data: {
      nombre: 'Laptop HP',
      precio: 2500000,
      stock: 10
    }
  });

  expect(response.status()).toBe(201); // Created
  
  const product = await response.json();
  expect(product.id).toBeDefined();
});
```

---

## Validaciones por Capas

```
✅ Status Code  (200, 201, 404)
✅ Headers      (Content-Type, CORS)
✅ Body Exists  (JSON válido)
✅ Structure    (Campos esperados)
✅ Types        (Números, strings, etc)
✅ Business     (Reglas de negocio)
```

---

## Mejores Prácticas

```typescript
// ✅ Validación completa
test('...', async ({ request }) => {
  const response = await request.get('/api/products/1');
  
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  
  const data = await response.json();
  expect(data.id).toBe(1);
  expect(data.precio).toBeGreaterThan(0);
});

// ❌ Incompleto
test('...', async ({ request }) => {
  const response = await request.get('/api/products/1');
  expect(response.status()).toBe(200); // Solo esto
});
```

---

*Tutorial: REST API Basics - Módulo 02 API Testing - FPUNA 2026*
