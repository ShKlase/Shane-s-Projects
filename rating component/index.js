const reviewbutton = document.querySelectorAll(".review-btn");
const submitbutton = document.querySelector(".submit-btn");
const containerone = document.querySelector(".rating-state-container");
const containertwo = document.querySelector(".thank-you-container");
const reviewscore = document.querySelector(".review-score")

// Loop through each rating button and add a click event listener
reviewbutton.forEach(button =>{
button.addEventListener("click", ()=>{
    // Remove "active" class from all buttons (so only one is highlighted)
    reviewbutton.forEach(btn => btn.classList.remove("active"));
    // Add "active" class to the button that was clicked
    button.classList.add("active");
    // Get the text inside the button (the rating number)
    let reviewnumber = button.innerText;
    // Update the displayed rating in the thank-you message
    reviewScore(reviewnumber);
})
})

// Add click event listener to the submit button
submitbutton.addEventListener("click", ()=>{
// Hide the rating state container
containerone.classList.add("hide");
// Show the thank-you state container
containertwo.classList.remove("hide");
})

// Function to update the review score in the thank-you message
function reviewScore(scorenum){
// Change the inner HTML of the review-score element to the selected number
reviewscore.innerHTML = scorenum;
}