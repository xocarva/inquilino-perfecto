const connection = require('../mysqlConnection')

const getUserByEmail = async (userEmail) => {
    const [[ result ]] = await connection.query(
        'SELECT id, first_name AS firstName, last_name AS lastName, email, picture, bio, password FROM users WHERE email = ?',
        [userEmail]
    )
    return result
  }

  module.exports = getUserByEmail