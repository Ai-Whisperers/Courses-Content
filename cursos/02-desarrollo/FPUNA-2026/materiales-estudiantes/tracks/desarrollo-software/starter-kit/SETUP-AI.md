# SETUP-AI.md - Comandos de Mando del Lead Architect

## Despliegue de Arquitecturas Soberanas con OpenCode

Usa estos prompts para generar sistemas de grado industrial siguiendo el patrón de **Puertos y Adaptadores**.

---

## 🏗️ 1. Generación de Cimiento Soberano

### Microservicio en Node.js (TypeScript) + Puertos y Adaptadores

```text
Actúa como **Lead Architect**. Genera la estructura inicial para un microservicio de [NOMBRE_SERVICIO] usando **Puertos y Adaptadores**.

Requisitos de Estructura:
- `src/domain`: Entidades puras y Puertos (interfaces).
- `src/application`: Casos de uso y servicios.
- `src/infrastructure`: Adaptadores (Prisma, Express, APIs externas).

Incluye:
1. `package.json` con scripts de `dev`, `test`, `audit` y `docker-build`.
2. Configuración de `TypeScript` en modo estricto.
3. `CLAUDE.md` con las reglas de frontera: "El Dominio nunca importa Infraestructura".
4. Suite de `Jest` configurada para tests unitarios e integración.
5. `docker-compose.yml` para base de datos y app.
```

### Microservicio en Python (FastAPI) + Puertos y Adaptadores

```text
Despliega una arquitectura de **Puertos y Adaptadores** en Python con FastAPI para [SISTEMA].

Estructura:
- `app/domain`: Logic & Ports.
- `app/application`: Use Cases.
- `app/infrastructure`: Adapters (SQLAlchemy, FastApi, etc.).

Incluye:
1. `pyproject.toml` con dependencias modernas.
2. `Alembic` configurado para migraciones en la capa de infraestructura.
3. `pytest` con integración de `TestContainers`.
4. `CLAUDE.md` metadata para guiar futuros cambios en esta arquitectura.
```

---

## 🚀 2. Implementación de Casos de Uso

### Agregar Feature "Soberana"

```text
Implementa el caso de uso "[NOMBRE_FEAT]" en este proyecto.
Sigue el flujo de mando:
1. Define la **Entidad** en el dominio.
2. Crea el **Puerto** necesario (interfaz).
3. Escribe el **Caso de Uso** en la aplicación.
4. Implementa el **Adaptador** en infraestructura (ej: Postgres vía Prisma).
5. Expón el endpoint en el controlador.

**REGLA**: El caso de uso debe ser 100% testeable sin base de datos real.
```

---

## 🛡️ 3. Blindaje y Auditoría

### Generación de Suite de Calidad

```text
Analiza mis Puertos y genera una suite de **Blindaje de Calidad** completa.
- Tests Unitarios del Dominio (100% cobertura).
- Tests de Integración para los Adaptadores usando Mocks de los Puertos.
- Test de Integración real usando contenedores temporales.
Usa [JEST/PYTEST].
```

### Auditoría de Limites (Fronteras)

```text
Realiza una **Auditoría de Invasión** en el folder `/domain`.
Reporta cualquier importación que pertenezca a `/infrastructure`.
Si encuentras acoplamiento, propón el refactor inmediato usando la técnica de Inversión de Dependencias.
```

---

## 🌌 4. Infraestructura y Escala

### Orquestación de Stack Completo

```text
Genera un `docker-compose.yml` de alta disponibilidad para este proyecto.
Debe incluir:
- Cluster de App balanceado por NGINX.
- Redis para Caching de Puertos.
- PostgreSQL con volumen inmutable.
- Monitorización con Prometheus y health checks estrictos.
```

---

_FPUNA 2026 - Ingeniería Aumentada_
