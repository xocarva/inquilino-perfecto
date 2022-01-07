const connection = require('../mysqlConnection')

const getBookingById = async (bookingId) => {
    const [[bookingData]] = await connection.query(
        "SELECT * FROM bookings WHERE id = ? AND accepted IS NOT true",
        [bookingId]
    )

    return bookingData
}

module.exports = getBookingById