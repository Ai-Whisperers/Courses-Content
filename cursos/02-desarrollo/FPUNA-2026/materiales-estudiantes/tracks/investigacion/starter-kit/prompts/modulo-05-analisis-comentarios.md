# Prompt: Análisis de Comentarios

Este prompt ayuda a interpretar y categorizar los comentarios de los revisores.

## Prompt

```bash
opencode "Analiza y categoriza comentarios de revisores:

COMENTARIOS DE REVISORES:
@attach reviewer_comments.md

CATEGORIZACIÓN REQUERIDA:
1. **Críticas Metodológicas**
   - Diseño experimental
   - Tamaño muestral
   - Análisis estadístico
   - Validez de instrumentos

2. **Problemas de Presentación**
   - Claridad de escritura
   - Estructura del paper
   - Formato de tablas/figuras
   - Citas y referencias

3. **Sugerencias de Mejora**
   - Análisis adicionales
   - Extensiones teóricas
   - Implicaciones prácticas
   - Futuras investigaciones

4. **Errores Menores**
   - Errores tipográficos
   - Formato inconsistente
   - Referencias faltantes
   - Errores gramaticales

ESTRATEGIA DE RESPUESTA:
- Comentarios mayores vs menores
- Tiempo estimado para correcciones
- Posibilidad de implementación
- Impacto en conclusiones

OUTPUT:
- Tabla de comentarios categorizados
- Estrategia de respuesta
- Cronograma de implementación
- Recomendación final (aceptar/rechazar)"
```
