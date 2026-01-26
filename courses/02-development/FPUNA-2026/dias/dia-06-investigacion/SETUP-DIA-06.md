# Setup Día 6: IA para Investigación Académica

## Guía de Instalación para Investigación

> **Pre-requisito**: Haber completado el [Setup del Día 1](../dia-01-fundamentos/SETUP-DIA-01.md)

---

## 1. Zotero (Obligatorio)

**¿Qué es?** Gestor de referencias bibliográficas gratuito y open-source.

### Instalación

#### Windows / macOS
1. Ir a https://www.zotero.org/download/
2. Descargar Zotero para tu sistema operativo
3. Instalar con opciones por defecto

#### Linux
```bash
# Ubuntu/Debian
sudo apt install zotero

# O descargar tarball de zotero.org
```

### Connector para Navegador
1. En la misma página de descarga, instalar "Zotero Connector"
2. Disponible para Chrome, Firefox, Safari, Edge
3. Permite guardar referencias desde el navegador

### Verificar Instalación
1. Abrir Zotero
2. Crear nueva colección: "FPUNA-2026"
3. Probar guardar una referencia desde Google Scholar

### Plugins Útiles (Opcional)
- **Better BibTeX**: Para usuarios de LaTeX
- **Zotfile**: Gestión de PDFs
- **DOI Manager**: Agregar DOIs automáticamente

---

## 2. Python + Librerías de Análisis (Obligatorio)

### Si ya tienes Python del Día 3
```bash
# Solo instalar librerías adicionales
pip install pandas scipy statsmodels seaborn
```

### Si no tienes Python

#### Windows
1. Descargar de https://www.python.org/downloads/
2. **IMPORTANTE**: Marcar "Add Python to PATH"
3. Instalar

#### macOS/Linux
```bash
# macOS
brew install python@3.11

# Linux
sudo apt install python3 python3-pip
```

### Instalar Librerías de Análisis
```bash
pip install numpy pandas scipy matplotlib seaborn statsmodels jupyter
```

### Verificar
```python
python -c "import pandas; import scipy; import seaborn; print('OK')"
```

---

## 3. Jupyter Notebook (Recomendado)

### Instalación
```bash
pip install notebook jupyterlab
```

### Iniciar
```bash
jupyter notebook
# o
jupyter lab
```

### Alternativa: Google Colab
- URL: https://colab.research.google.com/
- No requiere instalación
- Librerías ya incluidas
- Guardar en Google Drive

---

## 4. JASP (Opcional - Estadística Visual)

**¿Qué es?** Software estadístico gratuito con interfaz visual (como SPSS pero gratis).

### Instalación

#### Windows / macOS
1. Ir a https://jasp-stats.org/download/
2. Descargar para tu sistema
3. Instalar

#### Linux
1. Descargar .tar.gz de jasp-stats.org
2. Extraer y ejecutar

### Verificar
1. Abrir JASP
2. File → Open → Data Library → Examples
3. Cargar "Kitchen Rolls" (ejemplo incluido)
4. Probar análisis descriptivo

---

## 5. jamovi (Alternativa a JASP)

**¿Qué es?** Otro software estadístico gratuito, más moderno.

### Instalación
1. Ir a https://www.jamovi.org/download.html
2. Descargar para tu sistema
3. Instalar

Nota: Elegir JASP **o** jamovi, no es necesario ambos.

---

## 6. Acceso a Bases de Datos (Recomendado)

### Google Scholar (Gratuito)
- URL: https://scholar.google.com/
- No requiere cuenta
- Útil para búsqueda inicial

### Semantic Scholar (Gratuito)
- URL: https://www.semanticscholar.org/
- Mejor organización por temas
- IA para encontrar papers relacionados

### Elicit (Gratuito con límites)
- URL: https://elicit.org/
- IA para búsqueda de papers
- Resume automáticamente

### Bases Institucionales
Verificar con tu universidad acceso a:
- Web of Science
- Scopus
- IEEE Xplore
- PubMed (gratuito para medicina)

---

## 7. Crear Carpeta de Trabajo

```bash
mkdir ~/fpuna-investigacion
cd ~/fpuna-investigacion
mkdir datos papers analisis
```

### Dataset de Ejemplo

Crear `~/fpuna-investigacion/datos/experimento.csv`:

```csv
id,grupo,edad,genero,pre_test,post_test
1,control,25,F,45,48
2,control,28,M,52,54
3,control,23,F,38,42
4,control,31,M,55,56
5,control,26,F,47,49
6,tratamiento,24,M,44,62
7,tratamiento,29,F,51,68
8,tratamiento,22,M,40,58
9,tratamiento,27,F,53,71
10,tratamiento,25,M,46,64
```

---

## 8. Script de Prueba

Crear `~/fpuna-investigacion/test_analisis.py`:

```python
#!/usr/bin/env python3
"""
Script de prueba para análisis de datos
FPUNA Verano 2026
"""

import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# Cargar datos
df = pd.read_csv('datos/experimento.csv')

print("=== Estadísticas Descriptivas ===")
print(df.groupby('grupo')[['pre_test', 'post_test']].describe())

# Calcular diferencia
df['diferencia'] = df['post_test'] - df['pre_test']

print("\n=== Diferencia por Grupo ===")
print(df.groupby('grupo')['diferencia'].agg(['mean', 'std']))

# Test t
control = df[df['grupo'] == 'control']['diferencia']
tratamiento = df[df['grupo'] == 'tratamiento']['diferencia']

t_stat, p_value = stats.ttest_ind(control, tratamiento)
print(f"\n=== Test t ===")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")

if p_value < 0.05:
    print("Diferencia estadísticamente significativa (p < 0.05)")
else:
    print("Diferencia no significativa (p >= 0.05)")

# Gráfico
plt.figure(figsize=(8, 6))
sns.boxplot(data=df, x='grupo', y='diferencia')
plt.title('Diferencia Pre-Post por Grupo')
plt.ylabel('Diferencia (Post - Pre)')
plt.xlabel('Grupo')
plt.savefig('analisis/boxplot_grupos.png', dpi=150)
plt.show()

print("\n✅ Análisis completado. Gráfico guardado en 'analisis/boxplot_grupos.png'")
```

### Ejecutar
```bash
cd ~/fpuna-investigacion
python test_analisis.py
```

---

## 9. Verificación Final

### Checklist

```bash
# 1. Zotero funciona
# - Abrir Zotero
# - Crear colección
# - Guardar referencia de prueba

# 2. Python con librerías
python -c "import pandas; import scipy; import seaborn; print('Librerías OK')"

# 3. Script de análisis
cd ~/fpuna-investigacion
python test_analisis.py
# Debe mostrar estadísticas y crear gráfico

# 4. Jupyter (opcional)
jupyter notebook --version

# 5. JASP o jamovi (opcional)
# - Abrir aplicación
# - Cargar ejemplo
```

---

## 10. Solución de Problemas

### Zotero no guarda PDFs

1. Preferencias → General → Verificar carpeta de almacenamiento
2. Instalar Zotfile para mejor gestión

### Error "No module named pandas"

```bash
pip install pandas
# Si no funciona:
python -m pip install pandas
```

### JASP muy lento

- Cerrar otras aplicaciones
- Reducir tamaño de dataset para pruebas

### Gráficos no se muestran

```bash
# Instalar backend
pip install pyqt5
# O usar en script:
import matplotlib
matplotlib.use('TkAgg')
```

---

## 11. Recursos Adicionales

### Tutoriales de Análisis
- Statistics with Python: https://realpython.com/python-statistics/
- Pandas Documentation: https://pandas.pydata.org/docs/
- Seaborn Gallery: https://seaborn.pydata.org/examples/

### Escritura Académica
- Purdue OWL (estilos de citación): https://owl.purdue.edu/
- Academic Phrasebank: https://www.phrasebank.manchester.ac.uk/

### Cursos Gratuitos
- Research Methods (Coursera): https://www.coursera.org/learn/research-methods
- Statistics with Python (edX): https://www.edx.org/learn/statistics

---

## 12. Checklist Pre-Clase Día 6

- [ ] Setup Día 1 completado y funcionando
- [ ] Zotero instalado con connector
- [ ] Python con pandas, scipy, seaborn
- [ ] Script de prueba ejecutado exitosamente
- [ ] Carpeta de trabajo creada
- [ ] Dataset de ejemplo guardado
- [ ] Acceso a Google Scholar verificado
- [ ] JASP o jamovi instalado (opcional)

**Si tienes problemas**, llegar 30 minutos antes a clase.

---

*Setup Día 6 - Investigación*
*FPUNA Verano 2026*
