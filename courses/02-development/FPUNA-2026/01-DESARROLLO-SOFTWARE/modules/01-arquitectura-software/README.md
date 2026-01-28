# 🏗️ Módulo 01: Arquitectura de Software

## Diseña Sistemas que Escalan y Perduran en el Tiempo

> **Para Desarrolladores**: Este módulo te enseña a diseñar la "estructura" de sistemas de software, como un arquitecto diseña los planos de un edificio. Aprenderás a elegir la arquitectura correcta para cada problema y a usar OpenCode para implementarla rápidamente.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Intermedio | **🎯 Objetivo**: Dominar los patrones de arquitectura de software moderna.

---
## 🤔 ¿Qué es la Arquitectura de Software?
Es el conjunto de decisiones de diseño de alto nivel que definen la estructura, los componentes y las interacciones de un sistema de software. Una buena arquitectura hace que un sistema sea:
- **Mantenible**: Fácil de modificar y extender.
- **Escalable**: Capaz de crecer para manejar más usuarios y datos.
- **Robusto**: Resistente a fallos.

---
## 📊 Los 3 Estilos Arquitectónicos Principales
No existe una "mejor" arquitectura; cada una es una herramienta para un tipo de problema diferente.

| Estilo | Ideal Para | Ventaja Principal | Desventaja Principal |
| :--- | :--- | :--- | :--- |
| **1. En Capas (Layered)** | Aplicaciones CRUD, MVPs | Simple y organizado | Difícil de escalar independientemente |
| **2. Microservicios** | Sistemas complejos y grandes | Escalabilidad y autonomía de equipos | Alta complejidad operacional |
| **3. Orientada a Eventos** | Sistemas asíncronos y desacoplados | Resiliencia y escalabilidad | Debugging y trazabilidad complejos |

---
## 🏢 Parte 1: Arquitectura en Capas (Layered)
La base de la mayoría de las arquitecturas. Organiza el código en capas lógicas con responsabilidades claras.

> #### 📖 Tutorial Detallado
> Aprende a estructurar una aplicación en capas de Presentación, Lógica de Negocio y Acceso a Datos.
> **[Ver Tutorial: Arquitectura en Capas](./tutorials/01_Layered_Architecture.md)**

> #### 🤖 Ejemplo de IA en Acción
> Usa este prompt para que OpenCode genere una API REST completa siguiendo la arquitectura en capas.
> **[Ver Ejemplo: Prompt para API en Capas](./examples/01_Layered_Architecture_Prompt.md)**

---
## 🔬 Parte 2: Microservicios
Descompone una aplicación grande en una colección de servicios pequeños, independientes y autónomos.

> #### 📖 Tutorial Detallado
> Descubre cuándo y cómo migrar de un monolito a microservicios, y los patrones de comunicación clave.
> **[Ver Tutorial: Arquitectura de Microservicios](./tutorials/02_Microservices.md)**

> #### 🤖 Ejemplo de IA en Acción
> Genera la estructura completa de un microservicio (controladores, servicios, repositorios, DTOs, Dockerfile) con un solo prompt.
> **[Ver Ejemplo: Prompt para Microservicio](./examples/02_Microservice_Structure_Prompt.md)**

---
## ⚡ Parte 3: Arquitectura Orientada a Eventos (Event-Driven)
Permite la comunicación asíncrona y el desacoplamiento total entre servicios a través de un "Message Broker" (como RabbitMQ o Kafka).

> #### 📖 Tutorial Detallado
> Aprende a implementar patrones como Publish/Subscribe y Sagas para construir sistemas resilientes.
> **[Ver Tutorial: Arquitectura Orientada a Eventos](./tutorials/04_Event_Driven_Architecture.md)**

> #### 🤖 Ejemplo de IA en Acción
> Crea un sistema de procesamiento de órdenes donde múltiples servicios reaccionan a un evento `order.created`.
> **[Ver Ejemplo: Prompt para Sistema de Eventos](./examples/04_Event_Driven_Prompt.md)**

---
## 🎨 Parte 4: Diseño de APIs (REST vs. GraphQL)
La API es el "contrato" de tu servicio. Aprende a diseñar APIs limpias, eficientes y fáciles de usar.

> #### 📖 Tutorial Detallado
> Compara las ventajas y desventajas de REST y GraphQL y aprende cuándo usar cada uno.
> **[Ver Tutorial: Diseño de APIs](./tutorials/03_API_Design.md)**

> #### 🤖 Ejemplo de IA en Acción
> Pídele a OpenCode que genere tanto un endpoint REST como un schema de GraphQL para el mismo recurso y compara los resultados.
> **[Ver Ejemplo: Prompts para Diseño de APIs](./examples/03_API_Design_Prompts.md)**

---
## ✅ Próximo Paso
Ahora que entiendes las arquitecturas, el siguiente paso es aprender los **Patrones de Diseño** que se usan para construir los componentes *dentro* de esas arquitecturas.

**Continúa con**: [Módulo 02: Patrones de Diseño](../02-patrones-diseno/README.md)
