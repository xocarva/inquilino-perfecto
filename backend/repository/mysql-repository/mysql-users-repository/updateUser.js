const connection = require('../mysqlConnection')

const updateUser = async (newUserData) => {
    const { firstName, lastName, email, picture, bio, password, activationCode, userId } = newUserData
    if (!firstName && !lastName && !email && !picture && !bio && !password) return

    let query = 'UPDATE users SET'
    const params = []

    if(firstName) {
        query += ' first_name = ?'
        params.push(firstName)
    }
    if(lastName) {
        if (params.length > 0) query += ','
        query += ' last_name = ?'
        params.push(lastName)
    }
    if(email) {
        if (params.length > 0) query += ','
        query += ' email = ?, activation_code = ?, active = false'
        params.push(email)
        params.push(activationCode)
    }
    if(picture) {
        if (params.length > 0) query += ','
        query += ' picture = ?'
        params.push(picture)
    }
    if(bio) {
        if (params.length > 0) query += ','
        query += ' bio = ?'
        params.push(bio)
    }
    if(password) {
        if (params.length > 0) query += ','
        query += ' password = ?'
        params.push(password)
    }
    query += ' WHERE id = ?'

    await connection.query(query, [ ...params, userId ])
}
module.exports = updateUser