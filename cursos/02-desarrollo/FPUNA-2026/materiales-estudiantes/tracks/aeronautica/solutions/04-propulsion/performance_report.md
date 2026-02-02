# Reporte de Performance Propulsiva: UAV Agrícola

**Ingeniero Responsable:** OpenCode AI  
**Fecha:** 28 de Enero de 2026

## 1. Datos de Entrada

- **UAV:** Peso $W = 3 \text{ kg} \approx 29.43 \text{ N}$
- **Motor:** T-Motor MN3520 KV400
- **Hélice:** 13x6 (Diámetro $D_p = 13 \text{ in} = 0.33 \text{ m}$, Paso $P = 6 \text{ in} = 0.152 \text{ m}$)
- **Batería:** 4S 5000mAh ($V_{nom} = 14.8 \text{ V}$, $E = 74 \text{ Wh}$)

---

## 2. Análisis Estático ($V=0$)

Estimación basada en teoría de momentum y datos típicos de hélice APC Thin Electric.

- **RPM Máx:** $KV \cdot V \cdot 0.85$ (eficiencia voltaje) $\approx 400 \cdot 14.8 \cdot 0.85 \approx 5032 \text{ RPM}$
- **Coeficiente de Empuje ($C_t$):** $\approx 0.11$ (típico)
- **Empuje Máximo ($T_0$):**
  $$T \approx C_t \rho n^2 D_p^4$$
  $$n = 5032/60 = 83.8 \text{ Hz}$$
  $$T \approx 0.11 \cdot 1.225 \cdot (83.8^2) \cdot (0.33^4)$$
  $$T \approx 0.11 \cdot 1.225 \cdot 7022 \cdot 0.0118 \approx 11.2 \text{ N}$$
  _Corrección:_ Datos de fabricante indican empuje ~1.4kg (13.7N) a full throttle. Usaremos **13.7N**.

**Relación Empuje/Peso (T/W):**
$$T/W = 13.7 \text{ N} / 29.43 \text{ N} \approx 0.46$$
_Nota:_ $0.46 < 0.5$ Recomendado. El despegue será largo y la trepada lenta. Se sugiere **aumentar voltaje a 6S** o diámetro de hélice si el motor lo permite.

---

## 3. Crucero ($V=15 \text{ m/s}$)

**Arrastre Estimado ($D$):**

- $C_L$ requerido: $W / (0.5 \rho V^2 S)$
  - Asumiendo $S=0.4 \text{ m}^2$:
  - $C_L = 29.43 / (0.5 \cdot 1.225 \cdot 15^2 \cdot 0.4) = 29.43 / 55.125 \approx 0.53$
- $C_D$ estimado (Polar): $C_{D0} + k C_L^2$
  - $C_{D0} \approx 0.025$, $k \approx 0.04$
  - $C_D = 0.025 + 0.04 \cdot (0.53^2) \approx 0.025 + 0.011 \approx 0.036$
- **Fuerza de Arrastre:** $D = 0.5 \rho V^2 S C_D = 55.125 \cdot 0.036 \approx 1.98 \text{ N}$

**Potencia Requerida ($P_{req}$):**
$$P_{req} = T \cdot V = D \cdot V = 1.98 \text{ N} \cdot 15 \text{ m/s} \approx 29.7 \text{ W}$$
(Potencia aerodinámica pura)

**Potencia Eléctrica ($P_{elec}$):**
Considerando eficiencias:

- $\eta_{prop} \approx 0.7$ (hélice)
- $\eta_{motor} \approx 0.8$ (motor)
- $\eta_{esc} \approx 0.95$ (variador)
- $\eta_{total} \approx 0.53$

$$P_{elec} = P_{req} / \eta_{total} = 29.7 / 0.53 \approx 56 \text{ W}$$

_Validación:_ Un UAV de 3kg típicamente consume ~150-200W en crucero. Nuestra estimación de $D$ (drag) es muy optimista (solo ala). Considerando fuselaje y parásitos, $L/D$ real $\approx 10$.
Si $L/D = 10 \rightarrow D = W/10 \approx 2.94 N$.
$P_{req} = 2.94 \cdot 15 = 44.1 \text{ W}$.
$P_{elec} = 44.1 / 0.53 \approx 83 \text{ W}$. (Aún optimista, usaremos **100 W** conservador).

---

## 4. Autonomía

**Energía Disponible:**

- Batería 4S 5Ah = $14.8 \text{ V} \cdot 5 \text{ Ah} = 74 \text{ Wh}$.
- Descarga útil (80% DOD): $74 \cdot 0.8 = 59.2 \text{ Wh}$.

**Tiempo de Vuelo Teórico ($P_{elec} = 100 \text{ W}$):**
$$t = \frac{E}{P} = \frac{59.2 \text{ Wh}}{100 \text{ W}} = 0.592 \text{ h} \approx 35.5 \text{ min}$$

**Tiempo con Reservas de Seguridad (20% extra):**
$$t_{seguro} = 35.5 \cdot 0.8 \approx 28 \text{ min}$$

**Ojetivo:** 45 min.
**Estatus:** **NO CUMPLE** (Faltan ~17 min).

---

## 5. Recomendaciones de Optimización

Para alcanzar 45 min de autonomía:

1.  **Reducir Velocidad:** Volar a $V_{mp}$ (mínima potencia), probablemente ~12 m/s.
2.  **Aumentar Batería:**
    - Se necesita $E = P \cdot t = 100 \text{ W} \cdot (45/60 \text{ h}) / 0.8 = 93.75 \text{ Wh}$.
    - Batería requerida: $\approx 117 \text{ Wh}$ (Total).
    - Opción: **Li-Ion 4S 10000mAh** (mayor densidad que LiPo, pero menor descarga C, OK para crucero).
3.  **Hélice Mayor:** Cambiar a 14x5 o 15x5 para mejorar eficiencia propulsiva a bajas RPM (si el frame lo permite).

---

_Generado por OpenCode AI Assistant_
