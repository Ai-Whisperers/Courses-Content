# Guía de Ética en el Uso de IA para Investigación
## Principios, Políticas y Mejores Prácticas

---

## 1. Principios Éticos Fundamentales

### 1.1 Transparencia

**Definición:** Declarar abiertamente el uso de herramientas de IA en la investigación.

**Implementación:**
- ✅ Incluir declaración de uso de IA en métodos o agradecimientos
- ✅ Especificar qué herramientas se utilizaron
- ✅ Describir para qué propósito se usó cada herramienta
- ✅ Documentar prompts importantes utilizados (en suplementos si necesario)

**Ejemplo de declaración:**
```
"En la preparación de este manuscrito, se utilizó Claude (Anthropic)
para asistir en la revisión de estilo y claridad de la redacción.
Todas las ideas, análisis e interpretaciones son responsabilidad
exclusiva de los autores."
```

### 1.2 Responsabilidad

**Definición:** Los autores son responsables de todo el contenido, independientemente de si fue asistido por IA.

**Implementación:**
- ✅ Verificar TODA información generada por IA
- ✅ Editar y personalizar contenido de IA
- ✅ Asumir responsabilidad por errores
- ✅ No delegar decisiones críticas a IA

**Áreas de responsabilidad:**
| Área | Responsable |
|------|-------------|
| Diseño del estudio | Investigador |
| Análisis de datos | Investigador (verificar código de IA) |
| Interpretación | Investigador |
| Conclusiones | Investigador |
| Verificación de hechos | Investigador |

### 1.3 Integridad

**Definición:** Mantener honestidad y originalidad en la investigación.

**Implementación:**
- ✅ No presentar texto de IA como completamente propio sin edición
- ✅ Evitar fabricación de datos o referencias
- ✅ Mantener originalidad en ideas y contribuciones
- ✅ Citar fuentes primarias, no atribuir a IA

---

## 2. Políticas de Revistas Principales

### 2.1 Nature Portfolio

> "Los autores que usen herramientas de IA deben documentar su uso
> en la sección de métodos o agradecimientos. Los LLMs no pueden
> ser listados como autores."

**Requisitos:**
- Declarar uso en métodos/agradecimientos
- IA no puede ser autor
- Autores responsables del contenido

### 2.2 Science

> "El uso de IA para generar texto debe ser declarado.
> Los autores retienen responsabilidad completa."

**Requisitos:**
- Declaración obligatoria
- Responsabilidad de autores

### 2.3 Elsevier

> "Se requiere transparencia sobre el uso de tecnologías de IA
> en la preparación del manuscrito."

**Requisitos:**
- Declaración en sección apropiada
- Especificar herramientas usadas

### 2.4 Springer Nature

> "El uso de herramientas de IA generativa debe declararse
> en la sección de métodos."

**Requisitos:**
- Declaración en métodos
- Describir uso específico

### 2.5 IEEE

> "Las herramientas de IA pueden usarse como asistentes,
> pero no pueden ser autores."

**Requisitos:**
- IA como herramienta, no autor
- Declaración de uso

---

## 3. Lo que SÍ Está Permitido

### 3.1 Usos Aceptables de IA

| Uso | Descripción | Consideración |
|-----|-------------|---------------|
| Mejora de redacción | Claridad, gramática, estilo | Verificar que mantenga significado |
| Generación de código | Scripts de análisis | Verificar que funcione correctamente |
| Búsqueda bibliográfica | Identificar literatura | Verificar que papers existan |
| Análisis de documentos | Resumir papers | Verificar precisión |
| Traducción | De/a inglés | Revisar terminología técnica |
| Brainstorming | Generar ideas | Desarrollar y verificar |
| Formateo | Referencias, tablas | Verificar formato correcto |

### 3.2 Ejemplos de Buen Uso

**Ejemplo 1: Mejora de redacción**
```
ANTES: "Los resultados mostraron que había una diferencia significativa."

PROMPT: "Mejora este párrafo para mayor claridad y precisión académica."

DESPUÉS: "Los resultados revelaron una diferencia estadísticamente
significativa entre grupos (p < 0.05, d = 0.8)."

ACCIÓN: Verificar que los datos sean correctos, editar según voz del autor.
```

**Ejemplo 2: Generación de código**
```
PROMPT: "Genera código para t-test independiente con Cohen's d."

CÓDIGO GENERADO: [código de IA]

ACCIÓN:
1. Revisar lógica del código
2. Ejecutar con datos de prueba
3. Verificar resultados manualmente
4. Documentar uso en paper
```

---

## 4. Lo que NO Está Permitido

### 4.1 Prohibiciones Absolutas

| Acción Prohibida | Por qué |
|------------------|---------|
| Fabricar datos | Fraude científico |
| Fabricar referencias | Las citas deben ser reales |
| Listar IA como autor | IA no puede asumir responsabilidad |
| Ocultar uso de IA | Viola transparencia |
| Copiar texto sin edición | Falta de originalidad |
| Usar para generar resultados falsos | Fraude científico |

### 4.2 Zonas Grises - Precaución

| Situación | Recomendación |
|-----------|---------------|
| Generar hipótesis | Aceptable si se desarrollan y justifican |
| Sugerir metodología | Verificar con expertos, citar metodología |
| Interpretar resultados | Solo como punto de partida, desarrollar independientemente |
| Escribir discusión | Usar como borrador, reescribir sustancialmente |

---

## 5. Flujo de Trabajo Ético

### 5.1 Proceso Recomendado

```
┌─────────────────────────────────────────────────────────────┐
│                     1. GENERAR                               │
│        Usar IA para obtener borrador/sugerencia              │
├─────────────────────────────────────────────────────────────┤
│                     2. VERIFICAR                             │
│        Comprobar precisión, buscar fuentes                   │
├─────────────────────────────────────────────────────────────┤
│                     3. EDITAR                                │
│        Modificar según voz propia, agregar contenido         │
├─────────────────────────────────────────────────────────────┤
│                     4. INTEGRAR                              │
│        Combinar con trabajo propio                           │
├─────────────────────────────────────────────────────────────┤
│                     5. DOCUMENTAR                            │
│        Registrar uso de IA para declaración                  │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Checklist de Uso Ético

**Antes de usar IA:**
- [ ] ¿Es apropiado usar IA para esta tarea?
- [ ] ¿La revista permite este uso?
- [ ] ¿Cómo documentaré el uso?

**Durante el uso:**
- [ ] ¿Estoy verificando la información?
- [ ] ¿Estoy editando sustancialmente?
- [ ] ¿Mantengo mi voz y perspectiva?

**Después del uso:**
- [ ] ¿He verificado toda la información?
- [ ] ¿He citado fuentes primarias?
- [ ] ¿He documentado el uso de IA?
- [ ] ¿Puedo defender este contenido como mío?

---

## 6. Casos Especiales

### 6.1 Revisión por Pares

**Si eres revisor:**
- ⚠️ NO subir manuscritos a herramientas de IA públicas
- ⚠️ Confidencialidad del manuscrito es primordial
- ✅ Consultar política de la revista

**Si usaste IA en tu manuscrito:**
- ✅ Declarar uso antes de revisión
- ✅ Responder honestamente a preguntas de revisores

### 6.2 Datos Sensibles

- ❌ No ingresar datos de participantes a IA
- ❌ No compartir información identificable
- ❌ No usar IA con datos clínicos/personales
- ✅ Usar datos anonimizados si es necesario

### 6.3 Propiedad Intelectual

- El contenido generado por IA puede tener restricciones
- Verificar términos de servicio de cada herramienta
- Considerar implicaciones de copyright

---

## 7. Modelo de Declaración

### 7.1 Declaración Breve

```
AI Disclosure: [Herramienta] was used to assist with [propósito].
All content was reviewed and edited by the authors, who assume
full responsibility for the manuscript.
```

### 7.2 Declaración Detallada

```
Artificial Intelligence Disclosure

The following AI tools were used in preparing this manuscript:

1. Claude (Anthropic): Used to improve clarity and readability
   of the Introduction and Discussion sections.

2. GitHub Copilot: Used to assist in generating Python code
   for statistical analysis.

3. Semantic Scholar: Used to identify relevant literature
   during the review process.

All AI-generated content was critically reviewed, edited, and
verified by the authors. The authors assume full responsibility
for the accuracy and integrity of all content, including any
content that was generated with AI assistance.

All references were verified in their original sources. No data
or results were generated by AI tools.
```

---

## 8. Recursos Adicionales

### Enlaces a Políticas

- [Nature AI Policy](https://www.nature.com/nature-portfolio/editorial-policies)
- [Science AI Guidelines](https://www.science.org/content/page/science-journals-editorial-policies)
- [Elsevier AI Policy](https://www.elsevier.com/about/policies/publishing-ethics)
- [COPE Guidelines](https://publicationethics.org/)

### Lecturas Recomendadas

1. "ChatGPT listed as author on research papers" - Nature News
2. "Best practices for AI in research" - Science Editorial
3. "AI and academic integrity" - COPE Discussion Document

---

## 9. Actualización de Políticas

⚠️ **Las políticas sobre IA evolucionan rápidamente.**

**Recomendaciones:**
1. Verificar políticas de revista ANTES de enviar
2. Consultar versiones más recientes de guidelines
3. Preguntar a editores en caso de duda
4. Errar hacia mayor transparencia

---

*Última actualización: Diciembre 2024*
*Revisar políticas de revistas específicas antes de envío*
