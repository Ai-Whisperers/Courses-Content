# Track 02: Electronics & Automation with AI
## FPUNA Verano 2026 - REVISED CURRICULUM

**Duración**: Semana 2 (20 horas clase + 15-40 horas proyecto)
**Modalidad**: Hands-on con hardware real y simulación
**Filosofía**: Construir sistemas reales con desarrollo acelerado por IA

---

## Cambio de Enfoque

### Antes (Problemático)
> "Aprender electrónica con asistencia de IA"
> - 5 módulos ambiciosos en 20 horas
> - Un capstone que requiere todo
> - IA como requisito evaluado

### Ahora (Realista)
> "Construir sistemas funcionales que resuelven problemas reales"
> - Módulos enfocados en habilidades aplicables
> - Proyectos escalonados por ambición del estudiante
> - IA como acelerador, comprensión como evaluación

---

## ¿Por Qué Electronics con IA?

### Mercado en Paraguay

| Sector | Aplicaciones | Demanda |
|--------|--------------|---------|
| **Agricultura** | Riego automatizado, monitoreo de cultivos | Alta |
| **Energía** | Monitoreo solar, eficiencia energética | Creciente |
| **Manufactura** | Industria 4.0, automatización | Alta |
| **IoT/Smart Systems** | Domótica, ciudades inteligentes | Emergente |

**Salarios**: ₲10M-25M/mes (técnicos a ingenieros senior)

### Dónde IA Realmente Acelera

| Tarea | Sin IA | Con IA | Ahorro |
|-------|--------|--------|--------|
| Interpretar datasheet nuevo | 2-4 hrs | 30-60 min | 70-80% |
| Implementar driver de sensor | 3-6 hrs | 30-90 min | 75-85% |
| Debuggear comunicación I2C/SPI | 2-4 hrs | 15-60 min | 75-90% |
| Implementar protocolo MQTT | 4-8 hrs | 1-2 hrs | 75% |
| Crear documentación técnica | 2-3 hrs | 15-30 min | 85-90% |

---

## Módulos (20 horas clase)

### Módulo 01: Fundamentos de Circuitos y Sensores (4h)

**Objetivo**: Entender circuitos básicos y conectar sensores correctamente.

**Contenido**:
- Ley de Ohm aplicada (divisores de voltaje, LEDs)
- Lectura de datasheets con IA (extracción de specs clave)
- Conexión de sensores comunes (DHT22, LDR, ultrasonido)
- Protección de entradas/salidas

**Práctica**:
- Circuito sensor de temperatura con alerta LED
- IA genera código inicial, estudiante explica funcionamiento

**IA Value**: ALTO - Interpretación de datasheets

---

### Módulo 02: Diseño de PCB Básico (4h)

**Objetivo**: Crear un PCB simple pero funcional.

**Contenido**:
- Anatomía de PCB (capas, trazas, vías)
- KiCAD: esquemático → layout
- Reglas de diseño básicas (ancho de traza, clearance)
- Generación de Gerbers

**Práctica**:
- Shield Arduino simple (2-3 conectores + LED)
- Estudiante modifica template existente

**IA Value**: MEDIO - Cálculos de ancho de traza, verificación DRC

**Nota**: PCB fabricado es OPCIONAL (bonus points). Breadboard/perfboard es aceptable.

---

### Módulo 03: Firmware con ESP32 (4h)

**Objetivo**: Programar microcontroladores con conectividad WiFi.

**Contenido**:
- GPIO, ADC, PWM en ESP32
- Timing no-bloqueante (millis vs delay)
- WiFi y MQTT básico
- Manejo de errores

**Práctica**:
- Sensor IoT que publica datos a broker MQTT
- IA genera boilerplate, estudiante agrega lógica

**IA Value**: ALTO - Generación de código de conectividad, debugging

---

### Módulo 04: Lógica de Automatización (4h) ← SIMPLIFICADO

**Objetivo**: Diseñar lógica de control estructurada.

> **CAMBIO**: Eliminado PLC/SCADA industrial (demasiado ambicioso).
> Enfoque en patrones de automatización aplicables a proyectos.

**Contenido**:
- Máquinas de estados finitos (FSM)
- Control on/off con histéresis
- Introducción a PID (conceptual + biblioteca)
- Scheduling y condiciones múltiples

**Práctica**:
- FSM para sistema de riego (estados: IDLE, CHECKING, WATERING, WAITING)
- Control de temperatura con histéresis

**IA Value**: ALTO - Diseño de FSM, explicación de PID

---

### Módulo 05: Integración y Visualización (4h)

**Objetivo**: Conectar todo y visualizar datos.

**Contenido**:
- MQTT topics y payloads JSON
- ThingSpeak para logging básico
- Grafana dashboard simple
- Debugging de sistemas integrados

**Práctica**:
- Dashboard mostrando datos de sensor en tiempo real
- Estudiante configura alertas y visualizaciones

**IA Value**: MEDIO - Configuración, troubleshooting de conexiones

---

## Sistema de Proyectos Escalonados

### Filosofía

En lugar de un capstone único y sobrecargado, los estudiantes eligen un proyecto según su ambición y tiempo disponible. **La complejidad elegida afecta las expectativas, no la calificación máxima.**

### Tres Niveles

| Nivel | Tiempo Extra | Costo Hardware | Perfil del Estudiante |
|-------|--------------|----------------|----------------------|
| **Principiante** | 15-20h | $15-25 USD | Primera vez con hardware |
| **Intermedio** | 25-35h | $30-50 USD | Experiencia básica Arduino |
| **Avanzado** | 40-60h | $60-100 USD | Quiere desafío significativo |

### Proyectos por Nivel

#### PRINCIPIANTE (15-20h extra)

| Proyecto | Hardware | Qué Aprende |
|----------|----------|-------------|
| **Semáforo Inteligente** | Arduino + LEDs + LDR | FSM, timing, sensores analógicos |
| **Monitor de Temperatura** | ESP32 + DHT22 + LCD | Sensores digitales, I2C, display |
| **Alarma de Proximidad** | Arduino + HC-SR04 + Buzzer | Ultrasonido, cálculos físicos |
| **Control de Motor** | Arduino + L298N + Potenciómetro | PWM, drivers, potencia |

**Entregables Principiante**:
- Circuito funcional en breadboard
- Código comentado
- Diagrama de conexiones
- Video demo 3-5 min
- Explicación escrita del funcionamiento

---

#### INTERMEDIO (25-35h extra)

| Proyecto | Hardware | Qué Aprende |
|----------|----------|-------------|
| **Sistema de Riego 2 Zonas** | ESP32 + 2 soil sensors + 2 relays | Multi-sensor, scheduling, lógica condicional |
| **Nodo IoT con MQTT** | ESP32 + DHT22 + relay | WiFi, MQTT, JSON, cloud logging |
| **Control PID de Temperatura** | ESP32 + DHT22 + relay calefactor | Teoría de control, tuning |
| **Control de Acceso RFID** | ESP32 + RC522 + servo | RFID, EEPROM, seguridad básica |
| **Estación Meteorológica** | ESP32 + DHT22 + BMP280 + SD | Multi-sensor, logging, SPI |

**Entregables Intermedio**:
- Circuito funcional (breadboard o perfboard)
- Código estructurado con manejo de errores
- Esquemático en KiCAD
- Dashboard básico (ThingSpeak o similar)
- Video demo 5-7 min con explicación técnica
- Documentación de arquitectura

---

#### AVANZADO (40-60h extra)

| Proyecto | Hardware | Qué Aprende |
|----------|----------|-------------|
| **Mini-SCADA de Tanque** | ESP32 + sensor nivel + bomba + Raspberry Pi | Arquitectura multi-capa, Node-RED |
| **Monitor de Energía Solar** | ESP32 + ACS712 + divisor voltaje | Mediciones eléctricas, cálculos de potencia |
| **Dispositivo Modbus RTU** | Arduino Mega + MAX485 + I/O industrial | Protocolos industriales, RS-485 |
| **Sistema OEE Simplificado** | ESP32 + sensor inductivo + display | Métricas de manufactura |

**Entregables Avanzado**:
- Todo lo de Intermedio +
- PCB diseñado en KiCAD (fabricación opcional)
- Gerbers listos para manufactura
- Dashboard completo (Grafana)
- Documentación profesional
- Video demo 8-10 min

---

## Evaluación Revisada

### Distribución de Puntos

| Componente | Peso | Descripción |
|------------|------|-------------|
| **Ejercicios de Módulos** | 25% | 5 ejercicios prácticos (uno por módulo) |
| **Proyecto Final** | 50% | Según nivel elegido |
| **Comprensión Demostrada** | 15% | Preguntas sobre el proyecto (ver abajo) |
| **Participación** | 10% | Asistencia, preguntas, colaboración |

### Evaluación de Comprensión (15%)

**NO evaluamos**: "¿Cuántos prompts de IA usaste?"

**SÍ evaluamos**: "¿Entiendes lo que construiste?"

**Preguntas de ejemplo**:
1. "Explica cómo tu controlador PID mantiene la temperatura estable"
2. "¿Qué pasa si se pierde la conexión WiFi? Muestra el código que lo maneja"
3. "Calcula la corriente que pasa por el relay y explica el circuito de protección"
4. "¿Por qué usaste millis() en lugar de delay()? ¿Qué problema evita?"
5. "Si el sensor da lecturas erráticas, ¿qué pasos seguirías para debuggear?"

**Formato**: Entrevista de 10-15 minutos o preguntas escritas con el código abierto.

---

## Rúbricas por Nivel

### Rúbrica Nivel PRINCIPIANTE (100 pts)

| Criterio | Excelente (90-100%) | Bueno (70-89%) | Suficiente (50-69%) | Insuficiente (<50%) |
|----------|---------------------|----------------|---------------------|---------------------|
| **Funcionalidad (40 pts)** | Sistema funciona completamente, maneja casos edge | Funciona en casos normales | Funciona parcialmente | No funciona |
| **Código (25 pts)** | Limpio, comentado, estructurado | Funcional, algunos comentarios | Funciona pero desordenado | Difícil de entender |
| **Documentación (20 pts)** | Diagrama claro, explicación completa | Documentación adecuada | Documentación mínima | Sin documentación |
| **Demo (15 pts)** | Video claro mostrando todo | Video aceptable | Video básico | Sin video o muy pobre |

---

### Rúbrica Nivel INTERMEDIO (100 pts)

| Criterio | Excelente (90-100%) | Bueno (70-89%) | Suficiente (50-69%) | Insuficiente (<50%) |
|----------|---------------------|----------------|---------------------|---------------------|
| **Funcionalidad (30 pts)** | Todas las features, robusto | Mayoría funciona | Features básicos | Muchos problemas |
| **Código (20 pts)** | Modular, manejo errores, bien estructurado | Organizado, algunos errores manejados | Funcional | Pobre calidad |
| **Hardware (20 pts)** | Esquemático completo, conexiones limpias | Esquemático presente, breadboard ordenado | Esquemático básico | Sin esquemático |
| **IoT/Cloud (15 pts)** | Dashboard completo, datos en tiempo real | Dashboard funcional | Conexión básica | No conecta |
| **Documentación (10 pts)** | Profesional, arquitectura clara | Adecuada | Mínima | Ausente |
| **Demo (5 pts)** | Profesional, explica bien | Bueno | Básico | Pobre |

---

### Rúbrica Nivel AVANZADO (100 pts)

| Criterio | Excelente (90-100%) | Bueno (70-89%) | Suficiente (50-69%) | Insuficiente (<50%) |
|----------|---------------------|----------------|---------------------|---------------------|
| **Funcionalidad (25 pts)** | Sistema completo, edge cases, recuperación de errores | Funciona bien | Funciona básicamente | Problemas significativos |
| **Firmware (20 pts)** | Código profesional, FSM, manejo robusto | Bien estructurado | Funcional | Pobre |
| **Hardware Design (20 pts)** | PCB listo para fabricar, BOM completo | Esquemático profesional | Diseño básico | Incompleto |
| **Integración (15 pts)** | Multi-capa funcional, protocols correctos | Integración funcional | Conexión básica | Problemas de integración |
| **Documentación (10 pts)** | Nivel profesional | Completa | Adecuada | Insuficiente |
| **Demo + Comprensión (10 pts)** | Explica todo profundamente | Buena explicación | Explicación básica | No puede explicar |

---

## Bonus Points (Todos los Niveles)

| Bonus | Puntos | Descripción |
|-------|--------|-------------|
| PCB fabricado e instalado | +5 | Ordenaste y soldaste tu PCB |
| Enclosure impreso 3D | +3 | Diseñaste carcasa funcional |
| Feature adicional creativo | +3 | Algo no pedido pero útil |
| Documentación bilingüe | +2 | Español + Inglés |

**Máximo bonus**: +10 puntos (no excede 110 total)

---

## Uso de IA: Framework GREEN/YELLOW/RED

### GREEN: Usar Libremente
- Explicar términos/acrónimos desconocidos
- Generar comentarios de código
- Crear templates de documentación
- Referencia rápida de sintaxis
- Brainstorming de ideas

### YELLOW: Usar con Verificación
- Generación de código de inicialización (verificar funcionamiento)
- Búsqueda de parámetros en datasheets (verificar en datasheet real)
- Implementación de protocolos (adaptar a tu hardware)
- Hipótesis de troubleshooting (probar cada una)

### RED: Aprenderlo Primero
- Análisis de circuitos fundamentales (Ohm, Kirchhoff)
- Entender POR QUÉ funciona el circuito
- Debugging físico con instrumentos
- Técnicas de medición
- Primer encuentro con cualquier tema nuevo

---

## Hardware Recomendado

### Kit Mínimo (Principiante) ~$20-25 USD
- Arduino UNO o Nano
- Breadboard + jumpers
- LEDs surtidos + resistencias
- DHT11 sensor
- HC-SR04 ultrasonido
- Potenciómetro 10K
- Buzzer

### Kit Intermedio ~$35-50 USD
- ESP32 DevKit
- DHT22 sensor
- Relay module 2-channel
- LCD 16x2 con I2C
- Sensor de humedad de suelo capacitivo
- Fuente 5V 2A

### Kit Avanzado ~$60-100 USD
- Todo lo anterior +
- BMP280 (presión)
- ACS712 (corriente)
- MAX485 module
- SD card module
- RTC DS3231

### Proveedores en Paraguay
- Electrónica Japonesa (Asunción)
- Casa Nissei
- Mercado Libre Paraguay
- AliExpress (2-4 semanas)

### Fabricación de PCB
- JLCPCB: ~$2-5 USD + envío ($15-20), 2-3 semanas
- **Nota**: Si necesitas iterar, considera breadboard primero

---

## Timeline Sugerido

### Semana 2 (Clase)
| Día | Módulo | Entregable |
|-----|--------|------------|
| Lunes | 01: Circuitos y Sensores | Ejercicio sensor |
| Martes | 02: PCB Básico | Esquemático simple |
| Miércoles | 03: Firmware ESP32 | Código MQTT |
| Jueves | 04: Lógica Automatización | Diseño FSM |
| Viernes | 05: Integración | Mini-dashboard |

### Semanas 3-6 (Proyecto)
| Semana | Principiante | Intermedio | Avanzado |
|--------|--------------|------------|----------|
| 3 | Diseño + componentes | Diseño + esquemático | Diseño + PCB layout |
| 4 | Construcción + código | Construcción + firmware | PCB + firmware |
| 5 | Testing + documentación | IoT + testing | Integración + testing |
| 6 | Demo | Documentación + demo | Documentación + demo |

---

## Preguntas Frecuentes

### ¿Puedo cambiar de nivel después de empezar?
Sí, hasta la semana 4. Avisa al instructor.

### ¿Qué pasa si mi proyecto no funciona completamente?
Documenta qué funciona y qué no. La comprensión del problema vale puntos.

### ¿Puedo usar código generado por IA?
Sí, pero debes poder explicar cada línea si se te pregunta.

### ¿Necesito fabricar el PCB?
No. Es bonus. Breadboard/perfboard es válido para todos los niveles.

### ¿Puedo proponer un proyecto diferente?
Sí, con aprobación del instructor antes de semana 3.

---

## Contacto

- **Slack**: #electronics-automation-2026
- **Office Hours**: Viernes 18:00-20:00
- **Email**: electronics-instructor@fpuna.edu.py

---

---

## Recursos Compartidos (COMPARTIDO)

Este track utiliza recursos del directorio compartido de FPUNA:

| Recurso | Descripción | Link |
|---------|-------------|------|
| **Instalación OpenCode** | Guías de instalación por plataforma | [Ver guía](../../../../_compartido/04-utilidades-ia/configuracion-inicial/guide.md) |
| **Configuración MCPs** | Cómo configurar Model Context Protocol | [Ver guía](../../../../_compartido/04-utilidades-ia/guias-mcp/README.md) |
| **Sistema de Skills** | Automatización con skills reutilizables | [Ver guía](../../../../_compartido/04-utilidades-ia/sistema-skills/README.md) |
| **Seguridad en Ingeniería** | Framework de seguridad y límites de IA | [Ver guía](../../../../_compartido/02-estandares-y-calidad/seguridad-ingenieria/README.md) |
| **Plantillas de Proyecto** | Templates para iniciar proyectos | [Ver plantillas](../../../../_compartido/03-plantillas-de-contexto/README.md) |
| **Hooks y Reglas** | Automatización con git hooks | [Ver guía](../../../../_compartido/04-utilidades-ia/hooks-reglas/README.md) |

### Antes de Empezar

1. Completar [00-FUNDAMENTOS](../00-FUNDAMENTOS/README.md)
2. Instalar OpenCode siguiendo [guía de instalación](../../../../_compartido/04-utilidades-ia/configuracion-inicial/guide.md)
3. Revisar [seguridad en hardware](../../../../_compartido/02-estandares-y-calidad/seguridad-ingenieria/seguridad-hardware.md)

---

*Track 02 - Electronics & Automation - FPUNA 2026 (Revised Curriculum)*
