function aStarSearch(start, goal=[0,1,2,3,4,5,6,7,8]) {
    let startTime = performance.now();
    let visited = new Map();
    let q = new PriorityQueue({comparator: (a, b) => a.fn - b.fn});
    q.queue(new Node(start, null, 0));
    let statesExpanded = 0;

    while (q.length > 0) {
        let current = q.peek();
        visited.set(current.stateStr, current);

        if (current.stateStr == goal.toString())
            break;

        q.dequeue();
        for (let neighbor of current.neighbors) {
            statesExpanded += 1;
            if (!visited.has(neighbor.stateStr)) 
                q.queue(neighbor);
        }
    }
    let solution = reconstructPath(start, visited);
    let endTime = performance.now()
    console.log(`Found solution in ${(endTime-startTime)/1000} seconds. ${statesExpanded} states expanded`)
    return solution;
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


// get [row, col] of an item in a 2d array
function getXY(board, item) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i][j] == item)
                return [i, j]; 
}
