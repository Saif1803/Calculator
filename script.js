// JavaScript for the Calculator

document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('inputbox');
    const buttons = document.querySelectorAll('.button');

    let currentInput = '';
    let operator = null;
    let previousInput = '';

    // Function to update the display
    function updateDisplay(value) {
        inputBox.value = value;
    }

    // Function to handle number and operator button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent;

            if (buttonText >= '0' && buttonText <= '9') {
                currentInput += buttonText;
                updateDisplay(currentInput);
            } else if (buttonText === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    updateDisplay(currentInput);
                }
            } else if (buttonText === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
                updateDisplay('0');
            } else if (buttonText === '=') {
                if (operator && previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    operator = null;
                    previousInput = '';
                    updateDisplay(currentInput);
                }
            } else if (buttonText === '%') {
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    updateDisplay(currentInput);
                }
            } else {
                if (currentInput !== '') {
                    if (previousInput === '') {
                        previousInput = currentInput;
                    } else if (operator) {
                        previousInput = calculate(previousInput, currentInput, operator);
                    }
                    operator = buttonText;
                    currentInput = '';
                    updateDisplay(operator);
                }
            }
        });
    });

    // Function to handle calculations
    function calculate(num1, num2, operator) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case 'x':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            case '%':
                return (a % b).toString();
            default:
                return '';
        }
    }
});
