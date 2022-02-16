const connection = require('../mysqlConnection')

const getBookingById = async (bookingId) => {
    const [[bookingData]] = await connection.query(
        "SELECT id, start_date AS startDate, end_date AS endDate, id_house AS houseId, id_tenant AS tenantId, accepted, bookings.tenant_rating AS tenantRating, bookings.owner_rating AS ownerRating FROM bookings WHERE id = ? AND accepted IS NOT false",
        [bookingId]
    )


    return bookingData
}

module.exports = getBookingById