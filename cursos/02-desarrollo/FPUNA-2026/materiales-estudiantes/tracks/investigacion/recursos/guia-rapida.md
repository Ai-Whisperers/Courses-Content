# 📚 Guía Rápida - Investigación y Academia

## FPUNA Verano 2026

---

## Estructura de Paper Científico (IMRaD)

### Secciones Principales
```
1. Title
2. Abstract (150-300 palabras)
3. Keywords (5-7)
4. Introduction
   - Contexto del problema
   - Gap en la literatura
   - Objetivos/hipótesis
5. Methodology
   - Diseño del estudio
   - Participantes/muestra
   - Instrumentos
   - Procedimiento
   - Análisis de datos
6. Results
   - Hallazgos sin interpretación
   - Tablas y figuras
7. Discussion
   - Interpretación de resultados
   - Comparación con literatura
   - Limitaciones
   - Implicaciones
8. Conclusion
9. References
```

---

## Tipos de Revisión de Literatura

| Tipo | Objetivo | Metodología |
|------|----------|-------------|
| **Narrativa** | Resumir campo | Cualitativa, flexible |
| **Sistemática** | Responder pregunta específica | PRISMA, exhaustiva |
| **Meta-análisis** | Combinar resultados | Estadística, cuantitativa |
| **Scoping** | Mapear área | Amplia, exploratoria |

### PRISMA Flow Diagram
```
Identificación
    │
    ▼
Records identificados (n=X)
    │
    ▼
Duplicados removidos (n=X)
    │
    ▼
Screening
    │
    ▼
Records screened (n=X)
    ├── Excluidos (n=X)
    ▼
Full-text assessed (n=X)
    ├── Excluidos con razón (n=X)
    ▼
Incluidos en síntesis (n=X)
```

---

## Operadores de Búsqueda

### Booleanos
| Operador | Función | Ejemplo |
|----------|---------|---------|
| AND | Ambos términos | "machine learning" AND "healthcare" |
| OR | Cualquier término | "AI" OR "artificial intelligence" |
| NOT | Excluir término | "python" NOT "snake" |
| " " | Frase exacta | "deep learning" |
| * | Wildcard | comput* (computer, computing...) |
| ( ) | Agrupar | (AI OR ML) AND healthcare |

### Por Base de Datos
- **Google Scholar:** intitle:, author:, source:
- **PubMed:** [MeSH], [tiab], [au]
- **Scopus:** TITLE-ABS-KEY(), AUTH()

---

## Métricas Académicas

### Impacto de Revistas
| Métrica | Descripción | Consideraciones |
|---------|-------------|-----------------|
| Impact Factor | Citas promedio 2 años | Solo Clarivate |
| CiteScore | Citas promedio 4 años | Scopus |
| SJR | Prestigio ponderado | Scopus |
| H-index revista | h papers con h citas | Varía por campo |

### Impacto de Investigador
| Métrica | Fórmula | Interpretación |
|---------|---------|----------------|
| H-index | h papers con ≥h citas | Productividad + impacto |
| i10-index | Papers con ≥10 citas | Google Scholar |
| Citations | Total de citas | Impacto bruto |

---

## Estadística Básica

### Descriptiva
```
Media (x̄) = Σx / n
Mediana = valor central
Moda = valor más frecuente
Desv. Est. (σ) = √[Σ(x-x̄)² / n]
```

### Pruebas Comunes
| Prueba | Uso | Condiciones |
|--------|-----|-------------|
| t-test | Comparar 2 medias | Normal, independiente |
| ANOVA | Comparar >2 medias | Normal, homogeneidad |
| Chi-cuadrado | Asociación categóricas | Frecuencias esperadas >5 |
| Pearson r | Correlación | Lineal, normal |
| Spearman ρ | Correlación | Ordinal, no lineal |

### P-value Interpretación
```
p < 0.001  → Muy significativo (***)
p < 0.01   → Muy significativo (**)
p < 0.05   → Significativo (*)
p ≥ 0.05   → No significativo (ns)
```

### Tamaño de Efecto
| Medida | Pequeño | Mediano | Grande |
|--------|---------|---------|--------|
| Cohen's d | 0.2 | 0.5 | 0.8 |
| r | 0.1 | 0.3 | 0.5 |
| η² | 0.01 | 0.06 | 0.14 |

---

## Citas y Referencias

### Estilos Comunes
| Estilo | Campo | Ejemplo en texto |
|--------|-------|------------------|
| APA 7 | Ciencias sociales | (Smith, 2023) |
| IEEE | Ingeniería | [1] |
| Vancouver | Medicina | (1) o superscript¹ |
| Chicago | Humanidades | Footnotes |
| Harvard | General | (Smith 2023) |

### APA 7 - Ejemplos Rápidos

**Artículo de revista:**
```
Autor, A. A., & Autor, B. B. (Año). Título del artículo.
Nombre de la Revista, volumen(número), páginas.
https://doi.org/xxxxx
```

**Libro:**
```
Autor, A. A. (Año). Título del libro (Edición). Editorial.
```

**Capítulo de libro:**
```
Autor, A. A. (Año). Título del capítulo. En E. Editor (Ed.),
Título del libro (pp. xx-xx). Editorial.
```

**Página web:**
```
Autor o Organización. (Año, Mes Día). Título de la página.
Nombre del sitio. URL
```

---

## LaTeX Esencial

### Estructura Básica
```latex
\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage[spanish]{babel}

\title{Título del Paper}
\author{Nombre del Autor}
\date{\today}

\begin{document}
\maketitle
\begin{abstract}
Resumen aquí.
\end{abstract}

\section{Introducción}
Texto...

\section{Metodología}
Texto...

\end{document}
```

### Comandos Frecuentes
```latex
% Secciones
\section{Título}
\subsection{Subtítulo}
\subsubsection{Sub-subtítulo}

% Formato
\textbf{negrita}
\textit{itálica}
\underline{subrayado}

% Listas
\begin{itemize}
  \item Item 1
  \item Item 2
\end{itemize}

\begin{enumerate}
  \item Primero
  \item Segundo
\end{enumerate}

% Ecuaciones
$E = mc^2$ % inline
$$E = mc^2$$ % display

% Figuras
\begin{figure}[h]
  \centering
  \includegraphics[width=0.8\textwidth]{imagen.png}
  \caption{Descripción}
  \label{fig:etiqueta}
\end{figure}

% Tablas
\begin{table}[h]
  \centering
  \begin{tabular}{|c|c|c|}
    \hline
    Col1 & Col2 & Col3 \\
    \hline
    A & B & C \\
    \hline
  \end{tabular}
  \caption{Descripción}
  \label{tab:etiqueta}
\end{table}

% Referencias
\cite{autor2023}
Ver Figura \ref{fig:etiqueta}
```

---

## Zotero Atajos

| Atajo | Función |
|-------|---------|
| Ctrl+Shift+S | Guardar a Zotero (browser) |
| Ctrl+Alt+A | Insertar cita (Word) |
| Ctrl+Alt+B | Insertar bibliografía |
| Ctrl+Shift+E | Editar cita |

---

## Python para Análisis

### Bibliotecas Esenciales
```python
import pandas as pd        # Datos tabulares
import numpy as np         # Matemáticas
import matplotlib.pyplot as plt  # Gráficos
import seaborn as sns      # Gráficos estadísticos
from scipy import stats    # Pruebas estadísticas
import statsmodels.api as sm  # Modelos estadísticos
```

### Análisis Básico
```python
# Cargar datos
df = pd.read_csv('datos.csv')

# Descriptivas
df.describe()
df['variable'].mean()
df['variable'].std()

# Correlación
df.corr()

# T-test
stats.ttest_ind(grupo1, grupo2)

# ANOVA
stats.f_oneway(g1, g2, g3)

# Chi-cuadrado
stats.chi2_contingency(tabla)
```

---

## Checklist de Paper

### Antes de Enviar
- [ ] Abstract completo y autónomo
- [ ] Keywords relevantes
- [ ] Introducción termina con objetivos claros
- [ ] Metodología replicable
- [ ] Resultados con estadísticas completas
- [ ] Discusión conecta con literatura
- [ ] Limitaciones mencionadas
- [ ] Referencias en formato correcto
- [ ] Figuras/tablas con captions
- [ ] Verificado por co-autores
- [ ] Guidelines de la revista seguidas
- [ ] Conflictos de interés declarados

---

## Ética en Investigación

### Principios (Belmont Report)
1. **Respeto a las personas:** Consentimiento informado
2. **Beneficencia:** Maximizar beneficios, minimizar daños
3. **Justicia:** Distribución equitativa

### Evitar
- Plagio (incluso autoplagio)
- Fabricación de datos
- Falsificación de resultados
- Publicación duplicada
- Authorship inapropiado
- Conflictos de interés no declarados

---

*Guía Rápida - Track 05 - FPUNA 2026*
