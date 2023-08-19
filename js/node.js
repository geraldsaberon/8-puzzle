class Node {
    constructor(state, parent, pathCost) {
        this.state = state;
        this.parent = parent;
        this.pathCost = pathCost;
    }

    get neighbors() {
        let zero_pos;
        let state_copy;
        let neighbors = [];
        zero_pos = this.state.indexOf(0);

        for (let m of [-3, -1, 1, 3]) {
            state_copy = this.state.slice();
            if (Node.isValidMove(state_copy, m)) {
                [state_copy[zero_pos], state_copy[zero_pos + m]] = [state_copy[zero_pos + m], state_copy[zero_pos]];
                neighbors.push(new Node(state_copy, this.state, this.pathCost+1));
            }
        }

        return neighbors;
    }

    get fn() {
        return this.pathCost + this.manhattanDistance;
    }

    get stateStr() {
        return this.state.toString();
    }

    get manhattanDistance() {
        let goal = [0,1,2,3,4,5,6,7,8];
        let distance = 0;
        let xS, yS, xG, yG;

        for (let i = 0; i < goal.length; i++) {
            [xS, yS] = getXY(this.state, this.state[i]);
            [xG, yG] = getXY(goal, this.state[i]);
            distance += Math.abs(xS - xG) + Math.abs(yS - yG);
        }

        return distance
    }

    static isValidMove(state, move) {
        let zero_pos = state.indexOf(0)

        if (move ==  1 && ![2, 5, 8].includes(zero_pos) ||
            move == -1 && ![0, 3, 6].includes(zero_pos) ||
            ((move == 3 || move == -3) && state[zero_pos + move]))
        {
            return true
        }

        return false
    }
}

// get [row, col of an item in array of length 9, as if it was a 3x3 array
const getXY = (board, item) => [Math.floor(board.indexOf(item)/3), board.indexOf(item)%3]
