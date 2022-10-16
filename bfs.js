function get_neighbors(state) {
    let zero_pos;
    let state_copy;
    let neighbors = [];

    zero_pos = state.indexOf(0);

    // Move up
    if (state[zero_pos-3] != undefined) {
        state_copy = state.slice();
        [state_copy[zero_pos], state_copy[zero_pos-3]] = [state_copy[zero_pos-3], state_copy[zero_pos]];
        neighbors.push(state_copy);
    }

    // Move right
    if ((zero_pos != 2) && (zero_pos != 5) && (zero_pos != 8)) {
        state_copy = state.slice();
        [state_copy[zero_pos], state_copy[zero_pos+1]] = [state_copy[zero_pos+1], state_copy[zero_pos]];
        neighbors.push(state_copy);
    }

    // Move down
    if (state[zero_pos+3] != undefined) {
        state_copy = state.slice();
        [state_copy[zero_pos], state_copy[zero_pos+3]] = [state_copy[zero_pos+3], state_copy[zero_pos]];
        neighbors.push(state_copy);
    }

    // move left
    if ((zero_pos != 0) && (zero_pos != 3) && (zero_pos != 6)) {
        state_copy = state.slice();
        [state_copy[zero_pos], state_copy[zero_pos-1]] = [state_copy[zero_pos-1], state_copy[zero_pos]];
        neighbors.push(state_copy);
    }

    return neighbors
}


function BFS(s, goal=[0,1,2,3,4,5,6,7,8]) { // s is starting state.
    let startTime = performance.now();

    let level = {s: 0};
    let parent = Object();
    parent[s] = null;
    let next;
    let i = 1;
    let frontier = [s];
    let sol_found = false;

    while (frontier.length != 0) {
        next = [];
        for (let u of frontier) {
            if (u.toString() == goal.toString()) {
                sol_found = true;
                break;
            }
            for (let v of get_neighbors(u)) {
                if (!(v in level)) {
                    level[v] = i;
                    parent[v] = u.toString();
                    next.push(v);
                }
            }
        }
        if (sol_found){
            break;
        }
        frontier = next;
        i += 1;
    }

    // tracing parent paths for solution, from starting state -> goal state
    let sol = [goal];
    let current_key = '0,1,2,3,4,5,6,7,8';
    let to_add;
    while (current_key != s.toString()) {
        to_add = parent[current_key].split(",");
        to_add = to_add.map(el => parseInt(el));
        sol.push(to_add);
        current_key = parent[current_key];
    }

    let endTime = performance.now()
    console.log(`Found solution in ${(endTime-startTime)/1000} seconds`)

    return sol.reverse();
}


let _moves_count;
function solve(seq) {
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
            }
        }, index * SOLVE_SPEED);
    });
}
