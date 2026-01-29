# Model Context Protocol (MCP) Servers Guide

> **Last Updated:** December 2025
> **Source:** [MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18) | [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)

## Overview

The Model Context Protocol (MCP) is an open standard introduced by Anthropic to standardize how AI systems integrate with external tools, data sources, and services. MCP is now supported by major providers including OpenAI, Google DeepMind, and Microsoft.

## How MCP Works

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   AI Client     │ ◄───► │   MCP Server    │ ◄───► │   External      │
│ (Claude, etc.)  │       │   (Protocol)    │       │   Service       │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

- **Client:** The AI application (Claude Code, Cursor, etc.)
- **Server:** Middleware that exposes tools via MCP protocol
- **Service:** External system (filesystem, database, API, etc.)

## Tool Support by Platform

| MCP Server | Claude Code | Cursor | Copilot | Gemini | Windsurf |
|------------|-------------|--------|---------|--------|----------|
| Filesystem | Yes | Yes | Limited | Yes | Limited |
| GitHub | Yes | Yes | Default | Yes | No |
| PostgreSQL | Yes | Yes | No | Yes | No |
| SQLite | Yes | Yes | No | Yes | No |
| Puppeteer | Yes | Yes | Default | No | No |
| Memory | Yes | Yes | No | No | No |
| Slack | Yes | Yes | No | No | No |
| Google Drive | Yes | Yes | No | No | No |

## Common MCP Server Configurations

### Universal Configuration (mcp-servers.json)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"],
      "description": "File system operations"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "description": "GitHub API operations"
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "description": "PostgreSQL database access"
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data/app.db"],
      "description": "SQLite database access"
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
      "description": "Browser automation"
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "description": "Persistent memory across sessions"
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
      },
      "description": "Slack workspace integration"
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "description": "Google Drive access"
    }
  }
}
```

## Platform-Specific Configuration

### Claude Code (.claude/mcp.json)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-playwright"],
      "description": "Playwright browser automation for testing"
    }
  }
}
```

### Cursor IDE (.cursor/mcp.json)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### Gemini Code Assist (.gemini/settings.json)

```json
{
  "model": "gemini-2.5-pro",
  "mcp": {
    "servers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
      },
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

## Popular MCP Servers

### 1. Filesystem Server

**Purpose:** Read, write, and manage files

```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src", "./tests"]
  }
}
```

**Capabilities:**
- Read file contents
- Write/create files
- List directories
- Search files by pattern
- Move/rename files

**Security:** Only allows access to specified directories

### 2. GitHub Server

**Purpose:** GitHub API operations

```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
    }
  }
}
```

**Capabilities:**
- Repository operations
- Issue management
- Pull request operations
- Branch management
- Search code/repos

### 3. PostgreSQL Server

**Purpose:** Database queries and operations

```json
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres"],
    "env": {
      "DATABASE_URL": "postgresql://user:pass@localhost:5432/db"
    }
  }
}
```

**Capabilities:**
- Execute SQL queries
- Describe tables/schema
- List tables
- Query planning

### 4. SQLite Server

**Purpose:** Local SQLite database access

```json
{
  "sqlite": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-sqlite",
      "--db-path", "./data/app.db"
    ]
  }
}
```

### 5. Puppeteer Server

**Purpose:** Browser automation

```json
{
  "puppeteer": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
  }
}
```

**Capabilities:**
- Navigate to URLs
- Take screenshots
- Click elements
- Fill forms
- Execute JavaScript

### 6. Memory Server

**Purpose:** Persistent context across sessions

```json
{
  "memory": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"]
  }
}
```

**Capabilities:**
- Store key-value pairs
- Retrieve stored information
- List stored keys
- Delete entries

### 7. Playwright Server

**Purpose:** Advanced browser automation for testing

```json
{
  "playwright": {
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-server-playwright"]
  }
}
```

**Capabilities:**
- Multi-browser support
- Network interception
- Device emulation
- Screenshot/video recording
- Trace generation

## Security Best Practices

### 2025 Security Updates (RFC 8707)

MCP clients must implement **Resource Indicators** to prevent token misuse:

```json
{
  "security": {
    "resourceIndicators": true,
    "tokenScope": "mcp-server-specific"
  }
}
```

### General Security Guidelines

1. **Principle of Least Privilege**
   ```json
   {
     "filesystem": {
       "command": "npx",
       "args": ["-y", "@modelcontextprotocol/server-filesystem",
                "./src", "./tests"],
       "readOnly": false,
       "allowedOperations": ["read", "write", "list"]
     }
   }
   ```

2. **Environment Variables for Secrets**
   ```json
   {
     "github": {
       "env": {
         "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
       }
     }
   }
   ```

3. **Rate Limiting**
   ```json
   {
     "server": {
       "rateLimits": {
         "requests": 100,
         "window": "1m"
       }
     }
   }
   ```

4. **Access Control**
   - Servers define exactly what actions are allowed
   - AI cannot access anything beyond explicit exposure
   - Implement consent and authorization flows

## Production Deployment

### Kubernetes Configuration

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-server
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
  template:
    spec:
      containers:
      - name: mcp-server
        image: mcp-server:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
```

### Configuration Management

```yaml
# config.yaml
server:
  name: "qa-automation-mcp"
  version: "1.0.0"
  timeout: 30
  maxConnections: 100

logging:
  level: INFO
  format: json

security:
  authRequired: true
  rateLimits:
    requests: 10000
    window: "1h"

# Production overrides
production:
  logging:
    level: WARN
  security:
    rateLimits:
      requests: 100000
```

## Error Handling

### Standard Error Classification

```typescript
interface MCPError {
  code: number;
  message: string;
  details?: Record<string, unknown>;
}

// Error codes
const MCP_ERRORS = {
  CLIENT_ERROR: 400,      // Bad request from client
  AUTH_ERROR: 401,        // Authentication failed
  FORBIDDEN: 403,         // Insufficient permissions
  NOT_FOUND: 404,         // Resource not found
  SERVER_ERROR: 500,      // Internal server error
  EXTERNAL_ERROR: 502,    // External dependency failed
  UNAVAILABLE: 503,       // Service temporarily unavailable
};
```

## Building Custom MCP Servers

### TypeScript SDK

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "custom-qa-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Define tools
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "run_tests",
      description: "Execute test suite",
      inputSchema: {
        type: "object",
        properties: {
          testPattern: { type: "string" },
          browser: { type: "string", enum: ["chromium", "firefox", "webkit"] }
        }
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "run_tests") {
    const result = await executeTests(args.testPattern, args.browser);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Python SDK

```python
from mcp.server import Server
from mcp.server.stdio import stdio_server

server = Server("custom-qa-server")

@server.tool()
async def run_tests(test_pattern: str, browser: str = "chromium") -> str:
    """Execute test suite with specified parameters."""
    result = await execute_tests(test_pattern, browser)
    return json.dumps(result)

async def main():
    async with stdio_server() as streams:
        await server.run(
            streams[0], streams[1],
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## MCP Registry

Browse available servers at the [MCP Registry](https://github.com/modelcontextprotocol/servers).

### Popular Community Servers

| Server | Purpose | Repository |
|--------|---------|------------|
| Brave Search | Web search | modelcontextprotocol/servers |
| Fetch | HTTP requests | modelcontextprotocol/servers |
| Sentry | Error tracking | modelcontextprotocol/servers |
| Linear | Project management | Community |
| Notion | Documentation | Community |
| Jira | Issue tracking | Community |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Server not starting | Check npx/npm installation, verify command |
| Auth failures | Verify environment variables are set |
| Timeout errors | Increase timeout in configuration |
| Permission denied | Check file/directory permissions |
| Connection refused | Verify server is running and port is correct |

## Resources

- [MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18)
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [MCP Best Practices](https://modelcontextprotocol.info/docs/best-practices/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
