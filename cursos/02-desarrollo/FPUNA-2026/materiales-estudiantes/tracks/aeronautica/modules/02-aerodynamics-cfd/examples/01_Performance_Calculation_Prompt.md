```bash
opencode "Calcula performance aerodinámica del ala del UAV:

ESPECIFICACIONES DEL ALA:
- Perfil: NACA 4412
- Cuerda media: 250mm
- Envergadura: 2000mm
- Área alar: S = 0.5 m²
- Relación de aspecto: AR = b²/S = 8

CONDICIONES DE VUELO:
- Velocidad crucero: V = 15 m/s (54 km/h)
- Densidad aire: ρ = 1.225 kg/m³ (nivel del mar, 15°C)
- Peso total UAV: W = 3 kg (29.4 N)

CÁLCULOS REQUERIDOS:
1. Presión dinámica: q = 0.5 × ρ × V²
2. CL necesario para sostener peso en crucero:
   L = W → CL = W / (q × S)
3. Ángulo de ataque correspondiente (usar polar NACA 4412)
4. CD inducido (drag inducido por sustentación):
   CDi = CL² / (π × e × AR)
   Donde e = eficiencia (asume 0.85)
5. CD total (suma perfiles + inducido)
6. Drag total: D = CD × q × S
7. Potencia requerida: P = D × V (watts)
8. L/D ratio (eficiencia aerodinámica)

INCLUIR:
- Cálculos paso a paso con unidades
- Comparación con datos de referencia (NACA reports)
- Análisis de sensibilidad: ¿qué pasa si V aumenta a 20 m/s?
- Recomendaciones de optimización
- Gráfica CL vs α del NACA 4412

Todo en español con contexto de UAV agrícola paraguayo"
```