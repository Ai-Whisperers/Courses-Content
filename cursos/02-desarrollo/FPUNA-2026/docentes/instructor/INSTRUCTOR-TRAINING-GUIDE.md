# 📚 Guía de Capacitación para Instructores
## FPUNA Verano 2026 - Programa de Desarrollo Aumentado con IA

---

## 🎯 Propósito de Este Documento

Esta guía prepara a los instructores de FPUNA para impartir el curso "Desarrollo Aumentado con IA" de manera efectiva, manteniendo los altos estándares de calidad y la metodología innovadora del programa.

**Audiencia**: Instructores principales, TAs, y facilitadores del curso  
**Duración de Capacitación**: 16 horas (2 días completos)  
**Fecha Recomendada**: 1-2 semanas antes del inicio del curso

---

## 📋 Tabla de Contenidos

1. [Visión General del Programa](#visión-general)
2. [Filosofía Pedagógica](#filosofía-pedagógica)
3. [Estructura del Curso](#estructura-del-curso)
4. [Preparación del Instructor](#preparación-del-instructor)
5. [Metodología de Enseñanza](#metodología-de-enseñanza)
6. [Manejo de Herramientas AI](#manejo-de-herramientas)
7. [Gestión del Aula](#gestión-del-aula)
8. [Evaluación y Retroalimentación](#evaluación)
9. [Troubleshooting Común](#troubleshooting)
10. [Recursos del Instructor](#recursos)

---

## 🎓 Visión General del Programa

### Estructura de 3 Semanas

**Semana 1: Core Foundation** (Universal - TODOS los estudiantes)
- 6 módulos fundamentales
- 24 horas presenciales
- Setup de herramientas AI
- Fundamentos de OpenCode/OMO

**Semana 2: Tracks Especializados** (Estudiantes eligen 1 de 6)
- Software Development
- Electronics/Automation
- Aeronautical Engineering
- Marketing/Communication
- Research/Academia
- Hospitality/Tourism

**Semana 3 (Opcional): Especializaciones**
- QA Automation
- Web Development

### Objetivo Principal

**Convertir a estudiantes en desarrolladores/profesionales aumentados por IA**, capaces de:
- Usar OpenCode/OMO profesionalmente
- Acelerar su trabajo 3-10x con IA
- Mantener calidad y estándares profesionales
- Aplicar AI en contexto paraguayo

---

## 🧠 Filosofía Pedagógica

### Principios Fundamentales

#### 1. **Learning by Doing** (80% práctica, 20% teoría)
```
❌ NO: "Hoy aprenderemos sobre prompts"
✅ SÍ: "Vamos a generar un test suite completo en los próximos 45 minutos"
```

**Implementación**:
- Cada módulo tiene ejercicios hands-on
- Estudiantes codean/diseñan mientras aprenden
- Proyectos reales desde el día 1

#### 2. **AI como Copiloto, No Piloto**
```
❌ NO: "Déjale todo a la IA"
✅ SÍ: "Tú diseñas, IA acelera"
```

**Implementación**:
- Estudiantes comprenden ANTES de generar
- Revisan y validan output de IA
- Aprenden cuándo usar (y cuándo NO usar) IA

#### 3. **Contexto Paraguay First**
```
❌ NO: Ejemplos genéricos de Silicon Valley
✅ SÍ: Itaipu, FPUNA, frigoríficos, empresas locales
```

**Implementación**:
- Todos los ejemplos usan contexto paraguayo
- Salarios en Guaraníes
- Proveedores locales mencionados
- Aplicaciones regionales

#### 4. **Accesibilidad Sin Sacrificar Rigor**
```
❌ NO: "Asumamos que sabes algoritmos avanzados"
✅ SÍ: "Empecemos desde los fundamentos, pero lleguemos a nivel profesional"
```

**Implementación**:
- Analogías accesibles (tuteo, ejemplos cotidianos)
- Progresión gradual de complejidad
- Pero meta final es producción profesional

---

## 📚 Estructura del Curso

### Semana 1: Core Foundation (CRÍTICO)

Esta semana establece las bases. **Si falla Semana 1, todo el programa falla.**

#### Módulo 01: Configuración del Stack de IA (4 horas)
**Objetivo**: Todos tienen OpenCode funcionando

**Actividades del Instructor**:
- [ ] Demo en vivo de instalación (screencast)
- [ ] Troubleshooting en tiempo real
- [ ] Verificación uno por uno que funciona
- [ ] NO avanzar hasta que TODOS tengan OpenCode corriendo

**Puntos Críticos**:
- Windows vs Mac vs Linux (preparar 3 demos)
- Permisos de administrador (coordinare con IT)
- Firewall/antivirus (común en laptops empresariales)

**Tiempo Real**: 5-6 horas (siempre toma más del plan)

---

#### Módulo 02: Maestría en Configuración (4 horas)
**Objetivo**: Estudiantes configuran MCPs, Skills, Hooks, Rules

**Actividades del Instructor**:
- [ ] Explicar cada componente con analogía
- [ ] Demo de configuración FPUNA específica
- [ ] Ejercicio guiado: configurar proyecto
- [ ] Verificar archivos `.opencode`, `CLAUDE.md` de cada estudiante

**Puntos Críticos**:
- JSON syntax errors (común)
- Paths relativos vs absolutos
- Nombres de archivos case-sensitive

---

#### Módulo 03: Ingeniería de Prompts (4 horas)
**Objetivo**: Escribir prompts efectivos 80%+ del tiempo

**Actividades del Instructor**:
- [ ] Mostrar prompts malos → buenos (live refactoring)
- [ ] Ejercicio: mejorar 5 prompts
- [ ] Competencia: quién genera mejor código
- [ ] Biblioteca de prompts del curso

**Puntos Críticos**:
- "Prompt mágico" mindset (no existe)
- Iteración es clave
- Especificidad > generalidad

---

#### Módulo 04: Ingeniería de Contexto (4 horas)
**Objetivo**: Configurar contexto profesional

**Actividades del Instructor**:
- [ ] Demo de `.opencode` y `CLAUDE.md` efectivos
- [ ] Mostrar impacto (con vs sin contexto)
- [ ] Ejercicio: configurar proyecto personal
- [ ] Peer review de configuraciones

---

#### Módulo 05: Proyecto en Vivo (4 horas)
**Objetivo**: Ver workflow completo en acción

**Actividades del Instructor**:
- [ ] **CRÍTICO**: Live coding de inicio a fin
- [ ] Narrar decisiones en voz alta
- [ ] Mostrar errores y cómo recuperarse
- [ ] Q&A continuo

**Proyecto Sugerido**: Gestor de Gastos FPUNA
- Relatable para estudiantes
- Suficientemente complejo
- Completable en 4 horas

---

#### Módulo 06: Patrones de Flujo de Trabajo (4 horas)
**Objetivo**: Workflows profesionales

**Actividades del Instructor**:
- [ ] Enseñar Git workflow con AI
- [ ] Code review con AI
- [ ] Debugging workflow
- [ ] Refactoring workflow

---

### Semana 2: Tracks Especializados

#### Preparación por Track

**Software Development** (Instructor debe saber):
- TypeScript/JavaScript intermedio
- Testing (Jest, Playwright)
- System design basics
- OpenCode para generación de código

**Electronics/Automation** (Instructor debe saber):
- KiCAD schematic y PCB
- Arduino/ESP32 programming
- PLCs y ladder logic basics
- OpenCode para firmware y diseño

**Aeronautical** (Instructor debe saber):
- CAD 3D (CATIA o similar)
- Aerodinámica básica
- CFD conceptual
- OpenCode para cálculos y documentación

**Marketing** (Instructor debe saber):
- Marketing digital (redes sociales, ads)
- Analytics (Google Analytics, Meta Insights)
- Herramientas de diseño (Canva)
- OpenCode para contenido y análisis

**Research** (Instructor debe saber):
- Metodología de investigación
- Estadística básica (R o Python)
- LaTeX o Overleaf
- OpenCode para literatura y análisis

**Hospitality** (Instructor debe saber):
- Operaciones hoteleras
- Revenue management basics
- OTAs (Booking, Airbnb)
- OpenCode para servicio al cliente

---

## 👨‍🏫 Preparación del Instructor

### Checklist Pre-Curso (2 Semanas Antes)

#### Técnica
- [ ] Instalar OpenCode en tu máquina
- [ ] Configurar 3 proyectos ejemplo (uno de cada complejidad)
- [ ] Probar TODOS los ejercicios de tu track
- [ ] Ejecutar todo el código de ejemplo
- [ ] Preparar troubleshooting común (documento)

#### Pedagógica
- [ ] Leer los 6 módulos de Core Foundation 2 veces
- [ ] Leer los 5 módulos de tu track especializado
- [ ] Preparar demos en vivo (practicar 3 veces)
- [ ] Crear ejemplos adicionales (backup si terminas temprano)
- [ ] Preparar analogías personalizadas

#### Logística
- [ ] Confirmar acceso a lab de computación
- [ ] Verificar proyector y pantallas funcionan
- [ ] Probar conexión a Internet (velocidad, estabilidad)
- [ ] Coordinar con IT sobre permisos de admin
- [ ] Preparar backup plan (sin Internet, sin proyector)

---

### Setup del Aula

#### Configuración Física
```
Ideal:
- Proyector principal (slides)
- Pantalla secundaria (código en vivo)
- Estudiantes en U o clusters (no filas)
- Instructor puede circular

Mínimo aceptable:
- Un proyector
- Instructor visible para todos
```

#### Setup Técnico
```
Obligatorio:
- [ ] OpenCode instalado en máquina del instructor
- [ ] Repositorio de ejemplos clonado
- [ ] Slack/Discord del curso abierto
- [ ] Backup de slides offline (PDF)
- [ ] Grabación de clase (OBS o similar)

Recomendado:
- [ ] Hotspot móvil (backup Internet)
- [ ] Laptop de respaldo
- [ ] Extension cord / zapatilla múltiple
```

---

## 🎯 Metodología de Enseñanza

### Estructura de Clase Típica (4 horas)

```
00:00 - 00:15   Revisión y Q&A (tarea anterior)
00:15 - 01:00   Parte 1: Concepto + Demo
01:00 - 01:15   Break
01:15 - 02:15   Parte 2: Ejercicio guiado
02:15 - 02:30   Break
02:30 - 03:30   Parte 3: Ejercicio independiente
03:30 - 04:00   Parte 4: Showcase + resumen
```

### Técnicas Efectivas

#### 1. **Live Coding (NO slides de código)**
```
❌ Malo: Mostrar código terminado en slides
✅ Bueno: Escribir código en vivo, narrar decisiones
```

**Por qué**: Estudiantes ven el proceso real, incluyendo errores.

**Cómo**:
- Preparar el setup (archivos base)
- Escribir código explicando cada línea
- Cometer errores intencionales (y mostrar cómo arreglar)
- Pedir a estudiantes que sugieran próximos pasos

---

#### 2. **Think-Pair-Share**
```
1. Think (5 min): Estudiante resuelve individualmente
2. Pair (10 min): Discute con compañero
3. Share (10 min): Presentan al grupo
```

**Cuándo usar**: Ejercicios de diseño, prompts, troubleshooting

---

#### 3. **Rubber Duck Teaching**
```
Estudiante explica su código a otro (o a ti) línea por línea.
```

**Por qué**: Explicar = entender profundamente

**Cuándo usar**: Cuando estudiante está stuck, o código funciona pero no sabe por qué

---

#### 4. **AI Pair Programming Sessions**
```
Proyector split:
- Izquierda: Código
- Derecha: Chat con OpenCode

Narras decisiones y prompts en voz alta.
```

**Por qué**: Modela el workflow real profesional

---

### Manejo de Diferentes Niveles

#### Estudiantes Avanzados (15-20%)
**Síntoma**: Terminan ejercicios en 50% del tiempo

**Estrategia**:
- Challenges extra (más difíciles)
- Pídeles que ayuden a compañeros (teaching solidifica)
- Proyectos extendidos (más features)

#### Estudiantes Promedio (60-70%)
**Síntoma**: Completan en tiempo estimado

**Estrategia**:
- Este es tu target audience
- Mantén el ritmo para ellos
- Ofrece clarificaciones cuando 3+ preguntan lo mismo

#### Estudiantes con Dificultad (10-15%)
**Síntoma**: No terminan ejercicios, frustración visible

**Estrategia**:
- Asigna TA para apoyo 1-on-1
- Simplifica ejercicios (versión reducida)
- Sesión extra fuera de clase (office hours)
- Peer programming con estudiante avanzado

---

## 🤖 Manejo de Herramientas AI

### OpenCode: Guía para Instructor

#### Qué Mostrar
✅ **Workflow efectivo**:
1. Escribir prompt claro y específico
2. Revisar output críticamente
3. Iterar si necesario
4. Validar que funciona (tests, ejecución)

✅ **Prompt patterns**:
- Para generación: "Genera [X] usando [Y] con [restricciones]"
- Para debugging: "Este código falla con [error]. Causas posibles?"
- Para refactoring: "Refactoriza [código] para [objetivo]"
- Para documentación: "Documenta [código] estilo [formato]"

✅ **Cuándo NO usar AI**:
- Aprender conceptos nuevos (primero entiende, luego acelera)
- Código crítico de seguridad (revisar exhaustivamente)
- Decisiones arquitectónicas (AI sugiere, tú decides)

#### Qué NO Mostrar
❌ Copy-paste ciego sin entender
❌ "Prompt mágico que hace todo"
❌ Delegar pensamiento crítico a IA

---

### Common Pitfalls del Estudiante

| Pitfall | Señal | Corrección |
|---------|-------|------------|
| **AI Dependency** | "No sé hacer nada sin OpenCode" | Ejercicio sin AI, luego con AI (comparar) |
| **No valida output** | Código no funciona, no sabe por qué | Enseñar debugging, leer código |
| **Prompts vagos** | "No funciona" como prompt | Template de prompts efectivos |
| **Ignora contexto** | Genera código incoherente | Revisar `.opencode` y `CLAUDE.md` |

---

## 🎪 Gestión del Aula

### Primeros 30 Minutos (Críticos)

**Día 1**:
- [ ] Presentación personal (credenciales, experiencia)
- [ ] Expectativas del curso (qué lograrán)
- [ ] Reglas del aula (puntualidad, participación, respeto)
- [ ] Icebreaker (presentación 2 min c/u)
- [ ] Demo rápida (WOW moment - genera algo impresionante en 5 min)

**Momentum es clave**: Si pierdes el aula en los primeros 30 min, es difícil recuperar.

---

### Reglas del Aula Sugeridas

1. **Laptops open, pero enfocadas** (no redes sociales durante demos)
2. **Preguntas en cualquier momento** (pero levantar mano)
3. **Break = break real** (no extender trabajo en break)
4. **Ayuda mutua** (pero no hacer la tarea del compañero)
5. **Entregas a tiempo** (penalty si tarde sin justificación)

---

### Manejo de Disrupciones

| Situación | Respuesta |
|-----------|-----------|
| Estudiante domina conversación | "Excelente punto [nombre]. Veamos otras perspectivas." |
| Estudiante distraído (celular) | Acercarte silenciosamente, mirada. Si persiste, hablar privado en break. |
| Equipos no funcionan | Backup plan pre-preparado (trabajo teórico, discusión, videos) |
| Internet cae | Hotspot móvil + ejercicios offline preparados |
| Código no funciona en clase | "Debugging en vivo es parte del aprendizaje. Veamos juntos." |

---

## 📊 Evaluación y Retroalimentación

### Estructura de Evaluación

| Componente | Peso | Evaluación |
|------------|------|------------|
| **Asistencia y Participación** | 15% | Registro diario + contribuciones |
| **Ejercicios de Módulos** | 25% | 1 por módulo, rubrica específica |
| **Quizzes** | 10% | Conceptos clave, online |
| **Proyecto Track** | 30% | Proyecto especializado |
| **Proyecto Final (Capstone)** | 20% | Integración de todo |

### Rubrica General (Ejercicios)

| Criterio | Excelente (100%) | Bueno (80%) | Aceptable (70%) | Insuficiente (<70%) |
|----------|------------------|-------------|-----------------|---------------------|
| **Funcionalidad** | Funciona perfectamente | Funciona con bugs menores | Funciona parcialmente | No funciona |
| **Calidad de Código** | Limpio, documentado, profesional | Legible, algo documentado | Funcional pero sucio | Incomprensible |
| **Uso de AI** | Usa AI efectivamente, valida output | Usa AI, validación básica | Usa AI sin validar | No usa AI o mal |
| **Creatividad** | Solución innovadora | Solución sólida | Solución básica | Solución incompleta |

### Retroalimentación Efectiva

#### Modelo: "What, So What, Now What"

```markdown
**What (Qué observo)**:
"Tu código genera 15 tests correctamente usando OpenCode."

**So What (Por qué importa)**:
"Esto demuestra que entiendes cómo estructurar prompts específicos y validar output."

**Now What (Qué sigue)**:
"Próximo paso: agregar edge cases y error handling a tus prompts. Mira el ejemplo del Módulo 03, sección 2.3."
```

#### Timing de Feedback
- **Inmediato**: Durante clase (verbal, rápido)
- **24 horas**: Ejercicios pequeños
- **48-72 horas**: Proyectos medianos
- **1 semana**: Proyecto final

---

## 🔧 Troubleshooting Común

### Problemas Técnicos

#### OpenCode No Inicia
```
Síntomas: Error al ejecutar comando opencode
Causas:
1. No instalado correctamente
2. PATH no configurado
3. Permisos insuficientes

Fix:
- Reinstalar con admin rights
- Verificar: opencode --version
- Revisar documentación oficial
```

#### MCPs No Funcionan
```
Síntomas: MCP skill no responde
Causas:
1. JSON mal formateado en config
2. MCP server no corriendo
3. Firewall bloquea

Fix:
- Validar JSON con jsonlint
- Reiniciar OpenCode: opencode restart
- Revisar firewall settings
```

---

### Problemas Pedagógicos

#### "No Entiendo Nada"
```
Síntoma: Estudiante perdido, silencioso
Causa: Demasiado rápido, o prerequisitos no cumplidos

Fix:
1. Sesión 1-on-1 (15 min)
2. Identificar gap específico
3. Asignar peer mentor
4. Material de repaso
```

#### "Ya Sé Todo Esto"
```
Síntoma: Estudiante aburrido, distraído
Causa: Nivel muy básico para ellos

Fix:
1. Challenge avanzado personalizado
2. Role de TA (enseñar a otros)
3. Proyecto extendido
```

---

## 📚 Recursos del Instructor

### Documentación

**Obligatoria**:
- [ ] Este documento (Instructor Training Guide)
- [ ] Todos los READMEs de módulos
- [ ] ESTADO-MEJORA-CONTENIDO.md (progreso)
- [ ] Rubricas de evaluación

**Recomendada**:
- [ ] OpenCode official docs
- [ ] Oh My OpenCode (OMO) guides
- [ ] Prompt engineering best practices

---

### Templates Útiles

#### Slide Deck Base
```
Slides mínimas para cada módulo:
1. Objetivos (¿Qué lograrás?)
2. Por qué importa (motivación)
3. Conceptos clave (3-5 slides)
4. Demo en vivo (código real)
5. Ejercicio (instrucciones claras)
6. Resumen y próximos pasos
```

#### Email Template (Reminder)
```
Asunto: [FPUNA-IA] Preparación para Clase {Número}

Hola equipo,

Mañana: {Tema de la clase}

Antes de clase:
- [ ] Tarea: {específica}
- [ ] Lecturas: {links}
- [ ] Instalar: {software}

Nos vemos a las {hora}!

{Tu nombre}
```

---

### Canales de Soporte

**Slack/Discord**:
- #general (anuncios)
- #ayuda-tecnica (troubleshooting)
- #entregas (submissions)
- #off-topic (comunidad)

**Office Hours**: 2 horas/semana (pre-anunciadas)

**Email**: Solo para temas administrativos formales

---

## ✅ Checklist del Instructor - Día de Clase

### Pre-Clase (60 min antes)
- [ ] Laptop cargada + charger
- [ ] Proyector probado
- [ ] Internet funcionando
- [ ] OpenCode corriendo en tu máquina
- [ ] Repositorio de ejemplos abierto
- [ ] Slides cargadas (y PDF backup)
- [ ] Asistencia lista (lista de nombres)
- [ ] Break times anotados (alarma)

### Durante Clase
- [ ] Comenzar puntual
- [ ] Registrar asistencia (primeros 10 min)
- [ ] Cumplir breaks (no extender)
- [ ] Circular por el aula (no solo al frente)
- [ ] Preguntar "¿Dudas?" cada 20-30 min
- [ ] Tomar notas (qué funcionó/no funcionó)

### Post-Clase (30 min después)
- [ ] Subir materiales a plataforma
- [ ] Responder preguntas de Slack (primeras 5)
- [ ] Actualizar notas del instructor
- [ ] Preparar siguiente clase
- [ ] Grabar feedback mientras fresco

---

## 🎯 Métricas de Éxito del Instructor

### Semana 1 (Core Foundation)
- ✅ **100% estudiantes** con OpenCode funcionando
- ✅ **90%+ asistencia** a todas las clases
- ✅ **80%+** completan todos los ejercicios
- ✅ **4.0+/5.0** rating de satisfacción

### Semana 2 (Tracks)
- ✅ **85%+ estudiantes** completan proyecto de track
- ✅ **75%+** demuestran competencia con AI tools
- ✅ **Cero quejas** sobre organización o claridad
- ✅ **4.2+/5.0** rating de satisfacción

### Semana 3 (Final)
- ✅ **90%+ estudiantes** entregan proyecto final
- ✅ **70%+** alcanzan nivel "bueno" o superior
- ✅ **50%+** expresan interés en continuar con AI
- ✅ **4.5+/5.0** rating de satisfacción

---

## 💡 Tips Finales para Instructores

### Do's ✅
1. **Sé auténtico** - Comparte tus errores y aprendizajes
2. **Mantén energía alta** - Entusiasmo es contagioso
3. **Celebra pequeños logros** - "¡Excelente! Tu primer test generado con AI"
4. **Aprende nombres** - Usa nombres en primeros 3 días
5. **Pide feedback continuo** - "¿Muy rápido? ¿Muy lento?"
6. **Adapta sobre la marcha** - Si algo no funciona, cambia

### Don'ts ❌
1. **No asumas conocimiento** - Verifica prerequisitos
2. **No leas slides** - Úsalas como guía visual solamente
3. **No ignores estudiantes lentos** - Todos merecen atención
4. **No te cases con el plan** - Flexibilidad > rigidez
5. **No temas decir "no sé"** - "Investiguemos juntos"
6. **No compares estudiantes** - Cada uno a su ritmo

---

## 📞 Contacto y Soporte

**Coordinador del Programa**: [nombre]@fpuna.edu.py  
**Soporte Técnico**: [email]  
**WhatsApp Instructores**: [grupo]  
**Repositorio**: [GitHub link]

---

## ✨ Reflexión Final

Enseñar este curso es una oportunidad única de **transformar cómo la próxima generación de profesionales paraguayos trabajará**.

No estás solo enseñando herramientas - estás enseñando una **nueva forma de pensar y trabajar**.

Los estudiantes que salgan de este curso tendrán una **ventaja competitiva significativa** en el mercado laboral paraguayo y regional.

**¡Gracias por ser parte de esta transformación!** 🚀🇵🇾

---

*Documento creado: Enero 2026*  
*Próxima actualización: Post primer cohorte (feedback incorporado)*
