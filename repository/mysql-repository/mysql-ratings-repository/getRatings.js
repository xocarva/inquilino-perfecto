const connection = require('../mysqlConnection')

const getRatings = async ( user ) => {
    const { id, role } = user
    const [ ratings ] = await connection.query(
        'SELECT rating, rating_date as ratingDate FROM ratings WHERE id_user_rated = ? AND user_rated_role = ?',
        [id, role]
    )

return ratings
}

module.exports = getRatings