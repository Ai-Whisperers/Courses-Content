# Herramientas - Desarrollo de Software
## FPUNA Verano 2026

Stack tecnológico completo para el track de Software Development.

---

## Core Stack

### Lenguaje y Runtime

| Herramienta | Versión | Propósito | Instalación |
|-------------|---------|-----------|-------------|
| **Node.js** | 18.x+ | JavaScript runtime | [nodejs.org](https://nodejs.org/) |
| **TypeScript** | 5.x | Tipado estático | `npm install -g typescript` |
| **npm/pnpm** | Latest | Package manager | Incluido con Node.js |

### Framework Backend

| Herramienta | Versión | Propósito | Documentación |
|-------------|---------|-----------|---------------|
| **NestJS** | 10.x | Framework backend | [docs.nestjs.com](https://docs.nestjs.com/) |
| **Express** | 4.x | HTTP server (bajo NestJS) | [expressjs.com](https://expressjs.com/) |
| **TypeORM** | 0.3.x | ORM para base de datos | [typeorm.io](https://typeorm.io/) |

### Bases de Datos

| Herramienta | Versión | Propósito | Puerto Default |
|-------------|---------|-----------|----------------|
| **PostgreSQL** | 15.x | Base de datos relacional | 5432 |
| **Redis** | 7.x | Cache y sesiones | 6379 |
| **MongoDB** | 6.x | Base de datos NoSQL (opcional) | 27017 |

---

## DevOps y Containers

### Docker

| Herramienta | Propósito | Instalación |
|-------------|-----------|-------------|
| **Docker Desktop** | Containers locales | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) |
| **Docker Compose** | Orquestación local | Incluido en Docker Desktop |

### CI/CD

| Herramienta | Propósito | Documentación |
|-------------|-----------|---------------|
| **GitHub Actions** | CI/CD pipelines | [docs.github.com/actions](https://docs.github.com/en/actions) |
| **SonarQube** | Code quality | [sonarqube.org](https://www.sonarsource.com/products/sonarqube/) |

---

## Testing

| Herramienta | Propósito | Instalación |
|-------------|-----------|-------------|
| **Jest** | Unit testing | `npm install --save-dev jest @types/jest ts-jest` |
| **Supertest** | API testing | `npm install --save-dev supertest @types/supertest` |
| **Testcontainers** | Integration tests | `npm install --save-dev testcontainers` |

### Configuración Jest (jest.config.js)

```javascript
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
```

---

## Desarrollo con IA

### OpenCode

| Herramienta | Propósito | Documentación |
|-------------|-----------|---------------|
| **OpenCode CLI** | AI coding assistant | Configurado en Semana 1 |
| **Oh My OpenCode** | Plugins y extensiones | Configurado en Semana 1 |

### MCPs Recomendados

| MCP | Propósito |
|-----|-----------|
| **filesystem** | Operaciones de archivos |
| **postgres** | Queries a PostgreSQL |
| **docker** | Gestión de containers |
| **github** | Operaciones Git/GitHub |

---

## IDE y Extensiones

### VS Code

| Extensión | Propósito |
|-----------|-----------|
| **ESLint** | Linting JavaScript/TypeScript |
| **Prettier** | Formateo de código |
| **Docker** | Gestión de containers |
| **GitLens** | Git superpowers |
| **Thunder Client** | API testing |
| **PostgreSQL** | Query runner |
| **Jest Runner** | Ejecutar tests desde IDE |

### Configuración VS Code (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

---

## API Tools

| Herramienta | Propósito | Tipo |
|-------------|-----------|------|
| **Postman** | API testing GUI | Desktop app |
| **Thunder Client** | API testing en VS Code | Extension |
| **Swagger UI** | API documentation | Web-based |
| **curl** | API testing CLI | Command line |

---

## Instalación Rápida

### 1. Prerrequisitos

```bash
# Verificar Node.js
node --version  # Debe ser 18.x+

# Verificar npm
npm --version

# Verificar Docker
docker --version
docker-compose --version
```

### 2. NestJS CLI

```bash
npm install -g @nestjs/cli
nest --version
```

### 3. Crear Proyecto

```bash
nest new mi-proyecto
cd mi-proyecto
npm run start:dev
```

### 4. Agregar Base de Datos

```bash
# Instalar TypeORM y PostgreSQL
npm install @nestjs/typeorm typeorm pg

# O con Prisma (alternativa)
npm install @prisma/client
npx prisma init
```

---

## Recursos Online

### Documentación Oficial

- **NestJS**: [docs.nestjs.com](https://docs.nestjs.com/)
- **TypeScript**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **TypeORM**: [typeorm.io](https://typeorm.io/)
- **PostgreSQL**: [postgresql.org/docs](https://www.postgresql.org/docs/)
- **Docker**: [docs.docker.com](https://docs.docker.com/)

### Tutoriales Recomendados

- **NestJS Course** (Fireship): 100 segundos de NestJS
- **TypeORM Tutorial** (Ben Awad): Setup completo
- **Docker para Devs** (TechWorld with Nana): Fundamentos

### Comunidades

- **Stack Overflow**: [stackoverflow.com/questions/tagged/nestjs](https://stackoverflow.com/questions/tagged/nestjs)
- **Discord NestJS**: [discord.gg/nestjs](https://discord.com/invite/nestjs)
- **Reddit**: [r/node](https://www.reddit.com/r/node/)

---

## Troubleshooting

### Problema: "Port already in use"

```bash
# Mac/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problema: Docker no conecta a PostgreSQL

```bash
# Verificar que el container está corriendo
docker ps

# Ver logs del container
docker logs postgres-container

# Reiniciar container
docker-compose restart postgres
```

### Problema: TypeORM no encuentra entidades

```typescript
// app.module.ts - verificar configuración
TypeOrmModule.forRoot({
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // O con autoLoadEntities
  autoLoadEntities: true,
})
```

---

*Track 01 - Software Development - FPUNA Verano 2026*
