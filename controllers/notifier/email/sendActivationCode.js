const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendActivationCode = async (user) => {
    const { email, activationCode } = user
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: email,
        subject: "Confirm your account",
        html: `<p>Click <a href="http://localhost:3000/auth/confirm?code=${activationCode}=">here</a> to confirm your account</p>`
    })
  }

module.exports = sendActivationCode

