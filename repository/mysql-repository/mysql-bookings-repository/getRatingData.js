const connection = require('../mysqlConnection')

const getRatingData = async ( bookingId ) => {

const [[ ratingData ]]  = await connection.query (
    'SELECT users.id AS ownerId, houses.id AS houseID, bookings.end_date AS bookingEndDate, bookings.id_tenant AS tenantId, bookings.accepted FROM bookings INNER JOIN houses ON houses.id = bookings.id_house INNER JOIN users ON houses.id_owner = users.id WHERE bookings.id = ?',
    [ bookingId ]
)

if(!!!ratingData) throw new Error ('Booking data could not be retrieved')

return ratingData

}

module.exports = getRatingData