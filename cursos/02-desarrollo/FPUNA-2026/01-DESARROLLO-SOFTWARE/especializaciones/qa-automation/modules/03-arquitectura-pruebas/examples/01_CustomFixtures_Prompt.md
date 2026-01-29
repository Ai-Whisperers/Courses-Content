# OpenCode Prompt: Generar Custom Fixtures para Playwright
## Módulo 03: Arquitectura de Pruebas

**Propósito**: Generar código de Playwright fixtures reutilizables  
**Nivel**: Intermedio-Avanzado  
**Aplicable a**: Cualquier proyecto con tests complejos

---

## Cómo Usar Este Prompt

1. **Copiar el prompt completo** de la sección "PROMPT PARA OPENCODE"
2. **Abrir OpenCode** en tu VS Code
3. **Pegar el prompt** en la ventana de OpenCode
4. **Ejecutar** y recibir código de fixtures generado
5. **Adaptar** a tu proyecto específico

---

## PROMPT PARA OPENCODE

### Versión Simple (Fixtures Básicos)

```
Genera un archivo `fixtures.ts` para Playwright tests que exporte:

1. Un fixture llamado "usuarioAutenticado" que:
   - Navegue a '/login'
   - Complete autenticación con email 'admin@test.local' y password 'admin123'
   - Espere a estar en '/dashboard'
   - Retorne la página autenticada
   - Tenga cleanup (logout) después del test

2. Un fixture llamado "datosUsuario" que:
   - Exporte datos estáticos: { email: 'test@local', nombre: 'Test User', rol: 'admin' }
   - Se pueda reutilizar en múltiples tests

3. Un fixture llamado "crearUsuarioAPI" que:
   - Sea una función que cree usuario via POST /api/usuarios
   - Acepte parámetros personalizados (email, nombre, rol)
   - Retorne el usuario creado
   - Registre IDs para cleanup automático
   - Borre usuarios después del test

Lenguaje: TypeScript
Incluir: Comentarios en español, tipos TypeScript correctos, best practices de Playwright
```

### Versión Avanzada (Fixtures Complejos)

```
Genera un sistema completo de fixtures para Playwright que incluya:

**Fixture 1: setupBD**
- Conectar a BD de prueba (via API)
- Ejecutar script de "seed" con datos iniciales (usuarios, productos, categorías)
- Pasar la conexión BD al test
- Cleanup: Limpiar datos creados después del test

**Fixture 2: contextoAutenticado**
- Tomar fixture setupBD como dependencia
- Crear usuario de prueba en BD
- Navegara '/login' y autenticar con ese usuario
- Retornar objeto { page, usuario, bd }
- Cleanup: Logout + Borrar usuario BD

**Fixture 3: dataFactory** (factory pattern)
- Exportar clase UsuarioFactory con métodos:
  - .adminUser() → datos de admin
  - .normalUser() → datos de usuario normal
  - .conRol(rol: string) → usuario con rol específico
  - .batch(cantidad: number) → array de usuarios
- Exportar clase ProyectoFactory con métodos similares
- Usar Faker para datos realistas

**Fixture 4: storage**
- Guardar storageState en .auth.json después de autenticar
- Permitir recuperar autenticación previa sin login (rápido)
- Métodos: save(), load(), clear()

Estructura: TypeScript, eslint compatible, comentarios en español
Requirements: Importar { test as base } de @playwright/test
Output: Archivo único 'fixtures/complete-setup.ts' que exporte todo
```

---

## EJEMPLOS DE CÓDIGO GENERADO

### Ejemplo 1: Fixture Simple Generado

```typescript
import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// Fixture: Usuario autenticado
export const test = base.extend<{
  usuarioAutenticado: Page;
}>({
  usuarioAutenticado: async ({ page }, use) => {
    // SETUP: Autenticar
    console.log('🔐 Autenticando usuario...');
    
    await page.goto('/login');
    await page.fill('[name="email"]', 'admin@test.local');
    await page.fill('[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Esperar a que el login complete
    await page.waitForURL('/dashboard');
    console.log('✅ Usuario autenticado correctamente');
    
    // Usar en test
    await use(page);
    
    // TEARDOWN: Logout
    console.log('🚪 Logout...');
    await page.goto('/logout');
  }
});

// Fixture: Datos estáticos
export const datosUsuario = {
  email: 'test@local',
  nombre: 'Test User',
  rol: 'admin'
};

// Fixture: Crear usuario via API
export async function crearUsuarioAPI(
  page: Page,
  datos: Partial<typeof datosUsuario> = {}
) {
  const datosCompletos = {
    ...datosUsuario,
    ...datos,
    email: datos.email || `test-${Date.now()}@local`
  };

  const response = await page.request.post('/api/usuarios', {
    data: datosCompletos
  });

  if (!response.ok()) {
    throw new Error(
      `No se pudo crear usuario: ${response.status()}`
    );
  }

  return await response.json();
}

// Uso en test
test('usuario autenticado puede acceder dashboard', async ({
  usuarioAutenticado
}) => {
  // usuarioAutenticado ya está en /dashboard
  await expect(usuarioAutenticado.locator('h1')).toContainText('Dashboard');
});
```

### Ejemplo 2: Factory Pattern Generado

```typescript
import { faker } from '@faker-js/faker/locale/es_MX';
import { Page } from '@playwright/test';

// Factory: Usuarios
export class UsuarioFactory {
  static async adminUser(page: Page) {
    return await this.crearEnAPI(page, {
      email: 'admin@test.local',
      nombre: 'Administrador',
      rol: 'admin'
    });
  }

  static async normalUser(page: Page) {
    return await this.crearEnAPI(page, {
      email: `user-${Date.now()}@test.local`,
      nombre: faker.name.fullName(),
      rol: 'usuario'
    });
  }

  static async conRol(page: Page, rol: string) {
    return await this.crearEnAPI(page, {
      email: `${rol}-${Date.now()}@test.local`,
      nombre: faker.name.fullName(),
      rol
    });
  }

  static async batch(page: Page, cantidad: number) {
    const usuarios = [];
    for (let i = 0; i < cantidad; i++) {
      const usuario = await this.normalUser(page);
      usuarios.push(usuario);
    }
    return usuarios;
  }

  private static async crearEnAPI(page: Page, datos: any) {
    const response = await page.request.post('/api/usuarios', {
      data: datos
    });

    if (!response.ok()) {
      throw new Error(`Fallo al crear usuario: ${response.status()}`);
    }

    return await response.json();
  }
}

// Factory: Proyectos
export class ProyectoFactory {
  static async crear(page: Page, datos: any = {}) {
    return await page.request.post('/api/proyectos', {
      data: {
        nombre: faker.lorem.words(3),
        descripcion: faker.lorem.paragraph(),
        estado: 'activo',
        ...datos
      }
    });
  }

  static async batch(page: Page, cantidad: number) {
    const proyectos = [];
    for (let i = 0; i < cantidad; i++) {
      const p = await this.crear(page);
      proyectos.push(p);
    }
    return proyectos;
  }
}

// Uso
test('crear múltiples usuarios con factory', async ({ page }) => {
  const admin = await UsuarioFactory.adminUser(page);
  const usuarios = await UsuarioFactory.batch(page, 5);

  console.log('Admin:', admin.email);
  console.log('Total usuarios:', usuarios.length);
});
```

---

## CASOS DE USO

### Caso 1: Tests de Autenticación

```
Prompt: "Genera fixtures para tests de autenticación que incluya:
- Fixture: usuarioAdmin autenticado
- Fixture: usuarioProfesor autenticado
- Fixture: usuarioEstudiante autenticado
- Cada uno con sus propias credenciales
- Cleanup automático después de tests"
```

### Caso 2: Tests de BD Multi-Tenancy

```
Prompt: "Genera fixtures para tests de multi-tenancy (múltiples clientes) que:
- Cree tenantA y tenantB en BD
- Autentique como admin de cada tenant
- Asegure que datos de tenantA no sean visibles en tenantB
- Limpie ambos tenants después del test"
```

### Caso 3: Tests de Flujos Complejos

```
Prompt: "Genera fixtures que soporten flujo: Usuario→Proyecto→Tareas→Completar que:
- Cree usuario
- Cree proyecto perteneciente al usuario
- Cree 5 tareas en el proyecto
- Proporcione estado limpio para cada paso
- Limpie todo al final"
```

---

## TIPS Y TRUCOS

### Tip 1: Reutilizar Fixtures

```typescript
// ✅ Combinar fixtures
export const test = base.extend({
  bd: async ({}, use) => { /* setup BD */ },
  usuario: async ({ bd }, use) => { /* usa bd */ }
});

// usuario automaticamente tiene acceso a bd
```

### Tip 2: Pasar Parámetros a Fixtures

```typescript
// ✅ Fixture parametrizado
test.extend({
  usuarioConRol: async ({ }, use) => {
    // En el test puedes pasar rol
    await use((rol: string) => crearUsuario(rol));
  }
});

// Uso
test('admin puede hacer X', async ({ usuarioConRol }) => {
  const admin = await usuarioConRol('admin');
});
```

### Tip 3: Debugging Fixtures

```typescript
// ✅ Logs para debugging
test.extend({
  miFixture: async ({}, use) => {
    console.log('🔧 SETUP fixture');
    await use(data);
    console.log('🔧 TEARDOWN fixture');
  }
});
```

---

## CHECKLIST DESPUÉS DE GENERAR

- [ ] Código genera sin errores de TypeScript
- [ ] Tipos están correctamente definidos
- [ ] Cleanup se ejecuta después de cada test
- [ ] No hay valores hardcodeados (usar variables env)
- [ ] Funciona con paralelización
- [ ] Documentación incluida

---

*Prompt: Custom Fixtures - Módulo 03 Arquitectura de Pruebas - FPUNA 2026*
