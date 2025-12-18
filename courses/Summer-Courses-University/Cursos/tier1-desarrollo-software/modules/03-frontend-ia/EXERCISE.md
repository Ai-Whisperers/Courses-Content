# Ejercicio Práctico - Módulo 03
## Desarrollo Frontend con IA

---

## Objetivo

Crear un dashboard de productos con React y Tailwind CSS usando IA.

**Duración:** 30 minutos
**Entregable:** Dashboard funcional conectado a API

---

## Proyecto: Dashboard de Productos

### Paso 1: Componente ProductCard (8 min)

Genera con IA una tarjeta de producto con:
- Imagen, nombre, precio, categoría
- Botones de editar/eliminar
- Badge de stock (verde >10, amarillo 1-10, rojo 0)

### Paso 2: Grid de Productos (7 min)

Crea componente ProductGrid:
- Layout responsive (1 col móvil, 2 tablet, 4 desktop)
- Estado de carga (skeletons)
- Estado vacío

### Paso 3: Formulario de Producto (10 min)

Modal para crear/editar producto:
- react-hook-form + zod
- Campos: nombre, precio, stock, categoría
- Validación en español

### Paso 4: Integración (5 min)

Conectar con API del módulo anterior o mockear datos.

---

## Entregable

```
dashboard/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductModal.tsx
│   └── Button.tsx
├── hooks/
│   └── useProducts.ts
└── prompts.md
```

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Componentes funcionales | 30 |
| Responsive design | 25 |
| Formulario con validación | 25 |
| Código TypeScript correcto | 20 |
| **Total** | **100** |

---

*Ejercicio Módulo 03 - Frontend con IA*
