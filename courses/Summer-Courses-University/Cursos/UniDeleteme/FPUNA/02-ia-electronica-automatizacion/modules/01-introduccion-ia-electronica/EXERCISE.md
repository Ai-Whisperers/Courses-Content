# Ejercicio Práctico - Módulo 01
## Configuración del Entorno de Desarrollo con IA

---

## Objetivo

Configurar un entorno de desarrollo completo para programación de sistemas embebidos con asistencia de IA, y realizar las primeras interacciones efectivas con herramientas de IA para electrónica.

**Duración:** 30 minutos
**Tipo:** Práctico guiado

---

## Parte 1: Instalación del Entorno (15 minutos)

### Paso 1.1: VS Code y Extensiones Básicas

```bash
# Si no tienes VS Code instalado, descárgalo de:
# https://code.visualstudio.com/

# Instalar extensiones desde terminal
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension ms-vscode.cpptools
code --install-extension platformio.platformio-ide
```

**Verificación:** Abre VS Code y confirma que las extensiones aparecen en la barra lateral.

### Paso 1.2: Configurar PlatformIO

1. Abre VS Code
2. Haz clic en el ícono de PlatformIO (alien) en la barra lateral
3. Ve a "PIO Home" → "New Project"
4. Configura:
   - **Name:** `mi-primer-proyecto-ia`
   - **Board:** `Arduino Uno` o `Espressif ESP32 Dev Module`
   - **Framework:** `Arduino`
5. Haz clic en "Finish"

**Verificación:** El proyecto se crea con la estructura:
```
mi-primer-proyecto-ia/
├── include/
├── lib/
├── src/
│   └── main.cpp
├── test/
└── platformio.ini
```

### Paso 1.3: Activar GitHub Copilot

1. Ve a VS Code → Extensiones → GitHub Copilot
2. Haz clic en "Sign in to GitHub"
3. Autoriza la aplicación en tu navegador
4. Regresa a VS Code

**Verificación:** Verás el ícono de Copilot en la barra de estado (parte inferior).

---

## Parte 2: Primer Código con Asistencia de IA (10 minutos)

### Paso 2.1: Crear Código con Comentarios

Abre `src/main.cpp` y escribe el siguiente comentario:

```cpp
// Sistema de parpadeo de LED con patrón SOS
// Pin del LED: 13
// Punto: 200ms encendido
// Raya: 600ms encendido
// Pausa entre símbolos: 200ms
// Pausa entre letras: 600ms
```

**Espera a que Copilot sugiera el código** y presiona Tab para aceptar.

### Paso 2.2: Analizar el Código Generado

Revisa el código generado por Copilot y responde:

| Pregunta | Tu Respuesta |
|----------|--------------|
| ¿Usó los tiempos correctos (200ms, 600ms)? | |
| ¿Implementó correctamente el patrón SOS? | |
| ¿Agregó pausas entre letras? | |
| ¿Hay algún error o mejora necesaria? | |

### Paso 2.3: Mejorar con Chat de Copilot

1. Abre el panel de Copilot Chat (Ctrl+Shift+I)
2. Escribe este prompt:

```
Revisa este código de parpadeo SOS. Sugiere mejoras para:
1. Hacerlo más legible
2. Usar constantes en lugar de números mágicos
3. Agregar comentarios explicativos
```

3. Aplica las sugerencias que consideres apropiadas.

---

## Parte 3: Interacción con IA Externa (5 minutos)

### Paso 3.1: Usar Claude o ChatGPT para Diseño

Abre Claude (claude.ai) o ChatGPT (chat.openai.com) y envía este prompt:

```
Soy estudiante de ingeniería electrónica y estoy diseñando un
sistema embebido con ESP32 que debe:
- Leer un sensor DHT22 de temperatura y humedad
- Mostrar valores en un display OLED I2C
- Encender un LED de alarma si la temperatura supera 30°C
- Enviar datos por WiFi a un servidor MQTT cada 60 segundos

¿Podrías diseñar la arquitectura del sistema mostrando:
1. Diagrama de conexiones (descripción textual)
2. Bibliotecas necesarias
3. Estructura del código principal
4. Consideraciones de consumo de energía
```

### Paso 3.2: Documentar la Respuesta

| Aspecto | Respuesta de la IA |
|---------|-------------------|
| Pines I2C para OLED | |
| Bibliotecas recomendadas | |
| Estructura propuesta | |
| Consumo estimado | |

---

## Entregables

### Archivos a Entregar

1. **Captura de pantalla** de VS Code con las extensiones instaladas
2. **Código main.cpp** con el patrón SOS generado y mejorado
3. **Tabla de evaluación** del código generado (Paso 2.2)
4. **Documentación** de la respuesta de IA externa (Paso 3.2)

### Formato de Entrega

Crear una carpeta con nombre: `M01_Ejercicio_[TuApellido]`

```
M01_Ejercicio_Gonzalez/
├── captura_vscode.png
├── main.cpp
├── evaluacion.md
└── diseño_sistema.md
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Instalación correcta | 25 | VS Code + extensiones funcionando |
| Código SOS funcional | 25 | Patrón generado correctamente |
| Mejoras aplicadas | 25 | Constantes, comentarios, legibilidad |
| Documentación | 25 | Respuestas completas y análisis |
| **Total** | **100** | |

---

## Solución de Problemas Comunes

### Copilot no sugiere código

1. Verificar conexión a internet
2. Confirmar que estás logueado en GitHub
3. Revisar si el archivo tiene extensión `.cpp` o `.c`
4. Probar escribir más contexto en los comentarios

### PlatformIO no detecta la placa

1. Instalar drivers del puerto serial (CH340/CP2102)
2. Verificar cable USB (usar cable de datos, no solo carga)
3. Probar en otro puerto USB
4. Reiniciar VS Code

### Error "Copilot not available"

1. Verificar suscripción activa de GitHub Copilot
2. Estudiantes pueden obtenerlo gratis: https://education.github.com/
3. Reiniciar VS Code después de autenticar

---

## Extensión Opcional

Si terminas antes, intenta este desafío adicional:

**Desafío:** Usa IA para generar un código que:
- Lea un potenciómetro en un pin analógico
- Mapee el valor (0-1023) a frecuencia de parpadeo (50ms-1000ms)
- Muestre el valor por Serial Monitor

Evalúa qué tan bien la IA entiende la relación entre el valor analógico y la frecuencia de parpadeo.

---

*Módulo 01 - Introducción a IA para Electrónica*
*Tiempo estimado: 30 minutos*
