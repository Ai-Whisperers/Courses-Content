# Setup Día 2: IA para Electrónica

## Guía de Instalación para Electrónica y Automatización

> **Pre-requisito**: Haber completado el [Setup del Día 1](../dia-01-fundamentos/SETUP-DIA-01.md)

---

## 1. Arduino IDE 2.x (Obligatorio)

**¿Qué es?** Entorno de desarrollo para programar microcontroladores Arduino.

### Instalación

#### Windows
1. Ir a https://www.arduino.cc/en/software
2. Descargar **Arduino IDE 2.x** (no la versión 1.8)
3. Ejecutar el instalador
4. Aceptar instalar los drivers cuando pregunte

#### macOS
1. Descargar desde https://www.arduino.cc/en/software
2. Arrastrar a la carpeta Aplicaciones
3. Primera vez: click derecho → Abrir (por seguridad de macOS)

#### Linux
```bash
# Opción 1: AppImage (recomendado)
# Descargar desde arduino.cc y ejecutar

# Opción 2: Flatpak
flatpak install flathub cc.arduino.IDE2

# Opción 3: Snap
sudo snap install arduino
```

### Verificar Instalación
1. Abrir Arduino IDE
2. Ir a Tools → Board → Boards Manager
3. Buscar "Arduino AVR Boards" - debe estar instalado
4. Crear sketch nuevo: File → New

### Configuración Inicial
1. Ir a File → Preferences
2. Habilitar: "Show verbose output during: compilation"
3. Agregar URL adicional de boards (opcional):
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```

---

## 2. Drivers USB (Obligatorio si tienes placa)

### Driver CH340 (Placas chinas/clones)

**¿Qué es?** Driver para el chip USB de placas Arduino económicas.

#### Windows
1. Descargar de: http://www.wch.cn/downloads/CH341SER_EXE.html
2. O buscar "CH340 driver Windows" en Google
3. Ejecutar instalador
4. Reiniciar si se pide

#### macOS
```bash
# Con Homebrew
brew install --cask wch-ch34x-usb-serial-driver

# O descargar de: https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver
```

#### Linux
```bash
# Generalmente incluido en el kernel
# Verificar:
ls /dev/ttyUSB*
# Agregar usuario al grupo dialout:
sudo usermod -a -G dialout $USER
# Reiniciar sesión
```

### Driver CP2102 (Otras placas)

#### Windows
1. Descargar de: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
2. Instalar "CP210x Universal Windows Driver"

#### macOS/Linux
Generalmente incluido en el sistema.

### Verificar Driver
1. Conectar placa Arduino por USB
2. En Arduino IDE: Tools → Port
3. Debe aparecer un puerto COM (Windows) o /dev/ttyUSB0 (Linux)

---

## 3. KiCAD 7+ (Recomendado)

**¿Qué es?** Software gratuito y open-source para diseño de PCB.

### Instalación

#### Windows
1. Ir a https://www.kicad.org/download/windows/
2. Descargar versión estable (7.x o superior)
3. Ejecutar instalador (~2 GB)
4. Instalar con todas las librerías

#### macOS
```bash
# Con Homebrew (recomendado)
brew install --cask kicad

# O descargar de kicad.org
```

#### Linux
```bash
# Ubuntu/Debian
sudo add-apt-repository ppa:kicad/kicad-7.0-releases
sudo apt update
sudo apt install kicad

# Fedora
sudo dnf install kicad
```

### Verificar Instalación
1. Abrir KiCAD
2. Crear nuevo proyecto
3. Abrir el editor de esquemáticos (Eeschema)
4. Verificar que las librerías de símbolos cargan

---

## 4. Librerías de Arduino (Recomendado)

### Instalar desde Arduino IDE

1. Abrir Arduino IDE
2. Ir a Tools → Manage Libraries...
3. Instalar las siguientes:

| Librería | Búsqueda | Para qué |
|----------|----------|----------|
| LiquidCrystal I2C | "LiquidCrystal I2C" | Displays LCD |
| DHT sensor library | "DHT sensor" | Sensores de temp/humedad |
| Adafruit Unified Sensor | "Adafruit Unified" | Base para sensores |
| Servo | Ya incluida | Servomotores |
| Wire | Ya incluida | Comunicación I2C |

### Verificar Librerías
1. File → Examples
2. Deben aparecer ejemplos de las librerías instaladas

---

## 5. Simuladores Online (Alternativa sin Hardware)

Si no tienes placa física, usar estos simuladores:

### Wokwi (Recomendado)
- URL: https://wokwi.com/
- Crear cuenta gratuita
- Soporta Arduino, ESP32, Raspberry Pi Pico
- Tiene sensores, displays, LEDs virtuales

### Tinkercad Circuits
- URL: https://www.tinkercad.com/circuits
- Cuenta gratuita con email
- Más básico pero funcional
- Incluye simulación de breadboard

### Falstad Circuit Simulator
- URL: https://www.falstad.com/circuit/
- No requiere cuenta
- Mejor para circuitos analógicos
- Simulación de electrónica básica

---

## 6. Extensiones de VS Code para Electrónica

### PlatformIO (Opcional pero potente)
```
1. En VS Code, ir a Extensions
2. Buscar "PlatformIO IDE"
3. Instalar
4. Reiniciar VS Code
5. Se agregará el ícono de PlatformIO en la barra lateral
```

**¿Por qué PlatformIO?**
- Mejor autocompletado que Arduino IDE
- Integración con Claude para mejor código
- Soporta múltiples plataformas (Arduino, ESP32, STM32)

---

## 7. Verificación Final

### Checklist

```bash
# 1. Arduino IDE funciona
# - Abrir Arduino IDE
# - Crear nuevo sketch
# - Verificar (compilar) sketch vacío → debe compilar OK

# 2. Si tienes placa
# - Conectar Arduino por USB
# - Seleccionar Board: Arduino Uno (o tu placa)
# - Seleccionar Port: COM# o /dev/ttyUSB#
# - Subir sketch Blink (File → Examples → Basics → Blink)
# - LED debe parpadear

# 3. Si usas simulador
# - Abrir wokwi.com
# - Crear nuevo proyecto Arduino
# - Escribir código de LED blink
# - Correr simulación
```

### Prueba con Claude

```
Prompt a Claude:
"Genera código Arduino para hacer parpadear un LED
en el pin 13 cada 500ms. Incluye comentarios explicativos."
```

Copiar el código a Arduino IDE → Verificar → Debe compilar sin errores.

---

## 8. Solución de Problemas

### Arduino IDE no detecta la placa

1. Verificar cable USB (algunos solo cargan, no datos)
2. Probar otro puerto USB
3. Reinstalar drivers CH340/CP2102
4. En Windows: Device Manager → Ver si aparece con error

### Error de compilación

1. Verificar que el board correcto está seleccionado
2. Tools → Board → Arduino Uno (o tu placa)
3. Si falta librería: instalar desde Library Manager

### KiCAD muy lento

1. Reducir zoom en esquemáticos grandes
2. Cerrar otras aplicaciones
3. En Preferences → 3D Viewer → reducir calidad

### Simulador no carga

1. Usar Chrome o Firefox actualizado
2. Deshabilitar extensiones de ad-blocker
3. Limpiar caché del navegador

---

## 9. Recursos Adicionales

### Documentación
- Arduino Reference: https://www.arduino.cc/reference/en/
- KiCAD Docs: https://docs.kicad.org/
- ESP32 Reference: https://docs.espressif.com/

### Datasheets (para ejercicios)
- LM35: https://www.ti.com/lit/ds/symlink/lm35.pdf
- DHT11: https://www.mouser.com/datasheet/2/758/DHT11-Technical-Data-Sheet-1381817.pdf
- ESP8266: https://www.espressif.com/en/products/socs/esp8266

### Comunidades
- Arduino Forum: https://forum.arduino.cc/
- r/arduino: https://www.reddit.com/r/arduino/
- Electronics Stack Exchange: https://electronics.stackexchange.com/

---

## 10. Checklist Pre-Clase Día 2

- [ ] Setup Día 1 completado y funcionando
- [ ] Arduino IDE 2.x instalado
- [ ] Driver USB instalado (si tienes placa)
- [ ] Al menos 2 librerías adicionales instaladas
- [ ] Simulador Wokwi probado (si no tienes placa)
- [ ] KiCAD instalado (recomendado)
- [ ] Prueba de compilación exitosa

**Si tienes problemas**, llegar 30 minutos antes a clase.

---

*Setup Día 2 - Electrónica*
*FPUNA Verano 2026*
