Project Name: Snake Game

Tech Used: C++

Description:
A classic Snake game implemented in C++ for the console. The player controls a snake that grows in length by eating apples randomly spawned on the grid. The game ends if the snake collides with the wall or itself. This project focuses on array manipulation, game logic, console input/output, and timing using C++ libraries. This was my first attempt at creating a playable game entirely in C++.

Key Features & Learnings:
- Snake Movement: Use WASD keys to control the snake in real-time.  
- Apple Spawning: Apples appear randomly on empty spaces; the snake grows when eaten.  
- Collision Detection: Detects collisions with walls and the snake itself to end the game.  
- Grid Display: Dynamically draws the grid, snake, and apples using the console.  
- Game Loop & Timing: Uses C++ threads and chrono for smooth updates and delays.  
- First C++ Game Project: Reinforced understanding of arrays, loops, conditional logic, and basic game mechanics.

How to Use: 
1. Open the project folder.  
2. Compile `main.cpp` using a C++ compiler (e.g., `g++ main.cpp -o snake.exe`).  
3. Run the resulting `snake.exe` in the console.  
4. Use `W`, `A`, `S`, `D` keys to move the snake.  
5. Eat apples (`@`) to grow the snake and avoid hitting walls or itself.  

Difficulty: 
Intermediate — Combines C++ arrays, loops, conditional logic, console I/O, and real-time game mechanics.

Note: 
This version works in the Windows console and may behave differently on other systems. Some minor bugs may exist with apple spawning or edge collisions.