# Módulo 03: Desarrollo Frontend con IA
## Tier 1 - Desarrollo de Software

---

## Descripción

Este módulo enseña a generar componentes React, implementar interfaces responsive con Tailwind CSS, y optimizar el desarrollo frontend usando IA.

**Duración:** 2.5 horas
**Stack:** React, Next.js, TypeScript, Tailwind CSS

---

## Objetivos de Aprendizaje

1. **Generar** componentes React con IA
2. **Convertir** diseños a código
3. **Implementar** formularios y validación
4. **Integrar** frontend con APIs

---

## Contenido

### 1. Generación de Componentes

**Prompt Efectivo:**
```
Crea un componente React + TypeScript para una tarjeta de producto:

PROPS:
- product: { id, name, price, image, category }
- onAddToCart: (id: string) => void

REQUISITOS:
- Tailwind CSS para estilos
- Imagen con fallback
- Precio formateado (Gs.)
- Botón de agregar al carrito
- Hover effects
- Responsive (mobile-first)

FORMATO: Componente funcional con tipos
```

**Ejemplo de Output:**
```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0
  }).format(product.price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = '/placeholder.jpg';
        }}
      />
      <div className="p-4">
        <span className="text-xs text-gray-500 uppercase">{product.category}</span>
        <h3 className="font-semibold text-lg mt-1">{product.name}</h3>
        <p className="text-green-600 font-bold mt-2">{formattedPrice}</p>
        <button
          onClick={() => onAddToCart(product.id)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
```

---

### 2. Diseño a Código

**Prompt para Convertir Diseño:**
```
Tengo este diseño de header para una app:
- Logo a la izquierda
- Navegación centrada (Home, Products, About, Contact)
- Carrito e ícono de usuario a la derecha
- Responsive: en móvil, menú hamburguesa

GENERAR: Componente React con Tailwind
- useState para menú móvil
- Links de Next.js
- Íconos de Heroicons o Lucide
```

---

### 3. Formularios con Validación

**Prompt para Formulario:**
```
Crea formulario de registro con:
- Nombre, email, contraseña, confirmar contraseña
- Validación con react-hook-form + zod
- Mensajes de error en español
- Loading state en submit
- Estilos Tailwind

Validaciones:
- Email válido
- Password mínimo 8 chars, 1 mayúscula, 1 número
- Passwords deben coincidir
```

---

### 4. Integración con API

**Patrón de Data Fetching:**
```tsx
// hooks/useProducts.ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useProducts(category?: string) {
  const url = category
    ? `/api/products?category=${category}`
    : '/api/products';

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    products: data?.data ?? [],
    isLoading,
    isError: !!error,
    refresh: mutate
  };
}
```

---

### 5. Patrones de UI

**Componentes Comunes:**
- Loading spinners
- Empty states
- Error boundaries
- Toasts/notificaciones
- Modales
- Tablas con paginación

**Prompt para Componente Reutilizable:**
```
Crea un componente Button reutilizable:

VARIANTS: primary, secondary, danger, ghost
SIZES: sm, md, lg
STATES: loading, disabled

Props: variant, size, loading, disabled, children, onClick
Tailwind con clsx o tailwind-merge
```

---

## Buenas Prácticas

1. **Componentes pequeños** - Una responsabilidad
2. **Tipos explícitos** - TypeScript para todo
3. **Estilos consistentes** - Design tokens en Tailwind config
4. **Accesibilidad** - aria-labels, roles, keyboard nav
5. **Performance** - useMemo, useCallback cuando corresponda

---

*Módulo 03 - Frontend con IA*
*Tier 1 - Desarrollo de Software*
