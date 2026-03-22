//lists of buttons
const firstRow = document.getElementsByClassName("rowOne");
const secondRow = document.getElementsByClassName("rowTwo");
const thirdRow = document.getElementsByClassName("rowThree");
const fourthRow = document.getElementsByClassName("rowFour");
const fifthRow = document.getElementsByClassName("rowFive");
const sixthRow = document.getElementsByClassName("rowSix");
const seventhRow = document.getElementsByClassName("rowSeven");
const eighthRow = document.getElementsByClassName("rowEight");
const ninthRow = document.getElementsByClassName("rowNine");
const tenthRow = document.getElementsByClassName("rowTen");
const eleventhRow = document.getElementsByClassName("rowEleven");
const twelfthRow = document.getElementsByClassName("rowTwelve");
const thirteenthRow = document.getElementsByClassName("rowThirteen");
const fourteenthRow = document.getElementsByClassName("rowFourteen");
const fifteenthRow = document.getElementsByClassName("rowFifteen");
const rows = [firstRow, secondRow, thirdRow, fourthRow, fifthRow, sixthRow, seventhRow, eighthRow, ninthRow, tenthRow, eleventhRow, twelfthRow, thirteenthRow, fourteenthRow, fifteenthRow]

const states = [];

let boardSize = document.getElementById("size-dropdown").value;
let chosenBoard;

let hints = 0;

//states: 0 is empty, 1 is filled, 2 is crossed out

function changeState(row, square) { //change the state of a cell
    let squareInQuestion = rows[row-1][square-1];

    if (squareInQuestion.id=="0") { //if empty
        squareInQuestion.style.backgroundColor = 'black'; //fill
        squareInQuestion.id = "1";
    } else if (squareInQuestion.id == "1") { //if full
        squareInQuestion.style.backgroundColor = 'grey'; //cross out
        squareInQuestion.id = "2";
    } else { //if crossed out
        squareInQuestion.style.backgroundColor = 'white'; //empty
        squareInQuestion.id = "0";
    }

    if (squareInQuestion.id=="1") { //update the state list for future reference
        states[row-1][square-1] = squareInQuestion.id; 
    } else {
        states[row-1][square-1] = "0"; //because crossed out & blank are functionally the same
    }
}

function compareArrays(a, b) { //check two 2D arrays
    for (let i = 0; i < a.length; i++) {
        for (let j=0; j<a.length; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function checkBoard() { //check if the board is correct
    if (compareArrays(chosenBoard.states, states)) { 
        alert("Correct!");
        if (confirm("Generate a new board?")) {
            newBoard(); //generate a new board 
        }
    } else {
        alert("Incorrect!");
        if (confirm("Clear all incorrect squares?")) {
            clearErrors();
        }
    }
}

function clearErrors() { //clear any incorrect squares
    for (let i=0; i<boardSize; i++) { //row
        for (let j=0; j<boardSize; j++) { //column
            if(states[i][j] != chosenBoard.states[i][j]) {
                states[i][j] = 0;
                rows[i][j].id = "0";
                rows[i][j].style.backgroundColor = 'white';
            }
        }
    }
}

function clearBoard(confirmationNeeded) {
    let clear;

    if(confirmationNeeded) { //only ask the user if the 'clear board' button has been pressed
        clear = confirm("Are you sure? This action can't be undone!");
    } else {
        clear = true;
    }

    if (clear) {
        for (let i=0; i<boardSize; i++) { //rows
            for (let j=0; j<boardSize; j++) { //columns
                rows[i][j].style.backgroundColor = "white"; //reset each cell
                rows[i][j].id = "0";
                states[i][j] = "0";
            }
        }
    }
}

function newBoard() {
    let index;

    hints=0; //update the hints counter
    document.getElementById("hintsCounter").innerHTML = "0";

    for (let i=0; i<boardSize; i++) { //make a list of all the states
        states.push([]); //row
        for (let j=0; j<boardSize; j++) { //add the state of all the squares in the row
            states[i].push(rows[i][j].id);
        }
    }

    if (boardSize == 5) { //pick from the right list
        index = 0;
    } else if (boardSize == 10) {
        index = 1;
    } else {
        index = 2;
    }

    let chosenIndex = Math.floor(Math.random() * (boards[index].length)); //choose a random board
    chosenBoard = boards[index][chosenIndex];

    const topStrings = document.getElementsByClassName("topStrings");
    const sideStrings = document.getElementsByClassName("sideStrings");

    for (let i=0; i<boardSize; i++) { //set the numbers at the sides & top
        topStrings[i].innerHTML = chosenBoard.topStrings[i];
        sideStrings[i].innerHTML = chosenBoard.sideStrings[i];
    }
    for (let i=boardSize; i<15; i++) { //remove the excess strings when moving down a boardsize
        topStrings[i].innerHTML = "";
        sideStrings[i].innerHTML = "";
    }
    
    clearBoard(false);
}

function showBoard() {
    if (confirm("Are you sure? This action can't be undone!")) {
        boardSize = document.getElementById("size-dropdown").value; //in case it's changed since the page was loaded

        for (let i=0; i<15; i++) { //show all the necessary cells
            
            for (let j=0; j<15; j++) {
                if (i<boardSize && j<boardSize) {
                    rows[i][j].style.display = "inline-block";
                } else {
                    rows[i][j].style.display = "none";
                }
            }
        }

        let table = document.getElementById("nonogramBoard"); //for width
        if (boardSize==5) {
            table.className = "five";
            console.log(document.getElementById("nonogramBoard").class);
        } else if (boardSize == 10) {
            table.className = "ten";
            console.log(document.getElementById("nonogramBoard").class);
        } else {
            table.className = "fifteen";
            console.log(document.getElementById("nonogramBoard").class);
        }

        newBoard(); //make a new board
    }
}

function hint() {
    statesString = ["empty", "filled", "crossed out"];
    let prevState;
    let currentState;
    let x;
    let y;
    let hint = false;

    for (let i=0; i<boardSize; i++) { //rows
        if (hint) {
            break;
        }
        for (let j=0; j<boardSize; j++) { //columns
            if (states[i][j] != chosenBoard.states[i][j]) { //changes the first incorrect square it finds to the correct state
                x = j+1;
                y = i+1;
                console.log(x, y);
                prevState = statesString[states[i][j]]; //for the alert to accompany the hint

                /*changing the state*/
                states[i][j] = chosenBoard.states[i][j];
                rows[i][j].id = chosenBoard.states[i][j];

                if (states[i][j] == 0) {
                rows[i][j].style.backgroundColor = 'white';
                } else if (states[i][j] == 1) {
                rows[i][j].style.backgroundColor = 'black';
                } else {
                rows[i][j].style.backgroundColor = 'grey';
                }
                /*-------------------------------------*/

                currentState = statesString[states[i][j]]; //for the alert to accompany the hint

                hint = true; //make sure to only fill in one square
                break;
            }
            console.log("hi");
        }
    }

    alert("Changed square "+x+" , "+y+" from "+prevState+" to "+currentState);

    hints++;
    document.getElementById("hintsCounter").innerHTML = hints;
}