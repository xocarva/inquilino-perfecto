const connection = require('../mysqlConnection')

const editFirstNameProfile = async (userIdData) => {
    await connection.query("UPDATE users SET first_name = ? WHERE id = ?",
    [userIdData.firstName, userIdData.userId]
    )
    return
}

module.exports = editFirstNameProfile
