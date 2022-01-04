const connection = require('../mysqlConnection')

const getUserByEmail = async (userEmail) => {
    const [[ result ]] = await connection.query("SELECT * FROM users WHERE email = ?", [userEmail])
    return result
  }

  module.exports = getUserByEmail
 