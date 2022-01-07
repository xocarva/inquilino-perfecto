const connection = require('../mysqlConnection')

const getEmailOwner = async (houseId) => {
  const [userId] = await connection.query(
        "SELECT id_owner AS ownerId FROM houses WHERE id = ?",
        [ houseId ]
  )
  const [[result]] = await connection.query(
    "SELECT email FROM users WHERE id = ?",
    [ userId[0].ownerId ]
  )
  email = result.email
  return email
}

module.exports = getEmailOwner
