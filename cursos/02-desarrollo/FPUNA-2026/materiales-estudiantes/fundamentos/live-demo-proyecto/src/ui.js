/**
 * CalculadoraPro UI Handler
 * Connects the Engine with the DOM.
 */

class CalculatorUI {
  constructor() {
    this.engine = new Calculator();
    this.currentValue = '0';
    this.prevValue = '';
    this.operator = null;
    this.shouldResetScreen = false;

    // DOM Elements
    this.mainDisplay = document.getElementById('main-display');
    this.prevDisplay = document.getElementById('prev-operation');
    this.historyList = document.getElementById('history-list');

    this.updateHistory();
  }

  appendNumber(num) {
    if (this.currentValue === '0' || this.shouldResetScreen) {
      this.currentValue = num === '.' ? '0.' : num;
      this.shouldResetScreen = false;
    } else {
      if (num === '.' && this.currentValue.includes('.')) return;
      this.currentValue += num;
    }
    this.updateDisplay();
  }

  setOperator(op) {
    if (this.operator !== null) this.calculate();
    this.prevValue = this.currentValue;
    this.operator = op;
    this.shouldResetScreen = true;
    this.updateDisplay();
  }

  calculate() {
    if (this.operator === null || this.shouldResetScreen) return;

    let result;
    const a = parseFloat(this.prevValue);
    const b = parseFloat(this.currentValue);
    const opRaw = `${this.prevValue} ${this.operator} ${this.currentValue}`;

    try {
      switch (this.operator) {
        case '+': result = this.engine.add(a, b); break;
        case '-': result = this.engine.subtract(a, b); break;
        case '*': result = this.engine.multiply(a, b); break;
        case '/': result = this.engine.divide(a, b); break;
        case '%': result = this.engine.percentage(a, b); break;
        default: return;
      }

      this.currentValue = result.toString();
      this.engine.saveToHistory(opRaw, result);
      this.operator = null;
      this.shouldResetScreen = true;
      this.updateDisplay();
      this.updateHistory();
    } catch (e) {
      this.handleError(e.message);
    }
  }

  clear() {
    this.currentValue = '0';
    this.prevValue = '';
    this.operator = null;
    this.updateDisplay();
  }

  toggleSign() {
    this.currentValue = (parseFloat(this.currentValue) * -1).toString();
    this.updateDisplay();
  }

  handleError(msg) {
    this.currentValue = "ERROR";
    this.shouldResetScreen = true;
    this.updateDisplay();
    setTimeout(() => this.clear(), 1500);
  }

  updateDisplay() {
    this.mainDisplay.innerText = this.currentValue;
    if (this.operator) {
      this.prevDisplay.innerText = `${this.prevValue} ${this.operator}`;
    } else {
      this.prevDisplay.innerText = '';
    }
  }

  updateHistory() {
    this.historyList.innerHTML = '';
    this.engine.history.forEach(item => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `<span>${item.operation}</span> <span>${item.result}</span>`;
      this.historyList.appendChild(li);
    });
  }

  clearHistory() {
    this.engine.clearHistory();
    this.updateHistory();
  }
}

// Global instance
const calcUI = new CalculatorUI();
