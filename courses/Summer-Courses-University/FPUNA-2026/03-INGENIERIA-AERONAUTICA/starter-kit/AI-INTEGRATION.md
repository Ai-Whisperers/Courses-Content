# AI-INTEGRATION.md - Integración de IA en Ingeniería Aeronáutica

## Cómo la IA Acelera el Diseño de Aeronaves

---

## Niveles de Integración

### Nivel 1: Calculadora Inteligente
La IA realiza cálculos y verifica resultados.

**Casos de uso:**
- Cálculos aerodinámicos básicos
- Conversión de unidades
- Verificación de fórmulas
- Interpolación de datos de tablas

### Nivel 2: Asistente de Diseño
La IA participa activamente en decisiones de diseño.

**Casos de uso:**
- Selección de perfiles aerodinámicos
- Trade studies paramétricos
- Optimización de configuraciones
- Generación de código de análisis

### Nivel 3: Ingeniero Virtual
La IA automatiza análisis completos y genera documentación.

**Casos de uso:**
- Análisis paramétrico completo
- Generación de reportes técnicos
- Validación cruzada de resultados
- Identificación de problemas de diseño

---

## Flujo de Diseño con IA

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DISEÑO CONCEPTUAL CON IA                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│   │  REQUISITOS  │───▶│   SIZING     │───▶│  AERODINAMICA │              │
│   │              │    │              │    │              │              │
│   │ IA verifica  │    │ IA calcula   │    │ IA selecciona│              │
│   │ factibilidad │    │ dimensiones  │    │ perfiles     │              │
│   └──────────────┘    └──────────────┘    └──────────────┘              │
│          │                   │                   │                       │
│          ▼                   ▼                   ▼                       │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│   │   PESOS      │◀───│  PROPULSION  │◀───│ ESTABILIDAD  │              │
│   │              │    │              │    │              │              │
│   │ IA estima y  │    │ IA matching  │    │ IA verifica  │              │
│   │ balancea     │    │ motor-hélice │    │ márgenes     │              │
│   └──────────────┘    └──────────────┘    └──────────────┘              │
│          │                                       │                       │
│          └───────────────┬───────────────────────┘                       │
│                          ▼                                               │
│                   ┌──────────────┐                                       │
│                   │ PERFORMANCE  │                                       │
│                   │              │                                       │
│                   │ IA genera    │                                       │
│                   │ diagramas    │                                       │
│                   └──────────────┘                                       │
│                          │                                               │
│                          ▼                                               │
│                   ┌──────────────┐                                       │
│                   │   ITERACIÓN  │───▶ ¿Cumple requisitos?              │
│                   │              │      No: volver a SIZING              │
│                   │ IA sugiere   │      Sí: documentar                   │
│                   │ mejoras      │                                       │
│                   └──────────────┘                                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Integración por Disciplina

### Aerodinámica

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Búsqueda de datos NACA | Tablas manuales | Respuesta inmediata |
| Cálculo de polar | Horas con Excel | Minutos con código generado |
| Selección de perfil | Experiencia necesaria | Comparación objetiva |
| Análisis paramétrico | Días | Horas |

**Prompts típicos:**
```bash
# Comparación de perfiles
claude "Compara NACA 2412 vs 4415 para Re=500,000:
- CL vs alpha
- CD vs CL
- (L/D) máximo
- Comportamiento en stall
Recomienda para UAV de baja velocidad"

# Polar del avión completo
claude "Con estos datos:
CD0=0.025, AR=8, e=0.82
Genera tabla y gráfico de la polar completa"
```

### Performance

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Curvas de potencia | Cálculo manual largo | Script generado |
| Velocidades características | Iteración manual | Solución directa |
| Alcance/autonomía | Fórmulas aplicadas | Análisis completo |

**Prompts típicos:**
```bash
# Diagrama de performance
claude "Datos: W=800kg, S=10m², P=150HP
CD0=0.028, AR=7, e=0.8
Genera diagrama de potencia requerida/disponible
y calcula todas las velocidades características"

# Análisis de misión
claude "Para un vuelo a 1500m de altitud con estos datos:
[datos del avión]
Calcula alcance con 50L de combustible"
```

### Estabilidad y Control

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Cálculo de Cm_alpha | Fórmulas complejas | Código generado |
| Punto neutro | Iteración | Cálculo directo |
| Sizing de empenaje | Reglas empíricas | Optimización |

**Prompts típicos:**
```bash
# Verificación de estabilidad
claude "Ala en 25% longitud fuselaje, MAC=1m
CG a 28% MAC
Empenaje: S_t=1.5m², l_t=3m
¿Es longitudinalmente estable? ¿Margen estático?"

# Diseño de empenaje
claude "Diseña empenaje horizontal para:
Ala: S=12m², MAC=1.2m
Fuselaje: L=6m
Margen estático objetivo: 12%"
```

### Estructuras (Nivel Básico)

| Tarea | Sin IA | Con IA |
|-------|--------|--------|
| Cargas en ala | Integración manual | Script automático |
| Momento máximo | Cálculo paso a paso | Resultado directo |
| Selección de material | Tablas | Comparación parametrizada |

**Prompts típicos:**
```bash
# Cargas de diseño
claude "Ala: b=10m, λ=0.5, c_r=1.5m
MTOW=600kg, n_limit=3.8g
Calcula y grafica cortante y momento flector"

# Selección de material
claude "Momento máximo en raíz: 5000 Nm
Opciones: Al 6061-T6, Al 7075-T6, carbono/epoxy
Compara sección de larguero necesaria"
```

---

## Configuración del Proyecto con IA

### CLAUDE.md para Aeronáutica

Tu CLAUDE.md debe incluir:

```markdown
# Proyecto: [Nombre de la aeronave]

## Misión
[Descripción de la misión]

## Requisitos Clave
- MTOW: [X] kg
- Alcance: [X] km
- Velocidad crucero: [X] m/s

## Parámetros Actuales
### Ala
- S: [X] m², b: [X] m, AR: [X]
- Perfil: NACA [XXXX]

### Performance Calculada
- V_stall: [X] m/s
- V_cruise: [X] m/s
- (L/D)_max: [X]

## Reglas
- Usar SI estrictamente
- Verificar contra datos típicos
- Citar fuentes de datos
```

### Ambiente de Trabajo Recomendado

**Software:**
- Python 3.9+ con NumPy, SciPy, Matplotlib
- XFLR5 para análisis de perfiles
- OpenVSP para modelado 3D paramétrico
- VS Code con Claude Code

**Estructura de Proyecto:**
```
proyecto/
├── CLAUDE.md              # Contexto para la IA
├── requirements.txt       # Dependencias Python
├── src/
│   ├── aero.py           # Funciones aerodinámicas
│   ├── performance.py    # Análisis de performance
│   └── stability.py      # Estabilidad y control
├── notebooks/
│   ├── 01_sizing.ipynb
│   ├── 02_aero_analysis.ipynb
│   └── 03_performance.ipynb
├── data/
│   ├── airfoils/         # Coordenadas de perfiles
│   └── reference/        # Datos de aeronaves similares
├── docs/
│   └── technical_report.md
└── results/
    └── figures/
```

---

## Patrones de Uso de IA

### Patrón 1: Verify-Then-Trust
```
1. Calcular manualmente un caso simple
2. Pedir a IA el mismo cálculo
3. Comparar resultados
4. Si coinciden, confiar en IA para casos complejos
```

### Patrón 2: Generate-Then-Adapt
```
1. "Genera código Python para calcular [X]"
2. Revisar código generado
3. Adaptar a tus variables específicas
4. Ejecutar y verificar contra valores típicos
```

### Patrón 3: Reference-Based Design
```
1. "Datos de aeronaves similares a [descripción]"
2. IA provee tabla de referencia
3. Usar datos para validar diseño propio
4. "Mi V_cruise es X, ¿es razonable vs referencia?"
```

### Patrón 4: Iterative Optimization
```
1. Diseño inicial con valores típicos
2. IA calcula performance
3. "¿Cómo mejorar alcance sin aumentar peso?"
4. IA sugiere cambios (AR, perfil, etc.)
5. Recalcular y comparar
```

---

## Validación de Resultados

### Checklist de Verificación con IA

```bash
claude "Verifica estos resultados de mi diseño:

Datos:
- MTOW: 600 kg
- S: 10 m²
- AR: 8
- CD0: 0.025

Resultados calculados:
- V_stall: 22 m/s
- V_cruise_opt: 45 m/s
- (L/D)_max: 15
- Ceiling: 4500 m

¿Son valores razonables para un ultraligero?
¿Hay inconsistencias entre ellos?"
```

### Comparación con Aeronaves Reales

```bash
claude "Compara mi diseño con:
- Cessna 152
- Piper J-3 Cub
- Rans S-6

Métricas a comparar:
1. Carga alar
2. Relación potencia/peso
3. (L/D) estimado
4. Velocidad de stall

¿Mi diseño está en el rango típico?"
```

---

## Métricas de Productividad

### Sin IA (Diseño Tradicional)
| Fase | Tiempo típico |
|------|---------------|
| Sizing inicial | 1-2 semanas |
| Análisis aerodinámico | 2-3 semanas |
| Performance completo | 1-2 semanas |
| Estabilidad | 1 semana |
| Documentación | 1-2 semanas |
| **Total** | **6-10 semanas** |

### Con IA
| Fase | Tiempo con IA | Reducción |
|------|---------------|-----------|
| Sizing inicial | 2-3 días | 70% |
| Análisis aerodinámico | 3-5 días | 75% |
| Performance completo | 2-3 días | 70% |
| Estabilidad | 1-2 días | 80% |
| Documentación | 1-2 días | 85% |
| **Total** | **1.5-3 semanas** | **70-75%** |

---

## Limitaciones y Precauciones

### La IA NO reemplaza:
- Juicio de ingeniería experimentado
- Ensayos en túnel de viento
- Pruebas de vuelo
- Certificación aeronáutica
- Software de CFD profesional

### Siempre verificar:
- Unidades en todos los cálculos
- Resultados contra valores típicos publicados
- Supuestos de las fórmulas usadas
- Rangos de validez (Re, Mach, etc.)

### Usar con criterio:
- Fórmulas empíricas tienen limitaciones
- Datos de perfiles varían según la fuente
- Estimaciones de peso son aproximaciones
- La realidad siempre difiere del papel

---

## Recursos Integrados

### Bases de Datos
- **UIUC Airfoil Database**: Coordenadas y polares
- **Raymer's Statistical Data**: Estimaciones de peso
- **Jane's All the World's Aircraft**: Datos de referencia

### Herramientas Complementarias
- **XFLR5**: Análisis de perfiles (validar IA)
- **OpenVSP**: Geometría 3D paramétrica
- **AVL**: Estabilidad (software MIT)

### Literatura de Referencia
```bash
claude "¿Cuál es la fórmula de Raymer para estimar
el peso del ala de un avión monomotor?"
# IA provee fórmula y referencia exacta
```

---

*AI-INTEGRATION.md para Aeronáutica - FPUNA 2026*
