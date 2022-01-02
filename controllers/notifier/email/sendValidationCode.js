const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendValidationCode = async ({ sendTo, code }) => {
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: sendTo,
        subject: "Confirm your account",
        html: `<p>Click <a href="http://localhost:3000/auth/confirm?code=${code}=">here</a> to confirm your account</p>`
    })
  }

module.exports = sendValidationCode

