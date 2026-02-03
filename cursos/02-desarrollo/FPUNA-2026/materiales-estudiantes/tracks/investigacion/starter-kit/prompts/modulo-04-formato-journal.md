# Prompt: Formato de Journal

Este prompt automatiza el formateo del manuscrito según las pautas específicas de la revista objetivo.

## Prompt

```bash
opencode "Formatea paper para journal específico:

TARGET JOURNAL:
[Nombre del journal y pautas]

MANUSCRITO ACTUAL:
@attach formatted_paper.md

REQUISITOS DEL JOURNAL:
- Formato específico (IEEE, APA, etc.)
- Límite de palabras
- Estructura requerida
- Estilo de figuras/tablas
- Información de autores

AUTOMATIZACIÓN REQUERIDA:
1. **Formateo de texto**
   - Márgenes y fuente
   - Espaciado y sangría
   - Numeración de páginas
   - Encabezados

2. **Estructura específica**
   - Abstract/Palabras clave
   - Secciones requeridas
   - Declaraciones (conflictos, ética)
   - Agradecimientos

3. **Figuras y tablas**
   - Numeración consecutiva
   - Títulos y leyendas
   - Resolución y formato
   - Posición en texto

4. **Referencias**
   - Formato exacto del journal
   - DOIs incluidos
   - Orden apropiado
   - Hipervínculos cuando requerido

OUTPUT:
- Paper completamente formateado
- Checklist de cumplimiento
- Lista de ajustes realizados
- Listo para envío"
```
