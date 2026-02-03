# 🚀 Módulo 04: Sistemas de Propulsión

## Domina Motores y Performance de Aeronaves con Termodinámica y OpenCode

> **Para Ingenieros Aeronáuticos**: Este módulo te enseña diseño y análisis de sistemas de propulsión desde fundamentos termodinámicos hasta cálculos de performance completos. Aprenderás selección de motores, cálculos de empuje y autonomía, y selección óptima usando OpenCode.

**⏱️ Duración**: 4 horas | **👤 Nivel**: Intermedio | **🎯 Objetivo**: Dominar el análisis de propulsión aeronáutica con IA.

---
## ⚖️ Límites de IA: Dónde Confiar y Dónde Cuestionar

> 🔴 **LECTURA OBLIGATORIA**: Antes de continuar, lee la guía central sobre los límites y responsabilidades al usar IA en ingeniería.
> 
> **[Guía Central: Límites de la IA en Ingeniería](../../recursos/LIMITS-OF-AI.md)**

---

## 🤔 ¿Qué es un Sistema de Propulsión?
Es el "corazón" de la aeronave: el conjunto de componentes que convierte energía (combustible o eléctrica) en **Empuje** para vencer la resistencia del aire. El trade-off fundamental es entre **Autonomía**, **Potencia** y **Peso**.

---
## 📋 Prerrequisitos
- ✅ Módulos 01, 02 y 03 del track de Aeronáutica.
- ✅ Fundamentos de Termodinámica (1er Principio, eficiencia).

---
## 🏢 Parte 1: Tipos de Motores Aeronáuticos (60 min)
Desde los motores eléctricos de un dron hasta los turbofans de un jet comercial, cada uno tiene su nicho.
- **Motores Eléctricos (Brushless)**: Ideales para UAVs. Alta eficiencia, silenciosos y ligeros. Su limitación es la densidad energética de las baterías.
- **Motores de Pistón**: Dominan la aviación general. Mayor autonomía que los eléctricos gracias a la alta densidad energética de la gasolina.
- **Turbinas de Gas (Turbojet, Turbofan)**: Para alta velocidad y altitud. Insuperables en potencia y relación empuje/peso, pero complejos y caros.

---
## 🔬 Parte 2: Termodinámica y Performance (120 min)
Aquí es donde aplicamos la física para predecir el comportamiento de nuestro sistema.

### Ecuaciones Clave
- **Empuje (T)**: `T ≈ ṁ × ΔV` (El empuje es el flujo de masa de aire multiplicado por el cambio de velocidad que le imparte el motor).
- **Potencia de Empuje**: `P_thrust = T × V_vuelo`.
- **Eficiencia Propulsiva (η_prop)**: `η_prop = 2 / (1 + V_salida / V_vuelo)`. Mide qué tan bien la hélice o fan convierte la potencia del motor en empuje útil.

> #### 📖 Tutorial Práctico
> Aprende a calcular el empuje, la potencia y la autonomía de un sistema de propulsión para un UAV paso a paso.
> **[Ver Tutorial: Cálculos de Performance](./tutorials/01_Performance_Calculations.md)**

> #### 🤖 Ejemplo de IA en Acción
> Usa este prompt para que OpenCode realice un análisis de performance completo por ti.
> **[Ver Ejemplo: Prompt de Análisis de Performance](./examples/01_System_Performance_Prompt.md)**

---
## 🎯 Parte 3: Selección y Optimización (60 min)
Elegir el sistema propulsor correcto es un ejercicio de optimización multi-objetivo.

### Metodología de Selección
1.  **Definir Requerimientos**: ¿Cuál es la misión? ¿Autonomía, velocidad o capacidad de carga?
2.  **Calcular Empuje Mínimo**: `T_min = Peso × T/W_ratio`. Para un dron, T/W debe ser > 1.5 para buena maniobrabilidad.
3.  **Calcular Energía Requerida**: `E = Potencia × Tiempo`. Esto define el tamaño de la batería.
4.  **Analizar Trade-offs**: Usando una **Matriz de Decisión**, se comparan diferentes combinaciones de motor, hélice y batería, ponderando criterios como peso, costo, eficiencia y disponibilidad local.

> #### 🤖 Ejemplo de IA en Acción
> Puedes pedirle a OpenCode que cree una herramienta interactiva para la selección de componentes.
> **[Ver Ejemplo: Prompt para Herramienta de Selección](./examples/02_Propulsion_Selection_Tool_Prompt.md)**

---
## 🏋️ Ejercicios y Evaluación
Aplica los conceptos para diseñar y optimizar un sistema de propulsión para un UAV de fumigación, y resuelve problemas comunes como sobrecalentamiento y vibraciones.

---

## 📺 Recommended YouTube Resources

**Visualiza estos videos para reforzar conceptos de propulsión y performance**:

### 🔗 Video 1: Electric Propulsion Systems for UAVs
- **Título**: Electric Motor & Battery Selection for Drones - Complete Guide
- **Canal**: Drone Engineering Lab
- **Duración**: 42 minutos
- **Contenido**: Selección de motores brushless, cálculo de KV, selección de hélices, cálculos de empuje
- **Link**: https://www.youtube.com/watch?v=sZJ_Vq-6-uE
- **Por qué verlo**: Aprenderás cómo seleccionar componentes reales que usarás en el proyecto capstone

### 🔗 Video 2: Jet Engine Fundamentals & Performance
- **Título**: Jet Engine Theory for Aircraft Design
- **Canal**: Aerospace Engineering Academy
- **Duración**: 51 minutos
- **Contenido**: Ciclo Brayton, empuje, consumo específico, diseño de compresores y turbinas
- **Link**: https://www.youtube.com/watch?v=y7kHUBqVfBc
- **Por qué verlo**: Esencial si diseñas UAVs con motor a combustión; entiende cómo funcionan realmente los turbomotores

### 🔗 Video 3: Battery Technology for Aircraft
- **Título**: Energy Management in Electric Aircraft - Battery Selection & Optimization
- **Canal**: MIT Aeronautics & Astronautics
- **Duración**: 39 minutos
- **Contenido**: Tecnología Li-Po y LiPo4, curvas de descarga, cálculo de autonomía, seguridad
- **Link**: https://www.youtube.com/watch?v=wKnLQT8ZFpc
- **Por qué verlo**: Las baterías son críticas para autonomía; aprenderás a maximizar el tiempo de vuelo

---

### Próximo Paso
**Continúa con**: [Módulo 05: Diseño Integral de Aeronaves](../05-aircraft-design/README.md)

