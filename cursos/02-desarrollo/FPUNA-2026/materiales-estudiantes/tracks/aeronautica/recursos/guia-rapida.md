# ✈️ Guía Rápida - Ingeniería Aeronáutica

## FPUNA Verano 2026

---

## Nomenclatura de Aeronaves

### Ejes de Referencia
```
        Z (arriba)
        ↑
        |    Y (lateral)
        |   /
        |  /
        | /
        +--------→ X (adelante)
       /
      /
     (nariz)
```

### Movimientos
| Eje | Movimiento | Control |
|-----|------------|---------|
| X (longitudinal) | Roll (alabeo) | Alerones |
| Y (lateral) | Pitch (cabeceo) | Elevador |
| Z (vertical) | Yaw (guiñada) | Timón |

---

## Fórmulas Aerodinámicas Básicas

### Sustentación
```
L = ½ × ρ × V² × S × CL

L  = Sustentación [N]
ρ  = Densidad del aire [kg/m³]
V  = Velocidad [m/s]
S  = Superficie alar [m²]
CL = Coeficiente de sustentación
```

### Resistencia (Drag)
```
D = ½ × ρ × V² × S × CD

D  = Resistencia [N]
CD = Coeficiente de resistencia
```

### Eficiencia Aerodinámica
```
E = L/D = CL/CD

Valores típicos:
- Planeador: 40-60
- Avión comercial: 15-20
- Caza: 8-12
- Helicóptero: 4-6
```

### Número de Reynolds
```
Re = (ρ × V × L) / μ

Re = Número de Reynolds
L  = Longitud característica [m]
μ  = Viscosidad dinámica [Pa·s]
```

### Número de Mach
```
M = V / a

a = √(γ × R × T)

a ≈ 340 m/s al nivel del mar
```

---

## Propiedades del Aire (ISA)

### Nivel del Mar (h = 0)
| Propiedad | Valor |
|-----------|-------|
| Temperatura | 288.15 K (15°C) |
| Presión | 101,325 Pa |
| Densidad | 1.225 kg/m³ |
| Velocidad del sonido | 340.3 m/s |

### Variación con Altitud (Tropósfera)
```
T = T₀ - 0.0065 × h
P = P₀ × (T/T₀)^5.256
ρ = ρ₀ × (T/T₀)^4.256

h en metros, hasta 11,000 m
```

---

## Perfiles Aerodinámicos (Airfoils)

### Nomenclatura NACA 4-dígitos
```
NACA MPXX

M = Máxima curvatura (% cuerda)
P = Posición de máx. curvatura (×10% cuerda)
XX = Espesor máximo (% cuerda)

Ejemplo: NACA 2412
- 2% curvatura máxima
- A 40% de la cuerda
- 12% de espesor
```

### Perfiles Comunes
| Perfil | Aplicación |
|--------|------------|
| NACA 0012 | Simétrico, cola |
| NACA 2412 | Aviación general |
| NACA 4415 | Alta sustentación |
| NACA 6-series | Alta velocidad |
| Clark Y | Aeromodelismo |

---

## Parámetros de Ala

### Aspect Ratio (Relación de Aspecto)
```
AR = b² / S = b / c

b = Envergadura
S = Superficie alar
c = Cuerda media
```

| AR | Aplicación |
|----|------------|
| 4-6 | Cazas, acrobáticos |
| 7-10 | Aviación general |
| 12-20 | Comerciales |
| 20-40 | Planeadores |

### Ángulos del Ala
- **Diedro:** Ángulo respecto al horizontal (estabilidad lateral)
- **Flecha:** Ángulo de barrido (alta velocidad)
- **Incidencia:** Ángulo respecto al fuselaje

---

## Rendimiento de Vuelo

### Velocidades Críticas
| Velocidad | Significado |
|-----------|-------------|
| VS0 | Stall, configuración aterrizaje |
| VS1 | Stall, configuración limpia |
| VNE | Never exceed |
| VNO | Máxima estructural normal |
| VA | Maniobra |
| VFE | Máxima con flaps |

### Alcance y Autonomía
```
Alcance = E × (L/D) × ln(W₀/W₁)
Autonomía = (1/c) × (L/D) × ln(W₀/W₁)

E = Eficiencia propulsiva
c = Consumo específico
W₀ = Peso inicial
W₁ = Peso final
```

---

## Materiales Aeronáuticos

### Aleaciones de Aluminio
| Serie | Aleación | Aplicación |
|-------|----------|------------|
| 2xxx | 2024-T3 | Fuselaje, alas |
| 6xxx | 6061-T6 | Estructuras secundarias |
| 7xxx | 7075-T6 | Alta resistencia |

### Composites
| Material | σ (MPa) | E (GPa) | Densidad |
|----------|---------|---------|----------|
| CFRP | 1500 | 150 | 1.6 |
| GFRP | 500 | 25 | 2.0 |
| Kevlar | 3000 | 125 | 1.4 |
| Aluminio 2024 | 470 | 73 | 2.8 |

---

## Unidades de Conversión

### Velocidad
```
1 knot = 1.852 km/h = 0.514 m/s
1 Mach ≈ 1225 km/h (nivel del mar)
```

### Altitud
```
1 ft = 0.3048 m
1 FL (Flight Level) = 100 ft
```

### Presión
```
1 atm = 101.325 kPa = 14.7 psi
1 inHg = 3.386 kPa
```

### Fuerza/Peso
```
1 lbf = 4.448 N
1 kgf = 9.81 N
```

---

## Software CAD/CAE

### Diseño
- **SolidWorks** - Modelado 3D general
- **CATIA** - Industria aeronáutica
- **Fusion 360** - Gratuito educacional
- **FreeCAD** - Open source

### Simulación CFD
- **ANSYS Fluent** - Profesional
- **OpenFOAM** - Open source
- **SimScale** - Cloud, gratuito limitado
- **XFLR5** - Perfiles y alas (gratuito)

### Estructuras FEA
- **ANSYS Mechanical**
- **Abaqus**
- **CalculiX** (open source)

---

## Checklist de Diseño Conceptual

1. [ ] Definir misión y requerimientos
2. [ ] Estimar peso inicial (estadísticas)
3. [ ] Seleccionar configuración general
4. [ ] Dimensionar alas (AR, superficie)
5. [ ] Seleccionar perfil aerodinámico
6. [ ] Dimensionar empenaje
7. [ ] Estimar polar de arrastre
8. [ ] Calcular rendimiento
9. [ ] Verificar estabilidad
10. [ ] Iterar según resultados

---

*Guía Rápida - Track 03 - FPUNA 2026*
