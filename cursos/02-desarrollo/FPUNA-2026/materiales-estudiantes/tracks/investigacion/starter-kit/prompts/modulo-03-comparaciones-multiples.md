# Prompt: Comparaciones Múltiples

Este prompt realiza análisis estadístico avanzado para múltiples grupos (ANOVA, ANCOVA, Post-hoc).

## Prompt

```bash
opencode "Realiza análisis de comparaciones múltiples:

DATOS:
@attach dataset.csv

DISEÑO EXPERIMENTAL:
- 3 grupos: Control, ChatGPT, Claude
- Variable dependiente: Comprensión post-test
- Covariable: Comprensión pre-test

ANÁLISIS REQUERIDO:
1. ANOVA unidireccional
2. Prueba post-hoc (Tukey HSD)
3. ANCOVA controlando por pre-test
4. Comparaciones pareadas específicas
5. Effect sizes para todas las comparaciones

CORRECCIONES:
- Bonferroni para comparaciones múltiples
- Ajuste de alfa por familia de tests
- Control de tasa de error Tipo I

OUTPUT:
- Tabla ANOVA completa
- Resultados post-hoc
- Comparaciones ajustadas
- Interpretación de patrones"
```
