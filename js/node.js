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
        if (this.state[zero_pos-3] != undefined) {
            state_copy = this.state.slice();
            [state_copy[zero_pos], state_copy[zero_pos-3]] = [state_copy[zero_pos-3], state_copy[zero_pos]];
            neighbors.push(new Node(state_copy, this.state, this.pathCost+1));
        }
        if ((zero_pos != 2) && (zero_pos != 5) && (zero_pos != 8)) {
            state_copy = this.state.slice();
            [state_copy[zero_pos], state_copy[zero_pos+1]] = [state_copy[zero_pos+1], state_copy[zero_pos]];
            neighbors.push(new Node(state_copy, this.state, this.pathCost+1));
        }
        if (this.state[zero_pos+3] != undefined) {
            state_copy = this.state.slice();
            [state_copy[zero_pos], state_copy[zero_pos+3]] = [state_copy[zero_pos+3], state_copy[zero_pos]];
            neighbors.push(new Node(state_copy, this.state, this.pathCost+1));
        }
        if ((zero_pos != 0) && (zero_pos != 3) && (zero_pos != 6)) {
            state_copy = this.state.slice();
            [state_copy[zero_pos], state_copy[zero_pos-1]] = [state_copy[zero_pos-1], state_copy[zero_pos]];
            neighbors.push(new Node(state_copy, this.state, this.pathCost+1));
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
        let goal=[0,1,2,3,4,5,6,7,8];
        let state2D = transform2D(this.state);
        let goal2D = transform2D(goal);
        let distance = 0;
        let xS, yS, xG, yG;
        for (let i = 0; i < goal.length; i++) {
            if (this.state[i] != 0) {
                [xS, yS] = getXY(state2D, this.state[i]);   
                [xG, yG] = getXY(goal2D, this.state[i]);
                distance += Math.abs(xS - xG) + Math.abs(yS - yG);
            }
        }
        return distance
    }
}
