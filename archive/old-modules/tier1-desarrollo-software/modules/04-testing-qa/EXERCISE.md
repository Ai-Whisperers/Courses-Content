# Ejercicio Práctico - Módulo 04
## Testing y QA con IA

---

## Objetivo

Crear una suite de tests completa para el código desarrollado en módulos anteriores.

**Duración:** 25 minutos
**Meta:** >80% cobertura

---

## Proyecto: Suite de Tests

### Paso 1: Tests Unitarios (10 min)

Genera tests para:
- Funciones de validación (validators.js del Módulo 01)
- Lógica de negocio del backend (Módulo 02)

Usar Jest + describe blocks organizados.

### Paso 2: Tests de Integración (8 min)

Testear endpoints de la API:
- GET /api/products
- POST /api/products (válido e inválido)

Usar supertest.

### Paso 3: Code Review (7 min)

Pide a Claude que revise tu código y:
1. Identifique problemas
2. Sugiera mejoras
3. Documente hallazgos

---

## Entregable

```
tests/
├── unit/
│   ├── validators.test.ts
│   └── productService.test.ts
├── integration/
│   └── products.api.test.ts
├── coverage/             # generado
└── code-review.md        # hallazgos del review
```

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Tests unitarios funcionando | 30 |
| Tests de integración | 25 |
| Cobertura >80% | 25 |
| Code review documentado | 20 |
| **Total** | **100** |

---

*Ejercicio Módulo 04 - Testing y QA*
