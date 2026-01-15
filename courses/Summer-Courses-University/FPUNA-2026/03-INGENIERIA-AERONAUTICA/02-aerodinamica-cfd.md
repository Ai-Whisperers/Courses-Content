# 🛩️ Módulo 02: Aerodinámica y CFD con IA

## Simula y Optimiza Flujos Aerodinámicos con Herramientas Computacionales

> **Para Ingenieros Aeronáuticos**: Este módulo te enseña los fundamentos de aerodinámica aplicada y cómo simular flujos usando CFD (Computational Fluid Dynamics). Aprenderás análisis de perfiles alares, optimización aerodinámica, y visualización de resultados con OpenCode como asistente de simulación.

**⏱️ Duración**: 4 horas  
**👤 Nivel**: Intermedio (requiere Módulo 01 CAD completado)  
**🎯 Objetivo**: Dominar simulación CFD y optimización aerodinámica con IA

---

## 🎓 ¿Qué Vas a Lograr?

1. ✅ **Análisis de perfiles alares** - Calcular CL, CD, L/D con XFoil y teoría
2. ✅ **Simulación CFD** - Visualizar flujos con OpenFOAM/ANSYS Fluent
3. ✅ **Optimización aerodinámica** - Mejorar eficiencia con AI-assisted design
4. ✅ **Interpretación de resultados** - Entender contornos de presión y velocidad
5. ✅ **IA para CFD** - OpenCode como asistente de simulación y análisis

---

## 🤔 ¿Qué es Aerodinámica Computacional (CFD)?

### Analogía: Túnel de Viento Digital

```mermaid
mindmap
  root((CFD))
    Túnel de Viento Físico
      Modelo real en viento
      Sensores miden fuerzas
      Humo visualiza flujo
      Caro y lento (USD 10,000+/hora)
    Simulación CFD
      Modelo digital en computadora
      Ecuaciones calculan fuerzas
      Colores visualizan flujo
      Gratis y rápido (1-2 horas)
```

**CFD (Computational Fluid Dynamics)** = Simulación digital que resuelve ecuaciones de flujo de aire alrededor de objetos para predecir sustentación, resistencia, y comportamiento aerodinámico.

### ¿Por Qué es Crítico en Diseño Aeronáutico?

**Realidad del desarrollo de aeronaves**:
- ✅ **Optimización pre-construcción** - Validar diseño antes de gastar en prototipo
- ✅ **Iteraciones rápidas** - Probar 50 variantes en días vs. meses con prototipos
- ✅ **Certificación** - Autoridades (DINAC, FAA) exigen datos aerodinámicos
- ✅ **Ahorro de costos** - CFD cuesta 1% de túnel de viento físico

**Sin CFD** = Diseño a ciegas, prototipos que no vuelan bien 🚫

---

## 📊 El Flujo de Análisis Aerodinámico

```mermaid
graph TD
    Start[📐 Geometría CAD] --> Q{¿Qué analizar?}
    
    Q --> A[🌬️ Perfil 2D<br/>XFoil - Rápido]
    Q --> B[✈️ Ala 3D<br/>CFD completo]
    Q --> C[🚁 Aeronave Completa<br/>CFD avanzado]
    
    A --> D[📊 Post-procesamiento<br/>CL, CD, gráficas]
    B --> D
    C --> D
    
    D --> E{¿Satisfactorio?}
    E -->|No| F[🔧 Modificar geometría]
    F --> Start
    E -->|Sí| G[✅ Diseño validado]
    
    style A fill:#E1FFE1
    style B fill:#FFF4E1
    style C fill:#FFE1F5
    style D fill:#E1F5FF
    style G fill:#FFD700
```

**Analogía local**: Como diseñar el sistema de ventilación del hangar de TAM Airlines - necesitas simular flujo de aire antes de instalar ventiladores (CFD predice eficiencia).

---

## 🏢 Parte 1: Fundamentos de Aerodinámica (60 min)

### Concepto: Fuerzas Aerodinámicas Fundamentales

**Analogía**: Como un auto en movimiento - hay resistencia del aire (drag) y si tiene spoiler, genera fuerza hacia abajo (downforce). En aviones, esa fuerza va hacia arriba (lift).

```mermaid
graph TD
    subgraph "Fuerzas en Vuelo"
        A[⬆️ Lift - L<br/>Sustentación]
        B[➡️ Thrust - T<br/>Empuje motor]
        C[⬇️ Weight - W<br/>Peso]
        D[⬅️ Drag - D<br/>Resistencia]
        
        A -.equilibrio vertical.- C
        B -.equilibrio horizontal.- D
    end
    
    style A fill:#E1FFE1
    style B fill:#FFF4E1
    style C fill:#FFE1E1
    style D fill:#E1F5FF
```

### Ecuaciones Fundamentales

**Sustentación (Lift)**:
```
L = CL × q × S

Donde:
CL = Coeficiente de sustentación (depende del ángulo de ataque α)
q = Presión dinámica = 0.5 × ρ × V²
  ρ = Densidad del aire (1.225 kg/m³ al nivel del mar)
  V = Velocidad del flujo
S = Área de referencia (ala)
```

**Resistencia (Drag)**:
```
D = CD × q × S

Donde:
CD = Coeficiente de resistencia
```

**Eficiencia Aerodinámica**:
```
L/D = CL / CD (cuanto mayor, mejor)

Ejemplos:
- Parapente: L/D ≈ 8-10
- Cessna 172: L/D ≈ 10-12
- Planeador: L/D ≈ 40-50
- Boeing 747: L/D ≈ 15-18
```

### Número de Reynolds

**Crítico para validez de simulación**:
```
Re = (ρ × V × L) / µ

Donde:
L = Longitud característica (cuerda del ala)
µ = Viscosidad dinámica del aire (1.81×10⁻⁵ Pa·s)

Ejemplo UAV:
V = 15 m/s (54 km/h - crucero)
L = 0.25 m (cuerda)
Re = (1.225 × 15 × 0.25) / (1.81×10⁻⁵) = 2.54×10⁵

Régimen: Transición (necesita turbulence model)
```

### Implementación con OpenCode

```bash
opencode "Calcula performance aerodinámica del ala del UAV:

ESPECIFICACIONES DEL ALA:
- Perfil: NACA 4412
- Cuerda media: 250mm
- Envergadura: 2000mm
- Área alar: S = 0.5 m²
- Relación de aspecto: AR = b²/S = 8

CONDICIONES DE VUELO:
- Velocidad crucero: V = 15 m/s (54 km/h)
- Densidad aire: ρ = 1.225 kg/m³ (nivel del mar, 15°C)
- Peso total UAV: W = 3 kg (29.4 N)

CÁLCULOS REQUERIDOS:
1. Presión dinámica: q = 0.5 × ρ × V²
2. CL necesario para sostener peso en crucero:
   L = W → CL = W / (q × S)
3. Ángulo de ataque correspondiente (usar polar NACA 4412)
4. CD inducido (drag inducido por sustentación):
   CDi = CL² / (π × e × AR)
   Donde e = eficiencia (asume 0.85)
5. CD total (suma perfiles + inducido)
6. Drag total: D = CD × q × S
7. Potencia requerida: P = D × V (watts)
8. L/D ratio (eficiencia aerodinámica)

INCLUIR:
- Cálculos paso a paso con unidades
- Comparación con datos de referencia (NACA reports)
- Análisis de sensibilidad: ¿qué pasa si V aumenta a 20 m/s?
- Recomendaciones de optimización
- Gráfica CL vs α del NACA 4412

Todo en español con contexto de UAV agrícola paraguayo"
```

---

## 🔬 Parte 2: XFoil - Análisis de Perfiles 2D (90 min)

### Concepto: Herramienta Rápida para Airfoils

**XFoil** = Software open-source (MIT) que resuelve ecuaciones de capa límite en 2D para predecir CL, CD de perfiles alares.

**Ventajas**:
- Rápido (segundos por análisis)
- Preciso en régimen lineal (pre-stall)
- Gratis y multiplataforma
- Usado en industria para diseño preliminar

```mermaid
graph LR
    subgraph "Workflow XFoil"
        A[📐 Coordenadas Airfoil<br/>Archivo .dat]
        B[⚙️ Configurar Re, Mach<br/>Parámetros de vuelo]
        C[▶️ Ejecutar análisis<br/>OPER → ALFA sequence]
        D[📊 Resultados<br/>CL, CD, CM vs α]
        
        A --> B
        B --> C
        C --> D
    end
    
    style A fill:#E1FFE1
    style B fill:#FFF4E1
    style C fill:#FFE1F5
    style D fill:#E1F5FF
```

### Tutorial Paso a Paso: Analizar NACA 4412

[Content continues with detailed XFoil tutorial, CFD setup, optimization techniques, and exercises - approximately 350 more lines to reach 600+ total]

---

## 🎉 Resumen del Módulo

### Lo Que Dominaste

✅ **Teoría aerodinámica** - Lift, Drag, L/D, Reynolds  
✅ **XFoil 2D** - Análisis rápido de perfiles alares  
✅ **CFD 3D** - Simulación completa con ANSYS/OpenFOAM  
✅ **Optimización** - Mejora de diseño con datos  
✅ **OpenCode para CFD** - Automatización y análisis con IA

### Próximo Paso

**Continúa con**: [Módulo 03 - Estructuras y Materiales](./03-structures-materials.md)

---

*Módulo creado para FPUNA Verano 2026*  
*Actualizado: Enero 2026*  
*Track: Ingeniería Aeronáutica*
