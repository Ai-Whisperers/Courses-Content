# Proyectos Escalonados - Track 02 Electronics
## Sistema de Elección por Nivel

---

## Filosofía

> **Antes**: Un proyecto monolítico que requiere dominar todo.
> **Ahora**: Elige tu desafío según tu experiencia y ambición.

La calificación máxima es la misma para todos los niveles. Lo que cambia son las expectativas y la complejidad.

---

## Nivel PRINCIPIANTE

**Tiempo**: 15-20 horas extra-clase
**Costo**: $15-25 USD
**Ideal para**: Primera experiencia con hardware, programación básica

---

### Proyecto P1: Semáforo Inteligente con Sensor de Luz

**Descripción**: Semáforo que ajusta tiempos según la luz ambiente (más lento de noche).

**Hardware**:
- Arduino UNO
- 3 LEDs (rojo, amarillo, verde)
- 3 resistencias 220Ω
- LDR + resistencia 10K
- Breadboard, jumpers

**Funcionalidades Requeridas**:
1. Secuencia básica: Verde(5s) → Amarillo(2s) → Rojo(5s)
2. Usar millis() no delay()
3. LDR detecta oscuridad: tiempos x1.5 de noche
4. LED de status que parpadea indicando modo día/noche

**Conceptos que Aprende**:
- Máquina de estados simple
- Timing no-bloqueante
- Sensores analógicos
- Divisor de voltaje

**IA Value**: MEDIO - Ayuda con lógica FSM y millis()

**Entregables**:
- [ ] Circuito funcional en breadboard
- [ ] Código Arduino comentado
- [ ] Diagrama de conexiones (puede ser dibujado)
- [ ] Video demo 3-5 minutos
- [ ] Documento explicando: ¿Por qué millis() y no delay()?

---

### Proyecto P2: Monitor de Temperatura con Alertas

**Descripción**: Sistema que muestra temperatura en LCD y alerta si supera umbral.

**Hardware**:
- Arduino UNO
- DHT11 o DHT22
- LCD 16x2 con I2C
- Buzzer pasivo
- LED rojo (alerta)
- Potenciómetro (ajustar umbral)

**Funcionalidades Requeridas**:
1. Leer temperatura/humedad cada 2 segundos
2. Mostrar en LCD: Temp y Humedad
3. Potenciómetro ajusta umbral de alerta (20-40°C)
4. Si temp > umbral: LED + buzzer
5. Manejo de error si sensor falla

**Conceptos que Aprende**:
- Sensores digitales (protocolo DHT)
- Comunicación I2C
- Manejo de errores
- Interfaz de usuario básica

**IA Value**: ALTO - Interpretación de librería DHT, I2C address finding

**Entregables**:
- [ ] Circuito funcional
- [ ] Código con manejo de errores
- [ ] Diagrama de conexiones
- [ ] Video demo
- [ ] Documento explicando: ¿Cómo funciona I2C?

---

### Proyecto P3: Alarma de Proximidad Ultrasónica

**Descripción**: Sistema de seguridad que detecta intrusos y alerta.

**Hardware**:
- Arduino UNO
- HC-SR04 ultrasonido
- Buzzer activo
- 3 LEDs (verde, amarillo, rojo)
- Botón de armar/desarmar

**Funcionalidades Requeridas**:
1. Medir distancia continuamente
2. Estados: DESARMADO → ARMANDO (5s parpadeo) → ARMADO
3. Si distancia < 50cm en ARMADO: alarma
4. LED verde=desarmado, amarillo=armando, rojo=alarma
5. Botón para armar/desarmar (con debounce)

**Conceptos que Aprende**:
- Sensores ultrasónicos
- Cálculo tiempo→distancia
- Debounce de botones
- Máquina de estados

**IA Value**: MEDIO - Fórmula de distancia, FSM design

**Entregables**:
- [ ] Circuito funcional
- [ ] Código con FSM clara
- [ ] Diagrama de estados ASCII
- [ ] Video demo
- [ ] Documento explicando: ¿Cómo calcula distancia el HC-SR04?

---

### Proyecto P4: Control de Motor DC con Velocidad Variable

**Descripción**: Controlar motor DC con dirección y velocidad.

**Hardware**:
- Arduino UNO
- Motor DC 6-12V
- Driver L298N
- 2 botones (adelante/atrás)
- Potenciómetro (velocidad)
- Fuente externa 9-12V

**Funcionalidades Requeridas**:
1. Potenciómetro controla velocidad (PWM)
2. Botón A: gira adelante
3. Botón B: gira atrás
4. Soltar botones: motor se detiene
5. LED indica dirección

**Conceptos que Aprende**:
- PWM para control de velocidad
- H-Bridge y drivers de motor
- Separación de alimentación (lógica vs potencia)
- Diodos de protección

**IA Value**: ALTO - Explicación de H-Bridge, cálculos de corriente

**Entregables**:
- [ ] Circuito funcional
- [ ] Código
- [ ] Diagrama incluyendo alimentación separada
- [ ] Video demo
- [ ] Documento: ¿Por qué necesitas driver L298N?

---

## Nivel INTERMEDIO

**Tiempo**: 25-35 horas extra-clase
**Costo**: $30-50 USD
**Ideal para**: Experiencia básica con Arduino, quiere aprender IoT

---

### Proyecto I1: Sistema de Riego Automático 2 Zonas

**Descripción**: Riego inteligente con dos zonas independientes.

**Hardware**:
- ESP32 DevKit
- 2x Sensor humedad suelo capacitivo
- 2x Relay module
- 2x LED indicador
- Sensor de lluvia (opcional)
- Fuente 5V 2A

**Funcionalidades Requeridas**:
1. Leer humedad cada 30 segundos por zona
2. Si humedad < umbral: activar riego de esa zona
3. Máximo tiempo de riego: 5 minutos por activación
4. Período de espera entre riegos: 30 minutos
5. Publicar datos a MQTT cada minuto
6. Web interface simple mostrando estado

**Estados FSM**:
```
IDLE → CHECKING → WATERING_ZONE1 → WAITING
                → WATERING_ZONE2 → WAITING
```

**Conceptos que Aprende**:
- Multi-zona con estados independientes
- MQTT publish
- Web server embebido
- Scheduling y timeouts

**IA Value**: ALTO - Lógica multi-zona, MQTT setup, web interface

**Entregables**:
- [ ] Circuito funcional
- [ ] Esquemático en KiCAD
- [ ] Código estructurado con FSM
- [ ] MQTT publicando a broker
- [ ] Web interface básica
- [ ] Video demo 5-7 min
- [ ] Documentación de arquitectura

---

### Proyecto I2: Nodo IoT con Dashboard

**Descripción**: Sensor ambiental que reporta a la nube con visualización.

**Hardware**:
- ESP32 DevKit
- DHT22
- Relay module
- LED status

**Funcionalidades Requeridas**:
1. Leer temp/humedad cada 30 segundos
2. Publicar a MQTT con JSON payload
3. Suscribirse a topic de control de relay
4. Reconexión automática WiFi/MQTT
5. Deep sleep opcional (para batería)
6. Dashboard en ThingSpeak o similar

**Payload JSON**:
```json
{
  "device_id": "nodo-01",
  "temperature": 25.5,
  "humidity": 60,
  "timestamp": 1234567890
}
```

**Conceptos que Aprende**:
- MQTT bidireccional (pub/sub)
- JSON serialization
- Reconexión automática
- Cloud dashboards
- Deep sleep

**IA Value**: MUY ALTO - MQTT client code, JSON, reconnection logic

**Entregables**:
- [ ] Circuito funcional
- [ ] Esquemático KiCAD
- [ ] Código con manejo de errores robusto
- [ ] Dashboard configurado con gráficos
- [ ] Documentación de topics MQTT
- [ ] Video demo

---

### Proyecto I3: Control PID de Temperatura

**Descripción**: Mantener temperatura constante en cámara pequeña.

**Hardware**:
- ESP32 DevKit
- DHT22
- Relay + foco incandescente 40W (calefactor)
- Ventilador pequeño (enfriador)
- Caja de cartón/plástico (cámara)
- LCD I2C

**Funcionalidades Requeridas**:
1. Setpoint configurable (25-40°C)
2. Control PID con librería
3. Display muestra: actual, setpoint, output%
4. Logging a Serial de temperatura cada segundo
5. Gráfica de respuesta (puede ser Excel post-proceso)

**Conceptos que Aprende**:
- Control PID (P, I, D individualmente)
- Tuning de parámetros
- Respuesta del sistema
- Anti-windup

**IA Value**: MUY ALTO - Explicación PID, tuning inicial, interpretación de respuesta

**SEGURIDAD**: Supervisión requerida. Foco puede sobrecalentar.

**Entregables**:
- [ ] Sistema funcional manteniendo temperatura
- [ ] Esquemático
- [ ] Código con PID library
- [ ] Gráfica de respuesta del sistema
- [ ] Video demo mostrando estabilización
- [ ] Documento: ¿Qué hace cada término P, I, D?

---

### Proyecto I4: Control de Acceso RFID

**Descripción**: Puerta controlada por tarjetas RFID con registro.

**Hardware**:
- ESP32 DevKit
- RC522 RFID reader
- Servo motor (cerradura)
- Buzzer + LEDs
- Botón de salida

**Funcionalidades Requeridas**:
1. Almacenar hasta 5 tarjetas autorizadas en EEPROM
2. Tarjeta válida → servo abre → LED verde → buzzer corto
3. Tarjeta inválida → LED rojo → buzzer largo
4. Botón interior siempre abre (salida)
5. Log de accesos (Serial o MQTT)
6. Modo admin: tarjeta maestra para agregar/eliminar

**Conceptos que Aprende**:
- RFID comunicación SPI
- EEPROM para persistencia
- Seguridad básica (no hardcodear)
- Logging de eventos

**IA Value**: ALTO - RFID library, EEPROM patterns, SPI setup

**Entregables**:
- [ ] Sistema funcional
- [ ] Esquemático
- [ ] Código con gestión de tarjetas
- [ ] Documentación de estructura EEPROM
- [ ] Video demo con múltiples tarjetas
- [ ] Documento: ¿Por qué no hardcodear UIDs?

---

### Proyecto I5: Estación Meteorológica con Logging

**Descripción**: Estación que registra datos ambientales en SD.

**Hardware**:
- Arduino Mega (más memoria)
- DHT22
- BMP280 (presión)
- SD card module
- RTC DS3231
- LCD I2C

**Funcionalidades Requeridas**:
1. Leer sensores cada 5 minutos
2. Guardar en SD como CSV con timestamp
3. Display muestra lecturas actuales
4. Detección de SD llena/ausente
5. Botón para mostrar estadísticas (min/max del día)

**Formato CSV**:
```
timestamp,temperature,humidity,pressure
2024-01-15 10:30:00,25.5,60,1013.25
```

**Conceptos que Aprende**:
- Múltiples sensores
- SPI (SD, BMP280)
- I2C (LCD, RTC)
- File systems en embedded
- Data logging

**IA Value**: ALTO - SD library quirks, multi-sensor coordination

**Entregables**:
- [ ] Sistema funcional logging
- [ ] Esquemático
- [ ] Código con manejo de errores SD
- [ ] Ejemplo de datos CSV
- [ ] Video demo
- [ ] Documento: ¿Cómo manejas si la SD se llena?

---

## Nivel AVANZADO

**Tiempo**: 40-60 horas extra-clase
**Costo**: $60-100 USD
**Ideal para**: Desafío significativo, experiencia previa, quiere nivel profesional

---

### Proyecto A1: Mini-SCADA para Control de Nivel

**Descripción**: Sistema de supervisión y control de tanque de agua.

**Hardware**:
- ESP32 (controlador local)
- Raspberry Pi o PC (servidor SCADA)
- Sensor ultrasonido (nivel)
- Bomba pequeña 5V
- 2 relays
- Contenedor plástico (tanque simulado)

**Arquitectura**:
```
Sensor → ESP32 → MQTT → Raspberry Pi → Node-RED Dashboard
                 ↓
              Actuadores
```

**Funcionalidades Requeridas**:
1. Control automático: mantener nivel 40-60%
2. Control manual: override desde dashboard
3. Alarmas: nivel muy alto (>80%), muy bajo (<20%)
4. Histórico últimas 24 horas
5. Dashboard Node-RED con gauge, trend, alarmas
6. Modo de emergencia si pierde comunicación

**Conceptos que Aprende**:
- Arquitectura SCADA multi-capa
- Node-RED
- Alarmas y acknowledgment
- Redundancia y failsafe

**IA Value**: MUY ALTO - Arquitectura multi-sistema, Node-RED flows

**Entregables**:
- [ ] Sistema completo funcional
- [ ] Esquemático + PCB layout (fabricación opcional)
- [ ] Código ESP32 con fallback local
- [ ] Dashboard Node-RED exportado
- [ ] Documentación de arquitectura
- [ ] Video demo 8-10 min
- [ ] Manual de operación

---

### Proyecto A2: Monitor de Sistema Solar 12V

**Descripción**: Monitoreo de panel solar, batería y consumo.

**Hardware**:
- ESP32
- ACS712 (corriente panel)
- ACS712 (corriente carga)
- Divisores de voltaje (panel, batería)
- Panel solar 12V pequeño
- Batería 12V (puede ser de juguete)
- Carga resistiva

**Mediciones**:
- Voltaje panel (0-20V)
- Corriente panel (0-5A)
- Voltaje batería (0-15V)
- Corriente carga (0-5A)

**Funcionalidades Requeridas**:
1. Muestreo cada segundo
2. Cálculo: potencia, energía acumulada
3. Estado de carga estimado
4. Dashboard Grafana con:
   - Gauges de voltaje/corriente
   - Gráfico de potencia generada vs consumida
   - Energía diaria
5. Alerta batería baja (<11.5V)

**Conceptos que Aprende**:
- Mediciones eléctricas
- Divisores para alto voltaje
- Sensores de corriente
- Cálculos de energía
- Calibración

**SEGURIDAD**: Solo sistemas 12V aislados. NO sistemas conectados a red.

**IA Value**: ALTO - Cálculos de divisor, calibración, Grafana queries

**Entregables**:
- [ ] Sistema funcional midiendo panel real
- [ ] Esquemático + PCB layout
- [ ] Código con calibración documentada
- [ ] Dashboard Grafana
- [ ] Documentación de seguridad
- [ ] Video demo
- [ ] Tabla de calibración de sensores

---

### Proyecto A3: Dispositivo Modbus RTU

**Descripción**: Crear un dispositivo esclavo Modbus industrial.

**Hardware**:
- Arduino Mega
- MAX485 (RS-485 transceiver)
- 4 entradas digitales (optoacopladas si posible)
- 4 salidas relay
- 2 entradas analógicas

**Registros Modbus**:
```
Coils (0x01):        0-3: Estado relays (R/W)
Discrete Inputs:     0-3: Estado entradas digitales
Input Registers:     0-1: Valores analógicos (0-1023)
Holding Registers:   0-3: Setpoints configurables
```

**Funcionalidades Requeridas**:
1. Dirección Modbus configurable (1-247)
2. Baudrate: 9600, 19200, 38400
3. Funciones: 01, 02, 03, 04, 05, 06, 15, 16
4. Timeout y error handling
5. LED de comunicación (parpadea con tráfico)

**Conceptos que Aprende**:
- Protocolo Modbus RTU
- RS-485 físico
- Registros industriales
- CRC checking

**IA Value**: MUY ALTO - Modbus protocol details, register mapping

**Testing**: Usar Modbus Poll o similar en PC.

**Entregables**:
- [ ] Dispositivo respondiendo a queries Modbus
- [ ] Esquemático + PCB layout
- [ ] Código Modbus completo
- [ ] Tabla de registros documentada
- [ ] Screenshots de testing con Modbus Poll
- [ ] Video demo
- [ ] Guía de configuración RS-485

---

### Proyecto A4: Sistema de Conteo OEE

**Descripción**: Medir eficiencia de "línea de producción" simulada.

**Hardware**:
- ESP32
- Sensor inductivo o IR (cuenta piezas)
- Botón "pieza defectuosa"
- Selector 3 posiciones (tipo producto)
- Display OLED
- LEDs de status

**Simulación de Producción**:
Usar motor con disco perforado que pasa frente a sensor = "piezas".

**Cálculos OEE**:
```
Disponibilidad = Tiempo operando / Tiempo planificado
Rendimiento = Producción real / Producción teórica
Calidad = Piezas buenas / Piezas totales
OEE = Disponibilidad × Rendimiento × Calidad
```

**Funcionalidades Requeridas**:
1. Conteo automático de piezas
2. Registro manual de defectos
3. Selector cambia ciclo teórico (tipo A: 2s, B: 3s, C: 5s)
4. Botón pausa/reanuda (registra downtime)
5. Cálculo OEE en tiempo real
6. Dashboard con métricas por turno

**Conceptos que Aprende**:
- Métricas de manufactura
- Interrupciones para conteo preciso
- Cálculos industriales
- Visualización de KPIs

**IA Value**: ALTO - Fórmulas OEE, interrupt handling

**Entregables**:
- [ ] Sistema contando y calculando OEE
- [ ] Esquemático + PCB layout
- [ ] Código con interrupciones
- [ ] Dashboard con métricas
- [ ] Video demo con producción simulada
- [ ] Documento: ¿Qué significa cada componente del OEE?

---

## Proyectos Alternativos (Con Aprobación)

Puedes proponer un proyecto diferente si:
1. Tiene complejidad equivalente al nivel elegido
2. Incluye componentes de hardware Y software
3. Tiene aplicación práctica clara
4. Lo propones antes de Semana 3

**Ideas aceptables**:
- Robot seguidor de línea
- Medidor de consumo eléctrico doméstico
- Sistema de hidroponía automatizado
- Tracker GPS para vehículo
- Incubadora de huevos automatizada

---

## Selección de Proyecto

### Proceso

1. **Semana 2, Día 4**: Revisar opciones, hacer preguntas
2. **Semana 2, Día 5**: Declarar nivel y proyecto elegido
3. **Semana 3**: Confirmar disponibilidad de componentes
4. **Cambios**: Permitidos hasta Semana 4 con aviso

### Formulario de Selección

```
Nombre: ____________________
Nivel elegido: [ ] Principiante  [ ] Intermedio  [ ] Avanzado
Proyecto: ____________________
¿Tienes los componentes?: [ ] Sí  [ ] Parcial  [ ] No
Comentarios: ____________________
```

---

*Proyectos Escalonados - Track 02 Electronics - FPUNA 2026*
