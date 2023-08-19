const PUZZLE_CONTAINER = document.getElementById("puzzle-container");
const BUTTONS = document.getElementsByClassName("pctrl");
const MOVES_COUNTER = document.getElementById("moves");
const SOLVE_SPEED = 150; // Milliseconds. The time it takes for a tile to move.


// create puzzle tiles
function drawTiles() {
    PUZZLE_CONTAINER.innerHTML = ""
    let tiles = []
    let tile;

    for (let i = 1; i <= 3; i++)
        for (let j = 1; j <= 3; j++) {
            tile = document.createElement("div");
            tile.className = "tile";

            tile.style.gridRow    = i;
            tile.style.gridColumn = j;

            tiles.push(tile);
            PUZZLE_CONTAINER.appendChild(tile);
        }

    //  add tile number and move function
    for (let i = 0; i < 9; i++) {
        tiles[i].id = `_${i}`;
        tiles[i].textContent = i;
        tiles[i].onclick = moveTile;
    }

    return tiles;
}


// The game's 8 tile pieces
let tiles = drawTiles();


let col, row, blankTile, blankCol, blankRow, distance;
let moves_count = 0;
function moveTile() {
    blankTile = tiles.find((tile) => tile.textContent == 0)
    blankCol = parseInt(blankTile.style.gridColumn);
    blankRow = parseInt(blankTile.style.gridRow);
    col = parseInt(this.style.gridColumn);
    row = parseInt(this.style.gridRow);
    distance = (col + row) - (blankCol + blankRow);

    if ((distance == 1 || distance == -1) && (col == blankCol || row == blankRow)) {
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
    ps.forEach((tile) => state[m[tile[0]]] = tile[1]);
    state = state.map(el => parseInt(el));
    return state
}


// randomize position of tiles
function randomizePuzzle(seed=Math.random()) {
    moves_count = 0;
    MOVES_COUNTER.textContent = 0;
    tiles = drawTiles();
    let state;

    do {
        state = shuffleArray(getPuzzleState(), seed++);
    } while (!isSolvable(state))

    for (let i = 0; i < 9; i++) {
        tiles[i].textContent = state[i];
        tiles[i].id = `_${state[i]}`;
    }
}


// checks whether puzzle permutation is solvable
function isSolvable(state) {
    var pos = state.indexOf(0);
    var _state = state.slice();
    _state.splice(pos, 1);
    var count = 0;
    for (var i = 0; i < _state.length; i++)
        for (var j = i + 1; j < _state.length; j++)
            if (_state[i] > _state[j])
                count++;

    return count % 2 === 0;
}


function disableBtns(t=true) {
    for (let i in BUTTONS)
        BUTTONS[i].disabled = t;
}


let _moves_count;
function solve(algo) {
    let seq;
    if (algo == "BFS")
        seq = BFS(getPuzzleState());
    else if (algo == "A*")
        seq = aStarSearch(getPuzzleState());
    else
        return;

    _moves_count = -1;
    disableBtns();
    seq.forEach((arr, index) => {
        setTimeout(() => {
            tiles = drawTiles();
            // rearrange tiles based on arr
            for (let i = 0; i < 9; i++) {
                tiles[i].textContent = arr[i];
                tiles[i].id = `_${arr[i]}`;
            }
            _moves_count += 1;
            MOVES_COUNTER.textContent = _moves_count;
            if (index == seq.length - 1) {
                disableBtns(false);
            }
        }, index * SOLVE_SPEED);
    });
}