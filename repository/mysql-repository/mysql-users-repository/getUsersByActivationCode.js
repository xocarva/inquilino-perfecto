const connection = require('../mysqlConnection')

const getUsersByActivationCode = async (activationCode) => {
    const [ users ]  = await connection.query(
        'SELECT * FROM users WHERE activation_code = ?',
        [activationCode]
    )

    return users
}

module.exports = getUsersByActivationCode
