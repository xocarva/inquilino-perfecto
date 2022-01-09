
const encryptor = require('../../shared/encryptor')
const { userSchema } = require('../../validators')
const { usersRepository } = require('../../repository')
const notifier = require('../notifier')


const editProfile = async (req, res) => {
    const newUserData = req.body
    let { firstName, lastName, email, bio, picture, password } = newUserData
    userId = req.user.id

    try {
        await userSchema.validateAsync(newUserData)
    } catch (error) {
        res.status(401)
        res.end(error.message)
        return
    }

    let encryptedPassword
    try {
        if(password) encryptedPassword = await encryptor.encrypt(password)
    } catch (error) {
        res.status(403)
        res.end(error.message)
        return
    }

    try {
        await usersRepository.saveUser(newUserData)
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }












    let userIdProfile
    let userDataProfile
    try {
        userDataProfile = await usersRepository.getUserById(userId)
        userIdProfile = userDataProfile.id
    } catch (error) {
        res.status(404)
        res.end(error.message)
        return
    }
            if(userId !== userIdProfile) throw new Error('This is not your profile')
            if(!userIdProfile) throw new Error('User profile does not exist')


    try {
        const oldFirstName = userDataProfile.firstName
        if(!firstName) firstName = oldFirstName
        await usersRepository.editFirstNameProfile({ firstName, userId })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    try {
        const oldLastName = userDataProfile.lastName
        if(!lastName) lastName = oldLastName
        await usersRepository.editLastNameProfile({ lastName, userId })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    try {
        const oldEmail = userDataProfile.email
        if(!email) email = oldEmail
        await usersRepository.editEmailProfile({ email, userId })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    try {
        const oldBio = userDataProfile.bio
        if(!bio) bio = oldBio
        await usersRepository.editBioProfile({ bio, userId })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }
    try {
        const oldPicture = userDataProfile.picture
        if(!picture) picture = oldPicture
        await usersRepository.editPictureProfile({ picture, userId })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }


    res.status(202)
    res.send('Your profile has been modified correctly')

}

module.exports = editProfile

