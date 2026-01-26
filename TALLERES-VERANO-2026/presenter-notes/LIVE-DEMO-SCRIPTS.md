# Live Demo Scripts - Talleres de Verano FP-UNA 2026

Scripts detallados para las demostraciones en vivo durante las clases.

---

## Clase 1: Fundamentos + Investigación

### Demo 1: Primer Contacto con OpenCode (10 min)

**Setup previo**: Tener terminal abierta con OpenCode listo.

**Script**:

```
[INSTRUCTOR]: "Vamos a hacer nuestra primera interacción con OpenCode. 
Esto es como tener un asistente muy inteligente disponible 24/7."

[EJECUTAR]:
opencode "Hola, soy estudiante de FPUNA. ¿Puedes presentarte brevemente?"

[ESPERAR RESPUESTA]

[INSTRUCTOR]: "Noten que la IA responde de forma natural. 
Ahora hagamos algo más útil..."

[EJECUTAR]:
opencode "Necesito encontrar 5 papers recientes (2023-2024) sobre 
inteligencia artificial aplicada a la educación en Latinoamérica. 
Dame título, autores, y un resumen de 1 línea de cada uno."

[DISCUTIR]: Calidad de resultados, verificación de fuentes.
```

### Demo 2: Ingeniería de Prompts (15 min)

**Script**:

```
[INSTRUCTOR]: "Ahora vean la diferencia entre un prompt malo y uno bueno."

[PROMPT MALO]:
opencode "Dame información sobre Paraguay"

[ESPERAR - Mostrar resultado genérico]

[INSTRUCTOR]: "Muy genérico, ¿verdad? Ahora veamos con estructura CRAFT..."

[PROMPT BUENO]:
opencode "CONTEXTO: Soy estudiante de Economía preparando presentación.
ROL: Experto en economía paraguaya.
ACCIÓN: Lista las 3 principales industrias de Paraguay con datos de 2023.
FORMATO: Tabla con industria, % del PIB, y tendencia.
TONO: Académico."

[COMPARAR]: Las dos respuestas lado a lado.
```

---

## Clase 2: Marketing + Hospitalidad

### Demo 1: Creación de Contenido para Instagram (10 min)

**Script**:

```
[INSTRUCTOR]: "Supongamos que trabajan en marketing para un hotel..."

[EJECUTAR]:
opencode "Crea 3 posts de Instagram para Hotel Guaraní Asunción:
- Post 1: Destacar la piscina rooftop
- Post 2: Promoción de brunch dominical
- Post 3: Escapada de fin de semana

Incluir: caption (máx 100 chars), 5 hashtags locales, emoji sugerido."

[MOSTRAR]: Los resultados.

[INSTRUCTOR]: "En 30 segundos generamos contenido que normalmente 
tomaría 30 minutos. Pero OJO: siempre revisar antes de publicar."
```

### Demo 2: Gamma para Presentaciones (10 min)

**Setup**: Abrir gamma.app en el navegador.

**Script**:

```
[INSTRUCTOR]: "Gamma genera presentaciones completas con IA."

[EN GAMMA]:
1. Click "Create new"
2. Pegar prompt:
   "Crea presentación de 5 slides sobre 'Tendencias en Turismo 
   Gastronómico Paraguay 2026'. Estilo moderno, fotos de comida paraguaya."
3. Generar y mostrar resultado

[INSTRUCTOR]: "En 1 minuto tenemos una presentación que podemos personalizar."
```

---

## Clase 3: Desarrollo de Software

### Demo 1: Generación de Código (15 min)

**Setup**: Tener VS Code abierto con carpeta de proyecto vacía.

**Script**:

```
[INSTRUCTOR]: "Vamos a crear una aplicación de calculadora de propinas."

[EJECUTAR en OpenCode dentro de VS Code]:
opencode "Crea una calculadora de propinas en Python con:
- Función que recibe monto y porcentaje
- Validación de inputs
- Tests con pytest
- Documentación con docstrings

Guarda en archivo tip_calculator.py"

[MOSTRAR]: El código generado.

[EJECUTAR]:
python tip_calculator.py

[INSTRUCTOR]: "Funciona a la primera. Ahora veamos los tests..."

pytest tip_calculator.py -v
```

### Demo 2: Debugging con IA (10 min)

**Preparar código con bug**:

```python
def divide(a, b):
    return a / b

# Esto falla:
result = divide(10, 0)
```

**Script**:

```
[INSTRUCTOR]: "Este código tiene un bug obvio. Pidamos ayuda a IA..."

[EJECUTAR]:
opencode "Este código falla con division by zero. 
Corrige el bug y agrega manejo de errores apropiado:
[pegar código]"

[MOSTRAR]: La corrección con try/except.

[INSTRUCTOR]: "La IA no solo arregla, explica por qué falla."
```

---

## Clase 4: Electrónica + Automatización

### Demo 1: Código Arduino con IA (10 min)

**Script**:

```
[INSTRUCTOR]: "Vamos a generar código para Arduino que lea temperatura."

[EJECUTAR]:
opencode "Genera código Arduino para:
- Leer sensor DHT22 de temperatura y humedad
- Mostrar valores en LCD 16x2
- Encender LED rojo si temperatura > 30°C
- Incluir comentarios explicando cada sección"

[MOSTRAR]: El código generado.

[INSTRUCTOR]: "Código listo para cargar. Pero SIEMPRE verificar 
pinout y conexiones antes de ejecutar en hardware real."
```

### Demo 2: Automatización con Python (10 min)

**Script**:

```
[INSTRUCTOR]: "Automaticemos una tarea repetitiva: renombrar archivos."

[EJECUTAR]:
opencode "Crea script Python que:
- Lea todos los archivos .jpg en una carpeta
- Los renombre con formato YYYY-MM-DD_001.jpg
- Muestre progreso
- Maneje errores si archivo ya existe"

[DEMOSTRAR]: Con carpeta de prueba con imágenes.
```

---

## Clase 5: Ingeniería Aeronáutica

### Demo 1: Análisis de Datos de Vuelo (15 min)

**Script**:

```
[INSTRUCTOR]: "Vamos a analizar datos de un vuelo simulado."

[EJECUTAR]:
opencode "Tengo datos CSV de un vuelo con columnas:
timestamp, altitude, speed, heading, fuel_remaining

Genera código Python con pandas que:
1. Cargue el CSV
2. Calcule velocidad promedio y máxima
3. Grafique altitud vs tiempo
4. Identifique anomalías (cambios bruscos de altitud)

Incluye visualización con matplotlib."

[MOSTRAR]: Gráficas generadas.

[INSTRUCTOR]: "Este tipo de análisis es crucial para mantenimiento predictivo."
```

---

## Clase 6: Proyectos + Q&A

### Demo: Sesión de Debugging en Vivo (20 min)

**Script**:

```
[INSTRUCTOR]: "Ahora ustedes proponen problemas y los resolvemos juntos."

[FLUJO]:
1. Estudiante presenta problema/proyecto
2. Instructor formula prompt con estudiante
3. Ejecutar y analizar resultado
4. Iterar si es necesario
5. Discutir aprendizajes

[TIPS para moderación]:
- Limitar a 3-4 minutos por problema
- Elegir problemas diversos (diferentes carreras)
- Involucrar a otros estudiantes en discusión
```

---

## Tips Generales para Demos en Vivo

### Preparación

- [ ] Verificar conexión a internet (tener backup con hotspot móvil)
- [ ] Tener todos los prompts pre-escritos en archivo de texto
- [ ] Probar demos 30 minutos antes de la clase
- [ ] Tener "plan B" si algo falla

### Durante la Demo

- Narrar lo que estás haciendo: "Ahora voy a..."
- Si algo falla, usarlo como momento de aprendizaje
- Hacer pausas para preguntas
- Mostrar tanto éxitos como limitaciones de la IA

### Errores Comunes a Evitar

- No tener internet de backup
- Prompts demasiado largos para leer en pantalla
- No explicar qué está pasando mientras esperas respuesta
- Ignorar errores o respuestas incorrectas de la IA

---

**Última actualización**: Enero 26, 2026
