# QUICKSTART: IA y MCPs para Ingenieria Aeronautica

**Tiempo estimado: 15 minutos para tener todo funcionando**

---

## Paso 1: Instalar Herramientas de IA (5 min)

```bash
# Abrir terminal en VS Code y ejecutar:
pip install neuralfoil aerosandbox deap numpy matplotlib

# Verificar instalacion
python -c "import neuralfoil, aerosandbox; print('OK!')"
```

---

## Paso 2: Tu Primer Analisis (2 min)

Crea un archivo `test_ia.py` y ejecuta:

```python
from neuralfoil import get_aero_from_airfoil_name

# Analizar perfil NACA 2412
for alpha in range(-5, 16, 5):
    aero = get_aero_from_airfoil_name("naca2412", alpha=alpha, Re=500000)
    print(f"alpha={alpha:3d}  CL={aero['CL']:6.3f}  CD={aero['CD']:7.5f}  L/D={aero['CL']/aero['CD']:6.1f}")
```

**Resultado esperado:**
```
alpha= -5  CL=-0.312  CD=0.00912  L/D= -34.2
alpha=  0  CL= 0.221  CD=0.00654  L/D=  33.8
alpha=  5  CL= 0.753  CD=0.00821  L/D=  91.7
alpha= 10  CL= 1.215  CD=0.01342  L/D=  90.5
alpha= 15  CL= 1.456  CD=0.02891  L/D=  50.4
```

---

## Paso 3: Comparar Perfiles (3 min)

```python
from neuralfoil import get_aero_from_airfoil_name
import matplotlib.pyplot as plt

perfiles = ["naca0012", "naca2412", "naca4415"]
alpha = 5
Re = 500000

print("Comparacion de perfiles a alpha=5, Re=500k:\n")
print(f"{'Perfil':<12} {'CL':>8} {'CD':>10} {'L/D':>8}")
print("-" * 40)

for perfil in perfiles:
    aero = get_aero_from_airfoil_name(perfil, alpha=alpha, Re=Re)
    ld = aero['CL'] / aero['CD']
    print(f"{perfil:<12} {aero['CL']:8.3f} {aero['CD']:10.5f} {ld:8.1f}")
```

---

## Paso 4: Disenar un Ala con AeroSandbox (5 min)

```python
import aerosandbox as asb
import aerosandbox.numpy as np

# Crear ala simple
wing = asb.Wing(
    name="Main Wing",
    symmetric=True,
    xsecs=[
        asb.WingXSec(xyz_le=[0, 0, 0], chord=0.3, airfoil=asb.Airfoil("naca2412")),
        asb.WingXSec(xyz_le=[0.03, 1.5, 0.05], chord=0.15, airfoil=asb.Airfoil("naca2412")),
    ]
)

# Crear avion
airplane = asb.Airplane(name="Mi UAV", wings=[wing])

# Visualizar (abre ventana 3D)
airplane.draw()

print(f"Superficie alar: {wing.area():.2f} m2")
print(f"Envergadura: {wing.span():.2f} m")
print(f"Aspect Ratio: {wing.aspect_ratio():.2f}")
```

---

## Que Puedes Hacer Ahora

### Con NeuralFoil:
- Analizar cualquier perfil NACA en milisegundos
- Comparar docenas de perfiles instantaneamente
- Generar polares completas
- Estudiar efecto de Reynolds

### Con AeroSandbox:
- Disenar alas con geometria parametrica
- Crear aviones completos (fuselaje, empenaje)
- Ejecutar analisis aerodinamico
- Optimizar diseno automaticamente

### Con MCPs (avanzado):
- Automatizar Fusion 360 para CAD
- Configurar simulaciones OpenFOAM
- Ejecutar calculos en MATLAB
- Ver [MCP-AUTOMATION.md](./MCP-AUTOMATION.md)

---

## Proximos Pasos

1. **Ejecutar demos completos:**
   ```bash
   python examples/ai-demos/01_neuralfoil_demo.py
   python examples/ai-demos/02_aerosandbox_demo.py
   python examples/ai-demos/03_genetic_optimization_demo.py
   ```

2. **Leer documentacion:**
   - [AI-INTEGRATION.md](./AI-INTEGRATION.md) - Guia completa
   - [MCP-AUTOMATION.md](./MCP-AUTOMATION.md) - Automatizacion avanzada
   - [20-IDEAS.md](./20-IDEAS.md) - Ideas #21-30 usan estas herramientas

3. **Aplicar a tu proyecto:**
   - Reemplaza calculos manuales con NeuralFoil
   - Usa AeroSandbox para explorar variaciones de diseno
   - Optimiza perfiles con algoritmos geneticos

---

## Troubleshooting

### Error: ModuleNotFoundError
```bash
pip install --upgrade neuralfoil aerosandbox
```

### Error: No module named 'aerosandbox'
```bash
pip uninstall aerosandbox
pip install aerosandbox
```

### AeroSandbox draw() no muestra nada
```bash
pip install pyvista
```

### Matplotlib no muestra graficos
Agregar al inicio del script:
```python
import matplotlib
matplotlib.use('TkAgg')  # o 'Qt5Agg'
```

---

## Recursos

- **NeuralFoil Docs:** https://github.com/peterdsharpe/NeuralFoil
- **AeroSandbox Docs:** https://github.com/peterdsharpe/AeroSandbox
- **Ejemplos:** `starter-kit/examples/ai-demos/`

---

*QUICKSTART-MCP.md - FPUNA 2026 Ingenieria Aeronautica*
