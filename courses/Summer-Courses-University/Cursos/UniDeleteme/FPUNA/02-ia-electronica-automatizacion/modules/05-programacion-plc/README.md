# Módulo 05: IA para Programación de PLCs
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Generar código Ladder con asistencia de IA
- Programar PLCs Siemens S7-1200 con TIA Portal
- Crear lógica Structured Text (ST) con prompts efectivos
- Documentar programas PLC automáticamente
- Diagnosticar problemas en programas PLC con IA

---

## 1. Introducción a PLCs con IA

### 1.1 ¿Por Qué Usar IA para PLCs?

```
┌─────────────────────────────────────────────────────────────┐
│                  Beneficios de IA en PLCs                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   Generación  │  │ Documentación │  │  Debugging    │   │
│  │   de Código   │  │   Automática  │  │   Asistido    │   │
│  │   50% más     │  │   Comentarios │  │   Sugerencias │   │
│  │   rápido      │  │   y descrip.  │  │   de causa    │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │  Conversión   │  │   Análisis    │  │   Mejores     │   │
│  │  de Lenguajes │  │   de Lógica   │  │   Prácticas   │   │
│  │  LAD↔ST↔FBD   │  │   Compleja    │  │   IEC 61131   │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Lenguajes de Programación IEC 61131-3

| Lenguaje | Abreviatura | Uso Típico | Soporte IA |
|----------|-------------|------------|------------|
| Ladder Diagram | LD/LAD | Control discreto, relés | Excelente |
| Function Block | FBD | Control analógico, PID | Bueno |
| Structured Text | ST | Cálculos, algoritmos | Excelente |
| Instruction List | IL | Legacy, bajo nivel | Regular |
| Sequential Function Chart | SFC | Secuencias, batch | Bueno |

---

## 2. Generación de Código Ladder con IA

### 2.1 Estructura del Prompt para Ladder

```
[CONTEXTO]
- PLC: Siemens S7-1200
- Proyecto: [Descripción general]

[ENTRADAS]
- I0.0: [Descripción]
- I0.1: [Descripción]
...

[SALIDAS]
- Q0.0: [Descripción]
- Q0.1: [Descripción]
...

[LÓGICA REQUERIDA]
1. [Condición 1]
2. [Condición 2]
...

[FORMATO]
- Lenguaje: Ladder
- Comentarios: En español
- Incluir: Descripción de cada rung
```

### 2.2 Ejemplo: Arranque/Parada de Motor

**Prompt:**

```
Genera código Ladder para arranque/parada de motor trifásico:

PLC: Siemens S7-1200 (TIA Portal V17)

ENTRADAS:
- I0.0: Botón START (NA, pulso)
- I0.1: Botón STOP (NC, pulso)
- I0.2: Relé térmico (NC, protección)

SALIDAS:
- Q0.0: Contactor principal (motor)
- Q0.1: Lámpara verde (marcha)
- Q0.2: Lámpara roja (paro/falla)

LÓGICA:
1. START arranca motor con enclavamiento
2. STOP detiene motor
3. Relé térmico detiene y señaliza falla
4. Lámpara verde durante marcha
5. Lámpara roja en paro o falla
6. Falla requiere reset manual (STOP + START)

FORMATO:
- Ladder con comentarios en español
- Incluir bit de memoria M0.0 para falla
- Descripción de cada rung
```

**Respuesta de IA (Ladder ASCII):**

```
// Network 1: Arranque de motor con enclavamiento
// START (I0.0) arranca, mantiene con Q0.0, STOP (I0.1) y térmico (I0.2) detienen

     I0.0      I0.1      I0.2                    Q0.0
  ───┤ ├───┬───┤/├───────┤/├────────────────────( )───
           │                                      │
     Q0.0  │                                      │
  ───┤ ├───┘                                      │

// Network 2: Detección de falla por relé térmico
// Si I0.2 se abre, setear bit de falla M0.0

     I0.2                                       M0.0
  ───┤/├───────────────────────────────────────(S)───

// Network 3: Reset de falla
// Presionar STOP + START para resetear

     I0.1      I0.0                             M0.0
  ───┤ ├───────┤ ├─────────────────────────────(R)───

// Network 4: Lámpara verde (motor en marcha)

     Q0.0                                       Q0.1
  ───┤ ├───────────────────────────────────────( )───

// Network 5: Lámpara roja (paro o falla)

     Q0.0                                       Q0.2
  ───┤/├───────────────────────────────────────( )───
```

### 2.3 Tabla de Direcciones

Solicitar a la IA:

```
Genera la tabla de direcciones (Tag Table) para TIA Portal:

Formato:
| Nombre | Dirección | Tipo | Comentario |
```

**Resultado:**

| Nombre | Dirección | Tipo | Comentario |
|--------|-----------|------|------------|
| START | %I0.0 | Bool | Botón de arranque |
| STOP | %I0.1 | Bool | Botón de parada |
| RELE_TERMICO | %I0.2 | Bool | Protección térmica |
| MOTOR | %Q0.0 | Bool | Contactor principal |
| LAMP_VERDE | %Q0.1 | Bool | Indicador marcha |
| LAMP_ROJA | %Q0.2 | Bool | Indicador paro/falla |
| FALLA | %M0.0 | Bool | Bit de falla |

---

## 3. Programación en Structured Text (ST)

### 3.1 Ventajas de ST para Cálculos

Structured Text es ideal para:
- Cálculos matemáticos complejos
- Algoritmos de control (PID)
- Manejo de datos (arrays, structs)
- Conversión de protocolos

### 3.2 Ejemplo: Control PID de Temperatura

**Prompt:**

```
Genera código Structured Text para control PID de temperatura:

PLC: Siemens S7-1200

VARIABLES:
- Setpoint: Real (temperatura deseada, 0-100°C)
- PV: Real (temperatura actual, sensor 4-20mA escalado)
- Output: Real (salida 0-100% a válvula proporcional)

PARÁMETROS PID:
- Kp: 2.0
- Ki: 0.5
- Kd: 0.1
- Tiempo de muestreo: 100ms

INCLUIR:
1. Estructura UDT para parámetros PID
2. Función PID con anti-windup
3. Límites de salida (0-100%)
4. Comentarios explicativos en español

FORMATO: Structured Text compatible con TIA Portal
```

**Código ST generado:**

```pascal
// =====================================================
// Control PID de Temperatura
// Siemens S7-1200 - TIA Portal
// =====================================================

TYPE PID_Params :
STRUCT
    Kp : REAL := 2.0;        // Ganancia proporcional
    Ki : REAL := 0.5;        // Ganancia integral
    Kd : REAL := 0.1;        // Ganancia derivativa
    Ts : REAL := 0.1;        // Tiempo muestreo (segundos)
    OutMin : REAL := 0.0;    // Límite inferior salida
    OutMax : REAL := 100.0;  // Límite superior salida
END_STRUCT
END_TYPE

TYPE PID_State :
STRUCT
    Integral : REAL := 0.0;   // Acumulador integral
    PrevError : REAL := 0.0;  // Error anterior (para derivada)
    Output : REAL := 0.0;     // Última salida calculada
END_STRUCT
END_TYPE

// =====================================================
// Función: PID_Control
// Calcula salida PID con anti-windup
// =====================================================
FUNCTION PID_Control : REAL
VAR_INPUT
    Setpoint : REAL;     // Valor deseado
    ProcessVar : REAL;   // Valor actual (sensor)
    Enable : BOOL;       // Habilitar control
END_VAR
VAR_IN_OUT
    Params : PID_Params; // Parámetros PID
    State : PID_State;   // Estado interno
END_VAR
VAR
    Error : REAL;
    P_Term : REAL;
    I_Term : REAL;
    D_Term : REAL;
    Output_Unlimited : REAL;
END_VAR

// Calcular error
Error := Setpoint - ProcessVar;

IF Enable THEN
    // Término Proporcional
    P_Term := Params.Kp * Error;

    // Término Integral con anti-windup
    State.Integral := State.Integral + (Error * Params.Ts);

    // Limitar integral para anti-windup
    IF State.Integral > (Params.OutMax / Params.Ki) THEN
        State.Integral := Params.OutMax / Params.Ki;
    ELSIF State.Integral < (Params.OutMin / Params.Ki) THEN
        State.Integral := Params.OutMin / Params.Ki;
    END_IF;

    I_Term := Params.Ki * State.Integral;

    // Término Derivativo
    D_Term := Params.Kd * (Error - State.PrevError) / Params.Ts;

    // Calcular salida total
    Output_Unlimited := P_Term + I_Term + D_Term;

    // Limitar salida
    IF Output_Unlimited > Params.OutMax THEN
        State.Output := Params.OutMax;
    ELSIF Output_Unlimited < Params.OutMin THEN
        State.Output := Params.OutMin;
    ELSE
        State.Output := Output_Unlimited;
    END_IF;

    // Guardar error para próximo ciclo
    State.PrevError := Error;

ELSE
    // Control deshabilitado - reset
    State.Integral := 0.0;
    State.PrevError := 0.0;
    State.Output := 0.0;
END_IF;

PID_Control := State.Output;

END_FUNCTION
```

---

## 4. Documentación Automática de PLCs

### 4.1 Generar Descripciones de Bloques

**Prompt:**

```
Genera documentación para el bloque PID anterior:

Incluir:
1. Descripción general del bloque
2. Tabla de variables de entrada
3. Tabla de variables de salida
4. Diagrama de flujo del algoritmo
5. Ejemplo de uso
6. Notas de implementación

Formato: Markdown para incluir en proyecto
```

### 4.2 Comentarios en Código

Solicitar a la IA que agregue comentarios detallados:

```
Agrega comentarios explicativos al siguiente código Ladder.
Cada rung debe tener:
1. Número y nombre de la lógica
2. Explicación de condiciones
3. Resultado esperado
4. Referencia a P&ID si aplica

[Código Ladder aquí]
```

---

## 5. Troubleshooting con IA

### 5.1 Diagnóstico de Problemas

**Prompt para debugging:**

```
Tengo un problema en un programa de PLC Siemens S7-1200:

SÍNTOMAS:
- El motor arranca pero se detiene después de 3 segundos
- La lámpara de falla no se enciende
- El relé térmico no está disparado

CÓDIGO LADDER:
[Pegar código aquí]

TABLA DE TAGS:
[Pegar tabla aquí]

VALORES OBSERVADOS EN ONLINE:
- I0.0 (START): 0
- I0.1 (STOP): 1 (NC, debería ser 1 en reposo)
- I0.2 (TERMICO): 1
- Q0.0 (MOTOR): parpadea
- M0.0 (FALLA): 0

¿Cuál puede ser la causa? Proporciona:
1. Análisis lógico paso a paso
2. Posibles causas ordenadas por probabilidad
3. Pruebas de diagnóstico recomendadas
```

### 5.2 Análisis de Lógica Compleja

```
Analiza esta lógica de seguridad y verifica si cumple:
1. Principio de falla segura (fail-safe)
2. Redundancia adecuada
3. Norma IEC 62061 / SIL 2

[Código aquí]

Identifica:
- Puntos débiles
- Mejoras recomendadas
- Condiciones de carrera potenciales
```

---

## 6. Conversión entre Lenguajes

### 6.1 Ladder a Structured Text

**Prompt:**

```
Convierte el siguiente código Ladder a Structured Text:

[Ladder]
     I0.0      I0.1                             Q0.0
  ───┤ ├───┬───┤/├─────────────────────────────( )───
           │
     Q0.0  │
  ───┤ ├───┘

Mantener la misma lógica y agregar comentarios.
```

**Resultado ST:**

```pascal
// Arranque de motor con enclavamiento
// I0.0: START (pulso)
// I0.1: STOP (NC)
// Q0.0: MOTOR (salida)

IF (I0_0 OR Q0_0) AND NOT I0_1 THEN
    Q0_0 := TRUE;   // Activar motor
ELSE
    Q0_0 := FALSE;  // Desactivar motor
END_IF;
```

### 6.2 Structured Text a Function Block

```
Convierte esta función ST a diagrama de bloques funcionales (FBD):

[Código ST]

Mostrar:
1. Representación gráfica del FB
2. Entradas a la izquierda
3. Salidas a la derecha
4. Bloques internos (AND, OR, timers)
```

---

## 7. Ejercicio Práctico

### Especificaciones

Diseñar control de semáforo vehicular con:
- 2 semáforos opuestos (Norte-Sur, Este-Oeste)
- Ciclo: Verde 30s, Amarillo 5s, Rojo 35s
- Botón de emergencia (todo rojo)
- Modo nocturno (amarillo intermitente)

### Prompt Completo

```
Diseña el programa PLC para control de semáforo:

PLC: Siemens S7-1200

ENTRADAS:
- I0.0: Selector Auto/Manual
- I0.1: Modo nocturno
- I0.2: Emergencia

SALIDAS:
- Q0.0: Verde Norte-Sur
- Q0.1: Amarillo Norte-Sur
- Q0.2: Rojo Norte-Sur
- Q0.3: Verde Este-Oeste
- Q0.4: Amarillo Este-Oeste
- Q0.5: Rojo Este-Oeste

TEMPORIZADORES:
- T1: Verde (30s)
- T2: Amarillo (5s)

ESTADOS:
1. Normal: Ciclo automático
2. Nocturno: Amarillo intermitente
3. Emergencia: Todo rojo

ENTREGABLES:
1. Código Ladder para secuencia
2. Diagrama de estados
3. Tabla de tiempos
4. Documentación de bloques
```

---

## Resumen

| Tarea | Prompt Clave |
|-------|--------------|
| Generar Ladder | Contexto + I/O + Lógica + Formato |
| Structured Text | Variables + Algoritmo + Tipos de datos |
| Documentación | Descripción + Tablas + Diagramas |
| Troubleshooting | Síntomas + Código + Valores observados |
| Conversión | Código fuente + Lenguaje destino |

---

## Recursos

- [TIA Portal Documentation](https://support.industry.siemens.com/)
- [IEC 61131-3 Standard](https://www.plcopen.org/iec-61131-3)
- [PLCopen Function Blocks](https://www.plcopen.org/)

---

*Siguiente: Módulo 06 - IA para SCADA y HMI*
