const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendBookingOfferPenddingTennant = async (bookingData) => {
  const email = bookingData.emailTenant.email
  const { startDate, endDate } = bookingData


    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: email,
        subject: "Have a new Booking offer",
        html: `<p>Have a offer booking of ${startDate} at ${endDate}.</p>`
    })
}

module.exports = sendBookingOfferPenddingTennant