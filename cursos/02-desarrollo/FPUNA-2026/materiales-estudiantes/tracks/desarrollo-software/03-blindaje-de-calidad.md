# 🛡️ Módulo 03: Blindaje de Calidad

## Construyendo Sistemas Inmunes

> **Insight del Lead Architect**: El testing no es para encontrar errores actuales; es para **garantizar el futuro**. En un flujo AI-First, los tests son los "rieles" por los que viaja tu agente. Sin tests, la IA está volando a ciegas. Un sistema testeado es un sistema que puedes escalar infinitamente.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Pro | **🎯 Objetivo**: Implementar un ecosistema de protección total usando TDD radical y auditoría automática de integridad.

---

## ⚔️ La Filosofía del Blindaje

En el paradigma antiguo, el QA era el equipo que te decía qué estaba mal al final del mes. En el **Desarrollo Aumentado**, tú eres el QA desde el segundo uno.

### 1. TDD Radical (Test-Driven Development)

No delegas código; delegas el **cumplimiento de una prueba**.

- **Ciclo Rojo**: Escribes el test (falla).
- **Ciclo Verde**: La IA escribe el código (pasa).
- **Ciclo Refactor**: La IA limpia el código manteniendo el verde.

### 2. Contract Testing

Cuando trabajas con microservicios, el blindaje más importante es el **Contrato**. Si el servicio de "Pagos" cambia su respuesta, el servicio de "Inscripciones" debe saberlo inmediatamente sin romper producción.

---

## 🧪 El Arsenal del Arquitecto

| Herramienta       | Nivel de Defensa | Misión Crítica                                                |
| :---------------- | :--------------- | :------------------------------------------------------------ |
| **Vitest / Jest** | Unidad           | Probar funciones y lógica de negocio pura (Dominio).          |
| **Supertest**     | Integración      | Validar que los endpoints respondan lo que deben.             |
| **Playwright**    | E2E              | Simular al usuario real en el navegador (La prueba de fuego). |
| **Pact**          | Contrato         | Asegurar que los servicios hablen el mismo idioma.            |

---

## 🤖 Workshop: Defensa Profunda

Vas a blindar el proceso de **Cierre de Actas**, la operación más crítica de la universidad.

> **Prompt Maestro de Blindaje:**
> "Actúa como **Senior SDET**. Vamos a desarrollar la lógica de 'Cierre de Acta Virtual' usando TDD Radical.
>
> 1. Crea una suite de tests en `Vitest` que valide: solo docentes autorizados pueden cerrar, el acta no puede estar vacía, y una vez cerrada es inmutable.
> 2. Implementa la lógica mínima necesaria en el servicio para que todos los tests pasen (Ciclo Verde).
> 3. Configura un **Mocker** para el sistema externo de 'Identidad' para que los tests sean 100% independientes y rápidos."

---

## 📊 Auditoría de Coraza (Coverage)

¿Cómo sabes si tu blindaje tiene agujeros? Usamos auditoría de cobertura generada por IA.

> **Prompt de Auditoría:**
> "Analiza el reporte de cobertura adjunto. Identifica las rutas lógicas que no tienen tests unitarios. Genera automáticamente los casos de prueba faltantes enfocándote en los 'Edge Cases' (casos extremos y errores) para alcanzar una seguridad del 95%."

---

## 📺 Recursos de Élite

- **Effective Unit Testing (GitHub Engineering)**: [Guía de Prácticas](https://github.blog/2023-08-16-how-to-write-effective-unit-tests/)
- **The Practical Test Pyramid (Ham Vocke)**: [Referencia de Arquitectura](https://martinfowler.com/articles/practical-test-pyramid.html)

* **The Art of Unit Testing**: [Libro de Referencia](https://www.manning.com/books/the-art-of-unit-testing-third-edition)

---

## ✅ Próximo Paso

Con un sistema blindado, podemos darnos el lujo de realizar una limpieza profunda sin miedo. Vamos a remover la grasa y dejar solo el músculo técnico.

**Continúa con**: [Módulo 04: Auditoría de Elite](./04-auditoria-de-elite.md)
