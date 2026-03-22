
function Board(size, states, topStrings, sideStrings) { //make the object
    this.size = size;
    this.states = states;
    this.topStrings = topStrings;
    this.sideStrings = sideStrings;
}

const boards = [[], [], []];


let preSetStates = [];
let preSetTop = [];
let preSetSide = [];

function randomBoard(size) {
    preSetStates = [];
    preSetSide = [];
    preSetTop = [];
    preSetSide = [];

    //preset states list
    //0 is empty, 1 is filled (functionally the same as empty)
    for (let j=0; j<size; j++) { //rows
        preSetStates.push([]);
        for (let k=0; k<size; k++) { //columns
            let state = Math.floor(Math.random() * 101);
            if (state >= 75) {
                state = "0";
            } else {
                state = "1";
            }
            preSetStates[j].push(state);
        }
    }

    //preset strings - side
    let filledSquares = 0;
    for (let j=0; j<size; j++) { //rows
        preSetSide.push(''); //add an item to the list for each row
        for (let k=0; k<size; k++) { //columns
            if (preSetStates[j][k] == "1") {
                filledSquares++;
            } else {
                if (filledSquares>0) {
                    preSetSide[j] += " "+String(filledSquares); //the number of filled squares in the row, running left to right 
                    filledSquares = 0;
                }
            }
        }
        if (filledSquares>0) { //in case the last square in the row is filled
            preSetSide[j] += " "+String(filledSquares);
            filledSquares = 0;
        }
    }

    //preset strings - top
    filledSquares = 0;
    for (let j=0; j<size; j++) {//columns
        preSetTop.push(''); //add an item to the list for each column
        for (let k=0; k<size; k++) { //rows
            if (preSetStates[k][j] == "1") {
                filledSquares++;
            } else {
                if (filledSquares>0) {
                    preSetTop[j] += "<br>"+String(filledSquares); //the number of filled squares in the column, running top to bottom 
                    filledSquares = 0;
                }
            }
        }
        if (filledSquares>0) { //in case the last square in the column is filled
            preSetTop[j] += "<br>"+String(filledSquares);
            filledSquares = 0;
        }
    }
}

for (let i=0; i<100; i++) { //make 100 random boards of each size
    randomBoard(5);
    boards[0].push(new Board(5, preSetStates, preSetTop, preSetSide));
    randomBoard(10);
    boards[1].push(new Board(10, preSetStates, preSetTop, preSetSide));
    randomBoard(15);
    boards[2].push(new Board(15, preSetStates, preSetTop, preSetSide));
}