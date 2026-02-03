# Slides - Clase 5: Ingeniería Aeronáutica
## Talleres de Verano FP-UNA 2026

**Total Slides**: 20  
**Critical**: Safety-critical engineering warnings

---

## SLIDE 1: Title

```
CLASE 5
Ingeniería Aeronáutica con IA

Viernes, Febrero 6, 2026
```

---

## SLIDE 2: Agenda

```
📋 AGENDA

1. ✈️ IA en Aeronáutica - Scope (15 min)
2. 📊 Análisis de Vuelo (30 min)
3. 🛩️ Diseño Conceptual (30 min)
4. 📐 Cálculos Aerodinámicos (15 min)
5. 🎯 Ejercicio (15 min)
6. ❓ Q&A (15 min)
```

---

## SLIDE 3: ⚠️ SAFETY-CRITICAL WARNING

```
🚨 AERONÁUTICA = SAFETY-CRITICAL

REALIDAD:
• Vidas dependen de diseño correcto
• Regulaciones estrictas (FAA, EASA, ANAC)
• Certificación exhaustiva requerida
• Responsabilidad legal significativa

🔴 REGLA ABSOLUTA:
"IA para conceptos e iteración rápida.
 Humanos para certificación y seguridad.
 IA para velocidad, ingenieros para vidas."

❌ IA NO es aceptada como fuente 
   en procesos de certificación

✅ IA para aprender y prototipar
❌ IA NO para decisiones finales de safety
```

**Design**: Red borders, warning symbols

---

## SLIDE 4: Dónde SÍ Usar IA en Aero

```
✅ CASOS APROPIADOS

1. FASE CONCEPTUAL
   • Exploración de trade-offs
   • Estimación inicial de parámetros
   • Generación de alternativas

2. ANÁLISIS DE DATOS
   • Procesamiento de telemetría
   • Pattern identification
   • Data visualization

3. APRENDIZAJE
   • Entender principios
   • Explorar tecnologías
   • Preparación para exámenes

4. DOCUMENTACIÓN
   • Drafts (con revisión humana)
   • Literature summaries

SIEMPRE → Validar con ingeniero + herramientas profesionales
```

---

## SLIDE 5: Dónde NO Usar IA

```
❌ PROHIBIDO / PELIGROSO

❌ Diseño final sin validación
   → No conoce todos los estándares

❌ Cálculos estructurales críticos
   → Sin FEA/CFD profesional

❌ Certificación
   → No genera docs certificables

❌ Decisiones go/no-go
   → No para safety analysis

❌ Production designs
   → Solo conceptos

⚠️ En duda? Consulta ingeniero senior
```

---

## SLIDE 6: Tools Stack - Aeronáutica

```
🛠️ HERRAMIENTAS PROFESIONALES

ANÁLISIS:
• XFLR5 (aerodinámica)
• AVL (vortex lattice)
• OpenVSP (geometry)

SIMULACIÓN:
• ANSYS (CFD/FEA)
• OpenFOAM (open source CFD)
• X-Plane (flight sim)

DISEÑO:
• CATIA (profesional)
• SolidWorks
• Fusion 360

IA COMPLEMENTA, NO REEMPLAZA estas tools
```

---

## SLIDE 7: Proyecto de Hoy

```
🎯 ANÁLISIS DE TELEMETRÍA

ESCENARIO:
Flight test de quadcopter

DATOS:
• Timestamp, altitude, speed
• Battery voltage, current
• Temperature

ANÁLISIS CON IA:
• Métricas de performance
• Detección de anomalías
• Visualización
• Recomendaciones

⏱️ Manual: 3-4 horas
⏱️ Con IA: 15 minutos
```

---

## SLIDE 8: Métricas de Performance

```
📊 KEY METRICS

PARA DRONES/UAVs:

⬆️ Rate of Climb
   → m/s promedio

⚡ Consumo Energético
   → Wh/m, Wh/kg

🔋 Eficiencia
   → Endurance, range

🎯 Thrust-to-Weight
   → Performance indicator

🌡️ Thermal Management
   → Temperature stability

IA CALCULA → TÚ INTERPRETAS → INGENIERO VALIDA
```

---

## SLIDE 9: Template: Análisis de Vuelo

```
📝 PROMPT PARA ANÁLISIS

"Tengo datos de flight test:

[CSV data o descripción]

Calcula:
1. Rate of climb promedio
2. Consumo energético (Wh/m)
3. Eficiencia (para masa [X] kg)
4. Detección de anomalías

Genera:
• Métricas en tabla
• Gráficos (Python matplotlib)
• Interpretación técnica
• Recomendaciones

Compara con benchmarks típicos."
```

---

## SLIDE 10: Diseño Conceptual de UAV

```
🛩️ DISEÑO CONCEPTUAL

PROCESO:
1. Requirements → IA ayuda a definir
2. Configuration → IA sugiere opciones
3. Sizing → IA calcula estimaciones
4. Performance → IA predice básico

EJEMPLO HOY:
Fixed-wing UAV para fotografía aérea

CONSTRAINTS:
• 60 min endurance
• Payload 300g camera
• Hand-launchable
• Belly landing

IA genera conceptos → TÚ validas con cálculos
```

---

## SLIDE 11: Trade-offs en Diseño

```
⚖️ TRADE-OFF ANALYSIS

USA IA PARA EXPLORAR:

WINGSPAN:
• Largo (endurance) vs Corto (portability)

CONFIGURACIÓN:
• High-wing vs Mid-wing vs Low-wing

MOTOR:
• Tractor vs Pusher

MATERIALES:
• Foam (durable) vs Balsa (ligero)

IA genera tabla comparativa →
TÚ decides basado en priorities
```

---

## SLIDE 12: Cálculos Aerodinámicos

```
🧮 CÁLCULOS CON IA

IA PUEDE AYUDAR:

✈️ Lift & Drag estimations
🎯 Wing loading calculations
⚖️ Weight & balance (CG location)
🌀 Thrust requirements
📐 Stability margins

FÓRMULAS TÍPICAS:
• L = 0.5 × ρ × V² × S × CL
• TWR = T / W
• Static Margin = (Xnp - Xcg) / MAC

⚠️ IA calcula → TÚ verificas → XFLR5 valida
```

---

## SLIDE 13: Stability Analysis

```
📐 ANÁLISIS DE ESTABILIDAD

CONCEPTOS CLAVE:

CG (Center of Gravity)
→ Donde se balancea

AC (Aerodynamic Center)
→ Donde actúa la fuerza

NP (Neutral Point)
→ Límite de estabilidad

STATIC MARGIN:
SM = (Xnp - Xcg) / MAC

SM > 0 → Estable ✅
SM < 0 → Inestable ❌
SM 5-15% → Óptimo 🎯

IA calcula → Interpreta → Sugiere ajustes
```

---

## SLIDE 14: Spec Sheet Generation

```
📋 SPECIFICATION SHEET

IA GENERA COMPLETO:

GENERAL:
• Dimensiones (wingspan, length, etc)
• Peso (MTOW, empty weight)
• Wing loading, aspect ratio

PERFORMANCE:
• Velocidades (stall, cruise, max)
• Endurance, range
• Rate of climb

PROPULSION:
• Motor specs
• Battery capacity
• Estimated current

⏱️ De 2 horas manual → 5 minutos con IA
```

---

## SLIDE 15: Ejemplo: UAV Spec

```
📊 AGRI-SCOUT UAV (Ejemplo)

GENERAL:
Wingspan: 2.0 m
Length: 1.2 m
MTOW: 1.8 kg
Wing Area: 0.45 m²

PERFORMANCE:
Cruise Speed: 17 m/s
Endurance: 65-75 min
Service Ceiling: 500m AGL

PROPULSION:
Motor: 2212 1000KV
Battery: 3S 5000mAh
Prop: 10x6 pusher

CG LOCATION: 30% MAC
Static Margin: 5.1% ✅
```

**Visual**: 3-view diagram or sketch

---

## SLIDE 16: Limitaciones Críticas

```
⚠️ LO QUE IA NO PUEDE HACER

❌ Flutter analysis
   → Requiere FEA profesional

❌ Structural loads
   → Factor de seguridad crítico

❌ Certificación compliance
   → Standards complejos (ARP, MIL-STD)

❌ Fatigue analysis
   → Material properties específicas

❌ CFD real
   → Simplifica demasiado

ESTAS REQUIEREN: Software profesional + Ingeniero
```

---

## SLIDE 17: Workflow Completo

```
🔄 PROCESO REAL

1. CONCEPTO (Con IA) ✅
   → Requirements, trade-offs

2. PRELIMINARY DESIGN (Con IA) ✅
   → Sizing, configuración

3. DETAILED DESIGN (Sin IA) ⚠️
   → CAD profesional, FEA, CFD

4. PROTOTYPING
   → Fabricación

5. TESTING (Análisis con IA) ✅
   → Data processing, visualization

6. CERTIFICATION (Sin IA) ❌
   → Ingenieros + reguladores

IA útil en pasos 1, 2, 5
```

---

## SLIDE 18: Recursos para Aprender

```
📚 APRENDE AERODINÁMICA

SOFTWARE:
• XFLR5 (gratis, excelente)
• OpenVSP (NASA, open source)
• FlightGear (simulator)

LIBROS:
• Anderson - Fundamentals of Aerodynamics
• Raymer - Aircraft Design
• Nicolai - Fundamentals of Aircraft Design

COMUNIDADES:
• RC Groups (UAVs)
• DIY Drones
• r/aeronautics

💡 USA IA como tutor mientras estudias
```

---

## SLIDE 19: Resumen

```
✅ RESUMEN - CLASE 5

HOY APRENDIMOS:

✅ Scope de IA en aeronáutica
✅ Análisis de flight data
✅ Diseño conceptual de UAVs
✅ Cálculos aerodinámicos básicos
✅ Limitaciones críticas

🔑 KEY TAKEAWAY:
"IA para iteración rápida y aprendizaje,
ingenieros para vidas y certificación."
```

---

## SLIDE 20: Próxima Clase - FINAL

```
🎉 LUNES - CLASE 6 (FINAL)

📅 LUNES, Febrero 9
🎯 TEMA: Open Forum + Proyectos

FORMATO:
• TÚ presentas (proyectos/ideas/problemas)
• Resolvemos juntos
• Q&A abierto
• Networking
• Cierre del taller + Certificados

📝 PREPARA:
• Proyecto que quieras mostrar, O
• Problema que necesites resolver, O
• Idea para discutir

¡ESTA ES TU CLASE! 🚀

Fin de semana: Practica lo aprendido
```

---

**Critical elements**:
- Safety warnings on multiple slides
- Red/orange for warnings
- Validation workflow emphasized

**Visuals needed**:
- Aircraft diagrams (3-view)
- Performance graphs
- Stability diagram (CG/AC/NP)

**Time**: 2.5 hours (safety content important)
