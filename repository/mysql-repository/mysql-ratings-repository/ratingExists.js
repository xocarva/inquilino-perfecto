const connection = require('../mysqlConnection')

const ratingExists = async ( ratingData ) => {

const [[ ratingExists ]] = !!(await connection.query(
        'SELECT ratings.id WHERE ratings.id_booking = ? AND user_rated_role = ?',
        [bookingId, ratedUserRole]
    ))

return rating

}

module.exports = ratingExists
