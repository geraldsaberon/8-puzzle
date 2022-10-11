const PUZZLE_CONTAINER = document.getElementById("puzzle-container");
const RANDOM_MOVES = 3; // Generate puzzle permutation RANDOM_MOVES away from goal


function drawTiles() {
    // create puzzle tiles
    PUZZLE_CONTAINER.innerHTML = ""
    let tiles = []
    let tile;
    for (let i=1; i<=3; i++) {
        for (let j=1; j<=3; j++){
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
function moveTile() {
    blankTile = tiles.find((tile) => tile.textContent == 0)
    // console.log("number", this.textContent, ", gridColumn", this.style.gridColumn, ", gridRow", this.style.gridRow)
    col = parseInt(this.style.gridColumn);
    row = parseInt(this.style.gridRow);
    blankCol = parseInt(blankTile.style.gridColumn);
    blankRow = parseInt(blankTile.style.gridRow);
    x = (col+row)-(blankCol+blankRow)
    console.log(x)
    if ((x == 1 || x == -1) && (col == blankCol || row == blankRow)) {
        [this.style.gridColumn, blankTile.style.gridColumn] = [blankTile.style.gridColumn, this.style.gridColumn];
        [this.style.gridRow, blankTile.style.gridRow] = [blankTile.style.gridRow, this.style.gridRow];
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
    return state
}


// randomize position of tiles
function randomize() {
    console.log("hello")
}
