# Solución de Problemas - MCPs

## Problemas Comunes y Soluciones

---

## Error: "MCP server not found"

**Síntoma**: OpenCode no encuentra el servidor MCP.

**Causas**:
1. Paquete npm no instalado
2. Ruta incorrecta en configuración
3. Comando incorrecto

**Solución**:

```bash
# 1. Verificar instalación
npm list -g @modelcontextprotocol/server-NOMBRE

# 2. Si no está instalado
npm install -g @modelcontextprotocol/server-NOMBRE

# 3. Verificar configuración JSON
# Usar https://jsonlint.com/ para validar
```

---

## Error: "Invalid JSON in mcp-config.json"

**Síntoma**: OpenCode no carga configuración.

**Causas**:
- Coma extra al final
- Comillas faltantes
- Llaves no cerradas

**Solución**:

```bash
# Validar JSON online
# Copiar contenido de mcp-config.json
# Pegar en https://jsonlint.com/
```

**Errores comunes**:

```json
// MAL ❌
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "..."],  // ← Coma extra
    }  // ← Coma extra
  }
}

// BIEN ✅
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "..."]
    }
  }
}
```

---

## Error: "API key invalid" o "Authentication failed"

**Solución**:

```bash
# 1. Verificar variable de entorno
echo $VARIABLE_NAME  # Linux/macOS
echo %VARIABLE_NAME%  # Windows CMD
echo $env:VARIABLE_NAME  # Windows PowerShell

# 2. Si está vacía, configurarla
export VARIABLE_NAME="valor"  # Linux/macOS
$env:VARIABLE_NAME="valor"   # PowerShell

# 3. Para hacerla permanente
# Linux/macOS: Agregar a ~/.bashrc o ~/.zshrc
echo 'export VARIABLE_NAME="valor"' >> ~/.bashrc

# Windows: Variables de entorno del sistema
```

---

## Error: "Permission denied" al acceder archivos

**Solución**:

```bash
# 1. Verificar permisos de carpeta
ls -la /ruta/carpeta  # Linux/macOS
dir /ruta/carpeta     # Windows

# 2. Dar permisos
chmod 755 /ruta/carpeta  # Linux/macOS

# 3. Verificar que ruta en mcp-config.json es correcta
# Usar ruta ABSOLUTA, no relativa
# Windows: Usar doble backslash C:\\Users\\...
```

---

## Error: "Database connection failed"

**Solución**:

```bash
# 1. Verificar que BD está corriendo
# PostgreSQL
pg_isready

# MongoDB
mongosh --eval "db.adminCommand('ping')"

# 2. Verificar connection string
# Formato: protocol://user:pass@host:port/dbname

# 3. Probar conexión manualmente
psql -U usuario -d nombre_db  # PostgreSQL
mongosh "mongodb://localhost:27017/dbname"  # MongoDB
```

---

## MCP se carga pero no funciona

**Diagnóstico**:

```bash
# 1. Verificar logs
# Windows
type %USERPROFILE%\.opencode\logs\mcp.log

# macOS/Linux
cat ~/.opencode/logs/mcp.log

# 2. Reiniciar OpenCode completamente
# Cerrar todas las instancias
```

---

## Recursos

- 📖 [Guía Principal de MCPs](./README.md)
- 📖 [Instalación de MCPs](./installing-mcps.md)
- 📖 [Ejemplos de Configuración](./config-examples.md)

**Soporte FPUNA**: soporte-ia@fpuna.edu.py

---

*Guía creada para FPUNA Summer 2026*
