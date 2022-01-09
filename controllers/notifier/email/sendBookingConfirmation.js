const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendBookingConfirmation = async (bookingData) => {
  const { tenantEmail, startDate, endDate, house } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: tenantEmail,
        subject: "Booking offer is pendding",
        html: `<p>Your booking offer for ${house.title} from ${startDate} to ${endDate} has been confirmed.</p>`
    })

}

module.exports = sendBookingConfirmation