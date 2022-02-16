const connection = require('../mysqlConnection')

const getBookingRatingData = async ( bookingId ) => {
    const  [[ bookingRatingData ]]   = await connection.query (
        'SELECT users.id AS ownerId, houses.id AS houseId, bookings.tenant_rating AS tenantRating, bookings.owner_rating AS ownerRating, bookings.end_date AS bookingEndDate, bookings.id_tenant AS tenantId, bookings.accepted FROM bookings INNER JOIN houses ON houses.id = bookings.id_house INNER JOIN users ON houses.id_owner = users.id WHERE bookings.id = ?',
        [ bookingId ]
    )
    return bookingRatingData
}

module.exports = getBookingRatingData
