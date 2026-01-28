# Tutorial: Gestión de Datos de Prueba (Test Data Management)
## Módulo 03: Arquitectura de Pruebas

**Duración**: 45 minutos  
**Nivel**: Intermedio-Avanzado  
**Prerequisitos**: Module 01-02, Custom Fixtures (02_Custom_Fixtures_Helpers.md)

---

## El Problema: Datos Contaminados

### Escenario Real

```typescript
// ❌ Test 1: Crear usuario
test('crear usuario', async ({ page }) => {
  await page.goto('/usuarios/nuevo');
  await page.fill('[name="email"]', 'test@fpuna.edu.py');
  await page.fill('[name="nombre"]', 'Usuario Test');
  await page.click('button[type="submit"]');
  
  // Usuario queda en la BD después del test 😢
});

// ❌ Test 2: Buscar usuarios
test('buscar usuarios por nombre', async ({ page }) => {
  // La BD contiene usuarios de test anteriores
  // El test falla porque hay más resultados de lo esperado
  await page.goto('/usuarios');
  await page.fill('[name="buscar"]', 'Usuario');
  
  const resultados = await page.locator('tbody tr').count();
  expect(resultados).toBe(1);  // ❌ Fail: encuentra 5 usuarios de tests pasados
});

// ❌ Test 3: Limite de usuarios
test('mostrar error cuando BD está llena', async ({ page }) => {
  // La BD tiene datos basura de tests anteriores
  // El error ocurre por eso, no por el código
});
```

**Problemas**:
- 🗑️ **Contaminación de datos** - Datos viejos interfieren con tests nuevos
- 🎲 **Tests frágiles** - El resultado depende del historial de ejecuciones
- 🔄 **No reproducible** - Test pasa en CI pero falla localmente
- 📊 **Reportes inexactos** - No sabes qué está fallando realmente

---

## Conceptos Clave

### 1. Ciclo de Vida de Datos de Prueba

```
Inicio del Test
    ↓
PREPARACIÓN: Crear datos necesarios
    ↓
EJECUCIÓN: Test usa esos datos
    ↓
VERIFICACIÓN: Assertions
    ↓
LIMPIEZA: Borrar datos creados
    ↓
Fin del Test (BD limpia para siguiente test)
```

### 2. Estrategias de Datos

| Estrategia | Uso | Ventajas |
|------------|-----|----------|
| **Factory** | Crear datos bajo demanda | Flexible, reutilizable |
| **Fixture** | Datos predeterminados | Rápido, simple |
| **Seeder** | Datos iniciales en BD | Datos realistas |
| **Cleanup** | Borrar después del test | BD siempre limpia |

### 3. Niveles de Datos

```
BD Real (servidor)
    ↓
- Datos globales (usuarios, configs)
- Datos de test (creados por fixtures)
- Datos temporales (durante test)

Navegador (cliente)
    ↓
- Local storage
- Session storage
- IndexedDB
```

---

## Ejemplos Prácticos

### Ejemplo 1: Factory Pattern (Crear Datos)

```typescript
// factories/users.ts
import { Page } from '@playwright/test';

export interface CreateUserInput {
  email?: string;
  nombre?: string;
  rol?: 'admin' | 'profesor' | 'estudiante';
  activo?: boolean;
}

// Factory que crea usuarios en la API
export async function crearUsuario(
  page: Page,
  datos: CreateUserInput = {}
) {
  // Usar datos por defecto si no se proporcionan
  const datosCompletos = {
    email: datos.email || `usuario-${Date.now()}@fpuna.edu.py`,
    nombre: datos.nombre || 'Usuario Test',
    rol: datos.rol || 'estudiante',
    activo: datos.activo !== undefined ? datos.activo : true
  };

  // Crear mediante API (más rápido que UI)
  const response = await page.request.post('http://api.localhost/usuarios', {
    data: datosCompletos
  });

  if (!response.ok()) {
    throw new Error(`No se pudo crear usuario: ${response.status()}`);
  }

  const usuario = await response.json();
  return usuario;
}

// Usar el factory en tests
test('búsqueda de usuarios', async ({ page }) => {
  // Crear 3 usuarios de prueba
  const usuario1 = await crearUsuario(page, { nombre: 'María González' });
  const usuario2 = await crearUsuario(page, { nombre: 'Carlos Ramírez' });
  const usuario3 = await crearUsuario(page, { nombre: 'Juan Pérez' });

  // Test usa datos creados
  await page.goto('/usuarios');
  await page.fill('[name="buscar"]', 'González');

  // Verificar que encuentra el usuario correcto
  await expect(page.getByText('María González')).toBeVisible();
  
  // Otros usuarios NO deberían aparecer
  await expect(page.getByText('Carlos Ramírez')).not.toBeVisible();
});
```

### Ejemplo 2: Factory con Builder Pattern

```typescript
// factories/proyectos.ts
export class ProyectoBuilder {
  private datos = {
    nombre: 'Proyecto Test',
    descripcion: 'Un proyecto de prueba',
    estado: 'activo' as const,
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  .toISOString().split('T')[0]
  };

  nombre(nombre: string): this {
    this.datos.nombre = nombre;
    return this;
  }

  descripcion(desc: string): this {
    this.datos.descripcion = desc;
    return this;
  }

  estado(estado: 'activo' | 'pausado' | 'completado'): this {
    this.datos.estado = estado;
    return this;
  }

  async crear(page: Page) {
    const response = await page.request.post(
      'http://api.localhost/proyectos',
      { data: this.datos }
    );

    return await response.json();
  }
}

// Usar con fluidez
test('crear proyecto personalizado', async ({ page }) => {
  const proyecto = await new ProyectoBuilder()
    .nombre('Sistema de Calificaciones')
    .descripcion('Plataforma para gestionar notas')
    .estado('activo')
    .crear(page);

  // Verificar que se creó correctamente
  await page.goto('/proyectos');
  await expect(page.getByText('Sistema de Calificaciones')).toBeVisible();
});
```

### Ejemplo 3: Fixture con Limpieza Automática

```typescript
// fixtures/data.ts
import { test as base } from '@playwright/test';

interface DataFixture {
  crearUsuario: (datos?: any) => Promise<any>;
  limpiar: () => Promise<void>;
}

export const test = base.extend<DataFixture>({
  crearUsuario: async ({ page }, use) => {
    const usuariosCreados: any[] = [];

    // Función que crea usuario Y registra para limpieza
    const crearUsuario = async (datos: any = {}) => {
      const datosCompletos = {
        email: datos.email || `user-${Date.now()}@fpuna.edu.py`,
        nombre: datos.nombre || 'Test User',
        ...datos
      };

      const response = await page.request.post(
        'http://api.localhost/usuarios',
        { data: datosCompletos }
      );

      const usuario = await response.json();
      usuariosCreados.push(usuario.id);  // Registrar para limpiar después

      return usuario;
    };

    await use(crearUsuario);

    // LIMPIEZA: Borrar todos los usuarios creados en este test
    console.log(`Borrando ${usuariosCreados.length} usuarios de prueba...`);
    for (const id of usuariosCreados) {
      await page.request.delete(`http://api.localhost/usuarios/${id}`);
    }
  }
});

// Usar
import { test } from '../fixtures/data';

test('crear múltiples usuarios', async ({ page, crearUsuario }) => {
  // Crear usuarios
  const u1 = await crearUsuario({ nombre: 'Usuario 1' });
  const u2 = await crearUsuario({ nombre: 'Usuario 2' });
  const u3 = await crearUsuario({ nombre: 'Usuario 3' });

  // Test
  await page.goto('/usuarios');
  await expect(page.getByText('Usuario 1')).toBeVisible();
  await expect(page.getByText('Usuario 2')).toBeVisible();
  await expect(page.getByText('Usuario 3')).toBeVisible();

  // Automáticamente: Se borran u1, u2, u3 después del test 🎯
});
```

### Ejemplo 4: Seeder para Datos Iniciales

```typescript
// seeds/database.seed.ts
export async function seedDatabase(page: Page) {
  console.log('📊 Sembrando BD con datos iniciales...');

  // 1. Crear usuarios base
  const usuarios = [
    {
      email: 'admin@fpuna.edu.py',
      nombre: 'Administrador',
      rol: 'admin',
      password: 'admin123'
    },
    {
      email: 'profesor@fpuna.edu.py',
      nombre: 'Profesor Test',
      rol: 'profesor',
      password: 'profesor123'
    },
    {
      email: 'estudiante@fpuna.edu.py',
      nombre: 'Estudiante Test',
      rol: 'estudiante',
      password: 'estudiante123'
    }
  ];

  for (const usuario of usuarios) {
    const response = await page.request.post(
      'http://api.localhost/usuarios',
      { data: usuario }
    );

    if (response.ok()) {
      console.log(`✅ Usuario creado: ${usuario.email}`);
    }
  }

  // 2. Crear cursos
  const cursos = [
    { nombre: 'Programación I', codigo: 'INF-101' },
    { nombre: 'Bases de Datos', codigo: 'INF-201' },
    { nombre: 'Testing Avanzado', codigo: 'INF-301' }
  ];

  for (const curso of cursos) {
    const response = await page.request.post(
      'http://api.localhost/cursos',
      { data: curso }
    );

    if (response.ok()) {
      console.log(`✅ Curso creado: ${curso.nombre}`);
    }
  }

  console.log('✨ Semilla completada');
}

// Usar en fixture
export const test = base.extend({
  db: async ({ page }, use) => {
    // Ejecutar seeder ANTES de los tests
    await seedDatabase(page);

    await use(null);

    // Cleanup después (opcional)
    console.log('Limpiando BD...');
  }
});
```

### Ejemplo 5: Datos Realistas con Faker

```typescript
// factories/faker-users.ts
import { faker } from '@faker-js/faker/locale/es_MX';

export class FakerUserFactory {
  static crearDatos(overrides = {}) {
    return {
      email: faker.internet.email(),
      nombre: faker.name.fullName(),
      telefono: faker.phone.number(),
      direccion: faker.address.streetAddress(),
      fechaNacimiento: faker.date.birthdate({ min: 18, max: 65 }).toISOString().split('T')[0],
      ...overrides
    };
  }

  static crearBatch(cantidad: number) {
    return Array.from({ length: cantidad }, () => this.crearDatos());
  }
}

// Usar
test('importar múltiples usuarios realistas', async ({ page }) => {
  // Crear 10 usuarios con datos realistas
  const usuarios = FakerUserFactory.crearBatch(10);

  // Subir a BD
  for (const usuario of usuarios) {
    await page.request.post('http://api.localhost/usuarios', {
      data: usuario
    });
  }

  // Test que estos usuarios aparecen correctamente
  await page.goto('/usuarios');
  const rows = page.locator('table tbody tr');
  
  await expect(rows).toHaveCount(10);
});
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// 1. Usar factories para crear datos
const usuario = await crearUsuario(page, { rol: 'admin' });

// 2. Limpieza automática después de tests
test.extend({
  usuario: async ({}, use) => {
    const u = await crearUsuario();
    await use(u);
    await borrarUsuario(u.id);  // Limpiar
  }
});

// 3. Usar API para datos, no UI
// Crear datos mediante API es 10x más rápido que UI
const usuario = await page.request.post('/usuarios', { data });

// 4. Datos independientes por test
// Cada test crea SUS propios datos
test('test 1', async ({ page, crearUsuario }) => {
  const u = await crearUsuario();  // Sus datos
});

test('test 2', async ({ page, crearUsuario }) => {
  const u = await crearUsuario();  // Sus datos (diferentes)
});

// 5. Usar nombres únicos para evitar colisiones
const email = `test-${Date.now()}-${Math.random()}@fpuna.edu.py`;
```

### ❌ MALO

```typescript
// ❌ Hardcodear emails que se repiten
const email = 'test@fpuna.edu.py';  // Mismo para TODOS los tests

// ❌ No limpiar datos
test('crear usuario', async ({ page }) => {
  await page.goto('/usuarios/nuevo');
  await page.fill('[name="email"]', 'test@fpuna.edu.py');
  // Usuario queda en la BD para siempre
});

// ❌ Esperar que tests se ejecuten en orden específico
test('test 1', async ({ page }) => {
  // Crea usuario
});

test('test 2', async ({ page }) => {
  // Asume que usuario de test 1 existe 😢
});

// ❌ Mezclar datos de UI con datos de test
// Datos que el usuario ve en producción con datos de test
```

---

## Debugging de Datos

### Ver Qué Datos Existen

```typescript
test('debug: listar todos los usuarios en BD', async ({ page }) => {
  const response = await page.request.get('http://api.localhost/usuarios');
  const usuarios = await response.json();

  console.log('📊 Total usuarios en BD:', usuarios.length);
  console.log(JSON.stringify(usuarios, null, 2));

  // Filtrar usuarios de test
  const usuariosTest = usuarios.filter(u => u.email.includes('@test'));
  console.log('🧪 Usuarios de test:', usuariosTest.length);
});
```

---

## Resumen

| Concepto | Qué Es | Cuándo |
|----------|--------|--------|
| **Factory** | Función que crea datos | Crear datos bajo demanda |
| **Fixture** | Setup automático | Datos predeterminados |
| **Seeder** | Script que llena BD | Datos iniciales antes de tests |
| **Cleanup** | Borrar datos después | Mantener BD limpia |
| **Faker** | Datos realistas aleatorios | Tests más realistas |

---

## Próximas Secciones en Este Módulo

- [01_Page_Object_Model.md](./01_Page_Object_Model.md) - Patrón POM para organización
- [02_Custom_Fixtures_Helpers.md](./02_Custom_Fixtures_Helpers.md) - Fixtures personalizados
- [04_Multi_Environment_Config.md](./04_Multi_Environment_Config.md) - Múltiples ambientes
- [05_Parallelization_Performance.md](./05_Parallelization_Performance.md) - Optimizar velocidad

---

*Tutorial: Gestión de Datos de Prueba - Módulo 03 Arquitectura de Pruebas - FPUNA 2026*
