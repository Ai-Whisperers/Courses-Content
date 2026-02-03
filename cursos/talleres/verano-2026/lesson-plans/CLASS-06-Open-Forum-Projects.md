# CLASE 6: Open Forum + Student Projects
## Productividad Académica con IA - TALLERES VERANO 2026

**Fecha**: Lunes, Febrero 9, 2026  
**Horario**: 18:00 - 20:00 (2 horas)  
**Modalidad**: Virtual  
**ÚLTIMA CLASE DEL TALLER** 🎉

---

## 🎯 Objetivos de Esta Sesión

Esta clase es diferente - es COLABORATIVA e INTERACTIVA:

1. ✅ Compartir proyectos y experiencias de los estudiantes
2. ✅ Resolver problemas reales que enfrentan
3. ✅ Discutir ideas de implementación de IA
4. ✅ Q&A abierto sobre cualquier tema del taller
5. ✅ Planificar el uso continuo de IA después del taller
6. ✅ Celebrar lo aprendido y hacer networking

---

## 📋 Preparación PRE-CLASE

### Para los Estudiantes (enviar 24h antes)

**Email/mensaje al grupo**:
```
¡Hola a todos!

Mañana lunes es nuestra última clase del taller - ¡Open Forum!

Esta clase es sobre USTEDES y sus proyectos. Les pido que vengan preparados con:

📝 UNA de estas opciones (o más si quieren):

1. **Proyecto Actual** que quieren mejorar con IA
   - Puede ser tesis, trabajo de curso, proyecto personal
   - Preparen: descripción breve (2 min) + pregunta específica

2. **Problema** que enfrentaron esta semana usando IA
   - ¿Algo no funcionó como esperaban?
   - ¿Se trabaron en algo?
   - Vamos a resolverlo juntos

3. **Caso de Uso** de IA que descubrieron
   - ¿Encontraron una aplicación cool?
   - ¿Algo que funcionó muy bien?
   - Compártanlo para que todos aprendamos

4. **Pregunta** sobre IA que no pudieron hacer antes
   - Sin límites de tema
   - Técnicas, éticas, prácticas, lo que sea

NO es obligatorio presentar, pero los animo a participar.
¡Esta es SU clase!

Nos vemos mañana 18:00.

Ivan, Kyrian & Jonathan
```

---

## ⏱️ PLAN DE CLASE FLEXIBLE

**NOTA IMPORTANTE PARA INSTRUCTORES**:
Esta clase NO tiene estructura rígida. El plan siguiente es una GUÍA FLEXIBLE. 
Adapten según energía e interés del grupo.

---

### 🔷 PARTE 1: Apertura y Celebración (15 minutos)

#### **18:00 - 18:15 (15 min) - Bienvenida y Recapitulación**

**QUÉ MOSTRAR**: 
- 📊 **SLIDES**: "Journey del Taller"
- 📊 **SLIDES**: "Lo Que Logramos Juntos"

**QUÉ DECIR**:
```
"¡Bienvenidos a nuestra última clase!

Antes de empezar, quiero que reflexionen un momento:

¿Qué sabían de IA hace una semana?
¿Qué pueden hacer ahora que no podían hace 5 días?

[Pausa para reflexión]

Vamos a hacer un repaso visual rápido de nuestro journey..."
```

**SLIDE: Journey del Taller**
```
📚 Clase 1: Fundamentos + Investigación
   - Instalaron OpenCode
   - Aprendieron prompting
   - Usaron NotebookLM

🎨 Clase 2: Marketing + Hospitalidad
   - Crearon contenido con IA
   - Hicieron presentaciones en Gamma
   - Diseñaron en Canva

💻 Clase 3: Desarrollo de Software
   - Generaron código
   - Debuggearon con IA
   - Crearon tests automáticos

⚡ Clase 4: Electrónica + Automatización
   - Arduino con IA
   - Proyectos IoT
   - Troubleshooting de hardware

✈️ Clase 5: Ingeniería Aeronáutica
   - Análisis de vuelo
   - Diseño conceptual
   - Cálculos aerodinámicos

🎉 Clase 6: ¡Open Forum!
   - TU turno de brillar
```

**INTERACCIÓN**:
```
"Pregunta rápida: escriban en el chat UNA palabra que describa 
su experiencia en este taller.

[Leer algunas respuestas en voz alta]

Excelente. Ahora, la clase de hoy es diferente.
No voy a presentar slides por 2 horas.
Ustedes son los protagonistas."
```

---

### 🔷 PARTE 2: Student Showcase (60-70 minutos)

#### **18:15 - 19:25 (70 min) - Presentaciones de Estudiantes**

**FORMATO SUGERIDO**: Cada estudiante tiene 5-7 minutos

**Estructura por Presentación**:
```
1. Estudiante presenta (3-4 min)
   - Su proyecto/problema/idea
   - Qué ha intentado
   - Dónde necesita ayuda

2. Instructor ayuda en vivo (2-3 min)
   - Usa OpenCode/herramientas para resolver
   - O da guidance de cómo abordar

3. Q&A del grupo (1 min)
   - Otros estudiantes pueden sugerir ideas
```

**Roles del Instructor Durante Presentaciones**:

**ESCUCHAR ACTIVAMENTE**:
- Tomar notas de puntos clave
- No interrumpir
- Hacer preguntas clarificadoras si algo no está claro

**AYUDAR EN VIVO**:
- Si es problema técnico: abrir OpenCode y resolver together
- Si es conceptual: explicar con ejemplos
- Si es estratégico: discutir opciones

**CONECTAR PUNTOS**:
- "Esto que mencionas se conecta con lo que María dijo antes..."
- "Este problema es similar al que vimos en Clase X..."

---

**EJEMPLO DE CÓMO MANEJAR UNA PRESENTACIÓN**:

**Estudiante**: 
```
"Hola, soy Carlos, estudio Ingeniería Informática. Mi proyecto es 
una app web para gestión de inventario de una pequeña tienda.

Estoy usando React + Node.js. He intentado usar OpenCode para 
generar el código del backend, pero las APIs que genera no funcionan 
correctamente - dan errores 500.

No sé si estoy escribiendo mal los prompts o si es otro problema."
```

**Instructor**:
```
"Perfecto Carlos, vamos a resolverlo juntos ahora mismo.

[Compartir pantalla - OpenCode]

Primera pregunta: ¿me puedes copiar en el chat el error exacto que 
ves en la consola?

[Carlos pega error]

Ok, error 500 suele ser server-side. Vamos a debuggear.

[Escribir en OpenCode]:

'Tengo esta API de Node.js que está dando error 500:

[pegar código que Carlos comparte]

El error es:
[pegar error]

Diagnóstico: ¿Cuál es el problema y cómo lo arreglo?'

[Esperar respuesta de OpenCode]

[Leer diagnóstico en voz alta]

'Ah, mira! El problema es que falta el middleware de parsing JSON.
Carlos, agrega esta línea en tu server.js:

app.use(express.json());

Justo después de inicializar tu app.

¿Puedes intentar eso y decirme si funciona?'

[Carlos prueba]

'¡Perfecto! Ya funciona. ¿Ves qué simple?'

[Al grupo]:
'Este es un error SUPER común. La lección: cuando tengan error 500, 
copien el error completo a OpenCode. 90% del tiempo va a identificar el 
problema inmediatamente.'

Siguiente!"
```

---

**ESCENARIOS ADICIONALES QUE PUEDEN SURGIR**:

**Escenario A: Estudiante sin proyecto preparado pero con pregunta**
```
Estudiante: "No tengo proyecto específico, pero me pregunto: 
¿cómo puedo usar IA para preparar exámenes?"

Instructor: 
"¡Excelente pregunta! Muchos están en la misma.

[Live demo]:

'Voy a mostrarles una técnica. Digamos que tienen examen de 
Termodinámica.

[OpenCode]:

Prompt:
'Soy estudiante de Ingeniería Mecánica con examen de Termodinámica 
en 2 días. El examen cubre:
- Primera y segunda ley
- Ciclos de potencia (Rankine, Otto, Diesel)
- Propiedades de sustancias

Genera para mí:
1. Resumen de conceptos clave (bullet points)
2. 10 preguntas de práctica (con respuestas)
3. Flashcards de fórmulas importantes
4. Common mistakes que estudiantes cometen'

[Mostrar resultado]

¿Ven? Tienen tutor personalizado 24/7.

Pro tip: después de generar preguntas, pídale que las explique. 
Es como tener profesor particular gratis."
```

**Escenario B: Proyecto muy ambicioso / complejo**
```
Estudiante: "Quiero crear un sistema de reconocimiento facial para 
control de acceso con Raspberry Pi, que envíe alertas por Telegram y 
almacene en database..."

Instructor:
"Me encanta la ambición! Pero ese proyecto tiene como 5 componentes grandes.

Estrategia para proyectos complejos con IA:

Paso 1: DESCOMPONER
[Escribir en pantalla/slides]:

- Módulo 1: Facial recognition (OpenCV)
- Módulo 2: Raspberry Pi setup
- Módulo 3: Database (SQLite o Postgres)
- Módulo 4: Telegram bot
- Módulo 5: Integración

Paso 2: TACKLE ONE BY ONE

No pidas a IA que genere todo junto. Va a ser un disaster.

En cambio:

[Demo rápido]:
'Primero: setup de Raspberry Pi con camera.

Prompt a OpenCode:
'Proyecto: Sistema de control de acceso. Fase 1.

Genera script Python que:
1. Inicializa camera en Raspberry Pi
2. Captura frame cada segundo
3. Guarda images con timestamp
4. Log básico de operación

Hardware:
- Raspberry Pi 4
- Camera Module v2

Dame código comentado paso a paso.'

[Generar]

Una vez que este módulo funcione, pasas al siguiente.

IA es mejor haciendo tareas específicas que sistemas completos.

¿Tiene sentido?"
```

**Escenario C: Estudiante comparte éxito**
```
Estudiante: "Usé OpenCode para mi tarea de Estructuras de Datos. 
Tenía que implementar un árbol AVL y no entendía cómo hacerlo. 
OpenCode no solo generó el código, sino que me explicó paso a paso 
cómo funcionan las rotaciones. ¡Saqué 95 en la tarea!"

Instructor:
"¡Eso es exactamente el espíritu! 

Noten algo importante en lo que dijo:
'OpenCode no solo generó el código, sino que me EXPLICÓ'

Ese es el uso correcto. No es 'dame el código y copio'. 
Es 'ayúdame a ENTENDER'.

Pregunta para el grupo: ¿alguien más tiene un éxito similar para compartir?

[Permitir 2-3 más]

Estos son los wins que queremos ver."
```

---

**MANEJO DEL TIEMPO**:

Si tienen MUCHOS estudiantes (10+) queriendo presentar:
```
"Tenemos muchos proyectos interesantes. Vamos a hacer speed round:

- 3 minutos por estudiante
- Presenta tu caso
- Respuesta rápida mía
- Siguiente

Si tu caso necesita más tiempo, lo marcamos y volvemos al final 
si queda tiempo. ¿Ok? Vamos!"
```

Si tienen POCOS estudiantes (3-5):
```
"Tomemos nuestro tiempo. Cada uno puede presentar más tranquilo y 
exploramos a profundidad."
```

Si NINGÚN estudiante quiere presentar (silencio):
```
"Ok, entiendo que pueden ser tímidos. Hagamos diferente.

Voy a hacer una pregunta y todos responden en chat:

'¿Qué es lo MÁS difícil que enfrentaron esta semana intentando usar IA?'

[Leer respuestas]

[Elegir las 3 más interesantes y resolverlas en vivo]"
```

---

### 🔷 PARTE 3: Ideas de Implementación Futura (20 minutos)

#### **19:25 - 19:45 (20 min) - ¿Qué Sigue?**

**QUÉ MOSTRAR**:
- 📊 **SLIDES**: "Roadmap Post-Taller"

**SLIDE: Tu Journey con IA - Próximos 3 Meses**
```
MES 1 (Febrero):
✅ Integra IA en UNA tarea diaria
   Ejemplo: Usa OpenCode para UN proyecto del semestre
   
✅ Practica prompting
   Objetivo: 10 minutos diarios explorando IA

✅ Sigue aprendiendo
   - OpenCode docs
   - Prompt Engineering guides
   - YouTube tutorials

MES 2 (Marzo):
✅ Expande a más áreas
   - Si empezaste con tareas, prueba proyectos más grandes
   - Si hiciste código, prueba con diseño
   
✅ Comparte con compañeros
   - Enseña lo que aprendiste
   - Forma grupo de estudio

✅ Construye algo real
   - Proyecto que uses de verdad
   - No solo "pruebas"

MES 3 (Abril):
✅ Dominio
   - IA es segunda naturaleza en tu workflow
   - Identificas automáticamente dónde usar IA
   
✅ Experimenta con nuevas herramientas
   - Beyond OpenCode
   - Especializadas para tu campo

✅ Contribuye
   - Ayuda a otros estudiantes
   - Comparte tus discoveries
```

**SLIDE: Recursos para Seguir Aprendiendo**
```
📚 DOCUMENTACIÓN:
- OpenCode Docs: opencode.ai/docs
- Claude Prompt Library: anthropic.com/prompts
- OpenAI Cookbook: cookbook.openai.com

🎥 YOUTUBE CHANNELS:
- AI Explained
- Fireship (para developers)
- Matt Wolfe (AI news)

💬 COMUNIDADES:
- Discord de OpenCode
- Reddit: r/ClaudeAI, r/ChatGPT
- Twitter/X: Sigue a @AnthropicAI, @OpenAI

📧 NEWSLETTERS:
- The Rundown AI (daily)
- AI Breakfast (semanal en español)
```

**DISCUSIÓN ABIERTA**:
```
"Pregunta para todos:

¿En qué proyecto específico de este semestre van a aplicar 
lo que aprendieron?

No me digan 'en mi tesis' - muy vague.

Díganme: 'Voy a usar IA para [tarea específica] en [proyecto específico]'

Ejemplo: 'Voy a usar OpenCode para generar tests automatizados 
para mi proyecto de Base de Datos'

Escucho...

[Permitir que varios compartan]

Perfecto. Ahora tienen accountability. Están comprometidos públicamente 😊"
```

---

### 🔷 PARTE 4: Q&A Final + Cierre (15 minutos)

#### **19:45 - 19:55 (10 min) - Preguntas Finales Abiertas**

**QUÉ DECIR**:
```
"Últimos 10 minutos de Q&A abierto.

CUALQUIER pregunta sobre:
- IA en general
- Herramientas que mencionamos
- Dudas técnicas
- Ética de IA
- Futuro de IA
- Lo que sea

No hay preguntas tontas. Disparen."
```

**POSIBLES PREGUNTAS Y RESPUESTAS**:

**P: "¿IA va a quitarnos el trabajo?"**
```
R: "Honestamente, IA va a cambiar muchísimo el mercado laboral.

PERO:
- IA no va a quitar TU trabajo
- Personas QUE USAN IA van a reemplazar a personas que NO LA USAN

Por eso este taller es importante. Ustedes ahora están adelante 
de 95% de estudiantes universitarios.

Mantén esa ventaja. Sigue aprendiendo.

IA no es tu competencia. Es tu multiplicador."
```

**P: "¿Es ético usar IA para tareas de la universidad?"**
```
R: "Excelente pregunta.

Respuesta corta: Depende de CÓMO la uses.

❌ NO ético:
- Copiar código de IA y decir que lo escribiste
- Que IA escriba tu ensayo completo
- Usar IA para hacer trampa en exámenes

✅ SÍ ético:
- IA como tutor para ENTENDER conceptos
- IA para generar BORRADOR que tú mejoras
- IA para verificar tu propio trabajo
- IA para aprender más rápido

Regla simple:
Si puedes explicar y defender lo que entregaste, es ético.
Si no puedes explicar qué hace tu código, no lo entregues.

Siempre: revisa las políticas de tu profesor. Algunos prohíben 
explícitamente IA. Respeta eso."
```

**P: "¿Cuál es la mejor IA: ChatGPT, Claude, o Gemini?"**
```
R: "No hay 'mejor'. Cada una tiene fortalezas:

ChatGPT:
- Mejor para búsqueda e información general
- GPT-4 es muy bueno para razonamiento complejo
- Tiene plugins útiles

Claude (lo que usa OpenCode):
- Mejor para código (mi opinión)
- Más contextual y menos 'alucinaciones'
- Mejor en seguir instrucciones complejas

Gemini:
- Mejor integración con Google services
- Multimodal (imágenes, video)
- Gratis con mucha capacidad

Mi recomendación: usen todos!
Cada uno para lo que es mejor.

OpenCode (Claude) para proyectos serios.
ChatGPT para quick questions.
Gemini cuando necesitan imágenes o Google integration."
```

---

#### **19:55 - 20:00 (5 min) - Cierre Emocional**

**QUÉ MOSTRAR**:
- 📊 **SLIDES**: "Gracias + Certificados"

**QUÉ DECIR**:
```
"Bueno amigos, llegamos al final de nuestro taller.

Hace una semana ustedes llegaron curiosos sobre IA.
Hoy salen con herramientas reales y conocimiento práctico.

Algunos datos del taller:
- 6 clases, 12 horas totales
- 5 dominios diferentes cubiertos
- Cientos de lines de código generados
- Incontables problemas resueltos

Pero lo más importante:
Ustedes ahora tienen un SUPERPOWER que 95% de sus compañeros no tienen.

¿Qué van a hacer con él?

Espero que:
1. Lo usen responsablemente
2. Sigan practicando
3. Compartan con otros
4. Construyan cosas increíbles

Antes de terminar:

CERTIFICADOS:
- Los vamos a enviar por email esta semana
- Incluyen 12 horas de capacitación
- Son oficiales de la FP-UNA

GRUPO DE ALUMNI:
- Vamos a crear grupo de WhatsApp/Slack
- Para seguir compartiendo discoveries
- Pedir ayuda entre ustedes
- Mantenernos conectados

FEEDBACK:
- Por favor llenen el survey que vamos a enviar
- Sus comentarios nos ayudan a mejorar el taller
- Pueden ser honestos - queremos mejorar

---

Y finalmente... GRACIAS.

Gracias por su energía.
Gracias por hacer preguntas.
Gracias por participar.
Gracias por confiar en nosotros como instructores.

Ustedes hicieron este taller especial.

Ahora: vayan y construyan el futuro con IA 🚀

¡Muchas gracias y éxitos en todo!"
```

**MOMENTO FINAL**:
```
[Pedir a todos que enciendan cámaras si las tienen apagadas]

[Screenshot grupal si es posible]

[Despedida en chat]

"¡Nos vemos en el futuro! 👋"
```

---

## 📊 POST-CLASE ACTIVITIES

### Inmediatamente Después

1. ✅ **Enviar mensaje de agradecimiento**:
```
"¡Gracias por participar en el taller!

Resumen:
- Certificados: Próxima semana
- Materiales del taller: [link]
- Grupo de alumni: [link cuando esté listo]
- Survey de feedback: [link]

Manténganse en contacto!

Ivan, Kyrian & Jonathan"
```

2. ✅ **Crear grupo de alumni** (WhatsApp/Slack/Discord)

3. ✅ **Compartir materiales finales**:
   - Todos los lesson plans
   - Recursos adicionales
   - Grabaciones (si las hicieron)

---

### Dentro de 1 Semana

1. ✅ **Generar y enviar certificados**
2. ✅ **Analizar feedback del survey**
3. ✅ **Compilar mejores preguntas/casos para futuras iteraciones**

---

## 💡 TIPS PARA INSTRUCTORES

### Si la Clase Va MUY Bien
- Dejar que fluya naturalmente
- No forzar structure rígida
- La energía del grupo guide la sesión

### Si la Clase Va Lenta (silencio, poca participación)
- Tener 3-4 casos de uso preparados de backup
- Hacer live demos aunque nadie presente
- Hacer preguntas directas a individuos (gentilmente)

### Si un Estudiante Domina la Conversación
- Agradecerle y "guardar" su tema para el final
- "Excelente Juan, volvemos a eso. Primero veamos otros casos."

### Si Surge Debate Técnico Intenso
- Es bueno! Permitir
- Pero timeboxear: "5 minutos más en esto, luego seguimos"

### Mantener Energía Alta
- Celebrar wins de estudiantes
- Usar humor cuando apropiado
- Recordar que es la última clase - keep it fun!

---

## 🎓 REFLEXIÓN FINAL PARA INSTRUCTORES

Esta clase es el cierre de un journey.

**Tu objetivo no es**:
- Enseñar más técnicas
- Cubrir más contenido
- Demostrar expertise

**Tu objetivo ES**:
- Empoderar a los estudiantes
- Darles confianza
- Inspirarlos a seguir aprendiendo
- Crear community

Si terminan la clase sintiendo:
- "Puedo hacer esto"
- "IA es más accessible de lo que pensaba"
- "Quiero seguir experimentando"

Entonces: **MISSION ACCOMPLISHED** ✅

---

## 📋 CHECKLIST PRE-CLASE 6

**24 horas antes**:
- [ ] Enviar email pidiendo que preparen proyectos/preguntas
- [ ] Preparar backup demos por si nadie presenta
- [ ] Revisar nombres de estudiantes
- [ ] Preparar slides finales de cierre

**1 hora antes**:
- [ ] OpenCode ready
- [ ] Screen sharing tested
- [ ] Actitud positiva y energizada
- [ ] Certificados listos (o plan para generarlos)

**Al inicio**:
- [ ] Celebratory tone
- [ ] Agradecer participación de la semana
- [ ] Set expectation de clase interactiva

---

**¡Disfruta la clase final! Es la recompensa por la semana de trabajo duro.** 🎉

---

_Creado para: Talleres de Verano FP-UNA 2026_  
_Última actualización: Enero 23, 2026_
