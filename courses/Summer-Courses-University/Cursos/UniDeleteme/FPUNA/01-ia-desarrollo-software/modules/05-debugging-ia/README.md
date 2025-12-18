# Módulo 05: Debugging Asistido por IA
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Usar IA para identificar y diagnosticar bugs
- Interpretar mensajes de error con asistencia de IA
- Aplicar técnicas de rubber duck debugging con IA
- Depurar código ajeno eficientemente

---

## 1. Debugging Tradicional vs IA

### 1.1 El Proceso Tradicional

```
1. Observar el bug
2. Reproducir el problema
3. Formular hipótesis
4. Probar hipótesis
5. Corregir
6. Verificar solución
```

### 1.2 Debugging con IA

```
1. Observar el bug
2. Describir el problema a la IA
3. Recibir análisis y sugerencias
4. Evaluar sugerencias
5. Aplicar corrección
6. Verificar con IA si es necesario
```

### 1.3 Ventajas del Debugging con IA

| Aspecto | Sin IA | Con IA |
|---------|--------|--------|
| Análisis inicial | Manual, puede tomar horas | Segundos |
| Conocimiento requerido | Experiencia en el stack | Menos dependiente |
| Código ajeno | Muy difícil | Más accesible |
| Stack traces complejos | Intimidantes | Explicados |
| Patrones de errores | Memoria propia | Vasta base de conocimiento |

---

## 2. Anatomía de un Bug Report para IA

### 2.1 Template de Debug

```markdown
## Problema
[Descripción breve del bug]

## Código
```[lenguaje]
[código relevante]
```

## Error
```
[mensaje de error o stack trace]
```

## Comportamiento Esperado
[qué debería hacer]

## Comportamiento Actual
[qué hace realmente]

## Contexto Adicional
- Versión del lenguaje/framework
- Sistema operativo
- Pasos para reproducir
```

### 2.2 Ejemplo Completo

```markdown
## Problema
La función de paginación retorna datos duplicados en algunas páginas.

## Código
```python
def get_paginated_items(items: list, page: int, per_page: int) -> list:
    start = page * per_page
    end = start + per_page
    return items[start:end]
```

## Error
No hay error, pero los datos son incorrectos.

## Comportamiento Esperado
- Página 0: items 0-9
- Página 1: items 10-19

## Comportamiento Actual
- Página 1: items 10-19 (correcto)
- Página 0: items 0-9 (correcto)
Pero cuando la lista tiene exactamente 20 items y pido página 2,
debería estar vacía pero retorna items de la página 1.

## Contexto
- Python 3.11
- Lista de 20 elementos
```

---

## 3. Tipos de Debugging con IA

### 3.1 Análisis de Errores Sintácticos

**Prompt:**
```
Este código Python da error de sintaxis, encuéntralo:

def process_data(items)
    results = []
    for item in items:
        if item.value > 0
            results.append(item)
    return results
```

**La IA identificará:**
- Falta `:` después de `def process_data(items)`
- Falta `:` después de `if item.value > 0`

### 3.2 Errores de Lógica

**Prompt:**
```
Esta función debería calcular el promedio, pero da resultados incorrectos:

def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
        count = 0
        count += 1
    return total / count

# calculate_average([1, 2, 3, 4, 5]) retorna 15.0 en lugar de 3.0
```

**La IA identificará:**
- `count` se reinicia a 0 en cada iteración
- `count` debería inicializarse fuera del loop

### 3.3 Errores de Runtime

**Prompt:**
```
Este código lanza un KeyError a veces:

def get_user_name(users: dict, user_id: int) -> str:
    return users[user_id]["name"]

# Error: KeyError: 123
```

**La IA sugerirá:**
- Usar `.get()` con valor por defecto
- Verificar existencia antes de acceder
- Implementar manejo de excepciones

### 3.4 Errores de Concurrencia

**Prompt:**
```
Este código tiene race conditions. El contador final no es 1000
cuando ejecuto 1000 threads:

counter = 0

def increment():
    global counter
    temp = counter
    counter = temp + 1

# Ejecutar 1000 threads que llaman increment()
# Resultado esperado: 1000
# Resultado real: varía (850, 920, etc.)
```

**La IA explicará:**
- El problema de read-modify-write no atómico
- Soluciones: locks, atomic operations

---

## 4. Rubber Duck Debugging con IA

### 4.1 ¿Qué es Rubber Duck Debugging?

Explicar el código línea por línea a un "pato de goma" para encontrar el bug. Con IA, el pato puede responder.

### 4.2 Cómo Hacerlo

**Prompt:**
```
Voy a explicarte este código línea por línea para encontrar el bug.
Interrumpe cuando veas algo sospechoso.

Línea 1: Defino una función que recibe una lista de usuarios
Línea 2: Creo una lista vacía para resultados
Línea 3: Itero sobre cada usuario
Línea 4: Si el usuario está activo...
Línea 5: ...agrego su email a resultados
Línea 6: Retorno la lista

def get_active_emails(users):
    results = []
    for user in users:
        if user.active:
            results.append(user.email)
    return results

# Problema: a veces retorna emails duplicados
```

**La IA preguntará:**
- ¿Pueden haber usuarios duplicados en la lista de entrada?
- ¿Quieres que los emails sean únicos?

### 4.3 Diálogo de Debugging

```
Tú: El código debería filtrar usuarios adultos pero incluye menores.

IA: Veo que comparas con `age >= 18`. ¿Cómo estás obteniendo la edad?

Tú: La edad se calcula como datetime.now().year - user.birth_year

IA: Ahí está el problema. Si el usuario nació en Diciembre 2006
y estamos en Enero 2024, el cálculo da 18, pero el usuario
aún no cumplió 18 años. Necesitas comparar fechas completas.
```

---

## 5. Interpretando Stack Traces

### 5.1 Stack Trace de Python

**Prompt:**
```
Explica este stack trace y sugiere cómo arreglarlo:

Traceback (most recent call last):
  File "app.py", line 45, in handle_request
    result = process_data(data)
  File "processor.py", line 23, in process_data
    items = parse_items(raw_data)
  File "parser.py", line 12, in parse_items
    return [Item(**item) for item in json.loads(raw_data)]
  File "parser.py", line 12, in <listcomp>
    return [Item(**item) for item in json.loads(raw_data)]
TypeError: __init__() got an unexpected keyword argument 'status'
```

**La IA explicará:**
1. El error está en `parser.py`, línea 12
2. La clase `Item` no acepta el argumento `status`
3. Los datos JSON tienen un campo que la clase no espera
4. Soluciones: agregar `status` a Item, o filtrar campos

### 5.2 Stack Trace de JavaScript

**Prompt:**
```
Este error de React me confunde:

Error: Rendered more hooks than during the previous render.
    at renderWithHooks (react-dom.development.js:14985)
    at updateFunctionComponent (react-dom.development.js:17356)
    at beginWork (react-dom.development.js:19063)
    ...

El componente:
function UserProfile({ userId }) {
    if (!userId) {
        return <div>No user</div>;
    }

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]);

    return <div>{user?.name}</div>;
}
```

**La IA identificará:**
- Los hooks están después del return condicional
- Las reglas de hooks requieren orden consistente
- Solución: mover hooks antes del return

---

## 6. Debugging de Código Ajeno

### 6.1 Entender Código Desconocido

**Prompt:**
```
Necesito entender qué hace este código y por qué podría estar fallando.
No lo escribí yo y no hay documentación.

def reconcile(a, b, threshold=0.001):
    d = {}
    for x in a:
        k = round(x[0] / threshold) * threshold
        d[k] = d.get(k, 0) + x[1]
    r = []
    for y in b:
        k = round(y[0] / threshold) * threshold
        if k in d:
            diff = abs(d[k] - y[1])
            if diff > threshold:
                r.append((k, d[k], y[1], diff))
    return r
```

**La IA explicará:**
- La función reconcilia dos conjuntos de datos
- Agrupa por un valor redondeado
- Identifica diferencias mayores al umbral
- Retorna las discrepancias

### 6.2 Encontrar Bugs en Código Legacy

**Prompt:**
```
Este código legacy de hace 5 años funciona la mayor parte del tiempo,
pero falla en casos raros. ¿Qué podría estar mal?

function processOrder(order) {
    var total = 0;
    for (var i = 0; i <= order.items.length; i++) {
        total += order.items[i].price * order.items[i].quantity;
    }
    if (order.discount) {
        total = total - (total * order.discount);
    }
    return total;
}
```

**La IA encontrará:**
- `i <= order.items.length` debería ser `i < order.items.length`
- Off-by-one error que causa acceso fuera de índice
- Falla cuando se accede al último elemento inexistente

---

## 7. Mejores Prácticas

### 7.1 Información a Incluir

**Siempre incluir:**
- [ ] Código relevante (no todo el proyecto)
- [ ] Mensaje de error exacto
- [ ] Comportamiento esperado vs actual
- [ ] Versiones del software

**Cuando sea relevante:**
- [ ] Datos de entrada que causan el problema
- [ ] Pasos para reproducir
- [ ] Contexto del sistema (OS, memoria, etc.)

### 7.2 Cómo Evaluar Sugerencias de IA

```
1. ¿La sugerencia aborda el problema real?
2. ¿Tiene sentido para mi caso específico?
3. ¿Introduce nuevos problemas?
4. ¿Puedo verificar que funciona?
5. ¿Entiendo por qué funciona?
```

### 7.3 Cuándo No Confiar en la IA

- Bugs muy específicos de tu sistema
- Problemas de infraestructura
- Errores intermitentes sin patrón claro
- Código altamente ofuscado o minificado

---

## 8. Herramientas de Debugging + IA

### 8.1 Combinación Efectiva

```
1. Usar debugger tradicional para obtener valores
2. Compartir esos valores con la IA
3. IA analiza patrones
4. Verificar en debugger
```

### 8.2 Workflow Recomendado

```python
# 1. Agregar logging temporal
import logging
logging.debug(f"Variable x = {x}, tipo = {type(x)}")

# 2. Capturar output

# 3. Compartir con IA
"""
Los logs muestran:
Variable x = None, tipo = <class 'NoneType'>
Variable x = "123", tipo = <class 'str'>
Variable x = 123, tipo = <class 'int'>

Esperaba que x siempre fuera int. ¿Por qué varía?
"""
```

---

## Resumen

- Proporcionar **contexto completo** a la IA
- Usar el **template de debug** para reportes claros
- **Rubber duck debugging** es más efectivo con IA que responde
- **Stack traces** explicados ahorran horas
- Siempre **verificar** las sugerencias de la IA

---

## Recursos

- [Python Debugger (pdb)](https://docs.python.org/3/library/pdb.html)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)

---

*Siguiente: Módulo 06 - Testing con IA*
