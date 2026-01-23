# Sistema de Skills en OpenCode

## ¿Qué son los Skills?

**Skills** son plantillas predefinidas de comandos y flujos de trabajo que automatizan tareas comunes en OpenCode. Son como "recetas" que encapsulan mejores prácticas para tareas específicas.

**Tiempo estimado**: 20-30 minutos  
**Nivel**: Intermedio  
**Requisitos**: OpenCode y MCPs configurados

---

## Conceptos Clave

### Skill vs MCP vs Prompt

| Concepto | Descripción | Ejemplo |
|----------|-------------|---------|
| **MCP** | Conecta OpenCode con herramientas externas | Conectar a PostgreSQL |
| **Skill** | Plantilla de flujo de trabajo | "Crear API REST con tests" |
| **Prompt** | Comando individual | "Genera un endpoint GET /users" |

**Un Skill**:
- Combina múltiples prompts
- Usa MCPs si es necesario
- Sigue un flujo estructurado
- Produce resultados consistentes

---

## Tipos de Skills

### 1. Skills de Desarrollo

**Crear Proyecto**:
- `init-nodejs-project` - Proyecto Node.js completo
- `init-react-app` - Aplicación React con estructura
- `init-python-project` - Proyecto Python con virtual env

**Testing**:
- `generate-unit-tests` - Tests unitarios automáticos
- `generate-e2e-tests` - Tests end-to-end
- `add-test-coverage` - Configurar coverage

### 2. Skills de Documentación

- `generate-readme` - README.md completo
- `generate-api-docs` - Documentación de API
- `generate-jsdocs` - JSDoc comments
- `create-changelog` - CHANGELOG.md desde commits

### 3. Skills de CI/CD

- `setup-github-actions` - GitHub Actions workflow
- `setup-docker` - Dockerfile y docker-compose
- `setup-deployment` - Deploy config (Heroku, Vercel, etc.)

### 4. Skills de Refactoring

- `refactor-to-typescript` - Migrar JS a TS
- `add-error-handling` - Agregar try/catch consistency
- `optimize-performance` - Optimizaciones de código

---

## Estructura de un Skill

```yaml
name: create-rest-api
description: Crea una API REST completa con Express
version: 1.0.0

inputs:
  - name: resource_name
    description: Nombre del recurso (ej: users, products)
    required: true
  
steps:
  1. Crear estructura de carpetas
  2. Generar routes/
  3. Generar controllers/
  4. Generar models/
  5. Generar tests/
  6. Generar documentación

outputs:
  - API REST funcionante
  - Tests unitarios
  - Documentación OpenAPI
```

---

## Guías Detalladas

### 📖 [Encontrar Skills](./finding-skills.md)
Descubre skills disponibles para tus necesidades.

### 📖 [Instalar Skills](./installing-skills.md)
Guía paso a paso para instalar y configurar skills.

### 📖 [Crear Skills](./creating-skills.md)
Aprende a crear tus propios skills personalizados.

### 📖 [Ejemplos de Skills](./examples.md)
Colección de skills útiles listos para usar.

---

## Uso Básico de Skills

### Listar Skills Disponibles

```bash
claude --list-skills
# O
claude skills list
```

### Usar un Skill

```bash
claude skill use create-rest-api --resource=products
```

OpenCode:
1. Solicitará inputs necesarios
2. Ejecutará los pasos del skill
3. Mostrará progreso
4. Generará todos los archivos

---

## Skills Recomendados para FPUNA

### Para Todos los Estudiantes

1. **init-project** - Inicializar cualquier tipo de proyecto
2. **generate-tests** - Crear tests automáticamente
3. **generate-docs** - Documentación automática
4. **setup-git** - Configurar Git con mejores prácticas

### Por Disciplina

**Ingeniería de Software**:
- `create-rest-api` - APIs REST
- `setup-database-models` - Modelos de BD
- `create-microservice` - Microservicio completo

**Electrónica/Mecatrónica**:
- `init-arduino-project` - Proyecto Arduino
- `create-iot-gateway` - Gateway IoT
- `setup-mqtt-client` - Cliente MQTT

**Investigación**:
- `init-research-project` - Proyecto de investigación
- `generate-analysis-notebook` - Jupyter notebook
- `create-latex-paper` - Paper en LaTeX

**Marketing**:
- `setup-analytics` - Google Analytics
- `create-landing-page` - Landing page
- `generate-social-content` - Contenido para redes

---

## Crear tu Primer Skill Simple

### Ejemplo: Skill "Crear README"

**Archivo**: `~/.opencode/skills/generate-readme.skill`

```yaml
name: generate-readme
description: Genera README.md para proyecto actual
version: 1.0.0

steps:
  - prompt: |
      Analiza la estructura del proyecto actual.
      Genera un README.md completo con:
      - Título del proyecto
      - Descripción
      - Instalación
      - Uso
      - Contribución
      - Licencia
      Usa el archivo package.json si existe.
    
  - save: README.md
```

**Usar**:
```bash
claude skill use generate-readme
```

---

## Mejores Prácticas

### ✅ HACER

1. **Nombrar skills descriptivamente**: `create-rest-api` no `api`
2. **Documentar inputs**: Qué se necesita y por qué
3. **Incluir validaciones**: Verificar que inputs son válidos
4. **Hacer skills modulares**: Un skill, una responsabilidad
5. **Probar antes de compartir**: Ejecutar en diferentes proyectos

### ❌ NO HACER

1. **Skills muy genéricos**: "hacer-todo" no funciona bien
2. **Sin documentación**: Otros no sabrán cómo usarlo
3. **Hardcodear valores**: Usar inputs configurables
4. **Ignorar errores**: Manejar casos de falla

---

## Skills vs Scripts

| Aspecto | Skill | Script Bash/Python |
|---------|-------|-------------------|
| **Lenguaje** | YAML + prompts | Bash/Python/etc |
| **IA Integration** | Built-in | Manual |
| **Portabilidad** | Alta | Depende del SO |
| **Complejidad** | Simple | Puede ser compleja |
| **Mejor para** | Tareas con IA | Tareas deterministas |

**Cuándo usar cada uno**:
- **Skill**: Generar código, documentación, refactoring
- **Script**: Builds, deploys, tareas del sistema

---

## Repositorio de Skills

### Skills Oficiales

**GitHub**: https://github.com/anthropics/claude-skills

Categorías:
- Development
- Testing
- Documentation
- CI/CD
- Deployment
- Refactoring

### Skills de la Comunidad

**Awesome Claude Skills**: https://github.com/awesome-claude-skills

Contribuciones de usuarios verificadas.

---

## Compartir Skills

### Publicar en GitHub

```bash
# 1. Crear repo
mkdir my-claude-skills
cd my-claude-skills
git init

# 2. Agregar skills
cp ~/.opencode/skills/mi-skill.skill ./

# 3. Crear README
echo "# Mis Claude Skills" > README.md

# 4. Publicar
git add .
git commit -m "Add skills"
git push origin main
```

### Compartir con Compañeros

```bash
# Exportar skill
claude skill export generate-readme > generate-readme.skill

# Importar skill (otro estudiante)
claude skill import generate-readme.skill
```

---

## Casos de Uso Reales

### Ejemplo 1: Proyecto de Clase Automatizado

**Situación**: Cada semana necesitas crear un proyecto nuevo con la misma estructura.

**Sin Skill**: 30 minutos configurando cada vez.

**Con Skill**:
```bash
claude skill use fpuna-project-template --nombre="Tarea-Semana-3"
```

**Resultado**: Proyecto completo en 2 minutos.

---

### Ejemplo 2: Documentación Automática

**Situación**: Terminaste un proyecto y necesitas documentarlo.

**Con Skill**:
```bash
claude skill use generate-complete-docs
```

Genera:
- README.md
- API documentation
- JSDoc comments
- Usage examples
- CONTRIBUTING.md

---

### Ejemplo 3: Migración de Tecnología

**Situación**: Necesitas migrar proyecto de JavaScript a TypeScript.

**Con Skill**:
```bash
claude skill use migrate-to-typescript
```

El skill:
1. Analiza código existente
2. Genera tipos TypeScript
3. Convierte archivos .js a .ts
4. Actualiza configuración
5. Actualiza dependencias

---

## Recursos

### Documentación

- 📖 [Encontrar Skills](./finding-skills.md)
- 📖 [Instalar Skills](./installing-skills.md)
- 📖 [Crear Skills](./creating-skills.md)
- 📖 [Ejemplos](./examples.md)

### Comunidad

- **Discord**: #claude-skills
- **GitHub**: github.com/anthropics/claude-skills
- **FPUNA Slack**: #fpuna-skills

---

## Próximos Pasos

1. 📖 Aprende sobre: [Hooks y Rules](../hooks-rules/README.md)
2. 📖 Explora: [Plantillas de Proyecto](../project-templates/README.md)
3. 📖 Practica con: [Módulo 02 - Configuration Mastery](../../00-FUNDAMENTOS-PRINCIPALES/modules/02-configuration-mastery/README.md)

---

## Checklist de Skills

- [ ] Entiendo qué son los skills
- [ ] Exploré skills disponibles
- [ ] Instalé al menos 3 skills útiles
- [ ] Usé un skill en un proyecto
- [ ] Creé mi propio skill simple
- [ ] Compartí un skill con compañeros

---

**¡Los Skills multiplican tu productividad con OpenCode!** 🚀

---

*Guía creada para FPUNA Summer 2026*  
*Última actualización: Enero 2026*
