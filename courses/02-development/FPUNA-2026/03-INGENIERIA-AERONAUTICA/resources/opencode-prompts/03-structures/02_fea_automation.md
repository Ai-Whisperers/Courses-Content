Genera script Python para automatizar análisis FEA paramétrico en ANSYS:

OBJETIVO:
Crear script que analice el larguero de ala con diferentes secciones transversales y encuentre la óptima.

PARÁMETROS VARIABLES:

- Ancho (b): 10mm, 12mm, 14mm, 16mm
- Alto (h): 14mm, 16mm, 18mm, 20mm
- Total: 16 combinaciones

ANÁLISIS PARA CADA COMBINACIÓN:

1. Generar geometría (box)
2. Asignar material Aluminum 7075-T6
3. Mesh automático (2mm)
4. Fixed support en cara raíz
5. Pressure load en cara superior (9.32 kPa)
6. Solve static structural
7. Extraer:
   - σ_von_Mises_max
   - δ_total_max
   - Factor de seguridad (FS = 503/σ_max)
   - Peso = ρ × Volumen

TECNOLOGÍA:

- Python + PyANSYS (ansys.mechanical.core)
- O usar ANSYS APDL scripts

OUTPUT:

- Tabla CSV: b, h, σ_max, δ_max, FS, Peso
- Gráfico: Peso vs FS (Pareto front)
- Recomendación: Sección óptima (mín peso con FS≥1.5)

INCLUIR:

- Código comentado
- Manejo de errores
- Progress bar
- Validación de resultados

TODO en español para estudiantes FPUNA
