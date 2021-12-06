const date = new Date().getDate();

const fs = require("fs");
const test_input = fs.readFileSync(`./day_0${date}_test.txt`)
    .toString()
    .split(",")
    .map(num => parseInt(num));

const actual_input = fs.readFileSync(`./day_0${date}.txt`)
    .toString()
    .split(",")
    .map(num => parseInt(num));

function part1(input, numDays) {
    let fishes = input
    for (let i = 0; i < numDays; i++) {
        let tempArray = []
        for (const fish of fishes) {
            switch (fish) {
                case 0:
                    tempArray.push(6)
                    tempArray.push(8)
                    break;
                default:
                    tempArray.push(fish - 1)
            }
        }
        fishes = tempArray
    }
    return fishes.length
}

function part1_alternate(input, numDays) {
    let total = 0;
    for (let i = 1; i < 6; i++) {
        let countOfThisNumber = input.filter(num => num === i).length
        let familySize = 1 + numberOfAllChildren(i, numDays)

        // console.log('family size, count: ', familySize, countOfThisNumber)
        total += familySize * countOfThisNumber
    }
    return total;
}

function numberOfAllChildren(startVal, daysRemaining) {
    console.log(startVal, daysRemaining)
    if (daysRemaining <= startVal) return 1; // base case
    else {
        let my_kids = Math.floor((daysRemaining - 1 - startVal) / 7) + 1
        console.log('my kids: ', my_kids)
        return 1 + my_kids + numberOfAllChildren(8, daysRemaining - 1 - startVal)
    }
}

function part2(input, numDays) {
    // let fishes = input.sort(function (a, b) {  return a - b;  });
    let counts = new Array(9).fill(0);
    for (let i = 1; i < 6; i++) {
        let countOfThisNumber = input.filter(num => num === i).length
        counts[i] = countOfThisNumber
    }

    console.log(counts)
    for (let i = 0; i < numDays; i++) {
        let numZeros = counts.shift()
        counts[6] += numZeros // add to the 6's
        counts.push(numZeros)
    }

    return counts.reduce((a, b) =>a+b);
}

// console.log(part1(test_input))
// console.assert(part1(test_input) === 5934)
// console.log("part 1: ", part1(actual_input))

// console.log(part2(test_input))
console.assert(part2(test_input, 256) === 26984457539)
console.log("part 2: ", part2(actual_input, 256))