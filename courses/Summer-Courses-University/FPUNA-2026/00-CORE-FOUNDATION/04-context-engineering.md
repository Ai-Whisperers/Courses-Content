# Módulo 04: Ingeniería de Contexto

## Archivos .opencode y CLAUDE.md

**Duración**: 1 hora  
**Nivel**: Intermedio  
**Prerequisito**: Módulos 01-03 completados

---

## Objetivos de Aprendizaje

1. ✅ Crear archivos de contexto efectivos
2. ✅ Configurar .opencode para proyectos
3. ✅ Usar CLAUDE.md para memoria de proyecto
4. ✅ Optimizar contexto para mejores resultados

---

## ¿Qué es Context Engineering?

**Context Engineering** es el arte de proporcionar a OpenCode el contexto adecuado sobre tu proyecto para que genere código más relevante y preciso.

---

## Parte 1: Archivo .opencode (20 min)

### ¿Qué es .opencode?

Archivo de configuración en la raíz de tu proyecto que define preferencias específicas del proyecto.

### Ubicación

```
mi-proyecto/
├── .opencode           # Configuración del proyecto
├── src/
├── tests/
└── package.json
```

### Contenido Básico

```yaml
# .opencode

project:
  name: Sistema de Gestión FPUNA
  description: Sistema para gestionar estudiantes y calificaciones
  version: 1.0.0

preferences:
  language: es-PY
  framework: express
  testing: jest
  style: airbnb

conventions:
  - Use Spanish for variable names when contextually appropriate
  - camelCase for variables
  - Include JSDoc for exports
  - Maximum function length 50 lines

ignored_paths:
  - node_modules/
  - dist/
  - coverage/

context_files:
  - README.md
  - ARCHITECTURE.md
```

### Ejemplo Completo para FPUNA

```yaml
# .opencode

project:
  name: Proyecto Final - Ingeniería Informática
  description: Sistema de gestión de biblioteca universitaria
  institution: FPUNA
  student:
    name: María González
    carnet: "2024001"
    email: maria.gonzalez@fpuna.edu.py

tech_stack:
  backend: Node.js + Express
  database: PostgreSQL
  testing: Jest
  orm: Prisma

code_standards:
  language: JavaScript (ES6+)
  style_guide: Airbnb
  max_line_length: 120
  indentation: 2 spaces
  quotes: single

documentation:
  format: JSDoc
  language: Spanish
  include_examples: true

testing:
  framework: Jest
  coverage_target: 85%
  test_location: __tests__/

naming_conventions:
  files: kebab-case
  variables: camelCase
  classes: PascalCase
  constants: UPPER_SNAKE_CASE

features:
  - User authentication
  - Book management
  - Loan tracking
  - Fine calculation
  - Reports generation

ignored:
  - node_modules/
  - dist/
  - coverage/
  - .env
```

---

## Parte 2: Archivo CLAUDE.md (20 min)

### ¿Qué es CLAUDE.md?

Archivo de memoria del proyecto que OpenCode lee automáticamente para entender el contexto completo.

### Ubicación

```
mi-proyecto/
├── CLAUDE.md          # Memoria del proyecto
├── .opencode
├── src/
└── README.md
```

### Estructura Recomendada

```markdown
# Contexto del Proyecto - Sistema Biblioteca FPUNA

## Descripción General

Sistema de gestión de biblioteca para FPUNA que permite:
- Gestionar inventario de libros
- Registrar préstamos y devoluciones
- Calcular multas automáticamente
- Generar reportes

## Arquitectura

```
src/
├── models/          # Modelos de datos (Libro, Estudiante, Prestamo)
├── controllers/     # Lógica de negocio
├── routes/          # Endpoints API
├── middleware/      # Validación y autenticación
└── utils/           # Funciones auxiliares
```

## Modelos de Datos

### Libro
- id: UUID
- titulo: String
- autor: String
- isbn: String (único)
- categoria: Enum
- disponible: Boolean

### Estudiante
- id: UUID
- nombre: String
- carnet: String (único)
- carrera: String
- email: String

### Prestamo
- id: UUID
- libro: Libro
- estudiante: Estudiante
- fechaPrestamo: Date
- fechaDevolucion: Date
- devuelto: Boolean
- multa: Number

## Reglas de Negocio

1. Estudiante puede tener máximo 3 libros prestados
2. Préstamo dura 14 días
3. Multa de ₲1,000 por día de retraso
4. Solo pueden prestar libros disponibles

## Convenciones de Código

- Variables en español cuando sea contextualmente apropiado
- Funciones con nombres descriptivos en español
- Comentarios JSDoc en español
- Validación exhaustiva en todos los endpoints
- Manejo de errores descriptivo

## Estado Actual

**Completado**:
- [x] Modelos de datos
- [x] CRUD de libros
- [x] CRUD de estudiantes

**En progreso**:
- [ ] Sistema de préstamos
- [ ] Cálculo de multas

**Pendiente**:
- [ ] Reportes
- [ ] Notificaciones
- [ ] Dashboard

## Problemas Conocidos

1. Validación de ISBN necesita mejora
2. Cálculo de multas no considera fines de semana

## Decisiones de Diseño

- Usamos Prisma porque facilita las migraciones
- PostgreSQL por su robustez
- JWT para autenticación por seguridad
- Jest porque es el estándar de facto

## Comandos Útiles

```bash
npm run dev        # Desarrollo
npm test           # Tests
npm run migrate    # Migraciones
```

## Notas para Claude

- Siempre validar inputs antes de procesar
- Usar mensajes de error descriptivos en español
- Incluir ejemplos en documentación
- Tests deben cubrir casos edge
```

---

## Parte 3: Usar Contexto Efectivamente (15 min)

### Ejemplo de Prompt SIN Contexto

```bash
claude "Agrega función para prestar libro"

# Claude no sabe:
# - Qué tecnologías usas
# - Estructura del proyecto
# - Reglas de negocio
# - Estilo de código
```

### Ejemplo de Prompt CON Contexto

Con `.opencode` y `CLAUDE.md` configurados:

```bash
claude "Agrega función prestarLibro() siguiendo las reglas del proyecto"

# Claude ahora sabe:
# - Stack tecnológico (Express, Prisma)
# - Estructura de carpetas
# - Reglas: máximo 3 libros, 14 días
# - Estilo: JSDoc en español, validaciones
# - Modelos existentes
```

**Resultado**: Código mucho más preciso y alineado.

---

## Parte 4: Mejores Prácticas (5 min)

### ✅ HACER

1. **Actualizar CLAUDE.md regularmente**
   - Después de cada feature grande
   - Cuando cambian reglas de negocio
   - Al resolver problemas importantes

2. **Ser específico en decisiones**
   ```markdown
   ## ¿Por qué Prisma y no Sequelize?
   Prisma tiene mejor soporte de TypeScript y migraciones automáticas.
   ```

3. **Documentar problemas conocidos**
   ```markdown
   ## Problemas Conocidos
   - Cálculo de fechas no considera días feriados
   - Búsqueda no soporta acentos (á, é, etc.)
   ```

4. **Incluir comandos útiles**
   ```markdown
   ## Comandos
   - `npm run test:watch` - Tests en modo watch
   - `npm run db:reset` - Resetear base de datos
   ```

### ❌ NO HACER

1. **Información obsoleta** (actualiza cuando cambian cosas)
2. **Demasiado genérico** (sé específico sobre TU proyecto)
3. **Código en CLAUDE.md** (solo descripción y decisiones)

---

## Ejemplo Práctico

### Proyecto: Calculadora de Impuestos Paraguay

**Archivo .opencode**:
```yaml
project:
  name: Calculadora Impuestos PY
  description: Calcula IVA e impuestos para Paraguay

preferences:
  language: es-PY
  currency: Guaraníes (₲)
  
tax_rates:
  iva: 10%
  iva_reducido: 5%
  ire: 10%

conventions:
  - Amounts in Guaraníes
  - Format with thousand separators
  - Validate all numeric inputs
```

**Archivo CLAUDE.md**:
```markdown
# Calculadora de Impuestos - Paraguay

## Tasas Actuales (2026)
- IVA General: 10%
- IVA Reducido: 5% (alimentos básicos)
- IRE (Empresas): 10%

## Reglas
1. Montos siempre en Guaraníes (₲)
2. Redondear a enteros (no hay centavos)
3. IVA se calcula sobre monto neto
4. IVA reducido aplica a: chipa, mandioca, leche, etc.

## Funciones Necesarias
- calcularIVA(monto, tipo='general')
- calcularIRE(utilidad)
- formatearMonto(numero) -> "₲1.500.000"
```

Ahora cuando pides:

```bash
claude "Agrega función para calcular impuesto total de una factura"
```

Claude generará código que:
- Usa Guaraníes
- Aplica tasa 10%
- Formatea con separadores
- Valida inputs
- Documenta en español

---

## Próximos Pasos

1. 📝 [EJERCICIO.md](./EXERCISE.md) - Crear contexto para tu proyecto
2. 📝 [QUIZ.md](./QUIZ.md)
3. 📖 [Módulo 05 - Live Project](../05-live-project/README.md)

---

## Resumen

**Aprendiste**:
- ✅ Crear archivos .opencode
- ✅ Escribir CLAUDE.md efectivo
- ✅ Proporcionar contexto útil
- ✅ Mejores prácticas

**Ahora OpenCode**:
- 🚀 Entiende tu proyecto
- 🚀 Genera código más relevante
- 🚀 Sigue tus convenciones automáticamente

---

*Módulo creado para FPUNA Summer 2026*
