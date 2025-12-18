# Cheatsheet: IA para Desarrollo de Software

Referencia rápida de comandos, atajos y prompts para desarrollo asistido por IA.

---

## 🚀 GitHub Copilot - Atajos de Teclado

### VS Code

| Acción | Windows/Linux | macOS |
|--------|---------------|-------|
| Aceptar sugerencia | `Tab` | `Tab` |
| Rechazar sugerencia | `Esc` | `Esc` |
| Ver siguiente sugerencia | `Alt + ]` | `Option + ]` |
| Ver sugerencia anterior | `Alt + [` | `Option + [` |
| Abrir panel de sugerencias | `Ctrl + Enter` | `Cmd + Enter` |
| Activar/Desactivar Copilot | `Ctrl + Shift + P` → "Copilot" | `Cmd + Shift + P` → "Copilot" |
| Abrir Copilot Chat | `Ctrl + Shift + I` | `Cmd + Shift + I` |

### JetBrains IDEs

| Acción | Windows/Linux | macOS |
|--------|---------------|-------|
| Aceptar sugerencia | `Tab` | `Tab` |
| Rechazar sugerencia | `Esc` | `Esc` |
| Ver sugerencias | `Alt + \` | `Option + \` |

---

## 💬 Comandos de Copilot Chat

```
/explain     → Explica el código seleccionado
/fix         → Sugiere corrección para errores
/tests       → Genera tests para el código
/doc         → Genera documentación
/optimize    → Sugiere optimizaciones
/new         → Crea nuevo archivo/proyecto
/terminal    → Sugiere comandos de terminal
```

---

## 📝 Anatomía de un Buen Prompt

```
[CONTEXTO] + [TAREA] + [ESPECIFICACIONES] + [FORMATO]
```

### Ejemplo:
```
Contexto: API REST en Python con Flask
Tarea: Crear endpoint para autenticación JWT
Especificaciones: Usar PyJWT, validar email/password
Formato: Incluir manejo de errores y docstrings
```

---

## 🎯 Técnicas de Prompting

### Zero-Shot
```
Escribe una función que ordene una lista de números.
```

### One-Shot
```
Ejemplo: suma(2, 3) → 5
Escribe una función resta similar.
```

### Few-Shot
```
Ejemplo 1: "hola" → "HOLA"
Ejemplo 2: "mundo" → "MUNDO"
Ahora transforma: "python"
```

### Chain of Thought
```
Piensa paso a paso:
1. Primero analiza...
2. Luego considera...
3. Finalmente implementa...
```

---

## 🔧 Prompts Rápidos por Tarea

### Generar Código
```
Crea [función/clase] en [lenguaje] que [acción].
Parámetros: [lista]
Retorna: [tipo]
```

### Debugging
```
Este código da error [error].
Código: [código]
Esperado: [comportamiento]
Actual: [comportamiento]
```

### Refactoring
```
Refactoriza para mejorar [legibilidad/performance].
Mantén la misma funcionalidad.
[código]
```

### Testing
```
Genera tests para [función] usando [framework].
Incluye: happy path, edge cases, errores.
[código]
```

### Documentación
```
Documenta con docstrings estilo [Google/NumPy].
[código]
```

---

## ⚡ Comentarios Mágicos para Copilot

```python
# TODO: implementar validación de email
# FIXME: este loop es O(n²), optimizar
# Función que calcula el factorial recursivamente
# Similar a Array.map() de JavaScript
# Usando el patrón Singleton
```

---

## 🐛 Template de Debug

```markdown
## Problema
[Descripción breve]

## Código
```python
[código]
```

## Error
```
[mensaje de error / stack trace]
```

## Esperado vs Actual
- Esperado: [comportamiento]
- Actual: [comportamiento]
```

---

## 📊 Complejidad Algorítmica - Referencia

| Notación | Nombre | Ejemplo |
|----------|--------|---------|
| O(1) | Constante | Acceso a array por índice |
| O(log n) | Logarítmica | Búsqueda binaria |
| O(n) | Lineal | Búsqueda en lista |
| O(n log n) | Linearítmica | Merge sort |
| O(n²) | Cuadrática | Bubble sort |
| O(2^n) | Exponencial | Fibonacci recursivo |

---

## 🧪 Estructura de Tests (AAA)

```python
def test_ejemplo():
    # Arrange (Preparar)
    datos = [1, 2, 3]

    # Act (Actuar)
    resultado = mi_funcion(datos)

    # Assert (Verificar)
    assert resultado == esperado
```

---

## 📚 Estilos de Docstrings

### Google Style
```python
def funcion(param1, param2):
    """Descripción breve.

    Args:
        param1: Descripción.
        param2: Descripción.

    Returns:
        Descripción del retorno.

    Raises:
        ValueError: Cuándo se lanza.
    """
```

### NumPy Style
```python
def funcion(param1, param2):
    """
    Descripción breve.

    Parameters
    ----------
    param1 : tipo
        Descripción.
    param2 : tipo
        Descripción.

    Returns
    -------
    tipo
        Descripción.
    """
```

---

## 🔄 Git + IA

### Commits con IA
```
Genera mensaje de commit para estos cambios:
[git diff]
Formato: tipo(scope): descripción
```

### Tipos de Commit
```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Documentación
style:    Formato (no afecta código)
refactor: Refactorización
test:     Tests
chore:    Tareas de mantenimiento
```

---

## 🌐 REST API - Códigos HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Éxito general |
| 201 | Created | Recurso creado |
| 204 | No Content | Éxito sin body |
| 400 | Bad Request | Error del cliente |
| 401 | Unauthorized | Sin autenticación |
| 403 | Forbidden | Sin autorización |
| 404 | Not Found | No existe |
| 422 | Unprocessable | Validación falló |
| 500 | Server Error | Error del servidor |

---

## 🛡️ Seguridad - Checklist

- [ ] Validar toda entrada del usuario
- [ ] Usar queries parametrizadas (no concatenar SQL)
- [ ] Escapar output HTML
- [ ] Usar HTTPS
- [ ] No exponer información sensible en errores
- [ ] Hashear contraseñas (bcrypt/argon2)
- [ ] Implementar rate limiting
- [ ] Validar tokens JWT

---

## 📱 Recursos Útiles

### Documentación
- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic Claude](https://docs.anthropic.com)

### Herramientas Online
- [regex101.com](https://regex101.com) - Probar regex
- [jsonlint.com](https://jsonlint.com) - Validar JSON
- [explain.dalibo.com](https://explain.dalibo.com) - Visualizar EXPLAIN SQL

### Extensiones VS Code
- GitHub Copilot
- GitHub Copilot Chat
- Python
- Pylance
- GitLens

---

## ⚠️ Anti-Patrones a Evitar

❌ Aceptar código sin entenderlo
❌ No verificar sugerencias de IA
❌ Compartir datos sensibles con IA
❌ Depender 100% de IA para debugging
❌ Ignorar mejores prácticas por conveniencia
❌ No documentar código generado

---

## ✅ Mejores Prácticas

✓ Revisar siempre el código generado
✓ Escribir tests para código de IA
✓ Iterar prompts para mejores resultados
✓ Combinar IA con conocimiento propio
✓ Mantener contexto en conversaciones
✓ Usar comentarios para guiar a Copilot

---

*Curso: IA para Desarrollo de Software - FPUNA Paraguay*
