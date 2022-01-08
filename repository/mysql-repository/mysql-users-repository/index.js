const saveUser = require('./saveUser')
const userExists = require('./userExists')
const getUsersByActivationCode = require('./getUsersByActivationCode')
const activateUser = require('./activateUser')
const rateBooking = require('./rateBooking')
const getUserByEmail = require('./getUserByEmail')
const getUserById = require('./getUserById')
const editFirstNameProfile = require('./editFirstNameProfile')
const editLastNameProfile = require('./editLastNameProfile')
const editBioProfile = require('./editBioProfile')
const editPictureProfile = require('./editPictureProfile')
const editPasswordProfile = require('./editPasswordProfile')
const editEmailProfile = require('./editEmailProfile')

module.exports = {
    saveUser,
    userExists,
    getUsersByActivationCode,
    activateUser,
    rateBooking,
    getUserByEmail,
    getUserById,
    editFirstNameProfile,
    editLastNameProfile,
    editBioProfile,
    editPictureProfile,
    editPasswordProfile,
    editEmailProfile
}
