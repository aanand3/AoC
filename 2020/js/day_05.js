const input = require('fs')
    .readFileSync(process.stdin.fd)
    .toString()
    .split('\n');

const mapping = {'F': '0', 'B': '1', 'L': '0', 'R': '1'};

const seats =
    input.map(r => r.replace(/[FBLR]/g, m => mapping[m]))
        .map(b => parseInt(b, 2))
        .sort((a, b) => a - b)

const part1Result = seats[seats.length - 1]
console.log(part1Result)

for (let i = 0; i < seats.length; i++) {
    if (seats[i] + 1 !== seats[i + 1]) {
        console.log(seats[i] + 1)
        break
    }
}
