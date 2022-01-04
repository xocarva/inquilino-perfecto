const saveUser = require('./saveUser')
const userExists = require('./userExists')
const getUsersByActivationCode = require('./getUsersByActivationCode')
const activateUser = require('./activateUser')
const rateBooking = require('./rateBooking')
const getUserByEmail = require('./getUserByEmail')


module.exports = {
    saveUser,
    userExists,
    getUsersByActivationCode,
    activateUser,
    rateBooking,
    getUserByEmail
}
