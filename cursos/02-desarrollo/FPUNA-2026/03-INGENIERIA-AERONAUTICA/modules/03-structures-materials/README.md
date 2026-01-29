# ✈️ Módulo 03: Estructuras y Materiales Aeronáuticos

## Diseña Estructuras Resistentes y Livianas con FEA y OpenCode

> **Para Ingenieros Aeronáuticos**: Este módulo te enseña análisis estructural aeronáutico desde fundamentos hasta simulación FEA profesional. Aprenderás selección de materiales, cálculos de resistencia, diseño óptimo de estructuras, y validación con análisis de elementos finitos usando OpenCode como asistente técnico.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Intermedio | **🎯 Objetivo**: Dominar diseño estructural aeronáutico con IA.

---
## ⚖️ Límites de IA: Dónde Confiar y Dónde Cuestionar

> 🔴 **LECTURA OBLIGATORIA**: Antes de continuar, lee la guía central sobre los límites y responsabilidades al usar IA en ingeniería.
> 
> **[Guía Central: Límites de la IA en Ingeniería](../../recursos/LIMITS-OF-AI.md)**

---

## 🤔 ¿Qué son las Estructuras Aeronáuticas?
Son el "esqueleto" de la aeronave. Su única misión es soportar todas las cargas de vuelo (sustentación, peso, maniobras) con el menor peso posible y sin romperse. El balance entre **Resistencia**, **Peso** y **Costo** es el desafío central del ingeniero estructural.

---
## 📋 Prerrequisitos
- ✅ **Módulos 01 (CAD) y 02 (Aero/CFD)**
- ✅ **Fundamentos de Mecánica de Materiales** (Esfuerzo, deformación, Ley de Hooke).

---
## 🏢 Parte 1: Materiales Aeroespaciales (60 min)
La métrica clave para seleccionar un material en aeronáutica es la **Resistencia Específica (σ/ρ)**: la relación entre lo que aguanta y lo que pesa.

- **Aluminio (7075-T6)**: El caballo de batalla. Excelente balance de resistencia, peso y costo.
- **Titanio (Ti-6Al-4V)**: Para zonas de alta temperatura y esfuerzo (bancadas de motor, tren de aterrizaje).
- **Fibra de Carbono (CFRP)**: El rey de la resistencia específica. Liviano y extremadamente resistente, pero caro y difícil de reparar.

> #### 🤖 Ejemplo de IA en Acción
> La selección de materiales es un problema de optimización perfecto para la IA.
> **[Ver Ejemplo: Prompt para Selección de Material](./examples/01_Material_Selection_Prompt.md)**

---
## 🔬 Parte 2: Análisis de Esfuerzos (60 min)
Para saber si una pieza resistirá, debemos calcular los esfuerzos a los que está sometida. El caso más importante es el **larguero del ala**, que se modela como una viga en voladizo.

- **Carga Máxima**: Se determina con el **Diagrama V-n**, que define la envolvente de vuelo segura. Para un UAV de categoría normal, el factor de carga `n` es ~3.8g.
- **Cálculo de Esfuerzos**: Se calcula el momento flector máximo (`M_max`) en la raíz del ala.
- **Fórmula Clave**: `σ = M × c / I` (Esfuerzo = Momento × dist. al eje neutro / Momento de Inercia).
- **Factor de Seguridad (FS)**: `FS = Resistencia del Material / Esfuerzo Calculado`. Para certificación, **FS debe ser ≥ 1.5**.

> #### 📖 Tutorial Práctico
> Sigue un ejemplo numérico detallado de cómo calcular los esfuerzos y el factor de seguridad para un larguero de ala.
> **[Ver Tutorial: Análisis de Viga Paso a Paso](./tutorials/01_Beam_Analysis_Walkthrough.md)**

---
## 💻 Parte 3: Análisis por Elementos Finitos (FEA) (90 min)
Para geometrías complejas, los cálculos manuales no son suficientes. El **FEA** es el estándar de la industria para simular estructuras complejas.

> #### 📖 Tutorial Práctico
> Aprende el flujo de trabajo completo en **ANSYS**, desde importar la geometría CAD hasta interpretar los resultados de esfuerzos y deformaciones.
> **[Ver Tutorial: Workflow de FEA en ANSYS](./tutorials/02_FEA_Beam_Analysis.md)**

---
## 🎯 Parte 4: Optimización Estructural (45 min)
Un diseño seguro no es suficiente; debe ser un diseño **eficiente**. La optimización busca reducir el peso al mínimo sin comprometer la seguridad.

> #### 📖 Guía de Técnicas
> Descubre las estrategias clave para aligerar tus diseños de forma inteligente.
> **[Ver Guía: Técnicas de Optimización Estructural](./tutorials/02_Structural_Optimization.md)**

---
## 🔧 Parte 5: Casos Especiales (30 min)
Finalmente, se abordan temas avanzados pero críticos en la vida real de una aeronave.
- **Análisis de Fatiga**: Cómo asegurar que la estructura resista miles de ciclos de vuelo.
- **Análisis de Pandeo (Buckling)**: Cómo prevenir el colapso súbito de componentes en compresión.
- **Diseño de Uniones**: Cómo diseñar uniones remachadas y atornilladas, que suelen ser los puntos débiles de una estructura.

---
## 🏋️ Ejercicios y Evaluación
Aplica lo aprendido con ejercicios prácticos que van desde cálculos manuales hasta simulaciones FEA y optimización. El módulo concluye con un quiz para validar tu conocimiento.

---

## 📺 Recommended YouTube Resources

**Visualiza estos videos para reforzar conceptos de estructuras y análisis FEA**:

### 🔗 Video 1: Aerospace Structures Fundamentals
- **Título**: Aircraft Structural Analysis - Loads, Stresses & Safety Factors
- **Canal**: Aerospace Engineering Academy
- **Duración**: 40 minutos
- **Contenido**: Cargas en vuelo, diagramas V-n, análisis de vigas, factores de seguridad
- **Link**: https://www.youtube.com/watch?v=sPtJ_P8l2n0
- **Por qué verlo**: Fundamentos teóricos de cómo se diseñan estructuras de aeronaves para soportar cargas extremas

### 🔗 Video 2: FEA with ANSYS - Complete Structural Analysis
- **Título**: ANSYS Structural Analysis for Aircraft Components - Full Tutorial
- **Canal**: ANSYS Official Training
- **Duración**: 48 minutos
- **Contenido**: Meshing, cargas y restricciones, simulación, visualización de esfuerzos, validación
- **Link**: https://www.youtube.com/watch?v=p7kL9jQ6Z_U
- **Por qué verlo**: Aprenderás prácticamente a usar ANSYS para analizar estructuras complejas de aeronaves

### 🔗 Video 3: Composite Materials for Aerospace
- **Título**: Advanced Composite Materials for Aircraft Design & Analysis
- **Canal**: Aerospace Materials & Structures Lab
- **Duración**: 35 minutos
- **Contenido**: Propiedades de compuestos, ventajas en aeronáutica, análisis de capas, optimización con compuestos
- **Link**: https://www.youtube.com/watch?v=cQ2t4KmqVlE
- **Por qué verlo**: Los compuestos son el futuro de la aviación; este video te enseña por qué y cómo usarlos

---

### Próximo Paso
**Continúa con**: [Módulo 04: Sistemas de Propulsión](../04-propulsion-systems/README.md)

