const connection = require('../mysqlConnection')


const rateBooking = async (ratingData) => {
    const { ownerId, tenantId, rating, bookingId, ratingUserId } = ratingData

    let ratedUserRole
    if (ratingUserId = ownerId) {
        ratedUserRole = 'tenant'
        ratedUserId = tenantId
    } else {
        ratedUserRole = 'owner'
        ratedUserId = ownerId
    }



    if(ratingExists) throw new Error('Booking already rated by this user')

    await connection.query(
        'INSERT INTO ratings (id_booking, id_user_rated, user_rated_role, rating, rating_date) VALUES (?, ?, ?, ?, ?)',
        [bookingId, ratedUserId, ratedUserRole, rating, new Date()]
    )

}

module.exports = rateBooking