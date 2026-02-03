# Prompt: Evaluación de Calidad de Datos

Este prompt evalúa la calidad de un dataset antes del análisis.

## Prompt

```bash
opencode "Evalúa calidad de datos para análisis:

DATOS CRUDOS:
@attach raw_dataset.csv

EVALUACIÓN REQUERIDA:
1. Completitud: Porcentaje de datos faltantes por variable
2. Consistencia: Valores fuera de rango esperado
3. Duplicados: Registros duplicados exactos
4. Outliers: Valores atípicos estadísticos
5. Formato: Tipos de datos correctos

ACCIONES CORRECTIVAS:
- Estrategia para valores faltantes
- Tratamiento de outliers
- Corrección de inconsistencias
- Normalización de formatos

REPORTE REQUERIDO:
- Diagnóstico de calidad detallado
- Recomendaciones específicas
- Código para corrección
- Dataset limpio resultante

OUTPUT:
- Informe de calidad de datos
- Dataset procesado
- Documentación de cambios
- Justificación de decisiones"
```
