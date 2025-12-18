# Módulo 05: Programación de PLCs con IA
## Generación de Ladder, Structured Text y Diagnóstico

---

## Objetivos del Módulo

Al finalizar este módulo, serás capaz de:
- Generar lógica Ladder para secuencias industriales
- Programar en Structured Text (IEC 61131-3)
- Diagnosticar problemas de PLC con asistencia de IA
- Documentar programas de forma profesional

---

## 1. Fundamentos de PLC

### 1.1 Ciclo de Scan

```
┌────────────────────────────────────────────────────────────┐
│                    CICLO DE SCAN DEL PLC                    │
│                                                             │
│    ┌──────────┐    ┌──────────┐    ┌──────────┐           │
│    │  LEER    │    │ EJECUTAR │    │ ESCRIBIR │           │
│    │ ENTRADAS │───►│ PROGRAMA │───►│ SALIDAS  │           │
│    └──────────┘    └──────────┘    └──────────┘           │
│         │                                   │              │
│         └───────────────────────────────────┘              │
│                    ← Típico: 1-20 ms →                     │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### 1.2 Direccionamiento Siemens S7-1200

| Tipo | Formato | Ejemplo | Descripción |
|------|---------|---------|-------------|
| Entrada digital | %IX.Y | %I0.0 | Entrada byte 0, bit 0 |
| Salida digital | %QX.Y | %Q0.0 | Salida byte 0, bit 0 |
| Marca/Flag | %MX.Y | %M0.0 | Memoria interna |
| Timer | %TXX | %T1 | Temporizador |
| Counter | %CXX | %C1 | Contador |
| Word | %MW | %MW10 | Word de 16 bits |
| DWord | %MD | %MD20 | Double word 32 bits |

### 1.3 Notación ASCII para Ladder

```
Contacto normalmente abierto (NA):    --| |--
Contacto normalmente cerrado (NC):    --|/|--
Bobina de salida:                     --( )--
Bobina SET (latch):                   --(S)--
Bobina RESET (unlatch):               --(R)--
Timer On-Delay:                       --[TON]--
Contador ascendente:                  --[CTU]--
Comparador igual:                     --[==]--
```

---

## 2. Generación de Lógica Ladder

### 2.1 Prompt Base para Ladder

```
Genera lógica Ladder para [descripción de la secuencia]:

PLATAFORMA: [Siemens S7-1200 / Allen-Bradley / etc]

ENTRADAS:
- [I0.0] [Nombre] - [Descripción]
- [I0.1] [Nombre] - [Descripción]
...

SALIDAS:
- [Q0.0] [Nombre] - [Descripción]
- [Q0.1] [Nombre] - [Descripción]
...

SECUENCIA:
1. [Paso 1 - condición y acción]
2. [Paso 2 - condición y acción]
...

REQUISITOS:
- Modo AUTO/MANUAL
- Botón de emergencia
- Indicadores de estado
- [Otros requisitos]

GENERAR:
- Diagrama Ladder en ASCII
- Tabla de variables/tags
- Descripción de cada rung
```

### 2.2 Ejemplo: Control de Arranque/Parada

**Prompt:**
```
Genera Ladder para control de motor con arranque/parada:

ENTRADAS:
- I0.0: START (pulsador NA)
- I0.1: STOP (pulsador NC, N.C. cableado)
- I0.2: OVERLOAD (relé térmico, N.C.)

SALIDAS:
- Q0.0: MOTOR_RUN (contactor)
- Q0.1: PILOT_LIGHT (luz indicadora)

REQUISITOS:
- Enclavamiento del motor
- El STOP tiene prioridad sobre START
- Si hay sobrecarga, desactivar motor
```

**Respuesta de IA:**

```
=== LADDER: CONTROL DE MOTOR ===

TABLA DE VARIABLES:
┌────────┬───────────────┬────────────┬──────────────────────┐
│ Tag    │ Dirección     │ Tipo       │ Descripción          │
├────────┼───────────────┼────────────┼──────────────────────┤
│ START  │ %I0.0         │ BOOL       │ Pulsador arranque    │
│ STOP   │ %I0.1         │ BOOL       │ Pulsador parada (NC) │
│ OVLD   │ %I0.2         │ BOOL       │ Relé térmico (NC)    │
│ MOTOR  │ %Q0.0         │ BOOL       │ Contactor motor      │
│ LIGHT  │ %Q0.1         │ BOOL       │ Luz indicadora       │
└────────┴───────────────┴────────────┴──────────────────────┘

RUNG 1: Enclavamiento de motor
─────────────────────────────────────────────────────
Descripción: Arranque con enclavamiento, parada prioritaria

    START     STOP      OVLD          MOTOR
──┤ ├──────┤ ├──────┤ ├─────────────( )──
    │
    │        MOTOR
────┴────────┤ ├──────────────────────────

Lógica: MOTOR = (START OR MOTOR) AND STOP AND OVLD

Nota: STOP y OVLD son contactos NC, su estado normal
      es TRUE (1). Se abren (FALSE) para detener.


RUNG 2: Indicador de funcionamiento
─────────────────────────────────────────────────────
Descripción: Luz piloto cuando motor está encendido

    MOTOR                           LIGHT
──┤ ├─────────────────────────────( )──


=== FIN DEL PROGRAMA ===

NOTAS DE SEGURIDAD:
1. STOP usa contacto NC para seguridad fail-safe
2. Relé térmico también NC para fail-safe
3. Si se corta cable de STOP, el motor se detiene
```

### 2.3 Ejemplo: Secuencia de Llenado de Tanque

```
=== LADDER: SECUENCIA DE LLENADO ===

ENTRADAS:
- I0.0: START (inicio de ciclo)
- I0.1: STOP (parada)
- I0.2: LS_LOW (nivel bajo, tanque vacío)
- I0.3: LS_HIGH (nivel alto, tanque lleno)

SALIDAS:
- Q0.0: PUMP (bomba de llenado)
- Q0.1: VALVE_IN (válvula entrada)
- Q0.2: VALVE_OUT (válvula salida)
- Q0.3: ALARM (alarma de falla)

MEMORIAS:
- M0.0: FILLING (bandera: llenando)
- M0.1: FAULT (bandera: falla)


RUNG 1: Inicio de llenado
─────────────────────────────────────────────────────
    START   STOP   LS_HIGH   FAULT       FILLING
──┤ ├─────┤ ├─────┤/├───────┤/├────────(S)──

Nota: Inicia llenado si START, no STOP, no lleno, no falla


RUNG 2: Parar llenado cuando lleno
─────────────────────────────────────────────────────
    LS_HIGH                         FILLING
──┤ ├─────────────────────────────(R)──


RUNG 3: Control de bomba y válvula
─────────────────────────────────────────────────────
    FILLING                         PUMP
──┤ ├─────────────────────────────( )──

    FILLING                         VALVE_IN
──┤ ├─────────────────────────────( )──


RUNG 4: Temporizador de falla (si llena > 5 min)
─────────────────────────────────────────────────────
    FILLING                    ┌──────────┐
──┤ ├────────────────────────┤TON T1    ├──
                              │PT: 300s  │
                              └────┬─────┘
                                   │T1.Q     FAULT
───────────────────────────────────┤ ├─────(S)──


RUNG 5: Alarma por falla
─────────────────────────────────────────────────────
    FAULT                           ALARM
──┤ ├─────────────────────────────( )──

    FAULT                           FILLING
──┤ ├─────────────────────────────(R)──
```

---

## 3. Structured Text (IEC 61131-3)

### 3.1 Sintaxis Básica

```pascal
// Comentario de línea
(* Comentario de bloque *)

// Declaración de variables
VAR
    Temperature : REAL;
    Counter : INT;
    MotorRun : BOOL;
END_VAR

// Estructuras de control
IF condition THEN
    // código
ELSIF other_condition THEN
    // código
ELSE
    // código
END_IF;

CASE selector OF
    1: // código para caso 1
    2: // código para caso 2
ELSE
    // código por defecto
END_CASE;

FOR i := 1 TO 10 DO
    // código
END_FOR;

WHILE condition DO
    // código
END_WHILE;
```

### 3.2 Prompt para Structured Text

```
Genera código Structured Text para [funcionalidad]:

PLATAFORMA: [Siemens TIA Portal / Codesys / etc]

FUNCIÓN: [Descripción detallada]

VARIABLES DE ENTRADA:
- [Nombre]: [Tipo] - [Descripción]

VARIABLES DE SALIDA:
- [Nombre]: [Tipo] - [Descripción]

REQUISITOS:
- [Requisito 1]
- [Requisito 2]

GENERAR:
- Código ST completo
- Declaración de variables
- Comentarios explicativos
```

### 3.3 Ejemplo: Controlador PID

```pascal
// ===== CONTROLADOR PID EN STRUCTURED TEXT =====
// Plataforma: Siemens TIA Portal / IEC 61131-3

TYPE PID_Params :
STRUCT
    Kp : REAL := 2.0;      // Ganancia proporcional
    Ki : REAL := 0.5;      // Ganancia integral
    Kd : REAL := 0.1;      // Ganancia derivativa
    Ts : REAL := 0.1;      // Tiempo de muestreo (s)
    OutMin : REAL := 0.0;  // Salida mínima
    OutMax : REAL := 100.0; // Salida máxima
END_STRUCT
END_TYPE

FUNCTION_BLOCK FB_PID
VAR_INPUT
    Enable : BOOL;          // Habilitar control
    Setpoint : REAL;        // Valor deseado
    ProcessValue : REAL;    // Valor medido
    Params : PID_Params;    // Parámetros PID
END_VAR

VAR_OUTPUT
    Output : REAL;          // Salida de control
    Error : REAL;           // Error actual
END_VAR

VAR
    Integral : REAL := 0.0; // Acumulador integral
    PrevError : REAL := 0.0; // Error anterior
    Derivative : REAL;       // Término derivativo
END_VAR

// ===== CUERPO DEL BLOQUE =====
IF Enable THEN
    // Calcular error
    Error := Setpoint - ProcessValue;

    // Término integral con anti-windup
    Integral := Integral + Error * Params.Ts;

    // Limitar integral para evitar windup
    IF Integral > Params.OutMax / Params.Ki THEN
        Integral := Params.OutMax / Params.Ki;
    ELSIF Integral < Params.OutMin / Params.Ki THEN
        Integral := Params.OutMin / Params.Ki;
    END_IF;

    // Término derivativo
    Derivative := (Error - PrevError) / Params.Ts;

    // Calcular salida PID
    Output := Params.Kp * Error
            + Params.Ki * Integral
            + Params.Kd * Derivative;

    // Limitar salida
    IF Output > Params.OutMax THEN
        Output := Params.OutMax;
    ELSIF Output < Params.OutMin THEN
        Output := Params.OutMin;
    END_IF;

    // Guardar error para próximo ciclo
    PrevError := Error;

ELSE
    // Control deshabilitado
    Output := 0.0;
    Integral := 0.0;
    PrevError := 0.0;
END_IF;
```

### 3.4 Ejemplo: Secuenciador de Estados

```pascal
// ===== SECUENCIADOR DE ESTADOS =====
// Máquina de estados para proceso de llenado

TYPE ProcessState : (
    IDLE,           // Esperando inicio
    FILL_START,     // Iniciando llenado
    FILLING,        // Llenando
    FILL_COMPLETE,  // Llenado completo
    DRAINING,       // Vaciando
    ERROR           // Error
);
END_TYPE

FUNCTION_BLOCK FB_Sequencer
VAR_INPUT
    Start : BOOL;
    Stop : BOOL;
    LevelLow : BOOL;
    LevelHigh : BOOL;
    Reset : BOOL;
END_VAR

VAR_OUTPUT
    Pump : BOOL;
    ValveIn : BOOL;
    ValveOut : BOOL;
    StateNum : INT;
    Alarm : BOOL;
END_VAR

VAR
    State : ProcessState := IDLE;
    Timer : TON;
    TimeoutValue : TIME := T#5M;  // 5 minutos timeout
END_VAR

// ===== MÁQUINA DE ESTADOS =====
CASE State OF

    IDLE:
        // Esperando comando de inicio
        Pump := FALSE;
        ValveIn := FALSE;
        ValveOut := FALSE;
        Alarm := FALSE;

        IF Start AND NOT Stop THEN
            State := FILL_START;
        END_IF;

    FILL_START:
        // Abrir válvula de entrada
        ValveIn := TRUE;
        ValveOut := FALSE;

        // Esperar confirmación y arrancar bomba
        IF NOT LevelHigh THEN
            State := FILLING;
        ELSE
            State := FILL_COMPLETE;
        END_IF;

    FILLING:
        // Llenando tanque
        Pump := TRUE;
        ValveIn := TRUE;

        // Timer de timeout
        Timer(IN := TRUE, PT := TimeoutValue);

        IF LevelHigh THEN
            State := FILL_COMPLETE;
            Timer(IN := FALSE);
        ELSIF Timer.Q THEN
            State := ERROR;
        ELSIF Stop THEN
            State := IDLE;
            Timer(IN := FALSE);
        END_IF;

    FILL_COMPLETE:
        // Llenado terminado
        Pump := FALSE;
        ValveIn := FALSE;

        // Aquí podría iniciar siguiente fase
        State := IDLE;

    ERROR:
        // Condición de error
        Pump := FALSE;
        ValveIn := FALSE;
        Alarm := TRUE;

        IF Reset THEN
            State := IDLE;
            Timer(IN := FALSE);
        END_IF;

END_CASE;

// Salida numérica del estado para HMI
StateNum := ProcessState_TO_INT(State);
```

---

## 4. Diagnóstico con IA

### 4.1 Prompt para Diagnóstico

```
Ayúdame a diagnosticar este problema de PLC:

SÍNTOMAS:
[Describir comportamiento observado]

PROGRAMA:
[Pegar código o descripción de lógica]

HARDWARE:
- PLC: [Modelo]
- Módulos: [Lista]
- Sensores: [Lista]

LO QUE YA VERIFIQUÉ:
[Lista de verificaciones realizadas]

AYÚDAME A:
1. Identificar posibles causas
2. Sugerir pasos de diagnóstico
3. Proponer soluciones
```

### 4.2 Causas Comunes de Fallas

| Síntoma | Posibles Causas | Verificación |
|---------|-----------------|--------------|
| Entrada no cambia | Cable roto, sensor malo, dirección incorrecta | Forzar entrada, medir voltaje |
| Salida no activa | Fusible, dirección incorrecta, lógica mal | Forzar salida, verificar lógica |
| Programa no corre | CPU en STOP, error de programa, watchdog | Ver LEDs, revisar diagnóstico |
| Timer no termina | PT muy largo, no se está ejecutando | Monitorear online |
| Secuencia atascada | Condición nunca se cumple, sensor | Verificar condiciones de transición |

---

## 5. Documentación

### 5.1 Tabla de I/O

```
=== TABLA DE ENTRADAS/SALIDAS ===
Proyecto: Sistema de Bombeo
Revisión: 1.0
Fecha: 2024-01-15

ENTRADAS DIGITALES:
┌─────────┬───────────────┬────────────┬──────────────────────┐
│ Tag     │ Dirección     │ Tipo       │ Descripción          │
├─────────┼───────────────┼────────────┼──────────────────────┤
│ START   │ %I0.0         │ NA         │ Pulsador inicio      │
│ STOP    │ %I0.1         │ NC         │ Pulsador parada      │
│ E_STOP  │ %I0.2         │ NC         │ Parada emergencia    │
│ LS_LOW  │ %I0.3         │ NA         │ Switch nivel bajo    │
│ LS_HIGH │ %I0.4         │ NA         │ Switch nivel alto    │
│ OVLD_P1 │ %I0.5         │ NC         │ Térmico bomba 1      │
└─────────┴───────────────┴────────────┴──────────────────────┘

SALIDAS DIGITALES:
┌─────────┬───────────────┬────────────┬──────────────────────┐
│ Tag     │ Dirección     │ Tipo       │ Descripción          │
├─────────┼───────────────┼────────────┼──────────────────────┤
│ PUMP_1  │ %Q0.0         │ Relé       │ Contactor bomba 1    │
│ VALVE_1 │ %Q0.1         │ Relé       │ Válvula entrada      │
│ ALARM   │ %Q0.2         │ Relé       │ Sirena de alarma     │
│ LIGHT_R │ %Q0.3         │ Relé       │ Luz roja (falla)     │
│ LIGHT_G │ %Q0.4         │ Relé       │ Luz verde (run)      │
└─────────┴───────────────┴────────────┴──────────────────────┘
```

### 5.2 Prompt para Documentación

```
Genera documentación completa para programa de PLC:

INCLUIR:
1. Descripción del sistema
2. Tabla de I/O
3. Diagrama de estados
4. Descripción de cada rung/bloque
5. Procedimiento de puesta en marcha
6. Lista de alarmas y acciones
```

---

## Resumen

En este módulo aprendimos:

1. **Lógica Ladder** con notación ASCII
2. **Structured Text** para control avanzado
3. **Diagnóstico** de problemas con IA
4. **Documentación** profesional de PLCs

### Próximo Módulo

En el Módulo 06 aplicaremos IA para diseño de SCADA y HMI.

---

*Módulo 05 - Programación de PLCs*
*Duración: 2 horas*
