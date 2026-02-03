# Configuración del Servidor MCP para Fusion 360

Has creado un servidor MCP personalizado para conectar la IA con Fusion 360.

## 1. Obtener la Ruta Absoluta
Ejecuta este comando en tu terminal para obtener la ruta completa al script del servidor:

```bash
# Windows (PowerShell)
(Get-Item "cursos/02-desarrollo/FPUNA-2026/03-INGENIERIA-AERONAUTICA/modules/01-cad-with-ai/fusion-scripts/fusion_mcp_server.py").FullName
```

## 2. Agregar a la Configuración de Claude Desktop
Edita tu archivo `%APPDATA%\Claude\claude_desktop_config.json` y agrega esta entrada:

```json
{
  "mcpServers": {
    "fusion-bridge": {
      "command": "python",
      "args": [
        "C:/RUTA/ABSOLUTA/A/fusion_mcp_server.py"
      ]
    }
  }
}
```
*(Reemplaza `C:/RUTA/ABSOLUTA/A...` con la ruta que obtuviste en el Paso 1)*

## 3. Reiniciar Claude Desktop
Una vez reiniciado, la IA tendrá una nueva herramienta: `execute_fusion_script`.

## 4. Uso
Ahora puedes decir:
> "Usa la herramienta de Fusion para crear un cilindro de 50mm de diametro y 100mm de altura."

La IA usara la herramienta MCP en lugar de solo escribir texto.

