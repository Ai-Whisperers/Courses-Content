# Web Dev Track Module 2: Advanced Frontend Development
## FPUNA Summer 2026 - Week 5 (Web Development Specialization)

**Duration**: 10 hours (Week 5 of program)  
**Tool Focus**: React Advanced Patterns + OpenCode  
**Prerequisites**: Core Modules 1-6, Web Module 1 completed

---

## Module Overview

You've built basic Next.js applications. This week, you'll master advanced frontend patterns that separate junior from senior developers: complex state management, form handling, performance optimization, real-time updates, and building reusable component libraries. You'll use OpenCode to accelerate implementation while learning professional-grade React patterns.

### Learning Objectives

By the end of this week, you will be able to:

1. **Manage** complex application state with Zustand
2. **Build** robust forms with React Hook Form and Zod validation
3. **Implement** real-time features with Server-Sent Events
4. **Optimize** performance with React patterns and Next.js features
5. **Create** reusable component libraries
6. **Handle** file uploads and image optimization
7. **Build** responsive, accessible UIs

---

## 2.1 State Management with Zustand

### Why State Management Matters

```
Without State Management:
- Props drilling through 5+ components
- State scattered across components
- Hard to debug
- Duplicated state logic

With Zustand:
- Centralized state
- Access from any component
- Easy debugging
- Single source of truth
```

---

### Setting Up Zustand

```bash
npm install zustand
```

---

### Creating Your First Store

```typescript
// src/store/cartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    
    if (existingItem) {
      return {
        items: state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + item.price
      };
    }

    return {
      items: [...state.items, { ...item, quantity: 1 }],
      totalItems: state.totalItems + 1,
      totalPrice: state.totalPrice + item.price
    };
  }),

  removeItem: (id) => set((state) => {
    const item = state.items.find(i => i.id === id);
    if (!item) return state;

    return {
      items: state.items.filter(i => i.id !== id),
      totalItems: state.totalItems - item.quantity,
      totalPrice: state.totalPrice - (item.price * item.quantity)
    };
  }),

  updateQuantity: (id, quantity) => set((state) => {
    const item = state.items.find(i => i.id === id);
    if (!item) return state;

    const quantityDiff = quantity - item.quantity;

    return {
      items: state.items.map(i =>
        i.id === id ? { ...i, quantity } : i
      ),
      totalItems: state.totalItems + quantityDiff,
      totalPrice: state.totalPrice + (item.price * quantityDiff)
    };
  }),

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 })
}));
```

---

### Using the Store in Components

```typescript
// src/components/AddToCartButton.tsx
'use client';

import { useCartStore } from '@/store/cartStore';

export function AddToCartButton({ product }) {
  const addItem = useCartStore(state => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Agregar al Carrito
    </button>
  );
}

// src/components/CartSummary.tsx
'use client';

import { useCartStore } from '@/store/cartStore';

export function CartSummary() {
  const { totalItems, totalPrice } = useCartStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-2">Resumen del Carrito</h3>
      <p className="text-gray-600">Items: {totalItems}</p>
      <p className="text-2xl font-bold text-blue-600">
        Total: ₲ {totalPrice.toLocaleString('es-PY')}
      </p>
    </div>
  );
}
```

---

### Persisting State with LocalStorage

```typescript
// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ... store implementation
    }),
    {
      name: 'cart-storage', // LocalStorage key
    }
  )
);
```

---

## 2.2 Form Handling with React Hook Form

### Why React Hook Form?

- ✅ Minimal re-renders (better performance)
- ✅ Built-in validation
- ✅ Easy error handling
- ✅ TypeScript support
- ✅ Works with validation libraries (Zod, Yup)

---

### Installation

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

### Basic Form Example

```typescript
// src/components/ProductForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(1, 'El precio debe ser mayor a 0'),
  category: z.string().min(1, 'Seleccione una categoría'),
  inStock: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      inStock: true
    }
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Producto creado exitosamente');
        reset();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del Producto
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Price Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Precio (₲)
        </label>
        <input
          {...register('price', { valueAsNumber: true })}
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría
        </label>
        <select
          {...register('category')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione una categoría</option>
          <option value="Comida Típica">Comida Típica</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Postres">Postres</option>
          <option value="Artesanías">Artesanías</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* In Stock Checkbox */}
      <div className="flex items-center">
        <input
          {...register('inStock')}
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Disponible en stock
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Guardando...' : 'Crear Producto'}
      </button>
    </form>
  );
}
```

---

## 2.3 Real-Time Features with Server-Sent Events

### What are Server-Sent Events?

SSE allows servers to push updates to clients over HTTP.

**Use Cases**:
- Live notifications
- Real-time dashboards
- Live order tracking
- Stock updates

---

### Creating SSE Endpoint

```typescript
// src/app/api/notifications/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`)
      );

      // Send updates every 5 seconds
      const interval = setInterval(() => {
        const notification = {
          type: 'order',
          message: 'Nuevo pedido recibido',
          timestamp: new Date().toISOString()
        };

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(notification)}\n\n`)
        );
      }, 5000);

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    }
  });

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

---

### Consuming SSE in Component

```typescript
// src/components/NotificationBell.tsx
'use client';

import { useEffect, useState } from 'react';

export function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications');

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type !== 'connected') {
        setNotifications(prev => [data, ...prev].slice(0, 10));
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="relative">
      <button className="relative p-2">
        🔔
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isConnected && (
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></span>
      )}
    </div>
  );
}
```

---

## 2.4 Performance Optimization

### Image Optimization with Next.js

```typescript
// src/components/OptimizedProductImage.tsx
import Image from 'next/image';

export function ProductImage({ src, alt, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      priority={priority}
      className="rounded-lg object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
```

**Benefits**:
- ✅ Automatic lazy loading
- ✅ Responsive images
- ✅ WebP/AVIF format
- ✅ Blur placeholder

---

### Code Splitting with Dynamic Imports

```typescript
// src/app/products/page.tsx
import dynamic from 'next/dynamic';

// Load heavy component only when needed
const ProductChart = dynamic(() => import('@/components/ProductChart'), {
  loading: () => <p>Cargando gráfico...</p>,
  ssr: false // Don't render on server
});

export default function ProductsPage() {
  return (
    <div>
      <h1>Productos</h1>
      <ProductChart />
    </div>
  );
}
```

---

### Memoization

```typescript
'use client';

import { useMemo, memo } from 'react';

// Memoize expensive calculations
export function ProductList({ products }) {
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
const ProductCard = memo(({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>₲ {product.price.toLocaleString('es-PY')}</p>
    </div>
  );
});
```

---

## Week 5 Exercises

### Exercise 2.1: Shopping Cart with Zustand (90 min)

**Objective**: Build complete shopping cart functionality

**Tasks**:
1. Create cart store with Zustand (20 min)
2. Implement add/remove/update quantity (25 min)
3. Add localStorage persistence (15 min)
4. Build cart UI component (30 min)

**Deliverable**: Working shopping cart with persistence

---

### Exercise 2.2: Product Management Form (120 min)

**Objective**: Create admin form with validation

**Tasks**:
1. Set up React Hook Form + Zod (15 min)
2. Build product creation form (40 min)
3. Add image upload field (30 min)
4. Implement form validation (20 min)
5. Connect to API (15 min)

**Deliverable**: Complete product management form

---

### Exercise 2.3: Real-Time Dashboard (90 min)

**Objective**: Build live order tracking dashboard

**Tasks**:
1. Create SSE endpoint for orders (30 min)
2. Build notification component (25 min)
3. Create live orders list (25 min)
4. Add connection status indicator (10 min)

**Deliverable**: Real-time order dashboard

---

## Knowledge Check Quiz

1. **What's the main benefit of Zustand?**
   a) Faster rendering
   b) Centralized state management
   c) Better CSS
   d) Automatic API calls

2. **Why use React Hook Form?**
   a) Better colors
   b) Minimal re-renders and built-in validation
   c) Automatic database saves
   d) No JavaScript needed

3. **What are Server-Sent Events for?**
   a) Sending emails
   b) Server pushing updates to clients
   c) File uploads
   d) Database queries

4. **What does Next.js Image component provide?**
   a) Free images
   b) Automatic optimization and lazy loading
   c) Image editing
   d) Social media integration

5. **What does useMemo do?**
   a) Remember user passwords
   b) Cache expensive calculations
   c) Save to database
   d) Create memes

**Answer Key**: [1-b, 2-b, 3-b, 4-b, 5-b]

---

## Week 5 Summary

### Key Concepts
- ✅ State management with Zustand
- ✅ Form handling with React Hook Form
- ✅ Real-time features with SSE
- ✅ Performance optimization patterns
- ✅ Image optimization
- ✅ Code splitting

### Skills Developed
- ✅ Manage complex application state
- ✅ Build robust, validated forms
- ✅ Implement real-time updates
- ✅ Optimize React performance
- ✅ Handle file uploads
- ✅ Build production-ready UIs

---

**Next Module**: [Web Track Module 3 - Backend & APIs](./WEB-TRACK-MODULE-03.md)
