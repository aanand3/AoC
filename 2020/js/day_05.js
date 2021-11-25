const input = require('fs')
    .readFileSync(process.stdin.fd)
    .toString()
    .split('\n');

const mapping = { 'F': '0', 'B': '1', 'L': '0', 'R': '1' };

const result = input
    .map(r => r.replace(/[FBLR]/g, m => mapping[m]))
    .map(b => parseInt(b, 2))

console.log(Math.max(...result))
