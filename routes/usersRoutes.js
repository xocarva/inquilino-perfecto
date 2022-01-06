const express = require('express')
const router = express.Router()
const isAuthorized = require('../middlewares/isAuthorized')
const {
    register,
    validate,
    rate,
    login,
    profile,
    getPendingReceivedBookings,
    getRatings
} = require('../controllers/users')

router.get('/profile', isAuthorized, profile)
router.get('/validate/:activationCode', validate)
router.post('/register', register)
router.post('/login', login)
router.post('/rate/:bookingId', isAuthorized, rate)
router.get('/ratings/:role', isAuthorized, getRatings)
router.get('/pending-received-bookings', isAuthorized, getPendingReceivedBookings)




module.exports = router
