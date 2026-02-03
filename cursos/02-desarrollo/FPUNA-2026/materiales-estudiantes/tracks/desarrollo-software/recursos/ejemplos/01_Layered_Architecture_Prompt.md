```bash
opencode "Genera una arquitectura en capas para un módulo de usuarios en NestJS:

CAPAS A GENERAR:
1. CONTROLLER (user.controller.ts)
   - Define los endpoints de la API REST:
     - `POST /users` (crear usuario)
     - `GET /users/:id` (obtener usuario)
   - Usa DTOs (Data Transfer Objects) para validar los datos de entrada.

2. SERVICE (user.service.ts)
   - Implementa la lógica de negocio:
     - Verificar que el email sea único antes de crear.
     - Hashear la contraseña usando `bcrypt` antes de guardarla.
     - Orquestar la llamada al repositorio.

3. REPOSITORY (user.repository.ts)
   - Encapsula toda la lógica de acceso a la base de datos.
   - Provee métodos como `createUser`, `findById`, `findByEmail`.
   - Utiliza TypeORM o Prisma para las queries.

4. ENTITY / DTOs
   - `user.entity.ts`: Define la estructura del usuario en la base de datos.
   - `create-user.dto.ts`: Define el objeto de datos para la creación de usuarios, con validadores (`@IsEmail()`, `@MinLength(8)`).

TECNOLOGÍAS:
- TypeScript + NestJS
- Decorators para inyección de dependencias (`@Controller`, `@Injectable`, `@InjectRepository`).
- `class-validator` y `class-transformer` para la validación de DTOs.
- TypeORM (o Prisma) como ORM.

REQUISITOS ADICIONALES:
- Incluir manejo de errores (ej: `NotFoundException` si el usuario no existe).
- El código debe estar completamente comentado en español, explicando el rol de cada parte."
```