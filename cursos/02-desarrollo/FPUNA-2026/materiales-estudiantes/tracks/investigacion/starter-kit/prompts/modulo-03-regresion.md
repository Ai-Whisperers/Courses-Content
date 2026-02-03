# Prompt: Análisis de Regresión

Este prompt realiza análisis de regresión múltiple y verificación de supuestos.

## Prompt

```bash
opencode "Realiza análisis de regresión múltiple:

DATOS:
@attach dataset.csv

MODELO PROPUESTO:
Comprensión_postest ~ Uso_IA + Edad + Género + Pre_test + Motivación

ANÁLISIS REQUERIDO:
1. Diagnóstico de supuestos de regresión:
   - Linealidad
   - Normalidad de residuos
   - Homocedasticidad
   - No multicolinealidad (VIF)

2. Estimación del modelo:
   - Coeficientes con errores estándar
   - Significancia estadística
   - R² ajustado
   - Diagnóstico de influencia (Cook's distance)

3. Validación cruzada:
   - División entrenamiento-prueba
   - Desempeño en datos nuevos
   - Evaluación de sobreajuste (overfitting)

OUTPUT:
- Tabla de coeficientes con interpretación
- Diagnóstico de supuestos
- Métricas de ajuste
- Visualizaciones diagnósticas"
```
