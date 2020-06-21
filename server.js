const express = require('express')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const userRouter = require('./resources/user/user.router')
const connect = require('./utils/db')



connect()
app = express()
// Logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// Allow to access req.body
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
    res.send('Hello')
})


app.use("/api/users", userRouter)

app.use("*", (req, res, next) => {
    // Next always accept error as the first argument
    next(new AppError(`Cannot find ${req.originalUrl} on this server`), 404)
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

module.exports = app