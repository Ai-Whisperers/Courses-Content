# Política de Seguridad

## Versiones Soportadas

| Versión | Soportada |
| ------- | --------- |
| main    | :white_check_mark: |
| < 1.0   | :x: |

## Reportar una Vulnerabilidad

Agradecemos los reportes de seguridad responsables. Si descubres una vulnerabilidad de seguridad en este repositorio, por favor repórtala de manera responsable.

### Cómo Reportar

1. **NO** abras un issue público para vulnerabilidades de seguridad
2. Envía un email a: **security@ai-whisperers.org**
3. O usa [GitHub Security Advisories](https://github.com/Ai-Whisperers/Courses-Content/security/advisories/new)

### Qué Incluir en tu Reporte

- Descripción de la vulnerabilidad
- Pasos para reproducir el problema
- Impacto potencial
- Sugerencias de remediación (si las tienes)

### Qué Esperar

- **Confirmación**: Recibirás una confirmación dentro de 48 horas
- **Evaluación**: Evaluaremos la vulnerabilidad dentro de 7 días
- **Resolución**: Trabajaremos en una solución y te mantendremos informado
- **Reconocimiento**: Con tu permiso, te reconoceremos en nuestro CHANGELOG

## Alcance

Esta política aplica a:

- Código fuente en este repositorio
- Ejemplos de código en materiales del curso
- Scripts de automatización y herramientas
- Configuraciones y archivos de infraestructura

### Fuera de Alcance

- Vulnerabilidades en dependencias de terceros (reportar al proyecto correspondiente)
- Contenido educativo que demuestra vulnerabilidades intencionalmente (claramente marcado como tal)
- Problemas de estilo de código o mejores prácticas que no representan riesgo de seguridad

## Mejores Prácticas de Seguridad

### Para Contribuidores

1. **Nunca commitear secretos**: No incluir API keys, contraseñas, o tokens en el código
2. **Usar `.env.example`**: Proporcionar plantillas sin valores reales
3. **Validar inputs**: En ejemplos de código que manejan entrada de usuario
4. **Dependencias seguras**: Mantener dependencias actualizadas

### Para Estudiantes

1. **No usar código de ejemplo en producción** sin revisión de seguridad
2. **Cambiar credenciales de ejemplo** antes de usar en proyectos reales
3. **Revisar imports**: Verificar que las dependencias sean de fuentes confiables

## Historial de Seguridad

| Fecha | Descripción | Estado |
|-------|-------------|--------|
| 2026-01 | Repositorio creado con políticas de seguridad | Activo |

---

Gracias por ayudar a mantener seguro este proyecto educativo.
