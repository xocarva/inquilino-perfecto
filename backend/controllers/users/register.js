const crypto = require('crypto')
const encryptor = require('../../shared/encryptor')
const fs = require('fs-extra')
const { userValidator } = require('../../validators')
const { usersRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')
const uploads = require('../../shared/uploads')

const { MAX_IMAGE_SIZE_IN_BYTES, ALLOWED_MIMETYPES, UPLOADS_PATH } = process.env

const register = async (req, res) => {
    const user = req.body

    if (!req.files || !req.files.picture) {
        res.status(400)
        res.send({error: '[picture] is required'})
        return
    }

    const picture = req.files.picture

    try {
        await userValidator.validateAsync(user)
    } catch (error) {
        res.status(400)
        res.send({error: error.message})
        return
    }

    if (!uploads.isValidImageSize(picture.size)) {
        res.status(415)
        res.send({error: `Avatar size should be less than ${MAX_IMAGE_SIZE_IN_BYTES / 1000000} Mb`})
        return
    }

    if (!uploads.isValidImageMimeType(picture.mimetype)) {
        res.status(415)
        res.send({error: `Avatar should be ${ALLOWED_MIMETYPES.map(getExtensionFromMimetype).join(', ')}`})
        return
    }

    let userExists
    try {
        userExists = await usersRepository.getUserByEmail(user.email)

    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if (userExists) {
        res.status(409)
        res.send({error: 'User already exists'})
        return
    }

    let encryptedPassword
    try {
        encryptedPassword = await encryptor.encrypt(user.password)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    const activationCode = crypto.randomBytes(40).toString('hex')

    let pictureUrl
    try {
        const pictureName = uploads.createImageName(uploads.getExtensionFromMimetype(picture.mimetype))
        pictureUrl = `/${pictureName}`
        fs.ensureDir(UPLOADS_PATH)
        picture.mv(`${UPLOADS_PATH}/${pictureName}`)
    } catch {
        res.status(500)
        res.send({error: error.message})
        return
    }


    let userId
    try {
        userId = await usersRepository.saveUser({ ...user, password: encryptedPassword, activationCode, picture: pictureUrl })
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    try {
        await notifier.sendActivationCode({ ...user, activationCode })
    } catch (error) {
        res.status(550)
        res.send({error: error.message})
        return
    }

    res.status(201)
    res.send({
        message: 'User registered and validation email sent',
        id: userId
    })

}

module.exports = register
