# 🧩 Módulo 02: Patrones de Mando

## El Lenguaje de Programación de la IA

> **Insight del Lead Architect**: En 2026, no escribes código, escribes **intenciones**. Los Patrones de Diseño son las palabras de poder que le dicen a la IA exactamente cómo organizar el caos sin que tengas que explicar cada detalle. Un "Builder" o un "Strategy" valen más que mil líneas de documentación.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Pro | **🎯 Objetivo**: Dominar el uso de patrones de diseño como herramientas de comunicación de alta densidad para dirigir agentes de IA.

---

## 🏗️ SOLID: El Código de Ética del Arquitecto

No pidas a la IA que sea "limpia". Exige que sea **SOLID**:

- **S (Responsabilidad Única)**: Cada módulo hace una sola cosa, pero la hace perfecto.
- **O (Abierto/Cerrado)**: Tu core es sagrado; si quieres añadir funciones, añade código nuevo, no toques el viejo.
- **L (Sustitución de Liskov)**: Las piezas deben ser intercambiables sin que el sistema explote.
- **I (Segregación de Interfaces)**: No obligues a tus componentes a cargar con basura que no necesitan.
- **D (Inversión de Dependencias)**: El jefe no depende del empleado; ambos dependen de un contrato (interfaz).

---

## 🎭 Patrones de Mando (Command Set)

Usa estos nombres con la IA para obtener resultados instantáneos de grado profesional:

### 1. Patrones de Creación (¿Cómo nace el objeto?)

- **Factory / Abstract Factory**: Ideal para cuando tienes múltiples proveedores (ej: `PaymentProviderFactory`).
- **Singleton**: Cuando solo puede existir un capitán en el barco (ej: `DatabaseConnection`).
- **Builder**: Para construir objetos complejos paso a paso con máxima legibilidad.

### 2. Patrones de Comportamiento (¿Cómo actúa el objeto?)

- **Strategy**: El patrón rey de la flexibilidad. Permite cambiar algoritmos en tiempo real (ej: diferentes métodos de cálculo de becas).
- **Observer (Pub/Sub)**: Para sistemas desacoplados que reaccionan a eventos (ej: cuando un alumno se inscribe, notifica a pagos y a biblioteca).
- **State**: Cuando el comportamiento cambia según el estado (ej: una solicitud que pasa de "Pendiente" a "Aprobada").

---

## 🤖 Workshop: El Refactoring del Siglo

Vamos a tomar un código "monolítico y espagueti" que maneja toda la lógica de becas universitarias y lo vamos a transformar en una obra de arte modular.

> **Prompt Maestro de Patrones:**
> "Actúa como **Expert Software Architect**. Analiza la lógica adjunta de `BecaManager.js`. Detecta las violaciones a SOLID y realiza una refactorización profunda:
>
> 1. Implementa el patrón **Strategy** para manejar los diferentes tipos de becas (Deportiva, Académica, Social).
> 2. Usa un **Factory** para instanciar la estrategia correcta según el perfil del alumno.
> 3. Asegura el cumplimiento de la **Inversión de Dependencias** usando interfaces de TypeScript.
> 4. El resultado debe ser un código donde añadir una nueva beca sea tan simple como crear un archivo nuevo."

---

## 📺 Recursos de Élite

- **Patrones de Diseño Visuales**: [Refactoring Guru](https://refactoring.guru/design-patterns)
- **Catalog of Design Patterns (Sourcemaking)**: [Referencia Profesional](https://sourcemaking.com/design_patterns)
- **The SOLID Principles (DigitalOcean Engineering)**: [Deep Dive Técnico](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)

---

## ✅ Próximo Paso

Ahora que tus componentes son elegantes y modulares, debemos asegurar que nadie pueda romperlos. Entramos en la fase de protección absoluta.

**Continúa con**: [Módulo 03: Blindaje de Calidad](./03-blindaje-de-calidad.md)
