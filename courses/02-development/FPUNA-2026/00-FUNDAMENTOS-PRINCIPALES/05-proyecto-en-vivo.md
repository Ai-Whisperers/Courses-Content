# Modulo 05: Proyecto en Vivo

## Objetivo
Observar al instructor crear una aplicacion completa desde cero usando OpenCode, aplicando todos los conceptos de los modulos anteriores en un workflow real.

> **Demo Completo**: Revisa el ejemplo terminado en [`./live-demo-proyecto/`](./live-demo-proyecto/) - incluye el codigo fuente, todos los prompts usados, y documentacion para replicar el proceso.

## El Proyecto: Catalogo de Productos Grocery

Una aplicacion web de catalogo de productos usando datos reales del repositorio [grocery](https://github.com/IvanWeissVanDerPol/grocery).

### Caracteristicas
- Grid/Lista de productos con imagenes
- Filtros por categoria, busqueda de texto, productos con imagen
- Ordenamiento alfabetico (A-Z / Z-A)
- Toggle vista grid/lista con persistencia en LocalStorage
- Contador de productos y estado vacio

## Fases del Demo

```mermaid
graph LR
    A[Setup] --> B[Contexto]
    B --> C[HTML]
    C --> D[JavaScript]
    D --> E[CSS]
    E --> F[Testing]
    F --> G[Refinamiento]
```

### Fase 1: Setup (5 min)
- Crear carpeta del proyecto
- Crear CLAUDE.md con especificaciones del catalogo

### Fase 2: Datos (5 min)
- Extraer productos del repositorio grocery a JSON
- Crear data.js con array de productos

### Fase 3: Estructura HTML (10 min)
- Header con titulo
- Seccion de filtros (categoria, busqueda, checkbox, ordenamiento)
- Grid de productos
- Footer con creditos

### Fase 4: Estilos CSS (15 min)
- Variables CSS para colores y espaciado
- Layout responsive con Grid
- Cards de producto con hover effects
- Vista grid y lista

### Fase 5: Logica JavaScript (15 min)
- Funciones de filtrado y ordenamiento
- Renderizado dinamico de productos
- Event listeners para controles
- Persistencia de preferencias

### Fase 6: Testing (5 min)
- Probar todos los filtros
- Verificar responsive design
- Documentar prompts usados

## Que Observar (Checklist)

Durante el demo, presta atencion a:

- [ ] Como el instructor estructura los prompts (marco CERO)
- [ ] Como usa CLAUDE.md para dar contexto
- [ ] Como divide tareas grandes en pasos pequenos
- [ ] Como reacciona cuando algo no funciona
- [ ] Como itera y refina el codigo
- [ ] Como documenta al final

## Preguntas para Reflexionar

1. ¿Cuantas iteraciones fueron necesarias para cada feature?
2. ¿Que prompts funcionaron mejor y por que?
3. ¿Como hubiera sido diferente sin los archivos de contexto?

## Quiz

1. **¿Por que es importante observar el proceso completo y no solo el resultado?**
   <details>
   <summary>Ver respuesta</summary>
   Porque el valor esta en aprender el workflow: como estructurar prompts, manejar errores, e iterar. El resultado final es secundario.
   </details>

2. **¿Que hacer cuando OpenCode genera codigo que no funciona?**
   <details>
   <summary>Ver respuesta</summary>
   Identificar el error especifico, describir el problema en un nuevo prompt, y pedir correccion. No empezar de cero.
   </details>

3. **¿Por que se divide el proyecto en fases?**
   <details>
   <summary>Ver respuesta</summary>
   Para reducir complejidad, verificar cada parte antes de continuar, y facilitar debugging si algo falla.
   </details>

## Siguiente Modulo
[Modulo 06: Patrones de Flujo de Trabajo](./06-patrones-flujo-trabajo.md)
