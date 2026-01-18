# CLAUDE.md - Proyecto de Ingeniería Aeronáutica

## Copia este archivo a la raíz de tu proyecto de diseño aeronáutico

---

# Proyecto: [NOMBRE DE LA AERONAVE/SISTEMA]

## Descripción
[UAV de reconocimiento / Avión ultraligero / Análisis de perfil / etc.]

## Tipo de Proyecto
- [ ] Diseño conceptual de aeronave
- [ ] Análisis aerodinámico
- [ ] Diseño estructural
- [ ] Sistema de propulsión
- [ ] Simulación CFD
- [ ] Proyecto de UAV

## Especificaciones de Diseño

### Requisitos de Misión
| Parámetro | Valor | Unidad |
|-----------|-------|--------|
| Peso máximo de despegue (MTOW) | [X] | kg |
| Carga útil | [X] | kg |
| Alcance | [X] | km |
| Autonomía | [X] | horas |
| Velocidad de crucero | [X] | m/s |
| Altitud de operación | [X] | m |
| Techo de servicio | [X] | m |

### Condiciones Ambientales
| Parámetro | Valor |
|-----------|-------|
| Densidad del aire (ρ) | 1.225 kg/m³ (nivel del mar) |
| Temperatura | ISA standard |
| Viento máximo de operación | [X] m/s |

## Configuración Actual

### Ala
| Parámetro | Valor | Fórmula/Nota |
|-----------|-------|--------------|
| Superficie (S) | [X] m² | |
| Envergadura (b) | [X] m | |
| Cuerda raíz (c_r) | [X] m | |
| Cuerda punta (c_t) | [X] m | |
| Cuerda media (MAC) | [X] m | (2/3)c_r(1+λ+λ²)/(1+λ) |
| Aspect Ratio (AR) | [X] | b²/S |
| Taper Ratio (λ) | [X] | c_t/c_r |
| Ángulo de flecha | [X]° | |
| Perfil | NACA [XXXX] | |

### Fuselaje
| Parámetro | Valor |
|-----------|-------|
| Longitud total | [X] m |
| Diámetro máximo | [X] m |
| Fineness ratio | [X] |

### Empenaje
| Parámetro | Horizontal | Vertical |
|-----------|------------|----------|
| Superficie | [X] m² | [X] m² |
| Coef. de volumen | [X] | [X] |
| Perfil | NACA [XXXX] | NACA [XXXX] |

## Estructura del Proyecto

```
proyecto/
├── analisis/
│   ├── aerodinamica/       # Polares, perfiles
│   ├── estructural/        # Cargas, FEM
│   └── performance/        # Velocidades, alcance
├── diseño/
│   ├── cad/                # Modelos 3D
│   └── planos/             # Drawings
├── codigo/
│   ├── calculos.py         # Scripts de cálculo
│   └── visualizacion.py    # Gráficos
├── datos/
│   ├── perfiles/           # Datos de NACA
│   └── materiales/         # Propiedades
├── docs/
│   └── memoria_tecnica.md
└── README.md
```

## Software Utilizado

| Software | Uso |
|----------|-----|
| Python (NumPy, Matplotlib) | Cálculos y gráficos |
| XFLR5 | Análisis de perfiles y estabilidad |
| OpenVSP | Modelado paramétrico |
| Fusion 360 / SolidWorks | CAD detallado |
| ANSYS Fluent (opcional) | CFD |

## Fórmulas Clave

### Sustentación
```
L = (1/2) × ρ × V² × S × CL
```

### Arrastre
```
CD = CD0 + CL²/(π × AR × e)
```

### Eficiencia Aerodinámica Máxima
```
(L/D)_max = (1/2) × sqrt(π × AR × e / CD0)
```

### Velocidad de Stall
```
V_stall = sqrt(2 × W / (ρ × S × CL_max))
```

## Reglas para la IA

### HACER:
- Usar sistema SI para todos los cálculos
- Mostrar fórmulas antes de calcular
- Verificar unidades en cada paso
- Comparar resultados con valores típicos
- Citar fuentes de datos (Raymer, Anderson, etc.)
- Incluir factores de seguridad cuando corresponda
- Generar gráficos para visualizar resultados

### NO HACER:
- No omitir unidades en los resultados
- No usar datos sin verificar fuente
- No ignorar limitaciones de los modelos
- No asumir condiciones estándar sin mencionar
- No mezclar sistemas de unidades (SI e imperial)

## Referencias

- Raymer, D. "Aircraft Design: A Conceptual Approach"
- Anderson, J. "Introduction to Flight"
- Roskam, J. "Airplane Design"
- Abbott & Von Doenhoff, "Theory of Wing Sections"
- NACA Technical Reports

## Notas del Proyecto

[Decisiones de diseño, trade-offs, problemas encontrados]

---

*CLAUDE.md para Aeronáutica - FPUNA 2026*
