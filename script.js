const container = document.createElement("div");
container.setAttribute("class","calculatorcode");

container.innerHTML = `

<section>
        <div class="container">
          <div class="calculator">
            <div class="display">
              <div class="display-1">0</div>
              <div class="display-2">0</div>
              <div class="temp-result">0</div>
            </div>
            <div class="all_button">
              <div class="button all-clear">AC</div>
              <div class="button last-entity-clear">DEL</div>
              <div class="button operation">%</div>
              <div class="button operation">/</div>
              <div class="button number">7</div>
              <div class="button number">8</div>
              <div class="button number">9</div>
              <div class="button operation">*</div>
              <div class="button number">4</div>
              <div class="button number">5</div>
              <div class="button number">6</div>
              <div class="button operation">-</div>
              <div class="button number">1</div>
              <div class="button number">2</div>
              <div class="button number">3</div>
              <div class="button operation">+</div>
              <div class="button btn-0 number">0</div>
              <div class="button number dot">.</div>
              <div class="button equal">=</div>
            </div>
          </div>
        </div>
      </section>


`;


document.body.append(container);












const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

//taking all the  numbers element
// adding event listener to the number of number elements
  //selected number being . and it is not present so true 
  //selected number is . and present already so . cannot be used again
  numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {
      if (e.target.innerText === "." && !haveDot) {
        haveDot = true;
      } else if (e.target.innerText === "." && haveDot) {
        return;
      }
      dis2Num += e.target.innerText;
      display2El.innerText = dis2Num;

    });
  });


  operationEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
      if (!dis2Num) return;
      haveDot = false;
      //for new number . is false as every operand is new
      const operationName = e.target.innerText;
      if (dis1Num && dis2Num && lastOperation) {
        mathOperation();
      } else {
        result = parseFloat(dis2Num);
      }
      clearVar(operationName);
      lastOperation = operationName;
      console.log(result);
    });
  });


function clearVar(name = "") { //the operation name is called simply name and the defalt value is empty
    dis1Num += dis2Num + " " + name + " "; //moving disply2 to display 1 
    display1El.innerText = dis1Num;
    display2El.innerText = ""; //making display 2 empty
    dis2Num = "";
    tempResultEl.innerText = result;
  }


//   adding operation symbol to calci
  function mathOperation() {
    if (lastOperation === "*") {
      result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
      result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
      result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
      result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "%") {
      result = parseFloat(result) % parseFloat(dis2Num);
    }
  }
  

//   equal number
  equalEl.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = "";
    dis2Num = result; //displying only the disp 2 display
    dis1Num = "";
  });
  

//   clear all display
  clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "";
    display2El.innerText = "";
    result = "";
    tempResultEl.innerText = "";
  });
  

//   delete the last input
  clearLastEl.addEventListener("click", () => {
    display2El.innerText = "";
    dis2Num = "";
  });

// adding keyboard values to the numbers
// using eventlistener keydown - whicch is used for a specific keyboard number or charactcer 
  window.addEventListener("keydown", (e) => {
    if (
      e.key === "0" ||
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5" ||
      e.key === "6" ||
      e.key === "7" ||
      e.key === "8" ||
      e.key === "9" ||
      e.key === "."
    ) 
    {
      clickButtonEl(e.key);
      // for all the basic numbers
    } 

    else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%" || e.key ==="*") 
    {
      clickOperation(e.key);
    //   for all the operations except for *
    } 
    
    else if (e.key == "Enter" || e.key === "=") {
      clickEqual();
    }

  });

//   number click function 
// checking the click and number given are matching 
  function clickButtonEl(key) {
    numbersEl.forEach((button) => {
      if (button.innerText === key) {
        button.click();
      }
    });
  }

  //   operation click function 
// checking the click and number given are matching 
  function clickOperation(key) {
    operationEl.forEach((operation) => {
      if (operation.innerText === key) {
        operation.click();
      }
    });
  }

//   equal click
  function clickEqual() {
    equalEl.click();
  }
  


