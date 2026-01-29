# 📂 Recursos Compartidos para Estudiantes

Esta carpeta contiene configuraciones, plantillas y herramientas estandarizadas que puedes usar en tus proyectos. Aquí te explicamos cómo usar cada sección de manera lógica.

---

## 🏗️ Estructura de la Carpeta

### [01-configuracion-herramientas](./01-configuracion-herramientas/)

**¿Qué es?**: Configuraciones optimizadas para diferentes IDEs y herramientas de IA (Claude, Cursor, Copilot, etc.).
**¿Qué copiar?**: Si usas **Claude Code**, copia el contenido de `claude/` a la raíz de tu proyecto. Si usas **Cursor**, usa la carpeta `cursor/`.

### [02-estandares-y-calidad](./02-estandares-y-calidad/)

**¿Qué es?**: Reglas de linting, configuraciones de testing (Playwright, Jest, Pytest) y estándares de lenguaje.
**¿Qué copiar?**: Copia los archivos de configuración (como `playwright.config.ts` o `.eslintrc.js`) a tu proyecto para seguir los mismos estándares que usamos en el curso.

### [03-plantillas-de-contexto](./03-plantillas-de-contexto/)

**¿Qué es?**: Archivos base que ayudan a la IA a entender tu proyecto.
**¿Qué copiar?**: El archivo `CLAUDE-base.md` es un excelente punto de partida para tu archivo `CLAUDE.md` personalizado.

### [04-utilidades-ia](./04-utilidades-ia/)

**¿Qué es?**: Herramientas técnicas para mejorar la interacción con la IA.
**¿Qué copiar?**:

- `.aiignore`: Cópialo a tu raíz para que la IA no pierda tiempo leyendo archivos innecesarios (como `node_modules`).
- `mcp-servers.json`: Configuración para servidores de Model Context Protocol.

---

## 🚀 ¿Por qué usar esto?

1. **Eficiencia**: No tienes que configurar todo desde cero.
2. **Consistencia**: Tus proyectos seguirán las mismas reglas que los ejemplos del curso.
3. **Mejor IA**: Estas configuraciones ayudan a que la IA sea más precisa y cometa menos errores.
