const userValidator = require('./userSchema')
const ratingValidator = require('./ratingSchema')
const credentialsValidator = require('./credentialsSchema')
const bookingValidator = require('./bookingSchema')
const houseSchema = require('./houseSchema')
const queryValidator = require('./querySchema')


module.exports = {
    userValidator,
    ratingValidator,
    credentialsValidator,
    bookingValidator,
    houseSchema,
    queryValidator
}