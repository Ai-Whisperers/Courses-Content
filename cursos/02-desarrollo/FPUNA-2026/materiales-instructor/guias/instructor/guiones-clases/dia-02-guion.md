# Guion de Clase - Dia 2: IA para Electronica

## Informacion de la Clase

| Aspecto | Detalle |
|---------|---------|
| **Duracion** | 2 horas |
| **Audiencia** | Estudiantes de Electronica, Mecatronica, afines |
| **Objetivo** | Usar IA para proyectos de electronica y firmware |

---

## PRE-CLASE (15 min antes)

### Checklist del Instructor

- [ ] Arduino IDE instalado y funcionando en tu PC
- [ ] Un Arduino fisico conectado (si es posible)
- [ ] KiCAD abierto con proyecto de ejemplo
- [ ] Claude/OpenCode funcionando
- [ ] Datasheets de ejemplo descargados (LM35, ESP32)

### Materiales Opcionales

- Arduino Uno o ESP32 fisico
- Protoboard con LED y resistencia
- Sensor de temperatura LM35

---

## MODULO 1: Bienvenida + Conexion con Dia 1 (10 min)

### 0:00 - 0:05 | Recapitulacion

**DECIR:**
> "Ayer aprendimos los fundamentos de prompts. Hoy vamos a aplicarlo especificamente a electronica. Quien recuerda las 3 partes de un buen prompt?"

**ESPERAR RESPUESTAS:**
- Contexto
- Instruccion
- Formato

### 0:05 - 0:10 | Agenda del Dia

**MOSTRAR:**
```
HOY VEREMOS:
1. IA para interpretar datasheets
2. Generacion de codigo Arduino/ESP32
3. Debugging de circuitos con IA
4. Diseno de PCB asistido
5. Proyecto practico
```

---

## MODULO 2: IA para Interpretar Datasheets (20 min)

### 0:10 - 0:15 | El Problema

**DECIR:**
> "Los datasheets tienen 50+ paginas. Encontrar lo que necesitas puede tomar horas. La IA puede resumirte exactamente lo que necesitas."

### 0:15 - 0:25 | Demo: Datasheet del LM35

**PROMPT EJEMPLO:**
```
Tengo el sensor de temperatura LM35. Necesito saber:
1. Voltaje de operacion
2. Rango de temperatura que mide
3. Como calcular temperatura desde el voltaje de salida
4. Pinout (que pin es cual)

Resumeme en formato tabla.
```

**MOSTRAR RESULTADO** y comparar con buscar en el PDF.

### 0:25 - 0:30 | Ejercicio Rapido

**DECIR:**
> "Ahora ustedes. Elijan un componente que hayan usado (servo, sensor ultrasonico, relay) y pidan a Claude que les resuma su datasheet."

**DAR 5 MINUTOS** para que practiquen.

---

## MODULO 3: Generacion de Codigo Arduino (25 min)

### 0:30 - 0:40 | Prompt Efectivo para Codigo

**DECIR:**
> "Para codigo, el prompt necesita ser MUY especifico. Miren la diferencia:"

**PROMPT MALO:**
```
codigo arduino led
```

**PROMPT BUENO:**
```
Necesito codigo Arduino para:
- Hacer parpadear un LED conectado al pin 13
- El LED debe encender 1 segundo y apagar 0.5 segundos
- Incluir comentarios en espanol
- El codigo debe ser para Arduino Uno

Usa solo funciones basicas (pinMode, digitalWrite, delay).
```

### 0:40 - 0:50 | Demo en Vivo

**HACER:**
1. Generar codigo con prompt bueno
2. Copiar a Arduino IDE
3. Verificar que compila
4. (Si hay Arduino fisico) Subir y mostrar funcionando

**PUNTO CLAVE:**
> "La IA genero codigo que funciona al primer intento. Pero SIEMPRE revisen antes de subir."

### 0:50 - 0:55 | Ejercicio: Tu Propio Codigo

**EJERCICIO:**
```
Genera codigo para TU proyecto. Ideas:
- Leer sensor de temperatura y mostrar en Serial
- Controlar servo con potenciometro
- Detector de obstaculos con ultrasonico
- Sistema de alarma con buzzer
```

---

## BREAK (10 min)

**DECIR:**
> "10 minutos de break. Si tienen Arduino fisico, pueden probar su codigo."

---

## MODULO 4: Debugging con IA (20 min)

### 1:05 - 1:15 | Cuando el Codigo No Funciona

**DECIR:**
> "La IA es excelente para debugging. Pueden pegar codigo con error y pedir ayuda."

**DEMO - CODIGO CON ERROR:**
```cpp
void setup() {
  pinMode(13, OUPUT);  // Error intencional
  Serial.begin(9600)   // Falta punto y coma
}

void loop() {
  digitalwrite(13, HIGH);  // Error de mayusculas
  delay(1000);
}
```

**PROMPT:**
```
Este codigo Arduino no compila. Encuentra los errores y explicame cada uno:

[PEGAR CODIGO]
```

### 1:15 - 1:25 | Debugging de Circuitos

**DECIR:**
> "Tambien pueden describir problemas de hardware."

**EJEMPLO:**
```
Mi circuito Arduino tiene este problema:
- LED conectado al pin 9 con resistencia de 220 ohms
- El codigo hace digitalWrite(9, HIGH) pero el LED no enciende
- Ya verifique que el LED funciona en otro circuito
- El pin 9 mide 0V con multimetro

Que puede estar mal? Dame pasos para diagnosticar.
```

---

## MODULO 5: Diseno PCB Asistido (15 min)

### 1:25 - 1:35 | Conceptos de PCB con IA

**DECIR:**
> "Para PCB, la IA puede ayudar con:
> - Elegir componentes
> - Calcular valores (resistencias, capacitores)
> - Revisar conexiones
> - Sugerir mejoras"

**DEMO:**
```
Estoy disenando una PCB para un sistema de monitoreo con ESP32.
Necesito:
- Regulador de 5V a 3.3V para el ESP32
- Conector para sensor DHT22
- LEDs indicadores (power, wifi, error)
- Conector USB para programacion

Dame el esquematico basico y lista de componentes con valores.
```

### 1:35 - 1:40 | KiCAD + IA

**DECIR:**
> "KiCAD no tiene IA integrada, pero pueden:
> 1. Pedir a Claude el esquematico en texto
> 2. Copiar conexiones a KiCAD
> 3. Pedir revision del diseno"

---

## MODULO 6: Proyecto Practico (15 min)

### 1:40 - 1:55 | Mini-Proyecto Guiado

**PROYECTO: Sistema de Alerta de Temperatura**

**PASO 1 - Prompt para Codigo:**
```
Necesito codigo Arduino para un sistema de alerta de temperatura:
- Sensor LM35 en pin A0
- LED verde en pin 12 (temperatura normal)
- LED rojo en pin 13 (temperatura alta)
- Buzzer en pin 11
- Umbral: si temperatura > 30C, activar alerta

Incluir:
- Lectura cada 2 segundos
- Mostrar temperatura en Serial Monitor
- Comentarios en espanol
```

**PASO 2 - Prompt para Componentes:**
```
Para el circuito anterior, dame:
1. Lista de componentes necesarios
2. Diagrama de conexiones en texto
3. Valores de resistencias para los LEDs
```

**DEJAR QUE TRABAJEN** 10 minutos en su version.

---

## MODULO 7: Cierre + Recursos (5 min)

### 1:55 - 2:00 | Resumen y Recursos

**DECIR:**
> "Hoy aprendieron a usar IA para:
> - Interpretar datasheets rapidamente
> - Generar codigo Arduino funcional
> - Debuggear codigo y circuitos
> - Asistir en diseno de PCB"

**RECURSOS:**
```
PARA SEGUIR PRACTICANDO:
- Wokwi.com (simulador Arduino online)
- docs.arduino.cc (documentacion oficial)
- Biblioteca de prompts en el repositorio del curso
```

**ADELANTO:**
> "Manana: IA para Ingenieria Aeronautica - calculo de perfiles, simulaciones aerodinamicas."

---

## NOTAS POST-CLASE

### Registrar

- [ ] Proyectos que estan haciendo los estudiantes
- [ ] Errores comunes en prompts
- [ ] Componentes/sensores mas mencionados

### Seguimiento

- Quien tiene proyectos interesantes para mostrar?
- Alguien necesita ayuda adicional?

---

*Guion Dia 2 - Electronica*
*FPUNA Verano 2026*
