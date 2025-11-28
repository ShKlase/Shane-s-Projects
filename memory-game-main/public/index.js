let themeButtons = document.querySelectorAll('.theme-button');
let playerButtons = document.querySelectorAll(".player-button");
let startBtn = document.querySelector(".start-btn");
let mainMenu = document.querySelector(".main-menu")
let gridButtons = document.querySelectorAll(".grid-button");
let seconds = 0;
let minutes =  0;
let numOfPlayers = 1;
let currentPlayer = 0;
let gameBoard = document.querySelector(".memory-gameboard");
let newGameBtn = document.querySelectorAll(".new-game-btn");
let timerID;
let symbolType = ``;
let moveCount = document.querySelector(".move-count");
let gridSize = "0";
let winScreen = document.querySelector(".win-screen")
currentArray = [];
let firstCircle = null; 
let secondCircle = null;
let clickCount = 0;
let playerResultContainer = document.querySelector(".player-grid-container")
let playerContainer = document.querySelector(".player-turn-container")
let restartButtons = document.querySelectorAll(".restart-btn");
let memoryCircles = document.querySelectorAll(".memory-circle");
let circleContainer = document.querySelector(".gameboard-circles-container")
let fourNumbersArray =  [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let sixNumbersArray =  [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];
let fourIconArray = [
    '<i class="fa-solid fa-hippo"></i>',
    '<i class="fa-solid fa-hippo"></i>',
    '<i class="fa-solid fa-heart"></i>',
    '<i class="fa-solid fa-heart"></i>',
    '<i class="fa-solid fa-truck-fast"></i>',
    '<i class="fa-solid fa-truck-fast"></i>',
    '<i class="fa-solid fa-dog"></i>',
    '<i class="fa-solid fa-dog"></i>',
    '<i class="fa-solid fa-car"></i>',
    '<i class="fa-solid fa-car"></i>',
    '<i class="fa-solid fa-plane"></i>',
    '<i class="fa-solid fa-plane"></i>',
    '<i class="fa-solid fa-bicycle"></i>',
    '<i class="fa-solid fa-bicycle"></i>',
    '<i class="fa-solid fa-motorcycle"></i>',
    '<i class="fa-solid fa-motorcycle"></i>',
];
let sixIconArray = [
    '<i class="fa-solid fa-hippo"></i>',
    '<i class="fa-solid fa-hippo"></i>',
    '<i class="fa-solid fa-heart"></i>',
    '<i class="fa-solid fa-heart"></i>',
    '<i class="fa-solid fa-truck-fast"></i>',
    '<i class="fa-solid fa-truck-fast"></i>',
    '<i class="fa-solid fa-dog"></i>',
    '<i class="fa-solid fa-dog"></i>',
    '<i class="fa-solid fa-car"></i>',
    '<i class="fa-solid fa-car"></i>',
    '<i class="fa-solid fa-plane"></i>',
    '<i class="fa-solid fa-plane"></i>',
    '<i class="fa-solid fa-bicycle"></i>',
    '<i class="fa-solid fa-bicycle"></i>',
    '<i class="fa-solid fa-motorcycle"></i>',
    '<i class="fa-solid fa-motorcycle"></i>',
    '<i class="fa-solid fa-apple-alt"></i>',
    '<i class="fa-solid fa-apple-alt"></i>',
    '<i class="fa-solid fa-coffee"></i>',
    '<i class="fa-solid fa-coffee"></i>',
    '<i class="fa-solid fa-cloud"></i>',
    '<i class="fa-solid fa-cloud"></i>',
    '<i class="fa-solid fa-bus"></i>',
    '<i class="fa-solid fa-bus"></i>',
    '<i class="fa-solid fa-shield-alt"></i>',
    '<i class="fa-solid fa-shield-alt"></i>',
    '<i class="fa-solid fa-futbol"></i>',
    '<i class="fa-solid fa-futbol"></i>',
    '<i class="fa-solid fa-dumbbell"></i>',
    '<i class="fa-solid fa-dumbbell"></i>',
    '<i class="fa-solid fa-basketball-ball"></i>',
    '<i class="fa-solid fa-basketball-ball"></i>',
    '<i class="fa-solid fa-music"></i>',
    `<i class="fa-solid fa-music"></i>`,
    '<i class="fa-solid fa-camera"></i>',
    '<i class="fa-solid fa-camera"></i>',
    '<i class="fa-solid fa-laptop"></i>',
    '<i class="fa-solid fa-laptop"></i>',
];

// ===== EVENT LISTENERS ===== //
// Theme selection
themeButtons.forEach(button => {
    button.addEventListener("click", () =>{
        themeButtons.forEach(b => {b.classList.remove("active-theme")})
        button.classList.add('active-theme');
        symbolType = button.innerText;
    })
})
// Grid size selection
gridButtons.forEach(button => {
    button.addEventListener("click", () =>{
        gridButtons.forEach(b => {b.classList.remove("active-theme")})
        button.classList.add('active-theme');
        gridSize =  button.innerText;
    })
})


// Player count selection
playerButtons.forEach(button => {
    button.addEventListener("click", () =>{
        playerButtons.forEach(b => {b.classList.remove("active-theme")})
        button.classList.add('active-theme');
        numOfPlayers = parseInt(button.innerText);
        createPlayerBoxes(numOfPlayers);
    })
})

// Create player turn boxes dynamically
function createPlayerBoxes(players) {
    playerContainer.innerHTML = "";
    if (players !== 1) {
        for (let i = 1; i <= players; i++) {
            playerContainer.innerHTML += 
            `<div class="player-container d-flex justify-content-between align-items-center">
                Player ${i}
                <span class="player-count">0</span>
            </div>`;
        }
    }

    // Highlight first player
    const containers = document.querySelectorAll(".player-container");
    containers.forEach((container, index) => {
        if (index === 0) {
            container.style.backgroundColor = "#fda214"; 
            container.style.color = "white"; 
            const playerCount = container.querySelector(".player-count");
            playerCount.style.color = "white"; 
            
        } else {
            container.style.backgroundColor = "#bcced9";
            container.style.color = "#7191a5"; 
            const playerCount = container.querySelector(".player-count");
            playerCount.style.color = "#7191a5"; 
        }
    });
}

// Start Game button
startBtn.addEventListener("click", () =>{
mainMenu.classList.add("hide");
gameBoard.classList.remove("hide");
timerID = setInterval(startTimer, 1000);
determineGameBoard(); 
})

// Timer function
function startTimer(){

    seconds++;

    if(seconds === 60){
        seconds = 0;
        minutes++;
    }

    const timeDisplay = `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`
    document.querySelector(".time").innerText = timeDisplay;
}

// New Game button resets the entire game
newGameBtn.forEach(button => {
    button.addEventListener("click", () => {
        gameBoard.classList.add("hide");
        mainMenu.classList.remove("hide");
        playerButtons.forEach(b => {b.classList.remove("active-theme")})
        gridButtons.forEach(b => {b.classList.remove("active-theme")})
        themeButtons.forEach(b => {b.classList.remove("active-theme")})
        clearInterval(timerID);
        seconds = 0;
        minutes = 0;
        document.querySelector(".time").innerText = "0 : 00";
        moveCount.innerHTML = 0;
        winScreen.classList.add("hide");
        playerContainer.innerHTML = ``;
        playerResultContainer = ``;
        numOfPlayers = 1;
    })
})

// ===== GAMEBOARD GENERATION ===== //
function determineGameBoard(){
circleContainer.innerHTML = ``;

if(gridSize === "6x6"){
    if (symbolType === "Numbers") {
        currentArray = shuffleArray(sixNumbersArray);  
    } else {
        currentArray = shuffleArray(sixIconArray);  
    }

circleContainer.classList.add("six-by-six");

for(let i  = 0; i < 36; i++){
circleContainer.innerHTML  +=  `<div class="memory-circle"><span class = "filler hide">${currentArray[i]}</span></div>`;
let memoryCircles = document.querySelectorAll(".memory-circle");
memoryCircles.forEach(circle => {
    circle.classList.add("six-by-six-circles");
})
}
} else{
    if (symbolType === "Numbers") {
        currentArray = shuffleArray(fourNumbersArray);  
    } else {
        currentArray = shuffleArray(fourIconArray);  
    }

circleContainer.classList.remove("six-by-six");

for(let i  = 0; i < 16; i++){
circleContainer.innerHTML  +=  `<div class="memory-circle"><span class = "filler hide">${currentArray[i]}</span></div>`;


memoryCircles.forEach(circle => {
    circle.classList.remove("six-by-six-circles");
})
}
}

memoryCircles = document.querySelectorAll(".memory-circle");
addMemoryCircleListeners();
}

// Shuffle array helper function
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Add click event listeners to each memory card
function addMemoryCircleListeners() {


memoryCircles.forEach(circle => {

circle.addEventListener("click", () => {
    if(clickCount < 2 && !circle.classList.contains("matched")){
    let filler = circle.querySelector(".filler");
    filler.classList.remove("hide");
    clickCount++;

    if(clickCount ===  1){
        firstCircle = circle;
        firstCircle.style.backgroundColor = "#bcced9";
    } else if(clickCount === 2){
        secondCircle = circle;
        secondCircle.style.backgroundColor = "#bcced9"
        memoryCircles.forEach(c => c.style.pointerEvents = "none");

        setTimeout(()  => {
            checkMatch();
             memoryCircles.forEach(c => c.style.pointerEvents = "")
        }, 1250);
        moveCount.innerHTML++;
    }
    }  
    });
});
}

// Check if two clicked cards match
function checkMatch() {
    let filler1 = firstCircle.querySelector(".filler");
    let filler2 = secondCircle.querySelector(".filler");
    let playerCounts = document.querySelectorAll(".player-count");
    let yellowColor = document.querySelectorAll(".player-container")

    if (filler1.innerHTML === filler2.innerHTML) {
        firstCircle.classList.add("matched");
        secondCircle.classList.add("matched");
        firstCircle.style.backgroundColor = "#fda214";
        secondCircle.style.backgroundColor = "#fda214";

        let currentScore = parseInt(playerCounts[currentPlayer].innerText);
        playerCounts[currentPlayer].innerText = currentScore + 1;

    } else {
        filler1.classList.add("hide");
        filler2.classList.add("hide");
        firstCircle.style.backgroundColor = "white";
        secondCircle.style.backgroundColor = "white";
    }

    checkIfDone(); // Check if all matches found
    firstCircle = null;
    secondCircle = null;
    clickCount = 0;
    currentPlayer = (currentPlayer + 1) % numOfPlayers;
    
    // Highlight active player
    yellowColor.forEach((container, index) => {
    if (index === currentPlayer) {
        container.style.backgroundColor = "#fda214"; 
        container.style.color = `white`
        const playerCount = container.querySelector(".player-count");
        playerCount.style.color = "white";
        
    } else {
        container.style.backgroundColor = "#bcced9"; 
        container.style.color = `#7191a5`;
        const playerCount = container.querySelector(".player-count");
        playerCount.style.color = "#7191a5";

    }
});
}

// Check if all cards are matched
function checkIfDone() {
    let allMatched = true;

    memoryCircles.forEach(circle => {
        if (!circle.classList.contains("matched")) {
            allMatched = false;
        }
    });

    if (allMatched) {
        let playerScores = [];
        const playerCounts = document.querySelectorAll(".player-count");

        playerCounts.forEach((count, index) => {
            playerScores.push({
                player: `Player ${index + 1}`,
                score: parseInt(count.innerText),
            });
        });

       
        playerScores.sort((a, b) => b.score - a.score);

        playerScores.forEach(player => {
            playerResultContainer.innerHTML += `
                <div class="player-result d-flex justify-content-between align-items-center">
                    ${player.player}
                    <div><span>${player.score} Pairs</span></div>
                </div>`;
        });
        winScreen.classList.remove("hide");
    }
}

// Restart game without changing theme/grid/player settings
restartButtons.forEach(button => {
    button.addEventListener("click", () => {
        determineGameBoard();
        clearInterval(timerID);
        seconds = 0;
        minutes = 0;
        document.querySelector(".time").innerText = "0 : 00";
        timerID = setInterval(startTimer, 1000);
        moveCount.innerHTML = 0;
        winScreen.classList.add("hide");
        playerResultContainer = ``;
        
        let counts = document.querySelectorAll(".player-count")
            counts.forEach(count =>{
                count.innerHTML =`0`;
            })
            
    })
})

