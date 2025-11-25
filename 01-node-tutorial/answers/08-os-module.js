const os = require('os')

const freeMemory = os.freemem()
const homeDir = os.homedir()
console.log(freeMemory)
console.log(homeDir)

console.log(os.hostname())