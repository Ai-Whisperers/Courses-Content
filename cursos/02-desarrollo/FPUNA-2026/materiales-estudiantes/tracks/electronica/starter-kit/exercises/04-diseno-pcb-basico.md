# Ejercicio 4: Diseño de PCB Básico con IA

## Objetivo
Aprender a usar IA para asistir en el diseño de PCBs, desde esquemático hasta archivos de fabricación.

## Duración
60-75 minutos

## Prerrequisitos
- KiCAD 7.0+ instalado
- Conocimiento básico de esquemáticos (Módulo 01)
- Acceso a Claude/OpenCode

## Por Qué Este Ejercicio

Diseñar una PCB requiere conocer reglas de fabricación, mejores prácticas de layout, y cálculos técnicos. La IA te ayuda a acelerar el proceso, pero SIEMPRE debes verificar que las recomendaciones cumplan con las especificaciones del fabricante.

---

## Parte 1: El Proyecto Base (10 minutos)

### Escenario

Tienes un esquemático simple que necesitas convertir a PCB:

**Circuito**: Regulador de voltaje 5V con indicador LED

**Componentes**:
- U1: LM7805 (regulador 5V)
- C1: Capacitor electrolítico 100µF (entrada)
- C2: Capacitor cerámico 100nF (entrada)
- C3: Capacitor cerámico 100nF (salida)
- C4: Capacitor electrolítico 10µF (salida)
- D1: LED verde 3mm
- R1: Resistencia 330Ω (para LED)
- J1: Conector de entrada 2 pines
- J2: Conector de salida 2 pines

### Esquemático de referencia

```
        J1                                           J2
    VIN (+) ──┬──[C1 100µF]──┬──┐                ┌──(+) VOUT
              │              │  │                │
              └──[C2 100nF]──┘  │    ┌──[R1]──[D1]──┐
                                │    │              │
                            ┌───┴────┴───┐          │
                            │   LM7805   │          │
                            │ IN  GND OUT├──────────┼──┬──[C3 100nF]──┬──
                            └─────┬──────┘          │  │              │
                                  │                 │  └──[C4 10µF]───┘
    GND (-) ──────────────────────┴─────────────────┴────────────────────(-) GND
```

---

## Parte 2: Configurar Design Rules con IA (15 minutos)

### Prompt para obtener reglas de fabricación

```
Voy a diseñar una PCB para fabricar en JLCPCB.

Necesito configurar las Design Rules en KiCAD para:
- PCB de 2 capas
- Espesor 1.6mm
- Acabado HASL con plomo (más económico)
- Componentes through-hole (THT)

Por favor dame:

1. **Valores mínimos de JLCPCB** (en mm):
   - Ancho mínimo de pista (trace width)
   - Espaciado mínimo (clearance)
   - Diámetro mínimo de via
   - Anillo de via mínimo (annular ring)
   - Tamaño mínimo de agujero (drill)

2. **Valores recomendados para principiantes** (más seguros):
   - Mismo formato que arriba pero con margen de seguridad

3. **Cómo configurar en KiCAD 7**:
   - Menú y pasos específicos
   - Qué valores poner en cada campo

4. **Errores comunes a evitar**:
   - Lista de 3-4 errores típicos de principiantes

Formato: Tabla comparativa + pasos de configuración
```

### Completa la tabla con la respuesta

| Parámetro | Mínimo JLCPCB | Recomendado | Lo que configuré |
|-----------|---------------|-------------|------------------|
| Trace width | | | |
| Clearance | | | |
| Via diameter | | | |
| Via drill | | | |
| Annular ring | | | |

### Verificación

Después de recibir la respuesta, verifica en la web oficial de JLCPCB:
- URL: https://jlcpcb.com/capabilities/pcb-capabilities
- ¿Los valores coinciden? [ ] Sí [ ] No [ ] Aproximado

---

## Parte 3: Placement de Componentes (15 minutos)

### Prompt para estrategia de placement

```
Tengo que ubicar componentes en una PCB para un regulador de voltaje LM7805.

**Componentes a ubicar:**
- LM7805 (TO-220, necesita disipación de calor)
- 2 capacitores electrolíticos (100µF entrada, 10µF salida)
- 2 capacitores cerámicos (100nF entrada y salida)
- 1 LED con resistencia
- 2 conectores de 2 pines (entrada y salida)

**Restricciones:**
- Tamaño máximo de PCB: 50mm x 30mm
- El LM7805 estará en el borde para posible disipador externo
- Conectores en bordes opuestos

Por favor:

1. **Diagrama ASCII del layout sugerido**:
   - Vista superior de la PCB
   - Ubicación aproximada de cada componente

2. **Reglas de placement para este circuito**:
   - ¿Qué componentes deben estar cerca del LM7805?
   - ¿Por qué los capacitores cerámicos van pegados al regulador?
   - ¿Dónde ubicar el LED para mejor visibilidad?

3. **Flujo de corriente**:
   - ¿Cómo debe fluir la corriente por la PCB?
   - ¿Qué significa "star ground" y aplica aquí?

4. **Consideraciones térmicas**:
   - ¿Necesito thermal relief en el GND del LM7805?
   - ¿Cuánto cobre debo dejar para disipación?
```

### Evalúa el layout sugerido

| Aspecto | ¿La IA lo consideró? | ¿Es correcto? |
|---------|---------------------|---------------|
| Capacitores de desacoplo cerca del IC | | |
| LM7805 en borde para disipador | | |
| Flujo de entrada a salida lógico | | |
| Conectores accesibles | | |
| LED visible desde arriba | | |

---

## Parte 4: Routing con Asistencia de IA (15 minutos)

### Prompt para estrategia de routing

```
Necesito rutear una PCB de regulador de voltaje con estos componentes ya ubicados:

[Pega aquí tu layout o descríbelo]

**Requisitos eléctricos:**
- Corriente máxima: 1A
- Voltaje entrada: 12V DC
- Voltaje salida: 5V DC

**Mi configuración de KiCAD:**
- Trace width mínimo: [valor que configuraste]
- Clearance: [valor que configuraste]

Por favor:

1. **Cálculo de ancho de pista**:
   - ¿Qué ancho necesito para 1A en capa externa?
   - Muestra la fórmula o referencia a IPC-2221

2. **Estrategia de routing**:
   - ¿Qué señales rutear primero?
   - ¿Debo usar ground plane o pistas de GND?
   - ¿Cómo conectar los GND de los capacitores?

3. **Tips específicos para KiCAD**:
   - Atajos de teclado útiles para routing
   - Cómo cambiar ancho de pista mientras ruteo

4. **Checklist pre-DRC**:
   - ¿Qué verificar antes de correr Design Rule Check?
```

### Ancho de pista calculado

| Señal | Corriente | Ancho calculado | Ancho que usé |
|-------|-----------|-----------------|---------------|
| VIN (12V) | 1A | | |
| GND | 1A | | |
| VOUT (5V) | 1A | | |
| LED | 15mA | | |

---

## Parte 5: Generar Archivos de Fabricación (10 minutos)

### Prompt para Gerber files

```
Terminé mi PCB en KiCAD 7 y necesito generar archivos para JLCPCB.

Por favor dame:

1. **Lista de archivos Gerber necesarios**:
   - Nombre de cada capa y su extensión
   - ¿Cuáles son obligatorios vs opcionales?

2. **Pasos en KiCAD 7**:
   - Menú exacto para Plot
   - Configuración recomendada para JLCPCB
   - Formato de origen de coordenadas

3. **Archivo de taladros (drill file)**:
   - ¿Excellon o Gerber X2?
   - Unidades mm o pulgadas

4. **Verificación antes de enviar**:
   - ¿Cómo abrir el visor de Gerber en KiCAD?
   - ¿Qué verificar visualmente?
   - ¿Cómo usar el Gerber viewer online de JLCPCB?

5. **Cómo empaquetar**:
   - ¿ZIP directo o carpeta específica?
   - Nombre de archivo recomendado
```

### Checklist de archivos generados

| Archivo | Extensión | ¿Generado? | ¿Verificado? |
|---------|-----------|------------|--------------|
| Top Copper | .gtl | | |
| Bottom Copper | .gbl | | |
| Top Silkscreen | .gto | | |
| Bottom Silkscreen | .gbo | | |
| Top Soldermask | .gts | | |
| Bottom Soldermask | .gbs | | |
| Board Outline | .gm1 | | |
| Drill File | .drl | | |

---

## Parte 6: Revisión Final con IA (10 minutos)

### Prompt para revisión de diseño

```
Terminé el diseño de mi PCB de regulador LM7805.
Antes de enviar a fabricar, necesito una revisión.

**Especificaciones de mi diseño:**
- Tamaño: [X] x [Y] mm
- Capas: 2
- Ancho de pista mínimo usado: [X] mm
- Clearance mínimo: [X] mm
- Vías usadas: [cantidad]

**DRC de KiCAD:**
- Errores: [cantidad]
- Warnings: [cantidad]
- Descripción de warnings: [lista]

Por favor revisa:

1. **¿Los warnings son críticos?**
   - ¿Cuáles puedo ignorar?
   - ¿Cuáles debo corregir?

2. **Checklist de diseño para principiantes**:
   - [ ] ¿Hay plano de tierra continuo?
   - [ ] ¿Los capacitores de desacoplo están cerca del IC?
   - [ ] ¿El texto de silkscreen es legible (>1mm)?
   - [ ] ¿Los pads de montaje tienen thermal relief?
   - [ ] ¿Hay suficiente espacio para soldar a mano?

3. **Estimación de costo**:
   - ¿Cuánto costaría aproximadamente en JLCPCB?
   - ¿Qué opciones afectan más el precio?

4. **Errores comunes que debo buscar**:
   - Lista de 5 errores típicos de primer diseño
```

---

## Template para Diseño de PCB con IA

```
Necesito diseñar una PCB para: [DESCRIPCIÓN DEL CIRCUITO]

**Especificaciones:**
- Componentes: [lista con footprints]
- Corriente máxima: [X] A
- Voltaje máximo: [X] V
- Tamaño máximo: [X] x [Y] mm
- Número de capas: [2/4]

**Fabricante objetivo:**
- [JLCPCB / PCBWay / local]
- Acabado: [HASL / ENIG / OSP]
- Color: [verde / azul / negro]

**Mi nivel:**
- [Principiante / Intermedio / Avanzado]
- Software: [KiCAD / Eagle / EasyEDA]

Por favor ayúdame con:
1. Design rules apropiadas
2. Estrategia de placement
3. Anchos de pista recomendados
4. Tips de routing
5. Checklist pre-fabricación

IMPORTANTE: Verificaré todos los valores críticos
en la documentación oficial del fabricante.
```

---

## Entregable

### PCB lista para fabricación

1. **Proyecto KiCAD completo**:
   - Esquemático (.kicad_sch)
   - PCB layout (.kicad_pcb)
   - Screenshot del diseño terminado

2. **Archivos Gerber**:
   - ZIP con todos los archivos
   - Verificado en JLCPCB Gerber viewer

3. **Documentación**:
   - Tabla de Design Rules usadas
   - BOM (Bill of Materials)
   - Costo estimado de fabricación

4. **Reflexión**:
   - ¿Qué aprendiste sobre diseño de PCB?
   - ¿Qué harías diferente en el próximo diseño?

---

## Criterios de Éxito

- [ ] Configuraste Design Rules basadas en JLCPCB
- [ ] El placement sigue buenas prácticas (capacitores cerca del IC)
- [ ] Las pistas tienen el ancho correcto para la corriente
- [ ] DRC pasa sin errores (warnings aceptables documentados)
- [ ] Generaste archivos Gerber completos
- [ ] Verificaste el diseño en visor de Gerber
- [ ] Documentaste el proceso y decisiones

---

## Recursos Adicionales

### Verificación de capacidades del fabricante
- JLCPCB: https://jlcpcb.com/capabilities/pcb-capabilities
- PCBWay: https://www.pcbway.com/pcb_prototype/PCB_Manufacturing_Tolerances.html

### Calculadoras útiles
- Ancho de pista: https://www.4pcb.com/trace-width-calculator.html
- Thermal relief: Integrado en KiCAD (Pad Properties)

### Videos de referencia
- KiCAD 7 PCB Tutorial (oficial): YouTube
- JLCPCB order process: YouTube

---

## Importante: IA + Diseño de PCB

**La IA es muy útil para:**
- Explicar reglas de diseño y por qué existen
- Calcular anchos de pista
- Sugerir estrategias de layout
- Generar checklists de verificación

**La IA NO puede:**
- Ver tu diseño actual en KiCAD
- Garantizar que cumples con el fabricante específico
- Detectar errores visuales de layout
- Reemplazar verificación manual con Gerber viewer

**Siempre verifica:**
- Valores mínimos en web oficial del fabricante
- DRC en KiCAD antes de generar Gerbers
- Visualización en Gerber viewer antes de ordenar
- BOM contra componentes reales disponibles

---

*Ejercicio 4 - Electrónica y Automatización - FPUNA 2026*
