const connection = require('../mysqlConnection')

const activateUser = async (user) => {
  const { activationCode } = user
  await connection.query(
    `Update users SET active = true, activation_code = ? WHERE activation_code = ?`,
    [user.id, activationCode]
  )
}

module.exports = activateUser
