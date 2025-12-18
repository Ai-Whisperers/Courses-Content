# Módulo 04: Diseño de Circuitos con IA
## Cálculos, Análisis y Documentación Asistida

---

## Objetivos del Módulo

Al finalizar este módulo, serás capaz de:
- Calcular componentes de circuitos usando IA
- Generar análisis térmico para selección de componentes
- Crear documentación técnica (BOM, esquemáticos)
- Validar diseños con asistencia de IA

---

## 1. Cálculos de Componentes

### 1.1 Prompt Base para Cálculos

```
Calcula los componentes para [TIPO DE CIRCUITO]:

ESPECIFICACIONES:
- Entrada: [Voltaje/Corriente]
- Salida: [Voltaje/Corriente]
- Carga máxima: [Valor]
- Precisión requerida: [%]

RESTRICCIONES:
- Componentes serie E24 estándar
- Disponibilidad comercial
- Costo razonable

GENERAR:
1. Esquemático ASCII
2. Lista de valores calculados
3. Valores E24 más cercanos
4. Error introducido por redondeo
```

### 1.2 Ejemplo: Divisor de Voltaje

```
Diseña divisor de voltaje:

ENTRADA: 12V DC
SALIDA: 3.3V (para ADC de ESP32)
CORRIENTE DE PÉRDIDA: máximo 1 mA

CALCULAR:
1. Valores de resistencias
2. Potencia disipada
3. Error por tolerancia (1%, 5%)
4. Valores E24 recomendados
```

**Respuesta esperada de IA:**

```
=== DIVISOR DE VOLTAJE 12V → 3.3V ===

Esquemático:
         12V
          │
          ┴
         ┌┴┐
         │R1│ = 8.7 kΩ
         └┬┘
          ├────► 3.3V (salida)
         ┌┴┐
         │R2│ = 3.3 kΩ
         └┬┘
          │
         ─┴─ GND

CÁLCULOS:
Vout = Vin × R2/(R1+R2)
3.3 = 12 × R2/(R1+R2)
R1/R2 = (12-3.3)/3.3 = 2.636

Para I = 1 mA:
R_total = 12V / 1mA = 12 kΩ
R2 = 12kΩ / 3.636 = 3.3 kΩ
R1 = 12kΩ - 3.3kΩ = 8.7 kΩ

VALORES E24:
R1 = 8.2 kΩ (valor disponible más cercano)
R2 = 3.3 kΩ (valor exacto disponible)

VERIFICACIÓN:
Vout = 12 × 3.3/(8.2+3.3) = 3.44V
Error = +4.2% respecto a 3.3V

ALTERNATIVA MÁS PRECISA:
R1 = 27 kΩ, R2 = 10 kΩ
Vout = 12 × 10/(27+10) = 3.24V
Error = -1.8%
I = 12V/37kΩ = 0.32 mA

POTENCIA DISIPADA:
P_R1 = (12-3.3)² / 27k = 2.8 mW
P_R2 = 3.3² / 10k = 1.1 mW
Total = 3.9 mW (1/4W resistores suficientes)
```

### 1.3 Ejemplo: Regulador de Voltaje

```
Diseña circuito regulador:

ENTRADA: 9-15V DC (fuente variable)
SALIDA: 5V DC, 500 mA máximo
RIPPLE MÁXIMO: 50 mV

COMPONENTES DISPONIBLES:
- LM7805
- Capacitores cerámicos y electrolíticos

INCLUIR:
- Esquemático completo
- Análisis térmico
- Recomendación de disipador
```

**Esquemático ASCII generado:**

```
      Vin (9-15V)
         │
         │
        ─┴─ C1: 0.33µF cerámico
         │
    ┌────┴────┐
    │         │
    │  LM7805 │
    │         │
    └─┬───┬───┘
      │   │
      │   └── GND
      │
     ─┴─ C2: 0.1µF cerámico
      │
     ─┴─ C3: 100µF electrolítico
      │
      └────► Vout = 5V

ANÁLISIS TÉRMICO:
─────────────────
Caso peor: Vin = 15V, Iout = 500mA

P_disipada = (Vin - Vout) × Iout
P_disipada = (15 - 5) × 0.5 = 5W

Tj_max = 125°C (del datasheet)
Ta = 40°C (ambiente)
ΔT_permitido = 125 - 40 = 85°C

Rθja requerido = ΔT / P = 85/5 = 17°C/W

Sin disipador: Rθja = 65°C/W → ¡SOBRECALENTAMIENTO!

DISIPADOR REQUERIDO:
Rθjc = 5°C/W (junction to case)
Rθcs = 1°C/W (case to sink, con pasta térmica)
Rθsa = 17 - 5 - 1 = 11°C/W máximo

Recomendación: Disipador HS-101 o similar
(Rθsa ≈ 8°C/W)
```

---

## 2. Interfaces de Sensores

### 2.1 Acondicionamiento de Señal 4-20 mA

```
Diseña interfaz para sensor 4-20 mA:

SENSOR: Transmisor de presión 4-20 mA
MICROCONTROLADOR: ESP32 (ADC 0-3.3V, 12 bits)
RANGO: 0-10 bar

REQUISITOS:
- Protección contra sobrecorriente
- Protección contra sobretensión
- Precisión: 0.5% FS
```

**Diseño generado:**

```
Sensor 4-20mA                    ESP32
    │                              │
    │                         3.3V─┤
    │    ┌──────────┐              │
    └────┤ R_sense  ├────┬────────►│GPIO34 (ADC)
         │  165Ω    │    │         │
         └──────────┘    │    GND─┬┤
                         │        │
                    ┌────┴───┐    │
                    │ Zener  │    │
                    │ 3.6V   │    │
                    └────┬───┘    │
                         │        │
                        ─┴────────┘

CÁLCULOS:
─────────
V_min = 4mA × R = 0.66V (representa 0 bar)
V_max = 20mA × R = 3.3V (representa 10 bar)

R_sense = 3.3V / 20mA = 165Ω
Valor E24: 160Ω

Con 160Ω:
V @ 4mA = 0.64V
V @ 20mA = 3.2V
Rango ADC: 0.64V - 3.2V

CONVERSIÓN EN CÓDIGO:
─────────────────────
float readPressure() {
    int adc = analogRead(34);
    float voltage = adc * 3.3 / 4095.0;

    // Mapear 0.64-3.2V a 0-10 bar
    float pressure = (voltage - 0.64) / (3.2 - 0.64) * 10.0;

    return constrain(pressure, 0, 10);
}
```

### 2.2 Interfaz para Termocupla Tipo K

```
Diseña amplificador para termocupla tipo K:

RANGO: 0-500°C
SALIDA: 0-3.3V para ESP32
COMPENSACIÓN: Junta fría requerida

OPCIONES:
A) Amplificador discreto (AD8495)
B) Módulo MAX31855
```

---

## 3. Análisis Térmico

### 3.1 Prompt para Análisis Térmico

```
Realiza análisis térmico para:

COMPONENTE: [Nombre y part number]
CONDICIONES:
- Potencia disipada: [W]
- Temperatura ambiente: [°C]
- Montaje: [PCB, disipador, ventilación]

CALCULAR:
1. Temperatura de juntura
2. Margen de seguridad
3. Requerimiento de disipador
4. Alternativas si hay problema
```

### 3.2 Ejemplo Completo

```
Componente: MOSFET IRF540N
Aplicación: PWM de motor 12V/5A
Frecuencia PWM: 20 kHz
Duty cycle máximo: 100%

PARÁMETROS DEL DATASHEET:
- Rds(on) @ 10V gate: 44 mΩ
- Rθjc: 1°C/W
- Rθja: 62°C/W (sin disipador)
- Tj_max: 175°C

CÁLCULOS DE PÉRDIDAS:
─────────────────────
1. Pérdidas de conducción:
   P_cond = I² × Rds(on) = 5² × 0.044 = 1.1W

2. Pérdidas de switching (estimadas):
   P_sw ≈ 0.5 × Vds × Id × (tr + tf) × fsw
   P_sw ≈ 0.5 × 12 × 5 × (35ns + 35ns) × 20k = 0.21W

3. Pérdidas totales:
   P_total = 1.1 + 0.21 = 1.31W

TEMPERATURA SIN DISIPADOR:
─────────────────────────
Tj = Ta + P × Rθja
Tj = 40 + 1.31 × 62 = 121°C

Margen: 175 - 121 = 54°C ✓ ACEPTABLE

CON DISIPADOR PEQUEÑO (Rθsa = 20°C/W):
──────────────────────────────────────
Rθ_total = Rθjc + Rθcs + Rθsa = 1 + 0.5 + 20 = 21.5°C/W
Tj = 40 + 1.31 × 21.5 = 68°C

Margen: 175 - 68 = 107°C ✓ MUY SEGURO
```

---

## 4. Generación de BOM

### 4.1 Prompt para BOM

```
Genera BOM (Bill of Materials) para el siguiente circuito:

[Descripción del circuito o lista de componentes]

FORMATO:
- Item number
- Cantidad
- Descripción
- Valor/Part Number
- Package/Footprint
- Fabricante sugerido
- Precio estimado (USD)
- Distribuidor
```

### 4.2 Ejemplo de BOM Generado

```
=== BILL OF MATERIALS ===
Proyecto: Fuente Regulada 5V/1A
Fecha: 2024-01-15
Versión: 1.0

┌────┬─────┬─────────────────────┬────────────┬──────────┬───────────┬───────┬────────────┐
│ # │ Qty │ Description         │ Value/PN   │ Package  │ Manuf     │ Price │ Supplier   │
├────┼─────┼─────────────────────┼────────────┼──────────┼───────────┼───────┼────────────┤
│ 1  │  1  │ Voltage Regulator   │ LM7805CT   │ TO-220   │ TI        │ $0.45 │ Digi-Key   │
│ 2  │  1  │ Capacitor Ceramic   │ 0.33µF     │ 0805     │ Murata    │ $0.08 │ Mouser     │
│ 3  │  2  │ Capacitor Ceramic   │ 0.1µF      │ 0805     │ Murata    │ $0.05 │ Mouser     │
│ 4  │  1  │ Capacitor Elect.    │ 100µF/25V  │ 6.3x7mm  │ Nichicon  │ $0.15 │ Digi-Key   │
│ 5  │  1  │ Capacitor Elect.    │ 470µF/25V  │ 8x11mm   │ Nichicon  │ $0.25 │ Digi-Key   │
│ 6  │  1  │ Diode Rectifier     │ 1N4007     │ DO-41    │ ON Semi   │ $0.05 │ LCSC       │
│ 7  │  1  │ LED Green           │ 3mm        │ 3mm      │ Generic   │ $0.03 │ LCSC       │
│ 8  │  1  │ Resistor            │ 330Ω       │ 0805     │ Yageo     │ $0.02 │ LCSC       │
│ 9  │  1  │ Heatsink            │ HS-101     │ TO-220   │ Aavid     │ $0.80 │ Digi-Key   │
│ 10 │  1  │ Connector Barrel    │ 5.5x2.1mm  │ PCB      │ Generic   │ $0.20 │ LCSC       │
│ 11 │  1  │ Terminal Block      │ 2-pos      │ 5.08mm   │ Phoenix   │ $0.35 │ Digi-Key   │
│ 12 │  1  │ PCB                 │ Custom     │ 30x50mm  │ JLCPCB    │ $0.50 │ JLCPCB     │
├────┴─────┴─────────────────────┴────────────┴──────────┴───────────┴───────┴────────────┤
│                                                          TOTAL (10 unidades): $29.30    │
│                                                          Precio unitario: $2.93         │
└──────────────────────────────────────────────────────────────────────────────────────────┘

NOTAS:
1. Precios basados en cantidades de 10+ unidades
2. Agregar 20% por contingencia y envío
3. Verificar disponibilidad antes de ordenar
```

---

## 5. Revisión de Diseños

### 5.1 Checklist de Revisión PCB

```
Revisa el diseño de PCB para sistema industrial:

APLICACIÓN: [Descripción]
AMBIENTE: [Temperatura, humedad, EMI]

VERIFICAR:
□ Separación de tierras (analog/digital/power)
□ Ancho de pistas para corriente
□ Clearance para voltajes presentes
□ Protección ESD en conectores
□ Filtrado en entradas de alimentación
□ Disipación térmica
□ Ubicación de cristales (alejados de ruido)
□ Vías de tierra bajo componentes sensibles
□ Plano de tierra continuo
□ Desacoplo en cada IC
```

### 5.2 Prompt para Revisión

```
Revisa este diseño de circuito:

[Descripción o esquemático ASCII]

BUSCAR:
1. Errores de diseño
2. Componentes faltantes
3. Valores incorrectos
4. Problemas de seguridad
5. Mejoras sugeridas

CONTEXTO:
- Aplicación: [uso]
- Ambiente: [condiciones]
- Volumen: [cantidad]
```

---

## 6. Prompts Útiles

### 6.1 Cálculo de Fuente Switching

```
Diseña fuente buck DC-DC:
Vin: 12V
Vout: 5V
Iout: 2A
Frecuencia: 500 kHz
Ripple máximo: 50 mV

Calcular:
- Inductancia mínima
- Capacitancia de salida
- Selección de MOSFET y diodo
- IC controlador recomendado
```

### 6.2 Protección de Entradas

```
Diseña protección para entrada digital industrial:
- Voltaje nominal: 24V DC
- Compatible con: 0-5V lógica
- Protección contra:
  * Sobrevoltaje hasta 40V
  * Polaridad inversa
  * ESD (IEC 61000-4-2)
  * Transitorios (IEC 61000-4-4)
```

---

## Resumen

En este módulo aprendimos:

1. **Cálculos de componentes** con valores E24 reales
2. **Interfaces de sensores** (4-20mA, termocuplas)
3. **Análisis térmico** para selección de disipadores
4. **Generación de BOM** profesional
5. **Revisión de diseños** con checklists

### Próximo Módulo

En el Módulo 05 aplicaremos IA para programación de PLCs.

---

*Módulo 04 - Diseño de Circuitos*
*Duración: 2 horas*
