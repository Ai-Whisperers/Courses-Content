# 🏗️ Módulo 01: Arquitectura de Software

## Diseña Sistemas que Escalan y Perduran en el Tiempo

> **Para Desarrolladores**: Este módulo te enseña a diseñar la "estructura" de sistemas de software, como un arquitecto diseña los planos de un edificio. Aprenderás la arquitectura más importante y a usar OpenCode para implementarla rápidamente.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Intermedio | **🎯 Objetivo**: Dominar la arquitectura en capas y entender cuándo escalar a otras arquitecturas.

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
| **1. En Capas (Layered)** ⭐ | Aplicaciones CRUD, MVPs | Simple y organizado | Difícil de escalar independientemente |
| **2. Microservicios** | Sistemas complejos y grandes | Escalabilidad y autonomía de equipos | Alta complejidad operacional |
| **3. Orientada a Eventos** | Sistemas asíncronos y desacoplados | Resiliencia y escalabilidad | Debugging y trazabilidad complejos |

> **🎯 En este taller nos enfocamos en Arquitectura en Capas** - es la base que necesitas dominar antes de avanzar a arquitecturas más complejas. Microservicios y Event-Driven son temas avanzados que requieren experiencia previa.

---
## 🏢 Arquitectura en Capas (Layered)
La base de la mayoría de las arquitecturas. Organiza el código en capas lógicas con responsabilidades claras. **El 90% de las aplicaciones que construirás en tu carrera usarán esta arquitectura.**

> #### 📖 Tutorial Detallado
> Aprende a estructurar una aplicación en capas de Presentación, Lógica de Negocio y Acceso a Datos.
> **[Ver Tutorial: Arquitectura en Capas](./tutorials/01_Layered_Architecture.md)**

> #### 🤖 Ejemplo de IA en Acción
> Usa este prompt para que OpenCode genere una API REST completa siguiendo la arquitectura en capas.
> **[Ver Ejemplo: Prompt para API en Capas](./examples/01_Layered_Architecture_Prompt.md)**

### Conceptos Clave
- **Separación de responsabilidades**: Cada capa tiene un único propósito
- **Dependencias unidireccionales**: Las capas superiores dependen de las inferiores, nunca al revés
- **Testabilidad**: Puedes probar cada capa de forma aislada

---
## 📚 Para Profundizar (Lectura Opcional)
Si quieres explorar arquitecturas más avanzadas después del taller:
- **Microservicios**: [microservices.io](https://microservices.io/) - Patrones y antipatrones
- **Event-Driven**: [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)
- **API Design**: [RESTful API Design Guide](https://restfulapi.net/)

---
---

## 📺 Recommended YouTube Resources

**Visualiza estos videos para reforzar conceptos de arquitectura de software**:

### 🔗 Video 1: Software Architecture Fundamentals - Core Concepts
- **Título**: The Software Architecture Handbook - From Monolith to Microservices
- **Canal**: Tech Academy
- **Duración**: 52 minutos
- **Contenido**: Decisiones arquitectónicas, trade-offs, estilos principales, cuando usar cada uno
- **Link**: https://www.youtube.com/watch?v=C7adWvw420w
- **Por qué verlo**: Panorama completo de conceptos que forman la base de este módulo

### 🔗 Video 2: Layered Architecture Deep Dive
- **Título**: Mastering Layered Architecture - Design Patterns for Scalable Applications
- **Canal**: Software Design Patterns Academy
- **Duración**: 38 minutos
- **Contenido**: Estructura en capas, separación de responsabilidades, testing en capas, refactoring
- **Link**: https://www.youtube.com/watch?v=cNUe6MkJKK8
- **Por qué verlo**: Aprenderas prácticamente cómo estructurar aplicaciones reales con la arquitectura en capas

### 🔗 Video 3: REST API Design Best Practices
- **Título**: RESTful API Design - Best Practices & Patterns
- **Canal**: API Academy
- **Duración**: 45 minutos
- **Contenido**: Diseño de endpoints, versionamiento, códigos de respuesta, documentación, seguridad
- **Link**: https://www.youtube.com/watch?v=iqRDvq-vPOs
- **Por qué verlo**: APIs bien diseñadas son críticas en cualquier arquitectura moderna; aprenderás estándares de industria

---

## ✅ Próximo Paso
Ahora que entiendes las arquitecturas, el siguiente paso es aprender los **Patrones de Diseño** que se usan para construir los componentes *dentro* de esas arquitecturas.

**Continúa con**: [Módulo 02: Patrones de Diseño](../02-patrones-diseno/README.md)
