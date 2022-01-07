const sendActivationCode = require('./sendActivationCode')
const sendBookingOfferPenddingTenant = require('./sendBookingOfferPenddingTenant')
const sendBookingOfferPenddingOwner = require('./sendBookingOfferPenddingOwner')
const sendConfirmBookingOwner = require('./sendConfirmBookingOwner')
const sendConfirmBookingTenant = require('./sendConfirmBookingTenant')


module.exports = {
    sendActivationCode,
    sendBookingOfferPenddingTenant,
    sendBookingOfferPenddingOwner,
    sendConfirmBookingTenant,
    sendConfirmBookingOwner
}
