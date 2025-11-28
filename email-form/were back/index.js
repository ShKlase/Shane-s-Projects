// Select all hidden error message elements
let errors = document.querySelectorAll(".hide")

// Select the submit button and success message container
let submit = document.querySelector(".submit-btn")
let submitmessage = document.querySelector(".submit-hide")

// Select all input and textarea elements in the form
let inputs = document.querySelectorAll("input, textarea")

// Select all elements that display red error text
let red = document.querySelectorAll(".red")

// Flag to track form validation status
let flag = true;

// Regular expression to validate email format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Event listener for form submission
submit.addEventListener("click", () => {
// Hide all error messages initially
red.forEach(element =>{
    element.classList.add("hide")
})

// Validate email format, show specific error if invalid
if(!emailRegex.test(inputs[2].value)){
    inputs[2].classList.remove("email-hide")
}

    // Reset validation flag
    flag = true;
     // Loop through each input and textarea for validation
    for(let i = 0; i<inputs.length; i++){
    let error = errors[i];

        // Text and email fields must not be empty
        if ((inputs[i].type === "text" || inputs[i].type === "email") && inputs[i].value === "") {
         error.classList.remove("hide"); 
         flag = false;
        
    // Radio buttons and checkboxes must be checked

    }else if ((inputs[i].type === "radio" || inputs[i].type === "checkbox") && !inputs[i].checked){
        error.classList.remove("hide");
        flag = false;

    // Textarea (message) must not be empty
    }else if(inputs[i].tagName === "TEXTAREA" && inputs[i].value === ""){
        error.classList.remove("hide");
        flag = false;

    // Otherwise, hide any previous errors
    }else{
        errors[i].classList.add("hide");
    }

}
// If all fields are valid, show success message and save state
if(flag){
submitmessage.classList.remove("submit-hide")
localStorage.setItem("formSubmitted", "true");
location.reload();
}
})

// On page load, check if form was previously submitted
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("formSubmitted") === "true") {
        submitmessage.classList.remove("submit-hide");
        localStorage.removeItem("formSubmitted");
    }
});

