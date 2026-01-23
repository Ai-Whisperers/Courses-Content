# CLASE 5: Ingeniería Aeronáutica con IA
## Productividad Académica con IA - TALLERES VERANO 2026

**Fecha**: Viernes, Febrero 6, 2026  
**Horario**: 18:00 - 20:00 (2 horas)  
**Modalidad**: Virtual

---

## 🎯 Objetivos de Aprendizaje

Al finalizar esta clase, los estudiantes podrán:

1. ✅ Usar IA para análisis de parámetros de vuelo
2. ✅ Aplicar IA en diseño aeronáutico conceptual
3. ✅ Optimizar perfiles aerodinámicos con asistencia de IA
4. ✅ Analizar datos de flight testing con IA
5. ✅ Generar reportes técnicos automatizados
6. ✅ Entender limitaciones de IA en ingeniería crítica

---

## ⏱️ PLAN DE CLASE MINUTO A MINUTO

---

### 🔷 PARTE 1: Intro + IA en Aeronáutica (25 minutos)

#### **18:00 - 18:10 (10 min) - Bienvenida + Context**

**QUÉ MOSTRAR**: 
- 📊 **SLIDES**: "IA en Ingeniería Aeronáutica"

**QUÉ DECIR**:
```
"¡Bienvenidos a nuestra última clase técnica del taller!

Ingeniería aeronáutica es uno de los campos MÁS complejos.
Por eso mismo, es donde IA puede ayudar tremendamente... 
pero también donde más cuidado deben tener.

Pregunta rápida: ¿Qué proyectos aeron\u00e1uticos están haciendo?
- Diseño de drones?
- Análisis aerodinámico?
- Estructuras de aeronaves?
- Propulsión?
- Otro?

[Leer respuestas]

Hoy vamos a enfocarnos en cómo IA puede asistir en:
1. Análisis de performance
2. Diseño conceptual
3. Procesamiento de datos de vuelo
4. Documentación técnica

PERO primero: advertencias MUY importantes..."
```

---

#### **18:10 - 18:25 (15 min) - Safety-Critical Engineering con IA**

**QUÉ MOSTRAR**:
- 📊 **SLIDES**: "IA en Safety-Critical Systems"
- 📊 **SLIDES**: "Regulaciones y Certificación"

**SLIDE: Safety-Critical Engineering**
```
⚠️ REALIDAD DE INGENIERÍA AERONÁUTICA:

Aeronaves son safety-critical systems:
- Vidas humanas dependen de su correcto funcionamiento
- Regulaciones estrictas (FAA, EASA, ANAC, etc.)
- Certificación exhaustiva requerida
- Responsabilidad legal significativa

❌ LO QUE IA NO PUEDE (Y NO DEBE) HACER:

1. Diseño Final sin Validación
   - IA no conoce todos los estándares (ARP, MIL-STD, etc.)
   - No reemplaza FEA/CFD profesional
   - No valida safety margins

2. Certificación
   - NO es aceptado como fuente en procesos de certificación
   - NO reemplaza análisis requeridos por regulaciones
   - NO genera documentación certificable directamente

3. Decisiones de Seguridad
   - NO tomar decisiones de go/no-go basadas solo en IA
   - NO usar para cálculos estructurales críticos sin validación
   - NO confiar en IA para safety analysis

REGLA DE ORO AERONÁUTICA:
"IA para conceptos, humanos para certificación.
 IA para velocidad, ingenieros para seguridad."
```

**SLIDE: Dónde SÍ Usar IA**
```
✅ CASOS DE USO APROPIADOS:

1. Fase Conceptual
   - Exploración de trade-offs
   - Estimación inicial de parámetros
   - Generación de alternativas de diseño

2. Análisis de Datos
   - Procesamiento de telemetría
   - Identificación de patterns en flight tests
   - Visualización de datos complejos

3. Documentación
   - Drafts de reportes (con revisión humana)
   - Explicación de conceptos complejos
   - Resumen de literatura técnica

4. Aprendizaje
   - Entender principios aerodinámicos
   - Explorar nuevas tecnologías
   - Preparación para exámenes

SIEMPRE: Validar con herramientas profesionales y revisar por ingeniero experimentado.
```

**QUÉ DECIR**:
```
"No les digo esto para asustarlos, sino para que entiendan 
el contexto profesional.

En sus proyectos universitarios, IA es súper útil.
En proyectos reales con vidas en juego: IA + experto humano + validación exhaustiva.

Con eso claro, vamos a ver aplicaciones prácticas."
```

---

### 🔷 PARTE 2: Análisis de Performance de Vuelo (30 minutos)

#### **18:25 - 18:55 (30 min) - DEMO: Análisis de Parámetros de Vuelo**

💻 **LIVE DEMO**: OpenCode + datos de vuelo

**Proyecto: Análisis de Telemetría de Drone**

```
"Tengo datos de un flight test de un drone.
Vamos a usar IA para analizar performance."
```

**Paso 1: Preparar Datos (5 min)**

💻 OpenCode:
```
Prompt:
"Tengo datos de telemetría de vuelo de un quadcopter:

[Datos CSV o pegar ejemplo]:
timestamp, altitude_m, speed_mps, battery_v, current_a, temp_c
0.0, 0, 0, 12.6, 0.5, 22
1.0, 0.5, 2.1, 12.5, 3.2, 23
2.0, 1.2, 3.4, 12.4, 4.1, 24
...

Genera script Python que:
1. Lee y parsea estos datos
2. Calcula métricas clave:
   - Rate of climb promedio
   - Consumo de energía por metro de altitud
   - Eficiencia de batería (Wh/kg si masa=1.2kg)
   - Thermal performance
3. Detecta anomalías (spikes, outliers)
4. Genera gráficos informativos

Usa pandas, matplotlib, numpy."

[OpenCode genera script completo]

[Mostrar código key]:

```python
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Leer datos
df = pd.read_csv('flight_data.csv')

# Calcular métricas
df['power_w'] = df['battery_v'] * df['current_a']
df['climb_rate'] = df['altitude_m'].diff() / df['timestamp'].diff()

# Rate of climb promedio
avg_climb_rate = df['climb_rate'].mean()
print(f"Rate of Climb Promedio: {avg_climb_rate:.2f} m/s")

# Consumo energético
total_energy_wh = df['power_w'].sum() / 3600 # Wh
max_altitude = df['altitude_m'].max()
energy_per_meter = total_energy_wh / max_altitude
print(f"Energía por metro: {energy_per_meter:.4f} Wh/m")

# Eficiencia (para masa 1.2kg)
mass_kg = 1.2
specific_energy = total_energy_wh / mass_kg
print(f"Energía específica: {specific_energy:.2f} Wh/kg")

# Detección de anomalías
from scipy import stats
z_scores = np.abs(stats.zscore(df['current_a']))
anomalies = df[z_scores > 3]
print(f"\nAnomalías detectadas: {len(anomalies)}")

# Gráficos
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# 1. Altitude over time
axes[0,0].plot(df['timestamp'], df['altitude_m'])
axes[0,0].set_title('Altitude Profile')
axes[0,0].set_xlabel('Time (s)')
axes[0,0].set_ylabel('Altitude (m)')

# 2. Power consumption
axes[0,1].plot(df['timestamp'], df['power_w'])
axes[0,1].set_title('Power Consumption')
axes[0,1].set_xlabel('Time (s)')
axes[0,1].set_ylabel('Power (W)')

# 3. Battery voltage
axes[1,0].plot(df['timestamp'], df['battery_v'])
axes[1,0].set_title('Battery Voltage')
axes[1,0].set_xlabel('Time (s)')
axes[1,0].set_ylabel('Voltage (V)')

# 4. Temperature
axes[1,1].plot(df['timestamp'], df['temp_c'])
axes[1,1].set_title('Temperature')
axes[1,1].set_xlabel('Time (s)')
axes[1,1].set_ylabel('Temperature (°C)')

plt.tight_layout()
plt.savefig('flight_analysis.png')
plt.show()
```

"Script completo en minutos. Análisis que tomaría horas."
```

**Paso 2: Interpretar Resultados (10 min)**

💻 Continuar en OpenCode:
```
Prompt:
"Basándote en estos resultados del análisis:

Rate of Climb: 1.8 m/s
Energía por metro: 0.045 Wh/m
Anomalías: 3 spikes en current_a

Dame:
1. Interpretación técnica de estos valores
2. Comparación con benchmarks típicos de quadcopters
3. Recomendaciones de optimización
4. Posibles causas de las anomalías detectadas"

[OpenCode genera análisis]:

```
INTERPRETACIÓN TÉCNICA:
========================

1. Rate of Climb: 1.8 m/s
   - Clasificación: Moderado
   - Benchmark: Quadcopters recreacionales típicos: 2-4 m/s
   - Racing drones: 10+ m/s
   - Análisis: Performance aceptable para drone de fotografía/inspección

2. Energía por Metro: 0.045 Wh/m
   - Eficiencia: Buena
   - Comparación: Valor típico 0.04-0.08 Wh/m
   - Indica: Props y ESCs bien configurados

3. Anomalías en Corriente (3 spikes)
   Posibles causas:
   a) Ráfagas de viento (requirió corrección agresiva)
   b) Cambios bruscos de throttle
   c) Vibración/resonancia de props
   d) ESC thermal throttling momentáneo

RECOMENDACIONES:
================

1. Optimización de Climb Rate:
   - Props de mayor pitch (aumentar de 5" a 5.5")
   - Reducir peso no estructural
   - Mejorar relación thrust/weight

2. Eficiencia Energética:
   - Mantener configuración actual (ya es eficiente)
   - Considerar batería de mayor capacidad para endurance

3. Anomalías:
   - Revisar PID tuning (reducir aggresividad)
   - Verificar balanceo de props
   - Inspeccionar ESCs por thermal issues

4. Testing Adicional:
   - Flight en condiciones de viento conocido
   - Log de vibración (gyro data)
   - Thermal imaging de ESCs en vuelo
```

"IA no solo procesa números, sino que da contexto técnico."
```

**Paso 3: Generar Reporte (10 min)**

💻 Continuar:
```
Prompt:
"Genera reporte técnico de flight test en formato profesional.

Estructura:
1. Executive Summary
2. Test Conditions
3. Performance Metrics
4. Data Analysis
5. Findings and Recommendations
6. Appendix (gráficos)

Formato: Markdown profesional con tablas."

[OpenCode genera reporte completo - mostrar secciones clave]

---

# FLIGHT TEST REPORT
**Aircraft:** Quadcopter X-400  
**Date:** February 6, 2026  
**Test Engineer:** [Nombre]  
**Conditions:** Clear, 15°C, Wind 5 kts

## Executive Summary

Flight test of X-400 quadcopter demonstrated satisfactory performance 
with climb rate of 1.8 m/s and energy efficiency of 0.045 Wh/m. 
Three current anomalies detected require further investigation. 
Overall system performance is within acceptable parameters for 
intended use case (aerial photography).

## Performance Metrics

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Avg Climb Rate | 1.8 m/s | 2-4 m/s | ⚠️ Below Target |
| Energy Efficiency | 0.045 Wh/m | 0.04-0.08 Wh/m | ✅ Within Range |
| Max Altitude | 45 m | 50 m | ✅ Acceptable |
| Battery Depletion | 12.6V → 11.1V | Safe range | ✅ Safe |
| Thermal | Max 32°C | <40°C limit | ✅ Acceptable |

[... resto del reporte]

---

"Reporte profesional listo para entregar. Solo necesita tu firma."
```

**Paso 4: Cálculos Aerodinámicos Básicos (5 min)**

💻 Usar OpenCode para cálculos:
```
Prompt:
"Calcula los siguientes parámetros para un drone quadcopter:

Datos conocidos:
- Masa total: 1.2 kg
- Diámetro de prop: 10 inches (254 mm)
- Pitch de prop: 4.5 inches
- Motor KV: 2300
- Voltaje de operación: 11.1V (3S LiPo)
- 4 motores

Calcula:
1. Thrust total estimado
2. Thrust-to-weight ratio
3. Estimated hover current
4. Theoretical max speed
5. Power loading (W/kg)

Muestra fórmulas usadas."

[OpenCode calcula]:

```
CÁLCULOS AERODINÁMICOS:
=======================

1. THRUST TOTAL ESTIMADO:

Usando fórmula empírica de thrust de props:
T = (Kv × V × D^3 × P) / 10000

Donde:
- T = Thrust por motor (gramos)
- Kv = Motor constant (2300)
- V = Voltage (11.1V)
- D = Diameter (10 inches)
- P = Pitch (4.5 inches)

T_per_motor = (2300 × 11.1 × 10^3 × 4.5) / 10000
T_per_motor ≈ 1149 grams = 1.149 kg

T_total = 4 × 1.149 kg = 4.596 kg = 45.1 N

2. THRUST-TO-WEIGHT RATIO:

TWR = Thrust / Weight
TWR = 4.596 kg / 1.2 kg = 3.83

Interpretación:
- TWR > 2: Excelente (drones racing)
- TWR 1.5-2: Bueno (aerial photo)
- TWR < 1.5: Pobre

Este drone tiene performance excepcional (3.83).

3. ESTIMATED HOVER CURRENT:

En hover, thrust = weight
50% throttle aproximadamente

Current_hover ≈ 0.5 × (Kv × V / 1000) × 4 motors
Current_hover ≈ 0.5 × (2300 × 11.1 / 1000) × 4
Current_hover ≈ 51 A

4. THEORETICAL MAX SPEED:

Usando potencia disponible:
P_max = V × I_max = 11.1V × 100A = 1110 W
Con eficiencia de prop η = 70%:
P_effective = 777 W

V_max ≈ (2 × P_effective / (ρ × A × Cd))^(1/3)
Donde:
- ρ = 1.225 kg/m³ (air density)
- A = frontal area ≈ 0.05 m²
- Cd = 0.7 (drag coefficient estimate)

V_max ≈ 25 m/s ≈ 90 km/h

5. POWER LOADING:

Power_loading = Weight / Power
Power_loading = 1.2 kg / (11.1V × 51A)
Power_loading = 1.2 / 566 W = 2.12 kg/kW

Lower is better (más eficiente).
Benchmark: 1.5-2.5 kg/kW típico.
```

"Cálculos que normalmente requieren software especializado o mucho tiempo."
```

---

### 🔷 PARTE 3: Diseño Conceptual Asistido (30 minutos)

#### **18:55 - 19:25 (30 min) - DEMO: Diseño de UAV**

💻 **LIVE DEMO**: Diseño conceptual con IA

**Proyecto: Fixed-Wing UAV para Fotografía Aérea**

**Paso 1: Requirements y Trade-offs (10 min)**

```
Prompt en OpenCode:
"Voy a diseñar un fixed-wing UAV para fotografía aérea de terrenos agrícolas.

Requirements:
- Endurance: mínimo 60 minutos
- Payload: Cámara 300g
- Operación: Autónoma con GPS waypoints
- Altitud operacional: 100-150m AGL
- Velocidad crucero: 15-20 m/s
- Launch: Hand launch
- Recovery: Belly landing con foam

Ayúdame a:
1. Definir configuración óptima (high-wing vs mid-wing, tractor vs pusher)
2. Estimar dimensiones principales (wingspan, chord, etc.)
3. Trade-offs clave
4. Selección de powerplant
5. Budget estimado de peso

Dame análisis detallado con justificaciones."

[OpenCode genera análisis completo - mostrar secciones key]

---

ANÁLISIS DE CONFIGURACIÓN:
===========================

1. CONFIGURACIÓN ÓPTIMA:

Recomendación: **High-Wing, Pusher Configuration**

Justificación:
✅ High-Wing:
  - Mayor estabilidad lateral (dihedral effect)
  - Protección de cámara ventral
  - Mejor para hand launch
  - FOV despejado hacia abajo

✅ Pusher (motor en cola):
  - Nose libre para cámara/sensores
  - Reduce vibración en payload
  - Mejor para belly landing (protege prop)
  
❌ Descartadas:
  - Tractor: Vibración en cámara, FOV obstruida por prop
  - Mid/Low-wing: Más compleja para hand launch

2. DIMENSIONES PRINCIPALES (Estimación Inicial):

Usando ratios típicos y wing loading analysis:

Target wing loading: 35-45 g/dm² (para hand launch capability)

Peso total estimado (MTOW):
- Estructura: 600g
- Battery: 500g
- Motor+ESC+prop: 200g
- Electronics: 150g
- Payload: 300g
TOTAL: ~1750g (call it 1.8kg con margen)

Wingspan:
Para wing loading de 40 g/dm²:
Wing area = 1800g / 40 = 45 dm² = 0.45 m²

Aspect ratio típico UAV fotográfico: 8-10
Usando AR=9:

Wingspan = √(AR × S) = √(9 × 0.45) = 2.01 m ≈ 2.0 m

Chord promedio:
c = S / b = 0.45 / 2.0 = 0.225 m = 22.5 cm

3. TRADE-OFFS PRINCIPALES:

| Aspecto | Opción A | Opción B | Recomendación |
|---------|----------|----------|---------------|
| Wingspan | 2.0m (endurance) | 1.5m (portability) | **2.0m** - endurance es priority |
| Battery | 3S 5000mAh | 4S 4000mAh | **3S 5000mAh** - longer flight |
| Airfoil | Flat bottom (simple) | Semi-symmetric | **Flat bottom** - easier build, stable |
| Material | EPO foam | Balsa+film | **EPO** - durable for belly landing |

[... continúa con análisis completo]

"IA no diseña el avión por ustedes, pero acelera tremendamente 
la exploración de opciones."
```

**Paso 2: Generar Dibujos Conceptuales (10 min)**

```
Prompt:
"Basándote en el diseño anterior, genera:

1. Vista 3-vistas (top, side, front) en ASCII art o descripción detallada
2. Especificaciones completas
3. Diagrama de balance (CG location)
4. Parts list para construcción"

[OpenCode genera - mostrar spec sheet]:

---

UAV SPECIFICATION SHEET:
========================

Model: AgriScout UAV
Mission: Agricultural Aerial Photography

GENERAL:
--------
Type: Fixed-wing, High-wing, Pusher
Wingspan: 2.00 m
Length: 1.20 m
Height: 0.25 m
Wing Area: 0.45 m²
Aspect Ratio: 9:1
MTOW: 1.80 kg
Wing Loading: 40 g/dm²

AERODYNAMICS:
-------------
Airfoil: Clark Y modified
Dihedral: 3°
Sweep: 0°
Taper Ratio: 1:1 (rectangular wing)
Estimated L/D: 12:1
Stall Speed: ~8 m/s
Cruise Speed: 17 m/s
Max Speed: 25 m/s

PROPULSION:
-----------
Motor: Brushless 2212 1000KV
ESC: 30A
Propeller: 10x6 pusher
Battery: 3S 5000mAh LiPo (11.1V nominal)
Estimated Current: 15-20A cruise

PERFORMANCE (Estimated):
------------------------
Endurance: 65-75 minutes
Range: 60-70 km
Service Ceiling: 500m AGL
Rate of Climb: 3-5 m/s

CENTER OF GRAVITY:
------------------
CG Location: 28-32% MAC (mean aerodynamic chord)
From nose: ~380-400mm

CONTROL SURFACES:
-----------------
Elevator: 200mm span, 50mm chord
Rudder: 150mm height, 60mm chord
(No ailerons - stable platform, dihedral provides roll stability)

PAYLOAD:
--------
Camera Bay: 100x80x60mm
Payload Capacity: 300g
Mounting: Vibration-isolated platform
Power: 5V regulated from main battery

---

"Spec sheet completo. Ahora pueden construir o simular."
```

**Paso 3: Análisis de Estabilidad (10 min)**

```
Prompt:
"Analiza la estabilidad estática longitudinal de este diseño.

Datos:
- CG at 30% MAC
- Wing AC (aerodynamic center) at 25% MAC
- Horizontal tail arm: 0.80m from CG
- Tail area: 0.08 m²
- Wing area: 0.45 m²

Calcula:
1. Static margin
2. Horizontal tail volume coefficient
3. Predicción de estabilidad"

[OpenCode calcula]:

```
ANÁLISIS DE ESTABILIDAD:
========================

1. STATIC MARGIN (SM):

SM = (X_np - X_cg) / MAC

Donde:
- X_np = Neutral point
- X_cg = Center of gravity

Para configuración tail-aft:
X_np ≈ X_ac_wing + (η × V_H × S_t / S_w)

Donde:
- η = tail efficiency ≈ 0.9
- V_H = horizontal tail volume ratio
- S_t = tail area = 0.08 m²
- S_w = wing area = 0.45 m²

Primero calcular V_H...

2. HORIZONTAL TAIL VOLUME COEFFICIENT (V_H):

V_H = (L_t × S_t) / (MAC × S_w)

Donde:
- L_t = tail arm = 0.80 m
- MAC = chord = 0.225 m

V_H = (0.80 × 0.08) / (0.225 × 0.45)
V_H = 0.064 / 0.101 = 0.633

Interpretación:
- V_H típico: 0.5-0.8
- Este valor (0.633) es adecuado ✅

3. NEUTRAL POINT CALCULATION:

X_np = 0.25 × MAC + (0.9 × 0.633 × 0.08/0.45)
X_np = 0.25 + 0.101
X_np = 0.351 × MAC = 35.1% MAC

4. STATIC MARGIN:

SM = (35.1% - 30%) / 100% = 5.1%

INTERPRETACIÓN:
===============

Static Margin de 5.1%:

✅ ESTABLE (SM > 0%)
- Positive stability margin
- Aircraft will naturally return to trim after disturbance

Guidelines:
- SM < 0%: Inestable (requiere control continuo)
- SM 0-5%: Débilmente estable
- SM 5-15%: Estable (óptimo para UAV)
- SM > 15%: Muy estable (difícil maniobrar)

Conclusión:
Este diseño tiene estabilidad adecuada para operación autónoma.
CG location de 30% MAC es apropiada.

RECOMENDACIONES:
- Mantener CG range: 28-32% MAC
- Si CG más adelante: más estable pero menos maniobrable
- Si CG más atrás: menos estable pero más efficient

⚠️ NOTA IMPORTANTE:
Este es análisis preliminar. Para avión real, usar:
- Software de análisis (XFLR5, AVL, etc.)
- Wind tunnel testing
- Flight testing con telemetría
```

"Análisis que normalmente requiere software especializado."
```

---

### 🔷 PARTE 4: Ejercicio + Cierre (25 minutos)

#### **19:25 - 19:40 (15 min) - Ejercicio Práctico**

**EJERCICIO**:
```
Elige tu proyecto:

Opción A - Analysis:
Tienes datos de flight test (inventados o reales). Usa IA para:
- Procesar datos
- Identificar problems
- Generar reporte

Opción B - Design:
Diseña UAV para tu caso de uso específico con IA:
- Define requirements
- Pide análisis de configuración
- Genera spec sheet

Opción C - Learning:
Pide a IA que te explique un concepto aerodinámico que no entiendas:
- Boundary layer
- Lift distribution
- Compressibility effects
- etc.

Tiempo: 15 minutos
```

---

#### **19:40 - 19:55 (15 min) - Compartir + Discusión**

```
[Revisar ejemplos del chat]

[Discusión técnica de casos interesantes]

[Q&A sobre aplicaciones en proyectos reales]
```

---

#### **19:55 - 20:00 (5 min) - Cierre de Clase 5**

**RESUMEN**:
```
Lo que aprendimos:
✅ Análisis de performance de vuelo
✅ Procesamiento de telemetría
✅ Diseño conceptual asistido
✅ Cálculos aerodinámicos
✅ Análisis de estabilidad

⚠️ RECORDAR SIEMPRE:
- IA para conceptos e iteración rápida
- Validación con herramientas profesionales
- Safety-critical: siempre consultar experto
- Certificación: NO depender solo de IA
```

**PRÓXIMA CLASE - LA ÚLTIMA**:
```
📅 Clase 6 - Lunes, Febrero 9
Open Forum + Student Projects

¡Traigan sus proyectos, ideas, preguntas!

Nos vemos el lunes para cierre del taller. 🎉
¡Buen fin de semana!
```

---

_Creado para: Talleres de Verano FP-UNA 2026_
