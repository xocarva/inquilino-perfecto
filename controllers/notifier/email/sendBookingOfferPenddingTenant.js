const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendBookingOfferPenddingTennant = async (bookingData) => {
  const email = bookingData.emailTenant.email
  const { startDate, endDate } = bookingData


    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: email,
        subject: "Booking offer is pendding",
        html: `<p>Your offer booking of ${startDate} at ${endDate} is pendding</p>`
    })
}

module.exports = sendBookingOfferPenddingTennant