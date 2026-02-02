# Errores Comunes con IA - Desarrollo de Software

## Guía para Evitar los Errores Más Frecuentes

Este documento recopila los errores más comunes que cometen los desarrolladores al usar IA para programar, con ejemplos específicos y cómo evitarlos.

---

## Error #1: Copiar Código Sin Entenderlo

### El Problema
Usar código generado por IA sin comprender qué hace cada línea.

### Ejemplo Real
```python
# La IA genera este código
from functools import reduce
result = reduce(lambda x, y: x if x > y else y, numbers)

# El estudiante lo usa sin saber:
# - Qué hace reduce()
# - Cómo funciona la lambda
# - Qué pasa si numbers está vacío (¡ERROR!)
```

### Por Qué Es Peligroso
- No podrás debuggear cuando falle
- No podrás modificarlo para nuevos requisitos
- En entrevistas de trabajo, te preguntarán qué hace
- Construyes sobre fundamentos que no entiendes

### Cómo Evitarlo
1. **Antes de usar**, pedir a la IA: "Explícame línea por línea qué hace este código"
2. **Verificar que puedes** explicarlo con tus palabras
3. **Reescribirlo** de forma más simple si no entiendes
4. **Agregar comentarios** mientras aprendes

---

## Error #2: No Verificar la Sintaxis del Lenguaje/Versión

### El Problema
La IA puede generar código para versiones antiguas o mezclar sintaxis de diferentes lenguajes.

### Ejemplo Real
```python
# La IA genera (Python 2 syntax)
print "Hola mundo"  # ❌ Error en Python 3

# O mezcla de TypeScript en Python
def saludar(nombre: string):  # ❌ "string" no es tipo válido en Python
    return f"Hola {nombre}"
```

### Por Qué Ocurre
- Entrenamiento con código de diferentes versiones
- Mezcla de patrones de distintos lenguajes
- No especificaste la versión en tu prompt

### Cómo Evitarlo
1. **Especificar versión**: "Genera código para Python 3.11"
2. **Ejecutar siempre** el código antes de usarlo
3. **Conocer las diferencias** entre versiones principales
4. **Usar linters** que detecten problemas de sintaxis

---

## Error #3: Código Inseguro o con Vulnerabilidades

### El Problema
La IA puede generar código con vulnerabilidades de seguridad comunes.

### Ejemplo Real - SQL Injection
```python
# ❌ Código inseguro que la IA puede generar
def buscar_usuario(nombre):
    query = f"SELECT * FROM usuarios WHERE nombre = '{nombre}'"
    cursor.execute(query)
    return cursor.fetchall()

# Si nombre = "'; DROP TABLE usuarios; --" → DESASTRE

# ✅ Código seguro
def buscar_usuario(nombre):
    query = "SELECT * FROM usuarios WHERE nombre = %s"
    cursor.execute(query, (nombre,))  # Parámetros separados
    return cursor.fetchall()
```

### Vulnerabilidades Comunes que la IA Genera
1. **SQL Injection**: Concatenación de strings en queries
2. **XSS**: No escapar HTML en outputs
3. **Path Traversal**: No validar rutas de archivos
4. **Hardcoded Secrets**: Contraseñas en el código
5. **Deserialización insegura**: `pickle.loads()` sin validación

### Cómo Evitarlo
1. **Pedir explícitamente**: "Genera código seguro contra [tipo de ataque]"
2. **Revisar OWASP Top 10** y verificar que no apliquen
3. **Usar herramientas de análisis**: bandit (Python), npm audit (JS)
4. **Nunca confiar** en input del usuario

---

## Error #4: Tests que No Testean Nada Útil

### El Problema
La IA genera tests que pasan pero no verifican comportamiento real.

### Ejemplo Real
```python
# ❌ Test inútil que la IA puede generar
def test_suma():
    resultado = suma(2, 2)
    assert resultado is not None  # No verifica el valor correcto!

# ✅ Test útil
def test_suma():
    assert suma(2, 2) == 4
    assert suma(-1, 1) == 0
    assert suma(0, 0) == 0
```

### Tests Problemáticos Comunes
- Tests que solo verifican que no hay exception
- Tests que no cubren casos edge
- Tests que dependen de estado externo
- Tests que verifican implementación, no comportamiento

### Cómo Evitarlo
1. **Pedir tests específicos**: "Genera tests que cubran: happy path, errores, edge cases"
2. **Revisar assertions**: ¿Realmente verifican lo importante?
3. **Ejecutar con coverage**: ¿Qué líneas no se ejecutan?
4. **Mutation testing**: ¿Los tests detectan bugs introducidos?

---

## Error #5: Ignorar el Manejo de Errores

### El Problema
La IA genera "happy path" sin considerar qué puede fallar.

### Ejemplo Real
```python
# ❌ Sin manejo de errores
def leer_config(ruta):
    with open(ruta) as f:
        return json.load(f)

# ¿Qué pasa si:
# - El archivo no existe?
# - No es JSON válido?
# - No tenemos permisos?
# - El disco está lleno?

# ✅ Con manejo apropiado
def leer_config(ruta):
    try:
        with open(ruta) as f:
            return json.load(f)
    except FileNotFoundError:
        logger.error(f"Config no encontrada: {ruta}")
        return {}
    except json.JSONDecodeError as e:
        logger.error(f"JSON inválido en {ruta}: {e}")
        raise ConfigurationError(f"Config inválida: {ruta}")
```

### Cómo Evitarlo
1. **Preguntar**: "¿Qué errores puede lanzar este código?"
2. **Pedir robustez**: "Agrega manejo de errores apropiado"
3. **Pensar en failures**: "¿Qué pasa si la red está caída? ¿Si el disco está lleno?"
4. **Revisar logs**: ¿Hay suficiente información para debuggear?

---

## Error #6: Over-engineering y Código Innecesariamente Complejo

### El Problema
La IA tiende a generar soluciones más complejas de lo necesario.

### Ejemplo Real
```python
# ❌ Lo que la IA puede generar
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    @abstractmethod
    def process(self, data): pass

class JSONProcessor(DataProcessor):
    def process(self, data):
        return json.loads(data)

class ProcessorFactory:
    @staticmethod
    def create_processor(format_type):
        if format_type == "json":
            return JSONProcessor()
        raise ValueError(f"Unknown format: {format_type}")

# Para leer UN archivo JSON...

# ✅ Lo que realmente necesitas
def leer_json(ruta):
    with open(ruta) as f:
        return json.load(f)
```

### Señales de Over-engineering
- Más de 3 niveles de indirección
- Clases abstractas para un solo uso
- Patrones de diseño donde no hacen falta
- "Por si en el futuro necesitamos..."

### Cómo Evitarlo
1. **Pedir simplicidad**: "Dame la solución más simple que funcione"
2. **YAGNI**: You Ain't Gonna Need It
3. **Preguntar**: "¿Puedes simplificar esto?"
4. **Revisar**: ¿Cada línea es necesaria?

---

## Error #7: Dependencias Innecesarias o Desactualizadas

### El Problema
La IA sugiere bibliotecas que no necesitas o que tienen problemas de seguridad.

### Ejemplo Real
```python
# ❌ La IA sugiere instalar una biblioteca
# Prompt: "¿Cómo verifico si un string es un email válido?"
# IA: "pip install email-validator"

# ✅ Para validación básica, regex es suficiente
import re
def es_email_basico(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))
```

### Problemas con Dependencias
- **Seguridad**: Bibliotecas abandonadas con vulnerabilidades
- **Tamaño**: Agregan peso innecesario
- **Compatibilidad**: Conflictos entre versiones
- **Mantenimiento**: Más cosas que actualizar

### Cómo Evitarlo
1. **Preguntar primero**: "¿Puedo hacer esto sin bibliotecas externas?"
2. **Verificar actividad**: ¿Se actualiza regularmente el paquete?
3. **Revisar issues**: ¿Hay vulnerabilidades conocidas?
4. **Evaluar trade-off**: ¿Vale la pena la dependencia?

---

## Error #8: No Considerar Performance

### El Problema
Código que funciona en pruebas pequeñas pero falla en producción.

### Ejemplo Real
```python
# ❌ Funciona con 100 elementos, colapsa con 1 millón
def buscar_duplicados(lista):
    duplicados = []
    for i, item in enumerate(lista):
        for j, otro in enumerate(lista):
            if i != j and item == otro:
                if item not in duplicados:
                    duplicados.append(item)
    return duplicados
# Complejidad: O(n²) - 1 millón² = 1 trillón de operaciones

# ✅ Solución eficiente
def buscar_duplicados(lista):
    vistos = set()
    duplicados = set()
    for item in lista:
        if item in vistos:
            duplicados.add(item)
        vistos.add(item)
    return list(duplicados)
# Complejidad: O(n) - 1 millón de operaciones
```

### Cómo Evitarlo
1. **Pedir complejidad**: "¿Cuál es la complejidad Big-O de esto?"
2. **Preguntar alternativas**: "¿Hay una forma más eficiente?"
3. **Probar con datos reales**: No solo con 10 elementos
4. **Perfilar**: Usar cProfile para encontrar cuellos de botella

---

## Error #9: Código No Idiomático

### El Problema
Código que funciona pero no sigue las convenciones del lenguaje.

### Ejemplo Real - Python
```python
# ❌ No idiomático (escribir Python como Java)
i = 0
while i < len(lista):
    print(lista[i])
    i += 1

# ✅ Pythónico
for item in lista:
    print(item)

# ❌ No idiomático
if len(lista) > 0:
    pass

# ✅ Pythónico
if lista:
    pass
```

### Por Qué Importa
- Difícil de leer para desarrolladores experimentados
- No aprovecha las fortalezas del lenguaje
- Puede ser menos eficiente
- En code reviews, se verá amateur

### Cómo Evitarlo
1. **Especificar**: "Genera código idiomático de [lenguaje]"
2. **Estudiar** el estilo del lenguaje (PEP 8 para Python)
3. **Usar linters**: pylint, eslint, etc.
4. **Revisar código** de proyectos open source populares

---

## Error #10: No Documentar el Código Generado

### El Problema
Usar código sin agregar contexto de por qué existe.

### Ejemplo Real
```python
# ❌ Sin contexto
def calcular(x, y, z):
    return ((x * 1.21) + y) * z / 12

# ✅ Con documentación
def calcular_cuota_mensual(monto_base, iva, meses):
    """
    Calcula la cuota mensual con IVA incluido.

    Args:
        monto_base: Monto sin impuestos en guaraníes
        iva: Monto del IVA en guaraníes
        meses: Cantidad de cuotas

    Returns:
        Cuota mensual en guaraníes

    Nota: El 1.21 es la tasa de interés anual (21%)
          generada por el sistema financiero de ABC S.A.
    """
    monto_con_interes = monto_base * 1.21
    total = monto_con_interes + iva
    return total / meses
```

### Cómo Evitarlo
1. **Pedir docstrings**: "Genera con documentación completa"
2. **Agregar contexto** de negocio que la IA no conoce
3. **Explicar magic numbers**: ¿Por qué 1.21? ¿Por qué 12?
4. **Registrar decisiones**: ¿Por qué esta solución y no otra?

---

## Error #11: Confiar en Algoritmos Sin Verificar Correctitud

### El Problema
Asumir que el algoritmo generado es correcto sin probarlo exhaustivamente.

### Ejemplo Real
```python
# La IA genera "binary search"
def binary_search(arr, target):
    left, right = 0, len(arr)  # ❌ Bug sutil: debería ser len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Funciona para muchos casos, pero puede fallar en edge cases
# o acceder índices fuera de rango
```

### Cómo Evitarlo
1. **Edge cases siempre**: vacío, un elemento, todos iguales
2. **Comparar con implementación conocida** (biblioteca estándar)
3. **Tests exhaustivos** con casos extremos
4. **Entender la lógica** antes de usarlo

---

## Error #12: Mezclar Código de Diferentes Sesiones

### El Problema
Combinar código de múltiples conversaciones con la IA sin verificar compatibilidad.

### Ejemplo Real
```python
# De la sesión 1: usa requests
import requests
def obtener_datos():
    return requests.get(url).json()

# De la sesión 2: usa aiohttp (async)
import aiohttp
async def procesar_datos():
    datos = obtener_datos()  # ❌ No funciona - mezcla sync/async
    # ...
```

### Cómo Evitarlo
1. **Un contexto a la vez**: mantener coherencia en cada proyecto
2. **Verificar imports**: ¿todos los paquetes son compatibles?
3. **Revisar paradigmas**: ¿sync vs async? ¿OOP vs funcional?
4. **Integrar incrementalmente**: agregar de a poco y probar

---

## Checklist Anti-Errores para Código

Antes de usar código de IA, verificar:

### Funcionalidad
- [ ] ¿Ejecuté el código?
- [ ] ¿Probé con edge cases?
- [ ] ¿Funciona con datos reales?

### Comprensión
- [ ] ¿Puedo explicar cada línea?
- [ ] ¿Sé qué hace cada función/método usado?
- [ ] ¿Entiendo los tipos de datos?

### Seguridad
- [ ] ¿Hay SQL injection posible?
- [ ] ¿Hay inputs no validados?
- [ ] ¿Hay secrets hardcodeados?

### Calidad
- [ ] ¿Sigue las convenciones del lenguaje?
- [ ] ¿Es la solución más simple?
- [ ] ¿Está documentado?

### Performance
- [ ] ¿Cuál es la complejidad Big-O?
- [ ] ¿Funciona con datasets grandes?
- [ ] ¿Usa memoria razonablemente?

---

## Comandos Útiles de Verificación

```bash
# Python - verificar sintaxis y estilo
python -m py_compile archivo.py
python -m flake8 archivo.py
python -m pylint archivo.py

# Python - verificar seguridad
python -m bandit archivo.py

# Python - ejecutar tests con coverage
pytest --cov=. tests/

# Node.js - verificar dependencias
npm audit
```

---

*Guía de errores comunes - Desarrollo de Software - FPUNA 2026*
