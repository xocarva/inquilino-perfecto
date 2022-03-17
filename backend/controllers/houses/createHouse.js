const fs = require('fs-extra')
const { houseSchema } = require('../../validators')
const { housesRepository } = require('../../repository/')
const uploads = require('../../shared/uploads')
const { MAX_IMAGE_SIZE_IN_BYTES, ALLOWED_MIMETYPES, UPLOADS_PATH } = process.env

const createHouse = async (req, res) => {
    const house = req.body

    if (!req.files || !req.files.pictures) {
        res.status(400)
        res.send({ error: '[pictures] is required' })
        return
    }

    try {
        await houseSchema.validateAsync(house)
    } catch (error) {
        res.status(400)
        res.send({ error: error.message })
        return
    }

    const picsArray = Array.isArray(req.files.pictures) ? req.files.pictures : [req.files.pictures]

    let pictures
    try {
        pictures = picsArray.map(picture => {
            if (!uploads.isValidImageSize(picture.size)) {
                throw new Error(`Picture size should be less than ${MAX_IMAGE_SIZE_IN_BYTES / 1000000} Mb`)
            }

            if (!uploads.isValidImageMimeType(picture.mimetype)) {
                throw new Error(`Picture should be ${ALLOWED_MIMETYPES.map(getExtensionFromMimetype).join(', ')}`)
            }
            const pictureName = uploads.createImageName(uploads.getExtensionFromMimetype(picture.mimetype))
            const pictureUrl = `/${pictureName}`
            fs.ensureDir(UPLOADS_PATH)
            picture.mv(`${UPLOADS_PATH}/${pictureName}`)

            return pictureUrl
        })
    } catch (error) {
        res.status(415)
        res.send({ error: error.message })
        return
    }

    let insertId
    try {
        insertId = await housesRepository.saveHouse({ ...house, ownerId: req.user.id, pictures })

    } catch (error) {
        res.status(500)
        res.send({ error: error.message })
        return
    }

    res.status(201)
    res.send({
        message: `House ad has been created`,
        id: insertId
    })
}

module.exports = createHouse
