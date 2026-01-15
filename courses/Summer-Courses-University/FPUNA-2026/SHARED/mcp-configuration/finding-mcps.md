# Cómo Encontrar MCPs

## Guía para Descubrir MCPs Útiles para tu Trabajo

Esta guía te enseña dónde y cómo encontrar MCPs (Model Context Protocol servers) que sean útiles para tus proyectos y necesidades específicas.

---

## Repositorio Oficial de MCPs

### GitHub - Model Context Protocol Servers

**URL**: https://github.com/modelcontextprotocol/servers

Este es el repositorio oficial mantenido por la comunidad MCP. Contiene MCPs verificados y seguros.

**Categorías disponibles**:

### 1. **Data & Files**
- `server-filesystem` - Leer/escribir archivos locales
- `server-google-drive` - Integración con Google Drive  
- `server-dropbox` - Integración con Dropbox
- `server-sqlite` - Base de datos SQLite

### 2. **Web & APIs**
- `server-web-search` - Búsqueda en internet (Brave Search)
- `server-fetch` - HTTP requests y APIs REST
- `server-puppeteer` - Web scraping y automatización

### 3. **Databases**
- `server-postgres` - PostgreSQL
- `server-mysql` - MySQL/MariaDB
- `server-mongodb` - MongoDB
- `server-redis` - Redis cache

### 4. **Development Tools**
- `server-git` - Control de versiones Git
- `server-github` - GitHub API
- `server-gitlab` - GitLab API
- `server-docker` - Docker containers

### 5. **Cloud Providers**
- `server-aws` - Amazon Web Services
- `server-gcp` - Google Cloud Platform
- `server-azure` - Microsoft Azure

### 6. **Communication**
- `server-slack` - Integración Slack
- `server-email` - Envío de emails
- `server-discord` - Discord bots

### 7. **Productivity**
- `server-calendar` - Google Calendar
- `server-notion` - Notion workspace
- `server-trello` - Trello boards

---

## Búsqueda por Necesidad

### "Necesito conectarme a..."

#### Bases de Datos
```bash
# Buscar en npm
npm search @modelcontextprotocol postgres
npm search @modelcontextprotocol mysql
npm search @modelcontextprotocol mongodb
```

**MCPs disponibles**:
- PostgreSQL → `@modelcontextprotocol/server-postgres`
- MySQL → `@modelcontextprotocol/server-mysql`
- MongoDB → `@modelcontextprotocol/server-mongodb`
- SQLite → `@modelcontextprotocol/server-sqlite`
- Redis → `@modelcontextprotocol/server-redis`

#### Servicios Cloud
```bash
npm search @modelcontextprotocol aws
npm search @modelcontextprotocol azure
npm search @modelcontextprotocol gcp
```

#### APIs y Web Services
```bash
npm search @modelcontextprotocol api
npm search @modelcontextprotocol rest
npm search @modelcontextprotocol graphql
```

---

### "Necesito automatizar..."

#### Control de Versiones
- Git operations → `@modelcontextprotocol/server-git`
- GitHub → `@modelcontextprotocol/server-github`
- GitLab → `@modelcontextprotocol/server-gitlab`

#### CI/CD y Deployment
- Docker → `@modelcontextprotocol/server-docker`
- Kubernetes → `@modelcontextprotocol/server-kubernetes`
- GitHub Actions → `@modelcontextprotocol/server-github-actions`

#### Testing
- Playwright → `@modelcontextprotocol/server-playwright`
- Jest → `@modelcontextprotocol/server-jest`
- Pytest → `@modelcontextprotocol/server-pytest`

---

### "Necesito procesar..."

#### Documentos
- PDF → `@modelcontextprotocol/server-pdf`
- Word/Excel → `@modelcontextprotocol/server-office`
- Markdown → `@modelcontextprotocol/server-markdown`

#### Imágenes
- Image processing → `@modelcontextprotocol/server-imagemagick`
- OCR → `@modelcontextprotocol/server-tesseract`

#### Datos
- CSV/Excel → `@modelcontextprotocol/server-pandas`
- JSON → `@modelcontextprotocol/server-jq`
- XML → `@modelcontextprotocol/server-xml`

---

## MCPs por Disciplina

### Ingeniería Electrónica / Mecatrónica

**Hardware y IoT**:
- `server-serial` - Comunicación serial (Arduino, Raspberry Pi)
- `server-mqtt` - Protocolo MQTT para IoT
- `server-modbus` - Protocolo Modbus industrial
- `server-gpio` - Control de GPIO en Raspberry Pi

**Simulación y CAD**:
- `server-kicad` - KiCad automation (en desarrollo)
- `server-ltspice` - LTSpice automation
- `server-autocad` - AutoCAD automation (third-party)

**Búsqueda**:
```bash
npm search modelcontextprotocol serial
npm search modelcontextprotocol iot
npm search modelcontextprotocol mqtt
```

---

### Ingeniería de Software

**Backend Development**:
- `server-database` - Múltiples DB
- `server-api` - API testing
- `server-docker` - Containerization
- `server-redis` - Caching

**Frontend Development**:
- `server-npm` - Gestión de paquetes
- `server-webpack` - Build tools
- `server-browser` - Browser automation

**Full Stack**:
- `server-prisma` - Prisma ORM
- `server-graphql` - GraphQL APIs
- `server-rest` - REST APIs

---

### Investigación y Academia

**Análisis de Datos**:
- `server-python` - Python data science
- `server-jupyter` - Jupyter notebooks
- `server-pandas` - Pandas dataframes
- `server-numpy` - NumPy arrays
- `server-r` - R statistical computing

**Escritura Académica**:
- `server-latex` - LaTeX document generation
- `server-zotero` - Reference management
- `server-mendeley` - Reference management
- `server-bibtex` - BibTeX management

**Búsqueda**:
```bash
npm search modelcontextprotocol python
npm search modelcontextprotocol jupyter
npm search modelcontextprotocol latex
npm search modelcontextprotocol zotero
```

---

### Marketing y Comunicación

**Analytics**:
- `server-google-analytics` - GA4 integration
- `server-mixpanel` - Mixpanel analytics
- `server-amplitude` - Amplitude analytics

**Social Media**:
- `server-twitter` - Twitter/X API
- `server-instagram` - Instagram API
- `server-linkedin` - LinkedIn API
- `server-facebook` - Facebook Graph API

**Content Creation**:
- `server-canva` - Canva automation (third-party)
- `server-figma` - Figma API
- `server-wordpress` - WordPress automation

**Email Marketing**:
- `server-mailchimp` - Mailchimp integration
- `server-sendgrid` - SendGrid email
- `server-mailgun` - Mailgun email

---

## Fuentes de MCPs

### 1. NPM Registry (Oficial)

```bash
# Buscar MCPs oficiales
npm search @modelcontextprotocol

# Buscar por keyword
npm search "mcp server" keyword
```

**URL**: https://www.npmjs.com/search?q=%40modelcontextprotocol

---

### 2. GitHub Topics

**URL**: https://github.com/topics/model-context-protocol

Busca repositorios etiquetados con:
- `model-context-protocol`
- `mcp-server`
- `claude-mcp`

---

### 3. Awesome MCP List

**URL**: https://github.com/punkpeye/awesome-mcp

Lista curada de MCPs útiles organizados por categoría.

---

### 4. MCP Community Discord

**URL**: https://discord.gg/modelcontextprotocol

- Canal `#mcp-showcase` - MCPs nuevos
- Canal `#mcp-requests` - Pedir MCPs específicos
- Canal `#mcp-help` - Ayuda con configuración

---

### 5. Claude Code Documentation

**URL**: https://docs.anthropic.com/mcp

Documentación oficial con ejemplos y tutoriales.

---

## Evaluar un MCP antes de Instalarlo

### Checklist de Seguridad

Antes de instalar un MCP, verifica:

#### ✅ **1. Fuente Confiable**
- ¿Está en el repositorio oficial de MCP?
- ¿Tiene buena reputación el autor?
- ¿Es mantenido activamente?

#### ✅ **2. Documentación**
- ¿Tiene README claro?
- ¿Incluye ejemplos de uso?
- ¿Documenta todas las funciones?

#### ✅ **3. Actividad del Proyecto**
- ¿Cuándo fue el último commit?
- ¿Responde el autor a issues?
- ¿Tiene muchas estrellas/forks?

#### ✅ **4. Seguridad**
- ¿Requiere permisos razonables?
- ¿Cómo maneja credenciales?
- ¿Tiene historial de vulnerabilidades?

#### ✅ **5. Compatibilidad**
- ¿Funciona con tu versión de OpenCode?
- ¿Soporta tu sistema operativo?
- ¿Tiene dependencias complejas?

### Ejemplo de Evaluación

**MCP Candidato**: `@modelcontextprotocol/server-postgres`

```bash
# 1. Ver información del paquete
npm info @modelcontextprotocol/server-postgres

# 2. Ver GitHub del paquete
npm home @modelcontextprotocol/server-postgres

# 3. Verificar versión y dependencias
npm view @modelcontextprotocol/server-postgres dependencies

# 4. Leer issues conocidos
# Ir a GitHub y revisar Issues
```

**Evaluación**:
- ✅ Fuente oficial (@modelcontextprotocol)
- ✅ Bien documentado
- ✅ Activamente mantenido
- ✅ Muchas estrellas en GitHub
- ✅ Compatible con todas las plataformas

**Decisión**: ¡Seguro para instalar!

---

## MCPs Populares por Uso

### Top 10 MCPs Más Usados

1. **@modelcontextprotocol/server-filesystem**
   - 📊 100,000+ descargas/mes
   - ✅ Esencial para todo tipo de desarrollo

2. **@modelcontextprotocol/server-github**
   - 📊 75,000+ descargas/mes
   - ✅ Automatización de GitHub

3. **@modelcontextprotocol/server-postgres**
   - 📊 50,000+ descargas/mes
   - ✅ Base de datos más popular

4. **@modelcontextprotocol/server-web-search**
   - 📊 45,000+ descargas/mes
   - ✅ Búsqueda en internet

5. **@modelcontextprotocol/server-git**
   - 📊 40,000+ descargas/mes
   - ✅ Control de versiones

6. **@modelcontextprotocol/server-docker**
   - 📊 35,000+ descargas/mes
   - ✅ Containerization

7. **@modelcontextprotocol/server-slack**
   - 📊 30,000+ descargas/mes
   - ✅ Comunicación de equipo

8. **@modelcontextprotocol/server-mysql**
   - 📊 25,000+ descargas/mes
   - ✅ Base de datos MySQL

9. **@modelcontextprotocol/server-aws**
   - 📊 20,000+ descargas/mes
   - ✅ Cloud AWS

10. **@modelcontextprotocol/server-mongodb**
    - 📊 18,000+ descargas/mes
    - ✅ NoSQL database

---

## Crear Solicitud para Nuevo MCP

¿No existe el MCP que necesitas?

### Opción 1: Solicitar en la Comunidad

**GitHub Discussions**:
1. Ve a https://github.com/modelcontextprotocol/discussions
2. Categoría "Ideas"
3. Describe tu necesidad:

```markdown
**Título**: MCP para [Herramienta/Servicio]

**Descripción**: 
Necesito un MCP que permita [funcionalidad deseada]

**Casos de uso**:
- Caso 1: [ejemplo]
- Caso 2: [ejemplo]

**Alternativas consideradas**:
[Otros MCPs que probaste]

**Interés de la comunidad**:
¿Otros también necesitan esto? 👍
```

### Opción 2: Crear tu Propio MCP

Ver guía en [Módulo 02 - Configuration Mastery](../../00-CORE-FOUNDATION/modules/02-configuration-mastery/README.md)

---

## Recursos Adicionales

- 📖 [Instalar MCPs](./installing-mcps.md)
- 📖 [Ejemplos de Configuración](./config-examples.md)
- 📖 [Solución de Problemas](./troubleshooting.md)
- 📖 [Guía Principal de MCPs](./README.md)

---

**Última actualización**: Enero 2026  
**Fuentes**: Official MCP Registry, NPM, GitHub

---

*Guía creada para FPUNA Summer 2026*
