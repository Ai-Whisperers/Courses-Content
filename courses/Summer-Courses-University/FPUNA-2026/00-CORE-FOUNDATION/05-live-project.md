# Módulo 05: Proyecto en Vivo (Demo 1-Shot)

## De Cero a App Funcional en una Sesión

**Duración**: 1.5 horas  
**Nivel**: Todos los niveles  
**Prerequisito**: Módulos 01-04 completados

---

## Objetivos

1. ✅ Ver OpenCode en acción end-to-end
2. ✅ Crear app completa desde cero
3. ✅ Aplicar todos los conceptos aprendidos
4. ✅ Entender workflow completo

---

## El Proyecto: Gestor de Gastos Personales

Crearemos una aplicación web completa para gestionar gastos personales en **una sola sesión**.

### Features
- Agregar gastos (monto, categoría, descripción)
- Ver lista de gastos
- Filtrar por categoría
- Ver total por categoría
- Gráfico simple de gastos
- Persistencia con LocalStorage

---

## Parte 1: Setup del Proyecto (5 min)

```bash
# 1. Crear directorio
mkdir gestor-gastos-fpuna
cd gestor-gastos-fpuna

# 2. Inicializar
npm init -y

# 3. Crear estructura básica
mkdir -p src/{components,utils,styles}
touch src/index.html src/app.js src/styles/main.css

# 4. Crear archivos de contexto
```

**.opencode**:
```yaml
project:
  name: Gestor de Gastos Personal
  description: App web para tracking de gastos
  student: [TU NOMBRE]
  
tech_stack:
  frontend: HTML + CSS + JavaScript Vanilla
  storage: LocalStorage
  
preferences:
  language: es-PY
  currency: Guaraníes (₲)
  
conventions:
  - Spanish variables
  - camelCase
  - JSDoc comments
```

---

## Parte 2: Generación con OpenCode (45 min)

### Paso 1: Estructura HTML

```bash
claude "Crea index.html para gestor de gastos con:

SECCIONES:
1. Header con título 'Gestor de Gastos - FPUNA'
2. Formulario para agregar gasto:
   - Input monto (Guaraníes)
   - Select categoría (Alimentación, Transporte, Educación, Entretenimiento, Otros)
   - Input descripción
   - Botón 'Agregar Gasto'

3. Filtros:
   - Select para filtrar por categoría (Todas, ...)
   
4. Lista de gastos (tabla)
   - Columnas: Fecha, Categoría, Descripción, Monto
   - Botón eliminar por fila

5. Resumen:
   - Total general
   - Total por categoría

ESTILOS:
- Responsive
- Colores FPUNA (azul/blanco)
- Clean y moderno

Incluir enlaces a app.js y main.css"
```

### Paso 2: Lógica JavaScript

```bash
claude "Crea app.js con toda la lógica:

FUNCIONALIDADES:
- Clase Gasto (fecha, categoria, descripcion, monto)
- GestorGastos con métodos:
  * agregarGasto()
  * eliminarGasto(id)
  * obtenerGastos(filtroCategoria?)
  * calcularTotalGeneral()
  * calcularTotalPorCategoria()
  
- LocalStorage:
  * Guardar gastos
  * Cargar gastos al inicio
  
- Event listeners:
  * Submit formulario
  * Click eliminar
  * Change filtro

- Renderizado:
  * Actualizar tabla
  * Actualizar resumen
  * Formatear montos (₲1.500.000)

VALIDACIONES:
- Monto > 0
- Descripción no vacía
- Categoría seleccionada

Todo con comentarios en español"
```

### Paso 3: Estilos CSS

```bash
claude "Crea main.css con:

DISEÑO:
- Mobile-first responsive
- Variables CSS para colores FPUNA
- Grid/Flexbox para layout
- Animaciones suaves
- Hover effects
- Tema limpio y profesional

COMPONENTES:
- Header sticky
- Formulario con validation styles
- Tabla responsive
- Cards para resumen
- Botones estilizados

Todo bien comentado"
```

### Paso 4: Tests (Bonus)

```bash
claude "Crea tests.js con Jest para:
- Clase Gasto
- GestorGastos métodos
- Cálculos de totales
- Validaciones

> 80% coverage"
```

---

## Parte 3: Mejoras Iterativas (20 min)

### Mejora 1: Gráfico de Gastos

```bash
claude "Agrega gráfico de barras simple (sin librerías) mostrando total por categoría"
```

### Mejora 2: Export a CSV

```bash
claude "Agrega botón para exportar gastos a CSV"
```

### Mejora 3: Dark Mode

```bash
claude "Agrega toggle de dark mode que persiste preferencia"
```

---

## Parte 4: Documentación (10 min)

```bash
claude "Genera README.md completo con:
- Descripción
- Screenshots (placeholders)
- Cómo usar
- Features
- Tecnologías
- Autor: [TU NOMBRE]"
```

---

## Parte 5: Refinamiento (10 min)

1. **Probar la app**: Abrir index.html, usar todas las features
2. **Corregir bugs**: Si algo no funciona
3. **Ajustar estilos**: Mejorar apariencia
4. **Optimizar código**: Refactorizar si necesario

---

## Resultados Esperados

Después de 1.5 horas deberías tener:

✅ App web funcional  
✅ Código limpio y documentado  
✅ Diseño responsive  
✅ Tests (bonus)  
✅ README profesional  

---

## Lecciones Clave

### 1. Prompting Efectivo

Notaste cómo prompts detallados generan mejores resultados:
- Especificamos EXACTAMENTE qué queríamos
- Dimos contexto (Guaraníes, FPUNA)
- Establecimos requisitos claros

### 2. Iteración

No todo salió perfecto al primer intento:
- Refinamos con prompts adicionales
- Corregimos bugs encontrados
- Mejoramos estilos

### 3. Contexto Importa

Los archivos `.opencode` y `CLAUDE.md` ayudaron a:
- Mantener consistencia
- Usar convenciones correctas
- Generar código más relevante

---

## Ejercicio Práctico

Ahora TÚ crea una app similar:

**Opciones**:
1. Gestor de Tareas (TODO app)
2. Calculadora de Promedio de Notas
3. Agenda de Contactos
4. Tracker de Hábitos

**Tiempo**: 1 hora  
**Requisitos**: Aplicar todo lo aprendido

Ver [EXERCISE.md](./EXERCISE.md) para detalles.

---

## Próximos Pasos

1. 📝 [EXERCISE.md](./EXERCISE.md) - Crea tu propia app
2. 📝 [QUIZ.md](./QUIZ.md)
3. 📖 [Módulo 06 - Workflow Patterns](../06-workflow-patterns/README.md)

---

## Resumen

**Viste**:
- ✅ Workflow completo 0 a 100
- ✅ OpenCode en acción real
- ✅ Aplicación práctica de conceptos
- ✅ Depuración y refinamiento

**Aprendiste**:
- 🚀 Cómo estructurar un proyecto
- 🚀 Usar OpenCode efectivamente
- 🚀 Iterar y mejorar
- 🚀 Workflow profesional

---

*Módulo creado para FPUNA Summer 2026*
