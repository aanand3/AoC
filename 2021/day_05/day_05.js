const date = new Date().getDate();

const fs = require("fs");
const test_input = fs.readFileSync(`./day_0${date}_test.txt`)
    .toString()
    .split("\n");

const actual_input = fs.readFileSync(`./day_0${date}.txt`)
    .toString()
    .split("\n");

function part1(input) {
    const coveredSpots = new Map();

    let lines = input.map(line => line.split(" -> ")
        .map(element => element.split(','))
    )

    for (const line of lines) {
        // first numbers are equal
        if (line[0][0] === line[1][0]) {
            const smallerNum = Math.min(parseInt(line[0][1]), parseInt(line[1][1]))
            const biggerNum = Math.max(parseInt(line[0][1]), parseInt(line[1][1]))

            for (let i = smallerNum; i <= biggerNum; i++) {
                const orderedPair = line[0][0] + "," + i.toString()
                let existingValue = coveredSpots.get(orderedPair)
                if (existingValue) {
                    coveredSpots.set(orderedPair, existingValue + 1)
                } else {
                    coveredSpots.set(orderedPair, 1)
                }
            }
        } else if (line[0][1] === line[1][1]) { // second nums are equal
            const smallerNum = Math.min(parseInt(line[0][0]), parseInt(line[1][0]))
            const biggerNum = Math.max(parseInt(line[0][0]), parseInt(line[1][0]))

            for (let i = smallerNum; i <= biggerNum; i++) {
                const orderedPair = i.toString() + "," + line[0][1]

                let existingValue = coveredSpots.get(orderedPair)
                if (existingValue) {
                    coveredSpots.set(orderedPair, existingValue + 1)
                } else {
                    coveredSpots.set(orderedPair, 1)
                }
            }
        }
    }

    let count = 0
    for (const value of coveredSpots.values()) {
        if (parseInt(value) >= 2) count++
    }

    return count
}

function part2(input) {
    const coveredSpots = new Map();

    let lines = input.map(line => line.split(" -> ")
        .map(element => element.split(','))
    )

    function slope(line) {
        const x1 = line[0][0]
        const y1 = line[0][1]
        const x2 = line[1][0]
        const y2 = line[1][1]

        return (y2 - y1) / (x2 - x1)
    }

    for (const line of lines) {
        // first numbers are equal
        if (line[0][0] === line[1][0]) {
            const smallerNum = Math.min(parseInt(line[0][1]), parseInt(line[1][1]))
            const biggerNum = Math.max(parseInt(line[0][1]), parseInt(line[1][1]))

            for (let i = smallerNum; i <= biggerNum; i++) {
                const orderedPair = line[0][0] + "," + i.toString()
                let existingValue = coveredSpots.get(orderedPair)
                if (existingValue) {
                    coveredSpots.set(orderedPair, existingValue + 1)
                } else {
                    coveredSpots.set(orderedPair, 1)
                }
            }
        } else if (line[0][1] === line[1][1]) { // second nums are equal
            const smallerNum = Math.min(parseInt(line[0][0]), parseInt(line[1][0]))
            const biggerNum = Math.max(parseInt(line[0][0]), parseInt(line[1][0]))

            for (let i = smallerNum; i <= biggerNum; i++) {
                const orderedPair = i.toString() + "," + line[0][1]

                let existingValue = coveredSpots.get(orderedPair)
                if (existingValue) {
                    coveredSpots.set(orderedPair, existingValue + 1)
                } else {
                    coveredSpots.set(orderedPair, 1)
                }
            }
        } else if (Math.abs(slope(line)) === 1) {

            if (slope(line) === 1) {
                // bottom left has smaller x and smaller y
                const smallerX = Math.min(parseInt(line[0][0]), parseInt(line[1][0]))
                const smallerY = Math.min(parseInt(line[0][1]), parseInt(line[1][1]))

                // top right point
                const biggerX = Math.max(parseInt(line[0][0]), parseInt(line[1][0]))
                const biggerY = Math.max(parseInt(line[0][1]), parseInt(line[1][1]))

                // start from bottom left and climb to top right
                let x = smallerX
                let y = smallerY

                while (x <= biggerX) {
                    const orderedPair = x + "," + y

                    let existingValue = coveredSpots.get(orderedPair)
                    if (existingValue) {
                        coveredSpots.set(orderedPair, existingValue + 1)
                    } else {
                        coveredSpots.set(orderedPair, 1)
                    }

                    x++;
                    y++;
                }
            } else if (slope(line) === -1) {
                // bottom point has smaller x and bigger y
                const smallerX = Math.min(parseInt(line[0][0]), parseInt(line[1][0]))
                const biggerY = Math.max(parseInt(line[0][1]), parseInt(line[1][1]))

                const biggerX = Math.max(parseInt(line[0][0]), parseInt(line[1][0]))

                // start from bottom right and climb to top left
                let x = smallerX
                let y = biggerY

                while (x <= biggerX) {
                    const orderedPair = x + "," + y

                    let existingValue = coveredSpots.get(orderedPair)
                    if (existingValue) {
                        coveredSpots.set(orderedPair, existingValue + 1)
                    } else {
                        coveredSpots.set(orderedPair, 1)
                    }

                    x++;
                    y--;
                }
            }
        }
    }

    let count = 0
    for (const value of coveredSpots.values()) {
        if (parseInt(value) >= 2) count++
    }

    return count
}

console.assert(part1(test_input) === 5)
// console.log("part 1: ", part1(actual_input))

// console.log(part2(test_input))
console.assert(part2(test_input) === 12)
console.log("part 2: ", part2(actual_input))

