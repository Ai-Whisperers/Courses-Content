# 🤖 Prompts - Electrónica y Automatización

## FPUNA Verano 2026

Colección de prompts optimizados para usar con Claude/OpenCode en proyectos de electrónica.

---

## Diseño de Circuitos

### Análisis de Requerimientos
```
Necesito diseñar un circuito para [APLICACIÓN].

Especificaciones:
- Voltaje de entrada: [V]
- Corriente máxima: [A]
- Funciones requeridas: [LISTA]
- Restricciones: [TAMAÑO/COSTO/TEMPERATURA]

Por favor:
1. Propone una arquitectura del sistema
2. Lista los componentes principales necesarios
3. Identifica posibles desafíos técnicos
4. Sugiere alternativas si las hay
```

### Cálculo de Componentes
```
Necesito calcular los valores de componentes para:
[DESCRIPCIÓN DEL SUBCIRCUITO]

Condiciones:
- Voltaje de alimentación: [V]
- Corriente de carga: [mA]
- Frecuencia (si aplica): [Hz]
- Temperatura de operación: [°C]

Incluye:
- Fórmulas utilizadas
- Valores comerciales más cercanos
- Tolerancias recomendadas
- Potencia disipada en cada componente
```

### Revisión de Esquemático
```
Revisa este esquemático y busca:
1. Errores de conexión
2. Componentes faltantes (protección, desacoplo)
3. Problemas de EMI potenciales
4. Mejoras de robustez
5. Optimizaciones de costo

[PEGAR NETLIST O DESCRIPCIÓN]
```

---

## Diseño de PCB

### Estrategia de Ruteo
```
Estoy diseñando un PCB con estas características:
- Capas disponibles: [2/4]
- Señales críticas: [LISTA]
- Componentes de potencia: [LISTA]
- Frecuencias máximas: [MHz]

Necesito una estrategia de ruteo que incluya:
1. Distribución de planos (GND, VCC)
2. Reglas de separación para señales sensibles
3. Ubicación óptima de componentes críticos
4. Técnicas de reducción de EMI
5. Consideraciones térmicas
```

### Verificación DRC
```
Revisa estas reglas de diseño para mi PCB:
- Ancho de pista mínimo: [mm]
- Separación mínima: [mm]
- Vía: [diámetro/taladro]
- Corriente máxima por pista: [A]

Verifica si son adecuadas para:
- Fabricante: [JLCPCB/PCBWay]
- Clase de PCB: [Estándar/HDI]
- Aplicación: [DESCRIBIR]
```

---

## Firmware y Programación

### Estructura de Código
```
Necesito desarrollar firmware para [MICROCONTROLADOR] que:
- Lea [SENSORES]
- Controle [ACTUADORES]
- Se comunique por [PROTOCOLO]
- Tenga modo de bajo consumo

Genera una estructura de código modular con:
1. Organización de archivos
2. Máquina de estados principal
3. Funciones de inicialización
4. Handlers de interrupción
5. Gestión de energía
```

### Driver de Sensor
```
Escribe un driver en C/C++ para Arduino/ESP32 para el sensor [MODELO].

Basado en el datasheet, incluye:
- Inicialización y configuración
- Lectura de datos con verificación
- Conversión a unidades físicas
- Manejo de errores
- Ejemplo de uso

Datasheet info relevante:
[PEGAR SECCIÓN DEL DATASHEET]
```

### Protocolo de Comunicación
```
Implementa comunicación [I2C/SPI/UART] entre:
- Master: [DISPOSITIVO]
- Slave: [DISPOSITIVO]

Requerimientos:
- Velocidad: [bps/kHz]
- Formato de datos: [DESCRIBIR]
- Manejo de errores: [CHECKSUM/CRC]

Incluye código para ambos lados si aplica.
```

---

## Automatización e IoT

### Sistema IoT Completo
```
Diseña un sistema IoT para [APLICACIÓN] que incluya:

Hardware:
- Microcontrolador: [ESP32/Arduino]
- Sensores: [LISTA]
- Actuadores: [LISTA]

Conectividad:
- Protocolo: [WiFi/LoRa/Bluetooth]
- Backend: [MQTT/HTTP/WebSocket]
- Visualización: [Grafana/App/Web]

Genera:
1. Diagrama de arquitectura
2. Esquema de conexiones
3. Código del nodo
4. Configuración del servidor
5. Dashboard básico
```

### Flujo Node-RED
```
Crea un flujo Node-RED para:
[DESCRIPCIÓN DE LA AUTOMATIZACIÓN]

Entradas:
- [SENSOR/MQTT TOPIC]

Procesamiento:
- [LÓGICA REQUERIDA]

Salidas:
- [ACTUADOR/NOTIFICACIÓN/BASE DE DATOS]

Incluye:
- JSON del flujo exportable
- Nodos necesarios
- Configuración de credenciales
```

### Dashboard Grafana
```
Diseña un dashboard Grafana para monitorear:
- Métricas: [LISTA]
- Período: [TIEMPO]
- Alertas: [CONDICIONES]

Base de datos: [InfluxDB/Prometheus]

Incluye:
- Queries para cada panel
- Configuración de alertas
- Diseño visual recomendado
```

---

## Resolución de Problemas

### Debug de Circuito
```
Mi circuito no funciona como esperado:

Síntoma: [DESCRIBIR]
Comportamiento esperado: [DESCRIBIR]
Mediciones realizadas: [VOLTAJES/CORRIENTES]

Esquemático/descripción: [ADJUNTAR]

Ayúdame a:
1. Identificar posibles causas
2. Proponer mediciones adicionales
3. Sugerir soluciones paso a paso
```

### Optimización de Consumo
```
Necesito reducir el consumo de mi dispositivo:

Hardware: [MICROCONTROLADOR]
Consumo actual: [mA]
Objetivo: [mA]
Batería: [CAPACIDAD/TIPO]

Tareas que realiza:
[LISTA DE FUNCIONES]

Sugiere:
1. Modos de bajo consumo aplicables
2. Optimizaciones de hardware
3. Cambios en el firmware
4. Estimación de autonomía resultante
```

---

## Documentación

### Generar BOM
```
Genera una Bill of Materials para este diseño:
[LISTA DE COMPONENTES O NETLIST]

Formato requerido:
- Referencia | Valor | Footprint | Cantidad | Proveedor | Código
- Agrupa por tipo de componente
- Incluye alternativas para componentes críticos
- Calcula costo estimado (LCSC/DigiKey)
```

### Manual de Usuario
```
Escribe un manual de usuario para [DISPOSITIVO]:

Secciones:
1. Descripción general
2. Especificaciones técnicas
3. Instrucciones de instalación
4. Guía de operación
5. Solución de problemas
6. Mantenimiento

Audiencia: [TÉCNICO/USUARIO FINAL]
Idioma: Español (Paraguay)
```

---

## Ejemplos Específicos

### Control de Motor DC
```
Diseña un driver para motor DC:
- Voltaje: 12V
- Corriente máxima: 2A
- Control: PWM desde Arduino
- Funciones: Adelante, atrás, freno, velocidad variable

Incluye:
- Esquemático con protecciones
- Código de control
- Consideraciones térmicas
```

### Estación Meteorológica
```
Diseña una estación meteorológica IoT con:
- Sensores: Temperatura, humedad, presión, lluvia
- MCU: ESP32
- Alimentación: Panel solar + batería
- Datos: MQTT a servidor local

Genera código completo con:
- Lecturas cada 5 minutos
- Deep sleep entre lecturas
- Reconexión automática WiFi
- Buffer local si pierde conexión
```

---

*Prompts - Track 02 - FPUNA 2026*
