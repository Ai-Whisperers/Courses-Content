# Biblioteca de Prompts para Desarrollo de Software
## Tier 1 - IA para Desarrollo

---

## Asistentes de Código

### Función con Contexto Completo
```
CONTEXTO: [Stack: Node.js/TypeScript/Prisma]

Implementa función [NOMBRE] que:
- [Requisito 1]
- [Requisito 2]

ENTRADA: [Tipos de parámetros]
SALIDA: [Tipo de retorno]
ERRORES: [Qué errores manejar]

Incluir:
- Tipos TypeScript
- Validación de entrada
- Manejo de errores
- JSDoc completo
```

### Refactoring
```
Refactoriza este código para:
- [Objetivo: mejor rendimiento / legibilidad / etc]

CÓDIGO:
[Pegar código]

MANTENER:
- Misma API externa
- Tests existentes deben pasar

EXPLICAR: Cada cambio y por qué
```

---

## Backend

### Diseño de API
```
Diseña API REST para [SISTEMA]:

RECURSOS: [listar entidades]
OPERACIONES: CRUD + [operaciones especiales]

GENERAR:
1. Lista de endpoints con métodos HTTP
2. Request/Response schemas
3. Códigos de error
4. Consideraciones de autenticación
```

### Esquema de Base de Datos
```
Genera esquema [Prisma/SQL] para:

ENTIDADES:
- [Entidad 1]: [campos principales]
- [Entidad 2]: [campos principales]

RELACIONES:
- [Entidad1 → Entidad2: tipo]

INCLUIR:
- Índices para queries frecuentes
- Campos de auditoría
- Enums donde aplique
```

### Endpoint CRUD
```
Implementa endpoint [MÉTODO] [/ruta]:

STACK: Express, TypeScript, Prisma, Zod

FUNCIONALIDAD:
- [Describir qué hace]

VALIDACIÓN:
- [Campos requeridos]
- [Reglas de negocio]

RESPUESTAS:
- 200/201: [Éxito]
- 400: [Validación]
- 401: [Auth]
- 500: [Error]
```

---

## Frontend

### Componente React
```
Crea componente [NOMBRE]:

PROPS:
- [prop1]: [tipo] - [descripción]
- [prop2]: [tipo] - [descripción]

FUNCIONALIDAD:
- [Qué hace]

ESTILOS: Tailwind CSS
- [Requisitos de diseño]

ESTADOS:
- [Estados internos si hay]

EVENTOS:
- [Callbacks/handlers]
```

### Formulario Completo
```
Genera formulario de [PROPÓSITO]:

CAMPOS:
- [campo1]: [tipo input] - [validación]
- [campo2]: [tipo input] - [validación]

LIBRERÍAS: react-hook-form + zod

REQUISITOS:
- Mensajes de error en español
- Loading state en submit
- Estilos Tailwind
- Accesibilidad (labels, aria)
```

### Hook Personalizado
```
Crea hook use[Nombre]:

PROPÓSITO: [Qué problema resuelve]

PARÁMETROS:
- [param1]: [tipo]

RETORNA:
- [valor1]: [tipo]
- [función1]: [tipo]

DEPENDENCIAS: [libs a usar]

INCLUIR: Manejo de errores y loading
```

---

## Testing

### Tests Unitarios
```
Genera tests Jest para:

FUNCIÓN/COMPONENTE:
[Pegar código]

CASOS A CUBRIR:
- Happy path
- Errores esperados
- Edge cases
- Mocks necesarios

FORMATO:
- describe blocks por categoría
- Nombres descriptivos en español
- Setup/teardown si necesario
```

### Tests de Integración
```
Genera tests de integración para:
[ENDPOINT] [/ruta]

SETUP:
- Base de datos test
- Usuario autenticado (si aplica)

CASOS:
- Request válido → [expected]
- Request inválido → 400
- Sin auth → 401
- Recurso no existe → 404

USAR: supertest + Jest
```

### Code Review
```
Revisa este código:

[PEGAR CÓDIGO]

BUSCAR:
1. Bugs potenciales
2. Vulnerabilidades de seguridad
3. Problemas de rendimiento
4. Code smells
5. Violaciones de mejores prácticas

FORMATO:
Para cada hallazgo:
- Línea afectada
- Problema
- Severidad (crítico/alto/medio/bajo)
- Solución sugerida
```

---

## DevOps

### Dockerfile
```
Genera Dockerfile para [TIPO APP]:

BASE: [Node 20, Python 3.11, etc]

REQUISITOS:
- Multi-stage build
- Imagen Alpine (si posible)
- Usuario non-root
- Healthcheck
- Optimización de capas

COMANDOS DE BUILD:
- [npm ci, pip install, etc]

CMD: [comando de inicio]
```

### GitHub Actions
```
Genera workflow CI/CD:

TRIGGER: [push main, PR, etc]

JOBS:
1. [Lint]
2. [Test]
3. [Build]
4. [Deploy - si aplica]

INCLUIR:
- Cache de dependencias
- Secrets para tokens
- Notificación de fallo
- Artifacts si necesario
```

### Docker Compose
```
Genera docker-compose para desarrollo:

SERVICIOS:
- [app]: [descripción]
- [db]: [PostgreSQL/MySQL/MongoDB]
- [cache]: [Redis si necesario]

INCLUIR:
- Volúmenes persistentes
- Variables de entorno
- Healthchecks
- Network personalizada
```

---

## Debugging

### Error Analysis
```
Mi código falla con:

ERROR:
[Pegar error/stacktrace]

CÓDIGO RELEVANTE:
[Pegar código]

CONTEXTO:
- [Qué intentaba hacer]
- [Cuándo ocurre]
- [Qué ya probé]

NECESITO:
1. Diagnóstico del problema
2. Causa raíz probable
3. Solución paso a paso
```

### Performance Issue
```
Mi aplicación es lenta en:
[Describir dónde]

MÉTRICAS:
- Tiempo actual: [X ms]
- Tiempo esperado: [Y ms]

CÓDIGO:
[Pegar código lento]

ANALIZAR:
1. Cuellos de botella
2. Queries N+1
3. Cálculos innecesarios
4. Oportunidades de cache

SUGERIR: Optimizaciones priorizadas
```

---

## Documentación

### README
```
Genera README.md para proyecto:

PROYECTO: [nombre]
DESCRIPCIÓN: [2-3 oraciones]
STACK: [tecnologías]

SECCIONES:
- Descripción
- Tecnologías
- Instalación
- Uso
- API (si aplica)
- Contribución
- Licencia

INCLUIR: Badges y ejemplos de código
```

### JSDoc/Documentación
```
Genera documentación para:

[PEGAR CÓDIGO]

INCLUIR:
- Descripción de función/clase
- @param con tipos y descripción
- @returns
- @throws
- @example
```

---

## Plantilla Universal

```
# PROMPT PARA: [Tarea]

## CONTEXTO
Stack: [Tecnologías]
Proyecto: [Descripción breve]

## CÓDIGO EXISTENTE (si aplica)
[Pegar código relevante]

## TAREA
[Qué necesitas que haga]

## REQUISITOS
- [Requisito 1]
- [Requisito 2]
- [Requisito 3]

## RESTRICCIONES
- [Qué evitar]
- [Qué mantener]

## FORMATO DE SALIDA
[Cómo quieres recibir la respuesta]
```

---

*Biblioteca de Prompts - Desarrollo de Software*
*Tier 1 - IA para Desarrollo*
