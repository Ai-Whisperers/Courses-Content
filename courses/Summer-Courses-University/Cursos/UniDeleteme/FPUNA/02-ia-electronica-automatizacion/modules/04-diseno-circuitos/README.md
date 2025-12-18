# Módulo 04: IA para Diseño de Circuitos
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Utilizar IA para cálculos de componentes electrónicos
- Analizar datasheets con asistencia de IA
- Generar documentación técnica de hardware
- Asistir el diseño de PCB con herramientas de IA
- Simular circuitos con ayuda de IA (Proteus, LTSpice)

---

## 1. IA para Cálculos de Componentes

### 1.1 Cálculos de Resistencias y Divisores

**Prompt efectivo para cálculo de divisor de tensión:**

```
Necesito calcular un divisor de tensión con:
- Vin: 12V
- Vout deseado: 3.3V
- Corriente máxima por el divisor: 1mA
- Tolerancia de resistores: E24 (5%)

Proporciona:
1. Valores de R1 y R2 usando valores comerciales E24
2. Vout real con estos valores
3. Error porcentual
4. Potencia disipada en cada resistor
5. Recomendación de potencia nominal (1/4W, 1/2W, etc.)
```

**Respuesta esperada de la IA:**

```
## Cálculo de Divisor de Tensión

### Parámetros de entrada:
- Vin = 12V
- Vout = 3.3V
- Imax = 1mA

### Cálculo teórico:
R_total = Vin / Imax = 12V / 1mA = 12kΩ
R2 = R_total × (Vout / Vin) = 12kΩ × (3.3/12) = 3.3kΩ
R1 = R_total - R2 = 8.7kΩ

### Valores E24 seleccionados:
R1 = 8.2kΩ (valor comercial más cercano)
R2 = 3.3kΩ (valor exacto disponible)

### Vout real:
Vout = Vin × R2/(R1+R2) = 12V × 3.3/(8.2+3.3) = 3.443V

### Error:
Error = (3.443 - 3.3) / 3.3 × 100 = +4.33%

### Potencia:
I_real = 12V / 11.5kΩ = 1.043mA
P_R1 = I² × R1 = (1.043mA)² × 8.2kΩ = 8.92mW
P_R2 = I² × R2 = (1.043mA)² × 3.3kΩ = 3.59mW

### Recomendación:
Usar resistores de 1/4W (250mW), amplio margen de seguridad.
```

### 1.2 Cálculos de Capacitores y Filtros

**Prompt para filtro RC:**

```
Diseña un filtro RC pasa-bajos con:
- Frecuencia de corte: 1 kHz
- Impedancia de entrada: 10kΩ
- Usar valores comerciales E12

Incluye:
1. Esquemático en ASCII
2. Valores de R y C
3. Respuesta en frecuencia (atenuación a 100Hz, 1kHz, 10kHz)
4. Código Proteus/LTSpice para simulación
```

### 1.3 Cálculos de Fuentes de Alimentación

**Prompt para diseño de regulador:**

```
Diseña una fuente de alimentación lineal con:
- Entrada: Transformador 12V AC (secundario)
- Salida: 5V DC @ 1A
- Regulador: LM7805
- Ripple máximo: 50mV

Proporciona:
1. Esquemático completo con valores
2. Cálculo del capacitor de filtro
3. Puente rectificador (modelo y especificaciones)
4. Disipación térmica del regulador
5. Disipador requerido (si aplica)
6. Lista de materiales (BOM)
```

---

## 2. Análisis de Datasheets con IA

### 2.1 Extracción de Información Clave

Los datasheets pueden tener 50+ páginas. La IA ayuda a extraer información relevante.

**Prompt para análisis de datasheet:**

```
Tengo el datasheet del sensor de temperatura LM35.
Extrae y resume:
1. Rango de temperatura de operación
2. Sensibilidad (mV/°C)
3. Precisión típica y máxima
4. Voltaje de alimentación (min, típico, max)
5. Corriente de consumo
6. Pinout con función de cada pin
7. Circuito de aplicación recomendado
8. Consideraciones de diseño de PCB
9. Notas de aplicación importantes

Formato: tabla resumen + esquemático básico en ASCII
```

### 2.2 Comparación de Componentes

**Prompt para comparación:**

```
Compara estos sensores de temperatura para un proyecto IoT con batería:

1. LM35
2. DS18B20
3. DHT22
4. TMP36

Criterios de comparación:
- Precisión
- Rango de temperatura
- Consumo de energía
- Interfaz (analógico, 1-Wire, digital)
- Precio aproximado
- Facilidad de uso con ESP32
- Resistencia a ruido

Formato: tabla comparativa con recomendación final
```

### 2.3 Ejemplo de Análisis con Claude

```
Tengo este fragmento del datasheet del ESP32-WROOM-32:

"Operating voltage: 2.7V to 3.6V
Average current consumption: 80mA (RF working)
Deep sleep current: 10μA
Flash: 4MB
Operating temperature: -40°C to 85°C"

Basado en esto, calcula:
1. Duración de batería 18650 (3000mAh) en modo activo
2. Duración de batería en deep sleep
3. Si transmito datos cada 5 minutos (wake time 10s), ¿cuántos días de batería?
4. Recomendaciones para maximizar duración
```

---

## 3. Diseño de PCB Asistido por IA

### 3.1 Generación de Esquemáticos

**Prompt para esquemático completo:**

```
Genera el esquemático para un módulo ESP32 con:
- ESP32-WROOM-32D
- Regulador AMS1117-3.3
- USB-C para alimentación y programación
- CH340G para USB-UART
- LED de status en GPIO2
- Botón de reset y boot
- Conector I2C (SDA, SCL, 3.3V, GND)
- Conector SPI (MOSI, MISO, SCK, CS, 3.3V, GND)

Formato:
1. Lista de conexiones pin a pin
2. Capacitores de desacoplo requeridos
3. Resistores pull-up/down necesarios
4. Protecciones ESD si aplica
```

### 3.2 Consideraciones de Layout

**Prompt para guía de PCB:**

```
Proporciona guía de diseño de PCB para el esquemático anterior:

1. Tamaño de placa sugerido
2. Reglas de diseño (ancho de pistas, clearance)
3. Plano de masa recomendado
4. Ubicación de capacitores de desacoplo
5. Consideraciones de antena WiFi
6. Área de exclusión alrededor del ESP32
7. Orden de capas (si multicapa)
8. Conectores y su orientación
9. Puntos de test recomendados
10. Archivo de reglas DRC para KiCad/Eagle
```

### 3.3 Generación de BOM

**Prompt para Bill of Materials:**

```
Genera un BOM completo para el diseño ESP32 anterior:

Formato CSV con columnas:
- Designator (R1, C1, U1...)
- Quantity
- Value/Part Number
- Package/Footprint
- Manufacturer
- Supplier Part Number (Mouser/DigiKey)
- Unit Price (USD)
- Extended Price

Incluir:
- Alternativas para componentes críticos
- Nota sobre disponibilidad
- Total estimado para 10 unidades
```

---

## 4. Simulación Asistida

### 4.1 Código para Proteus

**Prompt para simulación Proteus:**

```
Genera un proyecto Proteus para simular:
- Arduino Uno
- Sensor DHT22
- Display LCD 16x2 I2C
- LED RGB (PWM)
- Potenciómetro para ajuste

Incluye:
1. Lista de componentes de la biblioteca Proteus
2. Conexiones detalladas
3. Código Arduino para cargar
4. Pasos de configuración del proyecto
5. Puntos a verificar en simulación
```

### 4.2 Código para LTSpice

**Prompt para LTSpice:**

```
Genera un archivo .asc de LTSpice para simular:
- Amplificador inversor con LM358
- Ganancia: -10
- Rango de frecuencia: DC a 10kHz
- Alimentación: +12V single supply

Incluye:
1. Netlist completo
2. Directivas de simulación (.ac, .tran)
3. Mediciones automáticas
4. Valores de componentes
```

**Código LTSpice generado:**

```spice
* Amplificador Inversor LM358
* Ganancia: -10

.include LM358.sub

* Fuentes
V1 vcc 0 12
V2 in 0 SINE(2 0.1 1k)  ; DC offset 2V, 100mV AC, 1kHz

* Divisor para referencia virtual
R3 vcc vref 10k
R4 vref 0 10k
C3 vref 0 10u

* Amplificador inversor
R1 in minus 10k
R2 minus out 100k
XU1 vref minus vcc 0 out LM358

* Simulación
.ac dec 100 1 100k
.tran 0 10m 0 1u

.end
```

---

## 5. Documentación Técnica con IA

### 5.1 Generación de README Técnico

**Prompt para documentación de hardware:**

```
Genera documentación técnica para el módulo ESP32 diseñado:

Estructura:
1. Descripción general del módulo
2. Especificaciones técnicas (tabla)
3. Diagrama de bloques
4. Pinout con descripción de cada pin
5. Esquema de conexiones típicas
6. Instrucciones de alimentación
7. Programación (conexión USB, botones)
8. Notas de aplicación
9. Solución de problemas comunes
10. Historial de revisiones

Formato: Markdown con diagramas ASCII
```

### 5.2 Generación de Instrucciones de Ensamblaje

```
Genera instrucciones de ensamblaje para el PCB:

1. Lista de herramientas necesarias
2. Orden de soldadura recomendado (SMD primero, THT después)
3. Temperaturas de soldadura
4. Puntos críticos a verificar
5. Pruebas después del ensamblaje
6. Checklist de calidad
7. Fotos de referencia (descripción)
```

---

## 6. Ejercicio Práctico: Diseño de Fuente de Alimentación

### Especificaciones

Diseñar una fuente de alimentación con:
- Entrada: 9-15V DC (adaptador externo)
- Salidas: 5V @ 2A, 3.3V @ 500mA
- Protección contra inversión de polaridad
- LED indicador de encendido
- Conector de salida tipo header

### Pasos con IA

1. **Calcular componentes** usando prompts específicos
2. **Seleccionar reguladores** comparando opciones
3. **Diseñar esquemático** con asistencia de IA
4. **Generar BOM** con precios
5. **Crear documentación** técnica

### Prompt Integral

```
Diseña una fuente de alimentación dual con las siguientes especificaciones:

ENTRADA:
- Rango: 9V a 15V DC
- Conector: Barrel jack 2.1mm

SALIDAS:
- Salida 1: 5V @ 2A (USB tipo A)
- Salida 2: 3.3V @ 500mA (Header 2.54mm)

PROTECCIONES:
- Inversión de polaridad (MOSFET P)
- Cortocircuito
- Sobrecalentamiento

INDICADORES:
- LED verde: alimentación OK
- LED rojo: sobrecorriente (si es posible)

REQUERIMIENTOS:
- Eficiencia > 85% (usar reguladores switching)
- Tamaño PCB: máximo 50x50mm
- Temperatura de operación: 0°C a 50°C

ENTREGABLES:
1. Esquemático completo con valores
2. Lista de componentes (BOM) con proveedores
3. Cálculos de disipación térmica
4. Guía de diseño de PCB
5. Pruebas recomendadas

Formato: documento técnico estructurado
```

---

## Resumen

| Tema | Aplicación de IA |
|------|------------------|
| Cálculos de componentes | Prompts con especificaciones precisas |
| Análisis de datasheets | Extracción y resumen de información |
| Diseño de PCB | Guías de layout y reglas DRC |
| Simulación | Generación de código Proteus/LTSpice |
| Documentación | README, BOM, instrucciones |

---

## Recursos

- [KiCad Documentation](https://docs.kicad.org/)
- [LTSpice Getting Started](https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html)
- [Proteus Tutorial](https://www.labcenter.com/downloads/)
- [DigiKey Calculator Tools](https://www.digikey.com/en/resources/conversion-calculators)

---

*Siguiente: Módulo 05 - IA para Programación de PLCs*
