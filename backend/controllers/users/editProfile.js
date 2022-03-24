const encryptor = require('../../shared/encryptor')
const crypto = require('crypto')
const fs = require('fs-extra')
const uploads = require('../../shared/uploads')
const notifier = require('../notifier')
const { updateUserValidator } = require('../../validators')
const { usersRepository } = require('../../repository')
const { MAX_IMAGE_SIZE_IN_BYTES, ALLOWED_MIMETYPES, UPLOADS_PATH } =  process.env

const updateUser = async (req, res) => {
    let newUserData = req.body
    const userId = req.user.id

    try {
        await updateUserValidator.validateAsync(newUserData)
    } catch (error) {
        res.status(400)
        res.send({error: error.message})
        return
    }

    let userExists
    if(newUserData.email) {
        try {
            userExists = await usersRepository.getUserByEmail(newUserData.email)

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
    }

    let user
    try {
        user = await usersRepository.getUserById(userId)
    } catch (error){
        res.status(500)
        res.send({error: error.message})
        return
    }

    const reactivationNeeded = !!newUserData.email

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
            res.status(500)
            res.send({error: error.message})
            return
        }
    }

    if(req.files && req.files.picture) {
        const picture = req.files.picture

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

        let pictureUrl
        try {
            const pictureName = uploads.createImageName(uploads.getExtensionFromMimetype(picture.mimetype))
            pictureUrl = `/${pictureName}`
            fs.ensureDir(UPLOADS_PATH)
            picture.mv(`${UPLOADS_PATH}/${pictureName}`)
            await uploads.removeFile(user.picture)
            newUserData = { ...newUserData, picture: pictureUrl }
        } catch (error) {
            res.status(500)
            res.send({error: error.message})
            return
        }
    }

    try {
        await usersRepository.updateUser({ ...newUserData, userId, password: encryptedPassword })
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if (reactivationNeeded) {
        try {
            await notifier.sendActivationCode(newUserData)
        } catch (error) {
            res.status(550)
            res.send({error: error.message})
            return
        }
    }

    let updatedUser

    try {
        updatedUser = await usersRepository.getUserById(userId)
    } catch (error){
        res.status(500)
        res.send({error: error.message})
        return
    }

    res.status(202)
    res.send({
        message: 'User data updated',
        user: {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            picture: updatedUser.picture,
            bio: updatedUser.bio,
            email: updatedUser.email
        }
    })
}

module.exports = updateUser

