# Syllabus Detallado
## IA para Electrónica y Automatización Industrial

---

## Información del Curso

| Campo | Detalle |
|-------|---------|
| **Código** | FPUNA-IA-EA-2024 |
| **Nombre** | IA para Electrónica y Automatización Industrial |
| **Créditos** | 2 |
| **Horas totales** | 16 horas |
| **Modalidad** | Presencial intensivo |
| **Período** | Curso de Verano |

---

## Descripción

Curso intensivo que introduce el uso de herramientas de Inteligencia Artificial Generativa (LLMs) como asistentes en el desarrollo de sistemas electrónicos y automatización industrial. Se abordan aplicaciones prácticas desde el diseño de circuitos hasta sistemas SCADA y mantenimiento predictivo.

---

## Competencias a Desarrollar

### Competencias Técnicas
1. Utilizar herramientas de IA para generación de código embebido
2. Aplicar técnicas de procesamiento de señales con asistencia de ML
3. Diseñar y validar circuitos electrónicos con IA
4. Programar PLCs usando Ladder y Structured Text generado por IA
5. Implementar interfaces HMI siguiendo estándares industriales
6. Desarrollar modelos de mantenimiento predictivo

### Competencias Transversales
1. Formular prompts efectivos para obtener resultados útiles
2. Validar críticamente las respuestas de sistemas de IA
3. Integrar múltiples tecnologías en un proyecto cohesivo
4. Documentar soluciones técnicas de forma clara

---

## Contenido Programático Detallado

### Módulo 01: Introducción a IA para Electrónica (2 horas)

**Objetivos:**
- Comprender el panorama actual de herramientas de IA para ingeniería
- Configurar un entorno de desarrollo integrado con asistentes de IA
- Formular prompts efectivos para tareas de electrónica

**Contenido:**
1. Evolución de herramientas de IA en ingeniería
   - GitHub Copilot, Claude, ChatGPT, Cursor
   - Casos de uso en electrónica y automatización
2. Configuración del entorno de trabajo
   - VS Code + PlatformIO
   - Extensiones recomendadas
   - GitHub Copilot setup
3. Estructura de prompts efectivos
   - Contexto, objetivo, restricciones, formato
   - Ejemplos prácticos para electrónica
4. Limitaciones y seguridad
   - Qué puede y qué no puede hacer la IA
   - Validación de código generado
   - Consideraciones de propiedad intelectual

**Práctica:** Configurar entorno y generar programa "Hola Mundo" para ESP32

---

### Módulo 02: Microcontroladores con IA (2 horas)

**Objetivos:**
- Generar código funcional para ESP32/Arduino usando IA
- Implementar lectura de sensores y control de actuadores
- Configurar comunicación WiFi y MQTT

**Contenido:**
1. Generación de código para ESP32
   - Estructura de proyecto PlatformIO
   - Bibliotecas comunes y su uso
2. Integración de sensores
   - Sensores analógicos (temperatura, corriente)
   - Sensores digitales (I2C, SPI, OneWire)
   - Calibración y validación
3. Comunicación IoT
   - WiFi con reconexión automática
   - Cliente MQTT con PubSubClient
   - Formato JSON con ArduinoJson
4. Optimización energética
   - Deep sleep y wakeup sources
   - Cálculo de consumo y autonomía

**Práctica:** Sistema de monitoreo ambiental con WiFi y MQTT

---

### Módulo 03: Procesamiento de Señales (2 horas)

**Objetivos:**
- Aplicar técnicas de filtrado digital a señales industriales
- Implementar análisis de frecuencia con FFT
- Detectar anomalías usando algoritmos de ML

**Contenido:**
1. Fundamentos de procesamiento digital
   - Muestreo y teorema de Nyquist
   - Representación de señales
2. Filtrado digital con scipy
   - Filtros Butterworth, Chebyshev
   - Diseño y aplicación
3. Análisis de frecuencia
   - Transformada de Fourier (FFT)
   - Espectrograma y análisis temporal-frecuencial
4. Detección de anomalías
   - Métodos estadísticos (Z-score, IQR)
   - Isolation Forest
   - Aplicación a datos industriales

**Práctica:** Análisis de vibración para detección de fallas

---

### Módulo 04: Diseño de Circuitos (2 horas)

**Objetivos:**
- Calcular componentes de circuitos usando IA
- Analizar disipación térmica y seleccionar componentes
- Generar documentación técnica (BOM, esquemáticos)

**Contenido:**
1. Cálculos de componentes
   - Resistores en serie E24
   - Divisores de voltaje
   - Reguladores de tensión
2. Análisis térmico
   - Potencia disipada
   - Resistencia térmica
   - Selección de disipadores
3. Interfaz de sensores
   - Acondicionamiento de señal
   - Protección ESD
   - Filtrado antialiasing
4. Documentación
   - Generación de BOM
   - Esquemáticos ASCII
   - Revisión de diseños

**Práctica:** Diseño de fuente regulada dual 5V/3.3V

---

### Módulo 05: Programación de PLCs (2 horas)

**Objetivos:**
- Generar lógica Ladder para secuencias industriales
- Programar en Structured Text para control avanzado
- Documentar y diagnosticar programas de PLC

**Contenido:**
1. Fundamentos de PLC
   - Arquitectura y ciclo de scan
   - Direccionamiento de I/O
2. Lógica Ladder con IA
   - Generación de rungs básicos
   - Temporizadores y contadores
   - Enclavamientos y secuencias
3. Structured Text (IEC 61131-3)
   - Sintaxis y estructuras de control
   - Bloques de función
   - PID y control avanzado
4. Diagnóstico y documentación
   - Análisis de fallas comunes
   - Generación de pruebas FAT

**Práctica:** Secuencia de control para llenado de tanque

---

### Módulo 06: SCADA y HMI (2 horas)

**Objetivos:**
- Diseñar pantallas HMI siguiendo estándares ISA-101
- Configurar sistemas de alarmas efectivos
- Integrar análisis de datos con visualización

**Contenido:**
1. Principios de diseño HMI
   - Estándar ISA-101 High Performance
   - Ergonomía y usabilidad
2. Diseño de pantallas
   - Layout y navegación
   - Símbolos y animaciones
   - Colores y estados
3. Sistema de alarmas
   - Prioridades y setpoints
   - Deadband y delay
   - Gestión de alarmas
4. Integración con ML
   - Visualización de predicciones
   - Alarmas predictivas

**Práctica:** Diseño de HMI para estación de bombeo

---

### Módulo 07: Mantenimiento Predictivo (2 horas)

**Objetivos:**
- Comprender la evolución del mantenimiento industrial
- Implementar modelos de clasificación de fallas
- Calcular ROI de proyectos de mantenimiento predictivo

**Contenido:**
1. Fundamentos de PdM
   - Evolución: reactivo → preventivo → predictivo
   - Curva P-F y vida útil
2. Clasificación de fallas
   - Preprocesamiento de datos
   - Random Forest, XGBoost
   - Métricas: recall, precision, F1
3. Estimación de RUL
   - Modelos de degradación
   - Predicción de vida útil
4. Caso de negocio
   - Cálculo de ROI
   - Análisis de costos y beneficios

**Práctica:** Sistema de clasificación para bomba industrial

---

### Módulo 08: Proyecto Final Integrador (2 horas)

**Objetivos:**
- Integrar todos los módulos en un proyecto cohesivo
- Demostrar competencia en uso de IA para desarrollo
- Presentar solución técnica documentada

**Contenido:**
1. Definición del proyecto
   - Opciones: Motor, Tanques, Estación Meteorológica
   - Requisitos y entregables
2. Desarrollo guiado
   - Firmware ESP32
   - Backend Python
   - Dashboard de visualización
3. Integración y pruebas
   - Verificación end-to-end
   - Debugging con IA
4. Presentación
   - Demostración de funcionamiento
   - Documentación entregada

---

## Metodología

### Estrategias Didácticas
1. **Aprendizaje activo**: Énfasis en práctica sobre teoría
2. **Demostración-replicación**: Instructor muestra, estudiante replica
3. **Iteración con IA**: Refinamiento progresivo de prompts
4. **Proyecto integrador**: Aplicación holística de conocimientos

### Recursos Didácticos
- Presentaciones multimedia
- Código de ejemplo en repositorio
- Biblioteca de prompts
- Cheatsheets de referencia

---

## Evaluación

### Componentes de Evaluación

| Componente | Porcentaje | Descripción |
|------------|------------|-------------|
| Quizzes | 35% | 7 quizzes de 10 preguntas (5% c/u) |
| Ejercicios | 35% | 7 ejercicios prácticos (5% c/u) |
| Proyecto Final | 30% | Sistema IoT integrado |

### Criterios de Evaluación del Proyecto

| Criterio | Puntos |
|----------|--------|
| Firmware ESP32 funcional | 20 |
| Backend con ML | 20 |
| Dashboard de visualización | 15 |
| Integración end-to-end | 10 |
| Documentación | 10 |
| Uso efectivo de IA | 15 |
| Innovación | 10 |
| **Total** | **100** |

### Escala de Calificación

| Porcentaje | Calificación |
|------------|--------------|
| 90-100 | Excelente |
| 80-89 | Muy Bueno |
| 70-79 | Bueno |
| 60-69 | Satisfactorio |
| < 60 | Insuficiente |

**Nota mínima de aprobación:** 60%

---

## Bibliografía

### Recursos Principales
1. Documentación oficial ESP32 (Espressif)
2. scikit-learn User Guide
3. ISA-101 HMI Standard Summary
4. IEC 61131-3 Programming Industrial Automation Systems

### Recursos Complementarios
1. "Hands-On Machine Learning" - Aurélien Géron
2. "Industrial Internet of Things" - Alasdair Gilchrist
3. "Predictive Maintenance in Industry 4.0" - Varios autores

### Recursos Online
- docs.espressif.com
- scikit-learn.org
- fastapi.tiangolo.com
- streamlit.io

---

## Políticas del Curso

### Asistencia
- Mínimo 80% de asistencia para aprobar
- Justificaciones por escrito para ausencias

### Integridad Académica
- El código generado por IA debe ser comprendido y explicado
- Se permite y alienta el uso de IA como herramienta de aprendizaje
- Copiar sin entender no desarrolla competencias

### Entrega de Trabajos
- Ejercicios se entregan al final de cada módulo
- Proyecto final se entrega al final del día 2
- No se aceptan entregas tardías

---

## Cronograma Detallado

### Día 1 - Jueves

| Hora | Actividad |
|------|-----------|
| 08:00-08:15 | Bienvenida y presentación |
| 08:15-10:00 | Módulo 01: Introducción |
| 10:00-10:15 | Receso |
| 10:15-12:00 | Módulo 02: Microcontroladores |
| 12:00-12:15 | Quiz y ejercicio M01-M02 |
| 12:15-13:15 | Almuerzo |
| 13:15-15:00 | Módulo 03: Procesamiento de Señales |
| 15:00-15:15 | Receso |
| 15:15-17:00 | Módulo 04: Diseño de Circuitos |
| 17:00-17:30 | Quiz y ejercicio M03-M04 |

### Día 2 - Viernes

| Hora | Actividad |
|------|-----------|
| 08:00-09:45 | Módulo 05: Programación PLC |
| 09:45-10:00 | Receso |
| 10:00-11:45 | Módulo 06: SCADA y HMI |
| 11:45-12:15 | Quiz y ejercicio M05-M06 |
| 12:15-13:15 | Almuerzo |
| 13:15-15:00 | Módulo 07: Mantenimiento Predictivo |
| 15:00-15:15 | Quiz y ejercicio M07 |
| 15:15-15:30 | Receso |
| 15:30-17:00 | Módulo 08: Proyecto Final |
| 17:00-17:30 | Presentaciones y cierre |

---

*Syllabus aprobado para el período de cursos de verano*
*Facultad Politécnica - Universidad Nacional de Asunción*
