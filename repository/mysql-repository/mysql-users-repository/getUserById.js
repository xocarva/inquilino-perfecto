const connection = require('../mysqlConnection')

const getUserById = async (userId) => {
    const [[ user ]] = await connection.query(
        'SELECT id, first_name AS firstName, last_name AS lastName, email, picture, bio, password, active FROM users WHERE id = ?',
        [userId]
    )

    return user
  }

  module.exports = getUserById