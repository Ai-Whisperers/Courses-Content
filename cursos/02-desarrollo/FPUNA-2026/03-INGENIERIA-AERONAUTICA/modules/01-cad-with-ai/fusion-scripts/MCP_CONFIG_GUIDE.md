# Fusion 360 MCP Server Configuration

You have created a custom MCP Server to bridge the AI with Fusion 360.

## 1. Get the Absolute Path
Run this command in your terminal to get the full path to the server script:

```bash
# Windows (PowerShell)
(Get-Item "cursos/02-development/FPUNA-2026/03-INGENIERIA-AERONAUTICA/modules/01-cad-with-ai/fusion-scripts/fusion_mcp_server.py").FullName
```

## 2. Add to Claude Desktop Config
Edit your `%APPDATA%\Claude\claude_desktop_config.json` and add this entry:

```json
{
  "mcpServers": {
    "fusion-bridge": {
      "command": "python",
      "args": [
        "C:/ABSOLUTE/PATH/TO/fusion_mcp_server.py" 
      ]
    }
  }
}
```
*(Replace `C:/ABSOLUTE/PATH/TO...` with the path you got in Step 1)*

## 3. Restart Claude Desktop
Once restarted, the AI will have a new tool: `execute_fusion_script`.

## 4. Usage
You can now say:
> "Use the Fusion tool to create a cylinder of diameter 50mm and height 100mm."

The AI will use the MCP tool instead of just writing text.

