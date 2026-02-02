/**
 * CalculadoraPro Engine
 * Logic for mathematical operations with precision safety.
 */

class Calculator {
  constructor() {
    this.history = [];
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('calc_history');
      if (saved) this.history = JSON.parse(saved);
    }
  }

  /**
   * Safe addition
   */
  add(a, b) {
    return (a * 1000 + b * 1000) / 1000;
  }

  /**
   * Safe subtraction
   */
  subtract(a, b) {
    return (a * 1000 - b * 1000) / 1000;
  }

  /**
   * Safe multiplication
   */
  multiply(a, b) {
    return (a * 1000 * (b * 1000)) / 1000000;
  }

  /**
   * Safe division with zero-check
   */
  divide(a, b) {
    if (b === 0) throw new Error("DIV_BY_ZERO");
    return (a * 1000) / (b * 1000);
  }

  /**
   * Percentage calculation
   */
  percentage(value, total) {
    return (value / 100) * total;
  }

  /**
   * Save operation to history
   */
  saveToHistory(operation, result) {
    const entry = {
      timestamp: new Date().toISOString(),
      operation,
      result
    };
    this.history.unshift(entry);
    if (this.history.length > 20) this.history.pop();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('calc_history', JSON.stringify(this.history));
    }
    return entry;
  }

  clearHistory() {
    this.history = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('calc_history');
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculator;
} else {
  window.Calculator = Calculator;
}
