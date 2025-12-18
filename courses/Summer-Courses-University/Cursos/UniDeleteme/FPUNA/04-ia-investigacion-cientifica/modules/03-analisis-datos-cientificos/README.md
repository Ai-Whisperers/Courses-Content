# Módulo 3: Análisis de Datos Científicos con IA
## Estadística, Visualización y Modelado Asistido

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2.5 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Módulos 1-2, Conocimientos básicos de estadística |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Utilizar IA para limpieza y preparación de datos
2. Realizar análisis estadístico con asistencia de IA
3. Crear visualizaciones científicas profesionales
4. Interpretar resultados con apoyo de IA
5. Generar código de análisis en Python/R

---

## Contenido

### 3.1 Limpieza de Datos con IA (30 min)

#### Problemas Comunes en Datos de Investigación

| Problema | Descripción | Solución con IA |
|----------|-------------|-----------------|
| Valores faltantes | NaN, vacíos, -999 | Identificación y estrategia de imputación |
| Outliers | Valores extremos | Detección y decisión de tratamiento |
| Inconsistencias | Formatos mixtos | Estandarización automática |
| Duplicados | Registros repetidos | Identificación y resolución |
| Errores de tipeo | "Masculino", "masculio" | Corrección y normalización |

#### Prompt para Análisis Inicial de Datos

```python
"""
Tengo un dataset con las siguientes características:

Columnas: [LISTAR COLUMNAS]
Filas: [NÚMERO DE FILAS]
Tipos de datos: [DESCRIBIR]

Por favor:
1. Identifica posibles problemas de calidad de datos
2. Sugiere estrategias de limpieza para cada problema
3. Genera código Python/pandas para implementar la limpieza
4. Indica qué decisiones requieren criterio del investigador
"""
```

#### Código Ejemplo: Limpieza con Pandas

```python
import pandas as pd
import numpy as np

# Cargar datos
df = pd.read_csv('datos_investigacion.csv')

# Análisis inicial
print("Resumen de valores faltantes:")
print(df.isnull().sum())

print("\nEstadísticas descriptivas:")
print(df.describe())

# Identificar outliers (método IQR)
Q1 = df['variable'].quantile(0.25)
Q3 = df['variable'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['variable'] < Q1 - 1.5*IQR) |
              (df['variable'] > Q3 + 1.5*IQR)]

print(f"\nOutliers detectados: {len(outliers)}")
```

#### Decisiones que Requieren Criterio Humano

- ¿Eliminar outliers o mantenerlos?
- ¿Imputar valores faltantes o excluir casos?
- ¿Qué método de imputación usar?
- ¿Los datos cumplen supuestos estadísticos?

---

### 3.2 Análisis Estadístico Asistido (45 min)

#### Selección de Pruebas Estadísticas

**Prompt para selección de prueba:**
```
Tengo un estudio donde:
- Variable dependiente: [TIPO Y DESCRIPCIÓN]
- Variable(s) independiente(s): [TIPO Y DESCRIPCIÓN]
- Diseño: [ENTRE/INTRA SUJETOS, EXPERIMENTAL/OBSERVACIONAL]
- Tamaño de muestra: [N]
- Distribución de datos: [NORMAL/NO NORMAL/DESCONOCIDA]

Sugiere:
1. Prueba estadística más apropiada
2. Supuestos a verificar
3. Alternativas si no se cumplen supuestos
4. Código en Python/R para implementar
```

#### Árbol de Decisión para Pruebas Comunes

```
¿Comparar grupos?
├── Sí
│   ├── 2 grupos
│   │   ├── Independientes → t-test / Mann-Whitney
│   │   └── Dependientes → t-test pareado / Wilcoxon
│   └── 3+ grupos
│       ├── Independientes → ANOVA / Kruskal-Wallis
│       └── Dependientes → ANOVA repetidas / Friedman
└── No
    ├── Relación entre variables
    │   ├── 2 continuas → Correlación (Pearson/Spearman)
    │   ├── Predicción → Regresión
    │   └── Categóricas → Chi-cuadrado
    └── Comparar proporciones → Test de proporciones
```

#### Código: Análisis Estadístico en Python

```python
from scipy import stats
import statsmodels.api as sm
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# T-test independiente
grupo1 = df[df['condicion']=='control']['medida']
grupo2 = df[df['condicion']=='tratamiento']['medida']

t_stat, p_value = stats.ttest_ind(grupo1, grupo2)
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")

# Calcular tamaño del efecto (Cohen's d)
cohens_d = (grupo1.mean() - grupo2.mean()) / np.sqrt(
    ((len(grupo1)-1)*grupo1.std()**2 +
     (len(grupo2)-1)*grupo2.std()**2) /
    (len(grupo1) + len(grupo2) - 2)
)
print(f"Cohen's d = {cohens_d:.3f}")

# ANOVA
f_stat, p_value = stats.f_oneway(grupo1, grupo2, grupo3)

# Post-hoc Tukey
tukey = pairwise_tukeyhsd(df['medida'], df['grupo'])
print(tukey)
```

#### Interpretación con IA

**Prompt para interpretación:**
```
Obtuve los siguientes resultados estadísticos:

Prueba: [NOMBRE DE LA PRUEBA]
Estadístico: [VALOR]
p-valor: [VALOR]
Tamaño del efecto: [VALOR]
IC 95%: [INTERVALO]

Ayúdame a:
1. Interpretar estos resultados en lenguaje claro
2. Determinar si es estadísticamente significativo
3. Evaluar la relevancia práctica (tamaño del efecto)
4. Redactar un párrafo para la sección de resultados
5. Identificar limitaciones de la interpretación
```

---

### 3.3 Visualización Científica (35 min)

#### Principios de Visualización para Papers

| Tipo de Dato | Gráfico Recomendado | Uso |
|--------------|---------------------|-----|
| Comparación de grupos | Barras + error | Medias con variabilidad |
| Distribución | Histograma, Boxplot | Forma de los datos |
| Relación | Dispersión (scatter) | Correlaciones |
| Tendencias | Líneas | Series temporales |
| Proporciones | Pastel, barras apiladas | Partes del todo |

#### Generación de Visualizaciones con IA

**Prompt para código de visualización:**
```
Necesito crear un gráfico para un paper científico:

Datos: [DESCRIBIR VARIABLES Y ESTRUCTURA]
Tipo de comparación: [LO QUE QUIERO MOSTRAR]
Estilo: [REVISTA/ESTÁNDAR APA/PERSONALIZADO]

Genera código Python con matplotlib/seaborn que:
1. Sea apropiado para publicación (300 DPI)
2. Use escala de grises o colores accesibles
3. Incluya barras de error si aplica
4. Tenga etiquetas claras en español
5. Siga convenciones de la disciplina
```

#### Código: Gráficos Publicables

```python
import matplotlib.pyplot as plt
import seaborn as sns

# Configuración para publicación
plt.rcParams['figure.dpi'] = 300
plt.rcParams['font.size'] = 10
plt.rcParams['font.family'] = 'Arial'
plt.rcParams['axes.linewidth'] = 0.5

# Gráfico de barras con error
fig, ax = plt.subplots(figsize=(4, 3))

means = df.groupby('grupo')['variable'].mean()
sems = df.groupby('grupo')['variable'].sem()

bars = ax.bar(means.index, means.values,
              yerr=sems.values,
              capsize=3,
              color=['#1f77b4', '#ff7f0e'],
              edgecolor='black',
              linewidth=0.5)

ax.set_ylabel('Variable (unidades)', fontsize=10)
ax.set_xlabel('Grupo', fontsize=10)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig('figura1.png', dpi=300, bbox_inches='tight')
plt.savefig('figura1.pdf', bbox_inches='tight')  # Vector
```

#### Boxplot + Puntos Individuales

```python
fig, ax = plt.subplots(figsize=(5, 4))

# Boxplot
sns.boxplot(x='grupo', y='variable', data=df,
            ax=ax, color='lightgray',
            width=0.5, linewidth=0.5)

# Puntos individuales (jitter)
sns.stripplot(x='grupo', y='variable', data=df,
              ax=ax, color='black', alpha=0.5,
              size=3, jitter=0.2)

ax.set_ylabel('Medida (unidades)')
ax.set_xlabel('Condición')

plt.tight_layout()
plt.savefig('figura2.png', dpi=300)
```

---

### 3.4 Uso del Cluster NIDTEC (20 min)

#### Recursos Disponibles

| Recurso | Especificaciones | Uso Recomendado |
|---------|------------------|-----------------|
| CPU Nodes | 32+ cores | Simulaciones paralelas |
| GPU Nodes | NVIDIA Tesla | Deep Learning |
| Storage | Varios TB | Datasets grandes |

#### Flujo de Trabajo con HPC

```
Local (desarrollo)    →    Cluster (ejecución)    →    Local (análisis)
    ↓                           ↓                          ↓
Código + datos pequeños    Procesamiento masivo      Resultados + viz
```

#### Script de Ejemplo para SLURM

```bash
#!/bin/bash
#SBATCH --job-name=mi_analisis
#SBATCH --output=resultado_%j.out
#SBATCH --error=error_%j.err
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=16
#SBATCH --time=04:00:00
#SBATCH --mem=32G

module load python/3.9
source venv/bin/activate

python mi_analisis.py
```

#### Prompt para Optimización de Código

```
Tengo el siguiente código de análisis que necesito ejecutar
en un cluster HPC:

[PEGAR CÓDIGO]

Por favor:
1. Identifica oportunidades de paralelización
2. Sugiere optimizaciones de memoria
3. Genera versión optimizada con multiprocessing
4. Crea script SLURM para ejecutar en cluster
```

---

## Actividad Práctica (40 min)

### Análisis Completo de Dataset

**Instrucciones:**

1. **Cargar y explorar datos (10 min)**
   - Usar dataset proporcionado o propio
   - Generar estadísticas descriptivas con IA

2. **Limpiar datos (10 min)**
   - Identificar problemas con asistencia de IA
   - Implementar limpieza con código generado

3. **Análisis estadístico (10 min)**
   - Seleccionar prueba apropiada
   - Ejecutar análisis e interpretar

4. **Visualización (10 min)**
   - Crear gráfico publicable
   - Exportar en alta resolución

---

## Recursos Adicionales

### Datasets de Práctica

- Iris Dataset (clasificación)
- Titanic (supervivencia)
- Dataset propio del participante

### Librerías Recomendadas

```python
# Análisis de datos
import pandas as pd
import numpy as np

# Estadística
from scipy import stats
import statsmodels.api as sm
from pingouin import *  # Estadística amigable

# Visualización
import matplotlib.pyplot as plt
import seaborn as sns

# Machine Learning
from sklearn import *
```

### Lecturas Sugeridas

- "Python for Data Analysis" - Wes McKinney
- "Statsmodels Documentation"
- "Seaborn Tutorial"

---

## Puntos Clave

1. **IA como asistente:** Genera código, pero verifica resultados
2. **Decisiones humanas:** Limpieza y selección de pruebas requieren criterio
3. **Reproducibilidad:** Documentar todo el proceso de análisis
4. **Visualización clara:** Menos es más en gráficos científicos
5. **Recursos HPC:** Usar cluster para análisis intensivos

---

*Próximo módulo: Escritura Científica con IA*
