# Ejercicio Práctico - Módulo 05
## Programación de Secuencia Industrial con IA

---

## Objetivo

Desarrollar un programa PLC completo para una secuencia industrial utilizando asistencia de IA para generación de código Ladder, documentación y troubleshooting.

**Duración:** 20 minutos
**Tipo:** Práctico guiado
**Herramientas:** Claude/ChatGPT, TIA Portal (o simulador)

---

## Descripción del Proyecto

### Sistema a Controlar: Estación de Llenado de Tanque

```
                    ┌──────────────────────┐
                    │   TANQUE             │
                    │                      │
    VÁLVULA ═══════►│  ┌────┐  NIVEL ALTO  │◄─── LSH (I0.2)
    ENTRADA         │  │    │              │
    (Q0.0)          │  │    │              │
                    │  │    │              │
                    │  │    │  NIVEL BAJO  │◄─── LSL (I0.3)
                    │  └────┘              │
                    │         ▼            │
                    │    BOMBA SALIDA      │═══► Q0.1
                    └──────────────────────┘
```

### Especificaciones

| Parámetro | Valor |
|-----------|-------|
| Modo | Automático/Manual |
| Ciclo | Llenar hasta alto, vaciar hasta bajo |
| Protecciones | Emergencia, overflow |
| Indicadores | LEDs de estado |

---

## Parte 1: Generación de Código (8 minutos)

### Paso 1.1: Definir I/O con IA

Envía este prompt a la IA:

```
Diseña la tabla de I/O para un sistema de llenado de tanque con PLC Siemens S7-1200:

ENTRADAS:
- Botón START
- Botón STOP
- Selector Auto/Manual
- Sensor nivel alto (LSH)
- Sensor nivel bajo (LSL)
- Emergencia

SALIDAS:
- Válvula de entrada
- Bomba de salida
- Lámpara verde (llenando)
- Lámpara roja (falla/paro)
- Lámpara amarilla (vaciando)

Formato: Tabla con Nombre, Dirección, Tipo, Descripción
```

### Paso 1.2: Registrar Tabla I/O

Completa con los valores generados:

| Nombre | Dirección | Tipo | Descripción |
|--------|-----------|------|-------------|
| | %I0.0 | Bool | |
| | %I0.1 | Bool | |
| | %I0.2 | Bool | |
| | %I0.3 | Bool | |
| | %I0.4 | Bool | |
| | %I0.5 | Bool | |
| | %Q0.0 | Bool | |
| | %Q0.1 | Bool | |
| | %Q0.2 | Bool | |
| | %Q0.3 | Bool | |
| | %Q0.4 | Bool | |

### Paso 1.3: Generar Código Ladder

Envía este prompt:

```
Genera código Ladder completo para el sistema de llenado de tanque:

TABLA I/O:
[Pegar tabla del paso anterior]

LÓGICA REQUERIDA:
1. MODO AUTOMÁTICO:
   - START inicia ciclo
   - Abrir válvula entrada hasta nivel alto
   - Cuando nivel alto, cerrar válvula y encender bomba
   - Bomba vacía hasta nivel bajo
   - Ciclo continuo hasta STOP

2. MODO MANUAL:
   - START activa válvula
   - STOP cierra válvula y activa bomba

3. SEGURIDAD:
   - Emergencia detiene todo inmediatamente
   - Lámpara roja en paro/falla
   - Nunca válvula y bomba simultáneas

4. INDICADORES:
   - Verde: llenando
   - Amarilla: vaciando
   - Roja: paro o falla

FORMATO:
- Ladder ASCII con comentarios
- Incluir memoria de estado (M0.0: Llenando, M0.1: Vaciando)
- Descripción de cada network
```

---

## Parte 2: Análisis del Código (5 minutos)

### Paso 2.1: Evaluar Código Generado

Revisa el código y completa:

| Aspecto | ¿Presente? | ¿Correcto? | Observaciones |
|---------|------------|------------|---------------|
| Enclavamiento START/STOP | | | |
| Selector Auto/Manual | | | |
| Lógica de llenado | | | |
| Lógica de vaciado | | | |
| Interlock válvula/bomba | | | |
| Emergencia prioridad | | | |
| Indicadores correctos | | | |
| Comentarios claros | | | |

### Paso 2.2: Solicitar Correcciones

Si encontraste errores, solicita:

```
Corrige el código Ladder anterior:

PROBLEMA DETECTADO:
[Describir el problema]

CORRECCIÓN REQUERIDA:
[Qué debería hacer]

Genera solo la network corregida con explicación del cambio.
```

### Paso 2.3: Agregar Temporizador de Seguridad

Solicita a la IA:

```
Agrega al programa anterior:
- Timer de seguridad: si nivel alto no se alcanza en 60 segundos, detener y señalizar falla
- Timer para bomba: mínimo 5 segundos de funcionamiento antes de poder parar

Usar TON (Timer On-Delay) de Siemens.
Formato: Networks adicionales con comentarios.
```

---

## Parte 3: Documentación y Pruebas (7 minutos)

### Paso 3.1: Generar Diagrama de Estados

Solicita a la IA:

```
Genera un diagrama de estados para el sistema de llenado:

ESTADOS:
- PARO
- LLENANDO
- VACIANDO
- FALLA

TRANSICIONES:
[Describir condiciones de cada transición]

FORMATO: Diagrama ASCII o descripción de máquina de estados
```

### Paso 3.2: Crear Procedimiento de Pruebas

Solicita:

```
Genera procedimiento de pruebas FAT (Factory Acceptance Test) para el programa:

INCLUIR:
1. Pruebas en frío (sin energizar salidas)
2. Pruebas de lógica básica
3. Pruebas de seguridad
4. Pruebas de secuencia completa
5. Criterios de aceptación

FORMATO: Tabla con Paso, Acción, Resultado Esperado, OK/NOK
```

### Paso 3.3: Documentar para TIA Portal

Solicita:

```
Genera la documentación para importar en TIA Portal:

1. Descripción del proyecto
2. Configuración de hardware (CPU, módulos I/O)
3. Tabla de símbolos completa
4. Descripción de cada bloque (OB, FC, DB)
5. Notas de mantenimiento

FORMATO: Listo para copiar en campos de TIA Portal
```

---

## Entregables

### Archivos a Entregar

1. **Tabla I/O** completa con direcciones
2. **Código Ladder** generado (texto o capturas)
3. **Tabla de evaluación** del código
4. **Diagrama de estados** del sistema
5. **Procedimiento FAT** con checklist

### Estructura de Entrega

```
M05_Ejercicio_[TuApellido]/
├── tabla_io.md
├── codigo_ladder.txt
├── evaluacion.md
├── diagrama_estados.png
├── procedimiento_fat.md
└── documentacion_tia.md
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Tabla I/O correcta | 15 | Direcciones y descripciones |
| Lógica de control | 25 | Secuencia funcional |
| Seguridades | 20 | Interlock, emergencia |
| Indicadores | 10 | LEDs correctos |
| Documentación | 15 | Diagrama y procedimiento |
| Análisis crítico | 15 | Evaluación del código IA |
| **Total** | **100** | |

---

## Extensión: Simulación

Si tienes acceso a PLCSIM o simulador:

1. Cargar programa en simulador
2. Probar secuencia completa
3. Verificar comportamiento en emergencia
4. Documentar con capturas de pantalla

```
Prompt para troubleshooting:
"El programa está cargado pero la bomba no arranca cuando el nivel llega a alto.
Valores observados:
- LSH (I0.3): 1
- LSL (I0.2): 0
- M0.0 (Llenando): 1
- M0.1 (Vaciando): 0
- Q0.1 (Bomba): 0

¿Cuál puede ser la causa?"
```

---

*Módulo 05 - IA para Programación de PLCs*
*Tiempo estimado: 20 minutos*
