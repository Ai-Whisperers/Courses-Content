# Ejemplo Completado: Sizing Preliminar de UAV

## Contexto
Sizing preliminar para un UAV de vigilancia agrícola en la región del Chaco paraguayo.

---

## Requerimientos de Misión

| Parámetro | Valor | Justificación |
|-----------|-------|---------------|
| Carga útil | 800g | Cámara multiespectral + gimbal |
| Autonomía | 60 min | Cubrir 200 hectáreas |
| Velocidad crucero | 18 m/s | Balance eficiencia/cobertura |
| Techo operativo | 200m AGL | Regulación DINAC |
| Despegue | Catapulta | Terreno irregular Chaco |
| Aterrizaje | Panza | Sin tren, simplicidad |
| MTOW máximo | 7 kg | Categoría DINAC |

---

## Prompt de Sizing

```
Necesito sizing preliminar para un UAV de vigilancia:

**Requerimientos:**
- Carga útil: 800g
- Autonomía: 60 minutos
- Velocidad crucero: 18 m/s
- MTOW máximo: 7 kg
- Despegue: catapulta
- Construcción: fibra de vidrio + espuma

**Condiciones Paraguay:**
- Altitud base: ~250m SNM
- Temperatura: 25-40°C (Chaco)
- Densidad estimada: 1.1 kg/m³

**Generar:**
1. Estimación de pesos
2. Dimensiones de ala (W/S, AR, área)
3. Perfil recomendado
4. Sistema de propulsión
5. Verificación de rendimiento
```

---

## Resultado del Sizing

### 1. Estimación de Pesos

| Componente | Peso (g) | % MTOW |
|------------|----------|--------|
| Estructura ala | 900 | 13.8% |
| Estructura fuselaje | 600 | 9.2% |
| Cola | 200 | 3.1% |
| Motor + ESC | 250 | 3.8% |
| Hélice | 50 | 0.8% |
| Batería (6S 10000mAh) | 1300 | 20.0% |
| Servos (4x) | 160 | 2.5% |
| Receptor + telemetría | 100 | 1.5% |
| Autopiloto + GPS | 150 | 2.3% |
| Cableado | 100 | 1.5% |
| Carga útil | 800 | 12.3% |
| **Margen (10%)** | 390 | 6.0% |
| **TOTAL** | **5000** | **76.9%** |

**Margen hasta MTOW:** 2000g (para imprevistos o mejoras)

### 2. Dimensiones del Ala

**Carga alar seleccionada:** W/S = 35 kg/m²
- Justificación: Balance entre velocidad de stall aceptable y maniobrabilidad

**Cálculos:**
```
W = 5.0 kg = 49.05 N
S = W / (W/S) = 5.0 / 35 = 0.143 m²

Redondeando: S = 0.15 m² (15 dm²)
```

**Relación de aspecto:** AR = 10
- Justificación: Alta eficiencia, aceptable para transporte

**Dimensiones finales:**
```
S = b × c
AR = b² / S
b = √(AR × S) = √(10 × 0.15) = 1.22m → b = 1.25m

c = S / b = 0.15 / 1.25 = 0.12m → c = 0.12m = 12cm
```

| Parámetro | Valor |
|-----------|-------|
| Envergadura | 1.25 m |
| Cuerda | 0.12 m |
| Área alar | 0.15 m² |
| Aspect Ratio | 10.4 |
| Carga alar | 33.3 kg/m² |

### 3. Perfil Seleccionado

**Re operacional:**
```
Re = V × c / ν = 18 × 0.12 / (1.6×10⁻⁵) = 135,000
```

**Perfil recomendado:** SD7037
- Diseñado para Re 100,000-300,000
- CLmax ≈ 1.3
- (L/D)max ≈ 50 a Re=150,000

**Alternativa:** NACA 2412 (más fácil de construir)

### 4. Cola

**Coeficientes de volumen:**
- Vh (horizontal) = 0.50
- Vv (vertical) = 0.04

**Cálculos:**
```
Distancia cola: Lt = 0.5m (estimado)

Sh = Vh × S × c / Lt = 0.50 × 0.15 × 0.12 / 0.5 = 0.018 m²
Sv = Vv × S × b / Lt = 0.04 × 0.15 × 1.25 / 0.5 = 0.015 m²
```

| Superficie | Área | Dimensiones aprox |
|------------|------|-------------------|
| Estabilizador H | 180 cm² | 30×6 cm |
| Deriva V | 150 cm² | 15×10 cm |

### 5. Propulsión

**Potencia requerida para crucero:**
```
L/D estimado = 12 (conservador)
D = W / (L/D) = 49.05 / 12 = 4.09 N
P_crucero = D × V = 4.09 × 18 = 73.6 W
```

**Con eficiencia de propulsión η = 0.6:**
```
P_motor = P_crucero / η = 73.6 / 0.6 = 123 W
```

**Motor seleccionado:** Brushless 2814 (900kv)
- Potencia máxima: 400W
- Peso: 85g
- Empuje máximo (con hélice 10×5): ~2.0 kg

**Empuje/Peso:** 2.0 / 5.0 = 0.4 (OK para crucero, algo bajo para despegue)
- Catapulta asiste el despegue ✓

**Batería:**
```
Capacidad necesaria = P_motor × tiempo / voltaje
C = 123W × 1h / 22.2V = 5.5 Ah mínimo

Seleccionada: 6S 10000mAh (con margen)
Peso: 1300g
```

**Verificación de autonomía:**
```
Consumo crucero: 123W / 22.2V = 5.5A
Capacidad usable (80%): 8000 mAh = 8 Ah
Autonomía = 8 / 5.5 = 1.45 h = 87 minutos ✓
```

---

## Verificaciones

### Velocidad de Stall

```
CLmax = 1.3 (SD7037)
ρ = 1.1 kg/m³

Vstall = √(2W / (ρ × S × CLmax))
Vstall = √(2 × 49.05 / (1.1 × 0.15 × 1.3))
Vstall = √(98.1 / 0.2145)
Vstall = √457.3 = 21.4 m/s

PROBLEMA: Vstall > Vcruise!
```

### Corrección Necesaria

El sizing inicial tiene un problema: la velocidad de stall es mayor que la velocidad de crucero.

**Solución: Aumentar área alar**

Nueva área: S = 0.20 m² (+33%)
```
b = √(10 × 0.20) = 1.41m
c = 0.20 / 1.41 = 0.14m

Vstall = √(2 × 49.05 / (1.1 × 0.20 × 1.3))
Vstall = √(98.1 / 0.286) = √343 = 18.5 m/s
```

Todavía límite. Aumentar a S = 0.22 m²:
```
Vstall = √(98.1 / 0.315) = √311 = 17.6 m/s ✓
```

### Sizing Corregido

| Parámetro | Inicial | Corregido |
|-----------|---------|-----------|
| Área alar | 0.15 m² | 0.22 m² |
| Envergadura | 1.25 m | 1.48 m |
| Cuerda | 0.12 m | 0.15 m |
| Vstall | 21.4 m/s | 17.6 m/s |
| W/S | 33.3 kg/m² | 22.7 kg/m² |

---

## Resumen Final

### Vista 3-View (ASCII)

```
        VISTA SUPERIOR
     ==================
          |     |
    ______|_____|______
   /                   \
  |                     |  <- 1.48m
   \_________._________/
             |
          ===|===  <- cola
             |

        VISTA LATERAL
     ===================

      ___________________
     /                   |
    |  o                 |===
     \___________________/
           |___|
          tren (no)

        VISTA FRONTAL
     ===================

            /||\
           / || \
         /   ||   \
        /    ||    \
       ------||------
             ||
```

### Hoja de Datos

| Especificación | Valor |
|----------------|-------|
| **Envergadura** | 1.48 m |
| **Cuerda** | 0.15 m |
| **Área alar** | 0.22 m² |
| **Longitud fuselaje** | ~0.8 m |
| **MTOW** | 5.0 kg |
| **Peso vacío** | 4.2 kg |
| **Carga útil** | 0.8 kg |
| **Velocidad crucero** | 18 m/s |
| **Velocidad stall** | 17.6 m/s |
| **Autonomía** | 60+ min |
| **Motor** | 2814-900kv |
| **Batería** | 6S 10000mAh |
| **Perfil** | SD7037 |

---

## Lecciones Aprendidas

1. **La primera iteración tenía error crítico** - Vstall > Vcruise
2. **La IA no detectó el error** - El estudiante tuvo que verificar
3. **El sizing es iterativo** - Cambiar un parámetro afecta otros
4. **SIEMPRE verificar con cálculos propios** - No confiar ciegamente

### Próximos pasos obligatorios:
1. [ ] Análisis de estabilidad (CG, márgenes)
2. [ ] Polar completa en XFLR5
3. [ ] Análisis estructural del larguero
4. [ ] Prototipo a escala reducida

---

*Ejemplo completado - Ingeniería Aeronáutica - FPUNA 2026*
