const express = require('express')
const router = express.Router()
const isAuthorized = require('../middlewares/isAuthorized')
const { register, validate, rate, login } = require('../controllers/users')

router.get('/validate/:activationCode', validate)
router.post('/register', register)
router.post('/login', login)
router.post('/rate/:bookingId', isAuthorized, rate)

module.exports = router
