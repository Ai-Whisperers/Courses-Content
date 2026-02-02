# 🏗️ Módulo 01: Arquitectura Soberana

## Puertos y Adaptadores (Ports & Adapters)

> **Insight del Lead Architect**: La arquitectura no consiste en elegir librerías; consiste en **crear fronteras**. En este módulo aprenderás a aislar la inteligencia de tu negocio usando el patrón **Puertos y Adaptadores**, garantizando que ninguna base de datos o API externa pueda contaminar tu lógica central.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Pro | **🎯 Objetivo**: Diseñar y desplegar una arquitectura de Puertos y Adaptadores que sea 100% independiente de la infraestructura tecnológica.

---

## 🌌 El Verdadero Nombre: Puertos y Adaptadores

A menudo se le llama equivocadamente "Arquitectura Hexagonal", pero el nombre formal y correcto es **Ports & Adapters**.

1. **La Idea Central**: Tu aplicación tiene una "cara" interna (el Dominio) que no sabe nada del mundo exterior.
2. **Puertos (Ports)**: Son las especificaciones técnicas o "enchufes". Definen qué necesita la aplicación para funcionar (ej: "necesito guardar un usuario", "necesito enviar un mail").
3. **Adaptadores (Adapters)**: Son las implementaciones concretas. Es el código que "adapta" una herramienta real (PostgreSQL, Stripe, AWS) al puerto que definió la aplicación.
4. **Independencia Total**: Si mañana cambias de proveedor de correo, solo cambias el Adaptador. El corazón de tu código (el Dominio) ni siquiera se entera.

---

## 🏗️ La Anatomía del Sistema Soberano

| Capa            | Responsabilidad                                       | Dependencia IA                               |
| :-------------- | :---------------------------------------------------- | :------------------------------------------- |
| **Dominio**     | Reglas de oro del negocio (Entidades/Lógica).         | **Pura**. La IA debe ser ultra-precisa aquí. |
| **Puertos**     | Interfaces que definen cómo entrar/salir del sistema. | **Estructural**. Define el contrato.         |
| **Adaptadores** | Implementación real (SQL, REST, WebSockets).          | **Automatizada**. Pura delegación técnica.   |

---

## 🤖 Workshop: El Gran Despliegue de Puertos y Adaptadores

Tu misión es crear un microservicio de **Gestión de Inscripciones** que sea inmune al cambio tecnológico.

### 📝 El Desafío Arquitectónico

Imagina que hoy usamos PostgreSQL, pero mañana la universidad decide migrar a una Base de Datos Graph. En esta arquitectura, **solo cambias un archivo (el adaptador)**.

> **Prompt> **[Ver Tutorial: Puertos y Adaptadores](./recursos/tutoriales/01_Puertos_y_Adaptadores.md)**
> "Actúa como **Lead Software Architect**. Evalúa los requerimientos de la 'Entidad Inscripción' y despliega una arquitectura de **Puertos y Adaptadores\*\* completa.
>
> 1. Define las entidades de Dominio (`Alumno`, `Curso`) sin dependencias externas.
> 2. Crea los Puertos (Interfaces) para persistencia y notificaciones.
> 3. Implementa Casos de Uso (`MatricularAlumno`) en la capa de Aplicación.
> 4. Genera Adaptadores para PostgreSQL usando Prisma.
> 5. **Regla Crítica**: Asegura que ninguna línea de código de Infraestructura (Prisma/Express) infecte el Dominio por debajo de las interfaces."

---

## 🚀 Orquestación con Docker

Un sistema soberano debe ser portátil. Usaremos Docker para que tu arquitectura corra en cualquier lugar sin instalar nada localmente.

> **Prompt de Infra:**
> "Genera un entorno de desarrollo reproducible con `docker-compose` que levante el microservicio, una base de datos PostgreSQL con volumen persistente y un explorador de datos. Configura los 'Healthchecks' para que el servicio espere a que la base de datos esté lista."

---

## 📺 Recursos de Élite

- **Arquitectura de Software Decoupled (Uber Engineering)**: [Leer Caso de Estudio](https://www.uber.com/en-AR/blog/architecture/)
- **Domain-Driven Design Pattern Library (Martin Fowler)**: [Explorar Referencia](https://martinfowler.com/tags/domain%20driven%20design.html)
- **The Clean Architecture**: [The Source of Truth](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

## ✅ Próximo Paso

Con las fronteras de tu sistema bien definidas mediante Puertos y Adaptadores, el siguiente paso es aprender el lenguaje de mando para que los componentes internos se comuniquen con elegancia.

**Continúa con**: [Módulo 02: Patrones de Mando](./02-patrones-de-mando.md)
