const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 600,
});

let counter = 0;

stream.on("data", (result) => {
  counter++;
  console.log(`counter #: ${counter}`);
  console.log(result);
});
stream.on("end", () => {
  console.log(`counter # received: ${counter}`);
});
stream.on("error", (err) => console.log(err));
