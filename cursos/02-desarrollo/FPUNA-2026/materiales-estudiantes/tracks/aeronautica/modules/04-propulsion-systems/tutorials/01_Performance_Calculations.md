### Tutorial: Cálculo de Performance de un Sistema de Propulsión

Este tutorial te guiará en el cálculo de la performance de un sistema de propulsión para un UAV, integrando las ecuaciones de empuje, arrastre y potencia.

#### 1. Definir la Aeronave y las Condiciones de Vuelo
- **Peso (W)**: 3 kg (29.43 N)
- **Área Alar (S)**: 0.4 m²
- **Envergadura (b)**: 2 m
- **Perfil Aerodinámico**: NACA 4412
- **Condiciones**: Nivel del mar (ρ = 1.225 kg/m³)

#### 2. Calcular la Polar de Arrastre
La resistencia de la aeronave se compone de un arrastre parásito (constante) y un arrastre inducido (dependiente de la sustentación).
`C_D = C_D0 + (C_L² / (π × AR × e))`
- **C_D0 (Arrastre Parásito)**: 0.025 (estimado para un fuselaje limpio)
- **AR (Aspect Ratio)**: `b²/S = 2² / 0.4 = 10`
- **e (Factor de Oswald)**: 0.85 (eficiencia del ala)

Tu ecuación de arrastre es: `C_D = 0.025 + 0.0374 × C_L²`

#### 3. Calcular Velocidades Clave
- **Velocidad de Stall (V_stall)**: La mínima velocidad de vuelo.
  `V_stall = √(2 × W / (ρ × S × C_L_max))`
  Usando un `C_L_max` de 1.4, `V_stall` ≈ 9.3 m/s.

- **Velocidad Máxima (V_max)**: Ocurre cuando el empuje máximo disponible del motor es igual a la resistencia total. Esto requiere un cálculo iterativo o gráfico.

#### 4. Calcular la Potencia Requerida vs. Velocidad
Para cada velocidad de vuelo, se necesita una cantidad de potencia para vencer el arrastre.
1.  Para una `V` dada, calcula el `C_L` necesario para volar: `C_L = W / (0.5 * ρ * V² * S)`.
2.  Con ese `C_L`, calcula el `C_D` usando la polar de arrastre.
3.  Calcula el Arrastre `D = 0.5 * ρ * V² * S * C_D`.
4.  Calcula la Potencia Requerida `P_req = D × V`.

Haciendo esto para un rango de velocidades (ej: 10 m/s a 30 m/s), puedes graficar la curva de potencia requerida. El punto más bajo de esta curva es la **velocidad de mínima potencia (V_mp)**, que es la velocidad de máxima autonomía para un avión eléctrico.

#### 5. Calcular la Autonomía
`Autonomía (horas) = Energía Útil de la Batería (Wh) / Potencia Consumida (W)`
- **Energía Útil**: `Capacidad (Ah) × Voltaje (V) × Profundidad de Descarga (ej: 0.8)`.
- **Potencia Consumida**: `Potencia Requerida / Eficiencia Total del Sistema`.

Si la `Potencia Requerida` a tu velocidad de crucero es 180W y tu batería tiene 59.2 Wh de energía útil, tu autonomía teórica es `59.2 / 180 = 0.329 horas`, o ~19.7 minutos.
Aplica un factor de reserva del 20% para obtener una autonomía real segura de ~15.8 minutos.
