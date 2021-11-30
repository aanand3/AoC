const groups = require('fs').readFileSync(process.stdin.fd).toString().split('\n\n');

String.prototype.letterFrequency = function () {
    return Array.from(this).reduce((acc, letter) => (acc[letter] = -~acc[letter], acc), {})
}

Array.prototype.sum = function () {
    return this.reduce((acc, val) => acc + val, 0);
}

const part1Result =
    groups.map(s => s.replaceAll("\n", ""))
        .map(s => s.letterFrequency())
        .map(s => Object.keys(s).length)
        .sum()

console.log(part1Result);