# Ejercicio Práctico - Módulo 05
## Programación de Secuencia Industrial

---

## Objetivo

Desarrollar un programa de PLC completo para una secuencia de llenado de tanque con modos AUTO/MANUAL, utilizando IA para generar lógica Ladder y Structured Text.

**Duración:** 25 minutos
**Tipo:** Práctico guiado
**Herramientas:** Claude/ChatGPT, simulador de PLC (opcional)

---

## Descripción del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                 SISTEMA DE LLENADO DE TANQUE                 │
│                                                              │
│                    ┌─────────────┐                          │
│         AGUA ─────►│   VÁLVULA   │                          │
│                    │    V-101    │                          │
│                    └──────┬──────┘                          │
│                           │                                  │
│                    ┌──────▼──────┐                          │
│                    │             │                          │
│                    │   TANQUE    │◄── [LSH] Nivel Alto     │
│                    │   T-101     │                          │
│                    │             │◄── [LSL] Nivel Bajo     │
│                    │             │                          │
│                    └──────┬──────┘                          │
│                           │                                  │
│                    ┌──────▼──────┐                          │
│                    │    BOMBA    │                          │
│                    │    P-101    │                          │
│                    └──────┬──────┘                          │
│                           │                                  │
│                           ▼ SALIDA                          │
│                                                              │
│   PANEL DE CONTROL:                                         │
│   ┌─────┬─────┬─────┬─────────┬───────┐                    │
│   │START│STOP │E-STOP│AUTO/MAN│RESET  │                    │
│   └─────┴─────┴─────┴─────────┴───────┘                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Parte 1: Definición de I/O (5 minutos)

### Paso 1.1: Tabla de Entradas

Completa la tabla de entradas con ayuda de la IA:

| Tag | Dirección | Tipo | Descripción |
|-----|-----------|------|-------------|
| START | %I0.0 | NA | Pulsador de inicio |
| STOP | %I0.1 | NC | Pulsador de parada |
| E_STOP | %I0.2 | NC | Parada de emergencia |
| AUTO_MAN | %I0.3 | | Selector Auto/Manual |
| LSL | %I0.4 | | Switch nivel bajo |
| LSH | %I0.5 | | Switch nivel alto |
| OVLD_P | %I0.6 | | Térmico bomba |
| RESET | %I0.7 | | Pulsador reset |

### Paso 1.2: Tabla de Salidas

| Tag | Dirección | Tipo | Descripción |
|-----|-----------|------|-------------|
| VALVE | %Q0.0 | Relé | Válvula de entrada |
| PUMP | %Q0.1 | Relé | Bomba de salida |
| LIGHT_R | %Q0.2 | Relé | Luz roja (alarma) |
| LIGHT_G | %Q0.3 | Relé | Luz verde (run) |
| LIGHT_A | %Q0.4 | Relé | Luz ámbar (manual) |
| HORN | %Q0.5 | Relé | Bocina de alarma |

### Paso 1.3: Tabla de Memorias Internas

| Tag | Dirección | Descripción |
|-----|-----------|-------------|
| M_FILLING | %M0.0 | Estado: llenando |
| M_DRAINING | %M0.1 | Estado: vaciando |
| M_FAULT | %M0.2 | Estado: falla |
| M_READY | %M0.3 | Estado: listo |

---

## Parte 2: Lógica Ladder (10 minutos)

### Paso 2.1: Solicitar Lógica Modo AUTO

Envía este prompt:

```
Genera lógica Ladder para secuencia de llenado en modo AUTO:

ENTRADAS:
- I0.0: START (NA)
- I0.1: STOP (NC)
- I0.2: E_STOP (NC)
- I0.3: AUTO_MAN (1=AUTO, 0=MANUAL)
- I0.4: LSL (1=nivel bajo alcanzado)
- I0.5: LSH (1=nivel alto alcanzado)
- I0.6: OVLD_P (NC, térmico)
- I0.7: RESET (NA)

SALIDAS:
- Q0.0: VALVE (válvula entrada)
- Q0.1: PUMP (bomba salida)
- Q0.2: LIGHT_R (alarma)
- Q0.3: LIGHT_G (operación)

MEMORIAS:
- M0.0: FILLING
- M0.1: DRAINING
- M0.2: FAULT

SECUENCIA AUTO:
1. Con START y AUTO, si nivel bajo (LSL=1), iniciar llenado
2. Llenando: VALVE=ON hasta LSH=1
3. Al llenarse, VALVE=OFF, iniciar vaciado
4. Vaciando: PUMP=ON hasta LSL=0
5. Repetir ciclo si no hay STOP

PROTECCIONES:
- E_STOP detiene todo inmediatamente
- OVLD causa falla y detiene bomba
- Timeout de 5 minutos para llenado

GENERAR: Ladder ASCII para cada función
```

### Paso 2.2: Completar Ladder

Documenta cada rung generado:

**RUNG 1: Circuito de seguridad**
```
    E_STOP    OVLD_P                    M_OK
──┤ ├───────┤ ├──────────────────────( )──

Descripción: _________________________________
```

**RUNG 2: Inicio de llenado (modo AUTO)**
```
    AUTO_MAN   START    LSL    M_FAULT   M_FILLING
──┤ ├────────┤ ├──────┤ ├─────┤/├───────(S)──
               │
    M_FILLING ─┘

Descripción: _________________________________
```

**RUNG 3: Fin de llenado**
```
    LSH                             M_FILLING
──┤ ├─────────────────────────────(R)──

    LSH     M_OK                    M_DRAINING
──┤ ├─────┤ ├─────────────────────(S)──

Descripción: _________________________________
```

**RUNG 4: Fin de vaciado**
```
    LSL                             M_DRAINING
──┤/├─────────────────────────────(R)──

Descripción: _________________________________
```

**RUNG 5: Control de válvula**
```
    M_FILLING   M_OK                VALVE
──┤ ├─────────┤ ├─────────────────( )──

Descripción: _________________________________
```

**RUNG 6: Control de bomba**
```
    M_DRAINING   M_OK               PUMP
──┤ ├──────────┤ ├────────────────( )──

Descripción: _________________________________
```

### Paso 2.3: Agregar Modo MANUAL

Solicita a la IA:

```
Agrega control MANUAL a la lógica anterior:

MODO MANUAL (AUTO_MAN = 0):
- MAN_VALVE (I1.0): Activa válvula directamente
- MAN_PUMP (I1.1): Activa bomba directamente
- Sin secuencia automática
- Protecciones siguen activas

MODIFICAR rungs existentes para incluir ambos modos.
```

---

## Parte 3: Structured Text (5 minutos)

### Paso 3.1: Solicitar Versión ST

```
Convierte la lógica Ladder anterior a Structured Text:

REQUISITOS:
- Usar CASE para máquina de estados
- Estados: IDLE, FILLING, DRAINING, FAULT
- Mantener misma funcionalidad
- Agregar comentarios explicativos

GENERAR: Código ST completo IEC 61131-3
```

### Paso 3.2: Código ST Esperado

```pascal
// Completar con la respuesta de la IA

TYPE ProcessState : (
    IDLE,
    FILLING,
    DRAINING,
    FAULT
);
END_TYPE

PROGRAM Main
VAR
    // Entradas
    START : BOOL;
    STOP : BOOL;
    // ... completar

    // Salidas
    VALVE : BOOL;
    PUMP : BOOL;
    // ... completar

    // Estado
    State : ProcessState := IDLE;
    FillTimer : TON;
END_VAR

// ===== LÓGICA PRINCIPAL =====

// Verificar seguridad
IF NOT E_STOP OR NOT OVLD_P THEN
    State := FAULT;
END_IF;

// Máquina de estados
CASE State OF
    IDLE:
        // Completar

    FILLING:
        // Completar

    DRAINING:
        // Completar

    FAULT:
        // Completar
END_CASE;

END_PROGRAM
```

---

## Parte 4: Pruebas FAT (5 minutos)

### Paso 4.1: Solicitar Procedimiento de Pruebas

```
Genera procedimiento FAT (Factory Acceptance Test) para el sistema:

INCLUIR:
1. Pruebas de entradas (verificar cada sensor)
2. Pruebas de salidas (verificar cada actuador)
3. Pruebas de secuencia AUTO
4. Pruebas de modo MANUAL
5. Pruebas de protecciones (E-STOP, térmico)
6. Pruebas de timeout

FORMATO: Checklist con pasos y criterio de aceptación
```

### Paso 4.2: Completar Checklist FAT

| # | Prueba | Procedimiento | Esperado | ✓ |
|---|--------|---------------|----------|---|
| 1 | E-STOP | Presionar E-STOP | Todo se detiene | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

---

## Entregables

### Archivos a Entregar

```
M05_Ejercicio_[TuApellido]/
├── io_table.md           # Tabla de I/O
├── ladder_program.md     # Diagrama Ladder ASCII
├── structured_text.st    # Código ST
├── fat_procedure.md      # Procedimiento de pruebas
└── prompts.txt           # Prompts utilizados
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Tabla I/O completa | 15 | Todas las señales documentadas |
| Ladder modo AUTO | 25 | Secuencia correcta |
| Ladder modo MANUAL | 15 | Control directo funcional |
| Protecciones | 15 | E-STOP, térmico, timeout |
| Código ST | 15 | Equivalente funcional |
| Procedimiento FAT | 10 | Pruebas completas |
| Documentación | 5 | Prompts y notas |
| **Total** | **100** | |

---

*Módulo 05 - Ejercicio Práctico*
*Tiempo estimado: 25 minutos*
