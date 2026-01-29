# Skill: Code Review Básico

## Descripción
Ayuda inicial para revisar código con foco en issues comunes estudiantiles. Promueve mejores prácticas learning incremental.

## Triggers
- "review código"
- "revisar code"
- "code review"
- "check calidad"

## Review Checklist Básico

### ✅ Correcto
- [ ] Code siguiendo CLAUDE.md rules definidas
- [ ] Types consistent y appropriate
- [ ] Función/componente tiene propósito claro (SRP)
- [ ] Naming descriptive y consistente
- [ ] No código duplicado obvio

### 🐛 Bugs Potenciales
- [ ] Null/undefined checks donde necesario
- [ ] Edge cases handled (arrays vacíos, inputs inválidos)
- [ ] Async operations con error handling
- [ ] Memory leaks (event listeners, timers)
- [ ] State updates safe (no race conditions)

### 🏗️ Arquitectura
- [ ] Import/export structure logical
- [ ] Props drilling excessive (consider context)
- [ ] Componentes reusables apropiadamente
- [ ] Data flow unidirectional
- [ ] Performance considerations (memoization, lazy loading)

### 🧪 Testing
- [ ] Tests para logic crítico existente
- [ ] Tests covering edge cases
- [ ] UI componentes con tests accessibility
- [ ] Integration tests para flows críticos

### 📖 Legibilidad/Mantenibilidad
- [ ] Comentarios donde lógica compleja (pero no obvia)
- [ ] Functions/methods no demasiado largos (< 30 líneas ideal)
- [ ] No magic numbers/strings (constants)
- [ ] Error messages user-friendly
- [ ] Code self-documenting

### 🔒 Security
- [ ] No console.logs en production
- [ ] Input validation actual
- [ ] Sensitive data no harcoded
- [ ] HTTPS URLs donde applicable
- [ ] Dependency injection safe

## Auto-Fix Sugerencias

Para issues comunes encontrados, proporcionar fixes específicos:

**Ejemplo - Null Check Missing**:
```typescript
// ❌ Problema
function getUserName(userId) {
  return users[userId].name; // Crashea si null/undefined
}

// ✅ Fix sugerido  
function getUserName(userId) {
  if (!users[userId]) return null;
  return users[userId].name;
}
```

## Feedback Constructivo
- Explicar POR QUÉ el cambio mejora código
- Enlazar a principios/best practices cuando applicable
- Sugerir recursos adicionales para learning
- Mantener tono feria y supportive

## Progressive Complexity
A medida que estudiante mejora code quality, aumentar depth del review para cubrir aspectos más avanzados como performance, accessibility, y scalability.

---

*Skill educativo enfocando gradualmente mejores prácticas code quality.*