# Guía de Solución de Problemas - OpenCode

## Problemas Comunes y Soluciones

Esta guía cubre los problemas más frecuentes que encuentran los estudiantes al instalar y usar OpenCode, con soluciones paso a paso.

---

## Tabla de Contenidos

1. [Problemas de Instalación](#problemas-de-instalación)
2. [Problemas de API Key](#problemas-de-api-key)
3. [Problemas de Conectividad](#problemas-de-conectividad)
4. [Problemas de Permisos](#problemas-de-permisos)
5. [Problemas de Rendimiento](#problemas-de-rendimiento)
6. [Problemas Específicos del Sistema](#problemas-específicos-del-sistema)
7. [Obtener Ayuda](#obtener-ayuda)

---

## Problemas de Instalación

### ❌ Error: "comando no encontrado: npm"

**Síntoma**: Al ejecutar `npm --version`, aparece un error.

**Causa**: Node.js no está instalado o no está en el PATH.

**Solución**:

```bash
# 1. Verificar si Node.js está instalado
which node
# o en Windows
where node

# 2. Si no está instalado, instalar Node.js:

# Windows:
# Descarga desde https://nodejs.org/ y ejecuta el instalador

# macOS:
brew install node@18

# Linux (Ubuntu/Debian):
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Verificar instalación
node --version
npm --version
```

---

### ❌ Error: "comando no encontrado: claude"

**Síntoma**: Después de instalar OpenCode, `claude --version` no funciona.

**Causa**: OpenCode no está en el PATH o la instalación falló.

**Solución**:

**Paso 1: Verificar instalación**

```bash
npm list -g @anthropic-ai/claude-code
```

Si no aparece, reinstalar:

```bash
npm install -g @anthropic-ai/claude-code
```

**Paso 2: Agregar npm al PATH**

**Windows** (PowerShell):
```powershell
$env:PATH += ";$env:APPDATA\npm"
# Para hacerlo permanente, agregar a variables de entorno del sistema
```

**macOS/Linux**:
```bash
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Paso 3: Reiniciar terminal**

Cierra y vuelve a abrir tu terminal.

---

### ❌ Error: "EACCES: permission denied"

**Síntoma**: Al instalar con npm aparece error de permisos.

**Causa**: Intentando instalar en directorio sin permisos.

**Solución**:

**NO uses `sudo npm install -g`**. En su lugar:

**Opción A: Cambiar directorio de npm global**

```bash
# Crear directorio para paquetes globales
mkdir ~/.npm-global

# Configurar npm para usar ese directorio
npm config set prefix '~/.npm-global'

# Agregar al PATH
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Ahora instalar OpenCode
npm install -g @anthropic-ai/claude-code
```

**Opción B: Arreglar permisos (macOS/Linux)**

```bash
sudo chown -R $(whoami) /usr/local/lib/node_modules
npm install -g @anthropic-ai/claude-code
```

---

### ❌ Error: "node-gyp" o errores de compilación

**Síntoma**: Errores durante la instalación relacionados con compilación.

**Causa**: Faltan herramientas de compilación.

**Solución**:

**Windows**:
```powershell
# Instalar herramientas de compilación de Windows
npm install -g windows-build-tools

# O manualmente instalar Visual Studio Build Tools
```

**macOS**:
```bash
# Instalar Command Line Tools
xcode-select --install
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt install -y build-essential python3
```

**Linux (Fedora)**:
```bash
sudo dnf install -y gcc-c++ make python3
```

---

## Problemas de API Key

### ❌ Error: "API key not configured"

**Síntoma**: OpenCode indica que no encuentra la API key.

**Causa**: La variable de entorno `ANTHROPIC_API_KEY` no está configurada.

**Solución**:

**Paso 1: Verificar si está configurada**

```bash
# Windows (PowerShell)
echo $env:ANTHROPIC_API_KEY

# macOS/Linux
echo $ANTHROPIC_API_KEY
```

Si está vacío, continuar:

**Paso 2: Configurar la API Key**

**Windows** (PowerShell - Permanente):
1. Presiona `Windows + R`
2. Escribe `sysdm.cpl`
3. Pestaña "Opciones Avanzadas" → "Variables de Entorno"
4. En "Variables de usuario", click "Nueva..."
5. Nombre: `ANTHROPIC_API_KEY`
6. Valor: Tu clave API
7. Aceptar todo y reiniciar PowerShell

**macOS/Linux** (Permanente):
```bash
# Agregar a ~/.bashrc o ~/.zshrc
echo 'export ANTHROPIC_API_KEY="sk-ant-tu-clave-aqui"' >> ~/.bashrc
source ~/.bashrc
```

**Paso 3: Verificar nuevamente**

```bash
claude "test de conexión"
```

---

### ❌ Error: "Invalid API key"

**Síntoma**: OpenCode dice que la API key es inválida.

**Causas Posibles**:
1. API key copiada incorrectamente
2. API key revocada o expirada
3. Espacios extra al copiar/pegar

**Solución**:

**Paso 1: Verificar la clave**

```bash
# Ver la clave configurada (primeros y últimos caracteres)
echo $ANTHROPIC_API_KEY | cut -c1-10
echo $ANTHROPIC_API_KEY | tail -c 10
```

**Paso 2: Obtener nueva clave**

1. Ve a https://console.anthropic.com/
2. Navega a "API Keys"
3. Revoca la clave antigua
4. Crea una nueva clave
5. **IMPORTANTE**: Copia la clave completa sin espacios

**Paso 3: Reconfigurar**

```bash
# Reemplazar clave antigua con nueva
export ANTHROPIC_API_KEY="sk-ant-nueva-clave-completa"
```

---

### ❌ Error: "Rate limit exceeded"

**Síntoma**: Mensaje de límite de tasa excedido.

**Causa**: Has hecho demasiadas peticiones en poco tiempo.

**Solución**:

1. **Espera 1-2 minutos** antes de intentar nuevamente
2. **Reduce la frecuencia** de peticiones
3. **Verifica tu plan** en https://console.anthropic.com/ para ver límites

**Prevención**:
- No ejecutes comandos de OpenCode en bucles rápidos
- Agrega delays entre peticiones
- Considera actualizar tu plan si necesitas más capacidad

---

## Problemas de Conectividad

### ❌ Error: "Network error" o "Connection timeout"

**Síntoma**: OpenCode no puede conectarse a los servidores de Anthropic.

**Causas Posibles**:
1. Sin conexión a internet
2. Firewall bloqueando conexiones
3. Proxy mal configurado
4. Servidores de Anthropic temporalmente caídos

**Solución**:

**Paso 1: Verificar conexión a internet**

```bash
# Probar conectividad
ping google.com

# Probar conectividad con Anthropic
curl -I https://api.anthropic.com
```

**Paso 2: Verificar firewall**

**Windows**:
1. Windows Defender Firewall → "Permitir una aplicación"
2. Agregar `node.exe` a aplicaciones permitidas

**macOS**:
```bash
# Verificar si Little Snitch u otro firewall está bloqueando
```

**Linux**:
```bash
# Si usas UFW
sudo ufw allow out 443/tcp
```

**Paso 3: Configurar proxy (si aplica)**

```bash
# Si estás detrás de un proxy corporativo
npm config set proxy http://proxy.empresa.com:8080
npm config set https-proxy http://proxy.empresa.com:8080

# Variables de entorno
export HTTP_PROXY="http://proxy.empresa.com:8080"
export HTTPS_PROXY="http://proxy.empresa.com:8080"
```

**Paso 4: Verificar estado de servicios**

- Ve a https://status.anthropic.com/ para ver si hay problemas conocidos

---

### ❌ Error: "SSL certificate problem"

**Síntoma**: Errores relacionados con certificados SSL.

**Causa**: Problemas con certificados SSL del sistema.

**Solución**:

**Windows**:
```powershell
# Actualizar certificados raíz
certutil -generateSSTFromWU roots.sst
```

**macOS**:
```bash
# Instalar certificados actualizados
brew install ca-certificates
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt install ca-certificates
sudo update-ca-certificates

# Fedora
sudo dnf install ca-certificates
sudo update-ca-trust
```

**Temporal (NO RECOMENDADO para producción)**:
```bash
# Solo para testing
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

## Problemas de Permisos

### ❌ Error: "EPERM: operation not permitted"

**Síntoma**: Operaciones de archivo bloqueadas por permisos.

**Causa**: OpenCode no tiene permisos para leer/escribir archivos.

**Solución**:

**Windows**:
```powershell
# Ejecutar PowerShell como Administrador
# Click derecho en PowerShell → "Ejecutar como administrador"

# O cambiar permisos de la carpeta
icacls "C:\ruta\a\carpeta" /grant Users:F /t
```

**macOS/Linux**:
```bash
# Cambiar propietario de la carpeta
sudo chown -R $(whoami) /ruta/a/carpeta

# O cambiar permisos
chmod -R 755 /ruta/a/carpeta
```

---

### ❌ Error: "Cannot write to directory"

**Síntoma**: OpenCode no puede crear archivos en el directorio actual.

**Solución**:

```bash
# Verificar permisos del directorio actual
ls -la

# Cambiar a directorio donde tienes permisos
cd ~
mkdir proyectos
cd proyectos

# O crear directorio con permisos correctos
mkdir -p ~/mis-proyectos
chmod 755 ~/mis-proyectos
cd ~/mis-proyectos
```

---

## Problemas de Rendimiento

### ❌ OpenCode es muy lento

**Síntomas**: Respuestas tardan mucho tiempo.

**Causas Posibles**:
1. Conexión lenta a internet
2. Peticiones muy grandes
3. Recursos del sistema limitados

**Solución**:

**1. Verificar velocidad de internet**

```bash
# Usar speedtest
npm install -g speedtest-cli
speedtest
```

Necesitas al menos 5 Mbps para una experiencia fluida.

**2. Optimizar peticiones**

- Divide tareas grandes en subtareas más pequeñas
- Evita generar archivos muy grandes de una vez
- Usa comandos más específicos

**Ejemplo**: En lugar de:
```bash
claude "Crea una aplicación web completa con frontend, backend y base de datos"
```

Usa:
```bash
claude "Crea solo el backend API con Node.js y Express"
# Luego, en comando separado:
claude "Crea el frontend React para consumir esta API"
```

**3. Aumentar recursos del sistema**

- Cierra aplicaciones que no uses
- Verifica que tienes al menos 4 GB RAM libres
- Considera actualizar tu plan de internet

---

### ❌ OpenCode consume mucha RAM

**Síntoma**: Sistema se vuelve lento al usar OpenCode.

**Solución**:

**Verificar uso de memoria**:

**Windows** (PowerShell):
```powershell
Get-Process node | Select-Object ProcessName, WorkingSet
```

**macOS/Linux**:
```bash
ps aux | grep node
```

**Optimizaciones**:

```bash
# Limpiar caché de npm
npm cache clean --force

# Reiniciar Node.js
# Cerrar todas las instancias y volver a ejecutar

# Limitar concurrencia de npm (si instalas paquetes)
npm config set maxsockets 5
```

---

## Problemas Específicos del Sistema

### Windows

#### Error: "Script execution disabled"

```powershell
# Solución
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Error: "Long path not enabled"

```powershell
# Habilitar soporte para rutas largas (Windows 10 1607+)
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### macOS

#### Error: "xcrun: error: invalid active developer path"

```bash
# Instalar Command Line Tools
xcode-select --install
```

#### Error: "Operation not permitted" en /usr/local

```bash
# Cambiar propietario
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Linux

#### Error: "ENOSPC: System limit for number of file watchers reached"

```bash
# Aumentar límite de watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### Error: "node: /lib/x86_64-linux-gnu/libc.so.6: version GLIBC_X.XX not found"

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade

# O instalar versión compatible de Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## Diagnóstico General

### Script de Diagnóstico

Ejecuta este script para verificar tu instalación:

```bash
#!/bin/bash
echo "=== Diagnóstico de OpenCode ==="
echo ""

echo "1. Versión de Node.js:"
node --version || echo "❌ Node.js no encontrado"

echo ""
echo "2. Versión de npm:"
npm --version || echo "❌ npm no encontrado"

echo ""
echo "3. Versión de OpenCode:"
claude --version || echo "❌ OpenCode no encontrado"

echo ""
echo "4. API Key configurada:"
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "❌ API key no configurada"
else
  echo "✅ API key está configurada"
fi

echo ""
echo "5. Git instalado:"
git --version || echo "⚠️  Git no encontrado (opcional)"

echo ""
echo "6. Conectividad a Anthropic:"
curl -I https://api.anthropic.com 2>/dev/null | head -n 1 || echo "❌ No se puede conectar a Anthropic"

echo ""
echo "=== Fin del diagnóstico ==="
```

**Para ejecutar**:

1. Guarda como `diagnostico.sh`
2. Dale permisos: `chmod +x diagnostico.sh`
3. Ejecuta: `./diagnostico.sh`

---

## Obtener Ayuda

### Antes de Pedir Ayuda

Recopila esta información:

1. **Sistema operativo y versión**:
   ```bash
   # Windows
   systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
   
   # macOS
   sw_vers
   
   # Linux
   lsb_release -a
   ```

2. **Versiones de software**:
   ```bash
   node --version
   npm --version
   claude --version
   ```

3. **Mensaje de error completo**: Copia el error exacto

4. **Comandos ejecutados**: Qué estabas intentando hacer

### Canales de Soporte

**Para estudiantes de FPUNA**:
- 📧 Email: soporte-ia@fpuna.edu.py
- 💬 Slack: #fpuna-opencode-ayuda
- 👨‍🏫 Horas de oficina: Martes y Jueves 14:00-16:00

**Comunidad General**:
- 📚 Documentación oficial: https://docs.anthropic.com/
- 💬 Discord de Anthropic: https://discord.gg/anthropic
- 🐛 GitHub Issues: https://github.com/anthropics/claude-code/issues

### Plantilla para Reportar Problemas

```markdown
**Descripción del problema:**
[Describe qué estaba pasando]

**Pasos para reproducir:**
1. [Primer paso]
2. [Segundo paso]
3. [Etc.]

**Comportamiento esperado:**
[Qué esperabas que pasara]

**Comportamiento actual:**
[Qué pasó realmente]

**Entorno:**
- SO: [Windows 11 / macOS 13 / Ubuntu 22.04]
- Node.js: [Versión]
- npm: [Versión]
- OpenCode: [Versión]

**Mensaje de error completo:**
```
[Pega el error aquí]
```

**Comandos ejecutados:**
```bash
[Comandos que ejecutaste]
```

**Información adicional:**
[Cualquier otra información relevante]
```

---

## Problemas Conocidos

### Issue #1: Conflicto con múltiples versiones de Node.js

**Síntoma**: Comportamiento inconsistente de OpenCode.

**Solución**: Usa NVM para gestionar versiones:

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Instalar Node.js 18
nvm install 18
nvm use 18
nvm alias default 18
```

### Issue #2: OpenCode crea archivos con encoding incorrecto

**Síntoma**: Archivos con caracteres especiales mal codificados.

**Solución**:

```bash
# Configurar UTF-8
export LANG=es_PY.UTF-8
export LC_ALL=es_PY.UTF-8

# Agregar a ~/.bashrc para hacerlo permanente
```

---

## Preguntas Frecuentes

**P: ¿OpenCode funciona offline?**  
R: No, requiere conexión a internet para comunicarse con los servidores de Claude.

**P: ¿Cuánto ancho de banda consume?**  
R: Aproximadamente 1-5 MB por petición, dependiendo del tamaño de la respuesta.

**P: ¿Puedo usar OpenCode en múltiples computadoras?**  
R: Sí, instala en cada computadora y usa la misma API key.

**P: ¿Cómo actualizo OpenCode a la última versión?**  
R: `npm update -g @anthropic-ai/claude-code`

**P: ¿Cómo desinstalo OpenCode completamente?**  
R: `npm uninstall -g @anthropic-ai/claude-code`

---

## Recursos Adicionales

- 📖 [Guía de Instalación Principal](./guide.md)
- 📖 [FAQ Completo](./FAQ.md)
- 📖 [Guía Windows](./windows.md)
- 📖 [Guía macOS](./mac.md)
- 📖 [Guía Linux](./linux.md)

---

**Última actualización**: Enero 2026  
**Versión**: 1.0  
**Mantenido por**: Equipo FPUNA Summer 2026

---

*Si encontraste una solución que no está aquí, compártela con la comunidad para ayudar a otros estudiantes.*
