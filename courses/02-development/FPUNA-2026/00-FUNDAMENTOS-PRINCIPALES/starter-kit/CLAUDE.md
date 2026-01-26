# CLAUDE.md - Instrucciones para IA

## Copia este archivo a la raíz de tu proyecto como `CLAUDE.md`

Este archivo le dice a Claude Code cómo trabajar con tu proyecto.

---

# Proyecto: [NOMBRE DE TU PROYECTO]

## Descripción
[Describe brevemente qué hace tu proyecto]

## Stack Tecnológico
- **Lenguaje principal:** [Python/JavaScript/TypeScript/etc.]
- **Framework:** [Si aplica]
- **Base de datos:** [Si aplica]
- **Otras tecnologías:** [Lista]

## Estructura del Proyecto
```
proyecto/
├── src/                    # Código fuente
├── tests/                  # Tests
├── docs/                   # Documentación
├── config/                 # Configuración
└── README.md
```

## Convenciones de Código

### Estilo
- Usar [estilo de código: PEP8, StandardJS, etc.]
- Nombres de variables en [español/inglés]
- Comentarios en [español/inglés]

### Commits
- Usar commits convencionales: `tipo(scope): mensaje`
- Tipos: feat, fix, docs, style, refactor, test, chore

### Branches
- main: producción
- develop: desarrollo
- feature/*: nuevas funcionalidades
- fix/*: correcciones

## Comandos Frecuentes

```bash
# Instalar dependencias
[comando de instalación]

# Ejecutar en desarrollo
[comando de desarrollo]

# Ejecutar tests
[comando de tests]

# Build para producción
[comando de build]
```

## Reglas para la IA

### HACER:
- Seguir las convenciones de código establecidas
- Escribir tests para código nuevo
- Documentar funciones y clases
- Usar tipos cuando sea posible
- Mantener archivos pequeños y enfocados

### NO HACER:
- No modificar archivos de configuración sin preguntar
- No instalar dependencias sin explicar por qué
- No eliminar código sin confirmación
- No hacer commits sin revisar los cambios
- No exponer credenciales o datos sensibles

## Contexto del Proyecto

### Objetivo Principal
[¿Qué problema resuelve este proyecto?]

### Usuarios Objetivo
[¿Quién usará este proyecto?]

### Funcionalidades Clave
1. [Funcionalidad 1]
2. [Funcionalidad 2]
3. [Funcionalidad 3]

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `src/main.py` | Punto de entrada |
| `config/settings.py` | Configuración |
| `.env` | Variables de entorno (NO commitear) |

## Dependencias Externas

### APIs
- [API 1]: [propósito]
- [API 2]: [propósito]

### Servicios
- [Servicio 1]: [propósito]

## Notas Adicionales

[Cualquier información relevante que la IA deba conocer]

---

## Cómo Usar Este Archivo

1. Copia este archivo a la raíz de tu proyecto
2. Renómbralo a `CLAUDE.md`
3. Completa las secciones con información de tu proyecto
4. Claude Code leerá este archivo automáticamente

## Ejemplo de Uso con Claude

```bash
# Claude ya conoce tu proyecto
claude "agrega una función para calcular el promedio de una lista"

# Claude seguirá tus convenciones
claude "refactoriza el módulo de usuarios"

# Claude respetará tus reglas
claude "optimiza el rendimiento de las consultas"
```

---

*Plantilla CLAUDE.md - FPUNA 2026*
