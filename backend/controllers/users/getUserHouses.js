const { housesRepository } = require('../../repository')

const getUserHouses = async (req, res) => {
    let houses
    const userId = req.user.id

    try {
        houses = await housesRepository.getHousesByOwnerId(userId)
    } catch (error) {
        res.status(500)
        res.send({ error: error.message })
    }

    res.status(200)
    res.send(houses)
}

module.exports = getUserHouses
