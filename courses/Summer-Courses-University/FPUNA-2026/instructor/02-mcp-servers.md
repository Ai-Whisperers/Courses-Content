# MCP Servers - Configuración Completa

## Model Context Protocol (MCP) para Claude Code

Los MCP servers extienden las capacidades de Claude, permitiendo acceso a archivos, memoria persistente, navegación web, y más.

---

## 1. ¿Qué son los MCP Servers?

MCP (Model Context Protocol) es un protocolo que permite a Claude:
- Acceder al sistema de archivos
- Mantener memoria entre sesiones
- Navegar la web
- Ejecutar código
- Conectarse a bases de datos
- Y mucho más...

---

## 2. Ubicación de Configuración

### Windows
```
C:\Users\{usuario}\.claude\settings.json
```

### macOS/Linux
```
~/.claude/settings.json
```

---

## 3. MCP Servers Recomendados para FPUNA

### 3.1 Filesystem (Acceso a Archivos)

**Función:** Permite a Claude leer, escribir y navegar archivos.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-filesystem",
        "C:/Users/{usuario}/Documents",
        "C:/Users/{usuario}/Projects"
      ]
    }
  }
}
```

**Instalación:**
```bash
npm install -g @anthropics/mcp-server-filesystem
```

---

### 3.2 Memory (Memoria Persistente)

**Función:** Mantiene información entre sesiones usando un knowledge graph.

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-memory"
      ]
    }
  }
}
```

**Instalación:**
```bash
npm install -g @anthropics/mcp-server-memory
```

**Uso en el curso:**
- Recordar preferencias del estudiante
- Mantener contexto de proyectos
- Guardar notas y apuntes

---

### 3.3 Sequential Thinking (Razonamiento Paso a Paso)

**Función:** Permite razonamiento estructurado para problemas complejos.

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-sequential-thinking"
      ]
    }
  }
}
```

**Uso en el curso:**
- Resolver problemas de programación complejos
- Análisis paso a paso de cálculos
- Debugging sistemático

---

### 3.4 Playwright (Automatización Web)

**Función:** Permite a Claude interactuar con páginas web.

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-playwright"
      ]
    }
  }
}
```

**Instalación adicional:**
```bash
npx playwright install chromium
```

**Uso en el curso:**
- Track 04 (Marketing): Análisis de páginas web
- Track 06 (Hospitalidad): Verificar OTAs
- Demos de web scraping

---

### 3.5 Context7 (Documentación de Librerías)

**Función:** Acceso a documentación actualizada de librerías.

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "@context7/mcp-server"
      ]
    }
  }
}
```

**Uso en el curso:**
- Track 01: Documentación de frameworks
- Track 02: Docs de Arduino/ESP32
- Acceso a ejemplos de código actualizados

---

### 3.6 Greptile (Análisis de Código)

**Función:** Análisis avanzado de repositorios y PRs.

```json
{
  "mcpServers": {
    "greptile": {
      "command": "npx",
      "args": [
        "-y",
        "@greptile/mcp-server"
      ],
      "env": {
        "GREPTILE_API_KEY": "tu-api-key"
      }
    }
  }
}
```

**Uso en el curso:**
- Track 01: Code review automatizado
- Análisis de repos de ejemplo

---

## 4. Configuración Completa Recomendada

### settings.json Completo para FPUNA

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-filesystem",
        "C:/Users/{usuario}/Documents",
        "C:/Users/{usuario}/Projects",
        "C:/FPUNA-2026"
      ]
    },
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-memory"
      ]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-sequential-thinking"
      ]
    },
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropics/mcp-server-playwright"
      ]
    }
  },
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(node:*)",
      "Bash(python:*)",
      "Bash(git:*)",
      "Read",
      "Write",
      "Edit"
    ]
  }
}
```

---

## 5. Instalación Paso a Paso

### Paso 1: Crear carpeta de configuración
```bash
# Windows
mkdir %USERPROFILE%\.claude

# macOS/Linux
mkdir -p ~/.claude
```

### Paso 2: Crear archivo settings.json
```bash
# Windows (PowerShell)
New-Item -Path "$env:USERPROFILE\.claude\settings.json" -ItemType File

# macOS/Linux
touch ~/.claude/settings.json
```

### Paso 3: Editar configuración
```bash
# Abrir con VS Code
code ~/.claude/settings.json
```

### Paso 4: Pegar configuración y guardar

### Paso 5: Reiniciar Claude Code
```bash
# Cerrar y volver a abrir terminal
claude
```

### Paso 6: Verificar MCPs activos
```bash
# Dentro de Claude Code, escribir:
/mcp
```

---

## 6. MCPs Opcionales por Track

### Track 01: Desarrollo de Software
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@anthropics/mcp-server-github"],
    "env": {
      "GITHUB_TOKEN": "ghp_xxxxx"
    }
  }
}
```

### Track 02: Electrónica
```json
{
  "serial": {
    "command": "npx",
    "args": ["-y", "mcp-server-serial"],
    "env": {
      "SERIAL_PORT": "COM3"
    }
  }
}
```

### Track 05: Investigación
```json
{
  "arxiv": {
    "command": "npx",
    "args": ["-y", "mcp-server-arxiv"]
  },
  "pubmed": {
    "command": "npx",
    "args": ["-y", "mcp-server-pubmed"]
  }
}
```

---

## 7. Troubleshooting de MCPs

### MCP no se conecta
```bash
# Verificar que npx funciona
npx --version

# Instalar el MCP manualmente
npm install -g @anthropics/mcp-server-filesystem

# Verificar logs
claude --debug
```

### Error de permisos
```bash
# Windows: Ejecutar PowerShell como administrador
# Linux/macOS:
sudo chown -R $USER ~/.claude
```

### MCP filesystem no accede a carpetas
1. Verificar que las rutas en `args` existen
2. Usar rutas absolutas, no relativas
3. En Windows, usar `/` o `\\` en las rutas

### Playwright no encuentra navegador
```bash
# Instalar navegadores de Playwright
npx playwright install

# O solo Chrome
npx playwright install chromium
```

---

## 8. Script de Configuración Automática

### Windows (PowerShell)
```powershell
# Guardar como setup-mcp.ps1

$configDir = "$env:USERPROFILE\.claude"
$configFile = "$configDir\settings.json"

# Crear directorio
New-Item -ItemType Directory -Force -Path $configDir

# Configuración base
$config = @{
    mcpServers = @{
        filesystem = @{
            command = "npx"
            args = @("-y", "@anthropics/mcp-server-filesystem", "$env:USERPROFILE\Documents")
        }
        memory = @{
            command = "npx"
            args = @("-y", "@anthropics/mcp-server-memory")
        }
        "sequential-thinking" = @{
            command = "npx"
            args = @("-y", "@anthropics/mcp-server-sequential-thinking")
        }
    }
}

# Guardar configuración
$config | ConvertTo-Json -Depth 10 | Set-Content $configFile

Write-Host "MCP configurado en: $configFile"
```

### macOS/Linux (Bash)
```bash
#!/bin/bash
# Guardar como setup-mcp.sh

CONFIG_DIR="$HOME/.claude"
CONFIG_FILE="$CONFIG_DIR/settings.json"

# Crear directorio
mkdir -p "$CONFIG_DIR"

# Crear configuración
cat > "$CONFIG_FILE" << 'EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-filesystem", "$HOME/Documents"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-sequential-thinking"]
    }
  }
}
EOF

# Reemplazar $HOME con valor real
sed -i "s|\$HOME|$HOME|g" "$CONFIG_FILE"

echo "MCP configurado en: $CONFIG_FILE"
```

---

## 9. Verificación Final

Después de configurar, ejecutar dentro de Claude Code:

```
/mcp
```

Debe mostrar los MCPs activos:
```
Servidores MCP activos:
- filesystem: Conectado
- memory: Conectado
- sequential-thinking: Conectado
- playwright: Conectado
```

Probar cada MCP:
```bash
# Filesystem
claude "lista los archivos en mi carpeta Documents"

# Memory
claude "recuerda que mi nombre es [Nombre]"
claude "¿cuál es mi nombre?"

# Sequential Thinking
claude "resuelve paso a paso: si tengo 3 manzanas y compro 5 más, ¿cuántas tengo?"
```

---

*Guía de MCP Servers - FPUNA 2026*
