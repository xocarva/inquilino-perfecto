const userValidator = require('./userSchema')
const ratingValidator = require('./ratingSchema')
const credentialsValidator = require('./credentialsSchema')
const bookingValidator = require('./bookingSchema')

module.exports = {
    userValidator,
    ratingValidator,
    credentialsValidator,
    bookingValidator
}