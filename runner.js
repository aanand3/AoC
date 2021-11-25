// Helper script for IntelliJ to run scripts with file path instead of
// relying on stdin
// Usage: node runner.js <path-to-script> <path-to-input>

const fs = require('fs')
const spawn = require('child_process').spawn

const args = process.argv;
const script = args[args.length - 2]
const inputFile = args[args.length - 1]

const p = spawn('node', [script]);

p.stdin.write(fs.readFileSync(inputFile));

p.stdout.on('data', (data) => {
    console.log(data.toString())
});

p.stdin.end();
