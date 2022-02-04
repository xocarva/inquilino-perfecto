const connection = require('../mysqlConnection')

const getHousesByOwnerId = async (ownerId) => {
    const [ houses ] = await connection.query("SELECT id, title, price, rooms, description, city FROM houses WHERE id_owner = ?",
    [ownerId])

    const housesWithPics = await Promise.all(houses.map(async house => {
        const [ pictures ] = await connection.query("SELECT url FROM house_pictures WHERE id_house = ?",
            [house.id]
        )
        return { ...house, pictures }
    }))

    return housesWithPics
  }

  module.exports = getHousesByOwnerId