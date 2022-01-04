const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendOfferBookingTenant = async (bookingData) => {
    const { emailTenant, startDate, endDate } = bookingData

    console.log(startDate)

    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: email,
        subject: "Your booking ins pendding",
        html: `<p>Your booking of ${startDate} at ${endDate} is pendding. Wait for confirmation.</p>`
    })
}

module.exports = sendOfferBookingTenant