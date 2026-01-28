# Rúbrica Escalonada - Track 02 Electronics
## Evaluación por Nivel de Proyecto

---

## Principios de Evaluación

### Qué Evaluamos
1. **Funcionalidad**: ¿El sistema hace lo que debe hacer?
2. **Comprensión**: ¿El estudiante entiende cómo y por qué funciona?
3. **Calidad**: ¿El código/hardware está bien estructurado?
4. **Documentación**: ¿Otro ingeniero podría replicarlo?
5. **Comunicación**: ¿Puede explicar y demostrar su trabajo?

### Qué NO Evaluamos
- Cantidad de prompts de IA usados
- "Innovación" forzada
- Features no solicitados
- Complejidad innecesaria

### Calificación Máxima
Todos los niveles pueden obtener 100 puntos. El nivel determina las expectativas, no el techo.

---

## Nivel PRINCIPIANTE (100 puntos)

### 1. Funcionalidad (40 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **36-40** | Sistema funciona completamente. Maneja casos edge (sensor desconectado, valores extremos). Comportamiento predecible y confiable. |
| **28-35** | Sistema funciona en condiciones normales. Algunos edge cases no manejados. Funcionalidad principal completa. |
| **20-27** | Funciona parcialmente. Features principales presentes pero con bugs. Requiere intervención manual ocasional. |
| **10-19** | Funcionalidad muy limitada. Varios componentes no funcionan. Demo incompleto. |
| **0-9** | No funciona o no entregado. |

### 2. Código (25 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **23-25** | Código limpio, bien indentado. Comentarios explican el "por qué". Variables con nombres descriptivos. Estructura lógica clara. |
| **18-22** | Código funcional con algunos comentarios. Estructura razonable. Algunos nombres poco claros pero entendible. |
| **12-17** | Código funciona pero desordenado. Pocos comentarios. Difícil de seguir en algunas partes. |
| **6-11** | Código difícil de entender. Sin comentarios. Estructura confusa. |
| **0-5** | Código inentendible o no entregado. |

### 3. Documentación (20 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **18-20** | Diagrama de conexiones claro. Explicación escrita completa del funcionamiento. Lista de componentes. Responde la pregunta técnica asignada. |
| **14-17** | Documentación adecuada. Diagrama presente. Explicación cubre lo básico. |
| **10-13** | Documentación mínima. Diagrama incompleto o confuso. Explicación superficial. |
| **5-9** | Documentación muy escasa. Falta información crítica. |
| **0-4** | Sin documentación. |

### 4. Demo (15 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **14-15** | Video 3-5 min mostrando todo funcionando. Narración clara. Se ve bien el hardware y comportamiento. |
| **11-13** | Video aceptable. Muestra funcionalidad principal. Audio/video entendible. |
| **7-10** | Video básico. Algunas partes difíciles de ver. Explicación limitada. |
| **3-6** | Video pobre. Difícil entender qué hace el sistema. |
| **0-2** | Sin video o inutilizable. |

---

## Nivel INTERMEDIO (100 puntos)

### 1. Funcionalidad (30 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **27-30** | Todas las features funcionando. Sistema robusto. Recuperación de errores (WiFi, sensor). Edge cases manejados. |
| **22-26** | Mayoría de features funcionan. Algunos edge cases no cubiertos. Funcionalidad principal sólida. |
| **16-21** | Features básicos funcionan. Algunos bugs en features secundarias. IoT conecta pero inestable. |
| **10-15** | Funcionalidad limitada. Varios problemas. IoT intermitente. |
| **0-9** | No funciona significativamente. |

### 2. Código (20 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **18-20** | Código modular (funciones separadas). Manejo de errores presente. FSM clara si aplica. Configuración separada de lógica. |
| **14-17** | Código organizado. Algunos errores manejados. Estructura razonable. |
| **10-13** | Código funcional. Poco modular. Manejo de errores básico. |
| **5-9** | Código desordenado. Sin manejo de errores. |
| **0-4** | Código muy pobre o no entregado. |

### 3. Hardware/Esquemático (20 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **18-20** | Esquemático KiCAD completo y correcto. Símbolos apropiados. Conexiones claras. Breadboard/perfboard organizado. |
| **14-17** | Esquemático presente y funcional. Algunas inconsistencias menores. Hardware ordenado. |
| **10-13** | Esquemático básico. Algunas conexiones confusas. Hardware funciona pero desordenado. |
| **5-9** | Esquemático incompleto o con errores. Hardware difícil de seguir. |
| **0-4** | Sin esquemático o hardware inutilizable. |

### 4. IoT/Cloud (15 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **14-15** | Dashboard completo con datos en tiempo real. MQTT bidireccional funcionando. Reconexión automática. |
| **11-13** | Dashboard funcional. MQTT publica correctamente. Algunos features de visualización. |
| **7-10** | Conexión básica a cloud. Dashboard simple. MQTT unidireccional. |
| **3-6** | IoT muy básico o inestable. Dashboard mínimo. |
| **0-2** | Sin integración IoT funcional. |

### 5. Documentación (10 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **9-10** | Documentación de arquitectura. Topics MQTT documentados. Guía de instalación. Código documentado. |
| **7-8** | Documentación adecuada. Cubre aspectos principales. |
| **5-6** | Documentación básica. Falta información de configuración. |
| **2-4** | Documentación escasa. |
| **0-1** | Sin documentación. |

### 6. Demo (5 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **5** | Video 5-7 min profesional. Muestra todas las features. Explicación técnica clara. |
| **4** | Video bueno. Cubre mayoría de features. |
| **3** | Video aceptable. Algunas partes no claras. |
| **1-2** | Video básico o incompleto. |
| **0** | Sin video. |

---

## Nivel AVANZADO (100 puntos)

### 1. Funcionalidad (25 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **23-25** | Sistema completo y robusto. Edge cases manejados. Recuperación de errores. Fallback si pierde comunicación. Funciona autónomamente. |
| **19-22** | Sistema funciona bien. Mayoría de edge cases cubiertos. Algunos escenarios de falla no manejados. |
| **14-18** | Funcionalidad principal presente. Algunos subsistemas inestables. |
| **8-13** | Funcionalidad limitada. Problemas significativos de integración. |
| **0-7** | No funciona adecuadamente. |

### 2. Firmware (20 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **18-20** | Código de nivel profesional. FSM clara. Manejo de errores robusto. Configuración externalizada. Logging útil. Código comentado apropiadamente. |
| **14-17** | Código bien estructurado. FSM presente. Errores manejados. |
| **10-13** | Código funcional. Estructura mejorable. Errores parcialmente manejados. |
| **5-9** | Código desordenado. Poco manejo de errores. |
| **0-4** | Código muy pobre. |

### 3. Hardware Design (20 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **18-20** | PCB layout completo y listo para fabricar. Gerbers generados. BOM con proveedores. DRC pasado. Diseño modular. |
| **14-17** | Esquemático profesional. PCB layout presente (puede tener issues menores). BOM completo. |
| **10-13** | Esquemático completo. PCB básico o no presente. Documentación de hardware adecuada. |
| **5-9** | Esquemático incompleto. Sin PCB. Hardware desorganizado. |
| **0-4** | Diseño de hardware muy pobre. |

### 4. Integración Multi-Sistema (15 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **14-15** | Integración multi-capa funcional. Protocolos correctos. Dashboard completo. Sistema responde a comandos remotos. |
| **11-13** | Integración funcional. Algunos delays o inconsistencias. Dashboard presente. |
| **7-10** | Integración básica. Conexión funciona pero frágil. |
| **3-6** | Problemas significativos de integración. |
| **0-2** | Integración no funcional. |

### 5. Documentación (10 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **9-10** | Documentación nivel profesional. Arquitectura, manual de operación, guía de instalación, tabla de registros/topics. |
| **7-8** | Documentación completa. Cubre todos los aspectos. |
| **5-6** | Documentación adecuada. Falta algún elemento. |
| **2-4** | Documentación básica. |
| **0-1** | Documentación muy escasa. |

### 6. Demo + Comprensión (10 puntos)

| Puntaje | Descripción |
|---------|-------------|
| **9-10** | Video 8-10 min profesional. Puede explicar cualquier aspecto en detalle. Demuestra comprensión profunda. |
| **7-8** | Video bueno. Explica bien la mayoría de componentes. |
| **5-6** | Video aceptable. Explicación básica. |
| **2-4** | Video limitado. Dificultad explicando detalles. |
| **0-1** | Sin video o no puede explicar su trabajo. |

---

## Evaluación de Comprensión (Todos los Niveles)

### Método
Entrevista de 10-15 minutos O preguntas escritas con código abierto.

### Preguntas por Nivel

#### Principiante (3 preguntas, elegir 2)
1. "¿Por qué usaste millis() en lugar de delay()?"
2. "Explica cómo funciona el divisor de voltaje en tu circuito"
3. "¿Qué pasa si el sensor devuelve un valor inválido?"
4. "¿Cómo calculas la resistencia para el LED?"

#### Intermedio (4 preguntas, elegir 3)
1. "Explica el flujo de datos desde el sensor hasta el dashboard"
2. "¿Qué pasa si se pierde la conexión WiFi? Muestra el código"
3. "Describe los estados de tu FSM y las transiciones"
4. "¿Por qué separaste la configuración del código principal?"
5. "¿Cómo debuggearías si el MQTT no conecta?"

#### Avanzado (5 preguntas, elegir 4)
1. "Explica tu arquitectura multi-capa y por qué la diseñaste así"
2. "¿Qué hace el sistema si pierde comunicación con el servidor?"
3. "Describe el protocolo que implementaste y sus limitaciones"
4. "¿Cómo calibraste tus sensores? Muestra el proceso"
5. "¿Qué cambiarías si tuvieras que hacerlo para producción?"
6. "Explica el cálculo de [métrica específica del proyecto]"

### Rúbrica de Comprensión (incluida en Demo)

| Nivel | Descripción |
|-------|-------------|
| Excelente | Responde con confianza. Puede ir más allá de la pregunta. Demuestra que entiende el "por qué". |
| Bueno | Responde correctamente. Puede tener pequeñas dudas. Entiende lo que hizo. |
| Suficiente | Responde parcialmente. Necesita hints. Comprensión superficial. |
| Insuficiente | No puede explicar su propio código/circuito. Dependencia excesiva de IA sin comprensión. |

---

## Bonus Points (Todos los Niveles)

| Bonus | Puntos | Requisito |
|-------|--------|-----------|
| PCB fabricado e instalado | +5 | PCB ordenado, recibido, soldado y funcional |
| Enclosure/carcasa | +3 | Diseño funcional (3D print, corte láser, o fabricación) |
| Feature adicional útil | +3 | Algo no requerido pero que agrega valor real |
| Documentación bilingüe | +2 | Español completo + Inglés completo |
| Código en GitHub con CI | +2 | Repo público con README, issues tracking |

**Máximo bonus**: +10 puntos
**Nota máxima posible**: 110/100

---

## Penalizaciones

| Penalización | Puntos | Situación |
|--------------|--------|-----------|
| Entrega tardía | -10% por día | Máximo 3 días, luego no se acepta |
| Plagio de código | -50 a -100 | Código copiado sin atribución |
| No puede explicar | -20 | No puede responder preguntas básicas sobre su propio trabajo |
| Proyecto diferente sin aprobación | -30 | Cambió de proyecto sin avisar |

---

## Cálculo Final

```
Nota Proyecto = Puntos obtenidos (max 100) + Bonus (max 10)
Nota Final del Track = (Ejercicios × 0.25) + (Proyecto × 0.50) + (Comprensión × 0.15) + (Participación × 0.10)
```

### Escala Final

| Puntos | Calificación |
|--------|--------------|
| 90-110 | Excelente |
| 80-89 | Muy Bueno |
| 70-79 | Bueno |
| 60-69 | Suficiente |
| <60 | Insuficiente |

**Mínimo para aprobar**: 60 puntos (Suficiente)

---

## Notas para Evaluadores

1. **Ajustar expectativas por nivel**: Un código "Excelente" de Principiante es diferente a uno de Avanzado.

2. **Valorar el proceso**: Si algo no funciona pero el estudiante documenta por qué y qué intentó, dar crédito parcial.

3. **Comprensión sobre complejidad**: Prefiero un proyecto simple bien entendido que uno complejo copiado.

4. **IA es herramienta, no autor**: Si el estudiante usó IA pero puede explicar cada línea, está bien. Si no puede, hay problema.

5. **Hardware real tiene problemas**: Sensores fallan, conexiones se sueltan. Evaluar el manejo de problemas, no solo el resultado ideal.

---

*Rúbrica Escalonada - Track 02 Electronics - FPUNA 2026*
