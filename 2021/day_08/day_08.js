const date = new Date().getDate() + 1;

const fs = require("fs");
const test_input = fs.readFileSync(`./day_0${date}_test.txt`)
    .toString()
    .split("\n");

const actual_input = fs.readFileSync(`./day_0${date}.txt`)
    .toString()
    .split("\n");

function part1(input) {
    let outputs = input.map(string => string.split("|")[1].trim())

    let count = 0

    outputs.forEach(item => {
        item.split(" ").forEach(word => {
            if (word.length === 2 || word.length === 3 || word.length === 4 || word.length === 7) {
                count++;
            }
        })
    })
    return count;
}

function part2(input) {
    let min = Infinity;

    function calculateTotalFuel(i) {
        let total = 0;
        const unique = input.filter((value, index, self) => self.indexOf(value) === index); // get rid of duplicates

        for (const uniqueElement of unique) {
            let countOfThisNumber = input.filter(num => num === uniqueElement).length

            let distance = Math.abs(uniqueElement - i)

            let fuelCost = ( distance * (distance + 1))/2

            total += (fuelCost * countOfThisNumber)
        }
        return total;
    }

    for (let i = Math.min(...input); i < Math.max(...input); i++) {
        let totalFuel = calculateTotalFuel(i)
        // console.log('total fuel for ', i, 'is ', totalFuel)
        if (totalFuel < min) min = totalFuel
    }

    return min
}

console.log("part 1 test: ", part1(test_input))
console.log("part 1: ", part1(actual_input))

// console.log(part2(test_input))
// console.assert(part2(test_input, 256) === 26984457539)
// console.log("part 2: ", part2(actual_input))