# Ejercicio Práctico - Módulo 04
## Diseño de Fuente de Alimentación con IA

---

## Objetivo

Diseñar una fuente de alimentación dual utilizando IA para cálculos, selección de componentes, diseño de esquemático y generación de documentación técnica.

**Duración:** 15 minutos
**Tipo:** Práctico guiado
**Herramientas:** Claude/ChatGPT, calculadora, papel para esquemáticos

---

## Especificaciones del Proyecto

### Requerimientos

| Parámetro | Especificación |
|-----------|----------------|
| Entrada | 9V - 15V DC |
| Salida 1 | 5V @ 500mA |
| Salida 2 | 3.3V @ 300mA |
| Ripple máximo | < 50mV |
| Protección | Inversión de polaridad |
| Indicador | LED de encendido |

---

## Parte 1: Cálculos con IA (5 minutos)

### Paso 1.1: Consultar Cálculos a la IA

Envía este prompt a Claude o ChatGPT:

```
Necesito diseñar una fuente de alimentación lineal con:
- Entrada: 9V a 15V DC
- Salida 1: 5V @ 500mA (regulador LM7805)
- Salida 2: 3.3V @ 300mA (regulador LM1117-3.3)

Por favor calcula:
1. Capacitor de entrada recomendado
2. Capacitores de salida para cada regulador
3. Disipación térmica de cada regulador (peor caso: Vin=15V)
4. ¿Necesita disipador? Calcular si Tj < 125°C
5. Resistencia para LED indicador (3.3V, 10mA)

Incluye fórmulas y justificación de cada valor.
```

### Paso 1.2: Registrar Resultados

Completa la tabla con los valores calculados por la IA:

| Componente | Valor Calculado | Valor Comercial | Justificación |
|------------|-----------------|-----------------|---------------|
| C_entrada | | | |
| C_5V_out | | | |
| C_3.3V_out | | | |
| R_LED | | | |
| P_LM7805 | | W | |
| P_LM1117 | | W | |
| ¿Disipador 7805? | | | |
| ¿Disipador 1117? | | | |

### Paso 1.3: Verificar Cálculos

Usa la calculadora para verificar al menos 2 cálculos de la IA:

**Disipación LM7805:**
```
P = (Vin_max - Vout) × Iout
P = (15V - 5V) × 0.5A = 5W
```

¿Coincide con el valor de la IA? ____

**Resistencia LED:**
```
R = (Vin - Vf_LED) / I_LED
R = (5V - 2V) / 10mA = 300Ω
```

¿Coincide con el valor de la IA? ____

---

## Parte 2: Diseño de Esquemático (5 minutos)

### Paso 2.1: Solicitar Esquemático ASCII

Envía este prompt:

```
Genera el esquemático de la fuente diseñada en formato ASCII:
- Incluir protección de polaridad con diodo o MOSFET
- Mostrar todos los capacitores con valores
- Indicar números de pin de los reguladores
- Agregar LED de status conectado a 5V
- Incluir conectores de entrada (barrel jack) y salida (headers)

Formato: diagrama ASCII legible con valores de componentes
```

### Paso 2.2: Dibujar Esquemático

Basándote en la respuesta de la IA, completa o corrige este esquemático:

```
         ┌──────────────────────────────────────────────────────┐
         │                                                      │
    Vin ─┤►├─┬─[C1 ___μF]─┬───┬────────────┬───────────────────┤─ GND
   (DC)  D1  │            │   │            │                    │
             │         ┌──┴──┐│         ┌──┴──┐                 │
             │    IN ─►│7805 ├┘    IN ─►│1117 │                 │
             │         │     │OUT       │     │OUT              │
             │         └──┬──┘         └──┬──┘                  │
             │            │   │           │   │                 │
             │      [C2___]   │     [C3___]   │                 │
             │            │   │           │   │                 │
         5V ─┴────────────┴───┼───────────┘   │                 │
                              │               │                 │
         3.3V ────────────────┴───────────────┴─────────────────┤
                                                                │
         LED─[R___Ω]─────────────────────────────────────────── 5V
```

Completa los valores en los espacios: C1=___, C2=___, C3=___, R=___

### Paso 2.3: Lista de Conexiones

Solicita a la IA:

```
Para el esquemático anterior, genera la lista de conexiones (netlist):
- Formato: Componente.Pin -> Nodo
- Incluir todos los componentes
- Identificar nodos: VIN, GND, 5V, 3.3V
```

---

## Parte 3: Documentación y BOM (5 minutos)

### Paso 3.1: Generar BOM

Solicita a la IA:

```
Genera el Bill of Materials para la fuente de alimentación:

Formato tabla:
| Ref | Cantidad | Descripción | Valor | Package | Proveedor |

Incluir:
- Todos los componentes
- Valores específicos
- Footprints recomendados (THT preferido)
- Al menos un proveedor (DigiKey, Mouser, local)
- Precio estimado por unidad
- Total para 5 unidades
```

### Paso 3.2: Completar BOM

| Ref | Cant | Descripción | Valor | Package | Precio Est. |
|-----|------|-------------|-------|---------|-------------|
| D1 | 1 | | | | |
| U1 | 1 | | | | |
| U2 | 1 | | | | |
| C1 | 1 | | | | |
| C2 | 1 | | | | |
| C3 | 1 | | | | |
| R1 | 1 | | | | |
| LED1 | 1 | | | | |
| J1 | 1 | | | | |
| J2 | 1 | | | | |
| | | | | **Total:** | |

### Paso 3.3: Generar Instrucciones de Prueba

Solicita a la IA:

```
Genera un procedimiento de prueba para la fuente de alimentación:

1. Pruebas antes de energizar (continuidad, cortocircuitos)
2. Pruebas con alimentación
3. Mediciones a realizar
4. Criterios de aceptación
5. Troubleshooting básico

Formato: checklist con valores esperados
```

---

## Entregables

### Archivos a Entregar

1. **Tabla de cálculos** completada (Parte 1)
2. **Esquemático** dibujado con valores (Parte 2)
3. **BOM completo** con precios (Parte 3)
4. **Procedimiento de prueba** generado por IA

### Estructura de Entrega

```
M04_Ejercicio_[TuApellido]/
├── calculos.md
├── esquematico.png (o .pdf)
├── bom.csv
├── procedimiento_prueba.md
└── reflexion.md
```

### Reflexión (incluir en reflexion.md)

Responde:
1. ¿Qué cálculo de la IA tuviste que corregir?
2. ¿El esquemático generado estaba completo?
3. ¿Qué información faltó en el BOM?
4. ¿Cómo mejorarías los prompts para obtener mejores resultados?

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Cálculos correctos | 25 | Valores verificados y coherentes |
| Esquemático completo | 25 | Todos los componentes y conexiones |
| BOM detallado | 20 | Valores, packages, precios |
| Procedimiento de prueba | 15 | Pasos claros y criterios |
| Reflexión crítica | 15 | Análisis de calidad de IA |
| **Total** | **100** | |

---

## Extensión: Diseño en KiCad

Si tienes KiCad instalado:

```
Prompt para IA:
"Genera los pasos detallados para crear este esquemático en KiCad 7:
1. Crear nuevo proyecto
2. Agregar símbolos (de qué bibliotecas)
3. Conectar componentes
4. Asignar footprints
5. Generar netlist
6. Crear PCB básico

Incluir atajos de teclado útiles."
```

---

## Notas de Seguridad

- **Nunca** aplicar voltaje antes de verificar continuidad
- **Verificar** polaridad del capacitor electrolítico
- **Usar** multímetro en rango apropiado
- **Los reguladores** pueden calentarse, precaución
- **Si huele a quemado**, desconectar inmediatamente

---

*Módulo 04 - IA para Diseño de Circuitos*
*Tiempo estimado: 15 minutos*
