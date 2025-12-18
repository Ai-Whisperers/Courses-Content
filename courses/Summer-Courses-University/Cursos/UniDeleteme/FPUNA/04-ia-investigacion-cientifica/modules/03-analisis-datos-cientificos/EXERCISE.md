# Ejercicio Práctico: Módulo 3
## Análisis de Datos Científicos con IA

---

## Objetivo

Realizar un análisis completo de un dataset científico utilizando IA para generar código, interpretar resultados y crear visualizaciones profesionales.

**Duración:** 50 minutos

---

## Dataset de Trabajo

Usaremos un dataset simulado de investigación. Puede usar el siguiente código para generarlo o usar sus propios datos.

```python
import pandas as pd
import numpy as np

# Generar dataset de ejemplo
np.random.seed(42)
n = 100

data = {
    'id_participante': range(1, n+1),
    'grupo': np.random.choice(['control', 'tratamiento'], n),
    'edad': np.random.normal(35, 10, n).astype(int),
    'genero': np.random.choice(['M', 'F', 'masculino', 'femenino', np.nan], n,
                                p=[0.35, 0.35, 0.1, 0.1, 0.1]),
    'medida_pre': np.random.normal(50, 15, n),
    'medida_post': np.random.normal(55, 15, n),
    'satisfaccion': np.random.randint(1, 6, n)
}

# Agregar algunos outliers y valores faltantes
data['medida_pre'][5] = 150  # Outlier
data['medida_post'][10] = np.nan
data['medida_post'][20] = np.nan

df = pd.DataFrame(data)
df.to_csv('datos_estudio.csv', index=False)
```

---

## Parte 1: Exploración y Limpieza (15 minutos)

### Paso 1.1: Carga y Exploración Inicial

Ejecute el siguiente código y documente los resultados:

```python
import pandas as pd
import numpy as np

df = pd.read_csv('datos_estudio.csv')

print("Dimensiones:", df.shape)
print("\nPrimeras filas:")
print(df.head())

print("\nTipos de datos:")
print(df.dtypes)

print("\nValores faltantes:")
print(df.isnull().sum())

print("\nEstadísticas descriptivas:")
print(df.describe())
```

**Documente:**

| Aspecto | Valor/Observación |
|---------|-------------------|
| Número de filas | |
| Número de columnas | |
| Columnas con valores faltantes | |
| Posibles problemas detectados | |

### Paso 1.2: Limpieza con Asistencia de IA

Use este prompt para obtener código de limpieza:

```
Tengo un dataset de investigación con estos problemas:
1. Columna 'genero' tiene valores inconsistentes: 'M', 'F', 'masculino', 'femenino', y NaN
2. Columna 'medida_post' tiene valores faltantes
3. Posibles outliers en 'medida_pre'

Genera código Python para:
1. Estandarizar valores de género (usar 'M' y 'F')
2. Imputar valores faltantes con la media del grupo
3. Identificar y marcar outliers usando método IQR
```

**Código de limpieza implementado:**

```python
# Pegue aquí el código generado y modificado
```

**Resultados de la limpieza:**

| Transformación | Antes | Después |
|----------------|-------|---------|
| Valores únicos en 'genero' | | |
| NaN en 'medida_post' | | |
| Outliers identificados | | |

---

## Parte 2: Análisis Estadístico (15 minutos)

### Paso 2.1: Formulación de Hipótesis

Use este prompt:

```
Tengo un estudio con:
- Variable independiente: grupo (control vs tratamiento)
- Variables dependientes: medida_pre, medida_post
- Diseño: grupos independientes, medidas pre-post

Formula:
1. Hipótesis nula y alternativa
2. Prueba estadística apropiada para comparar grupos
3. Supuestos a verificar
```

**Hipótesis:**

- H₀: ________________________________________________

- H₁: ________________________________________________

### Paso 2.2: Verificación de Supuestos

```python
from scipy import stats

# Normalidad
stat, p_normal = stats.shapiro(df['medida_post'].dropna())
print(f"Shapiro-Wilk: stat={stat:.3f}, p={p_normal:.4f}")

# Homogeneidad de varianzas
control = df[df['grupo']=='control']['medida_post'].dropna()
tratamiento = df[df['grupo']=='tratamiento']['medida_post'].dropna()

stat, p_levene = stats.levene(control, tratamiento)
print(f"Levene: stat={stat:.3f}, p={p_levene:.4f}")
```

**Resultados de supuestos:**

| Supuesto | Prueba | Estadístico | p-valor | ¿Se cumple? |
|----------|--------|-------------|---------|-------------|
| Normalidad | Shapiro-Wilk | | | |
| Homogeneidad | Levene | | | |

### Paso 2.3: Análisis Principal

```python
# Comparar grupos en medida_post
t_stat, p_value = stats.ttest_ind(control, tratamiento)
print(f"t-test: t={t_stat:.3f}, p={p_value:.4f}")

# Tamaño del efecto
def cohens_d(g1, g2):
    n1, n2 = len(g1), len(g2)
    var1, var2 = g1.var(), g2.var()
    pooled_std = np.sqrt(((n1-1)*var1 + (n2-1)*var2) / (n1+n2-2))
    return (g1.mean() - g2.mean()) / pooled_std

d = cohens_d(control, tratamiento)
print(f"Cohen's d = {d:.3f}")
```

**Complete la tabla de resultados:**

| Estadístico | Valor | Interpretación |
|-------------|-------|----------------|
| Media Control | | |
| Media Tratamiento | | |
| t | | |
| p-valor | | |
| Cohen's d | | |
| Decisión sobre H₀ | | |

### Paso 2.4: Interpretación con IA

Use este prompt con sus resultados:

```
Obtuve estos resultados de un t-test independiente:
- Media control: [X]
- Media tratamiento: [Y]
- t = [valor]
- p = [valor]
- Cohen's d = [valor]

Redacta un párrafo de resultados siguiendo formato APA.
```

**Párrafo de resultados:**

_______________________________________________

_______________________________________________

_______________________________________________

---

## Parte 3: Visualización (15 minutos)

### Paso 3.1: Gráfico de Comparación de Grupos

Use este prompt:

```
Genera código Python para crear un gráfico de barras
comparando las medidas post entre grupo control y tratamiento,
con barras de error (SEM), siguiendo estándares de publicación
científica (APA style).
```

Ejecute el código generado y guarde la imagen.

### Paso 3.2: Gráfico de Distribución

```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 2, figsize=(8, 3))

# Boxplot
sns.boxplot(x='grupo', y='medida_post', data=df, ax=axes[0])
axes[0].set_title('Distribución por Grupo')

# Histogramas
for grupo in ['control', 'tratamiento']:
    data = df[df['grupo']==grupo]['medida_post'].dropna()
    axes[1].hist(data, alpha=0.5, label=grupo, bins=15)
axes[1].legend()
axes[1].set_title('Histogramas')

plt.tight_layout()
plt.savefig('distribucion.png', dpi=300)
```

### Paso 3.3: Evaluación de Visualización

Analice sus gráficos:

| Criterio | Cumple (Sí/No) | Comentario |
|----------|----------------|------------|
| Etiquetas claras | | |
| Resolución adecuada (300 DPI) | | |
| Barras de error incluidas | | |
| Leyenda cuando necesaria | | |
| Formato exportable (PNG/PDF) | | |

---

## Parte 4: Síntesis (5 minutos)

### Resumen del Análisis

Complete el siguiente template:

```
RESUMEN DE ANÁLISIS

Dataset: ________________________
N total: ________________________

Limpieza realizada:
- [ ] Estandarización de variables categóricas
- [ ] Imputación de valores faltantes
- [ ] Tratamiento de outliers

Análisis principal:
- Prueba utilizada: ________________________
- Resultado: ________________________
- Tamaño del efecto: ________________________

Conclusión:
________________________
________________________
```

---

## Entregable

Notebook Jupyter (.ipynb) o script Python (.py) con:

1. **Código de limpieza** documentado
2. **Análisis estadístico** con interpretación
3. **Visualizaciones** guardadas (2 mínimo)
4. **Comentarios** explicando decisiones

---

## Rúbrica de Evaluación

| Criterio | Puntos |
|----------|--------|
| Limpieza de datos correcta | 20 |
| Análisis estadístico apropiado | 25 |
| Interpretación correcta de resultados | 20 |
| Visualizaciones de calidad | 20 |
| Código documentado y reproducible | 15 |
| **Total** | **100** |

---

## Reflexión

1. ¿Qué parte del análisis fue más fácil con asistencia de IA?

   _______________________________________________

2. ¿En qué momento fue crítico su criterio como investigador?

   _______________________________________________

3. ¿Qué verificaría antes de publicar estos resultados?

   _______________________________________________

---

*Tiempo total estimado: 50 minutos*
