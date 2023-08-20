class Puzzle {
    constructor(container) {
        this.container = container // root element to display the puzzle's tiles
        this.state = [0,1,2,3,4,5,6,7,8]
        this.shuffle()
        this.solve_speed = 150 // milliseconds between tile moves when automated solving
    }

    draw_tiles() {
        this.tiles = []
        this.container.innerHTML = ""
        let tile
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++){
                tile = new PuzzleTile(this.state[this.tiles.length], i, j)
                tile.onclick = (clicked_tile) => this.move_tile(clicked_tile.target)
                this.tiles.push(tile)
                this.container.appendChild(tile)
            }
        }
    }

    move_tile(clicked_tile) {
        let blank_tile = this.tiles.find(tile => tile.textContent == 0)
        let blank_tile_num = parseInt(blank_tile.textContent)
        let blank_tile_row = parseInt(blank_tile.style.gridRow)
        let blank_tile_col = parseInt(blank_tile.style.gridColumn)
        let clicked_tile_num = parseInt(clicked_tile.textContent)
        let clicked_tile_row = parseInt(clicked_tile.style.gridRow)
        let clicked_tile_col = parseInt(clicked_tile.style.gridColumn)
        let distance = (clicked_tile_row + clicked_tile_col) - (blank_tile_row + blank_tile_col)

        if (Math.abs(distance) == 1 &&
            (clicked_tile_row == blank_tile_row ||
             clicked_tile_col == blank_tile_col))
        {
            // move tile. swaps the position of the clicked tile and the blank tile
            [clicked_tile.style.gridRow, blank_tile.style.gridRow] = [blank_tile_row, clicked_tile_row];
            [clicked_tile.style.gridColumn, blank_tile.style.gridColumn] = [blank_tile_col, clicked_tile_col];
            // update this.state
            let tmp = this.state.indexOf(clicked_tile_num)
            this.state[this.state.indexOf(blank_tile_num)] = clicked_tile_num
            this.state[tmp] = blank_tile_num
        }
    }

    shuffle() {
        do {
            this.state = shuffleArray(this.state, Math.random())
        } while (!Puzzle.is_solvable(this.state))
        this.draw_tiles()
    }

    async solve(algorithm) {
        let solution
        if (algorithm == "BFS")
            solution = BFS(this.state)
        else if (algorithm == "A*")
            solution = aStarSearch(this.state)
        else
            return

        for (let s of solution) {
            await sleep(this.solve_speed)
            this.state = s
            this.draw_tiles()
        }
    }

    static is_solvable(state) {
        let pos = state.indexOf(0);
        let _state = state.slice();
        _state.splice(pos, 1);
        let count = 0;
        for (let i = 0; i < _state.length; i++)
            for (let j = i + 1; j < _state.length; j++)
                if (_state[i] > _state[j])
                    count++;
        return count % 2 === 0;
    }
}


class PuzzleTile {
    constructor(num, row, col) {
        let tile = document.createElement("div")
        tile.className = "tile"
        tile.style.gridRow = row
        tile.style.gridColumn = col
        tile.textContent = num ? num : ""
        tile.id = `_${num}`
        return tile
    }
}


let puzzle = new Puzzle(document.getElementById("puzzle-container"))
