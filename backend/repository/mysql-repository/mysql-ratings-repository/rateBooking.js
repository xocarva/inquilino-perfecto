const connection = require('../mysqlConnection')

const rateBooking = async (ratingData) => {
    const { rating, bookingId, ratedUserRole, ratedUserId } = ratingData

    const [{ insertId }] = await connection.query(
        'INSERT INTO ratings (id_booking, id_user_rated, user_rated_role, rating, rating_date) VALUES (?, ?, ?, ?, ?)',
        [bookingId, ratedUserId, ratedUserRole, rating, new Date()]
    )
    return insertId
}

module.exports = rateBooking
