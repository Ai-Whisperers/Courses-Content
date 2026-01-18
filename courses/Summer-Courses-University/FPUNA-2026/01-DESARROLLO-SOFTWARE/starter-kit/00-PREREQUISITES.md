# Prerrequisitos - Antes de Usar IA para Desarrollo de Software

## Lo que DEBES dominar ANTES de usar IA como asistente de código

---

## ⚠️ Advertencia Importante

**La IA puede generar código que compila pero que:**
- Tiene bugs sutiles
- Es inseguro
- No sigue las convenciones de tu proyecto
- Duplica funcionalidad existente
- Es ineficiente

Si no tienes base sólida, no podrás detectar estos problemas.

---

## Conocimientos Técnicos Requeridos

### 1. Programación Sólida (Mínimo 1 Lenguaje)

Debes poder, SIN ayuda de IA:

| Skill | Verificación |
|-------|--------------|
| Estructuras de datos | Implementar lista enlazada, árbol binario |
| Algoritmos básicos | Ordenamiento, búsqueda binaria |
| POO | Clases, herencia, polimorfismo, encapsulación |
| Manejo de errores | Try/catch, excepciones personalizadas |
| Async/concurrencia | Promises, async/await, threads básicos |
| Testing | Escribir tests unitarios sin copiar |

**Test:** Escribe un API REST simple sin IA. Si no puedes, practica más.

---

### 2. Arquitectura de Software Básica

Debes entender:

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPAS DE UNA APLICACIÓN                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐                                           │
│   │ Presentación │  ← UI, APIs, Controllers                 │
│   └──────┬──────┘                                           │
│          │                                                   │
│   ┌──────▼──────┐                                           │
│   │   Lógica    │  ← Services, Business Logic               │
│   └──────┬──────┘                                           │
│          │                                                   │
│   ┌──────▼──────┐                                           │
│   │    Datos    │  ← Repositories, DAOs, ORM                │
│   └──────┬──────┘                                           │
│          │                                                   │
│   ┌──────▼──────┐                                           │
│   │    Base de  │  ← PostgreSQL, MongoDB, etc.              │
│   │    Datos    │                                           │
│   └─────────────┘                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**¿Por qué importa?** Si pides a la IA "agregar una función" y no entiendes dónde va, terminarás con código espagueti.

---

### 3. Control de Versiones (Git)

Comandos que debes dominar:

```bash
# Básicos (obligatorio)
git init / clone
git add / commit / push / pull
git status / log / diff
git branch / checkout / merge

# Intermedios (muy útil)
git stash
git rebase (interactivo)
git cherry-pick
git reset (soft/hard)
git reflog  # para recuperar desastres
```

**¿Por qué?** La IA puede sugerir cambios que rompan tu código. Git te permite revertir.

---

### 4. Debugging Sistemático

Proceso de debugging que debes seguir:

```
1. REPRODUCIR el bug consistentemente
2. AISLAR el problema (mínimo código que falla)
3. FORMULAR hipótesis de la causa
4. PROBAR hipótesis (una a la vez)
5. CORREGIR y verificar que no rompió otra cosa
6. DOCUMENTAR qué era y cómo se arregló
```

**Herramientas que debes saber usar:**
- Debugger del IDE (breakpoints, step into, watch variables)
- Console.log/print estratégico
- Stack traces (leer y entender)
- Logs de aplicación

---

### 5. Bases de Datos

Mínimo SQL que debes conocer:

```sql
-- CRUD básico
SELECT, INSERT, UPDATE, DELETE

-- Filtros y ordenamiento
WHERE, ORDER BY, GROUP BY, HAVING

-- Joins (crítico)
INNER JOIN, LEFT JOIN, RIGHT JOIN

-- Agregaciones
COUNT, SUM, AVG, MAX, MIN

-- Subconsultas
SELECT * FROM x WHERE id IN (SELECT...)
```

**ORM:** Entender qué hace el ORM debajo (queries reales).

---

### 6. APIs y Protocolos

Debes entender:

| Concepto | Qué significa |
|----------|---------------|
| HTTP verbs | GET, POST, PUT, PATCH, DELETE y cuándo usar cada uno |
| Status codes | 200, 201, 400, 401, 403, 404, 500 |
| Headers | Content-Type, Authorization, CORS |
| REST | Recursos, endpoints, convenciones |
| JSON | Estructura, serialización/deserialización |
| Auth | JWT, OAuth basics, sessions vs tokens |

---

### 7. Seguridad Básica

Debes reconocer y prevenir:

| Vulnerabilidad | Cómo se ve | Cómo prevenir |
|----------------|------------|---------------|
| SQL Injection | `"SELECT * FROM users WHERE id = " + userInput` | Prepared statements |
| XSS | `innerHTML = userInput` | Sanitizar, escape |
| CSRF | Form sin token | CSRF tokens |
| Auth bypass | Confiar en datos del cliente | Validar en server |
| Secrets en código | `API_KEY = "abc123"` | Variables de entorno |

---

## Conocimientos de Proceso

### 8. Lectura de Documentación

Debes poder:

- [ ] Leer docs oficiales (no solo tutoriales de YouTube)
- [ ] Buscar en GitHub issues cuando algo falla
- [ ] Interpretar changelogs para updates
- [ ] Leer código fuente de librerías cuando es necesario

**La IA tiene fecha de corte. La documentación oficial siempre está actualizada.**

---

### 9. Code Review

Debes poder revisar código buscando:

- [ ] Bugs lógicos
- [ ] Problemas de seguridad
- [ ] Violaciones de convenciones
- [ ] Código duplicado
- [ ] Complejidad innecesaria
- [ ] Falta de tests
- [ ] Edge cases no manejados

**Si no puedes revisar código de otros, no podrás revisar código de la IA.**

---

### 10. Testing

Tipos de tests que debes escribir:

```
┌─────────────────────────────────────────────────────────────┐
│                    PIRÁMIDE DE TESTING                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      /\                                      │
│                     /  \     E2E Tests                       │
│                    / UI \    (pocos, lentos, frágiles)       │
│                   /──────\                                   │
│                  /        \                                  │
│                 /Integration\  Integration Tests             │
│                /   Tests     \ (algunos, medianos)           │
│               /──────────────\                               │
│              /                \                              │
│             /   Unit Tests     \  Unit Tests                 │
│            /                    \ (muchos, rápidos, estables)│
│           /______________________\                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Auto-Evaluación

### Test Práctico (Sin IA)

Completa estos ejercicios para verificar tu nivel:

**Ejercicio 1: API REST**
Crear un endpoint que:
- Reciba POST con JSON `{name, email}`
- Valide que email tiene formato correcto
- Guarde en base de datos
- Devuelva 201 con el recurso creado
- Devuelva 400 si validación falla

**Ejercicio 2: Query SQL**
Escribir query que:
- Obtenga usuarios con más de 5 pedidos
- Incluya total gastado por usuario
- Ordenado por total descendente
- Solo del último mes

**Ejercicio 3: Debugging**
Dado este código, encontrar el bug:
```python
def get_user_orders(user_id):
    user = db.query(User).filter(id=user_id).first()
    orders = db.query(Order).filter(user_id=user.id).all()
    return {"user": user.name, "orders": len(orders)}
```
(Pista: ¿Qué pasa si user_id no existe?)

**Ejercicio 4: Seguridad**
Identificar todas las vulnerabilidades:
```python
@app.route('/search')
def search():
    query = request.args.get('q')
    results = db.execute(f"SELECT * FROM products WHERE name LIKE '%{query}%'")
    return render_template_string(f"<h1>Results for {query}</h1>")
```

---

## Recursos para Aprender Prerrequisitos

### Arquitectura y Diseño
- "Clean Architecture" - Robert Martin
- "Designing Data-Intensive Applications" - Martin Kleppmann
- Curso "System Design" en educative.io

### Testing
- "Test-Driven Development" - Kent Beck
- Documentación de pytest/Jest

### Seguridad
- OWASP Top 10
- "Web Security Academy" de PortSwigger (gratis)

### Bases de Datos
- "SQL Performance Explained" - Markus Winand
- PostgreSQL Documentation

---

## Tiempo Estimado para Prerrequisitos

| Tu nivel actual | Tiempo para estar listo |
|-----------------|------------------------|
| Estudiante con algo de código | 3-6 meses de práctica |
| Junior con experiencia | 1-2 meses de refuerzo |
| Mid-level | Ya estás listo, pero revisa seguridad |

---

*00-PREREQUISITES.md - Track 01 Desarrollo Software - FPUNA 2026*
