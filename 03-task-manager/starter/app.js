require('dotenv').config()
const express = require("express");
const app = express();

const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')


// middleware
app.use(express.json())

// route
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use('/api/v1/tasks', tasks)

const port = 3500;

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on Port ${port}`))
    }catch(error){
        console.log(error)
    }
}

start()
