# Ejercicio Práctico - Módulo 04
## Diseño de Fuente de Alimentación Regulada

---

## Objetivo

Diseñar una fuente de alimentación dual (5V y 3.3V) para un sistema embebido, incluyendo cálculos de componentes, análisis térmico y documentación completa.

**Duración:** 20 minutos
**Tipo:** Diseño asistido por IA
**Herramientas:** Claude/ChatGPT, calculadora

---

## Especificaciones del Proyecto

```
┌─────────────────────────────────────────────────────────────┐
│           FUENTE DE ALIMENTACIÓN DUAL                        │
│                                                              │
│   ENTRADA                        SALIDAS                    │
│   ┌──────────┐                  ┌──────────┐               │
│   │ 9-15V DC │                  │  5V / 1A │               │
│   │ Adaptador│ ──────────────►  │          │               │
│   │ de pared │                  │ 3.3V/500mA│              │
│   └──────────┘                  └──────────┘               │
│                                                              │
│   REQUISITOS:                                               │
│   • Protección de polaridad inversa                         │
│   • LED indicador de encendido                              │
│   • Ripple < 50 mV                                          │
│   • Conector barrel 5.5/2.1mm                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Parte 1: Diseño del Circuito (8 minutos)

### Paso 1.1: Solicitar Esquemático

Envía este prompt a la IA:

```
Diseña fuente de alimentación dual con LM7805 y LM1117-3.3:

ENTRADA:
- Voltaje: 9-15V DC
- Conector: Barrel jack 5.5/2.1mm

SALIDA 1:
- 5V DC, 1A máximo
- Regulador: LM7805CT (TO-220)

SALIDA 2:
- 3.3V DC, 500mA máximo
- Regulador: LM1117-3.3 (SOT-223)
- Alimentado desde salida de 5V

PROTECCIONES:
- Diodo para polaridad inversa
- LED indicador verde

GENERAR:
1. Esquemático ASCII completo
2. Lista de componentes con valores
3. Notas de diseño importantes
```

### Paso 1.2: Completar Esquemático

Dibuja o completa el esquemático en el espacio:

```
                     ENTRADA
                        │
            ┌───────────┴───────────┐
            │      BARREL JACK      │
            │       5.5/2.1mm       │
            └───────────┬───────────┘
                        │
                       ─┴─  D1: ___________
                        │   (protección polaridad)
                        │
                       ─┴─  C1: ___________
                        │   (filtro entrada)
                        │
               ┌────────┼────────┐
               │                 │
          ┌────┴────┐      ┌────┴────┐
          │ LM7805  │      │         │
          │  5V/1A  │      │         │
          └────┬────┘      │         │
               │           │         │
              ─┴─ C2       │         │
               │           │         │
               ├───────────┼─► 5V OUT
               │           │
          ┌────┴────┐      │
          │LM1117   │      │
          │  3.3V   │      │
          └────┬────┘      │
               │           │
              ─┴─ C3       │
               │           │
               └───────────┴─► 3.3V OUT

          LED + Resistor: ___________
```

### Paso 1.3: Valores de Componentes

Completa la tabla con ayuda de la IA:

| Ref | Componente | Valor | Justificación |
|-----|------------|-------|---------------|
| D1 | Diodo | | |
| C1 | Capacitor electrolítico | | |
| C2 | Capacitor cerámico | | |
| C3 | Capacitor cerámico | | |
| C4 | Capacitor electrolítico (salida 5V) | | |
| C5 | Capacitor electrolítico (salida 3.3V) | | |
| R1 | Resistor LED | | |
| LED1 | LED verde | | |

---

## Parte 2: Análisis Térmico (6 minutos)

### Paso 2.1: Calcular Potencia Disipada

Solicita a la IA:

```
Calcula la potencia disipada en cada regulador:

CONDICIONES:
- Vin máximo: 15V
- I_5V: 1A (carga completa)
- I_3.3V: 500mA (carga completa)

CALCULAR:
1. Potencia en LM7805
2. Potencia en LM1117-3.3
3. Potencia total del sistema
```

Completa los cálculos:

**LM7805:**
- Vin = 15V, Vout = 5V, I = 1A
- P = (Vin - Vout) × I = _______ W

**LM1117-3.3:**
- Vin = 5V, Vout = 3.3V, I = 0.5A
- P = (Vin - Vout) × I = _______ W

**Potencia total:** _______ W

### Paso 2.2: Determinar Disipador

Solicita a la IA:

```
Determina si se necesita disipador para LM7805:

DATOS:
- Potencia disipada: [valor calculado]
- Tj_max: 125°C
- Ta: 40°C
- Rθja (sin disipador): 65°C/W
- Rθjc: 5°C/W

CALCULAR:
1. Temperatura de juntura sin disipador
2. ¿Se necesita disipador?
3. Si sí, Rθsa requerido
4. Modelo de disipador recomendado
```

Completa:

| Parámetro | Valor |
|-----------|-------|
| Tj sin disipador | °C |
| ¿Dentro de límite? | Sí / No |
| Disipador requerido | Sí / No |
| Rθsa requerido | °C/W |
| Modelo sugerido | |

---

## Parte 3: Documentación (6 minutos)

### Paso 3.1: Generar BOM

Solicita a la IA:

```
Genera BOM completa para la fuente dual 5V/3.3V:

INCLUIR:
- Todos los componentes del circuito
- Conectores y hardware
- PCB estimado

FORMATO:
Tabla con: Item, Qty, Description, Value, Package, Est. Price
```

### Paso 3.2: Completar BOM

| Item | Qty | Description | Value/PN | Package | Price |
|------|-----|-------------|----------|---------|-------|
| 1 | 1 | Voltage Regulator | LM7805CT | TO-220 | |
| 2 | 1 | Voltage Regulator | LM1117-3.3 | SOT-223 | |
| 3 | 1 | Diode | | | |
| 4 | | Capacitor | | | |
| 5 | | Capacitor | | | |
| 6 | | Capacitor | | | |
| 7 | 1 | LED | | | |
| 8 | 1 | Resistor | | | |
| 9 | 1 | Barrel Jack | | | |
| 10 | 1 | Terminal Block | | | |
| 11 | 1 | Heatsink | | | |
| | | | **TOTAL:** | | |

### Paso 3.3: Especificaciones Finales

Completa las especificaciones del diseño:

```
=== ESPECIFICACIONES DE LA FUENTE ===

ENTRADA:
- Voltaje: _______ V DC
- Corriente máxima: _______ mA
- Conector: _______

SALIDA 5V:
- Voltaje: 5V ± _______ %
- Corriente máxima: _______ mA
- Ripple: < _______ mV

SALIDA 3.3V:
- Voltaje: 3.3V ± _______ %
- Corriente máxima: _______ mA
- Ripple: < _______ mV

PROTECCIONES:
- Polaridad inversa: _______
- Sobrecorriente: _______
- Térmica: _______

EFICIENCIA (estimada):
- A carga máxima: _______ %
- Potencia disipada: _______ W

INDICADORES:
- LED encendido: _______
```

---

## Entregables

### Archivos a Entregar

```
M04_Ejercicio_[TuApellido]/
├── esquematico.md          # Esquemático ASCII completo
├── calculos.md             # Cálculos térmicos
├── bom.csv                 # Bill of Materials
├── especificaciones.md     # Hoja de datos
└── prompts.txt             # Prompts utilizados
```

### Formato de esquematico.md

```markdown
# Esquemático - Fuente Dual 5V/3.3V

## Diagrama

[Esquemático ASCII aquí]

## Notas de Diseño

1. [Nota sobre protección]
2. [Nota sobre capacitores]
3. [Nota sobre disipación]
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Esquemático completo | 25 | Todos los componentes, conexiones correctas |
| Valores correctos | 20 | Componentes dimensionados apropiadamente |
| Análisis térmico | 20 | Cálculos correctos, disipador si necesario |
| BOM completa | 15 | Todos los items, precios estimados |
| Especificaciones | 10 | Documento completo y correcto |
| Prompts documentados | 10 | Registro de interacción con IA |
| **Total** | **100** | |

---

## Extensiones Opcionales

### Extensión 1: Agregar Protección de Sobrecorriente

```
Agrega fusible reseteable (PTC) a la entrada:
- Corriente nominal: 1.5A
- Trip current: 3A
- Recomienda modelo específico
```

### Extensión 2: Indicador de Bajo Voltaje

```
Diseña circuito que encienda LED rojo si Vin < 8V:
- Usar comparador o transistor
- Histéresis de 0.5V
```

### Extensión 3: Versión SMD

```
Rediseña usando solo componentes SMD:
- LM7805 en D2PAK
- Capacitores 0805
- Generar nuevo BOM con precios actualizados
```

---

## Verificación Final

Antes de entregar, verifica:

- [ ] Esquemático tiene todos los componentes
- [ ] Diodo de protección en posición correcta
- [ ] Capacitores de entrada y salida presentes
- [ ] Cálculo térmico indica margen seguro
- [ ] LED con resistor calculado correctamente
- [ ] BOM tiene todos los items
- [ ] Precios estimados son razonables
- [ ] Prompts documentados

---

*Módulo 04 - Ejercicio Práctico*
*Tiempo estimado: 20 minutos*
