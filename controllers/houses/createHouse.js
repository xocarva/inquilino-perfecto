const { houseSchema } = require('../../validators')
const { housesRepository } = require('../../repository/')

const createHouse = async (req, res) => {
    let insertId
    const house = req.body

    try {
        await houseSchema.validateAsync(house)
        if(house.pictures.length < 1) throw new Error ('Must upload at least one picture')
    } catch (error) {
        res.status(401)
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
    res.status(201)
    res.send(`Created new house with id ${insertId}`)
}

module.exports = createHouse
