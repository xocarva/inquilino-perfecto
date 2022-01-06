const express = require('express')
const router = express.Router()
const { isAuthorized, isActive } = require('../middlewares')
const {
    register,
    validate,
    rate,
    login,
    profile,
    getRatings
} = require('../controllers/users')

router.get('/profile', isAuthorized, profile)
router.get('/validate/:activationCode', validate)
router.post('/register', register)
router.post('/login', login)
router.post('/rate/:bookingId', isAuthorized, isActive, rate)
router.get('/ratings/:role', isAuthorized, getRatings)






module.exports = router
