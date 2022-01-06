const { ratingsRepository } = require('../../repository')

const getRatings = async (req, res) => {
    const user = {
        id: req.user.id,
        role: req.params.role
    }

    let ratings
    try {
        ratings = await ratingsRepository.getRatings(user)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    res.status(200)
    res.send(ratings)
}

module.exports = getRatings
