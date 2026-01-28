# Tutorial: Validación de Schemas con Zod
## Módulo 02: API Testing

**Duración**: 35 minutos  
**Nivel**: Intermedio

---

## Problema: Validación en Runtime

TypeScript compila correctamente pero falla en runtime:

```typescript
// ❌ TypeScript dice OK, pero falla en ejecución
interface Product {
  id: number;
  nombre: string;
  precio: number;
}

const product: Product = await response.json();
console.log(product.nombre.toUpperCase()); // Crash si nombre es null
```

---

## Solución: Zod

Zod valida datos en runtime y genera tipos automáticamente.

### Instalación

```bash
npm install zod
```

### Schema Básico

```typescript
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number().positive(),
  nombre: z.string().min(3),
  precio: z.number().positive(),
  stock: z.number().int().min(0),
});

// Tipo automático
type Product = z.infer<typeof ProductSchema>;
```

### Validación

```typescript
test('validar respuesta con Zod', async ({ request }) => {
  const response = await request.get('/api/products/1');
  const data = await response.json();

  // Validar sin error
  const result = ProductSchema.safeParse(data);

  expect(result.success).toBe(true);

  if (result.success) {
    // Type-safe access
    const product = result.data;
    expect(product.precio > 0).toBe(true);
  }
});
```

### Manejo de Errores

```typescript
const result = ProductSchema.safeParse(invalidData);

if (!result.success) {
  // Errores detallados
  console.error(result.error.format());
  // {
  //   id: { _errors: ['Number must be positive'] },
  //   nombre: { _errors: ['String must contain at least 3 character(s)'] }
  // }
}
```

---

## Casos de Uso

### 1. Validar Arrays

```typescript
const ProductListSchema = z.array(ProductSchema);

const products = await response.json();
const valid = ProductListSchema.safeParse(products);
expect(valid.success).toBe(true);
```

### 2. Respuestas Paginadas

```typescript
const PaginatedSchema = z.object({
  data: z.array(ProductSchema),
  pagination: z.object({
    page: z.number(),
    total: z.number(),
  }),
});
```

### 3. Optional Fields

```typescript
const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  telefono: z.string().optional(), // Opcional
});
```

---

*Tutorial: Schema Validation Zod - Módulo 02 API Testing - FPUNA 2026*
