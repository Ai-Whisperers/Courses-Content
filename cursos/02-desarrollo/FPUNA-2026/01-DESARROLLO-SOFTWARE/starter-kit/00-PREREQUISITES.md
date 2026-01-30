# 📋 Requisitos del Entorno (Lead Architect)

Para este track de Software Development 2026, tu entorno debe ser un reflejo de tu precisión técnica.

---

## ⚙️ Stack de Herramientas (Pre-instalado)

Desde la Semana 1, ya deberías contar con:

1.  **Herramienta de Comando Central**:
    - **OpenCode** (Gemini/Claude API configurada).
    - **Oh My OpenCode** instalado (`npx ohmyopencode init`).

2.  **Entorno de Ejecución**:
    - **Node.js 20+** (LTS recomendado).
    - **Docker Desktop** (Fundamental para infraestructura inmutable).
    - **GIT** (Configurado con GitHub/GitLab).

3.  **Editor de Élite**:
    - **VS Code** con extensiones de:
      - SonarLint (Calidad en tiempo real).
      - Prisma/SQL (Exploración de datos).
      - Docker Support.
      - Playwright (Testing visual).

---

## 🧪 Verificación de Salud del Entorno

Ejecuta estos comandos para asegurar que estás listo para la orquestación:

```bash
# Verificar runtime
node --version # Mínimo v20.x

# Verificar orquestación
docker --version # Debe estar activo

# Verificar agentes
opencode --version
```

---

## 🛡️ Configuración de Seguridad

Como Lead Architect, tu seguridad no es negociable:

- Nunca guardes archivos `.env` en el repositorio.
- Configura un `.gitignore` global que incluya `node_modules`, `dist` y secretos.
- Antes de cada ejercicio, asegúrate de que tu agente de IA tenga acceso al contexto del proyecto (vía `CLAUDE.md`).

---

_FPUNA 2026 - Preparados para la Ingeniería de Élite._
