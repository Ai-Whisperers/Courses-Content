# CLAUDE.md - Proyecto de Desarrollo de Software

## Copia este archivo a la raíz de tu proyecto

---

# Proyecto: [NOMBRE DE TU APLICACIÓN]

## Descripción
[Aplicación web/móvil/API que hace X para usuarios Y]

## Stack Tecnológico

### Frontend (si aplica)
- **Framework:** [React/Vue/Angular/Next.js]
- **Estilos:** [Tailwind/CSS Modules/Styled Components]
- **Estado:** [Redux/Zustand/Context API]

### Backend
- **Runtime:** [Node.js/Python/Go]
- **Framework:** [Express/FastAPI/Gin]
- **ORM:** [Sequelize/Prisma/SQLAlchemy]

### Base de Datos
- **Principal:** [PostgreSQL/MySQL/MongoDB]
- **Cache:** [Redis] (si aplica)

### Infraestructura
- **Hosting:** [Vercel/Railway/AWS]
- **CI/CD:** [GitHub Actions]
- **Containers:** [Docker] (si aplica)

## Estructura del Proyecto

```
proyecto/
├── src/
│   ├── controllers/     # Lógica de endpoints
│   ├── services/        # Lógica de negocio
│   ├── models/          # Modelos de datos
│   ├── middlewares/     # Middlewares
│   ├── utils/           # Utilidades
│   ├── config/          # Configuración
│   └── routes/          # Definición de rutas
├── tests/
│   ├── unit/            # Tests unitarios
│   ├── integration/     # Tests de integración
│   └── e2e/             # Tests end-to-end
├── docs/
├── scripts/             # Scripts de utilidad
├── .env.example
├── docker-compose.yml
└── README.md
```

## Convenciones de Código

### Nombres
- **Archivos:** kebab-case (`user-controller.js`)
- **Clases:** PascalCase (`UserService`)
- **Funciones:** camelCase (`getUserById`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`)
- **Variables:** camelCase (`userData`)

### Estilo
- ESLint + Prettier configurados
- Máximo 100 caracteres por línea
- Imports ordenados (externos, internos, relativos)
- No usar `var`, solo `const` y `let`

### Patrones
- Repository pattern para acceso a datos
- Service layer para lógica de negocio
- DTOs para transferencia de datos
- Dependency injection donde sea posible

## Comandos

```bash
# Desarrollo
npm run dev              # Servidor con hot-reload

# Testing
npm test                 # Todos los tests
npm run test:unit        # Solo unitarios
npm run test:coverage    # Con reporte de cobertura

# Calidad
npm run lint             # Verificar estilo
npm run lint:fix         # Corregir automáticamente
npm run format           # Formatear código

# Base de datos
npm run db:migrate       # Ejecutar migraciones
npm run db:seed          # Poblar datos de prueba
npm run db:reset         # Reset completo

# Producción
npm run build            # Build para producción
npm start                # Iniciar en producción
```

## Reglas para la IA

### HACER:
- Seguir el patrón existente de controladores/servicios/repositorios
- Usar TypeScript si el proyecto lo usa
- Agregar validación de inputs (Joi/Zod/class-validator)
- Implementar manejo de errores consistente
- Escribir tests para código nuevo (mínimo 80% coverage)
- Usar transacciones en operaciones múltiples de DB
- Loggear errores y eventos importantes
- Documentar endpoints nuevos

### NO HACER:
- No hacer queries SQL directas, usar el ORM
- No hardcodear valores, usar .env
- No exponer errores internos al cliente
- No omitir validación de inputs
- No crear endpoints sin autenticación sin preguntar
- No modificar migraciones existentes, crear nuevas
- No usar `any` en TypeScript sin justificación

## Endpoints Existentes

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/auth/login | Login | No |
| POST | /api/auth/register | Registro | No |
| GET | /api/users | Listar usuarios | Admin |
| GET | /api/users/:id | Obtener usuario | User |
| PUT | /api/users/:id | Actualizar usuario | Owner |
| DELETE | /api/users/:id | Eliminar usuario | Admin |

## Modelos de Datos

### User
```typescript
{
  id: UUID,
  email: string (único),
  password: string (hasheado),
  name: string,
  role: 'user' | 'admin',
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### [Otros modelos...]

## Variables de Entorno

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# External APIs
MAIL_API_KEY=xxx
```

## Decisiones de Arquitectura

### ¿Por qué [decisión]?
[Explicación breve de decisiones técnicas importantes]

### Pendientes / Tech Debt
- [ ] Implementar rate limiting
- [ ] Agregar caching con Redis
- [ ] Mejorar logging

## Contacto

- **Desarrollador:** [Nombre]
- **Repo:** [URL]

---

*CLAUDE.md para Desarrollo de Software - FPUNA 2026*
