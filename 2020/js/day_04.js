Array.prototype.count = function (predicate) {
    return this.filter(predicate).length
}

RegExp.prototype.matchAllAsObject = function (str) {
    const matches = [...str.matchAll(this)]
    return matches.reduce((acc, match) => ({ ...acc, [match[1]]: match[2] }), {})
}

String.prototype.extractNumbers = function () {
    return Number(this.replaceAll(/[^0-9]/g, ''))
}

const inRange = function (numberish, beginInclusive, endInclusive) {
    return beginInclusive <= Number(numberish) && Number(numberish) <= endInclusive
}

const input = require('fs')
    .readFileSync(process.stdin.fd)
    .toString()
    .split('\n\n');


const extractRegExp = /([a-z]{3}):(\S+)/g
const passportData = input.map(record => extractRegExp.matchAllAsObject(record))

const part1Result = passportData.count(({ ecl, pid, eyr, hcl, byr, iyr, hgt }) => ecl && pid && eyr && hcl && byr && iyr && hgt)

const part2Result = passportData.count(({ ecl, pid, eyr, hcl, byr, iyr, hgt }) => {
    const byrValid = inRange(byr, 1920, 2002)
    const iyrValid = inRange(iyr, 2010, 2020)
    const eyrValid = inRange(eyr, 2020, 2030)

    const hgtValid = hgt && ((hgt.includes('cm') && inRange(hgt.extractNumbers(), 150, 193)) || (hgt.includes('in') && inRange(hgt.extractNumbers(), 59, 76)))

    const eclValid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)

    const hclValid = /^#[0-9a-f]{6}$/.test(hcl)

    const pidValid = /^[0-9]{9}$/.test(pid)

    return byrValid && iyrValid && eyrValid && hgtValid && eclValid && hclValid && pidValid
})

console.log(part1Result)
console.log(part2Result)
