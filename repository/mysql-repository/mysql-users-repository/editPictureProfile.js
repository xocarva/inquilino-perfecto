const connection = require('../mysqlConnection')

const editPictureProfile = async (userIdData) => {
    await connection.query('UPDATE users SET picture = ? WHERE id = ?',
    [userIdData.picture, userIdData.userId]
    )
    return
}

module.exports = editPictureProfile