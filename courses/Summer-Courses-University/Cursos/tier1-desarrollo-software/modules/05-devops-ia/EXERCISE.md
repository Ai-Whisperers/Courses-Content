# Ejercicio Práctico - Módulo 05
## DevOps con IA

---

## Objetivo

Containerizar la aplicación y configurar pipeline CI/CD.

**Duración:** 25 minutos
**Entregable:** Aplicación deployable con pipeline

---

## Proyecto: Pipeline Completo

### Paso 1: Dockerfile (8 min)

Genera Dockerfile para la aplicación de módulos anteriores:
- Multi-stage build
- Optimizado para producción
- Healthcheck

### Paso 2: Docker Compose (7 min)

Crea docker-compose.yml para desarrollo:
- App + PostgreSQL + (opcional) Redis
- Volúmenes y variables de entorno

### Paso 3: GitHub Actions (10 min)

Configura workflow:
- Lint + Tests en PR
- Build + Deploy en push a main
- (Opcional) Deploy a Vercel/Railway

---

## Entregable

```
proyecto/
├── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci-cd.yml
└── prompts.md
```

---

## Verificación

```bash
# Local con Docker
docker-compose up --build

# Verificar que tests pasan en Actions
# Verificar que deploy funciona
```

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Dockerfile funcional | 25 |
| Docker Compose completo | 25 |
| Pipeline CI ejecutando | 30 |
| Documentación | 20 |
| **Total** | **100** |

---

*Ejercicio Módulo 05 - DevOps con IA*
