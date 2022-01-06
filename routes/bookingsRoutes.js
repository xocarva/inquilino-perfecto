const express = require('express')
const router = express.Router()
const { isAuthorized, isActive } = require('../middlewares')
const {
    createBooking,
    getAcceptedReceivedBookings,
    getPendingReceivedBookings
} = require('../controllers/bookings')


router.post('/:houseId', isAuthorized, isActive, createBooking)
router.get('/received/pending', isAuthorized, getPendingReceivedBookings)
router.get('/received/accepted', isAuthorized, getAcceptedReceivedBookings)


module.exports = router
