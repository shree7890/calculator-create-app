/* 
calculator create app:

step:1   element selected
step:2 number clicked in display show
step:3 opertator cliked number computed current value and previous value
step 4: equality for computed number and operator
step 5: delete button
step 6: all clear add button

*/

// element selector

const previousOperand = document.getElementById("priviousOperand");
const currentOperand = document.getElementById("currentOperand");
const allClear = document.getElementById("allClear");
const deleteItem = document.getElementById("delete");
const total = document.getElementById("total");
const operator = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");

let previousOperandValue = "";
let currentOperandValue = "";
let operatorValue = "";

function appendNumber(number) {
  if (number === "." && currentOperandValue.includes(".")) {
    return;
  }
  if (currentOperandValue.length === 12) {
    return;
  }
  currentOperandValue += number;
}
function getDisplayNumber(number) {
  const floatNum = parseFloat(number);
  if (isNaN(floatNum)) {
    return "";
  }
  return floatNum.toLocaleString("en");
}

function displayValue() {
  currentOperand.innerText = getDisplayNumber(currentOperandValue);
  if (operatorValue) {
    previousOperand.innerText = `${getDisplayNumber(
      previousOperandValue
    )} ${operatorValue}`;
  } else {
    previousOperand.innerText = getDisplayNumber(previousOperandValue);
  }
}

total.addEventListener("click", function () {
  compute();
  displayValue();
});

function chooseOperator(operator) {
  if (!currentOperandValue) return;
  if (currentOperandValue !== "") {
    compute();
  }
  operatorValue = operator;
  previousOperandValue = currentOperandValue;
  currentOperandValue = "";
}
function deleteFun() {
  currentOperandValue = currentOperandValue.slice(0, -1);
}
deleteItem.addEventListener("click", function () {
  deleteFun();
  displayValue();
});

function clear() {
  currentOperandValue = "";
  previousOperandValue = "";
  operatorValue = "";
}

allClear.addEventListener("click", function () {
  clear();
  displayValue();
});
function compute() {
  const prev = parseFloat(previousOperandValue);
  const current = parseFloat(currentOperandValue);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operatorValue) {
    case "+":
      currentOperandValue = prev + current;
      break;
    case "-":
      currentOperandValue = prev - current;
      break;
    case "*":
      currentOperandValue = prev * current;
      break;
    case "÷":
      currentOperandValue = prev / current;
      break;
    case "%":
      currentOperandValue = prev % current;
      break;
    default:
      return;
  }
  previousOperandValue = "";
  operatorValue = "";
}
number.forEach((num) => {
  num.addEventListener("click", function () {
    appendNumber(num.innerText);
    displayValue();
  });
});

operator.forEach((operator) => {
  operator.addEventListener("click", function () {
    chooseOperator(operator.innerText);
    displayValue();
  });
});
