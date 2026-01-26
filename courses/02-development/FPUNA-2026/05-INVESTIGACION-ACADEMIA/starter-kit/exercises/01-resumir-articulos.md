# Ejercicio 1: Resumir y Entender Artículos Científicos con IA

## Objetivo
Aprender a usar IA para comprender artículos científicos complejos de manera eficiente.

## Duración
45-60 minutos

## Prerrequisitos
- Un artículo científico en PDF o texto
- Conocimiento básico de metodología de investigación
- Acceso a Claude

## ⚠️ ADVERTENCIA CRÍTICA

**LA IA PUEDE INVENTAR INFORMACIÓN ACADÉMICA.**

Riesgos de usar IA para investigación:
- Puede inventar citas que no existen
- Puede malinterpretar resultados
- Puede atribuir conclusiones incorrectas
- NO tiene acceso a papers actuales

**REGLA DE ORO:**
La IA es para ENTENDER papers que TÚ ya tienes.
NUNCA para que la IA te "busque" papers.

---

## Parte 1: Preparar el Artículo (10 minutos)

### El problema

Tienes que leer un artículo de 20 páginas en inglés para mañana. Necesitas:
1. Entender la idea principal
2. Identificar metodología
3. Extraer resultados clave
4. Evaluar limitaciones

### Selecciona un artículo

Para este ejercicio, usa:
- Un paper real que necesites leer para tu tesis/trabajo
- O busca uno de acceso abierto en Google Scholar

**Criterios de selección:**
- [ ] Es de una fuente confiable (revista indexada)
- [ ] Tienes el PDF completo
- [ ] Tiene abstract, metodología, resultados, conclusiones

### Extrae el texto

1. Copia el texto del PDF (o usa OCR si es imagen)
2. Organízalo por secciones
3. Ten listo para pegar en el prompt

---

## Parte 2: Primer Resumen Rápido (10 minutos)

### Prompt para resumen ejecutivo

```
Actúa como un investigador académico.

Lee este artículo científico y genera un resumen ejecutivo:

---
[PEGAR ABSTRACT + INTRODUCCIÓN + CONCLUSIONES]
---

**Genera:**

1. **Resumen en 3 oraciones:**
   - ¿Qué investigaron?
   - ¿Cómo lo hicieron?
   - ¿Qué encontraron?

2. **Pregunta de investigación:**
   [Identificar la pregunta central]

3. **Aporte principal:**
   [¿Qué agrega al conocimiento existente?]

4. **Palabras clave para entender:**
   [Lista de términos técnicos que debería buscar]

5. **Lectura recomendada:**
   - Si tengo 10 minutos: leer secciones ___
   - Si tengo 30 minutos: leer secciones ___
   - Si tengo 1 hora: lectura completa con foco en ___
```

### Verifica el resumen

| Elemento | IA dice | Paper dice (verificar) |
|----------|---------|------------------------|
| Objetivo del estudio | | |
| Metodología usada | | |
| Resultado principal | | |
| Conclusión clave | | |

---

## Parte 3: Análisis Profundo por Secciones (15 minutos)

### Prompt para metodología

```
Analiza la sección de metodología de este artículo:

---
[PEGAR SECCIÓN DE METODOLOGÍA]
---

**Explícame:**

1. **Diseño del estudio:**
   - ¿Es experimental, cuasi-experimental, observacional?
   - ¿Es transversal o longitudinal?

2. **Participantes/Muestra:**
   - ¿Cuántos? ¿Cómo fueron seleccionados?
   - ¿Hay sesgo de selección?

3. **Variables:**
   - Variable dependiente: ___
   - Variables independientes: ___
   - Variables de control: ___

4. **Instrumentos:**
   - ¿Qué herramientas usaron para medir?
   - ¿Son válidos y confiables?

5. **Análisis estadístico:**
   - ¿Qué pruebas usaron?
   - ¿Son apropiadas para los datos?

6. **Limitaciones metodológicas:**
   - ¿Qué debilidades identificas?
   - ¿Afectan la validez de los resultados?

Explica en términos simples, como para un estudiante
de pregrado que está aprendiendo metodología.
```

### Prompt para resultados

```
Analiza la sección de resultados:

---
[PEGAR SECCIÓN DE RESULTADOS]
---

**Explícame:**

1. **Hallazgos principales:**
   [Lista de resultados clave, en orden de importancia]

2. **Estadísticas clave:**
   | Resultado | Valor | ¿Significativo? |
   |-----------|-------|-----------------|
   | | | |

3. **Tablas y figuras:**
   - ¿Qué muestra cada una?
   - ¿Cuál es la más importante?

4. **¿Responden la pregunta de investigación?**
   [Sí/No/Parcialmente - explicar]

5. **Sorpresas o contradicciones:**
   [Resultados inesperados que mencionan]
```

---

## Parte 4: Evaluación Crítica (10 minutos)

### Prompt para análisis crítico

```
Ahora ayúdame a evaluar críticamente este artículo:

**Información del paper:**
- Título: [título]
- Autores: [nombres]
- Revista: [nombre]
- Año: [año]

**Ya leí y entendí:**
- Objetivo: [resumir]
- Metodología: [resumir]
- Resultados: [resumir]

**Ayúdame a evaluar:**

1. **Fortalezas del estudio:**
   - ¿Qué hicieron bien?
   - ¿El diseño es riguroso?
   - ¿Las conclusiones son sólidas?

2. **Debilidades:**
   - ¿Qué limitaciones tiene?
   - ¿Hay sesgos potenciales?
   - ¿Qué no controlaron?

3. **Generalizabilidad:**
   - ¿Aplica a mi contexto (Paraguay)?
   - ¿La muestra es representativa?

4. **Conflictos de interés:**
   - ¿Quién financió el estudio?
   - ¿Hay sesgos institucionales?

5. **Preguntas que me quedan:**
   [¿Qué no quedó claro o no respondieron?]

6. **Para mi investigación:**
   - ¿Puedo citar este paper?
   - ¿Qué información me es útil?
   - ¿Qué debo verificar en otras fuentes?
```

---

## Parte 5: Términos Técnicos (10 minutos)

### Pide explicación de conceptos

```
Del artículo que analicé, no entiendo bien estos conceptos:

1. [Término 1 del paper]
2. [Término 2 del paper]
3. [Término 3 del paper]

Para cada uno:
1. Define en una oración simple
2. Da un ejemplo cotidiano
3. Explica por qué es importante en este estudio
4. Sugiere fuente para profundizar (libro de metodología, etc.)

Nivel: Estudiante de pregrado en [tu carrera]
```

---

## Template para Resumir Papers

```
## Resumen de Artículo Científico

**Datos del paper:**
- Título: ________________
- Autores: ________________
- Revista: ________________
- Año: ____
- DOI/Link: ________________

**Secciones disponibles:**
[Pegar las secciones que vas a analizar]

**Nivel de análisis deseado:**
- [ ] Resumen rápido (5 min lectura)
- [ ] Análisis estándar (15 min)
- [ ] Análisis profundo (30+ min)

**Mi objetivo al leer este paper:**
- [ ] Entender conceptos básicos
- [ ] Evaluar metodología
- [ ] Extraer datos para mi investigación
- [ ] Criticar para revisión
- [ ] Replicar el estudio

**Preguntas específicas:**
1. ________________
2. ________________

**RECORDATORIO:**
- Verificaré toda información en el paper original
- No citaré nada que la IA "invente"
- Usaré la IA solo para ENTENDER, no para ESCRIBIR
```

---

## Errores Comunes a Evitar

### La IA puede:

- [ ] **Inventar estadísticas:** "El estudio mostró p<0.001" (verificar en paper)
- [ ] **Atribuir mal los autores:** Confundir quién dijo qué
- [ ] **Simplificar en exceso:** Perder matices importantes
- [ ] **Malinterpretar metodología:** Confundir diseños de estudio
- [ ] **Ignorar limitaciones:** No mencionar debilidades importantes
- [ ] **Generalizar incorrectamente:** Extender conclusiones más allá de lo que dice el paper

### Siempre verificar:

1. **Cifras exactas** - Volver al paper original
2. **Citas textuales** - No usar parafraseo de IA como cita
3. **Nombres de autores** - Verificar en el paper
4. **Metodología específica** - La IA puede simplificar demasiado
5. **Conclusiones** - Leer las conclusiones originales

---

## Flujo de Trabajo Recomendado

```
1. LEER abstract y conclusiones (tú, 5 min)
         ↓
2. PEDIR resumen ejecutivo a IA (5 min)
         ↓
3. VERIFICAR que el resumen coincida (5 min)
         ↓
4. LEER secciones clave tú mismo (15-30 min)
         ↓
5. PEDIR explicación de lo que no entiendes (10 min)
         ↓
6. VERIFICAR explicaciones en el paper (5 min)
         ↓
7. EVALUAR críticamente con ayuda de IA (10 min)
         ↓
8. DOCUMENTAR en tus notas (5 min)
```

---

## Entregable

### Ficha de Lectura Completa

```markdown
# Ficha de Lectura

## Datos Bibliográficos
- **Título:**
- **Autores:**
- **Revista:**
- **Año:**
- **DOI:**

## Resumen (con mis palabras)
[3-5 oraciones]

## Pregunta de investigación
[En una oración]

## Metodología
- Diseño:
- Muestra:
- Instrumentos:
- Análisis:

## Resultados principales
1.
2.
3.

## Fortalezas
-

## Limitaciones
-

## Relevancia para mi investigación
[Cómo puedo usar este paper]

## Citas útiles (textuales del paper)
> "[Cita 1]" (p. X)
> "[Cita 2]" (p. X)

## Términos nuevos aprendidos
- [Término]: [Definición]

## Verificado en el paper original: ✓
```

---

## Criterios de Éxito

- [ ] Seleccionaste un paper real y relevante
- [ ] Generaste resumen ejecutivo con IA
- [ ] Verificaste el resumen contra el paper original
- [ ] Analizaste metodología y resultados
- [ ] Evaluaste críticamente el estudio
- [ ] Entendiste términos técnicos nuevos
- [ ] Documentaste todo en una ficha de lectura
- [ ] NO citaste nada que la IA inventó

---

## Próximo Paso

Aplica este proceso a:
1. Los 5-10 papers más importantes de tu tema
2. Crea una matriz de literatura
3. Identifica patrones y gaps en la investigación

---

*Ejercicio 1 - Investigación y Academia - FPUNA 2026*
