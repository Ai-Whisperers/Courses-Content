# Proyecto Final: Mi Primera Aplicación con IA
## Track 00 - Fundamentos Principales

**Duración**: 4-6 horas extra-clase
**Peso**: 100% de calificación de Fundamentos (requisito para tracks especializados)

---

## Descripción

Construir una aplicación web simple utilizando asistencia de IA, demostrando dominio de configuración, ingeniería de prompts y patrones de flujo de trabajo aprendidos en el curso.

**Objetivo**: Demostrar que puedes usar herramientas de IA de manera efectiva y estás listo para los tracks especializados.

---

## Opciones de Proyecto

Elige **UNA** de las siguientes opciones:

### Opción A: Aplicación de Utilidad Personal
Ejemplos:
- Calculadora de presupuesto personal
- Lista de tareas con categorías
- Conversor de unidades (moneda, medidas, etc.)
- Generador de contraseñas seguras
- Temporizador Pomodoro

### Opción B: Página Informativa
Ejemplos:
- Portfolio personal simple
- Página de un negocio local ficticio
- Guía turística de tu ciudad/barrio
- Catálogo de productos (similar al demo)
- Blog personal con 3-5 artículos

### Opción C: Herramienta Interactiva
Ejemplos:
- Quiz de trivia (mínimo 10 preguntas)
- Juego simple (piedra-papel-tijera, adivinar número)
- Encuesta con resultados visuales
- Flashcards de estudio
- Buscador/filtro de datos

---

## Requisitos Técnicos

### Stack Obligatorio
✅ **HTML5** semántico
✅ **CSS3** (variables CSS, flexbox o grid)
✅ **JavaScript** vanilla (sin frameworks)
✅ **Sin dependencias externas** (no npm, no CDNs)

### Archivos Mínimos
```
mi-proyecto/
├── index.html
├── styles.css
├── app.js
├── CLAUDE.md          # Contexto del proyecto
└── PROMPTS-LOG.md     # Registro de prompts usados
```

### Funcionalidad Mínima
- ✅ Al menos **3 interacciones** con el usuario (clicks, inputs, etc.)
- ✅ **Responsive** (funciona en móvil y desktop)
- ✅ **Estado vacío** o mensaje cuando no hay datos
- ✅ **Sin errores** en consola del navegador

---

## Requisitos de Documentación

### 1. CLAUDE.md (Obligatorio)
Tu archivo de contexto debe incluir:
- Descripción del proyecto
- Stack tecnológico
- Estructura del proyecto
- Convenciones de código
- Reglas para la IA (DO/DO NOT)

**Usa la plantilla**: `_templates/CLAUDE-template.md`

### 2. PROMPTS-LOG.md (Obligatorio)
Registra **TODOS** los prompts que usaste:

```markdown
## Prompt 1: [Descripción breve]
**Objetivo**: [Qué querías lograr]

**Prompt usado**:
```
[Tu prompt exacto aquí]
```

**Resultado**: [Funcionó / Necesitó ajustes / Falló]

**Ajustes realizados**: [Si aplicable]
```

**Mínimo**: 6 prompts documentados (8+ para calificación "Bueno", 10+ para "Excelente")

### 3. README.md del Proyecto
- Qué hace tu aplicación
- Cómo abrirla (instrucciones)
- Capturas de pantalla (opcional pero recomendado)

---

## Criterios de Evaluación

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **CLAUDE.md** | 25% | Completo, sigue la plantilla, útil para la IA |
| **PROMPTS-LOG.md** | 25% | 6+ prompts, usa marco CERO, documenta iteraciones |
| **Funcionalidad** | 25% | La app funciona, sin errores, cumple requisitos |
| **Código** | 15% | Limpio, comentado, buenas prácticas |
| **Presentación** | 10% | README claro, proyecto organizado |

**Nota mínima para aprobar**: 70%

---

## Entregables

### 1. Repositorio GitHub
- Repositorio público o privado (compartir acceso si privado)
- Commits regulares (no un solo commit al final)
- Mínimo 5 commits con mensajes descriptivos

### 2. Archivos Requeridos
- [ ] `index.html` - Página principal
- [ ] `styles.css` - Estilos
- [ ] `app.js` - Lógica JavaScript
- [ ] `CLAUDE.md` - Contexto del proyecto
- [ ] `PROMPTS-LOG.md` - Registro de prompts
- [ ] `README.md` - Documentación del proyecto

### 3. Demostración
- La aplicación debe funcionar abriendo `index.html` en el navegador
- No debe requerir servidor ni instalación

---

## Timeline Sugerido

| Día | Actividad | Tiempo |
|-----|-----------|--------|
| **Día 1** | Elegir proyecto, crear CLAUDE.md, estructura inicial | 1-2 horas |
| **Día 2** | Generar HTML y CSS con IA | 1-2 horas |
| **Día 3** | Generar JavaScript, testing, ajustes | 1-2 horas |
| **Día 4** | Documentación final, PROMPTS-LOG, README | 1 hora |

**Deadline**: Antes de iniciar tu track especializado

---

## Rúbrica Detallada

Ver: [rubrica.md](./rubrica.md)

---

## Ejemplo de PROMPTS-LOG.md

```markdown
# Registro de Prompts - Mi Calculadora de Presupuesto

## Prompt 1: Estructura HTML
**Objetivo**: Crear la estructura base de la página

**Prompt usado**:
```
Crea el HTML para una calculadora de presupuesto personal con:
- Input para ingresos mensuales
- Sección para agregar gastos (nombre + monto)
- Lista de gastos agregados
- Resumen mostrando total gastado y saldo disponible

Usa HTML5 semántico con IDs descriptivos.
```

**Resultado**: Funcionó bien, estructura clara

**Ajustes**: Agregué un botón de "limpiar todo" manualmente

---

## Prompt 2: Estilos CSS
**Objetivo**: Diseño visual responsive

**Prompt usado**:
```
Crea CSS para la calculadora de presupuesto con:
- Variables CSS para colores (verde para positivo, rojo para negativo)
- Mobile-first, breakpoint en 768px
- Cards para cada sección
- Inputs y botones con hover states

Estilo: limpio y profesional, fondo claro.
```

**Resultado**: Necesitó ajustes en colores

**Ajustes**: Cambié el verde a un tono más oscuro (#2d5a27)

---

[... continuar con más prompts ...]
```

---

## FAQs

### ¿Puedo usar un proyecto que ya tenía?
**No**. Debe ser creado durante este curso usando las técnicas aprendidas.

### ¿Puedo copiar código del demo en vivo?
**No copiar directamente**. Puedes usar el demo como inspiración, pero tu proyecto debe ser diferente.

### ¿Qué pasa si un prompt no funciona?
¡Documéntalo! Mostrar iteración y solución de problemas es parte de la evaluación.

### ¿Puedo usar imágenes?
**Sí**, pero deben ser locales o placeholders. No CDNs externos.

### ¿Necesito hacer deploy?
**No**. Solo debe funcionar abriendo el HTML localmente.

### ¿Puedo pedir ayuda?
**Sí**, en el canal de Slack. Pero el código y documentación deben ser tuyos.

---

## Checklist Pre-Entrega

Antes de entregar, verifica:

- [ ] CLAUDE.md completo y útil
- [ ] PROMPTS-LOG.md con 6+ prompts documentados
- [ ] La app funciona sin errores en consola
- [ ] Responsive (probar en móvil)
- [ ] README.md explica qué hace y cómo usarla
- [ ] Mínimo 5 commits en GitHub
- [ ] Todos los archivos requeridos presentes

---

## Soporte

- **Slack**: #fpuna-fundamentos
- **Email**: fpuna-core@universidad.edu.py
- **Office Hours**: Día 2 del curso, última hora

---

## Próximos Pasos

1. ✅ Elegir una opción de proyecto
2. ✅ Crear repositorio en GitHub
3. ✅ Crear CLAUDE.md usando la plantilla
4. ✅ Comenzar a construir, documentando cada prompt
5. ✅ Probar, iterar, documentar ajustes
6. ✅ Entregar antes de iniciar track especializado

**¡Este proyecto es tu pasaporte a los tracks especializados! 🚀**

---

*Proyecto Final - Track 00 Fundamentos Principales - FPUNA 2026*
