Visual Algorithm Simulator
Project Overview

The Visual Algorithm Simulator is an interactive C++ console-based visualization tool that demonstrates how classic algorithms operate step by step. The program lets users explore sorting, searching, recursion, and data structure operations with real-time updates, stack traces, and maze pathfinding visualizations directly in the terminal.

This project highlights algorithmic reasoning, recursion, data structure manipulation, and console visualization using ANSI color codes.

Technologies Used:
Language: C++ (Standard Library)
Environment: Windows Console (with ANSI escape codes enabled)
Libraries: <iostream>, <stack>, <vector>, <windows.h>

Algorithms Implemented:
Bubble Sort Visualizer – Demonstrates iterative comparisons and swaps, printing each sorting pass.
Selection Sort Visualizer – Sorts while tracking and displaying the minimum index selection per iteration.
Binary Search Visualizer – Step-by-step midpoint evaluation on a sorted array with direction hints.
Recursive Maze Solver (Depth-First Search) – Explores a 10×10 maze grid using recursion and backtracking, printing each traversal step until the exit is found.
Stack Matching Visualizer – Simulates push/pop operations for parentheses/braces matching, showing the stack state after every operation.
Quick Sort Visualizer – Recursively partitions arrays, showing pivot selection and sorted subarrays.
Merge Sort Visualizer – Demonstrates divide-and-conquer with split and merge phases color-coded for clarity.

Key Features & Learnings:
Step-by-Step Visualization: Every iteration, comparison, or recursion step is printed live.
ANSI Color Output: Used to emphasize merges, splits, and sorted segments for better readability.
Data Structure Simulation: Stack operations are printed and reversed dynamically for real-time understanding.
Recursion and Backtracking: Visualized with the maze pathfinding DFS, illustrating recursive state changes.
Algorithm Comparison: Observe time and step complexity differences through visual iteration counts.
User Interaction: Menu-driven interface to select algorithms and input data.

Educational Value:
This simulator serves as both a learning tool and a portfolio demonstration of:
Recursive vs. iterative problem-solving.
Algorithm complexity visualization.
Memory and stack trace understanding.
Console-based user interface design.

How to Run:
Clone the repository or copy the .cpp file into your C++ IDE
Compile and run the file.
g++ algorithm_simulator.cpp -o simulator
./simulator
Choose an algorithm (1–8) from the main menu.
Follow the input prompts (array size, elements, or stack string).
Watch the algorithm execute step by step in the terminal.

Note: ANSI colors are automatically enabled for Windows consoles via ENABLE_VIRTUAL_TERMINAL_PROCESSING.

Example Demonstrations
Bubble Sort Example
Enter array size: 5
Enter array elements: 8 2 6 1 4

Beginning Bubble Sort...

Sort 1: 2 6 1 4 8
Sort 2: 2 1 4 6 8
Sort 3: 1 2 4 6 8
Array fully sorted!

Maze DFS Example
# # # # # # # # # #
# S * * # * * * * #
...
Path found!

Future Enhancements (Not Done)

Add Breadth-First Search (BFS) visualization for comparison with DFS.

Integrate Dijkstra’s and A* pathfinding algorithms.

Include runtime step counters and time complexity metrics.

Support cross-platform color rendering (macOS/Linux).

Difficulty

Intermediate to Advanced — integrates algorithm logic, recursion, stack management, and visual debugging.