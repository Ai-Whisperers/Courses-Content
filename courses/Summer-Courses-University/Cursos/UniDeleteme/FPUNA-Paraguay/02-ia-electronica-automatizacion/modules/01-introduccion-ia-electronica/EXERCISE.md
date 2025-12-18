# Ejercicio Práctico - Módulo 01
## Configuración del Entorno y Primer Proyecto con IA

---

## Objetivo

Configurar un entorno de desarrollo completo para proyectos de electrónica con asistencia de IA, y generar el primer programa funcional para ESP32.

**Duración:** 30 minutos
**Tipo:** Práctico guiado
**Herramientas:** VS Code, PlatformIO, Claude/ChatGPT

---

## Parte 1: Configuración del Entorno (10 minutos)

### Paso 1.1: Verificar VS Code

1. Abrir VS Code
2. Verificar que está actualizado (Help → Check for Updates)
3. Confirmar que funciona correctamente

### Paso 1.2: Instalar PlatformIO

1. Abrir extensiones (Ctrl+Shift+X)
2. Buscar "PlatformIO IDE"
3. Click en "Install"
4. Esperar a que termine (puede tomar varios minutos)
5. Reiniciar VS Code cuando lo solicite

### Paso 1.3: Verificar Instalación

1. Click en el icono de PlatformIO (hormiga en barra lateral)
2. Debería aparecer "PIO Home"
3. Si hay errores, cerrar y reabrir VS Code

### Paso 1.4: Crear Proyecto de Prueba

1. En PIO Home, click "New Project"
2. Configurar:
   - Name: `test_ia_electronica`
   - Board: `Espressif ESP32 Dev Module`
   - Framework: `Arduino`
3. Click "Finish"
4. Esperar a que se descarguen las herramientas

---

## Parte 2: Primer Programa con IA (15 minutos)

### Paso 2.1: Solicitar Código a la IA

Abre Claude o ChatGPT y envía el siguiente prompt:

```
Genera código para ESP32 que implemente un patrón de parpadeo SOS con LED:

HARDWARE:
- ESP32 DevKit v1
- LED integrado en GPIO2

PATRÓN SOS EN MORSE:
- S: 3 puntos (cortos)
- O: 3 rayas (largos)
- S: 3 puntos (cortos)
- Pausa entre letras
- Pausa larga entre secuencias

TIEMPOS:
- Punto (dot): 200ms
- Raya (dash): 600ms
- Pausa entre símbolos: 200ms
- Pausa entre letras: 600ms
- Pausa entre secuencias: 2000ms

REQUISITOS:
- Framework Arduino para PlatformIO
- Funciones separadas para dot() y dash()
- Función para letra S y letra O
- Comentarios en español explicando cada parte
- Mensajes por Serial Monitor

GENERAR:
- Código completo de main.cpp
- Sin librerías externas
```

### Paso 2.2: Revisar Código Generado

Antes de copiar el código, verifica:

| Verificación | ✓ |
|--------------|---|
| ¿Define el pin LED correctamente (GPIO2)? | |
| ¿Los tiempos coinciden con lo solicitado? | |
| ¿Tiene funciones separadas (dot, dash)? | |
| ¿Incluye mensajes por Serial? | |
| ¿Los comentarios están en español? | |
| ¿Compila sin errores de sintaxis visibles? | |

### Paso 2.3: Implementar el Código

1. Abrir el proyecto creado en VS Code
2. Navegar a `src/main.cpp`
3. Borrar el contenido existente
4. Pegar el código generado por la IA
5. Revisar y ajustar si es necesario

### Paso 2.4: Compilar

1. Click en el checkmark (✓) en la barra inferior de PlatformIO
2. O usar: Ctrl+Alt+B
3. Verificar que compile sin errores:
   ```
   ============== [SUCCESS] ==============
   ```

### Paso 2.5: Si Hay Errores

Si el código no compila, solicita corrección a la IA:

```
El código genera el siguiente error:
[PEGAR ERROR AQUÍ]

Código actual:
[PEGAR CÓDIGO RELEVANTE]

Por favor corrige el error y explica qué estaba mal.
```

---

## Parte 3: Mejora del Programa (5 minutos)

### Paso 3.1: Solicitar Mejora

Una vez que funciona, solicita una mejora:

```
El código SOS funciona. Ahora agrégale:

1. Un botón en GPIO0 (BOOT button del ESP32)
2. Cuando se presiona el botón, cambia el modo:
   - Modo 1: SOS (actual)
   - Modo 2: Parpadeo lento (1 Hz)
   - Modo 3: LED siempre encendido

3. Mostrar el modo actual por Serial

MANTENER:
- Código existente que funciona
- Estructura de funciones
- Comentarios en español

AGREGAR:
- Debounce para el botón
- Variable de modo
- Lógica de cambio
```

### Paso 3.2: Integrar Mejora

1. Revisar el código mejorado
2. Verificar que mantiene lo que funcionaba
3. Integrar cambios gradualmente
4. Compilar y probar

---

## Entregables

### Archivos a Entregar

1. **main.cpp** - Código final funcional
2. **platformio.ini** - Archivo de configuración
3. **prompts.txt** - Los prompts que usaste

### Estructura de Entrega

```
M01_Ejercicio_[TuApellido]/
├── src/
│   └── main.cpp
├── platformio.ini
└── prompts.txt
```

### Formato de prompts.txt

```
=== PROMPT 1: Código inicial ===
[Pegar primer prompt]

=== RESULTADO 1 ===
[Describir si funcionó, qué ajustes hiciste]

=== PROMPT 2: Corrección/Mejora ===
[Pegar segundo prompt si aplica]

=== RESULTADO 2 ===
[Describir resultado]
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Entorno configurado | 20 | PlatformIO funcional |
| Código compila | 20 | Sin errores de compilación |
| Patrón SOS correcto | 25 | Tiempos y secuencia correctos |
| Funciones modulares | 15 | Código organizado en funciones |
| Documentación | 10 | Comentarios y prompts guardados |
| Mejora implementada | 10 | Funcionalidad adicional |
| **Total** | **100** | |

---

## Solución de Problemas Comunes

### PlatformIO no instala

```
Solución:
1. Verificar conexión a internet
2. Cerrar VS Code
3. Eliminar carpeta .platformio en C:\Users\[Usuario]
4. Reinstalar extensión
```

### ESP32 no detectado

```
Solución:
1. Verificar cable USB (debe ser de datos, no solo carga)
2. Instalar driver CH340 o CP2102 según tu ESP32
3. Verificar puerto en Administrador de Dispositivos
```

### Código no compila

```
Verificar:
1. Sintaxis correcta (punto y coma, llaves)
2. Tipos de variables correctos
3. Funciones declaradas antes de usarse
```

### Serial Monitor no muestra nada

```
Verificar:
1. Baud rate coincide (115200)
2. Puerto correcto seleccionado
3. Serial.begin() en setup()
```

---

## Reflexión Final

Responde estas preguntas en tu entrega:

1. ¿El código generado funcionó a la primera? ¿Qué ajustes necesitaste?

2. ¿Qué partes del prompt fueron más importantes para obtener buen código?

3. ¿Qué harías diferente en tu próximo prompt?

---

*Módulo 01 - Ejercicio Práctico*
*Tiempo estimado: 30 minutos*
