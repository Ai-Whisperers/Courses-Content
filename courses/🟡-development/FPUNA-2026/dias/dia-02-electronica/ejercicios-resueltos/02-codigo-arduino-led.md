# Ejercicio Resuelto: Codigo Arduino para LED

## Objetivo
Generar codigo Arduino funcional usando prompts efectivos.

---

## Prompt del Estudiante (MALO)

```
codigo arduino led
```

### Resultado (Generico)
```cpp
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}
```

**Problema**: Funciona pero no es lo que quizas necesitabas.

---

## Prompt del Estudiante (BUENO)

```
Necesito codigo Arduino para:
- Hacer parpadear un LED conectado al pin 13
- El LED debe encender 1 segundo y apagar 0.5 segundos
- Incluir comentarios en espanol
- El codigo debe ser para Arduino Uno

Usa solo funciones basicas (pinMode, digitalWrite, delay).
```

### Resultado (Especifico)

```cpp
/*
 * Parpadeo de LED con tiempos personalizados
 * Arduino Uno - FPUNA 2026
 *
 * Conexiones:
 * - LED positivo (pata larga) -> Pin 13
 * - LED negativo (pata corta) -> GND (a traves de resistencia 220 ohm)
 */

// Definir el pin del LED
const int PIN_LED = 13;

// Definir tiempos en milisegundos
const int TIEMPO_ENCENDIDO = 1000;  // 1 segundo
const int TIEMPO_APAGADO = 500;     // 0.5 segundos

void setup() {
  // Configurar el pin del LED como salida
  pinMode(PIN_LED, OUTPUT);

  // Iniciar comunicacion serial para debug (opcional)
  Serial.begin(9600);
  Serial.println("Sistema iniciado - LED parpadeando");
}

void loop() {
  // Encender el LED
  digitalWrite(PIN_LED, HIGH);
  Serial.println("LED: ENCENDIDO");
  delay(TIEMPO_ENCENDIDO);

  // Apagar el LED
  digitalWrite(PIN_LED, LOW);
  Serial.println("LED: APAGADO");
  delay(TIEMPO_APAGADO);
}
```

---

## Diferencias Clave

| Aspecto | Prompt Malo | Prompt Bueno |
|---------|-------------|--------------|
| Tiempos | Genericos (1s/1s) | Especificos (1s/0.5s) |
| Comentarios | Sin comentarios | En espanol |
| Constantes | Numeros magicos | Nombres descriptivos |
| Debug | Sin serial | Con serial monitor |
| Documentacion | Sin header | Con conexiones |

---

## Ejercicio de Seguimiento

Modificar el codigo para:
- Usar 2 LEDs (pin 12 y 13)
- Alternar entre ellos
- Agregar boton para pausar

```
Modifica el codigo anterior para:
- Agregar segundo LED en pin 12
- Los LEDs deben alternar (cuando uno esta encendido, el otro apagado)
- Agregar boton en pin 2 que pause/reanude el parpadeo
- Mantener los comentarios en espanol
```

---

## Resultado del Seguimiento

```cpp
/*
 * LEDs alternantes con boton de pausa
 * Arduino Uno - FPUNA 2026
 */

const int PIN_LED_1 = 13;
const int PIN_LED_2 = 12;
const int PIN_BOTON = 2;

const int TIEMPO_CICLO = 500;

bool pausado = false;
bool estadoAnteriorBoton = HIGH;

void setup() {
  pinMode(PIN_LED_1, OUTPUT);
  pinMode(PIN_LED_2, OUTPUT);
  pinMode(PIN_BOTON, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  // Leer boton (activo en LOW por pullup)
  bool estadoBoton = digitalRead(PIN_BOTON);

  // Detectar presion (flanco de bajada)
  if (estadoBoton == LOW && estadoAnteriorBoton == HIGH) {
    pausado = !pausado;
    Serial.println(pausado ? "PAUSADO" : "REANUDADO");
    delay(50);  // Debounce simple
  }
  estadoAnteriorBoton = estadoBoton;

  // Solo parpadear si no esta pausado
  if (!pausado) {
    // LED 1 encendido, LED 2 apagado
    digitalWrite(PIN_LED_1, HIGH);
    digitalWrite(PIN_LED_2, LOW);
    delay(TIEMPO_CICLO);

    // LED 1 apagado, LED 2 encendido
    digitalWrite(PIN_LED_1, LOW);
    digitalWrite(PIN_LED_2, HIGH);
    delay(TIEMPO_CICLO);
  }
}
```

---

*Ejercicio 2 - Dia 2*
