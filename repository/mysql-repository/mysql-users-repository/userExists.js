const connection = require('../mysqlConnection')

const userExists = async (user) => {
  const { email } = user
  const [users] = await connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  )

  return users.length > 0
}

module.exports = userExists