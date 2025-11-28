// Grab all DOM elements
let settingsBtn = document.querySelector(".settings-btn");
let settingsModal = document.querySelector(".settings-modal");
let lightbox = document.querySelector(".lightbox");
let applyBtn = document.querySelector(".apply-btn");
let closeBtn = document.querySelector(".close-btn");
let timerSelectors = document.querySelectorAll(".break-container h3");
let circleButtonsColor = document.querySelectorAll(".circle-buttons-color");
let progressCircle = document.querySelector(".progress-circle");
let circleButtonsFont = document.querySelectorAll(".circle-buttons");
let logoContainer = document.querySelector(".logo-container");
let startButton = document.querySelector(".start-btn");
let timerText = document.querySelector(".timer-text");
let interval; // interval ID for setInterval
let timeRemaining;
let totalTime = 25 * 60; // default Pomodoro
let restartBtn = document.querySelector(".restart-btn");
let selectors = document.querySelectorAll(".selector");
let timeInputs = document.querySelectorAll(".time-inputs");
let activeColor = document.querySelector(".red-active");
let currentColor = "#f87070";  // default color
let error = document.querySelector(".error");
const alarmSound = document.getElementById('alarm-sound');

// Open settings modal
settingsBtn.addEventListener("click", () => {
lightbox.classList.remove("hide");
settingsModal.classList.remove("hide");
})

// Close settings modal
function closeModal(){
lightbox.classList.add("hide");
settingsModal.classList.add("hide");
}

// Close modal
closeBtn.addEventListener("click", () => {
    closeModal()
})

// Apply new settings (time, font, color)
applyBtn.addEventListener("click", () => {
    let activeSelectorIndex = null; 
    let flag = true;
    // Loop through time inputs to validate and update times
    timeInputs.forEach((input, index) => {
    const value = parseInt(input.value) || 0;

    if (value > 0 && value < 100) {
    selectors[index].dataset.index = value;

    if (selectors[index].classList.contains("red-active")) {
    activeSelectorIndex = index;
    }
    // Show error for invalid input
    } else if (input.value !== "") { 
    error.classList.remove("hide");
    flag = false;
    }
    });

    // Update timer if the active selector was changed
    if (activeSelectorIndex !== null) {
        const activeValue = parseInt(selectors[activeSelectorIndex].dataset.index, 10);
        totalTime = activeValue * 60; 
        timeRemaining = totalTime; 
        updateTimer(timeRemaining); 
    }

    if(flag){
    closeModal();
} 
});


circleButtonsColor.forEach(button => {
    button.addEventListener("click", () => {
    // Remove checkmarks from all color buttons
    circleButtonsColor.forEach(b => { b.innerHTML = `` });
    // Add checkmark to selected color
    button.innerHTML = `<img src="./assets/icons-done.svg">`;

    // Set current color based on selection
    if (button.classList.contains("red")) {
            currentColor = "#f87070";
} else if (button.classList.contains("blue")) {
            currentColor = "#70f3f8";
} else {
            currentColor = "#d881f8";
}
    // Update progress circle color
    progressCircle.style.stroke = currentColor;
    // Update active selector color
    activeColor = document.querySelector(".red-active"); 
        
    activeColor.style.backgroundColor = currentColor;
    });
});

circleButtonsFont.forEach(button =>{
    button.addEventListener("click", () => {
        // Remove previous font selection
        circleButtonsFont.forEach(b => {b.classList.remove("dark-active")})
        button.classList.add("dark-active");
        // Apply selected font
        determineFont(button);
    })
})

function determineFont(fontChoice){
let selectedFont = fontChoice.getAttribute("data-font");
console.log("Selected font:", selectedFont);
logoContainer.style.fontFamily = `"${selectedFont}", sans-serif`;
}

// Update the timer display
function updateTimer(timeValue){
    const minutes = Math.floor(timeValue / 60);
    const seconds = timeRemaining % 60;

    timerText.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start the timer
function startTimer() {
  interval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimer(timeRemaining);
      updateCircle();
    } else {
      clearInterval(interval); 
      timerText.innerHTML = "00:00";  
      // Play alarm sound when timer ends
      alarmSound.loop = true;
      alarmSound.play();
    }
  }, 1000); 
}

// Start/Pause button
startButton.addEventListener("click", () => {
    if (startButton.innerHTML === `PAUSE`) {
        clearInterval(interval); 
        startButton.innerHTML = `START`;
    } else {
        startTimer(); 
        startButton.innerHTML = `PAUSE`; 
    }
});

// Restart timer
restartBtn.addEventListener("click", () => { 
    clearInterval(interval); 
    timeRemaining = totalTime;
    updateTimer(timeRemaining);
    progressCircle.style.strokeDashoffset = 0;
    startButton.innerHTML = `START`;
    alarmSound.pause(); 
    alarmSound.currentTime = 0; 
     alarmSound.loop = false;
});

// Update circular progress bar
function updateCircle() {
    const progress = timeRemaining / totalTime;
    const offset = 364.42 * (progress); // total dash length
    progressCircle.style.strokeDashoffset = offset;
}


selectors.forEach(selector => {
    selector.addEventListener("click", () => {
        // Reset previous selection
        selectors.forEach(s => {s.classList.remove("red-active");
          s.style.backgroundColor = "transparent";   
        })
        // Apply new selection
        selector.classList.add("red-active");
        selector.style.backgroundColor = currentColor; 

        // Reset timer
        clearInterval(interval);
        
        startButton.innerHTML = "START"
        const dataIndex = parseInt(selector.dataset.index, 10);
        totalTime = dataIndex * 60; 
        timeRemaining = totalTime; 
        updateTimer(totalTime);
        progressCircle.style.strokeDashoffset = 0;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    selectors[0].classList.add("red-active"); // Default active selector
    totalTime = 25 * 60;
    timeRemaining = totalTime;
});