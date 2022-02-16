const getRatedUserData = require('./getRatedUserData')
const getRatings = require('./getRatings')
const rateBooking = require('../mysql-ratings-repository/rateBooking')


module.exports = {
    getRatedUserData,
    getRatings,
    rateBooking
}
