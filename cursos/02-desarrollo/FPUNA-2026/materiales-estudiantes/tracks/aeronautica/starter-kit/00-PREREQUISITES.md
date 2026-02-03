# Prerrequisitos - Antes de Usar IA para Ingeniería Aeronáutica

## Conocimientos FUNDAMENTALES antes de diseñar aeronaves

---

## ⚠️ Advertencia Importante

La ingeniería aeronáutica es una disciplina donde los errores pueden ser fatales. Este curso usa IA como herramienta de aprendizaje y cálculo inicial, pero:

- **NO reemplaza formación profesional**
- **NO permite diseñar aeronaves para volar sin certificación**
- **NO garantiza seguridad de ningún diseño**

---

## Conocimientos de Física Requeridos

### 1. Mecánica de Fluidos Básica

Debes entender:

| Concepto | Qué significa |
|----------|---------------|
| Presión | Fuerza por unidad de área |
| Densidad | Masa por unidad de volumen |
| Viscosidad | Resistencia del fluido al flujo |
| Flujo laminar vs turbulento | Tipos de movimiento del aire |
| Capa límite | Zona cerca de la superficie donde hay fricción |
| Número de Reynolds | Relación fuerzas inerciales/viscosas |

### 2. Ecuación de Bernoulli

```
P₁ + ½ρV₁² + ρgh₁ = P₂ + ½ρV₂² + ρgh₂

Para flujo horizontal (h₁ = h₂):
P + ½ρV² = constante

Esto explica por qué las alas generan sustentación.
```

### 3. Ecuaciones de Vuelo Básicas

**Sustentación:**
```
L = ½ρV²SCL

Donde:
L = Sustentación (N)
ρ = Densidad del aire (kg/m³)
V = Velocidad (m/s)
S = Superficie alar (m²)
CL = Coeficiente de sustentación
```

**Arrastre:**
```
D = ½ρV²SCD

CD = CD0 + CDi = CD0 + CL²/(πARe)
```

**Eficiencia aerodinámica:**
```
L/D = CL/CD
```

---

## Conocimientos de Matemáticas Requeridos

### Nivel Mínimo

- [ ] Álgebra y trigonometría
- [ ] Cálculo diferencial (derivadas)
- [ ] Cálculo integral (áreas bajo curvas)
- [ ] Vectores en 3D
- [ ] Resolución de ecuaciones

### Para Cálculos Avanzados

- [ ] Ecuaciones diferenciales (estabilidad)
- [ ] Álgebra lineal (matrices para sistemas de control)
- [ ] Métodos numéricos (integración, interpolación)

---

## Conocimientos Aeronáuticos Fundamentales

### 1. Anatomía de una Aeronave

```
                    Empenaje vertical
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    │              ══════╪══════              │
    │              Fuselaje                   │ Empenaje horizontal
    │                    │                    │
    ├────────────────────┤                    │
    │                                         │
   ALA IZQUIERDA                      ALA DERECHA
    │                                         │
    │  Alerones   Flaps                       │
    │                                         │
    └────────────────────────────────────────-┘
           │
      Tren de aterrizaje
```

### 2. Ejes y Movimientos

| Eje | Movimiento | Control |
|-----|------------|---------|
| Longitudinal (X) | Alabeo (roll) | Alerones |
| Lateral (Y) | Cabeceo (pitch) | Timón de profundidad |
| Vertical (Z) | Guiñada (yaw) | Timón de dirección |

### 3. Perfiles Aerodinámicos

```
Terminología del perfil:

    ← Borde de ataque                    Borde de fuga →
         ╭─────────────────────────────────────────╮
         │                                         │
         │         Extradós (arriba)               │
         │                                         │
    ─────┴─────────────────────────────────────────┴─────
                     Cuerda (c)
         │                                         │
         │         Intradós (abajo)                │
         │                                         │
         ╰─────────────────────────────────────────╯

Parámetros clave:
- Cuerda: distancia borde ataque a borde fuga
- Espesor: distancia máxima entre extradós e intradós
- Curvatura: curvatura media del perfil
```

### 4. Series NACA

```
NACA de 4 dígitos (ej: NACA 2412):
- 2 = máxima curvatura (2% de la cuerda)
- 4 = posición de máxima curvatura (40% desde borde de ataque)
- 12 = espesor máximo (12% de la cuerda)

NACA 0012 = perfil simétrico de 12% espesor
```

---

## Conocimientos de Performance

### 1. Velocidades Características

| Velocidad | Símbolo | Significado |
|-----------|---------|-------------|
| Stall | Vs | Mínima velocidad de vuelo |
| Crucero | Vc | Velocidad eficiente de viaje |
| Máxima | Vmax | Límite por potencia |
| Never exceed | VNE | Límite estructural |
| Maniobra | VA | Máxima para maniobras bruscas |

### 2. Performance de Ascenso

```
Tasa de ascenso = (Potencia disponible - Potencia requerida) / Peso

RC = (Pd - Pr) / W
```

### 3. Alcance y Autonomía

```
Alcance máximo: volar a (L/D)max
Autonomía máxima: volar a velocidad de potencia mínima
```

---

## Conocimientos de Estabilidad

### Estabilidad Estática

```
Para que la aeronave sea longitudinalmente estable:

1. El CG debe estar ADELANTE del punto neutro
2. Margen estático = (Xnp - Xcg) / MAC > 0
3. Típicamente: margen estático de 10-15% MAC

Si perturbas el cabeceo:
- Estable: vuelve solo a equilibrio
- Inestable: se aleja del equilibrio
- Neutro: se queda donde lo dejas
```

### Estabilidad Dinámica

Después de una perturbación:
- **Estable:** oscilaciones que se amortiguan
- **Inestable:** oscilaciones que crecen
- **Neutral:** oscilaciones constantes

---

## Herramientas que Debes Conocer

### Software

| Herramienta | Uso | Nivel |
|-------------|-----|-------|
| Python + NumPy | Cálculos y gráficos | Básico |
| XFLR5 | Análisis de perfiles y aviones | Intermedio |
| OpenVSP | Modelado paramétrico 3D | Intermedio |
| AVL | Análisis de estabilidad | Avanzado |
| ANSYS/CFD | Simulación de fluidos | Avanzado |

### Matemáticas con Python

```python
# Librerías esenciales
import numpy as np
import matplotlib.pyplot as plt
from scipy import integrate, optimize

# Ejemplo: calcular sustentación
rho = 1.225  # kg/m³
V = 50       # m/s
S = 15       # m²
CL = 0.5

L = 0.5 * rho * V**2 * S * CL
print(f"Sustentación: {L:.0f} N = {L/9.81:.0f} kg")
```

---

## Auto-Evaluación

### Test Teórico (sin ayuda)

1. ¿Por qué un perfil asimétrico genera sustentación incluso a 0° de ángulo de ataque?

2. Si duplico la velocidad, ¿cuánto aumenta la sustentación? ¿Y el arrastre?

3. ¿Por qué un avión con más aspect ratio tiene mejor eficiencia?

4. ¿Qué pasa si el CG está detrás del punto neutro?

5. ¿Por qué los aviones tienen diedro positivo en las alas?

### Test Práctico

1. Dado un NACA 2412 a Re=500,000, encuentra CL_max en datos publicados.

2. Calcula la velocidad de stall para un avión de 800 kg, S=12 m², CL_max=1.5, al nivel del mar.

3. Dibuja un diagrama de fuerzas de un avión en vuelo recto y nivelado.

4. Calcula el CD de un ala con CD0=0.01, AR=8, e=0.8, volando a CL=0.6.

---

## Recursos de Aprendizaje

### Libros Esenciales

1. **"Introduction to Flight"** - John D. Anderson
   - Mejor introducción general

2. **"Aircraft Design: A Conceptual Approach"** - Daniel P. Raymer
   - Referencia para diseño

3. **"Fundamentals of Aerodynamics"** - John D. Anderson
   - Aerodinámica profunda

4. **"Airplane Design"** - Jan Roskam (8 volúmenes)
   - Referencia profesional completa

### Recursos Online

- **MIT OpenCourseWare**: Cursos de aerodinámica gratuitos
- **NASA Technical Reports Server**: Papers y datos
- **UIUC Airfoil Database**: Datos de perfiles
- **AVL/XFLR5 tutorials**: En YouTube

### Tiempo Estimado

| Tu nivel | Tiempo para prerrequisitos |
|----------|---------------------------|
| Sin base de física/mecánica | 6-12 meses de estudio |
| Ingeniería mecánica básica | 2-3 meses de estudio aeronáutico |
| Algo de experiencia aero | 2-4 semanas de refuerzo |

---

*00-PREREQUISITES.md - Track 03 Aeronáutica - FPUNA 2026*
