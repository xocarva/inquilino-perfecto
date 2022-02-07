const { housesRepository, ratingsRepository, usersRepository } = require('../../repository')

const getHouse = async (req, res) => {
    const { houseId } = req.params

    let house
    try {
        house = await housesRepository.getHouseById(houseId)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if(!house) {
        res.status(404)
        res.end('House not found')
        return
    }

    try {
        const owner = await usersRepository.getUserById(house.ownerId)
        const ownerRatings = await ratingsRepository.getRatings({ id: house.ownerId, role: 'owner' })
        const ownerRatingAvg = Math.round(ownerRatings.reduce((acc, val) => acc + (val.rating/ownerRatings.length), 0))
        house = { ...house, rating: ownerRatingAvg, ownerFirstName: owner.firstName, ownerLastName: owner.lastName }

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    res.status(200)
    res.send(house)
}

module.exports = getHouse