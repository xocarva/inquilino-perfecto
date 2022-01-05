const connection = require('../mysqlConnection')

const getEmailOwner = async (houseId) => {
  const [userId] = await connection.query(
        "SELECT id_owner FROM houses WHERE id = ?",
        [ houseId ]
  )
  const [[result]] = await connection.query(
    "SELECT email FROM users WHERE id = ?",
    [ userId[0].id_owner ]
  )
  email = result.email
  return email
}

module.exports = getEmailOwner
