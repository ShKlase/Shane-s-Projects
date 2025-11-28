// Select all calculator number and operator buttons
let calcButtons = document.querySelectorAll('.calc-nmbr-btns');

// Regex to detect number inputs
let numRegex = /[0-9]/;

// Display area for current calculation/result
let result = document.querySelector(".result");

// String to keep track of the current calculation
let problem = "";

// Reset and equals buttons
let resetBtn = document.querySelector(".reset");
let equalBtn = document.querySelector(".equals-btn");

// Theme slider and containers for dynamic styling
let slider = document.getElementById('theme-toggle');
let calcContainer = document.querySelector(".calc-button-container")
let resultContainer = document.querySelector(".result-container");
let logo = document.querySelector(".logo-header");
let themeLabel = document.querySelector(".theme-label");
let themeNumbers = document.querySelector(".theme-numbers")
let deleteBtn = document.querySelectorAll(".delete-btn")

// Event listener for all calculator buttons
calcButtons.forEach(button => {
    button.addEventListener("click", () => {
         if (numRegex.test(button.innerHTML)) {
            // Append number to the current problem
         if (result.innerHTML === "0") {
            result.innerHTML = ""; 
        }
    problem += button.innerHTML;
    result.innerHTML = formatNumberWithCommas(problem);
    }else if(button.innerHTML === `DEL`){
        // Delete last character
        deleteNum();
    
    }else if(button.innerHTML === `.`){
        // Add decimal point
        addDecimal();
    }
    
    else{
        // Handle operator input
        checkforOperators(button.innerHTML);
    }
    })

});
    // Function to delete last character
    function deleteNum() {
    if (problem.length > 0) {
        problem = problem.slice(0, -1);
        result.innerHTML = formatNumberWithCommas(problem.replace(/,/g, "")); // Reformat without commas
    } else {
        result.innerHTML = "0";
        problem = "";
    }
}
    // Function to handle operator input (+, -, *, /)
    function checkforOperators(operator){

        // Convert x to *
        if(operator === `x`){
            operator = `*`;
        }

    if(result.innerHTML !== "0"){
        // Prevent multiple consecutive operators
        if (!/[+\-*/]$/.test(problem)) {
            result.innerHTML += operator;
            problem += operator;
        }
        else{
            return;
        }
    }
    }

// Reset calculator
resetBtn.addEventListener("click", () => {
    if(result.innerHTML !== "0"){
        result.innerHTML = "0"
        problem = ""; 
    }
})

// Evaluate the expression
equalBtn.addEventListener("click", () => {
    try {
        let solution = eval(problem.replace(/,/g, ""));
         result.innerHTML = formatNumberWithCommas(solution.toString());
    } catch (error) {
        result.innerHTML = "Error"; 
        problem = "";
    }
});

// Add decimal point
function addDecimal() {
    if (!result.innerHTML.includes(".")) {
        result.innerHTML += ".";
        problem += ".";
    }
}

// Format numbers with commas for readability
function formatNumberWithCommas(number) {
    if (!number) return "0";
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Theme slider event
slider.addEventListener('input', (event) => {
const themeValue = event.target.value;
applyTheme(themeValue);
})

// Function to apply selected theme dynamically
function applyTheme(theme){
const body = document.body;

if(theme === `2`){
    // Theme 2 styling
    body.style.background = `hsl(0, 0%, 90%)`
    slider.style.background = `hsl(0, 5%, 81%)`
    calcContainer.style.background = `hsl(0, 5%, 81%)`
    resultContainer.style.background = `hsl(0, 0%, 93%)`
    logo.style.color = 'hsl(221, 14%, 31%)'
    themeLabel.style.color = 'hsl(221, 14%, 31%)'
    themeNumbers.style.color = 'hsl(221, 14%, 31%)'

    // Button styling
    calcButtons.forEach(button => {
        if(button.innerHTML !== `DEL`){
            button.style.color = 'hsl(221, 14%, 31%)'
            button.style.background = `hsl(45, 7%, 89%)`
            button.style.boxShadow = `inset 0 -4px 0 0 hsl(35, 11%, 61%)`
        }
        });

    result.style.color = 'hsl(221, 14%, 31%)'

    slider.classList.add(`orange-thumb`);

    deleteBtn.forEach(b => {
        b.style.background = `hsl(185, 42%, 37%)`
        b.style.boxShadow = `inset 0 -4px 0 0 hsl(185, 58%, 25%)`
    })

    equalBtn.style.background = ` hsl(25, 98%, 40%)`
    equalBtn.style.boxShadow = `inset 0 -4px 0 0 hsl(25, 99%, 27%)`
}


else if(theme === `3`){
    // Theme 3 styling
    body.style.background = `hsl(268, 75%, 9%)`
    slider.style.background = `hsl(268, 71%, 12%)`
    calcContainer.style.background = `hsl(268, 71%, 12%)`
    resultContainer.style.background = `hsl(268, 71%, 12%)`
    logo.style.color = 'hsl(52, 100%, 62%)'
    themeLabel.style.color = 'hsl(52, 100%, 62%)'
    themeNumbers.style.color = 'hsl(52, 100%, 62%)'

    calcButtons.forEach(button => {
        if(button.innerHTML !== `DEL`){
            button.style.color = 'hsl(52, 100%, 62%)'
            button.style.background = `hsl(268, 47%, 21%)`
            button.style.boxShadow = `inset 0 -4px 0 0 hsl(290, 70%, 36%)`
        }
        });

    result.style.color = 'hsl(52, 100%, 62%)'

    slider.classList.add(`cyan-thumb`);

    deleteBtn.forEach(b => {
        b.style.background = `hsl(281, 89%, 26%)`
        b.style.boxShadow = `inset 0 -4px 0 0 hsl(285, 91%, 52%)`
    })

    equalBtn.style.background = `hsl(176, 100%, 44%)`
    equalBtn.style.boxShadow = `inset 0 -2px 0 0 hsl(177, 92%, 70%)`
    equalBtn.style.color = `black`
}


else{
    // Default Theme 1 styling
    body.style.background = `hsl(222, 26%, 31%)`
    slider.style.background = `hsl(223, 31%, 20%)`
    calcContainer.style.background = `hsl(223, 31%, 20%)`
    resultContainer.style.background = `hsl(224, 36%, 15%)`
    logo.style.color = 'white'
    themeLabel.style.color = 'white'
    themeNumbers.style.color = 'white'

    calcButtons.forEach(button => {
        if(button.innerHTML !== `DEL`){
            button.style.color = 'hsl(221, 14%, 31%)'
            button.style.background = `hsl(30, 25%, 89%)`
            button.style.boxShadow = `inset 0 -4px 0 0 hsl(28, 16%, 65%)`
        }
        });

    result.style.color = 'white'

    slider.classList.add(`regular-thumb`);

    deleteBtn.forEach(b => {
        b.style.background = `hsl(225, 21%, 49%)`
        b.style.boxShadow = `inset 0 -4px 0 0  hsl(224, 28%, 35%)`
    })

    equalBtn.style.background = ` hsl(6, 63%, 50%)`
    equalBtn.style.boxShadow = `inset 0 -2px 0 0 hsl(6, 70%, 34%)`
    equalBtn.style.color = `white`
}
}