const { usersRepository } = require('./mysql-repository/index')
const mailingRepository = require('./nodemailer-repository/index')

module.exports = {
    usersRepository,
    mailingRepository
}