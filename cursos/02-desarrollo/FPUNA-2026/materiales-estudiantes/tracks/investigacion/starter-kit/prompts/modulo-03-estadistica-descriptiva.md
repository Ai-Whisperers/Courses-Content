# Prompt: Estadística Descriptiva

Este prompt realiza un análisis descriptivo completo de un dataset.

## Prompt

```bash
opencode "Realiza análisis estadístico descriptivo completo:

DATOS:
@attach dataset.csv

VARIABLES DE INTERÉS:
- Grupo: experimental/control
- Edad: años completos
- Género: masculino/femenino/otro
- Pre-test: comprensión inicial (0-100)
- Post-test: comprensión final (0-100)
- Horas_uso_IA: horas semanales
- Motivación: escala 1-10

ANÁLISIS DESCRIPTIVO REQUERIDO:
1. Estadística por separado para cada grupo
2. Medidas de tendencia central (media, mediana, moda)
3. Medidas de dispersión (SD, rango, IQR)
4. Distribución de frecuencias
5. Detección de outliers

OUTPUT FORMATO:
- Tabla de estadística descriptiva
- Interpretación de cada métrica
- Identificación de valores atípicos
- Comparación inicial entre grupos"
```
