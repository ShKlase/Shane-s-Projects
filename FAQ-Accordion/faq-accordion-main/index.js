let buttons = document.querySelectorAll(".plus-minus-buttons");
let answers = document.querySelectorAll(".answer-1");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Check if the clicked button is already active
        if (button.classList.contains("active")) {
            // If active, remove the active class to collapse it and hide the answer
            button.classList.remove("active");
            answers[index].classList.add("hide");
        } else {
            // Otherwise, deactivate all buttons and hide all answers
            buttons.forEach(b => b.classList.remove("active"));
            answers.forEach(answer => answer.classList.add("hide"));
            
            // Activate the clicked button and show the corresponding answer
            button.classList.add("active");
            answers[index].classList.remove("hide");
        }
    });
});




