const createBooking = require('./createBooking')
const getPendingReceivedBookings = require('./getPendingReceivedBookings')
const getAcceptedReceivedBookings = require('./getAcceptedReceivedBookings')
const getPendingMadeBookings = require('./getPendingMadeBookings')
const getAcceptedMadeBookings = require('./getAcceptedMadeBookings')
const confirmBooking = require('./confirmBooking')
const cancelBooking = require('./cancelBooking')
const getPendingBookingsAmount = require('./getPendingBookingsAmount')

module.exports = {
    createBooking,
    getPendingReceivedBookings,
    getAcceptedReceivedBookings,
    getPendingMadeBookings,
    getAcceptedMadeBookings,
    confirmBooking,
    cancelBooking,
    getPendingBookingsAmount
}
