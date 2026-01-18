# Checklist de Verificación - Circuitos y Código Generados por IA

## Verificación específica para proyectos de electrónica

---

## Proceso de Verificación en 6 Pasos

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   1. REVISAR ESQUEMÁTICO    ¿Tiene sentido eléctrico?       │
│          ↓                                                   │
│   2. SIMULAR                ¿Funciona en simulador?         │
│          ↓                                                   │
│   3. VERIFICAR COMPONENTES  ¿Tengo los correctos?           │
│          ↓                                                   │
│   4. CONSTRUIR EN PROTO     ¿Conexiones correctas?          │
│          ↓                                                   │
│   5. MEDIR SIN ENERGIZAR    ¿Continuidad OK?                │
│          ↓                                                   │
│   6. ENERGIZAR Y MEDIR      ¿Voltajes/corrientes OK?        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Paso 1: Verificación del Esquemático

### Checklist Eléctrico Básico

- [ ] ¿Todos los componentes tienen conexión a tierra/GND?
- [ ] ¿Las alimentaciones (VCC) están conectadas?
- [ ] ¿Los LEDs tienen resistencia limitadora?
- [ ] ¿Los motores/relés tienen diodo flyback?
- [ ] ¿Hay capacitores de desacople cerca de los ICs?
- [ ] ¿Las polaridades de capacitores electrolíticos son correctas?
- [ ] ¿Los voltajes de entrada son compatibles con cada componente?

### Verificación de Voltajes

```
Para CADA punto del circuito, verificar:

Componente: _______________
Voltaje esperado: _____ V
Fuente: _____
¿Dentro de rango?: [ ] Sí [ ] No

Ejemplos:
- Arduino: 5V o 3.3V según modelo
- ESP32: 3.3V (¡NO 5V tolerante!)
- Sensores: verificar datasheet
- LEDs: Vf típico 1.8V-3.3V según color
```

### Verificación de Corrientes

```
Cálculo de corriente por rama:

Rama 1: _______________
Voltaje aplicado: _____ V
Resistencia total: _____ Ω
Corriente calculada: I = V/R = _____ mA
¿Dentro de límite del GPIO?: [ ] Sí [ ] No

IMPORTANTE:
- Arduino GPIO max: 40mA (recomendado 20mA)
- ESP32 GPIO max: 12mA
- Total por VCC en Arduino: 200mA max
```

---

## Paso 2: Simulación

### Herramientas de Simulación

| Herramienta | Uso | URL |
|-------------|-----|-----|
| Tinkercad | Arduino básico | tinkercad.com/circuits |
| Wokwi | ESP32, Arduino avanzado | wokwi.com |
| Falstad | Circuitos analógicos | falstad.com/circuit |
| LTspice | Simulación profesional | analog.com/ltspice |

### Checklist de Simulación

- [ ] ¿El circuito simula sin errores?
- [ ] ¿Los voltajes en cada punto son los esperados?
- [ ] ¿Las corrientes son razonables?
- [ ] ¿El código compila sin errores?
- [ ] ¿El comportamiento simulado es el esperado?
- [ ] ¿Probé diferentes condiciones (edge cases)?

### Qué Buscar en Simulación

```
✓ Voltajes en nodos clave
✓ Corrientes a través de componentes
✓ Tiempos de respuesta (si hay PWM o comunicación)
✓ Estados de entradas/salidas digitales
✓ Valores de lecturas analógicas
✓ Mensajes de Serial monitor
```

---

## Paso 3: Verificación de Componentes

### Checklist de Componentes

```markdown
## Lista de Materiales Verificada

| Componente | Valor/Modelo | En Esquema | Tengo | Verificado |
|------------|--------------|------------|-------|------------|
| Resistor   | 220Ω         | R1         | [ ]   | [ ]        |
| LED        | Rojo 5mm     | D1         | [ ]   | [ ]        |
| Capacitor  | 100nF        | C1         | [ ]   | [ ]        |
| ...        | ...          | ...        | [ ]   | [ ]        |
```

### Verificación Individual de Componentes

**Resistores:**
```
1. Medir con multímetro en modo Ω
2. Comparar con código de colores
3. Tolerancia típica: ±5% (dorado) o ±10% (plata)
```

**Capacitores:**
```
1. Verificar valor (marcado o código)
2. Para electrolíticos: verificar polaridad (banda = negativo)
3. Verificar voltaje máximo ≥ voltaje del circuito
```

**Semiconductores:**
```
1. Verificar modelo exacto
2. Verificar pinout en datasheet
3. Para LEDs: probar con multímetro modo diodo
```

---

## Paso 4: Construcción en Protoboard

### Buenas Prácticas de Construcción

```
1. Alimentación primero
   - Conectar rieles de VCC y GND
   - Verificar con multímetro ANTES de agregar componentes

2. Microcontrolador
   - Colocar centrado
   - Verificar orientación

3. Componentes pasivos
   - Resistores, capacitores
   - Verificar valores

4. Componentes activos
   - Sensores, actuadores
   - Verificar polaridad y pinout

5. Cables de señal
   - Al final
   - Usar colores consistentes:
     - Rojo: VCC
     - Negro: GND
     - Otros: señales
```

### Checklist de Construcción

- [ ] ¿Los rieles de alimentación están correctamente conectados?
- [ ] ¿Usé cables del calibre correcto?
- [ ] ¿Hay conexiones sueltas o cables tocándose?
- [ ] ¿La polaridad de todos los componentes es correcta?
- [ ] ¿El cableado coincide con el esquemático?
- [ ] ¿No hay componentes tocando metal expuesto?

---

## Paso 5: Verificación Sin Energizar

### Pruebas de Continuidad

```
Con multímetro en modo continuidad:

1. VCC a GND: NO debe haber continuidad (si la hay = cortocircuito)
2. Cada riel de alimentación: debe ser continuo de punta a punta
3. Conexiones críticas: verificar punto a punto

Patrón de prueba:
Punto A → Punto B: [ ] Continuidad [ ] No continuidad (esperado: ___)
```

### Inspección Visual

- [ ] ¿Hay cables cruzados que no deberían?
- [ ] ¿Hay componentes que parecen dañados?
- [ ] ¿Los LEDs están en la orientación correcta?
- [ ] ¿Los ICs están en la orientación correcta (muesca)?
- [ ] ¿Hay "puentes" de soldadura o cables sueltos?

---

## Paso 6: Energizar y Medir

### Procedimiento Seguro de Encendido

```
1. Verificar una última vez VCC-GND (no cortocircuito)
2. Conectar fuente de alimentación APAGADA
3. Encender fuente
4. Observar 5 segundos:
   - ¿Humo? → Apagar inmediatamente
   - ¿Calor? → Apagar y revisar
   - ¿Olor? → Apagar y revisar
5. Si todo bien, medir voltajes
```

### Mediciones Críticas

```markdown
## Tabla de Mediciones

| Punto | Esperado | Medido | ¿OK? |
|-------|----------|--------|------|
| VCC   | 5.0V     | ____V  | [ ]  |
| GPIO LED | 0V/5V | ____V  | [ ]  |
| Sensor VCC | 3.3V | ____V | [ ]  |
| ...   | ...      | ...    | [ ]  |
```

### Verificación de Comportamiento

- [ ] ¿El código carga sin errores?
- [ ] ¿Los mensajes de Serial son correctos?
- [ ] ¿Los LEDs encienden/apagan como esperado?
- [ ] ¿Los sensores dan lecturas razonables?
- [ ] ¿Los actuadores responden a comandos?
- [ ] ¿El sistema es estable (no se reinicia)?

---

## Verificación de Código Embebido

### Checklist de Código Arduino/ESP32

```markdown
## Código: [nombre del archivo]

### Configuración (setup)
- [ ] Serial.begin() con baudrate correcto
- [ ] Todos los pinMode() definidos
- [ ] Configuración de periféricos (I2C, SPI, etc.)
- [ ] Variables inicializadas

### Loop principal
- [ ] ¿Hay delay excesivo que bloquea el programa?
- [ ] ¿Las lecturas de sensores tienen validación?
- [ ] ¿Los actuadores tienen límites de seguridad?
- [ ] ¿Hay manejo de errores?

### Recursos
- [ ] ¿Hay memory leaks (en proyectos grandes)?
- [ ] ¿El stack tiene espacio suficiente?
- [ ] ¿Los strings no desbordan buffers?

### Comunicación
- [ ] ¿Los protocolos están configurados correctamente?
- [ ] ¿Hay timeouts para evitar bloqueos?
- [ ] ¿Se manejan errores de comunicación?
```

### Errores Comunes de IA en Código Embebido

```cpp
// ❌ Error 1: Usar pin incorrecto
analogRead(13);  // Pin 13 no es ADC en Arduino Uno

// ❌ Error 2: Delay bloqueante
delay(10000);  // Bloquea todo por 10 segundos

// ❌ Error 3: No validar lecturas
int valor = analogRead(A0);
int grados = valor * 0.48;  // ¿Y si el sensor falla?

// ❌ Error 4: Buffer overflow
char buffer[10];
sprintf(buffer, "Temperatura: %d grados", temp);  // Puede exceder 10

// ❌ Error 5: Usar librerías que no existen
#include <MagicSensor.h>  // IA puede inventar librerías
```

---

## Template de Verificación Completa

```markdown
# Verificación de Proyecto: [Nombre]

## 1. Esquemático
- [ ] Revisado y corregido
- [ ] Voltajes verificados
- [ ] Corrientes calculadas

## 2. Simulación
- Herramienta usada: ___________
- [ ] Simulación exitosa
- [ ] Comportamiento correcto

## 3. Componentes
- [ ] Todos disponibles
- [ ] Todos verificados

## 4. Construcción
- [ ] Completada según esquema
- [ ] Cableado revisado

## 5. Pre-energizado
- [ ] Continuidad VCC-GND: NO (correcto)
- [ ] Inspección visual OK

## 6. Energizado
- [ ] Sin humo/calor/olor
- [ ] Voltajes correctos
- [ ] Funcionalidad verificada

## Resultado Final: [ ] APROBADO / [ ] REQUIERE REVISIÓN
```

---

*VERIFICATION-CHECKLIST.md - Track 02 Electrónica - FPUNA 2026*
