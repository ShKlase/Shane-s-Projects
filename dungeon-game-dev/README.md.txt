Project Name: Maze Adventure (C++)

Description:
Maze Adventure is a console-based interactive game built entirely in C++, showcasing algorithmic maze generation, recursive path carving, and real-time player interaction.
The player navigates a procedurally generated labyrinth filled with monsters, collectible items, and a hidden exit, combining elements of pathfinding, combat mechanics, and resource management.
This project emphasizes algorithm design, recursion, state management, and terminal-based game loops.

Technologies Used:
Language: C++
Libraries: <iostream>, <vector>, <thread>, <chrono>, <algorithm>, <ctime>, <conio.h>, and <windows.h>
Environment: Windows Command Prompt / PowerShell 

Features:
1. Procedural Maze Generation
Uses a depth-first search (DFS) recursive algorithm to carve random paths from a fully walled grid.
Guarantees solvable mazes with a single connected region.
Adjustable grid size (rows × cols).

2. Player Exploration
Navigate with W, A, S, D keys.
Real-time movement via non-blocking input (_kbhit() and _getch()).
Player symbol: P
Walls: #
Open paths: (space)
Exit: E

3. Monster AI
Monsters (M) move intelligently toward the player using simple chase logic.
Trigger turn-based combat encounters when the player collides with one.

4. Combat System
Turn-based fight loop with attack, defend, and item options.
Health points (HP) persist across encounters.
Defense reduces incoming damage, while attack and items affect HP dynamically.

5. Inventory & Item System
Collectable items (I) include:
Potion: Heals +5 HP (up to max 10 HP)
Bow: Ranged attack causing -3 monster HP
Inventory persists and can be accessed during battle.

6. Game Over & Victory Conditions
Win: Reach the exit (E) alive.
Lose: HP reaches 0 during combat.
Game ends gracefully with feedback messages.

Key Concepts & Learnings
Concept	Description
Recursive Maze Generation - Implemented via backtracking; ensures fully connected pathways without loops.
Real-Time Input	Managed using _kbhit() for non-blocking key detection.
Dynamic Data Structures	Vectors store monsters, items, and inventory contents efficiently.
State Management - Maintains player HP, item usage, and combat state seamlessly.
Randomization - Random start, exit, and entity placement using rand() and random_shuffle().
Game Loop Design - Structured control flow for consistent user interaction and visual updates.

How to Play:
Compile and run the program (Windows recommended)

Controls:
Move: W, A, S, D
Quit: Q

Goal: Reach the E (exit) before your HP drops to 0.

Combat:
1 = Attack
2 = Defend
3 = Use Item

Items:
Collect I symbols for usable inventory items.

Possible Enhancements
Add pathfinding AI (BFS or A*) for smarter monster movement.
Implement difficulty scaling (larger mazes, faster monsters).
Introduce save/load functionality via file I/O.
Add color-coded visualization for player, monsters, and exits using ANSI codes.

🧾 Example Output
#####################
#S   #   #   #     E#
### ### ### # ##### ##
#     #     #       #
# ### # ### ### ### #
# #   # #   #   #   #
# # ### # ### ### # #
# #   # #   #   # # #
# ### # ### # # # # #
#     #     # #   # #
#####################
HP: 10 | Items: 1

🧩 Difficulty:
Advanced — My project integrates:
Recursive backtracking algorithms
Dynamic data structures
Event-driven input systems
Turn-based combat logic
Multi-entity state tracking