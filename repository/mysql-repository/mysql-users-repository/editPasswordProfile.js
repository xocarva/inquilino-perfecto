const connection = require('../mysqlConnection')

const editPasswordProfile = async (userIdData) => {
    await connection.query('UPDATE users SET password = ? WHERE id = ?',
    [userIdData.encryptedPassword, userIdData.userId]
    )
    return
}

module.exports = editPasswordProfile