# 💻 Starter Kit: IA para Desarrollo de Software

## Bienvenido/a

Este kit te enseña a usar IA como copiloto de programación. Aprenderás a generar código, debuggear problemas, escribir tests, y documentar - todo manteniendo buenas prácticas y seguridad.

---

## 🚀 Quick Start (10 minutos)

### Paso 1: Verificá requisitos
Abrí [PREREQUISITES.md](./PREREQUISITES.md) - necesitás Python 3.8+ instalado.

### Paso 2: Advertencias críticas
Leé [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) - hay código que la IA genera que puede ser **inseguro**.

### Paso 3: Tu primer debug con IA
Andá a [exercises/01-debugging-con-ia.md](./exercises/01-debugging-con-ia.md) y encontrá los 4 bugs.

---

## 📁 Contenido del Kit

### 📋 Documentos Base
| Archivo | Descripción | Prioridad |
|---------|-------------|-----------|
| [PREREQUISITES.md](./PREREQUISITES.md) | Requisitos técnicos | ⭐⭐⭐ Leer primero |
| [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) | Vulnerabilidades de código IA | ⭐⭐⭐ Crítico |
| [VERIFICATION-CHECKLIST.md](./VERIFICATION-CHECKLIST.md) | Checklist antes de usar código | ⭐⭐ Referencia |
| [COMMON-MISTAKES.md](./COMMON-MISTAKES.md) | 12 errores comunes | ⭐⭐ Referencia |
| [20-IDEAS.md](./20-IDEAS.md) | 20 proyectos de práctica | ⭐ Inspiración |
| [CLAUDE.md](./CLAUDE.md) | Template de contexto | ⭐ Para proyectos |

### 📝 Ejercicios Prácticos
| Ejercicio | Tema | Duración | Dificultad |
|-----------|------|----------|------------|
| [01-debugging-con-ia.md](./exercises/01-debugging-con-ia.md) | Encontrar bugs con ayuda de IA | 45 min | 🟢 Principiante |
| [02-documentacion-codigo.md](./exercises/02-documentacion-codigo.md) | Generar docstrings y README | 60 min | 🟡 Intermedio |
| [03-tests-unitarios.md](./exercises/03-tests-unitarios.md) | Crear tests con pytest | 90 min | 🟡 Intermedio |

### 📚 Ejemplos Completados
| Ejemplo | Qué muestra |
|---------|-------------|
| [ejemplo-debugging-completado.md](./examples/ejemplo-debugging-completado.md) | Debug completo con 4 bugs encontrados |
| [ejemplo-tests-completado.md](./examples/ejemplo-tests-completado.md) | Suite de tests pytest con 100% coverage |

---

## 🎓 Ruta de Aprendizaje

```
Sesión 1: Debugging (2 horas)
├── 📖 PREREQUISITES.md + SAFETY-WARNINGS.md
├── ✏️ Ejercicio 01: Debugging
└── 📖 Revisar ejemplo de debugging

Sesión 2: Documentación (2 horas)
├── 📖 VERIFICATION-CHECKLIST.md
├── ✏️ Ejercicio 02: Documentación
└── 🔍 Revisar COMMON-MISTAKES.md

Sesión 3: Testing (3 horas)
├── ✏️ Ejercicio 03: Tests unitarios
├── 📖 Revisar ejemplo de tests
└── 🎯 Elegir proyecto de 20-IDEAS.md
```

---

## 💡 Prompts Efectivos para Desarrollo

### Para Debugging
```
Tengo este código Python que debería [DESCRIPCIÓN]:

```python
[CÓDIGO]
```

El error que obtengo es:
[ERROR MESSAGE]

Ayudame a:
1. Identificar la causa del error
2. Proponer una solución
3. Explicar por qué ocurrió
```

### Para Generar Tests
```
Genera tests unitarios con pytest para esta función:

```python
[FUNCIÓN]
```

Incluye:
- Happy path (caso normal)
- Edge cases (vacío, None, límites)
- Casos de error esperados
- Usa fixtures si es apropiado
```

### Para Documentación
```
Genera documentación Google-style para esta función:

```python
[FUNCIÓN]
```

Incluye:
- Docstring completo (descripción, Args, Returns, Raises)
- Ejemplo de uso
- Notas si hay consideraciones especiales
```

---

## ⚠️ Seguridad en Código Generado

### SIEMPRE verificar:

| Vulnerabilidad | Qué buscar |
|----------------|------------|
| **SQL Injection** | ¿Hay f-strings en queries SQL? |
| **Secrets hardcoded** | ¿Hay contraseñas o API keys en el código? |
| **Input no validado** | ¿Se valida el input del usuario? |
| **Imports peligrosos** | ¿Hay `eval()`, `exec()`, `pickle.loads()`? |

### Ejemplo de código inseguro vs seguro
```python
# ❌ INSEGURO (SQL Injection)
query = f"SELECT * FROM users WHERE name = '{nombre}'"

# ✅ SEGURO (Parámetros)
query = "SELECT * FROM users WHERE name = %s"
cursor.execute(query, (nombre,))
```

---

## 🔧 Herramientas Recomendadas

### IDEs con IA integrada
- **VS Code + GitHub Copilot** - Autocompletado con IA
- **VS Code + Continue** - Alternativa open source
- **Cursor** - IDE con IA nativa

### Verificación de código
```bash
# Linting
python -m flake8 archivo.py

# Seguridad
python -m bandit archivo.py

# Tests
pytest --cov=. tests/
```

---

## 📊 Checklist Pre-Commit

Antes de usar código generado por IA:

- [ ] ¿Ejecuté el código? ¿Funciona?
- [ ] ¿Entiendo cada línea?
- [ ] ¿Pasé el linter sin errores?
- [ ] ¿Revisé vulnerabilidades de seguridad?
- [ ] ¿Hay tests que cubran el código?
- [ ] ¿La documentación es correcta?

---

## ❓ FAQ

**¿Puedo usar Copilot/ChatGPT en mis proyectos?**
Sí, pero siempre verificando el código. Nunca copies sin entender.

**¿Qué hago si el código generado no funciona?**
Compartí el error con la IA y pedí correcciones. Iterá hasta que funcione.

**¿Es plagio usar código de IA?**
Depende del contexto. Para aprender, está bien. Para entregas, consultá las reglas de tu curso.

**¿Puedo confiar en los tests generados por IA?**
Verificá que realmente testeen lo importante, no solo que pasen.

---

## 🔗 Recursos

- [Python Docs](https://docs.python.org/3/)
- [Pytest Docs](https://docs.pytest.org/)
- [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

*Starter Kit - Desarrollo de Software - FPUNA 2026*
