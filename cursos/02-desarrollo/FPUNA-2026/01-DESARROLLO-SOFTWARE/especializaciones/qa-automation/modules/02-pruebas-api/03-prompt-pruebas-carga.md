# Ejemplo: Load Testing y Performance
## Módulo 02: API Testing

```
Genera tests de performance para API:

API: Producto Store FPUNA
Endpoints: GET /products, POST /orders

TESTS:
1. Single request timing: GET debe ser < 500ms
2. Concurrent requests: 50 requests en paralelo
3. Load testing: medir throughput (req/s)
4. Bottleneck detection: qué endpoint es más lento
5. Performance degradation: medir bajo carga

Usar:
- performance.now() para medición precisa
- Promise.all() para requests concurrentes
- Assertions de timing
- Logs de throughput

Código TypeScript, comentarios español
```

---

*Ejemplo: Load Testing - Módulo 02 API Testing - FPUNA 2026*
