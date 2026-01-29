# Tutorial: Generación de Test Data con IA
## Módulo 05: IA para QA

**Duración**: 50 minutos  
**Nivel**: Intermedio-Avanzado  
**Prerequisitos**: Modules 01-04, OpenCode configurado

---

## El Problema: Crear Test Data Manualmente

### Escenario Típico de QA

```
❌ SIN IA:
Necesitas probar inscripción con 1,000 estudiantes:
- Escribir JSON manualmente: 2,000+ líneas
- Asegurar datos realistas (CI, nombres, emails FPUNA)
- ⏱️ Tiempo: 4-6 horas

✅ CON IA:
Describir requisitos en prompt
IA genera datos realistas + factories
⏱️ Tiempo: 15 minutos
```

### Beneficios Reales

| Tarea | Manual | Con IA | Ahorro |
|------|--------|--------|--------|
| 100 usuarios | 30 min | 2 min | **15x** |
| 500 productos | 2 horas | 10 min | **12x** |
| 1000 transacciones | 5 horas | 20 min | **15x** |
| Validaciones | 1 hora | 5 min | **12x** |

---

## Parte 1: Factory Functions con Faker.js y IA

### Concepto: Test Data Factories

**Factory = Función que genera datos aleatorios pero realistas**

```typescript
// Sin factory (manual, repetitivo)
const usuario1 = { nombre: 'Juan', apellido: 'González', ci: '3.456.789' };
const usuario2 = { nombre: 'María', apellido: 'López', ci: '2.345.678' };
// ... 98 usuarios más

// Con factory (automático, reutilizable)
function createUsuario(overrides?: Partial<Usuario>) {
  return { nombre, apellido, ci, ...overrides };
}

const usuarios = Array.from({ length: 100 }, () => createUsuario());
```

### Ejemplo 1: Factory de Usuarios Paraguayos

**Prompt a OpenCode**:
```
Crea factory Faker de usuarios para sistema FPUNA en TypeScript:

REQUISITOS:
- Nombres/apellidos paraguayos realistas
- CI válida formato: X.XXX.XXX
- Email: @fpuna.edu.py
- Teléfono: +595 XXX XXXXXX
- Carreras: Informática, Civil, Electrónica, Industrial, Aeronáutica
- Fechas nacimiento: 18-60 años
- Género balanceado

EXPORTAR:
1. Interfaz Usuario
2. Factory function createUsuario()
3. Batch function crearUsuarios(count)
4. Array pre-generado USUARIOS_TEST (100)
5. Helpers: getByCarrera(), getByGenero(), getRandom()

TypeScript, comentarios en español, exportable.
```

**OpenCode genera** (`users.factory.ts`):

```typescript
// test-data/users.factory.ts
import { faker } from '@faker-js/faker/locale/es';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  ci: string;
  email: string;
  telefono: string;
  carrera: string;
  fechaNacimiento: string;
  genero: 'M' | 'F';
  direccion: string;
  ciudad: string;
  activo: boolean;
}

// Datos paraguayos realistas
const NOMBRES_M = ['Carlos', 'José', 'Juan', 'Luis', 'Miguel', 'Fernando', 'Pedro', 'Diego'];
const NOMBRES_F = ['María', 'Ana', 'Carmen', 'Laura', 'Patricia', 'Isabel', 'Rosa', 'Carolina'];
const APELLIDOS = ['González', 'Rodríguez', 'López', 'Martínez', 'Benítez', 'Ramírez', 'Silva', 'Acosta'];

const CARRERAS = [
  'Ingeniería Informática',
  'Ingeniería Civil',
  'Ingeniería Electrónica',
  'Ingeniería Industrial',
  'Ingeniería Aeronáutica',
];

const CIUDADES = ['Asunción', 'San Lorenzo', 'Luque', 'Capiatá', 'Limpio'];

/**
 * Generador de CI paraguaya válida
 * Formato: X.XXX.XXX (7-8 dígitos)
 */
function generarCI(): string {
  const numero = faker.number.int({ min: 1000000, max: 9999999 });
  return numero.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

/**
 * Factory principal para crear usuario
 */
export function createUsuario(overrides?: Partial<Usuario>): Usuario {
  const genero = faker.helpers.arrayElement(['M', 'F'] as const);
  const nombre = genero === 'M'
    ? faker.helpers.arrayElement(NOMBRES_M)
    : faker.helpers.arrayElement(NOMBRES_F);
  const apellido = faker.helpers.arrayElement(APELLIDOS);
  const carrera = faker.helpers.arrayElement(CARRERAS);

  const usuario: Usuario = {
    id: faker.number.int({ min: 1, max: 100000 }),
    nombre,
    apellido,
    ci: generarCI(),
    email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@fpuna.edu.py`,
    telefono: `+595 ${faker.number.int({ min: 900, max: 999 })} ${faker.number.int({ min: 100000, max: 999999 })}`,
    carrera,
    fechaNacimiento: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0],
    genero,
    direccion: `${faker.location.street()} ${faker.number.int({ min: 100, max: 999 })}`,
    ciudad: faker.helpers.arrayElement(CIUDADES),
    activo: faker.datatype.boolean({ probability: 0.9 }),
  };

  return { ...usuario, ...overrides };
}

/**
 * Generar múltiples usuarios
 */
export function crearUsuarios(count: number): Usuario[] {
  return Array.from({ length: count }, () => createUsuario());
}

/**
 * 100 usuarios pre-generados para tests
 */
export const USUARIOS_TEST = crearUsuarios(100);

// ===== HELPERS =====

export function getUsuarioByCarrera(carrera: string): Usuario | undefined {
  return USUARIOS_TEST.find(u => u.carrera === carrera);
}

export function getUsuariosByGenero(genero: 'M' | 'F'): Usuario[] {
  return USUARIOS_TEST.filter(u => u.genero === genero);
}

export function getUsuarioRandom(): Usuario {
  return faker.helpers.arrayElement(USUARIOS_TEST);
}

export function getUsuariosActivos(): Usuario[] {
  return USUARIOS_TEST.filter(u => u.activo);
}

export function getUsuariosByCarreraYGenero(carrera: string, genero: 'M' | 'F'): Usuario[] {
  return USUARIOS_TEST.filter(u => u.carrera === carrera && u.genero === genero);
}
```

**Usar en tests**:

```typescript
// tests/inscripcion.spec.ts
import { test, expect } from '@playwright/test';
import { createUsuario, USUARIOS_TEST, getUsuarioRandom } from '../test-data/users.factory';

test('inscribir usuario nuevo', async ({ page }) => {
  // Generar usuario único
  const usuario = createUsuario({ activo: true });

  await page.goto('/inscripcion');
  await page.getByLabel('Nombre').fill(usuario.nombre);
  await page.getByLabel('Apellido').fill(usuario.apellido);
  await page.getByLabel('CI').fill(usuario.ci);
  await page.getByLabel('Email').fill(usuario.email);
  await page.selectOption('select[name="carrera"]', usuario.carrera);

  await page.click('button:has-text("Inscribirse")');

  await expect(page.getByText('Inscripción exitosa')).toBeVisible();
});

test('validar 100 estudiantes batch', async ({ request }) => {
  // Probar con todos los usuarios pre-generados
  for (const usuario of USUARIOS_TEST) {
    const response = await request.post('/api/validar-estudiante', {
      data: usuario,
    });

    expect(response.status()).toBe(200);
  }
});

test('filtrar por carrera', async ({ page }) => {
  const usuario = getUsuarioByCarrera('Ingeniería Informática');
  expect(usuario).toBeDefined();
  expect(usuario?.carrera).toBe('Ingeniería Informática');
});
```

---

## Parte 2: Productos y Catálogo

### Factory de Productos E-commerce

**Prompt**:
```
Crea factory de productos para tienda FPUNA:

CATEGORÍAS:
- Electrónicos (notebooks, tablets)
- Libros (por carrera)
- Uniformes (FPUNA branded)
- Papelería

REQUISITOS:
- Precios realistas en Guaraní (₲)
- Nombres descriptivos
- Stock: 0-100 unidades
- Descripciones en español
- 200 productos total
- Exportar como factory + array

Faker + TypeScript + comentarios españoles.
```

**Código generado**:

```typescript
// test-data/products.factory.ts
import { faker } from '@faker-js/faker/locale/es';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number; // En Guaraní
  stock: number;
  categoria: 'electronica' | 'libros' | 'uniformes' | 'papeleria';
  imagen: string;
  rating: number; // 1-5
  descuento: number; // 0-50%
}

const PRODUCTOS_ELECTRONICA = [
  'Notebook Dell Inspiron 15',
  'Tablet Samsung Galaxy Tab A7',
  'Monitor LG 27" Full HD',
  'Teclado Mecánico Redragon',
  'Mouse Inalámbrico Logitech',
];

const PRODUCTOS_LIBROS = [
  'Cálculo I - James Stewart',
  'Física General - Serway',
  'Programación en C - Brian Kernighan',
  'Circuitos Eléctricos - Nilsson',
  'Dinámica de Fluidos - Anderson',
];

const PRODUCTOS_UNIFORMES = [
  'Remera FPUNA Oficial',
  'Buzo FPUNA Deportivo',
  'Gorra FPUNA Azul',
  'Mochila FPUNA 30L',
  'Bolso FPUNA Negro',
];

const PRODUCTOS_PAPELERIA = [
  'Carpeta A4 FPUNA',
  'Cuaderno Profesional 200 hojas',
  'Bolígrafo BIC Azul (caja 50)',
  'Papel Bond A4 500 hojas',
  'Marcadores Permanentes',
];

export function createProducto(overrides?: Partial<Producto>): Producto {
  const categorias = ['electronica', 'libros', 'uniformes', 'papeleria'] as const;
  const categoria = faker.helpers.arrayElement(categorias);

  let nombre: string;
  let precioBase: number;

  switch (categoria) {
    case 'electronica':
      nombre = faker.helpers.arrayElement(PRODUCTOS_ELECTRONICA);
      precioBase = faker.number.int({ min: 500000, max: 5000000 });
      break;
    case 'libros':
      nombre = faker.helpers.arrayElement(PRODUCTOS_LIBROS);
      precioBase = faker.number.int({ min: 80000, max: 250000 });
      break;
    case 'uniformes':
      nombre = faker.helpers.arrayElement(PRODUCTOS_UNIFORMES);
      precioBase = faker.number.int({ min: 50000, max: 200000 });
      break;
    case 'papeleria':
      nombre = faker.helpers.arrayElement(PRODUCTOS_PAPELERIA);
      precioBase = faker.number.int({ min: 10000, max: 80000 });
      break;
  }

  const producto: Producto = {
    id: faker.number.int({ min: 1, max: 100000 }),
    nombre,
    descripcion: faker.lorem.sentences(2),
    precio: precioBase,
    stock: faker.number.int({ min: 0, max: 100 }),
    categoria,
    imagen: `/images/${categoria}/${faker.number.int({ min: 1, max: 10 })}.jpg`,
    rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    descuento: faker.helpers.maybe(() => faker.number.int({ min: 5, max: 40 }), { probability: 0.3 }) || 0,
  };

  return { ...producto, ...overrides };
}

export function crearProductos(count: number): Producto[] {
  return Array.from({ length: count }, () => createProducto());
}

export const PRODUCTOS_TEST = crearProductos(200);

export function getProductosByCategoria(categoria: string): Producto[] {
  return PRODUCTOS_TEST.filter(p => p.categoria === categoria);
}

export function getProductosEnStock(): Producto[] {
  return PRODUCTOS_TEST.filter(p => p.stock > 0);
}

export function getProductosConDescuento(): Producto[] {
  return PRODUCTOS_TEST.filter(p => p.descuento > 0);
}

export function getProductoRandom(): Producto {
  return faker.helpers.arrayElement(PRODUCTOS_TEST);
}
```

---

## Parte 3: Test Data para Órdenes y Transacciones

### Factory de Órdenes

```typescript
// test-data/orders.factory.ts
import { faker } from '@faker-js/faker/locale/es';
import { createUsuario, Usuario } from './users.factory';
import { createProducto, Producto } from './products.factory';

export interface OrdenItem {
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Orden {
  id: string;
  usuarioId: number;
  usuario: Usuario;
  items: OrdenItem[];
  subtotal: number;
  impuesto: number;
  descuento: number;
  total: number;
  estado: 'pendiente' | 'confirmada' | 'enviada' | 'entregada' | 'cancelada';
  fechaCreacion: string;
  fechaEntrega?: string;
  metodoPago: 'tarjeta' | 'efectivo' | 'transferencia';
  direccionEntrega: string;
}

export function createOrden(overrides?: Partial<Orden>): Orden {
  const usuario = createUsuario();
  const cantidadItems = faker.number.int({ min: 1, max: 5 });
  const items: OrdenItem[] = Array.from({ length: cantidadItems }, () => {
    const producto = createProducto();
    const cantidad = faker.number.int({ min: 1, max: 3 });
    return {
      productoId: producto.id,
      cantidad,
      precioUnitario: producto.precio,
      subtotal: producto.precio * cantidad,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const descuento = faker.helpers.maybe(() => Math.floor(subtotal * 0.1), { probability: 0.2 }) || 0;
  const impuesto = Math.floor((subtotal - descuento) * 0.1);
  const total = subtotal - descuento + impuesto;

  const estados = ['pendiente', 'confirmada', 'enviada', 'entregada', 'cancelada'] as const;

  const orden: Orden = {
    id: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
    usuarioId: usuario.id,
    usuario,
    items,
    subtotal,
    impuesto,
    descuento,
    total,
    estado: faker.helpers.arrayElement(estados),
    fechaCreacion: faker.date.past({ years: 1 }).toISOString(),
    fechaEntrega: faker.date.future({ years: 1 }).toISOString(),
    metodoPago: faker.helpers.arrayElement(['tarjeta', 'efectivo', 'transferencia'] as const),
    direccionEntrega: `${faker.location.street()}, ${usuario.ciudad}`,
  };

  return { ...orden, ...overrides };
}

export function crearOrdenes(count: number): Orden[] {
  return Array.from({ length: count }, () => createOrden());
}

export const ORDENES_TEST = crearOrdenes(50);
```

---

## Parte 4: Validación de Test Data

### Esquemas con Zod

**Prompt**:
```
Crea schemas de validación con Zod para:
- Usuario (validar CI paraguaya)
- Producto (precio positivo, stock >= 0)
- Orden (total = subtotal + impuesto - descuento)

Incluir validaciones custom paraguayas.
```

**Código**:

```typescript
// test-data/schemas.ts
import { z } from 'zod';

// Validación de CI paraguaya
const CIParaguaya = z.string().regex(/^\d\.\d{3}\.\d{3}$/, 'CI inválida');

export const UsuarioSchema = z.object({
  id: z.number().positive(),
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  ci: CIParaguaya,
  email: z.string().email().endsWith('@fpuna.edu.py'),
  telefono: z.string().regex(/^\+595 \d{3} \d{6}$/),
  carrera: z.enum(['Ingeniería Informática', 'Ingeniería Civil', 'Ingeniería Electrónica', 'Ingeniería Industrial', 'Ingeniería Aeronáutica']),
  activo: z.boolean(),
});

export const ProductoSchema = z.object({
  id: z.number().positive(),
  nombre: z.string().min(3),
  precio: z.number().positive(),
  stock: z.number().int().min(0),
  categoria: z.enum(['electronica', 'libros', 'uniformes', 'papeleria']),
  descuento: z.number().min(0).max(50),
});

export const OrdenSchema = z.object({
  id: z.string().startsWith('ORD-'),
  usuario: UsuarioSchema,
  items: z.array(z.object({
    productoId: z.number(),
    cantidad: z.number().positive(),
    subtotal: z.number().positive(),
  })),
  total: z.number().positive(),
  estado: z.enum(['pendiente', 'confirmada', 'enviada', 'entregada', 'cancelada']),
}).refine(orden => {
  // Validación custom: total debe ser consistente
  const calculado = orden.items.reduce((sum, item) => sum + item.subtotal, 0);
  return Math.abs(orden.total - calculado) < 100; // Margen para impuestos/descuentos
}, {
  message: "Total de orden no coincide con items",
  path: ["total"],
});

// Usar en tests
export function validarUsuario(usuario: unknown): boolean {
  const resultado = UsuarioSchema.safeParse(usuario);
  if (!resultado.success) {
    console.error('Errores de validación:', resultado.error);
    return false;
  }
  return true;
}
```

---

## Parte 5: Mejores Prácticas

### ✅ HACER

```typescript
// ✅ Usar factories reutilizables
const usuario = createUsuario({ email: 'custom@fpuna.edu.py' });

// ✅ Generar datos variados
const usuarios = crearUsuarios(100);

// ✅ Usar helpers para casos específicos
const informaticos = getUsuariosByCarrera('Ingeniería Informática');

// ✅ Validar datos generados
expect(validarUsuario(usuario)).toBe(true);

// ✅ Usar arrays pre-generados en tests batch
for (const usuario of USUARIOS_TEST) {
  // test
}
```

### ❌ NO HACER

```typescript
// ❌ Hardcodear datos
const usuario = { nombre: 'Juan', ci: '1.234.567' };

// ❌ Reutilizar mismo usuario en múltiples tests
const usuario = createUsuario();
test('test 1', () => { /* usa usuario */ });
test('test 2', () => { /* usa mismo usuario */ });

// ❌ Datos poco realistas
const usuario = { nombre: 'X', ci: '123' };

// ❌ No validar datos generados
const usuario = createUsuario(); // Sin verificar que sea válido
```

---

## Resumen

**Con IA + Faker.js** logras:

✅ 1,000 usuarios realistas en **1 minuto**  
✅ 200 productos con variedad en **2 minutos**  
✅ 100 órdenes complejas en **3 minutos**  
✅ Validaciones automáticas  
✅ Datos reutilizables en todos tus tests  

---

*Tutorial: AI Test Data Generation - Módulo 05 IA para QA - FPUNA 2026*
