# 🏁 Tarea 01: Setup Inicial del Entorno

**Objetivo**: Preparar tu computadora para el curso en menos de 15 minutos.  
**Stack de Herramientas**: Antigravity (IDE) + OpenCode (IA) + Oh My OpenCode (Framework)

---

## 🚀 Parte 1: Instalación de Herramientas (5 min)

Necesitamos dos piezas clave de software: tu entorno de trabajo (IDE) y tu copiloto de IA.

### 1. Instala Antigravity (Tu Nuevo IDE)

Usaremos Antigravity en lugar de VS Code por sus capacidades nativas de IA.

1.  🔗 **Descargar**: Ve a [antigravity.google](https://antigravity.google/) y descarga la versión para tu sistema.
2.  📥 **Instalar**: Ejecuta el instalador y sigue los pasos (Siguiente > Siguiente > Instalar).
3.  🔑 **Login**:
    - Abre Antigravity.
    - Busca el botón **"Sign In"** (usualmente arriba a la derecha).
    - Inicia sesión con tu **cuenta de Google**.

### 2. Instala OpenCode (Tu Copiloto IA)

Esta es la inteligencia que configurará todo lo demás.

1.  🔗 **Descargar**: Ve a [opencode.ai](https://opencode.ai/).
2.  📥 **Instalar**: Descarga e instala la aplicación de escritorio.
3.  🔑 **Login**:
    - Abre OpenCode.
    - Si es la primera vez, te pedirá crear cuenta o iniciar sesión.
    - Usa tu correo personal o universitario.
    - **Importante**: Asegúrate de que veas el chat "listo para escribir" antes de seguir.

---

## 🤖 Parte 2: El Mega Prompt de Configuración (10 min)

Ahora usaremos **OpenCode** para instalar "Oh My OpenCode" (OMO) y configurar tu entorno automáticamente. Este prompt es "inteligente" y detectará tu sistema operativo.

### Instrucciones:

1.  Abre la aplicación **OpenCode**.
2.  **Verificación**: Asegúrate de ver tu foto de perfil o iniciales en la esquina (indicando que estás logueado).
3.  Ve al chat principal.
4.  **Copia y pega** el siguiente bloque de texto EXACTAMENTE como está.
5.  Presiona **Enter** y sigue las instrucciones que te dé la IA.

### 📋 Copia esto en OpenCode:

```markdown
Hola OpenCode. Actúa como un Ingeniero Senior de DevOps del curso FPUNA 2026.

Tu misión es configurar mi entorno con el stack: Antigravity + OpenCode + OMO.
Por favor, analiza mi sistema operativo (Windows/Mac/Linux) y ejecuta las siguientes acciones paso a paso.
Si encuentras un error, detente y explícame cómo solucionarlo (ej: permisos de administrador).

PASO 1: VERIFICACIÓN DE PERMISOS Y SISTEMA

1. Detecta mi SO.
2. **Si es Windows**: Verifica si la ExecutionPolicy de PowerShell permite scripts (`Get-ExecutionPolicy`). Si es 'Restricted', indícame el comando para cambiarlo a 'RemoteSigned'.
3. **Si es Mac/Linux**: Verifica si necesito usar `sudo` para instalaciones globales.

PASO 2: VERIFICACIÓN BASE

1. Verifica **Node.js**: Debe ser versión 18 o superior (`node -v`). Si no está, dime exactamente qué instalador bajar.
2. Verifica **Git**: (`git --version`). Si no está, dame el comando para instalarlo.
3. Verifica permisos de escritura en carpetas globales de npm.

PASO 3: INSTALACIÓN DE OPENCODE

Sitio oficial: https://opencode.ai/

1. **Todas las plataformas (RECOMENDADO)**: Ejecuta `npm install -g opencode-ai@latest`
2. **macOS/Linux (alternativa)**: Ejecuta `curl -fsSL https://opencode.ai/install | bash`
3. Si falla por permisos, usa `sudo npm install -g opencode-ai@latest` (Mac/Linux) o ejecuta como Admin (Windows).
4. Verifica la instalación: `opencode --version`
5. Para abrir OpenCode, simplemente escribe: `opencode`

PASO 4: SETUP DEL WORKSPACE

1. Crea una carpeta `fpuna-2026-workspace` en Documentos.
2. Inicializa OMO: `omo init` (Project: fpuna-2026).
3. Crea un `.gitignore` estándar para desarrollo web y python.

PASO 5: HERRAMIENTAS Y CONECTORES (MCPs)
Instala los MCPs necesarios para el curso:

1. `omo mcp install filesystem`
2. `omo mcp install git`
3. `omo mcp install web`

PASO 6: PRUEBA DE FUEGO

1. Crea un archivo `setup-log.md` en la carpeta del proyecto.
2. Escribe: "Configuración de Antigravity + OMO completada con éxito en [SO DETECTADO]".
3. Imprime la ruta completa de la carpeta creada para que pueda abrirla.

Avísame cuando todo esté listo para cerrar esta ventana y empezar a programar en Antigravity.
```

---

## ✅ ¿Cómo sé si terminé?

Cuando OpenCode te diga **"Configuración completada"**:

1.  Abre **Antigravity**.
2.  Ve a `Archivo > Abrir Carpeta` y selecciona la ruta que te dio el prompt (usualmente `.../Documentos/fpuna-2026-workspace`).
3.  Si ves el archivo `setup-log.md`, ¡felicidades! 🎉

Ya tienes el "Tridente de Poder":

- [x] **Antigravity**: Para escribir código.
- [x] **OpenCode**: Para generar soluciones.
- [x] **OMO**: Para supervitaminar tu flujo de trabajo.

---

## ⚡ Nivel 2: Setup Avanzado (Opcional)

Si quieres desbloquear todo el potencial, instala estos "superpoderes" adicionales.

### Copia y pega este segundo prompt en OpenCode:

```markdown
Hola de nuevo. Quiero llevar mi entorno al siguiente nivel.
Por favor, instala estos MCPs avanzados si es posible:

1. **Brave Search**: `omo mcp install brave-search` (Para que puedas buscar en internet en tiempo real).
2. **Memory Service**: `omo mcp install memory` (Para que recuerdes mis preferencias entre sesiones).
3. **PostgreSQL**: `omo mcp install postgres` (Para estar listo para el track de desarrollo web).

Verifica que se hayan instalado correctamente con `omo mcp list`.
```

---

## 🆘 Solución de Problemas Comunes

### 1. "No se puede cargar porque la ejecución de scripts está deshabilitada" (Windows)

Esto es seguridad de Windows.

- **Solución**: Abre PowerShell como Administrador y ejecuta: `Set-ExecutionPolicy RemoteSigned`

### 2. "EACCES: permission denied" (Mac/Linux)

No tienes permisos para instalar en carpetas del sistema.

- **Solución A**: Usa el paquete oficial: `sudo npm install -g opencode-ai@latest`
- **Solución B**: Usa el script de instalación: `curl -fsSL https://opencode.ai/install | bash`

### 3. "npm command not found"

No instalaste Node.js o no reiniciaste la terminal.

- **Solución**: Instala Node.js v18 (LTS) desde [nodejs.org](https://nodejs.org/en/download/) y reinicia tu computadora.

---

**Siguiente paso**: Ve al [Módulo 00 - Fundamentos](../00-FUNDAMENTOS/README.md).
