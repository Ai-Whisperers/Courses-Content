# ✈️ Starter Kit: IA para Ingenieria Aeronautica

## Bienvenido/a

Este kit te ensena a usar IA como asistente para calculos aerodinamicos, analisis de perfiles, y sizing preliminar - siempre con verificacion rigurosa, porque en aeronautica los errores pueden ser fatales.

**NUEVO:** Ahora con herramientas de IA avanzadas (NeuralFoil, AeroSandbox) y automatizacion con MCPs que reducen semanas de trabajo a horas.

---

## 🤖 Herramientas de IA Incluidas

| Herramienta | Que Hace | Instalacion |
|-------------|----------|-------------|
| **NeuralFoil** | Analisis de perfiles 1000x mas rapido que XFOIL | `pip install neuralfoil` |
| **AeroSandbox** | Diseno parametrico de aeronaves completas | `pip install aerosandbox` |
| **MCPs** | Automatizacion de CAD, CFD, MATLAB | Ver [MCP-AUTOMATION.md](./MCP-AUTOMATION.md) |

### Demo Rapido (30 segundos)
```python
from neuralfoil import get_aero_from_airfoil_name

# Analizar NACA 2412 instantaneamente
aero = get_aero_from_airfoil_name("naca2412", alpha=5, Re=500000)
print(f"CL={aero['CL']:.3f}, CD={aero['CD']:.5f}, L/D={aero['CL']/aero['CD']:.1f}")
```

---

## 🚀 Quick Start (10 minutos)

### Paso 1: Verificá requisitos
Abrí [PREREQUISITES.md](./PREREQUISITES.md) - necesitás conocimientos de aerodinámica básica.

### Paso 2: ⚠️ ADVERTENCIAS CRÍTICAS
Leé [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) - **errores en aeronáutica pueden costar vidas**.

### Paso 3: Tu primer cálculo verificado
Andá a [exercises/01-calculos-aerodinamicos.md](./exercises/01-calculos-aerodinamicos.md).

---

## ⚠️ ADVERTENCIA IMPORTANTE

**Los cálculos aeronáuticos sin verificación pueden resultar en:**
- Falla estructural en vuelo
- Pérdida de control de la aeronave
- Accidentes fatales

**NUNCA uses cálculos de IA sin verificación exhaustiva por profesionales.**

Este curso es para **aprendizaje y sizing preliminar**, no para diseño final de aeronaves.

---

## 📁 Contenido del Kit

### 📋 Documentos Base
| Archivo | Descripción | Prioridad |
|---------|-------------|-----------|
| [PREREQUISITES.md](./PREREQUISITES.md) | Requisitos y conocimientos previos | ⭐⭐⭐ Leer primero |
| [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) | Advertencias de seguridad | ⭐⭐⭐ **OBLIGATORIO** |
| [VERIFICATION-CHECKLIST.md](./VERIFICATION-CHECKLIST.md) | Checklist de verificación | ⭐⭐⭐ Usar siempre |
| [COMMON-MISTAKES.md](./COMMON-MISTAKES.md) | 12 errores fatales comunes | ⭐⭐ Referencia |
| [20-IDEAS.md](./20-IDEAS.md) | 30 proyectos de practica (incluye 10 con MCP) | ⭐ Inspiracion |
| [CLAUDE.md](./CLAUDE.md) | Template de contexto | ⭐ Para proyectos |
| [AI-INTEGRATION.md](./AI-INTEGRATION.md) | Guia de integracion IA | ⭐⭐ Herramientas avanzadas |
| [MCP-AUTOMATION.md](./MCP-AUTOMATION.md) | Automatizacion con MCPs | ⭐⭐ Reducir trabajo tedioso |

### 📝 Ejercicios Prácticos
| Ejercicio | Tema | Duración | Dificultad |
|-----------|------|----------|------------|
| [01-calculos-aerodinamicos.md](./exercises/01-calculos-aerodinamicos.md) | Reynolds, sustentación | 90 min | 🟡 Intermedio |
| [02-analisis-perfiles.md](./exercises/02-analisis-perfiles.md) | Selección de perfiles NACA | 90 min | 🟡 Intermedio |
| [03-sizing-preliminar.md](./exercises/03-sizing-preliminar.md) | Sizing de UAV | 120 min | 🔴 Avanzado |

### 📚 Ejemplos Completados
| Ejemplo | Que muestra |
|---------|-------------|
| [ejemplo-calculo-reynolds.md](./examples/ejemplo-calculo-reynolds.md) | Calculo Reynolds con analisis de sensibilidad |
| [ejemplo-sizing-uav.md](./examples/ejemplo-sizing-uav.md) | Sizing completo de UAV (con error encontrado) |

### 🤖 Demos de IA (NUEVO)
| Demo | Que muestra |
|------|-------------|
| [01_neuralfoil_demo.py](./examples/ai-demos/01_neuralfoil_demo.py) | Analisis de perfiles 1000x mas rapido |
| [02_aerosandbox_demo.py](./examples/ai-demos/02_aerosandbox_demo.py) | Diseno parametrico de UAV completo |
| [03_genetic_optimization_demo.py](./examples/ai-demos/03_genetic_optimization_demo.py) | Optimizacion genetica de perfiles |

---

## 🎓 Ruta de Aprendizaje

```
Sesión 1: Cálculos Básicos (3 horas)
├── 📖 PREREQUISITES.md + SAFETY-WARNINGS.md (obligatorio)
├── ✏️ Ejercicio 01: Cálculos aerodinámicos
└── 🔍 Verificar con COMMON-MISTAKES.md

Sesión 2: Perfiles Aerodinámicos (3 horas)
├── ✏️ Ejercicio 02: Análisis de perfiles
├── 📖 Revisar ejemplo de Reynolds
└── 🔧 Practicar con XFLR5

Sesion 3: Sizing Preliminar (4 horas)
├── ✏️ Ejercicio 03: Sizing de UAV
├── 📖 Revisar ejemplo de sizing
├── 🔍 VERIFICATION-CHECKLIST.md completo
└── 🎯 Elegir proyecto de 20-IDEAS.md

Sesion 4: IA Avanzada (3 horas) - NUEVO
├── 🤖 Instalar NeuralFoil y AeroSandbox
├── ✏️ Ejecutar demos en examples/ai-demos/
├── 📖 Leer MCP-AUTOMATION.md
└── 🚀 Aplicar IA a tu proyecto
```

---

## 💡 Prompts Efectivos para Aeronáutica

### Para Cálculos Aerodinámicos
```
Necesito calcular [PARÁMETRO] para:
- Perfil: [NACA XXXX]
- Cuerda: [X] m
- Velocidad: [X] m/s
- Altitud: [X] m
- Condiciones: [ISA / temperatura específica]

Usa SOLO unidades SI.
Muestra el procedimiento paso a paso.
Indica el rango típico esperado para verificación.
```

### Para Análisis de Perfiles
```
Necesito seleccionar un perfil para un [TIPO DE AERONAVE]:
- Reynolds de operación: [X]
- Cl requerido: [X]
- Prioridad: [eficiencia / sustentación máxima / manufacturabilidad]

Compará 3 perfiles candidatos con sus pros y contras.
Incluye datos que pueda verificar en XFLR5.
```

### Para Sizing Preliminar
```
Ayudame con el sizing preliminar de un [TIPO]:
- Misión: [descripción]
- Payload: [X] kg
- Endurance: [X] horas
- Velocidad crucero: [X] m/s

Necesito:
1. Estimación de pesos (breakdown)
2. Sizing de ala (superficie, envergadura)
3. Selección de propulsión
4. Verificación de performance

Indica todas las asunciones claramente.
```

---

## ⚠️ Errores Críticos a Evitar

### Unidades (el más común)
| Parámetro | SI | Imperial | Error típico |
|-----------|-----|----------|--------------|
| Velocidad | m/s | knots | 1 kt ≠ 1 m/s |
| Altitud | m | ft | 1 ft ≠ 1 m |
| Densidad | kg/m³ | slug/ft³ | Usar valor incorrecto |

### Atmósfera
- **ISA es a 15°C nivel del mar**
- Paraguay en verano: 35°C+ (densidad ~10% menor)
- Siempre especificar condiciones

### Factores de Seguridad
- Carga última = Carga límite × n × 1.5
- n típico: 3.8 (normal), 6.0 (acrobático)
- **Nunca dimensionar sin factores**

---

## 📊 Valores Típicos para Verificación

Si tu cálculo da valores fuera de estos rangos, **verificá**:

| Parámetro | Aviones pequeños | UAV |
|-----------|------------------|-----|
| L/D máximo | 12-18 | 8-15 |
| Carga alar (kg/m²) | 30-80 | 5-30 |
| Relación de aspecto | 6-10 | 5-12 |
| Clmax (con flaps) | 1.8-2.5 | 1.2-1.6 |
| Vstall (m/s) | 20-35 | 10-20 |

---

## 🔧 Herramientas de Verificacion

### Software Tradicional
| Herramienta | Uso | Costo |
|-------------|-----|-------|
| **XFLR5** | Analisis de perfiles y alas | Gratis |
| **OpenVSP** | Modelado parametrico | Gratis |
| **JavaFoil** | Analisis de perfiles online | Gratis |
| **AVL** | Analisis de estabilidad | Gratis |

### Herramientas de IA (NUEVO)
| Herramienta | Uso | Costo |
|-------------|-----|-------|
| **NeuralFoil** | Analisis de perfiles 1000x mas rapido | Gratis |
| **AeroSandbox** | Diseno parametrico con optimizacion | Gratis |
| **DEAP** | Algoritmos geneticos para optimizacion | Gratis |
| **MCPs** | Automatizacion de CAD/CFD/MATLAB | Gratis |

### Bases de Datos
- [UIUC Airfoil Database](https://m-selig.ae.illinois.edu/ads/coord_database.html)
- [Airfoil Tools](http://airfoiltools.com/)

### Calculadoras
- [Atmósfera ISA Calculator](https://www.digitaldutch.com/atmoscalc/)

---

## 📋 Checklist de Verificación Obligatorio

Antes de considerar un cálculo como válido:

### Unidades y Conversiones
- [ ] ¿Todas las unidades son SI consistentes?
- [ ] ¿Convertí correctamente de otras unidades?
- [ ] ¿El análisis dimensional es correcto?

### Condiciones
- [ ] ¿Especifiqué altitud y temperatura?
- [ ] ¿Calculé densidad para esas condiciones?
- [ ] ¿El Reynolds es apropiado para los datos usados?

### Verificación
- [ ] ¿El resultado está en el rango típico?
- [ ] ¿Verifiqué con otra fuente/método?
- [ ] ¿Documenté todas las asunciones?

### Seguridad
- [ ] ¿Apliqué factores de seguridad?
- [ ] ¿Consideré condiciones de falla?
- [ ] ¿Un profesional revisó los cálculos críticos?

---

## ❓ FAQ

**¿Puedo usar estos cálculos para construir un avión real?**
Solo como punto de partida. Todo diseño real debe ser verificado por ingenieros certificados y pasar pruebas estructurales.

**¿Qué tan precisos son los cálculos de IA?**
Pueden tener errores en unidades, coeficientes, o asunciones. SIEMPRE verificar con software de análisis y bibliografía.

**¿Qué software debo aprender?**
XFLR5 es gratuito y excelente para empezar. OpenVSP para modelado 3D.

---

## 📚 Bibliografía de Referencia

| Autor | Libro | Uso |
|-------|-------|-----|
| Raymer | Aircraft Design: A Conceptual Approach | Sizing |
| Anderson | Introduction to Flight | Fundamentos |
| Roskam | Airplane Design Series | Detallado |
| Nicolai | Fundamentals of Aircraft Design | Metodología |

---

*Starter Kit - Ingeniería Aeronáutica - FPUNA 2026*
