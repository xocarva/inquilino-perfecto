const connection = require('../mysqlConnection')

const editLastNameProfile = async (userIdData) => {
    await connection.query('UPDATE users SET last_name = ? WHERE id = ?',
    [userIdData.lastName, userIdData.userId]
    )
    return
}

module.exports = editLastNameProfile