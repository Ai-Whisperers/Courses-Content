# Biblioteca de Prompts: Testing con IA

Esta biblioteca contiene prompts optimizados para generar tests de alta calidad con asistencia de IA.

---

## 1. Tests Unitarios

### 1.1 Test de Función Básica

```
Genera tests unitarios para esta función usando [pytest/unittest/jest]:

```[lenguaje]
[código de la función]
```

Incluye tests para:
- Casos normales (happy path)
- Valores límite (0, 1, máximo)
- Casos edge (lista vacía, None, strings vacíos)
- Manejo de errores

Usa el patrón AAA (Arrange-Act-Assert).
Nombres descriptivos: test_[función]_[escenario]_[resultado_esperado]
```

### 1.2 Tests con Múltiples Casos

```
Genera tests parametrizados para esta función:

```[lenguaje]
[código]
```

Casos a cubrir:
| Input | Output Esperado |
|-------|-----------------|
| [in1] | [out1] |
| [in2] | [out2] |
| [in3] | [out3] |

Usa @pytest.mark.parametrize (o equivalente en el framework).
Incluye casos que deberían lanzar excepciones.
```

### 1.3 Test de Clase

```
Genera una suite de tests para esta clase:

```[lenguaje]
[código de la clase]
```

Para cada método público, incluye tests de:
- Comportamiento correcto
- Validación de parámetros
- Manejo de estado interno
- Interacción entre métodos

Usa setUp/tearDown (o fixtures) apropiadamente.
Incluye docstrings explicando qué testea cada test.
```

---

## 2. Tests de Integración

### 2.1 Test de API/Endpoint

```
Genera tests de integración para este endpoint:

```[lenguaje]
[código del endpoint]
```

Tests requeridos:
1. Request exitoso (200/201)
2. Request con datos inválidos (400)
3. Request sin autenticación (401) [si aplica]
4. Recurso no encontrado (404)
5. Error de servidor (500) - simular fallo

Incluye:
- Fixture para cliente de test
- Fixture para datos de prueba
- Limpieza de base de datos
- Verificación de response body
```

### 2.2 Test de Base de Datos

```
Genera tests de integración para este repositorio/DAO:

```[lenguaje]
[código del repositorio]
```

Operaciones a testear:
- CREATE: insertar registro
- READ: obtener por ID, listar, buscar
- UPDATE: modificar registro
- DELETE: eliminar registro

Incluye:
- Setup de base de datos de test
- Datos de prueba (fixtures)
- Verificación de integridad
- Limpieza después de cada test
```

### 2.3 Test de Servicios Externos

```
Genera tests para este código que usa servicios externos:

```[lenguaje]
[código que llama a API externa, envía emails, etc.]
```

Servicios externos involucrados:
- [servicio 1]
- [servicio 2]

Genera:
1. Tests con mocks de los servicios
2. Tests de manejo de errores del servicio
3. Tests de timeout/retry
4. Fixtures para respuestas simuladas
```

---

## 3. Mocks y Stubs

### 3.1 Crear Mock

```
Necesito mockear estas dependencias para testing:

Código a testear:
```[lenguaje]
[código]
```

Dependencias a mockear:
1. [Clase/función 1]: [qué hace]
2. [Clase/función 2]: [qué hace]

Genera:
- Mocks con valores de retorno apropiados
- Configuración para diferentes escenarios
- Verificación de que se llamaron correctamente
- Mock de excepciones para test de errores
```

### 3.2 Mock de API Externa

```
Genera mocks para testing de esta integración con API externa:

```[lenguaje]
[código que llama a API]
```

La API retorna:
```json
[ejemplo de response]
```

Necesito mocks para:
1. Response exitoso
2. Error 4xx (cliente)
3. Error 5xx (servidor)
4. Timeout
5. Response con datos inesperados
```

### 3.3 Fixtures Reutilizables

```
Genera fixtures pytest reutilizables para estos modelos:

Modelos:
```[lenguaje]
[definición de modelos/clases]
```

Fixtures necesarios:
1. Datos válidos básicos
2. Datos con todos los campos opcionales
3. Datos para tests de edge cases
4. Factory functions para datos dinámicos

Usa @pytest.fixture con scope apropiado.
```

---

## 4. Cobertura de Tests

### 4.1 Identificar Casos Faltantes

```
Revisa estos tests y sugiere casos faltantes:

Código testeado:
```[lenguaje]
[código]
```

Tests actuales:
```[lenguaje]
[tests existentes]
```

Identifica:
1. Branches no cubiertos
2. Edge cases no testeados
3. Combinaciones de parámetros faltantes
4. Escenarios de error no probados

Genera los tests faltantes.
```

### 4.2 Tests de Condiciones

```
Este código tiene múltiples condiciones. Genera tests para cubrir todas:

```[lenguaje]
[código con if/else, switch, etc.]
```

Genera tests usando:
- Decision coverage (cada branch)
- Condition coverage (cada condición)
- MC/DC si es crítico

Muestra una tabla de cobertura de decisiones.
```

---

## 5. Tests de Error

### 5.1 Test de Excepciones

```
Genera tests para verificar que se lanzan las excepciones correctas:

```[lenguaje]
[código que lanza excepciones]
```

Excepciones a verificar:
1. [Excepción1]: cuando [condición1]
2. [Excepción2]: cuando [condición2]

Para cada excepción, verifica:
- Que se lanza el tipo correcto
- Que el mensaje es apropiado
- Que el estado no se corrompió
```

### 5.2 Test de Validación

```
Genera tests de validación para este esquema/modelo:

```[lenguaje]
[código de validación o modelo con validadores]
```

Reglas de validación:
- [campo1]: [reglas]
- [campo2]: [reglas]

Tests necesarios:
1. Datos válidos aceptados
2. Cada regla de validación (valores inválidos rechazados)
3. Mensajes de error correctos
4. Múltiples errores simultáneos
```

---

## 6. Tests de Rendimiento

### 6.1 Test de Tiempo de Ejecución

```
Genera tests que verifiquen el rendimiento de:

```[lenguaje]
[código]
```

Requisitos:
- Tiempo máximo: [X] segundos
- Tamaño de datos de prueba: [N] elementos

Incluye:
- Benchmark básico
- Test que falle si excede el tiempo
- Comparación entre implementaciones (si hay alternativas)
```

### 6.2 Test de Carga

```
Genera un test de carga básico para este endpoint:

```[lenguaje]
[código del endpoint]
```

Parámetros:
- Usuarios concurrentes: [N]
- Duración: [X] segundos
- Requests por segundo objetivo: [RPS]

Métricas a medir:
- Tiempo de respuesta (p50, p95, p99)
- Tasa de errores
- Throughput
```

---

## 7. TDD (Test-Driven Development)

### 7.1 Tests Primero

```
Voy a implementar [funcionalidad].

Requisitos:
1. [requisito 1]
2. [requisito 2]
3. [requisito 3]

Genera los tests ANTES del código de implementación.

Los tests deben:
- Cubrir todos los requisitos
- Incluir casos edge
- Ser ejecutables (aunque fallen)
- Seguir naming conventions claras
```

### 7.2 Refactor con Tests

```
Quiero refactorizar este código pero necesito tests primero:

```[lenguaje]
[código legacy sin tests]
```

Genera tests que:
1. Capturen el comportamiento actual
2. Me permitan refactorizar con confianza
3. Cubran los casos de uso principales

Después, sugiere cómo refactorizar sin romper los tests.
```

---

## 8. Estructura de Tests

### 8.1 Organización de Test Suite

```
Organiza tests para este módulo:

Módulo: [nombre]
Funcionalidades:
- [funcionalidad 1]
- [funcionalidad 2]
- [funcionalidad 3]

Genera:
1. Estructura de archivos de test
2. Clases de test organizadas
3. Fixtures compartidos
4. Configuración de pytest (conftest.py)
```

### 8.2 Test Helpers

```
Genera helpers reutilizables para estos tests:

Tests existentes:
```[lenguaje]
[tests con código repetido]
```

Identifica:
1. Código repetido que puede ser helper
2. Asserts comunes que pueden ser custom matchers
3. Setup/teardown que puede ser fixture

Genera los helpers apropiados.
```

---

## 9. Tests Específicos

### 9.1 Test de React Component

```
Genera tests para este componente React:

```jsx
[código del componente]
```

Usar: @testing-library/react

Tests requeridos:
1. Renderizado inicial
2. Interacciones de usuario (clicks, inputs)
3. Cambios de props
4. Estados de carga/error
5. Llamadas a callbacks

Incluye:
- screen.getByRole, getByText (queries accesibles)
- userEvent para interacciones
- waitFor para async
```

### 9.2 Test de Vue Component

```
Genera tests para este componente Vue:

```vue
[código del componente]
```

Usar: @vue/test-utils

Tests requeridos:
1. Renderizado con props
2. Eventos emitidos
3. Computed properties
4. Watchers
5. Slots (si hay)
```

### 9.3 Test de Hook (React)

```
Genera tests para este custom hook:

```jsx
[código del hook]
```

Usar: @testing-library/react-hooks

Tests:
1. Estado inicial
2. Cambios de estado
3. Efectos secundarios
4. Cleanup
5. Manejo de errores
```

---

## 10. Plantillas Rápidas

### 10.1 Template Pytest

```python
import pytest
from module import function_to_test

class TestFunctionName:
    """Tests para function_name."""

    def test_[escenario]_[resultado](self):
        """[Descripción de qué testea]."""
        # Arrange
        input_data = ...

        # Act
        result = function_to_test(input_data)

        # Assert
        assert result == expected

    @pytest.mark.parametrize("input,expected", [
        (input1, expected1),
        (input2, expected2),
    ])
    def test_multiple_cases(self, input, expected):
        assert function_to_test(input) == expected

    def test_raises_error_when_invalid(self):
        with pytest.raises(ValueError, match="mensaje"):
            function_to_test(invalid_input)
```

### 10.2 Template Jest

```javascript
describe('functionName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should [behavior] when [condition]', () => {
    // Arrange
    const input = ...;

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe(expected);
  });

  it.each([
    [input1, expected1],
    [input2, expected2],
  ])('returns %s for input %s', (input, expected) => {
    expect(functionName(input)).toBe(expected);
  });

  it('throws error when invalid', () => {
    expect(() => functionName(invalid)).toThrow('mensaje');
  });
});
```

---

## Consejos de Uso

1. **Especifica el framework** - pytest, jest, unittest, etc.
2. **Incluye el código a testear** - No solo describas
3. **Define casos específicos** - Mejora la calidad de tests
4. **Pide patrones** - AAA, Given-When-Then
5. **Menciona dependencias** - Para que genere mocks apropiados

---

*Biblioteca de Prompts - Curso IA para Desarrollo de Software*
