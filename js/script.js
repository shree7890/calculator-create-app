class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand + number;
  }

  choseOperation(operation) {
    if (!this.currentOperand) return;
    if (this.currentOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    const floatNum = parseFloat(number);
    if (isNaN(floatNum)) return "";
    return floatNum.toLocaleString("en");
  }
  updateDisplay() {
    this.currentOperandElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation) {
      this.previousOperandElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = this.getDisplayNumber(
        this.previousOperand
      );
    }
  }
}

// selection starts
function $(id) {
  return document.getElementById(id);
}

const previousOperandElement = $("output").children[0];
const currentOperandElement = $("output").children[1];
const ACButton = $("allClear");
const deleteButton = $("delete");
const equalsBtn = $("total");
const operationButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
// selection starts

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", function (e) {
  calculator.compute();
  calculator.updateDisplay();
});

ACButton.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});
