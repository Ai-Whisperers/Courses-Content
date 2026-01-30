# Live Demo: Catalogo de Productos Grocery

## Objetivo del Demo

Crear una pagina web de catalogo de productos usando datos reales del repositorio [grocery](https://github.com/IvanWeissVanDerPol/grocery), demostrando como la IA puede generar una aplicacion completa en ~60 minutos.

## Caracteristicas a Implementar

### Visualizacion
- Grid/Lista de productos con imagenes
- Cards con informacion: nombre, descripcion, unidad de compra
- Responsive design (mobile-first)

### Filtros
- Por categoria (Carnes Res, Cerdo, Aves, Organos, Verduras, Frutas, Exoticos)
- Por disponibilidad de imagen
- Busqueda por texto (nombre, descripcion)

### Ordenamiento
- Alfabetico (A-Z, Z-A)
- Por categoria

### UX Features
- Toggle vista grid/lista
- Contador de productos filtrados
- Clear filters button
- Estado vacio cuando no hay resultados

## Stack Tecnico
- HTML5 semantico
- CSS3 (Grid, Flexbox, Variables)
- JavaScript Vanilla (sin frameworks)
- Datos embebidos (JSON)

## Estructura de Archivos
```
live-demo-proyecto/
├── README.md           # Este archivo
├── CLAUDE.md           # Contexto para OpenCode
├── PROMPTS-USADOS.md   # Registro de todos los prompts
├── index.html          # Pagina principal
├── styles.css          # Estilos
├── app.js              # Logica JavaScript
└── data.js             # Datos del catalogo (JSON)
```

## Fuente de Datos
Repositorio: https://github.com/IvanWeissVanDerPol/grocery
Archivo: `02_Shopping_Guide/Catalogo_Maestro_Productos.md`

## Timeline del Demo (60 min)

| Fase | Tiempo | Actividad |
|------|--------|-----------|
| 1 | 5 min | Setup proyecto + CLAUDE.md |
| 2 | 5 min | Extraer datos a JSON |
| 3 | 10 min | Generar HTML estructura |
| 4 | 15 min | Generar CSS estilos |
| 5 | 15 min | Generar JS logica filtros |
| 6 | 5 min | Testing y ajustes |
| 7 | 5 min | Documentar prompts usados |
