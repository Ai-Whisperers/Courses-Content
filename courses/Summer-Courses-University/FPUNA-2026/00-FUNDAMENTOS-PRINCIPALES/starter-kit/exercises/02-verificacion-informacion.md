# Ejercicio 2: Verificación de Información

## Objetivo
Aprender a detectar cuando la IA da información incorrecta o inventada.

## Duración
30-40 minutos

## Materiales Necesarios
- Acceso a Claude u otro modelo de lenguaje
- Navegador web para verificar información
- Este documento

---

## Contexto Importante

Las IAs pueden "alucinar" - generar información que suena real pero es falsa.
Este ejercicio te enseña a detectar esto y verificar siempre.

---

## Parte 1: Detectando Alucinaciones (15 minutos)

### Instrucciones
Haz estas preguntas a la IA y VERIFICA cada respuesta en Google:

**Pregunta 1:**
```
¿Cuál es la población actual de Asunción, Paraguay?
```

**Verificación:**
- Busca en Google: "población Asunción Paraguay"
- Compara con la respuesta de la IA

| | Respuesta IA | Dato real (con fuente) |
|--|--------------|------------------------|
| Población | | |
| Año del dato | | |
| ¿Coincide? | | Sí / No / Aproximado |

**Pregunta 2:**
```
¿Quién fue el primer rector de la Universidad Nacional de Asunción?
```

**Verificación:**
- Busca en la web oficial de la UNA o Wikipedia
- Compara

| | Respuesta IA | Dato real |
|--|--------------|-----------|
| Nombre | | |
| Año | | |
| ¿Correcto? | | |

**Pregunta 3 (Trampa):**
```
¿Qué dijo el profesor Juan Martínez García de la UNA
sobre el uso de IA en educación en su artículo de 2023?
```

### Análisis de la trampa
Este profesor probablemente no existe (o si existe, no escribió ese artículo).

- ¿La IA admitió que no sabe?
- ¿Inventó una cita o artículo?
- ¿Qué te enseña esto sobre pedir referencias específicas?

---

## Parte 2: Verificación de Citas (15 minutos)

### Instrucciones
Pide a la IA que te dé referencias sobre un tema:

```
Dame 3 artículos científicos sobre el impacto de las
redes sociales en estudiantes universitarios.
Incluye autores, año y revista.
```

### Verificación
Para CADA referencia que te dio:

1. Copia el título exacto
2. Búscalo en Google Scholar
3. Completa:

**Referencia 1:**
| Campo | IA dijo | ¿Existe? |
|-------|---------|----------|
| Título | | Sí/No |
| Autores | | Correctos/Incorrectos |
| Año | | Correcto/Incorrecto |

**Referencia 2:**
| Campo | IA dijo | ¿Existe? |
|-------|---------|----------|
| Título | | |
| Autores | | |
| Año | | |

**Referencia 3:**
| Campo | IA dijo | ¿Existe? |
|-------|---------|----------|
| Título | | |
| Autores | | |
| Año | | |

### Resultado
- ¿Cuántas referencias eran reales? ___/3
- ¿Cuántas eran inventadas? ___/3

---

## Parte 3: Estrategia Segura (10 minutos)

### Instrucciones
Ahora usa la estrategia CORRECTA para pedir información académica:

```
Quiero aprender sobre el impacto de redes sociales en
estudiantes. NO me des referencias específicas porque
podrías inventarlas.

En lugar de eso:
1. Dame términos de búsqueda que yo pueda usar en Google Scholar
2. Dime qué autores son reconocidos en este tema para que los busque
3. Sugiere qué tipos de estudios debería buscar (meta-análisis, etc.)
```

### Compara
¿Es más útil esta respuesta que la anterior?
¿Por qué esta estrategia es más segura?

---

## Reglas de Oro Aprendidas

Completa estas reglas:

1. **Nunca asumir que la IA tiene razón sobre:**
   - [ ] Datos estadísticos específicos
   - [ ] Referencias bibliográficas
   - [ ] Información de actualidad
   - [ ] Datos sobre personas específicas

2. **Siempre verificar en fuentes primarias:**
   - [ ] Sitios oficiales (.gov, .edu)
   - [ ] Google Scholar para artículos
   - [ ] Wikipedia como punto de partida (no como fuente final)

3. **Preguntar de forma segura:**
   - [ ] Pedir términos de búsqueda, no referencias completas
   - [ ] Pedir explicaciones, no datos específicos
   - [ ] Admitir desde el prompt que la IA puede no saber

---

## Entregable

### Tu "Detector de Alucinaciones Personal"

Escribe 3 señales de alerta que aprendiste para detectar cuando la IA
puede estar inventando:

1. _________________________________
2. _________________________________
3. _________________________________

---

## Criterios de Éxito

- [ ] Verificaste al menos 3 datos en fuentes externas
- [ ] Identificaste al menos 1 información incorrecta de la IA
- [ ] Aprendiste la estrategia segura para pedir referencias
- [ ] Creaste tu lista personal de señales de alerta

---

*Ejercicio 2 - Fundamentos de IA - FPUNA 2026*
