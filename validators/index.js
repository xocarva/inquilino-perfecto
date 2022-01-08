const userValidator = require('./userSchema')
const ratingValidator = require('./ratingSchema')
const credentialsValidator = require('./credentialsSchema')
const bookingValidator = require('./bookingSchema')
const houseSchema = require('./houseSchema')
const editProfileSchema = require('./editProfileSchema')

module.exports = {
    userValidator,
    ratingValidator,
    credentialsValidator,
    bookingValidator,
    houseSchema,
    editProfileSchema
}