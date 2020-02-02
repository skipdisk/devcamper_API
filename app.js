const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')

const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')
const connectDB = require('./config/db')

//Route files
const bootcamps = require('./routes/bootcamps')

//load env variables
dotenv.config({
    path: './config/config.env'
})

//Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json());

//uses logging middleware for development mode
if (process.env.NODE_ENV === 'development') {
    //app.use(logger);
    app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

//error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

//handle unhandle promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    server.close(() => process.exit(1))
})