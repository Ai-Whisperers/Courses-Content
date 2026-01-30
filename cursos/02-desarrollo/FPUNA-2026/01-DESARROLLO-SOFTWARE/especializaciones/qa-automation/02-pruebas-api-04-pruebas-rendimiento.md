# Tutorial: Performance Testing de APIs
## Módulo 02: API Testing

**Duración**: 25 minutos  
**Nivel**: Intermedio

---

## Medir Tiempos de Respuesta

```typescript
test('GET debe responder en < 500ms', async ({ request }) => {
  const start = performance.now();
  
  const response = await request.get('/api/products');
  
  const duration = performance.now() - start;
  
  expect(response.status()).toBe(200);
  expect(duration).toBeLessThan(500);
  
  console.log(`⏱️ ${duration.toFixed(2)}ms`);
});
```

---

## Load Testing

```typescript
test('50 requests concurrentes', async ({ request }) => {
  const promises = Array.from({ length: 50 }, () =>
    request.get('/api/products')
  );
  
  const start = Date.now();
  const responses = await Promise.all(promises);
  const duration = Date.now() - start;
  
  responses.forEach(r => expect(r.status()).toBe(200));
  
  const throughput = (50 / duration) * 1000;
  console.log(`🚀 ${throughput.toFixed(2)} req/s`);
});
```

---

## Umbrales de Rendimiento

| Tipo | Objetivo | Aceptable |
|------|----------|-----------|
| GET lectura | < 200ms | < 500ms |
| POST creación | < 500ms | < 1s |
| Bulk operations | < 2s | < 5s |

---

*Tutorial: Performance Testing - Módulo 02 API Testing - FPUNA 2026*
