const { usersRepository } = require('../../repository')

const profile = async (req, res) => {

    const userId = req.user.id

    try {

        const user = await usersRepository.getUserById(userId)
        if(!user) throw new Error ('User not found')
        res.status(202)
        res.send(user)

    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }
}

module.exports = profile