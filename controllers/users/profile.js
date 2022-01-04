const { usersRepository } = require('../../repository')

const profile = async (req, res) => {

    const userId = req.user.id

    //TO-DO
    // add accurate error status

    try {
        const user = await usersRepository.getUserById(userId)
        if(!user) throw new Error ('User not found')
        res.status(200)
        res.send(user)
    } catch (error) {
        res.status(400)
        res.end(error.message)
    }
}

module.exports = profile