# Guía de Configuración de MCPs (Model Context Protocol)

## ¿Qué son los MCPs?

**MCP** (Model Context Protocol) es un sistema que permite a OpenCode conectarse con herramientas externas, servicios y fuentes de datos. Piensa en los MCPs como "plugins" o "extensiones" que amplían las capacidades de OpenCode.

**Tiempo estimado**: 30-45 minutos  
**Nivel**: Principiante-Intermedio  
**Requisitos**: OpenCode instalado y funcionando

---

## ¿Para qué sirven los MCPs?

**Sin MCPs**: OpenCode solo puede generar código y responder preguntas.

**Con MCPs**: OpenCode puede:
- 🌐 Buscar en internet (MCP de Web Search)
- 📂 Leer/escribir archivos (MCP de Filesystem)
- 🗄️ Conectarse a bases de datos (MCP de PostgreSQL, MongoDB)
- 📊 Analizar datos (MCP de Python, R)
- 🎨 Generar imágenes (MCP de DALL-E, Midjourney)
- 📧 Enviar emails (MCP de SendGrid, Mailgun)
- ☁️ Interactuar con cloud (MCP de AWS, Azure, GCP)
- ¡Y mucho más!

---

## Conceptos Clave

### Servidor MCP

Un **servidor MCP** es un programa que expone funcionalidades específicas a OpenCode.

**Ejemplo**: Un servidor MCP de Google Calendar permite a OpenCode:
- Leer tus eventos
- Crear nuevas citas
- Modificar eventos existentes
- Buscar disponibilidad

### Cliente MCP

OpenCode actúa como **cliente MCP**, consumiendo servicios de los servidores MCP que configuras.

### Configuración MCP

Un archivo JSON que le dice a OpenCode:
- Qué servidores MCP usar
- Cómo conectarse a ellos
- Qué credenciales usar

---

## Arquitectura de MCPs

```
┌─────────────────┐
│   TU COMANDO    │
│  (Terminal)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    OpenCode     │  ← Cliente MCP
└────────┬────────┘
         │
         │ Comunica vía MCP
         │
    ┌────┴────┬─────────┬─────────┐
    ↓         ↓         ↓         ↓
┌──────┐ ┌────────┐ ┌──────┐ ┌──────┐
│ Web  │ │ File   │ │ DB   │ │ API  │  ← Servidores MCP
│Search│ │System  │ │ SQL  │ │ AWS  │
└──────┘ └────────┘ └──────┘ └──────┘
```

---

## Tipos Comunes de MCPs

### 1. MCPs de Datos

**Acceso a información**:
- `filesystem` - Leer/escribir archivos locales
- `web-search` - Buscar en internet
- `database` - Conectar a PostgreSQL, MySQL, MongoDB
- `api` - Consumir APIs REST

### 2. MCPs de Productividad

**Automatización de tareas**:
- `email` - Enviar emails
- `calendar` - Gestionar calendario
- `slack` - Interactuar con Slack
- `github` - Automatizar GitHub

### 3. MCPs de Desarrollo

**Herramientas de programación**:
- `git` - Control de versiones avanzado
- `docker` - Gestionar contenedores
- `kubernetes` - Orquestar servicios
- `testing` - Ejecutar tests automáticos

### 4. MCPs Especializados

**Por disciplina**:
- `autocad` - Automatizar AutoCAD (Ingeniería)
- `latex` - Generar documentos LaTeX (Investigación)
- `analytics` - Google Analytics (Marketing)
- `iot` - Conectar dispositivos IoT (Electrónica)

---

## Guías Detalladas

### 📖 [Encontrar MCPs](./finding-mcps.md)
Cómo descubrir MCPs disponibles para tus necesidades.

### 📖 [Instalar MCPs](./installing-mcps.md)
Guía paso a paso para instalar y configurar MCPs.

### 📖 [Ejemplos de Configuración](./config-examples.md)
Configuraciones listas para usar de MCPs populares.

### 📖 [Solución de Problemas](./troubleshooting.md)
Resolver problemas comunes con MCPs.

---

## Instalación Rápida - Tu Primer MCP

Vamos a instalar el MCP de **Filesystem** (el más útil para empezar).

### Paso 1: Crear Archivo de Configuración

```bash
# En Windows
mkdir %USERPROFILE%\.opencode
notepad %USERPROFILE%\.opencode\mcp-config.json

# En macOS/Linux
mkdir -p ~/.opencode
nano ~/.opencode/mcp-config.json
```

### Paso 2: Configuración Básica

Copia este contenido en `mcp-config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/ruta/a/tu/carpeta/de/proyectos"
      ]
    }
  }
}
```

**IMPORTANTE**: Cambia `/ruta/a/tu/carpeta/de/proyectos` por tu carpeta real:

**Windows**: `C:\\Users\\TuUsuario\\Proyectos`  
**macOS/Linux**: `/Users/TuUsuario/Proyectos` o `/home/TuUsuario/proyectos`

### Paso 3: Instalar el Servidor MCP

```bash
npm install -g @modelcontextprotocol/server-filesystem
```

### Paso 4: Reiniciar OpenCode

```bash
# Cerrar cualquier instancia de OpenCode y volver a ejecutar
claude --version
```

### Paso 5: Probar

```bash
claude "Lista todos los archivos en mi carpeta de proyectos"
```

**Si funciona**: Verás la lista de archivos. ¡Felicitaciones! 🎉  
**Si hay error**: Ver [Guía de Solución de Problemas](./troubleshooting.md)

---

## MCPs Recomendados para Estudiantes de FPUNA

### Para Todos los Estudiantes

1. **@modelcontextprotocol/server-filesystem**
   - Gestionar archivos y carpetas
   - Leer/escribir código
   - Organizar proyectos

2. **@modelcontextprotocol/server-web-search**
   - Buscar información actualizada
   - Investigar tecnologías
   - Encontrar documentación

3. **@modelcontextprotocol/server-git**
   - Control de versiones
   - Commits automáticos
   - Gestión de branches

### Por Disciplina

**Ingeniería Electrónica/Mecatrónica**:
- `server-serial` - Comunicación con Arduino/dispositivos
- `server-iot` - Gestión de IoT
- `server-autocad` - Automatización de CAD

**Ingeniería de Software**:
- `server-database` - PostgreSQL, MySQL
- `server-docker` - Gestión de contenedores
- `server-github` - Automatización de GitHub

**Investigación/Academia**:
- `server-python` - Análisis de datos
- `server-latex` - Generación de papers
- `server-zotero` - Gestión de referencias

**Marketing/Comunicación**:
- `server-analytics` - Google Analytics
- `server-social` - Redes sociales
- `server-email` - Campañas de email

---

## Estructura de Configuración MCP

### Configuración Completa Explicada

```json
{
  "mcpServers": {
    "nombre-descriptivo": {
      "command": "comando-a-ejecutar",
      "args": ["argumento1", "argumento2"],
      "env": {
        "VARIABLE": "valor"
      },
      "disabled": false
    }
  }
}
```

**Campos**:

- `nombre-descriptivo`: Nombre que le das al servidor (puede ser cualquier cosa)
- `command`: Programa que ejecuta el servidor MCP
- `args`: Argumentos para el comando
- `env`: Variables de entorno (API keys, configuraciones)
- `disabled`: `true` para desactivar temporalmente

### Ejemplo Real - GitHub MCP

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_TOKEN": "ghp_tu_token_de_github_aqui"
      }
    }
  }
}
```

---

## Gestión de Múltiples MCPs

Puedes tener muchos MCPs configurados simultáneamente:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/maria/proyectos"]
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"],
      "env": {
        "BRAVE_API_KEY": "tu_clave_aqui"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "tu_token_aqui"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/dbname"
      }
    }
  }
}
```

**OpenCode usará automáticamente el MCP apropiado** según tu comando.

---

## Mejores Prácticas

### ✅ HACER

1. **Empezar con pocos MCPs**: No instales todo de una vez
2. **Documentar configuraciones**: Anota qué hace cada MCP
3. **Usar variables de entorno** para secretos
4. **Probar uno a uno**: Instala y prueba cada MCP individualmente
5. **Mantener actualizado**: `npm update -g nombre-del-mcp`

### ❌ NO HACER

1. **No compartir API keys**: Nunca subas configuraciones con claves a GitHub
2. **No instalar MCPs sin verificar**: Usa solo fuentes confiables
3. **No dar acceso excesivo**: Limita permisos solo a lo necesario
4. **No ignorar errores**: Si un MCP falla, investiga por qué

---

## Seguridad y Permisos

### Configuración Segura de API Keys

**MAL** ❌:
```json
{
  "mcpServers": {
    "github": {
      "env": {
        "GITHUB_TOKEN": "ghp_1234567890abcdef"  // ¡Nunca hacer esto!
      }
    }
  }
}
```

**BIEN** ✅:

1. **Crear archivo `.env`**:
```bash
# .env (en tu carpeta home)
GITHUB_TOKEN=ghp_1234567890abcdef
BRAVE_API_KEY=BSA_xyz123
DATABASE_URL=postgresql://...
```

2. **Referenciar en configuración**:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

3. **Agregar `.env` a `.gitignore`**:
```bash
echo ".env" >> .gitignore
```

---

## Casos de Uso Reales

### Ejemplo 1: Proyecto de Clase Automatizado

**Situación**: Tienes que crear un proyecto web con backend y frontend.

**Sin MCPs**:
1. Crear archivos manualmente
2. Copiar/pegar código de OpenCode
3. Inicializar Git manualmente
4. Hacer commits manualmente

**Con MCPs** (filesystem + git):
```bash
claude "Crea un proyecto Node.js con Express backend y React frontend. 
Inicializa Git, crea estructura de carpetas, y haz el primer commit."
```

OpenCode:
- Crea todos los archivos (`filesystem` MCP)
- Inicializa Git (`git` MCP)
- Hace commit automáticamente

**Ahorro de tiempo**: 30 minutos → 2 minutos

---

### Ejemplo 2: Análisis de Datos para Tesis

**Situación**: Necesitas analizar datos de una base de datos PostgreSQL.

**Con MCPs** (postgres + filesystem):
```bash
claude "Conecta a mi base de datos 'tesis_encuestas', 
extrae los datos de la tabla 'respuestas', 
realiza análisis estadístico descriptivo, 
y genera un reporte en Markdown con gráficos"
```

OpenCode:
- Se conecta a PostgreSQL (`postgres` MCP)
- Extrae datos
- Procesa y analiza
- Guarda reporte (`filesystem` MCP)

---

### Ejemplo 3: Automatización de Redes Sociales

**Situación**: Necesitas publicar actualizaciones en redes sociales.

**Con MCPs** (social + analytics):
```bash
claude "Analiza el engagement de mis últimos 10 posts en Twitter, 
genera un reporte de métricas, 
y sugiere 5 nuevos posts optimizados para mi audiencia"
```

---

## Recursos y Referencias

### Documentación Oficial

- **MCP Specification**: https://spec.modelcontextprotocol.io/
- **MCP Servers Repository**: https://github.com/modelcontextprotocol/servers
- **Anthropic MCP Guide**: https://docs.anthropic.com/mcp

### Guías de Este Curso

- 📖 [Encontrar MCPs](./finding-mcps.md)
- 📖 [Instalar MCPs](./installing-mcps.md)
- 📖 [Ejemplos de Configuración](./config-examples.md)
- 📖 [Solución de Problemas](./troubleshooting.md)

### Comunidad

- **Discord de MCP**: https://discord.gg/modelcontextprotocol
- **GitHub Discussions**: https://github.com/modelcontextprotocol/discussions
- **Canal FPUNA**: #fpuna-mcps en Slack

---

## Próximos Pasos

Una vez que domines los MCPs básicos:

1. 📖 Explora: [Sistema de Skills](../skills-system/README.md)
2. 📖 Aprende: [Hooks y Rules](../hooks-rules/README.md)
3. 📖 Practica: [Plantillas de Proyecto](../project-templates/README.md)

---

## Checklist de Configuración MCP

- [ ] Entiendo qué son los MCPs
- [ ] Creé archivo `mcp-config.json`
- [ ] Instalé mi primer MCP (filesystem)
- [ ] Probé que funciona
- [ ] Configuré API keys de forma segura
- [ ] Exploré MCPs relevantes para mi disciplina
- [ ] Leí las mejores prácticas

---

**¡Felicitaciones!** 🎉

Ahora puedes extender las capacidades de OpenCode con MCPs. Esto multiplica lo que puedes lograr con IA.

---

*Guía creada para FPUNA Summer 2026*  
*Última actualización: Enero 2026*
