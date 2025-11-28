// Select the desktop share button by its ID
const desktopShareBtn = document.getElementById("desktop-share-btn")
// Add click event listener to the share button
desktopShareBtn.addEventListener("click", toggleDesktopShare)
/**
 * Function to toggle the visibility of the social share panel
 */
function toggleDesktopShare(){
    // Select the container holding the social share icons
    const shareShapeContainer = document.querySelector(".share-shape-container");

    // Toggle the 'display-none' class to show or hide the panel
    shareShapeContainer.classList.toggle("display-none");
}