require('dotenv').config()
require('express-async-errors')

const express = require('express')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const app = express()

// middleware
app.use(express.json())

// routes
app.get('/', (req, res)=> {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Product Route</a>')
})

app.use('/api/v1/products', productRouter)
// products route


// error
app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3500
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`server is Listening in Port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()