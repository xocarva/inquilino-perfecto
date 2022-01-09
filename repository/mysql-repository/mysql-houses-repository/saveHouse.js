const connection = require('../mysqlConnection')

const saveHouse = async (house) => {
    const { title, price, rooms, description, city, ownerId, pictures } = house
    const [{ insertId }] = await connection.query(
        'INSERT INTO houses (title, price, rooms, description, city, id_owner) VALUE (?, ?, ?, ?, ?, ?)',
        [title, price, rooms, description, city, ownerId]
    )
    pictures.forEach(async picture => {
        await connection.query(
            'INSERT INTO house_pictures (id_house, url) VALUE (?, ?)',
            [insertId, picture]
        )
    })
    return insertId
}

module.exports = saveHouse
