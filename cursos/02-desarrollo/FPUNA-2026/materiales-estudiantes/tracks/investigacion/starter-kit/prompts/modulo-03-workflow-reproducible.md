# Prompt: Flujo de Trabajo Reproducible

Este prompt genera un flujo de trabajo de análisis completo y reproducible en Markdown.

## Prompt

```bash
opencode "Crea workflow de análisis reproducible en Markdown:

DATOS:
@attach raw_data.csv

ESTRUCTURA REQUERIDA:
\`\`\`markdown
# Análisis de Datos - Estudio IA en Educación

## 1. Setup y Descripción de Datos
[Descripción del dataset y variables]

## 2. Limpieza de Datos
[Procedimiento de limpieza con IA]

## 3. Análisis Descriptivo
[Todas las tablas y gráficos descriptivos]

## 4. Verificación de Supuestos
[Tests de normalidad y homocedasticidad]

## 5. Análisis Inferencial
[Test estadístico principal con justificación]

## 6. Visualizaciones Finales
[Gráficos listos para publicación]

## 7. Resultados Principales
[Resumen en formato APA]

## 8. Archivos Generados
[Lista de outputs y reproducción]
\`\`\`

REQUISITOS:
- Todo explicado paso a paso
- Comandos AI usados documentados
- Resultados interpretables
- Código replicable
- Referencias a métodos estadísticos

OUTPUT:
- Archivo .md completo del análisis
- Explicación de cada paso
- Reproducibilidad garantizada"
```
