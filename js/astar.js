function aStarSearch(start) {
    /* A* search algorithm adapted from CSC173 lecture slides "Informed Search"*/
    let startTime = performance.now();
    const goal = [0,1,2,3,4,5,6,7,8];
    let openSet = [new Node(start, null, 0)];
    let closedSet = [];
    let same;
    let statesExpanded = 0;

    while (openSet.length != 0) {
        current = openSet.find(i => i.fn == Math.min(...openSet.map(j => j.fn)));
        openSet.splice(openSet.indexOf(current), 1);
        closedSet.push(current);

        if (current.state.toString() == goal.toString()) {
            let endTime = performance.now()
            console.log(`Found solution in ${(endTime-startTime)/1000} seconds. ${statesExpanded} states expanded`)
            break;
        }
        statesExpanded += 1;
        for (let neighbor of current.neighbors) {
            same = openSet.concat(closedSet).find(i => i.stateStr == neighbor.stateStr);
            if (same) {
                if (neighbor.pathCost < same.pathCost) {
                    console.log("hello")
                    openSet.push(neighbor);
                }
            } else {
                openSet.push(neighbor);
            }
        }
    }

    // reconstruct path
    let solutionSequence = [goal];
    let parentMap = Object();
    closedSet.map(i => parentMap[i.state] = i.parent);

    let currentKey = "0,1,2,3,4,5,6,7,8";
    while (parentMap[currentKey]) {
        solutionSequence.push(parentMap[currentKey]);
        currentKey = parentMap[currentKey];
    }
    return solutionSequence.reverse();
}


// turn a 1d array of length 9 into a 2d array (3x3 grid)
// used for calculating manhattan distance
function transform2D(a) {
    let arr = a.slice();
    const transformed = [];
    while (arr.length) {
        transformed.push(arr.splice(0,3));
    }
    return transformed
}


// get [row, col] of an element in an array
function getXY(board, item) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] == item)
                return [i, j]; 
}
