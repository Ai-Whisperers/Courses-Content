# 🌐 Módulo 05: Ingeniería de Sistemas Masivos

## Diseñando para la Carga Planetaria

> **Insight del Lead Architect**: En un sistema de 100 usuarios, casi cualquier arquitectura funciona. En un sistema de 100 millones, **todo lo que puede fallar, fallará**. Tu trabajo no es escribir código que funcione, es diseñar infraestructuras que sobrevivan al éxito masivo.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Pro-Elite | **🎯 Objetivo**: Orquestar sistemas distribuidos, implementar estrategias de resiliencia y simular colapsos para garantizar la alta disponibilidad.

---

## 🏗️ Los Mandamientos de la Gran Escala

| Concepto                          | Misión Crítica                                              | Herramienta de Poder     |
| :-------------------------------- | :---------------------------------------------------------- | :----------------------- |
| **Escalabilidad Horizontal**      | Añadir más barcos, no un barco más grande.                  | **Docker / Kubernetes**  |
| **Caching Inteligente**           | No preguntes a la DB por datos que no cambian.              | **Redis / Edge Caching** |
| **Resiliencia (Circuit Breaker)** | Si un servicio muere, no dejes que mate a todo el sistema.  | **Resilience4j / Istio** |
| **Eventual Consistency**          | Aceptar que los datos tardan milisegundos en sincronizarse. | **Kafka / RabbitMQ**     |

---

## 🤖 Workshop: El Arquitecto del Black Friday

FPUNA va a habilitar las inscripciones para 60,000 alumnos al mismo tiempo. Tienes 4 horas para asegurar que el sistema no explote.

### 📝 El Desafío de Carga

> **Prompt Maestro de Sistemas Masivos:**
> "Actúa como **Chief Systems Architect**. Diseña la topología de red para el 'Portal de Inscripción FPUNA'.
>
> 1. Implementa una capa de **Cache con Redis** para los cupos de materias (operación ultra-frecuente).
> 2. Configura un **Load Balancer** que reparta el tráfico entre 5 clusters del servicio de inscripciones.
> 3. Diseña una **Arquitectura de Eventos** para que los correos de confirmación se envíen de forma asíncrona sin bloquear al usuario principal.
> 4. Genera un diagrama Mermaid que muestre el flujo desde que el alumno hace clic hasta que el dato llega a la base de datos distribuida."

---

## 📊 Simulación de Caos (Chaos Engineering)

No esperes al lunes de inscripciones para ver si funciona. Usa la IA para simular el apocalipsis.

> **Prompt de Caos:**
> "OpenCode, genera un script de **Stress Testing con K6** que simule 5,000 usuarios concurrentes haciendo login e inscribiéndose en 3 materias simultáneamente. Identifica en qué punto la latencia supera los 2 segundos y sugiere optimizaciones de base de datos (ej: índices, read replicas)."

---

## 📺 Recursos de Élite

- **Netflix Tech Blog: High Availability and Scalability**: [Casos de Estudio](https://netflixtechblog.com/tagged/scalability)
- **System Design Primer (Donegal)**: [Referencia de Élite](https://github.com/donnemartin/system-design-primer)

* **High Scalability Blog**: [Historias de Guerra Reales](http://highscalability.com/)
* **AWS Well-Architected Framework**: [Estándares de Nube](https://aws.amazon.com/architecture/well-architected/)

---

## 🎯 El Desafío Final

Felicidades, Lead Architect. Has completado el entrenamiento de élite. Ahora es momento de demostrar de qué eres capaz en el Proyecto Capstone.

👉 **[Ir al Proyecto Capstone](./capstone/README.md)**
