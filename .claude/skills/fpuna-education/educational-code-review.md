# Skill: Code Review Educativo Python

## Metadata

- **Name**: Code Review Educativo Python
- **Category**: Education & Code Quality
- **Activation**: When user mentions "revisar código", "code review", "feedback código", "mejorar este código", "qué está mal aquí"
- **Model**: Sonnet
- **Est. Token Cost**: ~2000 tokens

## When to Activate

Trigger when user:
- "Revisa este código de [nombre]"
- "Dame feedback sobre este script"
- "Code review educativo"
- "Cómo mejora este código?"
- "Qué problemas ves aquí?"

## Propósito

Proporcionar feedback constructivo específico para código de estudiantes, enfocado en aprendizaje y mejora gradual.

## Principios del Code Review Educativo

### 1. Feedback Constructivo (no crítico)

❌ **Evitar:**
- "Este código es malo"
- "No sabes programar"
- "Esto está todo mal"

✅ **Usar:**
- "Podemos mejorar X de esta manera..."
- "Un enfoque alternativo sería..."
- "Excelente progreso en Y, veamos cómo refinar Z"

### 2. Jerarquía de Conceptos

```
Nivel 1: Sintaxis básica (Python válido)
Nivel 2: Estilo y legibilidad (PEP8)
Nivel 3: Estructura y organización
Nivel 4: Pythonic way (mejores prácticas)
Nivel 5: Optimización y performance
Nivel 6: Diseño y arquitectura
```

**Enfoque:** Solo evaluar 1-2 niveles por encima del nivel actual del estudiante.

### 3. Reglas de Feedback

```python
review_rules = {
    "positive_to_negative_ratio": "3:1",  # 3 positivos por cada negativo
    "specific_examples": True,  # Siempre con código concreto
    "explain_why": True,  # Explicar el principio detrás
    "provide_solution": True,  # Mostrar cómo hacerlo mejor
    "priority_only": True,  # Máximo 3 issues por review
}
```

## Estructura del Review

### Template de Code Review

```markdown
# 🔍 Code Review - {{student_name}}
**Archivo**: `{{file_path}}`  
**Fecha**: {{review_date}}  
**Reviewer**: {{reviewer_name}}

---

## 🌟 Resumen Ejecutivo

**Nivel general**: {{level}}  
**Fortalezas principales**: {{strength_count}}  
**Áreas de mejora**: {{improvement_count}}  
**Puntuación**: {{score}}/100

### Estadísticas Rápidas
- Líneas de código: {{loc}}
- Funciones: {{function_count}}
- Complejidad ciclomática: {{complexity}}
- Problemas críticos: {{critical_count}}
- Advertencias: {{warning_count}}

---

## ✅ Lo que se hizo bien

### 1. {{positive_point_1}}
{{explicación}}

**Código destacado**:
```python
{{good_code_snippet}}
💡 ¡Excelente trabajo aquí! Esto demuestra comprensión de {{concept}}.
```

### 2. {{positive_point_2}}
{{explicación}}

### 3. {{positive_point_3}}
{{explicación}}

---

## 🎯 Oportunidades de Mejora (Priorizadas)

### 🔴 Alta Prioridad - Issue #1: {{issue_title}}

**Ubicación**: Línea {{line_number}}  
**Severidad**: {{severity}}

**Código actual**:
```python
{{problematic_code}}
```

**Problema**:  
{{explanation}}

**Por qué importa**:  
{{why_it_matters}}

**Solución sugerida**:
```python
{{improved_code}}
```

**Principio aplicado**: {{principle}}  
**Documentación**: [Link al recurso]

---

### 🟡 Media Prioridad - Issue #2: {{issue_title}}

[Similar structure]

---

### 🟢 Baja Prioridad - Issue #3: {{issue_title}}

[Similar structure]

---

## 🎓 Conceptos Clave de esta Entrega

### Concepto 1: {{concept_name}}
**Descripción**: {{description}}
**Ejemplo aplicado**: {{example}}
**Para practicar**: {{exercise}}

### Concepto 2: {{concept_name}}
[Similar structure]

---

## 📚 Recursos Recomendados

### Para profundizar en los conceptos de este review:
1. [Recurso 1 - Nivel básico]
2. [Recurso 2 - Documentación oficial]
3. [Recurso 3 - Ejemplos prácticos]

### Ejercicios de práctica:
1. [Ejercicio relacionado con Issue #1]
2. [Ejercicio relacionado con Issue #2]

---

## 🎯 Próximos Pasos

### Acciones inmediatas (esta semana):
1. {{action_1}}
2. {{action_2}}
3. {{action_3}}

### Para subir de nivel:
- {{next_level_requirement}}

### Checklist de correcciones:
- [ ] Corregir Issue #1
- [ ] Corregir Issue #2
- [ ] Corregir Issue #3
- [ ] Re-entregar para re-review

---

## 🏆 Reconocimiento

{{encouragement_message}}

**Keep coding! 🚀**
```

## Categorías de Issues Comunes

### Category 1: Python Basics

```python
# ❌ Issue: Variables no descriptivas
def calc(a, b, c):
    return a + b * c

# ✅ Mejor
def calculate_total_price(base_price: float, tax_rate: float, quantity: int) -> float:
    """Calculate total price including tax."""
    return base_price * quantity * (1 + tax_rate)
```

### Category 2: Pythonic Code

```python
# ❌ Issue: No Pythonic
result = []
for i in range(len(items)):
    if items[i] > 0:
        result.append(items[i] * 2)

# ✅ Mejor - List comprehension
result = [item * 2 for item in items if item > 0]
```

### Category 3: Error Handling

```python
# ❌ Issue: Bare except
file = open('data.txt')
content = file.read()
file.close()

# ✅ Mejor - Context managers
try:
    with open('data.txt', 'r') as file:
        content = file.read()
except FileNotFoundError:
    logger.error("Data file not found")
    content = ""
```

## Automatización

### Script de Análisis

```python
#!/usr/bin/env python3
"""
Code review assistant for educational purposes.
"""

from pathlib import Path
import ast
import radon.complexity as radon_cc

class EducationalCodeReviewer:
    def __init__(self, file_path: str):
        self.file_path = Path(file_path)
        self.code = self.file_path.read_text()
        self.tree = ast.parse(self.code)
        
    def review(self) -> dict:
        """Generate educational review."""
        return {
            "structure": self._check_structure(),
            "style": self._check_style(),
            "complexity": self._analyze_complexity(),
            "pythonic": self._check_pythonic_patterns(),
            "documentation": self._check_documentation()
        }
    
    def _analyze_complexity(self) -> dict:
        """Analyze code complexity."""
        complexities = radon_cc.cc_visit(self.code)
        
        high_complexity = [
            func for func in complexities 
            if func.complexity > 10
        ]
        
        return {
            "average": sum(f.complexity for f in complexities) / len(complexities) if complexities else 0,
            "max": max((f.complexity for f in complexities), default=0),
            "high_complexity_functions": [
                {"name": f.name, "complexity": f.complexity}
                for f in high_complexity
            ]
        }
    
    def _check_pythonic_patterns(self) -> list:
        """Check for non-pythonic patterns."""
        issues = []
        
        # Check for range(len()) pattern
        for node in ast.walk(self.tree):
            if isinstance(node, ast.Call):
                if (isinstance(node.func, ast.Name) and 
                    node.func.id == 'range' and
                    len(node.args) == 1 and
                    isinstance(node.args[0], ast.Call) and
                    isinstance(node.args[0].func, ast.Name) and
                    node.args[0].func.id == 'len'):
                    issues.append({
                        "type": "not_pythonic",
                        "message": "Use 'for item in items' instead of range(len(items))",
                        "line": node.lineno
                    })
        
        return issues

# Usage
reviewer = EducationalCodeReviewer("student_code.py")
report = reviewer.review()
```

## Success Criteria

Review completado cuando:
- [ ] Código analizado en profundidad
- [ ] Fortalezas identificadas (mínimo 3)
- [ ] Issues priorizados (máximo 3)
- [ ] Ejemplos de código incluidos
- [ ] Explicaciones educativas claras
- [ ] Recursos proporcionados
- [ ] Próximos pasos definidos

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Educational Code Review
**Maintained by:** FPUNA AI Education Team
