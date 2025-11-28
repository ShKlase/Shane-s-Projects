#include <iostream>
#include <stack>
#include <vector>
#include <windows.h>
using namespace std;
//Directions For Maze
int dRow[] = {-1, 1, 0, 0};
int dCol[] = {0, 0, -1, 1};

void enableANSIColors()
{
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    DWORD dwMode = 0;
    GetConsoleMode(hOut, &dwMode);
    dwMode |= ENABLE_VIRTUAL_TERMINAL_PROCESSING;
    SetConsoleMode(hOut, dwMode);
}

//Colors ANSI Code
const string RESET = "\033[0m";
const string CYAN = "\033[36m";
const string GREEN = "\033[32m";
const string YELLOW = "\033[33m";

void bubbleSortVisualizer(){
    int size;               //Variables
    int arrContent;
    int stepIncrementer = 0;
    cout << endl;
    cout << "Enter array size: " << endl;
    cin >> size;
    int bubbleArray[size];
    cout << endl;
    cout << "Enter array elements: " << endl;
    for(int i = 0; i < size; i++){      //Creating Array
        cin >> arrContent;
        bubbleArray[i] = arrContent;
    }

    cout << endl;
    cout << "Beginning Bubble Sort..." << endl;
    cout << endl;

    // Bubble Sort Algorithm
    for(int i = 0; i < size - 1; i++){        //Loop through array without going out of bounds
        for(int j = 0; j < size - i - 1; j++){   //Compare all elementd in array, dont need to check last so subtract i   
            if(bubbleArray[j] > bubbleArray[j + 1]){     //Checks if element prior is larger    
                int temp = bubbleArray[j]; 
                bubbleArray[j] = bubbleArray[j + 1]; //Switches values if first is larger, until j > size -i -1
                bubbleArray[j + 1] = temp;
            }
        }
        stepIncrementer++;
        cout << "Sort " << stepIncrementer << ": "; //Outputs our step for visualizing
        for(int k = 0; k < size; k++){
            cout << bubbleArray[k] << " ";
        }
        cout << endl;
    }
       cout << "Array fully sorted!" << endl; //Prints when array is sorted from least to greatest
};

void selectionSortVisualizer(){
    int size;
    int arrContent;     //Variables
    cout << endl;
    cout << "Enter array size: " << endl;
    cin >> size;
    int selectionArray[size];
    cout << endl;
    cout << "Enter array elements: " << endl;
    for (int i = 0; i < size; i++)
    {
        cin >> arrContent;
        selectionArray[i] = arrContent;
    }

    //Selection Sort Array
    for(int i = 0; i < size - 1; i++){
        int minIndx = i; //minimumIndex starts at 0, to target first element in array
        for (int j = i + 1; j < size; j++){
            if(selectionArray[minIndx] > selectionArray[j]){    //If new index is smaller, minIndx = that index
                minIndx = j; //Stores minIndx
            }
        }
        if(minIndx != i){ //Ensures minIndx has been updated before swapping
            int temp = selectionArray[i]; //Switches indexes
            selectionArray[i] = selectionArray[minIndx];
            selectionArray[minIndx] = temp;
        }
        }

        cout << endl << "Sorted array: " << endl; 
        for (int i = 0; i < size; i++) //Prints sorted array
        {
            cout << selectionArray[i] << " ";
        }

        int minDiff = INT_MAX; 
        for (int i = 1; i < size; i++){
            int diff = selectionArray[i] - selectionArray[i - 1]; //Calculates difference between elements
            if(diff < minDiff){ //Stores smallest difference
                minDiff = diff;
            }
        }

        // Print all pairs with that difference

        cout << endl << "Minimum difference: " << minDiff << endl;
        cout << endl << "Pairs with that difference:" << endl;
        for(int i = 1; i < size; i++){
            if (selectionArray[i] - selectionArray[i - 1] == minDiff){
                cout << "[" << selectionArray[i - 1] << ", " << selectionArray[i] << "]" << endl;
            }
        }
};

void binarySearchVisualizer()
{   //Variables
    int size;
    int arrContent;
    int target;
    int step = 1;
    cout << endl;
    cout << "Enter array size: " << endl;
    cin >> size;
    int binaryArray[size];
    cout << endl;
    cout << "Enter SORTED array elements: " << endl;
    for (int i = 0; i < size; i++) //Binary needs sorted array
    {
        cin >> arrContent;
        binaryArray[i] = arrContent;
    }

    cout << endl << "Enter target for search:" << endl; //Also needs target
    cin >> target;

    int right = size - 1;   //Right-most element
    int left = 0;           //Beginning element
    
    while(left <= right){ 

        int middle = left + (right - left) / 2; //Updated each iteration
        cout << "Step " << step++ << ": "; //Print for visualizer
        cout << "Left = " << left << " Right = " << right << " Middle = " << middle << " (value " << binaryArray[middle] << ")" << endl;

        if(binaryArray[middle] == target){ //End-case, ends when target is found
            cout << "Found " << target << " at index " << middle << endl;
            return;
        }else if(binaryArray[middle] < target){ //If not found, check right and left half
            cout << target << " > " << binaryArray[middle] << ", searching right half" << endl;
            left = middle + 1; //Update middle for next iteration
        }else{
            cout << target << " < " << binaryArray[middle] << ", searching left half" << endl;
            right = middle - 1; //Update middle for next iteration
        }
    }
};

    //Function to print/update maze:

    void printMaze(char maze[10][10]){
    for (int i = 0; i < 10; i++)
    {
        for (int j = 0; j < 10; j++)
        {
            cout << maze[i][j];
        }
        cout << endl;
    }
    cout << "-------------------" << endl;
}
         bool dfs(char maze[10][10], int row, int col){
             int rows = 10;
             int cols = 10;

             //Checks if index is out of bounds, a wall, or a space we have already marked
             if (row < 0 || col < 0 || row >= rows || col >= cols || maze[row][col] == '#' || maze[row][col] == '*'){
                 return false;
             }

             //End-case, checks to see if we have found the exit
             if(maze[row][col] == 'E'){
                printMaze(maze);
                return true;
             }

             //If we arent at the start, mark the spot and print the new maze
             if(maze[row][col] != 'S'){ 
                 maze[row][col] = '*';
                 printMaze(maze);
             }

             //Check all four direcions around original point, keep going until we find exit
             for(int i = 0; i < 4; i++){
                int newCol = col + dCol[i];
                int newRow = row + dRow[i];
                if(dfs(maze, newRow, newCol)){
                    return true;
                }
             }

             if (maze[row][col] != 'S'){
                maze[row][col] = ' ';
                return false;
             }

             return false;
         }
          
    void depthFirstVisualizer()
    {
        //Set maze used in visualizer
        char mazeGrid[10][10] = {
            {'#', '#', '#', '#', '#', '#', '#', '#', '#', '#'},
            {'#', 'S', ' ', ' ', '#', ' ', ' ', ' ', ' ', '#'},
            {'#', ' ', '#', ' ', '#', ' ', '#', '#', ' ', '#'},
            {'#', ' ', '#', ' ', ' ', ' ', ' ', '#', ' ', '#'},
            {'#', ' ', '#', '#', '#', '#', ' ', '#', ' ', '#'},
            {'#', ' ', ' ', ' ', ' ', '#', ' ', '#', ' ', '#'},
            {'#', '#', '#', '#', ' ', '#', ' ', '#', ' ', '#'},
            {'#', ' ', ' ', '#', ' ', '#', ' ', '#', ' ', '#'},
            {'#', ' ', '#', '#', ' ', ' ', ' ', ' ', 'E', '#'},
            {'#', '#', '#', '#', '#', '#', '#', '#', '#', '#'}};
            int row = 1;
            int col = 1;

            //First function call/iteration, when it returns true, print it
            if(dfs(mazeGrid, row, col)){
                cout << "Path found!" << endl;
            }

    };


        //Function for printing stack after each step
        void printStack(stack<char> stk){
        cout << "Stack now: ";
        stack<char> temp = stk;
        string content = "";
        while (!temp.empty())
        {
            content = temp.top() + content;
            temp.pop();
        }
        for (char c : content)
            cout << c << " ";
        cout << endl;
    }

         bool stackVisualizer(){
             stack<char> stk;
             string s = "";
             cout << "Enter stack string ({, }, (, ), [, ]) only" << endl;
             cin >> s;
             for(char c : s){ //Loop through stack
                if(c == '(' || c == '{' || c == '['){
                    cout << "Pushed " << c << endl;     //Push stack if first-half of braces
                    stk.push(c); 
                    printStack(stk);
                }else{
                    if(stk.empty()){   //Only used if not an allowed character
                        cout << "Stack empty but found closing " << c << endl;
                        return false;
                    }
                    //Get top value of stack
                    char top = stk.top();
                    if ((c == ')' && top != '(') || //If brackets do not correspond ex: () then its a mismatch
                        (c == ']' && top != '[') ||
                        (c == '}' && top != '{'))
                    {
                        cout << "Mismatch, Expected matching for " << c << " but top was " << top << endl;
                        return false;
                    }

                    cout << "Popping " << top << " for closing " << c << endl;
                    stk.pop();
                    printStack(stk);   //If brackets do match then pop the braces 
                }
             }
             if (stk.empty())   //Stops when stack is done checking braces
             {
                 cout << "All matched! Stack empty at end." << endl;
                 return true;
             }
             else
             {  
                 cout << "Unmatched openings remain in stack." << endl;
                 printStack(stk);
                 return false;
             }
         };

         void printArray(const vector<int>& arr){
            for(int num : arr){
                cout << num << " ";
            }
            cout << endl;
         }

         int partition(vector<int> &nums, int low, int high){
            int i = low - 1; //Index of smaller element
            int pivot = nums[high]; //Choose last element as our pivot

                //Loop through all elements between low and high - 1
            for(int j = low; j < high; j++){
                if(nums[j] < pivot){
                    //If element is smaller than pivot, move smaller element index to right
                    i++;
                    swap(nums[i], nums[j]); //Swap smaller element with nums[i]
                }
            }
                //At end, place our pivot after the last smallest element (i+1)
                swap(nums[i + 1], nums[high]);
                return i + 1; //Return pivot index
            }

            void quickSort(vector<int> &nums, int low, int high){
                if(low < high){ //End Case
                    //Partition to get pivot index posititon
                    int pivotIndex = partition(nums, low, high);
                    //Recursively sort elements before/after pivotIndex
                    quickSort(nums, low, pivotIndex - 1);
                    quickSort(nums, pivotIndex + 1, high);
                }
            }

                void quickSortVisualizer()
            {
                vector<int> nums;
                int arrLength;

                cout << "Enter array length" << endl; //Initialize Arr
                cin >> arrLength;

                cout << "Enter array elements" << endl;
                int arrElement;

                for (int i = 0; i < arrLength; i++)
                {   
                    cin >> arrElement;
                    nums.push_back(arrElement);
                }

                cout << endl << "Before Sorting: " << endl; //Print Before Sort
                printArray(nums);

                quickSort(nums, 0, nums.size() - 1); //First QuickSort Call

                cout << "After Sorting: "; //Print After Sort (See Result)
                printArray(nums);
            }

            void mergeArr(vector<int>& nums, int left, int mid, int right){
                cout << endl << "Merging: ";
                for (int i = left; i <= right; ++i)
                {
                    cout << nums[i] << " ";
                }
                cout << RESET << endl;
                

                vector<int> temp; //Temporary Arr to Store/Sort Nums
                int i = left; //beginning to mid
                int j = mid + 1; //mid + 1 to end

                while(i <= mid && j <= right){  //Explained above
                    if(nums[i] < nums[j]){  //If left is smaller than right, push it to temp, if not push right
                        temp.push_back(nums[i++]); //Increment after pushed, compare to last j
                    }else{
                        temp.push_back(nums[j++]); //Increment after pushed, compare to last i
                    }
                }

                while(i <= mid){ //Push biggest remaining number in nums
                    temp.push_back(nums[i++]);
                }

                while(j <= right){  //Push biggest remaining number in nums
                    temp.push_back(nums[j++]);
                }

                for(int k = left; k <= right; k++){ //Update nums from temp
                    nums[k] = temp[k - left];
                }

                cout << endl << GREEN << "After Merge: ";
                for (int i = left; i <= right; ++i)
                {
                    cout << nums[i] << " ";
                }
                cout << RESET << endl;
                    
            }

            void mergeSort(vector<int>& nums, int left, int right){
                if(left >= right) return; //End Case, When theres only one element, break

                int mid = left + (right - left) / 2; //Calculate Middle of Arr

                cout << endl << YELLOW << "Splitting: ";  //Shows Split Array
                for (int i = left; i <= right; ++i) {
                    cout << nums[i] << " ";
                }
                cout << RESET << endl;

                mergeSort(nums, left, mid); //Splits Left of Array (beginning to mid)
                mergeSort(nums, mid + 1, right); //Splits Right of Array (mid to end)
                mergeArr(nums, left, mid, right); //Merges When Array Paths Are Fully Seperated (left >= right)
            }

            void mergeSortVisualizer(){
                vector<int> nums;
                int arrLength;
                cout << CYAN << "Enter array length:" << RESET << endl; //Same As QuickSort, Initializes Arr
                cin >> arrLength;

                cout << CYAN << "Enter array elements" << RESET << endl;
                int arrElement;

                for (int i = 0; i < arrLength; i++)
                {
                    cin >> arrElement;
                    nums.push_back(arrElement);
                }

                cout << endl << CYAN << "Before Sorting: " << endl << RESET; //Prints Before Sort
                printArray(nums);

                mergeSort(nums, 0, nums.size() - 1); //First Sort Call

                cout << endl << "After Sorting: "; //Prints After Sort
                printArray(nums);
            }

    int main()
    {
        enableANSIColors();

        int choice;

        while (choice != 8) //Stops when choice is 7
        {
            cout << endl;
            cout << "=== Visual Algorithm Simulator ===" << endl;
            cout << "Choose an algorithm to visualize:" << endl;
            cout << "1. Bubble Sort" << endl;
            cout << "2. Selection Sort" << endl;
            cout << "3. Binary Search" << endl;
            cout << "4. Recursive Backtracking Maze" << endl;
            cout << "5. Stack Reversal" << endl;
            cout << "6. Quick Sort" << endl;
            cout << "7. Merge Sort" << endl; 
            cout << "8. Exit" << endl;

            cin >> choice; 

            switch (choice) //Case in switch statement that branches main to functions
            {
            case 1:
                bubbleSortVisualizer();
                break;

            case 2:
                selectionSortVisualizer();
                break;

            case 3:
                binarySearchVisualizer();
                break;

             case 4: 
                depthFirstVisualizer();
                break;

             case 5: 
                 stackVisualizer();
                 break;

            case 6:
                quickSortVisualizer(); //COLOR CODING AND COMMENTS
                break;

            case 7: 
                mergeSortVisualizer();  //NEEDS COLOR CODING FIX
                break;

            //case 8:
                //bfs();
                //break;

             case 8: cout << "Exiting..." << endl; //Exit Case

             default:
                     cout << "Invalid Choice" << endl; //Only used when invalid # entered
            }
        }

        return 0;
    }