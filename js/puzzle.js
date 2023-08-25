class Puzzle {
    constructor(container) {
        this.container = container // root element to display the puzzle's tiles
        this.time_counter = document.getElementById("time")
        this.move_counter = document.getElementById("moves") // the element displaying the move counts
        this.move_count = -1 // counts the moves taken by automated solving
        this.move_count_user = 0 // counts the moves the user takes (e.g., clicking a tile)
        this._state = [0,1,2,3,4,5,6,7,8]
        this.goal = [0,1,2,3,4,5,6,7,8]
        this.shuffle()
        this.solve_speed = 150 // milliseconds between tile moves when automated solving
    }

    get state() {
        return this._state
    }

    set state(arr) {
        if (Puzzle.is_valid_puzzle(arr)) {
            this._state = arr
            this.draw_tiles()
            console.log(`Puzzle state set to [${arr}]`)
        }
    }

    get goal() {
        return this._goal
    }

    set goal(arr) {
        if (Puzzle.is_valid_puzzle(arr)) {
            this._goal = arr
            console.log(`Puzzle goal set to [${arr}]`)
        }
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
        let blank_tile_num = 0
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
            // update move counter element
            this.move_count_user += 1
            this.move_counter.innerText = `${this.move_count_user}`
            this.time_counter.innerText = ""
        }
    }

    shuffle() {
        this.reset_move_count()
        do {
            this._state = shuffleArray(this.state)
        } while (!Puzzle.is_solvable(this.state))
        this.draw_tiles()
    }

    solve(algorithm) {
        this.time_counter.innerText = ""
        this.reset_move_count()
        this.disable_tile_clicks(true)
        disable_buttons(true)

        let worker
        if (algorithm == "BFS") {
            worker = new Worker("js/bfs.js")
            worker.postMessage({command: "BFS", start: this.state, goal: this.goal})
        }
        else if (algorithm == "A*") {
            worker = new Worker("js/astar.js")
            worker.postMessage({command: "aStarSearch", start: this.state, goal: this.goal})
        }
        else return

        worker.addEventListener("message", async (message) => {
            this.time_counter.innerHTML = `Found solution in <b>${message.data.time}</b> seconds`
            for (let s of message.data.solution) {
                await sleep(this.solve_speed)
                this.state = s
                this.draw_tiles()
                this.move_count += 1
                this.move_counter.innerText = `${this.move_count}`
            }
            this.disable_tile_clicks(false)
            disable_buttons(false)
        })
    }

    reset_move_count() {
        /* this.move_count starts of as -1 to offset
        the solution sequence including the initial/start state */
        this.move_count = -1
        this.move_counter.innerText = "0"
        this.move_count_user = 0
        this.time_counter.innerText = ""
    }

    disable_tile_clicks(b=true) {
        this.container.style.pointerEvents = b ? "none" : "auto"
    }

    static is_valid_puzzle(arr) {
        if (!is_permutation(arr.slice(), [0,1,2,3,4,5,6,7,8])) {
            console.log("Not valid puzzle configuration. Must be a permutation of [0,1,2,3,4,5,6,7,8]")
            return false
        }
        else if (!Puzzle.is_solvable(arr)) {
            console.log(`Not valid puzzle configuration. [${arr}] is not a solvable configuration.`)
            return false
        }
        else {
            return true
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
