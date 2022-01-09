const getBookingRatingData = require('./getBookingRatingData')
const saveBooking = require('./saveBooking')
const getBookingsByHouseId = require('./getBookingsByHouseId')
const isHouseAvailable = require('./isHouseAvailable')
const getEmailOwner = require('./getEmailOwner')
const isTenantAndOwner = require('./isTenantAndOwner')
const getPendingReceivedBookings = require('./getPendingReceivedBookings')
const getAcceptedReceivedBookings = require('./getAcceptedReceivedBookings')
const getPendingMadeBookings = require('./getPendingMadeBookings')
const getAcceptedMadeBookings = require('./getAcceptedMadeBookings')
const getBookingById = require('./getBookingById')
const confirmBooking = require('./confirmBooking')
const cancelBooking = require('./cancelBooking')



module.exports = {
    getBookingRatingData,
    saveBooking,
    getBookingsByHouseId,
    isHouseAvailable,
    getEmailOwner,
    isTenantAndOwner,
    getPendingReceivedBookings,
    getAcceptedReceivedBookings,
    getPendingMadeBookings,
    getAcceptedMadeBookings,
    getBookingById,
    confirmBooking,
    cancelBooking
}
