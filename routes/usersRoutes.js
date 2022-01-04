const express = require('express')
const router = express.Router()
const { register, validate, rate, login } = require('../controllers/users')

router.get('/validate/:activationCode', validate)
router.post('/register', register)
router.post('/login', login)
router.post('/rate/:bookingId', rate)

module.exports = router
