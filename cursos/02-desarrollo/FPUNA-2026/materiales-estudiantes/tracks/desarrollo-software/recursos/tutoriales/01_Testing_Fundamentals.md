### Tutorial: Fundamentos de Testing

#### La Pirámide de Testing
No todos los tests son iguales. Una estrategia de testing saludable se visualiza como una pirámide:

```mermaid
graph TD
    subgraph "Pirámide de Testing"
        A[🔺 E2E Tests (Pocos)]
        B[🔶 Integration Tests (Algunos)]
        C[🟢 Unit Tests (Muchos)]
        A --> B --> C
    end
```
- **Unit Tests (Pruebas Unitarias)**: Forman la base. Prueban la unidad más pequeña de código (una función o método) de forma aislada. Son extremadamente rápidos y baratos de ejecutar. Deberías tener cientos o miles de ellos.
- **Integration Tests (Pruebas de Integración)**: En el medio. Verifican que varios componentes (módulos, servicios) trabajen bien juntos. Por ejemplo, que tu `UserService` pueda comunicarse correctamente con la base de datos. Son más lentos que los unitarios.
- **End-to-End (E2E) Tests**: En la cima. Simulan un flujo de usuario completo, desde la interfaz de usuario hasta la base de datos y de vuelta. Son los más valiosos para asegurar que la aplicación funciona como un todo, pero también son los más lentos, frágiles y caros de mantener.

**Regla de oro**: Escribe muchos tests unitarios, algunos de integración y muy pocos E2E.

#### El Ciclo "Arrange-Act-Assert" (AAA)
Todo buen test unitario sigue esta estructura:
1.  **Arrange (Preparar)**: Configura todo lo necesario para el test. Crea instancias de objetos, prepara datos de entrada y configura los mocks.
2.  **Act (Actuar)**: Ejecuta la función o método que estás probando.
3.  **Assert (Verificar)**: Comprueba que el resultado de la acción es el esperado. ¿La función devolvió el valor correcto? ¿Se llamó a otro método?

**Ejemplo con Jest:**
```typescript
it('debería sumar dos números', () => {
  // Arrange
  const a = 2;
  const b = 3;
  const expectedResult = 5;
  const calculator = new Calculator();

  // Act
  const result = calculator.add(a, b);

  // Assert
  expect(result).toBe(expectedResult);
});
```
Esta estructura hace que tus tests sean predecibles y fáciles de leer para otros desarrolladores.
