# Modulo 05: Proyecto en Vivo

## Objetivo
Observar al instructor crear una aplicacion completa desde cero usando OpenCode, aplicando todos los conceptos de los modulos anteriores en un workflow real.

## El Proyecto: Gestor de Gastos Personales

Una aplicacion web para que estudiantes de FPUNA gestionen sus gastos mensuales en Guaranies.

### Caracteristicas
- Agregar gastos con monto, categoria y descripcion
- Visualizar lista de gastos con filtros
- Ver totales por categoria
- Persistencia en LocalStorage (funciona offline)
- Export a CSV

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
- Inicializar con `npm init`
- Crear estructura basica de archivos

### Fase 2: Contexto (5 min)
- Crear CLAUDE.md con especificaciones
- Definir convenciones del proyecto

### Fase 3: Implementacion (35 min)
- Generar HTML (estructura)
- Generar JavaScript (logica)
- Generar CSS (estilos)

### Fase 4: Testing y Debug (15 min)
- Probar funcionalidades
- Identificar y corregir bugs
- Iterar con OpenCode

### Fase 5: Refinamiento (15 min)
- Agregar features extras
- Mejorar UX
- Documentar

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
