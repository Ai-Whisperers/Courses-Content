# Guía de Instalación de OpenCode para Linux

## Guía Completa para Linux (Ubuntu/Debian/Fedora)

Esta guía cubre la instalación de OpenCode en las distribuciones Linux más populares.

**Tiempo estimado**: 15-20 minutos  
**Nivel**: Principiante-Intermedio  
**Sistemas**: Ubuntu 20.04+, Debian 11+, Fedora 35+

---

## Tabla de Contenidos

- [Ubuntu/Debian](#ubuntudebian)
- [Fedora/RHEL/CentOS](#fedorарhelcentos)
- [Arch Linux](#arch-linux)
- [Configuración General](#configuración-general)
- [Solución de Problemas](#solución-de-problemas)

---

## Ubuntu/Debian

### Paso 1: Actualizar Sistema

```bash
# Actualizar lista de paquetes
sudo apt update

# Actualizar paquetes instalados (opcional)
sudo apt upgrade -y
```

### Paso 2: Instalar Dependencias

```bash
# Instalar curl, wget, build-essential
sudo apt install -y curl wget build-essential

# Verificar
curl --version
```

### Paso 3: Instalar Node.js

#### Opción A: Usando NodeSource (Recomendado)

```bash
# Descargar script de configuración para Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar Node.js
sudo apt install -y nodejs

# Verificar
node --version
npm --version
```

#### Opción B: Usando Snap

```bash
sudo snap install node --classic --channel=18
```

#### Opción C: Usando NVM (Node Version Manager)

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Cerrar y reabrir terminal, luego:
nvm install 18
nvm use 18
nvm alias default 18
```

### Paso 4: Instalar OpenCode

```bash
# Instalación global
sudo npm install -g @anthropic-ai/claude-code

# O sin sudo (recomendado):
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @anthropic-ai/claude-code
```

### Paso 5: Verificar Instalación

```bash
claude --version
```

**Salida esperada**: `Claude Code CLI v1.x.x`

---

## Fedora/RHEL/CentOS

### Paso 1: Actualizar Sistema

```bash
# Fedora
sudo dnf update -y

# RHEL/CentOS 8+
sudo yum update -y
```

### Paso 2: Instalar Dependencias

```bash
# Fedora
sudo dnf install -y curl wget gcc-c++ make

# RHEL/CentOS
sudo yum install -y curl wget gcc-c++ make
```

### Paso 3: Instalar Node.js

#### Usando NodeSource

```bash
# Descargar configuración
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -

# Instalar Node.js
sudo dnf install -y nodejs  # Fedora
# O
sudo yum install -y nodejs  # RHEL/CentOS
```

#### Usando DNF Module (Fedora)

```bash
sudo dnf module install nodejs:18
```

### Paso 4: Instalar OpenCode

```bash
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @anthropic-ai/claude-code
```

---

## Arch Linux

### Paso 1: Actualizar Sistema

```bash
sudo pacman -Syu
```

### Paso 2: Instalar Node.js

```bash
# Instalar Node.js desde repositorio oficial
sudo pacman -S nodejs npm

# Verificar
node --version
npm --version
```

### Paso 3: Instalar OpenCode

```bash
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @anthropic-ai/claude-code
```

---

## Configuración General (Todas las Distribuciones)

### Configurar API Key de Anthropic

#### 1. Obtener API Key

1. Ve a https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Navega a "API Keys"
4. Crea una nueva clave
5. Copia la clave (formato: `sk-ant-...`)

#### 2. Configurar en Linux

**Opción A: En ~/.bashrc (Permanente - Recomendado)**

```bash
# Editar ~/.bashrc
nano ~/.bashrc

# Agregar al final:
export ANTHROPIC_API_KEY="sk-ant-tu-clave-aqui"

# Guardar (Ctrl+O) y salir (Ctrl+X)

# Recargar configuración
source ~/.bashrc
```

**Si usas zsh**, edita `~/.zshrc` en lugar de `~/.bashrc`.

**Opción B: Archivo .env (Por Proyecto)**

```bash
# En tu directorio de proyecto
echo 'ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui' > .env
```

#### 3. Verificar Configuración

```bash
echo $ANTHROPIC_API_KEY
```

### Instalar Git

```bash
# Ubuntu/Debian
sudo apt install -y git

# Fedora
sudo dnf install -y git

# Arch
sudo pacman -S git
```

**Configurar Git**:

```bash
git config --global user.name "Carlos Ramírez"
git config --global user.email "carlos.ramirez@fpuna.edu.py"
```

### Instalar Visual Studio Code

#### Ubuntu/Debian

```bash
# Importar clave de Microsoft
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg

# Agregar repositorio
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# Instalar
sudo apt update
sudo apt install code
```

#### Fedora/RHEL

```bash
# Importar clave
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc

# Agregar repositorio
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'

# Instalar
sudo dnf install code
```

#### Arch Linux

```bash
# Desde AUR
yay -S visual-studio-code-bin

# O desde Snap
sudo snap install code --classic
```

#### Extensiones Recomendadas

```bash
# Instalar desde terminal
code --install-extension anthropic.claude-code
code --install-extension eamodio.gitlens
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
```

---

## Configuración del Shell

### Bash

Edita `~/.bashrc`:

```bash
nano ~/.bashrc
```

Agrega:

```bash
# API Key de Claude
export ANTHROPIC_API_KEY="tu-clave-aqui"

# Alias útiles
alias cl='claude'
alias ll='ls -lah'
alias update='sudo apt update && sudo apt upgrade'  # Ubuntu/Debian

# Función para crear y entrar en directorio
mkcd() {
  mkdir -p "$1" && cd "$1"
}

# Prompt personalizado (opcional)
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '

# Mensaje de bienvenida
echo "OpenCode está listo! 🚀"
```

Guarda y recarga:

```bash
source ~/.bashrc
```

### Zsh (Si lo prefieres)

```bash
# Instalar zsh
sudo apt install zsh  # Ubuntu/Debian
sudo dnf install zsh  # Fedora
sudo pacman -S zsh    # Arch

# Cambiar shell predeterminado
chsh -s $(which zsh)

# Instalar Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Edita `~/.zshrc` similar a `~/.bashrc`.

---

## Prueba Completa

### Prueba 1: Comando Básico

```bash
claude "Hola, ¿estás funcionando correctamente?"
```

**Salida esperada**: Respuesta de Claude confirmando funcionamiento.

### Prueba 2: Generar Código

```bash
claude "Crea una función en Python que calcule el factorial de un número"
```

### Prueba 3: Proyecto Completo

```bash
# Crear directorio
mkdir -p ~/proyectos/prueba-opencode
cd ~/proyectos/prueba-opencode

# Inicializar proyecto Node.js
npm init -y

# Crear con OpenCode
claude "Crea un servidor web con Node.js que muestre '¡Hola desde FPUNA!' en el puerto 3000. Incluye manejo de errores y logging."

# OpenCode generará los archivos

# Ejecutar
node server.js

# Probar en navegador: http://localhost:3000
```

---

## Solución de Problemas

### Problema 1: "comando no encontrado: npm"

**Solución**:

```bash
# Verificar instalación de Node.js
which node

# Si no está instalado, reinstalar:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Problema 2: Permiso denegado (EACCES)

**Error**:
```
Error: EACCES: permission denied
```

**Solución**:

```bash
# Configurar prefijo npm para usuario actual
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Agregar a PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Reinstalar OpenCode
npm install -g @anthropic-ai/claude-code
```

### Problema 3: "node: command not found" después de instalación

**Solución**:

```bash
# Agregar Node.js al PATH
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Problema 4: Error de Compilación (node-gyp)

**Solución**:

```bash
# Ubuntu/Debian
sudo apt install -y python3 g++ make

# Fedora
sudo dnf install -y python3 gcc-c++ make

# Arch
sudo pacman -S python gcc make
```

### Problema 5: Versión Antigua de Node.js

**Solución**:

```bash
# Desinstalar versión antigua
sudo apt remove nodejs  # Ubuntu/Debian
sudo dnf remove nodejs  # Fedora

# Limpiar caché
sudo apt autoremove
sudo apt autoclean

# Reinstalar versión correcta
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Problema 6: Puerto en Uso

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solución**:

```bash
# Encontrar proceso usando el puerto
sudo lsof -i :3000

# Matar el proceso
sudo kill -9 <PID>

# O usar puerto diferente
node server.js --port 3001
```

---

## Configuración Avanzada

### Firewall (UFW)

Si usas firewall, permite puertos necesarios:

```bash
# Habilitar UFW
sudo ufw enable

# Permitir puerto 3000 (ejemplo)
sudo ufw allow 3000/tcp

# Verificar
sudo ufw status
```

### Systemd Service (Ejecutar al Inicio)

Crear un servicio para ejecutar tu app automáticamente:

```bash
# Crear archivo de servicio
sudo nano /etc/systemd/system/mi-app.service
```

Contenido:

```ini
[Unit]
Description=Mi App OpenCode
After=network.target

[Service]
Type=simple
User=tu-usuario
WorkingDirectory=/home/tu-usuario/proyectos/mi-app
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=ANTHROPIC_API_KEY=tu-clave-aqui

[Install]
WantedBy=multi-user.target
```

Activar servicio:

```bash
sudo systemctl daemon-reload
sudo systemctl enable mi-app
sudo systemctl start mi-app
sudo systemctl status mi-app
```

### Docker (Opcional)

Ejecutar OpenCode en contenedor:

```bash
# Instalar Docker
sudo apt install docker.io  # Ubuntu/Debian
sudo dnf install docker      # Fedora

# Habilitar Docker
sudo systemctl enable docker
sudo systemctl start docker

# Agregar usuario a grupo docker
sudo usermod -aG docker $USER

# Cerrar sesión y volver a entrar
```

Dockerfile ejemplo:

```dockerfile
FROM node:18-alpine

WORKDIR /app

RUN npm install -g @anthropic-ai/claude-code

ENV ANTHROPIC_API_KEY=""

CMD ["claude", "--help"]
```

---

## Checklist de Verificación Linux

- [ ] Distribución soportada (Ubuntu 20.04+, Debian 11+, Fedora 35+)
- [ ] Sistema actualizado (`sudo apt update && sudo apt upgrade`)
- [ ] Dependencias instaladas (curl, wget, build-essential)
- [ ] Node.js v18+ instalado (`node --version`)
- [ ] npm v9+ instalado (`npm --version`)
- [ ] OpenCode instalado (`claude --version`)
- [ ] API Key configurada (`echo $ANTHROPIC_API_KEY`)
- [ ] Git instalado y configurado
- [ ] VS Code instalado con extensiones
- [ ] Prueba básica exitosa (`claude "test"`)

---

## Ejemplo Práctico: Calculadora de Guaraníes en Linux

```bash
# 1. Crear estructura del proyecto
mkdir -p ~/proyectos/calculadora-guaranies
cd ~/proyectos/calculadora-guaranies

# 2. Inicializar proyecto
npm init -y

# 3. Crear aplicación con OpenCode
claude "Crea una aplicación CLI en Node.js para convertir entre USD y Guaraníes (₲). 

Requisitos:
- Usar tasa de cambio: ₲7,200 por USD
- Interfaz interactiva con prompts
- Validación de entrada
- Formateo con separadores de miles
- Historial de conversiones
- Opción para salir

Tecnologías: Node.js puro (sin frameworks)"

# 4. OpenCode generará los archivos

# 5. Instalar dependencias si las hay
npm install

# 6. Ejecutar
node index.js

# 7. Abrir en VS Code para editar
code .
```

---

## Recursos para Usuarios de Linux

- **Node.js en Linux**: https://github.com/nodesource/distributions
- **NVM**: https://github.com/nvm-sh/nvm
- **Oh My Zsh**: https://ohmyz.sh/
- **VS Code en Linux**: https://code.visualstudio.com/documentacion/setup/linux
- **Soporte FPUNA**: soporte-ia@fpuna.edu.py

---

## Optimizaciones de Rendimiento

### Swap para Sistemas con Poca RAM

Si tienes menos de 4 GB de RAM:

```bash
# Crear archivo swap de 2 GB
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Hacer permanente
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Ajustar npm Cache

```bash
# Limpiar caché npm
npm cache clean --force

# Verificar caché
npm cache verify
```

### Habilitar Compresión

```bash
# Instalar pigz (gzip paralelo)
sudo apt install pigz

# Usar en npm
npm config set tarball-binary pigz
```

---

## Próximos Pasos

Ahora que OpenCode está funcionando en Linux:

1. 📖 Aprende: [Configuración de MCPs](../mcp-configuration/README.md)
2. 📖 Explora: [Sistema de Skills](../skills-system/README.md)
3. 📖 Domina: [Hooks y Rules](../hooks-rules/README.md)

---

**¡Felicitaciones!** 🎉

Has instalado exitosamente OpenCode en Linux. Estás listo para desarrollar con IA.

---

*Guía específica para Linux creada para FPUNA Summer 2026*  
*Última actualización: Enero 2026*
