const fs = require('fs');
const input =
    fs.readFileSync(process.stdin.fd)
        .toString()
        .split('\n')
        .map(i => Number(i));

let decreasedCount = 0;
for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i-1]) decreasedCount++
}

console.log("part 1: ", decreasedCount)

let windowIncreasedCount = 0;
for (let i = 0; i < input.length - 3; i++) {
    let group1Sum = input[i] + input[i+1] + input[i+2]
    let group2Sum = input[i+1] + input[i+2] + input[i+3]

    if (group2Sum > group1Sum) windowIncreasedCount++
}
console.log("part 2: ", windowIncreasedCount)
