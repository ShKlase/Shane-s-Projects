// ==================== DOM Elements ====================
let selectorBtns = document.querySelectorAll(".selector-btns");
let selectorImgs = document.querySelectorAll(".x-img, .o-img");
let cpuBtn = document.querySelector(".new-game-btn-cpu");
let plyrBtn = document.querySelector(".new-game-btn-player");
let newGame = document.getElementById("new-game-menu");
let playerMark = "";
let gameBoard = document.getElementById("game-board");
let boardSquares = document.querySelectorAll(".board-square");
let turnCounter = 0;
let turnBox = document.querySelector(".turn-container");
let restartBtn = document.querySelector(".restart-btn");
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Main diagonal
    [2, 4, 6]  // Anti-diagonal
];
let winScreen = document.getElementById("win-screen");
let winMsg = document.querySelector(".win-msg-container");
let nextRndBtn = document.querySelector(".next-rnd-btn");
let quitBtn = document.querySelector(".quit-btn");
let cpuMark = "";
let xScore = document.querySelector(".x-score");
let oScore = document.querySelector(".o-score");
let result = document.querySelector(".result");
let xTally = document.querySelector(".x-tally");
let oTally = document.querySelector(".o-tally");
let tieTally = document.querySelector(".tie-tally");
let gameMode = "";
let selectorCheck = false;

// ==================== Functions ====================
// Check if someone won or if it's a draw
function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        const squareA = boardSquares[a].innerHTML.trim();
        const squareB = boardSquares[b].innerHTML.trim();
        const squareC = boardSquares[c].innerHTML.trim();

        if (squareA !== "" && squareA === squareB && squareA === squareC) {
            // Highlight winning combination and update tally
            if (squareA.includes("icon-x-default")) {
                boardSquares[a].classList.add("light-blue-bg");
                boardSquares[b].classList.add("light-blue-bg");
                boardSquares[c].classList.add("light-blue-bg");

                boardSquares[a].innerHTML = `<img src="./assets/images/SVG/icon-x-win.svg" class="img-win">`;
                boardSquares[b].innerHTML = `<img src="./assets/images/SVG/icon-x-win.svg" class="img-win">`;
                boardSquares[c].innerHTML = `<img src="./assets/images/SVG/icon-x-win.svg" class="img-win">`;

                xTally.innerHTML++;
                if (playerMark === "O") result.innerHTML = "OH NO, YOU LOST...";
                return "X";
            } else if (squareA.includes("icon-o-default")) {
                boardSquares[a].classList.add("yellow-bg");
                boardSquares[b].classList.add("yellow-bg");
                boardSquares[c].classList.add("yellow-bg");

                boardSquares[a].innerHTML = `<img src="./assets/images/SVG/icon-o-win.svg" class="img-win">`;
                boardSquares[b].innerHTML = `<img src="./assets/images/SVG/icon-o-win.svg" class="img-win">`;
                boardSquares[c].innerHTML = `<img src="./assets/images/SVG/icon-o-win.svg" class="img-win">`;

                oTally.innerHTML++;
                if (playerMark === "X") result.innerHTML = "OH NO, YOU LOST...";
                return "O";
            }
        }
    }

    // Check for draw
    if (turnCounter === 9) {
        turnBox.innerHTML = `DRAW.`;
        winScreen.classList.remove("hide");
        winMsg.innerHTML = `<span class="win-messsage grey">ROUND TIED</span>`;
        result.innerHTML = ``;
        tieTally.innerHTML++;
        return "DRAW";
    }

    return null;
}

    
// ==================== Event Listeners ====================
// Player mark selection
selectorBtns.forEach((button, index) => {
    button.addEventListener("click", () => {
         // Remove previous active classes
        selectorBtns.forEach(b => {b.classList.remove("active-selector")});
        selectorImgs.forEach(img =>{img.classList.remove("active-filter")});
        // Highlight selected button
        button.classList.add("active-selector");
        selectorImgs[index].classList.add("active-filter");
         playerMark = button.dataset.mark;
        cpuMark = playerMark === "X" ? "O" : "X";
        selectorCheck = true;
    })
    
})

// Start new game vs CPU
cpuBtn.addEventListener("click", ()=>{
     if (!selectorCheck) {
        alert("Please select X or O before starting!");
        return;
    }
    gameMode = "cpu";
newGame.classList.add("hide");
gameBoard.classList.remove("hide")

// Swap scores if CPU is X
if(cpuMark === "X"){
    xScore.innerHTML = `X (CPU) <div class="x-tally">0</div>`
    oScore.innerHTML = `O (YOU) <div class="o-tally">0</div>`
    setTimeout(cpuPlay, 500);
}


})


// Start new game vs Player
plyrBtn.addEventListener("click", ()=>{
if (!selectorCheck) {
alert("Please select X or O before starting!");
return;
}

newGame.classList.add("hide");
gameBoard.classList.remove("hide")
gameMode = "player";


if(cpuMark === "X"){
    xScore.innerHTML = `X (P2) <div class="x-tally">0</div>`
    oScore.innerHTML = `O (P1) <div class="o-tally">0</div>`
}else{
    xScore.innerHTML = `X (P1) <div class="x-tally">0</div>`
    oScore.innerHTML = `O (P2) <div class="o-tally">0</div>`
}
})

// Click on board squares
boardSquares.forEach((button) => {
    button.addEventListener("click", () => {
        // Only allow click if square is empty and it's player's turn
        if (button.innerHTML.trim() === "" &&
            (gameMode !== "cpu" || turnCounter % 2 === (playerMark === "X" ? 0 : 1))) {
            // Determine which mark to place
            if (turnCounter % 2 === 0) {
                button.innerHTML = `<img src="./assets/images/SVG/icon-x-default.svg" class="x-img-3">`;
                turnBox.innerHTML = `<img src="./assets/images/SVG/icon-o-default.svg" class="x-img-2"> <p>TURN</p>`;
            } else {
                button.innerHTML = `<img src="./assets/images/SVG/icon-o-default.svg" class="o-img-board">`;
                turnBox.innerHTML = `<img src="./assets/images/SVG/icon-x-default.svg" class="x-img-2"> <p>TURN</p>`;
            }
            turnCounter++;

            const winner = checkWinner();
            if (winner) {
                winScreen.classList.remove("hide");
                if (winner === "X") {
                    winMsg.innerHTML = `
                        <img class="round-winner-img-2" src="./assets/images/SVG/icon-x-win.svg">
                        <span class="win-messsage blue">TAKES THE ROUND</span>`;
                } else if (winner === "O") {
                    winMsg.innerHTML = `
                        <img class="round-winner-img-2" src="./assets/images/SVG/icon-o-win.svg">
                        <span class="win-messsage yellow">TAKES THE ROUND</span>`;
                }
                boardSquares.forEach(b => b.style.pointerEvents = "none"); // Prevent further clicks
                return;
            }
            // CPU plays if in CPU mode
            if (gameMode === "cpu" && turnCounter % 2 === (cpuMark === "X" ? 0 : 1)) {
                setTimeout(cpuPlay, 500);
            }
        }
    });
});

// Restart game: reset scores and board
restartBtn.addEventListener("click", () => {
tieTally.innerHTML = 0;
xTally.innerHTML = 0;
oTally.innerHTML = 0;
resetGame();
});

// Next round button
nextRndBtn.addEventListener("click", () => {
    winScreen.classList.add("hide");
    resetGame();
})

// Quit button
quitBtn.addEventListener("click", ()=>{
    winScreen.classList.add("hide");
})

// ==================== Helper Functions ====================
// Reset the board for a new round
function resetGame(){
    boardSquares.forEach((button) => {
        button.innerHTML = ``; 
        button.style.pointerEvents = "all";
        button.classList.remove("light-blue-bg");
        button.classList.remove("yellow-bg");
    });
    turnCounter = 0;
    turnBox.innerHTML = `<img src="./assets/images/SVG/icon-x-default.svg" class="x-img-2" <p>TURN</p>`;
    result.innerHTML = "YOU WON!";
    winMsg.innerHTML = `
                        <img class="round-winner-img" src="./assets/images/SVG/icon-x-win.svg">
                        <span class="win-messsage">TAKES THE ROUND</span>`;
};


    
function cpuPlay() {
    // Fallback order for CPU moves (center > corners > edges)
    const fallbackOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7];

    // Exit if game already has a winner or all squares filled
    if (checkWinner() || turnCounter >= 9) return;

    // Loop through preferred moves
    for (let index of fallbackOrder) {
        // Check if the square is empty
        if (boardSquares[index].innerHTML.trim() === "") {
            // Place CPU's mark (X or O) on the chosen square
            boardSquares[index].innerHTML = `<img src="./assets/images/SVG/icon-${cpuMark.toLowerCase()}-default.svg" class="${cpuMark.toLowerCase()}-img-board">`;
            turnCounter++;

            // Check if this move results in a win or draw
            const winner = checkWinner();
            if (winner || turnCounter >= 9) {
                // Stop further moves by disabling clicks
                boardSquares.forEach(b => b.style.pointerEvents = "none");
                // Show win/draw screen if needed
                winScreen.classList.remove("hide");
                return;
            }

            // If it's still CPU's turn after this move, make another move after delay
            if (gameMode === "cpu" && turnCounter % 2 === (cpuMark === "X" ? 0 : 1)) {
                setTimeout(cpuPlay, 500);  // Delay to simulate thinking
            }
            // Exit loop after making a move
            return;
        }
    }
}
