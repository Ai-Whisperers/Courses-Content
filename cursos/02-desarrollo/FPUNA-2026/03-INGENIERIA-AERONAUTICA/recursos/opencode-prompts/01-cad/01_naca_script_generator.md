Genera script Python para Fusion 360 API que cree perfil NACA paramétrico:

FUNCIONALIDAD:

- Input: Código NACA (ej: "2412"), cuerda, num_puntos
- Output: Sketch en Fusion 360 con spline del perfil

CÓDIGO ESPERADO:

1. Importar Fusion 360 API
2. Función calculate_naca_coordinates(naca, chord, n_points)
3. Crear sketch en plano XY
4. Dibujar spline con puntos calculados
5. Cerrar perfil (conectar trailing edge)

VALIDACIONES:

- Verificar código NACA válido (4 dígitos)
- Cuerda > 0
- Puntos ≥ 50 (resolución mínima)

INCLUIR:

- Comentarios explicativos
- Manejo de errores
- Ejemplo de uso
- Documentación de parámetros

Output en español para estudiantes FPUNA
