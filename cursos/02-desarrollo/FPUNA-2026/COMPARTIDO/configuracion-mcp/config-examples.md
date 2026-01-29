# Ejemplos de Configuración MCP

## Configuraciones Listas para Usar

Copia y pega estas configuraciones según tus necesidades. Solo necesitas reemplazar las variables marcadas con `TU_...`.

---

## Configuración Básica para Estudiantes

### Setup Mínimo (Filesystem + Git)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\TU_USUARIO\\FPUNA\\Proyectos"
      ]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

**Cambiar**: `C:\\Users\\TU_USUARIO\\FPUNA\\Proyectos` por tu carpeta real.

---

## Por Disciplina

### Ingeniería de Software

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/usuario/proyectos"]
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
      }
    },
    "docker": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docker"]
    }
  }
}
```

---

### Ingeniería Electrónica/Mecatrónica

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/usuario/proyectos"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    },
    "serial": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-serial"]
    },
    "mqtt": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-mqtt"],
      "env": {
        "MQTT_BROKER": "${MQTT_BROKER}"
      }
    }
  }
}
```

---

### Investigación y Academia

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/usuario/investigacion"]
    },
    "python": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-python"]
    },
    "jupyter": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-jupyter"]
    },
    "zotero": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-zotero"],
      "env": {
        "ZOTERO_API_KEY": "${ZOTERO_API_KEY}"
      }
    }
  }
}
```

---

### Marketing y Comunicación

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\usuario\\Marketing"]
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    },
    "google-analytics": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-analytics"],
      "env": {
        "GA_API_KEY": "${GA_API_KEY}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_TOKEN": "${SLACK_TOKEN}"
      }
    }
  }
}
```

---

## Configuración Completa (Full Stack)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/usuario/proyectos"]
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
      }
    },
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-mongodb"],
      "env": {
        "MONGODB_URI": "${MONGODB_URI}"
      }
    },
    "redis": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-redis"],
      "env": {
        "REDIS_URL": "${REDIS_URL}"
      }
    },
    "docker": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docker"]
    },
    "web-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-web-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_TOKEN": "${SLACK_TOKEN}"
      }
    }
  }
}
```

---

## Variables de Entorno (.env)

Crea archivo `.env` en tu carpeta home:

```bash
# GitHub
GITHUB_TOKEN=ghp_tu_token_aqui

# Bases de Datos
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
MONGODB_URI=mongodb://localhost:27017/dbname
REDIS_URL=redis://localhost:6379

# APIs
BRAVE_API_KEY=tu_brave_api_key
GA_API_KEY=tu_google_analytics_key
SLACK_TOKEN=xoxb-tu-slack-token

# IoT/Hardware
MQTT_BROKER=mqtt://localhost:1883

# Research
ZOTERO_API_KEY=tu_zotero_key
```

---

*Guía creada para FPUNA Summer 2026*
