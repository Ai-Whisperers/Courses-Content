Realiza trade-off analysis completo para optimizar diseño:

DISEÑO BASE:

- Envergadura: 1.40 m
- Peso: 3.5 kg
- Batería: 4S 6000mAh
- Velocidad crucero: 15 m/s
- Autonomía actual: 45 min
- Costo: USD 4,800

OBJETIVOS:

1. Autonomía ≥ 50 min (prioritario)
2. Peso ≤ 4.0 kg (límite estructura)
3. Costo ≤ USD 5,500 (límite presupuesto)

VARIABLES EXPLORAR:

1. Envergadura: 1.2-1.6 m (impacta eficiencia, peso)
2. Área alar: 0.15-0.30 m² (impacta carga alar, V_stall)
3. Batería: 4000-10000 mAh (impacta autonomía, peso, costo)
4. Velocidad crucero: 12-18 m/s (impacta potencia, cobertura)
5. Perfil alar: NACA 4412 vs 2412 vs 6412 (impacta L/D)

ANÁLISIS REQUERIDO:

1. Design of Experiments (DoE):
   - Factorial completo o Latin Hypercube
   - 50-100 configuraciones
2. Para cada configuración:
   - Calcular peso total (estructura escala con S^0.75)
   - Calcular arrastre y potencia requerida
   - Calcular autonomía con batería especificada
   - Estimar costo (scaling factors para materiales)
3. Carpet plots:
   - Autonomía vs Peso vs Batería
   - Autonomía vs Velocidad vs Área alar
   - Costo vs Autonomía vs Peso
4. Pareto front:
   - Identificar configuraciones no-dominadas
   - Ranking por scoring function
5. Sensitivity analysis:
   - Tornado diagram
   - ¿Qué variable tiene mayor impacto?
   - ¿Dónde invertir esfuerzo de optimización?
6. Recomendación final:
   - Top 3 configuraciones
   - Pros/cons de cada una
   - Justificación de selección

INCLUIR:

- Código Python/MATLAB para análisis
- Gráficos high-quality (matplotlib/seaborn)
- Tabla resumen configuraciones Pareto
- Conclusiones y siguiente steps

TODO en español con enfoque ingenieril paraguayo
