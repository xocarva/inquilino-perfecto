const getBookingRatingData = require('./getBookingRatingData')
const saveBooking = require('./saveBooking')
const getBookingsByHouseId = require('./getBookingsByHouseId')
const isHouseAvailable = require('./isHouseAvailable')
const getEmailTenant = require('./getEmailTenant')
const getEmailOwner = require('./getEmailOwner')
const checkTenantIdAndOwnerId = require('./checkTenantIdAndOwnerId')
const getBookingById = require('./getBookingById')
const changeStatusConfirmBooking = require('./changeStatusConfirmBooking')

module.exports = {
    getBookingRatingData,
    saveBooking,
    getBookingsByHouseId,
    isHouseAvailable,
    getEmailTenant,
    getEmailOwner,
    checkTenantIdAndOwnerId,
    getBookingById,
    changeStatusConfirmBooking
}
