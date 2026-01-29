# Proyecto: Catalogo Grocery - Live Demo FPUNA

## Descripcion
Pagina web de catalogo de productos para un negocio de grocery en Paraguay. 
Muestra productos de carnes, verduras y frutas con filtros interactivos.

## Stack Tecnologico
- **Lenguaje**: JavaScript Vanilla (ES6+)
- **Estilos**: CSS3 puro (sin frameworks)
- **Markup**: HTML5 semantico
- **Datos**: JSON embebido en data.js

## Estructura del Proyecto
```
live-demo-proyecto/
├── index.html    # Pagina principal
├── styles.css    # Estilos
├── app.js        # Logica de filtros y render
└── data.js       # Array de productos
```

## Convenciones de Codigo

### JavaScript
- Variables: camelCase en espanol (ej: productosFiltrados)
- Funciones: verbos descriptivos (ej: filtrarPorCategoria)
- Comentarios: en espanol, breves
- Sin dependencias externas

### CSS
- Variables CSS para colores y espaciado
- Mobile-first approach
- BEM-like naming (ej: .producto-card, .producto-card__imagen)
- Colores: paleta profesional, fondo claro

### HTML
- Semantico: header, main, section, article
- Accesible: aria-labels, alt en imagenes
- IDs descriptivos para elementos interactivos

## Datos del Catalogo

Fuente: https://github.com/IvanWeissVanDerPol/grocery

### Categorias
1. Carnes: Res (14 productos)
2. Carnes: Cerdo (7 productos)
3. Pequenos Animales (7 productos)
4. Organos y Huesos (10 productos)
5. Verduras (14 productos)
6. Frutas (17 productos)
7. Exoticos (1 producto)

### Estructura de Producto
```javascript
{
  id: number,
  nombre: string,
  descripcion: string,
  unidadCompra: string,
  categoria: string,
  imagen: string | null
}
```

## Funcionalidades Requeridas

### Filtros
- Dropdown de categoria
- Input de busqueda por texto
- Checkbox "Solo con imagen"

### Ordenamiento
- Alfabetico A-Z / Z-A

### Visualizacion
- Toggle Grid / Lista
- Cards con imagen, nombre, descripcion, unidad
- Placeholder para productos sin imagen

### UX
- Contador: "Mostrando X de Y productos"
- Boton "Limpiar filtros"
- Estado vacio con mensaje amigable

## Reglas para la IA

### HACER:
- Codigo limpio y comentado en espanol
- Responsive design (mobile-first)
- Usar datos reales del catalogo grocery
- Funcionalidad completa sin librerias externas

### NO HACER:
- No usar frameworks (React, Vue, etc)
- No usar Tailwind ni Bootstrap
- No agregar dependencias npm
- No usar imagenes externas (usar placeholders o URLs del repo)
