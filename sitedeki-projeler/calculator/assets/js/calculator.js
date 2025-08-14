const createDialog = document.createElement("dialog");
const createDiv = document.createElement("div");
const body = document.querySelector("body");

//Theme button

const themeButton = document.querySelector(".themeButton");
themeButton.addEventListener("click", function(){
    const isDark = body.classList.toggle('darkTheme');
    if(isDark) {
        this.classList.add("darkButton");
        localStorage.isDarkMode = true;
    } else {
        this.classList.remove("darkButton");
        localStorage.isDarkMode = false;
    }
});
if(localStorage.isDarkMode === 'true'){
    body.classList.add("darkTheme");
    themeButton.classList.add("darkButton");
}



const numbers = document.querySelector(".numbers");
const calcButtons = document.querySelector(".calcButtons");

//Buttons inner Html
const calcButtonsHtml = `
                <button class="calcButton" data-type="addition">+</button>
                <button class="calcButton" data-type="subtract">-</button>
                <button class="calcButton" data-type="multiply">*</button>
                <button class="calcButton" data-type="divide">/</button>
                `;

//add buttons html function                
function addCalcButton(){
    calcButtons.innerHTML = calcButtonsHtml;
}    

//add innver html number list
function addNumber(){
    for (let i = 9; i >= 0; i--){
        numbers.innerHTML += `<span class="number" data-number=${i} >${i}</span>`;
    }
    numbers.innerHTML += `                
                <button class="calcButton" data-type="clear">C</button>
                <button class="calcButton" data-type="equals">=</button>
            ` ;
    addCalcButton();
}

addNumber();

/**İnput number validate func */
function Validate(e) {
    let keyCode = e.keyCode || e.which;
    let lblError = document.getElementById("lblError");
    lblError.classList.remove("active");
    lblError.innerHTML = "";

    //numara regex
    let regex = /^[0-9]+$/;

    //Validate TextBox value against the Regex.
    let isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
        lblError.classList.add("active");
        lblError.innerHTML = "Sadece rakam girebilirsiniz.";
        e.preventDefault();
    }
    else{
        lblError.classList.add("active");
        lblError.innerHTML = "Sadece butonlar ile işlem yapılabilir.";
        e.preventDefault();
        calcInput.value.remove();
    }

    return isValid;
}
//input keypress event, func
calcInput.addEventListener("keypress", Validate);

//işlemler 
let operatorClicked = false;

const calcButtonList = document.querySelectorAll(".calcButton");
const numberButtons = document.querySelectorAll(".number");
let firstNumber = "";
let secondNumber = "";
let operatorSymbl = ""

function handleClear(){
    firstNumber = "";
    secondNumber = "";
    calcInput.value = "";
    operatorSymbl = "";
    resultProcess.innerText = 0;
}
function handleCalc(){
    resultProcess.innerText = operator(operatorSymbl, firstNumber, secondNumber);
    secondNumber = "";
    calcInput.value = "";
    firstNumber = Number(resultProcess.innerText);
    operatorClicked = false;    
}
function additionBy(num1, num2){
    return num1 + num2;
}
function subtactBy(num1, num2){
    return num1 - num2;
}
function multiplyBy(num1, num2){
    return num1 * num2;
}
function divideBy(num1, num2){
    return num1 !== 0 ? num1 / num2 : "0 sayısı bölünemez";
}
function operator(symbol, num1, num2){
    switch(symbol){
        case "+" :  return additionBy(num1, num2);
        case "-" :  return subtactBy(num1, num2);
        case "*" :  return multiplyBy(num1, num2);
        case "/" :  return divideBy(num1, num2);
    }
}
for(const numberButton of numberButtons){
    numberButton.addEventListener("click", function(){
        lblError.classList.remove("active");
        lblError.innerHTML = "";
        console.log("blablabla");
        calcInput.value += numberButton.dataset.number;
        if(operatorSymbl === ""){
            console.log("resultProcess 1 : " + resultProcess.innerText);
            firstNumber = Number(calcInput.value);
            return resultProcess.innerText = firstNumber;

        }
        else{
            console.log("resultProcess 2 : " + resultProcess.innerText);
            secondNumber = Number(calcInput.value);
            return resultProcess.innerText = firstNumber + operatorSymbl + secondNumber;
        }
    })
}


function takeAction(){
    lblError.classList.remove("active");
    lblError.innerHTML = "";
    const symbol = this.innerText;
    if(symbol === "+" || symbol === "-" || symbol === "*" || symbol === "/"){
        console.log("asassddd");
        if(operatorClicked && operatorSymbl === symbol){
            body.append(createDiv);
            body.append(createDialog);
            let dialogChoose = document.querySelector("dialog");
            createDiv.classList.add("dialogOverlay");
            dialogChoose.classList.add("dialog");
            dialogChoose.innerHTML = `
                    <p>Lütfen işlem yapacağınız diğer rakamı da giriniz ve "=" butonuna basınız.</p>
                    <a href="#" class="closeDialog">KAPAT</a>
                `;
            dialogChoose.show();
            document.querySelector(".closeDialog").addEventListener("click", function(){
                createDiv.remove();
                dialogChoose.remove();
            });
            return;
        }
        operatorSymbl = symbol;
        operatorClicked = true;
        resultProcess.innerText = firstNumber;
        resultProcess.innerText += symbol;
        calcInput.value = "";
        return;
    }
    if(symbol === "="){
        handleCalc();
    }
    else if (symbol === "C"){
       handleClear();
    }
}

for (const calcButton of calcButtonList){
    calcButton.addEventListener("click", takeAction)
}




