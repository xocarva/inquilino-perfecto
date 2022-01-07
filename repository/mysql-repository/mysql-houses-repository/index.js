const saveHouse = require('./saveHouse')
const getHousesByOwnerId = require('./getHousesByOwnerId')
<<<<<<< HEAD

module.exports = {
    saveHouse,
    getHousesByOwnerId
=======
const getHouseById = require('./getHouseById')
const getHousesByQuery = require('./getHousesByQuery')

module.exports = {
    saveHouse,
    getHousesByOwnerId,
    getHouseById,
    getHousesByQuery
>>>>>>> get-houses-search working without date filter
}
