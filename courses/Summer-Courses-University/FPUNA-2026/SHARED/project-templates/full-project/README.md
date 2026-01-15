# Plantilla de Proyecto Completo

## Estructura Profesional para Aplicaciones Web Full Stack

Esta plantilla proporciona una arquitectura completa para proyectos profesionales.

---

## Estructura

```
full-project/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
├── backend/                   # Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
├── shared/                    # Código compartido
│   └── types/
│
├── docker-compose.yml         # Docker setup
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # GitHub Actions
├── docs/                     # Documentación
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
└── README.md                 # Este archivo
```

---

## Tecnologías Incluidas

### Frontend
- React 18+
- TypeScript
- Styled Components
- React Router
- React Query

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- Jest para tests
- JWT Authentication

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD
- ESLint + Prettier
- Husky (Git hooks)

---

## Inicio Rápido

```bash
# 1. Clonar plantilla
cp -r full-project mi-app

# 2. Instalar dependencias
cd mi-app
npm run install:all  # Instala frontend y backend

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Iniciar desarrollo
npm run dev  # Inicia frontend y backend

# 5. Ejecutar tests
npm run test:all
```

---

## Scripts Disponibles

### Desarrollo
```bash
npm run dev              # Inicia ambos servicios
npm run dev:frontend     # Solo frontend
npm run dev:backend      # Solo backend
```

### Testing
```bash
npm test                 # Tests de ambos
npm run test:frontend    # Tests frontend
npm run test:backend     # Tests backend
npm run test:e2e         # Tests E2E
```

### Production
```bash
npm run build            # Build de producción
npm start                # Inicia producción
```

### Docker
```bash
docker-compose up        # Inicia servicios
docker-compose down      # Detiene servicios
```

---

## Características

### ✅ Desarrollo
- Hot reload en frontend y backend
- TypeScript en ambos lados
- Linting y formatting automático
- Tests unitarios y E2E
- Manejo de errores centralizado

### ✅ Seguridad
- Autenticación JWT
- Validación de inputs
- Sanitización de datos
- CORS configurado
- Rate limiting

### ✅ Performance
- Code splitting
- Lazy loading
- Caching
- Optimización de imágenes
- Compresión de responses

### ✅ DevOps
- CI/CD con GitHub Actions
- Docker para desarrollo y producción
- Monitoreo de errores
- Logging estructurado

---

## Estructura de Base de Datos

```prisma
// Ejemplo de schema Prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Deployment

### Opciones Soportadas
- **Vercel** (Frontend)
- **Railway/Render** (Backend)
- **AWS/GCP/Azure** (Con Docker)
- **Heroku**

Ver [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) para guías específicas.

---

## Mejores Prácticas Incluidas

✅ Arquitectura limpia y modular  
✅ Separación de responsabilidades  
✅ Tests comprehensivos  
✅ Documentación completa  
✅ CI/CD configurado  
✅ Manejo de errores robusto  
✅ Logging y monitoreo  
✅ Seguridad by default  

---

**Ideal para**: Proyectos de tesis, aplicaciones profesionales, portfolio

---

*Plantilla FPUNA Summer 2026*
