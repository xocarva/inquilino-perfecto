const express = require('express')
const router = express.Router()
const isAuthorized = require('../middlewares/isAuthorized')
const { createBooking, confirmBooking } = require('../controllers/bookings')


router.post('/:houseId', isAuthorized, createBooking)
router.put('/confirm/:bookingId', isAuthorized, confirmBooking)


module.exports = router
