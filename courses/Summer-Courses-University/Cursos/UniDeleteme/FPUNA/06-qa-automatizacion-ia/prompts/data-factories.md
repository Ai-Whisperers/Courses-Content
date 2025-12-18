# Prompts para Data Factories
## Templates para Generar Datos de Prueba

---

## Prompt 1: Factory de Usuario

```markdown
Genera una factory de datos de prueba para usuarios.

**Interface:**
```typescript
interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  role: 'admin' | 'user' | 'guest';
  isActive: boolean;
  createdAt: Date;
}

interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}
```

**Requisitos:**
1. Usar @faker-js/faker para datos realistas
2. Función createUser(overrides?) con valores por defecto
3. Función createUsers(count) para múltiples
4. Email debe contener firstName para ser realista
5. Password seguro (min 12 chars)
6. Presets para casos comunes:
   - createAdminUser()
   - createInactiveUser()
   - createUserWithAddress()

**Localización:** Datos para Paraguay (ciudades, formatos)

**Ejemplo de uso:**
```typescript
const user = createUser();
const admin = createAdminUser();
const custom = createUser({ email: 'custom@test.com', role: 'guest' });
const batch = createUsers(10);
```
```

---

## Prompt 2: Factory de Producto

```markdown
Genera una factory para productos de e-commerce.

**Interface:**
```typescript
interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;       // En guaraníes
  originalPrice?: number;
  stock: number;
  category: string;
  subcategory?: string;
  images: string[];
  rating: number;      // 0-5
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
}
```

**Presets necesarios:**
- createProduct() - producto básico
- createExpensiveProduct() - precio > 1,000,000 Gs
- createCheapProduct() - precio < 50,000 Gs
- createOutOfStockProduct() - stock: 0
- createDiscountedProduct() - con precio original mayor
- createFeaturedProduct() - isFeatured: true
- createProducts(count) - múltiples

**Consideraciones:**
- SKU único (ej: "PROD-XXXX")
- Precios en guaraníes realistas
- Categorías de e-commerce paraguayo
- URLs de imágenes placeholder válidas
```

---

## Prompt 3: Factory de Orden

```markdown
Genera factory para órdenes/pedidos.

**Interfaces:**
```typescript
interface Order {
  id: string;
  orderNumber: string;  // ORD-YYYYMMDD-XXXX
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'transfer';
```

**Funciones:**
- createOrder(overrides?) - con 1-3 items por defecto
- createOrderWithItems(items: OrderItem[])
- createPendingOrder()
- createCompletedOrder()
- createCancelledOrder()
- createLargeOrder() - 10+ items

**Cálculos:**
- subtotal = suma de items
- tax = subtotal * 0.10 (IVA 10%)
- total = subtotal + tax + shipping
```

---

## Prompt 4: Factory Builder Pattern

```markdown
Genera factories usando el patrón Builder para mayor flexibilidad.

**Ejemplo de uso deseado:**
```typescript
const user = new UserBuilder()
  .withEmail('custom@test.com')
  .withRole('admin')
  .active()
  .withAddress()
  .build();

const product = new ProductBuilder()
  .withName('Custom Product')
  .withPrice(150000)
  .outOfStock()
  .featured()
  .build();
```

**Requisitos:**
- Cada método retorna `this` para chaining
- Método build() retorna el objeto final
- Valores por defecto sensatos
- Métodos descriptivos (active(), outOfStock(), etc.)
- Validación en build() si es necesario
```

---

## Prompt 5: Factory con Relaciones

```markdown
Genera factories para entidades relacionadas.

**Modelo:**
- User tiene muchos Orders
- Order tiene muchos OrderItems
- OrderItem pertenece a Product
- Product pertenece a Category

**Factories necesarias:**
```typescript
// Factory principal que crea todo el grafo
function createUserWithOrders(orderCount: number): UserWithOrders {
  const user = createUser();
  const orders = createOrders(orderCount, { userId: user.id });
  return { user, orders };
}

// Factory que crea orden con productos existentes
function createOrderForProducts(products: Product[]): Order {
  const items = products.map(p => createOrderItem({ productId: p.id }));
  return createOrder({ items });
}

// Factory con contexto
function createTestScenario(): TestScenario {
  const categories = createCategories(3);
  const products = categories.flatMap(c =>
    createProducts(5, { categoryId: c.id })
  );
  const users = createUsers(10);
  const orders = users.flatMap(u =>
    createOrders(2, { userId: u.id, items: ... })
  );

  return { categories, products, users, orders };
}
```
```

---

## Prompt 6: Factory con Validación

```markdown
Genera factory que produzca datos válidos e inválidos para testing.

**Para formulario de registro:**
```typescript
interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  acceptTerms: boolean;
}

// Reglas de validación:
// - email: formato válido, único
// - password: min 8 chars, 1 mayúscula, 1 número
// - confirmPassword: debe coincidir
// - firstName/lastName: min 2 chars, solo letras
// - phone: formato paraguayo (+595 9XX XXX XXX)
// - acceptTerms: debe ser true
```

**Factories necesarias:**
```typescript
createValidRegistration()     // Todos los campos válidos
createInvalidEmail()          // Email mal formado
createWeakPassword()          // Password sin requisitos
createMismatchedPasswords()   // Passwords no coinciden
createShortName()             // Nombre muy corto
createInvalidPhone()          // Teléfono mal formado
createWithoutTerms()          // acceptTerms: false
createEmptyFields()           // Campos vacíos

// Generar múltiples casos inválidos
createInvalidRegistrations(): { data: RegistrationData; errorField: string }[]
```
```

---

## Prompt 7: Factory para Tests de API

```markdown
Genera factories optimizadas para tests de API.

**Requisitos:**
1. Datos que representen payloads de API
2. Separar datos de creación (sin id) de datos completos (con id)
3. Generar datos que pasen validación de backend

**Interfaces:**
```typescript
// Para enviar a API (sin campos auto-generados)
interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

// Respuesta de API (con campos generados)
interface UserResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;  // ISO string
  updatedAt: string;
}

// Para updates parciales
interface UpdateUserDto {
  email?: string;
  name?: string;
}
```

**Factories:**
```typescript
// Para crear
createUserPayload(): CreateUserDto

// Para simular respuesta
createUserResponse(id?: number): UserResponse

// Para updates
createUserUpdate(): UpdateUserDto

// Convertir entre formatos
toApiPayload(user: User): CreateUserDto
fromApiResponse(response: UserResponse): User
```
```

---

## Prompt 8: Factory Seeder

```markdown
Genera un seeder que use las factories para poblar datos de prueba.

**Uso:**
```typescript
// Crear datos para ambiente de testing
await seedTestData({
  users: 50,
  products: 200,
  orders: 100,
});

// Limpiar después
await cleanupTestData();
```

**Requisitos:**
- Crear datos en orden correcto (categorías antes que productos)
- Mantener referencias válidas entre entidades
- Guardar IDs creados para cleanup
- Opción de crear escenarios específicos

**Escenarios predefinidos:**
```typescript
await seedScenario('empty-store');    // Sin productos
await seedScenario('flash-sale');     // Muchos descuentos
await seedScenario('out-of-stock');   // Todo sin stock
await seedScenario('single-user');    // Un usuario con muchos pedidos
```
```

---

## Código Base Reutilizable

### Setup de Faker

```typescript
// data/factories/setup.ts
import { faker } from '@faker-js/faker';

// Configurar locale si necesario
faker.locale = 'es';

// Seed para reproducibilidad (opcional)
export function setFactorySeed(seed: number) {
  faker.seed(seed);
}

// Helpers comunes
export const randomId = () => faker.string.uuid();
export const randomDate = () => faker.date.past();
export const randomPrice = (min = 10000, max = 500000) =>
  faker.number.int({ min, max });
```

### Estructura de Factory

```typescript
// data/factories/userFactory.ts
import { faker } from '@faker-js/faker';

interface User { /* ... */ }

export function createUser(overrides: Partial<User> = {}): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const defaults: User = {
    id: faker.string.uuid(),
    email: faker.internet.email({ firstName, lastName }),
    // ... más campos
  };

  return { ...defaults, ...overrides };
}

export function createUsers(count: number, overrides?: Partial<User>): User[] {
  return Array.from({ length: count }, () => createUser(overrides));
}

// Presets
export const createAdminUser = () => createUser({ role: 'admin' });
export const createInactiveUser = () => createUser({ isActive: false });
```

---

*Ver también: prompts/fixtures.md*
