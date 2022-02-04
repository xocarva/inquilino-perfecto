const connection = require('../mysqlConnection')

const ratingExists = async ( ratingData ) => {

const { bookingId, ratedUserRole } = ratingData

const  [[ existingRatings ]]  = (await connection.query(
        'SELECT id FROM ratings WHERE id_booking = ? AND user_rated_role = ?',
        [bookingId, ratedUserRole]
    ))

const ratingExists = !!existingRatings

return ratingExists

}

module.exports = ratingExists
