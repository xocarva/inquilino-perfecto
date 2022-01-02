const connection = require('../mysqlConnection')

//TO-DO
// avatar attachment on register/saveUser

const saveUser = async (user) => {
  const { firstName, lastName, email, bio, picture, password, activationCode } = user
  const [{ insertId }] = await connection.query(
      'INSERT INTO users (first_name, last_name, email, bio, picture, password, activation_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, bio, picture, password, activationCode]
  )

  return insertId
}

module.exports = saveUser