# 🧪 Módulo 03: Testing y Test-Driven Development (TDD)

## Construye Software Confiable y a Prueba de Errores con Pruebas Automatizadas

> **Para Desarrolladores**: ¿Cansado de encontrar bugs en producción? Este módulo te enseña a escribir tests automatizados profesionales y a adoptar el mindset de Test-Driven Development (TDD). Deja de "probar" con `console.log` y empieza a construir software robusto desde el primer día.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Intermedio | **🎯 Objetivo**: Dominar el testing profesional y TDD con herramientas como Jest y Playwright.

---
## 🤔 ¿Por Qué Escribir Tests?
Escribir tests no es un lujo, es una necesidad profesional. Los tests son una **red de seguridad** que te permite:
- **Refactorizar con Confianza**: Mejora tu código sin miedo a romper algo.
- **Prevenir Regresiones**: Asegura que los nuevos cambios no rompan funcionalidades antiguas.
- **Documentar tu Código**: Los tests son la mejor forma de documentación; muestran exactamente cómo se debe usar tu código.
- **Pasar Entrevistas Técnicas**: Ninguna empresa seria te contratará si no sabes escribir tests.

---
## 🏢 Parte 1: Fundamentos de Testing
Aprende a diferenciar los tipos de tests y a estructurarlos correctamente.

> #### 📖 Tutorial Detallado
> Entiende la Pirámide de Testing (Unit, Integration, E2E) y el patrón universal "Arrange-Act-Assert".
> **[Ver Tutorial: Fundamentos de Testing](./tutorials/01_Testing_Fundamentals.md)**

**Práctica con OpenCode**: Pídele que genere tests unitarios para un servicio, cubriendo casos de éxito y error.

---
## 🔬 Parte 2: Test-Driven Development (TDD)
Cambia tu forma de programar para siempre escribiendo los tests *antes* que el código.

> #### 📖 Tutorial Detallado
> Domina el ciclo "Red-Green-Refactor" para escribir código más limpio, modular y completamente testeado por diseño.
> **[Ver Tutorial: El Flujo de Trabajo TDD](./tutorials/02_TDD_Workflow.md)**

**Práctica con OpenCode**: Pídele que implemente una funcionalidad siguiendo TDD - primero el test fallido, luego el código mínimo.

---
## 🎭 Parte 3: Mocking y Stubbing
Aprende a aislar tus unidades de código usando "Test Doubles" para que tus tests sean rápidos, fiables y verdaderamente "unitarios".

> #### 📖 Tutorial Detallado
> Conoce la diferencia entre Mocks, Stubs, Spies y Fakes, y cuándo usar cada uno.
> **[Ver Tutorial: Mocking y Stubbing](./tutorials/03_Mocking_And_Stubbing.md)**

---
## 📊 Cobertura y Mejores Prácticas
No se trata solo de escribir tests, sino de escribir los tests correctos.
- **Cobertura**: Enfócate en lógica de negocio y caminos críticos, no en 100% de líneas
- **Tests descriptivos**: El nombre del test debe explicar qué se prueba y qué se espera
- **Tests independientes**: Cada test debe poder ejecutarse solo, sin depender de otros

---
---

## 📺 Recommended YouTube Resources

**Visualiza estos videos para reforzar conceptos de testing y TDD**:

### 🔗 Video 1: Test-Driven Development (TDD) in Practice
- **Título**: Test-Driven Development Mastery - Red-Green-Refactor Cycle
- **Canal**: Code Mastery Academy
- **Duración**: 51 minutos
- **Contenido**: Ciclo TDD, ventajas y desventajas, refactoring desde tests, profundidad de tests
- **Link**: https://www.youtube.com/watch?v=aKzZXycLjMU
- **Por qué verlo**: TDD es una mentalidad; verás cómo cambiar tu forma de pensar sobre desarrollo desde el primer test

### 🔗 Video 2: Unit Testing Best Practices with Jest/Vitest
- **Título**: Writing Effective Unit Tests - Jest & Testing Library Deep Dive
- **Canal**: Web Development Mastery
- **Duración**: 44 minutos
- **Contenido**: Estructura AAA de tests, asserciones, fixtures, testing library, debugging tests
- **Link**: https://www.youtube.com/watch?v=IQSD3gqg5BY
- **Por qué verlo**: Jest es el estándar de testing en TypeScript/JavaScript; aprenderás patrones profesionales

### 🔗 Video 3: Integration Testing & E2E Testing Strategies
- **Título**: Beyond Unit Tests - Integration & E2E Testing for Real-World Applications
- **Canal**: Enterprise Development Academy
- **Duración**: 48 minutos
- **Contenido**: Testing pyramid, testing integración vs unitarios, E2E con Cypress, test data factories
- **Link**: https://www.youtube.com/watch?v=JrDmhqAQs3s
- **Por qué verlo**: Tests unitarios son solo el principio; aprenderás estrategia completa de testing que protege tu aplicación

---

## ✅ Próximo Paso
Saber escribir tests es la mitad de la batalla. La otra mitad es escribir código que sea **fácil de testear**. Eso es lo que aprenderás en el siguiente módulo.

**Continúa con**: [Módulo 04: Código Limpio y Refactoring](../04-codigo-limpio/README.md)
