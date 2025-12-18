# Módulo 04: Testing y QA con IA
## Tier 1 - Desarrollo de Software

---

## Descripción

Este módulo enseña a usar IA para generar tests automatizados, realizar code reviews, y mantener alta calidad de código.

**Duración:** 2 horas
**Stack:** Jest, Playwright, Testing Library

---

## Objetivos de Aprendizaje

1. **Generar** tests unitarios automáticamente
2. **Implementar** tests de integración y E2E
3. **Realizar** code reviews asistidos por IA
4. **Identificar** vulnerabilidades y code smells

---

## Contenido

### 1. Generación de Tests Unitarios

**Prompt Efectivo:**
```
Genera tests unitarios con Jest para esta función:

[PEGAR FUNCIÓN]

INCLUIR:
- Casos de éxito (happy path)
- Casos de error
- Edge cases (null, undefined, vacío)
- Mocks de dependencias si es necesario
- Describe blocks organizados
- Nombres descriptivos en español

FORMATO: Jest + TypeScript
```

**Ejemplo:**
```typescript
// Función a testear
function calculateDiscount(price: number, percentage: number): number {
  if (price < 0 || percentage < 0 || percentage > 100) {
    throw new Error('Valores inválidos');
  }
  return price - (price * percentage / 100);
}

// Tests generados
describe('calculateDiscount', () => {
  describe('casos exitosos', () => {
    it('calcula descuento correctamente', () => {
      expect(calculateDiscount(100, 10)).toBe(90);
    });

    it('retorna precio original con 0% descuento', () => {
      expect(calculateDiscount(100, 0)).toBe(100);
    });

    it('retorna 0 con 100% descuento', () => {
      expect(calculateDiscount(100, 100)).toBe(0);
    });
  });

  describe('validación de errores', () => {
    it('lanza error con precio negativo', () => {
      expect(() => calculateDiscount(-10, 10)).toThrow('Valores inválidos');
    });

    it('lanza error con porcentaje mayor a 100', () => {
      expect(() => calculateDiscount(100, 150)).toThrow();
    });
  });
});
```

---

### 2. Tests de Integración

**Prompt para API Tests:**
```
Genera tests de integración para el endpoint:
POST /api/products

SETUP:
- Base de datos de prueba
- Usuario autenticado

CASOS:
- Crear producto válido → 201
- Datos inválidos → 400
- Sin autenticación → 401
- Producto duplicado → 409

Usar supertest + Jest
```

---

### 3. Tests E2E con Playwright

**Prompt:**
```
Genera test E2E con Playwright para flujo de login:

1. Ir a /login
2. Ingresar email y password válidos
3. Click en botón Login
4. Verificar redirect a /dashboard
5. Verificar que aparece nombre de usuario

INCLUIR: Caso de credenciales inválidas
```

---

### 4. Code Review con IA

**Prompt para Review:**
```
Revisa este código y proporciona feedback:

[PEGAR CÓDIGO]

EVALUAR:
1. Bugs potenciales
2. Vulnerabilidades de seguridad
3. Problemas de rendimiento
4. Violaciones de mejores prácticas
5. Oportunidades de refactoring

FORMATO: Lista priorizada con sugerencias de corrección
```

---

### 5. Identificación de Vulnerabilidades

**Prompt de Seguridad:**
```
Analiza este código buscando vulnerabilidades OWASP Top 10:

[CÓDIGO]

Buscar específicamente:
- Inyección SQL/NoSQL
- XSS
- CSRF
- Exposición de datos sensibles
- Autenticación rota
- Configuración insegura

Para cada problema: descripción, severidad, solución.
```

---

## Métricas de Calidad

| Métrica | Objetivo | Cómo Medir |
|---------|----------|------------|
| Cobertura | >80% | jest --coverage |
| Tests passing | 100% | CI pipeline |
| Complejidad ciclomática | <10 | eslint-plugin-complexity |
| Deuda técnica | Decreciente | SonarQube |

---

*Módulo 04 - Testing y QA con IA*
*Tier 1 - Desarrollo de Software*
