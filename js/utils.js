/*

*/

function shuffleArray(array, seed=Math.random()) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(_random(seed) * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
        ++seed;
    }
    return array;
}


function _random(seed) {
    let x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
}


// get [row, col] of an item in array of length 9, as if it was a 3x3 array
const getXY = (board, item) => [Math.floor(board.indexOf(item)/3), board.indexOf(item)%3]


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


const is_permutation = (arr1, arr2) => JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())


function reconstructPath(start, visited, goal=[0,1,2,3,4,5,6,7,8]) {
    let solution = [goal.slice()];
    let key = goal.toString();
    let current;
    while (key != start.toString()) {
        current = visited.get(key).parent.toString();
        solution.push(
            current.split(",")
            .map(n => parseInt(n))
        );
        key = current;
    }
    return solution.reverse();
}


function disable_buttons(b=true) {
    let buttons = document.getElementsByClassName("pctrl")
    for (let button of buttons) {
        button.disabled = b
    }
}