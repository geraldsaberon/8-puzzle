class Node {
    constructor(state, parent, pathCost, goal=[0,1,2,3,4,5,6,7,8]) {
        this.state = state;
        this.parent = parent;
        this.pathCost = pathCost;
        this.goal = goal
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
                neighbors.push(new Node(state_copy, this.state, this.pathCost+1, this.goal));
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
        let distance = 0;
        let xS, yS, xG, yG;

        for (let i = 0; i < this.goal.length; i++) {
            [xS, yS] = getXY(this.state, this.state[i]);
            [xG, yG] = getXY(this.goal, this.state[i]);
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
