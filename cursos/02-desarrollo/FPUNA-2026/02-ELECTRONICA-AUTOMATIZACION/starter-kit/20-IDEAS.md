# 20 Ideas para Usar IA en Electrónica y Automatización

## Progresión: Principiante → Intermedio → Avanzado

---

## Resumen: Mapeo a Proyectos del Curso

| # | Idea | Tier Elegible | Tiempo c/IA | Costo USD | AI Value |
|---|------|---------------|-------------|-----------|----------|
| 1 | LED + Botón + Brillo | Principiante | 2-3h | $8-12 | Bajo |
| 2 | Semáforo LED | **Principiante** | 2-4h | $10-15 | Medio |
| 3 | Sensor Temperatura Serial | Principiante | 3-4h | $12-18 | Medio |
| 4 | Motor DC + L298N | **Principiante** | 4-6h | $20-30 | Alto |
| 5 | Detector Luz LDR | **Principiante** | 3-5h | $10-15 | Alto |
| 6 | Alarma Ultrasónica | **Principiante** | 3-4h | $12-18 | Medio |
| 7 | Display LCD I2C | Principiante | 3-5h | $12-20 | Alto |
| 8 | Estación Meteorológica | **Intermedio** | 8-15h | $45-70 | Alto |
| 9 | Control PID Temperatura | **Intermedio** | 12-20h | $40-60 | Muy Alto |
| 10 | Riego Multizona | Intermedio (simplificado) | 15-25h | $80-150 | Alto |
| 11 | ESP32 + MQTT | **Intermedio** | 10-15h | $20-35 | Muy Alto |
| 12 | Servidor Web ESP32 | Intermedio/Avanzado | 15-25h | $25-40 | Muy Alto |
| 13 | Control Acceso RFID | **Intermedio** | 12-20h | $35-60 | Alto |
| 14 | FSM Proceso Industrial | **Intermedio** | 10-18h | $25-40 | Alto |
| 15 | Sistema SCADA | **Avanzado** | 30-50h | $100-200 | Muy Alto |
| 16 | Brazo Robótico 4DOF | Avanzado (c/kit) | 40-70h | $80-150 | Muy Alto |
| 17 | Monitor Solar 12V | **Avanzado** | 20-35h | $60-100 | Alto |
| 18 | Modbus RTU | **Avanzado** | 25-40h | $50-90 | Muy Alto |
| 19 | Sistema OEE | **Avanzado** | 30-50h | $60-120 | Alto |
| 20 | Gemelo Digital | ~~No recomendado~~ | 50-80h | $100-200 | - |

**Leyenda**:
- **Negrita** = Recomendado para ese tier
- AI Value: Cuánto acelera la IA el desarrollo

---

# NIVEL PRINCIPIANTE (Ideas 1-7)
*Proyectos simples con componentes básicos, sin soldadura compleja*

> **Para Proyecto Final Tier Principiante**: Elige una de estas ideas y agrégale un twist personal.

---

## 1. LED con Botón y Control de Brillo

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | Principiante |
| **Tiempo con IA** | 2-3 horas |
| **Costo** | $8-12 USD |
| **AI Value** | Bajo (tutoriales abundantes) |
| **Disponibilidad Paraguay** | Alta |

**Qué:** Encender/apagar un LED y controlar su brillo con un potenciómetro.

```
claude "Diseña un circuito simple para Arduino UNO:

Componentes:
- 1 LED rojo (Vf = 2V)
- 1 Botón pulsador
- 1 Potenciómetro 10K
- Arduino UNO

Funcionalidad:
- Botón enciende/apaga el LED
- Potenciómetro controla brillo (PWM)

Necesito:
1. Diagrama de conexiones
2. Cálculo de resistencia para el LED
3. Código Arduino comentado
4. Explicación del PWM en términos simples"
```

**Aprenderás:** PWM, entradas digitales/analógicas, ley de Ohm.

**Para hacerlo proyecto de curso:** Agrega múltiples LEDs con patrones, o control por serial.

---

## 2. Semáforo LED con Temporización ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Principiante** |
| **Tiempo con IA** | 2-4 horas |
| **Costo** | $10-15 USD |
| **AI Value** | Medio (millis() es confuso para novatos) |
| **Disponibilidad Paraguay** | Alta |

**Qué:** Simular un semáforo con secuencia automática.

```
claude "Crea un semáforo con Arduino:

Componentes:
- 3 LEDs (rojo, amarillo, verde)
- 3 resistencias 220Ω
- Arduino UNO

Secuencia:
- Verde: 5 segundos
- Amarillo: 2 segundos
- Rojo: 5 segundos

Necesito:
1. Diagrama de conexión
2. Código sin usar delay() (usar millis)
3. Explicar por qué millis() es mejor que delay()
4. Cómo agregar un botón de peatones después"
```

**Aprenderás:** Secuenciación, timing no bloqueante, FSM básica.

**Para hacerlo proyecto de curso:** Agrega sensor de luz (modo nocturno), botón peatón, segundo semáforo sincronizado.

---

## 3. Sensor de Temperatura con Display Serial

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | Principiante |
| **Tiempo con IA** | 3-4 horas |
| **Costo** | $12-18 USD |
| **AI Value** | Medio (manejo de errores) |
| **Disponibilidad Paraguay** | Alta (DHT11), Media (DHT22) |

**Qué:** Leer temperatura y mostrarla en el monitor serial.

```
claude "Lee temperatura con DHT11 y muestra en Serial:

Componentes:
- DHT11 (sensor de temperatura y humedad)
- Arduino UNO

Requisitos:
1. Leer cada 2 segundos
2. Mostrar en grados Celsius
3. Si temperatura > 30°C, encender LED de alerta

Necesito:
- Diagrama de conexión
- Librería a usar
- Código con manejo de errores de lectura
- Cómo interpretar valores inválidos"
```

**Aprenderás:** Sensores digitales, comunicación serial, librerías.

**Para hacerlo proyecto de curso:** Agrega LCD, logging a SD, o umbral configurable.

---

## 4. Control de Motor DC con L298N ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Principiante** |
| **Tiempo con IA** | 4-6 horas |
| **Costo** | $20-30 USD |
| **AI Value** | Alto (conceptos de potencia, H-bridge) |
| **Disponibilidad Paraguay** | Alta |

**Qué:** Controlar velocidad y dirección de un motor.

```
claude "Controla un motor DC con Arduino y L298N:

Motor: 6V DC
Driver: L298N
Alimentación: Batería 9V

Funcionalidad:
- 2 botones: adelante/atrás
- Potenciómetro: control de velocidad

Necesito:
1. Diagrama de conexión (incluir diodos de protección)
2. Explicación de por qué necesito driver
3. Código Arduino
4. Cálculo de consumo y duración de batería"
```

**Aprenderás:** Control de motores, drivers, consumo energético, PWM para velocidad.

**Para hacerlo proyecto de curso:** Agrega display de velocidad, rampa de aceleración, o límites de corriente.

---

## 5. Detector de Luz con LDR ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Principiante** |
| **Tiempo con IA** | 3-5 horas |
| **Costo** | $10-15 USD |
| **AI Value** | Alto (histéresis es concepto no obvio) |
| **Disponibilidad Paraguay** | Alta |

**Qué:** Encender luz automáticamente cuando oscurece.

```
claude "Crea un detector de luz con LDR:

Componentes:
- LDR (fotorresistencia)
- LED blanco de alta potencia
- Transistor 2N2222
- Arduino UNO

Funcionalidad:
- Cuando oscurece, enciende LED
- Umbral ajustable por potenciómetro

Necesito:
1. Circuito divisor de voltaje con LDR
2. Por qué usar transistor para el LED potente
3. Código con histéresis (evitar parpadeo)
4. Calibración del umbral"
```

**Aprenderás:** Divisor de voltaje, transistores como switch, histéresis.

**Concepto clave - Histéresis:** Evita parpadeo usando dos umbrales (ej: enciende a <30%, apaga a >40%).

---

## 6. Alarma Ultrasónica de Proximidad ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Principiante** |
| **Tiempo con IA** | 3-4 horas |
| **Costo** | $12-18 USD |
| **AI Value** | Medio (fórmula de distancia simple) |
| **Disponibilidad Paraguay** | Alta |

**Qué:** Sonar un buzzer cuando algo se acerca.

```
claude "Crea alarma de proximidad con HC-SR04:

Componentes:
- Sensor ultrasónico HC-SR04
- Buzzer activo
- LED indicador
- Arduino UNO

Funcionalidad:
- Medir distancia cada 200ms
- Si distancia < 30cm, activar alarma
- LED parpadea más rápido mientras más cerca

Necesito:
1. Cómo funciona el HC-SR04 (trigger/echo)
2. Fórmula de conversión tiempo → distancia
3. Código completo
4. Limitaciones del sensor"
```

**Aprenderás:** Sensores ultrasónicos, cálculo de distancia, física aplicada.

**Fórmula clave:** `distancia_cm = (tiempo_us / 2) / 29.1`

---

## 7. Display LCD con Mensajes

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | Principiante |
| **Tiempo con IA** | 3-5 horas |
| **Costo** | $12-20 USD |
| **AI Value** | Alto (I2C address finding es frustrante) |
| **Disponibilidad Paraguay** | Media (I2C backpack puede requerir pedido) |

**Qué:** Mostrar mensajes personalizados en LCD 16x2.

```
claude "Muestra información en LCD 16x2 con I2C:

Componentes:
- LCD 16x2 con módulo I2C
- Arduino UNO

Funcionalidad:
- Mostrar mensaje de bienvenida
- Actualizar segunda línea cada segundo con contador
- Mostrar caracteres especiales

Necesito:
1. Conexión I2C (solo 4 cables!)
2. Librería LiquidCrystal_I2C
3. Cómo encontrar la dirección I2C del módulo
4. Crear caracteres personalizados"
```

**Aprenderás:** Comunicación I2C, displays, caracteres custom.

**Tip:** Usa I2C Scanner sketch para encontrar la dirección (comúnmente 0x27 o 0x3F).

---

# NIVEL INTERMEDIO (Ideas 8-14)
*Proyectos con múltiples sensores/actuadores, comunicación, lógica compleja*

> **Para Proyecto Final Tier Intermedio**: Estas ideas son perfectas. Puedes combinar elementos de varias.

---

## 8. Estación Meteorológica con Almacenamiento ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Intermedio** |
| **Tiempo con IA** | 8-15 horas |
| **Costo** | $45-70 USD |
| **AI Value** | Alto (SD card quirks, multi-sensor) |
| **Disponibilidad Paraguay** | Media (BMP280 requiere pedido) |

**Qué:** Registrar temperatura, humedad y presión en SD card.

```
claude "Crea estación meteorológica que guarda datos:

Sensores:
- DHT22 (temp + humedad)
- BMP280 (presión atmosférica)
- Módulo SD card

MCU: Arduino Mega (más memoria)

Funcionalidad:
- Leer sensores cada 5 minutos
- Guardar en CSV con timestamp
- Mostrar en LCD

Necesito:
1. Diagrama de conexiones
2. Manejo de múltiples sensores
3. Formato CSV para Excel
4. Cómo usar RTC para timestamp
5. Gestión de errores de SD"
```

**Aprenderás:** Múltiples sensores, SPI, almacenamiento, logging.

**Simplificación válida:** Omitir BMP280 y usar solo DHT22.

---

## 9. Control PID de Temperatura ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Intermedio** |
| **Tiempo con IA** | 12-20 horas |
| **Costo** | $40-60 USD |
| **AI Value** | Muy Alto (PID es complejo conceptualmente) |
| **Disponibilidad Paraguay** | Alta |

> ⚠️ **SEGURIDAD**: Requiere supervisión. Elementos calefactores pueden causar incendios.

**Qué:** Mantener temperatura constante con control PID.

```
claude "Implementa control PID para incubadora:

Sistema:
- Sensor: DHT22
- Actuador: Resistencia calefactora vía relay
- Setpoint: 37.5°C (para incubadora de huevos)

Requisitos:
1. Explicar qué es PID (P, I, D por separado)
2. Código con librería PID
3. Cómo tunear los parámetros Kp, Ki, Kd
4. Gráfica esperada de respuesta
5. Anti-windup para el integrador"
```

**Aprenderás:** Control PID, tuning, sistemas de control, respuesta de sistemas.

**Pregunta de comprensión:** "¿Qué pasa si solo usas P sin I ni D?"

---

## 10. Sistema de Riego Automático Multizona

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | Intermedio (simplificado a 2 zonas) |
| **Tiempo con IA** | 15-25 horas |
| **Costo** | $80-150 USD (4 zonas), $40-60 (2 zonas) |
| **AI Value** | Alto (lógica multi-zona) |
| **Disponibilidad Paraguay** | Baja (electroválvulas requieren tienda agrícola) |

**Qué:** Riego inteligente con múltiples sensores y zonas.

```
claude "Sistema de riego automático para 4 zonas:

Por zona:
- 1 sensor de humedad de suelo capacitivo
- 1 electroválvula 12V

Adicional:
- Sensor de lluvia
- RTC para programación horaria
- Display para status

Lógica:
- Regar si humedad < 40% (configurable por zona)
- No regar si llueve
- Horarios permitidos: 6-8am, 6-8pm
- Límite diario de agua por zona

Necesito código modular y comentado."
```

**Aprenderás:** Múltiples zonas, scheduling, lógica condicional.

**Simplificación recomendada:** Reducir a 2 zonas para proyecto de curso.

---

## 11. ESP32 con WiFi y MQTT ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Intermedio** |
| **Tiempo con IA** | 10-15 horas |
| **Costo** | $20-35 USD |
| **AI Value** | Muy Alto (MQTT es complejo) |
| **Disponibilidad Paraguay** | Alta |

**Qué:** Enviar datos de sensores a broker MQTT.

```
claude "Conecta ESP32 a broker MQTT:

Sensor: DHT22
Broker: test.mosquitto.org (público para pruebas)

Topics:
- casa/habitacion/temperatura (publish)
- casa/habitacion/humedad (publish)
- casa/habitacion/relay (subscribe)

Requisitos:
1. Conexión WiFi con reconexión automática
2. MQTT con QoS 1
3. Payload en JSON
4. Recibir comandos para encender relay
5. Last Will Testament si se desconecta
6. Deep sleep para ahorrar batería"
```

**Aprenderás:** WiFi, MQTT (pub/sub), JSON, IoT, deep sleep.

**Concepto clave - MQTT:** Publish/Subscribe. Dispositivos publican a "topics", otros se suscriben.

---

## 12. Servidor Web en ESP32

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | Intermedio (simplificado) / Avanzado (completo) |
| **Tiempo con IA** | 15-25 horas |
| **Costo** | $25-40 USD |
| **AI Value** | Muy Alto (full-stack embebido) |
| **Disponibilidad Paraguay** | Alta |

**Qué:** Crear dashboard web servido desde el ESP32.

```
claude "Crea servidor web en ESP32:

Funcionalidad:
- Mostrar lectura de sensores en tiempo real
- Botones para encender/apagar 2 relays
- Gráfico de las últimas 24 horas

Tecnología:
- ESP32
- AsyncWebServer
- WebSockets para actualización real-time
- SPIFFS para archivos HTML/CSS/JS

Necesito:
1. Código del servidor
2. HTML/CSS responsive
3. JavaScript para WebSocket
4. Cómo subir archivos a SPIFFS"
```

**Aprenderás:** Servidores web embebidos, WebSockets, frontend básico.

**Simplificación para Intermedio:** Omitir gráfico de 24h, solo mostrar valores actuales.

---

## 13. Control de Acceso con RFID ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Intermedio** |
| **Tiempo con IA** | 12-20 horas |
| **Costo** | $35-60 USD |
| **AI Value** | Alto (RFID + EEPROM) |
| **Disponibilidad Paraguay** | Media (RC522 disponible online) |

**Qué:** Puerta que se abre con tarjeta RFID autorizada.

```
claude "Sistema de control de acceso RFID:

Componentes:
- RC522 RFID reader
- Cerradura eléctrica 12V
- Buzzer y LED indicadores
- ESP32 con WiFi

Funcionalidad:
- Registrar hasta 10 tarjetas autorizadas (EEPROM)
- Log de accesos con timestamp
- Modo admin para agregar/eliminar tarjetas
- Enviar notificación por MQTT cuando alguien entra

Necesito código seguro (no hardcodear UIDs en el código)."
```

**Aprenderás:** RFID/SPI, seguridad básica, EEPROM, persistencia.

**Pregunta de comprensión:** "¿Por qué no hardcodeamos los UIDs en el código?"

---

## 14. Máquina de Estados (FSM) para Proceso ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Intermedio** |
| **Tiempo con IA** | 10-18 horas |
| **Costo** | $25-40 USD |
| **AI Value** | Alto (FSM design, safety timeouts) |
| **Disponibilidad Paraguay** | Alta (simulación con LEDs) |

**Qué:** Implementar lógica industrial con estados.

```
claude "Implementa FSM para lavadora simplificada:

Estados:
- IDLE: Esperando inicio
- FILLING: Llenando de agua
- WASHING: Lavando (motor gira)
- DRAINING: Vaciando agua
- SPINNING: Centrifugando
- DONE: Fin del ciclo

Transiciones:
- Botón START: IDLE → FILLING
- Sensor nivel alto: FILLING → WASHING
- Timer 10min: WASHING → DRAINING
- Sensor nivel bajo: DRAINING → SPINNING
- Timer 5min: SPINNING → DONE
- Botón STOP: cualquier estado → IDLE

Genera:
1. Diagrama de estados ASCII
2. Código con enum y switch
3. Manejo de timeout por seguridad
4. LED de status por estado"
```

**Aprenderás:** Máquinas de estados, lógica industrial, timeouts de seguridad.

**Nota:** Es simulación - usas LEDs para representar bomba, motor, etc. No necesitas lavadora real.

---

# NIVEL AVANZADO (Ideas 15-20)
*Proyectos complejos, sistemas completos, industrial-grade*

> **Para Proyecto Final Tier Avanzado**: Estas ideas requieren dedicación significativa. Elige una y hazla bien.

---

## 15. Sistema SCADA Básico ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Avanzado** |
| **Tiempo con IA** | 30-50 horas |
| **Costo** | $100-200 USD |
| **AI Value** | Muy Alto (arquitectura multi-capa) |
| **Disponibilidad Paraguay** | Media |

**Qué:** Supervisión y control de proceso industrial.

```
claude "Diseña sistema SCADA para tanque de agua:

Proceso:
- Tanque con sensor de nivel ultrasónico
- Bomba de llenado
- Válvula de salida
- Sensor de flujo

Funcionalidades SCADA:
1. Visualización en tiempo real del nivel
2. Control automático: mantener nivel 60-80%
3. Control manual: override de bomba/válvula
4. Alarmas: nivel muy alto, muy bajo, bomba sobrecargada
5. Histórico de últimas 24 horas
6. Dashboard web accessible desde LAN

Arquitectura:
- ESP32 para control local
- Raspberry Pi para servidor SCADA
- Node-RED para dashboard

Genera arquitectura y código de cada componente."
```

**Aprenderás:** SCADA, Node-RED, control de procesos, arquitectura distribuida.

**Simplificación válida:** Usar tanque pequeño de escritorio, bomba de acuario.

---

## 16. Brazo Robótico de 4 DOF

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | Avanzado (requiere kit mecánico) |
| **Tiempo con IA** | 40-70 horas |
| **Costo** | $80-150 USD |
| **AI Value** | Muy Alto (cinemática inversa es matemática compleja) |
| **Disponibilidad Paraguay** | Baja (kit requiere importación) |

> ⚠️ **SEGURIDAD**: Servos de alto torque pueden causar lesiones.

**Qué:** Construir y programar brazo robótico.

```
claude "Programa brazo robótico 4DOF:

Actuadores: 4 servomotores MG996R
Control: Arduino Mega + PCA9685 (I2C PWM driver)
Alimentación: 5V 5A fuente dedicada

Funcionalidades:
1. Control por joystick (modo manual)
2. Guardar posiciones en EEPROM
3. Reproducir secuencia de posiciones
4. Cinemática inversa básica (X,Y,Z → ángulos)
5. Límites de software para seguridad

Genera:
1. Fórmulas de cinemática inversa
2. Código modular por función
3. Interfaz serial para comandos
4. Consideraciones de torque/peso"
```

**Aprenderás:** Robótica, cinemática, servomotores, EEPROM.

**Alternativa más simple:** Comprar kit pre-armado, enfocarse en programación.

---

## 17. Monitor de Sistema Solar 12V ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Avanzado** |
| **Tiempo con IA** | 20-35 horas |
| **Costo** | $60-100 USD (sin panel/batería) |
| **AI Value** | Alto (cálculos, calibración) |
| **Disponibilidad Paraguay** | Media |

> ⚠️ **SEGURIDAD**: Solo sistemas 12V aislados. NO conectar a red eléctrica.

**Qué:** Sistema de monitoreo para instalación solar.

```
claude "Monitorea sistema solar fotovoltaico:

Mediciones:
- Voltaje del panel (divisor resistivo + ADC)
- Corriente del panel (sensor ACS712)
- Voltaje de batería
- Corriente de carga

Cálculos:
- Potencia instantánea (W)
- Energía acumulada (Wh)
- Estado de carga estimado (%)

Funcionalidades:
1. Display local con stats
2. Envío a ThingSpeak cada 5 min
3. Alarma de batería baja
4. Registro diario en SD

IMPORTANTE: Solo monitoreo, no control de carga.
Genera código con calibración para cada sensor."
```

**Aprenderás:** Mediciones eléctricas, divisores de voltaje, sensores de corriente, energía.

**Relevancia Paraguay:** Paraguay genera 99.7% de electricidad renovable. Solar es creciente.

---

## 18. Control Remoto Industrial con Protocolo Modbus ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Avanzado** |
| **Tiempo con IA** | 25-40 horas |
| **Costo** | $50-90 USD |
| **AI Value** | Muy Alto (Modbus es protocolo industrial especializado) |
| **Disponibilidad Paraguay** | Baja (MAX485 requiere pedido) |

**Qué:** Implementar comunicación Modbus RTU/TCP.

```
claude "Implementa esclavo Modbus RTU:

Hardware:
- Arduino Mega
- MAX485 para RS-485
- 4 entradas digitales
- 4 salidas relay
- 2 entradas analógicas 4-20mA

Registros Modbus:
- Coils (0-3): Estado de relays (R/W)
- Discrete Inputs (0-3): Estado de entradas
- Input Registers (0-1): Valores analógicos
- Holding Registers (0-3): Setpoints

Genera:
1. Código esclavo Modbus completo
2. Tabla de registros documentada
3. Cómo probar con Modbus Poll (PC)
4. Consideraciones para RS-485 (terminación, bias)"
```

**Aprenderás:** Protocolos industriales, RS-485, Modbus, registros.

**Simplificación:** Omitir entradas 4-20mA, usar entradas digitales y analógicas estándar.

---

## 19. Sistema de Producción con Conteo y OEE ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | **Avanzado** |
| **Tiempo con IA** | 30-50 horas |
| **Costo** | $60-120 USD |
| **AI Value** | Alto (métricas industriales, interrupciones) |
| **Disponibilidad Paraguay** | Media |

**Qué:** Medir eficiencia de máquina (OEE).

```
claude "Sistema de medición OEE para producción:

Inputs:
- Sensor inductivo: cuenta piezas producidas
- Sensor: detecta piezas defectuosas
- Botón: indica paro de máquina
- Selector: tipo de producto (ciclo diferente)

Cálculos OEE:
- Disponibilidad: tiempo operando / tiempo planificado
- Rendimiento: producción real / producción teórica
- Calidad: piezas buenas / piezas totales
- OEE = Disponibilidad × Rendimiento × Calidad

Funcionalidades:
1. Conteo en tiempo real
2. Cálculo automático por turno
3. Histórico diario/semanal
4. Dashboard web con gráficos

Genera sistema completo con ESP32."
```

**Aprenderás:** Métricas industriales, OEE, interrupciones para conteo preciso.

**Simulación:** Usar motor con disco perforado pasando frente a sensor = "piezas producidas".

---

## 20. Gemelo Digital de Proceso

| Métrica | Valor |
|---------|-------|
| **Tier Elegible** | ❌ **NO RECOMENDADO** - Nivel tesis |
| **Tiempo con IA** | 50-80 horas |
| **Costo** | $100-200 USD |
| **AI Value** | - |
| **Disponibilidad Paraguay** | Media |

> ⚠️ **ADVERTENCIA**: Este proyecto es de complejidad de tesis. No recomendado para proyecto de curso.

**Qué:** Crear simulación sincronizada con hardware real.

```
claude "Crea gemelo digital de sistema de tanques:

Sistema físico:
- 2 tanques conectados
- Bomba entre tanques
- Válvula de salida
- Sensores de nivel

Gemelo digital:
1. Modelo matemático del sistema
   - Ecuaciones de flujo
   - Dinámica de llenado/vaciado
2. Simulación en Python
3. Sincronización con hardware real
4. Visualización comparativa (real vs simulado)
5. Predicción de comportamiento

Genera:
1. Ecuaciones diferenciales del sistema
2. Código Python con scipy.integrate
3. Comunicación serial con Arduino
4. Dashboard con matplotlib animado"
```

**Por qué no recomendado:**
- Requiere conocimiento de ecuaciones diferenciales
- Modelado matemático de fluidos es tema de ingeniería avanzada
- Integración Python-Arduino-Visualización es compleja
- Tiempo estimado excede significativamente el disponible

**Alternativa:** Si te interesa Industria 4.0, elige Proyecto 15 (SCADA) o 19 (OEE).

---

## Consejos Importantes

### Seguridad
- **SIEMPRE** desconectar energía antes de modificar circuitos
- Usar fuentes de alimentación aisladas para motores/relays
- Verificar polaridad antes de conectar
- Proteger entradas con resistencias limitadoras
- Proyectos con calefacción requieren supervisión

### Verificación
1. Revisar conexiones ANTES de energizar
2. Medir voltajes con multímetro
3. Probar código paso a paso
4. Documentar modificaciones

### Progresión
- No saltar niveles si no dominas el anterior
- Cada proyecto construye sobre habilidades previas
- La práctica en breadboard precede a PCB
- Simular antes de construir (Tinkercad, Wokwi)

### Uso de IA
- **GREEN**: Sintaxis, explicaciones, templates
- **YELLOW**: Código generado (verificar y entender)
- **RED**: Conceptos fundamentales (aprender primero)

Ver: [USO-IA-ELECTRONICA.md](./USO-IA-ELECTRONICA.md) para guía completa.

---

## Resumen de Recomendaciones por Tier

### Tier Principiante (elige 1)
- ⭐ #2 Semáforo (FSM básica)
- ⭐ #4 Motor DC (potencia)
- ⭐ #5 LDR (histéresis)
- ⭐ #6 Alarma ultrasónica (física)

### Tier Intermedio (elige 1)
- ⭐ #8 Estación meteorológica (multi-sensor)
- ⭐ #9 PID temperatura (control)
- ⭐ #11 ESP32 + MQTT (IoT)
- ⭐ #13 RFID (seguridad)
- ⭐ #14 FSM proceso (industrial)

### Tier Avanzado (elige 1)
- ⭐ #15 SCADA (arquitectura)
- ⭐ #17 Monitor solar (mediciones)
- ⭐ #18 Modbus (protocolos)
- ⭐ #19 OEE (manufactura)

---

*20-IDEAS.md para Electrónica y Automatización - FPUNA 2026 (Actualizado con mapeo a tiers)*
