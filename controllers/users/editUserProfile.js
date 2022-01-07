const { usersRepository } = require('../../repository')

const editUserProfile = async (req, res) => {
    const userId = Number(req.user.id)
    let userDataProfile
    try {
        userDataProfile = await usersRepository.getUserById(userId)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    if(!userDataProfile) throw new Error('This user no exist')
    if(userDataProfile.id === userId) throw new Error('You are trying to edit a profile that is not yours')

    res.status(200)
    res.send('Profile successfully changed')
}

module.exports = editUserProfile