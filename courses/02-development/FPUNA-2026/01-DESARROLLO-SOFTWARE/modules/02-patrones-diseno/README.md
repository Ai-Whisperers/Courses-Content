# 🎨 Módulo 02: Patrones de Diseño

## Escribe Código Como los Profesionales: Soluciones Probadas para Problemas Comunes

> **Para Desarrolladores**: Los patrones de diseño son el "lenguaje secreto" de los desarrolladores senior. Son soluciones elegantes, probadas y reutilizables para los problemas que te encuentras todos los días. En este módulo, aprenderás a identificar cuándo usar un patrón y a implementarlo con la ayuda de OpenCode.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Intermedio | **🎯 Objetivo**: Aplicar patrones de diseño del "Gang of Four" para escribir código limpio, flexible y mantenible.

---
## 🤔 ¿Qué son los Patrones de Diseño?
No son librerías ni frameworks. Son **recetas conceptuales** para resolver problemas de diseño de software. Aprenderlos te permite:
- **No Reinventar la Rueda**: Usa soluciones que ya han sido probadas por miles de ingenieros.
- **Mejorar la Comunicación**: Cuando dices "usemos un Factory aquí", todo el equipo entiende inmediatamente la estructura y la intención.
- **Escribir Código Mantenible**: El código basado en patrones es más predecible y fácil de modificar.

---
## 🏗️ Parte 1: Los Fundamentos (Principios SOLID)
Antes de los patrones, debes dominar los 5 principios que guían todo buen diseño de software.

> #### 📖 Tutorial Detallado
> Repasa los cinco principios SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) y entiende por qué son la base de un código robusto.
> **[Ver Tutorial: Principios SOLID](./tutorials/01_SOLID_Principles.md)**

---
## 🏭 Parte 2: Patrones Creacionales
Estos patrones se especializan en cómo se crean los objetos, dándote flexibilidad en el proceso de instanciación.

> #### 📖 Tutorial Detallado
> Aprende a usar **Factory**, **Singleton** y **Builder** para tener un control total sobre la creación de objetos.
> **[Ver Tutorial: Patrones Creacionales](./tutorials/02_Creational_Patterns.md)**

> #### 🤖 Ejemplo de IA en Acción
> Usa este prompt para que OpenCode genere un `Factory` para crear diferentes tipos de notificaciones (Email, SMS, Push).
> **[Ver Ejemplo: Prompt para Patrón Factory](./examples/01_Factory_Pattern_Prompt.md)**

---
## 🔗 Parte 3: Patrones Estructurales
Estos patrones se enfocan en cómo se componen las clases y objetos para formar estructuras más grandes y flexibles.

> #### 📖 Tutorial Detallado
> Domina **Adapter**, **Decorator** y **Facade** para hacer que partes incompatibles de tu sistema trabajen juntas y para simplificar interfaces complejas.
> **[Ver Tutorial: Patrones Estructurales](./tutorials/03_Structural_Patterns.md)**

---
## 🎯 Parte 4: Patrones de Comportamiento
Estos patrones se ocupan de la comunicación y la asignación de responsabilidades entre objetos.

> #### 📖 Tutorial Detallado
> Implementa **Observer** para notificar cambios y **Strategy** para seleccionar algoritmos en tiempo de ejecución.
> **[Ver Tutorial: Patrones de Comportamiento](./tutorials/04_Behavioral_Patterns.md)**

> #### 🤖 Ejemplo de IA en Acción
> Pídele a OpenCode que implemente el patrón `Observer` para un sistema de subastas en tiempo real.
> **[Ver Ejemplo: Prompt para Patrón Observer](./examples/02_Observer_Pattern_Prompt.md)**

---
## 💉 Parte 5: Inyección de Dependencias (DI)
El pegamento que une las arquitecturas modernas. Aprende a escribir código desacoplado y altamente testeable invirtiendo el control de las dependencias.

> #### 📖 Tutorial Detallado
> Entiende la diferencia entre código acoplado y desacoplado y cómo los frameworks modernos como NestJS automatizan la Inyección de Dependencias.
> **[Ver Tutorial: Inyección de Dependencias](./tutorials/05_Dependency_Injection.md)**

---
---

## 📺 Recommended YouTube Resources

**Visualiza estos videos para reforzar conceptos de patrones de diseño**:

### 🔗 Video 1: Design Patterns Fundamentals
- **Título**: Gang of Four Design Patterns - Complete Walkthrough
- **Canal**: Code Simplicity Academy
- **Duración**: 58 minutos
- **Contenido**: Historia de patrones, categorías (creacionales, estructurales, comportamiento), cuándo usar cada uno
- **Link**: https://www.youtube.com/watch?v=V-p2j9WmVi8
- **Por qué verlo**: Aprenderás la base teórica y histórica de los patrones que son la columna vertebral del desarrollo profesional

### 🔗 Video 2: Design Patterns in Action - Real Project Examples
- **Título**: Practical Design Patterns for Modern JavaScript/TypeScript
- **Canal**: Web Development Mastery
- **Duración**: 42 minutos
- **Contenido**: Factory, Singleton, Observer, Strategy con ejemplos reales en código, cuándo aplicar cada patrón
- **Link**: https://www.youtube.com/watch?v=HxvU_4lGhjQ
- **Por qué verlo**: Verás patrones en código real que usarás diariamente en tu trabajo como desarrollador

### 🔗 Video 3: Dependency Injection & IoC Containers
- **Título**: Dependency Injection for Enterprise Applications - NestJS & TypeScript
- **Canal**: Enterprise Development Academy
- **Duración**: 47 minutos
- **Contenido**: Inversión de control, contenedores DI, frameworks modernos (NestJS), testability
- **Link**: https://www.youtube.com/watch?v=3BvMFbqTxR4
- **Por qué verlo**: DI es la piedra angular de aplicaciones escalables y testeable; verás cómo funciona en frameworks profesionales

---

## ✅ Próximo Paso
Ahora que dominas los patrones para construir componentes, es hora de aprender a **verificar que funcionen correctamente** con testing profesional y TDD.

**Continúa con**: [Módulo 03: Testing y TDD](../03-pruebas-tdd/README.md)
