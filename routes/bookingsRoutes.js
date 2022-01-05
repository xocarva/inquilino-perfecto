const express = require('express')
const router = express.Router()
const { createBooking, confirmBooking } = require('../controllers/bookings')


router.post('/:houseId', createBooking)
router.put('/confirm/:bookingId', confirmBooking)


module.exports = router
