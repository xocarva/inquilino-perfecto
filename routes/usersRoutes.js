const express = require('express')
const router = express.Router()
const { register, validate, rate } = require('../controllers/users')

router.get('/validate/:activationCode', validate)
router.post('/register', register)
router.post('/rate/:bookingId', rate)

module.exports = router
