document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentValue = '';
    let storedValue = '';
    let operator = '';
    let resultDisplayed = false;
    const maxDigits = 30;

    const updateDisplay = (value) => {
        if (value.length > maxDigits) {
            display.innerText = 'Error';
        } else {
            display.innerText = value;
        }
    };

    const handleNumberClick = (number) => {
        if (resultDisplayed) {
            currentValue = number;
            resultDisplayed = false;
        } else {
            if (currentValue.length < maxDigits) {
                currentValue += number;
            }
        }
        updateDisplay(currentValue);
    };

    const handleOperatorClick = (op) => {
        if (currentValue === '') return;
        if (storedValue !== '' && !resultDisplayed) {
            handleEqualClick();
        }
        operator = op;
        storedValue = currentValue;
        currentValue = '';
        updateDisplay(`${storedValue} ${operator}`);
    };

    const handleClearClick = () => {
        currentValue = '';
        storedValue = '';
        operator = '';
        updateDisplay('0');
    };

    const handleEqualClick = () => {
        if (currentValue === '' || storedValue === '' || operator === '') return;
        let result;
        const num1 = parseFloat(storedValue);
        const num2 = parseFloat(currentValue);
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            default:
                return;
        }
        currentValue = result.toString();
        if (currentValue.length > maxDigits) {
            currentValue = 'Error';
        }
        operator = '';
        storedValue = '';
        updateDisplay(currentValue);
        resultDisplayed = true;
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (button.classList.contains('operator')) {
                handleOperatorClick(value);
            } else if (button.classList.contains('clear')) {
                handleClearClick();
            } else if (button.classList.contains('equal')) {
                handleEqualClick();
            } else {
                handleNumberClick(value);
            }
        });
    });
});
