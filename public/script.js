"use strict";
var _a, _b;
class Calculator {
    constructor(displayElement) {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
        this.displayElement = displayElement;
    }
    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.'))
            return;
        this.currentValue = this.currentValue.toString() + number.toString();
        this.updateDisplay();
    }
    chooseOperation(operation) {
        if (this.currentValue === '')
            return;
        if (this.previousValue !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentValue = computation.toString();
        this.operation = null;
        this.previousValue = '';
        this.updateDisplay();
    }
    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
        this.updateDisplay();
    }
    updateDisplay() {
        this.displayElement.value = this.currentValue || '0';
    }
}
const displayElement = document.getElementById('display');
const calculator = new Calculator(displayElement);
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
            calculator.appendNumber(value);
        }
    });
});
(_a = document.getElementById('clear')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    calculator.clear();
});
(_b = document.getElementById('equal')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    calculator.compute();
});
document.querySelectorAll('[data-value="+"], [data-value="-"], [data-value="*"], [data-value="/"]').forEach(button => {
    button.addEventListener('click', () => {
        const operation = button.getAttribute('data-value');
        if (operation) {
            calculator.chooseOperation(operation);
        }
    });
});
