# Quiz: Testing con IA
## Evaluación del Módulo 06

---

## Instrucciones

- 10 preguntas de opción múltiple
- Tiempo sugerido: 10 minutos
- Puntaje mínimo para aprobar: 70%

---

## Preguntas

### 1. ¿Cuál es una ventaja principal de usar IA para generar tests?

a) Los tests nunca tienen errores
b) Identifica edge cases que podrías olvidar
c) Reemplaza la necesidad de revisar los tests
d) Solo funciona con Python

---

### 2. ¿Qué es un "edge case" en testing?

a) Un caso de prueba normal
b) Un caso en los límites o fronteras del comportamiento esperado
c) Un error de sintaxis
d) Un test que siempre falla

---

### 3. ¿Para qué sirve pytest.mark.parametrize?

a) Para ejecutar tests en paralelo
b) Para ejecutar el mismo test con diferentes inputs
c) Para crear fixtures
d) Para mockear funciones

---

### 4. ¿Qué es un mock en testing?

a) Un test falso
b) Un objeto que simula el comportamiento de una dependencia real
c) Un error simulado
d) Un tipo de fixture

---

### 5. ¿Cuál es el patrón AAA en testing?

a) Always Ask Assistance
b) Arrange, Act, Assert
c) Analyze, Apply, Approve
d) Assert, Arrange, Act

---

### 6. ¿Cuándo se debe usar un mock?

a) Siempre
b) Cuando hay dependencias externas (APIs, bases de datos)
c) Solo en tests de integración
d) Nunca, los tests deben ser reales

---

### 7. ¿Qué debe verificarse al revisar tests generados por IA?

a) Solo que compilen
b) Que realmente prueben lo que dicen probar
c) Que tengan muchas líneas
d) Que no usen mocks

---

### 8. ¿Qué es una fixture en pytest?

a) Un tipo de assertion
b) Función que proporciona datos o configuración para tests
c) Un test que siempre pasa
d) Un error controlado

---

### 9. ¿Cuál es un edge case típico para una función que divide números?

a) Dividir 10 entre 2
b) Dividir entre cero
c) Dividir números positivos
d) Dividir con resultado entero

---

### 10. ¿Qué indica una cobertura de código del 100%?

a) El código no tiene bugs
b) Todas las líneas fueron ejecutadas por tests
c) Todos los edge cases están cubiertos
d) Los tests son perfectos

---

## Respuestas

<details>
<summary>Ver respuestas (no abrir hasta completar)</summary>

1. **b)** Identifica edge cases que podrías olvidar
2. **b)** Un caso en los límites o fronteras del comportamiento esperado
3. **b)** Para ejecutar el mismo test con diferentes inputs
4. **b)** Un objeto que simula el comportamiento de una dependencia real
5. **b)** Arrange, Act, Assert
6. **b)** Cuando hay dependencias externas (APIs, bases de datos)
7. **b)** Que realmente prueben lo que dicen probar
8. **b)** Función que proporciona datos o configuración para tests
9. **b)** Dividir entre cero
10. **b)** Todas las líneas fueron ejecutadas por tests

**Puntaje:**
- 9-10 correctas: Excelente
- 7-8 correctas: Bien
- 5-6 correctas: Necesita repaso
- <5 correctas: Revisar el módulo

</details>

---

## Ejercicio Práctico

Genera tests para esta función usando IA:

```python
def find_max(numbers: list) -> int:
    """Encuentra el número más grande en una lista."""
    if not numbers:
        raise ValueError("La lista no puede estar vacía")
    return max(numbers)
```

Los tests deben incluir:
- [ ] Caso normal con varios números
- [ ] Lista con un solo elemento
- [ ] Lista vacía (debe lanzar error)
- [ ] Lista con números negativos
- [ ] Lista con duplicados

---

*Continúa al Módulo 07: Documentación Automatizada*
