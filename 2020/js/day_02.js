const fs = require('fs');
const input =
    fs.readFileSync(process.stdin.fd)
        .toString()
// .split('\n');


Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}

String.prototype.charCount = function (character) {
    return (this.match(new RegExp(character, "g")) || []).length
}

const rowFormat = /^(\d+)-(\d+)\ ([a-z]):\ ([a-z]+)$/gm

const result =
    [...input.matchAll(rowFormat)].count(([_, min, max, character, pass]) => {
        const charCount = pass.charCount(character)
        return +min <= charCount && charCount <= +max
    })

console.log(result);