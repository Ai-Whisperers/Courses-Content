# Ejemplos de Skills Útiles

## Skills de Desarrollo

### 1. Crear API REST

```yaml
name: create-rest-api
description: API REST completa con Express y pruebas

inputs:
  - name: resource
    description: Nombre del recurso (ej: users, products)
    required: true

steps:
  - prompt: |
      Crear API REST para ${resource} con:
      - Express server
      - Routes: GET, POST, PUT, DELETE
      - Controllers con lógica de negocio
      - Models (Mongoose o Sequelize)
      - Validación de inputs
      - Tests con Jest
      - Documentación OpenAPI
```

**Uso**:
```bash
claude skill use create-rest-api --resource=products
```

---

### 2. Setup Base de Datos

```yaml
name: setup-database
description: Configuración de base de datos con Prisma

inputs:
  - name: db_type
    description: Tipo de BD (postgres, mysql, mongodb)
    default: postgres

steps:
  - prompt: |
      Configurar ${db_type} con Prisma:
      - Instalar dependencias
      - Crear schema.prisma
      - Configurar conexión
      - Generar client
      - Crear migraciones iniciales
```

---

### 3. Agregar Autenticación

```yaml
name: add-authentication
description: Sistema de autenticación JWT

steps:
  - prompt: |
      Implementar autenticación con JWT:
      - Registro de usuarios
      - Login/logout
      - Middleware de autenticación
      - Refresh tokens
      - Password hashing con bcrypt
      - Tests de autenticación
```

---

## Skills de Testing

### 4. Generar Tests Unitarios

```yaml
name: generate-unit-tests
description: Tests unitarios para código existente

inputs:
  - name: file_path
    description: Archivo a testear
    required: true

steps:
  - prompt: |
      Para el archivo ${file_path}:
      - Analizar funciones y métodos
      - Generar tests con Jest/Mocha
      - Cubrir casos edge
      - Mocks y spies donde necesario
      - Alcanzar >80% coverage
```

---

## Skills de Documentación

### 5. Generar README Completo

```yaml
name: generate-complete-readme
description: README.md profesional

steps:
  - prompt: |
      Generar README.md con:
      - Banner/logo (si existe)
      - Badges (build, coverage, versión)
      - Descripción del proyecto
      - Features principales
      - Instalación paso a paso
      - Uso con ejemplos
      - API documentation
      - Contributing guidelines
      - Licencia
      - Contacto/soporte
```

---

### 6. Documentación de API

```yaml
name: generate-api-docs
description: Documentación OpenAPI/Swagger

steps:
  - prompt: |
      Generar documentación OpenAPI 3.0:
      - Analizar rutas existentes
      - Documentar endpoints
      - Esquemas de request/response
      - Ejemplos de uso
      - Códigos de error
      - Configurar Swagger UI
```

---

## Skills de CI/CD

### 7. Setup GitHub Actions

```yaml
name: setup-github-actions
description: Workflow de CI/CD

inputs:
  - name: deploy_target
    description: Dónde deployar (heroku, vercel, aws)
    default: vercel

steps:
  - prompt: |
      Crear .github/workflows/ci-cd.yml:
      - Trigger: push a main
      - Jobs:
        * Lint y format check
        * Tests unitarios
        * Tests E2E
        * Build
        * Deploy a ${deploy_target}
      - Notificaciones
```

---

### 8. Configurar Docker

```yaml
name: setup-docker
description: Dockerizar aplicación

steps:
  - prompt: |
      Crear configuración Docker:
      - Dockerfile optimizado multi-stage
      - docker-compose.yml
      - .dockerignore
      - Scripts de build/run
      - Documentación de comandos
```

---

## Skills de Refactoring

### 9. Migrar a TypeScript

```yaml
name: migrate-to-typescript
description: Convertir proyecto JS a TS

steps:
  - prompt: |
      Migrar a TypeScript:
      - Instalar dependencias TS
      - Crear tsconfig.json
      - Renombrar archivos .js a .ts
      - Agregar tipos a funciones
      - Configurar build
      - Actualizar scripts npm
```

---

### 10. Optimizar Performance

```yaml
name: optimize-performance
description: Optimizaciones de código

steps:
  - prompt: |
      Optimizar código:
      - Identificar cuellos de botella
      - Implementar caching
      - Optimizar queries de BD
      - Code splitting
      - Lazy loading
      - Comprimir assets
      - Documentar mejoras
```

---

## Skills de Proyecto

### 11. Proyecto Full Stack

```yaml
name: create-fullstack-app
description: App completa frontend + backend

inputs:
  - name: app_name
    required: true
  - name: features
    description: Features separadas por comas
    required: true

steps:
  - prompt: |
      Crear ${app_name} con:
      
      Backend (Node.js + Express):
      - API REST
      - Base de datos
      - Autenticación
      
      Frontend (React):
      - Componentes UI
      - State management
      - Routing
      
      Features: ${features}
      
      Incluir:
      - Tests
      - Docker
      - CI/CD
      - Documentación
```

---

## Skills Específicos de FPUNA

### 12. Proyecto de Tarea

```yaml
name: fpuna-tarea-template
description: Template para tareas de FPUNA

inputs:
  - name: materia
    required: true
  - name: numero_tarea
    required: true

steps:
  - prompt: |
      Crear proyecto para ${materia} - Tarea ${numero_tarea}:
      - README.md con encabezado FPUNA
      - Estructura de carpetas
      - .gitignore
      - Archivo principal con comentarios
      - Tests básicos
      - Documentación de entrega
```

---

## Cómo Usar Estos Ejemplos

1. **Copiar el YAML** a `~/.opencode/skills/nombre-skill.yaml`
2. **Instalar**: `claude skill install ./nombre-skill.yaml`
3. **Usar**: `claude skill use nombre-skill --input=valor`

---

## Personalizar un Skill

```bash
# 1. Copiar skill existente
cp ~/.opencode/skills/create-rest-api.yaml ./mi-api.yaml

# 2. Editar según necesidades
nano mi-api.yaml

# 3. Instalar versión personalizada
claude skill install ./mi-api.yaml
```

---

**Ver también**:
- 📖 [Crear Skills](./creating-skills.md)
- 📖 [Instalar Skills](./installing-skills.md)
- 📖 [Guía Principal](./README.md)

---

*Ejemplos para FPUNA Summer 2026*
