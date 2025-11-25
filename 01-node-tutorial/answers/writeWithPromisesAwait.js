const { writeFile, readFile } = require("fs").promises;

async function write() {
  try {
    await writeFile("./temporary/temp.txt", "This is Line 1\n", { flag: "a" });
    await writeFile("./temporary/temp.txt", "This is Line 2\n", { flag: "a" });
    await writeFile("./temporary/temp.txt", "This is Line 3\n", { flag: "a" });
    console.log("finish writing");
  } catch (err) {
    console.log(err);
  }
}

// write()

async function reader() {
  console.log("start reading");
  try {
    const first = await readFile("./temporary/temp.txt", "utf-8");
    console.log(first);
  } catch (err) {
    console.log(err);
  }
}

// reader()

async function readWrite() {
  try {
    await write();
    await reader();
    console.log("finish reading");
  } catch (err) {
    console.log(err);
  }
}

readWrite();
