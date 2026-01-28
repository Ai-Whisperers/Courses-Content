# Cargas Aeronauticas

## 1. Introduccion a las Cargas de Vuelo

### Por que Importan las Cargas?

Las estructuras aeronauticas deben resistir multiples tipos de cargas durante su operacion:

```
CARGAS EN VUELO
================

        Sustentacion (L)
            ↑
            |
    ←-------●-------→  Arrastre (D)
            |
            ↓
         Peso (W)

En maniobras: L puede ser 4-6 veces W
```

### Tipos de Cargas

| Tipo | Origen | Ejemplo |
|------|--------|---------|
| **Aerodinamicas** | Presion del aire | Sustentacion, arrastre |
| **Inerciales** | Masas en aceleracion | Maniobras, aterrizaje |
| **Propulsion** | Motor y helice | Torque, empuje |
| **Payload** | Carga util | Camara, sensores |
| **Termicas** | Cambios de temperatura | Expansion/contraccion |

---

## 2. Factor de Carga (n)

### Definicion

El factor de carga relaciona la sustentacion con el peso:

```
n = L / W

Donde:
- n = Factor de carga (adimensional)
- L = Sustentacion (N)
- W = Peso (N)

En vuelo recto y nivelado: n = 1.0
En viraje a 60 grados: n = 2.0
En pull-up de 4g: n = 4.0
```

### Interpretacion Fisica

```
n = 1    Vuelo normal (1g)
n = 2    Viraje cerrado, rafaga
n = 4    Maniobra brusca
n = 6    Limite estructural tipico

IMPORTANTE: n negativo = vuelo invertido
n = -1   Invertido estable
n = -2   Maniobra invertida
```

### Calculo del Factor de Carga en Viraje

```
n = 1 / cos(phi)

Ejemplo: Viraje a 60 grados de inclinacion
n = 1 / cos(60) = 1 / 0.5 = 2.0

| Angulo (phi) | Factor n | G sentidos |
|--------------|----------|------------|
| 0 grados | 1.0 | Normal |
| 30 grados | 1.15 | Leve |
| 45 grados | 1.41 | Moderado |
| 60 grados | 2.0 | Fuerte |
| 75 grados | 3.86 | Muy fuerte |
```

---

## 3. Diagrama V-n (Envolvente de Vuelo)

### Concepto

El diagrama V-n muestra los limites operacionales de la aeronave:

```
Factor de Carga (n)
       ^
       |
  n_max|..........*---------*
       |         /           \
       |        /             \
       |       /               \
   1.0 |------*-----------------*-------> Velocidad
       |       \               /
       |        \             /
  n_min|..........*---------*
       |
       |______|_______|_______|_______>
              Vs     Va      Vd      V

Vs = Velocidad de stall
Va = Velocidad de maniobra
Vd = Velocidad de diseno (dive)
```

### Regiones del Diagrama

| Region | Descripcion | Limite |
|--------|-------------|--------|
| **Curva de stall** | L_max a cada velocidad | CL_max |
| **Linea n_max** | Factor de carga positivo maximo | Estructural |
| **Linea n_min** | Factor de carga negativo maximo | Estructural |
| **Velocidad maxima** | No exceder | Vd |

### Valores Tipicos por Categoria

| Categoria | n_max | n_min | Segun |
|-----------|-------|-------|-------|
| **Normal** | +3.8 | -1.52 | FAR 23 |
| **Utility** | +4.4 | -1.76 | FAR 23 |
| **Acrobatic** | +6.0 | -3.0 | FAR 23 |
| **UAV (<25 kg)** | +4.0 | -2.0 | Tipico |
| **UAV (nuestro)** | +5.0 | -2.0 | Conservador |

### Calculo de Va (Velocidad de Maniobra)

```
Va = Vs * sqrt(n_max)

Ejemplo: Vs = 10 m/s, n_max = 4
Va = 10 * sqrt(4) = 10 * 2 = 20 m/s

Significado: A velocidades menores que Va,
el ala entrara en stall antes de alcanzar n_max
```

---

## 4. Cargas Limite vs Carga Ultima

### Definiciones

```
CARGA LIMITE
============
Maxima carga esperada en servicio normal
La estructura NO debe deformarse permanentemente

CARGA ULTIMA
============
Carga Ultima = Carga Limite × 1.5
La estructura NO debe fallar catastróficamente
(puede deformarse, pero no romperse)

Factor de seguridad = 1.5 (estandar aeronautico)
```

### Ejemplo Numerico

```
UAV: W = 4.5 kg = 44.1 N

Factor de carga limite: n = 4
Sustentacion limite: L_lim = 4 × 44.1 = 176.4 N

Factor de seguridad: FS = 1.5
Sustentacion ultima: L_ult = 176.4 × 1.5 = 264.6 N

La estructura debe:
- Soportar 176.4 N sin deformacion permanente
- Soportar 264.6 N sin fallar
```

### Factores de Seguridad Adicionales

| Factor | Valor | Aplicacion |
|--------|-------|------------|
| **Incertidumbre material** | 1.1-1.25 | Propiedades desconocidas |
| **Proceso de manufactura** | 1.2-1.5 | Impresion 3D, composites |
| **Ambiente** | 1.1-1.3 | Humedad, temperatura |
| **Fatiga** | 2.0-4.0 | Cargas ciclicas |

---

## 5. Distribucion de Sustentacion en el Ala

### Distribucion Eliptica (Ideal)

```
Sustentacion por unidad de envergadura:

        L'(y)
          ^
          |      *****
          |   ***     ***
          |  *           *
          | *             *
          |*               *
     -----+--------------------> y
         -b/2     0      +b/2
         
L'(y) = L'_0 * sqrt(1 - (2y/b)^2)

Donde:
- L'_0 = Sustentacion maxima en la raiz
- b = Envergadura
- y = Posicion a lo largo del ala
```

### Distribucion Real vs Eliptica

```
Real (ala rectangular):
- Mayor carga cerca de la raiz
- Menor eficiencia inducida
- Mas facil de construir

Eliptica:
- Minimo arrastre inducido
- Dificil de construir
- Spitfire usaba ala eliptica

Trapezoidal (compromiso):
- Aproxima distribucion eliptica
- Facil de construir
- Comun en UAV
```

### Calculo de Carga en la Raiz

```
Para distribucion eliptica, la sustentacion total:
L_total = (pi/4) × L'_0 × b

Momento flector en la raiz:
M_root = 0.424 × L_total × (b/2)

Ejemplo: UAV con L = 176.4 N, b = 2.0 m
M_root = 0.424 × 176.4 × 1.0 = 74.8 N×m
```

---

## 6. Cargas de Rafaga

### Concepto

Las rafagas de viento cambian el angulo de ataque instantaneamente:

```
Antes de rafaga:      Durante rafaga:
                      
     V_crucero             V_crucero
    ------>               ------>
                              ↑
                          w (rafaga)

Angulo efectivo = atan(w/V)
Delta_CL = CL_alpha × Delta_alpha
```

### Formula de Carga de Rafaga

```
Delta_n = (rho × V × w × CL_alpha × S) / (2 × W)

Simplificado (formula de Pratt):
Delta_n = (K_g × U_de × V × CL_alpha) / (498 × W/S)

Donde:
- K_g = Factor de alivio de rafaga (~0.88 para UAV)
- U_de = Velocidad de rafaga de diseno (m/s)
- V = Velocidad equivalente (m/s)
- CL_alpha = Pendiente de sustentacion (1/rad)
- W/S = Carga alar (N/m^2)
```

### Velocidades de Rafaga Tipicas

| Altitud | Rafaga intensa | Rafaga moderada |
|---------|----------------|-----------------|
| Nivel del mar | 20 m/s | 15 m/s |
| 3000 m | 15 m/s | 10 m/s |
| 6000 m | 10 m/s | 7.5 m/s |

### Ejemplo: Efecto de Rafaga en Nuestro UAV

```
Datos:
- W = 44.1 N
- S = 0.45 m^2
- V = 15 m/s (crucero)
- CL_alpha = 5.0 /rad
- rho = 1.225 kg/m^3
- w = 10 m/s (rafaga moderada)

Delta_n = (1.225 × 15 × 10 × 5.0 × 0.45) / (2 × 44.1)
Delta_n = 413.4 / 88.2
Delta_n = 4.7

n_total = 1 + Delta_n = 5.7

CONCLUSION: Una rafaga de 10 m/s puede casi duplicar
el factor de carga en un UAV ligero.
```

---

## 7. Cargas de Aterrizaje

### Tipos de Aterrizaje

| Tipo | Factor de carga | Descripcion |
|------|-----------------|-------------|
| Normal | 2-3 g | Suave, controlado |
| Firme | 3-4 g | Brusco pero aceptable |
| Duro | 4-6 g | Emergencia, dano posible |

### Distribucion de Cargas en Tren

```
Para tren triciclo (nuestro UAV):

        CG
         ●
        /|\
       / | \
      /  |  \
     /   |   \
    *----*----*
  Nose  Main  Main
  (10%) (45%) (45%)

Carga por rueda principal = 0.45 × W × n_landing
```

### Ejemplo

```
W = 4.5 kg = 44.1 N
n_landing = 3 (firme)

Carga total aterrizaje = 44.1 × 3 = 132.3 N
Carga por rueda principal = 0.45 × 132.3 = 59.5 N
Carga en rueda de nariz = 0.10 × 132.3 = 13.2 N
```

---

## 8. Cargas en el Fuselaje

### Diagrama de Cuerpo Libre

```
     Empuje (T)
    <----●
         |
         | Sustentacion ala
         |    ↑
         |====●====
         |    |
         |    | Peso estructura
         |    ↓
         |
    Colas ●----> Fuerza de cola
         |
         ↓
      Peso cola
```

### Momentos Criticos

| Seccion | Carga dominante | Tipo de esfuerzo |
|---------|-----------------|------------------|
| Nariz | Motor, impacto | Compresion |
| Ala-fuselaje | Momento flector | Flexion |
| Central | Torsion | Cortante |
| Cola | Cargas de cola | Flexion + Cortante |

---

## 9. Uso de IA para Calculos de Cargas

### Prompt para Calcular Envolvente V-n

```
Tengo un UAV con estas caracteristicas:
- Peso: 4.5 kg
- Superficie alar: 0.45 m^2
- CL_max: 1.5
- Densidad: 1.225 kg/m^3
- n_max: +4.0
- n_min: -2.0

Calcula:
1. Velocidad de stall (Vs)
2. Velocidad de maniobra (Va)
3. Ecuacion de la curva de stall
4. Genera los puntos para graficar el diagrama V-n
```

### Prompt para Verificar Cargas

```
Verifica si mi calculo de cargas es correcto:

Datos:
- Sustentacion maxima: 180 N
- Envergadura: 2.0 m
- Distribucion: eliptica

Mi calculo:
- Momento en raiz: 76 N*m

Es correcto? Si no, muestra el calculo paso a paso.
```

### Prompt para Analisis de Rafaga

```
Para mi UAV volando a 15 m/s,
calcula el factor de carga adicional
si encuentra una rafaga vertical de 12 m/s.

Datos del UAV:
- Peso: 4.5 kg
- Superficie: 0.45 m^2
- CL_alpha: 5.0 /rad (aproximado)
- Carga alar: 98 N/m^2

Necesito saber si debo aumentar mi factor de carga de diseno.
```

---

## 10. Resumen de Formulas

| Calculo | Formula |
|---------|---------|
| Factor de carga | n = L / W |
| Factor en viraje | n = 1 / cos(phi) |
| Velocidad de maniobra | Va = Vs × sqrt(n_max) |
| Carga ultima | P_ult = P_lim × 1.5 |
| Momento en raiz (eliptica) | M = 0.424 × L × (b/2) |
| Delta_n rafaga | (rho×V×w×CLa×S)/(2×W) |

---

## 11. Valores de Referencia para Nuestro UAV

| Parametro | Valor | Unidad |
|-----------|-------|--------|
| Peso (MTOW) | 4.5 | kg |
| Peso en Newtons | 44.1 | N |
| n_max (diseno) | +5.0 | - |
| n_min (diseno) | -2.0 | - |
| FS material | 1.5 | - |
| Carga limite ala | 220.5 | N |
| Carga ultima ala | 330.8 | N |
| V_crucero | 15 | m/s |
| V_stall estimada | 10 | m/s |

---

*Siguiente: 02-materiales.md*
