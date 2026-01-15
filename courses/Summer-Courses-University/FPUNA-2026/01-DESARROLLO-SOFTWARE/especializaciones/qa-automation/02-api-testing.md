# Módulo 02: Testing de APIs con Playwright
## FPUNA 2026 - Track QA Automation

**Duración**: 4 horas  
**Prerrequisitos**: Módulo 01 completado

---

## Descripción General

El testing de APIs es fundamental en aplicaciones modernas. Este módulo te enseñará a automatizar pruebas de APIs REST usando Playwright, validar schemas, implementar contract testing, y testear performance de APIs.

---

## Objetivos de Aprendizaje

Al finalizar este módulo:

1. ✅ Usar Playwright API Testing Context para pruebas de API
2. ✅ Validar schemas JSON con Zod
3. ✅ Implementar contract testing
4. ✅ Testear performance y tiempos de respuesta
5. ✅ Mockear dependencias externas
6. ✅ Crear suites de tests API reutilizables

---

## Contenido del Módulo

Este módulo está dividido en múltiples archivos para profundidad:

### Archivos de Contenido

📄 **01-playwright-api-basics.md**
- APIRequestContext fundamentals
- GET, POST, PUT, DELETE requests
- Headers y authentication
- Query parameters y request bodies

📄 **02-response-validation.md**
- Status code validation
- Response body assertions
- JSON structure validation
- Error response handling

📄 **03-schema-validation.md**
- Schema validation con Zod
- TypeScript type generation
- Schema evolution y versioning
- Custom validators

📄 **04-contract-testing.md**
- Consumer-driven contract testing
- API contracts y specifications
- OpenAPI/Swagger integration
- Contract versioning

📄 **05-performance-testing.md**
- Response time assertions
- Load testing basics
- Concurrent requests
- Bottleneck detection

📄 **06-api-mocking.md**
- Mocking external APIs
- Test isolation strategies
- Mock data management
- Conditional mocking

📄 **07-best-practices.md**
- API test organization
- Reusable test fixtures
- Environment management
- CI/CD integration

---

## Flujo de Estudio Recomendado

```
Día 1 (2 horas):
├─ 01-playwright-api-basics.md      (45 min)
├─ 02-response-validation.md        (45 min)
└─ 03-schema-validation.md          (30 min)

Día 2 (2 horas):
├─ 04-contract-testing.md           (40 min)
├─ 05-performance-testing.md        (40 min)
├─ 06-api-mocking.md                (20 min)
└─ 07-best-practices.md             (20 min)
```

---

## Proyecto Práctico

A lo largo del módulo trabajarás con una **API REST de E-commerce**:

**Endpoints a testear**:
- `GET /api/products` - Lista de productos
- `GET /api/products/:id` - Detalle de producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto
- `GET /api/orders` - Lista de órdenes
- `POST /api/orders` - Crear orden

---

## Tecnologías y Herramientas

- **Playwright** - API testing framework
- **Zod** - Schema validation library
- **TypeScript** - Type-safe tests
- **Faker.js** - Test data generation
- **OpenAPI** - API specification

---

## Recursos Adicionales

- 📚 [Playwright API Testing Docs](https://playwright.dev/documentacion/api-testing)
- 📚 [Zod Documentation](https://zod.dev)
- 🎥 Videos de referencia (próximamente)

---

## Navegación

**Siguiente**: [01-playwright-api-basics.md](./content/01-playwright-api-basics.md)

---

*Módulo 02 - API Testing - FPUNA 2026*
