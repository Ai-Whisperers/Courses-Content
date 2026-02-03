# Prompt: Estadística Inferencial

Este prompt selecciona y ejecuta pruebas estadísticas inferenciales apropiadas.

## Prompt

```bash
opencode "Realiza análisis inferencial apropiado:

DATOS:
@attach dataset.csv

PREGUNTA DE INVESTIGACIÓN:
¿Hay diferencia significativa en comprensión post-test entre grupo experimental y control?

ANÁLISIS REQUERIDO:
1. Verificación de supuestos:
   - Normalidad (Shapiro-Wilk)
   - Homogeneidad de varianzas (Levene)
   - Independencia de observaciones

2. Selección de test apropiado:
   - Si supuestos cumplidos: t-test independiente
   - Si violados: Mann-Whitney U test
   - Si covariables: ANCOVA

3. Cálculo de effect size:
   - Cohen's d para t-test
   - r para Mann-Whitney
   - η² para ANCOVA

4. Intervalos de confianza 95%

OUTPUT:
- Resultado de verificación de supuestos
- Test estadístico ejecutado con justificación
- Estadístico, p-value, effect size
- Interpretación en términos prácticos
- Tabla APA-style de resultados"
```
