const express = require('express')
const router = express.Router()
const { register, validate } = require('../controllers/users')

router.post('/register', register)
router.get('/validate/:activationCode', validate)

module.exports = router
