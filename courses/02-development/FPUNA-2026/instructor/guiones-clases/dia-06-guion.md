# Guion de Clase - Dia 6: IA para Investigacion + Cierre

## Informacion de la Clase

| Aspecto | Detalle |
|---------|---------|
| **Duracion** | 2 horas |
| **Audiencia** | Investigadores, estudiantes de posgrado, todos |
| **Objetivo** | Usar IA para investigacion academica + cierre del taller |

---

## PRE-CLASE (15 min antes)

### Checklist del Instructor

- [ ] Zotero funcionando con biblioteca de ejemplo
- [ ] Python con pandas, scipy instalados
- [ ] Dataset de ejemplo cargado
- [ ] Mentimeter de FEEDBACK FINAL listo
- [ ] Certificados preparados (si aplica)
- [ ] Lista de recursos para compartir

### Materiales

- Paper de ejemplo para analizar
- Dataset CSV de ejemplo
- Script de analisis estadistico
- Lista de bases de datos academicas

---

## MODULO 1: IA en Investigacion Academica (15 min)

### 0:00 - 0:05 | Contexto

**DECIR:**
> "Hoy es el ultimo dia. Vamos a ver como la IA puede ayudar en investigacion academica. Esto es util para TODOS, no solo investigadores - todos hacen tesis, informes, y analisis de datos."

### 0:05 - 0:15 | Usos de IA en Investigacion

**MOSTRAR:**
```
IA EN INVESTIGACION:
✅ Buscar y resumir literatura
✅ Analizar datos estadisticos
✅ Mejorar redaccion academica
✅ Generar codigo para analisis
✅ Crear graficos profesionales
✅ Organizar referencias

⚠️ CUIDADO CON:
- Citar papers que no existen (alucinaciones)
- Usar texto generado sin verificar
- Plagiar inadvertidamente
- Confiar en datos sin fuente
```

---

## MODULO 2: Revision de Literatura (20 min)

### 0:15 - 0:25 | Buscar y Resumir Papers

**DECIR:**
> "La IA NO puede buscar papers recientes, pero puede ayudarles a:
> - Entender papers que ya tienen
> - Identificar gaps en la literatura
> - Organizar la revision"

**PROMPT PARA RESUMIR:**
```
Resume este abstract de paper academico:

[PEGAR ABSTRACT]

Incluye:
1. Objetivo del estudio (1 oracion)
2. Metodologia (1 oracion)
3. Resultados principales (2-3 puntos)
4. Limitaciones (si se mencionan)
5. Relevancia para: [TU TEMA DE TESIS]
```

### 0:25 - 0:35 | Organizar Revision de Literatura

**PROMPT:**
```
Estoy haciendo una revision de literatura sobre:
"[TU TEMA - ej: Impacto de drones en agricultura de precision]"

Ayudame a:
1. Identificar 5 subtemas principales a investigar
2. Sugerir terminos de busqueda para cada subtema
3. Crear una matriz de literatura (tabla) para organizar los papers
4. Identificar posibles gaps donde falte investigacion
```

---

## MODULO 3: Analisis de Datos (25 min)

### 0:35 - 0:45 | Estadistica con IA

**DEMO - ANALISIS BASICO:**
```
Tengo datos de un experimento con 2 grupos:
- Grupo control: 10 participantes
- Grupo tratamiento: 10 participantes
- Variable medida: puntaje pre-test y post-test

Los datos son:
[PEGAR DATOS CSV]

Realiza:
1. Estadisticas descriptivas por grupo
2. Test t para diferencia de medias
3. Tamano del efecto (Cohen's d)
4. Interpretacion de resultados

Incluye codigo Python para replicar el analisis.
```

### 0:45 - 0:55 | Ejercicio: Analizar Datos

**EJERCICIO:**
> "Usen el dataset de ejemplo para hacer su propio analisis."

**DATASET:** (en pantalla)
```csv
id,grupo,edad,genero,pre_test,post_test
1,control,25,F,45,48
2,control,28,M,52,54
...
```

**PEDIR:**
```
Con estos datos:
1. Hay diferencia significativa entre grupos?
2. La edad afecta los resultados?
3. Hay diferencia por genero?
4. Genera graficos apropiados
```

### 0:55 - 1:00 | Visualizacion

**PROMPT:**
```
Genera codigo Python para crear estos graficos con los datos:
1. Boxplot comparando grupos
2. Scatter plot edad vs diferencia
3. Barplot con error bars por grupo y genero

Estilo: academico (blanco y negro, sin colores innecesarios)
Formato: listos para publicacion (300 dpi, etiquetas claras)
```

---

## BREAK (5 min - mas corto para cierre)

---

## MODULO 4: Redaccion Academica (15 min)

### 1:05 - 1:15 | Mejorar Texto Academico

**PROMPT:**
```
Mejora este parrafo de mi tesis para que sea mas academico:

"Los drones estan siendo usados mucho en la agricultura.
Ayudan a ver los campos desde arriba y detectar problemas.
Muchos agricultores ahora los usan."

Mejora:
1. Formalizar el lenguaje
2. Agregar estructura de argumento
3. Sugerir donde necesito citas
4. Mantener mi voz/estilo
```

### 1:15 - 1:20 | Generar Secciones

**PROMPT:**
```
Ayudame a estructurar la seccion de Metodologia para mi tesis sobre:
"[TEMA]"

El estudio es:
- Tipo: [cuantitativo/cualitativo/mixto]
- Muestra: [descripcion]
- Instrumentos: [cuales]
- Analisis: [tipo]

Dame:
1. Estructura recomendada de subsecciones
2. Que incluir en cada una
3. Ejemplo de parrafo inicial
```

---

## MODULO 5: Referencias con Zotero (10 min)

### 1:20 - 1:30 | Demo Rapida Zotero + IA

**MOSTRAR:**
1. Guardar referencia desde Google Scholar
2. Organizar en colecciones
3. Exportar bibliografia en APA/IEEE

**PROMPT PARA FORMATO:**
```
Tengo esta referencia:
Autor: Juan Perez
Titulo: Uso de IA en educacion superior
Revista: Revista de Educacion
Ano: 2024
Volumen: 15
Paginas: 45-62

Formateala en:
1. APA 7ma edicion
2. IEEE
3. Vancouver
```

---

## MODULO 6: Cierre del Taller (25 min)

### 1:30 - 1:35 | Resumen de los 6 Dias

**MOSTRAR EN PANTALLA:**
```
LO QUE APRENDIMOS:

Dia 1: Fundamentos - setup y conceptos basicos
Dia 2: Electronica - Arduino, datasheets, debugging
Dia 3: Aeronautica - calculos, perfiles, sizing
Dia 4: Software - codigo, testing, documentacion
Dia 5: Marketing - contenido, copy, analytics
Dia 6: Investigacion - papers, datos, redaccion

HABILIDAD CENTRAL: Escribir prompts efectivos
```

### 1:35 - 1:55 | MENTIMETER FEEDBACK FINAL

**DECIR:**
> "Ahora lo mas importante: su feedback. Abran menti.com con el codigo [CODIGO]"

**EJECUTAR:**
- 7 preguntas del Mentimeter de feedback final
- Dar tiempo suficiente (especialmente pregunta 3 testimonial)
- Mostrar resultados en pantalla

**VER:** [mentimeter.md](../../dias/dia-06-investigacion/mentimeter.md)

### 1:55 - 2:00 | Cierre y Despedida

**DECIR:**
> "Gracias por estos 6 dias. Algunos puntos finales:"

**MOSTRAR:**
```
PROXIMOS PASOS:
1. Unanse al grupo de WhatsApp [QR/LINK]
2. Materiales disponibles en [REPOSITORIO]
3. Certificados enviados por email esta semana
4. Consultas: [EMAIL DE CONTACTO]

SIGAN PRACTICANDO:
- Usen IA todos los dias
- Experimenten con prompts nuevos
- Compartan con colegas lo aprendido
```

**FOTO GRUPAL** (opcional pero recomendado)

**DESPEDIDA:**
> "La IA es una herramienta. Ustedes son los expertos en su campo. Combinen ambos y van a lograr cosas increibles. Exitos!"

---

## POST-CLASE (CRITICO)

### Inmediatamente despues:

1. **Exportar Mentimeter** a Excel
2. **Calcular metricas**:
   - % satisfaccion (pregunta 1)
   - Dia mas valorado (pregunta 2)
3. **Seleccionar testimonios** de preguntas 3 y 4
4. **Registrar leads** de pregunta 5
5. **Enviar email de agradecimiento** con:
   - Link a materiales
   - Encuesta adicional (opcional)
   - Informacion de certificados

### Esta semana:

- [ ] Procesar certificados
- [ ] Contactar leads capturados
- [ ] Publicar fotos en redes (con permiso)
- [ ] Analizar feedback para mejoras
- [ ] Documentar lecciones aprendidas

---

## NOTAS FINALES

### Metricas de Exito

- [ ] % de asistencia los 6 dias
- [ ] Promedio de satisfaccion
- [ ] Numero de leads capturados
- [ ] Testimonios utilizables

### Para Proxima Edicion

- Que funciono muy bien?
- Que necesita mejora?
- Que agregar/quitar?
- Feedback del instructor

---

*Guion Dia 6 - Investigacion + Cierre*
*FPUNA Verano 2026*
