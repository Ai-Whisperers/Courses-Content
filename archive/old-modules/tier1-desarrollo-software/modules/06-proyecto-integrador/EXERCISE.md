# Proyecto Integrador - Guía de Ejecución
## Tier 1 - Desarrollo de Software

---

## Checklist de Desarrollo

Use esta guía para asegurar que completas todos los requisitos.

---

## Fase 1: Setup Inicial

- [ ] Crear repositorio GitHub
- [ ] Inicializar estructura de carpetas
- [ ] Crear package.json (backend y frontend)
- [ ] Configurar TypeScript
- [ ] Configurar ESLint/Prettier

**Prompt sugerido para estructura:**
```
Genera estructura de carpetas para proyecto fullstack:
- Backend: Node.js, Express, TypeScript, Prisma
- Frontend: Next.js, TypeScript, Tailwind
- Monorepo simple (no lerna/turborepo)
Incluye archivos de configuración básicos.
```

---

## Fase 2: Base de Datos

- [ ] Definir esquema Prisma
- [ ] Crear migraciones
- [ ] Seed data de prueba

**Prompt:**
```
Diseña esquema Prisma para [TU PROYECTO]:
[Describir entidades y relaciones]
Incluye campos de auditoría y enums.
```

---

## Fase 3: Backend API

- [ ] Endpoint 1: _______________
- [ ] Endpoint 2: _______________
- [ ] Endpoint 3: _______________
- [ ] Validación con Zod
- [ ] Middleware de errores
- [ ] Documentación OpenAPI

---

## Fase 4: Frontend

- [ ] Página 1: _______________
- [ ] Página 2: _______________
- [ ] Página 3: _______________
- [ ] Componentes reutilizables
- [ ] Formularios con validación
- [ ] Estados de loading/error

---

## Fase 5: Testing

- [ ] Tests unitarios (min 5)
- [ ] Tests de integración (min 2)
- [ ] Verificar cobertura

```bash
npm test -- --coverage
# Meta: >60%
```

---

## Fase 6: DevOps

- [ ] Dockerfile backend
- [ ] Dockerfile frontend (si aplica)
- [ ] docker-compose.yml
- [ ] GitHub Actions workflow

---

## Fase 7: Documentación

- [ ] README.md completo
- [ ] docs/prompts.md
- [ ] docs/decisions.md

---

## Verificación Final

Antes de entregar:

```bash
# Limpiar y probar desde cero
rm -rf node_modules
docker-compose down -v

# Reconstruir
docker-compose up --build

# Verificar que todo funciona
# Abrir localhost:3000
# Probar todas las funcionalidades
```

---

## Registro de Prompts

Documenta tus prompts más efectivos aquí:

### Prompt 1: [Nombre]
```
[Contenido del prompt]
```
**Resultado:** [Qué generó]
**Efectividad:** ⭐⭐⭐⭐⭐

### Prompt 2: [Nombre]
```
[Contenido del prompt]
```
**Resultado:** [Qué generó]
**Efectividad:** ⭐⭐⭐⭐⭐

---

## Reflexión Final

1. **¿Qué % del código fue generado por IA?** ____%

2. **¿Qué herramienta fue más útil?**
   - [ ] GitHub Copilot
   - [ ] Cursor
   - [ ] Claude
   - [ ] ChatGPT
   - [ ] Otra: _______

3. **Mayor desafío:**
   _______________________________________________

4. **Mayor aprendizaje:**
   _______________________________________________

5. **¿Recomendarías estas técnicas a otros desarrolladores?**
   _______________________________________________

---

*Guía de Proyecto Integrador*
*Tier 1 - Desarrollo de Software*
