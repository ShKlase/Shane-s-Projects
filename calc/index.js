// Select all tip percentage buttons

const tippercentage = document.querySelectorAll(".tip-percentage");
// Select the custom tip input

const custombutton = document.getElementById("custom-button");
const placeholder = custombutton.placeholder;

// Number of people input & error display
const numofpeople = document.getElementById("number-of-people");
const error = document.querySelector(".error");

// Bill input & result containers
const billinput = document.getElementById("bill-input");
const total = document.querySelector(".total");
const totalsecond = document.querySelector(".total-second");

// Reset button
const reset = document.querySelector(".reset");

// Variables to store current values
let billtotal = 0;  // Total bill amount
let totalpeople = 0;  // Number of people
let buttonvalue = parseFloat(0);  // Selected tip percentage

// Event listeners for tip percentage buttons
tippercentage.forEach(button => {
button.addEventListener("click", ()=>{
    activateButton(button); // Activate the selected tip button
}
)

// When custom input is focused, clear placeholder
custombutton.addEventListener("focus", () =>{
   custombutton.placeholder = "";
}
)

// Restore placeholder when custom input loses focus
custombutton.addEventListener("blur", ()=>{
    custombutton.placeholder =  placeholder;
})


})

// Listen to bill input changes
billinput.addEventListener("input", ()=>{
     billtotal = parseFloat(billinput.value);
     updateTotals();
})



// Function to activate a tip button
function activateButton(button){
// Remove active class from all buttons
tippercentage.forEach(b => b.classList.remove("active"));
// Add active class to the clicked button
button.classList.add("active");
// Update button value to the selected tip percentage
buttonvalue = parseFloat(button.innerText.replace("%", ''));
// Update totals
updateTotals();

}


// Listen for changes in number of people input
numofpeople.addEventListener("input", () => {
totalpeople = parseFloat(numofpeople.value);
// Show error if value is zero
if(numofpeople.value === "0"){
error.classList.remove("hide")
}else{
error.classList.add("hide")


}
updateTotals();

})
// Listen for custom tip input changes
custombutton.addEventListener("input", () =>{
    buttonvalue = parseFloat(custombutton.value);
    updateTotals();
})


// Function to calculate and update the totals
function updateTotals(){
if(totalpeople > 0){
    // Calculate tip amount
     let tipresult = (buttonvalue / 100) * billtotal;
    tipresult = parseFloat(tipresult.toFixed(2));
    // Tip per person
    let tiptotal = (tipresult / totalpeople).toFixed(2)
    // Total per person including tip
    let totalTipPerPerson = ((billtotal + tipresult) / totalpeople).toFixed(2);
    // Update HTML
    total.innerHTML = `$${tiptotal}`;
    totalsecond.innerHTML = `$${totalTipPerPerson}`;
}else{
    // Reset totals if number of people is zero
    total.innerHTML = "$0.00";
    totalsecond.innerHTML = "$0.00"
}
}

// Reset button functionality
reset.addEventListener("click", ()=>{
    billinput.value = "";
    buttonvalue = 0;
    numofpeople.value = "";
    tippercentage.forEach(b => b.classList.remove("active"));
    custombutton.value = "";
    total.innerHTML = "$0.00";
    totalsecond.innerHTML = "$0.00"
})


