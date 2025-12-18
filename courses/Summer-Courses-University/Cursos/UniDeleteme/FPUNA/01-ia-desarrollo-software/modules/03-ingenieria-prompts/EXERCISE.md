# Ejercicio: Ingeniería de Prompts
## De Prompts Malos a Prompts Excelentes

---

## Objetivo

Desarrollar habilidades para diseñar prompts efectivos que generen código de alta calidad, aplicando las técnicas aprendidas.

---

## Parte 1: Análisis de Prompts (20 min)

### 1.1 Evaluar Prompts

Para cada prompt, identifica qué le falta y cómo mejorarlo:

**Prompt A:**
```
Haz una función de login
```

| Elemento | ¿Presente? | ¿Qué falta? |
|----------|------------|-------------|
| Lenguaje | | |
| Contexto | | |
| Requisitos | | |
| Formato | | |

**Prompt B:**
```
Necesito código para procesar datos de usuarios
```

| Elemento | ¿Presente? | ¿Qué falta? |
|----------|------------|-------------|
| Lenguaje | | |
| Contexto | | |
| Requisitos | | |
| Formato | | |

### 1.2 Reescribir Prompts

Mejora los prompts anteriores aplicando la estructura aprendida:

**Prompt A mejorado:**
```
[Tu versión mejorada aquí]
```

**Prompt B mejorado:**
```
[Tu versión mejorada aquí]
```

---

## Parte 2: Técnicas de Prompting (30 min)

### 2.1 Zero-Shot vs Few-Shot

**Tarea:** Crear una función que formatee números como moneda.

**Paso 1: Intenta con zero-shot**
```
Crea una función en Python que formatee números como moneda paraguaya (guaraníes).
```

Ejecuta en Claude o ChatGPT. Documenta el resultado:
- ¿Funcionó correctamente?
- ¿Usó el formato correcto (Gs. 1.000.000)?

**Paso 2: Intenta con few-shot**
```
Ejemplos de formateo de moneda paraguaya:

1000 -> "Gs. 1.000"
1500000 -> "Gs. 1.500.000"
500 -> "Gs. 500"
1234567 -> "Gs. 1.234.567"

Crea una función que aplique este formato.
```

Compara los resultados:
| Aspecto | Zero-Shot | Few-Shot |
|---------|-----------|----------|
| Formato correcto | | |
| Maneja negativos | | |
| Maneja decimales | | |
| Código más limpio | | |

### 2.2 Chain-of-Thought

**Tarea:** Crear un algoritmo para encontrar el camino más corto en un grafo.

**Prompt con CoT:**
```
Necesito implementar el algoritmo de Dijkstra en Python.

Piensa paso a paso:
1. ¿Qué estructura de datos necesito para el grafo?
2. ¿Cómo represento las distancias?
3. ¿Qué estructura uso para nodos visitados?
4. ¿Cómo selecciono el siguiente nodo a visitar?
5. ¿Cómo reconstruyo el camino al final?

Después de pensar cada paso, implementa la solución completa
con comentarios explicando cada parte.
```

Evalúa:
- [ ] ¿Explicó su razonamiento?
- [ ] ¿El código está bien comentado?
- [ ] ¿La implementación es correcta?

---

## Parte 3: Patrones de Prompts (30 min)

### 3.1 Patrón para Clases

Usa este template para crear una clase:

```markdown
Diseña una clase [Carrito] en [Python] que represente [un carrito de compras]:

Propiedades:
- items: List[dict] - lista de productos con nombre, precio, cantidad
- user_id: str - identificador del usuario

Métodos:
- add_item(name, price, qty): None - agrega item al carrito
- remove_item(name): bool - elimina item, retorna True si existía
- get_total(): float - calcula el total con descuentos
- apply_discount(percent): None - aplica descuento porcentual
- clear(): None - vacía el carrito

Requisitos adicionales:
- Validar que precios y cantidades sean positivos
- No permitir duplicados (actualizar cantidad si existe)
- Incluir docstrings en español
```

**Tu tarea:**
1. Envía el prompt a Claude o ChatGPT
2. Copia el código generado
3. Verifica que cumpla todos los requisitos
4. Si falta algo, refina el prompt

### 3.2 Patrón para Tests

Dado este código (generado o propio):

```python
class Calculator:
    def add(self, a, b):
        return a + b

    def divide(self, a, b):
        if b == 0:
            raise ValueError("No se puede dividir por cero")
        return a / b

    def factorial(self, n):
        if n < 0:
            raise ValueError("n debe ser positivo")
        if n <= 1:
            return 1
        return n * self.factorial(n - 1)
```

Usa este prompt para generar tests:

```markdown
Genera tests unitarios con pytest para la clase Calculator:

```python
[pegar código aquí]
```

Incluye tests para:
- Casos normales de cada método
- Casos edge (0, 1, números negativos, números grandes)
- Casos de error (división por cero, factorial negativo)
- Tipos inválidos (strings, None)

Usa el patrón AAA (Arrange, Act, Assert).
Nombra los tests descriptivamente en español.
```

---

## Parte 4: Refinamiento Iterativo (25 min)

### 4.1 Ejercicio de Iteración

**Objetivo:** Crear un validador de contraseñas robusto.

**Iteración 1 - Prompt básico:**
```
Crea una función que valide contraseñas.
```

Ejecuta y documenta:
- Resultado: ___
- Problema: ___

**Iteración 2 - Agregar requisitos:**
```
Crea una función en Python que valide contraseñas con estos criterios:
- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número
- Al menos un símbolo especial
```

Resultado: ___
Problema: ___

**Iteración 3 - Agregar formato de respuesta:**
```
Crea una función en Python que valide contraseñas.

Criterios:
- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número
- Al menos un símbolo especial (!@#$%^&*)

La función debe:
- Retornar un diccionario con {'valid': bool, 'errors': list}
- Cada error debe indicar qué criterio falló
- Si es válida, errors debe estar vacío

Ejemplo de retorno para contraseña inválida:
{'valid': False, 'errors': ['Falta mayúscula', 'Falta número']}
```

Resultado: ___

**Iteración 4 - Agregar tests:**
```
[Agregar al prompt anterior]

Incluye también 5 tests que cubran:
- Contraseña válida
- Muy corta
- Sin mayúsculas
- Sin símbolos
- Solo letras
```

### 4.2 Documentar el Proceso

| Iteración | Cambio realizado | Mejora obtenida |
|-----------|------------------|-----------------|
| 1 → 2 | | |
| 2 → 3 | | |
| 3 → 4 | | |

---

## Parte 5: Crear tu Biblioteca (15 min)

### 5.1 Diseña 3 Prompts Reutilizables

Crea prompts que puedas usar en tus proyectos:

**Prompt 1: [Tu título]**
```
[Tu prompt aquí]
```
Uso: [cuándo usarlo]

**Prompt 2: [Tu título]**
```
[Tu prompt aquí]
```
Uso: [cuándo usarlo]

**Prompt 3: [Tu título]**
```
[Tu prompt aquí]
```
Uso: [cuándo usarlo]

---

## Entregable

Documento que incluya:

1. **Análisis de prompts** (Parte 1)
   - Evaluación de prompts originales
   - Versiones mejoradas

2. **Comparación de técnicas** (Parte 2)
   - Tabla comparativa zero-shot vs few-shot
   - Evaluación de chain-of-thought

3. **Código generado** (Parte 3)
   - Clase Carrito con tests
   - Tests de Calculator

4. **Proceso de iteración** (Parte 4)
   - Las 4 iteraciones documentadas
   - Tabla de mejoras

5. **Biblioteca personal** (Parte 5)
   - 3 prompts reutilizables

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Análisis correcto de prompts | 15 |
| Comparación de técnicas | 20 |
| Código funcional generado | 25 |
| Documentación de iteraciones | 25 |
| Biblioteca de prompts útil | 15 |
| **Total** | **100** |

---

## Tips

1. **Sé específico**: Cuanto más detalle, mejores resultados
2. **Incluye ejemplos**: Los few-shot mejoran dramáticamente
3. **Itera sin miedo**: El refinamiento es parte del proceso
4. **Guarda lo que funciona**: Tu biblioteca crecerá con el tiempo

---

*Tiempo total estimado: 2 horas*
