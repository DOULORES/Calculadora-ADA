class Calculator {
    private displayElement: HTMLInputElement;
    private currentValue: string = '';
    private previousValue: string = '';
    private operation: string | null = null;

    constructor(displayElement: HTMLInputElement) {
        this.displayElement = displayElement;
    }

    appendNumber(number: string) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation: string) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    compute() {
        let computation: number;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        if (isNaN(prev) || isNaN(current)) return;

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

const displayElement = document.getElementById('display') as HTMLInputElement;
const calculator = new Calculator(displayElement);

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
            calculator.appendNumber(value);
        }
    });
});

document.getElementById('clear')?.addEventListener('click', () => {
    calculator.clear();
});

document.getElementById('equal')?.addEventListener('click', () => {
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