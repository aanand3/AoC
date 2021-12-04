const date = new Date().getDate() + 1;

const fs = require("fs");
const test_input = fs.readFileSync(`./day_0${date}_test.txt`)
    .toString()
    .split("\n");

const actual_input = fs.readFileSync(`./day_0${date}.txt`)
    .toString()
    .split("\n");

function part1(input) {
    let bitArray = []
    let gamma = "";
    let epsilon = "";

    for (let i = 0; i < input[0].length; i++) {
        input.forEach(line => {
            bitArray.push(line[i])
        })

        let one_count = bitArray.filter(num => num === '1').length
        let zero_count = bitArray.filter(num => num === '0').length

        if (one_count > zero_count) {
            gamma = gamma.concat('1')
            epsilon = epsilon.concat('0')
        }
        else {
            gamma = gamma.concat('0')
            epsilon = epsilon.concat('1')
        }

        bitArray = []
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function part2(input) {
    let bitArray = []
    let oxygenRemainingValues = input
    let carbonRemainingValues = input
    let gamma = "";
    let epsilon = "";

    for (let i = 0; i < input[0].length; i++) {
        let ones_array = oxygenRemainingValues.filter(num => num[i] === '1')
        let zeroes_array = oxygenRemainingValues.filter(num => num[i] === '0')

        if (zeroes_array.length > ones_array.length) {
            oxygenRemainingValues = zeroes_array
        } else {
            oxygenRemainingValues = ones_array
        }

        if (oxygenRemainingValues.length === 1) break;
    }

    for (let i = 0; i < input[0].length; i++) {
        let ones_array = carbonRemainingValues.filter(num => num[i] === '1')
        let zeroes_array = carbonRemainingValues.filter(num => num[i] === '0')

        if (ones_array.length < zeroes_array.length) {
            carbonRemainingValues = ones_array
        } else {
            carbonRemainingValues = zeroes_array
        }
        if (carbonRemainingValues.length === 1) break;
    }

    console.log(oxygenRemainingValues[0])
    console.log(carbonRemainingValues[0])
    return parseInt(oxygenRemainingValues[0], 2) * parseInt(carbonRemainingValues[0], 2);
}

console.assert(part1(test_input) === 198)
console.assert(part2(test_input) === 230)

console.log("part 1: ", part1(actual_input))
console.log("part 2: ", part2(actual_input))

