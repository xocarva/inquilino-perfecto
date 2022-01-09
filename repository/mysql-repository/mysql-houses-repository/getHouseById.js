const connection = require('../mysqlConnection')

const getHouseById = async (houseId) => {
    const [[ house ]] = await connection.query(
        'SELECT houses.id as id, houses.title AS title, rooms, city, price, description, houses.id_owner AS ownerId FROM houses WHERE houses.id = ?',
        [houseId]
    )

    if(!house) return

    const [ pictures ] = await connection.query(
        'SELECT url FROM house_pictures WHERE id_house = ?',
        [houseId]
    )

    return { ...house, pictures }
}

module.exports = getHouseById
