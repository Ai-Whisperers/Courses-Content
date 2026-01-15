# Módulo 06: Patrones de Workflow

## Patrones Profesionales de Desarrollo con IA

**Duración**: 1 hora  
**Nivel**: Intermedio-Avanzado  
**Prerequisito**: Módulos 01-05 completados

---

## Objetivos

1. ✅ Conocer patrones de workflow profesionales
2. ✅ Aplicar metodologías ágiles con IA
3. ✅ Optimizar tu flujo de trabajo
4. ✅ Evitar antipatrones comunes

---

## Parte 1: Workflow Básico (15 min)

### Patrón: Feature Development

```
1. PLANIFICAR
   - Definir feature claramente
   - Escribir requisitos
   - Diseñar arquitectura

2. CONFIGURAR CONTEXTO
   - Actualizar CLAUDE.md con nueva feature
   - Agregar reglas si necesario

3. GENERAR
   - Prompt detallado para estructura
   - Generar código

4. PROBAR
   - Tests manuales
   - Tests automatizados
   - Corregir bugs

5. REFINAR
   - Refactorizar
   - Documentar
   - Optimizar

6. COMMIT
   - Git add
   - Commit descriptivo
   - Push
```

**Ejemplo**:
```bash
# 1. Planificar
echo "Feature: Sistema de notificaciones por email" > FEATURE.md

# 2. Contexto
cat >> CLAUDE.md << EOF
## Nueva Feature: Notificaciones
- Enviar email cuando libro vencido
- Usar SendGrid API
- Templates en español
EOF

# 3. Generar
claude "Implementa sistema de notificaciones siguiendo FEATURE.md"

# 4-6. Probar, refinar, commit
npm test
git add .
git commit -m "feat: add email notifications"
```

---

## Parte 2: Patrones Avanzados (25 min)

### Patrón: Test-Driven Development (TDD) con IA

```
1. Escribir tests PRIMERO
2. Generar código que pase tests
3. Refactorizar
```

**Ejemplo**:
```bash
# 1. Tests primero
claude "Genera tests para función calcularDescuento(precio, porcentaje) con:
- Casos normales
- Casos edge (0%, 100%, negativos)
- Validaciones"

# 2. Implementación
claude "Implementa calcularDescuento() que pase ESTOS tests:
[pega tests generados]"

# 3. Verificar
npm test

# 4. Refactorizar si necesario
```

---

### Patrón: Iterative Refinement

```
Version 1: Básico funcional
  ↓
Version 2: + Validaciones
  ↓
Version 3: + Tests
  ↓
Version 4: + Optimizaciones
  ↓
Version Final: + Documentación
```

**Ejemplo**:
```bash
# V1
claude "Crea función básica para buscar estudiantes por nombre"

# V2
claude "Mejora la búsqueda agregando:
- Búsqueda case-insensitive
- Búsqueda por nombre parcial
- Ordenamiento de resultados"

# V3
claude "Agrega validación de inputs y manejo de errores"

# V4
claude "Optimiza para grandes datasets (>10,000 estudiantes)"

# V5
claude "Agrega tests y documentación JSDoc"
```

---

### Patrón: Code Review con IA

```
1. Generar código
2. Pedir a OpenCode que lo revise
3. Aplicar sugerencias
4. Repetir si necesario
```

**Ejemplo**:
```bash
# 1. Código inicial
claude "Crea clase GestorInventario"

# 2. Review
claude "Revisa este código y sugiere mejoras en:
- Performance
- Legibilidad
- Manejo de errores
- Seguridad

[pega código]

Formato:
BIEN: [lista]
MEJORAR: [lista con sugerencias específicas]"

# 3. Aplicar sugerencias
claude "Aplica estas mejoras: [lista de sugerencias]"
```

---

### Patrón: Debugging Sistemático

```
1. Reproducir error
2. Aislar problema
3. Analizar con IA
4. Probar solución
5. Prevenir recurrencia
```

**Ejemplo**:
```bash
claude "Este código genera error:

ERROR: TypeError: Cannot read property 'nombre' of undefined
at obtenerNombreEstudiante (estudiantes.js:45)

CÓDIGO:
[pega código relevante]

CONTEXTO:
- Se ejecuta cuando se busca estudiante por carnet
- Falla solo con algunos carnets
- Base de datos tiene 500 estudiantes

ANALIZA:
1. ¿Cuál es la causa raíz?
2. ¿Por qué solo algunos carnets?
3. ¿Cómo solucionarlo?
4. ¿Cómo prevenir similares?

Proporciona código corregido + tests para este caso."
```

---

## Parte 3: Antipatrones a Evitar (10 min)

### ❌ Antipatrón 1: "Copia y Pega sin Entender"

**Mal**:
```bash
claude "Crea función X"
# Copiar código sin leer
# Pegar y usar
# No saber qué hace
```

**Bien**:
```bash
claude "Crea función X con explicaciones línea por línea"
# Leer código generado
# Entender cada parte
# Hacer preguntas si algo no es claro
# LUEGO usar
```

---

### ❌ Antipatrón 2: "Prompts Vagos Repetidos"

**Mal**:
```bash
claude "Crea una app"
# No funciona como quiero
claude "Crea una app"
# Sigue sin funcionar
claude "Crea una app"
# Frustración
```

**Bien**:
```bash
claude "[Prompt detallado con requisitos específicos]"
# Si no es perfecto:
claude "Mejora el código anterior agregando: [específicos]"
# Iteración inteligente
```

---

### ❌ Antipatrón 3: "Sin Probar el Código"

**Mal**:
```bash
claude "Genera todo el proyecto"
# Asumir que funciona
# Entregar sin probar
# 💥 Todo falla
```

**Bien**:
```bash
claude "Genera componente X"
# Probar componente X
# Verificar que funciona
# LUEGO continuar con componente Y
```

---

### ❌ Antipatrón 4: "Sobre-dependencia de IA"

**Mal**:
- Preguntar a IA en lugar de leer documentación
- No intentar resolver solo
- Perder capacidad de programar sin IA

**Bien**:
- Intentar resolver primero
- Consultar IA cuando realmente estancado
- Aprender de las soluciones de IA
- Mantener habilidades fundamentales

---

## Parte 4: Workflows Específicos (10 min)

### Workflow: Nuevo Feature

```bash
# 1. Branch
git checkout -b feature/notificaciones

# 2. Contexto
# Actualizar CLAUDE.md

# 3. Generar tests
claude "Tests para sistema de notificaciones"

# 4. Implementar
claude "Implementa notificaciones que pasen tests"

# 5. Integrar
npm test
npm run lint

# 6. Documentar
claude "Actualiza README con nueva feature"

# 7. Commit
git add .
git commit -m "feat: add notification system"

# 8. PR
git push origin feature/notificaciones
gh pr create
```

---

### Workflow: Refactoring

```bash
# 1. Tests primero (para no romper funcionalidad)
claude "Genera tests completos para [componente a refactorizar]"
npm test # Deben pasar

# 2. Refactorizar
claude "Refactoriza este código aplicando:
- Principio Single Responsibility
- Extraer funciones pequeñas
- Nombres descriptivos
- Eliminar duplicación

[código]"

# 3. Verificar tests siguen pasando
npm test

# 4. Comparar performance
# Antes vs después

# 5. Commit
git commit -m "refactor: improve code quality in [componente]"
```

---

### Workflow: Bug Fix

```bash
# 1. Reproducir
# Escribir steps exactos

# 2. Tests para el bug
claude "Genera test que falle debido a este bug:
[descripción del bug]"

# 3. Fix
claude "Corrige el bug que causa que este test falle:
[test]
[código actual]"

# 4. Verificar
npm test # Test debe pasar ahora

# 5. Regression tests
# Asegurar que no se rompió otra cosa

# 6. Commit
git commit -m "fix: resolve [descripción bug]"
```

---

## Mejores Prácticas del Workflow

### ✅ HACER

1. **Commits pequeños y frecuentes**
2. **Probar constantemente**
3. **Documentar decisiones**
4. **Revisar código generado**
5. **Mantener contexto actualizado**
6. **Iterar en lugar de regenerar todo**

### ❌ NO HACER

1. **Commits gigantes**
2. **Asumir que código funciona**
3. **Ignorar warnings**
4. **Copiar sin entender**
5. **Contexto obsoleto**
6. **Empezar de cero cada vez**

---

## Próximos Pasos

1. 📝 [EXERCISE.md](./EXERCISE.md) - Aplicar workflow completo
2. 📝 [QUIZ.md](./QUIZ.md)
3. 🎉 **¡Felicitaciones!** Completaste el Core Foundation

---

## Resumen del Módulo

**Aprendiste**:
- ✅ Patrones de workflow profesionales
- ✅ TDD, Iterative Refinement, Code Review
- ✅ Debugging sistemático
- ✅ Antipatrones a evitar
- ✅ Workflows para features, refactoring, bugs

**Ahora eres capaz de**:
- 🚀 Trabajar profesionalmente con IA
- 🚀 Mantener código de calidad
- 🚀 Ser eficiente y productivo
- 🚀 Evitar errores comunes

---

## ¡Completaste el Core Foundation!

Has dominado:
1. ✅ Instalación del Stack de IA
2. ✅ Configuración (MCPs, Skills, Hooks, Rules)
3. ✅ Prompt Engineering
4. ✅ Context Engineering
5. ✅ Live Project Development
6. ✅ Workflow Patterns

**Estás listo para**:
- Semana 2: Track Especializado
- Proyectos reales con IA
- Desarrollo profesional aumentado por IA

---

*Módulo creado para FPUNA Summer 2026*  
*¡Éxito en tu camino como desarrollador aumentado por IA!* 🚀
