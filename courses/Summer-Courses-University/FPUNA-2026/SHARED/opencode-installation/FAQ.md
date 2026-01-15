# Preguntas Frecuentes (FAQ) - OpenCode

## Respuestas a las Preguntas Más Comunes sobre OpenCode

Esta sección responde las preguntas que los estudiantes de FPUNA hacen con más frecuencia sobre OpenCode.

---

## Tabla de Contenidos

- [Conceptos Básicos](#conceptos-básicos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso y Funcionalidad](#uso-y-funcionalidad)
- [Costos y Límites](#costos-y-límites)
- [Privacidad y Seguridad](#privacidad-y-seguridad)
- [Comparaciones](#comparaciones)
- [Resolución de Problemas](#resolución-de-problemas)
- [Educación y Aprendizaje](#educación-y-aprendizaje)

---

## Conceptos Básicos

### ¿Qué es OpenCode exactamente?

**OpenCode** (también conocido como Claude Code) es una herramienta de línea de comandos (CLI) que te permite interactuar con Claude AI directamente desde tu terminal. Es como tener un asistente de programación experto disponible 24/7 que puede:

- Escribir código en cualquier lenguaje
- Explicar conceptos técnicos
- Depurar errores
- Generar documentación
- Automatizar tareas repetitivas

**Analogía simple**: Es como ChatGPT pero especializado para programación y ejecutándose en tu terminal.

---

### ¿Cuál es la diferencia entre OpenCode y ChatGPT?

| Característica | OpenCode (Claude) | ChatGPT |
|----------------|-------------------|---------|
| **Enfoque** | Desarrollo de software | General |
| **Interfaz** | Línea de comandos | Navegador web |
| **Integración** | Directa con tu código | Copiar/pegar |
| **Contexto de Proyecto** | Entiende tu estructura | Conversación aislada |
| **Edición de Archivos** | Directa | Manual |
| **Precio** | Por uso (API) | Suscripción mensual |

**Resumen**: OpenCode está diseñado específicamente para desarrolladores y se integra con tu flujo de trabajo.

---

### ¿Necesito saber programar para usar OpenCode?

**No necesariamente**, pero ayuda. OpenCode es útil para:

**Principiantes**:
- Aprender conceptos de programación
- Generar código de ejemplo
- Entender errores
- Crear proyectos sencillos

**Intermedios/Avanzados**:
- Acelerar desarrollo
- Refactorizar código
- Implementar patrones complejos
- Automatizar tareas

**Para este curso (FPUNA)**: No se requiere experiencia previa. Te enseñaremos paso a paso.

---

### ¿OpenCode reemplaza a los programadores?

**No**. OpenCode es una **herramienta de asistencia**, no un reemplazo.

**Lo que SÍ hace**:
- ✅ Acelera tareas repetitivas
- ✅ Genera código boilerplate
- ✅ Ayuda con sintaxis
- ✅ Sugiere soluciones

**Lo que NO hace**:
- ❌ Comprender requisitos del negocio
- ❌ Tomar decisiones de arquitectura complejas
- ❌ Gestionar proyectos
- ❌ Comunicarse con clientes

**Analogía**: Es como una calculadora para matemáticos. Los ayuda, pero no los reemplaza.

---

## Instalación y Configuración

### ¿Qué necesito instalar antes de OpenCode?

**Requisitos mínimos**:

1. **Node.js** (versión 18 o superior)
   - Descarga: https://nodejs.org/
   - Incluye npm automáticamente

2. **Terminal/Consola**:
   - Windows: PowerShell o CMD
   - macOS: Terminal (preinstalado)
   - Linux: Terminal (preinstalado)

3. **API Key de Anthropic** (gratuita para empezar)
   - Obtener en: https://console.anthropic.com/

**Opcionales pero recomendados**:
- Git (para control de versiones)
- Visual Studio Code (editor de código)

---

### ¿Cuánto espacio en disco necesito?

**OpenCode**: ~100 MB  
**Node.js**: ~300 MB  
**VS Code** (opcional): ~200 MB

**Total**: Aproximadamente **600 MB** (menos de un episodio de serie en HD)

---

### ¿Funciona en mi computadora vieja?

**Requisitos mínimos**:
- **RAM**: 4 GB (8 GB recomendado)
- **Procesador**: Dual-core 2.0 GHz (cualquier CPU de los últimos 7 años)
- **Disco**: 500 MB libres
- **Internet**: Conexión estable (mínimo 5 Mbps)

**Si tu computadora puede navegar en internet y abrir documentos, probablemente puede ejecutar OpenCode.**

---

### ¿Puedo instalar OpenCode sin permisos de administrador?

**Depende**:

- **Windows**: Generalmente necesitas admin para instalar Node.js
- **macOS/Linux**: Puedes usar instalación local con NVM (sin admin)

**Alternativa para estudiantes sin admin**:
1. Usa Replit (https://replit.com/) - Ambiente en la nube
2. Usa GitHub Codespaces - Gratis para estudiantes
3. Contacta a IT de FPUNA para instalación asistida

---

### Mi antivirus bloqueó la instalación. ¿Es seguro?

**Sí, es seguro**. Los antivirus a veces bloquean software nuevo por precaución.

**Solución**:

1. **Verifica que descargaste de fuentes oficiales**:
   - Node.js: https://nodejs.org/
   - OpenCode: `npm install` desde npmjs.org

2. **Agrega excepciones temporales**:
   - Windows Defender: Permitir `npm.exe` y `node.exe`

3. **Alternativa**: Descarga en computadora de FPUNA con permisos

**Confirmación de seguridad**:
- OpenCode es código abierto (puedes ver el código)
- Desarrollado por Anthropic (empresa legítima)
- Usado por millones de desarrolladores

---

## Uso y Funcionalidad

### ¿Cómo uso OpenCode por primera vez?

**Pasos básicos**:

```bash
# 1. Verificar instalación
claude --version

# 2. Comando simple
claude "Hola, ¿puedes ayudarme?"

# 3. Generar código
claude "Crea una función en JavaScript que sume dos números"

# 4. Crear proyecto
claude "Crea una calculadora simple en Node.js"
```

**Tu primer proyecto completo**: Ver [Módulo 01 - AI Stack Setup](../../00-CORE-FOUNDATION/modules/01-ai-stack-setup/README.md)

---

### ¿OpenCode funciona sin conexión a internet?

**No**. OpenCode requiere internet porque:

1. Se comunica con servidores de Claude AI en la nube
2. El modelo de IA está en servidores remotos (demasiado grande para tu PC)
3. Actualizaciones y mejoras son continuas

**Alternativas offline limitadas**:
- GitHub Copilot (requiere internet inicialmente)
- Snippets de código guardados
- Documentación descargada

**Recomendación**: Si tienes internet intermitente, prepara tus preguntas y ejecútalas cuando tengas conexión.

---

### ¿En qué lenguajes de programación funciona?

OpenCode soporta **más de 100 lenguajes**, incluyendo:

**Los más populares**:
- JavaScript / TypeScript
- Python
- Java
- C / C++ / C#
- Go
- Rust
- PHP
- Ruby
- Swift
- Kotlin

**Otros**:
- HTML/CSS
- SQL
- Bash/Shell
- R
- MATLAB
- Haskell
- Elixir
- ¡Y muchos más!

**Respuesta corta**: Si existe como lenguaje de programación, OpenCode probablemente lo entiende.

---

### ¿Puede OpenCode crear aplicaciones web completas?

**Sí**, pero con consideraciones:

**Lo que puede hacer**:
```bash
# Crear frontend
claude "Crea una página web con HTML, CSS y JavaScript para una calculadora"

# Crear backend
claude "Crea un servidor Node.js con Express para una API REST"

# Crear base de datos
claude "Crea esquema de base de datos PostgreSQL para un blog"
```

**Limitaciones**:
- Para apps muy grandes, es mejor dividir en partes
- Necesitas entender cómo conectar los componentes
- Deployment y hosting los haces tú

**Mejor enfoque**: Usa OpenCode para generar componentes y tú los integras.

---

### ¿OpenCode puede ayudarme con mi tarea de la universidad?

**Sí, pero úsalo correctamente**:

**USO CORRECTO** ✅:
- Entender conceptos que no comprendes
- Verificar si tu solución es correcta
- Aprender diferentes enfoques
- Depurar errores en tu código

**USO INCORRECTO** ❌:
- Copiar código sin entenderlo
- Entregarlas directamente sin modificar
- No aprender el concepto detrás

**Regla de FPUNA**: 
> "Usa OpenCode como tutor, no como reemplazo. Debes entender cada línea de código que entregas."

**Analogía**: Es como usar una calculadora en matemáticas. Está bien usarla, pero debes entender el concepto.

---

## Costos y Límites

### ¿Cuánto cuesta usar OpenCode?

**Instalación de OpenCode**: **GRATIS**

**API de Claude** (lo que pagas):

| Modelo | Precio por millón de tokens |
|--------|------------------------------|
| Claude 3.5 Sonnet (recomendado) | ~$3 USD entrada / ~$15 USD salida |
| Claude 3 Haiku (económico) | ~$0.25 USD entrada / ~$1.25 USD salida |

**¿Qué significa esto en la práctica?**

**Ejemplo de uso típico de estudiante**:
- 20 peticiones por día
- Promedio 500 tokens por petición
- **Costo mensual**: ~$5-10 USD

**Para referencia**:
- 1 token ≈ 4 caracteres en español
- Una respuesta típica ≈ 500-1000 tokens
- Pregunta simple ≈ 50-100 tokens

**Anthropic ofrece**:
- $5 USD en créditos gratis al registrarte
- Planes para estudiantes (consulta en console.anthropic.com)

---

### ¿Hay una versión gratuita permanente?

**No hay versión completamente gratuita** para uso ilimitado, pero:

**Opciones para estudiantes con presupuesto limitado**:

1. **Créditos iniciales gratis** ($5 USD al registrarte)
2. **GitHub Student Developer Pack**:
   - Créditos gratis en varios servicios de IA
   - Solicita en: https://education.github.com/pack

3. **Alternativas gratuitas**:
   - GitHub Copilot (gratis para estudiantes verificados)
   - Cursor (tiene plan gratuito limitado)
   - Tabnine (tiene versión gratuita)

4. **Uso eficiente**:
   - Usa modelo Haiku (más económico)
   - Haz preguntas específicas
   - Agrupa varias consultas

---

### ¿Cómo controlo cuánto gasto?

**En la Consola de Anthropic**:

1. Ve a https://console.anthropic.com/
2. Sección "Usage" para ver consumo
3. Configurar límites de gasto:
   - "Settings" → "Billing" → "Set monthly limit"

**Ejemplo de límite conservador para estudiante**:
```
Monthly limit: $10 USD
Warning at: $7 USD
```

**Monitorear uso**:
```bash
# En tu código (opcional)
# Revisar consumo antes de peticiones grandes
```

**Tips para ahorrar**:
- Usa comandos específicos (menos tokens)
- Evita generar archivos enormes de una vez
- Usa caché cuando sea posible
- Elige modelo Haiku para tareas simples

---

### ¿Qué pasa si me quedo sin créditos?

**OpenCode deja de funcionar** hasta que agregues más créditos.

**No te preocupes**:
- No hay cargos ocultos
- No se cobra automáticamente sin tu permiso
- Recibes advertencias antes de llegar al límite

**Si te quedas sin créditos**:
1. Agrega más créditos en console.anthropic.com
2. Usa alternativas temporales (GitHub Copilot)
3. Pide apoyo a FPUNA (tenemos créditos para estudiantes destacados)

---

## Privacidad y Seguridad

### ¿OpenCode ve mi código privado?

**Sí**, cuando usas OpenCode con tu código:

1. **El código se envía a servidores de Anthropic** para procesamiento
2. **Claude lo analiza** para darte respuestas
3. **NO se entrena con tu código** (política de Anthropic)

**Política de privacidad de Anthropic**:
- No usan datos de API para entrenar modelos
- Retienen datos 30 días para seguridad
- Después de 30 días, se eliminan
- Ver política completa: https://www.anthropic.com/legal/privacy

**Recomendación**:
- ✅ Está bien para proyectos personales y académicos
- ✅ Está bien para código open source
- ❌ NO uses con código propietario de empresas sin permiso
- ❌ NO incluyas contraseñas, API keys en el código que compartes

---

### ¿Es seguro poner mi API key en variables de entorno?

**Sí**, es la práctica recomendada, pero:

**HACER** ✅:
- Guardar en variables de entorno
- Usar archivos `.env` (y agregar a `.gitignore`)
- NO compartir tu API key con nadie
- Regenerar si se filtra accidentalmente

**NO HACER** ❌:
- Poner API key directamente en código
- Subir API key a GitHub
- Compartir screenshots con la API key visible
- Usar la misma API key en múltiples proyectos compartidos

**Si tu API key se filtra**:
1. Ve a console.anthropic.com
2. "API Keys" → Revoca la clave comprometida
3. Genera una nueva
4. Actualiza tu configuración

---

### ¿OpenCode puede hackear o romper mi computadora?

**No**, OpenCode no puede:

- Instalar virus
- Acceder a archivos sin tu permiso
- Modificar configuración del sistema
- Robar información

**Lo que SÍ hace**:
- Crea/edita archivos en las carpetas donde lo ejecutas
- Usa internet para comunicarse con Anthropic
- Ejecuta código que tú le pides ejecutar

**Precaución básica**:
- Revisa el código que genera antes de ejecutarlo
- No ejecutes comandos que no entiendes (especialmente con `sudo`)
- Usa en carpetas de proyecto, no en carpetas del sistema

**Es tan seguro como cualquier otra herramienta de desarrollo.**

---

## Comparaciones

### OpenCode vs GitHub Copilot - ¿Cuál es mejor?

**Son diferentes**:

| Característica | OpenCode | GitHub Copilot |
|----------------|----------|----------------|
| **Interfaz** | Línea de comandos | Integración en editor |
| **Uso** | Conversacional | Autocompletado inline |
| **Costo** | Pay-per-use | Suscripción mensual ($10/mes) |
| **Contexto** | Proyecto completo | Archivo actual |
| **Mejor para** | Generar proyectos, explicaciones | Escribir código línea a línea |
| **Gratis para estudiantes** | No (créditos limitados) | ¡Sí! |

**Recomendación**: Usa ambos. Son complementarios.

**Workflow ideal**:
1. OpenCode: Genera estructura del proyecto
2. Copilot: Ayuda a escribir funciones específicas
3. OpenCode: Depura errores y refactoriza

---

### OpenCode vs ChatGPT para programación

| Aspecto | OpenCode | ChatGPT (web) |
|---------|----------|---------------|
| **Integración** | Directa con terminal | Copiar/pegar manual |
| **Edición de archivos** | Automática | Manual |
| **Contexto del proyecto** | Completo | Limitado |
| **Especialización** | Código | General |
| **Costo** | API (pay-as-you-go) | $20/mes (Plus) o gratis |
| **Velocidad** | Muy rápido | Depende del plan |

**Cuándo usar cada uno**:
- **OpenCode**: Proyectos reales, desarrollo activo
- **ChatGPT**: Aprender conceptos, discutir arquitectura

---

## Resolución de Problemas

### No puedo instalar OpenCode. ¿Qué hago?

**Consulta la guía específica**:
- 📘 [Guía de Solución de Problemas Completa](./troubleshooting.md)

**Checklist rápido**:
1. ¿Node.js instalado? (`node --version`)
2. ¿npm funciona? (`npm --version`)
3. ¿Tienes permisos? (admin en Windows, sudo en Linux)
4. ¿Firewall bloqueando? (desactiva temporalmente)
5. ¿Internet funcional? (`ping google.com`)

**Si nada funciona**: Contacta soporte-ia@fpuna.edu.py con:
- Sistema operativo y versión
- Mensajes de error completos
- Comandos que ejecutaste

---

### OpenCode da respuestas raras o incorrectas

**Esto puede pasar**. Claude es muy bueno, pero no es perfecto.

**Causas comunes**:
1. **Pregunta ambigua**: Sé más específico
2. **Contexto insuficiente**: Da más detalles
3. **Limitaciones del modelo**: No sabe todo

**Cómo mejorar respuestas**:

**Mal** ❌:
```bash
claude "Crea una app"
```

**Bien** ✅:
```bash
claude "Crea una aplicación web con Node.js y Express que tenga:
- Un endpoint GET /usuarios que devuelva lista de usuarios
- Usuarios guardados en un array en memoria
- Puerto 3000
- Manejo de errores básico"
```

**Siempre**:
- Revisa el código generado
- Prueba antes de usar en producción
- Aprende de las respuestas para mejorar tus preguntas

---

## Educación y Aprendizaje

### ¿Cómo aprendo a usar OpenCode efectivamente?

**En este curso (FPUNA)**:

**Semana 1** - Fundamentos:
- Instalación y configuración
- Primeros comandos
- Ingeniería de prompts
- Patrones de trabajo

**Semana 2** - Especialización:
- Uso en tu disciplina específica
- Proyecto práctico
- Casos de uso avanzados

**Práctica recomendada**:
- Usa OpenCode para todos tus proyectos de clase
- Experimenta con diferentes tipos de preguntas
- Comparte soluciones con compañeros
- Documenta lo que aprendes

---

### ¿Hay certificación oficial de OpenCode?

**No hay certificación oficial de Anthropic**, pero:

**Al completar este curso FPUNA obtienes**:
- Certificado de "AI-Augmented Development"
- Badge de LinkedIn
- Proyecto de portafolio
- Reconocimiento de FPUNA

**Habilidades que puedes listar en CV**:
- "Prompt Engineering"
- "AI-Assisted Development"
- "Claude AI / OpenCode"
- "Desarrollo Aumentado por IA"

---

### ¿Usar OpenCode me hace mal programador?

**No, si lo usas correctamente**.

**Analogía con calculadoras**:
- Usar calculadora en física ≠ malo
- Usar calculadora sin entender matemáticas = problema

**Lo mismo con OpenCode**:
- Usar OpenCode para acelerar ✅
- Usar OpenCode sin entender código ❌

**Cómo usarlo bien**:
1. **Intenta primero** sin IA
2. **Usa OpenCode** cuando te atasques
3. **Estudia** el código que genera
4. **Modifícalo** para entenderlo mejor
5. **Aplica** lo aprendido en siguiente problema

**Resultado**: Aprendes MÁS RÁPIDO, no menos.

---

### ¿Qué habilidades necesito desarrollar además de usar OpenCode?

**OpenCode no te enseña**:

1. **Pensamiento Algorítmico**: Resolver problemas lógicamente
2. **Diseño de Software**: Arquitectura y patrones
3. **Trabajo en Equipo**: Colaboración y comunicación
4. **Gestión de Proyectos**: Planificación y deadlines
5. **Comprensión del Negocio**: Entender qué resolver

**Recomendación**:
- Usa OpenCode como **herramienta**
- Desarrolla tus **habilidades fundamentales**
- Combina ambos para ser **desarrollador completo**

---

## Preguntas Específicas de FPUNA

### ¿Hay soporte en español?

**Sí**, Claude entiende español perfectamente.

**Puedes**:
- Hacer preguntas en español
- Pedir código comentado en español
- Generar documentación en español

**Ejemplo**:
```bash
claude "Crea una función en Python que calcule el área de un círculo. Comenta el código en español y usa nombres de variables en español."
```

**Este curso completo está en español** con ejemplos paraguayos.

---

### ¿Podemos usar OpenCode en exámenes?

**Depende del profesor**, pero generalmente:

**Exámenes**: ❌ No permitido (es trampa)  
**Tareas**: ✅ Permitido (con citas adecuadas)  
**Proyectos**: ✅ Permitido (con documentación)  
**Práctica**: ✅ Totalmente permitido

**Regla general de FPUNA**:
> "Si el objetivo es aprender el proceso, no uses IA. Si el objetivo es el resultado, puedes usar IA como herramienta."

**Siempre consulta con tu profesor antes**.

---

### ¿FPUNA tiene licencias o créditos para estudiantes?

**Sí**, para estudiantes del programa Summer 2026:

- Pool de créditos compartidos para práctica en clase
- Créditos individuales para estudiantes destacados
- Acceso a computadoras con OpenCode pre-instalado

**Para solicitar créditos**:
- Email: creditos-ia@fpuna.edu.py
- Formulario: [En Moodle del curso]

**Requisitos**:
- Estar inscrito en curso
- Haber completado módulos básicos
- Demostrar necesidad educativa

---

## Recursos Adicionales

### ¿Dónde puedo aprender más?

**Documentación Oficial**:
- https://docs.anthropic.com/
- https://www.anthropic.com/claude

**Comunidad**:
- Discord de Anthropic
- Reddit r/ClaudeAI
- Stack Overflow (tag: claude-ai)

**Cursos FPUNA**:
- Módulo 03: [Ingeniería de Prompts](../../00-CORE-FOUNDATION/modules/03-prompt-engineering/README.md)
- Módulo 06: [Patrones de Trabajo](../../00-CORE-FOUNDATION/modules/06-workflow-patterns/README.md)

**YouTube** (canales recomendados):
- "AI Coding Tutorials"
- "Anthropic Official"

---

### ¿Cómo me mantengo actualizado?

OpenCode se actualiza frecuentemente. Para estar al día:

**Fuentes oficiales**:
- Blog de Anthropic: https://www.anthropic.com/news
- Twitter: @AnthropicAI
- Changelog: https://github.com/anthropics/claude-code/releases

**Comunidad FPUNA**:
- Canal Slack: #fpuna-opencode-novedades
- Email semanal con actualizaciones

**Actualizar OpenCode**:
```bash
npm update -g @anthropic-ai/claude-code
```

---

## Contacto y Soporte

### ¿Cómo obtengo ayuda?

**Para estudiantes de FPUNA**:

📧 **Email**: soporte-ia@fpuna.edu.py  
💬 **Slack**: #fpuna-opencode-ayuda  
👨‍🏫 **Horas de oficina**: Mar/Jue 14:00-16:00 (Sala 203)  
📝 **Tickets**: https://fpuna.edu.py/soporte-ia

**Respuesta típica**: 24-48 horas

**Para problemas urgentes**:
- Compañeros de clase (Slack)
- Tutores estudiantiles (disponibilidad en Moodle)

---

### ¿Puedo contribuir a mejorar este FAQ?

**¡Sí, por favor!**

Si encontraste:
- Respuesta que no está aquí
- Error en la información
- Forma más clara de explicar algo

**Comparte**:
- Email a instructores-ia@fpuna.edu.py
- Pull request en GitHub del curso
- Mensaje en Slack #fpuna-contribuciones

**Tu nombre aparecerá en los créditos** si tu contribución es incluida.

---

**¿No encontraste tu pregunta?**

📧 Envíala a: faq-opencode@fpuna.edu.py  
Responderemos y agregaremos a este FAQ para ayudar a futuros estudiantes.

---

**Última actualización**: Enero 2026  
**Versión**: 1.0  
**Contribuciones**: 0

---

*Este FAQ es un documento vivo. Se actualiza constantemente basándose en las preguntas reales de estudiantes de FPUNA.*
