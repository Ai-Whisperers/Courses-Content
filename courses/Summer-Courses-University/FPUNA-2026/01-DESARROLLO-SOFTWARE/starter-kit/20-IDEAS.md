# 20 Ideas para Usar IA en Desarrollo de Software

## Proyectos con Progresión de Complejidad

---

## 🟢 NIVEL PRINCIPIANTE (Ideas 1-7)
*Para quienes empiezan a programar con asistencia de IA*

---

### 1. Calculadora de Propinas (Tu Primer Script)
**Objetivo:** Escribir tu primera función con ayuda de IA.

**Prompt:**
```
"Escribe una función en Python que calcule la propina
de un restaurante.

Inputs:
- total de la cuenta (número)
- porcentaje de propina (10, 15, 20)
- cantidad de personas para dividir

Output:
- Total con propina
- Cuánto paga cada persona

Incluye:
- Validación de inputs (no negativos)
- Comentarios explicando cada paso
- Ejemplo de uso al final"
```

**Qué aprendes:**
- Cómo pedir código a IA
- Revisar que la lógica sea correcta
- Ejecutar y probar el resultado

**Verificación:** Prueba con cuenta de 100.000 Gs, 10% propina, 4 personas.
¿El resultado es correcto? (27.500 Gs cada uno)

---

### 2. Conversor de Monedas Simple
**Objetivo:** Trabajar con diccionarios y entrada de usuario.

**Prompt:**
```
"Crea un script Python de conversor de monedas:

Monedas soportadas:
- PYG (Guaraní)
- USD (Dólar)
- BRL (Real)
- ARS (Peso Argentino)

El usuario ingresa:
1. Cantidad
2. Moneda origen
3. Moneda destino

Usa tasas de cambio fijas (definidas en un diccionario).
Muestra el resultado formateado con separador de miles.

Incluye manejo de errores si la moneda no existe."
```

**Verificación:**
- ¿Funciona en ambas direcciones?
- ¿Qué pasa si ingreso una moneda que no existe?
- ¿Los números grandes se muestran bien?

---

### 3. Lista de Tareas en Consola
**Objetivo:** Tu primera aplicación con persistencia.

**Prompt:**
```
"Crea una aplicación de lista de tareas (TODO) en Python
que funcione en la terminal.

Funciones:
1. Agregar tarea
2. Listar tareas (mostrar número y estado)
3. Marcar tarea como completada
4. Eliminar tarea
5. Salir

Requisitos:
- Guardar tareas en un archivo JSON
- Al iniciar, cargar tareas guardadas
- Interfaz con menú numerado
- Manejo de errores (archivo no existe, índice inválido)"
```

**Qué aprendes:**
- Manejo de archivos
- Estructuras de datos
- Bucles e interacción con usuario

**Extensión:** Agrega fecha límite y filtro por tareas pendientes.

---

### 4. Validador de Formularios
**Objetivo:** Escribir funciones de validación reutilizables.

**Prompt:**
```
"Crea un módulo Python con funciones de validación:

Funciones a implementar:
1. validar_email(email) -> bool
2. validar_ci_paraguay(ci) -> bool (cédula paraguaya)
3. validar_telefono_py(tel) -> bool (formato 09XX XXX XXX)
4. validar_ruc(ruc) -> bool (RUC paraguayo)
5. validar_password(pwd) -> tuple(bool, list[errores])
   - Mínimo 8 caracteres
   - Al menos una mayúscula
   - Al menos un número
   - Al menos un símbolo

Para cada función:
- Usa expresiones regulares donde aplique
- Retorna True/False o tupla con errores
- Incluye docstring explicativo
- Incluye 3 tests de ejemplo

NO uses librerías externas, solo re (regex)."
```

**Verificación:** Prueba con datos válidos e inválidos para cada función.

---

### 5. Generador de Contraseñas Seguras
**Objetivo:** Trabajar con aleatoriedad y argumentos de línea de comando.

**Prompt:**
```
"Crea un generador de contraseñas por línea de comando:

Uso: python genpass.py [opciones]

Opciones:
-l, --length: Longitud (default 16)
-n, --number: Cuántas contraseñas generar (default 1)
--no-symbols: Excluir símbolos especiales
--no-numbers: Excluir números
--no-upper: Excluir mayúsculas

Usa argparse para los argumentos.
Usa secrets (no random) para seguridad.

Ejemplo:
$ python genpass.py -l 20 -n 5
Genera 5 contraseñas de 20 caracteres

Incluye una función para verificar la fortaleza
de la contraseña generada (débil/media/fuerte)."
```

---

### 6. Scraper de Precios Básico
**Objetivo:** Primera interacción con web scraping.

**Prompt:**
```
"Crea un script que obtenga precios de una página web simple.

IMPORTANTE: Para este ejercicio, usaremos una API pública
en lugar de scraping real (es más ético para aprender).

Usa la API de CoinGecko (gratis, sin API key):
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,pyg

El script debe:
1. Hacer request a la API
2. Parsear el JSON
3. Mostrar precios en formato tabla
4. Guardar histórico en CSV con timestamp
5. Correr cada 5 minutos (usando schedule)

Usa: requests, json, csv, schedule
Maneja errores de red gracefully."
```

**Qué aprendes:**
- HTTP requests
- Parsing JSON
- Manejo de archivos CSV
- Scheduling

---

### 7. Bot Básico de Telegram
**Objetivo:** Tu primera integración con API externa.

**Prompt:**
```
"Crea un bot de Telegram simple que responda a comandos:

Comandos:
/start - Mensaje de bienvenida
/ayuda - Lista de comandos disponibles
/hora - Hora actual en Paraguay
/clima [ciudad] - Clima actual (usar API gratis)
/cotizacion - Cotización USD/PYG del BCP

Usa python-telegram-bot (librería oficial).

Estructura:
- Archivo de configuración para token
- Handler separado por comando
- Logging de interacciones
- Manejo de errores

NO incluyas el token en el código, usa .env"
```

**Verificación:** ¿El bot responde? ¿Maneja errores si la ciudad no existe?

---

## 🟡 NIVEL INTERMEDIO (Ideas 8-14)
*Para quienes tienen bases de programación*

---

### 8. API REST Completa con FastAPI
**Objetivo:** Construir tu primera API profesional.

**Prompt:**
```
"Crea una API REST para un sistema de gestión de productos:

Endpoints:
GET    /productos          - Listar (con paginación y filtros)
GET    /productos/{id}     - Obtener uno
POST   /productos          - Crear
PUT    /productos/{id}     - Actualizar
DELETE /productos/{id}     - Eliminar

Modelo Producto:
- id: int (auto)
- nombre: str (requerido, max 200)
- descripcion: str (opcional)
- precio: Decimal (requerido, > 0)
- stock: int (default 0)
- categoria: str (enum: electrónica, ropa, alimentos, otros)
- activo: bool (default True)
- created_at, updated_at: datetime

Requisitos:
- FastAPI + Pydantic para validación
- SQLite para simplicidad (con SQLAlchemy)
- Documentación automática (Swagger UI)
- Manejo de errores HTTP apropiados
- CORS habilitado

Incluye:
- Modelo Pydantic para crear/actualizar (sin id)
- Modelo Pydantic para respuesta (con id)
- Tests básicos con pytest"
```

---

### 9. Sistema de Autenticación JWT
**Objetivo:** Implementar auth segura.

**Prompt:**
```
"Extiende la API anterior con autenticación JWT:

Nuevos endpoints:
POST /auth/register
- email, password, nombre
- Hashear password con bcrypt
- Retornar usuario creado (sin password)

POST /auth/login
- email, password
- Verificar credenciales
- Retornar access_token (JWT)

GET /auth/me
- Requiere JWT válido
- Retorna usuario actual

Requisitos:
- Token expira en 24 horas
- Middleware de autenticación
- Decorador @require_auth para proteger endpoints
- Refresh token (opcional)

Los endpoints de productos ahora requieren auth.
Solo admins pueden crear/editar/eliminar.

Incluye:
- Rol de usuario (user/admin)
- Validación de email único
- Password mínimo 8 caracteres"
```

---

### 10. Frontend React con Consumo de API
**Objetivo:** Conectar frontend con backend.

**Prompt:**
```
"Crea un frontend React para la API de productos:

Páginas:
1. Login/Register
2. Lista de productos (con búsqueda y filtros)
3. Detalle de producto
4. Crear/Editar producto (solo admin)

Componentes:
- ProductCard (imagen, nombre, precio, stock)
- ProductList (grid responsive)
- SearchBar con debounce
- Filters (categoría, rango de precio)
- Pagination

Requisitos:
- React + Vite
- Tailwind CSS
- React Query para data fetching
- React Router para navegación
- Zustand para estado de auth
- Axios con interceptor para JWT

Features:
- Loading states
- Error handling con toast
- Responsive (mobile-first)
- Formularios con react-hook-form + zod"
```

---

### 11. Testing Comprehensivo
**Objetivo:** Escribir tests que realmente encuentran bugs.

**Prompt:**
```
"Escribe una suite de tests completa para la API de productos:

UNIT TESTS (tests/unit/):
- Test de validación de modelos Pydantic
- Test de funciones de utilidad
- Test de lógica de negocio (service layer)

INTEGRATION TESTS (tests/integration/):
- Test de endpoints CRUD
- Test de autenticación
- Test de permisos (user vs admin)
- Test de paginación y filtros
- Test de error handling

Casos a cubrir:
- Happy path (operación exitosa)
- Validación de inputs (datos inválidos)
- Casos edge (producto sin stock, email duplicado)
- Autenticación (sin token, token expirado, token inválido)
- Autorización (user intenta crear producto)

Usa:
- pytest + pytest-asyncio
- httpx para test client
- Factory Boy para fixtures
- Coverage report (mínimo 80%)

Estructura cada test con:
# Arrange (setup)
# Act (ejecutar)
# Assert (verificar)"
```

---

### 12. WebSocket para Chat en Tiempo Real
**Objetivo:** Trabajar con comunicación bidireccional.

**Prompt:**
```
"Crea un sistema de chat en tiempo real:

BACKEND (FastAPI + WebSockets):
- Salas de chat (rooms)
- Usuarios autenticados
- Mensajes con timestamp y autor
- Historial persistido (últimos 100 mensajes por sala)
- Notificación cuando usuario entra/sale

Eventos:
- join_room: Unirse a sala
- leave_room: Salir de sala
- send_message: Enviar mensaje
- typing: Indicador de escritura

FRONTEND (React):
- Lista de salas disponibles
- Área de chat con scroll automático
- Input de mensaje con envío en Enter
- Indicador 'X está escribiendo...'
- Lista de usuarios online en sala

Manejo de:
- Reconexión automática
- Mensajes offline (queue)
- Rate limiting (max 1 msg/segundo)"
```

---

### 13. Background Jobs con Celery
**Objetivo:** Procesar tareas asíncronas.

**Prompt:**
```
"Implementa un sistema de tareas en background:

Caso de uso: Envío de emails masivos

Componentes:
- API endpoint: POST /campaigns/send
  Body: { template_id, recipient_ids[] }
- Worker Celery que procesa envíos
- Redis como broker

Flujo:
1. Usuario crea campaña de email
2. API encola tarea y retorna inmediatamente
3. Worker procesa emails en batches de 10
4. Actualiza progreso en Redis
5. API endpoint para consultar progreso

Características:
- Retry automático con backoff (máx 3 intentos)
- Dead letter queue para fallas permanentes
- Rate limiting (máx 100 emails/minuto)
- Logging detallado
- Métricas de envío (enviados, fallidos, pending)

Bonus: Dashboard simple para ver progreso"
```

---

### 14. CLI Profesional con Rich
**Objetivo:** Crear herramientas de línea de comando pulidas.

**Prompt:**
```
"Crea una CLI para gestionar proyectos de desarrollo:

Comandos:
devtool init [nombre]
  - Crea estructura de proyecto
  - Inicializa git
  - Crea .env.example y .gitignore
  - Instala dependencias base

devtool db [migrate|seed|reset]
  - Gestiona base de datos del proyecto

devtool test [--coverage] [--watch]
  - Ejecuta tests con opciones

devtool deploy [staging|production]
  - Deploy con confirmación

devtool status
  - Muestra estado del proyecto
  - Dependencias desactualizadas
  - Tests passing
  - Coverage actual

UI con Rich:
- Tablas formateadas
- Spinners durante operaciones largas
- Progress bars
- Colores para errores/éxito
- Confirmaciones interactivas

Usa: Click + Rich"
```

---

## 🔴 NIVEL AVANZADO (Ideas 15-20)
*Para desarrolladores que buscan dominar arquitectura y DevOps*

---

### 15. Microservicios con Docker Compose
**Objetivo:** Arquitectura distribuida.

**Prompt:**
```
"Diseña una arquitectura de microservicios para e-commerce:

Servicios:
1. API Gateway (Kong/Traefik)
2. Auth Service (users, sessions)
3. Product Service (catálogo)
4. Order Service (pedidos)
5. Notification Service (emails, push)
6. Payment Service (mock)

Cada servicio:
- FastAPI independiente
- Base de datos propia
- Dockerfile optimizado (multi-stage)
- Health checks

Comunicación:
- Sync: REST entre services via gateway
- Async: RabbitMQ para eventos

docker-compose.yml con:
- Todos los servicios
- Databases (Postgres x3)
- RabbitMQ
- Redis (cache, sessions)
- Traefik (routing, SSL local)

Incluye:
- Shared library para modelos comunes
- Scripts de setup
- README con arquitectura (ASCII diagram)"
```

---

### 16. Pipeline CI/CD Completo
**Objetivo:** Automatización profesional.

**Prompt:**
```
"Crea un pipeline de GitHub Actions completo:

Triggers:
- Push a cualquier branch: lint + tests
- PR a main: todo + preview deploy
- Merge a main: deploy staging
- Tag v*: deploy production

Jobs:

1. quality:
   - Lint (flake8/eslint)
   - Type check (mypy/tsc)
   - Security scan (bandit/npm audit)
   - Dependency check

2. test:
   - Unit tests con coverage
   - Integration tests con DB real (service container)
   - E2E tests con Playwright
   - Upload coverage a Codecov

3. build:
   - Build Docker image
   - Push a GitHub Container Registry
   - Tag con SHA y semver

4. deploy-staging:
   - Deploy a Railway/Render
   - Run smoke tests
   - Notificar Slack

5. deploy-production:
   - Requiere approval manual
   - Blue-green deployment
   - Rollback automático si health check falla
   - Notificar equipo

Optimizaciones:
- Cache de dependencias
- Jobs paralelos donde sea posible
- Matrices para múltiples versiones Python/Node"
```

---

### 17. Sistema de Caching Multinivel
**Objetivo:** Optimización de performance.

**Prompt:**
```
"Implementa caching multinivel para la API:

Niveles:
1. In-memory (LRU cache, 100 items, 5 min TTL)
2. Redis (distribuido, 15 min TTL)
3. Database (source of truth)

Patrones:
- Cache-aside para lecturas
- Write-through para escrituras
- Cache invalidation por tags

Implementar:
- Decorator @cached(ttl=300, key='product:{id}')
- Invalidación automática en update/delete
- Tags para invalidar grupos ('products', 'user:123:cart')
- Fallback graceful (si Redis cae, usa solo memory)

Métricas:
- Hit/miss ratio por nivel
- Latencia por operación
- Tamaño de cache

Endpoints de admin:
- GET /cache/stats
- POST /cache/invalidate?tag=xxx
- DELETE /cache/clear

Tests:
- Verificar invalidación correcta
- Performance comparison (con/sin cache)"
```

---

### 18. Observabilidad Completa
**Objetivo:** Monitoring y debugging en producción.

**Prompt:**
```
"Implementa observabilidad completa:

LOGGING (Structured):
- JSON format
- Request ID tracking (correlation)
- User ID en contexto
- Niveles apropiados (debug, info, warn, error)
- Rotación y retención

METRICS (Prometheus):
- Request count by endpoint, method, status
- Request duration histogram
- Active connections
- Database query duration
- Custom business metrics (orders/min, revenue)

TRACING (OpenTelemetry):
- Trace requests across services
- Span para cada operación significativa
- Propagación de contexto
- Export a Jaeger

ALERTING:
- Error rate > 1% por 5 min
- P99 latency > 2s
- Memory > 80%
- Disk > 90%

Dashboard Grafana:
- Overview del sistema
- Métricas por servicio
- Logs correlacionados
- Drill-down por trace"
```

---

### 19. Event Sourcing + CQRS
**Objetivo:** Arquitectura avanzada para sistemas críticos.

**Prompt:**
```
"Implementa Event Sourcing para el sistema de órdenes:

Eventos:
- OrderCreated { id, user_id, items[], timestamp }
- OrderItemAdded { order_id, product_id, quantity }
- OrderItemRemoved { order_id, product_id }
- OrderConfirmed { order_id, timestamp }
- OrderPaid { order_id, amount, payment_method }
- OrderShipped { order_id, tracking_number }
- OrderDelivered { order_id, timestamp }
- OrderCancelled { order_id, reason }

Event Store:
- Tabla de eventos inmutable
- Snapshots cada 100 eventos
- Proyecciones para queries

CQRS:
- Write model: Solo agrega eventos
- Read model: Proyecciones optimizadas para queries
- Sincronización async via eventos

Queries (read model):
- Órdenes de un usuario
- Órdenes por estado
- Total vendido por día

Ventajas a demostrar:
- Reconstruir estado desde eventos
- Audit log completo
- Time travel (estado en cualquier momento)"
```

---

### 20. API Rate Limiting Distribuido
**Objetivo:** Protección y fairness en APIs públicas.

**Prompt:**
```
"Implementa rate limiting distribuido:

Estrategias:
1. Fixed Window (X requests por minuto)
2. Sliding Window (más preciso)
3. Token Bucket (ráfagas permitidas)
4. Leaky Bucket (salida constante)

Implementar Sliding Window Log con Redis:

Límites por tier:
- Anonymous: 10 req/min
- Free: 100 req/min
- Premium: 1000 req/min
- Enterprise: Custom

Por scope:
- Global (todas las APIs)
- Por endpoint (algunos más estrictos)
- Por usuario (cuota personal)

Response headers:
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset

Cuando excede límite:
- HTTP 429 Too Many Requests
- Retry-After header
- JSON con mensaje claro

Bonus:
- Dashboard de uso por API key
- Alertas si usuario consistentemente excede
- Throttling gradual (no corte abrupto)"
```

---

## Progresión Recomendada

```
SEMANA 1-2: Ideas 1-4
→ Fundamentos de Python, lógica, archivos

SEMANA 3-4: Ideas 5-7
→ APIs externas, línea de comando, integración

SEMANA 5-6: Ideas 8-10
→ API REST completa, autenticación, frontend

SEMANA 7-8: Ideas 11-14
→ Testing, WebSockets, background jobs

SEMANA 9+: Ideas 15-20
→ Arquitectura distribuida, DevOps, optimización
```

---

## Verificación de Cada Proyecto

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   Antes de considerar un proyecto "terminado":              │
│                                                              │
│   □ ¿Funciona correctamente? (probaste todos los casos)    │
│   □ ¿Entiendes TODO el código? (podrías explicarlo)        │
│   □ ¿Maneja errores apropiadamente?                        │
│   □ ¿Tiene validación de inputs?                           │
│   □ ¿Tiene tests básicos?                                  │
│   □ ¿Está documentado? (al menos README)                   │
│   □ ¿Es seguro? (no expone credenciales, SQL injection)    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*20-IDEAS.md - Track 01 Desarrollo de Software - FPUNA 2026*
