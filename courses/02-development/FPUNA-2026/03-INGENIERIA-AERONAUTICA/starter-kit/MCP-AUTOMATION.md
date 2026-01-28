# MCP-AUTOMATION.md - Automatizacion con Model Context Protocol

## Revoluciona tu Flujo de Trabajo en Ingenieria Aeronautica

---

## Que es MCP (Model Context Protocol)?

MCP es el "USB-C de la IA" - un protocolo estandar que permite a asistentes de IA (como Claude) controlar software externo directamente.

**Sin MCP:**
```
Tu: "Crea un perfil NACA 2412"
IA: "Aqui tienes las coordenadas..." (solo texto)
Tu: *copias manualmente a CAD*
```

**Con MCP:**
```
Tu: "Crea un perfil NACA 2412 en Fusion 360"
IA: *crea el modelo 3D directamente en Fusion 360*
```

---

## MCPs Disponibles para Aeronautica

### Tier 1: Impacto Alto (Usar YA)

| MCP | Que Automatiza | Ahorro de Tiempo |
|-----|----------------|------------------|
| **Fusion 360 MCP** | Modelado CAD 3D | 90% |
| **FreeCAD MCP** | CAD Open Source | 90% |
| **MATLAB MCP** | Calculos y graficos | 95% |
| **OpenFOAM MCP** | Configuracion CFD | 85% |
| **NumPy MCP** | Operaciones cientificas | 80% |

### Tier 2: Soporte (Muy Utiles)

| MCP | Que Automatiza | Uso |
|-----|----------------|-----|
| **Context7** | Documentacion actualizada | Buscar APIs |
| **Filesystem** | Operaciones de archivos | Gestion de proyectos |
| **Fetch** | Datos web (NACA, NASA) | Base de datos de perfiles |

---

## Instalacion de MCPs

### Paso 1: Requisitos Previos

```bash
# Verificar Node.js (requerido para la mayoria de MCPs)
node --version  # Debe ser 18+ 

# Si no tienes Node.js:
# Windows: winget install OpenJS.NodeJS
# Mac: brew install node
# Linux: sudo apt install nodejs npm

# Verificar Python
python --version  # Debe ser 3.11+
```

### Paso 2: Instalar MCPs Esenciales

```bash
# MCP de Filesystem (incluido con Claude Desktop)
npm install -g @modelcontextprotocol/server-filesystem

# MCP de Fetch para datos web
pip install mcp-server-fetch

# MCP de NumPy para calculos cientificos
pip install numpy-mcp

# Verificar instalacion
pip list | grep mcp
npm list -g --depth=0 | grep mcp
```

### Paso 3: Instalar MCPs de CAD

#### Fusion 360 MCP (Requiere Fusion 360 instalado)

```bash
# Opcion 1: Via npm
npm install -g fusion360-mcp-server

# Opcion 2: Desde Autodesk App Store
# https://apps.autodesk.com/FUSION/en/Detail/Index?id=7269770001970905100
```

#### FreeCAD MCP (Gratuito y Open Source)

```bash
# Clonar repositorio
git clone https://github.com/bonninr/freecad_mcp.git
cd freecad_mcp

# Instalar dependencias
pip install -e .
```

### Paso 4: Instalar MCPs de Simulacion

#### OpenFOAM MCP (Linux/WSL requerido)

```bash
# Clonar repositorio
git clone https://github.com/webworn/openfoam-mcp-server.git
cd openfoam-mcp-server

# Instalar
pip install -e .
```

#### MATLAB MCP (Requiere MATLAB instalado)

```bash
# Clonar repositorio oficial de MathWorks
git clone https://github.com/tsuchijo/matlab-mcp.git
cd matlab-mcp

# Instalar
pip install -e .

# Nota: MATLAB Engine para Python debe estar instalado
# Ver: https://www.mathworks.com/help/matlab/matlab_external/install-the-matlab-engine-for-python.html
```

---

## Configuracion de Claude Desktop

### Archivo de Configuracion

Crea/edita el archivo de configuracion de Claude Desktop:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Linux:** `~/.config/claude/claude_desktop_config.json`

### Configuracion Recomendada para Aeronautica

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/TU_USUARIO/Documents/Aeronautica"
      ]
    },
    "fetch": {
      "command": "python",
      "args": ["-m", "mcp_server_fetch"]
    },
    "numpy": {
      "command": "python",
      "args": ["-m", "numpy_mcp"]
    },
    "fusion360": {
      "command": "node",
      "args": ["C:/path/to/fusion360-mcp-server/index.js"]
    },
    "freecad": {
      "command": "python",
      "args": ["-m", "freecad_mcp"]
    },
    "matlab": {
      "command": "python",
      "args": ["-m", "matlab_mcp"]
    },
    "openfoam": {
      "command": "python",
      "args": ["-m", "openfoam_mcp_server"]
    }
  }
}
```

**IMPORTANTE:** Cambia `TU_USUARIO` y las rutas a las correctas en tu sistema.

---

## Uso de MCPs por Modulo

### Modulo 1: CAD con IA

#### Ejemplo: Crear Fuselaje con Fusion 360 MCP

```
Prompt: "Usando Fusion 360, crea un fuselaje cilindrico de 2 metros 
de longitud con diametro de 0.3m y nariz ojival de 0.4m de largo"
```

El MCP ejecutara los comandos directamente en Fusion 360.

#### Ejemplo: Diseno Parametrico con FreeCAD MCP

```
Prompt: "En FreeCAD, crea un perfil I-beam para el larguero del ala:
- Altura: 80mm
- Ancho de ala: 40mm  
- Espesor de alma: 3mm
- Espesor de ala: 5mm
Luego extruye a 2 metros de longitud"
```

### Modulo 2: Aerodinamica y CFD

#### Ejemplo: Calculos con NumPy MCP

```
Prompt: "Usando numpy_mcp, calcula la polar de arrastre para:
- CD0 = 0.025
- AR = 8
- e = 0.82
- CL de 0 a 1.5 en pasos de 0.1

Muestra tabla y grafica resultante"
```

#### Ejemplo: Configuracion CFD con OpenFOAM MCP

```
Prompt: "Configura un caso de OpenFOAM para simular flujo 
alrededor de un perfil NACA 0012:
- Reynolds: 500,000
- Angulo de ataque: 5 grados
- Solver: simpleFoam
- Modelo de turbulencia: k-omega SST"
```

### Modulo 3: Estructuras y Materiales

#### Ejemplo: Analisis Estructural con MATLAB MCP

```
Prompt: "Con MATLAB, calcula las cargas en el larguero del ala:
- Envergadura: 10m
- Distribucion eliptica de sustentacion
- MTOW: 800kg
- Factor de carga: 3.8g

Grafica cortante y momento flector vs posicion"
```

### Modulo 4: Sistemas de Propulsion

#### Ejemplo: Matching Motor-Helice con NumPy MCP

```
Prompt: "Usando numpy_mcp, realiza el matching entre:
Motor: 
- Potencia maxima: 15 HP @ 5500 RPM
- Curva de potencia: P = 15*(RPM/5500)^3 HP

Helice:
- Diametro: 1.4m
- Paso: 0.8m
- Eficiencia: n = 0.85 - 0.1*(J-0.6)^2

Encuentra el punto de operacion optimo"
```

### Modulo 5: Diseno de Aeronaves

#### Ejemplo: Trade Study Completo

```
Prompt: "Realiza un trade study parametrico variando:
- Aspect Ratio: 6 a 12
- Carga alar: 30 a 60 kg/m2

Para cada combinacion, calcula:
1. Velocidad de crucero optima
2. Alcance con 50L de combustible
3. Tasa de ascenso a nivel del mar

Presenta resultados en matriz de carpet plot"
```

---

## Demos Rapidas (Copy-Paste)

### Demo 1: NeuralFoil - Analisis de Perfil Instantaneo

```python
# Ejecutar directamente - no requiere MCP
from neuralfoil import get_aero_from_dat_file
import matplotlib.pyplot as plt
import numpy as np

# Analizar NACA 2412 a diferentes angulos
alphas = np.linspace(-5, 15, 21)
Re = 500000

cls, cds, cms = [], [], []
for alpha in alphas:
    aero = get_aero_from_dat_file("naca2412.dat", alpha=alpha, Re=Re)
    cls.append(aero['CL'])
    cds.append(aero['CD'])
    cms.append(aero['CM'])

# Graficar
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

axes[0].plot(alphas, cls, 'b-', linewidth=2)
axes[0].set_xlabel('Angulo de Ataque (deg)')
axes[0].set_ylabel('CL')
axes[0].set_title('Curva de Sustentacion')
axes[0].grid(True)

axes[1].plot(cds, cls, 'r-', linewidth=2)
axes[1].set_xlabel('CD')
axes[1].set_ylabel('CL')
axes[1].set_title('Polar de Arrastre')
axes[1].grid(True)

axes[2].plot(alphas, np.array(cls)/np.array(cds), 'g-', linewidth=2)
axes[2].set_xlabel('Angulo de Ataque (deg)')
axes[2].set_ylabel('L/D')
axes[2].set_title('Eficiencia Aerodinamica')
axes[2].grid(True)

plt.tight_layout()
plt.savefig('naca2412_analysis.png', dpi=150)
plt.show()

print(f"CL_max: {max(cls):.3f} a alpha = {alphas[cls.index(max(cls))]:.1f} deg")
print(f"(L/D)_max: {max(np.array(cls)/np.array(cds)):.2f}")
```

### Demo 2: AeroSandbox - Diseno Rapido de Ala

```python
import aerosandbox as asb
import aerosandbox.numpy as np

# Definir geometria del ala
wing = asb.Wing(
    name="Main Wing",
    symmetric=True,
    xsecs=[
        asb.WingXSec(
            xyz_le=[0, 0, 0],
            chord=1.5,
            airfoil=asb.Airfoil("naca4412"),
        ),
        asb.WingXSec(
            xyz_le=[0.3, 5, 0.5],  # Con diedro
            chord=0.6,
            airfoil=asb.Airfoil("naca4412"),
        ),
    ]
)

# Crear avion simple
airplane = asb.Airplane(
    name="UAV Trainer",
    wings=[wing],
)

# Visualizar
airplane.draw()

# Analisis aerodinamico rapido
aero = asb.AeroBuildup(
    airplane=airplane,
    op_point=asb.OperatingPoint(
        velocity=30,  # m/s
        alpha=5,  # grados
    ),
).run()

print(f"CL: {aero['CL']:.3f}")
print(f"CD: {aero['CD']:.4f}")
print(f"L/D: {aero['CL']/aero['CD']:.1f}")
```

### Demo 3: Genetic Algorithm para Optimizacion de Perfil

```python
from deap import base, creator, tools, algorithms
import numpy as np
import random

# Problema: Optimizar perfil NACA de 4 digitos
# Objetivo: Maximizar L/D a Re=500,000, alpha=5 deg

def evaluate_airfoil(individual):
    """Evalua un perfil NACA de 4 digitos"""
    m = individual[0]  # Max curvatura (0-9)
    p = individual[1]  # Posicion curvatura (0-9)
    t = individual[2]  # Espesor (06-24)
    
    # Validar
    if t < 6:
        t = 6
    if t > 24:
        t = 24
    
    # Simular evaluacion (en produccion usar NeuralFoil)
    # L/D aproximado basado en parametros tipicos
    ld = 10 + m * 0.5 - abs(p - 4) * 0.3 - (t - 12) ** 2 * 0.01
    
    return (ld,)  # DEAP requiere tupla

# Configurar algoritmo genetico
creator.create("FitnessMax", base.Fitness, weights=(1.0,))
creator.create("Individual", list, fitness=creator.FitnessMax)

toolbox = base.Toolbox()
toolbox.register("attr_m", random.randint, 0, 9)
toolbox.register("attr_p", random.randint, 1, 9)
toolbox.register("attr_t", random.randint, 6, 24)
toolbox.register("individual", tools.initCycle, creator.Individual,
                 (toolbox.attr_m, toolbox.attr_p, toolbox.attr_t), n=1)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

toolbox.register("evaluate", evaluate_airfoil)
toolbox.register("mate", tools.cxTwoPoint)
toolbox.register("mutate", tools.mutUniformInt, low=[0, 1, 6], up=[9, 9, 24], indpb=0.3)
toolbox.register("select", tools.selTournament, tournsize=3)

# Ejecutar
population = toolbox.population(n=50)
ngen = 20

for gen in range(ngen):
    offspring = algorithms.varAnd(population, toolbox, cxpb=0.5, mutpb=0.2)
    fits = map(toolbox.evaluate, offspring)
    for fit, ind in zip(fits, offspring):
        ind.fitness.values = fit
    population = toolbox.select(offspring, k=len(population))
    
    best = tools.selBest(population, k=1)[0]
    print(f"Gen {gen+1}: Mejor NACA {best[0]}{best[1]}{best[2]:02d} - L/D = {best.fitness.values[0]:.2f}")

# Resultado final
best = tools.selBest(population, k=1)[0]
print(f"\nPerfil optimo: NACA {best[0]}{best[1]}{best[2]:02d}")
```

---

## Troubleshooting

### Error: MCP no se conecta

1. Verifica que el software base este instalado (Fusion 360, FreeCAD, MATLAB, OpenFOAM)
2. Reinicia Claude Desktop despues de editar la configuracion
3. Verifica rutas en el archivo de configuracion

### Error: Permisos de archivo

```bash
# Windows (PowerShell como admin)
icacls "C:\Users\TU_USUARIO\Documents\Aeronautica" /grant TU_USUARIO:F

# Mac/Linux
chmod -R 755 ~/Documents/Aeronautica
```

### Error: MATLAB Engine no encontrado

```bash
# En directorio de MATLAB
cd "C:\Program Files\MATLAB\R2024a\extern\engines\python"
python setup.py install
```

### Error: OpenFOAM no disponible

OpenFOAM solo funciona en Linux. Opciones:
1. Usar WSL2 en Windows
2. Docker: `docker run -it openfoam/openfoam11-paraview510`
3. VM con Ubuntu

---

## Flujo de Trabajo Recomendado

```
1. DISENAR (Fusion 360 / FreeCAD MCP)
   |
   v
2. ANALIZAR (NumPy / MATLAB MCP)
   |
   v
3. SIMULAR (OpenFOAM MCP)
   |
   v
4. ITERAR (Repetir hasta cumplir requisitos)
   |
   v
5. DOCUMENTAR (Filesystem MCP + Claude)
```

---

## Comparacion: Con vs Sin MCP

| Tarea | Sin MCP | Con MCP | Ahorro |
|-------|---------|---------|--------|
| Crear modelo 3D de ala | 2-4 horas | 10-15 min | 90% |
| Configurar caso CFD | 2-3 horas | 15-20 min | 88% |
| Calculos de performance | 1-2 horas | 5-10 min | 92% |
| Trade study parametrico | 8+ horas | 1-2 horas | 85% |
| Optimizacion de perfil | Dias | Horas | 90% |
| **Ciclo de diseno completo** | **2-3 semanas** | **2-3 dias** | **85%** |

---

## Recursos Adicionales

### Repositorios de MCPs

- **Lista oficial**: https://github.com/modelcontextprotocol/servers
- **Awesome MCP**: https://github.com/wong2/awesome-mcp-servers
- **MCP Registry**: https://github.com/mcp

### Documentacion

- **MCP Spec**: https://modelcontextprotocol.io
- **Fusion 360 API**: https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-A92A4B10-3781-4925-94C6-47DA85A4F65A
- **FreeCAD Python**: https://wiki.freecad.org/Python_scripting_tutorial
- **OpenFOAM User Guide**: https://www.openfoam.com/documentation/user-guide

### Comunidad

- **MCP Discord**: https://discord.gg/mcp
- **OpenFOAM Forum**: https://www.cfd-online.com/Forums/openfoam/

---

*MCP-AUTOMATION.md - Track 03 Aeronautica - FPUNA 2026*
