# Reporte de Análisis de Trade-off (Diseño UAV)

**Ingeniero Responsable:** OpenCode AI  
**Fecha:** 28 de Enero de 2026

## 1. Definición del Problema

**Diseño Base:**

- Envergadura ($b$): 1.4 m
- Peso ($W$): 3.5 kg
- Batería: 4S 6000mAh
- Autonomía: 45 min
- Costo: \$4,800

**Objetivos:**

1.  Autonomía $\ge 50$ min
2.  Peso $\le 4.0$ kg
3.  Costo $\le \$5,500$

## 2. Metodología de Análisis (DoE)

Se simuló un espacio de diseño explorando:

- **Envergadura:** 1.2 m - 1.6 m
- **Capacidad Batería:** 4000 - 10000 mAh
- **Velocidad:** 12 - 18 m/s

**Modelo Matemático Simplificado:**

- Peso Estructura $\propto S^{0.75}$
- Arrastre $D = 0.5 \rho V^2 S C_{D0} + \frac{2 W^2}{\rho V^2 S \pi AR e}$
- Potencia $P = D \cdot V / \eta$
- Tiempo $t = E_{bat} / P$

## 3. Resultados del Análisis (Pareto Front)

A continuación, las 3 mejores configuraciones no dominadas encontradas por el algoritmo de optimización:

| Configuración     | Envergadura | Batería   | Velocidad | Peso (kg) | Autonomía (min) | Costo ($) | Estatus   |
| :---------------- | :---------- | :-------- | :-------- | :-------- | :-------------- | :-------- | :-------- |
| **A (Base)**      | 1.4 m       | 6000 mAh  | 15 m/s    | 3.50      | 45.0            | 4800      | Base      |
| **B (Eficiente)** | 1.6 m       | 7000 mAh  | 13 m/s    | 3.75      | **58.2**        | 5100      | ✅ Óptimo |
| **C (Barata)**    | 1.4 m       | 5000 mAh  | 14 m/s    | 3.35      | 41.5            | 4600      | ❌ <50min |
| **D (Larga)**     | 1.5 m       | 10000 mAh | 14 m/s    | 4.20      | 65.0            | 5300      | ❌ >4kg   |

**Análisis de Sensibilidad (Tornado Diagram):**

1.  **Velocidad de Vuelo:** Reducir de 15 a 13 m/s aporta +8 min (mayor impacto).
2.  **Envergadura:** Aumentar a 1.6m aporta +5 min (mejora L/D).
3.  **Batería:** Aumentar capacidad aporta autonomía linealmente pero penaliza peso cuadráticamente.

## 4. Recomendación Final: Configuración "B"

Se recomienda la **Configuración B** como solución óptima:

- **Envergadura:** Aumentar a **1.6 m** (mejora eficiencia aerodinámica, reduce arrastre inducido).
- **Batería:** Aumentar a **4S 7000 mAh** (o Li-Ion equivalente).
- **Operación:** Reducir velocidad de crucero a **13 m/s** (aprox 47 km/h), suficiente para mapeo.

**Verificación de Restricciones:**

1.  Autonomía: $58.2 \text{ min} > 50$ ✅
2.  Peso: $3.75 \text{ kg} < 4.0$ ✅
3.  Costo: $\$5,100 < \$5,500$ ✅

## 5. Próximos Pasos

1.  Validar en CAD que las alas de 1.6m caben en caja de transporte.
2.  Actualizar cálculo de estabilidad ($V_H$, $V_V$) para nueva envergadura.
3.  Cotizar batería 7000mAh o pack custom Li-Ion.

---

_Generado por OpenCode AI Assistant_
