const transporter = require('./transporter')
const { SENDER_EMAIL } = process.env

const sendConfirmBookingOwner = async (bookingData) => {
  const { emailOwner, startDate, endDate } = bookingData
    await transporter.sendMail({
        from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
        to: emailOwner,
        subject: "Booking offer is pendding",
        html: `<p>Your offer booking of ${startDate} at ${endDate} is confirm</p>`
    })

}

module.exports = sendConfirmBookingOwner