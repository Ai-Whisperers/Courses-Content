### Tutorial: Mocking y Stubbing

En los tests unitarios, queremos probar una unidad de código **de forma aislada**. Esto significa que si tu `UserService` depende de un `UserRepository`, no queremos que el test del servicio haga una llamada real a la base de datos. Para eso usamos "Test Doubles".

#### Tipos de Test Doubles
- **Dummy**: Un objeto que se pasa pero nunca se usa. Solo está ahí para llenar la lista de parámetros.
- **Stub**: Proporciona respuestas pre-configuradas a las llamadas. Cuando tu test llama a `mockRepo.findById(1)`, el stub devuelve el objeto de usuario que tú le dijiste que devolviera.
- **Spy**: "Espía" un método real. No lo reemplaza, pero te permite saber si fue llamado, cuántas veces y con qué parámetros.
- **Mock**: El más "inteligente". Son objetos con expectativas pre-programadas. Además de actuar como stubs, pueden verificar que fueron llamados de la manera correcta. En Jest, la distinción es borrosa y `jest.fn()` actúa como un híbrido de mock y stub.
- **Fake**: Una implementación funcional pero mucho más simple que la real. Un buen ejemplo es una base de datos en memoria en lugar de una base de datos PostgreSQL real.

#### Ejemplo Práctico: Testeando un `OrderService`
Tu `OrderService` depende de `ProductService` y `EmailService`.
```typescript
// Test para createOrder
it('debería crear una orden y enviar un email', async () => {
  // Arrange
  const mockProductService = { findById: jest.fn(), reduceStock: jest.fn() };
  const mockEmailService = { send: jest.fn() };
  
  // Configura los STUBS
  mockProductService.findById.mockResolvedValue({ id: 1, name: 'Laptop', stock: 10 });
  
  const orderService = new OrderService(mockProductService, mockEmailService);

  // Act
  await orderService.createOrder({ userId: 1, productId: 1, quantity: 2 });

  // Assert - Usando los MOCKS
  // ¿Se llamó a reduceStock con los parámetros correctos?
  expect(mockProductService.reduceStock).toHaveBeenCalledWith(1, 2);
  // ¿Se llamó al servicio de email?
  expect(mockEmailService.send).toHaveBeenCalledTimes(1);
});
```
En este ejemplo:
- Usamos un **stub** para que `findById` devuelva un producto con stock suficiente.
- Usamos las capacidades de **mock** de `jest.fn()` para verificar que los métodos `reduceStock` y `send` fueron llamados como se esperaba.
Esto nos permite probar la lógica del `OrderService` sin depender del funcionamiento real de los otros servicios.
