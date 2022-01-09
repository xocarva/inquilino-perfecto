const connection = require('../mysqlConnection')

const getUsersByActivationCode = async (activationCode) => {
    const [ users ]  = await connection.query(
        'SELECT id, first_name AS firstName, last_name AS lastName, email, picture, bio, password, activation_code AS activationCode FROM users WHERE activation_code = ?',
        [activationCode]
    )

    return users
}

module.exports = getUsersByActivationCode
