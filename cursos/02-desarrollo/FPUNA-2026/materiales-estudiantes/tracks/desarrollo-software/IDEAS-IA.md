# Playbook de Ejecución Estratégic (Track 01)

## Orquestación Táctica con OpenCode + Oh My OpenCode

Este no es un manual de ideas. Es el **Mapa de Guerra** para un Lead Architect. Aquí encontrarás los movimientos tácticos de alto impacto que transforman un requerimiento ambiguo en un sistema de grado industrial.

---

## 🏗️ 1. Orquestación Arquitectónica

### ⚡ Táctica: El Dominio Puro

**Objetivo**: Crear el corazón del sistema sin una sola línea de deuda técnica.

- **Prompt**: "Actúa como **Domain Expert**. Genera las entidades y reglas de negocio para [Feature]. Prohibido usar tipos externos o frameworks. El código debe ser lógica pura testeable."
- **Impacto**: Independencia total del Stack Tecnológico.

### ⚡ Táctica: Inyección de Fronteras (Ports)

**Objetivo**: Definir cómo el mundo exterior interactúa con tu negocio.

- **Prompt**: "Analiza mi Dominio y genera los **Puertos (Interfaces)** necesarios para persistencia, colas de mensajes y APIs. Documenta el contrato esperado para cada adaptador."
- **Impacto**: Escalabilidad sin fricción.

---

## �️ 2. Blindaje de Sistemas

### ⚡ Táctica: Auditoría de Invasión

**Objetivo**: Detectar si la infraestructura está "infectando" tu lógica.

- **Prompt**: "Escanea el folder `/domain`. Si encuentras importaciones de `@prisma`, `express` o cualquier librería de terceros, genera un reporte de **Invasión de Infraestructura** y propón el desacoplamiento inmediato."
- **Impacto**: Mantenibilidad a largo plazo.

### ⚡ Táctica: Generación de Estrés Sintético

**Objetivo**: Probar el sistema en condiciones extremas.

- **Prompt**: "Genera un script de k6 que simule un ataque de denegación de servicio (DDoS) lícito para probar el Circuit Breaker de mi API. Reporta el punto de quiebre."
- **Impacto**: Resiliencia probada, no supuesta.

---

## 🧪 3. Ingeniería de Calidad Aumentada

### ⚡ Táctica: TDD Reflexivo

**Objetivo**: Que la IA se corrija a sí misma antes de entregarte el código.

- **Prompt**: "Implementa [Feature] siguiendo TDD. Después de cada test pasado, realiza una **auto-auditoría** buscando violaciones a DRY y SOLID. No me muestres el código hasta que la cobertura sea del 100% y el código sea 'A-Grade'."

---

## � 4. Despliegue de Infraestructura Inmutable

### ⚡ Táctica: El Cloud Blueprint

**Objetivo**: Desplegar entornos complejos en segundos.

- **Prompt**: "Genera un archivo `docker-compose.yml` que orqueste 3 microservicios, un balanceador NGINX, una instancia de Redis para caché y un cluster de PostgreSQL con replicación de lectura."

---

## 🚀 Oh My OpenCode: Superpoderes de Ejecución

1.  **Skills de Arquitectura**: Usa `npx ohmyopencode skill run architecture-audit` para validar tus límites hexagonales automáticamente.
2.  **MCPs de Bases de Datos**: Permite que OpenCode analice el esquema real de tu DB para sugerir índices de performance.
3.  **Hooks de Calidad**: Configura un pre-push hook que ejecute toda la suite de **Blindaje de Calidad** y bloquee el envío si hay una caída en la cobertura.

---

_Este manual es propiedad del Lead Architect de FPUNA. Ejecútalo con precisión._
