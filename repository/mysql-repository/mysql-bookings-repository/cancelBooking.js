const connection = require('../mysqlConnection')

const cancelBooking = async (bookingId) => {
    const result = await connection.query("UPDATE bookings SET accepted = false WHERE id = ?",
        [bookingId]
    )
    return result
}

module.exports = cancelBooking