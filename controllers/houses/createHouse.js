const { houseSchema } = require('../../validators')
const { housesRepository } = require('../../repository/')

const createHouses = async (req, res) => {
    let insertId
    const house = req.body

    try {

        await houseSchema.validateAsync(house)

    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {

        insertId = await housesRepository.saveHouse({ ...house, ownerId: req.user.id })

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    res.status(200)
    res.send({ insertId })
}

module.exports = createHouses
