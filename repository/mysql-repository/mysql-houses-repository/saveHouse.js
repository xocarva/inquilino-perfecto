const connection = require('../mysqlConnection')


const saveHouse = async (house) => {
    const { title, price, rooms, description, city, ownerId } = house
    const [{ insertId }] = await connection.query(
        'INSERT INTO houses (title, price, rooms, description, city, id_owner) VALUE (?, ?, ?, ?, ?, ?)',
        [title, price, rooms, description, city, ownerId]
    )
    return insertId
}



module.exports = saveHouse
