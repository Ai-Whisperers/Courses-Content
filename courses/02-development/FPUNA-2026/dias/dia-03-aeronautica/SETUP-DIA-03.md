# Setup Día 3: IA para Ingeniería Aeronáutica

## Guía de Instalación para Aeronáutica

> **Pre-requisito**: Haber completado el [Setup del Día 1](../dia-01-fundamentos/SETUP-DIA-01.md)

---

## 1. Python 3.11+ (Obligatorio)

**¿Qué es?** Lenguaje de programación usado para cálculos científicos.

### Instalación

#### Windows
1. Ir a https://www.python.org/downloads/
2. Descargar Python 3.11 o superior
3. **IMPORTANTE**: Marcar ✅ "Add Python to PATH"
4. Click en "Install Now"

#### macOS
```bash
# Con Homebrew (recomendado)
brew install python@3.11

# O descargar de python.org
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Fedora
sudo dnf install python3 python3-pip
```

### Verificar Instalación
```bash
python --version
# o en algunos sistemas:
python3 --version
# Debe mostrar: Python 3.11.x o superior

pip --version
# o: pip3 --version
# Debe mostrar: pip 23.x o superior
```

---

## 2. NumPy + Matplotlib (Obligatorio)

**¿Qué son?** Librerías para cálculos numéricos y gráficos.

### Instalación
```bash
# Instalar ambas librerías
pip install numpy matplotlib

# O en algunos sistemas:
pip3 install numpy matplotlib
```

### Librerías Adicionales Recomendadas
```bash
pip install scipy pandas
```

### Verificar Instalación
```python
# Abrir Python en terminal
python

# En el intérprete de Python:
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>> np.__version__
'1.26.x'  # o similar
>>> exit()
```

---

## 3. Jupyter Notebook (Recomendado)

**¿Qué es?** Entorno interactivo para código Python con gráficos.

### Instalación
```bash
pip install notebook

# O instalar JupyterLab (más moderno)
pip install jupyterlab
```

### Iniciar Jupyter
```bash
# Jupyter Notebook clásico
jupyter notebook

# O JupyterLab
jupyter lab
```

Se abrirá automáticamente en el navegador.

### Alternativa: VS Code con Jupyter
1. En VS Code, instalar extensión "Jupyter"
2. Crear archivo .ipynb
3. Ejecutar celdas directamente en VS Code

---

## 4. XFLR5 (Opcional - Análisis de Perfiles)

**¿Qué es?** Software gratuito para análisis de perfiles alares y aeronaves.

### Windows
1. Ir a https://www.xflr5.tech/xflr5.htm
2. Descargar versión para Windows
3. Extraer ZIP
4. Ejecutar xflr5.exe (no requiere instalación)

### macOS
1. Descargar versión macOS de xflr5.tech
2. Puede requerir: System Preferences → Security → Allow

### Linux
```bash
# Ubuntu/Debian
sudo apt install xflr5

# O descargar AppImage de xflr5.tech
```

### Verificar Instalación
1. Abrir XFLR5
2. File → Open → Seleccionar archivo de perfil
3. Debe cargar sin errores

---

## 5. OpenVSP (Opcional - Diseño Paramétrico)

**¿Qué es?** Software de NASA para diseño paramétrico de aeronaves.

### Todas las Plataformas
1. Ir a https://openvsp.org/
2. Click en "Download"
3. Seleccionar tu sistema operativo
4. Descargar e instalar

### Windows
- Descargar instalador .exe
- Ejecutar instalador

### macOS
- Descargar .dmg
- Arrastrar a Aplicaciones

### Linux
- Descargar AppImage
- Hacer ejecutable: `chmod +x OpenVSP*.AppImage`
- Ejecutar

### Verificar Instalación
1. Abrir OpenVSP
2. Crear nueva geometría básica
3. Debe renderizar en pantalla

---

## 6. Calculadora Científica Online (Alternativa)

Si tienes problemas con instalaciones, usar estas alternativas online:

### Para Python/Jupyter
- Google Colab: https://colab.research.google.com/
  - Gratuito con cuenta Google
  - NumPy, Matplotlib ya instalados
  - Guardar notebooks en Drive

### Para Análisis de Perfiles
- Airfoil Tools: http://airfoiltools.com/
  - Análisis online de perfiles NACA
  - No requiere instalación

---

## 7. Archivos de Práctica

### Crear Carpeta de Trabajo
```bash
mkdir ~/fpuna-aero
cd ~/fpuna-aero
```

### Descargar Perfiles NACA (para ejercicios)
```bash
# Crear archivo de prueba
# Guardar como naca2412.dat

#NACA 2412
1.000000  0.001300
0.950000  0.014700
0.900000  0.027700
# ... (más puntos)
```

O descargar de: http://airfoiltools.com/airfoil/naca4digit

---

## 8. Script de Prueba

Crear archivo `test_aero.py`:

```python
#!/usr/bin/env python3
"""
Script de prueba para setup de Aeronáutica
FPUNA Verano 2026
"""

import numpy as np
import matplotlib.pyplot as plt

# Datos de ejemplo: Cl vs Alpha para NACA 2412
alpha = np.array([-4, -2, 0, 2, 4, 6, 8, 10, 12])  # grados
cl = np.array([-0.2, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.1, 1.15])

# Crear gráfico
plt.figure(figsize=(8, 6))
plt.plot(alpha, cl, 'b-o', linewidth=2, markersize=8)
plt.xlabel('Ángulo de Ataque (°)', fontsize=12)
plt.ylabel('Coeficiente de Sustentación (Cl)', fontsize=12)
plt.title('Curva de Sustentación - NACA 2412', fontsize=14)
plt.grid(True, alpha=0.3)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)

# Guardar y mostrar
plt.savefig('cl_vs_alpha.png', dpi=150)
plt.show()

print("✅ Setup de Aeronáutica verificado correctamente!")
print("📊 Gráfico guardado como 'cl_vs_alpha.png'")
```

### Ejecutar Script
```bash
cd ~/fpuna-aero
python test_aero.py
```

Debe mostrar un gráfico y guardar imagen PNG.

---

## 9. Verificación Final

### Checklist

```bash
# 1. Python funciona
python --version
# ✅ Esperado: Python 3.11.x

# 2. NumPy funciona
python -c "import numpy; print(numpy.__version__)"
# ✅ Esperado: 1.26.x o similar

# 3. Matplotlib funciona
python -c "import matplotlib; print(matplotlib.__version__)"
# ✅ Esperado: 3.8.x o similar

# 4. Script de prueba funciona
python test_aero.py
# ✅ Esperado: Gráfico se muestra y guarda

# 5. Jupyter funciona (opcional)
jupyter notebook --version
# ✅ Esperado: 7.x.x
```

---

## 10. Solución de Problemas

### Python no se reconoce en Windows

1. Reinstalar Python
2. Marcar "Add to PATH" durante instalación
3. Reiniciar terminal/PC

### Error "No module named numpy"

```bash
pip install numpy
# Si falla:
pip3 install numpy
# Si sigue fallando:
python -m pip install numpy
```

### Matplotlib no muestra gráficos

```bash
# En Linux, puede necesitar backend
pip install pyqt5
# O usar backend alternativo en script:
import matplotlib
matplotlib.use('TkAgg')
```

### XFLR5 no abre en macOS

1. System Preferences → Security & Privacy
2. Click "Open Anyway" para XFLR5

---

## 11. Recursos Adicionales

### Documentación
- NumPy: https://numpy.org/doc/
- Matplotlib: https://matplotlib.org/stable/
- SciPy: https://docs.scipy.org/doc/scipy/

### Tutoriales de Python para Ingeniería
- Real Python: https://realpython.com/
- Python for Engineers: https://pythonforengineers.com/

### Datos Aeronáuticos
- UIUC Airfoil Database: https://m-selig.ae.illinois.edu/ads/coord_database.html
- Standard Atmosphere Calculator: https://www.digitaldutch.com/atmoscalc/

---

## 12. Checklist Pre-Clase Día 3

- [ ] Setup Día 1 completado y funcionando
- [ ] Python 3.11+ instalado
- [ ] NumPy y Matplotlib instalados
- [ ] Script de prueba ejecutado con éxito
- [ ] Carpeta de trabajo creada (~/fpuna-aero)
- [ ] Jupyter Notebook instalado (recomendado)
- [ ] XFLR5 instalado (opcional)

**Si tienes problemas**, llegar 30 minutos antes a clase.

---

*Setup Día 3 - Aeronáutica*
*FPUNA Verano 2026*
