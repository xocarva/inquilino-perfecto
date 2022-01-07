const sendActivationCode = require('./sendActivationCode')
const sendBookingOfferPendingTenant = require('./sendBookingOfferPendingTenant')
const sendBookingOfferPendingOwner = require('./sendBookingOfferPendingOwner')
const sendConfirmBookingOwner = require('./sendConfirmBookingOwner')
const sendConfirmBookingTenant = require('./sendConfirmBookingTenant')


module.exports = {
    sendActivationCode,
    sendBookingOfferPendingTenant,
    sendBookingOfferPendingOwner,
    sendConfirmBookingTenant,
    sendConfirmBookingOwner
}
