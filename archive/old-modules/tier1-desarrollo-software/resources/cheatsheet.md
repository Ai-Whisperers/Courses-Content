# Cheatsheet: IA para Desarrollo de Software
## Tier 1 - Quick Reference

---

## Herramientas por Tarea

| Tarea | Herramienta | Atajo |
|-------|-------------|-------|
| Completar línea | Copilot | `Tab` |
| Editar selección | Cursor | `Ctrl+K` |
| Chat con contexto | Cursor | `Ctrl+L` |
| Multi-archivo | Cursor Composer | `Ctrl+I` |
| Diseño/arquitectura | Claude/ChatGPT | Chat |
| Debugging | Claude | Chat |

---

## Estructura de Prompt Efectivo

```
CONTEXTO: [Stack, versiones]
CÓDIGO: [Si hay código existente]
TAREA: [Qué necesitas]
REQUISITOS: [Especificaciones]
FORMATO: [Cómo quieres la salida]
```

---

## Backend - Patrón de Endpoint

```typescript
// controllers/[resource]Controller.ts
import { z } from 'zod';

const schema = z.object({ /* ... */ });

export const create = async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    const result = await prisma.[resource].create({ data });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
```

---

## Frontend - Componente Base

```tsx
interface Props {
  // Props tipadas
}

export function Component({ prop1, prop2 }: Props) {
  return (
    <div className="tailwind-classes">
      {/* Contenido */}
    </div>
  );
}
```

---

## Testing - Estructura Jest

```typescript
describe('Función/Componente', () => {
  describe('casos exitosos', () => {
    it('descripción del caso', () => {
      expect(resultado).toBe(esperado);
    });
  });

  describe('casos de error', () => {
    it('maneja error X', () => {
      expect(() => fn()).toThrow();
    });
  });
});
```

---

## Docker - Comandos Esenciales

```bash
# Desarrollo
docker-compose up --build
docker-compose down -v

# Debug
docker logs <container>
docker exec -it <container> sh

# Limpieza
docker system prune -a
```

---

## GitHub Actions - Template

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
```

---

## HTTP Status Codes

| Código | Uso |
|--------|-----|
| 200 | OK - GET exitoso |
| 201 | Created - POST exitoso |
| 204 | No Content - DELETE exitoso |
| 400 | Bad Request - Validación |
| 401 | Unauthorized - Sin auth |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found |
| 500 | Server Error |

---

## Validación Zod - Patrones

```typescript
// String
z.string().min(1).max(255)

// Email
z.string().email()

// Número
z.number().positive()

// Enum
z.enum(['OPTION1', 'OPTION2'])

// Opcional
z.string().optional()

// Con default
z.string().default('valor')

// Array
z.array(z.string())

// Objeto
z.object({ field: z.string() })
```

---

## Comandos NPM Esenciales

```bash
# Instalar dependencias
npm ci                  # CI (limpio)
npm install            # Desarrollo

# Ejecutar
npm run dev            # Desarrollo
npm run build          # Producción
npm test               # Tests
npm test -- --coverage # Con cobertura

# Prisma
npx prisma generate    # Generar cliente
npx prisma migrate dev # Migrar dev
npx prisma studio      # UI de BD
```

---

## Atajos de Teclado

### VS Code / Cursor

| Acción | Windows | Mac |
|--------|---------|-----|
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Quick Open | `Ctrl+P` | `Cmd+P` |
| Terminal | `Ctrl+`` | `Cmd+`` |
| Buscar en archivos | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Formato | `Shift+Alt+F` | `Shift+Option+F` |

### Cursor Específico

| Acción | Windows | Mac |
|--------|---------|-----|
| Edit with AI | `Ctrl+K` | `Cmd+K` |
| AI Chat | `Ctrl+L` | `Cmd+L` |
| Composer | `Ctrl+I` | `Cmd+I` |

---

## Checklist Pre-Commit

- [ ] Tests pasan
- [ ] Sin errores de lint
- [ ] Tipos correctos
- [ ] Sin console.log
- [ ] Documentación actualizada

---

## Debugging con IA - Template

```
ERROR:
[Pegar error]

CÓDIGO:
[Pegar código relevante]

CONTEXTO:
- Stack: [versiones]
- Qué intentaba: [acción]
- Cuándo ocurre: [condición]

YA PROBÉ:
- [intento 1]
- [intento 2]
```

---

*Cheatsheet Tier 1 - Desarrollo de Software*
*Imprimir para referencia rápida*
