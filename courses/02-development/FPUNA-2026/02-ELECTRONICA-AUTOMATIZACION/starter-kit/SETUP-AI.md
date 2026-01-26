# SETUP-AI.md - Configuración de Proyectos de Electrónica con IA

## Prompts para que la IA Configure tu Proyecto

---

## 1. Inicialización de Proyecto Arduino/ESP32

```bash
claude "Inicializa mi proyecto de [Arduino/ESP32]:

Nombre del proyecto: [nombre]
Microcontrolador: [Arduino Uno/Nano/ESP32/etc.]
Propósito: [descripción breve]

Crea:
1. Estructura de carpetas (src, lib, docs, tests)
2. Archivo README.md con descripción y pinout
3. Archivo platformio.ini si uso PlatformIO
4. .gitignore para proyectos de electrónica
5. Template de código principal con setup() y loop()
6. Archivo de configuración para constantes

Incluye comentarios en español."
```

---

## 2. Configuración de Sensores

```bash
claude "Configura estos sensores para mi proyecto:

Microcontrolador: [modelo]
Sensores:
1. [Sensor 1]: [modelo, ej: DHT22]
   - Pin de datos: [X]
   - Alimentación: [X]V
2. [Sensor 2]: [modelo]
   - Pines: [lista]

Para cada sensor genera:
1. Conexiones detalladas (diagrama ASCII)
2. Librería recomendada
3. Código de inicialización
4. Función de lectura con manejo de errores
5. Valores típicos esperados
6. Código de prueba unitaria"
```

---

## 3. Configuración de Comunicaciones

### WiFi (ESP32/ESP8266)
```bash
claude "Configura WiFi para mi ESP32:

SSID: [usar variable de entorno]
Funcionalidad: [cliente HTTP/MQTT/WebSocket/servidor]

Genera:
1. Código de conexión WiFi robusto
2. Reconexión automática
3. Indicador LED de estado
4. Manejo de credenciales seguro
5. Función de verificación de conexión
6. Timeout configurable"
```

### MQTT
```bash
claude "Configura cliente MQTT:

Broker: [broker.hivemq.com / local]
Puerto: [1883/8883]
Topics:
- Publicar: [lista de topics]
- Suscribir: [lista de topics]

Genera:
1. Código de conexión y reconexión
2. Funciones de publish para cada tipo de dato
3. Callback para mensajes recibidos
4. Manejo de QoS
5. Last Will Testament
6. Formato de mensajes JSON"
```

---

## 4. Configuración de Actuadores

```bash
claude "Configura estos actuadores:

Microcontrolador: [modelo]
Actuadores:
1. [Motor DC]: Pin PWM [X], Enable [Y]
2. [Servo]: Pin [X], rango [0-180°]
3. [Relé]: Pin [X], activo [HIGH/LOW]

Para cada uno genera:
1. Conexiones con diagrama
2. Código de inicialización
3. Funciones de control
4. Protecciones (límites, rampas)
5. Test de verificación"
```

---

## 5. Interfaz de Usuario (Display/LEDs)

```bash
claude "Configura interfaz de usuario:

Componentes:
- Display: [LCD 16x2 / OLED SSD1306 / etc.]
- LEDs: [cantidad y colores]
- Botones: [cantidad]
- Buzzer: [sí/no]

Conexiones disponibles:
[lista de pines]

Genera:
1. Inicialización de cada componente
2. Funciones de actualización de display
3. Manejo de botones con debounce
4. Patrones de LED para estados
5. Tonos de buzzer para eventos
6. Menú navegable (si aplica)"
```

---

## 6. Sistema de Logging y Debug

```bash
claude "Implementa sistema de logging:

Microcontrolador: [modelo]
Nivel de detalle: [ERROR/WARN/INFO/DEBUG]
Salida: [Serial / SD Card / ambos]

Genera:
1. Macros de logging por nivel
2. Timestamp en cada mensaje
3. Rotación de logs (si SD)
4. Filtrado por nivel
5. Formato estructurado
6. Deshabilitación para producción"
```

---

## 7. Configuración de Alimentación

```bash
claude "Analiza y configura la alimentación:

Componentes:
- MCU: [modelo, consumo típico]
- Sensores: [lista con consumos]
- Actuadores: [lista con consumos]

Fuente disponible: [batería/USB/fuente externa]

Calcula:
1. Consumo total máximo
2. Consumo en modo sleep
3. Autonomía estimada con batería
4. Regulador necesario
5. Capacitor de filtrado
6. Código de gestión de energía"
```

---

## 8. Máquina de Estados

```bash
claude "Implementa máquina de estados:

Estados del sistema:
1. [IDLE]: [descripción]
2. [RUNNING]: [descripción]
3. [ERROR]: [descripción]
4. [CONFIG]: [descripción]

Transiciones:
- IDLE → RUNNING: [condición]
- RUNNING → ERROR: [condición]
- [más transiciones]

Genera:
1. Enum de estados
2. Función de transición
3. Acciones de entrada/salida por estado
4. Visualización de estado actual
5. Diagrama ASCII de la FSM
6. Logging de transiciones"
```

---

## 9. Almacenamiento de Datos

### EEPROM
```bash
claude "Configura almacenamiento en EEPROM:

Datos a guardar:
1. [Configuración WiFi]: ~100 bytes
2. [Calibración sensores]: ~50 bytes
3. [Contador de arranques]: 4 bytes

Genera:
1. Mapa de direcciones EEPROM
2. Funciones de lectura/escritura tipo-seguras
3. Verificación de integridad (CRC)
4. Valores por defecto
5. Función de reset a fábrica"
```

### SD Card
```bash
claude "Configura almacenamiento en SD:

Pines SPI: CS=[X], MOSI=[X], MISO=[X], SCK=[X]
Formato: FAT32
Archivos:
- config.json: configuración
- data.csv: datos de sensores

Genera:
1. Inicialización de SD
2. Funciones de lectura/escritura JSON
3. Logging en CSV con timestamp
4. Rotación de archivos por tamaño
5. Manejo de errores de SD"
```

---

## 10. Integración con Servicios Cloud

### ThingSpeak
```bash
claude "Integra con ThingSpeak:

API Key: [usar variable]
Campos:
1. field1: Temperatura
2. field2: Humedad
3. field3: [otro dato]

Genera:
1. Función de envío de datos
2. Rate limiting (15 segundos mínimo)
3. Buffer de datos si falla conexión
4. Lectura de comandos desde ThingSpeak
5. Manejo de errores HTTP"
```

### Home Assistant
```bash
claude "Integra con Home Assistant:

Método: [MQTT / API REST]
Entidades a crear:
1. sensor.temperatura
2. switch.relay
3. binary_sensor.motion

Genera:
1. Auto-discovery MQTT
2. Configuración de entidades
3. Actualización de estados
4. Comandos desde HA
5. Disponibilidad del dispositivo"
```

---

## 11. Testing y Validación

```bash
claude "Crea suite de pruebas:

Componentes a probar:
1. [lista de sensores]
2. [lista de actuadores]
3. [comunicaciones]

Genera:
1. Test de hardware al arranque
2. Test de comunicación
3. Test de sensores (rango válido)
4. Test de actuadores (respuesta)
5. Reporte de estado por Serial
6. LED de diagnóstico"
```

---

## 12. Documentación del Proyecto

```bash
claude "Genera documentación completa:

Proyecto: [nombre]
Componentes: [lista]

Crea:
1. README.md con:
   - Descripción del proyecto
   - Lista de materiales (BOM)
   - Diagrama de conexiones (ASCII)
   - Instrucciones de montaje
   - Configuración inicial
   - Troubleshooting

2. PINOUT.md con tabla de conexiones

3. API.md si tiene interfaz web/MQTT"
```

---

## Checklist de Configuración

- [ ] Proyecto inicializado con estructura de carpetas
- [ ] platformio.ini o Arduino IDE configurado
- [ ] Sensores conectados y probados individualmente
- [ ] Actuadores conectados y probados
- [ ] Comunicación (Serial/WiFi/MQTT) funcionando
- [ ] Almacenamiento de datos configurado
- [ ] Interfaz de usuario funcional
- [ ] Sistema de logging implementado
- [ ] Tests de hardware pasando
- [ ] Documentación actualizada
- [ ] Código versionado en Git

---

*SETUP-AI.md para Electrónica - FPUNA 2026*
