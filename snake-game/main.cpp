#include <iostream>
#include <conio.h>
#include <chrono>
#include <thread>
#include <cstdlib> 
#include <ctime>
#include <windows.h>
using namespace std;

//Function to randomly spawn an apple on our grid on an empty space, can't spawn on snake
void spawnApple(char gridList[20][40], int &appleRow, int &appleCol)
{
    while(true){
    int x = (rand() % 18) + 1; //Avoid Wall Borders
    int y = (rand() % 38) + 1; // Avoid Wall Borders

    if (gridList[x][y] == ' '){ 
        gridList[x][y] = '@'; //Place an apple
        appleRow = x;
        appleCol = y;
        break;
        }
    }
}

//Function to check if the snake has eaten an apple
bool appleEaten(int appleRow, int appleCol, int snakeRows[100], int snakeCols[100], int &snakeLength)
{
    if(snakeRows[0] == appleRow && snakeCols[0] == appleCol){ 
        snakeLength++; //Increase snake length
        return true;
    }
    return false;
}


int main()
{
    //Hide cursor for cleaner experience
    HANDLE consoleHandle = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(consoleHandle, &cursorInfo);
    cursorInfo.bVisible = false; 
    SetConsoleCursorInfo(consoleHandle, &cursorInfo);
    srand(time(0));

    //Setup/Variables
    int appleRow = 0, appleCol = 0;
    auto lastAppleTime = chrono::steady_clock::now(); //Apple tracking time
    int appleDelay = 5000; //Apple appears after 5000 miliseconds or 5 seconds 
    char gridList[20][40];
    bool borderFlag;
    bool sidesFlag;
    int snakeRows[100];
    int snakeCols[100];
    int snakeLength = 1;
    snakeRows[0] = 10; //Start in middle row
    snakeCols[0] = 20; // Start in middle column
    int dx = 0, dy = 0; //Movement
    bool gameOver = false;
    cout << unitbuf;

    //Initialize our grid with empty spaces in middle, # represent borders
    for(int i = 0; i < 20; i++){
        if(i == 0 || i == 19){
            borderFlag = false;
        }
        for(int j = 0; j < 40; j++){
            if(j == 0 || j == 39){
                sidesFlag = false;
            }

            if (borderFlag == false || sidesFlag == false)
            {
                gridList[i][j] = '#'; //Border
            }
            else
            {
                gridList[i][j] = ' '; //Play Area
            }
            sidesFlag = true; 
        }
        cout << endl;
        borderFlag = true;
        
    }

    //Game Loop
    while(true){

        system("cls"); //Clear screen for animation illusion

        //Move body from tail to head
        for (int i = snakeLength - 1; i > 0; i--)   
        {   
            //Check collision with other parts
            if (snakeRows[0] == snakeRows[i] && snakeCols[0] == snakeCols[i]){
                gameOver = true;
            }
            snakeRows[i] = snakeRows[i - 1];
            snakeCols[i] = snakeCols[i - 1];
        }

        //Move snake head
        snakeRows[0] += dx;
        snakeCols[0] += dy;

        //Check if snake collided with border
        if(snakeRows[0] == 0 || snakeCols[0] == 0 || snakeRows[0] == 19 || snakeCols[0] == 39){
            cout << "Game Over!" << endl;
            break;
        }

        //End if snake collided with self
        if(gameOver){
            cout << "Game Over!" << endl;
            break;
        }

        //Draw grid with snakes and apples
        for (int i = 0; i < 20; i++)
        {
            for (int j = 0; j < 40; j++)
            {
                bool isSnakeHere = false;
                for (int k = 0; k < snakeLength; k++)
                {
                    if (snakeRows[k] == i && snakeCols[k] == j)
                    {
                        isSnakeHere = true;
                        break;
                    }
                }

                //Draw/grow snake 
                if (isSnakeHere)
                {
                    cout << 'O';
                }
                else
                {
                    cout << gridList[i][j];
                }
            }
            cout << endl;
        }

        cout.flush();

        //Controls game speed
        this_thread::sleep_for(chrono::milliseconds(70));

        //Keyboard controls (WASD)
        if (_kbhit())
        {
            char key = _getch();
            if (key == 'w')
            {
                dx = -1;
                dy = 0;
            }
            if (key == 's')
            {
                dx = 1;
                dy = 0;
            }
            if (key == 'a')
            {
                dx = 0;
                dy = -1;
            }
            if (key == 'd')
            {
                dx = 0;
                dy = 1;
            }
    }

    //Check to see if its time to spawn apple
    auto now = chrono::steady_clock::now();
    int timeSinceApple = chrono::duration_cast<chrono::milliseconds>(now - lastAppleTime).count();

    //Detect if there is already an apple in play
    bool appleFlag = false;
    for (int i = 0; i < 20; i++) {
        for (int j = 0; j < 40; j++) {
            if(gridList[i][j] == '@'){
                appleFlag = true;
            }
        }
    }
            //Spawn apple if time passed and one does not exist
            if (timeSinceApple >= appleDelay && appleFlag == false)
            {
                spawnApple(gridList, appleRow, appleCol);
                lastAppleTime = chrono::steady_clock::now();
            }   

            //If apple is eaten, remove apple, grow snake, and spawn new one
            if (appleEaten(appleRow, appleCol, snakeRows, snakeCols, snakeLength))
            {
                gridList[appleRow][appleCol] = ' ';
                spawnApple(gridList, appleRow, appleCol);
                lastAppleTime = chrono::steady_clock::now();
            }
        }

        return 0;
    }
