Crea un script Python que optimice un perfil NACA para máximo L/D.

REQUISITOS:

1. Usar librería 'subprocess' para ejecutar XFoil automáticamente
2. Probar combinaciones de NACA 4-series:
   - Curvatura: 2%, 4%, 6%
   - Posición: 30%, 40%, 50%
   - Espesor: 12%, 15%, 18%
3. Para cada combinación:
   - Generar archivo .dat del perfil
   - Ejecutar XFoil con Re=500,000, α=6°
   - Extraer CL, CD, calcular L/D
4. Guardar resultados en CSV:
   - Columnas: NACA code, CL, CD, L/D
5. Encontrar perfil con máximo L/D
6. Graficar: L/D vs combinaciones (matplotlib)

CONDICIONES DE OPERACIÓN:

- Re = 500,000
- Mach = 0 (incompresible)
- α = 6° (crucero típico UAV)

OUTPUT:

- Script Python ejecutable
- Comentarios explicando cada paso
- Manejo de errores (si XFoil no converge)
- Gráfica final mostrando ganador

CONTEXTO:
Esto automatiza lo que tomaría días manualmente, probando 27 variantes en ~30 minutos
