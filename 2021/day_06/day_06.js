const date = new Date().getDate() ;

const fs = require("fs");
const test_input = fs.readFileSync(`./day_0${date}_test.txt`)
    .toString()
    .split(",")
    .map(num => parseInt(num));

const actual_input = fs.readFileSync(`./day_0${date}.txt`)
    .toString()
    .split(",")
    .map(num => parseInt(num));

function part1(input) {
    let fishes = input
    let numDays = 18
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
        console.log(i, ":", fishes)
    }
    return fishes.length
}

function part1_alternate(input) {
    let numDays = 18
    let total = 0;
    for (let i = 1; i < 6; i++) {
        let countOfThisNumber = input.filter(num => num === i).length
        let familySize = numberOfAllChildren(i, numDays)

        console.log(familySize, countOfThisNumber)
        total += familySize * countOfThisNumber
    }
    return total;
}

function numberOfAllChildren(startVal, daysRemaining) {
    console.log(startVal, daysRemaining)
    if (daysRemaining < startVal) return 0; // base case
    else {
        let my_kids = Math.floor((daysRemaining - startVal)/6) + 1
        console.log('my kids: ', my_kids)
        return 1 + my_kids + numberOfAllChildren(8, daysRemaining - startVal - 1 )
    }
}

function part2(input) {
    // let fishes = input.sort(function (a, b) {  return a - b;  });

    let sum = 0;

    for (let i = 1; i < 2; i++) {
        let loneFishArray = [i]
        let countOfThisNumber = input.filter(num => num === i).length

        for (let i = 0; i < 256; i++) {
            let tempArray = []
            for (const fish of loneFishArray) {
                switch (fish) {
                    case 0:
                        tempArray.push(6)
                        tempArray.push(8)
                        break;
                    default:
                        tempArray.push(fish - 1)
                }
            }
            loneFishArray = tempArray
        }

        sum += (loneFishArray.length * countOfThisNumber)
    }

    return sum
}

// console.log(part1(test_input))
// console.assert(part1(test_input) === 5934)
// console.log("part 1: ", part1(actual_input))

// console.log(part2(test_input))
// console.assert(part2(test_input) === 26984457539)
// console.log("part 2: ", part2(actual_input))

// console.log(numDirectChildren(3, 13))

let testVal = 1
console.log(part1([testVal]))
// console.log(part1_alternate(test_input))
console.log('--------')
console.log(numberOfAllChildren(testVal, 18))