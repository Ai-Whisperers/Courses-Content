# OpenCode Prompt: Generar Test Data con Factories y Faker
## Módulo 03: Arquitectura de Pruebas

**Propósito**: Generar factories para crear datos de prueba realistas  
**Nivel**: Intermedio  
**Aplicable a**: Tests que necesitan múltiples datos

---

## PROMPT PARA OPENCODE

### Versión Básica (Factories Simples)

```
Genera un archivo `factories/usuarios.ts` para Playwright que incluya:

1. Clase UsuarioFactory con métodos estáticos que retornen objetos usuario:
   - admin() → usuario con rol 'admin'
   - profesor() → usuario con rol 'profesor'
   - estudiante() → usuario con rol 'estudiante'

2. Cada método debe retornar objeto con:
   - email: string (único, con timestamp)
   - nombre: string (usar Faker para datos realistas)
   - rol: string
   - activo: boolean (default true)
   - fechaCreacion: string (ISO date)

3. Método batch(cantidad: number) que retorne array de estudiantes

Usa biblioteca @faker-js/faker (locale: es_MX para nombres en español)
Lenguaje: TypeScript
Incluir ejemplos de cómo usar la factory
```

### Versión Avanzada (Factories con BD)

```
Genera sistema completo de test data factories que:

**Archivo: factories/database.ts**
1. Clase DBFactory que cree datos directamente en BD via API:
   - async crearUsuario(datos: Partial<Usuario>)
   - async crearUsuarios(cantidad: number) → array de usuarios creados
   - async crearProyecto(usuario: Usuario, datos?: any) → proyecto con owner
   - async crearTareas(proyecto: Proyecto, cantidad: number) → array tareas
   - async crearCurso(nombre: string, codigo: string)
   - async enrolarEstudiantes(curso: Curso, estudiantes: Usuario[])

2. Cada método:
   - Usa Faker para datos realistas
   - Retorna objeto creado con ID de BD
   - Registra ID para cleanup automático
   - Maneja errores apropiadamente

**Archivo: factories/builders.ts**
3. Clases Builder para construcción de datos complejos:
   - UsuarioBuilder: fluent API para crear usuarios personalizados
   - ProyectoBuilder: fluent API para proyectos con tareas
   - CursoBuilder: fluent API para cursos con estudiantes

4. Ejemplo de uso:
   const usuario = new UsuarioBuilder()
     .nombre('María González')
     .rol('profesor')
     .activo(true)
     .build();

**Archivo: factories/fixtures.ts**
5. Fixtures que usen las factories:
   - dataFactory: proporciona instancia de DBFactory
   - limpiezaAutomatica: tracker de IDs para eliminar al final

Estructura: TypeScript, imports organizados, comentarios en español
Output: 3 archivos listos para usar en tests
```

---

## EJEMPLOS DE CÓDIGO GENERADO

### Ejemplo 1: Factory Simple

```typescript
import { faker } from '@faker-js/faker/locale/es_MX';

export interface Usuario {
  email: string;
  nombre: string;
  rol: 'admin' | 'profesor' | 'estudiante';
  activo: boolean;
  fechaCreacion: string;
}

export class UsuarioFactory {
  /**
   * Crea datos de usuario administrador
   */
  static admin(): Usuario {
    return {
      email: `admin-${Date.now()}@fpuna.edu.py`,
      nombre: 'Administrador Sistema',
      rol: 'admin',
      activo: true,
      fechaCreacion: new Date().toISOString()
    };
  }

  /**
   * Crea datos de usuario profesor
   */
  static profesor(): Usuario {
    return {
      email: `profesor-${Date.now()}@fpuna.edu.py`,
      nombre: faker.name.fullName(),
      rol: 'profesor',
      activo: true,
      fechaCreacion: new Date().toISOString()
    };
  }

  /**
   * Crea datos de usuario estudiante
   */
  static estudiante(): Usuario {
    return {
      email: `estudiante-${Date.now()}@fpuna.edu.py`,
      nombre: faker.name.fullName(),
      rol: 'estudiante',
      activo: true,
      fechaCreacion: new Date().toISOString()
    };
  }

  /**
   * Crea array de N estudiantes
   */
  static batch(cantidad: number): Usuario[] {
    return Array.from({ length: cantidad }, () => this.estudiante());
  }

  /**
   * Crea usuario personalizado
   */
  static custom(overrides: Partial<Usuario>): Usuario {
    return {
      ...this.estudiante(),
      ...overrides,
      email: overrides.email || `user-${Date.now()}@fpuna.edu.py`
    };
  }
}

// Uso en tests
import { test } from '@playwright/test';

test('crear múltiples estudiantes', async ({ page }) => {
  // Generar datos
  const estudiantes = UsuarioFactory.batch(10);

  console.log(`Estudiantes: ${estudiantes.length}`);
  console.log(`Primer estudiante: ${estudiantes[0].nombre}`);

  // Crear en BD
  for (const estudiante of estudiantes) {
    await page.request.post('/api/usuarios', {
      data: estudiante
    });
  }
});
```

### Ejemplo 2: Builder Pattern

```typescript
import { faker } from '@faker-js/faker/locale/es_MX';

export class UsuarioBuilder {
  private datos = {
    email: `user-${Date.now()}@fpuna.edu.py`,
    nombre: faker.name.fullName(),
    rol: 'estudiante' as const,
    activo: true,
    password: 'TestPass123!'
  };

  email(email: string): this {
    this.datos.email = email;
    return this;
  }

  nombre(nombre: string): this {
    this.datos.nombre = nombre;
    return this;
  }

  rol(rol: 'admin' | 'profesor' | 'estudiante'): this {
    this.datos.rol = rol;
    return this;
  }

  activo(activo: boolean): this {
    this.datos.activo = activo;
    return this;
  }

  build() {
    return { ...this.datos };
  }

  async crear(page: Page) {
    const response = await page.request.post('/api/usuarios', {
      data: this.build()
    });

    if (!response.ok()) {
      throw new Error(`Fallo crear usuario: ${response.status()}`);
    }

    return await response.json();
  }
}

export class ProyectoBuilder {
  private datos = {
    nombre: faker.lorem.words(3),
    descripcion: faker.lorem.paragraph(),
    estado: 'activo' as const,
    tasas: []
  };

  nombre(nombre: string): this {
    this.datos.nombre = nombre;
    return this;
  }

  agregarTarea(nombre: string): this {
    this.datos.tasas.push({ nombre, completada: false });
    return this;
  }

  estado(estado: 'activo' | 'pausado' | 'completado'): this {
    this.datos.estado = estado;
    return this;
  }

  build() {
    return { ...this.datos };
  }

  async crear(page: Page) {
    const response = await page.request.post('/api/proyectos', {
      data: this.build()
    });

    return await response.json();
  }
}

// Uso fluido
test('crear usuario y proyecto', async ({ page }) => {
  const usuario = await new UsuarioBuilder()
    .nombre('María González')
    .rol('profesor')
    .activo(true)
    .crear(page);

  const proyecto = await new ProyectoBuilder()
    .nombre('Sistema de Calificaciones')
    .agregarTarea('Definir requirements')
    .agregarTarea('Diseñar BD')
    .agregarTarea('Implementar API')
    .agregarTarea('Tests')
    .crear(page);

  console.log(`Proyecto creado: ${proyecto.nombre}`);
  console.log(`Total tareas: ${proyecto.tareas.length}`);
});
```

### Ejemplo 3: Fixture con Cleanup Automático

```typescript
import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';

interface DataFixture {
  dataFactory: {
    crearUsuario: (datos?: any) => Promise<any>;
    crearProyecto: (datos?: any) => Promise<any>;
    limpiar: () => Promise<void>;
  };
}

export const test = base.extend<DataFixture>({
  dataFactory: async ({ page }, use) => {
    const creados = {
      usuarioIds: [] as number[],
      proyectoIds: [] as number[]
    };

    const crearUsuario = async (datos: any = {}) => {
      const response = await page.request.post('/api/usuarios', {
        data: {
          email: `test-${Date.now()}@fpuna.edu.py`,
          nombre: faker.name.fullName(),
          rol: 'estudiante',
          ...datos
        }
      });

      const usuario = await response.json();
      creados.usuarioIds.push(usuario.id);
      return usuario;
    };

    const crearProyecto = async (datos: any = {}) => {
      const response = await page.request.post('/api/proyectos', {
        data: {
          nombre: faker.lorem.words(3),
          ...datos
        }
      });

      const proyecto = await response.json();
      creados.proyectoIds.push(proyecto.id);
      return proyecto;
    };

    const limpiar = async () => {
      // Borrar todos los usuarios creados
      for (const id of creados.usuarioIds) {
        await page.request.delete(`/api/usuarios/${id}`);
      }

      // Borrar todos los proyectos creados
      for (const id of creados.proyectoIds) {
        await page.request.delete(`/api/proyectos/${id}`);
      }

      console.log(`✨ Limpieza: ${creados.usuarioIds.length} usuarios, ${creados.proyectoIds.length} proyectos`);
    };

    await use({
      crearUsuario,
      crearProyecto,
      limpiar
    });

    // Ejecutar limpiar después del test
    await limpiar();
  }
});

// Uso
test('crear múltiples datos que se limpian automáticamente', async ({
  dataFactory
}) => {
  const usuario = await dataFactory.crearUsuario();
  const proyecto = await dataFactory.crearProyecto();

  // Tests aquí
  console.log('Usuario:', usuario.email);
  console.log('Proyecto:', proyecto.nombre);

  // Automáticamente: Se limpian todos después del test 🎯
});
```

---

## CASOS DE USO

### Caso 1: Tests de Reportes Estadísticos

```
Prompt: "Genera factories para tests de reportes que creen:
- 100 estudiantes con calificaciones variadas
- 10 cursos diferentes
- Registros de asistencia aleatorios
- Todos los datos creados vía API
- Método para limpiar bulk todo al final"
```

### Caso 2: Tests de Escalabilidad

```
Prompt: "Genera factory para tests de carga que cree:
- Método crear_bulk(cantidad: 10000) usuarios rápidamente
- Optimizado para tests de performance
- Usa batch requests en lugar de individual
- Método para medir tiempo de creación"
```

### Caso 3: Tests de Validaciones

```
Prompt: "Genera factories que creen:
- usuarioSinEmail()
- usuarioConEmailInvalido()
- usuarioConContraseñaDebil()
- usuarioConNombreMuyLargo()
- Cada uno para probar validaciones diferentes"
```

---

## TIPS Y TRUCOS

### Tip 1: Emails Únicos

```typescript
// ✅ Garantizar unicidad
email: `test-${Date.now()}-${Math.random()}@fpuna.edu.py`

// ❌ Puede colisionar
email: `test@fpuna.edu.py`
```

### Tip 2: Faker Localizado

```typescript
// ✅ Nombres en español
import { faker } from '@faker-js/faker/locale/es_MX';
const nombre = faker.name.fullName();  // "María González"

// ❌ Nombres en inglés
import { faker } from '@faker-js/faker';
const nombre = faker.name.fullName();  // "John Smith"
```

### Tip 3: Validaciones en Factory

```typescript
// ✅ Factory valida antes de crear
private validar() {
  if (!this.datos.email.includes('@')) {
    throw new Error('Email inválido');
  }
}

async crear(page: Page) {
  this.validar();
  // Crear...
}
```

---

## CHECKLIST DESPUÉS DE GENERAR

- [ ] Código compila sin errores TypeScript
- [ ] Faker genera datos realistas
- [ ] Emails son únicos (timestamp + random)
- [ ] Factory tiene método build() y crear()
- [ ] Cleanup funciona correctamente
- [ ] Ejemplos de uso incluidos

---

*Prompt: Test Data Generation - Módulo 03 Arquitectura de Pruebas - FPUNA 2026*
