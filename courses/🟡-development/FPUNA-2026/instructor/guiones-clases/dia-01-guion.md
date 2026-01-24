# Guion de Clase - Dia 1: Fundamentos de IA

## Informacion de la Clase

| Aspecto | Detalle |
|---------|---------|
| **Duracion** | 2 horas |
| **Audiencia** | Todos los participantes |
| **Objetivo** | Setup completo + conceptos basicos de IA |

---

## PRE-CLASE (15 min antes)

### Checklist del Instructor

- [ ] Proyector/pantalla funcionando
- [ ] Internet estable (probar con speedtest)
- [ ] Tu Claude/OpenCode funcionando
- [ ] Mentimeter listo con codigo
- [ ] Agua/cafe disponible
- [ ] Lista de asistencia preparada

### Ambiente

- Musica de fondo suave (opcional)
- Pantalla mostrando: "Bienvenidos - FPUNA Verano 2026"
- Link de Mentimeter visible

---

## MODULO 1: Bienvenida + Onboarding (15 min)

### 0:00 - 0:05 | Presentacion Personal

**DECIR:**
> "Buenos dias! Soy [NOMBRE], y durante estos 6 dias vamos a aprender a usar IA para acelerar nuestro trabajo. No importa tu carrera - electronica, aeronautica, software, marketing - la IA es una herramienta que todos pueden usar."

**HACER:**
- Presentarte brevemente (30 seg max)
- Mencionar tu experiencia con IA

### 0:05 - 0:15 | Mentimeter Onboarding

**DECIR:**
> "Antes de empezar, quiero conocerlos. Abran menti.com y pongan el codigo [CODIGO]"

**MOSTRAR:**
- Codigo Mentimeter en pantalla grande
- Esperar que todos entren (1-2 min)

**EJECUTAR:**
- Preguntas de Mentimeter (ver mentimeter.md)
- Mostrar resultados en tiempo real
- Comentar brevemente los resultados

---

## MODULO 2: Que es la IA Generativa? (15 min)

### 0:15 - 0:20 | Concepto Simple

**DECIR:**
> "La IA generativa es como tener un asistente muy inteligente que leyo millones de libros, articulos y codigo. Puede ayudarte a escribir, programar, analizar datos, y mucho mas."

**NO DECIR:**
- Terminos tecnicos complejos (transformers, tokens, etc.)
- "La IA va a reemplazar tu trabajo"

### 0:20 - 0:25 | Demo Rapida

**HACER:**
- Abrir Claude/OpenCode en tu terminal
- Mostrar pantalla

**ESCRIBIR EN CLAUDE:**
```
Explicame en 3 oraciones que es la ingenieria aeronautica,
como si le explicaras a un nino de 10 anos.
```

**DECIR:**
> "Miren que rapido responde. Ahora voy a pedirle algo mas especifico..."

**ESCRIBIR:**
```
Ahora explicalo para estudiantes universitarios de primer ano.
```

**PUNTO CLAVE:**
> "La misma IA puede adaptarse a diferentes audiencias. Esto es el poder de los prompts."

### 0:25 - 0:30 | Por que Claude/OpenCode?

**DECIR:**
> "Hay muchas IAs: ChatGPT, Gemini, Copilot... Usamos Claude porque:
> 1. Funciona directamente en tu terminal/IDE
> 2. Entiende mejor el contexto de proyectos
> 3. Es mas preciso para tareas tecnicas"

---

## MODULO 3: Instalacion y Verificacion (15 min)

### 0:30 - 0:35 | Verificacion Grupal

**DECIR:**
> "Ahora verificamos que todos tengan todo instalado. Levanten la mano si..."

**PREGUNTAR (levantar manos):**
- "...tienen Node.js instalado"
- "...tienen Git instalado"
- "...tienen VS Code"
- "...tienen cuenta en Anthropic"
- "...pudieron instalar Claude Code"

**SI HAY PROBLEMAS:**
> "Los que tengan problemas, acerquense y los ayudamos. Los demas, pueden practicar con el ejercicio en pantalla."

### 0:35 - 0:45 | Ejercicio: Hola Claude

**MOSTRAR EN PANTALLA:**
```bash
# En tu terminal, escribe:
claude

# Cuando se abra, escribe:
Hola! Soy estudiante de [TU CARRERA] en FPUNA.
Que puedes ayudarme a hacer?
```

**CAMINAR POR EL AULA:**
- Verificar que todos puedan ejecutar
- Ayudar con errores comunes
- Tomar nota de problemas frecuentes

---

## BREAK (10 min)

**DECIR:**
> "Tomemos 10 minutos. Hay agua y cafe afuera. Los que tengan problemas tecnicos, quedense y los ayudamos."

**DURANTE EL BREAK:**
- Resolver problemas de instalacion
- Responder preguntas individuales

---

## MODULO 4: Anatomia de un Prompt (15 min)

### 0:55 - 1:00 | Estructura Basica

**MOSTRAR EN PANTALLA:**
```
PROMPT = CONTEXTO + INSTRUCCION + FORMATO

Ejemplo:
[CONTEXTO] Soy estudiante de electronica trabajando en un proyecto con Arduino.
[INSTRUCCION] Necesito codigo para leer un sensor de temperatura LM35.
[FORMATO] Dame el codigo comentado en espanol.
```

**DECIR:**
> "Un buen prompt tiene 3 partes: quien eres, que necesitas, y como lo quieres."

### 1:00 - 1:10 | Ejemplos Buenos vs Malos

**EJEMPLO MALO:**
```
codigo arduino temperatura
```

**RESULTADO:** Respuesta generica, posiblemente incorrecta.

**EJEMPLO BUENO:**
```
Soy estudiante de electronica. Necesito codigo Arduino para:
- Leer temperatura del sensor LM35 conectado al pin A0
- Mostrar el valor en grados Celsius en el Serial Monitor
- Actualizar cada 2 segundos

Dame el codigo completo con comentarios en espanol.
```

**RESULTADO:** Codigo especifico y usable.

**PUNTO CLAVE:**
> "La calidad del resultado depende de la calidad del prompt."

---

## MODULO 5: Tu Primer Proyecto con IA (15 min)

### 1:10 - 1:25 | Ejercicio Guiado

**DECIR:**
> "Vamos a crear un README.md para un proyecto ficticio, usando IA."

**PASO 1 - MOSTRAR:**
```
Necesito crear un README.md para mi proyecto de universidad.
El proyecto es: [ELEGIR SEGUN AUDIENCIA]
- Sistema de riego automatico con Arduino
- Calculadora de sustentacion para alas
- Aplicacion web de tareas
- Campana de marketing para cafe local

Incluye: descripcion, instalacion, uso, y creditos.
```

**PASO 2:**
> "Ahora ustedes haganlo con su propio proyecto. Puede ser real o inventado."

**CAMINAR Y AYUDAR:**
- Ver que estan escribiendo
- Sugerir mejoras a sus prompts
- Celebrar buenos resultados

---

## MODULO 6: Configuracion de Contexto (15 min)

### 1:25 - 1:35 | Que es CLAUDE.md?

**DECIR:**
> "CLAUDE.md es como darle a la IA tu curriculum. Le dice quien eres, que sabes, y como quieres que te ayude."

**MOSTRAR EJEMPLO:**
```markdown
# Mi Contexto

## Quien Soy
Estudiante de 3er ano de Ingenieria Electronica en FPUNA.

## Mis Proyectos
- Sistema de riego automatico (Arduino + sensores)
- Robot seguidor de linea (competencia universitaria)

## Como Quiero Ayuda
- Codigo siempre comentado en espanol
- Explicaciones paso a paso
- Preferencia por soluciones simples

## Herramientas que Uso
- Arduino IDE
- KiCAD para PCB
- VS Code
```

### 1:35 - 1:40 | Crear Tu CLAUDE.md

**EJERCICIO:**
> "Creen su propio CLAUDE.md. Tienen 5 minutos."

**PLANTILLA EN PANTALLA:**
```markdown
# Mi Contexto

## Quien Soy
[Tu carrera y ano]

## Mis Intereses
[Que te gustaria hacer con IA]

## Como Quiero Ayuda
[Tu estilo preferido de respuestas]
```

---

## MODULO 7: Cierre + Q&A (10 min)

### 1:40 - 1:45 | Resumen

**DECIR:**
> "Hoy aprendimos:
> 1. Que es la IA generativa
> 2. Como estructurar un buen prompt
> 3. Como crear proyectos con ayuda de IA
> 4. Como configurar nuestro contexto
>
> Manana veremos aplicaciones especificas para Electronica."

### 1:45 - 1:50 | Tarea Opcional

**MOSTRAR:**
```
TAREA OPCIONAL:
1. Crear 3 prompts diferentes para tu area
2. Guardarlos en un archivo prompts.md
3. Probarlos y anotar cual funciono mejor
```

### 1:50 - 2:00 | Q&A

**DECIR:**
> "Preguntas? Pueden ser sobre lo que vimos hoy o sobre IA en general."

**RESPONDER:**
- Maximo 2-3 preguntas
- Si hay muchas, ofrecer quedarse despues

**CIERRE:**
> "Gracias! Nos vemos manana. Recuerden que manana es el dia de Electronica,
> asi que si no son de esa carrera pueden venir igual o unirse el dia de su area."

---

## NOTAS POST-CLASE

### Registrar

- [ ] Numero de asistentes
- [ ] Problemas tecnicos frecuentes
- [ ] Preguntas interesantes
- [ ] Estudiantes que necesitan seguimiento

### Para Mejorar

- Que funciono bien?
- Que cambiar para proxima vez?
- Algun ejercicio tomo mas/menos tiempo?

---

*Guion Dia 1 - Fundamentos*
*FPUNA Verano 2026*
