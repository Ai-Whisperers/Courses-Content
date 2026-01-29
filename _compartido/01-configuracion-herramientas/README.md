# 🚀 Mega-Guía de Configuración IA (Copy-Paste)

Esta carpeta contiene lo **mejor de lo mejor** en configuraciones para herramientas de IA de 2026. Hemos investigado qué están haciendo las comunidades de GitHub (Airbnb, Anthropic, Cursor Community) para que tú solo tengas que copiar y pegar.

## 🛠️ ¿Qué herramienta usas?

### [1. Claude Code](./claude/)

- **Lo mejor**: `CLAUDE.md` optimizado para no gastar tokens innecesarios y `/commands` personalizados para review automático.
- **Instrucciones**: Copia la carpeta `.claude/` y el archivo `CLAUDE.md` a la raíz de tu proyecto.

### [2. Cursor](./cursor/)

- **Lo mejor**: Reglas modulares `.mdc` que le explican a Cursor exactamente cómo codificar en tu proyecto.
- **Instrucciones**: Copia la carpeta `.cursor/` a la raíz de tu proyecto.

### [3. GitHub Copilot](./copilot/)

- **Lo mejor**: Instrucciones repo-wide en `.github/` para que Copilot deje de sugerir código "basura".
- **Instrucciones**: Copia la carpeta `.github/` a la raíz de tu proyecto.

### [4. Windsurf](./windsurf/)

- **Lo mejor**: Reglas tipo XML para Cascade que aseguran que la IA no se vuelva loca borrando archivos.
- **Instrucciones**: Copia el archivo `.windsurf-rules.md` a la raíz.

---

## 💡 Pro-Tip Estudiantil

Si estás trabajando en un proyecto nuevo, el orden recomendado es:

1. Copia el `.aiignore` de [04-utilidades-ia/](../04-utilidades-ia/).
2. Copia la configuración de tu herramienta favorita de esta carpeta.
3. Personaliza el archivo principal (como `CLAUDE.md` o `repo.mdc`) con el nombre de tu proyecto.
