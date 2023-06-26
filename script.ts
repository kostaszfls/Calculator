// script.ts
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display") as HTMLInputElement;
  const clearButton = document.getElementById("clear") as HTMLButtonElement;
  const equalsButton = document.getElementById("equals") as HTMLButtonElement;
  const numberButtons = document.querySelectorAll(".number");
  const operatorButtons = document.querySelectorAll(".operator");

  let currentOperand = "";
  let previousOperand = "";
  let currentOperator = "";

  clearButton.addEventListener("click", clearDisplay);
  equalsButton.addEventListener("click", evaluateExpression);

  numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button as HTMLButtonElement))
  );

  operatorButtons.forEach((button) =>
    button.addEventListener("click", () => chooseOperator(button as HTMLButtonElement))
  );

  function clearDisplay() {
    display.value = "";
    currentOperand = "";
    previousOperand = "";
    currentOperator = "";
  }

  function appendNumber(button: HTMLButtonElement) {
    const number = button.getAttribute("value");
    currentOperand += number;
    display.value += number;
  }

  function chooseOperator(button: HTMLButtonElement) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      evaluateExpression();
    }
    currentOperator = button.getAttribute("value");
    previousOperand = currentOperand;
    currentOperand = "";
  }

  function evaluateExpression() {
    if (currentOperand === "" || previousOperand === "") return;

    const current = parseFloat(currentOperand);
    const previous = parseFloat(previousOperand);

    let result: number;

    switch (currentOperator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      default:
        return;
    }

    display.value = result.toString();
    currentOperand = result.toString();
    previousOperand = "";
    currentOperator = "";
  }
});
