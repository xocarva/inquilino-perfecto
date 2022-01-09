const saveUser = require('./saveUser')
const getUsersByActivationCode = require('./getUsersByActivationCode')
const activateUser = require('./activateUser')
const rateBooking = require('./rateBooking')
const updateUser = require('./updateUser')
const getUserById = require('./getUserById')
const getUserByEmail = require('./getUserByEmail')



module.exports = {
    saveUser,
    getUsersByActivationCode,
    getUserById,
    activateUser,
    rateBooking,
    getUserById,
    updateUser,
    getUserByEmail
}
