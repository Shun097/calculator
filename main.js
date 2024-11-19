const buttons = document.querySelectorAll('button');
const result = document.querySelector('#result');

let concatText = "";

function buttonPressed(event) {
    const text = event.target.textContent;
    
   
    const operators = ['+', '-', '*', '/'];

    if (text === "=") {
        try {
            concatText = eval(concatText).toString(); 
        } catch (error) {
            concatText = "Error"; 
        }
    } else if (text === "AC") {
        concatText = "";
    } else if (text === "C") {
        concatText = concatText.slice(0, -1);
    } else if (text === "%") {
        if (concatText === "" || operators.includes(concatText.slice(-1))) {
            return; 
        }
        const lastNumber = concatText.split(/[\+\-\*\/]/).pop(); 
        if (lastNumber) {
            const percentageValue = (parseFloat(lastNumber) / 100).toString();
            concatText = concatText.slice(0, -lastNumber.length) + percentageValue;
        }
    } else if (operators.includes(text)) {
        if (concatText === "" || operators.includes(concatText.slice(-1))) {
            return; 
        }
        concatText += text;
    } else if (text === ".") {
        if (concatText === "" || concatText.slice(-1).match(/[\+\-\*\/]/)) {
            concatText += "0."; 
        } else {
            const lastNumber = concatText.split(/[\%\+\-\*\/]/).pop(); 
            if (lastNumber.includes('.')) {
                return; 
            }
            concatText += text;
        }
    } else if (text === "0" || text === "00") {
        const lastNumber = concatText.split(/[\+\-\*\/]/).pop(); 
        if (lastNumber === "" || lastNumber === "0") {
            return; 
        }
        concatText += text;
    } else {
        concatText += text;
    }

    result.textContent = concatText;
}

buttons.forEach(button => button.addEventListener('click', buttonPressed));