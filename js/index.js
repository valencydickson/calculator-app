//VARIABLES

const body = document.getElementById("root");
const logo = document.querySelector(".logo a");
const themeSelector = document.querySelector(".theme-selector");
const inputAfter = document.querySelector("input[type='radio']:after");
const resultBox = document.querySelector(".result-box");
const firstNumberDisplay = document.querySelector(".first-number");
const secondNumberDisplay = document.querySelector(".second-number");
const keypads = document.querySelector(".keypads");
const numberbuttons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const resetButton = document.querySelector(".reset-btn");
const equalButton = document.querySelector(".equal-btn");
const deleteButton = document.querySelector(".delete-btn");

//Radio selector
const radio1 = document.getElementById("1");
const radio2 = document.getElementById("2");
const radio3 = document.getElementById("3");

//Theme Functions

const themeOne = () => {
  body.style.background = "hsl(222, 26%, 31%)";
  body.style.color = "white";
  logo.style.color = "white";
  themeSelector.style.background = "hsl(223, 31%, 20%)";
  resultBox.style.background = "hsl(223, 31%, 20%)";
  keypads.style.background = "hsl(223, 31%, 20%)";
  deleteButton.style.background = "hsl(225, 21%, 49%)";
  resetButton.style.background = "hsl(225, 21%, 49%)";
  equalButton.style.background = "hsl(6, 63%, 50%);";
};

const themeTwo = () => {
  body.style.background = "white";
  body.style.color = "black";
  logo.style.color = "black";
  themeSelector.style.background = "hsl(0, 5%, 81%)";
  resultBox.style.background = "hsl(0, 0%, 93%)";
  keypads.style.background = "hsl(0, 5%, 81%)";
  deleteButton.style.background = "hsl(185, 42%, 37%)";
  resetButton.style.background = "hsl(185, 42%, 37%)";
  equalButton.style.background = "hsl(25, 99%, 27%)";
};

const themeThree = () => {
  body.style.background = "hsl(268, 75%, 9%)";
  body.style.color = "hsl(52, 100%, 62%)";
  logo.style.color = "hsl(52, 100%, 62%)";
  themeSelector.style.background = "hsl(268, 71%, 12%)";
  resultBox.style.background = "hsl(268, 71%, 12%)";
  keypads.style.background = "hsl(268, 71%, 12%)";
  deleteButton.style.background = "hsl(268, 47%, 21%)";
  resetButton.style.background = "hsl(268, 47%, 21%)";
  equalButton.style.background = " hsl(176, 100%, 44%)";
};

//Radio toggle

radio1.addEventListener("change", function () {
  if (this.checked) {
    localStorage.setItem("theme", "themeStorageOne");
    themeOne();
  }
});

radio2.addEventListener("change", function () {
  if (this.checked) {
    localStorage.setItem("theme", "themeStorageTwo");
    themeTwo();
  }
});

radio3.addEventListener("change", function () {
  if (this.checked) {
    localStorage.setItem("theme", "themeStorageThree");
    themeThree();
  }
});

//Theme storage

if (localStorage.getItem("theme") === undefined) {
  localStorage.setItem("theme", "themeStorageOne");
  radio1.checked = true;
}

switch (localStorage.getItem("theme")) {
  case "themeStorageOne":
    radio1.checked = true;
    themeOne();
    break;
  case "themeStorageTwo":
    radio2.checked = true;
    themeTwo();
    break;
  case "themeStorageThree":
    radio3.checked = true;
    themeThree();
    break;
  default:
    break;
}

class Calculator {
  constructor(firstNumberDisplay, secondNumberDisplay) {
    this.firstNumberDisplay = firstNumberDisplay;
    this.secondNumberDisplay = secondNumberDisplay;
    this.clear();
  }

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operation = undefined;
  }

  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  chooseOperation(operation) {
    if (this.currentNumber === "") {
      return;
    }

    if (this.currentNumber != "") {
      this.compute();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber.toString() + operation.toString();
    this.currentNumber = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);

    if (isNaN(prev) || isNaN(current)) {
      return;
    }

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentNumber = computation;
    this.operation = undefined;
    this.previousNumber = "";
  }

  appendNumber(number) {
    if (number === "." && this.currentNumber.includes(".")) {
      return;
    }
    this.currentNumber = this.currentNumber.toString() + number.toString();
  }

  updateDisplay() {
    this.secondNumberDisplay.innerText = this.currentNumber;
    this.firstNumberDisplay.innerText = this.previousNumber;
  }
}

const calculator = new Calculator(firstNumberDisplay, secondNumberDisplay);

numberbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

resetButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
