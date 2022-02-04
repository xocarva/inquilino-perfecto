const sendActivationCode = require('./sendActivationCode')
const sendMadeBookingInfo = require('./sendMadeBookingInfo')
const sendReceivedBookingInfo = require('./sendReceivedBookingInfo')
const sendBookingConfirmation = require('./sendBookingConfirmation')
const sendTenantBookingCancelInfo = require('./sendTenantBookingCancelInfo')
const sendOwnerBookingCancelInfo = require('./sendOwnerBookingCancelInfo')


module.exports = {
    sendActivationCode,
    sendMadeBookingInfo,
    sendReceivedBookingInfo,
    sendBookingConfirmation,
    sendTenantBookingCancelInfo,
    sendOwnerBookingCancelInfo
}
