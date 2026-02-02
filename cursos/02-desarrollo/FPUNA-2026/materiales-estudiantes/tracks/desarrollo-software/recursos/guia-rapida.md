# Guía Rápida - Desarrollo de Software
## FPUNA Verano 2026

Referencia rápida de comandos y patrones del track de Software Development.

---

## Comandos Esenciales

### OpenCode

```bash
# Iniciar sesión
opencode

# Con proyecto específico
opencode --project ./mi-proyecto

# Modo compacto (menos contexto)
/compact
```

### Git

```bash
# Setup inicial
git init
git remote add origin <url>

# Flujo diario
git add .
git commit -m "feat: descripción breve"
git push

# Branches
git checkout -b feature/nueva-funcionalidad
git merge main
```

### Docker

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f nombre-servicio

# Detener todo
docker-compose down

# Limpiar todo (incluyendo volúmenes)
docker-compose down -v
```

### NestJS

```bash
# Crear proyecto
nest new mi-proyecto

# Generar recursos
nest g module usuarios
nest g controller usuarios
nest g service usuarios

# Generar CRUD completo
nest g resource productos
```

### Testing

```bash
# Ejecutar todos los tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# Tests E2E
npm run test:e2e
```

---

## Patrones de Código

### Controller (NestJS)

```typescript
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.service.create(dto);
  }
}
```

### Service

```typescript
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.repo.find();
  }

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.repo.create(dto);
    return this.repo.save(usuario);
  }
}
```

### Repository Pattern

```typescript
// Inyección de dependencias
constructor(
  @InjectRepository(Entidad)
  private readonly repo: Repository<Entidad>,
) {}

// Operaciones comunes
this.repo.find()                    // Todos
this.repo.findOne({ where: { id }}) // Por ID
this.repo.create(dto)               // Crear instancia
this.repo.save(entidad)             // Guardar
this.repo.update(id, dto)           // Actualizar
this.repo.delete(id)                // Eliminar
```

### DTO con Validación

```typescript
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

---

## SOLID - Resumen

| Principio | Significado | Regla Simple |
|-----------|-------------|--------------|
| **S**ingle Responsibility | Una clase, una razón para cambiar | Si usas "y" para describir la clase, divídela |
| **O**pen/Closed | Abierto a extensión, cerrado a modificación | Agrega código, no modifiques existente |
| **L**iskov Substitution | Subclases intercambiables | Hijos deben funcionar donde va el padre |
| **I**nterface Segregation | Interfaces específicas | Muchas interfaces pequeñas > una grande |
| **D**ependency Inversion | Depende de abstracciones | Inyecta interfaces, no implementaciones |

---

## Design Patterns Frecuentes

### Factory

```typescript
// Crear objetos sin exponer lógica de creación
class NotificacionFactory {
  static crear(tipo: 'email' | 'sms'): Notificacion {
    switch (tipo) {
      case 'email': return new EmailNotificacion();
      case 'sms': return new SmsNotificacion();
    }
  }
}
```

### Strategy

```typescript
// Intercambiar algoritmos en runtime
interface PagoStrategy {
  procesar(monto: number): Promise<boolean>;
}

class TarjetaPago implements PagoStrategy { ... }
class PaypalPago implements PagoStrategy { ... }

// Uso
const procesador = new ProcesadorPagos(new TarjetaPago());
```

### Observer

```typescript
// Notificar cambios automáticamente
@EventEmitter('pedido.creado')
async crearPedido(dto: CreatePedidoDto) {
  // Al crear, emite evento automáticamente
}

@OnEvent('pedido.creado')
async enviarConfirmacion(pedido: Pedido) {
  // Se ejecuta automáticamente
}
```

---

## Docker Compose - Template

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    depends_on:
      - postgres
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - '6379:6379'

volumes:
  postgres_data:
```

---

## Troubleshooting Común

| Problema | Solución |
|----------|----------|
| Puerto en uso | `lsof -i :3000` y matar proceso |
| Docker no conecta | Verificar que servicios estén `up` |
| TypeORM error migración | `npm run migration:run` |
| Tests fallan random | Agregar `--runInBand` a Jest |
| Import circular | Usar `forwardRef()` |

---

## Prompts OpenCode Útiles

```
# Generar módulo completo
"Crea un módulo NestJS para gestión de [entidad] con:
- CRUD completo
- DTOs con validación
- Tests unitarios
- TypeORM repository"

# Refactorizar
"Refactoriza este código aplicando el patrón [Strategy/Factory/etc]"

# Debug
"Analiza este error y sugiere solución: [error]"
```

---

*Track 01 - Software Development - FPUNA Verano 2026*
