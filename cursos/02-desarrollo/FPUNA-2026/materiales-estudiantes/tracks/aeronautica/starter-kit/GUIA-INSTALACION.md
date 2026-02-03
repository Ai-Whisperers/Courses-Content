# Guia de Instalacion - Ingenieria Aeronautica con IA

## FPUNA Verano 2026 - Track 03

Esta guia te llevara paso a paso por la instalacion de todo el software necesario para el curso.

**Tiempo estimado**: 30-45 minutos (depende de la velocidad de internet)

---

## Prerequisitos del Sistema

### Hardware Minimo
- **CPU**: Intel i5 / AMD Ryzen 5 (o superior)
- **RAM**: 8 GB (16 GB recomendado para CFD)
- **Disco**: 20 GB libres
- **GPU**: Integrada (dedicada recomendada para visualizacion 3D)

### Sistema Operativo
- Windows 10/11 (64-bit)
- macOS 12+ (Apple Silicon o Intel)
- Ubuntu 20.04+ / Debian 11+

---

## Paso 1: Python y Librerias Cientificas

### 1.1 Verificar Python

Abre una terminal (CMD en Windows, Terminal en Mac/Linux):

```bash
python --version
```

**Esperado**: Python 3.10 o superior (3.11 recomendado)

Si no tienes Python:
- **Windows**: https://www.python.org/downloads/
- **Mac**: `brew install python@3.11`
- **Linux**: `sudo apt install python3.11 python3.11-venv`

### 1.2 Instalar Librerias Cientificas

```bash
pip install numpy scipy matplotlib pandas
pip install filterpy scikit-learn
pip install ambiance pyvista vtk
pip install jupyter notebook
```

**Verificar instalacion**:
```bash
python -c "import numpy, scipy, matplotlib, pandas; print('Librerias OK')"
```

### 1.3 Librerias para Dashboard (Opcional)

Para ejecutar el dashboard de telemetria:
```bash
pip install streamlit plotly
```

---

## Paso 2: Git y VS Code

### 2.1 Git

**Windows**:
```bash
winget install --id Git.Git -e --source winget
```

**Mac**:
```bash
xcode-select --install
```

**Linux**:
```bash
sudo apt install git
```

Verificar:
```bash
git --version
```

### 2.2 VS Code

**Windows**:
```bash
winget install --id Microsoft.VisualStudioCode -e
```

**Mac**:
```bash
brew install --cask visual-studio-code
```

**Linux**:
```bash
sudo snap install code --classic
```

Verificar:
```bash
code --version
```

---

## Paso 3: Herramientas de Visualizacion CFD

### 3.1 ParaView (Visualizacion de datos CFD)

**Windows**:
```bash
winget install --id Kitware.ParaView -e
```

**Mac**:
```bash
brew install --cask paraview
```

**Linux**:
```bash
sudo apt install paraview
```

Verificar: Busca "ParaView" en el menu de inicio/aplicaciones.

---

## Paso 4: Herramientas Aeronauticas (Descarga Manual)

Estas herramientas requieren descarga manual desde sus sitios oficiales.

### 4.1 XFLR5 - Analisis de Perfiles Aerodinamicos

**Sitio oficial**: https://sourceforge.net/projects/xflr5/

1. Ir al enlace
2. Click en "Download"
3. Ejecutar el instalador (.exe para Windows, .dmg para Mac)
4. Seguir instrucciones del instalador

**Ubicacion tipica despues de instalar**:
- Windows: `C:\Program Files\XFLR5\xflr5.exe`
- Mac: `/Applications/xflr5.app`

**Verificar**: Busca "XFLR5" en el menu de inicio.

### 4.2 OpenVSP - Modelado Parametrico de Aeronaves

**Sitio oficial**: https://openvsp.org/download.shtml

1. Ir al enlace
2. Seleccionar tu sistema operativo
3. Descargar el instalador
4. Ejecutar y seguir instrucciones

**Verificar**: Busca "OpenVSP" en el menu de inicio.

### 4.3 Fusion 360 - CAD 3D (Cuenta Educativa Gratuita)

**Sitio oficial**: https://www.autodesk.com/education/home

1. Crear cuenta con email educativo (.edu o similar)
2. Ir a: https://www.autodesk.com/education/edu-software/overview
3. Buscar "Fusion 360"
4. Click en "Get product"
5. Descargar e instalar

**Nota**: La licencia educativa es gratuita por 1 ano y renovable.

---

## Paso 5: Verificacion Final

Ejecuta el script de verificacion incluido en el starter-kit:

```bash
cd starter-kit
python verify_setup.py
```

**Resultado esperado**:
```
Verificaciones exitosas: 7+
Verificaciones fallidas: 2 o menos
```

Si alguna verificacion falla, revisa las instrucciones de esa herramienta arriba.

---

## Resolucion de Problemas Comunes

### Python no encontrado en Windows

1. Reinstalar Python desde python.org
2. Durante instalacion, marcar "Add Python to PATH"
3. Reiniciar la terminal

### pip no funciona

```bash
python -m ensurepip --upgrade
python -m pip install --upgrade pip
```

### VS Code no abre desde terminal

1. Abrir VS Code manualmente
2. Presionar `Ctrl+Shift+P`
3. Escribir "Shell Command: Install 'code' command in PATH"
4. Reiniciar terminal

### XFLR5 no inicia en Windows

- Instalar Visual C++ Redistributable: https://aka.ms/vs/17/release/vc_redist.x64.exe
- Reiniciar y volver a intentar

### Errores de Unicode/Emojis en terminal Windows

Algunas scripts usan emojis. Si ves caracteres extranos:
```bash
set PYTHONIOENCODING=utf-8
python script.py
```

O ejecutar desde VS Code terminal (mejor soporte Unicode).

---

## Paso 6: Herramientas de IA para Aeronautica

### 6.1 NeuralFoil y AeroSandbox (IMPRESCINDIBLES)

```bash
# Analisis de perfiles 1000x mas rapido que XFOIL
pip install neuralfoil

# Framework de diseno de aeronaves con optimizacion
pip install aerosandbox

# Verificar instalacion
python -c "import neuralfoil; print('NeuralFoil OK')"
python -c "import aerosandbox; print('AeroSandbox OK')"
```

### 6.2 MCPs (Model Context Protocols)

Los MCPs permiten a Claude controlar software externo directamente.

```bash
# MCP para calculos cientificos con NumPy
pip install numpy-mcp

# MCP para obtener datos de la web (perfiles NACA, etc.)
pip install mcp-server-fetch

# Verificar
pip list | grep mcp
```

### 6.3 Configurar Claude Desktop para MCPs

1. Abre Claude Desktop
2. Ve a Settings > Developer > Edit Config
3. Agrega la configuracion de MCPs (ver MCP-AUTOMATION.md)

### 6.4 Librerias de Optimizacion

```bash
# Algoritmos geneticos (para optimizacion de perfiles)
pip install deap

# Visualizacion avanzada
pip install plotly

# Verificar
python -c "from deap import base; print('DEAP OK')"
```

---

## Paso 7: Verificacion de Herramientas de IA

Ejecuta este script para verificar todas las herramientas de IA:

```bash
python -c "
import sys
tools = []

# NeuralFoil
try:
    import neuralfoil
    tools.append(('NeuralFoil', 'OK', neuralfoil.__version__ if hasattr(neuralfoil, '__version__') else '?'))
except: tools.append(('NeuralFoil', 'FALTA', ''))

# AeroSandbox
try:
    import aerosandbox
    tools.append(('AeroSandbox', 'OK', aerosandbox.__version__))
except: tools.append(('AeroSandbox', 'FALTA', ''))

# NumPy MCP
try:
    import numpy_mcp
    tools.append(('NumPy MCP', 'OK', ''))
except: tools.append(('NumPy MCP', 'FALTA', ''))

# DEAP
try:
    from deap import base
    tools.append(('DEAP', 'OK', ''))
except: tools.append(('DEAP', 'FALTA', ''))

print('\\n=== Herramientas de IA para Aeronautica ===')
for name, status, ver in tools:
    print(f'{name}: {status} {ver}')
"
```

---

## Software Opcional (Avanzado)

### OpenFOAM (CFD Open Source)

Solo para Linux/WSL. No requerido para el curso basico.

**Ubuntu/WSL**:
```bash
sudo sh -c "wget -O - https://dl.openfoam.org/gpg.key | apt-key add -"
sudo add-apt-repository http://dl.openfoam.org/ubuntu
sudo apt update
sudo apt install openfoam11
```

### ANSYS Student (FEA/CFD Profesional)

**Sitio**: https://www.ansys.com/academic/students

1. Crear cuenta de estudiante
2. Descargar ANSYS Student (version gratuita limitada)
3. Requiere ~15 GB de espacio

---

## Estructura de Carpetas Recomendada

Despues de la instalacion, organiza tu trabajo asi:

```
Documents/
  Aeronautica-FPUNA/
    proyecto-uav/
      analisis/
        aerodinamica/
        estructural/
      diseno/
        cad/
        planos/
      codigo/
      datos/
      docs/
```

---

## Contacto y Soporte

- **Slack**: #aero-engineering-2026
- **Email**: aero-instructor@fpuna.edu.py

Si tienes problemas con la instalacion, envia:
1. Captura de pantalla del error
2. Sistema operativo y version
3. Comando que ejecutaste

---

*INSTALLATION-GUIDE.md - Track 03 Aeronautica - FPUNA 2026*
