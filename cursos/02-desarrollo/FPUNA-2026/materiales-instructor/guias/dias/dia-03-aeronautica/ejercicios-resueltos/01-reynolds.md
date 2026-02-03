# Ejercicio Resuelto: Calculo de Numero de Reynolds

## Objetivo
Calcular el numero de Reynolds y generar codigo Python para automatizarlo.

---

## Prompt del Estudiante

```
Soy estudiante de aeronautica. Necesito calcular el numero de Reynolds para:
- Velocidad: 50 m/s
- Cuerda del ala: 1.2 metros
- Altitud: 3000 metros (usar propiedades ISA)

Dame:
1. El calculo paso a paso
2. El valor final
3. Codigo Python para automatizar este calculo
4. Que me dice este Reynolds sobre el flujo?
```

---

## Respuesta Esperada

### 1. Propiedades del Aire a 3000m (ISA)

A 3000 metros de altitud, segun la Atmosfera Estandar Internacional:

| Propiedad | Simbolo | Valor | Unidad |
|-----------|---------|-------|--------|
| Temperatura | T | 268.65 | K |
| Presion | P | 70,109 | Pa |
| Densidad | ρ | 0.9093 | kg/m³ |
| Viscosidad dinamica | μ | 1.694×10⁻⁵ | Pa·s |
| Viscosidad cinematica | ν | 1.863×10⁻⁵ | m²/s |

### 2. Calculo Paso a Paso

**Formula del Numero de Reynolds:**

```
Re = (ρ × V × L) / μ = (V × L) / ν
```

Donde:
- V = velocidad (50 m/s)
- L = longitud caracteristica / cuerda (1.2 m)
- ν = viscosidad cinematica (1.863×10⁻⁵ m²/s)

**Calculo:**

```
Re = (50 m/s × 1.2 m) / (1.863×10⁻⁵ m²/s)
Re = 60 / (1.863×10⁻⁵)
Re = 3,220,611 ≈ 3.22 × 10⁶
```

### 3. Valor Final

```
Re ≈ 3.22 millones
```

### 4. Codigo Python

```python
"""
Calculadora de Numero de Reynolds con modelo ISA
FPUNA - Ingenieria Aeronautica 2026
"""

import numpy as np

def propiedades_isa(altitud_m):
    """
    Calcula propiedades del aire segun ISA hasta 11km (troposfera).

    Args:
        altitud_m: Altitud en metros

    Returns:
        dict con T (K), P (Pa), rho (kg/m3), mu (Pa.s), nu (m2/s)
    """
    # Constantes
    T0 = 288.15  # Temperatura a nivel del mar (K)
    P0 = 101325  # Presion a nivel del mar (Pa)
    L = 0.0065   # Gradiente de temperatura (K/m)
    g = 9.81     # Gravedad (m/s2)
    R = 287.05   # Constante del aire (J/kg.K)

    # Temperatura
    T = T0 - L * altitud_m

    # Presion
    P = P0 * (T / T0) ** (g / (R * L))

    # Densidad (ecuacion de estado)
    rho = P / (R * T)

    # Viscosidad dinamica (formula de Sutherland)
    C = 120  # Constante de Sutherland para aire
    mu0 = 1.789e-5  # Viscosidad a 288.15K
    mu = mu0 * (T / 288.15) ** 1.5 * (288.15 + C) / (T + C)

    # Viscosidad cinematica
    nu = mu / rho

    return {
        'T': T,
        'P': P,
        'rho': rho,
        'mu': mu,
        'nu': nu
    }


def calcular_reynolds(velocidad, longitud, altitud):
    """
    Calcula el numero de Reynolds.

    Args:
        velocidad: Velocidad del flujo (m/s)
        longitud: Longitud caracteristica/cuerda (m)
        altitud: Altitud de vuelo (m)

    Returns:
        Numero de Reynolds (adimensional)
    """
    props = propiedades_isa(altitud)
    Re = (velocidad * longitud) / props['nu']
    return Re, props


def interpretar_reynolds(Re):
    """
    Interpreta el regimen de flujo segun el Reynolds.
    """
    if Re < 5e5:
        return "Flujo laminar dominante"
    elif Re < 1e6:
        return "Zona de transicion laminar-turbulento"
    elif Re < 1e7:
        return "Flujo turbulento (tipico aviacion general)"
    else:
        return "Flujo completamente turbulento (aviacion comercial)"


# === EJEMPLO DE USO ===
if __name__ == "__main__":
    # Datos del problema
    V = 50      # m/s
    L = 1.2     # m
    h = 3000    # m

    # Calcular
    Re, props = calcular_reynolds(V, L, h)

    # Mostrar resultados
    print("=" * 50)
    print("CALCULO DE NUMERO DE REYNOLDS")
    print("=" * 50)
    print(f"\nDatos de entrada:")
    print(f"  Velocidad: {V} m/s")
    print(f"  Cuerda: {L} m")
    print(f"  Altitud: {h} m")

    print(f"\nPropiedades ISA a {h}m:")
    print(f"  Temperatura: {props['T']:.2f} K")
    print(f"  Presion: {props['P']:.0f} Pa")
    print(f"  Densidad: {props['rho']:.4f} kg/m³")
    print(f"  Visc. cinematica: {props['nu']:.3e} m²/s")

    print(f"\nResultado:")
    print(f"  Re = {Re:.2e}")
    print(f"  Re = {Re/1e6:.2f} millones")

    print(f"\nInterpretacion:")
    print(f"  {interpretar_reynolds(Re)}")
```

### 5. Interpretacion del Resultado

Con **Re ≈ 3.22 × 10⁶**:

| Aspecto | Interpretacion |
|---------|----------------|
| **Regimen de flujo** | Turbulento |
| **Capa limite** | Mayormente turbulenta sobre el ala |
| **Eficiencia** | Mayor arrastre por friccion que flujo laminar |
| **Estabilidad** | Menos susceptible a separacion de flujo |
| **Tipico de** | Aviacion general, UAVs grandes, planeadores |

**Comparacion con otros casos:**
- Insecto volando: Re ~ 10³ (laminar)
- Aeromodelismo: Re ~ 10⁴-10⁵ (transicion)
- Avion comercial: Re ~ 10⁷-10⁸ (muy turbulento)

---

## Verificacion

Ejecutar el codigo Python debe dar:
```
Re = 3.22e+06
Re = 3.22 millones
```

---

*Ejercicio 1 - Dia 3*
