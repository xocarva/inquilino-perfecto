const bcrypt = require("bcrypt")
const crypto = require('crypto')

const { userValidator } = require('../../validators')
const { usersRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)

//TO-DO
// avatar attachment on register/saveUser

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
        const userExists = await usersRepository.userExists(user)

        if (userExists) {
          res.status(403)
          res.end('User already exists')
          return
        }
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }


    let encryptedPassword

    try {
        encryptedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)

    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    const activationCode = crypto.randomBytes(16).toString('hex')

    try {
        await usersRepository.saveUser({ ...user, password: encryptedPassword, activationCode })
   } catch (error) {
        res.status(400)
        res.end(error.message)
        return
   }

   try {
        await notifier.sendValidationCode({ sendTo: user.email }, activationCode)
   } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send(`User registered and validation email sent`)

}

module.exports = register