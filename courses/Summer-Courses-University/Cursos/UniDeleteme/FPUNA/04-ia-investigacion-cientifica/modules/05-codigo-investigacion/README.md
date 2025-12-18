# Módulo 5: Código de Investigación con IA
## Generación de Código Científico y Reproducibilidad

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Conocimientos básicos de Python/R |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Generar código de investigación con GitHub Copilot
2. Crear scripts de análisis reproducibles
3. Documentar código científico efectivamente
4. Usar Jupyter Notebooks optimizados
5. Integrar código generado con HPC

---

## Contenido

### 5.1 GitHub Copilot para Investigación (30 min)

#### Configuración de GitHub Copilot

**Requisitos:**
1. Cuenta de GitHub (educación = gratis)
2. VS Code con extensión Copilot
3. Suscripción activa o acceso académico

**Instalación:**
```
1. VS Code → Extensions → GitHub Copilot
2. Sign in con cuenta GitHub
3. Verificar icono de Copilot en barra inferior
```

#### Mejores Prácticas con Copilot

| Práctica | Descripción |
|----------|-------------|
| Comentarios descriptivos | Escribir qué quiere antes del código |
| Contexto en archivo | Imports y funciones previas guían sugerencias |
| Aceptación selectiva | Tab para aceptar, Esc para rechazar |
| Iteración | Pedir alternativas con Ctrl+Enter |

#### Patrones de Prompts en Comentarios

```python
# Cargar dataset CSV y mostrar primeras filas
# [Copilot sugiere código]

# Función para calcular correlación de Pearson entre dos columnas
# [Copilot genera función]

# Gráfico de dispersión con línea de regresión y IC 95%
# [Copilot genera visualización]
```

#### Ejemplo: Análisis Estadístico

```python
# Importar librerías necesarias para análisis estadístico
import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Cargar datos desde CSV
df = pd.read_csv('datos_investigacion.csv')

# Función para realizar t-test independiente con reporte completo
def ttest_report(group1, group2, alpha=0.05):
    """
    Realiza t-test independiente y retorna reporte detallado.

    Parameters:
    -----------
    group1 : array-like
        Datos del primer grupo
    group2 : array-like
        Datos del segundo grupo
    alpha : float
        Nivel de significancia

    Returns:
    --------
    dict : Diccionario con resultados completos
    """
    # Copilot completa la implementación
    t_stat, p_value = stats.ttest_ind(group1, group2)

    # Calcular Cohen's d
    pooled_std = np.sqrt(((len(group1)-1)*np.std(group1, ddof=1)**2 +
                          (len(group2)-1)*np.std(group2, ddof=1)**2) /
                         (len(group1) + len(group2) - 2))
    cohens_d = (np.mean(group1) - np.mean(group2)) / pooled_std

    return {
        't_statistic': t_stat,
        'p_value': p_value,
        'cohens_d': cohens_d,
        'significant': p_value < alpha,
        'mean_diff': np.mean(group1) - np.mean(group2)
    }
```

---

### 5.2 Claude/ChatGPT para Código Científico (30 min)

#### Cuando Usar Cada Herramienta

| Herramienta | Mejor Para |
|-------------|------------|
| GitHub Copilot | Código en contexto, autocompletado |
| Claude | Explicaciones, código largo, debugging |
| ChatGPT | Prototipos rápidos, exploración |

#### Prompt para Código de Investigación

```
Necesito un script de Python para mi investigación que:

OBJETIVO: [Describir análisis]
DATOS: [Describir estructura de datos]
ANÁLISIS: [Especificar pruebas/modelos]
OUTPUT: [Qué resultados necesita]

Requisitos:
1. Código bien documentado con docstrings
2. Manejo de errores apropiado
3. Reproducible (semilla aleatoria)
4. Compatible con Python 3.9+
5. Incluir ejemplo de uso
```

#### Ejemplo: Pipeline de Análisis

**Prompt:**
```
Crea un pipeline de análisis de datos para investigación que:

1. Cargue datos desde CSV
2. Limpie valores faltantes (imputación por media del grupo)
3. Detecte outliers con IQR
4. Realice análisis descriptivo por grupo
5. Ejecute t-test con tamaño del efecto
6. Genere visualizaciones publicables
7. Exporte resultados a Excel

Los datos tienen columnas: id, grupo, edad, medida_pre, medida_post
```

**Código generado:**

```python
"""
Pipeline de Análisis de Datos de Investigación
Autor: [Nombre]
Fecha: [Fecha]
Descripción: Pipeline reproducible para análisis de datos experimentales
"""

import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

# Configuración para reproducibilidad
np.random.seed(42)
plt.style.use('seaborn-v0_8-whitegrid')

class ResearchPipeline:
    """Pipeline de análisis para datos de investigación."""

    def __init__(self, filepath: str):
        """Inicializa el pipeline con ruta al archivo de datos."""
        self.filepath = Path(filepath)
        self.df = None
        self.results = {}

    def load_data(self) -> pd.DataFrame:
        """Carga datos desde CSV."""
        self.df = pd.read_csv(self.filepath)
        print(f"Datos cargados: {self.df.shape[0]} filas, {self.df.shape[1]} columnas")
        return self.df

    def clean_data(self, group_col: str = 'grupo') -> pd.DataFrame:
        """Limpia datos: imputa faltantes por media del grupo."""
        numeric_cols = self.df.select_dtypes(include=[np.number]).columns

        for col in numeric_cols:
            self.df[col] = self.df.groupby(group_col)[col].transform(
                lambda x: x.fillna(x.mean())
            )

        print(f"Valores faltantes después de imputación: {self.df.isnull().sum().sum()}")
        return self.df

    def detect_outliers(self, column: str) -> pd.DataFrame:
        """Detecta outliers usando método IQR."""
        Q1 = self.df[column].quantile(0.25)
        Q3 = self.df[column].quantile(0.75)
        IQR = Q3 - Q1

        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR

        outliers = self.df[(self.df[column] < lower) | (self.df[column] > upper)]
        self.results['outliers'] = outliers
        print(f"Outliers detectados en {column}: {len(outliers)}")
        return outliers

    def descriptive_stats(self, group_col: str, value_col: str) -> pd.DataFrame:
        """Genera estadísticas descriptivas por grupo."""
        stats_df = self.df.groupby(group_col)[value_col].agg([
            'count', 'mean', 'std', 'median', 'min', 'max'
        ]).round(3)

        # Agregar SEM
        stats_df['sem'] = self.df.groupby(group_col)[value_col].sem().round(3)

        self.results['descriptive'] = stats_df
        return stats_df

    def run_ttest(self, group_col: str, value_col: str) -> dict:
        """Ejecuta t-test independiente con tamaño del efecto."""
        groups = self.df[group_col].unique()
        g1 = self.df[self.df[group_col] == groups[0]][value_col].dropna()
        g2 = self.df[self.df[group_col] == groups[1]][value_col].dropna()

        # T-test
        t_stat, p_value = stats.ttest_ind(g1, g2)

        # Cohen's d
        pooled_std = np.sqrt(((len(g1)-1)*g1.std()**2 +
                              (len(g2)-1)*g2.std()**2) /
                             (len(g1) + len(g2) - 2))
        cohens_d = (g1.mean() - g2.mean()) / pooled_std

        results = {
            'groups': (groups[0], groups[1]),
            't_statistic': round(t_stat, 3),
            'p_value': round(p_value, 4),
            'cohens_d': round(cohens_d, 3),
            'significant': p_value < 0.05
        }

        self.results['ttest'] = results
        return results

    def create_visualizations(self, group_col: str, value_col: str,
                             output_dir: str = 'figures'):
        """Genera visualizaciones publicables."""
        Path(output_dir).mkdir(exist_ok=True)

        fig, axes = plt.subplots(1, 2, figsize=(10, 4))

        # Barplot con error bars
        sns.barplot(x=group_col, y=value_col, data=self.df,
                   ax=axes[0], capsize=0.1, ci=95)
        axes[0].set_title('Comparación de Grupos')
        axes[0].set_ylabel(value_col)

        # Boxplot con puntos
        sns.boxplot(x=group_col, y=value_col, data=self.df, ax=axes[1])
        sns.stripplot(x=group_col, y=value_col, data=self.df,
                     ax=axes[1], color='black', alpha=0.5, size=4)
        axes[1].set_title('Distribución por Grupo')

        plt.tight_layout()
        plt.savefig(f'{output_dir}/comparacion_grupos.png', dpi=300)
        plt.savefig(f'{output_dir}/comparacion_grupos.pdf')
        plt.close()

        print(f"Figuras guardadas en {output_dir}/")

    def export_results(self, output_file: str = 'resultados.xlsx'):
        """Exporta resultados a Excel."""
        with pd.ExcelWriter(output_file) as writer:
            if 'descriptive' in self.results:
                self.results['descriptive'].to_excel(writer,
                                                     sheet_name='Descriptivos')
            if 'ttest' in self.results:
                pd.DataFrame([self.results['ttest']]).to_excel(writer,
                                                               sheet_name='T-test')
            if 'outliers' in self.results:
                self.results['outliers'].to_excel(writer,
                                                  sheet_name='Outliers')

        print(f"Resultados exportados a {output_file}")


# Ejemplo de uso
if __name__ == "__main__":
    # Inicializar pipeline
    pipeline = ResearchPipeline('datos_investigacion.csv')

    # Ejecutar análisis
    pipeline.load_data()
    pipeline.clean_data(group_col='grupo')
    pipeline.detect_outliers('medida_post')
    pipeline.descriptive_stats('grupo', 'medida_post')
    pipeline.run_ttest('grupo', 'medida_post')
    pipeline.create_visualizations('grupo', 'medida_post')
    pipeline.export_results()

    # Mostrar resultados del t-test
    print("\nResultados del t-test:")
    print(pipeline.results['ttest'])
```

---

### 5.3 Jupyter Notebooks Optimizados (25 min)

#### Estructura de Notebook Científico

```
1. HEADER
   - Título, autor, fecha
   - Descripción del análisis
   - Dependencias

2. SETUP
   - Importaciones
   - Configuración global
   - Funciones auxiliares

3. DATA
   - Carga de datos
   - Exploración inicial
   - Limpieza

4. ANALYSIS
   - Análisis descriptivo
   - Análisis inferencial
   - Visualizaciones

5. RESULTS
   - Resumen de hallazgos
   - Interpretación

6. APPENDIX
   - Código adicional
   - Verificaciones
```

#### Jupyter AI Extension

```python
# Instalación
# pip install jupyter-ai

# En notebook, usar comandos mágicos:
# %%ai chatgpt
# Genera código para cargar y visualizar datos de series temporales
```

#### Template de Notebook

```python
# %% [markdown]
# # Título del Análisis
#
# **Autor:** [Nombre]
# **Fecha:** [Fecha]
# **Versión:** 1.0
#
# ## Descripción
# [Descripción del análisis]

# %% [markdown]
# ## 1. Setup

# %%
# Importaciones
import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# Configuración
%matplotlib inline
plt.rcParams['figure.dpi'] = 100
np.random.seed(42)

# Versiones
print(f"pandas: {pd.__version__}")
print(f"numpy: {np.__version__}")

# %% [markdown]
# ## 2. Carga de Datos

# %%
# Cargar datos
df = pd.read_csv('datos.csv')
print(f"Shape: {df.shape}")
df.head()

# %% [markdown]
# ## 3. Análisis
# ... continuar ...
```

---

### 5.4 Reproducibilidad y Documentación (20 min)

#### Principios de Código Reproducible

| Principio | Implementación |
|-----------|----------------|
| Semilla aleatoria | `np.random.seed(42)` |
| Versiones | requirements.txt, environment.yml |
| Rutas relativas | `Path('data') / 'file.csv'` |
| Documentación | Docstrings, comentarios, README |

#### requirements.txt

```
pandas==2.0.0
numpy==1.24.0
scipy==1.10.0
matplotlib==3.7.0
seaborn==0.12.0
jupyter==1.0.0
openpyxl==3.1.0
```

#### Docstrings Estilo NumPy

```python
def analyze_groups(df, group_col, value_col, alpha=0.05):
    """
    Realiza comparación estadística entre grupos.

    Parameters
    ----------
    df : pandas.DataFrame
        DataFrame con los datos
    group_col : str
        Nombre de la columna con grupos
    value_col : str
        Nombre de la columna con valores a comparar
    alpha : float, optional
        Nivel de significancia (default: 0.05)

    Returns
    -------
    dict
        Diccionario con resultados estadísticos:
        - t_stat: estadístico t
        - p_value: valor p
        - significant: bool indicando significancia

    Examples
    --------
    >>> results = analyze_groups(df, 'treatment', 'score')
    >>> print(results['p_value'])
    0.023

    Notes
    -----
    Asume que los grupos tienen varianzas iguales.
    Para varianzas desiguales, usar Welch's t-test.
    """
    # Implementación
    pass
```

---

### 5.5 Integración con HPC (15 min)

#### Preparación de Scripts para Cluster

```python
#!/usr/bin/env python3
"""
Script para ejecución en cluster HPC.
Optimizado para paralelización.
"""

import argparse
from multiprocessing import Pool, cpu_count

def process_chunk(args):
    """Procesa un chunk de datos."""
    chunk_id, data = args
    # Procesamiento
    result = heavy_computation(data)
    return chunk_id, result

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--n-jobs', type=int, default=cpu_count())
    args = parser.parse_args()

    # Cargar y dividir datos
    data = load_data(args.input)
    chunks = split_data(data, args.n_jobs)

    # Procesar en paralelo
    with Pool(args.n_jobs) as pool:
        results = pool.map(process_chunk, enumerate(chunks))

    # Combinar y guardar
    final_result = combine_results(results)
    save_results(final_result, args.output)

if __name__ == "__main__":
    main()
```

#### Script SLURM

```bash
#!/bin/bash
#SBATCH --job-name=mi_analisis
#SBATCH --output=logs/output_%j.log
#SBATCH --error=logs/error_%j.log
#SBATCH --nodes=1
#SBATCH --cpus-per-task=16
#SBATCH --mem=32G
#SBATCH --time=04:00:00

# Cargar módulos
module load python/3.9

# Activar entorno
source ~/envs/research/bin/activate

# Ejecutar
python mi_script.py --input data/input.csv --output results/output.csv --n-jobs 16

echo "Análisis completado"
```

---

## Actividad Práctica (30 min)

### Desarrollar Script de Análisis

**Instrucciones:**

1. **Diseñar pipeline (10 min)**
   - Definir pasos del análisis
   - Identificar inputs/outputs

2. **Generar código (15 min)**
   - Usar Copilot o Claude
   - Documentar funciones

3. **Probar y depurar (5 min)**
   - Ejecutar con datos de prueba
   - Verificar resultados

---

## Recursos Adicionales

### Herramientas

- GitHub Copilot: https://copilot.github.com
- VS Code: https://code.visualstudio.com
- JupyterLab: https://jupyter.org

### Templates

- [Template de pipeline](../templates/pipeline-template.py)
- [Template de notebook](../templates/notebook-template.ipynb)

---

## Puntos Clave

1. **Copilot en contexto:** Comentarios claros generan mejor código
2. **Claude para explicar:** Útil para debugging y optimización
3. **Reproducibilidad:** Semillas, versiones, documentación
4. **Modularizar:** Funciones pequeñas y bien documentadas
5. **Verificar siempre:** El código generado puede tener errores

---

*Próximo módulo: Presentaciones y Difusión*
