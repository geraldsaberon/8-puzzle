const PUZZLE_CONTAINER = document.getElementById("puzzle-container");
let RANDOM_MOVES = 3; // Generate puzzle permutation RANDOM_MOVES away from goal


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


function randomize() {
    console.log("hello")
}
