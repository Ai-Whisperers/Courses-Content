# SETUP-AI.md - Comandos de IA para Proyectos de Software

## Prompts para Configurar y Desarrollar tu Proyecto

---

## 1. Setup Inicial de Proyecto

### Crear Proyecto Node.js/Express desde Cero

```
Crea un proyecto Node.js con Express desde cero:

Nombre: [NOMBRE]
Tipo: API REST
Base de datos: PostgreSQL con Sequelize

Estructura:
- src/controllers, services, models, routes, middlewares, utils
- tests/unit, integration
- config/

Incluye:
1. package.json con scripts (dev, test, lint, build)
2. ESLint + Prettier configurados
3. Jest para testing
4. dotenv para variables de entorno
5. Estructura de carpetas completa
6. Archivo .env.example
7. .gitignore apropiado
8. README básico
9. CLAUDE.md con instrucciones para IA

Lenguaje: TypeScript
```

### Crear Proyecto Python/FastAPI

```
Crea un proyecto Python con FastAPI desde cero:

Nombre: [NOMBRE]
Tipo: API REST
Base de datos: PostgreSQL con SQLAlchemy

Estructura:
- app/api, core, db, models, schemas, services
- tests/
- alembic/ (migraciones)

Incluye:
1. pyproject.toml o requirements.txt
2. Black + isort + flake8 configurados
3. pytest para testing
4. python-dotenv
5. Estructura de carpetas completa
6. .env.example
7. .gitignore
8. README.md
9. CLAUDE.md
```

---

## 2. Generación de Features

### Crear CRUD Completo

```
Crea un CRUD completo para la entidad "[ENTIDAD]":

Modelo:
- [campo1]: [tipo] [restricciones]
- [campo2]: [tipo] [restricciones]
- [campo3]: [tipo] [restricciones]

Endpoints:
- GET /api/[entidad] - Listar con paginación
- GET /api/[entidad]/:id - Obtener uno
- POST /api/[entidad] - Crear
- PUT /api/[entidad]/:id - Actualizar
- DELETE /api/[entidad]/:id - Eliminar

Incluye:
1. Modelo/Schema
2. Migración de base de datos
3. Service con lógica de negocio
4. Controller/Router
5. Validación de inputs
6. Manejo de errores
7. Tests unitarios para el service
8. Tests de integración para endpoints
```

### Crear Sistema de Autenticación

```
Implementa autenticación JWT para este proyecto:

Funcionalidades:
1. Registro de usuarios
2. Login con email/password
3. Refresh tokens
4. Logout (invalidar token)
5. Middleware de autenticación
6. Roles (user, admin)

Incluye:
- Hash de passwords con bcrypt
- Generación y verificación de JWT
- Middleware authRequired
- Middleware roleRequired
- Manejo de tokens expirados
- Tests para cada funcionalidad
```

### Agregar Upload de Archivos

```
Implementa upload de archivos para este proyecto:

Requisitos:
- Aceptar imágenes (jpg, png, gif)
- Límite de 5MB por archivo
- Guardar en [local/S3/Cloudinary]
- Generar thumbnails (opcional)

Incluye:
1. Middleware de multer/upload
2. Validación de tipo y tamaño
3. Servicio de storage
4. Endpoint POST /api/upload
5. Endpoint DELETE /api/files/:id
6. Tests
```

---

## 3. Testing

### Generar Suite de Tests Completa

```
Genera tests completos para [módulo/archivo]:

Tests unitarios:
- Cada función pública
- Casos de éxito (happy path)
- Casos de error
- Edge cases

Tests de integración (si aplica):
- Endpoints relacionados
- Flujos completos

Mock de:
- Base de datos
- Servicios externos
- Funciones de utilidad

Usa: [Jest/pytest/vitest]
Target coverage: 80%
```

### Generar Tests E2E

```
Genera tests end-to-end para el flujo de [FLUJO]:

Pasos del flujo:
1. [paso 1]
2. [paso 2]
3. [paso 3]

Usar: [Playwright/Cypress/Supertest]

Incluye:
- Setup de base de datos de test
- Datos de prueba (fixtures)
- Cleanup después de cada test
- Screenshots en fallos (si es UI)
```

---

## 4. Refactoring y Mejoras

### Refactorizar a Clean Architecture

```
Refactoriza [módulo] siguiendo Clean Architecture:

Capas:
1. Entities (modelos de dominio)
2. Use Cases (lógica de negocio)
3. Interface Adapters (controllers, presenters)
4. Frameworks (DB, web framework)

Principios:
- Dependency Inversion
- Single Responsibility
- Interface Segregation

Mantén todos los tests pasando.
```

### Optimizar Performance

```
Analiza y optimiza la performance de [módulo/endpoint]:

Revisar:
1. Queries N+1 a la base de datos
2. Operaciones bloqueantes
3. Falta de índices
4. Código síncrono que debería ser async
5. Memory leaks potenciales

Para cada problema:
- Explica el issue
- Propón la solución
- Implementa el fix
- Mide la mejora (antes/después)
```

### Agregar Validación Robusta

```
Agrega validación completa a [módulo/endpoints]:

Usar: [Joi/Zod/class-validator]

Para cada endpoint:
1. Validar body, params, query
2. Sanitizar inputs
3. Mensajes de error claros en español
4. Tipos TypeScript actualizados

Incluye:
- Schema de validación
- Middleware de validación
- Tests para casos inválidos
```

---

## 5. Documentación

### Generar Documentación de API

```
Genera documentación completa de la API:

Formato: OpenAPI 3.0 / Swagger

Para cada endpoint:
- Descripción
- Parámetros con tipos
- Request body con ejemplos
- Responses (200, 400, 401, 404, 500)
- Ejemplos de uso

Incluye:
- Configuración de Swagger UI
- Archivo openapi.yaml
- Autenticación documentada
```

### Crear Guía de Contribución

```
Crea CONTRIBUTING.md para este proyecto:

Incluye:
1. Cómo configurar el entorno de desarrollo
2. Convenciones de código
3. Proceso de pull requests
4. Cómo escribir commits
5. Cómo escribir tests
6. Revisión de código (checklist)
7. Proceso de release
```

---

## 6. DevOps y CI/CD

### Configurar Docker

```
Dockeriza este proyecto:

Crear:
1. Dockerfile optimizado (multi-stage build)
2. docker-compose.yml con:
   - App
   - Base de datos
   - Redis (si usa)
3. docker-compose.dev.yml para desarrollo
4. .dockerignore

Incluye:
- Hot-reload en desarrollo
- Volúmenes para persistencia
- Variables de entorno
- Health checks
```

### Configurar GitHub Actions

```
Crea pipeline de CI/CD con GitHub Actions:

Jobs:
1. lint - Verificar estilo de código
2. test - Ejecutar tests con coverage
3. build - Compilar/verificar build
4. deploy-staging - Deploy a staging (push a develop)
5. deploy-prod - Deploy a producción (push a main, manual)

Incluye:
- Caching de dependencias
- Matrix para múltiples versiones de Node
- Secrets para credenciales
- Notificación de fallos
```

---

## 7. Seguridad

### Auditoría de Seguridad

```
Realiza una auditoría de seguridad de este proyecto:

Revisar:
1. Inyección SQL
2. XSS
3. CSRF
4. Autenticación/Autorización
5. Exposición de datos sensibles
6. Dependencias vulnerables
7. Headers de seguridad
8. Rate limiting
9. Validación de inputs

Para cada vulnerabilidad encontrada:
- Severidad (alta/media/baja)
- Descripción del riesgo
- Solución propuesta
- Implementación del fix
```

### Implementar Rate Limiting

```
Implementa rate limiting para esta API:

Configuración:
- 100 requests por minuto para usuarios autenticados
- 20 requests por minuto para usuarios anónimos
- 5 requests por minuto para login (por IP)

Usar: [express-rate-limit/slowapi]

Incluye:
- Middleware configurable
- Headers de rate limit en responses
- Mensaje de error personalizado
- Tests
```

---

## 8. Integración con Servicios Externos

### Integrar Servicio de Email

```
Integra envío de emails en el proyecto:

Proveedor: [SendGrid/Mailgun/SES]

Funcionalidades:
1. Envío de email transaccional
2. Templates HTML
3. Emails con adjuntos
4. Cola de emails (opcional)

Emails a implementar:
- Bienvenida (registro)
- Recuperación de contraseña
- Notificaciones

Incluye:
- Service de email
- Templates
- Tests con mocks
```

### Integrar Pasarela de Pagos

```
Integra [Stripe/PayPal/MercadoPago] para pagos:

Funcionalidades:
1. Crear checkout session
2. Webhooks para eventos de pago
3. Refunds
4. Historial de pagos

Incluye:
- Service de pagos
- Webhooks handler
- Modelo de transacciones
- Tests con mocks
- Documentación de setup
```

---

## 9. Base de Datos

### Crear Migración

```
Crea una migración para:

Cambio: [descripción del cambio]

Por ejemplo:
- Agregar columna X a tabla Y
- Crear tabla Z
- Agregar índice en columna W
- Modificar tipo de columna

Incluye:
- Migración up
- Migración down (rollback)
- Script de seed si es necesario
```

### Optimizar Queries

```
Optimiza las queries de [módulo]:

Problemas comunes a buscar:
1. SELECT * en lugar de campos específicos
2. N+1 queries
3. JOINs innecesarios
4. Falta de índices
5. Queries sin paginación

Para cada query:
- Query actual
- Problema identificado
- Query optimizada
- Índices necesarios
```

---

## 10. Monitoreo y Logging

### Configurar Logging

```
Configura logging profesional para este proyecto:

Usar: [Winston/Pino/Python logging]

Niveles:
- error: Errores que requieren atención
- warn: Situaciones anormales
- info: Eventos importantes
- debug: Información de debugging

Incluye:
- Logger configurado
- Formato JSON para producción
- Rotación de logs
- Context (request ID, user ID)
- Middleware de logging de requests
```

### Agregar Health Checks

```
Implementa endpoints de health check:

Endpoints:
- GET /health - Status básico
- GET /health/ready - Readiness (DB conectada, etc.)
- GET /health/live - Liveness

Checks:
- Conexión a base de datos
- Conexión a Redis (si usa)
- Servicios externos críticos
- Memoria disponible

Formato de response estándar.
```

---

*SETUP-AI.md para Desarrollo de Software - FPUNA 2026*
