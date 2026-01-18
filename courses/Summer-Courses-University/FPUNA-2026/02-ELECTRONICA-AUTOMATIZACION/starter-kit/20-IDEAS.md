# 20 Ideas para Usar IA en Electrónica y Automatización

## Progresión: Principiante → Intermedio → Avanzado

---

# NIVEL PRINCIPIANTE (Ideas 1-7)
*Proyectos simples con componentes básicos, sin soldadura compleja*

---

## 1. LED con Botón y Control de Brillo
**Qué:** Encender/apagar un LED y controlar su brillo con un potenciómetro.

```bash
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

---

## 2. Semáforo LED con Temporización
**Qué:** Simular un semáforo con secuencia automática.

```bash
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

**Aprenderás:** Secuenciación, timing no bloqueante.

---

## 3. Sensor de Temperatura con Display Serial
**Qué:** Leer temperatura y mostrarla en el monitor serial.

```bash
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

---

## 4. Control de Motor DC con L298N
**Qué:** Controlar velocidad y dirección de un motor.

```bash
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

**Aprenderás:** Control de motores, drivers, consumo energético.

---

## 5. Detector de Luz con LDR
**Qué:** Encender luz automáticamente cuando oscurece.

```bash
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

---

## 6. Alarma Ultrasónica de Proximidad
**Qué:** Sonar un buzzer cuando algo se acerca.

```bash
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

**Aprenderás:** Sensores ultrasónicos, cálculo de distancia.

---

## 7. Display LCD con Mensajes
**Qué:** Mostrar mensajes personalizados en LCD 16x2.

```bash
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

---

# NIVEL INTERMEDIO (Ideas 8-14)
*Proyectos con múltiples sensores/actuadores, comunicación, lógica compleja*

---

## 8. Estación Meteorológica con Almacenamiento
**Qué:** Registrar temperatura, humedad y presión en SD card.

```bash
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

**Aprenderás:** Múltiples sensores, almacenamiento, logging.

---

## 9. Control PID de Temperatura
**Qué:** Mantener temperatura constante con control PID.

```bash
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

**Aprenderás:** Control PID, tuning, sistemas de control.

---

## 10. Sistema de Riego Automático Multizona
**Qué:** Riego inteligente con múltiples sensores y zonas.

```bash
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

---

## 11. ESP32 con WiFi y MQTT
**Qué:** Enviar datos de sensores a broker MQTT.

```bash
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

**Aprenderás:** WiFi, MQTT, JSON, IoT.

---

## 12. Servidor Web en ESP32
**Qué:** Crear dashboard web servido desde el ESP32.

```bash
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

**Aprenderás:** Servidores web embebidos, WebSockets, frontend.

---

## 13. Control de Acceso con RFID
**Qué:** Puerta que se abre con tarjeta RFID autorizada.

```bash
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

**Aprenderás:** RFID, seguridad básica, EEPROM.

---

## 14. Máquina de Estados (FSM) para Proceso
**Qué:** Implementar lógica industrial con estados.

```bash
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

**Aprenderás:** Máquinas de estados, lógica industrial, seguridad.

---

# NIVEL AVANZADO (Ideas 15-20)
*Proyectos complejos, sistemas completos, industrial-grade*

---

## 15. Sistema SCADA Básico
**Qué:** Supervisión y control de proceso industrial.

```bash
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

**Aprenderás:** SCADA, Node-RED, control de procesos.

---

## 16. Brazo Robótico de 4 DOF
**Qué:** Construir y programar brazo robótico.

```bash
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

**Aprenderás:** Robótica, cinemática, servomotores.

---

## 17. Inversor Solar Básico (Monitoreo)
**Qué:** Sistema de monitoreo para instalación solar.

```bash
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

**Aprenderás:** Mediciones eléctricas, energía solar, seguridad.

---

## 18. Control Remoto Industrial con Protocolo Modbus
**Qué:** Implementar comunicación Modbus RTU/TCP.

```bash
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

**Aprenderás:** Protocolos industriales, RS-485, Modbus.

---

## 19. Sistema de Producción con Conteo y OEE
**Qué:** Medir eficiencia de máquina (OEE).

```bash
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

**Aprenderás:** Métricas industriales, OEE, producción.

---

## 20. Gemelo Digital de Proceso
**Qué:** Crear simulación sincronizada con hardware real.

```bash
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

**Aprenderás:** Modelado matemático, simulación, industria 4.0.

---

## Consejos Importantes

### Seguridad
- **SIEMPRE** desconectar energía antes de modificar circuitos
- Usar fuentes de alimentación aisladas para motores/relays
- Verificar polaridad antes de conectar
- Proteger entradas con resistencias limitadoras

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

---

*20-IDEAS.md para Electrónica y Automatización - FPUNA 2026*
