const { writeFileSync, readFileSync } = require("fs");

writeFileSync("./temporary/fileA.txt", "this is from File A line 1", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "this is from File A line 2 ", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "this is from File A line 3", { flag: "a" });

const result = readFileSync("./temporary/fileA.txt", 'utf8')

console.log(result)