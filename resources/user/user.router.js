const express = require('express')
const router = express.Router()
const { postRegister } = require('./user.controller')

router.post('/', postRegister)
module.exports = router