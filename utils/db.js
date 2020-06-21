const mongoose = require('mongoose')

console.log(process.env.MONGO_URI)
const db = process.env.MONGO_URI

const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('DB connected')
    }).catch(e => {
        console.error(e.message)
        process.exit(1)
    })
}

module.exports = connectDB