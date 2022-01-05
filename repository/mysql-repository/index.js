const usersRepository  = require('./mysql-users-repository')
const bookingsRepository  = require('./mysql-bookings-repository')
const ratingsRepository  = require('./mysql-ratings-repository')
const housesRepository = require('./mysql-houses-repository')

module.exports = {
    usersRepository,
    bookingsRepository,
    ratingsRepository,
    housesRepository
}
