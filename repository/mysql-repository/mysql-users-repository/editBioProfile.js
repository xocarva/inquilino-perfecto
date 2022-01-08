const connection = require('../mysqlConnection')

const editBioProfile = async (userIdData) => {
    await connection.query('UPDATE users SET bio = ? WHERE id = ?',
    [userIdData.bio, userIdData.userId]
    )
    return
}

module.exports = editBioProfile