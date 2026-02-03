# Setup Día 1: Fundamentos de IA

## Guía Completa de Instalación

> **IMPORTANTE**: Completar ANTES de llegar a clase. Tiempo estimado: 50 minutos.

---

## 1. Requisitos de Hardware

### Mínimos
- **CPU**: Intel Core i3 / AMD Ryzen 3 o superior
- **RAM**: 4 GB mínimo (8 GB recomendado)
- **Disco**: 2 GB de espacio libre
- **Internet**: Conexión estable (mínimo 5 Mbps)

### Sistema Operativo
- Windows 10/11
- macOS 10.15 (Catalina) o superior
- Linux (Ubuntu 20.04+, Debian 10+, Fedora 34+)

---

## 2. Software a Instalar

### 2.1 Node.js (Obligatorio)

**¿Qué es?** Entorno de ejecución para JavaScript, necesario para Claude Code.

#### Windows
1. Ir a https://nodejs.org/
2. Descargar versión **LTS** (Long Term Support) - actualmente 20.x
3. Ejecutar el instalador
4. Aceptar todas las opciones por defecto
5. **Reiniciar la computadora**

#### macOS
```bash
# Opción 1: Instalador oficial
# Ir a https://nodejs.org/ y descargar LTS

# Opción 2: Con Homebrew (si lo tienes)
brew install node
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Verificar Instalación
```bash
node --version
# Debe mostrar: v20.x.x o superior

npm --version
# Debe mostrar: 10.x.x o superior
```

---

### 2.2 Git (Obligatorio)

**¿Qué es?** Sistema de control de versiones para código.

#### Windows
1. Ir a https://git-scm.com/download/win
2. Descargar e instalar
3. Opciones recomendadas:
   - ✅ Git Bash Here
   - ✅ Git GUI Here
   - ✅ Use Git from Windows Terminal
   - ✅ Use default editor (o VS Code si lo prefieres)

#### macOS
```bash
# Git viene pre-instalado en macOS recientes
# Verificar con:
git --version

# Si no está instalado:
xcode-select --install
```

#### Linux
```bash
sudo apt-get update
sudo apt-get install git
```

#### Verificar Instalación
```bash
git --version
# Debe mostrar: git version 2.x.x
```

#### Configuración Inicial (Primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

### 2.3 Visual Studio Code (Obligatorio)

**¿Qué es?** Editor de código gratuito de Microsoft.

#### Todas las Plataformas
1. Ir a https://code.visualstudio.com/
2. Descargar la versión para tu sistema operativo
3. Instalar con opciones por defecto

#### Extensiones Recomendadas
Después de instalar VS Code, instalar estas extensiones:

1. **Claude Dev** (o similar para IA)
   - Abrir VS Code
   - Ir a Extensions (Ctrl+Shift+X)
   - Buscar "Claude" e instalar

2. **Spanish Language Pack** (opcional)
   - Buscar "Spanish Language Pack"
   - Instalar para interfaz en español

3. **Markdown All in One**
   - Para ver archivos .md

#### Verificar Instalación
- Abrir VS Code
- Debería aparecer la pantalla de bienvenida
- Probar crear un archivo nuevo (Ctrl+N)

---

### 2.4 Cuenta Anthropic/Claude (Obligatorio)

**¿Qué es?** Cuenta para acceder a Claude, el modelo de IA que usaremos.

#### Crear Cuenta
1. Ir a https://console.anthropic.com/
2. Click en "Sign Up"
3. Registrarse con email o cuenta de Google
4. Verificar email si es necesario

#### Obtener API Key
1. Una vez logueado, ir a "API Keys"
2. Click en "Create Key"
3. Copiar la key (empieza con `sk-ant-...`)
4. **GUARDAR EN LUGAR SEGURO** - solo se muestra una vez

> ⚠️ **IMPORTANTE**: No compartir tu API key con nadie. Tratarla como una contraseña.

---

### 2.5 OpenCode (Obligatorio)

**¿Qué es?** Agente de IA de código abierto para trabajar desde la terminal, IDE o escritorio.

**Sitio Oficial:** https://opencode.ai/

#### Instalación

```bash
# Opción A: NPM (RECOMENDADO para todas las plataformas)
npm install -g opencode-ai@latest

# Opción B: Script de instalación (macOS/Linux)
curl -fsSL https://opencode.ai/install | bash

# Opción C: Homebrew (macOS)
brew install opencode
```

> **Nota**: Si `npm install -g opencode` no funciona, usa `opencode-ai@latest`
> Para abrir OpenCode, simplemente escribe `opencode` en tu terminal.

#### Configurar API Key

**Windows (PowerShell)**
```powershell
# Temporal (solo esta sesión)
$env:ANTHROPIC_API_KEY="sk-ant-tu-api-key-aqui"

# Permanente
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-tu-api-key-aqui", "User")
```

**macOS/Linux**
```bash
# Agregar a ~/.bashrc o ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-tu-api-key-aqui"

# Recargar configuración
source ~/.bashrc  # o source ~/.zshrc
```

#### Verificar Instalación
```bash
opencode --version

# Probar conexión
claude "Hola, ¿estás funcionando?"
```

---

## 3. Verificación Final

### Lista de Comprobación

Ejecutar cada comando y verificar que funcione:

```bash
# 1. Node.js
node --version
# ✅ Esperado: v20.x.x

# 2. npm
npm --version
# ✅ Esperado: 10.x.x

# 3. Git
git --version
# ✅ Esperado: git version 2.x.x

# 4. Claude/OpenCode
claude --version
# ✅ Esperado: versión actual

# 5. Prueba de conexión
claude "Di 'Hola Mundo' si estás funcionando"
# ✅ Esperado: Respuesta de Claude
```

### Si Todo Funciona

¡Felicitaciones! Estás listo para el Día 1.

Crear una carpeta para el curso:
```bash
mkdir ~/fpuna-ia-2026
cd ~/fpuna-ia-2026
```

---

## 4. Solución de Problemas

### Node.js no se reconoce

**Síntoma**: `node: command not found`

**Solución**:
1. Reiniciar la terminal/computadora
2. Verificar que Node.js está en el PATH
3. Reinstalar Node.js

### Error de permisos en npm

**Síntoma**: `EACCES permission denied`

**Solución (macOS/Linux)**:
```bash
# Cambiar propietario del directorio npm
sudo chown -R $(whoami) ~/.npm
```

**Solución (Windows)**:
- Ejecutar PowerShell como Administrador

### API Key inválida

**Síntoma**: `Invalid API key`

**Solución**:
1. Verificar que la key empieza con `sk-ant-`
2. Verificar que no hay espacios extras
3. Regenerar key en console.anthropic.com

### Claude no responde

**Síntoma**: Timeout o sin respuesta

**Solución**:
1. Verificar conexión a internet
2. Verificar que API key está configurada
3. Probar: `echo $ANTHROPIC_API_KEY` (debe mostrar la key)

---

## 5. Recursos Adicionales

### Documentación Oficial
- Node.js: https://nodejs.org/docs/
- Git: https://git-scm.com/doc
- VS Code: https://code.visualstudio.com/docs
- Claude: https://docs.anthropic.com/

### Videos de Instalación
- [Instalar Node.js en Windows](https://www.youtube.com/watch?v=placeholder)
- [Instalar Git en Windows](https://www.youtube.com/watch?v=placeholder)
- [Configurar Claude Code](https://www.youtube.com/watch?v=placeholder)

### Soporte
- Email: soporte-ia@fpuna.edu.py
- WhatsApp: (enlace del grupo del curso)

---

## 6. Checklist Pre-Clase

Antes de llegar a clase, marcar cada item:

- [ ] Node.js instalado y funcionando
- [ ] Git instalado y configurado
- [ ] VS Code instalado
- [ ] Cuenta Anthropic creada
- [ ] API Key guardada
- [ ] Claude Code/OpenCode instalado
- [ ] Prueba "Hola Mundo" exitosa
- [ ] Carpeta del curso creada

**Si tienes problemas**, llegar 30 minutos antes a clase para recibir ayuda.

---

*Setup Día 1 - FPUNA Verano 2026*
