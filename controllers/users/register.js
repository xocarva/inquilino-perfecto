const bcrypt = require("bcrypt")
const crypto = require('crypto')

const { userValidator } = require('../../validators')
const { usersRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)

//TO-DO
// avatar attachment on register/saveUser

const encryptPassword = async (user) => {
    const encryptedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
    return { ...user, password: encryptedPassword }
}

const addActivationCode = (user) => {
    const activationCode = crypto.randomBytes(16).toString('hex')
    return { ...user, activationCode }
}

const register = async (req, res) => {
    const user = req.body

    try {
        await userValidator.validateAsync(user)
    } catch (error) {
        res.status(400)
        res.end(error.mesage)
        return
    }

    try {
        if (await usersRepository.userExists(user)) {
          res.status(403)
          res.end('User already exists')
          return
        }
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }

    try {
        await usersRepository.saveUser(await (encryptPassword(addActivationCode(user))))
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }

    try {
        await notifier.sendActivationCode(user)
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send('User registered and validation email sent')

}

module.exports = register