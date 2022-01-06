const register = require('./register')
const validate = require('./validate')
const rate = require('./rate')
const login = require('./login')
const profile = require('./profile')
const getPendingReceivedBookings = require('./getPendingReceivedBookings')
const getRatings = require('./getRatings')


module.exports = {
    register,
    validate,
    rate,
    login,
    profile,
    getPendingReceivedBookings,
    getRatings
}