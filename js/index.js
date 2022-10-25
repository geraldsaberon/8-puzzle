const PUZZLE_CONTAINER = document.getElementById("puzzle-container");
const BUTTONS = document.getElementsByClassName("pctrl");
const MOVES_COUNTER = document.getElementById("moves");
const WIN_NOTIF = document.getElementById("win-notif");
const SOLVE_SPEED = 150; // milliseconds


function drawTiles() {
    // create puzzle tiles
    PUZZLE_CONTAINER.innerHTML = ""
    let tiles = []
    let tile;
    for (let i=1; i<=3; i++) {
        for (let j=1; j<=3; j++) {
            tile = document.createElement("div");
            tile.className = "tile";
            
            tile.style.gridColumn = j;
            tile.style.gridRow    = i;

            tiles.push(tile);
            PUZZLE_CONTAINER.appendChild(tile);    
        }
    }
    //  add tile number and move function
    for (let i=0; i<9; i++) {
        tiles[i].id = `_${i}`;
        tiles[i].textContent = i;
        tiles[i].onclick = moveTile;
    }
    return tiles;
}

let tiles = drawTiles();


let col, row, blankTile, blankCol, blankRow, x;
let moves_count = 0;
function moveTile() {
    blankTile = tiles.find((tile) => tile.textContent == 0)
    col = parseInt(this.style.gridColumn);
    row = parseInt(this.style.gridRow);
    blankCol = parseInt(blankTile.style.gridColumn);
    blankRow = parseInt(blankTile.style.gridRow);
    x = (col+row)-(blankCol+blankRow)
    if ((x == 1 || x == -1) && (col == blankCol || row == blankRow)) {
        // reset move counter after auto solving 
        if (_moves_count > 0) {
            MOVES_COUNTER.textContent = 0;
            moves_count = 0;
            _moves_count = -1; // BFS solve move count;
        }

        // move tile
        [this.style.gridColumn, blankTile.style.gridColumn] = [blankTile.style.gridColumn, this.style.gridColumn];
        [this.style.gridRow, blankTile.style.gridRow] = [blankTile.style.gridRow, this.style.gridRow];
        
        // increment move counter
        moves_count += 1;
        MOVES_COUNTER.textContent = moves_count;
        
        // check if puzzle state is solved
        if (getPuzzleState().toString() ==  "0,1,2,3,4,5,6,7,8") {
            WIN_NOTIF.hidden = false;
        } else {
            WIN_NOTIF.hidden = true;
        }
    }
}


// moves blank tile [LEFT, RIGHT, UP, DOWN]
function moveBlank(dir) {
    let toSwapWith;
    blankTile = tiles.find((tile) => tile.textContent == 0)
    col = blankTile.style.gridColumn
    row = blankTile.style.gridRow

    switch (dir) {
        case "Up":
            toSwapWith = tiles.find((tile) => (tile.style.gridRow == parseInt(row)-1) && (tile.style.gridColumn == col));
            [blankTile.style.gridRow, toSwapWith.style.gridRow] = [toSwapWith.style.gridRow, row];
            break
        case "Right":
            toSwapWith = tiles.find((tile) => (tile.style.gridRow == row) && (tile.style.gridColumn == parseInt(col)+1));
            [blankTile.style.gridColumn, toSwapWith.style.gridColumn] = [toSwapWith.style.gridColumn, col];
            break
        case "Down":
            toSwapWith = tiles.find((tile) => (tile.style.gridRow == parseInt(row)+1) && (tile.style.gridColumn == col));
            [blankTile.style.gridRow, toSwapWith.style.gridRow] = [toSwapWith.style.gridRow, row];
            break
        case "Left":
            toSwapWith = tiles.find((tile) => (tile.style.gridRow == row) && (tile.style.gridColumn == parseInt(col)-1));
            [blankTile.style.gridColumn, toSwapWith.style.gridColumn] = [toSwapWith.style.gridColumn, col];
            break
    }

}


// get current puzzle state
function getPuzzleState() {
    let state = [];
    const m = {
        "1 / 1": 0, 
        "1 / 2": 1, 
        "1 / 3": 2, 
        "2 / 1": 3, 
        "2 / 2": 4, 
        "2 / 3": 5, 
        "3 / 1": 6, 
        "3 / 2": 7, 
        "3 / 3": 8,
    }
    let ps = tiles.map((tile) => [tile.style.gridArea, tile.textContent]);
    ps.forEach((tile) => {
        state[m[tile[0]]] = tile[1];
    })
    state = state.map(el => parseInt(el));
    return state
}


// randomize position of tiles
function randomize(state=shuffleArray()) {
    moves_count = 0;
    MOVES_COUNTER.textContent = 0;
    WIN_NOTIF.hidden = true;
    tiles = drawTiles();
    // const state = shuffleArray();
    for (let i=0; i<9; i++) {
        tiles[i].textContent = state[i];
        tiles[i].id = `_${state[i]}`;
        PUZZLE_CONTAINER.appendChild(tiles[i])
    }
}


// generate puzzle permutation
function shuffleArray(arr=[0,1,2,3,4,5,6,7,8]) {
    let a = arr.sort((a, b) => 0.5 - Math.random());
    while (!checkSolvable(a)) {
        a = arr.sort((a, b) => 0.5 - Math.random());
    } 
    return a;
}


// checks whether puzzle permutation is solvable
function checkSolvable(state) {
    var pos = state.indexOf(0);
    var _state = state.slice();
    _state.splice(pos,1);
    var count = 0;
    for (var i = 0; i < _state.length; i++) {
        for (var j = i + 1; j < _state.length; j++) {
            if (_state[i] > _state[j]) {
                count++;
            }
        }
    }
    return count % 2 === 0;
}


function disableBtns(t=true) {
    for (let i in BUTTONS) {
        BUTTONS[i].disabled = t;
    }
}


let _moves_count;
function solve(algo) {
    let seq;
    if (algo == "BFS") {
        seq = BFS(getPuzzleState());
    } else if (algo == "A*"){
        seq = aStarSearch(getPuzzleState());
    } else {
        return;
    }
    _moves_count = -1;
    disableBtns();
    seq.forEach((arr, index) => {
        setTimeout(() => {
            tiles = drawTiles();
            // rearrange tiles based on arr
            for (let i=0; i<9; i++) {
                tiles[i].textContent = arr[i];
                tiles[i].id = `_${arr[i]}`;
                PUZZLE_CONTAINER.appendChild(tiles[i])
            }
            _moves_count += 1;
            MOVES_COUNTER.textContent = _moves_count;
            if (index == seq.length-1) {
                disableBtns(false);
                WIN_NOTIF.hidden = false;
            }
        }, index * SOLVE_SPEED);
    });
}