```bash
opencode "Calcula performance completo del sistema de propulsión del UAV:

ESPECIFICACIONES:
- Motor: T-Motor MN3520 KV400
- Hélice: 13×6 (330mm × 152mm paso)
- Batería: 4S 5000mAh 25C (14.8V, 74Wh)
- Peso UAV: 3 kg
- Velocidad crucero objetivo: 15 m/s

ANÁLISIS REQUERIDO:
1. Empuje estático (V_0 = 0):
   - RPM del motor sin carga
   - Coeficiente empuje C_t estimado
   - Empuje teórico T
   - Verificar T/W ≥ 0.5

2. Empuje en crucero (V_0 = 15 m/s):
   - RPM efectivo (con carga)
   - Empuje disponible
   - Arrastre estimado D
   - Verificar T = D (equilibrio)

3. Potencia y eficiencia:
   - Potencia motor P_motor
   - Corriente consumida I
   - Eficiencia propulsiva η_prop
   - Eficiencia total η_total

4. Autonomía:
   - Energía disponible (80% DoD)
   - Consumo en crucero (W)
   - Tiempo vuelo teórico
   - Tiempo vuelo real (con reservas)

5. Velocidades características:
   - V_stall (velocidad pérdida)
   - V_max (máxima velocidad horizontal)
   - V_climb (trepada óptima)

INCLUIR:
- Todos los cálculos paso a paso
- Gráfico Empuje vs Velocidad
- Gráfico Potencia vs Velocidad
- Tabla resumen de performance
- Comparación vs objetivo (45 min autonomía)
- Recomendaciones si no cumple

TODO en español con contexto de UAV agrícola paraguayo"
```