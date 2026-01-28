# Tutorial: API Mocking y Aislamiento
## Módulo 02: API Testing

**Duración**: 25 minutos  
**Nivel**: Intermedio

---

## Aislar Tests de Dependencias Externas

Mockear APIs externas para tests rápidos y confiables.

```typescript
test('mockear respuesta de API', async ({ page, context }) => {
  // Interceptar request a API
  await context.route('**/api/external-service', (route) => {
    // Responder con datos controlados
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: 'mockeado',
        timestamp: Date.now()
      })
    });
  });

  await page.goto('http://localhost:3000');
  
  // El test usa datos mockeados, no la API real
  await expect(page.getByText('mockeado')).toBeVisible();
});
```

---

## Casos Comunes

### 1. Mockear Error 500

```typescript
await context.route('**/api/external', (route) => {
  route.fulfill({
    status: 500,
    body: JSON.stringify({ error: 'Server error' })
  });
});
```

### 2. Mockear Timeout

```typescript
await context.route('**/api/slow', (route) => {
  route.abort('timedout');
});
```

### 3. Modificar Response Real

```typescript
await context.route('**/api/prices', async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  
  // Modificar: aplicar descuento
  json.items = json.items.map(item => ({
    ...item,
    price: item.price * 0.9 // 10% descuento
  }));
  
  route.fulfill({ response, json });
});
```

---

## Ventajas

✅ Tests 5x más rápidos (sin network)  
✅ Confiables (sin dependencias externas)  
✅ Control total (simular cualquier escenario)  
✅ Económico (no consume cuotas API)

---

*Tutorial: API Mocking - Módulo 02 API Testing - FPUNA 2026*
