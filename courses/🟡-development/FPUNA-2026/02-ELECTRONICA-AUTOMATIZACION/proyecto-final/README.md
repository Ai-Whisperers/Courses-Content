# Capstone: Smart Home Automation System
## Track 02 - Electronics & Automation

**Duración**: 20 horas extra-clase  
**Peso**: 50% de calificación final

---

## Descripción

Diseñar e implementar sistema completo de automatización del hogar inteligente, integrando todos los conceptos aprendidos.

---

## Requisitos del Proyecto

### 1. Hardware Design

**Circuit Design**:
- Power supply (5V/3.3V regulated)
- Sensor interfaces (3+ sensors)
- Actuator drivers (relays, servos)
- Protection circuits

**PCB Design**:
- 2-layer PCB
- Arduino/ESP32 compatible
- Modular design
- Manufacturing-ready Gerbers

### 2. Firmware Development

**Core Features**:
- Multi-sensor reading
- Real-time control
- WiFi connectivity
- MQTT communication
- Web interface
- OTA updates

**AI Integration**:
- Voice control (optional)
- Predictive automation
- Energy optimization
- Anomaly detection

### 3. IoT Integration

**Cloud Services**:
- MQTT broker
- ThingSpeak logging
- Dashboard (Grafana)
- Mobile app (Blynk)

**Data Analytics**:
- Historical trends
- Usage patterns
- Alerts & notifications
- AI insights

### 4. Automation Logic

**Features** (implement min 5):
- ✅ Temperature control
- ✅ Lighting automation
- ✅ Security system
- ✅ Energy monitoring
- ✅ Weather-based control
- ✅ Presence detection
- ✅ Voice commands
- ✅ Scheduling

---

## System Architecture

```
┌─────────────────────────────────────┐
│         Sensors (Physical)          │
│  - DHT22 (temp/humidity)            │
│  - PIR (motion)                     │
│  - LDR (light)                      │
│  - Current sensor                   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│          ESP32 Controller           │
│  - Read sensors                     │
│  - Execute logic                    │
│  - Control actuators                │
│  - MQTT client                      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Actuators (Physical)        │
│  - Relays (lights, appliances)      │
│  - Servos (blinds, locks)           │
│  - Buzzer (alarms)                  │
└─────────────────────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Cloud (MQTT Broker)           │
│  - Message routing                  │
│  - Data persistence                 │
└──────────────┬──────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
┌─────▼─────┐   ┌───────▼────────┐
│ Dashboard │   │  Mobile App    │
│ (Grafana) │   │  (Blynk)       │
└───────────┘   └────────────────┘
```

---

## Entregables

### Hardware
1. **Circuit Schematic** (LTSpice/KiCad)
2. **PCB Layout** (KiCad project)
3. **Gerber Files** (manufacturing-ready)
4. **BOM** (Bill of Materials con precios ₲)

### Software
5. **ESP32 Firmware** (Arduino/PlatformIO)
6. **Web Interface** (HTML/CSS/JS)
7. **Configuration Files** (WiFi, MQTT, etc.)

### Cloud & Visualization
8. **Grafana Dashboard** (screenshots + JSON)
9. **MQTT Topics Structure** (documentation)
10. **Blynk App** (setup guide)

### Documentation
11. **System Architecture** (diagrams)
12. **User Manual** (en español)
13. **Installation Guide**
14. **AI Prompts Used** (log)

### Demo
15. **Video Demo** (10 minutos)
    - Hardware overview
    - System working
    - Dashboard & mobile app
    - Automation logic explanation

---

## Estructura del Repositorio

```
fpuna-smart-home-[nombre]/
├── README.md
├── hardware/
│   ├── schematics/
│   │   └── main-circuit.sch
│   ├── pcb/
│   │   ├── smart-home.kicad_pro
│   │   └── gerbers/
│   └── bom.xlsx
├── firmware/
│   ├── src/
│   ├── lib/
│   ├── platformio.ini
│   └── README.md
├── web-interface/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── cloud/
│   ├── grafana-dashboard.json
│   ├── mqtt-topics.md
│   └── blynk-setup.md
├── docs/
│   ├── architecture.pdf
│   ├── user-manual.pdf
│   ├── installation-guide.pdf
│   └── ai-prompts.md
└── demo/
    └── video-link.txt
```

---

## Evaluación (50% nota final)

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **Hardware Design** | 20% | Circuit + PCB quality, manufacturing-ready |
| **Firmware** | 20% | Code quality, features, reliability |
| **IoT Integration** | 15% | Cloud connectivity, dashboard, mobile app |
| **Automation Logic** | 15% | Smart features, AI integration |
| **Documentation** | 15% | Complete, clear, professional |
| **Demo** | 10% | Video quality, explanation, working system |
| **Innovation** | 5% | Creative features, unique approach |

**Total**: 100 puntos

---

## Rúbrica Detallada

Ver: [rubrica.md](./rubrica.md)

---

## Timeline Sugerido

| Semana | Actividad |
|--------|-----------|
| **Semana 2** | Hardware design (circuit + PCB) |
| **Semana 3** | PCB fabrication + firmware dev |
| **Semana 4** | IoT integration + cloud setup |
| **Semana 5** | Testing + automation logic |
| **Semana 6** | Documentation + video demo |

**Deadline**: 6 semanas después de iniciar track

---

## Hardware Requirements

### Mínimo (para aprobar)
- ESP32 DevKit
- 3 sensors (DHT22, PIR, LDR)
- 2 relays
- Power supply
- Breadboard/PCB

**Costo aprox**: ~USD 30-40

### Completo (para distinción)
- Todo lo anterior +
- Additional sensors
- Servo motors
- OLED display
- Professional PCB

**Costo aprox**: ~USD 50-70

---

## Recursos

### Hardware Suppliers (Paraguay)
- Electrónica AYALA (Asunción)
- Casa Nissei
- Online: AliExpress, Amazon

### Software Tools
- KiCad (free, PCB design)
- Arduino IDE / PlatformIO (free)
- Grafana Cloud (free tier)
- ThingSpeak (free)
- Blynk (free tier)

### Learning Resources
- Arduino Docs
- ESP32 Docs
- MQTT.org
- Grafana Tutorials

---

## FAQs

### ¿Necesito fabricar el PCB?
**Opcional**. Puedes usar breadboard + perfboard. PCB suma puntos.

### ¿Dónde fabricar PCB en Paraguay?
**No hay fabricantes locales**. Usar JLCPCB (~USD 5 + shipping, 2-3 semanas).

### ¿Puedo trabajar en equipo?
**No**. Proyecto individual.

### ¿Qué pasa si no funciona todo?
Entrega lo que tengas. Documenta qué funciona y qué no.

---

## Inspiración

Proyectos similares:
- Home Assistant
- OpenHAB
- Tasmota
- ESPHome

**NO copies código completo**. Úsalos como referencia.

---

## Soporte

- **Slack**: #electronics-capstone
- **Office Hours**: Viernes 18:00-20:00
- **Email**: electronics-instructor@fpuna.edu.py

---

## Próximos Pasos

1. ✅ Revisar [rubrica.md](./rubrica.md)
2. ✅ Definir features del sistema
3. ✅ Diseñar circuito
4. ✅ Ordenar componentes
5. ✅ Empezar con firmware
6. ✅ Iterar y mejorar

**¡A construir! 🔧⚡**

---

*Capstone Project - Track 02 Electronics - FPUNA 2026*
