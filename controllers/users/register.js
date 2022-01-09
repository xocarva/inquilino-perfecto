const crypto = require('crypto')
const encryptor = require('../../shared/encryptor')
const { userValidator } = require('../../validators')
const { usersRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')


const register = async (req, res) => {
    const user = req.body

    try {
        await userValidator.validateAsync(user)
    } catch (error) {
        res.status(401)
        res.end(error.message)
        return
    }

    let userExists
    try {
        userExists = await usersRepository.userExists(user)

    } catch (error) {
        res.status(404)
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
        res.status(404)
        res.end(error.message)
    return
    }

    const activationCode = crypto.randomBytes(40).toString('hex')

    try {
        await usersRepository.saveUser({ ...user, password: encryptedPassword, activationCode })
    } catch (error) {
        res.status(401)
        res.end(error.message)
        return
    }

    try {
        await notifier.sendActivationCode({ ...user, activationCode })
    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    res.status(201)
    res.send('User registered and validation email sent')

}

module.exports = register
