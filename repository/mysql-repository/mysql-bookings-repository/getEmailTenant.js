const connection = require('../mysqlConnection')

const getEmailTenant = async (tenantId) => {
  const [[result]] = await connection.query(
        "SELECT email FROM users WHERE id = ?",
        [ tenantId ]
  )
  email = result.email
  return email
}

module.exports = getEmailTenant
