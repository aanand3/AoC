const fs = require('fs');
const input =
    fs.readFileSync(process.stdin.fd)
        .toString()
        .split('\n')

let horizontal_position = 0;
let depth = 0;
let aim = 0;

for (let i = 0; i < input.length; i++) {
    const [direction, amount] = input[i].split(" ")
    switch (direction) {
        case "forward":
            horizontal_position += +amount;
            depth += (+amount * aim)
            break;
        case "up":
            aim -= +amount;
            break;
        case "down":
            aim += +amount;
            break;
    }
}

console.log("part 2: ", horizontal_position*depth)

