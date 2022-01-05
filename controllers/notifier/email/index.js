const sendActivationCode = require('./sendActivationCode')
const sendBookingOfferPenddingTenant = require('./sendBookingOfferPenddingTenant')
const sendBookingOfferPenddingOwner = require('./sendBookingOfferPenddingOwner')
const sendConfirmBookingTenant = require('./sendConfirmBookingTenant')
const sendConfirmBookingOwner = require('./sendConfirmBookingOwner')

module.exports = {
    sendActivationCode,
    sendBookingOfferPenddingTenant,
    sendBookingOfferPenddingOwner,
    sendConfirmBookingTenant,
    sendConfirmBookingOwner
}
