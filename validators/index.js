const userValidator = require('./userSchema')
const ratingValidator = require('./ratingSchema')
const credentialsValidator = require('./credentialsSchema')
const bookingValidator = require('./bookingSchema')
const houseSchema = require('./houseSchema')
const queryValidator = require('./querySchema')
const updateUserValidator = require('./updateUserSchema')



module.exports = {
    userValidator,
    ratingValidator,
    credentialsValidator,
    bookingValidator,
    houseSchema,
    queryValidator,
    updateUserValidator
}