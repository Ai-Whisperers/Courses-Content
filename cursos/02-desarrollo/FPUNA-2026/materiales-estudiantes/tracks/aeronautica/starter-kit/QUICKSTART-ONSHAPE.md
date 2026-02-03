# 🚀 Quickstart: Onshape MCP Setup

Esta guía te ayudará a obtener tus llaves de acceso para conectar OpenCode con Onshape.

## 1. Crear Cuenta de Desarrollador

1.  Ve a [dev-portal.onshape.com](https://dev-portal.onshape.com/).
2.  Inicia sesión con tu cuenta de Onshape (la misma que usas para diseñar).

## 2. Crear Claves de API (API Keys)

1.  Haz clic en la pestaña **API keys** (menú izquierdo).
2.  Haz clic en **Create new API key**.
3.  **Application Name**: Ponle `OpenCode Assistant`.
4.  **Permissions** (Importante): Selecciona las siguientes casillas:
    - `Read` (Lectura)
    - `Write` (Escritura)
    - `Delete` (Borrar - opcional, pero útil para limpiar pruebas)
5.  Haz clic en **Create**.

## 3. Configurar en Claude Desktop

1.  Copia tu **Access Key** y tu **Secret Key**.
2.  Abre el archivo de configuración:
    - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
    - O edita el archivo `starter-kit/claude_desktop_config.json` en este proyecto.
3.  Reemplaza los valores de marcador de posición:

```json
"onshape": {
  "command": "npx",
  "args": ["-y", "@hedless/onshape-mcp-server"],
  "env": {
    "ONSHAPE_ACCESS_KEY": "TU_ACCESS_KEY_AQUI",
    "ONSHAPE_SECRET_KEY": "TU_SECRET_KEY_AQUI"
  }
}
```

## 4. Verificar Conexión

1.  Reinicia Claude Desktop.
2.  Busca el icono de "enchufe" 🔌 en la entrada de chat.
3.  Deberías ver `onshape` en la lista de herramientas disponibles.
4.  Prueba el siguiente comando:
    > "Lista mis documentos recientes en Onshape"

---

### Solución de Problemas

- **Error "Unauthorized"**: Verificaste mal las keys. Vuelve a generarlas.
- **No aparece la herramienta**: Verifica que tienes Node.js instalado (`node --version`).
