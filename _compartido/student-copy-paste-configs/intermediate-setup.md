# CLAUDE.md Avanzado - Setup Desarrollo Completo

Configuración avanzada para estudiantes con MCP servers y hooks automáticos. Incluye patterns professional development.

## Arquitectura Sistema
```
frontend/          # React/TypeScript SPA
├── components/    # Atomic design pattern
├── features/      # Domain-driven structure
├── hooks/         # Custom hooks & state
├── services/      # API clients & services
├── utils/         # Pure utility functions
├── types/         # TypeScript definitions
└── contexts/      # React contexts

backend/           # Node.js/Express REST API
├── routes/        # Express route handlers
├── controllers/   # Business logic layer
├── models/        # Database models/schemas
├── middleware/    # Auth, validation, cors
├── services/      # Business services
├── utils/         # Server utilities
└── tests/         # Backend tests

database/          # PostgreSQL + migration system
├── migrations/    # Schema migration files
├── seeds/         # Sample data
└── schemas/       # SQL schema definitions
```

## MCP Servers Integración
Este setup incluye MCP servers por defecto (configurar claves API requeridas):

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["serve", "--allowed-directories", "."]
    },
    "git": {
      "command": "mcp-server-git",
      "args": ["--repository", "."]
    },
    "http": {
      "command": "mcp-server-http",
      "args": ["serve"]
    },
    "brave-search": {
      "command": "mcp-server-brave-search"
    }
  }
}
```

## Commands Personalizados

### Testing & Quality
```
/test               # Run full test suite
/test:watch         # Run tests in watch mode
/lint               # Run ESLint
/format             # Format with Prettier
/typecheck          # TypeScript type checking
```

### Development Workflow
```
/build              # Full build process
/dev                # Start development servers
/deploy:staging     # Deploy to staging
/deploy:prod        # Deploy to production (with confirmation)
```

### Code Management
```
/review             # Code review checklist
/refactor           # Refactoring suggestions
/docs:update        # Update documentation
/cleanup            # Remove unused imports/files
```

## Hooks Automáticos

### Pre-commit Quality Gates
```javascript
// Ejecutado antes cada commit
- Linting (ESLint)
- Type checking
- Unit tests
- Formatting check
- Security scan básico
```

### Post-commit Actions
```javascript
// Ejecutado después cada commit
- Build check (en background)
- Update documentation (si README modificado)
- Notify team (si feature importante)
```

### Error Recovery
```javascript
// En caso de errores
- Revert automático si build falla
- Log detallado del error
- Sugerencias de fix
- Escalada a developer si persistente
```

## CI/CD Pipeline
```
Git Push → Lint + Test + Build → Deploy Staging → Manual Approval → Deploy Prod
```

## Testing Estrategia
```
Unit Tests (Jest) → Integration Tests (Supertest) → E2E Tests (Cypress)
```

Cobertura objetivo: 80% branches, 90% statements

## Observabilidad (Monitoring)
- Error tracking: Sentry
- Performance: Web Vitals + Lighthouse
- Logs: Winston + CloudWatch
- Alerts: Slack notifications

## Documentación
Auto-generated APIs con OpenAPI/Swagger
READMEs actualizados automáticamente
Storybook para componentes

## Environments
- **Local**: Hot reload, debug logs, fake data
- **Staging**: Production-like, limited data, full monitoring
- **Prod**: Optimized builds, full security, comprehensive monitoring

---

*Configuração professional derivada de AizenvoltPrime/claude-setup con adaptaciones estudiantiles.*