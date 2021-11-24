
Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}

Array.prototype.product = function () {
    return this.reduce((acc, val) => acc * val, 1);
}

const input = require('fs')
    .readFileSync(process.stdin.fd)
    .toString()
    .split('\n')
    .map(r => Array.from(r));

const mapHeight = input.length
const mapWidth = input[0].length

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
]

const results = slopes.map(([slopeX, slopeY]) =>
    Array.from({ length: mapHeight / slopeY })
        .map((_, i) => input[i * slopeY][(i * slopeX) % mapWidth])
        .count(symbol => symbol === '#')
)

console.log(results.product());
