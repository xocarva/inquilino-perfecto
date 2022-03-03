const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendActivationCode = async (user) => {
    const { email, activationCode } = user
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: email,
        subject: "Activa tu usuario",
        html: `<p>Click <a href="http://localhost:3000/users/validate/${activationCode}">aquí</a> para activar tu usuario.</p>`
    })
  }

module.exports = sendActivationCode

