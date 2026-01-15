# Guía de Instalación de MCPs

## Instalación Paso a Paso de Model Context Protocol Servers

Esta guía te lleva de la mano para instalar y configurar MCPs correctamente.

**Tiempo estimado**: 15-30 minutos por MCP  
**Nivel**: Principiante  
**Requisitos**: OpenCode instalado

---

## Proceso General de Instalación

Todo MCP sigue estos pasos básicos:

```
1. Instalar el paquete npm del servidor MCP
2. Crear/editar archivo de configuración
3. Agregar configuración del MCP
4. Reiniciar OpenCode
5. Probar que funciona
```

---

## Paso 1: Ubicación del Archivo de Configuración

### Windows

```powershell
# Ruta del archivo
%USERPROFILE%\.opencode\mcp-config.json

# Crear directorio si no existe
mkdir %USERPROFILE%\.opencode

# Crear archivo
notepad %USERPROFILE%\.opencode\mcp-config.json
```

### macOS / Linux

```bash
# Ruta del archivo
~/.opencode/mcp-config.json

# Crear directorio si no existe
mkdir -p ~/.opencode

# Crear archivo
nano ~/.opencode/mcp-config.json
```

---

## Paso 2: Estructura Básica del Archivo

Si el archivo está vacío, comienza con esta estructura:

```json
{
  "mcpServers": {
    
  }
}
```

---

## Instalación por Tipo de MCP

### Tipo A: MCPs Oficiales (Más Común)

**Ejemplo**: Filesystem MCP

#### Paso 1: Instalar el paquete

```bash
npm install -g @modelcontextprotocol/server-filesystem
```

#### Paso 2: Agregar a configuración

Edita `~/.opencode/mcp-config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/ruta/a/carpeta/permitida"
      ]
    }
  }
}
```

**IMPORTANTE**: Cambia `/ruta/a/carpeta/permitida` por una ruta real:
- **Windows**: `"C:\\Users\\Maria\\Proyectos"`
- **macOS/Linux**: `"/Users/maria/proyectos"` o `"/home/maria/proyectos"`

#### Paso 3: Reiniciar OpenCode

```bash
# Cerrar cualquier instancia de claude running
# Luego ejecutar
claude --version
```

#### Paso 4: Probar

```bash
claude "Lista los archivos en mi carpeta de proyectos"
```

---

### Tipo B: MCPs que Requieren API Keys

**Ejemplo**: GitHub MCP

#### Paso 1: Obtener API Key

1. Ve a https://github.com/settings/tokens
2. "Generate new token (classic)"
3. Selecciona permisos necesarios:
   - `repo` - Acceso a repositorios
   - `workflow` - Acceso a GitHub Actions
4. Copia el token generado

#### Paso 2: Configurar variable de entorno

**Windows** (PowerShell como Admin):
```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_tu_token_aqui", "User")
```

**macOS/Linux**:
```bash
# Agregar a ~/.bashrc o ~/.zshrc
echo 'export GITHUB_TOKEN="ghp_tu_token_aqui"' >> ~/.bashrc
source ~/.bashrc
```

#### Paso 3: Instalar el paquete

```bash
npm install -g @modelcontextprotocol/server-github
```

#### Paso 4: Agregar a configuración

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
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

---

### Tipo C: MCPs de Base de Datos

**Ejemplo**: PostgreSQL MCP

#### Paso 1: Instalar paquete

```bash
npm install -g @modelcontextprotocol/server-postgres
```

#### Paso 2: Configurar connection string

**Formato**:
```
postgresql://usuario:contraseña@host:puerto/nombre_db
```

**Ejemplo local**:
```
postgresql://postgres:mipassword@localhost:5432/mi_base_datos
```

#### Paso 3: Configurar variable de entorno (recomendado)

```bash
export DATABASE_URL="postgresql://postgres:password@localhost:5432/dbname"
```

#### Paso 4: Agregar a configuración

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres"
      ],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

---

## Configuración de Múltiples MCPs

Puedes tener varios MCPs simultáneamente:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\Carlos\\Proyectos"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    }
  }
}
```

---

## Verificación Post-Instalación

### Verificar que el MCP está cargado

```bash
# Comando de diagnóstico (si OpenCode lo soporta)
claude --list-mcps

# O probar funcionalidad específica
claude "Usando el MCP de filesystem, lista mis archivos"
```

### Logs de Errores

Si algo falla, OpenCode mostrará errores. Busca:

**Windows**:
```
%USERPROFILE%\.opencode\logs\mcp.log
```

**macOS/Linux**:
```
~/.opencode/logs/mcp.log
```

---

## Instalaciones Comunes Paso a Paso

### 1. Filesystem MCP (Esencial)

```bash
# Instalar
npm install -g @modelcontextprotocol/server-filesystem

# Configurar (Windows)
# Edita: %USERPROFILE%\.opencode\mcp-config.json
```

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\TuUsuario\\Proyectos"]
    }
  }
}
```

**Probar**:
```bash
claude "Lista archivos en mi directorio de proyectos"
```

---

### 2. Git MCP (Control de Versiones)

```bash
# Instalar
npm install -g @modelcontextprotocol/server-git
```

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

**Probar**:
```bash
cd /tu/proyecto/git
claude "Muestra el status de Git y los últimos 5 commits"
```

---

### 3. Web Search MCP (Brave Search)

**Obtener API Key**:
1. Ve a https://brave.com/search/api/
2. Regístrate y obtén tu API key
3. Configura variable de entorno

```bash
# Instalar
npm install -g @modelcontextprotocol/server-web-search

# Configurar env
export BRAVE_API_KEY="tu_clave_aqui"
```

```json
{
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    }
  }
}
```

**Probar**:
```bash
claude "Busca en internet los últimos avances en energía solar en Paraguay"
```

---

## Gestión de MCPs

### Desactivar MCP Temporalmente

Agrega `"disabled": true`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "disabled": true
    }
  }
}
```

### Desinstalar MCP Completamente

```bash
# 1. Remover del mcp-config.json
# Elimina la sección correspondiente

# 2. Desinstalar paquete npm
npm uninstall -g @modelcontextprotocol/server-nombre
```

### Actualizar MCP

```bash
# Actualizar un MCP específico
npm update -g @modelcontextprotocol/server-filesystem

# Actualizar todos los MCPs
npm update -g @modelcontextprotocol/*
```

---

## Solución de Problemas

### Problema: "MCP no se carga"

**Solución**:
1. Verificar sintaxis JSON (usa https://jsonlint.com/)
2. Verificar que el paquete está instalado: `npm list -g @modelcontextprotocol/server-nombre`
3. Revisar logs: `~/.opencode/logs/mcp.log`

### Problema: "Invalid API key"

**Solución**:
1. Verificar variable de entorno: `echo $NOMBRE_VARIABLE`
2. Regenerar API key
3. Verificar formato correcto en configuración

### Problema: "Permission denied"

**Solución**:
1. Verificar permisos de carpeta
2. Usar rutas absolutas, no relativas
3. En Windows, usar doble backslash: `C:\\Users\\...`

Ver guía completa: [Solución de Problemas MCP](./troubleshooting.md)

---

## Mejores Prácticas

### ✅ Seguridad

1. **Nunca incluir API keys directamente** en mcp-config.json
2. **Usar variables de entorno** para secretos
3. **Limitar permisos** al mínimo necesario
4. **No subir configuraciones** con secretos a GitHub

### ✅ Organización

1. **Comentar cada MCP** (aunque JSON no soporta comentarios, documenta externamente)
2. **Agrupar MCPs similares** lógicamente
3. **Usar nombres descriptivos** para cada servidor

### ✅ Mantenimiento

1. **Actualizar regularmente** los MCPs
2. **Probar después de actualizar**
3. **Mantener respaldo** de configuración funcional
4. **Documentar cambios** importantes

---

## Plantilla Completa de Configuración

Aquí está una configuración completa de ejemplo para estudiante de FPUNA:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/estudiante/FPUNA/Proyectos"
      ]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "disabled": false
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    }
  }
}
```

---

## Próximos Pasos

- 📖 [Ejemplos de Configuración](./config-examples.md) - Configuraciones listas para copiar
- 📖 [Encontrar MCPs](./finding-mcps.md) - Descubre más MCPs
- 📖 [Solución de Problemas](./troubleshooting.md) - Resolver errores

---

**Última actualización**: Enero 2026  
*Guía creada para FPUNA Summer 2026*
