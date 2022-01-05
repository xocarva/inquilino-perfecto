const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendBookingOfferPenddingTenant = async (bookingData) => {
  const { emailTenant, startDate, endDate } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: emailTenant,
        subject: "Booking offer is pendding",
        html: `<p>Your offer booking of ${startDate} at ${endDate} is pendding</p>`
    })

}

module.exports = sendBookingOfferPenddingTenant
