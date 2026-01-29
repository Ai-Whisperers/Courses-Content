# Fundamentos de Aerodinamica

## 1. El Aire como Fluido

### Propiedades del Aire

| Propiedad | Simbolo | Valor a nivel del mar (ISA) |
|-----------|---------|----------------------------|
| Densidad | rho | 1.225 kg/m^3 |
| Temperatura | T | 288.15 K (15 C) |
| Presion | P | 101325 Pa |
| Viscosidad dinamica | mu | 1.789e-5 kg/(m*s) |
| Viscosidad cinematica | nu | 1.46e-5 m^2/s |

### Variacion con Altitud

En Paraguay (promedio 200-400m sobre nivel del mar):
- Densidad: ~1.20 kg/m^3
- Temperatura: Variable (20-35 C tipico)

**Importante**: En verano paraguayo (35 C), la densidad es ~5% menor que ISA standard.

---

## 2. Ecuacion de Bernoulli

### Concepto

En un flujo sin perdidas, la energia total se conserva:

```
P + (1/2)*rho*V^2 + rho*g*h = constante

Para flujo horizontal (h = cte):
P + (1/2)*rho*V^2 = P_total = constante
```

### Aplicacion a Perfiles

```
        V_arriba > V_infinito
        P_arriba < P_infinito
        ________________________
       /                        \
      /           ALA            \
     /                            \
    --------------------------------
        V_abajo ~ V_infinito
        P_abajo ~ P_infinito

Diferencia de presion -> SUSTENTACION
```

### Presion Dinamica

```
q = (1/2) * rho * V^2

Ejemplo: V = 15 m/s, rho = 1.225 kg/m^3
q = 0.5 * 1.225 * 15^2 = 137.8 Pa
```

---

## 3. Coeficientes Aerodinamicos

### Coeficiente de Sustentacion (CL)

```
CL = L / (q * S)

Donde:
- L = Fuerza de sustentacion (N)
- q = Presion dinamica (Pa)
- S = Superficie de referencia (m^2)
```

### Coeficiente de Arrastre (CD)

```
CD = D / (q * S)

CD_total = CD_0 + CD_i

CD_0 = Arrastre parasito (friccion, presion)
CD_i = Arrastre inducido (por sustentacion)
```

### Coeficiente de Momento (CM)

```
CM = M / (q * S * c)

Donde c = cuerda de referencia (MAC)
```

---

## 4. Numero de Reynolds

### Definicion

El numero de Reynolds caracteriza el regimen del flujo:

```
Re = (rho * V * L) / mu = (V * L) / nu

Donde:
- L = Longitud caracteristica (cuerda para alas)
- nu = Viscosidad cinematica
```

### Interpretacion

| Re | Regimen | Caracteristicas |
|----|---------|-----------------|
| < 2000 | Laminar | Flujo ordenado, baja friccion |
| 2000-500,000 | Transicional | Mezcla, sensible a perturbaciones |
| > 500,000 | Turbulento | Flujo caotico, mayor friccion |

### Calculo para UAV

```python
# Ejemplo: UAV a 15 m/s, cuerda 0.3 m
V = 15      # m/s
c = 0.3     # m
nu = 1.46e-5  # m^2/s (nivel del mar, 15C)

Re = V * c / nu
Re = 15 * 0.3 / 1.46e-5
Re = 308,219  # Regimen transicional
```

**Importante**: Los datos de perfiles NACA son validos para ciertos rangos de Re. Usar datos fuera de ese rango es peligroso.

---

## 5. Capa Limite

### Concepto

Zona cercana a la superficie donde el fluido pasa de V=0 (en superficie) a V=V_infinito:

```
Flujo libre V_inf
    |||||||||||||||||||||||||
    |||||||||||||||||||||||||
    |||||||||||||||||||  <- Borde de capa limite
    ||||||||||||||
    |||||||||
    |||||
    |||
    ||  <- Perfil de velocidades
    |
____________________________________  <- Superficie (V=0)
```

### Capa Limite Laminar vs Turbulenta

| Caracteristica | Laminar | Turbulenta |
|----------------|---------|------------|
| Friccion | Menor | Mayor |
| Transferencia energia | Menor | Mayor |
| Resistencia a separacion | Menor | Mayor |
| Espesor | Menor | Mayor |

### Transicion

El punto de transicion depende de:
- Numero de Reynolds
- Rugosidad superficial
- Gradiente de presion
- Perturbaciones externas

---

## 6. Polar del Perfil

### Curvas Caracteristicas

```
CL                           CL
|     *                      |         *  CLmax
|    *  *                    |        * *
|   *    *                   |       *   *
|  *      *                  |      *     *
| *        *                 |     *       * <- Stall
|*          *                |    *
|            *               |   *
+----------------> alpha     +----------------> CD

   CL vs Alpha                  Polar (CL vs CD)
```

### Parametros Clave

| Parametro | Simbolo | Significado |
|-----------|---------|-------------|
| CL max | CL_max | Sustentacion maxima antes de stall |
| Alpha stall | alpha_s | Angulo de ataque en stall |
| CL design | CL_d | CL de operacion optimo |
| CD min | CD_min | Arrastre minimo |
| (L/D) max | - | Eficiencia maxima |

---

## 7. Arrastre Inducido

### Origen

Al generar sustentacion, el ala crea vortices en las puntas que "arrastran" hacia atras:

```
    <- Vortice punta izquierda
   /
  /
 /________________________\
 \                        /
  \                      /
   \
    <- Vortice punta derecha

Los vortices inducen velocidad "downwash"
que inclina el vector de sustentacion hacia atras
```

### Formula

```
CD_i = CL^2 / (pi * AR * e)

Donde:
- AR = Aspect Ratio = b^2 / S
- e = Factor de eficiencia de Oswald (0.7-0.9)
```

### Implicacion

- Mayor AR -> Menor arrastre inducido
- A CL alto (vuelo lento) -> Arrastre inducido domina
- A CL bajo (vuelo rapido) -> Arrastre parasito domina

---

## 8. Perfiles NACA

### Serie de 4 Digitos

```
NACA MPXX

M = Curvatura maxima (% cuerda)
P = Posicion de curvatura maxima (decimas de cuerda)
XX = Espesor maximo (% cuerda)

Ejemplo: NACA 2412
- 2% curvatura maxima
- A 40% de la cuerda desde el borde de ataque
- 12% de espesor
```

### Serie de 5 Digitos

```
NACA LPSTT

L = CL de diseno * 20 / 3
P = Posicion de curvatura maxima
S = 0 (curvatura normal) o 1 (curvatura reflexada)
TT = Espesor

Ejemplo: NACA 23012
- CL_diseno = 0.3
- Curvatura a 15% de cuerda
- 12% espesor
```

### Perfiles Comunes para UAV

| Perfil | Uso | CL_max | L/D_max |
|--------|-----|--------|---------|
| NACA 0012 | Simetrico, empenajes | 1.5 | 80 |
| NACA 2412 | Uso general | 1.6 | 90 |
| NACA 4412 | Alta sustentacion | 1.7 | 85 |
| NACA 23012 | Buen L/D | 1.6 | 100 |
| Eppler 387 | Bajo Re | 1.3 | 70 |

---

## 9. Uso de IA para Aerodinamica

### Interpretar Datos

Prompt ejemplo:
```
Tengo estos datos de un perfil NACA 4412 a Re=300,000:

Alpha(deg): -4, -2, 0, 2, 4, 6, 8, 10, 12
CL: -0.2, 0.0, 0.2, 0.45, 0.65, 0.85, 1.05, 1.20, 1.10
CD: 0.012, 0.009, 0.008, 0.009, 0.012, 0.016, 0.022, 0.035, 0.065

Analiza:
1. Angulo de stall
2. CL max
3. Angulo de L/D maximo
4. CL de operacion recomendado
```

### Comparar Perfiles

Prompt ejemplo:
```
Para un UAV con Re=250,000 y CL de diseno=0.6,
compara NACA 2412 vs NACA 4415 vs Eppler 387.

Crea una tabla comparativa y recomienda el mejor.
```

---

## Resumen

| Concepto | Formula / Valor Clave |
|----------|----------------------|
| Presion dinamica | q = 0.5 * rho * V^2 |
| Sustentacion | L = q * S * CL |
| Reynolds | Re = V * c / nu |
| Arrastre inducido | CDi = CL^2 / (pi * AR * e) |
| Eficiencia | L/D = CL / CD |

---

*Siguiente: 02-xflr5-tutorial.md*
