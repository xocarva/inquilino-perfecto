const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendMadeBookingInfo = async (bookingData) => {
  const { tenantEmail, house, startDate, endDate } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: tenantEmail,
        subject: "Booking offer is pendding",
        html: `<p>Your have saved a booking for ${house.title} between ${startDate} and ${endDate}. Must be confirmed by the owner.</p>`
    })

}

module.exports = sendMadeBookingInfo
