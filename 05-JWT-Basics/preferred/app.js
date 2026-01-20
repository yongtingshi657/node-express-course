require("dotenv").config();

const express = require("express");
const router = require("./routes/main");

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", router);

const port = process.env.PORT || 3500;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
};

start();
