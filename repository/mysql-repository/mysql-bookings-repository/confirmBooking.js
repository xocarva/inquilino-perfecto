const connection = require('../mysqlConnection')

const confirmBooking = async (bookingId) => {
    const result = await connection.query("UPDATE bookings SET accepted = true WHERE id = ?",
        [bookingId]
    )
    return result
}

module.exports = confirmBooking

