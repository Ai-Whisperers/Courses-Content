# Tutorial: Contract Testing
## Módulo 02: API Testing

**Duración**: 30 minutos  
**Nivel**: Intermedio-Avanzado

---

## Concepto: Consumer-Driven Contracts

Contract testing verifica que la API cumple el contrato esperado.

```
Frontend (Consumer)
    ↓
    "Necesito: GET /api/products retorna { id, nombre, precio }"
    ↓
Backend (Provider)
    "Me comprometo a eso"
    ↓
✅ Contract valid
```

---

## Patrón Básico

### 1. Definir Contrato

```typescript
// contracts/product.contract.ts
export const ProductContract = {
  GET: {
    '/api/products': {
      response: {
        status: 200,
        body: [
          {
            id: 'number',
            nombre: 'string',
            precio: 'number'
          }
        ]
      }
    }
  },
  POST: {
    '/api/products': {
      request: {
        nombre: 'string',
        precio: 'number'
      },
      response: {
        status: 201,
        body: {
          id: 'number',
          createdAt: 'string'
        }
      }
    }
  }
};
```

### 2. Validar Contrato

```typescript
test('API cumple contrato POST /api/products', async ({ request }) => {
  const response = await request.post('/api/products', {
    data: {
      nombre: 'Test Product',
      precio: 100000
    }
  });

  const contract = ProductContract.POST['/api/products'];
  
  // Validar status
  expect(response.status()).toBe(contract.response.status);
  
  // Validar estructura
  const body = await response.json();
  expect(typeof body.id).toBe('number');
  expect(typeof body.createdAt).toBe('string');
});
```

---

## OpenAPI/Swagger

### Usar Especificación OpenAPI

```bash
npm install @apidevtools/swagger-parser
```

```typescript
import SwaggerParser from '@apidevtools/swagger-parser';

test('validar contrato OpenAPI', async ({ request }) => {
  const spec = await SwaggerParser.validate('./openapi.yaml');
  
  const response = await request.get('/api/products');
  
  // Validar contra spec
  const endpoint = spec.paths['/api/products'].get;
  expect(response.status().toString()).toBeTruthy();
});
```

---

## Casos de Uso

### 1. Múltiples Versiones API

```typescript
const ContractV1 = { /* ... */ };
const ContractV2 = { /* ... */ };

test('mantener retrocompatibilidad', async ({ request }) => {
  const response = await request.get('/api/products');
  const data = await response.json();
  
  // Debe cumplir V1
  validateAgainstContract(data, ContractV1);
  
  // Y V2
  validateAgainstContract(data, ContractV2);
});
```

### 2. Evolución de API

```typescript
// Cuando agregues campo nuevo:
const OldContract = { id, nombre, precio };
const NewContract = { id, nombre, precio, stock }; // stock es nuevo

// Los tests deben pasar con ambos
```

---

*Tutorial: Contract Testing - Módulo 02 API Testing - FPUNA 2026*
