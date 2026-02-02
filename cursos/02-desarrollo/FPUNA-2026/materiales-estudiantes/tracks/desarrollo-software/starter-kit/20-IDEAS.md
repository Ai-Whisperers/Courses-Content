# 20 Desafíos de Arquitectura Aumentada

## De Micro-Arquitecturas a Sistemas Soberanos

Este catálogo no contiene "scripts". Contiene **Misiones de Ingeniería**. Cada proyecto debe implementarse usando la arquitectura de **Puertos y Adaptadores**.

---

## 🟢 FASE 01: Micro-Arquitecturas (Semanas 1-2)

_Enfoque: Soberanía del Dominio y Desacoplamiento_

1.  **Entidad "Moneda" Soberana**: Crea una lógica de conversión de divisas donde el Dominio sea inmune a las APIs de cotización externas.
2.  **Validador de Identidad Regional**: Implementa validadores para RUC/CI (Paraguay) como un Puerto de infraestructura.
3.  **Gestor de Tareas Inmutable**: Una TODO app donde la persistencia (JSON/SQL) sea un adaptador intercambiable.
4.  **Notificador Multi-Canal**: Sistema que envía mensajes por Telegram o Email sin que el Dominio sepa cuál se está usando.
5.  **Calculadora de Impuestos (SET)**: Reglas de negocio puras para el IVA paraguayo, totalmente testeadas.
6.  **Simulador de Caja de Ahorro**: Manejo de transacciones bancarias con validación de saldos en el corazón del Dominio.
7.  **Generador de Reportes Térmicos**: Creación de facturas legales desacopladas del hardware de impresión.

---

## 🟡 FASE 02: Sistemas Distribuidos (Semanas 3-4)

_Enfoque: Orquestación, Docker y Blindaje_

8.  **API de Inventario Industrial**: CRUD completo con FastAPI usando Puertos para PostgreSQL y Redis.
9.  **Sistema de Autenticación Centralizado**: Implementación de JWT con roles (Admin/Guest) y auditoría forense.
10. **Tracker de Logística en Tiempo Real**: Uso de WebSockets para seguir paquetes en un mapa (Frontend React + Backend Node).
11. **Bóveda de Documentos Segura**: Gestión de archivos con adaptadores para AWS S3 y Local Storage simultáneos.
12. **Bus de Mensajería para Notificaciones**: Orquestación de eventos con RabbitMQ para separar procesos pesados.
13. **Monitor de Precios Autónomo**: Worker que escanea el mercado y genera alertas de cambio brusco.
14. **CLI de Administración Universitaria**: Herramienta profesional para gestionar alumnos desde la terminal.

---

## 🔴 FASE 03: Ingeniería de Sistemas Masivos (Semanas 5+)

_Enfoque: Alta Disponibilidad, Resiliencia y Escala_

15. **E-Commerce de Grado Industrial**: Microservicios orquestados con Docker Compose y Balanceador de Carga.
16. **Pipeline de CI/CD Incorruptible**: Automatización total de tests, seguridad y despliegue a producción.
17. **Sistema de Caching Multinivel**: Optimización extrema usando Redis en memoria y persistencia distribuida.
18. **Observabilidad 360°**: Integración de Prometheus, Grafana y Logs Estructurados para monitorizar fallos.
19. **Ledger de Transacciones con Event Sourcing**: Historial inmutable de movimientos financieros (Auditoría total).
20. **Gateway de Pagos con Circuit Breaker**: Integración con MercadoPago que resiste caídas del proveedor.

---

## 📋 Checklist Final del Lead Architect

Para cada proyecto, pregúntate:

- [ ] ¿Mi lógica de negocio (Dominio) sabe algo sobre SQL o mi framework web? (Respuesta ideal: NO).
- [ ] ¿Puedo cambiar de base de datos cambiando solo un archivo?
- [ ] ¿Tengo un **Blindaje de Calidad** (Tests) que cubra el 80%?
- [ ] ¿Mi sistema corre en cualquier máquina con un solo comando de Docker?

---

_FPUNA 2026 - Formando la Élite del Desarrollo de Software_
