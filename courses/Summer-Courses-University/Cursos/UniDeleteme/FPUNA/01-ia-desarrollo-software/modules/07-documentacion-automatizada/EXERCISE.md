# Ejercicio: Documentación Automatizada con IA

## Documentar Código y Proyectos

---

## Objetivo

Practicar la generación de documentación profesional usando IA: docstrings, READMEs, documentación de API y diagramas de arquitectura.

---

## Parte 1: Documentación de Funciones (20 min)

### 1.1 Generar Docstrings

Documenta estas funciones usando IA. Solicita el estilo Google:

```python
def validate_credit_card(number):
    number = str(number).replace(" ", "").replace("-", "")
    if not number.isdigit() or len(number) < 13 or len(number) > 19:
        return False

    total = 0
    for i, digit in enumerate(reversed(number)):
        d = int(digit)
        if i % 2 == 1:
            d *= 2
            if d > 9:
                d -= 9
        total += d

    return total % 10 == 0


def merge_sorted_lists(list1, list2):
    result = []
    i = j = 0

    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1

    result.extend(list1[i:])
    result.extend(list2[j:])
    return result


def calculate_levenshtein(s1, s2):
    if len(s1) < len(s2):
        return calculate_levenshtein(s2, s1)

    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row

    return previous_row[-1]
```

### 1.2 Prompt Sugerido

```
Genera docstrings estilo Google para estas funciones Python.
Incluye:
- Descripción clara de qué hace
- Args con tipos y descripción
- Returns con tipo y descripción
- Examples con casos de uso
- Raises si aplica

[pegar código]
```

### 1.3 Documentar

Complete la tabla:

| Función | Algoritmo/Técnica | Complejidad |
|---------|-------------------|-------------|
| validate_credit_card | | |
| merge_sorted_lists | | |
| calculate_levenshtein | | |

---

## Parte 2: Documentación de Clases (25 min)

### 2.1 Clase a Documentar

```python
class RateLimiter:
    def __init__(self, max_requests, window_seconds):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = {}

    def _cleanup(self, key):
        now = time.time()
        if key in self.requests:
            self.requests[key] = [
                t for t in self.requests[key]
                if now - t < self.window_seconds
            ]

    def is_allowed(self, key):
        self._cleanup(key)

        if key not in self.requests:
            self.requests[key] = []

        if len(self.requests[key]) < self.max_requests:
            self.requests[key].append(time.time())
            return True

        return False

    def get_wait_time(self, key):
        self._cleanup(key)

        if key not in self.requests or len(self.requests[key]) < self.max_requests:
            return 0

        oldest = min(self.requests[key])
        return max(0, self.window_seconds - (time.time() - oldest))

    def reset(self, key=None):
        if key is None:
            self.requests = {}
        elif key in self.requests:
            del self.requests[key]
```

### 2.2 Tareas

1. **Genera docstring de clase** que explique:
   - Propósito general
   - Patrón implementado (sliding window)
   - Casos de uso

2. **Documenta cada método** con:
   - Descripción
   - Args
   - Returns
   - Examples

3. **Agrega type hints** a todos los parámetros y retornos

### 2.3 Prompt para Type Hints

```
Agrega type hints completos a esta clase Python.
Usa tipos del módulo typing cuando sea necesario (List, Dict, Optional, etc.)
Mantén compatibilidad con Python 3.8+

[código]
```

---

## Parte 3: Generar README (30 min)

### 3.1 Información del Proyecto

Tienes un proyecto con estas características:

```
Nombre: PyMetrics
Descripción: Librería para recolección y análisis de métricas de aplicaciones

Características:
- Recolección de métricas de CPU, memoria, red
- Almacenamiento en múltiples backends (Redis, InfluxDB, Prometheus)
- Dashboard web integrado
- Alertas configurables
- API REST para consultas
- SDK para Python, JavaScript

Requisitos:
- Python 3.8+
- Redis o InfluxDB (opcional)
- 100MB RAM mínimo

Instalación:
pip install pymetrics

Configuración:
Archivo config.yaml o variables de entorno

Licencia: Apache 2.0
Autor: Tu nombre
```

### 3.2 Generar README Completo

**Prompt:**
```
Genera un README.md profesional y completo para este proyecto.

[información del proyecto]

Incluye:
1. Badges (Python version, license, tests, coverage)
2. Logo placeholder
3. Descripción atractiva
4. Tabla de contenidos
5. Características con emojis
6. Instalación paso a paso
7. Quick start con código
8. Configuración detallada
9. Ejemplos de uso
10. API reference resumida
11. Arquitectura (diagrama mermaid)
12. Contributing
13. Changelog placeholder
14. Licencia
15. Autores

Formato: Markdown con buen uso de headers, código, tablas y listas.
```

### 3.3 Evaluar README

| Criterio | Presente | Calidad (1-5) |
|----------|----------|---------------|
| Descripción clara | | |
| Instalación | | |
| Ejemplos de uso | | |
| Documentación API | | |
| Contribución | | |

---

## Parte 4: Documentación de API (25 min)

### 4.1 Endpoints a Documentar

```python
from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith('Bearer '):
            return jsonify({'error': 'unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/v1/products', methods=['GET'])
def list_products():
    category = request.args.get('category')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    sort = request.args.get('sort', 'name')
    order = request.args.get('order', 'asc')
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 20, type=int)

    # ... lógica de consulta ...

    return jsonify({
        'products': [...],
        'pagination': {
            'page': page,
            'limit': limit,
            'total': 100,
            'pages': 5
        }
    })

@app.route('/api/v1/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    # ... obtener producto ...
    return jsonify({'id': product_id, 'name': '...', 'price': 0})

@app.route('/api/v1/products', methods=['POST'])
@require_auth
def create_product():
    data = request.json
    # ... crear producto ...
    return jsonify({'id': 1, **data}), 201

@app.route('/api/v1/products/<int:product_id>', methods=['PUT'])
@require_auth
def update_product(product_id):
    data = request.json
    # ... actualizar producto ...
    return jsonify({'id': product_id, **data})

@app.route('/api/v1/products/<int:product_id>', methods=['DELETE'])
@require_auth
def delete_product(product_id):
    # ... eliminar producto ...
    return '', 204
```

### 4.2 Generar Documentación OpenAPI

**Prompt:**
```
Genera especificación OpenAPI 3.0 completa para esta API Flask.

[código]

Incluye:
- info con título, descripción, versión
- servers
- paths con todos los endpoints
- components/schemas para Product, Pagination, Error
- components/securitySchemes para Bearer token
- security requirements
- Ejemplos de request/response
- Códigos de error posibles
```

### 4.3 Generar Documentación Markdown

**Prompt:**
```
Genera documentación de API en formato Markdown para desarrolladores.

[código]

Para cada endpoint incluye:
- Título descriptivo
- Método y URL
- Descripción de funcionalidad
- Headers requeridos (tabla)
- Query parameters (tabla con nombre, tipo, requerido, descripción)
- Body (JSON con comentarios)
- Responses (código, descripción, ejemplo JSON)
- Ejemplo con curl
```

---

## Parte 5: Diagramas de Arquitectura (20 min)

### 5.1 Descripción del Sistema

```
Sistema de Streaming de Video:

Componentes:
- App Móvil (React Native)
- App Web (Next.js)
- API Gateway (Kong)
- Servicio de Autenticación (Node.js + JWT)
- Servicio de Catálogo (Python + PostgreSQL)
- Servicio de Streaming (Go + HLS)
- Servicio de Recomendaciones (Python + TensorFlow)
- CDN (CloudFront)
- Cache (Redis Cluster)
- Cola de Eventos (Kafka)
- Analytics (ClickHouse)
- Storage de Videos (S3)
- Transcoding (AWS Elemental)

Flujos principales:
1. Usuario se autentica
2. Navega catálogo (con cache)
3. Recibe recomendaciones personalizadas
4. Inicia streaming (CDN + HLS)
5. Eventos se envían a analytics
```

### 5.2 Generar Diagramas

**Genera con IA:**

1. **Diagrama de arquitectura general** (Mermaid)
2. **Diagrama de secuencia** para "Usuario inicia streaming"
3. **Diagrama de flujo de datos** para analytics

### 5.3 Prompts

**Arquitectura:**
```
Genera un diagrama Mermaid de arquitectura para este sistema.
Usa subgraphs para agrupar componentes relacionados.
Muestra las conexiones principales entre servicios.

[descripción]
```

**Secuencia:**
```
Genera un diagrama de secuencia Mermaid para el flujo:
"Usuario autenticado solicita reproducir un video"

Participantes: App, API Gateway, Auth Service, Catalog,
Streaming, CDN, Analytics

Muestra:
1. Verificación de token
2. Obtención de metadata
3. Generación de URL firmada
4. Inicio de streaming
5. Envío de evento de reproducción
```

---

## Entregable

Documento con:

1. **Funciones documentadas** (Parte 1)
   - Código con docstrings completos
   - Tabla de análisis

2. **Clase documentada** (Parte 2)
   - Código completo con docstrings y type hints
   - Ejemplo de uso

3. **README generado** (Parte 3)
   - Archivo README.md completo
   - Evaluación de calidad

4. **Documentación API** (Parte 4)
   - Especificación OpenAPI (YAML)
   - Documentación Markdown

5. **Diagramas** (Parte 5)
   - Diagrama de arquitectura
   - Diagrama de secuencia
   - Código Mermaid

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Docstrings de funciones | 15 |
| Documentación de clase | 20 |
| README profesional | 25 |
| Documentación API | 25 |
| Diagramas de arquitectura | 15 |
| **Total** | **100** |

---

*Tiempo total estimado: 2 horas*
