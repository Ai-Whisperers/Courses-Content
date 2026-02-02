### Tutorial: Patrones Estructurales

Estos patrones se centran en cómo las clases y objetos se componen para formar estructuras más grandes, manteniendo al mismo tiempo estas estructuras flexibles y eficientes.

#### 1. Adapter
**Propósito**: Permite que interfaces incompatibles trabajen juntas. Actúa como un "traductor" entre dos clases.

- **Cuándo usarlo**: Cuando quieres usar una librería externa o un componente legacy, pero su interfaz no coincide con la que tu sistema espera.
- **Ejemplo Práctico**: Tu aplicación tiene una interfaz estándar `PaymentProcessor`. Quieres integrar Stripe, pero la API de Stripe tiene métodos completamente diferentes. Creas una clase `StripeAdapter` que implementa *tu* interfaz `PaymentProcessor`, pero por dentro llama a los métodos específicos de la API de Stripe. Si mañana quieres cambiar a PayPal, solo creas un `PayPalAdapter` sin cambiar el resto de tu aplicación.

#### 2. Decorator
**Propósito**: Agrega funcionalidades a un objeto dinámicamente, sin alterar su clase.

- **Cuándo usarlo**: Cuando quieres añadir responsabilidades a objetos individuales de forma flexible, en lugar de usar herencia que afectaría a todas las instancias de la clase.
- **Ejemplo Práctico**: Tienes un objeto base `Coffee`. Quieres permitir que el usuario le agregue "leche", "azúcar", o "crema". Creas `MilkDecorator`, `SugarDecorator`, etc. Cada decorador "envuelve" al objeto `Coffee` original, añadiendo su propio costo y descripción. Puedes combinar decoradores: `new SugarDecorator(new MilkDecorator(new SimpleCoffee()))`.

#### 3. Facade
**Propósito**: Proporciona una interfaz unificada y simplificada a un subsistema complejo.

- **Cuándo usarlo**: Cuando tienes un conjunto de clases que realizan una tarea compleja y no quieres que el código "cliente" tenga que conocer e interactuar con todas ellas.
- **Ejemplo Práctico**: Un proceso de "Registro de Usuario" puede involucrar al `UserService`, `AuthService`, `EmailService` y `LoggerService`. En lugar de que tu controlador llame a estos cuatro servicios, creas una `RegistrationFacade` que tiene un solo método `registerUser()`. Este método orquesta las llamadas a todos los servicios del subsistema en el orden correcto, ocultando la complejidad al cliente.
