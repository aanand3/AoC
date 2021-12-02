const date = new Date().getDate();

const fs = require("fs");
const test_input = fs.readFileSync(`./day_0${date}_test.txt`)
    .toString()
    .split("\n");

const actual_input = fs.readFileSync(`./day_0${date}.txt`)
    .toString()
    .split("\n");

function part1(input) {
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
    return horizontal_position * depth
}

function part2(input) {
    let horizontal_position = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < input.length; i++) {
        const [direction, amount] = input[i].split(" ")
        switch (direction) {
            case "forward":
                horizontal_position += +amount;
                depth += (+amount * aim);
                break;
            case "up":
                aim -= +amount;
                break;
            case "down":
                aim += +amount;
                break;
        }
    }
    return horizontal_position * depth
}

console.assert(part1(test_input) === 150)
console.assert(part2(test_input) === 900)

console.log("part 1: ", part1(actual_input))
console.log("part 2: ", part2(actual_input))

