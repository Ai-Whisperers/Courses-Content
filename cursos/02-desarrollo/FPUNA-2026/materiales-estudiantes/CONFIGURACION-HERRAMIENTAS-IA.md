# FPUNA 2026 - Guía de Configuración de Herramientas de IA
## OpenCode + Oh My OpenCode (OMO) - Configuración

**Programa**: Desarrollo Aumentado con IA - Verano 2026
**Propósito**: Guía completa de configuración del entorno de desarrollo con IA
**Tiempo**: 2-3 horas (Semana 1, Día 1-2)

---

## Tabla de Contenidos

1. [Prerrequisitos](#prerrequisitos)
2. [Instalación de OpenCode](#instalación-de-opencode)
3. [Configuración de Oh My OpenCode (OMO)](#configuración-de-oh-my-opencode-omo)
4. [Configuración](#configuración)
5. [Verificación](#verificación)
6. [Solución de Problemas](#solución-de-problemas)
7. [Configuración Específica por Track](#configuración-específica-por-track)

---

## Prerrequisitos

### Requisitos del Sistema

**Sistema Operativo**:
- ✅ Windows 10/11 (64-bit)
- ✅ macOS 11+ (Big Sur o posterior)
- ✅ Linux (Ubuntu 20.04+, Fedora 35+)

**Hardware Mínimo**:
- **RAM**: 8 GB (16 GB recomendado)
- **Almacenamiento**: 10 GB de espacio libre
- **Procesador**: Intel i5 / AMD Ryzen 5 o superior
- **Internet**: Conexión estable (para llamadas a API de IA)

---

### Software Requerido

Instalar ANTES de OpenCode:

#### 1. Node.js (Requerido)

**Versión**: 18.x o posterior

**Windows**:
```bash
# Descargar instalador desde nodejs.org
# Ejecutar instalador, usar configuración predeterminada
# Reiniciar terminal después de instalar
```

**macOS**:
```bash
# Usando Homebrew
brew install node@18

# Verificar
node --version  # Debe mostrar v18.x.x
npm --version   # Debe mostrar 9.x.x
```

**Linux (Ubuntu/Debian)**:
```bash
# Usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar
node --version
npm --version
```

---

#### 2. Git (Requerido)

**Windows**:
```bash
# Descargar desde git-scm.com
# Instalar con configuración predeterminada
# Seleccionar "Git from command line and also from 3rd-party software"
```

**macOS**:
```bash
# Usando Homebrew
brew install git

# O instalar Xcode Command Line Tools
xcode-select --install
```

**Linux**:
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo dnf install git      # Fedora
```

**Verificar**:
```bash
git --version
```

---

#### 3. VS Code (Recomendado)

**Todas las Plataformas**:
- Descargar desde [code.visualstudio.com](https://code.visualstudio.com/)
- Instalar con configuración predeterminada
- Abrir VS Code para verificar

**Extensiones a Instalar** (hacerlo después):
- Extensión OpenCode
- GitLens
- Prettier
- ESLint/TSLint

---

## Instalación de OpenCode

### Acerca de OpenCode

OpenCode es un agente de IA de código abierto que te ayuda a escribir código desde la terminal, IDE o escritorio. Cuenta con más de 95,000 estrellas en GitHub y es utilizado por 2.5 millones de desarrolladores.

**Sitio Oficial**: [https://opencode.ai/](https://opencode.ai/)

**Características**:
- Compatible con 75+ proveedores de LLM (Claude, GPT, Gemini, modelos locales)
- Funciona en terminal, escritorio (Windows, macOS, Linux) y extensiones IDE
- Integración con GitHub Copilot y ChatGPT Plus/Pro
- Sesiones múltiples en paralelo
- Privacidad: no almacena tu código

---

### Paso 1: Instalar OpenCode

**Opción A: Script de Instalación** (Recomendado para macOS/Linux)
```bash
curl -fsSL https://opencode.ai/install | bash
```

**Opción B: NPM** (Todas las plataformas)
```bash
npm install -g opencode
```

**Opción C: Homebrew** (macOS)
```bash
brew install opencode
```

**Opción D: Pacman** (Arch Linux)
```bash
pacman -S opencode
```

---

### Paso 2: Verificar Instalación

```bash
# Verificar versión
opencode --version

# Debe mostrar la versión instalada
```

**Si dice "comando no encontrado"**:
- Reiniciar la terminal
- Verificar que Node.js esté instalado correctamente
- En Windows, abrir una nueva ventana de PowerShell/CMD

---

### Paso 3: Primera Ejecución

```bash
# Iniciar OpenCode
opencode

# Esto abrirá el agente en tu terminal
```

**Configurar proveedor de IA**:
- OpenCode soporta múltiples proveedores (Claude, GPT, Gemini, etc.)
- Puedes usar tu cuenta de GitHub Copilot o ChatGPT Plus
- También puedes configurar APIs directamente

**Comandos útiles**:
```bash
opencode --help          # Ver ayuda
opencode config          # Configurar preferencias
opencode                 # Iniciar sesión interactiva
```

---

## Configuración de Oh My OpenCode (OMO)

### ¿Qué es OMO?

**Oh My OpenCode** es una capa de mejora que añade:
- **MCPs** (Proveedores de Contexto de Modelo) - Conectar a herramientas externas
- **Skills** - Capacidades preconstruidas
- **Hooks** - Disparadores de automatización
- **Rules** - Reglas específicas del proyecto

---

### Paso 1: Instalar OMO

```bash
# Instalar OMO globalmente
npm install -g oh-my-opencode

# Verificar instalación
omo --version

# Debe mostrar: Oh My OpenCode v2.x.x
```

---

### Paso 2: Inicializar OMO

```bash
# En tu directorio de trabajo
mkdir fpuna-2026
cd fpuna-2026

# Inicializar OMO
omo init

# Seguir los prompts:
# - Nombre del proyecto: fpuna-2026
# - Tipo: Educational
# - Framework: Multi-track
```

**Esto crea**:
```
fpuna-2026/
├── .omo/
│   ├── config.json
│   ├── mcps/
│   ├── skills/
│   ├── hooks/
│   └── rules/
└── .omoignore
```

---

### Paso 3: Instalar MCPs Básicos

**MCPs = Proveedores de Contexto de Modelo** (conectan a herramientas)

```bash
# MCP de Sistema de archivos (acceso a archivos)
omo mcp install filesystem

# MCP de Git (control de versiones)
omo mcp install git

# MCP Web (obtener contenido web)
omo mcp install web

# Verificar
omo mcp list
```

**Salida Esperada**:
```
MCPs Instalados:
✓ filesystem v1.2.0
✓ git v1.1.0
✓ web v1.0.5
```

---

### Paso 4: Instalar Skills Universales

**Skills = Capacidades preconstruidas**

```bash
# Skill de generación de código
omo skill install code-gen

# Skill de depuración
omo skill install debug

# Skill de documentación
omo skill install docs

# Verificar
omo skill list
```

---

## Configuración

### Configuración de OpenCode

**Editar**: `~/.opencode/config.json`

```json
{
  "ai": {
    "provider": "claude",
    "model": "claude-3-5-sonnet",
    "temperature": 0.7,
    "maxTokens": 4000
  },
  "editor": {
    "default": "vscode",
    "autoSave": true,
    "formatOnSave": true
  },
  "git": {
    "autoCommit": false,
    "commitStyle": "conventional"
  }
}
```

---

### Configuración de OMO

**Editar**: `fpuna-2026/.omo/config.json`

```json
{
  "project": {
    "name": "fpuna-2026",
    "type": "educational",
    "framework": "multi-track"
  },
  "mcps": {
    "enabled": ["filesystem", "git", "web"],
    "autoUpdate": true
  },
  "skills": {
    "enabled": ["code-gen", "debug", "docs"],
    "custom": []
  },
  "hooks": {
    "enabled": true,
    "preCommit": true,
    "postGenerate": true
  },
  "rules": {
    "enabled": true,
    "strictMode": false
  }
}
```

---

## Verificación

### Lista de Verificación Completa

Ejecuta estos comandos para verificar que todo funciona:

```bash
# 1. Verificar Node.js
node --version
npm --version

# 2. Verificar Git
git --version

# 3. Verificar OpenCode
opencode --version
opencode test

# 4. Verificar OMO
omo --version
omo status

# 5. Verificar MCPs
omo mcp list

# 6. Verificar Skills
omo skill list

# 7. Prueba de extremo a extremo
omo generate "Crea una función simple de Hola Mundo en TypeScript"
```

**Todas las verificaciones deben pasar** ✅

---

### Proyecto de Prueba

Crea una prueba para verificar que todo funciona:

```bash
# Crear directorio de prueba
mkdir test-opencode
cd test-opencode

# Inicializar
omo init --quick

# Generar código de prueba
omo generate "Crea una función TypeScript que sume dos números"

# Verificar que se creó el archivo
ls *.ts
```

**Esperado**: archivo `add.ts` creado con código funcional

---

## Solución de Problemas

### Problemas Comunes

#### Problema 1: "opencode: comando no encontrado"

**Solución**:
```bash
# Windows
# Agregar al PATH: C:\Program Files\OpenCode\bin
# Reiniciar terminal

# macOS/Linux
echo 'export PATH="$PATH:/usr/local/bin/opencode"' >> ~/.bashrc
source ~/.bashrc
```

---

#### Problema 2: "omo: comando no encontrado"

**Solución**:
```bash
# Verificar ruta global de npm
npm config get prefix

# Debe estar en el PATH
# Si no, agregarlo:
export PATH="$PATH:$(npm config get prefix)/bin"

# Reinstalar OMO
npm install -g oh-my-opencode
```

---

#### Problema 3: "Permission denied" (macOS/Linux)

**Solución**:
```bash
# Arreglar permisos de npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# O usar NVM (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

---

#### Problema 4: OpenCode "Conexión fallida"

**Causas**:
- Sin conexión a internet
- Firewall bloqueando
- Clave API inválida

**Solución**:
```bash
# Probar internet
ping google.com

# Verificar firewall
# Permitir OpenCode a través del Firewall de Windows o macOS

# Re-iniciar sesión
opencode logout
opencode login
```

---

#### Problema 5: MCPs de OMO no funcionan

**Solución**:
```bash
# Reinstalar MCPs
omo mcp uninstall --all
omo mcp install filesystem git web

# Verificar
omo mcp test filesystem
```

---

### Obtener Ayuda

**Si estás atascado**:
1. Revisa [Documentación de OpenCode](https://docs.opencode.dev)
2. Revisa [Documentación de OMO](https://docs.omo.dev)
3. Pregunta en Slack: `#soporte-tecnico`
4. Email: `soporte-ia@fpuna.edu.py`

**Incluir en solicitud de ayuda**:
- Sistema operativo
- Mensaje de error (texto completo)
- Comandos que ejecutaste
- Capturas de pantalla

---

## Configuración Específica por Track

### Track 07: Automatización QA

**MCPs Adicionales**:
```bash
omo mcp install playwright
omo mcp install test-runner
```

**Skills Adicionales**:
```bash
omo skill install qa/test-generation
omo skill install qa/page-object
omo skill install qa/api-testing
```

**Verificar**:
```bash
# Verificar Playwright
npx playwright --version

# Debe mostrar: Version 1.x.x
```

---

### Track 08: Desarrollo Web

**MCPs Adicionales**:
```bash
omo mcp install nextjs
omo mcp install prisma
omo mcp install vercel
```

**Skills Adicionales**:
```bash
omo skill install web/component-gen
omo skill install web/api-routes
omo skill install web/database-schema
```

**Verificar**:
```bash
# Verificar Next.js
npx next --version

# Verificar Prisma
npx prisma --version
```

---

### Otros Tracks (Cuando Estén Disponibles)

**Track 01 (Desarrollo de Software)**:
- MCP de Docker
- MCP de Kubernetes
- MCPs de proveedores cloud

**Track 02 (Electrónica)**:
- MCP de KiCad
- MCP de Arduino
- MCP de PlatformIO

*Detalles proporcionados cuando los tracks estén creados*

---

## Integración con VS Code

### Instalar Extensión de OpenCode

1. Abrir VS Code
2. Ir a Extensiones (Ctrl+Shift+X)
3. Buscar "OpenCode"
4. Hacer clic en Instalar
5. Recargar VS Code

---

### Configuración de VS Code

**Configuración** (`Ctrl + ,`):

```json
{
  "opencode.enabled": true,
  "opencode.inlineCompletions": true,
  "opencode.autoSave": true,
  "opencode.language": "es",

  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  "git.autofetch": true,
  "git.confirmSync": false
}
```

---

### Atajos de Teclado

**OpenCode en VS Code**:
- `Ctrl + Shift + Space` - Abrir prompt de OpenCode
- `Ctrl + Shift + G` - Generar código
- `Ctrl + Shift + E` - Explicar código
- `Ctrl + Shift + R` - Refactorizar código
- `Ctrl + Shift + T` - Generar pruebas

**Personalizar**: Archivo → Preferencias → Atajos de teclado

---

## Mejores Prácticas

### Qué Hacer ✅

- **Mantén las herramientas actualizadas**: `omo update`, `npm update -g`
- **Usa control de versiones**: Haz commits frecuentes con mensajes significativos
- **Valida las salidas de la IA**: No confíes ciegamente en el código generado
- **Guarda tu trabajo**: Auto-guardado + commits manuales
- **Usa skills**: No reinventes la rueda

### Qué NO Hacer ❌

- **No hagas commit de secretos**: Usa archivos `.env`, agrégalos a `.gitignore`
- **No te saltes la configuración**: Una configuración correcta previene problemas
- **No ignores errores**: Arréglalios temprano
- **No trabajes sin backups**: Git es tu amigo
- **No uses herramientas desactualizadas**: Actualiza regularmente

---

## Mantenimiento

### Mantenimiento Semanal

```bash
# Actualizar OpenCode
opencode update

# Actualizar OMO
npm update -g oh-my-opencode

# Actualizar MCPs
omo mcp update --all

# Actualizar Skills
omo skill update --all
```

---

### Mantenimiento Mensual

```bash
# Actualizar Node.js (verificar último LTS)
nvm install --lts
nvm use --lts

# Actualizar npm
npm install -g npm@latest

# Limpiar caché de npm
npm cache clean --force

# Verificar todo
opencode test
omo status
```

---

## Prácticas de Seguridad

### Protege Tus Claves API

**Nunca hagas commit de**:
- Claves API
- Tokens de autenticación
- Contraseñas de bases de datos
- Archivos `.env`

**Siempre usa**:
```bash
# .gitignore
.env
.env.local
secrets/
*.key
*.pem
```

---

### Configuración Segura

```bash
# Establecer permisos restrictivos
chmod 600 ~/.opencode/config.json
chmod 600 ~/.omo/config.json

# No compartas configuraciones
# (Pueden contener datos sensibles)
```

---

## Preguntas Frecuentes

### P: ¿Necesito pagar por OpenCode?

**R**: Los estudiantes de FPUNA obtienen acceso gratuito durante el programa. Después del programa, hay un nivel gratuito disponible con límites.

### P: ¿Puedo usar esto en múltiples computadoras?

**R**: Sí, inicia sesión en cada dispositivo con la misma cuenta. La configuración se sincroniza automáticamente.

### P: ¿Qué pasa si se cae mi internet?

**R**: Algunas funciones offline están disponibles, pero la generación con IA requiere internet.

### P: ¿Puedo usar diferentes modelos de IA?

**R**: Sí, configúralo en `config.json`. Opciones: Claude, GPT-4, etc.

### P: ¿Mi código se envía a servidores de IA?

**R**: Sí, para la generación. No incluyas datos sensibles en los prompts. Revisa la política de privacidad de OpenCode.

---

## Siguientes Pasos

Después de que la configuración esté completa:

1. ✅ **Verifica que todo funciona** (ejecuta todas las pruebas)
2. ✅ **Completa Semana 1 Día 3** (Ingeniería de Prompts)
3. ✅ **Practica generando código** (desarrolla confianza)
4. ✅ **Únete a Slack** (obtén ayuda si la necesitas)
5. ✅ **Prepárate para Semana 2** (elige tu track)

---

## Recursos Adicionales

**Documentación**:
- [Documentación Oficial de OpenCode](https://docs.opencode.dev)
- [Documentación de OMO](https://docs.omo.dev)
- [Documentación de VS Code](https://code.visualstudio.com/docs)

**Tutoriales en Video**:
- [Guía Completa de Videos](../../../../_compartido/04-utilidades-ia/configuracion-inicial/VIDEO-TUTORIALS.md) - Tutoriales para todas las herramientas
- [Configuración de Claude Code](../../../../_compartido/04-utilidades-ia/configuracion-inicial/VIDEO-TUTORIALS.md#claude-code) - Instalación paso a paso
- [Configuración de VS Code](../../../../_compartido/04-utilidades-ia/configuracion-inicial/VIDEO-TUTORIALS.md#vs-code) - Editor recomendado
- [Git y GitHub Básico](../../../../_compartido/04-utilidades-ia/configuracion-inicial/VIDEO-TUTORIALS.md#git--github) - Control de versiones

**Comunidad**:
- Slack: `#soporte-tecnico`, `#ayuda-opencode`
- Discord: Comunidad OpenCode
- GitHub: OpenCode Issues

---

**Última Actualización**: Enero 2026
**Versión**: 1.0
**Próxima Revisión**: Después del Cohorte 1 de Verano 2026

---

*FPUNA Verano 2026 - Configuración de Herramientas de IA*
*Potenciando el Desarrollo con IA*
