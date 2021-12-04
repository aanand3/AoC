const date = new Date().getDate();

const fs = require("fs");
const test_input = fs.readFileSync(`./day_0${date}_test.txt`)
    .toString()
    .split("\n\n");

const actual_input = fs.readFileSync(`./day_0${date}.txt`)
    .toString()
    .split("\n\n");

function part1(input) {
    let numbers = input.shift().split(",")
    let boardsAsStrings = input.map(board => board.split("\n"));
    let boards = []

    for (const board of boardsAsStrings) {
        newBoard = []
        for (const row of board) {
            newBoard.push(row.split(/[ ,]+/).filter(Boolean).map(num => parseInt(num)))
        }
        boards.push(newBoard)
    }

    function markAllBoards(currentNum) {
        for (let i = 0; i < boards.length; i++) {
            for (let j = 0; j < boards[i].length; j++) {
                for (let k = 0; k < boards[i][j].length; k++) {
                    if (boards[i][j][k] === currentNum) {
                        boards[i][j][k] = 0;
                    }
                }
            }
        }
    }


    function findWinningBoard() {
        for (let i = 0; i < boards.length; i++) {
            // check all the rows
            for (const row of boards[i]) {
                if ((row.reduce((a, b) => a + b) / row.length) === 0) return i;
            }

            // check the columns
            for (let j = 0; j < boards[i][0].length; j++) {
                if (boards[i][0][j] + boards[i][1][j] + boards[i][2][j] + boards[i][3][j] + boards[i][4][j] === 0) return i;
            }
        }
        return undefined;
    }

    function generateScore(boardNumber) {
        return arrSum(boards[boardNumber])
    }

    const arrSum = array =>
        array.reduce(
            (sum, num) => sum + (Array.isArray(num) ? arrSum(num) : num * 1),
            0
        );

    for (let i = 0; i < numbers.length; i++) {
        let currentNum = parseInt(numbers[i]);
        markAllBoards(currentNum)
        let boardNumber = findWinningBoard()
        // console.log(currentNum, " was drawn, boards are\n", boards)
        if (boardNumber) return generateScore(boardNumber) * currentNum
    }

    return -1;
}

function part2(input) {
    let numbers = input.shift().split(",")
    let boardsAsStrings = input.map(board => board.split("\n"));
    let boards = []

    for (const board of boardsAsStrings) {
        newBoard = []
        for (const row of board) {
            newBoard.push(row.split(/[ ,]+/).filter(Boolean).map(num => parseInt(num)))
        }
        boards.push(newBoard)
    }

    function markAllBoards(currentNum) {
        for (let i = 0; i < boards.length; i++) {
            for (let j = 0; j < boards[i].length; j++) {
                for (let k = 0; k < boards[i][j].length; k++) {
                    if (boards[i][j][k] === currentNum) {
                        boards[i][j][k] = 0;
                    }
                }
            }
        }
    }


    function findWinningBoards() {
        winners = []
        for (let i = 0; i < boards.length; i++) {
            // check all the rows
            for (const row of boards[i]) {
                if ((row.reduce((a, b) => a + b) / row.length) === 0) winners.push(i);
            }

            // check the columns
            for (let j = 0; j < boards[i][0].length; j++) {
                if (boards[i][0][j] + boards[i][1][j] + boards[i][2][j] + boards[i][3][j] + boards[i][4][j] === 0) winners.push(i);
            }
        }
        return winners.length > 0 ? winners.sort(function(a,b){ return a-b; }) : undefined;
    }

    function generateScore(boardNumber) {
        return arrSum(boards[boardNumber])
    }

    const arrSum = array =>
        array.reduce(
            (sum, num) => sum + (Array.isArray(num) ? arrSum(num) : num * 1),
            0
        );

    for (let i = 0; i < numbers.length; i++) {
        let currentNum = parseInt(numbers[i]);
        markAllBoards(currentNum)
        // if (i > 36) console.log('current num is ', currentNum)
        let boardNumbers = findWinningBoards()
        if (boardNumbers !== undefined && boardNumbers.length > 0 ) {
            if (boards.length > 1) {
                while(boardNumbers.length) {
                    boards.splice(boardNumbers.pop(), 1);
                }
                continue;
            } else if (boards.length === 1 && boardNumbers[0] === 0) {
                // console.log(currentNum, boards)
                // console.log(generateScore(0))
                return generateScore(0) * currentNum
            }
        }

        // if (currentNum === 64) console.log(boards)
        // will fire when the last board wins
        // if (boardNumber === 0 && boards.length === 1) return generateScore(0) * currentNum
    }

    return -1;
}

// console.assert(part1(test_input) === 4512)
// console.log("part 1: ", part1(actual_input))
//
console.assert(part2(test_input) === 1924)
console.log("part 2: ", part2(actual_input))

