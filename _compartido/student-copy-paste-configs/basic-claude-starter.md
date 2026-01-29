# CLAUDE.md Configuración Básica - Inicio Estudiantil

Este archivo es una configuración CLAUDE.md balanceada para estudiantes nuevos en Claude Code. Copiar directamente al raíz proyecto para comenzar rápidamente.

## Sistema Preferencias
- **Lenguajes**: JavaScript/TypeScript, Python, SQL
- **Arquitectura**: React/frontend, Node.js/backend, PostgreSQL/database
- **Estándares**: ESLint estándar, Prettier formatting

## Code Style
- Indentación: 2 espacios
- Comillas: Single (' ') para strings
- Max line length: 80 caracteres
- Semicolons: Omitidos donde posible

## Proyecto Estructura
```
src/
  components/     # Componentes React reutilizables
  pages/          # Páginas principales aplicación
  utils/          # Funciones utilidad
  hooks/          # Custom React hooks
  context/        # Context providers
  types/          # TypeScript type definitions

tests/            # Unit/integration tests
docs/             # Documentación proyecto
```

## Convenciones Naming
- **Componentes**: PascalCase (Button, Navbar)
- **Funciones/Actions**: camelCase (handleSubmit, fetchData)  
- **Files**: kebab-case (user-profile.tsx, api-client.ts)
- **Constants**: SCREAMING_SNAKE_CASE (API_BASE_URL)

## Qué NO Hacer
- NO usar var, let - usar const siempre posible
- NO logs console en producción
- NO harcodear URLs API o secrets
- NO modificar objetos function parameters
- NO usar any types (preferir unknown)

## Testing
- Usar Jest + React Testing Library
- Tests colocados junto archivos component (Button.test.tsx)
- Mínimo tests: happy path + error cases
- Mock APIs externas

## Commit Messages
- Formato: `feat/add-user-auth` o `fix/login-validation`
- Inglés para consistencia
- Primera letra minúscula
- Máximo 50 caracteres

## API Design
- RESTful patterns para simplicity
- JSON responses consistentes
- Error handling con status codes + messages
- Versioning en URL (v1/users)

## Database
- PostgreSQL como primary database
- Migrations para schema changes
- Indexes en foreign keys & frequently queried columns
- Soft deletes para audit trails

## Security Basics
- Input validation en todos endpoints
- Sanitization para SQL injection prevention
- HTTPS obligatorio para producción
- JWT con expiration short

---

*Esta configuración creada de templates estudiantiles probados del repo ccplugins/awesome-claude-code-plugins.*