/*

*/

function shuffleArray(array, seed) {
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