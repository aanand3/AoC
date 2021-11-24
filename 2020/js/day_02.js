const fs = require('fs');
const input =
    fs.readFileSync(process.stdin.fd)
        .toString()


Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}

String.prototype.charCount = function (character) {
    return (this.match(new RegExp(character, "g")) || []).length
}

const rowFormat = /^(\d+)-(\d+)\ ([a-z]):\ ([a-z]+)$/gm

const parsedRows = [...input.matchAll(rowFormat)]

const part1Result = parsedRows.count(([_, min, max, character, pass]) => {
    const charCount = pass.charCount(character)
    return +min <= charCount && charCount <= +max
})

const part2Result = parsedRows.count(([_, pos1, pos2, character, pass]) => {
    return pass.charAt(pos1 - 1) === character ^ pass.charAt(pos2 -1) === character
})

console.log('part 1: ', part1Result);
console.log('part 2: ', part2Result);