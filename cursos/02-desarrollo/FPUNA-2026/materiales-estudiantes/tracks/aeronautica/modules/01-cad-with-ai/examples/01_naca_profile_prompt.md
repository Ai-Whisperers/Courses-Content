### Implementación con OpenCode

```bash
opencode "Genera script Python para calcular coordenadas de perfil NACA 0012:

ESPECIFICACIONES:
- Perfil: NACA 0012 (simétrico, 12% espesor)
- Cuerda: 1000mm
- Número de puntos: 100 (distribuidos coseno para mayor densidad en bordes)
- Ecuación NACA estándar
- Output: CSV con columnas (x, y_superior, y_inferior)

INCLUIR EN EL SCRIPT:
1. Función naca_airfoil(naca_code, chord, n_points)
2. Distribución de puntos con espaciado coseno
3. Cálculo de coordenadas superiores e inferiores
4. Export a CSV listo para importar en CAD
5. Plot matplotlib para verificar forma
6. Comentarios explicando cada paso

VALIDACIONES:
- Verificar que espesor máximo sea 12% en x/c ≈ 0.3
- Borde de ataque cerrado (tolerancia < 0.01mm)
- Borde de salida con espesor finito
- Curva suave sin discontinuidades

Output en español con contexto de diseño aeronáutico paraguayo"
```