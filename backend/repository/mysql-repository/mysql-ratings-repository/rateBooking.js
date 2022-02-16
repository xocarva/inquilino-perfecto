const connection = require('../mysqlConnection')

const rateBooking = async (ratingData) => {
    const { rating, bookingId, ratedUserRole, ratedUserId, houseId } = ratingData
    const ratingType = ratedUserRole === 'owner' ? 'tenant_rating' : 'owner_rating'

    const [{ insertId }] = await connection.query(
        'INSERT INTO ratings (id_booking, id_user_rated, user_rated_role, rating, rating_date) VALUES (?, ?, ?, ?, ?)',
        [bookingId, ratedUserId, ratedUserRole, rating, new Date()]
    )

    await connection.query(
        `UPDATE bookings SET ${ratingType} = ? where id = ?`,
        [rating, bookingId]
    )

    return insertId
}

module.exports = rateBooking
