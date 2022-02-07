const crypto = require('crypto')
const fs = require('fs-extra')
const {MAX_IMAGE_SIZE_IN_BYTES, ALLOWED_MIMETYPES, UPLOADS_PATH} =  process.env

const isValidImageSize = (size) => {
    return size <= MAX_IMAGE_SIZE_IN_BYTES
}

  const isValidImageMimeType = (mimetype) => {
    return ALLOWED_MIMETYPES.includes(mimetype.toLowerCase())
}

  const getExtensionFromMimetype = (mimetype) => {
    return mimetype.split('/')[1]
}

  const removeFile = async (fileName) => {
    fs.remove(`${UPLOADS_PATH}/${fileName}`)
}

  const createImageName = (extension) => {
    const randomHash = crypto.randomBytes(15).toString('hex')
    return `${randomHash}.${extension}`
}

module.exports = {
    isValidImageSize,
    isValidImageMimeType,
    getExtensionFromMimetype,
    removeFile,
    createImageName
}
