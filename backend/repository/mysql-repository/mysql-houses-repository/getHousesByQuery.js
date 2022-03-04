const connection = require('../mysqlConnection')

const getHousesByQuery = async (city, price, rooms) => {
    let query = 'SELECT id, title, city, price, rooms, id_owner AS ownerId FROM houses'
    const params = []
    if (city || price || rooms) query += ' WHERE'

    if(city) {
        query += ' city LIKE ?'
        city += '%'
        params.push(city)
    }

    if(price) {
        if (params.length > 0) query += ' AND'
        query += ' price <= ?'
        params.push(price)
    }

    if(rooms) {
        if (params.length > 0) query += ' AND'
        query += ' rooms >= ?'
        params.push(rooms)
    }

    const [ houses ] = await connection.query(query,params)

    if(!houses) return

    const housesWithPics = await Promise.all(houses.map(async house => {
        const [ pictures ] = await connection.query("SELECT id, url FROM house_pictures WHERE id_house = ?",
            [house.id]
        )
        return { ...house, pictures }
    }))

    return housesWithPics
}

module.exports = getHousesByQuery