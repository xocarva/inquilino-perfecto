const encryptor = require('../../shared/encryptor')
const crypto = require('crypto')
const notifier = require('../notifier')
const { updateUserValidator } = require('../../validators')
const { usersRepository } = require('../../repository')


const updateUser = async (req, res) => {
    let newUserData = req.body
    const userId = req.user.id

    try {
        await updateUserValidator.validateAsync(newUserData)
    } catch (error) {
        res.status(401)
        res.end(error.message)
        return
    }

    let user
    try {
        user = await usersRepository.getUserById(userId)
    } catch (error){
        res.status(500)
        res.end(error.message)
        return
    }

    const reactivationNeeded = newUserData.email && user.email !== newUserData.email

    let activationCode
    if (reactivationNeeded) {
        activationCode = crypto.randomBytes(40).toString('hex')
        newUserData = { ...newUserData, activationCode }
    }

    let encryptedPassword
    if(newUserData.password) {
        try {
            encryptedPassword = await encryptor.encrypt(newUserData.password)
       } catch (error) {
           res.status(403)
           res.end(error.message)
           return
       }
    }

    try {
        await usersRepository.updateUser({ ...newUserData, userId, password: encryptedPassword })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (reactivationNeeded) {
        try {
            await notifier.sendActivationCode(newUserData)
        } catch (error) {
            res.status(500)
            res.end(error.message)
            return
        }
    }

    res.status(202)
    res.send('User data updated')

}

module.exports = updateUser

