# Módulo 6: Presentaciones y Difusión Científica
## Comunicación Visual y Divulgación con IA

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Teórico-Práctico |
| **Prerrequisitos** | Módulos 1-5 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Crear presentaciones académicas efectivas con IA
2. Diseñar posters científicos profesionales
3. Preparar visualizaciones para conferencias
4. Usar redes sociales académicas estratégicamente
5. Comunicar ciencia a audiencias no especializadas

---

## Contenido

### 6.1 Presentaciones Académicas (30 min)

#### Estructura de Presentación Científica

```
┌─────────────────────────────────────────────────────────────┐
│  1. TÍTULO (1 slide)                                        │
│     - Título, autores, afiliación                           │
├─────────────────────────────────────────────────────────────┤
│  2. MOTIVACIÓN (1-2 slides)                                 │
│     - ¿Por qué importa? ¿Cuál es el problema?               │
├─────────────────────────────────────────────────────────────┤
│  3. CONTRIBUCIÓN (1 slide)                                  │
│     - ¿Qué aporta este trabajo?                             │
├─────────────────────────────────────────────────────────────┤
│  4. METODOLOGÍA (2-3 slides)                                │
│     - ¿Cómo lo hicimos?                                     │
├─────────────────────────────────────────────────────────────┤
│  5. RESULTADOS (3-5 slides)                                 │
│     - ¿Qué encontramos?                                     │
├─────────────────────────────────────────────────────────────┤
│  6. DISCUSIÓN (1-2 slides)                                  │
│     - ¿Qué significa? Limitaciones                          │
├─────────────────────────────────────────────────────────────┤
│  7. CONCLUSIONES (1 slide)                                  │
│     - Puntos clave, trabajo futuro                          │
├─────────────────────────────────────────────────────────────┤
│  8. AGRADECIMIENTOS/REFERENCIAS (1 slide)                   │
└─────────────────────────────────────────────────────────────┘

Total: 12-15 slides para presentación de 15 minutos
```

#### Prompt para Estructura de Presentación

```
Tengo una presentación de [X minutos] sobre mi investigación:

TÍTULO: [título del trabajo]
AUDIENCIA: [conferencia, defensa, seminario]
HALLAZGOS PRINCIPALES:
1. [Hallazgo 1]
2. [Hallazgo 2]
3. [Hallazgo 3]

Genera un outline de presentación con:
1. Estructura de slides (título y bullet points)
2. Tiempo sugerido por sección
3. Qué tipo de visual usar en cada slide
4. Puntos clave para enfatizar
5. Posibles preguntas de la audiencia
```

#### Principios de Diseño Visual

| Principio | Implementación |
|-----------|----------------|
| Simplicidad | Una idea por slide |
| Contraste | Texto oscuro en fondo claro |
| Consistencia | Mismo formato en todo |
| Jerarquía | Título > Subtítulo > Contenido |
| Visual primero | Gráfico > Tabla > Texto |

#### Herramientas para Presentaciones

| Herramienta | Uso | Integración IA |
|-------------|-----|----------------|
| PowerPoint | Estándar | Copilot Designer |
| Google Slides | Colaborativo | Extensiones IA |
| Keynote | Mac | Limitada |
| Canva | Diseño | Magic Design |
| Beamer (LaTeX) | Académico | Templates |

---

### 6.2 Posters Científicos (25 min)

#### Estructura de Poster

```
┌─────────────────────────────────────────────────────────────┐
│                          TÍTULO                              │
│                 Autores, Afiliación, Logos                   │
├────────────────────┬─────────────────┬─────────────────────┤
│                    │                 │                     │
│   INTRODUCCIÓN     │   RESULTADOS    │   CONCLUSIONES      │
│                    │                 │                     │
│   • Background     │   • Figuras     │   • Puntos clave    │
│   • Problema       │   • Tablas      │   • Implicaciones   │
│   • Objetivo       │   • Gráficos    │   • Futuro          │
│                    │                 │                     │
├────────────────────┼─────────────────┼─────────────────────┤
│                    │                 │                     │
│   MÉTODOS          │   (continúa)    │   REFERENCIAS       │
│                    │                 │                     │
│   • Diseño         │                 │   CONTACTO          │
│   • Datos          │                 │   QR Code           │
│   • Análisis       │                 │                     │
│                    │                 │                     │
└────────────────────┴─────────────────┴─────────────────────┘
```

#### Prompt para Contenido de Poster

```
Ayúdame a crear el contenido para un poster científico:

INVESTIGACIÓN: [describir estudio]
TAMAÑO: [A0, A1, etc.]
EVENTO: [conferencia]
TIEMPO DE PRESENTACIÓN: [minutos]

Para cada sección, genera:
1. Texto conciso (máximo 100 palabras por sección)
2. Sugerencias de visualización
3. Puntos bullet que capten atención
4. "Take-home message" principal

El poster debe ser legible a 1.5 metros de distancia.
```

#### Dimensiones y Especificaciones

| Tamaño | Dimensiones | Fuente mínima |
|--------|-------------|---------------|
| A0 | 841 × 1189 mm | 24 pt body |
| A1 | 594 × 841 mm | 20 pt body |
| Custom | Variable | Escalar |

#### Herramientas para Posters

- **Canva:** Templates gratuitos, fácil de usar
- **PowerPoint:** Control total, familiaridad
- **Inkscape:** Vectorial, gratuito
- **Adobe Illustrator:** Profesional

---

### 6.3 Visualizaciones para Conferencias (25 min)

#### Tipos de Visualizaciones Efectivas

| Tipo | Uso | Herramienta |
|------|-----|-------------|
| Barras + Error | Comparar grupos | matplotlib/seaborn |
| Líneas | Tendencias | matplotlib |
| Dispersión | Correlaciones | seaborn |
| Heatmaps | Matrices | seaborn/plotly |
| Diagramas de flujo | Procesos | draw.io, Mermaid |

#### Prompt para Visualizaciones

```
Necesito crear una visualización para una presentación:

DATOS: [describir datos]
MENSAJE: [qué quiero comunicar]
AUDIENCIA: [especializada/general]
FORMATO: [slide/poster/paper]

Genera:
1. Tipo de gráfico recomendado
2. Código Python para crearlo
3. Sugerencias de colores accesibles
4. Anotaciones clave a incluir
5. Alternativas de visualización
```

#### Código: Figura para Presentación

```python
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Configuración para presentaciones
plt.rcParams.update({
    'font.size': 14,
    'axes.labelsize': 16,
    'axes.titlesize': 18,
    'xtick.labelsize': 12,
    'ytick.labelsize': 12,
    'legend.fontsize': 12,
    'figure.dpi': 150,
    'figure.figsize': (10, 6)
})

# Datos de ejemplo
categories = ['Control', 'Tratamiento A', 'Tratamiento B']
means = [50, 65, 72]
errors = [5, 6, 4]

# Crear figura
fig, ax = plt.subplots()

# Colores accesibles (colorblind-friendly)
colors = ['#4477AA', '#EE6677', '#228833']

bars = ax.bar(categories, means, yerr=errors, capsize=10,
              color=colors, edgecolor='black', linewidth=1.5)

# Anotaciones
ax.axhline(y=50, color='gray', linestyle='--', alpha=0.5,
           label='Línea base')

# Valores sobre barras
for bar, mean in zip(bars, means):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 7,
            f'{mean}', ha='center', fontweight='bold')

# Etiquetas
ax.set_ylabel('Puntuación', fontweight='bold')
ax.set_title('Efecto del Tratamiento', fontweight='bold', pad=20)
ax.set_ylim(0, 100)

# Estilo limpio
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig('figura_presentacion.png', dpi=300, bbox_inches='tight',
            facecolor='white')
```

---

### 6.4 Redes Sociales Académicas (20 min)

#### Plataformas Clave

| Plataforma | Uso | Audiencia |
|------------|-----|-----------|
| ResearchGate | Papers, networking | Investigadores |
| Academia.edu | Papers, seguidores | Académicos |
| ORCID | Identificación única | Universal |
| Google Scholar | Citas, perfil | Universal |
| Twitter/X | Divulgación | Público general |
| LinkedIn | Profesional | Industria/Academia |

#### Prompt para Posts Académicos

```
Tengo un paper publicado:

TÍTULO: [título]
HALLAZGO PRINCIPAL: [resumen en 1-2 oraciones]
REVISTA: [nombre]
DOI: [enlace]

Genera:
1. Tweet (280 caracteres) con hashtags relevantes
2. Post de LinkedIn (300 palabras) más profesional
3. Resumen para ResearchGate (abstract simplificado)
4. Thread de Twitter (5 tweets) explicando la investigación
```

#### Ejemplo de Thread Académico

```
1/5 🧵 Nuevo paper publicado!

Encontramos que [hallazgo principal]. Aquí un resumen de nuestros resultados. 👇

2/5 📊 El problema:
[Explicar contexto en términos simples]

3/5 🔬 Lo que hicimos:
[Metodología simplificada]

4/5 💡 Resultados clave:
• [Resultado 1]
• [Resultado 2]
• [Resultado 3]

5/5 📖 Paper completo:
[DOI/Link]

Agradecimientos a [colaboradores/financiamiento]

#AcademicTwitter #Research #[Campo]
```

---

### 6.5 Divulgación Científica (20 min)

#### Adaptar Mensaje a Audiencia

| Audiencia | Nivel técnico | Enfoque |
|-----------|---------------|---------|
| Colegas | Alto | Metodología, datos |
| Estudiantes | Medio | Conceptos, aplicación |
| Público general | Bajo | Impacto, historias |
| Medios | Bajo | Titulares, analogías |

#### Prompt para Divulgación

```
Necesito explicar mi investigación a [tipo de audiencia]:

TEMA: [describir investigación]
HALLAZGO: [resultado principal]
NIVEL TÉCNICO DE AUDIENCIA: [alto/medio/bajo]
FORMATO: [blog/entrevista/video/infografía]

Genera:
1. Explicación adaptada al nivel
2. Analogías útiles
3. Preguntas frecuentes anticipadas
4. "Hook" para captar atención
5. Call-to-action apropiado
```

#### Técnicas de Storytelling Científico

```
ESTRUCTURA NARRATIVA:

1. GANCHO: "Imagina que..."
   - Pregunta provocadora
   - Estadística sorprendente
   - Escenario relatable

2. PROBLEMA: "El desafío es..."
   - ¿Por qué importa?
   - ¿A quién afecta?
   - ¿Qué no sabíamos?

3. VIAJE: "Nosotros investigamos..."
   - Proceso simplificado
   - Obstáculos superados
   - Momentos de descubrimiento

4. DESCUBRIMIENTO: "Encontramos que..."
   - Hallazgo en términos simples
   - Comparaciones tangibles
   - Visualización clara

5. IMPACTO: "Esto significa que..."
   - Aplicaciones prácticas
   - Beneficios concretos
   - Próximos pasos
```

---

## Proyecto Final del Módulo

### Preparar Presentación de Investigación

**Instrucciones:**

1. **Crear presentación (30 min)**
   - 10 slides sobre su investigación
   - Usar estructura recomendada
   - Incluir visualizaciones

2. **Diseñar mini-poster (15 min)**
   - Versión A4 de poster
   - Usar template de Canva

3. **Escribir thread académico (10 min)**
   - 5 tweets sobre su trabajo
   - Incluir hashtags

4. **Presentar (5 min por persona)**
   - Presentación oral
   - Feedback de compañeros

---

## Recursos Adicionales

### Templates

- [Template PowerPoint académico](../templates/presentation.pptx)
- [Template poster Canva](../templates/poster-template.md)
- [Template thread Twitter](../templates/twitter-thread.md)

### Herramientas

- Canva: https://canva.com
- Biorender: https://biorender.com (diagramas científicos)
- draw.io: https://draw.io (diagramas de flujo)
- Carbon: https://carbon.now.sh (código bonito)

### Lecturas

- "Presenting to Win" - Jerry Weissman
- "The Craft of Scientific Presentations" - Michael Alley

---

## Puntos Clave

1. **Menos es más:** Slides simples, mensaje claro
2. **Visual primero:** Gráficos antes que texto
3. **Adaptar audiencia:** Diferente nivel, diferente mensaje
4. **Presencia online:** Mantener perfiles actualizados
5. **IA como asistente:** Generar contenido, pero personalizar

---

*Este módulo concluye el curso de IA para Investigación Científica*
