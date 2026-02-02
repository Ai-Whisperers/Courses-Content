# Proyecto: Calculadora Pro (Elite Edition)

## 🎯 Visión

Este proyecto es la demostración técnica del Módulo 05 de FPUNA. Muestra cómo construir una aplicación robusta, modular y premium delegando el 100% de la ejecución a un agente de IA.

## 🛠️ Stack Tecnologico

- **Runtime**: Vanilla JavaScript (ES6+)
- **UI**: HTML5, CSS3 (Modern features)
- **QA**: No libraries required (Custom lightweight test runner for educational purposes)

## 🏗️ Guía de Arquitectura

- `src/calculator.js`: Motor matemático puro (Cerebro). Libre de efectos secundarios de UI.
- `src/ui.js`: Capa de interacción (Piel). Maneja DOM events y renderizado.
- `src/styles.css`: Definición estética de alta gama.
- `tests/`: Pruebas de validación de lógica modular.

## 📜 Reglas de Oro

- ✅ MODULARIDAD: La lógica matemática NUNCA debe tocar el DOM.
- ✅ PRECISIÓN: Usar multiplicadores para evitar errores de coma flotante en JS.
- ✅ ESTÉTICA: Seguir principios de Glassmorphism y Dark Mode nativo.
- ✅ PROACTIVIDAD: El código debe manejar errores de división por cero y entradas nulas.

## 🚀 Comandos

- `Abrir index.html`: Lanzar la aplicación.
- `node tests/calculator.test.js`: Ejecutar validaciones de lógica.
