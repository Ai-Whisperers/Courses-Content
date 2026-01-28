# Modulo 02: Aerodinamica y CFD

## Duracion: 4 horas

---

## Descripcion

Aprende a analizar el comportamiento aerodinamico de perfiles y alas usando herramientas de simulacion (XFLR5, OpenFOAM conceptual) y asistencia de IA para interpretar resultados y optimizar disenos.

---

## Objetivos de Aprendizaje

Al finalizar este modulo, podras:

1. **Analizar** perfiles aerodinamicos en XFLR5
2. **Interpretar** polares y curvas de rendimiento
3. **Calcular** numeros de Reynolds y regimenes de flujo
4. **Optimizar** perfiles para condiciones especificas con IA
5. **Preparar** geometrias para CFD avanzado

---

## Contenido

### Parte 1: Fundamentos de Aerodinamica (1 hora)

| Tema | Descripcion |
|------|-------------|
| Ecuacion de Bernoulli | Presion vs velocidad |
| Sustentacion y arrastre | L = 1/2 * rho * V^2 * S * CL |
| Numero de Reynolds | Re = rho * V * c / mu |
| Capa limite | Laminar vs turbulento |
| Separacion de flujo | Stall aerodinamico |

### Parte 2: XFLR5 - Analisis de Perfiles (1.5 horas)

| Tema | Descripcion |
|------|-------------|
| Interfaz de XFLR5 | Paneles y herramientas |
| Importar perfiles | NACA, Selig, custom |
| Analisis tipo 1 | Polar a Re fijo |
| Comparacion de perfiles | Overlay de polares |
| Exportar resultados | CSV, graficos |

### Parte 3: Analisis de Alas 3D (1 hora)

| Tema | Descripcion |
|------|-------------|
| Teoria de linea sustentadora | Metodo VLM |
| Definir geometria de ala | Paneles, twist, diedro |
| Analisis de estabilidad | Momentos y derivadas |
| Distribucion de sustentacion | Eliptica vs real |

### Parte 4: IA para Interpretacion (30 min)

| Tema | Descripcion |
|------|-------------|
| Analizar polares con IA | Identificar L/D max, CL optimo |
| Comparar perfiles | Trade-off analysis |
| Optimizacion | Sugerir modificaciones |

---

## Herramientas Requeridas

| Herramienta | Proposito | Instalacion |
|-------------|-----------|-------------|
| **XFLR5** | Analisis 2D/3D | [SourceForge](https://sourceforge.net/projects/xflr5/) |
| **Python + Matplotlib** | Graficos personalizados | Ya instalado |
| **OpenCode / Claude** | Interpretacion | Ya configurado |

---

## Formulas Clave

### Sustentacion
```
L = (1/2) * rho * V^2 * S * CL

Donde:
- L = Sustentacion (N)
- rho = Densidad del aire (kg/m^3)
- V = Velocidad (m/s)
- S = Superficie alar (m^2)
- CL = Coeficiente de sustentacion
```

### Arrastre
```
D = (1/2) * rho * V^2 * S * CD

CD = CD0 + CDi
CDi = CL^2 / (pi * AR * e)

Donde:
- CD0 = Arrastre parasito
- CDi = Arrastre inducido
- AR = Aspect Ratio
- e = Factor de eficiencia de Oswald (~0.8)
```

### Reynolds
```
Re = (rho * V * c) / mu
   = (V * c) / nu

Donde:
- c = Cuerda (m)
- mu = Viscosidad dinamica (kg/m*s)
- nu = Viscosidad cinematica (m^2/s)

A nivel del mar, 15C: nu = 1.46e-5 m^2/s
```

### Eficiencia Aerodinamica
```
L/D = CL / CD

(L/D)_max = (1/2) * sqrt(pi * AR * e / CD0)
```

---

## Archivos del Modulo

```
02-aerodynamics-cfd/
├── README.md                    # Este archivo
├── content/
│   ├── 01-fundamentos-aero.md  # Teoria aerodinamica
│   ├── 02-xflr5-tutorial.md    # Tutorial paso a paso
│   └── 03-analisis-alas.md     # Alas 3D y estabilidad
├── EXERCISE.md                  # Ejercicio practico
└── data/
    └── perfiles/               # Archivos .dat de perfiles
```

---

## Rangos Tipicos para Verificacion

| Parametro | UAV | Avion ligero | Avion comercial |
|-----------|-----|--------------|-----------------|
| Reynolds | 100k-500k | 1M-5M | 10M-50M |
| CL crucero | 0.3-0.6 | 0.4-0.6 | 0.5-0.7 |
| CL max | 1.2-1.6 | 1.5-2.0 | 2.0-3.0 (con flaps) |
| L/D max | 8-15 | 12-18 | 15-20 |
| CD0 | 0.02-0.04 | 0.02-0.03 | 0.015-0.025 |

---

## Conexion con Otros Modulos

- **Modulo 01**: Geometria CAD se importa para analisis
- **Modulo 03**: Cargas aerodinamicas se usan en FEA
- **Modulo 05**: Performance total del diseno

---

*Modulo 02 - Aerodinamica y CFD - Track Aeronautica - FPUNA 2026*
