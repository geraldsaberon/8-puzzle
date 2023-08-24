function BFS(start, goal=[0,1,2,3,4,5,6,7,8]) {
    let startTime = performance.now();
    let visited = new Map();
    let frontier = [new Node(start, null, 0)];
    let next;
    let solutionFound = false;
    let statesExpanded = 0;

    while (frontier && !solutionFound) {
        next = [];
        for (let current of frontier) {
            if (current.stateStr == goal.toString()) {
                solutionFound = true;
                break;
            }
            for (let neighbor of current.neighbors) {
                statesExpanded += 1;
                if (!visited.has(neighbor.stateStr)) {
                    visited.set(neighbor.stateStr, neighbor);
                    next.push(neighbor);
                }
            }
        }
        frontier = next;
    }
    solution = reconstructPath(start, visited, goal);
    let endTime = performance.now()
    console.log(`Found solution in ${(endTime-startTime)/1000} seconds. ${statesExpanded} states expanded`)
    return solution;
}
