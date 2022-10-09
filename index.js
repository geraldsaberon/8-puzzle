const PUZZLE_CONTAINER = document.getElementById("puzzle-container")

// create puzzle tiles
function drawTiles() {
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
    return tiles;
}

let tiles = drawTiles();


//  add tile number and move function
for (let i=0; i<9; i++) {
    tiles[i].id = `_${i}`;
    tiles[i].textContent = i;
    tiles[i].onclick = moveTile;
}


//
let blankTile = tiles[0];

function moveTile() {
    // console.log("number", this.textContent, ", gridColumn", this.style.gridColumn, ", gridRow", this.style.gridRow)
    let col = parseInt(this.style.gridColumn);
    let row = parseInt(this.style.gridRow);
    let emptycol = parseInt(blankTile.style.gridColumn);
    let emptyrow = parseInt(blankTile.style.gridRow);
    let x = (col+row)-(emptycol+emptyrow)
    console.log(x)
    if ((x == 1 || x == -1) && (col == emptycol || row == emptyrow)) {
        [this.style.gridColumn, blankTile.style.gridColumn] = [blankTile.style.gridColumn, this.style.gridColumn];
        [this.style.gridRow, blankTile.style.gridRow] = [blankTile.style.gridRow, this.style.gridRow];
    }
}


function randomize() {
    console.log("hello")
}
