# ✈️ Módulo 02: Aerodinámica y CFD con IA

## Simula y Optimiza Flujos Aerodinámicos con Herramientas Computacionales

> **Para Ingenieros Aeronáuticos**: Este módulo te enseña los fundamentos de aerodinámica aplicada y cómo simular flujos usando CFD (Computational Fluid Dynamics). Aprenderás análisis de perfiles alares, optimización aerodinámica, y visualización de resultados con OpenCode como asistente de simulación.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Intermedio | **🎯 Objetivo**: Dominar simulación CFD y optimización aerodinámica con IA

---
## ⚖️ Límites de IA: Dónde Confiar y Dónde Cuestionar

> 🔴 **LECTURA OBLIGATORIA**: Antes de continuar, lee la guía central sobre los límites y responsabilidades al usar IA en ingeniería.
> 
> **[Guía Central: Límites de la IA en Ingeniería](../../recursos/LIMITS-OF-AI.md)**

---

## 🤔 ¿Qué es la Aerodinámica Computacional (CFD)?
CFD es, en esencia, un **túnel de viento digital**. En lugar de construir un modelo físico caro y probarlo, creamos un modelo digital y simulamos el flujo de aire a su alrededor para predecir sustentación, resistencia y otros efectos aerodinámicos.

### ¿Por Qué es Crítico?
- **Optimización Rápida**: Probar 50 variantes de un ala en días en lugar de meses.
- **Reducción de Costos**: Una simulación CFD cuesta una fracción mínima de una prueba en túnel de viento.
- **Certificación**: Las autoridades aeronáuticas (DINAC, FAA) requieren datos aerodinámicos detallados que el CFD puede proporcionar.

---
## 📋 Prerrequisitos
- ✅ **Módulo 01: CAD con IA** (Obligatorio)
- ✅ **Física de Fluidos Básica** (Presión, velocidad, densidad)

---
## 🏢 Parte 1: Fundamentos de Aerodinámica (60 min)
Toda la performance de una aeronave se reduce a cuatro fuerzas: **Sustentación (Lift)**, **Peso (Weight)**, **Empuje (Thrust)**, y **Arrastre (Drag)**. En vuelo nivelado, Lift = Weight y Thrust = Drag.

### Ecuaciones Clave
- **Sustentación**: `L = CL × q × S`
- **Arrastre**: `D = CD × q × S`
- **Eficiencia (L/D)**: `CL / CD` (¡el número más importante en aerodinámica!)
- **Presión Dinámica (q)**: `0.5 × ρ × V²`
- **Número de Reynolds (Re)**: `(ρ × V × L) / µ` (determina si el flujo es laminar o turbulento)

> #### 🤖 Ejemplo de IA en Acción
> Puedes usar OpenCode para hacer estos cálculos por ti.
> **[Ver Ejemplo: Prompt para Cálculo de Performance](./examples/01_Performance_Calculation_Prompt.md)**

---
## 🔬 Parte 2: Análisis de Perfiles 2D con XFoil (90 min)
**XFoil** es una herramienta rápida y precisa para analizar perfiles alares en 2D. Es el primer paso en cualquier diseño aerodinámico serio.

> #### 📖 Tutorial Práctico
> Aprende a obtener la curva de sustentación (CL vs alfa) y la polar de arrastre de un perfil NACA.
> **[Ver Tutorial: Análisis de Perfil con XFoil](./tutorials/01_xfoil_analysis.md)**

---
## 🌐 Parte 3: Simulación 3D con CFD (90 min)
Mientras que XFoil es 2D, el CFD 3D simula el ala completa, capturando efectos tridimensionales cruciales como los **vórtices de punta de ala** (wingtip vortices) que generan el arrastre inducido.

> #### 📖 Tutorial Práctico
> Sigue el flujo de trabajo profesional en **ANSYS Fluent** para simular un ala de UAV completa, desde la malla hasta el post-procesamiento.
> **[Ver Tutorial: Workflow de CFD en ANSYS Fluent](./tutorials/02_ansys_fluent_workflow.md)**

> #### 🔧 Alternativa Open Source: OpenFOAM
> Para aquellos que deseen un control total y no depender de licencias comerciales, OpenFOAM es la herramienta estándar en la academia y la investigación.
> **[Ver Tutorial: Introducción a OpenFOAM](./tutorials/03_OpenFOAM_Intro.md)**

---
## 🎯 Parte 4: Optimización Aerodinámica con IA (45 min)
Aquí es donde la IA realmente brilla. En lugar de probar diseños manualmente, puedes instruir a la IA para que explore sistemáticamente un espacio de diseño y encuentre la configuración óptima.

> #### 📖 Técnicas Avanzadas
> Aprende sobre Algoritmos Genéticos y Modelos Sustitutos (Surrogate Models) para acelerar la optimización.
> **[Ver Guía: Técnicas de Optimización con IA](./tutorials/04_AI_Optimization_Techniques.md)**

> #### 🤖 Ejemplo de IA en Acción
> Observa un prompt que le pide a OpenCode que escriba un script para optimizar un perfil NACA, probando 27 variantes automáticamente.
> **[Ver Ejemplo: Prompt para Optimización de Airfoil](./examples/02_XFoil_Optimization_Prompt.md)**

---
## 🏋️ Ejercicios y Evaluación
Ahora es tu turno de aplicar lo aprendido. Los ejercicios te guiarán desde análisis básicos en XFoil hasta una simulación CFD 3D completa.

---

## 📺 Recommended YouTube Resources

**Visualiza estos videos para reforzar conceptos de aerodinámica y CFD**:

### 🔗 Video 1: CFD Fundamentals for Aeronautical Engineers
- **Título**: Introduction to Computational Fluid Dynamics (CFD) for Aircraft Design
- **Canal**: Aerospace Engineering Academy
- **Duración**: 45 minutos
- **Contenido**: Ecuaciones de Navier-Stokes, meshes, turbulence modeling, post-processing
- **Link**: https://www.youtube.com/watch?v=aU3_KQHEd4A
- **Por qué verlo**: Fundamentos matemáticos y conceptuales de CFD que necesitas para entender simulaciones complejas

### 🔗 Video 2: XFoil Tutorial - Airfoil Analysis for Drones
- **Título**: Complete XFoil Workflow - Design & Analyze Aircraft Airfoils
- **Canal**: Drone Engineering Lab
- **Duración**: 38 minutos
- **Contenido**: Análisis 2D de perfiles, curvas de sustentación, polares de arrastre, optimización
- **Link**: https://www.youtube.com/watch?v=TzHGhYOcqcY
- **Por qué verlo**: Aprenderás prácticamente a usar XFoil, herramienta clave en el módulo

### 🔗 Video 3: ANSYS Fluent CFD Workflow - Complete Tutorial
- **Título**: ANSYS Fluent for Aerodynamic Design - Full Walkthrough
- **Canal**: ANSYS Official Training
- **Duración**: 52 minutos
- **Contenido**: Setup de modelos 3D, meshing, boundary conditions, simulación, post-processing
- **Link**: https://www.youtube.com/watch?v=jLLUHLW_E8E
- **Por qué verlo**: Paso a paso del software profesional que usarás en la parte 3 del módulo

---

### Próximo Paso
**Continúa con**: [Módulo 03: Estructuras y Materiales](../03-structures-materials/README.md)

