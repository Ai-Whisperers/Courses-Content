### Tutorial: Patrones Creacionales

Estos patrones se encargan de la creación de objetos de manera flexible y reutilizable.

#### 1. Factory Method
**Propósito**: Delega la creación de objetos a subclases, permitiendo que una clase no sepa qué tipo de objeto concreto va a crear.

- **Cuándo usarlo**: Cuando tienes una superclase con múltiples subclases y, basado en alguna entrada, necesitas devolver una de esas subclases. Es una alternativa más limpia a un `switch` o `if/else if` gigante en tu código.
- **Ejemplo Práctico**: Una `NotificationFactory` que puede crear objetos `EmailNotification`, `SMSNotification`, o `PushNotification` dependiendo de un parámetro de entrada. El código que llama a la fábrica no necesita saber cómo se construye cada tipo de notificación, solo le pide una.

#### 2. Singleton
**Propósito**: Asegura que una clase tenga una única instancia y proporciona un punto de acceso global a ella.

- **Cuándo usarlo**: Para objetos que deben ser únicos en todo el sistema, como una conexión a la base de datos, un gestor de configuración, o un servicio de logging.
- **Implementación**: Se hace el constructor privado y se expone un método estático `getInstance()` que crea la instancia la primera vez que se llama y la devuelve en todas las llamadas posteriores.
- **Advertencia**: Es considerado por muchos un "anti-patrón" porque introduce estado global y hace que el código sea más difícil de testear. A menudo, la Inyección de Dependencias es una mejor alternativa.

#### 3. Builder
**Propósito**: Separa la construcción de un objeto complejo de su representación, permitiendo que el mismo proceso de construcción pueda crear diferentes representaciones.

- **Cuándo usarlo**: Cuando te enfrentas a un constructor con una larga lista de parámetros (`new User("Juan", "juan@...", 25, null, "Asunción", ...)`). Esto es frágil y difícil de leer.
- **Solución**: El Builder te permite construir el objeto paso a paso con métodos encadenados y legibles (`new UserBuilder().withName("Juan").withEmail("...").withAge(25).build()`). Esto es especialmente útil cuando muchos de los parámetros son opcionales.
