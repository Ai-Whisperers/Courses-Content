# Guía de Instalación de OpenCode para macOS

## Guía Completa para macOS

Esta guía está diseñada específicamente para usuarios de macOS y cubre todos los pasos necesarios para instalar OpenCode en tu Mac.

**Tiempo estimado**: 15-25 minutos  
**Nivel**: Principiante  
**Sistema**: macOS 10.15 (Catalina) o superior

---

## Requisitos Previos

### Verificar Versión de macOS

1. Click en el menú Apple () → "Acerca de este Mac"
2. Verifica que tienes macOS 10.15+ (Catalina, Big Sur, Monterey, Ventura, Sonoma)

### Arquitectura del Procesador

Verifica si tienes un Mac Intel o Apple Silicon (M1/M2/M3):

```bash
uname -m
```

**Salida**:
- `x86_64` = Intel
- `arm64` = Apple Silicon (M1/M2/M3)

---

## Paso 1: Instalar Homebrew (Gestor de Paquetes)

Homebrew es el gestor de paquetes más popular para macOS. Facilita la instalación de software.

### Instalación de Homebrew

1. **Abrir Terminal**:
   - Presiona `Cmd + Espacio`
   - Escribe "Terminal"
   - Presiona Enter

2. **Instalar Homebrew**:
   
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   
   - Te pedirá tu contraseña de macOS
   - Presiona Enter para confirmar
   - **Tiempo estimado**: 5-10 minutos

3. **Configurar PATH (Solo Apple Silicon)**:
   
   Si tienes Apple Silicon (M1/M2/M3), ejecuta:
   
   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```

4. **Verificar Instalación**:
   
   ```bash
   brew --version
   ```
   
   **Salida esperada**: `Homebrew 4.x.x`

---

## Paso 2: Instalar Node.js

### Usando Homebrew (Recomendado)

```bash
# Instalar Node.js LTS
brew install node@18

# Vincular Node.js
brew link node@18
```

### Verificar Instalación

```bash
node --version
npm --version
```

**Salida esperada**:
```
v18.17.0  (o superior)
9.6.7     (o superior)
```

### Alternativa: Usando NVM (Node Version Manager)

Si necesitas múltiples versiones de Node.js:

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Cerrar y reabrir Terminal, luego:
nvm install 18
nvm use 18
```

---

## Paso 3: Configurar Shell (zsh)

macOS Catalina+ usa **zsh** como shell predeterminado.

### Verificar tu Shell

```bash
echo $SHELL
```

**Salida esperada**: `/bin/zsh`

### Configurar Perfil de zsh

1. **Editar ~/.zshrc**:
   
   ```bash
   nano ~/.zshrc
   ```

2. **Agregar estas líneas** (opcional pero útil):
   
   ```bash
   # Alias útiles
   alias cl='claude'
   alias ll='ls -la'
   
   # Mensajes de bienvenida
   echo "OpenCode está listo! 🚀"
   ```

3. **Guardar y salir**:
   - Presiona `Ctrl + O` (guardar)
   - Presiona Enter
   - Presiona `Ctrl + X` (salir)

4. **Recargar configuración**:
   
   ```bash
   source ~/.zshrc
   ```

---

## Paso 4: Instalar OpenCode

### Instalación Global

```bash
npm install -g @anthropic-ai/claude-code
```

**¿Qué hace este comando?**
- `npm` - Gestor de paquetes de Node.js
- `install` - Instala un paquete
- `-g` - Instalación global (disponible en todo el sistema)
- `@anthropic-ai/claude-code` - Paquete oficial de OpenCode

**Tiempo estimado**: 1-3 minutos

### Verificar Instalación

```bash
claude --version
```

**Salida esperada**: `Claude Code CLI v1.x.x`

### Problema de Permisos (Si aparece)

Si ves un error de permisos:

```bash
# Solución 1: Cambiar propietario de directorio npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Solución 2: Instalar sin sudo usando prefijo
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
npm install -g @anthropic-ai/claude-code
```

---

## Paso 5: Configurar API Key de Anthropic

### Obtener tu API Key

1. Ve a https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys"
4. Crea una nueva clave
5. Copia la clave (formato: `sk-ant-...`)

**⚠️ IMPORTANTE**: Guarda esta clave de forma segura. No la compartas.

### Configurar la API Key en macOS

#### Opción A: En ~/.zshrc (Permanente - Recomendado)

```bash
# Editar ~/.zshrc
nano ~/.zshrc

# Agregar al final del archivo:
export ANTHROPIC_API_KEY="sk-ant-tu-clave-aqui"

# Guardar (Ctrl+O) y salir (Ctrl+X)

# Recargar configuración
source ~/.zshrc
```

#### Opción B: Sesión Actual (Temporal)

```bash
export ANTHROPIC_API_KEY="sk-ant-tu-clave-aqui"
```

**Nota**: Esta configuración se pierde al cerrar la terminal.

#### Opción C: Archivo .env (Por Proyecto)

```bash
# Navegar a tu proyecto
cd ~/Proyectos/MiProyecto

# Crear archivo .env
touch .env

# Editar con nano o VS Code
echo 'ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui' > .env
```

### Verificar Configuración

```bash
echo $ANTHROPIC_API_KEY
```

Deberías ver tu clave API.

---

## Paso 6: Instalar Git

Git normalmente viene preinstalado en macOS, pero puedes actualizarlo:

### Verificar si Git está instalado

```bash
git --version
```

### Instalar/Actualizar Git con Homebrew

```bash
brew install git
```

### Configurar Git (Primera Vez)

```bash
# Configurar nombre
git config --global user.name "María González"

# Configurar email
git config --global user.email "maria.gonzalez@fpuna.edu.py"

# Verificar configuración
git config --list
```

---

## Paso 7: Instalar Visual Studio Code

VS Code es el editor recomendado para trabajar con OpenCode.

### Instalación con Homebrew

```bash
brew install --cask visual-studio-code
```

### Instalación Manual

1. Descarga de https://code.visualstudio.com/
2. Abre el archivo `.dmg`
3. Arrastra VS Code a "Applications"

### Abrir VS Code desde Terminal

```bash
# Abrir VS Code en carpeta actual
code .

# Abrir archivo específico
code archivo.js
```

### Extensiones Recomendadas

Instalar desde la terminal:

```bash
# Claude Code (oficial)
code --install-extension anthropic.claude-code

# GitLens
code --install-extension eamodio.gitlens

# Prettier (formato de código)
code --install-extension esbenp.prettier-vscode

# ESLint
code --install-extension dbaeumer.vscode-eslint
```

O instala desde la interfaz:
1. Abre VS Code
2. Presiona `Cmd + Shift + X`
3. Busca e instala las extensiones

---

## Paso 8: Prueba Completa

### Prueba 1: Comando Básico

```bash
claude "Hola, ¿puedes verificar que estás funcionando?"
```

**Salida esperada**: Una respuesta de Claude confirmando que funciona.

### Prueba 2: Generar Código

```bash
claude "Crea una función en JavaScript que convierta temperaturas de Celsius a Fahrenheit"
```

### Prueba 3: Crear Proyecto Completo

```bash
# Crear directorio de proyecto
mkdir -p ~/Proyectos/PruebaOpenCode
cd ~/Proyectos/PruebaOpenCode

# Inicializar proyecto Node.js
npm init -y

# Usar OpenCode
claude "Crea un servidor web simple con Node.js que responda 'Hola desde FPUNA' en el puerto 3000"

# OpenCode creará los archivos necesarios

# Ejecutar el servidor
node server.js

# Abrir en navegador: http://localhost:3000
```

---

## Configuración Avanzada para macOS

### Oh My Zsh (Shell Mejorado)

Oh My Zsh agrega funcionalidades avanzadas a zsh:

```bash
# Instalar Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Elegir un tema (opcional)
nano ~/.zshrc
# Cambiar ZSH_THEME="robbyrussell" por ZSH_THEME="agnoster"

# Recargar
source ~/.zshrc
```

### iTerm2 (Terminal Mejorada)

iTerm2 es una alternativa más potente a la Terminal nativa:

```bash
brew install --cask iterm2
```

**Ventajas**:
- Divisiones de pantalla
- Búsqueda mejorada
- Mejor gestión de pestañas
- Perfiles personalizables

### Configurar Accesos Directos

Agregar a `~/.zshrc`:

```bash
# Alias para OpenCode
alias cl='claude'
alias clh='claude --help'

# Alias para navegación
alias projects='cd ~/Proyectos'
alias fpuna='cd ~/Proyectos/FPUNA'

# Función para crear y entrar en directorio
mkcd() {
  mkdir -p "$1" && cd "$1"
}

# Función para abrir VS Code
c() {
  code "${1:-.}"
}
```

---

## Solución de Problemas Específicos de macOS

### Problema 1: "xcrun: error" al instalar

**Error**:
```
xcrun: error: invalid active developer path
```

**Solución**:
```bash
# Instalar Command Line Tools
xcode-select --install
```

### Problema 2: Permiso denegado al instalar npm global

**Solución**:

```bash
# Opción A: Cambiar propietario
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Opción B: Configurar prefijo npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### Problema 3: "comando no encontrado: brew"

**Solución**:

Verifica que Homebrew esté en tu PATH:

```bash
# Intel Macs
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc

# Apple Silicon (M1/M2/M3)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc

# Recargar
source ~/.zshrc
```

### Problema 4: Conflicto de Versiones de Node

**Solución - Usar NVM**:

```bash
# Instalar NVM
brew install nvm

# Crear directorio NVM
mkdir ~/.nvm

# Configurar en ~/.zshrc
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc

# Recargar
source ~/.zshrc

# Instalar Node 18
nvm install 18
nvm use 18
nvm alias default 18
```

### Problema 5: macOS Bloquea la Aplicación

Si macOS bloquea la ejecución de OpenCode:

1. Ve a **Preferencias del Sistema** → **Seguridad y Privacidad**
2. En la pestaña "General", click "Permitir de todas formas"
3. O ejecuta:
   ```bash
   sudo spctl --master-disable
   ```

---

## Checklist de Verificación macOS

- [ ] macOS 10.15+ instalado
- [ ] Homebrew instalado (`brew --version`)
- [ ] Node.js v18+ instalado (`node --version`)
- [ ] npm v9+ instalado (`npm --version`)
- [ ] zsh configurado (`echo $SHELL`)
- [ ] OpenCode instalado (`claude --version`)
- [ ] API Key configurada (`echo $ANTHROPIC_API_KEY`)
- [ ] Git instalado (`git --version`)
- [ ] VS Code instalado con extensiones
- [ ] Prueba básica exitosa (`claude "test"`)

---

## Ejemplo Práctico: Primer Proyecto en macOS

```bash
# 1. Crear carpeta del proyecto
mkdir -p ~/Proyectos/CalculadoraGuaranies
cd ~/Proyectos/CalculadoraGuaranies

# 2. Inicializar proyecto
npm init -y

# 3. Crear con OpenCode
claude "Crea una calculadora de conversión entre USD y Guaraníes (₲). Tasa: ₲7,200 por USD. Incluye interfaz de línea de comandos para ingresar montos y elegir dirección de conversión. Formatea resultados con separadores de miles."

# 4. OpenCode generará los archivos

# 5. Ejecutar
node index.js

# 6. Abrir en VS Code
code .
```

---

## Recursos para Usuarios de macOS

- **Homebrew**: https://brew.sh/
- **Oh My Zsh**: https://ohmyz.sh/
- **iTerm2**: https://iterm2.com/
- **Node.js**: https://nodejs.org/
- **Soporte FPUNA**: soporte-ia@fpuna.edu.py

---

## Próximos Pasos

Ahora que OpenCode está funcionando en macOS:

1. 📖 Continúa: [Configuración de MCPs](../mcp-configuration/README.md)
2. 📖 Aprende: [Sistema de Skills](../skills-system/README.md)
3. 📖 Domina: [Hooks y Rules](../hooks-rules/README.md)

---

## Optimizaciones Especiales para Apple Silicon

Si tienes un Mac M1/M2/M3:

### Rosetta 2 (Para Software Intel)

Algunos paquetes npm todavía requieren Rosetta:

```bash
# Instalar Rosetta 2
softwareupdate --install-rosetta
```

### Terminal Nativa ARM

Verifica que tu terminal usa ARM nativo:

```bash
arch
```

**Salida esperada**: `arm64`

### Acelerar npm en Apple Silicon

```bash
# Configurar npm para usar ARM nativo
npm config set scripts-prepend-node-path true
```

---

**¡Felicitaciones!** 🎉

Has instalado exitosamente OpenCode en macOS. Estás listo para desarrollar con IA.

---

*Guía específica para macOS creada para FPUNA Summer 2026*  
*Última actualización: Enero 2026*
