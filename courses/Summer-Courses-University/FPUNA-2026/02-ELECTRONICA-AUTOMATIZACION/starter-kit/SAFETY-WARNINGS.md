# ⚠️ ADVERTENCIAS DE SEGURIDAD - Electrónica ⚠️

## LEER ANTES DE USAR IA PARA GENERAR CIRCUITOS

---

## 🔴 PELIGROS CRÍTICOS

### 1. Descarga Eléctrica

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   VOLTAJES PELIGROSOS:                                       │
│                                                              │
│   • >50V DC puede ser mortal                                │
│   • Corriente alterna (AC) es más peligrosa que DC          │
│   • 100mA a través del corazón puede matar                  │
│   • La piel mojada reduce la resistencia 100x               │
│                                                              │
│   NUNCA trabajes con voltaje de línea (220V en Paraguay)    │
│   sin experiencia y supervisión profesional.                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. Incendio

```
Causas comunes:
• Cortocircuito (conexión directa + a -)
• Sobrecarga de componentes
• Capacitores polarizados al revés
• Cables subdimensionados
• Baterías LiPo dañadas o mal cargadas

SIEMPRE:
• Ten un extintor cerca
• No dejes circuitos encendidos sin supervisión
• Usa fusibles apropiados
```

### 3. Explosión

```
Componentes que pueden explotar:

• Capacitores electrolíticos
  - Conectados al revés → explosión
  - Voltaje excedido → explosión
  - Tipo incorrecto → explosión

• Baterías LiPo
  - Sobrecarga → fuego/explosión
  - Daño físico → fuego
  - Cortocircuito → fuego inmediato

• Reguladores sin disipador
  - Sobrecalentamiento → falla violenta
```

---

## 🟠 POR QUÉ LA IA ES PELIGROSA EN ELECTRÓNICA

### La IA NO Puede:

| Limitación | Consecuencia |
|------------|--------------|
| Ver tu circuito real | No sabe si conectaste mal |
| Medir voltajes/corrientes | No sabe si hay sobrecarga |
| Conocer tus componentes exactos | Puede asumir specs incorrectos |
| Verificar polaridad | Puede ignorar que algo va al revés |
| Saber el estado de tus componentes | Puede ignorar daños previos |

### Errores Comunes de IA en Circuitos

```
❌ Error 1: Olvidar resistencia de LED
IA: "Conecta el LED directamente al GPIO"
Realidad: El LED puede quemar el GPIO o el LED

❌ Error 2: Voltajes incompatibles
IA: "Conecta el sensor al Arduino"
Realidad: Sensor de 5V en ESP32 de 3.3V = daño

❌ Error 3: Corriente excesiva
IA: "Alimenta el motor desde el GPIO"
Realidad: Motor consume 500mA, GPIO da 40mA máximo

❌ Error 4: Sin protección
IA: "Conecta el relé al Arduino"
Realidad: Sin diodo flyback = picos que dañan el micro
```

---

## 🟡 LISTA DE VERIFICACIÓN DE SEGURIDAD

### Antes de Construir

- [ ] ¿Revisé el circuito con alguien experimentado?
- [ ] ¿Verifiqué las especificaciones de CADA componente?
- [ ] ¿Calculé los voltajes y corrientes en cada punto?
- [ ] ¿Hay protección contra sobrecorriente (fusible)?
- [ ] ¿Los capacitores están orientados correctamente?
- [ ] ¿Hay resistencias limitadoras donde se necesitan?

### Antes de Energizar

- [ ] ¿Revisé TODAS las conexiones dos veces?
- [ ] ¿No hay cortocircuitos visibles?
- [ ] ¿La fuente de alimentación es la correcta?
- [ ] ¿Tengo forma de desconectar rápidamente?
- [ ] ¿Hay cables sueltos que puedan hacer contacto?
- [ ] ¿El área está libre de materiales inflamables?

### Después de Energizar

- [ ] ¿Huele a quemado? → DESCONECTAR INMEDIATAMENTE
- [ ] ¿Algún componente está caliente? → Verificar
- [ ] ¿Los voltajes medidos son los esperados?
- [ ] ¿Las corrientes están dentro de límites?

---

## 🟢 BUENAS PRÁCTICAS

### 1. Simular Antes de Construir

```
SIEMPRE simula en:
• Tinkercad Circuits (gratis, online)
• Wokwi (ESP32, Arduino)
• LTspice (circuitos analógicos)
• Proteus (si tienes licencia)

SI FALLA EN SIMULACIÓN, NO LO CONSTRUYAS.
```

### 2. Construcción Incremental

```
Paso 1: Alimentación
         → Verificar voltajes correctos

Paso 2: Microcontrolador solo
         → Verificar que programa básico funciona

Paso 3: UN periférico a la vez
         → Agregar sensor/actuador
         → Probar antes de agregar otro

Paso 4: Sistema completo
         → Solo después de que cada parte funcione
```

### 3. Protecciones Recomendadas

```
SIEMPRE usar:

• Resistencias en LEDs (220Ω - 1kΩ)
• Diodos flyback en relés/motores
• Capacitor de desacople en micros (100nF cerca de VCC)
• Fusibles en alimentación
• Divisores de voltaje para bajar señales
• Optoacopladores para aislar circuitos

NUNCA:

• Conectar directo sin resistencia a LED
• Manejar motores/relés sin protección
• Mezclar 5V y 3.3V sin nivel shifter
• Usar fuentes sin regulación para micros
• Trabajar en circuitos energizados
```

### 4. Manejo de Baterías LiPo

```
⚠️ EXTREMO CUIDADO con LiPo:

• Usar SOLO cargadores diseñados para LiPo
• NUNCA descargar debajo de 3.0V por celda
• NUNCA cargar arriba de 4.2V por celda
• NUNCA dejar cargando sin supervisión
• Almacenar en bolsa ignífuga
• Si se hincha → DESECHAR INMEDIATAMENTE
• Si se perfora → PELIGRO DE FUEGO
```

---

## 🔵 QUÉ HACER EN EMERGENCIAS

### Si Hay Humo/Fuego

```
1. DESCONECTAR alimentación (si es seguro)
2. NO soplar → aviva el fuego
3. Usar extintor clase C (eléctrico)
4. Si baterías: arena o extintor, alejarse
5. Ventilar el área
6. Si es grande: evacuar y llamar bomberos
```

### Si Hay Descarga Eléctrica

```
1. CORTAR alimentación antes de tocar a la persona
2. Si no puedes cortar, usar material aislante para separar
3. Verificar si respira y tiene pulso
4. Llamar emergencias
5. RCP si es necesario y sabes hacerlo
```

### Si Se Daña un Componente

```
1. Desconectar INMEDIATAMENTE
2. Dejar enfriar (¡no tocar!)
3. Identificar la causa del daño
4. NO reutilizar componentes dañados
5. Revisar TODO el circuito antes de re-energizar
```

---

## 🔒 REGLA DE ORO

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   "Si no estás SEGURO de que es seguro,                     │
│    ASUME que es peligroso."                                 │
│                                                              │
│   La IA puede generar circuitos. NO puede garantizar        │
│   que sean seguros. ESA responsabilidad es TUYA.            │
│                                                              │
│   Cuando dudes: pregunta a alguien con experiencia,         │
│   simula primero, mide antes de asumir.                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Recursos de Seguridad

- **ElectroBOOM** (YouTube): Aprende de errores (controlados)
- **EEVblog** (YouTube): Prácticas profesionales
- **OSHA Electrical Safety**: Normas industriales
- **IEC 60950**: Estándar de seguridad de equipos

---

*SAFETY-WARNINGS.md - Track 02 Electrónica - FPUNA 2026*
