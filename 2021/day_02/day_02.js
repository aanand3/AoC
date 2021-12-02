const fs = require('fs');
const input =
    fs.readFileSync(process.stdin.fd)
        .toString()
        .split('\n')

let horizontal_position = 0;
let depth = 0;

for (let i = 0; i < input.length; i++) {
    const [direction, amount] = input[i].split(" ")
    switch (direction) {
        case "forward":
            horizontal_position += +amount;
            break;
        case "up":
            depth -= +amount;
            break;
        case "down":
            depth += +amount;
            break;
    }
}

console.log("part 1: ", horizontal_position*depth)

