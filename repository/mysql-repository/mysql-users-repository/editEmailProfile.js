const connection = require('../mysqlConnection')

const editEmailProfile = async (userIdData) => {
    await connection.query("UPDATE users SET email = ? WHERE id = ?",
    [userIdData.email, userIdData.userId]
    )
    return
}

module.exports = editEmailProfile