# 🎬 Módulo 05: Proyecto en Vivo (Demo 1-Shot)

## De Idea a App Funcional en 90 Minutos

> **Para Todos**: Este es el módulo MÁS emocionante - verás al instructor crear una aplicación completa DESDE CERO usando OpenCode, aplicando TODO lo que aprendiste. No es teoría - es ver la magia suceder en tiempo real. Es como ver a un chef cocinar un plato complejo paso a paso.

**⏱️ Duración**: 1.5 horas  
**👤 Nivel**: Todos (observación activa)  
**🎯 Objetivo**: Ver workflow completo de desarrollo con IA en acción

---

## 🎓 ¿Qué Vas a Ver?

En esta sesión, el instructor creará:

1. ✅ **App completa y funcional** - De cero a producción
2. ✅ **Aplicación de conceptos** - Módulos 01-04 en práctica
3. ✅ **Workflow real** - Cómo trabaja un profesional con IA
4. ✅ **Debugging en vivo** - Cómo resolver problemas cuando surgen
5. ✅ **Best practices** - Qué hacer (y qué NO hacer)

---

## 🤔 ¿Por Qué Este Módulo es Importante?

### Analogía: Aprender a Cocinar

```mermaid
graph LR
    A[Leer recetas<br/>Módulos 1-4] --> B[Ver a chef<br/>cocinar<br/>Módulo 5]
    B --> C[Cocinar tú mismo<br/>Proyectos propios]
    
    A -.No es suficiente.-> D[No sabes cómo<br/>empezar]
    B --> E[Entiendes el<br/>proceso completo]
    E --> C
    
    style D fill:#FFB6C1
    style E fill:#90EE90
```

**Una cosa es leer sobre desarrollo con IA, otra es VERLO en acción.**

---

## 🎯 El Proyecto: Gestor de Gastos Personales

### ¿Qué Vamos a Construir?

Una aplicación web para que estudiantes de FPUNA gestionen sus gastos mensuales.

```mermaid
mindmap
  root((Gestor de<br/>Gastos))
    Agregar Gastos
      Monto en Guaraníes
      Categoría
      Descripción
      Fecha automática
    Visualizar
      Lista completa
      Filtrar por categoría
      Tabla ordenable
    Análisis
      Total por categoría
      Gráfico de barras
      Resumen mensual
    Persistencia
      LocalStorage
      No requiere servidor
      Funciona offline
```

### Features Completas

| Categoría | Features |
|-----------|----------|
| **Gestión** | Agregar, editar, eliminar gastos |
| **Filtros** | Por categoría, por rango de fechas |
| **Visualización** | Tabla responsive, gráfico simple |
| **Cálculos** | Total general, total por categoría |
| **Experiencia** | Validación de inputs, feedback visual, dark mode |
| **Persistencia** | LocalStorage, export a CSV |

---

## 📊 Workflow Completo

```mermaid
flowchart TD
    Start[💡 Idea:<br/>App de Gastos] --> Plan[📋 Planificación<br/>5 min]
    Plan --> Setup[⚙️ Setup Proyecto<br/>5 min]
    Setup --> Context[📝 Archivos de Contexto<br/>5 min]
    Context --> Gen1[🎨 Generar HTML<br/>10 min]
    Gen1 --> Gen2[⚙️ Generar JavaScript<br/>15 min]
    Gen2 --> Gen3[💅 Generar CSS<br/>10 min]
    Gen3 --> Test[🧪 Probar App<br/>10 min]
    Test --> Debug{¿Bugs?}
    Debug -->|Sí| Fix[🔧 Corregir<br/>10 min]
    Debug -->|No| Improve[✨ Mejoras<br/>15 min]
    Fix --> Test
    Improve --> Doc[📚 Documentación<br/>5 min]
    Doc --> Final[🎉 App Completa]
    
    style Start fill:#e1f5ff
    style Final fill:#90EE90
```

---

## 🚀 Parte 1: Setup del Proyecto (5 min)

### Paso a Paso que Verás

```mermaid
sequenceDiagram
    participant I as 👨‍🏫 Instructor
    participant T as 💻 Terminal
    participant VS as 📝 VS Code
    
    I->>T: mkdir gestor-gastos-fpuna
    I->>T: cd gestor-gastos-fpuna
    I->>T: npm init -y
    Note over I,T: Proyecto Node inicializado
    
    I->>T: mkdir src tests docs
    I->>VS: code .
    Note over I,VS: VS Code abierto
    
    I->>VS: Crear estructura de carpetas
    Note over VS: src/{components,utils,styles}<br/>tests/<br/>docs/
```

### Estructura que se Creará

```
gestor-gastos-fpuna/
├── .opencode              # Configuración del proyecto
├── CLAUDE.md              # Memoria del proyecto
├── package.json
├── README.md
├── src/
│   ├── index.html         # Estructura de la página
│   ├── app.js             # Lógica principal
│   ├── components/
│   │   ├── GestorGastos.js   # Clase principal
│   │   └── Gasto.js           # Modelo de datos
│   ├── utils/
│   │   ├── storage.js         # LocalStorage helper
│   │   └── formato.js         # Formateo de montos
│   └── styles/
│       └── main.css           # Estilos
├── tests/
│   └── GestorGastos.test.js
└── docs/
    └── screenshots/
```

---

## 📝 Parte 2: Archivos de Contexto (5 min)

### `.opencode` - Lo que el Instructor Escribirá

```yaml
# .opencode
# Proyecto: Gestor de Gastos - FPUNA Verano 2026

project:
  name: Gestor de Gastos Personal
  description: Aplicación web para tracking de gastos estudiantiles
  institution: FPUNA
  instructor: [Nombre del Profesor]
  demo_date: 2026-01-15

╔═══════════════════════════════════════════════════════════╗
║ STACK TECNOLÓGICO                                         ║
╚═══════════════════════════════════════════════════════════╝

tech_stack:
  frontend: HTML5 + CSS3 + JavaScript ES6+ (Vanilla, sin frameworks)
  storage: LocalStorage API
  charts: Canvas API nativo (sin Chart.js)
  bundler: Ninguno (desarrollo simple)

╔═══════════════════════════════════════════════════════════╗
║ PREFERENCIAS                                              ║
╚═══════════════════════════════════════════════════════════╝

preferences:
  language: es-PY               # Español paraguayo
  currency: Guaraníes (₲)
  date_format: DD/MM/YYYY
  number_format: 1.500.000      # Separador de miles

╔═══════════════════════════════════════════════════════════╗
║ CONVENCIONES DE CÓDIGO                                    ║
╚═══════════════════════════════════════════════════════════╝

conventions:
  naming:
    - Variables y funciones en español cuando sea contextual
    - camelCase para variables (ej: montoTotal)
    - PascalCase para clases (ej: GestorGastos)
  
  documentation:
    - JSDoc en español
    - Comentarios explicativos
    - Ejemplos de uso
  
  code_style:
    - Funciones pequeñas (max 30 líneas)
    - Validación de todos los inputs
    - Mensajes de error descriptivos
    - Feedback visual en todas las acciones

╔═══════════════════════════════════════════════════════════╗
║ CATEGORÍAS DE GASTOS                                      ║
╚═══════════════════════════════════════════════════════════╝

categories:
  - Alimentación
  - Transporte
  - Educación (libros, materiales)
  - Entretenimiento
  - Salud
  - Tecnología
  - Otros
```

### `CLAUDE.md` - Memoria del Proyecto

```markdown
# 💰 Gestor de Gastos Personal - FPUNA

> Demo en vivo del Módulo 05
> Instructor: [Nombre]
> Fecha: 15 Enero 2026

╔═══════════════════════════════════════════════════════════╗
║ DESCRIPCIÓN DEL PROYECTO                                  ║
╚═══════════════════════════════════════════════════════════╝

## Objetivo

Crear una aplicación web simple pero funcional que permita a 
estudiantes de FPUNA registrar y analizar sus gastos mensuales.

## Contexto

Muchos estudiantes de FPUNA trabajan part-time y necesitan gestionar
su dinero cuidadosamente. Esta app les ayuda a:
- Saber en qué gastan su dinero
- Identificar áreas donde pueden ahorrar
- Planificar mejor su presupuesto mensual

╔═══════════════════════════════════════════════════════════╗
║ MODELO DE DATOS                                           ║
╚═══════════════════════════════════════════════════════════╝

## Gasto (Expense)

```javascript
{
  id: String,              // UUID generado automáticamente
  fecha: Date,             // Fecha del gasto
  categoria: String,       // Una de las categorías definidas
  descripcion: String,     // Descripción corta (max 100 caracteres)
  monto: Number,           // En guaraníes, números enteros
  createdAt: Timestamp     // Para ordenar
}
```

╔═══════════════════════════════════════════════════════════╗
║ FUNCIONALIDADES CORE                                      ║
╚═══════════════════════════════════════════════════════════╝

1. **Agregar Gasto**
   - Formulario con validación
   - Monto en guaraníes (solo números)
   - Categoría (select obligatorio)
   - Descripción (textarea opcional)
   - Fecha pre-llenada (hoy) pero editable

2. **Listar Gastos**
   - Tabla responsive
   - Ordenar por fecha (más reciente primero)
   - Mostrar monto formateado (₲1.500.000)
   - Botón eliminar por fila

3. **Filtrar**
   - Por categoría (dropdown)
   - Por rango de fechas (futuro)

4. **Análisis**
   - Total general
   - Total por cada categoría
   - Gráfico de barras simple (Canvas API)
   - Porcentaje por categoría

5. **Persistencia**
   - Guardar en LocalStorage
   - Cargar al abrir la página
   - Export a CSV

╔═══════════════════════════════════════════════════════════╗
║ REGLAS DE VALIDACIÓN                                      ║
╚═══════════════════════════════════════════════════════════╝

- Monto debe ser > 0
- Monto debe ser número válido
- Categoría debe estar seleccionada (no "Seleccione...")
- Descripción es opcional pero max 100 caracteres
- Fecha no puede ser futura

╔═══════════════════════════════════════════════════════════╗
║ UX/UI REQUERIMIENTOS                                      ║
╚═══════════════════════════════════════════════════════════╝

- **Responsive**: Mobile-first, funciona en celular y desktop
- **Accesible**: Labels claros, colores contrastados
- **Feedback**: Mensajes de éxito/error visibles
- **Smooth**: Animaciones sutiles (300ms transitions)
- **Clean**: Diseño minimalista, no sobrecargado

╔═══════════════════════════════════════════════════════════╗
║ COLORES FPUNA                                             ║
╚═══════════════════════════════════════════════════════════╝

Primary: #003D7A   (Azul FPUNA)
Secondary: #FFFFFF (Blanco)
Accent: #FFD700    (Dorado)
Success: #28A745
Error: #DC3545
Warning: #FFC107

╔═══════════════════════════════════════════════════════════╗
║ NOTAS PARA OPENCODE                                       ║
╚═══════════════════════════════════════════════════════════╝

- No usar frameworks (vanilla JS solo)
- No usar jQuery
- Usar APIs modernas del navegador
- Código debe funcionar en Chrome/Firefox/Safari últimas versiones
- Priorizar legibilidad sobre optimización prematura
- Incluir comentarios explicativos
```

---

## 🎨 Parte 3: Generación de Código (40 min)

### 3.1 HTML Structure (10 min)

**Prompt que usará el instructor**:

```bash
claude "Crea index.html para gestor de gastos con estructura semántica HTML5:

╔═══════════════════════════════════════════════════════════╗
║ HEADER                                                    ║
╚═══════════════════════════════════════════════════════════╝
- Logo FPUNA (placeholder)
- Título: 'Gestor de Gastos Personal'
- Subtítulo: 'Controla tus finanzas - FPUNA 2026'
- Toggle dark mode

╔═══════════════════════════════════════════════════════════╗
║ SECCIÓN: AGREGAR GASTO                                    ║
╚═══════════════════════════════════════════════════════════╝
Form con:
- Input monto (type=number, placeholder='₲ Monto')
- Select categoría (Alimentación, Transporte, etc.)
- Textarea descripción (opcional)
- Input fecha (type=date, valor=hoy)
- Botón 'Agregar Gasto' (primary style)

╔═══════════════════════════════════════════════════════════╗
║ SECCIÓN: FILTROS                                          ║
╚═══════════════════════════════════════════════════════════╝
- Select filtro por categoría ('Todas' + categorías)
- Botón 'Limpiar Filtros'
- Contador: 'Mostrando X gastos'

╔═══════════════════════════════════════════════════════════╗
║ SECCIÓN: LISTA DE GASTOS                                  ║
╚═══════════════════════════════════════════════════════════╝
Table responsive:
- Columnas: Fecha | Categoría | Descripción | Monto | Acción
- tbody id='lista-gastos' (será poblado con JS)
- Mensaje cuando está vacío

╔═══════════════════════════════════════════════════════════╗
║ SECCIÓN: RESUMEN                                          ║
╚═══════════════════════════════════════════════════════════╝
Cards con:
- Total General (grande, destacado)
- Grid de cards: Total por cada categoría
- Mini gráfico de barras (canvas)

╔═══════════════════════════════════════════════════════════╗
║ FOOTER                                                    ║
╚═══════════════════════════════════════════════════════════╝
- 'FPUNA Verano 2026'
- Botones: Export CSV, Limpiar Todos los Datos

IMPORTANTE:
- Usar IDs y clases semánticas
- Incluir meta tags responsive
- Enlazar app.js y main.css
- Accesibilidad (aria-labels)"
```

```mermaid
sequenceDiagram
    participant I as 👨‍🏫 Instructor
    participant OC as 🤖 OpenCode
    participant File as 📄 index.html
    
    I->>OC: Envía prompt detallado
    Note over OC: Genera HTML<br/>semántico completo
    OC->>File: Crea archivo
    I->>File: Abre en navegador
    Note over I,File: Verifica estructura
    I->>OC: "Agrega meta tags OG"
    OC->>File: Actualiza
```

### 3.2 JavaScript Logic (15 min)

**Prompt completo**:

```bash
claude "Crea app.js con arquitectura modular:

╔═══════════════════════════════════════════════════════════╗
║ CLASE: Gasto                                              ║
╚═══════════════════════════════════════════════════════════╝
class Gasto {
  constructor(monto, categoria, descripcion, fecha)
  - Generar ID único (crypto.randomUUID())
  - Validar todos los inputs
  - Almacenar createdAt
  
  métodos:
  - toJSON() - Para LocalStorage
  - static fromJSON(obj) - Deserializar
}

╔═══════════════════════════════════════════════════════════╗
║ CLASE: GestorGastos                                       ║
╚═══════════════════════════════════════════════════════════╝
class GestorGastos {
  constructor()
  - Cargar gastos desde LocalStorage
  
  métodos:
  - agregarGasto(gasto) → void
  - eliminarGasto(id) → void
  - obtenerGastos(filtroCategoria?) → Gasto[]
  - calcularTotalGeneral() → number
  - calcularTotalPorCategoria() → Object
  - exportarCSV() → void
  - limpiarTodo() → void
  - _guardarEnStorage() → void (privado)
}

╔═══════════════════════════════════════════════════════════╗
║ UTILIDADES                                                ║
╚═══════════════════════════════════════════════════════════╝
- formatearMonto(numero) → string  // ₲1.500.000
- validarMonto(valor) → boolean
- obtenerFechaHoy() → string  // DD/MM/YYYY
- mostrarMensaje(texto, tipo) → void  // Toast notification

╔═══════════════════════════════════════════════════════════╗
║ EVENT LISTENERS                                           ║
╚═══════════════════════════════════════════════════════════╝
DOMContentLoaded:
  - Inicializar GestorGastos
  - Cargar gastos existentes
  - Renderizar lista y resumen
  
Form submit:
  - Prevenir default
  - Validar inputs
  - Crear gasto
  - Agregar al gestor
  - Renderizar actualizado
  - Limpiar form
  
Botón eliminar:
  - Confirmar con usuario
  - Eliminar del gestor
  - Re-renderizar
  
Select filtro:
  - Obtener gastos filtrados
  - Re-renderizar lista

╔═══════════════════════════════════════════════════════════╗
║ RENDERIZADO                                               ║
╚═══════════════════════════════════════════════════════════╝
- renderizarLista(gastos) → void
  * Poblar tbody con filas
  * Formatear montos
  * Agregar event listeners a botones eliminar
  
- renderizarResumen() → void
  * Actualizar total general
  * Actualizar totales por categoría
  * Actualizar gráfico

- renderizarGrafico(datos) → void
  * Usar Canvas API
  * Barras horizontales simples
  * Colores por categoría

VALIDACIONES:
- Monto: número > 0
- Categoría: no vacía, debe estar en lista
- Descripción: max 100 caracteres
- Fecha: no futura

MANEJO DE ERRORES:
- Try-catch en operaciones LocalStorage
- Mensajes descriptivos en español
- Console.error para debug

TODO con comentarios JSDoc en español"
```

### 3.3 CSS Styling (10 min)

**Prompt**:

```bash
claude "Crea main.css con diseño mobile-first:

╔═══════════════════════════════════════════════════════════╗
║ VARIABLES CSS                                             ║
╚═══════════════════════════════════════════════════════════╝
:root {
  /* Colores FPUNA */
  --primary: #003D7A;
  --secondary: #FFFFFF;
  --accent: #FFD700;
  --success: #28A745;
  --error: #DC3545;
  
  /* Espaciado */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Tipografía */
  --font-family: 'Segoe UI', sans-serif;
  --font-size-base: 16px;
  
  /* Transiciones */
  --transition: 0.3s ease;
}

╔═══════════════════════════════════════════════════════════╗
║ RESET Y BASE                                              ║
╚═══════════════════════════════════════════════════════════╝
* { box-sizing, margin, padding }
body { fuente, colores, responsive }

╔═══════════════════════════════════════════════════════════╗
║ COMPONENTES                                               ║
╚═══════════════════════════════════════════════════════════╝
1. Header
   - Sticky top
   - Flexbox para logo y título
   - Gradiente sutil

2. Formulario
   - Grid layout responsive
   - Inputs estilizados
   - Focus states
   - Validation styles

3. Tabla
   - Responsive (scroll horizontal en móvil)
   - Hover en filas
   - Zebra striping
   - Botones de acción

4. Cards de Resumen
   - Grid layout (auto-fit)
   - Sombras sutiles
   - Animación hover

5. Gráfico
   - Canvas responsive
   - Labels claros

6. Botones
   - Primary, secondary, danger
   - Hover, active, disabled states
   - Icons con text

╔═══════════════════════════════════════════════════════════╗
║ RESPONSIVE                                                ║
╚═══════════════════════════════════════════════════════════╝
/* Mobile first */
Base: 320px+

/* Tablet */
@media (min-width: 768px) {
  - Form en 2 columnas
  - Tabla completa visible
}

/* Desktop */
@media (min-width: 1024px) {
  - Layout en 3 columnas
  - Sidebar con resumen
}

╔═══════════════════════════════════════════════════════════╗
║ DARK MODE                                                 ║
╚═══════════════════════════════════════════════════════════╝
[data-theme='dark'] {
  --background: #1a1a1a;
  --text: #e0e0e0;
  /* etc */
}

╔═══════════════════════════════════════════════════════════╗
║ ANIMACIONES                                               ║
╚═══════════════════════════════════════════════════════════╝
- Fade in para nuevos gastos
- Slide out para eliminados
- Smooth scroll
- Loader spinner

TODO bien comentado y organizado por secciones"
```

---

## 🧪 Parte 4: Testing y Debugging (15 min)

### Proceso de Testing en Vivo

```mermaid
flowchart TD
    A[Abrir index.html] --> B{¿Se ve<br/>correctamente?}
    B -->|No| C[Ajustar CSS]
    C --> A
    B -->|Sí| D[Probar agregar gasto]
    
    D --> E{¿Funciona?}
    E -->|No| F[Debug en Console]
    F --> G[Corregir JavaScript]
    G --> D
    E -->|Sí| H[Probar eliminar]
    
    H --> I{¿Funciona?}
    I -->|No| F
    I -->|Sí| J[Probar filtros]
    
    J --> K{¿Funciona?}
    K -->|No| F
    K -->|Sí| L[Probar LocalStorage]
    
    L --> M{¿Persiste datos?}
    M -->|No| F
    M -->|Sí| N[Probar responsive]
    
    N --> O[✅ App funcional]
    
    style O fill:#90EE90
```

### Bugs Comunes que Verás (y Cómo se Resuelven)

| Bug | Síntoma | Solución |
|-----|---------|----------|
| **LocalStorage no persiste** | Datos desaparecen al recargar | Verificar `JSON.stringify/parse` |
| **Formato de monto incorrecto** | Aparece "1500000" en lugar de "₲1.500.000" | Usar `Intl.NumberFormat` |
| **Fecha en formato incorrecto** | Aparece "2026-01-15" en lugar de "15/01/2026" | Formatear con Date methods |
| **Filtro no funciona** | Muestra todos aunque filtro seleccionado | Verificar event listener y lógica |

---

## ✨ Parte 5: Mejoras Iterativas (15 min)

### Mejora 1: Export a CSV

```bash
claude "Agrega botón 'Exportar a CSV' que:
- Genere archivo CSV con todos los gastos
- Columnas: Fecha, Categoría, Descripción, Monto
- Formato monto: números sin formateo (para Excel)
- Descarga automática con nombre 'gastos-FPUNA-[fecha].csv'"
```

### Mejora 2: Dark Mode Toggle

```bash
claude "Implementa toggle dark mode que:
- Botón en header (icono sol/luna)
- Cambia CSS variables
- Guarda preferencia en LocalStorage
- Aplica automáticamente al cargar página
- Smooth transition entre temas"
```

### Mejora 3: Gráfico Interactivo

```bash
claude "Mejora el gráfico para que:
- Muestre tooltip al hover con monto exacto
- Barras tengan animación de crecimiento al cargar
- Colores diferentes por categoría
- Leyenda con porcentajes"
```

---

## 📚 Parte 6: Documentación (5 min)

```bash
claude "Genera README.md profesional con:

# Gestor de Gastos Personal - FPUNA

## Descripción
[Párrafo explicativo]

## Screenshots
![Demo](docs/screenshots/demo.png)
[Placeholder - agregar screenshots reales]

## Características
- ✅ Feature 1
- ✅ Feature 2
...

## Tecnologías
- HTML5
- CSS3 (Variables, Grid, Flexbox)
- JavaScript ES6+ (Classes, LocalStorage, Canvas)

## Instalación
```bash
# Simplemente abrir index.html en navegador
# No requiere servidor ni build
```

## Uso
1. Paso 1
2. Paso 2
...

## Estructura del Proyecto
```
gestor-gastos-fpuna/
├── src/
│   ├── index.html
│   ├── app.js
│   └── styles/
└── docs/
```

## Autor
Demo en vivo - Módulo 05 FPUNA Verano 2026
Instructor: [Nombre]

## Licencia
MIT - Uso educativo
"
```

---

## 🎓 Lecciones Clave del Demo

### 1. Workflow Iterativo

```mermaid
graph LR
    A[Prompt] --> B[Código generado]
    B --> C[Probar]
    C --> D{¿Funciona?}
    D -->|No| E[Refinar prompt]
    E --> B
    D -->|Sí| F[Siguiente feature]
    
    style F fill:#90EE90
```

**Lección**: Desarrollo con IA es iterativo - no esperes perfección al primer intento.

### 2. Contexto es Crucial

```mermaid
mindmap
  root((Contexto<br/>Reduce<br/>Iteraciones))
    .opencode
      Tech stack claro
      Convenciones definidas
      Preferencias especificadas
    CLAUDE.md
      Reglas de negocio
      Modelo de datos
      Decisiones documentadas
    Prompts detallados
      Qué hacer
      Cómo hacerlo
      Qué evitar
```

**Lección**: Buenos archivos de contexto = menos prompts = código más preciso.

### 3. Debugging es Normal

| Momento | Qué Pasó | Qué Aprendimos |
|---------|----------|----------------|
| Min 25 | Bug en LocalStorage | Verificar siempre JSON.parse |
| Min 40 | CSS no responsive | Mobile-first es clave |
| Min 55 | Filtro no funcionaba | Event delegation para elementos dinámicos |

**Lección**: Bugs son parte del proceso - saber debuggear es crucial.

### 4. Divide y Conquistarás

```mermaid
flowchart TD
    A[Tarea Grande:<br/>App Completa] --> B[Dividir en Pasos]
    B --> C[HTML primero]
    B --> D[JS después]
    B --> E[CSS al final]
    B --> F[Mejoras iterativas]
    
    C --> G[✅ Completo<br/>y Funcional]
    D --> G
    E --> G
    F --> G
```

**Lección**: No intentar hacer todo a la vez - paso a paso.

---

## 📝 Ejercicio Práctico: Tu Turno

Ahora que viste el proceso completo, **replícalo tú mismo** con un proyecto similar:

### Opciones de Proyecto

#### Opción 1: Gestor de Tareas (TODO App)
- Agregar tareas con prioridad
- Marcar como completadas
- Filtrar por estado y prioridad
- Estadísticas de productividad

#### Opción 2: Calculadora de Promedio
- Ingresar materias y notas
- Calcular promedio general y por semestre
- Visualizar con gráfico
- Guardar historial

#### Opción 3: Tracker de Hábitos
- Definir hábitos a trackear
- Marcar día completado
- Racha actual
- Calendario visual

#### Opción 4: Agenda de Contactos
- Agregar contactos (nombre, teléfono, email)
- Buscar y filtrar
- Categorías (familia, amigos, trabajo)
- Export a VCard

### Requisitos

- ✅ Aplicar archivos de contexto (`.opencode` y `CLAUDE.md`)
- ✅ Usar prompts detallados (basados en lo que viste)
- ✅ HTML semántico + CSS responsive + JS modular
- ✅ LocalStorage para persistencia
- ✅ Validación de inputs
- ✅ README profesional

### Tiempo

**90 minutos** - Cronometra como lo hizo el instructor.

### Entregable

- Código funcional
- README con screenshots
- Subir a GitHub (opcional pero recomendado)

---

## 🎯 Checklist de Verificación

Después del demo, verifica que entendiste:

### Conceptos
- [ ] Entiendo el workflow completo (idea → código → app)
- [ ] Sé por qué el contexto es importante
- [ ] Comprendo cómo iterar y mejorar código
- [ ] Sé cómo debuggear cuando algo falla

### Habilidades
- [ ] Puedo escribir prompts detallados efectivos
- [ ] Sé estructurar un proyecto desde cero
- [ ] Puedo dividir tareas grandes en pasos
- [ ] Entiendo cómo usar LocalStorage

### Herramientas
- [ ] Sé crear archivos `.opencode` y `CLAUDE.md`
- [ ] Puedo usar DevTools para debugging
- [ ] Entiendo cómo organizar archivos de proyecto

---

## 💭 Preguntas Frecuentes (Q&A)

### P: ¿Por qué no usó React o frameworks?
**R**: Para demostrar que puedes crear apps potentes con vanilla JS. Frameworks vienen después - primero domina los fundamentos.

### P: ¿Cuánto tiempo tomaría sin IA?
**R**: Un desarrollador junior tardaría 6-8 horas. Con IA: 90 minutos.

### P: ¿El código generado es perfecto?
**R**: No. Por eso el instructor tuvo que iterar y corregir. IA acelera pero requiere revisión.

### P: ¿Puedo hacer esto solo después del curso?
**R**: ¡Sí! Ese es el objetivo. Este demo te muestra el proceso para que lo repliques.

---

## 🎉 Resumen del Módulo

### Viste en Acción

✅ **Workflow completo** - Idea a app funcional en 90 min  
✅ **Uso de contexto** - `.opencode` y `CLAUDE.md` en práctica  
✅ **Prompting efectivo** - Prompts detallados = mejores resultados  
✅ **Debugging real** - Cómo resolver problemas cuando surgen  
✅ **Mejoras iterativas** - No todo perfecto al primer intento

### Aprendiste

🚀 **El proceso importa** - No solo el resultado  
🚀 **Divide y conquista** - Paso a paso, no todo junto  
🚀 **Itera y mejora** - Primera versión → refinamiento  
🚀 **Context matters** - Buenos archivos = mejor código  
🚀 **Debug es normal** - Parte del desarrollo, no fracaso

---

## 🎯 Próximos Pasos

1. **Practica**: Crea tu propia app usando el mismo proceso
2. **Documenta**: Toma notas de lo que funciona y qué no
3. **Comparte**: Sube tu proyecto a GitHub
4. **Continúa**: [Módulo 06 - Patrones de Workflow](./06-workflow-patterns.md)

---

*Módulo creado para FPUNA Verano 2026*  
*Actualizado: Enero 2026*  
*Versión: 2.0 - Demo en vivo interactivo y educativo*
