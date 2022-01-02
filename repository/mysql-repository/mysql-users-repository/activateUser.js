const connection = require('../mysqlConnection')

const activateUser = async (user) => {
  const { activation_code } = user
  await connection.query(
    `Update users SET active = true, activation_code = '' WHERE activation_code = ?`,
    [activation_code]
  )
}

module.exports = activateUser
