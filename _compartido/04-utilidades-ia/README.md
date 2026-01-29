# 🔧 Utilidades de IA

Pequeñas herramientas y archivos de configuración global que optimizan el trabajo diario con asistentes de IA.

## 📁 Contenido

- **[.aiignore](./.aiignore)**: Un archivo universal que indica a las herramientas de IA qué archivos omitir (como `node_modules`, archivos temporales o carpetas de build). Muy importante para no gastar tokens innecesarios.
- **[mcp-servers.json](./mcp-servers.json)**: Configuraciones para el Model Context Protocol, permitiendo que la IA interactúe con el sistema de archivos, bases de datos o servicios externos.
- **[sync-ai-context.sh](./sync-ai-context.sh)**: Un pequeño script para sincronizar archivos de contexto entre diferentes herramientas.

## 🚀 Cómo usar

1. **.aiignore**: Cópialo directamente a la raíz de tu repositorio.
2. **MCP**: Usa el JSON para configurar tu cliente de MCP (como el de Claude Desktop o Cursor).
