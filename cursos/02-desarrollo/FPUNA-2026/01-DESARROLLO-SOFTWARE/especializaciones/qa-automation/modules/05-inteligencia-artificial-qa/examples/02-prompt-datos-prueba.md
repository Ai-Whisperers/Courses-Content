# OpenCode Prompt: Generación de Test Data
## Módulo 05: IA para QA

Use this prompt to generate realistic test data factories for your tests.

---

## PROMPT SIMPLE

```
Crea factories Faker para:

ENTIDADES:
- [Entidad 1] con campos [campo1, campo2]
- [Entidad 2] con campos [campo1, campo2]

REQUISITOS:
- Datos realistas (Paraguay)
- Validaciones Zod
- Exportar como TypeScript
- 100 registros pre-generados
```

---

## PROMPT AVANZADO (RECOMENDADO)

```
Genera FACTORIES COMPLETAS de test data para FPUNA en TypeScript:

═══════════════════════════════════════
CONTEXTO DEL PROYECTO
═══════════════════════════════════════

Sistema: [NOMBRE_SISTEMA]
Framework: Playwright + TypeScript
Entorno: Paraguay

═══════════════════════════════════════
ENTIDADES A GENERAR (TODAS)
═══════════════════════════════════════

1️⃣ USUARIOS ESTUDIANTES
   Campos: id, nombre, apellido, ci, email, telefono, carrera, fechaNacimiento, genero, direccion, ciudad, activo
   Cantidad: 100 registros
   Contexto: Carreras FPUNA (Informática, Civil, Electrónica, Industrial, Aeronáutica)
   Validaciones: CI paraguaya formato "X.XXX.XXX", email @fpuna.edu.py, teléfono +595 XXX XXXXXX

2️⃣ USUARIOS PROFESORES
   Campos: id, nombre, apellido, ci, email, especialidad, universidad, activo
   Cantidad: 50 registros
   Contexto: Especialidades técnicas FPUNA

3️⃣ PRODUCTOS (E-COMMERCE)
   Campos: id, nombre, descripcion, precio, stock, categoria, imagen, rating, descuento
   Cantidad: 200 registros
   Categorías: electronica, libros, uniformes, papeleria
   Precios: Guaraní (₲) realistas
   Validaciones: precio > 0, stock >= 0, descuento 0-50

4️⃣ ÓRDENES DE COMPRA
   Campos: id, usuarioId, items[], subtotal, impuesto, descuento, total, estado, fechaCreacion, metodoPago
   Cantidad: 50 registros
   Estados: pendiente, confirmada, enviada, entregada, cancelada
   Validaciones: total = subtotal + impuesto - descuento

5️⃣ INSCRIPCIONES A CURSOS
   Campos: id, usuarioId, cursoId, fechaInscripcion, estado, calificacion, asistencia
   Cantidad: 100 registros
   Estados: pendiente, activa, completada, cancelada
   Calificaciones: 0-5 (o NULL si no completado)

═══════════════════════════════════════
REQUISITOS LOCALES PARAGUAY
═══════════════════════════════════════

NOMBRES Y APELLIDOS:
- Usar nombres comunes paraguayos reales
- Géneros balanceados (50% M, 50% F)
- Nombres diferentes para cada registro

CI PARAGUAYA:
- Formato: X.XXX.XXX (7-8 dígitos)
- Rango válido: 1.000.000 - 9.999.999
- Ejemplo: 3.456.789, 1.234.567

EMAILS:
- Dominio: @fpuna.edu.py
- Formato: [nombre].[apellido]@fpuna.edu.py (lowercase)
- Ejemplo: juan.perez@fpuna.edu.py

TELÉFONOS:
- Formato: +595 [operador] [número]
- Operadores: 971, 972, 973, 974, 975, 976, 981, 982, 983, 984, 985, 986
- Ejemplo: +595 971 234567

MONEDA:
- Símbolo: ₲ (Guaraní)
- Productos electrónica: ₲500.000 - ₲5.000.000
- Libros: ₲80.000 - ₲250.000
- Uniformes: ₲50.000 - ₲200.000
- Papelería: ₲10.000 - ₲80.000

CIUDADES:
- Asunción, San Lorenzo, Luque, Capiatá, Lambaré, Fernando de la Mora, Limpio, Ñemby, Villa Elisa, Mariano Roque Alonso

CARRERAS FPUNA:
- Ingeniería Informática
- Ingeniería Civil
- Ingeniería Electrónica
- Ingeniería Industrial
- Ingeniería Aeronáutica

═══════════════════════════════════════
ESTRUCTURA DE ARCHIVOS
═══════════════════════════════════════

Crear directorio: test-data/
Archivos a generar:

1. test-data/users.factory.ts
   - Interfaces: Usuario
   - Factory: createUsuario()
   - Batch: crearUsuarios(count)
   - Array: USUARIOS_TEST (100)
   - Helpers: getByCarrera(), getByGenero(), getRandom()

2. test-data/products.factory.ts
   - Interface: Producto
   - Factory: createProducto()
   - Batch: crearProductos(count)
   - Array: PRODUCTOS_TEST (200)
   - Helpers: getByCategoria(), getEnStock(), getConDescuento()

3. test-data/orders.factory.ts
   - Interface: Orden
   - Factory: createOrden()
   - Batch: crearOrdenes(count)
   - Array: ORDENES_TEST (50)
   - Helpers: getByEstado(), getPorUsuario()

4. test-data/schemas.ts
   - Zod schemas para validación
   - Validaciones custom (CI, email, etc)
   - Funciones validate*()

5. test-data/index.ts
   - Exportar todas las factories y helpers

═══════════════════════════════════════
TECNOLOGÍAS Y DEPENDENCIAS
═══════════════════════════════════════

Usar:
- @faker-js/faker (data generation)
- zod (schema validation)
- TypeScript strict mode

Importes:
import { faker } from '@faker-js/faker/locale/es';
import { z } from 'zod';

═══════════════════════════════════════
VALIDACIONES REQUERIDAS
═══════════════════════════════════════

✅ Crear Zod schemas para:
   - CI paraguaya válida
   - Email @fpuna.edu.py
   - Teléfono formato +595
   - Precios positivos
   - Stock >= 0
   - Órdenes: total = subtotal + impuesto - descuento

✅ Funciones de validación:
   - validarUsuario(usuario)
   - validarProducto(producto)
   - validarOrden(orden)

═══════════════════════════════════════
HELPERS Y UTILITIES
═══════════════════════════════════════

PARA USUARIOS:
- getUsuarioByCarrera(carrera): Usuario | undefined
- getUsuariosByGenero(genero): Usuario[]
- getUsuarioRandom(): Usuario
- getUsuariosActivos(): Usuario[]

PARA PRODUCTOS:
- getProductosByCategoria(categoria): Producto[]
- getProductosEnStock(): Producto[]
- getProductosConDescuento(): Producto[]
- getProductoRandom(): Producto

PARA ÓRDENES:
- getOrdenByEstado(estado): Orden[]
- getOrdenByUsuario(usuarioId): Orden[]
- getOrdenRandom(): Orden

═══════════════════════════════════════
COMENTARIOS Y DOCUMENTACIÓN
═══════════════════════════════════════

✅ Comentarios en español para:
   - Interfases (qué representa)
   - Factories (qué genera)
   - Helpers (qué hace)
   - Validaciones (qué valida)

✅ Ejemplos de uso en comentarios

═══════════════════════════════════════
SALIDA ESPERADA
═══════════════════════════════════════

Archivos generados: 5
Líneas totales: 1000+
Registros pre-generados: 500+

Listo para usar en tests:
import { createUsuario, USUARIOS_TEST, getUsuarioRandom } from '../test-data';

const usuario = createUsuario();
const usuarios = USUARIOS_TEST;
const random = getUsuarioRandom();
```

---

## CASOS DE USO

### 1️⃣ Generar Solo Usuarios
```
Crea factory de usuarios FPUNA:

CAMPOS:
- id (numérico)
- nombre (string, nombres paraguayos)
- apellido (string, apellidos paraguayos)
- ci (string, formato X.XXX.XXX)
- email (@fpuna.edu.py)
- telefono (+595 XXX XXXXXX)
- carrera (enum: Informática, Civil, Electrónica, Industrial, Aeronáutica)
- fechaNacimiento (18-60 años)
- genero (M/F balanceado)
- ciudad (ciudades paraguayas)
- activo (boolean, 90% true)

EXPORTAR:
- createUsuario(overrides?) function
- crearUsuarios(count) batch
- USUARIOS_TEST array de 100
- Helpers: getByCarrera, getByGenero, getRandom
```

### 2️⃣ Generar Datos para E-commerce
```
Crea factories para tienda online FPUNA:

1. Productos (200)
   - 4 categorías
   - Precios en Guaraní realistas
   - Stock variable
   - Descripciones en español

2. Órdenes (50)
   - 1-5 items cada una
   - Cálculo automático de totales
   - Estados variados
   - Usuarios asociados

VALIDACIONES:
- precio > 0
- stock >= 0
- total consistency
```

### 3️⃣ Migrar Schema Existente
```
El schema de usuarios cambió.

ANTES:
{ id, nombre, email, activo }

DESPUÉS:
{ id, nombre, email, activo, perfil, carrera? }

Actualiza factory para:
- Agregar perfil ('estudiante'|'profesor')
- Agregar carrera (opcional si profesor)
- Mantener compatibilidad backward si es posible
```

---

## VARIABLES CLAVE

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `NOMBRES_M` | Nombres masculinos | ['Carlos', 'José', 'Juan'] |
| `NOMBRES_F` | Nombres femeninos | ['María', 'Ana', 'Laura'] |
| `APELLIDOS` | Apellidos paraguayos | ['González', 'Rodríguez', 'López'] |
| `CARRERAS` | Carreras FPUNA | ['Informática', 'Civil'] |
| `CIUDADES` | Ciudades PY | ['Asunción', 'Luque'] |

---

*OpenCode Prompt: Test Data Generation - Módulo 05 IA para QA - FPUNA 2026*
