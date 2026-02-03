# Biblioteca de Prompts - Desarrollo de Software
## FPUNA Verano 2026

Prompts probados para OpenCode en desarrollo de software con NestJS/TypeScript.

---

## Arquitectura y Setup

### Crear Proyecto NestJS

```
Crea un proyecto NestJS para [descripción del sistema].

Requisitos:
- TypeScript estricto
- PostgreSQL con TypeORM
- Estructura modular
- Variables de entorno con @nestjs/config
- Docker Compose para desarrollo
- README con instrucciones de setup

Incluye módulos base: users, auth, health-check
```

### Diseñar Arquitectura de Microservicios

```
Diseña la arquitectura para un sistema de [descripción].

Incluye:
1. Diagrama de servicios (formato Mermaid)
2. Responsabilidades de cada microservicio
3. Comunicación entre servicios (REST/Events/gRPC)
4. Base de datos por servicio
5. API Gateway
6. Consideraciones de escalabilidad

Contexto del negocio: [descripción del dominio]
Usuarios esperados: [cantidad]
```

### Configurar Docker Compose

```
Genera docker-compose.yml para desarrollo con:
- Aplicación NestJS (hot reload)
- PostgreSQL 15
- Redis 7
- pgAdmin (opcional)

Requisitos:
- Volúmenes persistentes para datos
- Network compartida
- Variables de entorno desde .env
- Health checks
```

---

## Generación de Código

### CRUD Completo

```
Crea un módulo NestJS para gestión de [entidad].

Incluye:
- Entity con TypeORM (relaciones si aplica)
- DTOs: Create, Update, Response
- Service con lógica de negocio
- Controller con endpoints REST
- Tests unitarios para service
- Validaciones con class-validator

Campos de la entidad:
[lista de campos con tipos]

Relaciones: [si aplica]
```

### Endpoint Específico

```
Crea endpoint [METHOD] /api/[path] que:

Funcionalidad:
- [descripción de qué hace]

Input:
- [parámetros/body esperados]

Output:
- [estructura de respuesta]

Validaciones:
- [reglas de validación]

Errores posibles:
- 400: [cuándo]
- 404: [cuándo]
- 500: [cuándo]

Incluye test unitario
```

### Servicio con Lógica Compleja

```
Implementa servicio para [funcionalidad].

Requisitos:
- Método principal: [nombre](params): ReturnType
- Debe manejar: [casos edge]
- Logging de operaciones importantes
- Transacciones si modifica múltiples entidades
- Tests con casos: happy path, edge cases, errores

Pseudocódigo de la lógica:
1. [paso 1]
2. [paso 2]
3. [paso 3]
```

---

## Testing

### Test Suite para Service

```
Genera tests unitarios completos para [ServiceName].

Incluye:
- Setup con mocks de dependencias
- Test de cada método público
- Casos: éxito, validación, errores
- Coverage mínimo 80%

Métodos a testear:
- [lista de métodos]

Usa Jest con mocking de repositorios
```

### Test E2E para Controller

```
Crea tests E2E para [ControllerName].

Endpoints a testear:
- GET /api/[resource]
- POST /api/[resource]
- PATCH /api/[resource]/:id
- DELETE /api/[resource]/:id

Incluye:
- Setup de base de datos de test
- Cleanup después de cada test
- Tests de autenticación (si aplica)
- Validación de respuestas
```

### TDD - Test First

```
Aplica TDD para implementar [funcionalidad].

Paso 1: Escribe SOLO los tests primero
- Test de caso exitoso
- Test de validación
- Test de error

Paso 2: Muéstrame los tests para revisar

Paso 3: Después de mi aprobación, implementa el código mínimo para pasar los tests

Funcionalidad: [descripción detallada]
```

---

## Refactoring

### Aplicar Design Pattern

```
Refactoriza este código aplicando el patrón [Strategy/Factory/Observer/etc]:

[pegar código]

Requisitos:
- Mantener funcionalidad actual
- Mejorar extensibilidad
- Reducir acoplamiento
- Agregar tests si no existen
- Explicar por qué este patrón es apropiado
```

### Clean Code

```
Refactoriza este código siguiendo Clean Code:

[pegar código]

Enfócate en:
- Nombres descriptivos
- Funciones pequeñas (máx 20 líneas)
- Single Responsibility
- Eliminar code smells
- Agregar tipos estrictos

Explica cada cambio brevemente
```

### Extraer Responsabilidades

```
Este código hace demasiado. Sepáralo en clases/funciones:

[pegar código]

Principios a aplicar:
- Single Responsibility
- Separation of Concerns
- Dependency Injection

Resultado esperado:
- Clases pequeñas y enfocadas
- Interfaces claras
- Fácil de testear
```

---

## Debugging

### Analizar Error

```
Ayúdame a debuggear este error:

Error:
[pegar error completo]

Código relevante:
[pegar código]

Contexto:
- Cuándo ocurre: [descripción]
- Qué debería hacer: [comportamiento esperado]
- Qué hace: [comportamiento actual]

Proporciona:
1. Causa probable
2. Solución
3. Cómo prevenir en el futuro
```

### Performance Issue

```
Este código es lento. Optimízalo:

[pegar código]

Contexto:
- Volumen de datos: [cantidad]
- Tiempo actual: [ms]
- Tiempo aceptable: [ms]

Sugiere:
1. Dónde está el bottleneck
2. Optimizaciones específicas
3. Trade-offs de cada opción
```

---

## Database

### Diseñar Schema

```
Diseña schema de base de datos para [sistema].

Entidades principales:
- [lista de entidades]

Relaciones:
- [describir relaciones]

Incluye:
- Diagrama ERD (formato Mermaid)
- SQL de creación de tablas
- Índices recomendados
- TypeORM entities
```

### Query Compleja

```
Crea query para obtener [descripción del resultado].

Tablas involucradas:
- [lista de tablas]

Filtros:
- [condiciones]

Resultado esperado:
- [campos y formato]

Preferencia: [QueryBuilder TypeORM / SQL raw]
```

---

## Code Review

### Review de PR

```
Revisa este código como si fueras a aprobar un PR:

[pegar código]

Evalúa:
- Bugs potenciales
- Seguridad
- Performance
- Mantenibilidad
- Tests faltantes
- Adherencia a patrones del proyecto

Formato de respuesta:
- CRÍTICO: [bloqueantes]
- IMPORTANTE: [deberían arreglarse]
- SUGERENCIA: [nice to have]
```

---

## Documentación

### Documentar API

```
Genera documentación Swagger/OpenAPI para:

[pegar controller o endpoints]

Incluye:
- Descripción de cada endpoint
- Parámetros con ejemplos
- Respuestas posibles (200, 400, 404, 500)
- Schemas de request/response
- Tags apropiados
```

### README de Módulo

```
Genera README.md para el módulo [nombre]:

Estructura actual:
[árbol de archivos]

Incluye:
- Descripción del módulo
- Cómo usar (ejemplos)
- API pública
- Dependencias
- Configuración
- Tests
```

---

## Tips de Uso

### Para Mejores Resultados

1. **Sé específico**: Incluye contexto, constraints, preferencias
2. **Divide tareas grandes**: Mejor varios prompts pequeños que uno gigante
3. **Itera**: Refina el output con prompts de seguimiento
4. **Valida**: Siempre revisa y testea el código generado

### Prompts de Seguimiento Útiles

```
# Si el código tiene errores
"Hay un error de tipos en línea X. Corrige manteniendo la misma lógica"

# Si falta algo
"Agrega validación de [campo] y manejo de error si [condición]"

# Si quieres alternativas
"Muéstrame otra forma de implementar esto usando [patrón/librería]"

# Si necesitas explicación
"Explica por qué elegiste [decisión] en lugar de [alternativa]"
```

---

*Track 01 - Software Development - FPUNA Verano 2026*
