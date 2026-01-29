# Prompts Usados en el Live Demo

Este documento registra TODOS los prompts usados durante el live demo para que los estudiantes puedan replicar el proceso.

---

## Fase 1: Setup y Contexto (5 min)

### Prompt 1.1: Crear estructura de proyecto
```
Crea la estructura basica del proyecto con los archivos vacios:
- index.html
- styles.css  
- app.js
- data.js

Solo crea los archivos con comentarios indicando su proposito.
```

### Prompt 1.2: Revisar CLAUDE.md
```
Lee el archivo CLAUDE.md y confirma que entiendes el proyecto.
Resume en 3 puntos lo que vamos a construir.
```

---

## Fase 2: Extraer Datos (5 min)

### Prompt 2.1: Convertir catalogo a JSON
```
Convierte los datos del catalogo de productos a un array JavaScript.
El catalogo tiene estas categorias:
- Carnes: Res (14 productos)
- Carnes: Cerdo (7 productos)  
- Pequenos Animales (7 productos)
- Organos y Huesos (10 productos)
- Verduras (14 productos)
- Frutas (17 productos)
- Exoticos (1 producto)

Estructura de cada producto:
{
  id: number (autoincremental),
  nombre: string,
  descripcion: string,
  unidadCompra: string,
  categoria: string,
  imagen: string | null (URL de GitHub raw si existe)
}

Guarda en data.js como: const productos = [...]
```

---

## Fase 3: HTML Estructura (10 min)

### Prompt 3.1: Crear HTML base
```
Crea el HTML de index.html con:

1. Header con titulo "Catalogo Grocery Paraguay"

2. Seccion de filtros:
   - Dropdown categoria (todas las categorias + "Todas")
   - Input busqueda con placeholder "Buscar producto..."
   - Checkbox "Solo con imagen"
   - Select ordenamiento (A-Z, Z-A)
   - Boton "Limpiar filtros"

3. Contador: div para "Mostrando X de Y productos"

4. Contenedor de productos: div#productos-grid

5. Template para estado vacio

Usa IDs descriptivos. Sin estilos inline.
```

---

## Fase 4: CSS Estilos (15 min)

### Prompt 4.1: Estilos base y variables
```
Crea los estilos CSS con:

1. Variables CSS:
   - Colores: primario verde (#2d5a27), secundario, fondo, texto
   - Espaciado: sm, md, lg
   - Border-radius
   - Sombras

2. Reset basico y tipografia

3. Layout del header y filtros (flexbox)

4. Responsive: mobile-first, breakpoint en 768px
```

### Prompt 4.2: Estilos de productos
```
Agrega estilos para:

1. Grid de productos (CSS Grid):
   - Mobile: 1 columna
   - Tablet: 2 columnas
   - Desktop: 3-4 columnas
   - Gap consistente

2. Card de producto:
   - Imagen con aspect-ratio 4:3
   - Placeholder para sin imagen (fondo gris con icono)
   - Nombre en negrita
   - Descripcion truncada (2 lineas)
   - Unidad de compra como badge
   - Hover con sombra elevada

3. Toggle grid/lista (lista = cards horizontales)
```

### Prompt 4.3: Estilos estados
```
Agrega estilos para:
- Estado vacio (centrado, icono, mensaje)
- Loading state (opcional)
- Filtros activos highlighted
- Boton limpiar filtros
- Contador de resultados
```

---

## Fase 5: JavaScript Logica (15 min)

### Prompt 5.1: Render de productos
```
En app.js, crea la funcion para renderizar productos:

1. renderizarProductos(listaProductos):
   - Recibe array de productos
   - Genera HTML de cards
   - Inserta en #productos-grid
   - Actualiza contador

2. crearCardProducto(producto):
   - Retorna HTML string de una card
   - Maneja imagen null con placeholder
   - Incluye todos los datos

3. Al cargar pagina: renderizar todos los productos
```

### Prompt 5.2: Sistema de filtros
```
Implementa el sistema de filtros:

1. Estado global: 
   let filtros = { categoria: 'todas', busqueda: '', soloConImagen: false, orden: 'az' }

2. filtrarProductos():
   - Aplica todos los filtros activos
   - Retorna array filtrado

3. ordenarProductos(lista, orden):
   - 'az': A-Z por nombre
   - 'za': Z-A por nombre

4. aplicarFiltros():
   - Llama filtrar + ordenar + renderizar
   - Actualiza contador
```

### Prompt 5.3: Event listeners
```
Agrega los event listeners:

1. Dropdown categoria: change -> actualizar filtros.categoria
2. Input busqueda: input (con debounce 300ms) -> actualizar filtros.busqueda
3. Checkbox imagen: change -> actualizar filtros.soloConImagen
4. Select orden: change -> actualizar filtros.orden
5. Boton limpiar: click -> resetear filtros a valores iniciales

Cada listener debe llamar aplicarFiltros() al final.
```

### Prompt 5.4: Toggle vista
```
Implementa el toggle grid/lista:

1. Boton con icono que alterna
2. Clase en contenedor: .vista-grid o .vista-lista
3. Guardar preferencia en localStorage
4. Cargar preferencia al inicio
```

---

## Fase 6: Testing y Ajustes (5 min)

### Prompt 6.1: Verificar funcionalidad
```
Revisa el codigo y verifica:
1. Todos los filtros funcionan correctamente
2. El contador se actualiza
3. El estado vacio aparece cuando no hay resultados
4. Es responsive en mobile
5. No hay errores en consola

Si hay bugs, corrigelos.
```

### Prompt 6.2: Mejoras finales
```
Aplica estas mejoras de UX:
1. Transiciones suaves en hover de cards
2. Focus states accesibles en inputs
3. Mensaje descriptivo en estado vacio
4. Animacion sutil al filtrar (fade)
```

---

## Fase 7: Documentacion (5 min)

### Prompt 7.1: Actualizar README
```
Actualiza el README con:
1. Screenshot o descripcion de la app final
2. Instrucciones para abrir (solo abrir index.html)
3. Lista de features implementadas
4. Creditos al catalogo original
```

---

## Notas para el Instructor

### Tips para el Demo
- Ejecutar cada prompt y explicar el resultado
- Mostrar iteraciones cuando algo no sale perfecto
- Destacar uso del marco CERO en cada prompt
- Pausar para preguntas despues de cada fase

### Errores Comunes a Demostrar
- Prompt muy vago -> resultado generico
- Olvidar contexto -> codigo inconsistente
- No especificar formato -> output inesperado

### Tiempo Buffer
- Si sobra tiempo: agregar dark mode o animaciones
- Si falta tiempo: omitir toggle grid/lista
