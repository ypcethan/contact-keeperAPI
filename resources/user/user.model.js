const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already been used']
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'contact'
        }
    ]
})


UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

module.exports = mongoose.model('user', UserSchema)