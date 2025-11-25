const { error } = require("console");

const { writeFile, readFile } = require("fs").promises;

console.log('writing 1')

writeFile("./temporary/temp.txt", "Promise with .then This is Line 1\n", {
  flag: "a",
})
  .then(() => {
    console.log('writing 2')
    return writeFile(
      "./temporary/temp.txt",
      "Promise with .then This is Line 2\n",
      { flag: "a" }
    );
  })
  .then(() => {
    console.log('writing 3')
    return writeFile(
      "./temporary/temp.txt",
      "Promise with .then This is Line 3\n",
      { flag: "a" }
    );
  })
  .then(() => {
    console.log('start reading')
    return readFile("./temporary/temp.txt", "utf-8");
  })
  .then((result) => {
    console.log(result);
    console.log('reading finish')
  })
  .catch((error) => console.log("An error occurred: ", error));
