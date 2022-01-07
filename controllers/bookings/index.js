const createBooking = require('./createBooking')
const getPendingReceivedBookings = require('./getPendingReceivedBookings')
const getAcceptedReceivedBookings = require('./getAcceptedReceivedBookings')
const getPendingMadeBookings = require('./getPendingMadeBookings')
const getAcceptedMadeBookings = require('./getAcceptedMadeBookings')


module.exports = {
    createBooking,
    getPendingReceivedBookings,
    getAcceptedReceivedBookings,
    getPendingMadeBookings,
    getAcceptedMadeBookings
}
