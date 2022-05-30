const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
    /// Replace current display value if first number is entered //
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        /// if cuurent display value is 0, replace it, if not add a number//

        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent =
            displayValue === "0" ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed , dont add add decimal //
    if (awaitingNextValue) return;
    // If no decimal , add only one//
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}
/* calculating the first and second value based on the operator 
using Object*/
const calculate = {
    '/': (firtNumber, secondNumber) => firtNumber / secondNumber,

    '*': (firtNumber, secondNumber) => firtNumber * secondNumber,

    '+': (firtNumber, secondNumber) => firtNumber + secondNumber,

    '-': (firtNumber, secondNumber) => firtNumber - secondNumber,

    '=': (firtNumber, secondNumber) => secondNumber,
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Disable mutliple Operators //
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return
    };
    // Assign the value if no number //
    if (!firstValue) {
        firstValue = currentValue;
    } else {

        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // waiting for next input, store operator
    awaitingNextValue = true;
    operatorValue = operator;

}

// Adding Event listeners for numbers,operators, and decimals //
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        // checks for inputs from the calculator//
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains("operators")) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", () => addDecimal());
    }
});
// Reset All values, display Function //
function resetAll() {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;

    calculatorDisplay.textContent = "0";
}
// Event Listener //
clearBtn.addEventListener("click", resetAll);