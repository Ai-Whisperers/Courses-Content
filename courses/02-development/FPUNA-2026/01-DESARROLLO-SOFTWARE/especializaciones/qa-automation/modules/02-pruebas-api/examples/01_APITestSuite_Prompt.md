# Ejemplo: Suite Completa de Tests de API
## Módulo 02: API Testing

**Propósito**: Generar tests con Playwright para API REST

---

## Prompt para OpenCode

```
Genera suite completa de tests de API con Playwright (TypeScript):

API: E-commerce FPUNA
BASE_URL: http://localhost:3000/api

ENDPOINTS A TESTEAR:
- GET /products (lista con paginación)
- GET /products/:id (detalle)
- POST /products (crear, requiere auth)
- PUT /products/:id (actualizar)
- DELETE /products/:id (eliminar)

SCHEMA (con Zod):
Product: id, nombre, precio, stock, categoria, createdAt

TESTS REQUERIDOS (mínimo 8):
1. GET /products - lista válida, paginación
2. GET /products/:id - producto existente
3. GET /products/999 - retorna 404
4. POST /products - crear válido (201)
5. POST /products - validación falla (400)
6. PUT /products/:id - actualizar exitoso
7. DELETE /products/:id - eliminar exitoso
8. Performance: GET debe ser < 500ms

VALIDACIONES:
- Schema validation con Zod
- Status codes correctos
- Headers Content-Type
- Datos calculados correctamente

ESTRUCTURA:
- Test fixtures para setup/cleanup
- Comentarios en español
- beforeAll para crear datos de test
- afterAll para limpiar

SALIDA: Código listo para .spec.ts
```

---

## Salida Esperada

```typescript
import { test, expect } from '@playwright/test';
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number().positive(),
  nombre: z.string(),
  precio: z.number().positive(),
  stock: z.number().int().min(0),
  categoria: z.string(),
  createdAt: z.string().datetime()
});

test.describe('E-commerce API Tests', () => {
  let productId: number;

  test.beforeAll(async () => {
    // Setup datos de test
  });

  test('GET /products retorna lista válida', async ({ request }) => {
    const response = await request.get(
      'http://localhost:3000/api/products'
    );

    expect(response.status()).toBe(200);
    const data = await response.json();
    
    const validation = z.array(ProductSchema).safeParse(data);
    expect(validation.success).toBe(true);
  });

  test('POST /products crea producto', async ({ request }) => {
    const response = await request.post(
      'http://localhost:3000/api/products',
      {
        data: {
          nombre: 'Laptop HP',
          precio: 3000000,
          stock: 5,
          categoria: 'Electrónica'
        }
      }
    );

    expect(response.status()).toBe(201);
    const data = await response.json();
    productId = data.id;
    
    expect(ProductSchema.safeParse(data).success).toBe(true);
  });

  test('GET /products/:id retorna detalle', async ({ request }) => {
    const response = await request.get(
      `http://localhost:3000/api/products/${productId}`
    );

    expect(response.status()).toBe(200);
    const data = await response.json();
    
    expect(ProductSchema.safeParse(data).success).toBe(true);
  });

  test('DELETE /products/:id elimina', async ({ request }) => {
    const response = await request.delete(
      `http://localhost:3000/api/products/${productId}`
    );

    expect(response.status()).toBe(204);
  });

  test('Performance: GET < 500ms', async ({ request }) => {
    const start = performance.now();
    const response = await request.get(
      'http://localhost:3000/api/products'
    );
    const duration = performance.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(500);
  });
});
```

---

*Ejemplo: API Test Suite - Módulo 02 API Testing - FPUNA 2026*
