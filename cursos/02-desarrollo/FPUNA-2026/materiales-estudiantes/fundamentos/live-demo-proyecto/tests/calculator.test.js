/**
 * CalculadoraPro QA Suite
 * Simple automated verification of the Core Logic.
 */

const Calculator = require('../src/calculator');
const calc = new Calculator();

const assert = (condition, message) => {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
};

console.log("--- Iniciando Auditoría Técnica (Calculadora Pro) ---\n");

// Test Suma
assert(calc.add(0.1, 0.2) === 0.3, "Suma con precisión decimal (0.1 + 0.2)");

// Test Resta
assert(calc.subtract(1, 0.9) === 0.1, "Resta con precisión decimal (1 - 0.9)");

// Test Multiplicación
assert(calc.multiply(0.2, 0.3) === 0.06, "Multiplicación con precisión decimal (0.2 * 0.3)");

// Test División
assert(calc.divide(10, 2) === 5, "División simple");

// Test División por Cero
try {
  calc.divide(10, 0);
  assert(false, "Debería haber fallado por división por cero");
} catch (e) {
  assert(e.message === "DIV_BY_ZERO", "Manejo proactivo de error (DIV_BY_ZERO)");
}

// Test Porcentaje
assert(calc.percentage(10, 200) === 20, "Cálculo de porcentaje (10% de 200)");

console.log("\n--- Auditoría Finalizada: 100% SUCCESS ---");
