const express = require('express')
const router = express.Router()
const { isAuthorized, isActive } = require('../middlewares')
const {
    createBooking,
    getAcceptedReceivedBookings,
    getPendingReceivedBookings,
    getPendingMadeBookings,
    getAcceptedMadeBookings,
    confirmBooking
} = require('../controllers/bookings')

router.post('/:houseId', isAuthorized, isActive, createBooking)
router.get('/received/pending', isAuthorized, getPendingReceivedBookings)
router.get('/received/accepted', isAuthorized, getAcceptedReceivedBookings)
router.get('/made/pending', isAuthorized, getPendingMadeBookings)
router.get('/made/accepted', isAuthorized, getAcceptedMadeBookings)
router.put('/confirm/:bookingId', isAuthorized, isActive, confirmBooking)


module.exports = router
