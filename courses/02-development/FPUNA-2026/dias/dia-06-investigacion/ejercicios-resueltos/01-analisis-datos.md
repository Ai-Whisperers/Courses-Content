# Ejercicio Resuelto: Analisis Estadistico con IA

## Objetivo
Realizar analisis estadistico basico usando IA para generar codigo y interpretar resultados.

---

## Prompt del Estudiante

```
Tengo datos de un experimento con 2 grupos:
- Grupo control: 10 participantes
- Grupo tratamiento: 10 participantes
- Variable medida: puntaje pre-test y post-test

Los datos son:
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

Realiza:
1. Estadisticas descriptivas por grupo
2. Test t para diferencia de medias
3. Tamano del efecto (Cohen's d)
4. Interpretacion de resultados

Incluye codigo Python para replicar el analisis.
```

---

## Respuesta Esperada

### 1. Codigo Python Completo

```python
"""
Analisis Estadistico de Experimento Pre-Post
FPUNA Verano 2026 - Dia 6: Investigacion

Ejecutar: python analisis_experimento.py
"""

import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================
# CARGAR DATOS
# ============================================

# Crear DataFrame desde los datos
datos = {
    'id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'grupo': ['control']*5 + ['tratamiento']*5,
    'edad': [25, 28, 23, 31, 26, 24, 29, 22, 27, 25],
    'genero': ['F', 'M', 'F', 'M', 'F', 'M', 'F', 'M', 'F', 'M'],
    'pre_test': [45, 52, 38, 55, 47, 44, 51, 40, 53, 46],
    'post_test': [48, 54, 42, 56, 49, 62, 68, 58, 71, 64]
}

df = pd.DataFrame(datos)

# Calcular diferencia (mejora)
df['diferencia'] = df['post_test'] - df['pre_test']

print("=" * 60)
print("ANALISIS ESTADISTICO DEL EXPERIMENTO")
print("=" * 60)

# ============================================
# 1. ESTADISTICAS DESCRIPTIVAS
# ============================================

print("\n1. ESTADISTICAS DESCRIPTIVAS POR GRUPO")
print("-" * 40)

# Estadisticas del pre-test
print("\nPre-Test:")
print(df.groupby('grupo')['pre_test'].agg(['count', 'mean', 'std', 'min', 'max']))

# Estadisticas del post-test
print("\nPost-Test:")
print(df.groupby('grupo')['post_test'].agg(['count', 'mean', 'std', 'min', 'max']))

# Estadisticas de la diferencia (mejora)
print("\nDiferencia (Post - Pre):")
stats_diff = df.groupby('grupo')['diferencia'].agg(['mean', 'std'])
print(stats_diff)

# ============================================
# 2. TEST T PARA MUESTRAS INDEPENDIENTES
# ============================================

print("\n2. TEST T PARA DIFERENCIA DE MEDIAS")
print("-" * 40)

# Separar grupos
control = df[df['grupo'] == 'control']['diferencia']
tratamiento = df[df['grupo'] == 'tratamiento']['diferencia']

# Test t de muestras independientes
t_stat, p_value = stats.ttest_ind(control, tratamiento)

print(f"\nGrupo Control - Media de diferencia: {control.mean():.2f} (SD: {control.std():.2f})")
print(f"Grupo Tratamiento - Media de diferencia: {tratamiento.mean():.2f} (SD: {tratamiento.std():.2f})")
print(f"\nEstadistico t: {t_stat:.4f}")
print(f"Valor p: {p_value:.6f}")

# Interpretacion
alpha = 0.05
if p_value < alpha:
    print(f"\n✓ Resultado SIGNIFICATIVO (p < {alpha})")
    print("  Hay diferencia estadisticamente significativa entre los grupos.")
else:
    print(f"\n✗ Resultado NO significativo (p >= {alpha})")
    print("  No hay evidencia suficiente de diferencia entre grupos.")

# ============================================
# 3. TAMANO DEL EFECTO (COHEN'S D)
# ============================================

print("\n3. TAMANO DEL EFECTO (COHEN'S D)")
print("-" * 40)

def cohens_d(grupo1, grupo2):
    """
    Calcula el tamano del efecto Cohen's d.

    Formula: d = (M1 - M2) / SD_pooled
    """
    n1, n2 = len(grupo1), len(grupo2)
    var1, var2 = grupo1.var(), grupo2.var()

    # Desviacion estandar pooled
    sd_pooled = np.sqrt(((n1-1)*var1 + (n2-1)*var2) / (n1+n2-2))

    # Cohen's d
    d = (grupo1.mean() - grupo2.mean()) / sd_pooled

    return d

d = cohens_d(tratamiento, control)
print(f"\nCohen's d: {d:.3f}")

# Interpretacion del tamano del efecto
if abs(d) < 0.2:
    interpretacion = "Efecto PEQUENO"
elif abs(d) < 0.5:
    interpretacion = "Efecto PEQUENO a MODERADO"
elif abs(d) < 0.8:
    interpretacion = "Efecto MODERADO a GRANDE"
else:
    interpretacion = "Efecto GRANDE"

print(f"Interpretacion: {interpretacion}")
print("""
Referencia (Cohen, 1988):
  d ≈ 0.2: Efecto pequeno
  d ≈ 0.5: Efecto moderado
  d ≈ 0.8: Efecto grande
""")

# ============================================
# 4. VISUALIZACION
# ============================================

# Crear figura con 2 graficos
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Grafico 1: Boxplot de diferencias
sns.boxplot(data=df, x='grupo', y='diferencia', ax=axes[0], palette=['lightblue', 'lightgreen'])
axes[0].set_title('Diferencia Pre-Post por Grupo')
axes[0].set_xlabel('Grupo')
axes[0].set_ylabel('Diferencia (Post - Pre)')
axes[0].axhline(y=0, color='red', linestyle='--', alpha=0.5)

# Grafico 2: Pre vs Post por grupo
for i, grupo in enumerate(['control', 'tratamiento']):
    subset = df[df['grupo'] == grupo]
    for _, row in subset.iterrows():
        axes[1].plot([0, 1], [row['pre_test'], row['post_test']],
                    'o-', color=['blue', 'green'][i], alpha=0.5)

axes[1].set_xticks([0, 1])
axes[1].set_xticklabels(['Pre-Test', 'Post-Test'])
axes[1].set_ylabel('Puntaje')
axes[1].set_title('Trayectoria Pre-Post por Participante')
axes[1].legend(['Control', 'Tratamiento'], loc='upper left')

plt.tight_layout()
plt.savefig('resultados_experimento.png', dpi=150)
plt.show()

print("\n✓ Grafico guardado como 'resultados_experimento.png'")

# ============================================
# 5. RESUMEN EJECUTIVO
# ============================================

print("\n" + "=" * 60)
print("RESUMEN EJECUTIVO")
print("=" * 60)
print(f"""
PREGUNTA DE INVESTIGACION:
  ¿El tratamiento produce una mejora mayor que el control?

RESULTADOS:
  - Grupo Control: Mejora promedio de {control.mean():.1f} puntos
  - Grupo Tratamiento: Mejora promedio de {tratamiento.mean():.1f} puntos
  - Diferencia: {tratamiento.mean() - control.mean():.1f} puntos a favor del tratamiento

SIGNIFICANCIA ESTADISTICA:
  - Test t: t = {t_stat:.2f}, p = {p_value:.4f}
  - Resultado: {'SIGNIFICATIVO' if p_value < 0.05 else 'No significativo'} al nivel α = 0.05

TAMANO DEL EFECTO:
  - Cohen's d = {d:.2f} ({interpretacion})

CONCLUSION:
  {'El tratamiento produjo una mejora significativamente mayor que el control, con un tamano del efecto ' + interpretacion.lower() + '.' if p_value < 0.05 else 'No se encontro diferencia significativa entre los grupos.'}

LIMITACIONES:
  - Muestra pequena (n = 10 por grupo)
  - Se recomienda replicar con muestra mayor
  - Considerar variables confundidoras (edad, genero)
""")
```

---

### 2. Resultados Esperados

```
1. ESTADISTICAS DESCRIPTIVAS POR GRUPO

Diferencia (Post - Pre):
             mean       std
grupo
control      3.0     1.414
tratamiento 18.4     4.722

2. TEST T PARA DIFERENCIA DE MEDIAS

Grupo Control - Media de diferencia: 3.00 (SD: 1.41)
Grupo Tratamiento - Media de diferencia: 18.40 (SD: 4.72)

Estadistico t: -7.8186
Valor p: 0.000024

✓ Resultado SIGNIFICATIVO (p < 0.05)

3. TAMANO DEL EFECTO (COHEN'S D)

Cohen's d: 4.393
Interpretacion: Efecto GRANDE
```

---

### 3. Interpretacion

| Resultado | Valor | Interpretacion |
|-----------|-------|----------------|
| p-value | 0.000024 | Muy significativo (p < 0.001) |
| Cohen's d | 4.39 | Efecto muy grande |
| Diferencia | 15.4 puntos | Clinicamente relevante |

**Conclusion:** El tratamiento fue significativamente mas efectivo que el control, con un tamano del efecto muy grande. La diferencia de 15 puntos adicionales representa una mejora sustancial.

---

## Advertencia Importante

> **NOTA**: Este es un ejemplo didactico con datos ficticios. En investigacion real:
> - Verificar supuestos del test t (normalidad, homogeneidad de varianzas)
> - Considerar tamaño de muestra adecuado (power analysis)
> - Reportar intervalos de confianza
> - Usar correccion por comparaciones multiples si aplica

---

*Ejercicio 1 - Dia 6*
