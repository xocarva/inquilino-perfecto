const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendBookingOfferPendingTenant = async (bookingData) => {
  const { email, startDate, endDate } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: email,
        subject: "Booking offer is pendding",
        html: `<p>Your offer booking of ${startDate} at ${endDate} is pendding</p>`
    })

}

module.exports = sendBookingOfferPendingTenant
