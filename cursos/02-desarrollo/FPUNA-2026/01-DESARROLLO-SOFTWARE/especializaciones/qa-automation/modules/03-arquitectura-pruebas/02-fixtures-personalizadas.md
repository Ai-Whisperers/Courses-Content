# Tutorial: Custom Fixtures y Test Helpers Reutilizables
## Módulo 03: Arquitectura de Pruebas

**Duración**: 45 minutos  
**Nivel**: Intermedio-Avanzado  
**Prerequisitos**: Conceptos básicos de Playwright, Module 01

---

## ¿Por Qué Necesitamos Fixtures Personalizados?

### El Problema Real

Imagina que en tus tests necesitas hacer cosas repetitivas:

```typescript
// ❌ Código repetido en CADA test
test('crear usuario y verificar en dashboard', async ({ page }) => {
  // 1. Autenticar
  await page.goto('/login');
  await page.fill('[name="email"]', 'admin@fpuna.edu.py');
  await page.fill('[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
  
  // 2. Navegar a formulario
  await page.click('a[href="/usuarios/nuevo"]');
  
  // 3. Llenar datos
  await page.fill('[name="nombre"]', 'Juan Pérez');
  await page.fill('[name="email"]', 'juan@fpuna.edu.py');
  
  // 4. Crear usuario
  await page.click('button[type="submit"]');
  
  // FINALMENTE: El test comienza aquí
  await expect(page.getByText('juan@fpuna.edu.py')).toBeVisible();
});

test('editar usuario y verificar cambios', async ({ page }) => {
  // REPETIR TODO NUEVAMENTE 😢
  await page.goto('/login');
  // ... 20 líneas de setup que ya hicimos
});
```

**Problemas**:
- 🔄 Duplicación de código (maintenance nightmare)
- 🐢 Tests lentos (setup repetido)
- 📝 Difícil de leer (setup vs. test real)
- 🐛 Propenso a errores (cambios en un test no afectan otros)

### La Solución: Fixtures

**Fixtures** = Código de setup/teardown que se ejecuta **automáticamente** antes/después de cada test.

```typescript
// ✅ Fixture personalizado: crea usuario autenticado
test.extend<{ adminUser: Page }>({
  adminUser: async ({ page }, use) => {
    // SETUP: Autentica y navega
    await page.goto('/login');
    await page.fill('[name="email"]', 'admin@fpuna.edu.py');
    await page.fill('[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Pasar la página autenticada al test
    await use(page);
    
    // TEARDOWN (opcional): Limpiar después del test
    await page.goto('/');  // Logout implícito
  }
});

// Ahora los tests son LIMPIOS
test('crear usuario', async ({ adminUser }) => {
  // adminUser ya está autenticado
  await adminUser.click('a[href="/usuarios/nuevo"]');
  await adminUser.fill('[name="nombre"]', 'Juan Pérez');
  await adminUser.click('button[type="submit"]');
  
  await expect(adminUser.getByText('juan@fpuna.edu.py')).toBeVisible();
});
```

**Beneficios**:
- 🎯 Tests enfocados en lo que REALMENTE testean
- ⚡ Setup centralizado = cambios en UN lugar
- 🔧 Reutilizable en múltiples tests
- 🧹 Cleanup automático

---

## Conceptos Clave

### 1. Anatomía de un Fixture

```typescript
test.extend<{ miFixture: TipoDeRetorno }>({
  miFixture: async ({ page }, use) => {
    // ═════════════════════════════════
    // FASE 1: SETUP (antes del test)
    // ═════════════════════════════════
    console.log('Preparando datos...');
    
    const usuario = {
      id: 1,
      nombre: 'María González',
      email: 'maria@fpuna.edu.py'
    };
    
    // ═════════════════════════════════
    // FASE 2: USO (durante el test)
    // ═════════════════════════════════
    // Pasar valores al test
    await use(usuario);
    
    // ═════════════════════════════════
    // FASE 3: TEARDOWN (después del test)
    // ═════════════════════════════════
    console.log('Limpiando datos...');
  }
});
```

### 2. Flujo de Ejecución

```
Test inicia
    ↓
SETUP del fixture se ejecuta
    ↓
Fixture.use() pasa datos al test
    ↓
TEST REAL se ejecuta (aquí testeas)
    ↓
Test termina
    ↓
TEARDOWN se ejecuta (limpieza)
```

### 3. Tipos de Fixtures

| Tipo | Ejemplo | Cuándo |
|------|---------|--------|
| **Simples** | Datos estáticos | Datos de prueba constantes |
| **Con Setup** | Crear usuario en BD | Preparar estado antes de test |
| **Con Cleanup** | Borrar datos después | Evitar contaminar BD |
| **Complejos** | Múltiples dependencias | Combinación de varios fixtures |

---

## Ejemplos Prácticos

### Ejemplo 1: Fixture Simple (Datos de Prueba)

```typescript
import { test } from '@playwright/test';

// Fixture que proporciona datos de usuario
const testUser = {
  email: 'usuario@fpuna.edu.py',
  password: 'password123',
  nombre: 'Juan Pérez',
  rol: 'estudiante'
};

test.extend<{ usuario: typeof testUser }>({
  usuario: async ({}, use) => {
    // No hay setup/teardown, solo proveemos datos
    await use(testUser);
  }
});

// Usar el fixture en tests
test('login con datos válidos', async ({ page, usuario }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', usuario.email);
  await page.fill('[name="password"]', usuario.password);
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
});
```

### Ejemplo 2: Fixture con Setup y Teardown

```typescript
import { test, expect } from '@playwright/test';

test.extend<{ 
  usuarioEnBD: { id: number; email: string } 
}>({
  usuarioEnBD: async ({}, use) => {
    // ══════════════════════════
    // SETUP: Crear usuario en BD
    // ══════════════════════════
    const response = await fetch('http://api.localhost/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: 'Test User',
        email: 'test-' + Date.now() + '@fpuna.edu.py',
        password: 'TestPass123!'
      })
    });
    
    const usuario = await response.json();
    console.log('✅ Usuario creado:', usuario.id);
    
    // Usar en tests
    await use(usuario);
    
    // ══════════════════════════
    // TEARDOWN: Borrar usuario
    // ══════════════════════════
    await fetch(`http://api.localhost/usuarios/${usuario.id}`, {
      method: 'DELETE'
    });
    console.log('🗑️ Usuario eliminado:', usuario.id);
  }
});

// Test que usa el fixture
test('usuario puede ver su perfil', async ({ page, usuarioEnBD }) => {
  // Usuario YA existe en la BD
  await page.goto(`/usuario/${usuarioEnBD.id}`);
  
  await expect(page.getByText(usuarioEnBD.email)).toBeVisible();
});
```

### Ejemplo 3: Fixture Autenticado (Muy Usado)

```typescript
import { test } from '@playwright/test';

test.extend<{ 
  usuarioAutenticado: { page: Page; usuario: any } 
}>({
  usuarioAutenticado: async ({ page }, use) => {
    // SETUP: Login automático
    await page.goto('/login');
    await page.fill('[name="email"]', 'usuario@fpuna.edu.py');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Esperar a que se complete el login
    await page.waitForURL('/dashboard');
    
    const usuario = {
      email: 'usuario@fpuna.edu.py',
      nombre: 'Juan Pérez'
    };
    
    // Pasar página autenticada al test
    await use({ page, usuario });
    
    // TEARDOWN: Logout (opcional)
    await page.goto('/logout');
  }
});

// Uso limpio
test('usuario puede crear proyecto', async ({ usuarioAutenticado }) => {
  const { page } = usuarioAutenticado;
  
  // Ya estamos logueados, empezamos el test
  await page.click('button[text="Nuevo Proyecto"]');
  await page.fill('[name="nombre"]', 'Mi Proyecto');
  await page.click('button[type="submit"]');
  
  await expect(page.getByText('Mi Proyecto')).toBeVisible();
});
```

### Ejemplo 4: Fixture Complejo (Múltiples Dependencias)

```typescript
import { test } from '@playwright/test';

// Fixture 1: Datos de usuario
test.extend<{ datosUsuario: any }>({
  datosUsuario: async ({}, use) => {
    const datos = {
      email: 'test@fpuna.edu.py',
      nombre: 'María González'
    };
    await use(datos);
  }
});

// Fixture 2: Usuario en BD (depende del Fixture 1)
test.extend<{ usuarioEnBD: any }>({
  usuarioEnBD: async ({ datosUsuario }, use) => {
    // Usar datosUsuario del fixture anterior
    const response = await fetch('http://api.localhost/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...datosUsuario,
        password: 'TestPass123!'
      })
    });
    
    const usuario = await response.json();
    await use(usuario);
    
    // Cleanup
    await fetch(`http://api.localhost/usuarios/${usuario.id}`, {
      method: 'DELETE'
    });
  }
});

// Fixture 3: Usuario autenticado en página
test.extend<{ app: { page: Page; usuario: any } }>({
  app: async ({ page, usuarioEnBD }, use) => {
    // Combina todo: BD + navegador
    await page.goto('/login');
    await page.fill('[name="email"]', usuarioEnBD.email);
    await page.fill('[name="password"]', 'TestPass123!');
    await page.click('button[type="submit"]');
    
    await page.waitForURL('/dashboard');
    
    await use({ page, usuario: usuarioEnBD });
  }
});

// Test que usa todo el "stack" de fixtures
test('usuario puede ver proyectos', async ({ app }) => {
  // app.usuario viene de BD
  // app.page está autenticada
  
  await app.page.click('a[href="/proyectos"]');
  
  const countResponse = await app.page.request.get(
    'http://api.localhost/proyectos'
  );
  const proyectos = await countResponse.json();
  
  expect(proyectos.length).toBeGreaterThan(0);
});
```

---

## Test Helpers Reutilizables

Los **helpers** son funciones que **NO son fixtures** pero se usan frecuentemente en tests.

### Helper Básico: Crear Usuario

```typescript
// helpers/users.ts
export async function crearUsuario(page: Page, datos: {
  email: string;
  nombre: string;
  password: string;
}) {
  // Navegar al formulario
  await page.click('a[href="/usuarios/nuevo"]');
  
  // Llenar formulario
  await page.fill('[name="nombre"]', datos.nombre);
  await page.fill('[name="email"]', datos.email);
  await page.fill('[name="password"]', datos.password);
  
  // Crear
  await page.click('button[type="submit"]');
  
  // Esperar confirmación
  await page.waitForSelector('.alert-success');
  
  return {
    nombre: datos.nombre,
    email: datos.email
  };
}

// Usar en test
import { crearUsuario } from './helpers/users';

test('crear usuario desde formulario', async ({ page }) => {
  await page.goto('/');
  
  const usuario = await crearUsuario(page, {
    email: 'nuevo@fpuna.edu.py',
    nombre: 'Carlos Ramírez',
    password: 'SecurePass123!'
  });
  
  await expect(page.getByText(usuario.email)).toBeVisible();
});
```

### Helper Avanzado: Navegar con Verificación

```typescript
// helpers/navigation.ts
export async function navegarSegura(
  page: Page,
  ruta: string,
  timeout: number = 5000
) {
  // Navegar
  await page.goto(ruta, { waitUntil: 'networkidle' });
  
  // Esperar a que la página cargue
  await page.waitForLoadState('domcontentloaded');
  
  // Verificar que no hay errores
  const errores = await page.locator('.error-banner').count();
  if (errores > 0) {
    const mensaje = await page.locator('.error-banner').textContent();
    throw new Error(`Error al navegar a ${ruta}: ${mensaje}`);
  }
  
  return page;
}

// Usar
test('navegar entre módulos', async ({ page }) => {
  await navegarSegura(page, '/dashboard');
  await navegarSegura(page, '/usuarios');
  await navegarSegura(page, '/reportes');
});
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// 1. Fixtures descriptivos y específicos
test.extend<{ usuarioAdminAutenticado: Page }>({ /* ... */ });

// 2. Cleanup automático
test.extend<{ datosTemporal: any }>({
  datosTemporal: async ({}, use) => {
    const datos = crearDatos();
    await use(datos);
    borrarDatos(datos);  // ✅ Cleanup
  }
});

// 3. Fixtures reutilizables entre archivos
// hooks.ts
export const testWithAuth = test.extend<{ auth: Page }>({
  auth: async ({ page }, use) => {
    // Setup centralizado
    await autenticar(page);
    await use(page);
  }
});

// mi-test.ts
import { testWithAuth } from './hooks';

testWithAuth('es un test autenticado', async ({ auth }) => {
  // auth ya está preparado
});
```

### ❌ MALO

```typescript
// 1. Fixture poco descriptivo
test.extend<{ data: any }>({ /* ... */ });  // ¿Qué data?

// 2. Sin cleanup
test.extend<{ usuario: any }>({
  usuario: async ({}, use) => {
    const u = crearUsuario();
    await use(u);
    // ❌ Se queda en la BD para siempre
  }
});

// 3. Fixtures dentro de archivos de test
// ❌ No reutilizable, duplicado en cada archivo
```

---

## Debugging Fixtures

### Ver Qué Está Pasando

```typescript
test.extend<{ debug: any }>({
  debug: async ({}, use) => {
    console.log('🔧 SETUP del fixture');
    
    await use(null);
    
    console.log('🔧 TEARDOWN del fixture');
  }
});

test('con debug', async ({ debug }) => {
  console.log('🧪 DENTRO DEL TEST');
});

// Output:
// 🔧 SETUP del fixture
// 🧪 DENTRO DEL TEST
// 🔧 TEARDOWN del fixture
```

---

## Resumen

| Concepto | Uso |
|----------|-----|
| **Fixture** | Setup/teardown automático antes/después de tests |
| **test.extend()** | Crear fixtures personalizados |
| **use()** | Pasar datos del fixture al test |
| **Helper** | Función reutilizable (no es fixture) |
| **Cleanup** | Limpiar datos después del test |

---

## Próximas Secciones en Este Módulo

- [01_Page_Object_Model.md](./01_Page_Object_Model.md) - Patrón POM para tests mantenibles
- [03_Test_Data_Management.md](./03_Test_Data_Management.md) - Gestionar datos de prueba
- [04_Multi_Environment_Config.md](./04_Multi_Environment_Config.md) - Configurar múltiples ambientes
- [05_Parallelization_Performance.md](./05_Parallelization_Performance.md) - Optimizar velocidad

---

*Tutorial: Custom Fixtures y Helpers - Módulo 03 Arquitectura de Pruebas - FPUNA 2026*
