# Skill: Evaluación de Proyectos Estudiantiles

## Metadata

- **Name**: Evaluación de Proyectos Estudiantiles
- **Category**: Education & Assessment
- **Activation**: When user mentions "evaluar", "calificar", "review proyecto", "feedback", "corregir", "rúbrica"
- **Model**: Sonnet (for comprehensive analysis)
- **Est. Token Cost**: ~3000 tokens

## When to Activate

Trigger when user says:
- "Evalúa este proyecto"
- "Necesito calificar el trabajo de un estudiante"
- "Dame feedback de este código"
- "Revisa el proyecto de [nombre]"
- "Aplica la rúbrica"
- "Qué nota merece este trabajo?"

## Purpose

Sistema completo de evaluación de proyectos estudiantiles con rúbrica FPUNA, análisis de código, y generación de feedback constructivo.

## Rúbrica de Evaluación FPUNA

### 1. Funcionalidad (40 puntos)

#### 1.1 Compleción de Requerimientos (20 pts)
- **Excelente (18-20)**: Todos los requerimientos implementados correctamente
- **Bueno (14-17)**: La mayoría implementados, pequeños detalles faltantes
- **Regular (10-13)**: Algunos requerimientos implementados
- **Deficiente (0-9)**: Pocos o ningún requerimiento implementado

#### 1.2 Correctitud (20 pts)
- **Excelente (18-20)**: Código funciona sin errores, edge cases manejados
- **Bueno (14-17)**: Funciona en casos principales, algunos bugs menores
- **Regular (10-13)**: Funciona parcialmente, bugs notables
- **Deficiente (0-9)**: No funciona o errores críticos

### 2. Calidad de Código (30 puntos)

#### 2.1 Estilo y Formato (10 pts)
- **Excelente (9-10)**: Sigue PEP8, black/isort aplicados, consistente
- **Bueno (7-8)**: Mayormente correcto, pequeñas inconsistencias
- **Regular (5-6)**: Inconsistencias notables, código desordenado
- **Deficiente (0-4)**: Difícil de leer, sin formato

#### 2.2 Estructura y Organización (10 pts)
- **Excelente (9-10)**: Módulos bien organizados, separación de concerns
- **Bueno (7-8)**: Mayormente organizado, alguna mejora posible
- **Regular (5-6)**: Organización confusa, código spaguetti
- **Deficiente (0-4)**: Desorganizado, difícil de seguir

#### 2.3 Documentación (10 pts)
- **Excelente (9-10)**: Docstrings completos, README detallado, comentarios útiles
- **Bueno (7-8)**: Documentación básica presente, podría mejorar
- **Regular (5-6)**: Documentación mínima o incompleta
- **Deficiente (0-4)**: Sin documentación

### 3. Buenas Prácticas (20 puntos)

#### 3.1 Manejo de Errores (10 pts)
- **Excelente (9-10)**: Try/except apropiados, validaciones de input, logging
- **Bueno (7-8)**: Algunos errores manejados, podría mejorar
- **Regular (5-6)**: Manejo básico de errores, inconsistencias
- **Deficiente (0-4)**: Sin manejo de errores o try/except vacíos

#### 3.2 Testing (10 pts)
- **Excelente (9-10)**: Tests unitarios completos, >80% cobertura
- **Bueno (7-8)**: Algunos tests, cobertura moderada
- **Regular (5-6)**: Tests básicos o incompletos
- **Deficiente (0-4)**: Sin tests

### 4. Innovación y Extra (10 puntos)

- **Extras implementados**: +5 puntos
- **Creatividad/Solución elegante**: +3 puntos
- **Documentación excepcional**: +2 puntos

## Proceso de Evaluación

### Step 1: Análisis Inicial (5 min)

```python
# Verificar estructura del proyecto
"""
1. Listar archivos entregados
2. Verificar README presente
3. Identificar lenguaje/framework
4. Verificar tests presentes
"""
```

**Comandos:**
```bash
# Estructura
tree -L 3 students/[nombre]/proyecto-final/

# Archivos
find students/[nombre]/proyecto-final -type f | head -20

# README
cat students/[nombre]/proyecto-final/README.md
```

### Step 2: Ejecución y Testing (10 min)

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar tests
pytest -v

# Ver cobertura
pytest --cov=. --cov-report=term-missing

# Ejecutar aplicación (si aplica)
python main.py
```

### Step 3: Análisis de Código (15 min)

#### 3.1 Linting y Formato

```bash
# Formato
black --check .
isort --check-only .

# Linting
flake8 . --max-line-length=120 --statistics

# Type checking
mypy . --ignore-missing-imports
```

#### 3.2 Complejidad

```bash
# Análisis de complejidad
radon cc . -a -nc

# Mantenibilidad
radon mi .

# Raw metrics
radon raw . -s
```

#### 3.3 Seguridad

```bash
# Security scan
bandit -r . -f json -o bandit-report.json

# Dependency check
pip-audit
```

### Step 4: Evaluación Manual (10 min)

**Checklist de Revisión:**

#### Arquitectura:
- [ ] Separación de concerns
- [ ] Principios SOLID
- [ ] Patrones de diseño apropiados
- [ ] No duplicación de código (DRY)

#### Python Específico:
- [ ] Type hints usados consistentemente
- [ ] List/dict comprehensions (vs loops)
- [ ] Generadores donde apropiado
- [ ] Context managers (with statements)
- [ ] F-strings (vs .format() o %)
- [ ] Pathlib (vs os.path)

#### Performance:
- [ ] No procesamiento innecesario en loops
- [ ] Estructuras de datos eficientes
- [ ] Lazy loading donde apropiado

## Generación de Feedback

### Estructura del Reporte

```markdown
# Evaluación Proyecto Final - [Nombre Estudiante]

## Resumen
- **Nota Total**: [X/100]
- **Estado**: [Aprobado/Reprobado/Pendiente de revisión]
- **Fecha**: [DD/MM/YYYY]

## Puntuación Detallada

### 1. Funcionalidad (40 pts)
- **Requerimientos**: [X/20] - [Comentario]
- **Correctitud**: [X/20] - [Comentario]

### 2. Calidad de Código (30 pts)
- **Estilo**: [X/10] - [Comentario]
- **Estructura**: [X/10] - [Comentario]
- **Documentación**: [X/10] - [Comentario]

### 3. Buenas Prácticas (20 pts)
- **Manejo de Errores**: [X/10] - [Comentario]
- **Testing**: [X/10] - [Comentario]

### 4. Extra (10 pts)
- **Puntos extra**: [X/10] - [Comentario]

## Fortalezas
1. [Fortaleza 1]
2. [Fortaleza 2]
3. [Fortaleza 3]

## Áreas de Mejora
1. [Área 1] - Prioridad: [Alta/Media/Baja]
2. [Área 2] - Prioridad: [Alta/Media/Baja]
3. [Área 3] - Prioridad: [Alta/Media/Baja]

## Acciónables
### Para alcanzar [siguiente nivel]:
1. [Acción concreta 1]
2. [Acción concreta 2]
3. [Acción concreta 3]

## Código Revisado
### Archivos:
- [Lista de archivos revisados]

### Issues Encontrados:
| Línea | Archivo | Issue | Severidad | Solución |
|-------|---------|-------|-----------|----------|
| 45 | main.py | No type hint | Baja | Agregar -> str |
| 78 | utils.py | Try/except vacío | Alta | Implementar logging |

## Recursos Recomendados
- [Link a documentación relevante]
- [Link a ejemplos similares]
- [Link a best practices]

## Comentarios Adicionales
[Observaciones generales, contexto, etc.]

---
**Evaluador**: [Nombre]
**Próxima revisión**: [Fecha opcional]
```

### Ejemplos de Feedback Constructivo

#### Ejemplo 1: Manejo de Errores

**En lugar de:**
```python
# ❌ Código del estudiante
try:
    result = process_data(data)
except:
    pass
```

**Feedback:**
```markdown
### Issue: Manejo de errores (Linea 45, main.py)
**Severidad**: Alta
**Problema**: Try/except vacío que oculta errores

**Por qué importa**: 
- Dificulta debugging
- Usuario no sabe qué falló
- Puede dejar sistema en estado inconsistente

**Solución sugerida**:
```python
# ✅ Mejor práctica
try:
    result = process_data(data)
except ValueError as e:
    logger.error(f"Invalid data format: {e}")
    raise ValidationError(f"Los datos deben ser JSON válido: {e}")
except Exception as e:
    logger.exception("Unexpected error processing data")
    raise ProcessingError(f"Error procesando datos: {e}")
```

**Recursos**:
- [Error Handling Guide](link)
- [Python Logging Best Practices](link)
```

#### Ejemplo 2: Documentación

**En lugar de:**
```python
# ❌ Sin docstring
def calc(a, b):
    return a + b
```

**Feedback:**
```markdown
### Issue: Documentación faltante (Linea 23, math_utils.py)
**Severidad**: Media

**Por qué importa**:
- Otros desarrolladores no entienden propósito
- No saben qué argumentos esperar
- No saben qué retorna

**Solución sugerida**:
```python
# ✅ Con Google-style docstring
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two integers.
    
    Args:
        a: First integer to add
        b: Second integer to add
        
    Returns:
        The sum of a and b
        
    Raises:
        TypeError: If inputs are not integers
        
    Example:
        >>> calculate_sum(5, 3)
        8
    """
    return a + b
```

**Criterio**: Para función bonus, agregar también ejemplos de uso.
```

## Casos Especiales

### Proyecto Incompleto

Si el proyecto está incompleto:
1. Evaluar lo entregado proporcionalmente
2. Identificar qué falta específicamente
3. Ofrecer extensión si política lo permite
4. Documentar razones de incompleción

```markdown
## Estado: Incompleto (60% entregado)

### Componentes Entregados:
- ✅ Módulo de autenticación
- ✅ Modelos de base de datos
- ⚠️ API endpoints (3/5 completos)
- ❌ Tests (0%)
- ❌ Documentación

### Evaluación Proporcional:
- Funcionalidad: 12/20 (solo partes completadas)
- ...

### Opciones:
1. **Extensión**: Entregar resto hasta [fecha] (-10 pts)
2. **Evaluación parcial**: Calificar lo entregado
3. **Incompleto**: No calificar, requiere re-entrega
```

### Código Copiado/Plagio

Si se detecta copia:
1. No acusar directamente
2. Hacer preguntas sobre el código
3. Evaluar comprensión
4. Documentar evidencia
5. Seguir política institucional

## Automatización

### Script de Evaluación

```python
#!/usr/bin/env python3
"""Script automatizado de evaluación inicial."""

import subprocess
import json
from pathlib import Path

def evaluate_project(student_path: str) -> dict:
    """Run automated evaluation checks."""
    results = {
        "structure": check_structure(student_path),
        "linting": run_linter(student_path),
        "tests": run_tests(student_path),
        "coverage": check_coverage(student_path),
        "security": run_security_scan(student_path)
    }
    return results

def check_structure(path: str) -> dict:
    """Verify project structure."""
    required_files = ["README.md", "requirements.txt", "main.py"]
    path = Path(path)
    
    return {
        file: (path / file).exists()
        for file in required_files
    }

def run_linter(path: str) -> dict:
    """Run flake8 and return results."""
    result = subprocess.run(
        ["flake8", path, "--max-line-length=120", "--format=json"],
        capture_output=True,
        text=True
    )
    
    issues = json.loads(result.stdout) if result.stdout else []
    return {
        "total_issues": len(issues),
        "errors": len([i for i in issues if i["type"] == "E"]),
        "warnings": len([i for i in issues if i["type"] == "W"])
    }

# ... más funciones

if __name__ == "__main__":
    import sys
    results = evaluate_project(sys.argv[1])
    print(json.dumps(results, indent=2))
```

## Success Criteria

Evaluación completada cuando:
- [ ] Rúbrica aplicada completamente
- [ ] Código ejecutado y testeado
- [ ] Análisis estático completado
- [ ] Feedback constructivo generado
- [ ] Fortalezas identificadas
- [ ] Áreas de mejora priorizadas
- [ ] Acciónables específicos definidos
- [ ] Recursos proporcionados
- [ ] Reporte entregado al estudiante

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Sistema de Evaluación
**Maintained by:** FPUNA AI Education Team
