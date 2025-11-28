// ============================
// NEWSLETTER SIGN-UP SCRIPT
// Handles form validation, error display, and success message toggle
// ============================
const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const errorMessage = document.querySelector(".error-message")
const container1 = document.querySelector(".container");
const container2 = document.querySelector(".container2");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
form.addEventListener("submit", (e) => {
    // Prevents default browser form submission
    e.preventDefault();

// Stores the entered email value
const emailValue = emailInput.value;

// ============================
// EMAIL VALIDATION LOGIC
// ============================

if(!emailRegex.test(emailValue)){
    // If the email is invalid:
    // - Show error message
    // - Add visual red border or styling to the input field
    errorMessage.classList.remove("hide");
    emailInput.classList.add("input-error");
}else{
    // If the email is valid:
    // - Hide error message
    // - Remove error styling
    // - Switch to success confirmation screen
    errorMessage.classList.add("hide");
    emailInput.classList.remove("input-error");
    container1.classList.add("hide");
    container2.classList.remove("hide");
}



   
});