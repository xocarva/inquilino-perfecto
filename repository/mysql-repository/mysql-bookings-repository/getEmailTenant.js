const connection = require('../mysqlConnection')

const getEmailTenant = async (tenantId) => {
  const [email] = await connection.query(
        "SELECT email FROM users WHERE id = ?",
        [ tenantId ]
  )
  return email
}

module.exports = getEmailTenant
