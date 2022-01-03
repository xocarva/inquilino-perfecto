const crypto = require('crypto')
const bcrypt = require("bcrypt")
const encryptor = require('../../shared/encryptor')
const { userValidator } = require('../../validators')
const { usersRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')

//TO-DO
// avatar attachment on register/saveUser

const register = async (req, res) => {
    const user = req.body

    try {
        await userValidator.validateAsync(user)
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }

    let userExists
    try {
        userExists = await usersRepository.userExists(user)

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    if (userExists) {
        res.status(403)
        res.end('User already exists')
        return
      }

    let encryptedPassword
    try {
        encryptedPassword = await encryptor.encrypt(user.password)
    } catch (error) {
        res.status(500)
        res.end(error.message)
    return
  }

    const activationCode = crypto.randomBytes(40).toString('hex')

    try {
        await usersRepository.saveUser({ ...user, password: encryptedPassword, activationCode })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }

    try {
        await notifier.sendActivationCode({ ...user, activationCode })
    } catch (error) {
        res.end(error.message)
    }

    res.status(200)
    res.send('User registered and validation email sent')

}

module.exports = register