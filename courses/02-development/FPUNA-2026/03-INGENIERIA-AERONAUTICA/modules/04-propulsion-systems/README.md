# Modulo 04: Sistemas de Propulsion

## Duracion: 4 horas

---

## Descripcion

Aprende a disenar y dimensionar el sistema de propulsion de tu UAV: seleccion de motor, helice, bateria, y ESC. Calcula autonomia, empuje disponible, y optimiza el sistema usando IA.

---

## Objetivos de Aprendizaje

Al finalizar este modulo, podras:

1. **Calcular** potencia requerida para vuelo
2. **Seleccionar** motor electrico apropiado
3. **Dimensionar** helice para empuje/eficiencia
4. **Calcular** autonomia con baterias LiPo
5. **Usar** codigo Python para analisis de propulsion

---

## Contenido

### Parte 1: Requerimientos de Potencia (1 hora)

| Tema | Descripcion |
|------|-------------|
| Potencia requerida | P = D * V = (1/2) * rho * V^3 * S * CD |
| Potencia disponible | P_motor * eta_helice |
| Exceso de potencia | Para ascenso y maniobras |
| Punto de diseno | Equilibrio en crucero |

### Parte 2: Motores Electricos (1 hora)

| Tema | Descripcion |
|------|-------------|
| Tipos de motores | Brushless outrunner/inrunner |
| Especificaciones | Kv, potencia max, corriente |
| Eficiencia | Curvas de rendimiento |
| Seleccion | Matching con helice |

### Parte 3: Helices y Baterias (1.5 horas)

| Tema | Descripcion |
|------|-------------|
| Teoria de helices | Empuje estatico vs dinamico |
| Nomenclatura | Diametro x Paso |
| Baterias LiPo | Capacidad, C-rate, celdas |
| Calculo de autonomia | E = P * t |

### Parte 4: Codigo Python (30 min)

| Tema | Descripcion |
|------|-------------|
| Scripts de calculo | Usar codigo-ejemplos |
| Telemetria | telemetry_monitor.py |
| Control adaptativo | adaptive_controller.py |

---

## Herramientas Requeridas

| Herramienta | Proposito | Ubicacion |
|-------------|-----------|-----------|
| **Python** | Calculos | Ya instalado |
| **Scripts propulsion** | Analisis | codigo-ejemplos/propulsion/ |
| **eCalc** (opcional) | Verificacion online | [ecalc.ch](https://www.ecalc.ch/) |

---

## Formulas Clave

### Potencia Requerida

```
P_req = D * V = (1/2) * rho * V^3 * S * CD

En nivel, L = W:
CD = CD0 + CL^2/(pi*AR*e)
CL = W / (q * S)
```

### Empuje de Helice (estatico)

```
T_static = K * D^4 * n^2

Donde:
- K = constante (~1e-10 para unidades SI)
- D = diametro helice (m)
- n = RPM
```

### Autonomia

```
t = E_bateria / P_consumida

E_bateria (Wh) = Voltaje * Capacidad (Ah)
P_consumida (W) = I * V

Ejemplo:
4S LiPo 5000mAh = 14.8V * 5Ah = 74 Wh
P_crucero = 200W
t = 74/200 = 0.37 h = 22 min
```

---

## Valores Tipicos para UAV (3-5 kg)

| Componente | Especificacion Tipica |
|------------|----------------------|
| Motor | 800-1200 Kv, 400-600W |
| Helice | 10x6 a 12x6 |
| Bateria | 4S 5000-8000mAh |
| ESC | 40-60A |
| Empuje estatico | 1.5-2x peso |
| Autonomia | 20-40 minutos |

---

## Codigo Disponible

### telemetry_monitor.py

Monitoreo de telemetria con:
- Filtro de Kalman para temperatura
- Deteccion de anomalias (ML)
- Alertas inteligentes

### failure_predictor.py

Prediccion de fallas:
- Degradacion de rodamientos
- Thermal runaway en ESC
- Desbalance de celdas

### adaptive_controller.py

Control PID adaptativo:
- Auto-tuning Ziegler-Nichols
- Compensacion de viento con ML
- Anti-windup

### simple_dashboard.py

Dashboard Streamlit:
- Modo simple (operador)
- Modo experto (ingeniero)
- Visualizacion en tiempo real

---

## Archivos del Modulo

```
04-propulsion-systems/
├── README.md                    # Este archivo
├── content/
│   ├── 01-potencia-requerida.md
│   ├── 02-motores-helices.md
│   └── 03-baterias-autonomia.md
├── EXERCISE.md                  # Ejercicio practico
└── codigo/
    └── -> ver codigo-ejemplos/propulsion/
```

---

## Conexion con Otros Modulos

- **Modulo 02**: Arrastre (CD) determina potencia
- **Modulo 03**: Motor debe soportarse estructuralmente
- **Modulo 05**: Propulsion integra en diseno final

---

*Modulo 04 - Sistemas de Propulsion - Track Aeronautica - FPUNA 2026*
