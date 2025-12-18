# Ejercicio Práctico - Módulo 02
## Desarrollo Backend con IA

---

## Objetivo

Desarrollar una API REST completa para un sistema de gestión utilizando IA como asistente principal.

**Duración:** 30 minutos
**Entregable:** API funcional con documentación

---

## Proyecto: API de Gestión de Productos

### Paso 1: Diseño con IA (5 min)

Envía a Claude/ChatGPT:
```
Diseña una API REST para gestión de productos de una tienda:
- CRUD de productos (nombre, precio, stock, categoría)
- Filtros por categoría y rango de precio
- Paginación

Stack: Node.js, Express, PostgreSQL, Prisma
Dame: endpoints, esquema Prisma, y estructura de carpetas
```

### Paso 2: Generar Esquema (5 min)

Usa el esquema Prisma generado, ajústalo si es necesario.

### Paso 3: Implementar Endpoints (15 min)

Con Copilot/Cursor, implementa:
- `GET /api/products` - Lista con filtros
- `POST /api/products` - Crear
- `PUT /api/products/:id` - Actualizar
- `DELETE /api/products/:id` - Eliminar

### Paso 4: Documentar (5 min)

Genera documentación OpenAPI para los endpoints.

---

## Entregable

```
api-productos/
├── prisma/schema.prisma
├── src/
│   ├── controllers/productController.ts
│   ├── routes/productRoutes.ts
│   └── middleware/errorHandler.ts
├── docs/openapi.yaml
└── prompts.md
```

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Esquema de BD correcto | 20 |
| CRUD funcional | 40 |
| Validación y errores | 20 |
| Documentación | 20 |
| **Total** | **100** |

---

*Ejercicio Módulo 02 - Backend con IA*
