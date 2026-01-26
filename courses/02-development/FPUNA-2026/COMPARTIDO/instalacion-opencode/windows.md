# Guía de Instalación de OpenCode para Windows

## Guía Completa para Windows 10 y Windows 11

Esta guía está diseñada específicamente para usuarios de Windows y cubre todos los pasos necesarios para instalar OpenCode en tu sistema.

**Tiempo estimado**: 20-30 minutos  
**Nivel**: Principiante  
**Sistema**: Windows 10 (build 19041+) o Windows 11

---

## Requisitos Previos

### Verificar Versión de Windows

1. Presiona `Windows + R`
2. Escribe `winver` y presiona Enter
3. Verifica que tienes Windows 10 (versión 2004+) o Windows 11

### Permisos de Administrador

Necesitarás permisos de administrador para instalar software. Si estás en una computadora de la universidad, contacta a soporte IT.

---

## Paso 1: Instalar Node.js en Windows

### Opción A: Instalador Oficial (Recomendado para Principiantes)

1. **Descargar Node.js**:
   - Ve a https://nodejs.org/
   - Descarga la versión **LTS** (Long Term Support)
   - Archivo: `node-v18.x.x-x64.msi` (aproximadamente 30 MB)

2. **Ejecutar el Instalador**:
   - Haz doble clic en el archivo descargado
   - Click en "Next" en la pantalla de bienvenida
   - Acepta los términos de licencia
   - **IMPORTANTE**: Marca la casilla "Automatically install the necessary tools..."
   - Click "Next" hasta "Install"
   - Espera 2-3 minutos

3. **Verificar la Instalación**:
   
   Abre **PowerShell** o **Command Prompt**:
   - Presiona `Windows + R`
   - Escribe `powershell` y presiona Enter
   
   Ejecuta:
   ```powershell
   node --version
   npm --version
   ```
   
   **Salida esperada**:
   ```
   v18.17.0
   9.6.7
   ```

### Opción B: Usando Winget (Windows 11 o Windows 10 22H2+)

```powershell
# Abrir PowerShell como Administrador
winget install OpenJS.NodeJS.LTS
```

### Opción C: Usando Chocolatey

Si ya tienes Chocolatey instalado:

```powershell
# Abrir PowerShell como Administrador
choco install nodejs-lts
```

---

## Paso 2: Configurar PowerShell

### Actualizar PowerShell (Opcional pero Recomendado)

1. **Instalar PowerShell 7**:
   
   ```powershell
   # En PowerShell como Administrador
   winget install Microsoft.PowerShell
   ```

2. **Configurar Política de Ejecución**:
   
   ```powershell
   # Permitir ejecución de scripts
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   
   Cuando te pregunte, escribe `Y` y presiona Enter.

### Configurar Terminal Windows (Opcional)

Windows Terminal es una terminal moderna y mejorada:

```powershell
winget install Microsoft.WindowsTerminal
```

**Ventajas**:
- Pestañas múltiples
- Mejor soporte de colores
- Copiar/pegar mejorado
- Atajos de teclado personalizables

---

## Paso 3: Instalar OpenCode

### Instalación Global

1. **Abrir PowerShell**:
   - Presiona `Windows + X`
   - Selecciona "Windows PowerShell (Admin)" o "Terminal (Admin)"

2. **Instalar OpenCode**:
   
   ```powershell
   npm install -g @anthropic-ai/claude-code
   ```
   
   **¿Qué hace este comando?**
   - `npm` - El gestor de paquetes de Node.js
   - `install` - Comando para instalar paquetes
   - `-g` - Flag de instalación global (disponible en todo el sistema)
   - `@anthropic-ai/claude-code` - Paquete oficial de OpenCode

3. **Esperar la Instalación**:
   
   Verás una salida similar a:
   ```
   added 45 packages in 30s
   ```
   
   **Tiempo estimado**: 1-3 minutos dependiendo de tu conexión

### Verificar PATH

OpenCode debe estar en tu PATH. Verifica ejecutando:

```powershell
claude --version
```

**Si ves un error** "claude no se reconoce como comando":

1. Cierra y vuelve a abrir PowerShell
2. Si persiste, verifica que `%APPDATA%\npm` está en tu PATH:
   
   ```powershell
   $env:PATH -split ';' | Select-String "npm"
   ```

---

## Paso 4: Configurar API Key de Anthropic

### Obtener tu API Key

1. Ve a https://console.anthropic.com/
2. Crea una cuenta con tu correo de FPUNA o personal
3. Completa la verificación de email
4. Ve a la sección "API Keys"
5. Click en "Create Key"
6. Copia la clave (formato: `sk-ant-...`)

**⚠️ IMPORTANTE**: Guarda esta clave en un lugar seguro. No la compartas con nadie.

### Configurar la API Key en Windows

#### Opción A: Variable de Entorno del Sistema (Permanente)

1. **Abrir Configuración de Variables de Entorno**:
   - Presiona `Windows + R`
   - Escribe `sysdm.cpl` y presiona Enter
   - Ve a la pestaña "Opciones Avanzadas"
   - Click en "Variables de Entorno"

2. **Crear Nueva Variable**:
   - En "Variables de usuario", click "Nueva..."
   - **Nombre**: `ANTHROPIC_API_KEY`
   - **Valor**: Tu clave API (pega la clave completa)
   - Click "Aceptar" en todas las ventanas

3. **Reiniciar PowerShell**:
   - Cierra todas las ventanas de PowerShell
   - Abre una nueva ventana

4. **Verificar**:
   ```powershell
   echo $env:ANTHROPIC_API_KEY
   ```
   
   Deberías ver tu clave API.

#### Opción B: PowerShell Profile (Sesión Actual)

Para configurar la clave solo en la sesión actual:

```powershell
$env:ANTHROPIC_API_KEY="sk-ant-tu-clave-aqui"
```

**Nota**: Esta configuración se pierde al cerrar PowerShell.

#### Opción C: Archivo .env (Por Proyecto)

1. Crea un archivo `.env` en tu carpeta de proyecto:
   
   ```powershell
   # Navega a tu carpeta de proyecto
   cd C:\Users\TuUsuario\Proyectos\MiProyecto
   
   # Crea archivo .env
   New-Item .env -ItemType File
   ```

2. Edita `.env` con Notepad:
   
   ```
   ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui
   ```

3. OpenCode cargará automáticamente esta configuración.

---

## Paso 5: Instalar Git (Opcional pero Recomendado)

Git es esencial para control de versiones:

### Usando Winget:

```powershell
winget install Git.Git
```

### Usando el Instalador:

1. Descarga de https://git-scm.com/download/win
2. Ejecuta el instalador
3. Usa las opciones predeterminadas
4. **IMPORTANTE**: Selecciona "Use Git from the Windows Command Prompt"

### Verificar:

```powershell
git --version
```

---

## Paso 6: Instalar Visual Studio Code

VS Code es el editor recomendado para usar con OpenCode.

### Instalación:

```powershell
winget install Microsoft.VisualStudioCode
```

O descarga desde https://code.visualstudio.com/

### Extensiones Recomendadas:

Una vez instalado VS Code:

1. Abre VS Code
2. Ve a Extensions (Ctrl + Shift + X)
3. Instala estas extensiones:
   - **Claude Code** (oficial de Anthropic)
   - **GitLens** (para Git)
   - **Prettier** (formato de código)
   - **ESLint** (linting JavaScript)
   - **Spanish Language Pack** (interfaz en español)

---

## Paso 7: Prueba Completa

### Prueba 1: Comando Básico

```powershell
claude "Hola, ¿estás funcionando correctamente?"
```

**Salida esperada**: Una respuesta amigable de Claude.

### Prueba 2: Generar Código

```powershell
claude "Crea una función en JavaScript que salude en español"
```

**Salida esperada**: Un archivo con código JavaScript generado.

### Prueba 3: Crear Proyecto

```powershell
# Crear carpeta de prueba
mkdir C:\Proyectos\PruebaOpenCode
cd C:\Proyectos\PruebaOpenCode

# Inicializar proyecto
npm init -y

# Usar OpenCode
claude "Crea un servidor web básico con Node.js que muestre 'Hola FPUNA'"
```

---

## Configuración Avanzada para Windows

### PowerShell Profile Personalizado

Crea un perfil de PowerShell para automatizar tu configuración:

```powershell
# Editar perfil
notepad $PROFILE
```

Agrega estas líneas:

```powershell
# Configurar API Key de Claude
$env:ANTHROPIC_API_KEY="tu-clave-aqui"

# Alias útiles
Set-Alias cl claude

# Función para abrir VS Code en carpeta actual
function code-here {
    code .
}

# Mensaje de bienvenida
Write-Host "OpenCode está listo! Usa 'cl' como atajo." -ForegroundColor Green
```

Guarda y cierra. Reinicia PowerShell.

### Windows Subsystem for Linux (WSL) - Avanzado

Para desarrolladores que prefieren Linux:

```powershell
# Instalar WSL
wsl --install -d Ubuntu

# Luego sigue la guía de Linux
```

---

## Solución de Problemas Específicos de Windows

### Problema 1: "No se puede ejecutar scripts"

**Error**:
```
... no se puede cargar porque la ejecución de scripts está deshabilitada...
```

**Solución**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problema 2: "claude no se reconoce como comando"

**Solución**:

1. Verificar instalación de npm:
   ```powershell
   npm list -g @anthropic-ai/claude-code
   ```

2. Agregar npm al PATH manualmente:
   ```powershell
   # Agregar a PATH de sesión actual
   $env:PATH += ";$env:APPDATA\npm"
   ```

3. Para hacerlo permanente, agrega `%APPDATA%\npm` a las variables de entorno del sistema.

### Problema 3: Error de Permisos

**Solución**:

1. Ejecuta PowerShell como Administrador
2. O usa `--location=user` en lugar de `-g`:
   ```powershell
   npm install --location=user @anthropic-ai/claude-code
   ```

### Problema 4: Antivirus Bloquea la Instalación

Algunos antivirus (como Windows Defender) pueden bloquear la instalación.

**Solución**:

1. Temporalmente desactiva el antivirus
2. Instala OpenCode
3. Agrega una excepción para `%APPDATA%\npm`
4. Reactiva el antivirus

### Problema 5: Instalación Lenta

**Solución**:

```powershell
# Usar otro registro de npm
npm config set registry https://registry.npmmirror.com

# Luego instala OpenCode
npm install -g @anthropic-ai/claude-code

# Restaurar registro original
npm config set registry https://registry.npmjs.org
```

---

## Checklist de Verificación Windows

- [ ] Windows 10 (2004+) o Windows 11 instalado
- [ ] Node.js v18+ instalado (`node --version`)
- [ ] npm v9+ instalado (`npm --version`)
- [ ] PowerShell configurado (ExecutionPolicy ajustado)
- [ ] OpenCode instalado (`claude --version`)
- [ ] API Key configurada (`echo $env:ANTHROPIC_API_KEY`)
- [ ] Git instalado (`git --version`)
- [ ] VS Code instalado con extensiones
- [ ] Prueba básica exitosa (`claude "test"`)

---

## Ejemplo Práctico: Primer Proyecto en Windows

Vamos a crear un proyecto real paso a paso:

```powershell
# 1. Crear carpeta del proyecto
mkdir C:\Proyectos\CalculadoraGuaranies
cd C:\Proyectos\CalculadoraGuaranies

# 2. Inicializar proyecto Node.js
npm init -y

# 3. Usar OpenCode para crear la calculadora
claude "Crea una calculadora de conversión de monedas entre USD y Guaraníes (₲). Usa una tasa de cambio de ₲7,200 por USD. Incluye funciones para convertir en ambas direcciones y mostrar resultados formateados con separadores de miles."

# 4. OpenCode creará los archivos necesarios

# 5. Ejecutar el código
node index.js

# 6. Abrir en VS Code para editar
code .
```

---

## Recursos para Usuarios de Windows

- **Documentación de PowerShell**: https://docs.microsoft.com/powershell/
- **Windows Terminal**: https://aka.ms/terminal
- **Node.js para Windows**: https://nodejs.org/en/download/
- **Git para Windows**: https://gitforwindows.org/
- **Soporte FPUNA**: soporte-ia@fpuna.edu.py

---

## Próximos Pasos

Ahora que OpenCode está funcionando en Windows:

1. 📖 Aprende: [Configuración de MCPs](../mcp-configuration/README.md)
2. 📖 Explora: [Sistema de Skills](../skills-system/README.md)
3. 📖 Domina: [Hooks y Rules](../hooks-rules/README.md)

---

**¡Felicitaciones!** 🎉

Has instalado exitosamente OpenCode en Windows. Estás listo para comenzar a desarrollar con IA.

---

*Guía específica para Windows creada para FPUNA Summer 2026*  
*Última actualización: Enero 2026*
