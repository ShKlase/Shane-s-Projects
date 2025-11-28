
// Select all navigation buttons with class "grey-button"

let greybuttons = document.querySelectorAll(".grey-button");
// Add click event listener to each navigation button
greybuttons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove the active highlight from all buttons
   greybuttons.forEach(btn => btn.classList.remove("active-orange"));
   // Add active highlight to the clicked button
   button.classList.add("active-orange")
  });
});



