### Tutorial: Principios SOLID

SOLID son cinco principios de diseño orientado a objetos que hacen que el software sea más entendible, flexible y mantenible.

#### 1. S - Single Responsibility Principle (SRP)
**"Una clase debe tener una y solo una razón para cambiar."**

- **Problema que resuelve**: Clases "dios" que hacen de todo (manejan la base de datos, envían emails, calculan reportes). Si necesitas cambiar cómo se envían los emails, tienes que tocar una clase que también maneja la lógica de la base de datos, lo cual es riesgoso.
- **Solución**: Divide la clase en clases más pequeñas y cohesivas.
  - `UserRepository`: Solo para interactuar con la base de datos de usuarios.
  - `EmailService`: Solo para enviar emails.
  - `ReportGenerator`: Solo para crear reportes.

#### 2. O - Open/Closed Principle (OCP)
**"El software debe estar abierto para la extensión, pero cerrado para la modificación."**

- **Problema que resuelve**: Una serie de `if/else if` que crece cada vez que se añade un nuevo tipo de algo (ej: un nuevo tipo de descuento, un nuevo método de pago). Cada vez que añades un `if`, corres el riesgo de romper la lógica existente.
- **Solución**: Usa interfaces y polimorfismo (Patrón Strategy). Creas una interfaz (`DiscountStrategy`) y luego implementas una clase separada para cada tipo de descuento (`StudentDiscount`, `SeniorDiscount`). Añadir un nuevo descuento significa crear una nueva clase, sin tocar el código que ya funcionaba.

#### 3. L - Liskov Substitution Principle (LSP)
**"Los subtipos deben ser sustituibles por sus tipos base sin alterar la corrección del programa."**

- **Problema que resuelve**: Herencia incorrecta. El ejemplo clásico es un `Cuadrado` que hereda de `Rectangulo`. Si tienes una función que acepta un `Rectangulo` y le cambias el ancho (`rect.setWidth(10)`), esperas que el alto no cambie. Pero si le pasas un `Cuadrado`, cambiar el ancho *también* cambia el alto, rompiendo la lógica del programa.
- **Solución**: Asegúrate de que las clases hijas no violen las "promesas" o invariantes de la clase padre. A menudo, es mejor usar composición que herencia.

#### 4. I - Interface Segregation Principle (ISP)
**"Los clientes no deben ser forzados a depender de interfaces que no usan."**

- **Problema que resuelve**: Interfaces "gordas" que tienen docenas de métodos. Si una clase solo necesita implementar uno de esos métodos, se ve forzada a tener implementaciones vacías para todos los demás.
- **Solución**: Divide las interfaces grandes en interfaces más pequeñas y específicas. En lugar de una interfaz `Worker` con los métodos `work()` y `eat()`, crea dos interfaces separadas: `IWorkable` y `IEatable`. Un `HumanWorker` puede implementar ambas, mientras que un `RobotWorker` solo implementaría `IWorkable`.

#### 5. D - Dependency Inversion Principle (DIP)
**"Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones."**

- **Problema que resuelve**: Acoplamiento fuerte. Si tu `UserService` (alto nivel) crea una instancia directa de `PostgresDatabase` (bajo nivel), tu servicio está permanentemente atado a PostgreSQL. Es imposible de testear sin una base de datos real y muy difícil de migrar a otra base de datos como MongoDB.
- **Solución**: Inyección de Dependencias. El `UserService` depende de una interfaz `IDatabase`. En producción, le "inyectas" una instancia de `PostgresDatabase`. En los tests, le inyectas una `MockDatabase`. El `UserService` no sabe ni le importa con qué implementación concreta está hablando.
