#include <iostream>
#include <vector>
#include <thread>
#include <algorithm>
#include <ctime>
#include <conio.h>
#include <chrono>
#ifdef _WIN32
#include <windows.h>
#endif
using namespace std;

const int rows = 21;
const int cols = 21;
int sRow;
int sCol;

char maze[rows][cols];

void initMaze()
{
    for(int i = 0; i < rows; i++){
        for(int j = 0; j < cols; j++){
            maze[i][j] = '#';
        }
    }
}

void printMaze(){
    cout << endl;
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            cout << maze[i][j];
        }
        cout << endl;
    }
}

void generateMaze(int row, int col){
    maze[row][col] = ' ';
    int directions[4][2] = {{-2, 0}, {2, 0}, {0, -2}, {0, 2}}; //Directions
    random_shuffle(begin(directions), end(directions)); //Random

    for(int i = 0; i < 4; i++){ //Loops 4 Times
        int newRow = row + directions[i][0];
        int newCol = col + directions[i][1];

        if (newRow > 0 && newRow < rows - 1 && newCol > 0 && newCol < cols - 1)
        {
            if (maze[newRow][newCol] == '#'){
                maze[(row + newRow) / 2][(col + newCol) / 2] = ' ';
                generateMaze(newRow, newCol);
            }
        }
}
}

void clearScreen(){
    cout << "\033[2J\033[1;1H";
}

void handleMonsterMovement(vector<pair<int, int>> &monsters, int playerRow, int playerCol)
{
    for(int i = 0; i < monsters.size(); i++){
        int mRow = monsters[i].first;
        int mCol = monsters[i].second;

        maze[mRow][mCol] = ' ';

        if (playerRow < mRow && maze[mRow - 1][mCol] == ' '){
            mRow--;
        }else if (playerRow > mRow && maze[mRow + 1][mCol] == ' '){
            mRow++;
        }else if (playerCol < mCol && maze[mRow][mCol - 1] == ' '){
            mCol--;
        }else if (playerCol > mCol && maze[mRow][mCol + 1] == ' '){
            mCol++;
        }

        monsters[i].first = mRow;
        monsters[i].second = mCol;

        maze[mRow][mCol] = 'M';
    }
}

void useItem(string item, int &playerHP, int &monsterHP)
{
    if (item == "Potion")
    {
        if(playerHP + 5 > 10){
            playerHP = 10;
        }else{
            playerHP += 5;
        }
        
    }
    else if (item == "Bow")
    {
        monsterHP -= 3;
    }
}

void handleItemUsage(vector<string> &bag, int &playerHP, int &monsterHP){
    clearScreen();
    int itemCounter = 1;

    cout << endl << "You open your bag" << endl;
    for(int i = 0; i < bag.size(); i++){
        cout << endl << itemCounter << ". " << bag[i] << endl;
        itemCounter++;
    }

    cout << endl << "Press the corresponding number to use" << endl;

    if(_kbhit()){
        char key = _getch();

        if (key == '1' && bag.size() >= 1)
        {
            useItem(bag[0], playerHP, monsterHP);
            bag.erase(bag.begin());
        }
        else if (key == '2' && bag.size() >= 2)
        {
            useItem(bag[1], playerHP, monsterHP);
            bag.erase(bag.begin() + 1);
        }
    }


    cout << endl << "Press any key to return to the fight.";
    _getch();
    clearScreen();
};


void handleCombat(bool &running, vector<string> &bag, int &playerHP)
{
    clearScreen();
    cout << "You encountered a monster! Combat begins!";

    int monsterHP = 5;

    while(playerHP > 0 && monsterHP > 0){
        cout << endl  << "Your HP: " << playerHP << " | Monster HP: " << monsterHP << endl;
        cout << endl << "Choose an action:" << endl;
        cout << "1. Attack" << endl << "2. Defend" << endl << "3. Use an Item" << endl;

        char choice = _getch();
        cout << endl << choice << endl;

        if(choice == '1'){
            cout << endl << "You attacked the monster!" << endl;
            monsterHP -= 2;
        }else if(choice == '2'){
            cout << endl << "You defend this turn" << endl;
        }else if(choice == '3'){
           handleItemUsage(bag, playerHP, monsterHP);
        }else{
            cout << endl << "Invalid Choice" << endl;
            continue;
        }

        if (monsterHP > 0){
            if(choice == '2'){
                cout << endl << "The monster attacked, but you blocked it!";
            }else{
                cout << endl << "The monster attacks!";
                playerHP -= 2;
            }
        }
        cout << endl << "Press any key to continue" << endl;
        _getch();

        clearScreen();
    }

    if(playerHP <= 0){
        cout << endl << "You were defeated by the monster..." << endl;
        running = false;
    }else{
        cout << endl << "You defeated the monster!" << endl;
        cout << endl << "Press any key to return to the maze" << endl;
        _getch();
        clearScreen();
    }
}

void handleItem(vector<string> &bag)
{
    clearScreen();
    int randItem = (rand() % 2);
    string foundItem;

    
        if(randItem == 0){
            foundItem = "Potion";
            cout << endl << "You found a potion!" << endl;
        }else{
            foundItem =  "Bow";
            cout << endl << "You found a bow!" << endl;
            randItem--;
        }

        bag.push_back(foundItem);

        cout << endl << "Enter any key to return to the maze" << endl;
        _getch();
        clearScreen();
}

int main()
{
#ifdef _WIN32
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    DWORD dwMode = 0;
    GetConsoleMode(hOut, &dwMode);
    dwMode |= ENABLE_VIRTUAL_TERMINAL_PROCESSING;
    SetConsoleMode(hOut, dwMode);
#endif
    srand(time(0));
    int mazeCounter = 0;
    bool running = true;
    int playerHP = 10;

    //while(mazeCounter < 5){
        initMaze();
        
        sRow = (rand() % rows/2) * 2 + 1; //Starting Index
        sCol = (rand() % cols/2) * 2 + 1;


        generateMaze(sRow, sCol); //Generate Maze Paths

        maze[sRow][sCol] = 'S'; //Place Start

        int eRow, eCol; //Find Spot to Put End and Monsters
        do
        {
            eRow = rand() % rows;
            eCol = rand() % cols;
        } while (maze[eRow][eCol] != ' ' || (eRow == sRow && eCol == sCol));

        maze[eRow][eCol] = 'E';
        vector<pair<int, int>> monsters; //Store monsters for later
        vector<pair<int, int>> items; //Store items for later
        vector<string> bag;  //Bag items for later

        int monsterCount = 0;
        while (monsterCount < 3) //Spawn three
        {
            int mRow = rand() % rows; //Random spots
            int mCol = rand() % cols;

            if (maze[mRow][mCol] == ' ' && !(mRow == sRow && mCol == sCol) && !(mRow == eRow && mCol == eCol)) //Cant spawn in walls or start/end
            {
                maze[mRow][mCol] = 'M';
                monsters.push_back({mRow, mCol});
                monsterCount++;
            }
        }

        int itemCount = 0;
        while(itemCount < 2){

            int iRow = rand() % rows; // Random spots
            int iCol = rand() % cols;

            if(maze[iRow][iCol] == ' '  && !(iRow == sRow && iCol == sCol) && !(iRow == eRow && iCol == eCol)){
                bool spotTaken = false;

                for (int i = 0; i < monsters.size(); i++)
                {
                    if (monsters[i].first == iRow && monsters[i].second == iCol)
                    {
                        spotTaken = true;
                        break;
                    }
                }

                if(!spotTaken){
                    maze[iRow][iCol] = 'I';
                    items.push_back({iRow, iCol});
                    itemCount++;
                }
            };
        }

        //mazeCounter++;
        printMaze();
        while(running){
            

            if(_kbhit()){
                char key = _getch();
                int pRow = sRow;
                int pCol = sCol;
                switch(key){
                    case 'w': pRow--;
                    break;

                    case 's': pRow++;
                    break;

                    case 'a': pCol--;
                    break;

                    case 'd': pCol++;
                    break;

                    case 'q': running = false; 
                    continue;
                }

                if(maze[pRow][pCol] == ' '){
                    maze[sRow][sCol]  = ' ';
                    sRow = pRow;
                    sCol = pCol;
                    maze[sRow][sCol] = 'P';
                }

                if (maze[pRow][pCol] == 'E'){
                    maze[sRow][sCol] = ' ';
                    sRow = pRow;
                    sCol = pCol;
                    maze[sRow][sCol] = 'P';
                    clearScreen();
                    printMaze();
                    cout << "You Win!";
                    running = false; 
                    continue;
                }

                if (maze[pRow][pCol] == 'M'){
                    handleCombat(running, bag, playerHP);

                    for(int i = 0; i < monsters.size(); i++)
                    {
                        if (monsters[i].first == pRow && monsters[i].second == pCol)
                        {
                            monsters.erase(monsters.begin() + i);
                            break;
                        }
                    }
                    maze[pRow][pCol] = ' ';
                }

                if(maze[pRow][pCol] == 'I'){
                    handleItem(bag);

                    for(int i = 0; i < items.size();  i++){
                        if(items[i].first == pRow && items[i].second == pCol){
                            items.erase(items.begin() + i);
                            break;
                        }
                    }

                    maze[pRow][pCol] = ' ';
                }

                handleMonsterMovement(monsters, sRow, sCol);
                clearScreen();
                printMaze();
                cout << endl << "HP: " << playerHP << " | Items: " << bag.size() << endl;
            }
        }
    }
    
    
//}