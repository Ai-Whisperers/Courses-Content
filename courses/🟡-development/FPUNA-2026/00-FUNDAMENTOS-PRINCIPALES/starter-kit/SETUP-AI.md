# SETUP-AI.md - Comandos para que la IA Configure tu Proyecto

## Instrucciones de Uso

Copia y pega estos prompts en Claude Code para configurar automáticamente tu proyecto.

---

## 1. Configuración Inicial del Proyecto

### Prompt para Crear Estructura Básica

```
Crea la estructura básica de un proyecto con las siguientes carpetas y archivos:

Estructura:
- src/ (código fuente)
- tests/ (tests unitarios)
- docs/ (documentación)
- config/ (configuración)
- .gitignore (ignorar node_modules, __pycache__, .env, etc.)
- README.md (descripción del proyecto)
- CLAUDE.md (instrucciones para IA)

Lenguaje: [Python/JavaScript/TypeScript]
Nombre del proyecto: [NOMBRE]
Descripción: [DESCRIPCIÓN BREVE]
```

---

## 2. Configuración de Entorno de Desarrollo

### Para Proyectos Python

```
Configura un entorno de desarrollo Python para este proyecto:

1. Crea un archivo requirements.txt con dependencias comunes:
   - pytest (testing)
   - black (formateo)
   - flake8 (linting)
   - python-dotenv (variables de entorno)

2. Crea un archivo .env.example con variables de ejemplo

3. Crea un script setup.py o pyproject.toml básico

4. Agrega comandos útiles al README

5. Configura un archivo pytest.ini básico
```

### Para Proyectos JavaScript/Node.js

```
Configura un entorno de desarrollo Node.js para este proyecto:

1. Inicializa package.json con scripts útiles:
   - start: ejecutar aplicación
   - dev: modo desarrollo
   - test: ejecutar tests
   - lint: verificar código

2. Instala dependencias de desarrollo:
   - jest (testing)
   - eslint (linting)
   - prettier (formateo)
   - dotenv (variables de entorno)

3. Crea archivos de configuración:
   - .eslintrc.js
   - .prettierrc
   - jest.config.js

4. Crea .env.example con variables de ejemplo
```

---

## 3. Configuración de Git

### Prompt para Inicializar Git

```
Configura Git para este proyecto:

1. Inicializa el repositorio si no existe
2. Crea un .gitignore apropiado para [Python/Node.js/etc.]
3. Crea el primer commit con el mensaje "chore: initial project setup"
4. Muéstrame los comandos para conectar con GitHub:
   - Crear repo en GitHub
   - Agregar remote
   - Push inicial
```

---

## 4. Configuración de Testing

### Prompt para Configurar Tests

```
Configura el entorno de testing para este proyecto:

1. Crea la carpeta tests/ con estructura apropiada
2. Crea un archivo de test de ejemplo que:
   - Importe el módulo principal
   - Tenga al menos 2 tests de ejemplo
   - Muestre buenas prácticas de testing

3. Configura el runner de tests
4. Agrega script de coverage si es posible
5. Crea un test que siempre pase para verificar la configuración
```

---

## 5. Configuración de Documentación

### Prompt para Configurar Docs

```
Configura documentación para este proyecto:

1. Crea docs/README.md con índice de documentación
2. Crea docs/INSTALLATION.md con instrucciones de instalación
3. Crea docs/USAGE.md con ejemplos de uso
4. Crea docs/API.md (si aplica) con documentación de API
5. Agrega badges al README principal:
   - Status del proyecto
   - Versión
   - Licencia
```

---

## 6. Configuración de CI/CD (Opcional)

### Prompt para GitHub Actions

```
Crea un workflow de GitHub Actions para este proyecto:

Nombre: CI Pipeline

Triggers:
- Push a main/develop
- Pull requests

Jobs:
1. Lint: verificar estilo de código
2. Test: ejecutar tests unitarios
3. Build: verificar que el proyecto compila (si aplica)

Usa la versión de [Python 3.11 / Node.js 18]
```

---

## 7. Configuración de Docker (Opcional)

### Prompt para Dockerizar

```
Crea configuración Docker para este proyecto:

1. Dockerfile con:
   - Imagen base apropiada
   - Instalación de dependencias
   - Copia de código
   - Comando de inicio

2. docker-compose.yml con:
   - Servicio principal
   - Volúmenes para desarrollo
   - Variables de entorno

3. .dockerignore apropiado

4. Instrucciones en README para usar Docker
```

---

## 8. Verificación de Configuración

### Prompt para Verificar Todo

```
Verifica que el proyecto está correctamente configurado:

1. Lista todos los archivos de configuración presentes
2. Verifica que las dependencias se pueden instalar
3. Ejecuta los tests y reporta resultados
4. Verifica que el linting pasa
5. Lista cualquier problema o configuración faltante
6. Sugiere mejoras si las hay
```

---

## 9. Prompts de Mantenimiento

### Actualizar Dependencias

```
Revisa las dependencias de este proyecto:

1. Lista las dependencias actuales
2. Verifica si hay actualizaciones disponibles
3. Identifica dependencias con vulnerabilidades conocidas
4. Sugiere qué actualizar y por qué
5. NO actualices automáticamente, solo reporta
```

### Limpiar Proyecto

```
Limpia este proyecto:

1. Elimina archivos temporales y cache
2. Elimina dependencias no utilizadas
3. Identifica código muerto o sin usar
4. Lista archivos que podrían eliminarse
5. NO elimines nada sin mi confirmación
```

---

## 10. Prompt Maestro de Setup

### Setup Completo en Un Paso

```
Configura completamente este proyecto desde cero:

Tipo: [web app / API / CLI / librería / script]
Lenguaje: [Python / JavaScript / TypeScript]
Nombre: [NOMBRE]
Descripción: [DESCRIPCIÓN]

Incluye:
1. Estructura de carpetas estándar
2. Configuración de linting y formateo
3. Setup de testing
4. .gitignore apropiado
5. README.md completo
6. CLAUDE.md con instrucciones para IA
7. Documentación básica
8. Scripts de desarrollo

Sigue las mejores prácticas de la industria.
Usa convenciones de [español/inglés] para nombres.
```

---

## Notas Importantes

1. **Personaliza los prompts** reemplazando los valores entre corchetes `[...]`
2. **Revisa los cambios** antes de confirmarlos
3. **No compartas credenciales** en los prompts
4. **Guarda los prompts útiles** para reutilizarlos

---

*SETUP-AI.md - FPUNA 2026*
