importScripts("utils.js", "node.js", "priorityQueue.js")

addEventListener("message", message => {
    if (message.data.command === "aStarSearch")
        aStarSearch(message.data.start, message.data.goal)
})

function aStarSearch(start, goal=[0,1,2,3,4,5,6,7,8]) {
    let startTime = performance.now();
    let visited = new Map();
    let q = new PriorityQueue({comparator: (a, b) => a.fn - b.fn});
    q.queue(new Node(start, null, 0, goal));
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
    let solution = reconstructPath(start, visited, goal);
    let endTime = performance.now()
    console.log(`Start: ${start}. Found solution in ${(endTime-startTime)/1000} seconds. ${statesExpanded} states expanded`)
    postMessage({solution})
}
